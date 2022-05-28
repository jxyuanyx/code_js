import ws_protocol = require("../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../lobby/cv";

import { MailGoods } from "./MailGoods";
import { GlobalMsgLayer } from "./GlobalMsgLayer";

/**
 * 邮件/公告 弹出的详情界面
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MailPopLayer extends cc.Component {
    @property(cc.Prefab) prefab_mailGoods: cc.Prefab = null;        // 附件物品预制件
    @property(cc.Prefab) prefab_copyItem: cc.Prefab = null;         // 可复制项

    @property(cc.Label) txt_title: cc.Label = null;                 // 标题
    @property(cc.Label) txt_inscribe: cc.Label = null;              // 签名
    @property(cc.Label) txt_appellation: cc.Label = null;           // 抬头
    @property(cc.Label) txt_content1: cc.Label = null;              // 内容1
    @property(cc.Label) txt_content2: cc.Label = null;              // 内容2
    @property(cc.Node) panel_copy: cc.Node = null;                  // 可复制面板

    @property(cc.Button) btn_close: cc.Button = null;               // 关闭按钮
    @property(cc.Button) btn_deal: cc.Button = null;                // 处理按钮
    @property(cc.Label) btn_deal_txt: cc.Label = null;              // 处理按钮文本

    @property(cc.Node) panel_layer: cc.Node = null;                 // 图层
    @property(cc.Node) panel_top: cc.Node = null;                   // 顶层
    @property(cc.Node) panel_bottom: cc.Node = null;                // 底层
    @property(cc.Node) panel_icon: cc.Node = null;                  // 图标层
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;      // 滚动视图

    private _mailInfo: world_pb.MailInfo = null;                    // 当前邮件数据结构

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.btn_deal.node.on("click", this._onClickDeal, this);
        this.btn_close.node.on("click", (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('close');
            this.autoClose();
        });

        cv.MessageCenter.register("close_mailPopLayer", this.autoClose.bind(this), this.node);

        // 隐藏相关控件
        this.txt_appellation.node.active = false;
        this.txt_content1.node.active = false;
        this.txt_content2.node.active = false;
        this.panel_copy.active = false;
    }

    protected start(): void {
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("close_mailPopLayer", this.node);
    }

    /**
     * 显示
     */
    autoShow(data: world_pb.MailInfo): void {
        if (!data) return;
        this._mailInfo = data;

        // 设置文本
        do {
            let strTitle: string = "";
            let strAppellation: string = "";
            let strContent1: string = "";
            let strContent2: string = "";
            let strInscribe: string = "";
            let strCopy: any[] = [];

            // 语言索引
            let iLanguageIdx: number = GlobalMsgLayer.getLanguageIndex(this._mailInfo);
            if (iLanguageIdx >= 0) {

                // 标题
                strTitle = this._mailInfo.mail_title[iLanguageIdx];

                // 抬头
                strAppellation = this._mailInfo.mail_appellation;

                // 内容1
                if (this._mailInfo.mail_content_reserved !== null && typeof (this._mailInfo.mail_content_reserved) !== "undefined") {
                    if (Array.isArray(this._mailInfo.mail_content_reserved)
                        && iLanguageIdx >= 0
                        && iLanguageIdx < this._mailInfo.mail_content_reserved.length) {
                        strContent1 = this._mailInfo.mail_content_reserved[iLanguageIdx];
                    }
                }

                // 内容2
                strContent2 = this._mailInfo.mail_content[iLanguageIdx];

                // 签名
                strInscribe = this._mailInfo.mail_inscribe[iLanguageIdx];

                // 可复制项
                if (this._mailInfo.mail_copy !== null && typeof (this._mailInfo.mail_copy) !== "undefined") {
                    if (Array.isArray(this._mailInfo.mail_copy)
                        && iLanguageIdx >= 0
                        && iLanguageIdx < this._mailInfo.mail_copy.length) {

                        try {
                            strCopy = JSON.parse(this._mailInfo.mail_copy[iLanguageIdx]);
                        }
                        catch (error) {
                            strCopy = [];
                        }
                    }
                }
            }

            this.txt_title.string = strTitle;
            this.txt_inscribe.string = strInscribe;

            this.txt_appellation.node.active = strAppellation.length > 0
            if (this.txt_appellation.node.active) {
                this.txt_appellation.string = strAppellation;
            }

            this.txt_content1.node.active = strContent1.length > 0;
            if (this.txt_content1.node.active) {
                this.txt_content1.string = cv.StringTools.calculateAutoWrapString(this.txt_content1.node, strContent1);
            }

            this.txt_content2.node.active = strContent2.length > 0;
            if (this.txt_content2.node.active) {
                this.txt_content2.string = cv.StringTools.calculateAutoWrapString(this.txt_content2.node, strContent2);
            }

            this.panel_copy.active = strCopy.length > 0;
            if (this.panel_copy.active) {
                let panelSize: cc.Size = cc.Size.ZERO;
                let panelLayout: cc.Layout = this.panel_copy.getComponent(cc.Layout);
                panelSize.width += this.panel_copy.width;
                panelSize.height += strCopy.length * this.prefab_copyItem.data.height;
                panelSize.height += (strCopy.length - 1) * panelLayout.spacingY;
                panelSize.height += panelLayout.paddingTop;
                panelSize.height += panelLayout.paddingBottom;
                this.panel_copy.setContentSize(panelSize);

                for (let i = 0; i < strCopy.length; ++i) {
                    let strCopyTitle: string = cv.String(strCopy[i].title);
                    let strCopyContent: string = cv.String(strCopy[i].content);

                    let item: cc.Node = cc.instantiate(this.prefab_copyItem);
                    this.panel_copy.addChild(item);

                    let txt_copy: cc.RichText = item.getChildByName("txt_copy").getComponent(cc.RichText);
                    let btn_copy: cc.Node = item.getChildByName("btn_copy");
                    let btn_copy_txt: cc.Label = btn_copy.getChildByName("txt").getComponent(cc.Label);
                    btn_copy_txt.string = cv.config.getStringData("mail_poplayer_copyitem_txt");

                    if (strCopyTitle.length > 0) {
                        txt_copy.string = `<color=#FFFFFF>【${strCopyTitle}: </c><color=#FCDA8E>${strCopyContent}</color><color=#FFFFFF>】</c>`;
                    }
                    else {
                        txt_copy.string = `<color=#FFFFFF>【</c><color=#FCDA8E>${strCopyContent}</color><color=#FFFFFF>】</c>`;
                    }

                    let clickFunc: () => void = (): void => {
                        cv.TT.showMsg(cv.config.getStringData("allReview_allReview_panel_serial_number_copy_text"), cv.Enum.ToastType.ToastTypeInfo);
                        cv.native.setClipBoardString(strCopyContent);
                    }

                    item.on("click", clickFunc.bind(this), this);
                    btn_copy.on("click", clickFunc.bind(this), this);

                    // 刷新布局组件
                    // let itemLayout: cc.Layout = item.getComponent(cc.Layout);
                    // itemLayout.updateLayout();
                }

                // 刷新布局组件
                // let panelLayout: cc.Layout = this.panel_copy.getComponent(cc.Layout);
                // panelLayout.updateLayout();
            }
        } while (false);

        // 布局
        do {
            let sz_inner: cc.Size = this.scrollView.content.getContentSize();               // 内框滚动区大小
            let sz_content: cc.Size = cc.size(sz_inner.width, 0);                           // 填充内容后的大小

            let comLayout: cc.Layout = this.scrollView.content.getComponent(cc.Layout);
            if (comLayout) {
                sz_content.height += comLayout.paddingTop;
                sz_content.height += comLayout.paddingBottom;
                sz_content.height += comLayout.spacingY;
            }

            if (this.txt_appellation.node.active) {
                sz_content.height += cv.resMgr.getLabelStringSize(this.txt_appellation).height;
            }

            if (this.txt_content1.node.active) {
                sz_content.height += cv.resMgr.getLabelStringSize(this.txt_content1).height;
            }

            if (this.txt_content2.node.active) {
                sz_content.height += cv.resMgr.getLabelStringSize(this.txt_content2).height;
            }

            if (this.panel_copy.active) {
                sz_content.height += this.panel_copy.height;
            }

            let offset_h: number = sz_content.height - sz_inner.height;
            if (offset_h > 0) {
                // 自适应长文本, 相关控件大小, 位置等
                do {
                    // 真实高度差
                    let nRatio: number = 2.5;
                    let nReal_h: number = Math.min(offset_h, nRatio * sz_inner.height);

                    // layer
                    let sz_layer: cc.Size = this.panel_layer.getContentSize();
                    sz_layer.height += nReal_h;
                    this.panel_layer.setContentSize(sz_layer);

                    // scrollview
                    sz_inner.height += nReal_h;
                    this.scrollView.node.setContentSize(sz_inner);
                    this.scrollView.content.setContentSize(sz_inner.width, sz_content.height);

                    this._addPanelPos();
                } while (false);
            }

            // 刷新布局组件
            // comLayout.updateLayout();
        } while (false);

        // 检测附件
        this._checkAttachMent();
    }

    /**
     * 关闭(直接从父节点移除)
     */
    autoClose(): void {
        this.node.removeFromParent(true);
        this.node.destroy();
    }

    /**
     * 检测附件
     */
    private _checkAttachMent(): void {
        // 处理按钮的文字
        do {
            let strNormal: string = "common_btn_seat_1";
            let strBtnTxt: string = cv.config.getStringData("tips_mail_btn_deal_0");
            if (this._mailInfo.attachment_list.length > GlobalMsgLayer.getMailAttachmentDefaultIndex()) {
                strNormal = "anniu3";
                strBtnTxt = cv.config.getStringData("tips_mail_btn_deal_1");
            }

            this.btn_deal.enabled = true;
            this.btn_deal_txt.string = strBtnTxt;
            cv.resMgr.setSpriteFrame(this.btn_deal.node, "zh_CN/common/icon/" + strNormal);
        } while (0);

        // 附件面板
        do {
            if (this._mailInfo.attachment_list.length > GlobalMsgLayer.getMailAttachmentDefaultIndex()) {
                this.panel_icon.active = true;
                this._layoutAttachMent();
            }
            else {
                this.panel_icon.active = false;
                let sz_panel_icon: cc.Size = this.panel_icon.getContentSize();

                this.panel_layer.setContentSize(this.panel_layer.width, this.panel_layer.height - sz_panel_icon.height);
                this.panel_bottom.setContentSize(this.panel_bottom.width, this.panel_bottom.height - sz_panel_icon.height);

                this._addPanelPos();
            }
        } while (0);
    }

    /**
     * 布局附件(横向最多支持7个附件)
     */
    private _layoutAttachMent(): void {
        if (!this.panel_icon || !this._mailInfo || this._mailInfo.attachment_list.length <= GlobalMsgLayer.getMailAttachmentDefaultIndex()) return;

        let max_count: number = Math.floor(this.panel_icon.width / this.prefab_mailGoods.data.width);
        max_count = Math.min(max_count, this._mailInfo.attachment_list.length);

        let offset_x: number = this.panel_icon.width / (max_count + 1);
        let start_x: number = this.panel_icon.width * (0 - this.panel_icon.anchorX);

        let defaultIndex: number = GlobalMsgLayer.getMailAttachmentDefaultIndex();
        for (let i = defaultIndex, j = 1; i < max_count + defaultIndex; ++i, ++j) {
            let inst_mailGoods: cc.Node = cc.instantiate(this.prefab_mailGoods);
            this.panel_icon.addChild(inst_mailGoods);

            let pos_x: number = start_x + offset_x * j;
            let pos_y: number = 0;

            inst_mailGoods.setAnchorPoint(cc.v2(0.5, 0.5));
            inst_mailGoods.setPosition(pos_x, pos_y);

            let attachmentInfo: world_pb.AttachmentInfo = world_pb.AttachmentInfo.create(this._mailInfo.attachment_list[i]);
            inst_mailGoods.getComponent(MailGoods).setData(attachmentInfo);
        }
    }

    /**
     * 适配相关面板位置
     */
    private _addPanelPos(): void {
        // top panel
        cv.resMgr.adaptWidget(this.panel_top);

        // scrollview 
        cv.resMgr.adaptWidget(this.scrollView.node);

        // bottom panel
        cv.resMgr.adaptWidget(this.panel_bottom, true);
    }

    // 点击"领取/删除"
    private _onClickDeal(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this._mailInfo) return;

        // 点击的是关闭
        if (this._mailInfo.mail_type != 1 || this._mailInfo.attachment_list.length <= GlobalMsgLayer.getMailAttachmentDefaultIndex()) {
            let strMsg: string = cv.StringTools.formatC("[%d attachment]", this._mailInfo.attachment_list.length - GlobalMsgLayer.getMailAttachmentDefaultIndex());
            console.log("OnClickDeal - MailPopLayer : Close the Mail " + strMsg);
            this.autoClose();
        }
        // 点击的是领取
        else {
            console.log("OnClickDeal - MailPopLayer : Fetch the Mail");

            GlobalMsgLayer.fetchMail(this._mailInfo.mail_id, this._mailInfo.mail_type, true);

            // 按钮文字变为"已领取",且为禁用状态
            this.btn_deal_txt.string = cv.config.getStringData("tips_mail_btn_deal_2");
            this.btn_deal.enabled = false;
            this.btn_deal.interactable = false;
        }
    }
}
