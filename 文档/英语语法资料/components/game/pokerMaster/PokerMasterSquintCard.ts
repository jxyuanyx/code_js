import cv from "../../lobby/cv";
import { RubCard } from "../../../../Shader/RubCard/RubCard";
import PokerMasterDataMgr from "./PokerMasterDataMgr";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import { PokerMasterDef } from "./PokerMasterDef";
import { pokermaster_proto } from "../../../../Script/common/pb/pokermaster";
import CowboyCard from "../cowboy/CowboyCard";
import { HashMap } from "../../../common/tools/HashMap";
import PeekCard from "./PeekCard";

/**
 * 扑克大师 眯牌面板预制件
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class PokerMasterSquintCard extends cc.Component {
    @property(cc.Prefab) prefab_rub_card: cc.Prefab = null;                                                                     // 眯牌shader预制件
    @property(cc.Prefab) prefab_peek_card: cc.Prefab = null;                                                                     // 眯牌动画预制件
    @property(cc.SpriteAtlas) atlas_pm_pokermaster: cc.SpriteAtlas = null;                                                      // 扑克大师图集
    @property(cc.Sprite) img_shield: cc.Sprite = null;                                                                          // 屏蔽层
    @property(cc.Sprite) img_toast: cc.Sprite = null;                                                                           // 计时提示
    @property(cc.Sprite) img_face: cc.Sprite = null;                                                                            // 底牌正面
    @property(cc.Sprite) img_back: cc.Sprite = null;                                                                            // 底牌背面
    // @property(cc.Sprite) img_suit_lu: cc.Sprite = null;                                                                         // 左上角花色
    // @property(cc.Sprite) img_suit_rd: cc.Sprite = null;                                                                         // 右下角花色
    @property(cc.Label) txt_toast: cc.Label = null;                                                                             // 计时提示文本
    @property(cc.Node) outs_bg: cc.Node = null;
    @property(cc.Animation) zhiyin_ani: cc.Animation = null;
    @property(cc.Node) aniTouch: cc.Node = null;

    private _toastTip: string = "";
    private _leftTime: number = 0;
    private _squintShader: RubCard = null;
    private _isSquintFinish: boolean = false;

    private _srcScale: number = 1;
    private _srcAngle: number = 0;
    private _srcPos: cc.Vec2 = cc.Vec2.ZERO;

    private _isViewLuckTurnTables: boolean = false;
    private _cardNum: number = 0;
    private _cardSuit: number = 0;
    private _isCreateShade: boolean = false;
    private _bCanSquint: boolean = false;

    private _sharkOuts: pokermaster_proto.OutItem[] = [];
    private _dashiOuts: pokermaster_proto.OutItem[] = [];
    private outMap: HashMap<cc.Node, CowboyCard[]> = new HashMap();
    private isIphoneX_area: boolean = false;

    private _PeekCard: PeekCard = null;

    show(bCanSquint: boolean, cardNum: number, cardSuit: number, leftTime: number, sharkOuts: pokermaster_proto.OutItem[], dashiOuts: pokermaster_proto.OutItem[], isIphoneX_area: boolean): void {
        this.isIphoneX_area = isIphoneX_area;
        this._bCanSquint = bCanSquint;
        this.node.active = true;
        this._resetView();
        this._cardNum = cardNum;
        this._cardSuit = cardSuit;
        this._isCreateShade = false;
        // 启动定时器
        this._leftTime = leftTime;

        // 自己是否可以眯牌
        this.img_shield.node.active = false;
        this.node.zIndex = PokerMasterDef.LayerZorder.Z_IDX_PANEL_COUNT_DOWN;
        this.node.getComponent(cc.BlockInputEvents).enabled = false;
        this._sharkOuts = sharkOuts;
        this._dashiOuts = dashiOuts;

        this.showSquintCard();

        if (bCanSquint) {
            this._toastTip = cv.config.getStringData("PokerMaster_tips_insure_self_squint");
        }
        else {
            // this._toastTip = cv.config.getStringData(PokerMasterDataMgr.getPokerMasterRoom().uWhoIsLeader == 1 ? "PokerMaster_tips_insure_other_squint_1" : "PokerMaster_tips_insure_other_squint_0");
            this._toastTip = cv.config.getStringData("PokerMaster_tips_insure_other_squint_1");
        }


        if (this._leftTime > 0) this._startClock();
    }

    hide(): void {
        this._resetView();
        this.node.active = false;
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this._srcScale = this.img_back.node.scale;
        this._srcAngle = this.img_back.node.angle;
        this._srcPos = cc.v2(this.img_back.node.position);
        cv.MessageCenter.register("LuckTurntables_isView", this.sendLuckTurnTablesView.bind(this), this.node);           //开启或关闭透传到扑克大师，影响眯牌是否显示
        this.outs_bg.active = false;
        if (LANGUAGE_TYPE.zh_CN != cv.config.getCurrentLanguage()) {
            this.txt_toast.fontSize = 36;
        }
    }

    protected start() {
    }

    onDestroy() {
        cv.MessageCenter.unregister("LuckTurntables_isView", this.node);
    }

    private _createShade(autoShow: boolean = false): void {
        if (this._squintShader) return;
        this.img_shield.node.active = true;
        this.node.zIndex = PokerMasterDef.LayerZorder.Z_IDX_PANEL_SQUINT;
        this.node.getComponent(cc.BlockInputEvents).enabled = true;
        this._isCreateShade = true;

        this.img_face.node.active = false;
        this.img_back.node.active = false;
        let frameName: string = this._getSquintCardFrameName(this._cardNum, this._cardSuit);
        let faceCardPath = this._getSquintCardFacePath() + frameName;
        let backCardPath = this._getSquintCardBackPath();
        if (autoShow) {
            if (!this._PeekCard) {
                this._PeekCard = cc.instantiate(this.prefab_peek_card).getComponent(PeekCard);
                this.node.addChild(this._PeekCard.node);
                this._PeekCard.node.setPosition(this.img_back.node.position);
                this._PeekCard.node.setContentSize(400 + 40, 560 + 40);
                this._PeekCard.setTopNodeRadioNum(-90);
                this._PeekCard.setCardSize(cc.size(400, 560))

                this._PeekCard._moveSpeed = 0.1;
                this._PeekCard.angleFixed = 0;
            }

            this._PeekCard.setCardBack(backCardPath);
            this._PeekCard.setCardFace(faceCardPath);
            //  x.setShadow(this.shadow);
            //  x.setFinger(this.HelloWorld, 1);
            //  x.setFinger(this.HelloWorld, 2);
            this._PeekCard.init();
            this._PeekCard.setAutoPlay(false);
            this._PeekCard.node.active = true;

            let time = this._leftTime - 4.5;
            if (time > 0) {
                this.scheduleOnce(() => {
                    if (this._PeekCard && this._PeekCard.node.active) {
                        this._PeekCard.setAutoPlay(true);
                    }
                }, time);
            }
            else {
                if (this._PeekCard && this._PeekCard.node.active) {
                    this._PeekCard.setAutoPlay(true);
                }
            }

            return;
        }

        this._squintShader = cc.instantiate(this.prefab_rub_card).getComponent(RubCard);
        this._squintShader.setFaceTextureFileName(faceCardPath);
        this._squintShader.setBackTextureFileName(backCardPath);
        this._squintShader.setScale(this.img_back.node.scale);
        this._squintShader.setPosition(this.img_back.node.position.x, this.img_back.node.position.y);
        this._squintShader.setCallBack((dir: number, angle: number): void => {
            this._squintShader = null;
            this._isSquintFinish = true;

            // 已经眯开, 移除眯牌shader节点后, 恢复底牌
            this._showFace(this._cardNum, this._cardSuit, angle);
        });

        this._squintShader.node.active = true;
        this.node.addChild(this._squintShader.node);
        if (autoShow) {
            this._squintShader.showAuto();
            this.scheduleOnce(() => {
                if (this._squintShader) {
                    this._squintShader.beginFlip();
                }
            }, 2.0);
        }
    }

    private _resetView(): void {
        this.resetZhiyinAni();
        this.resetOut();
        this.node.stopAllActions();
        cc.director.getScheduler().unscheduleAllForTarget(this.node);

        this.img_toast.node.active = false;
        this.img_shield.node.active = true;
        this._isSquintFinish = false;

        this.img_face.node.active = false;
        this.img_face.node.stopAllActions();
        this.img_face.node.setScale(this._srcScale);
        this.img_face.node.angle = this._srcAngle;
        this.img_face.node.setPosition(this._srcPos);

        this.img_back.node.active = false;
        this.img_back.node.stopAllActions();
        this.img_back.node.setScale(this._srcScale);
        this.img_back.node.angle = this._srcAngle;
        this.img_back.node.setPosition(this._srcPos);

        // 清除shader
        if (this._squintShader) {
            this._squintShader.node.removeFromParent(true);
            this._squintShader.destroy();
            this._squintShader = null;
        }

        if (this._PeekCard) {
            this._PeekCard.node.active = false;
            this._PeekCard.setAutoPlay(false);
        }

    }

    private _showFace(cardNum: number, cardSuit: number, angle: number): void {
        this.img_face.node.active = true;
        this.img_back.node.active = false;
        this.img_face.node.angle = angle;

        let frameName: string = this._getSquintCardFrameName(cardNum, cardSuit);
        cv.resMgr.setSpriteFrame(this.img_face.node, this._getSquintCardFacePath() + frameName);
        // this.img_suit_lu.spriteFrame = this.atlas_pm_pokermaster.getSpriteFrame(frameName);
        // this.img_suit_rd.spriteFrame = this.atlas_pm_pokermaster.getSpriteFrame(frameName);
    }

    private _showBack(): void {
        this.img_face.node.active = false;
        this.img_back.node.active = true;
    }

    private _getSquintCardFrameName(cardNumber: number, cardSuit: number): string {
        let suit: string = "";
        switch (cardSuit) {
            case cv.Enum.CardSuit.CARD_SPADE: suit = "Bhm_"; break;
            case cv.Enum.CardSuit.CARD_HEART: suit = "Rhm_"; break;
            case cv.Enum.CardSuit.CARD_CLUB: suit = "Bcm_"; break;
            case cv.Enum.CardSuit.CARD_DIAMOND: suit = "Rbm_"; break;
            default: suit = "Bhm_"; break;
        }
        return `${suit}${cardNumber + 1}`;
    }

    /**
     * 获取眯牌资源
     * @param cardNumber 
     * @param cardSuit 
     */
    private _getSquintCardFacePath(): string {
        return `zh_CN/game/pokermaster/rubcard/`;
    }

    /**
     * 获取眯牌资源
     * @param cardNumber 
     * @param cardSuit 
     */
    private _getSquintCardBackPath(): string {
        return "zh_CN/game/pokermaster/rubcard/card_back";
    }

    private _startClock(): void {
        this._updateToastTip();
        this.unschedule(this._onTimeClock);
        if (this._leftTime > 0) {
            this.schedule(this._onTimeClock, 1.0);
        }
    }

    private _stopClock(): void {
        this.unschedule(this._onTimeClock);

        // 隐藏屏蔽层, 提示语
        this.img_toast.node.active = false;
        this.img_shield.node.active = false;

        // 清除shader
        if (this._squintShader) {
            this._squintShader.node.removeFromParent(true);
            this._squintShader.destroy();
            this._squintShader = null;
        }

        // 若眯牌shader没有翻开, 则显示底牌牌背
        if (!this._isSquintFinish) {
            this._showBack();
        }
    }

    private _onTimeClock(): void {
        if (--this._leftTime >= 0) {
            this._updateToastTip();
            this.showSquintCard();
        }
        else {
            this._stopClock();
        }
    }

    private _updateToastTip(): void {
        this.img_toast.node.active = !this._isViewLuckTurnTables;
        this.txt_toast.string = cv.StringTools.formatC(this._toastTip, this._leftTime);
    }

    sendLuckTurnTablesView(isView: boolean): void {
        this._isViewLuckTurnTables = isView;
    }

    private showOuts(sharkOuts: pokermaster_proto.OutItem[], dashiOuts: pokermaster_proto.OutItem[]) {
        let sharkLen = sharkOuts.length;
        let dashiLen = dashiOuts.length;
        if (sharkLen <= 0 && dashiLen <= 0) {
            this.resetOut();
            return;
        }

        let midLen_0 = this.isIphoneX_area ? 25 : 21;
        let midLen_1 = this.isIphoneX_area ? 8 : 6;
        let oneLen_0 = (midLen_0 - 1) / 2;
        let tempwidth = this.outs_bg.width;

        let showOutFunc = (msg: pokermaster_proto.OutItem[], showLen: number, startIndex: number, outBg: cc.Node) => {
            let arr = this.outMap.get(outBg);
            outBg.active = true;
            let cardPath: Readonly<string> = "zh_CN/game/pokermaster/card_type_0/";
            let outLen = arr.length;
            let tempCard = outBg.getChildByName("card");

            if (showLen < outLen) {
                for (let i = outLen - 1; i >= showLen; --i) {
                    arr[i].node.removeFromParent(true);
                    arr[i].node.destroy();
                    arr.pop();
                }
            }
            else if (showLen > outLen) {
                for (let i = outLen; i < showLen; ++i) {
                    let card: CowboyCard = CowboyCard.create(cardPath, cardPath);
                    card.ResetFromNode(tempCard);
                    card.node.name = "card_map_" + i;
                    arr.push(card);
                }
            }

            outBg.setContentSize(tempwidth + (showLen - 1) * 74, 186);
            outBg.getComponent(cc.Layout).updateLayout();

            for (let i = 0; i < showLen; ++i) {
                arr[i].SetContent(msg[startIndex + i].card.number, msg[startIndex + i].card.suit);
                arr[i].SetFace(true);
            }
            this.outMap.add(outBg, arr);
        }

        let setOutBgPos = (bg: cc.Node, index: number, direction: number) => {
            if (index == 0) {
                if (direction == 0) {
                    bg.setAnchorPoint(0.5, 0.5);
                    bg.setPosition(this.outs_bg.position);
                }
                else if (direction == -1) {
                    bg.setAnchorPoint(1, 0.5);
                    bg.setPosition(tempwidth / 2 - 35.5 - 7, this.outs_bg.y);
                }
                else if (direction == 1) {
                    bg.setAnchorPoint(0, 0.5);
                    bg.setPosition(-tempwidth / 2 + 35.5 + 7, this.outs_bg.y);
                }

            }
            else {
                if (direction == 0) {    //中心
                    bg.setAnchorPoint(1, 0.5);
                    bg.setPosition(this.outs_bg.x + (tempwidth + (midLen_0 - 1) * 74) / 2, this.outs_bg.y - index * 105);
                }
                else if (direction == -1) {    //左侧 
                    bg.setAnchorPoint(0, 0.5);
                    bg.setPosition(this.outs_bg.x - (tempwidth + (midLen_0 - 1) * 74) / 2 + tempwidth / 2 - 35.5 - 7 - 3, this.outs_bg.y - index * 105);
                }
                else if (direction == 1) {    //右侧 
                    bg.setAnchorPoint(1, 0.5);
                    bg.setPosition(this.outs_bg.x + (tempwidth + (midLen_0 - 1) * 74) / 2 - (tempwidth / 2 - 35.5 - 7) + 3, this.outs_bg.y - index * 105);
                }

            }
        }


        let setOuts = (bgNum: number, msg: pokermaster_proto.OutItem[], msgLen: number, direction: number): number => {
            let tempResult = bgNum;
            for (let i = 0; i < msgLen;) {
                let outbg = this.node.getChildByName("outbg_map_" + bgNum);
                if (!outbg) {
                    outbg = cc.instantiate(this.outs_bg);
                    outbg.name = "outbg_map_" + bgNum;
                    this.outs_bg.parent.addChild(outbg);
                    this.outMap.add(outbg, []);
                }

                let tempLen = direction == 0 ? midLen_0 : oneLen_0;
                if (i > 0) {
                    tempLen = midLen_1;
                }

                setOutBgPos(outbg, bgNum - tempResult, direction);

                if (i + tempLen >= msgLen) {
                    showOutFunc(msg, msgLen - i, i, outbg);
                }
                else {
                    showOutFunc(msg, tempLen, i, outbg);
                }
                i += tempLen;
                bgNum = bgNum + 1;
            }
            return bgNum;
        }

        let msg: pokermaster_proto.OutItem[] = [];
        if (sharkLen <= 0 || dashiLen <= 0) {
            let msgLen = 0;
            if (sharkLen == 0) {
                msgLen = dashiLen;
                msg = dashiOuts;
            }
            else {
                msgLen = sharkLen;
                msg = sharkOuts;
            }

            setOuts(0, msg, msgLen, 0);

        }
        else {
            let result = setOuts(0, dashiOuts, dashiLen, -1);
            setOuts(result, sharkOuts, sharkLen, 1);
        }
    }

    private resetOut() {
        this.outMap.forEach((key: cc.Node, value: CowboyCard[]) => {
            key.active = false;
        });
    }

    private showZhiyinAni() {
        let storeGuideKey = "master_squintCard_guide";
        if (cv.tools.GetStringByCCFile(storeGuideKey) != "true") {
            this._isCreateShade = true;
            this._showBack();
            this.zhiyin_ani.node.active = true;
            this.zhiyin_ani.play();
            this.aniTouch.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
                let hasShowGuide = "true";
                cv.tools.SaveStringByCCFile(storeGuideKey, hasShowGuide);

                this._createShade();
                if (this._squintShader.unregisterEvent) {
                    this.aniTouch.targetOff(this);
                    return;
                }
                this._squintShader.node.emit(cc.Node.EventType.TOUCH_START, event);
                this.zhiyin_ani.stop();
                this.zhiyin_ani.node.active = false;
            }, this);

            this.aniTouch.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
                this._squintShader.node.emit(cc.Node.EventType.TOUCH_MOVE, event);
                if (this._squintShader.unregisterEvent) {
                    this.aniTouch.targetOff(this);
                    return;
                }
            }, this);

            this.aniTouch.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
                this._squintShader.node.emit(cc.Node.EventType.TOUCH_END, event);
                if (this._squintShader.unregisterEvent) {
                    this.aniTouch.targetOff(this);
                    return;
                }
            }, this);

            this.aniTouch.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
                this._squintShader.node.emit(cc.Node.EventType.TOUCH_CANCEL, event);
                if (this._squintShader.unregisterEvent) {
                    this.aniTouch.targetOff(this);
                    return;
                }
            }, this);
        }
        else {
            this._createShade();
        }
    }

    private resetZhiyinAni() {
        this.zhiyin_ani.stop();
        this.zhiyin_ani.node.active = false;

        this.aniTouch.targetOff(this);
    }

    private showSquintCard() {
        if (this._isCreateShade) return;
        if (!this._isViewLuckTurnTables) {
            this.showOuts(this._sharkOuts, this._dashiOuts);

            if (this._bCanSquint) {
                this.showZhiyinAni();
            }
            else {
                this._createShade(true);
            }
        }
    }
}
