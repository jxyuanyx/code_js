import game_protocol = require("./../../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../../components/lobby/cv";
import gameDataMgr from "../../../../../Script/components/game/dzPoker/data/GameDataManager";

import { TagCom } from "../../../../common/tools/TagCom";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";
import { FeeItem } from "../../../../components/game/dzPoker/data/RoomData";

import { InsuranceData } from "./InsuranceData";
import { InsuranceAllInItemData } from "./InsuranceAllInItem";
import { InsuranceOutsCardItemData } from "./InsuranceOutsCardItem";
import { TableView } from "../../../../common/tools/TableView";

/**
 *  牌局保险(新版)
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceNew extends cc.Component {
    @property(cc.Prefab) prefab_allin_info_item: cc.Prefab = null;                                      // "玩家allin信息"预制件
    @property(cc.Prefab) prefab_public_cards_item: cc.Prefab = null;                                    // "公共牌"预制件
    @property(cc.Prefab) prefab_other_cards_item: cc.Prefab = null;                                     // "其他玩家弃牌"预制件
    @property(cc.Prefab) prefab_outs_cards_item: cc.Prefab = null;                                      // "有效outs"预制件

    @property(cc.Node) panel: cc.Node = null;                                                           // 主面板
    @property(cc.Node) panel_shield: cc.Node = null;                                                    // 主面板的屏蔽面板
    @property(cc.Node) panel_self: cc.Node = null;                                                      // 个人操作面板
    @property(cc.Node) panel_detail: cc.Node = null;                                                    // 保险单选项详情面板

    @property(cc.RichText) rtxt_other_cards: cc.RichText = null;                                        // 其他玩家手牌文本
    @property(cc.RichText) rtxt_left_cards: cc.RichText = null;                                         // 牌堆剩余牌文本
    @property(cc.RichText) rtxt_select_outs: cc.RichText = null;                                        // 已择outs文本
    @property(cc.RichText) rtxt_odds_rate: cc.RichText = null;                                          // 赔率范围文本

    @property(cc.Label) txt_chips_insurance: cc.Label = null;                                           // 可投保池 文本
    @property(cc.Label) txt_chips_pot: cc.Label = null;                                                 // 底池 文本
    @property(cc.Label) txt_chips_invest: cc.Label = null;                                              // 当前投入 文本

    @property(cc.Label) txt_time_price: cc.Label = null;                                                // 保险延时价格
    @property(cc.Label) txt_time_down: cc.Label = null;                                                 // 保险倒计时

    @property(cc.Label) txt_tips_self: cc.Label = null;                                                 // 个人面板的提示
    @property(cc.Label) txt_tips_other: cc.Label = null;                                                // 限制提示
    @property(cc.Label) txt_tips_waitting: cc.Label = null;                                             // 等待提示
    @property(cc.Label) txt_tips_no_outs: cc.Label = null;                                              // 无outs可选提示

    @property(cc.Button) btn_addTime: cc.Button = null;                                                 // 保险延时
    @property(cc.Button) btn_detail: cc.Button = null;                                                  // 详细数据
    @property(cc.Button) btn_buy_ensure: cc.Button = null;                                              // 购买
    @property(cc.Button) btn_buy_cancel: cc.Button = null;                                              // 不买
    @property(cc.Button) btn_buy_close: cc.Button = null;                                               // 关闭

    @property(cc.ScrollView) scrollview_allin_info: cc.ScrollView = null;                               // allin 信息 滚动视图
    @property(cc.ScrollView) scrollview_public_cards: cc.ScrollView = null;                             // 公共牌 滚动视图
    @property(cc.ScrollView) scrollview_other_cards: cc.ScrollView = null;                              // 其他玩家弃牌 滚动视图
    @property(cc.ScrollView) scrollview_outs_cards: cc.ScrollView = null;                               // outs 滚动视图

    static gClassName: string = "InsuranceNew";

    private _insuranceData: InsuranceData.InsuranceData = null;                                         // 数据层对象

    private _bInit: boolean = false;                                                                    // 是否初始化
    private _nChipsInsurance: number = 0;                                                               // 可投保池 数值(投保人所能赢的最大池,也就是这部分可以投保)
    private _nChipsPot: number = 0;                                                                     // 底池 数值(当前有效池总和 =  主池 + 有效边池)
    private _nChipsInvest: number = 0;                                                                  // 当前投入 数值(当前投保人 allin 数量)

    private _nInsurePay: number = 0;                                                                    // 当前需支付的投保额 数值
    private _nInsureOdds: number = 0;                                                                   // 当前系统的赔付额 数值

    private _bShowingAction: boolean = false;                                                           // 是否正在 show
    private _bHidingAction: boolean = false;                                                            // 是否正在 hide

    private _nInsuranceTimeDown: number = 0;                                                            // 保险倒计时
    private _nNoOutsTimeDown: number = 0;                                                               // 无可选outs的倒计时
    private _nBuyBackAmount: number = 0;                                                                // 强制带回的金额(只针对river轮)
    private _bTurnInsurance: boolean = false;                                                           // 是否是turn轮保险
    private _nMaxInsuredAmount: number = 0;                                                             // 本轮最大投保额
    private _nMaxRealInsuredAmount: number = 0;                                                         // 本轮实际最大投保额
    private _bOverMaxRealInsuredAmount: boolean = false;                                                // 是否超过了最大投保额

    private _vToggleInsuredPay: CustomToggle[] = [];                                                    // "投保额"单选数组
    private _vToggleInsuredPayValue: number[] = [];                                                     // "投保额"单选数额

    private _btn_ensure_src_frame: cc.SpriteFrame = null;                                               // 购买按钮原始精灵块
    private _btn_cancel_src_frame: cc.SpriteFrame = null;                                               // 不买按钮原始精灵块

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
        sv_allin_info.generatePoolInst("InsuranceAllInItem", 2);

        // 公共牌
        let sv_public_card: TableView = this.scrollview_public_cards.getComponent(TableView);
        sv_public_card.generatePoolInst("InsurancePublicCardItem", 4);

        // 其他玩家弃牌
        let sv_other_card: TableView = this.scrollview_other_cards.getComponent(TableView);
        sv_other_card.generatePoolInst("InsuranceOtherCardItem", 3);

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
     * @param bAnim 
     * @param leftTime 
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

        this._btn_ensure_src_frame = this.btn_buy_ensure.getComponent(cc.Sprite).spriteFrame;
        this._btn_cancel_src_frame = this.btn_buy_cancel.getComponent(cc.Sprite).spriteFrame;

        this.btn_buy_ensure.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._reqBuy();
        }, this);

        this.btn_buy_cancel.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._reqNotBuy();
        }, this);

        this.btn_buy_close.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._reqNotBuy();
        }, this);

        this.btn_addTime.node.on("click", (event: cc.Event): void => {
            this._reqAddInsuranceTime();
        }, this);

        this.btn_detail.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._onClickBtnDetail()
        }, this);

        let tagCom: TagCom = this.btn_detail.getComponent(TagCom);
        if (!tagCom) tagCom = this.btn_detail.addComponent(TagCom);
        tagCom.reset();

        // 1/3池, 1/2池, 满池, 1/8池, 1/5池, 保本
        let panel_toggle: cc.Node = this.panel_self.getChildByName("panel_toggle");
        if (panel_toggle) {
            for (let i = 0; i < panel_toggle.childrenCount; ++i) {
                for (let i = 0; i < panel_toggle.childrenCount; ++i) {
                    let toggle: CustomToggle = panel_toggle.children[i].getComponent(CustomToggle);
                    let tagCom: TagCom = toggle.node.getComponent(TagCom);
                    if (!tagCom) tagCom = toggle.node.addComponent(TagCom);
                    switch (i) {
                        case 0: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_ThirdPot; break;
                        case 1: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_HalfPot; break;
                        case 2: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FullPot; break;
                        case 3: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_EighthPot; break;
                        case 4: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FifthPot; break;
                        case 5: tagCom.nTag = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_BreakEven; break;
                        default: break;
                    }
                    toggle.node.on("toggle", this._onToggleGroupEvent, this);
                    this._vToggleInsuredPay.push(toggle);
                    this._vToggleInsuredPayValue.push(0);
                }
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
        cv.MessageCenter.register("ChangeCard_onClickCardFace", this._onMsgChangeCardFace.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("update_insurance_time", this.node);
        cv.MessageCenter.unregister("ChangeCard_onClickCardFace", this.node);
    }

    /**
     * 更新视图
     */
    private _updateView(leftTime: number): void {
        this._resetAllUI();                                                                     // 重置数据
        this._updateStaticTxt();                                                                // 更新静态文本
        this._updateViewPerspective();                                                          // 更新视图视角(用于激活点击事件)

        this._resetInsuranceTimeDown(leftTime);                                                 // 重置保险倒计时
        this._resetNoOutsTimeDown(this._insuranceData.getDataInsurance().NoOutsTimeOut);        // 重置无可选outs的倒计时
        this._updateInsuranceTimeDownPrice();                                                   // 更新延时价格

        this._setPotInfo(this._insuranceData.getDataInsurance());                               // 底池信息
        this._calculateMaxRealInsured();                                                        // 计算实际最大投保额
        this._updateInsurePay();                                                                // 更新投保额
        this._updateDetailTxt();                                                                // 更新详细数据
        this._checkBuyBackTip();                                                                // 检测强制带回提示

        this._updateAllInInfo();                                                                // 更新allin信息
        this._updatePublicCards();                                                              // 更新公共牌
        this._updateOtherCards();                                                               // 更新其他玩家手牌
        this._updateOutsCards();                                                                // 更新 outs 牌

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
        this._resetNoOutsTimeDown(0);
        this._resetInsuranceTimeDown(0);

        // 禁用整个面板点击
        this.panel_shield.active = true;

        // 匹配勾选"保险单选项"
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
                for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
                    let value: number = this._getFixedInsurePayByToggleIdx(i);
                    insuredAmounts = this._getRealGameNumberDown(insuredAmounts, this._insuranceData.getDataIsMirco());
                    if (value === insuredAmounts) {
                        this._vToggleInsuredPay[i].check();
                        break;
                    }
                }
            }
        }

        // 设置按钮高亮状态
        do {
            let outsLen: number = this._insuranceData.getDataInsurance().outs.length;
            if (outsLen > 0) {
                let isBuyInsurance: boolean = this._insuranceData.getDataInsuranceReplay().isBuyInsurance;
                this.btn_buy_ensure.enabled = isBuyInsurance;
                this.btn_buy_ensure.interactable = isBuyInsurance;

                this.btn_buy_cancel.enabled = !isBuyInsurance;
                this.btn_buy_cancel.interactable = !isBuyInsurance;

                this.btn_buy_ensure.getComponent(cc.Sprite).spriteFrame = isBuyInsurance ? this._btn_ensure_src_frame : this._btn_cancel_src_frame;
                this.btn_buy_cancel.getComponent(cc.Sprite).spriteFrame = isBuyInsurance ? this._btn_cancel_src_frame : this._btn_ensure_src_frame;
            }
            else {
                this.btn_buy_ensure.node.active = false;
                this.btn_buy_cancel.node.active = false;

                this.btn_buy_close.node.active = true;
                let txt: cc.Label = this.btn_buy_close.node.getChildByName("txt").getComponent(cc.Label);
                let str: string = cv.config.getStringData("tips_mail_btn_deal_0");
                txt.string = str;
            }
        } while (false);
    }

    /**
    * 重置所有ui和相关数据
    */
    private _resetAllUI(): void {
        // 重置保险延时
        do {
            this._resetNoOutsTimeDown(0);
            this._resetInsuranceTimeDown(0);
            this._updateInsuranceTimeDownPrice();
        } while (false);

        // 重置self面板
        do {
            // 底池
            this._setChipsInsureNum(0);
            this._setChipsPotNum(0);
            this._setChipsInvestNum(0);

            // 重置"投保额/赔付额"
            this._nInsurePay = 0;
            this._nInsureOdds = 0;

            // 投保单选按钮
            this._resetToggleGroupStatusAll();

            // 投保额
            this._updateInsurePay(true);

            // 详情面板
            this._updateDetailTxt(true);
            this.panel_detail.active = false;
            this.btn_detail.getComponent(TagCom).reset();
            cv.resMgr.setSpriteFrame(this.btn_detail.node, "zh_CN/common/icon/btn_fold_down");

            // self tips
            this.txt_tips_self.string = "";
            this.txt_tips_self.node.active = false;
        } while (false);

        // other tips
        do {
            this.txt_tips_other.string = "";
            this.txt_tips_other.node.active = false;
        } while (false);

        // 重置购买按钮精灵帧等
        this.btn_buy_ensure.node.active = true;
        this.btn_buy_cancel.node.active = true;
        this.btn_buy_ensure.getComponent(cc.Sprite).spriteFrame = this._btn_ensure_src_frame;
        this.btn_buy_cancel.getComponent(cc.Sprite).spriteFrame = this._btn_cancel_src_frame;

        // 隐藏相关控件
        this.btn_buy_close.node.active = false;
        this.txt_tips_no_outs.node.active = false;
        this.txt_tips_waitting.node.active = false;
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
        for (let i = 0; i < this._insuranceData.getDataOutsCards().length; ++i) {
            vRet.push(this._insuranceData.getDataOutsCards()[i].outs_id);
        }
        return vRet;
    }

    /**
     * 获取当前赔率((剩余牌数 / 剩余 outs) * 0.95 - 1, 保留1位小数, 向下取舍, 小于0.1 直接舍为0)
     */
    private _getCurrentRate(): number {
        let nRet: number = 0;
        let nOutsLen: number = this._insuranceData.getDataInsurance().outs.length;

        if (nOutsLen > 0) {
            nRet = cv.StringTools.div(this._insuranceData.getDataInsurance().leftCards, nOutsLen);
            nRet = cv.StringTools.times(nRet, 0.95);
            nRet = cv.StringTools.minus(nRet, 1);
            nRet = nRet + 1e-6;
            nRet = cv.StringTools.toFixed(nRet, 1, cv.StringTools.RoundingMode.ROUND_DOWN);
            nRet = Math.max(0, nRet);
        }

        return nRet;
    }

    /**
     * 获取当前勾选按钮的索引所对应的投保金额(精确保留小数"前"的值)
     * @param index 
     */
    private _getInsuranceByToggleIdx(index: InsuranceData.InsurancePayToggleIdx): number {
        let nRet: number = 0;
        let nCurRate: number = this._getCurrentRate();
        if (nCurRate > 0) {
            switch (index) {
                case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_ThirdPot: {
                    nRet = cv.StringTools.div(this._nChipsInsurance, 3);
                    nRet = cv.StringTools.div(nRet, nCurRate);
                } break;

                case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_HalfPot: {
                    nRet = cv.StringTools.div(this._nChipsInsurance, 2);
                    nRet = cv.StringTools.div(nRet, nCurRate);
                } break;

                case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FullPot: {
                    nRet = cv.StringTools.div(this._nChipsInsurance, nCurRate);
                } break;

                case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_EighthPot: {
                    nRet = cv.StringTools.div(this._nChipsInsurance, 8);
                    nRet = cv.StringTools.div(nRet, nCurRate);
                } break;

                case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FifthPot: {
                    nRet = cv.StringTools.div(this._nChipsInsurance, 5);
                    nRet = cv.StringTools.div(nRet, nCurRate);
                } break;

                case InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_BreakEven: {
                    nRet = cv.StringTools.div(this._nChipsInvest, nCurRate);
                } break;

                default: break;
            }
        }
        return cv.Number(nRet);
    }

    /**
     * 获取当前勾选按钮的索引所对应的投保金额(精确保留小数"后"的值, 实际显示的值)
     * @param index 
     */
    private _getFixedInsurePayByToggleIdx(index: number): number {
        let value: number = 0;
        if (index >= 0 && index < this._vToggleInsuredPayValue.length) {
            value = this._vToggleInsuredPayValue[index];
        }
        return value;
    }

    /**
     * 更新静态文本
     */
    private _updateStaticTxt(): void {
        let panel_pub_cards: cc.Node = this.panel.getChildByName("panel_pub_cards");

        // 标题
        do {
            let txt_title: cc.Label = this.panel.getChildByName("txt_title").getComponent(cc.Label);
            txt_title.string = cv.config.getStringData("Insurance_bg_title_text");
        } while (false);

        // 倒计时
        do {
            let txt_left_time_word: cc.Label = this.panel.getChildByName("txt_left_time_word").getComponent(cc.Label);
            txt_left_time_word.string = cv.config.getStringData("Insurance_bg_signScore_text_0");
        } while (false);

        // 公共牌 
        do {
            let txt_pub_crad: cc.Label = this.panel.getChildByName("txt_pub_cards").getComponent(cc.Label);
            txt_pub_crad.string = cv.config.getStringData("Insurance_bg_pulbicWord_textBg_pulbicWord_text");
        } while (false);

        // 个人面板
        do {
            // 投保方案
            let txt_plan_word: cc.Label = this.panel_self.getChildByName("txt_plan_word").getComponent(cc.Label);
            txt_plan_word.string = cv.config.getStringData("Insurance_bg_option_text");

            // 计算投保方案线的宽度
            let img_line_1: cc.Node = this.panel_self.getChildByName("img_line_1");
            let img_line_2: cc.Node = this.panel_self.getChildByName("img_line_2");
            let offset_w: number = 20;
            let words_w: number = cv.resMgr.getLabelStringSize(txt_plan_word).width;
            let img_line_1_w: number = 0 - offset_w - img_line_1.x - words_w / 2;
            let img_line_2_w: number = 0 - offset_w - img_line_1.x - words_w / 2;
            img_line_1.setContentSize(cc.size(img_line_1_w, img_line_1.height));
            img_line_2.setContentSize(cc.size(img_line_2_w, img_line_2.height));

            // 单选按钮
            for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
                let txt_title: cc.Label = this._vToggleInsuredPay[i].node.getChildByName("txt_title").getComponent(cc.Label);
                let tagCom: TagCom = this._vToggleInsuredPay[i].node.getComponent(TagCom);
                let strValue = cv.config.getStringData(`Insurance_bg_self_panel_toggle_${tagCom.nTag}`);
                txt_title.string = cv.StringTools.calculateAutoWrapString(txt_title.node, strValue);
            }

            // 详细数据 
            let txt_btn_detail: cc.Label = this.btn_detail.node.getChildByName("txt").getComponent(cc.Label);
            txt_btn_detail.string = cv.config.getStringData("Insurance_bg_detail_btn_text");

            // 购买
            let txt_btn_ensure: cc.Label = this.btn_buy_ensure.node.getChildByName("txt").getComponent(cc.Label);
            txt_btn_ensure.string = cv.config.getStringData("Insurance_bg_self_panel_buy_button");

            // 不买
            let txt_btn_cancle: cc.Label = this.btn_buy_cancel.node.getChildByName("txt").getComponent(cc.Label);
            txt_btn_cancle.string = cv.config.getStringData("Insurance_bg_self_panel_noBuy_button");
        } while (false);

        // 等待其他人买保险
        do {
            this.txt_tips_waitting.string = cv.config.getStringData("Insurance_bg_waiting_text");
        } while (false);
    }

    /**
     * 获取指定数值的颜色字符串
     * @param value 
     */
    private _getColorString(value: number): string {
        let color: cc.Color = cc.Color.WHITE;
        if (value > 0) {
            color = cv.tools.getWinColor();
        }
        else if (value < 0) {
            color = cv.tools.getLoseColor();
        }

        let str: string = cv.StringTools.formatC("<color=#%s>%s</color>", color.toHEX("#rrggbb"), cv.String(value));
        return str;
    }

    /**
     * 获取指定数值的颜色字符串
     * @param value 
     */
    private _getColor(value: number): cc.Color {
        let color: cc.Color = cc.Color.WHITE;
        if (value > 0) {
            color = cv.tools.getWinColor();
        }
        else if (value < 0) {
            color = cv.tools.getLoseColor();
        }

        return color;
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
        sv.cellScale = 0.68;
        sv.bindData(objs);
        sv.reloadView();
    }

    /**
     * 更新其他玩家手牌(弃牌)
     */
    private _updateOtherCards(): void {
        let data: any[][] = [];
        let leftOuts: number = 0;

        if (this._insuranceData.getDataOtherCards().length > 0) {
            let row: number = 0;
            let col: number = this.prefab_other_cards_item.data.childrenCount;
            let lastIsOuts: boolean = this._insuranceData.getDataOtherCards()[0].data.inOuts;
            for (let i = 0, count = 0; i < this._insuranceData.getDataOtherCards().length; ++i, ++count) {
                let isOuts: boolean = this._insuranceData.getDataOtherCards()[i].data.inOuts;
                if (isOuts) { ++leftOuts; }

                if (count % col === 0 || isOuts !== lastIsOuts) {
                    row = data.length;
                    data[row] = new Array();
                    count = 0;
                }

                lastIsOuts = isOuts;
                data[row].push(this._insuranceData.getDataOtherCards()[i]);
            }
        }

        let objs: any = { prefab_type: 0, prefab_component: "InsuranceOtherCardItem", prefab_datas: data };
        let sv: TableView = this.scrollview_other_cards.getComponent(TableView);
        sv.bindData(objs);
        sv.reloadView();

        // 其他玩家弃牌
        this._setTxtOtherCards(leftOuts);
    }

    /**
     * 更新 outs 牌
     */
    private _updateOutsCards(): void {
        let row: number = 0;
        let col: number = this.prefab_outs_cards_item.data.childrenCount;
        let data: InsuranceOutsCardItemData[][] = [];
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
            t.clickEnable = false;

            data[row].push(t);
        }

        let objs: any = { prefab_type: 0, prefab_component: "InsuranceOutsCardItem", prefab_datas: data };
        let sv: TableView = this.scrollview_outs_cards.getComponent(TableView);
        sv.bindData(objs);
        sv.reloadView();

        // 当前 outs 数量
        this._setTxtSelectOuts(this._insuranceData.getDataOutsCards().length);

        // 牌堆剩余牌
        this._setTxtLeftCards(this._insuranceData.getDataInsurance().leftCards);

        // 当前赔率
        this._setTxtOddsRate(this._getCurrentRate());
    }

    /**
     * 点击"保险详情"按钮事件
     */
    private _onClickBtnDetail(): void {
        cv.AudioMgr.playButtonSound('button_click');
        let tagCom: TagCom = this.btn_detail.getComponent(TagCom);
        tagCom.bTag = !tagCom.bTag;

        let path: string = "zh_CN/common/icon/btn_fold_down";
        if (tagCom.bTag) {
            path = "zh_CN/common/icon/btn_fold_up";
        }
        cv.resMgr.setSpriteFrame(this.btn_detail.node, path);
        this.panel_detail.active = tagCom.bTag;
    }

    /**
     * 买"保险"(这里只需计算选中的投保额, 强制带回部分由服务器计算, 支持赔率 < 1.0)
     */
    private _reqBuy(): void {
        if (true || this._getCurrentRate() > 1.0) {
            let vOuts: number[] = this._getSelectOutsCardTag();
            if (vOuts.length > 0) {
                let nAmount: number = 0;

                // 若"已勾选"可选择的投保方案, 则直接使用
                let checkIdx: number = this._getToggleGroupCheckIndex();
                if (checkIdx >= 0) {
                    nAmount = this._nInsurePay;
                }
                // 若"未勾选"
                else {
                    // 若超过最大有效值, 则直接使用最大有效值
                    if (this._bOverMaxRealInsuredAmount) {
                        nAmount = this._nMaxRealInsuredAmount;
                    }
                    // 若未超过最大有效值, 则不处理
                    else {
                        nAmount = 0;
                    }
                }

                // 若最终投保额 <= 0, 则直接返回 
                nAmount = this._getRealGameNumberDown(nAmount, this._insuranceData.getDataIsMirco());
                if (nAmount <= 0) return;

                // 若 turn 轮, 购买的金额超过底池 1/3 则 return
                // if (this._bTurnInsurance && nAmount > this._nMaxRealInsuredAmount) {
                //     let strTips = cv.config.getStringData("ServerErrorCode61");
                //     // strTips = strTips + cv.StringTools.formatC("-a<%.2f>m<%.2f>", nAmount, maxAmount);
                //     cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeWarning);
                //     return;
                // }

                // 因为服务器默认值是0, 所以上传索引+1
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
     * 更新延时时间
     * @param data 
     */
    private _onMsgUpdateInsuranceTime(cd: number): void {
        // 重置保险倒计时
        this._resetInsuranceTimeDown(cd);

        // 更新延时价格
        this._updateInsuranceTimeDownPrice();
    }

    /**
     * 更新牌面风格
     */
    private _onMsgChangeCardFace(): void {
        this.scrollview_allin_info.getComponent(TableView).refreshView();       // allin 
        this.scrollview_public_cards.getComponent(TableView).refreshView();     // 公共牌
        this.scrollview_other_cards.getComponent(TableView).refreshView();      // 其他玩家弃牌
        this.scrollview_outs_cards.getComponent(TableView).refreshView();       // outs
    }

    /**
     * 重置"保险"倒计时
     * @param cd 
     */
    private _resetInsuranceTimeDown(cd: number): void {
        this._nInsuranceTimeDown = Math.max(0, cv.Number(cd));
        this._setInsuranceTimeDown(this._nInsuranceTimeDown);

        this.unschedule(this._onScheduleInsuranceTimeDown);
        if (this._nInsuranceTimeDown > 0) this.schedule(this._onScheduleInsuranceTimeDown, 1.0);
    }

    /**
     * 设置"保险"倒计时
     * @param cd 
     */
    private _setInsuranceTimeDown(cd: number): void {
        cd = cv.Number(cd);
        this.txt_time_down.string = cv.StringTools.formatC("%ds", cd);
    }

    /**
     * 更新"保险"倒计时
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
     * 重置"无可选outs"倒计时
     * @param cd 
     */
    private _resetNoOutsTimeDown(cd: number): void {
        let bSelf: boolean = this._insuranceData.getDataIsSelfBuy();
        if (bSelf) {
            this._nNoOutsTimeDown = Math.max(0, cv.Number(cd));
            this._setNoOutsTimeDown(this._nNoOutsTimeDown);

            this.unschedule(this._onScheduleNoOutsTimeDown);
            if (this._nNoOutsTimeDown > 0) this.schedule(this._onScheduleNoOutsTimeDown, 1.0);
        }
        else {
            this._nNoOutsTimeDown = 0;
            this.unschedule(this._onScheduleNoOutsTimeDown);
        }
    }

    /**
     * 设置"无可选outs"倒计时
     * @param cd 
     */
    private _setNoOutsTimeDown(cd: number): void {
        this.btn_buy_close.node.active = cv.Number(cd) > 0;
        if (this.btn_buy_close.node.active) {
            this.btn_buy_ensure.node.active = false;
            this.btn_buy_cancel.node.active = false;
            let txt: cc.Label = this.btn_buy_close.node.getChildByName("txt").getComponent(cc.Label);
            let str: string = cv.config.getStringData("tips_mail_btn_deal_0");
            txt.string = cv.StringTools.formatC("%s(%d)", str, cd);
        }
    }

    /**
     * 更新"无可选outs"倒计时
     */
    private _onScheduleNoOutsTimeDown(): void {
        this._nNoOutsTimeDown -= 1;
        if (this._nNoOutsTimeDown <= 0) {
            this._nNoOutsTimeDown = 0;
            this.unschedule(this._onScheduleNoOutsTimeDown);
            this.autoHide();
        }
        this._setNoOutsTimeDown(this._nNoOutsTimeDown);
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
        this.txt_time_price.string = cv.StringTools.serverGoldToShowString(nPrice);

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
            let nBackRate: number = this._getCurrentRate();
            if (nBackRate === 0) {
                nBuyBack = this._insuranceData.getDataIsMirco() ? 1 : 100;
            }
            else {
                nBuyBack = cv.StringTools.div(insuranceData.limit_amount, nBackRate);
                nBuyBack = Math.ceil(nBuyBack);
            }
        }

        this._nMaxInsuredAmount = cv.StringTools.clientGoldByServer(cv.StringTools.minus(insuranceData.pot_amount, nBuyBack));
        this._nMaxInsuredAmount = Math.max(0, this._nMaxInsuredAmount);
        this._nBuyBackAmount = cv.StringTools.clientGoldByServer(nBuyBack);
        this._nBuyBackAmount = this._getRealGameNumberDown(this._nBuyBackAmount, this._insuranceData.getDataIsMirco());
    }

    /**
     * 计算实际最大投保额
     */
    private _calculateMaxRealInsured(): void {
        // 满池保险费
        let nFullInsuranceAmount: number = this._getInsuranceByToggleIdx(InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_FullPot);

        // 剩余未勾选的outs赔率
        let nLeftRate: number = 0;

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
    }

    /**
     * 更新单选按钮的投保额文本
     */
    private _updateInsurePay(clearData: boolean = false): void {
        for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
            let nPay: number = 0;
            let tagCom: TagCom = this._vToggleInsuredPay[i].getComponent(TagCom);
            let txt_num: cc.Label = this._vToggleInsuredPay[i].node.getChildByName("txt_num").getComponent(cc.Label);

            if (!clearData) {
                nPay = this._getInsuranceByToggleIdx(tagCom.nTag);
                nPay = this._getRealGameNumberDown(nPay, this._insuranceData.getDataIsMirco());

                let enable: boolean = nPay > 0 && nPay <= this._nMaxRealInsuredAmount;
                this._resetToggleGroupStatusByIdx(i, enable);
            }

            this._vToggleInsuredPayValue[i] = nPay;
            txt_num.string = cv.StringTools.numberToShowString(nPay);
        }
    }

    /**
     * 更新详情文本(以"有效投保额"带入公式计算)
     */
    private _updateDetailTxt(clearData: boolean = false): void {
        let panel_detail: cc.Node = this.panel_self.getChildByName("panel_detail");
        for (let i = 0; i < panel_detail.childrenCount; ++i) {
            let node: cc.Node = panel_detail.getChildByName(`node_${i}`);
            if (!node) continue;

            // 投保额/赔付额
            let nPay: number = this._getFixedInsurePayByToggleIdx(i);
            nPay = Math.min(nPay, this._nMaxRealInsuredAmount);
            nPay = this._getRealGameNumberDown(nPay, this._insuranceData.getDataIsMirco());
            let nOdds: number = this._getInsureOddsByPay(nPay);

            // 买中盈利(赔付 - 下注额)
            do {
                let hit_profit: number = 0;
                if (!clearData && nOdds > 0) {
                    hit_profit = cv.StringTools.minus(nOdds, this._nChipsInvest);
                    hit_profit = this._getRealGameNumberHalfUp(hit_profit, this._insuranceData.getDataIsMirco());
                }

                let txt_k: cc.Label = node.getChildByName("txt_hit_profit_k").getComponent(cc.Label);
                let txt_v: cc.Label = node.getChildByName("txt_hit_profit_v").getComponent(cc.Label);

                txt_k.string = cv.config.getStringData("Insurance_bg_hit_profit_text");
                txt_v.string = cv.StringTools.numberToShowString(hit_profit);
                txt_v.node.color = this._getColor(hit_profit);

                // layout(以左边为起点)
                let offset_w: number = 5;
                let sz_k: cc.Size = cv.resMgr.getLabelStringSize(txt_k);
                let sz_v: cc.Size = cv.resMgr.getLabelStringSize(txt_v);
                let total_w: number = sz_k.width + offset_w + sz_v.width;
                let start_x: number = -node.width * node.anchorX + (node.width - total_w) / 2;
                let px: number = start_x;
                let py: number = txt_k.node.y;

                px += sz_k.width * txt_k.node.anchorX;
                txt_k.node.setPosition(px, py);
                px += sz_k.width * (1 - txt_k.node.anchorX);
                px += offset_w;

                px += sz_v.width * txt_v.node.anchorX;
                txt_v.node.setPosition(px, py);
            } while (false);

            // 未中盈利(可投保池 - 下注额 - river轮保费 - 强制带回保费 - turn轮保费)
            do {
                let not_hit_profit: number = 0;
                if (!clearData && nOdds > 0) {
                    let lastPay: number = cv.StringTools.clientGoldByServer(this._insuranceData.getDataInsurance().buy_amount);
                    lastPay = this._getRealGameNumberDown(lastPay, this._insuranceData.getDataIsMirco());

                    not_hit_profit = this._nChipsInsurance;
                    not_hit_profit = cv.StringTools.minus(not_hit_profit, this._nChipsInvest);
                    not_hit_profit = cv.StringTools.minus(not_hit_profit, lastPay);
                    not_hit_profit = cv.StringTools.minus(not_hit_profit, this._nBuyBackAmount);
                    not_hit_profit = cv.StringTools.minus(not_hit_profit, nPay);
                    not_hit_profit = this._getRealGameNumberHalfUp(not_hit_profit, this._insuranceData.getDataIsMirco());
                }

                let txt_k: cc.Label = node.getChildByName("txt_not_hit_profit_k").getComponent(cc.Label);
                let txt_v: cc.Label = node.getChildByName("txt_not_hit_profit_v").getComponent(cc.Label);

                txt_k.string = cv.config.getStringData("Insurance_bg_not_hit_profit_text");
                txt_v.string = cv.StringTools.numberToShowString(not_hit_profit);
                txt_v.node.color = this._getColor(not_hit_profit);

                // layout(以左边为起点)
                let offset_w: number = 5;
                let sz_k: cc.Size = cv.resMgr.getLabelStringSize(txt_k);
                let sz_v: cc.Size = cv.resMgr.getLabelStringSize(txt_v);
                let total_w: number = sz_k.width + offset_w + sz_v.width;
                let start_x: number = -node.width * node.anchorX + (node.width - total_w) / 2;
                let px: number = start_x;
                let py: number = txt_k.node.y;

                px += sz_k.width * txt_k.node.anchorX;
                txt_k.node.setPosition(px, py);
                px += sz_k.width * (1 - txt_k.node.anchorX);
                px += offset_w;

                px += sz_v.width * txt_v.node.anchorX;
                txt_v.node.setPosition(px, py);
            } while (false);
        }
    }

    /**
     * 检测购买部分outs的强制带回提示
     */
    private _checkBuyBackTip(): void {
        let outsLen: number = this._insuranceData.getDataOutsCards().length;
        let outsRate: number = this._getCurrentRate();

        // "无outs可买"友情提示(所有人视角)
        if (outsLen <= 0) {
            // 暂时注释掉
            // this.txt_tips_other.node.active = true;
            // this.txt_tips_other.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_other.node, strDesc);

            let strDesc: string = cv.config.getStringData("Insurance_bg_tips_no_outs_text");
            this.txt_tips_no_outs.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_no_outs.node, strDesc);
            this.txt_tips_no_outs.node.active = true;
        }

        let bSelf: boolean = this._insuranceData.getDataIsSelfBuy();
        if (!bSelf) return;

        // 无outs可买的时候友情提示
        if (outsLen > 0) {
            // 赔率 <= 0
            if (outsRate <= 0) {
                this.txt_tips_other.node.active = true;
                let strDesc: string = cv.config.getStringData("Insurance_bg_tips_no_rates_text");
                this.txt_tips_other.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_other.node, strDesc);
            }
            // 赔率 > 0
            else {
                // 有效保额 > 0 时
                this._bOverMaxRealInsuredAmount = false;
                if (this._nMaxRealInsuredAmount > 0) {
                    for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
                        let nPay: number = this._getFixedInsurePayByToggleIdx(i);
                        if (nPay > this._nMaxRealInsuredAmount) {
                            this._bOverMaxRealInsuredAmount = true;
                            break;
                        }
                    }

                    if (this._bOverMaxRealInsuredAmount) {
                        let strDesc: string = "";

                        // turn轮: 投保额 > 1/3底池
                        if (this._bTurnInsurance) {
                            strDesc = cv.config.getStringData("Insurance_bg_tips_over_third_pot_text");
                        }
                        // river轮: 投保额 > 最大投保额
                        else {
                            strDesc = cv.config.getStringData("Insurance_bg_tips_over_max_value_text");
                        }

                        let amount: number = this._getRealGameNumberDown(this._nMaxRealInsuredAmount, this._insuranceData.getDataIsMirco());
                        strDesc = cv.StringTools.formatC(strDesc, cv.StringTools.numberToShowString(amount));

                        this.txt_tips_other.node.active = true;
                        this.txt_tips_other.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_other.node, strDesc);
                    }
                }
                // 有效保额 <= 0 时
                else {
                    this._bOverMaxRealInsuredAmount = true;
                    this.txt_tips_other.node.active = true;
                    let strDesc: string = cv.config.getStringData("Insurance_bg_tips_over_max_pot_text");
                    this.txt_tips_other.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_other.node, strDesc);
                }
            }
        }

        // river 强制带回提示
        if (this._nBuyBackAmount > 0) {
            this.txt_tips_self.node.active = true;
            let strDesc: string = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips15"), cv.StringTools.numberToShowString(this._nBuyBackAmount));
            this.txt_tips_self.string = cv.StringTools.calculateAutoWrapString(this.txt_tips_self.node, strDesc);

        }

        // 是否禁用详情按钮
        do {
            let enable: boolean = outsLen > 0 && outsRate > 0 && this._nMaxRealInsuredAmount > 0;
            this.btn_detail.enabled = enable;
            this.btn_detail.interactable = enable;
            let txt_detail: cc.Node = this.btn_detail.node.getChildByName("txt");
            txt_detail.color = enable ? cc.Color.WHITE : cc.color(0x7F, 0x7F, 0x7F, 0xFF);
        } while (false);

        // 是否禁用购买按钮
        do {
            let enable: boolean = outsLen > 0 && outsRate > 0 && this._nMaxRealInsuredAmount > 0;
            this.btn_buy_ensure.enabled = enable;
            this.btn_buy_ensure.interactable = enable;
        } while (false);

        // 非回放模式, 默认勾选"保本"
        if (this._insuranceData.getViewMode() !== InsuranceData.InsuranceViewMode.VIEW_REPLAY) {
            let idx: number = InsuranceData.InsurancePayToggleIdx.E_IPT_IDX_BreakEven;
            let nPay: number = this._getInsuranceByToggleIdx(idx);
            if (nPay > 0 && nPay <= this._nMaxRealInsuredAmount) {
                this._vToggleInsuredPay[idx].check();
            }
        }
    }

    /**
     * 重置所有投保选项状态
     * @param bEnable 
     */
    private _resetToggleGroupStatusAll(bEnable: boolean = true): void {
        for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
            this._resetToggleGroupStatusByIdx(i, bEnable);
        }
    }

    /**
     * 通过指定单选索引重置所有投保选项状态
     * @param idx 
     * @param bEnable 
     */
    private _resetToggleGroupStatusByIdx(idx: number, bEnable: boolean = true): void {
        if (idx < 0 || idx >= this._vToggleInsuredPay.length) return;

        this._vToggleInsuredPay[idx].isChecked = false;
        this._vToggleInsuredPay[idx].setTouchEnable(bEnable);
        this._updateToggleGroupTxtColorByIdx(idx);
    }

    /**
     * 通过指定投保额获取相应的赔付额(四舍五入)
     * @param insurePay 
     * @param toFixed 
     */
    private _getInsureOddsByPay(insurePay: number): number {
        let nOdds: number = cv.StringTools.times(insurePay, this._getCurrentRate());
        nOdds = this._getRealGameNumberHalfUp(nOdds, this._insuranceData.getDataIsMirco());
        return nOdds;
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
     * 更新所有投保选项文本颜色
     */
    private _updateToggleGroupTxtColorAll(): void {
        for (let i = 0; i < this._vToggleInsuredPay.length; ++i) {
            this._updateToggleGroupTxtColorByIdx(i);
        }
    }

    /**
     * 通过指定单选索引更新投保选项文本颜色
     * @param idx 
     */
    private _updateToggleGroupTxtColorByIdx(idx: number): void {
        // 暂时屏蔽
        return;

        if (idx < 0 || idx >= this._vToggleInsuredPay.length) return;
        let toggle: CustomToggle = this._vToggleInsuredPay[idx];
        let txt_node: cc.Node = toggle.node.getChildByName("txt_title");
        txt_node.color = toggle.isChecked ? cc.Color.WHITE : cc.Color.BLACK;
    }

    /**
     * 选择"投保额"(单选事件)
     * @param toggle 
     */
    private _onToggleGroupEvent(toggle: CustomToggle): void {
        // 当前投保额
        this._nInsurePay = 0;
        if (this._getToggleGroupCheckIndex() >= 0) {
            let tagCom: TagCom = toggle.getComponent(TagCom);
            this._nInsurePay = this._getFixedInsurePayByToggleIdx(tagCom.nTag);
        }

        // 当前赔付额
        this._nInsureOdds = this._getInsureOddsByPay(this._nInsurePay);

        // 更新投保选项文本颜色
        this._updateToggleGroupTxtColorAll();
    }

    /**
     * 设置"其他玩家弃牌"数量
     * @param value 
     */
    private _setTxtOtherCards(value: number): void {
        let strValue: string = cv.StringTools.formatC(cv.config.getStringData("Insurance_bg_other_cards_text"), cv.String(value));
        cv.StringTools.setRichTextString(this.rtxt_other_cards.node, strValue);
    }

    /**
     * 设置"当前 outs" 数量
     * @param value 
     */
    private _setTxtSelectOuts(value: number): void {
        let strValue: string = cv.StringTools.formatC(cv.config.getStringData("Insurance_bg_select_outs_text"), cv.String(value));
        cv.StringTools.setRichTextString(this.rtxt_select_outs.node, strValue);
    }

    /**
     * 设置"牌堆剩余牌" outs 数量
     * @param value 
     */
    private _setTxtLeftCards(value: number): void {
        let strValue: string = cv.StringTools.formatC(cv.config.getStringData("Insurance_bg_left_cards_text"), cv.String(value));
        cv.StringTools.setRichTextString(this.rtxt_left_cards.node, strValue);
    }

    /**
     * 设置"当前赔率"范围
     * @param value 
     */
    private _setTxtOddsRate(value: number): void {
        let strValue: string = cv.StringTools.formatC(cv.config.getStringData("Insurance_bg_odds_rate_text"), cv.String(value));
        cv.StringTools.setRichTextString(this.rtxt_odds_rate.node, strValue);
    }

    /**
     * 设置当前"可投保池"数量
     * @param value 
     */
    private _setChipsInsureNum(value: number): void {
        this._nChipsInsurance = value;
        this.txt_chips_insurance.string = cv.config.getStringData("Insurance_bg_keTouBao_txt") + cv.StringTools.numberToShowString(this._nChipsInsurance);
        this._layoutChipsPanel();
    }

    /**
     * 设置当前"底池"数量
     * @param value 
     */
    private _setChipsPotNum(value: number): void {
        this._nChipsPot = value;
        this.txt_chips_pot.string = cv.config.getStringData("Insurance_bg_dichi_txt") + cv.StringTools.numberToShowString(this._nChipsPot);
        this._layoutChipsPanel();
    }

    /**
     * 设置当前"当前投入"数量
     * @param value 
     */
    private _setChipsInvestNum(value: number): void {
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
     * 获取牌局真实数值(向上取整模式, 微牌局:保留两位小数, 其他牌局:取整数)
     * @param value    - 传入的数值
     * @param bDecimal - 是否保留小数(这里默认2位)
     */
    private _getRealGameNumberUp(value: number, bDecimal: boolean): number {
        let decimalPlaces: number = bDecimal ? 2 : 0;
        let nRet = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_UP);
        return nRet;
    }

    /**
     * 获取牌局真实数值(四舍五入模式, 微牌局:保留两位小数, 其他牌局:取整数)
     * @param value    - 传入的数值
     * @param bDecimal - 是否保留小数(这里默认2位)
     */
    private _getRealGameNumberHalfUp(value: number, bDecimal: boolean): number {
        let decimalPlaces: number = bDecimal ? 2 : 0;
        let nRet = cv.StringTools.toFixed(value, decimalPlaces, cv.StringTools.RoundingMode.ROUND_HALF_UP);
        return nRet;
    }
}
