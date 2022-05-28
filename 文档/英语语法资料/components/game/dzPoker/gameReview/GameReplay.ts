import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";
import { Card } from "../../../../components/game/dzPoker/Card";
import { HashMap } from "../../../../common/tools/HashMap";
import { Seat } from "../../../../components/game/dzPoker/Seat";
import { CardNum, CardSuit, ActionType, GameReviewDataType } from "../../../../common/tools/Enum";
import { PlayerInfo } from "../../../../components/game/dzPoker/data/RoomData";
import { PokerHandData, HandCardType } from "../../../../components/game/dzPoker/data/RecordData";

import { InsuranceData } from "../insurance/InsuranceData";
import { InsuranceEntrance } from "../insurance/InsuranceEntrance";
import { InsuranceHitOutsTips } from "../insurance/InsuranceHitOutsTips";

/**
 * 播放速度档位
 */
enum eSpeedGear {
    ESG_NONE = 0,       // 无
    ESG_GEAR_1,         // 1倍
    ESG_GEAR_1_5,       // 1.5倍
    ESG_GEAR_2,         // 2倍
    ESG_MAX             // 最大
}

/**
 * 系统动作类别
 */
enum SystemActionType {
    SYSTEM_ACTION_ENDPREFLOP = 0,
    SYSTEM_ACTION_DEALFLOP,
    SYSTEM_ACTION_ENDFLOP,
    SYSTEM_ACTION_DEALINSURANCE,
    SYSTEM_ACTION_ENDINSURANCE,
    SYSTEM_ACTION_DEALTURN,
    SYSTEM_ACTION_ENDTURN,
    SYSTEM_ACTION_DEALRIVER,
    SYSTEM_ACTION_ENDRIVER,
    SYSTEM_ACTION_SHOWDOWN,
    SYSTEM_ACTION_SETTLEMENT,
    SYSTEM_ACTION_FORCESHOW,
    SYSTEM_ACTION_SENDOUT
}

/**
 * 动作源类型
 */
enum ActionSrcType {
    ACTION_NULL = 0,
    ACTION_PLAYER,
    ACTION_SYSTEM
}

class CommonAction {
    eSrcType: ActionSrcType = ActionSrcType.ACTION_NULL;
}

class PlayerAction extends CommonAction {
    nSeatID: number = 0;
    nAmount: number = 0;
    eAction: ActionType = ActionType.Enum_Action_Null;
    eSeq: number = 0;
}

class SystemAction extends CommonAction {
    eAction: SystemActionType = SystemActionType.SYSTEM_ACTION_ENDPREFLOP;
    data: any = "";
}

/**
 * 牌局回顾
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReplay extends cc.Component {

    @property(cc.Prefab) prefab_seat: cc.Prefab = null;                             // 座位预制键
    @property(cc.Prefab) prefab_insuranceEntrance: cc.Prefab = null;                // 保险入口预制键
    @property(cc.Prefab) prefab_hitOutsTipsAnim: cc.Prefab = null;                  // 击中保险提示动画预制键

    @property(cc.Node) panel_main: cc.Node = null;                                  // 主面板
    @property(cc.Node) panel_seat: cc.Node = null;                                  // 座位面板
    @property(cc.Node) panel_insurance: cc.Node = null;                             // 保险面板

    @property(cc.Label) txt_game_mode: cc.Label = null;                             // 牌局模式
    @property(cc.Label) txt_game_uuid: cc.Label = null;                             // 牌局uuid
    @property(cc.Label) txt_pot: cc.Label = null;                                   // 底池

    @property(cc.Button) btn_play: cc.Button = null;                                // 播放/暂停
    @property(cc.Button) btn_replay: cc.Button = null;                              // 重播
    @property(cc.Button) btn_speed: cc.Button = null;                               // 速度
    @property(cc.Button) btn_last_page: cc.Button = null;                           // 上一页
    @property(cc.Button) btn_next_page: cc.Button = null;                           // 下一页
    @property(cc.Button) btn_last_step: cc.Button = null;                           // 上一步
    @property(cc.Button) btn_next_step: cc.Button = null;                           // 下一步

    @property(Card) pub_card_list: Card[] = [];                                     // 公共牌堆
    @property(cc.Node) panel_shield: cc.Node = null;                                // 座位面板事件屏蔽层
    @property(cc.Node) side_pool_list: cc.Node[] = [];                              // 边池列表
    @property(cc.Node) main_pool: cc.Node = null;                                   // 底池节点
    @property(cc.Node) node_insurance: cc.Node = null;                              // 保险节点

    @property(cc.Sprite) img_d: cc.Sprite = null;
    @property(cc.Slider) slider: cc.Slider = null;
    @property(cc.Sprite) spCriticsimTips: cc.Sprite = null;                         // 暴击牌局提示

    // 私有成员
    private _sGameUUID: string = "";                                                // 牌局uuid
    private _eDataSourceType: GameReviewDataType = GameReviewDataType.EDST_NONE;    // 数据源类型
    private _tPokerHandData: PokerHandData = null;                                  // 牌谱信息
    private _objReplayGame: Object = null;                                          // 游戏回放数据
    private _objReplayInsurance: Object = null;                                     // 保险回放数据
    private _lastInsuranceReplayData: InsuranceData.InsuranceReplayData = null;     // 当前轮解析后的保险回放数据
    private _bMirco: boolean = false;                                               // 是否是微牌局
    private _tInsuranceReplay: InsuranceEntrance = null;                            // 保险回放对象
    private _tInsuranceHitOutsTips: InsuranceHitOutsTips = null;                    // 保险击中outs提示
    private _nTurnActIdx: number = 0;                                               // turn 轮动作索引
    private _nRiverActIdx: number = 0;                                              // river 轮动作索引
    private _bShowCrackAnimTurn: boolean = false;                                   // 是否显示 turn 轮 击中保险裂纹动画
    private _bShowCrackAnimRiver: boolean = false;                                  // 是否显示 river 轮 击中保险裂纹动画
    private _mapShowInsuranceFrameFlag: HashMap<number, number> = new HashMap();    // 保险播放帧索引缓存(帧索引, turn 还是 river)
    private _vActionsList: CommonAction[] = [];                                     // 动作列表
    private _vPlayedActionsList: CommonAction[] = [];                               // 已播放的动作列表
    private _nCurrentActionSeq: number = -1;                                        // 当前动作序列索引
    private _vInitialStakeList: HashMap<number, number> = new HashMap();            //
    private _vSeatsList: Seat[] = [];                                               // 座位数组
    private _seatsPosMap: HashMap<number, cc.Vec2[]> = new HashMap();               // 座位坐标容器(几人, 每人对应坐标)
    private _vsidePosList: cc.Vec2[] = [];                                          // 边池坐标数组
    private _vPostSeatList: number[] = [];                                          // 长牌的话指的是下了大盲的座位;短牌的话指下了前注的座位
    private _vShowDownList: number[] = [];                                          //
    private _vMuckList: number[] = [];                                              //
    private _bPlayOrPause: boolean = true;                                          // 播放或暂停状态(默认播放)
    private _nSpeedDelayTime: number = 1.0;                                         // 播放速度标准
    private _nSpeed: number = 0;                                                    // 播放速率
    private _nSpeedGear: eSpeedGear = eSpeedGear.ESG_NONE;                          // 播放档位

    private _nAnte: number = 0;                                                     // 前注
    private _nBlind: number = 0;                                                    // 盲注
    private _nSB: number = 0;                                                       // 小盲
    private _nBB: number = 0;                                                       // 大盲
    private _nStraddle: number = 0;                                                 // 第三盲注(发牌之前作出的一个价值两个大盲注的加注)
    private _bDoubleAnte: boolean = false;                                          // 是否开启双倍前注
    private _nMode: number = 0;                                                     // 游戏模式
    private _nDealerSeat: number = 0;                                               //
    private _nBBSeat: number = 0;
    private _nSBSeat: number = 0;
    private _nStraddleSeat: number = -1;
    private _isNowCritTime: boolean = false;

    //由于这里是记录从第一个动作一直到当前动作，seatMap也是记录从第一个动作一直刷新值到最后一个动作，最后一个动作不是allin就把allin的动画隐藏
    private _seatMap: HashMap<number, number> = new HashMap();

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget) {
            widget.destroy();
        }

        this.txt_pot.node.active = false;
        this.spCriticsimTips.node.active = false;

        // 初始化点击事件
        this.btn_play.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.playAndPause();
        }, this);
        this.btn_replay.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.loadAll(this._sGameUUID);
        }, this);
        this.btn_speed.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.changeSpeed();
        }, this);
        this.btn_last_page.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.lastHand();
        }, this);
        this.btn_next_page.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.nextHand();
        }, this);
        this.btn_last_step.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.lastAction();
        }, this);
        this.btn_next_step.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.nextAction();
        }, this);

        this.panel_shield.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { event.stopPropagation(); });
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { event.stopPropagation(); this.autoHide(); }, this);

        // 添加消息
        cv.MessageCenter.register("update_replay_data", this._onMsgUpdateReplayData.bind(this), this.node);

        // 初始化座位
        this._initSeats();
    }

    protected start(): void {
        this._adaptMainPanel();
        this._setSlider(0);
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("update_replay_data", this.node);
    }

    /**
     * 显示视图(内部已自动处理数据)
     * @param dataSourceType    数据源类型
     */
    autoShow(dataSourceType: GameReviewDataType, game_uuid: string, bAnim: boolean = true): void {
        this._eDataSourceType = dataSourceType;
        this.node.active = true;
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        this.node.setPosition(cc.Vec2.ZERO);
        this.resetUI();

        if (bAnim) {
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_LEFT
                , cv.action.eMoveActionType.EMAT_FADE_IN
                , cv.action.delay_type.NORMAL
                , (target: cc.Node, actIO: number): void => { }
                , (target: cc.Node, actIO: number): void => { cv.MessageCenter.send("update_hand"); }
                , 0.1);
        }
        else {
            cv.MessageCenter.send("update_hand");
        }
    }

    /**
     * 隐藏
     */
    autoHide(bAnim: boolean = true): void {
        this.node.active = true;
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        this.node.setPosition(cc.Vec2.ZERO);

        if (bAnim) {
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_RIGHT
                , cv.action.eMoveActionType.EMAT_FADE_OUT
                , cv.action.delay_type.NORMAL
                , (target: cc.Node, actIO: number): void => { }
                , (target: cc.Node, actIO: number): void => { this._resetTable(); });
        }
        else {
            this._resetTable();
            this.node.active = false;
        }
    }

    /**
     * 是否显示
     */
    isShow(): boolean {
        return this.node.active;
    }

    /**
     * 设置按钮禁用与否
     * @param btn
     * @param enabled
     */
    setBtnTouchEnable(btn: cc.Button, enabled: boolean): void {
        let color: cc.Color = enabled ? cc.Color.WHITE : cc.color(0x7F, 0x7F, 0x7F, 0xFF);

        btn.node.color = color;
        btn.interactable = enabled;

        if (btn === this.btn_speed) {
            let txt_node: cc.Node = this.btn_speed.node.getChildByName("txt");
            if (txt_node) txt_node.color = color;
        }
    }

    // 适配主面板大小
    private _adaptMainPanel(): void {
        let scale_x: number = cv.Number(cv.StringTools.div(cc.winSize.width, this.panel_main.width).toFixed(2));
        let scale_y: number = cv.Number(cv.StringTools.div(cc.winSize.height, this.panel_main.height).toFixed(2));
        let scale: number = Math.min(scale_x, scale_y);
        if (this.panel_main.height * this.panel_main.scaleY * scale >= (cc.winSize.height - 200)) { scale *= 0.7; }
        this.panel_main.setScale(scale);
    }

    /**
     * 初始化座位(底部开始顺时针)
     */
    private _initSeats(): void {
        this._seatsPosMap.clear();

        // 极限"12"座
        let tmp_scale: number = 0.7;
        let tmp_position: cc.Vec2[] = [];
        let tmp_totalcount: number = 12;
        for (let i = 0; i < tmp_totalcount; ++i) {
            let img_tmp: cc.Node = this.panel_seat.getChildByName(`img_tmp_${i}`);
            if (img_tmp) {
                tmp_position.push(cc.v2(img_tmp.position));
                img_tmp.removeFromParent();
                img_tmp.destroy();
            }
        }

        // 以索引"0"开始(即垂直居下), 顺时针排序
        // 2人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[6]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 3人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 4人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[6]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 5人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[3]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[9]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 6人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[4]);
            seatsPos.push(tmp_position[6]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[10]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 7人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[4]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[10]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 8人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[4]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[10]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 9人版
        do {
            // 坐标
            let seatsPos: cc.Vec2[] = [];
            seatsPos.push(tmp_position[0]);
            seatsPos.push(tmp_position[1]);
            seatsPos.push(tmp_position[2]);
            seatsPos.push(tmp_position[4]);
            seatsPos.push(tmp_position[5]);
            seatsPos.push(tmp_position[7]);
            seatsPos.push(tmp_position[8]);
            seatsPos.push(tmp_position[10]);
            seatsPos.push(tmp_position[11]);
            this._seatsPosMap.add(seatsPos.length, seatsPos);
        } while (false)

        // 实例化化座位数组
        do {
            cv.StringTools.clearArray(this._vSeatsList);
            for (let i = 0; i < 9; ++i) {
                let seat_node: cc.Node = cc.instantiate(this.prefab_seat);
                seat_node.setAnchorPoint(cc.v2(0.5, 0.5));
                seat_node.setPosition(cc.v2(0, 0));
                seat_node.scale = tmp_scale;
                this.panel_seat.addChild(seat_node);

                let seat: Seat = seat_node.getComponent(Seat);
                seat.serverId = i;
                seat.SeatViewId = i;
                seat.seatType = cv.Enum.SeatType.SeatType_ReplaySeat;
                seat.setMainPool(this.main_pool);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_empty);
                seat.node.active = false;
                this._vSeatsList.push(seat);
            }
        } while (false);
    }

    //设置分池坐标
    private _setSidePoolPosition(sidePoolNum: number = 0): void {

        this._vsidePosList.splice(0, this._vsidePosList.length);
        switch (sidePoolNum) {
            case 0:
                break;

            case 1:
                this._vsidePosList.push(cc.v2(0, 2));
                break;
            case 2:
                this._vsidePosList.push(cc.v2(-102, 2));
                this._vsidePosList.push(cc.v2(102, 2));
                break;
            case 3:
                this._vsidePosList.push(cc.v2(-204, 2));
                this._vsidePosList.push(cc.v2(0, 2));
                this._vsidePosList.push(cc.v2(204, 2));
                break;
            case 4:
                this._vsidePosList.push(cc.v2(-310, 2));
                this._vsidePosList.push(cc.v2(-105, 2));
                this._vsidePosList.push(cc.v2(100, 2));
                this._vsidePosList.push(cc.v2(306, 2));
                break;
            case 5:
                this._vsidePosList.push(cc.v2(-310, 33));
                this._vsidePosList.push(cc.v2(-105, 33));
                this._vsidePosList.push(cc.v2(100, 33));
                this._vsidePosList.push(cc.v2(306, 33));
                this._vsidePosList.push(cc.v2(0, -28));
                break;
            case 6:
                this._vsidePosList.push(cc.v2(-310, 33));
                this._vsidePosList.push(cc.v2(-105, 33));
                this._vsidePosList.push(cc.v2(100, 33));
                this._vsidePosList.push(cc.v2(306, 33));
                this._vsidePosList.push(cc.v2(-102, -28));
                this._vsidePosList.push(cc.v2(102, -28));
                break;
            case 7:
                this._vsidePosList.push(cc.v2(-310, 33));
                this._vsidePosList.push(cc.v2(-105, 33));
                this._vsidePosList.push(cc.v2(100, 33));
                this._vsidePosList.push(cc.v2(306, 33));
                this._vsidePosList.push(cc.v2(-204, -28));
                this._vsidePosList.push(cc.v2(0, -28));
                this._vsidePosList.push(cc.v2(204, -28));
                break;

            case 8:
                this._vsidePosList.push(cc.v2(-310, 33));
                this._vsidePosList.push(cc.v2(-105, 33));
                this._vsidePosList.push(cc.v2(100, 33));
                this._vsidePosList.push(cc.v2(306, 33));
                this._vsidePosList.push(cc.v2(-310, -28));
                this._vsidePosList.push(cc.v2(-105, -28));
                this._vsidePosList.push(cc.v2(100, -28));
                this._vsidePosList.push(cc.v2(306, -28));
                break;

            default:
                break;
        }
    }

    // 初始化数据源
    private _initData(): void {
        switch (this._eDataSourceType) {
            case GameReviewDataType.EDST_NONE: break;

            case GameReviewDataType.EDST_RECORD:
            case GameReviewDataType.EDST_GAMEROOM: {
                this._tPokerHandData = gameDataMgr.tGameRecords.tPokerHandData;
                this._objReplayGame = gameDataMgr.tGameRecords.tPokerHandData.objReplay;
                this._objReplayInsurance = gameDataMgr.tGameRecords.tPokerHandData.objReplayInsurance;
                this._bMirco = gameDataMgr.tGameRecords.tPokerHandData.bMirco;
            } break;

            case GameReviewDataType.EDST_COLLECTION: {
                this._tPokerHandData = gameDataMgr.tCollectPokerMapData.tPokerHandData;
                this._objReplayGame = gameDataMgr.tCollectPokerMapData.tPokerHandData.objReplay;
                this._objReplayInsurance = gameDataMgr.tCollectPokerMapData.tPokerHandData.objReplayInsurance;
                this._bMirco = gameDataMgr.tCollectPokerMapData.tPokerHandData.bMirco;
            } break;

            default: break;
        }

        // 初始化"seat"手牌类型
        let seatHandsCardType: number = cv.Enum.SeatHandsCardType.SHCT_TEXAS;
        if (this._tPokerHandData.nGameid === cv.Enum.GameId.Plo) {
            seatHandsCardType = cv.Enum.SeatHandsCardType.SHCT_PLO;
        }
        for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); ++i) {
            this._vSeatsList[i].initHandCards(seatHandsCardType);
        }
    }

    // 重新加载
    loadAll(game_uuid: string): void {
        this._sGameUUID = game_uuid;
        this._bPlayOrPause = false;
        this.spCriticsimTips.node.active = false;
        this._seatMap.clear();
        this.unschedule(this._onScheduleUpdateActions);
        this._initData();
        this._resetTable();
        this._resetInsuranceInfo();
        //当前为一手新的，强制重置所有状态
        this._setSeatInfo(true);
        this._setRoomInfo();
        this._setTableInfo();
        this._setDealerInfo();
        this._setSpeed(eSpeedGear.ESG_GEAR_1);

        this._doAnte();
        this._doBlind();
        this._analysisActions();
        this._updateSlider();

        if (this.node.active) {
            if (this._isNowCritTime == true) {  //当前是暴击局
                this.showCritisicmTips();
            }
            this.play();
        }
    }

    // 重置UI
    resetUI(): void {
        this._sGameUUID = "";
        this._bPlayOrPause = false;

        this.setBtnTouchEnable(this.btn_play, false);
        this.setBtnTouchEnable(this.btn_replay, false);
        this.setBtnTouchEnable(this.btn_speed, false);
        this.setBtnTouchEnable(this.btn_last_step, false);
        this.setBtnTouchEnable(this.btn_next_step, false);

        this.unschedule(this._onScheduleUpdateActions);
        this._resetTable();
        this._resetInsuranceInfo();
        this._setSpeed(eSpeedGear.ESG_GEAR_1);
        this._setSlider(0);

        // 重置 Dealer 位
        this.img_d.node.active = true;
        this.img_d.node.stopAllActions();
        this.img_d.node.active = false;
    }

    // 重置桌子
    private _resetTable(clean: boolean = true): void {
        if (clean) {
            cv.StringTools.clearArray(this._vActionsList);
            cv.StringTools.clearArray(this._vPlayedActionsList);
            this._vInitialStakeList.clear();

            // 清理座位状态
            for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); ++i) {
                this._vSeatsList[i].updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_empty);
                this._vSeatsList[i].hideWin();
            }

            // 清除击中保险裂纹动画标记
            for (let i = 0; i < cv.StringTools.getArrayLength(this.pub_card_list); ++i) {
                this.pub_card_list[i].setCrackAnim(false);
                this._hideHitOutsTipsAnim();
            }

            // 处理"预座"
            this._initTransSeat(clean);
        }

        // 底池清零
        this._setMainPool(0, false);

        // 边池清零
        for (let i = 0; i < cv.StringTools.getArrayLength(this.side_pool_list); ++i) {
            this._setSidePool(i, 0);
        }

        // 公共牌区 隐藏
        for (let i = 0; i < cv.StringTools.getArrayLength(this.pub_card_list); ++i) {
            if (this._tPokerHandData) {
                this.pub_card_list[i].setGameID(this._tPokerHandData.nGameid);
            }

            this.pub_card_list[i].updateCardFace();
            this.pub_card_list[i].updateCardBack();
            this.pub_card_list[i].node.active = false;
        }

        // 保险清零
        this._setInsurance(0, false);
    }


    // 重置座位
    private _resetSeat(seat: Seat, isNewHand?: boolean): void {
        if (!seat) return;

        if (seat.getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
            seat.SetName(seat.getData().name);
            seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting, ActionType.Enum_Action_Null);
            seat.hideCard();
            seat.hideChips();
            seat.hideTips();
            seat.hideStatusText();
            seat.hideWin();

            if (isNewHand) {
                seat.hideFire();
            }

            let isSelf: boolean = cv.dataHandler.getUserData().u32Uid === seat.getData().playerid;
            for (let i = 0; i < seat.getHandsCardsCount(); ++i) {
                seat.getCard(i).node.active = !isSelf;
                seat.getCard(i).setFace(false);
                seat.getCard(i).updateCardFace();
                seat.getCard(i).updateCardBack();

                seat.getShowCard(i).node.active = isSelf;
                seat.getShowCard(i).setFace(isSelf);
                seat.getShowCard(i).updateCardFace();
                seat.getShowCard(i).updateCardBack();
            }

            seat.doGray(false);
        }
    }

    // 解析座位数据
    private _setSeatInfo(isNewHand?: boolean): void {
        let seatsInfo: any = this._objReplayGame["SeatsInfo"];
        let vSeats: any[] = seatsInfo["seats_info"];

        if (isNewHand) {
            this._initTransSeat(!isNewHand);
        }

        for (let i = 0; i < cv.StringTools.getArrayLength(vSeats); ++i) {
            let seatData: any = vSeats[i];
            let player: PlayerInfo = new PlayerInfo();

            let name: string = seatData["name"];
            let uid: number = cv.Number(seatData["UID"]);
            let seatID: number = cv.Number(seatData["seat_no"]);
            let stake: number = cv.Number(seatData["stake"]);
            let plat: number = cv.Number(seatData["plat"]);

            if (seatData["is_muck"] === true) {
                this._vMuckList.push(seatID);
            }

            player.name = name;
            player.playerid = uid;
            player.seatid = seatID;
            player.stake = stake;
            player.headurl = cv.String(seatData["head_url"]);
            player.round_bet = 0;
            player.plat = plat;

            this._vInitialStakeList.add(seatID, stake);
            let seat: Seat = this._getSeatById(seatID);
            if (seat) {
                let vHoleCards: any[] = seatData["holecards"];

                seat.setData(player);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting);

                // 清理座位上的手牌
                for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                    if (this._tPokerHandData) {
                        seat.getCard(j).setGameID(this._tPokerHandData.nGameid);
                        seat.getShowCard(j).setGameID(this._tPokerHandData.nGameid);
                    }

                    seat.getCard(j).initDefaultValue();
                    seat.getShowCard(j).initDefaultValue();
                }

                // 初始化手牌
                for (let j = 0; j < cv.StringTools.getArrayLength(vHoleCards); ++j) {
                    let card: Card = seat.getShowCard(j)
                    if (card) {
                        let eCardNum: CardNum = cv.Number(vHoleCards[j]["number"]);
                        let eCardSuit: CardSuit = cv.Number(vHoleCards[j]["suit"]);
                        card.setContent(eCardNum, eCardSuit);
                    }
                }

                this._resetSeat(seat, isNewHand);
            }
        }
    }

    // 获取座位
    private _getSeatById(seatID: number): Seat {
        let retVal: Seat = null;
        for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); ++i) {
            if (this._vSeatsList[i].serverId === seatID) {
                retVal = this._vSeatsList[i];
                break;
            }
        }
        return retVal;
    }

    // 设置庄家
    private _setDealerInfo(): void {
        let tableInfo: any = this._objReplayGame["TableInfo"];
        let nDealerSeat: number = cv.Number(tableInfo["dealer_seat"]);
        this._drunAction(nDealerSeat);
    }

    // 设置房间数据
    private _setRoomInfo(): void {
        // data
        let roomInfo: any = this._objReplayGame["RoomInfo"];
        let roundInfo: any = this._objReplayGame["RoundsInfo"];
        this._nAnte = cv.Number(roomInfo["ante"]);
        this._nBlind = cv.Number(roomInfo["blind"]);
        this._bDoubleAnte = roomInfo["double_ante"];
        this._nMode = cv.Number(roomInfo["mode"]);
        this._nSB = 0;
        this._nBB = this._nBlind;
        this._nStraddle = 2 * this._nBlind;
        this._isNowCritTime = roundInfo["is_now_crit_time"];  //是否是暴击场开局

        // 解析小盲配置
        do {
            for (let i = 0; i < 20; ++i) {
                let strBlind: string = cv.config.getblindString(i);
                if (strBlind) {
                    let vBlind = strBlind.split('/');
                    let nSB = Math.min(cv.Number(vBlind[0]), cv.Number(vBlind[1]));
                    let nBB = Math.max(cv.Number(vBlind[0]), cv.Number(vBlind[1]));

                    if (cv.StringTools.serverGoldByClient(nBB) === this._nBB) {
                        this._nSB = cv.StringTools.serverGoldByClient(nSB);
                    }
                }
            }
        } while (false);

        // ui
        this.txt_game_mode.string = roomInfo["type"];
        this.txt_game_uuid.string = this._sGameUUID;
    }

    // 设置桌子数据
    private _setTableInfo(): void {
        let tableInfo: any = this._objReplayGame["TableInfo"];
        let postSeats: any[] = tableInfo["post_seats"];
        let showDown: any[] = tableInfo["showdown_seats"];
        let muck: any = tableInfo["muck_seats"];

        cv.StringTools.clearArray(this._vMuckList);
        cv.StringTools.clearArray(this._vPostSeatList);
        cv.StringTools.clearArray(this._vShowDownList);

        this._nDealerSeat = cv.Number(tableInfo["dealer_seat"]);
        this._nBBSeat = cv.Number(tableInfo["bb_seat"]);
        this._nSBSeat = cv.Number(tableInfo["sb_seat"]);
        this._nStraddleSeat = -1;
        if (tableInfo["straddle_seat"] != null) {
            this._nStraddleSeat = tableInfo["straddle_seat"];
        }

        for (let i = 0; i < cv.StringTools.getArrayLength(postSeats); ++i) {
            this._vPostSeatList.push(cv.Number(postSeats[i]));
        }

        for (let i = 0; i < cv.StringTools.getArrayLength(showDown); ++i) {
            this._vShowDownList.push(cv.Number(showDown[i]));
        }
    }

    // 处理预座
    private _initTransSeat(clean: boolean = true): void {
        if (clean) {
            for (let i = 0; i < this._vSeatsList.length; ++i) {
                let seat: Seat = this._vSeatsList[i];
                seat.ReplayPlayerCount = 0;
                seat.SeatViewId = -1;
                seat.node.active = false;
            }
        }
        else {
            let roomInfo: any = this._objReplayGame["RoomInfo"];
            let seatsInfo: any = this._objReplayGame["SeatsInfo"];
            let seats_info: any[] = seatsInfo["seats_info"];
            let players_count = cv.Number(roomInfo["players_count"]);

            let seatsPos: cc.Vec2[] = this._seatsPosMap.get(players_count);
            for (let i = 0; i < this._vSeatsList.length; ++i) {
                let seat: Seat = this._vSeatsList[i];
                this._vSeatsList[i].ReplayPlayerCount = players_count;
                seat.node.active = i < players_count;
                seat.SeatViewId = -1;

                if (seat.node.active) {
                    seat.SeatViewId = i;
                    seat.node.setPosition(seatsPos[i]);
                }
            }

            // 处理"预座"
            let self_seat_id: number = -1;
            for (let i = 0; i < cv.StringTools.getArrayLength(seats_info); ++i) {
                let info: any = seats_info[i];
                let uid: number = cv.Number(info["UID"]);
                let seatid: number = cv.Number(info["seat_no"]);
                if (uid === cv.dataHandler.getUserData().u32Uid) {
                    let seat: Seat = this._getSeatById(seatid);
                    if (seat && seat.getSeatViewId() !== 0) {
                        self_seat_id = seatid;
                        break;
                    }
                }
            }

            // 检测寻路方位
            let trans_count: number = 0;                                            // 寻路动作个数
            let is_cw_trans: boolean = true;                                        // 是否顺时针寻路

            if (self_seat_id >= 0) {
                let cw_count: number = players_count - self_seat_id;                 // 顺时针寻路个数
                let ccw_count: number = self_seat_id;                               // 逆时针寻路个数

                is_cw_trans = cw_count <= ccw_count;
                trans_count = Math.min(cw_count, ccw_count);
            }

            // 开始寻路
            if (trans_count > 0) {
                for (let i = 0; i < this._vSeatsList.length; ++i) {
                    if (!this._vSeatsList[i].node.active) continue;
                    let endedPos: cc.Vec2 = cc.Vec2.ZERO;

                    if (is_cw_trans) {
                        let nextIndex: number = 0;
                        for (let j = 0; j < trans_count; ++j) {
                            nextIndex = (i + 1 + j) % players_count;
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
                        }
                        endedPos = cc.v2(seatsPos[nextIndex]);
                    }

                    this._vSeatsList[i].node.setPosition(endedPos);
                }
            }

            // 设置"SeatViewID"
            for (let i = 0; i < this._vSeatsList.length; ++i) {
                if (!this._vSeatsList[i].node.active) continue;
                let viewID: number = this._vSeatsList[i].getSeatViewId();

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

                this._vSeatsList[i].setSeatViewId(viewID, players_count, cv.Enum.SeatType.SeatType_ReplaySeat);
            }
        }
    }

    // 处理d
    private _drunAction(seatID: number): void {
        let seat: Seat = this._getSeatById(seatID);
        this.img_d.node.stopAllActions();
        if (!seat) return;

        this.img_d.node.active = true;
        let offset: cc.Vec2 = cc.v2(30, 0);
        let endedPos: cc.Vec2 = cc.Vec2.ZERO;

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

        this.img_d.node.parent.convertToNodeSpaceAR(endedPos, endedPos);
        this.img_d.node.setPosition(endedPos);
    }

    // 处理前注
    private _doAnte(): void {
        let roundsInfo: any = this._objReplayGame["RoundsInfo"];
        let bAnteRound: boolean = roundsInfo["ante_round"];
        if (bAnteRound) {
            if (this._nMode === cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                if (this._bDoubleAnte) {
                    let tDealer: Seat = this._getSeatById(this._nDealerSeat);
                    if (tDealer) {
                        tDealer.showChipsNow(this._nAnte);
                    }
                }
                // 补Ante
                for (let i = 0; i < cv.StringTools.getArrayLength(this._vPostSeatList); ++i) {
                    let postSeat: Seat = this._getSeatById(this._vPostSeatList[i]);
                    if (postSeat) {
                        postSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);

                        postSeat.showChipsNow(this._nAnte);
                        let player: PlayerInfo = postSeat.getData();
                        if (player) {
                            player.round_bet = player.round_bet + this._nAnte;
                            player.stake = player.stake - this._nAnte;
                            postSeat.setStake(player.stake);
                        }
                    }
                }
            }

            for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); ++i) {
                if (this._vSeatsList[i].getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
                    let player: PlayerInfo = this._vSeatsList[i].getData();
                    if (player) {
                        player.stake = player.stake - this._nAnte;
                        this._vSeatsList[i].setStake(player.stake);
                    }
                }
            }

            let endAnteRound: any = roundsInfo["end_ante_round"];
            let potsInfo: any[] = endAnteRound["pots_info"];
            if (cv.StringTools.getArrayLength(potsInfo) > 0) {
                let mainPot: any = potsInfo[0];
                this._setMainPool(cv.Number(mainPot["amount"]), true);
            }
        }
    }

    // 处理盲注
    private _doBlind(): void {
        let roundsInfo: any = this._objReplayGame["RoundsInfo"];
        let bBlindRound: boolean = roundsInfo["blind_round"];

        if (bBlindRound) {
            let sbSeat: Seat = this._getSeatById(this._nSBSeat);
            if (sbSeat) {
                sbSeat.showChipsNow(this._nSB);
                let player: PlayerInfo = sbSeat.getData();
                if (player) {
                    player.round_bet = player.round_bet + this._nSB;
                    player.stake = player.stake - this._nSB;
                    sbSeat.setStake(player.stake);
                }
            }

            let bbSeat: Seat = this._getSeatById(this._nBBSeat);
            if (bbSeat) {
                bbSeat.showChipsNow(this._nBB);
                let player: PlayerInfo = bbSeat.getData();
                if (player) {
                    player.round_bet = player.round_bet + this._nBB;
                    player.stake = player.stake - this._nBB;
                    bbSeat.setStake(player.stake);
                }
            }

            if (this._nStraddleSeat != -1) {
                let straddleSeat: Seat = this._getSeatById(this._nStraddleSeat);
                if (straddleSeat) {
                    straddleSeat.showTips(cv.config.getStringData("ActionTips5"), cv.Enum.TipsType.Tips_straddle);
                    straddleSeat.showChipsNow(this._nStraddle);
                    let player: PlayerInfo = straddleSeat.getData();
                    if (player) {
                        player.round_bet = player.round_bet + this._nStraddle;
                        player.stake = player.stake - this._nStraddle;
                        straddleSeat.setStake(player.stake);
                    }
                }
            }
            // 补盲注
            for (let i = 0; i < cv.StringTools.getArrayLength(this._vPostSeatList); ++i) {
                let postSeat: Seat = this._getSeatById(this._vPostSeatList[i]);
                if (postSeat) {
                    let len = this._vInitialStakeList.length;
                    let number = 0;
                    if (this._vInitialStakeList.length > 3 && this._nStraddleSeat != -1) {
                        postSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                        number = this._nStraddle;
                    } else {
                        postSeat.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                        number = this._nBB;
                    }
                    postSeat.showChipsNow(number);
                    let player: PlayerInfo = postSeat.getData();
                    if (player) {
                        player.round_bet = player.round_bet + number;
                        player.stake = player.stake - number;
                        postSeat.setStake(player.stake);
                    }
                }
            }
        }
    }

    // 强制亮牌
    private _forceShowAction(): void {
        let seatsInfo: any = this._objReplayGame["SeatsInfo"];
        let vSeats: any[] = seatsInfo["seats_info"];
        let getSeatNo: (playerid: number) => number = (playerid: number): number => {
            for (let n = 0; n < cv.StringTools.getArrayLength(vSeats); ++n) {
                if (vSeats[n].UID === playerid) {
                    return vSeats[n].seat_no;
                }
            }
            return -1;
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
            let action: SystemAction = new SystemAction();
            action.eSrcType = ActionSrcType.ACTION_SYSTEM;
            action.eAction = SystemActionType.SYSTEM_ACTION_FORCESHOW;
            action.data = showCardsSeatIDList;
            this._vActionsList.push(action);
        }
    }

    private _doForceShow(showCardList: number[]): void {
        for (let i = 0; i < cv.StringTools.getArrayLength(showCardList); ++i) {
            let seat: Seat = this._getSeatById(showCardList[i]);
            if (seat) {
                for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                    seat.getCard(j).node.active = false;
                    seat.getShowCard(j).node.active = true;
                    seat.getShowCard(j).setFace(true);

                    if (seat.getShowCard(j).hasContent()) {
                        seat.getShowCard(j).setFace(true);
                    }
                    else {
                        seat.getShowCard(j).setFace(false);
                    }
                }
            }
        }
    }

    // 发发看
    private _sendOutAction(): void {
        let nReviewSendOutLen: number = 0;
        for (let i = 0; i < this._tPokerHandData.vPlayerRecords.length; ++i) {
            if (this._tPokerHandData.vPlayerRecords[i].nPlayerID === cv.dataHandler.getUserData().u32Uid) {
                nReviewSendOutLen = this._tPokerHandData.vPlayerRecords[i].nReviewSendOutLen;
                break;
            }
        }
        if (nReviewSendOutLen > this._tPokerHandData.vPublicCards.length) {
            let action: SystemAction = new SystemAction();
            action.eSrcType = ActionSrcType.ACTION_SYSTEM;
            action.eAction = SystemActionType.SYSTEM_ACTION_SENDOUT;
            action.data = nReviewSendOutLen;
            this._vActionsList.push(action);
        }
    }

    private _doSendOut(sendOutLen: number): void {
        let vALlPubCards: HandCardType[] = this._tPokerHandData.vPublicCards.concat(this._tPokerHandData.vUnsendPublicCards);
        for (let i = 0; i < this.pub_card_list.length; ++i) {
            if (i < sendOutLen) {
                this.pub_card_list[i].setContent(vALlPubCards[i].eCardNum, vALlPubCards[i].eCardSuit);
                this.pub_card_list[i].node.active = true;
                this.pub_card_list[i].setFace(true);
            }
        }
    }

    // 解析动画
    private _analysisActions(): void {
        this._nCurrentActionSeq = -1;
        cv.StringTools.clearArray(this._vActionsList);
        cv.StringTools.clearArray(this._vPlayedActionsList);
        let roundsInfo = this._objReplayGame["RoundsInfo"];

        // 底牌权 / 前翻牌圈 - 公共牌出现以前的第一轮叫注
        do {
            let preFlop: any[] = roundsInfo["preflop"];
            for (let i = 0; i < cv.StringTools.getArrayLength(preFlop); ++i) {
                let action: PlayerAction = new PlayerAction();
                action.eSrcType = ActionSrcType.ACTION_PLAYER;
                action.nSeatID = cv.Number(preFlop[i]["seat_no"]);
                action.nAmount = cv.Number(preFlop[i]["amount"]);
                action.eAction = cv.Number(preFlop[i]["action_type"]);
                action.eSeq = cv.Number(preFlop[i]["seq"]);
                this._vActionsList.push(action);
            }
        } while (false);

        // 结束叫注
        do {
            let endPreFlop: any = roundsInfo["end_preflop_round"];
            let endRound: SystemAction = new SystemAction();
            endRound.eSrcType = ActionSrcType.ACTION_SYSTEM;
            endRound.eAction = SystemActionType.SYSTEM_ACTION_ENDPREFLOP;
            endRound.data = endPreFlop["pots_info"];
            this._vActionsList.push(endRound);
        } while (false);

        // 翻牌圈 - 首三张公共牌出现以后的押注圈
        do {
            let flopCMC: any[] = roundsInfo["flop_community_cards"];
            if (cv.StringTools.getArrayLength(flopCMC) > 0) {
                let dealFlop: SystemAction = new SystemAction();
                dealFlop.eSrcType = ActionSrcType.ACTION_SYSTEM;
                dealFlop.eAction = SystemActionType.SYSTEM_ACTION_DEALFLOP;
                dealFlop.data = flopCMC;
                this._vActionsList.push(dealFlop);

                let flop: any[] = roundsInfo["flop"];
                for (let i = 0; i < cv.StringTools.getArrayLength(flop); ++i) {
                    let action: PlayerAction = new PlayerAction();
                    action.eSrcType = ActionSrcType.ACTION_PLAYER;
                    action.nSeatID = cv.Number(flop[i]["seat_no"]);
                    action.nAmount = cv.Number(flop[i]["amount"]);
                    action.eAction = cv.Number(flop[i]["action_type"]);
                    action.eSeq = cv.Number(flop[i]["seq"]);
                    this._vActionsList.push(action);
                }

                let endFlop = roundsInfo["end_flop_round"];
                let endRound: SystemAction = new SystemAction();
                endRound.eSrcType = ActionSrcType.ACTION_SYSTEM;
                endRound.eAction = SystemActionType.SYSTEM_ACTION_ENDFLOP;
                endRound.data = endFlop["pots_info"];
                this._vActionsList.push(endRound);
            }
            else {
                let settlement: SystemAction = new SystemAction();
                settlement.eSrcType = ActionSrcType.ACTION_SYSTEM;
                settlement.eAction = SystemActionType.SYSTEM_ACTION_SETTLEMENT;
                settlement.data = roundsInfo["settlement_round"];
                this._vActionsList.push(settlement);
                this._forceShowAction();
                this._sendOutAction();
                return;
            }
        } while (false);

        // 实例化保险模块
        do {
            for (let i = 0; i < cv.StringTools.getArrayLength(this._objReplayInsurance); ++i) {
                // 实例化击中保险提示
                if (!this._tInsuranceHitOutsTips) {
                    this._tInsuranceHitOutsTips = cc.instantiate(this.prefab_hitOutsTipsAnim).getComponent(InsuranceHitOutsTips);
                    this._tInsuranceHitOutsTips.node.setScale(0.8);
                    this.panel_insurance.addChild(this._tInsuranceHitOutsTips.node);
                }

                // 实例化保险
                if (!this._tInsuranceReplay) {
                    let inst: cc.Node = cc.instantiate(this.prefab_insuranceEntrance);
                    this.panel_insurance.addChild(inst);
                    this._tInsuranceReplay = inst.getComponent(InsuranceEntrance);
                }

                // 初始化
                this._tInsuranceReplay.init();
                this._tInsuranceReplay.initFinish(this._objReplayInsurance[i]["InsuranceMode"], false);
                this._tInsuranceReplay.setViewMode(InsuranceData.InsuranceViewMode.VIEW_REPLAY);
            }

            // 隐藏保险界面
            this._doHideInsurance();
        } while (false);

        // 转牌保险
        do {
            for (let i = 0; i < cv.StringTools.getArrayLength(this._objReplayInsurance); ++i) {
                if (cv.Number(this._objReplayInsurance[i]["Round"]) === 2) {
                    let dealInsurance: SystemAction = new SystemAction();
                    dealInsurance.eSrcType = ActionSrcType.ACTION_SYSTEM;
                    dealInsurance.eAction = SystemActionType.SYSTEM_ACTION_DEALINSURANCE;
                    dealInsurance.data = this._objReplayInsurance[0];
                    this._vActionsList.push(dealInsurance);
                    this._mapShowInsuranceFrameFlag.add(this._vActionsList.length - 1, 2);

                    // 再次重复添加一份"保险动作"(用于延长一帧显示)
                    let dealInsuranceTmp: SystemAction = new SystemAction();
                    cv.StringTools.deepCopy(dealInsurance, dealInsuranceTmp);
                    this._vActionsList.push(dealInsuranceTmp);
                    this._mapShowInsuranceFrameFlag.add(this._vActionsList.length - 1, 2);

                    let endInsurance: SystemAction = new SystemAction();
                    endInsurance.eSrcType = ActionSrcType.ACTION_SYSTEM;
                    endInsurance.eAction = SystemActionType.SYSTEM_ACTION_ENDINSURANCE;
                    this._vActionsList.push(endInsurance);
                    break;
                }
            }
        } while (false);

        // 转牌
        do {
            let turnComCard = roundsInfo["turn_community_card"];
            if (turnComCard) {
                let dealTurn: SystemAction = new SystemAction();
                dealTurn.eSrcType = ActionSrcType.ACTION_SYSTEM;
                dealTurn.eAction = SystemActionType.SYSTEM_ACTION_DEALTURN;
                dealTurn.data = roundsInfo["turn_community_card"];
                this._vActionsList.push(dealTurn);

                let turn: any[] = roundsInfo["turn"];
                for (let i = 0; i < cv.StringTools.getArrayLength(turn); ++i) {
                    let action: PlayerAction = new PlayerAction();
                    action.eSrcType = ActionSrcType.ACTION_PLAYER;
                    action.nSeatID = cv.Number(turn[i]["seat_no"]);
                    action.nAmount = cv.Number(turn[i]["amount"]);
                    action.eAction = cv.Number(turn[i]["action_type"]);
                    action.eSeq = cv.Number(turn[i]["seq"]);
                    this._vActionsList.push(action);
                }

                let endTurn = roundsInfo["end_turn_round"];
                let endRound: SystemAction = new SystemAction();
                endRound.eSrcType = ActionSrcType.ACTION_SYSTEM;
                endRound.eAction = SystemActionType.SYSTEM_ACTION_ENDTURN;
                endRound.data = endTurn["pots_info"];
                this._vActionsList.push(endRound);
                this._nTurnActIdx = this._vActionsList.length - 1;
            }
            else {
                let settlement: SystemAction = new SystemAction();
                settlement.eSrcType = ActionSrcType.ACTION_SYSTEM;
                settlement.eAction = SystemActionType.SYSTEM_ACTION_SETTLEMENT;
                settlement.data = roundsInfo["settlement_round"];
                this._vActionsList.push(settlement);
                this._forceShowAction();
                this._sendOutAction();
                return;
            }
        } while (false);

        // 河牌保险
        do {
            for (let i = 0; i < cv.StringTools.getArrayLength(this._objReplayInsurance); ++i) {
                if (cv.Number(this._objReplayInsurance[i]["Round"]) === 3) {
                    let dealInsurance: SystemAction = new SystemAction();
                    dealInsurance.eSrcType = ActionSrcType.ACTION_SYSTEM;
                    dealInsurance.eAction = SystemActionType.SYSTEM_ACTION_DEALINSURANCE;
                    dealInsurance.data = this._objReplayInsurance[i];
                    this._vActionsList.push(dealInsurance);
                    this._mapShowInsuranceFrameFlag.add(this._vActionsList.length - 1, 3);

                    // 再次重复添加一份"保险动作"(用于延长一帧显示)
                    let dealInsuranceTmp: SystemAction = new SystemAction();
                    cv.StringTools.deepCopy(dealInsurance, dealInsuranceTmp);
                    this._vActionsList.push(dealInsuranceTmp);
                    this._mapShowInsuranceFrameFlag.add(this._vActionsList.length - 1, 3);

                    let endInsurance: SystemAction = new SystemAction();
                    endInsurance.eSrcType = ActionSrcType.ACTION_SYSTEM;
                    endInsurance.eAction = SystemActionType.SYSTEM_ACTION_ENDINSURANCE;
                    this._vActionsList.push(endInsurance);
                    break;
                }
            }
        } while (false);

        // 河牌
        do {
            let riverComCard = roundsInfo["river_community_card"];
            if (riverComCard) {
                let dealRiver: SystemAction = new SystemAction();
                dealRiver.eSrcType = ActionSrcType.ACTION_SYSTEM;
                dealRiver.eAction = SystemActionType.SYSTEM_ACTION_DEALRIVER;
                dealRiver.data = roundsInfo["river_community_card"];
                this._vActionsList.push(dealRiver);

                let turn: any[] = roundsInfo["river"];
                for (let i = 0; i < cv.StringTools.getArrayLength(turn); ++i) {
                    let action: PlayerAction = new PlayerAction();
                    action.eSrcType = ActionSrcType.ACTION_PLAYER;
                    action.nSeatID = cv.Number(turn[i]["seat_no"]);
                    action.nAmount = cv.Number(turn[i]["amount"]);
                    action.eAction = cv.Number(turn[i]["action_type"]);
                    action.eSeq = cv.Number(turn[i]["seq"]);
                    this._vActionsList.push(action);
                }

                let endTurn = roundsInfo["end_river_round"];
                let endRound: SystemAction = new SystemAction();
                endRound.eSrcType = ActionSrcType.ACTION_SYSTEM;
                endRound.eAction = SystemActionType.SYSTEM_ACTION_ENDRIVER;
                endRound.data = endTurn["pots_info"];
                this._vActionsList.push(endRound);
                this._nRiverActIdx = this._vActionsList.length - 1;
            }
            else {
                let settlement: SystemAction = new SystemAction();
                settlement.eSrcType = ActionSrcType.ACTION_SYSTEM;
                settlement.eAction = SystemActionType.SYSTEM_ACTION_SETTLEMENT;
                settlement.data = roundsInfo["settlement_round"];
                this._vActionsList.push(settlement);
                this._forceShowAction();
                this._sendOutAction();
                return;
            }
        } while (false);

        // 摊牌(最后一圈押注以后)
        do {
            if (cv.StringTools.getArrayLength(this._vShowDownList) > 0) {
                let showDown: SystemAction = new SystemAction();
                showDown.eSrcType = ActionSrcType.ACTION_SYSTEM;
                showDown.eAction = SystemActionType.SYSTEM_ACTION_SHOWDOWN;
                this._vActionsList.push(showDown);
            }
        } while (false);

        // 结算
        do {
            let settlement: SystemAction = new SystemAction();
            settlement.eSrcType = ActionSrcType.ACTION_SYSTEM;
            settlement.eAction = SystemActionType.SYSTEM_ACTION_SETTLEMENT;
            settlement.data = roundsInfo["settlement_round"];
            this._vActionsList.push(settlement);
            this._forceShowAction();
            this._sendOutAction();
        } while (false);
    }

    // 定时器调用, 更新动作
    private _onScheduleUpdateActions(delay: number): void {
        if (this._nCurrentActionSeq + 1 < 0 || this._nCurrentActionSeq + 1 >= cv.StringTools.getArrayLength(this._vActionsList)) return;

        let action = this._vActionsList[this._nCurrentActionSeq + 1];
        this._vPlayedActionsList.push(action);
        ++this._nCurrentActionSeq;

        this._updateAllActions();
        this._updateSlider();
    }

    // 更新所有动作
    private _updateAllActions(): void {
        this._resetTable(false);
        this._setSeatInfo();
        this._doAnte();
        this._doBlind();
        //由于这里是记录从第一个动作一直到当前动作，seatMap也是记录从第一个动作一直刷新值到最后一个动作，最后一个动作不是allin就把allin的动画隐藏
        for (let i = 0; i < cv.StringTools.getArrayLength(this._vPlayedActionsList); ++i) {
            let action: any = this._vPlayedActionsList[i];
            switch (action.eSrcType) {
                case ActionSrcType.ACTION_PLAYER: {
                    let seat: Seat = this._getSeatById(action.nSeatID);
                    this._seatMap.add(action.nSeatID, action.eAction);
                    this._doPlayerAction(seat, action);
                } break;

                case ActionSrcType.ACTION_SYSTEM: {
                    this._doSystemAction(action);
                } break;

                default: break;
            }
        }
        //把allin的动画隐藏
        this._seatMap.forEachKeyValue((data, i?: number): void => {
            if (data.value != ActionType.Enum_Action_Allin) {
                let seat: Seat = this._getSeatById(data.key);
                seat.hideFire();
            }
        });
        // 检测击中保险的裂纹效果
        if (this._nTurnActIdx > 0) {
            if (this._nCurrentActionSeq < this._nTurnActIdx - 1) {
                this.pub_card_list[3].setCrackAnim(false);
                this._hideHitOutsTipsAnim();
            }
            else if (this._nCurrentActionSeq === this._nTurnActIdx - 1) {
                if (this.pub_card_list[3].node.active && this._bShowCrackAnimTurn) {
                    this.pub_card_list[3].setCrackAnim(true);
                    this._showHitOutsTipsAnim();
                }
            }
            else if (this._nCurrentActionSeq < this._nRiverActIdx - 1) {
                this.pub_card_list[4].setCrackAnim(false);
                this._hideHitOutsTipsAnim();
            }
            else if (this._nCurrentActionSeq === this._nRiverActIdx - 1) {
                if (this.pub_card_list[4].node.active) {
                    this.pub_card_list[3].setCrackAnim(false);
                    if (this._bShowCrackAnimRiver) {
                        this.pub_card_list[4].setCrackAnim(true);
                        this._showHitOutsTipsAnim();
                    }
                }
            }
        }
    }

    private _doPlayerAction(seat: Seat, action: PlayerAction): void {
        if (!seat || !action) return;

        let player: PlayerInfo = seat.getData();
        if (!player) return;
        player.last_action = action.eAction;
        switch (action.eAction) {
            case ActionType.Enum_Action_Null: {
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Null, true);
            } break;

            case ActionType.Enum_Action_Check: {
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Check, true);
            } break;

            case ActionType.Enum_Action_Fold: {
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Fold, true);
            } break;

            case ActionType.Enum_Action_Call: {
                player.round_bet = player.round_bet + action.nAmount;
                if (player.stake - action.nAmount >= 0) {
                    player.stake = player.stake - action.nAmount;
                }
                else {
                    player.stake = 0;
                }
                seat.showChipsNow(player.round_bet);
                seat.setStake(player.stake);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Call, true);
            } break;

            case ActionType.Enum_Action_Bet: {
                player.stake = player.stake - (action.nAmount - player.round_bet);
                player.round_bet = action.nAmount;
                seat.showChipsNow(action.nAmount);
                seat.setStake(player.stake);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Bet, true);
            } break;

            case ActionType.Enum_Action_Raise: {
                player.stake = player.stake - (action.nAmount - player.round_bet);
                player.round_bet = action.nAmount;
                seat.setStake(player.stake);
                seat.showChipsNow(action.nAmount);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Raise, true);
            } break;

            case ActionType.Enum_Action_Allin: {
                player.round_bet = action.nAmount;
                player.stake = 0;
                seat.showChipsNow(action.nAmount);
                seat.setStake(0);
                seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_inGame_actionType, ActionType.Enum_Action_Allin, true);
            } break;

            default:
                break;
        }
    }

    private _doSystemAction(action: SystemAction) {
        switch (action.eAction) {
            case SystemActionType.SYSTEM_ACTION_ENDPREFLOP:
                this._doEndRound(SystemActionType.SYSTEM_ACTION_ENDPREFLOP, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_DEALFLOP:
                this._dealCommunityCard(SystemActionType.SYSTEM_ACTION_DEALFLOP, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_ENDFLOP:
                this._doEndRound(SystemActionType.SYSTEM_ACTION_ENDFLOP, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_DEALTURN:
                this._dealCommunityCard(SystemActionType.SYSTEM_ACTION_DEALTURN, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_ENDTURN:
                this._doEndRound(SystemActionType.SYSTEM_ACTION_ENDTURN, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_DEALRIVER:
                this._dealCommunityCard(SystemActionType.SYSTEM_ACTION_DEALRIVER, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_ENDRIVER:
                this._doEndRound(SystemActionType.SYSTEM_ACTION_ENDRIVER, action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_SHOWDOWN:
                this._doShowDown();
                break;
            case SystemActionType.SYSTEM_ACTION_SETTLEMENT:
                this._doWin(action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_DEALINSURANCE:
                this._doReplayInsurance(action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_ENDINSURANCE:
                this._doHideInsurance();
                break;
            case SystemActionType.SYSTEM_ACTION_FORCESHOW:
                this._doForceShow(action.data);
                break;
            case SystemActionType.SYSTEM_ACTION_SENDOUT:
                this._doSendOut(action.data);
                break;
            default:
                break;
        }

        // 非"保险动作"则隐藏"保险"
        if (action.eAction !== SystemActionType.SYSTEM_ACTION_DEALINSURANCE) {
            this._doHideInsurance();
        }
    }

    private _doEndRound(roundAct: SystemActionType, potsInfo: any): void {
        let nAllinCount: number = 0;
        let nRoundPlayerCount: number = 0;
        for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); ++i) {
            let seat: Seat = this._vSeatsList[i];
            if (seat.getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
                seat.SetName(seat.getData().name);
                seat.hideChips();
                seat.hideWin();

                if (seat.getData().last_action !== ActionType.Enum_Action_Fold && seat.getData().last_action !== ActionType.Enum_Action_Allin) {
                    seat.updateSeatStatus(cv.Enum.SeatStatus.SeatStatus_waiting, ActionType.Enum_Action_Null);
                    seat.doGray(false);
                    seat.hideTips();
                    seat.hideStatusText();
                }

                if (seat.getData().last_action === ActionType.Enum_Action_Allin) {
                    ++nAllinCount;
                }

                if (cv.dataHandler.getUserData().u32Uid === seat.getData().playerid) {
                    for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                        seat.getCard(j).node.active = false;
                        seat.getShowCard(j).node.active = true;
                        seat.getShowCard(j).setFace(true);
                    }
                }

                if (seat.getData().last_action === ActionType.Enum_Action_Fold) {
                    seat.hideCard();
                    seat.doGray(true);
                }

                if (seat.getData().last_action !== ActionType.Enum_Action_Fold) {
                    ++nRoundPlayerCount;
                }

                seat.getData().round_bet = 0;
            }
        }

        if (nRoundPlayerCount >= 2) {
            if (nRoundPlayerCount <= nAllinCount + 1) {
                for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); i++) {
                    let seat: Seat = this._vSeatsList[i];
                    if (seat.getStatus() != cv.Enum.SeatStatus.SeatStatus_empty) {
                        if (seat.getData().last_action !== ActionType.Enum_Action_Fold) {
                            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                                seat.getCard(j).node.active = false;
                                seat.getShowCard(j).node.active = true;
                                seat.getShowCard(j).setFace(true);
                            }
                        }
                    }
                }
            }
        }

        let potsInfo_size: number = cv.StringTools.getArrayLength(potsInfo);
        if (potsInfo_size > 0) {
            this._setMainPool(cv.Number(potsInfo[0]["amount"]), true);

            // 设置边池(下标从1开始, UI 0-中, 1-左, 2-右, 移植于C++逻辑)
            this._setSidePoolPosition(potsInfo_size - 1); //设置边池位置
            for (let i = 1; i < potsInfo_size; ++i) {
                this._setSidePool(i - 1, cv.Number(potsInfo[i]["amount"]));
            }
        }
    }

    private _doWin(winnerInfo: any[]): void {
        for (let i = 0; i < cv.StringTools.getArrayLength(winnerInfo); ++i) {
            let seat: Seat = this._getSeatById(cv.Number(winnerInfo[i]["win_seat_no"]));
            if (!seat) continue;

            let nWin = cv.Number(winnerInfo[i]["win_amount"]);

            let nStake = seat.getData().stake;
            this._vInitialStakeList.forEach((k: number, v: number) => {
                if (k == seat.serverId) {
                    nStake = v;
                    return "break";
                }
            })

            seat.getData().stake = nStake + nWin;
            seat.setStake(seat.getData().stake);
            if (nWin > 0) {
                let kColor = cc.color(255, 255, 255);
                seat.SetName("+" + cv.StringTools.serverGoldToShowString(nWin), kColor, cv.Enum.NameTextType.SetNameType_setWinNumber);
                seat.showWin();
            }
        }

        for (let i = 0; i < cv.StringTools.getArrayLength(this._vSeatsList); ++i) {
            let seat: Seat = this._vSeatsList[i];
            if (seat.getStatus() !== cv.Enum.SeatStatus.SeatStatus_empty) {
                if (seat.getData().last_action !== ActionType.Enum_Action_Fold) {
                    seat.hideTips();
                    seat.hideStatusText();
                }
                seat.hideFire();
            }
        }

        // 底池清零
        this._setMainPool(0, true);

        // 边池清零
        for (let i = 0; i < cv.StringTools.getArrayLength(this.side_pool_list); ++i) {
            this._setSidePool(i, 0);
        }
    }

    private _dealCommunityCard(roundType: SystemActionType, cardInfo: any): void {
        switch (roundType) {
            case SystemActionType.SYSTEM_ACTION_DEALFLOP: {
                this.pub_card_list[0].setContent(cv.Number(cardInfo[0]["number"]), cv.Number(cardInfo[0]["suit"]));
                this.pub_card_list[0].node.active = true;
                this.pub_card_list[0].setFace(true);

                this.pub_card_list[1].setContent(cv.Number(cardInfo[1]["number"]), cv.Number(cardInfo[1]["suit"]));
                this.pub_card_list[1].node.active = true;
                this.pub_card_list[1].setFace(true);

                this.pub_card_list[2].setContent(cv.Number(cardInfo[2]["number"]), cv.Number(cardInfo[2]["suit"]));
                this.pub_card_list[2].node.active = true;
                this.pub_card_list[2].setFace(true);

                this.pub_card_list[3].node.active = false;
                this.pub_card_list[4].node.active = false;
            } break;

            case SystemActionType.SYSTEM_ACTION_DEALTURN: {
                this.pub_card_list[3].setContent(cv.Number(cardInfo["number"]), cv.Number(cardInfo["suit"]));
                this.pub_card_list[3].node.active = true;
                this.pub_card_list[3].setFace(true);
                this.pub_card_list[4].node.active = false;
            } break;

            case SystemActionType.SYSTEM_ACTION_DEALRIVER: {
                this.pub_card_list[4].setContent(cv.Number(cardInfo["number"]), cv.Number(cardInfo["suit"]));
                this.pub_card_list[4].node.active = true;
                this.pub_card_list[4].setFace(true);
            } break;

            default: break;
        }
    }

    /**
     * 摊牌(打牌到河底必须亮牌, 比如 Allin, 开启了埋牌功能赢家必须亮)
     */
    private _doShowDown(): void {
        for (let i = 0; i < cv.StringTools.getArrayLength(this._vShowDownList); ++i) {
            let seat: Seat = this._getSeatById(this._vShowDownList[i]);
            if (!seat) continue;

            for (let j = 0; j < seat.getHandsCardsCount(); ++j) {
                seat.getCard(j).node.active = false;
                seat.getShowCard(j).node.active = true;
                seat.getShowCard(j).setFace(true);

                if (seat.getShowCard(j).hasContent()) {
                    seat.getShowCard(j).setFace(true);
                }
                else {
                    seat.getShowCard(j).setFace(false);
                }
            }
        }

        for (let i = 0; i < cv.StringTools.getArrayLength(this._vMuckList); ++i) {
            let seat: Seat = this._getSeatById(this._vMuckList[i]);
            if (!seat) continue;

            seat.showTips(cv.config.getStringData("ActionTips10"), cv.Enum.TipsType.Tips_check);
            seat.doGray(true);
        }
    }

    // 隐藏保险回放
    private _doHideInsurance(): void {
        if (!this._tInsuranceReplay) return;
        this._tInsuranceReplay.autoHide(false);
    }

    // 保险回放
    private _doReplayInsurance(data: any): void {
        if (!this._tInsuranceReplay || this._tInsuranceReplay.isActive()) return;

        this._lastInsuranceReplayData = this._tInsuranceReplay.parseInsuranceReplayData(this._tPokerHandData.nGameid, data, this._bMirco);
        let replayData: InsuranceData.InsuranceReplayData = this._lastInsuranceReplayData;

        // 检测保险播放帧索引(若该动作帧无保险播放, 则直接跳过, 提高性能)
        let bShowInsurance: boolean = false;
        this._mapShowInsuranceFrameFlag.forEach((actionIdx: number, roundIdx: number): any => {
            if (this._nCurrentActionSeq === actionIdx && replayData.round === roundIdx) {
                bShowInsurance = true;
                return "break";
            }
        });
        if (!bShowInsurance) return;

        // 因为保险面板预制件是全屏, 所以这里计算缩放比例, 限制高度比例
        let scaleRate: number = this.panel_insurance.height / this._tInsuranceReplay.getMainPanelSize().height;
        this._tInsuranceReplay.node.setScale(scaleRate);

        // pos
        let x: number = this.panel_insurance.width * (this._tInsuranceReplay.node.anchorX - this.panel_insurance.anchorX);
        let y: number = this.panel_insurance.height * (this._tInsuranceReplay.node.anchorY - this.panel_insurance.anchorY);
        this._tInsuranceReplay.node.setPosition(cc.v2(x, y));

        // 添加 购买者信息
        if (cv.StringTools.getArrayLength(replayData.insurancePlayerInfo) > 0) {
            let playerInfo: any = replayData.insurancePlayerInfo[0];
            let playerID: number = cv.Number(playerInfo["Playerid"]);
            let playerName: string = cv.String(playerInfo["Playername"]);
            let outs_count: number = 0;
            let vHoleCards: game_pb.CardItem[] = playerInfo["Holecards"];
            this._tInsuranceReplay.addPlayerCardsData(playerID, playerName, outs_count, vHoleCards, true);
        }

        // 添加 其他人信息
        for (let i = 0; i < cv.StringTools.getArrayLength(replayData.insuranceData.player_seats); ++i) {
            let playerInfo: any = replayData.insuranceData.player_seats[i];
            let playerID: number = cv.Number(playerInfo["playerid"]);
            let playerName: string = cv.String(playerInfo["playername"]);
            let outs_count: number = cv.Number(playerInfo["outs_count"]);
            let vHoleCards: game_pb.CardItem[] = playerInfo["holecards"];
            this._tInsuranceReplay.addPlayerCardsData(playerID, playerName, outs_count, vHoleCards, false);
        }

        // 显示"保险"视图
        this._tInsuranceReplay.autoShow(false);

        // 显示"击中保险"裂纹动画
        if (replayData.shot) {
            switch (replayData.round) {
                case 2: this._bShowCrackAnimTurn = true; break;         // turn 轮
                case 3: this._bShowCrackAnimRiver = true; break;        // river 轮
                default: break;
            }
        }
    }

    /**
     * 显示"击中保险提示语"动画
     * @param amount 
     * @param world_pos 
     */
    private _showHitOutsTipsAnim(): void {
        if (!this._tInsuranceHitOutsTips || !this._lastInsuranceReplayData) return;
        let replayData: InsuranceData.InsuranceReplayData = this._lastInsuranceReplayData;
        if (replayData.insureWinBet === 0) return;

        // 设置位置
        do {
            let cardNode: cc.Node = this.pub_card_list[0].node;
            let tipsNode: cc.Node = this._tInsuranceHitOutsTips.node;
            let pos: cc.Vec2 = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
            pos.y = cardNode.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
            pos.y -= (1 - cardNode.anchorY) * cardNode.height * cardNode.parent.scale;
            pos.y -= (1 - tipsNode.anchorY) * tipsNode.height * tipsNode.scaleY;
            pos.y -= (this.panel_main.scale - 1) * tipsNode.height;
            pos.y -= 10;

            tipsNode.parent.convertToNodeSpaceAR(pos, pos);
            tipsNode.setPosition(pos);
        } while (false);

        // 设置内容
        let decimalPlaces: number = this._bMirco ? 2 : 0;
        let insureWinBet: number = cv.StringTools.clientGoldByServer(replayData.insureWinBet);
        insureWinBet = cv.StringTools.toFixed(insureWinBet, decimalPlaces, cv.StringTools.RoundingMode.ROUND_HALF_UP);
        this._tInsuranceHitOutsTips.showAnim(insureWinBet);
    }

    /**
     * 隐藏"击中保险提示语"动画
     */
    private _hideHitOutsTipsAnim(): void {
        if (this._tInsuranceHitOutsTips) {
            this._tInsuranceHitOutsTips.hideAnim();
        }
    }

    /**
     * 清理"保险"相关信息等
     */
    private _resetInsuranceInfo(): void {
        this._nTurnActIdx = 0;
        this._nRiverActIdx = 0;
        this._bShowCrackAnimTurn = false;
        this._bShowCrackAnimRiver = false;
        this._mapShowInsuranceFrameFlag.clear();

        this._doHideInsurance();
        this._hideHitOutsTipsAnim();
    }

    // 更新滑条
    private _updateSlider(): void {
        let progress: number = cv.Number(cv.StringTools.getArrayLength(this._vPlayedActionsList) / cv.StringTools.getArrayLength(this._vActionsList));
        this._setSlider(progress);
    }

    // 设置滑条
    private _setSlider(progress: number): void {
        this.slider.progress = Math.min(1, progress);
        let slider_sp: cc.Sprite = this.slider.node.getChildByName("img_sp").getComponent(cc.Sprite);
        slider_sp.node.width = this.slider.progress * this.slider.node.width;
    }

    // 设置主池数量/显隐
    private _setMainPool(value: number, active: boolean): void {
        let main_pool_txt: cc.Label = this.main_pool.getChildByName("txt").getComponent(cc.Label);
        main_pool_txt.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(value));
        this.main_pool.active = active;
    }

    // 设置边池数量/显隐
    private _setSidePool(index: number, value: number): void {
        if (index < 0 || index >= cv.StringTools.getArrayLength(this.side_pool_list)) return;


        value = cv.StringTools.clientGoldByServer(value);
        let pot: cc.Node = this.side_pool_list[index];
        let pot_txt: cc.Label = pot.getChildByName("txt").getComponent(cc.Label);
        pot.active = value > 0;
        pot_txt.string = cv.StringTools.numberToString(value);
        if (value > 0 && this._vsidePosList.length > 0) {
            let _pos = this._vsidePosList[index];
            pot.setPosition(_pos);
        }
    }

    // 设置保险数量/显隐
    private _setInsurance(value: number, active: boolean): void {
        this.node_insurance.active = active;
        let txt_insurance: cc.Label = this.node_insurance.getChildByName("txt").getComponent(cc.Label);
        txt_insurance.string = cv.StringTools.numberToString(value);
    }

    // 播放
    play(): void {
        this._bPlayOrPause = true;
        let sp: cc.Sprite = this.btn_play.getComponent(cc.Sprite);
        cv.resMgr.setSpriteFrame(sp.node, "zh_CN/game/dzpoker/common/game_replay_btn_play");
        if (cc.director.getScheduler().isScheduled(this._onScheduleUpdateActions, this)) {
            this.node.resumeAllActions();
            cc.director.getScheduler().resumeTarget(this);
        }
        else {
            this.unschedule(this._onScheduleUpdateActions);
            this.schedule(this._onScheduleUpdateActions, this._nSpeed);
        }
    }

    // 暂停
    pause(): void {
        this._bPlayOrPause = false;
        let sp: cc.Sprite = this.btn_play.getComponent(cc.Sprite);
        cv.resMgr.setSpriteFrame(sp.node, "zh_CN/game/dzpoker/common/game_replay_btn_pause");

        this.node.pauseAllActions();
        cc.director.getScheduler().pauseTarget(this);
    }

    // 播放/暂停
    playAndPause(): void {
        this._bPlayOrPause = !this._bPlayOrPause;
        if (this._bPlayOrPause) {
            this.play();
        } else {
            this.pause();
        }
    }

    // 改变播放速度
    changeSpeed(): void {
        let speed: eSpeedGear = this._nSpeedGear;
        if (++speed >= eSpeedGear.ESG_MAX) {
            speed = eSpeedGear.ESG_GEAR_1;
        }

        this._setSpeed(speed);
        this.unschedule(this._onScheduleUpdateActions);
        this.play();
    }


    // 重置播放速度
    private _setSpeed(speed: eSpeedGear): void {
        this._nSpeedGear = speed;
        let txt_speed: cc.Label = this.btn_speed.node.getChildByName("txt").getComponent(cc.Label);

        switch (this._nSpeedGear) {
            case eSpeedGear.ESG_GEAR_1_5: {
                this._nSpeed = this._nSpeedDelayTime / 1.5;
                txt_speed.string = "X1.5";
            } break;

            case eSpeedGear.ESG_GEAR_2: {
                this._nSpeed = this._nSpeedDelayTime / 2;
                txt_speed.string = "X2.0";
            } break;

            case eSpeedGear.ESG_NONE:
            case eSpeedGear.ESG_GEAR_1:
            default: {
                this._nSpeed = this._nSpeedDelayTime / 1;
                txt_speed.string = "X1.0";
            } break;
        }
    }

    // 更新牌局回放数据
    private _onMsgUpdateReplayData(param: { uuid: string, hasReplayData: boolean }): void {
        if (!this.isShow()) return;

        this.setBtnTouchEnable(this.btn_last_page, true);
        this.setBtnTouchEnable(this.btn_next_page, true);

        if (param.hasReplayData) {
            this.setBtnTouchEnable(this.btn_play, true);
            this.setBtnTouchEnable(this.btn_replay, true);
            this.setBtnTouchEnable(this.btn_speed, true);
            this.setBtnTouchEnable(this.btn_last_step, true);
            this.setBtnTouchEnable(this.btn_next_step, true);

            this.loadAll(param.uuid);
        }
        else {
            this.resetUI();
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips2"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 上一手
     */
    lastHand(): void {
        this.pause();
        cv.MessageCenter.send("game_replay_lastHand");
    }

    /**
     * 下一手
     */
    nextHand(): void {
        this.pause();
        cv.MessageCenter.send("game_replay_nextHand");
    }

    /**
     * 上一动作
     */
    lastAction(): void {
        console.log("lastAction:" + this._nCurrentActionSeq);
        if (this._nCurrentActionSeq >= 0) {
            if (cv.StringTools.getArrayLength(this._vPlayedActionsList) > 0) {
                this._vPlayedActionsList.pop();
                this._nCurrentActionSeq -= 1;
                this._updateAllActions();
                this._updateSlider();
                this.unschedule(this._onScheduleUpdateActions);
                this.schedule(this._onScheduleUpdateActions, this._nSpeed);
            }
        } else {
            //_nCurrentActionSeq 小于0即回到了初始状态把allin的动画隐藏 
            this._seatMap.forEachKeyValue((data, i?: number): void => {
                let seat: Seat = this._getSeatById(data.key);
                seat.hideFire();
            });
        }
        this.play();
    }

    /**
     * 下一动作
     */
    nextAction(): void {
        this._onScheduleUpdateActions(0);
        this.unschedule(this._onScheduleUpdateActions);
        this.schedule(this._onScheduleUpdateActions, this._nSpeed);
        this.play();
    }

    //暴击场动画显示
    private showCritisicmTips() {
        this.spCriticsimTips.node.active = true;
        this.spCriticsimTips.node.scale = 0.01;

        cv.StringTools.setRichTextString(this.spCriticsimTips.node.getChildByName("txtRichTips"), cv.config.getStringData("Criticsim_start_tip"));
        cv.StringTools.setRichTextString(this.spCriticsimTips.node.getChildByName("txtRichTips2"), cv.config.getStringData("Criticsim_start_tip2"));
        this.spCriticsimTips.node.runAction(cc.sequence(cc.show(), cc.delayTime(0.3), cc.scaleTo(0.2, 1.0), cc.delayTime(1.2), cc.hide()));
    }
}
