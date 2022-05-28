import VideoCowboyManager from "./VideoCowboyManager";
import CowboyCard from "../cowboy/CowboyCard";
import { HashMap } from "../../../common/tools/HashMap";
import cv from "../../lobby/cv";
import { CardItem } from "../dzPoker/data/RoomData";
import { CardNum, CardSuit } from "../../../common/tools/Enum";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class VideoCowboyOpenCard extends cc.Component {
    _panel: cc.Node = null;
    _card: CowboyCard[] = [];//9
    _isNormal: boolean = false;//场景还原为false

    _redCardType: cc.Node = null;
    _blueCardType: cc.Node = null;
    _redCardTypeBg: cc.Node = null;
    _blueCardTypeBg: cc.Node = null;
    _mapLevelCardTypeImage: HashMap<number, string> = new HashMap();

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        this._panel = this.node.getChildByName("Panel_1");
        this._panel.active = (false);

        for (let i = 0; i < 9; i++) {
            let card_bg = (this._panel.getChildByName(cv.StringTools.formatC("card_%d", i)));
            let card = CowboyCard.create();
            card.ResetFromNode(card_bg);
            card.node.setPosition(card_bg.x, card_bg.y - 1);
            card.node.active = (false);
            this._card.push(card);
            card_bg.active = (true);
        }

        this._redCardType = (this._panel.getChildByName("card_type_0"));
        this._blueCardType = (this._panel.getChildByName("card_type_1"));
        this._redCardTypeBg = (this._panel.getChildByName("card_type_bg_0"));
        this._blueCardTypeBg = (this._panel.getChildByName("card_type_bg_1"));
        this._redCardTypeBg.zIndex = (1);
        this._blueCardTypeBg.zIndex = (1);
        this._redCardType.zIndex = (2);
        this._blueCardType.zIndex = (2);

        this._mapLevelCardTypeImage.add(1, "gaopai");
        this._mapLevelCardTypeImage.add(2, "yidui");
        this._mapLevelCardTypeImage.add(3, "liangdui");
        this._mapLevelCardTypeImage.add(4, "santiao");
        this._mapLevelCardTypeImage.add(5, "shunzi");
        this._mapLevelCardTypeImage.add(6, "tonghua");
        this._mapLevelCardTypeImage.add(7, "hulu");
        this._mapLevelCardTypeImage.add(8, "jingang");
        this._mapLevelCardTypeImage.add(9, "tonghuashun");
        this._mapLevelCardTypeImage.add(10, "huangtong");

        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this), this.node);

        this.onChangeLanguage();
    }

    start() {
        if (cv.config.IS_IPHONEX_SCREEN) {
            let panelSize = this._panel.getContentSize();
            this._panel.setContentSize(new cc.Size(panelSize.width + cv.viewAdaptive.IPHONEX_OFFSETY, panelSize.height));
            this._panel.getChildByName("background").setContentSize(new cc.Size(panelSize.width + cv.viewAdaptive.IPHONEX_OFFSETY, panelSize.height));
            // let node = this._panel.children;
            // let len = this._panel.childrenCount;
            // for (let i = 0; i < len; i++) {
            //     let temp = node[i];
            //     temp.setPosition(temp.x + cv.viewAdaptive.IPHONEX_OFFSETY, temp.y);
            // }
        }
    }

    reset(): void {
        this._panel.stopAllActions();
        if (!this._isNormal) {

            for (let i = 0; i < 9; i++) {
                this._card[i].node.active = (false);
                this._card[i].showCard(false);
                this._card[i].Gray(false);
            }
            this._panel.active = (false);
            this._redCardType.active = (false);
            this._blueCardType.active = (false);
            this._redCardTypeBg.active = (false);
            this._blueCardTypeBg.active = (false);
            return;
        }

        this._isNormal = false;
        console.error("-------------------------------------reset--------------------------------------------------->");
        this._panel.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(0, this._panel.y)), cc.callFunc(function () {
            for (let i = 0; i < 9; i++) {
                this._card[i].node.active = (false);
                this._card[i].showCard(false);
                this._card[i].Gray(false);
            }
            this._panel.active = (false);
            this._redCardType.active = (false);
            this._blueCardType.active = (false);
            this._redCardTypeBg.active = (false);
            this._blueCardTypeBg.active = (false);
        }.bind(this))));
    }

    setMode(isNormal: boolean): void {
        this._isNormal = isNormal;
    }

    showCardNotify(isNormal: boolean): void {
        this.setMode(isNormal);
        let data = VideoCowboyManager.getVideoCowboyRoom().openCardData;
        data.forEach((index: number, item: CardItem, i: number) => {
            if (!this._card[index - 1].node.active) {
                this._card[index - 1].SetContent(item.number, item.suit);
                this._card[index - 1].showCard(true);
            }
        });

        if (!this._isNormal) {
            this._panel.setPosition(this._panel.getContentSize().width, this._panel.y);
            this._panel.active = (true);
        }
        else {
            this._isNormal = false;
        }

        if (!this._panel.active) {
            this._panel.setPosition(0, this._panel.y);
            console.error("-------------------------------------showCardNotify---------------------------------------------------> ", this._panel.getContentSize().width, "--->", this._panel.y);
            this._panel.active = (true);
            this._panel.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(this._panel.getContentSize().width, this._panel.y)), cc.callFunc(function () {
                for (let i = 0; i < 9; i++) {
                    if (!this._card[i].node.active && !this._card[i].getCardBack().node.active) {
                        this._card[i].node.active = (true);
                    }
                }
            }.bind(this))));
        }
        else {
            for (let i = 0; i < 9; i++) {
                if (!this._card[i].node.active && !this._card[i].getCardBack().node.active) {
                    this._card[i].node.active = (true);
                }
            }
        }
    }

    updateWinCards(): void {
        // 先全部置灰

        for (let i = 0; i < 9; i++) {
            this._card[i].Gray(true);
        }

        // 高亮赢的5张牌
        let winCardNum = VideoCowboyManager.getVideoCowboyRoom().winCards.length;
        for (let i = 0; i < winCardNum; i++) {
            let winCard = VideoCowboyManager.getVideoCowboyRoom().winCards[i];
            for (let j = 0; j < 9; j++) {
                if (this._card[j].GetNumber() == winCard.number && this._card[j].GetSuit() == winCard.suit) {
                    this._card[j].Gray(false);
                    break;
                }
            }
        }
    }

    // 直接更新牌型
    updateCardType(): void {
        this._redCardType.active = (true);
        this._blueCardType.active = (true);
        this._redCardTypeBg.active = (true);
        this._blueCardTypeBg.active = (true);
        let redCardTypeImage = this._mapLevelCardTypeImage.get(VideoCowboyManager.getVideoCowboyRoom().redLevel);
        let blueCardTypeImage = this._mapLevelCardTypeImage.get(VideoCowboyManager.getVideoCowboyRoom().blueLevel);

        // 0 平 1 牛仔胜 -1 小牛胜
        if (VideoCowboyManager.getVideoCowboyRoom().result == 0) {
            this.setSpriteFrame(this._redCardType, "language_PLIST", redCardTypeImage);
            this.setSpriteFrame(this._blueCardType, "language_PLIST", blueCardTypeImage);
            this.setSpriteFrame(this._redCardTypeBg, "game_dznz_PLIST", "win_cardtype_bg");
            this.setSpriteFrame(this._blueCardTypeBg, "game_dznz_PLIST", "win_cardtype_bg");
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == 1) {
            this.setSpriteFrame(this._redCardType, "language_PLIST", redCardTypeImage);
            this.setSpriteFrame(this._blueCardType, "language_PLIST", blueCardTypeImage + "_gray");
            this.setSpriteFrame(this._redCardTypeBg, "game_dznz_PLIST", "win_cardtype_bg");
            this.setSpriteFrame(this._blueCardTypeBg, "game_dznz_PLIST", "lose_cardtype_bg");
        }
        else if (VideoCowboyManager.getVideoCowboyRoom().result == -1) {
            this.setSpriteFrame(this._redCardType, "language_PLIST", redCardTypeImage + "_gray");
            this.setSpriteFrame(this._blueCardType, "language_PLIST", blueCardTypeImage);
            this.setSpriteFrame(this._redCardTypeBg, "game_dznz_PLIST", "lose_cardtype_bg");
            this.setSpriteFrame(this._blueCardTypeBg, "game_dznz_PLIST", "win_cardtype_bg");
        }
    }

    setSpriteFrame(node: cc.Node, plistName: string, imgName: string) {
        VideoCowboyManager.loadSpriteTextureByPlist(VideoCowboyManager.getPlistAtlas(plistName), node.getComponent(cc.Sprite), imgName);
    }

    onChangeLanguage(): void {
        for (let i = 0; i < 3; i++) {
            let txt = (this._panel.getChildByName(cv.StringTools.formatC("Text_%d", i)));
            txt.getComponent(cc.Label).string = (cv.config.getStringData(cv.StringTools.formatC("VideoCowboy_openCard_Text_%d", i)));
        }
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
}