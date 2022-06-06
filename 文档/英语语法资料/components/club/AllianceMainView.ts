import cv from "../../../Script/components/lobby/cv";
import { ScrollViewReuse } from "../../../Script/common/tools/ScrollViewReuse";
import { eClubSceneView, ClubScene, ClubSceneAddBtnFuc } from "../../../Script/components/club/ClubScene";
import { ClubData } from "../../../Script/data/club/ClubData";
import { TagCom } from "../../common/tools/TagCom";

const { ccclass, property } = cc._decorator;
@ccclass
export class AllianceMainView extends cc.Component {
    @property(cc.Prefab) prefa_allianceItem: cc.Prefab = null;

    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_icon_word: cc.Label = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_question: cc.Button = null;
    @property(cc.Button) btn_open: cc.Button = null;

    @property(cc.Sprite) img_icon: cc.Sprite = null;
    @property(cc.ScrollView) scrollview: cc.ScrollView = null;
    @property(cc.Node) panel_open: cc.Node = null;
    @property(cc.Button) vBtnsFunc: cc.Button[] = [];

    isBackToHallSceneSelfView: boolean = false;                                 // 是否返回至"大厅场景"中的"我的空间"面板

    static gClassName: string = "AllianceMainView";
    private static _g_prefabInst: cc.Node = null;                               // 单例
    private _svReuse: ScrollViewReuse = null;
    clubID: number = 0;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!AllianceMainView._g_prefabInst) AllianceMainView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(AllianceMainView._g_prefabInst.uuid)) {
            if (!cc.isValid(AllianceMainView._g_prefabInst, true)) {
                AllianceMainView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        AllianceMainView._g_prefabInst.name = AllianceMainView.gClassName;
        return AllianceMainView._g_prefabInst;
    }

    /**
     * 切入动画 开始回调
     * @param target 
     * @param actIO 
     */
    showActFunc(target: cc.Node, actIO: number): void {
    }

    /**
     * 切入动画 结束回调
     * @param target 
     * @param actIO 
     */
    showActFuncFinish(target: cc.Node, actIO: number): void {
        if (!this._svReuse) {
            this._svReuse = this.scrollview.node.getComponent(ScrollViewReuse);
            this._svReuse.bindPrefab(this.prefa_allianceItem, "AllianceItem");
            this._svReuse.generateItemPool();
        }

        // 更新联盟列表视图
        this._onMsgUpdateAllianceList();
    }

    updateView(): void {
        this._updateStaticText();

        // 清除联盟列表
        if (this._svReuse) {
            this._svReuse.removeAll();
            this._svReuse.reloadView();
        }

        // 请求刷新联盟列表
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (clubData) {
            this.clubID = clubData.club.club_id;
        }

        if (cv.Number(this.clubID) === 0) {
            this.clubID = cv.clubDataMgr.getMyCreatedClubID();
        }

        cv.worldNet.requestAllianceSnapshotList(this.clubID);
    }

    protected onLoad(): void {
    }

    protected start(): void {
        // 添加控件监听事件
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_question.node.on("click", this._onClickQuestion, this);
        this.btn_open.node.on("click", this._onClickOpen, this);
        this.panel_open.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => {
            event.stopPropagation();
            this.panel_open.active = false;
        });

        // 添加消息监听事件
        cv.MessageCenter.register("on_update_club_list", this._onMsgUpdateClubList.bind(this), this.node);
        cv.MessageCenter.register("showAlliancelistView", this._onMsgUpdateAllianceList.bind(this), this.node);

        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);

        cv.MessageCenter.register("on_syOnEnterBackground", this.OnAppEnterBackground.bind(this), this.node);
        cv.MessageCenter.register("on_syOnEnterForeground", this.OnAppEnterForeground.bind(this), this.node);

        // 隐藏若干控件
        this.btn_question.node.active = false;
        this.img_icon.node.active = false;
        this.panel_open.active = false;

        for (let i = 0; i < this.vBtnsFunc.length; ++i) {
            let tagCom: TagCom = this.vBtnsFunc[i].getComponent(TagCom);
            if (!tagCom) tagCom = this.vBtnsFunc[i].addComponent(TagCom);
            switch (i) {
                case 0: tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_CREATE; break;
                case 1: tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN; break;
                default: break;
            }
            this.vBtnsFunc[i].node.on("click", (event: cc.Event) => { this._onClickBtnsFunc(tagCom.nTag, event) }, this);
        }

        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("on_update_club_list", this.node);
        cv.MessageCenter.unregister("showAlliancelistView", this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        cv.MessageCenter.unregister("on_syOnEnterBackground", this.node);
        cv.MessageCenter.unregister("on_syOnEnterForeground", this.node);
    }

    // 面板相关按钮
    private _onClickBtnsFunc(eFunc: ClubSceneAddBtnFuc, event: cc.Event): void {
        cv.AudioMgr.playButtonSound('tab');
        this.panel_open.active = false;

        switch (eFunc) {
            // 新建公会
            case ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_CREATE: {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_ALLIANCE_CREATE_VIEW,
                    lastView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            // 加入公会
            case ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN: {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_ALLIANCE_SEARCH_VIEW,
                    lastView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            default: break;
        }
    }

    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("AllianceCreate_titile_text_2");
        this.txt_icon_word.string = cv.config.getStringData("ClubMainView_club_panel_noclubIcon_noclub_Txt");

        for (let i = 0; i < this.vBtnsFunc.length; ++i) {
            let txt: cc.Label = this.vBtnsFunc[i].node.getChildByName("txt").getComponent(cc.Label);
            let tagCom: TagCom = this.vBtnsFunc[i].getComponent(TagCom);
            switch (i) {
                case 0: {
                    if (cv.config.isOverSeas()) {
                        txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_addClub_button_1");                  // 加入公会
                        if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN;
                    }
                    else {
                        txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_createClub_button_1");               // 新建公会
                        if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_CREATE;
                    }
                } break;

                case 1: {
                    txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_addClub_button_1");                      // 加入公会
                    if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN;
                } break;

                default: break;
            }
        }
    }

    // 返回按钮
    private _onClickBack(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('back_button');
        if (this.isBackToHallSceneSelfView) {
            cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
                cv.MessageCenter.send("switchSceneToSelfView");
            });
        }
        else {
            // 从"社区主界面"进入的
            if (ClubScene.g_gotoAV_fromCV_BtnOpen) {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                    lastView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                    transBoth: true
                });
            }
            // 从"社区介绍界面"进入的
            else {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
                    lastView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                    transBoth: true
                });
            }
        }

        // 重置"从社区主界面进入"的标记
        ClubScene.g_gotoAV_fromCV_BtnOpen = false;
    }

    // 问号按钮
    private _onClickQuestion(event: cc.Event.EventCustom): void {
        console.log("ClubMainView - click question btn");
        cv.AudioMgr.playButtonSound('button_click');
    }

    // 打开面板
    private _onClickOpen(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.panel_open.active = !this.panel_open.active;
        this._updateBtnListView();
    }

    // 更新俱乐部列表视图
    private _onMsgUpdateClubList(): void {
        this.updateView();
    }

    // 更新联盟列表视图
    private _onMsgUpdateAllianceList(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (!clubData) return;
        if (this._svReuse) {
            let list: any = clubData.clubExtra.allianceList;
            for (let i = 0; i < list.length; i++) {
                list[i].myClubID = this.clubID;
            }
            this._svReuse.reloadView(list);
        }
    }

    // 更新按钮列表
    private _updateBtnListView() {
        let parent: cc.Node = this.vBtnsFunc[2].node.parent;
        this.vBtnsFunc[2].node.active = false;
        parent.getChildByName("img_line_2").active = false;
        // parent.height = 170;
        parent.height = 436 - (3 - 2) * 130;

        if (cv.config.isOverSeas()) {
            this.vBtnsFunc[1].node.active = false;
            parent.getChildByName("img_line_1").active = false;
            // parent.height = 80;
            parent.height = 436 - (3 - 1) * 130;
        }
    }


    private OnAppEnterBackground() {

    }

    private OnAppEnterForeground() {
        cv.worldNet.requestAllianceSnapshotList(this.clubID);
    }
}
