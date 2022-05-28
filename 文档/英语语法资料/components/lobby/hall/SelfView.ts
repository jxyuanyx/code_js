import cv from "../cv";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import ActivityView from "./ActivityView";
import { userData } from "../../../data/userData";
import { RoleInfoSet } from "./RoleInfoSet";
import { eClubSceneView, ClubScene } from "../../club/ClubScene";
import { ClubInvitation } from "../../club/ClubInvitation";
import { SystemSetting } from "./SystemSetting";
import FeedbackView from "./FeedbackView";
import RemarksView from "./RemarksView";
import MyRedPackets from "./MyRedPackets";
import { MttBackpack } from "./MttBackpack";
import { ClubData } from "../../../data/club/ClubData";
import { TagCom } from "../../../common/tools/TagCom";
import { GameReviewFavorList } from "../../game/dzPoker/gameReview/GameReviewFavorList";
import { LanguageSet } from "./LanguageSet";
import MTTConnector from "../../../../mtt/script/common/MTTConnector";
import BJPVPConnector from "../../../../blackjackpvp/script/common/BJPVPConnector";
/**
 * 个人面板功能按钮索引标记
 */
enum eSelfViewFuncFlagIdx {
    SVFFI_NONE = 0,                         // 无
    SVFFI_MY_INVITATION_CODE,               // 我的邀请码
    SVFFI_MY_CLUB,                          // 我的社区
    SVFFI_MY_ALLIANCE,                      // 我的公会
    SVFFI_MY_RED_PACKETS,                   // 我的红包
    SVFFI_GAME_COLLECTION,                  // 牌谱收藏
    SVFFI_GAME_LANGUAGE,                    // 语言设置
    SVFFI_GAME_RECORD,                      // 战绩
    SVFFI_GAME_BACKPACK,                    // mtt背包
    SVFFI_GAME_VIPTOOL,                     // VIP工具
    SVFFI_GAME_REMARKS,                     // 标记和备注
    SVFFI_GAME_SHENSUAN,                    // 神算师
    SVFFI_GAME_SETTING,                     // 设置
    SVFFI_GAME_FEEDBACK,                    // 建议反馈
    SVFFI_EXTRA,                            // 额外预留

}

/**
 * 个人面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class SelfView extends cc.Component {
    @property(cc.Prefab) prefab_clubInvitation: cc.Prefab = null;       // 邀请码预制件
    @property(cc.Prefab) prefab_allianceMainView: cc.Prefab = null;     // 公会预制件
    @property(cc.Prefab) prefab_gameReview: cc.Prefab = null;           // 牌谱预制件
    @property(cc.Prefab) prefab_gameRecord: cc.Prefab = null;           // 战绩预制件
    @property(cc.Prefab) prefab_systemSetting: cc.Prefab = null;        // 系统设置预制件
    @property(cc.Prefab) prefab_roleInfoSet: cc.Prefab = null;          // 设置头像性别预制件
    @property(cc.Prefab) prefab_LangSet: cc.Prefab = null;              // 设置语言挂件
    @property(cc.Prefab) prefab_MttBackpack: cc.Prefab = null;          // mtt背包
    @property(cc.Prefab) prefab_FeedbackView: cc.Prefab = null;         // 建议反馈预制件
    @property(cc.Prefab) prefab_RemarksView: cc.Prefab = null;          // 标记和备注预制件
    @property(cc.Prefab) prefab_MyRedPackets: cc.Prefab = null;         // 我的红包预制件


    @property(cc.Label) txt_user_name: cc.Label = null;
    @property(cc.Label) txt_user_id: cc.Label = null;
    @property(cc.Label) txt_user_mark: cc.Label = null;
    @property(cc.Label) txt_user_wealth: cc.Label = null;

    @property(cc.Sprite) img_user_head: cc.Sprite = null;
    @property(cc.Sprite) img_user_gender: cc.Sprite = null;


    private img_invite_gift: cc.Node = null;
    @property(cc.Node) panel_1: cc.Node = null;
    @property(cc.Node) panel_2: cc.Node = null;
    @property(cc.Node) panel_3: cc.Node = null;

    @property(cc.Button) btn_user_info: cc.Button = null;

    @property(cc.ScrollView) scrollview: cc.ScrollView = null;


    _signature_panel: cc.Node = null;
    _signature_button: cc.Node = null;
    _signature_editbox: cc.Node = null;
    _signature_text: cc.Node = null;
    _signature_sure_button: cc.Node = null;
    _editbox_state = 0;

    private vBtns: cc.Button[] = [];

    private SELF_BTN_NUMBER: number = 13;
    private _inst_gameRecord: cc.Node = null;                           // 战绩预制实例
    private _inst_roleInfoSet: cc.Node = null;                          // 设置头像性别实例
    private _vBtnsSrcPos: cc.Vec2[] = [];                               // 功能按钮原始位置
    private _backpack_node: cc.Node = null;
    private _backpack_url: string = "&page=2";
    private _txtInviteLabel: cc.Node = null;
    private _preHeadUrl: string = "";
    private _openAvatar: boolean = false;
    private _btnSettingNode: cc.Node = null;
    private _BakSignalString:string = null;
    private _bDefaultSign:boolean = false;

    protected onLoad(): void {
        this.txt_user_mark.node.active = false;
        this.btn_user_info.node.on("click", this._onClickUserInfo, this);

        cv.resMgr.adaptWidget(this.node, true);
        cv.config.adaptSize([cc.find("ScrollView", this.node)]);

        let cell = cc.find("buttonItem", this.node);
        let contentNode = cc.find("ScrollView/content", this.node);
        let len = this.SELF_BTN_NUMBER;

        let contentHeight = contentNode.height;
        let cellSize = cell.height * len;
        if (cellSize > contentHeight) {
            contentNode.setContentSize(cc.size(contentNode.width, cellSize));
        }

        for (let i = 0; i < len; i++) {
            let btn = cc.instantiate(cell);
            btn.setPosition(cc.v2(contentNode.width / 2, -cell.height * i - cell.height / 2));
            btn.active = true;
            this.setButtonIcon(btn.getChildByName("icon"), i);
            contentNode.addChild(btn);
            this.vBtns.push(btn.getComponent(cc.Button));
        }

        this.addButtonStrLanguage();
        this.addButtonComp();
        this.updateMTTState();

        cv.MessageCenter.register("update_info", this.updateView.bind(this), this.node);
        cv.MessageCenter.register("update_gold", this._onMsgUpdateGold.bind(this), this.node);
        cv.MessageCenter.register("modify_info_succ", this._onMsgModifyInfo.bind(this), this.node);
        cv.MessageCenter.register("on_update_club_list", this._onMsgUpdateAlliance.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._onMsgChangeLanguage.bind(this), this.node);
        cv.MessageCenter.register("update_mtt_state", this.updateMTTState.bind(this), this.node);
        cv.MessageCenter.register("HideWebview_ShowWindows", this.hideMTTWeb.bind(this), this.node);
        cv.MessageCenter.register("open_avatar", this.openAvatar.bind(this), this.node);
        cv.MessageCenter.register("hide_redDotGuide", this.onHideReddotGuide.bind(this), this.node);
        cv.MessageCenter.register("get_feedback_lists", this.onUpdataFeedbacklist.bind(this), this.node);
        cv.MessageCenter.register("updata_my_redpackets_pos", this.onUodataRedPacketsPos.bind(this), this.node);
        cv.MessageCenter.register("open_myredpackets", this.onOpenRedPackets.bind(this), this.node);
        cv.MessageCenter.register("get_usermarks", this.onGetUserMarks.bind(this), this.node);
        cv.MessageCenter.register("modify_usermarks", this.onModifyUserMarks.bind(this), this.node);

        // 反馈列表需要在主场景初始化的时候获取
       
        cv.httpHandler.requestGetFeedBackLists();

        this.addSignatureMark();
        
    }

    onEnable(){
        cv.worldNet.GetUserMarksRequest(cv.dataHandler.getUserData().u32Uid);
    }

    protected addButtonComp() {
        for (let i = 0; i < this.vBtns.length; ++i) {
            // 添加功能标记
            let tag: TagCom = this.vBtns[i].addComponent(TagCom);
            switch (i) {
                case 0: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_MY_INVITATION_CODE; break;        // 我的邀请码
                case 1: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_MY_CLUB; break;                   // 我的社区
                case 2: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_MY_ALLIANCE; break;               // 我的公会
                case 3: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_MY_RED_PACKETS; break;            // 我的红包
                case 4: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_COLLECTION; break;           // 牌谱收藏
                case 5: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_LANGUAGE; break;             // 语言
                case 6: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_RECORD; break;               // 战绩
                case 7: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_BACKPACK; break;             // mtt背包 
                case 8: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_VIPTOOL; break;              // VIP工具
                case 9: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_REMARKS; break;              // 标记和备注
                case 10: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_SHENSUAN; break;            // 神算师
                case 11: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_SETTING; break;             // 设置
                case 12: tag.nTag = eSelfViewFuncFlagIdx.SVFFI_GAME_FEEDBACK; break;

                default: break;
            }
            let bgCommon = this.vBtns[i].node.getChildByName("BgCommon");
            let bgGift = this.vBtns[i].node.getChildByName("BgGift");
            if (tag.nTag == eSelfViewFuncFlagIdx.SVFFI_MY_INVITATION_CODE) {
                bgCommon.active = false;
                bgGift.active = true;
                this._txtInviteLabel = bgGift.getChildByName("txtInvite");
                this.vBtns[i].node.getChildByName("line").active = false;
            } else {
                bgCommon.active = true;
                bgGift.active = false;
            }

            if (tag.nTag == eSelfViewFuncFlagIdx.SVFFI_GAME_SETTING) {
                this._btnSettingNode = this.vBtns[i].node;
            }
            // 记录原始位置
            this._vBtnsSrcPos.push(cc.v2(this.vBtns[i].node.position));

            // 添加点击事件
            this.vBtns[i].node.on("click", (event: cc.Event.EventCustom) => {
                this._onClickBtns(event, tag.nTag);
            }, this);
        }
    }

    private addSignatureMark(){

        this._signature_panel = this.img_user_head.node.getChildByName("signature_panel");
        this._signature_button = this._signature_panel.getChildByName("signature_button");
        this._signature_editbox = this._signature_panel.getChildByName("editbox");
        this._signature_editbox.getComponent(cc.EditBox).placeholder = cv.config.getStringData("Star_input_signature");
        this._signature_text = this._signature_panel.getChildByName("signature_text");
        this._signature_sure_button = this._signature_panel.getChildByName("signature_sure_button");

        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;
        this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
        this._signature_button.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
        this._signature_sure_button.getComponent(cc.Button).interactable = false;
        let spIcon = this._signature_sure_button.getChildByName("Background");
        spIcon.color = cc.color(76,76,76);
        this._signature_sure_button.on('click', function () {
            let str = this._signature_editbox.getComponent(cc.EditBox).string;
            let errorMsg = null;
            let errorType = null;

            let edit_state = cv.dataHandler.getUserData().mark_edit_state;
            if(edit_state == 1){
                //修改次数达到上限
                cv.TT.showMsg(cv.config.getStringData("signature_limit_tip"), cv.Enum.ToastType.ToastTypeError);
                return;
            }else if(edit_state == 2){
                //修入敏感字符达到上限
                cv.TT.showMsg(cv.config.getStringData("signature_sensitive_tip"), cv.Enum.ToastType.ToastTypeError);
                return;
            }

            if (str != cv.config.getStringData("Star_signature") && !cv.StringTools.isClubNameFormat(str)) {
                errorMsg = "tips_no_special_words";
                errorType = "ToastTypeWarning";
            } else if (cv.StringTools.isSensitiveWords(str)) {
                errorMsg = "tips_no_sensitive_words";
                errorType = "ToastTypeWarning";
                cv.worldNet.UpdateUserMarksRequest("", 1);    //修改为敏感字符，传状态给服务器
            }
            if (errorMsg != null) {
                cv.TT.showMsg(cv.config.getStringData(errorMsg), errorType);
                return;
            }

            let strsp = this._signature_editbox.getComponent(cc.EditBox).string.trim();
            if (strsp.length == 0) {
                // cv.TT.showMsg(cv.config.getStringData("Star_signature_empty"), cv.Enum.ToastType.ToastTypeError);
                // return;
            }
            cv.worldNet.UpdateUserMarksRequest(this._signature_editbox.getComponent(cc.EditBox).string);
        }, this);
    }

    closeSign() {

        let edit_state = cv.dataHandler.getUserData().mark_edit_state;
        if(edit_state == 1){
            //修改次数达到上限
            cv.TT.showMsg(cv.config.getStringData("signature_limit_tip"), cv.Enum.ToastType.ToastTypeError);
            return;
        }else if(edit_state == 2){
            //修入敏感字符达到上限
            cv.TT.showMsg(cv.config.getStringData("signature_sensitive_tip"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        this._signature_editbox.active = true;

        if (this._signature_text.getComponent(cc.Label).string == cv.config.getStringData("Star_signature")) {
            this._signature_editbox.getComponent(cc.EditBox).string = "";
            this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
        }
        else {
            this._signature_editbox.getComponent(cc.EditBox).string = this._signature_text.getComponent(cc.Label).string;
            this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
        }

        //cv.resMgr.setSpriteFrame(cc.find("Background", this._signature_sure_button), "zh_CN/game/dzpoker/datacard/btn_signature1");
        this._signature_sure_button.active = true;
        this._signature_text.active = false;
        this._signature_button.active = false;

        this.onTextChanged();
        if (this._editbox_state == 0) {
            this._editbox_state = 1;
            this._signature_editbox.getComponent(cc.EditBox).focus();
        }
    }
    
    private onTextChanged() {

        let strsp = this._signature_editbox.getComponent(cc.EditBox).string.trim();
        let spIcon = this._signature_sure_button.getChildByName("Background");

        if(this._BakSignalString == strsp || 
            (strsp.length <=0 && this._BakSignalString === cv.config.getStringData("Star_signature"))){
            //签名没有改变，禁用提交按钮
            this._signature_sure_button.getComponent(cc.Button).interactable = false;
            spIcon.color = cc.color(76,76,76);
        }else{
            this._signature_sure_button.getComponent(cc.Button).interactable = true;
            spIcon.color = cc.color(255,255,255);
        }
        
        //cv.resMgr.setSpriteFrame(cc.find("Background", this._signature_sure_button), "zh_CN/game/dzpoker/datacard/btn_signature2");
        this._signature_sure_button.getComponent(cc.Button).enabled = true;

    }

    private onEditReturn() {
        cc.log("return return return");
    }

    private onEditDidEnded() {
        cc.log("ended ended ended");
    }

    public onGetUserMarks(msg: any) {
        if (msg) {
            if (msg.marks.length > 0) {
                this._bDefaultSign = false;
                this._signature_text.getComponent(cc.Label).string = msg.marks;
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 255;
            }
            else {
                this._bDefaultSign = true;
                this._signature_text.getComponent(cc.Label).string = cv.config.getStringData("Star_signature");
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 102;
            }

            this._BakSignalString = this._signature_text.getComponent(cc.Label).string;

            this._signature_text.getComponent(cc.Label)._forceUpdateRenderData(true);
            let actSize = cv.tools.getActualSize(this._signature_text);
            this._signature_button.setPosition(this._signature_text.getPosition().x + actSize.width + 12, this._signature_button.getPosition().y);
        }
    }

    public onModifyUserMarks(msg: any) {
        if (msg) {
            this._editbox_state = 0;
            cv.TT.showMsg(cv.config.getStringData("Star_edit_success"), cv.Enum.ToastType.ToastTypeSuccess);
            if (msg.marks.length > 0) {
                this._bDefaultSign = false;
                this._signature_text.getComponent(cc.Label).string = msg.marks;
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 255;
            }
            else {
                this._bDefaultSign = true;
                this._signature_text.getComponent(cc.Label).string = cv.config.getStringData("Star_signature");
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 102;
            }

            this._BakSignalString = this._signature_text.getComponent(cc.Label).string;
            this._signature_text.getComponent(cc.Label)._forceUpdateRenderData(true);
            let actSize = cv.tools.getActualSize(this._signature_text);
            this._signature_button.setPosition(this._signature_text.getPosition().x + actSize.width + 12, this._signature_button.getPosition().y);
            this._signature_editbox.active = false;
            this._signature_sure_button.active = false;

            this._signature_text.active = true;
            this._signature_button.active = true;
        }

    }
    //按钮文本
    private addButtonStrLanguage() {
        for (let i = 0; i < this.vBtns.length; ++i) {
            let txt: cc.Label = this.vBtns[i].node.getChildByName("itemName").getComponent(cc.Label);
            let strKey: string = "";
            switch (i) {
                case 0: strKey = "selfView_ScrollView_Button_4_Text_3_0"; break;                // 我的邀请码 
                case 1: strKey = "selfView_ScrollView_Button_2_Text_3_0"; break;                // 我的社区
                case 2: strKey = "selfView_ScrollView_Button_5_Text_3_0"; break;                // 我的公会
                case 3: strKey = "selfView_ScrollView_Button_my_redpackets"; break;             // 我的红包
                case 4: strKey = "selfView_ScrollView_Button_1_Text_3_0"; break;                // 牌谱收藏
                case 5: strKey = "SystemSet_language_setButton_Text_22"; break;                 // 语言
                case 6: strKey = "selfView_ScrollView_Button_3_Text_3_0"; break;                // 战绩
                case 7: strKey = "selfView_ScrollView_Button_backpack"; break;                  // 背包
                case 8: strKey = "selfView_ScrollView_Button_VIPTOOL"; break;                   // VIP工具
                case 9: strKey = "RemarksView_title"; break;                                    // 标记和备注
                case 10: strKey = "selfView_ScrollView_Button_7_Text_3_0"; break;               // 神算师
                case 11: strKey = "selfView_ScrollView_Button_6_Text_3_0"; break;               // 设置
                case 12: strKey = "selfView_ScrollView_Button_8_Text_3_0"; break;               // 建议反馈
                default: break;
            }
            txt.string = cv.config.getStringData(strKey);
        }
    }

    //按钮图标路径
    private setButtonIcon(node: cc.Node, index: number) {
        let strKey: string = "";
        switch (index) {
            case 0: strKey = "icon_invitation-code"; break;                                     // 我的邀请码 
            case 1: strKey = "myself_icon_mine"; break;                                         // 我的社区
            case 2: strKey = "myself_icon_Guild"; break;                                        // 我的公会
            case 3: strKey = "icon_me_redenvelope"; break;                                      // 我的红包
            case 4: strKey = "myself_icon_collect"; break;                                      // 牌谱收藏
            case 5: strKey = "common_icon_language"; break;                                     // 语言
            case 6: strKey = "myself_icon_Record"; break;                                       // 战绩
            case 7: strKey = "myself_icon_beibao"; break;                                       // 背包
            case 8: strKey = "myself_icon_vip"; break;                                          // VIP工具
            case 9: strKey = "myself_icon_Notes"; break;                                        // 标记和备注
            case 10: strKey = "myself_icon_calculator"; break;                                  // 神算师
            case 11: strKey = "common_icon_set"; break;                                         // 设置
            case 12: strKey = "myself_icon_suggest"; break;                                     // 建议反馈
            default: break;
        }

        cv.resMgr.setSpriteFrame(node, "zh_CN/hall/selfView/" + strKey);

        let icon_dot = cc.find("icon_dot", node.getParent());
        icon_dot.x = node.x + 27;
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("update_info", this.node);
        cv.MessageCenter.unregister("update_gold", this.node);
        cv.MessageCenter.unregister("modify_info_succ", this.node);
        cv.MessageCenter.unregister("on_update_club_list", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("update_mtt_state", this.node);
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
        cv.MessageCenter.unregister("open_avatar", this.node);
        cv.MessageCenter.unregister("hide_redDotGuide", this.node);
        cv.MessageCenter.unregister("get_feedback_lists", this.node);
        cv.MessageCenter.unregister("updata_my_redpackets_pos", this.node);
        cv.MessageCenter.unregister("open_myredpackets", this.node);
        cv.MessageCenter.unregister("get_usermarks", this.node);
        cv.MessageCenter.unregister("modify_usermarks", this.node);
    }

    protected start(): void {
        let scrollView = cc.find("ScrollView", this.node).getComponent(cc.ScrollView);
        scrollView.scrollToTop(0.05);
        // 助力红包
        cv.worldNet.GetUserHelpWarpListRequest();
        this._preHeadUrl = cv.dataHandler.getUserData().headUrl;
        // 初始化"战绩"界面
        if (!this._inst_gameRecord) {
            this._inst_gameRecord = cv.action.addChildToScene(this, this.prefab_gameRecord, [], undefined, true);
        }

        if (!this._inst_roleInfoSet) {
            this._inst_roleInfoSet = cv.action.addChildToScene(this, this.prefab_roleInfoSet, [], undefined, true);
        }

        this.updateView();
        this.updateVIPToolState();

        // 目的是为了从服务器获取"已收藏牌谱列表"总个数(暂时公用这个协议)
        cv.httpHandler.requestGetFavoriteUUIDList(cv.dataHandler.getUserData().u32Uid, 0, 1);

        // 拉取俱乐部列表
        cv.worldNet.requestSnapshotList();

        if (this._openAvatar) {
            this._openAvatar = false;
            // 显示邮件入口按钮, 且解冻显示
            cv.MessageCenter.send("hide_mail_entrance");
            cv.action.showAction(this._inst_roleInfoSet, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
            this._inst_roleInfoSet.getComponent(RoleInfoSet).setPropte(true);
            this._inst_roleInfoSet.getComponent(RoleInfoSet).updateView();
        }
    }

    updateView(): void {
        this._onMsgChangeLanguage();
        this._updateView();

    }

    // 更新静态文本
    _onMsgChangeLanguage(): void {

        // 标题
        do {
            let txt_tile_word: cc.Label = this.panel_1.getChildByName("txt_tile_word").getComponent(cc.Label);
            txt_tile_word.string = cv.config.getStringData("selfView_titile_text");
        } while (false);

        // 财富
        do {
            let txt_wealth_word: cc.Label = this.panel_2.getChildByName("txt_wealth_word").getComponent(cc.Label);
            txt_wealth_word.string = cv.config.getStringData("selfView_Button_0_chouMa_name_text");
        } while (false);

        if (this.img_invite_gift != null) {
            cv.resMgr.setSpriteFrame(this.img_invite_gift, cv.config.getLanguagePath("hall/selfView/inviteGift"));
        }

        // buttons
        this.addButtonStrLanguage();

        this.updateVIPToolState();
        //头像编辑图片
        let spEdit = this.img_user_head.node.getChildByName("spEdit").getChildByName("txtEdit");
        spEdit.getComponent(cc.Label).string = cv.config.getStringData("selfView_roleInfo_headIcon_Edit");
        spEdit.getComponent(cc.Label).fontSize = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH ? 21 : 30;

        //邀请有礼
        this._txtInviteLabel.getComponent(cc.Label).string = cv.config.getStringData("selfView_ScrollView_Button_InviteGift");

        if(this._signature_editbox != null){
            this._signature_editbox.getComponent(cc.EditBox).placeholder = cv.config.getStringData("Star_input_signature");
        }

        if(this._bDefaultSign && this._signature_text != null){
            this._signature_text.getComponent(cc.Label).string = cv.config.getStringData("Star_signature");
            this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
            this._signature_text.opacity = 102;
            this._BakSignalString = this._signature_text.getComponent(cc.Label).string;
        }
        
        //验证方式向导红点
        let icon_dot = this._btnSettingNode.getChildByName("icon_dot");
        icon_dot.active = false;
        if (cv.config.isOpenSiyuVerify()) {
            //第一次引导，设置显示红点
            let _bShowGuidDot = cv.tools.GetStringByCCFile("FirstShowVerityGuid");
            if (_bShowGuidDot != "false") {
                icon_dot.active = true;
            }
        }
    }

    private onHideReddotGuide() {
        let icon_dot = this._btnSettingNode.getChildByName("icon_dot");
        icon_dot.active = false;
    }

    private onUpdataFeedbacklist() {
        for (let i = 0; i < this.vBtns.length; i++) {
            let tag: TagCom = this.vBtns[i].getComponent(TagCom);
            if (tag && tag.nTag == eSelfViewFuncFlagIdx.SVFFI_GAME_FEEDBACK) {
                let icon_dot = cc.find("icon_dot", this.vBtns[i].node);
                icon_dot.active = cv.dataHandler.getUserData().feedback_red_num > 0;
                break;
            }
        }
    }

    private onUodataRedPacketsPos() {
        let list = cv.dataHandler.getUserData().getHelpWarpList();
        for (let i = 0; i < this.vBtns.length; i++) {
            let tag: TagCom = this.vBtns[i].getComponent(TagCom);
            if (tag && tag.nTag == eSelfViewFuncFlagIdx.SVFFI_MY_RED_PACKETS) {
                let icon_dot = cc.find("icon_dot", this.vBtns[i].node);
                icon_dot.active = list.length > 0;
                break;
            }
        }
    }

    private onOpenRedPackets() {
        let inst: cc.Node = MyRedPackets.getSinglePrefabInst(this.prefab_MyRedPackets);
        cv.action.addChildToSceneOnce(inst);
        cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN, cv.action.delay_type.NORMAL);
        inst.getComponent(MyRedPackets).show();
        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);
    }

    // 设置用户数据
    private _updateView(): void {
        let userData: userData = cv.dataHandler.getUserData();
        this.txt_user_name.string = cv.String(userData.nick_name);
        this.txt_user_id.string = cv.String(userData.user_id);
        this.txt_user_mark.string = userData.getUserRemark(cv.Number(userData.u32Uid));
        this.txt_user_wealth.string = cv.StringTools.numToFloatString(cv.Number(userData.total_amount));

        this._onMsgModifyInfo();
        this._onMsgUpdateAlliance();
    }

    // 按钮点击事件
    private _onClickBtns(event: cc.Event, nTag: number): void {
        cv.AudioMgr.playButtonSound('tab');
        // let tag: TagCom = event.target.getComponent(TagCom);
        if (!nTag) return;

        switch (nTag) {
            // 我的社区
            case eSelfViewFuncFlagIdx.SVFFI_MY_CLUB: {
                if (cv.dataHandler.getUserData().isTouristUser) {
                    cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_useclub_barntips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
                    return;
                }
                cv.action.switchScene(cv.Enum.SCENE.CLUB_SCENE, (scene: cc.Scene) => {
                    let node: cc.Node = scene.getChildByName(cv.Enum.SCENE.CLUB_SCENE);
                    node.getComponent(ClubScene).setMainView(eClubSceneView.E_CSV_CLUB_MAIN_VIEW, true);
                });
            } break;

            // 我的邀请码 
            case eSelfViewFuncFlagIdx.SVFFI_MY_INVITATION_CODE: {
                if (cv.dataHandler.getUserData().isTouristUser) {
                    cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_invateCode_barntips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
                    return;
                }
                let inst: cc.Node = ClubInvitation.getSinglePrefabInst(this.prefab_clubInvitation);
                inst.getComponent(ClubInvitation).autoShow();

                // 隐藏邮件入口按钮, 且冻结显示
                cv.MessageCenter.send("hide_mail_entrance", true);

                // 跟踪用户行为, 发送事件
                cv.segmentTool.track(cv.Enum.CurrentScreen.inviteFriends, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.invite);
            } break;

            // 我的公会
            case eSelfViewFuncFlagIdx.SVFFI_MY_ALLIANCE: {
                cv.clubDataMgr.setCurOpClubID(0);
                let clubData: ClubData = cv.clubDataMgr.getClubDataByID(cv.clubDataMgr.getMyCreatedClubID());
                if (clubData && (clubData.club.has_create_alliance || clubData.club.has_join_otheralliance)) {
                    cv.clubDataMgr.setCurOpClubID(clubData.club.club_id);
                }

                cv.action.switchScene(cv.Enum.SCENE.CLUB_SCENE, (scene: cc.Scene) => {
                    let node: cc.Node = scene.getChildByName(cv.Enum.SCENE.CLUB_SCENE);
                    node.getComponent(ClubScene).setMainView(eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW, true);
                });
            } break;

            // 我的红包
            case eSelfViewFuncFlagIdx.SVFFI_MY_RED_PACKETS: {
                this.onOpenRedPackets();
            } break;


            // 牌谱收藏
            case eSelfViewFuncFlagIdx.SVFFI_GAME_COLLECTION: {
                let inst_gameReview: GameReviewFavorList = GameReviewFavorList.initSingleInst(this.prefab_gameReview);
                if (inst_gameReview) inst_gameReview.autoShow();

                // 隐藏邮件入口按钮, 且冻结显示
                cv.MessageCenter.send("hide_mail_entrance", true);
            } break;

            // 战绩
            case eSelfViewFuncFlagIdx.SVFFI_GAME_RECORD: {
                let pos = this._inst_gameRecord.position;
                if (!this._inst_gameRecord.active) {
                    cv.action.moveToAction(this._inst_gameRecord, cv.Enum.action_FuncType.to_left, cv.Enum.action_FuncType.enter, cv.Enum.action_FuncType.dt_NORMAL, cc.v2(pos.x + cv.config.WIDTH, pos.y), pos);
                    //防止MTT打完比赛后，此处通知获取最新的MTT 战绩列表比赛数据
                    cv.MessageCenter.send("sendDoRequestMttList");
                }

            } break;

            // 背包
            case eSelfViewFuncFlagIdx.SVFFI_GAME_BACKPACK: {
                if (cv.config.HAVE_MTT) {
                    if (cv.dataHandler.getUserData().mtt_url == "") {
                        cv.TT.showMsg(cv.config.getStringData("ResponseAuthApi_231"), cv.Enum.ToastType.ToastTypeError);
                        return;
                    }
                    // if (cv.config.isSiyuType()) {
                    //     this.showSiYuMtt();
                    //     return;
                    // }

                    if (!cv.config.CAN_USE_WEBGL) {
                        cv.TT.showMsg(cv.config.getStringData("MTT_No_webgl"), cv.Enum.ToastType.ToastTypeError);
                        return;
                    }

                    cv.config.setMTTWebIndex(1);
                    if (!this._backpack_node) {
                        this._backpack_node = cc.instantiate(this.prefab_MttBackpack);
                        cv.action.addChildToSceneOnce(this._backpack_node);
                    }

                    cv.action.showAction(this._backpack_node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN, cv.action.delay_type.NORMAL, (target: cc.Node, actIO: number): void => {
                    }, (target: cc.Node, actIO: number): void => {
                        this._backpack_node.getComponent(MttBackpack).show();
                    });

                    // 隐藏邮件入口按钮, 且冻结显示
                    cv.MessageCenter.send("hide_mail_entrance", true);
                }
            } break;

            // VIP工具
            case eSelfViewFuncFlagIdx.SVFFI_GAME_VIPTOOL: {

                let vipTool_url = cv.dataHandler.getUserData().vipTool_url + "&language=" + cv.config.getCurrentLanguage();
                cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).init();
                cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).showActivity_VIPTool(vipTool_url);

            } break;

            // 设置
            case eSelfViewFuncFlagIdx.SVFFI_GAME_SETTING: {
                let inst: cc.Node = SystemSetting.getSinglePrefabInst(this.prefab_systemSetting);
                cv.action.addChildToSceneOnce(inst);
                cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);

                // 隐藏邮件入口按钮, 且冻结显示
                cv.MessageCenter.send("hide_mail_entrance", true);
            } break;


            //设置语言
            case eSelfViewFuncFlagIdx.SVFFI_GAME_LANGUAGE: {
                if (cv.config.isThai()) {   //泰文版
                    cv.TT.showMsg(cv.config.getStringData("ChandgeLangue"), cv.Enum.ToastType.ToastTypeError);
                } else {
                    // cv.TP.showMsg(cv.config.getStringData("ToastMessage9"), cv.Enum.ButtonStyle.TWO_BUTTON, this._OnChangeLanguage.bind(this));
                    let inst_Lang: cc.Node = LanguageSet.getSinglePrefabInst(this.prefab_LangSet);
                    cv.action.addChildToSceneOnce(inst_Lang);
                    inst_Lang.getComponent(LanguageSet).setLastView(this.node);

                    // 显示邮件入口按钮, 且解冻显示
                    cv.MessageCenter.send("hide_mail_entrance");
                    cv.action.showActionBothLeft(inst_Lang
                        , this.node
                        , cv.action.delay_type.NORMAL
                        , (target: cc.Node, actIO: number): void => { }
                        , (target: cc.Node, actIO: number): void => {
                        });
                }
            } break;

            //神算师
            case eSelfViewFuncFlagIdx.SVFFI_GAME_SHENSUAN: {
                if (cv.config.isSiyuType()) {
                    let cmdStr = "{\"cmd\": \"1012\", \"url\":\"https://www.pokerwingod.com/\"}";
                    cv.native.SYwebjsToClient(cmdStr);
                } else {
                    cc.sys.openURL("https://www.pokerwingod.com/");
                }
            } break;

            //建议反馈
            case eSelfViewFuncFlagIdx.SVFFI_GAME_FEEDBACK: {
                let inst: cc.Node = FeedbackView.getSinglePrefabInst(this.prefab_FeedbackView);
                cv.action.addChildToSceneOnce(inst);
                cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN, cv.action.delay_type.NORMAL,
                    (target: cc.Node, actIO: number): void => { }, (target: cc.Node, actIO: number): void => {
                        inst.getComponent(FeedbackView).show();
                    });
                // 隐藏邮件入口按钮, 且冻结显示
                cv.MessageCenter.send("hide_mail_entrance", true);
            } break;

            case eSelfViewFuncFlagIdx.SVFFI_GAME_REMARKS: {
                let inst: cc.Node = RemarksView.getSinglePrefabInst(this.prefab_RemarksView);
                cv.action.addChildToSceneOnce(inst);
                inst.getComponent(RemarksView).init();
                cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
                // 隐藏邮件入口按钮, 且冻结显示
                cv.MessageCenter.send("hide_mail_entrance", true);
            } break;

            default: break;
        }
    }

    // 完善玩家信息
    private _onClickUserInfo(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('tab');

        this._signature_sure_button.active = false;
        this._signature_editbox.active = false;
        this._signature_text.active = true;
        this._signature_button.active = true;

        if (this._inst_roleInfoSet) {
            // 显示邮件入口按钮, 且解冻显示
            cv.MessageCenter.send("hide_mail_entrance");
            cv.action.showAction(this._inst_roleInfoSet, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
            this._inst_roleInfoSet.getComponent(RoleInfoSet).setPropte(true);
            this._inst_roleInfoSet.getComponent(RoleInfoSet).updateView();
        }
    }

    // 更新玩家金币
    private _onMsgUpdateGold(): void {
        let userData: userData = cv.dataHandler.getUserData();
        this.txt_user_wealth.string = cv.StringTools.numToFloatString(cv.Number(userData.total_amount));
    }

    // 修改玩家信息回调
    private _onMsgModifyInfo() {
        let userData: userData = cv.dataHandler.getUserData();
        if (userData.gender === 1) {
            cv.resMgr.setSpriteFrame(this.img_user_gender.node, "zh_CN/hall/ui/boy_icon");
        }
        else {
            cv.resMgr.setSpriteFrame(this.img_user_gender.node, "zh_CN/game/dzpoker/common/girl");
        }
        CircleSprite.setCircleSprite(this.img_user_head.node, userData.headUrl);

        this.txt_user_name.string = cv.String(userData.nick_name);
        this.img_user_gender.node.x = this.txt_user_name.node.x + cv.resMgr.getLabelStringSize(this.txt_user_name.getComponent(cc.Label)).width + 40;
        
        //刷新mtt内头像需要重新登录
        if (this._preHeadUrl != userData.headUrl) {
            this._preHeadUrl = userData.headUrl;
            if( cv.config.HAVE_MTT )
            {
                MTTConnector.instance.requestToken();
            }
            if( cv.config.HAVE_BLACKJACK )
            {
                BJPVPConnector.instance.requestToken();
            }
        }
    }

    // 刷新功能列表
    private _onMsgUpdateAlliance() {
        // 判断是否显示"公会入口"
        let bShowAllianceEntrance: boolean = false;
        let clublist: ClubData[] = cv.clubDataMgr.getClubDataList();
        for (let i = 0; i < clublist.length; ++i) {
            // 如果自己是"俱乐部创始人"
            if (clublist[i].club.club_owner === cv.dataHandler.getUserData().u32Uid) {
                // 且"有创建的工会"或"有加入过工会"
                if (clublist[i].club.has_create_alliance || clublist[i].club.has_join_otheralliance) {
                    bShowAllianceEntrance = true;
                    break;
                }
            }
        }

        // 标记公会功能按钮显影状态
        for (let i = 0; i < this.vBtns.length; ++i) {
            let tag: TagCom = this.vBtns[i].getComponent(TagCom);
            if (tag && tag.nTag === eSelfViewFuncFlagIdx.SVFFI_MY_ALLIANCE) {
                this.vBtns[i].node.active = bShowAllianceEntrance;
                break;
            }
        }

        this.updateBtnsPos();
        this.onUpdataFeedbacklist();
        this.onUodataRedPacketsPos();
    }

    updateMTTState(): void {
        let isView = cv.config.HAVE_MTT;
        this.vBtns[7].node.active = isView; //背包隐藏
        if (isView === false) {
            this.hideMTTWeb(true);
        }

        this.updateBtnsPos();
    }

    updateVIPToolState(): void {

        let _bShow = true;
        if (cv.config.isSiyuType() || cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            _bShow = false;
        }

        for (let i = 0; i < this.vBtns.length; ++i) {
            let tag: TagCom = this.vBtns[i].getComponent(TagCom);
            if (tag && tag.nTag === eSelfViewFuncFlagIdx.SVFFI_GAME_VIPTOOL) {
                this.vBtns[i].node.active = _bShow;
                break;
            }
        }

        this.updateBtnsPos();
    }

    updateBtnsPos(): void {
        // 刷新所有功能按钮位置
        let j: number = 0;
        for (let i = 0; i < this.vBtns.length; ++i) {
            if (!this.vBtns[i].node.active) continue;
            this.vBtns[i].node.setPosition(this._vBtnsSrcPos[j++]);
        }
    }

    hideMTTWeb(isView: boolean): void {
        if (this._backpack_node) {
            this._backpack_node.getComponent(MttBackpack).hide();
        }

        if (cv.config.isSiyuType()) {
            cv.native.SYwebCloseChildWebview();
        }
    }

    showSiYuMtt(): void {
        let cmdStr = "{\"cmd\": \"1006\", \"url\":\"%s\", \"op\":1, \"width\":%d, \"height\":%d}";
        let _offsetY = 0;
        if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_IPHONEX_SCREEN) { //iphoneX刘海屏
            _offsetY = 0;//2 * cv.config.FULLSCREEN_OFFSETY;
        }
        let _cmd = cv.StringTools.formatC(cmdStr, cv.dataHandler.getUserData().mtt_url + this._backpack_url, cv.config.WIDTH, cv.config.HEIGHT - _offsetY);
        cv.native.SYwebjsToClient(_cmd);
    }

    openAvatar(): void {
        this._openAvatar = true;
        if (this._inst_roleInfoSet) {
            this._openAvatar = false;
            // 显示邮件入口按钮, 且解冻显示
            cv.MessageCenter.send("hide_mail_entrance");
            cv.action.showAction(this._inst_roleInfoSet, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
            this._inst_roleInfoSet.getComponent(RoleInfoSet).setPropte(true);
            this._inst_roleInfoSet.getComponent(RoleInfoSet).updateView();
        }
    }
}
