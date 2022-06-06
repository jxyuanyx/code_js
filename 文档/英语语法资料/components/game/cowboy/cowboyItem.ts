import cv from "../../lobby/cv";
import cb from "../cowboy/cb";

import { CowboyPlayer } from "../cowboy/CowboyRoomData"
import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";
import HumanboyDataMgr from "../humanboy/HumanboyDataMgr";
import VideoCowboyManager from "../videoCowboy/VideoCowboyManager";
import PokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class cowboyItem extends cc.Component {

    @property(cc.Node) head_img: cc.Node = null;
    @property(cc.Sprite) rank_img: cc.Sprite = null;
    @property(cc.Label) num_text: cc.Label = null;
    @property(cc.Label) name_text: cc.Label = null;
    @property(cc.Label) money_text: cc.Label = null;
    @property(cc.Label) jushu_text: cc.Label = null;
    @property(cc.Label) bet_text: cc.Label = null;
    @property(cc.Label) win_text: cc.Label = null;

    @property(cc.Node) tz_img: cc.Node = null;
    @property(cc.Node) hs_img: cc.Node = null;

    private _atlas_hb_language: cc.SpriteAtlas = null;                                                                          // 百人语言图集


    @property(cc.SpriteAtlas) playerlist_PLIST: cc.SpriteAtlas = null;

    msg: CowboyPlayer = new CowboyPlayer();

    protected onLoad(): void {
        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));
    }

    protected start(): void {

    }

    updateSVReuseData(index: number, dataArray: Array<any>): void {
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data: CowboyPlayer = dataArray[index];
        //if (!(data instanceof CowboyPlayer)) return;
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.tz_img.getComponent(cc.Sprite), "humanboy_icon_bet");
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.hs_img.getComponent(cc.Sprite), "humanboy_icon_hs");

        this.msg = data;

        this.num_text.string = cv.StringTools.formatC(cv.config.getStringData("Cowboy_fuhao_no_text"), index);

        if (index > 8) {
            this.rank_img.node.active = true;
            cv.resMgr.loadSpriteTextureByPlist(this.playerlist_PLIST, this.rank_img, "fuwen9");
        }
        else {
            this.rank_img.node.active = true;
            if (index == 0) {
                cv.resMgr.loadSpriteTextureByPlist(this.playerlist_PLIST, this.rank_img, "playerlist_ssz");
                this.num_text.string = cv.config.getStringData("Cowboy_shensuanzi_text");
            }
            else {
                cv.resMgr.loadSpriteTextureByPlist(this.playerlist_PLIST, this.rank_img, "fuwen");
            }
        }

        this.jushu_text.node.opacity = 127;
        this.jushu_text.node.color = cc.color(255, 255, 255, 127);

        this.jushu_text.node.getComponent(cc.Label).string = cv.config.getStringData("Cowboy_last20_text");

        this.name_text.string = data.name;
        this.bet_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.totalBetAmount));
        this.win_text.string = cv.StringTools.numberToString(data.winCount);
        this.money_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this.msg.curCoin));
        this.head_img.active = true;
        this.head_img.destroyAllChildren();
        this.head_img.removeAllChildren(true);

        let headUrl = this.msg.head;
        let uid: number = 0;
        let head: string = "";
        let plat: number = 0; // 平台字段, 目前就百人是共池字段有值(默认值0)
        switch (cv.roomManager.getCurrentGameID()) {
            case cv.Enum.GameId.CowBoy: {
                uid = cb.getCowboyRoom().selfPlayer.uid;
                head = cb.getCowboyRoom().selfPlayer.head;
            } break;

            case cv.Enum.GameId.HumanBoy: {
                uid = HumanboyDataMgr.getHumanboyRoom().tSelfPlayer.uid;
                head = HumanboyDataMgr.getHumanboyRoom().tSelfPlayer.head;
                plat = HumanboyDataMgr.getHumanboyRoom().tSelfPlayer.plat;
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                uid = VideoCowboyManager.getVideoCowboyRoom().selfPlayer.uid;
                head = VideoCowboyManager.getVideoCowboyRoom().selfPlayer.head;
            } break;

            case cv.Enum.GameId.PokerMaster: {
                uid = PokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.uid;
                head = PokerMasterDataMgr.getPokerMasterRoom().tSelfPlayer.head;
            } break;

            default: break;
        }

        if (this.msg.uid === uid) {
            headUrl = head;
        }
        else {
            let tmpMSG: any = this.msg;
            if (tmpMSG.plat !== null && tmpMSG.plat !== "undefined") {
                plat = cv.Number(tmpMSG.plat);
            }
        }

        CircleSprite.setCircleSprite(this.head_img, headUrl, plat, false, Head_Mode.IRREGULAR);
        this.head_img.active = false;
    }
}