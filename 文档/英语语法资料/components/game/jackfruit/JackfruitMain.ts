import cv from "../../lobby/cv";
import JackfruitManager from "./JackfruitManager";
import { JackfruitScene } from "./JackfruitScene";
import { JackfruitMenu } from "./JackfruitMenu";
import { JackfruitFace } from "./JackfruitFace";
import { JackPotNumber } from "./JackfruitJackPotNumber";
import FaceView from "../dzPoker//danmu/FaceView";
import AofDesc from "../Aof/AofDesc";
import Seat from "./JackfruitSeat";
import JackfruitBuyin from "./JackfruitBuyin";
import LuckTurntablesButton from "../redEnvelope/LuckTurntablesButton";
import { AwardInfos, BarrageType, BrandBarrageType, SettleResp, BuYinData, ePlayerState, ChatType, eRoundState, CardItem, PlayerSettle, PlayerInfo, JackfruitRoomData, eSeatStatus, DealNotify, GameRoundEndNotify, BuyInNotify, PlaceResult, CardLevel } from "./JackfruitData";
import { Card } from "./../dzPoker/Card";
import { JackfruitReview } from "./JackfruitReview";
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import jackfruit = require("../../../../Script/common/pb/jackfruit");
import jackfruit_proto = jackfruit.jackfruit_proto;

import { CAFInfo } from "../dzPoker/data/RoomData";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import { JackfruitPrivateInfo } from "./JackfruitPrivateInfo";
import labaBtn from "../dzPoker/labaBtn";
import { HitbackFaceItem } from "../dzPoker/HitbackFaceItem";
const { ccclass, property } = cc._decorator;

export enum Countdown_type {
    empty = 0,
    aboutToStart,       // 即将开始
    PlaceCard,          // 摆牌
    Ready,              // 继续
}

export class SizeItem {
    public size: number;
    public index: number;
}

@ccclass
export class JackfruitMain extends cc.Component {
    @property(cc.Node) guide_panel: cc.Node = null;
    @property(cc.Node) chat_panel: cc.Node = null;
    @property(cc.Node) specialEffects_panel: cc.Node = null;
    @property(cc.Node) specialEffects_mask_panel: cc.Node = null;
    @property(cc.Node) mask_panel: cc.Node = null;
    @property(cc.Node) card_panel: cc.Node = null;
    @property(cc.Node) public_card_panel: cc.Node = null;
    @property(cc.Node) seat_panel: cc.Node = null;
    @property(cc.Node) allReview_button: cc.Node = null;
    @property(cc.Sprite) otherTableCardBgs: cc.Sprite[] = [];
    @property(cc.Sprite) otherMultipleImages: cc.Sprite[] = [];
    @property(cc.Sprite) selfTableCardBgs: cc.Sprite[] = [];
    @property(cc.Sprite) selfMultipleImages: cc.Sprite[] = [];
    @property(cc.Node) otherCardTypeNode: cc.Node[] = [];
    @property(cc.Node) selfCardTypeNode: cc.Node[] = [];
    @property(cc.Node) face_button: cc.Node = null;
    @property(cc.Node) redEnvelope_btn: cc.Node = null;
    @property(cc.Node) shop_button: cc.Node = null;
    @property(cc.Node) modal_panel: cc.Node = null;
    @property(cc.Node) damon_img: cc.Node = null;
    @property(cc.Node) addTime_btn: cc.Node = null;
    @property(cc.Label) addTime_text: cc.Label = null;
    @property(cc.Node) wait_node: cc.Node[] = [];
    @property(cc.Node) game_bg: cc.Node = null;
    @property(cc.Node) change_table_btn: cc.Node = null;
    @property(cc.Node) select_card_img: cc.Node = null;
    @property(cc.Node) other_fold_card_panel: cc.Node = null;
    @property(cc.Sprite) other_fold_card: cc.Sprite = null;
    @property(cc.Node) danmu_btns: cc.Node[] = [];
    @property(cc.Node) guide_bg: cc.Node[] = [];

    @property(cc.Node) exchange_node: cc.Node = null;
    @property(cc.Label) exchange_label: cc.Label = null;

    @property(cc.Node) aboutToStart_panel: cc.Node = null;
    @property(cc.ProgressBar) aboutToStart_progressBar: cc.ProgressBar = null;
    @property(cc.Label) aboutToStart_label: cc.Label = null;
    @property(cc.Node) aboutToStart_img: cc.Node = null;

    @property(cc.Node) waitReady_panel: cc.Node = null;
    @property(cc.ProgressBar) waitReady_progressBar: cc.ProgressBar = null;
    @property(cc.Label) waitReady_label: cc.Label = null;
    @property(cc.Node) waitReady_img: cc.Node = null;

    @property(cc.Node) placeCardIsOK_btn: cc.Node = null;
    @property(cc.ProgressBar) placeCardIsOK_progressBar: cc.ProgressBar = null;
    @property(cc.Label) placeCardIsOK_time_label: cc.Label = null;
    @property(cc.Label) placeCardIsOK_label: cc.Label = null;
    @property(cc.Label) placeCardIsOK_delay_label: cc.Label = null;

    @property(cc.Node) game_end_panel: cc.Node = null;
    @property(cc.Node) back_btn: cc.Node = null;
    @property(cc.Node) continue_btn: cc.Node = null;
    @property(cc.Node) menu_button: cc.Node = null;

    @property(cc.Node) upper_limit_panel: cc.Node = null;
    @property(cc.Label) upper_limit_label: cc.Label = null;
    @property(cc.RichText) upper_limit_richtext: cc.RichText = null;

    @property(cc.Node) start_match_panel: cc.Node = null;

    @property(cc.Prefab) seat: cc.Prefab = null;
    @property(cc.Prefab) card: cc.Prefab = null;

    @property(cc.Prefab) jackfrunt_chat_item: cc.Prefab = null;
    @property(cc.Prefab) chat: cc.Prefab = null;
    public chat_node: cc.Node = null;
    @property(cc.Prefab) face: cc.Prefab = null;
    public face_node: cc.Node = null;
    @property(cc.Prefab) bighead: cc.Prefab = null
    public bighead_node: cc.Node = null;
    @property(cc.Prefab) headAni: cc.Prefab = null;
    @property(cc.Prefab) calmDown_prefab: cc.Prefab = null;
    @property(cc.Prefab) luckButton_prefab: cc.Prefab = null;
    @property(cc.Prefab) fist_prefab: cc.Prefab = null;
    @property(cc.Prefab) zhuaji_prefab: cc.Prefab = null;
    @property(cc.Prefab) flower_prefab: cc.Prefab = null;
    @property(cc.Prefab) money_prefab: cc.Prefab = null;
    @property(cc.Prefab) towel_prefab: cc.Prefab = null;
    @property(cc.Prefab) fan_prefab: cc.Prefab = null;

    @property(cc.Prefab) lost_prefab: cc.Prefab = null;
    @property(cc.Node) aof_lost_btn: cc.Node = null;
    @property(cc.Prefab) labaBtn_prefab: cc.Prefab = null;
    labaBtnNode: cc.Node = null;
    // @property(cc.RichText) aof_desc: cc.RichText = null;

    @property(cc.Prefab) start_action_ball_1: cc.Prefab = null;
    @property(cc.Prefab) start_action_ball_2: cc.Prefab = null;
    @property(cc.Prefab) start_action_light: cc.Prefab = null;
    public start_action_ball_node_list: cc.Node[] = [];
    public start_action_light_node_list: cc.Node[] = [];

    @property(cc.Prefab) card_action_drop: cc.Prefab = null;
    @property(cc.Prefab) card_bg_action_back: cc.Prefab = null;
    @property(cc.Prefab) card_bg_action_face: cc.Prefab = null;
    @property(cc.Prefab) card_action_huo: cc.Prefab = null;
    @property(cc.Prefab) card_action_big: cc.Prefab = null;
    @property(cc.Prefab) card_type_jiafen1: cc.Prefab = null;
    @property(cc.Prefab) card_type_jiafen2: cc.Prefab = null;
    @property(cc.Prefab) all_victory_feipai_1: cc.Prefab = null;
    @property(cc.Prefab) all_victory_feipai_2: cc.Prefab = null;
    @property(cc.Prefab) all_victory: cc.Prefab = null;
    @property(cc.Prefab) all_failed: cc.Prefab = null;
    @property(cc.Prefab) you_win: cc.Prefab = null;
    @property(cc.Prefab) repeat_win: cc.Prefab = null;
    @property(cc.Prefab) big_card: cc.Prefab = null;
    @property(cc.Prefab) total_result: cc.Prefab = null;
    @property(cc.Prefab) jack_number: cc.Prefab = null;
    @property(cc.Prefab) jack_action: cc.Prefab = null;

    @property(cc.Prefab) hitback_faceitem_prefab: cc.Prefab = null;
    @property(cc.Node) hitback_right: cc.Node = null;
    @property(cc.Node) hitback_upper_left: cc.Node = null;
    @property(cc.Node) hitback_upper_right: cc.Node = null;

    hitbackOn: boolean = true;
    greetOn: boolean = true;
    state: number = 1;

    @property(cc.Prefab) buyin: cc.Prefab = null;
    public buyin_panel: cc.Node = null;

    @property(cc.Label) all_score_label: cc.Label = null;
    @property(cc.Node) all_victory_img: cc.Node = null;

    @property(cc.Font) all_lose_number: cc.Font = null;
    @property(cc.Font) all_win_number: cc.Font = null;
    @property(cc.Font) all_level_number: cc.Font = null;
    @property(cc.Font) cardtype_win_fnt_8: cc.Font = null;
    @property(cc.Font) cardtype_win_fnt_9: cc.Font = null;
    @property(cc.Font) cardtype_win_fnt_10: cc.Font = null;
    @property(cc.Font) settle_lose_number: cc.Font = null;
    @property(cc.Font) settle_win_number: cc.Font = null;
    @property(cc.Font) single_lose_number: cc.Font = null;
    @property(cc.Font) single_win_number: cc.Font = null;
    @property(cc.Font) victory_number: cc.Font = null;
    @property(cc.Font) total_result_win: cc.Font = null;
    @property(cc.Font) total_result_lose: cc.Font = null;

    @property(cc.Node) record_button_img: cc.Node = null;
    @property(cc.Node) record_button: cc.Node = null;

    public _bTouchStop = false;
    public _androidRecord: boolean = false;
    public _recordTime: number = 10;//录单倒计时时间
    public _isAllin = false;

    public _selfMultiplePos: cc.Vec2[] = [];
    public _otherMultiplePos: cc.Vec2[] = [];
    public lostDesc: cc.Node = null;
    public _selfCardBgs: cc.Sprite[] = [];
    public _cardPosOffsetByBg: cc.Vec2 = cc.v2(0, 0);
    public _selfCards: Card[] = [];
    public _publicCards: Card[] = [];
    public _otherTableCards: Card[] = [];
    public _publicCardsPos: cc.Vec2[] = [];
    public _bIsInit: boolean = false;
    public _postList: Array<cc.Vec2> = new Array<cc.Vec2>();
    public _seatList: Seat[] = [];
    public _isSeat: boolean = false;
    public _isTurning: boolean = false;
    public _trunIngSeatViewID: number = 0;
    public _clickSeatID = 0;//点击的目标椅子号
    public _htime = 0;
    public _time = 0;
    public _lastTime = 0;
    public _isPlaceCardOver: boolean = false;
    public _countdownType = Countdown_type.empty;
    public _actionStartBallList: cc.Animation[] = [];
    public _actionStartLightList: cc.Animation[] = [];
    public _JackPotNumberList: JackPotNumber[] = [];
    public SHOW_SINGLE_SCORE_TAG = 100000;
    public SHOW_SEAT_LOST_TAG = 100001;
    public SHOW_SELECT_CARD_TAG = 100002;
    public WAITING_OTHER_PLAYER_NOTIFY_TAG = 100003;

    public game: JackfruitScene;
    public PUBLIC_Y = 120;
    public _isReady = false;
    public _headAni_arr: Array<cc.Node> = [];
    calmDown_arr: Array<cc.Node> = [];

    fist_arr: Array<cc.Node> = [];
    zhuaji_arr: Array<cc.Node> = [];
    flower_arr: Array<cc.Node> = [];
    money_arr: Array<cc.Node> = [];
    towel_arr: Array<cc.Node> = [];
    fan_arr: Array<cc.Node> = [];

    public _showCardTypeNum = 0;
    public luckLayer = null;
    public _oldLocation: cc.Vec2 = cc.v2(0, 0);
    public _location: cc.Vec2 = cc.v2(0, 0);
    public _oldTime: number = 0;
    public _moveCards: Card[] = [];
    public _selectCard: Card = null;
    public _isDoubleClick: boolean = true;
    public _isPress: boolean = false;
    public _placeCardType: number = 0;
    public _lostTime: number = 0;
    public _playEffectList: string[] = [];
    public _jackPotHitCardType: cc.Node = null;
    public _jackpotInfos: AwardInfos[] = [];
    private _cardScale: cc.Vec2 = cc.v2(1, 1);

    public hitbackSeatServerId = 0;//记录要反击的seatid

    public _path_Bgm: string = "zh_CN/game/jackfruit/audio/back";                   // 背景音乐
    public _path_allwin: string = "zh_CN/game/jackfruit/audio/allwin";              // 全胜
    public _path_all_failed: string = "zh_CN/game/jackfruit/audio/allfailed";       // 全负
    public _path_big_card: string = "zh_CN/game/jackfruit/audio/big_card";          // 大牌
    public _path_countdownS: string = "zh_CN/game/jackfruit/audio/countdownS";       // 开始3秒倒计时
    public _path_countdownP: string = "zh_CN/game/jackfruit/audio/countdownP";       // 摆牌5秒倒计时
    public _path_draw: string = "zh_CN/game/jackfruit/audio/draw";                   // 平局
    public _path_youlose: string = "zh_CN/game/jackfruit/audio/youwin_lose";         // 小赢
    public _path_youwin_small: string = "zh_CN/game/jackfruit/audio/youwin_small";   // 小赢
    public _path_youwin_big: string = "zh_CN/game/jackfruit/audio/youwin_big";       // 大赢
    public _path_hand_1: string = "zh_CN/game/jackfruit/audio/hand_1";               // 激光
    public _path_hand_2: string = "zh_CN/game/jackfruit/audio/hand_2";               // 发牌
    public _path_place_card_1: string = "zh_CN/game/jackfruit/audio/place_card_1";   // 摆牌确定
    public _path_place_card_2: string = "zh_CN/game/jackfruit/audio/place_card_2";   // 翻开摆牌
    public _path_public_card_3: string = "zh_CN/game/jackfruit/audio/public_card_3"; // 发前3张公共牌
    public _path_public_card_4: string = "zh_CN/game/jackfruit/audio/public_card_4"; // 第四第五张
    public _path_allwinjiafen: string = "zh_CN/game/jackfruit/audio/allwinjiafen";   // 全胜分和总分合并
    public _path_feipai: string = "zh_CN/game/jackfruit/audio/feipai";               // 飞牌音效
    public _path_determine: string = "zh_CN/game/jackfruit/audio/determine";         // 确定按钮
    public _path_self_place: string = "zh_CN/game/jackfruit/audio/self_place";       // 自己摆牌
    public _path_single_win: string = "zh_CN/game/jackfruit/audio/single_win";       // 每一道赢
    public _path_single_lose: string = "zh_CN/game/jackfruit/audio/single_lose";     // 每一道输
    public _path_all_score: string = "zh_CN/game/jackfruit/audio/all_score";         // 三道总分
    public _path_btn_continue: string = "zh_CN/game/jackfruit/audio/btn_continue";   // 继续按钮
    public _path_place_card_ok: string = "zh_CN/game/jackfruit/audio/place_card_ok"; // 确定按钮翻转
    public _path_winning_streak: string = "zh_CN/game/jackfruit/audio/winning_streak"; // 连胜
    public _path_gold: string = "zh_CN/game/jackfruit/audio/gold";                   // 飞金币
    public _path_add_time: string = "zh_CN/game/jackfruit/audio/add_time";           // 延时

    onLoad() {
        this._init();

        this.buyin_panel = cc.instantiate(this.buyin);
        this.node.addChild(this.buyin_panel);
        this.buyin_panel.active = false;

        cv.MessageCenter.register("change_game_bg", this.onChangeBg.bind(this), this.node);
        cv.MessageCenter.register("change_cardface_jackfruit", this.UpdateCardFace.bind(this), this.node);
        // cv.MessageCenter.register("get_aof_game_thouthand", this.updateLabaNum.bind(this), this.node);
        //私语版本，走私语切换后台注册
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.register("on_syOnEnterBackground", this.onAppEnterBackground.bind(this), this.node);
            cv.MessageCenter.register("on_syOnEnterForeground", this.onAppEnterForeground.bind(this), this.node);
        } else {
            cc.game.on(cc.game.EVENT_HIDE, this.onAppEnterBackground, this);
            cc.game.on(cc.game.EVENT_SHOW, this.onAppEnterForeground, this);
        }
        cv.MessageCenter.register("on_game_data_sync", this.OnGameDataSync.bind(this), this.node);
        cv.MessageCenter.register("exit_the_room", this.gotoHallScene.bind(this), this.node);
        cv.MessageCenter.register("updataBGM", this.onUpdataBGM.bind(this), this.node);
        cv.MessageCenter.register("showLuckButton", this.showLuckButton.bind(this), this.node);

        cv.MessageCenter.register("showObRoleInfo", this.showObRoleInfo.bind(this), this.node);

        cv.MessageCenter.register("NotDisturb", this.onNotDisturb.bind(this), this.node);

        cv.MessageCenter.register("IsEmojiFree", this.isEmojiFree.bind(this), this.node);
        cv.MessageCenter.register("closehitback", this.onCloseHitback.bind(this), this.node);
        cv.MessageCenter.register("welcome", this.onWelcome.bind(this), this.node);

        cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
        cv.jackfruitNet.requestGameDataSync(cv.roomManager.getCurrentRoomID());
        this.showLuckButton();

        if (cv.config.isSiyuType()) {
            //私语屏蔽菠萝蜜的录音按钮
            this.record_button.active = false;
        }

        this.setRecordEnabled(false);

        if (this.bighead_node == null) {
            this.bighead_node = cc.instantiate(this.bighead);
            cc.director.getScene().addChild(this.bighead_node, cv.Enum.ZORDER_TYPE.ZORDER_7, "bighead");
            this.bighead_node.position = cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
        }
        this.bighead_node.active = false;

        if (this.face_node == null) {
            this.face_node = cc.instantiate(this.face);
            cc.director.getScene().addChild(this.face_node, cv.Enum.ZORDER_TYPE.ZORDER_7, "privateinfo");
            this.face_node.position = cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
        }
        this.face_node.active = false;
    }

    start() {
        this.onUpdataBGM();
    }

    onDestroy() {
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        } else {
            cc.game.off(cc.game.EVENT_HIDE, this.onAppEnterBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this.onAppEnterForeground, this);
        }
        cv.MessageCenter.unregister("change_game_bg", this.node);
        cv.MessageCenter.unregister("change_cardface_jackfruit", this.node);
        // cv.MessageCenter.unregister("get_aof_game_thouthand", this.node);
        cv.MessageCenter.unregister("on_game_data_sync", this.node);
        cv.MessageCenter.unregister("exit_the_room", this.node);
        cv.MessageCenter.unregister("updataBGM", this.node);

        cv.MessageCenter.unregister("on_sitdown_succ", this.node);
        cv.MessageCenter.unregister("stand_up_succ", this.node);
        cv.MessageCenter.unregister("need_buyin", this.node);
        cv.MessageCenter.unregister("on_need_slider_verify", this.node);
        cv.MessageCenter.unregister("game_will_start", this.node);
        cv.MessageCenter.unregister("notice_deal", this.node);
        cv.MessageCenter.unregister("start_place_card", this.node);
        cv.MessageCenter.unregister("modify_place_card", this.node);
        cv.MessageCenter.unregister("show_place_card", this.node);
        cv.MessageCenter.unregister("community_cards", this.node);
        cv.MessageCenter.unregister("game_round_end", this.node);
        cv.MessageCenter.unregister("buy_in", this.node);
        cv.MessageCenter.unregister("destroy_room", this.node);
        cv.MessageCenter.unregister("confirm_to_continue", this.node);
        cv.MessageCenter.unregister("place_card_over", this.node);
        cv.MessageCenter.unregister("player_ready", this.node);

        cv.MessageCenter.unregister("on_show_chat_panel", this.node);
        cv.MessageCenter.unregister("on_show_face_panel", this.node);
        cv.MessageCenter.unregister("effet_call", this.node);
        cv.MessageCenter.unregister("effect_hit_call", this.node);
        cv.MessageCenter.unregister("on_fly_emoji", this.node);
        cv.MessageCenter.unregister("on_showFace", this.node);
        cv.MessageCenter.unregister("on_SendChat", this.node);
        cv.MessageCenter.unregister("send_chat_notify", this.node);
        cv.MessageCenter.unregister("updata_delay", this.node);
        cv.MessageCenter.unregister("action_delay", this.node);
        cv.MessageCenter.unregister("turntableResultNotice", this.node);
        cv.MessageCenter.unregister("showLuckButton", this.node);
        cv.MessageCenter.unregister("waiting_other_player_notify", this.node);
        cv.MessageCenter.unregister("show_hit_jackPotCardType", this.node);
        cv.MessageCenter.unregister("can_operation", this.node);
        cv.MessageCenter.unregister("total_settle", this.node);
        cv.MessageCenter.unregister("player_info_sync", this.node);
        cv.MessageCenter.unregister("updata_start_match", this.node);
        cv.MessageCenter.unregister("brand_barrage", this.node);
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

        cv.MessageCenter.unregister("showObRoleInfo", this.node);

        // jp
        cv.MessageCenter.unregister("updata_jackpotdata", this.node);

        cv.MessageCenter.unregister("NotDisturb", this.node);

        cv.MessageCenter.unregister("closehitback", this.node);
        cv.MessageCenter.unregister("IsEmojiFree", this.node);
        cv.MessageCenter.unregister("welcome", this.node);
    }

    private _addEvent() {
        cv.MessageCenter.register("on_sitdown_succ", this.onSitdownSucc.bind(this), this.node);
        cv.MessageCenter.register("stand_up_succ", this.onStandUpSucc.bind(this), this.node);
        cv.MessageCenter.register("need_buyin", this.onNeedBuyin.bind(this), this.node);
        cv.MessageCenter.register("on_need_slider_verify", this.onNeedSliderVerify.bind(this), this.node);

        cv.MessageCenter.register("game_will_start", this.onGameWillStart.bind(this), this.node);
        cv.MessageCenter.register("notice_deal", this.onNoticeDeal.bind(this), this.node);
        cv.MessageCenter.register("start_place_card", this.onStartPlaceCard.bind(this), this.node);
        cv.MessageCenter.register("modify_place_card", this.onModifyPlaceCard.bind(this), this.node);
        cv.MessageCenter.register("show_place_card", this.onShowPlaceCard.bind(this), this.node);
        cv.MessageCenter.register("community_cards", this.onCommunityCards.bind(this), this.node);
        cv.MessageCenter.register("game_round_end", this.onGameRoundEne.bind(this), this.node);

        cv.MessageCenter.register("buy_in", this.onBuyIn.bind(this), this.node);
        cv.MessageCenter.register("destroy_room", this.onDestroyRoom.bind(this), this.node);

        cv.MessageCenter.register("confirm_to_continue", this.onConfirmToContinue.bind(this), this.node);
        cv.MessageCenter.register("place_card_over", this.onPlaceCardOver.bind(this), this.node);
        cv.MessageCenter.register("player_ready", this.onPlayerReady.bind(this), this.node);

        cv.MessageCenter.register("on_show_chat_panel", this.onShowChatPanel.bind(this), this.node);
        cv.MessageCenter.register("on_show_face_panel", this.onShowFacePanel.bind(this), this.node);

        cv.MessageCenter.register("effet_call", this.effectCall.bind(this), this.node);
        cv.MessageCenter.register("effect_hit_call", this.effectHitCall.bind(this), this.node);
        cv.MessageCenter.register("on_fly_emoji", this.OnFlyEmoji.bind(this), this.node);
        cv.MessageCenter.register("on_showFace", this.onShowFace.bind(this), this.node);
        cv.MessageCenter.register("on_SendChat", this.onSendChat.bind(this), this.node);
        cv.MessageCenter.register("send_chat_notify", this.onSendChatNotify.bind(this), this.node);

        cv.MessageCenter.register("updata_delay", this.onUpdataDelay.bind(this), this.node);
        cv.MessageCenter.register("action_delay", this.onActionDelay.bind(this), this.node);

        cv.MessageCenter.register("turntableResultNotice", this.onTurntableResultNotice.bind(this), this.node);
        cv.MessageCenter.register("waiting_other_player_notify", this.onWaitingOtherPlayer.bind(this), this.node);

        cv.MessageCenter.register("show_hit_jackPotCardType", this.showhitjackPotCardType.bind(this), this.node);
        cv.MessageCenter.register("can_operation", this.onShowChangeTableBtn.bind(this), this.node);
        cv.MessageCenter.register("total_settle", this.onTotalSettle.bind(this), this.node);
        cv.MessageCenter.register("player_info_sync", this.onPlayerInfoSync.bind(this), this.node);
        cv.MessageCenter.register("updata_start_match", this.onUpdataStartMatch.bind(this), this.node);
        cv.MessageCenter.register("brand_barrage", this.onBrandBarrage.bind(this), this.node);

        //语音录音
        this.record_button.on(cc.Node.EventType.TOUCH_START, this.onbtnRecordClick.bind(this));
        this.record_button.on(cc.Node.EventType.TOUCH_END, this.onbtnRecordClick.bind(this));
        this.record_button.on(cc.Node.EventType.TOUCH_CANCEL, this.onbtnRecordClick.bind(this));

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

        cv.MessageCenter.register("updata_jackpotdata", this.updateJackpotNumEvent.bind(this), this.node);
    }

    private _init() {
        this._initLanguage()
        this._initPos();
        this._initCards();
        this._initCardBgAction();
        this._initView();
    }

    private _initLanguage() {
        // let poslist = [];
        // for (let i = 0; i < 3; i++) {
        //     poslist[i] = cc.find("pos" + i, this.start_match_panel);
        // }
        cv.StringTools.setLabelString(this.start_match_panel, "layer/start_match_label", "jackfruit_start_match_label");
        // let width = cv.resMgr.getLabelStringSize(cc.find("start_match_label", this.start_match_panel).getComponent(cc.Label)).width;
        // let labelpos = cc.find("start_match_label", this.start_match_panel).getPosition();
        // for (let i = 0; i < 3; i++) {
        //     poslist[i].setPosition(cc.v2(i * 13 + labelpos.x + (width + poslist[i].getContentSize().width) / 2 , labelpos.y))
        // }
        cv.resMgr.setSpriteFrame(this.aboutToStart_img, cv.config.getLanguagePath("game/jackfruit/ui/about_to_start_img"));
        cv.resMgr.setSpriteFrame(cc.find("change_img", this.change_table_btn), cv.config.getLanguagePath("game/jackfruit/ui/change_table_btn"));
        cv.resMgr.setSpriteFrame(cc.find("fold", this.other_fold_card_panel), cv.config.getLanguagePath("game/jackfruit/review/fold"));
        this.placeCardIsOK_delay_label.string = cv.config.getStringData("ActionTips7");
        cv.StringTools.setLabelString(this.placeCardIsOK_btn, "btn_label", "jackfruit_placeCardIsOK_button_label_0");

        for (let i = 0; i < 2; i++) {
            let lebel = cc.find(cv.StringTools.formatC("title_%d/label", i), this.guide_panel).getComponent(cc.Label);
            lebel.string = cv.config.getStringData("jackfruit_guide_label_" + i);
        }

        for (let i = 0; i < 3; i++) {
            let otherImg = this.otherMultipleImages[i];
            let selfImg = this.selfMultipleImages[i];

            cv.resMgr.setSpriteFrame(otherImg.node, cv.config.getLanguagePath("game/jackfruit/ui/multiple_" + i));
            cv.resMgr.setSpriteFrame(selfImg.node, cv.config.getLanguagePath("game/jackfruit/ui/multiple_" + i));
        }

        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cc.find("bg_node", this.upper_limit_panel).setContentSize(cc.size(700, 250));
            this.upper_limit_label.fontSize = 60;
        } else {
            cc.find("bg_node", this.upper_limit_panel).setContentSize(cc.size(820, 250));
            this.upper_limit_label.fontSize = 50;
        }
    }

    private _initCardBgAction() {
        for (let i = 0; i < 6; i++) {
            let actionBack = cc.instantiate(this.card_bg_action_back)
            actionBack.name = "action_back";
            this.otherTableCardBgs[i].node.addChild(actionBack);

            let actionFace = cc.instantiate(this.card_bg_action_face)
            actionFace.name = "action_face";
            let actionBack1 = cc.instantiate(this.card_bg_action_back)
            actionBack1.name = "action_back";
            this.selfTableCardBgs[i].node.addChild(actionFace);
            this.selfTableCardBgs[i].node.addChild(actionBack1);
            this.selfTableCardBgs[i].node.name = i.toString();
            this.selfTableCardBgs[i].node.on(cc.Node.EventType.TOUCH_START, this.clickSelfTableCardBg.bind(this), this.selfTableCardBgs[i].node);
            actionFace.active = false;
            actionBack.active = false;
            actionBack1.active = false;
        }
    }

    private _initCards() {
        let pos = this.selfTableCardBgs[0].node.getPosition();
        let spacing = (cc.winSize.width - pos.x * 2) / 6;

        for (let i = 0; i < 7; i++) {
            let cardBg = new cc.Node();
            cardBg.addComponent(cc.Sprite);
            this.card_panel.addChild(cardBg);
            cv.resMgr.setSpriteFrame(cardBg, "zh_CN/game/jackfruit/ui/card_bg");
            cardBg.setPosition(cc.v2(pos.x + spacing * i, 410 * cc.winSize.height / cv.config.DESIGN_HEIGHT));
            this._selfCardBgs[i] = cardBg.getComponent(cc.Sprite);
            cardBg.name = i.toString();
            cardBg.on(cc.Node.EventType.TOUCH_START, this.clickSelfCardBg.bind(this), cardBg);
        }

        this._initPublicCard();
        this._initSelfCard();
        this._initOtherTableCards();
    }

    private _initGuide() {
        let width = this._selfCardBgs[3].node.x - this._selfCardBgs[0].node.x + 60;
        let height = this.selfTableCardBgs[4].node.y - this._selfCardBgs[0].node.y + this.selfTableCardBgs[4].node.height / 2 + this._selfCardBgs[0].node.height / 2 + 50;
        let y = this._selfCardBgs[0].node.y + (this.selfTableCardBgs[4].node.y - this._selfCardBgs[0].node.y) / 2 - 10;
        for (let i = 0; i < this.guide_bg.length; i++) {
            this.guide_bg[i].setContentSize(width, height);
            this.guide_bg[i].y = y;
        }
        this.guide_bg[0].x = this._selfCardBgs[0].node.x - this._selfCardBgs[0].node.width / 2 - 20;
        this.guide_bg[1].x = this._selfCardBgs[6].node.x + this._selfCardBgs[6].node.width / 2 + 20;


        let action_node = this.guide_panel.getChildByName("action_node");
        let action_node1 = this.guide_panel.getChildByName("action_node_1");
        action_node.zIndex = 1;
        action_node1.zIndex = 1;
        let pos = this._selfCardBgs[4].node.getPosition();
        action_node1.setPosition(cc.v2(pos.x, pos.y + this._selfCardBgs[4].node.height / 4));

        let title0 = this.guide_panel.getChildByName("title_0");
        let title1 = this.guide_panel.getChildByName("title_1");
        title0.setPosition(cc.v2(this.guide_bg[0].x + width / 2, y + height / 2 + 70));
        title1.setPosition(cc.v2(this.guide_bg[1].x - width / 2, y + height / 2 + 70));

        let card0 = cc.instantiate(this._selfCards[0].img_cardFace);
        this.guide_panel.addChild(card0);
        card0.zIndex = 0;
        card0.setPosition(this._selfCards[0].node.getPosition());
        let card1 = cc.instantiate(this._selfCards[4].img_cardFace);
        this.guide_panel.addChild(card1);
        card1.zIndex = 0;
        card1.setPosition(this._selfCards[4].node.getPosition());
    }

    private _initPublicCard() {
        let pos = this.selfTableCardBgs[0].node.getPosition();
        let spacing = (cc.winSize.width - pos.x) / 5;
        let publicY = this.selfTableCardBgs[0].node.y + (this.otherTableCardBgs[0].node.y - this.selfTableCardBgs[0].node.y) / 2;

        for (let i = 0; i < 5; ++i) {
            this._publicCards[i] = cc.instantiate(this.card).getComponent('Card');
            this.public_card_panel.addChild(this._publicCards[i].node);
            this._publicCards[i].node.setPosition(cc.v2(pos.x + spacing * i, publicY));
            this._publicCardsPos[i] = this._publicCards[i].node.getPosition();
            this._publicCards[i].setContent(2, 1);
            let cardsize = this._publicCards[i].node.getContentSize();
            this._publicCards[i].node.setScale(cc.v2(146 / cardsize.width, 208 / cardsize.height))
            this._publicCards[i].node.active = false;

            let actionBig = cc.instantiate(this.card_action_big)
            this._publicCards[i].node.addChild(actionBig);
            actionBig.name = "huo";
            // actionBig.setPosition(this._cardPosOffsetByBg);
            actionBig.active = false;

            if (i > 2) {
                let pos = this._publicCardsPos[i];
                let y = pos.y - cardsize.height * this._publicCards[i].node.scale / 2 - this.danmu_btns[i - 3].getContentSize().height / 2 + 10;
                this.danmu_btns[i - 3].setPosition(cc.v2(pos.x, y));
            }
        }
    }

    private _playEffect(url: string, isLoop: boolean = false, volume: number = 0.5) {
        this._playEffectList.push(url);
        if (this._playEffectList.length >= 3) {
            let list = this._playEffectList.splice(0, 1);
            let audioID = cv.AudioMgr.getAudioID(list[0]);
            cv.AudioMgr.stopEffect(audioID);
            // if(audioID == cv.AudioMgr.getAudioID(this._path_Bgm) && cv.tools.isPlayMusic())
            // {
            //     cv.TT.showMsg("audioID is error " + audioID, cv.Enum.ToastType.ToastTypeInfo);
            // }
        }
        cv.AudioMgr.playEffect(url, isLoop, volume);
    }

    private _setCardTouch(card: cc.Node, isOpen: boolean) {
        if (isOpen) {
            // 容错  防止二次开启
            card.off(cc.Node.EventType.TOUCH_START);
            card.off(cc.Node.EventType.TOUCH_MOVE);
            card.off(cc.Node.EventType.TOUCH_END);
            card.off(cc.Node.EventType.TOUCH_CANCEL);

            card.on(cc.Node.EventType.TOUCH_START, this.clickSelfCardBack.bind(this));
            card.on(cc.Node.EventType.TOUCH_MOVE, this.clickSelfCardBack.bind(this));
            card.on(cc.Node.EventType.TOUCH_END, this.clickSelfCardBack.bind(this));
            card.on(cc.Node.EventType.TOUCH_CANCEL, this.clickSelfCardBack.bind(this));
        } else {
            card.off(cc.Node.EventType.TOUCH_START);
            card.off(cc.Node.EventType.TOUCH_MOVE);
            card.off(cc.Node.EventType.TOUCH_END);
            card.off(cc.Node.EventType.TOUCH_CANCEL);
        }
    }

    private _setSelfCardTouch(isOpen: boolean) {
        for (let i = 0; i < 7; ++i) {
            let card = this._selfCards[i];
            this._setCardTouch(card.node, isOpen);
            if (!isOpen) {
                let tag = card.tag;
                card.node.stopAllActions();
                card.node.setScale(this._cardScale);
                let pos: cc.Vec2;
                if (tag != -1) {
                    pos = this._getCardPosByBg(this.selfTableCardBgs[cv.Number(tag)])
                } else {
                    pos = this._getCardPosByBg(this._selfCardBgs[cv.Number(card.name)]);
                }
                card.node.setPosition(pos);

                card.name = i.toString();
                card.node.zIndex = 0;
                card.tag = -1;


                this._selectCard = null;
                this.select_card_img.active = false;
                this._isDoubleClick = false;
            }
        }
    }

    // name 代表手牌位置 tag代表摆牌位置 手牌位置保留 摆牌位置如果没有就是-1
    private _initSelfCard() {
        for (let i = 0; i < 7; ++i) {
            this._selfCards[i] = cc.instantiate(this.card).getComponent('Card');
            this.card_panel.addChild(this._selfCards[i].node);
            this._selfCards[i].node.setPosition(this._getCardPosByBg(this._selfCardBgs[i]));
            let cardsize = this._selfCards[i].node.getContentSize();
            let bgsize = this._selfCardBgs[i].node.getContentSize();
            this._selfCards[i].node.setScale(cc.v2(bgsize.width / cardsize.width, bgsize.height / cardsize.height));
            this._selfCards[i].tag = -1;
            this._selfCards[i].name = i.toString();
            let activeDrop = cc.instantiate(this.card_action_drop)
            this._selfCards[i].node.addChild(activeDrop);
            activeDrop.name = "activeDrop";
            activeDrop.active = false;

            let actionbig = cc.instantiate(this.card_action_big)
            this._selfCards[i].node.addChild(actionbig);
            actionbig.name = "huo";
            // actionbig.setPosition(this._cardPosOffsetByBg);
            actionbig.active = false;

            this._selfCards[i].node.active = false;
        }
        this._selfCards[0].node.getScale(this._cardScale);
    }

    private _initOtherTableCards() {
        for (let i = 0; i < 6; ++i) {
            this._otherTableCards[i] = cc.instantiate(this.card).getComponent('Card');
            this.card_panel.addChild(this._otherTableCards[i].node);
            this._otherTableCards[i].node.name = i.toString();
            this._otherTableCards[i].node.setPosition(this._getCardPosByBg(this.otherTableCardBgs[i]));
            this._otherTableCards[i].node.setScale(this._cardScale);
            this._otherTableCards[i].node.active = false;

            let actionbig = cc.instantiate(this.card_action_big)
            this._otherTableCards[i].node.addChild(actionbig);
            actionbig.name = "huo";
            // actionbig.setPosition(this._cardPosOffsetByBg);
            actionbig.active = false;
        }
    }

    private _cardCollisionCheck(card: Card, tableCardBg: cc.Sprite): number {
        let cardBg: cc.Sprite = tableCardBg;
        let cardBgPos: cc.Vec2 = cardBg.node.getPosition();
        let cardPos: cc.Vec2 = card.node.getPosition();
        let cardBgSize: cc.Size = cardBg.node.getContentSize();
        let cardSize: cc.Size = card.node.getContentSize();
        let cardScale = card.node.scale;
        let distanceX = Math.abs(cardBgPos.x - cardPos.x);
        let distanceY = Math.abs(cardBgPos.y - cardPos.y);
        let overlappingWidth = (cardBgSize.width + cardSize.width * cardScale) / 2;
        let overlappingHeight = (cardBgSize.height + cardSize.height * cardScale) / 2;
        if (distanceX < overlappingWidth && distanceY < overlappingHeight) {
            return (overlappingWidth - distanceX) * (overlappingHeight - distanceY);
        } else {
            return 0;
        }
    }

    private _tableCardCheck(index: number) {
        for (let i = 0; i < this._selfCards.length; i++) {
            let card: Card = this._selfCards[i];
            if (index == card.tag) {
                return true;
            }
        }
        return false;
    }

    private _getTableCard(index: number, card: Card): Card {
        for (let i = 0; i < this._selfCards.length; i++) {
            let result: Card = this._selfCards[i];
            if (index == result.tag &&
                (card.eCardNum != result.eCardNum || card.eCardSuit != result.eCardSuit)) {
                return result;
            }
        }
        return null;
    }

    private _getSelfTableCard(): CardItem[] {
        let isPlaceCardOver: boolean = true;
        let cardItems: CardItem[] = [];
        for (let i = 0; i < 6; i++) {
            let item: CardItem = new CardItem();
            for (let j = 0; j < this._selfCards.length; j++) {
                let card: Card = this._selfCards[j];
                if (card.tag == i) {
                    item.number = card.eCardNum;
                    item.suit = card.eCardSuit;
                    break;
                }
            }
            if (item.number == undefined) {
                isPlaceCardOver = false;
                item.number = cv.Number(world_pb.SpecialCards.Cards_Back);
                item.suit = cv.Number(world_pb.SpecialCards.Cards_Back);
            }
            cardItems[i] = item;
        }

        this._isPlaceCardOver = isPlaceCardOver;
        if (this._placeCardType == 2 || this._placeCardType == 5) {
            if (!isPlaceCardOver) {
                this.setPlaceCardIsOKTime(0);
            } else {
                this.setPlaceCardIsOKTime(this._placeCardType - 1);
            }
        } else {
            this.setPlaceCardIsOKTime(isPlaceCardOver ? 1 : 0);
        }
        return cardItems;
    }

    private _getSelfHoleCards(): CardItem[] {
        let cardItems: CardItem[] = [];
        for (let i = 0; i < 7; i++) {
            let item: CardItem = new CardItem();
            for (let j = 0; j < this._selfCards.length; j++) {
                let card: Card = this._selfCards[j];
                if (cv.Number(card.name) == i) {
                    item.number = card.eCardNum;
                    item.suit = card.eCardSuit;
                    cardItems[i] = item;
                    break;
                }
            }
        }

        return cardItems;
    }

    private _getCardByTag(tag: number): Card {
        for (let j = 0; j < this._selfCards.length; j++) {
            let card: Card = this._selfCards[j];
            if (cv.Number(card.tag) == tag) {
                return card;
            }
        }
        return null;
    }

    private _getCardByName(name: string): Card {
        for (let j = 0; j < this._selfCards.length; j++) {
            let card: Card = this._selfCards[j];
            if (card.name == name) {
                return card;
            }
        }
        return null;
    }

    private _getVacancyCardIndex(): number {
        for (let i = 0; i < 6; i++) {
            if (this._getCardByTag(i) == null) {
                return i;
            }
        }
        return -1;
    }

    private _getCardPosByBg(cardbg: cc.Sprite): cc.Vec2 {
        let pos = cardbg.node.getPosition();
        return cc.v2(pos.x + this._cardPosOffsetByBg.x, pos.y + this._cardPosOffsetByBg.y);
    }

    private _setAllScoreFont(label: cc.Label, score: number, isTotal?: Boolean) {
        score = cv.StringTools.serverGoldToShowNumber(score);
        score = cv.StringTools.toFixed(score, 1);
        let scoreStr = score.toString()
        if (score == 0) {
            label.font = this.all_level_number;
            if (isTotal) {
                label.fontSize = 35;
                label.lineHeight = 35;
                label.string = scoreStr;
            } else {
                label.fontSize = 95;
                label.lineHeight = 95;
                label.string = "+" + scoreStr;
            }
        } else {
            label.font = score < 0 ? this.all_lose_number : this.all_win_number;
            if (isTotal) {
                label.fontSize = score < 0 ? 40 : 45;
                label.lineHeight = score < 0 ? 40 : 45;
            } else {
                label.fontSize = score < 0 ? 100 : 130;
                label.lineHeight = score < 0 ? 100 : 130;
            }
            label.string = score < 0 ? scoreStr : "+" + scoreStr;
        }
    }

    private _setAllScore(score: number) {
        this.all_score_label.node.active = true;
        this._setAllScoreFont(this.all_score_label, score);
        let size = cv.resMgr.getLabelStringSize(this.all_score_label);
        let pos: cc.Vec2 = cc.v2(this._selfMultiplePos[1].x, this._selfMultiplePos[1].y + 43 - 17);
        pos = cc.v2(pos.x + size.width / 2, pos.y)
        this.all_score_label.node.setPosition(pos);
    }

    public onChangeBg(index: number) {
        cv.resMgr.setSpriteFrame(this.game_bg, "zh_CN/game/jackfruit/bg/bg_" + index)
    }

    /**
     * 更新牌面
     */
    public UpdateCardFace() {
        this._selfCards.forEach(card => card.updateCard());
        this._publicCards.forEach(card => card.updateCard());
        this._otherTableCards.forEach(card => card.updateCard());
        this._moveCards.forEach(card => card.updateCard());
    }

    public onRequestPlaceCard(isOver: boolean) {
        let list = this._getSelfTableCard()
        let headCards: CardItem[] = [];
        let middleCards: CardItem[] = [];
        let tailCards: CardItem[] = [];
        let holeCards: CardItem[] = this._getSelfHoleCards();
        for (let i = 0; i < 6; i++) {
            if (i < 2) {
                headCards[i] = list[i];
            } else if (i < 4) {
                middleCards[i - 2] = list[i];
            } else {
                tailCards[i - 4] = list[i];
            }

        }
        if (isOver) {
            cv.jackfruitNet.requestPlaceCardOver(headCards, middleCards, tailCards, holeCards);
        } else {
            cv.jackfruitNet.requestPlaceCard(headCards, middleCards, tailCards, holeCards);
        }

    }

    public moveCardByTableCardBgIndex(card: Card, index: number, isShowAction: boolean = true) {
        if (index < 0 || index >= this.selfTableCardBgs.length) {
            this.moveCardByHand(card);
            return;
        }
        let cardBg: cc.Sprite = this.selfTableCardBgs[index];

        let pos = this._getCardPosByBg(cardBg);
        let move = cc.moveTo(0.05, pos);
        let func = cc.callFunc((target, data) => {
            let card = data.card;
            let cardBg = data.cardBg;
            let isShowAction = data.isShowAction;
            this._setCardTouch(card.node, true);
            card.node.zIndex = 0;
            if (isShowAction) {
                card.showActionD(0);
                let actionNode = cardBg.node.getChildByName("action_face");
                actionNode.active = true;
                let action = actionNode.getComponent(cc.Animation);
                if (!action.hasEventListener("finished")) {
                    action.on("finished", function () {
                        actionNode.active = false;
                    }, this)
                }
                action.play("card_bg_action_face");
                this._playEffect(this._path_self_place);
            }
            if (target.scaleX != this._cardScale.x) {
                target.runAction(cc.scaleTo(0.1, this._cardScale.x, this._cardScale.y));
            }
        }, this, { card: card, cardBg: cardBg, isShowAction: isShowAction });
        card.node.stopAllActions();
        if (Math.abs(card.node.x - pos.x) >= 2 || Math.abs(card.node.y - pos.y) >= 2) {
            this._setCardTouch(card.node, false);
        }
        this._resetSelfTableCardBgs();
        card.node.runAction(cc.sequence(move, func));
        if (isShowAction) {
            this.onRequestPlaceCard(false);
        }
    }

    public moveCardByHand(card: Card) {
        if (card.tag != -1) {
            card.tag = -1;
            this.onRequestPlaceCard(false);
        }

        if (card.name != "") {
            let pos: cc.Vec2 = this._getCardPosByBg(this._selfCardBgs[cv.Number(card.name)]);
            let move = cc.moveTo(0.05, pos);
            let func = cc.callFunc((target) => {
                this._setCardTouch(target, true);
                target.zIndex = 0;
                if (target.scaleX != this._cardScale.x) {
                    target.runAction(cc.scaleTo(0.1, this._cardScale.x, this._cardScale.y));
                }
            }, this);
            card.node.stopAllActions();
            if (Math.abs(card.node.x - pos.x) >= 2 || Math.abs(card.node.y - pos.y) >= 2) {
                this._setCardTouch(card.node, false);
            }
            card.node.runAction(cc.sequence(move, func));
        }
    }
    private _sortSize(a: SizeItem, b: SizeItem): number {
        return a.size < b.size ? 1 : -1
    }

    public putCardByCheck(card: Card) {
        let sizeList: SizeItem[] = [];
        for (let i = 0; i < this.selfTableCardBgs.length; i++) {
            let cardBg: cc.Sprite = this.selfTableCardBgs[i];
            let item = new SizeItem();
            item.size = this._cardCollisionCheck(card, cardBg);
            item.index = i;
            sizeList.push(item);
        }
        sizeList.sort(this._sortSize.bind(this));

        if (sizeList[0].size > 0) {
            let index = sizeList[0].index;
            let tempCard = this._getTableCard(index, card);
            if (tempCard != null) {
                let tag = card.tag;
                let isShowActon = tempCard.tag != tag;
                tempCard.tag = tag;
                if (tag != -1) {
                    this.moveCardByTableCardBgIndex(tempCard, cv.Number(tag), isShowActon);
                } else {
                    let name = card.name;
                    card.name = tempCard.name;
                    tempCard.name = name;
                    this.moveCardByHand(tempCard);
                }
            }

            let isShowActon = card.tag != index;
            card.tag = index;
            this.moveCardByTableCardBgIndex(card, index, isShowActon);
        } else {
            this.moveCardByHand(card);
        }
    }

    private _exchangeCard(card1: Card, card2: Card) {
        console.log("tag1 = " + card1.tag + "  tag2 = " + card2.tag);

        let tag = card1.tag;
        card1.tag = card2.tag;
        card2.tag = tag;
        let name = card1.name;
        card1.name = card2.name;
        card2.name = name;
        this._moveCard(card1);
        this._moveCard(card2);
    }

    private _moveCard(card: Card) {
        if (card.tag != -1) {
            this.moveCardByTableCardBgIndex(card, cv.Number(card.tag));
        } else {
            this.moveCardByHand(card);
        }
    }

    private _doubleClickCard(card: Card) {
        console.log("双击");

        if (card.tag != -1) {
            this.moveCardByHand(card);
        } else {
            let index = this._getVacancyCardIndex();
            if (index != -1) {
                card.tag = index;
                this.moveCardByTableCardBgIndex(card, index);
            }
        }
    }

    private setSelectCardImg(cards: Card[]) {
        if (cards.length == 0) return;
        let size: cc.Size;
        let pos: cc.Vec2;
        let cardsize = cards[0].node.getContentSize();
        let scale = cards[0].node.scale;
        let tempsize = cc.size(scale * (cardsize.width + 33), scale * (cardsize.height + 33));
        if (cards.length == 1) {
            size = cc.size(tempsize.width, tempsize.height)
            pos = cards[0].node.getPosition();
        } else {
            let smallX = cards[0].node.getPosition().x < cards[1].node.getPosition().x ? cards[0].node.getPosition().x : cards[1].node.getPosition().x;
            let offset = Math.abs(cards[0].node.getPosition().x - cards[1].node.getPosition().x);
            size = cc.size(tempsize.width + offset, tempsize.height);
            pos = cc.v2(smallX + offset / 2, cards[0].node.getPosition().y);
        }
        this.select_card_img.setContentSize(size);
        this.select_card_img.setPosition(cc.v2(pos.x, pos.y));
    }

    public clickSelfCardBg(event: cc.Event.EventTouch, target?: any) {
        if (this._selectCard == null) return;

        let name: string = event.currentTarget.name;
        if (this._selectCard.name == name) {
            this.moveCardByHand(this._selectCard);
        } else {
            let tempCard = this._getCardByName(name);
            tempCard.name = this._selectCard.name;
            this._selectCard.name = name;
            this.moveCardByHand(this._selectCard);
        }
        this._selectCard = null;
        this.select_card_img.active = false;
    }

    public clickSelfTableCardBg(event: cc.Event.EventTouch, target?: any) {
        if (this._selectCard == null) return;
        let tag: number = cv.Number(event.currentTarget.name);
        this._selectCard.tag = tag;
        this.moveCardByTableCardBgIndex(this._selectCard, tag);
        this._selectCard = null;
        this.select_card_img.active = false;
    }

    public clickSelfCardBack(event: cc.Event.EventTouch, target?: any) {
        if (JackfruitManager.tRoomData.nSelfSeatID == -1) return;
        let card: Card = event.currentTarget.getComponent(Card);
        let location: cc.Vec2 = event.getLocation();
        let time = new Date().getTime();

        switch (event.type) {
            case cc.Node.EventType.TOUCH_START:
                if (this._selectCard != null) {
                    console.log("双击 " + time + "  " + this._oldTime);
                    if (this._selectCard == card && time - this._oldTime < 500) {
                        this._isDoubleClick = true;
                        this._selectCard = null;
                        this.select_card_img.active = false;
                        this._doubleClickCard(card);
                        return;
                    }
                }
                this._isDoubleClick = false;
                this._oldTime = time;
                this._oldLocation = location;
                this._location = location;
                this._moveCards = []
                this._isPress = true;
                card.node.zIndex = 1;
                card.node.stopAllActions();
                card.node.setScale(this._cardScale);
                this._moveCards.push(card);
                this.node.stopActionByTag(this.SHOW_SELECT_CARD_TAG);
                let action = this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => {
                    this._selectCard = null;
                    this._addMoveCards();
                }, this)));
                action.setTag(this.SHOW_SELECT_CARD_TAG);
                break;
            case cc.Node.EventType.TOUCH_MOVE:
                if (this._isPress) {
                    if (Math.abs(this._oldLocation.x - location.x) >= 2 || Math.abs(this._oldLocation.y - location.y) >= 2) {
                        this._isPress = false;
                        this.node.stopActionByTag(this.SHOW_SELECT_CARD_TAG);
                    }
                }
                if (this._selectCard != card) {
                    if (!this._isPress) {
                        this._selectCard = null;
                    }
                    if (this._moveCards.length != 2) {
                        this.select_card_img.active = false;
                    }
                }
                if (this._isDoubleClick && this._selectCard != null) return;
                this._setMoveCardsPos(location);
                break;
            case cc.Node.EventType.TOUCH_END:
            case cc.Node.EventType.TOUCH_CANCEL:
                this._isPress = false;
                this.node.stopActionByTag(this.SHOW_SELECT_CARD_TAG);
                if (this._isDoubleClick) return;
                if (this._selectCard == null) {
                    if (Math.abs(this._oldLocation.x - location.x) < 2 && Math.abs(this._oldLocation.y - location.y) < 2) {
                        this._selectCard = card;
                        this.select_card_img.active = true;
                        this.setSelectCardImg([card]);
                    }
                } else {
                    if (this._selectCard != card) {
                        this._exchangeCard(card, this._selectCard);
                        this._selectCard = null;
                        this.select_card_img.active = false;
                        return;
                    } else {
                        if (Math.abs(this._oldLocation.x - location.x) < 2 && Math.abs(this._oldLocation.y - location.y) < 2) {
                            console.log("选中");
                            this._selectCard = card;
                            this.select_card_img.active = true;
                            this.setSelectCardImg([card]);
                        } else {
                            this._selectCard = null;
                            this.select_card_img.active = false;
                        }
                    }
                }
                // this._setMoveCardsPos(location);

                if (this._moveCards.length == 2) {
                    this.select_card_img.active = false;
                }
                for (let j = 0; j < this._moveCards.length; j++) {
                    let card: Card = this._moveCards[j];
                    card.node.stopAllActions();
                    card.setGary(false);
                    this.putCardByCheck(card);
                }
                this._moveCards = []
                break;
        }
    }

    private _setMoveCardsPos(location: cc.Vec2) {
        this._resetSelfTableCardBgs();
        let offpos = cc.v2(location.x - this._location.x, location.y - this._location.y)
        for (let i = 0; i < this._moveCards.length; i++) {
            let card = this._moveCards[i];
            let pos = card.node.getPosition();
            card.node.setPosition(cc.v2(pos.x + offpos.x, pos.y + offpos.y));

            let sizeList: SizeItem[] = [];
            for (let j = 0; j < this.selfTableCardBgs.length; j++) {
                let cardBg: cc.Sprite = this.selfTableCardBgs[j];
                let item = new SizeItem();
                item.size = this._cardCollisionCheck(card, cardBg);
                item.index = j;
                sizeList.push(item);
            }
            sizeList.sort(this._sortSize.bind(this));
            if (sizeList[0].size > 0) {
                let cardBg: cc.Sprite = this.selfTableCardBgs[sizeList[0].index];
                cv.resMgr.setSpriteFrame(cardBg.node, "zh_CN/game/jackfruit/ui/card_bg_bright");
            }
        }
        this._location = location;
        this.setSelectCardImg(this._moveCards);
    }

    private _addMoveCards() {
        let card: Card = this._moveCards[0];
        if (card.tag == -1) return [];
        let tag: number = cv.Number(card.tag) % 2 == 0 ? cv.Number(card.tag) + 1 : cv.Number(card.tag) - 1;
        for (let i = 0; i < this._selfCards.length; i++) {
            if (this._selfCards[i].tag == tag) {
                this._selfCards[i].node.zIndex = 1;
                this._selfCards[i].node.stopAllActions();
                this._moveCards.push(this._selfCards[i]);
                break;
            }
        }
        if (this._moveCards.length == 2) {
            this._selectCard = null;
            for (let i = 0; i < this._moveCards.length; i++) {
                let card = this._moveCards[i];
                let scale = cc.scaleTo(0.1, 0.8 * this._cardScale.x, 0.8 * this._cardScale.y);
                let scale1 = cc.scaleTo(0.1, this._cardScale.x, this._cardScale.y);
                let func = cc.callFunc((target, data) => {
                    data.setGary(true);
                }, this, card);
                let func1 = cc.callFunc((target, data) => {
                    data.setGary(false);
                    if (i == 1) {
                        this.select_card_img.active = true;
                        this.setSelectCardImg(this._moveCards);
                    }
                }, this, card);
                card.node.stopAllActions();
                card.node.runAction(cc.sequence(func, scale, scale1, func1));
            }
        }
    }

    private _initPos() {
        let adaptIndex = cc.winSize.height / cv.config.DESIGN_HEIGHT;
        let cardPanelHeight = cc.winSize.height;
        if (cv.config.IS_FULLSCREEN) {
            adaptIndex = (cc.winSize.height - cv.config.FULLSCREEN_OFFSETY) / cv.config.DESIGN_HEIGHT;
            cardPanelHeight = cc.winSize.height - cv.config.FULLSCREEN_OFFSETY;
        }
        else {
            adaptIndex = (cc.winSize.height - cv.config.FULLSCREEN_OFFSETY + 20) / cv.config.DESIGN_HEIGHT;
            cardPanelHeight = cc.winSize.height - cv.config.FULLSCREEN_OFFSETY + 20;
        }

        // 调整拉霸按钮后, 这些按钮需要整体下移
        let offset_y = 20;
        this.menu_button.y -= offset_y;
        this.aof_lost_btn.y -= offset_y;
        this.allReview_button.y -= offset_y;

        // 适配card节点
        this.card_panel.height = cardPanelHeight;
        let widgets = this.card_panel.getComponentsInChildren(cc.Widget);
        for (let i = 0; i < widgets.length; i++) {
            widgets[i].updateAlignment();
        }

        let Seat_0: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, 200 * adaptIndex);
        let Seat_1: cc.Vec2 = cc.v2(cv.config.WIDTH / 2, 2175 * adaptIndex);
        this._postList.push(Seat_0);
        this._postList.push(Seat_1);

        for (let i = 0; i < 3; i++) {
            let pos = this.otherMultipleImages[i].node.getPosition();
            let pos1 = this.otherTableCardBgs[i * 2].node.getPosition();
            this._otherMultiplePos[i] = cc.v2(pos.x, pos1.y - 43);
            this.otherMultipleImages[i].node.setPosition(this._otherMultiplePos[i]);

            pos = this.selfMultipleImages[i].node.getPosition();
            pos1 = this.selfTableCardBgs[i * 2].node.getPosition();
            this._selfMultiplePos[i] = cc.v2(pos.x, pos1.y - 43);
            this.selfMultipleImages[i].node.setPosition(this._selfMultiplePos[i]);
        }
    }

    private _initSeat(nPlayerCount: number) {
        for (let i: number = 0; i < nPlayerCount; i++) {
            let seat: Seat = cc.instantiate(this.seat).getComponent(Seat);
            this.seat_panel.addChild(seat.node);
            seat.setSpecialEffectsPanel(this.specialEffects_panel);
            seat.node.setPosition(cc.v2(this._postList[i].x, this._postList[i].y));
            seat.setSeatID(i);
            seat.setSeatViewID(i);
            this._seatList.push(seat);
            seat.updateSeatStatus(eSeatStatus.SeatStatus_empty);
        }
    }

    private _initStartActive() {
        let pos = this.specialEffects_mask_panel.convertToNodeSpaceAR(this.aboutToStart_panel.convertToWorldSpaceAR(this.aboutToStart_label.node.getPosition()));
        for (let i = 0; i < this._seatList.length + 1; i++) {
            this.start_action_ball_node_list[i] = cc.instantiate(i == 0 ? this.start_action_ball_1 : this.start_action_ball_2);
            this._actionStartBallList[i] = this.start_action_ball_node_list[i].getComponent(cc.Animation);
            this.specialEffects_mask_panel.addChild(this.start_action_ball_node_list[i]);
        }

        for (let i = 0; i < this._seatList.length; i++) {
            this.start_action_light_node_list[i] = cc.instantiate(this.start_action_light);
            this._actionStartLightList[i] = this.start_action_light_node_list[i].getComponent(cc.Animation);
            this.specialEffects_mask_panel.addChild(this.start_action_light_node_list[i]);
            this._actionStartLightList[i].node.setPosition(pos)
        }

        this.start_action_ball_node_list[0].setPosition(pos);
        this.start_action_ball_node_list[0].active = false;

        for (let i = 0; i < this._seatList.length; i++) {
            let seat = this._seatList[i];
            let seatHeadPos = this.specialEffects_mask_panel.convertToNodeSpaceAR(seat.getHeadWorldPos());
            this.start_action_ball_node_list[i + 1].setPosition(seatHeadPos);
            this.start_action_ball_node_list[i + 1].active = false;

            let side1 = Math.abs(seatHeadPos.x - pos.x);
            let side2 = Math.abs(seatHeadPos.y - pos.y);
            let tan = side1 / side2;
            let angle = Math.atan(tan) / (Math.PI / 180);
            let side3 = Math.sqrt(side1 * side1 + side2 * side2);
            let rotation = 0;
            if (seatHeadPos.x < pos.x) {
                if (seatHeadPos.y < pos.y) {
                    rotation = 180 - angle;
                } else {
                    rotation = angle;
                }
            } else {
                if (seatHeadPos.y < pos.y) {
                    rotation = 270 - angle;
                } else {
                    rotation = 360 - angle;
                }
            }

            this.start_action_light_node_list[i].angle = rotation;
            this.start_action_light_node_list[i].scaleY = side3 / this.start_action_light_node_list[i].getContentSize().height;
            this.start_action_light_node_list[i].active = false;
        }
    }

    public _getFeipaiMovePos(isSelf: boolean, index: number): cc.Vec2 {
        let bglist = isSelf ? this.otherTableCardBgs : this.selfTableCardBgs;
        let pos1 = bglist[index * 2].node.getPosition()
        let pos2 = bglist[index * 2 + 1].node.getPosition()
        return cc.v2(pos1.x + (pos2.x - pos1.x) / 2, pos1.y);
    }

    private _initView() {
        this.waitReady_panel.active = false;
        this.exchange_node.active = false;
        this.all_score_label.node.zIndex = 2;
        this.select_card_img.zIndex = 2;
        for (let i = 0; i < this.wait_node.length; i++) {
            this.wait_node[i].zIndex = cc.macro.MAX_ZINDEX;
        }
        this.onUpdataStartMatch(false);
        this._resetView();
    }

    private _resetView() {
        this.showUpperLimit(false);
        if (this._jackPotHitCardType) {
            let action = cc.find("action_panel", this._jackPotHitCardType).getComponent(cc.Animation);
            action.stop();
            this._jackPotHitCardType.removeFromParent(true);
            this._jackPotHitCardType.destroy();
            this._jackPotHitCardType = null;
        }
        this._jackpotInfos = [];
        this.other_fold_card_panel.stopAllActions();
        this.other_fold_card.node.stopAllActions();
        this.other_fold_card_panel.active = false;
        this._selectCard = null;
        this.select_card_img.active = false;
        this.change_table_btn.active = false;
        this.all_score_label.node.active = false;
        let delayNode = this.placeCardIsOK_btn.getChildByName("delay_node");
        delayNode.active = false;
        this.all_victory_img.active = false;
        this.game_end_panel.active = false;
        this.card_panel.active = false;
        this.aboutToStart_panel.active = false;
        this.modal_panel.active = false;
        this.placeCardIsOK_btn.stopAllActions()
        this.placeCardIsOK_btn.setScale(cc.v2(1, 1));
        this.placeCardIsOK_progressBar.progress = 1;
        this.placeCardIsOK_btn.active = false;
        let action_node = this.aboutToStart_panel.getChildByName("action_node");
        let action_node1 = this.aboutToStart_panel.getChildByName("action_node_1");
        action_node.active = false;
        action_node1.active = true;
        for (let i = 0; i < this.wait_node.length; i++) {
            this.wait_node[i].active = false;
        }
        let index = cv.tools.GetStringByCCFile("jackfruit_bg");
        this.onChangeBg(cv.Number(index));
        this.updateLabaNum(false);
        this.addTime_btn.active = false;

        this.guide_panel.on(cc.Node.EventType.TOUCH_START, function () {
            this.guide_panel.getChildByName("action_node").stopAllActions();
            this.guide_panel.active = false;
        }, this)
        this.guide_panel.active = false;
        this._setSelfCardTouch(false);
        for (let i = 0; i < 3; i++) {
            this.otherMultipleImages[i].node.stopAllActions();
            this.selfMultipleImages[i].node.stopAllActions();
            this.otherMultipleImages[i].node.setPosition(this._otherMultiplePos[i]);
            this.selfMultipleImages[i].node.setPosition(this._selfMultiplePos[i]);
            this.otherMultipleImages[i].node.opacity = 255;
            this.selfMultipleImages[i].node.opacity = 255;
        }

        for (let i = 0; i < 2; i++) {
            this.danmu_btns[i].active = false;
        }
    }

    private _recetAllSeats() {
        let len = this._seatList.length;
        for (let i = 0; i < len; i++) {
            this._seatList[i].updateSeatStatus(eSeatStatus.SeatStatus_empty);
        }
        JackfruitManager.tRoomData.nSelfSeatID = -1;
        this._isSeat = false;
    }

    private _resetSelfTableCardBgs() {
        for (let i = 0; i < this.selfTableCardBgs.length; i++) {
            let cardBg = this.selfTableCardBgs[i];
            cv.resMgr.setSpriteFrame(cardBg.node, "zh_CN/game/jackfruit/ui/card_bg");
        }
    }

    private _resetGame(isReady?: boolean) {
        this._resetView();
        this._placeCardType = 0;
        this.specialEffects_panel.destroyAllChildren();
        this.specialEffects_panel.removeAllChildren(true);
        this.specialEffects_mask_panel.destroyAllChildren();
        this.specialEffects_mask_panel.removeAllChildren(true);
        this.specialEffects_mask_panel.removeComponent(cc.BlockInputEvents);
        let node = cc.instantiate(this.mask_panel);
        node.active = true;
        this.specialEffects_mask_panel.addChild(node);
        this.specialEffects_mask_panel.active = false;

        for (let i = 0; i < 7; ++i) {
            this._selfCards[i].node.stopAllActions();
            this._selfCards[i].node.setScale(this._cardScale);
            this._selfCards[i].node.setPosition(this._getCardPosByBg(this._selfCardBgs[i]));
            this._selfCards[i].enabled = true;
            this._selfCards[i].tag = -1;
            this._selfCards[i].node.zIndex = 0;
            this._selfCards[i].setGary(false);
            this._selfCards[i].node.getChildByName("huo").active = false;
            this._selfCards[i].node.active = false;
        }

        for (let i = 0; i < 5; ++i) {
            this._publicCards[i].setGary(false);
            this._publicCards[i].node.getChildByName("huo").active = false;
            this._publicCards[i].node.active = false;
        }

        for (let i = 0; i < 6; ++i) {
            this._otherTableCards[i].node.setPosition(this._getCardPosByBg(this.otherTableCardBgs[i]));
            this._otherTableCards[i].setGary(false);
            this._otherTableCards[i].node.getChildByName("huo").active = false;
            this._otherTableCards[i].node.active = false;
        }

        for (let i = 0; i < this.otherCardTypeNode.length; i++) {
            this.selfCardTypeNode[i].active = false;
            this.otherCardTypeNode[i].opacity = 255;
            this.otherCardTypeNode[i].active = false;
        }

        for (let i = 0; i < this._selfCardBgs.length; i++) {
            this._selfCardBgs[i].node.opacity = 255;
        }

        this.node.stopActionByTag(this.SHOW_SINGLE_SCORE_TAG);
        this.node.stopActionByTag(this.SHOW_SEAT_LOST_TAG);
        this.node.stopActionByTag(this.SHOW_SELECT_CARD_TAG);
        this.node.stopActionByTag(this.WAITING_OTHER_PLAYER_NOTIFY_TAG);
        this._resetSelfTableCardBgs();
        if (!isReady) {
            this.waitReady_panel.active = false;
            this.stopTimeUpdate();
            this._isReady = false;
        }
    }

    private _initRoomData() {
        let roomData = JackfruitManager.tRoomData.param;
        // let gameName = cv.tools.displayChineseName(roomData.gameName);
        let ante = cv.StringTools.serverGoldToShowNumber(roomData.ante);
        // let anteStr = cv.StringTools.formatC(cv.config.getStringData("jackfruit_review_ante"), ante.toString());

        // this.ante_label.string = anteStr;
        this.exchange_node.active = true;
        this.exchange_label.string = ante.toString();
    }

    public onAppEnterBackground(pSend: any) {
        //私语版本, 切回后台后，将所有音频暂停
        // if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cv.AudioMgr.stopMusic();
        } else {
            if (!cv.tools.isPlayMusic()) {
                cv.AudioMgr.play("zh_CN/game/dzpoker/audio/silence2", true, 0.5, true);
            }
        }
        cv.tools.setEnterbackState(true);
        // }
        this._resetGame();
    }

    public onAppEnterForeground(pSend: any) {
        // if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
        cv.tools.setEnterbackState(false);
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this.onUpdataBGM();
        } else {
            if (!cv.tools.isPlayMusic()) {
                cv.AudioMgr.stop(cv.AudioMgr.getAudioID("zh_CN/game/dzpoker/audio/silence2"));
            }
        }
        // }
    }

    public setGameScene(scene: JackfruitScene) {
        this.game = scene;
    }

    public OnGameDataSync(pSend: any) {
        this.face_button.active = false;
        this.record_button.active = false;
        let nPlayerCount = JackfruitManager.tRoomData.param.playerCountMax;
        let isFirst = false;
        if (!this._bIsInit) {
            isFirst = true;
            this._bIsInit = true;
            this._initSeat(nPlayerCount);
            this._addEvent();
        } else {
            this._resetGame()
            this._recetAllSeats();
        }
        this._initRoomData();
        this.setRecordEnabled(false);
        let players = JackfruitManager.tRoomData.kTablePlayerList;
        for (let i = 0; i < players.length; i++) {
            let player: PlayerInfo = players[i];
            this.playerSitDown(player);
        }
        if (isFirst) {
            this.setFirstSeat();
        }

        if (JackfruitManager.tRoomData.canChangeTable) {
            this.onShowChangeTableBtn()
        }

        if (JackfruitManager.tRoomData.jackpotLeftAmount != -1) {
            this.showJackPotNumPanel();
        } else {
            this.game.jackpot_number_panel.active = false;
        }

        this.onUpdataStartMatch(JackfruitManager.tRoomData.startMatchTimeStamp > 0);

        this.setGame();
    }

    public setGame() {
        let msg = JackfruitManager.tRoomData.cachedNotifyMsg;
        let curState = JackfruitManager.tRoomData.curState;
        let playerSettles = JackfruitManager.tRoomData.cachedNotifyMsg.playerSettle;
        switch (curState) {
            case eRoundState.RS_FREE:
                break;
            case eRoundState.RS_READY:
                if (JackfruitManager.tRoomData.kTablePlayerList.length == 2 ||
                    JackfruitManager.tRoomData.nSelfSeatID != -1) {
                    this.showGameEnd(msg.leftSeconds);
                }
                break;
            case eRoundState.RS_WAIT:
                this.setGameWillStart(msg.leftSeconds);
                break;
            case eRoundState.RS_DEAL:
            case eRoundState.RS_TURN:
            case eRoundState.RS_RIVER:
                this.card_panel.active = true;
                this.setPublicCards(msg.pubCards);
                for (let i = 0; i < playerSettles.length; i++) {
                    let playerSettle: PlayerSettle = playerSettles[i];
                    this.setSeatInfo(playerSettle, curState);
                }
                break;
            case eRoundState.RS_PLACE_CARDS:
                this.card_panel.active = true;
                this.setPublicCards(msg.pubCards);
                for (let i = 0; i < playerSettles.length; i++) {
                    let playerSettle: PlayerSettle = playerSettles[i];
                    this.setSeatInfo(playerSettle, curState);
                }
                let time = msg.leftSeconds;
                this.updataPlaceCardTime(time);
                break;
            case eRoundState.RS_SETTLEMENT:
                this.card_panel.active = true;
                this.setPublicCards(msg.pubCards);
                for (let i = 0; i < playerSettles.length; i++) {
                    let playerSettle: PlayerSettle = playerSettles[i];
                    this.setSeatInfo(playerSettle, curState);
                }
                if (msg.leftSeconds >= 4) {
                    this.showWinOrLose();
                }
                break;
        }
    }

    public setPublicCards(pubCards: CardItem[], isAction?: boolean, delayTime?: number) {
        for (let i = 0; i < pubCards.length; i++) {
            let kCard: CardItem = pubCards[i];
            let card = this._publicCards[i];
            card.setContent(kCard.number, kCard.suit);
            card.setHighLight(false);
            card.setGary(false);
            card.resetPos();
            card.node.getChildByName("huo").active = false
            if (isAction && !card.node.active) {
                card.setFace(!(kCard.number == 256));
                card.node.active = true;
                card.node.stopAllActions();
                let pos = this._publicCardsPos[i];
                card.node.setPosition(cc.v2(cc.winSize.width + card.node.getContentSize().width * card.node.scaleX, pos.y));
                let delay = cc.delayTime(delayTime);
                let move = cc.moveTo(0.2, pos);
                let func = cc.callFunc(() => {
                    this._playEffect(this._path_public_card_4);
                }, this);
                let func1 = cc.callFunc((target, data) => {
                    data.showActionD(1);
                }, this, card);
                card.node.runAction(cc.sequence(delay, func, move, func1));
            } else {
                card.setFace(!(kCard.number == 256));
                card.node.active = true;
            }
        }
    }

    public setSelfCards(selfCards: CardItem[], isAction?: boolean) {
        for (let i = 0; i < this._selfCards.length; i++) {
            let card = this._selfCards[i];
            card.node.active = true;
            let kCard: CardItem = selfCards[i];
            card.setContent(kCard.number, kCard.suit);
            card.setFace(!(kCard.number == 256));
            card.setHighLight(false);
            card.setGary(false);
            card.resetPos();
            card.tag = -1;
            card.name = i.toString();
            card.node.getChildByName("huo").active = false
            if (isAction) {
                card.node.stopAllActions();
                card.node.opacity = 0;
                let pos = this._getCardPosByBg(this._selfCardBgs[i]);
                let delay = cc.delayTime(0.05 * i);
                let func = cc.callFunc((target, data) => {
                    if (data.name == "0") {
                        this._playEffect(this._path_hand_2);
                    }
                    data.node.opacity = 255;
                    data.node.setPosition(cc.v2(pos.x, 700));
                    let actionNode = data.node.getChildByName("activeDrop");
                    actionNode.active = true;
                    let action: cc.Animation = actionNode.getComponent(cc.Animation);
                    if (!action.hasEventListener("finished")) {
                        action.on("finished", function () {
                            actionNode.active = false;
                        }, this)
                    }
                    action.play("card_action_drop");
                }, this, card);
                let move = cc.moveTo(0.2, pos);

                let func1 = cc.callFunc((target, data) => {
                    data.showActionD(2);
                }, this, card);
                card.node.runAction(cc.sequence(delay, func, move, func1));
            } else {
                card.node.opacity = 255;
            }
        }
    }

    public setSelfTableCards(cards: CardItem[], index: number, isShowTurn?: boolean) {
        if (cards[0].number == 256 && JackfruitManager.tRoomData.nSelfSeatID == -1) {
            for (let i = 0; i < cards.length; i++) {
                let tag = i + index * 2;
                let kCard: Card = this._selfCards[tag];
                kCard.node.active = true;
                kCard.setHighLight(false);
                kCard.setGary(false);
                kCard.resetPos();
                kCard.setContent(cards[i].number, cards[i].suit);
                kCard.node.getChildByName("huo").active = false
                kCard.setFace(false);
                kCard.tag = tag;
                kCard.node.stopAllActions();
                kCard.node.setPosition(this._getCardPosByBg(this.selfTableCardBgs[tag]));
            }
        } else {
            for (let i = 0; i < cards.length; i++) {
                for (let j = 0; j < this._selfCards.length; j++) {
                    let kCard: Card = this._selfCards[j];
                    if (kCard.eCardNum == cards[i].number && kCard.eCardSuit == cards[i].suit) {
                        let tag = i + index * 2;
                        kCard.tag = tag;
                        kCard.node.stopAllActions();
                        kCard.node.setPosition(this._getCardPosByBg(this.selfTableCardBgs[tag]));

                        if (isShowTurn) {
                            kCard.setFace(false);
                            kCard.turn(0, true);
                        }
                        break;
                    }
                }
            }
        }
    }

    public hideSurplusSelfCard() {
        for (let i = 0; i < this._selfCards.length; i++) {
            let kCard: Card = this._selfCards[i];
            if (kCard.tag == -1) {
                kCard.node.stopAllActions();
                kCard.node.setPosition(this._getCardPosByBg(this._selfCardBgs[i]));
                // kCard.node.runAction(cc.fadeOut(0.5));
                if (JackfruitManager.tRoomData.nSelfSeatID == -1) {
                    kCard.node.active = false;
                } else {
                    kCard.setGary(true);
                }
            }

        }

        for (let i = 0; i < this._selfCardBgs.length; i++) {
            this._selfCardBgs[i].node.opacity = 127;
        }
    }

    public otherPlaceOver() {
        this._playEffect(this._path_place_card_1);
        for (let i = 0; i < this._otherTableCards.length; i++) {
            let card = this._otherTableCards[i];
            card.node.active = true;
            card.setHighLight(false);
            card.setGary(false);
            card.resetPos();
            card.setFace(false);
        }

        for (let i = 0; i < this.otherTableCardBgs.length; i++) {
            let cardBg = this.otherTableCardBgs[i];
            let actionNode = cardBg.node.getChildByName("action_back");
            actionNode.active = true;
            let action = actionNode.getComponent(cc.Animation);
            action.play("card_bg_action_back");
            if (!action.hasEventListener("finished")) {
                action.on("finished", function () {
                    actionNode.active = false;
                }, this)
            }
        }
    }

    public selfPlaceOver() {
        this._playEffect(this._path_place_card_1);
        for (let i = 0; i < this.selfTableCardBgs.length; i++) {
            let card = this._selfCards[i];
            card.node.active = true;
            card.setFace(false);
            card.node.setPosition(this._getCardPosByBg(this.selfTableCardBgs[i]));
        }
        this._selfCards[6].node.active = false;

        for (let i = 0; i < this.selfTableCardBgs.length; i++) {
            let cardBg = this.selfTableCardBgs[i];
            let actionNode = cardBg.node.getChildByName("action_back");
            actionNode.active = true;
            let action = actionNode.getComponent(cc.Animation);
            action.play("card_bg_action_back");
            if (!action.hasEventListener("finished")) {
                action.on("finished", function () {
                    actionNode.active = false;
                }, this)
            }
        }
    }

    public setOtherFoldCard(player: PlayerInfo, isRunAction: boolean) {
        let cards: CardItem[] = [];
        for (let i = 0; i < player.holeCards.length; i++) {
            cards[i] = player.holeCards[i];
        }
        JackfruitManager.filterCards(cards, player.headCards);
        JackfruitManager.filterCards(cards, player.middleCards);
        JackfruitManager.filterCards(cards, player.tailCards);
        this.other_fold_card_panel.stopAllActions();
        this.other_fold_card.node.stopAllActions();
        this.other_fold_card_panel.active = cards.length == 1;
        if (cards.length == 1) {
            JackfruitManager.setCardImg(this.other_fold_card.node, cards[0]);
            if (isRunAction) {
                this.other_fold_card_panel.scale = 1.4
                this.other_fold_card_panel.runAction(cc.scaleTo(0.2, 1));
                this.other_fold_card.node.color = cc.color(255, 255, 255, 128);
                let action: cc.ActionInterval = cc.sequence(cc.delayTime(0.07), cc.tintTo(0.13, 197, 197, 197))
                this.other_fold_card.node.runAction(cc.spawn(cc.fadeTo(0.1, 255), action));
            } else {
                this.other_fold_card_panel.scale = 1;
                this.other_fold_card.node.color = cc.color(197, 197, 197, 255);
            }
        }
    }

    public setOtherTableCards(cards: CardItem[], index: number, isRunAction?: boolean) {
        for (let i = 0; i < cards.length; i++) {
            let item: CardItem = cards[i];
            let card = this._otherTableCards[i + index * 2];
            card.node.active = true;
            card.setContent(item.number, item.suit);
            card.setHighLight(false);
            card.setGary(false);
            card.resetPos();
            card.node.getChildByName("huo").active = false
            if (isRunAction) {
                card.setFace(false);
                card.turn(0, true);
            } else {
                card.setFace(!(item.number == 256));
            }
        }
    }

    public setFirstSeat() {
        if (JackfruitManager.tRoomData.nSelfSeatID == -1) {
            for (let i = 0; i < this._seatList.length; i++) {
                if (this._seatList[i]._seat_status == eSeatStatus.SeatStatus_empty) {
                    this.turnSeat(this._seatList[i].getSeatViewID(), false);
                }
            }
        }
    }

    public playerSitDown(pkPlayer: PlayerInfo) {
        if (pkPlayer) {
            let nSeatID = pkPlayer.seatId;
            let nUid = pkPlayer.playerId;

            if (nUid === cv.dataHandler.getUserData().u32Uid) {
                this.face_button.active = true;
                this.record_button.active = true;
                this.setRecordEnabled(true);
                this._resetGame();
                JackfruitManager.tRoomData.nSelfSeatID = nSeatID;
                JackfruitManager.tRoomData.nPrePickSeatID = -1;
                this.game.menu_Panel.getComponent(JackfruitMenu).updateMenu();
            }

            let pkSeat: Seat = this.getSeatBySeatID(nSeatID);
            if (pkSeat) {
                pkSeat.setData(pkPlayer);
                pkSeat.setSeatViewID(pkSeat.getSeatViewID());
                pkSeat.updateSeatStatus(eSeatStatus.SeatStatus_waiting);

                if (nUid === cv.dataHandler.getUserData().u32Uid) {
                    // this.setShowAudit(true);
                    this._isSeat = true;
                    this.turnSeat(pkSeat.getSeatViewID(), cv.dataHandler.getUserData().m_bIsReconnect ? false : true);
                    cv.dataHandler.getUserData().m_bIsReconnect = false;
                    this.addTime_text.string = cv.StringTools.serverGoldToShowString(JackfruitManager.tRoomData.actionDelayCountsFee);
                } else {
                    switch (pkPlayer.state) {
                        case ePlayerState.SReady:
                            if (JackfruitManager.tRoomData.kTablePlayerList.length == 2) {
                                pkSeat.updateSeatStatus(eSeatStatus.SeatStatus_ready);
                            } else {
                                pkSeat.updateSeatStatus(eSeatStatus.SeatStatus_waiting_bubble);
                            }
                            break;
                        case ePlayerState.SClickReady:
                            pkSeat.updateSeatStatus(eSeatStatus.SeatStatus_wait_ready);
                            break;
                        default:
                            pkSeat.updateSeatStatus(eSeatStatus.SeatStatus_inGame);
                            break;
                    }
                }
            }
            else {
                let len = this._seatList.length;
                if (len > 0) {
                    cv.TT.showMsg("can't find Seat(" + nSeatID + ")", cv.Enum.ToastType.ToastTypeError);
                }
            }
        }
    }

    public getSeatByPlayerID(playerid: number): Seat {
        for (let i = 0; i < JackfruitManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = JackfruitManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer && playerid == pkPlayer.playerId) {
                let pkSeat: Seat = this.getSeatBySeatID(pkPlayer.seatId);
                return pkSeat;
            }
        }
    }

    public getSeatBySeatID(seatID: number): Seat {
        let len = this._seatList.length;
        for (let i = 0; i < len; i++) {
            if (this._seatList[i].getSeatID() == seatID) return this._seatList[i];
        }
        return null;
    }

    public getSeatByViewID(viewID: number): Seat {
        let len = this._seatList.length;
        for (let i = 0; i < len; i++) {
            if (this._seatList[i].getSeatViewID() == viewID) return this._seatList[i];
        }
        return null;
    }

    public setSeatInfo(playSettle: PlayerSettle, curState: eRoundState) {
        if (playSettle) {
            let player = playSettle.player;
            let pkSeat: Seat = this.getSeatBySeatID(player.seatId);
            if (pkSeat) {
                let viewID = this.getSeatBySeatID(player.seatId).getSeatViewID();
                if (viewID == 0) {
                    if (JackfruitManager.tRoomData.nSelfSeatID == -1) {
                        if (player.state == ePlayerState.SWaitPlaceCards
                            || player.state == ePlayerState.SModifyPlaceCards
                            || player.state == ePlayerState.SPlaceCards
                            || player.state == ePlayerState.SConfirmsPlaceCards) {
                            this.setSelfCards(player.holeCards);
                        }
                    } else {
                        if (player.state == ePlayerState.SPlaceCards
                            || player.state == ePlayerState.SModifyPlaceCards
                            || player.state == ePlayerState.SConfirmsPlaceCards) {
                            this._setSelfCardTouch(true);
                        }
                    }
                    if (player.state == ePlayerState.SWaitResult ||
                        JackfruitManager.tRoomData.nSelfSeatID == player.seatId) {
                        this.setSelfCards(player.holeCards);
                        this.setSelfTableCards(player.headCards, 0);
                        this.setSelfTableCards(player.middleCards, 1);
                        this.setSelfTableCards(player.tailCards, 2);
                    }

                    if (player.state == ePlayerState.SWaitResult) {
                        this.hideSurplusSelfCard();
                        this.setPlaceCardIsOKTime(2);
                    } else if (player.state == ePlayerState.SConfirmsPlaceCards) {
                        this.setPlaceCardIsOKTime(2);
                    } else if (player.state == ePlayerState.SPlaceCards
                        || player.state == ePlayerState.SModifyPlaceCards) {
                        if (JackfruitManager.tRoomData.nSelfSeatID == player.seatId) {
                            this._getSelfTableCard();
                            this.addTime_btn.active = JackfruitManager.tRoomData.actionDelayCountsFee != -1;
                        } else {
                            this.setPlaceCardIsOKTime(0);
                            if (player.state == ePlayerState.SPlaceCards) {
                                this.setWaitByViewID(0, true);
                            } else {
                                this.setModifyByViewID(0, true);
                            }
                        }
                    }
                } else {
                    if (player.state == ePlayerState.SWaitResult) {
                        this.setOtherFoldCard(player, false);
                        this.setOtherTableCards(player.headCards, 0);
                        this.setOtherTableCards(player.middleCards, 1);
                        this.setOtherTableCards(player.tailCards, 2);
                        this.setWaitByViewID(1, false);
                    } else if (player.state == ePlayerState.SPlaceCards) {
                        this.setWaitByViewID(1, true);
                    } else if (player.state == ePlayerState.SModifyPlaceCards) {
                        this.setOtherTableCards(player.headCards, 0);
                        this.setOtherTableCards(player.middleCards, 1);
                        this.setOtherTableCards(player.tailCards, 2);
                        this.setModifyByViewID(1, true);
                    } else if (player.state == ePlayerState.SConfirmsPlaceCards) {
                        this.setOtherTableCards(player.headCards, 0);
                        this.setOtherTableCards(player.middleCards, 1);
                        this.setOtherTableCards(player.tailCards, 2);
                    }
                }

                if (curState == eRoundState.RS_SETTLEMENT) {
                    if (viewID == 0) {
                        this.hideSurplusSelfCard();
                        this._setAllScore(playSettle.totalScore);
                    }
                }
            } else {
                cv.TT.showMsg("can't find Seat:" + player.seatId, cv.Enum.ToastType.ToastTypeError);
            }
        }
    }

    public turnSeat(seatViewId: number, isNeedActoin: boolean) {
        if (this._isTurning) {
            return;
        }
        this._trunIngSeatViewID = seatViewId;

        let len = this._seatList.length;
        let mid = (len + 1) / 2;
        //不转
        if (this._trunIngSeatViewID == 0) {
            this.turnEndSitDown();
            return;
        }

        if (isNeedActoin) {
            this.modal_panel.active = true;
            this._isTurning = true;
            this.startTurning();
        }
        else {
            this.startTurningWithNoAction();
        }
    }
    public startTurning(time: number = 0.2) {
        let len = this._seatList.length;

        let posS: cc.Vec2[] = this._postList;
        for (let i = 0; i < len; i++) {
            let moveIndex;
            let SeatId = this._seatList[i].getSeatViewID();
            moveIndex = SeatId + 1 == len ? 0 : SeatId + 1;
            this._seatList[i].node.stopAllActions();
            if (i == len - 1) {
                let action = cc.moveTo(time, cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                let callBack = cc.callFunc(this.turnIngCallBack.bind(this), this);

                this._seatList[i].node.runAction(cc.sequence(action, callBack));
                this._seatList[i].setSeatViewID(moveIndex);
            }
            else {
                let action = cc.moveTo(time, cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                this._seatList[i].node.runAction(action);
                this._seatList[i].setSeatViewID(moveIndex);
            }
        }
    }
    public turnIngCallBack() {
        let len = this._seatList.length;

        this._trunIngSeatViewID += 1;
        if (this._trunIngSeatViewID < len) {
            this.startTurning();
        }
        else {
            this._isTurning = false;
            this.modal_panel.active = false;
            this.turnEndSitDown();
        }
    }

    public startTurningWithNoAction() {
        let len = this._seatList.length;
        let posS: cc.Vec2[] = this._postList;
        let hgp = 0;
        for (let i = 0; i < len; i++) {
            let moveIndex;
            let SeatId = this._seatList[i].getSeatViewID();
            hgp = len - this._trunIngSeatViewID;
            moveIndex = SeatId + hgp >= len ? SeatId + hgp - len : SeatId + hgp;
            this._isTurning = false;
            this._seatList[i].node.stopAllActions();

            if (i == len - 1) {
                this._seatList[i].node.setPosition(cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                this._seatList[i].setSeatViewID(moveIndex);
            }
            else {
                this._seatList[i].node.setPosition(cc.v2(posS[moveIndex].x, posS[moveIndex].y));
                this._seatList[i].setSeatViewID(moveIndex);
            }
        }
        this.turnEndSitDown();
    }
    public turnEndSitDown() {
        let len = this._seatList.length;
        for (let i = 0; i < len; i++) {
            this._seatList[i].setSeatViewID(this._seatList[i].getSeatViewID());
        }

        let pkSelf: Seat = this.getSeatBySeatID(JackfruitManager.tRoomData.nSelfSeatID);
        if (pkSelf) {
            this._isSeat = true;
            switch (pkSelf._playerInfo.state) {
                case ePlayerState.SReady:
                    if (JackfruitManager.tRoomData.kTablePlayerList.length == 2) {
                        pkSelf.updateSeatStatus(eSeatStatus.SeatStatus_ready);
                    } else {
                        pkSelf.updateSeatStatus(eSeatStatus.SeatStatus_waiting_bubble);
                    }
                    break;
                case ePlayerState.SClickReady:
                    pkSelf.updateSeatStatus(eSeatStatus.SeatStatus_wait_ready);
                    break;
                default:
                    pkSelf.updateSeatStatus(eSeatStatus.SeatStatus_inGame);
                    break;
            }
        }
        // this.autoBuyinEff();
    }

    public onSitdownSucc(playerID: number) {
        let pkPlayer: PlayerInfo = JackfruitManager.tRoomData.GetTablePlayer(playerID);
        this.playerSitDown(pkPlayer);
    }

    public onStandUpSucc(playerID: number) {
        this.setRoomCurState(eRoundState.RS_FREE);
        let player: PlayerInfo = JackfruitManager.tRoomData.GetTablePlayer(playerID);
        this.Standup(player);
        if (player) {
            JackfruitManager.tRoomData.RemoveTablePlayer(player.playerId);
        }
    }

    public onNeedBuyin(msg: BuYinData) {
        this.buyin_panel.getComponent(JackfruitBuyin).show(msg);
    }

    /**
     * 真人验证消息
     */
    public onNeedSliderVerify(callback: Function): void {
        if (this.game && this.game.sliderVerify_panel) {
            this.game.sliderVerify_panel.autoShow(callback);
        }
    }

    public Standup(pkPlayer: PlayerInfo) {
        if (pkPlayer) {
            let u32SeatId = pkPlayer.seatId;
            let u32Uid = pkPlayer.playerId;

            if (u32Uid == cv.dataHandler.getUserData().u32Uid) {
                this.face_button.active = false;
                this.record_button.active = false;
                JackfruitManager.tRoomData.nSelfSeatID = -1;
                this._isSeat = false;
                this.game.menu_Panel.getComponent(JackfruitMenu).updateMenu();
                this.change_table_btn.active = false;
                this.setRecordEnabled(false);
            } else {
                if (this._isReady) {
                    this.stopTimeUpdate(Countdown_type.Ready);
                }
            }
            let pkSeat: Seat = this.getSeatBySeatID(u32SeatId);
            if (pkSeat) {
                pkSeat.updateSeatStatus(eSeatStatus.SeatStatus_empty);
            }
            else {
                cv.TT.showMsg(cv.StringTools.formatC("can't find Seat(%d)", u32SeatId), cv.Enum.ToastType.ToastTypeError);
            }
            if (JackfruitManager.tRoomData.nSelfSeatID == -1) {
                this.stopTimeUpdate(Countdown_type.Ready);
            }
        }
        for (let i = 0; i < this._seatList.length; i++) {
            if (this._seatList[i]._seat_status == eSeatStatus.SeatStatus_ready ||
                this._seatList[i]._seat_status == eSeatStatus.SeatStatus_inGame) {
                this._seatList[i].updateSeatStatus(eSeatStatus.SeatStatus_waiting_bubble);
            }
        }
    }

    public onGameWillStart(msg) {
        this._resetGame();
        let time = msg.leftSeconds;
        this.setRoomCurState(eRoundState.RS_WAIT);
        this.setGameWillStart(time);
    }

    public setGameWillStart(time: number) {
        for (let i = 0; i < this._seatList.length; i++) {
            let seat = this._seatList[i];
            seat.updateSeatStatus(eSeatStatus.SeatStatus_inGame);
        }
        if (time <= 0) return;
        this.aboutToStart_panel.active = true;
        this.state = 0;
        this.aboutToStart_label.string = time.toString();
        this._time = 100;
        this._htime = this._time / (time * cc.game.getFrameRate());
        this.aboutToStart_progressBar.progress = 1;
        this._countdownType = Countdown_type.aboutToStart;
        let action_node1 = this.aboutToStart_panel.getChildByName("action_node_1");
        action_node1.angle = 0;
        this.schedule(this.timeUpdate, 0);
    }

    public onNoticeDeal(msg: DealNotify) {
        this._resetGame();
        this.showActiveStart(msg)
    }

    public showActiveStart(msg: DealNotify) {
        this.specialEffects_mask_panel.active = true;
        this._initStartActive();
        for (let i = 0; i < this._actionStartBallList.length; i++) {
            this.start_action_ball_node_list[i].active = true;
            let name = i == 0 ? "start_action_ball_1" : "start_action_ball_2";
            this._actionStartBallList[i].play(name);

            if (i < this._actionStartLightList.length) {
                this.start_action_light_node_list[i].active = true;
                this._actionStartLightList[i].play("start_action_light");
                this._playEffect(this._path_hand_1);
            } else {
                if (!this._actionStartBallList[i].hasEventListener("finished")) {
                    this._actionStartBallList[i].on("finished", function () {
                        this.hideActionStart();
                        this.setDeal(msg);
                    }, this);
                }
            }
        }
    }

    public hideActionStart() {
        for (let i = 0; i < this._actionStartBallList.length; i++) {
            this._actionStartBallList[i].stop();
            this.start_action_ball_node_list[i].active = false;
            if (i < this._actionStartLightList.length) {
                this.start_action_light_node_list[i].active = false;
                this._actionStartLightList[i].stop();
            }
        }
        this.specialEffects_mask_panel.active = false;
    }

    public setDeal(msg: DealNotify) {
        this.card_panel.active = true;
        this.setSelfCards(msg.holdCards, true);
        //this._playEffect(this._path_public_card_3);
        this.setPublicCards(msg.publicCards, true, 0.55);
    }


    public onStartPlaceCard(leftSeconds: number) {
        this.setRoomCurState(eRoundState.RS_PLACE_CARDS);
        this.setWaitByViewID(1, true);
        if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
            this.addTime_btn.active = JackfruitManager.tRoomData.actionDelayCountsFee != -1;
            this._setSelfCardTouch(true);
            this.showGuide();
        } else {
            this.setWaitByViewID(0, true);
        }
        this.setPlaceCardIsOKTime(this._placeCardType);
        this.updataPlaceCardTime(leftSeconds);
    }

    public showGuide() {
        if (cv.tools.GetStringByCCFile("hideJackfruitGuideNew") != "true") {
            cv.tools.SaveStringByCCFile("hideJackfruitGuideNew", "true");
            this._initGuide();
            this.guide_panel.active = true;
            let action_node = this.guide_panel.getChildByName("action_node");
            action_node.setPosition(this._getCardPosByBg(this._selfCardBgs[0]));
            let func = cc.callFunc((target) => {
                target.setPosition(this._getCardPosByBg(this._selfCardBgs[0]));
            }, this);
            let dealy0 = cc.delayTime(0.1);
            let move = cc.moveTo(1, this._getCardPosByBg(this.selfTableCardBgs[4]));
            let dealy1 = cc.delayTime(0.4);
            action_node.runAction(cc.repeatForever(cc.sequence(func, dealy0, move, dealy1)));

            let action_node1 = this.guide_panel.getChildByName("action_node_1");
            let action = action_node1.getComponent(cc.Animation);
            action.play("guide");
        }
    }

    public onModifyPlaceCard(seatId: number) {
        let seat = this.getSeatBySeatID(seatId);
        if (seat && JackfruitManager.tRoomData.nSelfSeatID != seatId) {
            this.setModifyByViewID(seat.getSeatViewID(), true);
        }

        if (JackfruitManager.tRoomData.nSelfSeatID == seatId) {
            this.addTime_btn.active = JackfruitManager.tRoomData.actionDelayCountsFee != -1;
        }
    }

    public onShowPlaceCard(players: PlayerInfo[]) {
        this._playEffect(this._path_place_card_2);
        this.setRoomCurState(eRoundState.RS_TURN);
        this.node.stopActionByTag(this.SHOW_SELECT_CARD_TAG);
        this._resetSelfTableCardBgs();
        this.addTime_btn.active = false;
        this._setSelfCardTouch(false);
        this.stopTimeUpdate();
        this.guide_panel.getChildByName("action_node").stopAllActions();
        this.guide_panel.active = false;
        let isShowTurn = JackfruitManager.tRoomData.nSelfSeatID == -1;
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            let viewID = this.getSeatBySeatID(player.seatId).getSeatViewID();
            if (viewID == 0) {
                this.setSelfCards(player.holeCards);
                this.setSelfTableCards(player.headCards, 0, isShowTurn);
                this.setSelfTableCards(player.middleCards, 1, isShowTurn);
                this.setSelfTableCards(player.tailCards, 2, isShowTurn);
                this.hideSurplusSelfCard();
            } else {
                this.setOtherFoldCard(player, true);
                this.setOtherTableCards(player.headCards, 0, true);
                this.setOtherTableCards(player.middleCards, 1, true);
                this.setOtherTableCards(player.tailCards, 2, true);
            }
        }
    }

    public updataPlaceCardTime(time: number) {
        if (time <= 0) return;
        this.stopTimeUpdate();
        this.placeCardIsOK_btn.active = true;
        this.placeCardIsOK_time_label.string = time.toString();
        this._time = 100;
        this._htime = this._time / (time * cc.game.getFrameRate());
        this._countdownType = Countdown_type.PlaceCard;
        this.schedule(this.timeUpdate, 0);
    }

    public updataWaitAction(waitNode: cc.Node, isWait: boolean) {
        let image = waitNode.getChildByName("placecard_wait");
        let imageName = "";
        let posName = "";
        if (isWait) {
            imageName = "placeCard_img";
            posName = "placeCard_img_pos"
        } else {
            imageName = "modify_placeCard_img";
            posName = "modify_placeCard_img_pos"
        }
        cv.resMgr.setSpriteFrame(image, cv.config.getLanguagePath("game/jackfruit/ui/" + imageName));
        let size = image.getContentSize();
        let pos = image.getPosition();
        for (let i = 0; i < 3; i++) {
            let imagePos = waitNode.getChildByName("placecard_wait_" + i);
            cv.resMgr.setSpriteFrame(imagePos, "zh_CN/game/jackfruit/ui/" + posName);
            imagePos.setPosition(cc.v2(pos.x + size.width / 2 - 10 + 20 * i, imagePos.getPosition().y));
        }
    }

    public setWaitByViewID(viewID: number, isShow: boolean) {
        this.wait_node[viewID].active = isShow;
        if (isShow) {
            this.updataWaitAction(this.wait_node[viewID], true);
            let action = this.wait_node[viewID].getComponent(cc.Animation);
            action.play("placecard_wait");
        }
    }


    public setModifyByViewID(viewID: number, isShow: boolean) {
        this.wait_node[viewID].active = isShow;
        if (isShow) {
            this.updataWaitAction(this.wait_node[viewID], false);
            let action = this.wait_node[viewID].getComponent(cc.Animation);
            action.play("placecard_wait");
        }
    }

    public setPlaceCardIsOKTime(type: number) {
        let btnLabel: cc.Node = this.placeCardIsOK_btn.getChildByName("btn_label");
        let action_node = this.placeCardIsOK_btn.getChildByName("action_node");
        let action = action_node.getChildByName("xiaodaojishi").getComponent(cc.Animation);
        this._placeCardType = type;
        switch (type) {
            case 0:
                action_node.active = false;
                cc.find("btn_bg_img", this.placeCardIsOK_btn).active = true;
                btnLabel.active = true;
                this.placeCardIsOK_btn.getComponent(cc.Button).enabled = false;
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("btn_bg_img"), "zh_CN/game/jackfruit/ui/placeCard_btn_0");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("arrow_img"), "zh_CN/game/jackfruit/ui/placeCard_arrow_0");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_progressBar.node, "zh_CN/game/jackfruit/ui/placeCard_progress_0");
                btnLabel.opacity = 255 / 100 * 40;
                this.placeCardIsOK_time_label.node.color = cc.color(255, 255, 255);
                break
            case 1:
                action_node.active = false;
                cc.find("btn_bg_img", this.placeCardIsOK_btn).active = true;
                btnLabel.active = true;
                this.placeCardIsOK_btn.getComponent(cc.Button).enabled = true;
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("btn_bg_img"), "zh_CN/game/jackfruit/ui/placeCard_btn_1");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("arrow_img"), "zh_CN/game/jackfruit/ui/placeCard_arrow_1");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_progressBar.node, "zh_CN/game/jackfruit/ui/placeCard_progress_1");
                btnLabel.opacity = 255;
                this.placeCardIsOK_time_label.node.color = cc.color(255, 255, 0);
                break
            case 2:
                action_node.active = false;
                cc.find("btn_bg_img", this.placeCardIsOK_btn).active = false;
                btnLabel.active = false;
                this.placeCardIsOK_btn.getComponent(cc.Button).enabled = false;
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("btn_bg_img"), "zh_CN/game/jackfruit/ui/placeCard_btn_0");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("arrow_img"), "zh_CN/game/jackfruit/ui/placeCard_arrow_0");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_progressBar.node, "zh_CN/game/jackfruit/ui/placeCard_progress_0");
                this.placeCardIsOK_time_label.node.color = cc.color(255, 255, 255);
                break;
            case 3:
                action_node.active = true;
                cc.find("btn_bg_img", this.placeCardIsOK_btn).active = true;
                btnLabel.active = true;
                action.play("xiaodaojishi");
                this.placeCardIsOK_btn.getComponent(cc.Button).enabled = false;
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("btn_bg_img"), "zh_CN/game/jackfruit/ui/placeCard_btn_2");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("arrow_img"), "zh_CN/game/jackfruit/ui/placeCard_arrow_2");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_progressBar.node, "zh_CN/game/jackfruit/ui/placeCard_progress_2");
                btnLabel.opacity = 255 / 100 * 40;
                this.placeCardIsOK_time_label.node.color = cc.color(255, 104, 0);
                break
            case 4:
                action_node.active = true;
                cc.find("btn_bg_img", this.placeCardIsOK_btn).active = true;
                btnLabel.active = true;
                action.play("xiaodaojishi");
                this.placeCardIsOK_btn.getComponent(cc.Button).enabled = true;
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("btn_bg_img"), "zh_CN/game/jackfruit/ui/placeCard_btn_3");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("arrow_img"), "zh_CN/game/jackfruit/ui/placeCard_arrow_2");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_progressBar.node, "zh_CN/game/jackfruit/ui/placeCard_progress_2");
                btnLabel.opacity = 255 / 100 * 40;
                this.placeCardIsOK_time_label.node.color = cc.color(255, 104, 0);
                break
            case 5:
                action_node.active = true;
                cc.find("btn_bg_img", this.placeCardIsOK_btn).active = false;
                btnLabel.active = false;
                action.play("xiaodaojishi");
                this.placeCardIsOK_btn.getComponent(cc.Button).enabled = false;
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("btn_bg_img"), "zh_CN/game/jackfruit/ui/placeCard_btn_2");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_btn.getChildByName("arrow_img"), "zh_CN/game/jackfruit/ui/placeCard_arrow_2");
                cv.resMgr.setSpriteFrame(this.placeCardIsOK_progressBar.node, "zh_CN/game/jackfruit/ui/placeCard_progress_2");
                this.placeCardIsOK_time_label.node.color = cc.color(255, 104, 0);
                break
        }
    }

    public onCommunityCards(msg) {
        this.setRoomCurState(msg.roundState);
        this.setPublicCards(msg.publicCards, true, 0);
    }

    public timeUpdate() {
        if (this._time <= 0) {
            this.stopTimeUpdate();
            return;
        }
        let tempTime = cc.director.getDeltaTime() / (1 / 60) * this._htime;
        this._time -= tempTime;
        let progress = this._time / 100;
        let time = 0;
        switch (this._countdownType) {
            case Countdown_type.aboutToStart:
                let action_node = this.aboutToStart_panel.getChildByName("action_node");
                let action_node1 = this.aboutToStart_panel.getChildByName("action_node_1");
                time = Math.floor(Math.abs(this._time) / (this._htime * cc.game.getFrameRate()));
                if (this._lastTime != time) {
                    this._lastTime = time;
                    if (time < 3) {
                        if (action_node.active == false) {
                            action_node.active = true;
                            let action: cc.Animation = action_node.getComponent(cc.Animation);
                            action.play("countdown");
                            this.aboutToStart_label.node.active = false;
                        }
                        this._playEffect(this._path_countdownS);
                        action_node.getChildByName("aboutToStart_label").getComponent(cc.Label).string = time.toString();
                    } else {
                        this.aboutToStart_label.node.active = true;
                        this.aboutToStart_label.string = time.toString();
                    }
                }
                action_node1.angle = 360 * progress;
                this.aboutToStart_progressBar.progress = progress;

                break;
            case Countdown_type.PlaceCard:
                this.state = 1;
                this.hitback_upper_left.active = false;
                this.hitback_upper_right.active = false;
                let btn_action_node = this.placeCardIsOK_btn.getChildByName("action_node");
                time = Math.floor(Math.abs(this._time) / (this._htime * cc.game.getFrameRate()));
                if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
                    if (this._lostTime != time) {
                        if (time == 4 && this._placeCardType != 2 && this._placeCardType != 5) {
                            this._playEffect(this._path_countdownP);
                            if (cv.tools.isVibrate()) {
                                cv.native.Vibrate();
                            }
                        }
                    }
                }
                if (this._placeCardType < 3 && time < 5) {
                    this.setPlaceCardIsOKTime(this._placeCardType + 3);
                }
                if (this._placeCardType > 2 && time >= 5) {
                    this.setPlaceCardIsOKTime(this._placeCardType - 3);
                }
                this._lostTime = time;
                btn_action_node.angle = 360 * progress;
                this.placeCardIsOK_progressBar.progress = progress;
                this.placeCardIsOK_time_label.string = Math.floor(Math.abs(this._time) / (this._htime * cc.game.getFrameRate())).toString();
                break;
            case Countdown_type.Ready:
                this.state = 1;
                this.hitback_upper_left.active = false;
                this.hitback_upper_right.active = false;
                if (JackfruitManager.tRoomData.nSelfSeatID == -1) {
                    this.waitReady_progressBar.progress = progress;
                    this.waitReady_label.string = Math.floor(Math.abs(this._time) / (this._htime * cc.game.getFrameRate())).toString();
                    cv.resMgr.setSpriteFrame(this.waitReady_img, cv.config.getLanguagePath("game/jackfruit/ui/wait_other_1"));
                } else {
                    if (this._isReady) {
                        this.waitReady_progressBar.progress = progress;
                        this.waitReady_label.string = Math.floor(Math.abs(this._time) / (this._htime * cc.game.getFrameRate())).toString();
                        cv.resMgr.setSpriteFrame(this.waitReady_img, cv.config.getLanguagePath("game/jackfruit/ui/wait_other_0"));
                    } else {
                        let label: cc.Label = this.continue_btn.getChildByName("continue_label").getComponent(cc.Label);
                        label.string = cv.StringTools.formatC(cv.config.getStringData("jackfruit_continue_btn_label"), Math.floor(Math.abs(this._time) / (this._htime * cc.game.getFrameRate())).toString());
                    }
                }
                break;
        }
    }

    public stopTimeUpdate(type?: Countdown_type) {
        if (type != null && this._countdownType != type) return;
        this._time = 100;
        this._lastTime = 0;
        this.unschedule(this.timeUpdate);
        switch (this._countdownType) {
            case Countdown_type.aboutToStart:
                let action_node = this.aboutToStart_panel.getChildByName("action_node");
                let action_node1 = this.aboutToStart_panel.getChildByName("action_node_1");
                this.aboutToStart_label.node.active = true;
                action_node.active = false;
                action_node1.angle = 0;
                this.aboutToStart_panel.active = false;
                break;

            case Countdown_type.PlaceCard:
                this.placeCardIsOK_btn.stopAllActions();
                this.placeCardIsOK_btn.setScale(cc.v2(1, 1));
                this.placeCardIsOK_progressBar.progress = 1;
                this.placeCardIsOK_btn.active = false;
                let btn_action_node = this.placeCardIsOK_btn.getChildByName("action_node");
                btn_action_node.angle = 0;
                btn_action_node.active = false;
                break;

            case Countdown_type.Ready:
                this.waitReady_panel.active = false;
                break;
        }
        this._countdownType = Countdown_type.empty;
    }

    public onGameRoundEne(msg: GameRoundEndNotify) {
        this.setRoomCurState(eRoundState.RS_SETTLEMENT);
        // 刷新jp
        this.updateJackpotNumEvent();

        this.setPublicCards(msg.pubCards);
        this._showCardTypeNum = 0;
        let actions: cc.ActionInterval[] = [];
        for (let i = 0; i < msg.playerSettle.length; i++) {
            let playSettle = msg.playerSettle[i];
            let player = playSettle.player;
            let viewID = this.getSeatBySeatID(player.seatId).getSeatViewID();
            let dealy_0 = cc.delayTime(0);
            let call_0 = cc.callFunc(this.showCardType.bind(this), this, { viewID: viewID, index: 0, result: playSettle.headResult, cards: player.headCards, pubCards: msg.pubCards });
            let dealy_1 = cc.delayTime(1.7);
            let call_1 = cc.callFunc(this.showCardType.bind(this), this, { viewID: viewID, index: 1, result: playSettle.middleResult, cards: player.middleCards, pubCards: msg.pubCards });
            let dealy_2 = cc.delayTime(1.7);
            let call_2 = cc.callFunc(this.showCardType.bind(this), this, { viewID: viewID, index: 2, result: playSettle.tailResult, cards: player.tailCards, pubCards: msg.pubCards });
            actions[i] = cc.sequence(dealy_0, call_0, dealy_1, call_1, dealy_2, call_2);
        }
        let spawn = cc.spawn(actions[0], actions[1]);
        spawn.setTag(this.SHOW_SINGLE_SCORE_TAG);
        this.node.runAction(spawn);
    }

    public showCardType(target, data) {
        let viewID: number = data.viewID;
        let index: number = data.index;
        let result: PlaceResult = data.result;
        if (this._showCardTypeNum % 2 == 0) {
            this.setAllCardGary(true);
        }
        let list: cc.Node[] = viewID == 0 ? this.selfCardTypeNode : this.otherCardTypeNode;
        let list1: cc.Sprite[] = viewID == 0 ? this.selfMultipleImages : this.otherMultipleImages;
        if (index >= list.length) return;
        list[index].active = true;
        this._initCardTypeNode(list[index], result);
        let pos = list1[index].node.getPosition();
        list[index].opacity = 0;
        list[index].setPosition(cc.v2(cc.winSize.width, pos.y));
        let move = cc.moveTo(0.2, cc.v2(pos.x - 27, pos.y));
        let move2 = cc.moveTo(0.1, cc.v2(pos.x, pos.y));
        let fade = cc.fadeIn(0.3);
        let func = cc.callFunc((target, data): void => {
            let viewID: number = data.viewID;
            let index: number = data.index;
            let result: PlaceResult = data.result;
            let cards: CardItem[] = data.cards;
            let pubCards: CardItem[] = data.pubCards;
            if (result.score >= 0) {
                this.showWinCardAction(viewID, index, result, cards, pubCards);
            }
            if (result.level >= CardLevel.FourOfAKind) {
                let bigCardNode = target.getChildByName("bigCardNode");
                bigCardNode.active = true;
                let action = bigCardNode.getComponent(cc.Animation);
                action.play("dapai");
                if (!action.hasEventListener("finished")) {
                    action.on("finished", function () {
                        bigCardNode.active = false;
                    }, this);
                }
                this._playEffect(this._path_big_card);
            }
        }, this, data);
        let delay = cc.delayTime(1);
        list[index].stopAllActions();
        list[index].runAction(cc.sequence(cc.spawn(cc.sequence(move, move2), fade), func, delay, cc.callFunc((): void => {
            if (this._showCardTypeNum == 5) {
                this.showJiaFen();
                this.setAllCardGary(false);
            }
            this._showCardTypeNum++;
        }, this)));

        list1[index].node.runAction(cc.sequence(cc.delayTime(0.3), cc.spawn(cc.moveTo(0.2, cc.v2(pos.x, pos.y + 65)), cc.fadeOut(0.2))));

        if (viewID == 0) {
            if (result.score >= 0) {
                this._playEffect(this._path_single_win);
            } else {
                this._playEffect(this._path_single_lose, false, 0.8);
            }
        }
    }

    public showJiaFen() {
        for (let i = 0; i < 3; i++) {
            this.selfCardTypeNode[i].stopAllActions();
            this.selfCardTypeNode[i].runAction(cc.fadeOut(0.2));

            this.otherCardTypeNode[i].stopAllActions();

            let pos = cc.v2(cc.winSize.width, this.otherCardTypeNode[i].getPosition().y);
            this.otherCardTypeNode[i].runAction(cc.sequence(cc.spawn(cc.moveTo(0.25, pos), cc.fadeOut(0.15)), cc.callFunc((target): void => {
                this.otherCardTypeNode[i].opacity = 255;
                this.otherCardTypeNode[i].active = false;
            }, this)));
        }
        let actionNode = cc.instantiate(this.card_type_jiafen1);
        let pos: cc.Vec2 = cc.v2(this._selfMultiplePos[1].x, this._selfMultiplePos[1].y + 43 - 17);

        let playSettle = JackfruitManager.getPlayerSettleBySeatID(this.getSeatByViewID(0).getSeatID());
        this._setAllScore(playSettle.headResult.score + playSettle.middleResult.score + playSettle.tailResult.score);
        let size = cv.resMgr.getLabelStringSize(this.all_score_label);
        pos = cc.v2(pos.x + size.width / 2, pos.y);
        for (let j = 0; j < 3; j++) {
            let typePos = cc.v2(this._selfMultiplePos[j].x + this.all_score_label.node.getContentSize().width / 2, this._selfMultiplePos[j].y);
            let isNext = j == 2;
            this.jiaFenAction(cc.instantiate(actionNode), typePos, pos, isNext);
        }
        this.all_score_label.node.opacity = 0;
        this.all_score_label.node.scale = 5;
        this.all_score_label.node.runAction(cc.sequence(cc.delayTime(0.5), cc.spawn(cc.fadeIn(0.1), cc.scaleTo(0.1, 1))));

        let actionNode1 = cc.instantiate(this.card_type_jiafen2);
        this.specialEffects_panel.addChild(actionNode1);
        actionNode1.setPosition(pos);
        actionNode1.runAction(cc.sequence(cc.hide(), cc.delayTime(0.6), cc.show(), cc.delayTime(1), cc.destroySelf()))

    }

    public jiaFenAction(actionNode: cc.Node, pos: cc.Vec2, movepos: cc.Vec2, isNext: boolean) {
        this.specialEffects_panel.addChild(actionNode);
        actionNode.setPosition(pos);
        // actionNode.opacity = 0;
        let dealy1 = cc.delayTime(0.2);
        let move = cc.moveTo(0.4, movepos);
        let func = cc.callFunc((target): void => {
            target.opacity = 255;
        }, this);

        let dealy2 = cc.delayTime(0.2);
        let func1 = cc.callFunc((target, data): void => {
            if (data) {
                let nPlayerCount = JackfruitManager.tRoomData.param.playerCountMax;
                for (let i = 0; i < nPlayerCount; i++) {
                    let isAllWin = JackfruitManager.getIsAllWinBySeatID(this.getSeatByViewID(i).getSeatID());
                    if (isAllWin) {
                        this.showFeipai(i == 0);
                        return;
                    }
                }
                this.showWinOrLose();
            }
        }, this, isNext);
        actionNode.runAction(cc.sequence(dealy1, func, move, dealy2, func1, cc.destroySelf()));
        this._playEffect(this._path_all_score, false, 0.8);
    }

    public showFeipai(isSilf: boolean) {
        let actionNode = cc.instantiate(this.all_victory_feipai_1);
        let pos: cc.Vec2 = this.getSeatByViewID(isSilf ? 0 : 1).node.getPosition();
        this.feipaiAction_1(cc.instantiate(actionNode), isSilf, pos, this._getFeipaiMovePos(isSilf, 0), false);
        this.feipaiAction_1(cc.instantiate(actionNode), isSilf, pos, this._getFeipaiMovePos(isSilf, 1), false);
        this.feipaiAction_1(cc.instantiate(actionNode), isSilf, pos, this._getFeipaiMovePos(isSilf, 2), true);
    }

    public feipaiAction_1(actionNode: cc.Node, isSilf: boolean, pos: cc.Vec2, movepos: cc.Vec2, isNext: boolean) {
        this.specialEffects_panel.addChild(actionNode);
        actionNode.setPosition(pos);

        let side1 = Math.abs(pos.x - movepos.x);
        let side2 = Math.abs(pos.y - movepos.y);
        let tan = side1 / side2;
        let angle = Math.atan(tan) / (Math.PI / 180);
        let side3 = Math.sqrt(side1 * side1 + side2 * side2);
        let rotation = 0;
        if (isSilf) {
            rotation = angle;
        } else {

            rotation = 180 - angle;
        }
        actionNode.angle = rotation;
        actionNode.setScale(cc.v2(1, side3 / actionNode.getContentSize().height));
        let action = actionNode.getComponent(cc.Animation);
        action.play("feipai");
        this._playEffect(this._path_feipai);
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                this.feipaiAction_2(cc.instantiate(this.all_victory_feipai_2), isSilf, movepos, isNext);
                actionNode.removeFromParent(true);
                actionNode.destroy();
            }, this);
        }
    }

    public feipaiAction_2(actionNode: cc.Node, isSilf: boolean, pos: cc.Vec2, isNext: boolean) {
        this.specialEffects_panel.addChild(actionNode);
        if (!isSilf) actionNode.angle = -180;
        actionNode.setPosition(pos);
        let action = actionNode.getComponent(cc.Animation);
        action.play("feipai_2");
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                actionNode.removeFromParent(true);
                actionNode.destroy();
            }, this);
        }

        if (isNext) {
            this.showAllVictory();
        }
    }

    public showAllVictory() {
        this.showAllVictoryAddScore();
        let isAllWin = JackfruitManager.getIsAllWinBySeatID(this.getSeatByViewID(0).getSeatID());
        if (isAllWin) {
            this.specialEffects_mask_panel.active = true;
            let actionNode = this.specialEffects_mask_panel.getChildByName("all_victory");
            if (!actionNode) {
                actionNode = cc.instantiate(this.all_victory);
                this.specialEffects_mask_panel.addChild(actionNode);
                actionNode.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                actionNode.name = "all_victory";
                cv.resMgr.setSpriteFrame(cc.find("quansheng", actionNode), cv.config.getLanguagePath("game/jackfruit/animation/victory/quansheng"));
                cv.resMgr.setSpriteFrame(cc.find("quansheng2", actionNode), cv.config.getLanguagePath("game/jackfruit/animation/victory/quansheng"));
            }
            actionNode.active = true;
            let action = actionNode.getComponent(cc.Animation);
            if (!action.hasEventListener("finished")) {
                action.on("finished", function () {
                    actionNode.active = false;
                    this.specialEffects_mask_panel.active = false;
                    this.showWinOrLose(false);
                }, this);
            }
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                action.play("AllWin");
            } else {
                action.play("AllWin_en");
            }
            this._playEffect(this._path_allwin);

        } else {
            this.specialEffects_mask_panel.active = true;
            let actionNode = this.specialEffects_mask_panel.getChildByName("all_failed");
            if (!actionNode) {
                actionNode = cc.instantiate(this.all_failed);
                this.specialEffects_mask_panel.addChild(actionNode);
                actionNode.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                actionNode.name = "all_failed";
            }
            actionNode.active = true;
            let action = actionNode.getComponent(cc.Animation);
            if (!action.hasEventListener("finished")) {
                action.on("finished", function () {
                    actionNode.active = false;
                    this.specialEffects_mask_panel.active = false;
                    this.showWinOrLose(false);
                }, this);
            }
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                action.play("AllFailed");
            } else {
                action.play("AllFailed_en");
            }
            this._playEffect(this._path_all_failed, false, 1);
        }
    }

    public showAllVictoryAddScore() {
        let isAllWin = JackfruitManager.getIsAllWinBySeatID(this.getSeatByViewID(0).getSeatID());
        let all_score = this.all_score_label;
        let all_victory = cc.instantiate(this.all_victory_img);
        this.specialEffects_mask_panel.addChild(all_victory)
        all_victory.active = true;
        all_victory.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2 - 100));
        let name = isAllWin ? "plus30" : "minus30";
        cv.resMgr.setSpriteFrame(all_victory, "zh_CN/game/jackfruit/animation/common/" + name);
        all_victory.stopAllActions();
        let movePos: cc.Vec2 = all_score.node.getPosition();
        let movePos1: cc.Vec2 = cc.v2(movePos.x + all_score.node.getContentSize().width / 2 + all_victory.getContentSize().width / 2 + 20, movePos.y);
        let imgFunc = cc.callFunc((target): void => {
            let playerSettle = JackfruitManager.getPlayerSettleBySeatID(this.getSeatByViewID(0).getSeatID());
            this._setAllScore(playerSettle.totalScore);
            let actionNode1 = cc.instantiate(this.card_type_jiafen2)
            this.specialEffects_panel.addChild(actionNode1);
            actionNode1.setPosition(target.getPosition());
            actionNode1.runAction(cc.sequence(cc.delayTime(1), cc.destroySelf()))

            let all_score_temp = cc.instantiate(this.all_score_label.node);
            this.specialEffects_mask_panel.addChild(all_score_temp)
            all_score_temp.name = "all_score_temp";
        }, this);
        all_victory.scale = 0;
        all_victory.opacity = 0;
        let spawn1 = cc.spawn(cc.scaleTo(0.1, 1), cc.fadeIn(0.1));
        let scaleto1 = cc.scaleTo(0.05, 1.05)
        let scaleto2 = cc.scaleTo(0.12, 1)
        let spawn2 = cc.spawn(cc.scaleTo(0.43, 0.6), cc.moveTo(0.43, movePos1));
        let spawn3 = cc.spawn(cc.fadeOut(0.1), cc.moveTo(0.1, movePos));
        all_victory.runAction(cc.sequence(spawn1, scaleto1, scaleto2, spawn2, spawn3, imgFunc, cc.destroySelf()));
        this._playEffect(this._path_allwinjiafen);
    }

    public showUpperLimit(isShow: boolean) {
        if (!isShow) {
            this.upper_limit_panel.stopAllActions();
            this.upper_limit_panel.opacity = 255;
            this.upper_limit_panel.active = false;
        } else {
            let msg = JackfruitManager.tRoomData.cachedNotifyMsg;
            let stake = cv.StringTools.serverGoldToShowNumber(msg.onlyWinAmount);
            stake = cv.StringTools.toFixed(stake, 1);
            if (msg.settleType == 0) {
                return;
            }
            this.upper_limit_panel.stopAllActions();
            this.upper_limit_panel.opacity = 255;
            this.upper_limit_panel.active = true
            this.upper_limit_label.string = cv.StringTools.formatC(cv.config.getStringData("jackfruit_upper_limit_label"), stake.toString());
            let str = "";
            if (msg.settleType == 1) {
                str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_upper_limit_richtext_lose"), stake.toString());
            } else {
                str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_upper_limit_richtext_win"), stake.toString());
            }
            cv.StringTools.setRichTextString(this.upper_limit_richtext.node, str);
            this.upper_limit_panel.runAction(cc.sequence(cc.delayTime(1.8), cc.fadeOut(0.2), cc.callFunc((target) => {
                target.active = false;
            }, this)));
        }
    }

    public showWinOrLose(isShowYouWin: boolean = true) {
        let all_score_temp = cc.find("all_score_temp", this.specialEffects_mask_panel);
        if (all_score_temp) {
            all_score_temp.removeFromParent(true);
            all_score_temp.destroy();
        }
        let seat = this.getSeatByViewID(0);
        let playerSettle = JackfruitManager.getPlayerSettleBySeatID(seat.getSeatID());
        if (playerSettle == null) return;
        let isWin = playerSettle.totalScore > 0;
        if (isWin) {
            if (playerSettle.repeatWining > 2) {
                this.specialEffects_mask_panel.active = true;
                this._playEffect(this._path_winning_streak);
                let actionNode = this.specialEffects_mask_panel.getChildByName("repeatwin");
                if (!actionNode) {
                    actionNode = cc.instantiate(this.repeat_win);
                    actionNode.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                    actionNode.name = "repeatwin";
                    this.specialEffects_mask_panel.addChild(actionNode);
                    let action = actionNode.getComponent(cc.Animation);
                    if (!action.hasEventListener("finished")) {
                        action.on("finished", function () {
                            this.specialEffects_mask_panel.active = false;
                            this.showAddToalScoreAction();
                        }, this);
                    }
                }
                actionNode.active = true;
                cc.find("Node_Pivot/Node_Hands/label_streak", actionNode).getComponent(cc.Label).string = playerSettle.repeatWining.toString();
                let action = actionNode.getComponent(cc.Animation);
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    action.play("YouWin_Streak");
                } else {
                    action.play("YouWin_StreakEN");
                }
            } else {
                if (isShowYouWin) {
                    this.specialEffects_mask_panel.active = false;
                    seat.runYouWinOrLose(playerSettle.totalScore);
                    this._playEffect(this._path_youwin_small);
                    // let action = this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(()=>{
                    this.showAddToalScoreAction();
                    // }, this)));
                    // action.setTag(this.SHOW_SEAT_LOST_TAG);
                } else {
                    this.showAddToalScoreAction();
                }
            }
        } else {
            if (playerSettle.totalScore < 0) {
                // if(isShowYouWin)
                // {
                //     seat.runYouWinOrLose(playerSettle.totalScore);
                this._playEffect(this._path_youlose);
                //     let action = this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(()=>{
                //         this.showAddToalScoreAction();
                //     }, this)));
                //     action.setTag(this.SHOW_SEAT_LOST_TAG);
                // }else
                // {
                this.showAddToalScoreAction();
                // }
            } else {
                seat.runYouWinOrLose(playerSettle.totalScore);
                this._playEffect(this._path_draw);
                this.showAddToalScoreAction();
            }
        }
    }

    public showAddToalScoreAction() {
        this.showUpperLimit(true);
        this.all_score_label.node.stopAllActions();
        let pos = this.getSeatByViewID(0).getGoldWorldPos();
        let movepos = this.all_score_label.node.getParent().convertToNodeSpaceAR(pos);
        let startpos = this.all_score_label.node.getPosition();
        let bezier: cc.Vec2[] = [];
        bezier[0] = cc.v2(startpos.x + 260, startpos.y - 10);
        bezier[1] = cc.v2(startpos.x + 180, startpos.y - 220);
        bezier[2] = cc.v2(movepos.x, movepos.y);
        let bezierto = cc.bezierTo(0.6, bezier);
        bezierto.easing(cc.easeBezierAction(0, 0.1, 0.9, 1));
        let scaleAction = cc.sequence(cc.scaleTo(0.1, 1.3), cc.scaleTo(0.5, 0.5));
        let opacityAction = cc.sequence(cc.fadeTo(0.4, 255), cc.fadeTo(0.2, 100), cc.callFunc((target) => {
            target.active = false;
            this.showGoldAction();
        }, this))
        this.all_score_label.node.runAction(cc.sequence(cc.delayTime(0.3), cc.spawn(bezierto, scaleAction, opacityAction)));

        // let fuc = cc.callFunc((target, data) => {
        //     let playerSettle = JackfruitManager.getPlayerSettleBySeatID(this.getSeatByViewID(0).getSeatID());
        //     this._setTotalScore(playerSettle.player.settleScore);
        //     this.total_score_action.active = true;
        //     cc.find("Particle_BigTotal_Burst", this.total_score_action).getComponent(cc.ParticleSystem).resetSystem();
        //     cc.find("Particle_BigTotal_Burst/Particle_BigTotal_Burst_1", this.total_score_action).getComponent(cc.ParticleSystem).resetSystem();
        //     this.total_score_action.stopAllActions();
        //     this.total_score_action.setPosition(this.total_score_action.getParent().convertToNodeSpaceAR(data.pos));
        //     this.total_score_action.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() =>{
        //         this.total_score_action.active = false;
        //     }, this)));
        // }, this, {pos: pos});
        // this.total_score_label.node.stopAllActions();
        // this.total_score_label.node.scale = 1;
        // this.total_score_label.node.runAction(cc.sequence(cc.delayTime(0.91), cc.scaleTo(0.05, 1.3), cc.scaleTo(0.04, 2.2), fuc, cc.scaleTo(0.11, 1.3), cc.scaleTo(1.05, 1)));
    }

    public showGoldAction() {
        this.updateLabaNum(true);
        for (let i = 0; i < this._seatList.length; i++) {
            let seat = this._seatList[i];
            let playerSettle = JackfruitManager.getPlayerSettleBySeatID(seat.getSeatID());
            seat.setStake(playerSettle.player.score, true, playerSettle.winScore > 0);
        }
        this._playEffect(this._path_gold);
    }

    public showTotalResult(settleAmount: number) {
        this.specialEffects_mask_panel.active = true;
        let actionNode = this.specialEffects_mask_panel.getChildByName("total_result");
        this.specialEffects_mask_panel.addComponent(cc.BlockInputEvents);
        if (!actionNode) {
            actionNode = cc.instantiate(this.total_result);
            this.specialEffects_mask_panel.addChild(actionNode, 1);
            actionNode.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            actionNode.name = "total_result";
        }
        actionNode.active = true;
        let label = cc.find("Node_Panel/Node_CoinValue/label_CoinValue", actionNode).getComponent(cc.Label);
        this._setTotalNumber(label, settleAmount);
        let action = actionNode.getComponent(cc.Animation);
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                actionNode.active = false;
                this.specialEffects_mask_panel.active = false;
            }, this);
        }

        if (settleAmount < 0) {
            action.play("TotalLoose");
        } else {
            action.play("TotalWin");
        }
    }

    public setAllCardGary(isGary: boolean) {
        for (let i = 0; i < this._publicCards.length; i++) {
            let card = this._publicCards[i];
            // card.setGary(isGary);
            card.node.getChildByName("huo").active = false;
        }
        for (let i = 0; i < this._selfCards.length; i++) {
            let card = this._selfCards[i];
            // card.setGary(isGary);
            card.node.getChildByName("huo").active = false;
        }
        for (let i = 0; i < this._otherTableCards.length; i++) {
            let card = this._otherTableCards[i];
            // card.setGary(isGary);
            card.node.getChildByName("huo").active = false;
        }
    }

    public showWinCardAction(viewID: number, index: number, result: PlaceResult, cards: CardItem[], pubCards: CardItem[]) {
        let list = JSON.parse(JSON.stringify(pubCards));
        for (let i = 0; i < cards.length; i++) {
            list.push(cards[i]);
        }
        let bigCardList = JackfruitManager.getCardListByType(list, result.level);
        let templist = viewID == 0 ? this._selfCards : this._otherTableCards;
        for (let i = 0; i < bigCardList.length; i++) {
            let item = bigCardList[i];
            let isTurnUp: boolean = false;
            for (let j = 0; j < this._publicCards.length; j++) {
                let card = this._publicCards[j];
                if (card.eCardNum == item.number && card.eCardSuit == item.suit) {
                    isTurnUp = true;
                    // card.setGary(false);
                    this.showCardActionHuo(card);
                }
            }
            if (isTurnUp) continue;
            for (let j = 0; j < templist.length; j++) {
                let card = templist[j];
                if (card.eCardNum == item.number && card.eCardSuit == item.suit) {
                    // card.setGary(false);
                    this.showCardActionHuo(card);
                    break;
                }
            }
        }
    }

    public showCardActionHuo(card: Card) {
        let actionNode = card.node.getChildByName("huo");
        actionNode.active = true;
        let action = actionNode.getComponent(cc.Animation);
        action.play("HighlightCard_Loop");
    }

    private _setSingleNumber(label: cc.Label, num: number, level: number) {
        num = cv.StringTools.serverGoldToShowNumber(num)
        num = cv.StringTools.toFixed(num, 1);
        let scoreStr = num.toString()
        if (level >= CardLevel.FourOfAKind && num >= 0) {
            switch (level) {
                case CardLevel.FourOfAKind:
                    label.font = this.cardtype_win_fnt_8;
                    break
                case CardLevel.StraightFlush:
                    label.font = this.cardtype_win_fnt_9;
                    break
                case CardLevel.RoyalFlush:
                    label.font = this.cardtype_win_fnt_10;
                    break
            }
            label.fontSize = 60;
            label.lineHeight = 60;
        } else {
            label.font = num < 0 ? this.single_lose_number : this.single_win_number;
            label.fontSize = num < 0 ? 50 : 60;
            label.lineHeight = num < 0 ? 50 : 60;
        }
        label.string = num < 0 ? scoreStr : "+" + scoreStr;
    }

    private _setTotalNumber(label: cc.Label, num: number) {
        num = cv.StringTools.serverGoldToShowNumber(num)
        let scoreStr = num.toString()
        label.font = num < 0 ? this.total_result_lose : this.total_result_win;
        label.fontSize = 84;
        label.lineHeight = 84;
        label.string = scoreStr;
    }

    private _initCardTypeNode(cardTypeNode: cc.Node, result: PlaceResult) {
        let score = result.score;
        let card_type_label = cardTypeNode.getChildByName("card_type_label").getComponent(cc.Label);
        let card_type_img = cardTypeNode.getChildByName("card_type_img");
        let card_type_img_1 = cardTypeNode.getChildByName("card_type_img_1");
        let card_type_light = cardTypeNode.getChildByName("card_type_light");
        let str = score < 0 ? "lose_" : "win_";
        cv.resMgr.setSpriteFrame(card_type_img, cv.config.getLanguagePath("game/jackfruit/cardtype/cardtype_" + str + result.level));
        cv.resMgr.setSpriteFrame(card_type_img_1, cv.config.getLanguagePath("game/jackfruit/cardtype/cardtype_" + str + result.level));
        this._setSingleNumber(card_type_label, score, result.level);
        card_type_label.node.setPosition(card_type_img.getPosition().x + card_type_img.getContentSize().width + 5, card_type_img.getPosition().y);
        let bigCardNode = cardTypeNode.getChildByName("bigCardNode");
        if (!bigCardNode) {
            bigCardNode = cc.instantiate(this.big_card);
            bigCardNode.name = "bigCardNode";
            cardTypeNode.addChild(bigCardNode);
        }
        bigCardNode.setPosition(cc.v2(card_type_img.getPosition().x + card_type_img.getContentSize().width / 2, card_type_img.getPosition().y));
        bigCardNode.active = false;

        let movepos = card_type_img.getPosition();
        card_type_img_1.stopAllActions();
        card_type_light.stopAllActions();
        card_type_light.setPosition(cc.v2(movepos.x + card_type_img.getContentSize().width / 2));
        card_type_img_1.setPosition(cc.v2(movepos.x + 250, movepos.y))
        card_type_light.opacity = 0;
        card_type_img_1.opacity = 0;
        card_type_img_1.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(0.1, 200), cc.spawn(cc.fadeOut(0.1), cc.moveTo(0.1, movepos))));

        card_type_img.stopAllActions();
        card_type_label.node.stopAllActions();
        card_type_img.opacity = 0;
        card_type_label.node.opacity = 0;
        card_type_img.runAction(cc.fadeIn(0.5));
        card_type_label.node.runAction(cc.fadeIn(0.5));
        if (result.level < CardLevel.FourOfAKind) {
            card_type_light.runAction(cc.sequence(cc.delayTime(0.4), cc.fadeIn(0.05), cc.fadeOut(0.65)));
        }
    }

    public showGameEnd(time: number) {
        this.stopTimeUpdate();
        if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
            let player = JackfruitManager.tRoomData.GetTablePlayerBySeatId(JackfruitManager.tRoomData.nSelfSeatID);
            if (player.state == ePlayerState.SClickReady) {
                this.game_end_panel.active = true;
                let label = this.continue_btn.getChildByName("continue_label");
                label.getComponent(cc.Label).string = time.toString();
            } else {
                this._isReady = true;
                this.game_end_panel.active = false;
                this.waitReady_panel.active = true;
                this.waitReady_progressBar.progress = 1;
            }
        } else {
            this.game_end_panel.active = false;
            this.waitReady_panel.active = true;
            this.waitReady_progressBar.progress = 1;
        }
        for (let i = 0; i < JackfruitManager.tRoomData.kTablePlayerList.length; i++) {
            let seat = this.getSeatBySeatID(JackfruitManager.tRoomData.kTablePlayerList[i].seatId);
            switch (seat._playerInfo.state) {
                case ePlayerState.SReady:
                    if (JackfruitManager.tRoomData.kTablePlayerList.length == 2) {
                        seat.updateSeatStatus(eSeatStatus.SeatStatus_ready);
                    } else {
                        seat.updateSeatStatus(eSeatStatus.SeatStatus_waiting_bubble);
                    }
                    break;
                case ePlayerState.SClickReady:
                    seat.updateSeatStatus(eSeatStatus.SeatStatus_wait_ready);
                    break;
                default:
                    seat.updateSeatStatus(eSeatStatus.SeatStatus_inGame);
                    break;
            }
        }
        this._time = 100;
        this._htime = this._time / (time * cc.game.getFrameRate());
        this._countdownType = Countdown_type.Ready;
        this.schedule(this.timeUpdate, 0);
    }

    public onBuyIn(msg: BuyInNotify) {
        let player: PlayerInfo = JackfruitManager.tRoomData.GetTablePlayerBySeatId(msg.seatId);
        if (player) {
            player.amount = msg.amount;
            player.score = msg.score;
        }
        let seat: Seat = this.getSeatBySeatID(msg.seatId);
        if (seat) {
            seat.setStake(msg.score);
        }
    }

    public onDestroyRoom(msg) {
        cv.TP.showMsg(cv.config.getStringData("jackfruit_destroy_room"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.gotoHallScene.bind(this));
    }

    public onConfirmToContinue(leftSeconds: number) {
        this.setRoomCurState(eRoundState.RS_READY);
        this.showGameEnd(leftSeconds);
    }

    public onPlaceCardOver(seatID: number) {
        let seat = this.getSeatBySeatID(seatID);
        if (seat.getSeatViewID() == 1) {
            this.setWaitByViewID(1, false);
            this.otherPlaceOver();
        } else {
            if (JackfruitManager.tRoomData.nSelfSeatID == -1) {
                this.addTime_btn.active = false;
                this._setSelfCardTouch(false);
                this.setWaitByViewID(0, false);
                this.selfPlaceOver();
            }
        }
    }

    public onShowChatPanel() {
        if (this.chat_node == null) {
            this.chat_node = cc.instantiate(this.chat);
            let panel = this.chat_node.getChildByName("view_panel");
            this.chat_panel.addChild(this.chat_node);
            let seat = this.getSeatByViewID(0);
            let pos = seat.node.getPosition();
            let size = seat.node.getContentSize();
            let height = panel.getContentSize().height;
            panel.setPosition(cc.v2(pos.x, pos.y + size.height / 2 + height / 2 + 12));
            panel.stopAllActions();
            panel.scale = 0.2;
            panel.runAction(cc.scaleTo(0.2, 1))
            this.chat_node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event): void => {
                this.chat_node.active = false;
            });
        }
        this.chat_node.active = true;
    }

    public onShowFacePanel(info: PlayerInfo) {
        this._clickSeatID = info.seatId;

        this.face_node.getComponent(JackfruitPrivateInfo).setUidAndName(info.playerId, info.name, info.playerId.toString());
        this.face_node.active = true;
        //CircleSprite.setCircleSprite(cc.find("root/panelbg/head_panel/headNode", this.face_node), info.headUrl, info.plat, false);
        CircleSprite.setBigCircleSprite(cc.find("headNode", this.bighead_node), info.headUrl, info.plat, false, 0);
        cv.httpHandler.requestJFData(info.playerId, JackfruitManager.tRoomData.param.ante);

        this.face_node.stopAllActions();
        this.face_node.scale = 0.2;
        this.face_node.runAction(cc.scaleTo(0.2, 1));
        // this.face_node.getComponent(JackfruitPrivateInfo).show();
        this.face_node.getComponent(JackfruitPrivateInfo).updateView(this.getSeatBySeatID(info.seatId).getSeatID(), info);
        // if(this.face_node == null)
        // {
        //     this.face_node = cc.instantiate(this.face);
        //     this.chat_panel.addChild(this.face_node);
        //     this.face_node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event): void => {
        //         this.face_node.active = false;
        //     });
        // }

        // let panel = this.face_node.getChildByName("view_panel");
        // let arrow_up = panel.getChildByName("chat_arrow_up");
        // let arrow_down = panel.getChildByName("chat_arrow_down");
        // let seat = this.getSeatBySeatID(seatID);
        // let pos = seat.node.getPosition();
        // let size = seat.node.getContentSize();
        // let height = panel.getContentSize().height;
        // if(seat.getSeatViewID() == 0)
        // {
        //     arrow_up.active = false;
        //     arrow_down.active = true;
        //     panel.setPosition(cc.v2(pos.x, pos.y + size.height/2 + height / 2 + 12));
        // }else
        // {
        //     arrow_up.active = true;
        //     arrow_down.active = false;
        //     panel.setPosition(cc.v2(pos.x, pos.y - size.height/2 - height / 2 - 12));
        // }
        // panel.stopAllActions();
        // panel.scale = 0.2;
        // panel.runAction(cc.scaleTo(0.2, 1))
        // this.face_node.getComponent(JackfruitFace).show();
    }

    effectHitCall(msg: any) {
        let effectId = msg.index;
        let beginSeatId = 0;
        if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
            beginSeatId = this.getSeatByViewID(0).getSeatID();
        }
        else {
            beginSeatId = -1;
        }
        let endSeatId = this.getSeatBySeverId(this.hitbackSeatServerId).getSeatID();

        let kValue = "#";
        kValue += cv.StringTools.formatC("%d", beginSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", endSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", effectId);
        kValue += "#";
        kValue += cv.dataHandler.getUserData().nick_name;

        let emojitype = msg.type;

        // if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
        //     this.showEffect(beginSeatId, endSeatId, effectId, cv.dataHandler.getUserData().nick_name);
        // }
        cv.jackfruitNet.requestSendChat(cv.roomManager.getCurrentRoomID(), ChatType.Enum_Emoji_Interactive, kValue, emojitype);
    }

    effectCall(index: number) {
        let effectId = index;
        let beginSeatId = 0;
        if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
            beginSeatId = this.getSeatByViewID(0).getSeatID();
        }
        else {
            beginSeatId = -1;
        }
        let endSeatId = this.getSeatBySeatID(this._clickSeatID).getSeatID();

        let kValue = "#";
        kValue += cv.StringTools.formatC("%d", beginSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", endSeatId);
        kValue += "#";
        kValue += cv.StringTools.formatC("%d", effectId);
        kValue += "#";
        kValue += cv.dataHandler.getUserData().nick_name;

        // if (JackfruitManager.tRoomData.nSelfSeatID != -1) {
        //     this.showEffect(beginSeatId, endSeatId, effectId, cv.dataHandler.getUserData().nick_name);
        // }
        cv.jackfruitNet.requestSendChat(cv.roomManager.getCurrentRoomID(), ChatType.Enum_Emoji_Interactive, kValue);
    }

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

        if (Number(kSender) != JackfruitManager.tRoomData.nSelfSeatID) {
            this.showEffect(Number(kSender), Number(kTarget), Number(kFaceID), kName, type);
        }
        else if (Number(kSender) == JackfruitManager.tRoomData.nSelfSeatID && Number(kSender) != -1) {
            this.showEffect(Number(kSender), Number(kTarget), Number(kFaceID), kName, type);
        }
        else if (Number(kSender) == -1) {
            this.showEffect(Number(kSender), Number(kTarget), Number(kFaceID), kName, type);
        }
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
                    ani_node.angle = 0;
                    ani_node.zIndex = 120;
                    return ani_node;
                }
            }
        }
        let ani_node = cc.instantiate(this.headAni);
        ani_node.setScale(1);
        cc.director.getScene().addChild(ani_node, 120);
        //this.node.addChild(ani_node, cv.Enum.ZORDER_TYPE.ZORDER_5);
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
        //this.node.addChild(ani_node, cv.Enum.ZORDER_TYPE.ZORDER_5);
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
        //this.node.addChild(ani_node, cv.Enum.ZORDER_TYPE.ZORDER_5);
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

    onCloseHitback() {
        this.hitback_right.active = false;
        this.hitback_upper_left.active = false;
        this.hitback_upper_right.active = false;
    }

    onWelcome(msg: any) {
        let str = cv.StringTools.formatC(cv.config.getStringData("Star_welcome"), cv.tools.GetFriendLevelName(msg.intimacy), msg.nickname);
        cv.TT.showMsg(str, cv.Enum.ToastType.ToastTypeInfo);

        this.hitbackSeatServerId = msg.seatid;

        if (this.greetOn) {
            cv.jackfruitNet.requestIsEmojiFree(jackfruit_proto.EmojiType.Welcome);
            //快捷打招呼表情
            this.displayEmoji(1);
        }
    }

    displayEmoji(type: number): void {
        let countdown = function (dt) {
            cc.log("time: " + dt);
            this.unschedule(countdown);
            this.onCloseHitback();
        }
        this.unschedule(countdown);
        this.schedule(countdown, 10);

        if (this.state == 0) {
            this.hitback_right.active = false;
            this.hitback_upper_left.active = true;
            this.hitback_upper_right.active = true;
        }
        else if (this.state == 1) {
            this.hitback_right.active = true;
            this.hitback_upper_left.active = false;
            this.hitback_upper_right.active = false;
        }

        if (this.hitback_right.active == true || this.hitback_upper_left.active == true) {
            if (type == 1) {
                this.greetOn = false;
                this.schedule(this.greet, 60);
            }
            else if (type == 0) {
                this.hitbackOn = false;
                this.schedule(this.hitback, 60);
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

    hitback() {
        this.hitbackOn = true;
    }

    greet() {
        this.greetOn = true;
    }

    //播放动画
    showEffect(beginSeatId: number, endSeatId: number, effectId: number, kName: string, type: number = 2) {
        let hitArray: Array<number> = [0, 1, 2, 3, 4, 10, 12];
        if (this.hitbackOn && beginSeatId != -1 && endSeatId == JackfruitManager.tRoomData.nSelfSeatID && type == 2 && hitArray.indexOf(effectId) > -1) {
            cv.jackfruitNet.requestIsEmojiFree(jackfruit_proto.EmojiType.Attack);
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

        let scale = 0.8;
        let beginPos: cc.Vec2;
        let endPos: cc.Vec2;
        if (beginSeatId == -1) {
            beginPos = this.menu_button.getPosition();
            let starWorldPos = this.node.convertToWorldSpaceAR(beginPos);
            beginPos = cc.director.getScene().convertToNodeSpaceAR(starWorldPos);

            let pkSenderName = cv.resMgr.createLabel(cc.director.getScene(), kName, 24, cv.resMgr.getLocalFontByName("arial"));
            pkSenderName.setAnchorPoint(0.0, 0.5);
            pkSenderName.setPosition(cc.v2(beginPos.x - 34.0, beginPos.y + 56.0));
            pkSenderName.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_5;
            pkSenderName.runAction(cc.sequence(cc.delayTime(2.0), cc.destroySelf()));
        }
        else {
            let temppos = this.node.convertToNodeSpaceAR(this.getSeatBySeatID(beginSeatId).getHeadWorldPosForFace())
            beginPos = cc.v2(temppos.x, temppos.y + 30);
            let starWorldPos = this.node.convertToWorldSpaceAR(beginPos);
            beginPos = cc.director.getScene().convertToNodeSpaceAR(starWorldPos);
        }

        let temppos = this.node.convertToNodeSpaceAR(this.getSeatBySeatID(endSeatId).getHeadWorldPosForFace())
        endPos = cc.v2(temppos.x, temppos.y + 30);
        if (effectId == 4) {
            endPos = cc.v2(temppos.x, temppos.y);
        }

        let starWorldPos = this.node.convertToWorldSpaceAR(endPos);
        endPos = cc.director.getScene().convertToNodeSpaceAR(starWorldPos);

        if (effectId == 0)//daodan
        {
            ani_node.active = true;
            ani_node.scale = 1.8;
            ani_node.name = effectId.toString();
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
            if (cv.tools.isSoundEffectOpen()) {
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
                if (cv.tools.isSoundEffectOpen()) {
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
                if (cv.tools.isSoundEffectOpen()) {
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
                if (cv.tools.isSoundEffectOpen()) {
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
                if (cv.tools.isSoundEffectOpen()) {
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
                if (cv.tools.isSoundEffectOpen()) {
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
                if (cv.tools.isSoundEffectOpen()) {
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
                ani_node.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(() => {
                    if (cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/fan");
                    }
                    fan_ac1.active = false;
                    if (true) {
                        fan_ac3.active = true;
                        fan_ac3.getComponent(cc.Animation).play("shanzi_03");
                        fan_ac3.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                            fan_ac3.getComponent(cc.Animation).off("finished");
                        });
                    }
                }, this)));
            });
        }
        else {
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect(cv.StringTools.formatC("zh_CN/game/dzpoker/audio/effectVoice%d", effectId < 6 ? effectId : (effectId - 1)));
            }
            let frame: cc.SpriteFrame = cv.resMgr.getSpriteAtlasFrame("zh_CN/game/dzpoker/animation/icon/effect", cv.StringTools.formatC("animation-icon-icon_fly_%d", effectId < 6 ? effectId : (effectId - 1)));

            let effSp = cv.resMgr.createSprite(cc.director.getScene());
            effSp.zIndex = 120;
            effSp.getComponent(cc.Sprite).spriteFrame = frame;
            effSp.active = (true);
            effSp.name = effectId.toString();
            effSp.scale = scale;
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

                effSp.runAction(cc.sequence(cc.moveTo(0.3, endPos), cc.callFunc(this.effectPlay, this, { "sp": effSp, "ani_node": ani_node, "isSp": true })));
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

    public UpdateRocketAngle(pkNode, kBegin: cc.Vec2, kEnd: cc.Vec2) {
        pkNode.angle = -Math.atan2((kEnd.x - pkNode.getPosition().x), (kEnd.y - pkNode.getPosition().y)) * 180 / 3.1415926;
    }

    effectPlay(target: cc.Node, data: any) {
        let sp: cc.Node = data.sp;
        let ani_node: cc.Node = data.ani_node;
        let tag = data.isSp ? parseInt(sp.name) : parseInt(ani_node.name);
        let timeArr = [40, 34 * 5, 100, 65, 34 * 5, 18 * 5, 160, 70, 70, 70, 105];
        let pos = data.isSp ? sp.getPosition() : ani_node.getPosition();
        let scale = data.isSp ? sp.scale : ani_node.scale;
        tag = tag > 6 ? tag - 1 : tag;
        //  {
        let hideTime = (timeArr[tag] + 10) / 60;
        if (tag == 0) {
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/daodanbaozha");
            }
            tag = 100;
        }
        let ani_new = this.getAniNode();
        ani_new.scale = scale;
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
            ani_new.setScale(1.3);
        }

        ani_new.setPosition(pos);
        if (tag == 4) {
            ani_new.setPosition(cc.v2(ani_new.getPosition().x - 27, ani_new.getPosition().y));
            ani_new.setPosition(cc.v2(ani_new.getPosition().x, ani_new.getPosition().y + 75));
        }
        if (tag == 100) {
            ani_new.setScale(1.3);
        }

        let tempFunc = function () {
            ani_new.active = false;
            ani_new.zIndex = 0;
        }
        ani_new.active = true;
        ani_new.runAction(cc.sequence(cc.delayTime(hideTime), cc.callFunc(tempFunc, this)));
        if (sp) {
            sp.removeFromParent(true);
            sp.destroy();
        }

        ani_node.active = false;
        ani_node.zIndex = 0;
    }

    public onSendChat(ret) {
        //if (ret.seatID != JackfruitManager.tRoomData.nSelfSeatID) {
        let seat: Seat = this.getSeatBySeatID(ret.seatID);
        let pos: cc.Vec2 = seat.getHeadWorldPosForFace();
        this.game.face_Panel.getComponent(FaceView).showFaceAni(pos, cv.Number(ret.face));
        //}
    }

    public onShowFace(ret) {
        let len = this._seatList.length;
        for (let i = 0; i < len; i++) {
            if (this._seatList[i].getSeatID() == ret.seatID) {
                this._seatList[i].showFace(ret.face);
            }
        }
    }

    public onSendChatNotify(msg) {
        let node = cc.instantiate(this.jackfrunt_chat_item);
        this.specialEffects_panel.addChild(node);
        let label = node.getChildByName("chat_label");
        let bg = node.getChildByName("chat_bg");
        label.getComponent(cc.Label).string = cv.config.getStringData("jackfruit_chat_label_list_" + msg.index);
        let width = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label)).width;
        let size = bg.getContentSize();
        let newsize = cc.size(width + 110, size.height);
        bg.setContentSize(newsize);
        node.setContentSize(newsize);
        let y = this._publicCards[0].node.getPosition().y;
        let offsety = 150 + Math.floor(cv.StringTools.randomRange(1, 100));
        let temp = Math.floor(cv.StringTools.randomRange(1, 100));
        y = temp > 50 ? y + offsety : y - offsety;
        let isSelf = msg.playerId == cv.dataHandler.getUserData().u32Uid;
        label.color = isSelf ? cc.color(242, 113, 55) : cc.color(221, 221, 221);

        // let seat = this.getSeatBySeatID(msg.seatID);
        // if (seat.getSeatViewID() == 0)
        // {
        node.setPosition(cc.v2(cc.winSize.width, y));
        node.runAction(cc.sequence(cc.moveTo(4, cc.v2(-newsize.width, y)), cc.destroySelf()));
        // }
    }

    public onUpdataDelay() {
        if (JackfruitManager.tRoomData.actionDelayCountsFee == -1) {
            this.addTime_btn.active = false;
        } else {
            this.addTime_text.string = cv.StringTools.serverGoldToShowString(JackfruitManager.tRoomData.actionDelayCountsFee);
        }
    }

    public onActionDelay(msg) {
        this._playEffect(this._path_add_time);
        if (this._placeCardType > 2) {
            this.setPlaceCardIsOKTime(this._placeCardType - 3);
        }
        let time = msg.leftSeconds;
        this.updataPlaceCardTime(time);

        let delayNode = this.placeCardIsOK_btn.getChildByName("delay_node");
        delayNode.active = true;
        let action = delayNode.getComponent(cc.Animation);
        action.play("place_card_btn_delay");
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                delayNode.active = false;
            }, this)
        }
    }

    public onbtnMenuClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.game.menu_Panel.active = true;
        this.game.menu_Panel.getComponent(JackfruitMenu).updateMenu();
    }
    public onbtnAddTimeClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        cv.jackfruitNet.requestActionDelay(cv.dataHandler.getUserData().u32Uid);
    }

    public onbtnFaceClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.game.face_Panel.getComponent(FaceView).showUi();
    }

    public onBtnPlaceCardIsOK(event) {
        if (!this._isPlaceCardOver) return;
        this._selectCard = null;
        this.select_card_img.active = false;
        this.onRequestPlaceCard(true);
        //this._setSelfCardTouch(false);
        this.addTime_btn.active = false;
        this._playEffect(this._path_determine);

        this.placeCardIsOK_btn.stopAllActions();
        this.placeCardIsOK_btn.setScale(cc.v2(1, 1));
        let turnCallBack = cc.callFunc(() => {
            this.placeCardIsOK_progressBar.progress = 1;
            this.setPlaceCardIsOKTime(2);
        }, this);
        this._playEffect(this._path_place_card_ok);
        this.placeCardIsOK_btn.runAction(cc.sequence(cc.scaleTo(0.1, 1, 0.01), turnCallBack, cc.scaleTo(0.3, 1, 1)));
    }

    public onBtnShowShop() {
        cv.AudioMgr.playButtonSound('button_click');
        cv.worldNet.requestGetUserData();
        cv.SHOP.RechargeClick();
    }

    public onBtnBack(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.stopTimeUpdate(Countdown_type.Ready);
        this.game.menu_Panel.getComponent(JackfruitMenu).onBtnExitPoker();
    }

    public onBtnDanmu(event, index: string) {
        if (!cv.tools.isShowBarrage()) return;
        this.danmu_btns[cv.Number(index)].active = false;
        let infos = JackfruitManager.tRoomData.BrandBarrageInfos;
        cv.AudioMgr.playButtonSound('button_click');
        let str = "";
        let num = 0;
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].index == cv.Number(index) + 3) {
                if (infos[i].type == BrandBarrageType.LIKE) {
                    str = str + "0"
                    if (!infos[i].hasReverse) {
                        str = str + "_0"
                        num = 10;
                    } else {
                        str = str + "_1"
                        num = 10;
                    }
                } else {
                    str = str + "1"
                    if (!infos[i].hasReverse) {
                        str = str + "_0"
                        num = 10;
                    } else {
                        str = str + "_1"
                        num = 10;
                    }
                }

                str = str + "_" + Math.floor(Math.random() * num);
                str = str + ";" + index + ";" + infos[i].card.suit.toString() + ";" + infos[i].card.number.toString();
                break;
            }
        }
        if (num != 0) {
            cv.jackfruitNet.requestSendBarrage(str, BarrageType.Enum_CardType);
            let data: game_pb.NoticeSendBarrage = new game_pb.NoticeSendBarrage();
            data.content = str;
            data.nickname = cv.dataHandler.getUserData().nick_name;
            data.playerid = cv.Number(cv.dataHandler.getUserData().user_id);
            data.at_list = [];
            //cv.GameDataManager.addDanmuMsg(data);
        }
    }

    public onClickAuto() {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.lostDesc == null) {
            this.lostDesc = cc.instantiate(this.lost_prefab);
            this.game.node.addChild(this.lostDesc, cv.Enum.ZORDER_TYPE.ZORDER_LOADING);
            this.lostDesc.getComponent(AofDesc).updateView();
        }
        this.lostDesc.active = true;
    }

    public onbtnCurrentClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        cv.jackfruitNet.requestSituation(cv.roomManager.getCurrentRoomID());
        this.game.currentTime_panel.active = true;
    }

    public onBtnContinue(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this._playEffect(this._path_btn_continue);
        //this.stopTimeUpdate(Countdown_type.Ready);
        cv.jackfruitNet.requestReady();
    }

    public onBtnGameReview(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.game.review_panel.active = true;
        this.game.review_panel.getComponent(JackfruitReview).show(cv.Enum.GameReviewDataType.EDST_GAMEROOM, this.getSeatByViewID(0).getSeatID());
    }

    public onBtnChangeTable(event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.change_table_btn.active = false;
        cv.jackfruitNet.requestChangeTable();
    }

    public onPlayerReady(playerID: number) {
        let player = JackfruitManager.tRoomData.GetTablePlayer(playerID);
        let seat = this.getSeatBySeatID(player.seatId)
        if (playerID == cv.dataHandler.getUserData().u32Uid) {
            this._isReady = true;
            this.game_end_panel.active = false;
            this._resetGame(true);
        } else if (seat.getSeatViewID() == 0 && JackfruitManager.tRoomData.nSelfSeatID == -1) {
            this._resetGame(true);
        }

        let ready = true;
        let list = JackfruitManager.tRoomData.kTablePlayerList;
        for (let index = 0; index < list.length; index++) {
            let player = list[index];
            if (player.state == ePlayerState.SClickReady) {
                ready = false;
                break;
            }
        }

        if (!ready) {
            if (playerID == cv.dataHandler.getUserData().u32Uid) {
                this.waitReady_panel.active = true;
                this.waitReady_progressBar.progress = 1;
            }
        } else {
            this.stopTimeUpdate(Countdown_type.Ready);
        }

        if (list.length == 2) {
            seat.updateSeatStatus(eSeatStatus.SeatStatus_ready);
        } else {
            seat.updateSeatStatus(eSeatStatus.SeatStatus_waiting_bubble);
        }
    }

    public gotoHallScene() {
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
        cv.roomManager.setCurrentGameID(cv.Enum.GameId.GameId_Dummy);
    }

    public setRoomCurState(curState: eRoundState) {
        JackfruitManager.tRoomData.curState = curState;
        this.game.menu_Panel.getComponent(JackfruitMenu).updateMenu();
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

    public onTurntableResultNotice(puf: world_pb.LuckTurntableResultNotice) {
        // let pkSeat: Seat = this.getSeatByPlayerID(puf.uid);
        // if (pkSeat != null) {
        //     let pos: cc.Vec2 = pkSeat.node.getParent().convertToWorldSpace(pkSeat.node.getPosition());
        //     this.luckLayer.showGoldMoveAction(pos, puf.currency_type);
        // }

        let pkSeat: Seat = this.getSeatByPlayerID(puf.uid);
        if (pkSeat != null) {
            this.luckLayer.runGoldMoveAction(this.redEnvelope_btn, pkSeat.node, () => {
                pkSeat.showRedAction(puf.currency_type, puf.amount);
            });
        }
    }

    public onWaitingOtherPlayer() {
        let pkDealy = cc.delayTime(4.5);
        let pkCall = cc.callFunc(this._resetGame.bind(this));
        let pkSeq = cc.sequence(pkDealy, pkCall);
        pkSeq.setTag(this.WAITING_OTHER_PLAYER_NOTIFY_TAG);
        this.node.runAction(pkSeq);
    }

    public onShowChangeTableBtn() {
        this.change_table_btn.active = true;
    }

    public onTotalSettle(msg: SettleResp) {
        this.showTotalResult(msg.settleAmount);
    }

    public onPlayerInfoSync(msg) {
        let playerList: PlayerInfo[] = msg.playerList;
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            let seat = this.getSeatBySeatID(player.seatId)
            seat.setStake(player.score);
        }
    }

    public onUpdataStartMatch(isShow: boolean) {
        this.start_match_panel.active = isShow;
        if (isShow) {
            let action = this.start_match_panel.getComponent(cc.Animation);
            action.play("start_match");
        }
    }

    public onBrandBarrage() {
        if (!cv.tools.isShowBarrage()) return;
        let infos = JackfruitManager.tRoomData.BrandBarrageInfos;
        for (let i = 0; i < infos.length; i++) {
            let btn = this.danmu_btns[infos[i].index - 3];
            btn.active = true;
            let name = infos[i].type == BrandBarrageType.LIKE ? "icon_happy" : "icon_angry";
            cv.resMgr.setSpriteFrame(cc.find("icon", btn), "zh_CN/game/jackfruit/ui/" + name);
        }
    }

    public showLuckButton() {
        if (this.luckLayer == null) {
            this.luckLayer = cc.instantiate(this.luckButton_prefab).getComponent(LuckTurntablesButton);
            this.redEnvelope_btn.addChild(this.luckLayer.node);
            this.luckLayer.node.setPosition(0, 0);
            // this.luckLayer.setLeftShowDes();
        }

        if (cv.dataHandler.getUserData().isShowLuckTurntables) {
            this.redEnvelope_btn.active = true;
            this.luckLayer.updateView(true);
        } else {
            this.redEnvelope_btn.active = false;
        }
    }

    public onUpdataBGM() {
        if (cv.tools.isPlayMusic()) {
            cv.AudioMgr.playMusic(this._path_Bgm, true, 0.2);
        } else {
            cv.AudioMgr.stopMusic();
        }
    }


    private showJackPotNumPanel() {
        this.game.jackpot_number_panel.active = true
        if (this._JackPotNumberList.length == 0) {
            let jackpot_img_node = this.game.jackpot_number_panel.getChildByName("jackpot_img_node");
            let size: cc.Size = jackpot_img_node.getContentSize();
            jackpot_img_node.destroyAllChildren();
            jackpot_img_node.removeAllChildren(true);
            for (let i = 0; i < 7; i++) {
                let jackNumberPrefab = cc.instantiate(this.jack_number);
                jackNumberPrefab.setPosition(-size.width / 2 + 12 + i * 31, -size.height / 2);
                jackpot_img_node.addChild(jackNumberPrefab);
                jackNumberPrefab.active = true;
                let jackNum: JackPotNumber = jackNumberPrefab.getComponent(JackPotNumber);
                jackNum.init();
                this._JackPotNumberList.push(jackNum);
            }
        }
        this.updateJackpotNumEvent();
    }

    updateJackpotNumEvent() {
        if (JackfruitManager.tRoomData.jackpotLeftAmount == -1) return;
        let num = JackfruitManager.tRoomData.jackpotLeftAmount;
        let amount = Math.round(cv.StringTools.serverGoldToShowNumber(num));
        this.updateJackpotNum(amount.toString());
    }

    updateJackpotNum(amounts: string) {
        let alen: number = amounts.length;
        let len: number = cv.StringTools.getArrayLength(this._JackPotNumberList);
        for (let i = 0; i < len; ++i) {
            if (i < alen) {
                this._JackPotNumberList[len - i - 1].showNum(Number(amounts[alen - i - 1]), 0.1);
                amounts.substr(1, 2)
            }
            else {
                this._JackPotNumberList[len - i - 1].showNum(0, 0.1);
            }
        }
    }

    private showhitjackPotCardType(param: any) {
        let infos = JackfruitManager.tRoomData.noticeJackPotAwardInfo.awardInfo;
        cv.StringTools.deepCopy(infos, this._jackpotInfos)
        this.showjackPotAction();
    }

    showjackPotAction() {
        if (this._jackpotInfos.length == 0 || this._jackPotHitCardType != null) {
            return;
        }
        let info = this._jackpotInfos[0];
        let pkPlayer = JackfruitManager.tRoomData.GetTablePlayer(info.award_playid);
        if (pkPlayer) {
            this._jackPotHitCardType = cc.instantiate(this.jack_action);
            this.node.addChild(this._jackPotHitCardType);
            let label_Content = cc.find("action_panel/label_Content", this._jackPotHitCardType);
            let label_WinValue = cc.find("action_panel/sprite_Bar/label_WinValue", this._jackPotHitCardType);
            let name = info.award_player_name;
            let level = cv.config.getStringData(`M_UITitle${112 + info.hand_level}`)
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
                    this.showjackPotAction();
                }, this)
            }
            action.play("JackpotBigWin");
            this.game.sendNetJackPot();
        }
    }


    /**
     * name
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
                if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                    cv.AudioMgr.stopMusic();
                }
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
        if (this.record_button.getComponent(cc.Button).interactable == false) {  //按钮置灰禁用的时候
            return;
        }

        if (event.type == cc.Node.EventType.TOUCH_START) {
            // let callBack = cc.callFunc(this.record.bind(this), this);
            // let pkDelay = cc.delayTime(0.1);
            this.record();
            // this.record_button.runAction(cc.sequence(pkDelay, callBack));
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
            cv.MessageCenter.send("updataBGM");
        }

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

    public setRecordEnabled(isEnabled: boolean) {
        if (!this.record_button.active) return;
        this.record_button.getComponent(cc.Button).interactable = isEnabled;
        this.cancelRecord();
        if (isEnabled) {
            cv.resMgr.setSpriteFrame(this.record_button_img, "zh_CN/game/dzpoker/ui/submenu/submenu＿mic_on");
        } else {
            cv.resMgr.setSpriteFrame(this.record_button_img, "zh_CN/game/dzpoker/ui/submenu/submenu＿mic_off");
        }
    }

    // 倒计时
    private onVoiceRecordCountDown(countDown: number) {
        this.game.voice_panel.active = true;

        let cdTime_text: cc.Label = cc.find("recording_img/cdTime_text", this.game.voice_panel).getComponent(cc.Label);
        cdTime_text.string = "" + countDown;
    }

    private onVoiceRecordFinish(data: string) {
        this.game.voice_panel.active = false;
        console.log("onVoiceRecordFinish:" + this._recordTime);
        this.onUpdataBGM();
        if (this._recordTime <= 9) {
            console.log("onVoiceRecordFinish:00  " + cv.GameDataManager.tRoomData.m_bIsCancelVoice);
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
        this.record_button.active = true;
        this.record_button.getComponent(cc.Button).interactable = true;
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
            //param.u32SeatId = cv.GameDataManager.tRoomData.i32SelfSeat;
            param.u32SeatId = JackfruitManager.tRoomData.nSelfSeatID;
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

    public getSeatBySeverId(severId: number): Seat {
        let len = this._seatList.length;
        for (let i = 0; i < len; i++) {
            if (this._seatList[i].getSeatID() == severId) return this._seatList[i];
        }
        return null;
    }

    showObRoleInfo() {
        // CircleSprite.setCircleSprite(cc.find("root/panelbg/head_panel/headNode", this.face_node), cv.GameDataManager.tRoomData.obPlayer.headPath, cv.GameDataManager.tRoomData.obPlayer.plat, false);
        CircleSprite.setBigCircleSprite(cc.find("headNode", this.bighead_node), cv.GameDataManager.tRoomData.obPlayer.headPath, cv.GameDataManager.tRoomData.obPlayer.plat, false, 0);
        this.face_node.getComponent(JackfruitPrivateInfo).setUidAndName(cv.GameDataManager.tRoomData.obPlayer.playerid, cv.GameDataManager.tRoomData.obPlayer.name, cv.GameDataManager.tRoomData.obPlayer.playerid.toString());
        this.face_node.active = true;

        cv.httpHandler.requestJFData(cv.GameDataManager.tRoomData.obPlayer.playerid, JackfruitManager.tRoomData.param.ante);

        this.face_node.stopAllActions();
        this.face_node.scale = 0.2;
        this.face_node.runAction(cc.scaleTo(0.2, 1))
        this.face_node.getComponent(JackfruitPrivateInfo).showob();
    }

    getSeatByUid(uid: number): Seat {
        let seat: Seat = null;
        for (let i = 0; i < this._seatList.length; ++i) {
            if (this._seatList[i]._playerInfo != null && this._seatList[i]._playerInfo.playerId == uid) {
                seat = this._seatList[i];
                break;
            }
        }
        return seat;
    }

    onNotDisturb(msg: any): void {
        let seat: Seat = this.getSeatByUid(msg.whoId);
        if (seat) {
            seat.showHeadBlock(((msg.operate == 1) ? true : false));
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
            this.hitback_right.getComponent(HitbackFaceItem).setData(array1, 0, msg.type);
            this.hitback_upper_left.getComponent(HitbackFaceItem).setData(array2[0], 0, msg.type);
            this.hitback_upper_right.getComponent(HitbackFaceItem).setData(array2[1], 0, msg.type);
        }
        else {
            this.hitback_right.getComponent(HitbackFaceItem).setData(array1, JackfruitManager.tRoomData.fee.emotionFee, msg.type);
            this.hitback_upper_left.getComponent(HitbackFaceItem).setData(array2[0], JackfruitManager.tRoomData.fee.emotionFee, msg.type);
            this.hitback_upper_right.getComponent(HitbackFaceItem).setData(array2[1], JackfruitManager.tRoomData.fee.emotionFee, msg.type);
        }
    }
}