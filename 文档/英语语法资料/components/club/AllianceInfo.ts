import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../Script/components/lobby/cv";
import { eClubSceneView } from "../../../Script/components/club/ClubScene";
import { ClubData } from "../../../Script/data/club/ClubData";
import { TableView } from "../../common/tools/TableView";
import { TagCom } from "../../common/tools/TagCom";

const { ccclass, property } = cc._decorator;
@ccclass
export class AllianceInfo extends cc.Component {
    @property(cc.Label) txt_title_word: cc.Label = null;
    @property(cc.Label) txt_alliance_id_word: cc.Label = null;

    @property(cc.Label) txt_alliance_name: cc.Label = null;
    @property(cc.Label) txt_alliance_member: cc.Label = null;
    @property(cc.Label) txt_alliance_id: cc.Label = null;

    @property(cc.Sprite) img_alliance_member: cc.Sprite = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) btn_dissolve: cc.Button = null;
    @property(cc.Button) btn_apply: cc.Button = null;

    @property(cc.Node) node_view_owner: cc.Node = null;
    @property(cc.Node) node_view_other: cc.Node = null;

    @property(cc.ScrollView) scrollview: cc.ScrollView = null;
    @property(cc.Prefab) prefab_allianceMemberItem: cc.Prefab = null;

    private static _g_prefabInst: cc.Node = null;                               // 单例
    private _svReuse: TableView = null;

    private red_path: string = "zh_CN/club/club_red_btn";
    private green_path: string = "zh_CN/club/club_green_btn";
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!AllianceInfo._g_prefabInst) AllianceInfo._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(AllianceInfo._g_prefabInst.uuid)) {
            if (!cc.isValid(AllianceInfo._g_prefabInst, true)) {
                AllianceInfo._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return AllianceInfo._g_prefabInst;
    }

    /**
     * 切入动画 开始回调
     * @param target 
     * @param actIO 
     */
    showActFunc(target: cc.Node, actIO: number): void {
        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this.updateView();
        }
    }

    /**
     * 切入动画 结束回调
     * @param target 
     * @param actIO 
     */
    showActFuncFinish(target: cc.Node, actIO: number): void {
        if (actIO === cv.action.eMoveActionType.EMAT_FADE_IN) {
            this._svReuse.reloadView();
        }
        else {
            this._svReuse.clearView();
        }
    }

    /**
     * 更新视图
     */
    updateView(): void {
        this._updateStaticText();
        this._updateView();
    }

    protected onLoad(): void {
        // 立即适配所有节点
        cv.resMgr.adaptWidget(this.node, true);

        // 滚动复用视图
        this._svReuse = this.scrollview.node.getComponent(TableView);

        // 按钮事件
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);
        this.btn_dissolve.node.on("click", this._onClickDissolve, this);
        this.btn_apply.node.on("click", this._onClickApply, this);

        // 添加消息监听事件
        cv.MessageCenter.register("showAllianceMainView", this._onMsgshowAllianceMainView.bind(this), this.node);

        // 隐藏若干控件
        this.btn_dissolve.node.active = false;
    }

    protected start(): void {
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("showAllianceMainView", this.node);
    }

    // 更新静态文本
    private _updateStaticText(): void {
        this.txt_title_word.string = cv.config.getStringData("AllianceInfo_alliance_title_txt");
        this.txt_alliance_id_word.string = cv.config.getStringData("AllianceInfo_alliance_id_text");

        let txt_btn_dissolve: cc.Label = this.btn_dissolve.node.getChildByName("txt").getComponent(cc.Label);
        txt_btn_dissolve.string = cv.config.getStringData("AllianceInfo_dissolve_button");
        this.txt_alliance_id.node.setPosition(cv.resMgr.getLabelStringSize(this.txt_alliance_id_word).width + 12, this.txt_alliance_id.node.y);
    }

    private _updateView(): void {
        let myCreatedClubID: number = cv.clubDataMgr.getMyCreatedClubID();
        let allianceInfo: world_pb.NoticeSearchAlliance = cv.clubDataMgr.getCurSearchClubData().clubExtra.allianceInfo;
        this.txt_alliance_name.string = allianceInfo.alliance_name;
        this.txt_alliance_member.string = cv.StringTools.formatC("%d/%d", allianceInfo.alliance_club_count, allianceInfo.alliance_club_max);
        this.txt_alliance_id.string = cv.String(allianceInfo.alliance_id);

        // 重置显影状态
        this.btn_dissolve.node.active = false;
        this.img_alliance_member.node.active = false;
        this.btn_apply.node.active = false;

        let vRet: world_pb.ClubItemInfo[] = [];
        let vClubItems: world_pb.IClubItemInfo[] = allianceInfo.clubItems;

        // 自己是盟主
        if (allianceInfo.creater_club_id === myCreatedClubID) {
            // push 列表
            for (let i = 0; i < vClubItems.length; ++i) {
                vRet.push(world_pb.ClubItemInfo.create(vClubItems[i]));
            }

            // 底部按钮状态
            this.btn_dissolve.node.active = true;
            this.img_alliance_member.node.active = true;
        }
        else {
            let curOpClubID: number = cv.clubDataMgr.getCurOpClubData().club.club_id;

            // 若未设置"当前操作的俱乐部", 则默认为俱乐部列表第一个为操作的俱乐部(列表已排序)
            if (!curOpClubID) {
                let club_list: ClubData[] = cv.clubDataMgr.getClubDataList();
                if (club_list.length > 0) {
                    curOpClubID = club_list[0].club.club_id;
                    cv.clubDataMgr.setCurOpClubID(curOpClubID);
                }
            }

            let isCurOpClubIncluded: boolean = false;
            for (let i = 0; i < vClubItems.length; ++i) {
                let itemClubID: number = vClubItems[i].club_id;
                if (curOpClubID === itemClubID) {
                    isCurOpClubIncluded = true;
                }

                if (allianceInfo.creater_club_id === itemClubID) {
                    vRet.push(world_pb.ClubItemInfo.create(vClubItems[i]));
                }
                else if (cv.clubDataMgr.isIncludedOwnClubs(itemClubID)) {
                    let clubData: ClubData = cv.clubDataMgr.getClubDataByID(itemClubID);
                    if (clubData && (clubData.club.club_id === myCreatedClubID || clubData.club.is_manager === 1)) {
                        vRet.push(world_pb.ClubItemInfo.create(vClubItems[i]));
                    }
                }
            }

            // 当前操作的俱乐部"不在"联盟内
            if (!isCurOpClubIncluded) {
                // 底部按钮状态
                this.btn_apply.node.active = true;
                // this.btn_apply.node.color = cc.color(26, 123, 250);
                cv.resMgr.setButtonFrame(this.btn_apply.node, this.green_path, this.green_path, this.green_path, this.green_path);
                let txt_btn_apply: cc.Label = this.btn_apply.node.getChildByName("txt").getComponent(cc.Label);
                txt_btn_apply.string = cv.config.getStringData("UITitle51");

                // 加入联盟
                if (this.btn_apply.node.active) {
                    let tagCom: TagCom = this.btn_apply.getComponent(TagCom);
                    if (!tagCom) tagCom = this.btn_apply.addComponent(TagCom);
                    tagCom.bTag = true;
                }
            }
            // 暂时屏蔽"退出联盟"功能
            // else {
            //     // 当前操作的俱乐部在联盟内且俱乐部创建者是自己
            //     if (curOpClubID === myCreatedClubID) {
            //         this.btn_apply.node.active = true;
            //         this.btn_apply.node.color = cc.color(213, 0, 18);
            //         let txt_btn_apply: cc.Label = this.btn_apply.node.getChildByName("txt").getComponent(cc.Label);
            //         txt_btn_apply.string = cv.config.getStringData("AllianceUI7");

            //         // 退出联盟
            //         if (this.btn_apply.node.active) {
            //             let tagCom: TagCom = this.btn_apply.getComponent(TagCom);
            //             if (!tagCom) tagCom = this.btn_apply.addComponent(TagCom);
            //             tagCom.bTag = false;
            //         }
            //     }
            // }
        }

        // 刷新"列表视图"位置和大小
        let pos: cc.Vec2 = this.node_view_owner.getPosition();
        let size: cc.Size = this.node_view_owner.getContentSize();
        if (allianceInfo.creater_club_id !== myCreatedClubID) {
            pos = this.node_view_other.getPosition();
            size = this.node_view_other.getContentSize();
        }
        this._svReuse.node.setPosition(pos);
        this._svReuse.resetScrollVewSize(size);

        // 填充列表数据
        let objs: any[] = [];
        objs.push({ prefab_type: 0, prefab_component: "AllianceMemberItem", prefab_datas: vRet });
        this._svReuse.bindData(objs);
    }

    private _onClickBack(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("onClubSceneTransView", {
            nextView: eClubSceneView.E_CSV_LASTVIEW,
            lastView: eClubSceneView.E_CSV_ALLIANCE_INFO_VIEW,
            transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
            transBoth: true
        });
    }

    private _onClickDissolve(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let allianceInfo: world_pb.NoticeSearchAlliance = cv.clubDataMgr.getCurSearchClubData().clubExtra.allianceInfo;
        cv.TP.showMsg(cv.config.getStringData("AllianceUI15"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.worldNet.requestLeaveAlliance(allianceInfo.alliance_id, allianceInfo.creater_club_id);
        });
    }

    private _onClickApply(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let tagCom: TagCom = this.btn_apply.getComponent(TagCom);
        if (!tagCom) return;

        let curOpClubID: number = cv.clubDataMgr.getCurOpClubData().club.club_id;
        let allianceInfo: world_pb.NoticeSearchAlliance = cv.clubDataMgr.getCurSearchClubData().clubExtra.allianceInfo;

        // 加入"联盟"
        if (tagCom.bTag) {
            cv.worldNet.requestJoinAlliance(allianceInfo.alliance_id, curOpClubID, "I want join your alliance");
        }
        // 退出"联盟"(协议暂时作废, 只能是盟主解散联盟)
        else {
            cv.worldNet.requestLeaveAlliance(allianceInfo.alliance_id, curOpClubID);
        }
    }

    // 切换至联盟主界面
    private _onMsgshowAllianceMainView(alliance_id: number): void {
        if (!this.node.active) return;
        let curView: cc.Node = cv.action.getCurShowView();
        let allianceInfo: world_pb.NoticeSearchAlliance = cv.clubDataMgr.getCurSearchClubData().clubExtra.allianceInfo;

        if (curView === this.node && alliance_id === allianceInfo.alliance_id) {
            cv.MessageCenter.send("onClubSceneTransView", {
                nextView: eClubSceneView.E_CSV_ALLIANCE_MAIN_VIEW,
                lastView: eClubSceneView.E_CSV_CURVIEW,
                transDir: cv.action.eMoveActionDir.EMAD_TO_RIGHT,
                transBoth: true
            });
        }
    }
}
