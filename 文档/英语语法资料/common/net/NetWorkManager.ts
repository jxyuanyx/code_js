/************************************************************************/
/* 
*   网络重连管理
*/
/************************************************************************/
const { ccclass, property } = cc._decorator;
import cv from "../../components/lobby/cv";
import { ecdhHandler } from "../../common/ecdh/ecdhHandler";
import { pb } from "../../../Script/common/pb/ws_protocol";
import BJPVPConnector from "../../../blackjackpvp/script/common/BJPVPConnector";

@ccclass
export class NetWorkManager extends cc.Component {
    ReconnectCounts: number;
    serverFailCounts: number;
    _isswitchServer: boolean = false;
    _isOpenSwitch: boolean = false;
    isInVideoCowBoyScene: boolean = false;

    private static _g_instance: NetWorkManager = null;          // 单例
    private _bOnAppEnterBack: boolean = false;                  // 程序是否处于后台状态
    public _isLoginFailed: boolean = false;                            //cowboy_web专用

    public static getInstance(): NetWorkManager {
        if (!this._g_instance) {
            this._g_instance = new NetWorkManager();
            this._g_instance.init();
        }
        return this._g_instance;
    }

    public init() {

        //私语网页版, 在跑在私语app上面，不需要监听
        if (!cv.config.isSiyuType()) {
            cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
            cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        }

        this.ReconnectCounts = 0;
        this._isswitchServer = false;
        this._isOpenSwitch = false;


    }

    onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    public SceneOnLoad() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            cv.cowboyNet.initCommon(cv.Enum.GameId.CowBoy);
        }
        else {
            cv.worldNet.initCommon(cv.Enum.GameId.World);
            cv.gameNet.initCommon(cv.Enum.GameId.Texas);
            cv.cowboyNet.initCommon(cv.Enum.GameId.CowBoy);
            cv.videoCowboyNet.initCommon(cv.Enum.GameId.VideoCowboy);
            cv.humanboyNet.initCommon(cv.Enum.GameId.HumanBoy);
            cv.pokerMasterNet.initCommon(cv.Enum.GameId.PokerMaster);
            cv.aofNet.initCommon(cv.Enum.GameId.Allin);
            cv.dataNet.initCommon(cv.Enum.GameId.Data);
            cv.jackfruitNet.initCommon(cv.Enum.GameId.Jackfruit);
        }

        if (!cv.netWork.isConnect()) {
            cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            cv.netWork.connectServer();
        }
        else {
            if (cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
                cv.worldNet.requestGetUserData();
                this.requestClubInfo();
            }
            this.StartChecknetNetwork();
        }
    }

    public OnWorldServerLogin(pSend) {
        if (cv.netWork.isEncrypt(cv.roomManager.getCurrentGameID())) {
            ecdhHandler.getInstance().ecdh_init();
        }

        if (cv.config.getCurrentScene() == cv.Enum.SCENE.HALL_SCENE) {
            //解决bug:5784
            //在大厅切换线路，重新登录world服后，服务器会将secretKey清除掉。会导致重新交换key之前，客户端与服务器secretkey不一致。
            //在登录world后，重新交换这个状态设置为false。这样在大厅点切换线路，再点击房间列表，joinRoom的时候就会重新交换密钥（不重新执行ecdh_init()初始化）
            ecdhHandler.getInstance().ecdh_setNeedGenKeyState(false);
        }

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.GameId_Dummy) {
            // if (cv.dataHandler.getUserData().m_bIsNewRegisted) {
            cv.worldNet.requestDeviceInfoReport(cv.Enum.ReportType.REPORT_REGEGIST);
            // }
        }
        //请求banner
        if (cv.dataHandler.getBannerMapSize() == 0) {
            cv.worldNet.BannerRequest();
        }
        
        this.ReconnectCounts = 0;
        cv.dataHandler.getUserData().isFirstLogin = false;

        cv.domainMgr.writeLastLogin();
        cv.domainMgr.initLoginServer();
        if (this._isswitchServer) {
            this._isswitchServer = false;
            cv.TT.showMsg(cv.config.getStringData("UIWitchServer1"), cv.Enum.ToastType.ToastTypeSuccess);
        }

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.GameId_Dummy) {
            this.requestClubInfo();
        }



    }

    public OnGameServerLogin(pSend) {
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = true;
        this.StartGameHeartBeat();
        cv.roomManager.RequestJoinRoom();
        if (this._isswitchServer) {//！存在word服连不上而游戏服能连的时候，这里切换线路仍然给出切换成功的提示
            this._isswitchServer = false;
            cv.TT.showMsg(cv.config.getStringData("UIWitchServer1"), cv.Enum.ToastType.ToastTypeSuccess);
        }
    }

    public OnCowboyServerLogin() {
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = true;
        this.StartGameHeartBeat();
        if (this._isswitchServer) {
            this._isswitchServer = false;
            cv.TT.showMsg(cv.config.getStringData("UIWitchServer1"), cv.Enum.ToastType.ToastTypeSuccess);
        }
        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.CowBoy, cv.roomManager.getCurrentRoomID());
    }

    public OnVideoCowboyServerLogin() {
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = true;
        this.StartGameHeartBeat();
        if (this._isswitchServer) {
            this._isswitchServer = false;
            cv.TT.showMsg(cv.config.getStringData("UIWitchServer1"), cv.Enum.ToastType.ToastTypeSuccess);
        }
        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.VideoCowboy, cv.roomManager.getCurrentRoomID());
    }

    public OnHumanboyServerLogin() {
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = true;
        this.StartGameHeartBeat();
        if (this._isswitchServer) {
            this._isswitchServer = false;
            cv.TT.showMsg(cv.config.getStringData("UIWitchServer1"), cv.Enum.ToastType.ToastTypeSuccess);
        }
        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.HumanBoy, cv.roomManager.getCurrentRoomID());
    }

    public OnPokerMasterServerLogin() {
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = true;
        this.StartGameHeartBeat();
        if (this._isswitchServer) {
            this._isswitchServer = false;
            cv.TT.showMsg(cv.config.getStringData("UIWitchServer1"), cv.Enum.ToastType.ToastTypeSuccess);
        }
        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.PokerMaster, cv.roomManager.getCurrentRoomID());
    }

    public StartCowboyHeartBeat() {
        //schedule(std::bind(&NetWorkManager::CowboyHeartBeat, this, 0.0f), 12.0f, "cowboyHeart");
    }

    public StartChecknetNetwork() {
        this.schedule(this.UpdateNetwork, 3);
        //cc.director.getScheduler().schedule(this.UpdateNetwork, this,3);

    }

    public UpdateNetwork(f32Delta) {
        if(!cv.native.CheckNetWork()) {
            this.unschedule(this.UpdateNetwork);
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                cv.TP.showMsg(cv.config.getStringData("ErrorToast43"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
            }
            else{
                if(this.ReconnectCounts >= 3) {
                    cv.domainMgr.switchServer();
                    this.ReconnectCounts = 0;  //重连三次后，再次弹框提示重连
                    cv.TP.showMsg(cv.config.getStringData("reconnect_network_tips"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.userTouchToReconnect.bind(this)); 
                    cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_NETWORK);
                }else{
                    this.reconnect();
                }
            }
        }
        else {
            if (!cv.netWork.isConnect() && !cv.netWork.isConnecting()) {
                this.reconnect();
            }
        }
    }

    public userTouchToReconnect(){
        cv.LoadingCommonView.show(cv.Enum.LOADINGTYPE.RECONNECT);
        //显示3s loading界面
        this.scheduleOnce(function(){
            cv.LoadingCommonView.hide();
            this.reconnect();
        }, 3)
    }

    public StartWorldHeartBeat() {
        this.StartChecknetNetwork();
        this.schedule(this.WorldHeartBeat, 12);
    }

    public WorldHeartBeat(f32Delta) {
        let date: Date = new Date();
        console.log(cv.StringTools.formatC("WorldHeartBeat request Time=========>>:%d", date.getTime()));
        cv.dataHandler.getUserData().u64DelayBegin = date.getTime();
        if (cv.worldNet.requestHeartBeat()) {
            this.scheduleOnce(this.OnWorldTimeOut, 8);
        }
        else {
            this.OnWorldTimeOut(0);
        }
    }
    public onWorldHeartBeat() {
        this.sendChangeDelay();
        this.unschedule(this.OnWorldTimeOut);
    }
    public StartGameHeartBeat() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            cv.dataHandler.getUserData().isFirstLogin = false;
            this.StartChecknetNetwork();
        }
        this.schedule(this.GameHeartBeat, 12);
    }

    public GameHeartBeat(f32Delta) {
        console.log("GameHeartBeat");
        if (this.toHeartBeat()) {
            this.scheduleOnce(this.OnGameTimeOut, 8);
        }
        else {
            this.OnGameTimeOut(0);
        }
    }

    public toHeartBeat(): boolean {
        let gameId: number = cv.roomManager.getCurrentGameID();
        let result: boolean = false;

        switch (gameId) {
            case cv.Enum.GameId.CowBoy: {
                result = cv.cowboyNet.requestHeartBeat();
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                result = cv.videoCowboyNet.requestHeartBeat();
            } break;

            case cv.Enum.GameId.HumanBoy: {
                result = cv.humanboyNet.requestHeartBeat();
            } break;

            case cv.Enum.GameId.PokerMaster: {
                result = cv.pokerMasterNet.requestHeartBeat();
            } break;

            case cv.Enum.GameId.Texas:
            case cv.Enum.GameId.StarSeat:
            case cv.Enum.GameId.Bet:
            case cv.Enum.GameId.Plo: {
                result = cv.gameNet.requestHeartBeat();
            } break;

            case cv.Enum.GameId.Allin: {
                result = cv.aofNet.requestHeartBeat();
            } break;

            case cv.Enum.GameId.Jackfruit: {
                result = cv.jackfruitNet.requestHeartBeat();
            } break;

            default: {
                if (cv.GameDataManager.tRoomData.isZoom()) {
                    result = cv.gameNet.requestHeartBeat();
                }
            } break;
        }

        return result;
    }

    public onGameHeartBeat() {
        this.unschedule(this.OnGameTimeOut);
    }
    /**
     * 发送延时信息，监测网络状态
     */
    public sendChangeDelay() {
        let date: Date = new Date();
        console.log(cv.StringTools.formatC("WorldHeartBeat end Time=========>>:%d", date.getTime()));
        cv.dataHandler.getUserData().u64DelayEnd = date.getTime();
        cv.MessageCenter.send("on_change_delay");
    }

    //! 心跳超时就认为世界服已断开。此时重新执行登录就行。
    public OnWorldTimeOut(f32Delta) {
        this.sendChangeDelay();
        cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
        cv.worldNet.requestLoginServer();
    }

    //! 心跳超时就认为游戏服已断开。此时重新执行登录就行。
    public OnGameTimeOut(f32Delta) {
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            cv.cowboyNet.requestLoginServer();
        }
        else {
            cv.roomManager.RequestJoinRoom();
        }
    }

    public reconnect() {
        if (this.ReconnectCounts < 3) {
            this.ReconnectCounts++;
            cv.netWork.close();

            cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            this.unschedule(this.WorldHeartBeat);
            this.unschedule(this.OnWorldTimeOut);
            this.unschedule(this.GameHeartBeat);
            this.unschedule(this.OnGameTimeOut);
            // this.unschedule(this.UpdateNetwork);
            //!重连
            cv.netWork.connectServer();
        }
        else {
            if (cv.dataHandler.getUserData().isFirstLogin) {
                if (cv.domainMgr.isHaveNextServer())//有值为true
                {
                    cv.domainMgr.switchServer();
                    this.ReconnectCounts = 0;
                    //this.UpdateNetwork(0);
                }
                else {
                    this.onGoLogout();
                }
            }
            else if (!this._isOpenSwitch) {
                cv.netWork.close();
                cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
                this.unschedule(this.UpdateNetwork);
                this.closeGameConnect(true);
                this.closeWorldConnect(true);
                this.ReconnectCounts = 0;
                this._isOpenSwitch = true;
                cv.TP.showMsg(cv.StringTools.formatC("%s", cv.config.getStringData("UIWitchServer")), cv.Enum.ButtonStyle.TWO_BUTTON, this.onGoReconnect.bind(this), this.onGoLogout.bind(this));
            }
        }
    }

    public reconnectByServerFailed() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb && this._isLoginFailed == true) return;
        if (this.serverFailCounts < 10) {
            this.serverFailCounts++;
            cv.netWork.close();
            cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
            cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
            this.unschedule(this.WorldHeartBeat);
            this.unschedule(this.OnWorldTimeOut);
            this.unschedule(this.GameHeartBeat);
            this.unschedule(this.OnGameTimeOut);
            // this.unschedule(this.UpdateNetwork);
            //!重连
            cv.netWork.connectServer();
        }
        else {
            if (cv.dataHandler.getUserData().isFirstLogin) {
                if (cv.domainMgr.isHaveNextServer())//有值为true
                {
                    cv.domainMgr.switchServer();
                    this.ReconnectCounts = 0;
                    //this.UpdateNetwork(0);
                }
                else {
                    this.onGoLogout();
                }
            }
            else if (!this._isOpenSwitch) {
                cv.netWork.close();
                cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
                this.unschedule(this.UpdateNetwork);
                this.closeGameConnect(true);
                this.closeWorldConnect(true);
                this.ReconnectCounts = 0;
                this._isOpenSwitch = true;
                cv.TP.showMsg(cv.StringTools.formatC("%s", cv.config.getStringData("UIWitchServer")), cv.Enum.ButtonStyle.TWO_BUTTON, this.onGoReconnect.bind(this), this.onGoLogout.bind(this));
            }
        }
    }

    public closeGameHeart() {
        console.log("closeGameHeart");
        this.unschedule(this.OnGameTimeOut);
        this.unschedule(this.GameHeartBeat);
    }

    public closeGameConnect(isReconnet: boolean = false) {
        console.log("closeGameConnect");
        this.unschedule(this.OnGameTimeOut);
        this.unschedule(this.GameHeartBeat);
        cv.dataHandler.getUserData().m_bIsLoginGameServerSucc = false;
        cv.roomManager.resetRoomCache();
        if (isReconnet) return;
        cv.roomManager.reset();
        this.ReconnectCounts = 0;
        this._isOpenSwitch = false;
    }

    public closeWorldConnect(isReconnet: boolean = false) {

        cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
        this.unschedule(this.OnWorldTimeOut);
        this.unschedule(this.WorldHeartBeat);
        cv.roomManager.resetRoomCache();
        if (isReconnet) return;
        this.ReconnectCounts = 0;
        this._isOpenSwitch = false;
    }

    public Logout() {
        if (this.isInVideoCowBoyScene && !cc.sys.isBrowser) {
            cv.MessageCenter.send("videoCowBoyToLogout");
            return;
        }
        this.unscheduleAllCallbacks();
        this._isswitchServer = false;
        if (cv.config.getCurrentScene() != cv.Enum.SCENE.LOGIN_SCENE && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
            cv.SHOP.msgNode.active = false;
            cv.action.switchScene(cv.Enum.SCENE.LOGIN_SCENE);
        }
        cv.netWork.close();
        this.closeGameConnect();
        this.closeWorldConnect();
        this.unschedule(this.UpdateNetwork);
        // 清除相关数据
        do {
            cv.GameDataManager.tGameData.reset();                   // 清除游戏数据
            cv.GameDataManager.tGiftData.reset();                   // 清除礼物数据
            cv.GameDataManager.tGameRecords.reset();                // 清除游戏战绩数据
            cv.GameDataManager.tCollectPokerMapData.reset();        // 清除游戏收藏数据
            cv.dataHandler.clearData();                             // 清除玩家自身数据
            cv.globalMsgDataMgr.clearData();                        // 清除全局消息数据
            cv.viewAdaptive.reset();
        } while (false);

        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            console.log("--------- ccjs://back-abnormal");
            document.location.href = "ccjs://back-abnormal";
        }
        if( cv.config.HAVE_BLACKJACK )
        {
            BJPVPConnector.instance.logout();
        }
    }

    public cleanNetWork() {
        this.unscheduleAllCallbacks();
        this._isswitchServer = false;
        cv.netWork.close();
        this.closeGameConnect();
        this.closeWorldConnect();
        this.unschedule(this.UpdateNetwork);
        // 清除相关数据
        do {
            cv.GameDataManager.tGameData.reset();                   // 清除游戏数据
            cv.GameDataManager.tGiftData.reset();                   // 清除礼物数据
            cv.GameDataManager.tGameRecords.reset();                // 清除游戏战绩数据
            cv.GameDataManager.tCollectPokerMapData.reset();        // 清除游戏收藏数据
            cv.dataHandler.clearData();                             // 清除玩家自身数据
            cv.globalMsgDataMgr.clearData();                        // 清除全局消息数据
        } while (false);
    }

    public onGoLogout() {
        this._isOpenSwitch = false;
        this.unschedule(this.UpdateNetwork);
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            cv.TP.showMsg(cv.config.getStringData("ErrorToast43"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast33"), cv.Enum.ToastType.ToastTypeError);
            this.Logout();
        }
    }

    public OnUpdateNetWork(psender) {
        this.UpdateNetwork(0);
    }

    public onGoReconnect()//切换线路需要close所有socket进行重连
    {
        this._isOpenSwitch = false;
        cv.netWork.close();
        this.closeGameConnect(true);
        this.closeWorldConnect(true);
        if (cv.domainMgr.switchServer()) {
            this._isswitchServer = true;
            this.StartChecknetNetwork();
            this.UpdateNetwork(0);
        }
        else {
            this.onGoLogout();
        }
    }

    public requestClubInfo() {
        cv.worldNet.requestGetAllRemarks();
        cv.worldNet.requestCurrentBoardList();
        cv.MessageCenter.send("RequestAuthApi_ForMTT");
        cv.worldNet.GoodsListRequest();
    }

    public onReadServer() {

    }
    public onThredEndTologout() {
        this.isInVideoCowBoyScene = false;
        this.Logout();
    }

    /**
     * CowboyWeb挤账号
     */
    public OnCowboyWebRelogin() {
        this.OnNeedRelogin(4);
    }

    /**
     * CowboyWeb登录失败
     * @param str 
     */
    public OnCowboyWebLoginFailed(str: string): void {
        this._isLoginFailed = true;
        this.unscheduleAllCallbacks();
        this.unschedule(this.UpdateNetwork);
        cv.netWork.close();
        this.closeGameConnect(true);
        this.closeWorldConnect(true);
        this.ReconnectCounts = 0;
        cv.TP.showMsg(str, cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
    }

    public OnCowboyWebNetFailed(): void {
        if (cv.TP.haveMsgNode()) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode224"), cv.Enum.ButtonStyle.GOLD_BUTTON, () => {
                document.location.href = "ccjs://back-abnormal";
            });
        }
        else {
            console.log("--------- ccjs://back-abnormal");
            document.location.href = "ccjs://back-abnormal";
        }
    }

    public OnNeedRelogin(pSend) {
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.VideoCowboy) {
            this.isInVideoCowBoyScene = true;
        }
        // 清理loading数据
        //g_pLoading->clearMap();
        let Code = pSend;
        this.unscheduleAllCallbacks();
        this.unschedule(this.UpdateNetwork);
        cv.netWork.close();
        this.closeGameConnect(true);
        this.closeWorldConnect(true);
        this.ReconnectCounts = 0;
        if (Code == 4) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode4"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
            cv.TP.setTag(cv.TP.NOT_RESET_TAG);
        }
        else if (Code == 5) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode5"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
        else if (Code == 2) {
            cv.TP.showMsg(cv.config.getStringData("Hotupdate_Update"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.LowVirsionForSmallVersion.bind(this));
        }
        else if (Code == 3) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode3"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
        else if (Code == 197) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode197"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
        else if (Code == 224) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode224"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
        else if (Code == 225) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode225"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
        else if (Code == 229) {
            cv.TP.showMsg(cv.config.getStringData("ServerErrorCode229"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
        }
    }

    /**
     * 大版本更新清除缓存文件。
     */
    public LowVirsion() {
        let _storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        if (jsb.fileUtils.isDirectoryExist(_storagePath)) {
            console.log("检测到缓存文件");
            jsb.fileUtils.removeDirectory(_storagePath + "/");
        }
        if (jsb.fileUtils.isDirectoryExist(_storagePath + "_temp")) {
            console.log("检测到临时缓存文件");
            jsb.fileUtils.removeDirectory(_storagePath + "_temp/");
        }
        cv.native.JumpToUpdateSite(cv.dataHandler.getUserData().download_url);
    }

    public LowVirsionForSmallVersion() {
        cv.SHOP.unregisterMsg();
        cv.AudioMgr.stopAll();
        cc.game.restart();
    }

    public OnWebServerError(pkSender) {
        cv.TP.showMsg(pkSender, cv.Enum.ButtonStyle.GOLD_BUTTON, this.Logout.bind(this));
    }

    public OnLogoutSucc(pSend) {
        this.Logout();
    }

    public OnHttplogin() {
        cv.TP.showMsg(cv.config.getStringData("ServerErrorCode2"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.LowVirsion.bind(this));
    }

    public OnReconnect(pSend) {
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.GameId_Dummy) {
            this.OnWorldTimeOut(0);
        }
        else {
            this.OnGameTimeOut(0);
        }
    }

    /**
     * 程序切回前台通知
     */
    public OnAppEnterForeground() {
        console.log("OnAppEnterForeground==> websocket");
        cv.StatusView.updateValue();
        this._bOnAppEnterBack = false;
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.VideoCowboy) {
            cv.MessageCenter.send("playVideoCowBoy");
        }
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE || cv.config.getCurrentScene() == cv.Enum.SCENE.LOADING_SCENE) return;

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.GameId_Dummy) {
            console.log("OnAppEnterForeground==> 000000");
            if (cv.netWork.isConnect()) {
                if (cv.dataHandler.getUserData().m_bIsLoginServerSucc && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
                    cv.worldNet.requestGetUserData();
                }
            }
            else if (!cv.netWork.isConnecting()) {
                // cv.netWork.close();
                console.log("OnAppEnterForeground==> 111111");
                if(cc.director.getScene().name != cv.Enum.SCENE.HOTUPDATE_SCENE && cc.director.getScene().name != cv.Enum.SCENE.LOGIN_SCENE){
                    this.UpdateNetwork(0);
                }
            }
        }
        else {
            console.log("OnAppEnterForeground==> 222222");
            if (cv.netWork.isConnect()) {
                if (!cv.dataHandler.getUserData().m_bIsLoginServerSucc) return;
                if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.CowBoy) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.roomManager.RequestJoinRoom();
                }
                if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.VideoCowboy) {
                    // cv.MessageCenter.send("playVideoCowBoy");
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.roomManager.RequestJoinRoom();
                }
                else if (cv.roomManager.getCurrentGameID() === cv.Enum.GameId.Texas
                    || cv.GameDataManager.tRoomData.isZoom()
                    || cv.roomManager.getCurrentGameID() === cv.Enum.GameId.StarSeat
                    || cv.roomManager.getCurrentGameID() === cv.Enum.GameId.Plo) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.gameNet.RequestSnapshot(cv.GameDataManager.tRoomData.u32RoomId);
                }
                else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.HumanBoy) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.roomManager.RequestJoinRoom();
                }
                else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.PokerMaster) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.roomManager.RequestJoinRoom();
                }
                else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.aofNet.RequestSnapshot(cv.GameDataManager.tRoomData.u32RoomId);
                } else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.gameNet.RequestSnapshot(cv.GameDataManager.tRoomData.u32RoomId);
                } else if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
                    cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    cv.jackfruitNet.requestGameDataSync(cv.roomManager.getCurrentRoomID());
                } else if (cv.roomManager.getCurrentGameID() == pb.GameId.Sports) {
                    // cv.GameDataManager.tRoomData.m_bIsReconnectMode = true;
                    // cv.worldNet.SportsLoginRequest();
                }
            }
            else if (!cv.netWork.isConnecting()) {
                // cv.netWork.close();
                // this.closeGameConnect(true);
                // this.closeWorldConnect(true);

                this.UpdateNetwork(0);
            }
        }
    }

    /**
     * 程序切入后台通知
     */
    public OnAppEnterBackground() {
        this._bOnAppEnterBack = true;
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.VideoCowboy) {
            cv.MessageCenter.send("stopVideoCowBoy");
        }
    }

    /**
     * 程序是否处于后台状态
     */
    public isAppEnterBackground(): boolean {
        return this._bOnAppEnterBack;
    }
}
