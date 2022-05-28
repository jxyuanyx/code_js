import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../Script/components/lobby/cv";
import { CircleSprite, Head_Mode } from "../../../Script/common/tools/CircleSprite";
import { ClubData } from "../../../Script/data/club/ClubData";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";
import { ImagePicker } from "../../common/tools/ImagePicker";

/**
 * 俱乐部设置
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubSetting extends cc.Component {
    @property(cc.Prefab) prefab_imgPicker: cc.Prefab = null;

    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_change_word: cc.Label = null;
    @property(cc.Label) txt_change_desc_word: cc.Label = null;
    @property(cc.Label) txt_club_flag_word: cc.Label = null;
    @property(cc.Label) txt_club_name_word: cc.Label = null;
    @property(cc.Label) txt_club_introduce_word: cc.Label = null;
    @property(cc.Label) txt_bnt_ensure_word: cc.Label = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_club_icon: cc.Button = null;
    @property(cc.Button) btn_ensure: cc.Button = null;
    @property(cc.Sprite) img_club_icon: cc.Sprite = null;
    @property(cc.EditBox) edt_club_name: cc.EditBox = null;
    @property(cc.EditBox) edt_club_introduce: cc.EditBox = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例
    private _clubName: string = "";
    private _clubDescrption: string = "";
    private _inst_imgPicker: cc.Node = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubSetting._g_prefabInst) ClubSetting._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubSetting._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubSetting._g_prefabInst, true)) {
                ClubSetting._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubSetting._g_prefabInst;
    }

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_ensure.node.on("click", this._onClickEnsure, this);
        this.btn_club_icon.node.on("click", this._onClickIcon, this);

        cv.MessageCenter.register("ModiClubInfoSucc", this._onMsgModiClubInfoSuccess.bind(this), this.node);
    }

    protected start(): void {
        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("ModiClubInfoSucc", this.node);
    }

    updateView(): void {
        this._updateStaticText();
        this._updateView();
    }

    // 更新静态文本
    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("ClubSetting_title_txt");
        this.txt_change_word.string = cv.config.getStringData("ClubSetting_changePhoto_txt");
        this.txt_change_desc_word.string = cv.config.getStringData("ClubSetting_changePhoto_txt_des");
        this.txt_change_desc_word.node.setPosition(this.txt_change_word.node.x + cv.resMgr.getLabelStringSize(this.txt_change_word).width + 16, this.txt_change_desc_word.node.y);
        this.txt_club_flag_word.string = cv.config.getStringData("AllianceMemberItem_club_txt");
        this.txt_club_name_word.string = cv.config.getStringData("ClubSetting_clubName_txt");
        this.txt_club_introduce_word.string = cv.config.getStringData("ClubSetting_clubIntroduce_txt");
        this.txt_bnt_ensure_word.string = cv.config.getStringData("ClubSetting_save_txt");

        this.edt_club_name.placeholder = cv.config.getStringData("ClubSetting_clubName_textfield");
        this.edt_club_introduce.placeholder = cv.config.getStringData("ClubSetting_clubIntroduce_textfield");
    }

    private _updateView(): void {
        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        let tempNode = this.img_club_icon.node.parent;
        let len = tempNode.childrenCount;
        for (let i = 0; i < len; i++) {
            tempNode.children[i].zIndex = 2;
        }
        CircleSprite.setCircleSprite(this.img_club_icon.node, clubData.club.club_icon, 0, true, Head_Mode.CLUB, undefined, true);

        this.edt_club_name.string = clubData.club.club_name;
        this.edt_club_introduce.string = clubData.club.club_descrption;
    }

    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
            lastView: eClubSceneView.E_CSV_CLUB_SETTING_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    // 确认修改
    private _onClickEnsure(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this._clubName = this.edt_club_name.string;
        this._clubDescrption = this.edt_club_introduce.string;

        let bClubNameValid: boolean = false;
        let bClubDescrptionValid: boolean = false;

        // 检测俱乐部名称是否合法
        do {
            // 名称不能为空
            if (this._clubName.length <= 0) {
                cv.TT.showMsg(cv.config.getStringData("UIClubTips01"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 名称过长
            else if (cv.StringTools.getStrLen(this._clubName) > 14) {
                cv.TT.showMsg(cv.config.getStringData("UIClubTips04"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 是否包含空格
            else if (cv.StringTools.isHaveEmpty(this._clubName)) {
                cv.TT.showMsg(cv.config.getStringData("UIClubTips03"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 是否包含特殊字符
            else if (!cv.StringTools.isClubNameFormat(this._clubName)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_special_words"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 是否包含敏感字符
            else if (cv.StringTools.isSensitiveWords(this._clubName, true)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_sensitive_words"), cv.Enum.ToastType.ToastTypeWarning);
            }
            else {
                bClubNameValid = true;
            }
        } while (false);
        if (!bClubNameValid) return;

        // 检测俱乐部介绍是否合法
        do {
            // 名称过长
            if (cv.StringTools.getStrLen(this._clubDescrption) > 70) {
                cv.TT.showMsg(cv.config.getStringData("UIClubTips05"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 是否包含空格
            else if (cv.StringTools.isHaveEmpty(this._clubDescrption)) {
                cv.TT.showMsg(cv.config.getStringData("UIClubTips06"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 是否包含特殊字符
            else if (!cv.StringTools.isClubNameFormat(this._clubDescrption)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_special_words"), cv.Enum.ToastType.ToastTypeWarning);
            }
            // 是否包含敏感字符
            else if (cv.StringTools.isSensitiveWords(this._clubDescrption)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_sensitive_words"), cv.Enum.ToastType.ToastTypeWarning);
            }
            else {
                bClubDescrptionValid = true;
            }
        } while (false);
        if (!bClubDescrptionValid) return;

        // 检测头像
        do {
            if (this._inst_imgPicker) {
                let imgPicker: ImagePicker = this._inst_imgPicker.getComponent(ImagePicker);
                let imgHeadStr: string = cv.String(imgPicker.headStr);
                if (imgHeadStr.length > 0) {
                    cv.httpHandler.requestUploadClubHead(cv.String(cv.clubDataMgr.getCurOpClubData().club.club_id), imgHeadStr);
                }
            }
        } while (false);

        let param: world_pb.ModifyClubInfoParams = world_pb.ModifyClubInfoParams.create();
        param.club_id = cv.clubDataMgr.getCurOpClubData().club.club_id;
        param.club_uid = cv.dataHandler.getUserData().u32Uid;
        param.club_name = this._clubName;
        param.club_descrption = this._clubDescrption;
        param.action_type = 1;
        cv.worldNet.requestModifyClubInfo(param);
    }

    // 修改成功回调
    private _onMsgModiClubInfoSuccess(): void {
        cv.TT.showMsg(cv.config.getStringData("ModiInfoSucc"), cv.Enum.ToastType.ToastTypeSuccess);

        let clubData: ClubData = cv.clubDataMgr.getCurOpClubData();
        clubData.club.club_name = this._clubName;
        clubData.club.club_descrption = this._clubDescrption;
    }

    // 打开相册选择图片
    private _onClickIcon(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('tab');
        if (!this._inst_imgPicker) {
            this._inst_imgPicker = ImagePicker.add(this.prefab_imgPicker);
        }

        let imgPicker: ImagePicker = this._inst_imgPicker.getComponent(ImagePicker);
        imgPicker.init(this.img_club_icon.node);
    }
}
