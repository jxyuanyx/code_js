import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import { InsuranceAllInItemData } from "./InsuranceAllInItem";
import { InsuranceOtherCardItemData } from "./InsuranceOtherCardItem";
import { InsurancePublicCardItemData } from "./InsurancePublicCardItem";

export namespace InsuranceData {
    /**
     * 保险类型模式
     */
    export enum InsuranceTypeMode {
        /**
         * 旧版本
         */
        TYPE_OLD = 0,

        /**
         * 新版本
         */
        TYPE_NEW
    }

    /**
     * 保险视图模式
     */
    export enum InsuranceViewMode {
        /**
         * 常规模式
         */
        VIEW_NORMAL = 0,

        /**
         * 回放模式
         */
        VIEW_REPLAY
    }

    /**
     * 投保额单选项枚举
     */
    export enum InsurancePayToggleIdx {
        /**
         * 1/3池((赔付额 == 1/3 可投保额))
         */
        E_IPT_IDX_ThirdPot = 0,

        /**
         * 1/2池
         */
        E_IPT_IDX_HalfPot,

        /**
         * 满池(赔付额 == 可投保额)
         */
        E_IPT_IDX_FullPot,

        /**
         * 1/8池
         */
        E_IPT_IDX_EighthPot,

        /**
         * 1/5池
         */
        E_IPT_IDX_FifthPot,

        /**
         * 保本(赔付额 == 投入额)
         */
        E_IPT_IDX_BreakEven,

        /**
         * 等利(赔付额 == 可投保额 - 投保额 * 赔率)
         */
        E_IPT_IDX_EqualInterest,
    }

    /**
     * 保险回放数据
     */
    export class InsuranceReplayData {
        insuranceMode: number = 0;                                                                          // 保险模式(0:旧, 1:新)
        isBuyInsurance: boolean = false;                                                                    // 是否购买了保险
        insuredAmounts: number = 0;                                                                         // 投保额
        insureWinBet: number = 0;                                                                           // 击中保险赔付额
        buyOutsID: number[] = [];                                                                           // 购买保险时所勾选的outs索引
        round: number = 0;                                                                                  // 当前轮数(2:转牌保险, 3:河牌保险)
        shot: boolean = false;                                                                              // 该轮是否"击中保险"
        option: number = 0;                                                                                 // 该轮"购买保险"勾选的投保方案
        insuranceData: game_pb.NoticeGameInsurance = null;                                                  // "保险"数据结构
        insurancePlayerInfo: any[] = [];                                                                    // "买保险"的玩家信息
    }

    /**
     * 保险数据
     */
    export class InsuranceData {
        private static _g_instance: InsuranceData = null;                                                   // 单例
        private _typeMode: InsuranceTypeMode = InsuranceTypeMode.TYPE_OLD;                                  // 保险类型模式(默认:旧版)
        private _viewMode: InsuranceViewMode = InsuranceViewMode.VIEW_NORMAL;                               // 保险视图模式(默认:常规)

        // 数据层(数据没多少, 就不单独开数据层文件了, 麻烦)
        private _data_Insurance: game_pb.NoticeGameInsurance = null;                                        // 保险数据
        private _data_InsuranceReplay: InsuranceReplayData = null;                                          // 保险回放数据
        private _data_vPlayerCards: InsuranceAllInItemData[] = [];                                          // all选手信息 数组
        private _data_vPublicCards: InsurancePublicCardItemData[] = [];                                     // 公共牌 数组
        private _data_vOtherCards: InsuranceOtherCardItemData[] = [];                                       // 其他玩家弃牌 数组
        private _data_vOutsCards: game_pb.OutItem[] = [];                                                   // outs 数组
        private _data_bMirco: boolean = false;                                                              // 是否微牌局: 0 否, 1 是
        private _data_bSelfBuy: boolean = false;                                                            // 是否是自己购买保险
        private _data_nGameid: number = 0;                                                                  // 游戏id

        /**
         * 获取单例
         */
        static getInstance(): InsuranceData {
            if (!InsuranceData._g_instance) {
                InsuranceData._g_instance = new InsuranceData();
            }
            return InsuranceData._g_instance;
        }

        /**
         * 设置保险视图模式(默认:常规)
         * @param viewMode 
         */
        setViewMode(viewMode: InsuranceViewMode): void {
            this._viewMode = viewMode;
        }

        /**
         * 设置保险类型模式(默认:旧版)
         * @param viewMode 
         */
        setTypeMode(typeMode: InsuranceTypeMode): void {
            this._typeMode = typeMode;
        }

        /**
         * 解析"保险"数据
         * @param gameid            游戏id
         * @param data              保险数据
         * @param bMirco            是否是微局
         * @param bSelf             自身是否是购买者
         */
        parseInsuranceData(gameid: number, data: game_pb.NoticeGameInsurance, bMirco: boolean): void {
            // 清空所有数据
            cv.StringTools.clearArray(this._data_vPublicCards);
            cv.StringTools.clearArray(this._data_vOutsCards);
            cv.StringTools.clearArray(this._data_vOtherCards);
            cv.StringTools.clearArray(this._data_vPlayerCards);

            // 填充保险数据
            this._data_Insurance = game_pb.NoticeGameInsurance.create(data);
            this._data_bMirco = bMirco;
            this._data_bSelfBuy = data.buyer_uid === cv.dataHandler.getUserData().u32Uid;
            this._data_nGameid = gameid;

            // 添加公共牌数据(浅拷贝)
            for (let i = 0; i < data.public_cards.length; ++i) {
                let t: InsurancePublicCardItemData = new InsurancePublicCardItemData();
                t.gameid = gameid;
                t.data = game_pb.CardItem.create(data.public_cards[i]);
                this._data_vPublicCards.push(t);
            }

            // 添加 outs 牌数据
            for (let i = 0; i < data.outs.length; ++i) {
                this._data_vOutsCards.push(game_pb.OutItem.create(data.outs[i]));
            }

            // outs 排序
            this._data_vOutsCards.sort((a: game_pb.OutItem, b: game_pb.OutItem): number => {
                if (a.card.number > b.card.number) return -1;
                else if (a.card.number < b.card.number) return 1;
                else return b.card.suit - a.card.suit;
            });

            // 添加其他玩家弃牌数据
            for (let i = 0; i < data.foldCards.length; ++i) {
                let t: InsuranceOtherCardItemData = new InsuranceOtherCardItemData();
                t.gameid = gameid;
                t.data = game_pb.FoldItem.create(data.foldCards[i]);
                this._data_vOtherCards.push(t);
            }

            // 弃牌排序
            this._data_vOtherCards.sort((a: InsuranceOtherCardItemData, b: InsuranceOtherCardItemData): number => {
                // 两者 outs 类型相同(同为 outs | 同为非 outs)
                if (a.data.inOuts === b.data.inOuts) {
                    // 牌值从大到小(牌值相同, 按花色(♠️♥️♣️♦️))
                    if (a.data.card.number > b.data.card.number) return -1;
                    else if (a.data.card.number < b.data.card.number) return 1;
                    else return b.data.card.suit - a.data.card.suit;
                }
                // 两者 outs 类型不相同, 则为 outs 者优先
                else {
                    let na: number = cv.Number(a.data.inOuts);
                    let nb: number = cv.Number(b.data.inOuts);
                    return nb - na;
                }
            })
        }

        /**
         * 解析"保险回放"数据
         * @param gameid            游戏id
         * @param data              保险回放数据
         * @param bMirco            是否是微局
         */
        parseInsuranceReplayData(gameid: number, data: any, bMirco: boolean): void {
            try {
                this._data_InsuranceReplay = new InsuranceReplayData();
                this._data_InsuranceReplay.shot = data["Shot"];
                this._data_InsuranceReplay.option = data["Option"];
                this._data_InsuranceReplay.round = cv.Number(data["Round"]);
                this._data_InsuranceReplay.isBuyInsurance = data["Isbuyinsurance"];
                this._data_InsuranceReplay.insuredAmounts = cv.Number(data["Amounts"]);
                this._data_InsuranceReplay.insureWinBet = cv.Number(data["InsureWinBet"]);
                this._data_InsuranceReplay.insuranceMode = cv.Number(data["InsuranceMode"]);
                this._data_InsuranceReplay.insurancePlayerInfo = data["BoughtInsurancePlayerInfo"];
                if (this._data_InsuranceReplay.isBuyInsurance) {
                    this._data_InsuranceReplay.buyOutsID = data["BuyOutsId"];
                }

                let insuranceData: game_pb.NoticeGameInsurance = game_pb.NoticeGameInsurance.fromObject(data["IncuranceInfo"]);
                this._data_InsuranceReplay.insuranceData = insuranceData;

                // 解析"保险"数据结构
                this.parseInsuranceData(gameid, insuranceData, bMirco);
            }
            catch (error) {
                this._data_InsuranceReplay = null;
                console.error("parseInsuranceReplayData error: " + error);
            }
        }

        /**
         * 添加 allin 玩家牌数据(浅拷贝)
         * @param nUID 
         * @param sPlayerName 
         * @param nOutsNum 
         * @param vCards 
         * @param bPurchaser 
         */
        addPlayerCardsData(nUID: number, sPlayerName: string, nOutsNum: number, vCards: game_pb.CardItem[], bPurchaser: boolean): void {
            let data: InsuranceAllInItemData = new InsuranceAllInItemData();
            data.nUID = nUID;
            data.nOutsNum = nOutsNum;
            data.bPurchaser = bPurchaser;
            data.sPlayerName = sPlayerName;
            data.nGameID = this._data_nGameid;
            data.vCards = vCards.slice(0, vCards.length);
            this._data_vPlayerCards.push(data);
        }

        /**
         * 获取保险视图模式(默认:常规)
         */
        getViewMode(): InsuranceViewMode {
            return this._viewMode;
        }

        /**
         * 获取保险类型模式
         */
        getTypeMode(): InsuranceTypeMode {
            return this._typeMode;
        }

        /**
        * 获取"保险数据"
        */
        getDataInsurance(): Readonly<game_pb.NoticeGameInsurance> {
            return this._data_Insurance;
        }

        /**
         * 获取"保险回放数据"
         */
        getDataInsuranceReplay(): Readonly<InsuranceReplayData> {
            return this._data_InsuranceReplay;
        }

        /**
         * 获取"公共牌数组"
         */
        getDataPublicCards(): Readonly<InsurancePublicCardItemData[]> {
            return this._data_vPublicCards;
        }

        /**
         * 获取"outs 数组"
         */
        getDataOutsCards(): Readonly<game_pb.OutItem[]> {
            return this._data_vOutsCards;
        }

        /**
         * 获取"其他玩家弃牌数组"
         */
        getDataOtherCards(): Readonly<InsuranceOtherCardItemData[]> {
            return this._data_vOtherCards;
        }

        /**
         * 获取"allin选手信息数组"
         */
        getDataPlayerCards(): Readonly<InsuranceAllInItemData[]> {
            return this._data_vPlayerCards;
        }

        /**
         * 是否微牌局: 0 否, 1 是
         */
        getDataIsMirco(): Readonly<boolean> {
            return this._data_bMirco;
        }

        /**
         * 是否是自己购买保险
         */
        getDataIsSelfBuy(): Readonly<boolean> {
            return this._data_bSelfBuy;
        }

        /**
         * 获取游戏id
         */
        getDataGameID(): Readonly<number> {
            return this._data_nGameid;
        }
    }
}
