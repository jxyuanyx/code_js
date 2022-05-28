/**
 * 礼物发送按钮动画
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GiftAnimSend extends cc.Component {
    @property(cc.ParticleSystem3D) particle3D: cc.ParticleSystem3D = null;
    @property(cc.Animation) anim: cc.Animation = null;

    static g_class_name: string = "GiftAnimSend";

    /**
     * 自动播放
     * @param wpos 
     * @param width 
     * @param isSpecialGift 
     */
    play(wpos: cc.Vec2, width: number, isSpecialGift: boolean): void {
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        this.node.parent.convertToNodeSpaceAR(wpos, pos);
        this.node.setPosition(pos);
        this.node.active = true;

        let clips: cc.AnimationClip[] = this.anim.getClips();
        let index: number = isSpecialGift ? 0 : 1;
        if (index < clips.length) {
            this.anim.play(clips[index].name);
            this.anim.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
                this.anim.off(cc.Animation.EventType.FINISHED);
                this._reset();
            }, this);
        }

        // 动态修改粒子效果范围
        let shapeModule: cc.ShapeModule = this.particle3D.shapeModule;
        if (shapeModule.scale.x !== width) {
            shapeModule.scale.x = width;
            this.particle3D.shapeModule = shapeModule;
        }

        this.particle3D.stop();
        this.particle3D.play();
    }

    protected onLoad(): void {
        this._reset();
    }

    protected start(): void {
    }

    private _reset(): void {
        let clips: cc.AnimationClip[] = this.anim.getClips();
        for (let i = 0; i < clips.length; ++i) {
            this.anim.stop(clips[i].name);
            this.anim.currentClip = null;
        }

        this.particle3D.stop();

        this.node.active = false;
    }
}
