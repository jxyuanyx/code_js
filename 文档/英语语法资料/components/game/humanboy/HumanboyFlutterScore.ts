import cv from "../../lobby/cv";

/**
 * 百人飘分
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyFlutterScore extends cc.Component {

    @property(cc.Sprite) img: cc.Sprite = null;
    @property(cc.Label) txt: cc.Label = null;

    private _img_src_size: cc.Size = cc.Size.ZERO;

    protected onLoad(): void {
        this._img_src_size = cc.size(this.img.node.getContentSize());
    }

    protected start(): void { }

    private _layout(text: string): void {
        let offset: cc.Size = cc.size(80, 0);
        let szText: cc.Size = cv.resMgr.getLabelStringSize(this.txt, text);
        let max_w: number = Math.max(this._img_src_size.width, szText.width + offset.width);
        let max_h: number = Math.max(this._img_src_size.height, szText.height + offset.height);
        this.img.node.setContentSize(max_w, max_h);
        this.txt.node.setPosition(cc.Vec2.ZERO);
    }

    init(text: string): void {
        this._layout(text);
    }

    show(anim: boolean = true): void {
        this.node.active = true;
        if (anim) {
            let seq1: cc.ActionInterval = cc.sequence(cc.delayTime(1.3), cc.moveBy(1.5, cc.v2(0, 50)), cc.destroySelf());
            let seq2: cc.ActionInterval = cc.sequence(cc.delayTime(1.4), cc.fadeOut(1.5).easing(cc.easeInOut(1.0)));
            this.node.runAction(cc.sequence(cc.spawn(seq1, seq2), cc.callFunc((): void => {
                this.node.removeFromParent(true);
                cv.tools.destroyNode(this.node);
            })));
        }
    }
}
