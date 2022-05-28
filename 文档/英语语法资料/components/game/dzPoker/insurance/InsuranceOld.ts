import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../components/game/dzPoker/data/GameDataManager";

import { TagCom } from "../../../../common/tools/TagCom";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";

import { Card } from "../../../../components/game/dzPoker/Card";
import { FeeItem } from "../../../../components/game/dzPoker/data/RoomData";

import { InsuranceData } from "./InsuranceData";
import { InsuranceAllInItemData } from "./InsuranceAllInItem";
import { InsuranceOutsCardItemData } from "./InsuranceOutsCardItem";
import { TableView } from "../../../../common/tools/TableView";

/**
 *  牌局保险
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceOld extends cc.Component {
    @property(cc.Prefab) prefab_allin_info_item: cc.Prefab = null;                                      // "玩家allin信息"预制件
    @property(cc.Prefab) prefab_public_cards_item: cc.Prefab = null;                                    // "公共牌"预制件
    @property(cc.Prefab) prefab_outs_cards_item: cc.Prefab = null;                                      // "有效outs"预制件

    @property(cc.Node) panel: cc.Node = null;                                                           // 主面板
    @property(cc.Node) panel_shield: cc.Node = null;                                                    // 主面板的屏蔽面板
    @property(cc.Node) panel_self: cc.Node = null;                                                      // 个人操作面板
    @property(cc.Node) panel_buy: cc.Node = null;                                                       // 购买按钮面板

    @property(cc.ScrollView) scrollview_allin_info: cc.ScrollView = null;                               // allin 信息 滚动视图
    @property(cc.ScrollView) scrollview_public_cards: cc.ScrollView = null;                             // 公共牌 滚动视图
    @property(cc.ScrollView) scrollview_outs_cards: cc.ScrollView = null;                               // outs 滚动视图

    @property(cc.Label) txt_selected: cc.Label = null;                                                  // 已选x张
    @property(cc.Label) txt_odds_rate: cc.Label = null;                                                 // 赔率范围文本
    @property(cc.Label) txt_insurance_time_price: cc.Label = null;                                      // 保险延时价格
    @property(cc.Label) txt_insurance_time_down: cc.Label = null;                                       // 保险倒计时

    @property(cc.Label) txt_tips_waitting: cc.Label = null;                                             // 等待提示
    @property(cc.Label) txt_tips_self: cc.Label = null;                                                 // 个人面板的提示
    @property(cc.Label) txt_tips_other: cc.Label = null;                                                // 限制提示

    @property(cc.Label) txt_chips_insurance: cc.Label = null;                                           // 可投保额(投保人所能赢的最大池,也就是这部分可以投保)
    @property(cc.Label) txt_chips_pot: cc.Label = null;                                                 // 底池(当前有效池总和 =  主池 + 有效边池)
    @property(cc.Label) txt_chips_invest: cc.Label = null;                                              // 当前投入(当前投保人 allin 数)

    @property(cc.Label) txt_insure_pay: cc.Label = null;                                                // 当前需支付的投保额
    @property(cc.Label) txt_insure_odds: cc.Label = null;                                               // 当前系统的赔付额

    @property(CustomToggle) toggle_select_all: CustomToggle = null;                                     // 全选
    @property(cc.Button) btn_addTime: cc.Button = null;                                                 // 保险延时
    @property(cc.Button) btn_buy_ensure: cc.Button = null;                                              // 购买
    @property(cc.Button) btn_buy_cancel: cc.Button = null;                                              // 不买

    @property(cc.Slider) slider: cc.Slider = null;                                                      // 滑动条
    @property(cc.Sprite) slider_sp: cc.Sprite = null;                                                   // 滑块精灵

    static gClassName: string = "InsuranceOld";

    private _insuranceData: InsuranceData.InsuranceData = null;                                         // 数据层对象

    private _bInit: boolean = false;                                                                    // 是否初始化
    private _nChipsInsurance: number = 0;                                                               // 可投保额 数值
    private _nChipsPot: number = 0;                                                                     // 底池 数值
    private _nChipsInvest: number = 0;                                                                  // 当前投入 数值

    private _nInsurePay: number = 0;                                                                    // 当前需支付的投保额 数值
    private _nInsureOdds: number = 0;                                                                   // 当前系统的赔付额 数值

    private _bShowingAction: boolean = false;                                                           // 是否正在 show
    private _bHidingAction: boolean = false;                                                            // 是否正在 hide
    private _bParseOddsRateOnce: boolean = false;                                                       // 解析赔率标记

    private _vInsuranceRates: number[] = [];                                                            // 保险赔率数组
    private _nInsuranceTimeDown: number = 0;                                                            // 保险倒计时
    private _nBuyBackAmount: number = 0;                                                                // 强制带回的金额(只针对river轮)
    private _bTurnInsurance: boolean = false;                                                           // 是否是turn轮保险
    private _nMaxInsuredAmount: number = 0;                                                             // 本轮最大投保额
    private _nMaxRealInsuredAmount: number = 0;                                                         // 本轮实际最大投保额
    private _vToggleInsuredPay: CustomToggle[] = [];                                                    // 投保底池数额单选组
    private _vOutsCardsData: InsuranceOutsCardItemData[] = [];                                          // outs 牌数据

    private _btn_buy_ensure_src_frame: cc.SpriteFrame = null;                                           // 购买按钮原始精灵块
    private _btn_cancel_src_frame: cc.SpriteFrame = null;                                               // 不买按钮原始精灵块

    private _txt_self_tips_src_pos: cc.Vec2 = cc.Vec2.ZERO;                                             // 个人面板的提示 原始坐标
    private _panel_buy_src_pos: cc.Vec2 = cc.Vec2.ZERO;                                                 // 购买按钮面板 原始坐标

    /**
     * 初始化
     * @param entrance 
     * @param data 
     */
    init(): void {
        if (this._bInit) return;
        this._bInit = true;

        // 玩家 allin 信息
        let sv_allin_info: TableView = this.scrollview_allin_info.getComponent(TableView);
        sv_allin_info.generatePoolInst("InsuranceAllInItem", 4);

        // 公共牌
        let sv_public_card: TableView = this.scrollview_public_cards.getComponent(TableView);
        sv_public_card.generatePoolInst("InsurancePublicCardItem", 4);

        // outs
        let sv_outs_card: TableView = this.scrollview_outs_cards.getComponent(TableView);
        sv_outs_card.generatePoolInst("InsuranceOutsCardItem", 2);

        // 隐藏自身节点
        this.node.active = false;
    }

    /**
     * 绑定保险"入口层, 数据层"对象
     * @param data 
     */
    bindDataTarget(data: InsuranceData.InsuranceData): void {
        this._insuranceData = data;
    }

    /**
     * 自动显示
     * @param viewMode 
     * @param parentNode 
     * @param zorder 
     * @param bAnim 
     */
    autoShow(bAnim: boolean = true, leftTime: number): void {
        if (this.node.active || this._bShowingAction || this._bHidingAction) return;

        // pos
        let parentNode: cc.Node = this.node.parent;
        let parentNode_w: number = parentNode.width;
        let parentNode_h: number = parentNode.height;
        if (parentNode_w <= 0) parentNode_w = cc.winSize.width;
        if (parentNode_h <= 0) parentNode_h = cc.winSize.height;
        let pos: cc.Vec2 = cc.v2((this.node.anchorX - parentNode.anchorX) * parentNode_w, (this.node.anchorY - parentNode.anchorY) * parentNode_h);

        // action
        if (bAnim) {
            this.node.active = true;
            this.node.stopAllActions();
            this.node.setPosition(pos);

            cv.action.removeShowActionShieldLayer(this.node);
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_LEFT
                , cv.action.eMoveActionType.EMAT_FADE_IN
                , cv.action.delay_type.FAST
                , (target: cc.Node, actIO: number): void => { this._bShowingAction = true; }
                , (target: cc.Node, actIO: number): void => { this._bShowingAction = false; });
        }
        else {
            this.node.active = true;
            this.node.stopAllActions();
            this.node.setPosition(pos);

            this._bShowingAction = false;
            cv.action.removeShowActionShieldLayer(this.node);
        }

        // update
        this._updateView(leftTime);
    }

    /**
     * 自动隐藏
     */
    autoHide(bAnim: boolean = true): void {
        let parentNode: cc.Node = this.node.parent;
        if (!parentNode || !this.node.active) return;

        let stopAll: Function = (): void => {
            this._bShowingAction = false;
            this.node.stopAllActions();
            cv.action.removeShowActionShieldLayer(this.node);
            cc.director.getScheduler().unscheduleAllForTarget(this.node);
        }

        let parentNode_w: number = parentNode.width;
        let parentNode_h: number = parentNode.height;
        if (parentNode_w <= 0) parentNode_w = cc.winSize.width;
        if (parentNode_h <= 0) parentNode_h = cc.winSize.height;
        let pos: cc.Vec2 = cc.v2((this.node.anchorX - parentNode.anchorX) * parentNode_w, (this.node.anchorY - parentNode.anchorY) * parentNode_h);

        if (bAnim && !this._bHidingAction) {
            stopAll();
            this.node.setPosition(pos);
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_RIGHT
                , cv.action.eMoveActionType.EMAT_FADE_OUT
                , cv.action.delay_type.FAST
                , (target: cc.Node, actIO: number): void => { this._bHidingAction = true; }
                , (target: cc.Node, actIO: number): void => { this._bHidingAction = false; });
        }
        else {
            stopAll();
            this.node.setPosition(pos);
            this.node.active = false;
            this._bHidingAction = false;
        }
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node);

        this._btn_buy_ensure_src_frame = this.btn_buy_ensure.getComponent(cc.Sprite).spriteFrame;
        this._btn_cancel_src_frame = this.btn_buy_cancel.getComponent(cc.Sprite).spriteFrame;

        this._txt_self_tips_src_pos = cc.v2(this.txt_tips_self.node.position);
        this._panel_buy_src_pos = cc.v2(this.panel_buy.position);

        this.btn_buy_ensure.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._reqBuy();
        }, this);

        this.btn_buy_cancel.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._reqNotBuy();
        }, this);

        this.btn_addTime.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._reqAddInsuranceTime();
        }, this);

        this.slider.node.on("slide", (event: cc.Event): void => { this._onSliderEvent(); }, this);

        // 全选
        this.toggle_select_all.node.on("toggle", (sender: CustomToggle): void => { this._onToggleSelectedAll(); }, this);

        // 保本, 1/2池, 等利, 满池
        let panel_toggle: cc.Node = this.panel_self.getChildByName("panel_toggle");
        if (panel_toggle) {
            for (let i = 0; i < panel_toggle.childrenCount; ++i) {
                let toggle: CustomToggle = panel_toggle.children[i].getComponent(CustomToggle);
                let tagCom: TagCom = toggle.node.getComponent(TagCom);
                if (!tagCom) tagCom = toggle.node.addComponent(TagCom);
                switch (i) {
                    case 0: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_BreakEven; break;
                    case 1: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_HalfPot; break;
                    case 2: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_EqualInterest; break;
                    case 3: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FullPot; break;
                    default: break;
                }
                toggle.node.on("toggle", this._onToggleGroupEvent, this);
                this._vToggleInsuredPay.push(toggle);
            }
        }
    }

    protected start(): void {
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerEvent();
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterEvent();
        }
    }

    private _registerEvent(): void {
        cv.MessageCenter.register("update_insurance_time", this._onMsgUpdateInsuranceTime.bind(this), this.node);
        cv.MessageCenter.register("click_insurance_outs_card_item", this._onMsgClickInsuranceOutsCardItem.bind(this), this.node);
        cv.MessageCenter.register("ChangeCard_onClickCardFace", this._onMsgChangeCardFace.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("update_insurance_time", this.node);
        cv.MessageCenter.unregister("click_insurance_outs_card_item", this.node);
        cv.MessageCenter.unregister("ChangeCard_onClickCardFace", this.node);
    }

    /**
     * 更新视图
     */
    private _updateView(leftTime: number): void {
        this._parseInsuranceRatesOnce();                                                        // 解析赔率

        this._resetAllUI();                                                                     // 重置数据
        this._updateStaticTxt();                                                                // 更新静态文本
        this._updateViewPerspective();                                                          // 更新视图视角(用于激活点击事件)

        this._resetInsuranceTimeDown(leftTime);                                                 // 重置保险倒计时
        this._updateInsuranceTimeDownPrice();                                                   // 更新延时价格

        this._setPotInfo(this._insuranceData.getDataInsurance());                               // 底池信息
        this._updateAllInInfo();                                                                // 更新玩家牌
        this._updatePublicCards();                                                              // 更新公共牌
        this._updateOutsCards();                                                                // 更新 outs 牌

        this._resetSlider();                                                                    // 重置滑动条
        this._updateOutsSelected();                                                             // 更新outs选中状态

        // 额外视图信息(回放模式)
        if (this._insuranceData.getViewMode() === InsuranceData.InsuranceViewMode.VIEW_REPLAY) {
            this._updateViewExReplay();
        }
    }

    /**
     * 更新回放视图
     */
    private _updateViewExReplay(): void {
        // 标题 - "保险回放"
        let txt_title: cc.Label = this.panel.getChildByName("txt_title").getComponent(cc.Label);
        txt_title.string = cv.config.getStringData("UITitle123");

        // 停止倒计时
        this._resetInsuranceTimeDown(0);

        // 禁用相关事件
        do {
            // 禁用整个面板点击
            this.panel_shield.active = true;

            // 禁用outs点击
            this._setOutsCardsTouchEnanled(false);
        } while (false);

        // 设置投保所占滑条百分比
        if (this._insuranceData.getDataInsuranceReplay().isBuyInsurance) {
            // 以下发字段是否勾选为准
            let toggleIdx: number = cv.Number(this._insuranceData.getDataInsuranceReplay().option) - 1;
            if (toggleIdx >= 0 && toggleIdx < this._vToggleInsuredPay.length) {
                this._vToggleInsuredPay[toggleIdx].check();
            }
            // 兼容老数据(老数据无"option"勾选字段)
            else {
                let insuredAmounts: number = cv.StringTools.clientGoldByServer(this._insuranceData.getDataInsuranceReplay().insuredAmounts);
                insuredAmounts = Math.min(insuredAmounts, this._nMaxRealInsuredAmount);
                this._setSliderProgress(cv.StringTools.div(insuredAmounts, this._nMaxRealInsuredAmount));
                this._updateSliderPercent(true);
            }
        }

        // 设置按钮高亮状态
        do {
            let bBuyinsurance: boolean = this._insuranceData.getDataInsuranceReplay().isBuyInsurance;
            this.btn_buy_ensure.enabled = bBuyinsurance;
            this.btn_buy_ensure.interactable = bBuyinsurance;

            this.btn_buy_cancel.enabled = !bBuyinsurance;
            this.btn_buy_cancel.interactable = !bBuyinsurance;

            this.btn_buy_ensure.getComponent(cc.Sprite).spriteFrame = bBuyinsurance ? this._btn_buy_ensure_src_frame : this._btn_cancel_src_frame;
            this.btn_buy_cancel.getComponent(cc.Sprite).spriteFrame = bBuyinsurance ? this._btn_cancel_src_frame : this._btn_buy_ensure_src_frame;
        } while (false);
    }

    /**
     * 重置所有ui和相关数据
     */
    private _resetAllUI(): void {
        // 重置保险延时
        do {
            this._resetInsuranceTimeDown(0);
            this._updateInsuranceTimeDownPrice();
        } while (false);

        // 重置赔率面板
        do {
            this.txt_odds_rate.string = "0";
            this.txt_selected.string = cv.StringTools.formatC(cv.config.getStringData("UITitle88"), 0);
            this.toggle_select_all.enabled = true;
            this.toggle_select_all.isChecked = true;
        } while (false);

        // 重置self面板
        do {
            // 底池
            this._setChipsInsureNum(0);
            this._setChipsPotNum(0);
            this._setChipsInvestNum(0);

            // 投保单选按
            for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
                this._vToggleInsuredPay[i].isChecked = false;
            }

            // lable
            this._setInsurePayOddsNum(0);

            // slider
            this._setSliderProgress(0, false);
            this._resetToggleGroupStatus(false);

            // self tips
            this.txt_tips_self.string = "";
            this.txt_tips_self.node.active = false;
        } while (false);

        // other tips
        do {
            this.txt_tips_other.string = "";
            this.txt_tips_other.node.active = false;
        } while (false);
    }

    /**
     * 更新视图视角
     */
    private _updateViewPerspective(): void {
        let bSelf: boolean = this._insuranceData.getDataIsSelfBuy();
        this.panel_shield.active = !bSelf;
        this.panel_self.active = bSelf;
        this.txt_tips_waitting.node.active = !bSelf;
    }

    /**
     * 获取已选outs的tag索引数组
     */
    private _getSelectOutsCardTag(): number[] {
        let vRet: number[] = [];
        for (let i = 0; i < this._vOutsCardsData.length; ++i) {
            if (this._vOutsCardsData[i].isCheck) {
                vRet.push(this._vOutsCardsData[i].outItem.outs_id);
            }
        }
        return vRet;
    }

    /**
     * 获取当前赔率
     */
    private _getCurrentRate(): number {
        let nRet = 0;
        nRet = this._getRateByOuts(this._getSelectOutsCardTag().length);
        return nRet;
    }

    /**
     * 获取已选outs对应的赔率
     * @param count 
     */
    private _getRateByOuts(count: number): number {
        let nRet: number = 0;
        count = cv.Number(count);
        if (count > 0 && this._vInsuranceRates.length > 0) {
            let index = Math.min(count - 1, this._vInsuranceRates.length - 1);
            index = Math.max(0, index);
            nRet = this._vInsuranceRates[index];
        }
        return nRet;
    }

    /**
     * 获取当前勾选按钮的索引所对应的投保金额
     * @param index 
     */
    private _getInsuranceByToggleIdx(index: InsuranceData.InsurancePayToggleIdx): number {
        let nRet: number = 0;
        let nCurRate = this._getCurrentRate();

        switch (index) {
            case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_BreakEven: {
                nRet = cv.StringTools.div(this._nChipsInvest, nCurRate);
            } break;

            case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_HalfPot: {
                nRet = cv.StringTools.div(this._nChipsInsurance, 2);
                nRet = cv.StringTools.div(nRet, nCurRate);
            } break;

            case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_EqualInterest: {
                nRet = cv.StringTools.plus(nCurRate, 1);
                nRet = cv.StringTools.div(this._nChipsInsurance, nRet);
            } break;

            case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FullPot: {
                nRet = cv.StringTools.div(this._nChipsInsurance, nCurRate);
            } break;

            default: break;
        }

        return cv.Number(nRet);
    }

    /**
     * 检测房间是否设置允许仅购买部分outs
     */
    private _isAllowOutsSelected(): boolean {
        if (!gameDataMgr.tRoomData.m_bChooseOuts) {
            cv.TT.showMsg(cv.config.getStringData("UICantChooseOuts"), cv.Enum.ToastType.ToastTypeDefault);
            return false;
        }
        return true;
    }

    /**
     *  更新outs选中状态
     * @param bCheckSelectAll
     */
    private _updateOutsSelected(bCheckSelectAll: boolean = true): void {
        let vSelectedOutsCardLen: number = cv.StringTools.getArrayLength(this._getSelectOutsCardTag());

        // 检测是否勾选全选按钮
        if (bCheckSelectAll) {
            this.toggle_select_all.isChecked = vSelectedOutsCardLen === this._vOutsCardsData.length;
        }

        // 已选x张
        this.txt_selected.string = cv.StringTools.formatC(cv.config.getStringData("UITitle88"), vSelectedOutsCardLen);

        // 更新赔率文本
        let str_key: string = cv.config.getStringData("Insurance_bg_peilv_wordtext");
        let str_value: string = cv.StringTools.formatC("1-%s", this._getCurrentRate());
        this.txt_odds_rate.string = cv.StringTools.formatC(str_key, str_value);

        // 未勾选任何outs时, 禁用滑条/投保等选项
        let bEnable: boolean = !(vSelectedOutsCardLen === 0);
        this._resetSlider(bEnable);
        this._checkBuyBackTip();
    }

    /**
     * 更新静态文本
     */
    private _updateStaticTxt(): void {
        // 标题
        do {
            let txt_title: cc.Label = this.panel.getChildByName("txt_title").getComponent(cc.Label);
            txt_title.string = cv.config.getStringData("UITitle42");
        } while (false);

        // 倒计时
        do {
            let txt_left_time_word: cc.Label = this.panel.getChildByName("txt_left_time_word").getComponent(cc.Label);
            txt_left_time_word.string = cv.config.getStringData("Insurance_bg_signScore_text_0");
        } while (false);

        // 公共牌 
        do {
            let txt_pub_card: cc.Label = this.panel.getChildByName("txt_pub_card").getComponent(cc.Label);
            txt_pub_card.string = cv.config.getStringData("Insurance_bg_pulbicWord_textBg_pulbicWord_text");
        } while (false);

        // 全选
        do {
            let txt_select_all_word: cc.Label = this.panel.getChildByName("txt_select_all_word").getComponent(cc.Label);
            txt_select_all_word.string = cv.config.getStringData("Insurance_bg_selectAll_txt");
        } while (false);

        // 个人面板
        do {
            // 单选按钮
            for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
                let txt: cc.Label = this._vToggleInsuredPay[i].node.getChildByName("txt").getComponent(cc.Label);
                let tagCom: TagCom = this._vToggleInsuredPay[i].node.getComponent(TagCom);
                txt.string = cv.config.getStringData(`Insurance_bg_self_panel_toggle_${tagCom.nTag}`);
            }

            // 购买
            let txt_btn_buy_ensure: cc.Label = this.btn_buy_ensure.node.getChildByName("txt").getComponent(cc.Label);
            txt_btn_buy_ensure.string = cv.config.getStringData("Insurance_bg_self_panel_buy_button");

            // 不买
            let txt_btn_buy_cancel: cc.Label = this.btn_buy_cancel.node.getChildByName("txt").getComponent(cc.Label);
            txt_btn_buy_cancel.string = cv.config.getStringData("Insurance_bg_self_panel_noBuy_button");
        } while (false);

        // 等待其他人买保险
        do {
            this.txt_tips_waitting.string = cv.config.getStringData("Insurance_bg_waiting_text");
        } while (false);
    }

    /**
     * 设置滑条进度值
     * @param progress 
     * @param bTouchEnabled 
     */
    private _setSliderProgress(progress: number, bTouchEnabled: boolean = true): void {
        progress = Math.max(0, progress);
        progress = Math.min(1, progress);

        // 更新滑条UI
        this.slider.progress = progress;
        this.slider_sp.node.width = this.slider.progress * this.slider.node.width;
        this.slider.enabled = bTouchEnabled;
        this.slider.handle.interactable = bTouchEnabled;
        this.slider.handle.enabled = bTouchEnabled;
    }

    /**
     * 重置滑动条
     * @param bEnable 
     */
    private _resetSlider(bEnable: boolean = true): void {
        this._setSliderProgress(0, bEnable);
        this._resetToggleGroupStatus(bEnable);

        // 满池保险费
        let nFullInsuranceAmount: number = this._getInsuranceByToggleIdx(InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FullPot);

        // 剩余未勾选的outs赔率
        let nLeftRate: number = this._getRateByOuts(this._vOutsCardsData.length - this._getSelectOutsCardTag().length);

        // 最大投保额的 1/3
        let nRealMaxInsuredAmount: number = cv.StringTools.div(this._nMaxInsuredAmount, 3);

        // turn轮保险
        if (this._bTurnInsurance) {
            // 勾选部分outs
            if (nLeftRate > 0) {
                let nBuyBackAmount: number = cv.StringTools.div(nFullInsuranceAmount, nLeftRate);
                if (nBuyBackAmount === 0) nBuyBackAmount = 1;

                if (cv.StringTools.plus(nFullInsuranceAmount, nBuyBackAmount) <= nRealMaxInsuredAmount) {
                    this._nMaxRealInsuredAmount = nFullInsuranceAmount;
                }
                else {
                    // 以下算法:    t: 实际投保额, r: 剩余outs赔率, a: 1/3 最大投保额
                    // 公式:        t + t/r = a => t = ar/(r + 1) = > t = a - a/(r + 1)
                    let nAmount: number = cv.StringTools.div(nRealMaxInsuredAmount, cv.StringTools.plus(1, nLeftRate));
                    nAmount = cv.StringTools.minus(nRealMaxInsuredAmount, nAmount);
                    let nBackAmount: number = cv.StringTools.div(nAmount, nLeftRate);
                    let nTotalAmount: number = cv.StringTools.plus(nAmount, nBackAmount);
                    if (nTotalAmount > nRealMaxInsuredAmount) {
                        let nOffset: number = cv.StringTools.minus(nTotalAmount, nRealMaxInsuredAmount);
                        nAmount = cv.StringTools.minus(nAmount, nOffset);
                    }
                    this._nMaxRealInsuredAmount = nAmount;
                }
            }
            // 全选outs
            else {
                this._nMaxRealInsuredAmount = Math.min(nFullInsuranceAmount, nRealMaxInsuredAmount);
            }
        }
        // river轮保险
        else {
            if (nLeftRate > 0) {
                let nBuyBackAmount = cv.StringTools.div(nFullInsuranceAmount, nLeftRate);
                if (nBuyBackAmount === 0) nBuyBackAmount = 1;

                if (cv.StringTools.plus(nFullInsuranceAmount, nBuyBackAmount) <= this._nMaxInsuredAmount) {
                    this._nMaxRealInsuredAmount = nFullInsuranceAmount;
                }
                else {
                    this._nMaxRealInsuredAmount = this._nMaxInsuredAmount;
                }
            }
            else {
                this._nMaxRealInsuredAmount = Math.min(nFullInsuranceAmount, this._nMaxInsuredAmount);
            }
        }

        // 设置投保额/赔付额
        this._setInsurePayOddsNum(this._nBuyBackAmount);

        // 系统不提供赔率低于1.0的保险
        do {
            this.txt_tips_other.node.active = this._getCurrentRate() <= 1.0;
            if (this.txt_tips_other.node.active) {
                let strDesc: string = cv.config.getStringData("UIGameSceneTips18");
                this.txt_tips_other.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_other.node, strDesc);
            }
        } while (false);
    }

    /**
     * 滑条滑动事件
     */
    private _onSliderEvent(): void {
        let progress = this.slider.progress;
        let percent: number = this._nMaxRealInsuredAmount;
        if (this._insuranceData.getDataIsMirco()) percent *= 100;
        if (percent > 0) {
            percent = Math.min(percent, this.slider.node.width);
            let sliderPerRatio: number = cv.StringTools.div(1, percent);
            percent = Math.ceil(cv.StringTools.div(progress, sliderPerRatio));
            progress = cv.StringTools.times(percent, sliderPerRatio);
        }

        this._setSliderProgress(progress);
        this._updateSliderPercent();
    }

    /**
     * 更新滑动条百分比
     * @param bCheckToggleGroup 
     */
    private _updateSliderPercent(bCheckToggleGroup: boolean = true): void {
        let nAmout: number = 0;
        let nFullPot: number = this._nChipsInsurance;
        let nSliderAmount: number = cv.StringTools.times(this.slider.progress, this._nMaxRealInsuredAmount);

        if (nSliderAmount <= nFullPot) {
            nAmout = cv.StringTools.plus(nSliderAmount, this._nBuyBackAmount);
        }
        else {
            this._setSliderProgress(1);
            nAmout = cv.StringTools.div(nFullPot, this._getCurrentRate());
        }

        // 设置投保额/赔付额
        this._setInsurePayOddsNum(nAmout);

        // 若有未选中的outs, 则检测强制带回提示
        this._checkBuyBackTip();

        // 更友好的ui检测(检索滑条滑动的值是否等于单选按钮对应的值, 如果相等, 则设置对应单选按钮为选中状态)
        if (bCheckToggleGroup) {
            this._resetToggleGroupStatus();
            for (let i = this._vToggleInsuredPay.length - 1; i >= 0; --i) {
                this._vToggleInsuredPay[i].isChecked = false;
                let nRealSliderAmount = this._getRealGameNumberDown(nSliderAmount, true);
                let nRealToggleInsurance = 0;

                // 当前勾选按钮对应的投保额
                let tagCom: TagCom = this._vToggleInsuredPay[i].getComponent(TagCom);
                let nInv: number = this._getInsuranceByToggleIdx(tagCom.nTag);

                // 剩余outs数量(当前强制购买剩余outs投保额)
                let nLeftAmount: number = 0;
                let nLeftOuts: number = this._vOutsCardsData.length - this._getSelectOutsCardTag().length;
                if (nLeftOuts > 0) {
                    let nLeftRate: number = this._getRateByOuts(nLeftOuts);
                    nLeftAmount = cv.StringTools.div(nInv, nLeftRate);
                }

                if (cv.StringTools.plus(nInv, nLeftAmount) <= this._nMaxRealInsuredAmount) {
                    nRealToggleInsurance = nInv;
                }
                else {
                    nRealToggleInsurance = this._nMaxRealInsuredAmount;
                }

                nRealToggleInsurance = this._getRealGameNumberDown(nRealToggleInsurance, true);
                if (nRealToggleInsurance > 0 && nRealToggleInsurance === nRealSliderAmount) {
                    this._vToggleInsuredPay[i].isChecked = true;
                    this._updateToggleGroupTxtColor();
                    break;
                }
            }
        }
    }

    /**
     * 解析保险赔率
     * @param mode 
     */
    private _parseInsuranceRatesOnce(): void {
        if (this._bParseOddsRateOnce) return;
        this._bParseOddsRateOnce = true;
        this._vInsuranceRates = [];

        let game_mode: number = gameDataMgr.tRoomData.pkRoomParam.game_mode;
        let strRate: string = "";

        switch (game_mode) {
            case cv.Enum.CreateGameMode.CreateGame_Mode_Normal: {
                strRate = cv.config.getStringData("NormalTypeInsuranceRate");
            } break;

            default: {
                strRate = cv.config.getStringData("ShortTypeInsuranceRate");
            } break;
        }

        let vRates: string[] = strRate.split(',')
        for (let i = 0; i < cv.StringTools.getArrayLength(vRates); ++i) {
            this._vInsuranceRates.push(cv.Number(vRates[i]));
        }
    }

    /**
     * 买"保险"(不支持赔率 < 1.0)
     */
    private _reqBuy(): void {
        if (this._getCurrentRate() > 1.0) {
            let vOuts: number[] = this._getSelectOutsCardTag();
            if (cv.StringTools.getArrayLength(vOuts) > 0) {

                // 购买保险的投保额(这里只需计算百分比的值, 强制带回部分由服务器计算)
                let nAmount: number = this._getRealGameNumberDown(this.slider.progress * this._nMaxRealInsuredAmount, this._insuranceData.getDataIsMirco());
                if (nAmount <= 0) return;

                // 若 turn 轮, 购买的金额超过底池1/3则 return
                if (this._bTurnInsurance && nAmount > this._nMaxRealInsuredAmount) {
                    let strTips = cv.config.getStringData("ServerErrorCode61");
                    //strTips = strTips + cv.StringTools.formatC("-p<%.2f>a<%.2f>m<%.2f>", this.slider.progress, nAmount, this._nMaxRealInsuredAmount);
                    cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeWarning);
                    return;
                }

                let checkIdx: number = this._getToggleGroupCheckIndex();
                cv.gameNet.RequestBuyInsurance(cv.GameDataManager.tRoomData.u32RoomId, vOuts, nAmount, true, checkIdx + 1);
            }
            else {
                this._reqNotBuy();
            }
        }
        else {
            // 系统不提供赔率低于1.0的保险
            cv.TT.showMsg(cv.config.getStringData("UIGameSceneTips18"), cv.Enum.ToastType.ToastTypeWarning);
        }
    }

    /**
     * 不买"保险"
     */
    private _reqNotBuy(): void {
        let vOuts: number[] = this._getSelectOutsCardTag();
        cv.gameNet.RequestBuyInsurance(cv.GameDataManager.tRoomData.u32RoomId, vOuts, 0, false, 0);
    }

    /**
     * 保险延时
     */
    private _reqAddInsuranceTime(): void {
        // 请求保险延时
        cv.gameNet.RequestAddInsuranceTime(gameDataMgr.tRoomData.u32RoomId);
    }

    /**
     * 保险延时 回调
     * @param data 
     */
    private _onMsgUpdateInsuranceTime(cd: number): void {
        // 重置保险倒计时
        this._resetInsuranceTimeDown(cd);

        // 更新延时价格
        this._updateInsuranceTimeDownPrice();
    }

    /**
     * 点击 outs 牌 事件回调
     * @param card 
     * @param data 
     */
    private _onMsgClickInsuranceOutsCardItem(param: { card: Card, data: InsuranceOutsCardItemData }): void {
        if (!this._isAllowOutsSelected()) return;

        param.card.setCheck(!param.card.isCheck());
        param.data.isCheck = param.card.isCheck();

        for (let i = 0; i < this._vOutsCardsData.length; ++i) {
            if (param.data.index === this._vOutsCardsData[i].index) {
                this._vOutsCardsData[i].isCheck = param.card.isCheck();
                break;
            }
        }

        this._updateOutsSelected();
    }

    /**
     * 更新牌面风格
     */
    private _onMsgChangeCardFace(): void {
        this.scrollview_allin_info.getComponent(TableView).refreshView();       // allin
        this.scrollview_public_cards.getComponent(TableView).refreshView();     // 公共牌
        this.scrollview_outs_cards.getComponent(TableView).refreshView();       // outs
    }

    /**
     * 重置保险倒计时
     * @param cd 
     */
    private _resetInsuranceTimeDown(cd: number): void {
        this._nInsuranceTimeDown = Math.max(0, cv.Number(cd));
        this._setInsuranceTimeDown(this._nInsuranceTimeDown);

        this.unschedule(this._onScheduleInsuranceTimeDown);
        if (this._nInsuranceTimeDown > 0) this.schedule(this._onScheduleInsuranceTimeDown, 1.0);
    }

    /**
     * 设置保险倒计时
     * @param cd 
     */
    private _setInsuranceTimeDown(cd: number): void {
        cd = cv.Number(cd);
        this.txt_insurance_time_down.string = cv.StringTools.formatC("%ds", cd);
    }

    /**
     * 更新保险倒计时
     */
    private _onScheduleInsuranceTimeDown(): void {
        this._nInsuranceTimeDown -= 1;
        if (this._nInsuranceTimeDown <= 0) {
            this._nInsuranceTimeDown = 0;
            this.unschedule(this._onScheduleInsuranceTimeDown);
            this.autoHide();
        }
        this._setInsuranceTimeDown(this._nInsuranceTimeDown);
    }

    /**
     * 更新保险延时价格/按钮状态
     */
    private _updateInsuranceTimeDownPrice(): void {
        let nCount: number = gameDataMgr.tRoomData.pkPayMoneyItem.insuranceCount;
        let vFee: FeeItem[] = gameDataMgr.tRoomData.pkPayMoneyItem.insuranceCountsFee;
        let nIndex: number = 0;
        let nPrice: number = 0;
        let bBtnEnable: boolean = true;
        if (cv.StringTools.getArrayLength(vFee) > 0) {
            for (let i = 0; i < vFee.length; ++i) {
                if (nCount >= vFee[i].startCount && nCount <= vFee[i].endCount) {
                    nIndex = i;
                    break;
                }
            }

            nPrice = vFee[nIndex].needCoin;
            bBtnEnable = nCount <= vFee.length;
        }

        // 延时价格
        this.txt_insurance_time_price.string = cv.StringTools.serverGoldToShowString(nPrice);

        // 延时按钮状态
        this.btn_addTime.interactable = bBtnEnable;
        this.btn_addTime.enabled = bBtnEnable;
    }

    /**
     * 底池
     * @param insuranceData 
     */
    private _setPotInfo(insuranceData: game_pb.NoticeGameInsurance): void {
        this._setChipsInsureNum(cv.StringTools.clientGoldByServer(cv.StringTools.plus(insuranceData.pot_amount, insuranceData.limit_amount)));
        this._setChipsPotNum(cv.StringTools.clientGoldByServer(insuranceData.total_pot));
        this._setChipsInvestNum(cv.StringTools.clientGoldByServer(insuranceData.total_inv_amount));

        this._bTurnInsurance = insuranceData.public_cards.length < 4;

        let nBuyBack: number = 0;
        if (insuranceData.limit_amount !== 0) {
            let nBackRate: number = this._getRateByOuts(this._insuranceData.getDataOutsCards().length);
            if (nBackRate === 0) {
                nBuyBack = this._insuranceData.getDataIsMirco() ? 1 : 100;
            }
            else {
                nBuyBack = cv.StringTools.div(insuranceData.limit_amount, nBackRate);
                nBuyBack = Math.ceil(nBuyBack);
            }
        }

        this._nMaxInsuredAmount = cv.StringTools.clientGoldByServer(cv.StringTools.minus(insuranceData.pot_amount, nBuyBack));
        this._nBuyBackAmount = cv.StringTools.clientGoldByServer(nBuyBack);
        this._nBuyBackAmount = this._getRealGameNumberDown(this._nBuyBackAmount, this._insuranceData.getDataIsMirco());
    }

    /**
     * 设置 Outs 牌组 是否能接受点击事件
     * @param enabled 
     */
    private _setOutsCardsTouchEnanled(enabled: boolean): void {
        for (let i = 0; i < this._vOutsCardsData.length; ++i) {
            this._vOutsCardsData[i].clickEnable = enabled;
        }
        this._reloadOutsView();
    }

    /**
     * 检测购买部分outs的强制带回提示
     */
    private _checkBuyBackTip(): void {
        // 剩余outs提示
        let nLeftOuts: number = this._vOutsCardsData.length - this._getSelectOutsCardTag().length;
        if (nLeftOuts > 0) {
            let bActive = nLeftOuts > 0 && this._getSelectOutsCardTag().length > 0;
            this.txt_tips_self.node.active = bActive;

            if (this.txt_tips_self.node.active) {
                let nLeftRate = this._getRateByOuts(nLeftOuts);
                let nSlideAmount: number = cv.StringTools.times(this.slider.progress, this._nMaxRealInsuredAmount);

                // 强制带回的金额是"向内取整"
                let nLeftAmount = this._getRealGameNumberDown(cv.StringTools.div(nSlideAmount, nLeftRate), this._insuranceData.getDataIsMirco());
                if ((nLeftAmount === 0 || nLeftAmount < 0.01) && this.slider.progress > 0) {
                    nLeftAmount = this._insuranceData.getDataIsMirco() ? 0.01 : 1;
                }
                let strDesc: string = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips16"), cv.StringTools.numberToShowString(nLeftAmount));
                this.txt_tips_self.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_self.node, strDesc);
            }
        }
        // river强制带回提示
        else {
            this.txt_tips_self.node.active = this._nBuyBackAmount !== 0;

            if (this.txt_tips_self.node.active) {
                let strDesc: string = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips15"), cv.StringTools.numberToShowString(this._nBuyBackAmount));
                this.txt_tips_self.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_self.node, strDesc);
            }
        }

        if (this.txt_tips_self.node.active) {
            this.txt_tips_self.node.setPosition(this._txt_self_tips_src_pos);
        }

        // 更新 "购买按钮面板" 位置
        do {
            let offset_x: number = 0;
            let offset_y: number = this.txt_tips_self.node.active ? 0 : (this.txt_tips_self.node.y - this._panel_buy_src_pos.y) / 2;
            this.panel_buy.setPosition(this._panel_buy_src_pos.x + offset_x, this._panel_buy_src_pos.y + offset_y);
        } while (false);
    }

    /**
     * outs 全选(单选事件)
     */
    private _onToggleSelectedAll() {
        let isChecked: boolean = this.toggle_select_all.isChecked;
        if (this._isAllowOutsSelected()) {
            for (let i = 0; i < this._vOutsCardsData.length; ++i) {
                this._vOutsCardsData[i].isCheck = isChecked;
            }
            this._reloadOutsView();
            this._updateOutsSelected();
        }
        else {
            this.toggle_select_all.isChecked = true;
        }
    }

    /**
     * 重置投保选项状态
     * @param bEnable 
     */
    private _resetToggleGroupStatus(bEnable: boolean = true): void {
        for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
            this._vToggleInsuredPay[i].isChecked = false;
            this._vToggleInsuredPay[i].setTouchEnable(bEnable);
            this._updateToggleGroupTxtColor();
        }
    }

    /**
     * 返回选中"单选群组选项"对应索引(若未勾选, 则返回-1)
     */
    private _getToggleGroupCheckIndex(): number {
        let checkIdx: number = -1;
        for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
            if (this._vToggleInsuredPay[i].isChecked) {
                checkIdx = i;
                break;
            }
        }
        return checkIdx;
    }

    /**
     * 更新投保选项文本颜色
     */
    private _updateToggleGroupTxtColor(): void {
        for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
            let toggle: CustomToggle = this._vToggleInsuredPay[i];
            let txt_node: cc.Node = toggle.node.getChildByName("txt");
            txt_node.color = toggle.isChecked ? cc.Color.WHITE : cc.color(39, 130, 219);
        }
    }

    /**
     * 选择"投保额"(单选事件)
     * @param toggle 
     */
    private _onToggleGroupEvent(toggle: CustomToggle): void {
        let progress: number = 0;
        if (this._getToggleGroupCheckIndex() >= 0) {
            // 当前勾选按钮对应的投保额
            let tagCom: TagCom = toggle.getComponent(TagCom);
            let nInv: number = this._getInsuranceByToggleIdx(tagCom.nTag);

            // 剩余outs数量(当前强制购买剩余outs投保额)
            let nLeftAmount: number = 0;
            let nLeftOuts: number = this._vOutsCardsData.length - this._getSelectOutsCardTag().length;
            if (nLeftOuts > 0) {
                let nLeftRate: number = this._getRateByOuts(nLeftOuts);
                nLeftAmount = cv.StringTools.div(nInv, nLeftRate);
            }

            // 计算当前滑块ui比例
            if (cv.StringTools.plus(nInv, nLeftAmount) <= this._nMaxRealInsuredAmount) {
                progress = cv.StringTools.div(nInv, this._nMaxRealInsuredAmount);
            }
            else {
                progress = 1;
            }
        }

        // 更新滑条占比
        this._setSliderProgress(progress);
        this._updateSliderPercent(false);

        // 更新投保选项文本颜色
        this._updateToggleGroupTxtColor();
    }

    /**
     * 设置当前"可投保额"数量
     * @param value 
     */
    private _setChipsInsureNum(value: number): void {
        //this._nChipsInsurance = this._getRealGameNumberDown(value, this._insuranceData.getDataIsMirco());
        this._nChipsInsurance = value;
        this.txt_chips_insurance.string = cv.config.getStringData("Insurance_bg_keTouBao_txt") + cv.StringTools.numberToShowString(this._nChipsInsurance);
        this._layoutChipsPanel();
    }

    /**
     * 设置当前"底池"数量
     * @param value 
     */
    private _setChipsPotNum(value: number): void {
        //this._nChipsPot = this._getRealGameNumberDown(value, this._insuranceData.getDataIsMirco());
        this._nChipsPot = value;
        this.txt_chips_pot.string = cv.config.getStringData("Insurance_bg_dichi_txt") + cv.StringTools.numberToShowString(this._nChipsPot);
        this._layoutChipsPanel();
    }

    /**
     * 设置当前"当前投入"数量
     * @param value 
     */
    private _setChipsInvestNum(value: number): void {
        //this._nChipsInvest = this._getRealGameNumberDown(value, this._insuranceData.getDataIsMirco());
        this._nChipsInvest = value;
        this.txt_chips_invest.string = cv.config.getStringData("Insurance_bg_touru_text") + cv.StringTools.numberToShowString(this._nChipsInvest);
        this._layoutChipsPanel();
    }

    /**
     * 布局"可投保池", "底池", "投入"相关位置等
     */
    private _layoutChipsPanel(): void {
        let w1: number = cv.resMgr.getLabelStringSize(this.txt_chips_insurance).width;
        let w2: number = cv.resMgr.getLabelStringSize(this.txt_chips_pot).width;
        let w3: number = cv.resMgr.getLabelStringSize(this.txt_chips_invest).width;

        let ax1: number = this.txt_chips_insurance.node.anchorX;
        let ax2: number = this.txt_chips_pot.node.anchorX;
        let ax3: number = this.txt_chips_invest.node.anchorX;

        let total_w: number = w1 + w2 + w3;
        let spacing_w: number = (this.panel.width - total_w) / (3 + 1);
        let start_x: number = this.panel.width * (0 - this.panel.anchorX);

        let pos_x: number = start_x;
        let pos_y: number = this.txt_chips_insurance.node.y;

        pos_x += spacing_w + w1 * ax1;
        this.txt_chips_insurance.node.setPosition(pos_x, pos_y);
        pos_x += w1 * (1 - ax1);

        pos_x += spacing_w + w2 * ax2;
        this.txt_chips_pot.node.setPosition(pos_x, pos_y);
        pos_x += w2 * (1 - ax2);

        pos_x += spacing_w + w3 * ax3;
        this.txt_chips_invest.node.setPosition(pos_x, pos_y);
    }

    /**
     * 设置当前"投保额/赔付额"
     * @param value 
     */
    private _setInsurePayOddsNum(value: number): void {
        // 投保额
        this._nInsurePay = this._getRealGameNumberDown(value, this._insuranceData.getDataIsMirco());
        this.txt_insure_pay.string = cv.config.getStringData("Insurance_bg_self_panel_Text_931") + cv.StringTools.numberToShowString(this._nInsurePay);

        // 赔付额
        value = cv.StringTools.times(this._nInsurePay, this._getCurrentRate());
        this._nInsureOdds = this._getRealGameNumberDown(value, this._insuranceData.getDataIsMirco());
        this.txt_insure_odds.string = cv.config.getStringData("Insurance_bg_self_panel_Text_93") + cv.StringTools.numberToShowString(this._nInsureOdds);

        this._layoutInsurePanel();
    }

    /**
     * 布局"当前投保额", "当前赔付额"相关位置等
     */
    private _layoutInsurePanel(): void {
        let w1: number = cv.resMgr.getLabelStringSize(this.txt_insure_pay).width;
        let w2: number = cv.resMgr.getLabelStringSize(this.txt_insure_odds).width;

        let total_w: number = w1 + w2;
        let spacing_w: number = (this.panel.width - total_w) / (2 + 1);
        let start_x: number = this.panel.width * (0 - this.panel.anchorX);

        let pos_x: number = 0;
        let pos_y: number = this.txt_insure_pay.node.y;

        pos_x += start_x + spacing_w;
        this.txt_insure_pay.node.setPosition(pos_x, pos_y);

        pos_x += w1 + spacing_w;
        this.txt_insure_odds.node.setPosition(pos_x, pos_y);
    }

    /**
     * 获取牌局真实数值(向内取整模式, 微牌局:保留两位小数, 其他牌局:取整数)
     * @param value    - 传入的数值
     * @param bDecimal - 是否保留小数(这里默认2位)
     */
    private _getRealGameNumberDown(value: number, bDecimal: boolean): number {
        let decimalPlaces: number = bDecimal ? 2 : 0;
        let nRet = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_DOWN);
        return nRet;
    }

    /**
     * 获取牌局真实数值(四舍五入模式, 微牌局:保留两位小数, 其他牌局:取整数)
     * @param value    - 传入的数值
     * @param bDecimal - 是否保留小数(这里默认2位)
     */
    private _getRealGameNumberUp(value: number, bDecimal: boolean): number {
        let decimalPlaces: number = bDecimal ? 2 : 0;
        let nRet = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_HALF_UP);
        return nRet;
    }

    /**
     * 更新 all 玩家手牌信息
     */
    private _updateAllInInfo(): void {
        let objs: any[] = [];
        for (let i = 0; i < this._insuranceData.getDataPlayerCards().length; ++i) {
            let type: number = 0;
            let data: InsuranceAllInItemData = this._insuranceData.getDataPlayerCards()[i];
            switch (data.vCards.length) {
                case 4: type = 1; break;
                case 2:
                default: type = 0; break;
            }
            objs.push({ prefab_type: type, prefab_component: "InsuranceAllInItem", prefab_datas: data });
        }

        let sv: TableView = this.scrollview_allin_info.getComponent(TableView);
        sv.bindData(objs);
        sv.reloadView();
    }

    /**
     * 更新公共牌
     */
    private _updatePublicCards(): void {
        let data: any[] = [];
        for (let i = 0; i < this._insuranceData.getDataPublicCards().length; ++i) {
            data.push(this._insuranceData.getDataPublicCards()[i]);
        }

        let objs: any = { prefab_type: 0, prefab_component: "InsurancePublicCardItem", prefab_datas: data };
        let sv: TableView = this.scrollview_public_cards.getComponent(TableView);
        sv.cellScale = 0.65;
        sv.bindData(objs);
        sv.reloadView();
    }

    /**
     * 更新 outs 牌
     */
    private _updateOutsCards(): void {
        // 房间允许购买部分"outs", 且 river 轮 有强制带回时, 禁用outs点击事件
        let clickEnable: boolean = this._insuranceData.getDataIsSelfBuy();
        if (gameDataMgr.tRoomData.m_bChooseOuts) {
            // 转牌轮买全部, 河牌圈不能买部分, 只能全买或者不买
            // 转牌轮买部分, 河牌圈不能买部分, 只能全买或者不买
            // 转牌轮不买, 河牌圈能买部分也可以全买
            if (!this._bTurnInsurance) {
                clickEnable = this._insuranceData.getDataInsurance().buy_amount <= 0;
                this.toggle_select_all.enabled = clickEnable;
            }
        }

        let row: number = 0;
        let col: number = this.prefab_outs_cards_item.data.childrenCount;
        let data: InsuranceOutsCardItemData[][] = [];
        cv.StringTools.clearArray(this._vOutsCardsData);

        for (let i = 0; i < this._insuranceData.getDataOutsCards().length; ++i) {
            if (i % col === 0) {
                row = data.length;
                data[row] = new Array();
            }

            let t: InsuranceOutsCardItemData = new InsuranceOutsCardItemData();
            t.index = i;
            t.gameid = this._insuranceData.getDataGameID();
            t.outItem = this._insuranceData.getDataOutsCards()[i];
            t.isCheck = true;
            t.clickEnable = clickEnable;

            data[row].push(t);
            this._vOutsCardsData.push(t);
        }

        // 若是"回放"模式(勾选与否以数据为准)
        if (this._insuranceData.getViewMode() === InsuranceData.InsuranceViewMode.VIEW_REPLAY) {
            if (this._insuranceData.getDataInsuranceReplay().isBuyInsurance) {
                for (let i = 0; i < this._vOutsCardsData.length; ++i) {
                    let check: boolean = false;
                    let outs_id: number = this._vOutsCardsData[i].outItem.outs_id;
                    for (let j = 0; j < this._insuranceData.getDataInsuranceReplay().buyOutsID.length; ++j) {
                        if (outs_id === this._insuranceData.getDataInsuranceReplay().buyOutsID[j]) {
                            check = true;
                            break;
                        }
                    }
                    this._vOutsCardsData[i].isCheck = check;
                }
            }
        }

        // 刷新视图
        let objs: any = { prefab_type: 0, prefab_component: "InsuranceOutsCardItem", prefab_datas: data };
        let sv: TableView = this.scrollview_outs_cards.getComponent(TableView);
        sv.bindData(objs);
        sv.reloadView();

        // 更新选中outs信息
        this._updateOutsSelected();
    }

    /**
     * 刷新 outs 视图
     * @param resetPos 
     */
    private _reloadOutsView(resetPos: boolean = false): void {
        let row: number = 0;
        let col: number = 11;
        let data: InsuranceOutsCardItemData[][] = [];
        for (let i = 0; i < this._vOutsCardsData.length; ++i) {
            if (i % col === 0) {
                row = data.length;
                data[row] = new Array();
            }
            data[row].push(this._vOutsCardsData[i]);
        }

        let objs: any = { prefab_type: 0, prefab_component: "InsuranceOutsCardItem", prefab_datas: data };
        let sv: TableView = this.scrollview_outs_cards.getComponent(TableView);
        sv.bindData(objs);
        sv.reloadView(resetPos);
    }
}