// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { ScrollViewReuse } from "../../../Script/common/tools/ScrollViewReuse";
import cv from "../../../Script/components/lobby/cv";
const { ccclass, property } = cc._decorator;

@ccclass
export class LogTools extends cc.Component {

    private scrollView: cc.ScrollView = null;
    private logButton: cc.Node = null;
    private logItemPrefab: cc.Prefab = null;
    private clearButton: cc.Node = null;
    private msgNode: cc.Node = null;
    private logData: string[] = [];

    preloadRes(callback: Function): void {
        let count: number = 0;
        cv.resMgr.load("zh_CN/commonPrefab/LogPanel", cc.Prefab, (prefab: cc.Prefab): void => {
            if (++count >= 2) {
                if (callback) callback();
            }
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);

        cv.resMgr.load("zh_CN/commonPrefab/LogItem", cc.Prefab, (prefab: cc.Prefab): void => {
            if (++count >= 2) {
                if (callback) callback();
            }
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab_panel: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/LogPanel", cc.Prefab);
        let prefab_item: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/LogItem", cc.Prefab);

        let self = this;
        self.msgNode = cc.instantiate(prefab_panel);
        // cc.game.addPersistRootNode(this.msgNode);
        self.msgNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_LOG;
        self.msgNode.active = true;

        self.scrollView = cc.find("scrollview", self.msgNode).getComponent(cc.ScrollView);
        self.scrollView.node.active = false;
        self.logButton = cc.find("logButton", self.msgNode);
        self.logButton.on("click", self.onclinckLogButton, self);

        self.clearButton = cc.find("clearButton", self.msgNode);
        self.clearButton.on("click", self.onClear, self);

        cv.resMgr.adaptWidget(this.msgNode);
        self.initScrollviewData();

        self.onLoadItemComplete(prefab_item);
    }

    start() {

    }
    /**
     * onLoadItemComplete
     */
    public onLoadItemComplete(prefab: cc.Prefab) {
        this.logItemPrefab = prefab;
        //this.showScrollview();
    }
    /**
     * onclinckLogButton
     */
    public onclinckLogButton() {
        this.scrollView.node.active = !this.scrollView.node.active;
        if (this.scrollView.node.active) {
            this.showScrollview();
        }
    }

    /**
     * onClear
     */
    public onClear() {
        this.logData = [];
        let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
        sv.reloadView(this.logData);
    }
    /**
     * 显示弹幕UI
     */
    public showScrollview() {
        let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
        sv.bindPrefab(this.logItemPrefab, "LogItem", []);
        sv.generateItemPool();

        sv.bindScrollEventTarget(this);

        sv.reloadView(this.logData);
    }

    addLog(msg) {
        this.logData.unshift(msg);
        if (!this.scrollView) return;
        let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
        //sv.rebindDataRef(this.logData);
        //sv.addItem();
        sv.reloadView(this.logData);
    }
    /**
     * 初始化数据
     */
    public initScrollviewData() {
        for (let index = 0; index < 1; index++) {
            this.logData.push("start----------------------");
        }
    }

    /**
     * getLogDataString
     */
    public getLogDataString(): string {
        let len = this.logData.length;
        let str = "";
        console.debug("getLogDataString::len::" + len);
        for (let index = 0; index < len; index++) {
            str += this.logData[index];
        }
        return str;
    }
    private static instance: LogTools;

    public static getInstance(): LogTools {
        if (!this.instance || !this.instance.msgNode || !cc.isValid(this.instance.msgNode, true)) {
            this.instance = new LogTools();
        }
        return this.instance;
    }
}
