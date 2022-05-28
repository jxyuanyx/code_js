import cv from "../../../../components/lobby/cv";

/**
 * 保险缩小窗口逻辑
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceSmallBox extends cc.Component {
    @property(cc.Node) panel: cc.Node = null;
    @property(cc.Label) txt_name: cc.Label = null;
    @property(cc.Label) txt_time: cc.Label = null;
    @property(cc.Label) txt_desc: cc.Label = null;

    static gClassName: string = "InsuranceSmallBox";
    private _callback: () => void = null;
    private _nTimeDown: number = 0;

    show(bAnim: boolean, name: string, time: number, callbakc: () => void): void {
        this.node.active = true;
        this._callback = callbakc;
        this._resetTimeDown(time);
        this._updateView(name, time);

        let parentNode: cc.Node = this.node.parent;
        let px: number = (this.node.getAnchorPoint().x - parentNode.getAnchorPoint().x) * parentNode.width;
        let py: number = (this.node.getAnchorPoint().y - parentNode.getAnchorPoint().y) * parentNode.height;
        this.node.setPosition(px, py + 120); //保险小提示框有遮挡胜率，这边y坐标增加
    }

    hide(bAnim: boolean): void {
        cc.director.getScheduler().unscheduleAllForTarget(this.node);
        this.node.active = false;
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node);
        this.panel.on("click", this._onClickSmallBoxPanel, this);
    }

    protected start(): void {
        cv.MessageCenter.register("update_insurance_time", this._onMsgUpdateInsuranceTime.bind(this), this.node);
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("update_insurance_time", this.node);
    }

    private _updateView(name: string, time: number): void {
        this.txt_desc.string = cv.config.getStringData("GameScene_insurance_button_cdTime_buyInsurance_txt");
        this.txt_name.string = cv.String(name);
    }

    /**
     * 重置倒计时
     * @param cd 
     */
    private _resetTimeDown(cd: number): void {
        this._nTimeDown = Math.max(0, cv.Number(cd));
        this._setTimeDown(this._nTimeDown);

        this.unschedule(this._onScheduleTimeDown);
        if (this._nTimeDown > 0) this.schedule(this._onScheduleTimeDown, 1.0);
    }

    /**
     * 设置倒计时
     * @param cd 
     */
    private _setTimeDown(cd: number): void {
        cd = cv.Number(cd);
        this.txt_time.string = cv.StringTools.formatC(cv.config.getStringData("UIInsuranceButton"), cd);
    }

    /**
     * 更新倒计时
     */
    private _onScheduleTimeDown(dt: number): void {
        --this._nTimeDown;
        if (this._nTimeDown <= 0) {
            this._nTimeDown = 0;
            this.unschedule(this._onScheduleTimeDown);
        }
        this._setTimeDown(this._nTimeDown);
    }

    /**
     * 更新延时时间
     * @param data 
     */
    private _onMsgUpdateInsuranceTime(cd: number): void {
        this._resetTimeDown(cd);
    }

    /**
     * 小盒子面板点击事件
     * @param event 
     */
    private _onClickSmallBoxPanel(event: cc.Event): void {
        this.hide(false);
        if (this._callback) {
            this._callback();
        }
    }
}
