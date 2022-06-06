import cv from "../../lobby/cv";
import VideoCowboyManager from "./VideoCowboyManager";
import VideoCowboyScene from "./VideoCowboyScene";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

const { ccclass, property } = cc._decorator;
@ccclass
export class VideoCowboyChart extends cc.Component {
    @property(cc.Node) chartbg: cc.Node = null;
    @property(cc.Node) layout1: cc.Node = null;
    @property(cc.Node) layout2: cc.Node = null;

    @property(cc.Node) _line1: cc.Node = null;
    @property(cc.Node) _line2: cc.Node = null;
    @property(cc.Node) _line3: cc.Node = null;

    @property(cc.Node) _nz_txt: cc.Node = null;
    @property(cc.Node) _xn_txt: cc.Node = null;
    @property(cc.Node) _ping_txt: cc.Node = null;
    @property(cc.Node) _ping_text: cc.Node = null;
    @property(cc.Node) _thlp_txt: cc.Node = null;
    @property(cc.Node) _da_txt: cc.Node = null;
    @property(cc.Node) _hulu_txt: cc.Node = null;
    @property(cc.Node) _ths_txt: cc.Node = null;

    @property(cc.Node) _xiaoniu_text: cc.Node = null;
    @property(cc.Node) _niuzai_text: cc.Node = null;
    @property(cc.Node) _thlp_text: cc.Node = null;
    @property(cc.Node) _duia_text: cc.Node = null;
    @property(cc.Node) _hulu_text: cc.Node = null;
    @property(cc.Node) _jghjths_text: cc.Node = null;

    @property(cc.Node) _gaopai_text: cc.Node = null;
    @property(cc.Node) _gaopai_txt: cc.Node = null;

    @property(cc.Node) _sf_txt: cc.Node = null;
    @property(cc.Node) _hs_txt: cc.Node = null;

    @property(cc.Node) _liangdui_text: cc.Node = null;
    @property(cc.Node) _liangdui_txt: cc.Node = null;

    @property(cc.Node) _sst_text: cc.Node = null;
    @property(cc.Node) _sst_txt: cc.Node = null;

    @property(cc.ProgressBar) _loadingBar1: cc.ProgressBar = null;
    @property(cc.ProgressBar) _loadingBar2: cc.ProgressBar = null;
    @property(cc.ProgressBar) _loadingBar3: cc.ProgressBar = null;

    @property(cc.Node) _red_text: cc.Node = null;
    @property(cc.Node) _green_text: cc.Node = null;
    @property(cc.Node) _lan_text: cc.Node = null;

    @property(cc.Node) _title_img: cc.Node = null;

    @property(cc.Button) _button1: cc.Node = null;
    @property(cc.Button) _button2: cc.Node = null;

    @property(cc.Node) _panelBiaoge1: cc.Node = null;
    @property(cc.Node) _panelBiaoge2: cc.Node = null;
    @property(cc.Node) _panelRecord: cc.Node = null;

    @property(cc.Prefab) dot: cc.Prefab = null;
    @property(cc.Prefab) solid: cc.Prefab = null;
    @property(cc.Prefab) hollow: cc.Prefab = null;

    @property(cc.Node) zhezhao_panel: cc.Node = null;
    @property(cc.Node) back_panel: cc.Node = null;

    @property(cc.Node) jqzs_img: cc.Node = null;
    @property(cc.Node) jrtj_img: cc.Node = null;

    @property _recordDots: cc.Node[] = [];
    @property _oriRecordDotsPos: cc.Vec2[] = [];
    @property _entityDots: cc.Node[] = [];
    @property _hollowDots: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();

    @property(cc.Button) des_btn: cc.Button = null;
    @property(cc.Sprite) des_spr: cc.Sprite = null;

    xn: number = 0;
    nz: number = 0;
    ping: number = 0;
    recordNum: number = 20;

    private _atlas_cb_language: cc.SpriteAtlas = null;
    private _atlas_cb: cc.SpriteAtlas = null;

    protected onLoad(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/videoCowboyPlist/language"));
        this._atlas_cb = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));

        for (let i = 0; i < 6; i++) {
            this._hollowDots[i] = [];
        }

        this.layout1.active = false;
        this.layout2.active = true;

        this._loadingBar1 = cc.find("LoadingBar_1", this.layout1).getComponent(cc.ProgressBar);
        this._loadingBar2 = cc.find("LoadingBar_2", this.layout1).getComponent(cc.ProgressBar);
        this._loadingBar3 = cc.find("LoadingBar_3", this.layout1).getComponent(cc.ProgressBar);

        this._red_text = cc.find("red_text", this.layout1);
        this._green_text = cc.find("green_text", this.layout1);
        this._lan_text = cc.find("lan_text", this.layout1);

        this._title_img = cc.find("title_img", this.chartbg);
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "videocowboy_title_ludan");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb, this.jqzs_img.getComponent(cc.Sprite), "chart_zswz");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb, this.jrtj_img.getComponent(cc.Sprite), "chart_tjwz");


        this._button1 = cc.find("Button_1", this.chartbg);
        this._button2 = cc.find("Button_2", this.chartbg);

        this._line1 = cc.find("Line1", this.layout1.getChildByName("jrtjbg_img"));
        this._line2 = cc.find("Line2", this.layout1.getChildByName("jrtjbg_img"));
        this._line3 = cc.find("Line3", this.layout1.getChildByName("jrtjbg_img"));

        this._nz_txt = cc.find("nz_txt", this._line1);
        this._xn_txt = cc.find("xn_txt", this._line1);
        this._ping_txt = cc.find("ping_num_txt", this._line1);
        this._ping_text = cc.find("ping_txt", this._line1);
        this._thlp_txt = cc.find("thlp_txt", this._line2);
        this._da_txt = cc.find("da_txt", this._line2);

        this._hulu_txt = cc.find("hulu_txt", this._line3);
        this._ths_txt = cc.find("ths_txt", this._line3);

        this._gaopai_text = cc.find("gaopai_num_txt", this._line3);
        this._gaopai_txt = cc.find("gaopai_txt", this._line3);

        this._liangdui_text = cc.find("liangdui_num_txt", this._line3);
        this._liangdui_txt = cc.find("liangdui_txt", this._line3);

        this._sst_text = cc.find("sst_num_txt", this._line3);
        this._sst_txt = cc.find("sst_txt", this._line3);

        this._xiaoniu_text = cc.find("xn_num_txt", this._line1);
        this._niuzai_text = cc.find("nz_num_txt", this._line1);
        this._thlp_text = cc.find("thlp_num_txt", this._line2);
        this._duia_text = cc.find("da_num_txt", this._line2);
        this._hulu_text = cc.find("hulu_num_txt", this._line3);
        this._jghjths_text = cc.find("ths_num_txt", this._line3);

        this._sf_txt = cc.find("sf_txt", this._line1);
        this._hs_txt = cc.find("hs_txt", this._line3);

        this.zhezhao_panel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            let size = cc.winSize;
            let mt = cc.moveTo(0.2, cc.v2(size.width, this.chartbg.getPosition().y));
            this.des_spr.node.parent.active = false;
            event.stopPropagation();
            let callback = cc.callFunc(() => {
                this.node.active = false;
                this.node.getParent().getComponent(VideoCowboyScene).getChartPanel().active = true;
            }, this);
            this.chartbg.runAction(cc.sequence(mt, callback));
        })

        this.chartbg.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            this.des_spr.node.parent.active = false;
        })

        this.back_panel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            let size = cc.winSize;
            let mt = cc.moveTo(0.2, cc.v2(size.width, this.chartbg.getPosition().y));
            this.des_spr.node.parent.active = false;
            let callback = cc.callFunc(() => {
                this.node.active = false;
                this.node.getParent().getComponent(VideoCowboyScene).getChartPanel().active = true;
            }, this);
            this.chartbg.runAction(cc.sequence(mt, callback));
        })

        this._button1.on('click', function () {
            cv.AudioMgr.playButtonSound('tab');
            this._button1.getComponent(cc.Button).Enabled = false;
            this._button2.getComponent(cc.Button).Enabled = true;

            this.layout1.active = false;
            this.setQuestionView(true);
            this.layout2.active = true;
            cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "videocowboy_title_ludan");
        }.bind(this))

        this._button2.on('click', function () {
            cv.AudioMgr.playButtonSound('tab');
            this._button2.getComponent(cc.Button).Enabled = false;
            this._button1.getComponent(cc.Button).Enabled = true;

            this.layout1.active = true;
            this.setQuestionView(false);
            this.layout2.active = false;
            cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this._title_img.getComponent(cc.Sprite), "videocowboy_title_tongji");
        }.bind(this))

        this.des_spr.node.parent.active = false;
        let len = this.node.childrenCount;

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

        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this), this.node);
        cv.MessageCenter.register("cowboy_start_history_move_anim", this.updateReusult.bind(this), this.node);
        //cv.MessageCenter.register("on_update_trend", this.OnTrendUpdate.bind(this), this.node);

        this.onChangeLanguage();

        this.setData();
    }

    updateReusult(): void {
        this.showHistoryMoveAnim();
        cv.videoCowboyNet.RequestTrend();
    }

    moveChart(): void {
        let chartbg = cc.find("Panel", this.node);
        chartbg.stopAllActions();

        let size = cc.winSize;
        let oriX = chartbg.getPosition().x;
        chartbg.setPosition(size.width, chartbg.getPosition().y);

        let bg_img = cc.find("bg_img", chartbg);

        let dis = 0;
        if (cv.config.IS_FULLSCREEN) {
            bg_img.setContentSize(cc.size(722 + cv.viewAdaptive.IPHONEX_OFFSETY, bg_img.getContentSize().height));
            dis = size.width - 722 - cv.viewAdaptive.IPHONEX_OFFSETY;
        }
        else {
            bg_img.setContentSize(cc.size(722, bg_img.getContentSize().height));
            dis = size.width - 722;
        }

        let callback = cc.callFunc(() => {
            this.node.getParent().getComponent(VideoCowboyScene).getChartPanel().active = false;
        }, this);

        if (this.node.active) {
            if (Math.floor(oriX) != Math.floor(dis)) {
                chartbg.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(dis, chartbg.getPosition().y)), cc.delayTime(0.02), callback));
            }
            else {
                chartbg.setPosition(cc.v2(dis, chartbg.getPosition().y));
                chartbg.active = true;
            }
        }
        else {
            this.node.getParent().getComponent(VideoCowboyScene).getChartPanel().active = true;
        }
    }

    OnTrendUpdate(): void {
        this.updateBiaoge1();
        this.updateBiaoge2();
        this.updateData();
        this.calculatePercent();
    }

    initRecord(): void {
        this._panelRecord = cc.find("panelRecord", this.layout2);
        //h5 没有imageview控件 用sprite代替
        let sp = cc.find("recordDot", this._panelRecord);
        sp.active = false;
        let pos = sp.getPosition();
        let offsetX = (this._panelRecord.getContentSize().width - pos.x * 2) / (this.recordNum - 1);
        for (let i = 0; i < this.recordNum + 1; i++) {
            let dotitem = cc.instantiate(this.dot);
            dotitem.setScale(0.625);
            this._panelRecord.addChild(dotitem);
            dotitem.active = true;
            dotitem.setPosition(cc.v2(pos.x + i * offsetX, pos.y));
            this._recordDots.push(dotitem);
            this._oriRecordDotsPos.push(this._recordDots[i].getPosition());
        }
    }

    updateBiaoge1(): void {
        for (let i = 0; i < 48; i++) {
            this._entityDots[i].stopAllActions();
            this._entityDots[i].active = false;
            this._entityDots[i].destroyAllChildren();
            this._entityDots[i].removeAllChildren(true);
        }

        let aa = VideoCowboyManager.getVideoCowboyRoom().trendData.length;

        if (VideoCowboyManager.getVideoCowboyRoom().trendData.length <= 48) {
            for (let i = 0; i < VideoCowboyManager.getVideoCowboyRoom().trendData.length; i++) {
                this._entityDots[i].active = true;
                this._entityDots[i].opacity = 255;

                if (VideoCowboyManager.getVideoCowboyRoom().trendData[i].win == 101) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_13");
                }
                else if (VideoCowboyManager.getVideoCowboyRoom().trendData[i].win == 102) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_12");
                }
                else if (VideoCowboyManager.getVideoCowboyRoom().trendData[i].win == 103) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_11");
                }

                let px = new cc.Node();
                let sp = px.addComponent(cc.Sprite);
                let size = this._entityDots[i].getContentSize();
                //px.setPosition(cc.v2(size.width / 2, size.height / 2));
                this._entityDots[i].addChild(px);

                if (i + 1 == VideoCowboyManager.getVideoCowboyRoom().trendData.length) {
                    let znew = new cc.Node();
                    znew.name = "new";
                    znew.addComponent(cc.Sprite);
                    znew.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_new");
                    znew.setPosition(cc.v2(22, 22));
                    this._entityDots[i].addChild(znew);

                    let callback = cc.callFunc(() => {
                        this._entityDots[i].active = true;
                        this._entityDots[i].opacity = 255;
                    });
                    this._entityDots[i].runAction(cc.sequence(cc.blink(2, 2), callback));
                }

                switch (VideoCowboyManager.getVideoCowboyRoom().trendData[i].win_patterns) {
                    case 1:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_gaopai");
                        break;
                    case 2:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_yidui");
                        break;
                    case 3:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_liangdui");
                        break;
                    case 4:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_santiao");
                        break;
                    case 5:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_shunzi");
                        break;
                    case 6:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_tonghua");
                        break;
                    case 7:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_hulu");
                        break;
                    case 8:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_jingang");
                        break;
                    case 9:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_tonghuashun");
                        break;
                    case 10:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_huangtong");
                        break;
                }
            }
        }
        else {
            let j = VideoCowboyManager.getVideoCowboyRoom().trendData.length - 48;
            for (let i = 0; i < 48; i++) {
                this._entityDots[i].active = true;
                this._entityDots[i].opacity = 255;
                if (VideoCowboyManager.getVideoCowboyRoom().trendData[i + j].win == 101) {
                    //红色
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_13");
                }
                else if (VideoCowboyManager.getVideoCowboyRoom().trendData[i + j].win == 102) {
                    //蓝色
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_12");
                }
                else if (VideoCowboyManager.getVideoCowboyRoom().trendData[i + j].win == 103) {
                    //平局
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_11");
                }

                let size = this._entityDots[i].getContentSize();
                if (i == 47) {
                    let znew = cc.instantiate(this.solid);
                    znew.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_new");
                    znew.setPosition(cc.v2(22, 22));
                    this._entityDots[i].addChild(znew);
                    this._entityDots[i].active = true;

                    let callback = cc.callFunc(() => {
                        this._entityDots[i].active = true;
                        this._entityDots[i].opacity = 255;
                    });

                    this._entityDots[i].runAction(cc.sequence(cc.blink(2, 2), callback));
                }

                let px = cc.instantiate(this.solid);
                //px.setPosition(size.width / 2, size.height / 2);
                this._entityDots[i].addChild(px);

                switch (VideoCowboyManager.getVideoCowboyRoom().trendData[i + j].win_patterns) {
                    case 1:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_gaopai");
                        break;
                    case 2:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_yidui");
                        break;
                    case 3:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_liangdui");
                        break;
                    case 4:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_santiao");
                        break;
                    case 5:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_shunzi");
                        break;
                    case 6:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_tonghua");
                        break;
                    case 7:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_hulu");
                        break;
                    case 8:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_jingang");
                        break;
                    case 9:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_tonghuashun");
                        break;
                    case 10:
                        px.getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("language_PLIST", "chart_huangtong");

                        break;
                }
            }
        }
    }

    updateBiaoge2(): void {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                this._hollowDots[i][j].stopAllActions();
                this._hollowDots[i][j].active = false;

                if (this._hollowDots[i][j].getChildByName("ping") != null) {
                    this._hollowDots[i][j].destroyAllChildren();
                    this._hollowDots[i][j].removeAllChildren(true);
                }
            }
        }

        let trendLen = VideoCowboyManager.getVideoCowboyRoom().trendRoad.length;
        for (let i = 0; i < trendLen; i++) {
            let row = VideoCowboyManager.getVideoCowboyRoom().trendRoad[i];
            let length = row.road_row.length;
            for (let j = 0; j < length; j++) {
                this._hollowDots[i][j].opacity = 255;
                if (row.road_row[j].win == "r") {
                    this._hollowDots[i][j].active = true;
                    this._hollowDots[i][j].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_03");
                }
                else if (row.road_row[j].win == "b") {
                    this._hollowDots[i][j].active = true;
                    this._hollowDots[i][j].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("chart_PLIST", "chart_02");
                }

                if (row.road_row[j].eqc > 0) {
                    let hecount = cv.StringTools.formatC("%d", row.road_row[j].eqc)

                    let node = new cc.Node('text');
                    node.name = "ping";
                    node.addComponent(cc.Label);
                    node.getComponent(cc.Label).string = hecount;
                    node.getComponent(cc.Label).fontSize = 24;
                    node.color = cc.color(23, 130, 82);
                    node.setPosition(cc.v2(0, -10));
                    node.opacity = 255;
                    this._hollowDots[i][j].addChild(node);
                }

                if (i == VideoCowboyManager.getVideoCowboyRoom().lastRow && j == VideoCowboyManager.getVideoCowboyRoom().lastCol) {
                    this._hollowDots[i][j].active = true;
                    let callback = cc.callFunc(() => {
                        this._hollowDots[i][j].active = true;
                        this._hollowDots[i][j].opacity = 255;
                    });
                    this._hollowDots[i][j].runAction(cc.sequence(cc.blink(2, 2), callback));
                }
            }
        }
    }

    hideHistoryMoveAnim(): void {
        for (let i = 0; i < this._recordDots.length; i++) {
            this._recordDots[i].stopAllActions();
            this._recordDots[i].setPosition(this._oriRecordDotsPos[i]);
        }
    }

    showHistoryMoveAnim(): void {
        if (VideoCowboyManager.getVideoCowboyRoom().historyResults.length > 0) {
            let betOption = VideoCowboyManager.getVideoCowboyRoom().historyResults[VideoCowboyManager.getVideoCowboyRoom().historyResults.length - 1];
            let frameName: string = "record_draw";

            if (betOption == VideoCowboyManager.Enum.BetZoneOption.RED_WIN) {
                frameName = "record_red";
            }
            else if (betOption == VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN) {
                frameName = "record_blue";
            }
            this._recordDots[this._recordDots.length - 1].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("game_dznz_PLIST", frameName);

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

    updateHistoryResults(): void {
        this.hideHistoryMoveAnim();

        let historySize = VideoCowboyManager.getVideoCowboyRoom().historyResults.length;
        for (let i = 0; i < this.recordNum; i++) {
            let historyIdx = historySize - i - 1;
            let recordDotIdx = this.recordNum - i - 1;
            if (historyIdx < 0) {
                this._recordDots[recordDotIdx].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("game_dznz_PLIST", "record_draw");
                this._recordDots[recordDotIdx].active = false;
            }
            else {
                let betOption = VideoCowboyManager.getVideoCowboyRoom().historyResults[historyIdx];
                let frameName = "record_draw";

                if (betOption == VideoCowboyManager.Enum.BetZoneOption.RED_WIN) {
                    frameName = "record_red";
                }
                else if (betOption == VideoCowboyManager.Enum.BetZoneOption.BLUE_WIN) {
                    frameName = "record_blue";
                }
                this._recordDots[recordDotIdx].getComponent(cc.Sprite).spriteFrame = VideoCowboyManager.getTextureByName("game_dznz_PLIST", frameName);
                this._recordDots[recordDotIdx].active = true;
            }
        }
    }

    initBiaoge1(): void {
        this._panelBiaoge1 = cc.find("panelBiaoGe1", this.layout2);
        let sp = cc.find("recordDot", this._panelBiaoge1);
        sp.active = false;
        let pos = sp.getPosition();
        let offset = cc.v2(40, -40);
        for (let i = 0; i < 48; i++) {
            let soliditem = cc.instantiate(this.solid);
            soliditem.setScale(0.75);
            this._panelBiaoge1.addChild(soliditem);

            soliditem.setPosition(cc.v2(pos.x + Math.floor(i / 6) * offset.x, pos.y + i % 6 * offset.y));
            this._entityDots.push(soliditem);
        }
    }

    initBiaoge2(): void {
        this._panelBiaoge2 = cc.find("panelBiaoGe2", this.layout2);
        let sp = cc.find("item_image", this._panelBiaoge2);
        sp.active = false;
        let pos = sp.getPosition();
        let offset = cc.v2(40, -40);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                let hollowitem = cc.instantiate(this.hollow);
                hollowitem.setScale(0.75);
                this._panelBiaoge2.addChild(hollowitem);
                hollowitem.setPosition(cc.v2(pos.x + j * offset.x, pos.y + i * offset.y));
                this._hollowDots[i].push(hollowitem);
            }
        }
    }

    setData(): void {
        this.cleanData();
        this.updateData();
        this.calculatePercent();

        this.updateHistoryResults();

        //if (VideoCowboyManager.getVideoCowboyRoom().trendData.length != 48) {
        this.updateBiaoge1();
        //}
        // else {
        //     this._entityDots[47].stopAllActions();
        //     this._entityDots[47].active = true;
        //     let blinkAction = cc.blink(2, 2);
        //     this._entityDots[47].runAction(blinkAction);
        //     this._entityDots[47].opacity = 255;
        // }

        this.updateBiaoge2();
    }


    setData1(): void {
        this.updateBiaoge1();
        this.updateBiaoge2();

        this.updateData();
        this.calculatePercent();

        this.updateHistoryResults();
    }

    calculatePercent(): void {
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
            this._red_text.getComponent(cc.Label).string = cv.StringTools.formatC("%.1f", percentA) + "%";
            this._red_text.active = true;
        }
        else {
            this._red_text.active = false;
        }

        if (percentB > 0) {
            blue = cv.StringTools.formatC("%.1f", percentB);
            this._lan_text.getComponent(cc.Label).string = cv.StringTools.formatC("%.1f", percentB) + "%";
            this._lan_text.active = true;
        }
        else {
            this._lan_text.active = false;
        }

        if (percentC > 0) {
            percentC = 100 - Number(blue) - Number(red);
            this._green_text.getComponent(cc.Label).string = cv.StringTools.formatC("%.1f", percentC) + "%";
            this._green_text.active = true;
        }
        else {
            this._green_text.active = false;
        }

        if (total == 0) {
            this._loadingBar1.node.active = false;
            this._loadingBar2.node.active = false;
            this._loadingBar3.node.active = false;

            this._red_text.active = false;
            this._lan_text.active = false;
            this._green_text.active = false;
        }
        else {
            this._loadingBar1.node.active = true;
            this._loadingBar2.node.active = true;
            this._loadingBar3.node.active = true;

            if (percentA > 0) {
                this._red_text.active = true;
            }
            else {
                this._red_text.active = false;
            }

            if (percentB > 0) {
                this._lan_text.active = true;
            }
            else {
                this._lan_text.active = false;
            }

            if (this.ping == 0) {
                this._green_text.active = false;
            }
            else {
                if (percentC > 0) {
                    this._green_text.active = true;
                }
                else {
                    this._green_text.active = false;
                }
            }
        }

        this._loadingBar1.progress = percentA / 100;
        this._loadingBar2.progress = (percentC + percentA) / 100;
        this._loadingBar3.progress = percentB / 100;

        let x = this._loadingBar1.node.getPosition().x - this._loadingBar1.node.getContentSize().width / 2;
        this._lan_text.setPosition(x + 6.35 * (percentC + percentA) + 6.35 * percentB / 2, this._lan_text.position.y);
        this._red_text.setPosition(x + 6.35 * percentA / 2, this._red_text.position.y);
        this._green_text.setPosition(x + 6.35 * percentA + 6.35 * percentC / 2, this._green_text.position.y);
    }

    cleanData(): void {
        this._ping_txt.getComponent(cc.Label).string = "0";
        this._xiaoniu_text.getComponent(cc.Label).string = "0";
        this._niuzai_text.getComponent(cc.Label).string = "0";
        this._thlp_text.getComponent(cc.Label).string = "0";
        this._duia_text.getComponent(cc.Label).string = "0";
        this._hulu_text.getComponent(cc.Label).string = "0";
        this._jghjths_text.getComponent(cc.Label).string = "0";
    }

    updateData(): void {
        for (let i = 0; i < VideoCowboyManager.getVideoCowboyRoom().dailyStat.length; i++) {
            //line1
            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 101) {
                this._niuzai_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                this.xn = VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count;
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 102) {
                this._xiaoniu_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                this.nz = VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count;
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 103) {
                this._ping_txt.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                this.ping = VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count;
                continue;
            }

            //line2
            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 205) {
                this._duia_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 206) {
                this._thlp_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }
            //line3
            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 301) {
                this._gaopai_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 302) {
                this._liangdui_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 303) {
                this._sst_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 304) {
                this._hulu_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }

            if (VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].betzone_type == 305) {
                this._jghjths_text.getComponent(cc.Label).string = cv.StringTools.numberToString(VideoCowboyManager.getVideoCowboyRoom().dailyStat[i].count);
                continue;
            }
        }
    }

    onChangeLanguage(): void {
        this._nz_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_cow_text");
        this._xn_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_calf_text");
        this._ping_text.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_ping_text");
        this._thlp_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_thlp_text");
        this._da_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_da_text");
        this._hulu_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_hulu_text");
        this._ths_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_ths_text");
        this._sf_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_sf_text");

        let strDesc: string = cv.config.getStringData("Cowboy_hs_text");
        this._hs_txt.getComponent(cc.Label).string = cv.StringTools.calculateAutoWrapString(this._hs_txt, strDesc);

        this._gaopai_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_gpyd_text");
        this._liangdui_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_liangdui_text");
        this._sst_txt.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_sst_text");

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this._gaopai_txt.getComponent(cc.Label).fontSize = 14;
            this._gaopai_text.getComponent(cc.Label).fontSize = 14;
            this._sf_txt.getComponent(cc.Label).fontSize = 14;
            this._hs_txt.getComponent(cc.Label).fontSize = 14;
            this._hs_txt.setContentSize(cc.size(80, 100));

            this._nz_txt.getComponent(cc.Label).fontSize = 14;
            this._niuzai_text.getComponent(cc.Label).fontSize = 14;
            this._xn_txt.getComponent(cc.Label).fontSize = 14;
            this._xiaoniu_text.getComponent(cc.Label).fontSize = 14;
            this._ping_txt.getComponent(cc.Label).fontSize = 14;
            this._ping_text.getComponent(cc.Label).fontSize = 14;
            this._liangdui_txt.getComponent(cc.Label).fontSize = 14;
            this._liangdui_text.getComponent(cc.Label).fontSize = 14;
            this._sst_txt.getComponent(cc.Label).fontSize = 14;
            this._sst_text.getComponent(cc.Label).fontSize = 14;

            this._hulu_txt.getComponent(cc.Label).fontSize = 14;
            this._hulu_text.getComponent(cc.Label).fontSize = 14;

            this._thlp_text.getComponent(cc.Label).fontSize = 14;

            this._ths_txt.getComponent(cc.Label).fontSize = 14;
            this._jghjths_text.getComponent(cc.Label).fontSize = 14;

            let _interval = 6;
            this._niuzai_text.setPosition(this._nz_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._nz_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_cow_text")).width + _interval, this._niuzai_text.getPosition().y);
            this._xiaoniu_text.setPosition(this._xn_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._xn_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_calf_text")).width + _interval, this._niuzai_text.getPosition().y);

            this._ping_txt.setPosition(this._ping_text.getPosition().x + cv.resMgr.getLabelStringSize(this._ping_text.getComponent(cc.Label), cv.config.getStringData("Cowboy_ping_text")).width + _interval, this._ping_text.getPosition().y);
            this._gaopai_text.setPosition(this._gaopai_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._gaopai_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_gpyd_text")).width + _interval, this._gaopai_text.getPosition().y);
            this._liangdui_text.setPosition(this._liangdui_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._liangdui_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_liangdui_text")).width + _interval, this._liangdui_text.getPosition().y);
            this._sst_text.setPosition(this._sst_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._sst_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_sst_text")).width + _interval, this._sst_text.getPosition().y);
            this._hulu_text.setPosition(this._hulu_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._hulu_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_hulu_text")).width + _interval, this._niuzai_text.getPosition().y);
            this._jghjths_text.setPosition(this._ths_txt.getPosition().x + cv.resMgr.getLabelStringSize(this._ths_txt.getComponent(cc.Label), cv.config.getStringData("Cowboy_ths_text")).width + _interval, this._jghjths_text.getPosition().y);
        }
    }

    onDestroy(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("cowboy_start_history_move_anim", this.node);
        cv.MessageCenter.unregister("on_update_trend", this.node);
    }

    setQuestionView(isView: boolean) {
        this.des_spr.node.parent.active = false;
        this.des_btn.node.active = isView;
    }
}
