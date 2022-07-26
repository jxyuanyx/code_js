// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameStatus } from "../../../gamecore/models/GameStatus";
import GameHelper from "../../../gamecore/tools/GameHelper";
import { UpdateEvent, UpdateService } from "../../../gamecore/tools/updateService";
import { GUIDE_STEPS } from "../../hall/guid/HallGuideConfig";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { AppStatusEnum, CONSTANTS } from "../../GameConfig";
import { SilenceDownloadGame } from "../../gameHelper/SilenceDownloader";
import { EVENTS, PAGES } from "../../hall/scripts/hall";
import { ComDlgData } from "../comdlg/ComDlg";

const {ccclass, property} = cc._decorator;

export enum ENTER_TYPES{
    MATCH_LIST, //进入房间列表
    ENTERGAME,  //进入游戏
    MATCH_DETAILS,   //赛事详情
}

@ccclass
export class DownloadGame extends BaseDlg {

    showMode=DlgEnum.FADE;

    UIBindData={
        progress:"0%",
        icon:null
    }
    
    @property(cc.Sprite)
    spProgress:cc.Sprite=null;

    private _updateService:UpdateService=null;

    afterShow(){
        this.UIBindData.icon=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(this._data.gameData.packageName);

        this._setProgressInfo("0");

        let currentDownloadTask=SilenceDownloadGame.getInstance().getCurrentTask();

        if(currentDownloadTask&&currentDownloadTask.roomType==this._data.gameData.room_type){

            SilenceDownloadGame.getInstance().setTaskCallBack(
                (progress,total)=>{
                    this._progress(progress,total)
                },
                ()=>{
                    this._complete();
                },
                ()=>{
                    this._onDownLoadError(true);
                }
            )

        }else{
            this._updateService=new UpdateService(this._data.path,this._data.gameData.packageName,this._data.gameData.isUnity);
            this._updateService.on(UpdateEvent.CHECK,this._onCheckCb,this);
            this._updateService.on(UpdateEvent.UPDATE,this._onUpdateCb,this);
            this._updateService.on(UpdateEvent.DOWNLOADERROR,this._onDownLoadError,this);
    
            this._updateService.checkUpdate(this._data.url);

            SilenceDownloadGame.getInstance().removeTask(this._data.gameData.room_type,false);
        }

       
    }

    _onDownLoadError(silence?:boolean){
        let data:ComDlgData = new ComDlgData();
        data.title = "Tips";
        data.group = [{name:"Retry",isExit:true,cb:()=>{
            if(silence){
                SilenceDownloadGame.getInstance().retry();
            }else{
                this._updateService.emit(UpdateEvent.REDOWNLOAD);
            }
        }}];
        data.txt = "Connection failure";
        data.clickSpaceHide=false;
        App.DlgManager.showDlg("comdlg",data,"mainpackage");
    }

    _setProgressInfo(progressInfo:string){
        if(this._data.gameData.gameState==GameStatus.NEED_UPDATE){
            this.UIBindData.progress=App.LangManager.getTxtByKey("updating",[progressInfo]);
        }else if(this._data.gameData.gameState==GameStatus.NEED_DOWNLOAD){
            this.UIBindData.progress=App.LangManager.getTxtByKey("downloading",[progressInfo]);
        }
    }

    _onUpdateCb(key:string,code:number,progress:number,total:number){
        switch (code) {
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.sys.localStorage.setItem(key+"_version",this._updateService.getTargetVersion() || "1.0.0");
                this._complete();
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                if(progress>0){
                    this._progress(progress,total);
                }
                break;
        }
    }

    _progress(progress,total){
        this._setProgressInfo(GameHelper.formatByte(progress)+"/"+GameHelper.formatByte(total));
    }

    _complete(){
        this.UIBindData.progress=App.LangManager.getTxtByKey("downloadSuccess");
        this.scheduleOnce(()=>{
            if (this._data.enterType ==ENTER_TYPES.MATCH_DETAILS) {
                this.enterMatch();
            }
            else{
                this.enterGame();
            }
        },0.2)
    }

    _onCheckCb(key:string,code:number){
        switch (code){
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this._updateService.hotUpdate();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.sys.localStorage.setItem(key+"_version",this._updateService.getTargetVersion() || "1.0.0");
                if (this._data.enterType ==ENTER_TYPES.MATCH_DETAILS) {
                    this.enterMatch();
                }
                else{
                    this.enterGame();
                }
                break;
        }
    }

    async enterMatch(){
        if(App.BundleManager.getBundle(this._data.gameData.packageName))
        {
            cc.sys.localStorage.setItem("RestartSubGame",this._data.gameData.packageName);
            this.UIBindData.progress="Download complete, install the game...";
            cc.audioEngine.uncacheAll();
            cc.game.restart();
            return;
        }
        this.hide();
        if (this._data.enterInfo.contest_extra.end_time == 0) {
            let data:ComDlgData = new ComDlgData();
            data.title = App.LangManager.getTxtByKey("tipstitle");
            data.group = [{name:App.LangManager.getTxtByKey("confirm"),isExit:true,cb:()=>{
            }}];
            data.txt = App.LangManager.getTxtByKey("matchtimeout");
            data.clickSpaceHide=false;
            App.DlgManager.showDlg("comdlg",data);
        }
        else{
            App.DlgManager.showDlg("matchdetails", this._data.enterInfo);
        }
        
    }

    async enterGame(){
        //已经加载过的需要重启大厅
        if(App.BundleManager.getBundle(this._data.gameData.packageName))
        {
            cc.sys.localStorage.setItem("RestartSubGame",this._data.gameData.packageName);
            this.UIBindData.progress="Download complete, install the game...";
            cc.audioEngine.uncacheAll();
            cc.game.restart();
            return;
        }

        //App.BundleManager.loadSubGame(this._data.gameData.packageName,(bundle:cc.AssetManager.Bundle)=>{
            //显示匹配界面
            App.DataManager.setGameData(this._data.gameData);
            this.hide();
            //如果是新手引导进来的
            if(this._data.isGuide){
                let gameData=App.DataManager.getGameData();
                let data=await App.HttpManager.postAsync("game_api/match_list",{room_type:gameData.room_type});
                let itemData=data.room_conf.filter(item=>item.match_id==gameData.guidRoomId)[0];
                itemData.isGuide=true;
                // App.DlgManager.showDlg("match",itemData);
                if(!gameData.onlineGame){
                    App.DlgManager.showDlg("match",itemData);
                }else{
                    App.BundleManager.loadSubGame(gameData.packageName,()=>{
                        App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                        App.DlgManager.showDlg("match",itemData,gameData.packageName);
                    })
                }
            }else{
                //App.DlgManager.showDlg("match");
                //cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
                switch(this._data.enterType){
                    case ENTER_TYPES.MATCH_LIST:
                        cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
                        break;
                    case ENTER_TYPES.ENTERGAME:
                        if(!this._data.enterInfo)break
                         //发送匹配命令
                        if (this._data.enterInfo.front_match_type<2) {
                            //双人
                            // App.DlgManager.showDlg("match", this._data.enterInfo);
                            let gameData=App.DataManager.getGameData();
                            if(!gameData.onlineGame){
                                App.DlgManager.showDlg("match",this._data.enterInfo);
                            }else{
                                App.BundleManager.loadSubGame(gameData.packageName,()=>{
                                    App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                                    App.DlgManager.showDlg("match",this._data.enterInfo,gameData.packageName);
                                })
                            }
                        } else {
                            App.DlgManager.showDlg("matchPrize", this._data.enterInfo);
                        }
                        break;
                    case ENTER_TYPES.MATCH_DETAILS: //这里理论上是进不来的 还是加一下
                        if (this._data.enterInfo.contest_extra.end_time == 0) {
                            let data:ComDlgData = new ComDlgData();
                            data.title = App.LangManager.getTxtByKey("tipstitle");
                            data.group = [{name:App.LangManager.getTxtByKey("confirm"),isExit:true,cb:()=>{
                            }}];
                            data.txt = App.LangManager.getTxtByKey("matchtimeout");
                            data.clickSpaceHide=false;
                            App.DlgManager.showDlg("comdlg",data);
                        }
                        else{
                            App.DlgManager.showDlg("matchdetails", this._data.enterInfo);
                        }
                        break;
                }
            }
        //})
    }

    onDestroy(){
        if(this._updateService){
            this._updateService.destroy();
            this._updateService.off(UpdateEvent.CHECK);
            this._updateService.off(UpdateEvent.UPDATE);
            this._updateService.off(UpdateEvent.REDOWNLOAD);
        }
    }

}
