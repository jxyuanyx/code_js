import cv from "../../../Script/components/lobby/cv";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";
import { ClubData } from "../../../Script/data/club/ClubData";
import { RemarkData } from "../../../Script/data/userData";
import { CircleSprite, Head_Mode } from "../../common/tools/CircleSprite";
import { ClubSpread } from "./ClubSpread";

/**
 * 俱乐部介绍
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubIntroduce extends cc.Component {
    @property(cc.Prefab) prefab_clubSpread: cc.Prefab = null;                       // 俱乐部推广预制件

    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_club_flag_word: cc.Label = null;
    @property(cc.Label) txt_club_id_word: cc.Label = null;
    @property(cc.Label) txt_club_creater_word: cc.Label = null;
    @property(cc.Label) txt_member_word: cc.Label = null;
    @property(cc.Label) txt_introduce_word: cc.Label = null;

    @property(cc.Label) txt_club_name: cc.Label = null;
    @property(cc.Label) txt_club_area: cc.Label = null;
    @property(cc.Label) txt_club_id: cc.Label = null;
    @property(cc.Label) txt_creater: cc.Label = null;
    @property(cc.Label) txt_member: cc.Label = null;
    @property(cc.Label) txt_introduce: cc.Label = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_question: cc.Button = null;
    @property(cc.Button) btn_member: cc.Button = null;
    @property(cc.Button) btn_array: cc.Button[] = [];
    @property(cc.Button) btn_deal: cc.Button = null;

    @property(cc.Sprite) img_club_head: cc.Sprite = null;
    @property(cc.Sprite) img_creater_head: cc.Sprite = null;
    @property(cc.Sprite) img_shiled: cc.Sprite = null;

    @property(cc.Node) panel_member: cc.Node = null;
    @property(cc.Node) panel_func: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例

    private red_path: string = "zh_CN/club/club_red_btn";
    private green_path: string = "zh_CN/club/club_green_btn";

    private btn_spread_pos: cc.Vec2 = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubIntroduce._g_prefabInst) ClubIntroduce._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubIntroduce._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubIntroduce._g_prefabInst, true)) {
                ClubIntroduce._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubIntroduce._g_prefabInst;
    }

    protected onLoad(): void {

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.img_shiled.node.active = false;
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_member.node.on("click", this._onClickMember, this);
        this.btn_deal.node.on("click", this._onClickDeal, this);

        for (let i = 0; i < this.btn_array.length; ++i) {
            this.btn_array[i].node.on("click", (event: cc.Event.EventCustom) => { this._onClickBtns(event, i); }, this);
        }

        cv.MessageCenter.register("update_roleInfo", this._onMsgUpdateClubCreaterInfo.bind(this), this.node);
        cv.MessageCenter.register("update_clubdata", this._onMsgUpdateClubInfo.bind(this), this.node)
        cv.MessageCenter.register("leave_club", this._onMsgLeaveClub.bind(this), this.node);

        // 初始化若干控件
        this.txt_club_area.string = "";
        this.btn_question.node.active = false;
    }

    protected start(): void {
        this.btn_spread_pos = this.btn_array[0].node.position;
        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("update_roleInfo", this.node);
        cv.MessageCenter.unregister("update_clubdata", this.node);
        cv.MessageCenter.unregister("leave_club", this.node);
    }

    updateView(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        cv.worldNet.requestClubCreaterInfo(clubData.club.club_owner);

        this._updateStaticText();
        this._updateView();
    }

    // 更新静态文本
    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("ClubIntroduce_introduce_txt");
        this.txt_club_flag_word.string = cv.config.getStringData("AllianceMemberItem_club_txt");
        let wordSize = cv.resMgr.getLabelStringSize(this.txt_club_id_word, cv.config.getStringData("ClubIntroduce_scrollView_clubId_txt"));
        this.txt_club_id.node.setPosition(this.txt_club_id_word.node.x + wordSize.width + 5, this.txt_club_id_word.node.y);
        this.txt_club_creater_word.string = cv.config.getStringData("ClubIntroduce_scrollView_button_0_creater_txt");
        let mSize = cv.resMgr.getLabelStringSize(this.txt_member_word, cv.config.getStringData("ClubIntroduce_scrollView_button_3_member_txt"));
        this.txt_member.node.setPosition(this.txt_member_word.node.x + mSize.width, this.txt_member.node.y);
        this.txt_introduce_word.string = cv.config.getStringData("ClubIntroduce_scrollView_introduceWord_txt");

        for (let i = 0; i < this.btn_array.length; ++i) {
            let txt: cc.Label = this.btn_array[i].node.getChildByName("txt").getComponent(cc.Label);
            switch (i) {
                case 0: txt.string = cv.config.getStringData("ClubIntroduce_scrollView_button_2_spread_txt"); break;        // 推广
                case 1: txt.string = cv.config.getStringData("ClubIntroduce_scrollView_button_7_alliance_txt"); break;      // 公会
                case 2: txt.string = cv.config.getStringData("ClubIntroduce_scrollView_button_4_settingClub_txt"); break;   // 设置社区
                default: break;
            }
        }
    }

    private _updateView(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();

        // 社区头像
        CircleSprite.setCircleSprite(this.img_club_head.node, clubData.club.club_icon, 0, true, "zh_CN/club/club_custom_icon");

        // 社区创始人头像
        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(clubData.club.club_owner);
        remark.sRemark = cv.String(remark.sRemark);
        if (remark.sRemark.length <= 0) {
            this.txt_creater.string = clubData.clubExtra.club_owner_name;
        }
        else {
            this.txt_creater.string = cv.StringTools.formatC("%s(%s)", clubData.clubExtra.club_owner_name, remark.sRemark);
        }
        CircleSprite.setCircleSprite(this.img_creater_head.node, clubData.clubExtra.club_owner_thumb, 0, false, Head_Mode.CLUB);

        this.txt_club_name.string = clubData.club.club_name;
        this.txt_club_area.string = clubData.club.club_area;
        this.txt_club_id.string = cv.String(clubData.club.club_id);
        this.txt_member.string = cv.StringTools.formatC("(%d/%d)", clubData.club.club_member_count, clubData.club.club_member_max);
        this.txt_introduce.string = clubData.club.club_descrption;

        // 是否私密：0 公开 1 私密 2 推荐
        this.panel_member.active = true;
        this.panel_func.active = true;
        this.btn_array[0].node.setPosition(this.btn_spread_pos);
        let txt_deal: cc.Label = this.btn_deal.node.getChildByName("txt").getComponent(cc.Label);
        switch (clubData.club.club_type) {
            case 0: {
                if (clubData.club.is_public_member === 1) {
                    txt_deal.string = cv.config.getStringData("UIIntrodeuceOutClub");
                    this.btn_deal.node.active = false;
                    // this.btn_deal.node.color = cc.color(213, 0, 18);
                    cv.resMgr.setButtonFrame(this.btn_deal.node, this.red_path, this.red_path, this.red_path, this.red_path);

                    for (let i = 0; i < this.btn_array.length; ++i) {
                        this.btn_array[i].node.active = false;
                    } this.btn_array[0].node.active = true;
                }
                else {
                    this.btn_deal.node.active = true;
                    // this.btn_deal.node.color = cc.color(26, 123, 250);
                    cv.resMgr.setButtonFrame(this.btn_deal.node, this.green_path, this.green_path, this.green_path, this.green_path);
                    txt_deal.string = cv.config.getStringData("UIIntrodeuceReplayClub");
                }
            } break;

            case 3: {
                this.panel_member.active = false;

                if (!cv.clubDataMgr.isIncludedOwnClubs(clubData.club.club_id)) {
                    this.panel_func.active = false;
                    this.btn_deal.node.active = true;
                    // this.btn_deal.node.color = cc.color(26, 123, 250);
                    cv.resMgr.setButtonFrame(this.btn_deal.node, this.green_path, this.green_path, this.green_path, this.green_path);
                    txt_deal.string = cv.config.getStringData("UIIntrodeuceReplayClub");
                    break;
                }
            }
            case 1:
            case 2:
            default: {
                if (clubData.club.club_owner === cv.dataHandler.getUserData().u32Uid) {
                    txt_deal.string = cv.config.getStringData("UIIntrodeuceDissolveClub");
                    this.btn_deal.node.active = true;
                    // this.btn_deal.node.color = cc.color(213, 0, 18);
                    cv.resMgr.setButtonFrame(this.btn_deal.node, this.red_path, this.red_path, this.red_path, this.red_path);

                    for (let i = 0; i < this.btn_array.length; ++i) {
                        this.btn_array[i].node.active = true;
                    }
                }
                else if (clubData.club.is_manager === 1) {
                    txt_deal.string = cv.config.getStringData("UIIntrodeuceOutClub");
                    this.btn_deal.node.active = false;
                    // this.btn_deal.node.color = cc.color(213, 0, 18);
                    cv.resMgr.setButtonFrame(this.btn_deal.node, this.red_path, this.red_path, this.red_path, this.red_path);
                    for (let i = 0; i < this.btn_array.length; ++i) {
                        this.btn_array[i].node.active = true;
                    }
                }
                else {
                    this.panel_member.active = false;

                    txt_deal.string = cv.config.getStringData("UIIntrodeuceOutClub");
                    this.btn_deal.node.active = false;
                    // this.btn_deal.node.color = cc.color(213, 0, 18);
                    cv.resMgr.setButtonFrame(this.btn_deal.node, this.red_path, this.red_path, this.red_path, this.red_path);
                    for (let i = 0; i < this.btn_array.length; ++i) {
                        this.btn_array[i].node.active = false;
                    } this.btn_array[0].node.active = true;
                    let pos = this.btn_array[0].node.parent.convertToNodeSpaceAR(this.panel_member.parent.convertToWorldSpaceAR(this.panel_member.position));
                    this.btn_array[0].node.setPosition(this.btn_array[0].node.x, pos.y);
                }
            } break;
        }
    }

    // 更新 "俱乐部创始人信息" 回调通知
    private _onMsgUpdateClubCreaterInfo(): void {
        this._updateView();
    }

    // 更新 "社区信息" 回调通知
    private _onMsgUpdateClubInfo(): void {
        this._updateView();
    }

    // 返回按钮
    private _onClickBack(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_LASTVIEW,
            lastView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    // 成员按钮
    private _onClickMember(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_CLUB_MEMBER_VIEW,
            lastView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
            transBoth: true
        });
    }

    // 功能按钮
    private _onClickBtns(event: cc.Event.EventCustom, index: number): void {
        cv.AudioMgr.playButtonSound('tab');
        switch (index) {
            // 推广
            case 0: {
                let scene: cc.Scene = cc.director.getScene();
                let inst: cc.Node = ClubSpread.getSinglePrefabInst(this.prefab_clubSpread);
                let clubSpread: ClubSpread = inst.getComponent(ClubSpread);
                clubSpread.autoShow(scene, this, true);

                // 跟踪用户行为, 发送事件
                let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
                let isClubCreater: boolean = clubData.club.club_owner === cv.dataHandler.getUserData().u32Uid;
                let inviteCode: string = isClubCreater ? clubData.club.invitation_code : clubData.club.InvitationMemberCode;
                let inviteCodeType: string = isClubCreater ? "communityHead" : "agent";
                let properties = { inviteCode: inviteCode, inviteCodeType: inviteCodeType };
                cv.segmentTool.track(cv.Enum.CurrentScreen.referralLink, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.invite, properties);
            } break;

            // 公会
            case 1: {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                    lastView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            // 设置社区
            case 2: {
                cv.MessageCenter.send("onClubSceneTransView", {
                    nextView: eClubSceneView.E_CSV_CLUB_SETTING_VIEW,
                    lastView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
                    transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                    transBoth: true
                });
            } break;

            default: break;
        }
    }

    // 处理按钮
    private _onClickDeal(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();

        // 加入
        if (clubData.club.club_type === 0 && clubData.club.is_public_member === 2) {
            cv.worldNet.requestJoinClub(clubData.club.club_id, "");
        }
        // 加入
        else if (clubData.club.club_type === 3 && !cv.clubDataMgr.isIncludedOwnClubs(clubData.club.club_id)) {
            cv.worldNet.requestJoinClub(clubData.club.club_id, "");
        }
        // 删除
        else if (clubData.club.club_owner === cv.dataHandler.getUserData().u32Uid) {
            cv.TP.showMsg(cv.config.getStringData("UIisSureTodismissClub"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
                // 禁用点击事件
                this.img_shiled.node.active = true;

                // 发送请求
                cv.worldNet.requestLeaveClub(clubData.club.club_id, cv.dataHandler.getUserData().u32Uid);
            });
        }
    }

    // 离开俱乐部消息回调(code: 1 - 成功, 否则 - 失败)
    private _onMsgLeaveClub(code: number): void {
        // 解禁点击事件
        this.img_shiled.node.active = false;

        // 成功则切换UI
        if (code === 1) {
            cv.MessageCenter.send("onClubSceneTransView", {
                nextView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                lastView: eClubSceneView.E_CSV_CURVIEW,
                transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                transBoth: true
            });
        }
    }
}
