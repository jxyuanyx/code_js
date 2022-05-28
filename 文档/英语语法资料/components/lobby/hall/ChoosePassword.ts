import cv from "../cv";
import ModifyPassword from "./ModifyPassword";

const { ccclass, property } = cc._decorator;
@ccclass
export class ChoosePassword extends cc.Component {

    @property(cc.Prefab) prefab_modifyPW: cc.Prefab = null;         // 修改密码预制件
    @property(cc.Prefab) prefab_secondPW: cc.Prefab = null;         // 二级密码预制件

    @property(cc.Label) txt_title: cc.Label = null;
    @property(cc.Label) login_text: cc.Label = null;
    @property(cc.Label) twolevel_text: cc.Label = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) vBtns: cc.Button[] = [];
    @property(cc.Layout) layout: cc.Layout = null;
    @property(cc.Node) img_bg_top: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;
    private _lastView: cc.Node = null;
    private _inst_modifyPW: cc.Node = null;
    private _inst_twolevelPW: cc.Node = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ChoosePassword._g_prefabInst) ChoosePassword._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ChoosePassword._g_prefabInst.uuid)) {
            if (!cc.isValid(ChoosePassword._g_prefabInst, true)) {
                ChoosePassword._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ChoosePassword._g_prefabInst;
    }

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);

        for (let i = 0; i < this.vBtns.length; ++i) {
            this.vBtns[i].node.on("click", (event: cc.Event.EventCustom) => {
                this._onClickBtns(i, event);
            }, this);
        }

        // if (cv.config.IS_IPHONEX_SCREEN)
        // {
        //     this.img_bg_top.height = 290;
        // }

        // if (cv.config.IS_FULLSCREEN) {
        //     this.layout.getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        // }
        cv.resMgr.adaptWidget(this.node, true);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    protected start(): void {
        this._inst_modifyPW = cc.director.getScene().getChildByName("ModifyPsd");
        if (!this._inst_modifyPW) {
            this._inst_modifyPW = cv.action.addChildToScene(this, this.prefab_modifyPW, []);
            this._inst_modifyPW.name = "ModifyPsd";
        }
        
        this._inst_twolevelPW = cc.director.getScene().getChildByName("SecondaryPassword");
        if (!this._inst_twolevelPW) {
            this._inst_twolevelPW = cv.action.addChildToScene(this, this.prefab_secondPW, []);
            this._inst_twolevelPW.name = "SecondaryPassword";
        }
        this.initLanguage();
    }

    initLanguage(): void {
        this.txt_title.string = cv.config.getStringData("ChoosePassword_title_text")
        this.login_text.string = cv.config.getStringData("ChoosePassword_modify_button_login_text");
        this.twolevel_text.string = cv.config.getStringData("ChoosePassword_twolevel_button_twolevel_text");
    }

    /**
     * 设置上页视图节点(用于返回界面时传入)
     * @param view 
     */
    setLastView(view: cc.Node): void {
        if (cc.isValid(view, true)) {
            this._lastView = view;
        }
    }

    private _onClickBack(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showActionBothRight(this._lastView, this.node);

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);
    }

    private _onClickBtns(index: number, event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('tab');
        switch (index) {
            // 修改登录密码
            case 0: {
                let modifyPW: ModifyPassword = this._inst_modifyPW.getComponent(ModifyPassword);
                modifyPW.init(true, () => {
                    cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_IN);
                    modifyPW.leftOutToRight();
                });

                cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_OUT);
                modifyPW.rightEnterToLeft();
            } break;

            // 修改二级密码
            case 1: {
                let modifyPW: ModifyPassword = this._inst_modifyPW.getComponent(ModifyPassword);
                modifyPW.init(false, () => {
                    cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_IN);
                    modifyPW.leftOutToRight();
                });

                cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_OUT);
                modifyPW.rightEnterToLeft();
                
            } break;

            default: break;
        }
    }
}
