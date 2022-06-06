import cv from "../../../Script/components/lobby/cv";
import { ServerInfo } from "../../common/net/DomainMgr";

/**
 * 俱乐部推广说明
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubSpreadRule extends cc.Component {
    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Node) panel_web: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例
    private _lastView: any = null;                                              // 上次记录的视图节点索引   
    private _qrcodeUrl: string = "index.php/user/Article/getrule?title=qrcode&clientType=%s";

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubSpreadRule._g_prefabInst) ClubSpreadRule._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubSpreadRule._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubSpreadRule._g_prefabInst, true)) {
                ClubSpreadRule._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubSpreadRule._g_prefabInst;
    }

    autoShow(parentNode: cc.Node, lastView: cc.Component, both?: boolean): void {
        let bFirstAdd: boolean = false;
        // this.node.setPosition(cc.Vec2.ZERO);
        // if (parentNode.getAnchorPoint().equals(cc.Vec2.ZERO)) {
        //     parentNode = cc.director.getScene();
        //     this.node.setPosition(cv.action.WIDTH / 2, cv.action.HEIGHT / 2);
        // }

        if (!parentNode.getChildByUuid(this.node.uuid)) {
            bFirstAdd = true;
            parentNode.addChild(this.node);
        }
        this.node.active = true;
        this._lastView = lastView;
        cv.resMgr.adaptWidget(this.node, true);
        if (!bFirstAdd) this.updateView();
        if (both) {
            cv.action.showActionBothLeft(this.node, this._lastView.node);
        }
        else {
            cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
        }
    }

    protected onLoad(): void {
        this.btn_back.node.on("click", this._onClickBack, this);
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); });
        cv.MessageCenter.register("HideWebview_ShowWindows", this.HandleCheckWebView.bind(this), this.node);

    }


    protected HandleCheckWebView(isView?: boolean) {

        isView = isView && this.node.active;
        isView = isView == true ? true : false;
        if (this.panel_web) {
            this.panel_web.active = isView;
        }
    }


    /**
     *  onDestroy
     */
    public onDestroy() {
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);

    }
    protected start(): void {
        this.updateView();
    }

    setLastViewNode(node: cc.Node): void {
        this._lastView = node;
    }

    updateView(): void {
        this.txt_title_word.string = cv.config.getStringData("ClubSpreadRule_title_txt");
        this.scheduleOnce(() => {
            let serverInfo: ServerInfo = cv.domainMgr.getServerInfo();
            let url: string = serverInfo.web_server + cv.StringTools.formatC(this._qrcodeUrl, cv.config.GET_CLIENT_TYPE());//cv.config.getStringData("WEB_CLUBSPREAD_RULE", true);
            this._showWebView(url, true);
        }, 0.5);
    }

    private _onClickBack(event: cc.Event): void {
        this._showWebView("", false);
        cv.AudioMgr.playButtonSound('back_button');
        if (this._lastView) {
            cv.action.showActionBothRight(this._lastView.node, this.node);
            let lastview: any = this._lastView;
            this._lastView = null;
            if ("updateView" in lastview) lastview.updateView();
        }
    }

    // 显示webview(动态添加/删除组件)
    private _showWebView(url: string, visible: boolean): void {
        if (visible) {
            let webView: cc.WebView = this.panel_web.getComponent(cc.WebView);
            if (!webView) {
                webView = this.panel_web.addComponent(cc.WebView);
            }
            webView.url = url;
            this.panel_web.active = true;
        }
        else {
            this.panel_web.removeComponent(cc.WebView);
        }
    }
}
