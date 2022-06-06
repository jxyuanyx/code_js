import video_cowboy = require("../../../../Script/common/pb/video_cowboy");
import videoCowboy_proto = video_cowboy.video_cowboy_proto;

import { HashMap } from "../../../common/tools/HashMap";
import { CardItem } from "../dzPoker/data/RoomData";
import * as Enums from "./../cowboy/CowboyEnum";
import { CardNum } from "../../../common/tools/Enum";
import cv from "../../lobby/cv";

export class CowboyPlayer {
    uid: number = 0;
    name: string = "";
    head: string = "";    // 玩家头像
    totalBetAmount: number = 0;  // 最近总的下注额
    winCount: number = 0;  // 最近赢的总次数
    rank: number = 0;  // 排名
    curCoin: number = 0;  // 当前身上的金额
    keepWinCount: number = 0;// 连赢次数

    reset(): void {
        this.uid = 0;
        this.name = "";
        this.head = "";    // 玩家头像
        this.totalBetAmount = 0;  // 最近总的下注额
        this.winCount = 0;  // 最近赢的总次数
        this.rank = 0;  // 排名
        this.curCoin = 0;  // 当前身上的金额
        this.keepWinCount = 0;// 连赢次数
    }
};

// 玩家的一次下注
export class PlayerOneBet {
    uid: number = 0;
    betOption: number = 0;
    betAmount: number = 0;

    reset(): void {
        this.uid = 0;
        this.betOption = 0;
        this.betAmount = 0;
    }
};

export class BetDetail {
    zone: number = 0;           // 下注区域
    option: number = 0;   // 区域选项
    betAmount: number = 0;       // 下注金额以分为单位(1在游戏数值里面代表100)
    auto: boolean = false;              // 是否自动投
}

// 赔率详情
export class OddsDetail {
    zone: number = Enums.BetZone.ZONE_DUMMY;               // 下注区域
    option: number = Enums.BetZoneOption.BetZoneOption_DUMMY;       // 区域选项
    odds: number = 0;               // 赔率(放大100倍)
    limit: number = 0;          // 选项限额
}

export class RoomParam {
    roomid: number = 0;
    amountLevel: number[] = [];         // 房间下注级别(100 1000 10000)
    oddsDetail: OddsDetail[] = [];     // 赔率详情OddsDetail
    //repeated OptionLimit optionLimit = 4;   // 每个选项的下注上限
    limitPlayers: number = 0;                // 房间最高人数
    deskType: number = 0;                    // 桌子类型
    smallBet: number = 0;                    // 能玩的最小金额
    pictureCn: string[] = [];                  // 房间说明相关的图片
    pictureEn: string[] = [];                  // 房间说明相关的图片
    pictureTh: string[] = [];                  // 房间说明相关的图片

    reset(): void {
        this.roomid = 0;
        this.amountLevel = [];
        this.oddsDetail = [];
        this.limitPlayers = 0;
        this.deskType = 0;
        this.smallBet = 0;
        this.pictureCn = [];
        this.pictureEn = [];
        this.pictureTh = [];
    }
}

export class GameSnapShot {
    param: RoomParam = new RoomParam();
    playerNum: number = 0;             // 当前玩家数量
}

export class TrendData {
    win: number = Enums.BetZoneOption.BetZoneOption_DUMMY;               //输赢结果
    win_patterns: number = 0;           //赢得牌型
    hand_num: number = 0;                  //当前手数
}

export class DailyStat {
    betzone_type: number = Enums.BetZoneOption.BetZoneOption_DUMMY; //下注类型 如果>0 win_pattern == 0
    count: number = 0;               //次数
    win_pattern: number = 0;         //获胜牌型，如果>0 betzone_type ==0 
}

export class TrendRoad {
    road_row: TrendRoadInfo[] = []; //图的一行显示
}

export class TrendRoadInfo {
    win: string = "";   // 'r':红色 'b':蓝色
    eqc: number = 0; // 平的次数 <0 不显示
};


export class PlayerSettle {
    uid: number = 0;
    settle: ZoneSettleDetail[] = [];   //
    totalWinAmount: number = 0;              // 总赢的(中后系统赔的)
    curCoin: number = 0;                     // 当前的金币数量
    keepWinCount: number = 0;                 // 连赢次数

    reset(): void {
        this.uid = 0;
        this.settle = [];
        this.totalWinAmount = 0;
        this.curCoin = 0;
        this.keepWinCount = 0;
    }
}

// 选项上面的下注结果
export class ZoneSettleDetail {
    zone: number = 0;                // 下注区域
    option: number = 0;        // 区域选项
    betAmount: number = 0;
    winAmount: number = 0;            // 这个区域选项的输赢
    isAuto: number = 0;               // 是否是自动投的
}


export class BetNotify {
    uid: number = 0;
    detail: BetDetail = null;       // 当前在某个区域下的注
    curCoin: number = 0;         // 下注后剩余的金币数量
    selfBet: number = 0;         // 自己所在这个选项的总下注
    totalBet: number = 0;        // 这个选项所有玩家总下注
}

/**牛仔 区域结构 */
export class CowboyZoneData {
    result: number;																			// 该区域输赢(0 - 未击中, 1 - 击中)
    luckLoseHand: number;																	// 幸运一击区, 连续多少手未出现(< 0 房间刚刚开始,不需要统计; > 0 多少手; = 0 上一手出现过)
    maxHistoryResultsRetention: number;														// 最大保留的历史记录数量
    option: number;														// 该区域对应枚举
    vHistoryResults: number[];													// 该区域最近的胜负记录

    constructor() {
        this.reset(true);
    }

    reset(bCleanAll: boolean): void {
        this.result = 0;
        this.maxHistoryResultsRetention = 30;
        this.option = Enums.BetZoneOption.BetZoneOption_DUMMY;
        if (bCleanAll) {
            this.luckLoseHand = 0;
            this.vHistoryResults = [];
        }
    }
};

// 公用底栏面板节点信息结构(主要用于按原始缩放比例适配对应节点位置)
export class tGameNodeScale {
    node: cc.Node = null;																		// 对应节点
    scale: number = 0;																					// 原始缩放比例(不一定是1, 具体看设置的初始值)

    constructor(node: cc.Node, scale: number) {
        this.node = node;
        this.scale = scale;
    }
};

export class VideoCowboyRoomData {
    u32Uid: number = 0;	// 自己的uid
    u32RoomId: number = 0;
    roomList: RoomParam[] = [];	// 能玩的房间列表
    snapList: GameSnapShot[] = [];
    pkRoomParam: videoCowboy_proto.RoomParam = videoCowboy_proto.RoomParam.create();	// 当前加入的房间信息
    selfZoneBet: HashMap<number, number> = new HashMap();	// 当前自己的下注. <betOption, amount>
    totalZoneBet: HashMap<number, number> = new HashMap();	// 当前总共的下注. <betOption, amount>
    allZoneBet: HashMap<number, number[]> = new HashMap();	// 所有人下的金额. <betOption, amounts>
    selfPlayer: CowboyPlayer = new CowboyPlayer();
    otherPlayers: CowboyPlayer[] = [];
    curState: number = Enums.RoundState.RoundState_DUMMY;
    nextRoundEndStamp: number = 0;	// 下一个状态的截止时间戳
    leftSeconds: number = 0;	// 到下一个状态还剩余多少时间
    publicCards: CardItem[] = [];	// 公共牌
    redHandCards: CardItem[] = [];	// 红方手牌
    blueHandCards: CardItem[] = [];	// 蓝方手牌
    lasttrendData: TrendData[] = [];
    trendData: TrendData[] = [];
    dailyStat: DailyStat[] = [];
    trendRoad: TrendRoad[] = [];
    lastdailyStat: DailyStat[] = [];
    gamePlayerList: CowboyPlayer[] = [];
    xianluList: string[] = [];
    openCardData: HashMap<number,CardItem> = new HashMap();
    dzplayerNum: number = 0;
    lastRow: number = 0;
    lastCol: number = 0;
    isOpen: boolean = false;

    playerself: CowboyPlayer = new CowboyPlayer();
    curPlayerBet: PlayerOneBet = new PlayerOneBet();	// 当前下注信息

    matchOption: number[] = [];	// 哪几个区域选项赢的
    result: number = 0;	// 0 平 1 牛仔胜 2 小牛胜
    redLevel: number = 0;	// 牛仔的牌型
    blueLevel: number = 0;	// 小牛的牌型
    winCards: CardItem[] = [];	// 哪五张牌赢的
    playerSettles: HashMap<number, PlayerSettle> = new HashMap();	// uid <. 每个人在每个区域的总输赢
    otherPlayersSettle: PlayerSettle = new PlayerSettle();	// 除主界面8个人输赢外其它玩家列表的输赢
    //bool autoBet;	// 是否重复投
    canAuto: boolean = false; // 是否重复投
    historyResults: number[] = [];	// 最近的胜负记录	betOption:	RED_WIN/BLUE_WIN/EQUAL
    stopWorld: number = 0;	// 非0代表系统即将维护
    showTheNewestTrend: boolean = false;	// 趋势列表中是否显示最新一局:由是否翻牌型等来维护
    hasBetInCurRound: boolean = false;	// 当前一局后是否下过注
    backToMainTips: string = "";	// 退出到大厅后弹出的提示内容
    /**是否可更新world服最新金币 */
    bCanUpdateWorldServerGold: boolean = true;
    mapZoneData: HashMap<number, CowboyZoneData> = new HashMap();						// 区域数据容器(若要清除数据请调用 clearMapZoneData 接口)

    llCoinUICritical: number = 0;															            // 显示金币还是显示金砖的临界值
    iUsedAutoBetCount: number = 0;															            // 已经使用的续投次数
    iSelectAutoBetCount: number = 0;														            // 选择的高级续投次数
    canAdvanceAuto: boolean = false;															        // 是否可高级续投(避免同一局多次重连导致多次自动续投)
    eAutoLevel: number = videoCowboy_proto.AutoBetLevel.Level_Normal;		                                // 续投等级 1 高级  0 普通
    vAutoBetCountList: number[];													                    // 配置的续投档次列表
    vBetCoinOption: number[];													                        // 对应房间级别的下注金额选项(高级设置当前勾选的)
    change_points: number = 0;
    idle_roomid: number = 0;
    constructor() {
        this.Reset();
    }

    Reset(): void {
        this.u32RoomId = 0;
        this.pkRoomParam = videoCowboy_proto.RoomParam.create();
        this.selfZoneBet.clear();
        this.totalZoneBet.clear();
        this.allZoneBet.clear();
        this.otherPlayers = [];
        this.selfPlayer.reset();
        this.curState = Enums.RoundState.GAME_PENDING;
        this.nextRoundEndStamp = 0;
        this.leftSeconds = 0;
        this.publicCards = [];
        this.redHandCards = [];
        this.blueHandCards = [];
        this.playerSettles.clear();
        this.otherPlayersSettle.reset();
        this.trendData = [];
        this.lasttrendData = [];
        this.dailyStat = [];
        this.trendRoad = [];
        this.lastdailyStat = [];
        this.curPlayerBet.reset();
        this.gamePlayerList = [];
        this.openCardData.clear();
        this.playerself.reset();

        this.matchOption = [];
        this.clearMapZoneData(false);
        this.result = -1;
        this.redLevel = 0;
        this.blueLevel = 0;
        this.winCards = [];
        this.canAuto = false;
        this.historyResults = [];
        this.stopWorld = 0;
        this.idle_roomid = 0;
        this.showTheNewestTrend = true;
        this.hasBetInCurRound = false;
        this.bCanUpdateWorldServerGold = true;
        this.backToMainTips = "";
        this.lastRow = -1;
        this.lastCol = -1;
        this.dzplayerNum = 0;
        this.isOpen = false;
        this.llCoinUICritical = 0;
        this.iUsedAutoBetCount = 0;
        this.iSelectAutoBetCount = 0;
        this.eAutoLevel = videoCowboy_proto.AutoBetLevel.Level_Normal;
        this.vAutoBetCountList = [];
        this.vBetCoinOption = [];
        this.change_points = 0;
    }

    // 每局开始数据清理
    ResetRound(): void {
        // 牌
        this.publicCards = [];
        this.redHandCards = [];
        this.blueHandCards = [];

        // 左右玩家列表
        this.otherPlayers = [];

        // 上一局下注信息
        this.selfZoneBet.clear();
        this.openCardData.clear();
        this.totalZoneBet.clear();
        this.allZoneBet.clear();

        // 胜负纪录
        this.historyResults = [];

        // 其他
        this.curPlayerBet.reset();
        this.matchOption = [];
        this.result = -1;
        this.redLevel = 0;
        this.blueLevel = 0;
        this.winCards = [];
        this.playerSettles.clear();
        this.otherPlayersSettle.reset();
        this.hasBetInCurRound = false;
        this.change_points = 0;
    }

    updateSelfPlayer(player: CowboyPlayer): void {
        this.selfPlayer.uid = player.uid;
        this.selfPlayer.name = player.name;
        this.selfPlayer.head = player.head;
        this.selfPlayer.totalBetAmount = player.totalBetAmount;
        this.selfPlayer.winCount = player.winCount;
        this.selfPlayer.rank = player.rank;
        this.selfPlayer.curCoin = player.curCoin;
        this.selfPlayer.keepWinCount = player.keepWinCount;
    }

    addPlayer(player: CowboyPlayer): void {
        let newPlayer: CowboyPlayer = new CowboyPlayer();
        newPlayer.uid = player.uid;
        newPlayer.name = player.name;
        newPlayer.head = player.head;
        newPlayer.totalBetAmount = player.totalBetAmount;
        newPlayer.winCount = player.winCount;
        newPlayer.rank = player.rank;
        newPlayer.curCoin = player.curCoin;
        newPlayer.keepWinCount = player.keepWinCount;

        this.otherPlayers.push(newPlayer);
    }

    removePlayer(uid: number): void {
        let len = this.otherPlayers.length;
        for (let i = 0; i < len; i++) {
            if (this.otherPlayers[i].uid == uid) {
                this.otherPlayers.splice(i, 1);
                break;
            }
        }
    }

    updatePlayerCoin(uid: number, coin: number): void {
        if (uid == this.u32Uid) {
            this.selfPlayer.curCoin = coin;
            return;
        }

        let len = this.otherPlayers.length;
        for (let i = 0; i < len; i++) {
            if (this.otherPlayers[i].uid == uid) {
                this.otherPlayers[i].curCoin = coin;
                break;
            }
        }
    }

    getOtherPlayerByUid(uid: number): CowboyPlayer {
        let len = this.otherPlayers.length;
        for (let i = 0; i < len; i++) {
            if (this.otherPlayers[i].uid == uid) {
                let player = new CowboyPlayer();
                player = this.otherPlayers[i];
                return player;
            }
        }
        return null;
    }

    // 更新连赢次数
    updatePlayerKeepWinCount(uid: number, keepWinCount: number): void {
        if (this.selfPlayer.uid == uid) {
            this.selfPlayer.keepWinCount = keepWinCount;
        }
        let len = this.otherPlayers.length;
        for (let i = 0; i < len; i++) {
            if (this.otherPlayers[i].uid == uid) {
                this.otherPlayers[i].keepWinCount = keepWinCount;
            }
        }
    }

    getPlayerKeepWinCountByUid(uid: number): number {
        if (this.selfPlayer.uid == uid) {
            return this.selfPlayer.keepWinCount;
        }

        let len = this.otherPlayers.length;
        for (let i = 0; i < len; i++) {
            if (this.otherPlayers[i].uid == uid) {
                return this.otherPlayers[i].keepWinCount;
            }
        }
        return 0;
    }

    // 更新某个选项的下注信息
    updateZoneBet(uid: number, option: number, selfBet: number, totalBet: number): void {
        // 自己的下注
        if (uid == this.u32Uid) {
            this.selfZoneBet.add(option, selfBet);
        }

        // 总共的下注
        this.totalZoneBet.add(option, totalBet);
    }

     updateOpenCardData( data: videoCowboy_proto.WrapCard): void {
		let index = data.cardIndex;
		let it:CardItem = this.openCardData.get(index);
		if (it) {
			it.number = (data.card.number);
			it.suit =(data.card.suit);
		}
		else {
			let cardItem: CardItem = new CardItem();
			cv.StringTools.deepCopy(data.card, cardItem);
			this.openCardData.add(index, cardItem);
		}
	}

    // 更新当前下注
    updateCurOneBet(uid: number, detail: BetDetail): void {
        this.curPlayerBet.uid = uid;
        this.curPlayerBet.betOption = detail.option;
        this.curPlayerBet.betAmount = detail.betAmount;
    }

    removeCurrentHistoryResult(): number {
        if (this.historyResults.length > 0) {
            return this.historyResults.pop();
        }
        return -1;
    }

    addCurrentHistoryResult(result: number): void {
        this.historyResults.push(result);
    }

    // 清除区域数据
    clearMapZoneData(bCleanAll: boolean): void {
        this.mapZoneData.forEach((key: number, value: CowboyZoneData) => {
            value.reset(bCleanAll);
        });
    }
};