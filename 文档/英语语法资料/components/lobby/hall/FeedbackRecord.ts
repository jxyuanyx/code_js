import cv from "../../lobby/cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackRecord extends cc.Component {
    @property(cc.ScrollView)scrollview: cc.ScrollView = null;
    @property(cc.Prefab)prefab_item: cc.Prefab = null;
    @property(cc.Node)btn_refresh: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!FeedbackRecord._g_prefabInst) FeedbackRecord._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(FeedbackRecord._g_prefabInst.uuid)) {
            if (!cc.isValid(FeedbackRecord._g_prefabInst, true)) {
                FeedbackRecord._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return FeedbackRecord._g_prefabInst;
    }

    onLoad()
    {
        this.initLanguage();
        cv.MessageCenter.register("get_feedback_lists", this.onUpdateView.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.resMgr.adaptWidget(this.node);
    }

    start()
    {
        let sv = this.scrollview.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.prefab_item, "FeedbackRecordItem");
        sv.generateItemPool();
        sv.bindScrollEventTarget(this);
        this.onUpdateView();
    }

    onDestroy()
    {
        cv.MessageCenter.unregister("get_feedback_lists", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private initLanguage()
    {
        cc.find("txt_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_txt_title");
    }

    private onRefresh(event)
    {
        cv.AudioMgr.playButtonSound('tab');
        cv.httpHandler.requestGetFeedBackLists();
        cc.find("img", this.btn_refresh).opacity = 76.5;
        this.btn_refresh.getComponent(cc.Button).enabled = false;
        this.btn_refresh.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(()=>{
            cc.find("img", this.btn_refresh).opacity = 255;
            this.btn_refresh.getComponent(cc.Button).enabled = true;
        }, this)));
    }

    private onBack(event)
    {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);
    }

    private onUpdateView()
    {
        let list = cv.dataHandler.getUserData().feedback_list;
        let sv = this.scrollview.getComponent(ScrollViewReuse);
        let pos = this.scrollview.content.getPosition();
        sv.reloadView(list);
        this.scrollview.content.setPosition(pos);
    }
}
