import cv from "../../lobby/cv";
import cb from "../cowboy/cb";

import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";
import { RankData } from "../../../data/userData";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import HumanboyDataMgr from "./HumanboyDataMgr";
import VideoCowboyManager from "../videoCowboy/VideoCowboyManager";
import PokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HumanboyHonorItem extends cc.Component {

    @property(cc.Node) head_img: cc.Node = null;
    @property(cc.Sprite) rank_img: cc.Sprite = null;
    @property(cc.Sprite) gold_img: cc.Sprite = null;
    @property(cc.Label) name_text = null;
    @property(cc.Label) money_text = null;
    @property(cc.Label) profit_text = null;
    @property(cc.Label) rank_text = null;
    @property(cc.Label) des_text = null;
    @property(cc.Label) day_text = null;

    @property(cc.SpriteAtlas) chart_PLIST: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) game_dznz_PLIST: cc.SpriteAtlas = null;

    msg: RankData = new RankData();

    updateSVReuseData(index: number, dataArray: Array<any>, view: ScrollViewReuse): void {
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data: RankData = dataArray[index];
        if (!(data instanceof RankData)) return;

        this.msg = data;

        if (index == 0) {
            this.rank_img.node.active = true;
            this.rank_text.node.active = false;
            cv.resMgr.loadSpriteTextureByPlist(this.chart_PLIST, this.rank_img, "chart_honor_1");
        }
        else if (index == 1) {
            this.rank_img.node.active = true;
            this.rank_text.node.active = false;
            cv.resMgr.loadSpriteTextureByPlist(this.chart_PLIST, this.rank_img, "chart_honor_2");
        }
        else if (index == 2) {
            this.rank_img.node.active = true;
            this.rank_text.node.active = false;
            cv.resMgr.loadSpriteTextureByPlist(this.chart_PLIST, this.rank_img, "chart_honor_3");
        }
        else {
            this.rank_img.node.active = false;
            this.rank_text.node.active = true;
            this.rank_text.string = cv.StringTools.numberToString(index + 1);
        }

        this.name_text.string = data.name;
        this.money_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.coin));

        let xx = parseInt(view.name);
        this.des_text.node.opacity = 153;
        this.des_text.node.color = cc.Color.WHITE;

        if (xx == 1 || xx == 3) {
            this.des_text.string = cv.config.getStringData("Humanboy_list_frequency_time");
            this.profit_text.string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_list_frequency"), data.frequency);
        }
        else {
            this.des_text.string = cv.config.getStringData("Humanboy_list_profit");
            this.profit_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.profit));
        }

        this.day_text.string = cv.StringTools.formatTime(data.updateAt, cv.Enum.eTimeType.Year_Month_Day);

        this.day_text.node.opacity = 153;
        this.day_text.node.color = cc.Color.WHITE;

        this.head_img.active = true;
        this.head_img.destroyAllChildren();
        this.head_img.removeAllChildren(true);

        let headUrl = this.msg.head;

        let uid: number = 0;
        let head: string = "";
        let plat: number = 0;   // 平台字段, 目前就百人是共池字段有值(默认值0)
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
            plat = data.plat;
        }

        CircleSprite.setCircleSprite(this.head_img, headUrl, plat, false, Head_Mode.IRREGULAR);
        this.head_img.active = false;
    }
}