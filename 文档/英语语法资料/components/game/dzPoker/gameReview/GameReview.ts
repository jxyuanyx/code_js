import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";

import { GameReplay } from "./GameReplay";
import { GameReviewDataType } from "../../../../common/tools/Enum";
import { FeeItem } from "../../../../components/game/dzPoker/data/RoomData";
import { HandCardType, PlayerRecord, GameReviewItemData, PokerHandData } from "../../../../components/game/dzPoker/data/RecordData";

import { TableView } from "../../../../common/tools/TableView";
import { GameReviewItem } from "./GameReviewItem";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";

/**
 *  牌局回顾面板逻辑
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReview extends cc.Component {
    @property(cc.Prefab) prefab_game_replay: cc.Prefab = null;          // 牌局回顾预制
    @property(cc.Prefab) prefab_report: cc.Prefab = null;               // 举报框预设体

    @property(cc.Node) panel_main: cc.Node = null;                      // 主面板
    @property(cc.Node) panel_top: cc.Node = null;                       // 顶栏面板
    @property(cc.Node) panel_bottom: cc.Node = null;                    // 底栏面板

    @property(cc.Label) txt_title: cc.Label = null;                     // 标题
    @property(cc.Label) txt_serial: cc.Label = null;                    // 牌局编号
    @property(cc.Label) txt_time: cc.Label = null;                      // 牌局时间

    // panel_1
    @property(cc.Label) txt_pot_word: cc.Label = null;                  // 底池 文字
    @property(cc.Label) txt_insurance_word: cc.Label = null;            // 保险 文字
    @property(cc.Label) txt_jackpot_word: cc.Label = null;              // jackpot 文字

    @property(cc.Label) txt_pot: cc.Label = null;                       // 底池 数量
    @property(cc.Label) txt_insurance: cc.Label = null;                 // 保险 数量
    @property(cc.Label) txt_jackpot: cc.Label = null;                   // jackpot 数量

    // panel_2
    @property(cc.ScrollView) panel_scrollview: cc.ScrollView = null;    // 牌局列表

    // panel_3
    @property(cc.Slider) slider: cc.Slider = null;                      // 滑条控件
    @property(cc.Sprite) slider_bg: cc.Sprite = null;                   // 滑条底图
    @property(cc.Sprite) slider_sp: cc.Sprite = null;                   // 滑条精灵

    @property(cc.Label) txt_page: cc.Label = null;                      // 页数
    @property(cc.Label) txt_invalid_data_desc: cc.Label = null;         // 无效数据描述文本

    @property(cc.Button) btn_forceshow: cc.Button = null;               // 强制亮牌
    @property(cc.Button) btn_sendout: cc.Button = null;                 // 发发看
    @property(cc.Button) btn_audit: cc.Button = null;                   // 举报
    @property(cc.Button) btn_play: cc.Button = null;                    // 播放
    @property(cc.Button) btn_collect: cc.Button = null;                 // 收藏
    @property(cc.Button) btn_first: cc.Button = null;                   // 最前页按钮
    @property(cc.Button) btn_last: cc.Button = null;                    // 最后页按钮
    @property(cc.Button) btn_before: cc.Button = null;                  // 上一步按钮
    @property(cc.Button) btn_next: cc.Button = null;                    // 下一步按钮

    @property(cc.Node) panel_toggle_pot: cc.Node = null;                // 精彩对局筛选面板
    @property(CustomToggle) toggle_pot: CustomToggle = null;            // 精彩对局筛选

    // 类名
    static gClassName: string = "GameReview";

    // 是否已初始化实例(是否add到对应节点)
    private _bInit: boolean = false;

    // 滚动视图复用组件
    private _tableView: TableView = null;

    // 当前显示的牌局uuid
    private _sCurGameUUID: string = "";

    // 当前牌局正在结算的uuid (不能及时取 gameDataMgr.tGameData.game_settlement_uuid 的值, 有可能在切页的时候牌局状态改变导致值改变, 这里要保存打开牌谱时刻的值)
    private _sGameSettlementUUID: string = "";

    // 牌谱数据源数组
    private _vGameUUID: string[] = [];

    // 牌谱数组当前索引
    private _nCurGameUUIDIndex: number = -1;

    // 上次保存的牌谱页签(切换场景时自动被清理)
    private _nLastSaveGameUUIDIndex: number = -1;

    // 数据源类型
    private _dataSourceType: GameReviewDataType = GameReviewDataType.EDST_NONE;

    // 上次滑条进度
    private _nLastSliderProgress: number = 0;

    // 滑条滚动系数
    private _nSliderPerRatio: number = 1;

    // 屏蔽层(总体)
    private _shieldLayer: cc.Node = null;

    // 是否显示举报按钮
    private _bShowAudit: boolean = false;

    // 是有存在回放数据(有的时候 send uuid 后收到的回访数据为空或空串, 这里标记下)
    private _bHasReplayData: boolean = false;

    // 牌局回放对象
    private _tGameReplay: GameReplay = null;

    // 顶栏面板字体大小
    private _nTopPanelFontSize: number = 0;

    // 翻页页签文本原始位置
    private _txt_page_src_pos: cc.Vec2 = cc.Vec2.ZERO;

    // 上次"精彩对局筛选"的勾选状态
    private _last_toggle_pot_check_status: boolean = false;

    /**
     * 获取预制件单实例(一个场景中只存在一个)
     */
    static getSinglePrefabInst(prefab: cc.Prefab): cc.Node {
        if (!(prefab instanceof cc.Prefab)) return null;

        let instNode: cc.Node = cc.director.getScene().getChildByName(GameReview.gClassName);
        if (!instNode) {
            instNode = cc.instantiate(prefab);
            if (!instNode.getComponent(GameReview)) {
                instNode.destroy();
                return null;
            }
        }
        return instNode;
    }

    /**
     * 是否初始化(add到对应的父节点上)
     */
    isInit(): boolean {
        return this._bInit;
    }

    /**
     * 显示视图(内部已自动处理数据)
     * @param dataSourceType    数据源类型
     * @param vGameUUID         牌局uuid数组(可选, 默认读取对应缓存数据)
     * @param zorder            视图深度值(可选, 默认当前父节点 childrenCount + 1)
     */
    autoShow(dataSourceType: GameReviewDataType, vGameUUID?: string[], zorder?: number, bAnim: boolean = true): void {
        // data
        this._dataSourceType = dataSourceType;
        this._vGameUUID = vGameUUID ? vGameUUID : this._getGameuuids();
        this._sGameSettlementUUID = gameDataMgr.tGameData.game_settlement_uuid;

        let scene = cc.director.getScene();
        zorder = zorder ? zorder : cv.Enum.ZORDER_TYPE.ZORDER_4;

        // shieldLayer
        if (!this._shieldLayer) {
            this._shieldLayer = cv.action.createShieldLayer(scene, "shieldLayer-gameReview", zorder, cc.Color.BLACK, 255 * 0.3);
            this._shieldLayer.zIndex = zorder;
        }

        // add
        let viewNode = scene.getChildByName(GameReview.gClassName);
        if (!viewNode) {
            viewNode = this.node;
            viewNode.zIndex = zorder;
            viewNode.name = GameReview.gClassName;
            scene.addChild(viewNode);
            this._bInit = true;
        }
        else {
            this._resetView();
        }

        // action
        this._shieldLayer.active = true;
        if (bAnim) {
            cv.action.showAction(this.node,
                cv.action.eMoveActionDir.EMAD_TO_LEFT,
                cv.action.eMoveActionType.EMAT_FADE_IN,
                cv.action.delay_type.NORMAL,
                this._actFunc.bind(this),
                this._actFuncFinish.bind(this), 1 / cc.game.getFrameRate());
        }
        else {
            this.node.active = true;
            this._preUpdateView();
        }
    }

    /**
     * 隐藏
     */
    autoHide(bAnim: boolean = true): void {
        if (!this.isInit()) return;

        if (this.node.active) {
            if (this._shieldLayer) this._shieldLayer.active = false;
            if (this._tGameReplay) this._tGameReplay.autoHide(false);

            if (bAnim) {
                cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                    cv.action.eMoveActionType.EMAT_FADE_OUT, cv.action.delay_type.NORMAL,
                    this._actFunc.bind(this),
                    this._actFuncFinish.bind(this));
            }
            else {
                this.node.active = false;
                this._resetView();
            }
        }
    }

    /**
     * 前一页
     */
    beforePage(): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.isInit()) return;
        if (this._vGameUUID.length <= 1) return;

        let progress: number = Math.max(0, cv.StringTools.minus(this.slider.progress, this._nSliderPerRatio));
        this._setSliderProgress(progress);
        this._updateSliderPercent();
    }

    /**
     * 后一页
     */
    nextPage(): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.isInit()) return;
        if (this._vGameUUID.length <= 1) return;

        let progress: number = Math.min(1, cv.StringTools.plus(this.slider.progress, this._nSliderPerRatio));
        this._setSliderProgress(progress);
        this._updateSliderPercent();
    }

    /**
     * 第一页
     */
    firstPage(): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.isInit()) return;
        if (this._vGameUUID.length <= 1) return;

        this._setSliderProgress(0);
        this._updateSliderPercent();
    }

    /**
     * 最后一页
     */
    lastPage(): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.isInit()) return;
        if (this._vGameUUID.length <= 1) return;

        this._setSliderProgress(1);
        this._updateSliderPercent();
    }

    /**
     * 是否显示举报按钮()
     * @param bShow 
     */
    setShowAudit(bShow: boolean): void {
        this._bShowAudit = bShow;

        if (this.isInit()) {
            this._onMsgUpdateDataHand();
        }
    }

    /**
     * 重置上次保存的牌谱页签
     */
    resetSavePage(): void {
        this._nLastSaveGameUUIDIndex = -1;
    }

    protected onLoad(): void {
        if (!cv.native.isFullScreen()) {
            this.panel_main.getComponent(cc.Widget).top = 50;
        }

        cv.resMgr.adaptWidget(this.node, true);
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget) {
            widget.destroy();
        }

        // 点击 移出ui
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { this.autoHide(); }, this);

        // 翻页
        this.btn_first.node.on("click", (event: cc.Event): void => { this.firstPage(); }, this);
        this.btn_last.node.on("click", (event: cc.Event): void => { this.lastPage(); }, this);
        this.btn_before.node.on("click", (event: cc.Event): void => { this.beforePage(); }, this);
        this.btn_next.node.on("click", (event: cc.Event): void => { this.nextPage(); }, this);

        this.panel_toggle_pot.on("click", this._onClickPanelTogglePot, this);
        this.toggle_pot.node.on("toggle", this._onClickTogglePot, this);

        // 编号/播放/举报/收藏/强制亮牌/发发看
        this.txt_serial.node.on("click", this._onClickSerialNumber, this);
        this.btn_play.node.on("click", this._onClickPlay, this);
        this.btn_audit.node.on("click", this._onClickAudit, this);
        this.btn_collect.node.on("click", this._onClickCollect, this);
        this.btn_forceshow.node.on("click", this._onClickForceShow, this);
        this.btn_sendout.node.on("click", this._onClickSendOut, this);

        // 设置进度条
        this.slider.node.on("slide", this._onSliderEvent, this);

        // 保存顶栏面板字体大小
        this._nTopPanelFontSize = this.txt_pot_word.fontSize;

        // 翻页页签文本原始位置
        this._txt_page_src_pos = cc.v2(this.txt_page.node.position);

        // 滚动复用视图
        this._tableView = this.panel_scrollview.getComponent(TableView);

        // 隐藏相关控件
        this._setForceShowBtnVisible(false);
        this._setSendOutBtnVisible(false);
    }

    protected start(): void {
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
        console.log(`${GameReview.gClassName}: onDestroy`);
    }

    private _registerEvent(): void {
        cv.MessageCenter.register("update_hand", this._onMsgUpdateDataHand.bind(this), this.node);
        cv.MessageCenter.register("update_handMap", this._onMsgUpdateHandMap.bind(this), this.node);
        cv.MessageCenter.register("game_replay_lastHand", this._onMsgLastHand.bind(this), this.node);
        cv.MessageCenter.register("game_replay_nextHand", this._onMsgNextHand.bind(this), this.node);
        cv.MessageCenter.register("show_Audit", this._onMsgShowAudit.bind(this), this.node);
        cv.MessageCenter.register("on_replay_forceshow", this._onMsgForceShow.bind(this), this.node);
        cv.MessageCenter.register("on_replay_sendout", this._onMsgSendOut.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("update_hand", this.node);
        cv.MessageCenter.unregister("update_handMap", this.node);
        cv.MessageCenter.unregister("game_replay_lastHand", this.node);
        cv.MessageCenter.unregister("game_replay_nextHand", this.node);
        cv.MessageCenter.unregister("show_Audit", this.node);
        cv.MessageCenter.unregister("on_replay_forceshow", this.node);
        cv.MessageCenter.unregister("on_replay_sendout", this.node);
    }

    /**
     * 动作前回调
     * @param target 
     * @param actIO 
     */
    private _actFunc(target: cc.Node, actIO: number): void {
    }

    /**
     * 动作后回调
     * @param target 
     * @param actIO 
     */
    private _actFuncFinish(target: cc.Node, actIO: number): void {
        if (!this._tableView.isGeneratePoolInst()) {
            this._tableView.generatePoolInst(GameReviewItem, 1);
            this._tableView.reloadView();
        }

        // 切入
        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this._preUpdateView();
        }
        // 切出
        else {
            this._resetView();
        }
    }

    /**
     * 获取牌局uuid列表
     */
    private _getGameuuids(): string[] {
        let vGameUUID: string[] = [];

        // 数据要深拷贝
        switch (this._dataSourceType) {
            case GameReviewDataType.EDST_NONE:
            case GameReviewDataType.EDST_RECORD: {
                let vHandUUIDList: string[] = gameDataMgr.tGameRecords.tPokerInfoData.vHandUUIDList;
                vGameUUID = vHandUUIDList.slice(0, vHandUUIDList.length);
            } break;

            case GameReviewDataType.EDST_GAMEROOM: {
                let vHandUUIDList: string[] = gameDataMgr.tRoomData.game_uuids_js;
                vGameUUID = vHandUUIDList.slice(0, vHandUUIDList.length);
            } break;

            case GameReviewDataType.EDST_COLLECTION: break;
            default: break;
        }

        return vGameUUID;
    }

    /**
     * 重置视图
     */
    private _resetView(): void {
        this.txt_invalid_data_desc.node.active = false;
        this._nCurGameUUIDIndex = -1;
        this._setSliderProgress(0);

        // 显示前就更新"勾选大pot"设置
        this.panel_toggle_pot.active = false;
        this.txt_page.node.y = this.btn_first.node.y;

        // 获取游戏id
        let gameid: number = 0;
        switch (this._dataSourceType) {
            case GameReviewDataType.EDST_RECORD: {
                gameid = gameDataMgr.tGameRecords.gameID;
            } break;

            case GameReviewDataType.EDST_GAMEROOM: {
                gameid = cv.roomManager.getCurrentGameID();
            } break;

            default: break;
        }

        // 初始化精彩对局状态
        if (gameid > 0) {
            let visible: boolean = true;
            visible &&= this._vGameUUID.length > 0;
            visible &&= !cv.roomManager.checkGameIsZoom(gameid);

            this.panel_toggle_pot.active = visible;
            if (this.panel_toggle_pot.active) {
                // 房间中保留上次勾选状态
                if (this._dataSourceType === GameReviewDataType.EDST_GAMEROOM) {
                    this.toggle_pot.isChecked = this._last_toggle_pot_check_status;
                }
                // 战绩列表中
                else {
                    // 若上次已勾选, 则本次取消勾选且重置牌谱保存的页签
                    if (this._last_toggle_pot_check_status) {
                        this._last_toggle_pot_check_status = false;
                        this.resetSavePage();
                    }

                    // 取消勾选
                    this.toggle_pot.isChecked = this._last_toggle_pot_check_status;
                }

                this.txt_page.node.y = this._txt_page_src_pos.y;

                // 若已勾选则重置"滑条 + 页数"
                if (this.toggle_pot.isChecked) {
                    this._vGameUUID = [];
                    this._setSliderProgress(0);
                }
            }
        }

        // 清理视图
        let t: PokerHandData = new PokerHandData();
        t.reset();
        this._updateDataView(t);

        // 更新静态文本
        this._updateStaticText();
    }

    /**
     * 预更新视图
     */
    private _preUpdateView(): void {
        if (this.panel_toggle_pot.active && this.toggle_pot.isChecked) {
            this._requestBigPotGameUUIDs(this._nLastSaveGameUUIDIndex);
        }
        else {
            this._updateView(this._nLastSaveGameUUIDIndex);
        }
    }

    /**
     * 更新视图 + 数据
     * @param transGameUUIDIndex 跳转第几手牌局索引(默认缺省,主要用于记录下次打开牌谱是的第几手的页签)
     */
    private _updateView(transGameUUIDIndex: number = -1): void {
        // 计算滑条滚动系数
        if (this._vGameUUID.length > 1) {
            this._nSliderPerRatio = cv.StringTools.div(1, this._vGameUUID.length - 1);
        }
        else if (this._vGameUUID.length === 1) {
            this._nSliderPerRatio = 1;
        }

        // 重置牌谱数组当前索引
        this._nCurGameUUIDIndex = -1;
        this._setSliderProgress(this._vGameUUID.length <= 0 ? 0 : 1);

        // 检测保存的页签值
        if (transGameUUIDIndex >= 0) {
            transGameUUIDIndex = Math.min(transGameUUIDIndex, this._vGameUUID.length);
            let progress: number = cv.StringTools.times(transGameUUIDIndex, this._nSliderPerRatio);
            progress = Math.min(1, progress);
            this._setSliderProgress(progress);
        }

        // 更新数据
        this._updateSliderPercent();
        this._onMsgUpdateDataHand();
    }

    /**
     * 更新静态文本描述
     */
    private _updateStaticText(): void {
        this.txt_title.string = cv.config.getStringData("allReview_allReview_panel_review_txt");                        // 标题
        this.txt_pot_word.string = cv.config.getStringData("allReview_allReview_panel_pot_txt");                        // 底池
        this.txt_insurance_word.string = cv.config.getStringData("allReview_allReview_panel_insurance_txt");            // 保险

        let txt_forceshow: cc.Label = this.btn_forceshow.node.getChildByName("txt_title").getComponent(cc.Label);
        txt_forceshow.string = cv.config.getStringData("allReview_allReview_panel_forceshow_txt");                      // 强制亮牌

        let txt_sendout: cc.Label = this.btn_sendout.node.getChildByName("txt_title").getComponent(cc.Label);
        txt_sendout.string = cv.config.getStringData("allReview_allReview_panel_sendout_txt");                          // 强制亮牌

        let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");
        let txt_audit: cc.Label = panel_bottom_top.getChildByName("txt_audit").getComponent(cc.Label);
        txt_audit.string = cv.config.getStringData("allReview_allReview_panel_audit_img_audit_txt");                    // 举报

        let txt_play: cc.Label = panel_bottom_top.getChildByName("txt_play").getComponent(cc.Label);
        txt_play.string = cv.config.getStringData("allReview_allReview_panel_replay_img_replay_txt");                   // 播放

        let txt_collect: cc.Label = panel_bottom_top.getChildByName("txt_collect").getComponent(cc.Label);
        txt_collect.string = cv.config.getStringData("allReview_allReview_panel_collect_img_collect_txt");              // 收藏

        // 精彩对局(大"pot"筛选)
        if (this.panel_toggle_pot.active) {
            let txt_toggle_pot: cc.Label = this.panel_toggle_pot.getChildByName("txt_toggle_pot").getComponent(cc.Label);
            txt_toggle_pot.string = cv.config.getStringData("allReview_allReview_panel_toggle_img_toggle_txt");

            // 大"pot"勾选面板居中
            let offset_x: number = 15;
            let txt_w: number = cv.resMgr.getLabelStringSize(txt_toggle_pot).width;
            this.panel_toggle_pot.setContentSize(txt_w + offset_x + this.toggle_pot.node.width, this.panel_toggle_pot.height);

            // 适配文本和筛选按钮位置
            let x: number = -this.panel_toggle_pot.width * this.panel_toggle_pot.anchorX;
            let y: number = txt_toggle_pot.node.y;
            x += (this.panel_toggle_pot.width - (txt_w + offset_x + this.toggle_pot.node.width)) / 2;
            x += txt_w * txt_toggle_pot.node.anchorX;
            txt_toggle_pot.node.setPosition(x, y);
            x += txt_w * (1 - txt_toggle_pot.node.anchorX);
            x += offset_x;
            x += this.toggle_pot.node.width * this.toggle_pot.node.anchorX;
            this.toggle_pot.node.setPosition(x, y);
        }
    }

    /**
     * 更新 UI 显影状态等
     */
    private _updateUIShowHideStatus() {
        this.btn_play.node.active = true;
        this.btn_audit.node.active = true;
        this.btn_collect.node.active = true;

        this.txt_pot_word.node.active = true;
        this.txt_pot.node.active = true;

        this.txt_insurance_word.node.active = true;
        this.txt_insurance.node.active = true;

        this.txt_jackpot_word.node.active = true;
        this.txt_jackpot.node.active = true;

        // 是否有关联的JP(是否显示JP)
        do {
            let bAssociatedJackpot: boolean = true;
            switch (this._dataSourceType) {
                case GameReviewDataType.EDST_RECORD: {
                    bAssociatedJackpot = gameDataMgr.tGameRecords.tPokerInfoData.tRoomParam.is_associated_jackpot;
                    this._setForceShowBtnVisible(false);
                    this._setSendOutBtnVisible(false);
                } break;

                case GameReviewDataType.EDST_GAMEROOM: {
                    bAssociatedJackpot = gameDataMgr.tRoomData.pkRoomParam.is_associated_jackpot;
                    this.btn_audit.node.active = this._bShowAudit;
                } break;

                case GameReviewDataType.EDST_COLLECTION: {
                    bAssociatedJackpot = gameDataMgr.tCollectPokerMapData.tPokerHandData.bAssociatedJackpot;
                    this._setForceShowBtnVisible(false);
                    this._setSendOutBtnVisible(false);
                } break;

                case GameReviewDataType.EDST_NONE: break;
                default: break;
            }
            this.txt_jackpot_word.node.active = bAssociatedJackpot;
            this.txt_jackpot.node.active = bAssociatedJackpot;
        } while (false);

        if (this._dataSourceType === GameReviewDataType.EDST_COLLECTION) {
            this.btn_audit.node.active = false;
            this.btn_collect.node.active = false;
        }

        let gameid = gameDataMgr.tGameRecords.tPokerHandData.nGameid;
        if (gameid === 0) {
            gameid = cv.roomManager.getCurrentGameID();
        }

        if (gameid === 0) {
            this.btn_audit.node.active = false;
            this._setForceShowBtnVisible(false);
            this._setSendOutBtnVisible(false);
        }
        else if (gameid === cv.Enum.GameId.Allin) {
            this.btn_audit.node.active = false;
            this._setForceShowBtnVisible(false);
            this._setSendOutBtnVisible(false);

            this.txt_insurance_word.node.active = false;
            this.txt_insurance.node.active = false;

            this.txt_jackpot_word.node.active = true;
            this.txt_jackpot.node.active = true;
        }
        else if (cv.roomManager.checkGameIsZoom(gameid)) {
            this.btn_audit.node.active = false;
            this.btn_collect.node.active = false;
            this._setSendOutBtnVisible(false);                  // 急速牌桌无发发看, 所以这里就屏蔽入口

            this.txt_jackpot_word.node.active = false;
            this.txt_jackpot.node.active = false;
        }

        // 更新"强制亮牌/发发看"等按钮等位置
        this._layoutForceShowAndSendOutBtn();

        // 更新"举报/播放/收藏"等按钮等位置
        do {
            let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");
            let txt_audit: cc.Label = panel_bottom_top.getChildByName("txt_audit").getComponent(cc.Label);
            txt_audit.node.active = this.btn_audit.node.active;
            let txt_play: cc.Label = panel_bottom_top.getChildByName("txt_play").getComponent(cc.Label);
            txt_play.node.active = this.btn_play.node.active;
            let txt_collect: cc.Label = panel_bottom_top.getChildByName("txt_collect").getComponent(cc.Label);
            txt_collect.node.active = this.btn_collect.node.active;

            // 从右往左排版
            let offset_x_sides: number = 20;
            let offset_x_nextto: number = 0;
            let offset_x_middle: number = 42;

            let start_x: number = panel_bottom_top.x + panel_bottom_top.width * panel_bottom_top.scaleX * panel_bottom_top.anchorX;
            let pos_x: number = start_x - offset_x_sides;
            let pos_y: number = 0;

            // 收藏
            if (this.btn_collect.node.active) {
                pos_x -= cv.resMgr.getLabelStringSize(txt_collect).width * txt_collect.node.scaleX * (1 - txt_collect.node.anchorX);
                txt_collect.node.setPosition(pos_x, pos_y);
                pos_x -= cv.resMgr.getLabelStringSize(txt_collect).width * txt_collect.node.scaleX * txt_collect.node.anchorX;
                pos_x -= offset_x_nextto;
                pos_x -= this.btn_collect.node.width * this.btn_collect.node.scaleX * (1 - this.btn_collect.node.anchorX);
                this.btn_collect.node.setPosition(pos_x, pos_y);
                pos_x -= this.btn_collect.node.width * this.btn_collect.node.scaleX * this.btn_collect.node.anchorX;
                pos_x -= offset_x_middle;
            }

            // 播放
            if (this.btn_play.node.active) {
                pos_x -= cv.resMgr.getLabelStringSize(txt_play).width * txt_play.node.scaleX * (1 - txt_play.node.anchorX);
                txt_play.node.setPosition(pos_x, pos_y);
                pos_x -= cv.resMgr.getLabelStringSize(txt_play).width * txt_play.node.scaleX * txt_play.node.anchorX;
                pos_x -= offset_x_nextto;
                pos_x -= this.btn_play.node.width * this.btn_play.node.scaleX * (1 - this.btn_play.node.anchorX);
                this.btn_play.node.setPosition(pos_x, pos_y);
                pos_x -= this.btn_play.node.width * this.btn_play.node.scaleX * this.btn_play.node.anchorX;
                pos_x -= offset_x_middle;
            }

            // 举报
            if (this.btn_audit.node.active) {
                pos_x -= cv.resMgr.getLabelStringSize(txt_audit).width * txt_audit.node.scaleX * (1 - txt_audit.node.anchorX);
                txt_audit.node.setPosition(pos_x, pos_y);
                pos_x -= cv.resMgr.getLabelStringSize(txt_audit).width * txt_audit.node.scaleX * txt_audit.node.anchorX;
                pos_x -= offset_x_nextto;
                pos_x -= this.btn_audit.node.width * this.btn_audit.node.scaleX * (1 - this.btn_audit.node.anchorX);
                this.btn_audit.node.setPosition(pos_x, pos_y);
                pos_x -= this.btn_audit.node.width * this.btn_audit.node.scaleX * this.btn_audit.node.anchorX;
                pos_x -= offset_x_middle;
            }
        } while (false);
    }

    /**
     * 更新 强制亮牌 按钮 显隐状态
     * @param data 
     */
    private _updateForceShowState(data: PokerHandData): void {
        let ret: boolean = false;

        if (this._vGameUUID.length > 0                                                                  // 有牌谱数据
            && data.bForceShowcard                                                                      // 该手牌局是否开启"强制亮牌"功能
            && this._sCurGameUUID !== this._sGameSettlementUUID) {                                      // 当前手不是牌桌正在结算的那一手

            let totalHand: number = this._vGameUUID.length;
            let curHand: number = this._nCurGameUUIDIndex + 1;
            let recentHandCount: number = this._sGameSettlementUUID !== "" ? 4 : 3;                     // 最近3手(若当前局正在结算则是4手)
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

        this._setForceShowBtnVisible(ret);
    }

    /**
     * 更新 发发看 按钮 显影状态
     * @param data 
     */
    private _updateSendOutState(data: PokerHandData): void {
        let ret: boolean = false;

        // 当前手不是牌桌正在结算的那一手),,老数据nReviewSendOutLen为空
        if (this._vGameUUID.length > 0
            && this._sCurGameUUID !== this._sGameSettlementUUID) {                                          // 当前手不是牌桌正在结算的那一手

            // 兼容牌局中历史回顾老数据
            // 直接读取 data 服原始 json 字段去判断是否为老版本数据
            // unsend_public_cards 为空2种情况(老数据;未发牌为0;都满足不显示的条件)
            let bOldData: boolean = false;
            let gameHandMapData: any = gameDataMgr.tGameRecords.mHandMapCache.get(gameDataMgr.tGameRecords.tPokerHandData.sGameUUID);
            if (gameHandMapData) {
                let unsend_public_cards: any = gameHandMapData.game_record.unsend_public_cards;
                if (unsend_public_cards === null || typeof unsend_public_cards === "undefined") {
                    bOldData = true;
                }
            }

            if (!bOldData) {
                let totalHand: number = this._vGameUUID.length;
                let curHand: number = this._nCurGameUUIDIndex + 1;
                let recentHandCount: number = this._sGameSettlementUUID !== "" ? 4 : 3;                     // 最近3手(若当前局正在结算则是4手)
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

        this._setSendOutBtnVisible(ret);
    }

    /**
     * 更新"强制亮牌/发发看"等按钮等位置
     */
    private _layoutForceShowAndSendOutBtn(): void {
        let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");

        // 从左往右排版
        let offset_x_sides: number = 30;
        let offset_x_nextto: number = 30;

        let start_x: number = panel_bottom_top.x + panel_bottom_top.width * panel_bottom_top.scaleX * -panel_bottom_top.anchorX;
        let pos_x: number = start_x + offset_x_sides;

        // 强制亮牌
        if (this.btn_forceshow.node.active) {
            pos_x += this.btn_forceshow.node.width * this.btn_forceshow.node.scaleX * this.btn_forceshow.node.anchorX;
            this.btn_forceshow.node.setPosition(pos_x, this.btn_forceshow.node.y);

            let ctx_forceshow: cc.Node = panel_bottom_top.getChildByName("ctx_forceshow");
            ctx_forceshow.setPosition(pos_x, ctx_forceshow.y);

            pos_x += this.btn_forceshow.node.width * this.btn_forceshow.node.scaleX * (1 - this.btn_forceshow.node.anchorX);
            pos_x += offset_x_nextto;
        }

        // 发发看
        if (this.btn_sendout.node.active) {
            pos_x += this.btn_sendout.node.width * this.btn_sendout.node.scaleX * this.btn_sendout.node.anchorX;
            this.btn_sendout.node.setPosition(pos_x, this.btn_sendout.node.y);

            let ctx_sendout: cc.Node = panel_bottom_top.getChildByName("ctx_sendout");
            ctx_sendout.setPosition(pos_x, ctx_sendout.y);

            pos_x += this.btn_sendout.node.width * this.btn_sendout.node.scaleX * (1 - this.btn_sendout.node.anchorX);
            pos_x += offset_x_nextto;
        }
    }

    /**
     * 更新"强制亮牌"所需金额
     */
    private _updateForceShowCoin(): void {
        if (!this.btn_forceshow.node.active) return;

        let nCount: number = gameDataMgr.tRoomData.pkPayMoneyItem.showCardCount + 1;
        let vFee: FeeItem[] = gameDataMgr.tRoomData.pkPayMoneyItem.showCardCountsFee;

        let nPrice: number = 0;
        let bLayout: boolean = false;
        for (let i = 0; i < cv.StringTools.getArrayLength(vFee); ++i) {
            if (nCount >= vFee[i].startCount && nCount <= vFee[i].endCount) {
                nPrice = vFee[i].needCoin;
                break;
            }
        }

        // 延时价格
        let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");
        let ctx_forceshow: cc.Node = panel_bottom_top.getChildByName("ctx_forceshow");
        let txt_forceshow_coin: cc.Label = ctx_forceshow.getChildByName("txt_coin").getComponent(cc.Label);
        bLayout = nPrice !== cv.Number(txt_forceshow_coin.string);
        txt_forceshow_coin.string = cv.StringTools.serverGoldToShowString(nPrice);

        // 排版
        if (bLayout) {
            let txt_size: cc.Size = cv.resMgr.getLabelStringSize(txt_forceshow_coin);
            let img_forceshow_coin: cc.Sprite = ctx_forceshow.getChildByName("img_coin").getComponent(cc.Sprite);
            let start_x: number = ctx_forceshow.width * ctx_forceshow.scaleX * -ctx_forceshow.anchorX;
            let pos_x: number = start_x;
            let offset_x_sides: number = 0;
            let offset_x_middle: number = 15;

            let left_w: number = ctx_forceshow.width - img_forceshow_coin.node.width * img_forceshow_coin.node.scaleX - txt_size.width * txt_forceshow_coin.node.scaleX;
            offset_x_middle = Math.min(offset_x_middle, left_w / 3);
            offset_x_sides = (left_w - offset_x_middle) / 2;

            pos_x += offset_x_sides + img_forceshow_coin.node.width * img_forceshow_coin.node.scaleX * img_forceshow_coin.node.anchorX;
            img_forceshow_coin.node.setPosition(pos_x, img_forceshow_coin.node.y);
            pos_x += img_forceshow_coin.node.width * img_forceshow_coin.node.scaleX * (1 - img_forceshow_coin.node.anchorX);

            pos_x += offset_x_middle + txt_size.width * txt_forceshow_coin.node.anchorX;
            txt_forceshow_coin.node.setPosition(pos_x, txt_forceshow_coin.node.y);
        }
    }

    /**
     * 更新"发发看"所需金额
     */
    private _updateSendOutCoin(): void {
        if (!this.btn_sendout.node.active) return;

        let nReviewSendOutLen: number = 0;
        let vFee: FeeItem[] = gameDataMgr.tRoomData.pkPayMoneyItem.showLeftCardFee;
        let vRecord: PlayerRecord[] = gameDataMgr.tGameRecords.tPokerHandData.vPlayerRecords;
        for (let i = 0; i < vRecord.length; ++i) {
            if (vRecord[i].nPlayerID === cv.dataHandler.getUserData().u32Uid) {
                nReviewSendOutLen = vRecord[i].nReviewSendOutLen;
                break;
            }
        }

        let nIdx: number = 0;
        switch (nReviewSendOutLen) {
            case 0: nIdx = 0; break;
            case 3: nIdx = 1; break;
            case 4: nIdx = 2; break;
            case 5: nIdx = 3; break;
            default: break;
        }

        let nPrice: number = 0;
        let bLayout: boolean = false;
        if (nIdx >= 0 && nIdx < vFee.length) {
            nPrice = vFee[nIdx].needCoin;
        }

        // 延时价格
        let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");
        let ctx_sendout: cc.Node = panel_bottom_top.getChildByName("ctx_sendout");
        let txt_sendout_coin: cc.Label = ctx_sendout.getChildByName("txt_coin").getComponent(cc.Label);
        bLayout = nPrice !== cv.Number(txt_sendout_coin.string);
        txt_sendout_coin.string = cv.StringTools.serverGoldToShowString(nPrice);

        // 排版
        if (bLayout) {
            let txt_size: cc.Size = cv.resMgr.getLabelStringSize(txt_sendout_coin);
            let img_sendout_coin: cc.Sprite = ctx_sendout.getChildByName("img_coin").getComponent(cc.Sprite);
            let start_x: number = ctx_sendout.width * ctx_sendout.scaleX * -ctx_sendout.anchorX;
            let pos_x: number = start_x;
            let offset_x_sides: number = 0;
            let offset_x_middle: number = 15;

            let left_w: number = ctx_sendout.width - img_sendout_coin.node.width * img_sendout_coin.node.scaleX - txt_size.width * txt_sendout_coin.node.scaleX;
            offset_x_middle = Math.min(offset_x_middle, left_w / 3);
            offset_x_sides = (left_w - offset_x_middle) / 2;

            pos_x += offset_x_sides + img_sendout_coin.node.width * img_sendout_coin.node.scaleX * img_sendout_coin.node.anchorX;
            img_sendout_coin.node.setPosition(pos_x, img_sendout_coin.node.y);
            pos_x += img_sendout_coin.node.width * img_sendout_coin.node.scaleX * (1 - img_sendout_coin.node.anchorX);

            pos_x += offset_x_middle + txt_size.width * txt_sendout_coin.node.anchorX;
            txt_sendout_coin.node.setPosition(pos_x, txt_sendout_coin.node.y);
        }
    }

    /**
     * 设置滑条进度
     * @param progress 
     */
    private _setSliderProgress(progress: number): void {
        this.slider.progress = progress;
        this.slider_sp.node.width = cv.StringTools.times(this.slider.progress, this.slider.node.width);
    }

    /**
     * 更新滑条视图
     */
    private _updateSliderPercent(): void {
        this._nLastSliderProgress = this.slider.progress;

        // 牌谱数组当前索引
        let nCurIndex: number = 0;
        if (this._vGameUUID.length > 1) {
            nCurIndex = Math.round(cv.StringTools.div(this.slider.progress, this._nSliderPerRatio));
        }

        // 刷新翻页后的数据
        if (this._nCurGameUUIDIndex !== nCurIndex) {
            this._nCurGameUUIDIndex = nCurIndex;
            this._nLastSaveGameUUIDIndex = nCurIndex;
            this._onMsgUpdateDataHand();
        }
    }

    /**
     * 更新视图 - 数据显示
     * @param pokerHandData 
     */
    private _updateDataView(pokerHandData: PokerHandData): void {
        // 显示页数
        let nCurPage = this._vGameUUID.length > 0 ? this._nCurGameUUIDIndex + 1 : 0;
        this.txt_page.string = cv.StringTools.formatC("%d/%d", nCurPage, this._vGameUUID.length);

        this._updateForceShowState(pokerHandData);
        this._updateSendOutState(pokerHandData);
        this._updateUIShowHideStatus();

        this.txt_time.string = "";
        this.txt_time.node.active = false;

        this.txt_serial.string = "";
        this.txt_serial.node.active = false;

        // 时间/编号
        if (pokerHandData) {
            // 时间(格式: y-M-D H:M)
            let format_time: string = cv.StringTools.formatTime(pokerHandData.nCreateTime, cv.Enum.eTimeType.Year_Month_Day_Hour_Min);
            this.txt_time.string = format_time;
            this.txt_time.node.active = this.txt_time.string.length > 0;

            // 编号
            let format_key: string = cv.config.getStringData("allReview_allReview_panel_serial_number_text");
            this.txt_serial.string = cv.StringTools.formatC(format_key, pokerHandData.sGameUUID);
            this.txt_serial.node.active = pokerHandData.sGameUUID.length > 0;
        }

        // 适配"时间/编号"文本排版(从右至左排版)
        do {
            let fontSize: number = 30;
            let offset_side: number = 20;
            let offset_middle: number = 25;

            let panel: cc.Node = this.txt_serial.node.parent;
            let criticalWidth: number = (0 - panel.anchorX) * panel.width;

            // 适用于: 横向任意锚点, 纵向锚点"0.5"
            let x: number = 0;

            do {
                x = (1 - panel.anchorX) * panel.width;
                x -= offset_side;

                if (this.txt_time.node.active) {
                    this.txt_time.fontSize = fontSize;
                    let txt_time_w: number = cv.resMgr.getLabelStringSize(this.txt_time).width;
                    x -= txt_time_w * (1 - this.txt_time.node.anchorX) * this.txt_time.node.scaleX;
                    this.txt_time.node.setPosition(x, this.txt_time.node.y);
                    x -= txt_time_w * this.txt_time.node.anchorX * this.txt_time.node.scaleX;
                    if (txt_time_w > 0) x -= offset_middle;
                }

                if (this.txt_serial.node.active) {
                    this.txt_serial.fontSize = fontSize;
                    let txt_serial_w: number = cv.resMgr.getLabelStringSize(this.txt_serial).width;
                    x -= txt_serial_w * (1 - this.txt_serial.node.anchorX) * this.txt_serial.node.scaleX;
                    this.txt_serial.node.setPosition(x, this.txt_serial.node.y);
                    x -= txt_serial_w * this.txt_serial.node.anchorX * this.txt_serial.node.scaleX;
                }

                x -= offset_side;
                --fontSize
            } while (x < criticalWidth);
        } while (false);

        // 底池
        if (this.txt_pot.node.active) {
            let value: number = 0;
            if (pokerHandData) {
                value = cv.StringTools.clientGoldByServer(pokerHandData.nTotalPot);
            }
            this.txt_pot.string = cv.StringTools.numberToShowString(value);
        }

        // 保险
        if (this.txt_insurance.node.active) {
            let value: number = 0;
            if (pokerHandData) {
                value = cv.StringTools.serverGoldToShowNumber(pokerHandData.nInsuranceWinbet);
            }
            this.txt_insurance.string = cv.StringTools.getSignString(value);
            this.txt_insurance.node.color = cv.StringTools.getSignColor(value);
        }

        // jackpot
        if (this.txt_jackpot.node.active) {
            let value: number = 0;
            if (pokerHandData) {
                value = cv.StringTools.serverGoldToShowNumber(pokerHandData.nJackpotWinbet);
            }
            this.txt_jackpot.string = cv.StringTools.getSignString(value);
            this.txt_jackpot.node.color = cv.StringTools.getSignColor(value);
        }

        // 适配"底池, 保险, JP"文本排版(从左至右排版)
        do {
            let fontSize: number = this._nTopPanelFontSize + 1;
            let panel: cc.Node = this.panel_top;

            let offsetMin: number = 10;             // 最小均分值
            let offsetMiddle: number = 0;           // 最终均分值
            let offsetNextto: number = 10;          // 毗邻间距

            // 计算均分值(适用于: 横向任意锚点, 纵向锚点"0.5")
            do {
                --fontSize;
                let w: number = 0;
                let count: number = 0;

                if (this.txt_pot.node.active) {
                    ++count;

                    this.txt_pot_word.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this.txt_pot_word).width * this.txt_pot_word.node.scaleX;
                    w += offsetNextto;

                    this.txt_pot.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this.txt_pot).width * this.txt_pot.node.scaleX;
                }

                if (this.txt_insurance.node.active) {
                    ++count;

                    this.txt_insurance_word.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this.txt_insurance_word).width * this.txt_insurance_word.node.scaleX;
                    w += offsetNextto;

                    this.txt_insurance.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this.txt_insurance).width * this.txt_insurance.node.scaleX;
                }

                if (this.txt_jackpot.node.active) {
                    ++count;

                    this.txt_jackpot_word.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this.txt_jackpot_word).width * this.txt_jackpot_word.node.scaleX;
                    w += offsetNextto;

                    this.txt_jackpot.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this.txt_jackpot).width * this.txt_jackpot.node.scaleX;
                }

                offsetMiddle = (panel.width - w) / (count + 1);
            } while (offsetMiddle < offsetMin);

            // 设置位置
            let x: number = 0;
            let y: number = (0.5 - panel.anchorY) * panel.height;
            x = (0 - panel.anchorX) * panel.width;
            x += offsetMiddle;
            if (this.txt_pot.node.active) {
                let txt_pot_word_w: number = cv.resMgr.getLabelStringSize(this.txt_pot_word).width;
                x += txt_pot_word_w * this.txt_pot_word.node.anchorX * this.txt_pot_word.node.scaleX;
                this.txt_pot_word.node.setPosition(x, y);
                x += txt_pot_word_w * (1 - this.txt_pot_word.node.anchorX) * this.txt_pot_word.node.scaleX;

                let txt_pot_w: number = cv.resMgr.getLabelStringSize(this.txt_pot).width;
                x += offsetNextto;
                x += txt_pot_w * this.txt_pot.node.anchorX * this.txt_pot.node.scaleX;
                this.txt_pot.node.setPosition(x, y);
                x += txt_pot_w * (1 - this.txt_pot.node.anchorX) * this.txt_pot.node.scaleX;
                x += offsetMiddle;
            }

            if (this.txt_insurance.node.active) {
                let txt_insurance_word_w: number = cv.resMgr.getLabelStringSize(this.txt_insurance_word).width;
                x += txt_insurance_word_w * this.txt_insurance_word.node.anchorX * this.txt_insurance_word.node.scaleX;
                this.txt_insurance_word.node.setPosition(x, y);
                x += txt_insurance_word_w * (1 - this.txt_insurance_word.node.anchorX) * this.txt_insurance_word.node.scaleX;

                let txt_insurance_w: number = cv.resMgr.getLabelStringSize(this.txt_insurance).width;
                x += offsetNextto;
                x += txt_insurance_w * this.txt_insurance.node.anchorX * this.txt_insurance.node.scaleX;
                this.txt_insurance.node.setPosition(x, y);
                x += txt_insurance_w * (1 - this.txt_insurance.node.anchorX) * this.txt_insurance.node.scaleX;
                x += offsetMiddle;
            }

            if (this.txt_jackpot.node.active) {
                let txt_jackpot_word_w: number = cv.resMgr.getLabelStringSize(this.txt_jackpot_word).width;
                x += txt_jackpot_word_w * this.txt_jackpot_word.node.anchorX * this.txt_jackpot_word.node.scaleX;
                this.txt_jackpot_word.node.setPosition(x, y);
                x += txt_jackpot_word_w * (1 - this.txt_jackpot_word.node.anchorX) * this.txt_jackpot_word.node.scaleX;

                let txt_jackpot_w: number = cv.resMgr.getLabelStringSize(this.txt_jackpot).width;
                x += offsetNextto;
                x += txt_jackpot_w * this.txt_jackpot.node.anchorX * this.txt_jackpot.node.scaleX;
                this.txt_jackpot.node.setPosition(x, y);
                x += txt_jackpot_w * (1 - this.txt_jackpot.node.anchorX) * this.txt_jackpot.node.scaleX;
            }
        } while (false);

        // 更新子项列表视图
        this._updateTableView(pokerHandData);

        // 检测是否发送"更新播放牌局回顾"消息
        this._bHasReplayData = false;
        if (pokerHandData && pokerHandData.objReplay) {
            this._bHasReplayData = true;
        }

        let param: { uuid: string, hasReplayData: boolean } = { uuid: this._sCurGameUUID, hasReplayData: this._bHasReplayData };
        cv.MessageCenter.send("update_replay_data", param);
    }

    /**
     * 更新视图 - 子项列表
     * @param pokerHandData 
     */
    private _updateTableView(pokerHandData: PokerHandData): void {
        // 填充数据
        let objs: any[] = [];
        if (pokerHandData) {
            let nCount: number = pokerHandData.vPlayerRecords.length;
            for (let i = 0; i < nCount; ++i) {
                let type: number = 0;
                let tData: GameReviewItemData = new GameReviewItemData();
                tData.nGameID = pokerHandData.nGameid;
                tData.sGameUUID = pokerHandData.sGameUUID;
                tData.nGameMode = pokerHandData.nGameMode;
                tData.objReplay = pokerHandData.objReplay;
                tData.nShortFull = pokerHandData.nShortFull;
                tData.vPubsCards = pokerHandData.vPublicCards;
                tData.vUnsendPublicCards = pokerHandData.vUnsendPublicCards;

                tData.nPlayerID = pokerHandData.vPlayerRecords[i].nPlayerID;
                tData.sPlayerName = pokerHandData.vPlayerRecords[i].sPlayerName;
                tData.sPlayerHead = pokerHandData.vPlayerRecords[i].sPlayerHead;
                tData.plat = pokerHandData.vPlayerRecords[i].plat;
                tData.nWinBet = pokerHandData.vPlayerRecords[i].nWinBet;
                tData.nInsuranceBet = pokerHandData.vPlayerRecords[i].nInsuranceBet;
                tData.nInsuranceAmount = pokerHandData.vPlayerRecords[i].nInsuranceAmount;
                tData.nPlayerBettingRoundBet = pokerHandData.vPlayerRecords[i].nPlayerBettingRoundBet;
                tData.bMuck = pokerHandData.vPlayerRecords[i].bMuck;
                tData.bActiveShow = pokerHandData.vPlayerRecords[i].bActiveShow;
                tData.bForceShowDown = pokerHandData.vPlayerRecords[i].bForceShowDown;
                tData.nLastRoundType = pokerHandData.vPlayerRecords[i].nLastRoundType;
                tData.vHandCards = pokerHandData.vPlayerRecords[i].vCards;
                tData.seatNo = pokerHandData.vPlayerRecords[i].seatNo;
                tData.seatInfo = pokerHandData.vPlayerRecords[i].seatInfo;
                tData.bFold = pokerHandData.vPlayerRecords[i].bFold;
                tData.nReviewSendOutLen = pokerHandData.vPlayerRecords[i].nReviewSendOutLen;
                tData.nForceShowedActLen = pokerHandData.vPlayerRecords[i].nForceShowedActLen;
                tData.nReviewSendOutActLen = pokerHandData.vPlayerRecords[i].nReviewSendOutActLen;
                pokerHandData.vPlayerRecords[i].nForceShowedActLen = 0;
                pokerHandData.vPlayerRecords[i].nReviewSendOutActLen = 0;

                // 添加"JP"详情数据
                if (this.txt_jackpot.node.active) {
                    tData.nJackWinbet = pokerHandData.vPlayerRecords[i].nJackWinbet;
                }

                switch (tData.nGameID) {
                    case cv.Enum.GameId.Plo: type = 1; break;
                    default: type = 0; break;
                }

                objs.push({ prefab_type: type, prefab_component: GameReviewItem, prefab_datas: tData });
            }
        }

        // 刷新ui
        this._tableView.bindData(objs);
        if (this._tableView.isGeneratePoolInst()) this._tableView.reloadView();
    }

    /**
     * 设置"强制亮牌"显隐
     * @param visible 
     */
    private _setForceShowBtnVisible(visible: boolean): void {
        let layout: boolean = this.btn_forceshow.node.active !== visible;
        this.btn_forceshow.node.active = visible;

        let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");
        let ctx_forceshow: cc.Node = panel_bottom_top.getChildByName("ctx_forceshow");
        ctx_forceshow.active = this.btn_forceshow.node.active;

        if (layout) {
            this._layoutForceShowAndSendOutBtn();
        }

        this._updateForceShowCoin();
    }

    /**
     * 设置"发发看"显隐
     * @param visible 
     */
    private _setSendOutBtnVisible(visible: boolean): void {
        let layout: boolean = this.btn_sendout.node.active !== visible;
        this.btn_sendout.node.active = visible;

        let panel_bottom_top: cc.Node = this.panel_bottom.getChildByName("panel_top");
        let ctx_sendout: cc.Node = panel_bottom_top.getChildByName("ctx_sendout");
        ctx_sendout.active = this.btn_sendout.node.active;

        if (layout) {
            this._layoutForceShowAndSendOutBtn();
        }

        this._updateSendOutCoin();
    }

    /**
     * 刷新(拉取)数据
     */
    private _onMsgUpdateDataHand(): void {
        if (this._vGameUUID.length <= 0) {
            this._updateDataView(null);
        }
        else {
            // 获取牌局uuid
            let nIndex: number = this._nCurGameUUIDIndex;
            if (nIndex < 0 || nIndex >= this._vGameUUID.length) return;
            this._sCurGameUUID = this._vGameUUID[nIndex];

            // 请求牌局数据
            let uid: number = cv.dataHandler.getUserData().u32Uid;
            switch (this._dataSourceType) {
                case GameReviewDataType.EDST_NONE: break;

                case GameReviewDataType.EDST_RECORD: {
                    if (gameDataMgr.tGameRecords.hasJsonValue(this._sCurGameUUID)) {
                        let value: string = gameDataMgr.tGameRecords.mHandMapCache.get(this._sCurGameUUID);
                        cv.httpHandler._onGameHand(value);
                    }
                    else {
                        let gameid: number = gameDataMgr.tGameRecords.gameID;
                        if (gameid === 0) {
                            gameid = cv.roomManager.getCurrentGameID();
                        }
                        cv.httpHandler.requestGameHand(uid, this._sCurGameUUID, gameid);
                    }
                } break;

                case GameReviewDataType.EDST_GAMEROOM: {
                    // 游戏中即时写入牌谱时 读缓存会造成玩家秀牌 无法刷新的bug, 所以这里采用及时请求
                    let gameid: number = gameDataMgr.tGameRecords.gameID;
                    if (gameid === 0) {
                        gameid = cv.roomManager.getCurrentGameID();
                    }

                    cv.httpHandler.requestGameHand(uid, this._sCurGameUUID, gameid);
                } break;

                case GameReviewDataType.EDST_COLLECTION: {
                    if (gameDataMgr.tCollectPokerMapData.hasJsonValue(this._sCurGameUUID)) {
                        let value: string = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(this._sCurGameUUID);
                        cv.httpHandler._onFavoriteHand(value);
                    }
                    else {
                        cv.httpHandler.requestFavoriteHand(uid, this._sCurGameUUID);
                    }
                } break;

                default: break;
            }
        }
    }

    /**
     * 请求"gameuuid"数据 回调
     * @param err_code 错误码(非0表示无效数据)
     */
    private _onMsgUpdateHandMap(err_code: number): void {
        let tPokerHandData: PokerHandData = null;
        switch (this._dataSourceType) {
            case GameReviewDataType.EDST_RECORD:
            case GameReviewDataType.EDST_GAMEROOM: {
                tPokerHandData = gameDataMgr.tGameRecords.tPokerHandData;
            } break;

            case GameReviewDataType.EDST_COLLECTION: {
                tPokerHandData = gameDataMgr.tCollectPokerMapData.tPokerHandData;
            } break;

            case GameReviewDataType.EDST_NONE: break;
            default: break;
        }
        if (!tPokerHandData) tPokerHandData = new PokerHandData();
        if (this._vGameUUID.length <= 0) tPokerHandData.reset();

        this._updateDataView(tPokerHandData);

        // 标记该手牌局数据真实有效性
        let is_valid_data: boolean = err_code === 0;
        let key: string = cv.config.getStringData("game_review_favor_detail_invalid_data_txt");
        this.txt_invalid_data_desc.string = `${key}[${err_code}]`
        this.txt_invalid_data_desc.node.active = !is_valid_data;
    }

    /**
     * 请求大pot的"gameuuid"数据
     * @param transGameUUIDIndex 跳转第几手牌局索引(默认缺省, 这里主要是传递参数至回调函数里)
     */
    private _requestBigPotGameUUIDs(transGameUUIDIndex: number = -1): void {
        let gameid: number = 0;
        let roomUuidJs: string = "";
        let isReq: boolean = true;

        switch (this._dataSourceType) {
            case GameReviewDataType.EDST_RECORD: {
                gameid = gameDataMgr.tGameRecords.gameID;
                roomUuidJs = gameDataMgr.tGameRecords.tPokerInfoData.sRoomUUID;
            } break;

            case GameReviewDataType.EDST_GAMEROOM: {
                gameid = cv.roomManager.getCurrentGameID();
                roomUuidJs = cv.GameDataManager.tRoomData.roomUuidJs;
            } break;

            default: isReq = false; break;
        }

        if (isReq) {
            cv.httpHandler.requestBigPotGameUUIDs(roomUuidJs, gameid, this._onMsgBigPotGameUUIDs.bind(this, transGameUUIDIndex));
        }
    }

    /**
     * 请求大pot的"gameuuid"数据 - 回调
     * @param transGameUUIDIndex 
     * @param value 
     */
    private _onMsgBigPotGameUUIDs(transGameUUIDIndex: number, value: any): void {
        // 确保下匿名回调回来的时候该类实例还有效
        if (!cv.tools.isValidNode(this.node)) return;

        // let uid: number = cv.Number(value.uid);
        // let room_uuid_js: string = cv.String(value.room_uuid_js);
        let game_uuids_js: string[] = [];
        if (Array.isArray(value.game_uuids_js)) game_uuids_js = value.game_uuids_js.slice(0, value.game_uuids_js.length);

        this._vGameUUID = game_uuids_js;
        this._updateView(transGameUUIDIndex);
    }

    /**
     * 滑条滑动事件
     * @param event 
     */
    private _onSliderEvent(event: cc.Event): void {
        if (this._vGameUUID.length <= 1) {
            this._setSliderProgress(this._vGameUUID.length === 1 ? 1 : 0);
            this._updateSliderPercent();
            return;
        }

        let nPer = this._nSliderPerRatio;
        let offset: number = this._nLastSliderProgress - this.slider.progress;
        let progress: number = this._nLastSliderProgress;

        // 过滤一下偏移距离, 否则距离太短会出现闪烁
        if (Math.abs(offset) >= nPer / 2) {
            // 前进
            if (this.slider.progress >= this._nLastSliderProgress) {
                let count = Math.ceil(this.slider.progress / nPer);
                progress = Math.min(1, nPer * count);
            }
            // 回退
            else {
                let count = Math.floor(this.slider.progress / nPer);
                progress = Math.max(0, nPer * count);
            }
        }

        this._setSliderProgress(progress);
        this._updateSliderPercent();
    }

    /**
     * 上一手
     */
    private _onMsgLastHand(): void {
        this.beforePage();
    }

    /**
     * 下一手
     */
    private _onMsgNextHand(): void {
        this.nextPage();
    }

    /**
     * 打开举报面板消息回调(关闭牌谱面板)
     */
    private _onMsgShowAudit(): void {
        this.autoHide();
    }

    /**
     * 强制亮牌消息回调(该功能入口只针对牌局中)
     * @param data 
     */
    private _onMsgForceShow(data: game_pb.NoticeReplayForceShowCard): void {
        let selfid: number = data.playerid;
        let game_uuid: string = gameDataMgr.tGameRecords.tPokerHandData.sGameUUID;
        if (selfid !== cv.dataHandler.getUserData().u32Uid || !gameDataMgr.tGameRecords.mHandMapCache.has(game_uuid)) {
            console.error(`${GameReview.gClassName} - error: response forceshow data faild`);
            return;
        }

        // 刷新"手牌"缓存
        let freshCardsCache: (uid: number, cards: game_pb.CardItem[], replayData: any, records: game_pb.HandRecord[]) => void
            = (uid: number, cards: game_pb.CardItem[], replayData: any, records: game_pb.HandRecord[]): void => {

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
                for (let i = 0; i < cv.StringTools.getArrayLength(data.show_seats); ++i) {
                    let uid: number = cv.Number(data.show_seats[i].uid);
                    let cards: game_pb.CardItem[] = data.show_seats[i].cards;
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
                for (let i = 0; i < cv.StringTools.getArrayLength(data.show_seats); ++i) {
                    let uid: number = cv.Number(data.show_seats[i].uid);
                    let cards: game_pb.CardItem[] = data.show_seats[i].cards;
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

        // 更新当下牌谱状态(下发的全是其他人的手牌)
        do {
            // 当前牌谱(牌局中)
            let tPokerHandData: PokerHandData = gameDataMgr.tGameRecords.tPokerHandData;

            // 更新手牌
            for (let i = 0; i < cv.StringTools.getArrayLength(data.show_seats); ++i) {
                let uid: number = cv.Number(data.show_seats[i].uid);
                let cards: game_pb.ICardItem[] = data.show_seats[i].cards;

                let record: PlayerRecord = null;
                for (let j = 0; j < tPokerHandData.vPlayerRecords.length; ++j) {
                    if (tPokerHandData.vPlayerRecords[j].nPlayerID === uid) {
                        record = tPokerHandData.vPlayerRecords[j];
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

                            // 标记亮牌长度
                            ++record.nForceShowedActLen;
                        }
                    }
                }
            }

            // 更新自己的亮牌权限
            let isSelfOnTheSeat: boolean = false;
            for (let i = 0; i < tPokerHandData.vPlayerRecords.length; ++i) {
                if (selfid === tPokerHandData.vPlayerRecords[i].nPlayerID) {
                    isSelfOnTheSeat = true;
                    tPokerHandData.vPlayerRecords[i].bForceShowDown = true;
                    break;
                }
            }

            // 若自己不在座位上, 那么使用了强制亮牌就说明自己是旁观者, 刷新缓存
            if (!isSelfOnTheSeat) {
                tPokerHandData.vShowCardByStanderUID = freshStanderUIDCache(selfid, tPokerHandData.vShowCardByStanderUID);
            }

            // 亮玩牌后隐藏按钮, 刷新列表
            gameDataMgr.tRoomData.pkPayMoneyItem.showCardCount = data.count;
            this._setForceShowBtnVisible(false);
            this._updateTableView(tPokerHandData);
            cv.TT.showMsg(cv.config.getStringData("ForceShowCardToast"), cv.Enum.ToastType.ToastTypeInfo);
        } while (false);
    }

    /**
     * 发发看消息回调(该功能入口只针对牌局中)
     * @param data 
     */
    private _onMsgSendOut(data: game_pb.NoticeReplaySendCard): void {
        let game_uuid: string = gameDataMgr.tGameRecords.tPokerHandData.sGameUUID;
        if (data.player_id !== cv.dataHandler.getUserData().u32Uid || !gameDataMgr.tGameRecords.mHandMapCache.has(game_uuid)) {
            console.error(`${GameReview.gClassName} - error: response sendout data faild`);
            return;
        }

        // 更新战绩缓存
        do {
            let gameHandMapData: any = gameDataMgr.tGameRecords.mHandMapCache.get(game_uuid);
            if (gameHandMapData && typeof gameHandMapData !== "undefined") {
                let records: game_pb.HandRecord[] = gameHandMapData.game_record.records;
                for (let i = 0; i < cv.StringTools.getArrayLength(records); ++i) {
                    if (records[i].playerid === data.player_id) {
                        // 从 data 服拉取 json 数据, 若无值会字段缺失, 这里做个转换赋值, 保证字段存在
                        records[i].send_card_len = cv.Number(records[i].send_card_len);
                        records[i].send_card_len += data.cards.length;
                        break;
                    }
                }
            }
        } while (false);

        // 更新收藏缓存
        do {
            let collecthandMapData: any = gameDataMgr.tCollectPokerMapData.mHandMapCache.get(game_uuid);
            if (collecthandMapData && typeof collecthandMapData !== "undefined") {
                let records: game_pb.HandRecord[] = collecthandMapData.game_record.records;
                for (let i = 0; i < cv.StringTools.getArrayLength(records); ++i) {
                    if (records[i].playerid === data.player_id) {
                        // 从 data 服拉取 json 数据, 若无值会字段缺失, 这里做个转换赋值, 保证字段存在
                        records[i].send_card_len = cv.Number(records[i].send_card_len);
                        records[i].send_card_len += data.cards.length;
                        break;
                    }
                }
            }
        } while (false);

        // 更新当下牌谱数据
        do {
            // 更新数据
            let refresh: boolean = false;
            let tPokerHandData: PokerHandData = gameDataMgr.tGameRecords.tPokerHandData;
            for (let i = 0; i < tPokerHandData.vPlayerRecords.length; ++i) {
                if (tPokerHandData.vPlayerRecords[i].nPlayerID === data.player_id) {
                    tPokerHandData.vPlayerRecords[i].nReviewSendOutLen += data.cards.length;
                    tPokerHandData.vPlayerRecords[i].nReviewSendOutActLen = data.cards.length;
                    refresh = tPokerHandData.vPlayerRecords[i].nReviewSendOutActLen > 0;
                    break;
                }
            }

            // 标记牌谱"发发看"动画, 刷新列表
            if (refresh) this._updateTableView(tPokerHandData);
            this._updateSendOutState(tPokerHandData);
            cv.TT.showMsg(cv.config.getStringData("GameReplaySendOutToast"), cv.Enum.ToastType.ToastTypeInfo);
        } while (false);
    }

    /**
     * 牌局编号
     * @param event 
     */
    private _onClickSerialNumber(event: cc.Event): void {
        cv.TT.showMsg(cv.config.getStringData("allReview_allReview_panel_serial_number_copy_text"), cv.Enum.ToastType.ToastTypeInfo);
        let game_uuid: string = cv.String(this._sCurGameUUID);
        cv.native.setClipBoardString(game_uuid);
    }

    /**
     * 播放
     * @param event 
     */
    private _onClickPlay(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._vGameUUID.length <= 0 || !this._bHasReplayData) {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            if (!this._tGameReplay) {
                this._tGameReplay = cc.instantiate(this.prefab_game_replay).getComponent(GameReplay);
                this.node.addChild(this._tGameReplay.node);
            }

            this._tGameReplay.autoShow(this._dataSourceType, this._sCurGameUUID, true);
        }
    }

    /**
     * 举报
     * @param event 
     */
    private _onClickAudit(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._vGameUUID.length <= 0 || !this._bHasReplayData) {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            // 判断是否带入了, 带入过才可以举报
            if (cv.config.getCurrentScene() === cv.Enum.SCENE.GAME_SCENE) {
                if (!this._bShowAudit) {
                    cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips3"), cv.Enum.ToastType.ToastTypeError);
                    return;
                }
            }

            let clubid: number = gameDataMgr.tGameRecords.tPokerHandData.nClubID
            let sRoomUUID: string = gameDataMgr.tGameRecords.tPokerHandData.sRoomUUID;
            cv.worldNet.RequestQuerySendFairReport(clubid, this._sCurGameUUID, sRoomUUID);
        }
    }

    /**
     * 收藏
     * @param event 
     */
    private _onClickCollect(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._vGameUUID.length <= 0 || !this._bHasReplayData) {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            let uid: number = cv.dataHandler.getUserData().u32Uid;
            let gameId = 0;
            if (cv.config.getCurrentScene() == cv.Enum.SCENE.HALL_SCENE) {
                gameId = gameDataMgr.tGameRecords.gameID;
            } else {
                gameId = cv.roomManager.getCurrentGameID();
            }

            // 向"data"服请求收藏
            cv.httpHandler.requestDoFavorite(uid, this._sCurGameUUID, gameId);

            // 向"game"服请求收藏
            switch (this._dataSourceType) {
                case GameReviewDataType.EDST_GAMEROOM: {
                    let roomid: number = cv.roomManager.getCurrentRoomID();
                    cv.gameNet.RequestDoFavoriteHand(roomid, this._sCurGameUUID, game_pb.FavoriteHandType.gaming);
                } break;

                default: break;
            }
        }
    }

    /**
     * 强制亮牌
     * @param event 
     */
    private _onClickForceShow(event: cc.Event): void {
        cv.AudioMgr.playButtonSound("button_click");
        if (this._vGameUUID.length <= 0 || !this._bHasReplayData) {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            cv.gameNet.RequestReplayForceShowCard(gameDataMgr.tRoomData.u32RoomId, this._sCurGameUUID);
        }
    }

    /**
     * 发发看
     * @param event 
     */
    private _onClickSendOut(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._vGameUUID.length <= 0 || !this._bHasReplayData) {
            cv.TT.showMsg(cv.config.getStringData("UIAllreviewReplayTips"), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            cv.gameNet.RequestReplaySendCard(gameDataMgr.tRoomData.u32RoomId, this._sCurGameUUID);
        }
    }

    /**
     * 大"pot"筛选(加个面板节点增大整体点击区域)
     */
    private _onClickPanelTogglePot(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (this.toggle_pot.isChecked) {
            this.toggle_pot.uncheck();
        }
        else {
            this.toggle_pot.check();
        }
    }

    /**
     * 大"pot"筛选
     */
    private _onClickTogglePot(t: CustomToggle): void {
        if (t.isChecked) {
            this._requestBigPotGameUUIDs();
        }
        else {
            this._vGameUUID = this._getGameuuids();
            this._updateView();
        }

        // 保存上次勾选状态
        this._last_toggle_pot_check_status = t.isChecked;
    }
}
