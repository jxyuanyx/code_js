const { ccclass, property } = cc._decorator;

@ccclass
export class GameData {
    i32RoomId: number = -1;
    i32DealerSId: number = -1;
    i32SBSid: number = -1;
    i32BBSid: number = -1;
    i32Ante: number = -1;
    u32DeadPot: number = 0;
    m_u32MiniRaise: number = 0;
    m_u32StakeNow: number = 0;
    m_u32RoundBet: number = 0;
    m_u32NeedCall: number = 0;
    m_u32FullPot: number = 0;
    PotList: any;
    HandID: string = "";
    m_u32ActionSeq: number = 0;
    m_u32InsuranceSeq: number = 0;
    m_u32GreatestBet: number = 0;
    m_u32AddTimeCount: number = 0;
    m_bIsOnSelfAction: boolean = false;
    club_createrids: number[] = [];
    m_u32DelayTime: number = 0;
    m_bIsAnte: boolean = false;
    game_settlement_uuid: string = "";       // 当前房间正在结算的牌局 uuid 用于牌局回顾面板判断临界条件; "下局"或"等待其他玩家"这两个notice消息会清空该字段
    public reset() {
        this.i32RoomId = -1;
        this.i32DealerSId = -1;
        this.i32SBSid = -1;
        this.i32BBSid = -1;
        this.i32Ante = -1;
        this.u32DeadPot = 0;
        this.m_u32MiniRaise = 0;
        this.m_u32StakeNow = 0;
        this.m_u32RoundBet = 0;
        this.m_u32NeedCall = 0;
        this.m_u32FullPot = 0;
        this.PotList;
        this.HandID = "";
        this.m_u32ActionSeq = 0;
        this.m_u32InsuranceSeq = 0;
        this.m_u32GreatestBet = 0;
        this.m_u32AddTimeCount = 0;
        this.m_bIsOnSelfAction = false;
        //resetgame这个不能清空
        //this.club_createrids = [];
        this.game_settlement_uuid = "";
    }
    public isHavePriviledge(uid: number): boolean {
        for (let i = 0; i < this.club_createrids.length; i++) {
            if (this.club_createrids[i] == uid) {
                return true;
            }
        }
        return false;
    }
}
