import cv from "../../lobby/cv";
import { PokerMasterDef } from "../pokerMaster/PokerMasterDef";

/**
 * 声音设置面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class CowboySetting extends cc.Component {
    @property(cc.Sprite) effect_sp: cc.Sprite = null;
    @property(cc.Sprite) music_sp: cc.Sprite = null;
    @property(cc.Sprite) setting_img: cc.Sprite = null;

    @property(cc.Button) btn_confirm: cc.Button = null;
    @property(cc.Button) btn_close: cc.Button = null;
    @property(cc.Button) btn_effect: cc.Button = null;                                                                          // 音效
    @property(cc.Button) btn_music: cc.Button = null;                                                                           // 音乐

    open_frame: string = "zh_CN/game/cowboy/sound_open";
    close_frame: string = "zh_CN/game/cowboy/sound_close";
    private isEffect_open: boolean = false;
    private isMusic_open: boolean = false;
    private _atlas_cb_language: cc.SpriteAtlas = null;                                                                          // 牛仔语言图集

    protected onLoad(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));

        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this.setting_img.getComponent(cc.Sprite), "cowboy_sound_setting");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this.btn_confirm.getComponent(cc.Sprite), "tips_ok");

        //let open_texture: cc.Texture2D = cv.resMgr.get("zh_CN/game/cowboy/sound_open");
        //this.open_frame = new cc.SpriteFrame(open_texture);

        //let close_texture: cc.Texture2D = cv.resMgr.get("zh_CN/game/cowboy/sound_close");
        //this.close_frame = new cc.SpriteFrame(close_texture);

        this.initSwitch();

        this.btn_confirm.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this.confirm() 
        }, this);
        this.btn_close.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('close');
            this.close() 
        }, this);
        this.btn_effect.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('tab');
            this.effect() 
        }, this);
        this.btn_music.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('tab');
            this.sound() 
        }, this);
    }

    public sound(): void {
        this.isMusic_open = !this.isMusic_open;
        if (this.isMusic_open) {
            cv.resMgr.setSpriteFrame(this.music_sp.node, this.open_frame);
            //this.music_sp.spriteFrame = this.open_frame;
        }
        else {
            //this.music_sp.spriteFrame = this.close_frame;
            cv.resMgr.setSpriteFrame(this.music_sp.node, this.close_frame);
        }
    }

    public effect(): void {
        this.isEffect_open = !this.isEffect_open;
        if (this.isEffect_open) {
            cv.resMgr.setSpriteFrame(this.effect_sp.node, this.open_frame);
            //this.effect_sp.spriteFrame = this.open_frame;
        }
        else {
            cv.resMgr.setSpriteFrame(this.effect_sp.node, this.close_frame);
            // this.effect_sp.spriteFrame = this.close_frame;
        }
    }

    public close(): void {
        this.node.active = false;
    }

    public initSwitch(): void {
        this.isEffect_open = cv.tools.isSoundEffectOpen();
        if (this.isEffect_open) {
            cv.resMgr.setSpriteFrame(this.effect_sp.node, this.open_frame);
            //this.effect_sp.spriteFrame = this.open_frame;
        }
        else {
            //this.effect_sp.spriteFrame = this.close_frame;
            cv.resMgr.setSpriteFrame(this.effect_sp.node, this.close_frame);
        }

        this.isMusic_open = cv.tools.isPlayMusic();
        if (this.isMusic_open) {
            cv.resMgr.setSpriteFrame(this.music_sp.node, this.open_frame);
            //this.music_sp.spriteFrame = this.open_frame;
        }
        else {
            //this.music_sp.spriteFrame = this.close_frame;
            cv.resMgr.setSpriteFrame(this.music_sp.node, this.close_frame);
        }
    }

    public confirm(): void {
        let isSwitchSound = this.isMusic_open != cv.tools.isPlayMusic() ? true : false;
        cv.tools.setSoundEffect(this.isEffect_open);
        cv.tools.SetPlayMusic(this.isMusic_open);

        if (isSwitchSound) {
            let gameID: number = cv.roomManager.getCurrentGameID();
            switch (gameID) {
                case cv.Enum.GameId.CowBoy: {
                    cv.MessageCenter.send("on_cowboy_sound_switch_notify");
                } break;

                case cv.Enum.GameId.VideoCowboy: {
                    cv.MessageCenter.send("on_cowboy_sound_switch_notify");
                } break;

                case cv.Enum.GameId.HumanBoy: {
                    cv.MessageCenter.send("on_humanboy_sound_switch_notify");
                } break;

                case cv.Enum.GameId.PokerMaster: {
                    let msgStr: string = PokerMasterDef.LocalMsg().MsgPrefix + PokerMasterDef.LocalMsg().SWITCH_SOUND;
                    cv.MessageCenter.send(msgStr);
                } break;

                default: break;
            }
        }

        this.close();
    }
}
