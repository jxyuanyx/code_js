import * as Enums from "./CowboyEnum";
import { CardItem } from "../dzPoker/data/RoomData";

//uint32 deskType = 4; // 1 初级 2 中级 3 高级

export class OptionOdds {
    option: number =  Enums.BetZoneOption.BetZoneOption_DUMMY;
    odds: number = 0;
};

export class CowBoyGameHandRecord {
    u64GameUUID: number = 0;
    u32Roomid: number = 0;
    u32Desktype: number = 0;
    handnum: number = 0;
    startat: number = 0;
    endat: number = 0;
    gameid: number = 0;
    redHandCards: CardItem[] = [];
    blueHandCards: CardItem[] = [];
    publicHandCards: CardItem[] = [];
    winHandCards: CardItem[] = [];
    surpriseOption: OptionOdds[] = [];
    result: number = 0;
    redLevel: number = 0;
    blueLevel: number = 0;
    totalBet: number = 0;
    sysWin: number = 0;
};

export class PlayerBetSettle {
    option: number =  Enums.BetZoneOption.BetZoneOption_DUMMY;
    betAmount: number = 0;
    winAmount: number = 0;
};

export class CowBoyPlayerRecord {
    u64GameUUID: number = 0;
    uid: number = 0;
    name: string = "";
    head: string = "";
    handnum: number = 0;
    settles: PlayerBetSettle[] = [];
    totalBet: number = 0;
    totalWinBet: number = 0;
};

export class CowBoyPlayerHandData {
    gameuuids: number[] = [];
    totalTodaybet: number = 0;
    totalTodaywin: number = 0;
    detail: CowBoyGameHandRecord = new CowBoyGameHandRecord();
    settle: CowBoyPlayerRecord = new CowBoyPlayerRecord();
};