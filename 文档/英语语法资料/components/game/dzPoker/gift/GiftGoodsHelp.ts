import cv from "../../../lobby/cv";
import { GiftPanel } from "./GiftPanel";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftGoodsHelp extends cc.Component {
    @property(cc.Node) panel: cc.Node = null;
    @property(cc.Label) txt: cc.Label = null;
    @property(cc.Node) img_shield: cc.Node = null;

    static g_class_name: string = "GiftGoodsHelp";
    private _txt_scr_size: cc.Size = cc.Size.ZERO;
    private _panel_scr_size: cc.Size = cc.Size.ZERO;

    /**
     * 自动显示
     * @param benchMarkNode 参照的节点
     * @param isAnim 
     */
    autoShow(benchMarkNode: cc.Node, isAnim: boolean = true): void {
        this._layoutPanel();
        this._adaptPanelPos(benchMarkNode);
        this._autoSelectAnimFunc(true, isAnim);
    }

    /**
     * 自动隐藏
     * @param isAnim 
     */
    autoHide(isAnim: boolean = true): void {
        this._autoSelectAnimFunc(false, isAnim);
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onClick, this);

        this._txt_scr_size = cc.size(cv.resMgr.getLabelStringSize(this.txt));
        this._panel_scr_size = cc.size(this.panel.getContentSize());
    }

    protected start(): void {
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerEvent();
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterEvent();
        }
    }

    private _registerEvent(): void {
        cv.MessageCenter.register(`${GiftPanel.g_class_name}_hide`, this._onMsgHideGiftPanel.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister(`${GiftPanel.g_class_name}_hide`, this.node);
    }

    private _autoSelectAnimFunc(isOpen: boolean, isAnim: boolean, callback: () => void = null): void {
        this.node.active = true;
        let duration: number = 0.3;
        let seq: cc.Action = null;

        if (isOpen) {
            this.panel.setScale(0);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.panel.setScale(1);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
                if (callback) callback();
            });

            if (isAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 1.0);
                let ebo: cc.ActionInterval = st.easing(cc.easeBackOut());
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            this.panel.setScale(1);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.panel.setScale(0);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
                this.node.active = false;
                if (callback) callback();
            });

            if (isAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 0);
                let ebi: cc.ActionInterval = st.easing(cc.easeBackIn());
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this.panel.runAction(seq);
            this.img_shield.active = true;
            this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }

    private _layoutPanel(): void {
        let wrapReplace: string = "\n  ";
        let skipSplit: boolean = cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN;
        let srcStrDesc: string = cv.config.getStringData("Gift_question_des");
        let tarStrDesc: string = cv.StringTools.calculateAutoWrapString(this.txt.node, srcStrDesc, wrapReplace, skipSplit);
        this.txt.string = tarStrDesc;

        let szText: cc.Size = cv.resMgr.getLabelStringSize(this.txt);
        let offset_h: number = szText.height - this._txt_scr_size.height;
        offset_h = Math.max(0, offset_h);

        this.panel.setContentSize(this._panel_scr_size.width, this._panel_scr_size.height + offset_h);
        cv.resMgr.adaptWidget(this.panel, true);
    }

    private _adaptPanelPos(benchMarkNode: cc.Node): void {
        let offset_h: number = 0;
        let worldPos: cc.Vec2 = cc.Vec2.ZERO;
        let nodeSize: cc.Size = cc.size(benchMarkNode.getContentSize());
        benchMarkNode.parent.convertToWorldSpaceAR(benchMarkNode.position, worldPos);
        worldPos.y -= nodeSize.height * benchMarkNode.anchorY + offset_h;
        worldPos.y -= this.panel.height * (1 - this.panel.anchorY);
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this.panel.parent.convertToNodeSpaceAR(worldPos, nodePos);
        this.panel.setPosition(nodePos);
    }

    private _onClick(target: cc.Button): void {
        this.autoHide();
    }

    /**
     * 礼物面板隐藏了, 该附属的面板直接销毁(不常用就不用缓存实例)
     */
    private _onMsgHideGiftPanel(): void {
        this.node.removeFromParent();
        cv.tools.destroyNode(this.node);
    }
}
