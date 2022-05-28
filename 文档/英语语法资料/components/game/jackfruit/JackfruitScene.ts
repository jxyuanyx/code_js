import cv from "../../lobby/cv";
import { JackfruitMain } from "./JackfruitMain";
import { JackfruitMenu } from "./JackfruitMenu";
import { JackfruitReview } from "./JackfruitReview";
import { PushNoticeType } from "../../../common/prefab/PushNotice";
import JackfruitManager from "./JackfruitManager"
import FaceView from "../dzPoker/danmu/FaceView";
import { SliderVerify } from "../../lobby/sliderVerify/SliderVerify";
import JackfruitSeat from "./JackfruitSeat";

const { ccclass, property } = cc._decorator;
@ccclass
export class JackfruitScene extends cc.Component {
    @property(cc.Node) jackpot_number_panel: cc.Node = null;

    @property(cc.Prefab) jackPot_prefab: cc.Prefab = null;
    jackpot_Panel: cc.Node = null;

    @property(cc.Prefab) face_Panel_prefab: cc.Prefab = null;
    face_Panel: cc.Node = null;

    @property(cc.Prefab) menu_Panel_prefab: cc.Prefab = null;
    menu_Panel: cc.Node = null;

    //友好度升级动画
    @property(cc.Prefab) frienddegree_ziji_prefab: cc.Prefab = null;
    frienddegree_ziji: cc.Node = null;

    @property(cc.Prefab) frienddegree_duifang_prefab: cc.Prefab = null;
    frienddegree_duifang: cc.Node = null;

    @property(cc.Node) gameMain_panel: cc.Node = null;

    @property(cc.Prefab) jackfruit_gamerule: cc.Prefab = null;
    gamerule_Panel: cc.Node = null;

    @property(cc.Prefab) jackfruit_setting: cc.Prefab = null;
    setting_Panel: cc.Node = null;

    @property(cc.Prefab) jackfruit_card_score: cc.Prefab = null;
    card_score_Panel: cc.Node = null;

    @property(cc.Prefab) currentTime_prefab: cc.Prefab = null;
    currentTime_panel: cc.Node = null;

    @property(cc.Prefab) review_prefab: cc.Prefab = null;
    review_panel: cc.Node = null;

    @property(cc.Prefab) jackfruit_tips_prefab: cc.Prefab = null;
    jackfruit_tips_panel: cc.Node = null;

    @property(cc.Prefab) sliderVerify_prefab: cc.Prefab = null;
    sliderVerify_panel: SliderVerify = null;

    @property(cc.Node) voice_panel: cc.Node = null;
    @property(cc.Sprite) recordComplete_img: cc.Sprite = null;
    @property(cc.Sprite) recording_img: cc.Sprite = null;
    @property(cc.Label) recordTxt: cc.Label = null;
    @property(cc.Label) recordTimeTxt: cc.Label = null;
    
    _time:number = 0;
    _tipsTime:number = 0;    constructor() {
        super();
    }
    onLoad() {
        cv.config.setCurrentScene(cv.Enum.SCENE.JACKFRUIT_SCENE);
        cv.config.adaptScreen(this.node);
        cv.resMgr.adaptWidget(this.node, true);
        this.menu_Panel = cc.instantiate(this.menu_Panel_prefab);
        this.node.addChild(this.menu_Panel);
        this.menu_Panel.active = false;
        this.frienddegree_ziji = cc.instantiate(this.frienddegree_ziji_prefab);
        this.node.addChild(this.frienddegree_ziji);
        this.frienddegree_ziji.active = false;
        this.frienddegree_duifang = cc.instantiate(this.frienddegree_duifang_prefab);
        this.node.addChild(this.frienddegree_duifang);
        this.frienddegree_duifang.active = false;
        this.setting_Panel = cc.instantiate(this.jackfruit_setting);
        this.node.addChild(this.setting_Panel);
        this.setting_Panel.active = false;
        this.jackpot_Panel = cc.instantiate(this.jackPot_prefab);
        this.node.addChild(this.jackpot_Panel);
        this.jackpot_Panel.active = false;
        this.face_Panel = cc.instantiate(this.face_Panel_prefab);
        this.node.addChild(this.face_Panel, cv.Enum.ZORDER_TYPE.ZORDER_7);
        this.face_Panel.getComponent(FaceView).setParentNode(cc.find("chat_panel", this.gameMain_panel));
        if (cv.config.IS_FULLSCREEN) {
            //大屏5轨8条
            this.face_Panel.getComponent(FaceView).setDanmuChanel([649, 449, -50, -258, -456]);
            this.face_Panel.getComponent(FaceView).adjustDanmuMaxNumber(8);
        } else {
            //小屏3轨5条
            this.face_Panel.getComponent(FaceView).setDanmuChanel([419, 273, -165]);
            this.face_Panel.getComponent(FaceView).adjustDanmuMaxNumber(5);
        }
        this.face_Panel.getComponent(FaceView).setGameScene(this);
        this.gamerule_Panel = cv.action.addChildToScene(this, this.jackfruit_gamerule, [], cv.Enum.ZORDER_TYPE.ZORDER_TOP, true);
        this.gamerule_Panel.active = false;
        this.card_score_Panel = cv.action.addChildToScene(this, this.jackfruit_card_score, [], cv.Enum.ZORDER_TYPE.ZORDER_TOP, true);
        this.card_score_Panel.active = false;
        this.currentTime_panel = cv.action.addChildToScene(this, this.currentTime_prefab, [], cv.Enum.ZORDER_TYPE.ZORDER_6, true);
        this.currentTime_panel.active = false;
        this.sliderVerify_panel = SliderVerify.initSingleInst(this.sliderVerify_prefab, this.node, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        // this.review_panel = cv.action.addChildToScene(this, this.review_prefab, [], cv.Enum.ZORDER_TYPE.ZORDER_TOP, true);
        // this.review_panel.active = false;
        this.review_panel = JackfruitReview.getSinglePrefabInst(this.review_prefab);
        this.jackpot_number_panel.active = false;
        this.jackfruit_tips_panel = cc.instantiate(this.jackfruit_tips_prefab);
        this.jackfruit_tips_panel.active = false;
        this.node.addChild(this.jackfruit_tips_panel, cv.Enum.ZORDER_TYPE.ZORDER_LOG);
        this.AdaptiveExpand();
        this.menu_Panel.getComponent(JackfruitMenu).setGameScene(this);
        this.gameMain_panel.getComponent(JackfruitMain).setGameScene(this);

        cv.MessageCenter.register("on_intimacy", this.onIntimacy.bind(this), this.node);
    }


    public start() {
        if (cv.GameDataManager.bIsAuthMicphone == false) {
            cv.native.AuthMicphone();
            cv.GameDataManager.bIsAuthMicphone = true;
        }
        // 设置跑马灯类型
        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_JACKFRUIT);
        this.initLanguage();
        this._time = (new Date()).getTime();
        this._tipsTime = 0;
    }
    public onDestroy() {
        cv.gameNet.stopVoice();
        cv.GameDataManager.tRoomData.resetVoice();
        this._time = 0;
        this._tipsTime = 0;
        cv.MessageCenter.unregister("on_intimacy", this.node);
    }

    public update() {
        if (this._time == 0) return;
        let time = (new Date()).getTime();
        let num = cv.StringTools.minus(time, this._time) / 3600000;
        let integer = Math.floor(num);
        if (integer > this._tipsTime) {
            this._tipsTime = integer;
            let str = ""
            if (integer > 5) {
                str = cv.config.getStringData("jackfruit_tips_protect_eyes_label_1");
            } else {
                str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_tips_protect_eyes_label_0"), integer);
            }
            let label = cc.find("bg/label", this.jackfruit_tips_panel).getComponent(cc.Label);
            label.string = str;
            this.showTips();
        }
    }

    public showTips() {
        this.jackfruit_tips_panel.active = true;
        this.jackfruit_tips_panel.scale = 0;
        this.jackfruit_tips_panel.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(3), cc.scaleTo(0.2, 0)))
    }

    public initLanguage() {
        cv.StringTools.setLabelString(this.gameMain_panel, "game_end_panel/back_btn/back_label", "jackfruit_back_btn_label");
        this.recordTxt.string = cv.config.getStringData("GameScene_voice_panel_cdTime_recording_img_record_txt");
        this.recordTimeTxt.string = cv.config.getStringData("GameScene_voice_panel_cdTime_recording_img_recordTime_txt");
    }

    public AdaptiveExpand() {
        if (cv.config.IS_FULLSCREEN) {
            let offset = (cv.config.HEIGHT - cv.config.FULLSCREEN_OFFSETY) / cv.config.HEIGHT;
            this.jackpot_number_panel.setPosition(this.jackpot_number_panel.position.x, this.jackpot_number_panel.position.y - cv.config.FULLSCREEN_OFFSETY);
            let goldPos = cc.find("gold_Panel", this.menu_Panel).position;
            let menu_img0 = cc.find("menu_img0", this.menu_Panel);
            cc.find("gold_Panel", this.menu_Panel).setPosition(goldPos.x, goldPos.y - cv.config.FULLSCREEN_OFFSETY);
            menu_img0.setPosition(menu_img0.position.x, menu_img0.position.y - cv.config.FULLSCREEN_OFFSETY);
        }
    }

    public sendNetJackPot() {
        cv.jackfruitNet.requestJackpotData(JackfruitManager.tRoomData.param.ante);
        cv.jackfruitNet.requestJackpotAwardList(JackfruitManager.tRoomData.param.ante);
    }

    public showJackPort() {
        cv.AudioMgr.playButtonSound('tab');
        this.sendNetJackPot();
        this.jackpot_Panel.active = true;
    }

    public onIntimacy(data) {
        if (data.way == 1) {
            let otherSeat: JackfruitSeat = this.gameMain_panel.getComponent(JackfruitMain).getSeatByPlayerID(data.playerid);
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
    
            let selfSeat: JackfruitSeat = this.gameMain_panel.getComponent(JackfruitMain).getSeatByPlayerID(cv.dataHandler.getUserData().u32Uid);
            if (selfSeat != null) {
    
                let curGameId = cv.roomManager.getCurrentGameID();
                let worldPos: cc.Vec3 = cc.Vec3.ZERO;
                if (curGameId == cv.Enum.GameId.StarSeat) {
                    worldPos = selfSeat.node.getParent().convertToWorldSpaceAR(new cc.Vec2(selfSeat.node.getPosition().x, selfSeat.node.getPosition().y + 250));
                }
                else
                {
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
}
