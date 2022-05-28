import cv from "../../components/lobby/cv";

/**
 * 提醒消息类型
 */
export enum eRemindMsgType {
    RMSG_TYPE_NONE = 0,                                                                             // 无(系统消息)
    RMSG_TYPE_CLUB,                                                                                 // 俱乐部消息
    RMSG_TYPE_TRANSFER_ACCOUNTS,                                                                    // 转账消息
    RMSG_TYPE_ALLIANCE,                                                                             // 联盟消息
    RMSG_TYPE_CARD_GAME,                                                                            // 牌局消息
    RMSG_TYPE_GLOBAL                                                                                // 全局消息
}

/**
 * 提醒消息状态
 */
export enum eRemindMsgStatus {
    RMSG_STATUS_NONE = 0,                                                                           // 无
    RMSG_STATUS_PENDING,                                                                            // 待处理
    RMSG_STATUS_RATIFIED,                                                                           // 已批准
    RMSG_STATUS_REFUSED,                                                                            // 已拒绝
    RMSG_STATUS_TIMEOUT,                                                                            // 超时
    RMSG_STATUS_CANCEL                                                                              // 已取消
}

/**
 * 提醒结构 - 文本内容结构信息(因为 string 内容原本在调用者处就已经填充好值了, 每次打开消息列表只会刷新以填充好值的消息
 * 但是此结构涉及到多语言, 因此才提出这个拼接结构, 调用者赋值, 刷新列表时拼接, 就可实现多语言切换了, 因为协议结构都已经
 * 固定好了，不宜修改, 而从C++移植过来的全局消息提示模块太紊乱, 我欲优化此模块, 奈何耦合度太高, 优化不完全, 暂时就这样吧
 * 为何邮件结构不需修改, 因为邮件结构数据协议和UI相互对应, 但提醒消息模块的数据协议太杂乱, 都是东平西凑式的, 所以才紊乱)
 */
export class RemindDataContentExtra {
    format_key: string = "";                                                                        // 键(因为涉及多语言, 要把键提出来)
    format_value1: any = null;                                                                      // 值1
    format_value2: any = null;                                                                      // 值2

    // 是否是 format 模式
    // true - cv.StringTools.formatC(format_key, format_value, ...);
    // false - cv.StringTools.formatC(cv.config.getStringData(format_key), format_value, ...)
    isFormat: boolean = false;

    setData(key: string, value1?: any, value2?: any): void {
        this.format_key = key;
        if (value1 != null || typeof value1 != "undefined") this.format_value1 = value1;
        if (value2 != null || typeof value2 != "undefined") this.format_value2 = value2;
    }

    equal(data: RemindDataContentExtra): boolean {
        let bEqual: boolean = true
            && this.isFormat === data.isFormat
            && this.format_key === data.format_key
            && this.format_value1 === data.format_value1
            && this.format_value2 === data.format_value2;

        return bEqual;
    }

    copyFrom(param: RemindDataContentExtra): void {
        if (!param || typeof param === "undefined") return;

        this.isFormat = param.isFormat;
        this.format_key = param.format_key;
        this.format_value1 = param.format_value1;
        this.format_value2 = param.format_value2;
    }
}

/**
 * 提醒结构
 */
export class RemindData {
    uuid: string = "";                                                                              // uuid
    strTag: string = "";                                                                            // 字符串标记
    msgNew: boolean = false;                                                                        // 是否是新消息
    msgType: eRemindMsgType = eRemindMsgType.RMSG_TYPE_NONE;                                        // 消息类型
    msgStatus: eRemindMsgStatus = eRemindMsgStatus.RMSG_STATUS_NONE;                                // 消息状态
    msgTime: number = 0;                                                                            // 消息时间
    msgContenUp: RemindDataContentExtra = new RemindDataContentExtra();                             // 消息内容 上
    msgContenMiddle: RemindDataContentExtra = new RemindDataContentExtra();                         // 消息内容 中
    msgContenDown: RemindDataContentExtra = new RemindDataContentExtra();                           // 消息内容 下
    msgEnsureFunc: (remindData: RemindData, cellIndex: number, dataIndex: number) => void = null;   // 消息确认按钮回调函数
    msgCancelFunc: (remindData: RemindData, cellIndex: number, dataIndex: number) => void = null;   // 消息取消按钮回调函数
    msgStatusFunc: (remindData: RemindData, cellIndex: number, dataIndex: number) => void = null;   // 消息状态按钮回调函数

    constructor() {
        this.uuid = cv.StringTools.generateUUID();
    }

    /**
     * 深拷贝
     */
    copyFrom(param: RemindData): void {
        if (!param || typeof param === "undefined") return;

        this.uuid = param.uuid;
        this.strTag = param.strTag;
        this.msgNew = param.msgNew;
        this.msgType = param.msgType;
        this.msgStatus = param.msgStatus;
        this.msgTime = param.msgTime;
        this.msgContenUp.copyFrom(param.msgContenUp);
        this.msgContenMiddle.copyFrom(param.msgContenMiddle);
        this.msgContenDown.copyFrom(param.msgContenDown);
        this.msgEnsureFunc = param.msgEnsureFunc;
        this.msgCancelFunc = param.msgCancelFunc;
        this.msgStatusFunc = param.msgStatusFunc;
    }

    /**
     * 是否相等
     */
    equal(param: RemindData): boolean {
        if (!param) return false;
        if (param.strTag === this.strTag
            && param.msgNew === this.msgNew
            && param.msgType === this.msgType
            && param.msgStatus === this.msgStatus
            //&& param.msgTime === this.msgTime
            && param.msgContenUp.equal(this.msgContenUp)
            && param.msgContenMiddle.equal(this.msgContenMiddle)
            && param.msgContenDown.equal(this.msgContenDown)) {
            return true;
        }
    }
}