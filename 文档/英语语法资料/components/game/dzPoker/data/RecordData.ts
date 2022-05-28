// 游戏数据 - 牌局记录

import cv from "../../../lobby/cv";
import { RoomParams } from "./RoomData";
import { HashMap } from "../../../../common/tools/HashMap";
import { CardNum, CardSuit } from "../../../../common/tools/Enum";

/**
 * 牌类型
 */
export class HandCardType {
    eCardNum: CardNum = CardNum.CARD_2;
    eCardSuit: CardSuit = CardSuit.CARD_DIAMOND;
}

/**
 * 俱乐部记录
 */
export class RecordsData {
    sRoomUUID: string = "0";                                    // uuid
    nCreateTime: number = 0;                                    // 创建时间
    nSelfWinbet: number = 0;                                    // 积分
    nInsuranceWinbet: number = 0;                               // 保险
    nJackpotWinbet: number = 0;                                 // jackpot
    nSelfNetMargin: number = 0;                                 // 存余
    nHandCount: number = 0;                                     // 手数
    nBuyIn: number = 0;                                         // 带入
    nServiceFee: number = 0;                                    // 服务费
    sOwnerName: string = "";                                    // 
    sOwnerHead: string = "";                                    // 
    tRoomParam = new RoomParams();                              // cv.worldPB.build("RoomParams");
}

/**
 * 带入信息
 */
export class BuyInsData {
    nUID: number = 0;
    nTotalBuyin: number = 0;
    nWinBet: number = 0;
    nInsuraceWinbet: number = 0;
    nInsuranceBetAmount: number = 0;
    nHand: number = 0;
    nDrawin: number = 0;
    nJackpotWinbet: number = 0;
    sPlayername: string = "";
    sPlayerHead: string = "";
    nLastBuyinClubid: number = 0;                               // 是次买入的俱乐部ID
    nAward2CludFund: number = 0;                                // jackpot奖励给俱乐部基金
}

/**
 * 玩家记录
 */
export class PlayerRecord {
    nPlayerBettingRoundBet: number = 0;                         // 本局下注的所有筹码总数
    nWinBet: number = 0;                                        // 输赢的筹码数
    nInsuranceBet: number = 0;                                  // 投保额
    nInsuranceAmount: number = 0;                               // 赔付额
    nJackWinbet: number = 0;                                    // 一手牌赢的jackpot筹码数
    nPlayerID: number = 0;
    sPlayerName: string = "";
    sPlayerHead: string = "";
    bMuck: boolean = false;                                     // 是否自动埋牌
    bActiveShow: boolean = false;                               // 主动show
    bForceShowDown: boolean = false;                            // 是否强制show
    nLastRoundType: number = 0;                                 // 玩家坚持到哪一阶段(cv.Enum.BettingRoundType)
    vCards: Array<HandCardType> = [];                           // 手牌数组 
    plat: number = 0;                                           // 平台
    seatNo: number = -1;                                        // 
    seatInfo: number = 0;                                       // 000=default, 001=D, 010=SB, 100=BB
    bFold: boolean = false;                                     // 是否弃牌
    nReviewSendOutLen: number = 0;                              // 发发看的长度(即该玩家额外能看到的长度)
    nReviewSendOutActLen: number = 0;                           // 牌局回顾"发发看"动画长度
    nForceShowedActLen: number = 0;                             // 被强制亮牌的长度(需要显示翻牌动画)
}

/**
 * 俱乐部信息
 */
export class ClubInfo {
    sClubName: string = "";
    nCreateClubUid: number = 0;
    nOwnerId: number = 0;
    nClubId: number = 0;
    vUID: Array<number> = [];
}

/**
 * 联盟信息
 */
export class AllinceResultInfo {
    sAllianceName: string = "";
    nAllianceID: number = 0;
    vClubID: Array<number> = [];
}

/**
 * 牌谱信息
 */
export class PokerHandData {
    nClubID: number = 0;                                        // 俱乐部id
    nRoomID: number = 0;                                        // 房间id
    sGameUUID: string = "";                                     // 游戏uuid
    sRoomUUID: string = "";                                     // 房间uuid
    nCreateTime: number = 0;                                    // 创建时间
    nTotalPot: number = 0;                                      // 底池
    nMaxPot: number = 0;                                        // 最大注
    nInsuranceWinbet: number = 0;                               // 保险
    nJackpotWinbet: number = 0;                                 // jackpot
    nGameMode: number = 0;                                      // 游戏模式
    nShortFull: number = 0;                                     // 0: 花 > 葫芦, 1:葫芦 > 花
    bMirco: boolean = false;                                    // 是否是微牌局
    nGameid: number = 0;                                        // 当前游戏ID
    bAssociatedJackpot: boolean = true;                         // 是否有关联的JP
    objReplay: Object = null;                                   // 牌局回放数据串对象
    objReplayInsurance: Object = null;                          // 保险回放数据串对象
    vPlayerRecords: Array<PlayerRecord> = [];                   // 玩家记录
    vPublicCards: Array<HandCardType> = [];                     // 公共牌堆
    vUnsendPublicCards: Array<HandCardType> = [];               // 未发出的公共牌堆
    bForceShowcard: boolean = false;                            // 该手牌局是否开启"强制亮牌"功能
    bStarClosed: boolean = true;                                // 明星桌是否关闭(默认:true, 关闭后即为普通桌)
    vShowCardByStanderUID: number[] = [];                       // 旁观者发齐强制亮牌的uid数组
    nForceShowCoin: number = 0;                                 // 强制亮牌价格(只针对收藏牌局, 牌局中牌谱的价格与牌局保持一致)
    nSendOutCoin: number = 0;                                   // 下一次发发看价格(只针对收藏牌局, 牌局中牌谱的价格与牌局保持一致)

    reset(): void {
        this.nClubID = 0;
        this.nRoomID = 0;
        this.sGameUUID = "";
        this.sRoomUUID = "";
        this.nCreateTime = 0;
        this.nTotalPot = 0;
        this.nMaxPot = 0;
        this.nInsuranceWinbet = 0;
        this.nJackpotWinbet = 0;
        this.nGameMode = 0;
        this.nShortFull = 0;
        this.bMirco = false;
        this.nGameid = 0;
        this.bAssociatedJackpot = false;
        this.objReplay = null;
        this.objReplayInsurance = null;
        this.bForceShowcard = false;
        this.bStarClosed = true;
        this.nForceShowCoin = 0;
        this.nSendOutCoin = 0;

        cv.StringTools.clearArray(this.vPublicCards);
        cv.StringTools.clearArray(this.vPlayerRecords);
        cv.StringTools.clearArray(this.vUnsendPublicCards);
        cv.StringTools.clearArray(this.vShowCardByStanderUID);
    }
}

/**
 * 牌局信息
 */
export class PokerInfoData {
    sRoomUUID: string = "";
    nCreateTime: number = 0;
    nTotalHand: number = 0;
    nSelfWinbet: number = 0;
    nMaxPot: number = 0;
    nInsurance_Winbet: number = 0;
    nJackpotWinbet: number = 0;
    nTotalBuyin: number = 0;
    nAllianceId: number = 0;

    sOwnerName: string = "";
    sAllianceName: string = "";
    sOwnerClubName: string = "";

    vClubs: Array<ClubInfo> = [];                               // 俱乐部信息数组
    vClubAdminids: Array<number> = [];                          // 管理员id数组
    vHandUUIDList: Array<string> = [];                          // 手牌UUID列表，通过手牌UUID查询每手牌的牌谱
    vBuyinList: Array<BuyInsData> = [];                         // 带入列表
    vAllinceResultInfos: Array<AllinceResultInfo> = [];         // 联盟信息数组

    tRoomParam: RoomParams = new RoomParams();

    /**
     * 重置初值
     */
    reset(): void {
        this.sRoomUUID = "";
        this.nCreateTime = 0;
        this.nTotalHand = 0;
        this.nSelfWinbet = 0;
        this.nMaxPot = 0;
        this.nInsurance_Winbet = 0;
        this.nJackpotWinbet = 0;
        this.nTotalBuyin = 0;
        this.nAllianceId = 0;
        this.sOwnerName = "";
        this.sAllianceName = "";
        this.sOwnerClubName = "";
        this.vClubs = [];
        this.vClubAdminids = [];
        this.vHandUUIDList = [];
        this.vBuyinList = [];
        this.vAllinceResultInfos = [];
        this.tRoomParam.reset();
    }

    /**
     * 获取带入信息
     * @param uid 玩家uid
     */
    getBuyInData(uid: number): BuyInsData {
        let tRet: BuyInsData = null;
        for (let i = 0; i < this.vBuyinList.length; ++i) {
            if (uid === this.vBuyinList[i].nUID) {
                tRet = this.vBuyinList[i];
                break;
            }
        }
        return tRet;
    }

    /**
     * 获取俱乐部信息
     * @param clubID 俱乐部id
     */
    getClubInfoByClubId(clubID: number): ClubInfo {
        let tRet: ClubInfo = null;
        for (let i = 0; i < this.vClubs.length; ++i) {
            if (clubID === this.vClubs[i].nClubId) {
                tRet = this.vClubs[i];
                break;
            }
        }
        return tRet;
    }

    /**
     * 获取俱乐部总带入
     * @param vUID uid数组
     */
    getClubTotalBuyin(vUID: [number]): number {
        let nRet: number = 0;
        for (let i = 0; i < vUID.length; ++i) {
            for (let j = 0; j < this.vBuyinList.length; ++j) {
                if (vUID[i] === this.vBuyinList[j].nUID) {
                    nRet += this.vBuyinList[j].nTotalBuyin;
                }
            }
        }
        return nRet;
    }

    /**
     *  获取俱乐部总赢注
     * @param vUID  uid数组
     */
    getClubTotalWinbet(vUID: [number]): number {
        let nRet: number = 0;
        for (let i = 0; i < vUID.length; ++i) {
            {
                for (let j = 0; j < this.vBuyinList.length; ++j) {
                    if (vUID[i] === this.vBuyinList[j].nUID) {
                        nRet += this.vBuyinList[j].nWinBet;
                    }
                }
            }
            return nRet;
        }
    }

    /**
     *  获取俱乐部Jackpot总赢注
     * @param vUID  uid数组
     */
    getClubTotalJackpotWinbet(vUID: [number]): number {
        let nRet: number = 0;
        for (let i = 0; i < vUID.length; ++i) {
            {
                for (let j = 0; j < this.vBuyinList.length; ++j) {
                    if (vUID[i] === this.vBuyinList[j].nUID) {
                        nRet += this.vBuyinList[j].nDrawin;
                    }
                }
            }
            return nRet;
        }
    }

    /**
     *  获取jackpot奖励给俱乐部总基金
     * @param vUID  uid数组
     */
    getAward2ClubFund(vUID: [number]): number {
        let nRet: number = 0;
        for (let i = 0; i < vUID.length; ++i) {
            {
                for (let j = 0; j < this.vBuyinList.length; ++j) {
                    if (vUID[i] === this.vBuyinList[j].nUID) {
                        nRet += this.vBuyinList[j].nAward2CludFund;
                    }
                }
            }
            return nRet;
        }
    }

    /**
     *  获取俱乐部总保险
     * @param vUID  uid数组
     */
    getClubTotalInsurance(vUID: [number]): number {
        let nRet: number = 0;
        for (let i = 0; i < vUID.length; ++i) {
            {
                for (let j = 0; j < this.vBuyinList.length; ++j) {
                    if (vUID[i] === this.vBuyinList[j].nUID) {
                        nRet += this.vBuyinList[j].nInsuraceWinbet - this.vBuyinList[j].nInsuranceBetAmount;
                    }
                }
            }
            return nRet;
        }
    }
}

/**
 * 战绩牌谱和俱乐部牌谱共用GameRecordsData 只有请求的havecout 独立
 */
export class GameRecordsData {
    nRecordsTexasCount: number = 0;                                 // 
    nRecordsAofCount: number = 0;                                   // 
    nRecordsBetCount: number = 0;                                   // 
    gameID: number = 0;                                             // 当前游戏ID
    tPokerHandData: PokerHandData = new PokerHandData();            // 手牌信息
    tPokerInfoData: PokerInfoData = new PokerInfoData();            // 当前查看的牌局信息
    mHandMapCache: HashMap<string, any> = new HashMap();            // 所有牌局缓存
    vRecordTexasList: RecordsData[] = [];                           // 
    vRecordAofList: RecordsData[] = [];                             // 
    vRecordBetList: RecordsData[] = [];                             // 

    /**
     * 重置初值
     */
    reset(): void {
        this.nRecordsTexasCount = 0;
        this.nRecordsAofCount = 0;
        this.nRecordsBetCount = 0;
        this.gameID = 0;
        this.tPokerHandData.reset();
        this.tPokerInfoData.reset();
        this.mHandMapCache.clear();
        cv.StringTools.clearArray(this.vRecordTexasList);
        cv.StringTools.clearArray(this.vRecordAofList);
        cv.StringTools.clearArray(this.vRecordBetList);
    }

    /**
     * 是否可查看联盟结算(只有管理员才有权限)
     */
    isCanSeeAllianceResult(uid: number): boolean {
        let retValue: boolean = false;
        if (this.tPokerInfoData.vClubs.length > 0) {
            for (let i = 0; i < this.tPokerInfoData.vClubAdminids.length; ++i) {
                if (uid === this.tPokerInfoData.vClubAdminids[i]) {
                    retValue = true;
                    break;
                }
            }
        }
        return retValue;
    }

    addRecordAofList(data: RecordsData): void {
        for (let i = 0; i < this.vRecordAofList.length; ++i) {
            if (data.sRoomUUID === this.vRecordAofList[i].sRoomUUID) return;
            this.vRecordAofList.push(data);
        }
    }

    addRecordTexasList(data: RecordsData): void {
        for (let i = 0; this.vRecordTexasList.length; ++i) {
            if (data.sRoomUUID === this.vRecordTexasList[i].sRoomUUID) return;
            this.vRecordTexasList.push(data);
        }
    }

    /**
     * json数据中是否存在该"uuid"数据段
     */
    hasJsonValue(uuid: string) {
        return this.mHandMapCache.has(uuid);
    }
}

/**
 * 单个收藏牌谱的信息
 */
export class CollectUUID {
    index: number = 0;
    uuid: string = "";
    addTime: number = 0;
    // gameid: number = 0;                                                             // 服务端强调该处"gameid"来源不可靠, 弃用, 这里说明下
};

/**
 * 精简版牌局信息(目前用于"个人牌局收藏"面板)
 */
export class SimpleGameReviewFavorite {
    isCheck: boolean = false;                                                           // 是否勾选
    toggle_type: number = 0;                                                            // 勾选类型
    game_uuid: string = "";                                                             // 牌局 uuid
    game_id: number = 0;                                                                // 游戏 id
    addTime: number = 0;                                                                // 插入时间
    game_mode: number = 0;                                                              // 游戏类型
    win_bet: number = 0;                                                                // 自己输赢
    player_id: number = 0;                                                              // 该局显示的玩家 uid
    send_card_len: number = 0;                                                          // 发发看长度
    last_round_type: number = 0;                                                        // 玩家坚持到哪一阶段(cv.Enum.BettingRoundType)
    vHandCards: Array<HandCardType> = [];                                               // 手牌数组
    vPublicCards: Array<HandCardType> = [];                                             // 已发共牌数组
    vUnsendPublicCards: Array<HandCardType> = [];                                       // 未发共牌数组
}

/**
 * 我的收藏牌谱集合
 */
export class CollectPokerMapData {
    totalCount: number = 0;                                                             // 服务端已收藏牌谱的总数量
    mUUIDCache: HashMap<string, CollectUUID> = new HashMap();                           // "uuid"缓存
    tPokerHandData: PokerHandData = new PokerHandData();                                // 手牌信息
    mHandMapCache: HashMap<string, any> = new HashMap();                                // 所有牌局缓存
    mSimpleHandMapCache: HashMap<string, SimpleGameReviewFavorite> = new HashMap();     // 精简版所有牌局缓存

    /**
     * 重置初值
     */
    reset(): void {
        this.totalCount = 0;
        this.mUUIDCache.clear();
        this.tPokerHandData.reset();
        this.mHandMapCache.clear();
        this.mSimpleHandMapCache.clear();
    }

    /**
     * json数据中是否存在该"uuid"数据段
     */
    hasJsonValue(uuid: string) {
        return this.mHandMapCache.has(uuid);
    }

    /**
     * 从所有缓存中删除指定"game_uuid"数据
     * @param game_uuid 
     */
    deteGameUUID(game_uuid: string): void {
        // 从"uuid列表"中删除
        let t: CollectUUID = this.mUUIDCache.remove(game_uuid);
        if (!t) return;

        // 总数量递减
        this.totalCount = Math.max(0, --this.totalCount);

        // 对应索引递减1
        this.mUUIDCache.forEach((k: string, v: CollectUUID): void => {
            if (v.index > t.index) {
                --v.index;
            }
        });

        // 从"所有牌局缓存"中删除
        this.mHandMapCache.remove(game_uuid);

        // 从"精简版所有牌局缓存"中删除
        this.mSimpleHandMapCache.remove(game_uuid);
    }

    /**
     * 通过指定索引获取"uuid"结构
     * @param index 
     */
    getUUIDByIndex(index: number): CollectUUID {
        let t: CollectUUID = null;
        this.mUUIDCache.forEach((k: string, v: CollectUUID): any => {
            if (index === v.index) {
                t = v;
                return "break";
            }
        });
        return t;
    }
}

/**
 * 牌局回顾 - 牌局状态枚举
 */
export enum GameReviewBettingRoundType {
    /**
     * 默认
     */
    Enum_BettingRound_None = 0,

    /**
     * 翻牌前
     */
    Enum_BettingRound_Preflop,

    /**
     * 翻牌
     */
    Enum_BettingRound_Flop,

    /**
     * turn 牌
     */
    Enum_BettingRound_Turn,

    /**
     * river 牌
     */
    Enum_BettingRound_River,

    /**
     * 河底
     */
    Enum_BettingRound_ShowDown,
}

/**
 * 牌局回顾 - item结构(与ui对应)
 */
export class GameReviewItemData {
    // 从"PokerHandData"结构中抽取
    nGameID: number = 0;                                        // 游戏id
    sGameUUID: string = "";                                     // 牌局uuid
    nGameMode: number = 0;                                      // 牌局模式
    objReplay: Object = null;                                   // 牌局回放数据串对象
    nShortFull: number = 0;                                     // 0: 花 > 葫芦, 1:葫芦 > 花
    vPubsCards: Array<HandCardType> = [];                       // 公共牌组
    vUnsendPublicCards: Array<HandCardType> = [];               // 未发出的公共牌堆

    // 从"PlayerRecord"结构中抽取
    nPlayerID: number = 0;                                      // id
    sPlayerName: string = "";                                   // 昵称
    sPlayerHead: string = "";                                   // 头像
    nWinBet: number = 0;                                        // 输赢的筹码数
    nInsuranceBet: number = 0;                                  // 投保额
    nInsuranceAmount: number = 0;                               // 赔付额
    nJackWinbet: number = 0;                                    // 一手牌赢的jackpot筹码数
    nPlayerBettingRoundBet: number = 0;                         // 本局下注的所有筹码总数
    bMuck: boolean = false;                                     // 是否自动埋牌
    bActiveShow: boolean = false;                               // 主动show
    bForceShowDown: boolean = false;                            // 是否强制show
    nLastRoundType: number = 0;                                 // 玩家坚持到哪一阶段(cv.Enum.BettingRoundType)
    vHandCards: Array<HandCardType> = [];                       // 手牌数组
    plat: number = 0;                                           // 
    seatNo: number = -1;                                        // 
    seatInfo: number = 0;                                       // 000=default, 001=D, 010=SB, 100=BB
    bFold: boolean = false;                                     // 是否弃牌
    nReviewSendOutLen: number = 0;                              // 发发看的长度(即该玩家额外能看到的长度)
    nReviewSendOutActLen: number = 0;                           // 牌局回顾"发发看"动画长度
    nForceShowedActLen: number = 0;                             // 被强制亮牌的长度(需要显示翻牌动画)
}