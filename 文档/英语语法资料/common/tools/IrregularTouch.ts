// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class IrregularTouch extends cc.Component {
    _oldHitTest: Function = null;
    onLoad() {
        let temp: any = this.node;
        temp._oldHitTest = temp._hitTest.bind(this.node);
        temp._hitTest = this.polygonHitTest.bind(this.node);
    }

    /**
     * 不规则多边形触摸测试
     * @param {触摸点} point 
     * @param {监听} listener 
     */
    polygonHitTest(point, listener) {
        let node: any = this;
        var polygonCollider = node.getComponent(cc.PolygonCollider);
        if (polygonCollider) {
            point = node.convertToNodeSpace(point);
            point.x -= node.getContentSize().width / 2;
            point.y -= node.getContentSize().height / 2;
            return cc.Intersection.pointInPolygon(point, polygonCollider.points);
        } else {
            return node._oldHitTest(point, listener);
        }
    }
}
