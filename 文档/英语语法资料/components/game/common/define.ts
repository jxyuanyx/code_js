import cv from "../../lobby/cv";

/**
 * 小游戏公用定义
 */
export namespace MiniGameCommonDef {
    /**
     * 公用屏幕类型(游戏设计分辨率 1080 * 1920)
     */
    export enum eGameboyScreenType {
        /**
         * 常规屏
         */
        GST_SCREEN_NORMAL = 0,

        /**
         * 宽屏
         */
        GST_SCREEN_BROAD,

        /**
         * 窄屏
         */
        GST_SCREEN_NARROW,
    };

    /**
     * 公用续投按钮样式
     */
    export enum eGameboyAutoBtnStyle {
        /**
         * 无
         */
        GAB_STYLE_NONE = 0,

        /**
         * 常规续投
         */
        GAB_STYLE_NORMAL,

        /**
         * 高级续投
         */
        GAB_STYLE_ADVANCE,

        /**
         * 高级续投生效中
         */
        GAB_STYLE_ADVANCE_USING,
    };

    /**
     * 公用路子显示风格枚举
     */
    export enum eGameboyWayOutStyle {
        /**
         * 无
         */
        GWS_NONE = 0,

        /**
         * 纯球状图片
         */
        GWS_IMG,

        /**
         * 纯文本
         */
        GWS_TXT,

        /**
         * 自动(球状图片满了且全败, 则显示文本, 否则显示球图片)
         */
        GWS_AUTO,
    };

    /**
     * 公用底栏面板节点信息结构(主要用于按原始缩放比例适配对应节点位置)
     */
    export class tGameNodeScale {
        node: cc.Node = null;																                // 对应节点
        scale: number = 0;																					// 原始缩放比例(不一定是1, 具体看设置的初始值)
        isFixLayout: boolean = false;                                                                       // 是否开启"无论显/隐状态都参与排版计算"模式(默认:false)
        constructor(node: cc.Node, scale: number, isFixLayout: boolean = false) {
            this.node = node;
            this.scale = scale;
            this.isFixLayout = isFixLayout;
        }
    };

    /**
     * 按指定动画的持续时间计算该动画播放速度(应用于所有动画剪辑)
     * @param anim 
     * @param executeTime 
     */
    export function getAnimClipSpeedByDuring(animClip: cc.AnimationClip, executeTime: number): number {
        let speed: number = animClip.speed;
        if (executeTime > 0) {
            let totalFrames: number = animClip.sample * animClip.duration;
            speed = totalFrames / cc.game.getFrameRate() / executeTime;
        }
        return speed;
    }

    /**
     * 指定数"向下取舍"
     * @param value             指定数值
     * @param decimalPlaces     保留几位小数(默认:1)
     * @param clientByServer    是否需要经过cs单位转换(默认:true)
     */
    export function getNumberFixedDown(value: number, decimalPlaces: number = 1, clientByServer: boolean = true): number {
        if (clientByServer) {
            value = cv.StringTools.clientGoldByServer(value);
        }

        let nRet: number = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_DOWN);
        return nRet;
    }

    /**
     * 指定数"向上取舍"
     * @param value             指定数值
     * @param decimalPlaces     保留几位小数(默认:1)
     * @param clientByServer    是否需要经过cs单位转换(默认:true)
     */
    export function getNumberFixedUp(value: number, decimalPlaces: number = 1, clientByServer: boolean = true): number {
        if (clientByServer) {
            value = cv.StringTools.clientGoldByServer(value);
        }

        let nRet: number = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_UP);
        return nRet;
    }

    /**
     * 指定数"四舍五入"
     * @param value             指定数值
     * @param decimalPlaces     保留几位小数(默认:1)
     * @param clientByServer    是否需要经过cs单位转换(默认:true)
     */
    export function getNumberFixedHalfUp(value: number, decimalPlaces: number = 1, clientByServer: boolean = true): number {
        if (clientByServer) {
            value = cv.StringTools.clientGoldByServer(value);
        }

        let nRet: number = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_HALF_UP);
        return nRet;
    }

    /**
     * 分解指定下注金额(拆分多个基础筹码)
     * @param gold                  指定金额(以"分"为单位)
     * @param amountLevelArray      优先遍历的金额数组(若该数组无法完成分解, 则默认有分解算法)
     */
    export function disinteBetAmounts(gold: number, amountLevelArray?: number[]): number[] {
        let ret: number[] = [];
        let amout: number = Math.ceil(gold);
        let nMaxCount: number = 10;
        let nAmountLevelArrayLen: number = cv.StringTools.getArrayLength(amountLevelArray);

        // 优先从配置表里遍历
        if (nAmountLevelArrayLen > 0) {
            let nWhileCount: number = nMaxCount;
            while (--nWhileCount >= 0 && amout > 0) {
                for (let i = amountLevelArray.length - 1; i >= 0; --i) {
                    let nLevel: number = amountLevelArray[i];
                    if (amout >= nLevel) {
                        amout -= nLevel;
                        ret.push(nLevel);
                        break;
                    }
                }
            }
        }

        // 若配置表里没有匹配项, 则人为拆分(拆分算法为: 1, 5, 10, 20, ... => pow(2, x) * 5)
        // 这里按服务器"分"为单位, 所以都要乘100
        if (ret.length <= 0 || (amout > 0 && ret.length < nMaxCount)) {
            // 求出"临界值"
            let critical_value: number = 0;
            let critical_count: number = 0;
            for (let i = 0; i < amout; ++i) {
                critical_value = Math.pow(2, i) * 5 * 100;
                if (amout / critical_value <= 1) {
                    critical_count = i - 1;
                    break;
                }
            }

            // 开始分解(若超过上限数量则跳出)
            for (let i = critical_count; i >= 0; --i) {
                let nLevel: number = Math.pow(2, i) * 5 * 100;
                if (amout >= nLevel) {
                    amout -= nLevel;
                    ret.push(nLevel);
                    if (ret.length >= nMaxCount) break;
                }
            }

            // 继续按"1"分解(若超过上限数量则跳出)
            if (amout > 0 && ret.length < nMaxCount) {
                let nForCount: number = nMaxCount - ret.length;
                let nLevel: number = 1 * 100;
                for (let i = 0; i < nForCount; ++i) {
                    amout -= nLevel;
                    ret.push(nLevel);
                    if (amout <= 0) break;
                }
            }
        }

        return ret;
    }
}