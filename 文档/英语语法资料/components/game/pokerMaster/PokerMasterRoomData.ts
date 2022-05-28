import pb_pokermaster = require("../../../../Script/common/pb/pokermaster");
import pokermaster_proto = pb_pokermaster.pokermaster_proto;

import cv from "../../lobby/cv";
import { HashMap } from "../../../common/tools/HashMap";

/**
 * 区域结构
 */
export class PokerMasterZoneData {
    option: pokermaster_proto.BetZoneOption = pokermaster_proto.BetZoneOption.BetZoneOption_DUMMY;                      // 该区域对应枚举
    result: number = 0;																			                        // 该区域输赢(1 赢 0 输)
    totalBet: number = 0;																		                        // 该区域总下注
    selfBet: number = 0;																		                        // 该区域自己下注
    odds: number = 0;                                                                                                   // 该区域赔率
    limitBet: number = 0;                                                                                               // 该区域下注限红
    maxHistoryResultsRetention: number = 30;														                    // 该区域最大保留的历史记录数量
    luckLoseHand: number = 0;																	                        // 该区域连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
    vTotalBetDetail: number[] = [];                                                                                     // 该区域总下注详情
    vHistoryResults: number[] = [];													                                    // 该区域最近的胜负记录

    reset(clearCache: boolean): void {
        this.result = 0;
        this.totalBet = 0;
        this.selfBet = 0;
        this.odds = 0;
        this.limitBet = 0;
        this.option = pokermaster_proto.BetZoneOption.BetZoneOption_DUMMY;
        cv.StringTools.clearArray(this.vTotalBetDetail);

        if (clearCache) {
            this.luckLoseHand = 0;
            cv.StringTools.clearArray(this.vHistoryResults);
        }
    }
}

/**
 * 房间结构
 */
export class PokerMasterRoomData {
    u32Uid: number = 0;																					                // 自己的uid
    u32RoomId: number = 0;																				                // 房间id
    nStopWorld: number = 0;																				                // 非0代表系统即将维护
    bCanAuto: boolean = false;																			                // 是否可续投
    bHasBetInCurRound: boolean = false;																	                // 当前一局后是否下过注
    bCanUpdateWorldServerGold: boolean = true;															                // 是否可更新world服最新金币
    sBackToMainTips: string = "";																		                // 退出到大厅后弹出的提示内容
    tCurRoom: pokermaster_proto.RoomParam = pokermaster_proto.RoomParam.create();                                       // 当前加入的房间信息
    eCurState: pokermaster_proto.RoundState = pokermaster_proto.RoundState.RoundState_DUMMY;				            // 当前状态
    llLeftSeconds: number = 0;																		                    // 下个状态的截止时间(s)
    llNextRoundEndStamp: number = 0;																	                // 下一个状态的截止时间戳

    llCoinUICritical: number = 0;																				        // 显示金币还是显示金砖的临界值
    iUsedAutoBetCount: number = 0;																				        // 已经使用的续投次数
    iSelectAutoBetCount: number = 0;																			        // 选择的高级续投次数
    bCanAdvanceAuto: boolean = false;																				    // 是否可高级续投(避免同一局多次重连导致多次自动续投)
    eAutoLevel: pokermaster_proto.AutoBetLevel = pokermaster_proto.AutoBetLevel.Level_Normal;					        // 续投等级 1 高级  0 普通
    vAutoBetCountList: number[] = [];																		            // 配置的续投档次列表
    vBetCoinOption: number[] = [];																		                // 对应房间级别的下注金额选项(高级设置当前勾选的)

    tSelfPlayer: pokermaster_proto.GamePlayer = pokermaster_proto.GamePlayer.create();                                  // 玩家自己
    vOtherPlayer: pokermaster_proto.GamePlayer[] = [];														            // 其他玩家
    vLeftHandCards: pokermaster_proto.CardItem[] = [];												                    // 左手牌
    vRightHandCards: pokermaster_proto.CardItem[] = [];												                    // 右手牌
    vPublicHoleCards: pokermaster_proto.CardItem[] = [];												                // 公共牌
    vPlayerSettles: pokermaster_proto.PlayerSettle[] = [];													            // 主界面玩家列表中玩家输赢
    tOtherPlayerSettle: pokermaster_proto.PlayerSettle = pokermaster_proto.PlayerSettle.create();                       // 主界面玩家列表外其他玩家输赢
    tRoundresult: pokermaster_proto.RoundResult = pokermaster_proto.RoundResult.create();                               // 一局结果

    uWhoIsLeader: number = 0;                                                                                           // 谁领先 0 : 平, > 0 : 渔夫, < 0 : 鲨鱼
    fLeftFortune: number = 0;                                                                                           // 左边运势值
    fRightFortune: number = 0;                                                                                          // 右边运势值
    nSkipInsureCode: pokermaster_proto.ErrorCode = pokermaster_proto.ErrorCode.ErrorCode_DUMMY;                         // 跳过保险投注错误码
    bCanSquint: boolean = false;                                                                                        // 是否可以眯牌
    bSkipSquint: boolean = false;                                                                                       // 是否跳过眯牌
    vLastResult: pokermaster_proto.BetZoneOption[] = [];                                                                // "顶栏"胜负记录
    nMaxLastResultRetention: number = 20;                                                                               // "顶栏"胜负记录最大保留数量
    mapZoneData: HashMap<pokermaster_proto.BetZoneOption, PokerMasterZoneData> = new HashMap();                         // 区域数据容器(若要清除数据请调用 clearMapZoneData 接口)

    vTrendData: pokermaster_proto.TrendData[] = [];
    vTrendRoad: pokermaster_proto.TrendRoad[] = [];
    vBetReview: pokermaster_proto.BetReview[] = [];
    tFortune: pokermaster_proto.PlayerFortune = pokermaster_proto.PlayerFortune.create();
    iLastRow: number = 0;
    iLastCol: number = 0;

    brdzplayerNum: number = 0;																					        // 在线玩家人数

    lastResult: number[] = [];																	                        // 20个输赢记录
    gamePlayerList: pokermaster_proto.GamePlayer[] = [];

    fisherLevel: number = 0; // 渔夫牌型
    sharkLevel: number = 0; // 鲨鱼牌型
    sharkOuts: pokermaster_proto.OutItem[] = [];
    dashiOuts: pokermaster_proto.OutItem[] = [];
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
        this.bCanAuto = false;
        this.bHasBetInCurRound = false;
        this.bCanUpdateWorldServerGold = false;
        this.sBackToMainTips = "";
        this.tCurRoom = pokermaster_proto.RoomParam.create();
        this.eCurState = pokermaster_proto.RoundState.RoundState_DUMMY;
        this.llLeftSeconds = 0;
        this.llNextRoundEndStamp = 0;

        this.llCoinUICritical = 0;
        this.iUsedAutoBetCount = 0;
        this.iSelectAutoBetCount = 0;
        this.bCanAdvanceAuto = false;
        this.eAutoLevel = pokermaster_proto.AutoBetLevel.Level_Normal;

        cv.StringTools.clearArray(this.vAutoBetCountList);
        cv.StringTools.clearArray(this.vBetCoinOption);

        this.tSelfPlayer = pokermaster_proto.GamePlayer.create();
        this.tOtherPlayerSettle = pokermaster_proto.PlayerSettle.create();
        this.tRoundresult = pokermaster_proto.RoundResult.create();

        cv.StringTools.clearArray(this.vOtherPlayer);
        cv.StringTools.clearArray(this.vLeftHandCards);
        cv.StringTools.clearArray(this.vRightHandCards);
        cv.StringTools.clearArray(this.vPublicHoleCards);
        cv.StringTools.clearArray(this.vPlayerSettles);

        this.uWhoIsLeader = 0;
        this.fLeftFortune = 0;
        this.fRightFortune = 0;
        this.nSkipInsureCode = pokermaster_proto.ErrorCode.ErrorCode_DUMMY;
        this.bCanSquint = false;
        this.bSkipSquint = false;

        cv.StringTools.clearArray(this.vLastResult);
        cv.StringTools.clearArray(this.vTrendData);
        cv.StringTools.clearArray(this.vTrendRoad);
        cv.StringTools.clearArray(this.vBetReview);
        this.tFortune = pokermaster_proto.PlayerFortune.create();

        this.iLastRow = 0;
        this.iLastCol = 0;
        this.brdzplayerNum = 0;
        this.fisherLevel = 0;
        this.sharkLevel = 0;

        cv.StringTools.clearArray(this.gamePlayerList);
        cv.StringTools.clearArray(this.lastResult);

        this.clearMapZoneData(true);
        cv.StringTools.clearArray(this.sharkOuts);
        cv.StringTools.clearArray(this.dashiOuts);
        this.change_points = 0;
    }

    /**
     * 每局开始数据清理
     */
    resetRound(): void {
        this.bHasBetInCurRound = false;
        this.bCanUpdateWorldServerGold = false;

        this.eCurState = pokermaster_proto.RoundState.RoundState_DUMMY;
        this.llLeftSeconds = 0;
        this.llNextRoundEndStamp = 0;

        this.tOtherPlayerSettle = pokermaster_proto.PlayerSettle.create();
        this.tRoundresult = pokermaster_proto.RoundResult.create();

        cv.StringTools.clearArray(this.vLeftHandCards);
        cv.StringTools.clearArray(this.vRightHandCards);
        cv.StringTools.clearArray(this.vPublicHoleCards);
        cv.StringTools.clearArray(this.vPlayerSettles);

        this.uWhoIsLeader = 0;
        this.nSkipInsureCode = pokermaster_proto.ErrorCode.ErrorCode_DUMMY;
        this.bCanSquint = false;
        this.bSkipSquint = false;
        this.fisherLevel = 0;
        this.sharkLevel = 0;

        this.clearMapZoneData(false);
        cv.StringTools.clearArray(this.sharkOuts);
        cv.StringTools.clearArray(this.dashiOuts);
        this.change_points = 0;
    }

    /**
     * 清除区域数据
     * @param bCleanAll 
     */
    clearMapZoneData(clearCache: boolean): void {
        this.mapZoneData.forEach((k: pokermaster_proto.BetZoneOption, v: PokerMasterZoneData) => {
            v.reset(clearCache);
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

        // 自动运算, 去除格式化 "%.f" 自动四舍五入------9.95会变成9.94
        // fValue = Math.floor(fValue * Math.pow(10, precision)) / Math.pow(10, precision);

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
            let t: pokermaster_proto.PlayerSettle = this.vPlayerSettles[i];
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
    updateAreaBet(data: pokermaster_proto.BetNotify): void {
        let option: pokermaster_proto.BetZoneOption = data.detail.option;

        if (!this.mapZoneData.has(option)) {
            this.mapZoneData.add(option, new PokerMasterZoneData());
        }

        // 自己的下注
        if (data.uid === this.u32Uid) {
            this.mapZoneData.get(option).selfBet = data.selfBet;
        }

        // 总共的下注
        this.mapZoneData.get(option).totalBet = data.totalBet;
    }

    /**
     * 获取其他玩家结构
     */
    getOtherPlayerByUid(uid: number): pokermaster_proto.GamePlayer {
        let tRet: pokermaster_proto.GamePlayer = null;
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
}
