// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export class ButtonScaler extends cc.Component {
    @property(Number)
    pressedScale: number = 1;
    @property(Number)
    transDuration: number = 0;
    initScale: number = 0;
    button: cc.Button = null;
    scaleDownAction: cc.ActionInterval = null;
    scaleUpAction: cc.ActionInterval = null;

    onLoad () {
        var self = this;
        // var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng')
        // if (audioMng) {
        //     audioMng = audioMng.getComponent('AudioMng');
        // }
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown (event) {
            this.stopAllActions();
            // if (audioMng) audioMng.playButton();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp (event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
}
