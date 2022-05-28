import cv from "../../lobby/cv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node) goldList: cc.Node[] = [];
    @property(cc.Node) particle: cc.Node = null;

    onLoad () {

    }

    /**
     *金币移动动画 
     * startPos: 开始坐标
     * endPos: 结束坐标
     * moveTime: 移动时间
     * interval: 每个金币之间的间隔时间
     * offset: 结束坐标偏移范围
     * callback: 动画结束回调（可选）
     **/
    runGoldMoveAction(startPos:cc.Vec2, endPos:cc.Vec2, moveTime:number, interval:number, offset:cc.Vec2, callback?: () => void)
    {
        let start = this.node.convertToNodeSpaceAR(startPos);
        let end = this.node.convertToNodeSpaceAR(endPos);
        for (let i = 0; i < this.goldList.length; i++) {
            let node = cc.instantiate(this.goldList[i]);
            let particle = cc.instantiate(this.particle); // 粒子要自己运动才有拖尾 不能让父节点带动
            this.node.addChild(node);
            this.node.addChild(particle);
            node.active = true;
            particle.active = true;
            node.opacity = 0;
            particle.opacity = 0;
            node.setPosition(start);
            particle.setPosition(start);
            particle.getComponent(cc.ParticleSystem).resetSystem();
            let offsetX = offset.x * Math.random() * 2 - offset.x;
            let offsetY = offset.y * Math.random() * 2 - offset.y;
            
            let pos = cc.v2(end.x + offsetX, end.y + offsetY);
            node.runAction(cc.sequence(cc.delayTime(i * interval), cc.fadeIn(0.1), cc.moveTo(moveTime - 0.2, pos), cc.fadeOut(0.1), cc.callFunc(() => {
                if(i == this.goldList.length - 1 && callback){
                    callback();
                }
            }, this), cc.destroySelf()));
            particle.runAction(cc.sequence(cc.delayTime(i * interval), cc.fadeIn(0.1), cc.moveTo(moveTime - 0.2, pos), cc.fadeOut(0.1), cc.destroySelf()));
        }
    }
}
