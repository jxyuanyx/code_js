import cv from "../../../lobby/cv";
import { LANGUAGE_TYPE } from "../../../../common/tools/Enum";
import { TableView } from "../../../../common/tools/TableView";

import { GiftPanel } from "./GiftPanel";
import { GiftCountInfo } from "./GiftData";
import { GiftGoodsCountItem } from "./GiftGoodsCountItem";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftGoodsCount extends cc.Component {
    @property(cc.Node) panel: cc.Node = null;
    @property(TableView) view: TableView = null;
    @property(cc.Node) img_shield: cc.Node = null;

    static g_class_name: string = "GiftGoodsCount";
    private _view_scr_size: cc.Size = cc.Size.ZERO;
    private _panel_scr_size: cc.Size = cc.Size.ZERO;

    /**
     * 自动显示
     * @param benchMarkNode 参照的节点
     * @param gift_id       礼物id
     * @param lastCount     上次保留数量
     * @param isAnim        是否动画
     */
    autoShow(benchMarkNode: cc.Node, gift_id: number, lastCount: number = 1, isAnim: boolean = true): void {
        this._layoutPanel(gift_id, lastCount, benchMarkNode.width);
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

        this._view_scr_size = cc.size(this.view.node.getContentSize());
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
        cv.MessageCenter.register(`${GiftGoodsCountItem.g_class_name}_click`, this._onClickItem.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister(`${GiftPanel.g_class_name}_hide`, this.node);
        cv.MessageCenter.unregister(`${GiftGoodsCountItem.g_class_name}_click`, this.node);
    }

    private _autoSelectAnimFunc(isOpen: boolean, isAnim: boolean): void {
        this.node.active = true;
        let duration: number = 0.3;
        let seq: cc.Action = null;

        if (isOpen) {
            this.panel.setScale(0);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.panel.setScale(1);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
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

    private _layoutPanel(gift_id: number, lastCount: number, width: number): void {
        let countsInfo: readonly GiftCountInfo[] = cv.GameDataManager.tGiftData.getGiftCountInfoListByID(gift_id);

        // 计算实际允许的可视行数
        let limit_count: number = 6;
        let view_count: number = countsInfo.length;
        view_count = Math.max(1, countsInfo.length);
        view_count = Math.min(limit_count, view_count);

        let w: number = width + 30 * 2; // this._panel_scr_size.width;
        let h: number = this._panel_scr_size.height + this._view_scr_size.height * (view_count - 1);
        this.panel.setContentSize(w, h);
        cv.resMgr.adaptWidget(this.panel, true);
        this.view.resetScrollVewSize(this.view.node.getContentSize(), true);

        // 中文有描述语(钻石除外)
        let prefab_type: number = cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN ? 0 : 1;
        if (gift_id === 1) prefab_type = 1;

        // 绑定数据, 初始化列表
        let obj: any = { prefab_type: prefab_type, prefab_component: GiftGoodsCountItem, prefab_datas: countsInfo };
        this.view.bindData(obj);

        // 上次选中的索引
        let curIndex: number = countsInfo.length;
        for (let i = 0; i < countsInfo.length; ++i) {
            countsInfo[i].isSelect = false;
            if (lastCount === countsInfo[i].count) {
                curIndex = i;
                countsInfo[i].isSelect = true;
            }
        }
        let viewOffset: cc.Vec2 = cc.Vec2.ZERO;
        let offsetIndex: number = curIndex - limit_count + 1;
        if (offsetIndex > 0) {
            viewOffset.y += this.view.paddingStart;
            viewOffset.y += offsetIndex > 1 ? (curIndex - 1) * this.view.spacing : 0;
            viewOffset.y += offsetIndex * this._view_scr_size.height;
            viewOffset.y = Math.min(viewOffset.y, this.view.getMaxScrollOffset().y);
        }

        // 刷新列表
        this.view.reloadView();
        this.view.scrollToOffsetEx(viewOffset);
    }

    private _adaptPanelPos(benchMarkNode: cc.Node): void {
        let offset_h: number = - 35 + 20;
        let worldPos: cc.Vec2 = cc.Vec2.ZERO;
        let nodeSize: cc.Size = cc.size(benchMarkNode.getContentSize());
        benchMarkNode.parent.convertToWorldSpaceAR(benchMarkNode.position, worldPos);
        worldPos.y += nodeSize.height * (1 - benchMarkNode.anchorY) + offset_h;
        worldPos.y += this.panel.height * this.panel.anchorY;
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this.panel.parent.convertToNodeSpaceAR(worldPos, nodePos);
        this.panel.setPosition(nodePos);
    }

    /**
     * 面板点击
     */
    private _onClick(): void {
        this.autoHide();
        cv.MessageCenter.send(`${GiftGoodsCount.g_class_name}_click`);
    }

    /**
     * "item"点击事件
     * @param data 
     */
    private _onClickItem(data: GiftCountInfo): void {
        this.autoHide(false);
        cv.MessageCenter.send(`${GiftGoodsCount.g_class_name}_click`, data);
    }

    /**
     * 礼物面板隐藏了, 该附属的面板也顺带隐藏
     */
    private _onMsgHideGiftPanel(): void {
        this.autoHide(false);
    }
}
