import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../lobby/cv";
import { CardNum, CardSuit, CardFace, CardBack } from "../../../common/tools/Enum";

/**
 * 牌预制件逻辑组件
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class Card extends cc.Component {
    @property(Number) tag: Number = 0;
    @property(cc.Node) rootNode: cc.Node = null;
    @property(cc.Node) img_cardFace: cc.Node = null;
    @property({
        type: cc.Sprite,
        "tooltip": "数字"
    })
    img_num: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "背面"
    })
    img_back: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "高亮边框"
    })
    img_light: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "灰度遮罩"
    })
    img_gray: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "勾选"
    })
    img_check: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "亮牌"
    })
    img_eye: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "平分"
    })
    img_fen: cc.Sprite = null;

    @property({
        type: cc.Enum(CardNum),
        "tooltip": "牌面值(默认:最大值)"
    })
    eCardNum: CardNum = CardNum.CardNum_MAX;

    @property({
        type: cc.Enum(CardSuit),
        "tooltip": "牌花色(默认:最大值)"
    })
    eCardSuit: CardSuit = CardSuit.CardSuit_MAX;

    @property({
        type: cc.Enum(CardFace),
        "tooltip": "牌类型(默认:0)"
    })
    eCardType: CardFace = CardFace.CARD_FACE_0;

    @property({
        type: cc.Enum(CardBack),
        "tooltip": "牌背(默认:4)"
    })
    eCardBgType: CardBack = CardBack.CARD_BACK_4;

    @property({
        type: cc.Prefab,
        "tooltip": "击中保险裂纹动画 预制件"
    })
    prefab_anim_crack: cc.Prefab = null;

    // 私有成员
    private _bBonny: boolean = false;
    private _dealPos: cc.Vec2 = cc.v2(0, 0);
    private _dealRotate: number = 0;
    private _dealTime: number = 0;
    private _hasContent: boolean = false;
    private _gameid: number = 0;
    private _card_back_folder_path: string = "zh_CN/game/dzpoker/card/card_bg/";

    protected onLoad(): void {
        // 显示牌面
        this.node.active = true;
        this.img_cardFace.active = false;

        // 默认隐藏若干选项
        this.img_back.node.active = true;
        this.img_light.node.active = false;
        this.img_gray.node.active = false;
        this.img_check.node.active = false;
        this.img_eye.node.active = false;
        this.img_fen.node.active = false;
        //this.updateCardGray();

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
            cv.resMgr.setSpriteFrame(this.img_back.node, `${this._card_back_folder_path}Pb_01_0`);
        }
    }

    protected start(): void {
    }

    // 重置牌值（默认显示牌背）
    public reset() {
        this.eCardNum = CardNum.CardNum_MAX;
        this.eCardSuit = CardSuit.CardSuit_MAX;
        this._hasContent = false;
        cv.resMgr.setSpriteFrame(this.img_num.node, this._getCardBgResPath());
    }

    /**
     * 设置牌内容
     * @param eNum  牌面值
     * @param eSuit 牌花色
     */
    setContent(eNum: CardNum, eSuit: CardSuit): void {
        eNum = cv.Number(eNum);
        eSuit = cv.Number(eSuit);

        if (eNum === cv.Number(world_pb.SpecialCards.Cards_Zero)) {
            eNum = CardNum.CARD_2;
        }

        if (eSuit == cv.Number(world_pb.SpecialCards.Cards_Zero)) {
            eSuit = CardSuit.CARD_DIAMOND;
        }

        // 因为没有做"牌面风格"等比对, 所以这里认为:只要牌值和花色有变化就刷新UI
        this.eCardNum = eNum;
        this.eCardSuit = eSuit;
        this._updateContent();
    }

    /**
     * 设置游戏id, 目的是根据不同游戏获取不同资源路径
     * @brief 如果在游戏房间中,那么"cv.roomManager.getCurrentGameID"是有值的; 如果不在游戏房间中,
     * 那么就就需要一个方法设置临时的游戏id, 为了不影响全局"cv.roomManager.setCurrentGameID"流程,
     * 这里新加一个setgameid的方法, 优先"setCurrentGameID", 次"setGameID"
     * @param gameid 
     */
    setGameID(gameid: number): void {
        this._gameid = gameid;
    }

    getGameID(): number {
        return this._gameid;
    }

    /**
     * 获取牌资源路径(resources文件夹内)
     */
    private _getCardResPath(): string {
        let path: string = "";
        let type: CardFace = CardFace.CARD_FACE_0;
        let gameid: number = cv.roomManager.getCurrentGameID();

        if (gameid === cv.Enum.GameId.GameId_Dummy) {
            gameid = this.getGameID();
        }

        switch (gameid) {
            case cv.Enum.GameId.Jackfruit: type = cv.tools.GetCardFaceJackfruit(); break;
            case cv.Enum.GameId.Plo: type = cv.tools.GetCardFacePlo(); break;
            default: type = cv.tools.GetCardFace(); break;
        }

        switch (type) {
            case CardFace.CARD_FACE_0: path = "zh_CN/game/dzpoker/card/card_type_0/"; break;
            case CardFace.CARD_FACE_1: path = "zh_CN/game/dzpoker/card/card_type_1/"; break;
            case CardFace.CARD_FACE_2: path = "zh_CN/game/dzpoker/card/card_type_2/"; break;
            case CardFace.CARD_FACE_3: path = "zh_CN/game/dzpoker/card/card_type_3/"; break;
            case CardFace.CARD_FACE_4: path = "zh_CN/game/dzpoker/card/card_type_4/"; break;
            case CardFace.CARD_FACE_5: path = "zh_CN/game/dzpoker/card/card_type_5/"; break;
            case CardFace.CARD_FACE_6: path = "zh_CN/game/dzpoker/card/card_type_6/"; break;
            default: path = "zh_CN/game/dzpoker/card/card_type_0/"; break;
        }

        return path;
    }

    /**
     * 获取牌背资源路径(resources文件夹内)
     */
    private _getCardBgResPath(): string {
        let path: string = "";
        let type: CardBack = CardBack.CARD_BACK_0;
        let gameid: number = cv.roomManager.getCurrentGameID();

        if (gameid === cv.Enum.GameId.GameId_Dummy) {
            gameid = this.getGameID();
        }

        switch (gameid) {
            case cv.Enum.GameId.Jackfruit: type = CardBack.CARD_BACK_0; break;
            default: type = cv.tools.GetCardBack(); break;
        }

        let suffix: string = "Pb_01_0";
        switch (type) {
            case CardBack.CARD_BACK_0: suffix = "Pb_01_0"; break;
            case CardBack.CARD_BACK_1: suffix = "Pb_01_1"; break;
            case CardBack.CARD_BACK_2: suffix = "Pb_01_2"; break;
            case CardBack.CARD_BACK_3: suffix = "Pb_01_3"; break;
            case CardBack.CARD_BACK_4: suffix = "Pb_01_4"; break;
            default: break;
        }
        path = `${this._card_back_folder_path}${suffix}`;

        return path;
    }

    /**
     * 更新牌内容
     */
    private _updateContent(): void {
        let suitName: string = "";
        switch (this.eCardSuit) {
            case CardSuit.CARD_SPADE: suitName = "Bhm_"; break;
            case CardSuit.CARD_HEART: suitName = "Rhm_"; break;
            case CardSuit.CARD_CLUB: suitName = "Bcm_"; break;
            case CardSuit.CARD_DIAMOND: suitName = "Rbm_"; break;
            default: suitName = "Bhm_"; break;
        }

        if (this.eCardNum >= CardNum.CARD_2 && this.eCardNum < CardNum.CARD_INVALID) {
            let path: string = cv.StringTools.format("{0}{1}{2}", this._getCardResPath(), suitName, this.eCardNum + 1);
            cv.resMgr.setSpriteFrame(this.img_num.node, path);
            this._hasContent = true;
        } else {
            this.img_back.node.active = true;
        }
    }

    clearContent(): void {
        let path: string = `${this._card_back_folder_path}Pb_02`;
        cv.resMgr.setSpriteFrame(this.img_num.node, path);
        this._hasContent = false;
    }

    /**
     * 当前牌是否设置了牌内容
     */
    hasContent(): boolean {
        return this._hasContent;
    }

    initDefaultValue() {
        this.updateCard();
        this.clearContent();
        this.updateCardFace();
        this.updateCardBack();
        //this.updateCardGray();
    }

    /**
     * 更新牌正面
     */
    updateCardFace(): void {
        let img_face: cc.Sprite = this.node.getComponent(cc.Sprite);
        let path_face: string = `${this._card_back_folder_path}Pb_02`;
        cv.resMgr.setSpriteFrame(img_face.node, path_face);
    }

    /**
     * 更新牌背面
     */
    updateCardBack(): void {
        let path: string = this._getCardBgResPath();
        cv.resMgr.setSpriteFrame(this.img_back.node, path);
    }

    /**
     * 更新牌面
     */
    updateCard(): void {
        this.updateCardFace();
        this._updateContent();
    }

    /**
     * 更新灰度遮罩
     */
    updateCardGray(): void {
        let path: string = `${this._card_back_folder_path}back_m`;
        cv.resMgr.setSpriteFrame(this.img_gray.node, path);
    }

    /**
     * 设置是否显示牌面
     * @param bActive true:显示牌正面, false:显示牌背面
     */
    setFace(bActive: boolean): void {
        this.img_back.node.stopAllActions();
        this.img_cardFace.stopAllActions();
        this.img_cardFace.active = bActive;
        this.img_cardFace.scaleX = 1;

        this.img_back.node.active = !bActive;
        this.img_back.node.scaleX = 1;

        this.img_cardFace.angle = 0;
        this.img_back.node.angle = 0;
    }
    isFace() {
        return this.img_cardFace.active;
    }

    /**
     * 设置是否显示高亮
     */
    setHighLight(bActive: boolean): void {
        if (this.img_light.node.active === bActive) return;
        this.img_light.node.active = bActive;
    }
    isHighLight(): boolean { return this.img_light.node.active; }

    /**
     * 设置是否显示灰度遮罩
     * @param bActive 显隐状态
     * @param opacity 透明度(可以通过设置透明度使得遮罩图不至于太暗)
     */
    setGary(bActive: boolean, opacity: number = 255): void {
        this.img_gray.node.opacity = opacity;
        if (this.img_gray.node.active === bActive) return;
        this.img_gray.node.active = bActive;
    }
    isGray(): boolean { return this.img_gray.node.active; }

    /**
     * 设置是否显示勾选
     */
    setCheck(bActive: boolean): void {
        if (this.img_check.node.active === bActive) return;
        this.img_check.node.active = bActive;
    }
    isCheck(): boolean { return this.img_check.node.active; }

    /**
     * 设置是否显示亮牌
     */
    setEye(bActive: boolean): void {
        if (this.img_eye.node.active === bActive) return;
        this.img_eye.node.active = bActive;
    }
    isEye(): boolean { return this.img_eye.node.active; }

    /**
     * 设置是否显示平分
     */
    setFen(bActive: boolean): void {
        if (this.img_fen.node.active === bActive) return;
        this.img_fen.node.active = bActive;
    }
    isFen(): boolean { return this.img_fen.node.active; }

    /**
     * 设置坐标(把传入的坐标转换为该节点坐标系坐标)
     */
    setDealPos(pos: cc.Vec2): void {
        this.node.convertToNodeSpaceAR(pos, this._dealPos);
    }

    /**
     * 重置节点坐标,旋转角度
     */
    resetPos(): void {
        this.rootNode.setPosition(cc.v2(0, 0));
        this.rootNode.angle = 0;
    }

    /**
     * 设置旋转角度
     */
    setDealRotate(rotate: number): void {
        this._dealRotate = rotate;
    }

    setUnscheduleAllCallbacks() {
        this.unscheduleAllCallbacks();
        this.rootNode.stopAllActions();

        // 重置发牌状态
        this._updateDeal(1);
    }

    deal(delay: number) {
        this.node.active = false;
        //this.img_back.node.runAction(cc.show());
        if (delay == 0) {
            this._onDeal(0);
        } else {
            this.scheduleOnce(this._onDeal, delay);
        }
    }

    private _onDeal(delay: number): void {
        this._dealTime = 0;
        this.rootNode.setPosition(this._dealPos);
        this.rootNode.angle = 0;
        this.node.active = true;
        this.img_back.node.opacity = 0;
        this.schedule(this._updateDeal, 0);

        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/dealcard");
        }
    }

    private _updateDeal(delay: number): void {
        this._dealTime += delay * 2.8;
        if (this._dealTime >= 1.0) {
            this._dealTime = 1.0;
            this.unschedule(this._updateDeal);
            this.rootNode.setPosition(cc.v2(0, 0));
            this.img_back.node.opacity = !this._bBonny ? 255 : 80;
            this.rootNode.angle = this._dealRotate;
        }
        else {
            let fAlpha: number = Math.pow(Math.min(this._dealTime * 2.8, 1.0), 2.0);
            this.img_back.node.opacity = !this._bBonny ? fAlpha * 255 : fAlpha * 80;

            let fRatePos = Math.cos(this._dealTime * Math.PI / 2);
            this.rootNode.setPosition(cc.v2(this._dealPos.x * fRatePos, this._dealPos.y * fRatePos));
            this.rootNode.angle = fRatePos * 360;
        }
    }

    /**
     * 设置透明度  发发看之前为透明，现在改为不透明
     */
    setOp(op: boolean): void {
        this._bBonny = op;
        this.node.opacity = op ? 80 : 255;
        // this.img_num.node.opacity = op ? 80 : 255;
        // this.img_back.node.opacity = op ? 80 : 255;
        // this.img_num.node.opacity = op ? 80 : 255;
    }

    isBonny(): boolean {
        return this._bBonny;
    }

    turn(delay: number, showAction: boolean = false): void {
        this.unschedule(this._realTurn);
        this.scheduleOnce(() => { this._realTurn(showAction); }, delay);
    }

    stopSchedulesAndActions() {
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
    }

    private _realTurn(showAction: boolean): void {
        if (this.isFace()) return;

        if (showAction) {
            this.img_cardFace.active = true;
            this.img_cardFace.runAction(cc.sequence(cc.scaleTo(0.13, 0.01, 1), cc.scaleTo(0.13, 1, 1)));
            let turnCallBack = cc.callFunc(this.hide_Img_back.bind(this));
            this.img_back.node.runAction(cc.sequence(cc.scaleTo(0.13, 0.01, 1), turnCallBack));
        } else {
            this.setFace(true);
        }
    }
    hide_Img_back() {
        this.img_back.node.active = false;
        this.img_back.node.scaleX = 1;
    }

    /**
     * 设置裂纹动画
     * @param bShow            是否显示动画(默认: true)
     * @param zIndex           层级(默认: 0)
     * @param bRemove          隐藏时是否直接从父节点删除自身(默认: true)
     * @param bStayLastFrame   显示时是否直接显示到最后一帧(默认: false, 即从头开始播放)
     */
    setCrackAnim(bShow: boolean, zIndex: number = 0, bRemove: boolean = true, bStayLastFrame: boolean = false): void {
        let crackAnim_name: string = "card_anim_crack";
        let inst: cc.Node = this.rootNode.getChildByName(crackAnim_name);

        if (bShow) {
            if (!inst) {
                inst = cc.instantiate(this.prefab_anim_crack);
                inst.zIndex = zIndex;
                inst.name = crackAnim_name;
                this.rootNode.addChild(inst);
            }

            inst.active = true;
            inst.setPosition(cc.Vec2.ZERO);

            let anim: cc.Animation = inst.getComponent(cc.Animation);
            if (anim) {
                anim.defaultClip.wrapMode = cc.WrapMode.Normal;

                if (bStayLastFrame) {
                    anim.play();
                    let animState: cc.AnimationState = anim.getAnimationState(anim.defaultClip.name);
                    animState.time = animState.duration;
                }
                else {
                    anim.play();
                    // anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                    //     anim.off(cc.Animation.EventType.FINISHED);
                    //     anim.node.removeFromParent();
                    // }, this);
                }
            }
        }
        else {
            if (inst) {
                if (bRemove) {
                    inst.removeFromParent(true);
                    inst.destroy();
                }
                else {
                    let anim: cc.Animation = inst.getComponent(cc.Animation);
                    if (anim) {
                        let crackClip_name: string = anim.defaultClip.name;
                        anim.setCurrentTime(0, crackClip_name);
                        anim.sample(crackClip_name);
                        anim.stop();
                    }
                    inst.active = false;
                }
            }
        }
    }

    onDestroy() {

    }

    showActionD(type: number, isTurn?: boolean) {
        let action = this.rootNode.getComponent(cc.Animation);
        let strname = ["card_middle_d", "card_left_d", "card_down_d"];
        action.play(strname[type]);
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                if (isTurn) {
                    this.turn(0, true)
                }
            }, this)
        }
    }

    //获取牌的值
    public getCardNum() {
        return this.eCardNum;
    }

    //获取牌的花色
    public getCardSuit() {
        return this.eCardSuit;
    }
}
