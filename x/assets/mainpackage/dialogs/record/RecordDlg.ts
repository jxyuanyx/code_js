// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from '../../../gamecore/App';
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import GameItemData from "../../../gamecore/models/GameItemData";
import { GameStatus } from "../../../gamecore/models/GameStatus";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { GUIDE_EVENTS, NewGuideHelper } from '../../../gamecore/ui/components/newGuide/NewGuideHelper';
import { AppStatusEnum, CHIP_TYPES, CONSTANTS, GameConfig, Games, WITHDRAWDATA } from '../../GameConfig';
import { checkGameStatus, formatCurrency, formatDate, fromatChip, fromatNumber1, getGameInfoByName, getGameInfoByRoomType, getHead, getRemoteGameStatus, saveEnterProgress, saveGuidData } from "../../gameHelper/AthHelper";
import { ENTER_STEPS, GUIDE_STEPS } from '../../hall/guid/HallGuideConfig';
import WeakGuid, { WEAKTYPE } from "../../hall/guid/weakguid/WeakGuid";
import { MATCHTYPE } from '../../hall/pages/page2/MatchListPage';
import { EVENTS, PAGES } from "../../hall/scripts/hall";
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../services/RedTipService";
import { BalanceType } from "../balance/Balance";
import { ComDlgData } from "../comdlg/ComDlg";
import { ENTER_TYPES } from "../downloadgame/DownloadGame";
import { SHOWWITHDRAW } from "../withDraw/WithDraw";

export const RANKS = ["st", "nd", "rd", "th"]

export const GUIDE_STAKES = 100;

export const PLAYRECORD = "play_record"

const { ccclass, property } = cc._decorator;


export const enum SEVERMATCHTYPE{
    TwoPlayer,
    Tournament,
    LimitedTimeContest
}

@ccclass
export class RecordDlg extends BaseDlg {
    showMode = DlgEnum.FADE;

    UIBindData = {
        uid: 0,
        cash: "",
        bindcash: "",
        rank: 0,
        rankSuffix: "st",
        toptip: "",
        enterPrice: "",
        time: "",
        matchId: "",
        head: null,
        ticket: "",
        flag: null,
        prize: "",
        ranIcon: null,
        gameicon:null
    }

    @property(cc.Prefab)
    weakguide:cc.Prefab = null;

    @property(cc.Node)
    redtip: cc.Node = null;

    @property(cc.Node)
    label: cc.Node = null;

    @property(cc.Node)
    sp: cc.Node = null;

    @property([sp.SkeletonData])
    skeletonData: sp.SkeletonData[] = [];

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    @property(cc.Node)
    rankInfo: cc.Node = null;

    @property(ListView)
    listView: ListView<any> = null;

    @property(cc.Node)
    doubleView: cc.Node = null;

    @property(cc.Node)
    selfRewardView: cc.Node = null;


    @property(cc.Node)
    prizeView: cc.Node = null;

    @property(cc.Node)
    topView: cc.Node = null;

    @property(cc.Node)
    topBackHallView: cc.Node = null;

    @property(cc.Node)
    ticketWinTip:cc.Node=null;

   // @property(cc.Prefab)
   // guideInstance: cc.Prefab;

    private _showXuanGuan: boolean = true;
    private _loopName: string = "";


    private _detailData: any = null;

    //_guide: GodGuide = null;


    beforeShow() {
        if (!this._data.gameOverShow) {
            this.showMode = DlgEnum.R2L;
        }

        this.doubleView.active = false;
        this.skeleton.setCompleteListener(() => {
            if (this._showXuanGuan) {
                this.skeleton.setAnimation(0, this._loopName, true);
                this._showXuanGuan = false;
            }
        })

        this.topView.active = this._data.gameOverShow;
        this.topBackHallView.active = !this.topView.active;

        cc.game.on(PLAYRECORD, this._playRecord, this)

        let progress=App.DataManager.getSelfData().progress;
        NewGuideHelper.getInstance().setCurrentTaskKey(GameConfig.mainBundle)
        //新手引导检测
        if(progress== GUIDE_STEPS.CLICK_RECORD_MORESTAKES) {
            NewGuideHelper.getInstance().run( GUIDE_STEPS.CLICK_RECORD_MORESTAKES);
        }else if(progress==GUIDE_STEPS.CLICK_RECORD_WINTIP){
            this.ticketWinTip.active=true;
            this.ticketWinTip.opacity=0;
            NewGuideHelper.getInstance().run(GUIDE_STEPS.CLICK_RECORD_WINTIP)
        }
    }

    _playRecord(replay_url: string) {
        if(!replay_url){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"The video can only be watched after the match is settled"});
            return;
        }
        let data: ComDlgData = new ComDlgData();
        data.title = App.LangManager.getTxtByKey("tipstitle");
        data.group = [
            { name: App.LangManager.getTxtByKey("cancel"), isExit: true },
            {
                name: App.LangManager.getTxtByKey("confirm"), isExit: true, cb: () => {
                    App.DlgManager.showDlg("loading", "Getting replay...");
                   // replay_url="http://static.skill-app.com/gamerecord/gamerecord_0204/020423795081_65560120.txt";
                    //@ts-ignore
                    cc.assetManager.downloader.downloadFile(
                        replay_url, 
                        {
                            maxRetryCount:3
                        },
                        async (err,content)=>{
                            if(this.node){
                                if(!err){
                                    //@ts-ignore
                                    LZUTF8.decompressAsync(content, {inputEncoding: "StorageBinaryString"}, async (result, error)=>{
                                        App.NativeManager.echo("content>>>>>>>>>>>>>>>>>>>>>:"+result);
                                        if(!this.node)return
                                        if (error === undefined){
                                            let gameData = new GameItemData();
                                            let gameInfo = getGameInfoByRoomType(this._data.roomType);
                                            if (gameInfo) {
                                                gameData = Object.assign(gameData, gameInfo);
                                            }
                                            App.DataManager.setGameData(gameData);
                                            App.DlgManager.hideDlg("loading");
                                            await getRemoteGameStatus(gameData.gameName);
                                            if (checkGameStatus(gameData.room_type) == GameStatus.NORMAL) {
                                                gameData.tableData = result;
                                                gameData.isRecord = true;
                                                gameData.isInGame = true;
                                                App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                                                if (gameData.isUnity) {
                                                    App.DlgManager.setDlgActive("offlineHistory",false);
                                                    App.DlgManager.setDlgActive("record",false);
                                                    App.NativeManager.enterUnityGame(gameData.gameName);
                                                   // this.hide();
                                                    gameData.isInGame = true;
                                                } else {
                                                    cc.error("record>>>>>>",result)
                                                    App.BundleManager.loadSubGame(gameData.packageName, () => {
                                                        App.SceneManager.loadScene("welcome", gameData.packageName);
                                                        App.DlgManager.setDlgActive("offlineHistory",false);
                                                        App.DlgManager.setDlgActive("record",false);
                                                      //  this.hide();
                                                        gameData.isInGame = true;
                                                    });
                                                }
                                            }
                                        }
                                        else
                                            console.log("Compression error: " + error.message);
                                    });
                                   
                                }else{
                                    App.DlgManager.showDlg("toast", { title: App.LangManager.getTxtByKey("tipstitle"), content: "Failed to get replay!" })
                                    App.DlgManager.hideDlg("loading");
                                }
                            }
                        }
                    );
                }
            }];
        data.txt = App.LangManager.getTxtByKey("watchReplay");
        data.clickSpaceHide=true;
        App.DlgManager.showDlg("comdlg", data);
        /*
        ,()=>{
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Failed to get playback!"})
        }*/
    }

    onLoad() {
        super.onLoad();
        if (App.isCheck) {
            this._setCheck();
        }
        this._setWeakGuid();

        saveEnterProgress(ENTER_STEPS.CLICK_GAMEICON);
    }

    _setCheck() {
        this.UI_BTNS.get("add1").active = false;
        this.UI_BTNS.get("menu").active = false;
        let cashView = this.UI_BTNS.get("bindCash");
        cashView.getChildByName("icon").active = false;
        cashView.getChildByName("checkIcon").active = true;
        cashView.x += 50;
    }

    /**
     * 更新用户信息
    */
    flushUserInfo() {
        let selfData = App.DataManager.getSelfData();
        this.UIBindData.uid = selfData.uid;
        this.UIBindData.cash = formatCurrency(selfData.gold);
        this.UIBindData.ticket = formatCurrency(selfData.ticket);
        getHead(selfData.avatar, this.UIBindData.head);
        this.UIBindData.flag.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(selfData.area_code);
        this.UIBindData.ranIcon.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+selfData.seasons.current.rank);
    }

    beforeHide() {
        this._removeEvent();
    }

    async afterShow() {
        this._addEvent();
        this.onFlushRed();
        this.flushUserInfo();
        let gameData=getGameInfoByRoomType(this._data.roomType);
        App.DataManager.setGameData(gameData);

       

        let data=await App.HttpManager.postAsync("record_api/get_game_record", {uuid: this._data.uuid})
            this._detailData = data;
            let rank = data.rank;
            let playing = (data.status==0);
            this.UIBindData.prize = playing ? App.LangManager.getTxtByKey("isnotFinPrize") : App.LangManager.getTxtByKey("isFinPrize");

            let iconPath = Games.filter(item=>item.room_type==data.room_type)[0].packageName;
            this.UIBindData.gameicon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(iconPath);
            this.UI_SPS.get("gameicon").getChildByName("img_iconbox").active = true;
            //加入正在录找人的提示
            if (data.player_list && data.player_list.length <data.match_limit_num) {
                // this.UIBindData.prize = App.LangManager.getTxtByKey("isnotFinPrize");
                this.UIBindData.toptip = App.LangManager.getTxtByKey("tip_finding");
                data.player_list.push({
                    uid: 0
                })
            }
            else {
                // this.UIBindData.prize = App.LangManager.getTxtByKey("isFinPrize");
                this.UIBindData.toptip = App.LangManager.getTxtByKey(!playing ? "tip_yourRank" : "tip_matchPlaying");
            }
            let showRewards = (rewards) => {
                this.selfRewardView.children[0].removeFromParent();
                let item = this.selfRewardView.children[0];
                item.removeFromParent();
                for (let i = 0; i < rewards.length; i++) {
                    let rewardInfo = rewards[i];
                    let view = cc.instantiate(item);
                    view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_" + rewardInfo[0]);
                    let count = "";
                    if (rewardInfo[0] == CHIP_TYPES.SEASON_SCORE || rewardInfo[0] == CHIP_TYPES.RED_TICKET||rewardInfo[0] == CHIP_TYPES.PINK_TICKET||rewardInfo[0] == CHIP_TYPES.BLUE_TICKET||rewardInfo[0] == CHIP_TYPES.YELLOW_TICKET) {
                        count = fromatChip(rewardInfo[1] || 0)
                    }
                    else {
                        count = formatCurrency(rewardInfo[1] || 0)
                    }
                    view.getChildByName("count").getComponent(cc.Label).string = count;
                    view.getChildByName("addicon").active = (i != rewards.length - 1);
                    this.selfRewardView.addChild(view);
                }
            }

            if (playing) {
                this.skeleton.skeletonData = this.skeletonData[3];
                this.skeleton.setAnimation(0, "jiesuan4_tanchu", false);
                this._loopName = "jiesuan4_xunhuan";
                this.selfRewardView.active = true;
                this.rankInfo.active = false;
                if (data.match_pool) {
                    showRewards(data.match_pool);
                }
            } else {
                if (data.reward) {
                    showRewards(data.reward);
                } else {
                    this.selfRewardView.children[1].removeFromParent();
                }
                this.selfRewardView.active = true;
                this.UIBindData.rank = rank;
                this.UIBindData.rankSuffix = RANKS[Math.min(rank - 1, 3)]


                this.rankInfo.active = true;
                this.rankInfo.opacity = 0;
                this.rankInfo.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.fadeIn(0.7)
                ))

                if (rank == 1) {
                    this.skeleton.skeletonData = this.skeletonData[0];
                    this.skeleton.setAnimation(0, "jiesuan1_tanchu", false);
                    this._loopName = "jiesuan1_xunhuan";
                }
                else if (rank == 2) {
                    this.skeleton.skeletonData = this.skeletonData[1];
                    this.skeleton.setAnimation(0, "jiesuan2_tanchu", false);
                    this._loopName = "jiesuan3_xunhuan";
                }
                else if (rank == 3) {
                    this.skeleton.skeletonData = this.skeletonData[2];
                    this.skeleton.setAnimation(0, "jiesuan3_tanchu", false);
                    this._loopName = "jiesuan3_xunhuan";
                }
                else {
                    this.skeleton.skeletonData = this.skeletonData[3];
                    this.skeleton.setAnimation(0, "jiesuan4_tanchu", false);
                    this._loopName = "jiesuan4_xunhuan";

                    if (data.match_limit_num == 2) {
                        //显示双人鼓励提示
                        this.doubleView.active = true;
                        this.doubleView.opacity = 0;
                        this.doubleView.runAction(cc.fadeIn(0.2));
                    }
                }

            }

            //this.UIBindData.matchId=App.LangManager.getTxtByKey("matchId",[data.Uuid]);
            this.UIBindData.matchId = App.LangManager.getTxtByKey("matchId", [this._data.uuid]);

            this.UIBindData.time = App.LangManager.getTxtByKey("date", [formatDate(data.start_time * 1000)]);


            if (data.match_entry_type) {
                this.label.active = true;
                this.sp.active = true;
                this.UIBindData.enterPrice = formatCurrency(data.match_entry_value);
                this.sp.getComponent(cc.Sprite).spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_" + data.match_entry_type);
            }
            else {
                this.label.active = false;
                this.sp.active = false;
                this.UIBindData.enterPrice = App.LangManager.getTxtByKey("matchList_free");
            }

            let adapter = new ListAdapter(data.player_list);
            this.listView.setAdapter(adapter);

            if (App.isCheck) {
                this.selfRewardView.active = false;
                this.UI_LBS.get("prize").active = false;
            }
    }

    private _addEvent(){
        cc.game.on(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.on(SHOWWITHDRAW,this._setWeakGuid,this);
        cc.game.on(GameEvents.FLUSH_SELFDATA,this.flushUserInfo,this);
        cc.game.on(GUIDE_EVENTS.FINISH,this._onGuideFinish,this);
        cc.game.on(GUIDE_EVENTS.START,this._onGuideStart,this);
    }

    _onGuideStart(id:number){
        if(id==GUIDE_STEPS.CLICK_RECORD_WINTIP){
            this.ticketWinTip.opacity=255;
        }
    }

    _onGuideFinish(id:number){
        if(id==GUIDE_STEPS.CLICK_RECORD_MORESTAKES){
            saveGuidData(GUIDE_STEPS.CLICK_ROOMLIST);
        }else if(id==GUIDE_STEPS.CLICK_RECORD_WINTIP){
            App.DlgManager.showDlg("winfreetip");
        }
    }

    private _removeEvent(){
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.off(SHOWWITHDRAW,this._setWeakGuid,this);
        cc.game.off(GameEvents.FLUSH_SELFDATA,this.flushUserInfo,this);
        cc.game.off(GUIDE_EVENTS.FINISH,this._onGuideFinish,this);

    }

    setWeakGuide(isShow:boolean =false){
        let node=this.UI_BTNS.get("menu");

        let child = node.getChildByName("node_weakguide");
        if (child) {
            child.removeFromParent();
            child.destroy();
        }

        if (!isShow) {
            return;
        }
        let weak = cc.instantiate(this.weakguide);
        weak.getComponent(WeakGuid).setData(node,WEAKTYPE.sprite,App.LangManager.getTxtByKey("weakwithdraw"));
    }

    _setWeakGuid(){
        let isShow = cc.sys.localStorage.getItem(WITHDRAWDATA.SHOWWITHDRAW)||0;
        let minWithdraw = cc.sys.localStorage.getItem(WITHDRAWDATA.MINWITHDRAW||10000);
        let cash = App.DataManager.getSelfData().gold_withdraw;
        if (cash >= Number(minWithdraw) && Number(isShow) == 0) {
            this.setWeakGuide(true);
        }
        else{
            this.setWeakGuide(false);
        }
    }

    _udpateRedTip(key: number, num: number) {
        if (key == REDTIP_MODULE.MENU) {
            RedTipService.getInstance().activeRedTip(this.redtip, REDTIP_MODULE.MENU);
        }
    }

    async onPlayagainClick() {
        if (!this._detailData) return;

        let priceType=this._detailData.match_entry_type;
        let price=this._detailData.match_entry_value;
        let selfData=App.DataManager.getSelfData();
        if(priceType==CHIP_TYPES.TICKET&&selfData.ticket<price){
            App.DlgManager.showDlg("toast",{
                title:App.LangManager.getTxtByKey("not_enough_ticket"),
                content:App.LangManager.getTxtByKey("not_enough_ticket_content",[formatCurrency(price)])
            });
            return;
        }
        if(priceType==CHIP_TYPES.CASH&&(selfData.gold)<price){
            App.DlgManager.showDlg("toast",{
                title:App.LangManager.getTxtByKey("not_enough_cash"),
                content:App.LangManager.getTxtByKey("not_enough_cash_content",[formatCurrency(price)])
            });

            if(App.DataManager.getSelfData().today_first_login&&App.DataManager.getExtInfo("hasPayActivity")&&!App.DataManager.getExtInfo(CONSTANTS.PAY_FRIST)){
                App.DataManager.setExtInfo(CONSTANTS.PAY_FRIST,true)
                this.scheduleOnce(()=>{
                    App.DlgManager.showDlg("reward/payReward");
                },0.8)
            }
            return;
        }
        /*
        if (this._detailData.match_entry_type == 1&&App.DataManager.getSelfData().ticket < this._detailData.match_entry_value) {//门票
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("depositTips")});
            return;
        }
        else if(this._detailData.match_entry_type == 2&&App.DataManager.getSelfData().gold < this._detailData.match_entry_value){//现金
            let data:ComDlgData = new ComDlgData();
            data.title = App.LangManager.getTxtByKey("tipstitle");
            data.group = [{name:App.LangManager.getTxtByKey("ok"),isExit:true,cb:null},{name:"Go to deposit",isExit:true,cb:()=>{
                App.DlgManager.clearAllDlgs();
                cc.game.emit(EVENTS.CHANGEPAGE, PAGES.DEPOSIT);
            }}];
            data.txt = App.LangManager.getTxtByKey("depositTips");
            App.DlgManager.showDlg("comdlg",data,"mainpackage");
            return;
        }*/

        await getRemoteGameStatus(this._data.roomType);

        let enterType = this._detailData.conf.front_match_type == MATCHTYPE.LimitTime?ENTER_TYPES.MATCH_DETAILS:ENTER_TYPES.ENTERGAME;
        if (checkGameStatus(this._data.roomType,enterType,this._detailData.conf) != GameStatus.NORMAL) {
            return;
        }

        if (this._data.fromOffline) {
            App.DlgManager.hideDlg("offlineHistory");
        }

        this.hide();
        // App.DlgManager.clearAllDlgs();
        let gameData=App.DataManager.getGameData();
        gameData.tableData = null;
        gameData.isRecord = false;
        gameData.isInGame = false;
        
        if(gameData?.isUnity){
            if (App.isCheck) {
                App.DlgManager.showDlg("match",this._detailData.conf, App.NativeManager.getFakePackageName());
            }
            else if (this._detailData.conf.front_match_type >= 2) {
                if (this._detailData.conf.front_match_type==MATCHTYPE.LimitTime) {
                    this._detailData.conf.match_id = this._detailData.conf.room_id;
                    if (this._detailData.conf.contest_extra.end_time == 0) {
                        let data:ComDlgData = new ComDlgData();
                        data.title = App.LangManager.getTxtByKey("tipstitle");
                        data.group = [{name:App.LangManager.getTxtByKey("confirm"),isExit:true,cb:()=>{
                        }}];
                        data.txt = App.LangManager.getTxtByKey("matchtimeout");
                        data.clickSpaceHide=false;
                        App.DlgManager.showDlg("comdlg",data);
                    }
                    else{
                        App.DlgManager.showDlg("matchdetails",this._detailData.conf);
                    }
                }
                else{
                    App.DlgManager.showDlg("matchPrize",this._detailData.conf);
                }
            }
            else{
                App.DlgManager.showDlg("match",this._detailData.conf, App.isCheck? App.NativeManager.getFakePackageName():null);
            }
        }else{
            App.BundleManager.loadSubGame(gameData.packageName,()=>{
                //ludo先特殊处理一下
                if(gameData.onlineGame){
                    App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                    App.DlgManager.showDlg("match",this._detailData.conf,gameData.packageName);
                }else{
                    if (App.isCheck) {
                        App.DlgManager.showDlg("match",this._detailData.conf, App.NativeManager.getFakePackageName());
                    }
                    else if (this._detailData.conf.front_match_type >= 2) {
                        if (this._detailData.conf.front_match_type==MATCHTYPE.LimitTime) {
                            this._detailData.conf.match_id = this._detailData.conf.room_id;
                            if (this._detailData.conf.contest_extra.end_time == 0) {
                                let data:ComDlgData = new ComDlgData();
                                data.title = App.LangManager.getTxtByKey("tipstitle");
                                data.group = [{name:App.LangManager.getTxtByKey("confirm"),isExit:true,cb:()=>{
                                }}];
                                data.txt = App.LangManager.getTxtByKey("matchtimeout");
                                data.clickSpaceHide=false;
                                App.DlgManager.showDlg("comdlg",data);
                            }
                            else{
                                App.DlgManager.showDlg("matchdetails",this._detailData.conf);
                            }
                        }
                        else{
                            App.DlgManager.showDlg("matchPrize",this._detailData.conf);
                        }
                    }
                    else{
                        App.DlgManager.showDlg("match",this._detailData.conf, App.isCheck? App.NativeManager.getFakePackageName():null);
                    }
                }
            });
        }
    }

    onMoreClick() {
        if (this._data.fromOffline) {
            App.DlgManager.hideDlg("record");
        }
        this.hide();
        if (this._data.fromOffline) {
            App.DlgManager.hideDlg("record");
        }
        //切换场景
        cc.game.emit(EVENTS.CHANGEPAGE, PAGES.GAMES);
    }

    onMoreStakesClick() {
        if (this._data.fromOffline) {
            App.DlgManager.hideDlg("record");
        }
        this.hide();
        //切换场景
        cc.game.emit(EVENTS.CHANGEPAGE, PAGES.MATCH);
    }

    onBindTicketClick() {
        if (App.isCheck) return;
        App.DlgManager.showDlg("balance", BalanceType.TICKET);
    }

    onBindCashClick() {
        if (App.isCheck) return;
        App.DlgManager.showDlg("balance", BalanceType.CASH);
    }

    onUserInfoClick() {
        if (App.isCheck) return;
        App.DlgManager.showDlg("userInfo");
    }

    onMenuClick() {
        if (App.isCheck) return;
        App.DlgManager.showDlg("menu");
    }

    onAdd1Click() {
        if (App.isCheck) return;
        this.hide();
        cc.game.emit(EVENTS.CHANGEPAGE, PAGES.DEPOSIT);
    }

    onFlushRed() {
        RedTipService.getInstance().activeRedTip(this.redtip, REDTIP_MODULE.MENU);
    }

    onDestroy() {
        cc.game.off(PLAYRECORD, this._playRecord, this)
    }


}

