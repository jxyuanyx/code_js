import cv from "../../../Script/components/lobby/cv";
import { ScrollViewReuse } from "../../../Script/common/tools/ScrollViewReuse";
import { ClubData } from "../../../Script/data/club/ClubData";
import { eClubSceneView, ClubScene, ClubSceneAddBtnFuc } from "../../../Script/components/club/ClubScene";
import { TagCom } from "../../common/tools/TagCom";

const { ccclass, property } = cc._decorator;
@ccclass
export class ClubMainView extends cc.Component {
    @property(cc.Prefab) prefab_clubItem: cc.Prefab = null;

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

    static gClassName: string = "ClubMainView";
    private static _g_prefabInst: cc.Node = null;                               // 单例
    private _svReuse: ScrollViewReuse = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubMainView._g_prefabInst) ClubMainView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubMainView._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubMainView._g_prefabInst, true)) {
                ClubMainView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        ClubMainView._g_prefabInst.name = ClubMainView.gClassName;
        return ClubMainView._g_prefabInst;
    }

    updateView(): void {
        // 清空"当前操作的俱乐部ID"
        cv.clubDataMgr.clearCurOpClubTmp();

        // 更新ui
        this._updateStaticText();
        if (this._svReuse) this._svReuse.reloadView();
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
    }

    protected start(): void {
        // 添加控件监听事件
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_question.node.on("click", this._onClickQuestion, this);
        this.btn_open.node.on("click", this._onClickOpen, this);
        this.panel_open.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
            this.panel_open.active = false;
        });

        for (let i = 0; i < this.vBtnsFunc.length; ++i) {
            let tagCom: TagCom = this.vBtnsFunc[i].getComponent(TagCom);
            if (!tagCom) tagCom = this.vBtnsFunc[i].addComponent(TagCom);
            switch (i) {
                case 0: tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_CREATE; break;
                case 1: tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_JOIN; break;
                case 2: tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN; break;
                default: break;
            }
            this.vBtnsFunc[i].node.on("click", (event: cc.Event) => { this._onClickBtnsFunc(tagCom.nTag, event) }, this);
        }

        // 添加消息监听事件
        cv.MessageCenter.register("on_update_club_list", this._onMsgUpdateClubList.bind(this), this.node);

        // 隐藏若干控件
        this.btn_question.node.active = false;
        this.img_icon.node.active = false;
        this.panel_open.active = false;

        this._svReuse = this.scrollview.node.getComponent(ScrollViewReuse);
        this._svReuse.bindPrefab(this.prefab_clubItem, "ClubItem");
        this._svReuse.generateItemPool();

        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("on_update_club_list", this.node);
    }

    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("ClubMainView_club_panel_clubMainTitle_Txt");
        this.txt_icon_word.string = cv.config.getStringData("ClubMainView_club_panel_noclubIcon_noclub_Txt");

        for (let i = 0; i < this.vBtnsFunc.length; ++i) {
            let txt: cc.Label = this.vBtnsFunc[i].node.getChildByName("txt").getComponent(cc.Label);
            let tagCom: TagCom = this.vBtnsFunc[i].getComponent(TagCom);
            switch (i) {
                case 0: {
                    if (cv.config.isOverSeas()) {
                        txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_addClub_button");            // 加入社区
                        if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_JOIN;
                    }
                    else {
                        txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_createClub_button");         // 新建社区
                        if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_CREATE;
                    }
                } break;

                case 1: {
                    if (cv.config.isOverSeas()) {
                        txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_addClub_button_1");          // 加入公会
                        if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN;
                    }
                    else {
                        txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_addClub_button");            // 加入社区
                        if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_JOIN;
                    }
                } break;

                case 2: {
                    txt.string = cv.config.getStringData("ClubMainView_club_panel_clubButton_panel_addClub_button_1");              // 加入公会
                    if (tagCom) tagCom.nTag = ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN;
                } break;

                default: break;
            }
        }
    }

    // 返回按钮
    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE, (scene: cc.Scene) => {
            if (this.isBackToHallSceneSelfView) {
                cv.MessageCenter.send("switchSceneToSelfView");
            }
        });
    }

    // 问号按钮
    private _onClickQuestion(event: cc.Event): void {
        console.log("ClubMainView - click question btn");
    }

    // 打开面板
    private _onClickOpen(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.panel_open.active = !this.panel_open.active;
        this._updateBtnListView();
    }

    // 面板相关按钮
    private _onClickBtnsFunc(eFunc: ClubSceneAddBtnFuc, event: cc.Event): void {
        this.panel_open.active = false;
        cv.AudioMgr.playButtonSound('tab');
        switch (eFunc) {
            // 新建社区
            case ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_CREATE: {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_CLUB_CREATE_VIEW,
                    lastView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            // 加入社区
            case ClubSceneAddBtnFuc.E_ADD_FUNC_CLUB_JOIN: {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_CLUB_SEARCH_VIEW,
                    lastView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            // 加入公会
            case ClubSceneAddBtnFuc.E_ADD_FUNC_ALLIANCE_JOIN: {
                ClubScene.g_gotoAV_fromCV_BtnOpen = true;
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_ALLIANCE_SEARCH_VIEW,
                    lastView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            default: break;
        }
    }

    private _sortClubList(a: ClubData, b: ClubData): number {
        let retValue: number = 0;
        let selfID: number = cv.dataHandler.getUserData().u32Uid;

        if (a.club.club_owner === selfID && b.club.club_owner === selfID) {
            return a.club.club_id - b.club.club_id;
        }
        else if (a.club.club_owner === selfID && b.club.club_owner !== selfID) {
            retValue = -1;
        }
        else if (a.club.club_owner !== selfID && b.club.club_owner === selfID) {
            retValue = 1;
        }
        else {
            if (a.club.is_manager === 1 && b.club.is_manager !== 1) {
                retValue = -1;
            }
            else if (a.club.is_manager !== 1 && b.club.is_manager === 1) {
                retValue = 1;
            }
            else {
                retValue = a.club.club_id - b.club.club_id;
            }
        }

        return retValue;
    }

    // 更新俱乐部列表视图
    private _onMsgUpdateClubList(): void {
        let club_data_list: ClubData[] = cv.clubDataMgr.getClubDataList();
        this.img_icon.node.active = club_data_list.length <= 0;

        club_data_list.sort(this._sortClubList);
        if (this._svReuse) this._svReuse.reloadView(club_data_list);
    }

    // 更新按钮列表
    private _updateBtnListView() {
        let club_data_list: ClubData[] = cv.clubDataMgr.getClubDataList();
        let parentNode: cc.Node = this.panel_open.getChildByName("node");
        let haveSelfClub: boolean = false;

        for (let i = 0; i < cv.StringTools.getArrayLength(club_data_list); ++i) {
            if (club_data_list[i].club.club_owner === cv.dataHandler.getUserData().u32Uid) {
                haveSelfClub = true;
                break;
            }
        }

        this.vBtnsFunc[2].node.active = haveSelfClub;
        parentNode.getChildByName("img_line_2").active = haveSelfClub;

        if (cv.config.isOverSeas()) {
            this.vBtnsFunc[1].node.active = haveSelfClub;
            parentNode.getChildByName("img_line_1").active = haveSelfClub;

            this.vBtnsFunc[2].node.active = false;
            parentNode.getChildByName("img_line_2").active = false;
        }

        let baseHeight: number = 80;
        let baseOffset: number = 90;
        let visibleCount: number = 0;
        for (let i = 0; i < this.vBtnsFunc.length; ++i) {
            if (this.vBtnsFunc[i].node.active) ++visibleCount;
        }
        // visibleCount = Math.max(0, visibleCount - 1);
        // parentNode.height = baseHeight + baseOffset * visibleCount;
        parentNode.height = 436 - (3 - visibleCount) * 130;
    }
}
