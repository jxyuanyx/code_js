import ShaderParamComponent from "./common/ShaderParamComponent";
import executeInEditMode = cc._decorator.executeInEditMode;
import disallowMultiple = cc._decorator.disallowMultiple;
import requireComponent = cc._decorator.requireComponent;

const {ccclass, property} = cc._decorator;

@ccclass
//@ts-ignore
@executeInEditMode(true)
//@ts-ignore
@disallowMultiple(true)
@requireComponent(ShaderParamComponent)
export default class BgMoveComp extends cc.Component {

    // @property(ShaderParamComponent)
    private shaderController: ShaderParamComponent = null;

    //每秒移动多少px.
    @property
    private speed: number = 0

    private _time: number = 0;

    private bgOriginWidth: number = 0;

    public setSpeed(speed: number) {
        this.speed = speed;
    }

    public onLoad() {
        this.shaderController = this.getComponent(ShaderParamComponent);

        this.shaderController.setTimeUpdate(false);
        this.shaderController.updateParam("time", 0);
        this.shaderController.updateParam("speed", 1);
        const bg = this.getComponent(cc.Sprite);
        if (bg) {
            this.bgOriginWidth = bg.spriteFrame.getOriginalSize().width;
            console.log("背景宽度：", this.bgOriginWidth);
        }
    }

    public moveToStart() {
        this._time = 0;
        this.enabled = false;
    }

    public startMove() {
        this.enabled = true;
    }

    public stopMove() {
        this.enabled = false;
    }

    protected update(dt: number): void {
        if (this.bgOriginWidth && this.speed) {
            this._time += dt;
            let ts = this.speed * this._time / this.bgOriginWidth;
            this.shaderController.updateParam("time", ts);
        }
    }
}
