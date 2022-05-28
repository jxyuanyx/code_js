import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";

import { TableView } from "../../../../common/tools/TableView";
import { CollectUUID, GameReviewItemData, HandCardType, PlayerRecord, PokerHandData } from "../../../../components/game/dzPoker/data/RecordData";

import { GameReviewItem } from "./GameReviewItem";
import { GameReviewFavorList } from "./GameReviewFavorList";
import { GameReviewFavorReplay } from "./GameReviewFavorReplay";

/**
 *  牌局回顾详情面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReviewFavorDetail extends cc.Component {
    @property(cc.Node) panel_main: cc.Node = null;                                      // 主面板
    @property(cc.Label) txt_page: cc.Label = null;                                      // 页数显示

    @property(cc.Button) btn_back: cc.Button = null;                                    // 返回
    @property(cc.Button) btn_switch: cc.Button = null;                                  // 切换
    @property(cc.Button) btn_delete: cc.Button = null;                                  // 删除

    @property(cc.Button) btn_first: cc.Button = null;                                   // 最前页
    @property(cc.Button) btn_last: cc.Button = null;                                    // 最后页
    @property(cc.Button) btn_before: cc.Button = null;                                  // 上一页
    @property(cc.Button) btn_next: cc.Button = null;                                    // 下一页

    static g_class_name: string = "GameReviewFavorDetail";                              // 类名
    private static g_instance: GameReviewFavorDetail = null;                            // 伪单例

    private _txt_pot: cc.Label = null;                                                  // 底池
    private _txt_pot_word: cc.Label = null;
    private _txt_insurance: cc.Label = null;                                            // 保险
    private _txt_insurance_word: cc.Label = null;
    private _txt_jackpot: cc.Label = null;                                              // JP
    private _txt_jackpot_word: cc.Label = null;

    private _btn_sendout: cc.Node = null;                                               // 发发看
    private _btn_forceshow: cc.Node = null;                                             // 强制亮牌
    private _ctx_sendout: cc.Node = null;
    private _ctx_forceshow: cc.Node = null;

    private _txt_profit: cc.Label = null;                                               // 盈利
    private _txt_blind: cc.Label = null;                                                // 盲注
    private _txt_time: cc.Label = null;                                                 // 时间
    private _txt_serial: cc.Label = null;                                               // 编号

    private _tableview: TableView = null;                                               // 滚动视图复用组件
    private _cur_page_index: number = 0;                                                // 当前页索引
    private _deleting_game_uuid: string = "";                                           // 正在删除的"game_uuid"
    private _txt_invalid_data_desc: cc.Label = null;                                    // 无效数据描述文本

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): GameReviewFavorDetail {
        if (!(prefab instanceof cc.Prefab)) return null;

        parentNode = parentNode ? parentNode : cc.director.getScene();
        zorder = zorder ? zorder : 0;

        if (!GameReviewFavorDetail.g_instance || !cc.isValid(GameReviewFavorDetail.g_instance)) {
            let inst: cc.Node = cc.instantiate(prefab);
            GameReviewFavorDetail.g_instance = inst.getComponent(GameReviewFavorDetail);
            if (GameReviewFavorDetail.g_instance) {
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

        return GameReviewFavorDetail.g_instance;
    }

    /**
     * 获取当前实例
     */
    static getInstance(): GameReviewFavorDetail {
        return GameReviewFavorDetail.g_instance;
    }

    /**
     * 显示视图
     * @param index 
     * @param bAnim 
     * @param moveDir 
     */
    autoShow(index: number, bAnim: boolean = true, moveDir: number = cv.action.eMoveActionDir.EMAD_TO_LEFT): void {
        // 设置当前索引
        this._cur_page_index = index;

        // 显示界面
        let actDelay: number = bAnim ? cv.action.delay_type.NORMAL : 0;
        cv.action.showAction(this.node,
            cv.action.eMoveActionDir.EMAD_TO_LEFT,
            cv.action.eMoveActionType.EMAT_FADE_IN,
            actDelay,
            this._actFunc.bind(this),
            this._actFuncFinish.bind(this), 1 / cc.game.getFrameRate());
    }

    /**
     * 隐藏视图
     * @param bAnim 
     * @param moveDir 
     */
    autoHide(bAnim: boolean = true, moveDir: number = cv.action.eMoveActionDir.EMAD_TO_RIGHT): void {
        if (this.node.active) {
            let actDelay: number = bAnim ? cv.action.delay_type.NORMAL : 0;
            cv.action.showAction(this.node,
                moveDir,
                cv.action.eMoveActionType.EMAT_FADE_OUT,
                actDelay,
                this._actFunc.bind(this),
                this._actFuncFinish.bind(this), 1 / cc.game.getFrameRate());
        }
    }

    protected onLoad(): void {
        if (!GameReviewFavorDetail.g_instance) GameReviewFavorDetail.g_instance = this;

        if (!cv.native.isFullScreen()) {
            this.panel_main.getComponent(cc.Widget).top = 50;
        }

        cv.resMgr.adaptWidget(this.node, true);
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget) {
            widget.destroy();
        }

        this._initUI();
    }

    protected start(): void {
        console.log(`${GameReviewFavorDetail.g_class_name} - start`);
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
        GameReviewFavorDetail.g_instance = null;
        console.log(`${GameReviewFavorDetail.g_class_name}: onDestroy`);
    }

    /**
     * 动作前回调
     * @param target 
     * @param actIO 
     */
    private _actFunc(target: cc.Node, actIO: number): void {
        console.log(`${GameReviewFavorDetail.g_class_name} - _actFunc`);
    }

    /**
     * 动作后回调
     * @param target 
     * @param actIO 
     */
    private _actFuncFinish(target: cc.Node, actIO: number): void {
        console.log(`${GameReviewFavorDetail.g_class_name} - _actFuncFinish`);

        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this._updateView();
        }
        else {
            this._resetView();
        }
    }

    private _initUI(): void {
        let panel_view: cc.Node = this.panel_main.getChildByName("panel_view");
        this._tableview = panel_view.getComponent(TableView);
        this._txt_invalid_data_desc = panel_view.getChildByName("txt_invalid_data").getComponent(cc.Label);

        let panel_bar: cc.Node = this.panel_main.getChildByName("panel_bar");
        this._txt_pot = panel_bar.getChildByName("txt_pot").getComponent(cc.Label);
        this._txt_pot_word = panel_bar.getChildByName("txt_pot_word").getComponent(cc.Label);
        this._txt_insurance = panel_bar.getChildByName("txt_insurance").getComponent(cc.Label);
        this._txt_insurance_word = panel_bar.getChildByName("txt_insurance_word").getComponent(cc.Label);
        this._txt_jackpot = panel_bar.getChildByName("txt_jackpot").getComponent(cc.Label);
        this._txt_jackpot_word = panel_bar.getChildByName("txt_jackpot_word").getComponent(cc.Label);

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

        // 按钮事件
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_switch.node.on("click", this._onClickSwitch, this);
        this.btn_delete.node.on("click", this._onClickDelete, this);

        this.btn_first.node.on("click", this._onClickFirst, this);
        this.btn_last.node.on("click", this._onClickLast, this);
        this.btn_before.node.on("click", this._onClickBefore, this);
        this.btn_next.node.on("click", this._onClickNext, this);

        this._btn_sendout.on("click", this._onClickSendOut, this);
        this._btn_forceshow.on("click", this._onClickForceShow, this);
        this._txt_serial.node.on("click", this._onClickSerialNumber, this);

        // 隐藏相关控件
        this._btn_sendout.active = false;
        this._btn_forceshow.active = false;
        this._ctx_sendout.active = false;
        this._ctx_forceshow.active = false;
        this._txt_invalid_data_desc.node.active = false;
    }

    private _registerEvent(): void {
        cv.MessageCenter.register("update_handMap", this._onMsgUpdateGameHand.bind(this), this.node);
        cv.MessageCenter.register("update_favor_uuid_list", this._onMsgUpdateFavorUUIDList.bind(this), this.node)
        cv.MessageCenter.register("delete_favor_handmap", this._onMsgDeleteFavorHand.bind(this), this.node);
        cv.MessageCenter.register("on_favorit_forceshow", this._onMsgUpdateFavorForceShow.bind(this), this.node);
        cv.MessageCenter.register("on_favorit_sendout", this._onMsgUpdateFavorSendOut.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("update_handMap", this.node);
        cv.MessageCenter.unregister("update_favor_uuid_list", this.node);
        cv.MessageCenter.unregister("delete_favor_handmap", this.node);
        cv.MessageCenter.unregister("on_favorit_forceshow", this.node);
        cv.MessageCenter.unregister("on_favorit_sendout", this.node);
    }

    /**
     * 重置视图
     */
    private _resetView(): void {
        this._updateStaticText();

        this._txt_pot.node.active = false;
        this._txt_pot_word.node.active = false;

        this._txt_insurance.node.active = false;
        this._txt_insurance_word.node.active = false;

        this._txt_jackpot.node.active = false;
        this._txt_jackpot_word.node.active = false;

        this._btn_sendout.active = false;
        this._ctx_sendout.active = false;
        this._btn_forceshow.active = false;
        this._ctx_forceshow.active = false;

        this._txt_profit.node.active = false;
        this._txt_blind.node.active = false;
        this._txt_time.node.active = false;
        this._txt_serial.node.active = false;

        this._txt_invalid_data_desc.node.active = false;

        this._tableview.clearView();
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
            this._updateDataView(null);
        }
    }

    /**
     * 更新静态文本描述
     */
    private _updateStaticText(): void {
        let panel_top: cc.Node = this.panel_main.getChildByName("panel_top");
        let txt_title: cc.Label = panel_top.getChildByName("txt_title").getComponent(cc.Label);
        txt_title.string = cv.config.getStringData("game_review_favor_detail_title_txt");                               // 标题

        this._txt_pot_word.string = cv.config.getStringData("allReview_allReview_panel_pot_txt");                       // 底池
        this._txt_insurance_word.string = cv.config.getStringData("allReview_allReview_panel_insurance_txt");           // 保险

        let txt_sendout: cc.Label = this._btn_sendout.getChildByName("txt_title").getComponent(cc.Label);
        txt_sendout.string = cv.config.getStringData("allReview_allReview_panel_sendout_txt");                          // 发发看

        let txt_forceshow: cc.Label = this._btn_forceshow.getChildByName("txt_title").getComponent(cc.Label);
        txt_forceshow.string = cv.config.getStringData("allReview_allReview_panel_forceshow_txt");                      // 强制亮牌
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
            pos_x += this._btn_forceshow.width * this._btn_forceshow.scaleX * this._btn_forceshow.anchorX;
            this._btn_forceshow.setPosition(pos_x, this._btn_forceshow.y);
            this._ctx_forceshow.setPosition(pos_x, this._ctx_forceshow.y);

            pos_x += this._btn_forceshow.width * this._btn_forceshow.scaleX * (1 - this._btn_forceshow.anchorX);
            pos_x += offset_x_nextto;
        }

        // 发发看
        if (this._btn_sendout.active) {
            pos_x += this._btn_sendout.width * this._btn_sendout.scaleX * this._btn_sendout.anchorX;
            this._btn_sendout.setPosition(pos_x, this._btn_sendout.y);
            this._ctx_sendout.setPosition(pos_x, this._ctx_sendout.y);

            pos_x += this._btn_sendout.width * this._btn_sendout.scaleX * (1 - this._btn_sendout.anchorX);
            pos_x += offset_x_nextto;
        }
    }

    /**
     * 更新不同类别游戏的"UI"显影状态等
     */
    private _updateUIStatusByGameType(pokerHandData: PokerHandData): void {
        this._txt_pot.node.active = true;
        this._txt_pot_word.node.active = true;

        this._txt_insurance.node.active = true;
        this._txt_insurance_word.node.active = true;

        this._txt_jackpot.node.active = true;
        this._txt_jackpot_word.node.active = true;

        // 是否有关联的JP(是否显示JP)
        let gameid = 0;
        if (pokerHandData) {
            gameid = pokerHandData.nGameid;
            this._txt_jackpot.node.active = pokerHandData.bAssociatedJackpot;
            this._txt_jackpot_word.node.active = pokerHandData.bAssociatedJackpot;
        }

        if (gameid === 0) {
            gameid = cv.roomManager.getCurrentGameID();
        }

        if (gameid === 0) {
            this._btn_sendout.active = false;
            this._btn_forceshow.active = false;
        }
        else if (gameid === cv.Enum.GameId.Allin) {
            this._btn_sendout.active = false;
            this._btn_forceshow.active = false;

            this._txt_insurance.node.active = false;
            this._txt_insurance_word.node.active = false;

            this._txt_jackpot.node.active = true;
            this._txt_jackpot_word.node.active = true;
        }
        else if (cv.roomManager.checkGameIsZoom(gameid)) {
            this._btn_sendout.active = false;

            this._txt_jackpot.node.active = false;
            this._txt_jackpot_word.node.active = false;
        }
    }

    /**
     * 更新子项列表视图
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
                if (this._txt_jackpot.node.active) {
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
        this._tableview.bindData(objs);
        this._tableview.reloadView();
    }

    /**
     * 更新数据视图
     * @param pokerHandData 
     */
    private _updateDataView(pokerHandData: PokerHandData): void {
        // 更新显隐控件
        this._updateForceShowState(pokerHandData);
        this._updateSendOutState(pokerHandData);
        this._updateUIStatusByGameType(pokerHandData);
        this._layoutForceShowAndSendOut();

        // 显示页数
        let tatalPage: number = gameDataMgr.tCollectPokerMapData.totalCount;
        let curPage: number = tatalPage > 0 ? this._cur_page_index + 1 : 0;
        this.txt_page.string = `${curPage}/${tatalPage}`;

        // 底池
        if (this._txt_pot.node.active) {
            let value: number = 0;
            if (pokerHandData) {
                value = cv.StringTools.clientGoldByServer(pokerHandData.nTotalPot);
            }
            this._txt_pot.string = cv.StringTools.numberToShowString(value);
        }

        // 保险
        if (this._txt_insurance.node.active) {
            let value: number = 0;
            if (pokerHandData) {
                value = cv.StringTools.serverGoldToShowNumber(pokerHandData.nInsuranceWinbet);
            }
            this._txt_insurance.string = cv.StringTools.getSignString(value);
            this._txt_insurance.node.color = cv.StringTools.getSignColor(value);
        }

        // jackpot
        if (this._txt_jackpot.node.active) {
            let value: number = 0;
            if (pokerHandData) {
                value = cv.StringTools.serverGoldToShowNumber(pokerHandData.nJackpotWinbet);
            }
            this._txt_jackpot.string = cv.StringTools.getSignString(value);
            this._txt_jackpot.node.color = cv.StringTools.getSignColor(value);
        }

        // 适配"底池, 保险, JP"文本排版(从左至右排版)
        do {
            let fontSize: number = 42 + 1;
            let panel: cc.Node = this._txt_pot.node.parent;

            let offsetMin: number = 10;             // 最小均分值
            let offsetMiddle: number = 0;           // 最终均分值
            let offsetNextto: number = 10;          // 毗邻间距

            // 计算均分值(适用于: 横向任意锚点, 纵向锚点"0.5")
            do {
                --fontSize;
                let w: number = 0;
                let count: number = 0;

                if (this._txt_pot.node.active) {
                    ++count;

                    this._txt_pot_word.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this._txt_pot_word).width * this._txt_pot_word.node.scaleX;
                    w += offsetNextto;

                    this._txt_pot.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this._txt_pot).width * this._txt_pot.node.scaleX;
                }

                if (this._txt_insurance.node.active) {
                    ++count;

                    this._txt_insurance_word.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this._txt_insurance_word).width * this._txt_insurance_word.node.scaleX;
                    w += offsetNextto;

                    this._txt_insurance.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this._txt_insurance).width * this._txt_insurance.node.scaleX;
                }

                if (this._txt_jackpot.node.active) {
                    ++count;

                    this._txt_jackpot_word.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this._txt_jackpot_word).width * this._txt_jackpot_word.node.scaleX;
                    w += offsetNextto;

                    this._txt_jackpot.fontSize = fontSize;
                    w += cv.resMgr.getLabelStringSize(this._txt_jackpot).width * this._txt_jackpot.node.scaleX;
                }

                offsetMiddle = (panel.width - w) / (count + 1);
            } while (offsetMiddle < offsetMin);

            // 设置位置
            let x: number = 0;
            let y: number = (0.5 - panel.anchorY) * panel.height;
            x = (0 - panel.anchorX) * panel.width;
            x += offsetMiddle;
            if (this._txt_pot.node.active) {
                let txt_pot_word_w: number = cv.resMgr.getLabelStringSize(this._txt_pot_word).width;
                x += txt_pot_word_w * this._txt_pot_word.node.anchorX * this._txt_pot_word.node.scaleX;
                this._txt_pot_word.node.setPosition(x, y);
                x += txt_pot_word_w * (1 - this._txt_pot_word.node.anchorX) * this._txt_pot_word.node.scaleX;

                let txt_pot_w: number = cv.resMgr.getLabelStringSize(this._txt_pot).width;
                x += offsetNextto;
                x += txt_pot_w * this._txt_pot.node.anchorX * this._txt_pot.node.scaleX;
                this._txt_pot.node.setPosition(x, y);
                x += txt_pot_w * (1 - this._txt_pot.node.anchorX) * this._txt_pot.node.scaleX;
                x += offsetMiddle;
            }

            if (this._txt_insurance.node.active) {
                let txt_insurance_word_w: number = cv.resMgr.getLabelStringSize(this._txt_insurance_word).width;
                x += txt_insurance_word_w * this._txt_insurance_word.node.anchorX * this._txt_insurance_word.node.scaleX;
                this._txt_insurance_word.node.setPosition(x, y);
                x += txt_insurance_word_w * (1 - this._txt_insurance_word.node.anchorX) * this._txt_insurance_word.node.scaleX;

                let txt_insurance_w: number = cv.resMgr.getLabelStringSize(this._txt_insurance).width;
                x += offsetNextto;
                x += txt_insurance_w * this._txt_insurance.node.anchorX * this._txt_insurance.node.scaleX;
                this._txt_insurance.node.setPosition(x, y);
                x += txt_insurance_w * (1 - this._txt_insurance.node.anchorX) * this._txt_insurance.node.scaleX;
                x += offsetMiddle;
            }

            if (this._txt_jackpot.node.active) {
                let txt_jackpot_word_w: number = cv.resMgr.getLabelStringSize(this._txt_jackpot_word).width;
                x += txt_jackpot_word_w * this._txt_jackpot_word.node.anchorX * this._txt_jackpot_word.node.scaleX;
                this._txt_jackpot_word.node.setPosition(x, y);
                x += txt_jackpot_word_w * (1 - this._txt_jackpot_word.node.anchorX) * this._txt_jackpot_word.node.scaleX;

                let txt_jackpot_w: number = cv.resMgr.getLabelStringSize(this._txt_jackpot).width;
                x += offsetNextto;
                x += txt_jackpot_w * this._txt_jackpot.node.anchorX * this._txt_jackpot.node.scaleX;
                this._txt_jackpot.node.setPosition(x, y);
                x += txt_jackpot_w * (1 - this._txt_jackpot.node.anchorX) * this._txt_jackpot.node.scaleX;
            }
        } while (false);

        // 更新子项列表视图
        this._updateTableView(pokerHandData);

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

        // 适配"盈利/盲注/时间/编号"文本排版(从右至左排版)
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
            console.error(`${GameReviewFavorDetail.g_class_name} - error: request favor uuids[${idx1}, ${idx2}] faild`);
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
        this.autoHide(isAnim);

        let favorReplay: GameReviewFavorReplay = GameReviewFavorReplay.getInstance();
        if (favorReplay) favorReplay.autoShow(this._cur_page_index, isAnim, cv.action.eMoveActionDir.EMAD_TO_RIGHT);
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
                    console.error(`${GameReviewFavorDetail.g_class_name} - error: delete favor uuids[${this._cur_page_index}] faild`);
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
        let selfid: number = cv.Number(params.uid);
        let game_uuid: string = cv.String(params.game_uuid);

        if (selfid !== cv.dataHandler.getUserData().u32Uid) {
            console.error(`${GameReviewFavorDetail.g_class_name} - error: response forceshow data faild`);
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

        // 更新当下牌谱状态(下发的全是其他人的手牌)
        do {
            // 当前牌谱
            let tPokerHandData: PokerHandData = gameDataMgr.tCollectPokerMapData.tPokerHandData;

            // 更新手牌
            for (let i = 0; i < cv.StringTools.getArrayLength(params.ShowSeats); ++i) {
                let uid: number = cv.Number(params.ShowSeats[i].uid);
                let cards: game_pb.CardItem[] = params.ShowSeats[i].cards;

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

            // 更新"亮牌"按钮状态
            this._btn_forceshow.active = false;
            this._ctx_forceshow.active = false;
            this._layoutForceShowAndSendOut();
            cv.TT.showMsg(cv.config.getStringData("ForceShowCardToast"), cv.Enum.ToastType.ToastTypeWarning);
            this._updateTableView(tPokerHandData);
        } while (false);
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
            console.error(`${GameReviewFavorDetail.g_class_name} - error: response sendout data faild`);
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

        // 更新当下牌谱状态
        do {
            // 更新数据
            let refresh: boolean = false;
            let tPokerHandData: PokerHandData = gameDataMgr.tCollectPokerMapData.tPokerHandData;
            for (let i = 0; i < tPokerHandData.vPlayerRecords.length; ++i) {
                if (selfid === tPokerHandData.vPlayerRecords[i].nPlayerID) {
                    let lastSendOutLen: number = tPokerHandData.vPlayerRecords[i].nReviewSendOutLen;
                    tPokerHandData.nSendOutCoin = nextCoin;
                    tPokerHandData.vPlayerRecords[i].nReviewSendOutLen = sendOutLen;
                    tPokerHandData.vPlayerRecords[i].nReviewSendOutActLen = Math.max(0, sendOutLen - lastSendOutLen);
                    refresh = tPokerHandData.vPlayerRecords[i].nReviewSendOutActLen > 0;
                    break;
                }
            }

            // 标记牌谱"发发看"动画, 刷新列表
            if (refresh) this._updateTableView(tPokerHandData);

            // 更新"发发看"安钮状态
            this._updateSendOutState(tPokerHandData);
            cv.TT.showMsg(cv.config.getStringData("GameReplaySendOutToast"), cv.Enum.ToastType.ToastTypeWarning);
        } while (false);
    }
}
