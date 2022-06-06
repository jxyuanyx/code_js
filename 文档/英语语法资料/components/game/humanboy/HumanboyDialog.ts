import cv from "../../lobby/cv";

/**
 * 小游戏通用简易对话框
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyDialog extends cc.Component {

    @property(cc.Sprite) img_title: cc.Sprite = null;
    @property(cc.Label) txt_content: cc.Label = null;
    @property(cc.Button) btn_left: cc.Button = null;
    @property(cc.Button) btn_right: cc.Button = null;
    @property(cc.Button) btn_close: cc.Button = null;

    private _cb_left: (dialog: HumanboyDialog) => void = null;
    private _cb_right: (dialog: HumanboyDialog) => void = null;
    private _atlas_cb_language: cc.SpriteAtlas = null;                  // 牛仔语言图集

    protected onLoad(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        this.img_title.spriteFrame = this._atlas_cb_language.getSpriteFrame("tips_img");

        this.btn_left.node.on("click", (sender: cc.Node): void => {
            cv.AudioMgr.playButtonSound('button_click');
            if (this._cb_left) {
                this._cb_left(this);
                this.close();
            }
        });

        this.btn_right.node.on("click", (sender: cc.Node): void => {
            cv.AudioMgr.playButtonSound('button_click');
            if (this._cb_right) {
                this._cb_right(this);
                this.close();
            }
        });

        this.btn_close.node.on("click", (sender: cc.Node): void => {
            cv.AudioMgr.playButtonSound('button_click');
            this.close();
        });

        // 隐藏关闭按钮(暂不开放)
        this.btn_close.node.active = false;
    }

    protected start(): void {
    }

    /**
     * 显示对话框
     * @param str_content       - 内容文本
     * @param str_btn_left      - 左按钮文本
     * @param str_btn_right     - 右按钮文本
     * @param cb_left           - 左按钮回调函数
     * @param cb_right          - 右按钮回调函数
     */
    show(str_content: string, str_btn_left: string, str_btn_right: string, cb_left: (dialog: HumanboyDialog) => void, cb_right: (dialog: HumanboyDialog) => void): void {
        this.txt_content.string = cv.StringTools.calculateAutoWrapString(this.txt_content.node, str_content);
        this._cb_left = cb_left;
        this._cb_right = cb_right;
        this.node.active = true;

        let txt_btn_left: cc.Label = this.btn_left.node.getChildByName("txt").getComponent(cc.Label);
        txt_btn_left.string = str_btn_left;

        let txt_btn_right: cc.Label = this.btn_right.node.getChildByName("txt").getComponent(cc.Label);
        txt_btn_right.string = str_btn_right;
    }

    /**
     * 关闭对话框(直接移除)
     */
    close(): void {
        this.node.removeFromParent(true);
        cv.tools.destroyNode(this.node);
    }
}
