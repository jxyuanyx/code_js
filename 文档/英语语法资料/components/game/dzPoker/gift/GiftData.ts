import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { Seat } from "../Seat";
import { HashMap } from "../../../../common/tools/HashMap";

/**
 * 礼物数据-明星信息
 */
export class GiftStarInfo {
    uid: number = 0;
    name: string = "";
    headurl: string = "";
    plat: number = 0;
}

/**
 * 礼物数据-数量信息
 */
export class GiftCountInfo {
    id: number = 0;
    count: number = 0;
    desc: string = "";
    isSelect: boolean = false;
}

/**
 * 礼物数据-自己送礼信息
 */
export class GiftSelfSendInfo {
    toUID: number = 0;
    giftID: number = 0;
    giftCount: number = 0;
}

/**
 * 礼物数据-消息信息
 */
export class GiftNewsInfo {
    /**
     * 礼物消息
     */
    gift: game_pb.RoomNews = null;

    /**
     * 弹幕消息
     */
    barrage: game_pb.NoticeSendBarrage = null;
}

/**
 * 礼物横幅
 */
export class GiftBanner {
    img: string = "";
    link: string = "";

    copyFrom(obj: any): void {
        if (!obj) return;

        this.img = cv.String(obj.img);
        this.link = cv.String(obj.link);
    }

    reset(): void {
        this.img = "";
        this.link = "";
    }
}

/**
 * 礼物公告
 */
export class GiftAnnouncement {
    title: string = "";
    announce: string = "";

    copyFrom(obj: any): void {
        if (!obj) return;

        this.title = cv.String(obj.title);
        this.announce = cv.String(obj.announce);
    }

    reset(): void {
        this.title = "";
        this.announce = "";
    }
}

/**
 * 礼物数据-历史记录信息(个人收/送礼)
 */
export class GiftRecordInfo {
    id: number = 0;
    tType: game_pb.TipRecordType = game_pb.TipRecordType.TipRecordType_Default;
    data: game_pb.TipDetailInfo = null;
}

/**
 * 礼物模块数据管理类(此处不需要单例, 数据单例统一在"GameDataManager"类里面管理)
 */
export class GiftData {
    /**
     * 类名
     */
    static g_class_name: string = "GiftData";

    /**
     * 礼物消息信息列表上限数量(性能考虑)
     */
    static GIFT_NEWS_MAXCOUNT: number = 500;

    /**
     * 礼物动画每个类别的实例上限数量(总共7类别: 6礼物 + 1轨迹)
     */
    static GIFT_ANIMINS_TMAXCOUNT: number = 10;

    // **************************************************************************************************************************
    // 礼物相关的数据消息全都写在此处(只穷举数据消息, 控件消息由各自控件逻辑维护)

    /**
     * 礼物图集路径
     */
    static GIFT_PLIST_PATH: string = "zh_CN/game/dzpoker/gift/gift_plist";

    /**
     * 礼物音效路径
     */
    static GIFT_AUDIO_PATH: string = "zh_CN/game/dzpoker/gift/audio/";

    /**
     * 监听消息-明星数量有变化
     */
    static GIFT_MSG_STARS_CHANGED: string = `${GiftData.g_class_name}_msg_stars_changed`;

    /**
     * 监听消息-明星收礼信息已读状态
     */
    static GIFT_MSG_STARS_RECVREAD_STATUS: string = `${GiftData.g_class_name}_msg_stars_recvread_status`;

    /**
     * 监听消息-有礼物模块的消息推送
     */
    static GIFT_MSG_NOTICE_NEWS: string = `${GiftData.g_class_name}_msg_news`;

    /**
     * 监听消息-查询个人"送/收礼"历史记录
     */
    static GIFT_MSG_RESP_RECORDS: string = `${GiftData.g_class_name}_msg_records`;

    /**
     * 监听消息-礼物排行榜
     */
    static GIFT_MSG_RESP_RANKLIST: string = `${GiftData.g_class_name}_msg_ranklist`;

    /**
     * 监听消息-自己送礼(模拟数据单机立即显示动画)
     */
    static GIFT_MSG_SELF_SENDGIFT: string = `${GiftData.g_class_name}_msg_self_sendgift`;

    /**
     * 监听消息-是否禁用打赏功能
     */
    static GIFT_MSG_UPDATE_FORBIDDEN: string = `${GiftData.g_class_name}_update_forbidden`;

    // **************************************************************************************************************************

    private _giftInfoList: game_pb.TipFeeInfo[] = [];                                   // 礼物信息列表
    private _giftStarInfoList: GiftStarInfo[] = [];                                     // 礼物明星列表
    private _giftNewsInfoList: GiftNewsInfo[] = [];                                     // 礼物消息信息列表
    private _giftRecordsInfoList: GiftRecordInfo[] = [];                                // 礼物历史记录信息列表
    private _giftCountInfoList: HashMap<number, GiftCountInfo[]> = new HashMap();       // 礼物数量信息列表(本地持久数据, 与该对象生命周期绑定)
    private _giftRankTops: game_pb.TipUserContr[] = [];                                 // 礼物排行版列表前3名(单独更新的)
    private _giftRankList: game_pb.TipUserContr[] = [];                                 // 礼物排行版列表(另一条协议)

    private _banner: GiftBanner = new GiftBanner();                                     // 当前横幅
    private _announcement: GiftAnnouncement = new GiftAnnouncement();                   // 当前公告

    private _seatListRef: Seat[] = [];                                                  // 座位引用
    private _onlookers_wpos: cc.Vec2 = cc.Vec2.ZERO;                                    // 围观群众的世界坐标

    private _isForbidden: boolean = false;                                              // 是否禁止打赏功能

    /**
     * 构造函数
     */
    constructor() {
        this.initGiftCountInfoList();
    }

    /**
     * 清理礼物数据
     */
    reset(): void {
        this._giftInfoList = [];
        this._giftStarInfoList = [];
        this._giftNewsInfoList = [];
        this._giftRecordsInfoList = [];
        this._giftRankTops = [];
        this._giftRankList = [];
        this._seatListRef = [];

        this._banner.reset();
        this._announcement.reset();

        this._isForbidden = false;
    }

    /**
     * 添加座位列表引用(只是引用, 目的是动态获取对应座位的世界坐标)
     * @param seatList 
     */
    setSeatListRef(seatList: Seat[]): void {
        this._seatListRef = seatList;
    }

    /**
     * 获取座位列表引用
     */
    getSeatListRef(): Readonly<Seat[]> {
        return this._seatListRef;
    }

    /**
     * 设置围观群众的世界坐标
     * @param pos 
     */
    setOnlookersPos(wpos: cc.Vec2): void {
        this._onlookers_wpos.x = wpos.x;
        this._onlookers_wpos.y = wpos.y;
    }

    /**
     * 获取围观群众的世界坐标
     */
    getOnlookersPos(): Readonly<cc.Vec2> {
        return this._onlookers_wpos;
    }

    /**
     * 设置是否禁用打赏功能
     * @param value -1 表示禁用, 否则激活
     * @param isSendMsg 是否发送界面更新通知(默认:false)
     */
    setForbidden(value: number, isSendMsg: boolean = false): void {
        this._isForbidden = value === -1;
        if (isSendMsg) cv.MessageCenter.send(GiftData.GIFT_MSG_UPDATE_FORBIDDEN);
    }

    /**
     * 是否禁用打赏功能
     */
    isForbidden(): boolean {
        return this._isForbidden;
    }

    /**
     * 添加礼物信息(1-1000低端;>1000高端;1-钻石, 2-热吻, 3-饭卡, 1001-火箭, 1002-飞机, 1003-兰博基尼)
     * @param infos 
     */
    addGiftInfoList(infos: game_pb.TipFeeInfo[]): void {
        let isAdded: boolean = false;
        let length: number = cv.StringTools.getArrayLength(infos);

        for (let i = 0; i < length; ++i) {
            let t: game_pb.TipFeeInfo = infos[i];

            for (let j = 0; j < this._giftInfoList.length; ++j) {
                if (t.tipId === this._giftInfoList[j].tipId) {
                    isAdded = true;
                    this._giftInfoList[j] = t;
                    break;
                }
            }

            if (!isAdded) this._giftInfoList.push(t);
        }
    }

    /**
     * 获取礼物信息
     */
    getGiftInfoList(): Readonly<game_pb.TipFeeInfo[]> {
        return this._giftInfoList;
    }

    /**
     * 是否是明星
     * @param uid 
     */
    isStarByUid(uid: number): boolean {
        let isStar: boolean = false;

        for (let i = 0; i < this._giftStarInfoList.length; ++i) {
            if (uid === this._giftStarInfoList[i].uid) {
                isStar = true;
                break;
            }
        }

        return isStar;
    }

    /**
     * 添加明星信息(包含自己, 如果是明星的话)
     * @param info 
     */
    addStarsInfo(info: GiftStarInfo): void {
        let isAdded: boolean = false;

        for (let i = 0; i < this._giftStarInfoList.length; ++i) {
            if (info.uid === this._giftStarInfoList[i].uid) {
                isAdded = true;
                break;
            }
        }

        if (!isAdded) {
            this._giftStarInfoList.push(info);
            cv.MessageCenter.send(GiftData.GIFT_MSG_STARS_CHANGED);
        }
    }

    /**
     * 移除指定明星信息(保留自己)
     * @param uid 
     */
    removeStarsInfo(uid: number): void {
        let isRemoved: boolean = false;
        let self_id: number = cv.dataHandler.getUserData().u32Uid;
        if (uid === self_id) return;

        for (let i = 0; i < this._giftStarInfoList.length; ++i) {
            if (uid === this._giftStarInfoList[i].uid) {
                this._giftStarInfoList.splice(i--, 1);
                isRemoved = true;
                break;
            }
        }

        if (isRemoved) {
            cv.MessageCenter.send(GiftData.GIFT_MSG_STARS_CHANGED);
        }
    }

    /**
     * 获取指定的明星信息
     * @param uid 
     */
    getStarInfoByID(uid: number): GiftStarInfo {
        let data: GiftStarInfo = null;

        for (let i = 0; i < this._giftStarInfoList.length; ++i) {
            if (uid === this._giftStarInfoList[i].uid) {
                data = this._giftStarInfoList[i];
                break;
            }
        }

        return data;
    }

    /**
     * 获取明星信息数组
     * @param except_uid    要排除的uid 
     */
    getStarInfosExceptByID(except_uid: number): GiftStarInfo[] {
        let data: GiftStarInfo[] = this._giftStarInfoList.slice();

        for (let i = 0; i < data.length; ++i) {
            if (except_uid === data[i].uid) {
                data.splice(i--, 1);
                break;
            }
        }

        return data;
    }

    /**
     * 初始化礼物数量信息(只有中文才有描述语, 直接此处写死配置)
     * @param info 
     */
    initGiftCountInfoList(): void {
        // 钻石:1
        do {
            let gift_id: number = 1;
            let config: { count: number, desc: string }[] = [
                { count: 1, desc: "" },
                { count: 2, desc: "" },
                { count: 3, desc: "" },
                { count: 4, desc: "" },
                { count: 5, desc: "" },
            ];

            let infos: GiftCountInfo[] = [];
            for (let i = 0; i < config.length; ++i) {
                let t: GiftCountInfo = new GiftCountInfo();
                t.id = gift_id;
                t.count = config[i].count;
                t.desc = config[i].desc;
                infos.unshift(t);
            }
            this._giftCountInfoList.add(gift_id, infos);
        } while (false);

        // 热吻:2
        do {
            let gift_id: number = 2;
            let config: { count: number, desc: string }[] = [
                { count: 1, desc: "一见倾心" },
                { count: 2, desc: "两喜临门" },
                { count: 3, desc: "三生有幸" },
                { count: 4, desc: "四季平安" },
                { count: 5, desc: "五福临门" },
                { count: 6, desc: "六六大顺" },
                { count: 7, desc: "七星高照" },
                { count: 8, desc: "八方来财" },
                { count: 9, desc: "长长久久" },
                { count: 10, desc: "十全十美" },
            ];

            let infos: GiftCountInfo[] = [];
            for (let i = 0; i < config.length; ++i) {
                let t: GiftCountInfo = new GiftCountInfo();
                t.id = gift_id;
                t.count = config[i].count;
                t.desc = config[i].desc;
                infos.unshift(t);
            }
            this._giftCountInfoList.add(gift_id, infos);
        } while (false);

        // 饭卡:3
        do {
            let gift_id: number = 3;
            let config: { count: number, desc: string }[] = [
                { count: 1, desc: "一见倾心" },
                { count: 3, desc: "三生有幸" },
                { count: 6, desc: "六六大顺" },
                { count: 9, desc: "长长久久" },
                { count: 10, desc: "十全十美" },
                { count: 11, desc: "一心一意" },
                { count: 13, desc: "一世情缘" },
                { count: 18, desc: "要发要发" },
                { count: 22, desc: "祝您好运" },
                { count: 28, desc: "我发我发" },
            ];

            let infos: GiftCountInfo[] = [];
            for (let i = 0; i < config.length; ++i) {
                let t: GiftCountInfo = new GiftCountInfo();
                t.id = gift_id;
                t.count = config[i].count;
                t.desc = config[i].desc;
                infos.unshift(t);
            }
            this._giftCountInfoList.add(gift_id, infos);
        } while (false);
    }

    /**
     * 获取指定礼物的数量信息
     */
    getGiftCountInfoListByID(gift_id: number): Readonly<GiftCountInfo[]> {
        let data: GiftCountInfo[] = this._giftCountInfoList.get(gift_id);
        if (!data) data = [];
        return data;
    }

    /**
     * 添加礼物消息
     * @param info      礼物消息结构
     * @param isSendMsg 是否发送更新视图的消息
     */
    addGiftNewsInfo(info: game_pb.RoomNews | game_pb.NoticeSendBarrage, isSendMsg: boolean): void {
        let t: GiftNewsInfo = null;

        if (info instanceof game_pb.RoomNews) {
            t = new GiftNewsInfo();
            t.gift = info;
        }
        else if (info instanceof game_pb.NoticeSendBarrage) {
            t = new GiftNewsInfo();
            t.barrage = info;
        }

        if (t) {
            // 礼物消息则检测相关子数据更新状态
            if (t.gift) {
                // 前3名有变化
                if (cv.StringTools.getArrayLength(t.gift.rankChangePlayers) > 0) {
                    this.addGiftRankListTops(t.gift.rankChangePlayers);
                }

                // 横幅和公告有变化
                switch (t.gift.newsType) {
                    case game_pb.NewsType.NewsType_Banner: this.setGiftBanner(t.gift.desc); break;
                    case game_pb.NewsType.NewsType_Announcement: this.setGiftAnnouncement(t.gift.desc); break;
                    default: break;
                }
            }

            // 剔除头部(控制数量在规定范围内)
            if (this._giftNewsInfoList.length >= GiftData.GIFT_NEWS_MAXCOUNT) this._giftNewsInfoList.splice(0, 1);

            // 插入列表中(顺带检测是否可以发送更新视图消息)
            this._giftNewsInfoList.push(t);
            if (isSendMsg) cv.MessageCenter.send(GiftData.GIFT_MSG_NOTICE_NEWS, t);
        }
    }

    /**
     * 获取礼物消息总列表
     */
    getGiftNewsInfo(): Readonly<GiftNewsInfo[]> {
        return this._giftNewsInfoList;
    }

    /**
     * 通过礼物消息类型获取礼物消息列表
     */
    getGiftNewsInfoByNewsType(type: game_pb.NewsType): Readonly<GiftNewsInfo[]> {
        let infos: GiftNewsInfo[] = [];

        for (let i = 0; i < this._giftNewsInfoList.length; ++i) {
            let gift: game_pb.RoomNews = this._giftNewsInfoList[i].gift;
            if (gift && gift.newsType === type) {
                infos.push(this._giftNewsInfoList[i]);
            }
        }

        return infos;
    }

    /**
     * 通过玩家身份标志获取对应的玩家动态消息
     * @param identity      标志(或标志数组)
     * @param isIncluded    是否被包含(true:子集, false:补集, 默认:true)
     */
    getPlayerDynamicListByIdentity(identity: number | number[], isIncluded: boolean = true): Readonly<GiftNewsInfo[]> {
        let ids: number[] = [].concat(identity);
        let infos: GiftNewsInfo[] = [];
        let type: game_pb.NewsType = game_pb.NewsType.NewsType_PlayerDynamic;

        let isMatchIdentities: (identity: number) => boolean = (identity: number): boolean => {
            let isMatched: boolean = false;

            if (isIncluded) {
                for (let i = 0; i < ids.length; ++i) {
                    if (ids[i] === identity) {
                        isMatched = true;
                        break;
                    }
                }
            }
            else {
                isMatched = true;
                for (let i = 0; i < ids.length; ++i) {
                    isMatched &&= (ids[i] !== identity);
                }
            }

            return isMatched;
        }

        for (let i = 0; i < this._giftNewsInfoList.length; ++i) {
            let gift: game_pb.RoomNews = this._giftNewsInfoList[i].gift;
            if (gift && gift.newsType === type) {
                if (isMatchIdentities(gift.player.identity)) {
                    infos.push(this._giftNewsInfoList[i]);
                }
            }
        }

        return infos;
    }

    /**
     * 获取弹幕列表(已剔除礼物自身的弹幕)
     */
    getGiftNewsInfoByBarrage(): Readonly<GiftNewsInfo[]> {
        let infos: GiftNewsInfo[] = [];

        for (let i = 0; i < this._giftNewsInfoList.length; ++i) {
            let barrage: game_pb.NoticeSendBarrage = this._giftNewsInfoList[i].barrage;
            if (barrage) {
                infos.push(this._giftNewsInfoList[i]);
            }
        }

        return infos;
    }

    /**
     * 插入礼物历史记录
     * @param info 
     */
    addGiftRecordsInfo(info: game_pb.ResponseTipRecord): void {
        let isAdded: boolean = false;
        let length: number = cv.StringTools.getArrayLength(info.data);
        if (length <= 0) return;

        let isExist: (id: number) => boolean = (id: number): boolean => {
            let result: boolean = false;
            for (let i = 0; i < this._giftRecordsInfoList.length; ++i) {
                if (id === this._giftRecordsInfoList[i].id) {
                    result = true;
                    break;
                }
            }
            return result;
        }

        for (let i = 0; i < length; ++i) {
            let data: game_pb.TipDetailInfo = info.data[i];
            if (isExist(data.id)) continue;

            let t: GiftRecordInfo = new GiftRecordInfo();
            t.id = data.id;
            t.tType = info.tType;
            t.data = data;
            this._giftRecordsInfoList.push(t);
            isAdded = true;
        }

        // 时间降序排序("id"是数据库时间升序的)
        if (isAdded) {
            this._giftRecordsInfoList.sort((a: GiftRecordInfo, b: GiftRecordInfo): number => {
                return b.data.id - a.data.id;
            })
        }

        // 刷新视图(只要有数据变动都刷新, 因为数据类型可能不同, 没做类型保存前不能写在上面的"if"里面)
        cv.MessageCenter.send(GiftData.GIFT_MSG_RESP_RECORDS);
    }

    /**
     * 获取礼物历史记录
     * @param type 查询类型
     */
    getGiftRecordsInfo(type: game_pb.TipRecordType): Readonly<GiftRecordInfo[]> {
        let list: GiftRecordInfo[] = [];

        if (type === game_pb.TipRecordType.TipRecordType_All) {
            list = this._giftRecordsInfoList;
        }
        else {
            for (let i = 0; i < this._giftRecordsInfoList.length; ++i) {
                let t: GiftRecordInfo = this._giftRecordsInfoList[i];
                if (t.tType === type) {
                    list.push(t);
                }
            }
        }

        return list;
    }

    /**
     * 清除所有礼物历史记录
     */
    removeAllRecordsInfo(): void {
        this._giftRecordsInfoList = [];
    }

    /**
     * 插入玩家打赏排行榜前3名
     * @param infos 
     */
    addGiftRankListTops(infos: game_pb.TipUserContr[]): void {
        // 暂时是每次填充数据前就先清空, 跟协议流程挂钩(后续如果要修改成分页再处理, 目前需求不需要, 数量是:0~3~10)
        this._giftRankTops = [];
        let length: number = cv.StringTools.getArrayLength(infos);
        for (let i = 0; i < length; ++i) {
            this._giftRankTops.push(infos[i]);
        }
    }

    /**
     * 获取玩家打赏排行榜前3名
     */
    getGiftRankListTops(): Readonly<game_pb.TipUserContr[]> {
        return this._giftRankTops;
    }

    /**
     * 插入玩家打赏排行榜
     * @param infos 
     */
    addGiftRankList(infos: game_pb.TipUserContr[]): void {
        // 暂时是每次填充数据前就先清空, 跟协议流程挂钩(后续如果要修改成分页再处理, 目前需求不需要, 数量是:0~3~10)
        this._giftRankList = [];
        let length: number = cv.StringTools.getArrayLength(infos);
        for (let i = 0; i < length; ++i) {
            this._giftRankList.push(infos[i]);
        }

        // 发送消息更新视图
        cv.MessageCenter.send(GiftData.GIFT_MSG_RESP_RANKLIST);
    }

    /**
     * 获取玩家打赏排行榜
     */
    getGiftRankList(): Readonly<game_pb.TipUserContr[]> {
        return this._giftRankList;
    }

    /**
     * 设置礼物横幅
     * @param info 
     */
    setGiftBanner(info: string): void {
        info = cv.String(info);

        try {
            this._banner.copyFrom(JSON.parse(info));
        }
        catch (error) {
            this._banner.reset();
        }
    }

    /**
     * 获取礼物横幅
     */
    getGiftBanner(): Readonly<GiftBanner> {
        return this._banner;
    }

    /**
     * 设置礼物公告
     * @param info 
     */
    setGiftAnnouncement(info: string): void {
        info = cv.String(info);

        try {
            this._announcement.copyFrom(JSON.parse(info));
        }
        catch (error) {
            this._announcement.reset();
        }
    }

    /**
     * 获取礼物公告
     */
    getGiftAnnouncement(): Readonly<GiftAnnouncement> {
        return this._announcement;
    }
}
