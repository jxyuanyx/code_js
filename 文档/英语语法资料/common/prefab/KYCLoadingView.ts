
import cv from "../../components/lobby/cv";
import { JumioKYCHandler, JUMIO_IDENTITY_FAILED_TYPE } from "../security/JumioKYCHandler";

const { ccclass, property } = cc._decorator;
@ccclass
export class KYCLoadingView extends cc.Component {
    loadingNode: cc.Node = null;
    private _spadeNode: cc.Node = null;
    private _description: cc.Label = null;
    private _loadingText: cc.Label = null;

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/KYCLoadingView", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/KYCLoadingView", cc.Prefab);
        this.loadingNode = cc.instantiate(prefab);
        cc.game.addPersistRootNode(this.loadingNode);
        this.loadingNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_LOADING;
        this.loadingNode.active = false;
        this._spadeNode = cc.find("container/loading_circle/spades_icon", this.loadingNode);
        let descNode: cc.Node = cc.find("container/document_icon/description", this.loadingNode);
        if (cc.isValid(descNode, true)) this._description = descNode.getComponent(cc.Label);
        let loadingTextNode: cc.Node = cc.find("container/loading_circle/indication", this.loadingNode);
        if (cc.isValid(loadingTextNode, true)) this._loadingText = loadingTextNode.getComponent(cc.Label);
    }

    onDestroy() {
    }

    public show(des: string) {
        if (this.isShow() == true) {
            return;
        }

        cc.log("KYCLoadingView.show");
        if (this._description)
            this._description.string = cv.config.getStringData("KYC_Loading_text1");
        if (this._loadingText)
            this._loadingText.string = cv.config.getStringData("KYC_Loading_text2");
        cv.MessageCenter.send("HideWebview_ShowWindows");
        this.loadingNode.active = true;
        this._spadeNode.setScale(1.0, 1.0);
        this._spadeNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.0, 1.0), cc.scaleTo(0.5, 1.0, 1.0))));
    }

    public hide(isFailed: boolean = false) {
        if (this.isShow() == false)
            return;

        if (isFailed)
            JumioKYCHandler.getInstance().onJumioIdentificationFailure(JUMIO_IDENTITY_FAILED_TYPE.FAILED_ON_IDENTIFICATION);

        this._spadeNode.stopAllActions();
        this.loadingNode.active = false;
    }

    public isShow(): boolean {
        if (this.loadingNode) {
            return this.loadingNode.active;
        } else {
            return false;
        }
    }

    private static instance: KYCLoadingView;

    public static getInstance(): KYCLoadingView {
        if (!this.instance || !this.instance.loadingNode || !cc.isValid(this.instance.loadingNode, true)) {
            this.instance = new KYCLoadingView();
        }
        return this.instance;
    }
}
