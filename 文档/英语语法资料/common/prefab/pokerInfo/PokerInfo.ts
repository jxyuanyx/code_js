import cv from "./../../../components/lobby/cv"
import PokerInfoItem from "./PokerInfoItem"
import { CircleSprite } from "../../tools/CircleSprite";
import AllianceJackpotInfo from "./AllianceJackpotInfo";
import AllianceInsuranceInfo from "./AllianceInsuranceInfo";
import AllianceIntegralInfo from "./AllianceIntegralInfo";
import AllianceResultItem from "./AllianceResultItem"
import { GameReview } from "../../../components/game/dzPoker/gameReview/GameReview";
import Audit from "../../../components/game/dzPoker/Audit";

/**
 * 本类所在节点添加到当前场景
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class PokerInfo extends cc.Component {

    @property(cc.Prefab)
    pokerInfoItem: cc.Prefab = null;
    @property(cc.Prefab)
    gameReview: cc.Prefab = null;
    msg: any = null;
    itemList: Array<cc.Node> = [];

    @property(cc.Prefab)
    allianceResultItem: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_report: cc.Prefab = null;
    alliceItemList: Array<cc.Node> = [];

    //touch event
    beginPosY: number = 0;

    insuranceNode: cc.Node = null;
    integralNode: cc.Node = null;
    jackpotNode: cc.Node = null;
    @property(cc.Prefab)
    allianceResultInfo: cc.Prefab = null;

    _isShowAudit: boolean = false;
    // selfCanSee_panel pos、insurance_icon、bg_1、contentNode
    posArr: Array<number> = [];
    backBtnClickFunc: Function = null;

    onLoad() {
        //cv.tools.ThroughNode(this.node);
        let selfCanSee_panel = cc.find("scorellview/content/Panel_1/selfCanSee_panel", this.node);
        let alliance_panel = cc.find("scorellview/content/Panel_1/alliance_panel", this.node);
        let insurance_icon = cc.find("insurance_icon", selfCanSee_panel);
        let bg_1 = cc.find("bg_1", selfCanSee_panel);
        let contentNode = cc.find("scorellview/content", this.node);
        this.posArr.push(selfCanSee_panel.y);
        this.posArr.push(insurance_icon.y);
        this.posArr.push(bg_1.y);
        this.posArr.push(contentNode.getContentSize().height);

        cc.find("jackpot_button", selfCanSee_panel).on(cc.Node.EventType.TOUCH_END, this.showJackpotResultPanel, this);
        cc.find("insurance_button", selfCanSee_panel).on(cc.Node.EventType.TOUCH_END, this.showInsuranceResultPanel, this);
        // alliance_panel.on(cc.Node.EventType.TOUCH_START, this.showIntergralInfoPanel, this);
        alliance_panel.on(cc.Node.EventType.TOUCH_END, this.showIntergralInfoPanel, this);
        this.registerMsg();
        this.initLanguage();
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); }, this);
    }

    start() {
        this.initAllianceResultInfo();
        cv.config.adaptSize([cc.find("scorellview", this.node)]);
    }

    onDestroy(): void {
        cv.MessageCenter.unregister("responseRoomRecordSuccess", this.node);
        cv.MessageCenter.unregister("show_Audit", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    registerMsg() {
        cv.MessageCenter.register("responseRoomRecordSuccess", this.responseRoomRecordSuccess.bind(this), this.node);
        cv.MessageCenter.register("show_Audit", this.showAudit.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    initLanguage() {
        cv.StringTools.setLabelString(this.node, "title_text", "PokerInfo_title_text");
        cv.StringTools.setLabelString(this.node, "subtitle_text_2", "PokerInfo_subtitle_text_2");
        cv.StringTools.setLabelString(this.node, "subtitle_text_3", "PokerInfo_subtitle_text_3");
        cv.StringTools.setLabelString(this.node, "subtitle_text_4", "PokerInfo_subtitle_text_4");
        cv.StringTools.setLabelString(this.node, "scorellview/content/Panel_1/selfCanSee_panel/insurance_title_text", "PokerInfo_scorellview_insurance_icon_insurance_title_text");
        cv.StringTools.setLabelString(this.node, "owner_text", "PokerInfo_owner_text");
        cv.StringTools.setLabelString(this.node, "scorellview/content/Panel_1/hand_map_text", "PokerInfo_scorellview_Panel_1_hand_map_text");

        cv.resMgr.setSpriteFrame(cc.find("scorellview/content/Panel_1/Image_2", this.node), cv.config.getLanguagePath("hall/lobby/record_icon_silver"));
        cv.resMgr.setSpriteFrame(cc.find("scorellview/content/Panel_1/Image_2_0_0", this.node), cv.config.getLanguagePath("hall/lobby/record_icon_bronze"));
    }

    responseRoomRecordSuccess(value) {
        this.initData(value);
    }

    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("show_mail_entrance");

        // 退出战绩详情时清理下战绩牌谱的页签
        let gameReviewNode: cc.Node = GameReview.getSinglePrefabInst(this.gameReview);
        if (gameReviewNode) {
            let gameReview: GameReview = gameReviewNode.getComponent(GameReview);
            gameReview.resetSavePage();
        }

        if (this.backBtnClickFunc) {
            this.backBtnClickFunc();
            return;
        }
        console.log("====> back: " + this.node.getAnchorPoint() + ", " + this.node.getPosition())
        cv.action.moveToAction(this.node, "TO_RIGHT", "OUT", "FAST",
            new cc.Vec2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5), new cc.Vec2(cv.config.WIDTH * 1.5, cv.config.HEIGHT * 0.5));
    }

    initData(msg: any) {
        this.msg = msg;

        return;  //所有账号都不显示旧版战绩界面
        //会长账号才显示旧版战绩详情
        //if (!this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) {
        //    console.log("pokerInfo isCanSeeAllianceResult false");
        //     return;
        //}

        this.node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_2;
        cv.action.moveToAction(this.node, "TO_LEFT", "ENTER", cv.Enum.action_FuncType.dt_FAST,
            new cc.Vec2(cv.config.WIDTH * 1.5, cv.config.HEIGHT * 0.5), new cc.Vec2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5));


        if (!this.msg.alliance_clubids) {
            this.msg.alliance_clubids = [];
        }

        let idArr: Array<number> = [];
        for (let p = 0; p < cv.StringTools.getArrayLength(this.msg.alliance_clubids); p++) {
            let clubInfo = this.msg.alliance_clubids[p];
            for (let m = 0; m < cv.StringTools.getArrayLength(clubInfo.Clubids); m++) {
                idArr.push(clubInfo.Clubids[m]);
            }
        }
        let allianceInfo: any = {
            "AllianceId": 0,
            "AllianceName": cv.config.getStringData("UIAllianceTitle"),
            "Clubids": [],
        };

        for (let i = 0; i < cv.StringTools.getArrayLength(this.msg.clubInfos); i++) {
            let hasId: boolean = false;
            let ClubId = this.msg.clubInfos[i].ClubId;
            for (let j = 0; j < idArr.length; j++) {
                if (ClubId == idArr[j]) {
                    hasId = true;
                    break;
                }
            }
            if (!hasId) {
                allianceInfo.Clubids.push(ClubId);
            }
        }

        if (allianceInfo.Clubids.length > 0) {
            this.msg.alliance_clubids.push(allianceInfo);
        }

        cc.find("day_text", this.node).getComponent(cc.Label).string = cv.StringTools.formatTime(this.msg.create_time, cv.Enum.eTimeType.Year_Month_Day)
            + " " + cv.StringTools.formatTime(this.msg.create_time, cv.Enum.eTimeType.Hour_Minute);
        cc.find("allTotal_text", this.node).getComponent(cc.Label).string = this.msg.total_hand_count;
        cc.find("mostBigPot_text", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.max_port);
        cc.find("totalBring", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.room_total_buyin);

        let houseOwer_text = cc.find("houseOwer_text", this.node);
        let blindWordText = cc.find("blindWordText", this.node);
        let mangZhu_text = cc.find("mangZhu_text", this.node);
        cv.dataHandler.getUserData().setStringContainRemark(houseOwer_text, this.msg.room_param.CreaterId, this.msg.owner_name);
        if (houseOwer_text.getComponent(cc.Label).string == "") {
            houseOwer_text.getComponent(cc.Label).string = "system";
        }
        let owner_text = cc.find("owner_text", this.node);
        owner_text.setPosition(houseOwer_text.x - cv.resMgr.getLabelStringSize(houseOwer_text.getComponent(cc.Label)).width - 10, owner_text.y);
        if (this.msg.room_param.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            blindWordText.getComponent(cc.Label).string = cv.config.getStringData("Cell0");
            mangZhu_text.getComponent(cc.Label).string = cv.config.getblindString(this.msg.room_param.rule_blind_enum - 1);
        }
        else {
            blindWordText.getComponent(cc.Label).string = cv.config.getStringData("Cell4");
            mangZhu_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.room_param.rule_ante_amount);
        }

        let scorellview = cc.find("scorellview", this.node);
        let contentNode = cc.find("scorellview/content", this.node);
        let insurance_text = cc.find("Panel_1/selfCanSee_panel/insurance_text", contentNode);
        let alliance_panel = cc.find("Panel_1/alliance_panel", contentNode);
        let insurance_arrow_icon = cc.find("Panel_1/selfCanSee_panel/insurance_arrow_icon", contentNode);
        let insurance_arrow_icon0 = cc.find("Panel_1/selfCanSee_panel/insurance_arrow_icon_0", contentNode);
        let dayu_roleName = cc.find("Panel_1/dayu_roleName", contentNode);
        let mvpName = cc.find("Panel_1/mvpName", contentNode);
        let fuhaoName = cc.find("Panel_1/fuhaoName", contentNode);
        let dayu_img = cc.find("Panel_1/dayu_img", contentNode);
        let mvp_img = cc.find("Panel_1/mvp_img", contentNode);
        let fuhao_img = cc.find("Panel_1/fuhao_img", contentNode);
        let jackpotword_text = cc.find("Panel_1/selfCanSee_panel/jackpotword_text", contentNode);
        let jackpot_text = cc.find("Panel_1/selfCanSee_panel/jackpot_text", contentNode);
        let jackpot_img = cc.find("Panel_1/selfCanSee_panel/jackpot_img", contentNode);
        let insurance_icon = cc.find("Panel_1/selfCanSee_panel/insurance_icon", contentNode);
        let bg_1 = cc.find("Panel_1/selfCanSee_panel/bg_1", contentNode);
        let bg_2 = cc.find("Panel_1/selfCanSee_panel/bg_2", contentNode);
        let Panel_1 = cc.find("Panel_1", contentNode);
        let selfCanSee_panel = cc.find("Panel_1/selfCanSee_panel", contentNode);

        //初始化
        selfCanSee_panel.setPosition(selfCanSee_panel.x, this.posArr[0]);
        insurance_icon.setPosition(insurance_icon.x, this.posArr[1]);
        bg_1.setPosition(bg_1.x, this.posArr[2]);
        contentNode.setContentSize(contentNode.getContentSize().width, this.posArr[3]);

        if (this.msg.insurace_winbet > 0) {
            insurance_text.color = cv.tools.getWinColor();
            insurance_text.getComponent(cc.Label).string = "+" + cv.StringTools.serverGoldToShowString(this.msg.insurace_winbet);
        }
        else if (this.msg.insurace_winbet == 0) {
            insurance_text.color = cc.Color.WHITE;
            insurance_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.insurace_winbet);
        }
        else {
            insurance_text.color = cv.tools.getLoseColor();
            insurance_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.insurace_winbet);
        }

        if (cv.StringTools.getArrayLength(this.msg.room_param.alliance_ids) > 0 && this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) {
            alliance_panel.active = true;
            insurance_arrow_icon.active = true;
            insurance_arrow_icon0.active = true;
            cc.find("alliance_text", alliance_panel).getComponent(cc.Label).string = cv.StringTools.formatC("%s-%s", this.msg.owner_club_name,
                this.msg.owner_name);

            cv.StringTools.cleanNodeArray(this.alliceItemList);
            let len = this.msg.clubInfos ? this.msg.clubInfos.length : 0;
            for (let i = 0; i < len; i++) {
                let item: cc.Node = cc.instantiate(this.allianceResultItem);
                item.setPosition(item.x, -128 * (i + 1));
                item.getComponent(AllianceResultItem).initData(this.msg, i, cv.Enum.ITEMType_Alliance.POKERINFO_RESULT_ITEM);
                alliance_panel.addChild(item);
                this.alliceItemList.push(item);
                // cc.find("item_panel", item).on(cc.Node.EventType.TOUCH_START, this.showIntergralInfoPanel, this);
                item.getComponent(AllianceResultItem).clickFunc = this.showIntergralInfoPanel.bind(this);
                if (i == len - 1) {
                    cc.find("line_img", item).active = false;
                }
            }
            selfCanSee_panel.setPosition(selfCanSee_panel.x, -215 - len * 128 - alliance_panel.getContentSize().height);
        }
        else {
            alliance_panel.active = false;
            insurance_arrow_icon.active = false;
            insurance_arrow_icon0.active = false;
        }

        let offsetY: number = 0;
        if (this.msg.owner_name == cv.dataHandler.getUserData().nick_name || this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) {
            jackpot_text.active = true;
            jackpotword_text.active = true;
            jackpot_img.active = true;
            bg_2.active = true;
            insurance_icon.setPosition(insurance_icon.x, 116);
            bg_1.setPosition(bg_1.x, selfCanSee_panel.getContentSize().height / 4 * 3);
            bg_1.setContentSize(bg_1.getContentSize().width, 76.8);

            if (this.msg.room_param.is_associated_jackpot) {
                if (!this.jackpotNode) {
                    this.jackpotNode = cv.action.addChildToScene(this, this.allianceResultInfo, ["bg_top", "bg", "back_button"], cv.Enum.ZORDER_TYPE.ZORDER_3, true);
                    this.jackpotNode.getComponent(AllianceJackpotInfo).init();
                    cc.find("back_button", this.jackpotNode).on(cc.Node.EventType.TOUCH_END, this.onBtnReturnClick, this);
                }
                this.jackpotNode.getComponent(AllianceJackpotInfo).setData(this.msg);
                this.jackpotNode.active = false;

                if (this.msg.jackpot_winbet > 0) {
                    jackpot_text.color = cv.tools.getWinColor();
                    let num: number = this.jackpotNode.getComponent(AllianceJackpotInfo).getjackpotwinbet();
                    num = cv.StringTools.clientGoldByServer(num);
                    jackpot_text.getComponent(cc.Label).string = "+" + cv.StringTools.numberToShowString(num);
                }
                else if (this.msg.jackpot_winbet == 0) {
                    jackpot_text.color = cc.Color.WHITE;
                    let num: number = this.jackpotNode.getComponent(AllianceJackpotInfo).getjackpotwinbet();
                    num = cv.StringTools.clientGoldByServer(num);
                    jackpot_text.getComponent(cc.Label).string = cv.StringTools.numberToShowString(num);
                }
                else {
                    jackpot_text.color = cv.tools.getLoseColor();
                    let num: number = this.jackpotNode.getComponent(AllianceJackpotInfo).getjackpotwinbet();
                    num = cv.StringTools.clientGoldByServer(num);
                    jackpot_text.getComponent(cc.Label).string = cv.StringTools.numberToShowString(num);
                }

                jackpotword_text.color = cc.color(255, 255, 255);
                jackpot_img.color = cc.color(255, 255, 255);
            }
            else {
                jackpot_text.getComponent(cc.Label).string = "0";
                jackpot_text.color = cc.color(77, 77, 77);
                jackpotword_text.color = cc.color(77, 77, 77);
                jackpot_img.color = cc.color(77, 77, 77);

            }
        }
        else {
            insurance_icon.setPosition(insurance_icon.x, selfCanSee_panel.getContentSize().height * 0.5);
            bg_1.setPosition(bg_1.x, selfCanSee_panel.getContentSize().height * 0.5);
            bg_1.setContentSize(1080, 76.8 * 2);

            bg_2.active = false;
            jackpot_text.active = false;
            jackpotword_text.active = false;
            jackpot_img.active = false;
        }

        cv.StringTools.cleanNodeArray(this.itemList);

        if (this.msg.buyins) {
            this.msg.buyins.sort(function (a, b) {
                return b.WinBet - a.WinBet;
            });

            let getFuWenData: any[] = [];
            cv.StringTools.deepCopy(this.msg.buyins, getFuWenData);
            getFuWenData.sort(function (a, b) {
                return b.TotalBuyin - a.TotalBuyin;
            });

            cv.dataHandler.getUserData().setStringContainRemark(dayu_roleName, this.msg.buyins[this.msg.buyins.length - 1].UID, this.msg.buyins[this.msg.buyins.length - 1].Playername);
            cv.dataHandler.getUserData().setStringContainRemark(mvpName, this.msg.buyins[0].UID, this.msg.buyins[0].Playername);
            cv.dataHandler.getUserData().setStringContainRemark(fuhaoName, getFuWenData[0].UID, getFuWenData[0].Playername);

            (CircleSprite).setCircleSprite(dayu_img, this.msg.buyins[this.msg.buyins.length - 1].PlayerHead, this.msg.buyins[this.msg.buyins.length - 1].plat);
            (CircleSprite).setCircleSprite(mvp_img, this.msg.buyins[0].PlayerHead, this.msg.buyins[0].plat);
            (CircleSprite).setCircleSprite(fuhao_img, getFuWenData[0].PlayerHead, getFuWenData[0].plat);

            for (let i = 0; i < this.msg.buyins.length; i++) {
                let item = cc.instantiate(this.pokerInfoItem);
                item.getComponent(PokerInfoItem).setData(this.msg, i);
                item.setPosition(item.x, selfCanSee_panel.y - 172 - i * 166 + offsetY);
                Panel_1.addChild(item);
                this.itemList.push(item);
            }
        }
        else {

            (CircleSprite).cleanHeadNode(dayu_img);
            (CircleSprite).cleanHeadNode(mvp_img);
            (CircleSprite).cleanHeadNode(fuhao_img);
            (CircleSprite).setCircleSprite(dayu_img, "", 0, true);
            (CircleSprite).setCircleSprite(mvp_img, "", 0, true);
            (CircleSprite).setCircleSprite(fuhao_img, "", 0, true);

            dayu_roleName.getComponent(cc.Label).string = "";
            mvpName.getComponent(cc.Label).string = "";
            fuhaoName.getComponent(cc.Label).string = "";
        }

        let scrolllHeigt: number = 0;
        if (cv.StringTools.getArrayLength(this.msg.clubInfos) > 0 && alliance_panel.active) {
            scrolllHeigt = cv.StringTools.getArrayLength(this.msg.clubInfos) * 128 + alliance_panel.getContentSize().height + 80;
        }
        scrolllHeigt = scrolllHeigt + 750 + 170 * cv.StringTools.getArrayLength(this.msg.buyins);
        if (scrolllHeigt > contentNode.getContentSize().height) {
            contentNode.setContentSize(contentNode.getContentSize().width, scrolllHeigt);
        }
        let isAllin = this.msg.gameid == cv.Enum.GameId.Allin;
        insurance_icon.active = !isAllin;
        cc.find("insurance_button", selfCanSee_panel).active = !isAllin;
        if (isAllin) {
            insurance_icon.active = false;
            insurance_arrow_icon.active = false;
            insurance_arrow_icon0.active = false;
        }
        else {
            insurance_icon.active = true;
        }
    }

    isCanSeeAllianceResult(uid: number) {
        //if (cv.StringTools.getArrayLength(this.msg.clubInfos) <= 0) return false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this.msg.club_adminids); i++) {
            if (uid == this.msg.club_adminids[i]) return true;
        }
        return false;
    }

    onBtnGameReviewClick(event: cc.Component.EventHandler) {
        cv.AudioMgr.playButtonSound('button_click');
        let gameReviewNode: cc.Node = GameReview.getSinglePrefabInst(this.gameReview);
        if (gameReviewNode) {
            let gameReview: GameReview = gameReviewNode.getComponent(GameReview);
            gameReview.setShowAudit(this._isShowAudit);
            gameReview.autoShow(cv.Enum.GameReviewDataType.EDST_RECORD);
        }
    }

    showIntergralInfoPanel() {
        let alliance_panel = cc.find("scorellview/content/Panel_1/alliance_panel", this.node);
        if (cv.StringTools.getArrayLength(this.msg.room_param.alliance_ids) <= 0) {
            if (this.msg.room_param.CreaterId != cv.dataHandler.getUserData().u32Uid) return;
        }
        else {
            if (!this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) return;
        }
        this.integralNode.getComponent(AllianceIntegralInfo).setData(this.msg);
        cv.action.showAction(this.integralNode, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);

        if (alliance_panel.active) {
            cv.AudioMgr.playButtonSound('tab');
        }
    }

    showJackpotResultPanel(event: cc.Event.EventTouch) {
        let contentNode = cc.find("scorellview/content", this.node);
        let jackpot_img = cc.find("Panel_1/selfCanSee_panel/jackpot_img", contentNode);

        if (!this.msg.room_param.is_associated_jackpot) return;
        if (cv.StringTools.getArrayLength(this.msg.room_param.alliance_ids) <= 0) {
            if (this.msg.room_param.CreaterId != cv.dataHandler.getUserData().u32Uid) return;
        }
        else {
            if (!this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) return;
        }
        this.jackpotNode.getComponent(AllianceJackpotInfo).setData(this.msg);
        cv.action.showAction(this.jackpotNode, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
        if (jackpot_img.active) {
            cv.AudioMgr.playButtonSound('tab');
        }
    }

    showInsuranceResultPanel(event: cc.Event.EventTouch) {
        let selfCanSee_panel = cc.find("scorellview/content/Panel_1/selfCanSee_panel", this.node);
        let insurance_icon = cc.find("insurance_icon", selfCanSee_panel);

        if (cv.StringTools.getArrayLength(this.msg.room_param.alliance_ids) <= 0) {
            if (this.msg.room_param.CreaterId != cv.dataHandler.getUserData().u32Uid) return;
        }
        else {
            if (!this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid)) return;
        }
        this.insuranceNode.getComponent(AllianceInsuranceInfo).setData(this.msg);
        cv.action.showAction(this.insuranceNode, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
        if (insurance_icon.active) {
            cv.AudioMgr.playButtonSound('tab');
        }
    }

    onBtnReturnClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(event.currentTarget.getParent(), cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);
    }

    initAllianceResultInfo() {
        if (!this.insuranceNode) {
            this.insuranceNode = cv.action.addChildToScene(this, this.allianceResultInfo, ["bg_top", "bg", "back_button"], cv.Enum.ZORDER_TYPE.ZORDER_3, true);
            this.insuranceNode.getComponent(AllianceInsuranceInfo).init();
            cc.find("back_button", this.insuranceNode).on(cc.Node.EventType.TOUCH_END, this.onBtnReturnClick, this);
        }

        if (!this.jackpotNode) {
            this.jackpotNode = cv.action.addChildToScene(this, this.allianceResultInfo, ["bg_top", "bg", "back_button"], cv.Enum.ZORDER_TYPE.ZORDER_3, true);
            this.jackpotNode.getComponent(AllianceJackpotInfo).init();
            cc.find("back_button", this.jackpotNode).on(cc.Node.EventType.TOUCH_END, this.onBtnReturnClick, this);
        }

        if (!this.integralNode) {
            this.integralNode = cv.action.addChildToScene(this, this.allianceResultInfo, ["bg_top", "bg", "back_button"], cv.Enum.ZORDER_TYPE.ZORDER_3, true);
            this.integralNode.getComponent(AllianceIntegralInfo).init();
            cc.find("back_button", this.integralNode).on(cc.Node.EventType.TOUCH_END, this.onBtnReturnClick, this);
        }
    }

    public setShowAudit(isShowAudit: boolean) {
        this._isShowAudit = isShowAudit;
    }

    public showAudit(value: any) {
        let gameReportNode: cc.Node = Audit.getSinglePrefabInst(this.prefab_report);
        if (value) {
            let game_Audit = gameReportNode.getComponent(Audit);
            let scene = cc.director.getScene();
            game_Audit.autoShow(scene, cv.Enum.GameReviewDataType.EDST_RECORD, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        }
    }
}