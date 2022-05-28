import { HumanboyRoomData } from "./HumanboyRoomData";

/**
 * 百人德州数据管理类
 */

class HumanboyDataMgr {

    private static _g_Instance: HumanboyDataMgr = null;                             // 单例
    private _humanboyRoomData: HumanboyRoomData = null;

    /**
     * 获取单例
     */
    static getInstance(): HumanboyDataMgr {
        if (!HumanboyDataMgr._g_Instance) {
            HumanboyDataMgr._g_Instance = new HumanboyDataMgr();
        }
        return HumanboyDataMgr._g_Instance;
    }

    private constructor() {
        this._init();
    }

    private _init(): void {
        // 创建房间结构对象
        if (!this._humanboyRoomData) {
            this._humanboyRoomData = new HumanboyRoomData();
        }
    }

    /**
     * 获取百人房间数据对象
     */
    getHumanboyRoom(): HumanboyRoomData {
        return this._humanboyRoomData;
    }
}

let instance: HumanboyDataMgr = null;
export default instance = HumanboyDataMgr.getInstance();