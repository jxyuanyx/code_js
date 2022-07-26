import { blackjack } from "../../net/protos/blackjack";

export class animVo {
    isLoop:boolean = false;
    path:string = "";
    anim:string = "";
    pos:cc.Vec3 = new cc.Vec3();
    cb:Function = null;
    comcb:Function = null;
    target:any = null;
    index:number = null;
}

export class playbackVo{

}

export class processVo{
    ID:number = 0;   //操作ID Game101Process
    gD:blackjack.Blitz21CompetitionDataResp = new blackjack.Blitz21CompetitionDataResp();
    goD:any;
    uD:undoVo = new undoVo();
    h2cD:h2cVo = new h2cVo();
    c2hD:c2hVo = new c2hVo();
    c2pD:c2pVo = new c2pVo();
    // CardDesk:blackjack.Blitz21CompetitionDataResp = new blackjack.Blitz21CompetitionDataResp();
    // LeftTime:number = 0;    //游戏时间
    // Cards:number[] = [];    //牌堆牌
    // CurrentCard:number = 0; //当前手牌
    // HoldCard:number = 0;    //暂存牌
    // PileCards:number[] = [];//牌队列牌
    // Bombs:number = 0;   //已爆次数
    // HoldCounts:number = 0;  //可暂存次数
    // CurrentScore:number = 0 //当前总分数
}

export class gameoverVo{
    Data:blackjack.Blitz21Op_FinishResp = new blackjack.Blitz21Op_FinishResp();
}

export class undoVo{
    Data:blackjack.Blitz21Op_UndoResp = new blackjack.Blitz21Op_UndoResp();
    constructor(){
        this.Data.CardDesk = new blackjack.Blitz21Carddesk();
        this.Data.CardDesk.PileCards = new blackjack.Blitz21OnePile();
    }
}

export class h2cVo{

}

export class c2hVo{
    Data:blackjack.Blitz21Op_C2HResp = new blackjack.Blitz21Op_C2HResp();
}

export class c2pVo{
    CurIndex:number = 0;    //当前点击队列
    Data:blackjack.Blitz21Op_C2PResp = new blackjack.Blitz21Op_C2PResp();
    // NextCard:number = 0;    //下一张牌
    // ClearType:number [] = [];//消除类型
    // HitCounts:number = 0;   //连击次数
    // HitScore:number = 0;    //连击得分
    // ClearTypeScore:number[] = [];//消除得分
}
