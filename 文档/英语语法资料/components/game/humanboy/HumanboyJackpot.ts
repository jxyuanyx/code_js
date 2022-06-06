import cv from "../../lobby/cv";
import humanboyDataMgr from "./HumanboyDataMgr";
import { JackPotNumber } from "../dzPoker/JackPotNumber";
import { HumanboyBaseSocket } from "./HumanboyBaseSocket";
import { HumanboyGameScene } from "./HumanboyGameScene";

enum eHumanboyJackpotListViewType {
    JACKPOT_TYPE_NONE = 0,
    JACKPOT_TYPE_JACKPOT,
    JACKPOT_TYPE_RECORD,
    JACKPOT_TYPE_RULE
}

const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyJackpot extends cc.Component {

    @property(cc.Node) pageimg: cc.Node = null;
    @property(cc.Sprite) img_bg: cc.Sprite = null;
    @property(cc.Button) jackpotBtn: cc.Button = null;
    @property(cc.Button) signBtn: cc.Button = null;
    @property(cc.Button) ruleBtn: cc.Button = null;

    @property(cc.Node) jackpotbg: cc.Node = null;
    @property(cc.Node) signbg: cc.Node = null;
    @property(cc.Node) rulebg: cc.Node = null;

    @property(cc.Node) awardType_txt: cc.Node = null;
    @property(cc.Node) awardPercent_txt: cc.Node = null;
    @property(cc.Node) royalFlush_txt: cc.Node = null;
    @property(cc.Node) straight_flush: cc.Node = null;
    @property(cc.Node) four_txt: cc.Node = null;

    @property(cc.Node) bg_img: cc.Node = null;
    @property(cc.Node) title_img: cc.Node = null;

    @property(cc.Node) jackpot_panel: cc.Node = null;
    @property(cc.Node) sign_panel: cc.Node = null;
    @property(cc.Node) rule_panel: cc.Node = null;
    @property(cc.Node) _layout2: cc.Node = null;

    public _JackPotNumberList: JackPotNumber[] = [];
    @property(cc.Prefab) jackNumber: cc.Prefab = null;

    //panel5
    @property(cc.Label) jackPotInfo_text: cc.Label = null;
    @property(cc.Label) bigWinnerName_text: cc.Label = null;
    @property(cc.Label) bigWinnerCard_type_text: cc.Label = null;
    @property(cc.Label) bigWinnerTime_text: cc.Label = null;
    @property(cc.Label) bigWinnerNumber_text: cc.Label = null;

    @property(cc.SpriteAtlas) humanboy_PLIST: cc.SpriteAtlas = null;

    @property(cc.Sprite) img_shield: cc.Sprite = null;
    //rule
    @property(cc.WebView) web: cc.WebView = null;

    //圈
    @property(cc.ProgressBar) circle_0: cc.ProgressBar = null;
    @property(cc.ProgressBar) circle_1: cc.ProgressBar = null;
    @property(cc.ProgressBar) circle_2: cc.ProgressBar = null;

    //百分比
    @property(cc.Node) handLevel_0_text: cc.Node = null;
    @property(cc.Node) handLevel_1_text: cc.Node = null;
    @property(cc.Node) handLevel_2_text: cc.Node = null;

    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    @property(cc.Prefab) item: cc.Prefab = null;

    @property(cc.SpriteAtlas) num_PLIST: cc.SpriteAtlas = null;

    static eHumanboyJackpotListViewType = eHumanboyJackpotListViewType;
    private _OptSelected: number = -1;
    private _viewType: eHumanboyJackpotListViewType = eHumanboyJackpotListViewType.JACKPOT_TYPE_RECORD;
    private _atlas_hb_language: cc.SpriteAtlas = null;                                                                          // 百人语言图集

    protected onLoad(): void {
        //rule
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
        this._layout2 = cc.find("Layout2", this.rule_panel);
        let jackpotstr = "";
        let serverInfo = cv.domainMgr.getServerInfo();
        let web_server = serverInfo.web_server + cv.StringTools.formatC("index.php/user/Article/getRule?title=humanjackpot&clientType=%d&language=%s", cv.config.GET_CLIENT_TYPE(), cv.config.getCurrentLanguage());
        this.web.url = web_server;

        let scene = cc.director.getScene();
        let zorder = cv.Enum.ZORDER_TYPE.ZORDER_TOP;
        // shieldLayer
        this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        this.img_shield.node.on(cc.Node.EventType.TOUCH_END, this._onClickEnd, this);

        if (cv.config.IS_FULLSCREEN) {
            let offsetx = cv.native.isScreenLandscape() ? cv.viewAdaptive.IPHONEX_OFFSETY : 0;
            this.bg_img.setPosition(cc.winSize.width / 2 - this.bg_img.width / 2 - offsetx + this.bg_img.width / 2, this.bg_img.getPosition().y);
        }

        //滚动数字
        let jackpot = cc.find("jackpotImg/panel", this.jackpot_panel);
        let jp_digits_count: number = 7;
        for (let i = 0; i < jp_digits_count; i++) {
            let jackNumberPrefab = cc.instantiate(this.jackNumber);
            jackpot.addChild(jackNumberPrefab);

            let jackNum: JackPotNumber = jackNumberPrefab.getComponent(JackPotNumber);
            jackNum.init(false);
            for (let j = 0; j < 10; ++j) {
                let framename = this.num_PLIST.getSpriteFrame(cv.StringTools.formatC("um_%d", j));
                jackNum.setNumberImg(j, framename);
            }

            jackNum.setGameStyle(0.37);
            let part_w: number = jackNum.root.width * jackNum.root.scaleX;
            let part_h: number = jackNum.root.height * jackNum.root.scaleY;
            let offset: number = (jackpot.width - part_w * jp_digits_count) / (jp_digits_count - 1);
            let x: number = -jackpot.width * jackpot.anchorX + part_w * jackNum.root.anchorX + (part_w + offset) * i;
            let y: number = 0;
            jackNum.node.setPosition(cc.v2(x, y));
            jackNum.hideBg();

            this._JackPotNumberList.push(jackNum);
        }

        this.onClickSelected(2);

        cv.StringTools.setShrinkString(this.jackPotInfo_text.node, cv.config.getStringData("GameJackPot_jackPotSign_panel_Panel_5_jackPotInfo_text"));

        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_img.getComponent(cc.Sprite), "humanboy_jackpot_title");

        this.signbg.getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("GameJackPot_button_panel_jackpotRecord_button");
        this.rulebg.getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("GameJackPot_button_panel_jackpotRule_button");

        this.awardType_txt.getComponent(cc.Label).string = cv.config.getStringData("GameJackPot_jackPot_panel_awardType_txt");
        this.awardPercent_txt.getComponent(cc.Label).string = cv.config.getStringData("GameJackPot_jackPot_panel_awardPercent_txt");

        this.royalFlush_txt.getComponent(cc.Label).string = cv.config.getStringData("M_UITitle122");
        this.straight_flush.getComponent(cc.Label).string = cv.config.getStringData("M_UITitle121");
        this.four_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_game_card_type_four_of_a_kind");

        this.jackpotBtn.node.on('click', function () {
            cv.AudioMgr.playButtonSound('tab');
            this.onClickSelected(1);
        }, this);

        this.signBtn.node.on('click', function () {
            cv.AudioMgr.playButtonSound('tab');
            this.onClickSelected(2);
        }, this);

        this.ruleBtn.node.on('click', function () {
            cv.AudioMgr.playButtonSound('tab');
            this.onClickSelected(3);
        }, this);

        //默认
        this.circle_0.getComponent(cc.ProgressBar).progress = 0.5;
        this.circle_1.getComponent(cc.ProgressBar).progress = 0.2;
        this.circle_2.getComponent(cc.ProgressBar).progress = 0.1;

        HumanboyBaseSocket.getInstance().requestJackpotData(humanboyDataMgr.getHumanboyRoom().tCurRoom.deskType);
        //HumanboyBaseSocket.getInstance().requestRecordData(humanboyDataMgr.getHumanboyRoom().tCurRoom.deskType);

        this.addRegister();
    }

    private addRegister(): void {
        cv.MessageCenter.register("on_humanboy_jackpot_notify", this.onJackpot.bind(this), this.node);
        cv.MessageCenter.register("on_humanboy_record_notify", this.onRecord.bind(this), this.node);

        //少两个监听
    }

    private removeRegister(): void {
        cv.MessageCenter.unregister("on_humanboy_jackpot_notify", this.node);
        cv.MessageCenter.unregister("on_humanboy_record_notify", this.node);
    }

    onDestroy(): void {
        this.removeRegister();
    }

    _onClickEnd(): void {
        //this.node.active = false;
        this.img_shield.node.off(cc.Node.EventType.TOUCH_END, this._onClickEnd, this);
        this.hide(true);
    }

    onJackpot(): void {
        this.updateJackpotNum();
    }

    onRecord(): void {
        if (humanboyDataMgr.getHumanboyRoom().lastAwardData.length > 0) {
            //cv.StringTools.setShrinkString(this.bigWinnerName_text, humanboyDataMgr.getHumanboyRoom().luckyOne.name);
            //cv.StringTools.setShrinkString(this.bigWinnerCard_type_text, cv.config.getStringData(cv.StringTools.formatC("UITitle%d", 112 + humanboyDataMgr.getHumanboyRoom().luckyOne.handLevel)));
            //this.bigWinnerTime_text.string = cv.StringTools.formatTime(humanboyDataMgr.getHumanboyRoom().luckyOne.timeStamp, cv.Enum.eTimeType.Month_Day);
            //this.bigWinnerNumber_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(humanboyDataMgr.getHumanboyRoom().luckyOne.amount));
        }


        let len = humanboyDataMgr.getHumanboyRoom().lastAwardData.length;
        this.scrollView.getComponent(cc.ScrollView).content.destroyAllChildren();
        this.scrollView.getComponent(cc.ScrollView).content.removeAllChildren(true);
        if (len * 85 >= this.scrollView.content.height) {
            this.scrollView.content.height = 745;
        }

        for (let i = 0; i < len; i++) {
            let item = cc.instantiate(this.item);
            if (i == 0) {
                item.getComponent('HumanboyJackpotItem').setFirstData(humanboyDataMgr.getHumanboyRoom().lastAwardData[0]);
                item.setPosition(cc.v2(0, - 35));
            }
            else {
                item.getComponent('HumanboyJackpotItem').setData(humanboyDataMgr.getHumanboyRoom().lastAwardData[i]);
                item.setPosition(cc.v2(0, - (i + 1) * 55));
            }
            this.scrollView.content.addChild(item);
        }

        //shrink
        cv.StringTools.setShrinkString(this.bigWinnerName_text.node, humanboyDataMgr.getHumanboyRoom().luckyOne.name);
        if (humanboyDataMgr.getHumanboyRoom().luckyOne.handLevel >= 8 && humanboyDataMgr.getHumanboyRoom().luckyOne.handLevel <= 10) {
            cv.StringTools.setShrinkString(this.bigWinnerCard_type_text.node, cv.config.getStringData(cv.StringTools.formatC("M_UITitle%d", 112 + humanboyDataMgr.getHumanboyRoom().luckyOne.handLevel)));
        }

        if (humanboyDataMgr.getHumanboyRoom().lastAwardData.length > 0) {
            let numStr = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(humanboyDataMgr.getHumanboyRoom().luckyOne.amount));
            cv.StringTools.setShrinkString(this.jackPotInfo_text.node, cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotPlayerAward"), humanboyDataMgr.getHumanboyRoom().luckyOne.name, numStr), false);
        }
    }

    updateJackpotNum(): void {
        this.circle_0.getComponent(cc.ProgressBar).progress = humanboyDataMgr.getHumanboyRoom().jackpotData.huangTongPer / 100;
        this.circle_1.getComponent(cc.ProgressBar).progress = humanboyDataMgr.getHumanboyRoom().jackpotData.tongHuaShunPer / 100;
        this.circle_2.getComponent(cc.ProgressBar).progress = humanboyDataMgr.getHumanboyRoom().jackpotData.siTiaoPer / 100;

        this.handLevel_0_text.getComponent(cc.Label).string = humanboyDataMgr.getHumanboyRoom().jackpotData.huangTongPer + "%";
        this.handLevel_1_text.getComponent(cc.Label).string = humanboyDataMgr.getHumanboyRoom().jackpotData.tongHuaShunPer + "%";
        this.handLevel_2_text.getComponent(cc.Label).string = humanboyDataMgr.getHumanboyRoom().jackpotData.siTiaoPer + "%";

        let num = humanboyDataMgr.getHumanboyRoom().llJackpotLeftMoney;
        let amount = Math.round(cv.StringTools.serverGoldToShowNumber(num));

        let amounts = cv.StringTools.formatC("%s", amount);
        let alen: number = amounts.length;
        let len: number = this._JackPotNumberList.length;

        for (let i = 0; i < len; ++i) {
            if (i < alen) {
                let index: number = len - 1 - i;
                this._JackPotNumberList[len - i - 1].showNum(Number(amounts[alen - i - 1]), 0.1);
                amounts.substr(1, 2)
            }
            else {
                this._JackPotNumberList[len - i - 1].showNum(0, 0.1);
            }
        }

    }

    setShieldLayerEnabled(enable: boolean): void {
        this.img_shield.getComponent(cc.BlockInputEvents).enabled = enable;
        this.node.active = enable;

        if (enable) {

        }
    }

    private onClickSelected(selected: number): void {
        if (selected == this._OptSelected) return;
        this._OptSelected = selected;


        let eType: eHumanboyJackpotListViewType = this._OptSelected;
        this.setViewType(eType);
    }

    setViewType(eType: eHumanboyJackpotListViewType): void {
        this._viewType = eType;
        this.updateView();
    }

    getViewType(): eHumanboyJackpotListViewType {
        return this._viewType;
    }

    public updateView(): void {
        switch (this._viewType) {
            case eHumanboyJackpotListViewType.JACKPOT_TYPE_JACKPOT:
                {
                    cv.resMgr.loadSpriteTextureByPlist(this.humanboy_PLIST, this.pageimg.getComponent(cc.Sprite), "humanboy_jackpot_opt1");
                    this.jackpot_panel.active = true;
                    this.sign_panel.active = false;
                    this.rule_panel.active = false;

                    cc.find("Label", this.signbg).getComponent(cc.Label).node.color = cc.Color.WHITE;
                    cc.find("Label", this.jackpotbg).getComponent(cc.Label).node.color = new cc.Color(45, 43, 63);
                    cc.find("Label", this.rulebg).getComponent(cc.Label).node.color = cc.Color.WHITE;

                    HumanboyBaseSocket.getInstance().requestJackpotData(humanboyDataMgr.getHumanboyRoom().tCurRoom.deskType);
                }
                break;
            case
                eHumanboyJackpotListViewType.JACKPOT_TYPE_RECORD:
                {
                    cv.resMgr.loadSpriteTextureByPlist(this.humanboy_PLIST, this.pageimg.getComponent(cc.Sprite), "humanboy_jackpot_opt2");
                    this.jackpot_panel.active = false;
                    this.sign_panel.active = true;
                    this.rule_panel.active = false;

                    this.scrollView.scrollToOffset(cc.v2(0, 0));

                    cc.find("Label", this.jackpotbg).getComponent(cc.Label).node.color = cc.Color.WHITE;
                    cc.find("Label", this.signbg).getComponent(cc.Label).node.color = new cc.Color(45, 43, 63);
                    cc.find("Label", this.rulebg).getComponent(cc.Label).node.color = cc.Color.WHITE;
                }
                break;
            case eHumanboyJackpotListViewType.JACKPOT_TYPE_RULE:
                {
                    cv.resMgr.loadSpriteTextureByPlist(this.humanboy_PLIST, this.pageimg.getComponent(cc.Sprite), "humanboy_jackpot_opt3");
                    this.jackpot_panel.active = false;
                    this.sign_panel.active = false;
                    this.rule_panel.active = true;

                    cc.find("Label", this.jackpotbg).getComponent(cc.Label).node.color = cc.Color.WHITE;
                    cc.find("Label", this.rulebg).getComponent(cc.Label).node.color = new cc.Color(45, 43, 63);
                    cc.find("Label", this.signbg).getComponent(cc.Label).node.color = cc.Color.WHITE;
                    cc.find("Label", this.rulebg).getComponent(cc.Label).node.opacity = 255;
                }
                break;

            default:

                break;
        }
    }

    show(bAnim: boolean): void {
        this._autoAnimFunc(true, bAnim);
    }

    hide(bAnim: boolean): void {
        this._autoAnimFunc(false, bAnim);
    }

    private _autoAnimFunc(bOpen: boolean, bAnim: boolean): void {
        this.node.active = true;
        this.img_bg.node.active = true;
        this.img_bg.node.stopAllActions();

        let duration: number = 0.3;
        let seq: cc.Action = null;

        // 全面屏横向偏移量
        let offset_x: number = HumanboyGameScene.g_fullScreenOffset.x;
        if (bOpen) {
            let start_pos: cc.Vec2 = cc.v2(cc.winSize.width/2 + this.img_bg.node.width, cc.winSize.height/2);
            let end_pos: cc.Vec2 = cc.v2(cc.winSize.width/2 - offset_x, cc.winSize.height/2);

            this.img_bg.node.setPosition(start_pos);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_bg.node.setPosition(end_pos);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;

                this.img_shield.node.on(cc.Node.EventType.TOUCH_END, this._onClickEnd, this);
                cv.humanboyNet.requestRecordData(humanboyDataMgr.getHumanboyRoom().tCurRoom.deskType);
            });

            if (bAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, end_pos);
                let ebo: cc.ActionInterval = mt.easing(cc.easeBackOut());
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            let start_pos: cc.Vec2 = cc.v2(cc.winSize.width/2 - offset_x, cc.winSize.height/2);
            let end_pos: cc.Vec2 = cc.v2(cc.winSize.width/2 + this.img_bg.node.width, cc.winSize.height/2);

            this.img_bg.node.setPosition(start_pos);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_bg.node.setPosition(end_pos);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.node.active = false;
            });

            if (bAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, end_pos);
                let ebi: cc.ActionInterval = mt.easing(cc.easeBackIn());
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this.img_bg.node.runAction(seq);
            this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }

    protected start(): void {

    }
}