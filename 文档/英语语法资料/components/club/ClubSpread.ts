import cv from "../../../Script/components/lobby/cv";
import { ClubData } from "../../../Script/data/club/ClubData";
import { ClubSpreadRule } from "./ClubSpreadRule";

/**
 * 俱乐部推广
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubSpread extends cc.Component {
    @property(cc.Prefab) prefab_clubSpreadRule: cc.Prefab = null;
    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_spread_word: cc.Label = null;
    @property(cc.Label) txt_txt_spread_desc_word: cc.Label = null;
    @property(cc.Label) txt_btn_question: cc.Label = null;
    @property(cc.Label) txt_btn_spread: cc.Label = null;
    @property(cc.Node) img_top_bg: cc.Node = null;

    @property(cc.Label) rtxt_spread_club: cc.Label = null;
    @property(cc.Label) rtxt_spread_agent: cc.Label = null;
    @property(cc.Label) result: cc.Label = null;

    @property(cc.RichText) rtxt_spread_club_oversea: cc.RichText = null;
    @property(cc.RichText) rtxt_spread_agent_oversea: cc.RichText = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_question: cc.Button = null;
    @property(cc.Button) btn_spread: cc.Button = null;

    @property(cc.Node) panel_spread: cc.Node = null;
    @property(cc.Node) over_seas_panel: cc.Node = null;

    @property(cc.Node) panel_web: cc.Node = null;
    @property(cc.Slider) slider: cc.Slider = null;
    @property(cc.Sprite) slider_bg: cc.Sprite = null;
    @property(cc.Sprite) slider_sp: cc.Sprite = null;

    @property(cc.Node) panel_sureTips: cc.Node = null;
    @property(cc.RichText) rtxt_spread_club_tips: cc.RichText = null;
    @property(cc.RichText) rtxt_spread_agent_tips: cc.RichText = null;
    @property(cc.Button) club_invite_btnAdd: cc.Button = null;
    @property(cc.Button) club_invite_btnSub: cc.Button = null;
    @property(cc.Button) sureTips_btnClose: cc.Button = null;
    @property(cc.Button) sureTips_btnSure: cc.Button = null;

    @property(cc.Label) tips_txt_Title: cc.Label = null;
    @property(cc.Label) tips_txt_Content: cc.Label = null;
    @property(cc.Label) tips_txt_Tips2: cc.Label = null;
    @property(cc.Label) tips_txt_BtnSure: cc.Label = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例
    private _lastView: cc.Component = null;                                     // 上次记录的视图组件索引
    private _selfPercent: number = 0;                                           // 记录当前俱乐部个人邀请百分比
    private _lastSelfPercent: number = 0;                                       // 记录上次俱乐部个人邀请百分比
    private _srcPanelWebSize: cc.Size = cc.Size.ZERO;                           // we面板原始大小
    private _tipPosY = 0;
    private _bClubOwner: boolean = false;
    private _path: string = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubSpread._g_prefabInst) ClubSpread._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubSpread._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubSpread._g_prefabInst, true)) {
                ClubSpread._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubSpread._g_prefabInst;
    }

    autoShow(parentNode: cc.Node, lastView: cc.Component, both?: boolean): void {
        let bFirstAdd: boolean = false;
        this.node.active = true;
        // this.node.setPosition(cc.Vec2.ZERO);
        if (parentNode.getAnchorPoint().equals(cc.Vec2.ZERO)) {
            parentNode = cc.director.getScene();
            // this.node.setPosition(cv.action.WIDTH / 2, cv.action.HEIGHT / 2);
        }

        if (!parentNode.getChildByUuid(this.node.uuid)) {
            bFirstAdd = true;
            parentNode.addChild(this.node);
        }

        this._lastView = lastView;

        if (!bFirstAdd) this.updateView();
        if (both) {
            cv.action.showActionBothLeft(this.node, this._lastView.node);
        }
        else {
            cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
        }

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);
    }

    protected onLoad(): void {
        this._srcPanelWebSize = cc.size(this.panel_web.getContentSize());
        this.btn_back.node.on("click", this._onClickBack, this);
        //this.btn_question.node.on("click", this._onClickQuestion, this);     //推广说明屏蔽
        this.btn_spread.node.on("click", this._onClickSpread, this);
        this.slider.node.on("slide", this._onSliderEvent, this);
        this.sureTips_btnClose.node.on("click", this._onClickCloseTips, this);
        this.sureTips_btnSure.node.on("click", this._onClickSureTips, this);
        cv.MessageCenter.register("updataQrcodeUrl", this._onMsgUpdateQrcodeURL.bind(this), this.node);
        cv.MessageCenter.register("update_modify_clubInvitePercent", this._onMsgUpdateModifyClubInvitePercent.bind(this), this.node);
        cv.MessageCenter.register("HideWebview_ShowWindows", this.HandleCheckWebView.bind(this), this.node);
        cv.MessageCenter.register("on_webCcjsCallback", this.on_webCcjsCallback.bind(this), this.node);


        this.panel_spread.active = false;
        this.over_seas_panel.active = false;

        cv.resMgr.adaptWidget(this.node);
        this._tipPosY = this.panel_sureTips.getChildByName("club_sure_Info").y;
    }


    protected start(): void {
        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("updataQrcodeUrl", this.node);
        cv.MessageCenter.unregister("update_modify_clubInvitePercent", this.node);
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
        cv.MessageCenter.unregister("on_webCcjsCallback", this.node);
    }


    protected HandleCheckWebView(isView?: boolean) {
        isView = isView && this.node.active;
        isView = isView == true ? true : false;
        if (this.panel_web) {
            this.panel_web.active = isView;
        }
    }

    updateView(): void {
        this._updateStaticText();
        this._updateView();
    }

    // 更新静态文本
    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("ClubSpread_title_txt");
        this.txt_spread_word.string = cv.config.getStringData("ClubSpread_club_invite_title_text");
        this.txt_txt_spread_desc_word.string = cv.config.getStringData("ClubSpread_club_invite_des");
        this.txt_btn_question.string = cv.config.getStringData("ClubSpreadRule_title_txt");
        this.txt_btn_spread.string = cv.config.getStringData("ClubSpread_club_btn_text");

        this.tips_txt_Title.string = cv.config.getStringData("ClubSpread_club_panel_title");
        this.tips_txt_Content.string = cv.config.getStringData("ClubSpread_club_limit_content");
        this.tips_txt_Tips2.string = cv.config.getStringData("ClubSpread_club_limit_tips");
        this.tips_txt_BtnSure.string = cv.config.getStringData("ClubSpread_club_btn_sure");
    }

    private _updateSliderPercent(): void {
        cv.resMgr.adaptWidget(this.slider_bg.node, false);
        cv.resMgr.adaptWidget(this.slider_sp.node, false);
        this.slider.progress = (100 - this._selfPercent) / 100;
        this.slider_sp.node.width = this.slider.progress * this.slider_bg.node.width;

        let strValue: string = cv.config.getStringData("ClubSpread_club_invite_Slider_club_percent");
        let num = strValue.indexOf(":");
        this.rtxt_spread_club.string = strValue.substr(0, num);
        this.result.string = this._selfPercent + "%";
        strValue = cv.StringTools.formatC(strValue, 100 - this._selfPercent, "%");
        // cv.StringTools.setRichTextString(this.rtxt_spread_club.node, strValue);
        cv.StringTools.setRichTextString(this.rtxt_spread_club_tips.node, strValue);

        if (cv.config.isOverSeas()) {  //海外版
            cv.StringTools.setRichTextString(this.rtxt_spread_club_oversea.node, strValue);
        }

        strValue = cv.config.getStringData("ClubSpread_club_invite_Slider_player_percent");
        num = strValue.indexOf(":");
        this.rtxt_spread_agent.string = strValue.substr(0, num);
        strValue = cv.StringTools.formatC(strValue, this._selfPercent, "%");
        // cv.StringTools.setRichTextString(this.rtxt_spread_agent.node, strValue);
        cv.StringTools.setRichTextString(this.rtxt_spread_agent_tips.node, strValue);

        if (cv.config.isOverSeas()) {  //海外版
            cv.StringTools.setRichTextString(this.rtxt_spread_agent_oversea.node, strValue);
        }

        let bEnable: boolean = this._lastSelfPercent != this._selfPercent;
        this.btn_spread.enabled = bEnable;
        this.btn_spread.interactable = bEnable;

        this._updateSliderBtnState();
    }

    private _updateSliderBtnState() {
        this.club_invite_btnAdd.enabled = this.slider.enabled;
        this.club_invite_btnAdd.interactable = this.slider.enabled;

        this.club_invite_btnSub.enabled = this.slider.enabled;
        this.club_invite_btnSub.interactable = this.slider.enabled;
    }

    private _updateView(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        let bClubCreater: boolean = clubData.club.club_owner === cv.dataHandler.getUserData().u32Uid;

        this._bClubOwner = bClubCreater;

        this._selfPercent = clubData.club.invitation_percent;
        this._lastSelfPercent = this._selfPercent;
        this._updateSliderPercent();

        let state = !clubData.club.setInvitePercentMark;
        this.slider.enabled = state;
        this.btn_spread.node.active = state;

        this.slider.handle.enabled = this.slider.enabled;
        this.slider.handle.interactable = this.slider.handle.enabled;

        this.txt_txt_spread_desc_word.node.active = state;

        if (cv.config.isOverSeas()) {  //海外版
            this.over_seas_panel.active = bClubCreater;
        } else {
            this.panel_spread.active = bClubCreater;
        }

        this.panel_web.height = bClubCreater ? this._srcPanelWebSize.height : this._srcPanelWebSize.height + this.panel_spread.height;

        // 请求获取推广码网页链接
        let reqCode: string = bClubCreater ? clubData.club.invitation_code : clubData.club.InvitationMemberCode;
        cv.httpHandler.requestQrcodeURL(reqCode);
        this._updateWebview();
        this._updateSliderBtnState();
    }

    //设置webview区域
    private _updateWebview() {

        let webHeight = 2138;   //webView默认显示高度
        let _webWidget = this.panel_web.getComponent(cc.Widget);
        _webWidget.isAlignTop = true;
        _webWidget.isAlignBottom = true;

        let widgetBottomValue = 0;
        if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_IPHONEX_SCREEN) {  //IPHONEX 刘海屏处理
            widgetBottomValue = widgetBottomValue - cv.config.FULLSCREEN_OFFSETY;
            if (cv.config.isSiyuType()) {
                widgetBottomValue = widgetBottomValue * 2;
            }
        }
        if (cv.config.isOverSeas()) {  //海外版
            if (this._bClubOwner) {  //俱乐部创建者
                webHeight = 2078;
                let widgetTopValue = cv.config.DESIGN_HEIGHT - webHeight;
                _webWidget.top = widgetTopValue;
                _webWidget.bottom = widgetBottomValue;
                cv.resMgr.adaptWidget(this.panel_web, true);
                this.panel_web.height = cc.winSize.height - widgetTopValue;
            } else {

                this.panel_web.height = webHeight;
                let widgetTopValue = cv.config.DESIGN_HEIGHT - webHeight;
                _webWidget.top = widgetTopValue;
                _webWidget.bottom = widgetBottomValue;
                cv.resMgr.adaptWidget(this.panel_web, true);
            }
        }
        else {

            if (this._bClubOwner) {      //俱乐部创建者
                if (!this.slider.enabled) {
                    webHeight = 1708;
                } else {
                    webHeight = 1478;
                }
                let widgetTopValue = cv.config.DESIGN_HEIGHT - webHeight;
                _webWidget.top = widgetTopValue;
                _webWidget.bottom = widgetBottomValue;
                cv.resMgr.adaptWidget(this.panel_web, true);
                this.panel_web.y = widgetBottomValue;
                this.panel_web.height = cc.winSize.height - widgetTopValue;
            } else {
                let widgetTopValue = cv.config.DESIGN_HEIGHT - webHeight;
                _webWidget.top = widgetTopValue;
                _webWidget.bottom = widgetBottomValue;
                cv.resMgr.adaptWidget(this.panel_web, true);
            }

        }
    }

    //进度条比例加减
    public onClickPercentAddSub(event: cc.Event, CustomEventData) {
        if (CustomEventData == "sub") {  //减 

            if (this._selfPercent <= 45) {
                this._selfPercent += 5;
            } else {
                //  this._selfPercent = 0;
            }
        } else if (CustomEventData == "add") {  //加
            if (this._selfPercent >= 5) {
                this._selfPercent -= 5;
            } else {
                //  this._selfPercent = 50;
            }
        }
        this._updateSliderPercent();
    }

    // 滑条滑动
    private _onSliderEvent(event: cc.Event): void {
        let percent = Math.floor(this.slider.progress * 50);
        this._selfPercent = 50 - (percent - percent % 5);
        this._updateSliderPercent();
    }

    // 返回按钮
    private _onClickBack(event: cc.Event): void {
        this._showWebView("", false);

        // 显示邮件入口按钮, 且解冻显示
        cv.MessageCenter.send("show_mail_entrance");
        cv.AudioMgr.playButtonSound('back_button');
        if (this._lastView) {
            cv.action.showActionBothRight(this._lastView.node, this.node);
            let lastview: any = this._lastView;
            this._lastView = null;
            if ("updateView" in lastview) lastview.updateView();
        }
        // 跟踪用户行为, 发送事件
        let properties = { item: "backButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.referralLink, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.invite, properties);
    }

    // 推广说明按钮
    private _onClickQuestion(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._showWebView("", false);

        let inst: cc.Node = ClubSpreadRule.getSinglePrefabInst(this.prefab_clubSpreadRule);
        let clubSpreadRule: ClubSpreadRule = inst.getComponent(ClubSpreadRule);
        let scene: cc.Scene = cc.director.getScene();
        clubSpreadRule.autoShow(scene, this, true);
    }

    // 推广确定按钮
    private _onClickSpread(event: cc.Event): void {
        this.panel_sureTips.active = true;
        if (cv.config.IS_IPHONEX_SCREEN && cc.sys.os == cc.sys.OS_IOS) {
            this.panel_sureTips.getChildByName("club_sure_Info").y = this._tipPosY - 50; //处理刘海屏
        }
    }

    private _onClickCloseTips(event: cc.Event): void {
        this.panel_sureTips.active = false;
    }

    //保存设置
    private _onClickSureTips(event: cc.Event): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        this._updateWebview();
        cv.worldNet.requestModifyClubInvitePercent(clubData.club.club_id, this._selfPercent);
    }

    // 推广百分比修改成功回调
    private _onMsgUpdateModifyClubInvitePercent(): void {
        this.panel_sureTips.active = false;
        this.updateView();
    }

    // 获取推广网页链接回调
    private _onMsgUpdateQrcodeURL(param: any): void {
        let vURL: string[] = cv.String(param).split("[");
        if (cv.StringTools.getArrayLength(vURL) <= 0) return;

        let strURL: string = vURL[0];
        if (vURL.length >= 2) strURL = vURL[1];

        this._showWebView(strURL, true);
    }

    // 显示webview(动态添加/删除组件)
    private _showWebView(url: string, visible: boolean): void {
        if (visible) {

            let webView: cc.WebView = this.panel_web.getComponent(cc.WebView);
            if (!webView) {
                webView = this.panel_web.addComponent(cc.WebView);
                webView.setJavascriptInterfaceScheme("ccjs");
                webView.setOnJSCallback((webView: cc.WebView, url: string) => {
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
                    } else if (url.indexOf("ccjs://copyCode:")) {
                        this.doCountEventForCopyCode(1, url);
                    } else if (url.indexOf("ccjs://copyCodeUrl:")) {
                        this.doCountEventForCopyCode(2, url);
                    }

                    this.DoDownloadPicture(http + urls);
                });
                webView.node.on("loaded", (webView: cc.WebView) => {
                    console.log("loaded - url = " + url);
                });
                webView.node.on("loading", (webView: cc.WebView) => {
                    console.log("loading - url = " + url);
                });
                webView.node.on("error", (webView: cc.WebView) => {
                    console.log("error - url = " + url);
                });
            }
            webView.url = url;
            this.panel_web.active = true;
        }
        else {
            this.panel_web.removeComponent(cc.WebView);
        }


    }

    //邀请码复制后数据采集接口
    //type:1 复制邀请码
    //type:2 复制链接
    doCountEventForCopyCode(type, url) {
        let index1 = 0;
        let index2 = 0;
        let codeStr: string = "";
        if (type == 1) { //复制code
            //ccjs://copyCode:5JQTD
            index1 = url.indexOf("ccjs://copyCode:");
            codeStr = url.substr(index1 + 16, url.length);
        } else if (type == 2) {  //复制url
            //ccjs://copyCodeUrl:http://34.126.120.190:12000?code=5JQTD&language=zh_CN&v=1621077463
            index1 = url.indexOf("code=");
            index2 = url.indexOf("&");
            codeStr = url.slice(index1 + 5, index2);
        }
        console.log("codeStr ===========" + codeStr);
        if (codeStr.length <= 0) {
            return;
        }

        // "社区邀请码"长度是五位(否则为"个人邀请码")
        let inviteCodeType: string = codeStr.length === 5 ? "agent" : "communityHead";
        let properties = { inviteCode: codeStr, inviteCodeType: inviteCodeType };
        cv.segmentTool.track(cv.Enum.CurrentScreen.referralLink, cv.Enum.segmentEvent.InviteLinkCopied, cv.Enum.Functionality.invite, properties);
    }

    //下载图片
    DoDownloadPicture(strUrl: string) {
        console.log("#######################strUrl==" + strUrl);

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

        let strUrl = http + urls;
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
            let cmdStr = "{\"cmd\": \"1008\", \"url\":\"%s\"}";
            let _cmd = cv.StringTools.formatC(cmdStr, strUrl);
            cv.native.SYwebjsToClient(_cmd);
        }
    }

}
