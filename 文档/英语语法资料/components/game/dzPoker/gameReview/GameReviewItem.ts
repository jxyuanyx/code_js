import cv from "../../../../components/lobby/cv";
import { Card } from "../../../../components/game/dzPoker/Card";
import { GameReviewItemData, HandCardType, GameReviewBettingRoundType } from "../../../../components/game/dzPoker/data/RecordData";
import { PokerData } from "../../../../components/game/dzPoker/data/PokerData";
import { CircleSprite } from "../../../../common/tools/CircleSprite";
import { RemarkData } from "../../../../data/userData";
import { TableView } from "../../../../common/tools/TableView";
import { HashMap } from "../../../../common/tools/HashMap";

/**
 * 下注信息
 */
class GameReviewItemBetInfo {
    action: string = "";                                                    // 动作名
    amount: number = 0;                                                     // 金额
}

/**
 * 牌局回顾面板子项
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReviewItem extends cc.Component {
    @property(cc.Node) panel_card: cc.Node = null;                          // 牌面板
    @property(cc.Node) panel_bottom: cc.Node = null;                        // 底栏面板

    @property(cc.Sprite) img_head: cc.Sprite = null;                        // 头像
    @property(cc.Sprite) img_head_sheild: cc.Sprite = null;                 // 头像遮罩
    @property(cc.Sprite) img_d: cc.Sprite = null;                           // D
    @property(cc.Sprite) img_pei: cc.Sprite = null;                         // 赔
    @property(cc.Sprite) img_bao: cc.Sprite = null;                         // 保
    @property(cc.Sprite) img_jp: cc.Sprite = null;                          // JP
    @property(cc.Sprite) img_cardtype: cc.Sprite = null;                    // 牌局型
    @property(cc.Sprite) img_pub_card_box_1: cc.Sprite = null;              // 1张公牌牌框
    @property(cc.Sprite) img_pub_card_box_3: cc.Sprite = null;              // 3张公牌牌框
    @property(cc.Sprite) img_pub_card_box_4: cc.Sprite = null;              // 4张公牌牌框

    @property(cc.Label) txt_username: cc.Label = null;                      // 玩家昵称
    @property(cc.Label) txt_number: cc.Label = null;                        // 输赢数量
    @property(cc.Label) txt_bet_preflop: cc.Label = null;                   // 翻前下注
    @property(cc.Label) txt_bet_flop: cc.Label = null;                      // 翻牌下注
    @property(cc.Label) txt_bet_turn: cc.Label = null;                      // 转牌下注
    @property(cc.Label) txt_bet_river: cc.Label = null;                     // 河牌下注
    @property(cc.Label) txt_bao: cc.Label = null;                           // 保
    @property(cc.Label) txt_pei: cc.Label = null;                           // 赔
    @property(cc.Label) txt_jp: cc.Label = null;                            // JP

    private _vHandCard: Card[] = [];                                        // 手牌
    private _vPubsCard: Card[] = [];                                        // 公牌
    private _handCardScaleRatio: number = 1;                                // 手牌初始缩放比例
    private _pubsCardScaleRatio: number = 1;                                // 公牌初始缩放比例

    private _jackpotTxtFontSize: number = 0;                                // 底栏面板"JP"字体初始大小
    private _jackpotImgScaleRatio: number = 0;                              // 底栏面板"JP"图标初始缩放比例

    private _insuranceTxtFontSize: number = 0;                              // 底栏面板"投保/赔付"字体初始大小
    private _insuranceImgScaleRatio: number = 0;                            // 底栏面板"投保/赔付"图标初始缩放比例

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);

        // 初始化相关控件
        for (let i = 0; i < this.panel_card.children.length; ++i) {
            let hand_card: cc.Node = this.panel_card.getChildByName(`hand_card_${i}`);
            if (hand_card) {
                this._handCardScaleRatio = hand_card.scale;
                this._vHandCard.push(hand_card.getComponent(Card));
            }

            let public_card: cc.Node = this.panel_card.getChildByName(`public_card_${i}`);
            if (public_card) {
                this._pubsCardScaleRatio = public_card.scale;
                this._vPubsCard.push(public_card.getComponent(Card));
            }
        }

        this._insuranceTxtFontSize = this.txt_bao.fontSize;
        this._insuranceImgScaleRatio = this.img_bao.node.scale;

        this._jackpotTxtFontSize = this.txt_jp.fontSize;
        this._jackpotImgScaleRatio = this.img_jp.node.scale;

        // 重置相关控件
        this._resetCtl();
    }

    protected start(): void {
    }

    /**
     * 重置相关控件
     */
    private _resetCtl(): void {
        this.img_d.node.active = false;
        this.img_cardtype.node.active = false;
        this.img_head_sheild.node.active = false;
        this.img_pub_card_box_1.node.active = false;
        this.img_pub_card_box_3.node.active = false;
        this.img_pub_card_box_4.node.active = false;

        this.txt_bet_preflop.node.active = false;
        this.txt_bet_flop.node.active = false;
        this.txt_bet_turn.node.active = false;
        this.txt_bet_river.node.active = false;

        this.txt_username.string = "";
    }

    /**
     * 设置"输赢"金额
     * @param nAmount 
     */
    private _setWinAmount(nAmount): void {
        let nWinBet: number = cv.StringTools.clientGoldByServer(nAmount);
        nWinBet = cv.StringTools.numberToShowNumber(cv.StringTools.toFixed(nWinBet, 2, cv.StringTools.RoundingMode.ROUND_HALF_UP));

        this.txt_number.string = cv.StringTools.getSignString(nWinBet);
        this.txt_number.node.color = cv.StringTools.getSignColor(nWinBet);
    }

    /**
     * 设置保险"赔付/投保"金额
     * @param nPeiFuAmount    - 赔付额
     * @param nTouBaoAmount   - 投保额
     */
    private _setInsuredAmount(nPeiFuAmount: number, nTouBaoAmount: number): void {
        // 赔付
        do {
            let peiAmount: number = cv.StringTools.clientGoldByServer(nPeiFuAmount);
            peiAmount = cv.StringTools.numberToShowNumber(cv.StringTools.toFixed(peiAmount, 2, cv.StringTools.RoundingMode.ROUND_DOWN));
            let peiStr: string = "0";
            let peiColor: cc.Color = cc.Color.WHITE;

            if (peiAmount > 0) {
                peiStr = "+" + cv.String(peiAmount);
                peiColor = cv.tools.getWinColor();
            }
            else if (peiAmount < 0) {
                peiStr = cv.String(peiAmount);
                peiColor = cv.tools.getLoseColor();
            }

            this.txt_pei.string = cv.StringTools.formatC(cv.config.getStringData("UIPeiFuE"), peiStr);
            this.txt_pei.node.color = peiColor;
            this.txt_pei.node.active = peiAmount !== 0;
            this.img_pei.node.active = this.txt_pei.node.active;
            if (this.img_pei.node.active) {
                let fileName: string = "game/dzpoker/ui/gameMain/game_icon_pei";
                if (cv.tools.isRedWinColorByLanguage()) {
                    cv.resMgr.setSpriteFrame(this.img_pei.node, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.zh_CN));
                }
                else {
                    cv.resMgr.setSpriteFrame(this.img_pei.node, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.en_US));
                }
            }
        } while (false);

        // 投保
        do {
            let baoAmount: number = cv.StringTools.clientGoldByServer(nTouBaoAmount);
            baoAmount = cv.StringTools.numberToShowNumber(cv.StringTools.toFixed(baoAmount, 2, cv.StringTools.RoundingMode.ROUND_DOWN));
            let baoStr: string = "0";
            let baoColor: cc.Color = cc.Color.WHITE;
            if (baoAmount > 0) {
                baoStr = "-" + cv.String(baoAmount);
                baoColor = cv.tools.getLoseColor();
            }
            else if (baoAmount < 0) {
                baoAmount = Math.abs(baoAmount);
                baoStr = "+" + cv.String(baoAmount);
                baoColor = cv.tools.getWinColor();
            }

            this.txt_bao.string = cv.StringTools.formatC(cv.config.getStringData("UITouBaoE"), baoStr);
            this.txt_bao.node.color = baoColor;
            this.txt_bao.node.active = baoAmount !== 0;
            this.img_bao.node.active = this.txt_bao.node.active;
            if (this.img_bao.node.active) {
                let fileName: string = "game/dzpoker/ui/gameMain/game_icon_bao";
                if (cv.tools.isRedWinColorByLanguage()) {
                    cv.resMgr.setSpriteFrame(this.img_bao.node, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.zh_CN));
                }
                else {
                    cv.resMgr.setSpriteFrame(this.img_bao.node, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.en_US));
                }
            }
        } while (false);
    }

    /**
     * 设置"JP"输赢
     * @param nAmount 
     */
    private _setJackPotAmout(nAmount: number): void {
        if (nAmount > 0) {
            this.img_jp.node.active = true;
            this.txt_jp.node.active = true;
            this.txt_jp.string = ": " + cv.StringTools.serverGoldToShowString(nAmount);
        }
        else {
            this.img_jp.node.active = false;
            this.txt_jp.node.active = false;
        }
    }

    /**
     * 排版底栏面板
     */
    private _layoutPanelBottom(): void {
        // 复原控件属性
        this.txt_jp.fontSize = this._jackpotTxtFontSize;
        this.img_jp.node.setScale(this._jackpotImgScaleRatio);

        this.txt_bao.fontSize = this._insuranceTxtFontSize;
        this.img_bao.node.setScale(this._insuranceImgScaleRatio);

        this.txt_pei.fontSize = this._insuranceTxtFontSize;
        this.img_pei.node.setScale(this._insuranceImgScaleRatio);

        // "投保/赔付"等左对齐, "JP"右对齐
        let lx = -this.panel_bottom.width * this.panel_bottom.anchorX;                          // 左对齐坐标计数
        let rx = this.panel_bottom.width * (1 - this.panel_bottom.anchorX);                     // 右对齐坐标计数
        let y: number = 0;                                                                      // 公用纵坐标计数
        let attenuate_font: number = 1;                                                         // 适配时衰减的字体大小
        let attenuate_scale: number = 0.05;                                                     // 适配时衰减的图标缩放比例

        let tmp_lx: number = 0;                                                                 // 临时左对齐坐标计数
        let tmp_rx: number = 0;                                                                 // 临时右对齐坐标计数
        let tmp_total_w: number = 0;                                                            // 临时排版控件总占宽
        let tmp_jackpit_fontSize: number = this._jackpotTxtFontSize + attenuate_font;           // 临时"JP"字体大小
        let tmp_jackpot_imgScale: number = this._jackpotImgScaleRatio + attenuate_scale;        // 临时"JP"图标缩放
        let tmp_insurance_fontSize: number = this._insuranceTxtFontSize + attenuate_font;       // 临时"投保/赔付"字体大小
        let tmp_insurance_imgScale: number = this._insuranceImgScaleRatio + attenuate_scale;    // 临时"投保/赔付"图标缩放

        let offset_left_nextto: number = 10;                                                    // 左对齐绑定间距
        let offset_right_nextto: number = -15;                                                  // 右对齐绑定间距
        let offset_middle: number = 50;                                                         // 公用毗邻间距

        do {
            tmp_lx = lx;
            tmp_rx = rx;
            tmp_total_w = 0;

            tmp_jackpit_fontSize -= attenuate_font;
            tmp_jackpot_imgScale -= attenuate_scale

            tmp_insurance_fontSize -= attenuate_font;
            tmp_insurance_imgScale -= attenuate_scale;

            // 投保
            if (this.txt_bao.node.active) {
                this.txt_bao.fontSize = tmp_insurance_fontSize;
                this.img_bao.node.setScale(tmp_insurance_imgScale);
                let txt_bao_w: number = cv.resMgr.getLabelStringSize(this.txt_bao).width;

                tmp_lx += this.img_bao.node.width * this.img_bao.node.scaleX * this.img_bao.node.anchorX;
                this.img_bao.node.setPosition(tmp_lx, y);
                tmp_lx += this.img_bao.node.width * this.img_bao.node.scaleX * (1 - this.img_bao.node.anchorX);
                tmp_lx += offset_left_nextto;

                tmp_lx += txt_bao_w * this.txt_bao.node.anchorX;
                this.txt_bao.node.setPosition(tmp_lx, y);
                tmp_lx += txt_bao_w * (1 - this.txt_bao.node.anchorX);
            }

            // 赔付
            if (this.txt_pei.node.active) {
                if (this.txt_bao.node.active) tmp_lx += offset_middle;

                this.txt_pei.fontSize = tmp_insurance_fontSize;
                this.img_pei.node.setScale(tmp_insurance_imgScale);
                let txt_pei_w: number = cv.resMgr.getLabelStringSize(this.txt_pei).width;

                tmp_lx += this.img_pei.node.width * this.img_pei.node.scaleX * this.img_pei.node.anchorX;
                this.img_pei.node.setPosition(tmp_lx, y);
                tmp_lx += this.img_pei.node.width * this.img_pei.node.scaleX * (1 - this.img_pei.node.anchorX);
                tmp_lx += offset_left_nextto;

                tmp_lx += txt_pei_w * this.txt_pei.node.anchorX;
                this.txt_pei.node.setPosition(tmp_lx, y);
                tmp_lx += txt_pei_w * (1 - this.txt_pei.node.anchorX);
            }

            // JP
            if (this.txt_jp.node.active) {
                this.txt_jp.fontSize = tmp_jackpit_fontSize;
                this.img_jp.node.setScale(tmp_jackpot_imgScale);
                let txt_jp_w: number = cv.resMgr.getLabelStringSize(this.txt_jp).width;

                tmp_rx -= txt_jp_w * (1 - this.txt_jp.node.anchorX);
                this.txt_jp.node.setPosition(tmp_rx, y);
                tmp_rx -= txt_jp_w * this.txt_jp.node.anchorX;
                tmp_rx -= offset_right_nextto;
                tmp_rx -= this.img_jp.node.width * this.img_jp.node.scaleX * (1 - this.img_jp.node.anchorX);
                this.img_jp.node.setPosition(tmp_rx, y);
                tmp_rx -= this.img_jp.node.width * this.img_jp.node.scaleX * this.img_jp.node.anchorX;

                if (this.txt_bao.node.active || this.txt_pei.node.active) tmp_rx -= offset_middle;
            }

            tmp_total_w += Math.abs(Math.abs(lx) - Math.abs(tmp_lx));
            tmp_total_w += Math.abs(Math.abs(rx) - Math.abs(tmp_rx));
        } while (tmp_total_w > this.panel_bottom.width);
    }

    /**
     * 设置下注信息
     * @param data 
     */
    private _setBetRoundsInfo(data: GameReviewItemData): void {
        if (!data.objReplay) return;

        let seatNo: number = data.seatNo;                               // 座位ID
        let initialStakeMap: HashMap<number, number> = new HashMap();   // 每个座位的筹码初始值

        let roomInfo: any = data.objReplay["RoomInfo"];
        let tableInfo: any = data.objReplay["TableInfo"];
        let seatsInfo: any = data.objReplay["SeatsInfo"];
        let roundsInfo: any = data.objReplay["RoundsInfo"];

        // 填充"每个座位的筹码初始值"
        initialStakeMap.clear();
        for (let i = 0; i < cv.StringTools.getArrayLength(seatsInfo["seats_info"]); ++i) {
            let info: any = seatsInfo["seats_info"][i];
            let seatid: number = cv.Number(info["seat_no"]);
            let stake: number = cv.Number(info["stake"]);
            initialStakeMap.add(seatid, stake);
        }

        // 解析前注
        let analysisAnte: (betInfo: GameReviewItemBetInfo) => void =
            (betInfo: GameReviewItemBetInfo) => {
                let dealerSeatID: number = cv.Number(tableInfo["dealer_seat"]);
                let mode: number = cv.Number(roomInfo["mode"]);
                let ante: number = cv.Number(roomInfo["ante"]);
                let isAnteRound: boolean = roundsInfo["ante_round"];
                let isDoubleAnte: boolean = Boolean(roomInfo["double_ante"]);
                if (isAnteRound) {
                    betInfo.amount += ante;
                    betInfo.action = "Ante";

                    // 短牌检测庄家是否双倍"ante"(此处再处理一个前注)
                    if (mode === cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                        if (isDoubleAnte) {
                            if (seatNo === dealerSeatID) {
                                betInfo.amount += ante;
                            }
                        }

                        // 短牌判断下补"Ante"
                        for (let i = 0; i < cv.StringTools.getArrayLength(tableInfo["post_seats"]); ++i) {
                            if (seatNo === tableInfo["post_seats"][i]) {
                                betInfo.action = cv.config.getStringData("ActionTips9");
                                betInfo.amount += ante;
                                break;
                            }
                        }
                    }
                }
            }

        // 解析盲注
        let analysisBlind: (betInfo: GameReviewItemBetInfo) => void =
            (betInfo: GameReviewItemBetInfo) => {
                let sbLevel: number = 0;
                let bbLevel: number = cv.Number(roomInfo["blind"]);
                let straddleLevel: number = 2 * bbLevel;

                let sbSeatID: number = cv.Number(tableInfo["sb_seat"]);
                let bbSeatID: number = cv.Number(tableInfo["bb_seat"]);
                let straddleSeatID: number = -1;

                // 解析小盲配置
                for (let i = 0; i < 20; ++i) {
                    let strBlind: string = cv.config.getblindString(i);
                    if (strBlind) {
                        let vBlind = strBlind.split('/');
                        let nSB = Math.min(cv.Number(vBlind[0]), cv.Number(vBlind[1]));
                        let nBB = Math.max(cv.Number(vBlind[0]), cv.Number(vBlind[1]));

                        if (cv.StringTools.serverGoldByClient(nBB) === bbLevel) {
                            sbLevel = cv.StringTools.serverGoldByClient(nSB);
                        }
                    }
                }

                // 解析"straddle"
                if (tableInfo["straddle_seat"] !== null && typeof tableInfo["straddle_seat"] !== "undefined") {
                    straddleSeatID = cv.Number(tableInfo["straddle_seat"]);
                }

                let isBlindRound: boolean = roundsInfo["blind_round"];
                if (isBlindRound) {
                    if (seatNo === sbSeatID) {
                        betInfo.amount += sbLevel;
                        betInfo.action = "SB";
                    }
                    else if (seatNo === bbSeatID) {
                        betInfo.amount += bbLevel;
                        betInfo.action = "BB";
                    }
                    else if (straddleSeatID >= 0 && seatNo === straddleSeatID) {
                        betInfo.amount += straddleLevel;
                        betInfo.action = cv.config.getStringData("ActionTips5");
                    }

                    // 补盲注
                    for (let i = 0; i < cv.StringTools.getArrayLength(tableInfo["post_seats"]); ++i) {
                        if (seatNo === tableInfo["post_seats"][i]) {
                            if (initialStakeMap.length > 3 && straddleSeatID >= 0) {
                                betInfo.amount += straddleLevel;
                                betInfo.action = cv.config.getStringData("ActionTips8")
                            }
                            else {
                                betInfo.amount += bbLevel;
                                betInfo.action = cv.config.getStringData("ActionTips8")
                            }
                        }
                    }
                }
            }

        // 解析下注圈
        let analysisRoundBet: (info: any[], betInfo: GameReviewItemBetInfo) => void =
            (info: any[], betInfo: GameReviewItemBetInfo): void => {
                let finalActionType: number = cv.Enum.ActionType.Enum_Action_Null;
                for (let i = 0; i < cv.StringTools.getArrayLength(info); ++i) {
                    let seatID: number = cv.Number(info[i]["seat_no"]);
                    let amount: number = cv.Number(info[i]["amount"]);
                    let actionType: number = cv.Number(info[i]["action_type"]);

                    // 找到自己座位
                    if (seatID === seatNo) {
                        // 每轮筹码计数
                        switch (actionType) {
                            case cv.Enum.ActionType.Enum_Action_Call: {
                                betInfo.amount += amount;
                            } break;

                            case cv.Enum.ActionType.Enum_Action_Bet: {
                                betInfo.amount = amount;
                            } break;

                            case cv.Enum.ActionType.Enum_Action_Raise: {
                                betInfo.amount = amount;
                            } break;

                            case cv.Enum.ActionType.Enum_Action_Allin: {
                                betInfo.amount = amount;
                            } break;
                        }

                        // 保存该轮最后一个动作
                        finalActionType = actionType;
                    }
                }

                switch (finalActionType) {
                    case cv.Enum.ActionType.Enum_Action_Null: break;                                                                // 默认
                    case cv.Enum.ActionType.Enum_Action_Check: betInfo.action = cv.config.getStringData("ActionTips6"); break;      // 看牌
                    case cv.Enum.ActionType.Enum_Action_Fold: betInfo.action = cv.config.getStringData("ActionTips1"); break;       // 弃牌
                    case cv.Enum.ActionType.Enum_Action_Straddle: betInfo.action = cv.config.getStringData("ActionTips5"); break;   // straddle
                    case cv.Enum.ActionType.Enum_Action_Post: betInfo.action = cv.config.getStringData("ActionTips8"); break;       // 补盲
                    case cv.Enum.ActionType.Enum_Action_Call: betInfo.action = cv.config.getStringData("ActionTips0"); break;       // 跟注
                    case cv.Enum.ActionType.Enum_Action_Bet: betInfo.action = cv.config.getStringData("ActionTips3"); break;        // 下注
                    case cv.Enum.ActionType.Enum_Action_Raise: betInfo.action = cv.config.getStringData("ActionTips2"); break;      // 加注
                    case cv.Enum.ActionType.Enum_Action_Allin: betInfo.action = cv.config.getStringData("ActionTips4"); break;      // Allin
                    default: break;
                }
            }

        // 剩余筹码
        let stakes: number = cv.Number(initialStakeMap.get(data.seatNo));

        // 前注
        let bet_profix: GameReviewItemBetInfo = new GameReviewItemBetInfo();
        analysisAnte(bet_profix);

        // 翻牌前(包含盲注)
        let bet_preflop: GameReviewItemBetInfo = new GameReviewItemBetInfo();
        bet_preflop.action = bet_profix.action;
        analysisBlind(bet_preflop);
        analysisRoundBet(roundsInfo["preflop"], bet_preflop);
        bet_preflop.amount += bet_profix.amount;
        bet_preflop.amount = Math.min(stakes, bet_preflop.amount);
        stakes -= bet_preflop.amount;
        stakes = Math.max(stakes, 0);

        // 翻牌圈
        let bet_flop: GameReviewItemBetInfo = new GameReviewItemBetInfo();
        analysisRoundBet(roundsInfo["flop"], bet_flop);
        bet_flop.amount = Math.min(stakes, bet_flop.amount);
        stakes -= bet_flop.amount;
        stakes = Math.max(stakes, 0);

        // 转牌
        let bet_turn: GameReviewItemBetInfo = new GameReviewItemBetInfo();
        analysisRoundBet(roundsInfo["turn"], bet_turn);
        bet_turn.amount = Math.min(stakes, bet_turn.amount);
        stakes -= bet_turn.amount;
        stakes = Math.max(stakes, 0);

        // 河牌
        let bet_river: GameReviewItemBetInfo = new GameReviewItemBetInfo();
        analysisRoundBet(roundsInfo["river"], bet_river);
        bet_river.amount = Math.min(stakes, bet_river.amount);
        stakes -= bet_river.amount;
        stakes = Math.max(stakes, 0);

        // 当前打到那个阶段(引擎自带的"cc.Label.Overflow.SHRINK"在某些情况右侧数字0边被裁剪一部分, 采用手动计算)
        switch (data.nLastRoundType) {
            case GameReviewBettingRoundType.Enum_BettingRound_ShowDown:
            case GameReviewBettingRoundType.Enum_BettingRound_River: {
                this.txt_bet_river.node.active = true;
                let strAmount: string = cv.StringTools.serverGoldToShowString(bet_river.amount);
                let strText: string = `${bet_river.action}  ${strAmount}`;
                cv.StringTools.setShrinkString(this.txt_bet_river.node, strText, false);
            }
            case GameReviewBettingRoundType.Enum_BettingRound_Turn: {
                this.txt_bet_turn.node.active = true;
                let strAmount: string = cv.StringTools.serverGoldToShowString(bet_turn.amount);
                let strText: string = `${bet_turn.action}  ${strAmount}`;
                cv.StringTools.setShrinkString(this.txt_bet_turn.node, strText, false);
            }
            case GameReviewBettingRoundType.Enum_BettingRound_Flop: {
                this.txt_bet_flop.node.active = true;
                let strAmount: string = cv.StringTools.serverGoldToShowString(bet_flop.amount);
                let strText: string = `${bet_flop.action}  ${strAmount}`;
                cv.StringTools.setShrinkString(this.txt_bet_flop.node, strText, false);
            }
            case GameReviewBettingRoundType.Enum_BettingRound_Preflop: {
                this.txt_bet_preflop.node.active = true;
                let strAmount: string = cv.StringTools.serverGoldToShowString(bet_preflop.amount);
                let strText: string = `${bet_preflop.action}  ${strAmount}`;
                cv.StringTools.setShrinkString(this.txt_bet_preflop.node, strText, false);
            } break;

            case GameReviewBettingRoundType.Enum_BettingRound_None: break;
            default: break;
        }
    }

    /**
     * 计算牌型
     * @param data 
     */
    private _calculateCardType(data: GameReviewItemData): void {
        let cardType: string = "";
        let hasCardType: boolean = false;

        let hpokers: number[] = [];
        let ppokers: number[] = [];

        let out_hps: number[] = [];
        let out_pps: number[] = [];

        // 手牌
        for (let i = 0; i < this._vHandCard.length; ++i) {
            let card: Card = this._vHandCard[i];
            if (card.node.active && card.isFace() && card.hasContent()) {
                let nValue = PokerData.getLocalValue(card.eCardNum, data.nGameMode);
                let poker: PokerData = new PokerData(data.nGameMode);
                poker.initWhitValue(nValue, card.eCardSuit, data.nGameMode);
                hpokers.push(poker.getNumber(data.nGameMode));
            }
        }

        // 公牌
        for (let i = 0; i < this._vPubsCard.length; ++i) {
            let card: Card = this._vPubsCard[i];
            if (card.node.active && card.isFace() && card.hasContent()) {
                let nValue = PokerData.getLocalValue(card.eCardNum, data.nGameMode);
                let poker: PokerData = new PokerData(data.nGameMode);
                poker.initWhitValue(nValue, card.eCardSuit, data.nGameMode);
                ppokers.push(poker.getNumber(data.nGameMode));
            }
        }

        // "奥马哈"
        let tmpCardType: string = "";
        if (data.nGameID === cv.Enum.GameId.Plo) {
            tmpCardType = PokerData.getPokerTypeString(hpokers, ppokers, data.nGameMode, 2, 3, out_hps, out_pps);
        }
        // 其他
        else {
            tmpCardType = PokerData.getPokerTypeString(hpokers, ppokers, data.nGameMode);
        }

        // 弃牌
        if (data.bFold) {
            if (data.vHandCards.length > 0) {
                hasCardType = true;
                cardType = tmpCardType;
            }
            else {
                cardType = cv.config.getStringData("ActionTips1");
            }
        }
        // 未弃牌
        else {
            if (data.bMuck) {
                if (data.vHandCards.length > 0) hasCardType = true;
                cardType = cv.config.getStringData("ActionTips10");
            }
            else {
                if (data.vHandCards.length > 0) {
                    hasCardType = true;
                    cardType = tmpCardType;;
                }
                else {
                    cardType = "";
                }
            }
        }

        // 显示牌型
        if (cardType.length > 0) {
            this.img_cardtype.node.active = true;
            this.img_cardtype.node.getChildByName("txt").getComponent(cc.Label).string = cardType;
        }
        else {
            this.img_cardtype.node.active = false;
        }

        // 有牌型且"奥马哈"(则标记最大牌型时所参与的手牌和公牌)
        if (hasCardType && data.nGameID === cv.Enum.GameId.Plo) {
            let game_mode: number = data.nGameMode;
            let poker: PokerData = new PokerData(game_mode);

            for (let i = 0; i < this._vHandCard.length; ++i) {
                let card: Card = this._vHandCard[i];
                if (card.node.active && card.isFace() && card.hasContent()) {
                    card.setGary(true, 0xFF * 0.5);
                }
            }

            for (let i = 0; i < this._vPubsCard.length; ++i) {
                let card: Card = this._vPubsCard[i];
                if (card.node.active && card.isFace() && card.hasContent()) {
                    card.setGary(true, 0xFF * 0.5);
                }
            }

            // 检测手牌
            for (let i = 0; i < out_hps.length; ++i) {
                poker.initWithNumber(out_hps[i]);
                for (let j = 0; j < this._vHandCard.length; ++j) {
                    let card: Card = this._vHandCard[j];
                    let value: number = PokerData.getLocalValue(card.eCardNum, game_mode);
                    let color: number = card.eCardSuit;
                    if (poker.value === value && poker.color === color) {
                        card.setGary(false);
                        break;
                    }
                }
            }

            // 检测公牌
            for (let i = 0; i < out_pps.length; ++i) {
                poker.initWithNumber(out_pps[i]);
                for (let j = 0; j < this._vPubsCard.length; ++j) {
                    let card: Card = this._vPubsCard[j];
                    let value: number = PokerData.getLocalValue(card.eCardNum, game_mode);
                    let color: number = card.eCardSuit;
                    if (poker.value === value && poker.color === color) {
                        card.setGary(false);
                        break;
                    }
                }
            }
        }
    }

    /**
     * 发发看功能(显示额外看到的共牌, 只有该玩家下过注参与才生效)
     * @param data 
     * @param selfPubCardLen 
     */
    private _checkSendOut(data: GameReviewItemData, selfPubCardLen: number): void {
        if (data.nPlayerID !== cv.dataHandler.getUserData().u32Uid) return;

        let nSendOutOpacity: number = data.nGameID === cv.Enum.GameId.Plo ? 255 : 255 / 2;      // 发发看的牌透明度
        let vALlPubCards: HandCardType[] = data.vPubsCards.concat(data.vUnsendPublicCards);     // 所有共牌
        let nSelfPubCardLen: number = selfPubCardLen;                                           // 当前自己能看到的公牌长度
        let nCompletCardLen: number = data.vPubsCards.length - nSelfPubCardLen;                 // 当前所需的补牌长度

        // 刷新已发发看的状态
        if (data.nReviewSendOutLen > data.vPubsCards.length) {
            for (let i = 0; i < this._vPubsCard.length; ++i) {
                if (i < data.nReviewSendOutLen - data.nReviewSendOutActLen) {
                    this._vPubsCard[i].node.active = true;
                    this._vPubsCard[i].setFace(true);
                    this._vPubsCard[i].setContent(vALlPubCards[i].eCardNum, vALlPubCards[i].eCardSuit);
                    this._vPubsCard[i].updateCardFace();
                    this._vPubsCard[i].updateCardBack();

                    // 若存在公牌
                    if (i < data.vPubsCards.length) {
                        // 自己的公牌长度不足, 则补牌
                        if (nCompletCardLen > 0) {
                            switch (nCompletCardLen) {
                                case 1: this.img_pub_card_box_1.node.active = true; break;
                                case 3: this.img_pub_card_box_3.node.active = true; break;
                                case 4: this.img_pub_card_box_4.node.active = true; break;
                                default: break;
                            }
                        }
                    }
                    // 若不存在公牌或已补完公牌, 则该玩家剩下的公牌全是发发看
                    else {
                        this._vPubsCard[i].node.opacity = nSendOutOpacity;
                    }
                }
                else {
                    this._vPubsCard[i].node.active = false;
                }
            }

            // 填充过公牌后, 要累计上已发发看的牌重新计算 nSelfPubCardLen 和 nCompletCardLen, 为动画流程做精确计算
            do {
                let selfVisiblePubCardLen: number = 0;
                for (let i = 0; i < this._vPubsCard.length; ++i) {
                    if (i < vALlPubCards.length && this._vPubsCard[i].node.active) {
                        ++selfVisiblePubCardLen;
                    }
                }
                nSelfPubCardLen = selfVisiblePubCardLen;
                nCompletCardLen = data.vPubsCards.length - nSelfPubCardLen;
            } while (false);

            // 计算牌型(暂时屏蔽)
            // this._calculateCardType(data);
        }

        // 即将发发看的动画
        if (data.nReviewSendOutActLen > 0) {
            let nFadeDuring: number = 0.5;                                                              // 渐变时间
            let nTurnDuring: number = 0.4;                                                              // 翻转时间

            let nCompletCardCount: number = 0;                                                          // 补全检索次数
            let nCompletCardStartIdx: number = data.nReviewSendOutLen - data.nReviewSendOutActLen;      // 补全起始索引(无需补牌, 则索引从已知共牌长度开始)

            switch (nCompletCardLen) {
                // 补1张, 说明自己在"翻牌"阶段, 而牌局结束在"转牌"阶段
                case 1: {
                    nCompletCardCount = 1;
                    nCompletCardStartIdx = 3;
                    this.img_pub_card_box_1.node.active = true;
                } break;

                // 补3张, 说明自己在"翻牌前"阶段, 而牌局结束在"翻牌"阶段
                case 3: {
                    nCompletCardCount = 3;
                    nCompletCardStartIdx = 0;
                    this.img_pub_card_box_3.node.active = true;
                } break;

                // 补4张, 说明自己在"翻牌前"阶段, 而牌局结束在"转牌"阶段
                case 4: {
                    nCompletCardCount = 4;
                    nCompletCardStartIdx = 0;
                    this.img_pub_card_box_4.node.active = true;
                } break;

                default: break;
            }

            for (let i = nCompletCardStartIdx, m = 0, n = 0; i < this._vPubsCard.length; ++i) {
                if (i < vALlPubCards.length) {
                    // 补全动画: 渐显至透明度为 255, 然后翻转
                    if (nCompletCardLen > 0 && m++ < nCompletCardCount) {
                        this._vPubsCard[i].node.active = true;
                        this._vPubsCard[i].setFace(false);
                        this._vPubsCard[i].setContent(vALlPubCards[i].eCardNum, vALlPubCards[i].eCardSuit);
                        this._vPubsCard[i].updateCardFace();
                        this._vPubsCard[i].updateCardBack();
                        this._vPubsCard[i].node.opacity = 0;

                        this._vPubsCard[i].node.runAction(cc.fadeTo(nFadeDuring, 255));
                        this._vPubsCard[i].turn(nFadeDuring, true);
                    }
                    // 发发看动画: 渐显至透明度为 255/2, 然后翻转
                    else if (n++ < data.nReviewSendOutActLen) {
                        this._vPubsCard[i].node.active = true;
                        this._vPubsCard[i].setFace(false);
                        this._vPubsCard[i].setContent(vALlPubCards[i].eCardNum, vALlPubCards[i].eCardSuit);
                        this._vPubsCard[i].updateCardFace();
                        this._vPubsCard[i].updateCardBack();
                        this._vPubsCard[i].node.opacity = 0;

                        let delay: number = nCompletCardLen > 0 ? nFadeDuring + nTurnDuring : 0;
                        this._vPubsCard[i].node.runAction(cc.sequence(cc.delayTime(delay), cc.fadeTo(nFadeDuring, nSendOutOpacity)));
                        delay += nFadeDuring;
                        this._vPubsCard[i].turn(delay, true);
                        delay += nTurnDuring;
                        this.scheduleOnce((elapsed: number): void => {
                            // 计算牌型(暂时屏蔽)
                            // this._calculateCardType(data);
                        }, delay);
                    }
                }
            }

            // 清空发发看动画标记
            data.nReviewSendOutActLen = 0;
        }
    }

    /**
     * 更新数据 
     */
    updateSVReuseData(index: number, data: GameReviewItemData, view?: TableView): void {
        // 头像
        CircleSprite.setCircleSprite(this.img_head.node, data.sPlayerHead, data.plat);

        // 重置相关控件状态
        this._resetCtl();

        // 昵称(是否有备注)
        let tRemarkData: RemarkData = cv.dataHandler.getUserData().vRemarkData.get(data.nPlayerID);
        if (!tRemarkData || !tRemarkData.sRemark) {
            cv.StringTools.setShrinkString(this.txt_username.node, data.sPlayerName, true);
        }
        else {
            cv.StringTools.setShrinkString(this.txt_username.node, tRemarkData.sRemark, true);
        }

        // 设置"输赢"金额
        this._setWinAmount(data.nWinBet);

        // 设置保险"赔付/投保"金额
        this._setInsuredAmount(data.nInsuranceAmount, data.nInsuranceBet);

        // 设置"JP"输赢
        this._setJackPotAmout(data.nJackWinbet);

        // 排版底栏面板
        this._layoutPanelBottom();

        // 手牌堆
        for (let i: number = 0; i < this._vHandCard.length; ++i) {
            // 恢复牌状态
            this._vHandCard[i].node.active = true;
            this._vHandCard[i].node.stopAllActions();
            this._vHandCard[i].node.setScale(this._handCardScaleRatio);
            this._vHandCard[i].node.opacity = 255;
            this._vHandCard[i].setGary(false);
            this._vHandCard[i].clearContent();
            this._vHandCard[i].setGameID(data.nGameID);

            if (i < data.vHandCards.length) {
                this._vHandCard[i].setFace(true);
                this._vHandCard[i].setContent(data.vHandCards[i].eCardNum, data.vHandCards[i].eCardSuit);
                this._vHandCard[i].updateCardFace();
                this._vHandCard[i].updateCardBack();

                // 是否有强制亮牌
                if (data.nForceShowedActLen > 0) {
                    // 长度为1, 说明第一张手牌已亮
                    if (data.nForceShowedActLen === 1) {
                        if (i === 0) continue;
                    }
                    // 长度为2, 说明两张手牌都没亮
                    else {
                    }

                    // 翻牌动画
                    this._vHandCard[i].setFace(false);                                          // 设置为牌背
                    let delay: number = 0.2;                                                    // 初始延时
                    let nTurnDuring: number = 0.4;                                              // 翻转时间
                    this._vHandCard[i].turn(delay, true);                                       // 开始翻转
                    delay += nTurnDuring;                                                       // 延时后显示牌型
                    this.scheduleOnce((elapsed: number): void => {
                        data.nForceShowedActLen = 0;                                            // 清空手牌动画标记
                        this._calculateCardType(data);                                          // 计算牌型
                    }, delay);
                }
            }
            else {
                this._vHandCard[i].setFace(false);
                this._vHandCard[i].updateCardFace();
                this._vHandCard[i].updateCardBack();
            }
        }

        // 公共牌堆
        let nSelfPubCardLen: number = 0;
        let bHaveBets: boolean = data.nPlayerBettingRoundBet > 0;
        for (let i: number = 0; i < this._vPubsCard.length; ++i) {
            // 恢复牌状态
            this._vPubsCard[i].node.active = true;
            this._vPubsCard[i].node.stopAllActions();
            this._vPubsCard[i].node.setScale(this._pubsCardScaleRatio);
            this._vPubsCard[i].node.opacity = 255;
            this._vPubsCard[i].setGary(false);
            this._vPubsCard[i].clearContent();
            this._vPubsCard[i].setGameID(data.nGameID);

            if (bHaveBets) {
                if (i < data.vPubsCards.length) {
                    // 老数据(这里的 LastRoundType 在牌局中服务器下发是-1的, 但是从data服下发是没有-1, 目的是为了给牌局回顾判断新老数据)
                    if (data.nLastRoundType <= 0) {
                        this._vPubsCard[i].node.active = true;
                        ++nSelfPubCardLen;
                    }
                    // 新数据逻辑
                    else {
                        switch (data.nLastRoundType) {
                            case GameReviewBettingRoundType.Enum_BettingRound_None: break;
                            case GameReviewBettingRoundType.Enum_BettingRound_Preflop: nSelfPubCardLen = 0; break;
                            case GameReviewBettingRoundType.Enum_BettingRound_Flop: nSelfPubCardLen = 3; break;
                            case GameReviewBettingRoundType.Enum_BettingRound_Turn: nSelfPubCardLen = 4; break;
                            case GameReviewBettingRoundType.Enum_BettingRound_River: nSelfPubCardLen = 5; break;
                            case GameReviewBettingRoundType.Enum_BettingRound_ShowDown: nSelfPubCardLen = 5; break;
                            default: break;
                        }
                        this._vPubsCard[i].node.active = i < nSelfPubCardLen;
                    }

                    // 填充牌内容
                    if (this._vPubsCard[i].node.active) {
                        this._vPubsCard[i].setFace(true);
                        this._vPubsCard[i].setContent(data.vPubsCards[i].eCardNum, data.vPubsCards[i].eCardSuit);
                        this._vPubsCard[i].updateCardFace();
                        this._vPubsCard[i].updateCardBack();
                    }
                }
                else {
                    this._vPubsCard[i].node.active = false;
                }
            }
            else {
                this._vPubsCard[i].node.active = false;
            }
        }

        // 弃牌(显示遮罩和文字)
        if (data.bFold) {
            this.img_head_sheild.node.active = true;
            let txt_head_sheild: cc.Label = this.img_head_sheild.node.getChildByName("txt").getComponent(cc.Label);
            txt_head_sheild.string = cv.config.getStringData("ActionTips1");
        }

        // "长/短"牌增加D图标显示(>=2个玩家都只显示D)
        // 000=default, 001=D, 010=SB, 100=BB
        this.img_d.node.active = (data.seatInfo & 1) === 1 && view.getCellTotalCount() >= 2;

        // 设置下注信息
        if (bHaveBets) this._setBetRoundsInfo(data);

        // 计算牌型(如果正在翻手牌动画则不显示牌型, 翻完手牌在显示牌型)
        if (data.nForceShowedActLen <= 0) {
            this._calculateCardType(data);
        }

        // 发发看(无检测 bHaveBets 条件, 这里的 data 数据都是牌桌参与者)
        this._checkSendOut(data, nSelfPubCardLen);
    }
}
