
import cv from "../../components/lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class SwitchLoadingView extends cc.Component {
    loadingNode: cc.Node = null;
    loadingPanel: cc.Node = null;
    _img: cc.Node = null;
    _shadeNode: cc.Node = null;
    _loading_ex: cc.Node = null;
    _label_list: cc.Label[] = [];
    _label_des: cc.Label = null;
    loadingAnim: cc.Animation = null;
    _isShowAnim: boolean = false;

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/LoadingView", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/LoadingView", cc.Prefab);
        this.loadingNode = cc.instantiate(prefab);
        cc.game.addPersistRootNode(this.loadingNode);
        this.loadingNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_LOADING;
        this._loading_ex = cc.find("loadingPanel/loading_ex", this.loadingNode);
        this._label_des = cc.find("des", this._loading_ex).getComponent(cc.Label);
        this._img = cc.find("loadingPanel/img", this.loadingNode);
        this.loadingPanel = cc.find("loadingPanel", this.loadingNode);
        this._shadeNode = cc.find("shadeNode", this.loadingNode);

        this.loadingAnim = cc.find("loadingPanel/loading_ex/newIcon", this.loadingNode).getComponent(cc.Animation);
        this.loadingAnim.node.active = true;
        this._img.active = false;
        cc.find("loadingPanel/icon", this.loadingNode).active = false;

        this._shadeNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
        }, this);

        this._label_list = [];
        for (let i = 0; i < 3; ++i) {
            this._label_list.push(cc.find(cv.StringTools.formatC("label_%d", i), this._loading_ex).getComponent(cc.Label));
        }

        this.loadingPanel.active = true;
        this._shadeNode.active = true;
        this._loading_ex.active = true;
        this.loadingNode.active = false;

        cc.find("people", this._loading_ex).active = !cv.config.isOverSeas();
    }

    onDestroy() {
    }

    public initDes(des: string) {
        this._label_des.string = des;
        this.setDescPos();
    }

    private setDescPos() {
        let y = this.loadingAnim.node.y - 176;
        let labelWidth = cv.resMgr.getLabelStringSize(this._label_des).width;
        let labelWidth1 = this._label_list[0].node.getContentSize().width;
        let width = labelWidth1 * 3;
        this._label_des.node.setPosition(cc.v2(-width / 2, y))
        this._label_list[0].node.setPosition(cc.v2(-width / 2 + (labelWidth + labelWidth1) / 2, y))
        this._label_list[1].node.setPosition(cc.v2(this._label_list[0].node.getPosition().x + labelWidth1, y))
        this._label_list[2].node.setPosition(cc.v2(this._label_list[1].node.getPosition().x + labelWidth1, y))
    }

    public show(des: string, isForce: boolean = false) {
        if (!isForce && this.loadingNode.active) return;

        // 每次show之前都适配下位置(做下兼容, 避免某些跳过场景管理流程切场景的情况)
        this.reset();

        cv.MessageCenter.send("HideWebview_ShowWindows");
        this.loadingNode.active = true;
        this._label_des.node.active = true;
        this.initDes(des);
        this._showAnim();
    }

    public showDelay(delay: number, callback: () => void = null): void {
        this.scheduleOnce(() => {
            let desc: string = this._label_des.string;
            this.show(desc, true);
            if (callback) callback();
        }, delay);
    }

    public hide() {
        if (cv.resConfig.transSceneInfo.isTransing) return;

        this.hideAnim();
        this.loadingNode.active = false;
    }

    public hideAnim(): void {
        this._stopAnim();

        this._label_des.node.active = false;
        this.loadingAnim.node.active = false;
        for (let i = 0; i < this._label_list.length; ++i) { this._label_list[i].node.active = false; }

        this._isShowAnim = false;
    }

    public isShow() {
        return this.loadingNode.active;
    }

    public isShowAnim(): boolean {
        return this._isShowAnim;
    }

    public reset(): void {
        // 停止动画
        this._stopAnim();

        // 适配位置
        cv.resMgr.adaptWidget(this.loadingNode, true);
        this.setDescPos();

        // 恢复动画
        if (this._isShowAnim) { this._showAnim(); }
    }

    private static instance: SwitchLoadingView;

    public static getInstance(): SwitchLoadingView {
        if (!this.instance || !this.instance.loadingNode || !cc.isValid(this.instance.loadingNode, true)) {
            this.instance = new SwitchLoadingView();
        }
        return this.instance;
    }

    private _showAnim(): void {
        this.loadingAnim.node.active = true;
        this.loadingAnim.play();

        for (let i = 0; i < this._label_list.length; ++i) {
            this._label_list[i].node.active = true;
        }

        this._label_list[0].node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, 10), cc.moveBy(0.5, 0, -10), cc.delayTime(2))));
        this._label_list[1].node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.moveBy(0.5, 0, 10), cc.moveBy(0.5, 0, -10), cc.delayTime(1))));
        this._label_list[2].node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2), cc.moveBy(0.5, 0, 10), cc.moveBy(0.5, 0, -10))));

        this._isShowAnim = true;
    }

    private _stopAnim(): void {
        this.loadingAnim.pause();
        for (let i = 0; i < this._label_list.length; ++i) { this._label_list[i].node.stopAllActions(); }
    }
}
