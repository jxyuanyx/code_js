/**
 * 登录服域服轮询管理，线路切换管理
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
import cv from "../../components/lobby/cv";
import { aesHandler } from "../plugg/aesHandler";

// 服务器域名信息
export class ServerInfo {
    data_server: string = "";                           // 数据服  
    web_server: string = "";                            // web服
    image_server_2: string = "";                        // web服(目前用于post上传图片语言等文件)
    image_server: string = "";                          // 图片服
    gate_server: string = "";                           // 网关(转接go服务器)
    pkt_shop: string = "";                              // pkt支付
    sports_server: string = "";                         // 体育竞赛
    pocket_games: string = "";                          // 电子游戏
    recaptcha: string = "";                             // recaptcha
    kyc: string = "";                                   // kyc
    top_matches_h5: string = "";                        // 一起看球
    top_matches: string = "";                           // 一起看球"logo"地址前缀
    invalid: boolean;                                   // 无效域名
    image_server_wpk: string = "";                      // wpk 图片域名
    image_server_wpto: string = "";                     // wpto 图片域名
}

export class DomainMgr {
    private static _g_instence: DomainMgr = null;
    //是否所有域名无法连接，并且有请求百度成功的标记this._isLoginError（说明网络没问题）此标记为true时用于启动去CDN下载域名列表
    private _isLoginError: boolean = false;
    //登陆服域名数组 只包函（web_server）
    private _loginServerList: string[] = [];
    //登陆服域名列表索引 轮询标记
    private _loginServerList_index: number = 0;
    //登陆服域名 在请求热更新接口返回，如果不是空字符串，登陆的时候统一使用服务器下发的域名进行登录,可以方便的控制客户端连接哪一个服务器
    private _api_url: string = "";

    //服务器域名组列表 包函(data_server web_server image_server gate_server)
    private _domain: ServerInfo[] = [];
    //服务器域名组列表索引，轮询标记
    private _domain_index: number = 0;
    //服务器域名组列表中是否还有可连接的域名组，每次网关连接成功以后重置
    private _domain_reconnect_num = 0;

    //域名组列表,初始化时先收集一波之前存储的域名组，或者是CDN下载的域名组。
    private _domainStore: ServerInfo[] = [];

    //CND存储文件夹
    private DOWNLOAD_IMAGE_FOLDER: string = "downloadFile/";
    //CND存储文件
    private CDN_FILE_NAME: string = "cdnFile";
    //域名存储文件侠
    private SERVE_FILE_PATH: string = "ip/";
    //存储上次登录成功的域名信息文件
    private LASTLOGIN: string = "lastLogin";
    //存储本次登录成功下发的域名组文件
    private LOGINDOMAIN: string = "login";
    //百度连接
    private _baiduUrl: string = "https://www.baidu.com/";
    //上一次连接请求失败的接口名
    private _lastFailServerName: string = "";
    //解码AES KEY
    private HTTP_AES_KEY: string = "3RLojOn0Gp8AB1iktWY4qf7QmwaMK2hH";
    //登录下发的cdn名称
    private CDN: string = "cdn";
    //在请求热更地址时一起下发的图片默认上传域名
    private defult_imgSever: string = "";//http://47.90.98.55:10010/
    //在请求热更地址时一起下发的图片默认上传域名2
    private defult_imgSever2: string = "";//http://47.90.98.55:10010/
    /**
     * 初始化
     */
    public initLogin() {
        if (cc.sys.isNative) {
            let path = jsb.fileUtils.getWritablePath() + this.SERVE_FILE_PATH;
            jsb.fileUtils.removeFile(path + this.LASTLOGIN);
            jsb.fileUtils.removeFile(path + this.LOGINDOMAIN);
        }
        this.initLoginServer();
        this._domain_index = 0;
        this._domain.splice(0, this._domain.length);
    }
    /**
     * 添加域名信息
     * @param ite 
     */
    public addDomain(ite: any) {
        let re = new ServerInfo();
        re.gate_server = ite.h5;
        re.data_server = ite.data;
        re.image_server = ite.qiniu;
        re.image_server_2 = ite.qiniu2;
        re.web_server = ite.api;
        re.pkt_shop = ite.ucenter;
        re.sports_server = ite.sports;
        re.pocket_games = ite.pocket_games;
        re.recaptcha = ite.recaptcha;
        re.kyc = ite.kyc;
        re.top_matches_h5 = ite.top_matches_h5;
        re.top_matches = ite.top_matches;
        re.invalid = false;
        re.image_server_wpk = ite.wpk;
        re.image_server_wpto = ite.wpto;
        this._domain.push(re);
    }

    /**
     * 域名存储文件侠
     */
    public init_server_file_path() {
        this.SERVE_FILE_PATH = cv.config.GET_DEBUG_MODE() ? "ip_debug/" : "ip/";
    }
    /**
     * 初始化域名信息数组
     */
    public initDoMain() {
        this._domain_index = 0;
        this._domain.splice(0, this._domain.length);
        if ((this._loginServerList_index < this._loginServerList.length - 2 || this._isLoginError)
            && this._loginServerList_index < this._domainStore.length) {
            this._domain.push(this._domainStore[this._loginServerList_index]);
        }
        this._isLoginError = false;
    }
    /**
     * 初始化服务器域名
     * 是否所有域名无法连接，并且有请求百度成功的标记this._isLoginError（说明网络没问题）。
     * 
     */
    public initLoginServer() {
        this._loginServerList = [];
        this._loginServerList_index = 0;

        this._domainStore = [];
        let loginserver: string = "";

        let path = cc.sys.isNative ? jsb.fileUtils.getWritablePath() : "";
        //没有可用的域名，且有网络，去CND下载
        if (this._isLoginError) {
            //cdn本地文件地址
            let filepath = path + this.DOWNLOAD_IMAGE_FOLDER + this.CDN_FILE_NAME;
            if (cc.sys.isNative && jsb.fileUtils.isFileExist(filepath)) {
                //buffer数据
                let cdnBuffer = jsb.fileUtils.getDataFromFile(filepath);
                console.log("cdnBuffer:::" + cdnBuffer);
                //将buffer数据转换为base64
                let cdnbase64 = aesHandler.bytesToBase64(cdnBuffer);
                console.log("cdnbase64:::" + cdnBuffer);
                //解码base64
                let aesdata = cv.base64.decode(cdnbase64);
                console.log("aesdata:::" + aesdata);
                //aes解密
                let domainData = aesHandler.DecryptBase64(aesdata, this.HTTP_AES_KEY);
                console.log("domainData:::" + domainData);
                //解析json
                let domainJson = JSON.parse(domainData);
                //读取domain数据
                let domain = domainJson.domain;
                for (let index = 0; index < domain.length; index++) {
                    let dodata = domain[index];
                    loginserver = dodata.api;
                    if (loginserver) {
                        this._loginServerList.push(loginserver);
                        let data: ServerInfo = new ServerInfo();
                        data.web_server = dodata.api;
                        data.data_server = dodata.data;
                        data.gate_server = dodata.h5;
                        data.image_server = dodata.qiniu;
                        data.image_server_2 = dodata.qiniu2;
                        data.pkt_shop = dodata.ucenter;
                        data.recaptcha = dodata.recaptcha;
                        data.kyc = dodata.kyc;
                        data.top_matches_h5 = dodata.top_matches_h5;
                        data.top_matches = dodata.top_matches;
                        data.image_server_wpk = dodata.wpk;
                        data.image_server_wpto = dodata.wpto;
                        if (data.image_server_2 != null && data.image_server_2.length > 0 && data.recaptcha != null && data.recaptcha.length > 0) {
                            this._domainStore.push(data);
                        }
                    }
                }
            }
        } else {
            //"lastLogin"
            let filepath = path + this.SERVE_FILE_PATH + this.LASTLOGIN;
            console.log("filepath:" + filepath);
            if (cc.sys.isNative && jsb.fileUtils.isFileExist(filepath)) {
                let lastloginBaseStr = jsb.fileUtils.getStringFromFile(filepath);
                let lastloginStr = cv.base64.decode(lastloginBaseStr);
                let lastloginJason = JSON.parse(lastloginStr);
                loginserver = lastloginJason.api;

                if (cv.StringTools.earseSpace(loginserver).length > 0) {
                    this._loginServerList.push(loginserver);
                    let data: ServerInfo = new ServerInfo();
                    data.web_server = lastloginJason.api;
                    data.data_server = lastloginJason.data;
                    data.gate_server = lastloginJason.h5;
                    data.image_server = lastloginJason.qiniu;
                    data.image_server_2 = lastloginJason.qiniu2;
                    data.pkt_shop = lastloginJason.ucenter;
                    data.recaptcha = lastloginJason.recaptcha;
                    data.kyc = lastloginJason.kyc;
                    data.top_matches_h5 = lastloginJason.top_matches_h5;
                    data.top_matches = lastloginJason.top_matches;
                    data.image_server_wpk = lastloginJason.wpk;
                    data.image_server_wpto = lastloginJason.wpto;
                    console.log("lastloginJason:web_server:" + data.web_server);
                    if (data.gate_server.indexOf("ws") != -1 && data.image_server_2 != null && data.image_server_2.length > 0 && data.recaptcha != null && data.recaptcha.length > 0) {
                        this._domainStore.push(data);
                    }
                }
            }
            //"login"
            filepath = path + this.SERVE_FILE_PATH + this.LOGINDOMAIN;
            if (cc.sys.isNative && jsb.fileUtils.isFileExist(filepath)) {
                let lastloginBaseStr = jsb.fileUtils.getStringFromFile(filepath);
                let lastloginStr = cv.base64.decode(lastloginBaseStr);
                let lastloginJason = JSON.parse(lastloginStr);
                for (let i = 0; i < lastloginJason.length; i++) {
                    loginserver = lastloginJason[i].api;
                    if (cv.StringTools.earseSpace(loginserver).length > 0) {
                        this._loginServerList.push(loginserver);
                        console.log("initLoginServer path login:" + loginserver);
                        let data: ServerInfo = new ServerInfo();
                        data.web_server = lastloginJason[i].api;
                        data.data_server = lastloginJason[i].data;
                        data.gate_server = lastloginJason[i].h5;
                        data.image_server = lastloginJason[i].qiniu;
                        data.image_server_2 = lastloginJason[i].qiniu2;
                        data.pkt_shop = lastloginJason[i].ucenter;
                        data.recaptcha = lastloginJason[i].recaptcha;
                        data.kyc = lastloginJason[i].kyc;
                        data.top_matches_h5 = lastloginJason[i].top_matches_h5;
                        data.top_matches = lastloginJason[i].top_matches;
                        data.image_server_wpk = lastloginJason[i].wpk;
                        data.image_server_wpto = lastloginJason[i].wpto;
                        if (data.gate_server.indexOf("ws") != -1 && data.image_server_2 != null && data.image_server_2.length > 0 && data.recaptcha != null && data.recaptcha.length > 0) {
                            this._domainStore.push(data);
                        }
                    }
                }
            }
            if (cv.config.IS_BRANCH() && cv.config.GET_DEBUG_MODE() == 1) {
                loginserver = cv.config.getStringData("WEB_API_HEAD_DEBUG_BRANCH", true);
                if (cv.StringTools.earseSpace(loginserver).length != 0) {
                    this._loginServerList.push(loginserver);
                }
            } else {
                loginserver = cv.config.GET_DEBUG_MODE() ? cv.config.getStringData("WEB_API_HEAD_DEBUG", true) : cv.config.getStringData("WEB_API_HEAD", true);
                if (cv.StringTools.earseSpace(loginserver).length != 0) {
                    this._loginServerList.push(loginserver);
                }
                loginserver = cv.config.GET_DEBUG_MODE() ? cv.config.getStringData("WEB_API_HEAD_DEBUG_SPARE", true) : cv.config.getStringData("WEB_API_HEAD_SPARE", true);
                if (cv.StringTools.earseSpace(loginserver).length != 0) {
                    this._loginServerList.push(loginserver);
                }
            }
            console.log(this._loginServerList);
        }
    }

    /**
     * 写入这一次登陆成功的域名组
     */
    public writeLastLogin() {
        if (!cc.sys.isNative) return;
        if (this._domain.length <= this._domain_index) return;
        this.reset_reconnet_num();
        let info = this.getServerInfo();
        if (info.invalid) return;
        let json_obj = {
            "api": info.web_server,
            "qiniu": info.image_server,
            "qiniu2": info.image_server_2,
            "data": info.data_server,
            "h5": info.gate_server,
            "ucenter": info.pkt_shop,
        };
        let jsondata: string = JSON.stringify(json_obj);
        let base64String = cv.base64.encode(jsondata);
        //文件夹路径是否存在
        let path = jsb.fileUtils.getWritablePath() + this.SERVE_FILE_PATH;
        console.log("writeLastLogin path : ", path);
        if (!jsb.fileUtils.isDirectoryExist(path)) {
            jsb.fileUtils.createDirectory(path);
        }
        let filepath = path + this.LASTLOGIN;
        let isWritten = jsb.fileUtils.writeStringToFile(base64String, filepath);
        console.log("writeLastLogin Status : ", isWritten);
    }

    /**
     * 获取当前登陆服域名
     */
    public getLoginServer(): string {
        console.log("this._loginServerList_index:" + this._loginServerList_index);
        console.log("this._loginServerList_index:" + this._loginServerList[this._loginServerList_index]);
        return this._loginServerList[this._loginServerList_index]
    }
    /**
     * 存储登陆成功下发的域名
     * @param data 
     */
    public saveDomain(data) {
        if (!cc.sys.isNative) return;
        let domain = JSON.stringify(data.domain);
        let path = jsb.fileUtils.getWritablePath() + cv.domainMgr.SERVE_FILE_PATH;
        if (!jsb.fileUtils.isDirectoryExist(path)) {
            jsb.fileUtils.createDirectory(path);
        }

        let base64Str = cv.base64.encode(domain);

        let filepath = path + this.LOGINDOMAIN;
        let isWritten = jsb.fileUtils.writeStringToFile(base64Str, filepath);
        console.log("saveDomain login isWritten:" + isWritten);

        filepath = path + this.CDN;
        isWritten = jsb.fileUtils.writeStringToFile(data.cdn, filepath);
        console.log("saveDomain cnd isWritten:" + isWritten);
    }

    /**
     * 切换到下一个登陆服域名
     */
    public switchLoginServer() {
        if (!this.isHaveNextLoginServer()) return;
        this._loginServerList_index++
    }

    /**
     * 检测是否还有可连接的登陆服域名
     */
    public isHaveNextLoginServer(): boolean {
        if (this._loginServerList.length == 0) return false;
        if (this._loginServerList_index >= this._loginServerList.length - 1) return false;
        return true;
    }

    /**
     *  重置可连接次数
     */
    public reset_reconnet_num() {
        this._domain_reconnect_num = 0;
    }

    /**
     * 获取当前的域名组信息
     */
    public getServerInfo(): ServerInfo {
        if (this._domain_index < 0 || this._domain_index >= this._domain.length) {
            let data: ServerInfo = new ServerInfo();
            data.invalid = true;
            return data;
        } else {
            return this._domain[this._domain_index];
        }
    }

    /**
     * 检测是否还有可连接的域名组
     */
    public isHaveNextServer(): boolean {
        console.log("isHaveNextServer:: this._domain.length" + this._domain.length);
        if (this._domain.length == 0) return false;
        console.log("isHaveNextServer:: this._domain_reconnect_num" + this._domain_reconnect_num);
        if (this._domain_reconnect_num >= this._domain.length - 1) return false;
        return true;
    }

    /**
     * 切换线路 切换到下一组域名
     */
    public switchServer(): boolean {
        if (this._domain.length == 0) return false;
        this._domain_index++;
        this._domain_reconnect_num++;
        if (this._domain_index >= this._domain.length) {
            this._domain_index = 0;
        }
        return true;
    }

    /**
     * 获取CDN URL
     */
    public getCdnUrl(): string {
        /*
        解码本地配置文件中的字符串
        let key = this.HTTP_AES_KEY;
        let cde =cv.config.getStringData("WEB_API_CDN", true);
        let str = aesHandler.DecryptBase64(cde, key);
        console.log(str);
        cde = cv.config.getStringData("WEB_API_DEBUG_CDN", true);
        str = aesHandler.DecryptBase64(cde, key);
        console.log(str);
        return;*/
        let path = jsb.fileUtils.getWritablePath();
        let filepath = path + this.SERVE_FILE_PATH + this.CDN;
        if (jsb.fileUtils.isFileExist(filepath)) {
            let cdnBase64String = jsb.fileUtils.getStringFromFile(filepath);
            console.log("getCdn cdnBase64String:" + cdnBase64String);
            return cv.StringTools.earseSpace(cdnBase64String);
        }
        else {
            return cv.config.GET_DEBUG_MODE() ? cv.config.getStringData("WEB_API_DEBUG_CDN", true) : cv.config.getStringData("WEB_API_CDN", true);
        }
    }

    /**
     * 执行域名轮询 线路轮询
     * xhr
     * url  以请求的URL作为标记
     */
    public pollingDomain(xhr: XMLHttpRequest, url) {
        if (this._domain.length == 0) {
            if (this.isHaveNextLoginServer()) {
                this.switchLoginServer();
                let serverInfo = cv.http.getRequestInfo(url);
                cv.MessageCenter.send("responseFailed_get_resource_url", cv.StringTools.formatC(cv.config.getStringData("Hotupdate_ConnectingtoLine"), this._loginServerList_index + 1));
                //重发此消息
                cv.http.sendRequest(serverInfo.server_interface_nme, serverInfo.jsonData, serverInfo.handler, serverInfo.requestType, serverInfo.parseType, serverInfo.isshowloading);
                return;
            }
            else {
                //this.showError();
                //return;
                if (!this._isLoginError) {
                    //网页版直接提示，不可用。
                    if (!cc.sys.isNative) {
                        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                            cv.netWorkManager.onGoLogout();
                        }
                        else {
                            cv.TT.showMsg(cv.config.getStringData("ErrorToast33"), cv.Enum.ToastType.ToastTypeError);
                        }
                        return;
                    }
                    //测试环境支线版本暂时还没有配置cdn文件
                    if (cv.config.IS_BRANCH() && cv.config.GET_DEBUG_MODE()) {
                        cv.TT.showMsg(cv.config.getStringData("ErrorToast33"), cv.Enum.ToastType.ToastTypeError);
                        cv.MessageCenter.send("gotoloadres");
                        return;
                    }
                    this._isLoginError = true;
                    this._lastFailServerName = url;
                    cv.http.requestUrl(this._baiduUrl, this._onLinkBaiDu.bind(this), this._onDownloadError.bind(this));
                    return;
                }
                else {
                    this._isLoginError = false;
                    this.initLoginServer();
                }
            }
        }

        this.showError();

        if (url == cv.config.getStringData("WEB_API_UPLOAD_VOICE", true)) {
            cv.MessageCenter.send("on_upload_voice_done");
        }
        return;
    }

    /**
     * 请求百度成功，验证网络没问题
     */
    public _onLinkBaiDu() {
        let cdnStr = this.getCdnUrl();
        let cdnUrl = aesHandler.DecryptBase64(cdnStr, this.HTTP_AES_KEY);
        console.log("_onLinkBaiDu cdnUrl:" + cdnUrl);
        if (cdnUrl == undefined || cdnUrl == "") {
            console.log("cdnUrl Error ECB_AESDecrypt is error !");
            this.showError();
            return;
        }
        //通过解码的URL下载域名文件
        cv.http.requestDownload(cdnUrl, this._onDownloadCdnCallback.bind(this), this._onDownloadError.bind(this), this.CDN_FILE_NAME);
    }

    /**
     * 下载cdn文件成功
     */
    private _onDownloadCdnCallback(response: any, url: string, fileName: string) {
        let path = jsb.fileUtils.getWritablePath() + this.DOWNLOAD_IMAGE_FOLDER;
        if (!jsb.fileUtils.isDirectoryExist(path)) {
            jsb.fileUtils.createDirectory(path);
        }
        path += fileName;
        if (jsb.fileUtils.isFileExist(path)) {
            jsb.fileUtils.removeFile(path);
        }
        console.log("cnd write path:" + path);
        let writeStatus = jsb.fileUtils.writeDataToFile(new Uint8Array(response), path);
        console.log("writeStatus:" + writeStatus);
        this.initLogin();
        let serverInfo = cv.http.getRequestInfo(this._lastFailServerName);
        console.log("server_interface_nme::" + serverInfo.server_interface_nme);
        cv.http.sendRequest(serverInfo.server_interface_nme, serverInfo.jsonData, serverInfo.handler, serverInfo.requestType, serverInfo.parseType, serverInfo.isshowloading);
    }

    /**
     * 下载文件失败
     */
    private _onDownloadError() {
        this._isLoginError = false;
        this.initLoginServer();
        this.showError();
    }

    /**
     * 获取完整图片地址
     * @param name      后缀名
     * @param platform  平台值(默认: 0, 其他值请参考该接口的实现注释)
     * @detail 踩坑提示: 如果是本地系统头像, 后缀不能是纯数字且需要上传到服务器(纯数字已被原始逻辑使用...)
     */
    public getImageURL(name: string, platform: number = 0): string {
        let url: string = cv.String(name);

        if (this._domain_index >= 0 && this._domain_index < this._domain.length) {
            let info: ServerInfo = this._domain[this._domain_index];

            switch (platform) {
                // pkw
                // mmp
                case 0:
                case 3: {
                    // 移植的旧逻辑
                    // if (cv.config.GET_CLIENT_TYPE() !== cv.Enum.ClientType.CowboyWeb) {
                    //     url = url.substr(url.lastIndexOf("/") + 1);
                    //     url = cv.String(info.image_server) + url;
                    // }

                    if (url.indexOf('http') === -1) {
                        url = cv.String(info.image_server) + url;
                    }
                } break;

                // wpk
                case 1: {
                    // 移植的旧逻辑
                    // if (url.indexOf('http') === -1) {
                    //     url = url.substr(url.lastIndexOf("/") + 1);
                    //     url = cv.String(info.image_server_wpk) + url;
                    // }

                    if (url.indexOf('http') === -1) {
                        url = cv.String(info.image_server_wpk) + url;
                    }
                } break;

                // bl
                case 2: break;

                // wpto
                case 4: {
                    if (url.indexOf('http') === -1) {
                        url = cv.String(info.image_server_wpto) + url;
                    }
                } break;
            }
        }

        return url;
    }

    //显示连接错误
    public showError() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            cv.netWorkManager.onGoLogout();
        }
        else if (cv.config.getCurrentScene() == cv.Enum.SCENE.HOTUPDATE_SCENE) {
            cv.MessageCenter.send("responseFailed_get_resource_url", cv.config.getStringData("ErrorToast33"));
        } else {
            cv.TT.showMsg("LinkError" + cv.config.getStringData("ErrorToast33"), cv.Enum.ToastType.ToastTypeError);
            cv.SwitchLoadingView.hide();
        }
    }

    /**
     * 设置默认上传图片服务域名
     * @param server 
     */
    public setDefultImgServer(server: string) {
        this.defult_imgSever = server;
    }

    /**
     * 获取默认的上传图片的域名
     */
    public getDefultImgServer(): string {
        return this.defult_imgSever;
    }

    /**
     * 设置默认上传图片服务域名2
     * @param server 
     */
    public setDefultImgServer2(server: string) {
        this.defult_imgSever2 = server;
    }

    /**
     * 获取默认的上传图片的域名2
     */
    public getDefultImgServer2(): string {
        return this.defult_imgSever2;
    }

    /**
     * set_api_url
     */
    public set_api_url(url: string) {
        this._api_url = url;
    }

    /**
     * get_api_url
     */
    public get_api_url(): string {
        return this._api_url;
    }

    /**
     * 获取体育赛事地址
     */
    public getSportUrl(): string {
        let url: string = cv.String(this.getServerInfo().sports_server);

        // 本地数据不存在的情况
        if (url.length <= 0) {
            for (let i = 0; i < this._domain.length; ++i) {
                url = cv.String(this._domain[i].sports_server);
                if (url.length > 0) break;
            }
        }

        return url;
    }

    /**
     * 获取电子游戏地址
     */
    public getPocketGamesUrl(): string {
        let url: string = cv.String(this.getServerInfo().pocket_games);

        // 本地数据不存在的情况
        if (url.length <= 0) {
            for (let i = 0; i < this._domain.length; ++i) {
                url = cv.String(this._domain[i].pocket_games);
                if (url.length > 0) break;
            }
        }

        return url;
    }

    /**
     * 获取一起看球地址
     */
    public getTopMatchesUrl(): string {
        let url: string = cv.String(this.getServerInfo().top_matches_h5);

        // 本地数据不存在的情况
        if (url.length <= 0) {
            for (let i = 0; i < this._domain.length; ++i) {
                url = cv.String(this._domain[i].top_matches_h5);
                if (url.length > 0) break;
            }
        }

        return url;
    }

    /**
     * 获取一起看球"logo"地址前缀
     */
    public getTopMatchesLogoUrl(): string {
        let url: string = cv.String(this.getServerInfo().top_matches);

        // 本地数据不存在的情况
        if (url.length <= 0) {
            for (let i = 0; i < this._domain.length; ++i) {
                url = cv.String(this._domain[i].top_matches);
                if (url.length > 0) break;
            }
        }

        return url;
    }

    /**
     * 获取"KYC"域名
     */
    public getJumioKYCUrl(): string {
        let url: string = cv.String(this.getServerInfo().kyc);

        // 本地数据不存在的情况
        if (url.length <= 0) {
            for (let i = 0; i < this._domain.length; ++i) {
                url = cv.String(this._domain[i].kyc);
                if (url.length > 0) break;
            }
        }

        return url;
    }

    public static getInstance(): DomainMgr {
        if (!DomainMgr._g_instence) {
            DomainMgr._g_instence = new DomainMgr();
        }
        return DomainMgr._g_instence;
    }
}