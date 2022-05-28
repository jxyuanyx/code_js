import cv from "../../lobby/cv";
import { menu } from "./menu";
import GameDataManager from "./data/GameDataManager";
import { PlayerInfo } from "./data/RoomData";
import { GameMain } from "./GameMain";
//import { AofGameMain } from "../Aof/AofGameMain";
import Buyin from "./Buyin";
import { GameReview } from "./gameReview/GameReview";
import FaceView from "./danmu/FaceView";
import FaceBarrage from "./danmu/FaceBarrage";
import { RoleInfoSet } from "../../lobby/hall/RoleInfoSet";
import { SliderVerify } from "./../../lobby/sliderVerify/SliderVerify";
import { Seat } from "./Seat";

import game_protocol = require("../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import { GiftEntrance } from "./gift/GiftEntrance";

const { ccclass, property } = cc._decorator;
@ccclass
export class GameScene extends cc.Component {

    @property(cc.Node) jackPotPanel: cc.Node = null;
    @property(cc.Node) gameMain_panel: cc.Node = null;
    @property(cc.Node) card_panel: cc.Node = null;

    @property(cc.Node) voice_panel: cc.Node = null;
    @property(cc.Sprite) recordComplete_img: cc.Sprite = null;
    @property(cc.Sprite) recording_img: cc.Sprite = null;


    @property(cc.Prefab) face_Panel_prefab: cc.Prefab = null;
    @property(cc.Prefab) face_barrage_prefab: cc.Prefab = null;
    face_Panel: cc.Node = null;
    @property(cc.Prefab) danmu_Panel_prefab: cc.Prefab = null;
    danmu_view: cc.Node = null;
    @property(cc.Node) danmu_Panel: cc.Node = null;

    @property(cc.Prefab) changeCard_panel_prefab: cc.Prefab = null;
    changeCard_panel: cc.Node = null;

    @property(cc.Prefab) menu_Panel_prefab: cc.Prefab = null;
    menu_Panel: cc.Node = null;

    //友好度升级动画
    @property(cc.Prefab) frienddegree_ziji_prefab: cc.Prefab = null;
    frienddegree_ziji: cc.Node = null;

    @property(cc.Prefab) frienddegree_duifang_prefab: cc.Prefab = null;
    frienddegree_duifang: cc.Node = null;

    @property(cc.Node) gameIcon_img: cc.Node = null;
    @property(cc.Node) gameIcon_img_star: cc.Node = null;
    @property(cc.Node) game_bg: cc.Node = null;
    @property(cc.Node) publicCard_panel: cc.Node = null;

    @property(cc.Prefab) currentTime_prefab: cc.Prefab = null;
    @property(cc.Prefab) buyinList_prefab: cc.Prefab = null;
    currentTime_panel: cc.Node = null;

    dairu_panel: cc.Node = null;

    @property(cc.Prefab) ruleDiscription_panel_prefab: cc.Prefab = null;
    ruleDiscription_panel: cc.Node = null;
    @property(cc.Prefab) jackPot_prefab: cc.Prefab = null;
    jackPot_Panel: cc.Node = null;
    @property(cc.Prefab) allreview_prefab: cc.Prefab = null;
    allreview_panel: cc.Node = null;

    @property(cc.Prefab) buyin_prefab: cc.Prefab = null;
    buyin_panel: cc.Node = null;

    @property(cc.Prefab) gift_prefab: cc.Prefab = null;
    giftEntrance: GiftEntrance = null;

    @property(cc.Prefab) sliderVerify_prefab: cc.Prefab = null;
    sliderVerify_panel: SliderVerify = null;

    @property(cc.Prefab) insuranceEntrance_prefab: cc.Prefab = null;
    insurance_panel: cc.Node = null;

    @property(cc.Prefab) insuranceHitOutsTips_prefab: cc.Prefab = null;
    insuranceHitOutsTips: cc.Node = null;

    @property(cc.Prefab) recallbuyin_prefab: cc.Prefab = null;
    recallbuyin_panel: cc.Node = null;

    @property(cc.Prefab) autorecallbuyin_prefab: cc.Prefab = null;
    autorecallbuyin_panel: cc.Node = null;

    @property(cc.Prefab) card: cc.Prefab = null;

    @property(cc.Prefab) ChipsMoveprefab: cc.Prefab = null;

    @property(cc.Prefab) hoseOwer_prefab: cc.Prefab = null;
    hoseOwer_panel: cc.Node = null;

    @property(cc.Prefab) pause_prefab: cc.Prefab = null;
    pausePoker_panel: cc.Node = null;

    @property(cc.Prefab) faceSpine_prefab: cc.Prefab = null;

    @property(cc.Prefab) starInfo: cc.Prefab = null;

    @property(cc.Button) buttonFace: cc.Button = null;

    @property(cc.Label) recordTxt: cc.Label = null;
    @property(cc.Label) recordTimeTxt: cc.Label = null;

    @property(cc.Prefab) guess_hand_card_prefab: cc.Prefab = null;
    guess_hand_card: cc.Node = null;

    @property(cc.Prefab) activityPref: cc.Prefab = null;
    @property(cc.Prefab) prefab_roleInfoSet: cc.Prefab = null;

    public gameSeatIsTurning: boolean = false;
    public roomHasEnd: boolean = false;

    constructor() {
        super();
    }
    onLoad() {
        cv.config.setCurrentScene(cv.Enum.SCENE.GAME_SCENE);
        cv.config.adaptScreen(this.node);
        cv.GameDataManager.tRoomData.resetVoice();

        this.guess_hand_card = cc.instantiate(this.guess_hand_card_prefab);
        this.node.addChild(this.guess_hand_card, cv.Enum.ZORDER_TYPE.ZORDER_6);
        this.guess_hand_card.active = false;

        if (this.isGameStarSeat()) {
            // 实例化"礼物模块入口"(层级要低于弹幕)
            let gift_inst: cc.Node = cc.instantiate(this.gift_prefab);
            this.giftEntrance = gift_inst.getComponent(GiftEntrance);
            this.node.addChild(this.giftEntrance.node, cv.Enum.ZORDER_TYPE.ZORDER_4);
            this.giftEntrance.node.active = false;

            // 弹幕
            this.face_Panel = cc.instantiate(this.face_barrage_prefab);
            this.node.addChild(this.face_Panel, cv.Enum.ZORDER_TYPE.ZORDER_7);
            this.face_Panel.name = "facepanel";
            this.face_Panel.getComponent(FaceBarrage).setParentNode(this.danmu_Panel);
            this.face_Panel.getComponent(FaceBarrage).setGameScene(this);
        } else {
            this.face_Panel = cc.instantiate(this.face_Panel_prefab);
            this.node.addChild(this.face_Panel, cv.Enum.ZORDER_TYPE.ZORDER_7);
            this.face_Panel.name = "facepanel";
            this.face_Panel.getComponent(FaceView).setParentNode(this.danmu_Panel);
            this.face_Panel.getComponent(FaceView).setGameScene(this);
        }

        this.pausePoker_panel = cc.instantiate(this.pause_prefab);
        this.node.addChild(this.pausePoker_panel);

        this.menu_Panel = cc.instantiate(this.menu_Panel_prefab);
        this.node.addChild(this.menu_Panel);

        this.frienddegree_ziji = cc.instantiate(this.frienddegree_ziji_prefab);
        this.node.addChild(this.frienddegree_ziji);

        this.frienddegree_duifang = cc.instantiate(this.frienddegree_duifang_prefab);
        this.node.addChild(this.frienddegree_duifang);

        this.buyin_panel = cc.instantiate(this.buyin_prefab);
        this.node.addChild(this.buyin_panel, cv.Enum.ZORDER_TYPE.ZORDER_7);

        this.recallbuyin_panel = cc.instantiate(this.recallbuyin_prefab);
        this.node.addChild(this.recallbuyin_panel);

        this.autorecallbuyin_panel = cc.instantiate(this.autorecallbuyin_prefab);
        this.node.addChild(this.autorecallbuyin_panel);

        this.menu_Panel.getComponent(menu).setGameScene(this);
        this.ruleDiscription_panel = cc.instantiate(this.ruleDiscription_panel_prefab);
        //因为动画表情要高于原先设置的快捷加注，所以设置成了120,造成点开规则界面有部分在上面有部分在下面，现在把规则zindex调高了，都在动画上面
        this.ruleDiscription_panel.zIndex = 121; //cv.Enum.ZORDER_TYPE.ZORDER_TOP;
        cc.director.getScene().addChild(this.ruleDiscription_panel, 121);
        cc.find("menu_button/image_pos", this.gameMain_panel).active = this.menu_Panel.getComponent(menu).isShowPos();

        // 实例化"真人验证"模块
        this.sliderVerify_panel = SliderVerify.initSingleInst(this.sliderVerify_prefab, this.node, cv.Enum.ZORDER_TYPE.ZORDER_TOP);

        // 实例化"保险"模块
        this.insurance_panel = cc.instantiate(this.insuranceEntrance_prefab);
        this.node.addChild(this.insurance_panel, cv.Enum.ZORDER_TYPE.ZORDER_5);

        // 实例化"保险提示动画"模块
        this.insuranceHitOutsTips = cc.instantiate(this.insuranceHitOutsTips_prefab);
        this.node.addChild(this.insuranceHitOutsTips, cv.Enum.ZORDER_TYPE.ZORDER_4);

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
            //this.gameMain_panel.getComponent(GameMain).enabled = false;
            //this.gameMain_panel.getComponent(AofGameMain).setGameScene(this);
            //this.changeCard_panel = cc.instantiate(this.changeCard_panel_prefab);
            //this.changeCard_panel.getComponent("ChangeCard").setGameMain(this.gameMain_panel.getComponent("AofGameMain") as AofGameMain);
            //this.node.addChild(this.changeCard_panel);
        } else {
            //this.gameMain_panel.getComponent(AofGameMain).enabled = false;
            this.gameMain_panel.getComponent("GameMain").setGameScene(this);
            this.recallbuyin_panel.getComponent("RecallBuyin").setGameMain(this.gameMain_panel.getComponent("GameMain"));
            this.autorecallbuyin_panel.getComponent("AutoRecallBuyin").setGameMain(this.gameMain_panel.getComponent("GameMain"));
            this.changeCard_panel = cc.instantiate(this.changeCard_panel_prefab);
            this.changeCard_panel.getComponent("ChangeCard").setGameMain(this.gameMain_panel.getComponent("GameMain"));
            this.node.addChild(this.changeCard_panel, cv.Enum.ZORDER_TYPE.ZORDER_5);
        }



        this.allreview_panel = GameReview.getSinglePrefabInst(this.allreview_prefab);
        this.hoseOwer_panel = cc.instantiate(this.hoseOwer_prefab);
        this.node.addChild(this.hoseOwer_panel);
        this.hoseOwer_panel.getComponent("HouseOwer").setGameScene(this)

        this.jackPot_Panel = cc.instantiate(this.jackPot_prefab);
        this.node.addChild(this.jackPot_Panel);
        // this.currentTime_panel = cc.instantiate(this.currentTime_prefab);
        // this.currentTime_panel.getComponent(CurrentTime).init();
        // cc.director.getScene().addChild(this.currentTime_panel, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        this.currentTime_panel = cv.action.addChildToScene(this, this.currentTime_prefab, [], cv.Enum.ZORDER_TYPE.ZORDER_6, true);
        this.dairu_panel = cc.instantiate(this.buyinList_prefab);
        this.node.addChild(this.dairu_panel);

        this.gameIcon_img_star.active = false;
        this.gameIcon_img.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
        cv.resMgr.setSpriteFrame(this.gameIcon_img, cv.config.getLogoPath(cv.Enum.SCENE.GAME_SCENE), this.setLogoShow.bind(this));
        this.buyin_panel.active = false;
        this.recallbuyin_panel.active = false;
        this.autorecallbuyin_panel.active = false;
        this.hoseOwer_panel.active = false;
        this.currentTime_panel.active = false;
        this.jackPot_Panel.active = false;
        this.changeCard_panel.active = false;
        this.ruleDiscription_panel.active = false;
        this.pausePoker_panel.active = false;
        this.dairu_panel.active = false;
        this.jackPotPanel.active = false;
        this.frienddegree_ziji.active = false;
        this.frienddegree_duifang.active = false;

        let isNewYear: boolean = cv.config.isShowNewYear();
        cc.find("newyear_fu_left", this.jackPotPanel).active = isNewYear;
        cc.find("newyear_fu_right", this.jackPotPanel).active = isNewYear;
        cc.find("newyear_panel", this.node).active = isNewYear;
        //let path = isNewYear ? "zh_CN/festival/newyear/newyear_bg_jackpot" : "zh_CN/game/dzpoker/ui/Jackpot_01a";
        //cv.resMgr.setSpriteFrame(cc.find("jackpot_img", this.jackPotPanel), path);

        this.menu_Panel.active = false;
        this.game_bg.active = true;
        //cc.find("allReview_button",this.gameMain_panel).active = false;
        //cc.find("waitForStart_img/waiting_txt",this.gameMain_panel).getComponent(cc.Label).string = "231654";

        // if (cv.Number(cv.tools.GetStringByCCFile("FINDVIEW_isFASTENTER")) == 1 && cv.roomManager.getCurrentGameID() != cv.Enum.GameId.Allin && !cv.GameDataManager.tRoomData.isZoom()) {
        //     if (cv.dataHandler.getActivityData().isAvatar()) {
        //         this.buyin_panel.active = true;
        //         this.buyin_panel.getComponent(Buyin).UpdateBuyinInfo();
        //     }
        //     cv.tools.SaveStringByCCFile("FINDVIEW_isFASTENTER", "0");
        // }
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Texas || cv.GameDataManager.tRoomData.isZoom()) {
        //     cv.MessageCenter.register("on_owner_apply_buyinlimit", this.OnOwnerApplyBuyin.bind(this), this.node);
        //     cv.MessageCenter.register("on_owner_apply_buyinlimit2", this.OnOwnerApplyBuyin.bind(this), this.node);
        // }

        cv.MessageCenter.register("on_NoticeBuyin", this.onNoticeBuyin.bind(this), this.node);

        cv.MessageCenter.register("on_intimacy", this.onIntimacy.bind(this), this.node);

        // if (cv.GameDataManager.tRoomData.isZoom()) {
        //     this.OnOwnerApplyBuyin(null);
        // }

        this.onNoticeBuyin(null);
        cv.resMgr.adaptWidget(this.node, true);
        this.AdaptiveExpand();
        this.buttonFace.node.on("click", (event: cc.Event): void => { this.onbtnFaceClick(event); }, this);
    }

    public setLogoShow() {
        //this.gameIcon_img.active = true;
    }

    public start() {
        let node = cv.action.addChildToScene(this, this.activityPref, [], cv.Enum.ZORDER_TYPE.ZORDER_ACTIVITY, true);
        node.name = "activityView";
        let roleInfoSet = cv.action.addChildToScene(this, this.prefab_roleInfoSet, [], undefined, true);
        roleInfoSet.name = "roleInfoSet";
        cv.MessageCenter.register("roleInfoSet_setAvatar", this.setAvatar.bind(this), this.node);

        if (cv.GameDataManager.bIsAuthMicphone == false) {
            cv.native.AuthMicphone();
            cv.GameDataManager.bIsAuthMicphone = true;
        }
        this.initLanguage();
    }

    public onDestroy() {
        cv.gameNet.stopVoice();
        //取消明星桌动画定时器
        this.unscheduleAllCallbacks();

        // cv.MessageCenter.unregister("on_owner_apply_buyinlimit", this.node);
        // cv.MessageCenter.unregister("on_owner_apply_buyinlimit2", this.node);
        cv.MessageCenter.unregister("on_NoticeBuyin", this.node);
        cv.MessageCenter.unregister("roleInfoSet_setAvatar", this.node);
        cv.MessageCenter.unregister("on_intimacy", this.node);

        cv.GameDataManager.tRoomData.resetVoice();
    }

    public initLanguage() {
        let gameMain_panel = cc.find("gameMain_panel", this.node);
        let actionButton_panel = gameMain_panel.getChildByName("actionButton_panel");

        cv.StringTools.setLabelString(gameMain_panel, "waitForStart_img/waiting_txt", "GameScene_gameMain_panel_waitForStart_img_waiting_txt");
        cv.StringTools.setLabelString(actionButton_panel, "dichi_button0/dichi_wordText0", "GameScene_gameMain_panel_controlButton_panel_dichi_button0_dichi_wordText0");
        cv.StringTools.setLabelString(actionButton_panel, "dichi_button1/dichi_wordText1", "GameScene_gameMain_panel_controlButton_panel_dichi_button1_dichi_wordText1");
        cv.StringTools.setLabelString(actionButton_panel, "dichi_button2/dichi_wordText2", "GameScene_gameMain_panel_controlButton_panel_dichi_button2_dichi_wordText2");
        cv.StringTools.setLabelString(actionButton_panel, "dichi_button3/dichi_wordText3", "GameScene_gameMain_panel_controlButton_panel_dichi_button3_dichi_wordText3");
        cv.StringTools.setLabelString(actionButton_panel, "dichi_button4/dichi_wordText4", "GameScene_gameMain_panel_controlButton_panel_dichi_button4_dichi_wordText4");

        let actionButton_panel2 = gameMain_panel.getChildByName("actionButton_panel_2");
        cv.StringTools.setLabelString(actionButton_panel2, "dichi_button1/dichi_wordText1", "GameScene_gameMain_panel_controlButton_panel_dichi_button1_dichi_wordText1");

        let freeFill_button_path = cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_01");
        cv.resMgr.setButtonFrame(actionButton_panel.getChildByName("freeFill_button"), freeFill_button_path, freeFill_button_path, freeFill_button_path, freeFill_button_path);
        cv.resMgr.setSpriteFrame(actionButton_panel.getChildByName("giveUpRed"), cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_03"));
        cv.resMgr.setSpriteFrame(actionButton_panel.getChildByName("followFl_Blue"), cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_02x2"));

        cv.resMgr.setButtonFrame(gameMain_panel.getChildByName("deal_button"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_14"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_141"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_14"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_Button_big_14"));
        cv.resMgr.setButtonFrame(gameMain_panel.getChildByName("forceShowCard_button"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_force_showCardOn"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_force_showCardDown"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_force_showCardOn"),
            cv.config.getLanguagePath("game/dzpoker/ui/gameMain/game_force_showCardOn"));
        cv.StringTools.setLabelString(gameMain_panel, "backGame_button/Label", "GameScene_gameMain_panel_backGame_button");

        this.recordTxt.string = cv.config.getStringData("GameScene_voice_panel_cdTime_recording_img_record_txt");
        this.recordTimeTxt.string = cv.config.getStringData("GameScene_voice_panel_cdTime_recording_img_recordTime_txt");

        let guess_panel = this.guess_hand_card.getChildByName("guess_panel");
        let continue_panel = this.guess_hand_card.getChildByName("continue_panel");
        cv.StringTools.setLabelString(guess_panel, "guess_button_1/title_label", "GameScene_gameMain_panel_guess_hand_card_guess_panel_guess_button_title_label");
        cv.StringTools.setLabelString(guess_panel, "guess_button_2/title_label", "GameScene_gameMain_panel_guess_hand_card_guess_panel_guess_button_title_label");
        cv.StringTools.setLabelString(guess_panel, "close_button/label", "GameScene_gameMain_panel_guess_hand_card_guess_panel_guess_close_button_label");
        cv.StringTools.setLabelString(continue_panel, "continue_button/label", "GameScene_gameMain_panel_guess_hand_card_continue_panel_continue_button_Label");


        let guess_hand_card_button = gameMain_panel.getChildByName("guess_hand_card_button");
        let guess_tips = guess_hand_card_button.getChildByName("guess_tips");
        let guess_tips_label = guess_tips.getChildByName("guess_tips_label");
        guess_tips_label.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("UIGuesstips"));
        let tipsWidth = cv.resMgr.getLabelStringSize(guess_tips_label.getComponent(cc.Label)).width;
        guess_tips.setContentSize(cc.size(tipsWidth + 45, guess_tips.getContentSize().height))
    }

    // public OnOwnerApplyBuyin(data) {

    //     if (!cv.GameDataManager.tRoomData.hasRecvBuyinToApplicantNotice)  //如果收到了
    //         return;
    //     let _data = data;
    //     if (_data == null) {
    //         _data = GameDataManager.tRoomData.u32BuyinLimit - GameDataManager.tRoomData.u32Buyin;
    //     }
    //     let num = cv.StringTools.clientGoldByServer(_data);
    //     this.OnBuyinNow(num);
    // }

    public onIntimacy(data) {
        if (data.way == 1) {
            let otherSeat: Seat = this.gameMain_panel.getComponent(GameMain).getSeatByPlayerID(data.playerid);
            if (otherSeat != null) {
                let worldPos = otherSeat.node.getParent().convertToWorldSpaceAR(otherSeat.node.getPosition());
                let endPos = this.node.convertToNodeSpaceAR(worldPos);
                this.frienddegree_duifang.setPosition(endPos);

                let duifang_ac = this.frienddegree_duifang.getComponent(cc.Animation);
                this.frienddegree_duifang.active = true;
                duifang_ac.play();

                duifang_ac.on("finished", (event: cc.Event): void => {
                    duifang_ac.off("finished");
                    this.frienddegree_duifang.active = false;
                });
            }

            let selfSeat: Seat = this.gameMain_panel.getComponent(GameMain).getSeatByPlayerID(cv.dataHandler.getUserData().u32Uid);
            if (selfSeat != null) {

                let curGameId = cv.roomManager.getCurrentGameID();
                let worldPos: cc.Vec3 = cc.Vec3.ZERO;
                if (curGameId == cv.Enum.GameId.StarSeat) {
                    worldPos = selfSeat.node.getParent().convertToWorldSpaceAR(new cc.Vec2(selfSeat.node.getPosition().x, selfSeat.node.getPosition().y + 250));
                }
                else {
                    worldPos = selfSeat.node.getParent().convertToWorldSpaceAR(new cc.Vec2(selfSeat.node.getPosition().x, selfSeat.node.getPosition().y + 200));
                }
                let endPos = this.node.convertToNodeSpaceAR(worldPos);
                this.frienddegree_ziji.setPosition(endPos);

                let self_ac = this.frienddegree_ziji.getComponent(cc.Animation);
                this.frienddegree_ziji.active = true;
                cc.find("di/wenzi/zi", this.frienddegree_ziji).getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Star_friend_update"), data.nickname, cv.tools.GetFriendLevelName(data.intimacy));
                self_ac.play();

                self_ac.on("finished", (event: cc.Event): void => {
                    self_ac.off("finished");
                    this.frienddegree_ziji.active = false;
                });
            }
        }
    }

    public onNoticeBuyin(data) {
        if (!cv.GameDataManager.tRoomData.hasRecvBuyinNotice) {
            return;
        }

        if (data == null) {
            data = cv.GameDataManager.tRoomData.recNeedBuyNoticeData;
        }
        //cv.TT.showMsg(cv.config.getStringData("ErrorToast26"), cv.Enum.ToastType.ToastTypeSuccess);
        if (data != null) {
            if (data.usdt_subtract != 0 && data.gold_add != 0) {
                if (!data.is_auto) {
                    cv.TT.showMsg(cv.StringTools.formatC(data.next_hand ? cv.config.getStringData("ErrorToast48") : cv.config.getStringData("ErrorToast49"), cv.StringTools.numToFloatString(data.usdt_subtract), cv.StringTools.numToFloatString(data.gold_add), cv.StringTools.numToFloatString(data.buyin_amount)), cv.Enum.ToastType.ToastTypeSuccess);
                } else {
                    if (data.next_hand) {
                        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ErrorToast48"), cv.StringTools.numToFloatString(data.usdt_subtract), cv.StringTools.numToFloatString(data.gold_add), cv.StringTools.numToFloatString(data.buyin_amount)), cv.Enum.ToastType.ToastTypeSuccess);
                    }
                }
            } else {
                if (!data.is_auto) {
                    cv.TT.showMsg(cv.StringTools.formatC(data.next_hand ? cv.config.getStringData("ErrorToast45") : cv.config.getStringData("ErrorToast46"), cv.StringTools.numToFloatString(data.buyin_amount)), cv.Enum.ToastType.ToastTypeSuccess);

                }
                else {
                    if (data.next_hand) {
                        cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ErrorToast45"), cv.StringTools.numToFloatString(data.buyin_amount)), cv.Enum.ToastType.ToastTypeSuccess);

                    }
                }
            }
        }

        let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid)
        if (player != null) {
            if (data.is_auto) {
                if (data.next_hand) {
                    cv.MessageCenter.send("on_update_self_buyin_stake");
                }
                else {
                    let curGameId = cv.roomManager.getCurrentGameID();
                    let game_mode: number = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;
                    let auto_withdraw: boolean = cv.GameDataManager.tRoomData.pkRoomParam.auto_withdraw;
                    if (curGameId === cv.Enum.GameId.StarSeat
                        || cv.Enum.GameId.Plo
                        || curGameId === cv.Enum.GameId.Bet
                        || (curGameId === cv.Enum.GameId.Texas && game_mode === cv.Enum.CreateGameMode.CreateGame_Mode_Short && auto_withdraw)) {
                        cv.MessageCenter.send("on_auto_buyin_eff");
                    }
                }
            }
        }
    }


    //国王表情按钮
    public onbtnFaceClick(event) {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.isGameStarSeat()) {
            this.face_Panel.getComponent(FaceBarrage).showUi();
        } else {
            this.face_Panel.getComponent(FaceView).showUi();
        }
        //this.face_Panel.getComponent(FaceView).setDanmuChanel([600,500,400]);
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {    //AOF
        //     this.gameMain_panel.getComponent(AofGameMain).onbtnFaceClick(event);
        // } else {
        //     //德州 & 急速 
        //     this.gameMain_panel.getComponent(GameMain).onbtnFaceClick(event);
        // }
    }

    public isGameStarSeat(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat;
    }

    public OnOwnerApplyBuyin2() {
        //
    }

    public OnBuyinNow(num: number) {
        for (let i = 0; i < GameDataManager.tRoomData.kTablePlayerList.length; ++i) {
            let pkPlayer: PlayerInfo = GameDataManager.tRoomData.kTablePlayerList[i];
            if ((pkPlayer.name == cv.dataHandler.getUserData().nick_name) && pkPlayer.playerid != cv.dataHandler.getUserData().u32Uid) {
                cv.TT.showMsg(cv.config.getStringData("SitDownErrorToast1"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        }
        let clubId = GameDataManager.tRoomData.pkRoomParam.club_id;
        cv.gameNet.RequestBuyin(GameDataManager.tRoomData.u32RoomId, num);//
    }

    public sendNetJackPot() {
        cv.worldNet.RequestCurrentRoomJackpot(cv.GameDataManager.tRoomData.pkRoomParam.club_id, GameDataManager.tRoomData.u32RoomId, cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum);
        cv.worldNet.RequestGetJackpotData(cv.GameDataManager.tRoomData.pkRoomParam.club_id, GameDataManager.tRoomData.u32RoomId);
        cv.worldNet.RequestJackpotAwardRecord(cv.GameDataManager.tRoomData.pkRoomParam.club_id, GameDataManager.tRoomData.u32RoomId, cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum);

    }
    public showJackPort() {
        cv.AudioMgr.playButtonSound('tab');
        this.sendNetJackPot()
        this.jackPot_Panel.active = true;
        cv.MessageCenter.send("hide_bombInfoTips");
    }

    public AdaptiveExpand() {
        if (cv.config.IS_FULLSCREEN) {
            let offset = (cv.config.HEIGHT - cv.config.FULLSCREEN_OFFSETY) / cv.config.HEIGHT;
            let goldPos = cc.find("gold_Panel", this.menu_Panel).position;
            let menu_img0 = cc.find("menu_img0", this.menu_Panel);
            let jackPotPanel = cc.find("jackPotPanel", this.node);
            let sliderBg = cc.find("gameMain_panel/sliderBg", this.node);
            let freeSlider = sliderBg.getChildByName("freeSlider");
            console.log("===>goldPos.position" + goldPos);
            cc.find("gold_Panel", this.menu_Panel).setPosition(goldPos.x, goldPos.y - cv.config.FULLSCREEN_OFFSETY);
            menu_img0.setPosition(menu_img0.position.x, menu_img0.position.y - cv.config.FULLSCREEN_OFFSETY);
            jackPotPanel.setPosition(jackPotPanel.position.x, jackPotPanel.position.y - cv.config.FULLSCREEN_OFFSETY - (this.isGameStarSeat() ? 0 : 30));
            let sliderSize = sliderBg.getContentSize();
            let newSize = cc.size(sliderSize.width / cv.config.DESIGN_HEIGHT * cv.config.HEIGHT, sliderSize.height);
            sliderBg.setContentSize(newSize);
            let len = sliderBg.childrenCount;
            let list = sliderBg.children;
            for (let i = 0; i < len; i++) {
                list[i].setPosition(list[i].position.x / sliderSize.width * newSize.width, list[i].position.y);
            }

            let freeSliderSize = freeSlider.getContentSize();
            freeSlider.setContentSize(cc.size(freeSliderSize.width / sliderSize.width * newSize.width, freeSliderSize.height));

            console.log("===>goldPos.position" + cc.find("gold_Panel", this.menu_Panel).position);
        }
    }

    setAvatar() {
        let roleInfoSet = cc.director.getScene().getChildByName("roleInfoSet").getComponent(RoleInfoSet);
        roleInfoSet.node.active = true;
        roleInfoSet.updateView();
        roleInfoSet.openPhoto();
    }
}
