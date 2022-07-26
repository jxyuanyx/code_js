// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { NewRechargeStatus, RewardEnum } from "../../../../gamecore/enums/RewardEnum";
import { TagEnum } from "../../../../gamecore/enums/TagEnum";
import { Game } from "../../../../gamecore/models/Game";
import GameItemData from "../../../../gamecore/models/GameItemData";
import { GameStatus } from "../../../../gamecore/models/GameStatus";
import { DlgSequecene } from "../../../../gamecore/tools/DlgSequecene";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import { TimeEvent_End, TimeManager, TimeTask } from "../../../../gamecore/tools/TimeManager";
import {Banner,BannerData,BANNER_CLICK} from "../../../../gamecore/ui/components/common/banner/Banner";
import ListAdapter from "../../../../gamecore/ui/components/common/ListAdapter";
import ListView, { AbsAdapter } from "../../../../gamecore/ui/components/common/ListView";
import GodGuide from "../../../../gamecore/ui/components/guid/GodGuide";
import { ENTER_TYPES } from "../../../../mainpackage/dialogs/downloadgame/DownloadGame";
import { REWARDSTATU } from "../../../../mainpackage/dialogs/reward/drawReward/drawLayer/DrawReward";
import { AppStatusEnum, CONSTANTS, Games } from "../../../../mainpackage/GameConfig";
import { checkGameStatus, formatCurrency, playEffect } from "../../../../mainpackage/gameHelper/AthHelper";
import { DownLoadTask, SilenceDownloadGame } from "../../../../mainpackage/gameHelper/SilenceDownloader";
import { GUIDE_STEPS } from "../../../../mainpackage/hall/guid/HallGuideConfig";
import PageBase from "../../../../mainpackage/hall/scripts/PageBase";
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../../../mainpackage/services/RedTipService";
import { EVENTS, PAGES, UpdateSeasonPool } from "../../scripts/hallcheck01";

import Bundle = cc.AssetManager.Bundle;

const {ccclass, property} = cc._decorator;

const ALLOW_GAMES=["game100"]

//export const EVENT_SELECTGAME="selectGame";

/*
const enum STATUS{
    NONE,
    SERVICING,      //游戏维护中
    NOTOPEN         //未开放
}*/

const ACTIVITY_DLGS={
    "1002":"mainpackage_reward/payReward",
    "1001":"mainpackage_reward/drawReward/loginReward",
    "1003":"mainpackage_reward/drawReward/drawLayer",
    "1006":"mainpackage_reward/newRecharge",
    "10060001":"mainpackage_reward/newRechTask"
}

const NEWLIGHT:string = `textures/anims/reward/pay/tips/xiaokuangxuanguang`;

const NEWRECHARGE_DLGS=
["mainpackage_reward/newRecharge",
"mainpackage_reward/newRechTask"]

export const GAMEITEMCLICK="gameItemClick";

export const ACT_SHOW="act_show";
export const ACT_REQUEST="act_request";

export const FLUSH_REWARDTIME = "flush_rewardtime";

@ccclass
export  class GamePageCheck extends PageBase {

    @property([cc.Node])
    acRed:cc.Node[] = [];

    @property([cc.Node])
    activity:cc.Node[] = [];

    @property(ListView)
    gameList:ListView<any>;

    @property(Banner)
    banner:Banner;

    @property(cc.Node)
    content:cc.Node;

    private _bannerData:Map<string,BannerData>=new Map();

    private _actvityIconMap:Map<string,cc.Node>=new Map();

    onLoad(){
        super.onLoad();

        for(let i=0;i<this.activity.length;i++){
            this.activity[i].active=false;
        }

        this._actvityIconMap.set(String(RewardEnum.PAYREWARD),this.activity[0]);
        this._actvityIconMap.set(String(RewardEnum.LOGINREWARD),this.activity[1]);
        this._actvityIconMap.set(String(RewardEnum.DRAWREWARD),this.activity[2]);
        // this._actvityIconMap.set(String(RewardEnum.NEWRECHARGE),this.activity[3]);

        this._addEvent();
        
        TimeManager.instance().on(TimeEvent_End,this._onActivityClose,this);
    }

    onDestroy(){
        super.onDestroy();
        this._removeEvent();
        TimeManager.instance().off(TimeEvent_End);
    }

    _addEvent(){
        cc.game.on(BANNER_CLICK,this._BannerClick,this);
        cc.game.on(ACT_SHOW,this._showDlgSequecene,this);
        cc.game.on(ACT_REQUEST,this._onGameShow,this);
        cc.game.on(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.on(FLUSH_REWARDTIME,this._flushRewardTime,this);
    }

    _udpateRedTip(key:number,num:number){
        if(key==REDTIP_MODULE.NEW_TASK){
            RedTipService.getInstance().activeRedTip(this.acRed[0],REDTIP_MODULE.NEW_TASK);
            if (num > 0) {
                playEffect(1,NEWLIGHT,this.acRed[0].getComponent(sp.Skeleton),"xiaokuangxuanguang",true,"mainpackage",null,this,null);
            }
            else{
                this.acRed[0].getComponent(sp.Skeleton).skeletonData = null;
            }
        }
    }

    _onGameShow(){
        this._onShowActivity();
    }

    _removeEvent(){
        cc.game.off(BANNER_CLICK,this._BannerClick,this);
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.off(FLUSH_REWARDTIME,this._flushRewardTime,this);
    }

    _initBanner(){
        let children=this.content.children;
        this._bannerData.set(String(RewardEnum.PAYREWARD),new BannerData(String(RewardEnum.PAYREWARD),children[0]));
        this._bannerData.set(String(RewardEnum.LOGINREWARD),new BannerData(String(RewardEnum.LOGINREWARD),children[1]));
        this._bannerData.set(String(RewardEnum.DRAWREWARD),new BannerData(String(RewardEnum.DRAWREWARD),children[2]));
        this._bannerData.set(String(RewardEnum.NEWRECHARGE),new BannerData(String(RewardEnum.NEWRECHARGE),children[3]));
        this.content.removeAllChildren();
    }

    start () {
        this._initBanner();
        this._onShowActivity();
    }

    /**
     * 刷新活动时间
     * @param num 
     */
    private _flushRewardTime(){

        App.HttpManager.postAsync("activity_api/get_activities").then(
            (data)=>{
                let activity = data.activities;
                for (let index = 0; index < activity.length; index++) {
                    let newtask = this._actvityIconMap.get(String(RewardEnum.NEWRECHARGE));
                    if (activity[index].activity_id == RewardEnum.NEWRECHTASK&&newtask.active == true) {

                        let lessTime = activity[index].end_time - Math.floor(cc.sys.now()/ 1000);
                        let time = lessTime;
                        let updateTime:Function = ()=>{
                            if (time >= 0){
                                newtask.getChildByName("img_orange").getChildByName("label_time").getComponent(cc.Label).string = GameHelper.fromatTimeNew2(time);
                            }
                            else{
                                newtask.getChildByName("img_orange").active = false;
                                newtask.getChildByName("img_orange").getComponent(cc.Sprite).unschedule(updateTime);
                            }
                            time--;
                        }
                        newtask.getChildByName("img_orange").getChildByName("label_time").getComponent(cc.Label).string = GameHelper.fromatTimeNew2(time);
                        newtask.getChildByName("img_orange").getComponent(cc.Sprite).unscheduleAllCallbacks();
                        newtask.getChildByName("img_orange").getComponent(cc.Sprite).schedule(updateTime,1);

                    }
                }
            },
            (data)=>{

            }
        )

    }

    /**
     * 根据活动数量调节 layout间距
     * @param num 
     */
    private _setSpacing(num:number){
        if (num <= 3 ) {
            this.node.getChildByName("activity").getComponent(cc.Layout).spacingX = -55
        }
        else if(num > 3){
            this.node.getChildByName("activity").getComponent(cc.Layout).spacingX = -70
        }
        this.node.getChildByName("activity").getComponent(cc.Layout).updateLayout();
    }

    private async _onShowActivity(){
        let data=await App.HttpManager.postAsync("activity_api/get_activities");
        data=data.activities;
        TimeManager.instance().clearTask();
        let bannerData:BannerData[]=[];
        let sequenceDatas:{id:string,sort:number}[]=[];
        for (let index = 0; index < data.length; index++) {
            let id=data[index].activity_id == RewardEnum.NEWRECHTASK?RewardEnum.NEWRECHARGE.toString():data[index].activity_id.toString();
            if (App.isCheck&&id == RewardEnum.NEWRECHARGE.toString()) {
                continue;
            }
            let icon=this._actvityIconMap.get(id);
            if(icon){
                let lessTime = data[index].end_time - Math.floor(new Date().getTime()/ 1000);
                if(lessTime>0){
                    let task=new TimeTask();
                    task.key="act_"+id;
                    task.lessTime=lessTime;
                    TimeManager.instance().addTask(task);
                    if (id == String(RewardEnum.NEWRECHARGE)) {
                        this._bannerData.get(String(RewardEnum.NEWRECHARGE)).view.getChildByName("label_newrecharge").getComponent(cc.Label).string = 
                        App.LangManager.getTxtByKey("currency")+formatCurrency(data[index].extra.extra_reward);
                    }
                    bannerData.push(this._bannerData.get(id));
                    if(data[index].push){
                        sequenceDatas.push({id:id,sort:data[index].order})
                    }
                    //充值活动
                    if(id==RewardEnum.PAYREWARD||id ==RewardEnum.NEWRECHARGE){
                        App.DataManager.setExtInfo("hasPayActivity",true);
                        let time = lessTime;
                        let updateTime:Function = ()=>{
                            if (time >= 0){
                                icon.getChildByName("img_orange").getChildByName("label_time").getComponent(cc.Label).string = GameHelper.fromatTimeNew2(time);
                            }
                            else{
                                icon.getChildByName("img_orange").active = false;
                                icon.getChildByName("img_orange").getComponent(cc.Sprite).unschedule(updateTime);
                            }
                            time--;
                        }
                        icon.getChildByName("img_orange").getChildByName("label_time").getComponent(cc.Label).string = GameHelper.fromatTimeNew2(time);
                        icon.getChildByName("img_orange").getComponent(cc.Sprite).unscheduleAllCallbacks();
                        icon.getChildByName("img_orange").getComponent(cc.Sprite).schedule(updateTime,1);
                    }

                    if(id==RewardEnum.NEWRECHARGE){
                        App.DataManager.setExtInfo(RewardEnum.NEWRECHARGE.toString(),true);
                    }
                }                    
                icon.active=lessTime>0;
                icon.zIndex=index;
            }
        }
        this.banner.init(bannerData);
        this.banner.run();
        App.DataManager.setExtInfo(CONSTANTS.ACTIVITY_DATA,sequenceDatas);
        this._setSpacing(data.length);
        if(App.DataManager.getSelfData().progress<GUIDE_STEPS.FINISH){
            return;
        }
        this._showDlgSequecene();
    }

    _showDlgSequecene(){
        let sequenceDatas=App.DataManager.getExtInfo(CONSTANTS.ACTIVITY_DATA);
        if(!sequenceDatas)return
        //处理首屏推送问题
       // if(sequenceDatas&&!App.DataManager.getExtInfo("hasShowActivity")&&!App.isCheck){
        if(sequenceDatas&&!App.isCheck){
            //App.DataManager.setExtInfo("hasShowActivity",true);
            sequenceDatas.sort((a,b)=>b.sort-a.sort);
            for(let i=0;i<sequenceDatas.length;i++){
                DlgSequecene.getInstance().add(ACTIVITY_DLGS[sequenceDatas[i].id])
            }
        }
    }

    _onActivityClose(key:string){
        if(key.startsWith("act_")){
            let info=key.split("_");
            let id=info[1];
            let icon=this._actvityIconMap.get(id);

            if(icon){
                icon.active=false;
            }

            let data=this.banner.data;
            for(let i=0;i<data.length;i++){
                let bannerData=data[i];
                if(bannerData.key==id){
                    data.splice(i,1);
                    break;
                }
            }

            this.banner.init(data);

            this.banner.run();

            //充值活动关闭
            if(id==RewardEnum.PAYREWARD.toString()){
                App.DataManager.setExtInfo("hasPayActivity",false);
            }
            if(id==RewardEnum.NEWRECHARGE.toString()){
                App.DataManager.setExtInfo(RewardEnum.NEWRECHARGE.toString(),false)
            }
        }
    }

    onEnable(){
        let content=this.gameList.getScrollView().content;
        content.removeAllChildren();
        this.gameList.showDataLoading();
        this._getGameConfig();
    }

    _initGameList(games:any){
        let adapter=new ListAdapter(games);
        adapter.setOnItemClickListener(this._onClickGameIcon,this);
        this.gameList.setAdapter(adapter);
        this.gameList.getScrollView().scrollToTop();
        if(App.DataManager.getGameData()==null){
            let gameData=new GameItemData();
            Object.assign(gameData,games[0]);
            App.DataManager.setGameData(gameData);
        }
    }

    async _getGameConfig(){
        let data=await App.HttpManager.postAsync("game_api/hall");
        //更新赛季分
        cc.game.emit(UpdateSeasonPool,data.pool);
        let gameList=data.game_list;
        let  tdata={};
        gameList.forEach((game,index)=>{
            game.sort=index;
            tdata[game.room_type]=game;
        });
        let games=Games.concat();
        let removeCount=0,len=games.length;
        for(let i=0;i<len;i++){
            let game=games[i-removeCount];
            let gameInfo=tdata[game.room_type];
            if(gameInfo){
                game.playingCount=gameInfo.playing_num;
                game.gameState=gameInfo.status;
                game.sort=gameInfo.sort;
                game.guidRoomId=gameInfo.guide_room_id[0];
                game.guidRoomListRoomId=gameInfo.guide_room_id[1];
            }else{
                games.splice(i-removeCount,1);
                removeCount++;
            }
        }
        App.DataManager.setExtInfo(CONSTANTS.GAMECONFIG,tdata);
        games.sort((a,b)=>a.sort-b.sort)
        this._initGameList(games);


        let gameConfigVersion=parseInt(cc.sys.localStorage.getItem(CONSTANTS.GAMECONFIGVERSION) || 0)

        if(gameConfigVersion!=data.update_version){
            let gameConfigData=await App.HttpManager.postAsync("system_api/get_update_info");
            cc.sys.localStorage.setItem(CONSTANTS.GAMECONFIGVERSION,data.update_version);
            cc.sys.localStorage.setItem(CONSTANTS.GAMEVERSION_CONFIG,JSON.stringify(gameConfigData.update_dict));
            App.DataManager.setExtInfo(CONSTANTS.GAMEVERSION_CONFIG,gameConfigData.update_dict);
        }

        if(!App.DataManager.getExtInfo("DownloadTaskInited")){
            App.DataManager.setExtInfo("DownloadTaskInited",true)
            //静默下载
            if(cc.sys.isNative){
                this._installDownLoadTask();
            }
        }
    }

    _installDownLoadTask(){
        let data=App.DataManager.getExtInfo(CONSTANTS.GAMEVERSION_CONFIG);
        Games.forEach(game=>{
            let packageName=game.packageName;
            let url=data[game.room_type].url;
            //查找缓存
            let manifestPath=`${packageName}/project.manifest`;
            let manifest=jsb.fileUtils.getWritablePath()+"gamecaches/assets/"+manifestPath;
            if(!jsb.fileUtils.isFileExist(manifest)){
                //查找本地的
                manifest=jsb.fileUtils.getDefaultResourceRootPath()+`assets/${packageName}/project.manifest`;
                if(!jsb.fileUtils.isFileExist(manifest)){
                    manifest=jsb.fileUtils.getDefaultResourceRootPath()+"assets/project.manifest";
                }
            }
            let task:DownLoadTask=new DownLoadTask();
            task.taskName=game.gameName;
            task.bundleName=packageName;
            task.localManifest=manifest;
            task.remotemanifest=url;
            task.isUnity=game.isUnity;
            task.roomType=game.room_type;
            SilenceDownloadGame.getInstance().addTask(task);
        })
        setTimeout(()=>{
            SilenceDownloadGame.getInstance().start();
        },2000)
        
    }
 

    async _onClickGameIcon(adapter:AbsAdapter,index:number){
        App.AudioManager.playSound("gamecore","sounds/click");
        let data=adapter.getItem(index) as GameItemData;
        
        if(data.gameState==GameStatus.SERVICING){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Under maintenance",error:true});
            return;
        }

        if(data.gameState==GameStatus.NOTOPEN){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"The game is not yet open",error:true});
            return
        }
        
        //发送新手引导完成
        let isGuide=(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_ICON);
        if(isGuide){
            cc.game.emit(GAMEITEMCLICK);
        }

        App.NativeManager.echo("click itemIcon:"+ JSON.stringify(data));
       // let config=App.DataManager.getExtInfo("GameConfig");
       // let subConfig=config[data.packageName];
       
        if(isGuide){
           // await getRemoteGameStatus(data.gameName);
            if(checkGameStatus(data.room_type,ENTER_TYPES.ENTERGAME,data,true)==GameStatus.NORMAL){
                this.enterGame(data,true);
            }
        }else{
            //App.DataManager.setGameData(data);
            //await getRemoteGameStatus(data.gameName);
            if(checkGameStatus(data.room_type,ENTER_TYPES.MATCH_LIST,data)==GameStatus.NORMAL){
                this.enterGame(data);
            }
        }
    }

    async _enterGuideMatch(){
        let gameData=App.DataManager.getGameData();
        let data=await App.HttpManager.postAsync("game_api/match_list",{room_type:gameData.room_type});
        let itemData=data.room_conf.filter(item=>item.match_id==gameData.guidRoomId)[0];
        itemData.isGuide=true;
        if (gameData.packageName == "game107" || gameData.room_type == 800) {
            gameData.onlineGame = true;
        }
        if(!gameData.onlineGame){
            App.DlgManager.showDlg("match",itemData,App.NativeManager.getFakePackageName());
        }else{
            App.BundleManager.loadSubGame(gameData.packageName,()=>{
                App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                App.DlgManager.showDlg("match",itemData,gameData.packageName);
            })
        }
    }

    // async _enterGuideMatch(){
    //     let gameData=App.DataManager.getGameData();
    //     let data=await App.HttpManager.postAsync("game_api/match_list",{room_type:gameData.room_type});
    //     let itemData=data.room_conf.filter(item=>item.match_id==gameData.guidRoomId)[0];
    //     itemData.isGuide=true;
    //     if (App.isCheck) {
    //         App.DlgManager.showDlg("match",itemData,App.NativeManager.getFakePackageName());
    //     }
    //     else{
    //         App.DlgManager.showDlg("match",itemData);
    //     }
        
    // }


    enterGame(data:GameItemData,isGuide:boolean=false){

        App.DataManager.setGameData(data);
        /*
        if(data.isUnity){
            cc.error(">>>ssssssss",App.DataManager.getExtInfo("guideData"))
            if(isGuide){
                this._enterGuideMatch();
            }else{
                cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
            }
            return
        }*/

        if(isGuide){
            this._enterGuideMatch();
        }else{
            cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
        }
        /*
        if(cc.sys.isNative){
            App.BundleManager.loadSubGame(data.packageName,(bundle:cc.AssetManager.Bundle)=>{
                //显示匹配界面
                if(isGuide){
                    this._enterGuideMatch();
                }else{
                    cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
                }
            })
        }else{
            App.BundleManager.loadBundle(data.packageName,(bundle:Bundle)=>{
                App.DataManager.setGameData(data);
                if(isGuide){
                    this._enterGuideMatch();
                }else{
                    cc.game.emit(EVENTS.CHANGEPAGE,PAGES.MATCH);
                }
            })
        }*/
    }

    public onStartMove(): void {
        
    }
    public onMoveFinished(): void {
        
    }

    _BannerClick(actId:string){
        switch(actId){
            case "1002":
                this.onToprewardClick();
                break;
            case "1001":
                this.onLoginrewardClick();
                break;
            case "1003":
                this.onCardrewardClick();
                break;
            case "1006": case "10060001":
                this.onNewRechargeClick();
                break;
        }
    }

    onToprewardClick(){
        App.DlgManager.showDlg("reward/payReward",null);
    }

    onLoginrewardClick(){
        App.DlgManager.showDlg("reward/drawReward/loginReward",null);
       
    }

    async onCardrewardClick(){
        let data=await App.HttpManager.postAsync("activity_api/check_flip_status",{activity_id:RewardEnum.DRAWREWARD});
        if (data.finish_status == REWARDSTATU.AVAILABLE) {
            App.DlgManager.showDlg("reward/drawReward/drawLayer",null);
        }
        // else if(data.finish_status == REWARDSTATU.UNSELEVEL){
        //     App.DlgManager.showDlg("reward/drawReward/drawLayer",null);
        // }
    }

    async onNewRechargeClick(){
        let data=await App.HttpManager.postAsync("activity_api/check_new_player_recharge_status",{activity_id:RewardEnum.NEWRECHARGE});
        switch (data.finish_status) {
            case NewRechargeStatus.AVAILABLE:
                App.DlgManager.showDlg("reward/newRecharge");
                break;
            case NewRechargeStatus.ALREADY:
                App.DlgManager.showDlg("reward/newRechTask");
                break;
            default:
                break;
        }
    }



    flushData(){
        
    }

    // update (dt) {}
}
