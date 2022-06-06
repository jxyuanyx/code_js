import cv from "../../../lobby/cv";
import { GiftCountInfo } from "./GiftData";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftGoodsCountItem extends cc.Component {
    @property(cc.Node) img_select: cc.Node = null;
    @property(cc.Label) txt_count: cc.Label = null;
    @property(cc.Label) txt_desc: cc.Label = null;

    static g_class_name: string = "GiftGoodsCountItem";
    private _dataRef: GiftCountInfo = null;
    private _txt_color_normal: cc.Color = cc.Color.WHITE;
    private _txt_color_selected: cc.Color = cc.color(0xFF, 0xAB, 0x00);

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.node.on("click", this._onClick, this);
    }

    protected start(): void {

    }

    private _onClick(): void {
        this.txt_count.node.color = this._txt_color_selected;
        if (this.txt_desc) { this.txt_desc.node.color = this._txt_color_selected; }
        cv.MessageCenter.send(`${GiftGoodsCountItem.g_class_name}_click`, this._dataRef);
    }

    updateSVReuseData(index: number, data: GiftCountInfo): void {
        this._dataRef = data;
        this.img_select.active = data.isSelect;

        let txt_color: cc.Color = this._txt_color_normal;;
        if (data.isSelect) { txt_color = this._txt_color_selected; }

        this.txt_count.string = cv.String(data.count);
        this.txt_count.node.color = txt_color;

        if (this.txt_desc) {
            this.txt_desc.string = data.desc;
            this.txt_desc.node.color = txt_color;
        }
    }
}
