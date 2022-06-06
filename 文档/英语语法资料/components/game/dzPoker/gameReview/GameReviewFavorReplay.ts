import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";

import { TagCom } from "../../../../common/tools/TagCom";
import { HashMap } from "../../../../common/tools/HashMap";
import { Card } from "../../../../components/game/dzPoker/Card";
import { Seat } from "../../../../components/game/dzPoker/Seat";

import { PlayerInfo } from "../../../../components/game/dzPoker/data/RoomData";
import { CollectUUID, HandCardType, PlayerRecord, PokerHandData } from "../../../../components/game/dzPoker/data/RecordData";

import { InsuranceData } from "../insurance/InsuranceData";
import { InsuranceEntrance } from "../insurance/InsuranceEntrance";
import { InsuranceHitOutsTips } from "../insurance/InsuranceHitOutsTips";

import { GameReviewFavorList } from "./GameReviewFavorList";
import { GameReviewFavorDetail } from "./GameReviewFavorDetail";

/**
 * 播放速度档位
 */
enum SpeedGear {
    ESG_NONE = 0,                                                                       // 无
    ESG_GEAR_1,                                                                         // 1倍
    ESG_GEAR_1_5,                                                                       // 1.5倍
    ESG_GEAR_2,                                                                         // 2倍
    ESG_MAX                                                                             // 最大
}

/**
 * 系统动作类别
 */
enum SystemActionType {
    SYSTEM_ACTION_NONE = 0,                                                             // 无
    SYSTEM_ACTION_CRITTIME,                                                             // 暴击开场
    SYSTEM_ACTION_TRANS_SEAT,                                                           // 预座
    SYSTEM_ACTION_ELECT_DEALER,                                                         // 选定"D"位
    SYSTEM_ACTION_TAKE_SEAT,                                                            // 入座
    SYSTEM_ACTION_ANTE,                                                                 // 前注
    SYSTEM_ACTION_BLIND,                                                                // 大/小盲位
    SYSTEM_ACTION_SEND_HAND_CARD,                                                       // 发手牌
    SYSTEM_ACTION_ENDPREFLOP,                                                           // 手牌圈结束下注
    SYSTEM_ACTION_DEALFLOP,                                                             // 发翻牌
    SYSTEM_ACTION_ENDFLOP,                                                              // 翻牌结束下注
    SYSTEM_ACTION_DEALTURN,                                                             // 发转牌
    SYSTEM_ACTION_ENDTURN,                                                              // 转牌圈结束下注
    SYSTEM_ACTION_DEALRIVER,                                                            // 发河牌
    SYSTEM_ACTION_ENDRIVER,                                                             // 河牌圈结束下注
    SYSTEM_ACTION_SHOWDOWN,                                                             // 摊牌
    SYSTEM_ACTION_SETTLEMENT,                                                           // 结算
    SYSTEM_ACTION_FORCESHOW,                                                            // 强制亮牌
    SYSTEM_ACTION_SENDOUT,                                                              // 发发看
    SYSTEM_ACTION_SHOWINSURANCE,                                                        // 显示保险
    SYSTEM_ACTION_HIDEINSURANCE,                                                        // 隐藏保险
    SYSTEM_ACTION_HITOUTINSURANCE,                                                      // 击中保险
    SYSTEM_ACTION_CHECK_FS_SO_STATUS,                                                   // 检测强制亮牌和发发看显隐状态
}

/**
 * 动作源类型
 */
enum ActionSrcType {
    ACTION_NULL = 0,
    ACTION_SYSTEM,
    ACTION_PLAYER,
}

/**
 * 基动作
 */
class CommonAction {
    srcType: ActionSrcType = ActionSrcType.ACTION_NULL;
    actDuring: number = 0;
    actDelayTime: number = 0;
}

/**
 * 系统动作
 */
class SystemAction extends CommonAction {
    action: SystemActionType = SystemActionType.SYSTEM_ACTION_ENDPREFLOP;
    data: any = null;
}

/**
 * 玩家动作
 */
class PlayerAction extends CommonAction {
    seq: number = 0;
    seatID: number = 0;
    amount: number = 0;
    actionType: number = cv.Enum.ActionType.Enum_Action_Null;
    actionTime: number = 0;
}

/**
 *  牌局回顾详情面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReviewFavorReplay extends cc.Component {
    @property(cc.Prefab) prefab_seat: cc.Prefab = null;                                 // 座位预制件
    @property(cc.Prefab) prefab_chip: cc.Prefab = null;                                 // 筹码预制件
    @property(cc.Prefab) prefab_card: cc.Prefab = null;                                 // 筹码预制件
    @property(cc.Prefab) prefab_insurance_entrance: cc.Prefab = null;                   // 保险入口预制键
    @property(cc.Prefab) prefab_insurance_hit_outs: cc.Prefab = null;                   // 击中保险提示动画预制键
    @property(cc.Prefab) prefab_favor_detail: cc.Prefab = null;                         // 该手详情预制件

    @property(cc.Node) panel_main: cc.Node = null;                                      // 主面板
    @property(cc.Node) panel_view: cc.Node = null;                                      // 视图面板
    @property(cc.Node) panel_seat: cc.Node = null;                                      // 座位面板
    @property(cc.Node) panel_anim: cc.Node = null;                                      // 动作面板
    @property(cc.Node) panel_insurance: cc.Node = null;                                 // 保险面板

    @property(cc.Sprite) img_d: cc.Sprite = null;                                       // D
    @property(cc.Label) txt_page: cc.Label = null;                                      // 页数文本
    @property(cc.Label) txt_speed: cc.Label = null;                                     // 速度文本

    @property(cc.Button) btn_back: cc.Button = null;                                    // 返回
    @property(cc.Button) btn_switch: cc.Button = null;                                  // 切换
    @property(cc.Button) btn_delete: cc.Button = null;                                  // 删除

    @property(cc.Button) btn_pause: cc.Button = null;                                   // 播放/暂停
    @property(cc.Button) btn_replay: cc.Button = null;                                  // 重播
    @property(cc.Button) btn_speed: cc.Button = null;                                   // 调速

    @property(cc.Button) btn_first: cc.Button = null;                                   // 最前页
    @property(cc.Button) btn_last: cc.Button = null;                                    // 最后页
    @property(cc.Button) btn_before: cc.Button = null;                                  // 上一页
    @property(cc.Button) btn_next: cc.Button = null;                                    // 下一页

    static g_class_name: string = "GameReviewFavorReplay";                              // 类名
    private static g_instance: GameReviewFavorReplay = null;                            // 伪单例

    private _trans_slider: cc.Slider = null;                                            // 回放进度条
    private _trans_slider_sp: cc.Sprite = null;                                         // 回放进度条精灵
    private _trans_slider_elapse: number = 0;                                           // 进度条已流逝的时间
    private _trans_buttons: cc.Button[] = [];                                           // 跳转按钮
    private _speedGear: SpeedGear = SpeedGear.ESG_GEAR_1;                               // 当前回放速率

    private _btn_sendout: cc.Node = null;                                               // 发发看
    private _btn_forceshow: cc.Node = null;                                             // 强制亮牌
    private _ctx_sendout: cc.Node = null;
    private _ctx_forceshow: cc.Node = null;

    private _txt_pots: cc.Label = null                                                  // 底池
    private _main_pool: cc.Node = null                                                  // 主池
    private _side_pool: cc.Node[] = [];                                                 // 边池
    private _side_pool_pos_list: cc.Vec2[] = [];                                        // 边池坐标

    private _txt_profit: cc.Label = null;                                               // 盈利
    private _txt_blind: cc.Label = null;                                                // 盲注
    private _txt_time: cc.Label = null;                                                 // 时间
    private _txt_serial: cc.Label = null;                                               // 编号
    private _crit_time_tips: cc.Node = null;                                            // 暴击开场提示

    private _public_cards: Card[] = [];                                                 // 公共牌
    private _public_cards_src_pos: cc.Vec2[] = [];                                      // 公共牌原始位置

    private _pot_amount: number = 0;                                                    // 当前底池金额
    private _cur_page_index: number = 0;                                                // 当前页索引
    private _deleting_game_uuid: string = "";                                           // 正在删除的"game_uuid"
    private _isPlaying: boolean = true;                                                 // 是否正在播放
    private _txt_invalid_data_desc: cc.Label = null;                                    // 无效数据描述文本

    private _tPokerHandData: PokerHandData = null;                                      // 牌谱信息
    private _tInsuranceReplay: InsuranceEntrance = null;                                // 保险回放实例对象
    private _tInsuranceHitOutsTips: InsuranceHitOutsTips = null;                        // 保险击中"outs"提示实例对象

    private _actCommandList: CommonAction[] = [];                                       // 动作指令集
    private _actCommandCurIndex: number = 0;                                            // 当前动作指令索引
    private _actCommandDelayTime: number = 0;                                           // 累计的指令集调度时间

    private _seatsList: Seat[] = [];                                                    // 座位数组
    private _seatsPosMap: HashMap<number, cc.Vec2[]> = new HashMap();                   // 座位坐标容器(几人, 每人对应坐标)
    private _seatsDirMap: HashMap<number, number[]> = new HashMap();                    // 座位方位容器(几人, 每人对应方位)
    private _muckList: number[] = [];                                                   // 开启埋牌的"seatid"数组
    private _initialStakeMap: HashMap<number, number> = new HashMap();                  // 每个座位的筹码初始值

    private _playerActionMaxTime: number = 14;                                          // 玩家操作时长(服务器没加字段, 暂时写死)
    private _playerActionBlinkTime: number = 2;                                         // 玩家操作超时时长, 包含在"14s"内

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): GameReviewFavorReplay {
        if (!(prefab instanceof cc.Prefab)) return null;

        parentNode = parentNode ? parentNode : cc.director.getScene();
        zorder = zorder ? zorder : 0;

        if (!GameReviewFavorReplay.g_instance || !cc.isValid(GameReviewFavorReplay.g_instance)) {
            let inst: cc.Node = cc.instantiate(prefab);
            GameReviewFavorReplay.g_instance = inst.getComponent(GameReviewFavorReplay);
            if (GameReviewFavorReplay.g_instance) {
                let v2_size: cc.Vec2 = cc.v2(inst.width, inst.height);
                let v2_scale: cc.Vec2 = cc.v2(inst.scaleX, inst.scaleY);
                pos = pos ? pos : (inst.getAnchorPoint().sub(parentNode.getAnchorPoint())).scaleSelf(v2_size).scaleSelf(v2_scale);
                inst.setPosition(pos);
                inst.active = false;
                parentNode.addChild(inst, zorder);
            }
            else {
                inst.destroy();
                inst = null;
            }
        }

        return GameReviewFavorReplay.g_instance;
    }

    /**
     * 获取当前实例
     */
    static getInstance(): GameReviewFavorReplay {
        return GameReviewFavorReplay.g_instance;
    }

    /**
     * 显示视图
     * @param index 
     * @param isAnim 
     * @param moveDir 
     */
    autoShow(index: number, isAnim: boolean = true, moveDir: number = cv.action.eMoveActionDir.EMAD_TO_LEFT): void {
        // 设置当前索引
        this._cur_page_index = index;

        // 显示界面
        let actDelay: number = isAnim ? cv.action.delay_type.NORMAL : 0;
        cv.action.showAction(this.node,
            moveDir,
            cv.action.eMoveActionType.EMAT_FADE_IN,
            actDelay,
            this._actFunc.bind(this),
            this._actFuncFinish.bind(this), 1 / cc.game.getFrameRate());
    }

    /**
     * 隐藏视图
     * @param isAnim 
     * @param moveDir 
     */
    autoHide(isAnim: boolean = true, moveDir: number = cv.action.eMoveActionDir.EMAD_TO_RIGHT): void {
        if (this.node.active) {
            let actDelay: number = isAnim ? cv.action.delay_type.NORMAL : 0;
            cv.action.showAction(this.node,
                moveDir,
                cv.action.eMoveActionType.EMAT_FADE_OUT,
                actDelay,
                this._actFunc.bind(this),
                this._actFuncFinish.bind(this), 1 / cc.game.getFrameRate());
        }
    }

    protected onLoad(): void {
        if (!GameReviewFavorReplay.g_instance) GameReviewFavorReplay.g_instance = this;

        if (!cv.native.isFullScreen()) {
            this.panel_main.getComponent(cc.Widget).top = 50;
        }

        cv.resMgr.adaptWidget(this.node, true);
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget) {
            widget.destroy();
        }

        this._initUI();
        this._initSeats();
    }

    protected start(): void {
        console.log(`${GameReviewFavorReplay.g_class_name} - start`);
        this._resetView();
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerEvent();
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterEvent();
        }
    }

    protected onDestroy(): void {
        GameReviewFavorReplay.g_instance = null;
        console.log(`${GameReviewFavorReplay.g_class_name}: onDestroy`);
    }

    /**
     * 动作前回调
     * @param target 
     * @param actIO 
     */
    private _actFunc(target: cc.Node, actIO: number): void {
        console.log(`${GameReviewFavorReplay.g_class_name} - _actFunc`);
    }

    /**
     * 动作后回调
     * @param target 
     * @param actIO 
     */
    private _actFuncFinish(target: cc.Node, actIO: number): void {
        console.log(`${GameReviewFavorReplay.g_class_name} - _actFuncFinish`);

        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this._updateView();
        }
        else {
            this._resetView();
        }
    }

    /**
     * 初始化"ui"控件和事件等
     */
    private _initUI(): void {
        let panel_bottom: cc.Node = this.panel_main.getChildByName("panel_bottom");
        let panel_func: cc.Node = panel_bottom.getChildByName("panel_func");
        this._btn_sendout = panel_func.getChildByName("btn_sendout");
        this._btn_forceshow = panel_func.getChildByName("btn_forceshow");
        this._ctx_sendout = panel_func.getChildByName("ctx_sendout");
        this._ctx_forceshow = panel_func.getChildByName("ctx_forceshow");

        let panel_txt: cc.Node = panel_func.getChildByName("panel_txt");
        this._txt_profit = panel_txt.getChildByName("txt_profit").getComponent(cc.Label);
        this._txt_blind = panel_txt.getChildByName("txt_blind").getComponent(cc.Label);
        this._txt_time = panel_txt.getChildByName("txt_time").getComponent(cc.Label);
        this._txt_serial = panel_txt.getChildByName("txt_serial").getComponent(cc.Label);

        this._main_pool = this.panel_view.getChildByName("main_pool");
        let side_pool: cc.Node = this.panel_view.getChildByName("side_pool");
        for (let i = 0; i < side_pool.childrenCount; ++i) {
            let node: cc.Node = side_pool.getChildByName(`node_${i}`);
            if (node) {
                this._side_pool.push(node);
                this._side_pool_pos_list.push(cc.v2(node.position));
            }
        }

        this._txt_pots = this.panel_view.getChildByName("txt_pots").getComponent(cc.Label);
        this._txt_invalid_data_desc = this.panel_view.getChildByName("txt_invalid_data").getComponent(cc.Label);

        // 初始化共牌/位置等
        let panel_cards: cc.Node = this.panel_view.getChildByName("panel_cards");
        for (let i = 0; i < panel_cards.childrenCount; ++i) {
            let cardNode: cc.Node = panel_cards.getChildByName(`card_${i}`);
            if (cardNode) this._public_cards.push(cardNode.getComponent(Card));
        }
        for (let i = 0; i < this._public_cards.length; ++i) {
            this._public_cards_src_pos.push(cc.v2(this._public_cards[i].node.position));
        }

        // 暴击开场提示
        this._crit_time_tips = this.panel_view.getChildByName("crit_time_tips");

        // 进度条
        let panel_trans: cc.Node = panel_bottom.getChildByName("panel_trans");
        this._trans_slider = panel_trans.getChildByName("slider").getComponent(cc.Slider);
        this._trans_slider_sp = this._trans_slider.node.getChildByName("img_sp").getComponent(cc.Sprite);

        // 跳转按钮
        for (let i = 0; i < panel_trans.childrenCount; ++i) {
            let node: cc.Node = panel_trans.getChildByName(`btn_${i}`);
            if (node) {
                this._trans_buttons.push(node.getComponent(cc.Button));
            }
        }

        // 按钮事件
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_switch.node.on("click", this._onClickSwitch, this);
        this.btn_delete.node.on("click", this._onClickDelete, this);

        this.btn_pause.node.on("click", this._onClickPause, this);
        this.btn_replay.node.on("click", this._onClickReplay, this);
        this.btn_speed.node.on("click", this._onClickSpeed, this);

        this.btn_first.node.on("click", this._onClickFirst, this);
        this.btn_last.node.on("click", this._onClickLast, this);
        this.btn_before.node.on("click", this._onClickBefore, this);
        this.btn_next.node.on("click", this._onClickNext, this);

        this._btn_sendout.on("click", this._onClickSendOut, this);
        this._btn_forceshow.on("click", this._onClickForceShow, this);
        this._txt_serial.node.on("click", this._onClickSerialNumber, this);

        // 隐藏相关控件
        this.img_d.node.active = false;
        this._crit_time_tips.active = false;
        this._btn_sendout.active = false;
        this._btn_forceshow.active = false;
        this._ctx_sendout.active = false;
        this._ctx_forceshow.active = false;
        this._txt_invalid_data_desc.node.active = false;
    }

    /**
     * 初始化座位(底部开始顺时针)
     */
    private _initSeats(): void {
        this._seatsPosMap.clear();

        // 极限"10"座
        let tmp_scale: number = 0.75;
        let tmp_position: cc.Vec2[] = [];
        let tmp_totalcount: number = 10;
        for (let i = 0; i < tmp_totalcount; ++i) {
            let img_tmp: cc.Node = this.panel_seat.getChildByName(`img_tmp_${i}`);
            if (img_tmp) {
                tmp_position.push(cc.v2(img_tmp.position));
                img_tmp.removeFromParent();
                img_tmp.destroy();
            }
        }

        if (tmp_position.length !== 10) {
            console.error(`${GameReviewFavorReplay.g_class_name} - error: init seats pos faild`);
        }

        // 以索引"0"开始(即垂直居下), 顺时针排序
        // 2人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[5]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_TOP_LEFT);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 3人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[7]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_UP);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 4人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[8]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_TOP_LEFT);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 5人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 6人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_TOP_LEFT);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 7人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 8人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_TOP_LEFT);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 9人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[4]);
            seatsPos.push(tmp_position[6]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);

            // 方位
            let seatsDir: number[] = [];
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_BOTTOM);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_LEFT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_TOP_LEFT);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_TOP_RIGHT);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_UP);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            seatsDir.push(cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN);
            this._seatsDirMap.add(seatsDir.length, seatsDir);
        } while (false)

        // 实例化化座位数组
        do {
            cv.StringTools.clearArray(this._seatsList);
            for (let i = 0; i < 9; ++i) {
                let seat_node: cc.Node = cc.instantiate(this.prefab_seat);
                seat_node.setAnchorPoint(cc.v2(0.5, 0.5));
                seat_node.setPosition(cc.v2(0, 0));
                seat_node.scale = tmp_scale;
                this.panel_seat.addChild(seat_node);

                let seat: Seat = seat_node.getComponent(Seat);
                seat.serverId = i;
                seat.SeatViewId = i;
                seat.seatType = cv.Enum.SeatType.SeatType_FavorReplaySeat;
                seat.setMainPool(this._main_pool);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_empty);
                seat.node.active = false;
                this._seatsList.push(seat);
            }
        } while (false);
    }

    /**
     * 注册事件
     */
    private _registerEvent(): void {
        cv.MessageCenter.register("update_handMap", this._onMsgUpdateGameHand.bind(this), this.node);
        cv.MessageCenter.register("update_favor_uuid_list", this._onMsgUpdateFavorUUIDList.bind(this), this.node)
        cv.MessageCenter.register("delete_favor_handmap", this._onMsgDeleteFavorHand.bind(this), this.node);
        cv.MessageCenter.register("on_favorit_forceshow", this._onMsgUpdateFavorForceShow.bind(this), this.node);
        cv.MessageCenter.register("on_favorit_sendout", this._onMsgUpdateFavorSendOut.bind(this), this.node);
    }

    /**
     * 反注册事件
     */
    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("update_handMap", this.node);
        cv.MessageCenter.unregister("update_favor_uuid_list", this.node);
        cv.MessageCenter.unregister("delete_favor_handmap", this.node);
        cv.MessageCenter.unregister("on_favorit_forceshow", this.node);
        cv.MessageCenter.unregister("on_favorit_sendout", this.node);
    }

    /**
     * 更新静态文本
     */
    private _updateStaticText(): void {
        let panel_top: cc.Node = this.panel_main.getChildByName("panel_top");
        let txt_title: cc.Label = panel_top.getChildByName("txt_title").getComponent(cc.Label);
        txt_title.string = cv.config.getStringData("game_review_favor_detail_title_txt");                               // 标题

        let txt_sendout: cc.Label = this._btn_sendout.getChildByName("txt_title").getComponent(cc.Label);
        txt_sendout.string = cv.config.getStringData("allReview_allReview_panel_sendout_txt");                          // 发发看

        let txt_forceshow: cc.Label = this._btn_forceshow.getChildByName("txt_title").getComponent(cc.Label);
        txt_forceshow.string = cv.config.getStringData("allReview_allReview_panel_forceshow_txt");                      // 强制亮牌
    }

    /**
     * 重置视图
     */
    private _resetView(): void {
        this._updateStaticText();

        this._resetReplayView();
        this._updateDataView(null);
    }

    /**
     * 更新总视图
     */
    private _updateView(): void {
        this._updateStaticText();

        // 确保"当前索引"有效性
        this._cur_page_index = Math.min(this._cur_page_index, gameDataMgr.tCollectPokerMapData.totalCount - 1);
        this._cur_page_index = Math.max(this._cur_page_index, 0);

        // 拉取指定索引的"game_uuid"
        if (gameDataMgr.tCollectPokerMapData.totalCount > 0) {
            this._reqGameUUIDByIndex(this._cur_page_index);
        }
        else {
            this._resetReplayView();
            this._updateDataView(null);
            console.error(`${GameReviewFavorReplay.g_class_name} - error: play favor replay faild`);
        }
    }

    /**
     * 拉取指定索引的"game_uuid"
     * @param index 
     */
    private _reqGameUUIDByIndex(index: number): void {
        if (index < 0 || index >= gameDataMgr.tCollectPokerMapData.totalCount) return;

        let uid: number = cv.dataHandler.getUserData().u32Uid;
        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(index);
        if (t) {
            this._reqGameHand(t.uuid);
        }
        else {
            cv.httpHandler.requestGetFavoriteUUIDList(uid, index, 1);
        }
    }

    /**
     * 请求已收藏的牌谱的"game_uuid"数组 回调
     */
    private _onMsgUpdateFavorUUIDList(params: { skipIdx: number, count: number }): void {
        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(params.skipIdx);
        if (t) {
            this._reqGameHand(t.uuid);
        }
        else {
            let idx1: number = params.skipIdx;
            let idx2: number = this._cur_page_index;
            console.error(`${GameReviewFavorReplay.g_class_name} - error: request favor uuids[${idx1}, ${idx2}] faild`);
        }
    }

    /**
     * 请求指定索引的"gameuuid"数据
     * @param index 
     */
    private _reqGameHand(game_uuid: string): void {
        if (gameDataMgr.tCollectPokerMapData.hasJsonValue(game_uuid)) {
            let value: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(game_uuid);
            cv.httpHandler._onFavoriteHand(value);
        }
        else {
            let uid: number = cv.dataHandler.getUserData().u32Uid;
            cv.httpHandler.requestFavoriteHand(uid, game_uuid);
        }
    }

    /**
     * 请求"gameuuid"数据 回调
     * @param err_code 错误码(非0表示无效数据)
     */
    private _onMsgUpdateGameHand(err_code: number): void {
        let pokerHandData: PokerHandData = gameDataMgr.tCollectPokerMapData.tPokerHandData;

        // 校准"当前页"
        gameDataMgr.tCollectPokerMapData.mUUIDCache.forEach((uuid: string, t: CollectUUID): any => {
            if (uuid === pokerHandData.sGameUUID) {
                this._cur_page_index = t.index;
                return "break";
            }
        });

        // 更新数据视图
        this._resetReplayView();
        this._updateDataView(pokerHandData);

        // 标记该手牌局数据真实有效性
        let is_valid_data: boolean = err_code === 0;
        let key: string = cv.config.getStringData("game_review_favor_detail_invalid_data_txt");
        this._txt_invalid_data_desc.string = `${key}[${err_code}]`
        this._txt_invalid_data_desc.node.active = !is_valid_data;
    }

    /**
     * 请求"删除该手"牌局 回调
     */
    private _onMsgDeleteFavorHand(result: number): void {
        if (result === 0) {
            cv.TT.showMsg(cv.config.getStringData("game_review_favor_detail_delete_ok_txt"), cv.Enum.ToastType.ToastTypeInfo);

            gameDataMgr.tCollectPokerMapData.deteGameUUID(this._deleting_game_uuid);
            this._deleting_game_uuid = "";
            this._updateView();
        }
        else {
            let desc: string = cv.config.getStringData("game_review_favor_detail_delete_faild_txt");
            desc = `${desc}(${result})`;
            cv.TT.showMsg(desc, cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 更新数据视图
     * @param pokerHandData 
     */
    private _updateDataView(pokerHandData: PokerHandData): void {
        // 隐"藏无效数据描述文本"
        this._txt_invalid_data_desc.node.active = false;

        // 显示页数
        let tatalPage: number = gameDataMgr.tCollectPokerMapData.totalCount;
        let curPage: number = tatalPage > 0 ? this._cur_page_index + 1 : 0;
        this.txt_page.string = `${curPage}/${tatalPage}`;

        // 盈利/盲注/时间/编号
        this._txt_profit.string = "";
        this._txt_profit.node.active = false;

        this._txt_blind.string = "";
        this._txt_blind.node.active = false;

        this._txt_time.string = "";
        this._txt_time.node.active = false;

        this._txt_serial.string = "";
        this._txt_serial.node.active = false;

        // 时间/编号
        if (pokerHandData) {
            // 时间(格式: M-D H:M)
            let game_name: string = cv.config.getStringData("game_review_favor_detail_game_name_txt");
            let time: string = cv.StringTools.formatTime(pokerHandData.nCreateTime, cv.Enum.eTimeType.Month_Day_Hour_Min);
            this._txt_time.string = `${game_name} ${time}`;
            this._txt_time.node.active = true;

            // 编号
            this._txt_serial.string = `${pokerHandData.sGameUUID}`;
            this._txt_serial.node.active = true;
        }

        // 回放数据取"盈利/盲注"字段
        if (pokerHandData && pokerHandData.objReplay) {
            let roomInfo: any = pokerHandData.objReplay["RoomInfo"];
            let tableInfo: any = pokerHandData.objReplay["TableInfo"];
            let seatsInfo: any = pokerHandData.objReplay["SeatsInfo"];
            let roundsInfo: any = pokerHandData.objReplay["RoundsInfo"];

            // 盈利
            do {
                let profit: number = 0;
                let seats_info: any[] = seatsInfo["seats_info"];
                let settlesInfo: any[] = roundsInfo["settlement_round"];
                for (let i = 0; i < cv.StringTools.getArrayLength(settlesInfo); ++i) {
                    let seatID: number = cv.Number(settlesInfo[i]["win_seat_no"]);
                    let winAmount: number = cv.Number(settlesInfo[i]["win_amount"]);

                    let isFind: boolean = false;
                    for (let j = 0; j < cv.StringTools.getArrayLength(seats_info); ++j) {
                        let info: any = seats_info[j];
                        let pid: number = cv.Number(info["UID"]);
                        let sid: number = cv.Number(info["seat_no"]);
                        if (seatID === sid && pid === cv.dataHandler.getUserData().u32Uid) {
                            isFind = true;
                            profit = winAmount;
                            break;
                        }
                    }
                    if (isFind) break;
                }

                profit = cv.StringTools.clientGoldByServer(profit);
                let prefix: string = profit >= 0 ? "Won" : "Lose";
                this._txt_profit.string = `${prefix}:${profit}`;
                this._txt_profit.node.active = true;
            } while (false);

            // 盲注
            do {
                let sbLevel: number = 0;
                let bbLevel: number = cv.Number(roomInfo["blind"]);
                let anteLevel: number = cv.Number(roomInfo["ante"]);
                let straddleSeatID: number = -1;
                let isCritTime: boolean = Boolean(roundsInfo["is_now_crit_time"]);

                // 若是暴击局需要读取另外的字段("repaly"数据盲注都是"0")
                if (isCritTime) {
                    let handData: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(pokerHandData.sGameUUID);
                    if (handData) {
                        // anteLevel = cv.Number(handData.ante);
                        bbLevel = cv.Number(handData.blind);
                    }
                }

                // 解析小盲配置
                for (let i = 0; i < 20; ++i) {
                    let strBlind: string = cv.config.getblindString(i);
                    if (strBlind) {
                        let vBlind = strBlind.split('/');
                        let nSB = Math.min(cv.Number(vBlind[0]), cv.Number(vBlind[1]));
                        let nBB = Math.max(cv.Number(vBlind[0]), cv.Number(vBlind[1]));

                        if (cv.StringTools.serverGoldByClient(nBB) === bbLevel) {
                            sbLevel = cv.StringTools.serverGoldByClient(nSB);
                        }
                    }
                }

                // 解析"straddle"
                if (tableInfo["straddle_seat"] !== null && typeof tableInfo["straddle_seat"] !== "undefined") {
                    straddleSeatID = cv.Number(tableInfo["straddle_seat"]);
                }

                // 大小盲
                sbLevel = cv.StringTools.clientGoldByServer(sbLevel);
                bbLevel = cv.StringTools.clientGoldByServer(bbLevel);
                anteLevel = cv.StringTools.clientGoldByServer(anteLevel);
                this._txt_blind.string = `${sbLevel}/${bbLevel}`;

                // 是否有"straddle"
                if (straddleSeatID >= 0) {
                    let straddle: number = 2 * bbLevel;
                    this._txt_blind.string += `/${straddle}`;
                }

                // 是否有"ante"
                if (anteLevel > 0) {
                    this._txt_blind.string += `/(${anteLevel})`;
                }

                // 若是短牌, 则只有"ante"
                if (pokerHandData.nGameMode === 3) {
                    this._txt_blind.string = `ante:${anteLevel}`;
                }

                this._txt_blind.node.active = true;
            } while (false);
        }

        // 适配"盈利, 盲注, 时间, 编号"文本排版(从右至左排版)
        do {
            let fontSize: number = 27;
            let offset_side: number = 0;
            let offset_middle: number = 20;

            let panel: cc.Node = this._txt_profit.node.parent;
            let criticalWidth: number = (0 - panel.anchorX) * panel.width;

            // 适用于: 横向任意锚点, 纵向锚点"0.5"
            let x: number = 0;

            // 盈利, 盲注
            do {
                x = (1 - panel.anchorX) * panel.width;
                x -= offset_side;
                if (this._txt_blind.node.active) {
                    this._txt_blind.fontSize = fontSize;
                    let txt_blind_w: number = cv.resMgr.getLabelStringSize(this._txt_blind).width;
                    x -= txt_blind_w * (1 - this._txt_blind.node.anchorX) * this._txt_blind.node.scaleX;
                    this._txt_blind.node.setPosition(x, this._txt_blind.node.y);
                    x -= txt_blind_w * this._txt_blind.node.anchorX * this._txt_blind.node.scaleX;
                    if (txt_blind_w > 0) x -= offset_middle;
                }

                if (this._txt_profit.node.active) {
                    this._txt_profit.fontSize = fontSize;
                    let txt_profit_w: number = cv.resMgr.getLabelStringSize(this._txt_profit).width;
                    x -= txt_profit_w * (1 - this._txt_profit.node.anchorX) * this._txt_profit.node.scaleX;
                    this._txt_profit.node.setPosition(x, this._txt_profit.node.y);
                    x -= txt_profit_w * this._txt_profit.node.anchorX * this._txt_profit.node.scaleX;
                }
                x -= offset_side;
                --fontSize
            } while (x < criticalWidth)

            // 时间, 编号
            fontSize = 27;
            do {
                x = (1 - panel.anchorX) * panel.width;
                x -= offset_side;
                if (this._txt_serial.node.active) {
                    this._txt_serial.fontSize = fontSize;
                    let txt_serial_w: number = cv.resMgr.getLabelStringSize(this._txt_serial).width;
                    x -= txt_serial_w * (1 - this._txt_serial.node.anchorX) * this._txt_serial.node.scaleX;
                    this._txt_serial.node.setPosition(x, this._txt_serial.node.y);
                    x -= txt_serial_w * this._txt_serial.node.anchorX * this._txt_serial.node.scaleX;
                    if (txt_serial_w > 0) x -= offset_middle;
                }

                if (this._txt_time.node.active) {
                    this._txt_time.fontSize = fontSize;
                    let txt_time_w: number = cv.resMgr.getLabelStringSize(this._txt_time).width;
                    x -= txt_time_w * (1 - this._txt_time.node.anchorX) * this._txt_time.node.scaleX;
                    this._txt_time.node.setPosition(x, this._txt_time.node.y);
                    x -= txt_time_w * this._txt_time.node.anchorX * this._txt_time.node.scaleX;
                }
                x -= offset_side;
                --fontSize
            } while (x < criticalWidth);
        } while (false);

        // 加载回放数据
        this._reloadReplayData(pokerHandData);
    }

    // --------------------------------------------------------------------------------------------------------------------
    // 回放逻辑

    /**
     * 加载回放数据
     * @param pokerHandData 
     */
    private _reloadReplayData(pokerHandData: PokerHandData): void {
        if (!pokerHandData || !pokerHandData.objReplay) return;
        this._tPokerHandData = pokerHandData;

        this._initReplayView();
        this._analysisAllActions();
        this._initTransBtns();
        this._runAllActions();
    }

    /**
     * 重置回放视图
     * @param cleanup 是否深度清理(默认: true)
     * @description 若是切页, 则传入"true"
     * @description 若是重播, 则传入"false"
     */
    private _resetReplayView(cleanup: boolean = true): void {
        // 清除动作列表
        this._actCommandCurIndex = 0;
        this._actCommandDelayTime = 0;
        cv.StringTools.clearArray(this._actCommandList);

        // 移除动作节点
        this.panel_view.stopAllActions();
        this.panel_anim.stopAllActions();
        this.panel_anim.removeAllChildren();
        this.panel_anim.destroyAllChildren();

        // 复原"D"
        this.img_d.node.stopAllActions();
        this.img_d.node.scale = 1;
        this.img_d.node.active = false;

        // 隐藏保险相关动画
        if (this._tInsuranceReplay) this._tInsuranceReplay.autoHide(false);
        if (this._tInsuranceHitOutsTips) this._tInsuranceHitOutsTips.hideAnim();

        // 清理 每个座位筹码初始值
        this._initialStakeMap.clear();

        // 清理 埋牌的"seatid"数组
        cv.StringTools.clearArray(this._muckList);

        // 清理座位
        let visibleSeatCount: number = 0
        for (let i = 0; i < this._seatsList.length; ++i) { if (this._seatsList[i].node.active) ++visibleSeatCount; }
        let seatsPos: cc.Vec2[] = this._seatsPosMap.get(visibleSeatCount);
        for (let i = 0; i < this._seatsList.length; ++i) {
            let seat: Seat = this._seatsList[i];
            seat.setSeatEmpty();

            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                seat.getCard(j).initDefaultValue();
                seat.getShowCard(j).initDefaultValue();
            }

            // 强行停止座位所有动作和定时器
            seat.node.stopAllActions();
            cc.director.getScheduler().unscheduleAllForTarget(seat);

            if (!seat.node.active) continue;
            seat.SeatViewId = i;
            seat.node.setPosition(seatsPos[i]);

            // 是否隐藏座位
            if (cleanup) seat.node.active = false;
        }

        // 重置公共牌
        for (let i = 0; i < this._public_cards.length; ++i) {
            this._public_cards[i].node.active = true;
            this._public_cards[i].node.opacity = 0xFF;
            this._public_cards[i].stopSchedulesAndActions();
            this._public_cards[i].initDefaultValue();
            this._public_cards[i].setFace(false);
            this._public_cards[i].setCrackAnim(false);
            this._public_cards[i].resetPos();
            this._public_cards[i].node.setPosition(this._public_cards_src_pos[i]);
            this._public_cards[i].node.active = false;
        }

        // 重置筹码池
        this._setPotAmount(0, false);
        this._setMainPool(0, false);
        for (let i = 0; i < this._side_pool.length; ++i) {
            this._setSidePool(i, 0);
        }

        // 重置播放按钮状态
        this._isPlaying = true;
        this._updatePauseBtnStatus();

        // 重置跳转按钮/进度条状态
        this._resetTransSlider();
        this._unChooseTransBtns();
        if (cleanup) this._resetTransBtns();

        // 重置播放速度
        this._setReplaySpeed(SpeedGear.ESG_GEAR_1);

        // 重置"亮牌, 发发看"等按钮显示状态
        this._btn_sendout.active = false;
        this._btn_forceshow.active = false;
        this._ctx_sendout.active = false;
        this._ctx_forceshow.active = false;
    }

    /**
     * 初始化回放视图
     */
    private _initReplayView(): void {
        // 初始化"座位"(数量/位置)
        do {
            let roomInfo: any = this._tPokerHandData.objReplay["RoomInfo"];
            let players_count = cv.Number(roomInfo["players_count"]);
            let seatsPos: cc.Vec2[] = this._seatsPosMap.get(players_count);

            let seatHandsCardType: number = cv.Enum.SeatHandsCardType.SHCT_TEXAS;
            if (this._tPokerHandData.nGameid === cv.Enum.GameId.Plo) {
                seatHandsCardType = cv.Enum.SeatHandsCardType.SHCT_PLO;
            }

            for (let i = 0; i < this._seatsList.length; ++i) {
                let seat: Seat = this._seatsList[i];
                seat.initHandCards(seatHandsCardType);
                seat.node.active = i < players_count;
                seat.SeatViewId = -1;

                if (seat.node.active) {
                    seat.SeatViewId = i;
                    seat.node.setPosition(seatsPos[i]);
                }

                // 手牌设置"gameid"
                for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                    seat.getCard(j).setGameID(this._tPokerHandData.nGameid);
                    seat.getShowCard(j).setGameID(this._tPokerHandData.nGameid);
                }
            }

            // 公牌设置"gameid"
            for (let i = 0; i < this._public_cards.length; ++i) {
                this._public_cards[i].setGameID(this._tPokerHandData.nGameid);
            }
        } while (false);

        // 实例化保险
        do {
            if (cv.StringTools.getArrayLength(this._tPokerHandData.objReplayInsurance) > 0) {
                // 实例化保险
                if (!this._tInsuranceReplay) {
                    this._tInsuranceReplay = cc.instantiate(this.prefab_insurance_entrance).getComponent(InsuranceEntrance);
                    this.panel_insurance.addChild(this._tInsuranceReplay.node);
                }
                this._tInsuranceReplay.init();
                this._tInsuranceReplay.initFinish(this._tPokerHandData.objReplayInsurance[0]["InsuranceMode"], false);
                this._tInsuranceReplay.setViewMode(InsuranceData.InsuranceViewMode.VIEW_REPLAY);
                this._tInsuranceReplay.autoHide(false);

                // 因为保险面板预制件是全屏, 所以这里计算缩放比例, 限制高度比例
                let scaleRate: number = this._tInsuranceReplay.getMainPanelSize().height / this.panel_insurance.height;
                if (scaleRate > 1) {
                    scaleRate = 1 / scaleRate * 0.9;
                }
                else {
                    scaleRate = 0.9;
                }
                this._tInsuranceReplay.node.setScale(scaleRate);

                // 实例化击中保险提示
                if (!this._tInsuranceHitOutsTips) {
                    this._tInsuranceHitOutsTips = cc.instantiate(this.prefab_insurance_hit_outs).getComponent(InsuranceHitOutsTips);
                    this._tInsuranceHitOutsTips.node.setScale(0.8);
                    this.panel_insurance.addChild(this._tInsuranceHitOutsTips.node);
                }
                this._tInsuranceHitOutsTips.hideAnim();
            }
        } while (false);
    }

    /**
     * 初始化所有跳转按钮
     */
    private _initTransBtns(): void {
        // 跳转映射(目前都是针对"ActionSrcType.ACTION_SYSTEM", 所以无需再重新定义枚举)
        // 后续有改动时在定义
        let transTypes: number[] = [];
        transTypes.push(SystemActionType.SYSTEM_ACTION_DEALFLOP);           // 翻牌
        transTypes.push(SystemActionType.SYSTEM_ACTION_DEALTURN);           // 转牌
        transTypes.push(SystemActionType.SYSTEM_ACTION_DEALRIVER);          // 河牌

        for (let i = 0; i < this._trans_buttons.length; ++i) {
            let type: number = transTypes[i];
            let btn: cc.Button = this._trans_buttons[i];
            let txt: cc.Label = btn.node.getChildByName("txt").getComponent(cc.Label);
            switch (type) {
                case SystemActionType.SYSTEM_ACTION_DEALFLOP: {
                    txt.string = cv.config.getStringData("game_review_favor_replay_flop_txt");
                } break;
                case SystemActionType.SYSTEM_ACTION_DEALTURN: {
                    txt.string = cv.config.getStringData("game_review_favor_replay_turn_txt");
                } break;
                case SystemActionType.SYSTEM_ACTION_DEALRIVER: {
                    txt.string = cv.config.getStringData("game_review_favor_replay_river_txt");
                } break;

                default: txt.string = ""; break;
            }

            // 位置排版(从左至右排版)
            let commandIndex: number = -1;
            for (let j = 0; j < this._actCommandList.length; ++j) {
                let action: any = this._actCommandList[j];
                if (action.srcType === ActionSrcType.ACTION_SYSTEM && action.action === type) {
                    commandIndex = j;
                }
            }

            if (commandIndex >= 0) {
                let commandDelay: number = this._getActCommandElapseTime(commandIndex);
                let commandTotalDelay: number = this._getActCommandElapseTime(this._actCommandList.length);
                let progress: number = commandDelay / commandTotalDelay;

                let pos: cc.Vec2 = cc.Vec2.ZERO;
                pos.x = (0 - this._trans_slider.node.anchorX) * this._trans_slider.node.width;
                pos.x += this._trans_slider.node.width * progress * this._trans_slider.node.scaleX;
                this._trans_slider.node.convertToWorldSpaceAR(pos, pos);
                btn.node.parent.convertToNodeSpaceAR(pos, pos);
                btn.node.x = pos.x;
                btn.node.active = true;
            }
            else {
                btn.node.active = false;
            }

            let tag: TagCom = btn.getComponent(TagCom);
            if (!tag) tag = btn.addComponent(TagCom);

            tag.nIdx = i;
            tag.nTag = commandIndex;
            if (!btn.node.hasEventListener("click")) {
                btn.node.on("click", this._onClickTransBtns, this);
            }
        }

        // 容错处理: "UI"设计理论上存在重叠缺陷, 右侧时间轴过于密集就会出现
        // 若跳转按钮重叠在一起, 则强行把重叠部分拆开
        // 虽强行拆开, 但会导致跳转按钮与进度条节奏不一致失去协调(这里说明下, 也是按需求强改)
        // 这里逆向强拆(从左至右存在溢出屏幕的情况, 需要再次检测, 比较麻烦, 所以直接从右至左, 左边时间轴应该是不会溢出的)
        do {
            let last_bound_lx: number = 0;
            let last_bound_rx: number = 0;
            let last_bound_init_once: boolean = false;
            for (let i = this._trans_buttons.length - 1; i >= 0; --i) {
                let node: cc.Node = this._trans_buttons[i].node;
                if (!node.active) continue;

                let tmp_lx: number = node.x + node.width * (0 - node.anchorX);
                let tmp_rx: number = tmp_lx + node.width * node.scaleX;

                if (last_bound_init_once) {
                    // 有重叠
                    if (tmp_rx >= last_bound_lx) {
                        let x: number = last_bound_lx - node.width * (1 - node.anchorX) * node.scaleX;
                        node.x = x;
                        tmp_lx = node.x + node.width * (0 - node.anchorX);
                        tmp_rx = tmp_lx + node.width * node.scaleX;
                    }
                }

                last_bound_lx = tmp_lx;
                last_bound_rx = tmp_rx;
                last_bound_init_once = true;
            }
        } while (false);
    }

    /**
     * 重置所有跳转按钮
     */
    private _resetTransBtns(): void {
        for (let i = 0; i < this._trans_buttons.length; ++i) {
            let tag: TagCom = this._trans_buttons[i].getComponent(TagCom);
            if (tag) tag.reset();

            this._trans_buttons[i].node.active = false;
        }
    }

    /**
     * 跳转按钮点击事件
     * @param target 
     */
    private _onClickTransBtns(target: cc.Button): void {
        cv.AudioMgr.playButtonSound('button_click');
        let tag: TagCom = target.getComponent(TagCom);
        if (!tag) return;

        let commandIndex: number = tag.nTag;
        if (commandIndex < 0 || commandIndex >= this._actCommandList.length) return;

        this._resetReplayView(false);
        this._analysisAllActions();
        this._transToActions(tag.nTag);
        this._runAllActions();

        let commandDelay: number = this._getActCommandElapseTime(commandIndex);
        let commandTotalDelay: number = this._getActCommandElapseTime(this._actCommandList.length);

        this._trans_slider_elapse = commandDelay;
        this._setTransSliderProgress(commandDelay / commandTotalDelay);
        this._chooseTransBtns(tag.nIdx);
    }

    /**
     * 选中指定的跳转按钮
     * @param index 
     */
    private _chooseTransBtns(index: number): void {
        for (let i = 0; i < this._trans_buttons.length; ++i) {
            let txt: cc.Node = this._trans_buttons[i].node.getChildByName("txt");
            if (i === index) {
                txt.color = cc.Color.WHITE;
            }
            else {
                txt.color = cc.color(0x72, 0x72, 0x8E, 0xFF);
            }
        }
    }

    /**
     * 反选所有跳转按钮
     */
    private _unChooseTransBtns(): void {
        for (let i = 0; i < this._trans_buttons.length; ++i) {
            let txt: cc.Node = this._trans_buttons[i].node.getChildByName("txt");
            txt.color = cc.color(0x72, 0x72, 0x8E, 0xFF);
        }
    }

    /**
     * 重置进度条
     */
    private _resetTransSlider(): void {
        this._stopTransSlider();
        this._trans_slider_elapse = 0;
        this._setTransSliderProgress(0);
    }

    /**
     * 启动进度条定时器
     */
    private _runTransSlider(): void {
        this._stopTransSlider();
        this.schedule(this._onScheduleTransSlider, 0);
    }

    /**
     * 停止进度条定时器
     */
    private _stopTransSlider(): void {
        this.unschedule(this._onScheduleTransSlider);
    }

    /**
     * 进度条定时器回调
     * @param elapse 
     */
    private _onScheduleTransSlider(elapse: number): void {
        this._trans_slider_elapse += elapse;

        let commandTotalDelay: number = this._getActCommandElapseTime(this._actCommandList.length);
        if (this._trans_slider_elapse >= commandTotalDelay) {
            this._trans_slider_elapse = commandTotalDelay;
            this._stopTransSlider();
        }

        let progress: number = 0;
        if (commandTotalDelay > 0) {
            progress = this._trans_slider_elapse / commandTotalDelay;
        }
        this._setTransSliderProgress(progress);

        // 更新"跳转按钮"状态
        let hasChoose: boolean = false;
        for (let i = 0; i < this._trans_buttons.length; ++i) {
            let tag: TagCom = this._trans_buttons[i].getComponent(TagCom);
            let lastActElapse: number = this._getActCommandElapseTime(tag.nTag);
            let nextActElapse: number = this._getActCommandElapseTime(tag.nTag + 1);

            if (this._trans_slider_elapse >= lastActElapse && this._trans_slider_elapse <= nextActElapse) {
                hasChoose = true;
                this._chooseTransBtns(i);
            }
        }
        if (!hasChoose) {
            this._unChooseTransBtns();
        }
    }

    /**
     * 设置进度条进度值
     * @param progress 
     */
    private _setTransSliderProgress(progress: number): void {
        this._trans_slider.progress = progress;
        this._trans_slider_sp.node.width = this._trans_slider.progress * this._trans_slider.node.width;
    }

    /**
     * 设置底池金额
     * @param amount 
     * @param isAdd 
     */
    private _setPotAmount(amount: number, isAdd: boolean = true): void {
        amount = cv.StringTools.clientGoldByServer(amount);

        if (isAdd) {
            this._pot_amount += amount;
        }
        else {
            this._pot_amount = amount;
        }

        let decimalPlaces: number = 0;
        if (this._tPokerHandData && this._tPokerHandData.bMirco) decimalPlaces = 2;
        this._pot_amount = cv.StringTools.toFixed(this._pot_amount, decimalPlaces, cv.StringTools.RoundingMode.ROUND_DOWN);

        let prefix: string = cv.config.getStringData("GameScene_gameMain_panel_dichiword_text");
        this._txt_pots.string = `${prefix}${this._pot_amount}`;
        this._txt_pots.node.active = true;

        if (this._pot_amount <= 0) {
            this._txt_pots.node.active = false;
        }
    }

    /**
     * 设置主池数量/显隐
     * @param value 
     * @param active 
     * @param isAnim 
     */
    private _setMainPool(value: number, active: boolean, isAnim: boolean = false): void {
        let txt: cc.Label = this._main_pool.getChildByName("txt").getComponent(cc.Label);
        let txt_string: string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(value));

        this._main_pool.active = active;
        this._main_pool.stopAllActions();

        if (isAnim && this._main_pool.active) {
            let delay: number = 0.3;
            this._main_pool.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc((): void => {
                txt.string = txt_string;
            })));
        }
        else {
            txt.string = txt_string;
        }
    }

    /**
     * 设置边池数量
     * @param index 
     * @param value 
     * @param isAnim 
     */
    private _setSidePool(index: number, value: number, curSideNum: number = 0, isAnim: boolean = false): void {
        if (index < 0 || index >= this._side_pool.length) return;
        value = cv.StringTools.clientGoldByServer(value);

        let pot: cc.Node = this._side_pool[index];
        let pot_txt: cc.Label = pot.getChildByName("txt").getComponent(cc.Label);
        let pot_pos: cc.Vec2 = this._side_pool_pos_list[index];

        if (curSideNum != 0 && index == (curSideNum - 2) && (curSideNum - 1) % 2 != 0) {
            //如果边池显示数量是奇数，最后一个边池要居中显示

            pot_pos.x = 0;
        }

        pot.active = value > 0;
        pot_txt.string = cv.StringTools.numberToString(value);
        pot.stopAllActions();
        pot.setScale(1);
        pot.setPosition(pot_pos);

        if (isAnim && pot.active) {
            let srcPos: cc.Vec2 = cc.Vec2.ZERO;
            this._main_pool.convertToWorldSpaceAR(cc.Vec2.ZERO, srcPos);
            pot.parent.convertToNodeSpaceAR(srcPos, srcPos);

            let delay: number = 0.2;
            let during: number = 0.3;
            let spawn: cc.FiniteTimeAction = cc.spawn(cc.scaleTo(during, 1), cc.moveTo(during, pot_pos));

            pot.setScale(0);
            pot.setPosition(srcPos);
            pot.runAction(cc.sequence(cc.delayTime(delay), spawn));
        }
    }

    /**
     * 通过座位"ID"获取座位
     * @param seatID
     */
    private _getSeatBySID(sid: number): Seat {
        let seat: Seat = null;
        for (let i = 0; i < this._seatsList.length; ++i) {
            if (sid === this._seatsList[i].serverId) {
                seat = this._seatsList[i];
                break;
            }
        }
        return seat;
    }

    /**
    * 通过玩家"ID"获取座位
     * @param seatID
     */
    private _getSeatByUID(uid: number): Seat {
        let seat: Seat = null;
        for (let i = 0; i < this._seatsList.length; ++i) {
            let player: PlayerInfo = this._seatsList[i].getData();
            if (!player) continue;

            if (uid === player.playerid) {
                seat = this._seatsList[i];
                break;
            }
        }
        return seat;
    }

    /**
     * 获取指定动作命令索引之前已流逝的时间
     * @param actCmdIdx 
     */
    private _getActCommandElapseTime(actCmdIdx: number): number {
        let elaspse: number = 0;

        for (let i = 0; i < this._actCommandList.length; ++i) {
            if (i >= actCmdIdx) break;
            let action: any = this._actCommandList[i];
            elaspse += action.actDuring;
            elaspse += action.actDelayTime;
        }

        return elaspse;
    }

    /**
     * 解析 底牌圈(公共牌出现以前的第一轮叫注)
     */
    private _analysisActionPreFlop(): void {
        let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
        let preFlop: any[] = roundsInfo["preflop"];

        // 一轮叫注
        for (let i = 0; i < cv.StringTools.getArrayLength(preFlop); ++i) {
            let t: PlayerAction = new PlayerAction();
            t.srcType = ActionSrcType.ACTION_PLAYER;
            t.seq = cv.Number(preFlop[i]["seq"]);
            t.seatID = cv.Number(preFlop[i]["seat_no"]);
            t.amount = cv.Number(preFlop[i]["amount"]);
            t.actionType = cv.Number(preFlop[i]["action_type"]);
            t.actionTime = cv.Number(preFlop[i]["action_time"]);
            t.actDuring = Math.min(t.actionTime, this._playerActionMaxTime);
            t.actDelayTime = 0.5;
            this._actCommandList.push(t);
        }

        // 结束叫注
        let endPreFlop: any = roundsInfo["end_preflop_round"];
        let t: SystemAction = new SystemAction();
        t.srcType = ActionSrcType.ACTION_SYSTEM;
        t.action = SystemActionType.SYSTEM_ACTION_ENDPREFLOP;
        t.actDuring = 0.5;
        t.actDelayTime = 0.5;
        t.data = endPreFlop["pots_info"];
        this._actCommandList.push(t);
    }

    /**
     * 解析 翻牌圈(首3张公共牌出现以后的押注圈)
     */
    private _analysisActionFlop(): void {
        let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
        let cards: any[] = roundsInfo["flop_community_cards"];

        if (cv.StringTools.getArrayLength(cards) > 0) {
            // 发牌
            let t1: SystemAction = new SystemAction();
            t1.srcType = ActionSrcType.ACTION_SYSTEM;
            t1.action = SystemActionType.SYSTEM_ACTION_DEALFLOP;
            t1.actDuring = 0.82;
            t1.actDelayTime = 0.18;
            t1.data = cards;
            this._actCommandList.push(t1);

            // 一轮叫注
            let rounds: any[] = roundsInfo["flop"];
            for (let i = 0; i < cv.StringTools.getArrayLength(rounds); ++i) {
                let t2: PlayerAction = new PlayerAction();
                t2.srcType = ActionSrcType.ACTION_PLAYER;
                t2.seq = cv.Number(rounds[i]["seq"]);
                t2.seatID = cv.Number(rounds[i]["seat_no"]);
                t2.amount = cv.Number(rounds[i]["amount"]);
                t2.actionType = cv.Number(rounds[i]["action_type"]);
                t2.actionTime = cv.Number(rounds[i]["action_time"]);
                t2.actDuring = Math.min(t2.actionTime, this._playerActionMaxTime);
                t2.actDelayTime = 0.5;
                this._actCommandList.push(t2);
            }

            // 结束叫注
            let endRounds = roundsInfo["end_flop_round"];
            let t3: SystemAction = new SystemAction();
            t3.srcType = ActionSrcType.ACTION_SYSTEM;
            t3.action = SystemActionType.SYSTEM_ACTION_ENDFLOP;
            t3.actDuring = 0.5;
            t3.actDelayTime = 0.5;
            t3.data = endRounds["pots_info"];
            this._actCommandList.push(t3);
        }
    }

    /**
     * 解析 转牌圈(第4张公共牌出现以后的押注圈)
     */
    private _analysisActionTurn(): void {
        // 转牌保险
        let insuranceReplayData: any = null;
        let isHitOutInsurance: boolean = false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this._tPokerHandData.objReplayInsurance); ++i) {
            if (cv.Number(this._tPokerHandData.objReplayInsurance[i]["Round"]) === 2) {
                // 显示保险
                let t1: SystemAction = new SystemAction();
                t1.srcType = ActionSrcType.ACTION_SYSTEM;
                t1.action = SystemActionType.SYSTEM_ACTION_SHOWINSURANCE;
                t1.actDuring = 3;
                t1.actDelayTime = 0;
                t1.data = this._tPokerHandData.objReplayInsurance[i];
                this._actCommandList.push(t1);

                // 隐藏保险
                let t2: SystemAction = new SystemAction();
                t2.srcType = ActionSrcType.ACTION_SYSTEM;
                t2.action = SystemActionType.SYSTEM_ACTION_HIDEINSURANCE;
                t2.actDuring = 0.2;
                t2.actDelayTime = 0;
                this._actCommandList.push(t2);

                // 是否击中保险
                insuranceReplayData = this._tPokerHandData.objReplayInsurance[i];
                isHitOutInsurance = this._tPokerHandData.objReplayInsurance[i]["Shot"];
                break;
            }
        }

        // 转牌
        let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
        let card = roundsInfo["turn_community_card"];
        if (card !== null && typeof card !== "undefined") {
            // 发牌
            let t1: SystemAction = new SystemAction();
            t1.srcType = ActionSrcType.ACTION_SYSTEM;
            t1.action = SystemActionType.SYSTEM_ACTION_DEALTURN;
            t1.actDuring = 0.3 + 0.13 + 0.13;
            t1.actDelayTime = 0.14;
            t1.data = card;
            this._actCommandList.push(t1);

            // 击中保险动画
            if (isHitOutInsurance) {
                let t: SystemAction = new SystemAction();
                t.srcType = ActionSrcType.ACTION_SYSTEM;
                t.action = SystemActionType.SYSTEM_ACTION_HITOUTINSURANCE;
                t.actDuring = 1.2;
                t.actDelayTime = 0.1;
                t.data = insuranceReplayData;
                this._actCommandList.push(t);
            }

            // 一轮叫注
            let rounds: any[] = roundsInfo["turn"];
            for (let i = 0; i < cv.StringTools.getArrayLength(rounds); ++i) {
                let t2: PlayerAction = new PlayerAction();
                t2.srcType = ActionSrcType.ACTION_PLAYER;
                t2.seq = cv.Number(rounds[i]["seq"]);
                t2.seatID = cv.Number(rounds[i]["seat_no"]);
                t2.amount = cv.Number(rounds[i]["amount"]);
                t2.actionType = cv.Number(rounds[i]["action_type"]);
                t2.actionTime = cv.Number(rounds[i]["action_time"]);
                t2.actDuring = Math.min(t2.actionTime, this._playerActionMaxTime);
                t2.actDelayTime = 0.5;
                this._actCommandList.push(t2);
            }

            // 结束叫注
            let endRounds = roundsInfo["end_turn_round"];
            let t3: SystemAction = new SystemAction();
            t3.srcType = ActionSrcType.ACTION_SYSTEM;
            t3.action = SystemActionType.SYSTEM_ACTION_ENDTURN;
            t3.actDuring = 0.5;
            t3.actDelayTime = 0.5;
            t3.data = endRounds["pots_info"];
            this._actCommandList.push(t3);
        }
    }

    /**
     * 解析 河牌圈(第5张公共牌出现以后的押注圈)
     */
    private _analysisActionRiver(): void {
        // 河牌保险
        let insuranceReplayData: any = null;
        let isHitOutInsurance: boolean = false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this._tPokerHandData.objReplayInsurance); ++i) {
            if (cv.Number(this._tPokerHandData.objReplayInsurance[i]["Round"]) === 3) {
                // 显示保险
                let t1: SystemAction = new SystemAction();
                t1.srcType = ActionSrcType.ACTION_SYSTEM;
                t1.action = SystemActionType.SYSTEM_ACTION_SHOWINSURANCE;
                t1.actDuring = 3;
                t1.actDelayTime = 0;
                t1.data = this._tPokerHandData.objReplayInsurance[i];
                this._actCommandList.push(t1);

                // 隐藏保险
                let t2: SystemAction = new SystemAction();
                t2.srcType = ActionSrcType.ACTION_SYSTEM;
                t2.action = SystemActionType.SYSTEM_ACTION_HIDEINSURANCE;
                t2.actDuring = 0.2;
                t2.actDelayTime = 0;
                this._actCommandList.push(t2);

                // 是否击中保险
                insuranceReplayData = this._tPokerHandData.objReplayInsurance[i];
                isHitOutInsurance = this._tPokerHandData.objReplayInsurance[i]["Shot"];
                break;
            }
        }

        // 河牌
        let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
        let card: any = roundsInfo["river_community_card"];
        if (card !== null && typeof card !== "undefined") {
            // 发牌
            let t1: SystemAction = new SystemAction();
            t1.srcType = ActionSrcType.ACTION_SYSTEM;
            t1.action = SystemActionType.SYSTEM_ACTION_DEALRIVER;
            t1.actDuring = 0.3 + 0.13 + 0.13;
            t1.actDelayTime = 0.14;
            t1.data = card;
            this._actCommandList.push(t1);

            // 击中保险动画
            if (isHitOutInsurance) {
                let t: SystemAction = new SystemAction();
                t.srcType = ActionSrcType.ACTION_SYSTEM;
                t.action = SystemActionType.SYSTEM_ACTION_HITOUTINSURANCE;
                t.actDuring = 1.2;
                t.actDelayTime = 0.1;
                t.data = insuranceReplayData;
                this._actCommandList.push(t);
            }

            // 一轮叫注
            let rounds: any[] = roundsInfo["river"];
            for (let i = 0; i < cv.StringTools.getArrayLength(rounds); ++i) {
                let t2: PlayerAction = new PlayerAction();
                t2.srcType = ActionSrcType.ACTION_PLAYER;
                t2.seq = cv.Number(rounds[i]["seq"]);
                t2.seatID = cv.Number(rounds[i]["seat_no"]);
                t2.amount = cv.Number(rounds[i]["amount"]);
                t2.actionType = cv.Number(rounds[i]["action_type"]);
                t2.actionTime = cv.Number(rounds[i]["action_time"]);
                t2.actDuring = Math.min(t2.actionTime, this._playerActionMaxTime);
                t2.actDelayTime = 0.5;
                this._actCommandList.push(t2);
            }

            // 结束叫注
            let endRounds = roundsInfo["end_river_round"];
            let t3: SystemAction = new SystemAction();
            t3.srcType = ActionSrcType.ACTION_SYSTEM;
            t3.action = SystemActionType.SYSTEM_ACTION_ENDRIVER;
            t3.actDuring = 0.5;
            t3.actDelayTime = 0.5;
            t3.data = endRounds["pots_info"];
            this._actCommandList.push(t3);
        }
    }

    /**
     * 解析 强制亮牌
     */
    private _analysisActionForceShow(): void {
        let seatsInfo: any = this._tPokerHandData.objReplay["SeatsInfo"];
        let seats_info: any[] = seatsInfo["seats_info"];

        let getSeatNo: (playerid: number) => number = (playerid: number): number => {
            let seat_no: number = -1;
            for (let i = 0; i < cv.StringTools.getArrayLength(seats_info); ++i) {
                if (seats_info[i].UID === playerid) {
                    seat_no = seats_info[i].seat_no;
                    break;
                }
            }
            return seat_no;
        };

        let forceShowCard = false;
        let self_uid: number = cv.dataHandler.getUserData().u32Uid;
        let showCardsMap: HashMap<number, boolean> = new HashMap();
        for (let i = 0; i < this._tPokerHandData.vPlayerRecords.length; ++i) {
            if (self_uid === this._tPokerHandData.vPlayerRecords[i].nPlayerID) {
                forceShowCard = this._tPokerHandData.vPlayerRecords[i].bForceShowDown;
            }
            else {
                let seatNo = getSeatNo(this._tPokerHandData.vPlayerRecords[i].nPlayerID);
                if (seatNo != -1 && this._tPokerHandData.vPlayerRecords[i].vCards.length > 0) {
                    showCardsMap.add(seatNo, this._tPokerHandData.vPlayerRecords[i].bActiveShow);
                }
            }
        }

        // 若牌桌上无人"强制亮牌", 则继续检索"旁观列表"
        if (!forceShowCard) {
            for (let i = 0; i < this._tPokerHandData.vShowCardByStanderUID.length; ++i) {
                if (this._tPokerHandData.vShowCardByStanderUID[i] === self_uid) {
                    forceShowCard = true;
                    break;
                }
            }
        }

        // 亮牌的座位ID列表
        let showCardsSeatIDList: number[] = [];

        // 自己开启了强制亮牌功能
        if (forceShowCard) {
            showCardsMap.forEach((seatNo: number, isActiveShow: boolean) => {
                showCardsSeatIDList.push(seatNo);
            });
        }
        // 未开启亮牌功能, 继续检索对应有手牌的玩家是否主动"show"牌
        else {
            showCardsMap.forEach((seatNo: number, isActiveShow: boolean) => {
                if (isActiveShow) showCardsSeatIDList.push(seatNo);
            });
        }

        // 存在亮牌座位, 就统一处理亮牌
        if (showCardsSeatIDList.length > 0) {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_FORCESHOW;
            t.actDuring = 0.4;
            t.actDelayTime = 0.2;
            t.data = showCardsSeatIDList;
            this._actCommandList.push(t);
        }
    }

    /**
     * 解析 发发看
     */
    private _analysisActionSendOut(): void {
        let sendOutLen: number = 0;
        let pubcardsLen: number = this._tPokerHandData.vPublicCards.length;

        for (let i = 0; i < this._tPokerHandData.vPlayerRecords.length; ++i) {
            if (cv.dataHandler.getUserData().u32Uid === this._tPokerHandData.vPlayerRecords[i].nPlayerID) {
                sendOutLen = this._tPokerHandData.vPlayerRecords[i].nReviewSendOutLen;
                break;
            }
        }

        // 自己可见总长度 > 已发共牌长度
        if (sendOutLen > pubcardsLen) {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_SENDOUT;
            t.actDuring = (sendOutLen - pubcardsLen + 1) * 0.3;
            t.actDelayTime = 0.1;
            t.data = sendOutLen;
            this._actCommandList.push(t);
        }
    }

    /**
     * 解析动作指令集
     */
    private _analysisAllActions(): void {
        // 预座
        do {
            let roomInfo: any = this._tPokerHandData.objReplay["RoomInfo"];
            let seatsInfo: any = this._tPokerHandData.objReplay["SeatsInfo"];

            let self_seat_id: number = -1;
            let seats_info: any[] = seatsInfo["seats_info"];
            for (let i = 0; i < cv.StringTools.getArrayLength(seats_info); ++i) {
                let info: any = seats_info[i];
                let uid: number = cv.Number(info["UID"]);
                let seatid: number = cv.Number(info["seat_no"]);
                if (uid === cv.dataHandler.getUserData().u32Uid) {
                    let seat: Seat = this._getSeatBySID(seatid);
                    if (seat && seat.getSeatViewId() !== 0) {
                        self_seat_id = seatid;
                        break;
                    }
                }
            }

            let trans_count: number = 0;                                            // 寻路动作个数
            let is_cw_trans: boolean = true;                                        // 是否顺时针寻路

            if (self_seat_id >= 0) {
                let players_count = cv.Number(roomInfo["players_count"]);
                let cw_count: number = players_count - self_seat_id;                // 顺时针寻路个数
                let ccw_count: number = self_seat_id;                               // 逆时针寻路个数

                is_cw_trans = cw_count <= ccw_count;
                trans_count = Math.min(cw_count, ccw_count);
            }

            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_TRANS_SEAT;
            t.actDuring = 0; // trans_count * 0.2;                                  // 需求去掉旋转动画
            t.actDelayTime = 0.1;
            t.data = { trans_count: trans_count, is_cw_trans: is_cw_trans };
            this._actCommandList.push(t);
        } while (false);

        // 入座
        do {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_TAKE_SEAT;
            t.actDuring = 0;
            t.actDelayTime = 0.1;
            this._actCommandList.push(t);
        } while (false);

        // "D"位
        do {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_ELECT_DEALER;
            t.actDuring = 0.2;
            t.actDelayTime = 0.1;
            this._actCommandList.push(t);
        } while (false);

        // 暴击开场
        do {
            let roundInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
            let isCritTime: boolean = Boolean(roundInfo["is_now_crit_time"]);
            if (isCritTime) {
                let t: SystemAction = new SystemAction();
                t.srcType = ActionSrcType.ACTION_SYSTEM;
                t.action = SystemActionType.SYSTEM_ACTION_CRITTIME;
                t.actDuring = 1;
                t.actDelayTime = 0.1;
                this._actCommandList.push(t);
            }
        } while (false);

        // 前注
        do {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_ANTE;
            t.actDuring = 0.32;
            t.actDelayTime = 0.1;
            this._actCommandList.push(t);
        } while (false);

        // 盲注
        do {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_BLIND;
            t.actDuring = 0.32;
            t.actDelayTime = 0.1;
            this._actCommandList.push(t);
        } while (false);

        // 发手牌
        do {
            let sendCardDelay: number = 0;
            let isGamePLO: boolean = this._tPokerHandData.nGameid === cv.Enum.GameId.Plo;
            sendCardDelay = isGamePLO ? 0.3 : 0;

            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_SEND_HAND_CARD;
            t.actDuring = 0.3 + sendCardDelay;
            t.actDelayTime = 0.2;
            this._actCommandList.push(t);
        } while (false);

        // 底牌圈
        this._analysisActionPreFlop();

        // 翻牌圈
        this._analysisActionFlop();

        // 转牌圈
        this._analysisActionTurn();

        // 河牌圈
        this._analysisActionRiver();

        // 摊牌
        do {
            let tableInfo: any = this._tPokerHandData.objReplay["TableInfo"];
            if (cv.StringTools.getArrayLength(tableInfo["showdown_seats"]) > 0) {
                let t: SystemAction = new SystemAction();
                t.srcType = ActionSrcType.ACTION_SYSTEM;
                t.action = SystemActionType.SYSTEM_ACTION_SHOWDOWN;
                t.actDuring = 0.4;
                t.actDelayTime = 0.2;
                t.data = tableInfo["showdown_seats"];
                this._actCommandList.push(t);
            }
        } while (false);

        // 结算
        do {
            let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_SETTLEMENT;
            t.actDuring = 4;
            t.actDelayTime = 0.1;
            t.data = roundsInfo["settlement_round"];
            this._actCommandList.push(t);
        } while (false);

        // 强制亮牌
        this._analysisActionForceShow();

        // 发发看
        this._analysisActionSendOut();

        // 检测亮牌和发发看按钮显隐
        do {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_CHECK_FS_SO_STATUS;
            t.actDuring = 0;
            t.actDelayTime = 0;
            this._actCommandList.push(t);
        } while (false);
    }

    /**
     * 执行动作指令集
     */
    private _runAllActions(): void {
        // 动作
        for (let i = 0; i < this._actCommandList.length; ++i) {
            if (i < this._actCommandCurIndex) continue;

            let action: any = this._actCommandList[i];
            let delayAct: cc.ActionInterval = cc.delayTime(this._actCommandDelayTime);
            delayAct.setTag(i);
            this.panel_anim.runAction(cc.sequence(delayAct, cc.callFunc((): void => {
                ++this._actCommandCurIndex;

                switch (action.srcType) {
                    case ActionSrcType.ACTION_SYSTEM: {
                        this._runSystemActions(action);
                    } break;

                    case ActionSrcType.ACTION_PLAYER: {
                        this._runPlayerActions(action);
                    } break;

                    default: break;
                }
            })));
            this._actCommandDelayTime += action.actDuring;
            this._actCommandDelayTime += action.actDelayTime;
        }

        // 进度条
        this._runTransSlider();
    }

    /**
     * 跳转至指定指令
     */
    private _transToActions(commandIndex: number): void {
        for (let i = 0; i < this._actCommandList.length; ++i) {
            if (commandIndex === this._actCommandCurIndex) break;

            let action: any = this._actCommandList[i];
            switch (action.srcType) {
                case ActionSrcType.ACTION_SYSTEM: {
                    this._runSystemActions(action, false);
                } break;

                case ActionSrcType.ACTION_PLAYER: {
                    this._runPlayerActions(action, false);
                } break;

                default: break;
            }

            ++this._actCommandCurIndex;
        }
    }

    /**
     * 执行 系统动作
     * @param command 
     * @param isAnim 
     */
    private _runSystemActions(command: SystemAction, isAnim: boolean = true): void {
        switch (command.action) {
            case SystemActionType.SYSTEM_ACTION_CRITTIME: {
                this._doActionCritTime(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_TRANS_SEAT: {
                this._doActionTransSeat(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_ELECT_DEALER: {
                this._doActionDealer(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_TAKE_SEAT: {
                this._doActionTakeSeat(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_ANTE: {
                this._doActionAnte(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_BLIND: {
                this._doActionBlind(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_SEND_HAND_CARD: {
                this._doActionSendHandCard(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_ENDPREFLOP:
            case SystemActionType.SYSTEM_ACTION_ENDFLOP:
            case SystemActionType.SYSTEM_ACTION_ENDTURN:
            case SystemActionType.SYSTEM_ACTION_ENDRIVER: {
                this._doActionEndRound(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_DEALFLOP:
            case SystemActionType.SYSTEM_ACTION_DEALTURN:
            case SystemActionType.SYSTEM_ACTION_DEALRIVER: {
                this._doActionSendPublicCard(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_SHOWINSURANCE: {
                this._doActionInsurance(command, true, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_HIDEINSURANCE: {
                this._doActionInsurance(command, false, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_HITOUTINSURANCE: {
                this._doActionHitOutInsurance(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_SHOWDOWN: {
                this._doActionShowDown(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_SETTLEMENT: {
                this._doActionSettleMent(command, isAnim);
            } break;

            case SystemActionType.SYSTEM_ACTION_FORCESHOW: {
                this._doActionForceShow(command);
            } break;

            case SystemActionType.SYSTEM_ACTION_SENDOUT: {
                this._doActionSendOut(command);
            } break;

            case SystemActionType.SYSTEM_ACTION_CHECK_FS_SO_STATUS: {
                this._doActionCheckFSSOStatus(command);
            } break;

            default: break;
        }
    }

    /**
     * 执行 玩家动作
     * @param command 
     * @param isAnim 
     */
    private _runPlayerActions(command: PlayerAction, isAnim: boolean = true): void {
        let seat: Seat = this._getSeatBySID(command.seatID);
        if (!seat) return;
        let player: PlayerInfo = seat.getData();
        if (!player) return;

        let callback: (isAnim: boolean) => void = (isAnim: boolean): void => {
            seat.stopCDtime();
            seat.stopBlink();

            player.last_action = command.actionType;
            switch (command.actionType) {
                // 默认
                case cv.Enum.ActionType.Enum_Action_Null: {
                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, command.actionType);
                } break;

                // 看牌
                case cv.Enum.ActionType.Enum_Action_Check: {
                    if (isAnim && cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/checkSound");
                    }

                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, command.actionType);
                } break;

                // 弃牌
                case cv.Enum.ActionType.Enum_Action_Fold: {
                    // anim
                    if (isAnim) {
                        if (player.playerid === cv.dataHandler.getUserData().u32Uid) {
                            for (let i = 0; i < seat.getHandsCardsCount(); ++i) {
                                let card: Card = cc.instantiate(this.prefab_card).getComponent(Card);
                                card.updateCardBack();
                                card.setFace(false);
                                this.panel_anim.addChild(card.node);
                                card.node.setScale(seat.getShowCard(i).node.scale);

                                let sp: cc.Vec2 = cc.Vec2.ZERO;
                                let tp: cc.Vec2 = cc.Vec2.ZERO;
                                seat.getShowCard(i).node.convertToWorldSpaceAR(sp, sp);
                                card.node.parent.convertToNodeSpaceAR(sp, sp);

                                this._main_pool.convertToWorldSpaceAR(tp, tp);
                                card.node.parent.convertToNodeSpaceAR(tp, tp);
                                card.node.setPosition(sp);

                                let mt: cc.ActionInterval = cc.moveTo(0.2, tp);
                                let st: cc.ActionInterval = cc.scaleTo(0.2, 0.5);
                                let fo: cc.ActionInterval = cc.fadeOut(0.2);
                                let spawn: cc.FiniteTimeAction = cc.spawn(mt, st, fo);
                                card.node.runAction(cc.sequence(spawn, cc.destroySelf()));
                            }
                        }
                        else {
                            for (let i = 0; i < seat.getHandsCardsCount(); ++i) {
                                let card: Card = cc.instantiate(this.prefab_card).getComponent(Card);
                                card.updateCardBack();
                                card.setFace(false);
                                this.panel_anim.addChild(card.node);
                                card.node.setScale(seat.getCard(i).node.scale);

                                let sp: cc.Vec2 = cc.Vec2.ZERO;
                                let tp: cc.Vec2 = cc.Vec2.ZERO;
                                seat.getCard(i).node.convertToWorldSpaceAR(sp, sp);
                                card.node.parent.convertToNodeSpaceAR(sp, sp);

                                this._main_pool.convertToWorldSpaceAR(tp, tp);
                                card.node.parent.convertToNodeSpaceAR(tp, tp);

                                let v1: cc.Vec2 = cc.v2(0, sp.y);
                                let v2: cc.Vec2 = cc.v2(tp.x - sp.x, tp.y - sp.y);
                                let rotation: number = v2.signAngle(v1) / Math.PI * 180;

                                card.node.angle = -rotation;
                                card.node.setPosition(sp);

                                let mt: cc.ActionInterval = cc.moveTo(0.2, tp);
                                let st: cc.ActionInterval = cc.scaleTo(0.2, 0.5);
                                let fo: cc.ActionInterval = cc.fadeOut(0.2);
                                let spawn: cc.FiniteTimeAction = cc.spawn(mt, st, fo);
                                card.node.runAction(cc.sequence(spawn, cc.destroySelf()));
                            }
                        }
                    }

                    seat.hideCard();

                    if (isAnim && cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/foldCardSound");
                    }

                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, command.actionType);
                } break;

                // straddle
                case cv.Enum.ActionType.Enum_Action_Straddle: {
                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, command.actionType);
                } break;

                // 补盲
                case cv.Enum.ActionType.Enum_Action_Post: {
                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, command.actionType);
                } break;

                // 跟注(前面一样的注)
                case cv.Enum.ActionType.Enum_Action_Call: {
                    player.round_bet += command.amount;
                    player.stake = Math.max(0, player.stake - command.amount);

                    seat.setStake(player.stake);
                    this._setPotAmount(command.amount);

                    if (isAnim) {
                        seat.Bet(command.amount, cv.Enum.BType.BType_Call);
                    }
                    else {
                        seat.showChipsNow(player.round_bet);
                    }

                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Call);
                } break;

                // 加注(第一次下注 > 大盲的操作)
                case cv.Enum.ActionType.Enum_Action_Bet: {
                    let actualBet: number = command.amount - player.round_bet;

                    player.round_bet = command.amount;
                    player.stake = Math.max(0, player.stake - actualBet);

                    seat.setStake(player.stake);
                    this._setPotAmount(actualBet);

                    if (isAnim) {
                        seat.Bet(command.amount);
                    }
                    else {
                        seat.showChipsNow(command.amount);
                    }

                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Bet);
                } break;

                // 加注("Enum_Action_Bet"之后的加注)
                case cv.Enum.ActionType.Enum_Action_Raise: {
                    let actualBet: number = command.amount - player.round_bet;

                    player.round_bet = command.amount;
                    player.stake = Math.max(0, player.stake - actualBet);

                    seat.setStake(player.stake);
                    this._setPotAmount(actualBet);

                    if (isAnim) {
                        seat.Bet(command.amount);
                    }
                    else {
                        seat.showChipsNow(command.amount);
                    }

                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Raise);
                } break;

                // allin
                case cv.Enum.ActionType.Enum_Action_Allin: {
                    let actualBet: number = Math.min(command.amount, player.stake);

                    player.round_bet = command.amount;
                    player.stake = 0;

                    seat.setStake(0);
                    this._setPotAmount(actualBet);

                    if (isAnim) {
                        seat.Bet(command.amount);
                    }
                    else {
                        seat.showChipsNow(command.amount);
                    }

                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, cv.Enum.ActionType.Enum_Action_Allin);
                } break;

                default: {
                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, command.actionType);
                } break;
            }
        }

        if (isAnim) {
            seat.setThankCdTime(this._playerActionMaxTime, this._playerActionBlinkTime);
            seat.setSeatOtherOnAction();
            this.panel_anim.runAction(cc.sequence(cc.delayTime(command.actDuring), cc.callFunc((): void => {
                callback(isAnim);
            })));
        }
        else {
            callback(isAnim);
        }
    }

    /**
     * 暴击开场
     */
    private _doActionCritTime(command: SystemAction, isAnim: boolean = true): void {
        this._crit_time_tips.active = true;
        this._crit_time_tips.scale = 0;

        let rtxt_1: cc.Node = this._crit_time_tips.getChildByName("rtxt_1");
        let rtxt_2: cc.Node = this._crit_time_tips.getChildByName("rtxt_2");
        cv.StringTools.setRichTextString(rtxt_1, cv.config.getStringData("Criticsim_start_tip"));
        cv.StringTools.setRichTextString(rtxt_2, cv.config.getStringData("Criticsim_start_tip2"));

        this._crit_time_tips.stopAllActions();

        if (isAnim) {
            let est: cc.ActionInterval = cc.scaleTo(0.4, 1.0).easing(cc.easeOut(3));
            this._crit_time_tips.runAction(cc.sequence(cc.show(), cc.delayTime(0.2), est, cc.delayTime(0.4), cc.hide()));
        }
    }

    /**
     * 预座
     * @param command 
     * @param isAnim 
     */
    private _doActionTransSeat(command: SystemAction, isAnim: boolean = true): void {
        if (isAnim) isAnim = command.actDuring > 0;

        let fts_during: number = 0.2;
        let is_cw_trans: boolean = Boolean(command.data.is_cw_trans);
        let trans_count: number = cv.Number(command.data.trans_count);

        let roomInfo: any = this._tPokerHandData.objReplay["RoomInfo"];
        let players_count = cv.Number(roomInfo["players_count"]);
        let seatsDir: number[] = this._seatsDirMap.get(players_count);
        let seatsPos: cc.Vec2[] = this._seatsPosMap.get(players_count);

        if (trans_count > 0) {
            for (let i = 0; i < this._seatsList.length; ++i) {
                if (!this._seatsList[i].node.active) continue;

                let fts: cc.FiniteTimeAction[] = [];
                let endedPos: cc.Vec2 = cc.Vec2.ZERO;

                if (is_cw_trans) {
                    let nextIndex: number = 0;
                    for (let j = 0; j < trans_count; ++j) {
                        nextIndex = (i + 1 + j) % players_count;
                        fts.push(cc.moveTo(fts_during, seatsPos[nextIndex]));
                    }
                    endedPos = cc.v2(seatsPos[nextIndex]);
                }
                else {
                    let nextIndex: number = 0;
                    for (let j = 0; j < trans_count; ++j) {
                        nextIndex = i - j - 1;
                        if (nextIndex < 0) {
                            nextIndex += players_count;
                        }
                        nextIndex %= players_count;
                        fts.push(cc.moveTo(fts_during, seatsPos[nextIndex]));
                    }
                    endedPos = cc.v2(seatsPos[nextIndex]);
                }

                if (fts.length > 0) {
                    if (isAnim) {
                        if (fts.length === 1) {
                            this._seatsList[i].node.runAction(fts[0]);
                        }
                        else {
                            this._seatsList[i].node.runAction(cc.sequence(fts));
                        }
                    }
                    else {
                        this._seatsList[i].node.setPosition(endedPos);
                    }
                }
            }
        }

        let updateSeatViewID: () => void = (): void => {
            for (let i = 0; i < this._seatsList.length; ++i) {
                if (!this._seatsList[i].node.active) continue;

                let viewID: number = this._seatsList[i].getSeatViewId();
                if (is_cw_trans) {
                    // 顺时针递增
                    viewID += trans_count;
                    viewID = viewID % players_count;
                }
                else {
                    // 逆时针递减
                    viewID -= trans_count;
                    viewID += players_count;
                    viewID = viewID % players_count;
                }

                // 设置"SeatViewID"
                if (viewID >= 0 && viewID < seatsDir.length) {
                    this._seatsList[i].SeatViewId = viewID;
                    this._seatsList[i].direction = seatsDir[viewID];
                    this._seatsList[i].updateView();
                }
                else {
                    this._seatsList[i].setSeatViewId(viewID, players_count, cv.Enum.SeatType.SeatType_FavorReplaySeat);
                    console.error(`${GameReviewFavorReplay.g_class_name} - error: trans seat [${viewID}, ${seatsDir.length}] faild`);
                }
            }
        }

        // 无论旋转与否都更新"SeatViewID"(只是"delay"值不同而已)
        if (isAnim) {
            let delay: number = trans_count * fts_during;
            this.panel_anim.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc((): void => {
                updateSeatViewID();
            })));
        }
        else {
            updateSeatViewID();
        }
    }

    /**
     * "D"位
     * @param command 
     * @param isAnim 
     */
    private _doActionDealer(command: SystemAction, isAnim: boolean = true): void {
        let tableInfo: any = this._tPokerHandData.objReplay["TableInfo"];
        let seatID: number = cv.Number(tableInfo["dealer_seat"]);
        let seat: Seat = this._getSeatBySID(seatID);
        if (!seat) return;

        let offset: cc.Vec2 = cc.v2(40, -30);
        let startPos: cc.Vec2 = cc.Vec2.ZERO;
        let endedPos: cc.Vec2 = cc.Vec2.ZERO;
        this._main_pool.convertToWorldSpaceAR(cc.Vec2.ZERO, startPos);

        let chipsImg: cc.Node = seat.selfChipsText_img;
        let dw: number = this.img_d.node.width * this.img_d.node.anchorX * this.img_d.node.scaleX;              // D标宽度
        let dh: number = this.img_d.node.height * (this.img_d.node.anchorY - 0.5) * this.img_d.node.scaleY;     // D标高度
        let lx: number = chipsImg.position.x - chipsImg.width * chipsImg.anchorX * chipsImg.scaleX;             // 横向最左
        let rx: number = chipsImg.position.x + chipsImg.width * (1 - chipsImg.anchorX) * chipsImg.scaleX;       // 横向最右
        let yy: number = chipsImg.position.y + chipsImg.height * (0.5 - chipsImg.anchorY) * chipsImg.scaleY;    // 纵向中心

        switch (seat.direction) {
            case cv.Enum.SeatDriction.DRICTION_BOTTOM:
            case cv.Enum.SeatDriction.DRICTION_TOP_LEFT:
            case cv.Enum.SeatDriction.DRICTION_LEFT_UP:
            case cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN: {
                endedPos.x = rx + dw + offset.x;
                endedPos.y = yy + dh + offset.y;
                seat.node.convertToWorldSpaceAR(endedPos, endedPos);
            } break;

            case cv.Enum.SeatDriction.DRICTION_TOP_RIGHT:
            case cv.Enum.SeatDriction.DRICTION_RIGHT_UP:
            case cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN: {
                endedPos.x = lx - dw - offset.x;
                endedPos.y = yy + dh + offset.y
                seat.node.convertToWorldSpaceAR(endedPos, endedPos);
            } break;

            default: break;
        }

        this.img_d.node.parent.convertToNodeSpaceAR(startPos, startPos);
        this.img_d.node.parent.convertToNodeSpaceAR(endedPos, endedPos);

        this.img_d.node.active = true;
        this.img_d.node.stopAllActions();

        if (isAnim) {
            let mt: cc.ActionInterval = cc.moveTo(0.2, endedPos);
            let st: cc.ActionInterval = cc.scaleTo(0.2, 1);

            this.img_d.node.setScale(0);
            this.img_d.node.setPosition(startPos);
            this.img_d.node.runAction(cc.spawn(mt, st));
        }
        else {
            this.img_d.node.setScale(1);
            this.img_d.node.setPosition(endedPos);
        }
    }

    /**
     * 入座
     * @param command 
     * @param isAnim 
     */
    private _doActionTakeSeat(command: SystemAction, isAnim: boolean = true): void {
        let seatsInfo: any = this._tPokerHandData.objReplay["SeatsInfo"];
        let seats_info: any[] = seatsInfo["seats_info"];

        for (let i = 0; i < cv.StringTools.getArrayLength(seats_info); ++i) {
            let info: any = seats_info[i];
            let player: PlayerInfo = new PlayerInfo();
            player.name = cv.String(info["name"]);
            player.playerid = cv.Number(info["UID"]);
            player.seatid = cv.Number(info["seat_no"]);
            player.stake = cv.Number(info["stake"]);
            player.headurl = cv.String(info["head_url"]);
            player.plat = cv.Number(info["plat"]);
            player.round_bet = 0;

            if (info["is_muck"] === true) {
                this._muckList.push(player.seatid);
            }
            this._initialStakeMap.add(player.seatid, player.stake);

            let seat: Seat = this._getSeatBySID(player.seatid);
            if (seat) {
                seat.setData(player);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting);

                seat.hideCard();
                seat.hideChips();
                seat.hideFire();
                seat.hideTips();
                seat.hideStatusText();
                seat.hideChipsMove();
                seat.hideWin();
                seat.doGray(false);
            }
        }
    }

    /**
     * 前注
     * @param command 
     * @param isAnim 
     */
    private _doActionAnte(command: SystemAction, isAnim: boolean = true): void {
        let roomInfo: any = this._tPokerHandData.objReplay["RoomInfo"];
        let tableInfo: any = this._tPokerHandData.objReplay["TableInfo"];
        let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];
        let dealerSeatID: number = cv.Number(tableInfo["dealer_seat"]);

        let mode: number = cv.Number(roomInfo["mode"]);
        let ante: number = cv.Number(roomInfo["ante"]);
        let isAnteRound: boolean = roundsInfo["ante_round"];
        let isDoubleAnte: boolean = Boolean(roomInfo["double_ante"]);
        if (isAnteRound) {
            // 短牌检测庄家是否双倍"ante"(此处先下一个前注)
            if (mode === cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                if (isDoubleAnte) {
                    let dealerSeat: Seat = this._getSeatBySID(dealerSeatID);
                    if (dealerSeat) {
                        dealerSeat.showChipsNow(ante);
                        let player: PlayerInfo = dealerSeat.getData();
                        if (player) {
                            player.round_bet = player.round_bet + ante;
                            player.stake = player.stake - ante;
                            dealerSeat.setStake(player.stake);
                            this._setPotAmount(ante);
                        }
                    }
                }

                // 补"Ante"
                for (let i = 0; i < cv.StringTools.getArrayLength(tableInfo["post_seats"]); ++i) {
                    let postSeat: Seat = this._getSeatBySID(tableInfo["post_seats"][i]);
                    if (postSeat) {
                        postSeat.showTips(cv.config.getStringData("ActionTips9"), cv.Enum.TipsType.Tips_mendAnte);
                        postSeat.showChipsNow(ante);
                        let player: PlayerInfo = postSeat.getData();
                        if (player) {
                            player.round_bet = player.round_bet + ante;
                            player.stake = player.stake - ante;
                            postSeat.setStake(player.stake);
                            this._setPotAmount(ante);
                        }
                    }
                }
            }

            for (let i = 0; i < this._seatsList.length; ++i) {
                if (this._seatsList[i].getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
                    let seat: Seat = this._seatsList[i];
                    let player: PlayerInfo = seat.getData();
                    if (player) {
                        player.stake = player.stake - ante;
                        seat.setStake(player.stake);
                        this._setPotAmount(ante);
                        if (isAnim) seat.ChipsMoveOut(true);
                    }
                }
            }

            let potsInfo: any[] = roundsInfo["end_ante_round"]["pots_info"];
            if (cv.StringTools.getArrayLength(potsInfo) > 0) {
                let mainPot: any = potsInfo[0];
                this._setMainPool(cv.Number(mainPot["amount"]), true, isAnim);
            }
        }
    }

    /**
     * 盲注
     * @param command 
     * @param isAnim 
     */
    private _doActionBlind(command: SystemAction, isAnim: boolean = true): void {
        let roomInfo: any = this._tPokerHandData.objReplay["RoomInfo"];
        let tableInfo: any = this._tPokerHandData.objReplay["TableInfo"];
        let roundsInfo: any = this._tPokerHandData.objReplay["RoundsInfo"];

        let sbLevel: number = 0;
        let bbLevel: number = cv.Number(roomInfo["blind"]);
        let straddleLevel: number = 2 * bbLevel;

        let sbSeatID: number = cv.Number(tableInfo["sb_seat"]);
        let bbSeatID: number = cv.Number(tableInfo["bb_seat"]);
        let straddleSeatID: number = -1;

        // 解析小盲配置
        for (let i = 0; i < 20; ++i) {
            let strBlind: string = cv.config.getblindString(i);
            if (strBlind) {
                let vBlind = strBlind.split('/');
                let nSB = Math.min(cv.Number(vBlind[0]), cv.Number(vBlind[1]));
                let nBB = Math.max(cv.Number(vBlind[0]), cv.Number(vBlind[1]));

                if (cv.StringTools.serverGoldByClient(nBB) === bbLevel) {
                    sbLevel = cv.StringTools.serverGoldByClient(nSB);
                }
            }
        }

        // 解析"straddle"
        if (tableInfo["straddle_seat"] !== null && typeof tableInfo["straddle_seat"] !== "undefined") {
            straddleSeatID = cv.Number(tableInfo["straddle_seat"]);
        }

        let isBlindRound: boolean = roundsInfo["blind_round"];
        if (isBlindRound) {
            let sbSeat: Seat = this._getSeatBySID(sbSeatID);
            if (sbSeat) {
                let player: PlayerInfo = sbSeat.getData();
                if (player) {
                    player.round_bet = player.round_bet + sbLevel;
                    player.stake = player.stake - sbLevel;
                    sbSeat.setStake(player.stake);
                    this._setPotAmount(sbLevel);

                    if (isAnim) {
                        sbSeat.Bet(sbLevel);
                    }
                    else {
                        sbSeat.showChipsNow(sbLevel);
                    }
                }
            }

            let bbSeat: Seat = this._getSeatBySID(bbSeatID);
            if (bbSeat) {
                let player: PlayerInfo = bbSeat.getData();
                if (player) {
                    player.round_bet = player.round_bet + bbLevel;
                    player.stake = player.stake - bbLevel;
                    bbSeat.setStake(player.stake);
                    this._setPotAmount(bbLevel);

                    if (isAnim) {
                        bbSeat.Bet(bbLevel);
                    }
                    else {
                        bbSeat.showChipsNow(bbLevel);
                    }
                }
            }

            if (straddleSeatID >= 0) {
                let straddleSeat: Seat = this._getSeatBySID(straddleSeatID);
                if (straddleSeat) {
                    straddleSeat.showTips(cv.config.getStringData("ActionTips5"), cv.Enum.TipsType.Tips_straddle);
                    let player: PlayerInfo = straddleSeat.getData();
                    if (player) {
                        player.round_bet = player.round_bet + straddleLevel;
                        player.stake = player.stake - straddleLevel;
                        straddleSeat.setStake(player.stake);
                        this._setPotAmount(straddleLevel);

                        if (isAnim) {
                            straddleSeat.Bet(straddleLevel);
                        }
                        else {
                            straddleSeat.showChipsNow(straddleLevel);
                        }
                    }
                }
            }

            // 补盲注
            for (let i = 0; i < cv.StringTools.getArrayLength(tableInfo["post_seats"]); ++i) {
                let postSeat: Seat = this._getSeatBySID(tableInfo["post_seats"][i]);
                if (postSeat) {
                    let level: number = 0;
                    if (this._initialStakeMap.length > 3 && straddleSeatID >= 0) {
                        postSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                        level = straddleLevel;
                    } else {
                        postSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                        level = bbLevel;
                    }

                    let player: PlayerInfo = postSeat.getData();
                    if (player) {
                        player.round_bet = player.round_bet + level;
                        player.stake = player.stake - level;
                        postSeat.setStake(player.stake);
                        this._setPotAmount(level);

                        if (isAnim) {
                            postSeat.Bet(level);
                        }
                        else {
                            postSeat.showChipsNow(level);
                        }
                    }
                }
            }
        }
    }

    /**
     * 发手牌
     * @param command 
     * @param isAnim 
     */
    private _doActionSendHandCard(command: SystemAction, isAnim: boolean = true): void {
        let seatsInfo: any = this._tPokerHandData.objReplay["SeatsInfo"];
        let seats_info: any[] = seatsInfo["seats_info"];

        for (let i = 0; i < cv.StringTools.getArrayLength(seats_info); ++i) {
            let info: any = seats_info[i];
            let playerid: number = cv.Number(info["UID"]);
            let seatID: number = cv.Number(info["seat_no"]);
            let seat: Seat = this._getSeatBySID(seatID);
            if (seat) {
                let holecards: any[] = info["holecards"];

                // 填充手牌
                for (let j = 0; j < cv.StringTools.getArrayLength(holecards); ++j) {
                    let showcard: Card = seat.getShowCard(j);
                    if (showcard) {
                        showcard.setContent(cv.Number(holecards[j]["number"]), cv.Number(holecards[j]["suit"]));
                        showcard.setFace(false);
                    }
                    else {
                        console.error(`${GameReviewFavorReplay.g_class_name} - error: send hanscards length overflow [${j}]`);
                    }
                }

                let vpos: cc.Vec2 = cc.Vec2.ZERO;
                this._main_pool.convertToWorldSpaceAR(vpos, vpos);

                for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                    seat.getCard(j).setFace(false);
                    seat.getCard(j).setDealPos(vpos);

                    seat.getShowCard(j).setFace(false);
                    seat.getShowCard(j).setDealPos(vpos);
                }

                let isGamePLO: boolean = this._tPokerHandData.nGameid === cv.Enum.GameId.Plo;
                if (playerid === cv.dataHandler.getUserData().u32Uid) {
                    if (isAnim) {
                        let sendCardDelay: number = 0;
                        for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                            if (isGamePLO) sendCardDelay += 0.03 + 0.02 * j;
                            seat.getShowCard(j).deal(sendCardDelay);
                        }

                        this.panel_anim.runAction(cc.sequence(cc.delayTime(command.actDuring), cc.callFunc((): void => {
                            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                                seat.getShowCard(j).setFace(true);
                            }
                        }), cc.delayTime(command.actDelayTime), cc.callFunc((): void => {
                            // 显示自己牌型(没位置了, 就不搞这么详细了)
                        })));
                    }
                    else {
                        for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                            seat.getShowCard(j).node.active = true;
                            seat.getShowCard(j).setFace(true);
                        }
                    }
                }
                else {
                    if (isAnim) {
                        let sendCardDelay: number = 0;
                        for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                            if (isGamePLO) sendCardDelay += 0.03 + 0.02 * j;
                            seat.getCard(j).deal(sendCardDelay);
                        }
                    }
                    else {
                        for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                            seat.getCard(j).node.active = true;
                        }
                    }
                }
            }
        }
    }

    /**
     * 发共牌
     * @param command 
     * @param isAnim 
     */
    private _doActionSendPublicCard(command: SystemAction, isAnim: boolean = true): void {
        let cardInfo: any = command.data;
        let endedPos: cc.Vec2 = cc.Vec2.ZERO;

        switch (command.action) {
            case SystemActionType.SYSTEM_ACTION_DEALFLOP: {
                let startPos: cc.Vec2 = cc.v2(this._public_cards_src_pos[0]);
                for (let index = 0; index < 3; ++index) {
                    endedPos.x = this._public_cards_src_pos[index].x;
                    endedPos.y = this._public_cards_src_pos[index].y;

                    this._public_cards[index].node.active = true;
                    this._public_cards[index].stopSchedulesAndActions();
                    this._public_cards[index].setContent(cv.Number(cardInfo[index]["number"]), cv.Number(cardInfo[index]["suit"]));
                    this._public_cards[index].setFace(false);

                    if (isAnim) {
                        this._public_cards[index].node.setPosition(startPos);
                        this._public_cards[index].turn(0.2 + index * 0.12, true);
                        this._public_cards[index].node.runAction(cc.moveTo(0.1 * index, endedPos));
                    }
                    else {
                        this._public_cards[index].node.setPosition(endedPos);
                        this._public_cards[index].setFace(true);
                    }
                }
            } break;

            case SystemActionType.SYSTEM_ACTION_DEALTURN:
            case SystemActionType.SYSTEM_ACTION_DEALRIVER: {
                let index: number = command.action === SystemActionType.SYSTEM_ACTION_DEALTURN ? 3 : 4;
                endedPos.x = this._public_cards_src_pos[index].x;
                endedPos.y = this._public_cards_src_pos[index].y;

                this._public_cards[index].node.active = true;
                this._public_cards[index].stopSchedulesAndActions();
                this._public_cards[index].setContent(cv.Number(cardInfo["number"]), cv.Number(cardInfo["suit"]));
                this._public_cards[index].setFace(false);

                if (isAnim) {
                    let wpos: cc.Vec2 = cc.Vec2.ZERO;
                    this._main_pool.convertToWorldSpaceAR(cc.v2(0, 0), wpos);
                    this._public_cards[index].setDealPos(wpos);
                    this._public_cards[index].deal(0);
                    this._public_cards[index].turn(0.3);

                    if (cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
                    }
                }
                else {
                    this._public_cards[index].node.setPosition(endedPos);
                    this._public_cards[index].setFace(true);
                }
            } break;

            default: break;
        }
    }

    /**
     * 一轮叫注结束
     * @param command 
     * @param isAnim 
     */
    private _doActionEndRound(command: SystemAction, isAnim: boolean = true): void {
        let allinCount: number = 0;
        let playerCount: number = 0;
        for (let i = 0; i < this._seatsList.length; ++i) {
            let seat: Seat = this._seatsList[i];
            if (seat.getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
                let player: PlayerInfo = seat.getData();

                seat.SetName(player.name);
                seat.hideChips();
                seat.hideWin();

                if (player.last_action !== cv.Enum.ActionType.Enum_Action_Fold && player.last_action !== cv.Enum.ActionType.Enum_Action_Allin) {
                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting, cv.Enum.ActionType.Enum_Action_Null);
                    seat.doGray(false);
                    seat.hideTips();
                    seat.hideStatusText();
                }

                if (player.last_action === cv.Enum.ActionType.Enum_Action_Allin) {
                    ++allinCount;
                }

                if (player.last_action === cv.Enum.ActionType.Enum_Action_Fold) {
                    seat.hideCard();
                    seat.doGray(true);
                }

                if (player.last_action !== cv.Enum.ActionType.Enum_Action_Fold) {
                    ++playerCount;
                }

                if (player.round_bet > 0 && isAnim) {
                    seat.ChipsMoveOut();
                    if (cv.tools.isSoundEffectOpen()) {
                        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chips_to_pot");
                    }
                }

                player.round_bet = 0;
            }
        }

        if (playerCount >= 2) {
            if (playerCount <= allinCount + 1) {
                for (let i = 0; i < this._seatsList.length; ++i) {
                    let seat: Seat = this._seatsList[i];
                    let player: PlayerInfo = seat.getData();
                    if (seat.getStatus() === cv.Enum.SeatStatus.SeatStatus_empty || player.last_action === cv.Enum.ActionType.Enum_Action_Fold) continue;
                    if (player.playerid === cv.dataHandler.getUserData().u32Uid) continue;

                    let allShowCardInvisible: boolean = true;
                    for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                        allShowCardInvisible = allShowCardInvisible && !seat.getShowCard(j).node.active;
                    }

                    if (allShowCardInvisible) {
                        for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                            seat.getCard(j).node.active = false;
                            seat.getShowCard(j).node.active = true;
                        }

                        if (isAnim) {
                            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                                seat.getShowCard(j).setFace(false);
                                seat.getShowCard(j).turn(0.2, true);
                            }
                        }
                        else {
                            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                                seat.getShowCard(j).setFace(true);
                            }
                        }
                    }
                }
            }
        }

        let potsInfo: any[] = command.data;

        let potsInfo_size: number = cv.StringTools.getArrayLength(potsInfo);
        if (potsInfo_size > 0) {
            this._setMainPool(cv.Number(potsInfo[0]["amount"]), true, isAnim);

            // 设置边池(下标从1开始, 下标0是主池) 
            for (let i = 1; i < potsInfo_size; ++i) {
                let idx: number = i - 1;
                this._setSidePool(idx, cv.Number(potsInfo[i]["amount"]), potsInfo_size, isAnim);
            }
        }
    }

    /**
     * 保险
     * @param command 
     * @param isAnim 
     */
    private _doActionInsurance(command: SystemAction, isShow: boolean, isAnim: boolean = true): void {
        if (!this._tInsuranceReplay) return;

        /*
         * @breif
         * 正确的逻辑是去掉"&& isAnim", 但是处于性能优化 + 需求取巧, 这里可以加上且这个条件
         * 因为如果"isAnim"为false的情况下一定是操作了"跳转按钮", 目前不能直接跳转到保险,
         * 只要操作了跳转必定第一界面不是保险, 所以跳转时这里直接跳过保险, 减少大量"drawcall"
         * 的瞬间消耗, 更加流畅
         * 
         * @breif
         * 如果要彻底优化正真意义上的命令模式实现任意流畅回溯, 就必须实现"MVC模式", 太过复杂
         * 需要重构模型, 没必要了
         * 
         * @brief
         * 如果后期新增"直接跳转保险"的需求, 那么就必须去掉"&& isAnim"的条件检测, 不能取巧了
         * 正真影响性能的还是"drawcall", 目前场景ui元素太杂, 很难合批(list也不可能合批)
         */
        if (isShow && isAnim) {
            let replayData: InsuranceData.InsuranceReplayData = null;
            replayData = this._tInsuranceReplay.parseInsuranceReplayData(this._tPokerHandData.nGameid, command.data, this._tPokerHandData.bMirco);

            // pos
            let x: number = this.panel_insurance.width * (this._tInsuranceReplay.node.anchorX - this.panel_insurance.anchorX);
            let y: number = this.panel_insurance.height * (this._tInsuranceReplay.node.anchorY - this.panel_insurance.anchorY);
            this._tInsuranceReplay.node.setPosition(cc.v2(x, y));

            // 添加 购买者信息
            if (cv.StringTools.getArrayLength(replayData.insurancePlayerInfo) > 0) {
                let playerInfo: any = replayData.insurancePlayerInfo[0];
                let playerID: number = cv.Number(playerInfo["Playerid"]);
                let playerName: string = cv.String(playerInfo["Playername"]);
                let outsCount: number = 0;
                let holeCards: game_pb.CardItem[] = playerInfo["Holecards"];
                this._tInsuranceReplay.addPlayerCardsData(playerID, playerName, outsCount, holeCards, true);
            }

            // 添加 其他人信息
            for (let i = 0; i < cv.StringTools.getArrayLength(replayData.insuranceData.player_seats); ++i) {
                let playerInfo: any = replayData.insuranceData.player_seats[i];
                let playerID: number = cv.Number(playerInfo["playerid"]);
                let playerName: string = cv.String(playerInfo["playername"]);
                let outsCount: number = cv.Number(playerInfo["outs_count"]);
                let holeCards: game_pb.CardItem[] = playerInfo["holecards"];
                this._tInsuranceReplay.addPlayerCardsData(playerID, playerName, outsCount, holeCards, false);
            }

            // 显示"保险"视图(0.1s)
            this._tInsuranceReplay.autoShow(isAnim);

            // 播放音效
            if (isAnim && cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/insure_confirm");
            }
        }
        else {
            // 隐藏"保险"视图(0.1s)
            this._tInsuranceReplay.autoHide(isAnim);
        }
    }

    /**
     * 击中保险
     * @param command 
     * @param isAnim 
     */
    private _doActionHitOutInsurance(command: SystemAction, isAnim: boolean = true): void {
        if (!this._tInsuranceHitOutsTips) return;

        let round: number = cv.Number(command.data["Round"]);
        let insureWinBet: number = cv.Number(command.data["InsureWinBet"]);

        if (isAnim) {
            // 设置位置
            let refNode: cc.Node = this._public_cards[0].node.parent;
            let tipsNode: cc.Node = this._tInsuranceHitOutsTips.node;
            let tipsPos: cc.Vec2 = cc.Vec2.ZERO;
            tipsPos.y = refNode.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
            tipsPos.y -= (1 - refNode.anchorY) * refNode.height * refNode.parent.scale;
            tipsPos.y -= (1 - tipsNode.anchorY) * tipsNode.height * tipsNode.scaleY;
            tipsPos.y -= 10;
            tipsNode.parent.convertToNodeSpaceAR(tipsPos, tipsPos);
            tipsPos.x = tipsNode.parent.width * (0.5 - tipsNode.parent.anchorX);
            tipsNode.setPosition(tipsPos);

            // 开始动画
            let decimalPlaces: number = this._tPokerHandData.bMirco ? 2 : 0;
            insureWinBet = cv.StringTools.clientGoldByServer(insureWinBet);
            insureWinBet = cv.StringTools.toFixed(insureWinBet, decimalPlaces, cv.StringTools.RoundingMode.ROUND_HALF_UP);
            this._tInsuranceHitOutsTips.showAnim(insureWinBet);

            // 播放音效
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/insure_success");
            }
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips8"), cv.Enum.ToastType.ToastTypeInfo);
        }

        // 显示裂纹动画
        switch (round) {
            case 2: this._public_cards[3].setCrackAnim(true, 0, false, !isAnim); break;         // turn 轮
            case 3: this._public_cards[4].setCrackAnim(true, 0, false, !isAnim); break;         // river 轮
            default: break;
        }
    }

    /**
     * 摊牌(打牌到河底必须亮牌, 比如 Allin, 开启了埋牌功能赢家必须亮)
     * @param command 
     */
    private _doActionShowDown(command: SystemAction, isAnim: boolean = true): void {
        let seatsID: number[] = command.data;
        let isPlaySoundOnce: boolean = false;
        for (let i = 0; i < seatsID.length; ++i) {
            let seat: Seat = this._getSeatBySID(seatsID[i]);
            if (!seat) continue;

            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                let card: Card = seat.getCard(j);
                let show_card: Card = seat.getShowCard(j);

                card.node.active = false;
                show_card.node.active = true;

                if (show_card.hasContent()) {
                    if (show_card.isFace()) continue;
                    if (isAnim) {
                        isPlaySoundOnce = true;
                        show_card.setFace(false);
                        show_card.turn(0.2, true);
                    }
                    else {
                        show_card.setFace(true);
                    }
                }
                else {
                    show_card.setFace(false);
                }
            }
        }

        // 多人同时亮牌只播放一次音效
        if (isPlaySoundOnce && cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
        }

        // 埋牌
        for (let i = 0; i < cv.StringTools.getArrayLength(this._muckList); ++i) {
            let seat: Seat = this._getSeatBySID(this._muckList[i]);
            if (!seat) continue;

            seat.showTips(cv.config.getStringData("ActionTips10"), cv.Enum.TipsType.Tips_check);
            seat.doGray(true);
        }
    }

    /**
     * 结算
     * @param command 
     */
    private _doActionSettleMent(command: SystemAction, isAnim: boolean = true): void {
        // 清除座位状态
        for (let i = 0; i < this._seatsList.length; ++i) {
            let seat: Seat = this._seatsList[i];
            if (seat.getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
                if (seat.getData().last_action !== cv.Enum.ActionType.Enum_Action_Fold) {
                    if (seat.getTips() !== cv.config.getStringData("ActionTips10")) {
                        seat.hideTips();
                    }
                    seat.hideStatusText();
                }
            }
            seat.hideFire();
        }

        // 计算输赢
        let settlesInfo: any[] = command.data;
        for (let i = 0; i < cv.StringTools.getArrayLength(settlesInfo); ++i) {
            let seatID: number = cv.Number(settlesInfo[i]["win_seat_no"]);
            let winAmount: number = cv.Number(settlesInfo[i]["win_amount"]);
            let seat: Seat = this._getSeatBySID(seatID);
            if (!seat) continue;

            let player: PlayerInfo = seat.getData();
            let initialStake: number = player.stake;
            this._initialStakeMap.forEach((k: number, v: number): any => {
                if (k == seat.serverId) {
                    initialStake = v;
                    return "break";
                }
            })

            player.stake = initialStake + winAmount;
            if (winAmount > 0 && isAnim) {
                let color: cc.Color = cc.color(255, 255, 255);
                seat.SetName("+" + cv.StringTools.serverGoldToShowString(winAmount), color, cv.Enum.NameTextType.SetNameType_setWinNumber);
                seat.showWin();

                // 飞筹码动画
                let srcPos: cc.Vec2 = cc.Vec2.ZERO;
                this._main_pool.convertToWorldSpaceAR(srcPos, srcPos);

                let tarPos: cc.Vec2 = cc.Vec2.ZERO;
                seat.node.convertToWorldSpaceAR(tarPos, tarPos);

                for (let i = 0; i < 3; ++i) {
                    let p1: cc.Vec2 = cc.Vec2.ZERO;
                    let p2: cc.Vec2 = cc.Vec2.ZERO;
                    let chip: cc.Node = cc.instantiate(this.prefab_chip);
                    chip.setScale(seat.node.scale);
                    this.panel_anim.addChild(chip);

                    chip.parent.convertToNodeSpaceAR(srcPos, p1);
                    chip.parent.convertToNodeSpaceAR(tarPos, p2);

                    p1.x += cv.StringTools.randomRange(-20, 40);
                    p1.y += cv.StringTools.randomRange(-10, 10);

                    chip.setPosition(p1);
                    chip.active = true;
                    chip.runAction(cc.sequence(cc.delayTime(0.2 + i * 0.02)
                        , cc.moveTo(0.5, p2).easing(cc.easeOut(0.8))
                        , cc.destroySelf()));
                }

                this.panel_anim.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc((): void => {
                    seat.setStake(player.stake);
                })));
            }
            else {
                seat.setStake(player.stake);
            }
        }

        // 底池清零
        this._setMainPool(0, true);

        // 边池清零
        for (let i = 0; i < this._side_pool.length; ++i) {
            this._setSidePool(i, 0);
        }
    }

    /**
     * 强制亮牌
     * @param command 
     */
    private _doActionForceShow(command: SystemAction, isAnim: boolean = true): void {
        let isPlaySoundOnce: boolean = false;
        let showCardsSeatIDList: number[] = command.data;
        for (let i = 0; i < cv.StringTools.getArrayLength(showCardsSeatIDList); ++i) {
            let seat: Seat = this._getSeatBySID(showCardsSeatIDList[i]);
            if (seat) {
                for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                    let card: Card = seat.getCard(j);
                    let show_card: Card = seat.getShowCard(j);

                    card.node.active = false;
                    show_card.node.active = true;

                    if (show_card.hasContent()) {
                        if (show_card.isFace()) continue;

                        if (isAnim) {
                            isPlaySoundOnce = true;
                            show_card.setFace(false);
                            show_card.turn(0.2, true);
                        }
                        else {
                            show_card.setFace(true);
                        }
                    }
                    else {
                        show_card.setFace(false);
                    }
                }
            }
        }

        // 多人同时亮牌只播放一次音效
        if (isPlaySoundOnce && cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
        }
    }

    /**
     * 发发看
     * @param command 
     */
    private _doActionSendOut(command: SystemAction, isAnim: boolean = true): void {
        let sendOutLen: number = cv.Number(command.data);
        let pubCardsLen: number = this._tPokerHandData.vPublicCards.length;
        let allPubCards: HandCardType[] = this._tPokerHandData.vPublicCards.concat(this._tPokerHandData.vUnsendPublicCards);

        let delay: number = 0;
        let fadeDuring: number = 0.3;
        let turnDuring: number = 0.3;
        let fadeOpacity: number = 255 / 2;
        for (let i = pubCardsLen; i < this._public_cards.length; ++i) {
            if (i < allPubCards.length && i < sendOutLen) {
                if (this._public_cards[i].node.active) {
                    this._public_cards[i].node.opacity = fadeOpacity;
                    this._public_cards[i].stopSchedulesAndActions();
                    this._public_cards[i].setFace(true);
                }
                else {
                    this._public_cards[i].node.active = true;
                    this._public_cards[i].setFace(false);
                    this._public_cards[i].setContent(allPubCards[i].eCardNum, allPubCards[i].eCardSuit);

                    if (isAnim) {
                        this._public_cards[i].node.opacity = 0;
                        this._public_cards[i].node.runAction(cc.sequence(cc.delayTime(delay), cc.fadeTo(fadeDuring, fadeOpacity)));

                        delay += fadeDuring;
                        this._public_cards[i].turn(delay, true);
                        this._public_cards[i].node.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc((): void => {
                            if (cv.tools.isSoundEffectOpen()) {
                                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
                            }
                        })));
                        // delay += turnDuring;
                    }
                    else {
                        this._public_cards[i].setFace(true);
                    }
                }
            }
        }
    }

    /**
     * 检测强制亮牌和发发看显隐状态
     * @param command 
     * @param isAnim 
     */
    private _doActionCheckFSSOStatus(command: SystemAction, isAnim: boolean = true): void {
        let gameid: number = this._tPokerHandData.nGameid;
        this._updateForceShowState(this._tPokerHandData);
        this._updateSendOutState(this._tPokerHandData);

        if (cv.roomManager.checkGameIsZoom(gameid)) {
            this._btn_sendout.active = false;
            this._ctx_sendout.active = false;
        }
        else if (gameid === cv.Enum.GameId.Allin) {
            this._btn_sendout.active = false;
            this._ctx_sendout.active = false;

            this._btn_forceshow.active = false;
            this._ctx_forceshow.active = false;
        }

        this._layoutForceShowAndSendOut();
    }

    /**
     * 递归获取该节点树下所有子节点
     * @param node 
     * @param nodeList 
     */
    private _getChidrenNodeList(node: cc.Node, nodeList: cc.Node[]): cc.Node[] {
        if (!node || !cc.isValid(node, true)) return;

        for (let i = 0; i < node.childrenCount; ++i) {
            let t: cc.Node = node.children[i];
            nodeList.push(t);

            this._getChidrenNodeList(t, nodeList);
        }

        return nodeList;
    }

    /**
     * 点击返回
     * @param event 
     */
    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        let isAnim: boolean = true;
        this.autoHide(isAnim);

        let favorList: GameReviewFavorList = GameReviewFavorList.getInstance();
        if (favorList) favorList.autoShow(isAnim, cv.action.eMoveActionDir.EMAD_TO_RIGHT);
    }

    /**
     * 点击切换
     * @param event 
     */
    private _onClickSwitch(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        let isAnim: boolean = true;
        this.autoHide(isAnim, cv.action.eMoveActionDir.EMAD_TO_LEFT);

        let favorDetail: GameReviewFavorDetail = GameReviewFavorDetail.initSingleInst(this.prefab_favor_detail);
        favorDetail.autoShow(this._cur_page_index, isAnim);
    }

    /**
     * 点击删除
     * @param event 
     */
    private _onClickDelete(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (gameDataMgr.tCollectPokerMapData.totalCount > 0) {
            let strtips: string = cv.config.getStringData("game_review_favor_detail_delete_ensure_txt");
            cv.TP.showMsg(strtips, cv.Enum.ButtonStyle.TWO_BUTTON, (): void => {
                let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(this._cur_page_index);
                if (t) {
                    this._deleting_game_uuid = t.uuid;
                    cv.httpHandler.requestDeleteFavoriteList(cv.dataHandler.getUserData().u32Uid, [this._deleting_game_uuid]);
                }
                else {
                    console.error(`${GameReviewFavorReplay.g_class_name} - error: delete favor uuids[${this._cur_page_index}] faild`);
                }
            });
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }

    }

    /**
     * 点击最前页
     * @param event 
     */
    private _onClickFirst(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        let tarIndex: number = 0;
        if (tarIndex === this._cur_page_index) return;

        this._reqGameUUIDByIndex(tarIndex);
    }

    /**
     * 点击最后页
     * @param event 
     */
    private _onClickLast(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        let tarIndex: number = gameDataMgr.tCollectPokerMapData.totalCount - 1;
        if (tarIndex === this._cur_page_index) return;

        this._reqGameUUIDByIndex(tarIndex);
    }

    /**
     * 点击前一页
     * @param event 
     */
    private _onClickBefore(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        let tarIndex: number = this._cur_page_index - 1;
        this._reqGameUUIDByIndex(tarIndex);
    }

    /**
     * 点击后一页
     * @param event 
     */
    private _onClickNext(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        let tarIndex: number = this._cur_page_index + 1;
        this._reqGameUUIDByIndex(tarIndex);
    }

    /**
     * 点击暂停/播放
     * @param event 
     */
    private _onClickPause(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._txt_invalid_data_desc.node.active) return;

        if (gameDataMgr.tCollectPokerMapData.totalCount > 0) {
            this._isPlaying = !this._isPlaying;
            this._updatePauseBtnStatus();

            let nodeList: cc.Node[] = [];
            nodeList.push(this.node);
            nodeList = this._getChidrenNodeList(this.node, nodeList);
            if (this._isPlaying) {
                for (let i = 0; i < nodeList.length; ++i) {
                    // 恢复动作
                    let node: cc.Node = nodeList[i];
                    cc.director.getActionManager().resumeTarget(node);

                    // 恢复定时器
                    let node_any: any = node;
                    let components: cc.Component[] = node_any._components;
                    cc.director.getScheduler().resumeTargets(components);
                }
            }
            else {
                for (let i = 0; i < nodeList.length; ++i) {
                    // 暂停动作
                    let node: cc.Node = nodeList[i];
                    cc.director.getActionManager().pauseTarget(node);

                    // 暂停定时器
                    let node_any: any = node;
                    let components: cc.Component[] = node_any._components;
                    for (let j = 0; j < components.length; ++j) {
                        cc.director.getScheduler().pauseTarget(components[j]);
                    }
                }
            }
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 更新"暂停/播放"状态
     */
    private _updatePauseBtnStatus(): void {
        let fileName: string = this._isPlaying ? "game_favor_replay_btn_play" : "game_favor_replay_btn_pause";
        cv.resMgr.setSpriteFrame(this.btn_pause.node, `zh_CN/game/dzpoker/common/${fileName}`);
    }

    /**
     * 点击重播
     * @param event 
     */
    private _onClickReplay(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._txt_invalid_data_desc.node.active) return;

        if (gameDataMgr.tCollectPokerMapData.totalCount > 0) {
            this._resetReplayView(false);
            this._analysisAllActions();
            this._runAllActions();
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 点击加速
     * @param event 
     */
    private _onClickSpeed(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._txt_invalid_data_desc.node.active) return;

        if (gameDataMgr.tCollectPokerMapData.totalCount > 0) {
            let speedGear: SpeedGear = this._speedGear;
            if (++speedGear >= SpeedGear.ESG_MAX) {
                speedGear = SpeedGear.ESG_GEAR_1;
            }
            this._setReplaySpeed(speedGear);
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
            if (this._speedGear !== SpeedGear.ESG_GEAR_1) {
                this._speedGear = SpeedGear.ESG_GEAR_1;
                this._setReplaySpeed(this._speedGear);
            }
        }
    }

    /**
     * 设置速率
     * @param speedGear 
     */
    private _setReplaySpeed(speedGear: SpeedGear): void {
        this._speedGear = speedGear;

        let timeScale: number = 0;
        switch (this._speedGear) {
            case SpeedGear.ESG_GEAR_1_5: {
                timeScale = 1.5;
                this.txt_speed.string = "X1.5";
            } break;

            case SpeedGear.ESG_GEAR_2: {
                timeScale = 2.0;
                this.txt_speed.string = "X2.0";
            } break;

            case SpeedGear.ESG_NONE:
            case SpeedGear.ESG_GEAR_1:
            default: {
                timeScale = 1.0;
                this.txt_speed.string = "X1.0";
            } break;
        }

        if (timeScale <= 0) timeScale = 1;

        // 对于加速处理有以下3个方法:
        // 1. 基于动作系统的"cc.Speed"(使用繁琐, 且只针对"cc.Action")
        // 2. cc.director.getScheduler.setTimeScale(非物理层加速, 只影响全局的"Scheduler"系统)
        // 3. 全局控制速率(影响所有的"update", 真正意义的全局), 需要修改"cc.Director"导演类内部"calculateDeltaTime"接口的内部变量

        // 目前回放系统只需要用到上述第2条速率方案
        // 非物理层加速
        cc.director.getScheduler().setTimeScale(timeScale);

        // 全局加速写法保留(如果用到全局加速, 则1,2方案要停止, 互斥的)
        // 修改引擎"dt"计算, 给"mainLoop"的"_deltaTime"加上速率控制因子
        // let cc_director_inst: any = cc.director;
        // let cc_director_class: any = cc.Director;
        // let _originCalculateDeltaTime: any = cc_director_class.prototype.calculateDeltaTime;
        // cc_director_inst.calculateDeltaTime = function (now) {
        //     _originCalculateDeltaTime.call(this, now);
        //     this._deltaTime *= timeScale;
        // }
    }

    /**
     * 点击复制"牌局编号"
     * @param event 
     */
    private _onClickSerialNumber(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(this._cur_page_index);
        if (t) {
            cv.TT.showMsg(cv.config.getStringData("allReview_allReview_panel_serial_number_copy_text"), cv.Enum.ToastType.ToastTypeInfo);
            let game_uuid: string = cv.String(t.uuid);
            cv.native.setClipBoardString(game_uuid);
        }
    }

    /**
     * 点击强制亮牌
     * @param event 
     */
    private _onClickForceShow(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(this._cur_page_index);
        if (t) {
            let value: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(t.uuid);
            if (value) {
                let gameid: number = cv.Number(value.gameid);
                let uid: number = cv.dataHandler.getUserData().u32Uid;
                cv.httpHandler.requestFavoritForceShowCard(uid, gameid, t.uuid);
            }
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 请求"强制亮牌" 回调
     * @param params 
     */
    private _onMsgUpdateFavorForceShow(params: any): void {
        let showCardSIDList: number[] = [];
        let selfid: number = cv.Number(params.uid);
        let game_uuid: string = cv.String(params.game_uuid);

        if (selfid !== cv.dataHandler.getUserData().u32Uid) {
            console.error(`${GameReviewFavorReplay.g_class_name} - error: response forceshow data faild`);
            return;
        }

        // 刷新"手牌"缓存
        let freshCardsCache: (uid: number, cards: game_pb.CardItem[], replayData: any, records: game_pb.HandRecord[]) => void
            = (uid: number, cards: game_pb.ICardItem[], replayData: any, records: game_pb.HandRecord[]): void => {

                let record: game_pb.HandRecord = null;
                for (let i = 0; i < cv.StringTools.getArrayLength(records); ++i) {
                    if (records[i].playerid === uid) {
                        record = records[i];
                        break;
                    }
                }

                let seatInfo: any = null;
                for (let i = 0; i < cv.StringTools.getArrayLength(replayData.SeatsInfo.seats_info); ++i) {
                    if (replayData.SeatsInfo.seats_info[i].UID === uid) {
                        seatInfo = replayData.SeatsInfo.seats_info[i];
                        break;
                    }
                }

                // 填充牌值
                if (record && seatInfo) {
                    for (let i = 0; i < cv.StringTools.getArrayLength(cards); ++i) {
                        let number: number = cv.Number(cards[i].number);
                        let suit: number = cv.Number(cards[i].suit);

                        // "record.cards"中是否已存在相同的牌
                        let isExist1: boolean = false;
                        for (let j = 0; j < cv.StringTools.getArrayLength(record.cards); ++j) {
                            if (cv.Number(record.cards[j].number) === number && cv.Number(record.cards[j].suit) === suit) {
                                isExist1 = true;
                                break;
                            }
                        }
                        if (!isExist1) {
                            if (record.cards === null || typeof record.cards === "undefined") {
                                record.cards = [];
                            }
                            let t: game_pb.CardItem = game_pb.CardItem.create();
                            t.number = number;
                            t.suit = suit;
                            record.cards.push(t);
                        }

                        // "seatInfo.holecards"中是否已存在相同的牌
                        let isExist2: boolean = false;
                        for (let j = 0; j < cv.StringTools.getArrayLength(seatInfo.holecards); ++j) {
                            if (cv.Number(seatInfo.holecards[j].number) === number && cv.Number(seatInfo.holecards[j].suit) === suit) {
                                isExist2 = true;
                                break;
                            }
                        }
                        if (!isExist1) {
                            if (seatInfo.holecards === null || typeof seatInfo.holecards === "undefined") {
                                seatInfo.holecards = [];
                            }
                            seatInfo.holecards.push({ "number": number, "suit": suit });
                        }
                    }
                }
            }

        // 刷新"旁观者列表"缓存
        let freshStanderUIDCache: (uid: number, standerUIDs: number[]) => number[] = (uid: number, standerUIDs: number[]): number[] => {
            if (standerUIDs === null || typeof standerUIDs === "undefined") {
                standerUIDs = [];
            }

            let isExist: boolean = false;
            for (let i = 0; i < standerUIDs.length; ++i) {
                if (uid === standerUIDs[i]) {
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                standerUIDs.push(uid);
            }

            return standerUIDs;
        }

        // 更新战绩缓存
        do {
            let gameHandMapData: any = gameDataMgr.tGameRecords.mHandMapCache.get(game_uuid);
            if (gameHandMapData) {
                // 更新手牌
                for (let i = 0; i < cv.StringTools.getArrayLength(params.ShowSeats); ++i) {
                    let uid: number = cv.Number(params.ShowSeats[i].uid);
                    let cards: game_pb.CardItem[] = params.ShowSeats[i].cards;
                    freshCardsCache(uid, cards, gameHandMapData.replay, gameHandMapData.game_record.records);
                }

                // 更新亮牌权限
                let isSelfOnTheSeat: boolean = false;
                for (let i = 0; i < cv.StringTools.getArrayLength(gameHandMapData.game_record.records); ++i) {
                    if (selfid === gameHandMapData.game_record.records[i].playerid) {
                        isSelfOnTheSeat = true;
                        gameHandMapData.game_record.records[i].is_force_show = true;
                        break;
                    }
                }

                // 若自己不在座位上, 那么使用了强制亮牌就说明自己是旁观者, 刷新缓存
                if (!isSelfOnTheSeat) {
                    gameHandMapData.show_card_bystander_uid = freshStanderUIDCache(selfid, gameHandMapData.show_card_bystander_uid);
                }
            }
        } while (false);

        // 更新收藏缓存
        do {
            let collecthandMapData: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(game_uuid);
            if (collecthandMapData) {
                // 更新手牌
                for (let i = 0; i < cv.StringTools.getArrayLength(params.ShowSeats); ++i) {
                    let uid: number = cv.Number(params.ShowSeats[i].uid);
                    let cards: game_pb.CardItem[] = params.ShowSeats[i].cards;
                    freshCardsCache(uid, cards, collecthandMapData.replay, collecthandMapData.game_record.records);
                }

                // 更新亮牌权限
                let isSelfOnTheSeat: boolean = false;
                for (let i = 0; i < cv.StringTools.getArrayLength(collecthandMapData.game_record.records); ++i) {
                    if (selfid === collecthandMapData.game_record.records[i].playerid) {
                        isSelfOnTheSeat = true;
                        collecthandMapData.game_record.records[i].is_force_show = true;
                        break;
                    }
                }

                // 若自己不在座位上, 那么使用了强制亮牌就说明自己是旁观者, 刷新缓存
                if (!isSelfOnTheSeat) {
                    collecthandMapData.show_card_bystander_uid = freshStanderUIDCache(selfid, collecthandMapData.show_card_bystander_uid);
                }
            }
        } while (false);

        // 更新当下牌谱缓存(下发的全是其他人的手牌)
        do {
            // 更新手牌
            for (let i = 0; i < cv.StringTools.getArrayLength(params.ShowSeats); ++i) {
                let uid: number = cv.Number(params.ShowSeats[i].uid);
                let cards: game_pb.CardItem[] = params.ShowSeats[i].cards;

                let record: PlayerRecord = null;
                for (let j = 0; j < this._tPokerHandData.vPlayerRecords.length; ++j) {
                    if (this._tPokerHandData.vPlayerRecords[j].nPlayerID === uid) {
                        record = this._tPokerHandData.vPlayerRecords[j];
                        break;
                    }
                }

                // 填充牌值
                if (record) {
                    for (let j = 0; j < cv.StringTools.getArrayLength(cards); ++j) {
                        let number: number = cv.Number(cards[j].number);
                        let suit: number = cv.Number(cards[j].suit);

                        // 手牌中是否已存在相同的牌
                        let isExist: boolean = false;
                        for (let k = 0; k < record.vCards.length; ++k) {
                            if (cv.Number(record.vCards[k].eCardNum) === number && cv.Number(record.vCards[k].eCardSuit) === suit) {
                                isExist = true;
                                break;
                            }
                        }

                        // 若不存在则插入
                        if (!isExist) {
                            let t: HandCardType = new HandCardType();
                            t.eCardNum = number;
                            t.eCardSuit = suit;
                            record.vCards.push(t);
                        }
                    }
                }
            }

            // 更新亮牌权限
            let isSelfOnTheSeat: boolean = false;
            for (let i = 0; i < this._tPokerHandData.vPlayerRecords.length; ++i) {
                if (selfid === this._tPokerHandData.vPlayerRecords[i].nPlayerID) {
                    isSelfOnTheSeat = true;
                    this._tPokerHandData.vPlayerRecords[i].bForceShowDown = true;
                    break;
                }
            }

            // 若自己不在座位上, 那么使用了强制亮牌就说明自己是旁观者, 刷新缓存
            if (!isSelfOnTheSeat) {
                this._tPokerHandData.vShowCardByStanderUID = freshStanderUIDCache(selfid, this._tPokerHandData.vShowCardByStanderUID);
            }
        } while (false);

        // 填充牌桌牌值
        do {
            for (let i = 0; i < cv.StringTools.getArrayLength(params.ShowSeats); ++i) {
                let uid: number = cv.Number(params.ShowSeats[i].uid);
                let cards: game_pb.CardItem[] = params.ShowSeats[i].cards;

                let seat: Seat = this._getSeatByUID(uid);
                if (seat) {
                    showCardSIDList.push(seat.serverId);

                    for (let j = 0; j < cv.StringTools.getArrayLength(cards); ++j) {
                        let number: number = cv.Number(cards[j].number);
                        let suit: number = cv.Number(cards[j].suit);

                        // 手牌中是否已存在相同的牌
                        let isExist: boolean = false;
                        for (let k = 0; k < seat.getHandsCardsCount(); ++k) {
                            let showcard: Card = seat.getShowCard(k);
                            if (cv.Number(showcard.eCardNum) === number && cv.Number(showcard.eCardSuit) === suit) {
                                isExist = true;
                                break;
                            }
                        }

                        // 若不存在则赋值
                        if (!isExist) {
                            for (let k = 0; k < seat.getHandsCardsCount(); ++k) {
                                let showcard: Card = seat.getShowCard(k);
                                if (!showcard.hasContent()) {
                                    showcard.setContent(number, suit);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        } while (false);

        // 显示动画
        if (showCardSIDList.length > 0) {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_FORCESHOW;
            t.data = showCardSIDList;
            this._doActionForceShow(t, true);
        }

        // 更新"亮牌"按钮状态
        this._btn_forceshow.active = false;
        this._ctx_forceshow.active = false;
        this._layoutForceShowAndSendOut();
        cv.TT.showMsg(cv.config.getStringData("ForceShowCardToast"), cv.Enum.ToastType.ToastTypeWarning);
    }

    /**
     * 点击发发看
     * @param event 
     */
    private _onClickSendOut(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(this._cur_page_index);
        if (t) {
            let value: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(t.uuid);
            if (value) {
                let gameid: number = cv.Number(value.gameid);
                let uid: number = cv.dataHandler.getUserData().u32Uid;
                cv.httpHandler.requestFavoritSendOutCard(uid, gameid, t.uuid);
            }
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 请求"发发看" 回调
     * @param params 
     */
    private _onMsgUpdateFavorSendOut(params: any): void {
        let selfid: number = cv.Number(params.uid);
        let game_uuid: string = cv.String(params.game_uuid);
        let nextCoin: number = cv.Number(params.next_show_left_coin);
        let sendOutLen: number = cv.Number(params.send_card_len);

        if (selfid !== cv.dataHandler.getUserData().u32Uid) {
            console.error(`${GameReviewFavorReplay.g_class_name} - error: response sendout data faild`);
            return;
        }

        // 更新战绩缓存
        do {
            let gameHandMapData: any = gameDataMgr.tGameRecords.mHandMapCache.get(game_uuid);
            if (gameHandMapData) {
                let records: game_pb.HandRecord[] = gameHandMapData.game_record.records;
                for (let i = 0; i < cv.StringTools.getArrayLength(records); ++i) {
                    if (selfid === records[i].playerid) {
                        records[i].send_card_len = sendOutLen;
                        break;
                    }
                }

                gameHandMapData.next_show_left_coin = nextCoin;
                if (gameDataMgr.tGameRecords.tPokerHandData && gameDataMgr.tGameRecords.tPokerHandData.sGameUUID === game_uuid) {
                    gameDataMgr.tGameRecords.tPokerHandData.nSendOutCoin = nextCoin;
                }
            }
        } while (false);

        // 更新收藏缓存
        do {
            let collecthandMapData: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(game_uuid);
            if (collecthandMapData) {
                let records: game_pb.HandRecord[] = collecthandMapData.game_record.records;
                for (let i = 0; i < cv.StringTools.getArrayLength(records); ++i) {
                    if (selfid === records[i].playerid) {
                        records[i].send_card_len = sendOutLen;
                        break;
                    }
                }
            }

            collecthandMapData.next_show_left_coin = nextCoin;
            if (gameDataMgr.tCollectPokerMapData.tPokerHandData && gameDataMgr.tCollectPokerMapData.tPokerHandData.sGameUUID === game_uuid) {
                gameDataMgr.tCollectPokerMapData.tPokerHandData.nSendOutCoin = nextCoin;
            }
        } while (false);

        // 更新当下牌谱缓存
        do {
            for (let i = 0; i < this._tPokerHandData.vPlayerRecords.length; ++i) {
                if (selfid === this._tPokerHandData.vPlayerRecords[i].nPlayerID) {
                    this._tPokerHandData.nSendOutCoin = nextCoin;
                    this._tPokerHandData.vPlayerRecords[i].nReviewSendOutLen = sendOutLen;
                    break;
                }
            }
        } while (false);

        // 显示动画
        let pubcardsLen: number = this._tPokerHandData.vPublicCards.length;
        if (sendOutLen > pubcardsLen) {
            let t: SystemAction = new SystemAction();
            t.srcType = ActionSrcType.ACTION_SYSTEM;
            t.action = SystemActionType.SYSTEM_ACTION_SENDOUT;
            t.data = sendOutLen;
            this._doActionSendOut(t, true);
        }

        // 更新"发发看"安钮状态
        this._updateSendOutState(this._tPokerHandData);
        cv.TT.showMsg(cv.config.getStringData("GameReplaySendOutToast"), cv.Enum.ToastType.ToastTypeWarning);
    }

    /**
     * 更新 强制亮牌 按钮 显隐状态
     * @param data 
     */
    private _updateForceShowState(data: PokerHandData): void {
        if (!data) return;
        let ret: boolean = false;
        let price: number = data.nForceShowCoin;

        // 有牌谱数据 && 当前手不是牌桌正在结算的那一手 && 该手牌局是否开启"强制亮牌"功能
        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(this._cur_page_index);
        if (t && data.bForceShowcard) {
            let totalHand: number = gameDataMgr.tCollectPokerMapData.totalCount;
            let curHand: number = this._cur_page_index + 1;
            let recentHandCount: number = 3;                                                            // 最近3手
            let roundRet: boolean = curHand > totalHand - recentHandCount && curHand <= totalHand;      // 最近有效局
            let playRet: boolean = false;                                                               // 自己是参与者
            let needToShowRet: boolean = false;                                                         // 需要亮牌
            let handCardsMaxLen: number = data.nGameid === cv.Enum.GameId.Plo ? 4 : 2;                  // 手牌上限数量

            if (roundRet) {
                for (let i = 0; i < data.vPlayerRecords.length; ++i) {
                    // 自己是参与者
                    if (data.vPlayerRecords[i].nPlayerID == cv.dataHandler.getUserData().u32Uid) {
                        playRet = true;
                    }
                    // 只要存在一个玩家不全亮牌都可以进行强制亮牌
                    else if (data.vPlayerRecords[i].vCards.length < handCardsMaxLen) {
                        needToShowRet = true;
                    }
                    if (playRet && needToShowRet) break;
                }

                // 自己不是参与者, 但当前牌局是"明星桌", 则也开启亮牌安钮
                if (!playRet && !data.bStarClosed) {
                    playRet = true;
                }
            }

            ret = playRet && needToShowRet;
        }

        // 设置按钮显隐状态
        ret = ret && price > 0;
        this._btn_forceshow.active = ret;
        this._ctx_forceshow.active = ret;

        // 更新按钮金额
        if (ret) {
            // 价格
            let panel: cc.Node = this._ctx_forceshow;
            let txt_coin: cc.Label = panel.getChildByName("txt_coin").getComponent(cc.Label);
            let isLayout: boolean = price !== cv.Number(txt_coin.string);
            txt_coin.string = cv.StringTools.serverGoldToShowString(price);

            // 排版
            if (isLayout) {
                let txt_size: cc.Size = cv.resMgr.getLabelStringSize(txt_coin);
                let img_coin: cc.Sprite = panel.getChildByName("img_coin").getComponent(cc.Sprite);
                let start_x: number = panel.width * panel.scaleX * -panel.anchorX;
                let pos_x: number = start_x;
                let offset_x_sides: number = 0;
                let offset_x_middle: number = 15;

                let left_w: number = panel.width - img_coin.node.width * img_coin.node.scaleX - txt_size.width * txt_coin.node.scaleX;
                offset_x_middle = Math.min(offset_x_middle, left_w / 3);
                offset_x_sides = (left_w - offset_x_middle) / 2;

                pos_x += offset_x_sides + img_coin.node.width * img_coin.node.scaleX * img_coin.node.anchorX;
                img_coin.node.setPosition(pos_x, img_coin.node.y);
                pos_x += img_coin.node.width * img_coin.node.scaleX * (1 - img_coin.node.anchorX);

                pos_x += offset_x_middle + txt_size.width * txt_coin.node.anchorX;
                txt_coin.node.setPosition(pos_x, txt_coin.node.y);
            }
        }
    }

    /**
     * 更新 发发看 按钮 显影状态
     * @param data 
     */
    private _updateSendOutState(data: PokerHandData): void {
        if (!data) return;
        let ret: boolean = false;
        let price: number = data.nSendOutCoin;

        let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(this._cur_page_index);
        if (t) {
            // 兼容牌局中历史回顾老数据
            // 直接读取 data 服原始 json 字段去判断是否为老版本数据
            // unsend_public_cards 为空2种情况(老数据;未发牌为0;都满足不显示的条件)
            let bOldData: boolean = false;
            let gameHandMapData: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(gameDataMgr.tGameRecords.tPokerHandData.sGameUUID);
            if (gameHandMapData) {
                let unsend_public_cards: any = gameHandMapData.game_record.unsend_public_cards;
                if (unsend_public_cards === null || typeof unsend_public_cards === "undefined") {
                    bOldData = true;
                }
            }

            if (!bOldData) {
                let totalHand: number = gameDataMgr.tCollectPokerMapData.totalCount;
                let curHand: number = this._cur_page_index + 1;
                let recentHandCount: number = 3;                                                            // 最近3手
                let roundRet: boolean = curHand > totalHand - recentHandCount && curHand <= totalHand;      // 最近有效局

                if (roundRet) {
                    for (let i = 0; i < data.vPlayerRecords.length; ++i) {
                        if (data.vPlayerRecords[i].nPlayerID === cv.dataHandler.getUserData().u32Uid) {     // 自己是参与者
                            ret = data.vPlayerRecords[i].nReviewSendOutLen < 5;                             // 发发看长度 < 5
                            ret = ret && data.vPlayerRecords[i].nLastRoundType > 0;                         // 玩家坚持到哪一阶段(确保不是老数据)
                            break;
                        }
                    }
                }
            }
        }

        // 设置按钮显隐状态
        ret = ret && price > 0;
        this._btn_sendout.active = ret;
        this._ctx_sendout.active = ret;

        // 更新按钮金额
        if (ret) {
            // 价格
            let panel: cc.Node = this._ctx_sendout;
            let txt_coin: cc.Label = panel.getChildByName("txt_coin").getComponent(cc.Label);
            let isLayout: boolean = price !== cv.Number(txt_coin.string);
            txt_coin.string = cv.StringTools.serverGoldToShowString(price);

            // 排版
            if (isLayout) {
                let txt_size: cc.Size = cv.resMgr.getLabelStringSize(txt_coin);
                let img_coin: cc.Sprite = panel.getChildByName("img_coin").getComponent(cc.Sprite);
                let start_x: number = panel.width * panel.scaleX * -panel.anchorX;
                let pos_x: number = start_x;
                let offset_x_sides: number = 0;
                let offset_x_middle: number = 15;

                let left_w: number = panel.width - img_coin.node.width * img_coin.node.scaleX - txt_size.width * txt_coin.node.scaleX;
                offset_x_middle = Math.min(offset_x_middle, left_w / 3);
                offset_x_sides = (left_w - offset_x_middle) / 2;

                pos_x += offset_x_sides + img_coin.node.width * img_coin.node.scaleX * img_coin.node.anchorX;
                img_coin.node.setPosition(pos_x, img_coin.node.y);
                pos_x += img_coin.node.width * img_coin.node.scaleX * (1 - img_coin.node.anchorX);

                pos_x += offset_x_middle + txt_size.width * txt_coin.node.anchorX;
                txt_coin.node.setPosition(pos_x, txt_coin.node.y);
            }
        }
    }

    /**
     * 布局"强制亮牌"和"发发看"等按钮位置
     */
    private _layoutForceShowAndSendOut(): void {
        let panel: cc.Node = this._btn_forceshow.parent;

        // 从左往右排版
        let offset_x_sides: number = 40;
        let offset_x_nextto: number = 20;

        let start_x: number = panel.x + panel.width * panel.scaleX * -panel.anchorX;
        let pos_x: number = start_x + offset_x_sides;

        // 强制亮牌
        if (this._btn_forceshow.active) {
            pos_x += this._btn_forceshow.width * this._btn_forceshow.anchorX * this._btn_forceshow.scaleX;
            this._btn_forceshow.setPosition(pos_x, this._btn_forceshow.y);
            this._ctx_forceshow.setPosition(pos_x, this._ctx_forceshow.y);

            pos_x += this._btn_forceshow.width * (1 - this._btn_forceshow.anchorX) * this._btn_forceshow.scaleX;
            pos_x += offset_x_nextto;
        }

        // 发发看
        if (this._btn_sendout.active) {
            pos_x += this._btn_sendout.width * this._btn_sendout.anchorX * this._btn_sendout.scaleX;
            this._btn_sendout.setPosition(pos_x, this._btn_sendout.y);
            this._ctx_sendout.setPosition(pos_x, this._ctx_sendout.y);

            pos_x += this._btn_sendout.width * (1 - this._btn_sendout.anchorX) * this._btn_sendout.scaleX;
            pos_x += offset_x_nextto;
        }
    }
}
