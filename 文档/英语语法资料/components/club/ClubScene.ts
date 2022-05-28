import cv from "../lobby/cv";
import { ClubMainView } from "./ClubMainView";
import { ClubCreate } from "./ClubCreate";
import { ClubSearch } from "./ClubSearch";
import { ClubIntroduce } from "./ClubIntroduce";
import { ClubMember } from "./ClubMember";
import { ClubSetting } from "./ClubSetting";
import { AllianceMainView } from "./AllianceMainView";
import { AllianceInfo } from "./AllianceInfo";
import { AllianceCreate } from "./AllianceCreate";
import { AllianceSearch } from "./AllianceSearch";

/**
 * 俱乐部场景中的界面枚举
 */
export enum eClubSceneView {
    E_CSV_NONE = 0,                                                 // 无
    E_CSV_CURVIEW,                                                  // 当前面板
    E_CSV_LASTVIEW,                                                 // 上次面板
    E_CSV_CLUB_MAIN_VIEW,                                           // 俱乐部主面板
    E_CSV_CLUB_CREATE_VIEW,                                         // 新建俱乐部面板
    E_CSV_CLUB_SEARCH_VIEW,                                         // 搜索俱乐部面板
    E_CSV_CLUB_INTRODUCE_VIEW,                                      // 俱乐部介绍面板
    E_CSV_CLUB_MEMBER_VIEW,                                         // 俱乐部成员面板
    E_CSV_CLUB_SETTING_VIEW,                                        // 俱乐部设置面板
    E_CSV_ALLIANCE_MAIN_VIEW,                                       // 联盟主场景面板
    E_CSV_ALLIANCE_INFO_VIEW,                                       // 联盟信息面板
    E_CSV_ALLIANCE_CREATE_VIEW,                                     // 新建联盟面板
    E_CSV_ALLIANCE_SEARCH_VIEW,                                     // 联盟搜索面板
}

/**
 * 俱乐部场景中"加号"按钮对应的功能
 */
export enum ClubSceneAddBtnFuc {
    E_ADD_FUNC_CLUB_CREATE = 0,                                     // 新建社区
    E_ADD_FUNC_CLUB_JOIN,                                           // 加入社区
    E_ADD_FUNC_ALLIANCE_CREATE,                                     // 新建公会
    E_ADD_FUNC_ALLIANCE_JOIN                                        // 加入公会
}

/**
 * 俱乐部场景切换界面时的结构信息
 */
export class tClubSceneTransViewInfo {
    nextView: eClubSceneView = eClubSceneView.E_CSV_NONE;           // 即将变换的视图枚举
    lastView: eClubSceneView = eClubSceneView.E_CSV_NONE;           // 上次记录的视图枚举
    transDir: number = cv.action.eMoveActionDir.EMAD_NONE;          // 移动动作类型(请参照 Action.eMoveActionDiretion 枚举)
    transBoth: boolean = true;                                      // 是否一起 move
}

/**
 * 俱乐部场景
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubScene extends cc.Component {
    @property(cc.Prefab) prefab_clubMain: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubCreate: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubSearch: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubIntroduce: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubMember: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubSetting: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubSpread: cc.Prefab = null;
    @property(cc.Prefab) prefab_clubSpreadRule: cc.Prefab = null;

    @property(cc.Prefab) prefab_allianceCreate: cc.Prefab = null;
    @property(cc.Prefab) prefab_allianceSearch: cc.Prefab = null;
    @property(cc.Prefab) prefab_allianceInfo: cc.Prefab = null;

    @property(cc.Prefab) upgradePref: cc.Prefab = null;

    public static g_gotoAV_fromCV_BtnOpen: boolean = false;             // 是否从社区主界面的 "+" 号按钮点击 "加入公会" 选项进入 公会主界面的

    protected onLoad(): void {
        this._addObserver();
        cv.config.adaptScreen(this.node);
        cv.resMgr.adaptWidget(this.node, true);
        cv.config.setCurrentScene(cv.Enum.SCENE.CLUB_SCENE);
    }

    protected start(): void {
    }

    protected onDestroy(): void {
        this._removeserver();
    }

    /**
     * 设置主界面
     * @param view                          - 当前俱乐部场景 所显示的视图枚举类型
     * @param isBackToHallSceneSelfView     - 是否返回至"大厅场景"中的"我的空间"面板
     */
    setMainView(view: eClubSceneView, isBackToHallSceneSelfView: boolean): void {
        // 请求俱乐部列表
        cv.worldNet.requestSnapshotList();

        switch (view) {
            case eClubSceneView.E_CSV_CLUB_MAIN_VIEW: {
                let inst: cc.Node = ClubMainView.getSinglePrefabInst(this.prefab_clubMain);
                inst.getComponent(AllianceMainView).enabled = false;
                let clubMainView: ClubMainView = inst.getComponent(ClubMainView);
                clubMainView.enabled = true;
                clubMainView.isBackToHallSceneSelfView = isBackToHallSceneSelfView;
                let bFirst: boolean = cv.action.addChildToSceneOnce(inst, this.node);
                if (bFirst) { }
                else { clubMainView.updateView(); }
            } break;

            case eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW: {
                let inst: cc.Node = AllianceMainView.getSinglePrefabInst(this.prefab_clubMain);
                inst.getComponent(ClubMainView).enabled = false;
                let allianceMainView: AllianceMainView = inst.getComponent(AllianceMainView);
                allianceMainView.enabled = true;
                allianceMainView.isBackToHallSceneSelfView = isBackToHallSceneSelfView;
                let bFirst: boolean = cv.action.addChildToSceneOnce(inst, this.node);
                if (bFirst) { allianceMainView.showActFuncFinish(null, cv.action.eMoveActionType.EMAT_FADE_IN); }
                else { allianceMainView.updateView(); }
            } break;

            default: break;
        }
    }

    private _addObserver(): void {
        cv.MessageCenter.register("onClubSceneTransView", this._onMsgClubSceneTransView.bind(this), this.node);
        cv.MessageCenter.register("on_create_club_succ", this._onMsgClubCreateSuccess.bind(this), this.node);
    }

    private _removeserver(): void {
        cv.MessageCenter.unregister("onClubSceneTransView", this.node);
        cv.MessageCenter.unregister("on_create_club_succ", this.node);
    }

    // 切换界面通知
    private _onMsgClubSceneTransView(param: tClubSceneTransViewInfo): void {

        class tmpObj {
            node: cc.Node = null;
            com: any = null;
            actFinishCallbackDelay: number = 0;
        };

        let checkView: Function = (view: eClubSceneView): tmpObj => {
            let obj: tmpObj = new tmpObj();
            let scene: cc.Scene = cc.director.getScene();
            switch (view) {
                case eClubSceneView.E_CSV_CLUB_MAIN_VIEW: {
                    obj.node = ClubMainView.getSinglePrefabInst(this.prefab_clubMain, scene);
                    obj.com = obj.node.getComponent(ClubMainView);
                    obj.com.enabled = true;
                    obj.node.getComponent(AllianceMainView).enabled = false;
                } break;

                case eClubSceneView.E_CSV_CLUB_CREATE_VIEW: {
                    obj.node = ClubCreate.getSinglePrefabInst(this.prefab_clubCreate, scene);
                    obj.com = obj.node.getComponent(ClubCreate);
                } break;

                case eClubSceneView.E_CSV_CLUB_SEARCH_VIEW: {
                    obj.node = ClubSearch.getSinglePrefabInst(this.prefab_clubSearch, scene);
                    obj.com = obj.node.getComponent(ClubSearch);
                } break;

                case eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW: {
                    obj.node = ClubIntroduce.getSinglePrefabInst(this.prefab_clubIntroduce, scene);
                    obj.com = obj.node.getComponent(ClubIntroduce);
                } break;

                case eClubSceneView.E_CSV_CLUB_MEMBER_VIEW: {
                    obj.node = ClubMember.getSinglePrefabInst(this.prefab_clubMember, scene);
                    obj.com = obj.node.getComponent(ClubMember);
                    obj.actFinishCallbackDelay = 1 / cc.game.getFrameRate();
                } break;

                case eClubSceneView.E_CSV_CLUB_SETTING_VIEW: {
                    obj.node = ClubSetting.getSinglePrefabInst(this.prefab_clubSetting, scene);
                    obj.com = obj.node.getComponent(ClubSetting);
                } break;

                case eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW: {
                    obj.node = AllianceMainView.getSinglePrefabInst(this.prefab_clubMain, scene);
                    obj.com = obj.node.getComponent(AllianceMainView);
                    obj.com.enabled = true;
                    obj.node.getComponent(ClubMainView).enabled = false;
                } break;

                case eClubSceneView.E_CSV_ALLIANCE_INFO_VIEW: {
                    obj.node = AllianceInfo.getSinglePrefabInst(this.prefab_allianceInfo, scene);
                    obj.com = obj.node.getComponent(AllianceInfo);
                } break;
                case eClubSceneView.E_CSV_ALLIANCE_CREATE_VIEW: {
                    obj.node = AllianceCreate.getSinglePrefabInst(this.prefab_allianceCreate, scene);
                    obj.com = obj.node.getComponent(AllianceCreate);
                } break;

                case eClubSceneView.E_CSV_ALLIANCE_SEARCH_VIEW: {
                    obj.node = AllianceSearch.getSinglePrefabInst(this.prefab_allianceSearch, scene);
                    obj.com = obj.node.getComponent(AllianceSearch);
                } break;

                case eClubSceneView.E_CSV_CURVIEW: {
                    obj.node = cv.action.getCurShowView();
                    obj.com = obj.node.getComponent(obj.node.name);
                } break;

                case eClubSceneView.E_CSV_LASTVIEW: {
                    obj.node = cv.action.getLastShowView();
                    obj.com = obj.node.getComponent(obj.node.name);
                } break;

                case eClubSceneView.E_CSV_NONE:
                default: {
                } break;
            }
            return obj;
        }

        let obj_in: tmpObj = checkView(param.nextView);
        let obj_out: tmpObj = checkView(param.lastView);
        if (obj_in.com === obj_out.com) return;

        let bInFirst: boolean = cv.action.addChildToSceneOnce(obj_in.node, this.node);
        if (bInFirst) {
            cv.resMgr.adaptWidget(obj_in.node, true);
        }
        else {
            if (obj_in.com && "updateView" in obj_in.com) {
                obj_in.com.updateView();
            }
        }

        cv.action.addChildToSceneOnce(obj_out.node, this.node);

        let func_in: any = null;
        let func_finish_in: any = null;
        if (obj_in && obj_in.com) {
            func_in = obj_in.com["showActFunc"];
            if (func_in && func_in instanceof Function) func_in = func_in.bind(obj_in.com);

            func_finish_in = obj_in.com["showActFuncFinish"];
            if (func_finish_in && func_finish_in instanceof Function) func_finish_in = func_finish_in.bind(obj_in.com);
        }

        let func_out: any = null;
        let func_finish_out: any = null;
        if (obj_out && obj_out.com) {
            func_out = obj_out.com["showActFunc"];
            if (func_out && func_out instanceof Function) func_out = func_out.bind(obj_out.com);

            func_finish_out = obj_out.com["showActFuncFinish"];
            if (func_finish_out && func_finish_out instanceof Function) func_finish_out = func_finish_out.bind(obj_out.com);
        }

        if (param.transBoth) {
            cv.action.showActionBoth(param.transDir
                , obj_in.node
                , obj_out.node
                , cv.action.delay_type.NORMAL
                , func_in
                , func_finish_in
                , func_out
                , func_finish_out
                , obj_in.actFinishCallbackDelay);
        }
        else {
            cv.action.showAction(obj_in.node
                , param.transDir
                , cv.action.eMoveActionType.EMAT_FADE_IN
                , cv.action.delay_type.NORMAL
                , func_in
                , func_finish_in
                , obj_in.actFinishCallbackDelay);
        }
    }

    // 新建俱乐部成功回调通知
    private _onMsgClubCreateSuccess(): void {
        cv.worldNet.requestSnapshotList();
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
            lastView: eClubSceneView.E_CSV_CLUB_CREATE_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }
}
