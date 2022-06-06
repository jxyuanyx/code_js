import cv from "../../lobby/cv";
import {GoldViewNew} from "../dzPoker/GoldViewNew";

/**
 * 小游戏通用菜单
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyMenu extends cc.Component {

    @property(cc.Sprite) img_shield: cc.Sprite = null;                                                          // 遮罩底图
    @property(cc.Sprite) img_menu_bg: cc.Sprite = null;
    @property(cc.Prefab) public goldview: cc.Prefab = null;
    @property(cc.Button) btn_exchange: cc.Button = null;                                                      // 菜单底图
    @property(cc.Button) btn_rule: cc.Button = null;                                                            // 游戏规则 按钮
    @property(cc.Button) btn_sound_setting: cc.Button = null;                                                   // 音效设置 按钮
    @property(cc.Button) btn_advanced_setting: cc.Button = null;											    // 高级设置 按钮
    @property(cc.Button) btn_exit: cc.Button = null;														    // 退出游戏 按钮

    private _atlas_hb_language: cc.SpriteAtlas = null;                                                          // 百人语言图集
    private _atlas_hb_exchange: cc.SpriteAtlas = null;

    show(bAnim: boolean): void {
        this._autoAnimFunc(true, bAnim);
    }

    hide(bAnim: boolean): void {
        this._autoAnimFunc(false, bAnim);
    }

    getBtnExchange(): cc.Button {
        return this.btn_exchange;
    }

    getBtnRule(): cc.Button {
        return this.btn_rule;
    }

    getBtnSoundSetting(): cc.Button {
        return this.btn_sound_setting;
    }

    getBtnAdvancedSetting(): cc.Button {
        return this.btn_advanced_setting;
    }

    getBtnExit(): cc.Button {
        return this.btn_exit;
    }

    setMenuPosition(worldPos: cc.Vec2): void {
        this.img_menu_bg.node.setPosition(worldPos);
    }

    getMenuPosition(): cc.Vec2 {
        return this.img_menu_bg.node.position;
    }

    protected onLoad(): void {
        let goldView: cc.Node = cc.instantiate(this.goldview);
        let GVNCmp: GoldViewNew = goldView.getComponent(GoldViewNew);
        GVNCmp.setAddCallback(() => {
            cv.MessageCenter.send("goldViewShop");
        });
		cc.find("img_menu_bg/gold_Panel", this.node).addChild(goldView);
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
        this._atlas_hb_exchange = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"));
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_exchange, this.btn_exchange.getComponent(cc.Sprite), "exchange_coin");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.btn_rule.getComponent(cc.Sprite), "humanboy_menu_rule");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.btn_sound_setting.getComponent(cc.Sprite), "humanboy_menu_sound_setting");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.btn_advanced_setting.getComponent(cc.Sprite), "humanboy_menu_advanced_setting");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.btn_exit.getComponent(cc.Sprite), "humanboy_menu_exit");

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            this.hide(true);
        });
    }

    protected start(): void {
    }

    private _autoAnimFunc(bOpen: boolean, bAnim: boolean): void {
        this.node.active = true;
        this.img_menu_bg.node.active = true;
        this.img_menu_bg.node.stopAllActions();

        let duration: number = 0.5;
        let seq: cc.Action = null;

        if (bOpen) {
            this.img_menu_bg.node.setScale(0);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_menu_bg.node.setScale(1.0);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
            });

            if (bAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 1.0);
                let ebo: cc.ActionInterval = st.easing(cc.easeBackOut());
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            this.img_menu_bg.node.setScale(1);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_menu_bg.node.setScale(0);
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.node.active = false;
            });

            if (bAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 0.0);
                let ebi: cc.ActionInterval = st.easing(cc.easeBackIn());
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this.img_menu_bg.node.runAction(seq);
            this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }
}
