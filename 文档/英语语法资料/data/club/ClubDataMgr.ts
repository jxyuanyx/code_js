import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import { ClubData } from "./ClubData";
import cv from "../../components/lobby/cv";

/**
 * 俱乐部管理类
 */
export class ClubDataManager {
    private static g_instance: ClubDataManager = null;                              // 单例
    private _club_list: ClubData[] = [];                                            // 当前自己所在的属俱乐部列表
    private _clubCurrentBoardList: world_pb.ClubGameSnapshot[] = [];                // 俱乐部当前正在进行的牌局
    private _curOpClubID: number = 0;                                               // 当前操作的俱乐部id
    private _curSearchClubData: ClubData = new ClubData();
    private _isClickManger:boolean = false;
    private constructor() {
        this._init();
    }

    static getInstance(): ClubDataManager {
        if (!ClubDataManager.g_instance) {
            ClubDataManager.g_instance = new ClubDataManager();
        }
        return ClubDataManager.g_instance;
    }

    // 初始化接口
    private _init(): void {
    }

    setClickManger(isclick:boolean){
        this._isClickManger = isclick;
    }

    isClickManger():boolean{
        return this._isClickManger;
    }
    /**
     * 设置当前操作俱乐部id
     */
    setCurOpClubID(club_id: number): void {
        this._curOpClubID = club_id;
    }

    /**
     * 设置当前使用的搜索俱乐部
     */
    setCurSearchClubData(club_data: ClubData): void {
        if (club_data === null || typeof (club_data) === "undefined") {
            club_data = new ClubData();
        }
        this._curSearchClubData.copyFrom(club_data);
    }

    /**
     * 获取当前使用的搜索俱乐部
     */
    getCurSearchClubData(): ClubData {
        return this._curSearchClubData;
    }

    /**
     * 获取当前操作俱乐部
     */
    getCurOpClubData(): ClubData {
        let tRet: ClubData = null;
        for (let i = 0; i < this._club_list.length; ++i) {
            let data: ClubData = this._club_list[i];
            if (this._curOpClubID === data.club.club_id) {
                tRet = data;
                break;
            }
        }

        if (!tRet) {
            tRet = this.getCurSearchClubData();
        }

        return tRet;
    }

    /**
     * 清空"当前操作的俱乐部"对象缓存
     */
    clearCurOpClubTmp(): void {
        this.setCurOpClubID(0);
        this.setCurSearchClubData(null);
    }

    /**
     * 获取俱乐部列表
     */
    getClubDataList(): ClubData[] {
        return this._club_list;
    }

    /**
     * 添加俱乐部数据至列表
     * @param data      要push的数据对象
     * @param deepCopy  是否深拷贝(默认false)
     */
    addClubData(data: ClubData, deepCopy?: boolean): void {
        if (!data) return;

        for (let i = 0; i < this._club_list.length; ++i) {
            if (this._club_list[i].club.club_id === data.club.club_id) {
                this._club_list[i].copyFrom(data);
                return;
            }
        }

        let clubData = data;
        if (deepCopy) {
            clubData = new ClubData();
            clubData.copyFrom(data);
        }

        this._club_list.push(clubData);
    }

    /**
     * 通过俱乐部ID获取俱乐部对象
     * @param clubID 
     */
    getClubDataByID(clubID: number): ClubData {
        let retValue: ClubData = null;
        for (let i = 0; i < this._club_list.length; ++i) {
            if (this._club_list[i].club.club_id === clubID) {
                retValue = this._club_list[i];
                break;

            }
        }
        return retValue;
    }

    /**
     *  从列表中移除俱乐部数据
     */
    removeClubDataByID(club_id: number): void {
        for (let i = 0; i < this._club_list.length; ++i) {
            if (this._club_list[i].club.club_id === club_id) {
                this._club_list.splice(i, 1);
                return;
            }
        }
    }

    /**
     * 移除所有俱乐部数据
     */
    removeAllClubData(): void {
        if (this._club_list.length <= 0) return;
        this._club_list.splice(0, this._club_list.length);
        this._club_list.length = 0;
        this._club_list = [];
    }

    /**
     * "俱乐部"当前正在进行的牌局
     */
    getClubCurrentBoardList(): world_pb.ClubGameSnapshot[] {
        return this._clubCurrentBoardList;
    }

    /**
     * 指定的俱乐部ID是否包含在自己所在的俱乐部里
     */
    isIncludedOwnClubs(clubID: number): boolean {
        let retValue: boolean = false;
        for (let i = 0; i < this._club_list.length; ++i) {
            if (clubID === this._club_list[i].club.club_id) {
                retValue = true;
                break;
            }
        }
        return retValue;
    }

    /**
     * 获取自己"创建"的俱乐部ID(若没有, 则返回0)
     */
    getMyCreatedClubID(): number {
        let retValue: number = 0;
        let selfID: number = cv.dataHandler.getUserData().u32Uid;
        for (let i = 0; i < this._club_list.length; ++i) {
            if (selfID === this._club_list[i].club.club_owner) {
                retValue = this._club_list[i].club.club_id;
                break;
            }
        }
        return retValue;
    }
}
