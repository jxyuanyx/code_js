// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoWidth extends cc.Component {
    @property(cc.Node)
    private fllowNode: cc.Node = null;

    @property(cc.Node)
    private targetNode: cc.Node = null;

    @property
    private space: number = 10;

    onLoad() {
        this.fllowNode.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
    }

    _onSizeChanged() {
        this.targetNode.width = this.fllowNode.width + this.space * 2;
    }

    onDestroy() {
        this.fllowNode.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
    }
}