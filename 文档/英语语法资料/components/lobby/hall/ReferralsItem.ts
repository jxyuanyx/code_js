import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "./../cv";
import { CircleSprite } from "../../../common/tools/CircleSprite";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ReferralsItem extends cc.Component {

    @property(cc.Sprite) bg_img: cc.Sprite = null;
    @property(cc.Sprite) role_img: cc.Sprite = null;
    @property(cc.Label) name_text: cc.Label = null;
    @property(cc.Label) id_text: cc.Label = null;
    @property(cc.Label) number: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    _index: number = 0;
    // onLoad () {}

    start() {

    }

    updateSVReuseData(index: number, dataArray: Array<world_pb.ReferralsItem>): void {
        if (index < 0 || dataArray.length <= 0 || dataArray.length - 1 < index)
            return;
        this._index = index;

        let alpha = index % 2 == 0 ? 170 : 255;
        this.bg_img.node.opacity = alpha;

        CircleSprite.setCircleSprite(this.role_img.node, dataArray[index].head, dataArray[index].plat);

        this.name_text.string = dataArray[index].name;
        this.number.string = cv.StringTools.numToFloatString(dataArray[index].rebate);
        this.id_text.string = "ID:" + cv.String(dataArray[index].uid);
    }

    // update (dt) {}
}
