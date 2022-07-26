import { SelfData } from "../../models/SelfData";
import { IDataManager } from "../IDataManager";
import { ServeData } from "../../models/ServeData";
import { AccountData } from "../../models/AccountData";
import BaseGameConfig from "../../models/BaseGameConfig";
import App from "../../App";
import GameItemData from "../../models/GameItemData";
import GameHelper from "../../tools/GameHelper";

export class GameResult{
    totalScore:number;
    steps:string;
    checkCode:string;
    scoreToken:string;
    time:number;
    room_id:number;
    desk_id:number;
    roomType:number;
    uuid:string;
    rsKey:string;
    isUnity:boolean;
    secretKey:string;
    uid:string;
    front_match_type:number;
    end_time:number;
    match_entry_type:number;
    match_entry_value:number
    
}

export const DATA_EVENTS={
    FOUND_NEWUNITYGAMERESULT:"found_newUnityGameResult"
}

const GameResultKey="GameResult"

export class DataManager implements IDataManager{

    saveGameResult() {
        //加密数据
        let str=JSON.stringify(this._unityGameResultSequenece);
        cc.sys.localStorage.setItem(GameResultKey+"_"+this._selfData.uid,GameHelper.AESEncrypResult(str));
    }

    setExtInfo(key: string, data: any) {
        this._extInfo.set(key,data);
    }

    getExtInfo(key: string) {
        return this._extInfo.get(key);
    }

    deleteExtInfo(key:string){
        this._extInfo.delete(key);
    }

    saveDataToLocal(key:string,data:any){
        cc.sys.localStorage.setItem(key,JSON.stringify(data));
    }

    private _gameConfig:any;

    private _gameInitInfo:any;

    private _extInfo:Map<string,any>=new Map();
    private _unityGameResultSequenece:GameResult[]=[];

    constructor(){
       
    }
  

    setGameConfig<T extends BaseGameConfig>(config: T) {
        this._gameConfig=config;
    }
    getGameConfig<T extends BaseGameConfig>(): T {
        return this._gameConfig;
    }


    getAccountData<T extends AccountData>():T{
        return this._accountData;
    }

    setAccountData<T extends AccountData>(accountData:T){
        this._accountData=accountData;

    }

    saveAccountData(){
        if(this._accountData){
            cc.sys.localStorage.setItem("accountInfo",JSON.stringify(this._accountData));
        }
    }

    removeAccountData(){
        cc.sys.localStorage.removeItem("accountInfo");
        cc.sys.localStorage.removeItem("token");
    }

    
    getGameData(): GameItemData {
        return this._gameData;
    }

    setGameData(value: GameItemData){
        this._gameData = value;
    }
    
    private _selfData:SelfData;

    private _serveData:ServeData;

    private _accountData:any;

    private _gameData:GameItemData;

    getSelfData(): SelfData {
        return this._selfData;
    }

    setSelfData(data: SelfData) {
        this._selfData=data;
    }

    getServeData(): ServeData {
        return this._serveData;
    }

    setServeData(data: ServeData) {
        this._serveData=data;
    }

    setGameInitInfo(info: any) {
        this._gameInitInfo=info;
    }

    getGameInitInfo() {
        return this._gameInitInfo;
    }
 
    clearTableData() {
        if(this._gameData){
            this._gameData.isReconnect=false;
            this._gameData.isInGame=false;
            this._gameData.tableData=null;
            this._gameData.isRecord=false;
            App.Net.clearRoomInfo();
        }
    }

    public pushUnityGameResult(gameResult:GameResult){
        cc.error("pushUnityGameResult>>>:",gameResult)
        let isExsit:boolean=false;
        for(let i=0;i<this._unityGameResultSequenece.length;i++){
            let t=this._unityGameResultSequenece[i];
            if((t.secretKey==gameResult.secretKey)){
                isExsit=true;
                break;
            }
        }
        if(!isExsit){
            //做数据压缩
             //@ts-ignore
            LZUTF8.compressAsync(gameResult.steps, {outputEncoding: "StorageBinaryString"},(result, error)=>{
                if (error === undefined){
                    gameResult.steps=result;
                    this._unityGameResultSequenece.push(gameResult);
                    this.saveGameResult();
                    cc.game.emit(DATA_EVENTS.FOUND_NEWUNITYGAMERESULT);
                }
                else
                    console.log("Compression error: " + error.message);
            });
        }else{
            cc.game.emit(DATA_EVENTS.FOUND_NEWUNITYGAMERESULT);
        }
    }

    getGameResultSequence(){
        return this._unityGameResultSequenece;
    }
    
    reset():void{
        this._gameData.tableData=null;
        this._unityGameResultSequenece.splice(0,this._unityGameResultSequenece.length);
    }


    getGameResults(){
        let resluts=cc.sys.localStorage.getItem(GameResultKey+"_"+this._selfData.uid);
        if(resluts){
            this._unityGameResultSequenece=JSON.parse(GameHelper.AESDecrypResult(resluts));
        }
    }
   
}