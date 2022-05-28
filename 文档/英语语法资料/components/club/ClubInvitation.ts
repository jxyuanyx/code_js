import cv from "../../../Script/components/lobby/cv";
import { ScrollViewReuse } from "../../../Script/common/tools/ScrollViewReuse";
import { InvitationItem } from "./item/InvitationItem";
import { ClubData } from "../../../Script/data/club/ClubData";
import { ClubSpreadRule } from "./ClubSpreadRule";
import { ClubSpread } from "./ClubSpread";

/**
 * 我的邀请码
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubInvitation extends cc.Component {

    @property(cc.Prefab) prefab_item: cc.Prefab = null;                             // 俱乐部邀请码子项预制件
    @property(cc.Prefab) prefab_clubSpread: cc.Prefab = null;                       // 俱乐部推广预制件
    @property(cc.Prefab) prefab_clubSpreadRule: cc.Prefab = null;                   // 俱乐部推广说明预制件

    @property(cc.Label) txt_self_code_word: cc.Label = null;
    @property(cc.Label) txt_other_code_word: cc.Label = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_question: cc.Button = null;

    @property(cc.ScrollView) scrollview: cc.ScrollView = null;
    @property(InvitationItem) self_item: InvitationItem = null;

    private static _g_prefabInst: cc.Node = null;                                   // 单例
    private _selfClub: ClubData = null;                                             // 个人社区数据
    private _vOtherClubs: ClubData[] = [];                                          // 其他社区数据数组
    private _svReview: ScrollViewReuse = null;
    private _other_code_word_src_pos: cc.Vec2 = cc.Vec2.ZERO;
    private _svReview_src_size: cc.Size = cc.Size.ZERO;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubInvitation._g_prefabInst) ClubInvitation._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubInvitation._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubInvitation._g_prefabInst, true)) {
                ClubInvitation._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubInvitation._g_prefabInst;
    }

    autoShow(parentNode?: cc.Node, zIndex?: number): void {

        if (!parentNode) parentNode = cc.director.getScene();
        if (!parentNode.getChildByUuid(this.node.uuid)) parentNode.addChild(this.node);

        this.node.active = true;
        //this.node.zIndex = typeof zIndex === "number" ? cv.Number(zIndex) : parentNode.children.length + 1;   

        cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);

        this.updateView();
    }

    updateView(): void {
        this._updateStaticText();
        this._onMsgUpdateClubList();

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);
    }

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.btn_back.node.on("click", this._onClickBack, this);
        //this.btn_question.node.on("click", this._onClickQuestion, this);
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); });
        this._addObserver();

    }

    protected start(): void {
        this._svReview = this.scrollview.getComponent(ScrollViewReuse);
        this._svReview.bindPrefab(this.prefab_item, "InvitationItem");
        this._svReview.generateItemPool();

        this._other_code_word_src_pos = this.txt_other_code_word.node.position;
        this._svReview_src_size = cc.size(this._svReview.node.getContentSize());

        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("on_update_club_list", this.node);
        cv.MessageCenter.unregister("on_click_club_invitation_item", this.node);
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private _addObserver(): void {
        cv.MessageCenter.register("on_update_club_list", this._onMsgUpdateClubList.bind(this), this.node);
        cv.MessageCenter.register("on_click_club_invitation_item", this._onMsgClickClubInvitationItem.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._updateStaticText.bind(this), this.node);
        cv.MessageCenter.register("HideWebview_ShowWindows", this.hide.bind(this), this.node);
    }

    hide() {
        this.node.active = false;
    }

    // 更新静态文本
    private _updateStaticText(): void {
        // 标题
        do {
            let label: cc.Label = this.node.getChildByName("txt_title_word").getComponent(cc.Label);
            label.string = cv.config.getStringData("selfView_ScrollView_Button_4_Text_3_0");
        } while (false);

        // 推广说明
        do {
            let label: cc.Label = this.btn_question.node.getChildByName("txt").getComponent(cc.Label);
            label.string = cv.config.getStringData("ClubSpreadRule_title_txt");
        } while (false);

        // 我的邀请码
        do {
            this.txt_self_code_word.string = cv.config.getStringData("ClubInvitation_myclubinvitation_text");
        } while (false);

        // 俱乐部的邀请码
        do {
            this.txt_other_code_word.string = cv.config.getStringData("ClubInvitation_myclubprivate_text");
        } while (false);
    }

    // 返回
    private _onClickBack(): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(this.node
            , cv.action.eMoveActionDir.EMAD_TO_RIGHT
            , cv.action.eMoveActionType.EMAT_FADE_OUT
            , cv.action.delay_type.NORMAL
            , (target: cc.Node, actIO: number): void => { }
            , (target: cc.Node, actIO: number): void => {
                // 恢复显示"邮件"图标
                cv.MessageCenter.send("show_mail_entrance", true);
            });
    }

    // 推广说明
    private _onClickQuestion(): void {
        cv.AudioMgr.playButtonSound('close');
        let inst: cc.Node = ClubSpreadRule.getSinglePrefabInst(this.prefab_clubSpreadRule);
        let clubSpreadRule: ClubSpreadRule = inst.getComponent(ClubSpreadRule);
        let scene: cc.Scene = cc.director.getScene();
        clubSpreadRule.autoShow(scene, this, true);
    }

    // 更新社区列表
    private _onMsgUpdateClubList(): void {
        this._selfClub = null;
        this._vOtherClubs.splice(0, this._vOtherClubs.length);

        let club_data_list: ClubData[] = cv.clubDataMgr.getClubDataList();
        for (let i = 0; i < cv.StringTools.getArrayLength(club_data_list); ++i) {
            let clubData: ClubData = club_data_list[i];
            if (clubData.club.club_owner === cv.dataHandler.getUserData().u32Uid) {
                this._selfClub = clubData;
            }
            else {
                this._vOtherClubs.push(clubData);
            }
        }

        if (this._selfClub) {
            this.self_item.setData(this._selfClub);
        } else {
            this.self_item.setItemShow(false)
        }

        this._doLayout();
    }

    // 点击子项事件回调
    private _onMsgClickClubInvitationItem(param: ClubData) {
        if (!param) return;
        cv.clubDataMgr.setCurOpClubID(param.club.club_id);

        let scene: cc.Scene = cc.director.getScene();
        let inst: cc.Node = ClubSpread.getSinglePrefabInst(this.prefab_clubSpread);
        let clubSpread: ClubSpread = inst.getComponent(ClubSpread);
        clubSpread.autoShow(scene, this, true);

        // 跟踪用户行为, 发送事件
        let isClubCreater: boolean = param.club.club_owner === cv.dataHandler.getUserData().u32Uid;
        let inviteCode: string = isClubCreater ? param.club.invitation_code : param.club.InvitationMemberCode;
        let inviteCodeType: string = isClubCreater ? "communityHead" : "agent";
        let properties = { inviteCode: inviteCode, inviteCodeType: inviteCodeType };
        cv.segmentTool.track(cv.Enum.CurrentScreen.referralLink, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.invite, properties);
    }

    // 排版
    private _doLayout(): void {
        let bSelfClub: boolean = this._selfClub != null;
        let scroviewTargetSize: cc.Size = cc.size(this._svReview_src_size);

        //this.txt_self_code_word.node.active = bSelfClub;
        //this.self_item.node.active = bSelfClub;

        let bOtherClub: boolean = this._vOtherClubs.length > 0;
        this.txt_other_code_word.node.active = bOtherClub;
        this.scrollview.node.active = bOtherClub;



        if (!this._svReview) return;

        // 计算大小
        if (false) { //!bSelfClub) {
            this.txt_other_code_word.node.setPosition(this.txt_self_code_word.node.position);
            scroviewTargetSize.height = this.node.height * this.node.anchorY + this.txt_other_code_word.node.y - this.txt_other_code_word.node.height * this.txt_other_code_word.node.anchorY - 20;
        }
        else {
            this.txt_other_code_word.node.setPosition(this._other_code_word_src_pos);
            scroviewTargetSize.height = this._svReview_src_size.height;
        }
        this._svReview.resetScrollVewSize(scroviewTargetSize);

        // 计算位置
        let pos_x: number = this.scrollview.node.x;
        let pos_y: number = -this.node.height * this.node.anchorY + this.scrollview.node.height * this.scrollview.node.anchorY;
        this.scrollview.node.setPosition(pos_x, pos_y);

        // 刷新滚动视图
        this._svReview.reloadView(this._vOtherClubs);
    }
}
