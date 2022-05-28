import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../Script/components/lobby/cv";

/**
 * 邮件附件物品
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MailGoods extends cc.Component {

    @property(cc.Sprite) img_icon: cc.Sprite = null;
    @property(cc.Label) txt_num: cc.Label = null;
    @property(cc.Label) txt_desc: cc.Label = null;

    protected onLoad(): void { }

    protected start(): void { }

    setData(data: world_pb.AttachmentInfo): void {
        if (!data) return;

        // 图标(动态下载)
        this.img_icon = null;

        // 数量
        this.txt_num.string = cv.StringTools.formatC("%u", data.item_num);

        // 名称
        this.txt_desc.string = data.item_name;
    }
}
