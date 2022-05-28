import ws_protocol = require("./../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../components/lobby/cv";
import * as Enums from "../../common/tools/Enum";

import { MailPopLayer } from "./MailPopLayer";
import { GlobalMsgLayer } from "./GlobalMsgLayer";

/**
 * 邮件入口按钮
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MailEntrance extends cc.Component {
    @property(cc.Prefab) prefab_globalMsg: cc.Prefab = null;                        // 全局消息层预制件
    @property(cc.Prefab) prefab_mailPopLayer: cc.Prefab = null;                     // 邮件弹出详情预制件
    @property(cc.Button) btn_enter: cc.Button = null;
    @property(cc.Sprite) img_red: cc.Sprite = null;
    @property(cc.Label) txt_new_num: cc.Label = null;

    private static _g_instance: MailEntrance = null;                                // 单例
    private _fronzeActive: boolean = false;                                         // 是否冻结 active
    private _zIndex_GlobalMsgLayer: number = Enums.ZORDER_TYPE.ZORDER_5;            // 邮件列表层级
    private _zIndex_MailPopLayer: number = this._zIndex_GlobalMsgLayer + 1;         // 邮件详情层级

    /**
     * 获取该常驻节点单例(如果常驻节点被销毁, 该返回值也会失效, 并非正真意义上的单例)
     */
    static getInstance(): MailEntrance {
        return MailEntrance._g_instance;
    }

    /**
     * 显示邮件入口图标
     */
    show(): void {
        this._fronzeActive = false;
        this._onMsgUpdateListView();
    }

    /**
     * 隐藏邮件入口图标
     * @param fronze 是否冻结 active, 如果冻结, 必须调用 show 才能显示 (默认false)
     */
    hide(fronzeActive: boolean = false): void {
        this._fronzeActive = fronzeActive;
        this.node.active = false;
    }

    /**
     * 关闭全局消息列表层/邮件详情层
     */
    closeMailLayer(): void {
        // 关闭"邮件详情层"
        cv.MessageCenter.send("close_mailPopLayer");

        // 关闭"全局消息列表层"
        cv.MessageCenter.send("close_globalMsgLayer", false);
    }

    protected onLoad(): void {
        this._addObserver();
        MailEntrance._g_instance = this;
        cv.resMgr.adaptWidget(this.node);
    }

    protected start(): void {
        this.img_red.node.active = false;
        this._updateView();

        // 添加节点为常驻节点(有层级遮挡问题, 暂时去掉常驻)
        // if (!cc.game.isPersistRootNode(this.node)) {
        //     cc.game.addPersistRootNode(this.node);
        // }
    }

    protected onDestroy(): void {
        this._removeObserver();
        MailEntrance._g_instance = null;
    }

    private _addObserver(): void {
        this.btn_enter.node.on("click", this._onClickEnter, this);

        cv.MessageCenter.register("show_mail_entrance", this.show.bind(this), this.node);                                   // 显示邮件入口图标
        cv.MessageCenter.register("hide_mail_entrance", this.hide.bind(this), this.node);                                   // 隐藏邮件入口图标
        cv.MessageCenter.register("close_mail_layer", this.closeMailLayer.bind(this), this.node);                           // 关闭全局消息列表层/邮件详情层

        cv.MessageCenter.register("switchSceneBegan", this._onMsgSwitchSceneBegan.bind(this), this.node);                   // 切换场景前
        cv.MessageCenter.register("switchSceneFinish", this._onMsgSwitchSceneFinish.bind(this), this.node);                 // 切换场景后
        cv.MessageCenter.register("updateListView", this._onMsgUpdateListView.bind(this), this.node);                       // 更新全局消息
        cv.MessageCenter.register("on_notify_mail_num", this._onMsgUpdateMailNum.bind(this), this.node)                     // 更新邮件数量
        cv.MessageCenter.register("update_notice_status", this._onMsgUpdateCountStatus.bind(this), this.node);              // 更新UI计数图标状态
        cv.MessageCenter.register("on_pop_one_anounce", this._onMsgPopOneAnounce.bind(this), this.node);                    // 弹出邮件/公告详情
    }

    private _removeObserver(): void {
        cv.MessageCenter.unregister("show_mail_entrance", this.node);
        cv.MessageCenter.unregister("hide_mail_entrance", this.node);
        cv.MessageCenter.unregister("close_mail_layer", this.node);

        cv.MessageCenter.unregister("switchSceneBegan", this.node);
        cv.MessageCenter.unregister("switchSceneFinish", this.node);
        cv.MessageCenter.unregister("updateListView", this.node);
        cv.MessageCenter.unregister("on_notify_mail_num", this.node);
        cv.MessageCenter.unregister("update_notice_status", this.node);
        cv.MessageCenter.unregister("on_pop_one_anounce", this.node);
    }

    private _updateView(): void {
        // 更新UI计数
        this._onMsgUpdateCountStatus();

        // 检测显影层级等
        let sceneName: string = cv.String(cc.director.getScene().name);
        if (sceneName.length <= 0) {
            sceneName = cv.config.getCurrentScene();
        }
        this._checkNodeActiveStatus(sceneName);
    }

    private _onClickEnter(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('button_click');
        let inst: cc.Node = GlobalMsgLayer.getSinglePrefabInst(this.prefab_globalMsg);
        let layer: GlobalMsgLayer = inst.getComponent(GlobalMsgLayer);
        layer.autoShow(cc.director.getScene(), this._zIndex_GlobalMsgLayer);

        // 隐藏webview
        cv.MessageCenter.send("hide_bombInfoTips");
        cv.MessageCenter.send("HideWebview_ShowWindows");
    }

    /**
     * 检测自身节点在对应场景中的显影状态和层级深度值
     * @param scene 
     */
    private _checkNodeActiveStatus(sceneName: string): void {
        switch (sceneName) {
            case cv.Enum.SCENE.HALL_SCENE: {
                if (!this._fronzeActive) this.node.active = true;
                this.node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_5;
            } break;

            case cv.Enum.SCENE.CLUB_SCENE: {
                let nTotal: number = cv.globalMsgDataMgr.getUnreadMsgCount();
                if (!this._fronzeActive) this.node.active = nTotal > 0;
                this.node.zIndex = 0;
            } break;

            case cv.Enum.SCENE.GAME_SCENE:
            case cv.Enum.SCENE.GAME_SCENE_AOF: {
                if (!this._fronzeActive) this.node.active = true;
                this.node.zIndex = 0;
            } break;

            default: {
                // 其他场景, 暂未特殊要求, 此处直接隐藏, 且恢复冻结 active
                this.node.active = false;
                this.node.zIndex = 0;
                this._fronzeActive = false;
            } break;
        }
    }

    /**
     * 切换场景前
     * @param scene 
     */
    private _onMsgSwitchSceneBegan(sceneName: string): void {
    }

    /**
     * 切换场景后
     * @param scene 
     */
    private _onMsgSwitchSceneFinish(sceneName: string): void {
        this._updateView();
    }

    /**
     * 更新全局消息(若 GlobalMsgLayer 存在, 则会自行处理, 这里只需更新计数ui显示)
     */
    private _onMsgUpdateListView(): void {
        this._updateView();
    }

    /**
     * 更新邮件数量结构信息
     * @param param 
     */
    private _onMsgUpdateMailNum(param: world_pb.NotifyUserMailNum): void {
        // 服务器只要下发数量变化就重置邮件全局数据等
        cv.globalMsgDataMgr.clearMailGlobalData();

        // 拷贝数量信息
        cv.globalMsgDataMgr.setMailCountInfo(param);

        // 更新计数ui显示
        cv.MessageCenter.send("update_notice_status");
    }

    /**
     * 更新ui计数
     * @param param 
     */
    private _onMsgUpdateCountStatus(): void {
        // 更新数量
        let nTotal: number = cv.globalMsgDataMgr.getUnreadMsgCount();
        this.txt_new_num.string = nTotal.toString();
        this.img_red.node.active = nTotal > 0;
    }

    /**
     * 弹出邮件/公告详情
     * @param data 
     */
    private _onMsgPopOneAnounce(data: world_pb.MailInfo): void {
        let inst: cc.Node = cc.instantiate(this.prefab_mailPopLayer);
        let scene: cc.Scene = cc.director.getScene();
        if (!scene.getChildByUuid(inst.uuid)) {
            inst.setPosition(cv.action.WIDTH / 2, cv.action.HEIGHT / 2);
            scene.addChild(inst, this._zIndex_MailPopLayer);
        }
        inst.getComponent(MailPopLayer).autoShow(data);
    }
}
