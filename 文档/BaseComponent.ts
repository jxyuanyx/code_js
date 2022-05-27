import { GameEvents } from "../../../events/GameEvents";
import { AutoBindHelper } from "../tools/AutoBindHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export class BaseComponent extends cc.Component {

    @property({ displayName: "按钮的点击缩放" })
    btnScaleZoom: number = 1.05;

    /**
     * lb要绑定的数据 
     */
    public UIBindData: any = {};

    public _MetaData: any = {};

    /**
     * 按钮
     */
    public UI_BTNS: Map<string, cc.Node> = new Map<string, cc.Node>();

    /**
     * 文本框
     */
    public UI_LBS: Map<string, cc.Node> = new Map<string, cc.Node>();

    /**
     * Sprite
     */
    public UI_SPS: Map<string, cc.Node> = new Map<string, cc.Node>();

    public LANG_LBS: Map<string, cc.Node> = new Map<string, cc.Node>();

    public LANG_SPS: Map<string, cc.Node> = new Map<string, cc.Node>();



    onLoad(){
        this.autoBindUI();
    }


    autoBindUI() {
        /**
         * 自动绑定
         */
        if (!this.node["isBind"]) {
            this.node["isBind"] = true;
            AutoBindHelper.evel(this);
            AutoBindHelper.bindBtn(this);
            AutoBindHelper.bindLb(this);
            AutoBindHelper.bindSprite(this);
            AutoBindHelper.flushLangLb(this);
            AutoBindHelper.flushLangSp(this);
            cc.game.on(GameEvents.LANG_CHANGE, this._onLangChange, this);
        }
    }

    _onLangChange() {
        AutoBindHelper.flushLangLb(this);
        AutoBindHelper.flushLangSp(this);
    }

    onDestroy() {
        cc.game.off(GameEvents.LANG_CHANGE, this._onLangChange, this);
    }
}