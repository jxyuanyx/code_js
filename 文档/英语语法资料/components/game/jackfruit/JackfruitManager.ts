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

import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
// import { JackfruitRecordsData, JackfruitRoomData, CardLevel, CardItem, PlayerSettle} from "./JackfruitData";
import { CardNum, CardSuit } from "../../../common/tools/Enum";
import cv from "../../lobby/cv";
import { JackfruitRecordsData, JackfruitRoomData, CardLevel, CardItem, PlayerSettle } from "./JackfruitData";
class JackfruitManager {
    tRoomData:JackfruitRoomData = null;

    // tRoomData: JackfruitRoomData = null;                             // 房间数据
    // tJackPot: JackpotData = null;                           // jackpot数据
    tGameRecords: JackfruitRecordsData = null;                   // 游戏牌局记录
    // tCollectPokerMapData: CollectPokerMapData = null;       // 我的收藏牌谱集合
    private static g_instance: JackfruitManager = null;      // 单例
    private constructor() {                                 // 构造
        this._init();
    }

    static getInstance(): JackfruitManager {
        if (!JackfruitManager.g_instance) {
            JackfruitManager.g_instance = new JackfruitManager();
        }
        return JackfruitManager.g_instance;
    }

    clearData(): void {
        delete(JackfruitManager.g_instance);
        JackfruitManager.g_instance = null;
        JackfruitManager.g_instance = JackfruitManager.getInstance();
    }

    private _init(): void {

        // 房间数据
        this.tRoomData = JackfruitRoomData.getInstance();

        // //JackPot 数据
        // this.tJackPot = JackpotData.getInstance();

        // 初始化游戏记录
        this.tGameRecords = new JackfruitRecordsData();

        // // 初始化"我的收藏牌谱集合"
        // this.tCollectPokerMapData = new CollectPokerMapData();

        // // 游戏数据
        // this.tGameData = new GameData();
    }

    public getPlayerSettleBySeatID(seatID:number):PlayerSettle{
        for (let i = 0; i < this.tRoomData.cachedNotifyMsg.playerSettle.length; i++) {
            let playerSettle = this.tRoomData.cachedNotifyMsg.playerSettle[i];
            let player = playerSettle.player;
            if(seatID == player.seatId)
            {
                return playerSettle;
            }
        }
        return null;
    };

    public getIsAllWinBySeatID(seatID:number):boolean{
        for (let i = 0; i < this.tRoomData.cachedNotifyMsg.playerSettle.length; i++) {
            let playerSettle = this.tRoomData.cachedNotifyMsg.playerSettle[i];
            let player = playerSettle.player;
            if(seatID == player.seatId)
            {
                let isAllWin = false;
                if(playerSettle.headResult.score > 0 && 
                    playerSettle.middleResult.score > 0 &&
                     playerSettle.tailResult.score > 0)
                {
                    isAllWin = true;
                }
                return isAllWin;
            }
        }
        return false;
    };

    public getAllScoreBySeatID(seatID:number):boolean{
        for (let i = 0; i < this.tRoomData.cachedNotifyMsg.playerSettle.length; i++) {
            let playerSettle = this.tRoomData.cachedNotifyMsg.playerSettle[i];
            let player = playerSettle.player;
            if(seatID == player.seatId)
            {
                let isAllWin = false;
                if(playerSettle.headResult.score > 0 && 
                    playerSettle.middleResult.score > 0 &&
                     playerSettle.tailResult.score > 0)
                {
                    isAllWin = true;
                }
                return isAllWin;
            }
        }
        return false;
    };

    private _sortCard(a: CardItem, b: CardItem):number
    {
        return a.number <= b.number? 1:-1
    }

    public getCardListByType(cards:CardItem[], cardtype:CardLevel): CardItem[]
    {
        if(!cards || cards.length < 5) return[];
        let tempList = JSON.parse(JSON.stringify(cards));
        let result:CardItem[][] = [];
        for (let i = CardSuit.CARD_DIAMOND; i < CardSuit.CardSuit_MAX; i++) {
            let list:CardItem[] = [];
            for (let j = 0; j < tempList.length; j++) {
                if(tempList[j].suit == i)
                {
                    list.push(tempList[j]);
                }
            }
            list.sort(this._sortCard.bind(this));
            result.push(list);
        }
        tempList.sort(this._sortCard.bind(this));
        switch (cardtype) {
            case CardLevel.RoyalFlush:
                return this.getRoyalFlush(result);
            case CardLevel.StraightFlush:
                return this.getStraightFlush(result);
            case CardLevel.FourOfAKind:
                return this.getFourOfAKind(tempList);
            case CardLevel.FullHouse:
                return this.getFullHouse(tempList);
            case CardLevel.Flush:
                return this.getFlush(result);
            case CardLevel.StraightI:
                return this.getStraightI(tempList);
            case CardLevel.ThreeOfAKind:
                return this.getThreeOfAKind(tempList);
            case CardLevel.TwoPair:
                return this.getTwoPair(tempList);
            case CardLevel.OnePair:
                return this.getOnePair(tempList);
            case CardLevel.HighCard:
                return this.getHighCard(tempList);
            default:
                return [];
        }
    }

    private _getMultipleCard(cards:CardItem[], num:number): CardItem[]
    {
        let result:CardItem[] = [];
        result.push(cards[0]);
        for (let i = 1; i < cards.length; i++) {
            if(result[0].number != cards[i].number)
            {
                result = [];
            }
            result.push(cards[i]);
            if(result.length == num)
            {
                return result;
            }
        }
        return [];
    }
    private _removeCards(cards:CardItem[], removeList:CardItem[]):CardItem[]
    {
        let result:CardItem[] = [];
        for (let i = 0; i < removeList.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if(cards[j].number == removeList[i].number && cards[j].suit == removeList[i].suit)
                {
                    cards.splice(j, 1);
                }
            }
        }
        return cards;
    }

    /**
     * 获取牌资源路径(resources文件夹内)
     */
    private _getCardResPath(): string {
        let type: number = cv.tools.GetCardFaceJackfruit();
        return cv.StringTools.formatC("zh_CN/game/dzpoker/card/card_type_%d/",type);
    }

    public getRoyalFlush(cards:CardItem[][]): CardItem[]
    {
        let result:CardItem[] = this.getStraightFlush(cards);
        if(result.length == 5)
        {
            return result[0].number == CardNum.CARD_A ? result: [];
        }
        return [];
    }
    public getStraightFlush(cards:CardItem[][]): CardItem[]
    {
        for (let i = 0; i < cards.length; i++) {
            let list = cards[i];
            if(list.length >= 5)
            {
                let result = this.getStraightI(list);
                if(result.length == 5)
                {
                    return result;
                }
            }
        }
        return [];
    }
    private getFourOfAKind(cards:CardItem[]): CardItem[]
    {
        let result = this._getMultipleCard(cards, 4)
        if (result.length != 4) return [];
        cards = this._removeCards(cards, result);
        result.push(cards[0]);
        return result;
    }
    private getFullHouse(cards:CardItem[]): CardItem[]
    {
        let result:CardItem[] = [];
        let three = this._getMultipleCard(cards, 3);
        if (three.length != 3) return [];
        cards = this._removeCards(cards, three);
        let pair = this._getMultipleCard(cards, 2);
        if (pair.length != 2) return [];
        for (let i = 0; i < 3; i++) {
            result.push(three[i])
        }
        for (let i = 0; i < 2; i++) {
            result.push(pair[i])
        }
        return result;
    }
    private getFlush(cards:CardItem[][]): CardItem[]
    {
        let result:CardItem[] = [];
        for (let i = 0; i < cards.length; i++) {
            if(cards[i].length >= 5)
            {
                for (let j = 0; j < 5; j++) {
                    result.push(cards[i][j]);
                }
                return result;
            }
            
        }
        return [];
    }
    private getStraightI(cards:CardItem[]): CardItem[]
    {
        let result:CardItem[] = [];
        result.push(cards[0])
        for (let i = 1; i < cards.length; i++) {
            if(result[result.length - 1].number == cards[i].number + 1)
            {
                result.push(cards[i]);
            }else if(result[result.length - 1].number != cards[i].number)
            {
                result = [];
                result.push(cards[i]);
            }
            if(result.length == 5)
            {
                return result;
            }
        }
        if(result.length == 4 && cards[0].number == CardNum.CARD_A)
        {
            result.push(cards[0]);
            return result;
        }
        return [];
    }
    private getThreeOfAKind(cards:CardItem[]): CardItem[]
    {
        let result:CardItem[] = [];
        let list = this._getMultipleCard(cards, 3)
        if(list.length != 3) return [];
        cards = this._removeCards(cards, list);
        result = list;
        for (let i = 0; i < cards.length; i++) {
            result.push(cards[i]);
            if(result.length == 5)
            {
                return result;
            }
        }
        return [];
    }
    public getTwoPair(cards:CardItem[]): CardItem[]
    {
        let result:CardItem[] = [];
        let pair1:CardItem[] = this._getMultipleCard(cards, 2);
        if(pair1.length != 2) return [];
        cards = this._removeCards(cards, pair1);
        let pair2 = this._getMultipleCard(cards, 2);
        if(pair2.length == 2)
        {
            cards = this._removeCards(cards, pair2);
            result.push(pair1[0]);
            result.push(pair1[1]);
            result.push(pair2[0]);
            result.push(pair2[1]);
            result.push(cards[0]);
            return result;
        }
        return [];
    }
    public getOnePair(cards:CardItem[]): CardItem[]
    {
        let result:CardItem[] = [];
        let list = this._getMultipleCard(cards, 2);
        if(list.length != 2)return []
        result = list;
        cards = this._removeCards(cards, list);
        for (let i = 0; i < cards.length; i++) {
            result.push(cards[i]);
            if(result.length == 5)
            {
                return result;
            }
        }
        return [];
    }
    public getHighCard(cards:CardItem[]): CardItem[]
    {
        let result:CardItem[] = [];
        for (let i = 0; i < cards.length; i++) {
            result.push(cards[i]);
            if(result.length == 5)
            {
                return result;
            }
        }
        return [];
    }

    public getCardTypeStr(level:CardLevel):string
    {  
        let ret = "";
        switch (level) {
            case CardLevel.HighCard: ret = cv.config.getStringData("M_UITitle113"); break;
            case CardLevel.OnePair: ret = cv.config.getStringData("M_UITitle114"); break;
            case CardLevel.TwoPair: ret = cv.config.getStringData("M_UITitle115"); break;
            case CardLevel.ThreeOfAKind: ret = cv.config.getStringData("M_UITitle116"); break;
            case CardLevel.StraightI: ret = cv.config.getStringData("M_UITitle117"); break;
            case CardLevel.Flush: ret = cv.config.getStringData("M_UITitle118"); break;
            case CardLevel.FullHouse: ret = cv.config.getStringData("M_UITitle119"); break;
            case CardLevel.FourOfAKind: ret = cv.config.getStringData("M_UITitle120"); break;
            case CardLevel.StraightFlush: ret = cv.config.getStringData("M_UITitle121"); break;
            case CardLevel.RoyalFlush: ret = cv.config.getStringData("M_UITitle122"); break;
            default: break;
        }
        return ret;
    }
    
    public setCardImg(card: cc.Node, item: CardItem) {
        if (item == null) {
            card.active = false;
            return;
        }
        let number = item.number
        let suit = item.suit
        
        if (number === cv.Number(world_pb.SpecialCards.Cards_Zero)) {
            number = CardNum.CARD_2;
        }

        if (suit == cv.Number(world_pb.SpecialCards.Cards_Zero)) {
            suit = CardSuit.CARD_DIAMOND;
        }

        card.active = true;
        let suitName: string = "";
        switch (suit) {
            case CardSuit.CARD_SPADE: suitName = "Bhm_"; break;
            case CardSuit.CARD_HEART: suitName = "Rhm_"; break;
            case CardSuit.CARD_CLUB: suitName = "Bcm_"; break;
            case CardSuit.CARD_DIAMOND: suitName = "Rbm_"; break;
            default: suitName = "Bhm_"; break;
        }

        if (number >= CardNum.CARD_2 && number < CardNum.CARD_INVALID) {
            let path: string = cv.StringTools.format("{0}{1}{2}", this._getCardResPath(), suitName, number + 1);
            cv.resMgr.setSpriteFrame(card, path);
        } else {
            card.active = false;
        }
    }

    filterCards(cards:CardItem[], target:CardItem[])
    {
        for (let i = 0; i < target.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if(cards[j].number == target[i].number && cards[j].suit == target[i].suit)
                {
                    cards.splice(j, 1);
                    break;
                }
            }
        }
    }
}

let JackfruitMgr: JackfruitManager = null;
export default JackfruitMgr = JackfruitManager.getInstance();
