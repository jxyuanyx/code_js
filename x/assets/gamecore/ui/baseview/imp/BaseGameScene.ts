import {DlgEnum} from "../../../enums/DlgEnum";
import { Package } from "../../../net/Package";
import { BaseComponent } from "./BaseComponent";
import { IBaseScene } from "../IBaseScene";
import { AutoBindHelper } from "../tools/AutoBindHelper";
import {BaseScene} from "./BaseScene";
import {IBaseGameScene} from "../IBaseGameScene";
import {BaseSeatView} from "./BaseSeatView";
import {BaseRoomService} from "./BaseRoomService";
import BaseRoomView from "./BaseRoomView";
import App from "../../../App";
import {RoomCmd} from "../../../net/cmds/RoomCmd";
import { GameResult } from "../../../manager/imps/DataManager";
import { GameEvents } from "../../../events/GameEvents";
import GameHelper from "../../../tools/GameHelper";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseGameScene<View extends BaseRoomView,Service extends BaseRoomService> extends BaseScene implements IBaseGameScene{

    protected _roomView:View;

    protected _roomService:Service;

    protected _gameResult:GameResult=new GameResult();

    onLoad(){
        super.onLoad();
        this._initGameResult();
        this._initCommonResource();
    }   

    _initGameResult(){
        let data=App.DataManager.getGameInitInfo();
        cc.log(data,"_initGameResult>>>>>>>>>>>>>>>>>>>>>>>>>")
        if(!data)return;
        this._gameResult.desk_id=data.desk_id;
        this._gameResult.room_id=data.room_id;
        this._gameResult.roomType=data.room_type;
        this._gameResult.uuid=data.uuid;
        this._gameResult.isUnity=false;
        this._gameResult.scoreToken="";
        this._gameResult.secretKey="";
        this._gameResult.steps="";
        this._gameResult.totalScore=0;
        this._gameResult.uid=App.DataManager.getSelfData().uid.toString();

        this._gameResult.front_match_type = data.front_match_type;
        this._gameResult.end_time = data.end_time;
        this._gameResult.match_entry_value = data.match_entry_value;
        this._gameResult.match_entry_type = data.match_entry_type;

        cc.game.on(GameEvents.GAME_ADDSCORE,this._onAddScore,this);
        cc.game.on(GameEvents.UPLOAD_GAME_RESULT,this._onUploadGameResult,this);
    }

    _onAddScore(score:number){
        let str=score.toString();
        if(score>=0)str="+"+str;
        this._gameResult.totalScore+=score;
        this._gameResult.scoreToken=GameHelper.encryScore(App.DataManager.getGameInitInfo().match_info.token,str,this._gameResult.scoreToken);
    }

    _onUploadGameResult(steps:string){
        this._setGameSteps(steps);
        this._gameResult.checkCode=GameHelper.encryBase64Score(App.DataManager.getGameInitInfo().match_info.token,this._gameResult.scoreToken);
        App.DataManager.pushUnityGameResult(Object.assign({},this._gameResult));
    }

    _setPlayTime(time:number){
        this._gameResult.time=time;
    }

    _setGameSteps(steps:string){
        this._gameResult.steps=steps;
    }

    

    /**
     * 初始化公共
     */
    _initCommonResource(){

    }


    init(view:any,service:any){
        this._roomView=this.node.getComponent(view);
        this._roomService=this.node.getComponent(service);
    }

    _flushRoomInfo(){

    }

    _requestRoomInfo(){
        let gameData=App.DataManager.getGameData();
    }

    beforeEnter(): void {
        //throw new Error("Method not implemented.");
    }

    afterEnter(): void {
        //throw new Error("Method not implemented.");
        this._requestRoomInfo()
    }

    beforeExit(): void {
        //throw new Error("Method not implemented.");
    }

    back(): void {
        //throw new Error("Method not implemented.");
    }
    exit(): void {
        this.beforeExit()
        //throw new Error("Method not implemented.");
    }
}