import gs_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { GiftData } from "./GiftData";
import { TableView } from "../../../../common/tools/TableView";
import { CustomToggle } from "../../../lobby/customToggle/CustomToggle";

export class GiftGoodsItemInfo {
    isCheck: boolean = false;
    info: game_pb.TipFeeInfo = null;
}

export class GiftGoodsItemData {
    items: GiftGoodsItemInfo[] = [];
}

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftGoodsItem extends cc.Component {

    @property({ type: [CustomToggle] }) node_items: CustomToggle[] = [];

    static g_class_name: string = "GiftGoodsItem";
    private _dataRef: GiftGoodsItemData = null;

    private _txt_name: cc.Label[] = [];
    private _txt_price: cc.Label[] = [];
    private _img_icon: cc.Sprite[] = [];
    private _img_coin: cc.Sprite[] = [];

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);

        for (let i = 0; i < this.node_items.length; ++i) {
            let txt_name: cc.Label = this.node_items[i].node.getChildByName("txt_name").getComponent(cc.Label);
            let img_icon: cc.Sprite = this.node_items[i].node.getChildByName("img_icon").getComponent(cc.Sprite);

            let img_coin: cc.Sprite = this.node_items[i].node.getChildByName("img_coin").getComponent(cc.Sprite);
            let txt_price: cc.Label = img_coin.node.getChildByName("txt").getComponent(cc.Label);

            this._txt_name.push(txt_name);
            this._img_icon.push(img_icon);
            this._img_coin.push(img_coin);
            this._txt_price.push(txt_price);

            this.node_items[i].node.on("toggle", (t: CustomToggle): void => { this._onToggleClick(i, t) }, this);
        }
    }

    protected start(): void {

    }

    private _onToggleClick(idx: number, t: CustomToggle): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (!this._dataRef) return;
        if (idx < 0 || idx >= this._dataRef.items.length) return;

        let info: GiftGoodsItemInfo = this._dataRef.items[idx];
        info.isCheck = t.isChecked;
        cv.MessageCenter.send(`${GiftGoodsItem.g_class_name}_click`, info);
    }

    updateSVReuseData(index: number, data: GiftGoodsItemData, view?: TableView): void {
        this._dataRef = data;

        for (let i = 0; i < this.node_items.length; ++i) {
            let toggle: CustomToggle = this.node_items[i];
            toggle.node.active = i < data.items.length;
            if (!toggle.node.active) continue;

            let t: GiftGoodsItemInfo = data.items[i];
            toggle.isChecked = t.isCheck;

            let gift_id: number = t.info.tipId;
            this._img_icon[i].spriteFrame = null;
            this._img_coin[i].spriteFrame = null;
            let iconFrame: string = `gift_icon_${gift_id}`;
            let coinframe: string = `gift_coin_bg_${t.info.tipId < 1000 ? 1 : 2}`;
            let atlasPath: string = GiftData.GIFT_PLIST_PATH;

            this._img_icon[i].spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, iconFrame);
            this._img_coin[i].spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, coinframe);
            this._txt_name[i].string = cv.config.getStringData(`Gift_category_${gift_id}`);
            this._txt_price[i].string = cv.StringTools.numToFloatString(t.info.fee);
        }
    }
}
