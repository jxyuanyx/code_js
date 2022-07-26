import { SelfData } from "../models/SelfData";
import {Game} from "../models/Game";
import { ServeData } from "../models/ServeData";
import { AccountData } from "../models/AccountData";
import BaseGameConfig from "../models/BaseGameConfig";
import GameItemData from "../models/GameItemData";
import { GameResult } from "./imps/DataManager";
export interface IDataManager{
    /**
     * 设置自已的信息
     */
    setSelfData(data:SelfData);


    /**
     * 获取自己的信息
     */
    getSelfData():SelfData;
    
    /**
     * 获取当前在玩的游戏数据
     */
    getGameData(): GameItemData;

    
    setGameData(value:GameItemData);

    getServeData():ServeData;

    setServeData(serveData:ServeData);

    getAccountData<T extends AccountData>():T;

    saveAccountData():void;

    removeAccountData():void;

    setAccountData<T extends AccountData>(accountData:T);

    setGameConfig<T extends BaseGameConfig>(config:T);

    getGameConfig<T extends BaseGameConfig>():T;

    setExtInfo(key:string,data:any);

    getExtInfo(key:string):any;

    deleteExtInfo(key:string):any;

    setGameInitInfo(info:any);

    getGameInitInfo():any;

    clearTableData():any;

    pushUnityGameResult(gameResult:GameResult);

    getGameResultSequence():GameResult[];

    /**
     * 保存游戏结果
     */
    saveGameResult();

    saveDataToLocal(key:string,data:any);

    getGameResults():void;

    reset():void;
}