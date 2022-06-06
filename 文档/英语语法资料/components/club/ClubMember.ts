import cv from "../../../Script/components/lobby/cv";
import { ControlSwitch } from "../lobby/controlSwitch/ControlSwitch";
import { ClubData } from "../../../Script/data/club/ClubData";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";
import { ScrollViewReuse } from "../../../Script/common/tools/ScrollViewReuse";

/**
 * 俱乐部成员列表界面逻辑
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubMember extends cc.Component {
    @property(cc.Prefab) prefab_item: cc.Prefab = null;

    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_audit_word: cc.Label = null;
    @property(cc.Label) txt_member_count: cc.Label = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_manage: cc.Button = null;
    @property(cc.Button) btn_search: cc.Button = null;

    @property(cc.EditBox) edt_search_id: cc.EditBox = null;
    @property(ControlSwitch) auditSwitch: ControlSwitch = null;
    @property(cc.ScrollView) scrollview: cc.ScrollView = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例
    private static _bManageMode: boolean = false;
    private _svReuse: ScrollViewReuse = null;

    static getManageMode(): boolean {
        return ClubMember._bManageMode;
    }

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubMember._g_prefabInst) ClubMember._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubMember._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubMember._g_prefabInst, true)) {
                ClubMember._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubMember._g_prefabInst;
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
            this._svReuse = this.scrollview.getComponent(ScrollViewReuse);
            this._svReuse.bindPrefab(this.prefab_item, "ClubMemberItem");
            this._svReuse.bindScrollEventTarget(this);
            this._svReuse.generateItemPool();
        }
        this.updateView();
    }

    protected onLoad(): void {



        this.txt_audit_word.node.active = false;
        this.auditSwitch.node.active = false;
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_manage.node.on("click", this._onClickManage, this);
        this.btn_search.node.on("click", this._onClickSearch, this);

        this.edt_search_id.node.on("editing-did-began", this._onEdtDidBegan, this);
        this.edt_search_id.node.on("editing-did-ended", this._onEdtDidEnded, this);
        this.edt_search_id.node.on("text-changed", this._onEdtTxtChanged, this);
        this.edt_search_id.node.on("editing-return", this._onEdtReturn, this);
        //this.auditSwitch.node.on(ControlSwitch.g_event_name_switch, this._onSwitchFinish, this);

        cv.MessageCenter.register("update_memberList", this._onMsgUpdateMemBerList.bind(this), this.node);
        cv.MessageCenter.register("updateSearchListM", this._onMsgUpdateSearchList.bind(this), this.node);

        this.edt_search_id.getComponent(cc.EditBox).placeholder = cv.config.getStringData("ClubMember_search_text");
    }

    protected start(): void {
        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("update_memberList", this.node);
        cv.MessageCenter.unregister("updateSearchListM", this.node);
    }

    updateView(): void {
        this._checkMemListOnce();
        this._updateStaticText();
        this._updateView();
    }

    // 滚动到底部边界事件
    onSVEventScrollToBottom(arg: cc.ScrollView): void {
        this._checkMemListOnce(false);
    }

    // 更新静态文本
    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("ClubMember_clubMemberTitle_txt");
        //this.txt_audit_word.string = cv.config.getStringData("ClubMember_auto_txt");
        this.btn_manage.getComponent(cc.Label).string = cv.config.getStringData("ClubMember_manage_button");
    }

    // 更新视图
    private _updateView(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        this.txt_member_count.string = cv.StringTools.formatC("(%d/%d)", clubData.club.club_member_count, clubData.club.club_member_max);

        // 是否显示"成员管理"按钮
        let bManager: boolean = cv.dataHandler.getUserData().u32Uid === clubData.club.club_owner;
        this.btn_manage.node.active = bManager;
        this.btn_manage.node.color = bManager ? cc.color(59, 163, 217) : cc.color(127, 127, 127);

        // 是否自动通过审核
        this.auditSwitch.switchOn = clubData.club.is_agree === 1;

        // 刷新成员列表
        ClubMember._bManageMode = false;
        if (this._svReuse) this._svReuse.reloadView(clubData.clubExtra.club_member_list, true);
    }

    // 检测拉取俱乐部成员列表 once - true:只拉取一次, false:拉取多次, 默认true
    private _checkMemListOnce(once?: boolean): void {
        let bOnce = once === false ? false : true;
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (clubData.clubExtra.club_member_list.length <= 0 || (!bOnce && clubData.clubExtra.club_member_list.length < clubData.club.club_member_count)) {
            cv.worldNet.requestClubMemberSnapshotList(20, clubData.club.club_id);
        }
    }

    // 返回按钮
    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
            lastView: eClubSceneView.E_CSV_CLUB_MEMBER_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    // 成员管理按钮
    private _onClickManage(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        ClubMember._bManageMode = !ClubMember._bManageMode;
        if (this._svReuse) this._svReuse.reloadView();
    }

    // 成员搜索
    private _onClickSearch(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._checkMemberSearch(this.edt_search_id.string, 1);
    }

    // 自动审核按钮
    /*private _onSwitchFinish(status: boolean): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        let audit: number = status ? 1 : 0;
        cv.worldNet.requestClubAutoAudit(clubData.club.club_id, audit);
    }*/

    // 分页拉取成员列表回调
    private _onMsgUpdateMemBerList(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        let isClickManger = cv.clubDataMgr.isClickManger();
        if (this._svReuse) this._svReuse.reloadView(clubData.clubExtra.club_member_list, isClickManger);
        cv.clubDataMgr.setClickManger(false);
    }

    // 开始编辑文本输入框触发的事件回调
    private _onEdtDidBegan(edt: cc.EditBox): void {
        console.log("editing - did_began");
    }

    // 结束编辑文本输入框时触发的事件回调
    private _onEdtDidEnded(edt: cc.EditBox): void {
        console.log("editing - did_ended");
    }

    // 编辑文本输入框时触发的事件回调
    private _onEdtTxtChanged(edt: cc.EditBox): void {
        console.log("editing - txt_changed = ");
    }

    // 当用户按下回车按键时的事件回调(目前不支持 windows 平台)
    private _onEdtReturn(edt: cc.EditBox): void {
        console.log("editing - return");
        this._checkMemberSearch(edt.string, 1);
    }

    // 检测成员搜索
    private _checkMemberSearch(searchID: string, searchType: number): void {
        searchID = cv.String(searchID);
        searchType = cv.Number(searchType);

        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        if (searchID.length <= 0) {
            this._svReuse.reloadView(clubData.clubExtra.club_member_list);
        }
        else {
            cv.worldNet.requestSearchClubMember(clubData.club.club_id, this.edt_search_id.string, searchType);
        }
    }

    // 搜索成员列表回调
    private _onMsgUpdateSearchList(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        this._svReuse.reloadView(clubData.clubExtra.club_member_search_list);
    }
}
