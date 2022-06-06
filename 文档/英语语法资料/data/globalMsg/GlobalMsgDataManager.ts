import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import { RemindData } from "./RemindData";
import { GlobalMsgLayer } from "../../components/globalMsg/GlobalMsgLayer";
import cv from "../../components/lobby/cv";

// 全局消息UI类型
export enum eGlobalMsgUIType {
    GMSG_UI_TYPE_NONE = 0,              // 无
    GMSG_UI_TYPE_REMIND,                // 提醒
    GMSG_UI_TYPE_MAIL,                  // 邮件
    GMSG_UI_TYPE_ANNOUNCE               // 公告
}

// 全局消息UI置顶排序等级(值越大越排列在顶端, 值相同按时间降序)
export enum eGlobalMsgUITopLevel {
    GMSG_UI_LEVEL_NONE = 0,				// 无
    GMSG_UI_LEVEL_EXPIRED_READ,			// 过期已读
    GMSG_UI_LEVEL_EXPIRED_UNREAD,		// 过期未读
    GMSG_UI_LEVEL_IMMEDIATELY_READ,     // 及时已读
    GMSG_UI_LEVEL_SLOWLY_READ,          // 延时已读
    GMSG_UI_LEVEL_IMMEDIATELY_UNREAD,   // 及时未读
    GMSG_UI_LEVEL_SLOWLY_UNREAD,        // 延时未读
    GMSG_UI_LEVEL_TOP                   // 置顶
}

/**
 * 全局消息管理类
 */
export class GlobalMsgDataManager {

    private static _g_instance: GlobalMsgDataManager = null;

    private _vRemindList: RemindData[] = [];                                                            // 提醒列表
    private _vMailList: world_pb.MailInfo[] = [];                                                       // 邮件列表
    private _vAnnounceList: world_pb.MailInfo[] = [];                                                   // 公告列表
    private _tMailCountInfo: world_pb.NotifyUserMailNum = world_pb.NotifyUserMailNum.create();          // 邮件(公告)数量信息

    static getInstance(): GlobalMsgDataManager {
        if (!GlobalMsgDataManager._g_instance) {
            GlobalMsgDataManager._g_instance = new GlobalMsgDataManager();
        }
        return GlobalMsgDataManager._g_instance;
    }

    /**
     * 添加一条提醒数据
     * @param data          数据
     * @param repeatable    是否可重复添加(默认:false)
     */
    addRemindData(data: RemindData, repeatable?: boolean): void {
        if (!repeatable) {
            for (let i = 0; i < this._vRemindList.length; ++i) {
                if (this._vRemindList[i].equal(data)) return;
            }
        }

        let tmp: RemindData = new RemindData();
        tmp.copyFrom(data);
        this._vRemindList.push(tmp);
        cv.AudioMgr.playButtonSound('notice');
    }

    /**
     * 通过UUID 获取提醒结构
     * @param id 
     */
    getRemindInfoByID(uuid: string): RemindData {
        let retRemind: RemindData = null;
        for (let i = 0; i < this._vRemindList.length; ++i) {
            if (uuid === this._vRemindList[i].uuid) {
                retRemind = this._vRemindList[i];
                break;
            }
        }
        return retRemind;
    }

    /**
     * 通过 strTag 标记 获取提醒结构
     * @param id 
     */
    getRemindInfoByStrTag(strTag: string): RemindData {
        let retRemind: RemindData = null;
        for (let i = 0; i < this._vRemindList.length; ++i) {
            if (strTag === this._vRemindList[i].strTag) {
                retRemind = this._vRemindList[i];
                break;
            }
        }
        return retRemind;
    }

    /**
     * 获取提醒数据列表
     */
    getRemindList(): RemindData[] {
        return this._vRemindList;
    }

    /**
     * 清空提醒数据列表
     */
    clearRemindList(): void {
        this._vRemindList.splice(0, this._vRemindList.length);
        this._vRemindList = [];
    }

    /**
     * 获取邮件数据列表
     */
    getMailList(): world_pb.MailInfo[] {
        return this._vMailList;
    }

    /**
     * 获取公告数据列表
     */
    getAnnounceList(): world_pb.MailInfo[] {
        return this._vAnnounceList;
    }

    /**
     * 添加一条邮件数据
     * @param data          数据
     * @param addCount      是否添加未读计数(默认:false)
     * @param repeatCheck   是否检测重复ID, 避免重复添加(默认:true)
     */
    addMailData(data: world_pb.MailInfo, addCount: boolean = false, repeatCheck: boolean = true): boolean {
        if (repeatCheck) {
            // 邮件
            for (let i = 0; i < this._vMailList.length; ++i) {
                if (data.mail_id === this._vMailList[i].mail_id) return false;
            }

            // 公告
            for (let i = 0; i < this._vAnnounceList.length; ++i) {
                if (data.mail_id === this._vAnnounceList[i].mail_id) return false;
            }
        }

        let mailInfo: world_pb.MailInfo = world_pb.MailInfo.create(data);
        let vListData: world_pb.MailInfo[] = mailInfo.mail_type === 1 ? this._vMailList : this._vAnnounceList;
        vListData.push(mailInfo);

        // 邮件类型 1邮件 2需要及时弹出的公告 3不需要即时弹出的公告
        if (addCount) {
            // 未读计数自增
            let bNew: boolean = mailInfo.mail_state === 2 && mailInfo.isexpired === 2;
            if (bNew) {
                if (mailInfo.mail_type === 1) {
                    this.addMailNewNum(1);
                }
                else if (mailInfo.mail_type === 3) {
                    this.addAnnounceNewNum(1);
                }
            }

            // 总计数自增
            if (mailInfo.mail_type === 1) {
                this.addMailTotalNum(1);
            }
            else if (mailInfo.mail_type === 3) {
                this.addAnnounceTotalNum(1);
            }
        }

        return true;
    }

    /**
     * 移除一条邮件结构
     */
    removeMailInfoByID(id: number): boolean {
        // 遍历邮件列表
        for (let i = 0; i < this._vMailList.length; ++i) {
            if (this._vMailList[i].mail_id === id) {

                // 总数自减
                this.addMailTotalNum(-1);

                // 若状态是未读, 未读数自减
                if (this._vMailList[i].mail_state === 2) {
                    this.addMailNewNum(-1);
                }

                this._vMailList.splice(i, 1);
                return true;
            }
        }

        // 遍历公告列表
        for (let i = 0; i < this._vAnnounceList.length; ++i) {
            if (this._vAnnounceList[i].mail_id === id) {

                // 总数自减
                this.addAnnounceTotalNum(-1);

                // 若状态是未读, 未读数自减
                if (this._vAnnounceList[i].mail_state === 2) {
                    this.addAnnounceNewNum(-1);
                }

                this._vAnnounceList.splice(i, 1);

                return true;
            }
        }

        return false;
    }

    /**
     * 获取邮件结构
     */
    getMailInfoByID(id: number): world_pb.MailInfo {
        let retMail: world_pb.MailInfo = null;

        // 遍历邮件列表
        for (let i = 0; i < this._vMailList.length; ++i) {
            if (this._vMailList[i].mail_id === id) {
                retMail = this._vMailList[i];
                return retMail;
            }
        }

        // 遍历公告列表
        for (let i = 0; i < this._vAnnounceList.length; ++i) {
            if (this._vAnnounceList[i].mail_id === id) {
                retMail = this._vAnnounceList[i];
                return retMail;
            }
        }

        return retMail;
    }

    /**
     * 清空邮件/公告列表
     */
    clearMailList(): void {
        this._vMailList.splice(0, this._vMailList.length);
        this._vMailList = [];

        this._vAnnounceList.splice(0, this._vAnnounceList.length);
        this._vAnnounceList = [];
    }

    /**
     * 设置邮件初始数量结构信息
     */
    setMailCountInfo(data: world_pb.NotifyUserMailNum): void {
        this._tMailCountInfo = world_pb.NotifyUserMailNum.create(data);
    }

    /**
     * 获取邮件初始计数信息
     */
    getMailCountInfo(): world_pb.NotifyUserMailNum {
        return this._tMailCountInfo;
    }

    /**
     * 未读邮件计数(增/减)
     * @param llCount 
     */
    addMailNewNum(llCount: number): void {
        this._tMailCountInfo.mail_new_num = Math.min(GlobalMsgLayer.getMailMaxLimitCount(), this._tMailCountInfo.mail_new_num + llCount);
        this._tMailCountInfo.mail_new_num = Math.max(0, this._tMailCountInfo.mail_new_num);
    }

    /**
     * 总邮件计数(增/减)
     * @param llCount 
     */
    addMailTotalNum(llCount: number): void {
        this._tMailCountInfo.mail_total_num = Math.min(GlobalMsgLayer.getMailMaxLimitCount(), this._tMailCountInfo.mail_total_num + llCount);
        this._tMailCountInfo.mail_total_num = Math.max(0, this._tMailCountInfo.mail_total_num);
    }

    /**
     * 未读公告计数(增/减)
     * @param llCount 
     */
    addAnnounceNewNum(llCount: number): void {
        this._tMailCountInfo.anounce_new_num = Math.min(GlobalMsgLayer.getMailMaxLimitCount(), this._tMailCountInfo.anounce_new_num + llCount);
        this._tMailCountInfo.anounce_new_num = Math.max(0, this._tMailCountInfo.anounce_new_num);
    }

    /**
     * 总公告计数(增/减)
     * @param llCount 
     */
    addAnnounceTotalNum(llCount: number): void {
        this._tMailCountInfo.anounce_total_num = Math.min(GlobalMsgLayer.getMailMaxLimitCount(), this._tMailCountInfo.anounce_total_num + llCount);
        this._tMailCountInfo.anounce_total_num = Math.max(0, this._tMailCountInfo.anounce_total_num);
    }

    /**
     * 获取未读消息数量
     * @param type  对应消息UI类型(若缺省, 则返回总数量)
     */
    getUnreadMsgCount(type?: eGlobalMsgUIType): number {
        let nRet: number = 0;
        switch (type) {
            // 提醒
            case eGlobalMsgUIType.GMSG_UI_TYPE_REMIND: {
                for (let i = 0; i < this._vRemindList.length; ++i) {
                    if (this._vRemindList[i].msgNew)++nRet;
                }
            } break;

            // 邮件
            case eGlobalMsgUIType.GMSG_UI_TYPE_MAIL: {
                nRet = this._tMailCountInfo.mail_new_num;
            } break;

            // 公告
            case eGlobalMsgUIType.GMSG_UI_TYPE_ANNOUNCE: {
                nRet = this._tMailCountInfo.anounce_new_num;
            } break;

            // 默认: 全部
            case eGlobalMsgUIType.GMSG_UI_TYPE_NONE:
            default: {
                for (let i = 0; i < this._vRemindList.length; ++i) {
                    if (this._vRemindList[i].msgNew)++nRet;
                }
                nRet += this._tMailCountInfo.mail_new_num;
                nRet += this._tMailCountInfo.anounce_new_num;
            } break;
        }

        return nRet;
    }

    /**
     * 清除邮件/公告相关全局状态
     */
    clearMailGlobalData(): void {
        this.clearMailList();						                    // 清除邮件/公告列表数据
        this._tMailCountInfo = world_pb.NotifyUserMailNum.create();     // 清除邮件数量信息
        GlobalMsgLayer.resetReqMailListStatus();		                // 清除公告/邮件全局状态
    }

    /**
     * 清空所有数据(邮件/公告/提示)
     */
    clearData(): void {
        this.clearRemindList();
        this.clearMailGlobalData();
    }
}
