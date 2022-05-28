import cv from "../../lobby/cv";
import PokerMasterDataMgr from "./PokerMasterDataMgr";
import { pokermaster_proto } from "../../../../Script/common/pb/pokermaster";
import { PokerMasterDef } from "./PokerMasterDef";
import CowboyCard from "../cowboy/CowboyCard";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

/**
 *  投注回顾逻辑
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class PokerMasterReview extends cc.Component {
    @property(cc.Node) layout1: cc.Node = null;
    @property(cc.Node) layout2: cc.Node = null;
    @property(cc.Node) layout3: cc.Node = null;
    @property(cc.Node) bottom: cc.Node = null;

    @property(cc.Node) _totalbet_txt: cc.Node = null;
    @property(cc.Node) _totalbet_text: cc.Node = null;
    @property(cc.Node) _profit_txt: cc.Node = null;

    @property(cc.Node) card0: cc.Node = null;
    @property(cc.Node) card1: cc.Node = null;
    @property(cc.Node) card2: cc.Node = null;
    @property(cc.Node) card3: cc.Node = null;
    @property(cc.Node) card4: cc.Node = null;
    @property(cc.Node) card5: cc.Node = null;
    @property(cc.Node) card6: cc.Node = null;
    @property(cc.Node) card7: cc.Node = null;
    @property(cc.Node) card8: cc.Node = null;

    @property(cc.Node) panel_public_card: cc.Node = null;
    @property(cc.Node) panel_fisherman_card: cc.Node = null;
    @property(cc.Node) panel_shark_card: cc.Node = null;

    @property(cc.Node) _first_bet_txt: cc.Node = null;
    @property(cc.Node) _fisherman_txt: cc.Node = null;
    @property(cc.Node) _fisherman_odds_txt: cc.Node = null;
    @property(cc.Node) _fisherman_bet_txt: cc.Node = null;
    @property(cc.Node) _fisherman_num: cc.Node = null;

    @property(cc.Node) _shark_bet_txt: cc.Node = null;
    @property(cc.Node) _shark_odds_txt: cc.Node = null;
    @property(cc.Node) _shark_txt: cc.Node = null;
    @property(cc.Node) _shark_num: cc.Node = null;

    @property(cc.Node) _second_bet_txt: cc.Node = null;

    @property(cc.Button) btn_first: cc.Button = null;
    @property(cc.Button) btn_last: cc.Button = null;
    @property(cc.Button) btn_before: cc.Button = null;
    @property(cc.Button) btn_next: cc.Button = null;

    @property(cc.Sprite) title_spr: cc.Sprite = null;
    paixing_txt_arr: cc.Node[] = [];
    paixing_peilv_arr: cc.Label[] = [];
    paixing_xiazhu_arr: cc.Label[] = [];
    paixing_win_arr: cc.Label[] = [];

    @property(cc.Node) panel_main: cc.Node = null;                              // 主面板
    @property(cc.Label) txt_paixing: cc.Label = null;                           // 牌型
    @property(cc.Label) txt_page_0: cc.Label = null;                            // 页数
    @property(cc.Label) txt_page_1: cc.Label = null;                            // 页数
    private _curPage: number = 19;                                              // 当前页（0-19）
    private _vFishermanCard: CowboyCard[] = [];                                 // 渔夫
    private _vPubsCard: CowboyCard[] = [];                                      // 公共牌
    private _vSharkCard: CowboyCard[] = [];                                     // 鲨鱼

    private _strCardFacePath: Readonly<string> = "zh_CN/game/cowboy/card_type_0/";									            // 牌正面资源路径
    private _strCardBackPath: Readonly<string> = "zh_CN/game/pokermaster/card_type_0/";								            // 牌背面资源路径
    private loseColor: cc.Color = new cc.Color(153, 153, 153);
    private winColor: cc.Color = new cc.Color(255, 106, 7);
    private startPos: cc.Vec2 = cc.v2(0, 0);

    @property(cc.Label) shark_bet_txt_0: cc.Label = null;
    @property(cc.Label) fisherman_bet_txt_0: cc.Label = null;
    @property(cc.Label) fisherman_odds_txt_0: cc.Label = null;
    @property(cc.Label) shark_odds_txt_0: cc.Label = null;
    @property(cc.Label) profit_txt_0: cc.Label = null;

    NUM_0: number = 6;
    NUM_1: number = 4;
    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        let isCH = LANGUAGE_TYPE.zh_CN == cv.config.getCurrentLanguage();
        this._totalbet_text = cc.find("totalbet_text", this.layout2);
        this._totalbet_txt = cc.find("totalbet_txt", this.layout2);
        this._profit_txt = cc.find("profit_txt", this.layout2);
        this._profit_txt.color = new cc.Color(255, 106, 7);
        this.profit_txt_0.node.color = new cc.Color(255, 106, 7);

        this._first_bet_txt = cc.find("first_bet_txt", this.layout2);
        this._fisherman_txt = cc.find("fisherman_txt", this.layout2);
        this._fisherman_bet_txt = cc.find("fisherman_bet_txt", this.layout2);
        this._fisherman_odds_txt = cc.find("fisherman_odds_txt", this.layout2);

        // this._equal_txt = cc.find("equal_txt", this.layout2);
        // this._equal_bet_txt = cc.find("equal_bet_txt", this.layout2);
        // this._equal_bet_text = cc.find("equal_bet_text", this.layout2);
        // this._equal_odds_txt = cc.find("equal_odds_txt", this.layout2);
        // this._equal_odds_text = cc.find("equal_odds_text", this.layout2);

        this._shark_txt = cc.find("shark_txt", this.layout2);
        this._shark_bet_txt = cc.find("shark_bet_txt", this.layout2);
        this._shark_odds_txt = cc.find("shark_odds_txt", this.layout2);

        this._second_bet_txt = cc.find("second_bet_txt", this.layout2);

        for (let i = 0; i < 5; i++) {
            let temp_txt = this.layout2.getChildByName("paixin_txt_" + i);
            let temp_num_0 = this.layout2.getChildByName(cv.StringTools.formatC("paixin_num_%d_0", i));
            let temp_num_1 = this.layout2.getChildByName(cv.StringTools.formatC("paixin_num_%d_1", i));
            let temp_num_2 = this.layout2.getChildByName(cv.StringTools.formatC("paixin_num_%d_2", i));
            if (!isCH) {
                temp_txt.getComponent(cc.Label).fontSize = temp_txt.getComponent(cc.Label).fontSize - this.NUM_1;
            }
            this.paixing_txt_arr.push(temp_txt);
            this.paixing_peilv_arr.push(temp_num_0.getComponent(cc.Label));
            this.paixing_xiazhu_arr.push(temp_num_1.getComponent(cc.Label));
            this.paixing_win_arr.push(temp_num_2.getComponent(cc.Label));
        }

        this._fisherman_num = cc.find("fisherman_num", this.layout2);
        this._shark_num = cc.find("shark_num", this.layout2);
        // this._equal_num = cc.find("equal_num", this.layout2);

        let vFishermanChildrens: Array<cc.Node> = this.panel_fisherman_card.children;
        for (let i = 0; i < vFishermanChildrens.length; ++i) {
            let left_card: cc.Node = this.panel_fisherman_card.getChildByName(`card_${i}`);
            if (left_card) {
                let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                card.ResetFromNode(left_card);
                card.SetFace(false);
                this._vFishermanCard.push(card);
            }
        }

        let vPubChildrens: Array<cc.Node> = this.panel_public_card.children;
        for (let i = 0; i < vPubChildrens.length; ++i) {
            let pub_card: cc.Node = this.panel_public_card.getChildByName(`card_${i}`);
            if (pub_card) {
                let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                card.ResetFromNode(pub_card);
                card.SetFace(false);
                this._vPubsCard.push(card);
            }
        }

        let vSharkChildrens: Array<cc.Node> = this.panel_shark_card.children;
        for (let i = 0; i < vSharkChildrens.length; ++i) {
            let shark_card: cc.Node = this.panel_shark_card.getChildByName(`card_${i}`);
            if (shark_card) {
                let card: CowboyCard = CowboyCard.create(this._strCardFacePath, this._strCardBackPath);
                card.ResetFromNode(shark_card);
                card.SetFace(false);
                this._vSharkCard.push(card);
            }
        }

        if (cv.config.IS_FULLSCREEN) {
            let offsetx = cv.native.isScreenLandscape() ? cv.viewAdaptive.IPHONEX_OFFSETY : 0;
            this.panel_main.setPosition(cc.winSize.width / 2 - this.panel_main.width / 2 - offsetx + this.panel_main.width / 2, this.panel_main.getPosition().y);
        }

        this.startPos = this.node.getPosition();
        // 翻页
        this.btn_first.node.on("click", (event: cc.Event): void => { this.firstPage(); }, this);
        this.btn_last.node.on("click", (event: cc.Event): void => { this.lastPage(); }, this);
        this.btn_before.node.on("click", (event: cc.Event): void => { this.beforePage(); }, this);
        this.btn_next.node.on("click", (event: cc.Event): void => { this.nextPage(); }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.autoHide, this);

        cv.resMgr.setSpriteFrame(this.title_spr.node, cv.config.getLanguagePath("game/pokermaster/review_title"));

        if (!isCH) {
            this.txt_paixing.fontSize = this.txt_paixing.fontSize - this.NUM_0;
            let labArr = [this._totalbet_txt, this._profit_txt, this._first_bet_txt,
            this._fisherman_txt, this._fisherman_bet_txt, this._fisherman_odds_txt,
            this._shark_txt, this._shark_bet_txt, this._shark_odds_txt,
            this._second_bet_txt];
            let labLen = labArr.length;
            for (let i = 0; i < labLen; ++i) {
                let lab = labArr[i].getComponent(cc.Label);
                if (lab.fontSize > 24) {
                    lab.fontSize = lab.fontSize - this.NUM_0;
                }
                else {
                    lab.fontSize = lab.fontSize - this.NUM_1;
                }
            }
        }

        this.registerMsg();
        this.onChangeLanguage();
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    public OnAppEnterForeground() {
        if (!this || !this.node || !cc.isValid(this.node, true)) return;
        cv.pokerMasterNet.reqBetReview();
    }

    private onChangeLanguage(): void {
        let totalBetS = cv.resMgr.getLabelStringSize(this._totalbet_txt.getComponent(cc.Label), cv.config.getStringData("PokerMaster_totalbet_txt"));
        this._profit_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_profit_txt");

        this._fisherman_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_fishermanwin_txt");
        this._shark_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_shark_txt");
        // this._equal_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_equal_txt");

        let fisherman_betS = cv.resMgr.getLabelStringSize(this._fisherman_bet_txt.getComponent(cc.Label), cv.config.getStringData("PokerMaster_bet_txt"));
        this._shark_bet_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_bet_txt");
        // this._equal_bet_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_bet_txt");

        let fisherman_oddsS = cv.resMgr.getLabelStringSize(this._fisherman_odds_txt.getComponent(cc.Label), cv.config.getStringData("PokerMaster_odds_txt"));
        this._shark_odds_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_odds_txt");
        // this._equal_odds_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_odds_txt");

        for (let i = 0; i < 5; i++) {
            this.paixing_txt_arr[i].getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_paixin_txt_" + i);
        }

        this._first_bet_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_first_bet_txt");
        this._second_bet_txt.getComponent(cc.Label).string = cv.config.getStringData("PokerMaster_second_bet_txt");

        this._totalbet_text.setPosition(this._totalbet_txt.x + totalBetS.width, this._totalbet_txt.y);
        this.fisherman_bet_txt_0.node.setPosition(this._fisherman_bet_txt.x + fisherman_betS.width, this._fisherman_bet_txt.y);
        this.fisherman_odds_txt_0.node.setPosition(this._fisherman_odds_txt.x + fisherman_oddsS.width, this._fisherman_odds_txt.y);
    }

    private registerMsg(): void {
        let MsgPrefix: string = PokerMasterDef.LocalMsg().MsgPrefix;
        cv.MessageCenter.register(MsgPrefix + PokerMasterDef.LocalMsg().UPDATE_REVIEW, this._onUpdateReview.bind(this), this.node);
    }

    private unregisterMsg(): void {
        let MsgPrefix: string = PokerMasterDef.LocalMsg().MsgPrefix;
        cv.MessageCenter.unregister(MsgPrefix + PokerMasterDef.LocalMsg().UPDATE_REVIEW, this.node);
    }

    public onDestroy() {
        this.unregisterMsg();
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    /**
    * 前一页
    */
    private beforePage(): void {
        let page = ((this._curPage - 1) >= 0) ? (this._curPage - 1) : this._curPage;
        this.updatePage(page);
    }

    /**
     * 后一页
     */
    private nextPage(): void {
        let page = ((this._curPage + 1) < PokerMasterDataMgr.getPokerMasterRoom().vBetReview.length) ? (this._curPage + 1) : this._curPage;
        this.updatePage(page);
    }

    /**
     * 第一页
     */
    private firstPage(): void {
        this.updatePage(0);
    }

    /**
     * 最后一页
     */
    private lastPage(): void {
        this.updatePage(PokerMasterDataMgr.getPokerMasterRoom().vBetReview.length - 1);
    }

    /**
     * 显示
     */
    public autoShow(zorder?: number, bAnim: boolean = true): void {
        this.node.active = true;
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        cv.action.removeShieldLayer(cc.director.getScene(), `shieldLayer-showAction_${this.node.name}`);
        if (bAnim) {
            cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
        }

        //打开请求
        cv.pokerMasterNet.reqBetReview();
    }

    /**
     * 隐藏
     */
    public autoHide(bAnim: boolean = true): void {
        if (this.node.active) {
            this.node.stopAllActions();
            cv.action.removeShieldLayer(cc.director.getScene(), `shieldLayer-showAction_${this.node.name}`);
            this.node.setPosition(this.startPos);
            if (bAnim) {
                cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT, cv.action.delay_type.NORMAL);
            }
            else {
                this.node.active = false;
            }
        }
    }

    private _onUpdateReview(): void {
        this._curPage = PokerMasterDataMgr.getPokerMasterRoom().vBetReview.length;

        this.updatePage(this._curPage - 1);
    }

    private updatePage(index: number): void {
        let bHide = index < 0 || PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index] == null;
        for (let i = 0; i < 2; ++i) {
            this._vFishermanCard[i].node.active = !bHide;
        }

        for (let i = 0; i < 5; ++i) {
            this._vPubsCard[i].node.active = !bHide;
        }

        for (let i = 0; i < 2; ++i) {
            this._vSharkCard[i].node.active = !bHide;
        }

        cc.find("panel_main/paixing_bg", this.node).active = !bHide;
        if (bHide) return;
        this._curPage = index;
        this._totalbet_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index].totalBet);

        let bTotalWin = PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index].totalWin > 0;

        let profit_txtS = cv.resMgr.getLabelStringSize(this.profit_txt_0, (bTotalWin ? "+" : "") + cv.StringTools.serverGoldToShowString(PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index].totalWin));
        this._profit_txt.setPosition(this.profit_txt_0.node.x - profit_txtS.width, this._profit_txt.y);

        // 显示页数
        let len = cv.StringTools.getArrayLength(PokerMasterDataMgr.getPokerMasterRoom().vBetReview);
        this.txt_page_0.string = cv.String(index + 1);
        this.txt_page_1.string = "/" + cv.String(len);
        let changeBtn = (btn: cc.Button, canTouch: boolean): void => {
            btn.interactable = canTouch;
            btn.enabled = canTouch;
            let str = "zh_CN/game/pokermaster/ui/" + (canTouch ? "touch" : "no_touch");
            cv.resMgr.setButtonFrame(btn.node, str, str, str, str);
        }
        let btnArr = [true, true, true, true];
        if (index == 0) {
            btnArr[0] = false;
            btnArr[1] = false;
            if (len == 1) {
                btnArr[2] = false;
                btnArr[3] = false;
            }
        }
        else if (index > 0 && index + 1 == len) {
            btnArr[2] = false;
            btnArr[3] = false;
        }

        changeBtn(this.btn_first, btnArr[0]);
        changeBtn(this.btn_before, btnArr[1]);
        changeBtn(this.btn_next, btnArr[2]);
        changeBtn(this.btn_last, btnArr[3]);

        let bet = PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index];
        let isEqual: boolean = false;
        let winOpsLen = bet.winOps.length;
        for (let i = 0; i < winOpsLen; i++) {
            if (bet.winOps[i] == pokermaster_proto.BetZoneOption.EQUAL) {
                isEqual = true;
            }
        }
        let str = bet.level != 8 ? `M_UITitle${bet.level + 112}` : "Humanboy_game_card_type_four_of_a_kind";
        this.txt_paixing.string = cv.config.getStringData(str);
        for (let i = 0; i < 2; ++i) {
            //fisherman
            let card = pokermaster_proto.CardItem.create(bet.fisherCard[i]);
            this._vFishermanCard[i].SetContent(card.number, card.suit);
            this._vFishermanCard[i].SetFace(true);
        }

        for (let i = 0; i < 5; ++i) {
            let card = pokermaster_proto.CardItem.create(bet.pubCard[i]);
            this._vPubsCard[i].SetContent(card.number, card.suit);
            this._vPubsCard[i].SetFace(true);
        }

        for (let i = 0; i < 2; ++i) {
            let card = pokermaster_proto.CardItem.create(bet.sharkCard[i]);
            this._vSharkCard[i].SetContent(card.number, card.suit);
            this._vSharkCard[i].SetFace(true);
        }

        let tempArr = [pokermaster_proto.BetZoneOption.FIVE_NONE_1DUI,
        pokermaster_proto.BetZoneOption.FIVE_2DUI,
        pokermaster_proto.BetZoneOption.FIVE_SAN_SHUN_TONG,
        pokermaster_proto.BetZoneOption.FIVE_GOURD,
        pokermaster_proto.BetZoneOption.FIVE_KING_TONG_HUA_SHUN_4];
        //区域信息
        for (let i = 0; i < PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index].detail.length; ++i) {
            let detail = PokerMasterDataMgr.getPokerMasterRoom().vBetReview[index].detail[i];
            if (detail.option === pokermaster_proto.BetZoneOption.FISHER_WIN) {
                this._fisherman_txt.color = new cc.Color(153, 153, 153);
                this._fisherman_odds_txt.color = new cc.Color(153, 153, 153);
                this.fisherman_odds_txt_0.node.color = new cc.Color(153, 153, 153);
                this._fisherman_bet_txt.color = new cc.Color(153, 153, 153);
                this.fisherman_bet_txt_0.node.color = new cc.Color(153, 153, 153);
                this._fisherman_num.color = new cc.Color(153, 153, 153);

                //渔夫胜
                if (detail.win_amt > 0 && !isEqual) {
                    this._fisherman_txt.color = new cc.Color(255, 106, 7);
                    this._fisherman_odds_txt.color = new cc.Color(255, 106, 7);
                    this.fisherman_odds_txt_0.node.color = new cc.Color(255, 106, 7);
                    this._fisherman_bet_txt.color = new cc.Color(255, 106, 7);
                    this.fisherman_bet_txt_0.node.color = new cc.Color(255, 106, 7);
                    this._fisherman_num.color = new cc.Color(255, 106, 7);
                }

                this.fisherman_odds_txt_0.string = cv.StringTools.serverGoldToShowString(detail.odds) + (LANGUAGE_TYPE.zh_CN == cv.config.getCurrentLanguage() ? "倍" : "");
                this.fisherman_bet_txt_0.string = cv.StringTools.serverGoldToShowString(detail.betAmount);
                let isWin = detail.win_amt > 0;
                this._fisherman_num.getComponent(cc.Label).string = (isWin ? "+" : "") + cv.StringTools.serverGoldToShowString(detail.win_amt);

            }
            else if (detail.option === pokermaster_proto.BetZoneOption.SHARK_WIN) {
                this._shark_txt.color = new cc.Color(153, 153, 153);
                this._shark_odds_txt.color = new cc.Color(153, 153, 153);
                this.shark_odds_txt_0.node.color = new cc.Color(153, 153, 153);
                this._shark_bet_txt.color = new cc.Color(153, 153, 153);
                this.shark_bet_txt_0.node.color = new cc.Color(153, 153, 153);
                this._shark_num.color = new cc.Color(153, 153, 153);

                //鲨鱼胜
                if (detail.win_amt > 0 && !isEqual) {
                    this._shark_txt.color = new cc.Color(255, 106, 7);
                    this._shark_odds_txt.color = new cc.Color(255, 106, 7);
                    this.shark_odds_txt_0.node.color = new cc.Color(255, 106, 7);
                    this._shark_bet_txt.color = new cc.Color(255, 106, 7);
                    this.shark_bet_txt_0.node.color = new cc.Color(255, 106, 7);
                    this._shark_num.color = new cc.Color(255, 106, 7);
                }

                let shark_oddsS = cv.resMgr.getLabelStringSize(this.shark_odds_txt_0, cv.StringTools.serverGoldToShowString(detail.odds) + (LANGUAGE_TYPE.zh_CN == cv.config.getCurrentLanguage() ? "倍" : ""));
                this._shark_odds_txt.setPosition(this.shark_odds_txt_0.node.x - shark_oddsS.width, this._shark_odds_txt.y);
                let shark_betS = cv.resMgr.getLabelStringSize(this.shark_bet_txt_0, cv.StringTools.serverGoldToShowString(detail.betAmount));
                this._shark_bet_txt.setPosition(this.shark_bet_txt_0.node.x - shark_betS.width, this._shark_bet_txt.y);
                let isWin = detail.win_amt > 0;
                this._shark_num.getComponent(cc.Label).string = (isWin ? "+" : "") + cv.StringTools.serverGoldToShowString(detail.win_amt);
            }
            else {
                for (let j = 0; j < 5; j++) {
                    if (detail.option == tempArr[j]) {
                        this.paixing_peilv_arr[j].string = cv.StringTools.serverGoldToShowString(detail.odds) + (LANGUAGE_TYPE.zh_CN == cv.config.getCurrentLanguage() ? "倍" : "");
                        this.paixing_xiazhu_arr[j].string = cv.StringTools.serverGoldToShowString(detail.betAmount);

                        let isWin = detail.win_amt > 0;
                        this.paixing_win_arr[j].string = (isWin ? "+" : "") + cv.StringTools.serverGoldToShowString(detail.win_amt);

                        this.setLabColor(this.paixing_peilv_arr[j].node, isWin);
                        this.setLabColor(this.paixing_xiazhu_arr[j].node, isWin);
                        this.setLabColor(this.paixing_win_arr[j].node, isWin);
                        this.setLabColor(this.paixing_txt_arr[j], isWin);
                        break;
                    }
                }

            }
        }
    }

    setLabColor(lab: cc.Node, isWin: boolean): void {
        lab.color = isWin ? this.winColor : this.loseColor;
    }
}
