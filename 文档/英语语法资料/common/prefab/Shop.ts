import cv from "../../components/lobby/cv";
import { NATIVE_KEY_MAP } from "./../tools/NativeEventCMD";
const { ccclass, property } = cc._decorator;
/**
 * pay_type == 1暂时不处理
 */
@ccclass
export default class Shop extends cc.Component {
    webview: cc.WebView = null;
    msgNode: cc.Node = null;
    exitCallFunc: Function = null;
    newWindow: Window = null;//window.open("","_blank");
    _bRunAnim: boolean = true;
    _saveUrl: string = "";
    _isClickOpen: boolean = false;

    @property(cc.Prefab) safeTakeOutDialogPref: cc.Prefab = null;
    @property(cc.Node) safeDialog: cc.Node = null;

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/Shop", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/Shop", cc.Prefab);
        var self = this;
        self.msgNode = cc.instantiate(prefab);
        cc.game.addPersistRootNode(self.msgNode);
        self.msgNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_TOP;
        self.registerMsg();
        if (!cc.sys.isBrowser) {
            self.webview = cc.find("webView_panel", self.msgNode).addComponent(cc.WebView);
        }
        self.initText("Shop_titile_text");
        cc.find("groupBack_button", self.msgNode).on("click", self.hide, self);
        cc.find("gold_panel/gold_btn", self.msgNode).on("click", self.onBtnAddGold, self);
        self.msgNode.active = false;
        cv.resMgr.adaptWidget(self.msgNode);
        self.UpdateUserGold();
        self.msgNode.off(cc.Node.EventType.TOUCH_END);
        self.msgNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
        });
    }

    onDestroy(): void {
        this.unregisterMsg();
    }

    unregisterMsg(): void {
        cv.MessageCenter.unregister("getShopURLSuccess", this.msgNode);
        cv.MessageCenter.unregister("update_gold", this.msgNode);
        cv.MessageCenter.unregister("update_info", this.msgNode);
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.msgNode);
        cv.MessageCenter.unregister("on_syCcjsCallback", this.msgNode);

    }
    registerMsg() {
        cv.MessageCenter.register("getShopURLSuccess", this.getShopURLSuccess.bind(this), this.msgNode);
        cv.MessageCenter.register("update_gold", this.UpdateUserGold.bind(this), this.msgNode);
        cv.MessageCenter.register("update_info", this.UpdateUserGold.bind(this), this.msgNode);
        cv.MessageCenter.register("HideWebview_ShowWindows", this.HandleSwitchServer.bind(this), this.msgNode);
        cv.MessageCenter.register("on_syCcjsCallback", this.onSyCcjsCallbak.bind(this), this.msgNode);
    }

    HandleSwitchServer(isView?: boolean) {
        isView = (isView == true && this.webview && this.msgNode.active) ? true : false;
        if (this.webview) {
            this.webview.node.active = isView;
        }
    }

    initText(title: string) {
        cv.StringTools.setLabelString(this.msgNode, "titile_text", title);
    }

    UpdateUserGold() {
        let xxxd = cv.dataHandler.getUserData().u32Chips.toString();
        let xxx = cc.find("gold_panel/gold_text", this.msgNode);
        let xxa = cc.isValid(xxx, true);
        let x = xxx.getComponent(cc.Label).string;
        cc.find("gold_panel/gold_text", this.msgNode).getComponent(cc.Label).string = cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips).toString();
    }

    //私语返回
    onSyCcjsCallbak(url: string) {

        var self = this;
        let http = "http:";
        console.log("===========allurl:: " + url);
        let index = 0;
        let urls = "";
        if (url.search("ccjs://alipays") != -1) {
            urls = url.substr(index + 15, url.length);
            let alipayHead = "alipays:";
            console.log("alipays:::" + urls);
            this.openSySysBrower(alipayHead + urls);
            return;
        }
        else if (url.search("ccjs://https") != -1) {
            index = url.search("ccjs://https");
            urls = url.substr(index + 13, url.length);
            http = "https:";
        } else if (url.search("ccjs://http") != -1) {
            index = url.search("ccjs://http");
            urls = url.substr(index + 12, url.length);
        }
        console.log("===========url::=> %s" + urls);
        console.log("end=====");

        if (url == "ccjs://opensafe") {

            cv.native.SYwebCloseChildWebview();

            //显示保险箱
            cv.resMgr.load("zh_CN/commonPrefab/Safe", cc.Prefab, (prefab: cc.Prefab): void => {
                self.safeDialog = cc.instantiate(prefab);
                let scene = cc.director.getScene();
                scene.addChild(self.safeDialog);
            }, cv.resMgr.CleanResLevel.LEVEL_BASE);

            return;
        }
        //游客升级提示
        if (url == "ccjs://guest") {
            self.show(false);
            cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_updateGrade_rechargeTips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
            return;
        }
        //g_pkNative -> openUrl(http + urls);
        this.openSySysBrower(http + urls);
    }

    getShopURLSuccess(url: string) {
        console.log("====> getShopURLSuccess url:" + url);
        if (!this.msgNode.active)
            return;
        console.log("====> getShopURLSuccess url2");
        if (cc.sys.isBrowser)
            return;
        console.log("====> getShopURLSuccess url3");

        var self = this;

        this.webview.node.active = true;
        this.webview.url = url;
        this.webview.setJavascriptInterfaceScheme("ccjs");
        this.webview.setOnJSCallback(function (webView: cc.WebView, url: string) {
            let http = "http:";
            console.log("===========allurl:: " + url);
            let index = 0;
            let urls = "";
            if (url.search("ccjs://alipays") != -1) {
                urls = url.substr(index + 15, url.length);
                let alipayHead = "alipays:";
                console.log("alipays:::" + urls);

                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openUrl", "(Ljava/lang/String;)V", alipayHead + urls);
                } else {
                    cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_CALL_OPEN_URL, { "url": alipayHead + urls });
                }
                return;
            }
            else if (url.search("ccjs://https") != -1) {
                index = url.search("ccjs://https");
                urls = url.substr(index + 13, url.length);
                http = "https:";
            } else if (url.search("ccjs://http") != -1) {
                index = url.search("ccjs://http");
                urls = url.substr(index + 12, url.length);
            }
            console.log("===========url::=> %s" + urls);
            console.log("end=====");

            if (url == "ccjs://opensafe") {
                self.show(false);
                //显示保险箱
                cv.resMgr.load("zh_CN/commonPrefab/Safe", cc.Prefab, (prefab: cc.Prefab) {
                    if (cv.dataHandler.getUserData().isTouristUser) {
                        cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_useSafe_barntips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
                        return;
                    }
                    self.safeDialog = cc.instantiate(prefab);
                    let scene = cc.director.getScene();
                    scene.addChild(self.safeDialog);
                }, cv.resMgr.CleanResLevel.LEVEL_BASE);
                return;
            }
            //游客升级提示
            if (url == "ccjs://guest") {
                self.show(false);
                cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_updateGrade_rechargeTips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
                return;
            }

            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "openUrl", "(Ljava/lang/String;)V", http + urls);
            } else {
                cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_CALL_OPEN_URL, { "url": http + urls });
            }

        });
    }

    show(isShow: boolean = true, bEnter: boolean = true) {
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语平台
            return;
        }
        isShow = isShow == false ? false : true;

        let isNative = !cc.sys.isBrowser;
        if ((isShow && this.msgNode.active) || (!isShow && !this.msgNode.active)) return;
        let isHall = cc.director.getScene().name == "HallScene";
        let result = isShow && isNative;

        if (!cc.sys.isBrowser) {
            if (bEnter) {
                this.webview.node.active = result;
            }
            if (isNative) {
                cv.MessageCenter.send("sendHideNoticeWebView", !result);
            }
        }
        this.UpdateUserGold();
        this.msgNode.active = result;
        if (isHall) {
            this._bRunAnim = result && (this.webview.url != "");
            if (result) {
                cv.action.showAction(this.msgNode, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN, cv.action.delay_type.NORMAL, null, this._actFuncFinish.bind(this));
            }
            else {
                cv.action.showAction(this.msgNode, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);
            }
        }
    }

    private _actFuncFinish(target: cc.Node, actIO: number): void {
        if (this._bRunAnim) {
            this._bRunAnim = false;
            if (cv.StringTools.getArrayLength(this._saveUrl) > 0) {
                this.HandleUrlForNative(this._saveUrl, this._isClickOpen);
            }
            this._saveUrl = "";
            this._isClickOpen = false;
        }
    }

    onBtnAddGold(event: cc.Event.EventCustom) {
        this.RechargeClick();
    }

    hide(event: cc.Event.EventCustom) {
        cv.AudioMgr.playButtonSound('button_click');
        //此方法是为了解决jsb-engine.js引擎代码中调用js方法时str参数未传的bug
        cc.WebView.Impl.prototype.evaluateJS = function (str) {
            var iframe = this._iframe;
            if (iframe) {
                return iframe.evaluateJS(str);
            }
        };
        console.log("hide  00000000");
        //制制将键盘关掉
        this.webview.evaluateJS("document.activeElement.blur()");
        if (this.exitCallFunc) {
            console.log("hide  111111111");
            this.exitCallFunc();
        }
        this.exitCallFunc = null;
        console.log("hide  2222222222");
        if (!cv.viewAdaptive.isselfchange) {
            console.log("hide  3333333333");
            this.show(false);
            cv.MessageCenter.send("sendHideNoticeWebView", true);
        }

        // 跟踪用户行为, 发送事件
        let properties = { item: "closeButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.deposit, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.payments, properties);
    }

    setExitCallFunc(func: Function) {
        if (func) {
            this.exitCallFunc = func;
        }
    }

    //私语的打开系统浏览器
    openSySysBrower(_url: string) {
        let cmdStr = "{\"cmd\": \"1012\", \"url\":\"%s\"}";
        let cmd = cv.StringTools.formatC(cmdStr, _url);
        cv.native.SYwebjsToClient(cmd);
    }

    HandleUrlForNative(url: string, isClickOpen: boolean = false) {
        if (this._bRunAnim) {
            this._saveUrl = url;
            this._isClickOpen = isClickOpen;
            return;
        }
        if (cc.sys.isBrowser && cv.config.isSiyuType()) { //如果是私语平台

            let cmdStr = "{\"cmd\": \"1006\", \"url\":\"%s\", \"op\":1, \"width\":%d, \"height\":%d}";
            let _cmd = "";
            let _offsetY = 0;
            if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_IPHONEX_SCREEN) { //iphoneX刘海屏
                _offsetY = 0;//2 * cv.config.FULLSCREEN_OFFSETY;
            }

            if (cv.native.isScreenLandscape()) {  //如果是横屏
                _cmd = cv.StringTools.formatC(cmdStr, url, cv.config.HEIGHT, cv.config.WIDTH - _offsetY);
            } else {
                _cmd = cv.StringTools.formatC(cmdStr, url, cv.config.WIDTH, cv.config.HEIGHT - _offsetY);
            }
            cv.native.SYwebjsToClient(_cmd);
            return;
        }

        if (cc.sys.isBrowser) {
            if (isClickOpen) {
                window.open(url);
            } else {
                if (this.newWindow != null) {
                    this.newWindow.location.href = url;
                }
            }
        } else {
            cv.MessageCenter.send("getShopURLSuccess", url);
        }
    }

    //充值
    RechargeClick() {
        this.initText("Shop_titile_text");
        this.show(!cc.sys.isBrowser, false);

        if (cv.dataHandler.getUserData().pay_type != 1) {
            if (cc.sys.isBrowser && !cv.config.isSiyuType()) {
                this.newWindow = window.open("", "_blank");
            }

            if (cv.config.isThai()) {
                this.HandleUrlForNative(cv.dataHandler.getUserData().getPktShopUrl());
            } else {
                cv.worldNet.RequestAddCoinOrderPayRequest(cv.dataHandler.getUserData().pay_type, "", 0);
            }
        }

        // 跟踪用户行为, 发送事件
        cv.segmentTool.track(cv.Enum.CurrentScreen.deposit, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.payments);
    }

    //取款
    ExchangeEvent() {
        this.show(!cc.sys.isBrowser, false);
        if (cv.dataHandler.getUserData().pay_type != 1) {
            cv.worldNet.RequestDelCoinOrderRequest();
        }
    }

    //查询
    QueryClick() {

        this.initText("TradeRecord_titile_text");

        this.show(!cc.sys.isBrowser, false);

        if (cv.dataHandler.getUserData().pay_type != 1) {
            // if (cv.Number(cv.config.getStringData("DEBUG_MODE")) != 0) return;

            let u32Uid = cv.dataHandler.getUserData().u32Uid;
            let acBuffer: string = "";
            if (u32Uid == 0) {
                acBuffer = cv.tools.GetStringByCCFile("user_id");
                if (cv.StringTools.getArrayLength(acBuffer) <= 0) return;
            }
            else {
                acBuffer = u32Uid.toString();
            }
            let language_type = "";
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                language_type = "zh";
            }
            else {
                language_type = "en";
            }
            let productId = 2;
            let timeStamp = Math.floor((new Date()).getTime() / 1000);

            let clubId = cv.dataHandler.getUserData().firstClubId;
            let unionId = cv.dataHandler.getUserData().firstAlliId;
            let loginName = encodeURI(cv.dataHandler.getUserData().nick_name);
            let extra_param1 = "";
            let sign = "294de072c3d679f3a6adc5ff2c50b448e9265ebe";
            /**
             * std::string key = StringUtils::format("%d", productId) + acBuffer + acBuffer + StringUtils::format("%d", clubId) + StringUtils::format("%d", unionId)+ language_type + StringUtils::format("%lld", timeStamp) + extra_param1 + StringUtils::format("%s", sign.GetString());
             */
            let key: string = cv.StringTools.formatC("%d", productId) + acBuffer + acBuffer + cv.StringTools.formatC("%d", clubId) + cv.StringTools.formatC("%d", unionId) + language_type + cv.StringTools.formatC("%lld", timeStamp) + extra_param1 + cv.StringTools.formatC("%s", sign);
            let jsonData: string = "product_id=" + cv.StringTools.formatC("%d", productId) + "&user_id=" + acBuffer + "&login_name=" + acBuffer + "&club_id=" + cv.StringTools.formatC("%d", clubId) + "&union_id=" + cv.StringTools.formatC("%d", unionId) + "&language_type=" + language_type + "&time=" + cv.StringTools.formatC("%lld", timeStamp) + "&extra_param1=" + extra_param1 + "&key_code=" + cv.md5.md5(key);

            let webUrl = cv.dataHandler.getUserData().shopUrl + cv.config.getStringData("WEB_API_TRADE_RECORD", true);
            let url = webUrl + "?" + jsonData;

            let str = cv.md5.md5(sign);
            console.log(str);
            console.log(key);
            console.log(url);
            cv.SHOP.HandleUrlForNative(url, true);
        }
    }

    setNewWindow(window: Window) {
        this.newWindow = window;
    }

    private static instance: Shop;

    public static getInstance(): Shop {
        if (!this.instance || !this.instance.msgNode || !cc.isValid(this.instance.msgNode, true)) {
            this.instance = new Shop();
        }
        return this.instance;
    }
}