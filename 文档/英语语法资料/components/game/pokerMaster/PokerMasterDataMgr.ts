import { PokerMasterRoomData } from "./PokerMasterRoomData";

/**
 * 百人德州数据管理类
 */

class PokerMasterDataMgr {

    private static _g_Instance: PokerMasterDataMgr = null;                             // 单例
    private _pokerMasterRoomData: PokerMasterRoomData = null;

    /**
     * 获取单例
     */
    static getInstance(): PokerMasterDataMgr {
        if (!PokerMasterDataMgr._g_Instance) {
            PokerMasterDataMgr._g_Instance = new PokerMasterDataMgr();
        }
        return PokerMasterDataMgr._g_Instance;
    }

    private constructor() {
        this._init();
    }

    private _init(): void {
        // 创建房间结构对象
        if (!this._pokerMasterRoomData) {
            this._pokerMasterRoomData = new PokerMasterRoomData();
        }
    }

    /**
     * 获取房间数据对象
     */
    getPokerMasterRoom(): PokerMasterRoomData {
        return this._pokerMasterRoomData;
    }
}

let instance: PokerMasterDataMgr = null;
export default instance = PokerMasterDataMgr.getInstance();