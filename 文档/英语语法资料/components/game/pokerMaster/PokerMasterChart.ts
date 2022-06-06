import cv from "../../lobby/cv";
import PokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr"
import { PokerMasterDef } from "./PokerMasterDef";
import cb from "../cowboy/cb";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

/**
 * 扑克大师路单
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class PokerMasterChart extends cc.Component {
    @property(cc.Node) _btn_close: cc.Node = null;
    @property(cc.Sprite) chartbg: cc.Sprite = null;

    @property(cc.Node) layout1: cc.Node = null;
    @property(cc.Node) layout2: cc.Node = null;

    @property(cc.Node) _fortune_txt: cc.Node = null;

    @property(cc.Node) _panelBiaoge1: cc.Node = null;
    @property(cc.Node) _panelBiaoge2: cc.Node = null;

    @property(cc.Node) road_statistics_txt: cc.Node = null;//路单统计
    @property(cc.Node) _fisherman_txt: cc.Node = null;//渔夫
    @property(cc.Node) _shark_txt: cc.Node = null;//鲨鱼

    @property(cc.Prefab) solid: cc.Prefab = null;
    @property(cc.Prefab) hollow: cc.Prefab = null;

    @property(cc.Node) _fisherman_bar: cc.Node = null;
    @property(cc.Node) _shark_bar: cc.Node = null;

    @property(cc.Node) _fisherman_huo: cc.Node = null;
    @property(cc.Node) _shark_huo: cc.Node = null;

    @property(cc.Node) _fisherman_points: cc.Node = null;
    @property(cc.Node) _shark_points: cc.Node = null;

    @property(cc.SpriteAtlas) chart_PLIST: cc.SpriteAtlas = null;
    language_PLIST: cc.SpriteAtlas = null;

    @property index1: number = -1;
    @property index2: number = -1;
    @property index3: number = -1;

    @property _entityDots: cc.Node[] = [];

    @property _hollowDots: Array<Array<cc.Node>> = new Array<Array<cc.Node>>();
    @property(cc.Button) des_btn: cc.Button = null;
    @property(cc.Sprite) des_spr: cc.Sprite = null;

    start(): void {
        cb.addPlist("chart_PLIST", this.chart_PLIST);
        cb.addPlist("language_PLIST", this.language_PLIST);
    }

    protected onLoad(): void {
        this.language_PLIST = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        this._btn_close = cc.find("btn_close", this.chartbg.node);
        this._btn_close.on("click", (event: cc.Event): void => {
            this.node.active = false;
            this.des_spr.node.parent.active = false;
        }, this);

        // this._road_statistics_txt = cc.find("title_txt", this.chartbg.node);
        this._fisherman_txt = cc.find("fisherman_txt", this.layout1);
        this._shark_txt = cc.find("shark_txt", this.layout1);

        if (LANGUAGE_TYPE.zh_CN != cv.config.getCurrentLanguage()) {
            this._fisherman_txt.getComponent(cc.Label).fontSize = this._fisherman_txt.getComponent(cc.Label).fontSize - 6;
            this._shark_txt.getComponent(cc.Label).fontSize = this._shark_txt.getComponent(cc.Label).fontSize - 6;

            cv.resMgr.setSpriteFrame(this.road_statistics_txt, "en_US/game/pokermaster/title_statistics");
        }

        this._fortune_txt = cc.find("fortune_txt", this.layout1);

        this._fisherman_huo = cc.find("fisherman_huo", this.layout1);
        this._shark_huo = cc.find("shark_huo", this.layout1);

        this._fisherman_points = cc.find("fisherman_points", this.layout1);
        this._shark_points = cc.find("shark_points", this.layout1);

        this._fisherman_bar = cc.find("fisherman_progressBar", this.layout1);
        this._shark_bar = cc.find("shark_progressBar", this.layout1);

        this._fisherman_huo = cc.find("fisherman_huo", this.layout1);
        this._shark_huo = cc.find("shark_huo", this.layout1);

        for (let i = 0; i < 6; i++) {
            this._hollowDots[i] = [];
        }

        this.initFortune();
        this.initBiaoge1();
        this.initBiaoge2();

        this.registerMsg();
        this.onChangeLanguage();

        this.des_spr.node.parent.active = false;
        this.node.getChildByName("zhezhao_panel").on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
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
    }

    private updateFortune(): void {
        this._fisherman_points.getComponent(cc.Label).string = cv.StringTools.clientGoldByServer(PokerMasterDataMgr.getPokerMasterRoom().tFortune.fisherFortune).toString();
        this._shark_points.getComponent(cc.Label).string = cv.StringTools.clientGoldByServer(PokerMasterDataMgr.getPokerMasterRoom().tFortune.sharkFortune).toString();

        let res = (PokerMasterDataMgr.getPokerMasterRoom().tFortune.fisherFortune + PokerMasterDataMgr.getPokerMasterRoom().tFortune.sharkFortune);
        let radio = res == 0 ? 0 : (PokerMasterDataMgr.getPokerMasterRoom().tFortune.fisherFortune / (PokerMasterDataMgr.getPokerMasterRoom().tFortune.fisherFortune + PokerMasterDataMgr.getPokerMasterRoom().tFortune.sharkFortune));
        this._fisherman_bar.getComponent(cc.ProgressBar).progress = radio;
        this._shark_bar.getComponent(cc.ProgressBar).progress = res == 0 ? 0 : (1 - radio);

        this._fisherman_huo.setPosition(this._fisherman_bar.getPosition().x - this._fisherman_bar.getContentSize().width / 2 + this._fisherman_bar.getComponent(cc.ProgressBar).progress * this._fisherman_bar.getContentSize().width + 30, this._fisherman_huo.getPosition().y);
        this._fisherman_points.setPosition(this._fisherman_huo.getPosition().x + 30, this._fisherman_points.getPosition().y);

        this._shark_huo.setPosition(this._shark_bar.getPosition().x - this._shark_bar.getContentSize().width / 2 + this._shark_bar.getComponent(cc.ProgressBar).progress * this._shark_bar.getContentSize().width + 30, this._shark_huo.getPosition().y);
        this._shark_points.setPosition(this._shark_huo.getPosition().x + 30, this._shark_points.getPosition().y);
    }

    public onChangeLanguage(): void {
        // this._road_statistics_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_road_statistics");
        this._fisherman_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_fisherman");
        this._shark_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_shark");
        this._fortune_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_fortune");
    }


    private registerMsg(): void {
        let MsgPrefix: string = PokerMasterDef.LocalMsg().MsgPrefix;
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().UPDATE_TREND, this._onTrendUpdate.bind(this), this.node);
    }

    private unregisterMsg(): void {
        let MsgPrefix: string = PokerMasterDef.LocalMsg().MsgPrefix;
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().UPDATE_TREND, this.node);
    }

    public onDestroy() {
        this.unregisterMsg();
    }

    public initFortune(): void {
        this.updateFortune();
    }

    public initBiaoge1(): void {
        this._panelBiaoge1 = cc.find("panelBiaoGe1", this.layout2);
        let sp = cc.find("recordDot", this._panelBiaoge1);
        sp.active = false;
        let pos = sp.getPosition();
        let offset = cc.v2(434 / 8, -326 / 6);
        for (let i = 0; i < 48; i++) {
            let soliditem = cc.instantiate(this.solid);
            this._panelBiaoge1.addChild(soliditem);

            soliditem.setPosition(cc.v2(pos.x + Math.floor(i / 6) * offset.x, pos.y + i % 6 * offset.y));
            this._entityDots.push(soliditem);
        }
    }

    public initBiaoge2(): void {
        this._panelBiaoge2 = cc.find("panelBiaoGe2", this.layout2);
        let sp = cc.find("item_image", this._panelBiaoge2);
        sp.active = false;
        let pos = sp.getPosition();
        let offset = cc.v2(812 / 15, -326 / 6);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 15; j++) {
                let hollowitem = cc.instantiate(this.hollow);
                this._panelBiaoge2.addChild(hollowitem);
                hollowitem.setPosition(cc.v2(pos.x + j * offset.x, pos.y + i * offset.y));
                this._hollowDots[i].push(hollowitem);
            }
        }
    }

    public updateBiaoge1(): void {
        for (let i = 0; i < 48; i++) {
            this._entityDots[i].stopAllActions();
            this._entityDots[i].active = false;
            this._entityDots[i].destroyAllChildren();
            this._entityDots[i].removeAllChildren(true);
        }

        if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData.length <= 48) {
            for (let i = 0; i < PokerMasterDataMgr.getPokerMasterRoom().vTrendData.length; i++) {
                this._entityDots[i].active = true;
                this._entityDots[i].opacity = 255;

                if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i].win == 101) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_13");
                }
                else if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i].win == 102) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_12");
                }
                else if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i].win == 103) {
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_11");
                }

                let px = new cc.Node();
                let sp = px.addComponent(cc.Sprite);
                let size = this._entityDots[i].getContentSize();
                //px.setPosition(cc.v2(size.width / 2, size.height / 2));
                this._entityDots[i].addChild(px);

                if (i + 1 == PokerMasterDataMgr.getPokerMasterRoom().vTrendData.length) {
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

                switch (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i].win_patterns) {
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
            let j = PokerMasterDataMgr.getPokerMasterRoom().vTrendData.length - 48;
            for (let i = 0; i < 48; i++) {
                this._entityDots[i].active = true;
                this._entityDots[i].opacity = 255;
                if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i + j].win == 101) {
                    //红色
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_13");
                }
                else if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i + j].win == 102) {
                    //蓝色
                    this._entityDots[i].getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("chart_PLIST", "chart_12");
                }
                else if (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i + j].win == 103) {
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

                switch (PokerMasterDataMgr.getPokerMasterRoom().vTrendData[i + j].win_patterns) {
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

        let trendLen = PokerMasterDataMgr.getPokerMasterRoom().vTrendRoad.length;
        for (let i = 0; i < trendLen; i++) {
            let row = PokerMasterDataMgr.getPokerMasterRoom().vTrendRoad[i];
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
                    node.getComponent(cc.Label).string = hecount;
                    node.getComponent(cc.Label).fontSize = 24;
                    node.color = cc.color(23, 130, 82);
                    node.setPosition(cc.v2(0, -10));
                    node.opacity = 255;
                    this._hollowDots[i][j].addChild(node);
                }

                if (i == PokerMasterDataMgr.getPokerMasterRoom().iLastRow && j == PokerMasterDataMgr.getPokerMasterRoom().iLastCol) {
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

    private _onTrendUpdate(): void {
        this.setData();
        this.layout1.active = true;
        this.layout2.active = true;
    }

    private setData(): void {
        this.updateFortune();
        this.updateBiaoge1();
        this.updateBiaoge2();
    }

    close(): void {
        this.des_spr.node.parent.active = false;
        this.node.active = false;
    }
}
