/**
 * 礼物爱心轨迹动画
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GiftAnimOrbit extends cc.Component {
    @property(cc.ParticleSystem) particle_heart: cc.ParticleSystem = null;
    @property(cc.ParticleSystem) particle_hitSpark: cc.ParticleSystem = null;
    @property(cc.ParticleSystem) particle_hitEffect: cc.ParticleSystem = null;

    @property(cc.Node) node_hit: cc.Node = null;
    @property(cc.Node) img_starBurst: cc.Node = null;

    static g_class_name: string = "GiftAnimOrbit";

    /**
     * 自动显示
     * @param srcWPos   原始世界坐标
     * @param tarWPos   目标世界坐标
     * @param finish    结束回调
     */
    play(srcWPos: cc.Vec2, tarWPos: cc.Vec2, arrived: () => void, finish: () => void): void {
        let sp: cc.Vec2 = cc.Vec2.ZERO;
        let tp: cc.Vec2 = cc.Vec2.ZERO;
        this.node.parent.convertToNodeSpaceAR(srcWPos, sp);
        this.node.parent.convertToNodeSpaceAR(tarWPos, tp);
        this.node.position = sp;
        this.node.active = true;

        let delay: number = 0;
        let bezier_during: number = 0.4;
        let burst_during: number = 0.3;

        // 粒子运动轨迹
        this.particle_heart.node.active = true;
        this.particle_heart.resetSystem();
        this.node.runAction(cc.sequence(cc.delayTime(delay), this._createBezier(bezier_during, sp, tp), cc.callFunc((): void => {
            // 运动到目的地
            console.log(`${GiftAnimOrbit.g_class_name} - Effect has arrived`);
            if (arrived) arrived();
        })));
        delay += bezier_during;

        // 爆裂动画
        this.img_starBurst.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc((): void => {
            this.node_hit.active = true;
            this.particle_hitSpark.node.active = true;
            this.particle_hitEffect.node.active = true;
            this.particle_hitSpark.resetSystem();
            this.particle_hitEffect.resetSystem();
        }), cc.scaleTo(burst_during, 3), cc.scaleTo(burst_during, 0)));
        delay += 2 * burst_during;

        this.node.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc((): void => {
            // 动画完毕
            console.log(`${GiftAnimOrbit.g_class_name} - Effect is finished`);
            if (finish) finish();
        })));
    }

    protected onLoad(): void {
        this._reset();
    }

    protected start(): void {
    }

    /**
     * 该节点出池时触发(NodePool.get)
     */
    protected reuse(): void {
        console.log(`${GiftAnimOrbit.g_class_name} - pool node reuse`);
    }

    /**
     * 该节点入池时触发(NodePool.put)
     */
    protected unuse(): void {
        console.log(`${GiftAnimOrbit.g_class_name} - pool node unuse`);
        this._reset();
    }

    private _reset(): void {
        this.node.active = true;
        this.node.stopAllActions();

        this.img_starBurst.active = true;
        this.img_starBurst.stopAllActions();

        this.particle_heart.stopSystem();
        this.particle_hitSpark.stopSystem();
        this.particle_hitEffect.stopSystem()
        this.particle_heart.node.active = false;
        this.particle_hitSpark.node.active = false;
        this.particle_hitEffect.node.active = false;

        this.node_hit.active = false;
        this.img_starBurst.scale = 0;
        this.node.active = false;
    }

    /**
     * 创建贝塞尔曲线轨迹(三阶曲线)
     * @param t             时间
     * @param startPoint    起点
     * @param endPoint      终点
     * @param angle         角度(默认:30)
     */
    private _createBezier(t: number, startPoint: cc.Vec2, endPoint: cc.Vec2, angle: number = 30): cc.ActionInterval {
        // 计算弧度(固定临边宽度通过正切函数手动调整对边高度)
        let radian: number = angle * Math.PI / 180;

        // 第1个控制点
        let p1: cc.Vec2 = cc.Vec2.ZERO;
        p1.x = endPoint.x;
        p1.y = startPoint.y + p1.x * Math.tan(radian);

        // 第2个控制点
        let p2: cc.Vec2 = cc.Vec2.ZERO;
        p2.x = p1.x;
        p2.y = p1.y + (endPoint.y - p1.y) * 2 / 3;

        return cc.bezierTo(t, [p1, p2, endPoint]);
    }
}
