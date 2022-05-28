import { CircleSprite } from "../../../common/tools/CircleSprite";
import cv from "../../lobby/cv";
import Tag from "../../../common/tools/Tag";
import { Seat } from "./Seat";

const { ccclass, property } = cc._decorator;
@ccclass
export class SeatStar extends Seat {
    @property(cc.Node) public headEffect: cc.Node = null;
    // @property(cc.Node) public headBlock: cc.Node = null;
    @property(cc.Node) public starVideo: cc.Node = null;
    @property(cc.Node) public videoNode: cc.Node = null;
    @property(cc.Node) giftIcon: cc.Node = null; // 座位上的礼物图标入口

    // 红包动画
    @property(cc.Prefab) videoRedpacketActionPrefab: cc.Prefab = null;
    private _videoredpacketActionNode: cc.Node = null;

    protected videoNodeScale: number = 1;
    protected videoStatusNode: cc.Node = null;
    protected videoProgress: cc.Node = null;
    protected videoProgressBar: cc.ProgressBar = null;
    protected videoProgressText: cc.Label = null;
    protected videoRedImg: cc.Node = null;
    protected videoAllinEffect: cc.Node = null;
    protected userWinEffect: cc.Node = null;
    protected starWinEffect: cc.Node = null;
    protected seatButton: cc.Node = null;
    protected viewStyle: number = 1;
    protected seatCount: number = 0;
    //各个部件原始位置点
    protected voicePos: cc.Vec2 = null;
    protected voiceScal: number = 0;
    protected namePos: cc.Vec2 = null;
    protected nameBgPos: cc.Vec2 = null;
    protected selfChipsPos: cc.Vec2 = null;
    protected choumaPos: cc.Vec2 = null;
    protected tipsPos: cc.Vec2 = null;
    protected gpsPos: cc.Vec2 = null;
    protected headBlockPos: cc.Vec2 = null;
    protected buyinPos: cc.Vec2 = null;
    protected starVideoPos: cc.Vec2 = null;
    protected statusTextSize: number = 0;

    protected leftX: number = 0;
    protected rightX: number = 0;
    protected bottomY: number = 0;
    protected topY: number = 0;
    protected leftbottomPos: cc.Vec2 = cc.Vec2.ZERO;
    protected leftTopPos: cc.Vec2 = cc.Vec2.ZERO;
    protected rightbottomPos: cc.Vec2 = cc.Vec2.ZERO;
    protected rightTopPos: cc.Vec2 = cc.Vec2.ZERO;
    protected topCenterPos: cc.Vec2 = cc.Vec2.ZERO;
    protected bottomCenterPos: cc.Vec2 = cc.Vec2.ZERO;

    protected number_offsetY: number = 0;
    //一开始的起始点
    protected number_showY: number = 0;

    onLoad() {
        for (let i: number = 0; i < 3; i++) {
            let img: cc.Node = cc.find("voice_img_icon/voice_" + i, this.voice_img.node);
            this.voiceImgList.push(img);
        }

        this.winRatePos = this.winRateNode.getPosition();

        this.tips.node.active = false;
        this.chouma.node.active = false;
        this.number_text.active = false;
        this.winRateNode.active = false;

        this.countDown_text.node.color = cc.color(255, 255, 255);
        this.m_countDownTxt_srcFontSize = this.countDown_text.fontSize;
        this.countDown_text.enableBold = true;
        this.giftIcon.active = false;

        this.initRedPacketAction();
        this._videoredpacketActionNode = cc.instantiate(this.videoRedpacketActionPrefab);
        this.node.addChild(this._videoredpacketActionNode);
        this._videoredpacketActionNode.active = false;
        // 实例化牌组对象
        this.instCardsInfo();

        // 筹码        
        this.m_pkChipsMove = cc.instantiate(this.ChipsMoveprefab).getComponent('GameChipsMove');
        this.node.addChild(this.m_pkChipsMove.node);
        this.m_pkChipsMove.setSeat(this);

        this.viewStyle = 1;
        this.videoStatusNode = cc.find("video_status_node", this.starVideo);
        this.videoProgress = cc.find("video_progress_bar", this.starVideo);
        this.videoProgressBar = this.videoProgress.getComponent(cc.ProgressBar);
        this.videoProgressText = cc.find("text", this.videoProgress).getComponent(cc.Label);
        this.videoRedImg = cc.find("video_red_img", this.starVideo);
        this.videoAllinEffect = cc.find("star_allin_anim", this.starVideo);
        this.userWinEffect = cc.find("user_win_anim", this.node);
        this.starWinEffect = cc.find("star_win_anim", this.node);
        this.seatButton = cc.find("button", this.node);
        this.statusTextSize = this.status_text.fontSize;
        this.namePos = this.name_panel.getPosition();
        this.nameBgPos = cc.find("star_name_bg", this.name_panel).getPosition();
        this.selfChipsPos = this.selfChipsText_img.getPosition();
        this.choumaPos = this.chouma.node.getPosition();
        this.tipsPos = this.tips.node.getPosition();
        this.gpsPos = this.gps_img.node.getPosition();
        this.headBlockPos = this.headBlock.getPosition();
        this.buyinPos = this.buyin_sprite.node.getPosition();
        this.starVideoPos = this.starVideo.getPosition();
        this.voicePos = this.voice_img.node.getPosition();
        this.voiceScal = this.voice_img.node.scale;

        this.number_offsetY = this.name_panel.getPosition().y + 9;
        // this.m_pkTempHead = CircleSprite;     // 头像
        cc.find("headBorder", this.head_panel).zIndex = cv.Enum.ZORDER_TYPE.ZORDER_2; //拉高金色框层级
        this.actionType = cv.Enum.ActionType.Enum_Action_Null;
        this.setSeatEmpty();
        cv.MessageCenter.register("on_update_self_stake", this.OnUpdateSelfStake.bind(this), this.node);
        //cv.MessageCenter.register("update_remarks", this.OnUpdateSelfStake.bind(this),this.node);
        cv.MessageCenter.register("update_remarks", this.OnUpdate_remarks.bind(this), this.node);

        cv.MessageCenter.register("closeStarSeat", this.onCloseStarSeat.bind(this), this.node);
        cv.MessageCenter.register("freeInviterSeat", this.onFreeInviterSeat.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("on_update_self_stake", this.node);
        //cv.MessageCenter.unregister("update_remarks", this.node);
        cv.MessageCenter.unregister("update_remarks", this.node);

        cv.MessageCenter.unregister("closeStarSeat", this.node);
        cv.MessageCenter.unregister("freeInviterSeat", this.node);
    }

    //根据方位设置坐位视图
    public setSeatViewId(viewId: number, playerLength: number, SeatType: number = 0) {
        if (playerLength == 0) {
            return;
        }

        this.SeatViewId = viewId;
        let isDoubel: boolean = (playerLength % 2 == 0);//人数就单数还是双数
        let midId: number = Math.floor(playerLength / 2);//中间椅子号
        this.seatCount = playerLength;
        this.seatType = SeatType;
        if (this.SeatViewId == 0) {
            this.direction = cv.Enum.SeatDriction.DRICTION_BOTTOM;
        }
        else if (isDoubel) {
            if (playerLength <= 4) {
                if (this.SeatViewId < midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_LEFT;
                }
                else {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
            }
            else {
                if (this.SeatViewId == midId - 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_LEFT;
                }
                else if (this.SeatViewId == (midId + 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
                else if (this.SeatViewId < midId - 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN;
                }
                else if (this.SeatViewId > (midId + 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN;
                }
            }
        }
        else {
            if (playerLength <= 5) {
                if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == midId + 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
                else if (this.SeatViewId < midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN;
                }
                else if (this.SeatViewId > (midId + 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN;
                }
            }
            else {
                if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_LEFT;
                }
                else if (this.SeatViewId == midId + 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_RIGHT;
                }
                else if (this.SeatViewId == midId - 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == (midId + 2)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
                else if (this.SeatViewId < (midId - 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN;
                }
                else if (this.SeatViewId > (midId + 2)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN;
                }
            }

        }
        this.updateView();
    }

    public updateView() {
        if (this.viewStyle == 2) {
            this.updateViewStyle2();
        } else {
            this.updateViewStyle1();
        }
    }

    protected updateViewStyle1() {
        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            this.m_pkShowCards[i].node.scale = 1;
        }
        this.selfChipsText_img.setPosition(this.selfChipsPos);
        if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {

                this.chouma.node.setPosition(this.choumaPos.x, 35);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));

                this.tips.node.setPosition(cc.v2(-this.tipsPos.x, this.tipsPos.y));
                this.tips.node.setScale(-1, 1);
                this.tips_text.node.setScale(-1, 1);
            }
            else {
                this.setReplayChisPos();

                this.tips.node.setPosition(cc.v2(this.tipsPos.x, this.tipsPos.y));
                this.tips.node.setScale(1, 1);
                this.tips_text.node.setScale(1, 1);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = 1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);

            this.winRateNode.setPosition(this.role_img.node.x, this.role_img.node.y + this.red_img.node.getContentSize().height / 2 + this.roleName_text.node.getContentSize().height);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = -angle;
                this.m_pkCards[i].setDealRotate(-angle);
            }
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.chouma.node.setPosition(this.choumaPos);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }
            this.tips.node.setPosition(cc.v2(this.tipsPos.x, this.tipsPos.y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = -angle;
                this.m_pkCards[i].setDealRotate(-angle);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = 1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);

            this.winRateNode.setPosition(this.winRatePos.x, this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.chouma.node.setPosition(this.choumaPos);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }
            this.tips.node.setPosition(cc.v2(this.tipsPos.x, this.tipsPos.y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = -angle;
                this.m_pkCards[i].setDealRotate(-angle);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = 1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(this.winRatePos.x, this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.chouma.node.setPosition(-this.choumaPos.x, this.choumaPos.y);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(-this.tipsPos.x, this.tipsPos.y));
            this.tips.node.setScale(-1, 1);
            this.tips_text.node.setScale(-1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = -1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(-this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(-this.winRatePos.x, this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.chouma.node.setPosition(-this.choumaPos.x, this.choumaPos.y);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }
            this.tips.node.setPosition(cc.v2(-this.tipsPos.x, this.tipsPos.y));
            this.tips.node.setScale(-1, 1);
            this.tips_text.node.setScale(-1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = -1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(-this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(-this.winRatePos.x, this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT) {

            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.chouma.node.setPosition(this.choumaPos);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }
            this.tips.node.setPosition(cc.v2(this.tipsPos.x, this.tipsPos.y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = -angle;
                this.m_pkCards[i].setDealRotate(-angle);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = 1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);

            this.winRateNode.setPosition(this.selfChipsText_img.x, this.selfChipsText_img.y - this.selfChipsText_img.getContentSize().height - 10);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {

            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.chouma.node.setPosition(this.choumaPos);
                this.chouma_text.node.setPosition(cc.v2(0, -44));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(-this.tipsPos.x, this.tipsPos.y));
            this.tips.node.setScale(-1, 1);
            this.tips_text.node.setScale(-1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            this.voice_img.node.setPosition(this.voicePos);
            this.voice_img.node.scaleX = -1 * this.voiceScal;
            this.voice_img.node.scaleY = 1 * this.voiceScal;
            this.gps_img.node.setPosition(cc.v2(-this.GPS_POSX, this.gpsPos.y));
            this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(-this.winRatePos.x, this.winRatePos.y);
        }

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.scale = 0.33; // 0.54
        }

        this.status_text.fontSize = this.statusTextSize;
        this.status_text.enableBold = false;
        this.countDown_text.fontSize = this.m_countDownTxt_srcFontSize;

        this.name_panel.setPosition(this.namePos);
        let name_bg = cc.find("star_name_bg", this.name_panel);
        if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
            name_bg.scaleX = -1;
            name_bg.setPosition(-this.nameBgPos.x, this.nameBgPos.y);
        } else {
            name_bg.scaleX = 1;
            name_bg.setPosition(this.nameBgPos.x, this.nameBgPos.y);
        }
        this.chouma_text.node.anchorX = 0.5;
        cc.find("voice_back", this.voice_img.node).active = true;
        cc.find("back_img", this.role_img.node).active = true;

        this.correctViewStylePosition(0, 0);
        this.number_text.x = 0;
        this.number_text.y = this.number_text.y - this.number_showY;
        this.seatButton.setContentSize(this.role_img.node.getContentSize());
        this.red_img.node.setScale(0.723);
        this.red_img.node.setPosition(0, 0);

        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            let pos: cc.Vec2 = this.m_pkShowCards_srcPos[i];
            this.m_pkShowCards[i].node.setPosition(pos.x, pos.y);
        }

        this.m_kInitPos = this.node.getPosition();
        let Layer: cc.Node = this.mainPool;
        let tmpPos: cc.Vec2 = cc.Vec2.ZERO;

        this.m_pkChipsMove.node.setPosition(cc.v2(this.chouma.node.getPosition().x - this.chouma.node.getContentSize().width / 2 + this.chouma_img.node.getPosition().x, this.chouma.node.getPosition().y));

        this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, tmpPos);
        this.m_pkChipsMove.SetFadeInPos(tmpPos);

        Layer.convertToWorldSpaceAR(cc.Vec2.ZERO, tmpPos);

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].setDealPos(tmpPos);
        }

        // 圆头像红包坐标统一
        this.updataRedPacketActionPos();
    }

    protected updateViewStyle2() {

        if (this._addtime_action) {
            this._addtime_action.getComponent(cc.Animation).stop();
            this._addtime_action.getComponent(cc.Animation).off("finished");
            this._addtime_action.removeFromParent(true);
            this._addtime_action.destroy();
            this._addtime_action = null;
        }

        let tempPos: cc.Vec2 = cc.Vec2.ZERO;
        let tempPosDest: cc.Vec2 = cc.Vec2.ZERO;

        for (let i = 0; i < this.getHandsCardsCount(); ++i) {
            this.m_pkCards[i].node.scale = 0.48;
            this.m_pkShowCards[i].node.scale = 0.64;
        }
        this.voice_img.node.setScale(0.7);
        this.red_img.node.setScale(0.447);
        this.seatButton.setContentSize(this.starVideo.getContentSize());

        cc.find("voice_back", this.voice_img.node).active = false;
        cc.find("back_img", this.role_img.node).active = false;
        //this.chouma_text.node.anchorX = 0;
        let halfWidth = this.m_pkCards[0].node.getContentSize().width / 2 * 0.48;
        let halfWidth2 = this.m_pkCards[0].node.getContentSize().width / 2 * 0.64;
        let number_y: number = 0;

        let roleNameWidth: number = this.roleName_text_forRemark.node.width;
        let roleNameX: number = this.roleName_text_forRemark.node.x;
        let roleNameAX: number = this.roleName_text_forRemark.node.anchorX;

        if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {

            this.gameMains.face_button.convertToWorldSpaceAR(cc.v2(0, 177), tempPos);
            this.starVideo.parent.convertToNodeSpaceAR(tempPos, tempPosDest);
            this.correctViewStylePosition(0, tempPosDest.y);

            this.videoRedImg.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);
            this.red_img.node.parent.convertToNodeSpaceAR(tempPos, tempPosDest);
            this.red_img.node.setPosition(tempPosDest);

            this.setVideoBlockPositionParam();
            this.chouma.node.parent.convertToNodeSpaceAR(this.topCenterPos, tempPos);
            this.chouma.node.setPosition(tempPos.x, tempPos.y + 126); //tempPos.x + this.chouma_img.node.getContentSize().width / 2, tempPos.y + 27
            this.chouma_text.node.anchorX = 0.5;
            this.chouma_text.node.setPosition(cc.v2(0, -44)); //cc.v2(34, 0)
            this.chouma_img.node.setPosition(cc.v2(0, 0));


            this.name_panel.parent.convertToNodeSpaceAR(this.topCenterPos, tempPos);
            this.name_panel.setPosition(tempPos.x, tempPos.y + 27);
            let name_bg = cc.find("star_name_bg", this.name_panel);
            name_bg.scaleX = -1;
            name_bg.setPosition(roleNameX + roleNameWidth * (1 - roleNameAX) + 20 - name_bg.width * (1 - name_bg.anchorX), this.nameBgPos.y);
            // name_bg.setPosition(-this.nameBgPos.x, this.nameBgPos.y);

            this.winRateNode.parent.convertToNodeSpaceAR(this.topCenterPos, tempPos);
            this.winRateNode.setPosition(tempPos.x, tempPos.y + 95);

            this.tips.node.parent.convertToNodeSpaceAR(this.leftTopPos, tempPos);
            let tipsSize = this.tips.node.getContentSize();
            this.tips.node.setScale(-1, 1);
            this.tips.node.setPosition(tempPos.x + tipsSize.width * (1 - this.tips.node.anchorX) + 12, tempPos.y - tipsSize.height * (1 - this.tips.node.anchorY) - 12);
            this.tips_text.node.setScale(-1, 1);

            this.selfChipsText_img.parent.convertToNodeSpaceAR(this.bottomCenterPos, tempPos);
            this.selfChipsText_img.setPosition(tempPos.x, tempPos.y - 50);

            this.gps_img.node.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.gps_img.node.setPosition(tempPos.x + 40, tempPos.y + 40);
            this.headBlock.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.headBlock.setPosition(tempPos.x + 40, tempPos.y + 40);
            this.voice_img.node.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.voice_img.node.setPosition(tempPos.x + 40, tempPos.y + 40);

            this.m_pkCards[0].node.parent.convertToNodeSpaceAR(this.rightTopPos, tempPos);
            this.m_pkCards[0].node.setPosition(tempPos.x - halfWidth + 6, tempPos.y);
            this.m_pkCards[0].rootNode.angle = -this.m_pkCards_srcAngle[0]
            this.m_pkCards[0].setDealRotate(-this.m_pkCards_srcAngle[0]);
            this.m_pkCards[1].node.setPosition(tempPos.x - halfWidth - 18 * 0.75, tempPos.y + 4);
            this.m_pkCards[1].rootNode.angle = -this.m_pkCards_srcAngle[1]
            this.m_pkCards[1].setDealRotate(-this.m_pkCards_srcAngle[1]);

            this.m_pkShowCards[0].node.setPosition(tempPos.x - halfWidth2 + 6, tempPos.y);
            this.m_pkShowCards[1].node.setPosition(tempPos.x - halfWidth2 * 3 + 6, tempPos.y);
            this.number_text.x = 0;
            number_y = this.name_panel.getPosition().y + 9 - this.number_offsetY;
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
            this.correctViewStylePosition(0, -50);


            this.videoRedImg.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);
            this.red_img.node.parent.convertToNodeSpaceAR(tempPos, tempPosDest);
            this.red_img.node.setPosition(tempPosDest);

            this.setVideoBlockPositionParam();
            this.chouma.node.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.chouma.node.setPosition(tempPos.x + this.chouma_img.node.getContentSize().width / 2, tempPos.y - 27);
            this.chouma_text.node.anchorX = 0;
            this.chouma_text.node.setPosition(cc.v2(34, 0));
            this.chouma_img.node.setPosition(cc.v2(0, 0));

            this.name_panel.parent.convertToNodeSpaceAR(this.bottomCenterPos, tempPos);
            this.name_panel.setPosition(tempPos.x, tempPos.y - 27);
            let name_bg = cc.find("star_name_bg", this.name_panel);
            name_bg.scaleX = 1;
            name_bg.setPosition(roleNameX - roleNameWidth * roleNameAX - 20 + name_bg.width * name_bg.anchorX, this.nameBgPos.y);
            // name_bg.setPosition(this.nameBgPos.x, this.nameBgPos.y);

            this.winRateNode.parent.convertToNodeSpaceAR(this.rightTopPos, tempPos);
            this.winRateNode.setPosition(tempPos.x - this.winRateNode.width * (1 - this.winRateNode.anchorX), tempPos.y + 35);

            this.tips.node.parent.convertToNodeSpaceAR(this.rightTopPos, tempPos);
            let tipsSize = this.tips.node.getContentSize();
            this.tips.node.setScale(1, 1);
            this.tips.node.setPosition(tempPos.x - tipsSize.width * (1 - this.tips.node.anchorX) - 12, tempPos.y - tipsSize.height * (1 - this.tips.node.anchorY) - 12);
            this.tips_text.node.setScale(1, 1);

            this.selfChipsText_img.parent.convertToNodeSpaceAR(this.topCenterPos, tempPos);
            this.selfChipsText_img.setPosition(tempPos.x, tempPos.y + 35);

            this.gps_img.node.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.gps_img.node.setPosition(tempPos.x + 40, tempPos.y + 40);
            this.headBlock.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.headBlock.setPosition(tempPos.x + 40, tempPos.y + 40);
            this.voice_img.node.parent.convertToNodeSpaceAR(this.leftbottomPos, tempPos);
            this.voice_img.node.setPosition(tempPos.x + 40, tempPos.y + 40);

            this.m_pkCards[0].node.parent.convertToNodeSpaceAR(this.rightbottomPos, tempPos);
            this.m_pkCards[0].node.setPosition(tempPos.x - halfWidth + 6, tempPos.y);
            this.m_pkCards[0].rootNode.angle = -this.m_pkCards_srcAngle[0];
            this.m_pkCards[0].setDealRotate(-this.m_pkCards_srcAngle[0]);
            this.m_pkCards[1].node.setPosition(tempPos.x - halfWidth - 18 * 0.75, tempPos.y + 4);
            this.m_pkCards[1].rootNode.angle = -this.m_pkCards_srcAngle[1];
            this.m_pkCards[1].setDealRotate(-this.m_pkCards_srcAngle[1]);

            this.m_pkShowCards[0].node.setPosition(tempPos.x - halfWidth2 + 6, tempPos.y);
            this.m_pkShowCards[1].node.setPosition(tempPos.x - halfWidth2 * 3 + 6, tempPos.y);
            let posx = this.starVideo.width / 2 - this.number_text.width / 2 - 15;
            this.number_text.x = posx;
            number_y = this.selfChipsText_img.y - this.number_offsetY;
        }

        this.status_text.enableBold = true;

        this.number_text.y = this.number_text.y - this.number_showY + number_y;
        this.m_kInitPos = this.node.getPosition();
        let Layer: cc.Node = this.mainPool;
        let tmpPos: cc.Vec2 = cc.Vec2.ZERO;

        this.m_pkChipsMove.node.setPosition(cc.v2(this.chouma.node.getPosition().x - this.chouma.node.getContentSize().width / 2 + this.chouma_img.node.getPosition().x, this.chouma.node.getPosition().y));

        this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, tmpPos)
        this.m_pkChipsMove.SetFadeInPos(tmpPos);

        Layer.convertToWorldSpaceAR(cc.Vec2.ZERO, tmpPos)

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].setDealPos(tmpPos);
        }

        // 方头像红包动画坐标更新
        this._videoredpacketActionNode.setPosition(this.starVideo.getPosition());
    }

    protected correctViewStylePosition(x: number, y: number) {
        this.starVideo.setPosition(x, y);

        this.headEffect.setPosition(x, y);
        this.firePanel.node.setPosition(x, y);
        this.head_panel.setPosition(x, y);
        this.headGrag_img.node.setPosition(x, y);
        this.userWinEffect.setPosition(x, y);
        this.starWinEffect.setPosition(x, y);

        this.progressBar.node.setPosition(x, y);
        this.practicalImg.setPosition(x, y);
        cc.find("allin_node", this.node).setPosition(x, y);
        this.seatButton.setPosition(x, y);
    }
    // showHeadBorder(visible: boolean) {
    //     if (visible) {
    //         let isStarSeat = this.isStarSeat();
    //         if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
    //             let isInviterSeat = this.isInviterSeat();
    //             cc.find("back_img", this.role_img.node).active = !(isStarSeat || isInviterSeat);
    //             cc.find("star_border", this.role_img.node).active = false;
    //             cc.find("star_waitting", this.role_img.node).active = isStarSeat;
    //             cc.find("inviter_waitting", this.role_img.node).active = isInviterSeat;
    //         } else {
    //             cc.find("back_img", this.role_img.node).active = !isStarSeat;
    //             cc.find("star_border", this.role_img.node).active = isStarSeat;
    //             cc.find("star_waitting", this.role_img.node).active = false;
    //             cc.find("inviter_waitting", this.role_img.node).active = false;
    //         }
    //     } else {
    //         cc.find("back_img", this.role_img.node).active = false;
    //         cc.find("star_border", this.role_img.node).active = false;
    //         cc.find("star_waitting", this.role_img.node).active = false;
    //         cc.find("inviter_waitting", this.role_img.node).active = false;
    //     }
    // }
    public setSeatEmpty() {
        this.seat_status = cv.Enum.SeatStatus.SeatStatus_empty;
        let isStarSeat = this.isStarSeat();
        cc.find("star_waitting", this.role_img.node).active = isStarSeat;
        cc.find("star_name_bg", this.name_panel).active = false;
        let isInviterSeat = this.isInviterSeat();
        cc.find("inviter_waitting", this.role_img.node).active = isInviterSeat;
        this.headBlock.active = false;
        this.hideWin();
        this.cleanHead();
        super.setSeatEmpty();
        this.nobody_text.node.active = !(isStarSeat || isInviterSeat);
        this.doGray(true);
    }
    public showStatusText(msg: string, fontSize: number = 34) {
        this.status_text.node.active = true;
        this.status_text.string = msg;

        let tempPos: cc.Vec2 = cc.Vec2.ZERO;
        let statusPos: cc.Vec2 = cc.Vec2.ZERO;
        let timePos: cc.Vec2 = cc.Vec2.ZERO;
        if (this.viewStyle == 2) {
            this.videoStatusNode.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);
            this.videoStatusNode.active = true;
            this.status_text.node.parent.convertToNodeSpaceAR(tempPos, statusPos);
            this.countDown_text.node.parent.convertToNodeSpaceAR(tempPos, timePos);
            fontSize = 30;
            // fontSize = this.actionType == cv.Enum.ActionType.Enum_Action_Fold ? 26 : 22;
            this.countDown_text.fontSize = fontSize;
            fontSize = (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) ? 26 : fontSize; //越南文暂离文字超框,将其
        } else {
            fontSize = 42;
            this.videoStatusNode.active = false;
        }
        this.status_text.fontSize = fontSize;
        if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
            let dy: number = this.viewStyle == 2 ? 7 : 0;
            this.status_text.node.setPosition(statusPos.x + 0, statusPos.y + 25 - dy);
            this.countDown_text.node.setPosition(timePos.x + 0, timePos.y - 25 + dy);
            this.countDown_text.node.color = this.status_text.node.color;
        } else {
            this.status_text.node.setPosition(statusPos.x + 0, statusPos.y + 2);
            this.countDown_text.node.setPosition(timePos.x + 0, timePos.y + 2);
            this.countDown_text.node.color = cc.Color.WHITE;
        }
    }
    public hideStatusText() {
        this.videoStatusNode.active = false;
        super.hideStatusText();
    }
    public doGray(isGray: boolean) {
        if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
            isGray = true;
        }
        if (isGray) {
            cc.find("back_img", this.role_img.node).getComponent(cc.Sprite).setMaterial(0, this.graySprite);
            cc.find("headBorder", this.head_panel).getComponent(cc.Sprite).setMaterial(0, this.graySprite);
            // if (CircleSprite.getVideoNode(this.roleHeadNode)) {
            //     CircleSprite.getVideoNode(this.roleHeadNode).getComponent(cc.Sprite).setMaterial(0, this.graySprite);
            // }
        } else {
            cc.find("back_img", this.role_img.node).getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
            cc.find("headBorder", this.head_panel).getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
            // if (CircleSprite.getVideoNode(this.roleHeadNode)) {
            //     CircleSprite.getVideoNode(this.roleHeadNode).getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
            // }
            this.videoProgress.active = false;
        }
        super.doGray(isGray);
        if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
            this.headGrag_img.node.active = false;
        }
    }
    public thinkCdUpdate() {
        if (this.time <= 0) {
            this.time = 100;
            this.unschedule(this.thinkCdUpdate);
            this.practicalImg.active = false;
            this.countDown_text.node.active = false;
            this.progressBar.node.active = false;
            this.videoProgress.active = false;
            this.doBlink(this.blinkTime);
            //倒计时结束逻辑
            return;
        }
        this.time -= cc.director.getDeltaTime() / (1 / 60) * this.htime;
        let progress = this.time / 100;
        if (this.viewStyle == 2) {
            //
            this.progressBar.node.active = false;
            this.countDown_text.string = "";
            this.practicalImg.active = false;
            //
            this.videoProgress.active = true;
            //
            this.videoProgressBar.progress = progress;
            this.videoProgressText.string = Math.floor((Math.abs(this.time) / (this.htime * cc.game.getFrameRate()))).toString() + "s";
        } else {
            //
            this.videoProgress.active = false;
            //
            this.progressBar.node.active = true;
            this.practicalImg.active = true;
            //
            this.progressBar.progress = progress;
            this.practicalImg.angle = progress * 360;
            this.countDown_text.string = Math.floor((Math.abs(this.time) / (this.htime * cc.game.getFrameRate()))).toString() + "s";
        }
    }
    public doBlink(count: number) {
        if (this.viewStyle == 2) {
            this.videoRedImg.active = true;
        }
        super.doBlink(count);
    }
    public setSitDownView() {
        cc.find("star_waitting", this.role_img.node).active = false;
        cc.find("star_name_bg", this.name_panel).active = this.PlayerInfo.identity == 1 ? true : false;
        cc.find("inviter_waitting", this.role_img.node).active = false;

        this.headBlock.active = false;

        for (let i = 0; i < this.PlayerInfo.NotDisturbUids.length; i++) {
            if (cv.dataHandler.getUserData().u32Uid == this.PlayerInfo.NotDisturbUids[i]) {
                this.headBlock.active = true;
                break;
            }
        }

        this.videoProgress.active = false;
        this.videoRedImg.active = false;
        super.setSitDownView();
    }
    public setSeatLeaveAMonent() {
        this.videoProgress.active = false;
        super.setSeatLeaveAMonent();
    }
    public setSeatSelfOnAction() {
        this.videoProgress.active = false;
        super.setSeatSelfOnAction();
    }
    public showCd(cdTime: number) {
        this.unschedule(this.thinkCdUpdate);
        this.MaxTime = cdTime - this.blinkTime;
        if (this.MaxTime <= 0) {
            this.doBlink(Math.abs(this.MaxTime));
            return;
        }
        this.time = 100;
        this.htime = this.time / (this.MaxTime * cc.game.getFrameRate());
        if (this.viewStyle == 2) {
            this.videoProgress.active = true;
            this.videoProgressText.string = this.MaxTime.toString() + "s";
            this.countDown_text.string = "";
        } else {
            this.progressBar.node.active = true;
            this.countDown_text.node.active = true;
            this.practicalImg.rotation = 0;
            this.practicalImg.stopAllActions();
            this.practicalImg.active = true;
            // this.practicalImg.runAction(cc.rotateBy(this.MaxTime, 360));
            //思考倒计时强制位置回到中间
            this.countDown_text.node.setPosition(0, 2);
            this.countDown_text.string = this.MaxTime.toString() + "s";
        }
        this.schedule(this.thinkCdUpdate, 0);
    }
    public stopCDtime() {
        this.videoProgress.active = false;
        this.videoRedImg.active = false;
        super.stopCDtime();
    }
    public stopBlink() {
        this.videoRedImg.active = false;
        super.stopBlink();
    }
    public onlyShowChouma() {
        this.videoProgress.active = false;
        super.onlyShowChouma();
    }
    /**
     * 显示汽泡
     * @param str 
     * @param tType 
     */
    public showTips(str: string, tType: number) {
        if (tType == cv.Enum.TipsType.Tips_straddle) {
            this.tips_text.fontSize = 26;
        }
        else {
            this.tips_text.fontSize = 36;
        }

        this.tips.node.stopAllActions();
        this.tips_text.string = str;
        this.tips.node.active = true;
        this.tips.node.runAction(cc.show());

        cv.resMgr.setSpriteFrame(this.tips.node, cv.StringTools.formatC(this.bubbleTips_path + "%d", tType));
        this.tips.node.getComponent(Tag).setTag(tType);
        if (str == "Allin") {
            this.tips_text.node.color = cc.color(248, 179, 1);//YELLOW
        }
        else {
            this.tips_text.node.color = cc.color(255, 255, 255);
        }

        // let posx = tType == cv.Enum.TipsType.Tips_mendAnte ? 66 + 9 : 66;//Tips_mendStraddle
        //this.tips_text.node.setPosition(posx, this.tips_text.node.y);
        if (this.viewStyle == 2) {
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                this.tips.node.setScale(-1, 1);
                this.tips_text.node.setScale(-1, 1);
            } else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
                this.tips.node.setScale(1, 1);
                this.tips_text.node.setScale(1, 1);
            }
        } else {
            if (this.tips.node.x > 0) {
                this.tips.node.setPosition(cc.v2(this.tipsPos.x, this.tipsPos.y));
                this.tips.node.setScale(1, 1);
                this.tips_text.node.setScale(1, 1);
            } else {
                this.tips.node.setPosition(cc.v2(-this.tipsPos.x, this.tipsPos.y));
                this.tips.node.setScale(-1, 1);
                this.tips_text.node.setScale(-1, 1);
            }
        } if (tType == cv.Enum.TipsType.Tips_mendAnte) {
            this.tips.node.runAction(cc.sequence(cc.delayTime(2.5), cc.scaleTo(0.6, 0), cc.hide()));
        } else if (tType == cv.Enum.TipsType.Tips_straddle) {
            this.tips.node.runAction(cc.sequence(cc.delayTime(3), cc.scaleTo(0.6, 0), cc.hide()));
        }
    }
    public showNumber(num: string) {
        let text = cc.instantiate(this.number_text);
        this.number_action_panel.addChild(text);
        text.getComponent(cc.Label).string = num;
        text.active = true;
        text.opacity = 0;
        text.setPosition(cc.v2(0, 0));

        let posx = 0;
        let posy = 0;
        let nameActive = false;
        this.setVideoBlockPositionParam();
        if (this.viewStyle == 2 && this.gameMains.roomPlayerNumber / 2 == this.getSeatViewId()) {
            posx = this.starVideo.width / 2 - text.width / 2 - 15;
            this.number_showY = this.selfChipsText_img.y - this.number_offsetY;
            text.setPosition(cc.v2(posx, this.number_showY));
            nameActive = true;
        }
        else if (this.viewStyle == 2 && 0 == this.getSeatViewId()) {
            this.number_showY = this.name_panel.getPosition().y + 9 - this.number_offsetY;
            text.setPosition(cc.v2(0, this.number_showY));
            posx = 0;
        } else {
            this.number_showY = 0;
            text.setPosition(cc.v2(0, 0));
            posx = 0;

        }
        let CallFunc1 = cc.callFunc(() => {
            text.opacity = 255;
            this.name_panel.active = nameActive;
        }, this);

        let moveby = cc.moveBy(0.5, cc.v2(0, this.number_offsetY));
        let CallFunc2 = cc.callFunc(() => {
            if (this.number_action_panel.childrenCount <= 1) {
                this.name_panel.active = true;
            }
        }, this);

        text.runAction(cc.sequence(cc.delayTime(1.3), CallFunc1, moveby, cc.delayTime(1), CallFunc2, cc.destroySelf()));
    }

    public showFire(isGameReplay = false) {
        if (this.viewStyle == 2) {
            let allinAnim: cc.Animation = this.videoAllinEffect.getComponent(cc.Animation);
            allinAnim.stop();
            allinAnim.play("star_allin_anim");
            allinAnim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                allinAnim.off(cc.Animation.EventType.FINISHED);
                allinAnim.play("star_allin_anim_02");
            }, this);
            this.videoAllinEffect.active = true;
            if (this._allin_action1) {
                this._allin_action1.active = false;
            }
            if (this._allin_action0) {
                this._allin_action0.active = false;
            }
        } else {
            super.showFire();
            this.videoAllinEffect.active = false;
        }
    }
    public showFireOnViewStyleChanged() {
        if (this.viewStyle == 2) {
            let allinAnim: cc.Animation = this.videoAllinEffect.getComponent(cc.Animation);
            allinAnim.stop();
            allinAnim.play("star_allin_anim", 0.7);
            allinAnim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                allinAnim.off(cc.Animation.EventType.FINISHED);
                allinAnim.play("star_allin_anim_02");
            }, this);
            this.videoAllinEffect.active = true;
            if (this._allin_action1) {
                this._allin_action1.active = false;
            }
            if (this._allin_action0) {
                this._allin_action0.active = false;
            }
        } else {
            // super.showFire();
            let node = cc.find("allin_node", this.node);
            if (!this._allin_action1) {
                this._allin_action1 = cc.instantiate(this.allinHead2Prefab);
                node.addChild(this._allin_action1);
            }
            this._allin_action1.active = true;
            this._allin_action1.setPosition(cc.v2(0, this._allin_action1.y));
            this._allin_action1.getComponent(cc.Animation).play("allin_action_1");

            if (!this._allin_action0) {
                this._allin_action0 = cc.instantiate(this.allinHeadPrefab);
                node.addChild(this._allin_action0);
            }
            this._allin_action0.active = true;
            this._allin_action0.setPosition(cc.v2(0, this._allin_action0.y));
            let anim: cc.Animation = this._allin_action0.getComponent(cc.Animation);
            // let animState: cc.AnimationState = anim.getAnimationState("allin_action_0");
            anim.play("allin_action_0", 0.7);
            // animState.time = animState.duration;
            // animState.play();

            this.videoAllinEffect.active = false;
        }
    }
    public hideFire() {
        this.videoAllinEffect.active = false;
        this.videoAllinEffect.getComponent(cc.Animation).stop();
        super.hideFire();
    }

    public showWin() {
        if (this.viewStyle == 2) {
            let anim: cc.Animation = this.starWinEffect.getComponent(cc.Animation);
            anim.stop();
            anim.play("CelebrityWinAudience");
            anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                anim.off(cc.Animation.EventType.FINISHED);
                this.starWinEffect.active = false;
            }, this);
            cc.find("New Particle_Atom", this.starWinEffect).getComponent(cc.ParticleSystem).resetSystem();
            cc.find("New Particle_Atom_Edge", this.starWinEffect).getComponent(cc.ParticleSystem).resetSystem();
            this.starWinEffect.active = true;
        } else {
            let anim: cc.Animation = this.userWinEffect.getComponent(cc.Animation);
            anim.stop();
            anim.play("CelebrityWin");
            anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                anim.off(cc.Animation.EventType.FINISHED);
                this.userWinEffect.active = false;
            }, this);
            cc.find("New Particle_Atom", this.userWinEffect).getComponent(cc.ParticleSystem).resetSystem();
            this.userWinEffect.active = true;
        }
    }
    public hideWin() {
        this.starWinEffect.getComponent(cc.Animation).stop();
        this.starWinEffect.active = false;
        this.userWinEffect.getComponent(cc.Animation).stop();
        this.userWinEffect.active = false;
    }

    public cleanHead(): void {
        CircleSprite.cleanHeadNode(this.roleHeadNode);
        CircleSprite.cleanVideoNode(this.roleHeadNode);
        let spriteNode = cc.find("sprite_node", this.videoNode);
        if (spriteNode) {
            spriteNode.removeFromParent(true);
            spriteNode.destroy();
        }
    }

    public resetHead(): void {
        this.cleanHead();
        if (this.PlayerInfo) {
            this.signHeadInfo();
            CircleSprite.setCircleSprite(this.roleHeadNode, this.PlayerInfo.headurl, this.PlayerInfo.plat, false);
        }
        let isGray: boolean = false;
        switch (this.seat_status) {
            case cv.Enum.SeatStatus.SeatStatus_empty:
                isGray = true;
                break;
            case cv.Enum.SeatStatus.SeatStatus_waiting:
                if (this.PlayerInfo) {
                    isGray = !this.PlayerInfo.in_game;
                }
                break;
            case cv.Enum.SeatStatus.SeatStatus_leave_a_monment:
                isGray = true;
                break;
            case cv.Enum.SeatStatus.SeatStatus_inGame_OnAction:
                break;
            case cv.Enum.SeatStatus.SeatStatus_inGame_actionType:
                if (this.actionType == cv.Enum.ActionType.Enum_Action_Fold) {
                    isGray = true;
                }
                break;
            default:
                break;
        }
        this.doGray(isGray);
    }

    public setHeadTextureWithData(pixelData: DataView, pixelFormat: number, pixelsWidth: number, pixelsHeight: number, rotation: number = 0, scaleX: number = 1, scaleY: number = 1): void {
        if (this.viewStyle == 2) {
            let spriteNode = cc.find("sprite_node", this.videoNode);
            if (!spriteNode) {
                spriteNode = new cc.Node();
                let rot: number = Math.abs(rotation);
                let dir: number = (rot == 90 || rot == 270) ? -1 : 1;
                let width: number = dir == 1 ? pixelsWidth : pixelsHeight;
                let height: number = dir == 1 ? pixelsHeight : pixelsWidth;
                let scalWidth: number = this.videoNode.width / width;
                let scalHeight: number = this.videoNode.height / height;
                let scal: number = scalWidth >= scalHeight ? scalWidth : scalHeight;
                this.videoNodeScale = scal;
                spriteNode.scaleX = scaleX * scal;
                spriteNode.scaleY = scaleY * scal;
                spriteNode.width = pixelsWidth;
                spriteNode.height = pixelsHeight;
                // let rot: number = Math.abs(rotation);
                // let dir: number = (rot == 90 || rot == 270)? -1: 1;
                // if (dir == 1) {
                //     spriteNode.width = this.videoNode.width;
                //     spriteNode.height = this.videoNode.height;
                // } else {
                //     spriteNode.width = this.videoNode.height;
                //     spriteNode.height =this.videoNode.width;
                // }
                let sprite = spriteNode.addComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame(new cc.Texture2D());
                sprite.type = cc.Sprite.Type.SIMPLE;
                sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                this.videoNode.addChild(spriteNode);
                spriteNode.name = "sprite_node";
                //拉伸
                // let rot: number = Math.abs(rotation);
                // let dir: number = (rot == 90 || rot == 270)? -1: 1;
                // let width: number = dir == 1? pixelsWidth : pixelsHeight;
                // let height: number = dir == 1? pixelsHeight : pixelsWidth;
                // let scalWidth: number = this.videoNode.width / width;
                // let scalHeight: number = this.videoNode.height / height;
                // let scal: number = scalWidth >= scalHeight? scalWidth : scalHeight;
                // if (dir == 1) {
                //     spriteNode.width = Math.floor(pixelsWidth * scal);
                //     spriteNode.height = Math.floor(pixelsHeight * scal);
                // } else {
                //     spriteNode.width = Math.floor(pixelsHeight * scal);
                //     spriteNode.height = Math.floor(pixelsWidth * scal);
                // }
            }
            spriteNode.scaleX = scaleX * this.videoNodeScale;
            spriteNode.scaleY = scaleY * this.videoNodeScale;
            spriteNode.angle = -rotation;
            let texture = spriteNode.getComponent(cc.Sprite).spriteFrame.getTexture();
            texture.initWithData(pixelData, pixelFormat, pixelsWidth, pixelsHeight);
        } else {
            CircleSprite.setHeadTextureWithData(this.roleHeadNode, pixelData, pixelFormat, pixelsWidth, pixelsHeight, rotation, scaleX, scaleY);
        }
    }

    protected isStarSeat(): boolean {
        if (cv.GameDataManager.tRoomData.pkRoomParam.reserveSeat > 0) { //明星房间开启
            let starSeats = cv.GameDataManager.tRoomData.starSeats;
            for (let i = 0; i < starSeats.length; i++) {
                if (starSeats[i] == this.getSeverId()) {
                    return true;
                }
            }
        }
        return false;
    }
    protected isInviterSeat(): boolean {
        if (cv.GameDataManager.tRoomData.pkRoomParam.reserveSeat > 0) {
            let inviterSeats = cv.GameDataManager.tRoomData.inviterSeats;
            for (let i = 0; i < inviterSeats.length; i++) {
                if (inviterSeats[i] == this.getSeverId()) {
                    return true;
                }
            }
        }
        return false;
    }
    protected isStar(): boolean {
        if (this.PlayerInfo && this.PlayerInfo.identity == 1) {
            return true;
        }
        return false;
    }
    protected isInviter(): boolean {
        if (this.PlayerInfo && this.PlayerInfo.identity == 0) {
            let inviters = cv.GameDataManager.tRoomData.pkRoomParam.starInviter;
            for (let i = 0; i < inviters.length; ++i) {
                if (inviters[i] == this.PlayerInfo.playerid) {
                    return true;
                }
            }
        }
        return false;
    }

    public setViewStyle(style: number): void {
        if (this.viewStyle == style) {
            return;
        }
        let viewStyleChange: boolean = true;
        switch (style) {
            case 1:
                this.setViewStyle1();
                break;
            case 2:
                this.setViewStyle2();
                break;
            default:
                viewStyleChange = false;
                break;
        }
        //视图发生改变,对当前各个动画进行重置(同个状态不同视图样式有不同的动画)
        if (viewStyleChange) {
            this.updateSeatStatusOnViewStyleChanged();
            cv.MessageCenter.send("seatViewStyleChanged", this.viewStyle);
        }
    }
    public getViewStyle(): number {
        return this.viewStyle;
    }



    public setViewStyle1(): void {
        //小视图(默认)
        this.viewStyle = 1;
        this.starVideo.active = false;
        this.head_panel.active = true;
        this.cleanHead();
        if (this.PlayerInfo && !(this.PlayerInfo.identity == 1 && this.PlayerInfo.liveStatus == 1)) {
            this.signHeadInfo();
            CircleSprite.setCircleSprite(this.roleHeadNode, this.PlayerInfo.headurl, this.PlayerInfo.plat, false);
        }
        this.setSeatViewId(this.SeatViewId, this.seatCount, this.seatType);
    }
    public setViewStyle2(): void {
        //大视图
        this.viewStyle = 2;
        this.starVideo.active = true;
        this.head_panel.active = false;
        this.cleanHead();
        this.setSeatViewId(this.SeatViewId, this.seatCount, this.seatType);
    }
    public updateSeatStatusOnViewStyleChanged(): void {
        this.hideStatusText();
        switch (this.seat_status) {
            case cv.Enum.SeatStatus.SeatStatus_empty:
                this.doGray(true);
                break;
            case cv.Enum.SeatStatus.SeatStatus_waiting:
                if (this.PlayerInfo) {
                    if (!this.PlayerInfo.in_game) {
                        this.showStatusText(cv.config.getStringData("GameUiWaiting"));
                    }
                    this.doGray(!this.PlayerInfo.in_game);
                }
                break;
            case cv.Enum.SeatStatus.SeatStatus_leave_a_monment:
                this.doGray(true);
                this.showStatusText(cv.config.getStringData("UISeatLeave"));
                break;
            case cv.Enum.SeatStatus.SeatStatus_inGame_OnAction:
                break;
            case cv.Enum.SeatStatus.SeatStatus_inGame_actionType:
                this.updateByActionTypeOnViewStyleChanged();
                break;
            default:
                break;
        }
    }
    public updateByActionTypeOnViewStyleChanged(): void {
        this.hideStatusText();
        switch (this.actionType) {
            case cv.Enum.ActionType.Enum_Action_Null:
                this.doGray(false);
                break;
            case cv.Enum.ActionType.Enum_Action_Check:
                break;
            case cv.Enum.ActionType.Enum_Action_Fold:
                this.doGray(true);
                this.showStatusText(cv.config.getStringData("ActionTips1"));
                break;
            case cv.Enum.ActionType.Enum_Action_Call:
                break;
            case cv.Enum.ActionType.Enum_Action_Bet:
                break;
            case cv.Enum.ActionType.Enum_Action_Raise:
                break;
            case cv.Enum.ActionType.Enum_Action_Allin:
                this.showFireOnViewStyleChanged();
                break;
            case cv.Enum.ActionType.Enum_Action_CallMuck:
                break;
            case cv.Enum.ActionType.Enum_Action_AddActionTime:
                break;
            case cv.Enum.ActionType.Enum_Action_SendCard_Common:
                break;
            case cv.Enum.ActionType.Enum_Action_Send_HoleCards:
                break;
            case cv.Enum.ActionType.Enum_Action_Straddle:
                break;
            case cv.Enum.ActionType.Enum_Action_Post:
                break;
            default:
                break;
        }
        this.hideWin();
    }
    public playSitDownAction(): void {
        let anim: cc.Animation = this.headEffect.getComponent(cc.Animation);
        anim.play("CelebritySeated");
        anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            anim.off(cc.Animation.EventType.FINISHED);
            this.headEffect.active = false;
        }, this);
        let particle1: cc.ParticleSystem = cc.find("New Particle_Atom", this.headEffect).getComponent(cc.ParticleSystem);
        particle1.resetSystem();
        let particle2: cc.ParticleSystem = cc.find("New Particle_Stars", this.headEffect).getComponent(cc.ParticleSystem);
        particle2.resetSystem();

        this.headEffect.active = true;
    }
    public showHeadBlock(enable: boolean): void {
        this.headBlock.active = enable;
    }

    protected setVideoBlockPositionParam() {
        this.leftX = this.starVideo.x - this.starVideo.anchorX * this.starVideo.width * this.starVideo.scaleX;
        this.rightX = this.leftX + this.starVideo.width * this.starVideo.scaleX;
        this.bottomY = this.starVideo.y - this.starVideo.anchorY * this.starVideo.height * this.starVideo.scaleY;
        this.topY = this.bottomY + this.starVideo.height + this.starVideo.scaleY;
        this.starVideo.parent.convertToWorldSpaceAR(cc.v2(this.leftX, this.bottomY), this.leftbottomPos);
        this.starVideo.parent.convertToWorldSpaceAR(cc.v2(this.leftX, this.topY), this.leftTopPos);
        this.starVideo.parent.convertToWorldSpaceAR(cc.v2(this.rightX, this.bottomY), this.rightbottomPos);
        this.starVideo.parent.convertToWorldSpaceAR(cc.v2(this.rightX, this.topY), this.rightTopPos);
        this.starVideo.parent.convertToWorldSpaceAR(cc.v2(0, this.topY), this.topCenterPos);
        this.starVideo.parent.convertToWorldSpaceAR(cc.v2(0, this.bottomY), this.bottomCenterPos);
    }

    public onCloseStarSeat(msg: boolean) {
        if (msg) {
            cc.find("star_waitting", this.role_img.node).active = false;
            cc.find("inviter_waitting", this.role_img.node).active = false;
            if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
                this.nobody_text.node.active = true;
            }
            this.resetHead();
        }
    }
    public onFreeInviterSeat(msg: any) {
        if (msg && msg.seatId.length > 0) {
            let seats = msg.seatId;
            let attr = msg.attr; //0=普通位  1=嘉宾位 2=明星位
            let changeAtrr: boolean = false;
            for (let i = seats.length - 1; i >= 0; --i) {
                if (this.getSeverId() == seats[i]) {
                    changeAtrr = true;
                    break;
                }
            }
            if (!changeAtrr || !(attr == 0 || attr == 1 || attr == 2)) {
                return;
            }
            cc.find("star_waitting", this.role_img.node).active = false;
            cc.find("inviter_waitting", this.role_img.node).active = false;
            if (attr == 0) {
                if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
                    this.nobody_text.node.active = true;
                }
            } else if (attr == 1) {
                if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
                    cc.find("inviter_waitting", this.role_img.node).active = true;
                    this.nobody_text.node.active = false;
                }
            } else if (attr == 2) {
                if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) {
                    cc.find("star_waitting", this.role_img.node).active = true;
                    this.nobody_text.node.active = false;
                }
            }
        }
    }

    public showAddTimeAction() {
        if (this.getViewStyle() == 2) {
            return;
        }
        super.showAddTimeAction();
    }

    // public updateStyle() { }
    public Bet(num: number, btype: number = cv.Enum.BType.BType_Bet) {
        // let Layer = this.mainPool;
        if (btype == cv.Enum.BType.BType_Call) {
            this.chipsNum += num;
        }
        else {
            this.chipsNum = num;
        }

        if (this.chipsNum != 0) {
            this.m_pkChipsMove.MoveIn();
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chips_to_table", false, 0.3);
            }
        }
    }
    public SetName(kName: string, kColor: cc.Color = cc.color(255, 255, 255), nType: number = 0) {
        super.SetName(kName, kColor, nType);
        if (this.viewStyle == 2) {
            let roleNameWidth: number = this.roleName_text_forRemark.node.width;
            let roleNameX: number = this.roleName_text_forRemark.node.x;
            let roleNameAX: number = this.roleName_text_forRemark.node.anchorX;
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                let name_bg = cc.find("star_name_bg", this.name_panel);
                name_bg.scaleX = -1;
                name_bg.setPosition(roleNameX + roleNameWidth * (1 - roleNameAX) + 20 - name_bg.width * (1 - name_bg.anchorX), this.nameBgPos.y);
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
                let name_bg = cc.find("star_name_bg", this.name_panel);
                name_bg.scaleX = 1;
                name_bg.setPosition(roleNameX - roleNameWidth * roleNameAX - 20 + name_bg.width * name_bg.anchorX, this.nameBgPos.y);
            }
        } else {
            let name_bg = cc.find("star_name_bg", this.name_panel);
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                name_bg.scaleX = -1;
                name_bg.setPosition(-this.nameBgPos.x, this.nameBgPos.y);
            } else {
                name_bg.scaleX = 1;
                name_bg.setPosition(this.nameBgPos.x, this.nameBgPos.y);
            }
        }
    }
    public OnUpdate_remarks() {
        super.OnUpdate_remarks();
        if (this.viewStyle == 2) {
            let roleNameWidth: number = this.roleName_text_forRemark.node.width;
            let roleNameX: number = this.roleName_text_forRemark.node.x;
            let roleNameAX: number = this.roleName_text_forRemark.node.anchorX;
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                let name_bg = cc.find("star_name_bg", this.name_panel);
                name_bg.scaleX = -1;
                name_bg.setPosition(roleNameX + roleNameWidth * (1 - roleNameAX) + 20 - name_bg.width * (1 - name_bg.anchorX), this.nameBgPos.y);
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT || this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
                let name_bg = cc.find("star_name_bg", this.name_panel);
                name_bg.scaleX = 1;
                name_bg.setPosition(roleNameX - roleNameWidth * roleNameAX - 20 + name_bg.width * name_bg.anchorX, this.nameBgPos.y);
            }
        } else {
            let name_bg = cc.find("star_name_bg", this.name_panel);
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN || this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                name_bg.scaleX = -1;
                name_bg.setPosition(-this.nameBgPos.x, this.nameBgPos.y);
            } else {
                name_bg.scaleX = 1;
                name_bg.setPosition(this.nameBgPos.x, this.nameBgPos.y);
            }
        }
    }

    public showRedAction(type: number, number: number, isStar: boolean) {
        if (this.starVideo.active) {
            super.showRedActionByNode(this._videoredpacketActionNode, type, number, isStar, true);
        } else {
            super.showRedAction(type, number, isStar);
        }
    }

    public updateChipPosBySeatStatus(bShowBottom: boolean = false) { }

    public onClickGifIcon(evt: any) {
        cv.MessageCenter.send("click_seat_gift_icon");
    }
}