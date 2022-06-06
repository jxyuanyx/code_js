import cv from "./../../../components/lobby/cv"
import _PokerInfoItemNew from "./PokerInfoItemNew"
import { CircleSprite, Head_Mode } from "../../tools/CircleSprite";
import { GameReview } from "../../../components/game/dzPoker/gameReview/GameReview";
import Audit from "../../../components/game/dzPoker/Audit";

/**
 * 本类所在节点添加到当前场景
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class PokerInfoNew extends cc.Component {

    @property(cc.Prefab)
    pokerInfoItem: cc.Prefab = null;
    @property(cc.Prefab)
    gameReview: cc.Prefab = null;
    msg: any = null;
    itemList: Array<cc.Node> = [];

    @property(cc.Prefab)
    prefab_report: cc.Prefab = null;
    alliceItemList: Array<cc.Node> = [];

    //touch event
    beginPosY: number = 0;


    _isShowAudit: boolean = false;

    backBtnClickFunc: Function = null;
    scrolllHeigt: number = 1530;

    onLoad() {

        let contentNode = cc.find("scorellview/content", this.node);
        this.scrolllHeigt = contentNode.getContentSize().height;
        this.registerMsg();
        this.initLanguage();
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); }, this);
    }

    start() {
        cv.config.adaptSize([cc.find("scorellview", this.node)]);
        cc.find("scorellview", this.node).getComponent(cc.ScrollView).scrollToTop();
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
        cv.StringTools.setLabelString(this.node, "insurance_title_text", "PokerInfo_scorellview_insurance_icon_insurance_title_text");
        cv.StringTools.setLabelString(cc.find("scorellview/content/Panel_1", this.node), "hand_map_text", "DataView_data_panel_dataInfo_panel_records_title_txt");
        cv.StringTools.setLabelString(this.node, "scorellview/content/Panel_1/title", "DataView_data_panel_dataInfo_panel_detailPlayer_title_txt");

        cv.resMgr.setSpriteFrame(cc.find("scorellview/content/Panel_1/dayu_img/Image_2", this.node), cv.config.getLanguagePath("hall/recordView/fish_icon"));
        cv.resMgr.setSpriteFrame(cc.find("scorellview/content/Panel_1/fuhao_img/Image_2_0_0", this.node), cv.config.getLanguagePath("hall/recordView/rich_icon"));


        let line1 = cc.find("scorellview/content/Panel_1/line1", this.node);
        let line2 = cc.find("scorellview/content/Panel_1/line2", this.node);
        let title = cc.find("scorellview/content/Panel_1/title", this.node);
        let width = cv.resMgr.getLabelStringSize(title.getComponent(cc.Label)).width;

        line1.setContentSize(cc.size(470 - width / 2, line1.height));
        line2.setContentSize(cc.size(470 - width / 2, line2.height));
    }

    responseRoomRecordSuccess(value) {
        this.initData(value);
        cc.find("scorellview", this.node).getComponent(cc.ScrollView).scrollToTop();
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

        if (this.node.activeInHierarchy) {
            console.log("current pokerInfoNew is activeInHierarchy");
            return;
        }
        this.node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_2;
        cv.action.moveToAction(this.node, "TO_LEFT", "ENTER", cv.Enum.action_FuncType.dt_FAST,
            new cc.Vec2(cv.config.WIDTH * 1.5, cv.config.HEIGHT * 0.5), new cc.Vec2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5));

        cc.find("day_text", this.node).getComponent(cc.Label).string = cv.StringTools.formatTime(this.msg.create_time, cv.Enum.eTimeType.Year_Month_Day)
            + " " + cv.StringTools.formatTime(this.msg.create_time, cv.Enum.eTimeType.Hour_Minute);
        cc.find("allTotal_text", this.node).getComponent(cc.Label).string = this.msg.total_hand_count;
        cc.find("mostBigPot_text", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.max_port);
        cc.find("totalBring", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.room_total_buyin);
        let blindWordText = cc.find("blindWordText", this.node);
        let mangZhu_text = cc.find("mangZhu_text", this.node);

        if (this.msg.room_param.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            blindWordText.getComponent(cc.Label).string = cv.config.getStringData("Cell0") + ":";
            mangZhu_text.getComponent(cc.Label).string = cv.config.getblindString(this.msg.room_param.rule_blind_enum - 1);
        }
        else {
            blindWordText.getComponent(cc.Label).string = cv.config.getStringData("Cell4") + ":";
            mangZhu_text.getComponent(cc.Label).string = cv.StringTools.clientGoldByServer(this.msg.room_param.rule_ante_amount).toString();
        }

        blindWordText.setPosition(mangZhu_text.x - cv.resMgr.getLabelStringSize(mangZhu_text.getComponent(cc.Label)).width - 10, blindWordText.y);

        let insurance_text = cc.find("insurance_text", this.node);
        insurance_text.setPosition(cc.find("insurance_title_text", this.node).getPosition().x - cc.find("insurance_title_text", this.node).width / 2, insurance_text.getPosition().y);
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

        let contentNode = cc.find("scorellview/content", this.node);
        let dayu_roleName = cc.find("Panel_1/dayu_img/dayu_roleName", contentNode).getComponent(cc.Label);
        let mvpName = cc.find("Panel_1/mvp_img/mvpName", contentNode).getComponent(cc.Label);
        let fuhaoName = cc.find("Panel_1/fuhao_img/fuhaoName", contentNode).getComponent(cc.Label);
        let dayu_img = cc.find("Panel_1/dayu_img/head", contentNode);
        let mvp_img = cc.find("Panel_1/mvp_img/head", contentNode);
        let fuhao_img = cc.find("Panel_1/fuhao_img/head", contentNode);

        let Panel_1 = cc.find("Panel_1", contentNode);

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


            let name1 = this.msg.buyins[this.msg.buyins.length - 1].Playername
            if (cv.StringTools.getStrLen(name1) > 14) {
                dayu_roleName.fontSize = 24;
            } else {
                dayu_roleName.fontSize = 30;
            }
            // dayu_roleName.string = name1;
            cv.StringTools.setShrinkString(dayu_roleName.node, name1, true);


            let name2 = this.msg.buyins[0].Playername
            if (cv.StringTools.getStrLen(name2) > 14) {
                mvpName.fontSize = 24;
            } else {
                mvpName.fontSize = 30;
            }
            // mvpName.string = name2;
            cv.StringTools.setShrinkString(mvpName.node, name2, true);


            let name3 = getFuWenData[0].Playername
            if (cv.StringTools.getStrLen(name3) > 14) {
                fuhaoName.fontSize = 24;
            } else {
                fuhaoName.fontSize = 30;
            }
            // fuhaoName.string = name3;
            cv.StringTools.setShrinkString(fuhaoName.node, name3, true);


            (CircleSprite).setCircleSprite(dayu_img, this.msg.buyins[this.msg.buyins.length - 1].PlayerHead, this.msg.buyins[this.msg.buyins.length - 1].plat, false);
            (CircleSprite).setCircleSprite(mvp_img, this.msg.buyins[0].PlayerHead, this.msg.buyins[0].plat, false);
            (CircleSprite).setCircleSprite(fuhao_img, getFuWenData[0].PlayerHead, getFuWenData[0].plat, false);

            for (let i = 0; i < this.msg.buyins.length; i++) {
                let item = cc.instantiate(this.pokerInfoItem);
                item.getComponent(_PokerInfoItemNew).setData(this.msg, i);
                item.setPosition(item.x, - (i + 1) * 176 - 600);
                contentNode.addChild(item);
                this.itemList.push(item);
            }
        }
        else {

            (CircleSprite).cleanHeadNode(dayu_img);
            (CircleSprite).cleanHeadNode(mvp_img);
            (CircleSprite).cleanHeadNode(fuhao_img);
            (CircleSprite).setCircleSprite(dayu_img, "", 0, false);
            (CircleSprite).setCircleSprite(mvp_img, "", 0, false);
            (CircleSprite).setCircleSprite(fuhao_img, "", 0, false);

            dayu_roleName.getComponent(cc.Label).string = "";
            mvpName.getComponent(cc.Label).string = "";
            fuhaoName.getComponent(cc.Label).string = "";
        }

        let scrolllHeigt: number = 0;
        scrolllHeigt = 600 + 176 * cv.StringTools.getArrayLength(this.msg.buyins);
        if (scrolllHeigt >= contentNode.getContentSize().height) {
            contentNode.setContentSize(contentNode.getContentSize().width, scrolllHeigt);
        } else {
            contentNode.setContentSize(contentNode.getContentSize().width, this.scrolllHeigt);
        }
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

    onBtnReturnClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(event.currentTarget.getParent(), cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);
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

    isCanSeeAllianceResult(uid: number) {
        //if (cv.StringTools.getArrayLength(this.msg.clubInfos) <= 0) return false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this.msg.club_adminids); i++) {
            if (uid == this.msg.club_adminids[i]) return true;
        }
        return false;
    }
}