import ws_protocol = require("../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../lobby/cv";

import { MsgViewCellFlag, GlobalMsgLayer } from "./GlobalMsgLayer";
import { eGlobalMsgUIType } from "../../data/globalMsg/GlobalMsgDataManager";
import { RemindData, eRemindMsgStatus, eRemindMsgType } from "../../data/globalMsg/RemindData";

/**
 * 全局消息条目
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GlobalMsgItem extends cc.Component {
    @property(cc.Node) panel_top: cc.Node = null;
    @property(cc.Sprite) img_dot: cc.Sprite = null;                 // 圆圈图标
    @property(cc.RichText) rtxt_title: cc.RichText = null;          // 标题文本
    @property(cc.Label) txt_time: cc.Label = null;				    // 时间文本

    @property(cc.Node) panel_remind: cc.Node = null;
    @property(cc.Node) panel_content: cc.Node = null;
    @property(cc.RichText) rtxt_up: cc.RichText = null;             // 文本内容 上
    @property(cc.RichText) rtxt_middle: cc.RichText = null;         // 文本内容 中
    @property(cc.RichText) rtxt_down: cc.RichText = null;           // 文本内容 下                                    

    @property(cc.Button) btn_ensure: cc.Label = null;               // 确认按钮
    @property(cc.Label) btn_ensure_txt: cc.Label = null;

    @property(cc.Button) btn_cancel: cc.Label = null;               // 取消按钮
    @property(cc.Label) btn_cancel_txt: cc.Label = null;

    @property(cc.Button) btn_status: cc.Label = null;               // 状态按钮
    @property(cc.Label) btn_status_txt: cc.Label = null;

    @property(cc.Node) panel_mail: cc.Node = null;
    @property(cc.Sprite) img_mail_icon: cc.Sprite = null;           // 邮件图标
    @property(cc.RichText) rtxt_mail_brief: cc.RichText = null;     // 邮件简介

    private _cellFlagInfo: MsgViewCellFlag = null;                  // 当前item的数据对象

    protected onLoad(): void {
        this.node.on("click", this._onClick, this);
        this.btn_ensure.node.on("click", this._onClickRemindEnsure, this);
        this.btn_cancel.node.on("click", this._onClickRemindCancel, this);
        this.btn_status.node.on("click", this._onClickRemindStatus, this);
    }

    protected start(): void {
    }

    /**
     * 重置cell内容(因为cell会存在重复利用, 必须在使用前重置ui,数据)
     * @param active 默认 false
     */
    private _reset(active: boolean = false): void {
        this.img_dot.node.active = active;
        this.rtxt_title.string = "";
        this.txt_time.string = "";

        this._restRemindPanel(active);
        this._restMailPanel(active);

        this.panel_remind.active = active;
        this.panel_mail.active = active;

        this._cellFlagInfo = null;
    }

    /**
     * 重置提醒面板
     * @param active 
     */
    private _restRemindPanel(active: boolean = false): void {
        this.btn_ensure.node.active = active;
        this.btn_ensure_txt.string = cv.config.getStringData("NoticeItem_ok_button");

        this.btn_cancel.node.active = active;
        this.btn_cancel_txt.string = cv.config.getStringData("NoticeItem_no_button");

        this.btn_status.node.active = active;
        this.btn_status_txt.string = cv.config.getStringData("NoticeItem_status_button");

        this.rtxt_up.string = "";
        this.rtxt_middle.string = "";
        this.rtxt_down.string = "";
    }

    /**
     * 重置邮件面板
     * @param active 
     */
    private _restMailPanel(active: boolean = false): void {
        cv.resMgr.setSpriteFrame(this.img_mail_icon.node, "zh_CN/common/icon/icon_letter");
        this.img_mail_icon.node.active = active;

        this.rtxt_mail_brief.string = "";
    }

    /**
     * 更新提醒界面数据
     */
    private _updateRemindData(): void {
        if (!this._cellFlagInfo) return;
        let data: RemindData = this._cellFlagInfo.remindData;

        // 是否是新消息
        this.img_dot.node.active = data.msgNew;

        // 消息类型
        let nType: number = eRemindMsgType.RMSG_TYPE_NONE;
        if (data.msgType >= cv.Number(eRemindMsgType.RMSG_TYPE_NONE) && data.msgType <= cv.Number(eRemindMsgType.RMSG_TYPE_GLOBAL)) nType = data.msgType;
        let strKey: string = cv.StringTools.formatC("UINoticeMsgType_%04u", nType);
        this.rtxt_title.string = cv.config.getStringData(strKey);

        // 消息时间
        this.txt_time.string = cv.StringTools.formatTime(data.msgTime, cv.Enum.eTimeType.Month_Day_Hour_Min_Sec);

        // 消息内容
        let msgContenUpKey: string = data.msgContenUp.format_key;
        if (!data.msgContenUp.isFormat) msgContenUpKey = cv.config.getStringData(data.msgContenUp.format_key);
        let msgContenUpValue: string = cv.StringTools.formatC(msgContenUpKey, data.msgContenUp.format_value1, data.msgContenUp.format_value2);
        cv.StringTools.setRichTextString(this.rtxt_up.node, msgContenUpValue);

        let msgContenMiddleKey: string = data.msgContenMiddle.format_key;
        if (!data.msgContenMiddle.isFormat) msgContenMiddleKey = cv.config.getStringData(data.msgContenMiddle.format_key);
        let msgContenMiddleValue: string = cv.StringTools.formatC(msgContenMiddleKey, data.msgContenMiddle.format_value1, data.msgContenMiddle.format_value2);
        cv.StringTools.setRichTextString(this.rtxt_middle.node, msgContenMiddleValue);

        let msgContenDownKey: string = data.msgContenDown.format_key;
        if (!data.msgContenDown.isFormat) msgContenDownKey = cv.config.getStringData(data.msgContenDown.format_key);
        let msgContenDownValue: string = cv.StringTools.formatC(msgContenDownKey, data.msgContenDown.format_value1, data.msgContenDown.format_value2);
        cv.StringTools.setRichTextString(this.rtxt_down.node, msgContenDownValue);

        // 排版位置
        do {
            let vNode: cc.Node[] = [];
            vNode.push(this.rtxt_down.node);
            vNode.push(this.rtxt_middle.node);
            vNode.push(this.rtxt_up.node);

            let iTotal_h: number = 0;			        // 所有可见子节点宽度和
            let iSpacing_y: number = 0;			        // 子节点之间的间距
            let iChildrenCount: number = 0;		        // 可见的子节点个数

            for (let i = 0; i < vNode.length; ++i) {
                if (vNode[i].active) {
                    ++iChildrenCount;
                    iTotal_h += vNode[i].height * vNode[i].scaleY;
                }
            }

            iSpacing_y = (this.panel_content.height - iTotal_h) / (iChildrenCount + 1);
            iSpacing_y = Math.max(0, iSpacing_y);

            let iLast_y: number = (0 - this.panel_content.anchorY) * this.panel_content.height;
            for (let i = 0; i < vNode.length; ++i) {
                if (vNode[i].active) {
                    let y = iLast_y + iSpacing_y + vNode[i].height * vNode[i].scaleY * vNode[i].anchorY;
                    let pos: cc.Vec2 = cc.Vec2.ZERO;
                    this.panel_content.convertToWorldSpaceAR(cc.v2(0, y), pos);
                    vNode[i].parent.convertToNodeSpaceAR(pos, pos);

                    vNode[i].setPosition(vNode[i].x, pos.y);
                    iLast_y = pos.y + vNode[i].height * vNode[i].scaleY * vNode[i].anchorY;
                }
            }
        } while (false);

        // 消息状态
        switch (data.msgStatus) {
            // 待处理
            case eRemindMsgStatus.RMSG_STATUS_PENDING: {
                this.btn_ensure.node.active = true;
                this.btn_cancel.node.active = true;
            } break;

            // 已批准
            case eRemindMsgStatus.RMSG_STATUS_RATIFIED: {
                this.btn_status.node.active = true;
                this.btn_status_txt.string = cv.config.getStringData("UINoticeHasRatify");
            } break;

            // 已拒绝
            case eRemindMsgStatus.RMSG_STATUS_REFUSED: {
                this.btn_status.node.active = true;
                this.btn_status_txt.string = cv.config.getStringData("UINoticeHasRefuse");
            } break;

            // 超时
            case eRemindMsgStatus.RMSG_STATUS_TIMEOUT: {
                this.btn_status.node.active = true;
                this.btn_status_txt.string = cv.config.getStringData("UINoticeHasInvalid");
            } break;

            // 已取消
            case eRemindMsgStatus.RMSG_STATUS_CANCEL: {
                this.btn_status.node.active = true;
                this.btn_status_txt.string = cv.config.getStringData("UINoticeHasCancel");
            } break;
            // 无
            case eRemindMsgStatus.RMSG_STATUS_NONE:
            default: break;
        }
    }

    /**
     * 更新邮件/公告界面数据
     */
    private _updateMailData(): void {
        if (!this._cellFlagInfo) return;
        let data: world_pb.MailInfo = this._cellFlagInfo.mailData;

        // 语言索引
        let iLanguageIdx: number = GlobalMsgLayer.getLanguageIndex(data);

        // 发件人
        let strSender: string = cv.config.getStringData("ClubNotice_panel_0_fr_txt");
        cv.StringTools.setRichTextString(this.rtxt_title.node, cv.StringTools.formatC(strSender, data.mail_sender_nickname));

        // 发件标题
        let strTitle: string = "";
        if (iLanguageIdx >= 0) { strTitle = data.mail_title[iLanguageIdx]; }
        cv.StringTools.setRichTextString(this.rtxt_mail_brief.node, strTitle);

        // 发件时间
        this.txt_time.string = cv.StringTools.formatTime(data.mail_sendtime, cv.Enum.eTimeType.Month_Day_Hour_Min_Sec);

        // 邮件图标(按照状态显示)
        do {
            let active: boolean = false;
            let strFrame: string = "";
            if (data.isexpired === 1) {
                active = false;
                strFrame = data.mail_state === 1 ? "icon_letter4" : "icon_letter3";
            }
            else {
                active = data.mail_state === 2;
                strFrame = data.mail_state === 1 ? "icon_letter2" : "icon_letter";
            }
            strFrame = "zh_CN/common/icon/" + strFrame;
            this.img_dot.node.active = active;
            this.img_mail_icon.node.active = true;
            cv.resMgr.setSpriteFrame(this.img_mail_icon.node, strFrame);
        } while (false);
    }

    // 更新滚动视图复用数据
    updateSVReuseData(index: number, dataArray: any[]): void {
        if (index < 0 || index >= dataArray.length) return;
        let cellFlagInfo: MsgViewCellFlag = dataArray[index];
        if (cellFlagInfo) {
            this._reset();
            this._cellFlagInfo = cellFlagInfo;

            let btn: cc.Button = this.getComponent(cc.Button);
            switch (cellFlagInfo.cellType) {
                case eGlobalMsgUIType.GMSG_UI_TYPE_NONE: break;

                case eGlobalMsgUIType.GMSG_UI_TYPE_REMIND: {
                    this.panel_remind.active = true;
                    this._updateRemindData();
                    btn.enabled = false;
                } break;

                case eGlobalMsgUIType.GMSG_UI_TYPE_MAIL: {
                    this.panel_mail.active = true;
                    this._updateMailData();
                    btn.enabled = true;
                } break;

                case eGlobalMsgUIType.GMSG_UI_TYPE_ANNOUNCE: {
                    this.panel_mail.active = true;
                    this._updateMailData();
                    btn.enabled = true;
                } break;

                default: break;
            }
        }
    }

    private _onClick(event: cc.Event.EventCustom): void {
        let mailInfo: world_pb.MailInfo = this._cellFlagInfo.mailData;
        if (!mailInfo) return;

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
                // 打开邮件详情
                cv.MessageCenter.send("on_pop_one_anounce", mailInfo);

                // 发送阅读请求条件:
                // 1.未读状态才发送请求
                // 2.若有附件, 则提取附件时才发送阅读请求; 若无附件, 则直接发送阅读请求
                if (mailInfo.mail_state === 2 && mailInfo.attachment_list.length <= GlobalMsgLayer.getMailAttachmentDefaultIndex()) {
                    GlobalMsgLayer.fetchMail(mailInfo.mail_id, mailInfo.mail_type);
                }
            } break;

            default:
                break;
        }
    }

    private _onClickRemindEnsure(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this._cellFlagInfo) return;
        let func: Function = this._cellFlagInfo.remindData.msgEnsureFunc;
        if (func) {
            func(this._cellFlagInfo.remindData, this._cellFlagInfo.cellIndex, this._cellFlagInfo.dataIndex);
        }
    }

    private _onClickRemindCancel(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this._cellFlagInfo) return;
        let func: Function = this._cellFlagInfo.remindData.msgCancelFunc;
        if (func) {
            func(this._cellFlagInfo.remindData, this._cellFlagInfo.cellIndex, this._cellFlagInfo.dataIndex);
        }
    }

    private _onClickRemindStatus(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        if (!this._cellFlagInfo) return;
        let func: Function = this._cellFlagInfo.remindData.msgStatusFunc;
        if (func) {
            func(this._cellFlagInfo.remindData, this._cellFlagInfo.cellIndex, this._cellFlagInfo.dataIndex);
        }
    }
}
