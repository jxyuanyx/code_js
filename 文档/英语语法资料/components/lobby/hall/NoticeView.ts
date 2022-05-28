import cv from "../cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class NoticeView extends cc.Component {

    //列表按钮、webview、返回按钮
    @property(cc.Node) scrollContent: cc.Node = null;
    @property(cc.Node) scrollItem: cc.Node = null;
    @property(cc.Node) web: cc.Node = null;
    @property(cc.Node) backBtn: cc.Node = null;

    urlArr: Array<any> = null;
    itemCount: number = 0;
    itemIndex: number = 0;
    private _path: string = null;

    onLoad() {
        this.registerMsg();
        this.initLanguage();
        this.scrollContent.removeChild(this.scrollItem);
        this.scrollItem.destroy();

        // cv.MessageCenter.register("sendHideNoticeWebView", this.hideWebview.bind(this), this.node);
        cv.MessageCenter.register("on_webCcjsCallback", this.on_webCcjsCallback.bind(this), this.node);

        //cv.httpHandler.requsetNoticeJsonData();

        // };

        // start() {
        // this.setWebView();
    }

    onDestroy() {
        this.unregisterMsg();

    };

    // hideWebview(isView?: boolean) {
    //     isView = (isView == true && this.web && this.node.active) ? true : false;
    //     if (this.web) {
    //         this.web.active = isView;
    //     }
    // }

    registerMsg() {
        //cv.MessageCenter.register("onGetNoticeSuccess", this.onGetNoticeSuccess.bind(this));
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    };

    unregisterMsg() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        // cv.MessageCenter.unregister("sendHideNoticeWebView", this.node);
        cv.MessageCenter.unregister("on_webCcjsCallback", this.node);

        // cv.MessageCenter.unregister("onGetNoticeSuccess");
    };

    initLanguage() {
        cv.StringTools.setLabelString(this.node, "notice_button/Label", "ClubNotice_title_1");
    }

    getNoticeWebUrl(urls?): string {
        let u32Uid = cv.dataHandler.getUserData().u32Uid;
        if (urls) {
            //php那边处理过了
            // url = cv.domainMgr.getServerInfo().web_server + urls + "#clientType="
            //     + String(cv.config.GET_CLIENT_TYPE()) + "&language=" + cv.config.getCurrentLanguage() + "&uid=" + u32Uid;
        } else {
            urls = cv.domainMgr.getServerInfo().web_server + "user/article/getlist?clientType="
                + String(cv.config.GET_CLIENT_TYPE()) + "&language=" + cv.config.getCurrentLanguage() + "&uid=" + u32Uid;
        }
        return urls;
    }

    setWebView(url?) {
        if (!this.web.getComponent(cc.WebView)) {
            this.web.addComponent(cc.WebView);
        }

        let _webView = this.web.getComponent(cc.WebView);
        _webView.url = this.getNoticeWebUrl(url);
        // if (cc.sys.isBrowser)       return;

        let scheme = "ccjs";
        _webView.setJavascriptInterfaceScheme(scheme);
        _webView.setOnJSCallback((webView: cc.WebView, url: string) => {
            console.log("setOnJSCallback url = " + url);
            webView.setJavascriptInterfaceScheme("ccjs");
            webView.setOnJSCallback((webView: cc.WebView, url: string) => {
                //console.log("#######################webview url = " + url);
                let index = 0;
                let urls: string = "";
                let http: string = "http:";

                if (url.indexOf("ccjs://https") != -1) {
                    index = url.indexOf("ccjs://https");
                    urls = url.substr(index + 13, url.length);
                    http = "https:";

                } else if (url.indexOf("ccjs://http") != -1) {
                    index = url.indexOf("ccjs://http");
                    urls = url.substr(index + 12, url.length);
                }

                this.DoDownloadPicture(http + urls);
            });
        });
        // _webView.node.on("loaded", (webView: cc.WebView) => {

        // });
        // _webView.node.on("loading", (webView: cc.WebView) => {

        // });
        // _webView.node.on("error", (webView: cc.WebView) => {

        // });

    }

    public cleanWebview() {
        if (!this.web.getComponent(cc.WebView)) {
            this.web.addComponent(cc.WebView);
        }

        let _webView = this.web.getComponent(cc.WebView);
        _webView.url = "about:blank";
    }

    onGetNoticeSuccess(jsonData: any) {
        console.log("==============noticeView onGetNoticeSuccess===》》");
        if (jsonData == null) return;

        this.urlArr = jsonData["data"];
        for (var i = 0; i < this.urlArr.length; ++i) {
            console.log("=======================>>>>>>>>>>" + this.urlArr[i].imgurl);
        }
        this.itemCount = this.urlArr.length;
        this.schedule(this.initScrollItem, 0.05);
    };

    initScrollItem() {
        if (this.itemCount <= this.itemIndex) {
            this.unschedule(this.initScrollItem);
            return;
        }

        cv.resMgr.loadRemote(this.urlArr[this.itemIndex].imgurl, function (err, tex) {
            if (err) {
                console.log(err.message || err);
                return;
            }
            var spriteFrame = new cc.SpriteFrame(tex, cc.rect(0, 0, tex.width, tex.height));
            var node = cc.instantiate(this.scrollItem);
            this.scrollContent.addChild(node);
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            node.getComponent(cc.Button).normalSprite = spriteFrame;
            node.getComponent(cc.Button).pressedSprite = spriteFrame;
            node.getComponent(cc.Button).disabledSprite = spriteFrame;
            node.url = this.urlArr[this.scrollContent.childrenCount - 1].srcurl;

        }.bind(this));

        this.itemIndex++;
    }

    onBtnNoticeItemClick(event) {
        var url = event.target.url;
        console.log("=================>>url = " + url);
        // console.log("=================>>url = " + this.web.getComponent(cc.WebView).url);
        //this.web.getComponent(cc.WebView).url = url;
        //console.log("=================>>url = " + this.web.getComponent(cc.WebView).url);
        this.web.addComponent(cc.WebView);
        this.web.getComponent(cc.WebView).url = url;

        this.backBtn.active = true;
        this.scrollContent.active = false;
    }

    onBtnBackClick() {
        if (this.web.getComponent(cc.WebView)) {
            this.web.removeComponent(cc.WebView);
        }
        this.backBtn.active = false;
        this.scrollContent.active = true;
    };

    //下载图片
    DoDownloadPicture(strUrl: string) {
        //console.log("#######################strUrl==" + strUrl);

        let u64Key = strUrl.lastIndexOf("/") + 1;

        //console.log("#######################fileName==" + u64Key);
        let fileName = strUrl.substr(u64Key);
        if (fileName == null) {
            return;
        }

        //console.log("#######################fileName==" + fileName);
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", strUrl, true);
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.OnDownloadCompleted(xhr.response, fileName);
                }
            }
        }.bind(this);
        xhr.send();
    }

    //图片下载成功
    OnDownloadCompleted(response: any, kFileName) {

        if (response == null) {
            return;
        }

        let buffer = response;
        if (cc.sys.isNative) {

            let writePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/'));
            let path = writePath + kFileName;
            this._path = path;
            if (jsb.fileUtils.isFileExist(path)) {
                jsb.fileUtils.removeFile(path);
            }
            jsb.fileUtils.writeDataToFile(new Uint8Array(buffer), path);

            let _ok = true;
            let _iosRet = "true";
            if (path.length > 0) {

                if (cc.sys.os == cc.sys.OS_IOS) {
                    _iosRet = cv.native.invokeSyncFunc(cv.nativeCMD.KEY_SAVE_TO_ABLM, { "path": this._path })
                    if (_iosRet == "false") {
                        _ok = false;
                    }
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    _ok = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "saveTophoto", "(Ljava/lang/String;)Z", this._path);
                }

                if (_ok) {
                    cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips0"), cv.Enum.ToastType.ToastTypeInfo);
                } else {
                    cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips1"), cv.Enum.ToastType.ToastTypeInfo);
                }
            } else {
                cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips2"), cv.Enum.ToastType.ToastTypeInfo);
            }

        }
    }

    on_webCcjsCallback(url: string) {
        console.log("#######################webview url = " + url);
        let index = 0;
        let urls: string = "";
        let http: string = "http:";

        if (url.indexOf("ccjs://https") != -1) {
            index = url.indexOf("ccjs://https");
            urls = url.substr(index + 13, url.length);
            http = "https:";

        } else if (url.indexOf("ccjs://http") != -1) {
            index = url.indexOf("ccjs://http");
            urls = url.substr(index + 12, url.length);
        } else {
            return;
        }

        let strRul = http + urls;
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
            let cmdStr = "{\"cmd\": \"1008\", \"url\":\"%s\"}";
            let _cmd = cv.StringTools.formatC(cmdStr, strRul);
            cv.native.SYwebjsToClient(_cmd);
            return;
        }
    }
}
