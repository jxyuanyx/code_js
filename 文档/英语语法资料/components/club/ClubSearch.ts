import cv from "../../../Script/components/lobby/cv";
import { ClubData } from "../../../Script/data/club/ClubData";
import { ScrollViewReuse } from "../../../Script/common/tools/ScrollViewReuse";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";

/**
 * 俱乐部搜索面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubSearch extends cc.Component {
    @property(cc.Prefab) prefab_clubItem: cc.Prefab = null;
    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.ScrollView) scroll: cc.ScrollView = null;

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.EditBox) edt_search_id: cc.EditBox = null;

    private static _g_prefabInst: cc.Node = null;
    private _svReuse: ScrollViewReuse = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ClubSearch._g_prefabInst) ClubSearch._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ClubSearch._g_prefabInst.uuid)) {
            if (!cc.isValid(ClubSearch._g_prefabInst, true)) {
                ClubSearch._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ClubSearch._g_prefabInst;
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
            this._svReuse = this.scroll.node.getComponent(ScrollViewReuse);
            this._svReuse.bindPrefab(this.prefab_clubItem, "ClubItem");
            this._svReuse.generateItemPool();
        }
        this.updateView();
    }

    updateView(): void {
        this.edt_search_id.string = "";
        this.txt_title_word.string = cv.config.getStringData("ClubSearch_title_txt");
        this.edt_search_id.placeholder = cv.config.getStringData("ClubSearch_Image_3_clubName_text");

        if (this._svReuse) {
            this._svReuse.removeAll();
            this._svReuse.reloadView();
        }
    }

    protected onLoad(): void {
        this.btn_back.node.on("click", this._onClickBtnBack, this);
        this.edt_search_id.node.on("editing-did-ended", this._onEdtEventDidEnded, this);
        cv.MessageCenter.register("update_search_club", this._onMsgSearchClubInfo.bind(this), this.node);
    }

    protected start(): void {
        this.updateView();
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("update_search_club", this.node);
    }

    private _onEdtEventDidEnded(): void {
        let id: string = this.edt_search_id.string;
        let len: number = id.length;
        if (len > 0) {
            for (let x = 0; x < len; x++) {
                if (id[x] < "0" || id[x] > "9") {
                    cv.TT.showMsg(cv.config.getStringData("ClubSearch_Image_3_clubName_text"), cv.Enum.ToastType.ToastTypeError);
                    return;
                }
            }
            cv.worldNet.RequestSearchClubInfo(cv.Number(id));
        }
    }

    private _onMsgSearchClubInfo(): void {
        let data: ClubData = cv.clubDataMgr.getCurSearchClubData();
        let club_data_list: ClubData[] = [];
        club_data_list.push(data);
        if (this._svReuse) {
            this._svReuse.reloadView(club_data_list);
        }
    }

    private _onClickBtnBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
            lastView: eClubSceneView.E_CSV_CLUB_SEARCH_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }
}
