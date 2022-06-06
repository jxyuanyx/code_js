import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import cv from "../../lobby/cv";
import { HashMap } from "../../../common/tools/HashMap";
import { PlayerOneBet } from "../cowboy/CowboyRoomData";

// 百人德州 区域结构
export class HumanboyZoneData {
    result: number = 0;																			                        // 该区域输赢(= 0 平, > 0 庄家赢, < 0 闲家赢)
    luckLoseHand: number = 0;																	                        // 幸运一击区, 连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
    totalBet: number = 0;																		                        // 该区域总下注
    selfBet: number = 0;																		                        // 该区域自己下注
    maxHistoryResultsRetention: number = 0;														                        // 最大保留的历史记录数量
    option: humanboy_proto.BetZoneOption = humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;                            // 该区域对应枚举
    vTotalBetDetail: number[] = [];                                                                                     // 该区域总下注详情
    vHistoryResults: number[] = [];													                                    // 该区域最近的胜负记录

    constructor() {
        this.reset(true);
    }

    reset(bCleanAll: boolean): void {
        this.result = 0;
        this.totalBet = 0;
        this.selfBet = 0;
        this.maxHistoryResultsRetention = 30;
        this.option = humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;
        cv.StringTools.clearArray(this.vTotalBetDetail);
        if (bCleanAll) {
            this.luckLoseHand = 0;
            cv.StringTools.clearArray(this.vHistoryResults);
        }
    }
}

// 百人德州 房间结构
export class HumanboyRoomData {
    u32Uid: number = 0;																					                // 自己的uid
    u32RoomId: number = 0;																				                // 房间id
    nStopWorld: number = 0;																				                // 非0代表系统即将维护
    uCanBuyStockNum: number = 0;																		                // 当前申请上庄时可购买的股份
    uDealerWinAll: number = 0;																			                // 1 代表庄家完胜  2 代表庄家玩败
    udeskType: number = 0;																				                // 桌子类型
    uTotalStockNum: number = 0;																			                // 总股数上限
    llJackpotLeftMoney: number = 0;																		                // 剩余的jackpot
    bCanAuto: boolean = false;																			                // 是否可续投
    bHasBetInCurRound: boolean = false;																	                // 当前一局后是否下过注
    bOnDealerList: boolean = false;																		                // 自己是否在庄家列表里(及时更新的字段)
    bShowDealerInvitation: boolean = false;																                // 是否显示上庄邀请按钮
    bCanUpdateWorldServerGold: boolean = true;															                // 是否可更新world服最新金币
    sBackToMainTips: string = "";																		                // 退出到大厅后弹出的提示内容
    tCurRoom: humanboy_proto.RoomParam = humanboy_proto.RoomParam.create();                                             // 当前加入的房间信息
    eCurState: humanboy_proto.RoundState = humanboy_proto.RoundState.RoundState_DUMMY;				                    // 当前状态
    eMaxLevel: humanboy_proto.CardResult = humanboy_proto.CardResult.CardResult_Dummy;				                    // 闲庄最大牌型
    eMaxLevelOption: humanboy_proto.BetZoneOption = humanboy_proto.BetZoneOption.BetZoneOption_DUMMY;	                // 最大牌型所在的区域
    llLeftSeconds: number = 0;																		                    // 下个状态的截止时间(s)
    llNextRoundEndStamp: number = 0;																	                // 下一个状态的截止时间戳

    mapZoneData: HashMap<humanboy_proto.BetZoneOption, HumanboyZoneData> = new HashMap();                               // 区域数据容器(若要清除数据请调用 clearMapZoneData 接口)
    mapPlayerBeforeSettlementCoin: HashMap<number, number> = new HashMap();                                             // 玩家结算前的金币容器

    llCoinUICritical: number = 0;																				        // 显示金币还是显示金砖的临界值
    iUsedAutoBetCount: number = 0;																				        // 已经使用的续投次数
    iSelectAutoBetCount: number = 0;																			        // 选择的高级续投次数
    bCanAdvanceAuto: boolean = false;																				    // 是否可高级续投(避免同一局多次重连导致多次自动续投)
    eAutoLevel: humanboy_proto.AutoBetLevel = humanboy_proto.AutoBetLevel.Level_Normal;						            // 续投等级 1 高级  0 普通
    vAutoBetCountList: number[] = [];																		            // 配置的续投档次列表
    vBetCoinOption: number[] = [];																		                // 对应房间级别的下注金额选项(高级设置当前勾选的)

    vDealerInfo: humanboy_proto.DealerPlayerInfo[] = [];												                // 首庄家们的信息(uid: 0表示系统庄, 1表示选庄中，其他表示玩家庄, 此结构只用于更新主面板庄家信息, 判断自己是否是庄家请使用 bSelfDealer)
    tSelfPlayer: humanboy_proto.GamePlayer = humanboy_proto.GamePlayer.create();                                        // 玩家自己
    vOtherPlayer: humanboy_proto.GamePlayer[] = [];														                // 其他玩家
    vPlayerHoleCard: humanboy_proto.PlayerHoleCard[] = [];												                // 玩家牌数组
    vPlayerSettles: humanboy_proto.PlayerSettle[] = [];													                // 每个区域的输赢
    tOtherPlayerSettle: humanboy_proto.PlayerSettle = humanboy_proto.PlayerSettle.create();                             // 除主界面8个人输赢外其它玩家列表的输赢
    tCurPlayerOneBet: PlayerOneBet = new PlayerOneBet();                                                                // 当前下注信息
    vHitJackpotAward: humanboy_proto.HitJackpotAward[] = [];                                                            // 一手结束的jackpot推送数据

    vDealerWatingList: humanboy_proto.DealerPlayerInfo[] = [];											                // 申请上庄等待列表
    vDealerCandidateList: humanboy_proto.DealerPlayerInfo[] = [];                                                       // 上庄候选列表
    tDownDealerResp: humanboy_proto.DownDealerResp = humanboy_proto.DownDealerResp.create();                            // 主动下庄通知
    tDownDealerNotify: humanboy_proto.DownDealerNotify = humanboy_proto.DownDealerNotify.create();                      // 被动下庄通知

    TrendOption: humanboy_proto.RoomTrendOption[] = [];									                                // 区域路段和局数统计
    handLevelStatistics: humanboy_proto.RoomTrendLevelStatistics = humanboy_proto.RoomTrendLevelStatistics.create();    // 牌型统计
    lastResult: number[] = [];																	                        // 20个输赢记录
    brdzplayerNum: number = 0;																					        // 在线玩家人数
    gamePlayerList: humanboy_proto.GamePlayer[] = [];															        // 
    jackpotData: humanboy_proto.JackpotDataInfo = humanboy_proto.JackpotDataInfo.create();                              // Jackpot

    luckyOne: humanboy_proto.AwardData = humanboy_proto.AwardData.create();                                             // 中奖最多的人
    lastAwardData: humanboy_proto.AwardData[] = [];														                // 最近中奖的12个人
    change_points: number = 0;
    idle_roomid: number = 0;
    /**
     *  构造重置
     */
    reset(): void {
        this.u32Uid = 0;
        this.u32RoomId = 0;
        this.nStopWorld = 0;
        this.idle_roomid = 0;
        this.uCanBuyStockNum = 0;
        this.uDealerWinAll = 0;
        this.udeskType = 0;
        this.uTotalStockNum = 0;
        this.llJackpotLeftMoney = 0;
        this.bCanAuto = false;
        this.bHasBetInCurRound = false;
        this.bOnDealerList = false;
        this.bShowDealerInvitation = false;
        this.bCanUpdateWorldServerGold = true;
        this.sBackToMainTips = "";
        this.tCurRoom = humanboy_proto.RoomParam.create();
        this.eCurState = humanboy_proto.RoundState.RoundState_DUMMY;
        this.eMaxLevel = humanboy_proto.CardResult.CardResult_Dummy;
        this.llLeftSeconds = 0;
        this.llNextRoundEndStamp = 0;

        this.llCoinUICritical = 0;
        this.iUsedAutoBetCount = 0;
        this.iSelectAutoBetCount = 0;
        this.eAutoLevel = humanboy_proto.AutoBetLevel.Level_Normal;
        cv.StringTools.clearArray(this.vAutoBetCountList);
        cv.StringTools.clearArray(this.vBetCoinOption);

        this.tCurPlayerOneBet.reset();
        this.mapPlayerBeforeSettlementCoin.clear();
        this.tSelfPlayer = humanboy_proto.GamePlayer.create();
        this.tOtherPlayerSettle = humanboy_proto.PlayerSettle.create();
        this.tDownDealerNotify = humanboy_proto.DownDealerNotify.create();

        cv.StringTools.clearArray(this.vDealerInfo);
        cv.StringTools.clearArray(this.vOtherPlayer);
        cv.StringTools.clearArray(this.vPlayerHoleCard);
        cv.StringTools.clearArray(this.vPlayerSettles);
        cv.StringTools.clearArray(this.vHitJackpotAward);
        cv.StringTools.clearArray(this.vDealerWatingList);
        cv.StringTools.clearArray(this.vDealerCandidateList);
        cv.StringTools.clearArray(this.lastAwardData);

        this.brdzplayerNum = 0;
        this.luckyOne = humanboy_proto.AwardData.create();

        cv.StringTools.clearArray(this.gamePlayerList);
        cv.StringTools.clearArray(this.lastResult);
        cv.StringTools.clearArray(this.lastAwardData);

        this.clearMapZoneData(false);
        this.change_points = 0;
    }

    /**
     * 每局开始数据清理
     */
    resetRound(): void {
        this.uDealerWinAll = 0;
        this.bHasBetInCurRound = false;
        this.bShowDealerInvitation = false;
        this.eCurState = humanboy_proto.RoundState.RoundState_DUMMY;
        this.eMaxLevel = humanboy_proto.CardResult.CardResult_Dummy;
        this.llLeftSeconds = 0;
        this.llNextRoundEndStamp = 0;
        this.tCurPlayerOneBet.reset();

        this.tOtherPlayerSettle = humanboy_proto.PlayerSettle.create();
        this.tDownDealerResp = humanboy_proto.DownDealerResp.create();
        this.tDownDealerNotify = humanboy_proto.DownDealerNotify.create();

        cv.StringTools.clearArray(this.vPlayerHoleCard);
        cv.StringTools.clearArray(this.vPlayerSettles);
        cv.StringTools.clearArray(this.vHitJackpotAward);

        this.clearMapZoneData(false);
        this.change_points = 0;
    }

    /**
     * 清除区域数据
     * @param bCleanAll 
     */
    clearMapZoneData(bCleanAll: boolean): void {
        this.mapZoneData.forEach((k: humanboy_proto.BetZoneOption, v: HumanboyZoneData) => {
            v.reset(bCleanAll);
        });
    }

    /**
     * 转换指定数值为字符串
     * @param num           数值
     * @param precision     精确度
     * @param sign          符号
     */
    transNumberToString(num: number, precision = 2, sign = false): string {
        let fValue: number = cv.StringTools.serverGoldToShowNumber(num);

        // 自动运算, 去除格式化 "%.f" 自动四舍五入
        fValue = Math.floor(fValue * Math.pow(10, precision)) / Math.pow(10, precision);

        let str_sign: string = "";
        if (sign) str_sign = fValue >= 0 ? "+" : "";

        let format: string = "%s%" + cv.StringTools.formatC(".%df", precision);
        let strValue: string = cv.StringTools.formatC(format, str_sign, fValue);

        let count: number = 0;
        let index: number = strValue.indexOf('.');

        for (let i = strValue.length - 1; index > 0 && i >= index; --i) {
            if (strValue[i] == '0' || strValue[i] == '.') ++count;
            else break;
        }

        return strValue.substr(0, strValue.length - count);
    }

    /**
     * 转化获取指定金额(超过 10 的 exp 次幂, 显示 xxx 万, 百万, 十亿)
     * @param gold          数值
     * @param exp           底数为10的指数
     */
    transGoldShortString(gold: number, exp = 4): string {
        let retValue: string = "";
        let bNegative: boolean = false;

        if (gold < 0) {
            bNegative = true;
            gold = -gold;
        }

        let formatCoin: number = cv.StringTools.serverGoldToShowNumber(gold);
        let fMillion = Math.pow(10, 6);
        let fBillion = Math.pow(10, 9);
        let fTenThousand = Math.pow(10, 4);

        if (formatCoin >= Math.pow(10, exp)) {
            // 100亿
            if (formatCoin >= 10 * fBillion) {
                retValue = this.transNumberToString(gold / fBillion) + cv.config.getStringData("Humanboy_game_gold_short_suffix_billion");
            }
            // 亿
            else if (formatCoin >= 100 * fMillion) {
                retValue = this.transNumberToString(gold / fMillion) + cv.config.getStringData("Humanboy_game_gold_short_suffix_million");
            }
            // 万
            else if (formatCoin >= fTenThousand) {
                retValue = this.transNumberToString(gold / fTenThousand) + cv.config.getStringData("Humanboy_game_gold_short_suffix_w");
            }
            else {
                retValue = this.transNumberToString(gold);
            }
        }
        else {
            retValue = this.transNumberToString(gold);
        }

        if (bNegative) {
            retValue = "-" + retValue;
        }

        return retValue;
    }

    /**
     * 更新单据结束连赢情况和金币数量
     */
    updatePlayerSettleKeepWinCountAndCoin(): void {
        for (let i = 0; i < this.vPlayerSettles.length; ++i) {
            let t: humanboy_proto.PlayerSettle = this.vPlayerSettles[i];
            if (t.uid == this.tSelfPlayer.uid) {
                this.tSelfPlayer.curCoin = t.curCoin;
                this.tSelfPlayer.keepWinCount = t.keepWinCount;
            }

            this.vOtherPlayer.forEach(it => {
                if (t.uid == it.uid) {
                    it.curCoin = t.curCoin;
                    it.keepWinCount = t.keepWinCount;
                }
            });
        }
    }

    /**
     * 更新玩家金币
     * @param uid 
     * @param coin 
     */
    updatePlayerCoin(uid: number, coin: number): void {
        if (uid == this.u32Uid) {
            this.tSelfPlayer.curCoin = coin;
        }
        else {
            for (let i = 0; i < this.vOtherPlayer.length; ++i) {
                if (this.vOtherPlayer[i].uid === uid) {
                    this.vOtherPlayer[i].curCoin = coin;
                    break;
                }
            }
        }
    }

    /**
      * 更新某个选项的下注信息
      * @param data 
      */
    updateAreaBet(data: humanboy_proto.BetNotify): void {
        let option: humanboy_proto.BetZoneOption = data.detail.option;

        if (!this.mapZoneData.has(option)) {
            this.mapZoneData.add(option, new HumanboyZoneData());
        }

        // 自己的下注
        if (data.uid === this.u32Uid) {
            this.mapZoneData.get(option).selfBet = data.selfBet;
        }

        // 总共的下注
        this.mapZoneData.get(option).totalBet = data.totalBet;
    }

    /**
     * 设置当前下注
     * @param uid 
     * @param detail 
     */
    setCurOneBet(uid: number, detail: humanboy_proto.BetDetail): void {
        this.tCurPlayerOneBet.uid = uid;
        this.tCurPlayerOneBet.betOption = detail.option;
        this.tCurPlayerOneBet.betAmount = detail.betAmount;
    }

    /**
     * 获取其他玩家结构
     */
    getOtherPlayerByUid(uid: number): humanboy_proto.GamePlayer {
        let tRet: humanboy_proto.GamePlayer = null;
        for (let i = 0; i < this.vOtherPlayer.length; ++i) {
            if (this.vOtherPlayer[i].uid === uid) {
                tRet = this.vOtherPlayer[i];
                break;
            }
        }
        return tRet;
    }

    /**
     * 获取指定玩家连胜次数
     * @param SEUInt32 
     * @param uid 
     */
    getPlayerKeepWinCountByUid(uid: number): number {
        let nRet: number = 0;

        if (this.tSelfPlayer.uid === uid) {
            nRet = this.tSelfPlayer.keepWinCount;
        }
        else {
            for (let i = 0; i < this.vOtherPlayer.length; ++i) {
                if (this.vOtherPlayer[i].uid === uid) {
                    nRet = this.vOtherPlayer[i].keepWinCount;
                    break;
                }
            }
        }

        return nRet;
    }

    /**
     * 判断指定玩家是否在申请列表中
     */
    isInDealerWatingList(uid: number): boolean {
        let bRet: boolean = false;
        for (let i = 0; i < this.vDealerWatingList.length; ++i) {
            if (this.vDealerWatingList[i].uid === uid) {
                bRet = true;
                break;
            }
        }
        return bRet;
    }

    /**
     * 判断指定玩家是否在上庄列表中
     * @param uid 
     */
    isInDealerCandidateList(uid: number): boolean {
        let bRet: boolean = false;
        for (let i = 0; i < this.vDealerCandidateList.length; ++i) {
            if (this.vDealerCandidateList[i].uid === uid) {
                bRet = true;
                break;
            }
        }
        return bRet;
    }

    /**
     * 获取指定玩家uid的庄家结构信息(前提是该uid必须在庄家列表中)
     * @param uid 
     */
    getDealerInfoByUid(uid: number): humanboy_proto.DealerPlayerInfo {
        let tRet: humanboy_proto.DealerPlayerInfo = null;
        for (let i = 0; i < this.vDealerCandidateList.length; ++i) {
            if (this.vDealerCandidateList[i].uid === uid) {
                tRet = this.vDealerCandidateList[i];
                break;
            }
        }
        return tRet;
    }

    /**
     * 获取玩家结算前的总金币
     * @param uid 
     */
    getPlayerBeforeSettlementGold(uid: number): number {
        let amount: number = 0;
        if (this.mapPlayerBeforeSettlementCoin.has(uid)) {
            amount = this.mapPlayerBeforeSettlementCoin.get(uid);
        }
        return amount;
    }

    /**
     * 设置玩家结算前的总金币
     * @param SEUInt32 
     * @param uid 
     * @param SEInt64 
     * @param amount 
     */
    setPlayerBeforeSettlementGold(uid: number, amount: number): void {
        this.mapPlayerBeforeSettlementCoin.add(uid, amount, true);
    }
}
