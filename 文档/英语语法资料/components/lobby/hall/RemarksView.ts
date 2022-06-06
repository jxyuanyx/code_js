import cv from "../cv"
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RemarksView extends cc.Component {
    @property(cc.Label) num_label: cc.Label = null;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    @property(cc.Prefab)prefab_item: cc.Prefab = null;
    @property(cc.Label) des_label: cc.Label = null;
    @property(cc.Node) btn_edit: cc.Node = null;
    @property(cc.Node) btn_cancel: cc.Node = null;
    @property(cc.Node) btn_delete: cc.Node = null;
    
    @property(cc.Node) img_bg_top: cc.Node = null;
    @property(cc.Node) btn_back: cc.Node = null;
    @property(cc.Node) txt_title: cc.Node = null;

    @property(cc.Node) all_choice: cc.Node = null;
    @property(cc.Toggle) all_toggle: cc.Toggle = null;
    
    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!RemarksView._g_prefabInst) RemarksView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(RemarksView._g_prefabInst.uuid)) {
            if (!cc.isValid(RemarksView._g_prefabInst, true)) {
                RemarksView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return RemarksView._g_prefabInst;
    }

    onLoad ()
    {
        if (cv.config.IS_IPHONEX_SCREEN) {
            this.img_bg_top.height = this.img_bg_top.height + cv.config.FULLSCREEN_OFFSETY;
            this.txt_title.getComponent(cc.Widget).top = this.txt_title.getComponent(cc.Widget).top + cv.config.FULLSCREEN_OFFSETY;
            this.btn_back.getComponent(cc.Widget).top = this.btn_back.getComponent(cc.Widget).top + cv.config.FULLSCREEN_OFFSETY;
            this.scrollView.getComponent(cc.Widget).top = this.scrollView.getComponent(cc.Widget).top + cv.config.FULLSCREEN_OFFSETY;
            this.all_choice.getComponent(cc.Widget).top = this.all_choice.getComponent(cc.Widget).top + cv.config.FULLSCREEN_OFFSETY;
            this.all_toggle.getComponent(cc.Widget).top = this.all_toggle.getComponent(cc.Widget).top + cv.config.FULLSCREEN_OFFSETY;
        }

        this.initLanguage();
        cv.MessageCenter.register("update_remarks", this.onUpdate.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("update_delete", this.onUpdateDeleteBtn.bind(this), this.node);
        cv.MessageCenter.register("update_alltoggle", this.updateAllToggle.bind(this), this.node);
        cv.resMgr.adaptWidget(this.node, true);
    }

    start()
    {
        let sv = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.prefab_item, "RemarksItem");
        sv.generateItemPool();
        sv.bindScrollEventTarget(this);
        this.onUpdate();

        this.all_toggle.node.on('toggle', this.callback, this);
        this.all_toggle.uncheck();
        this.setSelectAllVisible(false);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister("update_remarks", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("update_delete", this.node);
        cv.MessageCenter.unregister("update_alltoggle", this.node);
    }

    init()
    {
        cv.dataHandler.getUserData().selectIDs = [];
        this.showEdit(true);
    }

    private initLanguage()
    {
        cc.find("txt_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("RemarksView_title");
        cc.find("txt", this.btn_edit).getComponent(cc.Label).string = cv.config.getStringData("game_review_favor_list_btn_edit_txt");
        cc.find("txt", this.btn_cancel).getComponent(cc.Label).string = cv.config.getStringData("game_review_favor_list_btn_cancel_txt");
        cc.find("txt", this.btn_delete).getComponent(cc.Label).string = cv.config.getStringData("game_review_favor_list_btn_delete_txt");
        cc.find("allchoice", this.node).getComponent(cc.Label).string = cv.config.getStringData("Insurance_bg_selectAll_txt").replace(":", "");
        this.des_label.string = cv.config.getStringData("RemarksView_text");
    }
    
    private onBack(event)
    {
        this.setSelectAllVisible(false);
        cv.dataHandler.getUserData().selectIDs = [];
        cv.MessageCenter.send("show_tick", false);
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(this.node
            , cv.action.eMoveActionDir.EMAD_TO_RIGHT
            , cv.action.eMoveActionType.EMAT_FADE_OUT
            , cv.action.delay_type.NORMAL
            , (target: cc.Node, actIO: number): void => { }
            , (target: cc.Node, actIO: number): void => {
                // 恢复显示"邮件"图标
                cv.MessageCenter.send("show_mail_entrance", true);
            });
    }

    private onUpdate()
    {
        this.all_toggle.uncheck();
        let list = [];
        cv.dataHandler.getUserData().vRemarkData.forEach((k, v, i) => {
            if(v.nType != 0 || (v.sRemark != null && v.sRemark.length > 0))
            {
                list.push(v);
            }
        });
        
        let sv = this.scrollView.getComponent(ScrollViewReuse);
        sv.reloadView(list);

        let len = list.length
        if(len < 100) {
            this.num_label.node.color = cc.color(40,141,239);
        }else {
            this.num_label.node.color = cc.color(183,51,51);
        }
        this.num_label.string = len + "/100"
        cc.find("mask", this.btn_edit).active = len == 0;
    }

    private onUpdateDeleteBtn()
    {
        cc.find("mask", this.btn_delete).active = cv.dataHandler.getUserData().selectIDs.length == 0;
    }

    private updateAllToggle() {
        let remarkIds = [];
        cv.dataHandler.getUserData().vRemarkData.forEach((k, v, i) => {
            if(v.nType != 0 || (v.sRemark != null && v.sRemark.length > 0))
            {
                remarkIds.push(v.nUid);
            }
        });

        let aaa = cv.dataHandler.getUserData().selectIDs;
        this.all_toggle.node.off('toggle', this.callback, this);
        if (this.equat(remarkIds, cv.dataHandler.getUserData().selectIDs)) {
            this.all_toggle.check();
        }
        else
        {
            this.all_toggle.uncheck();
        }
        this.all_toggle.node.on('toggle', this.callback, this);
    }

    private equat(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((ele) => arr2.includes(ele));
    }

    private callback(event)
    {
        cv.dataHandler.getUserData().selectIDs = [];
        let toggle = event;
        if (toggle.isChecked) {
            cv.dataHandler.getUserData().vRemarkData.forEach((k, v, i) => {
                if(v.nType != 0 || (v.sRemark != null && v.sRemark.length > 0))
                {
                    cv.dataHandler.getUserData().selectIDs.push(v.nUid);
                }
            });
        }

        let list = [];
        cv.dataHandler.getUserData().vRemarkData.forEach((k, v, i) => {
            if(v.nType != 0 || (v.sRemark != null && v.sRemark.length > 0))
            {
                list.push(v);
            }
        });
        let sv = this.scrollView.getComponent(ScrollViewReuse);
        sv.reloadView(list, false);
        this.onUpdateDeleteBtn();
    }

    private showEdit(isShow:boolean)
    {
        this.btn_edit.active = isShow;
        this.btn_cancel.active = !isShow;
        this.btn_delete.active = !isShow;
        if(!isShow) {
            this.onUpdateDeleteBtn();
        }
    }

    private onBtnEdit(event)
    {
        this.setSelectAllVisible(true);
        this.all_toggle.uncheck();
        cv.MessageCenter.send("show_tick", true);
        this.showEdit(false);
    }

    private setSelectAllVisible(b: boolean) {
        this.all_choice.active = b;
        this.all_toggle.node.active = b;
    }

    private onBtnCancel(event)
    {
        this.setSelectAllVisible(false);
        cv.dataHandler.getUserData().selectIDs = [];
        cv.MessageCenter.send("show_tick", false);
        this.showEdit(true);
    }

    private onBtnDelete(event)
    {
        if(cv.dataHandler.getUserData().selectIDs.length > 0){
            cv.TP.showMsg(cv.config.getStringData("RemarksView_tips"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onDelete.bind(this), null);
        }
    }

    private onDelete()
    {
        cv.worldNet.BatchDelRemarksRequest(cv.dataHandler.getUserData().selectIDs);
    }
}
