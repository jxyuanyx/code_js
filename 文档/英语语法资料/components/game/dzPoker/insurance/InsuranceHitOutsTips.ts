import cv from "../../../../components/lobby/cv";

/**
 * 击中保险tips提示动画
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceHitOutsTips extends cc.Component {
    @property(cc.Sprite) img_bg: cc.Sprite = null;
    @property(cc.Label) txt_value: cc.Label = null;

    private _bShowActing: boolean = false;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.hideAnim();
    }

    protected start(): void {
    }

    private _reset(): void {
        this.node.stopAllActions();
        this.node.opacity = 0xFF;

        this.img_bg.node.stopAllActions();
        this.img_bg.node.setPosition(cc.Vec2.ZERO);
        this.img_bg.node.opacity = 0xFF;

        this.txt_value.node.stopAllActions();
        this.txt_value.node.setPosition(cc.Vec2.ZERO);
        this.txt_value.node.opacity = 0xFF;

        this._bShowActing = false;
    }

    showAnim(amount: number): void {
        if (this._bShowActing) return;
        this._bShowActing = true;

        let px: number = 0;
        let py: number = 0;

        px = this.img_bg.node.x - this.img_bg.node.width * this.img_bg.node.anchorX - cc.winSize.width * this.node.anchorX;
        py = this.img_bg.node.y;
        this.img_bg.node.setPosition(px, py);

        let strKey: string = cv.config.getStringData("Insurance_bg_tips_hit_outs");
        this.txt_value.string = cv.StringTools.formatC(strKey, cv.String(-Math.abs(cv.StringTools.numberToShowNumber(amount))));
        px = this.txt_value.node.x + cv.resMgr.getLabelStringSize(this.txt_value).width * this.txt_value.node.anchorX + cc.winSize.width * this.node.anchorX;
        py = this.txt_value.node.y;
        this.txt_value.node.setPosition(px, py);

        let mt: cc.ActionInterval = cc.moveTo(0.2, cc.Vec2.ZERO).easing(cc.easeOut(3.0));
        let fade: cc.ActionInterval = cc.fadeOut(0.3);

        this.img_bg.node.active = true;
        this.img_bg.node.runAction(cc.sequence(mt, cc.delayTime(1)));

        this.txt_value.node.active = true;
        this.txt_value.node.runAction(cc.sequence(mt.clone()
            , cc.moveBy(0.05, cc.v2(-10, 0))
            , cc.moveBy(0.05, cc.v2(10, 0))
            , cc.moveBy(0.05, cc.v2(-5, 0))
            , cc.moveBy(0.05, cc.v2(5, 0))
            , cc.delayTime(0.8)));

        this.node.active = true;
        this.node.runAction(cc.sequence(cc.delayTime(0.2 + 1), fade, cc.callFunc((): void => {
            this.hideAnim();
        })));
    }

    hideAnim(): void {
        this._reset();
        this.img_bg.node.active = false;
        this.txt_value.node.active = false;
        this.node.active = false;
    }
}
