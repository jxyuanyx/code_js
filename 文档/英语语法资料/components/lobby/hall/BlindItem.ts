import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class BlindItem extends cc.Component {
    updateSVReuseData(data: any, info: any, i: any) {
        this.node.getChildByName("level").getComponent(cc.Label).string = info.bb_100;
        this.node.getChildByName("bb").getComponent(cc.Label).string = info.bb_value;
        if (info.bb_100 > 0) {
            this.node.getChildByName("level").getComponent(cc.Label).string = "+" + this.node.getChildByName("level").getComponent(cc.Label).string;
            this.node.getChildByName("level").color = cv.tools.getWinColor();
        }
        else if (info.bb_100 == 0) {
            this.node.getChildByName("level").color = cc.Color.WHITE;
        }
        else
        {
            this.node.getChildByName("level").color = cv.tools.getLoseColor();
        }
    }
}