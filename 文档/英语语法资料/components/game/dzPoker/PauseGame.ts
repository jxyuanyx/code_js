import cv from "../../lobby/cv";

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
export default class PauseGame extends cc.Component {
    @property(cc.Button) start_Btn: cc.Button = null; //倒计时读秒
    onLoad(){
        cv.StringTools.setLabelString(this.node, "bg/pausePoker_txt", "GameScene_pausePoker_panel_pausePoker_txt");
        cv.StringTools.setLabelString(this.node, "bg/hasPause_txt", "GameScene_pausePoker_panel_hasPause_txt");
        cv.StringTools.setLabelString(this.node, "bg/start_button/Label", "GameScene_pausePoker_panel_start_button");
    }
    public onContinue(evt)
    {
        cv.gameNet.RequestPauseGame(cv.GameDataManager.tRoomData.u32RoomId,false)
    }
    public setStartBtn(){
        let isSelf: boolean = cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId;
        this.start_Btn.node.active = isSelf
    }
}
