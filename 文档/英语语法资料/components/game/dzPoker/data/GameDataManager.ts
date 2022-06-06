// 游戏数据管理类

/* 为了方便外部阅读, 规定对应实例命名
 * class    - t开头
 * number   - n开头
 * string   - s开头
 * boolean  - b开头
 * Array    - v开头
 * Enum     - e开头
 * hashmap  - m开头
*/

import game_protocol = require("../../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../lobby/cv";
import { RoomData } from "./RoomData";
import { GameData } from "./GameData";
import { JackpotData } from "./JackpotData";
import { GiftData } from "../gift/GiftData";
import { GameRecordsData, CollectPokerMapData } from "./RecordData";

export class BarrageCountData {
    public count: number;
    public BarrageId: number;
    public content: string;
}
class GameDataManager {
    tRoomData: RoomData = null;                                                 // 房间数据
    tJackPot: JackpotData = null;                                               // jackpot数据
    tGameRecords: GameRecordsData = null;                                       // 游戏牌局记录
    tCollectPokerMapData: CollectPokerMapData = null;                           // 我的收藏牌谱集合
    tGameData: GameData = null;                                                 // 游戏数据
    tGiftData: GiftData = null;                                                 // 礼物数据
    bIsAuthMicphone: boolean = false;
    bIsAuthLocation: boolean = false;
    private danmuMsgs: game_pb.NoticeSendBarrage[] = [];                        //  他人弹幕数据
    public danmuCounts: BarrageCountData[] = [];
    private static g_instance: GameDataManager = null;                          // 单例
    private constructor() {                                                     // 构造
        this._init();
    }

    static getInstance(): GameDataManager {
        if (!GameDataManager.g_instance) {
            GameDataManager.g_instance = new GameDataManager();
        }
        return GameDataManager.g_instance;
    }

    clearData(): void {
        GameDataManager.g_instance = null;
        GameDataManager.g_instance = GameDataManager.getInstance();
    }

    //获取一条弹幕信息
    public getDanmuMsg(): game_pb.NoticeSendBarrage {
        return this.danmuMsgs.shift();
    }

    //增加一条弹幕信息(避免有多条自己的弹幕时  会出现先后顺序颠倒的问题  这里拆分成两个数组)
    public addDanmuMsg(msg: game_pb.NoticeSendBarrage) {
        if (msg.ctype == game_pb.BarrageType.Enum_PlayerEnters || msg.playerid == cv.Number(cv.dataHandler.getUserData().user_id)) {
            this.danmuMsgs.unshift(msg);
        }
        else {
            this.danmuMsgs.push(msg);
        }
    }

    /**
     * 更新使用次数
     */
    public updateBarrageCount(data: game_pb.IBarrageCount) {
        for (let index = 0; index < this.danmuCounts.length; index++) {
            if (data.BarrageId == this.danmuCounts[index].BarrageId) {
                this.danmuCounts[index].count = data.UseCount;
            }
        }
        this.sortBarrageData();
    }

    /**
     * clearBarrageData
     */
    public clearBarrageData() {
        this.danmuCounts = [];
    }
    /**
     * 增加一条弹幕使用数据
     */
    public addBarrageData(data: BarrageCountData) {
        this.danmuCounts.push(data);
    }

    /**
     * 给弹幕数据排序
     */
    public sortBarrageData() {
        this.danmuCounts.sort(this.sortByUserCount.bind(this));
        for (let i = 0; i < this.danmuCounts.length; i++) {
            console.log(cv.StringTools.formatC("index:%d baId:%d  usecount:%d content:%s", i, this.danmuCounts[i].BarrageId, this.danmuCounts[i].count, this.danmuCounts[i].content));

        }
    }

    /**
     * getBar
     */
    public getBarrageData(): BarrageCountData[] {
        return this.danmuCounts;
    }
    /**
     * name
     */
    public sortByUserCount(a: BarrageCountData, b: BarrageCountData) {
        if (a.count > b.count) {
            return -1;
        }
        else if (a.count < b.count) {
            return 1;
        }
        else if (a.count == b.count) {
            if (a.BarrageId < b.BarrageId) {
                return -1;
            }
            else if (a.BarrageId > b.BarrageId) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    //清除弹幕
    public clearDanmuMsg() {
        this.danmuMsgs = [];
    }

    private _init(): void {
        // 房间数据
        this.tRoomData = RoomData.getInstance();

        //JackPot 数据
        this.tJackPot = JackpotData.getInstance();

        // 初始化游戏记录
        this.tGameRecords = new GameRecordsData();

        // 初始化"我的收藏牌谱集合"
        this.tCollectPokerMapData = new CollectPokerMapData();

        // 游戏数据
        this.tGameData = new GameData();

        // 礼物数据
        this.tGiftData = new GiftData();
    }
}

let gameDataMgr: GameDataManager = null;
export default gameDataMgr = GameDataManager.getInstance();
