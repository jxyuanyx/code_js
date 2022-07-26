export enum Game100CardZone{
    BOX,
    ZONE,
    DEAL
}

export const Game100Events={
    ONMOVECARD_START:"onMoveCard_Start",    //开始移动牌
    ONMOVECARD_MOVE:"onMoveCard_End",    //移动牌
    ONMOVECARD_END:"onMoveCard_End",        //移动牌结束
    OPEN_ZONE_CARD:"openNewCard",           //翻底牌
    OPEN_DEAL_CARDS:"openDealCards",        //翻新牌池
    MVCARD_Z2Z:"moveCard_z2z",              //移动牌
    MVCARD_Z2B:"moveCard_z2b",              //牌区移动到牌盒
    MVCARD_B2Z:"moveCard_b2z",              //牌盒移动到牌区
    MVCARD_D2B:"moveCard_d2b",              //发牌区到牌盒
    MVCARD_D2Z:"moveCard_d2Z",               //发牌区到牌区
    AUTO_MOVE:"autoMove",                    //智能停靠
    GAME_CONTINUE:"game_continue",            //游戏   
    GAMEOVER:"game_over",                    //游戏结束

    GUIDE_COMPLETE:"guide_complete"         //引导结束
}