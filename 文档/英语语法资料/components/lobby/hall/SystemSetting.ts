import cv from "../cv";
import { ChoosePassword } from "./ChoosePassword";
import { ControlSwitch } from "../../lobby/controlSwitch/ControlSwitch";
import { ChooseVerity } from "./ChooseVerity";

/**
 * 系统设置面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class SystemSetting extends cc.Component {

    @property(cc.Prefab) prefab_choosePW: cc.Prefab = null;
    @property(cc.Prefab) prefab_chooseVerity: cc.Prefab = null;
    @property(cc.Prefab) prefab_LangSet: cc.Prefab = null;

    @property(cc.Label) txt_title: cc.Label = null;
    @property(cc.Button) btn_back: cc.Button = null;
    @property(cc.Button) vBtns: cc.Button[] = [];
    @property(ControlSwitch) voiceSwitch: ControlSwitch = null;
    @property(cc.Button) btnSwitch: cc.Button = null;
    @property(cc.Label) verifyTxtType: cc.Label = null;
    private static _g_prefabInst: cc.Node = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!SystemSetting._g_prefabInst) SystemSetting._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(SystemSetting._g_prefabInst.uuid)) {
            if (!cc.isValid(SystemSetting._g_prefabInst, true)) {
                SystemSetting._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return SystemSetting._g_prefabInst;
    }

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBtnBack, this);

        for (let i = 0; i < this.vBtns.length; ++i) {
            this.vBtns[i].node.on("click", (event: cc.Event.EventCustom) => {
                this._onClickBtns(i, event);
            }, this);

            //私语验证功能不打开
            if(!cv.config.isOpenSiyuVerify()){
                this.vBtns[4].node.y = this.vBtns[3].node.y;
                this.vBtns[3].node.active = false;
            }
        }

        //this.voiceSwitch.node.on(ControlSwitch.g_event_name_switch, this._onVoiceSwitch, this);

        // 检测音频开关状态
        this.btnSwitch.node.on("click", this._onVoiceSwitch, this);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("hide_redDotGuide", this.onHideReddotGuide.bind(this), this.node);
        cv.MessageCenter.register("onChangeVerityType", this._onChangeVerityType.bind(this), this.node);
        cv.resMgr.adaptWidget(this.node);

    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("hide_redDotGuide", this.node);
        cv.MessageCenter.unregister("onChangeVerityType", this.node);
    }

    protected start(): void {
        this.initLanguage();

        let status = cv.tools.isSoundEffectOpen();
        this._setVOiceBtn(status);
        //this.voiceSwitch.switchOn = !cv.tools.isSoundEffectOpen();
    }


    // 更新静态文本
    public initLanguage(): void {
        // 标题
        do {
            this.txt_title.string = cv.config.getStringData("SystemSet_back_button_Text_4");
        } while (false);

        //验证方式
        this._onChangeVerityType();

        // buttons
        do {
            for (let i = 0; i < this.vBtns.length; ++i) {
                let txt: cc.Label = this.vBtns[i].node.getChildByName("txt_title").getComponent(cc.Label);
                let strKey: string = "";
                switch (i) {

                    // 音效设置
                    case 0: strKey = "SystemSet_voice_button_Text_22"; break;
                    
                    // 切换账号
                    case 1: strKey = "SystemSet_change_account_Text_22"; break;

                    // 修改密码
                    case 2: strKey = "SystemSet_Modifirm_button_Text_22"; break;
                 
                    //私语验证码
                    case 3: strKey = "siyu_account_verify"; 
                        let icon_dot = this.vBtns[i].node.getChildByName("icon_dot");
                        icon_dot.active = false;
                        if(cv.config.isOpenSiyuVerify()){
                            //第一次引导，设置显示红点
                            let _bShowGuidDot = cv.tools.GetStringByCCFile("FirstShowVerityGuid");
                            if(_bShowGuidDot != "false"){
                                txt.string = cv.config.getStringData(strKey);
                                let txt_title = this.vBtns[i].node.getChildByName("txt_title");
                                icon_dot.x = txt_title.x + cv.resMgr.getLabelStringSize(txt_title.getComponent(cc.Label)).width + 8;
                                icon_dot.active = true;
                            }
                        }
                    break;

                    // 版本号
                    case 4: {
                        strKey = "SystemSet_version_button_Text_22";

                        let txt_version: cc.Label = this.vBtns[i].node.getChildByName("txt_version").getComponent(cc.Label);
                        txt_version.string = cv.config.GET_CLIENT_VERSION();
                    } break;

                    default: break;
                }
                txt.string = cv.config.getStringData(strKey);
            }
        } while (false);
    }

    private onHideReddotGuide(){
        let icon_dot = this.vBtns[3].node.getChildByName("icon_dot");
        icon_dot.active = false;
    }

    private _onClickBtnBack(event: cc.Event): void {
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

    private _onClickBtns(index: number, event: cc.Event.EventCustom): void {
        switch (index) {
            // 音效设置
            case 0: break;

            // 切换账号
            case 1: {
                cv.AudioMgr.playButtonSound('tab');
                cv.TP.showMsg(cv.config.getStringData("ToastMessage7"), cv.Enum.ButtonStyle.TWO_BUTTON, this._onLoginOut.bind(this));
            } break;

            // 选择修改密码
            case 2: {
                cv.AudioMgr.playButtonSound('tab');
                if(cv.dataHandler.getUserData().isTouristUser){
                    cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_usePassword_barntips_text"),cv.Enum.ButtonStyle.TWO_BUTTON,cv.dataHandler.upgradeAccount.bind(cv.dataHandler),cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
                    return;
                }
                let inst_choosePW: cc.Node = ChoosePassword.getSinglePrefabInst(this.prefab_choosePW);
                cv.action.addChildToSceneOnce(inst_choosePW);
                inst_choosePW.getComponent(ChoosePassword).setLastView(this.node);
                inst_choosePW.active = true;
                cv.action.showActionBothLeft(inst_choosePW
                    , this.node
                    , cv.action.delay_type.NORMAL
                    , (target: cc.Node, actIO: number): void => { }
                    , (target: cc.Node, actIO: number): void => {
                        // 显示邮件入口按钮, 且解冻显示
                        cv.MessageCenter.send("show_mail_entrance");
                    });
            } break;

            //账号验证
            case 3:{
                cv.AudioMgr.playButtonSound('tab');
       
                if(cv.dataHandler.getUserData().isTouristUser){
                    cv.TP.showMsg(cv.config.getStringData("siyu_title_tips14"),cv.Enum.ButtonStyle.TWO_BUTTON,cv.dataHandler.upgradeAccount.bind(cv.dataHandler),cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
                    return;
                }
                let inst_chooseVerity: cc.Node = ChooseVerity.getSinglePrefabInst(this.prefab_chooseVerity);
                cv.action.addChildToSceneOnce(inst_chooseVerity);
                inst_chooseVerity.getComponent(ChooseVerity).setLastView(this.node);
                inst_chooseVerity.active = true;
                cv.action.showActionBothLeft(inst_chooseVerity
                    , this.node
                    , cv.action.delay_type.NORMAL
                    , (target: cc.Node, actIO: number): void => { }
                    , (target: cc.Node, actIO: number): void => {
                        // 显示邮件入口按钮, 且解冻显示
                        cv.MessageCenter.send("show_mail_entrance");
                    });
            }

            // 版本号
            case 4: break;
            default: break;
        }
    }

    private _onLoginOut(): void {
        cv.httpHandler.requestLogout();
    }

    private _OnChangeLanguage(): void {
        let language: string = cv.config.getCurrentLanguage();
        switch (language) {
            case cv.Enum.LANGUAGE_TYPE.zh_CN: {
                cv.config.setCurrentLanguage(cv.Enum.LANGUAGE_TYPE.en_US);
            } break;

            case cv.Enum.LANGUAGE_TYPE.en_US: {
                cv.config.setCurrentLanguage(cv.Enum.LANGUAGE_TYPE.zh_CN);
            } break;

            case cv.Enum.LANGUAGE_TYPE.yn_TH: {
                cv.config.setCurrentLanguage(cv.Enum.LANGUAGE_TYPE.yn_TH);
            } break;
            default:
                break;
        }

        // 切换语言版本相关资源(仿cocos2dx原理,先清除缓存,然后优先搜索路径,然后重新加载资源,最后重新设置引用生效)
        // 改动较大,有时间在详细处理
        do {
            // 到时候详细讨论下英文版文件夹路径问题...
        } while (false);

        cv.MessageCenter.send(cv.config.CHANGE_LANGUAGE);
    }

    private _onVoiceSwitch(): void {
        cv.AudioMgr.playButtonSound('button_click');
        let status= !cv.tools.isSoundEffectOpen();
        this._setVOiceBtn(status);
        if (status) {
            cv.AudioMgr.resumeAll()
        }
        else {
            cv.AudioMgr.pauseAll();
        }
        cv.tools.setSoundEffect(status);
    }

    private _setVOiceBtn(status: boolean){
        if(status == true){
            cv.resMgr.setSpriteFrame(this.btnSwitch.node, "zh_CN/hall/selfView/voice_on");
        }else{
            cv.resMgr.setSpriteFrame(this.btnSwitch.node, "zh_CN/hall/selfView/voice_off");
        }

    }

    private _onChangeVerityType(){
        if(cv.dataHandler.getUserData().verityType == cv.Enum.VerityGetType.AppGet_Get){  //私聊
            this.verifyTxtType.string = cv.config.getStringData("siyu_verity_type_siyu");
        }else{
            this.verifyTxtType.string = cv.config.getStringData("siyu_verity_type_message");  //短信
        }
    }
}
