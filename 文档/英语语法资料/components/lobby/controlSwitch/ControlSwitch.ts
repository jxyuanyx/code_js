import cv from "../../../components/lobby/cv";

/**
 * 仿 cocos2dx - ControlSwitch 开关控件
 * 监听事件: 
 * @g_event_name_click      点击事件
 * @g_event_name_switch     状态改变事件
 */

const { ccclass, property } = cc._decorator;
@ccclass
export class ControlSwitch extends cc.Component {

    @property(cc.Sprite) img_off: cc.Sprite = null;
    @property(cc.Sprite) img_on: cc.Sprite = null;
    @property(cc.Sprite) img_switch: cc.Button = null;
    @property(cc.Node) layout: cc.Node = null;

    @property({
        tooltip: "开关接收事件后是否自动打开或关闭(true - 点击/滑动时会自动开或关; false - 点击/滑动时只回调事件, 不会自动开或关)"
    }) enabledAuto: boolean = true;

    @property({
        tooltip: "是否开启 action(在滚动视图中, 建议关闭该功能, 貌似'在滚动视图中任何带滚动事件的控件同时触动滚动事件会冲突', 期待creator在后续升级中修正该bug)"
    }) enabledAction: boolean = true;

    @property({
        tooltip: "开关状态(true: 开启, false: 关闭; 默认为: true, 直接修改该值不会触发状态改变事件, 若要触发事件请使用'setOn')"
    }) _switchOn: boolean = true;
    @property get switchOn() {
        return this._switchOn;
    };
    set switchOn(value: boolean) {
        if (value === this._switchOn) {
            return;
        }

        if (this._bActioning || this._bMoving) {
            return;
        }

        if (CC_EDITOR) {
            this._init();
        }

        this._switchOn = value;
        this._checkImgStatus();
    }

    static g_class_name: string = "ControlSwitch";                                      // 类名
    static g_event_name_click: string = "control-switch-click";                         // 点击事件
    static g_event_name_switch: string = "control-switch-switch";                       // 状态回调事件

    private _onPosition: cc.Vec2 = cc.Vec2.ZERO;                                        // 状态开的位置
    private _offPosition: cc.Vec2 = cc.Vec2.ZERO;                                       // 状态关的位置
    private _switch_src_color: cc.Color = cc.Color.WHITE;                               // 开关原始颜色

    private _bActioning: boolean = false;                                               // 是否正在 action
    private _bMoving: boolean = false;                                                  // 是否正在 move
    private _lastMoveOffset: cc.Vec2 = cc.Vec2.ZERO;

    protected onLoad(): void {
        this._init();
    }

    protected start(): void {
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerToggleEvent();
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterToggleEvent();
        }
    }

    private _init(): void {
        this._switch_src_color = this.img_switch.node.color.clone();
        this._onPosition = cc.v2(this.img_on.node.position);
        this._offPosition = cc.v2(-Math.abs(2 * this.img_switch.node.position.x), this._onPosition.y);
    }

    private _registerToggleEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onClickStart, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onClickCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onClickMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onClickEnd, this);
    }

    private _unregisterToggleEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onClickStart, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onClickCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onClickMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onClickEnd, this);
    }

    private _onClickStart(event: cc.Event.EventCustom): void {
        event.stopPropagation();
        if (this._bActioning) {
            return;
        }

        this.img_switch.node.color = cc.color(0xD3, 0xD3, 0xD3, 0xFF);
    }

    private _onClickCancel(event: cc.Event.EventTouch): void {
        event.stopPropagation();
        if (this._bActioning) {
            return;
        }

        this.img_switch.node.color = this._switch_src_color;
        if (this.enabledAuto && this._bMoving) {
            this._bMoving = false;

            let bSwitch: boolean = false;
            let bOffset: boolean = Math.abs(this._lastMoveOffset.x) + this.img_switch.node.width / 2 >= this.node.width / 2;
            if (this._switchOn) {
                bSwitch = this._lastMoveOffset.x <= 0 && bOffset;
            }
            else {
                bSwitch = this._lastMoveOffset.x >= 0 && bOffset;
            }

            if (bSwitch) this._action(!this._switchOn);
            else this._action(this._switchOn);
        }
    }

    private _onClickMove(event: cc.Event.EventTouch): void {
        event.stopPropagation();
        if (this._bActioning) {
            return;
        }

        if (this.enabledAction && this.enabledAuto) {
            this._bMoving = true;
            this._lastMoveOffset.x = event.getLocation().x - event.getStartLocation().x;
            this._lastMoveOffset.y = event.getLocation().y - event.getStartLocation().y;

            let offset: cc.Vec2 = cc.v2(this.layout.position.x + event.getDeltaX(), this.layout.position.y);
            if (offset.x <= this._offPosition.x) {
                offset.x = this._offPosition.x;
            }
            else if (offset.x >= this._onPosition.x) {
                offset.x = this._onPosition.x;
            }

            this.layout.setPosition(offset);
        }
    }

    private _onClickEnd(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        event.stopPropagation();
        if (this._bActioning) {
            return;
        }

        this.img_switch.node.color = this._switch_src_color;
        this._bMoving = false;

        if (this.enabledAuto) {
            this._action(!this._switchOn);
        }

        this.node.emit(ControlSwitch.g_event_name_click, this);
    }

    private _checkImgStatus(): void {
        this.img_on.node.active = true;
        this.img_off.node.active = true;
        this.layout.setPosition(this._switchOn ? this._onPosition : this._offPosition);
    }

    private _action(status: boolean, isEmitEvent: boolean = true): void {
        if (this._bActioning) {
            return;
        }

        let dest_x: number = status ? this._onPosition.x : this._offPosition.x;
        let dest_y: number = status ? this._onPosition.y : this._offPosition.y;

        if (dest_x === this.layout.x && dest_y === this.layout.y) {
            return;
        }

        this._switchOn = status;
        let callback: Function = (): void => {
            this._bActioning = false;
            this._checkImgStatus();
            if (isEmitEvent) {
                this.node.emit(ControlSwitch.g_event_name_switch, this._switchOn, this);
            }
        }

        if (this.enabledAction) {
            this._bActioning = true;
            let moveTo: cc.ActionInterval = cc.moveTo(0.1, cc.v2(dest_x, this.layout.position.y));
            this.layout.runAction(cc.sequence(moveTo, cc.callFunc((): void => {
                callback();
            })));
        }
        else {
            callback();
        }
    }

    /**
     * 设置开关状态
     * @param isOn              true-开, false-关
     * @param isAnimation       是否开启动画(默认:false)
     * @param isEmitEvent       是否触发状态改变事件(默认: false)
     */
    setOn(isOn: boolean, isAnimation: boolean = false, isEmitEvent: boolean = false): void {
        if (isAnimation && this.enabledAction) {
            this._action(isOn, isEmitEvent);
        }
        else {
            this.switchOn = isOn;
            if (isEmitEvent) {
                this.node.emit(ControlSwitch.g_event_name_switch, this._switchOn, this);
            }
        }
    }

    /**
     * 开关状态是否已打开
     */
    isOn(): boolean {
        return this._switchOn;
    }
}
