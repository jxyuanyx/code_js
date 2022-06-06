import cv from "../../../Script/components/lobby/cv";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";

const { ccclass, property } = cc._decorator;
@ccclass
export class AllianceSearch extends cc.Component {

    @property(cc.EditBox) edt_club_name: cc.EditBox = null;
    @property(cc.Label) txt_title: cc.Label = null;
    @property(cc.Label) txt_btn_create: cc.Label = null;
    @property(cc.Label) txt_desc: cc.Label = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_sure: cc.Button = null;

    private static _g_prefabInst: cc.Node = null;

    /**
      * 获取指定节点下的预制件单例
      * @param prefab        未实例化的预制件引用
      * @param parentNode    父节点(若为空, 则默认从该场景中获取)
      */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!AllianceSearch._g_prefabInst) AllianceSearch._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(AllianceSearch._g_prefabInst.uuid)) {
            if (!cc.isValid(AllianceSearch._g_prefabInst, true)) {
                AllianceSearch._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return AllianceSearch._g_prefabInst;
    }

    updateView(): void {
        this.edt_club_name.string = "";
        this.edt_club_name.placeholder = cv.config.getStringData("AllianceUI6");

        this.txt_title.string = cv.config.getStringData("AllianceCreate_titile_text_1");
        this.txt_btn_create.string = cv.config.getStringData("AllianceUI4");
        this.txt_desc.string = cv.config.getStringData("AllianceUI5");
    }

    protected onLoad(): void {
        this.btn_back.node.on("click", this._onClickBtnBack, this);
        this.btn_sure.node.on("click", this._onClickBtnSure, this);
    }

    protected start(): void {
        this.updateView();
    }

    private _onClickBtnBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
            lastView: eClubSceneView.E_CSV_ALLIANCE_SEARCH_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    private _onClickBtnSure(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let clubName: string = this.edt_club_name.string;
        if (clubName == "" || cv.StringTools.isHaveEmpty(clubName)) {
            cv.TT.showMsg(cv.config.getStringData("AllianceUI19"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        let len: number = clubName.length;
        if (len > 0) {
            for (let x = 0; x < len; x++) {
                if (clubName[x] < "0" || clubName[x] > "9") {
                    cv.TT.showMsg(cv.config.getStringData("AllianceUI6"), cv.Enum.ToastType.ToastTypeError);
                    return;
                }
            }
            cv.worldNet.requestSearchAllianceInfo(cv.Number(clubName));
        }
    }
}
