import cv from "../cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import { HashMap } from "../../../common/tools/HashMap";
import { ConnectServerFailedReason } from "../../../common/tools/Enum";
import { ImpokerHallFeature } from "../../../../mtt/script/feature/ImpokerHallFeature";
import { ResourcesLoader } from "../../../../mtt/script/common/ResourcesLoader";
import { Translate } from "../../../../mtt/script/common/Translator";
import { WorldWebSocket } from "../../../../mtt/script/common/net/worldWebsocket";
import HallScene from "./HallScene";

import ws_protocol = require("../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import ListView from "../../../common/tools/ListView";
import { ConsoleLog } from "../../../../mtt/script/common/ConsoleLog";
import LoadingBlocker from "../../../../mtt/script/common/LoadingBlocker"; import FindItem from "./FindItem";
import MTTConnector from "../../../../mtt/script/common/MTTConnector";
import FindItemStar from "./FindItemStar";
import BJPVPConnector from "../../../../blackjackpvp/script/common/BJPVPConnector";
import { BJPVPGameList } from "../../../../blackjackpvp/script/hall/BJPVPGameList";
import { Translate as BJTranslate } from "../../../../blackjackpvp/script/common/BJPVPTranslator";
import { BJTranslation } from "../../../../blackjackpvp/script/common/BJPVPLangData";

export enum DiscoverGameType {
    ALL = 0,
    DZPK,
    DZPK_SHORT,
    AOF,
    BET,
    ZOOM_TEXAS,
    MTT,
    JACKFRUIT,
    PLO,
    BLACKJACKPVP
};

const { ccclass, property } = cc._decorator;

@ccclass
export default class FindView extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;
    @property(cc.ScrollView)
    scrollView_mtt: cc.ScrollView = null;
    @property(cc.Prefab)
    findItem: cc.Prefab = null;
    @property(cc.Prefab)
    fastEnter_titile: cc.Prefab = null;
    @property(cc.Prefab)
    fastEnter_content: cc.Prefab = null;
    @property(cc.Prefab)
    fastEnter_search: cc.Prefab = null;
    @property(cc.Node)
    ef_scroll: cc.Node = null;
    @property(cc.Node)
    refreshTop: cc.Node = null;
    @property(cc.Node)
    selectimg: cc.Node = null;

    itemData: world_pb.ClubGameSnapshot[] = [];
    weiData: Array<any> = [];
    xiaoData: Array<any> = [];
    zhongData: Array<any> = [];
    daData: Array<any> = [];
    helpData: Array<any> = [];
    noSeeFull: boolean = true;
    viewIndex: number = 0;
    isTopSend: boolean = false;
    fastEnter_data: HashMap<number, HashMap<number, string[]>> = new HashMap();//必下、aof、短牌aof、德州、短牌
    fastEnter_dataLen: number = 8;
    fastEnter_saveData: Array<string> = [];
    fastEnter_chooseNode: HashMap<string, cc.Node> = new HashMap();//具体内容+对应节点
    isHelpView: boolean = false;
    sHelpName: string = "";
    quickPanelPos: cc.Vec2 = new cc.Vec2(0, 0);
    topScrollSize: cc.Size = new cc.Size(0, 0);
    isStart: boolean = false;
    isGetData: boolean = false;

    private fillter_txt: cc.Label;
    private fillter_line: cc.Node;
    @property(cc.PageView) img_PageView: cc.PageView = null;
    @property(cc.ScrollView) gameType_scrollView: cc.ScrollView = null;
    @property(cc.Node) discover_panel: cc.Node = null;
    @property(cc.Node) gameType_panel: cc.Node = null;
    @property(cc.Node) pokerPage_panel: cc.Node = null;
    _whiteCircleList: cc.Node[] = [];
    _gamebuttonList: cc.Node[] = [];
    _gameType: number = DiscoverGameType.DZPK;
    PKW_GAME_TYPE: number[] = [1, 2, 8, 4, 7]; // 可配置  0 全部 1德州 2短牌 3AOF 4必下 5急速 6 mtt 7菠萝蜜 8奥马哈 9:21点（数组包含的游戏 可以打乱顺序）
    PKC_GAME_TYPE: number[] = [1, 2, 4];// 可配置  0 全部 1德州 2短牌 3AOF 4必下 5急速
    _jspkArr: any[] = [];
    /**记录游戏目录 */
    SAVE_gameType: string = "last_gameType";
    /**记录微小中大 */
    SAVE_wxzd: string = "FindView_wxzd";
    /**记录是否查看满桌 */
    SAVE_seeFull: string = "FindView_noSeeFull";
    /**记录快速选择 */
    SAVE_helpChoose: string = "FindView_helpChoose";

    matchWeb: cc.WebView = null;
    matchWebNode: cc.Node = null;
    matchUrl: string = "";
    matchWeb_pos: cc.Vec2 = cc.v2(0, 0);
    webIsView: boolean = true;
    MTT_NUM: number = 6;
    BLACKJACK_NUM: number = 9;
    mtt_img: cc.Node = null;
    isClickScreenbtn: Boolean = false;
    isClickSeatbtn: Boolean = false;
    gameModeBtnScreenNum: number = 0;

    mttUseWebView: boolean = false;
    mtt: ImpokerHallFeature = null;
    mttUrl: string = "";
    mttInitPos = cc.v2(628, (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_FULLSCREEN) ? 125 + cv.config.FULLSCREEN_OFFSETY_B : 125);//cc.v2(627.37, 122.63);
    mttResRetryCount: number = 0;
    mttMaxResRetryCount: number = 3;
    hasInitMTT: boolean = false;
    mttSetTimeout: any = null;
    @property(cc.Prefab) mttPrefab: cc.Prefab = null;

    @property(cc.Prefab) bjpvpPrefab: cc.Prefab = null;
    bjpvp: BJPVPGameList = null;
    scrollViewTop: number = 0;

    onLoad() {

        //初始化添加21点
        if (cv.config.HAVE_BLACKJACK) {
            this.PKW_GAME_TYPE.splice(2, 0, this.BLACKJACK_NUM);
        }

        //初始化添加mtt
        if (cv.config.HAVE_MTT) {
            this.PKW_GAME_TYPE.unshift(this.MTT_NUM);
        }

        cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0");
        cv.resMgr.adaptWidget(this.node, true);
        this.scrollViewTop = this.scrollView.node.getComponent(cc.Widget).top;
        this.quickPanelPos = cc.find("quick_seat_touch_panel", this.node).position;
        this.topScrollSize = cc.size(this.ef_scroll.parent.width, this.ef_scroll.parent.height);
        this.mtt_img = cc.find("discover_panel/mttImg", this.node);

        let mtt_img_widget = this.mtt_img.getComponent(cc.Widget);
        if (mtt_img_widget) {
            mtt_img_widget.bottom = (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_FULLSCREEN) ? 120 + cv.config.FULLSCREEN_OFFSETY_B : 120;
        }

        this.registerMsg();

        this.img_PageView.node.on("page-turning", this.touchImgPageview, this);

        this.fillter_txt = cc.find("pokerPage_panel/button4/label", this.node).getComponent(cc.Label);
        this.fillter_line = cc.find("pokerPage_panel/button4/selectimg", this.node);

        this._gamebuttonList = [];
        let cell = (this.gameType_panel.getChildByName("button_0"));
        cc.find("new_icon", cell).active = false;
        let len = cv.config.isOverSeas() ? this.PKC_GAME_TYPE.length : this.PKW_GAME_TYPE.length;
        let cellSize = cc.size(this.gameType_panel.width / len - 3, cell.height);
        this.selectimg.setContentSize(cellSize.width, this.selectimg.height);

        // 关闭滚动(按照原来算法逻辑的表现效果是不滚动的, 若后续需要滚动屏蔽此处修改)
        this.gameType_scrollView.horizontal = false;
        this.gameType_scrollView.vertical = false;

        // 排版起点坐标
        let x: number = this.gameType_scrollView.content.width * (0 - this.gameType_scrollView.content.anchorX);
        let y: number = this.gameType_scrollView.content.height * (0.5 - this.gameType_scrollView.content.anchorY);

        for (let i = 0; i < len; i++) {
            let button = cc.instantiate(cell);
            let tag;
            if (cv.config.isOverSeas()) {
                tag = this.PKC_GAME_TYPE[i];
            } else {
                tag = this.PKW_GAME_TYPE[i];
            }

            button.name = "btn_" + tag;
            button.on("click", (event: cc.Event) => {
                this.setViewGametype(tag, true);
                cv.AudioMgr.playButtonSound('tab');
                if (tag == this.MTT_NUM && cv.config.HAVE_MTT) {
                    this.onShowMttTab();
                }
                else if (tag == this.BLACKJACK_NUM && cv.config.HAVE_BLACKJACK) {
                    this.onShowBJPVPTab();
                }
                else {
                    this.HandleCheckMTT(false);
                    this.handleCheckBJPVP(false);
                    this.updateGameTypeDataAndView();
                }

                this.scrollView.scrollToTop(0.05);

                // 跟踪用户行为, 发送事件
                let gameType: string = button.getChildByName("text").getComponent(cc.Label).string;
                let properties = { gameType: gameType };
                cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.LobbyGameTypeSelected, cv.Enum.Functionality.poker, properties);
            }, this);
            this._gamebuttonList.push(button);
            button.setContentSize(cellSize);
            let split: number = this.gameType_scrollView.content.width / len;
            let btn_x: number = x + split * i + split / 2 + button.width * (button.anchorX - 0.5);
            let btn_y: number = y;
            button.setPosition(btn_x, btn_y);
            this.gameType_scrollView.content.addChild(button);
        }
        cell.active = (false);

        this.noSeeFull = cv.tools.GetStringByCCFile(this.SAVE_seeFull) == "1" ? true : false;
        this.viewIndex = cv.Number(cv.tools.GetStringByCCFile(this.SAVE_wxzd));
        if (this._gameType == DiscoverGameType.PLO && this.viewIndex != 0) {
            this.viewIndex = 0;
        }
        this.initGameType();

        for (let i = 0; i < 4; i++) {
            cc.find("pokerPage_panel/button" + i, this.node).on(cc.Node.EventType.TOUCH_END, this.onBtnCardListTypeClick, this);
        }
        cc.find("pokerPage_panel/button3/action_node", this.node).active = false;
        this.changeView(this.viewIndex, true);
        this.changeNoSeeFull(this.noSeeFull);

        cc.find("quick_seat_touch_panel/quick_seat_panel/backGroundBg", this.node).on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { event.stopPropagation(); });
        let topNode = cc.find("quick_seat_touch_panel", this.node);
        topNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
            this.hideQuickEnterView();
        });

        this.initLanguage();

        // 第一次加载脚本时请求数据(因为"HallScen"的默认界面现在改为配置下发, 不一定是"FindView", 
        // 所以要重新请求下, 原来是登录wold服就请求, 但是该界面没有激活, 也就是没有提前注册接受消息, 所以数据会被过滤掉)
        cv.worldNet.requestCurrentBoardList();

        // 下拉滚动时请求刷新列表数据
        this.refreshTop.getComponent('RefreshTop').setRefreshListener(() => {
            this.isTopSend = true;
            cv.worldNet.requestCurrentBoardList();
        });
        if (cv.config.HAVE_MTT) {
            this.initMTT();
        }
    }

    start() {
        cv.worldNet.BannerRequest();
        this.getFastEnterSaveRecord();
        this.isStart = true;
        // cv.resMgr.adaptWidget(this.scrollView.node, true);
        // // cv.config.adaptSize([this.scrollView.node]);
        // let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
        // sv.bindPrefab(this.findItem, "FindItem", []);
        // sv.generateItemPool();

        this.scrollView.getComponent(ListView).bindScrollEventTarget(this);
        this.scrollView.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));

        if (this.isGetData) {
            this.showViewForData();
        }
        console.log(this._gameType, cv.config.HAVE_MTT);
        if (this._gameType == this.MTT_NUM && cv.config.HAVE_MTT) {
            this.onShowMttTab();
            this.scrollView.node.active = false;
            this.updatePokerPagePanelActive();
        }
        else if (this._gameType == this.BLACKJACK_NUM && cv.config.HAVE_BLACKJACK) {
            this.onShowBJPVPTab();
            this.scrollView.node.active = false;
            this.updatePokerPagePanelActive();
        }
        else {
            this.mtt_img.active = false;
        }
    }

    onDestroy() {
        cv.dataHandler.clearBanner();
        cv.MessageCenter.unregister("noticeCurrentBoardList", this.node);
        cv.MessageCenter.unregister("Join_room", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("update_bannerImg", this.node);
        cv.MessageCenter.unregister("update_mtt_state", this.node);
        cv.MessageCenter.unregister("update_blackJack_state", this.node);

        cv.MessageCenter.unregister("FindView_showMttError", this.node);
        cv.MessageCenter.unregister("RequestAuthApi_ForMTT", this.node);
        cv.MessageCenter.unregister("mttNotify", this.node);

        cv.MessageCenter.unregister("onAuthBlackJackSucc", this.node);
        cv.MessageCenter.unregister("onAuthBlackJackError", this.node);

        cv.MessageCenter.unregister("onAuthMttSucc", this.node);
        cv.MessageCenter.unregister("onAuthMttError", this.node);
    }

    setLanguage() {
        cv.worldNet.BannerRequest();
        this.initLanguage();

        this.setStarTableDotPos();
    }

    private _btnNormal(btn: cc.Node, color: cc.Color) {
        cc.find("Label", btn).color = color;
        cc.find("Label", btn).opacity = 255;
        btn.getComponent(cc.Button).interactable = true;
        btn.getComponent(cc.Button).enabled = true;
    }

    private _btnDisabled(btn: cc.Node, color: cc.Color) {
        cc.find("Label", btn).color = color;
        cc.find("Label", btn).opacity = 102;
        btn.getComponent(cc.Button).interactable = false;
        btn.getComponent(cc.Button).enabled = false;
    }

    initLanguage() {
        if (cv.config.HAVE_BLACKJACK) {
            BJTranslate.SetLanguage(BJPVPConnector.instance.getSelfCurrentLanguage());
        }
        cc.find("discover_panel/title_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("MainScene_Scene_discover_panel_title_text");
        cc.find("discover_panel/club_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("MainScene_Scene_discover_panel_club_button");

        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cc.find("pokerPage_panel/button0/text", this.node).getComponent(cc.Label).fontSize = 44;
            cc.find("pokerPage_panel/button1/text", this.node).getComponent(cc.Label).fontSize = 44;
            cc.find("pokerPage_panel/button2/text", this.node).getComponent(cc.Label).fontSize = 44;
            cc.find("pokerPage_panel/button3/text", this.node).getComponent(cc.Label).fontSize = 44;
        }
        else {
            cc.find("pokerPage_panel/button0/text", this.node).getComponent(cc.Label).fontSize = 35;
            cc.find("pokerPage_panel/button1/text", this.node).getComponent(cc.Label).fontSize = 35;
            cc.find("pokerPage_panel/button2/text", this.node).getComponent(cc.Label).fontSize = 35;
            cc.find("pokerPage_panel/button3/text", this.node).getComponent(cc.Label).fontSize = 35;
        }
        //筛选
        this.setFillterStatus();

        cv.StringTools.setLabelString(this.node, "pokerPage_panel/button0/text", "MainScene_Scene_pokerPage_panel_button0_text");
        cv.StringTools.setLabelString(this.node, "pokerPage_panel/button1/text", "MainScene_Scene_pokerPage_panel_button1_text");
        cv.StringTools.setLabelString(this.node, "pokerPage_panel/button2/text", "MainScene_Scene_pokerPage_panel_button2_text");
        cv.StringTools.setLabelString(this.node, "pokerPage_panel/button3/text", "MainScene_Scene_pokerPage_panel_button3_text");
        cv.StringTools.setLabelString(this.node, "pokerPage_panel/checkBoxButton/openseat_text", "MainScene_Scene_pokerPage_panel_Text_2");
        cv.StringTools.setLabelString(this.node, "quick_seat_touch_panel/quick_seat_panel/title_text", "MainScene_Scene_pokerPage_panel_seat_button_text");
        cv.StringTools.setLabelString(this.node, "quick_seat_touch_panel/quick_seat_panel/game_mode_panel/seat_button/Label", "MainScene_Scene_pokerPage_panel_seat_button_text");
        cv.StringTools.setLabelString(this.node, "quick_seat_touch_panel/quick_seat_panel/game_mode_panel/screen_button/Label", "MainScene_Scene_pokerPage_panel_screen_button_text");

        let btnLen = this._gamebuttonList.length;
        for (let i = 0; i < btnLen; i++) {
            let isNewYear: boolean = cv.config.isShowNewYear();
            let text = (this._gamebuttonList[i].getChildByName("text")).getComponent(cc.Label);
            let newyear_icon_left = this._gamebuttonList[i].getChildByName("newyear_icon_left");
            let newyear_icon_right = this._gamebuttonList[i].getChildByName("newyear_icon_right");

            let tag;
            if (cv.config.isOverSeas()) {
                tag = this.PKC_GAME_TYPE[i];
            } else {
                tag = this.PKW_GAME_TYPE[i];
            }
            if (tag == this.MTT_NUM && cv.dataHandler.getUserData().isViewWPT) {
                text.string = "WPT";
            }
            else if (tag == this.BLACKJACK_NUM) {
                text.string = BJTranslate(BJTranslation.HALL.GAME_LIST.GAME_NAME);
            }
            else {
                text.string = (cv.config.getStringData(cv.StringTools.formatC("MainScene_Scene_gameType_panel_button%d_text", tag)));
            }

            if (btnLen > 6) {
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    text.fontSize = 36;
                }
                else {
                    text.fontSize = isNewYear ? 26 : (29);
                }
            } else {
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    text.fontSize = (44);
                }
                else {
                    text.fontSize = isNewYear ? 26 : (32);
                }
            }

            let isShowNew: boolean = false;//(tag == this.BLACKJACK_NUM);
            let button = this._gamebuttonList[i];
            let _newIcon = cc.find("new_icon", button);
            if (isShowNew) {
                let text = cc.find("text", button)
                text.getComponent(cc.Label).string = (cv.config.getStringData(cv.StringTools.formatC("MainScene_Scene_gameType_panel_button%d_text", tag)));
                _newIcon.x = text.x + cv.resMgr.getLabelStringSize(text.getComponent(cc.Label)).width / 2;
            }
            _newIcon.active = isShowNew;

            let textpos = text.node.getPosition();
            let labelWidth = cv.resMgr.getLabelStringSize(text).width;
            newyear_icon_left.setPosition(textpos.x - labelWidth / 2 - newyear_icon_left.getContentSize().width / 2 - 2, newyear_icon_left.getPosition().y);
            newyear_icon_right.setPosition(textpos.x + labelWidth / 2 + newyear_icon_right.getContentSize().width / 2 + 2, newyear_icon_left.getPosition().y);
        }
        //适配不看满桌
        let tab01_line2 = cc.find("pokerPage_panel/tab01_line2", this.node);
        //tab01_line2.setPosition();
        let openseat_text = cc.find("pokerPage_panel/checkBoxButton/openseat_text", this.node);
        let CheckBox = cc.find("pokerPage_panel/checkBoxButton/CheckBox", this.node);
        let checkBoxButton = cc.find("pokerPage_panel/checkBoxButton", this.node);
        let contentWidth = openseat_text.getContentSize().width + CheckBox.getContentSize().width;
        let offsetX = contentWidth > checkBoxButton.getContentSize().width ? contentWidth - checkBoxButton.getContentSize().width : 0;
        let posX = tab01_line2.x - 8 - checkBoxButton.getContentSize().width / 2 - offsetX;
        checkBoxButton.setPosition(posX, checkBoxButton.y);
    }

    private registerMsg() {
        cv.MessageCenter.register("noticeCurrentBoardList", this.noticeCurrentBoardList.bind(this), this.node);
        cv.MessageCenter.register("Join_room", this.inputPsdForJoinRoom.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.setLanguage.bind(this), this.node);
        cv.MessageCenter.register("update_bannerImg", this.initBanner.bind(this), this.node);

        cv.MessageCenter.register("update_mtt_state", this.updateMTTState.bind(this), this.node);
        cv.MessageCenter.register("update_blackJack_state", this.updateBlackJackState.bind(this), this.node); cv.MessageCenter.register("FindView_showMttError", this.showMttError.bind(this), this.node);
        cv.MessageCenter.register("RequestAuthApi_ForMTT", this.RequestAuthApi_ForMTT.bind(this), this.node);

        cv.MessageCenter.register("mttNotify", this.mttNotify.bind(this), this.node);

        cv.MessageCenter.register("onAuthMttSucc", this.onAuthMttSucc.bind(this), this.node);
        cv.MessageCenter.register("onAuthMttError", this.onAuthMttError.bind(this), this.node);

        cv.MessageCenter.register("onAuthBlackJackSucc", this.onAuthBlackJackSucc.bind(this), this.node);
        cv.MessageCenter.register("onAuthBlackJackError", this.onAuthBlackJackError.bind(this), this.node);
    };


    inputPsdForJoinRoom(room_id: number) {
        cv.TP.showMsg("", cv.Enum.ButtonStyle.TWO_BUTTON, this.checkPwd.bind(this, room_id), null, true, cv.config.getStringData("TipsPanel_Title1"));
    }

    checkPwd(room_id: number) {
        let str = cv.TP.getEditBoxString();
        let index = str.search(" ");
        if (str.length <= 0 || index != -1) {
            cv.TT.showMsg(cv.config.getStringData("ErrorCode2"), cv.Enum.ToastType.ToastTypeWarning);
            return;
        }
        cv.roomManager.RequestJoinRoom(cv.Enum.GameId.Texas, room_id, false, true, str);
        // cv.gameNet.RequestJoinRoomWithPassword(room_id, str);
    }

    onSVEventBounceTop(arg: cc.ScrollView): void { }


    //滑动列表中
    onSVEventScrolling(arg: cc.ScrollView): void { }

    //滑动列表松手
    onSVEventTouchCancel(arg: cc.ScrollView) { }

    noticeCurrentBoardList() {
        if (this.isTopSend) {
            this.isTopSend = false;
            this.refreshTop.getComponent('RefreshTop').hideRefresh(() => {
                this.itemData = cv.clubDataMgr.getClubCurrentBoardList();
                this.initJspkList();
                this.updateGameTypeDataAndView();
            });
            return;
        }
        this.itemData = cv.clubDataMgr.getClubCurrentBoardList();
        this.initJspkList();
        this.updateGameTypeDataAndView();
    };


    setStarTableDotPos() {
        //中英文切换的时候，保证红点在文字右上角
        let btnLen = this._gamebuttonList.length;
        for (let i = 0; i < btnLen; i++) {
            let star_icon_dot = cc.find("star_icon_dot", this._gamebuttonList[i]);  //红点标识
            let text = cc.find("text", this._gamebuttonList[i])
            star_icon_dot.x = text.x + cv.resMgr.getLabelStringSize(text.getComponent(cc.Label)).width / 2 + 8;
            //new图标
            let _newIcon = cc.find("new_icon", this._gamebuttonList[i]);
            if (_newIcon && _newIcon.active) {
                _newIcon.x = text.x + cv.resMgr.getLabelStringSize(text.getComponent(cc.Label)).width / 2;
            }
        }

        for (let i = 0; i < 4; i++) {
            let icon = cc.find(cv.StringTools.formatC("pokerPage_panel/button%d/live_icon", i), this.node)
            let text = cc.find(cv.StringTools.formatC("pokerPage_panel/button%d/text", i), this.node)
            icon.x = text.x + cv.resMgr.getLabelStringSize(text.getComponent(cc.Label)).width / 2 + 5;
        }

    }

    //设置明星桌live和红点状态
    setStarTableStatus() {
        //德州明星桌
        let haveTexasStar = this.getHaveTexasStarTable(this.itemData, cv.Enum.CreateGameMode.CreateGame_Mode_Normal);
        //短牌明星桌
        let haveShortStar = this.getHaveTexasStarTable(this.itemData, cv.Enum.CreateGameMode.CreateGame_Mode_Short);
        //显示live图标
        let btnLen = this._gamebuttonList.length;
        for (let i = 0; i < btnLen; i++) {
            let tag = -1;
            if (cv.config.isOverSeas()) {
                tag = this.PKC_GAME_TYPE[i];
            } else {
                tag = this.PKW_GAME_TYPE[i];
            }
            let star_icon_live = cc.find("star_icon_live", this._gamebuttonList[i]);  //live标识
            let star_icon_dot = cc.find("star_icon_dot", this._gamebuttonList[i]);  //红点标识
            star_icon_live.active = false;
            star_icon_dot.active = false;

            let _curHaveStar = 0;
            if (tag == 1) { //德州
                _curHaveStar = haveTexasStar;
            } else if (tag == 2) {  //短牌
                _curHaveStar = haveShortStar;
            }

            if (_curHaveStar == 1) { //有在线明星桌
                star_icon_dot.active = true;
            } else if (_curHaveStar == 2) {  //有已经下播的明星桌
                star_icon_live.active = true;
            }
        }

        //级别红点显示
        let haveWeiStar = this.getHaveTexasStarTable(this.weiData)
        let haveXiaoStar = this.getHaveTexasStarTable(this.xiaoData)
        let haveZhongStar = this.getHaveTexasStarTable(this.zhongData)
        let haveDaStar = this.getHaveTexasStarTable(this.daData)

        cc.find("pokerPage_panel/button0/live_icon", this.node).active = (haveWeiStar == 2 && this.viewIndex != 0) ? true : false;
        cc.find("pokerPage_panel/button1/live_icon", this.node).active = (haveXiaoStar == 2 && this.viewIndex != 1) ? true : false;
        cc.find("pokerPage_panel/button2/live_icon", this.node).active = (haveZhongStar == 2 && this.viewIndex != 2) ? true : false;
        cc.find("pokerPage_panel/button3/live_icon", this.node).active = (haveDaStar == 2 && this.viewIndex != 3) ? true : false;

        this.setStarTableDotPos();
    }


    //获取房间数据中是否有明星桌
    //roomData: 搜索房间数据
    //gameMode：指定的类型，默认CreateGame_Mode_None，为搜索全部
    //返回值:0  表示该房间类型没有任何明星桌
    //       1  表示有明星桌，全部明星处于下播状态
    //       2  表示有明星桌，明星桌有明星处于在线状态 （包括未开播状态）
    getHaveTexasStarTable(roomData: any[], gameMode: number = cv.Enum.CreateGameMode.CreateGame_Mode_None): number {
        let itemLen = roomData.length;
        let ret = 0;
        let starRoomData: Array<any> = [];
        for (let i = 0; i < itemLen; i++) {
            if (gameMode == cv.Enum.CreateGameMode.CreateGame_Mode_None) {
                if (roomData[i].game_id == cv.Enum.GameId.StarSeat) {
                    starRoomData.push(roomData[i]);
                }
            } else {
                if (roomData[i].game_id == cv.Enum.GameId.StarSeat && gameMode == roomData[i].game_mode) {
                    starRoomData.push(roomData[i]);
                }
            }
        }

        if (starRoomData.length > 0) {
            ret = 1;
        }

        for (let i = 0; i < starRoomData.length; i++) {
            let _roomData = starRoomData[i];
            let _starData = _roomData.starData;
            for (let j = 0; j < _starData.length; j++) {
                if (_starData[j].status != 2) {  //0.未开播  1. 在线 2.已下播
                    ret = 2;
                    break;
                }
            }
        }

        return ret;
    }

    updateGameTypeDataAndView(): void {
        let tempData = this.screenByGame();
        let itemLen = cv.StringTools.getArrayLength(tempData);

        this.weiData = [];
        this.xiaoData = [];
        this.zhongData = [];
        this.daData = [];
        // 必下 除开微距  <=5 ante的是小局 10-100 ante是中局 >100 ante是大局
        if (this._gameType == DiscoverGameType.ALL || this._gameType == DiscoverGameType.BET) {
            for (let i = 0; i < itemLen; i++) {
                let item = tempData[i];
                if (item.game_id != cv.Enum.GameId.Bet) {
                    continue;
                }
                let ante = item.ante;
                if (item.is_mirco == 1) {
                    this.weiData.push(item);
                }
                else if (ante <= 500) {
                    this.xiaoData.push(item);
                }
                else if (ante >= 1000 && ante <= 10000) {
                    this.zhongData.push(item);
                }
                else if (ante > 10000) {
                    this.daData.push(item);
                }
            }
        }
        // 菠萝蜜 <= 2 ante是小局  5 -20ante之间是中局 超过20ante是大局
        if (this._gameType == DiscoverGameType.JACKFRUIT) {
            for (let i = 0; i < itemLen; i++) {
                let item = tempData[i];
                if (item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    let big_blind = item.big_blind;
                    if (item.is_mirco == 1) {
                        this.weiData.push(item);
                    }
                    else if (big_blind <= 2 * 100) {
                        this.xiaoData.push(item);
                    }
                    else if (big_blind >= 5 * 100 && big_blind <= 20 * 100) {
                        this.zhongData.push(item);
                    }
                    else {
                        this.daData.push(item);
                    }
                }
                else {
                    let ante = item.ante;
                    if (item.is_mirco == 1) {
                        this.weiData.push(item);
                    }
                    else if (ante <= 2 * 100) {
                        this.xiaoData.push(item);
                    }
                    else if (ante >= 5 * 100 && ante <= 20 * 100) {
                        this.zhongData.push(item);
                    }
                    else {
                        this.daData.push(item);
                    }
                }
            }
        } else if (this._gameType == DiscoverGameType.PLO) {
            for (let i = 0; i < itemLen; i++) {
                let item = tempData[i];
                this.weiData.push(item);
            }
        } else if (this._gameType != DiscoverGameType.BET) {
            for (let i = 0; i < itemLen; i++) {
                let item = tempData[i];
                if (item.game_id == cv.Enum.GameId.Bet) {
                    continue;
                }

                if (item.is_mirco == 1) {
                    this.weiData.push(item);
                }
                // 德州长牌 <= 6大盲是小局 10-200之间是中局（如果不是急速并开启staraddle的200大盲局是大局） 大于200大盲是大局
                else if (item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    let big_blind = item.big_blind;
                    if (big_blind <= 6 * 100) {
                        this.xiaoData.push(item);
                    }
                    else if (big_blind >= 10 * 100 && big_blind <= 200 * 100) {
                        if (big_blind == 200 * 100 && item.straddle && !(cv.roomManager.checkGameIsZoom(item.game_id))) {
                            this.daData.push(item);
                        }
                        else {
                            this.zhongData.push(item);
                        }
                    }
                    else {
                        this.daData.push(item);
                    }
                }
                // 短牌 <=3ante 是小局 5- 100之间是中局 > 100是大局
                else {
                    let ante = item.ante;
                    if (ante <= 3 * 100) {
                        this.xiaoData.push(item);
                    }
                    else if (ante >= 5 * 100 && ante <= 100 * 100) {
                        this.zhongData.push(item);
                    }
                    else {
                        this.daData.push(item);
                    }
                }
            }
        }

        let sortWxzd = (tempData: any, pageview: number) => {
            let itemLen = tempData.length;
            if (itemLen > 1) {
                this.sortListByTime(tempData);
            }
        };

        sortWxzd(this.weiData, 0);
        sortWxzd(this.xiaoData, 1);
        sortWxzd(this.zhongData, 2);
        sortWxzd(this.daData, 3);

        if (this._gameType != 3 && this._gameType != 4 && this._gameType != DiscoverGameType.JACKFRUIT
            && this._gameType != DiscoverGameType.PLO) {
            let jspkLen = cv.StringTools.getArrayLength(this._jspkArr);
            for (let i = jspkLen - 1; i >= 0; i--) {
                let item = this._jspkArr[i];
                if ((this._gameType == 1 && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) || (this._gameType == 2 && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal)) continue;
                if (item.is_mirco == 1) {
                    this.weiData.unshift(item);
                }
                else if (item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    let big_blind = item.straddle ? 2 * item.big_blind : item.big_blind;
                    if (big_blind < 10 * 100) {
                        this.xiaoData.unshift(item);
                    }
                    else if (big_blind >= 10 * 100 && big_blind <= 200 * 100) {
                        if (big_blind == 200 * 100 && item.straddle && !(cv.roomManager.checkGameIsZoom(item.game_id))) {
                            this.daData.unshift(item);
                        }
                        else {
                            this.zhongData.unshift(item);
                        }
                    }
                    else {
                        this.daData.unshift(item);
                    }
                }
                else {
                    let ante = item.ante;
                    if (ante <= 3 * 100) {
                        this.xiaoData.unshift(item);
                    }
                    else if (ante >= 5 * 100 && ante <= 100 * 100) {
                        this.zhongData.unshift(item);
                    }
                    else {
                        this.daData.unshift(item);
                    }
                }
            }
        }


        this.weiData.sort(this.sortByStar.bind(this));
        this.xiaoData.sort(this.sortByStar.bind(this));
        this.zhongData.sort(this.sortByStar.bind(this));
        this.daData.sort(this.sortByStar.bind(this));

        this.showDaAction(this.daData);

        this.setStarTableStatus();
        // this.sortWeiArr();
        this.isGetData = true;
        if (this.isStart) {
            this.showViewForData();
        }


    }

    showDaAction(tempData) {
        let isShow = false;
        if (this.getHaveTexasStarTable(tempData) != 2) {
            for (let i = 0; i < this.daData.length; i++) {
                if (this.daData[i].player_count > 0) {
                    isShow = true;
                    break;
                }

            }
        }
        let action_node = cc.find("pokerPage_panel/button3/action_node", this.node);
        if (isShow != action_node.active) {
            let action = action_node.getComponent(cc.Animation);
            action.stop();
            action_node.active = isShow;
            if (isShow) {
                action.play("da");
            }
        }
        this.updateDaAction();
    }

    showViewForData() {
        if (!this.isHelpView) {
            this.showScrollView();
        }
        else {
            this.updateHelpView(this.sHelpName);
        }
    }

    sortWeiArr() {
        this.weiData.sort(function (a: any, b: any): number {
            if (a.player_count == b.player_count) {
                return b.player_count_max - a.player_count_max;
            }
            else {
                if (a.player_count == 0) {
                    return -1;
                }
                else if (b.player_count == 0) {
                    return 1;
                }
                else {
                    let result: number = (b.player_count_max - b.player_count) - (a.player_count_max - a.player_count);
                    if (result == 0) {
                        return b.player_count_max - a.player_count_max;
                    }
                    else {
                        return result;
                    }
                }
            }
        })
    }

    onBtnCardListTypeClick(event: cc.Event) {
        let index = event.target.name.charAt(6);
        if (index != 0 && this._gameType == DiscoverGameType.PLO) return;
        if (this.viewIndex == index && !this.isHelpView) return;
        cv.AudioMgr.playButtonSound('tab');
        this.setViewIndex(index);
        this.scrollView.scrollToTop(0.01);
        this.setStarTableStatus();

        // 跟踪用户行为, 发送事件
        let stakeSize: string = event.target.getChildByName("text").getComponent(cc.Label).string;
        let properties = { stakeSize: stakeSize };
        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.LobbyStakeSelected, cv.Enum.Functionality.poker, properties);
    }

    setViewIndex(index: number) {
        this.changeView(this.viewIndex, false);
        this.changeView(index, true);
        this.viewIndex = cv.Number(index);
        cv.tools.SaveStringByCCFile(this.SAVE_wxzd, this.viewIndex.toString());
        if (this.isHelpView) {
            this.isHelpView = false;
            this.changeView(4, false);
        }

        this.showScrollView();
        this.updateDaAction();

    }

    updateDaAction() {
        let action_node = cc.find("pokerPage_panel/button3/action_node", this.node);
        if (action_node.active) {
            cc.find("da_01", action_node).active = this.viewIndex == 3;
        }
    }

    onBtnNoSeeFullClick(event: cc.Event) {
        this.noSeeFull = !this.noSeeFull;
        this.changeNoSeeFull(this.noSeeFull);
        this.showScrollView();
        cv.tools.SaveStringByCCFile(this.SAVE_seeFull, this.noSeeFull ? "1" : "0");
    }

    onBtnFastEnterClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.getFastEnterData();
        this.fastEnter_chooseNode.clear();
        this.gameModeBtnScreenNum = 0;

        let titleName: string[] = [
            cv.config.getStringData("DataView_data_panel_dataInfo_panel_bet_button"),        //必下
            cv.config.getStringData("DataView_data_panel_dataInfo_panel_aofGame_button"),             //aof
            cv.config.getStringData("DataView_data_panel_dataInfo_panel_aofGameShort_button"),   //aof短牌
            cv.config.getStringData("Filtrate_filtrate_panel_normal_game_button_2"),      //德州
            cv.config.getStringData("DataView_gameType_panel_button_1_text"),                    //短牌
            cv.config.getStringData("DataView_data_panel_dataInfo_panel_zoomGame_button"),        //急速扑克
            cv.config.getStringData("MainScene_Scene_gameType_panel_button7_text"),        //菠萝蜜
            cv.config.getStringData("MainScene_Scene_gameType_panel_button8_text"),        //奥马哈

        ];
        let contentName: string[] = [
            cv.config.getStringData("MainScene_Scene_pokerPage_panel_button0_text"),                        //微
            cv.config.getStringData("MainScene_Scene_pokerPage_panel_button1_text"),                         //小
            cv.config.getStringData("MainScene_Scene_pokerPage_panel_button2_text"),                        //中
            cv.config.getStringData("MainScene_Scene_pokerPage_panel_button3_text"),                        //大
        ]

        let height: number = 0;
        let fastEnter_content: cc.Node = null;
        let tempTypeArr: number[] = [4, 3, 30, 1, 2, 5, 7, 8];
        let tempType: number = 0;

        this.showMailBtn(false);
        this.ef_scroll.destroyAllChildren();
        this.ef_scroll.removeAllChildren(true);

        this.ef_scroll.parent.getComponent(cc.ScrollView).scrollToTop();

        for (let i = 0; i < this.fastEnter_dataLen; i++) {//4
            let hashData = this.fastEnter_data.get(i);
            let hasAdd: boolean = false;
            if (!hashData) {
                continue;
            }
            else {
                for (let j = 0; j < 5; j++) {
                    let dataArr = hashData.get(j);
                    let len = cv.StringTools.getArrayLength(dataArr);

                    if (len > 0) {
                        if (!hasAdd) {
                            let fastEnter_titile = cc.instantiate(this.fastEnter_titile);
                            hasAdd = true;
                            height += fastEnter_titile.height;
                            this.ef_scroll.addChild(fastEnter_titile);
                            cc.find("game_mode_title_title", fastEnter_titile).getComponent(cc.Label).string = titleName[i];
                            tempType = tempTypeArr[i];

                            if (i == 6) {
                                let fastEnter_search = cc.instantiate(this.fastEnter_search);
                                this.ef_scroll.addChild(fastEnter_search);
                                cc.find("search", fastEnter_search).getComponent(cc.EditBox).string = "";
                                cv.action.setText(fastEnter_search, "search", "jackfruit_find_view_search_label", true);
                                cc.find("search_btn", fastEnter_search).on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                                    let str = cc.find("search", fastEnter_search).getComponent(cc.EditBox).string;

                                    if (str.length != 4) {
                                        cv.TT.showMsg(cv.config.getStringData("jackfruit_find_view_search_tips"), cv.Enum.ToastType.ToastTypeInfo);
                                        return;
                                    }
                                    this.updateHelpView(str);
                                });
                                height += fastEnter_search.height;
                            }
                        }

                        fastEnter_content = cc.instantiate(this.fastEnter_content);
                        this.ef_scroll.addChild(fastEnter_content);

                        fastEnter_content.setContentSize(fastEnter_content.getContentSize().width, fastEnter_content.getContentSize().height - (4 - Math.ceil(len / 3)) * 110);
                        cc.find("FastEnter_subtitle/game_mode_text", fastEnter_content).getComponent(cc.Label).string = contentName[j];

                        let node = this.ef_scroll.children[this.ef_scroll.childrenCount - 1];
                        node.setContentSize(node.getContentSize().width, node.getContentSize().height + 110);
                        height += fastEnter_content.height;

                        let tempBtn: cc.Node[] = [];
                        let tempLayer = cc.find("Layout", fastEnter_content);
                        for (let j = 0; j < len; j++) {
                            let btn = cc.find("Layout/game_mode_button" + j, fastEnter_content);
                            if (btn) {
                                tempBtn.push(btn);
                            } else {
                                btn = cc.instantiate(tempBtn[j % 3]);
                                tempBtn.push(btn)
                                tempLayer.addChild(btn);
                            }
                        }

                        if (len < 3) {
                            for (let j = len; j < 3; j++) {
                                cc.find("Layout/game_mode_button" + j, fastEnter_content).active = false;
                            }
                        }
                        for (let j = 0; j < len; j++) {
                            let btn = tempBtn[j];
                            let x = btn.getPosition().x;
                            let y = -(Math.floor(j / 3) * 109 + 56);
                            btn.setPosition(cc.v2(x, y));
                            cc.find("button_text", btn).getComponent(cc.Label).string = dataArr[j];
                            let currentType: number = tempType;
                            this.initRecordView(cc.find("button_screen_image", btn), dataArr[j], currentType);
                            btn.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                                cv.AudioMgr.playButtonSound('tab');
                                let node = cc.find("button_screen_image", event.target);
                                node.active = !node.active;
                                this.setChooseNodeData(node, node.active, currentType);
                                if (node.active) {
                                    cc.find("button_text", event.target).color = cc.color(58, 60, 72);
                                    this.gameModeBtnScreenNum++;
                                } else {
                                    cc.find("button_text", event.target).color = cc.color(255, 255, 255);
                                    this.gameModeBtnScreenNum--;
                                }
                                this.checkGameModeBtn();
                            })
                        }
                    }
                }
                // if (hasAdd) {
                //     let node = this.ef_scroll.children[this.ef_scroll.childrenCount - 1];
                //     node.setContentSize(node.getContentSize().width, node.getContentSize().height + 110);
                //     height += 110;
                // }
            }
        }

        this.checkGameModeBtn();
        let topNode = cc.find("quick_seat_touch_panel", this.node);
        topNode.active = true;

        let quick_seat_panel = cc.find("quick_seat_touch_panel/quick_seat_panel", this.node);
        let bg_top = quick_seat_panel.getChildByName("bg_top");
        let maxHeight = quick_seat_panel.height - bg_top.height - 180;

        this.ef_scroll.setContentSize(this.ef_scroll.getContentSize().width, height);
        if (this.topScrollSize.height > height) {
            this.ef_scroll.parent.setContentSize(this.topScrollSize);
        }
        else if (maxHeight > height) {
            this.ef_scroll.getParent().setContentSize(this.ef_scroll.getParent().getContentSize().width, height);
        }
        else {
            this.ef_scroll.getParent().setContentSize(this.ef_scroll.getParent().getContentSize().width, maxHeight);
        }
        let scollSize = this.ef_scroll.getParent().getContentSize();
        let size = cc.find("backGroundBg", quick_seat_panel).getContentSize();
        cc.find("backGroundBg", quick_seat_panel).setContentSize(size.width, scollSize.height + 280);
        let sbtn = cc.find("game_mode_panel/screen_button", quick_seat_panel);
        sbtn.setPosition(cc.v2(sbtn.getPosition().x, -scollSize.height - 160));
        let seatbtn = cc.find("game_mode_panel/seat_button", quick_seat_panel);
        seatbtn.setPosition(cc.v2(seatbtn.getPosition().x, -scollSize.height - 160));

        topNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_5;
        topNode.stopAllActions();
        topNode.setPosition(this.quickPanelPos);

        let endPos = topNode.getPosition();

        // 添加屏蔽层
        cv.action.createShieldLayer(this.node, "shieldLayer-quickEnter", cv.Enum.ZORDER_TYPE.ZORDER_1, cc.Color.BLACK, 153);
        topNode.runAction(cc.moveTo(0.15, endPos.x, endPos.y - cv.config.HEIGHT));
        // topNode.setLocalZOrder(cv.Enum.ZORDER_TYPE.ZORDER_low);        // this.scheduleOnce(function () {
        //     let topNode = cc.find("quick_seat_touch_panel", this.node);
        //     topNode.zIndex = (cv.Enum.ZORDER_TYPE.ZORDER_2);
        //     let endPos = topNode.getPosition();
        //     topNode.setPositionY(endPos.y + cv.config.DESIGN_HEIGHT);
        //     topNode.runAction(cc.moveTo(0.15, endPos));
        // }.bind(this), 0);

        // 跟踪用户行为, 发送事件
        let properties = { item: "showFiltersButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.poker, properties);
    }

    onBtnFastSeatClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        event.stopPropagation();
        this.setFastEnterSaveRecord();

        if (this.fastEnter_chooseNode.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("UIMainTips01"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        if (cv.dataHandler.getUserData().isban) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }

        cv.reCaptcha.checkRecaptcha(this.joinFastSeat.bind(this));

        // 跟踪用户行为, 发送事件
        let stakeSizes: string[] = [];
        for (let i = 0; i < this.fastEnter_saveData.length; ++i) {
            let pos: number = this.fastEnter_saveData[i].indexOf("+");
            let strBlind: string = this.fastEnter_saveData[i].slice(0, pos);
            // let strType: string = this.fastEnter_saveData[i].slice(pos + 1);
            stakeSizes.push(strBlind);
        }
        stakeSizes.sort();
        let properties = { stakeSizes: stakeSizes, skipLobby: true };
        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.LobbyFilterApplied, cv.Enum.Functionality.poker, properties);
    }

    joinFastSeat(captchaPassed: boolean) {
        // did not pass captcha test
        if (captchaPassed == false) {
            return;
        }

        let isSimulator: boolean = cv.native.IsSimulator();
        let arr: any[] = [];
        let tempData = this.screenByGame();
        let itemLen = cv.StringTools.getArrayLength(tempData);
        let saveLen = this.fastEnter_saveData.length;
        for (let i = 0; i < itemLen; i++) {
            let item = tempData[i];
            let manzhu = this.getManZhuString(item);
            for (let j = 0; j < saveLen; j++) {
                let pos = this.fastEnter_saveData[j].indexOf("+");
                let type = cv.Number(this.fastEnter_saveData[j].slice(pos + 1));
                if (item.game_id == cv.Enum.GameId.StarSeat) continue;  // 快速入座过滤明星桌
                if (manzhu == this.fastEnter_saveData[j].slice(0, pos) && this.compareType(item, type)) {
                    let currentTime = (new Date()).getTime() / 1000;
                    // 普通局排除超过开放时间超过24小时的牌局
                    if ((item.is_mirco == 1 || item.has_buyin != 2 || item.IscalcIncomePerhand || item.game_id == cv.Enum.GameId.Bet || item.game_id == cv.Enum.GameId.Jackfruit || item.game_id == cv.Enum.GameId.Plo) && item.join_password.length <= 0 && item.buyin_password.length <= 0 && (currentTime - item.create_time) / 3600 < 24) {
                        let hasPlayTime = 0.0;
                        if (item.start_time == 0) {
                            hasPlayTime = 0;
                        }
                        else {
                            hasPlayTime = (currentTime - item.start_time) / 3600.0;
                        }

                        let timeLimit = cv.Number(cv.config.getStringData(cv.StringTools.formatC("UITime%d", (item.rule_time_limit - 1))));
                        let yanshiTime = item.extra_time / 3600.0;
                        let lastTimes = timeLimit - hasPlayTime + yanshiTime;
                        // 排除时长不够2小时房间(微牌局不排除)
                        if ((lastTimes >= 2 || item.is_mirco == 1 || item.game_id == cv.Enum.GameId.Bet || item.IscalcIncomePerhand || item.game_id == cv.Enum.GameId.Jackfruit || item.game_id == cv.Enum.GameId.Plo)) {//
                            //排除满座
                            if (item.left_seatnum > 0 || item.game_id == cv.Enum.GameId.Plo) {
                                // 模拟器过滤
                                if (!isSimulator || item.anti_simulator)
                                    arr.push(item);
                            }
                        }
                    }
                    continue;
                }
            }
        }

        if (arr.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("UIMainTips01"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        arr.sort(this.sortByTimeAndPeople.bind(this));
        // arr.sort(this.sortByAof);

        cv.GameDataManager.tRoomData.entry_clubid = arr[0].club_id;
        cv.roomManager.RequestJoinRoom(arr[0].game_id, arr[0].room_id, true);

        let anti_cheating = arr[0].anti_cheating;  //是否有GPS限制
        if (arr[0].has_buyin == 0) {
            if ((anti_cheating || !arr[0].anti_simulator) && !cv.native.HaveGps(false)) {  //如果开启GPS限制，且没有打开定位。
                //不设置FINDVIEW_isFASTENTER为1，在进入房间后，不自动弹出自动带入提示
            } else {
                cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "1");
            }
        }
        else if (arr[0].has_buyin == 1) {
            cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "2");
        }
    }
    onBtnHelpChooseClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        event.stopPropagation();
        this.setFastEnterSaveRecord();

        if (this.fastEnter_chooseNode.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("UIMainTips01"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        this.updateHelpView();

        // 跟踪用户行为, 发送事件
        let stakeSizes: string[] = [];
        for (let i = 0; i < this.fastEnter_saveData.length; ++i) {
            let pos: number = this.fastEnter_saveData[i].indexOf("+");
            let strBlind: string = this.fastEnter_saveData[i].slice(0, pos);
            // let strType: string = this.fastEnter_saveData[i].slice(pos + 1);
            stakeSizes.push(strBlind);
        }
        stakeSizes.sort();
        let properties = { stakeSizes: stakeSizes, skipLobby: false };
        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.LobbyFilterApplied, cv.Enum.Functionality.poker, properties);
    }

    updateHelpView(name: string = "") {
        this.sHelpName = name;
        if (name != "") {
            this.setHelpViewByName(name);
            return;
        }
        this.helpData = [];
        let tempData = this.screenByGame();
        let itemLen = cv.StringTools.getArrayLength(tempData);
        let saveLen = this.fastEnter_saveData.length;

        for (let i = 0; i < itemLen; i++) {
            let item = tempData[i];
            let manzhu = this.getManZhuString(item);
            for (let j = 0; j < saveLen; j++) {
                let pos = this.fastEnter_saveData[j].indexOf("+");
                let saveManzhu = this.fastEnter_saveData[j].slice(0, pos);
                let saveType = cv.Number(this.fastEnter_saveData[j].slice(pos + 1));
                if ((manzhu == saveManzhu || item.game_id == cv.Enum.GameId.StarSeat)
                    && this.compareType(item, saveType)) {
                    this.helpData.push(item);
                    break;
                }
            }
        }

        // this.helpData.sort(this.sortByBlindorAnte);
        this.sortListByTime(this.helpData);
        // this.helpData.sort(this.compareManZhu);
        this.changeView(this.viewIndex, false);
        this.changeView(4, true);
        this.isHelpView = true;
        this.showScrollView();
        this.hideQuickEnterView();
    }

    setHelpViewByName(name: string) {
        this.sHelpName = name;
        this.helpData = [];
        let tempData = this.screenByGame();
        let itemLen = cv.StringTools.getArrayLength(tempData);

        for (let i = 0; i < itemLen; i++) {
            let item = tempData[i];
            let str: string = item.room_name;
            if (str.indexOf(name) != -1) {
                this.helpData.push(item);
            }
        }
        if (this.helpData.length == 0) {
            cv.TT.showMsg(cv.config.getStringData("UIMainTips01"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        // this.helpData.sort(this.sortByBlindorAnte);
        this.sortListByTime(this.helpData);
        // this.helpData.sort(this.compareManZhu);
        this.changeView(this.viewIndex, false);
        this.changeView(4, true);
        this.isHelpView = true;
        this.showScrollView();
        this.hideQuickEnterView();
    }

    setChooseNodeData(node: cc.Node, isAdd: boolean, type: number) {
        let str = cc.find("button_text", node.getParent()).getComponent(cc.Label).string + "+" + type;

        node.active = isAdd;
        if (!isAdd) {
            this.fastEnter_chooseNode.remove(str);
            let saveLen = this.fastEnter_saveData.length;
            for (let i = 0; i < saveLen; i++) {
                if (this.fastEnter_saveData[i] == str) {
                    this.fastEnter_saveData.splice(i, 1);
                    break;
                }
            }
        }
        else {
            if (this.fastEnter_saveData.length >= 5) {
                let firstSave: string = this.fastEnter_saveData[0];
                this.fastEnter_chooseNode.forEach((key: string, value: cc.Node, i?: number) => {
                    if (key == firstSave) {
                        value.active = false;
                        cc.find("button_text", value.getParent()).color = cc.color(255, 255, 255);
                        this.gameModeBtnScreenNum--;
                        return "break";
                    }
                });
                this.fastEnter_chooseNode.remove(firstSave);
                this.fastEnter_saveData.splice(0, 1);
                console.log("-------------> :  len =" + this.fastEnter_saveData.length);
            }
            this.fastEnter_chooseNode.add(str, node);
            this.pushFastEnterData(str);
            console.log("-------------> : addSaveData ->" + str + ", len =" + this.fastEnter_saveData.length);
        }
    }

    initRecordView(node: cc.Node, str: string, type: number) {
        let saveLen = this.fastEnter_saveData.length;
        for (let i = 0; i < saveLen; i++) {
            let pos = this.fastEnter_saveData[i].indexOf("+");
            let manzhu = this.fastEnter_saveData[i].slice(0, pos);
            let gameType = this.fastEnter_saveData[i].slice(pos + 1);
            if (str == manzhu && cv.Number(gameType) == type) {
                console.log("-------------> :  " + str);
                node.active = true;
                cc.find("button_text", node.getParent()).color = cc.color(58, 60, 72);
                cc.find("button_text", node.getParent()).opacity = 255;
                this.fastEnter_chooseNode.add(this.fastEnter_saveData[i], node);
                this.gameModeBtnScreenNum++;
                return;
            }
        }
    }

    checkGameModeBtn() {
        let seatbtn = cc.find("quick_seat_touch_panel/quick_seat_panel/game_mode_panel/seat_button", this.node);
        let screenbtn = cc.find("quick_seat_touch_panel/quick_seat_panel/game_mode_panel/screen_button", this.node);
        if (this.gameModeBtnScreenNum > 0) {
            this._btnNormal(seatbtn, cc.Color.WHITE);
            this._btnNormal(screenbtn, cc.color(80, 66, 38));
        } else {
            this._btnDisabled(seatbtn, cc.color(143, 144, 156));
            this._btnDisabled(screenbtn, cc.color(143, 144, 156));
        }
    }

    getFastEnterData() {

        if (this.fastEnter_data.length > 0) {
            for (let i = 0; i < this.fastEnter_dataLen; i++) {
                let hashData = this.fastEnter_data.get(i);
                if (hashData && hashData.length > 0) {
                    hashData.clear();
                }
            }
        }

        let tempData = this.screenByGame();
        let itemLen = cv.StringTools.getArrayLength(tempData);
        for (let i = 0; i < itemLen; i++) {
            let item = tempData[i];
            let manzhu = this.getManZhuString(item);
            let func = function (index: number) {
                let aofDP: HashMap<number, string[]> = this.fastEnter_data.get(index);
                if (!aofDP) {
                    this.fastEnter_data.add(index, new HashMap());
                    aofDP = this.fastEnter_data.get(index);
                }

                let sIndex: number = 0;
                if (item.game_id == cv.Enum.GameId.Bet) {
                    let ante = item.ante;
                    if (item.is_mirco == 1) {
                        sIndex = 0;
                    }
                    else if (ante <= 500) {
                        sIndex = 1;
                    }
                    else if (ante >= 1000 && ante <= 10000) {
                        sIndex = 2;
                    }
                    else if (ante > 10000) {
                        sIndex = 3;
                    }
                } else if (item.game_id == cv.Enum.GameId.Jackfruit) {
                    let ante = item.ante;
                    if (item.is_mirco == 1) {
                        sIndex = 0;
                    }
                    else if (ante <= 200) {
                        sIndex = 1;
                    }
                    else if (ante >= 500 && ante <= 2000) {
                        sIndex = 2;
                    }
                    else if (ante > 2000) {
                        sIndex = 3;
                    }
                }
                else {
                    let small_blind = item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short ? item.ante : item.small_blind;
                    if (small_blind < 100) {
                        sIndex = 0;
                    }
                    else if (small_blind < 500) {
                        sIndex = 1;
                    }
                    else if (small_blind <= 10000) {//|| (small_blind == 10000 && !item.straddle)
                        if (item.big_blind == 20000 && item.straddle && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal && !(cv.roomManager.checkGameIsZoom(item.game_id))) {
                            sIndex = 3;
                        } else {
                            sIndex = 2;
                        }
                    }
                    else {
                        sIndex = 3;
                    }
                }


                let wei = aofDP.get(sIndex);
                if (!wei) {
                    aofDP.add(sIndex, []);
                    wei = aofDP.get(sIndex);
                }
                if (this.isNoHaveString(wei, manzhu)) {
                    wei.push(manzhu);
                }
            }.bind(this);

            let index: number = -1;
            if (item.game_id == cv.Enum.GameId.Bet) {
                index = 0;
            }
            else if (item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                if (item.game_id == cv.Enum.GameId.Allin) {
                    index = 1;
                }
                else if (item.game_id == cv.Enum.GameId.Texas
                    || item.game_id == cv.Enum.GameId.StarSeat) {
                    index = 3;

                    // if(item.isCriticismField == true){ //如果是暴击德州
                    //     index = 6;
                    // }
                } else if (item.game_id == cv.Enum.GameId.Jackfruit) {
                    index = 6;
                } else if (item.game_id == world_pb.GameId.PLO) {
                    index = 7;
                }
            }
            else {
                if (item.game_id == cv.Enum.GameId.Allin) {
                    index = 2;
                }
                else if (item.game_id == cv.Enum.GameId.Texas
                    || item.game_id == cv.Enum.GameId.StarSeat) {
                    index = 4;

                    // if(item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){
                    //     if(item.isCriticismField == true){ //如果是暴击场短牌
                    //         index = 7;
                    //     }
                    // }

                } else if (item.game_id == cv.Enum.GameId.Jackfruit) {
                    index = 6;
                }
            }
            if (index != -1) {
                func(index);
            }
        }

        //数据排序
        for (let i = 0; i < this.fastEnter_dataLen; i++) {
            let hashData = this.fastEnter_data.get(i);
            if (hashData) {
                for (let j = 0; j < 4; j++) {
                    let dataArr = hashData.get(j);
                    if (cv.StringTools.getArrayLength(dataArr) > 1) {
                        dataArr.sort(function (a, b): number {
                            let c = a.replace(/K/i, "000");
                            let d = b.replace(/K/i, "000");
                            let isHuc = false;
                            let isHud = false;
                            let cIndex = c.indexOf(" (HU)");
                            let dIndex = d.indexOf(" (HU)");
                            if (cIndex != -1) {
                                c = c.slice(0, cIndex);
                                isHuc = true;
                            }
                            if (dIndex != -1) {
                                d = d.slice(0, dIndex);
                                isHud = true;
                            }
                            let e = c.split("/");
                            let f = d.split("/");
                            if (cv.Number(e[0]) == cv.Number(f[0])) {
                                if (e.length == f.length) {
                                    if (isHuc == isHud) {
                                        return -1
                                    } else {
                                        return isHuc ? 1 : -1;
                                    }
                                } else {
                                    return e.length - f.length
                                }
                            } else {
                                return cv.Number(e[0]) - cv.Number(f[0]);
                            }
                        });
                    }
                }
            }
        }
    }

    isNoHaveString(arr: string[], str: string): boolean {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == str) {
                return false;
            }
        }

        return true;
    }

    getManZhuString(msg: any): string {
        let manzhu = "";
        if (msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short || msg.game_id == cv.Enum.GameId.Bet) {
            let ante: number = cv.StringTools.serverGoldToShowNumber(msg.ante);

            manzhu = cv.StringTools.formatC("%s%s", (ante >= 1000 ? ante / 1000.0 : ante).toString(), ante >= 1000 ? "K" : "");
        }
        else if (msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            let cbBigBlind: number = cv.StringTools.serverGoldToShowNumber(msg.big_blind);
            let cbSmallBlind: number = cv.StringTools.serverGoldToShowNumber(msg.small_blind);
            let bigBlind: string = cv.StringTools.formatC("%s%s", (cbBigBlind >= 1000 ? cbBigBlind / 1000.0 : cbBigBlind).toString(), cbBigBlind >= 1000 ? "K" : "");
            let smallBlind: string = cv.StringTools.formatC("%s%s", (cbSmallBlind >= 1000 ? cbSmallBlind / 1000.0 : cbSmallBlind).toString(), cbSmallBlind >= 1000 ? "K" : "");
            manzhu = (cv.StringTools.formatC("%s/%s", smallBlind.toString(), bigBlind.toString()));

            if (msg.straddle) {
                let cbstaraddle: number = cv.StringTools.times(cbBigBlind, 2);
                manzhu = cv.StringTools.formatC("%s/%s", manzhu, cbBigBlind >= 1000 ? cv.StringTools.div(cbstaraddle, 1000).toString() + "K" : cbstaraddle.toString());
            }
        }

        if (msg.player_count_max == 2) {
            manzhu = manzhu + " (HU)"
        }
        return manzhu;
    }

    compareItem(a: any, b: any): number {
        let manzhuA = a.small_blind;
        let manzhuB = b.small_blind;

        if ((a.start_time == 0 && b.start_time != 0) || (a.start_time != 0 && b.start_time == 0)) {
            return b.start_time - a.start_time;
        }

        if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            manzhuA = a.ante;
        }

        if (b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            manzhuB = b.ante;
        }

        if (manzhuA == manzhuB) {
            if (a.start_time == b.start_time && a.start_time == 0) {
                return a.create_time - b.create_time;
            }
            else {
                return a.start_time - b.start_time;
            }
        }
        else {
            return manzhuB - manzhuA;
        }
    }

    compareManZhu(a: any, b: any): number {
        let manzhuA = a.small_blind;
        let manzhuB = b.small_blind;

        if (a.game_mode == b.game_mode && a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            if (manzhuA == manzhuB) {
                if (a.straddle != b.straddle) {
                    let aS = a.straddle ? 1 : 0;
                    let bS = b.straddle ? 1 : 0;
                    return bS - aS;
                }
                else if (a.ante == b.ante) {
                    if (a.start_time == b.start_time && a.start_time == 0) {
                        return b.create_time - a.create_time;
                    }
                    // else if (a.start_time != 0 && b.start_time != 0) {
                    //     return a.start_time - b.start_time;
                    // }
                    else {
                        return b.start_time - a.start_time;
                    }
                }
                else {
                    return b.ante - a.ante;
                }
            }
            else {
                return manzhuB - manzhuA;
            }
        }
        else if (a.game_mode == b.game_mode && a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            if (a.ante == b.ante) {
                if (a.start_time == b.start_time && a.start_time == 0) {
                    return b.create_time - a.create_time;
                }
                // else if (a.start_time != 0 && b.start_time != 0) {
                //     return a.start_time - b.start_time;
                // }
                else {
                    return b.start_time - a.start_time;
                }
            }
            else {
                return b.ante - a.ante;
            }
        }
        else {
            if (b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                manzhuB = b.ante;
            }

            if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                manzhuA = a.ante;
            }


            if (manzhuA == manzhuB) {
                return b.game_mode - a.game_mode;
            }
            else {
                return manzhuB - manzhuA;
            }
        }
    }

    changeView(index: number, isChoose: boolean) {
        let data = [{ url: "zh_CN/hall/ui/common_paiju2", color: cc.color(197, 197, 215) }, { url: "zh_CN/hall/ui/common_paiju1", color: cc.color(229, 211, 141) }];
        let choose = isChoose ? 1 : 0;
        //cv.resMgr.setSpriteFrame(cc.find("pokerPage_panel/button" + index + "/selectimg", this.node), data[choose].url);
        cc.find("pokerPage_panel/button" + index + "/selectimg", this.node).active = isChoose;
        if (index != 4) {
            cc.find("pokerPage_panel/button" + index + "/text", this.node).color = data[choose].color;
        }
        else {
            //cc.find("pokerPage_panel/button" + index + "/img", this.node).active = false;
            //cv.resMgr.setSpriteFrame(cc.find("pokerPage_panel/button" + index + "/img", this.node), "zh_CN/hall/ui/common_chair_" + (isChoose ? "1" : "2"));
        }
    }

    changeNoSeeFull(isNoSee: boolean) {
        cc.find("pokerPage_panel/checkBoxButton/choose_img", this.node).active = isNoSee;
    }
    //设置筛选的状态
    setFillterStatus() {
        this.fillter_line.active = true;
        if (this.isHelpView) {
            this.fillter_txt.node.color = cc.color(229, 211, 141);
            cv.StringTools.setLabelString(this.node, "pokerPage_panel/button4/label", "MainScene_Scene_pokerPage_panel_button_scsx_4_text");
            this.fillter_line.setContentSize(cc.size(this.fillter_txt.node.getContentSize().width, this.fillter_line.getContentSize().height));
            this.fillter_line.color = cc.color(229, 211, 141);
        } else {
            cv.StringTools.setLabelString(this.node, "pokerPage_panel/button4/label", "MainScene_Scene_pokerPage_panel_button_sx_4_text");
            this.fillter_txt.node.color = cc.color(197, 197, 215);
            this.fillter_line.setContentSize(cc.size(this.fillter_txt.node.getContentSize().width, this.fillter_line.getContentSize().height));
            this.fillter_line.color = cc.color(197, 197, 215);
        }
    }
    showScrollView() {
        let arr = [this.weiData, this.xiaoData, this.zhongData, this.daData];
        let data = this.isHelpView ? this.helpData : arr[this.viewIndex];
        //let colors = [cc.color(197, 197, 215) ,cc.color(229, 211, 141) ];
        this.setFillterStatus();
        if (!this.noSeeFull || this._gameType == DiscoverGameType.PLO) {

            this.updateListviewData(data);
        }
        else {
            let otherData: Array<any> = [];
            let dataLen = data.length;
            for (let i = 0; i < dataLen; i++) {
                if (data[i].player_count < data[i].player_count_max
                    || cv.roomManager.checkGameIsZoom(data[i].game_id)
                    || data[i].game_id == cv.Enum.GameId.StarSeat) {
                    otherData.push(data[i]);
                }
            }

            this.updateListviewData(otherData);
        }
    }

    getFastEnterSaveRecord() {
        this.fastEnter_saveData = [];
        for (let i = 0; i < 7; i++) {
            let str = cv.tools.GetStringByCCFile(this.SAVE_helpChoose + i);
            if (cv.StringTools.getArrayLength(str) > 0) {
                this.pushFastEnterData(str);
            }
        }
    }

    pushFastEnterData(str: string) {
        let len = this.fastEnter_saveData.length;
        let isHave = false;
        for (let i = 0; i < len; i++) {
            if (str == this.fastEnter_saveData[i]) {
                isHave = true;
                break;
            }
        }

        if (!isHave) {
            this.fastEnter_saveData.push(str);
        }
    }

    setFastEnterSaveRecord() {
        for (let i = 0; i < 7; i++) {
            cv.tools.SaveStringByCCFile(this.SAVE_helpChoose + i, "");
        }
        let len = this.fastEnter_saveData.length;
        for (let i = 0; i < len; i++) {
            cv.tools.SaveStringByCCFile(this.SAVE_helpChoose + i, this.fastEnter_saveData[i]);
        }
    }
    onClickCloseBtn() {
        this.hideQuickEnterView();
        cv.AudioMgr.playButtonSound('close');

        // 跟踪用户行为, 发送事件
        let properties = { item: "closeFiltersButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.lobby, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.poker, properties);
    }
    hideQuickEnterView() {
        let topNode = cc.find("quick_seat_touch_panel", this.node);
        if (!topNode || !topNode.active) return;
        topNode.stopAllActions();
        topNode.runAction(cc.sequence(cc.moveTo(0.15, this.quickPanelPos.x, this.quickPanelPos.y), cc.callFunc(function () {
            cv.action.removeShieldLayer(this.node, "shieldLayer-quickEnter");
            topNode.active = false;
        }.bind(this, topNode))));
        this.showMailBtn(true);
    }

    showMailBtn(isView: boolean) {

        // 设置邮件图标显隐
        if (isView) {
            cv.MessageCenter.send("show_mail_entrance");
        } else {
            cv.MessageCenter.send("hide_mail_entrance");
        }

        let switchServer = this.node.parent.getChildByName("switchServer");
        if (switchServer) {
            switchServer.active = isView;
        }

        let kefu = this.node.parent.getChildByName("kefu");
        if (kefu) {
            kefu.active = isView;
        }

        let goldView = this.node.parent.getChildByName("goldView_pref");
        if (goldView) {
            goldView.active = isView;
        }

        let safeView = this.node.parent.getChildByName("safe");
        if (safeView && !cv.config.isOverSeas()) {
            safeView.active = isView;
        }
    }

    initBanner(): void {
        this.img_PageView.removeAllPages();
        this.img_PageView.scrollToLeft();
        let whiteCircleLen = this._whiteCircleList.length;
        for (let i = 0; i < whiteCircleLen; i++) {
            this._whiteCircleList[i].removeFromParent(true);
            this._whiteCircleList[i].destroy();
        }
        this._whiteCircleList = [];

        let imgUrlList = cv.dataHandler.getBannerUrlList(this._gameType + 1);
        let len = cv.StringTools.getArrayLength(imgUrlList);

        if (len == 0) {//兼容未配数据的情况
            let default_img = (new cc.Node()).addComponent(cc.Sprite);
            cv.resMgr.setSpriteFrame(default_img.node, cv.tools.getBackgroundBannerImgPath());
            default_img.node.setPosition(0.5 * this.img_PageView.node.width, 0);
            this.img_PageView.addPage(default_img.node);

            this.setPageCircleimg(0);
            this.unschedule(this.PageViewAction);
            this.img_PageView.scrollToPage(0, 0.1);
            return;
        }

        let hpg = 25;
        let mid = (len + 1) / 2.0;
        for (let i = 0; i < len; i++) {

            if (len > 1) {
                let whiteCircle = cv.resMgr.createSprite(this.discover_panel, "zh_CN/hall/ui/ui_0059_round_yes");
                this._whiteCircleList.push(whiteCircle);
                whiteCircle.setPosition(cc.v2(this.discover_panel.getContentSize().width / 2 + (i + 1 - mid) * hpg, this.img_PageView.node.y - 128));
            }

            let path: string = imgUrlList[i].imageUrl;
            let webUrl: string = imgUrlList[i].webViewUrl;
            let pkBanner = (new cc.Node()).addComponent(cc.Sprite);
            this.setSpriteByDownload(pkBanner, path);
            pkBanner.node.setPosition((i + 0.5) * this.img_PageView.node.width, 0);
            this.img_PageView.addPage(pkBanner.node);
            this.img_PageView.content.setContentSize(this.img_PageView.content.width * (i + 1), this.img_PageView.content.height);
            if (webUrl.length > 0) {
                if (imgUrlList[i].is_pkf == 1) {
                    webUrl = encodeURI(webUrl + '&' + cv.dataHandler.getUserData().pkf_add_url);
                }
                pkBanner.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
                    console.log("!!!!!!" + webUrl);
                    if (webUrl.search("ggjs:") != -1) {//跳转到公告页
                        let urls = webUrl.substr(5, webUrl.length);//"User/Article/getDetail?pid=40"
                        urls = cv.domainMgr.getServerInfo().web_server + urls + "#clientType="
                            + String(cv.config.GET_CLIENT_TYPE()) + "&language=" + cv.config.getCurrentLanguage() + "&uid=" + cv.dataHandler.getUserData().u32Uid;

                        cv.MessageCenter.send("jumpgto_notice", urls);
                        return;
                    }

                    if (cc.sys.isBrowser) {
                        if (!cv.config.isSiyuType()) {
                            window.open(webUrl);
                        } else {

                            let cmdStr = "{\"cmd\": \"1006\", \"url\":\"%s\", \"op\":1, \"width\":%d, \"height\":%d}";
                            let _offsetY = 0;
                            if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_IPHONEX_SCREEN) { //iphoneX刘海屏
                                _offsetY = 0;//2 * cv.config.FULLSCREEN_OFFSETY;
                            }
                            let _cmd = cv.StringTools.formatC(cmdStr, webUrl, cv.config.WIDTH, cv.config.HEIGHT - _offsetY);
                            cv.native.SYwebjsToClient(_cmd);
                        }
                        return;
                    }

                    let web = (new cc.Node("banner_webview")).addComponent(cc.WebView);
                    web.node.setContentSize(cc.size(cv.config.WIDTH, cv.config.HEIGHT));
                    web.node.setPosition(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
                    cc.director.getScene().addChild(web.node);
                    web.url = webUrl;
                    web.setJavascriptInterfaceScheme("ccjs");
                    web.setOnJSCallback((webView: cc.WebView, url: string) => {
                        if (url.search("ccjs://https") != -1 || url.search("ccjs://http") != -1) {
                            let banner_webview = cc.director.getScene().getChildByName("banner_webview");
                            if (banner_webview) {
                                banner_webview.removeFromParent(true);
                                banner_webview.destroy();
                            }
                        }
                    });
                });
            }
        }

        this.setPageCircleimg(0);
        this.unschedule(this.PageViewAction);
        this.schedule(this.PageViewAction, 3.0);
        this.img_PageView.scrollToPage(0, 0.1);
    }

    setSpriteByDownload(spr: cc.Sprite, path: string) {
        if (!path) {
            console.log("path 不能为空");
            return;
        }
        cv.resMgr.loadRemote(path, function (error: Error, resource: cc.Texture2D) {
            if (!spr || !cc.isValid(spr, true)) return;
            if (error) {
                console.log(error.message || error);
                cv.resMgr.setSpriteFrame(spr.node, cv.tools.getBackgroundBannerImgPath());
                return;
            }
            spr.spriteFrame = new cc.SpriteFrame(resource);
        }.bind(this));

    }

    setPageCircleimg(index: number): void {
        if (this._whiteCircleList.length == 0) return;
        let len = this._whiteCircleList.length;
        if (len <= 1) {
            this._whiteCircleList[0].active = (false);
        }
        else {
            for (let i = 0; i < len; i++) {
                this._whiteCircleList[i].active = true;
                if (i == index) {
                    cv.resMgr.setSpriteFrame(this._whiteCircleList[i], "zh_CN/hall/ui/ui_0059_round_yes");
                } else {
                    cv.resMgr.setSpriteFrame(this._whiteCircleList[i], "zh_CN/hall/ui/ui_0060_round_no");
                }
            }
        }
    }

    PageViewAction(): void {
        let len = this._whiteCircleList.length;
        if (len > 1) {
            let index = this.img_PageView.getCurrentPageIndex();
            let next = index < len - 1 ? index + 1 : 0;
            this.img_PageView.scrollToPage(next, 1);
        }
    }

    touchImgPageview(event: cc.Event) {
        let len = this._whiteCircleList.length;
        let index = this.img_PageView.getCurrentPageIndex();
        let curindex = index >= len ? len - 1 : index;
        this.setPageCircleimg(curindex);
    }

    setGameType(type: number) {
        this._gameType = type;
        this.updatePokerPagePanelActive();
        let checkBoxButton = cc.find("pokerPage_panel/checkBoxButton", this.node);
        if (type == DiscoverGameType.PLO) {
            cc.find("pokerPage_panel/button1/text", this.node).color = cc.color(102, 102, 102);
            cc.find("pokerPage_panel/button2/text", this.node).color = cc.color(102, 102, 102);
            cc.find("pokerPage_panel/button3/text", this.node).color = cc.color(102, 102, 102);
            checkBoxButton.active = false;
            this.scrollView.node.getComponent(cc.Widget).top = this.scrollViewTop - this.pokerPage_panel.height;
        } else {
            cc.find("pokerPage_panel/button1/text", this.node).color = cc.Color.WHITE;
            cc.find("pokerPage_panel/button2/text", this.node).color = cc.Color.WHITE;
            cc.find("pokerPage_panel/button3/text", this.node).color = cc.Color.WHITE;
            checkBoxButton.active = true;
            this.scrollView.node.getComponent(cc.Widget).top = this.scrollViewTop;
            this.changeView(this.viewIndex, true);
        }
        cv.resMgr.adaptWidget(this.scrollView.node, true);
        this.refreshTop.getComponent('RefreshTop').updataNodePos();
    }

    updatePokerPagePanelActive() {
        let isShow = this._gameType != DiscoverGameType.PLO && this._gameType != this.MTT_NUM && this._gameType != this.BLACKJACK_NUM;
        console.log("Findview test updatePokerPagePanelActive", this._gameType, isShow);
        this.pokerPage_panel.active = isShow;
    }

    setViewGametype(type: number, isRunAction: boolean): void {
        let isMTT: boolean = type == this.MTT_NUM;
        let isBJPVP: boolean = type == this.BLACKJACK_NUM;
        let isScrollViewActive: boolean = !isMTT && !isBJPVP;
        console.log("Findview test setViewGametype", type, isMTT, isBJPVP, isScrollViewActive);
        if (this.mtt_img) {
            this.mtt_img.active = isBJPVP;
        }

        this.scrollView.node.active = isScrollViewActive;

        if (this.isHelpView) {
            this.isHelpView = false;
            this.changeView(4, false);
            this.changeView(this.viewIndex, true);
        }
        if (type == this._gameType) return;
        if (type == DiscoverGameType.PLO && this.viewIndex != 0) {
            this.setViewIndex(0);
        }
        this.setGameType(type);
        let str: string = cv.String(this._gameType);
        cv.tools.SaveStringByCCFile(this.SAVE_gameType, str);
        this.updateGameBtn();
    }

    initPage(): void {
        // this.initGameType();
        let pageV = cv.tools.GetStringByCCFile("last_pageview");
        if (cv.StringTools.getArrayLength(pageV) > 0) {
            // 	_pageView = SEAtoi(pageV.c_str());
            // }
            // else{
            // 	_pageView = 2;
        }
    }

    initGameType(): void {
        let str: string = cv.tools.GetStringByCCFile(this.SAVE_gameType);
        if (cv.StringTools.getArrayLength(str) > 0) {
            this.setGameType(cv.Number(str));
        }
        else {
            this.setGameType(DiscoverGameType.DZPK);
        }

        // if (this.isSiyuType && this._gameType == this.MTT_NUM) {
        //     this.setGameType(DiscoverGameType.DZPK);
        // }
        let list;
        let isFind = false;
        if (cv.config.isOverSeas()) {
            list = this.PKC_GAME_TYPE;
        } else {
            list = this.PKW_GAME_TYPE;
        }
        for (let index = 0; index < list.length; index++) {
            if (this._gameType == list[index]) {
                isFind = true;
                break;
            }
        }
        if (!isFind && list.length > 0) {
            this.setGameType(list[0]);
            let str: string = cv.String(this._gameType);
            cv.tools.SaveStringByCCFile(this.SAVE_gameType, str);
        }

        this.updateGameBtn();
    }
    //刷新二级菜单按钮
    updateGameBtn(): void {
        let len = this._gamebuttonList.length;
        this.selectimg.active = false;
        for (let i = 0; i < len; i++) {

            let tag;
            if (cv.config.isOverSeas()) {
                tag = this.PKC_GAME_TYPE[i];
            } else {
                tag = this.PKW_GAME_TYPE[i];
            }
            let text = (this._gamebuttonList[i].getChildByName("text"));
            let newyear_icon_left = this._gamebuttonList[i].getChildByName("newyear_icon_left");
            let newyear_icon_right = this._gamebuttonList[i].getChildByName("newyear_icon_right");
            if (tag != this._gameType) {
                text.color = cc.color(197, 197, 214); // new cc.Color().fromHEX("#ADAEC2");
                newyear_icon_left.active = false;
                newyear_icon_right.active = false;
            }
            else {
                let isNewYear: boolean = cv.config.isShowNewYear();
                this.selectimg.setPosition(this._gamebuttonList[i].getPosition());
                this.selectimg.active = true;
                text.color = cc.color(39, 39, 50); // new cc.Color().fromHEX("#FFFFFF");
                newyear_icon_left.active = isNewYear;
                newyear_icon_right.active = isNewYear;
            }
        }

        this.initBanner();
    }

    sortByBlindorAnte(a: any, b: any): number {
        if (a.game_id > b.game_id) {
            return -1;
        }
        else if (a.game_id < b.game_id) {
            return 1;
        }
        else if (a.game_id == cv.Enum.GameId.Allin && b.game_id == cv.Enum.GameId.Allin) {
            return (a.big_blind < b.big_blind) ? 1 : -1;
        }
        else {
            // 牌局从大到小
            let num1, num2;
            if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                num1 = a.small_blind;
            }
            else {
                num1 = a.ante;
            }

            if (b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                num2 = b.small_blind;
            }
            else {
                num2 = b.ante;
            }

            // 有straddle的优先
            if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal && b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                if (a.big_blind == b.big_blind) {
                    if (a.straddle && !b.straddle) {
                        return -1;
                    }
                    else if (!a.straddle && b.straddle) {
                        return 1;
                    }
                }
            }

            if (num1 == num2) {
                // 优先短牌局
                if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal && b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    // 前注从大到小
                    if (a.ante != b.ante) {
                        return (a.ante < b.ante) ? 1 : -1;
                    } else {
                        //暴击局优先
                        // if(a.isCriticismField == true && b.isCriticismField == false){
                        //     return -1;
                        // }else if(a.isCriticismField == false &&b.isCriticismField == true){
                        //     return 1;
                        // }
                    }
                }
                else if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    return 1
                }
                else if (b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                    return -1
                }

                if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short && b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                    if (a.ante == b.ante) {
                        //暴击局优先
                        // if(a.isCriticismField == true && b.isCriticismField == false){
                        //     return -1;
                        // }else if(a.isCriticismField == false &&b.isCriticismField == true){
                        //     return 1;
                        // }
                    }
                }

                // 再按是否开始 已开始的优先
                if (a.start_time != 0 && b.start_time != 0) {
                    // 按照开始时间最晚的排上面
                    return (a.start_time < b.start_time) ? 1 : -1;
                }
                else if (a.start_time != 0) {
                    return -1
                }
                else if (b.start_time != 0) {
                    return 1
                }
                else {
                    //按照创建时间最晚的排上面
                    return (a.create_time < b.create_time) ? 1 : -1;
                }
            }
            else {
                return (num1 < num2) ? 1 : -1;
            }
        }
    }

    sortByMixed(a: any, b: any): number {
        // 牌局从大到小
        let num1, num2;
        if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            num1 = a.small_blind;
        }
        else {
            num1 = a.ante;
        }

        if (b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            num2 = b.small_blind;
        }
        else {
            num2 = b.ante;
        }
        if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal && b.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            if (a.big_blind == 200 * 100 && a.big_blind == b.big_blind) {
                if (a.straddle && !b.straddle) {
                    return -1
                }
                else if (!a.straddle && b.straddle) {
                    return 1
                }
            }
        }

        // 开局时间从早到晚
        if (num1 == num2) {
            return (a.start_time < b.start_time) ? -1 : 1;
        }
        else {
            return (num1 > num2) ? -1 : 1;
        }
    }

    sortByAof(a: any, b: any): number {
        if (a.game_id == cv.Enum.GameId.Allin && b.game_id != cv.Enum.GameId.Allin) {
            return -1
        }
        else if (a.game_id != cv.Enum.GameId.Allin && b.game_id == cv.Enum.GameId.Allin) {
            return 1
        }
        else {
            return 1
        }
    }

    // 优先已买入  其次已结算（同为买入或结算的局 优先新创建）优先未开始的局  （未开始的局优先新创建的局， 已开始的局优先最新开始的局）
    sortByCreatime(a: any, b: any): number {
        // 急速游戏不在这里排序
        if (a.game_id > b.game_id) {
            return -1;
        }
        else if (a.game_id < b.game_id) {
            return 1;
        }
        //else if (a.game_id == cv.Enum.GameId.Allin && b.game_id == cv.Enum.GameId.Allin){
        //	return a.big_blind() > b.big_blind();
        //}
        else {
            if (a.has_buyin == 1 && b.has_buyin != 1)//1:买入 2：结算
            {
                return -1
            }
            else if (a.has_buyin != 1 && b.has_buyin == 1) {
                return 1
            }
            else if (a.has_buyin == 1 && b.has_buyin == 1) {
                return (a.create_time > b.create_time) ? -1 : 1;
            }
            else {
                if (a.has_buyin == 2 && b.has_buyin != 2) {
                    return -1
                }
                else if (a.has_buyin != 2 && b.has_buyin == 2) {
                    return 1
                }
                else if (a.has_buyin == 2 && b.has_buyin == 2) {
                    return (a.create_time > b.create_time) ? -1 : 1;
                }
                else {
                    if (a.start_time == 0 && b.start_time != 0) {
                        return -1
                    }
                    else if (a.start_time != 0 && b.start_time == 0) {
                        return 1
                    }
                    else if (a.start_time == 0 && b.start_time == 0) {
                        return (a.create_time > b.create_time) ? -1 : 1;
                    }
                    else {
                        return (a.start_time > b.start_time) ? -1 : 1;
                    }
                }
            }
        }
    }

    // 发现列表排序 凌晨3 -7点和平时按不同规则来排
    sortListByTime(list: any[]) {
        let hours = (new Date()).getHours();
        if (hours >= 3 && hours < 7) {
            list.sort(this.sortByCreatime);
        }
        else {
            list.sort(this.sortByLevel.bind(this));
        }
    }

    screenByGame(): any[] {
        let list: any[] = [];
        let game_mode: number[] = [];
        let game_type: number[] = [];

        let itemLen = this.itemData.length;
        for (let i = 0; i < itemLen; i++) {

            if (this.itemData[i].game_id == cv.Enum.GameId.StarSeat) {

            }
            list.push(this.itemData[i]);
        }

        switch (this._gameType) {
            case DiscoverGameType.ALL:
                {
                    return (this.cleanJspkData(list))//.sort(this.sortByBlindorAnte);
                }
            case DiscoverGameType.DZPK:
                game_mode.push(cv.Enum.CreateGameMode.CreateGame_Mode_Normal);
                game_type.push(cv.Enum.GameId.Texas);
                game_type.push(cv.Enum.GameId.StarSeat);
                // for (let i = cv.Enum.GameId.ZoomTexas; i <= cv.Enum.GameId.ZoomTexasMax; i++) {
                //     game_type.push(i);
                // }
                break;
            case DiscoverGameType.DZPK_SHORT:
                game_mode.push(cv.Enum.CreateGameMode.CreateGame_Mode_Short);
                game_type.push(cv.Enum.GameId.Texas);
                game_type.push(cv.Enum.GameId.StarSeat);
                // for (let i = cv.Enum.GameId.ZoomTexas; i <= cv.Enum.GameId.ZoomTexasMax; i++) {
                //     game_type.push(i);
                // }
                break;
            case DiscoverGameType.AOF:
                game_type.push(cv.Enum.GameId.Allin);
                break;
            // case DiscoverGameType.AOF_SHORT:

            //     break;
            case DiscoverGameType.ZOOM_TEXAS:
                for (let i = cv.Enum.GameId.ZoomTexas; i <= cv.Enum.GameId.ZoomTexasMax; i++) {
                    game_type.push(i);
                }
                break;

            case DiscoverGameType.BET:
                game_mode.push(cv.Enum.CreateGameMode.CreateGame_Mode_Normal);
                game_type.push(cv.Enum.GameId.Bet);
                break;

            case DiscoverGameType.JACKFRUIT:
                game_type.push(cv.Enum.GameId.Jackfruit);
                break;

            case DiscoverGameType.PLO:
                game_type.push(world_pb.GameId.PLO);
                break;
        }

        let result: any[] = [];
        let listLen = list.length;
        let typeLen = game_type.length;
        let modeLen = game_mode.length;

        for (let i = 0; i < listLen; i++) {
            if (typeLen == 0) {
                if (modeLen == 0) {
                    result.push(list[i]);
                }
                else {
                    for (let s = 0; s < modeLen; s++) {
                        if (list[i].game_mode == game_mode[s]) {
                            result.push(list[i]);
                        }
                    }
                }
            }
            else {

                for (let j = 0; j < typeLen; j++) {
                    if (list[i].game_id == game_type[j]) {

                        if (modeLen == 0) {
                            result.push(list[i]);
                        }
                        else {
                            for (let s = 0; s < modeLen; s++) {
                                if (list[i].game_mode == game_mode[s]) {
                                    result.push(list[i]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return result//.sort(this.sortByBlindorAnte);
    }

    cleanJspkData(arr: any[]): any[] {
        let len = cv.StringTools.getArrayLength(arr);
        for (let i = len - 1; i >= 0; i--) {
            if (cv.roomManager.checkGameIsZoom(arr[i].game_id)) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }

    sortZoomByAnte(a: any, b: any): number {
        // 优先盲注小的在前
        if (a.ante != b.ante) {
            return (a.ante < b.ante) ? -1 : 1;
        }
        else {
            // 人数少的在前
            if (a.player_count_max != b.player_count_max) {
                return (a.player_count_max < b.player_count_max) ? -1 : 1;
            }
            else {
                // 新创建的在前
                return (a.create_time > b.create_time) ? -1 : 1;
            }
        }
    }

    sortZoomByBlind(a: any, b: any): number {
        // 优先盲注小的在前
        if (a.big_blind != b.big_blind) {
            return (a.big_blind < b.big_blind) ? -1 : 1;
        }
        else {
            // 人数少的在前
            if (a.player_count_max != b.player_count_max) {
                return (a.player_count_max < b.player_count_max) ? -1 : 1;
            }
            else {
                // 新创建的在前
                return (a.create_time > b.create_time) ? -1 : 1;
            }
        }
    }

    initJspkList() {
        let tempGameType = this._gameType;
        this.setGameType(DiscoverGameType.ZOOM_TEXAS);
        this._jspkArr = this.screenByGame();
        this.setGameType(tempGameType);
        if (cv.StringTools.getArrayLength(this._jspkArr) > 1) {
            this._jspkArr.sort(this.sortJspk.bind(this));
        }
    }
    sortJspk(a: any, b: any): number {
        if (a.game_mode == b.game_mode) {
            if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                return this.sortZoomByBlind(a, b);
            }
            else {//if (a.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short)
                return this.sortZoomByAnte(a, b);
            }
        }
        else {
            return a.game_mode > b.game_mode ? 1 : -1;
        }
    }

    sortByVacancy(a: any, b: any): number {
        if (a.game_id == cv.Enum.GameId.Allin && b.game_id != cv.Enum.GameId.Allin) {
            return -1;
        }
        else if (a.game_id != cv.Enum.GameId.Allin && b.game_id == cv.Enum.GameId.Allin) {
            return 1;
        }
        //else if (a.game_id ==cv.Enum.GameId.Allin && b.game_id ==cv.Enum.GameId.Allin){
        //	return a.big_blind() > b.big_blind();
        //}
        else {
            let aIsempty = a.left_seatnum == a.player_count_max;
            let bIsempty = b.left_seatnum == b.player_count_max;
            if (aIsempty && !bIsempty) {
                return -1;
            }

            if (!aIsempty && bIsempty) {
                return 1;
            }

            if (a.left_seatnum == b.left_seatnum) {
                return a.player_count_max < b.player_count_max ? 1 : -1;
            }
            else {
                return a.left_seatnum < b.left_seatnum ? 1 : -1;
            }
        }
    }

    compareType(item: any, type: number): boolean {

        if (type == 1) {
            return (item.game_id == cv.Enum.GameId.Texas || item.game_id == cv.Enum.GameId.StarSeat) && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal;
        }
        else if (type == 2) {
            return (item.game_id == cv.Enum.GameId.Texas || item.game_id == cv.Enum.GameId.StarSeat) && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short;
        }
        else if (type == 3) {
            return item.game_id == cv.Enum.GameId.Allin && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal;
        }
        else if (type == 4) {
            return item.game_id == cv.Enum.GameId.Bet;
        }
        else if (type == 30) {
            return item.game_id == cv.Enum.GameId.Allin && item.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short;
        }
        else if (type == 7) {  //暴击德州
            return item.game_id == cv.Enum.GameId.Jackfruit;
        }
        else if (type == 8) {  //奥马哈
            return item.game_id == world_pb.GameId.PLO;
        }
        else {
            return false;
        }
    }

    sortByTimeAndPeople(a: any, b: any): number {
        // 游戏划分
        if (a.game_id > b.game_id) {
            return -1;
        }
        else if (a.game_id < b.game_id) {
            return 1;
        }
        else {

            // 优先已开始的局
            if (a.start_time == 0 && b.start_time != 0) {
                return 1;
            }
            if (a.start_time != 0 && b.start_time == 0) {
                return -1;
            }

            return this.sortByMixed(a, b);
        }
    }
    //明星桌永远排第一位
    sortByStar(a: any, b: any): number {
        //明星桌排序在前面
        if (a.game_id == cv.Enum.GameId.StarSeat && b.game_id == cv.Enum.GameId.StarSeat) {
            return 1;
        }
        else if (a.game_id == cv.Enum.GameId.StarSeat) {
            return -1;
        } else if (b.game_id == cv.Enum.GameId.StarSeat) {
            return 1;
        }
        return 1;
    }
    // 短牌优先 计时桌空桌排最上  非计时空桌排第二 满桌最后
    // 急速游戏不在这里排序
    sortByLevel(a: any, b: any): number {
        // 优先游戏
        if (a.game_id > b.game_id) {
            return -1;
        }
        else if (a.game_id < b.game_id) {
            return 1;
        }
        else {

            //暴击局优先
            // if(a.isCriticismField == true && b.isCriticismField == false){
            //     return -1;
            // }else if(a.isCriticismField == false &&b.isCriticismField == true){
            //     return 1;
            // }

            // 其次按类型  短牌优先
            if (a.game_mode > b.game_mode) {
                return -1;
            }
            else if (a.game_mode < b.game_mode) {
                return 1;
            }
            else {
                // 按排序级别划分 新版排序没有计时桌  所以排序是（非空非满， 空桌，满桌）
                let alevel = this.getSortLevel(a);
                let blevel = this.getSortLevel(b);
                if (alevel > blevel) {
                    return -1;
                }
                else if (alevel < blevel) {
                    return 1;
                }
                else {
                    // 优先级排序
                    if (this.getSortTableLevel(a) < this.getSortTableLevel(b)) {
                        return -1;
                    } else if (this.getSortTableLevel(a) > this.getSortTableLevel(b)) {
                        return 1;

                    }

                    // 空桌排序逻辑 小桌靠前
                    if (a.player_count == 0) {
                        return a.player_count_max < b.player_count_max ? -1 : 1;
                    }
                    // 满桌排序逻辑 大桌靠前
                    if (a.player_count == a.player_count_max) {
                        return a.player_count_max > b.player_count_max ? -1 : 1;
                    }

                    // 非空非满 牌桌所需坐满人数越少，排名越靠前 相同的大桌靠前
                    if (this.getNeededNum(a) < this.getNeededNum(b)) {
                        return -1;
                    } else if (this.getNeededNum(a) > this.getNeededNum(b)) {
                        return 1;
                    } else {
                        return a.player_count_max > b.player_count_max ? -1 : 1;
                    }
                }
            }
        }
    }

    // 坐满需要的人数
    getNeededNum(data: any): number {
        return data.player_count_max - data.player_count;
    }

    // 新版排序没有计时桌  所以排序是（非空非满， 空桌，满桌）
    getSortLevel(data: any): number {
        // // 计时桌空桌排最上  非计时空桌排第二
        // if (!data.hasEndTime) {
        if (data.player_count == data.player_count_max) {
            return 0;
        }
        else if (data.player_count == 0) {
            return 1;
        }
        else {
            return 2;
        }
        // }
        // else {
        //     if (data.player_count == data.player_count_max) {
        //         return 0;
        //     }
        //     else if (data.player_count == 0) {
        //         return 2;
        //     }
        //     else {
        //         return 1;
        //     }
        // }
    }

    // 获取多级别允许的混合数量
    getLevelProNumber(data: any): number {
        let num = 0;
        for (let i = 0; i < data.proDatas.length; i++) {
            if (data.proDatas[i].levelLimit != 0) {
                num++;
            }
        }
        return num;
    }

    // 玩家所属级别还能坐下的人数-玩家所属级别已有人数，按由大到小降序排序
    // 玩家当前级别不能进的房间服务器会屏蔽,因此不会出现当前级别levelLimit == 0的情况
    getSortLevelByNewPro(data: any): number {
        if (data.proLevel <= 0 || data.proLevel > data.proDatas.length) {
            return 0;
        }
        let info = data.proDatas[data.proLevel - 1];
        let maxnum = info.levelLimit > 0 ? info.levelLimit : data.player_count_max;
        return maxnum - info.nowNum * 2;
    }

    // 房间对应玩家级别的优先级，按值由小到大排序
    getSortTableLevel(data: any): number {
        if (data.proLevel <= 0 || data.proLevel > data.proDatas.length) {
            return 0;
        }
        let info = data.proDatas[data.proLevel - 1];
        return info.tableLevel;
    }

    destroyMTTView() {
        if (this.mtt && cc.isValid(this.mtt.node)) {
            this.mtt.node.targetOff(this);
            this.mtt.node.removeFromParent(true);
            this.mtt.node.destroy();
        }
        // if (LoadingBlocker.hasInstance()) {
        //     LoadingBlocker.hide("All");

        // }
        if (cc.vv && cc.vv.AssetsManager) {
            cc.vv.AssetsManager.hideAllDialog();
        }
        if (WorldWebSocket.hasInstance()) {
            WorldWebSocket.getInstance().close(true);
            // WorldWebSocket.forceClose();
            WorldWebSocket.dropInstance();
        }
        this.mtt = null;
    }

    reInitMttView() {
        this.destroyMTTView();
        this.initMTT();
    }

    openMttView(url: string): void {
        if (!cv.config.HAVE_MTT || this.matchUrl == url) return;
        this.matchUrl = url;
        // this.showSiYuMtt();
        if (this.mttUrl != url) {
            this.mttUrl = this.matchUrl;
            this.reInitMttView();
        }
        this.setMatchWebPos(this._gameType == this.MTT_NUM && this.node.active);
    }

    openMatchWebview(url: string): void {
        if (!this.mttUseWebView) {
            if (this.matchWeb) {
                this.matchWeb.node.active = false;
            }
            return;
        }
        if (!cv.config.HAVE_MTT || this.matchUrl == url) return;
        this.matchUrl = url + "&isFullscreen=" + "false";
        // this.showSiYuMtt();
        if (this.matchWeb) {
            if (this.matchWeb.url != url) {
                this.matchWeb.url = this.matchUrl;
            }

            this.setMatchWebPos(this._gameType == this.MTT_NUM && this.node.active);
        }
    }

    HandleCheckMTT(isView?: boolean) {
        console.log("HandleCheckMTT", isView);
        isView = (isView == true) ? true : false;
        if (this.node.active && isView && this._gameType == this.MTT_NUM) {
            this.initMTT();
        }
        if (cc.isValid(this.mtt)) {
            isView = isView && this._gameType == this.MTT_NUM && this.node.active;
            this.setMatchWebPos(isView);
        }
    }

    HandleCheckWebView(isView?: boolean) {
        if (!this.mttUseWebView) {
            this.HandleCheckMTT(isView);
            return;
        }
        console.log("HandleCheckWebView");
        isView = (isView == true) ? true : false;
        if (this.node.active && isView && this._gameType == this.MTT_NUM) {
            this.initMTTWeb();
        }

        if (this.matchWeb) {
            if (this.matchUrl != "" && this.matchWeb.url != this.matchUrl) {
                this.matchWeb.url = this.matchUrl;
            }
            if (cv.dataHandler.getUserData().m_bIsLoginServerSucc) {
                this.RequestAuthApi_ForMTT();
            }
            isView = isView && this._gameType == this.MTT_NUM && this.node.active;
            this.setMatchWebPos(isView);
        }
    }


    setMatchWebPos(isView: boolean): void {
        if (!this.mttUseWebView) {
            this.setMttPos(isView);
            return;
        }
        this.webIsView = isView;
        if (this.matchWeb) {
            let pos = cc.v2(cc.winSize.width * 4, cc.winSize.height * 0.5);
            this.matchWeb.node.setPosition(isView == false ? pos : this.matchWeb_pos);
            console.log("setMatchWebPos ----->", this.matchWeb.node.x);
        }
    }

    setMttPos(isView: boolean): void {
        this.webIsView = isView;
        if (this.mtt) {
            let pos = cc.v2(cc.winSize.width * 4, this.mtt.node.y);
            this.mtt.widget.top = this.matchWeb_pos.x;
            this.mtt.widget.bottom = this.matchWeb_pos.y;
            this.mtt.node.active = isView;
        }
        // if (this.mtt) {
        //     let pos = cc.v2(0, 0);
        //     this.mtt.node.setPosition(isView == false ? pos : this.matchWeb_pos);
        //     console.log("setMTTPos ----->", this.mtt.node.x);
        // }
    }

    updateMTTState(): void {
        let isView = cv.config.HAVE_MTT;
        let haveMTT = this.PKW_GAME_TYPE[0] == this.MTT_NUM;

        if ((!isView && !haveMTT) || (isView && haveMTT)) return;

        let cell = (this.gameType_panel.getChildByName("button_0"));
        let cellSize = cc.size(this.gameType_panel.width / (this._gamebuttonList.length) - 3, cell.height);
        if (!isView) {  //关闭
            // if (this.isSiyuType) {
            //     cv.native.SYwebCloseChildWebview();
            // }
            this.destroyMTTView();

            // this.scrollView.node.active = true;
            // this.mtt_img.active = false;
            this.matchUrl = "";
            //更新按钮选项
            this._gamebuttonList[0].removeFromParent(true);
            this._gamebuttonList[0].destroy();
            this._gamebuttonList.shift();
            this.PKW_GAME_TYPE.shift();
            let len = this._gamebuttonList.length;
            cellSize = cc.size(this.gameType_panel.width / len - 3, cell.height);
            this.gameType_scrollView.content.setContentSize(cc.size(cellSize.width * len, this.gameType_scrollView.node.height));
            this.selectimg.setContentSize(cc.size(cellSize.width, this.selectimg.height));
            for (let i = 0; i < len; i++) {
                this._gamebuttonList[i].setPosition(cc.v2(cellSize.width / 2 + cellSize.width * i + this._gamebuttonList.length * 1.5, cellSize.height / 2));
            }

            if (this._gameType == this.MTT_NUM) {
                this.setViewGametype(1, true);
                this.updateGameTypeDataAndView();
            }
        }
        else {
            this.PKW_GAME_TYPE.unshift(this.MTT_NUM);
            let len = this.PKW_GAME_TYPE.length;
            cellSize = cc.size(this.gameType_panel.width / len - 3, cell.height);
            this.selectimg.setContentSize(cc.size(cellSize.width, this.selectimg.height));
            this.gameType_scrollView.content.setContentSize(cc.size(cellSize.width * len, this.gameType_scrollView.node.height));
            for (let i = 0; i < len; i++) {
                if (i == 0) {
                    let button = cc.instantiate(cell);
                    let tag;
                    if (cv.config.isOverSeas()) {
                        tag = this.PKC_GAME_TYPE[i];
                    } else {
                        tag = this.PKW_GAME_TYPE[i];
                    }

                    button.active = true;
                    button.name = "btn_" + tag;
                    button.on("click", (event: cc.Event) => {
                        this.setViewGametype(tag, true);
                        cv.AudioMgr.playButtonSound('tab');
                        if (tag == this.MTT_NUM && cv.config.HAVE_MTT) {
                            this.onShowMttTab();
                        }
                        else if (tag == this.BLACKJACK_NUM && cv.config.HAVE_BLACKJACK) {
                            this.onShowBJPVPTab();
                        }
                        else {
                            this.HandleCheckMTT(false);
                            this.handleCheckBJPVP(false);
                            this.updateGameTypeDataAndView();
                        }
                    }, this);
                    this._gamebuttonList.unshift(button);
                    this.gameType_scrollView.content.addChild(button);
                }
                this._gamebuttonList[i].setPosition(cc.v2(cellSize.width / 2 + cellSize.width * i + this._gamebuttonList.length * 1.5, cellSize.height / 2));
            }
            this.updateGameBtn();
        }
        this.initLanguage();
    }

    //21点开关状态
    //cv.config.HAVE_BLACKJACK: true为显示  false为关闭
    updateBlackJackState() {
        let isView = cv.config.HAVE_BLACKJACK;
        let haveBlackJack: boolean = false;
        let _indexBlackJack = - 1;
        for (let i = 0; i < this.PKW_GAME_TYPE.length; i++) {
            if (this.PKW_GAME_TYPE[i] == this.BLACKJACK_NUM) {
                haveBlackJack = true;
                _indexBlackJack = i;
                break;
            }
        }

        if ((!isView && !haveBlackJack) || (isView && haveBlackJack)) return;

        let cell = (this.gameType_panel.getChildByName("button_0"));
        let cellSize = cc.size(this.gameType_panel.width / (this._gamebuttonList.length) - 3, cell.height);
        if (!isView) {  //关闭

            let curBjIndex: number = -1;  //21点按钮现在所在的位置
            let btnBJ_Node: cc.Node = null;
            let btnBJ_name = "btn_" + this.BLACKJACK_NUM;

            for (let i = 0; i < this._gamebuttonList.length; i++) {
                if (this._gamebuttonList[i].name == btnBJ_name) {
                    curBjIndex = i;
                    btnBJ_Node = this._gamebuttonList[i];
                }
            }

            //更新按钮选项,将21点按钮从 this._gamebuttonList数组中移除
            if (btnBJ_Node) {
                btnBJ_Node.removeFromParent(true);
                btnBJ_Node.destroy();
                this._gamebuttonList.splice(curBjIndex, 1);

            }
            //将21点索引从 this.PKW_GAME_TYPE数组中移除
            if (_indexBlackJack != -1) {
                this.PKW_GAME_TYPE.splice(_indexBlackJack, 1);
            }

            let len = this._gamebuttonList.length;
            cellSize = cc.size(this.gameType_panel.width / len - 3, cell.height);
            this.gameType_scrollView.content.setContentSize(cc.size(cellSize.width * len, this.gameType_scrollView.node.height));
            this.selectimg.setContentSize(cc.size(cellSize.width, this.selectimg.height));
            for (let i = 0; i < len; i++) {
                this._gamebuttonList[i].setPosition(cc.v2(cellSize.width / 2 + cellSize.width * i + this._gamebuttonList.length * 1.5, cellSize.height / 2));
            }

            if (this._gameType == this.BLACKJACK_NUM) {
                this.setViewGametype(1, true);
                this.updateGameTypeDataAndView();
            }
        }
        else {
            //重新打开21点

            let shortIndex = -1;
            for (let i = 0; i < this.PKW_GAME_TYPE.length; i++) {
                if (this.PKW_GAME_TYPE[i] == 2) {      //获取短牌的位置
                    shortIndex = i;
                    break;
                }
            }
            if (cv.config.HAVE_BLACKJACK) {  //21点按钮添加到短牌按钮后面
                this.PKW_GAME_TYPE.splice(shortIndex + 1, 0, this.BLACKJACK_NUM)
            }

            let len = this.PKW_GAME_TYPE.length;
            cellSize = cc.size(this.gameType_panel.width / len - 3, cell.height);
            this.selectimg.setContentSize(cc.size(cellSize.width, this.selectimg.height));
            this.gameType_scrollView.content.setContentSize(cc.size(cellSize.width * len, this.gameType_scrollView.node.height));
            for (let i = 0; i < len; i++) {
                if (this.PKW_GAME_TYPE[i] == this.BLACKJACK_NUM) {
                    let button = cc.instantiate(cell);
                    let tag;
                    if (cv.config.isOverSeas()) {
                        tag = this.PKC_GAME_TYPE[i];
                    } else {
                        tag = this.PKW_GAME_TYPE[i];
                    }

                    button.active = true;
                    button.name = "btn_" + tag;
                    button.on("click", (event: cc.Event) => {
                        this.setViewGametype(tag, true);
                        cv.AudioMgr.playButtonSound('tab');
                        if (tag == this.MTT_NUM && cv.config.HAVE_MTT) {
                            this.onShowMttTab();
                        }
                        else if (tag == this.BLACKJACK_NUM && cv.config.HAVE_BLACKJACK) {
                            this.onShowBJPVPTab();
                        }
                        else {
                            this.HandleCheckMTT(false);
                            this.handleCheckBJPVP(false);
                            this.updateGameTypeDataAndView();
                        }
                    }, this);

                    this._gamebuttonList.splice(shortIndex + 1, 0, button);
                    this.gameType_scrollView.content.addChild(button);
                }
                this._gamebuttonList[i].setPosition(cc.v2(cellSize.width / 2 + cellSize.width * i + this._gamebuttonList.length * 1.5, cellSize.height / 2));
            }

        }
        this.updateGameBtn();
        this.initLanguage();
    }

    initMTT(): void {
        if (cv.config.HAVE_MTT && !cc.isValid(this.mtt)) {
            this.createMTT();
        }
    }

    createMTT() {
        MTTConnector.instance.initCCVV();
        // ResourcesLoader.instance.loadRes("mtt/hall/hallFeature", cc.Prefab, null, (err, prefab) => {
        if (cv.config.HAVE_MTT && !cc.isValid(this.mtt)) {
            let prefab = this.mttPrefab;
            this.initMTTParam(prefab);
        }
    }

    initMTTParam(prefab: cc.Prefab) {
        MTTConnector.instance.initMTTParams();

        let temp = cc.instantiate(prefab);
        this.mtt = temp.getComponent(ImpokerHallFeature);
        temp.setContentSize(this.scrollView.node.width, this.scrollView.node.height + this.pokerPage_panel.height - 20);
        this.matchWeb_pos = this.mttInitPos;
        this.mtt.node.setPosition(cc.v2(0, this.mtt.node.y));
        this.setMatchWebPos(this.webIsView);
        temp.parent = cc.director.getScene().getComponentInChildren(HallScene).node;
        // console.log("mailEntrance before", this.mtt.node.getSiblingIndex(), this.mtt.node.zIndex);
        // if( mailEntrance && cc.isValid(mailEntrance.node) )
        // {
        //     console.log("mailEntrance", mailEntrance.node.getSiblingIndex(), mailEntrance.node.zIndex);
        //     let topView:cc.Node = cc.find("topView");
        //     console.log("mailEntrance topView", topView.getSiblingIndex(), topView.zIndex);
        //     this.mtt.node.setSiblingIndex(topView.getSiblingIndex());
        // }
        // console.log("mailEntrance after", this.mtt.node.getSiblingIndex(), this.mtt.node.zIndex);
        // this.mtt.setPage(this);

        if (this._gameType == this.MTT_NUM) {
            // this.matchWeb.url = this.matchUrl;
            this.setMatchWebPos(this.node.active);
        }
        else {
            this.setMatchWebPos(false);
        }

        if (cv.roomManager.isEnterMTT) {
            // this.enterMTTHall(cv.roomManager.mtt_id);
            this.enterMTTGame(cv.roomManager.mtt_id);
        }

    }

    onShowMttTab() {
        console.log("Findview test onShowMttTab");
        if (cv.config.HAVE_BLACKJACK) {
            this.handleCheckBJPVP(false);
        }
        this.HandleCheckMTT(true);
    }

    onAuthMttSucc(msg: any) {
        MTTConnector.instance.onAuthMttSucc(msg);
    }

    onAuthMttError(msg: any) {
        MTTConnector.instance.onAuthMttError(msg);
    }

    public updateListviewData(data) {
        let dataList = [];


        for (let index = 0; index < data.length; index++) {

            if (data[index].game_id == cv.Enum.GameId.StarSeat) { //明星桌
                dataList.push({ type: 1, data: data[index] });
            } else {
                dataList.push({ type: 0, data: data[index] });
            }

        }

        this.scrollView.getComponent(ListView).notifyDataSetChanged(dataList);

        // setTimeout(() => {
        //     if (this.scrollView.content.height < this.scrollView.node.height) { //不满，取消layout手动改高度
        //         this.scrollView.content.getComponent(cc.Layout).enabled = false;
        //         this.scrollView.content.height = this.scrollView.node.height;
        //     }
        // }, 300);
    }

    public bindcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) {
            node.getComponent(FindItem).updateItemData(info.data);
        } else if (info.type == 1) {
            node.getComponent(FindItemStar).updateItemData(info.data);
        }
    }

    public getItemType(data, index) {
        return data.type;
    }

    initBJPVP(): void {
        console.log("Findview test initBJPVP");
        if (!cc.isValid(this.bjpvp)) {
            // let temp = cc.instantiate(this.bjpvpPrefab);
            // temp.parent = this.mtt_img;
            // this.bjpvp = temp.getComponent(BJPVPGameList);
            this.bjpvp = BJPVPConnector.instance.createGameList(this.bjpvpPrefab, this.mtt_img, cc.director.getScene().getComponentInChildren(HallScene).node);
        }
    }

    handleCheckBJPVP(isView?: boolean): void {
        console.log("Findview test handleCheckBJPVP", isView);
        isView = (isView == true) ? true : false;
        if (this.node.active && isView && this._gameType == this.BLACKJACK_NUM) {
            this.initBJPVP();
        }
        if (cc.isValid(this.bjpvp)) {
            isView = isView && this._gameType == this.BLACKJACK_NUM && this.node.active;
            this.bjpvp.node.active = isView;
        }
    }

    onShowBJPVPTab() {
        console.log("Findview test onShowBJPVPTab");
        if (cv.config.HAVE_MTT) {
            this.HandleCheckMTT(false);
        }
        this.handleCheckBJPVP(true);
        // if(!BJPVPConnector.instance.token)
        // {
        //     BJPVPConnector.instance.requestToken();
        // }
    }

    onAuthBlackJackSucc(msg: any) {
        BJPVPConnector.instance.onAuthBlackJackSucc(msg);
    }

    onAuthBlackJackError(msg: any) {
        BJPVPConnector.instance.onAuthBlackJackError(msg);
    }

    initMTTWeb(): void {
        if (!this.mttUseWebView) {
            this.initMTT();
            return;
        }
        // if (this.isSiyuType) return;
        if (cv.config.HAVE_MTT && !this.matchWeb && cv.config.CAN_USE_WEBGL && cv.config.getMTTWebIndex() == 0) {
            this.matchWebNode = new cc.Node();
            this.matchWeb = this.matchWebNode.addComponent(cc.WebView);
            let scrollPos = this.scrollView_mtt.node.parent.convertToWorldSpaceAR(this.scrollView_mtt.node.getPosition());
            this.matchWeb.node.setContentSize(this.scrollView_mtt.node.width, this.scrollView_mtt.node.height + this.pokerPage_panel.height - 20);
            this.matchWeb_pos = cc.v2(scrollPos.x, scrollPos.y + this.pokerPage_panel.height * 0.5 + 10);
            this.setMatchWebPos(this.webIsView);
            cc.director.getScene().addChild(this.matchWeb.node);
            console.log("initMTTWeb", this.scrollView.node.width, this.scrollView.node.height + this.pokerPage_panel.height - 20);

            let self = this;
            this.matchWeb.node.on("error", () => {
                console.log("this.matchWeb error");
                cv.TP.showMsg(cv.config.getStringData("MTT_Load_failed"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                    if (self.matchWeb) {
                        self.matchWeb.url = "";
                    }
                    cv.worldNet.RequestAuthApi();
                });
            }, this);

            if (cc.sys.isNative) {
                this.matchWeb.setJavascriptInterfaceScheme("mttjs");
                this.matchWeb.setOnJSCallback((webView: cc.WebView, url: string) => {
                    if (url.search("mttjs://goto_game") != -1) {
                        if (self.matchWeb) {
                            self.matchWeb.node.setContentSize(cc.winSize);
                        }
                        self.matchWeb_pos = cc.v2(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
                        self.setMatchWebPos(self.webIsView);
                    }
                    else if (url.search("mttjs://goto_list") != -1) {
                        if (self.matchWeb) {
                            self.matchWeb.node.setContentSize(self.scrollView_mtt.node.width, self.scrollView_mtt.node.height + self.pokerPage_panel.height - 20);
                        }
                        self.matchWeb_pos = cc.v2(scrollPos.x, scrollPos.y + self.pokerPage_panel.height * 0.5 + 10);
                        self.setMatchWebPos(self.webIsView);
                    }
                    else if (url.search("mttjs://back-normal") != -1 || url.search("mttjs://back-abnormal") != -1) {
                        self.matchUrl = "";
                        if (self.matchWeb) {
                            self.matchWeb.url = "";
                        }
                        cv.worldNet.RequestAuthApi();
                    }
                    else if (url.search("mttjs://WebGL") != -1) {
                        cv.config.CAN_USE_WEBGL = false;
                        if (self.matchWeb) {
                            self.matchWeb.destroy();
                            self.matchWeb = null;

                            self.matchWebNode.targetOff(this);
                            self.matchWebNode.removeFromParent(true);
                            self.matchWebNode.destroy();
                            self.matchWebNode = null;
                        }
                        self.matchWeb = null;
                        self.matchUrl = "";
                        cv.worldNet.RequestAuthApi();
                    }
                });
            }

            if (this._gameType == this.MTT_NUM && this.matchUrl.length > 0) {
                this.matchWeb.url = this.matchUrl;
                this.setMatchWebPos(this.node.active);
            }
            else {
                this.setMatchWebPos(false);
            }
        }
    }

    mttNotify(url: string) {
        console.log("mttNotify", url, url.search("mttjs://goto_game"), url.search("mttjs://goto_list"), cc.winSize.width, cc.winSize.height, this.scrollView.node.height, this.pokerPage_panel.height);
        let scrollPos = this.scrollView.node.parent.convertToWorldSpaceAR(this.scrollView.node.getPosition());
        if (url.search("mttjs://goto_game") != -1) {
            if (cc.isValid(this.mtt)) {
                this.mtt.node.setContentSize(cc.winSize);
            }
            MTTConnector.instance.sendMessageCenter("hide_mail_entrance");
            this.matchWeb_pos = cc.v2(0, 0);
            this.setMatchWebPos(this.webIsView);
            cv.resMgr.adaptWidget(this.mtt.node, true);
        }
        else if (url.search("mttjs://goto_list") != -1) {
            if (cc.isValid(this.mtt)) {
                this.mtt.node.setContentSize(this.scrollView.node.width, this.scrollView.node.height + this.pokerPage_panel.height - 20);
            }
            MTTConnector.instance.sendMessageCenter("show_mail_entrance");
            this.matchWeb_pos = this.mttInitPos;
            this.setMatchWebPos(this.webIsView);
            cv.resMgr.adaptWidget(this.mtt.node, true);
        }
        else if (url.search("mttjs://back-normal") != -1) {
            MTTConnector.instance.sendMessageCenter(MTTConnector.instance.config.BroadCast.MTT_TOKEN_ERROR, MTTConnector.instance.config.tokenErrorMsg.BACK_NORMAL);
        }
        else if (url.search("mttjs://back-abnormal") != -1) {
            MTTConnector.instance.sendMessageCenter(MTTConnector.instance.config.BroadCast.MTT_TOKEN_ERROR, MTTConnector.instance.config.tokenErrorMsg.BACK_ABNORMAL);
        }
        // else if (url.search("mttjs://WebGL") != -1) {
        //     cv.config.CAN_USE_WEBGL = false;
        //     if (self.matchWeb) {
        //         self.matchWeb.node.targetOff(self);
        //         self.matchWeb.node.removeFromParent(true);
        //          self.matchWeb.node.destroy();
        //     }
        //     self.matchWeb = null;
        //     self.matchUrl = "";
        //     cv.worldNet.RequestAuthApi();
        // }
    }

    enterMTTHall(mttId: number) {
        if (mttId && this.mtt && cc.isValid(this.mtt.node)) {
            cv.roomManager.isEnterMTT = false;
            this.mtt.callMTTHall(mttId);
        }
    }

    enterMTTGame(mttId: number, callback?: Function) {
        if (mttId) {
            cv.roomManager.isEnterMTT = false;
            MTTConnector.instance.enterMTTGame(mttId, callback);
        }
    }

    showMttError(msg: string): void {
        // let isClick = this.isSiyuType && this.siyu_MTT_click;
        // if (isClick) {
        //     this.siyu_MTT_click = false;
        // }
        if (cv.config.HAVE_MTT && this.node.active && (this._gameType == this.MTT_NUM)) {
            cv.TT.showMsg(msg, cv.Enum.ToastType.ToastTypeError);
        }
    }


    RequestAuthApi_ForMTT(): void {
        // 已在WorldNetWork.responseLoginServer 處理
        return;
        if (cv.config.HAVE_MTT) {
            MTTConnector.instance.requestToken();
        }
    }
}
