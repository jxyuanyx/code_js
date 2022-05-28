import { CustomToggleGroup } from "./CustomToggleGroup";
import cv from "../../../components/lobby/cv";

/**
 * 自定义 CustomToggle 组件 (仿简cc.Toggle)
 * @breif 引擎 v2.0.8的 cc.Toggle 组件 只要 isCheck 状态发生变化就会触发事件, 这样对于"全选, 非全选"类的需求很难实现, 除非定制引擎, 否则很容易死循环
 * 如果后续引擎版本迭代有修复这个"bug", 那么可以弃用该方法, 代码什么的不用改, 只需换个类名, 预制件重新绑定下即可, 使用逻辑一模一样
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class CustomToggle extends cc.Component {

    @property({
        "tooltip": "如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态"
    }) _isChecked: boolean = false;

    /**
     * 是否已选中(set赋值时: 只改变状态, 不触发事件)
     */
    @property get isChecked(): boolean {
        return this._isChecked;
    };
    set isChecked(value: boolean) {
        if (value === this._isChecked) {
            return;
        }

        if (this.toggleGroup && this.toggleGroup.enabled && this._isChecked) {
            if (!this.toggleGroup.allowSwitchOff) {
                return;
            }
        }

        this._isChecked = value;
        this._updateCheckMark();

        if (this.toggleGroup && this.toggleGroup.enabled) {
            this.toggleGroup.updateToggles(this);
        }
    };

    @property({
        "tooltip": "设置是否激活组件"
    }) _touchEnabled: boolean = true;

    @property get touchEnabled(): boolean {
        return this._touchEnabled;
    }
    set touchEnabled(value: boolean) {
        if (value === this._touchEnabled) {
            return;
        }
        this._touchEnabled = value;
        this._updateTouchEnabled();
    }

    @property({
        "type": cc.Sprite,
        "tooltip": "Toggle 背景图片"
    }) bgMark: cc.Sprite = null;

    @property({
        "type": cc.Sprite,
        "tooltip": "Toggle 处于禁用状态时显示的图片"
    }) disabledMark: cc.Sprite = null;

    @property({
        "type": cc.Sprite,
        "tooltip": "Toggle 处于选中状态时显示的图片"
    }) checkMark: cc.Sprite = null;

    @property({
        "type": CustomToggleGroup,
        "tooltip": "Toggle 所属的 ToggleGroup，这个属性是可选的。如果这个属性为 null，则 Toggle 是一个 CheckBox，否则，Toggle 是一个 RadioButton"
    }) toggleGroup: CustomToggleGroup = null;

    @property({
        // "type": cc.Boolean,(不注释编译时总是弹出警告, 提示要注释此行)
        "tooltip": "是否开启默认的点选音效(默认开启, 若需要不同的点选音效, 那么该字段要设置为\"false\"且应用时自行添加音效)"
    }) enableSoundEffect: boolean = true;

    /**
     * 使 toggle 按钮处于选中状态(会触发事件)
     */
    check(): void {
        if (this.isChecked) return;
        this.isChecked = true;
        this._emitToggleEvents();
    }

    /**
     * 使 toggle 按钮处于未选中状态(会触发事件)
     */
    uncheck(): void {
        if (!this.isChecked) return;
        this.isChecked = false;
        this._emitToggleEvents();
    }

    /**
     * 隐藏选中状态图片 (此接口暴露仅是为了 CustomToggleGroup 中调用, 其他地方请慎用)
     */
    hideCheckMark(): void {
        this._isChecked = false;
        this._updateCheckMark();
    }

    /**
     * 设置是否激活组件
     * @param enabled          是否激活
     * @param touchEnabled     是否禁用触摸事件
     */
    setTouchEnable(enabled: boolean, touchEnabled: boolean = true): void {
        if (enabled === this._touchEnabled) return;

        this._touchEnabled = enabled;
        this._updateTouchEnabled();

        if (touchEnabled) {
            let btn: cc.Button = this.getComponent(cc.Button);
            if (btn) {
                btn.enabled = enabled;
                btn.interactable = enabled;
            }
        }
    }

    protected onLoad(): void {
    }

    protected start(): void {
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerToggleEvent();
        }
        if (this.toggleGroup && this.toggleGroup.enabledInHierarchy) {
            this.toggleGroup.addToggle(this);
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterToggleEvent();
        }
        if (this.toggleGroup && this.toggleGroup.enabledInHierarchy) {
            this.toggleGroup.removeToggle(this);
        }
    }

    private _updateCheckMark(): void {
        if (this.checkMark) {
            this.checkMark.node.active = this.isChecked;
        }
    }

    private _registerToggleEvent(): void {
        this.node.on("click", this._onClickToggle, this);
    }

    private _unregisterToggleEvent() {
        this.node.off('click', this._onClickToggle, this);
    }

    private _emitToggleEvents(): void {
        this.node.emit("toggle", this);
    }

    private _onClickToggle(event: cc.Event): void {
        if (this.enableSoundEffect) {
            cv.AudioMgr.playButtonSound('button_click');
        }

        this.isChecked = !this.isChecked;
        this._emitToggleEvents();
    }

    private _updateTouchEnabled(): void {
        let enabled: boolean = this._touchEnabled;
        this.enabled = enabled;
        if (this.disabledMark) {
            this.disabledMark.node.active = !enabled;

            if (this.bgMark) {
                this.bgMark.node.active = enabled;
            }

            if (this.checkMark) {
                if (enabled) {
                    if (this.isChecked) {
                        this.checkMark.node.active = enabled;
                    }
                }
                else {
                    this.checkMark.node.active = enabled;
                }
            }
        }
        else {
            let mat: cc.Material = null;
            let ccMat: any = cc.Material;
            if (ccMat) {
                let fileName: string = enabled ? "2d-sprite" : "2d-gray-sprite";
                mat = ccMat.getBuiltinMaterial(fileName);
            }

            if (mat) {
                if (this.bgMark) {
                    this.bgMark.setMaterial(0, mat);
                }

                if (this.checkMark) {
                    this.checkMark.setMaterial(0, mat);
                }
            }
        }
    }
}
