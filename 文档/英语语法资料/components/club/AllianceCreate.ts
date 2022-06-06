import cv from "../../../Script/components/lobby/cv";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";
import AreaView from "../../../Script/components/lobby/login/AreaView";

const { ccclass, property } = cc._decorator;
@ccclass
export class AllianceCreate extends cc.Component {
    @property(cc.EditBox) phoneNumber_text: cc.EditBox = null;
    @property(cc.EditBox) email_text: cc.EditBox = null;
    @property(cc.EditBox) clubName_text: cc.EditBox = null;
    @property(cc.Label) titile_text: cc.Label = null;
    @property(cc.Label) create_button_text: cc.Label = null;
    @property(cc.Label) des_text: cc.Label = null;
    @property(cc.Label) areaCode_text: cc.Label = null;

    @property(cc.Prefab) areaCode_prefab: cc.Prefab = null;

    private static _g_prefabInst: cc.Node = null;
    private _areaCode: cc.Node = null;
    private _bInitAreaCode: boolean = false;

    /**
      * 获取指定节点下的预制件单例
      * @param prefab        未实例化的预制件引用
      * @param parentNode    父节点(若为空, 则默认从该场景中获取)
      */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!AllianceCreate._g_prefabInst) AllianceCreate._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(AllianceCreate._g_prefabInst.uuid)) {
            if (!cc.isValid(AllianceCreate._g_prefabInst, true)) {
                AllianceCreate._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return AllianceCreate._g_prefabInst;
    }

    protected onLoad(): void {
    }

    protected start(): void {
        this._initLanguage();
        cv.MessageCenter.register("AllianceCreate_onBtnBackClick", this.onBtnBackClick.bind(this), this.node);
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("AllianceCreate_onBtnBackClick", this.node);
    }

    private _initLanguage(): void {
        this.phoneNumber_text.placeholder = cv.config.getStringData("AllianceCreate_phonenumber");
        this.email_text.placeholder = cv.config.getStringData("AllianceCreate_email");
        this.clubName_text.placeholder = cv.config.getStringData("AllianceCreate_clubName_text");
        this.titile_text.string = cv.config.getStringData("AllianceCreate_titile_text");
        this.create_button_text.string = cv.config.getStringData("AllianceCreate_create_button");
        this.des_text.string = cv.config.getStringData("AllianceCreate_des_text");
    }

    private _initAreaCode() {
        if (!this._bInitAreaCode) {
            this._bInitAreaCode = true;
            this._areaCode = cc.instantiate(this.areaCode_prefab);
            this.node.addChild(this._areaCode, cv.Enum.ZORDER_TYPE.ZORDER_2);
            this._areaCode.active = false;
            this._areaCode.getComponent(AreaView).getAreaCallback = this._updateAreaCode.bind(this);
        }
    }

    private _updateAreaCode(codeStr: string) {
        this.areaCode_text.string = codeStr;
    }

    onBtnAreaClick(): void {
        this._initAreaCode();
        this._areaCode.active = true;
    }

    onBtnBackClick(): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
            lastView: eClubSceneView.E_CSV_ALLIANCE_CREATE_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    onBtnSureClick() {
        cv.AudioMgr.playButtonSound('button_click');
        let clubName = this.clubName_text.string;
        let configStr = "";

        if (clubName.length <= 0) {
            configStr = "AllianceUI17";
        }
        else if (cv.StringTools.getStrLen(clubName) > 14) {
            configStr = "AllianceUI18";
        }
        else if (cv.StringTools.isHaveEmpty(clubName)) {
            configStr = "tips_no_space_words";
        }
        else if (!cv.StringTools.isClubNameFormat(clubName)) {
            configStr = "tips_no_special_words";
        }
        else if (cv.StringTools.isSensitiveWords(clubName)) {
            configStr = "tips_no_sensitive_words";
        }

        if (configStr.length > 0) {
            cv.TT.showMsg(cv.config.getStringData(configStr), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        let kAreaCode = this.areaCode_text.string;
        let index = kAreaCode.indexOf("+");
        kAreaCode = kAreaCode.substring(index + 1, kAreaCode.length);

        let phoneNumber = this.phoneNumber_text.string;
        if ((kAreaCode == "86" && phoneNumber.length != 11) || phoneNumber.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast28"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        let email = this.email_text.string;

        //修改成联盟需要审核
        cv.worldNet.RequestCreateAlliance(clubName, cv.clubDataMgr.getCurOpClubData().club.club_id, kAreaCode, phoneNumber, email);
    }
}
