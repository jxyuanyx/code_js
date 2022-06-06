import cv from "../lobby/cv";
import { ResourceManager } from "../../common/tools/ResourceManager";

/**
 * 加载资源进度
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class Loading extends cc.Component {
    @property(cc.Node) panel_loading: cc.Node = null;
    @property(cc.Label) txt_loading: cc.Label = null;
    @property(cc.ProgressBar) bar_loading: cc.ProgressBar = null;
    @property(cc.Sprite) logo: cc.Sprite = null;

    protected onLoad(): void {
        //不是原生平台，要先初始化基础类。（原生平台已经在热更场景初始化了）
        if (!cc.sys.isNative) {
            cv.initBaseClass();
            cv.config.SET_DISPLAYSTATS();
        }

        let resMgr: ResourceManager = ResourceManager.getInstance();
        resMgr.adaptWidget(this.node);
        resMgr.adaptWidget(this.panel_loading);
        resMgr.adaptWidget(this.bar_loading.node);
        resMgr.adaptWidget(this.bar_loading.barSprite.node);
        this.logo.sizeMode = cc.Sprite.SizeMode.RAW;
        this.bar_loading.progress = 0;
        this.bar_loading.totalLength = this.bar_loading.node.width;
        this.bar_loading.barSprite.node.width = 0;

        if (cc.sys.isBrowser) {
            window.addEventListener("offline", this.webNetworkFailed, false);
            cv.native.initWebLocation();
        }

        if (cc.sys.isNative) {
            this.toStart();
        } else {
            cv.resMgr.loadBaseResource(this.toStart.bind(this));
        }

    }

    protected toStart(): void {
        //cc.game.setFrameRate(30);
        //cc.debug.setDisplayStats(false);
        cv.init();
        this.registerMsg();
        cv.resMgr.loadDataFile(this._onLoadingProgress.bind(this));
        cv.config.adaptScreen(this.node);
        cv.resMgr.setSpriteFrame(this.logo.node, cv.config.getLogoPath(cv.Enum.SCENE.LOGIN_SCENE));
        let str = cv.config.getStringData("Loading_resource");
        cc.find("txt_loading", this.panel_loading).getComponent(cc.Label).string = cv.config.getStringData("Loading_resource");
        cv.config.setCurrentScene(cv.Enum.SCENE.LOADING_SCENE);

        if (cc.sys.isNative) {
            let writePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/'));
            cv.native.SetWriteblePath(writePath);
        }
    }

    webNetworkFailed(): void {
        console.log("offline");
        cv.netWorkManager.OnCowboyWebNetFailed();
    }
    //全屏
    // fullScreen(): void {
    //     if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
    //         let bodyTag = document.getElementsByTagName('body')[0];
    //         bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    //     }

    //     setTimeout(function () {
    //         window.scrollTo(0, 1);

    //         let el: any = window.document.documentElement;
    //         let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    //         if (typeof rfs != "undefined" && rfs) {
    //             rfs.call(el);
    //         };
    //     }, 0);
    // }


    private _onLoadingProgress(completedCount: number, totalCount: number, path: string, type: string): void {
        console.log(cv.StringTools.format("load res success - path:{0}, type:{1}, completedCount:{2}, totalCount:{3}",
            path, type, completedCount, totalCount));

        this.bar_loading.progress = Math.min(1, completedCount / (totalCount + 1));
        if (completedCount >= totalCount) {
            if (cc.sys.isBrowser) {
                window.removeEventListener("offline", this.webNetworkFailed, false);
            }
            // 预加载场景
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                let Log = console.log;
                console.log = (message?: any, ...optionalParams: any[]): void => {
                    let date = new Date();
                    Log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ", message, ...optionalParams);
                }
                let url: string = window.location.href;
                url = "http://47.56.88.150:8849/cowboyWpk-web-mobile/?token=0552122c4ab94bc2b2b56f9e1d66fbb9&&uid=565555&&gate=ws://47.56.88.150:18003,ws://47.56.88.150:18011&&language=0&&isNative=1&&roomid=112259";
                let strName: string = "token=";
                let startPos: number = url.indexOf(strName);
                let endPos: number = 0;
                if (startPos != -1) {
                    endPos = url.indexOf("&&", startPos);
                    cv.dataHandler.getUserData().user_token = url.slice(startPos + strName.length, endPos);
                }

                strName = "uid=";
                startPos = url.indexOf(strName);
                if (startPos != -1) {
                    endPos = url.indexOf("&&", startPos);
                    cv.dataHandler.getUserData().user_id = url.slice(startPos + strName.length, endPos);
                }

                strName = "gate=";
                startPos = url.indexOf(strName);
                if (startPos != -1) {
                    let h5_url: string = url.slice(startPos + strName.length);
                    let urlArr: string[] = h5_url.split(",");
                    cv.domainMgr.initDoMain();
                    let len = urlArr.length;
                    for (let i = 0; i < len; i++) {
                        let re = { h5: urlArr[i], data: "", qiniu: "", api: "" };
                        cv.domainMgr.addDomain(re);
                    }
                }
                console.log("--------- ccjs://enter");
                document.location.href = "ccjs://enter";
                cv.netWorkManager.SceneOnLoad();

                // cv.httpHandler.requestLoginByUserName("SZtest07", "999999");//牛仔单独网页版游戏测试代码
            } else {
                let account = cv.tools.GetStringByCCFile("user_account");
                let password = cv.tools.GetStringByCCFile("user_password");
                if(!account){
                    cv.action.switchScene(cv.Enum.SCENE.LOGIN_SCENE);
                }else{
                    cv.httpHandler.requestLoginByUserName(account, password);
                }
                
            }

            // let sceneName = "LoginScene";
            // cc.director.preloadScene(sceneName,
            //     (completedCount: number, totalCount: number, item: any): void => {
            //     },
            //     (error: Error): void => {
            //         this.bar_loading.progress = 1;
            //         cc.director.loadScene(sceneName);

            //         console.log("loading completed !");
            //     });
        }
    }

    onDestroy() {
        cv.MessageCenter.unregister("onLoginSuccess", this.node);
    }

    registerMsg() {
        cv.MessageCenter.register("onLoginSuccess", this.onLoginSuccess.bind(this), this.node);
    }
    /**
     * 当小游戏牛仔百人等独立出来的时候走这里（第三方接入的时候应该跳过登陆PHP，直接进入相应小游戏）
     * @param msg 
     */
    onLoginSuccess(msg) {
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }
}
