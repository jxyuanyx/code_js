import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import cv from "../../lobby/cv";
import humanboyDataMgr from "./HumanboyDataMgr";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import { TagCom } from "../../../common/tools/TagCom";
import { HumanboyGameScene } from "./HumanboyGameScene";

/**
 * 上庄列表视图类型
 */
export enum eHumanboyDealerListViewType {
    HDLV_TYPE_NONE,							                                                        // 无
    HDLV_TYPE_WATTING,						                                                        // 上庄申请等待列表
    HDLV_TYPE_CANDIDATE,					                                                        // 上庄候选列表
};

/**
 * 上庄按钮状态
*/
export enum eHumanboyDealerBtnStatus {
    HDB_STATUS_NONE,						                                                        // 无
    HDB_STATUS_RECHARGE,					                                                        // 充值
    HDB_STATUS_DEALER_APPLY_WAIT,			                                                        // 申请排庄
    HDB_STATUS_DEALER_CANCEL_WAIT,			                                                        // 取消排庄
};

/**
 * 上庄列表
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyDealerList extends cc.Component {

    @property(cc.Prefab) prefab_dealerListItem: cc.Prefab = null;                                   // 庄家列表子项 预制件
    @property(cc.Sprite) img_shield: cc.Sprite = null;										        // 遮罩底图
    @property(cc.Sprite) img_bg: cc.Sprite = null;										            // 背景
    @property(cc.RichText) rtxt_prompt: cc.RichText = null;										    // 上庄人数显示文本
    @property(cc.Node) panel_opt: cc.Node = null;                                                   // 单选面板
    @property(cc.Node) panel_waitting: cc.Node = null;										        // 等待面板
    @property(cc.Node) panel_candidate: cc.Node = null;											    // 上庄面板

    private _opt_img_bg: cc.Sprite = null;											                // 单选按钮面板 背景图片
    private _opt_btn_apply: cc.Button = null;									                    // 单选按钮面板 申请上庄按钮
    private _opt_btn_list: cc.Button = null;									                    // 单选按钮面板 上庄列表按钮

    private _pw_list: cc.Node = null;						                                        // 等待面板 列表
    private _pw_list_sv: ScrollViewReuse = null;						                            // 等待面板 列表
    private _pw_list_scr_pos: cc.Vec2 = cc.Vec2.ZERO;                                               // 等待面板 列表 原位置
    private _pw_list_scr_size: cc.Size = cc.Size.ZERO;                                              // 等待面板 列表 原大小

    private _pw_txt_desc: cc.Label = null;                                                          // 等待面板 描述文本
    private _pw_txt_desc_scr_pos: cc.Vec2 = cc.Vec2.ZERO;                                           // 等待面板 描述文本 原位置

    private _pw_txt_waitting: cc.Label = null;                                                      // 等待面板 等待文本
    private _pw_panel_take: cc.Node = null;									                        // 等待面板 带入面板
    private _pw_btn_dealer: cc.Button = null;									                    // 等待面板 功能按钮

    private _pw_take_rtxt_take_in: cc.RichText = null;											    // 等待面板 带入面板 带入金额
    private _pw_take_rtxt_have_in: cc.RichText = null;											    // 等待面板 带入面板 持有金额
    private _pw_take_rtxt_take_min: cc.RichText = null;										        // 等待面板 带入面板 带入金额 最小
    private _pw_take_rtxt_take_max: cc.RichText = null;										        // 等待面板 带入面板 带入金额 最大
    private _pw_take_btn_minus: cc.Button = null;												    // 等待面板 带入面板 减号按钮
    private _pw_take_btn_plus: cc.Button = null;												    // 等待面板 带入面板 加号按钮
    private _pw_take_slider: cc.Slider = null;											            // 等待面板 带入面板 带入滑条
    private _pw_take_slider_bg: cc.Sprite = null;                                                   // 等待面板 带入面板 带入滑条 底图
    private _pw_take_slider_sp: cc.Sprite = null;                                                   // 等待面板 带入面板 带入滑条 精灵
    private _pw_take_slider_min_percent: number = 0;										        // 等待面板 带入面板 带入滑条 最小份数

    private _pc_list: cc.Node = null;					                                            // 上庄面板 列表
    private _pc_list_sv: ScrollViewReuse = null;						                            // 上庄面板 列表
    private _pc_txt_desc: cc.Label = null;										                    // 上庄面板 描述

    private _atlas_hb_language: cc.SpriteAtlas = null;                                              // 百人语言图集
    private _viewType: eHumanboyDealerListViewType = eHumanboyDealerListViewType.HDLV_TYPE_NONE;	// 上庄列表视图类型
    private _btnStatus: eHumanboyDealerBtnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_NONE;        // 上庄按钮状态

    show(anim: boolean, eType: eHumanboyDealerListViewType): void {
        this._autoAnimFunc(true, anim);
        this.setViewType(eType);
    }

    hide(anim: boolean): void {
        this._autoAnimFunc(false, anim);
    }

    setViewType(eType: eHumanboyDealerListViewType): void {
        if (this._viewType === eType) return;
        this._viewType = eType;

        let bOptSelected: boolean = false;
        switch (this._viewType) {
            case eHumanboyDealerListViewType.HDLV_TYPE_NONE: break;
            case eHumanboyDealerListViewType.HDLV_TYPE_WATTING: bOptSelected = false; break;
            case eHumanboyDealerListViewType.HDLV_TYPE_CANDIDATE: bOptSelected = true; break;
            default: break;
        }

        // true 显示庄家列表, false 显示等待列表
        if (bOptSelected) {
            this._opt_btn_apply.node.getChildByName("txt").color = cc.Color.WHITE;
            this._opt_btn_list.node.getChildByName("txt").color = cc.color(0x2D, 0x2B, 0x3F, 0xFF);
            this._opt_img_bg.node.angle = 0;
        }
        else {
            this._opt_btn_apply.node.getChildByName("txt").color = cc.color(0x2D, 0x2B, 0x3F, 0xFF);
            this._opt_btn_list.node.getChildByName("txt").color = cc.Color.WHITE;
            this._opt_img_bg.node.angle = 180;
        }

        this.updateView();
    }

    getViewType(): eHumanboyDealerListViewType {
        return this._viewType;
    }

    updateView(): void {
        switch (this._viewType) {
            case eHumanboyDealerListViewType.HDLV_TYPE_NONE: break;

            case eHumanboyDealerListViewType.HDLV_TYPE_WATTING: {
                let uid: number = cv.dataHandler.getUserData().u32Uid;
                if (humanboyDataMgr.getHumanboyRoom().isInDealerWatingList(uid)) {
                    cv.resMgr.setSpriteFrame(this.img_bg.node, "zh_CN/game/humanboy/humanboy_list_bg_1");
                }
                else {
                    cv.resMgr.setSpriteFrame(this.img_bg.node, "zh_CN/game/humanboy/humanboy_list_bg_2");
                }

                this.panel_waitting.active = true;
                this.panel_candidate.active = false;

                this._updateWaittingView();
            } break;

            case eHumanboyDealerListViewType.HDLV_TYPE_CANDIDATE: {
                cv.resMgr.setSpriteFrame(this.img_bg.node, "zh_CN/game/humanboy/humanboy_list_bg_1");

                this.panel_waitting.active = false;
                this.panel_candidate.active = true;

                this._updateCandidateView();
            } break;

            default: break;
        }

        this._updateDealerDesc();
    }

    /**
     * 设置庄家按钮禁用与否
     * @param enabled 
     */
    setBtnDealerEnable(enabled: boolean): void {
        let txt: cc.Label = this._pw_btn_dealer.node.getChildByName("txt").getComponent(cc.Label);
        if (enabled) {
            txt.node.color = cc.Color.WHITE;
        }
        else {
            txt.node.color = cc.color(0x7F, 0x7F, 0x7F, 0xFF);
        }
        this._pw_btn_dealer.interactable = enabled;
    }

    /**
     * 检查庄家按钮状态	
     */
    checkBtnDealerEnable(): void {
        // 当前可购买的股份
        let uCanBuyStockNum: number = humanboyDataMgr.getHumanboyRoom().uCanBuyStockNum;

        // 设置按钮点击状态等
        this.setBtnDealerEnable(uCanBuyStockNum > 0 || this._btnStatus === eHumanboyDealerBtnStatus.HDB_STATUS_RECHARGE);
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.img_bg.node, true);
        this._init();
    }

    protected start(): void {
    }

    private _init(): void {
        this._initAtlasList();
        this._initLanguageUI();
        this._initPanelOpt();
        this._initPanelWaitting();
        this._initPanelCandidate();
        this.node.on(cc.Node.EventType.TOUCH_END, (sender: cc.Node) => { this.hide(true); });
    }

    /**
     * 初始化图集
     */
    private _initAtlasList(): void {
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
    }

    private _initLanguageUI(): void {
        let img_title: cc.Sprite = this.img_bg.node.getChildByName("img_title").getComponent(cc.Sprite);
        img_title.spriteFrame = this._atlas_hb_language.getSpriteFrame("humanboy_icon_dealer");
    }

    /**
     * 初始化 单选面板
     */
    private _initPanelOpt(): void {
        this._opt_img_bg = this.panel_opt.getChildByName("img_bg").getComponent(cc.Sprite);

        this._opt_btn_apply = this.panel_opt.getChildByName("btn_apply").getComponent(cc.Button);
        this._opt_btn_apply.node.on("click", (sender: cc.Node): void => { 
            cv.AudioMgr.playButtonSound('tab');
            this.setViewType(eHumanboyDealerListViewType.HDLV_TYPE_WATTING); 
        });

        this._opt_btn_list = this.panel_opt.getChildByName("btn_list").getComponent(cc.Button);
        this._opt_btn_list.node.on("click", (sender: cc.Node): void => { 
            cv.AudioMgr.playButtonSound('tab');
            this.setViewType(eHumanboyDealerListViewType.HDLV_TYPE_CANDIDATE); 
        });

        let txt_opt_apply: cc.Label = this._opt_btn_apply.node.getChildByName("txt").getComponent(cc.Label);
        txt_opt_apply.string = cv.config.getStringData("Humanboy_game_dealer_apply_txt");

        let txt_opt_list: cc.Label = this._opt_btn_list.node.getChildByName("txt").getComponent(cc.Label);
        txt_opt_list.string = cv.config.getStringData("Humanboy_game_dealer_list_txt");
    }

    /**
     * 初始化 等待面板
     */
    private _initPanelWaitting(): void {
        this._pw_list = this.panel_waitting.getChildByName("list");
        this._pw_list_scr_pos = cc.v2(this._pw_list.position);
        this._pw_list_scr_size = cc.size(this._pw_list.getContentSize());

        this._pw_txt_desc = this.panel_waitting.getChildByName("txt_desc").getComponent(cc.Label);
        this._pw_txt_desc_scr_pos = cc.v2(this._pw_txt_desc.node.position);

        this._pw_txt_waitting = this.panel_waitting.getChildByName("txt_waitting").getComponent(cc.Label);
        this._pw_txt_waitting.string = cv.config.getStringData("Humanboy_game_dealer_queuing");

        this._pw_btn_dealer = this.panel_waitting.getChildByName("btn_dealer").getComponent(cc.Button);
        this._pw_btn_dealer.node.on("click", (sender: cc.Node): void => {
            cv.AudioMgr.playButtonSound('button_click'); 
            this._onClickBtnDealer(); 
        });

        this._pw_panel_take = this.panel_waitting.getChildByName("panel_take");
        this._pw_take_rtxt_take_in = this._pw_panel_take.getChildByName("rtxt_take_in").getComponent(cc.RichText);
        this._pw_take_rtxt_have_in = this._pw_panel_take.getChildByName("rtxt_have_in").getComponent(cc.RichText);
        this._pw_take_rtxt_take_min = this._pw_panel_take.getChildByName("rtxt_take_min").getComponent(cc.RichText);
        this._pw_take_rtxt_take_max = this._pw_panel_take.getChildByName("rtxt_take_max").getComponent(cc.RichText);

        this._pw_take_btn_minus = this._pw_panel_take.getChildByName("btn_minus").getComponent(cc.Button);
        this._pw_take_btn_minus.node.on("click", (sender: cc.Node): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this._addSliderProgress(false) 
        });

        this._pw_take_btn_plus = this._pw_panel_take.getChildByName("btn_plus").getComponent(cc.Button);
        this._pw_take_btn_plus.node.on("click", (sender: cc.Node): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this._addSliderProgress(true) 
        });

        this._pw_take_slider = this._pw_panel_take.getChildByName("slider").getComponent(cc.Slider);
        this._pw_take_slider_bg = this._pw_take_slider.node.getChildByName("img_bg").getComponent(cc.Sprite);
        this._pw_take_slider_sp = this._pw_take_slider.node.getChildByName("img_sp").getComponent(cc.Sprite);

        this._pw_take_slider.node.on("slide", this._onSliderEvent, this);
    }

    /**
     * 初始化 上庄面板
     */
    private _initPanelCandidate(): void {
        this._pc_list = this.panel_candidate.getChildByName("list");
        this._pc_txt_desc = this.panel_candidate.getChildByName("txt_desc").getComponent(cc.Label);
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
            let start_pos: cc.Vec2 = cc.v2(cc.winSize.width / 2 + this.img_bg.node.width / 2, 0);
            let end_pos: cc.Vec2 = cc.v2(cc.winSize.width / 2 - this.img_bg.node.width / 2 - offset_x, 0);

            this.img_bg.node.setPosition(start_pos);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_bg.node.setPosition(end_pos);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
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
            let start_pos: cc.Vec2 = cc.v2(cc.winSize.width / 2 - this.img_bg.node.width / 2 - offset_x, 0);
            let end_pos: cc.Vec2 = cc.v2(cc.winSize.width / 2 + this.img_bg.node.width / 2, 0);

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

    /**
     *  更新等待面板
     */
    private _updateWaittingView(): void {
        this._checkDealerBtnStatus();

        // 列表
        do {
            if (!this._pw_list_sv) {
                this._pw_list_sv = this._pw_list.getComponent(ScrollViewReuse);
                this._pw_list_sv.bindPrefab(this.prefab_dealerListItem, "HumanboyDealerListItem");
                this._pw_list_sv.generateItemPool();

                // 添加视图类型标记
                let tag: TagCom = this._pw_list_sv.addComponent(TagCom);
                tag.nTag = this.getViewType();
            }
            let vDealerWatingList: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerWatingList;
            this._pw_list_sv.reloadView(vDealerWatingList);

            let str_prompt: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_line_up"), vDealerWatingList.length);
            cv.StringTools.setRichTextString(this.rtxt_prompt.node, str_prompt);
        } while (0);

        // 带入
        do {
            let uid = cv.dataHandler.getUserData().u32Uid;
            if (humanboyDataMgr.getHumanboyRoom().isInDealerWatingList(uid)) {
                this._pw_txt_waitting.node.active = true;
                this._pw_panel_take.active = false;

                // 适配描述文本位置
                let offset_y: number = this._pw_txt_waitting.node.y - this._pw_btn_dealer.node.y;
                this._pw_txt_desc.node.setPosition(this._pw_txt_desc.node.x, this._pw_txt_waitting.node.y + offset_y);

                // 适配列表位置和大小
                let txt_desc_size: cc.Size = cv.resMgr.getLabelStringSize(this._pw_txt_desc);
                let txt_desc_offset_h: number = this._pw_txt_desc.node.y + (1 - this._pw_txt_desc.node.anchorY) * txt_desc_size.height;
                txt_desc_offset_h += 20;

                let list_w: number = this._pw_list_scr_size.width;
                let list_h: number = this.panel_waitting.height - txt_desc_offset_h;
                this._pw_list_sv.resetScrollVewSize(cc.size(list_w, list_h));

                let pos: cc.Vec2 = cc.Vec2.ZERO;
                pos.x = this._pw_list_scr_pos.x;
                pos.y = this.panel_waitting.height + (this._pw_list_sv.node.anchorY - 1) * this._pw_list_sv.node.height;
                this._pw_list_sv.node.setPosition(pos);
            }
            else {
                this._pw_txt_waitting.node.active = false;
                this._pw_panel_take.active = true;

                // 适配描述文本位置
                this._pw_txt_desc.node.setPosition(this._pw_txt_desc_scr_pos);

                // 适配列表位置和大小
                this._pw_list_sv.resetScrollVewSize(this._pw_list_scr_size);
                this._pw_list_sv.node.setPosition(this._pw_list_scr_pos);

                // 更新滑条
                this._resetSliderPercent();
            }
        } while (0);
    }

    /**
     * 更新上庄面板
     */
    private _updateCandidateView(): void {
        if (!this._pc_list_sv) {
            this._pc_list_sv = this._pc_list.getComponent(ScrollViewReuse);
            this._pc_list_sv.bindPrefab(this.prefab_dealerListItem, "HumanboyDealerListItem");
            this._pc_list_sv.generateItemPool();

            // 添加视图类型标记
            let tag: TagCom = this._pc_list_sv.addComponent(TagCom);
            tag.nTag = this.getViewType();
        }

        let vDealerCandidateList: humanboy_proto.DealerPlayerInfo[] = humanboyDataMgr.getHumanboyRoom().vDealerCandidateList;
        this._pc_list_sv.reloadView(vDealerCandidateList);

        let str_prompt: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_candidate"), vDealerCandidateList.length);
        cv.StringTools.setRichTextString(this.rtxt_prompt.node, str_prompt);
    }

    /**
     * 更新上庄介绍
     */
    private _updateDealerDesc(): void {
        let uTotalStockNum: number = humanboyDataMgr.getHumanboyRoom().uTotalStockNum;				// 总股数上限
        let llMoneyperstock: number = humanboyDataMgr.getHumanboyRoom().tCurRoom.moneyPerStock;	    // 上庄每股多少钱
        let uSingleMaxStock: number = humanboyDataMgr.getHumanboyRoom().tCurRoom.singleMaxStock;	// 一个人最多可购买的股份数量

        let str_money_perstock: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llMoneyperstock);
        let str_money_totalstock: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(uTotalStockNum * llMoneyperstock);
        let str_desc: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_desc")
            , str_money_totalstock, str_money_perstock, uTotalStockNum, uSingleMaxStock);

        // 等待面板描述
        this._pw_txt_desc.string = cv.StringTools.calculateAutoWrapString(this._pw_txt_desc.node, str_desc);

        // 上庄面板描述
        this._pc_txt_desc.string = cv.StringTools.calculateAutoWrapString(this._pc_txt_desc.node, str_desc);
    }

    /**
     * 设置减号按钮禁用与否
     * @param enabled 
     */
    private _setBtnMinusEnable(enabled: boolean): void {
        if (enabled) {
            this._pw_take_btn_minus.node.color = cc.Color.WHITE;
        }
        else {
            this._pw_take_btn_minus.node.color = cc.color(0x7F, 0x7F, 0x7F, 0xFF);
        }
        this._pw_take_btn_minus.interactable = enabled;
    }

    /**
     * 设置加号按钮禁用与否
     * @param enabled 
     */
    private _setBtnPlusEnable(enabled: boolean): void {
        if (enabled) {
            this._pw_take_btn_plus.node.color = cc.Color.WHITE;
        }
        else {
            this._pw_take_btn_plus.node.color = cc.color(0x7F, 0x7F, 0x7F, 0xFF);
        }
        this._pw_take_btn_plus.interactable = enabled;
    }

    /**
     * 设置滑条按钮禁用与否
     * @param enabled 
     */
    private _setSliderEnable(enabled: boolean): void {
        if (enabled) {
            this._pw_take_slider.handle.node.color = cc.Color.WHITE;
        }
        else {
            this._pw_take_slider.handle.node.color = cc.color(0x7F, 0x7F, 0x7F, 0xFF);
        }
        this._pw_take_slider.handle.interactable = enabled;
        this._pw_take_slider.enabled = enabled;
    }

    /**
     * 增减滑条刻度(一份一份的增减)
     * @param bAddOne 
     */
    private _addSliderProgress(bAddOne: boolean): void {
        let uTotalStockNum: number = humanboyDataMgr.getHumanboyRoom().uTotalStockNum;				    // 总股数
        let uCanBuyStockNum: number = humanboyDataMgr.getHumanboyRoom().uCanBuyStockNum;				// 当前可购买的股份
        let sliderPerRatio: number = cv.StringTools.div(1, uTotalStockNum);

        if (bAddOne) {
            let n1: number = cv.StringTools.plus(this._pw_take_slider.progress, sliderPerRatio);
            let n2: number = cv.StringTools.times(uCanBuyStockNum, sliderPerRatio);
            if (n1 <= n2) {
                this._pw_take_slider.progress = n1;
                this._setBtnMinusEnable(true);
                this._updateSliderPercent();
            }
            else {
                this._setBtnPlusEnable(false);
            }
        }
        else {
            let n1: number = cv.StringTools.minus(this._pw_take_slider.progress, sliderPerRatio);
            let n2: number = cv.StringTools.times(this._pw_take_slider_min_percent, sliderPerRatio);
            if (n1 >= n2) {
                this._pw_take_slider.progress = n1;
                this._setBtnPlusEnable(true);
                this._updateSliderPercent();
            }
            else {
                this._setBtnMinusEnable(false);
            }
        }
    }

    /**
     * 滑条事件事件
     */
    private _onSliderEvent(sender: cc.Node): void {
        let uTotalStockNum: number = humanboyDataMgr.getHumanboyRoom().uTotalStockNum;				    // 总股数
        let uCanBuyStockNum: number = humanboyDataMgr.getHumanboyRoom().uCanBuyStockNum;				// 当前可购买的股份
        let sliderPerRatio: number = cv.StringTools.div(1, uTotalStockNum);                             // 滑条每份比例

        let percent: number = Math.ceil(cv.StringTools.div(this._pw_take_slider.progress, sliderPerRatio));
        percent = Math.max(percent, this._pw_take_slider_min_percent);
        percent = Math.min(percent, uCanBuyStockNum);
        percent = cv.StringTools.times(percent, sliderPerRatio);

        this._pw_take_slider.progress = percent;
        this._updateSliderPercent();
    }

    /**
     * 重置滑条
     */
    private _resetSliderPercent(): void {
        let uTotalStockNum: number = humanboyDataMgr.getHumanboyRoom().uTotalStockNum;				                // 总股数
        let sliderPerRatio: number = cv.StringTools.div(1, uTotalStockNum);                                         // 滑条每份比例
        this._pw_take_slider_min_percent = 1;                                                                       // 最小份数
        this._pw_take_slider.progress = cv.StringTools.times(this._pw_take_slider_min_percent, sliderPerRatio);
        this._updateSliderPercent();
    }

    /**
     * 更新滑条
     */
    private _updateSliderPercent(): void {
        if (!this.panel_waitting.active) return;
        this._pw_take_slider_sp.node.width = cv.StringTools.times(this._pw_take_slider.progress, this._pw_take_slider.node.width);

        let uMoneyPerStock: number = humanboyDataMgr.getHumanboyRoom().tCurRoom.moneyPerStock;		    // 上庄每股多少钱
        let uTotalStockNum: number = humanboyDataMgr.getHumanboyRoom().uTotalStockNum;				    // 总股数
        let uCanBuyStockNum: number = humanboyDataMgr.getHumanboyRoom().uCanBuyStockNum;				// 当前可购买的股份
        let sliderPerRatio: number = cv.StringTools.div(1, uTotalStockNum);                             // 滑条每份比例

        this._setSliderEnable(uCanBuyStockNum > 0);
        this._setBtnPlusEnable(this._pw_take_slider.progress <= cv.StringTools.times(uCanBuyStockNum - 1, sliderPerRatio));
        this._setBtnMinusEnable(this._pw_take_slider.progress >= cv.StringTools.times(this._pw_take_slider_min_percent + 1, sliderPerRatio));

        let str_min: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(uMoneyPerStock);
        let str_max: string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(uMoneyPerStock * uTotalStockNum);
        cv.StringTools.setRichTextString(this._pw_take_rtxt_take_min.node, cv.StringTools.formatC("Min:%s", str_min));
        cv.StringTools.setRichTextString(this._pw_take_rtxt_take_max.node, cv.StringTools.formatC("Max:%s", str_max));

        let nTakeGold: number = cv.StringTools.div(this._pw_take_slider.progress, sliderPerRatio);
        nTakeGold = cv.StringTools.times(nTakeGold, uMoneyPerStock);
        let strTakeIn: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_take_in"), humanboyDataMgr.getHumanboyRoom().transGoldShortString(nTakeGold));
        cv.StringTools.setRichTextString(this._pw_take_rtxt_take_in.node, strTakeIn);

        let nHaveGold: number = humanboyDataMgr.getHumanboyRoom().getPlayerBeforeSettlementGold(cv.dataHandler.getUserData().u32Uid);
        let strHaveIn: string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_game_dealer_have_in"), humanboyDataMgr.getHumanboyRoom().transGoldShortString(nHaveGold));
        cv.StringTools.setRichTextString(this._pw_take_rtxt_have_in.node, strHaveIn);
    }

    /**
     * 功能按钮事件
     */
    private _onClickBtnDealer(): void {
        switch (this._btnStatus) {
            case eHumanboyDealerBtnStatus.HDB_STATUS_NONE:
                break;

            case eHumanboyDealerBtnStatus.HDB_STATUS_RECHARGE: {
                cv.MessageCenter.send("on_recharge_notify");
            } break;

            case eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_APPLY_WAIT: {
                // 禁用按钮,消息返回或重新打开界面解禁
                this.setBtnDealerEnable(false);

                let uTotalStockNum: number = humanboyDataMgr.getHumanboyRoom().uTotalStockNum;				    // 总股数
                let sliderPerRatio: number = cv.StringTools.div(1, uTotalStockNum);                             // 滑条每份比例
                let uBuyStockNum: number = cv.StringTools.div(this._pw_take_slider.progress, sliderPerRatio);   // 当前选购的股数
                cv.humanboyNet.requestUpDealer(uBuyStockNum);
            } break;

            case eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_CANCEL_WAIT: {
                cv.humanboyNet.requestCancelWait();
            } break;

            default:
                break;
        }
    }

    private _checkDealerBtnStatus(): void {
        this._setSliderEnable(true);
        this.setBtnDealerEnable(true);

        // uid
        let uid = cv.dataHandler.getUserData().u32Uid;

        let img: cc.Sprite = this._pw_btn_dealer.node.getChildByName("img").getComponent(cc.Sprite);
        img.node.active = false;

        let txt = this._pw_btn_dealer.node.getChildByName("txt").getComponent(cc.Label);
        txt.string = "";

        // 充值
        if (humanboyDataMgr.getHumanboyRoom().tSelfPlayer.curCoin < humanboyDataMgr.getHumanboyRoom().tCurRoom.moneyPerStock) {
            this._btnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_RECHARGE;
            img.node.active = true;
            txt.string = cv.config.getStringData("Humanboy_game_dealer_btn_txt_recharge");
            txt.node.setContentSize(120, txt.node.height);
            txt.node.setPosition(27, 0);
        }
        // 取消排庄
        else if (humanboyDataMgr.getHumanboyRoom().isInDealerWatingList(uid)) {
            this._btnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_CANCEL_WAIT;
            txt.string = cv.config.getStringData("Humanboy_game_dealer_btn_txt_cancle");
            txt.node.setContentSize(180, txt.node.height);
            txt.node.setPosition(cc.Vec2.ZERO);

            cv.resMgr.setSpriteFrame(this.img_bg.node, "zh_CN/game/humanboy/humanboy_list_bg_1");
        }
        // 上庄排队
        else {
            this._btnStatus = eHumanboyDealerBtnStatus.HDB_STATUS_DEALER_APPLY_WAIT;
            txt.string = cv.config.getStringData("Humanboy_game_dealer_btn_txt_up");
            txt.node.setContentSize(180, txt.node.height);
            txt.node.setPosition(cc.Vec2.ZERO);
            this.checkBtnDealerEnable();
        }

        // 1 当局会下庄  2 需要下局才下庄
        if (humanboyDataMgr.getHumanboyRoom().tDownDealerResp.doNow === 2) {
            this._setSliderEnable(false);
            this.setBtnDealerEnable(false);
        }

        // 清屏准备阶段恢复"排庄"按钮
        if (humanboyDataMgr.getHumanboyRoom().eCurState === humanboy_proto.RoundState.WAIT_NEXT_ROUND2) {
            this._setSliderEnable(true);
            this.setBtnDealerEnable(true);
        }
    }
}
