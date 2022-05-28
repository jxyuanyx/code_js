import { userData } from "./userData"
import Activity from "./activityData";
import { HashMap } from "../common/tools/HashMap";
import { ServerButtonType } from "../common/tools/Enum";
import cv from "../components/lobby/cv";
import ws_protocol = require("./../../Script/common/pb/ws_protocol");

export class BannerInfo {
    imageUrl: string = "";
    webViewUrl: string = "";
    is_pkf: number = 0;
}

/**
 * 用户数据管理类
 */
export class DataHandler {
    private userData: userData = null;
    private static instance: DataHandler;
    private bannerMapCache: HashMap<number, BannerInfo[]> = new HashMap();
    private serverId: ServerButtonType;
    private miniGameList: ws_protocol.pb.MiniGame[] = [];

    public static getInstance(): DataHandler {
        if (!this.instance) {
            this.instance = new DataHandler();
            this.instance.init();
        }
        return this.instance;
    }

    public init() {
        if (cv.config.GET_DEBUG_MODE() == 0) {
            this.serverId = cv.Enum.ServerButtonType.ServerButtonType_zhenshifu;
        } else if (cv.config.GET_DEBUG_MODE() == 1) {
            this.serverId = cv.Enum.ServerButtonType.ServerButtonType_ceshifu;
        }
    }

    public getUserData(): userData {
        if (!this.userData) {
            this.userData = userData.getInstance();
        }
        return this.userData;
    }

    public getActivityData(): Activity {
        return Activity.getInstance();
    }

    addBannerUrl(gameType: number, imgUrl: BannerInfo): void {
        let arr = this.bannerMapCache.get(gameType);
        if (!arr) {
            this.bannerMapCache.add(gameType, [imgUrl]);
        }
        else {
            arr.push(imgUrl);
        }
    }

    getBannerUrlList(gameType: number): BannerInfo[] {
        return this.bannerMapCache.get(gameType);
    }

    getBannerMapSize(): number {
        return this.bannerMapCache.length;
    }

    clearBanner(): void {
        this.bannerMapCache.clear();
    }

    public clearData(): void {
        // 清理用户数据
        if (this.userData) this.userData = userData.clearData();
        this.init();
        // 清理其他...
    }

    public getServerId(): number {
        return this.serverId;
    }

    public setServerId(severid: ServerButtonType) {
        this.serverId = severid;
    }

    //账号升级
    public upgradeAccount() {
        this.getUserData().isOpenUpdateUserMode = true;
        cv.MessageCenter.send("showUpgradeView");
    }

    //取消账号升级
    public cancleUpgradeAccount() {
        console.log("cancle UpgradeAccount");
        if(cv.viewAdaptive.isselfchange){
            if(cv.SHOP.exitCallFunc){
                cv.SHOP.exitCallFunc();
            }
        }
    }

    public getMiniGameList(): ws_protocol.pb.MiniGame[] {
        return this.miniGameList;
    }

    public updateMiniGameList(msg: ws_protocol.pb.MiniGame[]) {
        this.miniGameList = msg;
    }
}
