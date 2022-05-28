import cv from "../cv"
const {ccclass, property} = cc._decorator;

@ccclass
export default class MyRedPacketsRule extends cc.Component {
    @property(cc.Label)txt_title: cc.Label = null;
    @property(cc.Label)title: cc.Label = null;
    @property(cc.Label)des: cc.Label = null;
    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!MyRedPacketsRule._g_prefabInst) MyRedPacketsRule._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(MyRedPacketsRule._g_prefabInst.uuid)) {
            if (!cc.isValid(MyRedPacketsRule._g_prefabInst, true)) {
                MyRedPacketsRule._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return MyRedPacketsRule._g_prefabInst;
    }

    onLoad () {
        this._initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._initLanguage.bind(this), this.node);

        cv.resMgr.adaptWidget(this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    
    private _initLanguage()
    {
        this.txt_title.string = cv.config.getStringData("MyRedPacketsRule_txt_title");
        this.title.string = cv.config.getStringData("MyRedPacketsRule_title");
        this.des.string = cv.config.getStringData("MyRedPacketsRule_des");
    }

    onBtnBack()
    {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(this.node
            , cv.action.eMoveActionDir.EMAD_TO_RIGHT
            , cv.action.eMoveActionType.EMAT_FADE_OUT
            , cv.action.delay_type.NORMAL);
    }
}
