import cv from "../../lobby/cv";
import { GameScene } from "./GameScene";
import { BuyinList } from "./BuyinList";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class HouseOwer extends cc.Component {
    @property(cc.Label) public timeCount :cc.Label = null;
    @property(cc.Button) public dissolve_button :cc.Button = null;
    @property(cc.Button) public pause_button :cc.Button = null;
    @property(cc.Prefab) public currentTime_prefab: cc.Prefab = null;

    public game: GameScene;
    
    onLoad(){
        cv.StringTools.setLabelString(this.node, "bg/houseOwerTitle_txt", "GameScene_houseOwer_panel_houseOwerTitle_txt");
        cv.StringTools.setLabelString(this.node, "bg/buyinInfo_button/Label", "GameScene_houseOwer_panel_buyinInfo_button");
        cv.StringTools.setLabelString(this.node, "bg/dissolve_button/Label", "GameScene_houseOwer_panel_dissolve_button");
        cv.StringTools.setLabelString(this.node, "bg/pause_button/Label", "GameScene_houseOwer_panel_pause_button");
        cv.StringTools.setLabelString(this.node, "bg/addTime_button/Label", "GameScene_houseOwer_panel_addTime_button");
        cv.StringTools.setLabelString(this.node, "bg/addTime_button/left_text", "GameScene_houseOwer_panel_addTime_button_left_text");
    }

    public setGameScene(game: GameScene) {
		this.game = game;
    }
    
    public setTimeOut() {
        this.timeCount.string = cv.GameDataManager.tRoomData.u32DelayLeft.toString();
        this.updateBtn();
	}
    public onClickSelf(evt)
    {
        this.node.active = false;
    }
    public onClickBuyinInfo(evt)
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = true;
        this.game.dairu_panel.active = true;
        cv.gameNet.RequestPlayerBuyinsInfo(cv.GameDataManager.tRoomData.u32RoomId);
    }
    public onClickDissolve(evt)
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
        this.dissolve_button.enabled = false;
        cv.TP.showMsg(cv.config.getStringData("UIGameSceneTips19"), cv.Enum.ButtonStyle.TWO_BUTTON, this.DoDestroyRoom.bind(this),this.noDestroyRoom.bind(this));
    }
    public onClickPause(evt)
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
        cv.gameNet.RequestPauseGame(cv.GameDataManager.tRoomData.u32RoomId,true)
    }
    public onClickAddTime(evt)
    {
        cv.AudioMgr.playButtonSound('button_click');
        //this.dissolve_button.disabledColor = cc.color(100,100,100);
        this.node.active = false;
        cv.TP.showMsg(cv.config.getStringData("UIGameSceneTips21"),cv.Enum.ButtonStyle.TWO_BUTTON,this.DoAddRoomTime.bind(this),null)
    }

    private DoDestroyRoom()
    {
        cv.gameNet.RequestDestroyRoom(cv.GameDataManager.tRoomData.u32RoomId);
    }
    private noDestroyRoom()
    {
        this.dissolve_button.disabledColor = cc.color(255,255,255);
        this.dissolve_button.enabled = true;
    }
    private DoAddRoomTime(){
        cv.gameNet.RequestAddRoomTime(cv.GameDataManager.tRoomData.u32RoomId);
    }

    public updateBtn(){
        if (cv.GameDataManager.tRoomData.pkRoomState.isBegin) {
            this.pause_button.interactable = !cv.GameDataManager.tRoomData.pkRoomState.isPause;
            if(!cv.GameDataManager.tRoomData.pkRoomState.isPause){
                this.pause_button.node.color = cc.color(255, 255, 255) ;
            }
        }
        else {
            this.pause_button.interactable = false;
            this.pause_button.node.color = cc.color(166, 166, 166) ;
        }
    }
}
