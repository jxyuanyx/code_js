import jackfruit_pb = require("../../../../Script/common/pb/jackfruit");
import jackfruit_proto = jackfruit_pb.jackfruit_proto;

import { HashMap } from "../../../common/tools/HashMap";
import { CardNum, CardSuit } from "../../../common/tools/Enum";
import cv from "../../lobby/cv";
const { ccclass, property } = cc._decorator;

@ccclass
export class JackfruitRoomData extends cc.Component {
    private static instance: JackfruitRoomData;

    public static getInstance(): JackfruitRoomData {
        if (!this.instance) {
            this.instance = new JackfruitRoomData();
        }
        return this.instance;
    };
    public param: RoomParam = new RoomParam();
    public curState: eRoundState = eRoundState.RS_DUMMY;
    public cachedNotifyMsg: GameRoundEndNotify = new GameRoundEndNotify();
    public fee:PayMoneyItems = new PayMoneyItems();
    public barrageLeftSeconds:number = 0;          //离可以发送弹幕的秒数
    public nSelfSeatID:number = -1;
    public nPrePickSeatID:number = -1;
    public kTablePlayerList: PlayerInfo[] = [];
    public actionDelayCountsFee = -1;              //延时需要的费用  -1表示不能延时
    public delayedOperationPlayIds: number[] = [];
    public buyinInfos: PlayerBuyInInfo[] = [];
    public canChangeTable = false;                 // 是否可以点击换桌
    public startMatchTimeStamp:number = 0;         // 开始匹配的初始时间戳  为0表示还没有进入匹配
    public matchedSeconds:number = 0;              // 已经匹配的时长 秒
    public gameUUIDs:string[] = [];      
    public jackpotDataInfo:JackpotDataInfo = new JackpotDataInfo();
    public jackpotLeftAmount:number = -1;          // jackpot 余额， -1 表示此房间没有jp
    public luckyOne:JackpotAwardInfo = new JackpotAwardInfo();
    public JackpotRecords:JackpotAwardInfo[] = [];
    public BrandBarrageInfos:BrandBarrageInfo[] = [];// 牌型弹幕数据
    public noticeJackPotAwardInfo:NoticeJackPotAwardInfo = new NoticeJackPotAwardInfo();
    reset(): void {
        this.param.reset();
        this.curState = eRoundState.RS_DUMMY;
        this.cachedNotifyMsg.reset();
        this.fee.reset();
        this.barrageLeftSeconds = 0;
        this.nSelfSeatID = -1;
        this.kTablePlayerList = [];
        this.actionDelayCountsFee = -1;
        this.delayedOperationPlayIds = [];
        this.buyinInfos = [];
        this.canChangeTable = false;
        this.startMatchTimeStamp = 0;
        this.matchedSeconds = 0;
        this.gameUUIDs = [];
        this.jackpotDataInfo.reset();
        this.jackpotLeftAmount = -1;
        this.luckyOne.reset();
        this.JackpotRecords = [];
        this.BrandBarrageInfos = [];
        this.noticeJackPotAwardInfo = new NoticeJackPotAwardInfo();
    }
    
    public addTablePlayer(playerInfo: PlayerInfo) {
        let player: PlayerInfo = new PlayerInfo();
        cv.StringTools.deepCopy(playerInfo, player);
        for (let index = 0; index < this.kTablePlayerList.length; index++) {
            let element: PlayerInfo = this.kTablePlayerList[index];
            if (element.playerId == playerInfo.playerId || element.seatId == playerInfo.seatId) return;
        }
        this.kTablePlayerList.push(player);
    }

    public setAllTablePlayerState(state:ePlayerState)
    {
        for (let value of this.kTablePlayerList) {
            value.state = state;
        }
    }

    public RemoveTablePlayer(nUID: number) {
        for (let value of this.kTablePlayerList) {
            if (value.playerId == nUID) {
                this.kTablePlayerList.splice(this.kTablePlayerList.indexOf(value), 1)
                break;
            }
        }
    }

    public GetTablePlayer(nUID: number) {
        for (let value of this.kTablePlayerList) {
            if (value.playerId == nUID) {
                return value;
            }
        }
        return null;
    }

    public updateTablePlayer(nUID: number, pkPlayer: PlayerInfo) {
        for (let value of this.kTablePlayerList) {
            if (value.playerId == nUID) {
                cv.StringTools.deepCopy(pkPlayer, value);
            }
        }
    }

    public GetTablePlayerBySeatId(nSeatID: number) {
        for (let value of this.kTablePlayerList) {
            if (value.seatId == nSeatID) {
                return value;
            }
        }
        return null;
    }
    
    public updateBuyinInfo(buyinInfo: PlayerBuyInInfo) {
        let isExist: boolean = false;
        for (let i: number = 0; i < this.buyinInfos.length; i++) {
            if (this.buyinInfos[i].playerId === buyinInfo.playerId) {
                this.buyinInfos[i].totalBuyIn = buyinInfo.totalBuyIn;
                this.buyinInfos[i].currRecord = buyinInfo.currRecord;
                this.buyinInfos[i].handCount = buyinInfo.handCount;
                isExist = true;
            }
        }
        if (!isExist) {
            this.buyinInfos.push(buyinInfo);
        }
    }
};

/**
 * 牌局参数结构
 */
export class RoomParam {
    public ownerType: number = 0;                   // 区分普通牌具/俱乐部牌局/定制俱乐部牌局
    public gameMode: number = 0;
    public playerCountMax: number = 0;              // 牌桌最大人数
    public gameName: string = "";                   // 房间名字
    public ante: number = 0;                        // ante金额
    public manualCreated: number = 0;               // 是否为手动创建的牌局 0:模板创建 1:手动创建
    public minimumAmount: number = 0;               // 能玩游戏的最小金额
    public ruleCheckAmount: number = 0;             // 低于此金币时自动补充
    public ruleAddToAmount: number = 0;             // 补充金币到此数量
    public deskType: number = 0;                    // 房间等级
    public zoneMultiple: number[] = [];             // 区域比例 [5,3,1]
    public createTime: number = 0;
    public limitPlayers:number = 0;                 // 限制在房间的最大人数
    public creatorId:number = 0;                    // 创建房间的玩家ID
    public creatorName:string = "";
    public gameTimeLimit:number = 0;                // 牌局时长对应8个时长类型
    public idleSecs:number = 0;                     // 空闲多久可以出现换桌按钮，这个前端不用管
    public ruleCheckScore:number = 0;               // 低于此金币时自动补充
    public ruleAddToScore:number = 0;               // 补充分数到此数量
    public ruleServeScore:number = 0;               // 上桌分数

    public reset(): void {
        this.ownerType = 0;
        this.gameMode = 0;
        this.playerCountMax = 0;
        this.gameName = "";
        this.ante = 0;
        this.manualCreated = 0;
        this.minimumAmount = 0;
        this.ruleCheckAmount = 0;
        this.ruleAddToAmount = 0;
        this.deskType = 0;
        this.zoneMultiple = [];
        this.createTime = 0;
        this.limitPlayers = 0;
        this.creatorId = 0;
        this.creatorName = "";
        this.gameTimeLimit = 0;
        this.idleSecs = 0;
        this.ruleCheckScore = 0;
        this.ruleAddToScore = 0;
        this.ruleServeScore = 0;
    }
}

/**
 * 牌局参数结构
 */
export class GameRoundEndNotify {
    public playerSettle: PlayerSettle[] = [];;
    public stopWorld: number = 0;        // 非0代表系统即将维护
    public pubCards: CardItem[] = [];
    public leftSeconds: number = 0;      //
    public nextStateStamp: number = 0;   // 下一局游戏开始的时间戳
    public settleType: number = 0;   // 0 正常分数结算，1 ：输家只能输这么多  2：赢家只能赢这么多
    public onlyWinAmount: number = 0;  // settleType不为0时赋值， 表示只能输或只能赢的金币，正值

    public reset(): void {
        this.playerSettle = [];
        this.stopWorld = 0;
        this.pubCards = [];
        this.leftSeconds = 0;
        this.nextStateStamp = 0;
        this.settleType = 0;
        this.onlyWinAmount = 0;
    }
}
export class PayMoneyItems {
    emotionFee:number = 0;      // 互动表情对应的费用, todo: -1表示不能发了
    emotionFee2:number = 0;     // 普通表情对应的费用, todo: -1表示不能发了
    
    public reset(): void {
        this.emotionFee = 0;
        this.emotionFee2 = 0;
    }
}


export class PlayerInfo {
    public playerId: number;
    public seatId: number;
    public name: string;
    public headUrl: string;
    public marks: string;
    public gender: number;
    public lastVoice: string;           // 总是保存玩家发过的最后一条chat消息voice类型的内容
    public amount: number;              // 金币数量
    public state: ePlayerState;         // > 1 表示在座位上的
    public holeCards:CardItem[] = [];   // 手牌(包括已摆牌)
    public headCards:CardItem[] = [];   // 头道摆牌
    public middleCards:CardItem[] = []; // 中道摆牌
    public tailCards:CardItem[] = [];   // 尾道摆牌
    public settleScore: number;         // 玩家战绩分数
    public settleAmount: number;        // 玩家战绩金币
    public score: number;               // 现有分数
    public plat: number;                // 平台0:pkw 1:wpk
    public is_online: boolean; //true-玩家在线 false-玩家不在线
    public user_join_room_time: number; //用户加入房间时间
    public NotDisturbUids: number[] = [];
}

export class PlayerSettle {
    public player: PlayerInfo;
    public headResult: PlaceResult;        // 头道结果
    public middleResult: PlaceResult;      // 中道结果
    public tailResult: PlaceResult;        // 尾道结果
    public repeatWining: number;           // 连胜次数 值为0和>1的数，可判断>1即有连胜
    public winAllAward: number;            // 全胜奖励
    public result: number;                 // >0 赢的金币 =0 平 <0 输的金币
    public totalScore: number;             // 总计分数
    public winAmount:number;               // 水前金币      牌局回顾使用此字段
    public resultScore:number;             // 赢的分数
    public winScore:number;                // 水前分数    牌局回顾使用此字段
}

export class PlaceResult {
    public score: number = 0;                   // 获得分数(比牌后)
    public result: number = 0;                  // 0 平 1 胜 -1 负
    public level: CardLevel = CardLevel.Dump;   // 牌型
    public zoneMultiple: number = 0;            // 区域倍数
    public levelScore: number = 0;              // 牌型分数
    public reset(): void {
        this.score = 0;
        this.result = 0;
        this.level = CardLevel.Dump;
        this.zoneMultiple = 0;
        this.levelScore = 0;
    }
}

export class CardItem {
    public number: CardNum;
    public suit: CardSuit;
}

export class DealNotify {
    public roomID;
    public seatList:number[];
    public holdCards:CardItem[];
    public publicCards:CardItem[];
    public leftSeconds;             // 倒计时时间 (到眯牌阶段间隔)
    public nextStateStamp;          // 开始眯牌的时间戳
    public actionDelayCountsFee;
}

export class BuyInNotify {
    public seatId:number;       // 买入座位号
    public playerId:number;     // 买入人id
    public playerName:string;   // 买入人的名字
    public buyInAmount:number;  // 买入筹码
    public amount:number;       //当前桌面筹码
    public isAuto:boolean;      // 是否是自动带入
    public roomId:number;       // 房间号
    public score:number;        // 买入后分数
    public buyInScore:number;   // 买入分数
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

export class PlayerBuyInInfo{
    public playerName: string;
    public playerId: number;
    public totalBuyIn: number;
    public currRecord: number;      // 实时战绩的金币数，即输赢
    public totalBuyInScore: number; // 买入分数
    public currRecordScore: number; // 实时战绩的分数
    public handCount: number;       // 玩家手数
}

export class JackpotDataInfo{
    public leftAmount:number;       // jp余额
    public boundaryScore:number;    // 盈利达到分数
    public contrScore:number;       // 注入jp分数
    public huangTongPer:number;     // 皇家同花顺奖励比例
    public siTiaoPer:number;        // 四条奖励比例
    public tongHuaShunPer:number;   // 同花顺比例
    
    public reset(): void {
        this.leftAmount = 0;
        this.boundaryScore = 0;
        this.contrScore = 0;
        this.huangTongPer = 0;
        this.siTiaoPer = 0;
        this.tongHuaShunPer = 0;
    }
}

export enum BrandBarrageType {
    BrandBarrageType_DUMMY = 0, // 不操作
    LIKE,                       // 赞
    DESPISE,                    // 鄙视
}

export class BrandBarrageInfo{
    public card:CardItem;           // 显示的公共牌
    public type:BrandBarrageType;   // 弹幕类型
    public index:number;            // 公共牌的数组索引位置。转牌3，河牌4.
    public hasReverse:boolean;      // 是否有反转
}

export class JackpotAwardInfo{
    public playerId: number = 0;                    // 玩家
    public level: CardLevel = CardLevel.Dump;       // 牌型
    public awardAmount: number = 0;                 // 奖励金额
    public awardTime: number = 0;                   // 奖励时间
    public playerName: string = "";                 // 中奖玩家昵称
    public ante: number = 0;                        // 在哪个房间级别中奖
    
    public reset(): void {
        this.playerId = 0;
        this.level = CardLevel.Dump;
        this.awardAmount = 0;
        this.awardTime = 0;
        this.playerName = "";
        this.ante = 0;
    }
}

export class GameRecord{
    public playerSettle: PlayerSettle[] = [];
    public pubCards: CardItem[] = [];
}

export enum eRoundState {
    RS_DUMMY = 0,
    RS_FREE = 1,                            // 空闲阶段，牌桌上不足两人
    RS_READY = 2,                           // 等待玩家点击下一局
    RS_WAIT = 11,                           // 等待开始
    RS_DEAL = 12,                           // 第一轮发牌
    RS_PLACE_CARDS = 13,                    // 摆牌
    RS_TURN = 14,                           // 转牌
    RS_RIVER = 18,                          // 河牌
    RS_SETTLEMENT = 20,                     // 结算阶段
}

export enum ePlayerState {
    SeatState_DUMMY = 0,
    SFree = 1,                  // 旁观
    SReady = 2,                 // 准备
    SClickReady = 8,            // 点击继续
    SWaitPlaceCards = 11,       // 等待摆牌
    SPlaceCards = 13,           // 摆牌中
    SModifyPlaceCards = 14,     // 修改摆牌中
    SConfirmsPlaceCards = 15,   // 确认摆牌，确认摆牌可以和SModifyPlaceCards状态互相转换
    SWaitResult = 20,           // 等待结算
}

export enum eSeatStatus {
    SeatStatus_empty = 0,
    SeatStatus_waiting,
    SeatStatus_inGame,
    SeatStatus_ready,
    SeatStatus_wait_ready,
    SeatStatus_waiting_bubble
}

export enum CardLevel {
    Dump = 0,           // 无用
    HighCard,           // 高牌
    OnePair,            // 一对
    TwoPair,            // 两对
    ThreeOfAKind,       // 三条
    StraightI,          // 顺子
    Flush,              // 同花
    FullHouse,          // 葫芦
    FourOfAKind,        // 四条
    StraightFlush,      // 同花顺
    RoyalFlush,         // 皇家同花顺
}

export enum ChatType {
    Enum_Emoji = 0,             // 国王表情
    Enum_Voice,                 // 声音
    Enum_Emoji_Interactive,     // 互动表情
    Enum_Barrage,               // 弹幕
}

//弹幕
export enum BarrageType {
    Enum_System		= 0,        // 系统弹幕
    Enum_Custom 	= 1,        // 用户自定义弹幕
    Enum_CardType   = 2,        // 牌型弹幕
}

export class BuYinData {
    public needAmount:number = 0;         // 需要买入的金币
    public amount:number = 0;             // 当前现有的金币
    public needScore:number = 0;          // 需要买入的分数
    public score:number = 0;              // 当前现有分数
}

export class SettleResp {
    public settleScore:number = 0;               // 玩家战绩分数
    public settleAmount:number = 0;              // 玩家战绩金币
}

export class JackfruitRecordsData {
    recordCaches: HashMap<string, any> = new HashMap();            // 所有牌局缓存
    reset(): void {
        this.recordCaches.clear();
    }

    /**
     * json数据中是否存在该uuid数据段
     */
    hasJsonValue(uuid: string) {
        let retVaule: boolean = false;
        this.recordCaches.forEach((key: string, value: any): any => {
            if (key === uuid) {
                retVaule = true;
                return "break"
            };
        });
        return retVaule;
    }
}

export class NoticeJackPotAwardInfo{
	public awardInfo:AwardInfos[]  = [];
    public cur_time :number = 0;
    public msg_type :number = 0;
	public blind_level :number = 0;
	public sys_msg_type :number = 0; //自定义消息 1-中奖消息 2-跑马灯消息
}

export class AwardInfos{
	public award_playid :number = 0; 
	public award_amount :number = 0;
	public hand_level :number = 0;
	public award_player_name :string = "";
}