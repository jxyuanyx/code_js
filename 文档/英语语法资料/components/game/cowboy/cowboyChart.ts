import cv from "../../lobby/cv";
import cb from "../cowboy/cb";
import * as Enums from "../cowboy/CowboyEnum";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

/**
 * 德州牛仔路单
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class cowboyChart extends cc.Component {
    @property(cc.Node) _btn_close: cc.Node = null;
    @property(cc.Sprite) chartbg: cc.Sprite = null;

    @property(cc.Node) layout1: cc.Node = null;
    @property(cc.Node) layout2: cc.Node = null;
    @property(cc.Node) _line1: cc.Node = null;
    @property(cc.Node) _line2: cc.Node = null;
    @property(cc.Node) _line3: cc.Node = null;
    @property(cc.Label) _nz_txt: cc.Label = null;
    @property(cc.Label) _xn_txt: cc.Label = null;
    @property(cc.Label) _ping_txt: cc.Label = null;
    @property(cc.Label) _ping_text: cc.Label = null;
    @property(cc.Label) _thlp_txt: cc.Label = null;
    @property(cc.Label) _da_txt: cc.Label = null;
    @property(cc.Label) _hulu_txt: cc.Label = null;
    @property(cc.Label) _ths_txt: cc.Label = null;

    @property(cc.Label) _xiaoniu_text: cc.Label = null;
    @property(cc.Label) _niuzai_text: cc.Label = null;
    @property(cc.Label) _thlp_text: cc.Label = null;
    @property(cc.Label) _duia_text: cc.Label = null;
    @property(cc.Label) _hulu_text: cc.Label = null;
    @property(cc.Label) _jghjths_text: cc.Label = null;
    @property(cc.Label) _duizi_text: cc.Label = null;
    @property(cc.Label) _duizi_txt: cc.Label = null;
    @property(cc.Label) _gaopai_text: cc.Label = null;
    @property(cc.Label) _gaopai_txt: cc.Label = null;
    @property(cc.Label) _liangdui_text: cc.Label = null;
    @property(cc.Label) _liangdui_txt: cc.Label = null;
    @property(cc.Label) _sst_text: cc.Label = null;
    @property(cc.Label) _sst_txt: cc.Label = null;

    @property(cc.Button) _button1: cc.Button = null;
    @property(cc.Button) _button2: cc.Button = null;

    @property(cc.Node) _title_img: cc.Node = null;

    @property(cc.Label) _ludan_text: cc.Label = null;
    @property(cc.Label) _tongji_text: cc.Label = null;
    @property(cc.Label) _lan_text: cc.Label = null;
    @property(cc.Label) _green_text: cc.Label = null;
    @property(cc.Label) _red_text: cc.Label = null;

    @property(cc.Label) _sf_txt: cc.Label = null;
    @property(cc.Label) _sp_txt: cc.Label = null;
    @property(cc.Label) _hs_txt: cc.Label = null;

    @property(cc.Node) _panelRecord: cc.Node = null;
    @property(cc.Node) _panelBiaoge1: cc.Node = null;
    @property(cc.Node) _panelBiaoge2: cc.Node = null;

    @property(cc.Prefab) solid: cc.Prefab = null;
    @property(cc.Prefab) hollow: cc.Prefab = null;
    @property(cc.Prefab) dot: cc.Prefab = null;

    @property(cc.ProgressBar) _loadingBar1: cc.ProgressBar = null;
    @property(cc.ProgressBar) _loadingBar2: cc.ProgressBar = null;
    @property(cc.ProgressBar) _loadingBar3: cc.ProgressBar = null;

    @property _recordNum: number = 20;
    @property _recordDots: cc.Node[] = [];
    @property _oriRecordDotsPos: cc.Vec2[] = [];
    @property _entityDots: cc.Node[] = [];
    @property _hollowDots: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();

    @property nz: number = 0;
    @property xn: number = 0;
    @property ping: number = 0;
    @property index1: number = -1;
    @property index2: number = -1;
    @property index3: number = -1;

    private _atlas_cb_language: cc.SpriteAtlas = null;                                                                          // 牛仔语言图集
    
    @property(cc.Button) des_btn: cc.Button = null;
    @property(cc.Sprite) des_spr: cc.Sprite = null;

    protected onLoad(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));

        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this.layout1.getChildByName("jqzs_img").getComponent(cc.Sprite), "chart_zswz");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this.layout1.getChildByName("jrtj_img").getComponent(cc.Sprite), "chart_tjwz");

        for (let i = 0; i < 6; i++) {
            this._hollowDots[i] = [];
        }

        this.layout2.active = false;

        this._title_img = cc.find("title_img", this.chartbg.node);

        this._button1 = cc.find("Button_1", this.chartbg.node).getComponent(cc.Button);
        this._button2 = cc.find("Button_2", this.chartbg.node).getComponent(cc.Button);

        this._line1 = cc.find("Line1", this.layout1.getChildByName("jrtjbg_img"));
        this._line2 = cc.find("Line2", this.layout1.getChildByName("jrtjbg_img"));
        this._line3 = cc.find("Line3", this.layout1.getChildByName("jrtjbg_img"));

        this._nz_txt = cc.find("nz_txt", this._line1).getComponent(cc.Label);
        this._xn_txt = cc.find("xn_txt", this._line1).getComponent(cc.Label);
        this._ping_txt = cc.find("ping_num_txt", this._line1).getComponent(cc.Label);
        this._ping_text = cc.find("ping_txt", this._line1).getComponent(cc.Label);
        this._thlp_txt = cc.find("thlp_txt", this._line2).getComponent(cc.Label);
        this._da_txt = cc.find("da_txt", this._line2).getComponent(cc.Label);

        this._hulu_txt = cc.find("hulu_txt", this._line3).getComponent(cc.Label);
        this._ths_txt = cc.find("ths_txt", this._line3).getComponent(cc.Label);

        this._duizi_text = cc.find("duizi_num_txt", this._line2).getComponent(cc.Label);
        this._duizi_txt = cc.find("duizi_txt", this._line2).getComponent(cc.Label);

        this._gaopai_text = cc.find("gaopai_num_txt", this._line3).getComponent(cc.Label);
        this._gaopai_txt = cc.find("gaopai_txt", this._line3).getComponent(cc.Label);

        this._liangdui_text = cc.find("liangdui_num_txt", this._line3).getComponent(cc.Label);
        this._liangdui_txt = cc.find("liangdui_txt", this._line3).getComponent(cc.Label);

        this._sst_text = cc.find("sst_num_txt", this._line3).getComponent(cc.Label);
        this._sst_txt = cc.find("sst_txt", this._line3).getComponent(cc.Label);

        this._xiaoniu_text = cc.find("xn_num_txt", this._line1).getComponent(cc.Label);
        this._niuzai_text = cc.find("nz_num_txt", this._line1).getComponent(cc.Label);
        this._thlp_text = cc.find("thlp_num_txt", this._line2).getComponent(cc.Label);
        this._duia_text = cc.find("da_num_txt", this._line2).getComponent(cc.Label);
        this._hulu_text = cc.find("hulu_num_txt", this._line3).getComponent(cc.Label);
        this._jghjths_text = cc.find("ths_num_txt", this._line3).getComponent(cc.Label);

        this._sf_txt = cc.find("sf_txt", this._line1).getComponent(cc.Label);
        this._sp_txt = cc.find("sp_txt", this._line2).getComponent(cc.Label);
        this._hs_txt = cc.find("hs_txt", this._line3).getComponent(cc.Label);
        //this._ludan_text = cc.find("ludan_text", this.chartbg.node).getComponent(cc.Label);
        //this._tongji_text = cc.find("tongji_text", this.chartbg.node).getComponent(cc.Label);

        this.on_display_page1();

        this._lan_text = cc.find("lan_text", this.layout1).getComponent(cc.Label);
        this._green_text = cc.find("green_text", this.layout1).getComponent(cc.Label);
        this._red_text = cc.find("red_text", this.layout1).getComponent(cc.Label);

        this._loadingBar1 = cc.find("LoadingBar_1", this.layout1).getComponent(cc.ProgressBar);
        this._loadingBar2 = cc.find("LoadingBar_2", this.layout1).getComponent(cc.ProgressBar);
        this._loadingBar3 = cc.find("LoadingBar_3", this.layout1).getComponent(cc.ProgressBar);

        this.layout1.active = false;
        this.layout2.active = true;
        //this._ludan_text.node.color = new cc.Color(255, 255, 255);
        //this._tongji_text.node.color = new cc.Color(0, 60, 47);

        this._button1.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('tab');
            this.onPage1() ;
        }, this);
        this._button2.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('tab');
            this.onPage2() 
        }, this);

        this.des_spr.node.parent.active = false;
        this.node.getChildByName("zhezhao_panel").on(cc.Node.EventType.TOUCH_END, (event: cc.Event)=>{
            this.des_spr.node.parent.active = false;
            event.stopPropagation();
        }, this);
        this.des_spr.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
        }, this);
        this.des_btn.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('tab');
            this.des_spr.node.parent.active = true;
        }, this);

        if (cv.config.getCurrentLanguage() != LANGUAGE_TYPE.zh_CN) {
            cv.resMgr.setSpriteFrame(this.des_spr.node, "en_US/game/cowboy/des_img");
        }
        
        this.initRecord();
        this.initBiaoge1();
        this.initBiaoge2();

        // this._nz_txt.string = cv.config.getStringData("Cowboy_cow_text");
        // this._xn_txt.string = cv.config.getStringData("Cowboy_calf_text");
        // this._thlp_txt.string = cv.config.getStringData("Cowboy_thlp_text");

        this.registerMsg();
        this.setData();

        //this.initLanguage();
        this.onChangeLanguage();

        this._btn_close = cc.find("Button_close", this.chartbg.node);

        this._btn_close.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('close'); 
            this.onClose() ;
        }, this);
    }

    public setData(): void {

        this.updateBiaoge1();
        this.updateBiaoge2();
        this.updateData();
        this.calculatePercent();

        //this.cleanData();
        this.updateHistoryResults();
    }

    public registerMsg(): void {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this), this.node);
        cv.MessageCenter.register("cowboy_start_history_move_anim", this.updateResult.bind(this), this.node);
        //cv.MessageCenter.register("on_update_trend", this.onTrendUpdate.bind(this), this.node);
        cv.MessageCenter.register("on_display_page1", this.on_display_page1.bind(this), this.node);
        cv.MessageCenter.register("on_display_page2", this.on_display_page2.bind(this), this.node);
    }

    private unregisterMsg(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("cowboy_start_history_move_anim", this.node);
        //cv.MessageCenter.unregister("on_update_trend", this.node);
        cv.MessageCenter.unregister("on_display_page1", this.node);
        cv.MessageCenter.unregister("on_display_page2", this.node);
    }

    public onDestroy() {
        this.unregisterMsg();
    }

    public onChangeLanguage() {
        this._nz_txt.string = cv.config.getStringData("Cowboy_cow_text");
        this._xn_txt.string = cv.config.getStringData("Cowboy_calf_text");
        this._ping_text.string = cv.config.getStringData("Cowboy_ping_text");

        this._thlp_txt.string = cv.config.getStringData("Cowboy_thlp_text");

        this._da_txt.string = cv.config.getStringData("Cowboy_da_text");
        this._hulu_txt.string = cv.config.getStringData("Cowboy_hulu_text");
        this._ths_txt.string = cv.config.getStringData("Cowboy_ths_text");

        this._duizi_txt.string = cv.config.getStringData("Cowboy_dz_text");
        this._gaopai_txt.string = cv.config.getStringData("Cowboy_gpyd_text");
        this._liangdui_txt.string = cv.config.getStringData("Cowboy_liangdui_text");
        this._sst_txt.string = cv.config.getStringData("Cowboy_sst_text");

        this._sf_txt.string = cv.config.getStringData("Cowboy_sf_text");
        this._sp_txt.string = cv.config.getStringData("Cowboy_sp_text");
        this._hs_txt.string = cv.config.getStringData("Cowboy_hs_text");

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this._nz_txt.getComponent(cc.Label).fontSize = 24;
            this._xn_txt.getComponent(cc.Label).fontSize = 24;
            this._ping_txt.getComponent(cc.Label).fontSize = 24;
            this._thlp_txt.getComponent(cc.Label).fontSize = 24;
            this._da_txt.getComponent(cc.Label).fontSize = 24;

            this._hulu_txt.getComponent(cc.Label).fontSize = 24;
            this._ths_txt.getComponent(cc.Label).fontSize = 24;
            this._duizi_txt.getComponent(cc.Label).fontSize = 24;
            this._gaopai_txt.getComponent(cc.Label).fontSize = 24;
            this._liangdui_txt.getComponent(cc.Label).fontSize = 24;
            this._sst_txt.getComponent(cc.Label).fontSize = 24;

            this._sf_txt.getComponent(cc.Label).fontSize = 24;
            this._sp_txt.getComponent(cc.Label).fontSize = 24;
            this._hs_txt.getComponent(cc.Label).fontSize = 24;

            this._niuzai_text.getComponent(cc.Label).fontSize = 24;
            this._thlp_text.getComponent(cc.Label).fontSize = 24;
            this._gaopai_text.getComponent(cc.Label).fontSize = 24;
            this._hulu_text.getComponent(cc.Label).fontSize = 24;
            this._xiaoniu_text.getComponent(cc.Label).fontSize = 24;
            this._duizi_text.getComponent(cc.Label).fontSize = 24;
            this._liangdui_text.getComponent(cc.Label).fontSize = 24;
            this._jghjths_text.getComponent(cc.Label).fontSize = 24;
            this._duia_text.getComponent(cc.Label).fontSize = 24;
            this._ping_text.getComponent(cc.Label).fontSize = 24;
            this._sst_text.getComponent(cc.Label).fontSize = 24;

            let interval = 16;
            this._niuzai_text.node.setPosition(this._nz_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._nz_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_cow_text")).width + interval, this._nz_txt.node.getPosition().y);
            this._thlp_text.node.setPosition(this._thlp_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._thlp_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_thlp_text")).width + interval, this._thlp_txt.node.getPosition().y);
            this._gaopai_text.node.setPosition(this._gaopai_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._gaopai_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_gpyd_text")).width + interval, this._gaopai_txt.node.getPosition().y);
            this._hulu_text.node.setPosition(this._hulu_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._hulu_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_hulu_text")).width + interval, this._hulu_txt.node.getPosition().y);
            this._xiaoniu_text.node.setPosition(this._xn_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._xn_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_calf_text")).width + interval, this._xn_txt.node.getPosition().y);
            this._duizi_text.node.setPosition(this._duizi_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._duizi_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_dz_text")).width + interval, this._duizi_txt.node.getPosition().y);
            this._liangdui_text.node.setPosition(this._liangdui_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._liangdui_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_liangdui_text")).width + interval, this._liangdui_txt.node.getPosition().y);
            this._jghjths_text.node.setPosition(this._ths_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._ths_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_ths_text")).width + interval, this._ths_txt.node.getPosition().y);
            this._ping_txt.node.setPosition(this._ping_text.node.getPosition().x + cv.resMgr.getLabelStringSize(this._ping_text.getComponent(cc.Label), cv.config.getStringData("Cowboy_ping_text")).width + interval, this._ping_text.node.getPosition().y);
            this._duia_text.node.setPosition(this._da_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._da_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_da_text")).width + interval, this._da_txt.node.getPosition().y);
            this._sst_text.node.setPosition(this._sst_txt.node.getPosition().x + cv.resMgr.getLabelStringSize(this._sst_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_sst_text")).width + interval, this._sst_txt.node.getPosition().y);
        }
    }

    public on_display_page1() {
        this._button1.enabled = false;
        this.setQuestionView(true);
        this._button2.enabled = true;

        this.layout1.active = false;
        this.layout2.active = true;

        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "chart_ludan");
    }

    public on_display_page2() {
        this._button1.enabled = true;
        this._button2.enabled = false;

        this.layout1.active = true;
        this.setQuestionView(false);
        this.layout2.active = false;

        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "chart_tongji");
    }

    public updateResult() {
        this.showHistoryMoveAnim();
        cv.cowboyNet.RequestTrend();
    }

    public initLanguage(): void {
        // this._nz_txt.string = cv.config.getStringData("Cowboy_cow_text");
        // this._xn_txt.string = cv.config.getStringData("Cowboy_calf_text");
        // this._thlp_txt.string = cv.config.getStringData("Cowboy_thlp_text");
        // this._da_txt.string = cv.config.getStringData("Cowboy_da_text");
        // this._hulu_txt.string = cv.config.getStringData("Cowboy_hulu_text");
        // this._ths_txt.string = cv.config.getStringData("Cowboy_ths_text");
        //this._zoushi_txt.string = cv.config.getStringData("Cowboy_trend_text");
        //this._rule_txt.string = cv.config.getStringData("Cowboy_rule_text");
    }

    public calculatePercent(): void {
        let total = this.nz + this.xn + this.ping;
        let percentA = 100 * (this.xn / total);
        let percentB = 100 * (this.nz / total);
        let percentC = 0;
        let red = "";
        let blue = "";

        if (this.ping == 0) {
            percentC = 0;
            percentA = 100 - percentB;
        }
        else {
            percentC = 100 - percentA - percentB;
        }

        if (percentA > 0) {
            red = cv.StringTools.formatC("%.1f", percentA);
            this._red_text.string = cv.StringTools.formatC("%.1f", percentA) + "%";
            this._red_text.node.active = true;
        }
        else {
            this._red_text.node.active = false;
        }

        if (percentB > 0) {
            blue = cv.StringTools.formatC("%.1f", percentB);
            this._lan_text.string = cv.StringTools.formatC("%.1f", percentB) + "%";
            this._lan_text.node.active = true;
        }
        else {
            this._lan_text.node.active = false;
        }

        if (percentC > 0) {
            percentC = 100 - Number(blue) - Number(red);
            this._green_text.string = cv.StringTools.formatC("%.1f", percentC) + "%";
            this._green_text.node.active = true;
        }
        else {
            this._green_text.node.active = false;
        }

        if (total == 0) {
            this._loadingBar1.node.active = false;
            this._loadingBar2.node.active = false;
            this._loadingBar3.node.active = false;

            this._red_text.node.active = false;
            this._lan_text.node.active = false;
            this._green_text.node.active = false;
        }
        else {
            this._loadingBar1.node.active = true;
            this._loadingBar2.node.active = true;
            this._loadingBar3.node.active = true;

            if (percentA > 0) {
                this._red_text.node.active = true;
            }
            else {
                this._red_text.node.active = false;
            }

            if (percentB > 0) {
                this._lan_text.node.active = true;
            }
            else {
                this._lan_text.node.active = false;
            }

            if (this.ping == 0) {
                this._green_text.node.active = false;
            }
            else {
                if (percentC > 0) {
                    this._green_text.node.active = true;
                }
                else {
                    this._green_text.node.active = false;
                }
            }
        }

        this._loadingBar1.progress = percentA / 100;
        this._loadingBar2.progress = (percentC + percentA) / 100;
        this._loadingBar3.progress = percentB / 100;

        let x = this._loadingBar1.node.getPosition().x - this._loadingBar1.node.getContentSize().width / 2;
        this._lan_text.node.setPosition(x + 12.5 * (percentC + percentA) + 12.5 * percentB / 2, this._lan_text.node.position.y);
        this._red_text.node.setPosition(x + 12.5 * percentA / 2, this._red_text.node.position.y);
        this._green_text.node.setPosition(x + 12.5 * percentA + 12.5 * percentC / 2, this._green_text.node.position.y);

    }

    public onPage1(): void {
        this._button1.enabled = false;
        this._button2.enabled = true;

        this.layout1.active = false;
        this.setQuestionView(true);
        this.layout2.active = true;

        //this._ludan_text.node.color = new cc.Color(255, 255, 255);
        //this._tongji_text.node.color = new cc.Color(0, 60, 47);
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "chart_ludan");
    }

    public onPage2(): void {
        this._button1.enabled = true;
        this._button2.enabled = false;

        this.layout1.active = true;
        this.setQuestionView(false);
        this.layout2.active = false;

        //this._ludan_text.node.color = new cc.Color(0, 60, 47);
        //this._tongji_text.node.color = new cc.Color(255, 255, 255);
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "chart_tongji");
    }

    public initRecord(): void {
        this._panelRecord = cc.find("panelRecord", this.layout2);
        //h5 没有imageview控件 用sprite代替
        let sp = cc.find("recordDot", this._panelRecord);
        sp.active = false;
        let pos = sp.getPosition();
        let offsetX = 64; //(this._panelRecord.getContentSize().width - pos.x * 2) / (this._recordNum - 1);
        for (let i = 0; i < this._recordNum + 1; i++) {
            let dotitem = cc.instantiate(this.dot);
            this._panelRecord.addChild(dotitem);
            dotitem.active = true;
            dotitem.setPosition(cc.v2(pos.x + i * offsetX, pos.y));
            this._recordDots.push(dotitem);
            this._oriRecordDotsPos.push(this._recordDots[i].getPosition());
        }
    }

    public initBiaoge1(): void {
        this._panelBiaoge1 = cc.find("panelBiaoGe1", this.layout2);
        let sp = cc.find("recordDot", this._panelBiaoge1);
        sp.active = false;
        let pos = sp.getPosition();
        let offset = cc.v2(434/8, -326/6);
        for (let i = 0; i < 48; i++) {
            let soliditem = cc.instantiate(this.solid);
            this._panelBiaoge1.addChild(soliditem);

            soliditem.setPosition(cc.v2(pos.x + Math.floor(i / 6) * offset.x, pos.y + i % 6 * offset.y));
            this._entityDots.push(soliditem);
        }
    }

    public resetblink(): void {
        this._entityDots[this.index1].runAction(cc.blink(2, 2));
        this._hollowDots[this.index2][this.index3].runAction(cc.blink(2, 2));
    }

    public updateBiaoge1(): void {
        for (let i = 0; i < 48; i++) {
            this._entityDots[i].stopAllActions();
            this._entityDots[i].active = false;
            this._entityDots[i].destroyAllChildren();
            this._entityDots[i].removeAllChildren(true);
        }

        if (cb.getCowboyRoom().trendData.length <= 48) {
            for (let i = 0; i < cb.getCowboyRoom().trendData.length; i++) {
                this._entityDots[i].active = true;
                this._entityDots[i].opacity = 255;

                if (cb.getCowboyRoom().trendData[i].win == 101) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_13");
                }
                else if (cb.getCowboyRoom().trendData[i].win == 102) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_12");
                }
                else if (cb.getCowboyRoom().trendData[i].win == 103) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_11");
                }

                let px = new cc.Node();
                let sp = px.addComponent(cc.Sprite);
                let size = this._entityDots[i].getContentSize();
                //px.setPosition(cc.v2(size.width / 2, size.height / 2));
                this._entityDots[i].addChild(px);

                if (i + 1 == cb.getCowboyRoom().trendData.length) {
                    let znew = new cc.Node();
                    znew.name = "new";
                    znew.addComponent(cc.Sprite);
                    znew.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_new");
                    znew.setPosition(cc.v2(22, 22));
                    this._entityDots[i].addChild(znew);

                    let callback = cc.callFunc(() => {
                        this._entityDots[i].active = true;
                        this._entityDots[i].opacity = 255;
                    });
                    this.index1 = i;
                    this._entityDots[i].runAction(cc.sequence(cc.blink(2, 2), callback));
                }

                switch (cb.getCowboyRoom().trendData[i].win_patterns) {
                    case 1:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_gaopai");
                        break;
                    case 2:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_yidui");
                        break;
                    case 3:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_liangdui");
                        break;
                    case 4:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_santiao");
                        break;
                    case 5:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_shunzi");
                        break;
                    case 6:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_tonghua");
                        break;
                    case 7:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_hulu");
                        break;
                    case 8:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_jingang");
                        break;
                    case 9:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_tonghuashun");
                        break;
                    case 10:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_huangtong");
                        break;
                }
            }
        }
        else {
            let j = cb.getCowboyRoom().trendData.length - 48;
            for (let i = 0; i < 48; i++) {
                this._entityDots[i].active = true;
                this._entityDots[i].opacity = 255;
                if (cb.getCowboyRoom().trendData[i + j].win == 101) {
                    //红色
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_13");
                }
                else if (cb.getCowboyRoom().trendData[i + j].win == 102) {
                    //蓝色
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_12");
                }
                else if (cb.getCowboyRoom().trendData[i + j].win == 103) {
                    //平局
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_11");
                }

                let size = this._entityDots[i].getContentSize();
                if (i == 47) {
                    let znew = cc.instantiate(this.solid);
                    znew.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_new");
                    znew.setPosition(cc.v2(22, 22));
                    this._entityDots[i].addChild(znew);
                    this._entityDots[i].active = true;

                    let callback = cc.callFunc(() => {
                        this._entityDots[i].active = true;
                        this._entityDots[i].opacity = 255;
                    });
                    this.index1 = i;
                    this._entityDots[i].runAction(cc.sequence(cc.blink(2, 2), callback));
                }

                let px = cc.instantiate(this.solid);
                //px.setPosition(size.width / 2, size.height / 2);
                this._entityDots[i].addChild(px);

                switch (cb.getCowboyRoom().trendData[i + j].win_patterns) {
                    case 1:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_gaopai");
                        break;
                    case 2:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_yidui");
                        break;
                    case 3:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_liangdui");
                        break;
                    case 4:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_santiao");
                        break;
                    case 5:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_shunzi");
                        break;
                    case 6:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_tonghua");
                        break;
                    case 7:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_hulu");
                        break;
                    case 8:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_jingang");
                        break;
                    case 9:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_tonghuashun");
                        break;
                    case 10:
                        px.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("language_PLIST", "chart_huangtong");

                        break;
                }
            }
        }
    }

    public initBiaoge2(): void {
        this._panelBiaoge2 = cc.find("panelBiaoGe2", this.layout2);
        let sp = cc.find("item_image", this._panelBiaoge2);
        sp.active = false;
        let pos = sp.getPosition();
        let offset = cc.v2(812/15, -326/6);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 15; j++) {
                let hollowitem = cc.instantiate(this.hollow);
                this._panelBiaoge2.addChild(hollowitem);
                hollowitem.setPosition(cc.v2(pos.x + j * offset.x, pos.y + i * offset.y));
                this._hollowDots[i].push(hollowitem);
            }
        }
    }

    public updateBiaoge2(): void {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 15; j++) {
                this._hollowDots[i][j].stopAllActions();
                this._hollowDots[i][j].active = false;

                if (this._hollowDots[i][j].getChildByName("ping") != null) {
                    this._hollowDots[i][j].destroyAllChildren();
                    this._hollowDots[i][j].removeAllChildren(true);
                }
            }
        }

        let trendLen = cb.getCowboyRoom().trendRoad.length;
        for (let i = 0; i < trendLen; i++) {
            let row = cb.getCowboyRoom().trendRoad[i];
            let length = row.road_row.length;
            for (let j = 0; j < length; j++) {
                this._hollowDots[i][j].opacity = 255;
                if (row.road_row[j].win == "r") {
                    this._hollowDots[i][j].active = true;
                    this._hollowDots[i][j].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_03");
                }
                else if (row.road_row[j].win == "b") {
                    this._hollowDots[i][j].active = true;
                    this._hollowDots[i][j].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_02");
                }

                if (row.road_row[j].eqc > 0) {
                    let hecount = cv.StringTools.formatC("%d", row.road_row[j].eqc)

                    let node = new cc.Node('text');
                    node.name = "ping";
                    node.addComponent(cc.Label);
                    node.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                    node.getComponent(cc.Label).verticalAlign = cc.Label.VerticalAlign.CENTER;
                    node.getComponent(cc.Label).string = hecount;
                    node.getComponent(cc.Label).fontSize = 24;
                    node.color = cc.color(23, 130, 82);
                    node.setPosition(cc.v2(0, 0));
                    node.opacity = 255;
                    this._hollowDots[i][j].addChild(node);
                }

                if (i == cb.getCowboyRoom().lastRow && j == cb.getCowboyRoom().lastCol) {
                    this._hollowDots[i][j].active = true;
                    let callback = cc.callFunc(() => {
                        this._hollowDots[i][j].active = true;
                        this._hollowDots[i][j].opacity = 255;
                    });
                    this.index2 = i;
                    this.index3 = j;
                    this._hollowDots[i][j].runAction(cc.sequence(cc.blink(2, 2), callback));
                }
            }
        }
    }

    public updateData(): void {
        for (let i = 0; i < cb.getCowboyRoom().dailyStat.length; i++) {
            //line1
            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 101) {
                this._niuzai_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                this.xn = cb.getCowboyRoom().dailyStat[i].count;
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 102) {
                this._xiaoniu_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                this.nz = cb.getCowboyRoom().dailyStat[i].count;
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 103) {
                this._ping_txt.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                this.ping = cb.getCowboyRoom().dailyStat[i].count;
                continue;
            }

            //line2
            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 203) {
                this._duizi_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 205) {
                this._duia_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 206) {
                this._thlp_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }
            //line3
            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 301) {
                this._gaopai_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 302) {
                this._liangdui_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 303) {
                this._sst_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 304) {
                this._hulu_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (cb.getCowboyRoom().dailyStat[i].betzone_type == 305) {
                this._jghjths_text.string = cv.StringTools.numberToString(cb.getCowboyRoom().dailyStat[i].count);
                continue;
            }
        }
    }

    public cleanData(): void {
        this._ping_txt.string = "0";
        this._xiaoniu_text.string = "0";
        this._niuzai_text.string = "0";
        this._thlp_text.string = "0";
        this._duia_text.string = "0";
        this._hulu_text.string = "0";
        this._jghjths_text.string = "0";
    }

    public hideHistoryMoveAnim(): void {
        for (let i = 0; i < this._recordDots.length; i++) {
            this._recordDots[i].stopAllActions();
            this._recordDots[i].setPosition(this._oriRecordDotsPos[i]);
        }
    }

    public showHistoryMoveAnim(): void {
        if (cb.getCowboyRoom().historyResults.length > 0) {
            let betOption = cb.getCowboyRoom().historyResults[cb.getCowboyRoom().historyResults.length - 1];
            let frameName: string = "record_draw";

            if (betOption == Enums.BetZoneOption.RED_WIN) {
                frameName = "record_red";
            }
            else if (betOption == Enums.BetZoneOption.BLUE_WIN) {
                frameName = "record_blue";
            }
            this._recordDots[this._recordDots.length - 1].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("game_dznz_PLIST", frameName);

            //位移动画
            let moveOffset = cc.v2(this._oriRecordDotsPos[0].x - this._oriRecordDotsPos[1].x, this._oriRecordDotsPos[0].y - this._oriRecordDotsPos[1].y);
            for (let i = 0; i < this._recordDots.length; i++) {
                this._recordDots[i].runAction(cc.sequence(cc.moveBy(0.3, moveOffset), cc.callFunc(function () {
                    if (i == this._recordDots.length - 1) {
                        this.updateHistoryResults();
                    }
                }, this, null)));
            }
        }
    }

    public updateHistoryResults(): void {
        this.hideHistoryMoveAnim();

        let historySize = cb.getCowboyRoom().historyResults.length;
        for (let i = 0; i < this._recordNum; i++) {
            let historyIdx = historySize - i - 1;
            let recordDotIdx = this._recordNum - i - 1;
            if (historyIdx < 0) {
                this._recordDots[recordDotIdx].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("game_dznz_PLIST", "record_draw");
                this._recordDots[recordDotIdx].active = false;
            }
            else {
                let betOption = cb.getCowboyRoom().historyResults[historyIdx];
                let frameName = "record_draw";

                if (betOption == Enums.BetZoneOption.RED_WIN) {
                    frameName = "record_red";
                }
                else if (betOption == Enums.BetZoneOption.BLUE_WIN) {
                    frameName = "record_blue";
                }
                this._recordDots[recordDotIdx].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("game_dznz_PLIST", frameName);
                this._recordDots[recordDotIdx].active = true;
            }
        }
    }

    public onClose(): void {
        this.node.active = false;
        this.des_spr.node.parent.active = false;
    }

    setQuestionView(isView:boolean) {
        this.des_spr.node.parent.active = false;
        this.des_btn.node.active = isView;
    }
}
