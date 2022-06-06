import { UpdatePanel } from "../UI/UpdatePanel";
import cv from "../../../lobby/cv";
import { PushNoticeType } from "../../../../common/prefab/PushNotice";

/**
 * 热更新模块
1:jsb是javascript bind的代表，整个C/C++ 导出的绑定都在这个jsb里面,jsb 支持native，不支持h5（浏览器上无法运行jsb is not defined ）;
2: FileUtils是本地文件读写的一个工具类,全局只有一个实例;
3: jsb.fileUtils来获取文件读写工具类的实例;
4: jsb.fileUtils.isDirectoryExist(path): 判断路径是否存在;
5: jsb.fileUtils.createDirectory(path); 创建一个路径;
6: jsb.fileUtils.getDataFromFile(path)获取二进制数据; // Uint8Array文本
7: jsb.fileUtils.writeDataToFile(data,path); 写二进制数据; // Uint8Array 对象
8: jsb.fileUtils.writeStringToFile(data,path); 写文本文件; // data String对象
9: jsb.fileUtils.getStringFromFile(path); 获取文本数据; // data String
9: jsb.fileUtils.removeFile(path); 删除掉一个文件;
10: jsb.fileUtils.getWritablePath(); 获取文件的可写目录,是一个内部存储的目录，我们的手机OS会为每个APP分配一个可读写的路径，但是这个App如果卸载以后，这个数据也会被删除;
    如果你要想保存到本地有又是持久的，你可以写入外部存储，外部存储的这个路径也是适用于fileUtils工具类的;
    addSearchPath(arg0)
 	
addSearchResolutionsOrder(arg0)
 	
createDirectories(arg0)
 	
createDirectory(arg0)
 	
fullPathForFilename(arg0)
 	
fullPathFromRelativeFile(arg0, arg1)
 	
getFileSize(arg0)
 	
getSearchPaths()
 	
getSearchResolutionsOrder()
 	
getStringFromFile(arg0)
 	
getValueMapFromFile(arg0)
 	
getValueVectorFromFile(arg0)
 	
getWritablePath()
 	
isAbsolutePath(arg0)
 	
isDirectoryExist(arg0)
 	
isFileExist(arg0)
 	
isPopupNotify()
 	
loadFilenameLookupDictionaryFromFile(arg0)
 	
purgeCachedEntries()
 	
removeDirectory(arg0)
 	
removeFile(arg0)
 	
renameFile(arg0, arg1, arg2)
 	
setSearchPaths(arg0)
 	
setSearchResolutionsOrder(arg0)
 	
writeStringToFile(arg0, arg1)
 	
writeToFile(arg0, arg1)
 *
 *
 **/



const { ccclass, property } = cc._decorator;

@ccclass
export class HotUpdate extends cc.Component {

    @property(UpdatePanel) panel: UpdatePanel = null;
    @property(cc.Asset) manifestUrl: cc.Asset = null;
    @property(cc.Node) logo_pkw: cc.Node = null;
    // @property(cc.Node) logo_pkt: cc.Node = null;
    @property(cc.Node) coverStar_img: cc.Node = null;
    @property(cc.Node) fairplay_img: cc.Node = null;

    @property(cc.Node) loadImg1: cc.Node = null;
    @property(cc.Node) loadImg: cc.Node = null;
    // @property(cc.Node) pkclogomov: cc.Node = null;
    // @property(cc.Node) pkc_login_logo: cc.Node = null;
    private _updating: boolean = false;
    @property(cc.Label) web_loading_percent: cc.Label = null;
    @property(cc.Label) loadResourceTips: cc.Label = null;
    @property(cc.Prefab) loadingAdPrefab: cc.Prefab = null; //广告页面预制件
    @property(cc.Label)  versionTxt: cc.Label = null;

    @property(cc.Node)  star_tom: cc.Node = null;
    @property(cc.Node)  star_ivey: cc.Node = null;
    @property(cc.Node)  star_light: cc.Node = null;

    @property(cc.Node)  light_node: cc.Node = null;
    @property(cc.Node)  coin_node:cc.Node = null;
    @property(cc.Node)  star_node:cc.Node = null;

    // @property(cc.Node) pktlogomov: cc.Node = null;
    private _canRetry: boolean = false;
    private _storagePath: string = '';
    private versionCompareHandle: Function = null;
    private _am: any = null;//AssetsManager
    private _updateListener: any = null;
    private _checkListener: any = null;
    private _failCount: number = 0;
    private _nowVersion: string = null;
    private _isCheckHotVersion: boolean = false;
    private _hasNewVersion = false;
    private _hotupdatePath: string = 'blackjack-remote-asset';
    private _logoMovPlayFinshed: boolean = false;
    private _resLoadCompleted: boolean = false;
    private _loadingAdInfo: any = null;  //广告数据
    private _infoPos = null;
    private _logoMovTime = 0.6;
    private _retryCount = 0;

    private _coinAnimArray:cc.Animation[] = [];


    private _getBytesString(bytes): String {
        if (bytes / 1024 >= 1024) {
            return (bytes / (1024 * 1024)).toFixed(1) + "M"
        } else {
            return (bytes / 1024).toFixed(1) + "KB"
        }
    }

    checkCb(event: any) {
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.info.string = "没有发现版本文件，跳过热更新.";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                //this.panel.info.string = "下载清单文件失败，跳过热更新.";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                //this.panel.info.string = "最新的远程版本.";
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.panel.info.string = cv.config.getStringData("Hotupdate_findVersionfileTips");//'找到新版本，请尝试更新.'
                //this.panel.checkBtn.active = false;
                this.panel.fileProgress.progress = 0;
                this.panel.byteProgress.progress = 0;
                this._hasNewVersion = true;
                break;
            default:
                //this.panel.info.string = "error:" + event.getEventCode();
                //this.panel.node.active = true;
                return;
        }

        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        if (this._hasNewVersion) {
            if (this._logoMovPlayFinshed) {
                this.hotUpdate();
            }            //有新版本等待动画完成驱动热更新。（如果网络延迟厉害有可能动画播完还有没检测到热更新。要进行处理）
        } else {
            //this.gotoLoadingScene();
            this.gotoLoadRes();
        }
    }

    updateCb(event) {
        var needRestart = false;
        var failed = false;
        // let progressUintStr = "";
        // let totalUintStr = "";
        // let progressByte = 0;
        // let totalByte = 0;
        // var self = this;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.info.string = cv.config.getStringData("Hotupdate_noVersionfileTips");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.panel.byteProgress.node.active = true;
                this.panel.byteProgress.progress = event.getPercent();
                this.panel.fileProgress.progress = event.getPercentByFile();
                // progressUintStr = event.getDownloadedBytes() / 1024 >= 1024 ? "M" : "KB";
                // totalUintStr = event.getTotalBytes() / 1024 >= 1024 ? "M" : "KB";

                // progressByte = event.getDownloadedBytes() / 1024 >= 1024 ? event.getDownloadedBytes() / (1024 * 1024) : event.getDownloadedBytes() / 1024;
                // totalByte = event.getTotalBytes() / 1024 >= 1024 ? event.getTotalBytes() / (1024 * 1024) : event.getTotalBytes() / 1024;
                //this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                //this.panel.byteLabel.string = cv.config.getStringData("Hotupdate_updateSizeTips") + "  (" + progressByte.toFixed(1) + progressUintStr + '/' + totalByte.toFixed(1) + totalUintStr + ")";

                // let percent = Math.ceil((event.getPercent() ? event.getPercent() : 0) * 100);
                // percent = percent >= 100 ? 100 : percent;
                //this.panel.percentLabel.string = (percent >= 100 ? 100 : percent) + "%";
                // this.panel.info.string = cv.StringTools.formatC(cv.config.getStringData("Hotupdate_updateingTips"), percent);
                if (event.getTotalBytes() > 0) {
                    let str = this._getBytesString(event.getDownloadedBytes()) + '/' + this._getBytesString(event.getTotalBytes());

                    this.panel.byteLabel.node.active = true;
                    this.panel.byteLabel.string = str;

                    this.panel.info.string = cv.config.getStringData("Hotupdate_updateingTips"); //cv.StringTools.formatC(cv.config.getStringData("Hotupdate_updateingTips"), str);

                    this.panel.des.node.active = true;
                    this.panel.des.string = cv.config.getStringData("Hotupdate_updateing_des");
                }

                var msg = event.getMessage();
                if (msg) {
                    //this.panel.info.string = '变更的文件: ' + msg;
                    // cc.log(event.getPercent()/100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                //this.panel.info.string = '下载清单文件失败，跳过热更新.';
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                //this.panel.info.string = '最新的远程版本.';
                failed = true;
                cc.game.restart();
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                //this.panel.info.string = '更新完成';//'更新完成. ' + event.getMessage()
                needRestart = true;
                // console.log("cc.game.restart()");
                // cc.game.restart();
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.panel.info.string = cv.config.getStringData("Hotupdate_updateFileTips") + event.getMessage();
                //this.panel.retryBtn.active = true;
                this._updating = false;
                this._canRetry = true;
                this.retry();
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.panel.info.string = cv.config.getStringData("Hotupdate_updateErrorTips") + ', ' + event.getMessage();
                console.log('资源更新错误: ' + event.getAssetId() + ', ' + event.getMessage());
                this.clearHotFileCache();
                cc.audioEngine.stopAll();
                cc.game.restart();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                //this.panel.info.string = event.getMessage();
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    }

    /*loadCustomManifest() {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
            this.panel.info.string = '使用自定义清单';
        }
    }*/

    retry() {
        if (!this._updating && this._canRetry) {
            this.panel.retryBtn.active = false;
            this._canRetry = false;
            this._retryCount++;
            if (this._retryCount > 3) {
                this.panel.info.string = cv.config.getStringData("ErrorToast33");
                return;
            }
            this.panel.info.string = cv.config.getStringData("Hotupdate_retryTips");
            this._am.downloadFailedAssets();
        }
    }

    checkUpdate() {
        if (this._updating) {
            //this.panel.info.string = '检查或更新 ...';
            return;
        }
        console.log("checkUpdate getState:" + this._am.getState());
        console.log("jsb.AssetsManager.State.UNINITED:" + jsb.AssetsManager.State.UNINITED);
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            // console.log("url:" + url);
            // if (cc.loader.md5Pipe) {
            //     console.log("url:11cc.loader.md5Pipe");
            //     url = cc.loader.md5Pipe.transformURL(url);
            // }
            this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            //this.panel.info.string = '未能加载本地清单 ...';
            return;
        }


        this._am.setEventCallback(this.checkCb.bind(this));
        this._isCheckHotVersion = true;
        this._am.checkUpdate();
        this._updating = true;
    }

    hotUpdate() {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                // if (cc.loader.md5Pipe) {
                //     url = cc.loader.md5Pipe.transformURL(url);
                // }
                this._am.loadLocalManifest(url);
            }

            this._failCount = 0;
            this._am.update();
            this.panel.node.active = true;
            this.panel.info.node.active = true;
            this.panel.byteProgress.progress = 0;
            //this.panel.updateBtn.active = false;
            this._updating = true;
        }
    }

    /**
     * 从服务器获取指定更新地址
     * @param value 
     * 返回成功:msg_code:0
     * url:热更新地址
     * imgServer:图片服务器域名
     * api_url:登录服域名
     * 返回错误:msg_code:100051
     * download_url 整包下载地址
     * 
     */
    responseGetHotUpdateUrl(value: any) {
        this.setAdCfgInfo(value);
        this.downloadActivityPic(value);
        if (!cc.sys.isNative) {
            //非原生包，只通过该接口获取广告数据，不走下面逻辑
            return;
        }

        if (value["msg_code"] == "0") {
            let data = value["data"];
            cv.tools.logObject(value, "请求热更地址回包:::::::");
            cv.domainMgr.setDefultImgServer(data["imgServer"]);
            cv.domainMgr.setDefultImgServer2(data["imgServer2"]);
            cv.domainMgr.set_api_url(data["api_url"]);
            console.log("this.manifestUrl:" + this.manifestUrl.nativeUrl);
            //合法的域名才能去进行替换，以免产生崩溃
            if (cv.StringTools.earseSpace(data["url"]).length > 0) {
                this.modifyAppLoadUrlForManifestFile(data["url"], this.manifestUrl.nativeUrl);
            } else {
                console.log("url 有问题");
            }
        } else {
            //需要强更
            cv.tools.logObject(value, "请求热更地址失败,有强更:::::::");
            let data = value["data"];
            cv.dataHandler.getUserData().download_url = data["download_url"];
            cv.netWorkManager.OnHttplogin();
            return;
        }
        this.startCheckUpdate();
    }

    /**
     * 请求热更新url
     */
    requestHotupdateUrl() {
        let url = "";
        //网页版也要通过requestHotupdateUrl 请求广告数据，此处判断原生包，才走下面逻辑
        if (cc.sys.isNative) {
            this.initLanguage();
            this.panel.info.string = cv.config.getStringData("Hotupdate_checkUpdateingTips");
            if (cv.config.GET_DEBUG_MODE() == 0) {
                cv.dataHandler.setServerId(cv.Enum.ServerButtonType.ServerButtonType_zhenshifu);
                //url = cv.config.getStringData("WEB_API_HEAD", true);
            } else if (cv.config.GET_DEBUG_MODE() == 1) {
                cv.dataHandler.setServerId(cv.Enum.ServerButtonType.ServerButtonType_ceshifu);
                //url = cv.config.getStringData("WEB_API_HEAD_DEBUG", true);
            }
        }

        let DevicePixelType = 1;  // 0:  ipad  1. 普通手机  2.全面屏手机  
        let isIpad = false;
        if (cc.sys.os == cc.sys.OS_IOS) {
            isIpad = cv.native.isWideScreen();
        } else {
            if (cv.config.IS_WIDESCREEN) {
                isIpad = true;
            }
        }

        if (isIpad) {
            DevicePixelType = 0;
        } else if (cv.config.IS_FULLSCREEN) {
            DevicePixelType = 2;
        }

        let obj = {
            "clientType": cv.config.GET_CLIENT_TYPE(),
            "user_id": cv.tools.GetStringByCCFile("user_id") ? cv.tools.GetStringByCCFile("user_id") : 0,
            "version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION(),
            "deviceType": cc.sys.isNative ? cc.sys.os : "web",
            "DevicePixelType": DevicePixelType, //闪屏广告，客户端告诉php显示类型
        };
        cv.tools.logObject(obj, "请求热更地址发包参数:");
        url = url + cv.config.getStringData("WEB_API_GET_RESOURCE_URL", true);
        let resoult = cv.http.sendRequest(url, obj, this.responseGetHotUpdateUrl.bind(this), null, null, false);

        if (cc.sys.isNative) {
            if (resoult == "no_wifi") {
                //this.gotoLoadingScene();
                this.gotoLoadRes();
            }
        }
    }

    public initLanguage() {
        cc.find("Label", this.panel.retryBtn).getComponent(cc.Label).string = cv.config.getStringData("Hotupdate_retrybtn");
    }

    onLoad() {
        cv.initBaseClass();

        //强制坚屏，（防止启动的时候手机模屏引起UI错乱）
        cv.native.setPortrait(true);

        cv.config.adaptScreen(this.node);
        cv.resMgr.adaptWidget(this.node, true);
        cv.config.setCurrentScene(cv.Enum.SCENE.HOTUPDATE_SCENE);
        this.registerMsg();
        cv.config.addErrorEvent();
        this.panel.node.active = false;
     

        cv.resMgr.loadBaseResource(this.toStart.bind(this));
        cv.config.SET_DISPLAYSTATS();
        this.setStartNumber();
        this.addCoinAnim();
        this._infoPos =  this.panel.info.node.getPosition();
        try { //初始化缓存目录，用于存储广告缓存等数据
            cv.CacheUtils.initCache();
        } catch (error) {
            console.log("CacheUtils initCache failed.");
        }


    }

    //适配小屏
    private adaptNotFullScreen(){

        if(cv.config.IS_WIDESCREEN){
   
            let scale = cc.winSize.width/cv.config.DESIGN_WIDTH;
            this.star_tom.scale = scale;
            this.star_ivey.scale = scale;

            this.light_node.getChildByName("bgCard").scale = scale;
            this.light_node.getChildByName("blueLight2").scaleX = scale;
            this.logo_pkw.y +=  150;

            cc.find("tomdwan_en", this.coverStar_img).y += 100;
            cc.find("philivey_en", this.coverStar_img).y += 150;
            cc.find("tomdwan_zh", this.coverStar_img).y  += 100;
            cc.find("philivey_zh", this.coverStar_img).y += 150;
            this.star_node.getChildByName("blueLight1").y -= 250;
            this.fairplay_img.y -= 100;
            this.panel.byteProgress.node.y  -= 100;
            this.panel.percentLabel.node.y  -= 100;
            this.panel.info.node.y  -= 100;


            
        }else if(!cv.config.IS_FULLSCREEN){
            let offsetY = 60;

            cc.find("tomdwan_en", this.coverStar_img).y += offsetY;
            cc.find("philivey_en", this.coverStar_img).y += offsetY;
            cc.find("tomdwan_zh", this.coverStar_img).y  += offsetY;
            cc.find("philivey_zh", this.coverStar_img).y += offsetY;

            this.panel.byteProgress.node.y  += 2*offsetY;
            this.panel.percentLabel.node.y  += 2*offsetY;
            this.panel.byteLabel.node.y  += 2*offsetY;
            this.panel.info.node.y  += 2*offsetY;
 
            this.logo_pkw.y +=  offsetY;
          
        }
        
        this.panel.des.node.y = this.panel.byteProgress.node.y  - 80;

    }

    /**
     * 设置启动次数
     */
    public setStartNumber() {
        let num = cv.tools.GetStringByCCFile("startNumber");
        let count = cv.Number(num) + 1;
        cv.tools.SaveStringByCCFile("startNumber", count.toString());
    }

    public registerMsg() {
        cv.MessageCenter.register("responseFailed_get_resource_url", this.noNetwork.bind(this), this.node);
        cv.MessageCenter.register("onLoginSuccess", this.onLoginSuccess.bind(this), this.node);
        //一般测试服二服才会走到这里来
        cv.MessageCenter.register("gotoloadres", this.gotoLoadRes.bind(this), this.node);
    }

    onLoginSuccess(msg) {
        cv.action.switchScene(cv.Enum.SCENE.HALL_SCENE);
    }

    //显示没有网络信息提示
    public noNetwork(str: any) {
        if (this._logoMovPlayFinshed) {

            this.panel.byteProgress.node.active = false;
            this.panel.percentLabel.node.active = false;

            this.panel.info.node.active = true;
            this.panel.node.active = true;
            this.panel.info.string = str;
            this.panel.info.node.x = -cv.resMgr.getLabelStringSize(this.panel.info.node.getComponent(cc.Label)).width/2;
        }
    }


    //启动动画
    startPageAnim()
    {
        this.playStarShow(); //人物出现动画
        this.playLogoShow(); //logo出现动画
        this.playNameShow(); //明星名称出现
        this.playCoinShow(); //金币出现动画
        this.playFairShow(); //公平动画
    }


    private addCoinAnim(){
        
        this._coinAnimArray = [];
        this._coinAnimArray[0] = this.coin_node.getChildByName("redCoin1").getComponent(cc.Animation);
        this._coinAnimArray[1] = this.coin_node.getChildByName("redCoin2").getComponent(cc.Animation);
        this._coinAnimArray[2] = this.coin_node.getChildByName("blueCoin1").getComponent(cc.Animation);
        this._coinAnimArray[3] = this.coin_node.getChildByName("blueCoin2").getComponent(cc.Animation);
    }

    private playCoinAnim(){
        for(let i = 0; i < this._coinAnimArray.length; i++){
            this._coinAnimArray[i].play();
        }
    }

    //金币出现动画
    private playCoinShow(){

        let redCoin1 = this.coin_node.getChildByName("redCoin1");
        let redCoin2 = this.coin_node.getChildByName("redCoin2");

        let blueCoin1 = this.coin_node.getChildByName("blueCoin1");
        let blueCoin2 = this.coin_node.getChildByName("blueCoin2");

        redCoin1.active = true;
        redCoin1.scale = 0.1;
        redCoin1.opacity = 0;
        redCoin2.active = true;
        redCoin2.scale = 0.1;
        redCoin2.opacity = 0;
        blueCoin1.active = true;
        blueCoin1.scale = 0.1;
        blueCoin1.opacity = 0;
        blueCoin2.active = true;
        blueCoin2.scale = 0;
        blueCoin2.opacity = 0;

        let offset = 100;
        let time = this._logoMovTime;

        let pos1 = redCoin1.getPosition();
        redCoin1.setPosition(cc.v2(pos1.x - offset, pos1.y - offset));  //红色1

        let pos2 = redCoin2.getPosition();
        redCoin2.setPosition(cc.v2(pos2.x - offset, pos2.y - offset));  //红色2

        let pos3 = blueCoin1.getPosition();
        blueCoin1.setPosition(cc.v2(pos3.x + offset, pos3.y - offset));  //蓝色2

        let pos4 = blueCoin2.getPosition();
        blueCoin2.setPosition(cc.v2(pos4.x + offset, pos4.y - offset));  //蓝色2

        redCoin1.runAction(cc.spawn(cc.scaleTo(time, 1), cc.fadeIn(time), cc.moveTo(time, pos1)));
        redCoin2.runAction(cc.spawn(cc.scaleTo(time, 1), cc.fadeIn(time), cc.moveTo(time, pos2)));
        blueCoin1.runAction(cc.spawn(cc.scaleTo(time, 1), cc.fadeIn(time), cc.moveTo(time, pos3)));
        blueCoin2.runAction(cc.spawn(cc.scaleTo(time, 1), cc.fadeIn(time), cc.moveTo(time, pos4)));

        let self = this;
        this.coin_node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function(){
            self.playCoinAnim();
        })));
    }

    /**
     * 公平游戏图片播完
     */
    private fairplayCallback() {

        if (this._hasNewVersion) {
            this.hotUpdate();
        } else {
            //加载完了直接登录
            if (this._resLoadCompleted) {
                this.showAdPage(this.doLogin.bind(this));  //登录前先展示广告
                //没有加载完显示转圈动画,等待加载完成驱动登录
            } else {
                // this.loadImg1.active = true;
                // this.loadImg.active = true;
                // this.loadResourceTips.node.active = true;
                // this.loadImg.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0, 1), cc.scaleTo(0.5, 1, 1))));
            }
        }
    }

    /**
     * 封面图播完,播公平竟技
     */
    private playFairShow() {

        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this.fairplay_img.opacity = 0;
            this.fairplay_img.active = true;
            this.fairplay_img.runAction(cc.sequence(cc.delayTime(0.8), cc.fadeIn(this._logoMovTime), cc.callFunc(this.fairplayCallback.bind(this))));
        } else {
            let fairplay_img = cc.find("fairpaly_img_en", this.node);
            fairplay_img.opacity = 0;
            fairplay_img.active = true;
            fairplay_img.runAction(cc.sequence(cc.delayTime(0.8),  cc.fadeIn(this._logoMovTime), cc.callFunc(this.fairplayCallback.bind(this))));
        }

        this._logoMovPlayFinshed = true;
    }

    //人物出现动画
    private playStarShow(){
        this.star_ivey.x = -this.star_ivey.width - cc.winSize.width/2;
        this.star_tom.x = cc.winSize.width/2;
        this.star_ivey.active = true;
        this.star_tom.active = true;

        this.star_light.active = true;
        this.star_light.opacity = 0;

        let scale = cc.winSize.width/cv.config.DESIGN_WIDTH;
        this.star_ivey.runAction(cc.moveBy(this._logoMovTime, cc.v2(this.star_ivey.width, 0)));
        this.star_tom.runAction(cc.moveBy(this._logoMovTime, cc.v2(-this.star_tom.width*scale, 0)));
        this.star_light.runAction(cc.sequence(cc.delayTime(this._logoMovTime),cc.fadeTo(this._logoMovTime, 125)));
    }

    
    //logo出现动画
    private playLogoShow(){
        this.versionTxt.string = "version " + cv.config.GET_CLIENT_VERSION();
        this.logo_pkw.opacity = 0;
        this.logo_pkw.active = true;
        this.logo_pkw.runAction(cc.sequence(cc.delayTime(0.3), cc.fadeIn(1.5))); 

        //红光出现动画
        this.light_node.active = true;
        this.light_node.opacity = 0;
        this.light_node.runAction(cc.sequence(cc.delayTime(0.3), cc.fadeIn(0.8))); 
    }

   
    //人物名称展示动画
    private  playNameShow() {
        this.coverStar_img.opacity = 0;
        this.coverStar_img.active = true;
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cc.find("tomdwan_en", this.coverStar_img).active = false;
            cc.find("philivey_en", this.coverStar_img).active = false;
            cc.find("tomdwan_zh", this.coverStar_img).active = true;
            cc.find("philivey_zh", this.coverStar_img).active = true;
        } else {
            cc.find("tomdwan_en", this.coverStar_img).active = true;
            cc.find("philivey_en", this.coverStar_img).active = true;
            cc.find("tomdwan_zh", this.coverStar_img).active = false;
            cc.find("philivey_zh", this.coverStar_img).active = false;
        }
        //人物出现完成后，播放名称淡入
        this.coverStar_img.runAction(cc.sequence(cc.delayTime(this._logoMovTime), cc.fadeIn(this._logoMovTime)));
    }

    private toStart() {
        cv.init();
        //发送启动事件
        cv.segmentTool.track(cv.Enum.CurrentScreen.ApplicationStarted, cv.Enum.segmentEvent.ApplicationStarted);
        //设置存储路径
        cv.domainMgr.init_server_file_path();
        cv.config.initDeviceModel();
        this._loadingAdInfo = null;
        if (cv.config.isThai()) {
            // this.logo_pkt.active = true;
            // this.logo_pkt.opacity = 0;
            // this.logo_pkw.active = false;

            // this.logo_pkt.runAction(cc.fadeIn(this._logoMovTime));
        } else {
            // this.logo_pkt.active = false;
            this.logo_pkw.opacity = 0;
            this.logo_pkw.active = true;

            this.startPageAnim();

            //this.logo_pkw.runAction(cc.sequence(cc.fadeIn(0.8), cc.delayTime(0.2), cc.callFunc(this.logo_callback.bind(this))));
        }
        //let anin;
        // if (cv.config.isOverSeas()) {
        //     anin = this.pkclogomov.getComponent(cc.Animation);
        //     anin.play("pkclogomov");
        //     this.pkc_login_logo.active = true;
        //     this.logomov.active = false;
        //     this.pktlogomov.active = false;

        // } else if (cv.config.isThai()) {
        //     anin = this.pktlogomov.getComponent(cc.Animation);
        //     anin.play("pktmov");
        //     this.pkc_login_logo.active = false;
        //     this.logomov.active = false;
        //     this.pktlogomov.active = true;
        // } else {
        //     anin = this.logomov.getComponent(cc.Animation);
        //     anin.play("logomov");
        //     this.pkc_login_logo.active = false;
        //     this.logomov.active = true;
        //     this.pktlogomov.active = false;
        // }
        //let self = this;
        // anin.on(cc.Animation.EventType.FINISHED, (type: cc.Animation.EventType, state?: cc.AnimationState): void => {
        //     anin.off(cc.Animation.EventType.FINISHED);
        //     self._logoMovPlayFinshed = true;
        //     if (this._hasNewVersion) {
        //         self.hotUpdate();
        //     } else {
        //         //显示转圈动画
        //         if (self._resLoadCompleted) {
        //             this.doLogin();
        //         } else {
        //             self.loadImg1.active = true;
        //             self.loadImg.active = true;
        //             self.loadResourceTips.node.active = true;
        //             self.loadImg.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0, 1), cc.scaleTo(0.5, 1, 1))));
        //         }
        //     }
        // }, this);

        cv.domainMgr.initLoginServer();
        //cv.domainMgr._onLinkBaiDu();
        //cv.domainMgr.getCdnUrl();
        //return;
        // cv.resMgr.setSpriteFrame(cc.find("logo", this.node), cv.config.getLogoPath(cv.Enum.SCENE.LOGIN_SCENE));
        // cc.find("logo", this.node).getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
        //console.log("DEBUG_MODE:" + cv.config.GET_DEBUG_MODE()); 
        cv.config.adaptScreen(this.node);
        this.adaptNotFullScreen();
        // cv.domainMgr.set_api_url("https://api.iyijiong.com/");
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            this.requestHotupdateUrl(); //网页版也请求该接口，获取广告闪屏数据
            this.gotoLoadRes();
            return;
        }

        if (cc.sys.os == cc.sys.OS_ANDROID && typeof window.is_emu == 'boolean' && window.is_emu && !cv.native.IsSimulator()) {
            //模拟器包不能运行在真机上
            cv.TP.showMsg(cv.config.getStringData("Run_On_Mobile_Warning"), cv.Enum.ButtonStyle.GOLD_BUTTON, () => {
                cc.game.end();
            });
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this._hotupdatePath);

        if (cc.isValid(window.client_environment, true)) {//予发布和正式服可以动态指定热更地址(以前的测试地址不用了)
            this.requestHotupdateUrl();
        } else {
            console.log("原生环境main.js未配置client_environment环境变量!!!!!");
        }

    }


    /**
     * 开始热更新检测
     */
    startCheckUpdate() {
        var self = this;
        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            if (self._isCheckHotVersion) {
                self._nowVersion = versionB;
            }
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        };


        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);

        var panel = this.panel;
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false

        this._am.setVerifyCallback(function (path, asset) {
            //等强更的时候，将这一句删除.   压缩文件应该返回为true,因为压缩文件解压之后，就被删除了
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            console.log("热更文件: " + path);
            //版本文件忽略
            if (path.substr(path.length - 9, 9) == ".manifest") {
                console.log("热更文件99999999: " + path);
                return true;
            }
            let md5Value = "";
            if (jsb.fileUtils.isFileExist(path)) {
                //let dataLen = jsb.fileUtils.getDataFromFile(path).length;
                md5Value = md5(jsb.fileUtils.getDataFromFile(path));

            } else {
                console.log(path + "  文件不存在");
            }
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            console.log(path + "md5Value ==" + md5Value + "  expectedMD5 ==" + expectedMD5);
            return md5Value == expectedMD5;
            if (compressed) {
                //panel.info.string = "验证通过了 : " + relativePath;
                return true;
            }
            else {
                return md5Value == expectedMD5;
                //panel.info.string = "验证通过了 : " + relativePath + ' (' + expectedMD5 + ')';
                //return true;
            }
        });
        console.log("=================>>>>" + this.panel.info);
        //this.panel.info.string = '热更新准备好了，请检查或直接更新.';

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            //this.panel.info.string = "最大并发任务数限制为2";
        }

        this.panel.fileProgress.progress = 0;
        this.panel.byteProgress.progress = 0;

        if (this.checkBigVersion()) {
            //this.gotoLoadingScene();
            this.gotoLoadRes();
        } else {
            this.checkUpdate();
        }
    }

    /**
     * 当前版本与本地存储版本的对比，用于大版本更新，
     * 如果当前版本比本地存储版本更高，则清除之前的所有缓存文件
     */
    checkBigVersion(): boolean {
        if (cc.isValid(window.big_version, true)) {
            console.log("window.big_version:" + window.big_version);

        } else {
            console.log("big_version is invallid");
            return false;
        }
        let isBigVersion = false;
        let nowVersion;
        let self = this;
        nowVersion = window.big_version;
        self._am.loadLocalManifest(self.manifestUrl.nativeUrl);

        if (jsb.fileUtils.isFileExist(self._storagePath + "/version.txt")) {
            console.log("检测到version.txt文件存在");
            let lastVersion = jsb.fileUtils.getStringFromFile(self._storagePath + "/version.txt");
            console.log("上一个版本：" + lastVersion + "当前版本：" + nowVersion);

            if (self.versionCompareHandle(nowVersion, lastVersion) > 0) {
                console.log("现在为新的大版本，删除所有缓存资源");
                //this.panel.info.string = '现在为新的大版本，删除所有缓存资源';
                if (jsb.fileUtils.isDirectoryExist(self._storagePath)) {
                    console.log("检测到缓存文件");
                    //this.panel.percentLabel.string = "检测到缓存文件";
                    jsb.fileUtils.removeDirectory(self._storagePath + "/");
                }
                if (jsb.fileUtils.isDirectoryExist(self._storagePath + "_temp")) {
                    console.log("检测到临时缓存文件");
                    jsb.fileUtils.removeDirectory(self._storagePath + "_temp/");
                }
                isBigVersion = true;
            } else {
                console.log("现在不是新的大版本，请继续检测是否有热更新");
            }
        } else {
            console.log("没有检测到version.txt文件");
        }
        return isBigVersion;
    }

    /**
     * 写入当前版本号
     */
    writeLastVersion() {
        if (cc.isValid(window.big_version, true)) {
            console.log("ssssssssss:" + window.big_version);
        } else {
            console.log("666666666666");
            return;
        }
        console.log("writeLastVersion::::==>" + window.big_version);
        if (!jsb.fileUtils.isDirectoryExist(this._storagePath)) {
            jsb.fileUtils.createDirectory(this._storagePath);
            console.log("writeLastVersion::先创建文件夹");
        }
        jsb.fileUtils.writeStringToFile(window.big_version, this._storagePath + "/version.txt");
    }

    /**
     * 跳转到加载资源场景
     */
    gotoLoadingScene() {
        cv.tools.init();// 这里面有写文件操作  需要热更新完成后再执行
        if (cc.sys.isNative) {
            this.writeLastVersion();
        }
        // 预加载场景
        let sceneName = "LoadingScene";
        cc.director.preloadScene(sceneName,
            (completedCount: number, totalCount: number, item: any): void => {
            },
            (error: Error): void => {
                cc.director.loadScene(sceneName);

                console.log("loading completed !");
            });
    }

    //加载资源
    public gotoLoadRes() {
        cv.tools.init();// 这里面有写文件操作  需要热更新完成后再执行
        // cc.director.preloadScene(cv.Enum.SCENE.HALL_SCENE);

        if (cc.sys.isNative) {
            this.writeLastVersion();
            let writePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/'));
            cv.native.SetWriteblePath(writePath);
        } else if (cc.sys.isBrowser) {
            cv.native.initWebLocation();
        }
        cv.pushNotice.setPushNoticeType(PushNoticeType.PUSH_ERROR);
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台

            cv.native.SYwebjsToClient("{\"cmd\":\"1001\"}");
            cv.native.SYwebjsToClient("{\"cmd\":\"1002\"}");
            cv.native.SYwebjsToClient("{\"cmd\":\"1004\"}");

            if (cc.sys.os == cc.sys.OS_ANDROID) {  //如果是私语的平台
                cv.native.SYwebjsToClient("{\"cmd\": \"1005\", op: 0}");
            }

            if (cc.sys.os == cc.sys.OS_IOS) {  //如果是私语的平台
                cv.native.SYwebjsToClient("{\"cmd\": \"1014\"}");  //当前是否是ipad
            }
            //私语获取系统语言
            cv.native.SYwebjsToClient("{\"cmd\": \"1011\"}");
            //私语获取电量信息
            cv.native.SYwebjsToClient("{\"cmd\": \"1010\"}");
            //获取系统剪切版
            cv.native.SYwebjsToClient("{\"cmd\": \"1013\", \"op\": 0}");
            //私语显示加载资源百分比进度
            //this.web_loading_percent.node.active = true;
        }
        cv.resMgr.loadDataFile(this._onLoadingProgress.bind(this));
    }

    private _onLoadingProgress(completedCount: number, totalCount: number, path: string, type: string): void {
        console.log(cv.StringTools.format("load res success - path:{0}, type:{1}, completedCount:{2}, totalCount:{3}",
            path, type, completedCount, totalCount));

        let percent = Math.ceil(completedCount / (totalCount + 1) * 100);
        percent = percent > 100 ? 100 : percent;
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            //私语网页版显示资源加载进度百分比

            //this.web_loading_percent.getComponent(cc.Label).string = percent.toString() + "%";
        } else {
            //this.loadResourceTips.string = cv.config.getStringData("Loading_resource") + "...";
        }
        if (this._logoMovPlayFinshed) {

            this.panel.info.node.x = this._infoPos.x;
            let progress = this.panel.node.active ? percent / 100 : 0;
            this.panel.node.active = true;
            this.panel.byteProgress.node.active = true;
            this.panel.info.node.active = true;
            this.panel.percentLabel.node.active = true;

            this.panel.percentLabel.string  = progress * 100 + "%";
            this.panel.info.string = cv.config.getStringData("Hotupdate_Loading_resource"); //cv.StringTools.formatC(cv.config.getStringData("Hotupdate_Loading_resource"), progress * 100);


            this.panel.byteProgress.progress = progress;
        }

        if (completedCount >= totalCount) {
            this._resLoadCompleted = true;
            if (this._logoMovPlayFinshed) {
                this.showAdPage(this.doLogin.bind(this)); //登录前先展示广告
            }
        }
    }

    onDestroy() {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
        cv.MessageCenter.unregister("responseFailed_get_resource_url", this.node);
        cv.MessageCenter.unregister("onLoginSuccess", this.node);
        cv.MessageCenter.unregister("gotoloadres", this.node);
    }
    /**
     * 修改本地热更新配置文件
     * @param newAppHotUpdateUrl 新的热更新地址
     * @param localManifestPath 本地热更新配置文件路径
     * @param resultCallback 替换成功后地回调
     */
    modifyAppLoadUrlForManifestFile(newAppHotUpdateUrl: string, localManifestPath: string) {
        if (jsb.fileUtils.isFileExist(this._storagePath + '/project.manifest')) {
            console.log("有下载的manifest文件");
            console.log("StoragePath for remote asset : ", this._storagePath);
            let loadManifest = jsb.fileUtils.getStringFromFile(this._storagePath + '/project.manifest');
            let manifestObject = JSON.parse(loadManifest);
            manifestObject.packageUrl = newAppHotUpdateUrl;
            manifestObject.remoteManifestUrl = newAppHotUpdateUrl + '/project.manifest';
            manifestObject.remoteVersionUrl = newAppHotUpdateUrl + '/version.manifest';

            let afterString = JSON.stringify(manifestObject);
            let isWritten = jsb.fileUtils.writeStringToFile(afterString, this._storagePath + '/project.manifest');
            console.log("Written Status : ", isWritten);
        } else {
            console.log("没有下载的manifest文件", newAppHotUpdateUrl, localManifestPath);
            //修改原始manifest文件
            // let originManifestPath = localManifestPath;
            console.log("11111111:" + localManifestPath);
            let originManifest: string = jsb.fileUtils.getStringFromFile(localManifestPath);
            // console.log("222222::" + originManifest);
            let originManifestObject = JSON.parse(originManifest);
            console.log("3333333");
            cv.tools.logObject(originManifestObject);
            originManifestObject.packageUrl = newAppHotUpdateUrl;
            console.log("4444444：" + originManifestObject.remoteManifestUrl);
            originManifestObject.remoteManifestUrl = originManifestObject.packageUrl + '/project.manifest';
            console.log("5555555：" + originManifestObject.remoteVersionUrl);
            originManifestObject.remoteVersionUrl = originManifestObject.packageUrl + '/version.manifest';
            let afterString = JSON.stringify(originManifestObject);
            if (!jsb.fileUtils.isDirectoryExist(this._storagePath)) {
                jsb.fileUtils.createDirectory(this._storagePath);
            }
            // console.log("66666：" + afterString);
            let isWritten = jsb.fileUtils.writeStringToFile(afterString, this._storagePath + '/project.manifest');
            console.log("this Written Status : ", this._storagePath);
            console.log("Written Status : ", isWritten);
        }
    }

    /**
     * 删除缓存资源
     */
    public clearHotFileCache() {
        //删除热更文件夹
        /*if (jsb.fileUtils.isDirectoryExist(this._storagePath)) {
            console.log("检测到缓存文件");
            this.panel.percentLabel.string = "检测到缓存文件";
            jsb.fileUtils.removeDirectory(this._storagePath + "/");
        }*/
        //删除临时文件夹
        if (jsb.fileUtils.isDirectoryExist(this._storagePath + "_temp")) {
            jsb.fileUtils.removeDirectory(this._storagePath + "_temp/");
            console.log("存在临时文件夹");
        }

        //删完之后做一次检测
        /*if (jsb.fileUtils.isDirectoryExist(this._storagePath)) {
            console.log("未清理热更文件夹");
        }else{
            console.log("已清理热更文件夹");
        }*/
        if (jsb.fileUtils.isDirectoryExist(this._storagePath + "_temp")) {
            console.log("未清理临时文件夹");
        } else {
            console.log("已清理临时文件夹");
        }
    }


    //执行登陆 有账号直接登陆，没账号跳转至登陆界面，（这两步都是建立在资源加载完成且动画播放完成的情况）
    public doLogin() {
        if (cv.config.isSiyuType() && cc.sys.os == cc.sys.OS_IOS) {
            console.log("##############doLogin  siyu  play silence music.");
            //如果是私语网页版，IOS平台。 在iphoneX等手机上会存在播放音频整体音量很小的问题。
            //此处在index.html中封装方法window.playSilenceMusic 调用js的Audio组件播放一个无声mp3音频
            //激活私语app的音频音量问题。 以此来解决音量小的问题。
            let silenceMusic: string = "resources/zh_CN/game/dzpoker/audio/silence2";
            if (window.playSilenceMusic) {
                //console.log("######################### md5Pipe = " + cc.loader.md5Pipe);
                if (cc.loader.md5Pipe) {
                    window.playSilenceMusic(cc.loader.md5Pipe.transformURL(cc.url.raw(silenceMusic)) + "");  //勾选了MD5 cache打包用这个cc.loader.md5Pipe.transformURL
                } else {
                    window.playSilenceMusic(cc.url.raw(silenceMusic) + "");    //没有勾选了MD5 cache打包用这个cc.url.raw
                }
            }
        }
        //上一次登录是否为游客
        let isTouristLogin = cv.Number(cv.tools.GetStringByCCFile("is_tourist_login"));
        if (isTouristLogin) {
            cv.httpHandler.requestTouristLogin();
        } else {
            let account = cv.tools.GetStringByCCFile("user_account");
            let password = cv.tools.GetStringByCCFile("user_password");
            if (!account || account == "" || !password || password == "") {
                cv.action.switchScene(cv.Enum.SCENE.LOGIN_SCENE);
            } else {
                let resoult = cv.httpHandler.requestLoginByUserName(account, password);
                if (resoult == "no_wifi") {
                    cv.action.switchScene(cv.Enum.SCENE.LOGIN_SCENE);
                }
            }
        }
    }


    //设置广告数据
    setAdCfgInfo(value: any) {
        console.log("setAdCfgInfo.");
        if (value["msg_code"] == "0") {
            let data = value["data"];
            this._loadingAdInfo = {
                AdSwitch: data["AdSwitch"],   // 是否开启广告展示 0 关闭  1开启
                AdType: data["AdType"],  // 广告类型  1 图片  2 视频
                AdUrl: data["AdUrl"],   //广告图片或者视频URL
                AdStartTimestamp: data["AdStartTimestamp"], // 广告有效期开始时间  （单位为秒的时间戳）
                AdEndTimestamp: data["AdEndTimestamp"], // 广告有效期结束时间  （单位为秒的时间戳）
                AdDisplayTime: data["AdDisplayTime"], //图片广告展示时间
                AdPerDayShowTimes: data["AdPerDayShowTimes"], //广告每天展示总次数  0表示每天永远展示
            }

            // console.log("#################setAdCfgInfo AdSwitch:" + data["AdSwitch"]);
            // console.log("#################setAdCfgInfo AdType:" + data["AdType"]);
            // console.log("#################setAdCfgInfo AdUrl:" + data["AdUrl"]);
            // console.log("#################setAdCfgInfo AdStartTimestamp:" + data["AdStartTimestamp"]);
            // console.log("#################setAdCfgInfo AdEndTimestamp:" + data["AdEndTimestamp"]);
            // console.log("#################setAdCfgInfo AdDisplayTime:" + data["AdDisplayTime"]);
            // console.log("#################setAdCfgInfo AdPerDayShowTimes:" + data["AdPerDayShowTimes"]);
        }
    }

    //显示闪屏广告
    showAdPage(nextCb: Function) {
        if (!this._loadingAdInfo) {
            nextCb();
            return;
        }

        if (this._loadingAdInfo.AdSwitch != 1) {
            //广告关闭显示
            nextCb();
            return;
        }

        if (this._loadingAdInfo.AdUrl == null || this._loadingAdInfo.AdUrl.length <= 0) {
            //广告url为空
            nextCb();
            return;
        }

        if (!cv.CacheUtils.isCacheExist(this._loadingAdInfo.AdUrl)) {
            //此时没有广告缓存，先下载广告缓存数据
            cv.CacheUtils.cache(this._loadingAdInfo.AdUrl);
            nextCb();
            return;
        }


        do {
            let adIndex = cv.md5.md5(this._loadingAdInfo.AdUrl); //把广告md5后的url，当作唯一广告标志
            let date = new Date();
            let curYmd = cv.StringTools.formatC("%d-%d-%d", date.getFullYear(), date.getMonth(), date.getDate());

            //判断广告的有效时间范围
            let timestamp = Math.floor(date.getTime() / 1000);
            if (!this._loadingAdInfo.AdStartTimestamp || this._loadingAdInfo.AdStartTimestamp == 0) { //如果没有配置开始时间
                if (timestamp > this._loadingAdInfo.AdEndTimestamp) {
                    //超过展示时间
                    console.log("out the time 1");
                    nextCb();
                    return;
                }
            } else {
                if (timestamp < this._loadingAdInfo.AdStartTimestamp || timestamp > this._loadingAdInfo.AdEndTimestamp) {
                    //不在展示时间范围内
                    console.log("out the time 2");
                    nextCb();
                    return;
                }
            }

            //读取广告配置
            let cfg = cv.tools.GetStringByCCFile("AdInfoConfig");
            if (!cfg || cfg == "") {
                //当前没有配置
                console.log("cur no ad cfg.");
                this.saveADconfg(adIndex, curYmd, 1);
                break;
            }

            let data = JSON.parse(cfg);
            // console.log("#################readCfg adIndex:" + data.adIndex);
            // console.log("#################readCfg ymd:" + data.ymd);
            // console.log("#################readCfg showCount:" + data.showCount);
            if (adIndex != data.adIndex || !data.ymd) {
                //表示当前是新广告, 重新配置
                console.log("This is a new AD.");
                this.saveADconfg(adIndex, curYmd, 1);
                break;
            }

            if (this._loadingAdInfo.AdPerDayShowTimes != 0 && data.ymd == curYmd && data.showCount >= this._loadingAdInfo.AdPerDayShowTimes) {
                //当前不是永久显示广告，而且今天的次数已经显示完成了
                console.log("Reached the number of AD display");
                nextCb();
                return;
            }

            if (data.ymd == curYmd) {
                data.showCount++;
            } else {
                data.ymd = curYmd;
                data.showCount = 1;
            }
            this.saveADconfg(adIndex, data.ymd, data.showCount);

        } while (0);

        let node = cc.instantiate(this.loadingAdPrefab);
        this.node.addChild(node);
        let loadingAd = node.getComponent("loadingAd");
        loadingAd.showAd(this._loadingAdInfo, () => nextCb());

        //打开闪屏广告
        let id = this._loadingAdInfo.AdUrl.substr(this._loadingAdInfo.AdUrl.lastIndexOf("/") + 1);
        let properties = { promotionName: "", creativeId: id };
        cv.segmentTool.track(cv.Enum.CurrentScreen.promotionScreen, cv.Enum.segmentEvent.ScreenOpened);
        cv.segmentTool.track(cv.Enum.CurrentScreen.promotionScreen, cv.Enum.segmentEvent.PromotionShown, "", properties);
    }

    //保存广告配置
    saveADconfg(adIndex: String, curYmd: String, showCount: Number) {
        let initCfg = JSON.stringify({
            adIndex: adIndex,
            ymd: curYmd,  //已经显示次数对应的年月日
            showCount: showCount, //已经显示次数了
        });
        cv.tools.SaveStringByCCFile("AdInfoConfig", initCfg);
    }


    //下载活动图片
    downloadActivityPic(value: any) {
        if (!value) return;

        if (value["msg_code"] != "0") {
            return;
        }

        let data = value["data"];
        let imgArray = data["alert_img"];

        if (!imgArray || imgArray.length <= 0) {
            console.log("imgArray data is null.");
            return;
        }

        for (let i = 0; i < imgArray.length; i++) {
            let imgInfo = imgArray[i];
            let url = imgInfo["img"];
            if (url && url.length > 0) {
                if (!cv.CacheUtils.isCacheExist(url)) {
                    //下载不存在的活动图片
                    cv.CacheUtils.cache(url);
                }
            }
        }
    }
}
