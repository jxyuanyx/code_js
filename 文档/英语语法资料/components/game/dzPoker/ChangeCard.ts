import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../lobby/cv";
import GameDataManager from "./data/GameDataManager";
import { GameMain } from "./GameMain";
import Tag from "../../../common/tools/Tag";
import { HashMap } from "../../../common/tools/HashMap";
import { TableView } from "../../../common/tools/TableView";
import { ChangeCardCardFaceItem, ChangeCardCardFaceItemData } from "./ChangeCardCardFaceItem";

/**
 * 快捷加注按钮类型
 */
enum QuickBetDataType {
    /**
     * 德州3按钮
     */
    QBDT_TEXAS_3 = 0,

    /**
     * 德州5按钮
     */
    QBDT_TEXAS_5,

    /**
     * 奥马哈3按钮
     */
    QBDT_PLO_3,

    /**
     * 奥马哈5按钮
     */
    QBDT_PLO_5,
}

/**
 * 快捷下注公用滑条数据结构
 */
export class QuickBetRange {
    Min: number = 0;
    Max: number = 0;
    Step: number = 0;
    Value: number = 0;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class ChangeCard extends cc.Component {
    // 结构
    @property(cc.Node) nd_tabs: cc.Node = null;
    @property(cc.Node) nd_contents: cc.Node = null;

    // 牌桌Tab
    @property(TableView) nd_card_styles: TableView = null;
    @property(cc.Node) nd_card_bgs: cc.Node = null;
    @property(cc.Node) nd_table_bgs: cc.Node = null;

    // 快捷加注
    @property(cc.Node) nd_quick_opt_bet: cc.Node = null;
    @property(cc.Node) nd_quick_opt_panel: cc.Node = null;

    // 开关Tab
    @property(cc.Node) nd_switch_effect: any = null;
    @property(cc.Node) nd_switch_vibrate: any = null;
    @property(cc.Node) nd_switch_voice: any = null;
    @property(cc.Node) nd_switch_barrage: any = null;
    @property(cc.Node) nd_switch_giftanim: any = null;
    @property(cc.Node) nd_switch_bet_preflop: any = null;
    @property(cc.Node) table_bgs: any = null;

    public isButton3: boolean = true;
    private gameMain: GameMain = null;

    private _tableview_cards_style_datas: ChangeCardCardFaceItemData[] = [];    // 牌面数据数组
    private _quickBetData: HashMap<number, number[][]> = new HashMap();         // 快捷加注翻后数据表
    private _quickBetCurPanelisPreflop: boolean = true;                         // 当前快捷下注面板是否是翻前还是翻后(true: 翻前; false:翻后)
    private _quickBetCurSelectIndex: number = 0;                                // 当前快捷下注勾选的具体下注按钮索引
    private _quickBetPreflopSliderStep: number = 3;                             // 快捷下注"翻前"滑条刻度数量(规定数量: 3)
    private _quickBetPreflopSliderInitalMin: number = 2;                        // 快捷下注"翻前"滑条初始最小值(规定第一个按钮的范围取值: 2 ~ 4)

    protected onLoad(): void {
        this.initLanguage();
        this.initQuickBetData();
        this.initQuickBetEvent();

        let shortCut_bet_tab = this.nd_tabs.children[1];
        let shortCut_bet_panel = this.nd_contents.children[1];
        let curGameID = cv.roomManager.getCurrentGameID()
        if (curGameID != cv.Enum.GameId.Allin) {
            shortCut_bet_tab.active = true;
            shortCut_bet_panel.active = true;
        } else {
            shortCut_bet_tab.active = false;
            shortCut_bet_panel.active = false;
        }

        if (!this.isStarRoom()) {
            //如果不是明星桌，将第一张明星桌背景图片移除
            let starBg: cc.Node = this.table_bgs.getChildByName("bg_star");
            if (starBg) {
                starBg.removeFromParent(true);
                starBg.destroy();
            }

            // 非明星桌隐藏"礼物动画"开关
            this.nd_switch_giftanim.active = false;
            this.updateSwitchLauyou();
        }
        else {
            this.setStarbg(0);

            // 明星桌激活"礼物动画"开关
            this.nd_switch_giftanim.active = true;
            this.updateSwitchLauyou();
        }

        // 填充"cardstyle牌面"数据("onLoad"里只负责填充数据, "start"里才刷新"tableview", 因为"tableview"的生命周期原理)
        do {
            // 牌面索引数组(其中索引元素含义为"第n套牌")
            let cardstyleIdxs: number[] = [];
            if (this.isPloRoom()) {
                cardstyleIdxs = [4, 1, 5, 6];
            }
            else {
                cardstyleIdxs = [0, 1, 2, 3];
            }

            // 填充数据
            this._tableview_cards_style_datas = [];
            for (let i = 0; i < cardstyleIdxs.length; ++i) {
                let t: ChangeCardCardFaceItemData = new ChangeCardCardFaceItemData();
                t.index = cardstyleIdxs[i];
                t.isCheck = false;
                this._tableview_cards_style_datas.push(t);
            }
        } while (false);

        this.chooseCardBg(cv.tools.GetCardBack());

        let index = cv.tools.GetTableBack(this.isStarRoom());
        if (this.isStarRoom()) {
            index = index + 1;
        }
        this.chooseTableBg(index);

        this.initSwitches();
        this.chooseTab(0);

        cv.MessageCenter.register("on_snapshot_roominfo", this.OnSnapShotRoomInfo.bind(this), this.node);
        cv.MessageCenter.register("quickraise", this.onMsgQuickBetRaise.bind(this), this.node);
        cv.MessageCenter.register("defaultsetting", this.onMsgQuickBetResetSetting.bind(this), this.node)
        cv.MessageCenter.register("change_qucikbet_setting", this.onMsgQuickBetChangeSetting.bind(this), this.node);
        cv.MessageCenter.register(`${ChangeCardCardFaceItem.g_class_name}_toggle`, this.onClickCardStyle.bind(this), this.node);
    }

    protected start(): void {
        let cardFaceStyleIdx: number = cv.tools.GetCardFace();
        if (this.isPloRoom()) {
            cardFaceStyleIdx = cv.tools.GetCardFacePlo();
        }
        this.chooseCardStyle(cardFaceStyleIdx);
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("on_snapshot_roominfo", this.node);
        cv.MessageCenter.unregister("quickraise", this.node);
        cv.MessageCenter.unregister("defaultsetting", this.node);
        cv.MessageCenter.unregister("change_qucikbet_setting", this.node);
        cv.MessageCenter.unregister(`${ChangeCardCardFaceItem.g_class_name}_toggle`, this.node);
    }

    //starbgnum是除去bg_star的数量
    setStarbg(starbgnum: number) {
        //设置bg小图标
        for (let i = 0; i < starbgnum; i++) {
            const node = this.nd_table_bgs.getChildByName("bg_" + i);
            let j = i + 1
            cv.resMgr.setSpriteFrame(node.getComponent(cc.Sprite).node, 'zh_CN/game/dzpoker/cardStarUi/table_star_0' + j);
        }

        for (let i = starbgnum; i < 9; i++) {
            const node = this.nd_table_bgs.getChildByName("bg_" + i);
            if (node) {
                node.removeFromParent(true);
                node.destroy();
            }
        }
    }

    /**
     * 当前是明星桌
     */
    private isStarRoom(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID === cv.Enum.GameId.StarSeat;
    }

    /**
     * 当前是奥马哈
     */
    private isPloRoom(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID === cv.Enum.GameId.Plo;
    }

    public setGameMain(gamemain: GameMain) {
        this.gameMain = gamemain;

        // 初始化游戏中的快捷下注模式(开关开了就是翻前)
        let isOpenPreflop: boolean = cv.tools.isBetPreflop();
        this.gameMain.quickBetModeIsPreflop = isOpenPreflop;
    }

    public initLanguage() {
        cv.StringTools.setLabelString(this.nd_tabs, "tab_table", "jackfruit_setting_tab_table");
        cv.StringTools.setLabelString(this.nd_tabs, "tab_add", "GameScene_changeCard_panel_tab_add");
        cv.StringTools.setLabelString(this.nd_tabs, "tab_switch", "jackfruit_setting_tab_switch");

        let table = cc.find("content_table", this.nd_contents);
        cv.StringTools.setLabelString(table, "title_card_styles/title", "GameScene_changeCard_panel_changeCardTitle_txt");
        cv.StringTools.setLabelString(table, "title_card_bgs/title", "GameScene_changeCard_panel_changeBackTitle_txt");
        cv.StringTools.setLabelString(table, "title_table_bgs/title", "jackfruit_setting_0");

        cv.StringTools.setLabelString(this.nd_quick_opt_panel, "opt_btn/opt_btn_3/label", "GameScene_changeCard_panel_shortCut_bet_panel_show_button_3_label");
        cv.StringTools.setLabelString(this.nd_quick_opt_panel, "opt_btn/opt_btn_5/label", "GameScene_changeCard_panel_shortCut_bet_panel_show_button_5_label");
        cv.StringTools.setLabelString(this.nd_quick_opt_panel, "reset/title", "GameScene_changeCard_panel_shortCut_bet_panel_recoverShortCut_button");
        cv.StringTools.setLabelString(this.nd_quick_opt_bet, "btn_preflop/txt", "GameScene_changeCard_panel_tab_add_bet_preflop_txt");
        cv.StringTools.setLabelString(this.nd_quick_opt_bet, "btn_flop/txt", "GameScene_changeCard_panel_tab_add_bet_flop_txt");

        let opt_panel_btns: cc.Node = this.nd_quick_opt_panel.getChildByName("btns");
        opt_panel_btns.children.forEach(type => {
            type.children.forEach(btn => {
                cv.StringTools.setLabelString(btn, "unit", "GameScene_changeCard_panel_shortCut_bet_panel_button_0_word_text");
            });
        });

        cv.StringTools.setLabelString(this.nd_switch_effect, "title", "jackfruit_setting_sound_effects_btn_label");
        cv.StringTools.setLabelString(this.nd_switch_vibrate, "title", "jackfruit_setting_vibrate_btn_label");
        cv.StringTools.setLabelString(this.nd_switch_voice, "title", "curentTime_curentTime_panel_voice_txt");
        cv.StringTools.setLabelString(this.nd_switch_barrage, "title", "Faceview_danmu_button_danmu");
        cv.StringTools.setLabelString(this.nd_switch_giftanim, "title", "Gift_anim");
        cv.StringTools.setLabelString(this.nd_switch_bet_preflop, "title", "GameScene_changeCard_panel_tab_add_bet_preflop_switch");
    }

    /**
     * 接收初始化房间消息
     */
    OnSnapShotRoomInfo(): void {
        /** 初始化"快捷下注"
         * 之所以加入这条消息, 是因为"on_snapshot_roominfo"消息和场景的"onLoad"无法确定先手顺序
         * 如果场景加载慢, 那么就是"onload"先于"snapshot", 否则"snapshot"先于"onload"
         * 但是德州的"GameMain"会在初始化完毕后重发"snapshot", 所以这里触发的"snapshot"必定晚于"onload"
         */

        // 更新快捷下注面板布局格式
        this.updateQuickBetOptPanelLayout();
    }

    //关闭桌面设置
    public onClickSelf(evt) {
        this.node.active = false;
        //cv.resMgr.releaseGameBgCard();
    }

    //当tab被点击
    onClickTab(event: any) {
        let index = this.nd_tabs.children.indexOf(event.target);
        this.chooseTab(index);
        cv.AudioMgr.playButtonSound('tab');
    }

    chooseTab(index: number) {
        //游标
        for (let i = 0; i < this.nd_tabs.childrenCount; i++) {
            const node = this.nd_tabs.children[i];
            let isSelect = i == index;
            node.color = isSelect ? cc.color(251, 216, 136) : cc.color(138, 139, 144);
            cc.find("cursor", node).active = isSelect;
        }

        //内容
        for (let i = 0; i < this.nd_contents.childrenCount; i++) {
            const content = this.nd_contents.children[i];
            content.active = i == index;
        }

        // 若切换到"快捷下注"栏(刷新面板布局格式)
        if (index === 1) {
            this.updateQuickBetOptPanelLayout();
        }
    }

    //当牌样式被点击
    onClickCardStyle(data: ChangeCardCardFaceItemData) {
        this.chooseCardStyle(data.index, false);
        cv.AudioMgr.playButtonSound('tab');

        if (this.isPloRoom()) {
            cv.tools.SetCardFacePlo(data.index);
        }
        else {
            cv.tools.SetCardFace(data.index);
        }

        this.gameMain.UpdateCardFace();

        // 发送"牌面更换"消息
        cv.MessageCenter.send("ChangeCard_onClickCardFace");
    }

    chooseCardStyle(index: number, resetPos: boolean = true) {
        for (let i = 0; i < this._tableview_cards_style_datas.length; ++i) {
            this._tableview_cards_style_datas[i].isCheck = false;
            if (index === this._tableview_cards_style_datas[i].index) {
                this._tableview_cards_style_datas[i].isCheck = true;
            }
        }

        // 校准边距(不是间距, 目测子项数量 < 3 才会出现居中的边距)
        this.nd_card_styles.paddingStart = 0;
        this.nd_card_styles.paddingEnd = 0;
        let itemLen: number = this._tableview_cards_style_datas.length;
        if (itemLen <= 3 && this.nd_card_styles.prefabTypes.length > 0) {
            let w: number = this.nd_card_styles.prefabTypes[0].data.width * this.nd_card_styles.prefabTypes[0].data.scaleX;
            let left_w: number = this.nd_card_styles.node.width - itemLen * w - (itemLen - 1) * this.nd_card_styles.spacing;
            if (left_w > 0) {
                this.nd_card_styles.paddingStart = left_w / 2;
                this.nd_card_styles.paddingEnd = this.nd_card_styles.paddingStart;
            }
        }

        // 刷新视图
        let objs: any[] = [];
        objs.push({ prefab_type: 0, prefab_component: ChangeCardCardFaceItem, prefab_datas: this._tableview_cards_style_datas });
        this.nd_card_styles.bindData(objs);
        this.nd_card_styles.reloadView(resetPos);
    }

    //当牌背样式被点击
    onClickCardBg(event: any) {
        let index = this.nd_card_bgs.children.indexOf(event.target);
        this.chooseCardBg(index);
        cv.AudioMgr.playButtonSound('tab');

        cv.tools.SetCardBack(index);
        this.gameMain.updateCardBack();

        // 发送"牌背更换"消息
        cv.MessageCenter.send("ChangeCard_onClickCardBack");
    }

    chooseCardBg(index: number) {
        for (let i = 0; i < this.nd_card_bgs.childrenCount; i++) {
            const node = this.nd_card_bgs.children[i];
            cc.find("select", node).active = i == index;
        }
    }

    //当牌桌桌布被点击
    onClickTableBg(event: any) {
        let index = this.nd_table_bgs.children.indexOf(event.target);
        this.chooseTableBg(index);
        cv.AudioMgr.playButtonSound('tab');


        if (this.isStarRoom()) {
            //明星桌新增一张背景放在第一张，为了保证明星桌和普通桌图片索引都一样，以普通桌为基准。
            //明星桌从-1开始
            index = index - 1;
        }

        cv.tools.SetTableBack(index, this.isStarRoom());
        this.gameMain.onChangeTableBg();
    }

    chooseTableBg(index: number) {
        for (let i = 0; i < this.nd_table_bgs.childrenCount; i++) {
            const node = this.nd_table_bgs.children[i];
            cc.find("select", node).active = i == index;
        }
    }

    initSwitches() {
        this.nd_switch_effect._isSelect = cv.tools.isSoundEffectOpen();
        this.nd_switch_vibrate._isSelect = cv.tools.isVibrate();
        this.nd_switch_voice._isSelect = cv.tools.isPlayVoice();
        this.nd_switch_barrage._isSelect = cv.tools.isShowBarrage();
        this.nd_switch_giftanim._isSelect = cv.tools.isShowGiftAnim();
        this.nd_switch_bet_preflop._isSelect = cv.tools.isBetPreflop();

        this.updateSwitch(this.nd_switch_effect);
        this.updateSwitch(this.nd_switch_vibrate);
        this.updateSwitch(this.nd_switch_voice);
        this.updateSwitch(this.nd_switch_barrage);
        this.updateSwitch(this.nd_switch_giftanim);
        this.updateSwitch(this.nd_switch_bet_preflop);
    }

    updateSwitch(node: any) {
        let isSelect = node._isSelect;

        let child: cc.Node = node.getChildByName("switch");
        let path = `zh_CN/game/jackfruit/setting/${isSelect ? "img_switch_on" : "img_switch_off"}`;
        cv.resMgr.setSpriteFrame(child, path);

        let cursor: cc.Widget = child.getChildByName("cursor").getComponent(cc.Widget);
        let offset = cursor.left != 0 ? cursor.left : cursor.right;
        cursor.isAlignLeft = !isSelect;
        cursor.isAlignRight = isSelect;
        cursor.left = offset;
        cursor.right = offset;
        cursor.updateAlignment();
    }

    /**
     * 刷新开关控制按钮纵向布局
     */
    private updateSwitchLauyou(): void {
        let layout: cc.Layout = this.nd_contents.getChildByName("content_switch").getComponent(cc.Layout);
        if (!layout) return;

        let counts: number = 0;
        let cell_h: number = 0;
        for (let i = 0; i < layout.node.childrenCount; ++i) {
            cell_h = layout.node.children[i].height;
            if (layout.node.children[i].active) ++counts;
        }

        let spacing: number = (layout.node.height - counts * cell_h) / (counts + 1);
        layout.spacingY = spacing;
        layout.paddingTop = spacing;
        layout.paddingBottom = spacing;
        layout.updateLayout();
    }

    //当开关被点击
    onClickSwitch(event: any, data: string) {
        cv.AudioMgr.playButtonSound('button_click');
        let node = event.target.parent;
        node._isSelect = !node._isSelect;

        // 音效
        if (node == this.nd_switch_effect) {
            cv.tools.setSoundEffect(node._isSelect);
        }
        // 震动
        else if (node == this.nd_switch_vibrate) {
            cv.tools.setVibrate(node._isSelect);
        }
        // 语音
        else if (node == this.nd_switch_voice) {
            cv.tools.setPlayVoice(node._isSelect);
        }
        // 弹幕
        else if (node == this.nd_switch_barrage) {
            cv.tools.setShowBarrage(node._isSelect);
            cv.MessageCenter.send("onClickDanmuSwitch");
        }
        // 礼物动画
        else if (node == this.nd_switch_giftanim) {
            cv.tools.setShowGiftAnim(node._isSelect);
        }
        // 翻前快捷下注
        else if (node == this.nd_switch_bet_preflop) {
            cv.tools.setBetPreflop(node._isSelect);
            cv.MessageCenter.send("onClickQuickBetSwitch", node._isSelect);
            this.updateQuickBetOptPanelLayout();
        }

        this.updateSwitch(node);
    }

    show() {
        this.node.active = true;
        this.initSwitches();
    }

    // ---------------------------------------------------------------------------------------------------------------
    // 快捷下注模块

    /**
     * 初始化"快捷下注"数据
     */
    private initQuickBetData(): void {
        this._quickBetData.clear();

        this._quickBetData.add(QuickBetDataType.QBDT_TEXAS_3, [
            [10, 66],
            [67, 99],
            [100, 200],
        ]);

        this._quickBetData.add(QuickBetDataType.QBDT_TEXAS_5, [
            [10, 49],
            [50, 66],
            [67, 99],
            [100, 119],
            [120, 200],
        ]);

        this._quickBetData.add(QuickBetDataType.QBDT_PLO_3, [
            [10, 34],
            [35, 67],
            [68, 100],
        ]);

        this._quickBetData.add(QuickBetDataType.QBDT_PLO_5, [
            [10, 29],
            [30, 50],
            [51, 67],
            [68, 79],
            [80, 100],
        ]);
    }

    /**
     * 初始化"快捷下注"事件
     */
    private initQuickBetEvent() {
        // 界面格式单选
        do {
            let btn_preflop: cc.Node = this.nd_quick_opt_bet.getChildByName("btn_preflop");
            let btn_flop: cc.Node = this.nd_quick_opt_bet.getChildByName("btn_flop");
            btn_preflop.on("click", this.onClickQuickOptPanel.bind(this, true), this);
            btn_flop.on("click", this.onClickQuickOptPanel.bind(this, false), this);
        } while (false);

        // 按钮风格单选
        do {
            let opt_btn_3: cc.Node = cc.find("opt_btn/opt_btn_3", this.nd_quick_opt_panel);
            let opt_btn_5: cc.Node = cc.find("opt_btn/opt_btn_5", this.nd_quick_opt_panel);
            opt_btn_3.on("click", this.onClickQuickBetOptBtn.bind(this, true), this);
            opt_btn_5.on("click", this.onClickQuickBetOptBtn.bind(this, false), this);
        } while (false);

        // 具体按钮单选
        do {
            let btns: cc.Node = this.nd_quick_opt_panel.getChildByName("btns");
            for (let i = 0; i < btns.childrenCount; ++i) {
                for (let j = 0; j < btns.children[i].childrenCount; ++j) {
                    let btn: cc.Node = btns.children[i].children[j];
                    btn.on("click", this.onClickQuickBetBtn.bind(this, j), this);
                }
            }
        } while (false);

        // 滑条事件
        do {
            let slider: cc.Slider = cc.find("customize/slider", this.nd_quick_opt_panel).getComponent(cc.Slider);
            slider.node.on("slide", this.onSliderQuickBet, this);
            slider.handle.node.on(cc.Node.EventType.TOUCH_END, this.onSliderEndQuickBet, this);
            slider.handle.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onSliderEndQuickBet, this);
        } while (false);

        // 恢复默认设置
        do {
            let reset: cc.Node = cc.find("reset", this.nd_quick_opt_panel);
            reset.on("click", this.onClickQuickBetResetSetting, this);
        } while (false);
    }

    /**
     * 点击"快捷下注"单选面板按钮
     * @param isPreFlop 
     */
    private onClickQuickOptPanel(isPreFlop: boolean): void {
        cv.AudioMgr.playButtonSound("button_click");
        if (isPreFlop === this._quickBetCurPanelisPreflop) return;
        this._quickBetCurPanelisPreflop = isPreFlop;
        this.updateQuickBetOptPanel();
    }

    /**
     * 点击"快捷下注"单选数量按钮
     * @param isBtn3 
     */
    private onClickQuickBetOptBtn(isBtn3: boolean): void {
        cv.AudioMgr.playButtonSound("button_click");
        if (isBtn3 === this.isButton3) return;

        this._quickBetCurSelectIndex = 0;
        this.setQuickBetOptBtn(isBtn3, true);
        this.applyGameMainQuickBetBtns(this._quickBetCurPanelisPreflop);
    }

    /**
     * 点击"快捷下注"具体下注按钮
     * @param index 
     * @param btn 
     */
    private onClickQuickBetBtn(index: number, btn: cc.Button): void {
        cv.AudioMgr.playButtonSound("tab");
        this.setQuickBetSelectIndex(index, btn.node.parent);
    }

    /**
     * 点击"快捷下注"恢复默认设置按钮
     * @param btn 
     */
    private onClickQuickBetResetSetting(btn: cc.Button) {
        cv.AudioMgr.playButtonSound("button_click");

        let count: number = this.getQuickBetOptBtnsCount();
        let gameid: number = cv.GameDataManager.tRoomData.u32GameID;
        let isPreFlop: boolean = this._quickBetCurPanelisPreflop;
        cv.worldNet.DefaultSettingRequest(count, gameid, isPreFlop);
    }

    /**
     * "快捷下注"公用滑条滑动事件
     * @param slider 
     */
    private onSliderQuickBet(slider: cc.Slider): void {
        let index: number = this._quickBetCurSelectIndex;
        let range: QuickBetRange = this.getQuickBetSliderRange(index);

        // 翻前滑条滑动自动吸附
        if (this._quickBetCurPanelisPreflop) {
            if (range.Value > 0) {
                let per_ratio: number = cv.StringTools.div(1, range.Step);
                let last_process: number = (range.Value - range.Min) / range.Step;
                let diff_process: number = last_process - slider.progress;
                let next_process: number = last_process;

                // 过滤一下偏移距离(太长:迟钝, 太短:闪烁)
                if (Math.abs(diff_process) >= per_ratio / 2) {
                    // 前进
                    if (slider.progress >= last_process) {
                        next_process = Math.min(1, last_process + per_ratio);
                    }
                    // 回退
                    else {
                        next_process = Math.max(0, last_process - per_ratio);
                    }

                    // 更新按钮区间数值
                    let value: number = range.Min + cv.StringTools.times(next_process, range.Step);
                    this.updateQuickBetPreflopSliderRange(index, value);

                    // 更新翻前面板
                    this.updateQuickBetPreflop();
                }

                // 设置进度
                this.setQuickBetSliderProgress(next_process);
            }
        }
        // 翻后滑条不做吸附处理
        else {
            let value: number = Math.ceil(range.Min + slider.progress * (range.Max - range.Min));
            let slider_percent: cc.Label = cc.find("customize/percent", this.nd_quick_opt_panel).getComponent(cc.Label);
            slider_percent.string = cv.StringTools.formatC("%d%", value);

            let btns: cc.Node = null;
            if (this.isButton3) {
                btns = cc.find("btns/0", this.nd_quick_opt_panel);
            }
            else {
                btns = cc.find("btns/1", this.nd_quick_opt_panel);
            }

            if (btns && (index >= 0 && index < btns.childrenCount)) {
                let btn_percent: cc.Label = btns.children[index].getChildByName("percent").getComponent(cc.Label);
                btn_percent.string = cv.tools.dealRaiseDataNumber(value);
                this.applyGameMainQuickBetBtnByIndex(index, false, this.getQuickBetNumberFromString(btn_percent.string), btn_percent.string);
            }

            this.setQuickBetSliderProgress(slider.progress);
        }
    }

    /**
     * "快捷下注"公用滑条滑动结束事件
     * @param event 
     */
    private onSliderEndQuickBet(event: cc.Event.EventTouch): void {
        let handle: cc.Button = event.target.getComponent(cc.Button);
        if (!handle.enabled) return;

        let raise: string[] = [];
        let gameid: number = cv.GameDataManager.tRoomData.u32GameID;
        let isPreflop: boolean = cv.tools.isBetPreflop() && this._quickBetCurPanelisPreflop;

        if (isPreflop) {
            if (this.isButton3) {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5;
            }
        }
        else {
            let btns: cc.Node = null;
            if (this.isButton3) {
                btns = cc.find("btns/0", this.nd_quick_opt_panel);
            }
            else {
                btns = cc.find("btns/1", this.nd_quick_opt_panel);
            }

            for (let i = 0; i < btns.childrenCount; ++i) {
                let btn_percent: cc.Label = btns.children[i].getChildByName("percent").getComponent(cc.Label);
                let value: number = this.getQuickBetNumberFromString(btn_percent.string);
                value = cv.StringTools.times(value, 100);
                value = Math.ceil(value);
                raise[i] = cv.String(value);
            }
        }

        cv.worldNet.QuickRaiseRequest(raise, gameid, isPreflop);
    }

    /**
     * 设置"快捷下注"单选数量按钮显示状态
     * @param isBtn3    是显示3个还是5个
     * @param isUpload  是否上传单选结果(用于服务端保存单选状态)
     */
    private setQuickBetOptBtn(isBtn3: boolean, isUpload: boolean = false): void {
        this.isButton3 = isBtn3;

        let color_normal: cc.Color = cc.color(0x8A, 0x8B, 0x90);
        let color_select: cc.Color = cc.color(0xFF, 0xFF, 0xFF);
        let radio_n = 'zh_CN/game/dzpoker/common/img_circle_01_n';
        let radio_s = 'zh_CN/game/dzpoker/common/img_circle_01';
        let opt_btn_3: cc.Node = cc.find("opt_btn/opt_btn_3", this.nd_quick_opt_panel);
        let opt_btn_5: cc.Node = cc.find("opt_btn/opt_btn_5", this.nd_quick_opt_panel);
        let isPreflop: boolean = cv.tools.isBetPreflop() && this._quickBetCurPanelisPreflop;

        cc.find("label", opt_btn_3).color = this.isButton3 ? color_select : color_normal;
        cc.find("label", opt_btn_5).color = this.isButton3 ? color_normal : color_select;
        cv.resMgr.setSpriteFrame(cc.find("radio", opt_btn_3), this.isButton3 ? radio_s : radio_n);
        cv.resMgr.setSpriteFrame(cc.find("radio", opt_btn_5), !this.isButton3 ? radio_s : radio_n);
        cc.find("radio/select", opt_btn_3).active = this.isButton3;
        cc.find("radio/select", opt_btn_5).active = !this.isButton3;

        let btn3: cc.Node = cc.find("btns/0", this.nd_quick_opt_panel);
        let btn5: cc.Node = cc.find("btns/1", this.nd_quick_opt_panel);
        btn3.active = this.isButton3;
        btn5.active = !this.isButton3;

        if (this.isButton3) {
            this.setQuickBetSelectIndex(this._quickBetCurSelectIndex, btn3);
        }
        else {
            this.setQuickBetSelectIndex(this._quickBetCurSelectIndex, btn5);
        }

        // 应用额外快捷下注按钮至游戏中
        this.applayGameMainQuickBetExtra(isPreflop);

        // 上传记录选项
        if (isUpload) {
            let count: number = this.getQuickBetOptBtnsCount();
            let gameid: number = cv.GameDataManager.tRoomData.u32GameID;
            cv.worldNet.QuickRaiseRequest(count, gameid, isPreflop);
        }
    }

    /**
     * 设置"快捷下注"具体的下注按钮状态
     * @param index 
     * @param btns 
     */
    private setQuickBetSelectIndex(index: number, btns: cc.Node): void {
        this._quickBetCurSelectIndex = index;

        // 单选按钮换图
        for (let i = 0; i < btns.childrenCount; ++i) {
            let isSelect: boolean = false;
            if (index === i) {
                isSelect = true;
            }

            let fileName: string = `zh_CN/game/dzpoker/common/btn_${isSelect ? "check" : "normal"}`;
            cv.resMgr.setSpriteFrame(btns.children[i], fileName);
        }

        // 滑条外框
        let customize: cc.Node = this.nd_quick_opt_panel.getChildByName("customize");
        let f1: number = this.isButton3 ? 0 : 1;
        let f2: number = index;
        let fileName: string = `zh_CN/game/dzpoker/common/selectframe_${f1}_${f2}`;
        cv.resMgr.setSpriteFrame(customize, fileName);

        let range: QuickBetRange = this.getQuickBetSliderRange(index);
        let min: cc.Label = customize.getChildByName("min").getComponent(cc.Label);
        let max: cc.Label = customize.getChildByName("max").getComponent(cc.Label);
        let mid: cc.Label = customize.getChildByName("mid").getComponent(cc.Label);
        let slider: cc.Slider = customize.getChildByName("slider").getComponent(cc.Slider);

        if (this._quickBetCurPanelisPreflop) {
            if (range.Value > 0) {
                slider.enabled = true;
                slider.handle.enabled = true;
                min.node.active = true;
                max.node.active = true;
                mid.node.active = true;

                let suffix: string = this.getQuickBetPreFlopUnitDesc();
                min.string = cv.StringTools.formatC("%d%s", range.Min, suffix);
                max.string = cv.StringTools.formatC("%d%s", range.Max, suffix);
                mid.string = cv.StringTools.formatC("%d%s", (range.Min + range.Max) / 2, suffix);
            }
            else {
                slider.enabled = false;
                slider.handle.enabled = false;
                min.node.active = true;
                max.node.active = false;
                mid.node.active = false;

                min.string = this.isPloRoom() ? cv.config.getStringData("UITableSetBetBtnValueFullPot") : "ALL IN";
            }

            this.setQuickBetSliderRange(range, "");
        }
        else {
            slider.enabled = true;
            slider.handle.enabled = true;
            min.node.active = true;
            max.node.active = true;

            min.string = cv.StringTools.formatC("%d%", range.Min);
            max.string = cv.StringTools.formatC("%d%", range.Max);

            let percent: cc.Label = btns.children[index].getChildByName("percent").getComponent(cc.Label);
            this.setQuickBetSliderRange(range, percent.string);
        }
    }

    /**
     * 设置"快捷下注"公用滑条进度
     * @param progress 
     */
    private setQuickBetSliderProgress(progress: number): void {
        let slider: cc.Slider = cc.find("customize/slider", this.nd_quick_opt_panel).getComponent(cc.Slider);
        let mask: cc.Node = slider.node.getChildByName("mask");

        // 校验有效范围
        progress = Math.max(0, progress);
        progress = Math.min(1, progress);

        slider.progress = progress;
        mask.width = cv.StringTools.times(slider.progress, slider.node.width);
    }

    /**
     * 设置"快捷下注"公用滑条数据
     * @param range 
     * @param txt_value 
     */
    private setQuickBetSliderRange(range: QuickBetRange, txt_value: string): void {
        let value: number = 0;

        if (this._quickBetCurPanelisPreflop) {
            if (range.Value > 0) {
                value = range.Value;
            }
            else {
                value = range.Min;
            }
        }
        else {
            value = this.getQuickBetNumberFromString(txt_value);
            value = cv.StringTools.times(value, 100);
            value = Math.ceil(value);

            // 不同游戏房间的快捷下注范围不一样, 这里校验下有效值, 以免溢出导致错误
            value = Math.max(value, range.Min);
            value = Math.min(value, range.Max);

            let percent: cc.Label = cc.find("customize/percent", this.nd_quick_opt_panel).getComponent(cc.Label);
            percent.string = cv.StringTools.formatC("%d%", value);
        }

        // 设置进度
        let step: number = range.Step;
        if (step === 0) { step = 1; }
        let process: number = (value - range.Min) / step;
        this.setQuickBetSliderProgress(process);
    }

    /**
     * 获取"快捷下注"公用滑条数据
     * @param index 
     */
    private getQuickBetSliderRange(index: number): QuickBetRange {
        let range: QuickBetRange = new QuickBetRange();

        // 翻前
        if (this._quickBetCurPanelisPreflop) {
            let step: number = this._quickBetPreflopSliderStep - 1;
            let lastMin: number = this._quickBetPreflopSliderInitalMin;
            let raiseArray: string[] = [];
            if (this.isButton3) {
                raiseArray = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3;
            }
            else {
                raiseArray = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5;
            }

            for (let i = 0; i < cv.StringTools.getArrayLength(raiseArray); ++i) {
                let value: number = cv.Number(raiseArray[i]);

                if (index === i) {
                    range.Min = lastMin;
                    range.Max = lastMin + step;
                    range.Step = step;
                    range.Value = value;
                }

                lastMin = value + 1;
            }
        }
        // 翻后
        else {
            let data: number[][] = [];
            if (this.isButton3) {
                if (this.isPloRoom()) {
                    data = this._quickBetData.get(QuickBetDataType.QBDT_PLO_3);
                }
                else {
                    data = this._quickBetData.get(QuickBetDataType.QBDT_TEXAS_3);
                }
            }
            else {
                if (this.isPloRoom()) {
                    data = this._quickBetData.get(QuickBetDataType.QBDT_PLO_5);
                }
                else {
                    data = this._quickBetData.get(QuickBetDataType.QBDT_TEXAS_5);
                }
            }

            if (index >= 0 && index < data.length) {
                range.Min = data[index][0];
                range.Max = data[index][1];
                range.Step = range.Max - range.Min;
            }
        }

        return range;
    }

    /**
     * 获取"快捷下注"当前按钮风格显示的按钮数量
     */
    private getQuickBetOptBtnsCount(): number {
        let count: number = this.isButton3 ? 3 : 5;
        return count;
    }

    /**
     * 获取"快捷下注"指定字符数字或字符分数对应的数值
     * @param value 
     */
    private getQuickBetNumberFromString(value: string): number {
        let n: number = 0;
        if (value.indexOf("/") !== -1) {
            n = cv.tools.Fraction2Decimal(value);
        }
        else {
            n = cv.Number(value);
        }

        return n;
    }

    /**
     * 获取"快捷下注"翻前设置的"单位描述"
     */
    private getQuickBetPreFlopUnitDesc(): string {
        let value: string = "";
        let isStraddle: boolean = cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle !== 0;
        let isShortGameMode: boolean = cv.GameDataManager.tRoomData.pkRoomParam.game_mode === cv.Enum.CreateGameMode.CreateGame_Mode_Short;

        if (isShortGameMode) {
            value = "ANTE";
        }
        else {
            value = isStraddle ? "Stra" : "BB";
        }

        return value;
    }

    /**
     * 获取指定索引的"快捷下注"按钮文本描述字串
     * @param index 
     * @param isBtn3 
     * @param isPreFlop 
     */
    private getQuickBetBtnText(index: number, isBtn3: boolean, isPreFlop: boolean): string {
        let raise: string[] = [];

        if (isBtn3) {
            if (isPreFlop) {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise3;
            }
        }
        else {
            if (isPreFlop) {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise5;
            }
        }

        let value: string = "";
        if (index >= 0 && index < raise.length) {
            value = cv.String(raise[index]);
        }

        if (isPreFlop) {
            if (cv.Number(value) > 0) {
                value = `${value}${this.getQuickBetPreFlopUnitDesc()}`;
            }
            else {
                value = this.isPloRoom() ? cv.config.getStringData("UITableSetBetBtnValueFullPot") : "ALL IN";
            }
        }

        return value;
    }

    /**
     * 更新"快捷下注"面板布局格式
     */
    private updateQuickBetOptPanelLayout(): void {
        // 是否打开开关
        let isOpenBetPreflop: boolean = cv.tools.isBetPreflop();
        this.nd_quick_opt_bet.active = isOpenBetPreflop;

        // 打开开关界面格式
        if (isOpenBetPreflop) {
            this.nd_quick_opt_panel.setContentSize(cc.size(this.nd_quick_opt_panel.width, 650));
            this.nd_quick_opt_panel.getComponent(cc.Widget).top = 184;
            cc.find("customize/slider", this.nd_quick_opt_panel).getComponent(cc.Widget).top = 164;
            cc.find("opt_btn", this.nd_quick_opt_panel).getComponent(cc.Widget).top = 0;
        }
        // 关闭开关界面格式
        else {
            this.nd_quick_opt_panel.setContentSize(cc.size(this.nd_quick_opt_panel.width, 694));
            this.nd_quick_opt_panel.getComponent(cc.Widget).top = 72;
            cc.find("customize/slider", this.nd_quick_opt_panel).getComponent(cc.Widget).top = 206;
            cc.find("opt_btn", this.nd_quick_opt_panel).getComponent(cc.Widget).top = -20;
        }

        // 适配格式
        cv.resMgr.adaptWidget(this.nd_quick_opt_panel);

        // 确定格式后刷新面板
        this._quickBetCurPanelisPreflop = isOpenBetPreflop;
        this.updateQuickBetOptPanel();
    }

    /**
     * 更新"快捷下注"面板
     */
    private updateQuickBetOptPanel(): void {
        // 单选按钮颜色状态
        let nor_color: cc.Color = cc.Color.WHITE;
        let sel_color: cc.Color = cc.color(0xFB, 0xD8, 0x88);
        let preflop_txt: cc.Node = cc.find("btn_preflop/txt", this.nd_quick_opt_bet);
        let flop_txt: cc.Node = cc.find("btn_flop/txt", this.nd_quick_opt_bet);
        if (this._quickBetCurPanelisPreflop) {
            preflop_txt.opacity = 0xFF;
            preflop_txt.color = sel_color;

            flop_txt.opacity = 0xFF / 2;
            flop_txt.color = nor_color;
        }
        else {
            preflop_txt.opacity = 0xFF / 2;
            preflop_txt.color = nor_color;

            flop_txt.opacity = 0xFF;
            flop_txt.color = sel_color;
        }

        // 相关控件显隐
        let btns: cc.Node = this.nd_quick_opt_panel.getChildByName("btns");
        for (let i = 0; i < btns.childrenCount; ++i) {
            for (let j = 0; j < btns.children[i].childrenCount; ++j) {
                let btn: cc.Node = btns.children[i].children[j];
                let percent: cc.Node = btn.getChildByName("percent");
                let unit: cc.Node = btn.getChildByName("unit");

                percent.y = this._quickBetCurPanelisPreflop ? 0 : 8;
                unit.active = !this._quickBetCurPanelisPreflop;
            }
        }
        cc.find("customize/percent", this.nd_quick_opt_panel).active = !this._quickBetCurPanelisPreflop;
        cc.find("customize/mid", this.nd_quick_opt_panel).active = this._quickBetCurPanelisPreflop;

        let bg_circles: cc.Node = cc.find("customize/slider/bg_circles", this.nd_quick_opt_panel);
        let sp_circles: cc.Node = cc.find("customize/slider/mask/sp_circles", this.nd_quick_opt_panel);
        bg_circles.active = this._quickBetCurPanelisPreflop;
        sp_circles.active = this._quickBetCurPanelisPreflop;

        // 当前显示数量
        let selected: number = 0;
        if (this._quickBetCurPanelisPreflop) {
            selected = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.selected;
        }
        else {
            selected = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.selected;
        }
        this.isButton3 = selected === 3;

        // 默认勾选第一个按钮
        this._quickBetCurSelectIndex = 0;

        // 翻前界面
        if (this._quickBetCurPanelisPreflop) {
            this.updateQuickBetPreflop();
        }
        // 翻后界面
        else {
            this.updateQuickBetFlop();
        }
    }

    /**
     * 更新快捷下注"翻前"面板
     */
    private updateQuickBetPreflop(): void {
        let customize: cc.Node = cc.find("customize", this.nd_quick_opt_panel);
        cv.StringTools.setLabelString(customize, "title", "GameScene_changeCard_panel_shortCut_bet_panel_customBtn_txt");

        let btn3: cc.Node = cc.find("btns/0", this.nd_quick_opt_panel);
        for (let i = 0; i < btn3.childrenCount; ++i) {
            let percent: cc.Label = btn3.children[i].getChildByName("percent").getComponent(cc.Label);
            percent.string = this.getQuickBetBtnText(i, true, true);
        }

        let btn5: cc.Node = cc.find("btns/1", this.nd_quick_opt_panel);
        for (let i = 0; i < btn5.childrenCount; ++i) {
            let percent: cc.Label = btn5.children[i].getChildByName("percent").getComponent(cc.Label);
            percent.string = this.getQuickBetBtnText(i, false, true);;
        }

        this.applyGameMainQuickBetBtns(true);
        this.setQuickBetOptBtn(this.isButton3);
    }

    /**
     * 更新快捷下注"翻后"面板
     */
    private updateQuickBetFlop(): void {
        let customize: cc.Node = cc.find("customize", this.nd_quick_opt_panel);
        cv.StringTools.setLabelString(customize, "title", "GameScene_changeCard_panel_shortCut_bet_panel_customPot_txt");

        let btn3: cc.Node = cc.find("btns/0", this.nd_quick_opt_panel);
        for (let i = 0; i < btn3.childrenCount; ++i) {
            let percent: cc.Label = btn3.children[i].getChildByName("percent").getComponent(cc.Label);
            percent.string = this.getQuickBetBtnText(i, true, false);
        }

        let btn5: cc.Node = cc.find("btns/1", this.nd_quick_opt_panel);
        for (let i = 0; i < btn5.childrenCount; ++i) {
            let percent: cc.Label = btn5.children[i].getChildByName("percent").getComponent(cc.Label);
            percent.string = this.getQuickBetBtnText(i, false, false);
        }

        this.applyGameMainQuickBetBtns(false);
        this.setQuickBetOptBtn(this.isButton3);
    }

    /**
     * 更新"快捷下注"翻前滑条区间数据
     * @param index 
     * @param value 
     */
    private updateQuickBetPreflopSliderRange(index: number, value: number): void {
        let raiseArray: string[] = [];
        if (this.isButton3) {
            raiseArray = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3;
        }
        else {
            raiseArray = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5;
        }

        let step: number = this._quickBetPreflopSliderStep - 1;
        let lastMin: number = this._quickBetPreflopSliderInitalMin;
        for (let i = 0; i < cv.StringTools.getArrayLength(raiseArray); ++i) {
            let raiseValue: number = cv.Number(raiseArray[i]);
            if (raiseValue <= 0) break;
            if (i === index) { raiseValue = value; }

            let tmpMin: number = lastMin;
            let tmpMax: number = lastMin + step;
            raiseValue = Math.max(raiseValue, tmpMin);
            raiseValue = Math.min(raiseValue, tmpMax);
            raiseArray[i] = cv.String(raiseValue);
            lastMin = raiseValue + 1;
        }
    }

    /**
     * 接收服务器返回"快捷下注"设置下注按钮值的消息
     * @param msg 
     */
    private onMsgQuickBetRaise(msg: world_pb.QuickRaiseResponse) {
        if (msg.isPreFlop) {
            cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.selected = msg.whichRaise;
        }
        else {
            cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.selected = msg.whichRaise;
        }

        // 此处可以优化(因为视图已经最新, 此处逻辑可以省略, 目前写出来是为了校验下发的数据)
        if (msg.changeVals.length > 0) {
            if (msg.isPreFlop) {
                if (msg.whichRaise === 3) {
                    cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3 = msg.changeVals.slice();
                }
                else if (msg.whichRaise === 5) {
                    cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5 = msg.changeVals.slice();
                }
                this.updateQuickBetPreflop();
            }
            else {
                if (msg.whichRaise === 3) {
                    cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise3 = msg.changeVals.slice();
                    cv.tools.dealRaiseData(cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise3);
                }
                else if (msg.whichRaise === 5) {
                    cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise5 = msg.changeVals.slice();
                    cv.tools.dealRaiseData(cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise5);
                }
                this.updateQuickBetFlop();
            }
        }
    }

    /**
     * 接收服务器返回"快捷下注"恢复默认设置消息
     * @param msg 
     */
    private onMsgQuickBetResetSetting(msg: world_pb.DefaultSettingResponse) {
        let isBtn3: boolean = msg.whichRaise === 3;
        if (msg.isPreFlop) {
            let raise: string[] = [];

            if (isBtn3) {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5;
            }

            for (let i = 0; i < msg.defaultVal.length; ++i) {
                if (i < raise.length) {
                    raise[i] = msg.defaultVal[i];
                }
            }

            this.updateQuickBetPreflop();
        }
        else {
            let raise: string[] = [];
            cv.tools.dealRaiseData(msg.defaultVal);

            if (isBtn3) {
                raise = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise3;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise5;
            }

            for (let i = 0; i < msg.defaultVal.length; ++i) {
                if (i < raise.length) {
                    raise[i] = msg.defaultVal[i];
                }
            }

            this.updateQuickBetFlop();
        }
    }

    /**
     * 接收游戏状态改变导致快捷下注设置改变消息
     * @param isPreflop 是否使用翻前快捷设置
     */
    private onMsgQuickBetChangeSetting(isPreflop: boolean): void {
        // 刷新当前显示数量(因为是共用的"isButton3"字段, 在使用完翻前后要刷新数值)
        let selected: number = 0;
        let curModeIsPreflop: boolean = isPreflop && cv.tools.isBetPreflop();
        if (curModeIsPreflop) {
            selected = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.selected;
        }
        else {
            selected = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.selected;
        }
        this.isButton3 = selected === 3;

        // 应用到游戏中
        this.applyGameMainQuickBetBtns(curModeIsPreflop);
        this.applayGameMainQuickBetExtra(curModeIsPreflop);

        console.log(`ChangeCard - onMsgQuickBetChangeSetting isPreflop: ${isPreflop}, ${curModeIsPreflop}`);
    }

    /**
     * 当前快捷下注UI面板状态是否和游戏中快捷下注状态一致
     * @param isPreflop 
     */
    private isMatchGameMainQuickBetStatus(isPreflop: boolean): boolean {
        let isMatch: boolean = true;

        // 当前界面状态是翻前
        if (isPreflop) {
            // 翻前开关未打开 || 游戏快捷下注状态不是翻前, 则禁止
            isMatch = this.gameMain.quickBetModeIsPreflop && cv.tools.isBetPreflop();
        }
        // 当前界面状态是翻后
        else {
            // 游戏快捷下注状态不是翻后, 则禁止
            isMatch = !this.gameMain.quickBetModeIsPreflop;
        }

        // 只有"当前操作的界面模式"和"游戏中快捷下注模式"匹配上了, 才能动态修改游戏中具体的快加下注按钮的值
        return isMatch;
    }

    /**
     * 应用游戏中"快捷下注"额外下注按钮显示状态
     */
    private applayGameMainQuickBetExtra(isPreflop: boolean): void {
        if (!this.isMatchGameMainQuickBetStatus(isPreflop)) return;

        if (this.isButton3) {
            this.gameMain.SetExtraBetBtnVisible(false);
        }
        else {
            this.updateBetBtnValue(3);
            this.updateBetBtnValue(4);
        }
    }

    /**
     * 应用"快捷下注"按钮数值至游戏中
     * @param isPreFlop 
     */
    private applyGameMainQuickBetBtns(isPreFlop: boolean): void {
        let btns: cc.Node = null;
        let raise: string[] = [];

        if (this.isButton3) {
            btns = cc.find("btns/0", this.nd_quick_opt_panel);
            if (isPreFlop) {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise3;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise3;
            }
        }
        else {
            btns = cc.find("btns/1", this.nd_quick_opt_panel);
            if (isPreFlop) {
                raise = cv.GameDataManager.tRoomData.quickraise.preFlopQuickRaise.raise5;
            }
            else {
                raise = cv.GameDataManager.tRoomData.quickraise.postFlopQuickRaise.raise5;
            }
        }

        for (let i = 0; i < btns.childrenCount; ++i) {
            if (i < raise.length) {
                let num: number = this.getQuickBetNumberFromString(raise[i]);
                let txt: string = this.getQuickBetBtnText(i, this.isButton3, isPreFlop);
                this.applyGameMainQuickBetBtnByIndex(i, isPreFlop, num, txt);
            }
        }
    }

    /**
     * 应用指定索引的"快捷下注"按钮数值至游戏中
     * @param index     索引
     * @param num       实际数值
     * @param txt       用于显示的字符串
     */
    private applyGameMainQuickBetBtnByIndex(index: number, isPreflop: boolean, num: number, txt: string) {
        if (!this.isMatchGameMainQuickBetStatus(isPreflop)) return;

        let idx: number = this.isButton3 ? index + 1 : index;
        switch (idx) {
            case 0: {
                let node: cc.Node = this.gameMain.dichi_button3.node.getChildByName("dichi_text3");
                node.getComponent(cc.Label).string = txt;

                let tag: Tag = node.getComponent(Tag);
                if (!tag) tag = node.addComponent(Tag);
                tag.setTag(num);
                tag.setData(isPreflop);

                this.updateBetBtnValue(3);
            } break;

            case 1: {
                let node: cc.Node = this.gameMain.dichi_button0.node.getChildByName("dichi_text0");
                node.getComponent(cc.Label).string = txt;

                let tag: Tag = node.getComponent(Tag);
                if (!tag) tag = node.addComponent(Tag);
                tag.setTag(num);
                tag.setData(isPreflop);

                this.updateBetBtnValue(0);
            } break;

            case 2: {
                let node1: cc.Node = this.gameMain.dichi_button1.node.getChildByName("dichi_text1");
                let node2: cc.Node = this.gameMain.dichi_button1_2.node.getChildByName("dichi_text1");
                node1.getComponent(cc.Label).string = txt;
                node2.getComponent(cc.Label).string = txt;

                let tag1: Tag = node1.getComponent(Tag);
                if (!tag1) tag1 = node1.addComponent(Tag);
                tag1.setTag(num);
                tag1.setData(isPreflop);

                let tag2: Tag = node2.getComponent(Tag);
                if (!tag2) tag2 = node2.addComponent(Tag);
                tag2.setTag(num);
                tag2.setData(isPreflop);

                this.updateBetBtnValue(1);
            } break;

            case 3: {
                let node: cc.Node = this.gameMain.dichi_button2.node.getChildByName("dichi_text2");
                node.getComponent(cc.Label).string = txt;

                let tag: Tag = node.getComponent(Tag);
                if (!tag) tag = node.addComponent(Tag);
                tag.setTag(num);
                tag.setData(isPreflop);

                this.updateBetBtnValue(2);
            } break;

            case 4: {
                let node: cc.Node = this.gameMain.dichi_button4.node.getChildByName("dichi_text4");
                node.getComponent(cc.Label).string = txt;

                let tag: Tag = node.getComponent(Tag);
                if (!tag) tag = node.addComponent(Tag);
                tag.setTag(num);
                tag.setData(isPreflop);

                this.updateBetBtnValue(4);
            } break;

            default:
                break;
        }
    }

    /**
     * 更新游戏中的指定快捷下注按钮的数值
     * @param index 
     */
    private updateBetBtnValue(index: number) {
        //增加getShowDiChiBtnStatus判断 解决Bug7806 
        //此处需要判断当前actionButtonStatus是否为Control_AllIn 或者Control_Just_Call状态。
        //如果是上面两种状态，桌面设置中的快捷加注按钮操作后，不能显示底池快捷加注 
        if (GameDataManager.tGameData.m_bIsOnSelfAction && this.gameMain.getShowDiChiBtnStatus()) {
            if (index >= 0 && index <= 4) {
                if (index < 3 || !this.isButton3) {
                    this.gameMain.setDiChiBtnText(index, GameDataManager.tGameData.u32DeadPot, GameDataManager.tGameData.m_u32NeedCall, GameDataManager.tGameData.m_u32GreatestBet);
                }
            }
        }
    }
}
