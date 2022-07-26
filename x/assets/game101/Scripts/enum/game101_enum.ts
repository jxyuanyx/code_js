
export const Game101Events={
    CHECKOVER:"check_over",                    //游戏结束
    GAME_CONTINUE:"game_continue",            //游戏 
    TIMEUPDATE:"game_timeupdate"                //时间结束
}

export enum BlackJack{
    "4b",
    "2b"
}

export enum Game101CardTypeScore{
    TWENTYONE = 400,
    FIVEDRAGON = 600,
    WILD = 200,
    GREATSTREAK = 250,
    SUPERSTREAK = 500, 
    NOTBUSTED = 350,
    ALLCLEAR = 1000,
}
export enum Game101Prefab{
    effect = "prefabs/effect/effect",
}

export enum Game101Effect{
    paixiaoshi = "prefabs/effect/anim/cardClear/paixiaoshi",
    yanhua = "prefabs/effect/anim/fire/yanhua",
    cardType = "prefabs/effect/anim/cardType/zixing",
    groupLight = "prefabs/effect/anim/groupLight/kuangguang",
    undoBtnLight = "prefabs/effect/anim/returnbtn/chexiaoanniu",
    tishiLight = "prefabs/effect/anim/groupLight/tishiguang",
    jifenzengjia = "prefabs/effect/anim/jifenzengjia/jifenzengjia",
    fenzhongdaojishi = "prefabs/effect/anim/timetip/fenzhongdaojishi"
}

export enum Game101CardAnim{
    ALLCLEAR = "1_ALL CLEAR",
    NOBUSTBONUS ="1_NO BUST BONUS",
    GAMECOMPLETE = "2_GAME COMPLETE",
    OUTOFMOVES = "2_OUT OF MOVES",
    TIMEISUP = "2_TIME IS UP",
    BUSTED = "3_BUSTED",
    FIVECARDS = "4_5CARDS",
    TWENTYONE = "4_21",
    WILD = "4_WILD",
    GREATSTREAK = "5_GREAT STREAK",
    MEGASTREAK = "5_MEGA STREAK",
    SUPERSTREAK = "5_SUPER STREAK",

}

export enum Game101CardZone{
    CARDS,
    CURRENT,
    RETENTION,
    CARDGROUP,
}

export enum Game101CardZIndex{
    CARDS = 10,
    CURRENT = 100,
    RETENTION = 110,
    CARDGROUP = 120,
}

export enum Game101ClearType{
    BOMB = 0,
    UNCLEAR = 1,
    FINISHPOINT = 2,
    FIVEDRAGON = 3,
    BLACKJACK = 4,
}

export enum Game101Process{
    ENTER = 100,
    C2P = 101,
    C2H = 102,
    H2C = 103,
    UNDO = 104,
    GAMEOVER = 105
}

export enum Game101BonusType{
    NoBomb = 0,
    AllClear = 1
}

export enum Game101ArrType{
    BOMB = 2,
    ARRLOW = 0,
    ARRHIGH = 1
}

export enum Game101Time{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}