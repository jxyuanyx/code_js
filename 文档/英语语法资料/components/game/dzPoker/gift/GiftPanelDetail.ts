import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { Deque } from "../../../../common/tools/Deque";
import { HashMap } from "../../../../common/tools/HashMap";
import { CircleSprite } from "../../../../common/tools/CircleSprite";

import { GiftAnnouncement, GiftBanner, GiftData, GiftNewsInfo } from "./GiftData";
import { GiftPanelDetailItemSys } from "./GiftPanelDetailItemSys";
import { TableView, TableViewScrollToDir } from "../../../../common/tools/TableView";
import { GiftPanelDetailItemMsg, GiftPanelDetailItemMsgData } from "./GiftPanelDetailItemMsg";
import { GiftRankItem } from "./GiftRankItem";

/**
 * 布局节点类型枚举
 */
enum LayoutNodeType {
    /**
     * 横幅
     */
    BANNER = 0,

    /**
     * 公告
     */
    ANNOUNCEMENT,

    /**
     * "系统"消息滚动视图
     */
    SCROLLVIEW_SYS,

    /**
     * "礼物/弹幕"消息滚动视图
     */
    SCROLLVIEW_MSG,
}

/**
 * 布局节点信息结构
 */
class LayoutNodeInfo {
    active: boolean = false;
    pos: cc.Vec2 = cc.Vec2.ZERO;
    size: cc.Size = cc.Size.ZERO;
    widget_top: number = 0;
    widget_bottom: number = 0;
}

/**
 * 帧计算"礼物/弹幕"消息结构
 */
class FrameCalMsgViewInfo {
    /**
     * 是否开启帧计算
     */
    turnOn: boolean = false;

    /**
     * 分帧时间
     */
    frameTime: number = 0.2;

    /**
     * 分帧数量
     */
    frameCount: number = 0;

    /**
     * 消息队列
     */
    objs_deque: Deque<GiftNewsInfo> = new Deque();

    /**
     * 缓存消息对列
     */
    tmp_objs_deque: Deque<GiftNewsInfo> = new Deque();
}

/**
 * 礼物详情信息面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GiftPanelDetail extends cc.Component {
    @property(cc.Node) img_shield: cc.Node = null;
    @property([cc.Node]) node_rank_tops: cc.Node[] = [];
    @property(cc.Node) node_no_msg: cc.Node = null;
    @property(cc.Node) node_no_rank: cc.Node = null;
    @property(cc.Node) node_no_ranklist: cc.Node = null;

    @property(cc.Node) panel_main: cc.Node = null;
    @property(cc.Node) panel_detail: cc.Node = null;
    @property(cc.Node) panel_rank: cc.Node = null;
    @property(cc.Node) panel_banner: cc.Node = null;
    @property(cc.Node) panel_announcement: cc.Node = null;

    @property(cc.Node) btn_rank: cc.Node = null;
    @property(cc.Node) btn_rank_back: cc.Node = null;

    @property(TableView) scrollview_sys: TableView = null;
    @property(TableView) scrollview_msg: TableView = null;
    @property(TableView) scrollview_rank: TableView = null;

    static g_class_name: string = "GiftPanelDetail";
    private _layoutNodeMap: HashMap<LayoutNodeType, LayoutNodeInfo> = new HashMap();
    private _msg_objs: any[] = [];

    private _isAutoActing: boolean = false;                                                 // 是否播放显隐动作
    private _msgViewTmpNode1: cc.Node = null;                                               // 渲染计算富文本行数的临时节点实例
    private _msgViewTmpNode2: cc.Node = null;                                               // 渲染计算富文本行数的临时节点实例
    private _frameMsgInfo: FrameCalMsgViewInfo = new FrameCalMsgViewInfo();                 // 分帧计算结构
    private _sys_identity_list: number[] = [1, 3];                                          // 显示在系统栏的玩家动态消息的身份标志数组(identity: 0.普通 1.明星 2.解说员 3.特邀玩家)

    private _panel_main_src_pos: cc.Vec2 = cc.Vec2.ZERO;
    private _panel_detail_src_pos: cc.Vec2 = cc.Vec2.ZERO;
    private _panel_rank_src_pos: cc.Vec2 = cc.Vec2.ZERO;

    autoShow(isAnim: boolean = true): void {
        this.node.active = true;
        this.panel_detail.active = true;
        this.panel_rank.active = false;
        this._updateDetailView(false);

        let during: number = isAnim ? 0.2 : 0;
        let pos_in: cc.Vec2 = cc.v2(this._panel_main_src_pos);
        let pos_out: cc.Vec2 = cc.v2(this._panel_main_src_pos.x - this.panel_main.width, this._panel_main_src_pos.y);
        this._autoAnimFunc(this.panel_main, pos_in, pos_out, true, during, this._showMainlPanelAnimFinish.bind(this));
    }

    autoHide(isAnim: boolean = true): void {
        let during: number = isAnim ? 0.2 : 0;
        let pos_in: cc.Vec2 = cc.v2(this._panel_main_src_pos);
        let pos_out: cc.Vec2 = cc.v2(this._panel_main_src_pos.x - this.panel_main.width, this._panel_main_src_pos.y);
        this._autoAnimFunc(this.panel_main, pos_in, pos_out, false, during, this._showMainlPanelAnimFinish.bind(this));
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this._init();
        this._registerEvent();

        this.node.on(cc.Node.EventType.TOUCH_END, () => { this.autoHide(); });
        this.btn_rank.on("click", this._onClickRank, this);
        this.btn_rank_back.on("click", this._onClickRankBack, this);
        this.panel_banner.on(cc.Node.EventType.TOUCH_END, this._onClickPanelBanner, this);
    }

    protected start(): void {
        // 更新静态文本
        this._updateStaticText();
    }

    /**
     * 组件被销毁
     * 反注册消息要写在"onDestroy"里, 随着组件被销毁再销毁监听的消息
     * 处于性能考虑, 就算界面隐藏也要监听消息, 后台插入数据, 显示的时候就直接开始计算了
     * 目的是为了在显示滚动视图的时候不重复计算富文本渲染高度, 量大不能重复计算, 要保证
     * 每次分帧计算的数据都是新数据
     */
    protected onDestroy(): void {
        this._unregisterEvent();
    }

    protected update(): void {
        // 是否开启分帧计算
        if (this._frameMsgInfo.turnOn) {
            if (this._frameMsgInfo.objs_deque.size() > 0) {
                for (let i = 0; i < this._frameMsgInfo.frameCount; ++i) {
                    let news: GiftNewsInfo = this._frameMsgInfo.objs_deque.pop_front();
                    if (news) {
                        this._calculateFrameMsgView(news);
                    }
                }

                // 隐藏计算节点
                this._msgViewTmpNode1.active = false;
                this._msgViewTmpNode2.active = false;
            }
            else {
                if (this._frameMsgInfo.tmp_objs_deque.size() > 0) {
                    for (let i = 0; i < this._frameMsgInfo.tmp_objs_deque.size(); ++i) {
                        let news: GiftNewsInfo = this._frameMsgInfo.tmp_objs_deque.pop_front();
                        this._frameMsgInfo.objs_deque.push_back(news);
                        this._frameMsgInfo.turnOn = true;
                    }

                    // 刷新分帧数量
                    let frames: number = this._frameMsgInfo.frameTime * cc.game.getFrameRate();
                    this._frameMsgInfo.frameCount = Math.ceil(this._frameMsgInfo.objs_deque.size() / frames);
                    this._frameMsgInfo.frameCount = Math.max(this._frameMsgInfo.frameCount, 1);
                }
                else {
                    // 关闭分帧计算
                    this._frameMsgInfo.turnOn = false;

                    // 隐藏计算节点
                    this._msgViewTmpNode1.active = false;
                    this._msgViewTmpNode2.active = false;

                    // 刷新视图
                    this.scrollview_msg.bindData(this._msg_objs);
                    this.scrollview_msg.scrollToDir(TableViewScrollToDir.BOTTOM);
                }
            }
        }
    }

    private _registerEvent(): void {
        cv.MessageCenter.register(GiftData.GIFT_MSG_NOTICE_NEWS, this._onMsgGiftNews.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_RESP_RANKLIST, this._onMsgRankList.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_NOTICE_NEWS, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_RESP_RANKLIST, this.node);
    }

    private _init(): void {
        // 初始化布局信息
        this._initLayout();

        // 初始化"临时节点实例"
        if (!this._msgViewTmpNode1) {
            this._msgViewTmpNode1 = cc.instantiate(this.scrollview_msg.prefabTypes[1]);
            this.scrollview_msg.node.addChild(this._msgViewTmpNode1);
            this._msgViewTmpNode1.active = false;
        }

        if (!this._msgViewTmpNode2) {
            this._msgViewTmpNode2 = cc.instantiate(this.scrollview_msg.prefabTypes[0]);
            this.scrollview_msg.node.addChild(this._msgViewTmpNode2);
            this._msgViewTmpNode2.active = false;
        }

        // 初始化帧计算 
        do {
            this._frameMsgInfo.objs_deque.clear();
            this._frameMsgInfo.tmp_objs_deque.clear();

            // 普通玩家动态消息
            let playerDynamicList: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getPlayerDynamicListByIdentity(this._sys_identity_list, false);
            for (let i = 0; i < playerDynamicList.length; ++i) { this._frameMsgInfo.objs_deque.push_back(playerDynamicList[i]); }

            // 礼物消息
            let giftNewsList: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getGiftNewsInfoByNewsType(game_pb.NewsType.NewsType_Tip);
            for (let i = 0; i < giftNewsList.length; ++i) { this._frameMsgInfo.objs_deque.push_back(giftNewsList[i]); }

            // 弹幕消息
            let barrageList: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getGiftNewsInfoByBarrage();
            for (let i = 0; i < barrageList.length; ++i) { this._frameMsgInfo.objs_deque.push_back(barrageList[i]); }

            // 填充帧计算
            let frames: number = this._frameMsgInfo.frameTime * cc.game.getFrameRate();
            this._frameMsgInfo.frameCount = Math.ceil(this._frameMsgInfo.objs_deque.size() / frames);
            this._frameMsgInfo.frameCount = Math.max(this._frameMsgInfo.frameCount, 1);
        } while (false);
    }

    /**
     * 初始化布局信息
     */
    private _initLayout(): void {
        // src pos
        this._panel_main_src_pos = cc.v2(this.panel_main.position);
        this._panel_detail_src_pos = cc.v2(this.panel_detail.position);
        this._panel_rank_src_pos = cc.v2(this.panel_rank.position);

        // banner
        do {
            let t: LayoutNodeInfo = new LayoutNodeInfo();
            let widget: cc.Widget = this.panel_banner.getComponent(cc.Widget);
            t.pos = cc.v2(this.panel_banner.position);
            t.size = cc.size(this.panel_banner.getContentSize());
            t.widget_top = widget.top;
            t.widget_bottom = widget.bottom;
            this._layoutNodeMap.add(LayoutNodeType.BANNER, t);
        } while (false);

        // announcement
        do {
            let t: LayoutNodeInfo = new LayoutNodeInfo();
            let widget: cc.Widget = this.panel_announcement.getComponent(cc.Widget);
            t.pos = cc.v2(this.panel_announcement.position);
            t.size = cc.size(this.panel_announcement.getContentSize());
            t.widget_top = widget.top;
            t.widget_bottom = widget.bottom;
            this._layoutNodeMap.add(LayoutNodeType.ANNOUNCEMENT, t);
        } while (false);

        // scrollview_sys
        do {
            let t: LayoutNodeInfo = new LayoutNodeInfo();
            let widget: cc.Widget = this.scrollview_sys.getComponent(cc.Widget);
            t.pos = cc.v2(this.scrollview_sys.node.position);
            t.size = cc.size(this.scrollview_sys.node.getContentSize());
            t.widget_top = widget.top;
            t.widget_bottom = widget.bottom;
            this._layoutNodeMap.add(LayoutNodeType.SCROLLVIEW_SYS, t);
        } while (false);

        // scrollview_msg
        do {
            let t: LayoutNodeInfo = new LayoutNodeInfo();
            let widget: cc.Widget = this.scrollview_msg.getComponent(cc.Widget);
            t.pos = cc.v2(this.scrollview_msg.node.position);
            t.size = cc.size(this.scrollview_msg.node.getContentSize());
            t.widget_top = widget.top;
            t.widget_bottom = widget.bottom;
            this._layoutNodeMap.add(LayoutNodeType.SCROLLVIEW_MSG, t);
        } while (false);
    }

    /**
     * 刷新布局(处于性能考虑, 避免多次刷新滚动视图加入参数严格控制)
     * @param isFlushScorllView 是否在布局后强制刷新滚动视图(默认: true)
     */
    private _updateLayout(isFlushScorllView: boolean = true): void {
        let offset: number = 0;
        let lastLayoutInfo: LayoutNodeInfo = null;

        let banner: GiftBanner = cv.GameDataManager.tGiftData.getGiftBanner();
        let announcement: GiftAnnouncement = cv.GameDataManager.tGiftData.getGiftAnnouncement();
        let news_sys: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getPlayerDynamicListByIdentity(this._sys_identity_list);

        // 横幅
        do {
            this.panel_banner.active = banner.img.length > 0;

            let t: LayoutNodeInfo = this._layoutNodeMap.get(LayoutNodeType.BANNER);
            t.active = this.panel_banner.active;

            if (!t.active) offset += t.size.height;
            lastLayoutInfo = t;
        } while (false);

        // 公告
        do {
            this.panel_announcement.active = `${announcement.title}${announcement.announce}`.length > 0;

            let t: LayoutNodeInfo = this._layoutNodeMap.get(LayoutNodeType.ANNOUNCEMENT);
            t.active = this.panel_announcement.active;

            if (lastLayoutInfo && !lastLayoutInfo.active) {
                let spacing: number = t.widget_top - lastLayoutInfo.widget_top - lastLayoutInfo.size.height;
                offset += spacing;
            }

            if (t.active) {
                let widget: cc.Widget = this.panel_announcement.getComponent(cc.Widget);
                widget.top = t.widget_top - offset;
                widget.bottom = t.widget_bottom + offset;
            }
            else {
                offset += t.size.height;
            }

            lastLayoutInfo = t;
        } while (false);

        // 系统消息(默认上限显示3行)
        do {
            let limit_count: number = 3;
            let tmp_size: cc.Size = cc.Size.ZERO;
            this.scrollview_sys.node.active = news_sys.length > 0;

            let t: LayoutNodeInfo = this._layoutNodeMap.get(LayoutNodeType.SCROLLVIEW_SYS);
            t.active = this.scrollview_sys.node.active;

            if (lastLayoutInfo && !lastLayoutInfo.active) {
                let spacing: number = t.widget_top - lastLayoutInfo.widget_top - lastLayoutInfo.size.height;
                offset += spacing;
            }

            if (t.active) {
                tmp_size.width = t.size.width;
                tmp_size.height = t.size.height;
                if (news_sys.length < limit_count) {
                    tmp_size.height /= limit_count;
                    tmp_size.height *= news_sys.length;
                }

                // 计算间距(多个则纵向等间距)
                if (news_sys.length > 1) {
                    let item_spacing: number = t.size.height - limit_count * this.scrollview_sys.prefabTypes[0].data.height;
                    item_spacing = cv.Number(item_spacing / (limit_count - 1));
                    this.scrollview_sys.spacing = item_spacing;
                    this.scrollview_sys.paddingStart = 0;
                    this.scrollview_sys.paddingEnd = 0;
                }
                // 一个则纵向居中
                else {
                    let padding: number = (tmp_size.height - this.scrollview_sys.prefabTypes[0].data.height) / 2;
                    this.scrollview_sys.spacing = 0;
                    this.scrollview_sys.paddingStart = padding;
                    this.scrollview_sys.paddingEnd = padding;
                }

                // 设置大小(没有绑定底部对齐, 需要手动设置大小)
                this.scrollview_sys.node.setContentSize(tmp_size);

                let dis: number = t.size.height - tmp_size.height;
                let widget: cc.Widget = this.scrollview_sys.getComponent(cc.Widget);
                widget.top = t.widget_top - offset;
                widget.bottom = t.widget_bottom + offset + dis;
            }

            offset += t.size.height - tmp_size.height;
            lastLayoutInfo = t;
        } while (false);

        // 礼物消息
        if (this.scrollview_msg.node.active) {
            let t: LayoutNodeInfo = this._layoutNodeMap.get(LayoutNodeType.SCROLLVIEW_MSG);
            if (lastLayoutInfo && !lastLayoutInfo.active) {
                let spacing: number = t.widget_top - lastLayoutInfo.widget_top - lastLayoutInfo.size.height;
                offset += spacing;
            }

            // 设置大小
            let tmp_size: cc.Size = cc.size(t.size.width, t.size.height + offset);
            this.scrollview_msg.node.setContentSize(tmp_size);

            let widget: cc.Widget = this.scrollview_msg.getComponent(cc.Widget);
            widget.top = t.widget_top - offset;
            widget.bottom = t.widget_bottom;
        }

        // 刷新对齐
        cv.resMgr.adaptWidget(this.panel_detail, true);

        // 刷新滚动视图区域(对齐确定大小后再刷新)
        if (this.scrollview_sys.node.active) this.scrollview_sys.resetScrollVewSize(this.scrollview_sys.node.getContentSize(), true);
        if (this.scrollview_msg.node.active) this.scrollview_msg.resetScrollVewSize(this.scrollview_msg.node.getContentSize(), true);

        // 是否需要刷新滚动视图
        if (isFlushScorllView) {
            this.scrollview_sys.scrollToDir(TableViewScrollToDir.BOTTOM);
            this.scrollview_msg.scrollToDir(TableViewScrollToDir.BOTTOM);
        }
    }

    /**
     * 帧计算富文本行数和大小
     * @param news 
     */
    private _calculateFrameMsgView(news: GiftNewsInfo | GiftNewsInfo[]): void {
        //  获取富文本行数
        this._msgViewTmpNode1.active = true;
        this._msgViewTmpNode2.active = true;
        let skipLength: number = this.scrollview_msg.prefabTypes.length / 2;
        let richText1: cc.RichText = this._msgViewTmpNode1.getComponent(cc.RichText);
        let richText2: cc.RichText = this._msgViewTmpNode2.getComponent(cc.RichText);

        let getRichTextRows: (richText1: cc.RichText, richText2: cc.RichText, text: string, outSize: cc.Size) => number
            = (richText1: cc.RichText, richText2: cc.RichText, text: string, outSize: cc.Size): number => {
                let rows: number = 0;

                richText1.maxWidth = richText1.node.width;
                richText1.string = "";
                richText1.string = text;

                // 计算行数索引
                let size: cc.Size = cv.resMgr.getRichTextStringSize(richText1);
                rows = Math.floor(size.height / richText1.lineHeight);
                rows -= 1;
                rows = Math.max(0, rows);

                // 计算单行总大小(主要用于返回文本宽度)
                // 必须要单开一个富文本, 同一个覆写会高频率宽度误差bug
                richText2.maxWidth = 0;
                richText2.string = "";
                richText2.string = text;
                size = cv.resMgr.getRichTextStringSize(richText2);
                outSize.width = size.width;
                outSize.height = size.height;

                return rows;
            }

        // 填充数据至数组中
        let infos: GiftNewsInfo[] = [];
        if (Array.isArray(news)) {
            infos = news;
        }
        else {
            infos.push(news);
        }

        // 开始计算
        for (let i = 0; i < infos.length; ++i) {
            let t: GiftNewsInfo = infos[i];
            let data: GiftPanelDetailItemMsgData = null;

            // 礼物消息
            if (t.gift) {
                let text: string = "";
                let rows: number = 0;
                let size: cc.Size = cc.Size.ZERO;

                switch (t.gift.newsType) {
                    case game_pb.NewsType.NewsType_Tip: {
                        let giftID: number = t.gift.tip.tipId;
                        let giftCount: number = t.gift.tip.tipCount;
                        let strGiftName: string = cv.config.getStringData(`Gift_category_${giftID}`);
                        let strGiftCount: string = giftID > 1000 ? ` <img src="gift_icon_${giftID}"/>` : ` x ${giftCount}`;
                        let strSent: string = cv.config.getStringData("Gift_sent");
                        let strSender: string = t.gift.player.nickname;
                        let strRecipient: string = `<img src="img_icon_star"/> <color=#FFCD7E>${t.gift.toPlayer.nickname}</color>`;

                        text = `${strSender} ${strSent} ${strRecipient} ${strGiftName} ${strGiftCount}`;
                        rows = getRichTextRows(richText1, richText2, text, size);
                        if (giftID > 1000) rows += skipLength;
                    } break;

                    case game_pb.NewsType.NewsType_PlayerDynamic: {
                        // 不是解说员的普通玩家则提示动态消息
                        if (t.gift.player.identity === 2) return;
                        text = `<color=#6B6D71>${t.gift.player.nickname} ${cv.config.getStringData("Gift_welcome_to_room")}</color>`;
                        rows = getRichTextRows(richText1, richText2, text, size);
                    } break;

                    default: break;
                }

                data = new GiftPanelDetailItemMsgData();
                data.text = text;
                data.width = size.width;
                data.typeIdx = rows;
                data.isGiftMsg = true;
            }
            // 弹幕消息
            else if (t.barrage) {
                let isSelfSend: boolean = t.barrage.playerid === cv.dataHandler.getUserData().u32Uid;
                let strSenderColor: string = isSelfSend ? "#CA7929" : "#86592C";
                let strSender: string = `<color=${strSenderColor}>${t.barrage.nickname}</color>:`;
                let strAtName: string = "";
                if (t.barrage.at_list.length > 0) strAtName = `<color=#FFAB00>${t.barrage.at_list[0]}</color> `;
                let content: string = "";

                switch (t.barrage.ctype) {
                    case game_pb.BarrageType.Enum_Liked: {
                        content = cv.StringTools.formatC(cv.config.getStringData("Star_danmu_like"), t.barrage.liked_nickname, t.barrage.nickname);
                    } break;

                    case game_pb.BarrageType.Enum_Custom: {
                        content = t.barrage.content;
                    } break;

                    default: {
                        if (cv.StringTools.isNumber(t.barrage.content)) {
                            content = cv.config.getStringData(`Faceview_danmu_text_${t.barrage.content}`);
                        }
                        else {
                            content = t.barrage.content;
                        }
                    } break;
                }

                let text: string = `${strSender} ${strAtName} ${content}`;
                let size: cc.Size = cc.Size.ZERO;
                let rows: number = getRichTextRows(richText1, richText2, text, size);
                if (isSelfSend) rows += skipLength;

                data = new GiftPanelDetailItemMsgData();
                data.text = text;
                data.width = size.width;
                data.typeIdx = rows;
                data.isGiftMsg = false;
            }

            // push到数组中等待刷新
            if (data) {
                if (this._msg_objs.length >= GiftData.GIFT_NEWS_MAXCOUNT) this._msg_objs.splice(0, 1);
                this._msg_objs.push({ prefab_type: data.typeIdx, prefab_component: GiftPanelDetailItemMsg, prefab_datas: data });
            }
        }
    }

    private _updateStaticText(): void {
        // 布局"贡献排行榜"按钮大小
        do {
            let offset: number = 21;
            let img_rank: cc.Node = this.btn_rank.getChildByName("img");
            let txt_rank: cc.Label = this.btn_rank.getChildByName("txt").getComponent(cc.Label);
            txt_rank.string = cv.config.getStringData("Gift_rank");
            let txt_rank_w: number = cv.resMgr.getLabelStringSize(txt_rank).width;
            let total_w: number = img_rank.width + offset + txt_rank_w;

            let x: number = 0;
            this.btn_rank.setContentSize(total_w, this.btn_rank.height);
            x = this.btn_rank.width * (1 - this.btn_rank.anchorX);
            x -= img_rank.width * (1 - img_rank.anchorX);
            img_rank.x = x;
            x -= img_rank.width * img_rank.anchorX;
            x -= offset;
            x -= txt_rank_w * (1 - txt_rank.node.anchorX);
            txt_rank.node.x = x;
        } while (false);

        let txt_no_msg: cc.Label = this.node_no_msg.getChildByName("txt").getComponent(cc.Label);
        txt_no_msg.string = cv.config.getStringData("Gift_nomsg");

        let txt_no_rank: cc.Label = this.node_no_rank.getChildByName("txt").getComponent(cc.Label);
        txt_no_rank.string = cv.config.getStringData("Gift_wait");

        let txt_no_ranklist: cc.Label = this.node_no_ranklist.getChildByName("txt").getComponent(cc.Label);
        txt_no_ranklist.string = cv.config.getStringData("Gift_wait");

        let txt_panel_rank_title: cc.Label = this.panel_rank.getChildByName("txt_title").getComponent(cc.Label);
        txt_panel_rank_title.string = cv.config.getStringData("Gift_rank");
    }

    private _updateRankTops(): void {
        if (!this.node.active || !this.panel_detail.active) return;

        let rankTops: readonly game_pb.TipUserContr[] = cv.GameDataManager.tGiftData.getGiftRankListTops();
        this.node_no_rank.active = rankTops.length <= 0;

        for (let i = 0; i < this.node_rank_tops.length; ++i) {
            this.node_rank_tops[i].active = i < rankTops.length;
            if (i >= rankTops.length) continue;

            let txt_name: cc.Label = this.node_rank_tops[i].getChildByName("txt_name").getComponent(cc.Label);
            let txt_gold: cc.Label = this.node_rank_tops[i].getChildByName("txt_gold").getComponent(cc.Label);
            txt_name.string = rankTops[i].player.nickname;
            txt_gold.string = cv.StringTools.numToFloatString(rankTops[i].contr);

            let head_mask: cc.Node = cc.find("node_head/mask", this.node_rank_tops[i]);
            CircleSprite.setCircleSprite(head_mask, rankTops[i].player.avatar, rankTops[i].player.plat);
        }
    }

    private _updateBanner(): boolean {
        let isNeedLayout: boolean = false;

        if (this.node.active && this.panel_detail.active) {
            let banner: GiftBanner = cv.GameDataManager.tGiftData.getGiftBanner();
            let lastActive: boolean = this.panel_banner.active;
            this.panel_banner.active = banner.img.length > 0;
            isNeedLayout = lastActive !== this.panel_banner.active;

            if (this.panel_banner.active) {
                let sprite: cc.Sprite = this.panel_banner.getComponent(cc.Sprite);
                if (!sprite) {
                    sprite = this.panel_banner.addComponent(cc.Sprite);
                    sprite.type = cc.Sprite.Type.SIMPLE;
                    sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                }

                sprite.spriteFrame = null;
                cv.resMgr.loadRemote(banner.img, (error: Error, texture: cc.Texture2D): void => {
                    if (!sprite || !cc.isValid(sprite, true)) return;
                    if (error) {
                        console.log(error.message || error);
                        cv.resMgr.setSpriteFrame(sprite.node, cv.tools.getBackgroundBannerImgPath());
                        return;
                    }
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                });
            }
        }

        return isNeedLayout;
    }

    private _onClickPanelBanner(): void {
        let banner: GiftBanner = cv.GameDataManager.tGiftData.getGiftBanner();
        if (banner.link.length <= 0) return;

        if (cc.sys.isBrowser) {
            window.open(banner.link);
        }
        else if (cc.sys.isNative) {
            let curScene: cc.Scene = cc.director.getScene();
            let nodeName: string = `${GiftPanelDetail.g_class_name}_PanelBanner_Web_Node`;

            let node: cc.Node = curScene.getChildByName(nodeName);
            if (!node) {
                node = new cc.Node();
                node.name = nodeName;
                node.setContentSize(cc.winSize);
                node.setAnchorPoint(cc.v2(0.5, 0.5));
                node.setPosition(cc.winSize.width * node.anchorX, cc.winSize.height * node.anchorY);
                curScene.addChild(node);
            }

            let web: cc.WebView = node.getComponent(cc.WebView);
            if (!web) web = node.addComponent(cc.WebView);

            web.url = banner.link;
            web.setJavascriptInterfaceScheme("ccjs");
            web.setOnJSCallback((webView: cc.WebView, url: string) => {
                if (url.search("ccjs://https") != -1 || url.search("ccjs://http") != -1) {
                    node.removeFromParent();
                    node.destroy();
                }
            });
        }
    }

    private _updateAnnouncement(): boolean {
        let isNeedLayout: boolean = false;

        if (this.node.active && this.panel_detail.active) {
            let announcement: GiftAnnouncement = cv.GameDataManager.tGiftData.getGiftAnnouncement();

            let wrap: string = "";
            if (announcement.title.length > 0 && announcement.announce.length > 0) {
                wrap = "\n";
            }

            let scrollView: cc.ScrollView = this.panel_announcement.getComponent(cc.ScrollView);
            let txt: cc.Label = scrollView.content.getChildByName("txt").getComponent(cc.Label);
            let srcStrDesc: string = `${announcement.title}${wrap}${announcement.announce}`;
            let tarStrDesc: string = cv.StringTools.calculateAutoWrapString(txt.node, srcStrDesc);
            txt.string = tarStrDesc;

            let sz_inner: cc.Size = scrollView.content.getContentSize();                    // 内框滚动区大小
            let sz_content: cc.Size = cv.resMgr.getLabelStringSize(txt);                    // 填充内容后的大小
            let real_h: number = sz_content.height + 23;
            let offset_h: number = real_h - sz_inner.height;

            // 对齐方式(未超框则横向居中, 超框则横向居左)
            if (real_h <= scrollView.node.height) {
                txt.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            }
            else {
                txt.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
            }

            // 滚动区域大小
            if (offset_h > 0) {
                sz_inner.height += offset_h;
                scrollView.content.setContentSize(sz_inner);
            }

            // 是否需要刷新布局
            let lastActive: boolean = this.panel_announcement.active;
            this.panel_announcement.active = txt.string.length > 0;
            isNeedLayout = lastActive !== this.panel_announcement.active;
        }

        return isNeedLayout;
    }

    private _updateNewsSys(): boolean {
        let isNeedLayout: boolean = false;

        if (this.node.active && this.panel_detail.active) {
            let news_sys: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getPlayerDynamicListByIdentity(this._sys_identity_list);
            if (news_sys.length > 0) {
                this.scrollview_sys.node.active = true;
                if (news_sys.length <= 3) isNeedLayout = true;

                let objs: any = { prefab_type: 0, prefab_component: GiftPanelDetailItemSys, prefab_datas: news_sys };
                this.scrollview_sys.bindData(objs);
                this.scrollview_sys.scrollToDir(TableViewScrollToDir.BOTTOM);
            }
            else {
                this.scrollview_sys.clearView();
                this.scrollview_sys.node.active = false;
                isNeedLayout = true;
            }
        }

        return isNeedLayout;
    }

    /**
     * 更新"礼物/弹幕"消息(出于性能考虑, 节点隐藏也缓存, 用于激活时帧计算)
     * @param news 
     */
    private _updateNewsMsg(news: GiftNewsInfo | GiftNewsInfo[]): void {
        // 若正在进行帧计算, 则新来的数据保存至临时队列里
        if (this._frameMsgInfo.turnOn) {
            if (Array.isArray(news)) {
                for (let i = 0; i < news.length; ++i) {
                    this._frameMsgInfo.tmp_objs_deque.push_back(news[i]);
                }
            }
            else {
                this._frameMsgInfo.tmp_objs_deque.push_back(news);
            }
        }
        // 不在帧计算内, 则加入帧计算中
        else {
            if (Array.isArray(news)) {
                for (let i = 0; i < news.length; ++i) {
                    this._frameMsgInfo.objs_deque.push_back(news[i]);
                }
            }
            else {
                this._frameMsgInfo.objs_deque.push_back(news);
            }

            // 刷新分帧数量
            let frames: number = this._frameMsgInfo.frameTime * cc.game.getFrameRate();
            this._frameMsgInfo.frameCount = Math.ceil(this._frameMsgInfo.objs_deque.size() / frames);
            this._frameMsgInfo.frameCount = Math.max(this._frameMsgInfo.frameCount, 1);

            // 开启帧计算
            this._frameMsgInfo.turnOn = this.panel_detail.active;
        }
    }

    /**
     * 更新"详情面板"视图(出于性能考虑, 只有在显示动画完毕后才开启帧计算)
     * @param isTurnOnFrameCalculate 是否开启帧计算
     */
    private _updateDetailView(isTurnOnFrameCalculate: boolean): void {
        this._updateRankTops();

        this._updateBanner();
        this._updateAnnouncement();
        this._updateNewsSys();
        this._updateLayout(isTurnOnFrameCalculate);

        let newsInfo: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getGiftNewsInfo();
        this.node_no_msg.active = newsInfo.length <= 0;

        // 隐藏计算节点
        this._msgViewTmpNode1.active = false;
        this._msgViewTmpNode2.active = false;

        // 是否开启帧计算(无论有队列否最后都刷新其视图且关闭帧计算)
        if (isTurnOnFrameCalculate) this._frameMsgInfo.turnOn = true;
    }

    private _resetDetailView(): void {
        // 清理滚动视图
        this.scrollview_sys.clearView();
        this.scrollview_msg.clearView();

        // 隐藏计算节点
        this._msgViewTmpNode1.active = false;
        this._msgViewTmpNode2.active = false;
    }

    /**
     * 更新"排行榜面板"视图
     */
    private _updateRankPanel(): void {
        if (!this.node.active || !this.panel_rank.active) return;

        let rankList: readonly game_pb.TipUserContr[] = cv.GameDataManager.tGiftData.getGiftRankList();
        this.node_no_ranklist.active = rankList.length <= 0;

        if (rankList.length > 0) {
            let objs: any = { prefab_type: 0, prefab_component: GiftRankItem, prefab_datas: rankList };
            this.scrollview_rank.bindData(objs);
            this.scrollview_rank.reloadView();
        }
        else {
            this.scrollview_rank.clearView();
        }
    }

    /**
     * "礼物/弹幕"消息(如果正在显隐动作则跳过, 数据已经插入了, 显隐动作结束的回调会自行处理)
     * @param t 
     * @returns 
     */
    private _onMsgGiftNews(t: GiftNewsInfo): void {
        if (!t || this._isAutoActing) return;

        this.node_no_msg.active = false;
        let isNeedLayout: boolean = false;

        // 礼物消息
        if (t.gift) {
            // 前3名有变化
            if (cv.StringTools.getArrayLength(t.gift.rankChangePlayers) > 0) {
                this._updateRankTops();
            }

            // 列表消息
            switch (t.gift.newsType) {
                case game_pb.NewsType.NewsType_Banner: isNeedLayout ||= this._updateBanner(); break;
                case game_pb.NewsType.NewsType_Announcement: isNeedLayout ||= this._updateAnnouncement(); break;

                case game_pb.NewsType.NewsType_PlayerDynamic: {
                    let isMatchIdentities: boolean = false;
                    for (let i = 0; i < this._sys_identity_list.length; ++i) {
                        if (t.gift.player.identity === this._sys_identity_list[i]) {
                            isMatchIdentities = true;
                            break;
                        }
                    }

                    if (isMatchIdentities) {
                        isNeedLayout ||= this._updateNewsSys();
                    }
                    else {
                        this._updateNewsMsg(t);
                    }
                } break;

                case game_pb.NewsType.NewsType_Tip: this._updateNewsMsg(t); break;
            }
        }
        // 弹幕消息
        else if (t.barrage) {
            this._updateNewsMsg(t);
        }

        // 是否需要刷新布局
        if (isNeedLayout) {
            this._updateLayout();
        }
    }

    /**
     * 接收排行榜列表消息
     */
    private _onMsgRankList(): void {
        if (this._isAutoActing) return;
        this._updateRankPanel();
    }

    private _onClickRank(): void {
        cv.AudioMgr.playButtonSound("close");

        this.panel_main.active = true;
        let mask: cc.Mask = this.panel_main.getComponent(cc.Mask);
        if (!mask) mask = this.panel_main.addComponent(cc.Mask);
        mask.enabled = true;

        let during: number = 0.2;
        let callbackCount: number = 0;
        let pos_in: cc.Vec2 = cc.Vec2.ZERO;
        let pos_out: cc.Vec2 = cc.Vec2.ZERO;

        pos_in = cc.v2(this._panel_detail_src_pos);
        pos_out = cc.v2(this._panel_detail_src_pos.x - this.panel_detail.width, this._panel_detail_src_pos.y);
        this._autoAnimFunc(this.panel_detail, pos_in, pos_out, false, during
            , this._showRankOrDetailAnimFinish.bind(this, ++callbackCount, true), false);

        pos_in = cc.v2(this._panel_rank_src_pos);
        pos_out = cc.v2(this._panel_rank_src_pos.x + this.panel_rank.width, this._panel_rank_src_pos.y);
        this._autoAnimFunc(this.panel_rank, pos_in, pos_out, true, during
            , this._showRankOrDetailAnimFinish.bind(this, ++callbackCount, true), false);
    }

    private _onClickRankBack(): void {
        cv.AudioMgr.playButtonSound("close");

        this.panel_main.active = true;
        let mask: cc.Mask = this.panel_main.getComponent(cc.Mask);
        if (!mask) mask = this.panel_main.addComponent(cc.Mask);
        mask.enabled = true;

        let during: number = 0.2;
        let callbackCount: number = 0;
        let pos_in: cc.Vec2 = cc.Vec2.ZERO;
        let pos_out: cc.Vec2 = cc.Vec2.ZERO;

        pos_in = cc.v2(this._panel_detail_src_pos);
        pos_out = cc.v2(this._panel_detail_src_pos.x - this.panel_detail.width, this._panel_detail_src_pos.y);
        this._autoAnimFunc(this.panel_detail, pos_in, pos_out, true, during
            , this._showRankOrDetailAnimFinish.bind(this, ++callbackCount, false), false);

        pos_in = cc.v2(this._panel_rank_src_pos);
        pos_out = cc.v2(this._panel_rank_src_pos.x + this.panel_rank.width, this._panel_rank_src_pos.y);
        this._autoAnimFunc(this.panel_rank, pos_in, pos_out, false, during
            , this._showRankOrDetailAnimFinish.bind(this, ++callbackCount, false), false);
    }

    private _autoAnimFunc(actNode: cc.Node, inPos: cc.Vec2, outPos: cc.Vec2
        , actIO: boolean, duration: number, callback: (actIO: boolean) => void = null, isEasing: boolean = true): void {

        this.node.active = true;
        actNode.active = true;
        actNode.stopAllActions();

        let seq: cc.Action = null;
        let isAnim: boolean = duration > 0;

        if (actIO) {
            actNode.setPosition(outPos);

            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this._isAutoActing = false;
                // this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                // this.img_shield.active = false;
                actNode.setPosition(inPos);
                if (callback) callback(actIO);
            });

            if (isAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, inPos);

                if (isEasing) {
                    let ebo: cc.ActionInterval = mt.easing(cc.easeOut(3));
                    seq = cc.sequence(ebo, cb);
                }
                else {
                    seq = cc.sequence(mt, cb);
                }
            }
            else {
                seq = cb;
            }
        }
        else {
            actNode.setPosition(inPos);

            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this._isAutoActing = false;
                // this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                // this.img_shield.active = false;
                actNode.setPosition(inPos);
                actNode.active = false;
                if (callback) callback(actIO);
            });

            if (isAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, outPos);

                if (isEasing) {
                    let ebi: cc.ActionInterval = mt.easing(cc.easeIn(3));
                    seq = cc.sequence(ebi, cb);
                }
                else {
                    seq = cc.sequence(mt, cb);
                }
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this._isAutoActing = true;
            actNode.runAction(seq);
            this.img_shield.active = true;
            this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }

    private _showMainlPanelAnimFinish(actionIn: boolean): void {
        let mask: cc.Mask = this.panel_main.getComponent(cc.Mask);
        if (mask) mask.enabled = false;

        this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
        this.img_shield.active = false;

        if (actionIn) {
            this._updateDetailView(true);
        }
        else {
            this.node.active = false;
            this.panel_detail.active = false;
            this.panel_rank.active = false;

            this._resetDetailView();
        }
    }

    private _showRankOrDetailAnimFinish(callbackCount: number, isShowRank: boolean, actionIn: boolean): void {
        if (callbackCount !== 2) return;

        let mask: cc.Mask = this.panel_main.getComponent(cc.Mask);
        if (mask) mask.enabled = false;

        this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
        this.img_shield.active = false;

        // rank
        if (isShowRank) {
            // 清理"detail"面板视图数据
            this._resetDetailView();

            // 请求排行榜数据
            cv.gameNet.RequestTipRank();
        }
        // detail
        else {
            // 清理"rank"面板视图数据
            this.scrollview_rank.clearView();

            // 刷新"detail"面板视图
            this._updateDetailView(true);
        }
    }
}
