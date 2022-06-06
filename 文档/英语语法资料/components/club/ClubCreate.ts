import cv from "../../../Script/components/lobby/cv";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";

/**
 * 新建俱乐部面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubCreate extends cc.Component {
    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_name_word: cc.Label = null;
    @property(cc.Label) txt_desc_word: cc.Label = null;
    @property(cc.Label) txt_btn_create_word: cc.Label = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_create: cc.Button = null;

    @property(cc.EditBox) edt_name: cc.EditBox = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubCreate._g_prefabInst) ClubCreate._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubCreate._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubCreate._g_prefabInst, true)) {
                ClubCreate._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubCreate._g_prefabInst;
    }

    protected onLoad(): void {
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_create.node.on("click", this._onClickCreate, this);
    }

    protected start(): void {
        this.updateView();
    }

    updateView(): void {
        this._updateStaticText();
        this._updateView();
    }

    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("CreateClub_title_txt");
        this.txt_name_word.string = cv.config.getStringData("CreateClub_clubName_txt");
        this.txt_btn_create_word.string = cv.config.getStringData("CreateClub_create_button");

        this.txt_desc_word.string = cv.config.getStringData("CreateClub_des_text");
        this.txt_desc_word.node.active = false;
    }

    private _updateView(): void {
        this.edt_name.placeholder = cv.config.getStringData("CreateClub_clubName_text");
        this.edt_name.string = "";
    }

    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
            lastView: eClubSceneView.E_CSV_CLUB_CREATE_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    private _onClickCreate(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let clubName: string = this.edt_name.string;
        let clubArea: string = "";
        let clubIcon: string = "";

        // 名称不能为空
        if (clubName.length <= 0) {
            cv.TT.showMsg(cv.config.getStringData("UIClubTips01"), cv.Enum.ToastType.ToastTypeWarning);
        }
        // 名称过长
        else if (cv.StringTools.getStrLen(clubName) > 14) {
            cv.TT.showMsg(cv.config.getStringData("UIClubTips04"), cv.Enum.ToastType.ToastTypeWarning);
        }
        // 是否包含空格
        else if (cv.StringTools.isHaveEmpty(clubName)) {
            cv.TT.showMsg(cv.config.getStringData("UIClubTips03"), cv.Enum.ToastType.ToastTypeWarning);
        }
        // 是否包含特殊字符
        else if (!cv.StringTools.isClubNameFormat(clubName)) {
            cv.TT.showMsg(cv.config.getStringData("tips_no_special_words"), cv.Enum.ToastType.ToastTypeWarning);
        }
        // 是否包含敏感字符
        else if (cv.StringTools.isSensitiveWords(clubName, true)) {
            cv.TT.showMsg(cv.config.getStringData("tips_no_sensitive_words"), cv.Enum.ToastType.ToastTypeWarning);
        }
        else {
            cv.worldNet.requestCreateClub(clubName, clubArea, clubIcon);
        }
    }
}
