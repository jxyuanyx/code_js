export enum RewardEnum {
    LOGINREWARD = 1001, //七天登录
    PAYREWARD = 1002,   //首充
    DRAWREWARD = 1003,  //翻牌
    NEWRECHARGE = 1006,  //新手充值
    NEWRECHTASK = 10060001  //新手充值任务
}

export enum NewRechargeStatus{
    ALREADY = 0,    //已充值
    UNAVAILABLE = 1,    //不可参与
    AVAILABLE = 2   //可参与
}

export enum ActivityEntry{
    DEFAULT = 0,    //默认
    RECHARGE = 1, //充值活动
    LOGIN = 2,  //登录活动
    NEWRECHARGE = 3    //新手充值活动
}
