// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../gamecore/App";
import { BaseGame } from "../gamecore/BaseGame";
import { NetEnum } from "../gamecore/enums/NetEnum";
import { GameEvents } from "../gamecore/events/GameEvents";
import { AccountData, AccountType, CustomAccountData, FaceBookAccountData, GoogleAccountData, GuestAccountData, LoginType } from "../gamecore/models/AccountData";
import { SelfData } from "../gamecore/models/SelfData";
import { ServeData } from "../gamecore/models/ServeData";
import {AppStatusEnum, CHIP_TYPES, CONSTANTS, DataConfig, ENVIRONMENTS, GameConfig, Games, SCREEN_DIRECTION, WITHDRAWDATA} from "./GameConfig";
import { COMMON_RESP_CMDS, CommonProto } from "./net/CommonProto";
import { core } from "../gamecore/net/protos/proto";
import GameItemData from "../gamecore/models/GameItemData";
import BaseGameConfig from "../gamecore/models/BaseGameConfig";
import { LANG } from "../gamecore/manager/ILangManager";
import { LOG_LAYER } from "../gamecore/manager/imps/LogManager";
import { DlgManager, DLG_LAYER } from "../gamecore/manager/imps/DlgManager";
import { EVENT_FACEBOOK_LOGINCANCEL, EVENT_FACEBOOK_LOGINERROR, EVENT_FACEBOOK_LOGINSUCCESS, EVENT_GP_LOGINERROR, EVENT_GP_LOGINSUCCESS } from "../gamecore/manager/imps/NativeManager";
import { NoticeEvent_Competition, NoticeEvent_MarQuee, NoticeService, NoticeType_COMPETITION } from "./hall/scripts/NoticeService";
import { NoticeType_MarQuee } from "../gamecore/commonRes/marquee/Marquee";
import { MarqueeService } from "../gamecore/commonRes/marquee/MarqueeService";
import { ComDlgData } from "./dialogs/comdlg/ComDlg";
import { RedTipService, REDTIP_MODULE } from "./services/RedTipService";
import { DATA_EVENTS, GameResult } from "../gamecore/manager/imps/DataManager";
import { PayEnum, PayTypeEnum } from "../gamecore/enums/PayEnum";
import { AUDIO_GAME_KEY } from "../gamecore/manager/imps/AudioManager";
import { getGameInfoByRoomType, loadMockUsers, saveEnterProgress, saveGuidData } from "./gameHelper/AthHelper";
import { TimeManager } from "../gamecore/tools/TimeManager";
import { ISBIND } from "./dialogs/saveAccounts/SaveAccountDlg";
import { SHOWWITHDRAW } from "./dialogs/withDraw/WithDraw";
import GameHelper from "../gamecore/tools/GameHelper";
import { Notice } from "./hall/scripts/Notice";
import { Package } from "../gamecore/net/Package";
import { DlgSequecene } from "../gamecore/tools/DlgSequecene";
import { ENTER_STEPS, GUIDE_STEPS } from "./hall/guid/HallGuideConfig";
import { ACT_REQUEST, FLUSH_REWARDTIME } from "./hall/pages/page1/GamePage";
import { PayWay } from "./dialogs/deposit/Deposit";
import { MATCHTYPE } from "./hall/pages/page2/MatchListPage";
import { FullStatu, MATCHTOGGLES } from "./dialogs/matchdetails/MatchDetails";
import { LoginAction } from "./login/loginenum";
import { CURPROMOTION } from "./hall/pages/page3/SeasonPage";

const {ccclass, property} = cc._decorator;

const commonList:string[]=[
    "textures/plist/common",
    "textures/plist/head",
    "textures/plist/country",
]

const CheckCommonList:string[]=[
    "textures/plist/check",
    "textures/plist/check02"
]

const INITCOMMON="initCommon";



@ccclass
export default class Application<T_AccountData extends AccountData> extends BaseGame {
    @property(cc.Prefab)
    topTipInstance:cc.Prefab=null;

    @property(Notice)
    notice:Notice=null;

    private _loginAction:LoginAction=null;

    private _uploadGameResulting:boolean=false;

    private _uploadGameResultTimeId:number;


    async _init(){
        cc.game.setFrameRate(60);
        super._init();
        BaseGameConfig.topTip=cc.instantiate(this.topTipInstance);
        App.BundleManager.defaultBundle=GameConfig.mainBundle;
        App.HttpManager.init(GameConfig.APIURL);
        //App.HttpManager.init(GameConfig.HTTPURL);
        App.LogManager.init(this.node.parent.getChildByName(LOG_LAYER));
        App.LogManager.hide();
        App.DlgManager.setDlgLayer(this.node.parent.getChildByName(DLG_LAYER));


        //设置语言包
        App.LangManager.init(LANG.EN,GameConfig.mainBundle);
        this.node.parent.getChildByName("Canvas").active=false;
        App.LangManager.loadBundleLang(GameConfig.mainBundle,()=>{
            this.node.parent.getChildByName("Canvas").active=true;
        })



        App.Net.addProto(new CommonProto());

        NoticeService.getInstance();
        
        this._initSoundConfig();

        App.AudioManager.init();

        GameConfig.TEST=App.NativeManager.isTest();

        let testNode=this.node.parent.getChildByName("debug");
        cc.game.addPersistRootNode(testNode);
        testNode.zIndex=10000;
        testNode.active=GameConfig.TEST;

        TimeManager.instance().init(this);


        
        cc.game.addPersistRootNode(this.notice.node);
        this.notice.node.zIndex=10001;

        NoticeService.getInstance().startComNotice();


        //拉取国家配置
        App.BundleManager.loadAssest("config/country",cc.JsonAsset,(countryData)=>{
            App.DataManager.setExtInfo(CONSTANTS.COUNTRY,countryData.json);
        });


        //取游戏配置
        let gameVersionConfig=cc.sys.localStorage.getItem(CONSTANTS.GAMEVERSION_CONFIG);
        if(gameVersionConfig){
            App.DataManager.setExtInfo(CONSTANTS.GAMEVERSION_CONFIG,JSON.parse(gameVersionConfig));
        }
        
        App.DataManager.setExtInfo(CONSTANTS.SYSTEM_CONFIG,JSON.parse(cc.sys.localStorage.getItem(CONSTANTS.SYSTEM_CONFIG)));
        App.HttpManager.setCommonInfo(JSON.parse(cc.sys.localStorage.getItem(CONSTANTS.COMMONDATA)));
        

        if(App.NativeManager.isTest()){
            let env=cc.sys.localStorage.getItem("env");
            if(env){
                GameConfig.APIURL=ENVIRONMENTS[env];
                App.HttpManager.init(GameConfig.APIURL);
            }
         }    
              
         let data=App.DataManager.getExtInfo(CONSTANTS.SYSTEM_CONFIG);
         App.isCheck = data.google_switch || false;
         if (App.isCheck) {
             GameConfig.APIURL = data.google_url;
             App.HttpManager.init(GameConfig.APIURL);
         }
    }

    _initSoundConfig(){
        let gameConfig=cc.sys.localStorage.getItem(AUDIO_GAME_KEY);
        if(!gameConfig){
            Games.forEach(game=>{
                App.AudioManager.addGameConfig(game.packageName,{vibrator:1,music:App.AudioManager.getBgmVol(),sound:App.AudioManager.getSoundVol()})
            })
        }
    }


    _addEvent(){
        cc.game.on(NetEnum.REQ_LOGIN,this._onLoginServer.bind(this));

        cc.game.on(GameEvents.NET_ERROR,this._onNetError.bind(this));
        cc.game.on(GameEvents.NET_CONNECTING,this._onConnecting.bind(this));
        cc.game.on(NetEnum.REQ_CONTECT,this._onContectToServer.bind(this));
        cc.game.on(GameEvents.NET_OPEN,this._onNetOpen.bind(this));
        cc.game.on(GameEvents.NET_MESSAGE,this._onMessage.bind(this));
        cc.game.on(GameEvents.PAY,this._onPay.bind(this));
        cc.game.on(GameEvents.GETWAY,this._getPayWay.bind(this));

        cc.game.on(GameEvents.SELECTPAY,this._selectPayWay.bind(this));

        cc.game.on(GameEvents.NET_CLOSE,this._onNetClose.bind(this));

        cc.game.on(EVENT_FACEBOOK_LOGINSUCCESS,this._onFacebookLoginSuccess.bind(this));
        cc.game.on(EVENT_FACEBOOK_LOGINCANCEL,this._onFacebookLoginCancel.bind(this));
        cc.game.on(EVENT_FACEBOOK_LOGINERROR,this._onFacebookLoginError.bind(this));
        cc.game.on(EVENT_GP_LOGINSUCCESS,this._onGpLoginSuccess.bind(this));
        cc.game.on(EVENT_GP_LOGINERROR,this._onGpLoginError.bind(this));

        cc.game.on(GameEvents.LOGOUT,this._onLogout.bind(this));

        cc.game.on(cc.game.EVENT_HIDE,this._onGameHide.bind(this));
        
        cc.game.on(cc.game.EVENT_SHOW,this._onGameShow.bind(this));

        cc.game.on(GameEvents.NET_RECONNECT_TIMEOUT,this._onReconnectTimeOut.bind(this));

        cc.game.on(GameEvents.UPLOAD_GAME_RESULT,this._onUploadGameResult.bind(this));

        cc.game.on(DATA_EVENTS.FOUND_NEWUNITYGAMERESULT,this._onFoundNewGameResult.bind(this));

        cc.game.on(GameEvents.CONFIRM_GAMEEND,this._confirmGameEnd.bind(this));

        cc.game.on(GameEvents.SAVEGAMEGUID,this._onSaveGameGuid.bind(this))

        cc.game.on(GameEvents.ERROR_TIP,this._onErrorTip,this);

        cc.game.on(GameEvents.ERROR_TOKEN,this._onTokenError,this);

        cc.game.on(NoticeEvent_Competition,this._onCompetition,this);

        cc.game.on(GameEvents.UPDATE_GAMESTATE,this._updateGameState,this);
    }

    _updateGameState(){
        App.HttpManager.get("config",{name:"game_list"},null,(data:any)=>{
            if(!data)return
            let games=Games.concat();
            let removeCount=0,len=games.length;
            for(let i=0;i<len;i++){
                let game=games[i-removeCount];
                let gameInfo=data[game.packageName];
                if(gameInfo){
                    game.sort=gameInfo.sort;
                    game.playingCount=gameInfo.online;
                    game.gameState=gameInfo.status;
                }else{
                    games.splice(i-removeCount,1);
                    removeCount++;
                }
            }
            App.DataManager.setExtInfo("GameConfig",data);
        });
    }

    _onTokenError(){
         //弹退出游戏
         let data:ComDlgData = new ComDlgData();
         data.title = "Tips";
         data.group = [{name:"ok",isExit:false,cb:()=>{
            cc.audioEngine.uncacheAll();
             App.Net.close();
             App.isRestarting=true;
             cc.game.restart();
         }}];
         data.txt = "Login timeout, please login again";
         data.clickSpaceHide=false;
         App.DlgManager.showDlg("comdlg",data,"mainpackage");
    }

    _onErrorTip(ret:number,cmd:number,content:string){
        cc.error("server resp error:",cmd,ret)
        //错误提交
        if(cmd==COMMON_RESP_CMDS.CMD_SOLITAIRE_SUBMIT_SCORE){
            this._uploadResultSuccess();
        }
        App.DlgManager.showDlg("toast",{title:"Tips",content:content});
    }

    _onSaveGameGuid(step:number){
        let game=App.DataManager.getGameData();
        App.DataManager.getExtInfo("guideData")[game.gameName]=step;
    }

    _confirmGameEnd(){
        //弹退出游戏
        let data:ComDlgData = new ComDlgData();
        data.title = "Tips";
        data.group = [{name:"cancel",isExit:true},{name:"ok",isExit:true,cb:()=>{
            cc.game.end();
        }}];
        data.txt = "Confirm to quit the game?";
        App.DlgManager.showDlg("comdlg",data,"mainpackage");
    }

    _onUploadGameResult(Score:string,Steps:string,CheckCode:string,scoreSteps:string[],serverModuleName:string=""){
        /*
        let gameData=App.DataManager.getGameData();
        if(!serverModuleName){
            serverModuleName=gameData.serverModuleName;
        }
        App.NativeManager.echo(`onUploadGameResult jsclient>>>>>:${JSON.stringify(gameData.scoreSteps)} ${serverModuleName} ${gameData.totalScore} ${Steps} ${(gameData.gameToken=="")?"":GameHelper.encryBase64Score(gameData.gameToken,gameData.scoreToken)} ${gameData.scoreSteps}`);
        //CommonProto.finishGame(serverModuleName,gameData.totalScore.toString(),Steps,(gameData.gameToken=="")?"":GameHelper.encryBase64Score(gameData.gameToken,gameData.scoreToken),gameData.scoreSteps);
        */  
    }
    
    _onNetClose(){
        this._stopHeart();
    }

    _onNetError(){
        /*
        this._stopHeart();
        //游戏中
        if(App.SceneManager.isInGame()){
            return;
        }
        App.DlgManager.clearAllDlgs();
        App.DataManager.removeAccountData();
        App.SceneManager.loadScene("login",GameConfig.mainBundle);

        let data:ComDlgData = new ComDlgData();
        data.title = "Tips";
        data.group = [{name:"ok",isExit:true}];
        data.txt = "Failed to connect to server.";
        App.DlgManager.showDlg("comdlg",data,"mainpackage");
        */
    }

    _onConnecting(){
        if(!App.SceneManager.isInGame()){
            App.DlgManager.showDlg("loading",App.LangManager.getTxtByKey("connecting"));
        }
    }

    _onReconnectTimeOut(){
        //游戏中屏蔽掉重连
        if(App.DataManager.getExtInfo(CONSTANTS.APP_STATUS)==AppStatusEnum.GAMEING){
            return;
        }

        let data:ComDlgData = new ComDlgData();
        data.title = "Tips";
        data.group = [{name:"Retry",isExit:true,cb:()=>{
            this._reconnectServer();
        }}];
        data.txt = "Connection failure";
        data.clickSpaceHide=false;
        App.DlgManager.showDlg("comdlg",data,"mainpackage");
    }

    private _hideTime:number=0;
    private _allHideTime:number=5000;

    async _onGameShow(){
        // App.DlgManager.clearAllDlgs();
        //帐号绑定处理
        if(App.DataManager.getExtInfo(ISBIND))return;

        //unity游戏切回大厅处理
        let gameData=App.DataManager.getGameData();
        let gameStatus=App.DataManager.getExtInfo(CONSTANTS.APP_STATUS);
        if(gameData&&gameData.isUnity&&(gameStatus==AppStatusEnum.GAMEING)){
            if(gameData.screensType==SCREEN_DIRECTION.TYPE_L){
                gameData.screensType=SCREEN_DIRECTION.TYPE_P;
                App.DlgManager.showDlg("changedirection",SCREEN_DIRECTION.TYPE_P);
                this.scheduleOnce(()=>{
                    App.DlgManager.hideDlg("changedirection");
                },1)
            }
            App.DataManager.clearTableData();
        }


        if(App.Net.needReconnect()){ 
            if(gameStatus!=AppStatusEnum.GAMEING){
                await App.DlgManager.showDlg("loading",App.LangManager.getTxtByKey("backGame"));
            }

            if(!gameData|| !gameData.onlineGame){
                this._reconnectServer();
            }
        }else{
            if(gameStatus==AppStatusEnum.GAMEING){
                if(gameData&&gameData.isUnity){
                    App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.HALL);
                    this._reconnectServer();
                }
            }
        }
    }

    _onGameHide(){
        //收后台秒过3秒开启重连
        //this._hideTime=cc.sys.now();
       //App.NativeManager.echo("hideTime>>>>>>>>>>>>>>>>>:"+this._hideTime)
        //this._stopHeart();
    }

    async _reconnectServer(){
        this._stopHeart();
        App.Net.close();
        let gameData=App.DataManager.getGameData();
        if(gameData?.onlineGame){
            cc.game.emit(NetEnum.REQ_CONTECT,App.DataManager.getAccountData());
        }else{
            let serveData=App.DataManager.getServeData();
            cc.log("重新连接服务器:",serveData.host,serveData.port);
            App.Net.connect(serveData.host,serveData.port);
        }
    }

    _onLogout(restart:boolean){
        this._stopHeart();
        App.DataManager.removeAccountData();
        App.Net.close();
        //App.SceneManager.loadScene("login",GameConfig.mainBundle);
        App.DlgManager.showDlg("loading","logout...")
        if(restart){
            cc.audioEngine.uncacheAll();
            this.scheduleOnce(()=>{
                App.NativeManager.fbLogOut();
                App.NativeManager.googleLogOut();
                App.isRestarting=true;
                cc.game.restart();
            },0.2);
        }
    }

    startGame(){
        super.startGame();
         let userInfo=cc.sys.localStorage.getItem("userInfo");
         let uid=0;
         if(userInfo){
            uid=JSON.parse(userInfo).uid;
         }
         
        
        loadMockUsers();
        this._loadCommonRes();
    }

    _onFacebookLoginCancel(){
        App.DlgManager.hideDlg("loading");
    }

    _onFacebookLoginError(){
        App.DlgManager.hideDlg("loading");
    }

    _onGpLoginSuccess(token:string){
        let accountData:GoogleAccountData=new GoogleAccountData();
        accountData.token=token;
        accountData.Type=LoginType.GOOGLE;
        //App.DataManager.setAccountData(accountData);
        //如果是重连绑定数据
        if(App.DataManager.getExtInfo(ISBIND)){
            App.DataManager.setExtInfo(ISBIND,false);
            this.scheduleOnce(async ()=>{
                await App.HttpManager.postAsync("login_api/guest_bind_third",{access_token:accountData.token,bind_type:2})
                App.DataManager.getExtInfo(CONSTANTS.SYSTEM_CONFIG).guest_switch=false;
                App.DlgManager.clearAllDlgs();
                App.Net.close();
                cc.game.emit(NetEnum.REQ_CONTECT,accountData)
                this._successBind();
            },0.5);
        }else{
            this.scheduleOnce(()=>{
                cc.game.emit(NetEnum.REQ_CONTECT,accountData)
            },0.5)
        }
    }

    _onGpLoginError(){
        App.DlgManager.hideDlg("loading");
    }

    _onFacebookLoginSuccess(data:string){
        let info=JSON.parse(data);
        let accountData:FaceBookAccountData=new FaceBookAccountData();
        accountData.openid=info.id;
        accountData.token=info.token;
        accountData.Type=LoginType.FACEBOOK;
        //App.DataManager.setAccountData(accountData);

        //如果是重连绑定数据
        if(App.DataManager.getExtInfo(ISBIND)){
            App.DataManager.setExtInfo(ISBIND,false);
            this.scheduleOnce(async ()=>{
                await App.HttpManager.postAsync("login_api/guest_bind_third",{openid:accountData.openid,access_token:accountData.token,bind_type:1})
                App.DataManager.getExtInfo(CONSTANTS.SYSTEM_CONFIG).guest_switch=false;
                App.DlgManager.clearAllDlgs();
                App.Net.close();
                cc.game.emit(NetEnum.REQ_CONTECT,accountData)
                this._successBind();
            },0.5);
        }else{
            this.scheduleOnce(()=>{
                cc.game.emit(NetEnum.REQ_CONTECT,accountData)
            },0.5)
        }

    }

    _successBind(){
        App.DlgManager.showDlg("toast",{title:"Tips",content:"Save account succeeded"});
    }

    _errorBind(){
        App.DlgManager.showDlg("toast",{title:"Tips",content:"Save account failed"});
    }


    _onLoginServer<T extends AccountData>(loginAction:LoginAction,accountData:T){
        //显示loading
        App.DlgManager.showDlg("loading",App.LangManager.getTxtByKey("connecting"));
        this._loginAction=loginAction;
        if(accountData){//注意重连的情况
            App.DataManager.setAccountData(accountData);
        }

        App.HttpManager.post("login_api/guest_login",{},this.node,(data)=>{
            this._setUserData(data);
        })

        /*
        let serveData=App.DataManager.getServeData();
        App.Net.connect(serveData.host,serveData.port);*/
    }

    /**
     * 提现弱引导
     * @param min//最小提现金额 
     * @param wdnum//已提现次数
     */
    _setWeakWD(min:number,wdnum:number){
        cc.sys.localStorage.setItem(WITHDRAWDATA.MINWITHDRAW,min||10000);
        cc.sys.localStorage.setItem(WITHDRAWDATA.SHOWWITHDRAW,wdnum||0);
    }

    _setUserData(data:any){
        this._setWeakWD(data.withdraw_min_amount,data.withdraw_count);
        let userData=new SelfData();
        Object.assign(userData,data);
        App.DataManager.setSelfData(userData);
        cc.sys.localStorage.setItem("userInfo",JSON.stringify(data));

        GameConfig.EXCHANGE_RATE=data.gold_ratio;

        //设置token
        App.HttpManager.setToken(data.token,data.uid)
        App.Net.setCommonInfo(data.uid,data.token,parseInt(App.NativeManager.getAppVersionCode()),App.NativeManager.getChannel().toString());
        //连接服务器
        let hostInfo=data.server_list[0]?.split(":")
        if(hostInfo){
            GameConfig.HOST=hostInfo[0];
            GameConfig.PORT=hostInfo[1];
            App.DataManager.setServeData(new ServeData(GameConfig.HOST,GameConfig.PORT));
        }
        App.Net.connect(GameConfig.HOST,GameConfig.PORT);

    }

    async _onContectToServer<T extends AccountData>(accountData:T){
        saveEnterProgress(ENTER_STEPS.CLICK_LOGIN);
        App.DataManager.setAccountData(accountData);
        //显示loading
        if(!(App.DataManager.getGameData()?.isInGame)){
            await App.DlgManager.showDlg("loading",App.LangManager.getTxtByKey("connecting"));
        }
        
        let connectError=()=>{
            App.DlgManager.hideDlg("loading");
            //cc.game.emit(GameEvents.NET_RECONNECT_TIMEOUT);
        }

        let data;
        if(accountData.Type==LoginType.FACEBOOK){
            //显示loading
            App.HttpManager.postAsync("login_api/facebook_login",{access_token:(accountData as any).token,openid:(accountData as any).openid}).then(this._setUserData.bind(this),()=>{
                connectError();
            });
        }else if(accountData.Type==LoginType.GOOGLE){
             App.HttpManager.postAsync("login_api/google_login",{access_token:(accountData as any).token}).then(this._setUserData.bind(this),()=>{
                connectError();
            });;
        }else if(accountData.Type==LoginType.GUEST){
            App.HttpManager.postAsync("login_api/guest_login").then(this._setUserData.bind(this),()=>{
                connectError();
            });;
        }else if(accountData.Type==LoginType.TOKEN){
            App.HttpManager.postAsync("login_api/token_login",{access_token:(accountData as any).token}).then(this._setUserData.bind(this),()=>{
                connectError();
            });;
        }

       // this._setUserData(data);
    }
    /**
     * 公用协议处理
     * @param pkg 
     */
    _onMessage(pkg:Package){
        
        switch(pkg.cmd){
            case COMMON_RESP_CMDS.CMD_PROMOTION:
                this._onPromotion(pkg.body);
                break;
            case COMMON_RESP_CMDS.CMD_LOGIN_GATEWAY:
                //App.SceneManager.loadScene("hall");
                this._onLoginSuccess(pkg.body);
                this._startHeart();
                break;
            case COMMON_RESP_CMDS.CMD_MATCH_BROADCAS:
                this._onCompetitionBroadCast(pkg.body as core.CompetitionBroadcast);
                break;
            case COMMON_RESP_CMDS.CMD_EVENT_USER_PROP_CHANGE:
                this._onNotifyCurrentCy(pkg.body as core.EvtUserPropChange);
                break;
            case COMMON_RESP_CMDS.CMD_MARQUEE:
                this._onMarquee(pkg.body);
                break;
            case COMMON_RESP_CMDS.CMD_RED_POINT_NOTIFY:
                this._updateRedTips(pkg.body);
                break;
            case COMMON_RESP_CMDS.CMD_EVENT_DropLottery:
                this._onLottery(pkg.body);
                break;
            case COMMON_RESP_CMDS.CMD_EVENT_USER_LOGIN_ELSEWHERE:
                this._onLoginElseWhere();
                break;
            case COMMON_RESP_CMDS.CMD_RECHARGE:
                this._onRecharReward(pkg.body);
                break;
            case COMMON_RESP_CMDS.CMD_DEPOSIT_REWARD:
                this._onDepositReward(pkg.body);
                break;
            /*
            case COMMON_RESP_CMDS.REGISTER:
                let accountData:CustomAccountData=App.DataManager.getAccountData();
                //CommonProto.sendLogin({Id:0,Name:accountData.Name,Token:accountData.Token})
                App.DlgManager.updateData("loading",App.LangManager.getTxtByKey("registerSuccess"));
                break;
            case COMMON_RESP_CMDS.LOGIN:
            case COMMON_RESP_CMDS.LOGIN_FB:
            case COMMON_RESP_CMDS.LOGIN_GUEST:
            case COMMON_RESP_CMDS.LOGIN_GP:
                this._onLoginSuccess(pkg.body as pb.LoginResp);
                break;
            case COMMON_RESP_CMDS.NOTIFY_CURRENCY:
                this._onNotifyCurrentCy(pkg.body);
                break;
            case COMMON_RESP_CMDS.MARQUEE:
                this._onMarquee(pkg.body as pb.MarqueeNotify);
                break;
            case COMMON_RESP_CMDS.DUPICATELOGIN:
                this._onDupicateLogin(pkg.body as pb.DuplicateLoginResp);
                break;
            case COMMON_RESP_CMDS.LOTTERY:
                this._onLottery(pkg.body as pb.DrawLotteryNotify);
            break;
            case COMMON_RESP_CMDS.REDPOINT:
                this._getRedTips(pkg.body as pb.RedPointTipsNotify);
                break;
            case COMMON_RESP_CMDS.UPDATE_RP:
                this._updateRedTips(pkg.body as pb.RedPointTipsUpdate);
                break;
            case COMMON_RESP_CMDS.FINISH:
                    this._uploadResultSuccess();
                break;
            */
            case COMMON_RESP_CMDS.CMD_SOLITAIRE_SUBMIT_SCORE:
                this._uploadResultSuccess();
            break;
        }
    }

    _onPromotion(body:core.UserRankUP){
        let scene = App.SceneManager.currentSceneName();
        if (scene == "hall") {
            this.scheduleOnce(()=>{
                if (body.before_rank>=0) App.DlgManager.showDlg("seasonpromotion",{cur:Number(body.before_rank),new:body.rank,percent:body.ratio+"%"});
            },1);
        } 
    }

    /**
     * 异地登录
     */
    _onLoginElseWhere(){
        cc.game.emit(GameEvents.LOGOUT,false);
        let data:ComDlgData = new ComDlgData();
        data.title = "Tips";
        data.group = [{name:"Confirm",isExit:true,cb:()=>{
            this._onLogout(true);
        }}];
        data.txt = "Your account is logged in elsewhere";
        data.clickSpaceHide=false;
        App.DlgManager.showDlg("comdlg",data,"mainpackage");
    }

    _uploadResultSuccess(){
        App.NativeManager.notifyUploadResultSuccess("");
        let gameResult:GameResult=App.DataManager.getGameResultSequence().shift();
        if(gameResult.isUnity&&gameResult.rsKey){
            //删除本地的
            App.NativeManager.removeSharedData(gameResult.rsKey);
        }
        App.DataManager.saveGameResult();

        if(this._uploadGameResultTimeId){
            clearTimeout(this._uploadGameResultTimeId);
            this._uploadGameResultTimeId=null;
        }
        this._uploadGameResulting=false;

        if(App.DataManager.getGameResultSequence().length>0){
            this._onFoundNewGameResult();

            
        }else{
            App.DlgManager.hideDlg("loading")
        }
        //赛事出来要进详情页 但是unity游戏结算里面拿不到信息 所以从 gameinitinfo来拿
        if(App.DataManager.getGameResultSequence().length==0){
            let gameInfo = App.DataManager.getGameInitInfo();
            if (gameInfo?.front_match_type==MATCHTYPE.LimitTime) {
                let gamename = Games.filter(item=>item.room_type==gameInfo.room_type)[0].gameName;
                App.DlgManager.showDlg("matchdetails",{game_name:gamename,toggle:MATCHTOGGLES.history,room_type:gameInfo.room_type,match_id:gameInfo.room_id,room_id:gameInfo.room_id,contest_extra:{end_time:gameInfo.end_time,full_enter_refused:FullStatu.unFull},match_entry_type:gameInfo.match_entry_type,match_entry_value:gameInfo.match_entry_value});
            }
            else{
                App.DlgManager.showDlg("record",{roomType:gameResult.roomType,uuid:gameResult.uuid,gameOverShow:true,contest_extra:{end_time:gameResult.end_time},front_match_type:gameResult.front_match_type});

            }
            // if (gameResult.front_match_type == MATCHTYPE.LimitTime) {
            //     App.DlgManager.showDlg("matchdetails",{toggle:MATCHTOGGLES.history,room_type:gameResult.roomType,match_id:gameResult.room_id,room_id:gameResult.room_id,contest_extra:{end_time:gameResult.end_time,full_enter_refused:FullStatu.unFull},match_entry_type:gameResult.match_entry_type,match_entry_value:gameResult.match_entry_value});
            // }
            // else{
            //     App.DlgManager.showDlg("record",{roomType:gameResult.roomType,uuid:gameResult.uuid,gameOverShow:true,contest_extra:{end_time:gameResult.end_time},front_match_type:gameResult.front_match_type});
            // }
            // if (gameResult.front_match_type == MATCHTYPE.LimitTime) {
            //     App.DlgManager.showDlg("matchdetails",{toggle:MATCHTOGGLES.history,room_type:gameResult.roomType,match_id:gameResult.room_id,room_id:gameResult.room_id,contest_extra:{end_time:gameResult.end_time,full_enter_refused:FullStatu.unFull},match_entry_type:gameResult.match_entry_type,match_entry_value:gameResult.match_entry_value});
            // }
            // else{
            //     App.DlgManager.showDlg("record",{roomType:gameResult.roomType,uuid:gameResult.uuid,gameOverShow:true,contest_extra:{end_time:gameResult.end_time},front_match_type:gameResult.front_match_type});
            // }
        }
        
        if((App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_RECORD_WINTIP)&&gameResult.isUnity){
            cc.game.emit(ACT_REQUEST);
        }
    }


    _updateRedTips(body:core.RedPointUpdate){
        RedTipService.getInstance().updateRedTipStatus((body.module as any) as REDTIP_MODULE,body.count);
    }

    _onRecharReward(body:core.ActivityRechargeReceive){  //充值赠送活动弹窗
        let data:{reward_type:number,reward_value:number}[] = [];
        let rewards = body.rewards;
        for (let index = 0; index < rewards.length; index++) {
            if (rewards[index].amount > 0) {
                data.push({reward_type:rewards[index].prop_type,reward_value:rewards[index].amount})
            }
        }

        if (App.DataManager.getGameData().isInGame) {
            let rewardSequeueDatas:any[] = App.DataManager.getExtInfo(CONSTANTS.REWARD_DATA);
            if (rewardSequeueDatas&&rewardSequeueDatas.length > 0) {
            }
            else{
                rewardSequeueDatas = [];
            }
            rewardSequeueDatas.push({Data:data});
            App.DataManager.setExtInfo(CONSTANTS.REWARD_DATA,rewardSequeueDatas);
        }
        else{
            if (data.length > 0) {
                App.DlgManager.showDlg("rewardGoods",{Data:data});
            }
        }
    }

    _onDepositReward(body:core.RechargeRewardNotify){   //首充弹窗
        App.DlgManager.showDlg("rewardGoods",{Data:[{reward_type:body.prop_type,reward_value:body.amount}]});
    }

    _onLottery(body:core.EvtDropLottery){
        if(App.DataManager.getSelfData().progress!=GUIDE_STEPS.FINISH)return;
        this.scheduleOnce(()=>{
            let Lv = body.lv;
            let data:ComDlgData = new ComDlgData();
            data.title = "Congratulations";
            data.group = [{name:"Ok",isExit:true,cb:null},{name:"Go to spin",isExit:true,cb:()=>{
                App.DlgManager.showDlg("luckyturn");
            }}];
            data.txt = "You get the lottery ticket Lv"+Lv;
            App.DlgManager.showDlg("comdlg",data,"mainpackage");
        },1);
        /*
        let scene = cc.director.getScene().name;
        if (scene == "hall") {
            this.scheduleOnce(()=>{
                let Lv = body.lv;
                let data:ComDlgData = new ComDlgData();
                data.title = "Congratulations";
                data.group = [{name:"Ok",isExit:true,cb:null},{name:"Go to spin",isExit:true,cb:()=>{
                    App.DlgManager.showDlg("luckyturn");
                }}];
                data.txt = "You get the lottery ticket Lv"+Lv;
                App.DataManager.deleteExtInfo(DataConfig.LOTTERY);
                App.DataManager.deleteExtInfo(DataConfig.LOTTERY);
                App.DlgManager.showDlg("comdlg",data,"mainpackage");
            },0.1);
        }
        else{
            App.DataManager.setExtInfo(DataConfig.LOTTERY,body.lv);
        }*/
    }

    // _onDupicateLogin(body:pb.DuplicateLoginResp){
    //     cc.game.emit(GameEvents.LOGOUT,false);
    //     /*
    //     App.DlgManager.clearAllDlgs();
    //     App.DataManager.reset();
    //     RedTipService.getInstance().reset();
    //     App.NoticeManager.clearAll();
    //     App.DataManager.setExtInfo("guideData",null);*/
    //     App.DataManager.removeAccountData();
    //     let data:ComDlgData = new ComDlgData();
    //     data.title = "Tips";
    //     data.group = [{name:"Confirm",isExit:true,cb:()=>{
    //         cc.audioEngine.uncacheAll();
    //         this.scheduleOnce(cc.game.restart,0.2);
    //         //cc.game.restart();
    //     }}];
    //     data.txt = "Your account is logged in elsewhere";
    //     data.clickSpaceHide=true;
    //     App.DlgManager.showDlg("comdlg",data,"mainpackage");
    // }

    _onMarquee(body:core.EvtMarqueeBroadcast){
        App.NoticeManager.pushMsg(NoticeType_MarQuee,body);
        App.NoticeManager.sortMsg(NoticeType_MarQuee,(a:core.EvtMarqueeBroadcast,b:core.EvtMarqueeBroadcast)=>{
            return b.priority-a.priority;
        });
        MarqueeService.getInstance().startMarqueeNotice();
    }

    _onCompetitionBroadCast(body:core.CompetitionBroadcast){
        App.NoticeManager.pushMsg(NoticeType_COMPETITION,body);
        NoticeService.getInstance().startComNotice();
        /*
        if(App.SceneManager.curentBundle()=="mainpackage"){
            NoticeService.getInstance().startComNotice();
        }*/
    }

    async _onNotifyCurrentCy(body:core.EvtUserPropChange){
        let selfData=App.DataManager.getSelfData();
        switch(body.prop_type){
            case core.PropType.PROP_TYPE_CASH:
                selfData.gold=body.value;
                break;
            case core.PropType.PROP_TYPE_BIND_CASH:
                selfData.gold_deposit=body.value;
                break;
            case core.PropType.PROP_TYPE_TICKET:
                selfData.ticket=body.value;
                break;
        }

        let data=await App.HttpManager.postAsync("user_api/get_user_info")
        Object.assign(App.DataManager.getSelfData(),data);

        cc.game.emit(GameEvents.FLUSH_SELFDATA);
        cc.game.emit(SHOWWITHDRAW);
    }

    async _getOfflineHistory(){
        let data=await App.HttpManager.postAsync("record_api/offline_game_record");
        if(data&&data.finished?.length){
            DlgSequecene.getInstance().add("mainpackage_offlineHistory",data.finished);
        }
    }

    async _onLoginSuccess(body:core.UserLoginGateWayRsp){

        let gameData=App.DataManager.getGameData();

        if(App.DataManager.getSelfData().progress==GUIDE_STEPS.FINISH){
            if(!gameData || !gameData.isInGame){
                await this._getOfflineHistory();
            }
        }

        //更新用户信息
        let selfData=App.DataManager.getSelfData();
        selfData.gold=body.gold;
        selfData.ticket=body.ticket;
        selfData.gold_deposit=body.gold_deposit;
        cc.game.emit(GameEvents.FLUSH_SELFDATA);

        //打点数据
       
        switch(selfData.account_type){
            case AccountType.GUEST:
                App.NativeManager.logEvent("login_guest","");
            break;
            case AccountType.FACEBOOK:
                App.NativeManager.logEvent("login_fb","");
            break;
            case AccountType.GOOGLE:
                App.NativeManager.logEvent("login_gp","");
            break;
        }
        
        App.NativeManager.logEvent("login","");        
        cc.sys.localStorage.setItem("token",App.DataManager.getSelfData().token);
        App.DataManager.getGameResults();
     

        //在线游戏的情况
        if(gameData&&gameData.onlineGame){
            //


        }else{
            //处理游戏回放和unity返回
            if(App.DataManager.getExtInfo(CONSTANTS.APP_STATUS)==AppStatusEnum.GAMEING){
                if(gameData.isUnity){
                    //数据回放
                    if(gameData.isRecord){
                        return;
                    }else{
                        //正常结算
                    }
                }else {
                    return
                }
            }
             //匹配中的情况 
            if(App.DataManager.getExtInfo(CONSTANTS.APP_STATUS)==AppStatusEnum.MATCHING){          
                //如果服务器存在游戏数据，则直接进入游戏
                if(body.match_info){
                    if(body.match_info.match_status==core.MatchStatus.STATUS_FINISHED){
                        let pkg: Package = new Package(COMMON_RESP_CMDS.CMD_EVT_MATCH_NOTIFY, body.match_info);
                        cc.game.emit(GameEvents.NET_MESSAGE,pkg);
                    }
                    return;
                }else{
                    //关闭匹配界面
                    App.DlgManager.hideDlg("match");
                    App.DlgManager.hideDlg("matchPrize");
                }
            }
            
            //匹配成功的情况,不处理直接进入游戏
            if(App.DataManager.getExtInfo(CONSTANTS.APP_STATUS)==AppStatusEnum.MATCHED){   
                return;
            }
        }
        
       


         //unity游戏返回大厅处理
        //取缓存数据
        let key="sk_rs_"+App.DataManager.getSelfData().uid;
        let data=App.NativeManager.getSharedData(key);
        App.NativeManager.echo("Application>>>>>>:"+key+"...............:"+data);

        let hasResult=false;
        if(selfData.room_id){
            let gameData=getGameInfoByRoomType(selfData.room_type);
            if(gameData){
                //单击游戏
                if(!gameData.onlineGame){
                    let game:GameItemData=new GameItemData();
                    Object.assign(game,gameData);
                    //非unity的游戏走这里
                    let isUnity=game.isUnity;
                    if(!isUnity || (isUnity&&App.DataManager.getGameResultSequence().length==0)&&!data){
                        if(App.SceneManager.curentBundle()!=game.packageName){
                            let result=new GameResult();
                            result.scoreToken="";
                            result.totalScore=0;
                            result.checkCode="";
                            result.time=0;
                            result.room_id=selfData.room_id;
                            result.desk_id=selfData.desk_id;
                            result.roomType=selfData.room_type;
                            result.uuid=selfData.uuid;
                            result.uid=selfData.uid.toString();
                            result.steps="";
                            App.DataManager.pushUnityGameResult(result);
                            hasResult=true;
                            App.DlgManager.clearAllDlgs();
                            //unity crash的情况
                            App.DataManager.clearTableData();
                            await this._backHall();
                        }
                    }else{
                        if(App.SceneManager.currentSceneName()!="hall"){
                            await this._backHall();
                        }
                    }
                }else{
                    //先切到游戏里
                    gameData.isReconnect=true;
                    App.DataManager.setGameData(gameData);
                    App.Net.updateRoomInfo(selfData.desk_id,selfData.room_id);
                    App.DlgManager.hideDlg("match",gameData.packageName);
                    App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                    //切到游戏中
                    App.BundleManager.loadSubGame(gameData.packageName,()=>{
                        let isInGame=App.DataManager.getGameData().isInGame;
                        if(!isInGame){
                            //ludo先特殊处理一下
                            App.SceneManager.loadScene("welcome",gameData.packageName,()=>{
                                App.DlgManager.clearAllDlgs();
                            },true);
                        }else{
                            cc.game.emit(GameEvents.RECONNECT_SUCCESS)
                        }
                       //结束loading
                        App.DlgManager.hideDlg("loading");
                    })
                }
            }
        }else{
            if(gameData?.onlineGame){
                App.DlgManager.hideDlg("match",gameData.packageName);
            }

            if(gameData&&gameData.isRecord){
                return
            }
            if(App.SceneManager.currentSceneName()!="hall"){
                await this._backHall();
            }
        }
        App.DlgManager.hideDlg("loading");
        if(data){
            App.NativeManager.echo("解析的游戏数据为:::::"+key+"_____"+data)
            this._doUnityGameResult(key,data);
        }else if(!hasResult){
            //unity的游戏的队列上传
            this._startUploadUnityGameResult()
        }
        
        

        //取红点
        App.HttpManager.postAsync("message_api/get_red_point").then(data=>{
            this._getRedTips(data);
        })
        
    }
    
    private _commonCount:number=0;

    _loadCommonRes(){
        let commonRess=window["Resource"]["commonSpriteAtlas"];
        commonRess.forEach(asset=>{
            App.BundleManager.setCommonAtlas("mainpackage/"+asset.name.split('.')[0],asset);
        })

        if(App.isCheck){
            let fakePackgeName=App.NativeManager.getFakePackageName();
            if(fakePackgeName){
                App.BundleManager.loadBundleCommonAtlas(fakePackgeName,CheckCommonList,null,()=>{
                    App.DataManager.setExtInfo(INITCOMMON,true)
                })
            }else{
                App.DataManager.setExtInfo(INITCOMMON,true)
            }
        }else{
            App.DataManager.setExtInfo(INITCOMMON,true)
        }
    }

    async _checkLoadComplete(){
        if(App.DataManager.getExtInfo(INITCOMMON)){
            this.unschedule(this._checkLoadComplete);
            await App.SceneManager.loadSceneAsync("hall");
            App.DlgManager.hideDlg("loading");
        }
    }

    async _backHall(){
        if(!App.DataManager.getExtInfo(INITCOMMON)){
            this.schedule(this._checkLoadComplete,0.2)
        }else{
            await App.SceneManager.backHall();
            //结束loading
            App.DlgManager.hideDlg("loading");
        }
        App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.HALL);
    }

    _doUnityGameResult(rsKey:string,data:string){
        let gData=JSON.parse(data)
        //let gData={"gameInfo":"2CapV3jf6oLqPGj+7aEmFknqVPgs4r/zTD5yqt/5ffdBDRHpWprMmdPKKc1ivdzCdud3mbob7rfwI1yjZaUF2j0ba7iVKvZDz5Lz+3I973df6HD28ruUsV75c4zUAdsEN36wgH3ExxWJGqSEXH2ZtO8zwQYSMkKQ+r+wYZKJ4QtOPIa3O49PbmNZNMc/8kfdKQ12L+m8+vKgO3szWOrIkTndzIaTZbGRU83/p9Q0Bt6jUzNDb9pYxr7YL4GUTIQis9wQ2GF+uYKqISbRRlpOUzF3BAOdFZSmC5OANW8V48FL8tF9TZbpHQyvvtZ+AFzm+VuvC/GFtwy2XXsA5IucCwQsRowkFc/jVG/6XQkURR1MipF5l0fOY5DgWBvmljn+bS1ypIunrgUPq5h4F/I7+naIR6VdtLvDDlZDQxugGkZQmkKjZvcP2FG/P0lNUpYGgyBV8zHZRKKtmLN8ZDLmN7F22JZXulmJy4U/7ouDKrPeso8UiXD85FDw32lwrL/uLwnPd0Zxwae7/XtoUSjKlHYRQ+LkRly5h5xe5qJQ0ZzTT21X5cvZbPL47K0Fn79CWESgbVZuOQkq5M14J+RWxJu+dYFfDiJibooDMcNbT9/Zf9CtSigL+5ZlTjLs6gK1FHb32OAni7tF6t1Bde33MB7m14nmHI8XgS1ajBP527Jtap0GY7M/lpGEQwNEaldwdHjQQScb0yXGiBmd7zxdRPjWASsKrglp8MqtC8ItgkPZf9CtSigL+5ZlTjLs6gK1ePtuExb6Q63CQHofHhqx2zwtTIdCdSg3SHMZxQF0eG1n4cOWCMFub3Nnb8SvvLErauLNhaGjBV8s5gw11sBmEL3TfBnPo2K+zChhIcvrfCFn0Elge48vIKAbMnGOCpRDjJ3cGYSS962JqOn/hp6iH0t3fTnp2GOfag8oAJg0fC6SJ1s/UPSiUJOzwvin8IHSp1i3tDlY8MLUXJSM++Mri5qanDj6wbM7A2+snonqsEXidBoJ/By3v5fisVR9iaSIW4XhcF1zfyftmKsp+fx2JU3THsYwni7TZNwSdhXs85K1h4brpxNxc6YdVLMdCUe8jgEURWqk1mjf6fuwRxKyzEI86iG+Vd6gCpR6wni+n8dZggXgJ0sP58OkjXKyc2MALLCmClATKCUDoAVMTlUpN2Llmd8ziBgy9U31IdEdQpTLADohQoVwrsEBYMtAjTH0enLjxR4rCtodfIxXW0UYygz8rzlhbAfdLfpcH4PEMZxkhGFdqigiC///OEkqV14ciJmLAx/cYp99EDQsOQVBOPfne5RO5hjH+ZZbquLfP6hM+OJzdkwqoEC/kGo6lFscMd8SMHQiGlGrBIEAZW0/00idT6YHsyWMa+AbYj8PI502AG8JS792Mz9PWfar5UClWeSOKbQ62UDB8aEGwBoN9Xz+1cgDN2oL3BennzgIYi8b++EMiavULMQNdEkDdME0yA2pHCp3i5aoQqSPrmdmLM1wCsFRqTWenKbFXjfkV2c\u003d","playTime":"2","scores":"e/68RhgNNlkVGSedRNDYhldAgFXQUib1mLO+KjQw/0I\u003d#","steps":"%7B%22InitData%22%3A%7B%22Difficulty%22%3A4%2C%22RandomSeed%22%3A4%2C%22GameTime%22%3A120%2C%22PlateCont%22%3A1%2C%22ScoreDetail%22%3A%5B%221%22%2C%22100%22%2C%221%22%2C%2250%22%2C%220%22%2C%220%22%2C%220%22%2C%220%22%2C%220%22%2C%220%22%2C%22-0%22%2C%22150%22%5D%7D%2C%22OperateData%22%3A%7B%22OperationsList%22%3A%5B%7B%22ClickLatticeOpe%22%3A%7B%22PanelIndex%22%3A0%2C%22IsRight%22%3Atrue%2C%22NumRatio%22%3A1.49965918064117%2C%22BallNum%22%3A13%2C%22BarRatio%22%3A0.450051158666611%7D%2C%22ToolsUsedInfo%22%3Anull%2C%22OneBingo%22%3Anull%2C%22ScoreAdd%22%3A150%2C%22OperateTime%22%3A3.22807717323303%2C%22IsAbort%22%3Afalse%7D%2C%7B%22ClickLatticeOpe%22%3Anull%2C%22ToolsUsedInfo%22%3Anull%2C%22OneBingo%22%3Anull%2C%22ScoreAdd%22%3A0%2C%22OperateTime%22%3A4.3658971786499%2C%22IsAbort%22%3Atrue%7D%5D%2C%22TopCardNumList%22%3A%5B13%5D%2C%22PropTypeList%22%3A%5B%5D%7D%7D","uid":"60000021"}
        let t=GameHelper.AESDecrypResult(gData.gameInfo)
        let gameInfo=JSON.parse(t);
        let matchInfo=JSON.parse(decodeURIComponent(gameInfo.matchInfo));
        let gameInitInfo=JSON.parse(decodeURIComponent(gameInfo.gameInitInfo));
        let steps=decodeURIComponent(gData.steps);
        let playTime=parseInt(gData.playTime || "0");
        let game=new GameItemData();
        let tt=Games.filter(item=>item.packageName==gameInfo.gameId)[0];
        Object.assign(game,tt);
        App.DataManager.setGameData(game);
        game.gameToken=matchInfo.token;
        let scores=gData.scores;
        if(scores.length>0){
            scores=gData.scores.substr(0,gData.scores.length-1);
        }

        let scoreSteps=scores.split("#")

        let totalScore:number=0;
        let scoreToken="";
        for(let i=0;i<scoreSteps.length;i++){
            let score=App.NativeManager.decrypGameOpearScore(scoreSteps[i]);
            if(score){
                totalScore+=parseInt(score);
            }
            scoreToken=GameHelper.encryScore(game.gameToken,score,scoreToken);
        }

        let selfData=App.DataManager.getSelfData();

        App.NativeManager.uploadGameResult(
            rsKey,
            selfData.uid.toString(),
            gameInfo.uuid,
            steps,
            game.gameToken,
            gameInfo.desk_id,
            gameInfo.room_id,
            gameInfo.room_type,
            totalScore,
            scoreToken,
            playTime,
            gameInfo.secretKey,
            true
            );

        //App.DataManager.setGameData(null);
    }

    _getRedTips(data){
        cc.log(data,"redtips>>>>>>>>>>>>>>>>>>>>>>");
        let list=data.red_point_list;
        list.forEach(item => {
            RedTipService.getInstance().setRedTipNum(item.module as REDTIP_MODULE,item.count);
        });
    }   

    _startUploadUnityGameResult(){
        if(App.DataManager.getGameResultSequence().length>0){
            this._onFoundNewGameResult();
        }
    }

    //取配置文件
    _getConfig(){

        App.HttpManager.get("config/seasonquests",null,this.node,(seasonTaskData:any)=>{
            if(seasonTaskData){
                App.DataManager.setExtInfo(DataConfig.SEASON_TASKS,seasonTaskData);
            }
        });

        App.HttpManager.get("config/seasondata",null,this.node,(rankData:any)=>{
            if(rankData){
                App.DataManager.setExtInfo(DataConfig.SEASON_RANK,rankData);
            }
        });

        App.HttpManager.get("config/achievement",null,this.node,(achievementData:any)=>{
            if(achievementData){
                App.DataManager.setExtInfo(DataConfig.ACHIEVEMENT,achievementData);
            }
        });

        App.HttpManager.get("config/errcode",{lang:"en"},this.node,(codes:any)=>{
            if(codes){
                App.DataManager.setExtInfo(DataConfig.ERROR_CODE,codes);
            }
        });

        // App.HttpManager.get("balance/GetWithdrawInfo",null,this.node,(data:any)=>{
            
        // });
    }


    _onNetOpen(){
        CommonProto.sendLogin();
    }

    async _getPayWay(info){
        App.HttpManager.postAsync("pay_api/pay_pattern_info").then(
            (data)=>{
                cc.log(data,"data>>>>>>>>>>>>>>>>>>>>>>>");
                App.DlgManager.showDlg("selectPay",{ways:data,info:info});
                // if (data.pay_pattern == PayWay.JAIPAY) {
                //     App.DlgManager.showDlg("fillPlayerInfo",info);
                // }
                // else{
                //     cc.game.emit(GameEvents.PAY,{product_id:info.product_id,pay_entry:info.pay_entry,errCB:(data:any)=>{
                //         App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("depositerr")});
                //     },source:PayEnum.PaySourceOrangePay,data:{name:"",phone:"",email:""},successCB:null});
                // }
            }
        );
    }
 
    async _selectPayWay(datas){
        if (datas.way != PayTypeEnum.Doi) {
            App.DlgManager.showDlg("fillPlayerInfo",datas);
        }
        else{
            cc.game.emit(GameEvents.PAY,{pay_pattern:datas.way,product_id:datas.info.product_id,pay_entry:datas.info.pay_entry,errCB:(data:any)=>{
                App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("depositerr")});
            },source:datas.way,data:{name:"",phone:"",email:""},successCB:null});
        }
    }

    async _onPay(item:{pay_pattern:number,product_id:number,pay_entry:number,errCB:Function,source:number,data?:any,successCB?:Function}){
       // App.DlgManager.showDlg("loading");
       // if (item.source == PayEnum.PaySourceOrangePay) 
        {
                cc.log(item,"item>>>>>>>>>>>>>>>>>>");
            let data=await App.HttpManager.postAsync("pay_api/user_recharge",{
                product_id:item.product_id,
                name:item.data.name||"",
                email:item.data.email||"",
                phone:item.data.phone||"",
                pay_pattern:item.pay_pattern||"",
                adid:App.NativeManager.getAdjustID(),
                gps_adid:App.NativeManager.getGpsAdjustUID(),
                pay_entry:item.pay_entry
            },true);
            //打点数据
            //App.NativeManager.logEvent("ldfn5p","");
            //App.DlgManager.showDlg("web",{url:data.url});
            cc.sys.openURL(data.url);
            App.DlgManager.hideDlg("loading");
            item.successCB?.();
        }
    }

    private _uploadGameResultfailCount:number=0;
    _onFoundNewGameResult(){
        //查看网络状态
        if(App.Net.isClosed()){
            //提示网络连接失败
            let data:ComDlgData = new ComDlgData();
            data.title = "Tips";
            data.group = [{name:"Retry",isExit:true,cb:()=>{
                this._reconnectServer();
            }}];
            data.txt = "Connection failure";
            data.clickSpaceHide=false;
            App.DlgManager.showDlg("comdlg",data,"mainpackage");
            this._uploadGameResultfailCount=0;
            return;
        }

        this._uploadGameResulting=true;
        let gameResult=App.DataManager.getGameResultSequence()[0];
        App.NativeManager.echo("GameReulut>>>>>>>:"+JSON.stringify(gameResult))
        App.Net.updateRoomInfo(gameResult.desk_id,gameResult.room_id);
        CommonProto.finishGame(gameResult.totalScore,gameResult.steps,gameResult.checkCode,gameResult.scoreToken,gameResult.time);
        App.DlgManager.showDlg("loading","Upload the game result...")

        let self=this;
        //@ts-ignore
        this._uploadGameResultTimeId=setTimeout(function(){
            if(self._uploadGameResulting){
                if(++self._uploadGameResultfailCount>=2){
                    self._uploadResultSuccess();
                    return;
                }

                //提示上传失败
                let data:ComDlgData = new ComDlgData();
                data.title = "Tips";
                data.group = [{name:"Retry",isExit:true,cb:()=>{
                    self._onFoundNewGameResult();
                }}];
                data.txt = "Upload GameResult failure";
                data.clickSpaceHide=false;
                App.DlgManager.showDlg("comdlg",data,"mainpackage");
            }
        },10000)
    }

    onDebugClick(){
        App.DlgManager.showDlg("selectServers")
    }

     _onCompetition(msg:core.CompetitionBroadcast){
         this.notice.showNotice(msg);
     }

    _sendHead(){
        CommonProto.sendHeart();
    }

    private _heartHandId:number;
    _startHeart(){
        //@ts-ignore
        this._heartHandId=setInterval(this._sendHead.bind(this),10*1000)
    }

    _stopHeart(){
        if(this._heartHandId){
            clearInterval(this._heartHandId);
        }
    }

    _test(){
        return
        App.BundleManager.loadSubGame("game107",()=>{
            App.SceneManager.loadScene("welcome","game107",()=>{
                App.DlgManager.clearAllDlgs();
            });
        })
    }
}

