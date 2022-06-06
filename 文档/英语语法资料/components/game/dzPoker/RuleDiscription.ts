import cv from "./../../lobby/cv"

const { ccclass, property } = cc._decorator;

@ccclass
export default class RuleDiscription extends cc.Component {

    @property(cc.Node) dzpkBtn: cc.Node = null;
    @property(cc.Node) dpBtn: cc.Node = null;
    @property(cc.Node) bxBtn: cc.Node = null;

    @property(cc.Node) bxRuleView: cc.Node = null;
    @property(cc.Node) dzpkRuleView: cc.Node = null;
    @property(cc.Node) dpRuleView: cc.Node = null;
    public dexhouPosX: number = 0;
    public shortPosX: number = 0;
    public bxPosX:number = 0;

    @property(cc.WebView)
    ruleWebview: cc.WebView = null;

    onLoad() {

        cv.MessageCenter.register("HideWebview_ShowWindows", this.hide.bind(this), this.node);

        cv.StringTools.setLabelString(this.node, "ruleDiscription_medel_panel/title_text", "WordPanel_Text_1");
        cv.StringTools.setLabelString(this.node, "menuList/dzpkBtn/Label", "WordPanel_button_panel_dezhou_button");
        cv.StringTools.setLabelString(this.node, "menuList/dpBtn/Label", "WordPanel_button_panel_short_button");
        cv.StringTools.setLabelString(this.node, "menuList/bxBtn/Label", "WordPanel_button_panel_insurance_button");

        this.dexhouPosX = this.dzpkBtn.getPosition().x;
        this.shortPosX = this.dpBtn.getPosition().x;
        this.bxPosX = this.bxBtn.getPosition().x;
        cv.resMgr.adaptWidget(this.node, true);

        if(this.isShowSiyuWebview()){
            this.ruleWebview.node.removeFromParent(true);
            this.ruleWebview.node.destroy();
            this.ruleWebview = null;
        }
    }
    onDestroy() {
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
    }


    isShowSiyuWebview(){
        if(cv.config.isSiyuType()){
            return true;
        }

        return false;
    }
    hide() {
        this.node.active = false;
        if (this.ruleWebview) {
            this.ruleWebview.node.active = false;
        }
    }
    start() {
        // this.swithView(this.dzpkRuleView, this.dzpkBtn.children[0]);
        // this.switchWebView(cv.config.getStringData("WEB_DEZHOU_RULE", true));
    }

    btnCloseClick(evt) {
        this.show(false);        
        cv.AudioMgr.playButtonSound('close');
        if(this.ruleWebview){
            this.ruleWebview.url = "about:blank";// 打开空白页
        }
        
        this.dzpkBtn.getChildByName("common_button_blue_on").active = true;
        this.dpBtn.getChildByName("common_button_blue_on").active = false;
        this.bxBtn.getChildByName("common_button_blue_on").active = false;
        this.setBtnLabelColor(this.dzpkBtn);
        cv.StatusView.show(true);
    }

    onBtnDzpkClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('tab');
        // this.swithView(this.dzpkRuleView, event.target);
        let curGameId = cv.roomManager.getCurrentGameID();
        if (curGameId == cv.Enum.GameId.Allin) {  
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short)  //AOF短牌
            {
                this.switchWebView(cv.config.getStringData("WEB_AOF_SHORT_RULE", true));
            }else
            {
                this.switchWebView(cv.config.getStringData("WEB_AOF_RULE", true));
            }
        }
        else if (curGameId == cv.Enum.GameId.Plo) {
            this.switchWebView(cv.config.getStringData("WEB_PLO_RULE", true));
        }
        else{
            this.switchWebView(cv.config.getStringData("WEB_DEZHOU_RULE", true));
        }
        this.swithMemu(event);
    };
    onBtnDpClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('tab');
        // this.swithView(this.dpRuleView, event.target);
        let curGameId = cv.roomManager.getCurrentGameID();
        if (curGameId == cv.Enum.GameId.Allin) {  
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short)  //AOF短牌
            {
                this.switchWebView(cv.config.getStringData("WEB_AOF_SHORT_RULE_2", true));
            }else
            {
                this.switchWebView(cv.config.getStringData("WEB_AOF_RULE_2", true));
            }
        }else if (curGameId == cv.Enum.GameId.Plo) {
            this.switchWebView(cv.config.getStringData("WEB_INSURANCE_RULE", true));
        }else{
            this.switchWebView(cv.config.getStringData("WEB_DEZHOU_SHORT_RULE", true));
        }
        this.swithMemu(event);
    };
    onBtnBxClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('tab');
        // this.swithView(this.bxRuleView, event.target);
        this.switchWebView(cv.config.getStringData("WEB_INSURANCE_RULE", true));
        this.swithMemu(event);
    };

    public swithMemu(event: cc.Component.EventHandler): void {
        let bxBtn: cc.Node = cc.find("menuList/bxBtn/common_button_blue_on", this.node);
        bxBtn.active = false;
        let dpBtn: cc.Node = cc.find("menuList/dpBtn/common_button_blue_on", this.node);
        dpBtn.active = false;
        let dzpkBtn: cc.Node = cc.find("menuList/dzpkBtn/common_button_blue_on", this.node);
        dzpkBtn.active = false;
        (event.target).getChildByName("common_button_blue_on").active = true;

        this.setBtnLabelColor(event.target);
    }

    setBtnLabelColor(choiceBtn: cc.Node){
        let _blueColor = cc.color(255, 255, 255);
        cc.find("menuList/bxBtn/Label", this.node).color = _blueColor;
        cc.find("menuList/dpBtn/Label", this.node).color = _blueColor;
        cc.find("menuList/dzpkBtn/Label", this.node).color = _blueColor;
        choiceBtn.getChildByName("Label").color = cc.color(229, 209, 146);
    }

    
    swithView(node: cc.Node, btnNode: cc.Node) {
        this.bxRuleView.active = false;
        this.dzpkRuleView.active = false;
        this.dpRuleView.active = false;
        node.getParent().active = true;
        node.active = true;
    };

    switchWebView(webUrl: string) {
        let url = cv.domainMgr.getServerInfo().web_server + webUrl + "&clientType=" + cv.config.GET_CLIENT_TYPE() + "&language=" + cv.config.getCurrentLanguage();
    
        if(this.isShowSiyuWebview()){
            //私聊部分ios手机，打开规则会重启。是由于webview中打开webview可能导致内存不足。所以改为弹出子webview。
            this.showSiyuWebview(url);
        }else{
            this.ruleWebview.url = url;

        }
    }

    showSiyuWebview(url:string){
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
    }

    showImg(node: cc.Node, isView: boolean) {
        var img = node.getChildByName("img");
        if (img) {
            img.active = isView;
        }
    };

    show(isView: boolean) {
        if(this.ruleWebview){
            this.ruleWebview.node.active = isView;
        }
        this.node.active = isView;
        this.showMailBtn(!isView);
        if (isView) {
            this.showDetailRuleByGameID();
        }
    }

    showDetailRuleByGameID() {
        if (cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE) {
            return;
        }

        let dzpkBtn: cc.Node = cc.find("menuList/dzpkBtn", this.node);
        let dpBtn: cc.Node = cc.find("menuList/dpBtn", this.node);
        let bxBtn: cc.Node = cc.find("menuList/bxBtn", this.node);

        let _txtLabel = dpBtn.getChildByName("Label").getComponent(cc.Label);  //中间按钮的文本
        _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_short_button");

        dzpkBtn.active = false;
        dpBtn.active = true;
        bxBtn.active = false;
        dpBtn.getComponent(cc.Button).enabled = false;

       // dzpkBtn.setPosition(this.dexhouPosX, dzpkBtn.getPosition().y);
       // dpBtn.setPosition(this.shortPosX, dpBtn.getPosition().y);
        let curGameId = cv.roomManager.getCurrentGameID();
        if (curGameId == cv.Enum.GameId.Bet) {                    //必下
            this.switchWebView(cv.config.getStringData("WEB_ZOOM_DEZHOU_BET", true));
            dpBtn.getChildByName("common_button_blue_on").active = true;
            _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_dezhou_betbutton");
            this.setBtnLabelColor(dpBtn);
        }
        else if (cv.roomManager.checkGameIsZoom(curGameId)) {  //急速

            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short)  //急速短牌
            {
                this.switchWebView(cv.config.getStringData("WEB_ZOOM_DEZHOU_SHORT_RULE", true));
                _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_dezhou_zoomShortbutton");
            } else {
                _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_dezhou_zoombutton");
                this.switchWebView(cv.config.getStringData("WEB_ZOOM_DEZHOU_RULE", true));
            }
            dpBtn.getChildByName("common_button_blue_on").active = true;
            this.setBtnLabelColor(dpBtn);

        } else if (curGameId == cv.Enum.GameId.Allin) {  //AOF
            //AOF 两项三等分
            dzpkBtn.active = true;
            dpBtn.getComponent(cc.Button).enabled = true;
            let _txtLabelDzpkBtn = dzpkBtn.getChildByName("Label").getComponent(cc.Label);

            // let offsetX1 = this.shortPosX - this.dexhouPosX;
            // let offsetX2 = this.bxPosX - this.shortPosX;
            
            // dzpkBtn.setPosition(this.dexhouPosX +  offsetX1/2 , dzpkBtn.getPosition().y);
            // dpBtn.setPosition(this.shortPosX+ offsetX2/2, dpBtn.getPosition().y);

            let jiange = cc.winSize.width/3;
            dzpkBtn.setPosition(jiange, dzpkBtn.getPosition().y);
            dpBtn.setPosition(jiange*2, dpBtn.getPosition().y);
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short)  //AOF短牌
            {
                this.switchWebView(cv.config.getStringData("WEB_AOF_SHORT_RULE", true));
                dpBtn.getChildByName("common_button_blue_on").active = false;
                dzpkBtn.getChildByName("common_button_blue_on").active = true;
                _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_Aofshort_button");
                _txtLabelDzpkBtn.string = cv.config.getStringData("WordPanel_button_panel_dezhou_aofShortbutton");

            } else {
                this.switchWebView(cv.config.getStringData("WEB_AOF_RULE", true));
                dpBtn.getChildByName("common_button_blue_on").active = false;
                dzpkBtn.getChildByName("common_button_blue_on").active = true;
                _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_Aofshort_button");
                _txtLabelDzpkBtn.string = cv.config.getStringData("WordPanel_button_panel_dezhou_aofbutton");
            }

            this.setBtnLabelColor(dzpkBtn);
        }
        else if (curGameId == cv.Enum.GameId.Plo) {
            dzpkBtn.active = true;
            dpBtn.getComponent(cc.Button).enabled = true;
            let _txtLabelDzpkBtn = dzpkBtn.getChildByName("Label").getComponent(cc.Label);

            let jiange = cc.winSize.width/3;
            dzpkBtn.setPosition(jiange, dzpkBtn.getPosition().y);
            dpBtn.setPosition(jiange*2, dpBtn.getPosition().y);

            this.switchWebView(cv.config.getStringData("WEB_PLO_RULE", true));
            dpBtn.getChildByName("common_button_blue_on").active = false;
            dzpkBtn.getChildByName("common_button_blue_on").active = true;
            _txtLabel.string = cv.config.getStringData("WordPanel_button_panel_insurance_button");
            _txtLabelDzpkBtn.string = cv.config.getStringData("WordPanel_button_panel_plo_button");

            this.setBtnLabelColor(dzpkBtn);
        }
        else {

            dzpkBtn.active = true;
            bxBtn.active = true;
            dpBtn.getComponent(cc.Button).enabled = true;
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {  //短牌局
                this.switchWebView(cv.config.getStringData("WEB_DEZHOU_SHORT_RULE", true));
                dzpkBtn.getChildByName("common_button_blue_on").active = false;
                dpBtn.getChildByName("common_button_blue_on").active = true;
                bxBtn.getChildByName("common_button_blue_on").active = false;
                this.setBtnLabelColor(dpBtn);
            } else {
                //普通德州
                this.switchWebView(cv.config.getStringData("WEB_DEZHOU_RULE", true));
                this.setBtnLabelColor(dzpkBtn);
            }
        }

        //重置下划线宽度
        let ruleTitleWidth = this.getRuleTileTxtWidth();
        cc.find("menuList/dzpkBtn/common_button_blue_on", this.node).width = ruleTitleWidth[0];
        cc.find("menuList/dpBtn/common_button_blue_on", this.node).width = ruleTitleWidth[1];
        cc.find("menuList/bxBtn/common_button_blue_on", this.node).width = ruleTitleWidth[2];
    }

    showMailBtn(isView: boolean) {
        if (isView) {
            cv.MessageCenter.send("show_mail_entrance");
        }
        else {
            cv.MessageCenter.send("hide_mail_entrance");
        }
    }

    //[德州扑克规则,短牌规则,保险规则]
    getRuleTileTxtWidth(): any {
        let widths = [];
        widths[0] = cv.resMgr.getLabelStringSize(cc.find('menuList/dzpkBtn/Label', this.node).getComponent(cc.Label)).width;
        widths[1] = cv.resMgr.getLabelStringSize(cc.find('menuList/dpBtn/Label', this.node).getComponent(cc.Label)).width;
        widths[2] = cv.resMgr.getLabelStringSize(cc.find('menuList/bxBtn/Label', this.node).getComponent(cc.Label)).width;
        return widths;
    }
}
