import cv from "../../lobby/cv";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


const { ccclass, property } = cc._decorator;

@ccclass
export default class CowboyCard extends cc.Component {
    m_eNumber: number = cv.Enum.CardNum.CARD_10;
    m_eSuit: number = cv.Enum.CardSuit.CARD_SPADE;

    m_strCardFacePath: string = "zh_CN/game/cowboy/card_type_0/";
    m_strCardBackPath: string = "zh_CN/game/cowboy/card_type_0/";

    m_bIsFace: boolean = true;
    m_bIsGray: boolean = true;
    m_bActionDone: boolean = true;
    m_bIsBonny: boolean = false;

    m_kDealPos: cc.Vec2 = new cc.Vec2(0, 0);
    m_f32DealTime: number = 0;
    m_DealRotate: number = 0;

    m_pkRoot: cc.Node = null;
    m_pkCardFace: cc.Node = null;
    m_pkNumber: cc.Sprite = null;
    m_pkCardBack: cc.Sprite = null;
    m_pkGray: cc.Sprite = null;
    static CARD_SPECIAL: number = 255;

    static create(strFacePath?: string, strBackPath?: string): CowboyCard {
        let pRet: CowboyCard = new CowboyCard();
        if (pRet && pRet.init(strFacePath, strBackPath)) {
            return pRet;
        }
        return null;
    }

    init(strFacePath: string, strBackPath: string): boolean {
        this.node = new cc.Node();
        if (cv.StringTools.getArrayLength(strFacePath) > 0) {
            this.m_strCardFacePath = strFacePath;
        }
        if (cv.StringTools.getArrayLength(strBackPath) > 0) {
            this.m_strCardBackPath = strBackPath;
        }

        this.m_pkRoot = new cc.Node();
        this.node.addChild(this.m_pkRoot, 0);

        this.m_pkCardFace = new cc.Node();
        this.m_pkRoot.addChild(this.m_pkCardFace, 0);

        let tempNode = new cc.Node();
        this.m_pkCardFace.addChild(tempNode, 0);
        this.m_pkNumber = tempNode.addComponent(cc.Sprite);

        this.m_pkCardBack = this.createSprite(this.m_pkRoot, 0, this.getCowboyCardBackPath() + "Pb_01");
        this.m_pkGray = this.createSprite(this.m_pkRoot, 8, this.getCowboyCardFacePath() + "back_m");

        this.UpdateContent();
        this.Gray(false);
        this.SetFace(false);

        this.node.setAnchorPoint(cc.v2(0.5, 0.5));
        this.node.setContentSize(this.m_pkNumber.node.getContentSize());

        return true;
    }

    ResetFromNode(node: cc.Node): void {
        node.active = (false);
        if (!this.node.parent) {
            node.getParent().addChild(this.node);
        }

        this.node.setAnchorPoint(node.getAnchorPoint());
        this.node.setPosition(node.getPosition());
        this.node.angle = node.angle;
        this.node.setScale(node.scale);

        // 关闭裁剪模式(保持精灵原样)
        this.m_pkNumber.trim = false;
        this.m_pkCardBack.trim = false;
        this.m_pkGray.trim = false;
    }

    SetContent(eNum: number, eSuit: number): void {
        if (eNum == CowboyCard.CARD_SPECIAL) {
            eNum = cv.Enum.CardNum.CARD_2;
        }
        if (eSuit == CowboyCard.CARD_SPECIAL) {
            eSuit = cv.Enum.CardSuit.CARD_DIAMOND;
        }
        if (this.m_eNumber != eNum || this.m_eSuit != eSuit) {
            this.m_eNumber = eNum;
            this.m_eSuit = eSuit;
            this.UpdateContent();
        }
    }

    GetNumber(): number {
        return this.m_eNumber;
    }

    GetSuit(): number {
        return this.m_eSuit;
    }

    UpdateContent() {
        let suitName: string = "";

        switch (this.m_eSuit) {
            case cv.Enum.CardSuit.CARD_SPADE:
                suitName = "Bhm_";
                break;
            case cv.Enum.CardSuit.CARD_HEART:
                suitName = "Rhm_";
                break;
            case cv.Enum.CardSuit.CARD_CLUB:
                suitName = "Bcm_";
                break;
            case cv.Enum.CardSuit.CARD_DIAMOND:
                suitName = "Rbm_";
                break;
            default:
                break;
        }
        if (suitName.length > 0) {
            cv.resMgr.setSpriteFrame(this.m_pkNumber.node, this.getCowboyCardFacePath() + suitName + cv.String(this.m_eNumber + 1));
        }
    }

    getCowboyCardFacePath(): string {
        return this.m_strCardFacePath;
    }

    getCowboyCardBackPath(): string {
        return this.m_strCardBackPath;
    }

    SetFace(IsFace: boolean): void {
        this.m_bIsFace = IsFace;
        this.m_pkCardFace.active = (IsFace);
        this.m_pkCardBack.node.active = (!IsFace);
        this.m_pkCardFace.stopAllActions();
        this.m_pkCardBack.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.m_pkCardBack.node.setScale(1, 1);
        this.m_pkCardFace.setScale(1, 1);
        // cocos2d::OrbitCamera* orbitFront = cocos2d::OrbitCamera::create(0.0f,1,0,0,0,0,0);
        // this.m_pkCardFace.runAction(orbitFront);
        // cocos2d::OrbitCamera* orbitFront2 = cocos2d::OrbitCamera::create(0.0f,1,0,0,0,0,0);
        // this.m_pkCardBack.runAction(orbitFront2);
        this.m_bActionDone = true;
    }

    Turn(IsFace: boolean, f32Delay?: number): void {
        f32Delay = f32Delay != undefined ? f32Delay : 0.0;
        this.unscheduleAllCallbacks();
        this.scheduleOnce(() => { this.RealTurn(IsFace); }, f32Delay);
    }

    RealTurn(IsFace: boolean) {
        if (!cc.isValid(this, true) || !cc.isValid(this.m_pkCardFace, true))    return;
        if (IsFace == this.m_bIsFace) return;

        this.SetFace(!IsFace);

        let orbitFront = cc.scaleTo(0.3 * 0.5, 1, 1);
        let orbitBack = cc.scaleTo(0.3 * 0.5, 0, 1);
        if (IsFace) {
            this.m_bActionDone = false;

            this.m_bIsFace = false;
            this.m_pkCardBack.node.active = true;
            this.m_pkCardFace.active = false;
            this.m_pkCardBack.node.setScale(1, 1);
            this.m_pkCardBack.node.runAction(cc.sequence(orbitBack, cc.callFunc(function () {
                this.m_pkCardBack.node.active = false;
                this.m_pkCardBack.node.setScale(1, 1);
                this.m_pkCardFace.active = true;
                this.m_pkCardFace.setScale(0, 1);
                this.m_pkCardFace.runAction(cc.sequence(orbitFront, cc.callFunc(function () {
                    this.m_bActionDone = true;
                    this.m_bIsFace = true;
                }.bind(this))));
            }.bind(this))));
        }
        else {
            this.m_bActionDone = false;
            this.m_bIsFace = false;
            this.m_pkCardBack.node.active = false;
            this.m_pkCardFace.active = true;
            this.m_pkCardFace.setScale(1, 1);
            this.m_pkCardFace.runAction(cc.sequence(orbitBack, cc.callFunc(function () {
                this.m_pkCardFace.active = false;
                this.m_pkCardFace.setScale(1, 1);
                this.m_pkCardBack.node.active = true;
                this.m_pkCardBack.node.setScale(0, 1);
                this.m_pkCardBack.node.runAction(cc.sequence(orbitFront, cc.callFunc(function () {
                    this.m_bActionDone = true;
                    this.m_bIsFace = true;
                }.bind(this))));
            }.bind(this))));
        }
    }

    Gray(IsGray: boolean): void {
        if (this.m_bIsGray != IsGray) {
            this.m_bIsGray = IsGray;
            this.m_pkGray.node.active = (this.m_bIsGray);
        }
    }

    SetDealPos(kPos: cc.Vec2) {
        // 	m_kDealPos = convertToNodeSpaceAR(kPos);
        // 
        //     AffineTransform kTransform = getNodeToWorldAffineTransform();
        //     m_kDealPos.x = kPos.x - kTransform.tx;
        //     m_kDealPos.y = kPos.y - kTransform.ty;

        this.m_kDealPos = this.node.convertToNodeSpaceAR(kPos);
    }

    ResetPos(): void {
        this.m_pkRoot.setPosition(0, 0);
        this.m_pkRoot.angle = 0;
    }

    SetDealRotate(rotate: number): void {
        this.m_DealRotate = rotate;
        this.m_bActionDone = true;
    }

    Deal(f32Delay: number): void {
        this.node.active = (false);
        this.scheduleOnce(this.OnDeal, f32Delay);
    }

    OnDeal(f32Delta: number): void {
        this.m_f32DealTime = 0.0;
        this.m_pkRoot.setPosition(this.m_kDealPos);
        this.m_pkCardBack.node.opacity = (0);
        this.m_pkRoot.angle = 0;
        this.node.active = (true);
        this.schedule(this.UpdateDeal, 0.0);
        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/cowboy/audio/dealcard");
        }
    }

    UpdateDeal(f32Delta: number): void {
        this.m_f32DealTime += f32Delta * 4.0;
        if (this.m_f32DealTime >= 1.0) {
            this.m_f32DealTime = 1.0;
            this.unschedule(this.UpdateDeal);
            this.m_pkRoot.setPosition(0, 0);
            if (!this.m_bIsBonny) {
                this.m_pkCardBack.node.opacity = (255);
            }
            else {
                this.m_pkCardBack.node.opacity = (100);
            }
            this.m_pkRoot.angle = -this.m_DealRotate;
        }
        else {
            let f32Alpha: number = Math.pow(Math.min(this.m_f32DealTime * 4.0, 1.0), 2.0);
            if (!this.m_bIsBonny) {
                this.m_pkCardBack.node.opacity = (f32Alpha * 255);
            }
            else {
                this.m_pkCardBack.node.opacity = (f32Alpha * 100);
            }
            let f32RatePos: number = Math.cos(this.m_f32DealTime * Math.PI * 0.5);
            this.m_pkRoot.setPosition(this.m_kDealPos.x * f32RatePos, this.m_kDealPos.y * f32RatePos);
            this.m_pkRoot.angle = f32RatePos * 360;
        }
    }

    IsBonny(): boolean {
        return this.m_bIsBonny;
    }

    IsFace(): boolean {
        return this.m_bIsFace;
    }

    updateCardBack(path: string): void {
        cv.resMgr.setSpriteFrame(this.m_pkCardBack.node, path);
    }

    getRoot(): cc.Node {
        return this.m_pkRoot;
    }
    getCardBack(): cc.Sprite {
        return this.m_pkCardBack;
    }

    createSprite(parent: cc.Node, zorder: number, path: string): cc.Sprite {
        let node = new cc.Node();
        parent.addChild(node, zorder);
        let tempSprite = node.addComponent(cc.Sprite);
        cv.resMgr.setSpriteFrame(node, path);
        return tempSprite;
    }

    showCard(isView: boolean): void {
        this.m_pkCardBack.node.active = (!isView);
        this.m_pkCardFace.active = (isView);
    }
}
