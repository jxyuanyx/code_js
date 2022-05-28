
import cv from "../cv";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

const { ccclass, property } = cc._decorator;
@ccclass
export class LanguageSet extends cc.Component {

    @property(cc.Button) btn_back: cc.Button = null;

    @property(cc.Label) title_text: cc.Label = null;

    @property(cc.Button) ch_button: cc.Button = null;
    @property(cc.Button) en_button: cc.Button = null;
    @property(cc.Button) yn_button: cc.Button = null;
    @property(cc.Button) in_button: cc.Button = null;

    private static _g_prefabInst: cc.Node = null;
    private _lastView: cc.Node = null;

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!LanguageSet._g_prefabInst) LanguageSet._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(LanguageSet._g_prefabInst.uuid)) {
            if (!cc.isValid(LanguageSet._g_prefabInst, true)) {
                LanguageSet._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return LanguageSet._g_prefabInst;
    }

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.btn_back.node.on("click", this._onClickBack, this);

        this.ch_button.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._OnChangeLanguage(cv.Enum.LANGUAGE_TYPE.zh_CN);
        }, this);

        this.en_button.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._OnChangeLanguage(cv.Enum.LANGUAGE_TYPE.en_US);
        }, this);

        this.yn_button.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._OnChangeLanguage(cv.Enum.LANGUAGE_TYPE.yn_TH);
        }, this);

        this.in_button.node.on("click", (event: cc.Event): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this._OnChangeLanguage(cv.Enum.LANGUAGE_TYPE.hi_IN);
        }, this);

        cv.resMgr.adaptWidget(this.node);
        this.updateView();
    }

    start() {   
    }

    updateView() {

        this.title_text.string = cv.config.getStringData("LanguageView_title_text");

        let language: string = cv.config.getCurrentLanguage();

        let text = this.ch_button.node.getChildByName("text");
        let hook = this.ch_button.node.getChildByName("hook");
        text.getComponent(cc.Label).string = cv.config.getStringData("LanguageView_ch_button_text");
        hook.active = (language == cv.Enum.LANGUAGE_TYPE.zh_CN);

        text = this.en_button.node.getChildByName("text");
        hook = this.en_button.node.getChildByName("hook");
        text.getComponent(cc.Label).string = cv.config.getStringData("LanguageView_en_button_text");
        hook.active = (language == cv.Enum.LANGUAGE_TYPE.en_US);

        text = this.yn_button.node.getChildByName("text");
        hook = this.yn_button.node.getChildByName("hook");
        text.getComponent(cc.Label).string = cv.config.getStringData("LanguageView_yn_button_text");
        hook.active = (language == cv.Enum.LANGUAGE_TYPE.yn_TH);

        text = this.in_button.node.getChildByName("text");
        hook = this.in_button.node.getChildByName("hook");
        text.getComponent(cc.Label).string = cv.config.getStringData("LanguageView_in_button_text");
        hook.active = (language == cv.Enum.LANGUAGE_TYPE.hi_IN);
    }

    private _OnChangeLanguage(lang: LANGUAGE_TYPE) {
        if(cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.ar_SA) return;
        if(cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.Arab) return;
        cv.config.setCurrentLanguage(lang);
        //保存语言
        cv.tools.SaveStringByCCFile("LANGUAGE_SET", lang);
        //上报语言
        cv.worldNet.UserChangeLanguageRequest(cv.config.getCurrentLanguage());
        cv.worldNet.PgBonusAndFreeGamesRequest();//切换语言重新请求下福利数据
        this.updateView();
        
        if (cv.config.HAVE_MTT) {
            cv.worldNet.RequestAuthApi();
        }
        cv.MessageCenter.send(cv.config.CHANGE_LANGUAGE);
    }

    private _onClickBack(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showActionBothRight(this._lastView, this.node);

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("show_mail_entrance", true);
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
}
