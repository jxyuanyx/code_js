import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";

import { TagCom } from "../../../../common/tools/TagCom";
import { TableView } from "../../../../common/tools/TableView";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";

import { GameReviewFavorReplay } from "./GameReviewFavorReplay";
import { GameReviewFavorListItem } from "./GameReviewFavorListItem";
import { CollectUUID, SimpleGameReviewFavorite } from "../../../../components/game/dzPoker/data/RecordData";

/**
 *  牌局回顾"所有局"面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReviewFavorList extends cc.Component {
    @property(cc.Prefab) prefab_favor_replay: cc.Prefab = null;                         // 回放预制件

    @property(cc.Node) panel_main: cc.Node = null;                                      // 主面板
    @property(cc.Node) panel_banner: cc.Node = null;                                    // 筛选栏面板

    @property(cc.Button) btn_back: cc.Button = null;                                    // 返回
    @property(cc.Button) btn_edit: cc.Button = null;                                    // 编辑
    @property(cc.Button) btn_cancel: cc.Button = null;                                  // 取消
    @property(cc.Button) btn_delete: cc.Button = null;                                  // 删除

    static g_class_name: string = "GameReviewFavorList";                                // 类名
    private static g_instance: GameReviewFavorList = null;                              // 伪单例(随着节点移除而清空)

    private _tableview: TableView = null;                                               // 滚动视图复用组件
    private _tableview_normal_node: cc.Node = null;
    private _tableview_editing_node: cc.Node = null;
    private _rollToBottomOnce: boolean = false;                                         // 滚动到底部标记

    private _pageLeftLength: number = 0;                                                // 分页请求剩余长度
    private _pagePullLength: number = 10;                                               // 分页请求最大长度

    private _deleting_game_uuids: string[] = [];                                        // 正在删除的"uuid"数组
    private _tableview_datas: SimpleGameReviewFavorite[] = [];                          // 滚动视图数据数组
    private _txt_empty_list_desc: cc.Label = null;                                      // 收藏列表为空描述文本
    private _txt_hands_desc: cc.RichText = null;                                        // 收藏手数描述

    private _isExit: boolean = false;                                                   // 是否退出面板
    private _isEditing: boolean = false;                                                // 是否是编辑模式

    private _banner_toggles: CustomToggle[] = [];
    private _banner_toggles_txt: cc.Label[] = [];
    private _banner_toggles_txt_size: cc.Size[] = [];

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): GameReviewFavorList {
        if (!(prefab instanceof cc.Prefab)) return null;

        parentNode = parentNode ? parentNode : cc.director.getScene();
        zorder = zorder ? zorder : 0;

        if (!GameReviewFavorList.g_instance || !cc.isValid(GameReviewFavorList.g_instance)) {
            let inst: cc.Node = cc.instantiate(prefab);
            GameReviewFavorList.g_instance = inst.getComponent(GameReviewFavorList);
            if (GameReviewFavorList.g_instance) {
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

        return GameReviewFavorList.g_instance;
    }

    /**
     * 获取当前实例
     */
    static getInstance(): GameReviewFavorList {
        return GameReviewFavorList.g_instance;
    }

    /**
     * 显示视图
     * @param isAnim 
     * @param moveDir 
     */
    autoShow(isAnim: boolean = true, moveDir: number = cv.action.eMoveActionDir.EMAD_TO_LEFT): void {
        this._isExit = false;
        this._pageLeftLength = Math.max(0, gameDataMgr.tCollectPokerMapData.totalCount);

        let actDelay: number = isAnim ? cv.action.delay_type.NORMAL : 0;
        cv.action.showAction(this.node, moveDir,
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
            cv.action.showAction(this.node, moveDir,
                cv.action.eMoveActionType.EMAT_FADE_OUT,
                actDelay,
                this._actFunc.bind(this),
                this._actFuncFinish.bind(this));
        }
    }

    /**
     * 滚动视图正在滚动时发出的事件
     * @param arg 
     */
    onSVEventScrolling(arg: cc.ScrollView): void {
        let offset: number = 200;
        let dis: number = arg.getScrollOffset().y - arg.getMaxScrollOffset().y;
        if (dis >= offset) {
            this._rollToBottomOnce = true;
            let parentNode: cc.Node = arg.content;
            let name: string = `${GameReviewFavorList.g_class_name}_tableview_txt_loading`;
            let node: cc.Node = parentNode.getChildByName(name);
            if (!node) {
                node = new cc.Node(name);
                let lab: cc.Label = node.addComponent(cc.Label);
                lab.useSystemFont = true;
                lab.fontSize = 36;
                lab.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                lab.verticalAlign = cc.Label.VerticalAlign.CENTER;
                lab.string = "Loading......";
                node.setAnchorPoint(cc.v2(0.5, 0.5));
                parentNode.addChild(node);
            }

            let x: number = (0.5 - parentNode.anchorX) * parentNode.width;
            let y: number = (0 - parentNode.anchorY) * parentNode.height - dis / 2;
            let labSize: cc.Size = cv.resMgr.getLabelStringSize(node.getComponent(cc.Label));
            x -= (0.5 - node.anchorX) * labSize.width * node.scaleX;
            y += (0.5 - node.anchorY) * labSize.height * node.scaleY;
            node.setPosition(x, y);
            node.active = true;
        }
    }

    /**
     * 滚动视图滚动到底部边界并且开始回弹时发出的事件
     * @param arg
     */
    onSVEventBounceBottom(arg: cc.ScrollView): void {

    }

    /**
     * 滚动结束
     * @param arg 
     */
    onSVEventScrollEnded(arg: cc.ScrollView): void {
        if (this._rollToBottomOnce) {
            this._rollToBottomOnce = false;

            let parentNode: cc.Node = arg.content;
            let name: string = `${GameReviewFavorList.g_class_name}_tableview_txt_loading`;
            let node: cc.Node = parentNode.getChildByName(name);
            if (node) {
                node.active = false;
                node.removeFromParent(true);
                node.destroy();
            }

            this._updateView();
        }
    }

    protected onLoad(): void {
        if (!GameReviewFavorList.g_instance) GameReviewFavorList.g_instance = this;

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
        console.log(`${GameReviewFavorList.g_class_name} - start`);
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
        this._unregisterEvent();
        GameReviewFavorList.g_instance = null;
    }

    /**
     * 动作前回调
     * @param target 
     * @param actIO 
     */
    private _actFunc(target: cc.Node, actIO: number): void {
        console.log(`${GameReviewFavorList.g_class_name} - _actFunc`);

        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this._updateStaticText();
        }
    }

    /**
     * 动作后回调
     * @param target 
     * @param actIO 
     */
    private _actFuncFinish(target: cc.Node, actIO: number): void {
        console.log(`${GameReviewFavorList.g_class_name} - _actFuncFinish`);

        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this._updateView();
        }
        else {
            this._setViewEditing(false, true);

            if (this._isExit) {
                // 恢复显示"邮件"图标
                cv.MessageCenter.send("show_mail_entrance", true);
            }
        }
    }

    private _initUI(): void {
        let panel_view: cc.Node = this.panel_main.getChildByName("panel_view");
        this._tableview = panel_view.getChildByName("scrollview").getComponent(TableView);
        this._tableview.bindScrollEventTarget(this);
        this._tableview_normal_node = panel_view.getChildByName("node_view_normal");
        this._tableview_editing_node = panel_view.getChildByName("node_view_editing");
        this._txt_empty_list_desc = panel_view.getChildByName("txt_empty_list").getComponent(cc.Label);

        let panel_hands_desc: cc.Node = panel_view.getChildByName("panel_hands_desc");
        this._txt_hands_desc = panel_hands_desc.getChildByName("txt").getComponent(cc.RichText);

        // "banner"面板
        do {
            let bannerNode: cc.Node = this.panel_banner.getChildByName("bannerNode");
            for (let i = 0; i < bannerNode.childrenCount; ++i) {
                let toggle_node: cc.Node = bannerNode.getChildByName(`toggle_${i}`);
                let toggle_txt_node: cc.Node = bannerNode.getChildByName(`toggle_txt_${i}`);

                if (toggle_node) {
                    this._banner_toggles.push(toggle_node.getComponent(CustomToggle));
                }

                if (toggle_txt_node) {
                    this._banner_toggles_txt.push(toggle_txt_node.getComponent(cc.Label));
                }
            }

            // 添加"ui-数据"映射关系
            let togglesInfo: number[] = [];
            togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_TEXAS);
            togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_TEXAS_SHORT);
            togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_BET);
            togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_PLO);
            // togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_STARSEAT);
            // togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_ZOOMTEXAS);
            // togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_MTT);
            // togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_AOF);
            // togglesInfo.push(GameReviewFavorListItem.g_toggle_type.E_GRFLTT_AOF_SHORT);

            for (let i = 0; i < this._banner_toggles.length; ++i) {
                let toggle: CustomToggle = this._banner_toggles[i];
                let togglTxt: cc.Label = this._banner_toggles_txt[i];

                let tag: TagCom = toggle.getComponent(TagCom);
                if (!tag) tag = toggle.addComponent(TagCom);

                let isVisible: boolean = i < togglesInfo.length;
                toggle.node.active = isVisible;
                togglTxt.node.active = isVisible;
                if (!isVisible) continue;

                tag.nTag = togglesInfo[i];
                togglTxt.string = GameReviewFavorListItem.getToggleTypeTxtDesc(tag.nTag);
                this._banner_toggles_txt_size.push(cv.resMgr.getLabelStringSize(togglTxt));
                toggle.node.on("toggle", (t: CustomToggle): void => { this._onClickToggle(tag.nTag, t); }, this);
            }
        } while (false);

        // 隐藏相关控件
        this.panel_banner.active = false;
        this.btn_cancel.node.active = false;
        this.btn_delete.node.active = false;
        this._txt_empty_list_desc.node.active = false;

        this.panel_banner.active = false;
        this.btn_edit.node.active = true;
        this.btn_cancel.node.active = false;
        this.btn_delete.node.active = false;

        this._checkEditBtnEnabled();

        // 按钮事件
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_edit.node.on("click", this._onClickEdit, this);
        this.btn_cancel.node.on("click", this._onClickCancel, this);
        this.btn_delete.node.on("click", this._onClickDelete, this);
    }

    private _registerEvent(): void {
        cv.MessageCenter.register("update_favor_uuid_list", this._onMsgUpdateFavorUUIDList.bind(this), this.node)
        cv.MessageCenter.register("update_favor_simple_handMap", this._onMsgUpdateSimpleGameHandList.bind(this), this.node);
        cv.MessageCenter.register("delete_favor_handmap", this._onMsgDeleteFavorHand.bind(this), this.node);

        cv.MessageCenter.register(`${GameReviewFavorListItem.g_class_name}_click`, this._onMsgFavorListItemClick.bind(this), this.node);
        cv.MessageCenter.register(`${GameReviewFavorListItem.g_class_name}_toggle`, this._onMsgFavorListItemToggle.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("update_favor_uuid_list", this.node);
        cv.MessageCenter.unregister("update_favor_simple_handMap", this.node);
        cv.MessageCenter.unregister("delete_favor_handmap", this.node);

        cv.MessageCenter.unregister(`${GameReviewFavorListItem.g_class_name}_click`, this.node);
        cv.MessageCenter.unregister(`${GameReviewFavorListItem.g_class_name}_toggle`, this.node);
    }

    /**
     * 更新视图
     */
    private _updateView(): void {
        // 拉取指定索引的"game_uuid"
        if (gameDataMgr.tCollectPokerMapData.totalCount > 0) {
            this._reqGameUUIDs();
        }
        else {
            this._updateTableView(false, true);
        }
    }

    /**
     * 更新静态文本描述
     */
    private _updateStaticText(): void {
        let panel_top: cc.Node = this.panel_main.getChildByName("panel_top");
        let txt_title: cc.Label = panel_top.getChildByName("txt_title").getComponent(cc.Label);
        txt_title.string = cv.config.getStringData("game_review_favor_list_title_txt");                                // 标题

        let panel_bar: cc.Node = this.panel_main.getChildByName("panel_bar");
        let txt_hands_word: cc.Label = panel_bar.getChildByName("txt_hands_word").getComponent(cc.Label);               // 手牌
        txt_hands_word.string = cv.config.getStringData("game_review_favor_list_handscards_txt");

        let txt_pubcards_word: cc.Label = panel_bar.getChildByName("txt_pubcards_word").getComponent(cc.Label);         // 公共牌
        txt_pubcards_word.string = cv.config.getStringData("game_review_favor_list_pubcards_txt");

        let txt_profit_word: cc.Label = panel_bar.getChildByName("txt_profit_word").getComponent(cc.Label);             // 盈亏
        txt_profit_word.string = cv.config.getStringData("game_review_favor_list_profit_txt");

        let txt_edit: cc.Label = this.btn_edit.node.getChildByName("txt").getComponent(cc.Label);                       // 编辑
        txt_edit.string = cv.config.getStringData("game_review_favor_list_btn_edit_txt");

        let txt_cancel: cc.Label = this.btn_cancel.node.getChildByName("txt").getComponent(cc.Label);                   // 取消
        txt_cancel.string = cv.config.getStringData("game_review_favor_list_btn_cancel_txt");

        let txt_delete: cc.Label = this.btn_delete.node.getChildByName("txt").getComponent(cc.Label);                   // 删除
        txt_delete.string = cv.config.getStringData("game_review_favor_list_btn_delete_txt");

        this._txt_empty_list_desc.string = cv.config.getStringData("game_review_favor_list_empty_txt");                 // 收藏列表为空
        this._txt_empty_list_desc.node.active = false;

        // "手牌/公共牌/盈亏"居中布局(这里动态等份居中逻辑注释掉, 以美术标注为主直接在编辑器里布局)
        // do {
        //     let fontSize: number = 42 + 1;
        //     let panel: cc.Node = txt_hands_word.node.parent;

        //     let offsetMin: number = 10;             // 最小均分值
        //     let offsetMiddle: number = 0;           // 最终均分值
        //     let offsetBothSides: number = 125;      // 两边间距

        //     // 计算均分值(适用于: 横向任意锚点, 纵向锚点"0.5")
        //     do {
        //         --fontSize;
        //         let w: number = 0;
        //         let count: number = 0;

        //         if (txt_hands_word.node.active) {
        //             ++count;

        //             txt_hands_word.fontSize = fontSize;
        //             w += cv.resMgr.getLabelStringSize(txt_hands_word).width * txt_hands_word.node.scaleX;
        //         }

        //         if (txt_pubcards_word.node.active) {
        //             ++count;

        //             txt_pubcards_word.fontSize = fontSize;
        //             w += cv.resMgr.getLabelStringSize(txt_pubcards_word).width * txt_pubcards_word.node.scaleX;
        //         }

        //         if (txt_profit_word.node.active) {
        //             ++count;

        //             txt_profit_word.fontSize = fontSize;
        //             w += cv.resMgr.getLabelStringSize(txt_profit_word).width * txt_profit_word.node.scaleX;
        //         }

        //         w += 2 * offsetBothSides;
        //         offsetMiddle = (panel.width - w) / (count - 1);
        //     } while (offsetMiddle < offsetMin);

        //     // 设置位置
        //     let x: number = 0;
        //     let y: number = (0.5 - panel.anchorY) * panel.height;
        //     x = (0 - panel.anchorX) * panel.width;
        //     x += offsetBothSides;
        //     if (txt_hands_word.node.active) {
        //         let w: number = cv.resMgr.getLabelStringSize(txt_hands_word).width;
        //         x += w * txt_hands_word.node.anchorX * txt_hands_word.node.scaleX;
        //         txt_hands_word.node.setPosition(x, y);
        //         x += w * (1 - txt_hands_word.node.anchorX) * txt_hands_word.node.scaleX;
        //         x += offsetMiddle;
        //     }

        //     if (txt_pubcards_word.node.active) {
        //         let w: number = cv.resMgr.getLabelStringSize(txt_pubcards_word).width;
        //         x += w * txt_pubcards_word.node.anchorX * txt_pubcards_word.node.scaleX;
        //         txt_pubcards_word.node.setPosition(x, y);
        //         x += w * (1 - txt_pubcards_word.node.anchorX) * txt_pubcards_word.node.scaleX;
        //         x += offsetMiddle;
        //     }

        //     if (txt_profit_word.node.active) {
        //         let w: number = cv.resMgr.getLabelStringSize(txt_profit_word).width;
        //         x += w * txt_profit_word.node.anchorX * txt_profit_word.node.scaleX;
        //         txt_profit_word.node.setPosition(x, y);
        //         x += w * (1 - txt_profit_word.node.anchorX) * txt_profit_word.node.scaleX;
        //     }
        // } while (false);

        // 更新编辑界面"banner toggle"文本描述
        do {
            cv.StringTools.clearArray(this._banner_toggles_txt_size);
            for (let i = 0; i < this._banner_toggles.length; ++i) {
                let toggle: CustomToggle = this._banner_toggles[i];
                let togglTxt: cc.Label = this._banner_toggles_txt[i];
                if (!toggle.node.active && !togglTxt.node.active) continue;

                let tag: TagCom = toggle.getComponent(TagCom);
                if (!tag) tag = toggle.addComponent(TagCom);

                togglTxt.string = GameReviewFavorListItem.getToggleTypeTxtDesc(tag.nTag);
                this._banner_toggles_txt_size.push(cv.resMgr.getLabelStringSize(togglTxt));
            }
        } while (false);
    }

    /**
     * 更新"收藏手数"描述
     */
    private _updateFavorHandsTxtDesc(): void {
        let desc: string = cv.config.getStringData("game_review_favor_list_desc_txt");
        desc = cv.StringTools.formatC(desc, gameDataMgr.tCollectPokerMapData.totalCount);
        cv.StringTools.setRichTextString(this._txt_hands_desc.node, desc);

        // 富文本实现"shrink"模式
        let max_width: number = 900 / cv.config.DESIGN_WIDTH * cc.winSize.width;
        while (this._txt_hands_desc.node.width > max_width) {
            this._txt_hands_desc.fontSize -= 1;
        }
    }

    /**
     * 重置"banner"面板
     */
    private _resetBannerView(): void {
        // 取消所有勾选
        for (let i = 0; i < this._banner_toggles.length; ++i) {
            this._banner_toggles[i].isChecked = false;
        }

        // 居中布局
        do {
            let offset_side: number = 20;
            let offset_middle: number = 0;
            let panel: cc.Node = this.panel_banner;

            let total_w: number = 0;
            let visibleCount: number = 0;
            for (let i = 0; i < this._banner_toggles_txt_size.length; ++i) {
                if (!this._banner_toggles[i].node.active) continue;

                ++visibleCount;
                total_w += this._banner_toggles[i].node.width * this._banner_toggles[i].node.scaleX;
                total_w += this._banner_toggles_txt_size[i].width * this._banner_toggles_txt[i].node.scaleX;
                total_w += offset_side;
            }
            offset_middle = (panel.width - total_w) / (visibleCount + 1);

            // 适用于: 横向任意锚点, 纵向锚点"0.5"
            let x: number = (0 - panel.anchorX) * panel.width;
            let y: number = 0;
            for (let i = 0; i < visibleCount; ++i) {
                if (!this._banner_toggles[i].node.active) continue;

                x += offset_middle;
                x += this._banner_toggles[i].node.width * this._banner_toggles[i].node.anchorX * this._banner_toggles[i].node.scaleX;
                this._banner_toggles[i].node.setPosition(x, y);
                x += this._banner_toggles[i].node.width * (1 - this._banner_toggles[i].node.anchorX) * this._banner_toggles[i].node.scaleX;
                x += offset_side;
                x += this._banner_toggles_txt_size[i].width * this._banner_toggles_txt[i].node.anchorX * this._banner_toggles_txt[i].node.scaleX;
                this._banner_toggles_txt[i].node.setPosition(x, y);
                x += this._banner_toggles_txt_size[i].width * (1 - this._banner_toggles_txt[i].node.anchorX) * this._banner_toggles_txt[i].node.scaleX;
            }
        } while (false);
    }

    /**
     * 设置视图编辑状态
     * @param isEditing 是否为编辑状态 
     * @param cleanup   是否清理滚动视图数据
     */
    private _setViewEditing(isEditing: boolean, cleanup: boolean = false): void {
        if (this._isEditing !== isEditing) {
            this._isEditing = isEditing;
            this.panel_banner.active = isEditing;
            this.btn_edit.node.active = !isEditing;
            this.btn_cancel.node.active = isEditing;
            this.btn_delete.node.active = isEditing;
        }

        for (let i = 0; i < this._tableview_datas.length; ++i) {
            this._tableview_datas[i].isCheck = false;
        }

        if (this.panel_banner.active) {
            this._resetBannerView();
            this._checkDeleteBtnEnabled();
        }

        this._updateTableView(true, cleanup);
    }

    /**
     * 更新滚动视图
     * @param resetPos  是否重置子项位置(默认: fasle)
     * @param cleanup   是否清理(默认: fasle)
     */
    private _updateTableView(resetPos: boolean = false, cleanup: boolean = false): void {
        if (cleanup) {
            this._pageLeftLength = Math.max(0, gameDataMgr.tCollectPokerMapData.totalCount);
            cv.StringTools.clearArray(this._tableview_datas);
            this._tableview.clearView();
        }
        else {
            let objs: any[] = [];
            for (let i = 0; i < this._tableview_datas.length; ++i) {
                let type: number = 0;
                let tData: SimpleGameReviewFavorite = this._tableview_datas[i];

                switch (tData.game_id) {
                    case cv.Enum.GameId.Plo: type = 1; break;
                    default: type = 0; break;
                }

                type = this._isEditing ? type + 2 : type;
                objs.push({ prefab_type: type, prefab_component: GameReviewFavorListItem, prefab_datas: tData });
            }

            // 刷新"列表视图"位置和大小
            let pos: cc.Vec2 = this._tableview_normal_node.getPosition();
            let size: cc.Size = this._tableview_normal_node.getContentSize();
            if (this._isEditing) {
                pos = this._tableview_editing_node.getPosition();
                size = this._tableview_editing_node.getContentSize();
            }
            this._tableview.node.setPosition(pos);
            this._tableview.resetScrollVewSize(size);
            this._tableview.bindData(objs);
            this._tableview.reloadView(resetPos);
        }

        if (!this._isEditing) this._checkEditBtnEnabled();
        this._txt_empty_list_desc.node.active = gameDataMgr.tCollectPokerMapData.totalCount <= 0;

        // 更新"收藏手数"描述
        this._updateFavorHandsTxtDesc();
    }

    /**
     * 设置指定按钮是否可触摸
     * @param btn 
     * @param enabled 
     */
    private _setBtnTouchEnabled(btn: cc.Button, enabled: boolean): void {
        btn.enabled = enabled;
        btn.interactable = enabled;
        let maskNode: cc.Node = btn.node.getChildByName("mask");
        if (maskNode) maskNode.active = !enabled;
    }

    /**
     * 检测"编辑"按钮是否启用
     */
    private _checkEditBtnEnabled(): void {
        let enabled: boolean = this._tableview_datas.length > 0;
        this._setBtnTouchEnabled(this.btn_edit, enabled);
    }

    /**
     * 检测"删除/取消"按钮是否启用
     */
    private _checkDeleteBtnEnabled(): void {
        if (!this.btn_delete.node.active) return;

        let hasCheck: boolean = false;
        for (let i = 0; i < this._tableview_datas.length; ++i) {
            if (this._tableview_datas[i].isCheck) {
                hasCheck = true;
                break;
            }
        }

        this._setBtnTouchEnabled(this.btn_cancel, hasCheck);
        this._setBtnTouchEnabled(this.btn_delete, hasCheck);
    }

    /**
     * 检测"banner栏勾选按钮"是否被"勾选/反勾选"
     */
    private _checkBannerToggleIsCheck(): void {
        for (let i = 0; i < this._banner_toggles.length; ++i) {
            if (this._tableview_datas.length > 0) {
                let tag: TagCom = this._banner_toggles[i].getComponent(TagCom);
                if (!tag.node.active) continue;

                let isHasType: boolean = false;
                let isHasNoChecked: boolean = false;
                let toggle_type: number = tag.nTag;
                for (let j = 0; j < this._tableview_datas.length; ++j) {
                    if (this._tableview_datas[j].toggle_type === toggle_type) {
                        isHasType = true;
                        if (!this._tableview_datas[j].isCheck) {
                            isHasNoChecked = true;
                            break;
                        }
                    }
                }

                if (isHasType) {
                    this._banner_toggles[i].isChecked = !isHasNoChecked;
                }
            }
            else {
                this._banner_toggles[i].isChecked = false;
            }
        }
    }

    /**
     * 请求指定索引的"gameuuid"数据
     * @param index 
     */
    private _reqGameUUIDs(): void {
        // 确保"剩余长度"有效性
        this._pageLeftLength = Math.min(this._pageLeftLength, gameDataMgr.tCollectPokerMapData.totalCount);
        this._pageLeftLength = Math.max(this._pageLeftLength, 0);
        if (this._pageLeftLength <= 0) return;

        let valid_len: number = Math.min(this._pageLeftLength, this._pagePullLength);

        let game_uuids: string[] = [];
        for (let i = 0; i < valid_len; ++i) {
            let index: number = this._pageLeftLength - 1 - i;
            let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(index);
            if (t) {
                game_uuids.push(t.uuid);
            }
        }

        let uid: number = cv.dataHandler.getUserData().u32Uid;
        if (game_uuids.length === valid_len) {
            this._reqSimpleGameHandList(game_uuids);
        }
        else {
            let skip_size: number = this._pageLeftLength - valid_len;
            cv.httpHandler.requestGetFavoriteUUIDList(uid, skip_size, valid_len);
        }
    }

    /**
     * 请求已收藏的牌谱的"game_uuid"数组 回调
     */
    private _onMsgUpdateFavorUUIDList(params: { skipIdx: number, count: number }): void {
        let game_uuids: string[] = [];
        for (let i = 0; i < params.count; ++i) {
            let index: number = params.skipIdx + i;
            let t: CollectUUID = gameDataMgr.tCollectPokerMapData.getUUIDByIndex(index);
            if (t) {
                game_uuids.push(t.uuid);
            }
        }
        this._reqSimpleGameHandList(game_uuids);
    }

    /**
     *  批量请求"精简版"列表数据
     * @param game_uuids 
     */
    private _reqSimpleGameHandList(game_uuids: string[]): void {
        if (game_uuids.length > 0) {
            let reqUUIDS: string[] = [];
            for (let i = 0; i < game_uuids.length; ++i) {
                let isExist: boolean = false;
                let uuid: string = game_uuids[i];
                for (let j = 0; j < this._tableview_datas.length; ++j) {
                    if (uuid === this._tableview_datas[j].game_uuid) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    reqUUIDS.push(uuid);
                }
            }

            if (reqUUIDS.length > 0) {
                let uid: number = cv.dataHandler.getUserData().u32Uid;
                cv.httpHandler.requestGameReviewFavoriteList(uid, reqUUIDS);
            }
            else {
                this._updateTableView();
            }
        }
        else {
            console.error(`${GameReviewFavorList.g_class_name} - error: request favor list faild`);
        }
    }

    /**
     * 批量请求"精简版"列表数据 回调
     */
    private _onMsgUpdateSimpleGameHandList(): void {
        let hasAddOperate: boolean = false;
        gameDataMgr.tCollectPokerMapData.mSimpleHandMapCache.forEach((game_uuid: string, t: SimpleGameReviewFavorite): void => {
            let isExist: boolean = false;
            for (let i = 0; i < this._tableview_datas.length; ++i) {
                if (this._tableview_datas[i].game_uuid === game_uuid) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                // 德州(长/短)
                if (t.game_id === cv.Enum.GameId.Texas || t.game_id === cv.Enum.GameId.StarSeat) {
                    switch (t.game_mode) {
                        case 1: t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_TEXAS; break;
                        case 3: t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_TEXAS_SHORT; break;
                        default: break;
                    }
                }
                // 必下
                else if (t.game_id === cv.Enum.GameId.Bet) {
                    t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_BET;
                }
                // 奥马哈
                else if (t.game_id === cv.Enum.GameId.Plo) {
                    t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_PLO;
                }
                // 明星桌(已划分到"德州")
                // else if (t.game_id === cv.Enum.GameId.StarSeat) {
                //     t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_STARSEAT;
                // }
                // 急速
                // else if (t.game_id >= cv.Enum.GameId.ZoomTexas && t.game_id <= cv.Enum.GameId.ZoomTexas) {
                //     t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_ZOOMTEXAS;
                // }
                // AOF
                // else if (t.game_id === cv.Enum.GameId.Allin) {
                //     switch (t.game_mode) {
                //         case 1: t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_AOF; break;
                //         case 3: t.toggle_type = GameReviewFavorListItem.g_toggle_type.E_GRFLTT_AOF_SHORT; break;
                //         default: break;
                //     }
                // }
                // MTT
                // else if () {

                // }

                // 若"banner"栏已勾选, 则新拉取的"item"子项也默认勾选
                for (let i = 0; i < this._banner_toggles.length; ++i) {
                    let tag: TagCom = this._banner_toggles[i].getComponent(TagCom);
                    if (tag.nTag === t.toggle_type) {
                        t.isCheck = this._banner_toggles[i].isChecked;
                        break;
                    }
                }

                // push
                hasAddOperate = true;
                this._tableview_datas.push(t);
            }
        });

        this._pageLeftLength = gameDataMgr.tCollectPokerMapData.totalCount - this._tableview_datas.length;
        this._pageLeftLength = Math.max(0, this._pageLeftLength);

        // 有"add"操作就重新排序(显示时间降序)
        if (hasAddOperate) {
            this._tableview_datas.sort((a: SimpleGameReviewFavorite, b: SimpleGameReviewFavorite): number => {
                return b.addTime - a.addTime;
            });
        }
        this._updateTableView();
    }

    /**
     * 请求"批量删除" 回调
     * @param result 
     */
    private _onMsgDeleteFavorHand(result: number): void {
        if (result === 0) {
            cv.TT.showMsg(cv.config.getStringData("game_review_favor_detail_delete_ok_txt"), cv.Enum.ToastType.ToastTypeInfo);

            let last_datas_len: number = this._tableview_datas.length;
            for (let i = 0; i < this._deleting_game_uuids.length; ++i) {
                let game_uuid: string = this._deleting_game_uuids[i];
                gameDataMgr.tCollectPokerMapData.deteGameUUID(game_uuid);

                for (let j = 0; j < this._tableview_datas.length; ++j) {
                    if (game_uuid === this._tableview_datas[j].game_uuid) {
                        this._tableview_datas.splice(j, 1);
                        break;
                    }
                }
            }

            cv.StringTools.clearArray(this._deleting_game_uuids);
            this._pageLeftLength += Math.max(0, (last_datas_len - this._tableview_datas.length));
            this._updateTableView();

            if (this._isEditing) {
                this._checkDeleteBtnEnabled();
                this._checkBannerToggleIsCheck();
            }
            else {
                this._checkEditBtnEnabled();
            }

            // 取消勾选
            this._cancelToggles();

            // 续拉数据
            this._updateView();
        }
        else {
            let desc: string = cv.config.getStringData("game_review_favor_detail_delete_faild_txt");
            desc = `${desc}(${result})`;
            cv.TT.showMsg(desc, cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 点击"返回"按钮
     * @param event 
     */
    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (this._isEditing) {
            this._setViewEditing(false);
        }
        else {
            this._isExit = true;
            this.autoHide();
        }
    }

    /**
     * 点击"编辑"按钮
     * @param event 
     */
    private _onClickEdit(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._setViewEditing(true);
    }

    /**
     * 点击"取消"按钮
     * @param event 
     */
    private _onClickCancel(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._cancelToggles();

    }

    /**
     * 取消事件
     */
    private _cancelToggles(): void {
        for (let i = 0; i < this._banner_toggles.length; ++i) {
            this._banner_toggles[i].isChecked = false;
        }

        for (let i = 0; i < this._tableview_datas.length; ++i) {
            this._tableview_datas[i].isCheck = false;
        }

        this._tableview.refreshView();
        this._checkDeleteBtnEnabled();
        this._checkBannerToggleIsCheck();
    }

    /**
     * 点击"删除"按钮
     * @param event 
     */
    private _onClickDelete(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        cv.StringTools.clearArray(this._deleting_game_uuids);

        let strtips: string = cv.config.getStringData("game_review_favor_detail_delete_ensure_txt");
        cv.TP.showMsg(strtips, cv.Enum.ButtonStyle.TWO_BUTTON, (): void => {
            for (let i = 0; i < this._tableview_datas.length; ++i) {
                if (this._tableview_datas[i].isCheck) {
                    this._deleting_game_uuids.push(this._tableview_datas[i].game_uuid);
                }
            }

            if (this._deleting_game_uuids.length > 0) {
                cv.httpHandler.requestDeleteFavoriteList(cv.dataHandler.getUserData().u32Uid, this._deleting_game_uuids);
            }
        });
    }

    /**
     * banner 点击勾选
     * @param toggle_type 
     * @param toggle 
     */
    private _onClickToggle(toggle_type: number, toggle: CustomToggle): void {
        let isFresh: boolean = false;

        for (let i = 0; i < this._tableview_datas.length; ++i) {
            if (this._tableview_datas[i].toggle_type === toggle_type) {
                isFresh = true;
                this._tableview_datas[i].isCheck = toggle.isChecked;
            }
        }

        if (isFresh) {
            this._tableview.refreshView();
            this._checkDeleteBtnEnabled();
        }

        // 此处追加处理"取消"按钮
        let hasCheck: boolean = false;
        for (let i = 0; i < this._banner_toggles.length; ++i) {
            if (this._banner_toggles[i].isChecked) {
                hasCheck = true;
                break;
            }
        }
        this._setBtnTouchEnabled(this.btn_cancel, hasCheck);
    }

    /**
     * 子项"item"点击勾选
     * @param params 
     */
    private _onMsgFavorListItemToggle(params: { index: number, isCheck: boolean }): void {
        if (params.index >= 0 && params.index < this._tableview_datas.length) {
            this._tableview_datas[params.index].isCheck = params.isCheck;
            this._tableview.refreshView();
            this._checkDeleteBtnEnabled();
            this._checkBannerToggleIsCheck();
        }
        else {
            console.error(`${GameReviewFavorList.g_class_name} - error: favorListItem toggle event is wrong(${params.index}, ${this._tableview_datas.length})`);
        }
    }

    /**
     * 子项"item"点击自身
     * @param index 
     */
    private _onMsgFavorListItemClick(index: number): void {
        if (index >= 0 && index < this._tableview_datas.length) {
            console.log(`${GameReviewFavorList.g_class_name} - favorListItem index = ${index} click event`);

            let isAnim: boolean = true;
            let pageIndex: number = Math.max(0, gameDataMgr.tCollectPokerMapData.totalCount - 1 - index);
            let favorReplay: GameReviewFavorReplay = GameReviewFavorReplay.initSingleInst(this.prefab_favor_replay);
            favorReplay.autoShow(pageIndex, isAnim);
            this.autoHide(isAnim, cv.action.eMoveActionDir.EMAD_TO_LEFT);
        }
        else {
            console.error(`${GameReviewFavorList.g_class_name} - error: favorListItem click event is wrong(${index}, ${this._tableview_datas.length})`);
        }
    }
}
