import ws_protocol = require("./../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../components/lobby/cv"
import { HashMap } from "../common/tools/HashMap";

// 玩家备注结构
export class RemarkData {
    nUid: number = 0;
    nType: number = 0;
    sRemark: string = "";
    nickname: string = "";
    avatar: string = "";
    plat: number = 0;
}

// 玩家备注结构
export class ServerInfo {
    data: string = "";
    api: string = "";
    qiniu: string = "";
    h5: string = "";
    invalid: boolean;
}

export class Pokerdata {
    Total_win_money: number = 0;
    Total_hand_card_count: number = 0;
    Vpip_rate: number = 0;
    Win_rate: number = 0;
    level_hands: number = 0;
    Pfr_rate: number = 0;
    Af_rate: number = 0;
    Sb_rate: number = 0;
    Etf_rate: number = 0;
    Wsf_rate: number = 0;
    Wtsd_rate: number = 0;
    Wsd_rate: number = 0;
    Rate_3bet: number = 0;
    Rate_fold_to_3bet: number = 0;
    Cbet_rate: number = 0;
    Total_enter_game_count: number = 0;
    Total_end_room_count: number = 0;
    Total_buyin: number = 0;
    Enter_rate: number = 0;

    Fight_100: number = 0;
    Fight_average: number = 0;//场均战绩
    Buyin_average: number = 0;//场均带入
    UID: number = 0;
    star_duration: number = 0;//明星玩家时长(单位秒)，其它身份为值0
    liked_count: number = 0;//被赞数
    has_liked: boolean = false;//表示可否点赞
    intimacy: number = 0;//亲密度
    Bb100s: Array<Bb100Info> = [];
}


export class Bb100Info {
    bb_value: number = 0;
    total_win_bb_count: number = 0;
    bb_100: number = 0;
}

export class RankData {
    uid: number = 0;
    name: string = "";
    head: string = "";
    updateAt: number = 0;           // 更新时间
    rank: number = 0;               // -1表示不在榜
    profit: number = 0;             // 盈利值
    coin: number = 0;
    frequency: number = 0;          // 在连胜榜是 连胜次数, 在其他榜此值为0
    plat: number = 0;               // 玩家平台, 有可能没有下发这个字段(老数据没有这个字段)
}

export class FeedbackData {
    id: number = 0;                 // 反馈ID，用做单号
    type: number = 0;               // 反馈类型 没有用处
    user_not_read: number = 0;      // 是否显示小红点，为0时没有小红点
    content: string = "";           // 反馈内容
    create_time: number = 0;        // 创建反馈的时间戳
}

export class FeedbackCommentData {
    name: string = "";               // 回复者的名字
    type: number = 0;               // 1用户消息 2管理消息
    content: string = "";           // 回复内容
    pics: string[] = [];            // 回复图片数组
    create_time: number = 0;        // 回复时间
}

const { ccclass, property } = cc._decorator;

@ccclass
export class userData extends cc.Component {
    private static instance: userData;

    public static getInstance(): userData {
        if (!userData.instance) {
            userData.instance = new userData();
        }
        return userData.instance;
    }

    public static clearData(): userData {
        userData.instance = null;
        return userData.getInstance();
    }

    public user_id: string = null;
    public u32Uid: number = null;
    public user_token: string = "";
    public secretKey: string = "";
    public areaCode: number = null;
    public user_ip: number = null;
    public user_safe: number = null;
    public mobile: string = null;
    public isTouristUser: boolean = false;                  // 是否为游客
    public default_hall_view: number = 1;                   // 大厅场景默认页(1-5: 牌桌/小游戏/存取款/公告/我)
    public default_hall_view_enabled: boolean = false;      // 大厅场景默认页是否可以使用
    public isOpenUpdateUserMode: boolean = false;           // 是否进入升级账号模式。
    public avatar: number = null;
    public avatar_thumb: number = null;
    public nick_name: string = null;
    public gender: number = 1;
    public user_marks: string = null;
    public user_area: number = null;
    public diamond_num: number = 0;
    public u32Chips: number = 0;
    public u32Deposit_gold: number = 0;
    public total_amount: number = 0;
    public usdt: number = 0;
    public deposit_usdt: number = 0;
    public priorityareaCode: string = "";
    public prioritymobile: string = "";
    public game_coin: number = 0;
    public user_points: number = 0;
    public points_ratio: number = 1000;
    public games_max: number = null;
    public clubs_max: number = null;
    public current_games: number = null;
    public current_clubs: number = null;
    public reg_code: number = null;
    public u32CardType: number = null;
    public card_expire: number = null;
    public login_server_index = 0;
    public shopUrl: string = "";
    public vipTool_url: string = "";
    public pay_type: number = 0;
    public button_1: string = "";
    public button_1_english: string = "";
    public button_2: string = "";
    public button_2_english: string = "";
    public button_3: string = "";
    public button_3_english: string = "";
    public pkf_add_url: string = "";
    //kyc验证状态
    //NOT_KYC: 无需KYC
    //INIT_KYC: 需要KYC
    //PENDING: KYC过程中（需要弹出信息窗口提醒玩家正在审核，耐心等待）,KYC中间状态。玩家完成KYC输入，Jumio验证成功，并正在等待安全团队人工审核
    public KYCVerificationStatus: string = "";

    //临时缓存国家名称代号，只在注册的时候记录
    public countryIsoCode: string = "";
    //临时缓存邀请码，只在注册的时候记录
    public countryCode: string = "";
    //临时缓存邀请码，只在注册的时候记录
    public invateCode: string = "";

    /**
     * 语音上传地址
     */
    public file_upload_url: string = "";

    public is_allow_update_name: boolean = false; //用戶名是否可以修改
    public invitation_code: string = null;//未赋值
    public deviceInfo: string = "";

    public m_bIsNewRegisted: boolean = false;
    public u64DelayBegin: number = 0;  //计算信号
    public u64DelayEnd: number = 0;  //计算信号

    public headUrl: string = "";
    public HeadPath: string = "";
    public user_areacode: string = "+86";

    public doMain: Array<ServerInfo> = [];
    public server_index: number = 0;//客户端自用
    public server_reconnect_num: number;//客户端自用

    public firstClubId: number = null;
    public firstAlliId: number = null;

    public isEncrypt: number[] = [];//需要加密的游戏id数组
    public CustomUrl: string = "";

    public vRemarkData: HashMap<number, RemarkData> = new HashMap();    // 玩家备注HashMap
    public selectIDs: number[] = []; // 选中准备删除的备注id
    public m_totalBuyOut: number = 0;
    public login_server_list: Array<string> = [];
    public m_bIsReconnect: boolean = false;

    public m_bIsLoginServerSucc: boolean = false;//是否登录成功
    public isFirstLogin: boolean = true;

    public isfirst: number = null; //是否首次免费
    public isgoldenough: number = null; //金币是否够 1是2否
    public chargefee: number = null; //收取费用, 免费为0
    public freecounts: number = null; //剩余免费次数
    public auditGameuuid: string = "";  //举报的gameUiid 

    public m_bIsLoginGameServerSucc: boolean = false;//是否登录游戏服成功
    public club_head: string = "";//第一社区头像
    public isvpn: boolean = false;//是否是vpn true是vpn
    public isban: boolean = false;//是否禁止德州人员
    public isallowsimulator: boolean = false;//是否允许模拟器玩(是否在白名单中 在白名单中允许模拟器玩)
    public download_url: string = "";//强制升级地址
    public m_rankInfos: Array<RankData> = [];
    public m_rank: RankData;
    public isShowLuckTurntables: boolean = false; //幸运转盘活动显示状态
    public bk_img: string = "";//大厅logo下载地址
    public verityType: number = 1; //验证码接收方式  1: 短信  2：私聊APP
    public sl_account: string = ""; //私聊账号
    public bindInputSLAccount: string = ""; //绑定成功时候，自己输入的私聊账号
    public is_bind_sl: boolean = false;  //是否绑定私聊，true为绑定了，false为没有绑定
    public sl_down_url: string = ""; //私聊下载地址
    public is_alert_sl: boolean = false; //是否弹私聊验证绑定提示框

    public feedback_red_num: number = 0;             //建议反馈未读红点数量
    public feedback_list: Array<FeedbackData> = [];  //建议反馈数据列表
    public feedback_comment_list: Array<FeedbackCommentData> = [];  //建议反馈回复数据列表

    public help_wrap_list: world_pb.HelpWrapInfo[] = []; // 助力红包详情数据
    public total_history_amount: number = 0;         // 最近7天领取助力红包总金额
    public left_help_count: number = 0;              // 剩余助力次数
    public isShow_help_warp: boolean = false;              // 显示助力红包弹框
    public is_goto_myredpacket: boolean = false;              // 自动跳转我的红包界面
    public mark_edit_state: number = 0;  //签名修改状态 0-可以修改 >0 不能修改 1-修改次数达到上限  2-修入敏感字符达到上限

    public cur_system_time: number = 0; //当前系统时间戳
    public calm_down_deadline_time: number = 0; //小游戏冷静到什么状态

    // 拉霸相关数据
    hand_num: number = 0;
    luckdrawslen: number = 0;
    playerHands: number[] = [];

    ReferralsList: world_pb.ReferralsItem[] = [];
    ReferralsTotal: number;
    maxReferralsMember: number;
    ReferralsPageNum: number;
    summaryInfo: world_pb.GetInviteSummaryResponse;
    //电子小游戏红利数据
    welfareInfo: world_pb.PgLeaveResponse;
    welfareBouns: world_pb.BonusData[] = []; //当前用户享受的红利列表
    welfareFrees: world_pb.FreeGamesData[] = []; //当前用户享受的免费次数
    welfarePgGames: world_pb.PgGameData[] = []; //当前配置显示的所有电子小游戏数据

    SafeDetailList: world_pb.StrongboxDetail[] = [];

    luckindex: number = 0;
    lucks: any[] = [];
    luck_redbags: any[] = [];
    luckTurntables: any[] = [];
    luckTurntablesEndTime: number = 0;
    luckTurntablesStartTime: number = 0;
    luckTurntablesInfo: any = null;
    lamp_list: any[] = [];
    record_list: any[] = [];


    RedBagOpen: boolean = false;;
    RedNew: boolean = false;;
    rdb_id: number = 0;;
    listen_amount: number = 0;
    content: string = "";
    title: string = "";
    leiNum: number = 0;
    packetNum: number = 0;
    red_templets: world_pb.RedBagTemplet[] = [];
    redbags: world_pb.RedBagInfo[] = [];
    history: world_pb.RedBagDrawHistory[] = [];
    jpAmounts: world_pb.RedBagJackpotAmount[] = [];

    RedBagHistory: world_pb.RedBagHistoryResponse = null;
    redPacketInfo: world_pb.RedBagDrawResponse = null;
    redPacketState: world_pb.RedBagStatusResponse = null;
    lastInfo: world_pb.LastRedbagInfoResponse = null;
    autoInfo: world_pb.AutoRedBagDrawResponse = null;
    redPacketJp: world_pb.RedBagJackpotInfoResponse = null;
    boom2Creater: world_pb.NotifyRedBagBoom2Creater = null;
    redPacketTj: world_pb.RedbagStatisticsInfoResponse = null;
    redToCreateData: world_pb.DrawedRedBag2CreatorNotice = null;
    mtt_url: string = "";
    mtt_token: string = "";
    isViewWPT: boolean = false;
    totalHands: number = 0;
    bGetTHands: boolean = false;

    public updateRedPacketStatus(id: number, status: number) {
        for (let i = 0; i < this.redbags.length; i++) {
            if (this.redbags[i].rdb_id == id) {
                this.redbags[i].status = status;
            }
        }
    }
    public updateRedPacketIsdrawed(id: number, isdrawed: boolean) {
        for (let i = 0; i < this.redbags.length; i++) {
            if (this.redbags[i].rdb_id == id) {
                this.redbags[i].is_drawed = isdrawed;
            }
        }
    }
    public updateRedPacketJackPot(level: number, amountjP: number) {
        for (let i = 0; i < this.jpAmounts.length; i++) {
            if (this.jpAmounts[i].amount_level == level) {
                this.jpAmounts[i].jackpot_amount = amountjP;
                break;
            }
        }
    }
    getRedPacket(id: number): world_pb.RedBagInfo {
        for (let i = 0; i < this.redbags.length; i++) {
            if (this.redbags[i].rdb_id == id) {
                return this.redbags[i];
            }
        }
        return null;
    }
    getRedTemp(amount: number): world_pb.RedBagTemplet {
        for (let i = 0; i < this.red_templets.length; i++) {
            if (this.red_templets[i].amount == amount) {
                return this.red_templets[i];
            }
        }
        return null;
    }
    public pokerdata: Pokerdata = new Pokerdata();
    setNickName(node: cc.Node) {
        node.getComponent(cc.Label).string = this.nick_name;
    };
    setHead(node: cc.Node) {
        cv.resMgr.setSpriteFrame(node, "zh_CN/common/icon/Head_01");
    };

    addRemark(uid: number, type: number, remark: string, nickname: string, avatar: string, plat: number) {
        let re = new RemarkData();
        re.nType = type;
        re.nUid = uid;
        re.sRemark = remark;
        re.nickname = nickname;
        re.avatar = avatar;
        re.plat = plat;
        this.vRemarkData.add(uid, re);
    }

    getRemarkData(uid: number): RemarkData {
        let result: RemarkData = this.vRemarkData.get(uid);
        if (!result) {
            result = new RemarkData;
            result.nUid = uid;
        }
        return result;
    }

    removeRemarks(uids: number[]) {
        for (let i = 0; i < uids.length; i++) {
            cv.dataHandler.getUserData().vRemarkData.remove(uids[i]);
        }
    }

    getUserRemark(uid: number): string {
        let msg: RemarkData = this.getRemarkData(uid);
        if (msg) {
            return msg.sRemark;
        }
        else {
            return "";
        }

    }

    setStringContainRemark(node: cc.Node, uid: number, otherStr: string): void {
        let rdata = this.getRemarkData(uid);
        if (rdata) {
            if (cv.StringTools.getArrayLength(rdata.sRemark) > 0) {
                node.getComponent(cc.Label).string = rdata.sRemark;
                return;
            }
        }

        node.getComponent(cc.Label).string = otherStr;
    }

    /**
     * 通过指定的平台获取完整图片地址
     * @param name      后缀名
     * @param platform  平台值(默认: 0, 为本平台, 其他值请参考接口具体实现的注释)
     */
    getImageUrlByPlat(name: string, platform: number = 0): string {
        return cv.domainMgr.getImageURL(name, platform);
    }

    getPktShopUrl(): string {
        let account = cv.tools.GetStringByCCFile("user_account");
        let password = cv.tools.GetStringByCCFile("user_password");
        return cv.domainMgr.getServerInfo().pkt_shop + "autoLogin?n=" + account + "&p="
            + cv.md5.md5(password) + "&lan=" + cv.config.getCurrentLanguage();
    }

    getPlayerHands(): number {
        let arr = cv.dataHandler.getUserData().playerHands;
        let hand_num = cv.dataHandler.getUserData().hand_num;
        let playerHands = arr[0];
        let len = arr.length;
        for (let i = 0; i < len; ++i) {
            if (hand_num <= arr[i]) {
                playerHands = arr[i];
                break;
            }
        }

        return playerHands;
    }

    updateHelpWarpData(data) {
        for (let i = 0; i < this.help_wrap_list.length; i++) {
            if (this.help_wrap_list[i].captcha_data.code == data.captcha_data.code) {
                this.help_wrap_list.splice(i, 1, data)
                cv.MessageCenter.send("update_help_Warp_list");
                return;
            }
        }
    }

    getHelpWarpList(): world_pb.HelpWrapInfo[] {
        let s = Math.round(new Date().getTime() / 1000);
        let list = [];
        for (let i = 0; i < this.help_wrap_list.length; i++) {
            let data = this.help_wrap_list[i];
            if (data.captcha_data.create_time + data.captcha_data.expire_time > s
                || data.captcha_data.is_available
                || data.captcha_data.help_count == data.helper_data.length) {
                list.push(data);
            }
        }

        return list;
    }

    deleteHelpWarpByCode(code: number) {
        for (let i = 0; i < this.help_wrap_list.length; i++) {
            let data = this.help_wrap_list[i];
            if (data.captcha_data.code == code) {
                this.help_wrap_list.splice(i, 1);
                break;
            }
        }
        cv.MessageCenter.send("update_help_Warp_list");
    }

    getHelpWarpByID(code: number): world_pb.HelpWrapInfo {
        for (let i = 0; i < this.help_wrap_list.length; i++) {
            let data = this.help_wrap_list[i];
            if (data.captcha_data.code == code) {
                return data;
            }
        }
        return null;
    }

    //添加电子福利
    addWelfareData(msg: world_pb.PgBonusAndFreeGamesResponse) {

        if (msg == null) {
            console.log("addWelfareData msg is null.");
            return;
        }

        // cv.tools.logObject(msg, "welfareData");
        this.welfareBouns = [];
        this.welfareFrees = [];
        this.welfarePgGames = [];

        this.welfarePgGames = msg.pgGames;

        if (this.welfarePgGames == null || this.welfarePgGames.length <= 0) {
            //当前没有电子小游戏显示
            console.log("addWelfareData current show miniGames is null");
            return;
        }

        let bonus = msg.bonus;
        let freeGames = msg.freeGames;

        for (let i = 0; i < bonus.length; i++) {
            let gameIds = bonus[i].gameIds;
            let bShowNow: boolean = false; //当前福利有效的电子小游戏，是否在电子下游戏列表中显示
            for (let j = 0; j < gameIds.length; j++) {
                if (this.checkGameIdIsShow(gameIds[j])) {
                    bShowNow = true;
                    break;
                }
            }

            if (bShowNow) {
                this.welfareBouns.push(bonus[i]);
            }
        }

        for (let i = 0; i < freeGames.length; i++) {
            let gameIds = freeGames[i].gameIds;
            let bShowNow: boolean = false; //当前福利有效的电子小游戏，是否在电子下游戏列表中显示
            for (let j = 0; j < gameIds.length; j++) {
                if (this.checkGameIdIsShow(gameIds[j])) {
                    bShowNow = true;
                    break;
                }
            }
            if (bShowNow) {
                this.welfareFrees.push(freeGames[i]);
            }
        }


        // cv.tools.logObject(this.welfareBouns, "Bouns=");
        // cv.tools.logObject(this.welfareFrees, "fress=");

        ///////////////////////////////////检测是否有新的福利
        let bNewWelfare = false;  //是否有全新的福利
        let bNewFree = false;

        let _bonusIdArray = [];     //当前支持的福利红利ID
        let _freeIdArray = [];      //当前支持的免费次数红利ID

        //当前没有可用的福利
        if (this.welfareBouns.length <= 0 && this.welfareFrees.length <= 0) {
            //将红点全部设置为不可见
            cv.tools.SaveStringByCCFile("welfareBounsNew", "false");
            cv.tools.SaveStringByCCFile("welfareFreeNew", "false");
            cv.tools.SaveStringByCCFile("welfareNew", "false");
            return;
        }

        for (let i = 0; i < this.welfareBouns.length; i++) {
            _bonusIdArray.push(this.welfareBouns[i].bonusId);
        }

        for (let i = 0; i < this.welfareFrees.length; i++) {
            _freeIdArray.push(this.welfareFrees[i].freeGameId);
        }

        let welareData = cv.tools.GetStringByCCFile("welareDataSave");
        if (welareData == null) {
            //全部是新福利
            bNewWelfare = true;
            bNewFree = true;
            cv.tools.SaveStringByCCFile("welfareBounsNew", "true");
            cv.tools.SaveStringByCCFile("welfareFreeNew", "true");
            console.log("PgBonusAndFreeGamesResponse have new ID.");
        } else {
            let data = JSON.parse(welareData);
            let _bonusIdStr = data["bonusId"];
            let _freeIdStr = data["freeId"];

            //  console.log("PgBonusAndFreeGamesResponse _bonusIdStr:" + _bonusIdStr);
            //  console.log("PgBonusAndFreeGamesResponse _freeIdStr:" + _freeIdStr);

            let _bonusIDArray_save = _bonusIdStr.split('#');
            let _freeIDArray_save = _freeIdStr.split('#');

            //查找新下发得福利ID在缓存里面是否存在，判断是不是新福利
            for (let i = 0; i < this.welfareBouns.length; i++) {
                let _bonusNew = true;
                for (let j = 0; j < _bonusIDArray_save.length; j++) {
                    if (_bonusIDArray_save[j] == _bonusIdArray[i]) {
                        _bonusNew = false;
                        break;
                    }
                }

                if (_bonusNew) { //存在最新得福利ID
                    console.log("####_bonus have new ID.")
                    bNewWelfare = true;
                    cv.tools.SaveStringByCCFile("welfareBounsNew", "true");
                    break;
                }
            }

            for (let i = 0; i < _freeIdArray.length; i++) {
                let _freeNew = true;
                for (let j = 0; j < _freeIDArray_save.length; j++) {
                    if (_freeIDArray_save[j] == _freeIdArray[i]) {
                        _freeNew = false;
                        break;
                    }
                }

                if (_freeNew) { //存在最新得福利ID
                    console.log("####freeID have new ID.")
                    bNewFree = true;
                    cv.tools.SaveStringByCCFile("welfareFreeNew", "true");
                    break;
                }
            }

        }

        if (bNewFree || bNewWelfare) {
            cv.tools.SaveStringByCCFile("welfareNew", "true");
        }

        let _bonusIdStr: string = "";
        let _freeIdStr: string = "";
        if (_bonusIdArray.length > 0) {
            _bonusIdStr = _bonusIdArray.join("#");
        }
        if (_freeIdArray.length > 0) {
            _freeIdStr = _freeIdArray.join("#");
        }

        let info = { "bonusId": _bonusIdStr, "freeId": _freeIdStr };
        //将当前福利ID保存
        cv.tools.SaveStringByCCFile("welareDataSave", JSON.stringify(info));
    }

    //检测该gameId是否已经配置显示
    checkGameIdIsShow(gameId: number): boolean {
        for (let j = 0; j < this.welfarePgGames.length; j++) {
            if (gameId === this.welfarePgGames[j].gameId) {
                return true;
            }
        }
        return false;
    }

    //获取电子福利 红利
    getWelfareBouns(): world_pb.BonusData[] {
        return this.welfareBouns;
    }

    //获取电子福利 免费次数
    getWelfareFrees(): world_pb.FreeGamesData[] {
        return this.welfareFrees;
    }

    resetWelfareData() {
        this.welfareBouns = [];
        this.welfareFrees = [];
        this.welfarePgGames = [];
    }

    checkHaveWelfare() {
        if (this.welfareBouns.length > 0 || this.welfareFrees.length > 0) {
            return true;
        }
        return false;
    }
}
