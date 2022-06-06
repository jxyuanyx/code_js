import cv from "../../lobby/cv";

/**
 * 退出面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class CowboyExit extends cc.Component {
    @property(cc.Button) btn_cancel: cc.Button = null;
    @property(cc.Button) btn_ok: cc.Button = null;
    @property(cc.Button) btn_close: cc.Button = null;

    @property(cc.Sprite) setting_img: cc.Sprite = null;
    @property(cc.Node) exit_text: cc.Node = null;

    private _atlas_cb_language: cc.SpriteAtlas = null;                  // 牛仔语言图集

    protected onLoad(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));

        this.setting_img.getComponent(cc.Sprite).spriteFrame = this._atlas_cb_language.getSpriteFrame("tips_img");
        this.btn_ok.getComponent(cc.Sprite).spriteFrame = this._atlas_cb_language.getSpriteFrame("tips_ok");
        this.btn_cancel.getComponent(cc.Sprite).spriteFrame = this._atlas_cb_language.getSpriteFrame("tips_cancel");

        this.exit_text.getComponent(cc.Label).string = cv.config.getStringData("CowboyExit_bg_exit_text");
        this.btn_cancel.node.on("click", (event: cc.Event): void => { this.onCancel() }, this);
        this.btn_ok.node.on("click", (event: cc.Event): void => { this.onOk() }, this);
        this.btn_close.node.on("click", (event: cc.Event): void => { this.onClose() }, this);
    }

    public onOk(): void {
        cv.AudioMgr.playButtonSound('button_click');
        cv.roomManager.RequestLeaveRoom();
    }

    public onCancel(): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
    }

    public onClose(): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
    }
}
