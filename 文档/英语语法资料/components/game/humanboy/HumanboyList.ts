import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import cv from "../../lobby/cv";
import cb from "../cowboy/cb";
import HumanboyDataMgr from "./HumanboyDataMgr";
import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";
import VideoCowboyManager from "../videoCowboy/VideoCowboyManager";
import PokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export class HumanboyList extends cc.Component {
    //1
    @property(cc.Label)
    online_desc: cc.Label = null;
    @property(cc.Label)
    online_num: cc.Label = null;
    @property(cc.Prefab)
    item_prefab: cc.Prefab = null;

    //2
    @property(cc.Label)
    title_txt: cc.Label = null;
    @property(cc.Prefab)
    item_prefab2: cc.Prefab = null;
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;
    @property(cc.ScrollView)
    scrollView2: cc.ScrollView = null;
    @property(cc.Node)
    chartbg: cc.Node = null;

    @property(cc.Sprite)
    arrow_img: cc.Sprite = null;
    @property(cc.Sprite)
    title_bg: cc.Sprite = null;
    @property(cc.Sprite)
    img2: cc.Sprite = null;

    @property(cc.Node)
    panel1: cc.Node = null;
    @property(cc.Node)
    panel2: cc.Node = null;
    @property(cc.Node)
    panel3: cc.Node = null;
    @property(cc.Node)
    layout0: cc.Node = null;
    @property(cc.Node)
    layout1: cc.Node = null;

    @property(cc.Button)
    arrow_btn: cc.Button = null;
    @property(cc.Button)
    page1_btn: cc.Button = null;
    @property(cc.Button)
    page2_btn: cc.Button = null;
    @property(cc.Button)
    close_btn: cc.Button = null;
    @property(cc.Node)
    head_img: cc.Node = null;

    curIdx: number = 0;
    curTag: number = 1;
    _name_list: Array<cc.Node> = [];
    _gou_list: Array<cc.Node> = [];
    _btn_list: Array<cc.Node> = [];
    once: boolean = true;

    @property(cc.SpriteAtlas) game_dznz_PLIST: cc.SpriteAtlas = null;

    private _atlas_hb_language: cc.SpriteAtlas = null;                                                                          // 百人语言图集

    protected onLoad(): void {

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.CowBoy) {
            let Image_2 = cc.find("panel1/Image_2", this.layout1);
            Image_2.setContentSize(Image_2.width, 348);
            let panel2 = cc.find("panel2", this.layout1);
            panel2.setContentSize(panel2.width, 346);
            let cell1 = cc.find("cell1", panel2);
            let cell2 = cc.find("cell2", panel2);
            let cell3 = cc.find("cell3", panel2);
            let cell4 = cc.find("cell4", panel2);
            let cell5 = cc.find("cell5", panel2);
            cell1.active = false;
            cell2.setPosition(cell2.x, -186);
            cell3.active = false;
            cell4.setPosition(cell4.x, -266);
            cell5.setPosition(cell5.x, -346);
        }

        this._atlas_hb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/language"));

        this.panel2.active = false;
        this.panel1.zIndex = 2;
        this.panel2.zIndex = 3;
        this.panel3.zIndex = 1;

        cc.find("online_txt", this.layout0).getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_online");

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cc.find("onlinenum_txt", this.layout0).setPosition(cc.find("online_txt", this.layout0).getPosition().x + cc.find("online_txt", this.layout0).getContentSize().width + 7, cc.find("online_txt", this.layout0).getPosition().y);
        }

        let title_change = cc.find("Image_1", this.panel1).getChildByName("title_change");
        title_change.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_change_rank");

        for (let i = 0; i < 6; i++) {
            let cell = cc.find("cell" + i, this.panel2);
            let name = cc.find("name_txt", cell);
            name.color = cc.color(255, 255, 255);

            let gou = cc.find("gou_img", cell);
            gou.active = false;

            let btn = cc.find("Button_" + i, cell);
            btn.name = i.toString();
            btn.on('click', (): void => {
                cv.AudioMgr.playButtonSound('tab');
                this.displayCell(parseInt(btn.name));

                if (this.arrow_img.node.scaleY == -1) {
                    this.arrow_img.node.scaleY = 1;
                    this.img2.node.active = false;
                    this.panel2.active = false;
                }
                else {
                    this.arrow_img.node.scaleY = -1;
                    this.img2.node.active = true;
                    this.panel2.active = true;
                }
            })

            this._name_list.push(name);
            this._gou_list.push(gou);
            this._btn_list.push(btn);
        }

        this.page1_btn.node.on('click', (): void => {
            cv.AudioMgr.playButtonSound('tab');
            this.page1_btn.enabled = false;
            this.page2_btn.enabled = true;

            this.layout0.active = true;
            this.layout1.active = false;
            this.panel1.active = false;
            this.panel2.active = false;
            this.title_txt.node.active = false;

            cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg, "humanboy_title_player");
        });

        this.page2_btn.node.on('click', (): void => {
            cv.AudioMgr.playButtonSound('tab');
            this.page1_btn.enabled = true;
            this.page2_btn.enabled = false;

            this.layout0.active = false;
            this.layout1.active = true;
            this.panel1.active = true;
            this.img2.node.active = false;
            this.title_txt.node.active = true;
            this.arrow_img.node.scaleY = 1;

            cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg, "humanboy_title_honor");

            let sv: ScrollViewReuse = this.scrollView2.getComponent(ScrollViewReuse);
            if (this.once) {
                this.once = false;
                sv.bindPrefab(this.item_prefab2, "HumanboyHonorItem", []);
                sv.generateItemPool();
                sv.bindScrollEventTarget(this);
            }

            sv.name = this.curIdx.toString();
            sv.reloadView(cv.dataHandler.getUserData().m_rankInfos);
        })

        this.arrow_btn.node.on('click', (): void => {
            cv.AudioMgr.playButtonSound('tab');
            if (this.arrow_img.node.scaleY == -1) {
                this.arrow_img.node.scaleY = 1;
                this.img2.node.active = false;
                this.panel2.active = false;
            }
            else {
                this.arrow_img.node.scaleY = -1;
                this.img2.node.active = true;
                this.panel2.active = true;
            }
        })

        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_language, this.title_bg, "humanboy_title_player");

        this.layout0.active = true;
        this.layout1.active = false;

        if (HumanboyDataMgr.getHumanboyRoom().gamePlayerList.length == 0) {
            this.online_desc.node.active = false;
            this.online_num.node.active = false;
        }
        else {
            this.online_desc.node.active = true;
            this.online_num.node.active = true;
        }

        this.close_btn.node.on('click', (): void => {
            cv.AudioMgr.playButtonSound('close');
            this.node.active = false;
        });

        this._name_list[0].getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_rank_0");
        this._name_list[1].getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_rank_1");
        this._name_list[2].getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_rank_2");
        this._name_list[3].getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_rank_3");
        this._name_list[4].getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_rank_4");
        this._name_list[5].getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_rank_5");

        this.addObserver();
    }

    addObserver() {
        cv.MessageCenter.register("update_rank_info", this.onDisplayRank.bind(this), this.node);
        cv.MessageCenter.register("finish_req_data", this.onFinishReqData.bind(this), this.node);
    }

    onDestroy(): void {
        cv.MessageCenter.unregister("update_rank_info", this.node);
        cv.MessageCenter.unregister("finish_req_data", this.node);
    }

    onDisplayRank() {
        if (this.layout1.active) {
            let sv: ScrollViewReuse = this.scrollView2.getComponent(ScrollViewReuse);
            sv.name = this.curIdx.toString();
            sv.reloadView(cv.dataHandler.getUserData().m_rankInfos);
        }

        if (cv.dataHandler.getUserData().m_rank.uid != 0) {
            this.showSelf();
        }
        else {
            let name_text = cc.find("name_text", this.panel3);
            name_text.getComponent(cc.Label).string = cv.dataHandler.getUserData().nick_name;
            let day_text = cc.find("day_text", this.panel3);
            let des_text = cc.find("des_text", this.panel3);
            let profit_text = cc.find("profit_text", this.panel3);
            //let head_img = cc.find("head_img", this.panel3);
            let myrank = cc.find("rank_num_text", this.panel3);
            myrank.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_myrank");
            //day_text.active = false;
            this.head_img.destroyAllChildren();
            this.head_img.removeAllChildren(true);
            let headUrl = "";

            let uid: number = 0;
            let head = "";
            switch (cv.roomManager.getCurrentGameID()) {
                case cv.Enum.GameId.CowBoy: {
                    uid = cb.getCowboyRoom().selfPlayer.uid;
                    head = cb.getCowboyRoom().selfPlayer.head;
                } break;

                case cv.Enum.GameId.HumanBoy: {
                    uid = HumanboyDataMgr.getHumanboyRoom().tSelfPlayer.uid;
                    head = HumanboyDataMgr.getHumanboyRoom().tSelfPlayer.head;
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

            headUrl = cv.dataHandler.getUserData().m_rank.head;
            if (cv.dataHandler.getUserData().m_rank.uid == uid) {
                this.head_img.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("game_dznz_PLIST", "self_head_default_2");
                headUrl = cv.dataHandler.getUserData().m_rank.head;
            }
            else {
                this.head_img.getComponent(cc.Sprite).spriteFrame = cb.getTextureByName("game_dznz_PLIST", "other_head_default");
            }

            if (this.curIdx == 1 || this.curIdx == 3) {
                des_text.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_frequency_time");
                profit_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_list_frequency"), cv.dataHandler.getUserData().m_rank.frequency);
            }
            else {
                des_text.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_profit");
                profit_text.getComponent(cc.Label).string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().m_rank.profit));
            }
        }
    }

    onFinishReqData() {
        if (this.curIdx >= 0 && this.curIdx < 6) {
            if (this.curTag == 1) {
                cv.worldNet.RequestRank(300001 + this.curIdx);
            }
            else if (this.curTag == 0) {
                cv.worldNet.RequestRank(100001 + this.curIdx);
            }
            else if (this.curTag == 2) {
                cv.worldNet.RequestRank(500001 + this.curIdx);
            }
            else if (this.curTag == 3) {
                cv.worldNet.RequestRank(700001 + this.curIdx);
            }
        }

    }

    showSelf() {
        let myrank = cc.find("rank_num_text", this.panel3);
        myrank.getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_myrank");

        if (cv.dataHandler.getUserData().m_rank.rank == -1) {
            cc.find("selfrank_text", this.panel3).getComponent(cc.Label).string = "1000+";
            cc.find("selfrank_text", this.panel3).getComponent(cc.Label).fontSize = 42;
        }
        else {
            let count = 1;
            let n = cv.dataHandler.getUserData().m_rank.rank;

            while (n >= 10) {
                count = count + 1;
                n = n / 10;
            }

            if (count == 1) {
                cc.find("selfrank_text", this.panel3).getComponent(cc.Label).fontSize = 56;
            }
            else if (count == 2) {
                cc.find("selfrank_text", this.panel3).getComponent(cc.Label).fontSize = 48;
            }
            else if (count == 3) {
                cc.find("selfrank_text", this.panel3).getComponent(cc.Label).fontSize = 42;
            }
            else if (count == 4) {
                cc.find("selfrank_text", this.panel3).getComponent(cc.Label).fontSize = 36;

            }

            cc.find("selfrank_text", this.panel3).getComponent(cc.Label).string = cv.dataHandler.getUserData().m_rank.rank.toString();
        }

        if (this.curIdx == 1 || this.curIdx == 3) {
            cc.find("des_text", this.panel3).getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_frequency_time");
            cc.find("profit_text", this.panel3).getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Humanboy_list_frequency"), cv.dataHandler.getUserData().m_rank.frequency);
        }
        else {
            cc.find("des_text", this.panel3).getComponent(cc.Label).string = cv.config.getStringData("Humanboy_list_profit");
            cc.find("profit_text", this.panel3).getComponent(cc.Label).string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().m_rank.profit));
        }

        cc.find("name_text", this.panel3).getComponent(cc.Label).string = cv.dataHandler.getUserData().m_rank.name;
        cc.find("money_text", this.panel3).getComponent(cc.Label).string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().m_rank.coin));

        let t = cv.dataHandler.getUserData().m_rank.updateAt;
        if (t == 0) {
            cc.find("day_text", this.panel3).active = false;
        }
        else {
            cc.find("day_text", this.panel3).active = true;
            cc.find("day_text", this.panel3).getComponent(cc.Label).string = cv.StringTools.formatTime(cv.dataHandler.getUserData().m_rank.updateAt, cv.Enum.eTimeType.Year_Month_Day);
        }

        this.head_img.active = true;
        this.head_img.destroyAllChildren();
        this.head_img.removeAllChildren(true);

        let headUrl = cv.dataHandler.getUserData().m_rank.head;
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

        if (cv.dataHandler.getUserData().m_rank.uid === uid) {
            headUrl = head;
        }
        else {
            plat = cv.dataHandler.getUserData().m_rank.plat;
        }

        CircleSprite.setCircleSprite(this.head_img, headUrl, plat, false, Head_Mode.IRREGULAR);
        this.head_img.active = false;
    }

    protected start() {
        cb.addPlist("game_dznz_PLIST", this.game_dznz_PLIST);
    }

    onBtnClose() {
        this.node.active = false;
    }

    displayCell(idx: number) {
        if (idx >= 0) {
            this.curIdx = idx;
        }
        else {
            var action = cc.flipY(false);
            this.arrow_img.node.runAction(action);
            cc.find("Image_2", this.panel1).active = false;
            this.panel2.active = false;
        }

        for (let i = 0; i < 6; i++) {
            let cell = cc.find("cell" + i, this.panel2);
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.CowBoy) {
                if (i == 1 || i == 3) continue;
            }
            cell.active = true;
            let name = cc.find("name_txt", cell);
            name.getComponent(cc.Label).node.color = cc.color(255, 255, 255);

            let gou = cc.find("gou_img", cell);
            gou.active = false;
        }

        this.title_txt.string = cv.config.getStringData(cv.StringTools.formatC("Humanboy_list_rank_%d", this.curIdx));
        this._name_list[this.curIdx].color = cc.color(237, 211, 119);
        this._gou_list[this.curIdx].active = true;

        this.onFinishReqData();
    }

    setCowboyData() {
        this.curTag = 0;

        if (cb.getCowboyRoom().gamePlayerList.length == 0) {
            this.online_desc.node.active = false;
            this.online_num.node.active = false;
        }
        else {
            this.online_desc.node.active = true;
            this.online_num.node.active = true;
            this.online_num.string = cv.StringTools.formatC("%d", cb.getCowboyRoom().dzplayerNum);
        }

        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.item_prefab, "cowboyItem", []);
        sv.generateItemPool();
        sv.bindScrollEventTarget(this);
        sv.reloadView(cb.getCowboyRoom().gamePlayerList);
    }

    setHumanboyData() {
        this.curTag = 1;

        if (HumanboyDataMgr.getHumanboyRoom().gamePlayerList.length == 0) {
            this.online_desc.node.active = false;
            this.online_num.node.active = false;
        }
        else {
            this.online_desc.node.active = true;
            this.online_num.node.active = true;
            this.online_num.string = cv.StringTools.formatC("%d", HumanboyDataMgr.getHumanboyRoom().brdzplayerNum);
        }

        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.item_prefab, "cowboyItem", []);
        sv.generateItemPool();

        sv.bindScrollEventTarget(this);
        sv.reloadView(HumanboyDataMgr.getHumanboyRoom().gamePlayerList);
    }

    setVideoCowboyData() {
        this.curTag = 2;

        if (VideoCowboyManager.getVideoCowboyRoom().gamePlayerList.length == 0) {
            this.online_desc.node.active = false;
            this.online_num.node.active = false;
        }
        else {
            this.online_desc.node.active = true;
            this.online_num.node.active = true;
            this.online_num.string = cv.StringTools.formatC("%d", VideoCowboyManager.getVideoCowboyRoom().dzplayerNum);
        }

        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.item_prefab, "cowboyItem", []);
        sv.generateItemPool();

        sv.bindScrollEventTarget(this);
        sv.reloadView(VideoCowboyManager.getVideoCowboyRoom().gamePlayerList);
    }

    setPokerMasterData() {
        this.curTag = 3;

        if (PokerMasterDataMgr.getPokerMasterRoom().gamePlayerList.length == 0) {
            this.online_desc.node.active = false;
            this.online_num.node.active = false;
        }
        else {
            this.online_desc.node.active = true;
            this.online_num.node.active = true;
            this.online_num.string = cv.StringTools.formatC("%d", PokerMasterDataMgr.getPokerMasterRoom().brdzplayerNum);
        }

        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.item_prefab, "cowboyItem", []);
        sv.generateItemPool();

        sv.bindScrollEventTarget(this);
        sv.reloadView(PokerMasterDataMgr.getPokerMasterRoom().gamePlayerList);
    }
}