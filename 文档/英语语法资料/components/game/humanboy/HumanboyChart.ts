import cv from "../../lobby/cv"
import { HashMap } from "../../../common/tools/HashMap";
import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;
import { HumanboyBaseSocket } from "./HumanboyBaseSocket";
import HumanboyDataMgr from "./HumanboyDataMgr";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

enum PageMode {
    PageMode_None = 0,
    PageMode_Spade,
    PageMode_Heart,
    PageMode_Club,
    PageMode_Diamond,
    PageMode_Type
}

const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyChart extends cc.Component {
    //1-4Button
    @property(cc.Node) chartbg: cc.Node = null;
    @property(cc.Button) btn_close: cc.Button = null;
    @property(cc.Button) btn_1: cc.Button = null;
    @property(cc.Button) btn_2: cc.Button = null;
    @property(cc.Button) btn_3: cc.Button = null;
    @property(cc.Button) btn_4: cc.Button = null;
    @property(cc.Button) btn_5: cc.Button = null;

    @property(cc.Node) _layout1: cc.Node = null;
    @property(cc.Node) _layout2: cc.Node = null;
    @property(cc.Node) _layout3: cc.Node = null;
    @property(cc.Node) _layout4: cc.Node = null;
    @property(cc.Node) _layout5: cc.Node = null;

    @property(cc.Node) _panelRecord: cc.Node = null;
    @property(cc.Node) _panelBiaoGe2: cc.Node = null;

    //5-1
    @property(cc.Node) _zhuang_text: cc.Node = null;
    @property(cc.Node) _title_text: cc.Node = null;

    @property(cc.Node) tong_txt: cc.Node = null;
    @property(cc.Node) tong_num_txt: cc.Node = null;

    //5-1
    @property(cc.Node) gaopai_txt: cc.Node = null;
    @property(cc.Node) gaopai_num_txt: cc.Node = null;
    @property(cc.Node) santiao_txt: cc.Node = null;
    @property(cc.Node) santiao_num_txt: cc.Node = null;
    @property(cc.Node) liangdui_txt: cc.Node = null;
    @property(cc.Node) liangdui_num_txt: cc.Node = null;
    @property(cc.Node) yidui_txt: cc.Node = null;
    @property(cc.Node) yidui_num_txt: cc.Node = null;

    //5-2
    @property(cc.Node) shun_txt: cc.Node = null;
    @property(cc.Node) shun_num_txt: cc.Node = null;
    @property(cc.Node) ths_txt: cc.Node = null;
    @property(cc.Node) ths_num_txt: cc.Node = null;

    @property(cc.Node) _zhuang_bg: cc.Node = null;
    @property(cc.Node) title_bg: cc.Node = null;
    @property(cc.Node) _zhuang_img: cc.Node = null;

    @property(cc.Prefab) hollow: cc.Prefab = null;
    @property(cc.Prefab) dot: cc.Prefab = null;


    @property _buttonList: any[] = [];
    @property _layoutList: any[] = [];

    @property _recordNum: number = 20;
    @property _recordDots: Array<Array<any>> = new Array<Array<any>>();
    @property _oriRecordDotsPos: Array<any> = new Array<any>();
    @property _hollowDots: Array<Array<Array<cc.Node>>> = new Array<Array<Array<cc.Node>>>();

    _mapPageMode: HashMap<number, number> = new HashMap();
    _curPage: PageMode = PageMode.PageMode_Spade;

    @property(cc.SpriteAtlas) humanboy_chart_PLIST: cc.SpriteAtlas = null;

    private _atlas_hb_language: cc.SpriteAtlas = null;                                                                          // 百人语言图集

    @property(cc.Button) des_btn: cc.Button = null;
    @property(cc.Sprite) des_spr: cc.Sprite = null;
    
    protected onLoad(): void {
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
        for (var i = 1; i < 6; i++) {
            let str = cv.StringTools.formatC("Layout%d", i);
            let layout = cc.find(str, this.chartbg);
            layout.name = String(i);
            this._layoutList.push(layout);
        }

        this._layout1 = this._layoutList[0];
        this._layout2 = this._layoutList[1];
        this._layout3 = this._layoutList[2];
        this._layout4 = this._layoutList[3];
        this._layout5 = this._layoutList[4];

        this._title_text = cc.find("5/title_bg/title_text", this.chartbg);

        this._zhuang_bg = cc.find("5/zhuang_bg", this.chartbg);
        this._zhuang_text = cc.find("5/zhuang_bg/zhuang_text", this.chartbg);
        this._zhuang_img = cc.find("5/zhuang_img", this.chartbg);

        this.btn_close.node.on('click', function () {
            cv.AudioMgr.playButtonSound('close');
            this.des_spr.node.parent.active = false;
            this.node.active = false;
        }.bind(this));

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
            cv.resMgr.setSpriteFrame(this.des_spr.node, "en_US/game/cowboy/br_des");
        }

        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS1, PageMode.PageMode_Spade);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS2, PageMode.PageMode_Heart);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS3, PageMode.PageMode_Club);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS4, PageMode.PageMode_Diamond);

        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS_LUCK_1, PageMode.PageMode_Type);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS_LUCK_2, PageMode.PageMode_Type);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS_LUCK_3, PageMode.PageMode_Type);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS_LUCK_4, PageMode.PageMode_Type);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS_LUCK_5, PageMode.PageMode_Type);
        this._mapPageMode.add(humanboy_proto.BetZoneOption.POS_LUCK_6, PageMode.PageMode_Type);

        //初始化三维数组
        for (var i: number = 0; i < 4; i++) {
            var arr2: Array<any> = [];
            this._hollowDots[i] = arr2;
            for (var j: number = 0; j < 6; j++) {
                var arr3: Array<any> = [];
                arr2[j] = arr3;
            }
        }

        for (var i: number = 1; i < 6; i++) {
            var arr2: Array<any> = [];
            this._recordDots[i] = arr2;
        }


        for (let i = 1; i < 6; i++) {
            let str = cv.StringTools.formatC("Button_%d", i);
            let btn = cc.find("title_img/" + str, this.chartbg);
            btn.name = String(i);
            this._buttonList.push(btn);
            btn.on('click', (event, customEventData) => {
                cv.AudioMgr.playButtonSound('tab');
                this._curPage = (Number)(event.target.name);
                let xxx = this._layoutList[this._curPage - 1];
                this._panelRecord = cc.find("panelRecord", xxx);
                this.updateData();
            }, this);
        }

        this.cleanData();

        for (let i = 4; i > 0; i--) {
            this.initRecord(i);
            this.initBiaoge2(i);
        }

        this.updateData();

        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this), this.node);
        cv.MessageCenter.register("humanboy_start_history_move_anim", this.updateReusult.bind(this), this.node);
        cv.MessageCenter.register("on_humanboy_trend_notify", this.onMsgGameTrend.bind(this), this.node);

        //两个监听
        this.onChangeLanguage();
    }

    onMsgGameTrend() {
        this.updateChartList(this._curPage);
    }

    showView(option: humanboy_proto.BetZoneOption): void {
        this.node.active = true;
        var self = this;
        this._mapPageMode.forEach(function (key: number, value: number, i: number) {
            if (key == option) {
                self._curPage = value;
            }
        });

        HumanboyBaseSocket.getInstance().requestTrend();
        this.displayPage(self._curPage);
    }

    updateChartList(page: PageMode): void {
        this._curPage = page;

        this.updateData();
    }


    updateReusult() {
        this.showHistoryMoveAnim();
        HumanboyBaseSocket.getInstance().requestTrend();
    }


    displayPage(page: PageMode) {
        switch (page) {
            case PageMode.PageMode_None:
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg.getComponent(cc.Sprite), "humanboy_title_spade");
                this._layout1.active = false;
                this._layout2.active = false;
                this._layout3.active = false;
                this._layout4.active = false;
                this._layout5.active = false;
                this.setQuestionView(false);

                break;
            case PageMode.PageMode_Spade:
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg.getComponent(cc.Sprite), "humanboy_title_spade");
                this._layout1.active = true;
                this._layout2.active = false;
                this._layout3.active = false;
                this._layout4.active = false;
                this._layout5.active = false;
                this.setQuestionView(true);

                break;
            case PageMode.PageMode_Heart:
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg.getComponent(cc.Sprite), "humanboy_title_heart");
                this._layout1.active = false;
                this._layout2.active = true;
                this._layout3.active = false;
                this._layout4.active = false;
                this._layout5.active = false;
                this.setQuestionView(true);

                break;
            case PageMode.PageMode_Club:
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg.getComponent(cc.Sprite), "humanboy_title_club");
                this._layout1.active = false;
                this._layout2.active = false;
                this._layout3.active = true;
                this._layout4.active = false;
                this._layout5.active = false;
                this.setQuestionView(true);

                break;
            case PageMode.PageMode_Diamond:
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg.getComponent(cc.Sprite), "humanboy_title_diamond");
                this._layout1.active = false;
                this._layout2.active = false;
                this._layout3.active = false;
                this._layout4.active = true;
                this._layout5.active = false;
                this.setQuestionView(true);

                break;
            case PageMode.PageMode_Type:
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg.getComponent(cc.Sprite), "humanboy_title_statistics");
                this._layout1.active = false;
                this._layout2.active = false;
                this._layout3.active = false;
                this._layout4.active = false;
                this._layout5.active = true;
                this.setQuestionView(false);
                break;
            default:
                break;
        }
    }

    initRecord(page: PageMode) {
        let index = page - 1;
        this._panelRecord = cc.find("panelRecord", this._layoutList[index]);
        let item = cc.find("recordDot", this._panelRecord);
        item.active = false;

        let pos = item.getPosition();
        let offsetX = 64.64; //(this._panelRecord.getContentSize().width - pos.x * 2) / (this._recordNum - 1)/2;
        this._recordDots[index] = [];
        this._oriRecordDotsPos = [];

        for (let i = 0; i < this._recordNum + 1; i++) {
            let dotitem = cc.instantiate(this.dot);
            dotitem.setContentSize(cc.size(50, 50));
            this._panelRecord.addChild(dotitem);
            dotitem.active = false;
            dotitem.setPosition(cc.v2(pos.x + i * offsetX, pos.y));
            this._recordDots[index].push(dotitem);
            this._oriRecordDotsPos.push(this._recordDots[index][i].getPosition());
        }
    }

    updateBiaoge2(page: PageMode) {
        if (page < 5) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 23; j++) {
                    this._hollowDots[page - 1][i][j].stopAllActions();
                    this._hollowDots[page - 1][i][j].active = false;
                }
            }

            let index = page - 1;
            if (index >= 0 && index < HumanboyDataMgr.getHumanboyRoom().TrendOption.length) {
                for (let i = 0; i < HumanboyDataMgr.getHumanboyRoom().TrendOption[page - 1].road.length; i++) {
                    let row = HumanboyDataMgr.getHumanboyRoom().TrendOption[page - 1].road[i];
                    for (let j = 0; j < row.roadRow.length; j++) {
                        this._hollowDots[page - 1][i][j].destroyAllChildren();
                        this._hollowDots[page - 1][i][j].removeAllChildren(true);
                        if (row.roadRow[j].result < 0) {
                            this._hollowDots[page - 1][i][j].active = true;
                            this._hollowDots[page - 1][i][j].opacity = 255;
                            cv.resMgr.loadSpriteTextureByPlist(this.humanboy_chart_PLIST, this._hollowDots[page - 1][i][j].getComponent(cc.Sprite), "humanboy_hollow_red");
                        }
                        else if (row.roadRow[j].result > 0) {
                            this._hollowDots[page - 1][i][j].active = true;
                            this._hollowDots[page - 1][i][j].opacity = 255;
                            cv.resMgr.loadSpriteTextureByPlist(this.humanboy_chart_PLIST, this._hollowDots[page - 1][i][j].getComponent(cc.Sprite), "humanboy_hollow_gray");
                        }


                        if (row.roadRow[j].eqc > 0) {
                            //平次数
                            let hecount = cv.StringTools.formatC("%d", row.roadRow[j].eqc)

                            let node = new cc.Node('text');
                            node.name = "ping";
                            node.addComponent(cc.Label);
                            node.getComponent(cc.Label).string = hecount;
                            node.getComponent(cc.Label).fontSize = 24;
                            node.color = cc.color(23, 130, 82);
                            node.setPosition(cc.v2(0, -11));

                            this._hollowDots[page - 1][i][j].addChild(node);
                        }


                        if (i == HumanboyDataMgr.getHumanboyRoom().TrendOption[page - 1].lastRow && j == HumanboyDataMgr.getHumanboyRoom().TrendOption[page - 1].lastCol) {
                            if (i == 0 && j == 0) {
                                return;
                            }

                            this._hollowDots[page - 1][i][j].runAction(cc.blink(2, 2));
                        }
                    }
                }
            }
        }
    }

    hideHistoryMoveAnim() {
        for (let i = 0; i < this._recordDots[this._curPage].length; i++) {
            this._recordDots[this._curPage - 1][i].stopAllActions();
            this._recordDots[this._curPage - 1][i].setPosition(this._oriRecordDotsPos[i]);
        }
    }

    showHistoryMoveAnim() {
        if (this._curPage < 5) {
            let index = this._curPage - 1;

            if (HumanboyDataMgr.getHumanboyRoom().lastResult.length > 0) {
                let betOption = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].lastResult[HumanboyDataMgr.getHumanboyRoom().TrendOption[index].lastResult.length - 1]; let frameName = "humanboy_draw";

                if (betOption == humanboy_proto.BetZoneOption.POS_LUCK_1) {
                    frameName = "humanboy_win";
                }

                else if (betOption == humanboy_proto.BetZoneOption.POS_LUCK_2) {
                    frameName = "humanboy_lose";
                }
                cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this._recordDots[index][this._recordDots[index].length - 1].getComponent(cc.Sprite), frameName);
                let moveOffset = this._oriRecordDotsPos[0] - this._oriRecordDotsPos[1];

                for (let i = 0; i < this._recordDots[index].length; i++) {
                    if (i == this._recordDots[index].length - 1) {
                        this.updateHistoryResults();
                    }
                }
            }
        }
    }

    updateHistoryResults() {

        if (this._curPage < 5) {
            this.hideHistoryMoveAnim();

            let index = this._curPage - 1;
            if (index >= 0 && index < HumanboyDataMgr.getHumanboyRoom().TrendOption.length) {
                let historySize = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].lastResult.length;
                for (let i = 0; i < this._recordNum; i++) {
                    let historyIdx = historySize - i - 1;
                    let recordDotIdx = this._recordNum - i - 1;

                    if (historyIdx < 0) {
                        cv.resMgr.loadSpriteTextureByPlist(this.humanboy_chart_PLIST, this._recordDots[index][recordDotIdx].getComponent(cc.Sprite), "humanboy_draw");
                        this._recordDots[index][recordDotIdx].active = false;
                    }
                    else {
                        let betOption = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].lastResult[historyIdx];
                        let frameName = "humanboy_draw";

                        if (betOption < 0) {
                            frameName = "humanboy_win";
                        }
                        else if (betOption > 0) {
                            frameName = "humanboy_lose";
                        }
                        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this._recordDots[index][recordDotIdx].getComponent(cc.Sprite), frameName);
                        this._recordDots[index][recordDotIdx].active = true;
                    }
                }
            }
        }
    }


    initBiaoge2(page: PageMode) {

        this._panelBiaoGe2 = cc.find("panelBiaoGe2", this._layoutList[page - 1]);
        let item = cc.find("item_image", this._panelBiaoGe2);
        let pos = item.getPosition();
        item.active = false;

        let offset = cc.v2(1288/23, -336 / 6);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 23; j++) {
                let hollowitem = cc.instantiate(this.hollow);
                this._panelBiaoGe2.addChild(hollowitem);
                hollowitem.active = false;
                hollowitem.setPosition(cc.v2(pos.x + j * offset.x, pos.y + i * offset.y));
                this._hollowDots[page - 1][i].push(hollowitem);
            }
        }
    }

    cleanData() {
        this.gaopai_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
        this.yidui_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
        this.liangdui_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
        this.santiao_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
        this.shun_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
        this.ths_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
        this.tong_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), 0);
    }


    onChangeLanguage() {
        this.gaopai_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_high_card");
        this.yidui_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_high_pairs");
        this.liangdui_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_two_pairs");
        this.santiao_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_three_of_a_kind");
        this.shun_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_straight_flush");
        this.ths_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_combine");

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this.gaopai_txt.getComponent(cc.Label).fontSize = 30;
            this.gaopai_num_txt.getComponent(cc.Label).fontSize = 30;
            this.yidui_txt.getComponent(cc.Label).fontSize = 30;
            this.yidui_num_txt.getComponent(cc.Label).fontSize = 30;
            this.liangdui_txt.getComponent(cc.Label).fontSize = 30;
            this.liangdui_num_txt.getComponent(cc.Label).fontSize = 30;
            this.santiao_txt.getComponent(cc.Label).fontSize = 30;
            this.santiao_num_txt.getComponent(cc.Label).fontSize = 30;
            this.shun_txt.getComponent(cc.Label).fontSize = 30;
            this.shun_num_txt.getComponent(cc.Label).fontSize = 30;
            this.ths_txt.getComponent(cc.Label).fontSize = 30;
            this.ths_num_txt.getComponent(cc.Label).fontSize = 30;
            this.tong_txt.getComponent(cc.Label).fontSize = 30;
            this.tong_num_txt.getComponent(cc.Label).fontSize = 30;

            let _interval = 6;
            let xx = cv.resMgr.getLabelStringSize(this.gaopai_txt.getComponent(cc.Label), cv.config.getStringData("Humanboy_chart_type_high_card"));

            this.gaopai_num_txt.setPosition(this.gaopai_txt.getPosition().x + xx.width + _interval, this.gaopai_num_txt.getPosition().y);

            let yidui = cv.resMgr.getLabelStringSize(this.yidui_txt.getComponent(cc.Label), cv.config.getStringData("Humanboy_chart_type_high_pairs"));
            this.yidui_num_txt.setPosition(this.yidui_txt.getPosition().x + yidui.width + _interval, this.yidui_num_txt.getPosition().y);

            let liangdui = cv.resMgr.getLabelStringSize(this.liangdui_txt.getComponent(cc.Label), cv.config.getStringData("Humanboy_chart_type_two_pairs"));
            this.liangdui_num_txt.setPosition(this.liangdui_txt.getPosition().x + liangdui.width + _interval, this.liangdui_num_txt.getPosition().y);

            let santiao = cv.resMgr.getLabelStringSize(this.santiao_txt.getComponent(cc.Label), cv.config.getStringData("Humanboy_chart_type_three_of_a_kind"));
            this.santiao_num_txt.setPosition(this.santiao_txt.getPosition().x + santiao.width + _interval, this.santiao_num_txt.getPosition().y);


            this.shun_num_txt.setPosition(this.shun_txt.getPosition().x + cv.resMgr.getLabelStringSize(this.shun_txt.getComponent(cc.Label), cv.config.getStringData("Humanboy_chart_type_straight_flush")).width + _interval, this.shun_num_txt.getPosition().y);

            let ths = cv.resMgr.getLabelStringSize(this.ths_txt.getComponent(cc.Label), cv.config.getStringData("Humanboy_chart_type_combine"));
            this.ths_num_txt.setPosition(this.ths_txt.getPosition().x + ths.width + _interval, this.ths_num_txt.getPosition().y);

            let tong = cv.resMgr.getLabelStringSize(this.tong_txt.getComponent(cc.Label), cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_tongchi")));
            this.tong_num_txt.setPosition(this.tong_txt.getPosition().x + tong.width + _interval, this.tong_num_txt.getPosition().y);
        }
    }

    updateData() {
        this.updatePage(this._curPage);
        this.updateHistoryResults();

        this.updateBiaoge2(this._curPage);
    }

    updatePage(page: PageMode) {
        if (page < 5) {
            let panelStatistics = cc.find("panelStatistics", this._layoutList[page - 1]);
            let _statistics_text = cc.find("statistics_text", panelStatistics);
            let _win_text = cc.find("win_text", panelStatistics);
            let _lose_text = cc.find("lose_text", panelStatistics);
            let _draw_text = cc.find("draw_text", panelStatistics);
            let _win_img = cc.find("win_img", panelStatistics);
            let _lose_img = cc.find("lose_img", panelStatistics);
            let _draw_img = cc.find("draw_img", panelStatistics);

            cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, _win_img.getComponent(cc.Sprite), "humanboy_win");
            cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, _lose_img.getComponent(cc.Sprite), "humanboy_lose");
            cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, _draw_img.getComponent(cc.Sprite), "humanboy_draw");

            let index = page - 1;
            if (index >= 0 && index < HumanboyDataMgr.getHumanboyRoom().TrendOption.length) {
                let statistics = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].stats.capHandNum;
                let win = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].stats.win;
                let lose = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].stats.lose;
                let equal = HumanboyDataMgr.getHumanboyRoom().TrendOption[index].stats.equal;

                _statistics_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_statistics"), statistics);
                _win_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_win"), win);
                _lose_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_lose"), lose);
                _draw_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_draw"), equal);
            }
        }
        else {
            let gaopai = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.gaoPai;
            let yidui = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.yuDui;
            let liangdui = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.lianDui;
            let santiao = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.sanTiao;
            let shunziand1 = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.shunZiAnd1;
            let huluand3 = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.huLuAnd3;
            let winall = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.winAll;
            let loseall = HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.loseAll;

            //let total = winall + loseall;
            this.gaopai_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), gaopai);
            this.yidui_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), yidui);
            this.liangdui_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), liangdui);
            this.santiao_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), santiao);

            this.shun_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), shunziand1);
            this.ths_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), huluand3);

            this._title_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_max"), HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.capHandNum);
            this._zhuang_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_des"), HumanboyDataMgr.getHumanboyRoom().handLevelStatistics.stats.capHandNum);
            this.tong_txt.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_chart_type_tongchi");
            this.tong_num_txt.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_chart_type_ju"), winall);
        }

        this.displayPage(page);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("humanboy_start_history_move_anim", this.node);
        cv.MessageCenter.unregister("on_humanboy_trend_notify", this.node);
    }

    setQuestionView(isView:boolean) {
        this.des_spr.node.parent.active = false;
        this.des_btn.node.active = isView;
    }
}
