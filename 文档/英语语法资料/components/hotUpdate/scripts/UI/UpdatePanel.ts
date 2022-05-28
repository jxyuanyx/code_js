import { ResourceManager } from "../../../../common/tools/ResourceManager";
const { ccclass, property } = cc._decorator;

@ccclass
export class UpdatePanel extends cc.Component {

    @property(cc.Label) info: cc.Label = null;
    @property(cc.Label) des: cc.Label = null;
    @property(cc.ProgressBar) fileProgress: cc.ProgressBar = null;
    @property(cc.Label) fileLabel: cc.Label = null;
    @property(cc.ProgressBar) byteProgress: cc.ProgressBar = null;
    @property(cc.Label) byteLabel: cc.Label = null;
    @property(cc.Label) percentLabel: cc.Label = null;
    @property(cc.Node) retryBtn: cc.Node = null;
    onLoad () {
        let resMgr: ResourceManager = ResourceManager.getInstance();
        resMgr.adaptWidget(this.node);
        resMgr.adaptWidget(this.byteProgress.node);
        resMgr.adaptWidget(this.byteLabel.node);
        resMgr.adaptWidget(this.info.node);
        resMgr.adaptWidget(this.des.node);

        this.byteProgress.totalLength = this.byteProgress.node.width;
    }
}