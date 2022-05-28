import cv from "../../lobby/cv";
import cb from "../cowboy/cb";
import humanboyDataMgr from "../humanboy/HumanboyDataMgr";
import VideoCowboyManager from "../videoCowboy/VideoCowboyManager";
import pokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr";

export enum RULE_URL {
    COWBOY_RULE = "user/article/getimage?img=",
    HUMANBOY_RULE = "user/article/getimage?img=",
    VIDEOCOWBOY_RULE = "user/article/getimage?img=",
}
/**
 * 退出面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class CowboyRule extends cc.Component {

    @property(cc.WebView) rule: cc.WebView = null;
    @property(cc.Button) close_btn: cc.Button = null;
    @property(cc.Sprite) title_img: cc.Sprite = null;
    @property(cc.Node) bg2_img: cc.Node = null;
    @property(cc.ScrollView) scr: cc.ScrollView = null;

    

    private _atlas_cb_language: cc.SpriteAtlas = null;                                                                          // 牛仔语言图集
    private _isAddSpr: boolean = false;

    protected onLoad(): void {
        this._atlas_cb_language = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/cowboyPlist/language"));
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_cb_language, this.title_img.getComponent(cc.Sprite), "cowboy_yxgz");

        cv.MessageCenter.register("HideWebview_ShowWindows", this.onClose.bind(this), this.node);

        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            this.rule.node.removeFromParent(true);
            this.rule.node.destroy();
        }
        else {
            this.scr.node.removeFromParent(true);
            this.scr.node.destroy();
        }

        
        if(!cv.config.isSiyuType()){  //非私语平台，设置通透。\
            let spMask:any = this.bg2_img.getComponent(cc.Sprite);
            spMask.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        }
    }

    protected start(): void {
        this.openView();
        this.close_btn.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('back_button');
            this.onClose() ;
        }, this);
    }

    onDestroy(): void {
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
    }

    openView(): void {
        this.node.active = true;
        if (cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
            this.rule.node.active = true;
        }
        else {
            if (this._isAddSpr == true) return;
        }

        let strURL: string = "";
        let gameID: number = cv.roomManager.getCurrentGameID();

        let rulePic: string = "";

        switch (gameID) {
            case cv.Enum.GameId.CowBoy: {
                rulePic = cb.getCowboyRoom().pkRoomParam.rulePic;
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                rulePic = VideoCowboyManager.getVideoCowboyRoom().pkRoomParam.rulePic;
            } break;

            case cv.Enum.GameId.HumanBoy: {
                rulePic = humanboyDataMgr.getHumanboyRoom().tCurRoom.rulePic;
            } break;

            case cv.Enum.GameId.PokerMaster: {
                rulePic = pokerMasterDataMgr.getPokerMasterRoom().tCurRoom.rulePic;
            } break;

            default: break;
        }

        strURL = cv.domainMgr.getServerInfo().web_server + RULE_URL.HUMANBOY_RULE + rulePic;
        this.rule.url = strURL;
    }

    public onClose(): void {
        this.node.active = false;
        if (cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
            this.rule.node.active = false;
        }
    }
}
