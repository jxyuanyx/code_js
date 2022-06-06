
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import cv from "../../lobby/cv";
import cb from "../cowboy/cb";

const { ccclass, property } = cc._decorator;
@ccclass
export default class cowboyList extends cc.Component {

    @property(cc.Label) online_desc: cc.Label = null;
    @property(cc.Label) online_num: cc.Label = null;
    @property(cc.Prefab) item_prefab: cc.Prefab = null;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    @property(cc.Node) chartbg: cc.Node = null;

    start() {
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.item_prefab, "cowboyItem", []);
        sv.generateItemPool();
        sv.bindScrollEventTarget(this);

        this.setData();

        if (cb.getCowboyRoom().gamePlayerList.length == 0) {
            this.online_desc.node.active = false;
            this.online_num.node.active = false;
        }
        else {
            this.online_desc.node.active = true;
            this.online_num.node.active = true;
            this.online_num.string = cv.StringTools.formatC("%d", cb.getCowboyRoom().dzplayerNum);
        }

        cc.find("Button_close", this.chartbg).on("click", this.onBtnClose, this);
    }

    onBtnClose() {
        cv.AudioMgr.playButtonSound('close');
        this.node.active = false;
    }

    setData() {
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        let a = cb.getCowboyRoom().gamePlayerList.length;
        sv.reloadView(cb.getCowboyRoom().gamePlayerList);
    }
}
