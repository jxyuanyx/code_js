import cv from "../cv";
import ModifyPassword from "./ModifyPassword";
import VerityMessage from "./VerityMessage";
import VeritySiliaoApp from "./VeritySiliaoApp";

const { ccclass, property } = cc._decorator;
@ccclass
export class ChooseVerity extends cc.Component {

    @property(cc.Prefab) prefab_msgVerity: cc.Prefab = null;         // 短信验证预制件
    @property(cc.Prefab) prefab_siliaoVerity: cc.Prefab = null;         //私聊验证预制件

    @property(cc.Label) txt_title: cc.Label = null;
    @property(cc.Label) message_text: cc.Label = null;   //短信验证
    @property(cc.Label) message_status: cc.Label = null;   //短信验证选择状态
    @property(cc.Label) siyuapp_text: cc.Label = null;   //私聊app
    @property(cc.Label) siyuapp_status: cc.Label = null;   //私聊app选择状态

    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) vBtns: cc.Button[] = [];
    @property(cc.Layout) layout: cc.Layout = null;
    @property(cc.Node) img_bg_top: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;
    private _lastView: cc.Node = null;
    private _inst_MsgVerity: cc.Node = null;
    private _inst_siliaoVerity: cc.Node = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!ChooseVerity._g_prefabInst) ChooseVerity._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(ChooseVerity._g_prefabInst.uuid)) {
            if (!cc.isValid(ChooseVerity._g_prefabInst, true)) {
                ChooseVerity._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return ChooseVerity._g_prefabInst;
    }

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);

        for (let i = 0; i < this.vBtns.length; ++i) {
            this.vBtns[i].node.on("click", (event: cc.Event.EventCustom) => {
                this._onClickBtns(i, event);
            }, this);
        }

        cv.resMgr.adaptWidget(this.node, true);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("onChangeVerityType", this.onChangeVerity.bind(this), this.node);
    }

    onDestroy(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("onChangeVerityType", this.node);
    }

    protected start(): void {

        cv.tools.SaveStringByCCFile("FirstShowVerityGuid", "false");  //向导
        cv.MessageCenter.send("hide_redDotGuide");

        //短信验证
        this._inst_MsgVerity = cc.director.getScene().getChildByName("MsgVerity");
        if (!this._inst_MsgVerity) {
            this._inst_MsgVerity = cv.action.addChildToScene(this, this.prefab_msgVerity, []);
            this._inst_MsgVerity.name = "MsgVerity";
        }
        //私聊验证
        this._inst_siliaoVerity = cc.director.getScene().getChildByName("SiliaoVerity");
        if (!this._inst_siliaoVerity) {
             this._inst_siliaoVerity = cv.action.addChildToScene(this, this.prefab_siliaoVerity, []);
             this._inst_siliaoVerity.name = "SiliaoVerity";
        }
        this.initLanguage();
    }

    initLanguage(): void {
        this.txt_title.string = cv.config.getStringData("siyu_verity_receive")
        this.message_text.string = cv.config.getStringData("siyu_verity_message");
        this.siyuapp_text.string = cv.config.getStringData("siyu_siliao_app");

    
        this.onChangeVerity();

    }


    onChangeVerity(){
        let curChooseType = cv.dataHandler.getUserData().verityType; 
        if(curChooseType == cv.Enum.VerityGetType.Message_Get){ //选择短信验证
            this.message_status.string = cv.config.getStringData("siyu_switch_on");  //已选择
            this.siyuapp_status.string = cv.config.getStringData("siyu_switch_off");  //已关闭

            this.message_status.node.color = cc.color(225,193, 80);
            this.siyuapp_status.node.color = cc.color(255,255,255);
        }else{
            this.message_status.string = cv.config.getStringData("siyu_switch_off");  //已选择
            this.siyuapp_status.string = cv.config.getStringData("siyu_switch_on");  //已关闭

            this.message_status.node.color = cc.color(255,255,255);   
            this.siyuapp_status.node.color = cc.color(225,193, 80);       
        }
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
            // 短信验证
            case 0: {
                let verityMsg: VerityMessage = this._inst_MsgVerity.getComponent(VerityMessage);
                verityMsg.init(this.node, () => {
                    cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_IN);
                    verityMsg.leftOutToRight();
                });

                cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_OUT);
                verityMsg.rightEnterToLeft();
            } break;

            // 私聊验证
            case 1: {
                let veritySiliao: VeritySiliaoApp = this._inst_siliaoVerity.getComponent(VeritySiliaoApp);
                veritySiliao.init(this.node, () => {
                    cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_IN);
                    veritySiliao.leftOutToRight();
                });

                cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_OUT);
                veritySiliao.rightEnterToLeft();
                
            } break;

            default: break;
        }
    }

    showError(arg) {
        let errorMsg = null;
        let errorType = null;
        let check = function (name) {
            return name != undefined;
        }

        //检验私聊账号
        if (check(arg.siliaoAccount)) {
            let len = cv.StringTools.getStrLen(arg.siliaoAccount);
            if (len <= 0) {
                errorMsg = "siyu_title_tips09";  //请输入私聊账号
                errorType = "ToastTypeError";
            }
        }

        //检验私聊验证码
        if (check(arg.siliaoVcode)) {
            let len = cv.StringTools.getStrLen(arg.siliaoVcode);
            if (len <= 0) {
                errorMsg = "siyu_input_tips01";  //请输入私聊验证码
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.KVCode)) {
            if (arg.KVCode.length != 6) {
                errorMsg = "ErrorToast39";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.phoneNum)) {
            if (arg.phoneNum.length <= 0) {
                errorMsg = "ErrorToast38";
                errorType = "ToastTypeError";
            } else if (check(arg.AreaCode)) {
                if (arg.AreaCode === "86" && arg.phoneNum.length != 11) {
                    errorMsg = "ErrorToast28";
                    errorType = "ToastTypeError";
                }
            }
        }

        if (check(arg.kAccount0)) {
            let leng = cv.StringTools.getStrLen(arg.kAccount0);
            if (arg.kAccount0.length <= 0) {
                errorMsg = "ErrorCode8";
                errorType = "ToastTypeError";
            } else if (leng < 8 || leng > 32) {
                errorMsg = "ErrorToast41";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.kAccount0) && check(arg.kAccount1)) {
            if (arg.kAccount0 != arg.kAccount1) {
                errorMsg = "ErrorToast40";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.password0)) {
            let leng = cv.StringTools.getStrLen(arg.password0);
            if (arg.password0.length <= 0) {
                errorMsg = "ErrorCode9";
                errorType = "ToastTypeError";
            } else if (leng < 6 || leng > 14) {
                errorMsg = "ErrorCode7";
                errorType = "ToastTypeError";
            } else if (arg.password0.indexOf(" ") != -1) {
                errorMsg = "recetPassWord_recetPassWord_panel_des_text";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.password0) && check(arg.password1)) {
            if (arg.password0 != arg.password1) {
                errorMsg = "ErrorToast17";
                errorType = "ToastTypeError";
            }
        }

        if (check(arg.nickname)) {
            let leng = cv.StringTools.getStrLen(arg.nickname);
            if (arg.nickname.length <= 0) {
                errorMsg = "ErrorToast3";
                errorType = "ToastTypeError";
            } else if (!cv.StringTools.isClubNameFormat(arg.nickname)) {
                errorMsg = "tips_no_special_words";
                errorType = "ToastTypeWarning";
            } else if (cv.StringTools.isSensitiveWords(arg.nickname)) {
                errorMsg = "tips_no_sensitive_words";
                errorType = "ToastTypeWarning";
            } else if (leng < 4 || leng > 12) {
                errorMsg = "EditBoxNickName1";
                errorType = "ToastTypeWarning";
            }
        }

    

        if (errorMsg != null) {
            cv.TT.showMsg(cv.config.getStringData(errorMsg), errorType);
            return true;
        }
        return false;
    }
}
