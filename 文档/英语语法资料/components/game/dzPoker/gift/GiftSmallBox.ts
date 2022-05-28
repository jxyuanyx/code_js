import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { GiftData, GiftNewsInfo } from "./GiftData";
import { GiftPanelDetail } from "./GiftPanelDetail";
import { GiftSmallBoxItem } from "./GiftSmallBoxItem";
import { TableView, TableViewScrollToDir } from "../../../../common/tools/TableView";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftSmallBox extends cc.Component {
    @property(cc.Prefab) prefab_detail: cc.Prefab = null;
    @property(cc.Sprite) icon: cc.Sprite = null;
    @property(TableView) view: TableView = null;
    @property(cc.Node) shield: cc.Node = null;

    private _panel_detail: GiftPanelDetail = null;

    protected onLoad(): void {
        this.node.on("click", this._onClick, this);
        this.shield.on(cc.Node.EventType.TOUCH_END, this._onClick, this);
    }

    protected start(): void {
        this._updateView();
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
        cv.MessageCenter.register(GiftData.GIFT_MSG_NOTICE_NEWS, this._onMsgGiftNews.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_NOTICE_NEWS, this.node);
    }

    private _updateView(): void {
        let infos: readonly GiftNewsInfo[] = cv.GameDataManager.tGiftData.getGiftNewsInfoByNewsType(game_pb.NewsType.NewsType_Tip);
        this.icon.node.active = infos.length <= 0;
        this.view.node.active = infos.length > 0;

        if (this.view.node.active) {
            let objs: any = { prefab_type: 0, prefab_component: GiftSmallBoxItem, prefab_datas: infos };
            this.view.bindData(objs);
            this.view.reloadView();
            this.view.scrollToDir(TableViewScrollToDir.BOTTOM);
        }
    }

    /**
     * 监听"礼物/弹幕"消息
     * @param t 
     */
    private _onMsgGiftNews(t: GiftNewsInfo): void {
        if (!t.gift || t.gift.newsType !== game_pb.NewsType.NewsType_Tip) return;
        this._updateView();
    }

    private _createInst(node: cc.Prefab | cc.Node, zorder?: number, parentNode?: cc.Node, pos?: cc.Vec2): cc.Node {
        if (!cv.tools.isValidNode(node)) return null;

        let v2_size: cc.Vec2 = cc.Vec2.ZERO;
        let v2_scale: cc.Vec2 = cc.Vec2.ZERO;

        if (!parentNode) {
            parentNode = cc.director.getScene();
            v2_size.x = cc.winSize.width;
            v2_size.y = cc.winSize.height;
        }
        else {
            v2_size.x = parentNode.width;
            v2_size.y = parentNode.height;
        }

        v2_scale.x = parentNode.scaleX;
        v2_scale.y = parentNode.scaleY;

        zorder = zorder ? zorder : 0;

        let inst: cc.Node = null;
        if (node instanceof cc.Prefab) {
            inst = cc.instantiate(node);
        }
        else {
            inst = node;
        }

        pos = pos ? pos : (inst.getAnchorPoint().sub(parentNode.getAnchorPoint())).scaleSelf(v2_size).scaleSelf(v2_scale);
        inst.setPosition(pos);
        parentNode.addChild(inst, zorder);

        return inst;
    }

    private _onClick(): void {
        cv.AudioMgr.playButtonSound("button_click");

        if (!this._panel_detail) {
            let inst: cc.Node = this._createInst(this.prefab_detail, cv.Enum.ZORDER_TYPE.ZORDER_4);
            this._panel_detail = inst.getComponent(GiftPanelDetail);
            this._panel_detail.node.active = true;
        }

        this._panel_detail.autoShow();
    }
}
