import pb_cowboy = require("../../../../Script/common/pb/cowboy");
import cowboy_proto = pb_cowboy.cowboy_proto;

import pb_videocowboy = require("../../../../Script/common/pb/video_cowboy");
import videocowboy_proto = pb_videocowboy.video_cowboy_proto;

import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import pb_pokermaster = require("../../../../Script/common/pb/pokermaster");
import pokermaster_proto = pb_pokermaster.pokermaster_proto;

import cv from "../../lobby/cv";
import cowboyDataMgr from "../cowboy/cb";
import humanboyDataMgr from "./HumanboyDataMgr";
import { HumanboyDialog } from "./HumanboyDialog";
import { HumanboyBetCoin } from "./HumanboyBetCoin";
import VideoCowboyManager from "../videoCowboy/VideoCowboyManager";
import pokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr";

class HumanboyAdvancedSettingCoinOptNode {
    index: number = 0;
    llAmountLevel: number = 0;
    nodeRoot: cc.Node = null;
    coin: HumanboyBetCoin = null;
    checkBox: cc.Toggle = null;
};

/**
 * 高级续投设置面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyAdvancedSetting extends cc.Component {

    @property(cc.Prefab) prefab_dialog: cc.Prefab = null;                                                       // 通用对话框 预制件

    @property(cc.Sprite) imgBgRoot: cc.Sprite = null;
    @property(cc.Button) btn_close: cc.Button = null;
    @property(cc.Button) btn_clean: cc.Button = null;
    @property(cc.Button) btn_ensure: cc.Button = null;
    @property(cc.Toggle) opt_setting_normal: cc.Toggle = null;
    @property(cc.Toggle) opt_setting_advance: cc.Toggle = null;

    private _maxSelectedCoinOptNode: number = 5;											                    // 最大勾选"投注金币选项"个数
    private _vCoinOptNode: HumanboyAdvancedSettingCoinOptNode[] = [];					                        // "投注金币选项"数组
    private _vSelectedCoinOptNode: HumanboyAdvancedSettingCoinOptNode[] = [];			                        // "投注金币选项"队列

    private _atlas_cb_language: cc.SpriteAtlas = null;                                                          // 牛仔语言图集
    private _atlas_hb_language: cc.SpriteAtlas = null;                                                          // 百人语言图集
    private _clickbyprogram:boolean = false;
    show(): void {
        this.node.active = true;
        this._updateView();
    }

    hide(): void {
        this.node.active = false;
    }

    protected onLoad(): void {
        this._initAtlasList();
        this._initLanguageUI();
        this._initUI();
    }

    protected start(): void {
    }

    private _initAtlasList(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
    }

    private _initLanguageUI(): void {
        let img_title: cc.Sprite = this.imgBgRoot.node.getChildByName("img_title").getComponent(cc.Sprite);
        img_title.spriteFrame = this._atlas_hb_language.getSpriteFrame("humanboy_advanced_setting_txt_title");

        this.btn_clean.getComponent(cc.Sprite).spriteFrame = this._atlas_hb_language.getSpriteFrame("humanboy_advanced_setting_txt_clean");
        let btn_clean_sprite: any = this.btn_clean.getComponent(cc.Sprite);
        if (!cv.config.isSiyuType()) {
            btn_clean_sprite.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
            btn_clean_sprite.dstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
        }

        let frame_tips_ok: cc.SpriteFrame = this._atlas_cb_language.getSpriteFrame("tips_ok");
        let frame_tips_ok_disable: cc.SpriteFrame = this._atlas_cb_language.getSpriteFrame("tips_ok_disable");
        this.btn_ensure.getComponent(cc.Sprite).spriteFrame = frame_tips_ok;
        this.btn_ensure.normalSprite = frame_tips_ok;
        this.btn_ensure.pressedSprite = frame_tips_ok;
        this.btn_ensure.hoverSprite = frame_tips_ok;
        this.btn_ensure.disabledSprite = frame_tips_ok_disable;
    }

    private _initUI(): void {
        this.btn_close.node.on("click", (sender: cc.Node) => { 
            cv.AudioMgr.playButtonSound('close');
            this.hide(); 
        });
        this.btn_clean.node.on("click", (sender: cc.Node) => { 
            cv.AudioMgr.playButtonSound('button_click');
            this._clearAllSelected(); 
        });
        this.btn_ensure.node.on("click", this._onClickBtnEnsure, this);

        // 默认勾选普通续投
        this.opt_setting_normal.check();

        // 初始化单选按钮组
        let panel_opts: cc.Node = this.imgBgRoot.node.getChildByName("panel_opts");
        let count: number = panel_opts.childrenCount;
        for (let i = 0; i < count; ++i) {
            let coinOptNode: HumanboyAdvancedSettingCoinOptNode = new HumanboyAdvancedSettingCoinOptNode();
            this._vCoinOptNode.push(coinOptNode);

            coinOptNode.index = i;
            coinOptNode.nodeRoot = panel_opts.getChildByName(cv.StringTools.formatC("node_%d", i));
            coinOptNode.coin = coinOptNode.nodeRoot.getChildByName("coin").getComponent(HumanboyBetCoin);
            coinOptNode.checkBox = coinOptNode.nodeRoot.getChildByName("checkBox").getComponent(cc.Toggle);
            coinOptNode.checkBox.uncheck();
            coinOptNode.checkBox.node.on("toggle", (toggle: cc.Toggle) => {
                if(!this._clickbyprogram){
                    cv.AudioMgr.playButtonSound('button_click');
                }
                this._clickbyprogram = false;
                this._makeSelectedByIndex(coinOptNode.index);
            });
        }
        this.opt_setting_normal.node.on("toggle", (toggle: cc.Toggle) => {
            cv.AudioMgr.playButtonSound('button_click');
        });
        this.opt_setting_advance.node.on("toggle", (toggle: cc.Toggle) => {
            cv.AudioMgr.playButtonSound('button_click');
        });
    }

    private _updateView(): void {
        this._updateStaticText();
        this._updateAllOptBtn();
    }

    private _onClickBtnEnsure(sender: cc.Node): void {
        cv.AudioMgr.playButtonSound('button_click');
        let iUsedAutoBetCount: number = 0;
        let iSelectAutoBetCount: number = 0;
        let gameID: number = cv.roomManager.getCurrentGameID();
        switch (gameID) {
            case cv.Enum.GameId.CowBoy: {
                iUsedAutoBetCount = cowboyDataMgr.getCowboyRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = cowboyDataMgr.getCowboyRoom().iSelectAutoBetCount;
            } break;

            case cv.Enum.GameId.HumanBoy: {
                iUsedAutoBetCount = humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount;
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                iUsedAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount;
            } break;

            case cv.Enum.GameId.PokerMaster: {
                iUsedAutoBetCount = pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount;
            } break;

            default:
                break;
        }

        let reqSetGameOption: () => void = (): void => {
            let vAmountLevel: number[] = [];
            for (let i = 0; i < this._vSelectedCoinOptNode.length; ++i) {
                vAmountLevel.push(cv.StringTools.serverGoldByClient(this._vSelectedCoinOptNode[i].llAmountLevel));
            }

            switch (gameID) {
                case cv.Enum.GameId.CowBoy: {
                    let autoLevel: cowboy_proto.AutoBetLevel = this.opt_setting_normal.isChecked ? cowboy_proto.AutoBetLevel.Level_Normal : cowboy_proto.AutoBetLevel.Level_Advance;
                    cv.cowboyNet.reqSetGameOption(vAmountLevel, autoLevel);
                } break;

                case cv.Enum.GameId.HumanBoy: {
                    let autoLevel: humanboy_proto.AutoBetLevel = this.opt_setting_normal.isChecked ? humanboy_proto.AutoBetLevel.Level_Normal : humanboy_proto.AutoBetLevel.Level_Advance;
                    cv.humanboyNet.reqSetGameOption(vAmountLevel, autoLevel);
                } break;

                case cv.Enum.GameId.VideoCowboy: {
                    let autoLevel: videocowboy_proto.AutoBetLevel = this.opt_setting_normal.isChecked ? videocowboy_proto.AutoBetLevel.Level_Normal : videocowboy_proto.AutoBetLevel.Level_Advance;
                    cv.videoCowboyNet.reqSetGameOption(vAmountLevel, autoLevel);
                } break;

                case cv.Enum.GameId.PokerMaster: {
                    let autoLevel: pokermaster_proto.AutoBetLevel = this.opt_setting_normal.isChecked ? pokermaster_proto.AutoBetLevel.Level_Normal : pokermaster_proto.AutoBetLevel.Level_Advance;
                    cv.pokerMasterNet.reqSetGameOption(vAmountLevel, autoLevel);
                } break;

                default:
                    break;
            }

            this.hide();
        };

        // 若是从高级续投状态切换到普通续投, 则应该弹框提示
        if (this.opt_setting_normal.isChecked && iSelectAutoBetCount > 0) {
            let dialogNode: HumanboyDialog = cc.instantiate(this.prefab_dialog).getComponent(HumanboyDialog);
            this.node.addChild(dialogNode.node);

            dialogNode.show(cv.StringTools.formatC(cv.config.getStringData("Cowboy_auto_bet_switch_tips"), iUsedAutoBetCount, iSelectAutoBetCount)
                , cv.config.getStringData("CowBoy_btn_desc_switch_auto_bet")
                , cv.config.getStringData("CowBoy_btn_desc_resume_auto_bet")
                , (dialog: HumanboyDialog): void => {
                    reqSetGameOption();
                    switch (cv.roomManager.getCurrentGameID()) {
                        case cv.Enum.GameId.CowBoy: {
                            cv.cowboyNet.ReqCancelAdvanceAutoBet();
                        } break;

                        case cv.Enum.GameId.HumanBoy: {
                            cv.humanboyNet.reqCancelAdvanceAutoBet();
                        } break;

                        case cv.Enum.GameId.VideoCowboy: {
                            cv.videoCowboyNet.ReqCancelAdvanceAutoBet();
                        } break;

                        case cv.Enum.GameId.PokerMaster: {
                            cv.pokerMasterNet.reqCancelAdvanceAutoBet();
                        } break;

                        default:
                            break;
                    }
                    this.hide();
                }
                , (dialog: HumanboyDialog): void => {
                    this.hide();
                });
        }
        else {
            reqSetGameOption();
        }
    }

    private _updateStaticText(): void {
        let txt_desc_word: cc.Label = this.imgBgRoot.node.getChildByName("txt_desc_word").getComponent(cc.Label);
        txt_desc_word.string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_advancedSetting_desc"), this._maxSelectedCoinOptNode);

        let txt_auto_word: cc.Label = this.imgBgRoot.node.getChildByName("txt_auto_word").getComponent(cc.Label);
        txt_auto_word.string = cv.config.getStringData("Humanboy_advancedSetting_auto");

        let txt_opt_normal_word: cc.Label = this.imgBgRoot.node.getChildByName("txt_opt_normal_word").getComponent(cc.Label);
        txt_opt_normal_word.string = cv.config.getStringData("Humanboy_advancedSetting_opt_normal");

        let txt_opt_advance_word: cc.Label = this.imgBgRoot.node.getChildByName("txt_opt_advance_word").getComponent(cc.Label);
        txt_opt_advance_word.string = cv.config.getStringData("Humanboy_advancedSetting_opt_advance");
        let txt_opt_advance_word_size = cv.resMgr.getLabelStringSize(txt_opt_advance_word);

        let txt_opt_advance_extra_word: cc.Label = this.imgBgRoot.node.getChildByName("txt_opt_advance_extra_word").getComponent(cc.Label);
        txt_opt_advance_extra_word.string = cv.config.getStringData("Humanboy_advancedSetting_opt_advance_extra");
        txt_opt_advance_extra_word.node.setPosition(txt_opt_advance_word.node.position.x + txt_opt_advance_word_size.width + 10, txt_opt_advance_extra_word.node.position.y);
    }

    private _checkCoinOptsStatus(): void {
        if (this._vSelectedCoinOptNode.length > this._maxSelectedCoinOptNode) {
            let tSelectedCoinOptNode: HumanboyAdvancedSettingCoinOptNode = this._vSelectedCoinOptNode[0];
            this._vSelectedCoinOptNode.splice(0, 1);
            tSelectedCoinOptNode.checkBox.uncheck();
        }

        let enabled: boolean = this._vSelectedCoinOptNode.length === this._maxSelectedCoinOptNode;
        this.btn_ensure.interactable = enabled;
    }

    private _updateAllOptBtn(): void {
        // 续投等级 1 高级  0 普通
        this.opt_setting_normal.uncheck();
        this.opt_setting_advance.uncheck();

        // 重置
        this._resetAllOptBtn();

        let bNormalCkeck: boolean = true;
        let vTotalOption: number[] = [];
        let vSelectOption: number[] = [];
        let llCoinUICritical: number = 0;

        switch (cv.roomManager.getCurrentGameID()) {
            case cv.Enum.GameId.CowBoy: {
                bNormalCkeck = cowboyDataMgr.getCowboyRoom().eAutoLevel === cowboy_proto.AutoBetLevel.Level_Normal;
                vTotalOption = cowboyDataMgr.getCowboyRoom().pkRoomParam.totalAmountLevel;
                vSelectOption = cowboyDataMgr.getCowboyRoom().vBetCoinOption;
                llCoinUICritical = cowboyDataMgr.getCowboyRoom().llCoinUICritical;
            } break;

            case cv.Enum.GameId.HumanBoy: {
                bNormalCkeck = humanboyDataMgr.getHumanboyRoom().eAutoLevel === humanboy_proto.AutoBetLevel.Level_Normal;
                vTotalOption = humanboyDataMgr.getHumanboyRoom().tCurRoom.totalAmountLevel;
                vSelectOption = humanboyDataMgr.getHumanboyRoom().vBetCoinOption;
                llCoinUICritical = humanboyDataMgr.getHumanboyRoom().llCoinUICritical;
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                bNormalCkeck = VideoCowboyManager.getVideoCowboyRoom().eAutoLevel === videocowboy_proto.AutoBetLevel.Level_Normal;
                vTotalOption = VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.totalAmountLevel;
                vSelectOption = VideoCowboyManager.getVideoCowboyRoom().vBetCoinOption;
                llCoinUICritical = VideoCowboyManager.getVideoCowboyRoom().llCoinUICritical;
            } break;

            case cv.Enum.GameId.PokerMaster: {
                bNormalCkeck = pokerMasterDataMgr.getPokerMasterRoom().eAutoLevel === pokermaster_proto.AutoBetLevel.Level_Normal;
                vTotalOption = pokerMasterDataMgr.getPokerMasterRoom().tCurRoom.totalAmountLevel;
                vSelectOption = pokerMasterDataMgr.getPokerMasterRoom().vBetCoinOption;
                llCoinUICritical = pokerMasterDataMgr.getPokerMasterRoom().llCoinUICritical;
            } break;

            default:
                break;
        }

        this._updateOptBtnStatus(bNormalCkeck, vTotalOption, vSelectOption, llCoinUICritical);
    }

    private _resetAllOptBtn(): void {
        for (let i = 0; i < this._vCoinOptNode.length; ++i) {
            this._vCoinOptNode[i].llAmountLevel = 0;
            this._vCoinOptNode[i].coin.setShape(HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_COIN);
            this._vCoinOptNode[i].coin.setTxtNum(cv.StringTools.numberToShowNumber(this._vCoinOptNode[i].llAmountLevel));
            this._vCoinOptNode[i].coin.txtBetNode.setPosition(cc.Vec2.ZERO);
            this._clickbyprogram = true;
            this._vCoinOptNode[i].checkBox.uncheck();
        }

        cv.StringTools.clearArray(this._vSelectedCoinOptNode);
        this._checkCoinOptsStatus();
    }

    private _updateOptBtnStatus(bNormalCkeck: boolean, vTotalOption: number[], vSelectOption: number[], llCoinUICritical: number): void {
        if (bNormalCkeck) this.opt_setting_normal.check();
        else this.opt_setting_advance.check();

        let iMinCount: number = Math.min(this._vCoinOptNode.length, vTotalOption.length);
        for (let i = 0; i < iMinCount; ++i) {
            let llAmountLevel: number = cv.StringTools.clientGoldByServer(vTotalOption[i]);
            let shapeType: number = llAmountLevel < llCoinUICritical ? HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_COIN : HumanboyBetCoin.eHumanboyBetCoinShape.SHAPE_BLOCK;

            this._vCoinOptNode[i].llAmountLevel = llAmountLevel;
            this._vCoinOptNode[i].coin.setShape(shapeType);
            this._vCoinOptNode[i].coin.setTxtNum(cv.StringTools.numberToShowNumber(this._vCoinOptNode[i].llAmountLevel));
            this._vCoinOptNode[i].coin.txtBetNode.setPosition(cc.Vec2.ZERO);
        }

        iMinCount = Math.min(this._vCoinOptNode.length, vSelectOption.length);
        for (let i = 0; i < iMinCount; ++i) {
            let llAmountLevel: number = cv.StringTools.clientGoldByServer(vSelectOption[i]);
            for (let j = 0; j < this._vCoinOptNode.length; ++j) {

                // 这里加了一个判断条件, 为了兼容多个一样数值的选项 
                if (this._vCoinOptNode[j].llAmountLevel === llAmountLevel && !this._vCoinOptNode[j].checkBox.isChecked) {
                    this._clickbyprogram = true;
                    this._vCoinOptNode[j].checkBox.check();
                    break;
                }
            }
        }
    }

    private _makeSelectedByIndex(index: number): void {
        if (index < 0 || index >= this._vCoinOptNode.length) return;

        let bDuplicate: boolean = false;
        let nDuplicateIndex: number = 0;
        let coinOptNode: HumanboyAdvancedSettingCoinOptNode = this._vCoinOptNode[index];
        for (let i = 0; i < this._vSelectedCoinOptNode.length; ++i) {
            if (coinOptNode.index === this._vSelectedCoinOptNode[i].index) {
                bDuplicate = true;
                nDuplicateIndex = i;
                break;
            }
        }

        let bSelected: boolean = coinOptNode.checkBox.isChecked;
        if (bSelected) {
            if (!bDuplicate) {
                this._vSelectedCoinOptNode.push(coinOptNode);
            }
        }
        else {
            if (bDuplicate) {
                this._vSelectedCoinOptNode.splice(nDuplicateIndex, 1);
            }
        }

        this._checkCoinOptsStatus();
    }

    private _clearAllSelected(): void {
        for (let i = 0; i < this._vCoinOptNode.length; ++i) {
            this._vCoinOptNode[i].checkBox.uncheck();
        }

        cv.StringTools.clearArray(this._vSelectedCoinOptNode);
        this._checkCoinOptsStatus();
    }
}
