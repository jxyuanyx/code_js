import cv from "./../cv";
import ActivityView from "./ActivityView";
import FindView, { DiscoverGameType } from "./FindView";
import LabaView from "./LabaView";
import cb from "../../game/cowboy/cb";
import humanboyDataMgr from "../../game/humanboy/HumanboyDataMgr";
import { GoldViewNew } from "../../game/dzPoker/GoldViewNew";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import { NoticeView } from "./NoticeView";
import VideoCowboyManager from "../../game/videoCowboy/VideoCowboyManager";
import { ecdhHandler } from "../../../common/ecdh/ecdhHandler";
import { MailEntrance } from "../../globalMsg/MailEntrance";
import PokerMasterDataMgr from "../../game/pokerMaster/PokerMasterDataMgr";
import UpgradeView from "../login/UpgradeView";
import { Safe } from "./Safe";
import { ActivityType } from "../../../data/activityData";
import { ChooseVerity } from "./ChooseVerity";
import { SliderVerify } from "../../lobby/sliderVerify/SliderVerify";
import TicketView from "./TicketView";
import { JumioKYCHandler } from "../../../common/security/JumioKYCHandler";
import BJPVPConnector from "../../../../blackjackpvp/script/common/BJPVPConnector";


const { ccclass, property } = cc._decorator;
@ccclass
export default class HallScene extends cc.Component {

    @property(cc.Prefab) selfviewPref: cc.Prefab = null;
    @property(cc.Prefab) activityPref: cc.Prefab = null;
    @property(cc.Prefab) ticketPref: cc.Prefab = null;
    @property(cc.Prefab) goldViewPref: cc.Prefab = null;
    @property(cc.Prefab) labaViewPref: cc.Prefab = null;
    @property(cc.Prefab) referalsPref: cc.Prefab = null;
    @property(cc.Prefab) safePref: cc.Prefab = null;
    @property(cc.Prefab) upgradePref: cc.Prefab = null;
    @property(cc.Prefab) earnView_Pref: cc.Prefab = null;
    @property(cc.Prefab) prefab_chooseVerity: cc.Prefab = null;
    @property(cc.Prefab) sliderVerify_prefab: cc.Prefab = null;

    @property(cc.Node) bottomView: cc.Node = null;      // 普通版本
    @property(cc.Node) bottomView_en: cc.Node = null;   // 海外版底部

    @property(cc.Node) findView: cc.Node = null;
    @property(cc.Node) miniGamesView: cc.Node = null;
    @property(cc.Node) noticeView: cc.Node = null;

    @property(cc.Node) findBtn: cc.Node = null;
    @property(cc.Node) minigameBtn: cc.Node = null;
    @property(cc.Node) earnBtn: cc.Node = null;
    @property(cc.Node) noticeBtn: cc.Node = null;
    @property(cc.Node) selfBtn: cc.Node = null;

    //海外版按钮
    @property(cc.Node) findBtn_en: cc.Node = null;
    @property(cc.Node) earnBtn_en: cc.Node = null;
    @property(cc.Node) dataBtn_en: cc.Node = null;
    @property(cc.Node) selfBtn_en: cc.Node = null;

    @property(cc.Node) safeBtn: cc.Node = null;
    @property(cc.Node) gold_Panel: cc.Node = null;
    @property(cc.Node) bankBtnDot: cc.Node = null;

    public safe: cc.Node = null;
    public earnView: cc.Node = null;
    public silenceMusic: string = "zh_CN/game/dzpoker/audio/silence";
    public goldView: cc.Node = null;
    public selfView: cc.Node = null;
    public upgradeView: cc.Node = null;
    public referalsView: cc.Node = null;
    public _isNoticeView: boolean = false;
    public _isFindView: boolean = false;
    public isATLRun: boolean = false;

    onLoad() {
        cv.config.adaptScreen(this.node);
        if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_FULLSCREEN) { //适配ios全面屏(底部栏)
            //底部按钮部分
            this.adaptWidgetBottom(this.bottomView, cv.config.FULLSCREEN_OFFSETY_B);
            this.adaptWidgetBottom(this.bottomView_en, cv.config.FULLSCREEN_OFFSETY_B);
            //牌桌列表部分
            this.adaptWidgetBottom(cc.find("discover_panel/ScrollViewList", this.findView), cv.config.FULLSCREEN_OFFSETY_B);
            this.adaptWidgetBottom(cc.find("discover_panel/ScrollView_mtt", this.findView), cv.config.FULLSCREEN_OFFSETY_B);
            //公告部分
            this.adaptWidgetBottom(cc.find("noticeWebView", this.noticeView), cv.config.FULLSCREEN_OFFSETY_B);
        }

        cv.resMgr.adaptWidget(this.node, true);
        cv.config.setCurrentScene(cv.Enum.SCENE.HALL_SCENE);
        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_LOBBY);
        cv.StatusView.show(true);  //显示广告页的时候，电量信息隐藏，此处重新显示。
        this.registerMsg();
        this.initGoldView();

        // 登录请求
        if (cv.netWork.isConnect()) {
            this.updateChipNum();
        }

        cv.StatusView.updateSystemTimePos(true);
        this.selfView = cc.instantiate(this.selfviewPref);
        this.referalsView = cc.instantiate(this.referalsPref);

        this.earnView = cc.instantiate(this.earnView_Pref);
        this.findView.getParent().addChild(this.earnView);
        this.earnView.active = false;

        if (cv.config.isOverSeas()) {
            this.safeBtn.active = false;
        }
        this.referalsView.active = false;

        //防止selfView中的元素层级盖过，大厅顶端按钮（保险箱，切换线路，客服等按钮），selfView的层级要比safeBtn等低。
        this.selfView.zIndex = this.safeBtn.zIndex - 1;

        cv.netWorkManager.SceneOnLoad();
        ecdhHandler.getInstance().ecdh_init();
        cv.StatusView.getBatteryInfo();

        if (cc.sys.os == cc.sys.OS_IOS) {
            cv.native.AuthLocation();
            console.log("99333");
        }

        // 海外版和越南版
        if (cv.config.isOverSeas() || cv.config.isVietnam()) {
            this.bottomView.active = false;
            this.bottomView_en.active = true;
            this.bottomView_en.getParent().addChild(this.selfView);
            this.bottomView_en.getParent().addChild(this.referalsView);
            this.bottomView_en.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_1;
            this.selfView.active = false;
            this.swithView(this.findView, this.findBtn_en.children[0]);
        }
        else {
            this.bottomView.active = true;
            this.bottomView_en.active = false;
            this.bottomView.getParent().addChild(this.selfView);
            this.selfView.active = false;
            this.bottomView.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_1;
            this.swithView(this.findView, this.findBtn.children[0]);
        }

        // 切到默认界面之前要激活"findView"界面(因为其"onload"中有些蛋疼流程的请求错综复杂, 只能按原来套路来)
        // 沿用上面的逻辑, 这里的暂时注释
        // this.findView.active = true;
        if (cv.dataHandler.getUserData().default_hall_view_enabled) {
            cv.dataHandler.getUserData().default_hall_view_enabled = false;
            this.swithViewByViewIdx(cv.dataHandler.getUserData().default_hall_view);
        }

        //获取常驻节点
        //var node = cc.director.getScene().getChildByName('alwaysNode');
        //node.getComponent(NetWorkManager).showmsg("mainscene====================================================");
        cv.MessageCenter.send("hallEnterMTT");
    }

    adaptWidgetBottom(node: cc.Node, num: number) {
        let widget: cc.Widget = node.getComponent(cc.Widget);
        widget.bottom += num;
    }

    //声道变换
    routeChange(jsonCmd: any) {
        console.log("收到声道变换消息");
        console.log(jsonCmd);
        console.log(jsonCmd.ret);
        console.log("收到声道变换消息----------end");
        //cv.TP.showMsg(jsonCmd.ret,false,null);
        let str: string = jsonCmd.ret;
        if (str == "Speaker") {
            console.log("true");
            cv.TT.showMsg("Speaker", cv.Enum.ToastType.ToastTypeSuccess);
        } else if (str == "Headphones") {
            cv.TT.showMsg("Headphones", cv.Enum.ToastType.ToastTypeSuccess);
            console.log("false");
        } else {
            cv.TT.showMsg(str, cv.Enum.ToastType.ToastTypeSuccess);
        }
    }

    start() {
        cv.MessageCenter.register("routeChange", this.routeChange.bind(this), this.node);
        let isNewYear = cv.config.isShowNewYear();
        cc.find("newyear_down_img", this.bottomView).active = isNewYear;
        cc.find("newyear_left_img", this.bottomView).active = isNewYear;
        cc.find("newyear_right_img", this.bottomView).active = isNewYear;

        // 写在这里是处理邮件按钮换图
        if (this._isFindView) {
            // 新年活动
            this.initNewYear(cv.config.isShowNewYear());
        }

        if (cc.sys.isNative) {
            cv.httpHandler.sendNativeError();
        }

        this.initLanguage();

        let node = cv.action.addChildToScene(this, this.activityPref, [], cv.Enum.ZORDER_TYPE.ZORDER_ACTIVITY, true);
        node.name = "activityView";
        this.firstShowActivityPanel();

        if (TicketView.IS_VIEW) {
            let ticketNode = cv.action.addChildToScene(this, this.ticketPref, [], cv.Enum.ZORDER_TYPE.ZORDER_7, true);
            ticketNode.name = TicketView.NAME;
        }
        this.isATLRun = TicketView.IS_VIEW;

        this.showLabaPanel();
        this.sortATLView();
        if (cv.dataHandler.getUserData().is_goto_myredpacket) {
            cv.dataHandler.getUserData().is_goto_myredpacket = false;
            this._onMsgSwitchSceneToSelfView();
            cv.MessageCenter.send("open_myredpackets");
        }
        // 检查退出牛仔房间后的提示
        if (cv.StringTools.getArrayLength(cb.getCowboyRoom().backToMainTips) > 0) {
            let showTips: string = cb.getCowboyRoom().backToMainTips;
            cb.getCowboyRoom().backToMainTips = "";
            this.scheduleOnce((dt: number) => { cv.TP.showMsg(showTips, cv.Enum.ButtonStyle.GOLD_BUTTON, null); }, 0.3);
        }
        // 检查退出百人房间后的提示
        else if (cv.StringTools.getArrayLength(humanboyDataMgr.getHumanboyRoom().sBackToMainTips) > 0) {
            let showTips: string = humanboyDataMgr.getHumanboyRoom().sBackToMainTips;
            humanboyDataMgr.getHumanboyRoom().sBackToMainTips = "";
            this.scheduleOnce((dt: number) => { cv.TP.showMsg(showTips, cv.Enum.ButtonStyle.GOLD_BUTTON, null); }, 0.3);
        }
        // 检查退出视频牛仔房间后的提示
        else if (cv.StringTools.getArrayLength(VideoCowboyManager.getVideoCowboyRoom().backToMainTips) > 0) {
            let showTips: string = VideoCowboyManager.getVideoCowboyRoom().backToMainTips;
            VideoCowboyManager.getVideoCowboyRoom().backToMainTips = "";
            this.scheduleOnce((dt: number) => { cv.TP.showMsg(showTips, cv.Enum.ButtonStyle.GOLD_BUTTON, null); }, 0.3);
        }
        // 检查退出扑克大师房间后的提示
        else if (cv.StringTools.getArrayLength(PokerMasterDataMgr.getPokerMasterRoom().sBackToMainTips) > 0) {
            let showTips: string = PokerMasterDataMgr.getPokerMasterRoom().sBackToMainTips;
            PokerMasterDataMgr.getPokerMasterRoom().sBackToMainTips = "";
            this.scheduleOnce((dt: number) => { cv.TP.showMsg(showTips, cv.Enum.ButtonStyle.GOLD_BUTTON, null); }, 0.3);
        }

        // else if (g_pkDataManager->getVideoCowboyRoom() && g_pkDataManager->getVideoCowboyRoom()->backToMainTips.length() > 0)
        // {
        // 	std::string showTips = g_pkDataManager->getVideoCowboyRoom()->backToMainTips;
        // 	g_pkDataManager->getVideoCowboyRoom()->backToMainTips = "";
        // 	scheduleOnce([=](float dt){
        // 		unschedule("check_cowboy_back_tips");
        // 		g_pTipsPanel->showMessage(showTips, ONE_BUTTON, nullptr);
        // 	}, 0.3f, "check_cowboy_back_tips");
        // }
        // else if (g_pkDataManager->getHumanboyRoom() && g_pkDataManager->getHumanboyRoom()->sBackToMainTips.length() > 0)
        // {
        // 	std::string showTips = g_pkDataManager->getHumanboyRoom()->sBackToMainTips;
        // 	g_pkDataManager->getHumanboyRoom()->sBackToMainTips = "";
        // 	scheduleOnce([=](float dt){
        // 		unschedule("check_humanboy_back_tips");
        // 		g_pTipsPanel->showMessage(showTips, ONE_BUTTON, nullptr);
        // 	}, 0.3f, "check_humanboy_back_tips");
        // }
        else {
            if (cv.viewAdaptive.isselfchange) {
                // showShopPanel((Ref*)0);
                // if (g_pkViewDataManager->isselfchange && g_pkViewDataManager->videoCowboyroomid > 0){
                // 	g_pkNetworkManager->StartConnectGameServer(pb::GameId::VideoCowboy);
                // }
                // else if(g_pkViewDataManager->isselfchange && g_pkViewDataManager->cowboyroomid > 0){
                // 	g_pkNetworkManager->StartConnectGameServer(pb::GameId::CowBoy);
                // }
                // else if(g_pkViewDataManager->isselfchange && g_pkViewDataManager->humanboyroomid > 0){
                // 	g_pkNetworkManager->StartConnectGameServer(pb::GameId::HumanBoy);
                // }
                // else{
                // 	showView(_sourceShop, _sourceShop->getTag() != HIDE_NITOCE_TAG);0000000
                //     _sourceShop = nullptr;
                // }
                cv.SHOP.setExitCallFunc(() => {
                    if (cv.viewAdaptive.cowboyroomid > 0) {
                        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.CowBoy, cv.viewAdaptive.cowboyroomid, false);
                    }
                    else if (cv.viewAdaptive.videoCowboyRoomId > 0) {
                        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.VideoCowboy, cv.viewAdaptive.videoCowboyRoomId, false);
                    }
                    else if (cv.viewAdaptive.humanboyroomid > 0) {
                        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.HumanBoy, cv.viewAdaptive.humanboyroomid, false);
                    }
                    else if (cv.viewAdaptive.pokerMasterRoomID > 0) {
                        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.PokerMaster, cv.viewAdaptive.pokerMasterRoomID, false);
                    }
                    else if (cv.viewAdaptive.bjpvpLevelId > 0) {
                        cv.MessageCenter.send(BJPVPConnector.instance.keyConfig.BroadCast.BJPVP_ENTER_GAMESCENE, cv.viewAdaptive.bjpvpLevelId);
                    }
                })
                cv.SHOP.msgNode.active = true;
                cv.SHOP.RechargeClick();
            }
            // else if (g_pkViewDataManager->isselfchange && g_pkViewDataManager->cowboyroomid > 0){
            // 	showShopPanel((Ref*)0);
            // }
            // else if(g_pkViewDataManager->isselfchange && g_pkViewDataManager->humanboyroomid > 0)
            // {
            // 	showShopPanel((Ref*)0);
            // }
        }

        //根据php返回的is_alert_sl判断是否弹首次登录引导
        if (cv.config.isOpenSiyuVerify() && cv.dataHandler.getUserData().is_alert_sl) {
            cv.dataHandler.getUserData().is_alert_sl = false;
            cv.TP.showMsg(cv.config.getStringData("siyu_toast_guide"), cv.Enum.ButtonStyle.TWO_BUTTON, this._onGotoVerityMessage.bind(this), null, false, cv.config.getStringData("siyu_dlg_title"));
            cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_SILIAO_TIPS);
        }
        cv.action.addNodeForAcMap(cv.SHOP.msgNode);

        this.onBonusAndFreeResponse();
    }

    //跳转到短信验证界面
    private _onGotoVerityMessage() {
        let inst_chooseVerity: cc.Node = ChooseVerity.getSinglePrefabInst(this.prefab_chooseVerity);
        cv.action.addChildToSceneOnce(inst_chooseVerity);
        cv.action.showAction(inst_chooseVerity, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
    }

    initLanguage() {
        cv.resMgr.setSpriteFrame(this.findBtn, cv.config.getLanguagePath("hall/lobby/icon_discover_white"));
        cv.resMgr.setSpriteFrame(cc.find("img", this.findBtn), cv.config.getLanguagePath("hall/lobby/icon_discover_blue"));
        cv.resMgr.setSpriteFrame(this.minigameBtn, cv.config.getLanguagePath("hall/lobby/icon_records_white"));
        cv.resMgr.setSpriteFrame(cc.find("img", this.minigameBtn), cv.config.getLanguagePath("hall/lobby/icon_records_blue"));
        cv.resMgr.setSpriteFrame(this.selfBtn, cv.config.getLanguagePath("hall/lobby/icon_setting_white"));
        cv.resMgr.setSpriteFrame(cc.find("img", this.selfBtn), cv.config.getLanguagePath("hall/lobby/icon_setting_blue"));
        cv.resMgr.setSpriteFrame(this.noticeBtn, cv.config.getLanguagePath("hall/lobby/icon_info_white"));
        cv.resMgr.setSpriteFrame(cc.find("img", this.noticeBtn), cv.config.getLanguagePath("hall/lobby/icon_info_blue"));
        cc.find("img", this.findBtn).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
        cc.find("img", this.minigameBtn).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
        cc.find("img", this.selfBtn).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
        cc.find("img", this.noticeBtn).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;

        cv.resMgr.setSpriteFrame(cc.find("img_logo", this.node), cv.config.getLogoPath(cv.Enum.SCENE.HALL_SCENE));
    }

    private registerMsg() {
        cv.MessageCenter.register("update_info", this.onGetPlayerInfoSuccess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);

        cv.MessageCenter.register("showLabaPanel", this.showLabaPanel.bind(this), this.node);
        cv.MessageCenter.register("HideWebview_ShowWindows", this.HandleSwitchServer.bind(this), this.node);

        cv.MessageCenter.register("switchSceneToMiniGame", this._onMsgSwitchSceneToMiniGame.bind(this), this.node);
        cv.MessageCenter.register("switchSceneToSelfView", this._onMsgSwitchSceneToSelfView.bind(this), this.node);
        cv.MessageCenter.register("on_need_slider_verify", this._onMsgNeedSliderVerify.bind(this), this.node);              // 真人验证消息
        cv.MessageCenter.register("jumpgto_notice", this._onjumpgto_notice.bind(this), this.node);
        cv.MessageCenter.register("showUpgradeView", this.showUpgradeView.bind(this), this.node);
        cv.MessageCenter.register("sortATLView", this.sortATLView.bind(this), this.node);
        cv.MessageCenter.register("jumpToMtt", this.jumpToMtt.bind(this), this.node);
        cv.MessageCenter.register("jumpToBlackJack", this.jumpToBlackJack.bind(this), this.node);

        cv.MessageCenter.register("hallEnterMTT", this.hallEnterMTT.bind(this), this.node);
        cv.MessageCenter.register("doKycVerification", this.onDoKycVerification.bind(this), this.node);
        cv.MessageCenter.register("jumpToMiniGamesHall", this.hallShowMiniGames.bind(this), this.node);
        cv.MessageCenter.register("jumpToHallBank", this.hallShowBank.bind(this), this.node);
        cv.MessageCenter.register("sendBonusAndFreeGamesMsg", this.onBonusAndFreeResponse.bind(this), this.node);



        //私语版本，走私语切换后台注册
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.register("on_syOnEnterBackground", this.OnAppEnterBackground.bind(this), this.node);
            cv.MessageCenter.register("on_syOnEnterForeground", this.OnAppEnterForeground.bind(this), this.node);
        }
    };

    /**
     * name
     */
    public onDoKycVerification() {
        cv.TP.showMsg(cv.config.getStringData("WithdrawLocked_KYC_Required")
            , cv.Enum.ButtonStyle.TWO_BUTTON
            , this.startKYCProcess.bind(this));
    }

    startKYCProcess(): void {
        console.log("startKYCProcess............");
        JumioKYCHandler.getInstance().startJumioProcess(true, this.onKYCFinished.bind(this), this.onKYCFinished.bind(this));
    }

    onKYCFinished() {
        // cv.netWorkManager.Logout();
    }

    onDestroy() {

        if (cv.config.isSiyuType()) {
            cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
            cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
        }
        cv.MessageCenter.unregister("routeChange", this.routeChange.bind(this));
        cv.MessageCenter.unregister("update_info", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);

        cv.MessageCenter.unregister("showLabaPanel", this.node);
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);

        cv.MessageCenter.unregister("switchSceneToMiniGame", this.node);
        cv.MessageCenter.unregister("switchSceneToSelfView", this.node);
        cv.MessageCenter.unregister("on_need_slider_verify", this.node);
        cv.MessageCenter.unregister("jumpgto_notice", this.node);
        cv.MessageCenter.unregister("showUpgradeView", this.node);
        cv.MessageCenter.unregister("sortATLView", this.node);
        cv.MessageCenter.unregister("jumpToMtt", this.node);
        cv.MessageCenter.unregister("jumpToBlackJack", this.node);
        cv.MessageCenter.unregister("hallEnterMTT", this.node);
        cv.MessageCenter.unregister("doKycVerification", this.node);
        cv.MessageCenter.unregister("jumpToMiniGamesHall", this.node);
        cv.MessageCenter.unregister("sendBonusAndFreeGamesMsg", this.node);
        cv.MessageCenter.unregister("jumpToHallBank", this.node);

    }

    /**
     * 显示升级账号界面
     */
    public showUpgradeView() {
        let inst: cc.Node = UpgradeView.getSinglePrefabInst(this.upgradePref);
        inst.active = true;
        inst.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_7;
        cv.action.addChildToSceneOnce(inst);
        //cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
    }

    /**
     * 游戏进入后台时触发的事件
     * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为
     * 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为
     */
    OnAppEnterBackground(): void {

        console.log("###################### OnAppEnterBackground: 后台");
        //私语版本, 切回后台后，将所有音频暂停
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            if (cc.sys.os == cc.sys.OS_IOS) {
                //creator IOS平台的网页web版，切换后台，再切回游戏后。会出现所有音乐、音效播放没有声音的bug。
                //在切回后播放一个无声的mp3背景音乐，保持ios音效处于激活状态。在切回前台后，再stop背景音乐，可以临时解决这个问题。
                cv.AudioMgr.play(this.silenceMusic, true, 0.1, true);
            }
        }

    }

    /**
     * 游戏进入前台运行时触发的事件
     * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为
     * 在原生平台，它对应的是应用被切换到前台事件
     */
    OnAppEnterForeground(): void {
        console.log("###################### OnAppEnterForeground: 前台");
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            if (cc.sys.os == cc.sys.OS_IOS) {
                cv.AudioMgr.stop(cv.AudioMgr.getAudioID(this.silenceMusic));
            }
        }

    }

    public onGetPlayerInfoSuccess() {
        if (cv.dataHandler.getUserData().HeadPath.length == 0) {
            let path = Math.floor(cv.StringTools.randomRange(cv.config.HEAD_LENGTH / 2, cv.config.HEAD_LENGTH) + 1).toString();
            let strUrl: string = cv.dataHandler.getUserData().headUrl;
            let u64Key = strUrl.lastIndexOf("/") + 1;
            let name = strUrl.substr(u64Key);
            if (name.length == 0) {
                cv.dataHandler.getUserData().HeadPath = path;
                cv.httpHandler.setDefaultHead(path);
            }
        }
        this.updateChipNum();
    }

    /**
     * 点击发现按钮
     * @param event 
     */
    onBtnFindClick(event: cc.Component.EventHandler) {
        this.swithView(this.findView, event.target);
        cv.AudioMgr.playButtonSound('hall_bottom_button');

        // 活动弹框
        let activityNode = cc.director.getScene().getChildByName("activityView");
        if (activityNode && activityNode.getComponent(ActivityView)) {
            activityNode.getComponent(ActivityView).reOpenActivity();
        }
        // 检测拉霸
        else {
            this.showLabaPanel();
        }

        // "发现列表"事件采集
        this.trackFindView();
    }

    /**
     * 点击小游戏按钮
     * @param event 
     */
    onBtnMiniGamesClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('hall_bottom_button');
        this.swithView(this.miniGamesView, event.target);

        // 跟踪用户行为, 发送事件
        cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.casino);
    }

    /**
     * 点击中间充值界面按钮
     * @param event 
     */
    onBtnEarnClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('hall_bottom_button');
        this.swithView(this.earnView, event.target);
        cv.tools.SaveStringByCCFile("welfareNew", "false");
        this.bankBtnDot.active = false;
    }

    /**
     * 点击公告按钮
     * @param event 
     */
    onBtnNoticeClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('hall_bottom_button');
        if (cv.config.isOverSeas() || cv.config.isVietnam()) {  //海外版和越南版
            this.swithView(this.referalsView, event.target);
        }
        else {
            this.swithView(this.noticeView, event.target);
            this.noticeView.getComponent(NoticeView).setWebView(event.customEventData);
        }
    }

    /**
     * 点击我的空间按钮
     * @param event 
     */
    onBtnSelfClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('hall_bottom_button');
        this.swithView(this.selfView, event.target);
        cv.config.getLog();
        // 跟踪用户行为, 发送事件
        cv.segmentTool.track(cv.Enum.CurrentScreen.profileSettings, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.invite);
    }

    showLabaPanel(): void {
        let lababViewNode = this.node.getChildByName("labaViewNode");
        if (!lababViewNode) {
            lababViewNode = cc.instantiate(this.labaViewPref);
            lababViewNode.name = "labaViewNode";
            this.node.addChild(lababViewNode, 2);
            // 适配widget
            cv.resMgr.adaptWidget(lababViewNode);
            lababViewNode.setPosition(cc.v2(0, 0));
            lababViewNode.active = false;
        }

        if (cv.dataHandler.getUserData().luckindex < cv.dataHandler.getUserData().lucks.length) {
            this.sortATLView();
        }
        else {
            lababViewNode.active = false;
        }
    }

    swithView(node: cc.Node, btnNode: cc.Node) {
        this._isNoticeView = node == this.noticeView;
        this._isFindView = node == this.findView;
        this.findView.active = false;
        this.selfView.active = false;
        this.earnView.active = false;
        this.noticeView.active = false;
        this.referalsView.active = false;
        this.miniGamesView.active = false;

        this.showImg(this.findBtn, false);
        this.showImg(this.noticeBtn, false);
        this.showImg(this.selfBtn, false);
        this.showImg(this.earnBtn, false);
        this.showImg(this.minigameBtn, false);

        if (cv.config.isOverSeas() || cv.config.isVietnam()) {  //海外版和越南版
            this.showImg(this.findBtn_en, false);
            this.showImg(this.dataBtn_en, false);
            this.showImg(this.earnBtn_en, false);
            this.showImg(this.selfBtn_en, false);
        }

        if (!this._isNoticeView) {
            this.noticeView.getComponent(NoticeView).cleanWebview();
        }

        node.active = true;
        if (node != this.findView) {
            this.findView.getComponent(FindView).HandleCheckWebView(false);
            this.findView.getComponent(FindView).hideQuickEnterView();
            // 新年活动
            this.initNewYear(false);
        }
        else {
            this.findView.getComponent(FindView).HandleCheckWebView(true);
            // 新年活动
            this.initNewYear(cv.config.isShowNewYear());
        }

        this.showImg(btnNode.getParent(), true);
    }

    swithViewByViewIdx(viewIdx: number): void {
        let view: cc.Node = null;
        let view_btn: cc.Node = null;
        let isOverSeas: boolean = cv.config.isOverSeas() || cv.config.isVietnam();  // 海外版和越南版

        switch (viewIdx) {
            // 小游戏
            case 2: {
                view = this.miniGamesView;
                view_btn = this.minigameBtn.getChildByName("btn");
                if (isOverSeas) {
                    view = this.findView;
                    view_btn = this.findBtn_en.getChildByName("btn");
                }
            } break;

            // 存取款
            case 3: {
                view = this.earnView;
                view_btn = this.earnBtn.getChildByName("btn");
                if (isOverSeas) {
                    view_btn = this.earnBtn_en.getChildByName("btn");
                }
            } break;

            // 公告
            // case 4: {
            //     view = this.noticeView;
            //     view_btn = this.noticeBtn.getChildByName("btn");
            //     if (isOverSeas) {
            //         view = this.referalsView
            //         view_btn = this.dataBtn_en.getChildByName("btn");
            //     }
            // } break;

            // 我
            case 5: {
                view = this.selfView;
                view_btn = this.selfBtn.getChildByName("btn");
                if (isOverSeas) {
                    view_btn = this.selfBtn_en.getChildByName("btn");
                }
            } break;


            case 1: // 发现列表
            case 4: // 公告(网页和活动弹窗网页重叠, 层级都是置顶, 会遮罩底部按钮, 引擎原生层bug, 要解决改动很大, 不稳, 暂时禁用处理)
            default: {
                view = this.findView;
                view_btn = this.findBtn.getChildByName("btn");
                if (isOverSeas) {
                    view_btn = this.findBtn_en.getChildByName("btn");
                }
            } break;
        }

        // 切换至目标面板
        this.swithView(view, view_btn);

        // // 公告面板(要主动调用网页设置)
        // if (viewIdx === 4 && !isOverSeas) {
        //     this.noticeView.getComponent(NoticeView).setWebView();
        // }

        // "发现列表"事件采集
        this.trackFindView();
    }

    /**
     * 采集每次激活"发现列表"时的用户数据
     */
    trackFindView(): void {
        if (!this._isFindView) return;

        let gameType: number = DiscoverGameType.DZPK;
        let gameIndex: number = 0;
        let findView: FindView = this.findView.getComponent(FindView);
        let saveStr: string = cv.tools.GetStringByCCFile(findView.SAVE_gameType);
        if (cv.StringTools.getArrayLength(saveStr) > 0) {
            gameType = cv.Number(saveStr);
        }
        gameIndex = cv.Number(cv.tools.GetStringByCCFile(findView.SAVE_wxzd));

        let format_type: string = `MainScene_Scene_gameType_panel_button${gameType}_text`;
        let format_index: string = `MainScene_Scene_pokerPage_panel_button${gameIndex}_text`;
        let selectedGameType: string = cv.config.getStringData(format_type);
        let selectedStakes: string = cv.config.getStringData(format_index);

        // 奥马哈没有"微/小/中/大"
        if (gameType === DiscoverGameType.PLO) {
            selectedStakes = "";
        }

        // 跟踪用户行为, 发送事件
        let properties = { selectedGameType: selectedGameType, selectedStakes: selectedStakes };
        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.poker, properties);
    }

    showImg(node: cc.Node, isView: boolean) {
        var img = node.getChildByName("img");
        if (img) {
            img.active = isView;
        }
    };

    updateChipNum() {
        this.goldView.getComponent(GoldViewNew).UpdateUserInfo();
    };

    firstShowActivityPanel() {

        //获取当次登录后，是否还有没显示到的活动弹窗
        let haveNoShowActivity = cv.dataHandler.getActivityData().getActivityHaveNotShow();
        console.log("Enter hallscene firstShowActivityPanel: " + haveNoShowActivity);

        // 被动切换到助力红包界面时  不显示
        if (haveNoShowActivity && !cv.dataHandler.getUserData().is_goto_myredpacket) {
            cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).init();
            if (cv.dataHandler.getActivityData().showType != ActivityType.NONE) {
                cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).showActivity(cv.dataHandler.getActivityData().showType);
                cv.dataHandler.getActivityData().showType = ActivityType.NONE;
            }
            else {
                cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).showActivity();
            }
        } else {
            cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).removeWebview();
        }
    }

    onBtnAddCoinClick() {
        cv.SHOP.RechargeClick();
    }

    onBtnKeFuClick() {
        cv.AudioMgr.playButtonSound('button_click');
        // this.onDoKycVerification();
        // return;
        this.HandleSwitchServer(false);
        let fuc: Function = (): void => {
            this.HandleSwitchServer(true);
            cv.httpHandler.getCustom();
            cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).clearCallBack();
        };
        cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).init();
        cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).showActivity(1, fuc);
    }

    HandleSwitchServer(isView?: boolean) {
        isView = (isView == true && this._isNoticeView) ? true : false;
        this.noticeView.active = isView;

        if (isView) {
            this.noticeView.getComponent(NoticeView).setWebView(undefined);
        }
        else {
            this.noticeView.getComponent(NoticeView).cleanWebview();
        }
    }

    private onClickSwitchServer() {
        cv.AudioMgr.playButtonSound('button_click');
        console.log("onClickSwitchServer");
        let bol: boolean = cv.domainMgr.isHaveNextServer();
        //if (bol){
        cv.MessageCenter.send("HideWebview_ShowWindows", false);
        cv.TP.showMsg(cv.config.getStringData("UIWitchServer2"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onGoReconnect.bind(this), this.onNoReconnect.bind(this));
        //}
    }

    private showSafe(): void {
        cv.AudioMgr.playButtonSound('button_click');
        cv.MessageCenter.send("HideWebview_ShowWindows", false);
        if (cv.dataHandler.getUserData().isTouristUser) {
            cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_useSafe_barntips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
            return;
        }
        cv.worldNet.RequestGetStrongboxInfo();

        /*
        let _logMttDir: string = 'files';
        let _logMttPath: string = 'files/log_mtt.txt';
        if (jsb.fileUtils.isDirectoryExist(_logMttDir)) {
            console.log(_logMttDir + "  存在");
            if (jsb.fileUtils.isFileExist(_logMttPath)) {
                console.log(_logMttPath + "  文件存在");
            }
        }*/

        this.safe = cc.instantiate(this.safePref);
        cc.director.getScene().addChild(this.safe, cv.Enum.ZORDER_TYPE.ZORDER_6);
        this.safe.name = "safe_pref";
        if (this._isNoticeView) {
            this._isNoticeView = false;
            this.safe.getComponent(Safe).setCloseCallBack(() => {
                this._isNoticeView = true;
            });
        }
        else {
            this.safe.getComponent(Safe).setCloseCallBack(null);
        }

    }

    private onGoReconnect() {
        cv.MessageCenter.send("HideWebview_ShowWindows", true);
        cv.netWorkManager.onGoReconnect();
    }

    private onNoReconnect() {
        cv.MessageCenter.send("HideWebview_ShowWindows", true);
    }

    private _onMsgSwitchSceneToMiniGame() {
        this.swithView(this.miniGamesView, this.minigameBtn.getChildByName("btn"));
    }

    private _onMsgSwitchSceneToSelfView() {
        this.swithView(this.selfView, this.selfBtn.getChildByName("btn"));
    }

    /**
     * 真人验证
     * 大厅这里的验证消息目前是针对急速"JoinRoom"失败后抛出的, 所以没带参数,
     * 如果是其他验证则需要重新修改逻辑, 加入参数去区分了
     */
    private _onMsgNeedSliderVerify(): void {
        let sliderVerify: SliderVerify = SliderVerify.initSingleInst(this.sliderVerify_prefab, this.node, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        sliderVerify.autoShow((): void => {
            // do something
        });
    }

    private _onjumpgto_notice(url) {
        let event = new cc.Component.EventHandler;
        event.customEventData = url;
        event.target = cc.find("btn", this.noticeBtn);
        this.onBtnNoticeClick(event);

        // 跳转公告面板时如果已经显示拉霸, 则隐藏拉霸
        let lababViewNode = this.node.getChildByName("labaViewNode");
        if (lababViewNode && lababViewNode.active) {
            lababViewNode.getComponent(LabaView).closeView(false);
        }
    }

    initNewYear(isShowNewYear) {
        let path = isShowNewYear ? "zh_CN/festival/newyear/newyear_bg_newyear" : "zh_CN/common/icon/bg_top_01";
        cv.resMgr.setSpriteFrame(cc.find("bg_top_img", this.node), path);
        cc.find("newyear_up_node", this.node).active = isShowNewYear;
        path = isShowNewYear ? "zh_CN/festival/newyear/newyear_safe_icon" : "zh_CN/hall/safe/safe_icon";
        cv.resMgr.setSpriteFrame(cc.find("mainView/safe", this.node), path);
        path = isShowNewYear ? "zh_CN/festival/newyear/newyear_main_witch_server_button" : "zh_CN/hall/safe/main_witch_server_button";
        cv.resMgr.setSpriteFrame(cc.find("mainView/switchServer", this.node), path);
        path = isShowNewYear ? "zh_CN/festival/newyear/newyear_icon_kefu" : "zh_CN/hall/safe/icon_kefu";
        cv.resMgr.setSpriteFrame(cc.find("mainView/kefu", this.node), path);
        if (MailEntrance.getInstance() != null) {
            path = isShowNewYear ? "zh_CN/festival/newyear/newyear_icon_bell" : "zh_CN/common/icon/icon_bell";
            cv.resMgr.setSpriteFrame(MailEntrance.getInstance().node, path);
        }
    }

    initGoldView() {
        this.goldView = cc.instantiate(this.goldViewPref);
        this.noticeView.parent.addChild(this.goldView);
        if (!cv.config.IS_FULLSCREEN) {
            this.goldView.getComponent(GoldViewNew).setViewStyle(2);
        }
        this.goldView.name = "goldView_pref";
        let goldPos = this.gold_Panel.getPosition();
        let goldSize = this.goldView.getContentSize();

        let offSet_y = 0;
        if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_FULLSCREEN) {
            //防止刘海屏遮挡金币框
            offSet_y = 6;
        }
        this.goldView.setPosition(cc.v2(goldPos.x - goldSize.width / 2, goldPos.y - goldSize.height / 2 - offSet_y));
    }

    sortATLView(): void {
        // 玩家从游戏中切换到助力红包界面时  不弹其它的活动弹框
        if (cv.dataHandler.getUserData().is_goto_myredpacket) return;
        let activityNode = cc.director.getScene().getChildByName("activityView");
        let lababViewNode = this.node.getChildByName("labaViewNode");
        let ticketNode = cc.director.getScene().getChildByName(TicketView.NAME);
        if (activityNode && activityNode.active) {
            if (ticketNode) {
                ticketNode.active = false;
            }
        }
        else if (TicketView.IS_VIEW) {
            if (ticketNode.getComponent(TicketView).getData) {
                if (!ticketNode.getComponent(TicketView).isClose) {
                    ticketNode.getComponent(TicketView).show();
                }
                else {
                    if (cv.dataHandler.getUserData().luckindex < cv.dataHandler.getUserData().lucks.length) {
                        lababViewNode.active = true;
                        lababViewNode.getComponent(LabaView).updateView();
                    } else {
                        if (cv.dataHandler.getUserData().isShow_help_warp) {
                            cv.dataHandler.getUserData().isShow_help_warp = false;
                            cv.TP.showMsg(cv.config.getStringData("MyRedPackets_login_notice"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                                this._onMsgSwitchSceneToSelfView();
                                cv.MessageCenter.send("open_myredpackets");
                            });
                            cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MY_RED_PACKETS);
                        }
                    }
                }
            }
        }
        else {
            if (cv.dataHandler.getUserData().luckindex < cv.dataHandler.getUserData().lucks.length) {
                lababViewNode.active = true;
                lababViewNode.getComponent(LabaView).updateView();
            } else {
                if (cv.dataHandler.getUserData().isShow_help_warp) {
                    cv.dataHandler.getUserData().isShow_help_warp = false;
                    cv.TP.showMsg(cv.config.getStringData("MyRedPackets_login_notice"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                        this._onMsgSwitchSceneToSelfView();
                        cv.MessageCenter.send("open_myredpackets");
                    });
                    cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_MY_RED_PACKETS);
                }
            }
        }
    }

    jumpToMtt() {
        let tag = this.findView.getComponent(FindView).MTT_NUM;
        this.findView.getComponent(FindView).setViewGametype(tag, true);
        this.swithView(this.findView, this.findBtn.children[0]);
    }

    jumpToBlackJack() {
        let tag = this.findView.getComponent(FindView).BLACKJACK_NUM;
        this.findView.getComponent(FindView).setViewGametype(tag, true);
        this.findView.getComponent(FindView).onShowBJPVPTab();
        this.swithView(this.findView, this.findBtn.children[0]);
    }

    hallEnterMTT() {
        if (cv.roomManager.isEnterMTT) {
            cv.action.setAcMapHide();

            let safe_pref = cc.director.getScene().getChildByName("safe_pref");
            if (cc.isValid(safe_pref, true)) {
                safe_pref.getComponent(Safe).closeView();
            }

            cv.MessageCenter.send("jumpToMtt");
            // this.findView.getComponent(FindView).enterMTTHall(cv.roomManager.mtt_id);
            this.findView.getComponent(FindView).enterMTTGame(cv.roomManager.mtt_id);
        }
    }

    // 跳转到电子游戏列表
    hallShowMiniGames(data: any) {
        this.swithView(this.miniGamesView, this.minigameBtn.getChildByName("btn"));
        cv.MessageCenter.send("enterMiniGameEvent", data);
    }

    //跳转到银行
    hallShowBank(data: any) {
        this.swithView(this.earnView, this.earnBtn.getChildByName("btn"));
        cv.tools.SaveStringByCCFile("welfareNew", "false");
        this.bankBtnDot.active = false;
    }

    //银行按钮上面的红点
    onBonusAndFreeResponse() {
        let _bShowGuidDot = cv.tools.GetStringByCCFile("welfareNew");
        if (_bShowGuidDot === "true") {
            this.bankBtnDot.active = true;
        } else {
            this.bankBtnDot.active = false;
        }

    }
}