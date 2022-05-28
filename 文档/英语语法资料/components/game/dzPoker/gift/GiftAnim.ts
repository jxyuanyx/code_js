import cv from "../../../lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftAnim extends cc.Component {
    @property(cc.Label) txt: cc.Label = null;
    @property(cc.Animation) hitScaleAnim: cc.Animation = null;
    @property([cc.Node]) bgNodes: cc.Node[] = [];

    static g_class_name: string = "GiftAnim";
    private _loopWaitTime: number = 5;
    private _isSpecial: boolean = false;
    private _anim: cc.Animation = null;
    private _clips: cc.AnimationClip[] = [];
    private _particles: cc.ParticleSystem[] = [];
    private _finishCallBack: () => void = null;
    private _playEndClicpCallBack: () => void = null;

    /**
     * 播放动画
     * @param wpos      目标世界坐标
     * @param dir       目标方位
     * @param count     文本显示数值
     * @param finish    动画结束回调
     * @param isOverlap 同一个实例是否叠加显示数量(×1, ×2, ×3 ...)
     */
    play(wpos: cc.Vec2, dir: number, count: number, playEndClip: () => void, finish: () => void, isOverlap: boolean = false): void {
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        this.node.parent.convertToNodeSpaceAR(wpos, pos);
        this.node.setPosition(pos);
        this.node.active = true;

        this._finishCallBack = finish;
        this._playEndClicpCallBack = playEndClip

        // 设置缩放比例
        let scaleRatio: number = 1;
        let isShowBgNodes: boolean = true;
        switch (dir) {
            case cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN:         // 左边中和中下
            case cv.Enum.SeatDriction.DRICTION_LEFT_UP: {               // 左边中上
                scaleRatio = this._isSpecial ? 0.4 : 0.6;
                isShowBgNodes = false;
            } break;

            case cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN:        // 右边中和中下
            case cv.Enum.SeatDriction.DRICTION_RIGHT_UP:                // 右边中上
            case cv.Enum.SeatDriction.DRICTION_TOP_RIGHT: {             // 顶部右边
                scaleRatio = this._isSpecial ? 0.4 : 0.6;
                isShowBgNodes = false;
            } break;

            case cv.Enum.SeatDriction.DRICTION_TOP_LEFT:                // 顶部左边(9人桌是顶部左, 其余是顶部)
            case cv.Enum.SeatDriction.DRICTION_BOTTOM:                  // 最下面
            default: {
            } break;
        }

        // 缩放
        this.node.setScale(scaleRatio);

        // 按照需求(若座位在两侧则隐藏动画的背景图及粒子)
        for (let i = 0; i < this.bgNodes.length; ++i) {
            this.bgNodes[i].active = isShowBgNodes;
        }

        // 普通礼物直接显示数量, 特殊礼物有自己的显示动画
        if (!this._isSpecial) {
            this.txt.node.active = true;
            this.txt.string = `x${count}`;
        }

        // 特殊动画有3个剪辑(start, loop, end)
        if (isOverlap && this._isSpecial) {
            if (this._anim.currentClip) {
                this._playHitScaleAnim(count);
                this._resetLoopClipSchedule();
            }
            else {
                this._playStartClip(count);
            }
        }
        // 普通动画就一个
        else {
            this._playStartClip(count);
        }
    }

    stop(): void {
        for (let i = 0; i < this._clips.length; ++i) {
            this._anim.stop(this._clips[i].name);
            this._anim.currentClip = null;
        }

        for (let i = 0; i < this._particles.length; ++i) {
            this._particles[i].stopSystem();
            this._particles[i].node.active = false;
        }

        this.txt.node.active = false;
        this._anim.node.active = false;
        this._anim.node.targetOff(this);
        this.unscheduleAllCallbacks();
        this._finishCallBack = null;
        this._playEndClicpCallBack = null;
    }

    protected onLoad(): void {
        this.txt.node.active = false;
        this._anim = this.node.getComponent(cc.Animation);
        this._clips = this._anim.getClips();
        this._isSpecial = this._clips.length > 1;

        // 初始化粒子对象数组
        let initParticles: (node: cc.Node) => void = (node: cc.Node): void => {
            let component: cc.ParticleSystem = node.getComponent(cc.ParticleSystem);
            if (component) {
                this._particles.push(component);
            }

            for (let i = 0; i < node.childrenCount; ++i) {
                initParticles(node.children[i]);
            }
        }
        initParticles(this.node);
    }

    protected start(): void {
    }

    /**
     * 该节点出池时触发(NodePool.get)
     */
    protected reuse(): void {
        console.log(`${GiftAnim.g_class_name} - pool node reuse`);
    }

    /**
     * 该节点入池时触发(NodePool.put)
     */
    protected unuse(): void {
        console.log(`${GiftAnim.g_class_name} - pool node unuse`);
        this.stop();
    }

    /**
     * 特殊礼物轨迹结束后显示更新数量动画
     */
    private _playHitScaleAnim(count: number): void {
        this.scheduleOnce((): void => {
            this.txt.node.active = true;
            this.txt.string = `x${count}`;
            if (this.hitScaleAnim) this.hitScaleAnim.play();
        }, 0.4);
    }

    private _playStartClip(count: number): void {
        for (let i = 0; i < this._particles.length; ++i) {
            // 父节点可见, 则激活子节点的粒子动画
            if (this._particles[i].node.parent.active) {
                this._particles[i].node.active = true;
                this._particles[i].resetSystem();
            }
        }

        this._anim.play(this._clips[0].name);
        this._anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
            this._anim.off(cc.Animation.EventType.FINISHED);
            if (this._isSpecial) {
                let clips: cc.AnimationClip[] = this._anim.getClips();
                let loopClip: cc.AnimationClip = clips[1];
                loopClip.wrapMode = cc.WrapMode.Loop;
                this._anim.play(loopClip.name);

                // 首次第一阶段动画播完后, 第二阶段的实际等待时间
                let delayTime: number = this._loopWaitTime - this._clips[0].duration;
                this._resetLoopClipSchedule(delayTime);
            }
            else {
                if (this._finishCallBack) this._finishCallBack();
            }
        }, this);

        // 若是首次特殊动画且文本显示的数量 > 1则显示"更新数量动画"
        if (this._isSpecial && count > 1) this._playHitScaleAnim(count);
    }

    private _resetLoopClipSchedule(delayTime: number = this._loopWaitTime): void {
        this.unschedule(this._onLoopClipSchedule);
        this.scheduleOnce(this._onLoopClipSchedule, delayTime);
    }

    /**
     * 定时器回调(播放结束动画)
     */
    private _onLoopClipSchedule(): void {
        let endClip: cc.AnimationClip = this._clips[2];
        if (endClip) {
            this._anim.play(endClip.name);
            if (this._playEndClicpCallBack) this._playEndClicpCallBack();

            this._anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                this._anim.off(cc.Animation.EventType.FINISHED);
                if (this._finishCallBack) this._finishCallBack();
            }, this);
        }
        else {
            if (this._finishCallBack) this._finishCallBack();
        }
    }
}
