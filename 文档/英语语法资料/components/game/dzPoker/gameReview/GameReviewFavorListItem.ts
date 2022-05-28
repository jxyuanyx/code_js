import cv from "../../../../components/lobby/cv";
import { Card } from "../../../../components/game/dzPoker/Card";
import { TableView } from "../../../../common/tools/TableView";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";
import { HandCardType, GameReviewBettingRoundType, SimpleGameReviewFavorite } from "../../../../components/game/dzPoker/data/RecordData";

/**
 * 游戏类型
 */
enum eGameReviewFavorListItemToggleType {
    E_GRFLTT_NONE = 0,              // 无
    E_GRFLTT_TEXAS,                 // 德州
    E_GRFLTT_TEXAS_SHORT,           // 德州短牌
    E_GRFLTT_ZOOMTEXAS,             // 急速
    E_GRFLTT_BET,                   // 必下
    E_GRFLTT_PLO,                   // 奥马哈
    E_GRFLTT_STARSEAT,              // 明星桌
    E_GRFLTT_MTT,                   // MTT
    E_GRFLTT_AOF,                   // AOF
    E_GRFLTT_AOF_SHORT,             // AOF短牌
}

/**
 * 牌局回顾面板子项
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GameReviewFavorListItem extends cc.Component {

    @property(CustomToggle) toggle: CustomToggle = null;                    // 勾选项
    @property(cc.Node) panel_card: cc.Node = null;                          // 牌面板

    @property(cc.Sprite) img_pub_card_box_1: cc.Sprite = null;              // 1张公牌牌框
    @property(cc.Sprite) img_pub_card_box_3: cc.Sprite = null;              // 3张公牌牌框
    @property(cc.Sprite) img_pub_card_box_4: cc.Sprite = null;              // 4张公牌牌框

    @property(cc.Label) txt_profit: cc.Label = null;                        // 盈亏
    @property(cc.Label) txt_gametype: cc.Label = null;                      // 游戏类型

    private _vHandCard: Card[] = [];                                        // 手牌
    private _vPubsCard: Card[] = [];                                        // 共牌
    private _handCardScaleRatio: number = 1;                                // 手牌初始缩放比例
    private _pubsCardScaleRatio: number = 1;                                // 公牌初始缩放比例

    private _index: number = 0;
    private _data: SimpleGameReviewFavorite = null;
    private _view: TableView = null;


    static g_class_name: string = "GameReviewFavorListItem";
    static g_toggle_type = eGameReviewFavorListItemToggleType;
    static getToggleTypeTxtDesc(type: eGameReviewFavorListItemToggleType): string {
        // cv.config.getStringData("MainScene_Scene_pokerPage_panel_button0_text");                // 微
        // cv.config.getStringData("MainScene_Scene_pokerPage_panel_button1_text");                // 小
        // cv.config.getStringData("MainScene_Scene_pokerPage_panel_button2_text");                // 中
        // cv.config.getStringData("MainScene_Scene_pokerPage_panel_button3_text");                // 大

        let value: string = "";
        switch (type) {
            case eGameReviewFavorListItemToggleType.E_GRFLTT_TEXAS: value = "DataView_gameType_panel_button_0_text"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_TEXAS_SHORT: value = "DataView_gameType_panel_button_1_text"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_BET: value = "DataView_gameType_panel_button_4_text"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_ZOOMTEXAS: value = "DataView_data_panel_dataInfo_panel_zoomGame_button"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_MTT: value = "DataView_gameType_panel_button_6_text"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_AOF: value = "DataView_gameType_panel_button_2_text"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_AOF_SHORT: value = "DataView_gameType_panel_button_3_text"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_STARSEAT: value = "game_review_favor_list_game_type_start_seat_txt"; break;
            case eGameReviewFavorListItemToggleType.E_GRFLTT_PLO: value = "game_review_favor_list_game_type_plo_txt"; break;
        }

        if (value.length > 0) {
            value = cv.config.getStringData(value);
        }

        return value;
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);

        // 初始化牌组
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

        // 默认非勾选
        if (this.toggle) {
            this.toggle.isChecked = false;
            this.toggle.node.on("toggle", (toggle: CustomToggle): void => {
                cv.MessageCenter.send(`${GameReviewFavorListItem.g_class_name}_toggle`, { index: this._index, isCheck: toggle.isChecked });
            });
        }

        // 点击事件
        this.node.on("click", (): void => {
            cv.AudioMgr.playButtonSound('button_click');
            cv.MessageCenter.send(`${GameReviewFavorListItem.g_class_name}_click`, this._index);
        });
    }

    protected start(): void {
    }

    /**
     * 设置"输赢"金额
     * @param amount 
     */
    private _setWinAmount(amount): void {
        let winBet: number = cv.StringTools.clientGoldByServer(amount);
        winBet = cv.StringTools.numberToShowNumber(cv.StringTools.toFixed(winBet, 2, cv.StringTools.RoundingMode.ROUND_HALF_UP));

        this.txt_profit.string = cv.StringTools.getSignString(winBet);
        this.txt_profit.node.color = cv.StringTools.getSignColor(winBet);
    }

    /**
     * 发发看功能(显示额外看到的共牌, 只有该玩家下过注参与才生效)
     * @param data 
     * @param validPubCardLen 
     */
    private _checkSendOut(data: SimpleGameReviewFavorite, validPubCardLen: number): void {
        if (data.player_id !== cv.dataHandler.getUserData().u32Uid) return;

        let nSendOutOpacity: number = data.game_id === cv.Enum.GameId.Plo ? 255 : 255 / 2;      // 发发看的牌透明度
        let vALlPubCards: HandCardType[] = data.vPublicCards.concat(data.vUnsendPublicCards);   // 所有共牌
        let nCompletCardLen: number = data.vPublicCards.length - validPubCardLen;               // 当前所需的补牌长度

        // 刷新已发发看的状态
        let nRealSendOutLen: number = data.send_card_len - data.vPublicCards.length;
        if (nRealSendOutLen > 0) {
            for (let i = 0; i < this._vPubsCard.length; ++i) {
                if (i < data.send_card_len) {
                    this._vPubsCard[i].node.active = true;
                    this._vPubsCard[i].setFace(true);
                    this._vPubsCard[i].setContent(vALlPubCards[i].eCardNum, vALlPubCards[i].eCardSuit);
                    this._vPubsCard[i].updateCardFace();
                    this._vPubsCard[i].updateCardBack();

                    // 若存在公牌
                    if (i < data.vPublicCards.length) {
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
        }
    }

    /**
     * 更新数据 
     */
    updateSVReuseData(index: number, data: SimpleGameReviewFavorite, view?: TableView): void {
        this._index = index;
        this._data = data;
        this._view = view;

        // 重置相关控件状态
        this.img_pub_card_box_1.node.active = false;
        this.img_pub_card_box_3.node.active = false;
        this.img_pub_card_box_4.node.active = false;

        // 设置"输赢"金额
        this._setWinAmount(data.win_bet);

        // 手牌堆
        for (let i: number = 0; i < this._vHandCard.length; ++i) {
            // 恢复牌状态
            this._vHandCard[i].node.active = true;
            this._vHandCard[i].node.stopAllActions();
            this._vHandCard[i].node.setScale(this._handCardScaleRatio);
            this._vHandCard[i].node.opacity = 255;
            this._vHandCard[i].setGameID(data.game_id);

            if (i < data.vHandCards.length) {
                this._vHandCard[i].setFace(true);
                this._vHandCard[i].setContent(data.vHandCards[i].eCardNum, data.vHandCards[i].eCardSuit);
                this._vHandCard[i].updateCardFace();
                this._vHandCard[i].updateCardBack();
            }
            else {
                this._vHandCard[i].setFace(false);
                this._vHandCard[i].updateCardFace();
                this._vHandCard[i].updateCardBack();
            }
        }

        // 公共牌堆
        let validPubCardLen: number = 0;
        // 老数据(这里的 LastRoundType 在牌局中服务器下发是-1的, 但是从data服下发是没有-1, 目的是为了给牌局回顾判断新老数据)
        if (data.last_round_type <= 0) {
            validPubCardLen = data.vPublicCards.length;
        }
        // 新数据逻辑
        else {
            switch (data.last_round_type) {
                case GameReviewBettingRoundType.Enum_BettingRound_None: break;
                case GameReviewBettingRoundType.Enum_BettingRound_Preflop: validPubCardLen = 0; break;
                case GameReviewBettingRoundType.Enum_BettingRound_Flop: validPubCardLen = 3; break;
                case GameReviewBettingRoundType.Enum_BettingRound_Turn: validPubCardLen = 4; break;
                case GameReviewBettingRoundType.Enum_BettingRound_River: validPubCardLen = 5; break;
                case GameReviewBettingRoundType.Enum_BettingRound_ShowDown: validPubCardLen = 5; break;
                default: break;
            }
        }
        validPubCardLen = Math.min(validPubCardLen, data.vPublicCards.length);

        for (let i: number = 0; i < this._vPubsCard.length; ++i) {
            // 恢复牌状态
            this._vPubsCard[i].node.stopAllActions();
            this._vPubsCard[i].node.setScale(this._pubsCardScaleRatio);
            this._vPubsCard[i].node.opacity = 255;
            this._vPubsCard[i].node.active = i < validPubCardLen;
            this._vPubsCard[i].setGameID(data.game_id);

            // 填充牌内容
            if (this._vPubsCard[i].node.active) {
                this._vPubsCard[i].setFace(true);
                this._vPubsCard[i].setContent(data.vPublicCards[i].eCardNum, data.vPublicCards[i].eCardSuit);
                this._vPubsCard[i].updateCardFace();
                this._vPubsCard[i].updateCardBack();
            }
        }

        // 发发看(无检测 bHaveBets 条件, 这里的 data 数据都是牌桌参与者)
        this._checkSendOut(data, validPubCardLen);

        // 游戏类型
        this.txt_gametype.string = GameReviewFavorListItem.getToggleTypeTxtDesc(data.toggle_type);
        if (this.txt_gametype.string === "") {
            this.txt_gametype.string = `unknown(${data.game_id},${data.game_mode})`
        }

        // 是否勾选
        if (this.toggle) this.toggle.isChecked = data.isCheck;
    }
}
