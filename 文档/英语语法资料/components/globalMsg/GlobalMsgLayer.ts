import ws_protocol = require("../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../lobby/cv";

import { ScrollViewReuse } from "../../common/tools/ScrollViewReuse";
import { RemindData, eRemindMsgStatus } from "../../data/globalMsg/RemindData";
import { eGlobalMsgUITopLevel, eGlobalMsgUIType } from "../../data/globalMsg/GlobalMsgDataManager";

// 消息item标记结构
export class MsgViewCellFlag {
    cellIndex: number = 0;											            // item 索引
    dataIndex: number = 0;											            // 对应数据索引
    cellType: eGlobalMsgUIType = eGlobalMsgUIType.GMSG_UI_TYPE_NONE;            // item 类型
    toplevel: eGlobalMsgUITopLevel = eGlobalMsgUITopLevel.GMSG_UI_LEVEL_NONE;	// 置顶级别
    remindData: RemindData = null;								                // 提醒类型数据
    mailData: world_pb.MailInfo = null;								            // 邮件类型数据
    msgTime: number = 0;										                // 消息时间
}

/**
 * 全局消息列表层
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GlobalMsgLayer extends cc.Component {
    @property(cc.Prefab) prefab_item: cc.Prefab = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Node) node_notice: cc.Node = null;
    @property(cc.Sprite) img_red: cc.Sprite = null;
    @property(cc.Label) txt_title: cc.Label = null;                             // 标题 文本
    @property(cc.Label) txt_new_num: cc.Label = null;                           // 未读数 文本
    @property(cc.ScrollView) scrollview: cc.ScrollView = null;

    private static _g_prefabInst: cc.Node = null;                               // 该预制件实例
    private static _g_iLanguageIndex: number = 0;								// 当前语言索引			
    private static _g_bReqMailListGlobalStatus: boolean = false;                // 请求公告(邮件)列表状态标志(只第一打开时才请求列表,true:已请求,false:未请求)
    private static _g_iMailMaxCountPerPage: number = 0;                         // 每页邮件最大数量
    private static _g_iMailMaxLimitCount: number = 99;   						// 邮件上限数量
    private static _g_iMailAttachmentDefaultIndex: number = 1;                  // 邮件附件默认数量起始下标(因为 protobuf 一旦 json 字符串有 0 或者 "", 反序列化时都忽略，所以下标从1开始)
    private static _g_vFetchMailAttachmentID: number[] = [];                    // 标记提取带有附件的邮件ID数组

    private _vCellFlagInfo: MsgViewCellFlag[] = [];                             // 标记列表
    private _bRollToTopOnce: boolean = false;                                   // 滚动到顶部标记
    private _lastRollToTopPos: cc.Vec2 = cc.Vec2.ZERO;                          // 上次滚动到顶部的位置
    private _bInitScrollViewReuseOnce: boolean = false;                         // 是否已初始化"ScrollViewReuse"预制池

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!GlobalMsgLayer._g_prefabInst) GlobalMsgLayer._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(GlobalMsgLayer._g_prefabInst.uuid)) {
            if (!cc.isValid(GlobalMsgLayer._g_prefabInst, true)) {
                GlobalMsgLayer._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return GlobalMsgLayer._g_prefabInst;
    }

    /**
     * 获取当前语言索引
     * @param mailInfo 
     */
    static getLanguageIndex(mailInfo: world_pb.MailInfo): number {
        let iLanguageIdx: number = -1;
        let mail_title_size: number = mailInfo.mail_title.length;
        if (mail_title_size > 0) {
            // iLanguageIdx = GlobalMsgLayer._g_iLanguageIndex;
            // if (GlobalMsgLayer._g_iLanguageIndex >= mail_title_size) {
            //     iLanguageIdx = mail_title_size >= 2 ? 1 : 0;
            // }
            iLanguageIdx = 0;
        }
        return iLanguageIdx;
    }

    /**
     * 设置当前语言索引
     * @param index 
     */
    static setLanguageIndex(index: number): void {
        GlobalMsgLayer._g_iLanguageIndex = index;
    }

    /**
     * 获取请求状态(true-已请求过, false-未请求过)
     */
    static getReqMailListStatus(): boolean {
        return GlobalMsgLayer._g_bReqMailListGlobalStatus;
    }

    /**
     * 标记已请求
     */
    static markReqMailListStatus(): void {
        GlobalMsgLayer._g_bReqMailListGlobalStatus = true;
    }

    /**
     * 重置公告/邮件请求状态
     */
    static resetReqMailListStatus(): void {
        GlobalMsgLayer._g_bReqMailListGlobalStatus = false;
        GlobalMsgLayer._removeFetchMailAttachmentIDAll();
    }

    /**
     * 获取邮件上限最大数量
     */
    static getMailMaxLimitCount(): number {
        return GlobalMsgLayer._g_iMailMaxLimitCount;
    }

    /**
     * 获取邮件附件默认数量起始下标
     */
    static getMailAttachmentDefaultIndex(): number {
        return GlobalMsgLayer._g_iMailAttachmentDefaultIndex;
    }

    /**
     * 请求公告列表
     */
    static requestAnnounceList(): void {
        cv.worldNet.requestAnnounceList();
    }

    /**
     * 请求邮件列表
     */
    static requestMailList(): void {
        let iMailBeginIndex: number = cv.globalMsgDataMgr.getMailList().length;
        let iMailEndIndex: number = iMailBeginIndex + GlobalMsgLayer._g_iMailMaxCountPerPage - 1;
        cv.worldNet.requestMailList(iMailBeginIndex, iMailEndIndex);
    }

    /**
     * 阅读邮件
     * @param id 
     * @param type 
     * @param attachment 
     */
    static fetchMail(id: number, type: number, attachment?: boolean): void {
        // 邮件类型 1邮件 2需要及时弹出的公告 3不需要即时弹出的公告
        switch (type) {
            case 1: cv.worldNet.requestFetchOneMail(id); break;
            case 2: break;
            case 3: cv.worldNet.requestFetchOneAnnounce(id); break;
            default: break;
        }

        // 是否带附件
        if (attachment) {
            GlobalMsgLayer._addFetchMailAttachmentID(id);
        }
    }

    /**
     * 自动显示(自动获取单例添加)
     * @param parentNode 
     * @param zIndex 
     * @param bAnim 
     */
    autoShow(parentNode?: cc.Node, zIndex?: number, bAnim: boolean = true): void {
        this._reqAnounceMailListOnce();

        if (!parentNode) parentNode = cc.director.getScene();
        if (!parentNode.getChildByUuid(this.node.uuid)) parentNode.addChild(this.node);

        this.node.active = true;
        this.node.zIndex = typeof zIndex === "number" ? cv.Number(zIndex) : parentNode.children.length + 1;

        if (bAnim) {
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_LEFT
                , cv.action.eMoveActionType.EMAT_FADE_IN
                , cv.action.delay_type.NORMAL
                , (target: cc.Node, actIO: number): void => { this._onMsgUpdateListView(); }
                , (target: cc.Node, actIO: number): void => {
                    this._initScrollViewReuseOnce();
                    this._onMsgUpdateListView();
                }, 1 / cc.game.getFrameRate());
        }
        else {
            this._initScrollViewReuseOnce();
            this._onMsgUpdateListView();
        }
    }

    /**
     * 自动隐藏
     * @param bAnim 
     */
    autoHide(bAnim: boolean = true): void {
        // 标记提醒类消息为已读
        let vRemindList: RemindData[] = cv.globalMsgDataMgr.getRemindList();
        for (let i = 0; i < vRemindList.length; ++i) {
            let data: RemindData = vRemindList[i];
            if (data.msgStatus != eRemindMsgStatus.RMSG_STATUS_PENDING) {
                data.msgNew = false;
            }
        }
        cv.MessageCenter.send("updateListView");

        // action
        if (bAnim) {
            cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT
                , cv.action.delay_type.NORMAL
                , (target: cc.Node, actIO: number): void => { }
                , (target: cc.Node, actIO: number): void => {
                    // 恢复webview
                    cv.MessageCenter.send("HideWebview_ShowWindows", true);
                });
        }
        else {
            this.node.active = false;

            // 恢复webview
            cv.MessageCenter.send("HideWebview_ShowWindows", true);
        }
    }

    /**
     * 滚动视图正在滚动时发出的事件
     * @param arg 
     */
    onSVEventScrolling(arg: cc.ScrollView): void {
        let fDIs: number = 300;
        if (this._lastRollToTopPos.y - this.scrollview.content.position.y >= fDIs && !this._bRollToTopOnce) {
            this._bRollToTopOnce = true;
            let node: cc.Node = this.scrollview.content.getChildByName("txt_loading");
            if (!node) {
                node = new cc.Node("txt_loading");
                let lab: cc.Label = node.addComponent(cc.Label);
                lab.useSystemFont = true;
                lab.fontSize = 36;
                lab.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                lab.verticalAlign = cc.Label.VerticalAlign.CENTER;
                lab.string = "Loading......";
                node.setAnchorPoint(cc.v2(0.5, 0.5));
                this.scrollview.content.addChild(node);
            }
            node.setPosition(cc.v2(0, fDIs / 2));
        }
    }

    /**
     *  滚动到顶部
     * @param arg 
     */
    onSVEventScrollToTop(arg: cc.ScrollView): void {
        this._lastRollToTopPos = cc.v2(this.scrollview.content.position);
    }

    /**
     * 滚动到顶部边界并且开始回弹
     * @param arg 
     */
    onSVEventBounceTop(arg: cc.ScrollView): void {
        if (this._bRollToTopOnce) {
            // 请求邮件列表(用于分页请求)
            if (cv.globalMsgDataMgr.getMailList().length < cv.globalMsgDataMgr.getMailCountInfo().mail_total_num) {
                GlobalMsgLayer.requestMailList();
            }
        }
    }

    /**
     * 滚动结束
     * @param arg 
     */
    onSVEventScrollEnded(arg: cc.ScrollView): void {
        this._bRollToTopOnce = false;
        this._lastRollToTopPos = cc.v2(cc.Vec2.ZERO);
        let node: cc.Node = this.scrollview.content.getChildByName("txt_loading");
        if (node) {
            node.removeFromParent(true);
            node.destroy();
        }
    }

    /**
     * 添加带附件的邮件id至对应数组容器
     * @param id 
     */
    private static _addFetchMailAttachmentID(id: number): void {
        for (let i = 0; i < GlobalMsgLayer._g_vFetchMailAttachmentID.length; ++i) {
            if (GlobalMsgLayer._g_vFetchMailAttachmentID[i] === id) return;
        }
        GlobalMsgLayer._g_vFetchMailAttachmentID.push(id);
    }

    /**
     * 是否是带附件的邮件id
     * @param id 
     */
    private static _isFetchMailAttachmentID(id: number): boolean {
        for (let i = 0; i < GlobalMsgLayer._g_vFetchMailAttachmentID.length; ++i) {
            if (GlobalMsgLayer._g_vFetchMailAttachmentID[i] === id) return true;
        }
        return false;
    }

    /**
     * 从对应数组中删除带附件的邮件id
     * @param id 
     */
    private static _removeFetchMailAttachmentID(id: number): void {
        for (let i = 0; i < GlobalMsgLayer._g_vFetchMailAttachmentID.length; ++i) {
            if (GlobalMsgLayer._g_vFetchMailAttachmentID[i] === id) {
                GlobalMsgLayer._g_vFetchMailAttachmentID.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 清除所有标记提取带有附件的邮件ID数组
     */
    private static _removeFetchMailAttachmentIDAll(): void {
        GlobalMsgLayer._g_vFetchMailAttachmentID.splice(0, GlobalMsgLayer._g_vFetchMailAttachmentID.length);
        GlobalMsgLayer._g_vFetchMailAttachmentID = [];
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation() });
        this.btn_back.node.on("click", this._onClickBack, this);

        this.img_red.node.active = false;
        this._addObserver();
    }

    protected start(): void {
        if (cv.native.isFullScreen()) {
            // 该控件刘海屏偏移"FULLSCREEN_OFFSETY"程度不够, 还是有遮挡, 做以下微调
            let widget: cc.Widget = this.node_notice.getComponent(cc.Widget);

            // 微调方案1: 修改整体缩放和顶部对齐
            if (false) {
                this.node_notice.scale = 0.75;

                // 关闭底部对齐
                widget.isAlignBottom = false;
                widget.isAbsoluteBottom = true;

                // 开启顶部对齐
                widget.isAlignTop = true;
                widget.isAbsoluteTop = true;
                let offset_y: number = this.node_notice.height * (1 - this.node_notice.scale);
                widget.top = cv.config.FULLSCREEN_OFFSETY + offset_y;
            }
            // 微调方案2: 修改整体缩放和底部对齐
            else {
                this.node_notice.scale = 0.9;

                // 关闭顶部对齐
                widget.isAlignTop = false;
                widget.isAbsoluteTop = true;

                // 开启底部对齐
                widget.isAlignBottom = true;
                widget.isAbsoluteBottom = true;
                widget.bottom = 20;
            }

            // 刷新对齐方式
            cv.resMgr.adaptWidget(this.node_notice);
        }
    }

    protected onDestroy() {
        this._removeObserver();
    }

    private _addObserver(): void {
        cv.MessageCenter.register("close_globalMsgLayer", this.autoHide.bind(this), this.node);
        cv.MessageCenter.register("updateListView", this._onMsgUpdateListView.bind(this), this.node);
        cv.MessageCenter.register("update_notice_status", this._onMsgUpdateCountStatus.bind(this), this.node);
        cv.MessageCenter.register("pb_noticefetchonemail", this._onMsgFetchOne.bind(this), this.node);
    }

    private _removeObserver(): void {
        cv.MessageCenter.unregister("close_globalMsgLayer", this.node);
        cv.MessageCenter.unregister("updateListView", this.node);
        cv.MessageCenter.unregister("update_notice_status", this.node);
        cv.MessageCenter.unregister("pb_noticefetchonemail", this.node);
    }

    /**
     * 更新静态文本
     */
    private _updateStaticText(): void {
        this.txt_title.string = cv.config.getStringData("ClubNotice_title_0");

        // 适配非中文版控件宽度
        do {
            let w: number = cv.resMgr.getLabelStringSize(this.txt_title).width;
            let btn_node: cc.Node = this.txt_title.node.parent;
            btn_node.setContentSize(w, btn_node.height);

            let lien_node: cc.Node = btn_node.parent.getChildByName("line");
            lien_node.setContentSize(w, lien_node.height);

            this.img_red.node.setPosition(w / 2 + 10, this.img_red.node.y);
        } while (0);
    }

    /**
     * 返回按钮点击事件
     * @param event 
     */
    private _onClickBack(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('back_button');
        this.autoHide();
    }

    /**
     * 清除标记列表
     */
    private _clearData(): void {
        this._vCellFlagInfo.splice(0, this._vCellFlagInfo.length);
        this._vCellFlagInfo = [];
    }

    /**
     * 排序检测
     */
    private _sortCheck(): void {
        this._clearData();

        // 插入提醒消息
        do {
            let vRemindList: RemindData[] = cv.globalMsgDataMgr.getRemindList();
            for (let i = 0; i < vRemindList.length; ++i) {
                let data: RemindData = vRemindList[i];
                let cellFlagInfo: MsgViewCellFlag = new MsgViewCellFlag();
                cellFlagInfo.dataIndex = i;
                cellFlagInfo.cellType = eGlobalMsgUIType.GMSG_UI_TYPE_REMIND;
                cellFlagInfo.toplevel = data.msgNew ? eGlobalMsgUITopLevel.GMSG_UI_LEVEL_IMMEDIATELY_UNREAD : eGlobalMsgUITopLevel.GMSG_UI_LEVEL_IMMEDIATELY_READ;
                cellFlagInfo.remindData = data;
                cellFlagInfo.msgTime = data.msgTime;
                this._vCellFlagInfo.push(cellFlagInfo);
            }
        } while (false);

        // 插入公告消息
        do {
            let vAnounceList: world_pb.MailInfo[] = cv.globalMsgDataMgr.getAnnounceList();
            for (let i = 0; i < vAnounceList.length; ++i) {
                let data: world_pb.MailInfo = vAnounceList[i];
                let cellFlagInfo: MsgViewCellFlag = new MsgViewCellFlag();
                cellFlagInfo.dataIndex = i;
                cellFlagInfo.cellType = eGlobalMsgUIType.GMSG_UI_TYPE_ANNOUNCE;
                cellFlagInfo.toplevel = this._checkMailTopLevel(data);
                cellFlagInfo.mailData = data;
                cellFlagInfo.msgTime = data.mail_sendtime;
                this._vCellFlagInfo.push(cellFlagInfo);
            }
        } while (false);

        // 插入邮件消息
        do {
            let vMailList: world_pb.MailInfo[] = cv.globalMsgDataMgr.getMailList();
            for (let i = 0; i < vMailList.length; ++i) {
                let data: world_pb.MailInfo = vMailList[i];
                let cellFlagInfo: MsgViewCellFlag = new MsgViewCellFlag();
                cellFlagInfo.dataIndex = i;
                cellFlagInfo.cellType = eGlobalMsgUIType.GMSG_UI_TYPE_MAIL;
                cellFlagInfo.toplevel = this._checkMailTopLevel(data);
                cellFlagInfo.mailData = data;
                cellFlagInfo.msgTime = data.mail_sendtime;
                this._vCellFlagInfo.push(cellFlagInfo);
            }
        } while (false);

        // 排序
        do {
            // 按置顶级别和时间降序
            this._vCellFlagInfo.sort((a: MsgViewCellFlag, b: MsgViewCellFlag): number => {
                // 置顶级别大的优先
                if (a.toplevel > b.toplevel) {
                    return -1;
                }
                // 置顶级别相同则按时间大的优先
                else if (a.toplevel === b.toplevel) {
                    return b.msgTime - a.msgTime;
                }
                // 否则靠后
                else {
                    return 1;
                }
            });
        } while (false);

        // 设置ui索引
        for (let i = 0; i < this._vCellFlagInfo.length; ++i) {
            this._vCellFlagInfo[i].cellIndex = i;
        }
    }

    /**
     * 检测 邮件消息 UI置顶级别
     * @param data 
     */
    private _checkMailTopLevel(data: world_pb.MailInfo): eGlobalMsgUITopLevel {
        let topLevel: eGlobalMsgUITopLevel = eGlobalMsgUITopLevel.GMSG_UI_LEVEL_NONE;

        // 邮件状态 1已读 2未读
        // 是否过期 1是 2否 3已删除
        switch (data.mail_state) {
            case 1: {
                switch (data.isexpired) {
                    // 过期已读
                    case 1: topLevel = eGlobalMsgUITopLevel.GMSG_UI_LEVEL_EXPIRED_READ; break;

                    // 延时已读
                    case 2: topLevel = eGlobalMsgUITopLevel.GMSG_UI_LEVEL_SLOWLY_READ; break;

                    // 默认
                    case 3:
                    default: break;
                }
            } break;

            case 2: {
                switch (data.isexpired) {
                    // 过期未读
                    case 1: topLevel = eGlobalMsgUITopLevel.GMSG_UI_LEVEL_EXPIRED_UNREAD; break;

                    // 延时未读
                    case 2: topLevel = eGlobalMsgUITopLevel.GMSG_UI_LEVEL_SLOWLY_UNREAD; break;

                    // 默认
                    case 3:
                    default: break;
                }
            } break;

            default: break;
        }

        return topLevel;
    }

    /**
     * 初始化"ScrollViewReuse"预制池
     */
    private _initScrollViewReuseOnce(): void {
        if (this._bInitScrollViewReuseOnce) return;
        this._bInitScrollViewReuseOnce = true;

        let sv: ScrollViewReuse = this.scrollview.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.prefab_item, "GlobalMsgItem");
        sv.bindScrollEventTarget(this);
        sv.generateItemPool();
    }

    /**
     * 更新视图
     */
    private _onMsgUpdateListView(): void {
        this._updateStaticText();
        this._onMsgUpdateCountStatus();
        this._sortCheck();

        let sv: ScrollViewReuse = this.scrollview.getComponent(ScrollViewReuse);
        if (sv.isGenerateItemPool()) sv.reloadView(this._vCellFlagInfo);
    }

    /**
     * 更新计数ui显示
     */
    private _onMsgUpdateCountStatus(): void {
        let nTotal: number = cv.globalMsgDataMgr.getUnreadMsgCount();
        this.txt_new_num.string = nTotal.toString();
        this.img_red.node.active = nTotal > 0;
    }

    /**
     * 阅读邮件/公告(服务器回调)
     * @param data 
     */
    private _onMsgFetchOne(data: world_pb.MailInfo): void {
        if (!data) return;
        let mailInfo: world_pb.MailInfo = cv.globalMsgDataMgr.getMailInfoByID(data.mail_id);
        if (!mailInfo) return;

        // 拷贝更新缓存的数据内容
        cv.StringTools.deepCopy(world_pb.MailInfo.create(data), mailInfo);

        // 检测相关提示等
        switch (mailInfo.isexpired) {
            // 已过期或已删除
            case 1:
            case 3: {
                let strMailType: string = cv.config.getStringData("tips_mail_type_0");  // 公告
                if (mailInfo.mail_type === 1) {
                    strMailType = cv.config.getStringData("tips_mail_type_1");          // 邮件
                }
                let strTipsKey: string = cv.StringTools.formatC("tips_mail_isexpired_%u", mailInfo.isexpired);
                strTipsKey = cv.config.getStringData(strTipsKey);
                strTipsKey = cv.StringTools.formatC(strTipsKey, strMailType);
                cv.TT.showMsg(strTipsKey, cv.Enum.ToastType.ToastTypeInfo);
            } break;

            // 未过期
            case 2: {
                // 带附件(则提示"xxx提取成功xxx")
                if (GlobalMsgLayer._isFetchMailAttachmentID(mailInfo.mail_id)) {
                    cv.TT.showMsg(cv.config.getStringData("tips_mail_fetch_ok"), cv.Enum.ToastType.ToastTypeInfo);
                }
            } break;

            default:
                break;
        }

        // 删除已标记的id
        if (GlobalMsgLayer._isFetchMailAttachmentID(mailInfo.mail_id)) {
            GlobalMsgLayer._removeFetchMailAttachmentID(mailInfo.mail_id);
        }

        // 远程已删除(服务端过期已删除)
        if (mailInfo.isexpired === 3) {
            cv.globalMsgDataMgr.removeMailInfoByID(mailInfo.mail_id);
        }
        // 远程未删除
        else {
            // 邮件类型 1邮件 2需要及时弹出的公告 3不需要即时弹出的公告
            // 未读数递减
            if (mailInfo.mail_type === 1) {
                cv.globalMsgDataMgr.addMailNewNum(-1);
            }
            else if (mailInfo.mail_type === 3) {
                cv.globalMsgDataMgr.addAnnounceNewNum(-1);
            }
        }

        // 更新邮件图标的数量显示
        cv.MessageCenter.send("update_notice_status");

        // 更新视图
        let sv: ScrollViewReuse = this.scrollview.getComponent(ScrollViewReuse);
        let offset: cc.Vec2 = cc.v2(sv.getScrollFixedPosition());
        this._onMsgUpdateListView();
        sv.scrollToFixedPosition(offset);
    }

    /**
     * 请求公告(邮件)列表
     */
    private _reqAnounceMailListOnce(): void {
        // 更新邮件语言索引
        do {
            let iLanguageIdx: number = cv.StringTools.getLanguageIndx();
            // switch (cv.config.getCurrentLanguage()) {
            //     case cv.Enum.LANGUAGE_TYPE.zh_CN: iLanguageIdx = 0; break;
            //     case cv.Enum.LANGUAGE_TYPE.en_US: iLanguageIdx = 1; break;
            //     case cv.Enum.LANGUAGE_TYPE.yn_TH: iLanguageIdx = 2; break;
            //     case cv.Enum.LANGUAGE_TYPE.th_PH: iLanguageIdx = 3; break;
            //     case cv.Enum.LANGUAGE_TYPE.hi_IN: iLanguageIdx = 4; break;
            //     default: iLanguageIdx = 999; break;
            // }
            GlobalMsgLayer.setLanguageIndex(iLanguageIdx);
        } while (false);

        // 检测请求标记
        if (GlobalMsgLayer._g_bReqMailListGlobalStatus) return;
        GlobalMsgLayer._g_bReqMailListGlobalStatus = true;

        // 计算每页最大数量(适配宽屏, 窄屏)
        do {
            let szScrollView: cc.Size = this.scrollview.node.getContentSize();
            let szItem: cc.Size = this.prefab_item.data.getContentSize();
            GlobalMsgLayer._g_iMailMaxCountPerPage = Math.floor(szScrollView.height / szItem.height);
        } while (false);

        // 请求邮件,公告列表
        do {
            GlobalMsgLayer.requestAnnounceList();
            GlobalMsgLayer.requestMailList();
        } while (false);
    }
}
