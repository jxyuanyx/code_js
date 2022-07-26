const {ccclass, property} = cc._decorator;

@ccclass
export default class ShaderTime extends cc.Component {

    // _material: any;

    @property
    _max: number = 1;

    isUpdate: boolean;

    private sprite: cc.Sprite = null;

    private _material: cc.Material = null;

    onLoad() {
        this.sprite = this.getComponent(cc.Sprite);
        if (this.sprite) {
            this._material = this.sprite.getMaterial(0);
        }
    }

    @property
    get max(): number {
        return this._max;
    }

    set max(value) {
        this._max = value;
        if (!CC_EDITOR) {
            return;
        }

        if (this.sprite && this._material) {
            if (this._material.getProperty("time", 0) != undefined) {
                this._material.setProperty('time', value);
            }
        }
    }

    private _start = 0;

    protected update(dt) {
        if (this.node.active && this._material) {
            if (this._material.getProperty("time", 0) != undefined) {
                this._setShaderTime(dt);
            }
        }
    }

    private _setShaderTime(dt) {
        let start = this._start;
        if (start > this.max) {
            start = 0;
        }
        start += dt;
        this._material.setProperty('time', start);
        this._start = start;
    }
}
