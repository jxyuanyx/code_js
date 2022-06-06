import cv from "./../../../../components/lobby/cv";
import { BettingRoundType, ActionType, CardNum, CardSuit } from "../../../../common/tools/Enum";
import game_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

const { ccclass, property } = cc._decorator;
@ccclass
export class RoomData extends cc.Component {
    private static instance: RoomData;

    public static getInstance(): RoomData {
        if (!this.instance) {
            this.instance = new RoomData();
        }
        return this.instance;
    };
    public u32RoomId: number = 0;
    public roomUuidJs: string = "";     // data服roomid专用64位uuid字串
    public u32GameID: number = 0;
    public roomPassword: string;
    public isQuick: boolean = false;
    public u32OwnerId: number = 0;
    // public u32BuyinLimit: number = null;
    public u32Buyin: number = 0;
    public u32Stake: number = 0;
    public i32SelfSeat: number = -1;
    public m_bSelfInGame: boolean = false;
    public pkRoomState: RoomStates = new RoomStates();
    public pkRoomParam: RoomParams = new RoomParams();
    //public pkRoomParam: protocol.RoomParams = new protocol.RoomParams();
    public pkTableStates: TableStates = new TableStates();
    public kOwnerMsg: any[] = [];
    public kTablePlayerList: PlayerInfo[] = [];
    public u32BigBlind: number = 0;
    public u32SmallBlind: number = 0;
    // public u32CreateTime: number = 0;
    // public u32StartTime: number = 0;
    public u32PrePickSeatId: number = -1;
    public game_uuids_js: string[] = [];
    public m_bIsCancelVoice: boolean = false;
    // public last_buyin_clubid: number = 0;
    // public last_buyin_ownerid: number = 0;
    // public last_buyin_allianceId: number = 0;
    public entry_clubid: number = 0;
    public m_bChooseOuts: boolean = false;
    public u32DelayLeft: number = 0;
    // public clubInfos: clubInfo[] = [];
    public buyinInfos: PlayerBuyinInfo[] = [];
    public obPlayer: ObPlayer = null;
    public prohibit_sitdown_list: any[] = [];
    public m_bIsReconnectMode: boolean = false;
    public m_kStraddleList: any[] = [];
    public pkPayMoneyItem: PayMoneyItems = new PayMoneyItems();
    public kingBee: number = 0;
    public hasRecvNoticeGameSnapShot: boolean = false;
    public hasRecvBuyinToApplicantNotice: boolean = false;
    public hasRecvBuyinNotice: boolean = false;
    public recNeedBuyNoticeData: any = null;
    public recNeedBuyInsuranceData: any = null;
    public hasRecvStartGame: boolean = false;
    public isBuyin = false;//是否买入过
    public m_isAllInMode = false;
    public isSelfFold = false;
    public buyinAmount: number = 0;         // 需要买入的金额
    public curBuyInAmount: number = 0;      // 当前UI面板主观选择的带入金额
    public is_quick_sit: boolean = false;
    public isvirtual: boolean = false;
    public isShowNeedClub = false;
    public isShowNeedShop = false;
    public isNowCritTime = false; //当前是暴击局
    public isShowCritPrompt = false; //当前是否提示暴击信息
    public guess_odds_list: GuessOdds[] = [];
    public anyoneAllin = false; //是否有人allin
    change_points: number = 0;
    public starSeats: number[] = []; //superstar座位
    public inviterSeats: number[] = []; //特邀玩家座位
    public identity: number = 0; //当前房间中当前用户的身份 0.普通玩家 1. 明星 2. 解说员 3 管理员
    public voicePrivate: VoicePrivateNotice[] = []; //false 关闭控制 仅其他明星和解说员能听到此明星发言
    public voiceArr: CAFInfo[] = [];
    public voicePlaying: boolean = false;
    public last_voice: cc.Asset = null;
    public last_audioID: number = -1;
    public curActionPlayerId: number = 0;
    public quickraise: game_pb.QuickRaise = null;           // 快捷下注数据

    public nextCustomBarrageFee: number = 0; //明星桌自定义弹幕价格
    public auth: number = 0; //权限, 1=超级管理员(可封弹幕)
    public forbidden: number[] = []; //明星桌弹幕可封禁时间,如[30分钟,2小时,24小时,永久]
    public openCustomBarrage: boolean = false; //明星桌弹幕总开关
    public openTablePlayerCustomBarrage: boolean = false; //明星桌是否可以发送自定义弹幕
    public muteCustomBarrageSeconds: number = 0; //明星桌弹幕封禁时长(单位:秒),-1=永久
    public starRedpacketInfo: StarRedpacketInfo = new StarRedpacketInfo(); //当前明星桌红包节活动数据
    public allPlayersCount = 0; // 所有玩家的数量(包含旁观者)

    public reset() {
        this.u32RoomId = 0;
        this.roomUuidJs = "";
        this.u32GameID = 0;
        this.u32OwnerId = 0;
        // this.u32BuyinLimit = null;
        this.u32Buyin = 0;
        this.u32Stake = 0;
        this.i32SelfSeat = -1;
        this.m_bSelfInGame = false;
        this.pkRoomState.reset();
        this.pkRoomParam.reset();
        this.kOwnerMsg = [];
        this.kTablePlayerList = [];
        this.u32BigBlind = 0;
        this.u32SmallBlind = 0;
        // this.u32CreateTime = 0;
        // this.u32StartTime = 0;
        this.game_uuids_js = [];
        this.m_bIsCancelVoice = false;
        // this.last_buyin_clubid = 0;
        // this.last_buyin_ownerid = 0;
        // this.last_buyin_allianceId = 0;
        //this.entry_clubid = 0;
        this.m_bChooseOuts = false;
        this.u32DelayLeft = 0;
        // this.clubInfos = [];
        this.buyinInfos = [];
        this.obPlayer = new ObPlayer();
        this.prohibit_sitdown_list = [];
        this.m_bIsReconnectMode = false;
        this.m_kStraddleList = [];
        this.hasRecvNoticeGameSnapShot = false;
        this.hasRecvBuyinToApplicantNotice = false;
        this.hasRecvBuyinNotice = false;
        this.recNeedBuyInsuranceData = null;
        this.recNeedBuyNoticeData = null;
        this.hasRecvStartGame = false;
        this.isBuyin = false;
        this.m_isAllInMode = false;
        this.isSelfFold = false;
        this.buyinAmount = 0;
        this.curBuyInAmount = 0;
        this.isvirtual = false;
        this.is_quick_sit = false;
        this.isShowNeedClub = false;
        this.isShowNeedShop = false;
        this.isNowCritTime = false;
        this.guess_odds_list = [];
        this.anyoneAllin = false;
        this.change_points = 0;
        this.starSeats = [];
        this.inviterSeats = [];
        this.identity = 0;
        this.voicePrivate = [];
        this.curActionPlayerId = 0;
        this.nextCustomBarrageFee = 0;
        this.auth = 1;
        this.forbidden = [];
        this.openCustomBarrage = false;
        this.openTablePlayerCustomBarrage = false;
        this.muteCustomBarrageSeconds = 0;
        this.starRedpacketInfo.reset();
        this.allPlayersCount = 0;
        this.quickraise = null;
    }

    public resetVoice() {
        this.voiceArr = [];
        this.voicePlaying = false;
        this.last_voice = null;
        this.last_audioID = -1;
    }

    public addGuessOdds(data: GuessOdds) {
        this.guess_odds_list.push(data);
    }

    public RemoveGuessOdds() {
        this.guess_odds_list = [];
    }

    updateBuyinInfo(buyinInfo: PlayerBuyinInfo) {
        let isExist: boolean = false;
        for (let i: number = 0; i < this.buyinInfos.length; i++) {
            if (this.buyinInfos[i].playerid === buyinInfo.playerid) {
                this.buyinInfos[i].total_buyin = buyinInfo.total_buyin;
                this.buyinInfos[i].buyin_limit = buyinInfo.buyin_limit;
                isExist = true;
            }
        }
        if (!isExist) {
            this.buyinInfos.push(buyinInfo);
        }
    }

    public isZoom(): boolean {
        return cv.roomManager.checkGameIsZoom(this.u32GameID);
    }

    public addTablePlayer(playerInfo: PlayerInfo) {
        let player: PlayerInfo = new PlayerInfo;
        cv.StringTools.deepCopy(playerInfo, player);
        //cv.config.copyObject(playerInfo, player);
        for (let index = 0; index < this.kTablePlayerList.length; index++) {
            let element: PlayerInfo = this.kTablePlayerList[index];
            if (element.playerid == playerInfo.playerid || element.seatid == playerInfo.seatid) return;
        }
        this.kTablePlayerList.push(player);
    }

    public RemoveOwnerMsgById(u32RequestId: number) {
        for (let value of this.kOwnerMsg) {
            if (value.requestid === u32RequestId) {
                this.kOwnerMsg.splice(this.kOwnerMsg.indexOf(value), 1);
                break;
            }
        }
    }

    public RemoveTablePlayer(u32Uid: number) {
        for (let value of this.kTablePlayerList) {
            if (value.playerid == u32Uid) {
                this.kTablePlayerList.splice(this.kTablePlayerList.indexOf(value), 1)
                break;
            }
        }
    }

    public GetTablePlayer(u32Uid: number) {
        for (let value of this.kTablePlayerList) {
            if (value.playerid == u32Uid) {
                return value;
            }
        }
        return null;
    }

    public updateTablePlayer(u32Uid: number, pkPlayer: PlayerInfo) {
        for (let value of this.kTablePlayerList) {
            if (value.playerid == u32Uid) {
                cv.StringTools.deepCopy(pkPlayer, value);
            }
        }
    }
    public GetTablePlayerBySeatId(u32SeatId: number) {
        for (let value of this.kTablePlayerList) {
            if (value.seatid == u32SeatId) {
                return value;
            }
        }
        return null;
    }

    public add_isProhibit_sitdown(uid: number) {
        for (let value of this.prohibit_sitdown_list) {
            if (value == uid) {
                return
            }
        }
        this.prohibit_sitdown_list.push(uid);
    }

    public isProhibit_sitdown(uid: number) {
        for (let value of this.prohibit_sitdown_list) {
            if (value == uid) {
                return true;
            }
        }
        return false;
    }

    public isStraddle(seatid: number) {
        for (let value of this.m_kStraddleList) {
            if (value == seatid) {
                return true;
            }
        }
        return false;
    }

    public getIngamePlayer(): number {
        let count = 0;
        for (let index = 0; index < this.kTablePlayerList.length; index++) {
            if (this.kTablePlayerList[index].in_game) {
                count++;
            }
        }
        return count;
    }
}

export class RoomStates {
    public isBegin: boolean;
    public isWaiting: boolean;
    public isPause: boolean;
    public isMute: boolean;
    public paused: boolean;

    reset() {
        this.isBegin = false;
        this.isWaiting = false;
        this.isPause = false;
        this.isMute = false;
        this.paused = false;
    }
}
export class PlayerBuyinInfo {
    public playername: string = "";
    public playerid: number = 0;
    public total_buyin: number = 0;
    public curr_record: number = 0;
    public buyin_limit: number = 0; //已批准的带入上限
    public HandCount: number = 0;
    public total_buyout: number = 0;
}
export class clubInfo {
    public club_id: number = 0;
    public creater_id: number = 0;
    public club_name: string = "";
}
export class PotInfo {
    public potid: number = 1;
    public amount: number = 2;
}

export class CAFInfo {
    public kUrl: string = "";
    public kSender: string = "";
    public f32Time: number = 0;
    public u32SeatId: number = 0;
    public uid: number = 0;

    reset() {
        this.kUrl = "";
        this.kSender = "";
        this.f32Time = 0;
        this.u32SeatId = 0;
        this.uid = 0;
    }
}

export class TableStates {
    public players: PlayerInfo[] = [];                      //当前入座了的完整的玩家结构最多9个 
    public pots: PotInfo[] = [];                            //当前牌局的Pot信息结构 如果是结算阶段已经结算过的pot不发所以最好结算完就删掉该pot
    public public_card: CardItem[] = [];                    //当前牌局的公共牌信息，有几张发几张
    public curr_action_player_seatid: number = 0;           //当前操作者的座位号 没有就-1
    public curr_action_left_time: number = 0;               //当前操作者剩余的操作时间 没有就-1
    public curr_dealer_seatid: number = 0;                  //当前dealer位置
    public curr_bb_seatid: number = 0;                      //当前小盲位置
    public curr_sb_seatid: number = 0;                      //当前大盲位置
    public curr_straddle_seatid: number = 0;                //当前straddle位置如果有的话
    public bb_amount: number = 0;                           //大盲注金额
    public sb_amount: number = 0;                           //小盲注金额

    recet() {
        this.players = [];
        this.pots = [];
        this.public_card = [];
        this.curr_action_player_seatid = 0;
        this.curr_action_left_time = 0;
        this.curr_dealer_seatid = 0;
        this.curr_bb_seatid = 0;
        this.curr_sb_seatid = 0;
        this.curr_straddle_seatid = 0;
        this.bb_amount = 0;
        this.sb_amount = 0;
    }
}


export class BuyinPlayerInfo {
    public playerid: number;
    public amount: number;
    public playername: string;
    public playerhead: string;
    public requestid: number;
    public timestamp: number;
    public last_clubid: number;
    public allianceInfos: AllianceInfo[] = [];
}

export class AllianceInfo {
    public alliance_id: number;
    public alliance_name: number;
}

export class PlayerBuyInfo {
    public playername: string;
    public playerid: number;
    public total_buyin: number;
    public curr_record: number;
    public buyin_limit: number;
}

export class PlayerInfo {
    public playerid: number;
    public seatid: number;
    public name: string;
    public headurl: string;
    public marks: string;
    public gender: number;
    public stake: number;
    public last_voice: string; //总是保存玩家发过的最后一条chat消息voice类型的内容
    public last_action: number;
    public in_game: boolean;
    public inStay: boolean; //是否处于保位离桌
    public left_stay_time: number; //如果是保位离桌状态，就是剩余的保位离桌时间
    public round_bet: number; //玩家的本回合下注总数; 比如当前是turn 我下了2次注 一次200 一次raise到800 这个值就是1000 也就是还在桌面上 没有进入pot的金额
    public cards: CardItem[] = [];  //如果入局了 并且是发送目标 就有这个数据  就是说 如果我是断线重连进来的 我已经入局了并且有手牌 那么就有这个值 或者是针对showdown阶段已经show牌的玩家，包括主动show牌的玩家，就是说底牌可见的就有这个数据
    public position: PositionInfo; //位置信息
    public is_auto_withdraw: boolean;
    public isGameEnd: boolean;//是否是在一手牌游戏结束-下一手牌游戏开始之间
    public plat: number;
    public is_online: boolean; //true-玩家在线 false-玩家不在线
    public user_join_room_time: number; //用户加入房间时间
    public identity: number; // 明星身份 1. 明星 2. 解说员 3 管理员
    public NotDisturbUids: number[] = [];
    //public isNotDisturb: boolean; // 是否免打扰 fals true
    public liveStatus: number; //直播状态 0. 未开播  1. 正在直播 2. 已下播
    public mikeStatus: number; //开关麦状态 0. 未开麦 1. 开麦
    public mikeMode: number = 0; // 明星语音模式 0. 按键  1. 开放麦
    public canSpeak: boolean = false; //普通玩家能否手动mic发言
}

export class CardItem {
    public number: CardNum;
    public suit: CardSuit;
}

export class PositionInfo {
    public longtitude: number;//经度
    public latitude: number;//纬度
    public ip: string;//ip addr
}

export class ObPlayer {
    public data: PlayerInfo;
    public name: string;
    public headPath: string;
    public playerid: number;
    public marks: string;
    public isInroom: boolean;
    public plat: number;
    public is_online: boolean; //true-玩家在线 false-玩家不在线
    public user_join_room_time: number; //用户加入房间时间
}

/**
 * 牌局参数结构
 */
export class RoomParams {
    owner_type: number = 0;                                     //区分普通牌具/俱乐部牌局/定制俱乐部牌局
    game_mode: number = 0;                                      //区分普通牌局/比赛/其它游戏类型
    player_count_max: number = 0;                               //牌桌最大人数
    rule_blind_enum: number = 0;                                //牌局限定大小盲注对应id
    rule_buyin_min_enum: number = 0;                            //局限定最小带入对应id
    rule_buyin_fold: number = 0;                                //牌局限定最大带入对于最小带入的倍数
    leastBuyin: number = 0;                                     //最少买入(针对短牌买入限制)
    rule_time_limit: number = 0;                                //牌局时长对应8个时长类型
    rule_switch_buyin_control: number = 0;                      //带入控制功能开关
    rule_switch_insurance: number = 0;                          //保险功能开关
    rule_switch_anti_cheat: number = 0;                         //防作弊相关功能开关
    rule_switch_force_straddle: number = 0;                     //强制straddle功能开关
    rule_switch_random_seat: number = 0;                        //随机入座功能开关
    rule_ante_amount: number = 0;                               //ante金额
    game_name: string = "";                                     //房间名字
    club_id: number = 0;                                        //创建房间所属的俱乐部id
    is_associated_jackpot: boolean = false;                     //是否关联jackpot
    is_allin_allfold: boolean = false;                          //是否是allin allfold
    alliance_ids: number[] = [];                                //联盟id集合
    owner_clubname: string = "";                                //房间所属俱乐部
    CreaterId: number = 0;				                        //创建房间的玩家ID   
    short_game_double_ante: boolean = false;                    //短牌模式是否开启Dealer2倍Ante
    short_fullhouse_flush_straight_three: boolean = false;      //短牌模式开启和长牌同样比牌顺序
    is_opened_drawback: boolean = false;                        //是否打开撤码功能
    drawback_hold_times: number = 0;                            //撤出记分牌保留的倍数（为保证整数客户端*10，所以服务器计算时/10）
    drawback_times: number = 0;                                 //撤出记分牌倍数（为保证整数客户端*10，所以服务器计算时/10）
    choose_outs: boolean = false;                               //是否可选outs
    muck_switch: boolean = false;                               //埋牌开关
    anti_simulator: boolean = false;                            //禁止模拟器开关
    force_showcard: boolean = false;                            //强制秀牌开关
    unlimit_force_showcard: boolean = false;                    //无限强制秀牌开关
    club_head: string = "";                                     //俱乐部头像
    auto_start_num: number = 0;                                 //自动开局的人数 0 代表不是自动开桌
    join_password: string = "";                                 //进入房间密码 为空表示不设密码
    buyin_password: string = "";                                //buyin密码 为空表示不设密码
    IscalcIncomePerhand: boolean = false;                       //是否每手都计算抽水
    is_mirco: number = 0;	                                    //是否微盲局0否1是
    BB: number = 0;
    anti_multiple: number = 0;
    showForClients: number[] = [];                              // 此房间对哪些客户端类型可见
    gameid: number = 0;
    isCriticismField: boolean = false;                          // 是否暴击场(只针对德州)
    minCritProb: number = 0;                                    // 最小暴击概率
    maxCritProb: number = 0;                                    // 最大暴击概率
    critNeedMoney: number = 0;                                  // 暴击比下金额
    is_open_guess: boolean = false;                             // 是否开启猜手牌游戏
    guess_betamout_cfg: string = "";                            // 猜手牌可以下注的金额 例如"500,50000"
    insuranceMode: number = 0;                                  // 保险模式 0 旧 1 新    
    auto_withdraw: boolean = true;                              //自动撤码开关 true:打开自动撤码开关 false:关闭自动撤码开关
    auto_buyin_val: number = 0;                                 //自动补码值
    auto_buyout_val: number = 0;                                //自动撤码值
    bottom_limit: number = 0;                                   //游戏底限值
    anti_simulator_ignore_cond: number = 0;                     //当级别手数大于设定值是忽略模拟器限制
    manual_created: number = 0;                                 // 是否为手动创建的牌局 0:模板创建 1:手动创建

    reserveSeat: number = 0;                                    //明星预留座位
    starData: StarData[] = [];                                  //特邀明星
    commentators: CommentatorInfo[] = [];                       //特邀解说员
    canSpeak: boolean = false;                                  //普通玩家发言标识
    formalBegin: number = 0;                                    //明星桌正式开始时间
    starInviter: number[] = [];                                 //特邀玩家
    tableTitle: string = "";                                    //房间名字
    showAllHole: boolean = false;                               //是否亮开所有底牌
    proDatas: game_pb.ProDatas[] = [];                          //多级别参数, 共6个级别

    public reset() {
        this.owner_type = 0;
        this.game_mode = 0;
        this.player_count_max = 0;
        this.rule_blind_enum = 0;
        this.rule_buyin_min_enum = 0;
        this.rule_buyin_fold = 0;
        this.leastBuyin = 0;
        this.rule_time_limit = 0;
        this.rule_switch_buyin_control = 0;
        this.rule_switch_insurance = 0;
        this.rule_switch_anti_cheat = 0;
        this.rule_switch_force_straddle = 0;
        this.rule_switch_random_seat = 0;
        this.rule_ante_amount = 0;
        this.game_name = "";
        this.club_id = 0;
        this.is_associated_jackpot = false;
        this.is_allin_allfold = false;
        this.alliance_ids = [];
        this.owner_clubname = "";
        this.CreaterId = 0;
        this.short_game_double_ante = false;
        this.short_fullhouse_flush_straight_three = false;
        this.is_opened_drawback = false;
        this.drawback_hold_times = 0;
        this.drawback_times = 0;
        this.choose_outs = false;
        this.muck_switch = false;
        this.anti_simulator = false;
        this.force_showcard = false;
        this.unlimit_force_showcard = false;
        this.club_head = "";
        this.auto_start_num = 0;
        this.join_password = "";
        this.buyin_password = "";
        this.IscalcIncomePerhand = false;
        this.is_mirco = 0;
        this.BB = 0;
        this.anti_multiple = 0;
        this.showForClients = [];
        this.gameid = 0;
        this.isCriticismField = false;
        this.minCritProb = 0;
        this.maxCritProb = 0;
        this.critNeedMoney = 0;
        this.is_open_guess = false;
        this.guess_betamout_cfg = "";
        this.insuranceMode = 0;
        this.auto_withdraw = true;
        this.auto_buyin_val = 0;
        this.auto_buyout_val = 0;
        this.bottom_limit = 0;
        this.anti_simulator_ignore_cond = 0;
        this.manual_created = 0;
        this.reserveSeat = 0;
        this.starData = [];
        this.commentators = [];
        this.canSpeak = false;
        this.formalBegin = 0;
        this.starInviter = [];
        this.tableTitle = "";
        this.showAllHole = false;
        this.proDatas = [];
    }
}

export class PayMoneyItems {
    playWay = 0;                                        // 0 普通玩法 1 短牌玩法
    actionCount = 0;                                    // 操作延迟次数
    showCardCount = 0;                                  // 强制亮牌的次数
    insuranceCount = 0;                                 // 延迟购买保险的次数
    actionDelayCountsFee: FeeItem[] = [];               // 操作延迟思考次数对应的费用
    showCardCountsFee: FeeItem[] = [];                  // 强制亮牌次数对应的费用
    insuranceCountsFee: FeeItem[] = [];                 // 购买延迟保险时限次数对应的费用
    showLeftCardFee: FeeItem[] = [];                    // 发发看对应的费用
    emotionFee: FeeItem = null;                         // 表情对应的费用
    emotionFee2: FeeItem = null;                        // 普通表情对应的费用
}


export class FeeItem {
    startCount: number = 0; // 起始的次数 举例:[1-1] [2-5]
    endCount: number = 0; // 结束的次数
    needCoin: number = 0; // 需要的钱(已经*100) 比方说 0.5 值为 50
    state: string = ""; // flop turn river(发发看不同阶段收钱不同)
}

export class NoticeResetGame {
    roomid: number = 0;
    gameid: number = 0; //uuid from CF
    players: PlayerInfo[] = [];//table player
}

export class NoticeGameElectDealer {
    roomid: number = 0;
    dealer_seatid: number = 0;
    sb_seateid: number = 0;
    bb_seatid: number = 0;
}

export class NoticeGameBlind {
    roomid: number = 0;
    sb_amount: number = 0;
    bb_amount: number = 0;
    straddle_seat_list: number[] = [];   //straddle座位列表
    straddle_amount_list: number[] = []; //straddle金额列表
    post_seat_list: number[] = []; //Post座位列表
    sb_seatid: number = 0;
    bb_seatid: number = 0;
    dealer_seatid: number = 0;
}
export class NoticeGameHolecard {
    roomid: number = 1;
    seat_list: number[] = [];
    holdcards: CardItem[] = [];
}
//广播玩家做出的动作
export class NoticePlayerAction {
    roomid = 1;
    last_action_seat_id = 0;
    action_type: ActionType = 0;
    amount = 4;
    pots: PotInfo[] = [];
    default_fold: boolean = false;
    ActionSeq: number = 0;
}
//发公共牌
export class NoticeCommunityCards {
    roomid = 0;
    cards: CardItem[] = []; //3张;1张; 1张;
    betting_round: BettingRoundType = null;
}

//通知房间内所有人该轮下注回合结束
export class NoticeGameRoundEnd {
    roomid = 0;
    pots: PotInfo[] = [];
    public_card: CardItem[] = []; //当前牌局的公共牌信息，有几张发几张
}
export class OutItem {
    outs_id: number = 0;
    card: CardItem = null;
    is_tie: boolean = false;
}

export class PlayerSeatInfo {
    seatid: number = 0;
    playername: string = "";
    outs_count: number = 0;
    holecards: CardItem[] = [];
    total_investment: number = 0;           // 该玩家在本手游戏中总共下注的金额 相当于是每一轮round_bet的总和
}

export class PlayerSettleInfo {
    seatid = 0;
    playerid = 0;
    amount = 0;
    is_steal_blind: boolean = false;
    pots: WinPotInfo[] = [];
    total_investment = 0;//该玩家在本手游戏中总共下注的金额 相当于是每一轮round_bet的总和 ResetGame时重置为0
}

export class JackPotWinInfo {
    win_jackpot_id = 0;		//赢得jackpot的人的id
    win_jackpot_num = 0;		//赢得的jackpot数量
}

export class WinPotInfo {
    potid = 0; //赢的potid
    amount = 0; //这个pot里面赢了多少钱
}


//游戏每一手结算客户端自建数据结构
export class playerWinPotInfo {
    pot: WinPotInfo = null; //赢的pot
    playerid = 0; //赢这个pot的玩家
}
//
export class WinPotInfoPlayerIds {
    pot: WinPotInfo = null; //赢的pot
    playerids: number[] = []; //赢这个pot的所有玩家
}
export class PotIdWidthWinPotInfo {
    potInfo: WinPotInfoPlayerIds = null; //赢的pot信息
    potid: number = 0; //赢这个potid
}

export class NoticeAddActionTime {
    roomid = 0;
    action_seatid = 0;
    rest_action_time = 0;
    count = 0; // 这人延迟时间用掉了多少次
}

export class RequestSendChat {
    roomid = 1;
    ctype = 2;
    content = 3;
}

export class ResponseSendChat {
    error = 1;
    next_fee = 2;
}

export class NoticeSendChat {
    roomid = 1;
    ctype = 2;
    content = 3;
    playerid = 4;
    seatid = 5;
}

export class NoticeGameAnte {
    roomid = 0;
    seat_list: number[] = [];
    amount_list: number[] = [];
}

export class NotiPlayerHoleCard {
    holdcards: CardItem[] = [];
}

export class GuessOdds {
    option: number = 0;
    odds_percent: number;
}

export class CommentatorInfo {
    uid: number;
    mikeStatus: number;
    television: number; //1=中文频道 2=英文频道 3=越南文频道 4=泰文频道 5=阿拉伯文频道
}

export class StarData {
    uid: number;
    nickName: string;
    thumb: string;
    status: number;
}

export class VoicePrivateNotice {
    uid: number = 0;
    isVoicePublic: boolean = false;
}

export class CanSpeakNotice {
    uid: number = 0;
    CanSpeak: boolean = false;
}

export class StarRedpacketInfo {
    left_time: number = 0;
    total_luck_amount: number = 0;
    desc: string = "";
    title: string = "";
    public reset() {
        this.left_time = 0;
        this.total_luck_amount = 0;
        this.desc = "";
        this.title = "";
    }
}