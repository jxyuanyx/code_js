import cv from "../../components/lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass

//主动重连显示的loading转圈界面，不同于loadingView.ts里面消息超时显示的loading转圈界面
export class LoadingCommonView extends cc.Component {
    loadingNode: cc.Node = null;
    loadingPanel: cc.Node = null;
    _img: cc.Node = null;
    _shadeNode: cc.Node = null;
    _loading_ex: cc.Node = null;
    _label_des: cc.Label = null;

    webviewHide: boolean = false;
    timeCount: number = 0;

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
        // cc.find("loadingPanel/loading_ex", this.loadingNode).active = false;

        this._loading_ex = cc.find("loadingPanel/loading_ex", this.loadingNode);
        this._label_des = cc.find("des", this._loading_ex).getComponent(cc.Label);

        this._img = cc.find("loadingPanel/img", this.loadingNode);
        this.loadingPanel = cc.find("loadingPanel", this.loadingNode);
        this._shadeNode = cc.find("shadeNode", this.loadingNode);

        this.hideUI();

        this._shadeNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
        }, this);
        this.loadingPanel.active = false;
        this._shadeNode.active = false;
        this._label_des.node.y = this._label_des.node.getPosition().y + 30;
    };

    onDestroy() {
    }

    onLoad() {
    }

    hideUI() {
        for (let i = 0; i < 3; i++) {
            cc.find(cv.StringTools.formatC("label_%d", i), this._loading_ex).active = false;
        }
        cc.find("bg", this._loading_ex).active = false;
        cc.find("people", this._loading_ex).active = false;
    }

    public reset() {
        cv.resMgr.adaptWidget(this.loadingNode, true);
    }

    public show(type: number) {
        if (this.loadingNode.active) return;
        cv.MessageCenter.send("HideWebview_ShowWindows");

        this.loadingNode.active = true;
        this.loadingPanel.active = true;
        this._shadeNode.active = true;

        this.loadingPanel.opacity = cv.SwitchLoadingView.isShow() || cv.config.getCurrentScene() == cv.Enum.SCENE.HOTUPDATE_SCENE ? 0 : 255;

        if (cv.Enum.LOADINGTYPE.RECONNECT == type) {
            this._showTimeCountDown();
        }

        if (cc.director.getActionManager().getNumberOfRunningActionsInTarget(this._img) <= 0) {
            this._img.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0, 1), cc.scaleTo(0.5, 1, 1))));
        }
    }

    //显示倒计时, 重连loading提示，需要显示3s
    private _showTimeCountDown() {
        this.timeCount = 3;
        this._label_des.string = cv.StringTools.formatC(cv.config.getStringData("network_reconecting"), this.timeCount);

        let self = this;
        let sequence = cc.repeat(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            self.timeCount--;
            self._label_des.string = cv.StringTools.formatC(cv.config.getStringData("network_reconecting"), self.timeCount);
        })), 2);
        this.loadingNode.runAction(sequence);
    }

    public hide() {
        this._img.stopAllActions();
        this.loadingNode.stopAllActions();
        this.loadingNode.active = false;
        this._shadeNode.active = false;
        this.loadingPanel.active = false;
    }

    public isShow() {
        return this.loadingNode.active;
    }


    private static instance: LoadingCommonView;

    public static getInstance(): LoadingCommonView {
        if (!this.instance || !this.instance.loadingNode || !cc.isValid(this.instance.loadingNode, true)) {
            this.instance = new LoadingCommonView();
        }
        return this.instance;
    }
}
