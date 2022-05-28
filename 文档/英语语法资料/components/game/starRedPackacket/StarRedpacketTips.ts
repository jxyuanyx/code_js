import cv from "../../lobby/cv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class StarRedpacketTips extends cc.Component {

    @property(cc.Label) label: cc.Label = null;
    onLoad(){
        cv.resMgr.adaptWidget(this.node, true);
    }

    show(str:string)
    {
        this.label.string = str;
        this.node.active = true;
        this.node.x = cv.config.WIDTH + cv.config.WIDTH / 2;
        let move0 = cc.moveTo(0.2, cc.v2(cv.config.WIDTH / 2, this.node.y)).easing(cc.easeBackOut());
        let move1 = cc.moveTo(0.2, cc.v2(-cv.config.WIDTH / 2, this.node.y)).easing(cc.easeBackOut());
        this.node.runAction(cc.sequence(move0, cc.delayTime(2), move1, cc.callFunc(() => {
            this.node.stopAllActions();
            this.node.active = false;
        }, this)))
    }
}
