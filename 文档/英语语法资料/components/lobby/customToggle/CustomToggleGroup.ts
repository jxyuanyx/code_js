import { CustomToggle } from "./CustomToggle";

/**
 * 自定义 CustomToggleGroup 组件 (仿cc.ToggleGroup)
 * @breif 仿制的原因详见 CustomToggle 介绍 (注: cc.ToggleGroup 指明了绑定对象组, 但后续会被引擎废弃改为 cc.ToggleContainer, 个人觉得"容器模式"并不怎么好, 虽然使用跟简洁了, 无需绑定对象, 
 * 但无法交叉使用, 并且想要 toggle 单选生效必须依附于其子节点, 纯粹是为了偷懒而为, 感觉不怎么严谨, 个人更倾向于 cc.ToggleGroup 绑定模式, 目前引擎版本 v2.0.8是这样, 后续版本就不知了...)
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class CustomToggleGroup extends cc.Component {

    @property({
        "tooltip": "如果这个设置为 true， 那么 toggle 按钮在被点击的时候可以反复地被选中和未选中"
    }) allowSwitchOff: boolean = false;

    /**
     * 只读属性，返回 CustomToggleGroup 管理的 CustomToggle 数组引用
     */
    private _toggleItems: CustomToggle[] = [];

    /**
     * 添加 toggle 对象 (此接口暴露仅是为了 CustomToggle 中调用, 其他地方请慎用)
     */
    addToggle(toggle: CustomToggle): void {
        let index: number = this._toggleItems.indexOf(toggle);

        if (index === -1) {
            this._toggleItems.push(toggle);
        }

        this._allowOnlyOneToggleChecked();
    }

    /**
     * 移除 toggle 对象 (此接口暴露仅是为了 CustomToggle 中调用, 其他地方请慎用)
     */
    removeToggle(toggle: CustomToggle) {
        let index: number = this._toggleItems.indexOf(toggle);

        if (index > -1) {
            this._toggleItems.splice(index, 1);
        }

        this._makeAtLeastOneToggleChecked();
    }

    /**
     * 刷新 toggle 对象 (此接口暴露仅是为了 CustomToggle 中调用, 其他地方请慎用)
     */
    updateToggles(toggle: CustomToggle): void {
        if (!this.enabledInHierarchy || !toggle.isChecked) return;

        this._toggleItems.forEach((item: CustomToggle, index: number, array: CustomToggle[]): void => {
            if (toggle.isChecked) {
                if (item !== toggle && item.isChecked && item.enabled) {
                    item.hideCheckMark();
                }
            }
        });
    }

    protected onLoad(): void {
    }

    protected start(): void {
        this._makeAtLeastOneToggleChecked();
    }

    private _allowOnlyOneToggleChecked() {
        let isChecked: boolean = false;
        this._toggleItems.forEach((item: CustomToggle, index: number, array: CustomToggle[]): void => {
            if (isChecked && item.enabled) {
                item.hideCheckMark();
            }
            if (item.isChecked && item.enabled) {
                isChecked = true;
            }
        });

        return isChecked;
    }

    private _makeAtLeastOneToggleChecked() {
        let isChecked: boolean = this._allowOnlyOneToggleChecked();

        if (!isChecked && !this.allowSwitchOff) {
            if (this._toggleItems.length > 0) {
                this._toggleItems[0].isChecked = true;
            }
        }
    }
}
