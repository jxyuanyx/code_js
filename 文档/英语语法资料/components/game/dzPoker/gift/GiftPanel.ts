import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { CircleSprite } from "../../../../common/tools/CircleSprite";

import { TableView } from "../../../../common/tools/TableView";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";

import { GiftGoodsHelp } from "./GiftGoodsHelp";
import { GiftGoodsCount } from "./GiftGoodsCount";
import { GiftGoodsRecordItem } from "./GiftGoodsRecordItem";
import { GiftCountInfo, GiftData, GiftNewsInfo, GiftRecordInfo, GiftSelfSendInfo, GiftStarInfo } from "./GiftData";
import { GiftGoodsItem, GiftGoodsItemInfo, GiftGoodsItemData } from "./GiftGoodsItem";
import { GiftAnimSend } from "./GiftAnimSend";

/**
 * 礼物面板-页签风格
 */
enum GiftPanelPageStyle {
    /**
     * 无
     */
    NONE = 0,

    /**
     * 礼物页
     */
    GIFT,

    /**
     * 记录页
     */
    HISTORY,
}

class ScrollingInfo {
    isLoading: boolean = false;
    isBouncing: boolean = false;
}

/**
 * 礼物面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GiftPanel extends cc.Component {
    @property(cc.Prefab) prefab_goods_help: cc.Prefab = null;                           // 礼物帮助预制件
    @property(cc.Prefab) prefab_goods_count: cc.Prefab = null;                          // 礼物数量预制件
    @property(cc.Prefab) prefab_send_anim: cc.Prefab = null;                            // 发送按钮动画预制件

    @property(cc.Node) panel: cc.Node = null;                                           // 主面板
    @property(cc.Node) panel_gift: cc.Node = null;                                      // 礼物页面板
    @property(cc.Node) panel_history: cc.Node = null;                                   // 历史记录页面板
    @property(cc.Node) img_shield: cc.Node = null;                                      // 面板遮罩层

    @property(cc.Button) btn_send_help: cc.Button = null;
    @property(cc.Button) btn_send_count: cc.Button = null;
    @property(cc.Button) btn_send_normal: cc.Button = null;
    @property(cc.Button) btn_send_special: cc.Button = null;

    @property([CustomToggle]) toggle_stars: CustomToggle[] = [];
    @property(CustomToggle) toggle_gift_give: CustomToggle = null;
    @property(CustomToggle) toggle_gift_receive: CustomToggle = null;

    @property(TableView) tableView_gift: TableView = null;
    @property(TableView) tableView_history: TableView = null;

    @property(cc.Node) panel_top_btn_gift: cc.Node = null;
    @property(cc.Node) panel_top_btn_history: cc.Node = null;
    @property(cc.Sprite) panel_top_img_check: cc.Sprite = null;

    @property(cc.Node) panel_gift_panel_star: cc.Node = null;
    @property(cc.Node) panel_history_panel_btn: cc.Node = null;

    static g_class_name: string = "GiftPanel";
    private _isAutoActing: boolean = false;                                                             // 是否播放显隐动作
    private _panel_src_pos: cc.Vec2 = cc.Vec2.ZERO;                                                     // 面板原始位置
    private _panel_scr_size: cc.Size = cc.Size.ZERO;                                                    // 面板原始大小
    private _tableView_history_src_widget_top: number = 0;                                              // 历史记录视图顶部对齐数值
    private _tableView_history_scrolling_info: ScrollingInfo = new ScrollingInfo();                     // 历史记录视图滚动信息
    private _gift_view_data: any[] = [];                                                                // 礼物选项数据
    private _curPage: GiftPanelPageStyle = GiftPanelPageStyle.NONE;                                     // 当前页
    private _curRecordType: game_pb.TipRecordType = game_pb.TipRecordType.TipRecordType_Default;        // 当前历史记录类型
    private _curStarID: number = 0;                                                                     // 当前明星 id
    private _curGiftID: number = 0;                                                                     // 当前礼物 id
    private _curGiftCount: number = 1;                                                                  // 当前礼物数量
    private _giftGoodsCountInst: GiftGoodsCount = null;                                                 // 礼物数量节点实例
    private _sendAnimInst: GiftAnimSend = null;                                                         // 发送按钮动画实例

    /**
     * 自动显示
     * @param isRead 明星视角: 是否有未读的收礼信息
     * @param isAnim 是否显示动画(默认:true)
     */
    autoShow(isRead: boolean, isAnim: boolean = true): void {
        this._init();
        this._autoAnimFunc(true, isAnim, this._animFinish.bind(this));
        this._onMsgStarsRecvReadStatus(isRead);
    }

    /**
     * 自动隐藏
     * @param isAnim 
     */
    autoHide(isAnim: boolean = true): void {
        cv.MessageCenter.send(`${GiftPanel.g_class_name}_hide`);
        this._autoAnimFunc(false, isAnim, this._animFinish.bind(this));
    }

    /**
     * 滚动视图正在滚动时发出的事件
     * @param view 
     */
    onSVEventScrolling(arg: cc.ScrollView): void {
        let offset: number = 200;
        let viewOffset: cc.Vec2 = arg.getScrollOffset();
        let viewMaxOffset: cc.Vec2 = arg.getMaxScrollOffset();

        if (arg.node.uuid === this.tableView_history.node.uuid && this._tableView_history_scrolling_info.isBouncing) {
            // 显示文本
            let showLable: (isTop: boolean, dis: number) => void = (isTop: boolean, dis: number): void => {
                let parentNode: cc.Node = arg.content;
                let name: string = `${GiftPanel.g_class_name}_historyView_txt_loading`;
                let node: cc.Node = parentNode.getChildByName(name);
                let labSize: cc.Size = cc.Size.ZERO;
                if (!node) {
                    node = new cc.Node(name);
                    node.setAnchorPoint(cc.v2(0.5, 0.5));
                    parentNode.addChild(node);

                    let lab: cc.Label = node.addComponent(cc.Label);
                    lab.useSystemFont = true;
                    lab.fontSize = 36;
                    lab.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                    lab.verticalAlign = cc.Label.VerticalAlign.CENTER;
                    lab.string = isTop ? "loading..." : "loading...";
                    labSize = cv.resMgr.getLabelStringSize(lab);
                }

                let x: number = 0;
                let y: number = 0;
                if (isTop) {
                    y = (1 - parentNode.anchorY) * parentNode.height - dis / 2;
                    y += (0.5 - node.anchorY) * labSize.height
                }
                else {
                    y = (0 - parentNode.anchorY) * parentNode.height - dis / 2;
                    y -= (0.5 - node.anchorY) * labSize.height
                }

                node.setPosition(x, y);
                node.active = true;
                this._tableView_history_scrolling_info.isLoading = true;
            }

            // 下拉
            if (viewOffset.y < 0) {
                let dis: number = viewOffset.y;
                if (dis <= -offset) {
                    showLable(true, dis);
                    console.log(`${GiftPanel.g_class_name} - history view scroll bounce top start`);
                }
            }
            // 上拉
            else {
                let dis: number = viewOffset.y - viewMaxOffset.y;
                if (dis >= offset) {
                    showLable(false, dis);
                    console.log(`${GiftPanel.g_class_name} - history view scroll bounce bottom start`);
                }
            }
        }
    }

    /**
     * 滚动视图滚动到顶部边界并且开始回弹时发出的事件
     * @param arg 
     */
    onSVEventBounceTop(arg: cc.ScrollView): void {
        if (arg.node.uuid === this.tableView_history.node.uuid) {
            if (this._tableView_history_scrolling_info.isLoading) {
                this._tableView_history_scrolling_info.isLoading = false;
                this._tableView_history_scrolling_info.isBouncing = false;
                this._requestHistoryRecord(true);

                let parentNode: cc.Node = arg.content;
                let name: string = `${GiftPanel.g_class_name}_historyView_txt_loading`;
                let node: cc.Node = parentNode.getChildByName(name);
                if (node) { node.active = false; }
            }
        }
    }

    /**
     * 滚动视图滚动到底部边界并且开始回弹时发出的事件
     * @param arg 
     */
    onSVEventBounceBottom(arg: cc.ScrollView): void {
        if (this._tableView_history_scrolling_info.isLoading) {
            this._tableView_history_scrolling_info.isLoading = false;
            this._tableView_history_scrolling_info.isBouncing = false;
            this._requestHistoryRecord(false);

            let parentNode: cc.Node = arg.content;
            let name: string = `${GiftPanel.g_class_name}_historyView_txt_loading`;
            let node: cc.Node = parentNode.getChildByName(name);
            if (node) { node.active = false; }
        }
    }

    /**
     * 滚动视图滚动到顶部边界事件
     * @param arg
     */
    onSVEventScrollToTop(arg: cc.ScrollView): void {
        if (arg.node.uuid === this.tableView_history.node.uuid) {
            this._tableView_history_scrolling_info.isBouncing = true;
        }
    }

    /**
     * 滚动视图滚动到底部边界事件
     * @param arg
     */
    onSVEventScrollToBottom(arg: cc.ScrollView): void {
        if (arg.node.uuid === this.tableView_history.node.uuid) {
            this._tableView_history_scrolling_info.isBouncing = true;
        }
    }

    private _autoAnimFunc(actionIn: boolean, isAnim: boolean, callback: () => void = null): void {
        this.node.active = true;
        this.panel.active = true;
        this.panel.stopAllActions();

        let duration: number = 0.1;
        let seq: cc.Action = null;
        let src_pos: cc.Vec2 = cc.v2(this._panel_src_pos);
        let tmp_pos: cc.Vec2 = cc.v2(this._panel_src_pos);

        if (actionIn) {
            tmp_pos.y -= this.panel.height * this.panel.scaleY * (1 - this.panel.anchorY);
            this.panel.setPosition(tmp_pos);

            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this._isAutoActing = false;
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
                this.panel.setPosition(src_pos);
                if (callback) callback();
            });

            if (isAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, src_pos);
                let ebo: cc.ActionInterval = mt.easing(cc.easeOut(3));
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            this.panel.setPosition(src_pos);
            tmp_pos.y -= this.panel.height * this.panel.scaleY * (1 - this.panel.anchorY);

            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this._isAutoActing = false;
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
                this.panel.setPosition(src_pos);
                this.node.active = false;
                if (callback) callback();
            });

            if (isAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, tmp_pos);
                let ebi: cc.ActionInterval = mt.easing(cc.easeIn(3));
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this._isAutoActing = true;
            this.panel.runAction(seq);
            this.img_shield.active = true;
            this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);

        //  初始化控件事件
        this.node.on(cc.Node.EventType.TOUCH_END, () => { this.autoHide(); });

        this.panel_top_btn_gift.on("click", (): void => {
            cv.AudioMgr.playButtonSound("tab");
            this._selectPage(GiftPanelPageStyle.GIFT);
        }, this);

        this.panel_top_btn_history.on("click", (): void => {
            cv.AudioMgr.playButtonSound("tab");
            this._selectPage(GiftPanelPageStyle.HISTORY);
        }, this);

        for (let i = 0; i < this.toggle_stars.length; ++i) {
            this.toggle_stars[i].node.on("toggle", (t: CustomToggle): void => { this._onToggleStar(i, t) }, this);
        }

        this.toggle_gift_give.node.on("toggle", (t: CustomToggle): void => { this._onToggleGiftGR(game_pb.TipRecordType.TipRecordType_Send, t) }, this);
        this.toggle_gift_receive.node.on("toggle", (t: CustomToggle): void => { this._onToggleGiftGR(game_pb.TipRecordType.TipRecordType_Recv, t) }, this);

        this.btn_send_help.node.on("click", this._onClickBtnSendHelp, this);
        this.btn_send_count.node.on("click", this._onClickBtnSendCount, this);
        this.btn_send_normal.node.on("click", this._onClickBtnSendGift, this);
        this.btn_send_special.node.on("click", this._onClickBtnSendGift, this);

        // 初始化相关属性
        this._panel_scr_size = cc.size(this.panel.width, this.panel.height);
        this._tableView_history_src_widget_top = this.tableView_history.getComponent(cc.Widget).top;
        this.tableView_history.bindScrollEventTarget(this);
    }

    protected start(): void {
        // 更新静态文本
        this._updateStaticText();
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

    private _registerEvent(): void {
        cv.MessageCenter.register(`${GiftGoodsItem.g_class_name}_click`, this._onClickGiftItem.bind(this), this.node);
        cv.MessageCenter.register(`${GiftGoodsCount.g_class_name}_click`, this._onClickGiftCount.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_RESP_RECORDS, this._onMsgHistoryRecord.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_STARS_CHANGED, this._onMsgStarsChanged.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_NOTICE_NEWS, this._onMsgGiftNews.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_STARS_RECVREAD_STATUS, this._onMsgStarsRecvReadStatus.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_UPDATE_FORBIDDEN, this._onMsgUpdateForbidden.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister(`${GiftGoodsItem.g_class_name}_click`, this.node);
        cv.MessageCenter.unregister(`${GiftGoodsCount.g_class_name}_click`, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_RESP_RECORDS, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_STARS_CHANGED, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_NOTICE_NEWS, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_STARS_RECVREAD_STATUS, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_UPDATE_FORBIDDEN, this.node);
    }

    private _init(): void {
        // 激活面板
        this.node.active = true;
        this._curPage = GiftPanelPageStyle.NONE;

        // 布局面板大小
        this._layoutPanelSize();

        // 初始化礼物数据
        do {
            let objs: any[] = [];
            let colMaxLen: number = 3;
            let data: GiftGoodsItemData = null;
            let giftInfos: readonly any[] = cv.GameDataManager.tGiftData.getGiftInfoList();

            for (let i = 0; i < giftInfos.length; ++i) {
                if (i % colMaxLen === 0) {
                    data = new GiftGoodsItemData();
                    objs.push({ prefab_type: 0, prefab_component: GiftGoodsItem, prefab_datas: data });
                }

                if (data) {
                    let t: GiftGoodsItemInfo = new GiftGoodsItemInfo();
                    t.isCheck = false;
                    t.info = giftInfos[i];
                    data.items.push(t);
                }
            }

            this._gift_view_data = objs;
        } while (false);

        // 设置默认页为礼物页
        this._selectPage(GiftPanelPageStyle.GIFT, false);
    }

    /**
     * 初始化礼物面板
     */
    private _initGiftPage(isFlushScorllView: boolean): void {
        // 激活面板
        this.panel_gift.active = true;

        // 重置相关数据
        this._curStarID = 0;
        this._curGiftID = 0;
        this._curGiftCount = 1;

        // 除开自己之外的明星数据
        let self_uid: number = cv.dataHandler.getUserData().u32Uid;
        let starsInfo: GiftStarInfo[] = cv.GameDataManager.tGiftData.getStarInfosExceptByID(self_uid);

        // 明星单选按钮显示就说明数量 >= 2
        if (this.panel_gift_panel_star.active) {
            for (let i = 0; i < this.toggle_stars.length; ++i) {
                let toggle: CustomToggle = this.toggle_stars[i];
                let img_head: cc.Node = toggle.node.getChildByName("img_head");
                let txt_name: cc.Label = toggle.node.getChildByName("txt_name").getComponent(cc.Label);
                toggle.isChecked = false;

                if (i < starsInfo.length) {
                    txt_name.string = starsInfo[i].name;
                    CircleSprite.setCircleSprite(img_head, starsInfo[i].headurl, starsInfo[i].plat);
                    toggle.setTouchEnable(true);

                    if (i === 0) {
                        toggle.isChecked = true;
                        this._curStarID = starsInfo[i].uid;
                    }
                }
                else {
                    txt_name.string = "";
                    CircleSprite.setCircleSprite(img_head, "");
                    toggle.setTouchEnable(false);
                }
            }

            this._updateToggleStarSelectStatus();
        }
        // 不显示, 但可能只存在一个或者不存在
        else {
            if (starsInfo.length === 1) {
                this._curStarID = starsInfo[0].uid;
            }
        }

        // 更新发送按钮状态
        this._updateSendBtnStatus();

        // 重置礼物勾选视图
        if (isFlushScorllView) {
            for (let i = 0; i < this._gift_view_data.length; ++i) {
                let t: GiftGoodsItemData = this._gift_view_data[i].prefab_datas;
                for (let j = 0; j < t.items.length; ++j) {
                    t.items[j].isCheck = false;
                }
            }

            // 刷新礼物列表
            this.tableView_gift.bindData(this._gift_view_data);
            this.tableView_gift.reloadView();
        }
    }

    /**
     * 初始化历史记录面板
     */
    private _initHistoryPage(isFlushScorllView: boolean): void {
        // 激活面板
        this.panel_history.active = true;

        // 明星视角:默认收礼界面
        if (this.panel_history_panel_btn.active) {
            this.toggle_gift_receive.isChecked = true;
            this._setToggleStarGiftGRStatus(this.toggle_gift_give, game_pb.TipRecordType.TipRecordType_Send);
            this._setToggleStarGiftGRStatus(this.toggle_gift_receive, game_pb.TipRecordType.TipRecordType_Recv);
            this._curRecordType = game_pb.TipRecordType.TipRecordType_Recv;
        }
        // 普通视角:默认送礼界面
        else {
            this._curRecordType = game_pb.TipRecordType.TipRecordType_Send;
        }

        // 拉取最新的历史数据
        if (isFlushScorllView) {
            this.tableView_history.clearView();
            this._requestHistoryRecord(true);
        }
    }

    /**
     * 设置默认页
     * @param page 
     * @param isFlushScorllView 是否刷新对应的滚动视图
     * @returns 
     */
    private _selectPage(page: GiftPanelPageStyle, isFlushScorllView: boolean = true): void {
        if (this._curPage === page) return;
        this._curPage = page;

        let color_normal: cc.Color = cc.color(0x8A, 0x8B, 0x90);
        let color_select: cc.Color = cc.color(0xFB, 0xD8, 0x88);
        let txt_gift: cc.Label = this.panel_top_btn_gift.getChildByName("txt").getComponent(cc.Label);
        let txt_history: cc.Label = this.panel_top_btn_history.getChildByName("txt").getComponent(cc.Label);

        txt_gift.node.color = color_normal;
        txt_history.node.color = color_normal;

        this.panel_gift.active = false;
        this.panel_history.active = false;

        switch (page) {
            case GiftPanelPageStyle.HISTORY: {
                let p: cc.Vec2 = cc.Vec2.ZERO;
                let w: number = cv.resMgr.getLabelStringSize(txt_history).width;

                txt_history.node.color = color_select;
                txt_history.node.parent.convertToWorldSpaceAR(txt_history.node.position, p);

                this.panel_top_img_check.node.setContentSize(w, this.panel_top_img_check.node.height);
                this.panel_top_img_check.node.parent.convertToNodeSpaceAR(p, p);
                this.panel_top_img_check.node.x = p.x;
                this._initHistoryPage(isFlushScorllView);
            } break;

            case GiftPanelPageStyle.GIFT:
            default: {
                let p: cc.Vec2 = cc.Vec2.ZERO;
                let w: number = cv.resMgr.getLabelStringSize(txt_gift).width;

                txt_gift.node.color = color_select;
                txt_gift.node.parent.convertToWorldSpaceAR(txt_gift.node.position, p);

                this.panel_top_img_check.node.setContentSize(w, this.panel_top_img_check.node.height);
                this.panel_top_img_check.node.parent.convertToNodeSpaceAR(p, p);
                this.panel_top_img_check.node.x = p.x;
                this._initGiftPage(isFlushScorllView);
            } break;
        }
    }

    private _setBtnSendCount(count: number, isVisible: boolean, isOpen: boolean): void {
        this.btn_send_count.node.active = isVisible;

        if (isVisible) {
            let profix: string = cv.config.getStringData("Gift_quantity");
            let txt: cc.Label = this.btn_send_count.node.getChildByName("txt").getComponent(cc.Label);
            let img_triangle: cc.Node = this.btn_send_count.node.getChildByName("img_triangle");

            txt.string = `${profix}: ${count}`;
            img_triangle.angle = isOpen ? 180 : 0;
        }
    }

    private _setBtnSendEnable(btn: cc.Button, isVisible: boolean, enabled: boolean): void {
        if (btn.uuid !== this.btn_send_normal.uuid && btn.uuid !== this.btn_send_special.uuid) return;
        btn.node.active = isVisible;

        if (isVisible) {
            let txt: cc.Node = btn.node.getChildByName("txt");
            let img_mask: cc.Sprite = btn.node.getChildByName("img_mask").getComponent(cc.Sprite);
            let isForbidden: boolean = cv.GameDataManager.tGiftData.isForbidden();

            // 禁用打赏(直接禁用按钮状态)
            if (isForbidden) {
                btn.enabled = false;
                btn.interactable = false;
                btn.enableAutoGrayEffect = false;

                img_mask.node.active = true;
                img_mask.spriteFrame = cv.resMgr.getSpriteAtlasFrame(GiftData.GIFT_PLIST_PATH, "btn_bg_send_disable");
                txt.color = cc.color(0x8F, 0x90, 0x9C);
            }
            // 激活打赏(按照相应状态显隐变色与否)
            else {
                btn.enabled = enabled;
                btn.interactable = enabled;
                btn.enableAutoGrayEffect = false;

                img_mask.node.active = !enabled;
                img_mask.spriteFrame = cv.resMgr.getSpriteAtlasFrame(GiftData.GIFT_PLIST_PATH, "btn_bg_send_mask");
                txt.color = enabled ? cc.color(0x50, 0x42, 0x26) : cc.color(0x33, 0x2F, 0x2B);
            }
        }
    }

    /**
     * 设置明星视角"送/收礼"单选框状态
     * @param toggle 
     * @param isCheck 
     * @param index 
     */
    private _setToggleStarGiftGRStatus(toggle: CustomToggle, style: game_pb.TipRecordType): void {
        let txt: cc.Node = toggle.node.getChildByName("txt");
        let img: cc.Sprite = toggle.node.getChildByName("img").getComponent(cc.Sprite);

        let suffix: number = toggle.isChecked ? 2 : 1;
        let frameName: string = (style === game_pb.TipRecordType.TipRecordType_Send ? "img_gift_give_" : "img_gift_receive_") + suffix;
        let atlasPath: string = GiftData.GIFT_PLIST_PATH;
        img.spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, frameName);
        txt.color = toggle.isChecked ? cc.color(0xFF, 0xAB, 0x00) : cc.color(0x94, 0x95, 0x95);
    }

    private _updateStaticText(): void {
        let txt_gift: cc.Label = this.panel_top_btn_gift.getChildByName("txt").getComponent(cc.Label);
        txt_gift.string = cv.config.getStringData("Gift");

        let txt_history: cc.Label = this.panel_top_btn_history.getChildByName("txt").getComponent(cc.Label);
        txt_history.string = cv.config.getStringData("Gift_record");
        let img_dot: cc.Node = this.panel_top_btn_history.getChildByName("img_dot");
        if (img_dot) {
            let pos: cc.Vec2 = cc.Vec2.ZERO;
            let offset: cc.Vec2 = cc.v2(20, 0);
            let szText: cc.Size = cv.resMgr.getLabelStringSize(txt_history);
            pos.x += txt_history.node.x + szText.width * (1 - txt_history.node.anchorX);
            pos.x += offset.x;
            pos.x += img_dot.width * (img_dot.anchorX - 0.5);

            pos.y += txt_history.node.y + szText.height * (1 - txt_history.node.anchorY);
            pos.y += offset.y;
            pos.y += img_dot.height * (img_dot.anchorY - 0.5);

            // 同级节点直接设置位置
            img_dot.setPosition(pos);
        }

        let txt_gift_to: cc.Label = this.panel_gift_panel_star.getChildByName("txt_gift_to").getComponent(cc.Label);
        txt_gift_to.string = cv.config.getStringData("Gift_to");

        let txt_send_count: cc.Label = this.btn_send_count.node.getChildByName("txt").getComponent(cc.Label);
        txt_send_count.string = cv.config.getStringData("Gift_quantity");

        let txt_send_normal: cc.Label = this.btn_send_normal.node.getChildByName("txt").getComponent(cc.Label);
        txt_send_normal.string = cv.config.getStringData("Gift_send");

        let txt_send_special: cc.Label = this.btn_send_special.node.getChildByName("txt").getComponent(cc.Label);
        txt_send_special.string = cv.config.getStringData("Gift_send");

        let txt_gift_give: cc.Label = this.toggle_gift_give.node.getChildByName("txt").getComponent(cc.Label);
        txt_gift_give.string = cv.config.getStringData("Gift_send_gift");

        let txt_gift_receive: cc.Label = this.toggle_gift_receive.node.getChildByName("txt").getComponent(cc.Label);
        txt_gift_receive.string = cv.config.getStringData("Gift_receive_gift");
    }

    /**
     * 更新明星勾选按钮单选框状态
     */
    private _updateToggleStarSelectStatus(): void {
        for (let i = 0; i < this.toggle_stars.length; ++i) {
            let toggle: CustomToggle = this.toggle_stars[i];
            let txt_name: cc.Node = toggle.node.getChildByName("txt_name");
            txt_name.color = toggle.isChecked ? cc.color(0xFF, 0xAB, 0x00) : cc.color(0x8A, 0x8B, 0x90);
        }
    }

    /**
     * 更新发送按钮状态(勾选了明星且勾选了礼物)
     */
    private _updateSendBtnStatus(): void {
        // 重置礼物相关按钮状态
        this._setBtnSendCount(1, false, false);
        this._setBtnSendEnable(this.btn_send_normal, false, false);
        this._setBtnSendEnable(this.btn_send_special, false, false);

        // 有礼物id
        if (this._curGiftID > 0) {
            // 有明星id("数量按钮"和"发送按钮"都可用)
            if (this._curStarID > 0) {
                // 低级礼物
                if (this._curGiftID < 1000) {
                    this._setBtnSendCount(1, true, false);
                    this._setBtnSendEnable(this.btn_send_normal, true, true);
                }
                // 高级礼物
                else if (this._curGiftID > 1000) {
                    this._setBtnSendEnable(this.btn_send_special, true, true);
                }
            }
            // 无明星id(但自己是明星, "数量按钮"可用, 但"发送按钮"不可用)
            else {
                let self_uid: number = cv.dataHandler.getUserData().u32Uid;
                let isSelfStar: boolean = cv.GameDataManager.tGiftData.isStarByUid(self_uid);
                if (isSelfStar) {
                    // 低级礼物
                    if (this._curGiftID < 1000) {
                        this._setBtnSendCount(1, true, false);
                        this._setBtnSendEnable(this.btn_send_normal, true, false);
                    }
                    // 高级礼物
                    else if (this._curGiftID > 1000) {
                        this._setBtnSendEnable(this.btn_send_special, true, false);
                    }
                }
                else {
                    this._setBtnSendEnable(this.btn_send_special, true, false);
                }
            }
        }
        // 无礼物id)
        else {
            this._setBtnSendEnable(this.btn_send_special, true, false);
        }
    }

    private _layoutPanelSize(): void {
        let self_uid: number = cv.dataHandler.getUserData().u32Uid;
        let starsInfo: GiftStarInfo[] = cv.GameDataManager.tGiftData.getStarInfosExceptByID(self_uid);
        let isSelfStar: boolean = cv.GameDataManager.tGiftData.isStarByUid(self_uid);

        // 布局面板大小
        this.panel_gift_panel_star.active = starsInfo.length >= 2;
        this.panel_history_panel_btn.active = isSelfStar;
        let panel_height: number = this._panel_scr_size.height;
        let tableView_history_src_widget_top: number = this._tableView_history_src_widget_top;

        if (!this.panel_gift_panel_star.active) {
            panel_height -= this.panel_gift_panel_star.height;
        }

        if (!this.panel_history_panel_btn.active) {
            tableView_history_src_widget_top -= this.panel_history_panel_btn.height;
        }

        this.panel.setContentSize(this.panel.width, panel_height);
        this.tableView_history.getComponent(cc.Widget).top = tableView_history_src_widget_top;
        cv.resMgr.adaptWidget(this.panel, true);
        this._panel_src_pos = cc.v2(this.panel.position);

        // 刷新历史面板大小
        this.tableView_history.resetScrollVewSize(this.tableView_history.node.getContentSize(), true);
    }

    /**
     * 明星"选择"单选框
     * @param index 
     * @param t 
     */
    private _onToggleStar(index: number, t: CustomToggle): void {
        this._updateToggleStarSelectStatus();

        let self_uid: number = cv.dataHandler.getUserData().u32Uid;
        let starsInfo: GiftStarInfo[] = cv.GameDataManager.tGiftData.getStarInfosExceptByID(self_uid);
        if (index >= 0 && index < starsInfo.length) {
            this._curStarID = t.isChecked ? starsInfo[index].uid : 0;
        }

        this._updateSendBtnStatus();
    }

    /**
     * 明星"送礼/收礼"单选框
     * @param index 
     * @param t 
     */
    private _onToggleGiftGR(style: game_pb.TipRecordType, t: CustomToggle): void {
        if (this._curRecordType === style) return;

        this._curRecordType = style;
        this._setToggleStarGiftGRStatus(this.toggle_gift_give, game_pb.TipRecordType.TipRecordType_Send);
        this._setToggleStarGiftGRStatus(this.toggle_gift_receive, game_pb.TipRecordType.TipRecordType_Recv);

        // 拉取最新的历史数据
        this.tableView_history.clearView();
        this._requestHistoryRecord(true);
    }

    /**
     * 点击帮助
     */
    private _onClickBtnSendHelp(): void {
        cv.AudioMgr.playButtonSound("button_click");

        // 改界面隐藏时就删除实例了, 所以不需要保存
        let inst_help: GiftGoodsHelp = cc.instantiate(this.prefab_goods_help).getComponent(GiftGoodsHelp);
        this.panel.addChild(inst_help.node);
        inst_help.autoShow(this.btn_send_help.node);
    }

    /**
     * 点击数量
     */
    private _onClickBtnSendCount(target: cc.Button): void {
        cv.AudioMgr.playButtonSound("button_click");

        if (this._curGiftID > 0 && this._curGiftID < 1000) {
            if (!this._giftGoodsCountInst) {
                this._giftGoodsCountInst = cc.instantiate(this.prefab_goods_count).getComponent(GiftGoodsCount);
                this.panel.addChild(this._giftGoodsCountInst.node);
            }

            this._setBtnSendCount(this._curGiftCount, true, true);
            this._giftGoodsCountInst.autoShow(this.btn_send_count.node, this._curGiftID, this._curGiftCount);
        }
    }

    /**
     * 点击发送
     */
    private _onClickBtnSendGift(): void {
        // 发送按钮动画
        let isSpecialGift: boolean = this._curGiftID > 1000;
        let nodeTraget: cc.Node = isSpecialGift ? this.btn_send_special.node : this.btn_send_normal.node;
        if (!this._sendAnimInst) {
            let node: cc.Node = cc.instantiate(this.prefab_send_anim);
            this.node.addChild(node);
            this._sendAnimInst = node.getComponent(GiftAnimSend);
        }
        let wpos: cc.Vec2 = cc.Vec2.ZERO;
        nodeTraget.convertToWorldSpaceAR(wpos, wpos);
        this._sendAnimInst.play(wpos, nodeTraget.width, isSpecialGift);

        // 发送请求
        cv.gameNet.RequestTip(this._curStarID, this._curGiftID, this._curGiftCount);

        // 自己发送的礼物无需等待返回直接模拟数据显示动画(因为有可能网络延时, 保证自己发的礼物能立即看到动画)
        let t: GiftSelfSendInfo = new GiftSelfSendInfo();
        t.toUID = this._curStarID;
        t.giftID = this._curGiftID;
        t.giftCount = this._curGiftCount;
        cv.MessageCenter.send(GiftData.GIFT_MSG_SELF_SENDGIFT, t);
    }

    private _animFinish(): void {
        if (this.node.active) {
            switch (this._curPage) {
                case GiftPanelPageStyle.HISTORY: {
                    this._requestHistoryRecord(true);
                } break;

                case GiftPanelPageStyle.GIFT:
                default: {
                    this.tableView_gift.bindData(this._gift_view_data);
                    this.tableView_gift.reloadView();
                } break;
            }
        }
        else {
            // 清理礼物面板列表视图
            this._gift_view_data = [];
            this.tableView_gift.clearView();

            // 清理礼物历史记录面板列表视图
            this.tableView_history.clearView();
        }
    }

    /**
     * 礼物面板"item"点击事件
     * @param data 
     */
    private _onClickGiftItem(data: GiftGoodsItemInfo): void {
        let checked_id: number = 0;

        for (let i = 0; i < this._gift_view_data.length; ++i) {
            let t: GiftGoodsItemData = this._gift_view_data[i].prefab_datas;
            for (let j = 0; j < t.items.length; ++j) {
                if (data.info.tipId === t.items[j].info.tipId) {
                    t.items[j].isCheck = data.isCheck;
                }
                else {
                    t.items[j].isCheck = false;
                }

                if (t.items[j].isCheck) {
                    checked_id = t.items[j].info.tipId;
                }
            }
        }

        // 刷新礼物列表
        this.tableView_gift.bindData(this._gift_view_data);
        this.tableView_gift.reloadView();

        // 保存当前勾选的礼物id
        this._curGiftID = checked_id;

        // 重置礼物的选择数量
        this._curGiftCount = 1;

        // 更新发送按钮状态
        this._updateSendBtnStatus();
    }

    /**
     * 礼物数量信息面板点击事件
     */
    private _onClickGiftCount(data: GiftCountInfo): void {
        // 有数据则是点击"item"; 否则就是点击面板
        if (data) {
            this._curGiftCount = data.count;
            cv.AudioMgr.playButtonSound("close");
        }

        this._setBtnSendCount(this._curGiftCount, true, false);
    }

    /**
     * 请求"收/送礼"历史记录
     * @param isLatest  是否查询最新数据(滚动视图: 下拉最新, 上拉历史)
     * @param count     查询数量
     */
    private _requestHistoryRecord(isLatest: boolean, count: number = 10): void {
        let skipId: number = 0;
        let records: readonly GiftRecordInfo[] = cv.GameDataManager.tGiftData.getGiftRecordsInfo(this._curRecordType);

        // 拉取最新
        if (isLatest) {
            // 这里之所以清除所有记录, 是因为存在一种情况: 上次请求最新n条后, 关闭界面, 疯狂刷多条礼物
            // 然后再次打开如果距离上次的数量>count的值的话, 就会丢失这部分差值, 因为不知道最新到底刷了多少条
            // 因为存在缓存, 所以每次都需要清理缓存重新拉取
            count = 50;
            cv.GameDataManager.tGiftData.removeAllRecordsInfo();

            // 若拉取的是"收礼"界面的最新数据, 就去除未读红点
            if (this._curRecordType === game_pb.TipRecordType.TipRecordType_Recv) {
                cv.MessageCenter.send(GiftData.GIFT_MSG_STARS_RECVREAD_STATUS, true);
            }
        }
        // 拉取历史
        if (!isLatest) {
            if (records.length > 0) {
                skipId = records[records.length - 1].id;
            }
        }

        cv.gameNet.RequestTipRecord(skipId, count, this._curRecordType);
    }

    /**
     * 请求"收/送礼"历史记录 - 回调
     */
    private _onMsgHistoryRecord(): void {
        let records: readonly GiftRecordInfo[] = cv.GameDataManager.tGiftData.getGiftRecordsInfo(this._curRecordType);
        let objs: any = { prefab_type: 0, prefab_component: GiftGoodsRecordItem, prefab_datas: records };

        // 刷新视图
        this.tableView_history.bindData(objs);
        this.tableView_history.reloadView(false);
    }

    /**
     * 明星数量有变化通知
     */
    private _onMsgStarsChanged(): void {
        if (this._isAutoActing) return;
        let lastPage: GiftPanelPageStyle = this._curPage;
        this._curPage = GiftPanelPageStyle.NONE;

        this._layoutPanelSize();
        this._selectPage(lastPage);
    }

    /**
     * "礼物/弹幕"消息
     * @param t 
     */
    private _onMsgGiftNews(t: GiftNewsInfo): void {
        // 不是礼物消息则返回
        if (!t.gift || t.gift.newsType !== game_pb.NewsType.NewsType_Tip) return;
    }

    /**
     * 明星收礼信息已读状态
     * @param isRead 是否已读
     */
    private _onMsgStarsRecvReadStatus(isRead: boolean): void {
        let dot1: cc.Node = this.toggle_gift_receive.node.getChildByName("img_dot");
        if (dot1) dot1.active = !isRead;

        let dot2: cc.Node = this.panel_top_btn_history.getChildByName("img_dot");
        if (dot2) dot2.active = !isRead;
    }

    /**
     * 接收到打赏功能禁/用状态更新
     */
    private _onMsgUpdateForbidden(): void {
        this._updateSendBtnStatus();
    }
}
