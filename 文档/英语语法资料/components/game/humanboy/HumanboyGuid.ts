import cv from "../../lobby/cv";

/**
 * 路单引导面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyGuid extends cc.Component {

    @property(cc.Sprite) img_shield: cc.Sprite = null;                      // 遮罩面板
    @property(cc.Sprite) img_touch: cc.Sprite = null;                       // 触摸面板
    @property(cc.Sprite) img_hand: cc.Sprite = null;                        // 手势图
    @property(cc.Label) txt_desc: cc.Label = null;                          // 描述语

    private _srcTouchSize: Readonly<cc.Size> = cc.size(200, 100);           // 原始触摸面板大小
    private _touchSizeScale: cc.Vec2 = cc.Vec2.ZERO;                        // 触摸面板区域大小缩放比例(用于增大或缩小触摸区域)

    protected onLoad(): void {
        this._initUI();
    }

    protected start(): void {
    }

    private _initUI(): void {
        this.resetShieldImg();
        this.resetTouchImg();
        cv.resMgr.adaptWidget(this.node);
    }

    private _layout(benchMarkNode: cc.Node): void {
        let tmpSize: cc.Size = cc.size(this._srcTouchSize);
        let tmpPos: cc.Vec2 = cc.Vec2.ZERO;
        this.img_touch.node.setAnchorPoint(0.5, 0.5);

        if (benchMarkNode) {
            // 计算大小
            let sz: cc.Size = cc.size(benchMarkNode.getContentSize());
            if (sz.width > 0) tmpSize.width = sz.width;
            if (sz.height > 0) tmpSize.height = sz.height;

            if (this._touchSizeScale.x != 0) tmpSize.width *= this._touchSizeScale.x;
            if (this._touchSizeScale.y != 0) tmpSize.height *= this._touchSizeScale.y;

            // 计算位置
            let worldPos: cc.Vec2 = cc.Vec2.ZERO;
            benchMarkNode.parent.convertToWorldSpaceAR(benchMarkNode.position, worldPos);
            let nodePos: cc.Vec2 = cc.Vec2.ZERO;
            this.img_touch.node.parent.convertToNodeSpaceAR(worldPos, nodePos);

            let offsetAnchor: cc.Vec2 = cc.Vec2.ZERO;
            offsetAnchor.x = this.img_touch.node.anchorX - benchMarkNode.anchorX;
            offsetAnchor.y = this.img_touch.node.anchorY - benchMarkNode.anchorY;

            tmpPos.x = nodePos.x + offsetAnchor.x * sz.width;
            tmpPos.y = nodePos.y + offsetAnchor.y * sz.height;
        }

        this.img_touch.node.setContentSize(tmpSize);
        this.img_touch.node.setPosition(tmpPos);

        // 计算"手势图"位置
        do {
            this.img_hand.node.setAnchorPoint(cc.v2(0.5, 1.0));
            this.img_hand.node.setPosition(cc.v2(tmpPos.x - 10, tmpPos.y));
        } while (0);

        // 计算"描述语"位置
        do {
            this.txt_desc.node.setAnchorPoint(0.5, 0.5);
            this.txt_desc.node.setPosition(cc.v2(this.img_hand.node.x, this.img_hand.node.y - this.img_hand.node.height - 43));
        } while (0);
    }

    /**
     * 重置遮罩底图属性
     */
    resetShieldImg(): void {
        this.img_shield.node.active = true;
        this.img_shield.node.color = cc.Color.BLACK;
        this.img_shield.node.opacity = 0.6 * 255;
    }

    /**
     * 重置触摸底图属性
     */
    resetTouchImg(): void {
        this.img_touch.node.active = true;
        this.img_touch.node.color = cc.Color.BLACK;
        this.img_touch.node.opacity = 0;
    }

    /**
     * 设置触摸缩放比例
     */
    setTouchSizeScale(scaleX: number, scaleY: number): void {
        this._touchSizeScale.x = scaleX;
        this._touchSizeScale.y = scaleY;
    }

    /**
     * 设置描述语
     */
    setDescString(text: string): void {
        this.txt_desc.string = text;
    }

    /**
     * 获取描述语
     */
    getDescString(): string {
        return this.txt_desc.string;
    }

    /**
     * 显示引导
     * @param benchMarkNode - 参照节点
     * @param callback      - 触摸回调
     * @param showShield    - 是否显示遮罩
     */
    show(benchMarkNode: cc.Node, callback: () => void, showShield: boolean): void {
        if (!benchMarkNode) return;

        this.node.active = true;
        this._layout(benchMarkNode);
        this.img_touch.node.on(cc.Node.EventType.TOUCH_END, (sender: cc.Node): void => {
            if (callback) callback();
            this.hide();
        });

        if (showShield) {
            this.resetShieldImg();
        }
        else {
            this.img_shield.node.active = true;
            this.img_shield.node.opacity = 0;
        }

        // action
        let blink: cc.ActionInterval = cc.blink(1, 1);
        let forever: cc.ActionInterval = cc.repeatForever(blink);
        this.img_hand.node.runAction(forever);
    }

    /**
     * 隐藏引导
     */
    hide(): void {
        this.img_hand.node.stopAllActions();
        this.node.active = false;
    }
}
