import cv from "../../../lobby/cv";
import { CreateGameMode, CardNum, CardSuit } from "../../../../common/tools/Enum";

/**
 * 牌堆类型枚举
 */
export enum PokerType {
    POKER_TYPE_SINGLE,                                              // 高牌
    POKER_TYPE_PAIR,                                                // 一对
    POKER_TYPE_TWO_PAIR,                                            // 两对
    POKER_TYPE_THREE,                                               // 三条
    POKER_TYPE_STRAIGHT,                                            // 顺子
    POKER_TYPE_FLUSH,                                               // 同花
    POKER_TYPE_FULL_HOUSE,                                          // 葫芦
    POKER_TYPE_FOUR,                                                // 四条
    POKER_TYPE_STRAIGHT_FLUSH,                                      // 同花顺
    POKER_TYPE_STRAIGHT_KING                                        // 皇家同花顺
};

/**
 * 普通牌局枚举
 */
export enum PokerValue {
    POKER_VALUE_A = 0,
    POKER_VALUE_2,
    POKER_VALUE_3,
    POKER_VALUE_4,
    POKER_VALUE_5,
    POKER_VALUE_6,
    POKER_VALUE_7,
    POKER_VALUE_8,
    POKER_VALUE_9,
    POKER_VALUE_10,
    POKER_VALUE_J,
    POKER_VALUE_Q,
    POKER_VALUE_K,
    POKER_VALUE_COUNT = 13,
    POKER_VALUE_BACK = 52,
    POKER_VALUE_EMPTY = 53
};

/**
 * 短牌局枚举
 */
export enum ShortPokerValue {
    SHORT_POKER_VALUE_A = 0,
    SHORT_POKER_VALUE_6,
    SHORT_POKER_VALUE_7,
    SHORT_POKER_VALUE_8,
    SHORT_POKER_VALUE_9,
    SHORT_POKER_VALUE_10,
    SHORT_POKER_VALUE_J,
    SHORT_POKER_VALUE_Q,
    SHORT_POKER_VALUE_K,
    SHORT_POKER_VALUE_COUNT = 9,
    SHORT_POKER_VALUE_BACK = 36,
    SHORT_POKER_VALUE_EMPTY = 37
};

/**
 * 牌数据类
 */
export class PokerData {
    /**
     * 牌面原始索引值(与"CardNum"是两个不同的概念)
     */
    value: number = 0;

    /**
     * 牌花色(与"CardSuit"是同一个概念)
     */
    color: CardSuit = CardSuit.CARD_SPADE;

    /**
     * 牌局模式
     */
    mode: CreateGameMode = CreateGameMode.CreateGame_Mode_None;

    /** 牌面比大小的索引值(主要是针对"A"且只用于比牌)
     * @brief 该类目前的逻辑是"A"为枚举"0"值, 按常规逻辑来说应该是"234...KA"这样来枚举,
     * 但是为了计算"A/2/3/4/5/6, 10/j/Q/K/A"这样的顺子而设计为"A"的枚举值为"0", 且同时
     * 在本类的排序函数里面也应用了"A=0"的逻辑, 包括原先的牌型算法, 都是"ok"的, 之所以在
     * 这里还要新增此方法, 是因为"_getCombPokerType"的组合牌型新算法里需要单牌比大小, 靠
     * "value"值是无法判断"A"是最大的, 因为"A"的"value"为"0", 所以新增该字段用于比牌
     */
    faceValue: number = 0;

    constructor(mode: CreateGameMode) {
        this.mode = mode;
        switch (this.mode) {
            case CreateGameMode.CreateGame_Mode_Short: {
                this.value = ShortPokerValue.SHORT_POKER_VALUE_BACK;
                this.faceValue = ShortPokerValue.SHORT_POKER_VALUE_EMPTY;
                this.color = 0;
            } break;

            default: {
                this.value = PokerValue.POKER_VALUE_BACK;
                this.faceValue = PokerValue.POKER_VALUE_EMPTY;
                this.color = 0;
            } break;
        }
    }

    /**
     *  通过牌索引初始化牌信息
     * @param value 牌枚举索引
     * @param color 牌花色
     * @param mode  牌局模式(可选参数)
     */
    initWhitValue(value: number, color: CardSuit, mode?: CreateGameMode): void {
        this.value = value;
        this.color = color;
        if (mode) this.mode = mode;

        switch (mode) {
            case CreateGameMode.CreateGame_Mode_Short: {
                this.faceValue = (value + ShortPokerValue.SHORT_POKER_VALUE_COUNT - 1) % ShortPokerValue.SHORT_POKER_VALUE_COUNT;
            } break;

            default: {
                this.faceValue = (value + PokerValue.POKER_VALUE_COUNT - 1) % PokerValue.POKER_VALUE_COUNT;
            } break;
        }
    }

    /**
     * 通过牌合值始化牌信息
     * @param value 牌合值
     * @param mode  牌局模式(可选参数)
     */
    initWithNumber(value: number, mode?: CreateGameMode): void {
        if (mode) this.mode = mode;
        switch (this.mode) {
            // 短牌局
            case CreateGameMode.CreateGame_Mode_Short: {
                this.value = value % ShortPokerValue.SHORT_POKER_VALUE_COUNT;
                this.faceValue = (value + ShortPokerValue.SHORT_POKER_VALUE_COUNT - 1) % ShortPokerValue.SHORT_POKER_VALUE_COUNT;
                this.color = Math.floor(value / ShortPokerValue.SHORT_POKER_VALUE_COUNT);
            } break;

            // 普通牌局
            default: {
                this.value = value % PokerValue.POKER_VALUE_COUNT;
                this.faceValue = (value + PokerValue.POKER_VALUE_COUNT - 1) % PokerValue.POKER_VALUE_COUNT;
                this.color = Math.floor(value / PokerValue.POKER_VALUE_COUNT);
            } break;
        }
    }

    /**
     * 获取牌合值(花色 * 总数 + 索引)
     * @param mode 牌局模式
     */
    getNumber(mode: CreateGameMode): number {
        let nRet = 0;
        switch (mode) {
            // 短牌局
            case CreateGameMode.CreateGame_Mode_Short: {
                nRet = this.color * ShortPokerValue.SHORT_POKER_VALUE_COUNT + this.value;
            } break;

            // 其他牌局
            default: {
                nRet = this.color * PokerValue.POKER_VALUE_COUNT + this.value;
            } break;
        }
        return nRet;
    }

    /**
     * 获取牌面值对应的枚举索引
     * @param eCardNum  牌面值
     * @param cardMode  牌局模式
     */
    static getLocalValue(eCardNum: CardNum, cardMode: CreateGameMode): number {
        let ret: any = PokerValue.POKER_VALUE_2;
        switch (cardMode) {
            case CreateGameMode.CreateGame_Mode_Short: {
                switch (eCardNum) {
                    case CardNum.CARD_6: ret = ShortPokerValue.SHORT_POKER_VALUE_6; break;
                    case CardNum.CARD_7: ret = ShortPokerValue.SHORT_POKER_VALUE_7; break;
                    case CardNum.CARD_8: ret = ShortPokerValue.SHORT_POKER_VALUE_8; break;
                    case CardNum.CARD_9: ret = ShortPokerValue.SHORT_POKER_VALUE_9; break;
                    case CardNum.CARD_10: ret = ShortPokerValue.SHORT_POKER_VALUE_10; break;
                    case CardNum.CARD_J: ret = ShortPokerValue.SHORT_POKER_VALUE_J; break;
                    case CardNum.CARD_Q: ret = ShortPokerValue.SHORT_POKER_VALUE_Q; break;
                    case CardNum.CARD_K: ret = ShortPokerValue.SHORT_POKER_VALUE_K; break;
                    case CardNum.CARD_A: ret = ShortPokerValue.SHORT_POKER_VALUE_A; break;
                    default: ret = ShortPokerValue.SHORT_POKER_VALUE_6; break;
                }
            } break;

            default: {
                switch (eCardNum) {
                    case CardNum.CARD_2: ret = PokerValue.POKER_VALUE_2; break;
                    case CardNum.CARD_3: ret = PokerValue.POKER_VALUE_3; break;
                    case CardNum.CARD_4: ret = PokerValue.POKER_VALUE_4; break;
                    case CardNum.CARD_5: ret = PokerValue.POKER_VALUE_5; break;
                    case CardNum.CARD_6: ret = PokerValue.POKER_VALUE_6; break;
                    case CardNum.CARD_7: ret = PokerValue.POKER_VALUE_7; break;
                    case CardNum.CARD_8: ret = PokerValue.POKER_VALUE_8; break;
                    case CardNum.CARD_9: ret = PokerValue.POKER_VALUE_9; break;
                    case CardNum.CARD_10: ret = PokerValue.POKER_VALUE_10; break;
                    case CardNum.CARD_J: ret = PokerValue.POKER_VALUE_J; break;
                    case CardNum.CARD_Q: ret = PokerValue.POKER_VALUE_Q; break;
                    case CardNum.CARD_K: ret = PokerValue.POKER_VALUE_K; break;
                    case CardNum.CARD_A: ret = PokerValue.POKER_VALUE_A; break;
                    default: ret = PokerValue.POKER_VALUE_2; break;
                }
            } break;
        }

        return ret;
    }

    /**
     * 获取最大牌型字串(适用于x张手牌 + y张公牌组合, 但总数量 <= 5)
     * @param hps       手牌数组
     * @param pps       公牌数组
     * @param mode      牌局模式
     * @param hc        手牌参与牌型计算的数量(可选)
     * @param pc        公牌参与牌型计算的数量(可选)
     * @param out_hps   输出参与计算的手牌数组(可选)
     * @param out_pps   输出参与计算的公牌数组(可选)
     */
    static getPokerTypeString(hps: number[], pps: number[], mode: number, hc?: number, pc?: number, out_hps?: number[], out_pps?: number[]): string {
        let ret: string = "unknow";
        let type: PokerType = PokerData.getPokerType(hps, pps, mode, hc, pc, out_hps, out_pps);

        switch (type) {
            case PokerType.POKER_TYPE_SINGLE: ret = cv.config.getStringData("UITitle113"); break;
            case PokerType.POKER_TYPE_PAIR: ret = cv.config.getStringData("UITitle114"); break;
            case PokerType.POKER_TYPE_TWO_PAIR: ret = cv.config.getStringData("UITitle115"); break;
            case PokerType.POKER_TYPE_THREE: ret = cv.config.getStringData("UITitle116"); break;
            case PokerType.POKER_TYPE_STRAIGHT: ret = cv.config.getStringData("UITitle117"); break;
            case PokerType.POKER_TYPE_FLUSH: ret = cv.config.getStringData("UITitle118"); break;
            case PokerType.POKER_TYPE_FULL_HOUSE: ret = cv.config.getStringData("UITitle119"); break;
            case PokerType.POKER_TYPE_FOUR: ret = cv.config.getStringData("UITitle120"); break;
            case PokerType.POKER_TYPE_STRAIGHT_FLUSH: ret = cv.config.getStringData("UITitle121"); break;
            case PokerType.POKER_TYPE_STRAIGHT_KING: ret = cv.config.getStringData("UITitle122"); break;
            default: break;
        }

        return ret;
    }

    /**
     * 获取最大牌型
     * @param hps       手牌数组
     * @param pps       公牌数组
     * @param mode      牌局模式
     * @param hc        手牌参与牌型计算的数量(可选)
     * @param pc        公牌参与牌型计算的数量(可选)
     * @param out_hps   输出参与计算的手牌数组(可选)
     * @param out_pps   输出参与计算的公牌数组(可选)
     */
    static getPokerType(hps: number[], pps: number[], mode: number, hc?: number, pc?: number, out_hps?: number[], out_pps?: number[]): PokerType {
        let ret: PokerType = PokerType.POKER_TYPE_SINGLE;

        // 非组合算法(手牌 + 共牌一起算)
        if (hc === null || typeof hc === "undefined") {
            let pokers: number[] = hps.concat(pps);
            let selectedPokers: number[] = [];
            ret = PokerData._getPokerType(pokers, mode, selectedPokers);
        }
        // 组合算法(手牌中取x张 + 共牌取y张组合算)
        else {
            ret = PokerData._getCombPokerType(hps, pps, mode, hc, pc, out_hps, out_pps);
        }

        return ret;
    }

    /**
     * 获取顺子最大牌面对应的枚举索引
     * @param pokers 
     * @param mode 
     */
    private static _getStraightValue(pokers: number[], mode: number): number {
        let nStraightValue: number = -1;
        let nStraightLength: number = 0;
        let vCountValue: number[] = cv.StringTools.arrayMemsetNew(PokerValue.POKER_VALUE_COUNT, 0);
        for (let i = 0; i < cv.StringTools.getArrayLength(pokers); ++i) {
            let poker: PokerData = new PokerData(mode);
            poker.initWithNumber(pokers[i]);

            if (poker.value >= 0 && poker.value < PokerValue.POKER_VALUE_COUNT) {
                ++vCountValue[poker.value];
            }
        }

        switch (mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Short: {
                for (let i = 0; i < ShortPokerValue.SHORT_POKER_VALUE_COUNT; ++i) {
                    if (vCountValue[i] > 0) {
                        ++nStraightLength;
                    }
                    else {
                        nStraightLength = 0;
                    }

                    if (nStraightLength >= 5) {
                        nStraightValue = i;
                    }

                    // 10,J,Q,K,A
                    if (nStraightLength >= 4 && i === ShortPokerValue.SHORT_POKER_VALUE_K && vCountValue[ShortPokerValue.SHORT_POKER_VALUE_A] > 0) {
                        nStraightValue = ShortPokerValue.SHORT_POKER_VALUE_A;
                    }
                }
            } break;

            default: {
                for (let i = 0; i < PokerValue.POKER_VALUE_COUNT; ++i) {
                    if (vCountValue[i] > 0) {
                        ++nStraightLength;
                    }
                    else {
                        nStraightLength = 0;
                    }

                    if (nStraightLength >= 5) {
                        nStraightValue = i;
                    }

                    // 10,J,Q,K,A
                    if (nStraightLength >= 4 && i === PokerValue.POKER_VALUE_K && vCountValue[PokerValue.POKER_VALUE_A] > 0) {
                        nStraightValue = PokerValue.POKER_VALUE_A;
                    }
                }
            } break;
        }

        return nStraightValue;
    }

    /**
     * 比较牌大小(降序)
     */
    private static _comparePoker(poker_a: PokerData, poker_b: PokerData): number {
        // 方式1
        // let va: number = 0;
        // let vb: number = 0;

        // va = (poker_a.value + PokerValue.POKER_VALUE_COUNT - 1) % PokerValue.POKER_VALUE_COUNT;
        // vb = (poker_b.value + PokerValue.POKER_VALUE_COUNT - 1) % PokerValue.POKER_VALUE_COUNT;

        // return vb - va;

        // 方式2
        // return poker_b.faceValue - poker_a.faceValue;

        // 方式3
        return PokerData._compareValue(poker_a.value, poker_b.value);
    }

    /**
     * 比较短牌大小(降序)
     */
    private static _comparePokerShort(poker_a: PokerData, poker_b: PokerData): number {
        // 方式1
        // let va: number = 0;
        // let vb: number = 0;

        // va = (poker_a.value + ShortPokerValue.SHORT_POKER_VALUE_COUNT - 1) % ShortPokerValue.SHORT_POKER_VALUE_COUNT;
        // vb = (poker_b.value + ShortPokerValue.SHORT_POKER_VALUE_COUNT - 1) % ShortPokerValue.SHORT_POKER_VALUE_COUNT;

        // return vb - va;

        // 方式2
        // return poker_b.faceValue - poker_a.faceValue;

        // 方式3
        return PokerData._compareValueShort(poker_a.value, poker_b.value);
    }

    /**
     * 直接比较牌枚举索引大小(降序)
     */
    private static _compareValue(value_a: number, value_b: number): number {
        let va: number = 0;
        let vb: number = 0;

        va = (value_a + PokerValue.POKER_VALUE_COUNT - 1) % PokerValue.POKER_VALUE_COUNT;
        vb = (value_b + PokerValue.POKER_VALUE_COUNT - 1) % PokerValue.POKER_VALUE_COUNT;

        return vb - va;
    }

    /**
     * 直接比较短牌枚举索引大小(降序)
     */
    private static _compareValueShort(value_a: number, value_b: number): number {
        let va: number = 0;
        let vb: number = 0;

        va = (value_a + ShortPokerValue.SHORT_POKER_VALUE_COUNT - 1) % ShortPokerValue.SHORT_POKER_VALUE_COUNT;
        vb = (value_b + ShortPokerValue.SHORT_POKER_VALUE_COUNT - 1) % ShortPokerValue.SHORT_POKER_VALUE_COUNT;

        return vb - va;
    }

    /**
     * 查找牌堆中匹配枚举索引的牌
     * @param pokerList 牌堆数组
     * @param value     要匹配的枚举索引
     * @param mode      牌局模式
     * @param count     要匹配的次数(默认牌堆总长度次数, 可选)
     * @param result    输出匹配的牌组(合值, 可选)
     */
    private static _findPokersWithValue(pokerList: PokerData[], mode: number, value: number, count?: number, result?: number[]): void {
        count = cv.Number(count);

        let n: number = 0;
        let vOuts: number[] = [];
        for (let i = 0; i < cv.StringTools.getArrayLength(pokerList); ++i) {
            if (pokerList[i].value === value) {
                vOuts.push(pokerList[i].getNumber(mode));

                ++n;
                if (count > 0 && n >= count) {
                    break;
                }
            }
        }

        if (result) {
            result.push.apply(result, vOuts);
        }
    }

    /**
     * 查找顺子
     * @param pokerList 牌堆数组
     * @param value     顺子最大张对应的枚举索引
     * @param mode      牌局模式
     * @param result    输出匹配的牌组(合值, 可选)
     */
    private static _findStraightPokers(pokerList: PokerData[], mode: number, value: number, result?: number[]): void {
        let vOuts: number[] = [];

        switch (mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Short: {
                for (let i = 0; i < 5; ++i) {
                    for (let j = 0; j < cv.StringTools.getArrayLength(pokerList); ++j) {
                        if (pokerList[j].value === (value + ShortPokerValue.SHORT_POKER_VALUE_COUNT - i) % ShortPokerValue.SHORT_POKER_VALUE_COUNT) {
                            vOuts.push(pokerList[j].getNumber(mode));
                            break;
                        }
                    }
                }
            } break;

            default: {
                for (let i = 0; i < 5; ++i) {
                    for (let j = 0; j < cv.StringTools.getArrayLength(pokerList); ++j) {
                        if (pokerList[j].value === (value + PokerValue.POKER_VALUE_COUNT - i) % PokerValue.POKER_VALUE_COUNT) {
                            vOuts.push(pokerList[j].getNumber(mode));
                            break;
                        }
                    }
                }
            } break;
        }

        if (result) {
            result.push.apply(result, vOuts);
        }
    }

    /**
     * 查找同花顺
     * @param pokerList 牌堆数组
     * @param value     顺子最大张对应的枚举索引
     * @param color     花色
     * @param mode      牌局模式
     * @param result    输出匹配的牌组(合值, 可选)
     */
    private static _findStraightFlushPokers(pokerList: PokerData[], mode: number, value: number, color: number, result?: number[]): void {
        let vOuts: number[] = [];

        switch (mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Short: {
                for (let i = 0; i < 5; ++i) {
                    for (let j = 0; j < cv.StringTools.getArrayLength(pokerList); ++j) {
                        if (pokerList[j].value === (value + ShortPokerValue.SHORT_POKER_VALUE_COUNT - i) % ShortPokerValue.SHORT_POKER_VALUE_COUNT && pokerList[j].color === color) {
                            vOuts.push(pokerList[j].getNumber(mode));
                            break;
                        }
                    }
                }
            } break;

            default: {
                for (let i = 0; i < 5; ++i) {
                    for (let j = 0; j < cv.StringTools.getArrayLength(pokerList); ++j) {
                        if (pokerList[j].value === (value + PokerValue.POKER_VALUE_COUNT - i) % PokerValue.POKER_VALUE_COUNT && pokerList[j].color === color) {
                            vOuts.push(pokerList[j].getNumber(mode));
                            break;
                        }
                    }
                }
            } break;
        }

        if (result) {
            result.push.apply(result, vOuts);
        }
    }

    /**
     * 降序查牌
     * @param pokerList 牌堆数组
     * @param count     匹配的数量
     * @param mode      牌局模式
     * @param result    输出匹配的牌组(合值, 可选)
     */
    private static _findBigPokers(pokerList: PokerData[], mode: number, count: number, result?: number[]): void {
        let vOuts: number[] = [];

        switch (mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Short: {
                pokerList.sort(PokerData._comparePokerShort);
            } break;

            default: {
                pokerList.sort(PokerData._comparePoker);
            } break;
        }

        for (let i = 0; i < count; ++i) {
            if (i >= 0 && i < cv.StringTools.getArrayLength(pokerList)) {
                vOuts.push(pokerList[i].getNumber(mode));
            }
        }

        if (result) {
            result.push.apply(result, vOuts);
        }
    }

    /**
     * 查找花色相同的牌
     * @param pokerList 牌堆数组
     * @param color     匹配的花色
     * @param mode      牌局模式
     * @param result    输出匹配的牌组(合值, 可选)
     */
    private static _findPokersWithColor(pokerList: PokerData[], mode: number, color: number, result?: number[]): void {
        let vOuts: number[] = [];

        switch (mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Short: {
                pokerList.sort(PokerData._comparePokerShort);
            } break;

            default: {
                pokerList.sort(PokerData._comparePoker);
            } break;
        }

        let nCount = 0;
        for (let i = 0; i < cv.StringTools.getArrayLength(pokerList); ++i) {
            if (pokerList[i].color === color) {
                vOuts.push(pokerList[i].getNumber(mode));
                ++nCount;
            }
            if (nCount >= 5) break;
        }

        if (result) {
            result.push.apply(result, vOuts);
        }
    }

    /**
     * 获取组合牌的最大牌型
     * @param hps       手牌数组
     * @param pps       公牌数组
     * @param mode      牌局模式
     * @param hc        手牌参与牌型计算的数量(可选)
     * @param pc        公牌参与牌型计算的数量(可选)
     * @param out_hps   输出参与计算的手牌数组(可选)
     * @param out_pps   输出参与计算的公牌数组(可选)
     */
    private static _getCombPokerType(hps: number[], pps: number[], mode: number, hc?: number, pc?: number, out_hps?: number[], out_pps?: number[]): PokerType {
        // "低效"组合算法("<=100w"秒过, "500w-1000w"略卡, ">1000w"崩溃栈溢出)
        // 组合公式(从n项中取m项): n! / ((n - m)! * m!)
        let combo: (arr: number[], count: number) => number[][] = (arr: number[], count: number): number[][] => {
            let result: number[][] = [];
            let range: (a1: number[], a2: number[]) => void = (a1: number[], a2: number[]): void => {
                if (a1.length === count) {
                    result.push(a1);
                }
                else {
                    for (var i = 0, len = a2.length - count + a1.length; i <= len; ++i) {
                        range(a1.concat(a2[i]), a2.slice(i + 1));
                    }
                }
            }
            range([], arr);
            return result;
        }

        // 校验组合算法规则, 从"n"中取"m"个必须满足"m <= n"
        hc = Math.min(hc, hps.length);
        pc = Math.min(pc, pps.length);

        let hands_pokers: number[][] = combo(hps, hc);                              // 手牌组合
        let public_pokers: number[][] = combo(pps, pc);                             // 公牌组合

        let maxPokerTypeHPIdx: number = 0;                                          // 最大牌型手牌组合索引
        let maxPokerTypePPIdx: number = 0;                                          // 最大牌型公牌组合索引
        let maxPokerTypeValue: PokerType = -1;                                      // 最大牌型值
        let maxPokerTypeSelects: number[] = [];                                     // 最大牌型的牌组合值数组

        let tmp_now_poker: PokerData = new PokerData(mode);
        let tmp_max_poker: PokerData = new PokerData(mode);

        for (let i = 0; i < hands_pokers.length; ++i) {
            for (let j = 0; j < public_pokers.length; ++j) {
                let replace: boolean = false;
                let selectes: number[] = [];
                let pokers: number[] = hands_pokers[i].concat(public_pokers[j]);
                let pokerType: PokerType = this._getPokerType(pokers, mode, selectes);

                // 牌型大优先
                if (pokerType > maxPokerTypeValue) {
                    replace = true;
                }
                // 牌型相同比值(牌组都已经降序处理过)
                else if (pokerType === maxPokerTypeValue) {
                    switch (pokerType) {
                        // 高牌
                        case PokerType.POKER_TYPE_SINGLE: {
                            // 依次比单张牌大小
                            for (let k = 0; k < selectes.length; ++k) {
                                tmp_now_poker.initWithNumber(selectes[k]);
                                tmp_max_poker.initWithNumber(maxPokerTypeSelects[k]);

                                if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                    replace = true;
                                    break;
                                }
                                else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) continue;
                                else break;
                            }
                        } break;

                        // 一对
                        case PokerType.POKER_TYPE_PAIR: {
                            tmp_now_poker.initWithNumber(selectes[0]);
                            tmp_max_poker.initWithNumber(maxPokerTypeSelects[0]);

                            // 比对子大小
                            if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                replace = true;
                            }
                            // 对子大小相等, 剩余单牌依次比大小
                            else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) {
                                for (let k = 2; k < selectes.length; ++k) {
                                    tmp_now_poker.initWithNumber(selectes[k]);
                                    tmp_max_poker.initWithNumber(maxPokerTypeSelects[k]);

                                    if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                        replace = true;
                                        break;
                                    }
                                    else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) continue;
                                    else break;
                                }
                            }
                        } break;

                        // 两对
                        case PokerType.POKER_TYPE_TWO_PAIR: {
                            tmp_now_poker.initWithNumber(selectes[0]);
                            tmp_max_poker.initWithNumber(maxPokerTypeSelects[0]);

                            // 比第一对大小
                            if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                replace = true;
                            }
                            // 第一对相等
                            else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) {
                                tmp_now_poker.initWithNumber(selectes[2]);
                                tmp_max_poker.initWithNumber(maxPokerTypeSelects[2]);

                                // 比第二对大小
                                if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                    replace = true;
                                }
                                // 第二对相等, 比单牌大小
                                else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) {
                                    for (let k = 4; k < selectes.length; ++k) {
                                        tmp_now_poker.initWithNumber(selectes[k]);
                                        tmp_max_poker.initWithNumber(maxPokerTypeSelects[k]);

                                        if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                            replace = true;
                                            break;
                                        }
                                        else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) continue;
                                        else break;
                                    }
                                }
                            }
                        } break;

                        // 三条
                        case PokerType.POKER_TYPE_THREE: {
                            tmp_now_poker.initWithNumber(selectes[0]);
                            tmp_max_poker.initWithNumber(maxPokerTypeSelects[0]);

                            // 比三条大小
                            if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                replace = true;
                            }
                            // 三条相等比单牌
                            else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) {
                                for (let k = 3; k < selectes.length; ++k) {
                                    tmp_now_poker.initWithNumber(selectes[k]);
                                    tmp_max_poker.initWithNumber(maxPokerTypeSelects[k]);

                                    if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                        replace = true;
                                        break;
                                    }
                                    else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) continue;
                                    else break;
                                }
                            }
                        } break;

                        // 顺子 / 同花顺
                        case PokerType.POKER_TYPE_STRAIGHT:
                        case PokerType.POKER_TYPE_STRAIGHT_FLUSH: {
                            tmp_now_poker.initWithNumber(selectes[0]);
                            tmp_max_poker.initWithNumber(maxPokerTypeSelects[0]);

                            // 比第一张
                            if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                replace = true;
                            }
                        } break;

                        // 同花
                        case PokerType.POKER_TYPE_FLUSH: {
                            // 依次比单张牌大小
                            for (let k = 0; k < selectes.length; ++k) {
                                tmp_now_poker.initWithNumber(selectes[k]);
                                tmp_max_poker.initWithNumber(maxPokerTypeSelects[k]);

                                if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                    replace = true;
                                    break;
                                }
                                else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) continue;
                                else break;
                            }
                        } break;

                        // 葫芦
                        case PokerType.POKER_TYPE_FULL_HOUSE: {
                            tmp_now_poker.initWithNumber(selectes[0]);
                            tmp_max_poker.initWithNumber(maxPokerTypeSelects[0]);

                            // 比三条大小
                            if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                replace = true;
                            }
                            // 三条相等比一对
                            else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) {
                                tmp_now_poker.initWithNumber(selectes[3]);
                                tmp_max_poker.initWithNumber(maxPokerTypeSelects[3]);

                                if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                    replace = true;
                                }
                            }
                        } break;

                        // 四条
                        case PokerType.POKER_TYPE_FOUR: {
                            tmp_now_poker.initWithNumber(selectes[0]);
                            tmp_max_poker.initWithNumber(maxPokerTypeSelects[0]);

                            // 比四条大小
                            if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                replace = true;
                            }
                            // 四条相等比单牌
                            else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) {
                                for (let k = 4; k < selectes.length; ++k) {
                                    tmp_now_poker.initWithNumber(selectes[k]);
                                    tmp_max_poker.initWithNumber(maxPokerTypeSelects[k]);

                                    if (tmp_now_poker.faceValue > tmp_max_poker.faceValue) {
                                        replace = true;
                                        break;
                                    }
                                    else if (tmp_now_poker.faceValue === tmp_max_poker.faceValue) continue;
                                    else break;
                                }
                            }
                        } break;

                        // 皇家同花顺
                        case PokerType.POKER_TYPE_STRAIGHT_KING:
                        default:
                            break;
                    }
                }

                // 比完大小是否替换当前索引
                if (replace) {
                    maxPokerTypeHPIdx = i;
                    maxPokerTypePPIdx = j;
                    maxPokerTypeValue = pokerType;
                    maxPokerTypeSelects = selectes;
                }
            }
        }

        // 输出最大牌型参与的牌
        if (out_hps) {
            out_hps.push.apply(out_hps, hands_pokers[maxPokerTypeHPIdx]);
        }

        if (out_pps) {
            out_pps.push.apply(out_pps, public_pokers[maxPokerTypePPIdx]);
        }

        return maxPokerTypeValue;
    }

    /**
     * 获取指定牌数组中的最大牌型(该算法只针对 <= 5 张牌)
     * @param pokers            牌堆数组
     * @param mode              牌局模式
     * @param selectedPokers    输出匹配的牌组(合值, 可选)
     */
    private static _getPokerType(pokers: number[], mode: number, selectedPokers?: number[]): PokerType {
        let retType: PokerType = PokerType.POKER_TYPE_SINGLE;       // 返回类型
        let nPokerValueA: number = 0;                               // 牌 A 索引
        let nPokerValueCount: number = 0;                           // 牌索引总数
        let nPokerColorFirst: number = CardSuit.CARD_DIAMOND;       // 起始花色索引
        let nPokerColorCount: number = CardSuit.CardSuit_MAX;       // 花色索引总数
        let sortFunc: (a: any, b: any) => number = null;            // 排序函数

        switch (mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Short: {
                nPokerValueA = ShortPokerValue.SHORT_POKER_VALUE_A;
                nPokerValueCount = ShortPokerValue.SHORT_POKER_VALUE_COUNT;
                sortFunc = PokerData._compareValueShort;
            } break;

            case cv.Enum.CreateGameMode.CreateGame_Mode_Normal: {
                nPokerValueA = PokerValue.POKER_VALUE_A;
                nPokerValueCount = PokerValue.POKER_VALUE_COUNT;
                sortFunc = PokerData._compareValue;
            } break;

            default: break;
        }

        // 计算牌型
        do {
            let vCountValue: number[] = cv.StringTools.arrayMemsetNew(nPokerValueCount, 0);
            let vCountColor: number[] = cv.StringTools.arrayMemsetNew(nPokerColorCount, 0);
            let vPokerDataList: PokerData[] = [];

            // 牌堆分割
            for (let i = 0; i < cv.StringTools.getArrayLength(pokers); ++i) {
                let poker: PokerData = new PokerData(mode);
                poker.initWithNumber(pokers[i], mode);
                vPokerDataList.push(poker);

                if (poker.value >= 0 && poker.value < nPokerValueCount) {
                    ++vCountValue[poker.value];
                }

                if (poker.color >= 0 && poker.color < nPokerColorCount) {
                    ++vCountColor[poker.color];
                }
            }

            // 对子、三条、四条检测
            let bFour: boolean = false;
            let bThree: boolean = false;
            let nPairsCount: number = 0;
            let nFourValue: number = 0;
            let nThreeValue: number = 0;
            let vPairValues: number[] = cv.StringTools.arrayMemsetNew(3, -1);
            for (let i = nPokerValueA; i < nPokerValueCount; ++i) {

                // 四条
                if (vCountValue[i] >= 4) {
                    nFourValue = i;
                    bFour = true;
                }

                // 三条
                if (vCountValue[i] === 3) {
                    if (bThree) {
                        let v1: number = (nThreeValue + nPokerValueCount - 1) % nPokerValueCount;
                        let v2: number = (i + nPokerValueCount - 1) % nPokerValueCount;
                        let minValue: number = v1 > v2 ? i : nThreeValue;
                        let maxValue: number = v1 > v2 ? nThreeValue : i;

                        nThreeValue = maxValue;
                        vPairValues[nPairsCount] = minValue;
                        ++nPairsCount;
                    }
                    else {
                        nThreeValue = i;
                        bThree = true;
                    }
                }

                // 对子
                if (vCountValue[i] === 2) {
                    vPairValues[nPairsCount] = i;
                    ++nPairsCount;
                }
            }

            // 剔除对子数组的默认值
            for (let i = 0; i < vPairValues.length; ++i) { if (vPairValues[i] < 0) vPairValues.splice(i--, 1); }

            // 存在多个对子, 降序
            if (vPairValues.length > 0) vPairValues.sort(sortFunc);

            // 同花检测
            let bFlush: boolean = false;
            let nFlushColor: number = 0;
            for (let i = nPokerColorFirst; i < nPokerColorCount; ++i) {
                if (vCountColor[i] >= 5) {
                    bFlush = true;
                    nFlushColor = i;
                    break;
                }
            }

            // 顺子检测
            let nStraightValue: number = PokerData._getStraightValue(pokers, mode);
            let bStraight: boolean = (nStraightValue >= 0);

            // 同花顺检测
            let bStraightFlush: boolean = false;
            let nStraightFlushValue: number = 0;
            let vFlushPokers: number[] = [];
            if (bFlush && bStraight) {
                for (let i = 0; i < cv.StringTools.getArrayLength(vPokerDataList); ++i) {
                    if (vPokerDataList[i].color === nFlushColor) {
                        vFlushPokers.push(pokers[i]);
                    }
                }

                nStraightFlushValue = PokerData._getStraightValue(vFlushPokers, mode);
                bStraightFlush = (nStraightFlushValue >= 0);
            }

            // 检测最终牌型
            if (bStraightFlush) {
                PokerData._findStraightFlushPokers(vPokerDataList, mode, nStraightValue, nFlushColor, selectedPokers);
                if (nStraightFlushValue === nPokerValueA) {
                    retType = PokerType.POKER_TYPE_STRAIGHT_KING;
                }
                else {
                    retType = PokerType.POKER_TYPE_STRAIGHT_FLUSH;
                }
            }
            else if (bFour) {
                let vSurplus: PokerData[] = [];
                for (let i = 0; i < vPokerDataList.length; ++i) {
                    if (vPokerDataList[i].value === nFourValue) continue;
                    vSurplus.push(vPokerDataList[i]);
                }

                PokerData._findPokersWithValue(vPokerDataList, mode, nFourValue, 4, selectedPokers);
                PokerData._findBigPokers(vSurplus, mode, 1, selectedPokers);
                retType = PokerType.POKER_TYPE_FOUR;
            }
            else if (bFlush) {
                PokerData._findPokersWithColor(vPokerDataList, mode, nFlushColor, selectedPokers);
                retType = PokerType.POKER_TYPE_FLUSH;
            }
            else if (bThree && nPairsCount > 0) {
                PokerData._findPokersWithValue(vPokerDataList, mode, nThreeValue, 3, selectedPokers);
                PokerData._findPokersWithValue(vPokerDataList, mode, vPairValues[0], 2, selectedPokers);
                retType = PokerType.POKER_TYPE_FULL_HOUSE;
            }
            else if (bStraight) {
                PokerData._findStraightPokers(vPokerDataList, mode, nStraightValue, selectedPokers);
                retType = PokerType.POKER_TYPE_STRAIGHT;
            }
            else if (bThree) {
                let vSurplus: PokerData[] = [];
                for (let i = 0; i < vPokerDataList.length; ++i) {
                    if (vPokerDataList[i].value === nThreeValue) continue;
                    vSurplus.push(vPokerDataList[i]);
                }

                PokerData._findPokersWithValue(vPokerDataList, mode, nThreeValue, 3, selectedPokers);
                PokerData._findBigPokers(vSurplus, mode, 2, selectedPokers);
                retType = PokerType.POKER_TYPE_THREE;
            }
            else if (nPairsCount >= 2) {
                let vSurplus: PokerData[] = [];
                for (let i = 0; i < vPokerDataList.length; ++i) {
                    if (vPokerDataList[i].value === vPairValues[0] || vPokerDataList[i].value === vPairValues[1]) continue;
                    vSurplus.push(vPokerDataList[i]);
                }

                PokerData._findPokersWithValue(vPokerDataList, mode, vPairValues[0], 2, selectedPokers);
                PokerData._findPokersWithValue(vPokerDataList, mode, vPairValues[1], 2, selectedPokers);
                PokerData._findBigPokers(vSurplus, mode, 1, selectedPokers);
                retType = PokerType.POKER_TYPE_TWO_PAIR;
            }
            else if (nPairsCount === 1) {
                let vSurplus: PokerData[] = [];
                for (let i = 0; i < vPokerDataList.length; ++i) {
                    if (vPokerDataList[i].value === vPairValues[0]) continue;
                    vSurplus.push(vPokerDataList[i]);
                }

                PokerData._findPokersWithValue(vPokerDataList, mode, vPairValues[0], 2, selectedPokers);
                PokerData._findBigPokers(vSurplus, mode, 3, selectedPokers);
                retType = PokerType.POKER_TYPE_PAIR;
            }
            else {
                PokerData._findBigPokers(vPokerDataList, mode, 5, selectedPokers);
                retType = PokerType.POKER_TYPE_SINGLE;
            }
        } while (false);

        return retType;
    }
};
