import cv from "../../lobby/cv";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import { PlayerInfo, eSeatStatus } from "./JackfruitData";
import JackfruitMgr from "./JackfruitManager";
import { RemarkData } from "../../../data/userData";
const { ccclass, property } = cc._decorator;

@ccclass
export default class JackfruitSeat extends cc.Component {
    @property(cc.Node) public headBlock: cc.Node = null;
    @property(cc.Node) head_img: cc.Node = null;
    @property(cc.Node) head_frame_img: cc.Node = null;
    @property(cc.Node) head_panel: cc.Node = null;
    @property(cc.Node) head_node: cc.Node = null;
    @property(cc.Label) name_text: cc.Label = null;
    @property(cc.Node) gold_img: cc.Node = null;
    @property(cc.Label) gold_label: cc.Label = null;
    @property(cc.Node) seat_btn: cc.Node = null;
    @property(cc.Node) empty_label: cc.Node = null;
    @property(cc.Label) gold_change_label: cc.Label = null;
    @property(cc.Node) lose_img: cc.Node = null;
    @property(cc.Node) ready_img: cc.Node = null;
    @property(cc.Label) type_label: cc.Label = null;

    @property(cc.Prefab) Node_YouWin_Small: cc.Prefab = null;
    @property(cc.Prefab) Node_YouLoose_Small: cc.Prefab = null;
    @property(cc.Prefab) Node_Tie_Small: cc.Prefab = null;
    @property(cc.Prefab) total_score_action: cc.Prefab = null;

    // 红包动画
    @property(cc.Prefab) redpacketActionPrefab: cc.Prefab = null;
    private _redpacketActionNode: cc.Node = null;
    
    @property(cc.Sprite) public voice_img: cc.Sprite = null;//播放声音图片
    @property(cc.Sprite) public remark_icon: cc.Sprite = null;
    public voiceImgList: cc.Node[] = [];
    public speakTime: number = 0;

    public spine: sp.Skeleton = null;
    public _seat_status: number = eSeatStatus.SeatStatus_empty;
    public _playerInfo: PlayerInfo;
    public _seatID = 0;
    public _seatViewID = 0;
    public _specialEffects_panel: cc.Node = null;
    public _showType = 0;
    public _itemNum = 0;
    public _newStake = 0;

    onLoad() {
        for (let i: number = 0; i < 3; i++) {
            let img: cc.Node = cc.find("voice_img_icon/voice_" + i, this.voice_img.node);
            this.voiceImgList.push(img);
        }

        this.empty_label.getComponent(cc.Label).string = cv.config.getStringData("jackfruit_seat_empty_label");
        //this.ready_label.string = cv.config.getStringData("jackfruit_seat_ready_label");
        this.setSeatEmpty();
        this.initRedPacketAction();

        cv.MessageCenter.register("update_remarks", this.OnUpdate_remarks.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("update_remarks", this.node);
    }

    initRedPacketAction() {
        this._redpacketActionNode = cc.instantiate(this.redpacketActionPrefab);
        this.node.addChild(this._redpacketActionNode);
        this._redpacketActionNode.active = false;
    }

    public OnUpdate_remarks() {
        if (this._seat_status == cv.Enum.SeatStatus.SeatStatus_empty) return;
        if (this._playerInfo == null) return;
        let remarkData: RemarkData = cv.dataHandler.getUserData().getRemarkData(this._playerInfo.playerId);
        let nameWidth: number = 0;

        if (remarkData.nType == 0) {
            this.remark_icon.node.active = false;
            this.name_text.node.setContentSize(222, this.name_text.node.getContentSize().height);
        }
        else {
            this.remark_icon.node.active = true;
            this.name_text.node.setContentSize(222, this.name_text.node.getContentSize().height);
        }

        if (remarkData.nUid == 0) {
            nameWidth = cv.StringTools.setShrinkString(this.name_text.node, this._playerInfo.name, true);
        }
        else {
            if (remarkData.sRemark.length == 0) {
                nameWidth = cv.StringTools.setShrinkString(this.name_text.node, this._playerInfo.name, true);
            }
            else {
                nameWidth = cv.StringTools.setShrinkString(this.name_text.node, remarkData.sRemark, true);
            }
        }

        if (remarkData.nType != 0) {
            this.remark_icon.node.setPosition(this.name_text.node.getPosition().x + nameWidth - 7, this.name_text.node.getPosition().y);
            cv.resMgr.setSpriteFrame(this.remark_icon.node, "zh_CN/game/dzpoker/ui/common_remark_icon" + remarkData.nType);
        }
    }

    private _getSpecialEffectsPos(pos: cc.Vec2): cc.Vec3 {
        return this._specialEffects_panel.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(pos));
    }

    private _runWinOrLoseAction(activeNode: cc.Node, activename: string) {
        this._specialEffects_panel.addChild(activeNode);
        activeNode.active = true;
        let pos = this._getSpecialEffectsPos(cc.v2(0, 0));
        activeNode.setPosition(pos);
        let active = activeNode.getComponent(cc.Animation);
        active.play(activename);
    }

    private _setStake(showStake: number) {
        if (this._seat_status == eSeatStatus.SeatStatus_empty) {
            this._stopTimeUpdate();
            this.gold_label.string = "";
            return;
        }
        this.gold_label.string = showStake.toString();
        if (this.gold_label.string.length >= 8) {
            this.gold_label.fontSize = 36;
        }
        else {
            this.gold_label.fontSize = 38;
        }
    }

    private _runStakeAction(showStake: number, isWin: boolean) {
        // this._newStake = showStake;
        // let stake = cv.Number(this.gold_label.string);
        // this._itemNum = (this._newStake - stake) / 50;
        // let num = this._getDecimalPlaces(stake, this._newStake);
        // let tempNum = cv.StringTools.toFixed(this._itemNum, num, cv.StringTools.RoundingMode.ROUND_FLOOR);
        // if(tempNum == 0)
        // {
        //     tempNum = cv.StringTools.toFixed(this._itemNum, num, cv.StringTools.RoundingMode.ROUND_CEIL);
        // }
        // this._itemNum = tempNum;
        // this.schedule(this._timeUpdate, 0);
        this._setStake(showStake);

        if (isWin) {
            let activeNode = this.node.getChildByName("total_score_action")
            if (!activeNode) {
                activeNode = cc.instantiate(this.total_score_action);
                activeNode.name = "total_score_action"
                this.node.addChild(activeNode);
            }

            activeNode.active = true;
            activeNode.stopAllActions();
            let pos = this.gold_label.node.getPosition();
            activeNode.setPosition(cc.v2(pos.x + this.gold_label.node.getContentSize().width / 2, pos.y));
            cc.find("Particle_BigTotal_Burst", activeNode).getComponent(cc.ParticleSystem).resetSystem();
            cc.find("Particle_BigTotal_Burst/Particle_BigTotal_Burst_1", activeNode).getComponent(cc.ParticleSystem).resetSystem();
            activeNode.runAction(cc.sequence(cc.delayTime(1), cc.callFunc((target) => {
                target.active = false;
            }, this)));
        }
    }

    private _getDecimalPlaces(num1: number, num2: number): number {
        if (num1 != cv.StringTools.handleNumberByFloor(num1, 1) ||
            num2 != cv.StringTools.handleNumberByFloor(num2, 1)) {
            return 2;
        } else if (num1 != cv.StringTools.handleNumberByFloor(num1, 0) ||
            num2 != cv.StringTools.handleNumberByFloor(num2, 0)) {
            return 1;
        } else {
            return 0;
        }
    }

    private _timeUpdate() {
        let stake = cv.Number(this.gold_label.string);

        stake = cv.StringTools.plus(stake, this._itemNum);
        if ((this._itemNum >= 0 && stake >= this._newStake) || (this._itemNum < 0 && stake <= this._newStake)) {
            this._setStake(this._newStake)
            this._stopTimeUpdate();
            return;
        }

        this._setStake(stake)
    }

    private _stopTimeUpdate() {
        this._newStake = 0;
        this._itemNum = 0;
        this.unschedule(this._timeUpdate);
    }

    public setStake(nStake: number, isAction?: boolean, isWin?: boolean) {
        let stake = cv.StringTools.serverGoldToShowNumber(nStake);
        stake = cv.StringTools.toFixed(stake, 1);
        this.gold_label.node.active = true;
        this._stopTimeUpdate();
        if (isAction) {
            this._runStakeAction(stake, isWin);
        } else {
            this._setStake(stake);
        }
    }

    public setData(playerInfo: PlayerInfo) {
        this._playerInfo = playerInfo;
    }

    public getData(): PlayerInfo {
        return this._playerInfo;
    }

    public setSeatViewID(viewId: number) {
        this._seatViewID = viewId;
    }

    public getSeatViewID(): number {
        return this._seatViewID;
    }

    public setSeatID(seatID: number) {
        this._seatID = seatID;
    }

    public getSeatID(): number {
        return this._seatID;
    }

    public getHeadWorldPos(): cc.Vec3 {
        return this.head_node.getParent().convertToWorldSpaceAR(this.head_node.getPosition());
    }

    public getGoldWorldPos(): cc.Vec3 {
        return this.gold_label.node.getParent().convertToWorldSpaceAR(this.gold_label.node.getPosition());
    }

    public updateSeatStatus(SeatStatus: number) {
        this._seat_status = SeatStatus;
        switch (SeatStatus) {
            case eSeatStatus.SeatStatus_empty:
                this.setSeatEmpty();
                break;
            case eSeatStatus.SeatStatus_waiting:
                this.setSeatWaiting();
                break;
            case eSeatStatus.SeatStatus_waiting_bubble:
                this.setSeatWaitingBubble();
                break;
            case eSeatStatus.SeatStatus_inGame:
                this.setSeatInGame();
                break;
            case eSeatStatus.SeatStatus_ready:
                this.setSeatReady()
                break;
            case eSeatStatus.SeatStatus_wait_ready:
                this.setSeatWaitReady()
                break;
        }
    }

    public setSeatEmpty() {
        this._stopTimeUpdate();
        this.empty_label.active = true;
        this.head_frame_img.active = false;
        this.gold_img.active = false;
        this.gold_label.string = "";
        this.name_text.string = "";
        this.head_img.active = true;
        this.head_panel.active = false;
        this.ready_img.active = false;
        this.type_label.string = "";
        this.remark_icon.node.active = false;
    }

    public setSeatReady() {
        this.showBubbleByType(2);
    }

    public setSeatWaitReady() {
        this.showBubbleByType(1);
    }

    public setSeatWaiting() {
        this.setSitDownView();
    }

    public setSeatWaitingBubble() {
        this.showBubbleByType(0);
    }

    public showBubbleByType(type: number) {
        this._showType = type;
        // if(this._showType == 0)
        // {
        //     this.ready_img.active = true;
        //     this.type_label.getComponent(cc.Label).string = cv.config.getStringData("jackfruit_seat_type_"+ type);
        // }else
        // {
        this.ready_img.active = false;
        this.type_label.string = "";
        // }
    }

    public setSeatInGame() {
        this.ready_img.active = false;
        this.type_label.string = "";
    }

    public setSitDownView() {
        this.head_panel.active = true;
        this.empty_label.active = false;
        this.head_frame_img.active = true;
        this.gold_img.active = true;
        this.head_img.active = false;

        this.headBlock.active = false;

        for (let i = 0; i < this._playerInfo.NotDisturbUids.length; i++) {
            if (cv.dataHandler.getUserData().u32Uid == this._playerInfo.NotDisturbUids[i]) {
                this.headBlock.active = true;
                break;
            }
        }

        let remarkData: RemarkData = cv.dataHandler.getUserData().getRemarkData(this._playerInfo.playerId);
        let nameWidth: number = 0;

        if (remarkData.nType == 0) {
            this.remark_icon.node.active = false;
            this.name_text.node.setContentSize(222, this.name_text.node.getContentSize().height);
        }
        else {
            this.remark_icon.node.active = true;
            this.name_text.node.setContentSize(222, this.name_text.node.getContentSize().height);
        }

        if (remarkData.nUid == 0) {
            nameWidth = cv.StringTools.setShrinkString(this.name_text.node, this._playerInfo.name, true);
        }
        else {
            if (remarkData.sRemark.length == 0) {
                nameWidth = cv.StringTools.setShrinkString(this.name_text.node, this._playerInfo.name, true);
            }
            else {
                nameWidth = cv.StringTools.setShrinkString(this.name_text.node, remarkData.sRemark, true);
            }
        }

        if (remarkData.nType != 0) {
            this.remark_icon.node.setPosition(this.name_text.node.getPosition().x + nameWidth - 7, this.name_text.node.getPosition().y);
            cv.resMgr.setSpriteFrame(this.remark_icon.node, "zh_CN/game/dzpoker/ui/common_remark_icon" + remarkData.nType);
        }

        CircleSprite.setCircleSprite(this.head_node, this._playerInfo.headUrl, this._playerInfo.plat, false);
        this.setStake(this._playerInfo.score);
    }

    public onBtnSeat(event) {
        if (this._seat_status == eSeatStatus.SeatStatus_empty) {
            if (JackfruitMgr.tRoomData.nSelfSeatID == -1) {
                JackfruitMgr.tRoomData.nPrePickSeatID = this.getSeatID();
                cv.jackfruitNet.requestSitDown(cv.roomManager.getCurrentRoomID(), this.getSeatID());
            }
        } else {
            if (JackfruitMgr.tRoomData.nSelfSeatID == this.getSeatID()) {
                //cv.MessageCenter.send("on_show_chat_panel");
                cv.MessageCenter.send("on_show_face_panel", this.getData());
            } else {
                cv.MessageCenter.send("on_show_face_panel", this.getData());
            }
        }
    }

    public showGoldChangeAction(num: number, font: cc.Font, fontSize: number) {
        let score = cv.StringTools.serverGoldToShowNumber(num);
        score = cv.StringTools.toFixed(score, 1);
        let labelNode = cc.instantiate(this.gold_change_label.node);
        let label = labelNode.getComponent(cc.Label);
        this._specialEffects_panel.addChild(labelNode);
        labelNode.active = true;
        let pos = this._getSpecialEffectsPos(cc.v2(0, 0));
        labelNode.setPosition(pos);
        label.font = font;
        label.fontSize = fontSize;
        label.lineHeight = fontSize;
        label.string = score < 0 ? score.toString() : "+" + score.toString();
        let moveY: number = this.node.getContentSize().height / 2 + cv.resMgr.getLabelStringSize(label).height / 2;
        let movePos = this._getSpecialEffectsPos(cc.v2(0, this.getSeatViewID() == 0 ? moveY + 60 : -moveY - 30));
        let move = cc.moveTo(0.1, cc.v2(movePos));
        let func = cc.callFunc((): void => {
            let active = labelNode.getComponent(cc.Animation);
            active.play("jingbi_dd");
        });
        let delay = cc.delayTime(1);
        let func1 = cc.callFunc((): void => {
            labelNode.removeFromParent(true);
            labelNode.destroy();
        })
        labelNode.runAction(cc.sequence(move, func, delay, func1));
    }

    public runYouWinOrLose(score: number) {
        let activeNode: cc.Node;
        let activename: string;
        if (score > 0) {
            activeNode = cc.instantiate(this.Node_YouWin_Small);
            activename = "YouWin_Small"
        } else if (score < 0) {
            activeNode = cc.instantiate(this.Node_YouLoose_Small)
            activename = "YouLoose_Small"
        } else {
            activeNode = cc.instantiate(this.Node_Tie_Small)
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                activename = "Tie_Small"
            } else {
                activename = "Tie_SmallEN"
            }
        }
        this._runWinOrLoseAction(activeNode, activename)
    }

    // update (dt) {}

    showFace(faceId: number) {
        if (this.spine == null) {
            let node = new cc.Node()
            this.spine = node.addComponent(sp.Skeleton);
            node.y = -72
            this.node.addChild(node, 999);
        }
        this.spine.node.active = true;
        cv.resMgr.load(`zh_CN/game/dzpoker/animation/face/baseSpineAni_${faceId}`, sp.SkeletonData, (spkeletonData: sp.SkeletonData): void => {
            this.spine.skeletonData = spkeletonData;
            this.spine.setAnimation(0, "animation", false);
            this.spine.node.scale = 1.8;
            this.spine.setCompleteListener(function () {
                this.spine.node.active = false;
            }.bind(this));
        }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
    }

    getHeadWorldPosForFace(): cc.Vec2 {
        let pos = this.head_node.parent.convertToWorldSpaceAR(cc.v2(this.head_node.x, this.head_node.y - this.head_node.height * 0.5));
        return cc.v2(pos.x, pos.y);
    }

    setSpecialEffectsPanel(node: cc.Node) {
        this._specialEffects_panel = node;
    }

    public speak(audioTime: number): void {
        this.voice_img.node.active = true;
        this.speakTime = 0;
        this.unschedule(this.speaking);
        this.schedule(this.speaking, 0.2);
        this.scheduleOnce(function () {
            this.unschedule(this.speaking);
            this.voice_img.node.active = false;
        }.bind(this), audioTime);
    }

    private speaking(): void {
        this.speakTime++;
        let len = this.speakTime % 3;
        console.log("Seat speaking, len:" + len);
        for (let i = 0; i < this.voiceImgList.length; i++) {
            const voiceImg = this.voiceImgList[i];
            if (i <= len) {
                voiceImg.active = true;
            } else {
                voiceImg.active = false;
            }
        }
    }

    public showHeadBlock(enable: boolean): void {
        this.headBlock.active = enable;
    }

    public showRedActionByNode(node:cc.Node, type:number, number:number) {
        node.active = true;
        let hongbaoNode = node.getChildByName("hongbaoR");
        let actionNode = hongbaoNode.getChildByName("action_node");
        let goodsActionNode = hongbaoNode.getChildByName("goods_action_node");
        actionNode.active = type != cv.Enum.RedItemType.goods;
        goodsActionNode.active = type == cv.Enum.RedItemType.goods;
        
        let iconRed = actionNode.getChildByName("icon_red_envelope");
        let goodsIconRed = goodsActionNode.getChildByName("icon_red_envelope");
        let numberLabel = actionNode.getChildByName("number").getComponent(cc.Label);
        let icon = actionNode.getChildByName("icon");
        let path = "zh_CN/game/redpacket/red_btn_open";
        switch(type)
        {
            case cv.Enum.RedItemType.gold:
                cv.resMgr.setSpriteFrame(icon, "zh_CN/hall/RedPackets/icon_gold");
                break;
            case cv.Enum.RedItemType.integral:
                cv.resMgr.setSpriteFrame(icon, "zh_CN/hall/RedPackets/YellowChip");
                break;
            case cv.Enum.RedItemType.usdt:
                cv.resMgr.setSpriteFrame(icon, "zh_CN/hall/RedPackets/icon_ustd");
                break;
        }
        cv.resMgr.setSpriteFrame(iconRed, path);
        cv.resMgr.setSpriteFrame(goodsIconRed, path);
        cv.resMgr.getLabelStringSize(numberLabel, "+" + cv.StringTools.serverGoldToShowString(number));
        let action = hongbaoNode.getComponent(cc.Animation);
        action.play("hongbaoRJ");
    }

    public showRedAction(type:number, number:number) {
        this.showRedActionByNode(this._redpacketActionNode, type, number);
    }
}
