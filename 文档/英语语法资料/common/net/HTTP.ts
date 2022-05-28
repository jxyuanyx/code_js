import cv from "../../components/lobby/cv";
import * as pako from "./../pako/pako";

/**
 * http 请求类型
 */
enum HttpRequestType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    UNKNOWN = "unknown"
}

/**
 * http 解析类型
 */
enum HttpParseType {
    NONE = 0,           // 无 (默认完整参数)
    SEND_ZIP,           // 发送端 zip (去掉签名等参数)
    RECEIVE_ZIP,        // 接收端 zip (去掉签名等参数)
    BOTH_ZIP            // 发送接收都 zip (去掉签名等参数)
}

// HTTP请求信息
export class RequestInfo {
    //请求数据
    jsonData: Object = null;
    //接口名称
    server_interface_nme: string = "";
    //回调
    handler: Function = null;
    //请求类型(默认 POST)
    requestType: HttpRequestType = null;
    //解析类型(默认 NONE)
    parseType: HttpParseType = null;
    //是否显示loading(默认 true)
    isshowloading: boolean = true;
}
export class HTTP {
    private static _g_instence: HTTP = null;

    public HttpParseType = HttpParseType;
    public HttpRequestType = HttpRequestType;
    public CONN_TIME_OUT: number = 10;
    public READ_TIME_OUT: number = 10;

    private _requestInfoMap: RequestInfo[] = [];
    private _pako: any = null;

    /**
     * 获取请求数据
     */
    public getRequestInfo(url: string): RequestInfo {
        return this._requestInfoMap[url];
    }

    /**
     * 清除缓存数据
     */
    public clearRequestInfo() {
        this._requestInfoMap.splice(0, this._requestInfoMap.length - 1);
    }

    /**
     * 发送 pos http 请求(上传资源用)
     * @param data           发送数据包
     * ｛
     * url               url 地址
     * jsondata          json 字串
     * handler           回调函数
     * parseType         解析类型(默认 NONE)
     * isshowloading     是否显示loading(默认 true)
     * ｝
     */
    public sendPostRequest(data:any)
    {
        let url = data.url;
        let jsondata = data.jsondata;
        let handler = data.handler;
        let parseType = data.parseType;
        let isshowloading = data.isshowloading;
        let serverInfo = cv.domainMgr.getServerInfo();
        let head = "";
        let tempUrl = url;
        if (tempUrl.search("http") === -1){
            if (serverInfo.invalid) {
                head = cv.domainMgr.getDefultImgServer2();
            }
            else {
                head = serverInfo.image_server_2;
            }
            url = head + tempUrl;
        }
        this.sendRequest(url, jsondata, handler, HttpRequestType.POST, parseType, isshowloading);
    }
    /**
     * 发送 http 请求
     * @param url           url 地址
     * @param jsondata      json 字串
     * @param handler       回调函数
     * @param requestType   请求类型(默认 POST)
     * @param parseType     解析类型(默认 NONE)
     * @param isshowloading     是否显示loading(默认 true)
     */
    public sendRequest(url: string, json_obj: object, handler: Function, requestType?: HttpRequestType, parseType?: HttpParseType, isshowloading: boolean = true, isRecaptchaRq:boolean = false): any {
        if (!cv.native.CheckNetWork()) {
            let curscene = cc.director.getScene();
            if (curscene.name == "HotUpdate") return "no_wifi";
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                cv.netWorkManager.onGoLogout();
            }
            else {
                cv.TT.showMsg(cv.config.getStringData("ErrorToast33"), cv.Enum.ToastType.ToastTypeError);
            }
            console.log("没有网络");
            cv.SwitchLoadingView.hide();
            return;
        }
        //存储HTTP请求数据
        if (!this._requestInfoMap[url]) {
            this._requestInfoMap[url] = new RequestInfo();
        }
        this._requestInfoMap[url].jsonData = json_obj;
        this._requestInfoMap[url].server_interface_nme = url;
        this._requestInfoMap[url].handler = handler;
        this._requestInfoMap[url].requestType = requestType;
        this._requestInfoMap[url].parseType = parseType;
        this._requestInfoMap[url].isshowloading = isshowloading;

        requestType = !requestType ? HttpRequestType.POST : requestType;
        parseType = !parseType ? HttpParseType.NONE : parseType;

        if (json_obj === null || typeof json_obj === "undefined") {
            json_obj = {};
        }

        // "json_obj" 统一添加额外字段 Recaptcha请求不需要我们的格式
        if(!isRecaptchaRq){
            json_obj["clientType"] = cv.config.GET_CLIENT_TYPE();
            json_obj["language"] = cv.config.getCurrentLanguage();
        }
        

        let jsondata: string = JSON.stringify(json_obj);
        let xhr = new XMLHttpRequest();
        let CodeSign = cv.md5.CreateSign(jsondata);
        let Data = "data=";
        let And = "&";
        let Sign = "sign=";
        let Parm ="";
        //Recaptcha请求不需要我们的格式
        if(isRecaptchaRq){
            Parm = jsondata;
        }else{
            Parm = Data + jsondata + And + Sign + CodeSign;
        }
        
        let tempUrl = url;

        if (tempUrl.search("http") === -1) {
            //优先使用服务器下发的域名
            if (cv.StringTools.getArrayLength(cv.domainMgr.get_api_url()) > 0) {
                url = cv.domainMgr.get_api_url() + tempUrl;
            } else {
                let head = "";
                let serverInfo = cv.domainMgr.getServerInfo();
                console.log("HTTP::getServerId:: " + cv.dataHandler.getServerId());
                //开发服和本地服走这里
                if (cv.dataHandler.getServerId() < cv.Enum.ServerButtonType.ServerButtonType_max && cv.dataHandler.getServerId() > cv.Enum.ServerButtonType.ServerButtonType_none) {
                    head = cv.config.getStringData("WEB_API_HEAD_DEVELOP", true);
                }
                //特殊标记（当前为正式服包，切换为连接测试服进行测试。）
                else if (cv.dataHandler.getServerId() == cv.Enum.ServerButtonType.ServerButtonType_special) {
                    head = cv.config.getStringData("WEB_API_HEAD_DEBUG", true);
                }
                //正常原有逻辑有缓存走缓存，没有走本地配置服务器域名。
                else {
                    if (serverInfo.invalid) {
                        head = cv.domainMgr.getLoginServer();
                    }
                    else {
                        head = serverInfo.web_server;
                    }
                }
                url = head + tempUrl;
            }
        }

        // 解析类型
        switch (parseType) {
            case HttpParseType.NONE: break;
            case HttpParseType.RECEIVE_ZIP: break;
            case HttpParseType.SEND_ZIP:
            case HttpParseType.BOTH_ZIP: {
                Parm = jsondata;
                url = cv.domainMgr.getServerInfo().data_server + tempUrl;
                break;
            }
            default: break;
        }

        xhr.open(requestType, url, true);
        console.log("httpurl****::" + url);
        console.log("Parm******::" + Parm);
        xhr.timeout = this.CONN_TIME_OUT * 1000;
        // 请求类型
        switch (requestType) {
            case HttpRequestType.GET: {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
                xhr.setRequestHeader("X-SessionId", cv.dataHandler.getUserData().user_token);
                xhr.setRequestHeader("X-UserId", cv.dataHandler.getUserData().user_id);
            } break;

            case HttpRequestType.POST: {
                if(isRecaptchaRq){
                    xhr.setRequestHeader("Content-Type", "application/json");
                }else{
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                }
                xhr.setRequestHeader("X-SessionId", cv.dataHandler.getUserData().user_token);
                xhr.setRequestHeader("X-UserId", cv.dataHandler.getUserData().user_id);
            } break;

            case HttpRequestType.PUT: {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("X-SessionId", cv.dataHandler.getUserData().user_token);
                xhr.setRequestHeader("X-UserId", cv.dataHandler.getUserData().user_id);
            } break;
            case HttpRequestType.UNKNOWN: break;

            default: break;
        }

        /*
        * readyState 状态
        * 0 XMLHttpRequest 对象还没有完成初始化
        * 1 XMLHttpRequest 对象开始发送请求
        * 2 XMLHttpRequest 对象的请求发送完成
        * 3 XMLHttpRequest 对象开始读取服务器的响应
        * 4 XMLHttpRequest 对象读取服务器响应结束
        */

        /*
        * status 状态
        * 0   本地响应成功
        * 1xx 信息类，表示收到Web浏览器请求，正在进一步的处理中。如，100：客户必须继续发出请求；101：客户要求服务器根据请求转换HTTP协议版本
        * 2xx 成功，表示用户请求被正确接收，理解和处理。例如，200：OK；201：提示知道新文件的URL
        * 3xx 重定向，表示请求没有成功，客户必须采取进一步的动作。如，300：请求的资源可在多处得到；301：删除请求数据
        * 4xx 客户端错误，表示客户端提交的请求有错误。如，404：NOT Found，意味着请求中所引用的文档不存在
        * 5xx 服务器错误，表示服务器不能完成对请求的处理。如，500，服务器产生内部错误
        */

        // 添加监听事件
        do {
            let abort: () => void = (): any => {
                console.log(cv.StringTools.format("XMLHttpRequest-Event - > abort [readyState = {0}, status = {1}, statusText = {2}]"
                    , xhr.readyState, xhr.status, xhr.statusText));
                cv.KYCLoadingView.hide(true);
            };

            let error: () => void = (): any => {
                console.log(cv.StringTools.format("XMLHttpRequest-Event - > error [readyState = {0}, status = {1}, statusText = {2}]"
                    , xhr.readyState, xhr.status, xhr.statusText));
                //handler(jsondata);
                if (isshowloading) {
                    cv.LoadingView.removeHttpMsg(url);
                }
                cv.KYCLoadingView.hide(true);
                console.log("http 连接出错*********");
                cv.domainMgr.pollingDomain(xhr, tempUrl);
            };

            let timeout: () => void = (): any => {
                console.log(cv.StringTools.format("XMLHttpRequest-Event - > timeout [readyState = {0}, status = {1}, statusText = {2}]"
                    , xhr.readyState, xhr.status, xhr.statusText));
                //handler(jsondata);
                if (isshowloading) {
                    cv.LoadingView.removeHttpMsg(url);
                }
                cv.KYCLoadingView.hide(true);
                console.log("http 连接超时*********");
                cv.domainMgr.pollingDomain(xhr, tempUrl);
            };

            let readystatechange = function () {
                console.log(`readystatechange:xhr.readyState == ${xhr.readyState} ,xhr.status=${xhr.status}`);
                /**
                 * 连接成功，返回成功
                 */
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    let respone: string = xhr.responseText;
                    //console.log("XMLHttpRequest respone = " + respone);

                    switch (parseType) {
                        case HttpParseType.NONE: break;
                        case HttpParseType.SEND_ZIP: break;

                        case HttpParseType.RECEIVE_ZIP:
                        case HttpParseType.BOTH_ZIP: {//压缩数据，解压之后再处理
                            let strData = window.atob(respone);
                            // Convert binary string to character-number array
                            let charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
                            // Turn number array into byte-array
                            let binData = new Uint8Array(charData);
                            // unzip
                            respone = this._pako.inflate(binData, { to: 'string' });
                            // Convert gunzipped byteArray back to ascii string:
                            //respone = String.fromCharCode.apply(null, new Uint16Array(data));
                        } break;

                        default: break;
                    }

                    try {
                        let ret = JSON.parse(respone);
                        if (handler !== null) {
                            if (typeof (ret.msg_code) != "undefined" && ret.msg_code != "0") {
                                let getsceUrl = cv.config.getStringData("WEB_API_HEAD", true) + cv.config.getStringData("WEB_API_GET_RESOURCE_URL", true);
                                if (url != getsceUrl) {
                                    if (cv.httpHandler != null) {
                                        cv.httpHandler.tipsMsg(ret);
                                    }
                                }
                            }
                            if (isshowloading) {
                                if (cv.LoadingView != null) {
                                    cv.LoadingView.removeHttpMsg(url);
                                }
                            }
                            handler(ret);
                        }
                    } catch (e) {
                        console.error("http err:" + e);
                    }
                    finally {
                        // xhr.abort();  //Z
                    }
                    cv.KYCLoadingView.hide();
                }
                /**
                 * 连接失败，尝试用下一个域名重发此消息
                 */
                else {
                    cv.KYCLoadingView.hide(true);
                }
            }
            // let readystatechange: () => void = (): void => {
            //     //console.log(cv.StringTools.format("XMLHttpRequest readyState = {0}, status = {1}, statusText = {2}",
            //     //xhr.readyState, xhr.status, xhr.statusText));

            // };

            xhr.onabort = abort; //Z
            xhr.onerror = error;
            xhr.ontimeout = timeout;
            xhr.onreadystatechange = readystatechange;
        } while (false);

        if (Parm.length < 100) {
            console.log("XMLHttpRequest param = " + Parm);
        }

        console.log("XMLHttpRequest url = " + url);
        console.log("XMLHttpRequest timeout = " + xhr.timeout);

        xhr.send(Parm);
        if (isshowloading) {
            cv.LoadingView.addHttpMsg(url);
        }
        return xhr;
    }

    /**
     * 普通的http请求
     */
    public requestUrl(url: string, sucCallBack: Function, failCallBack: Function) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                    console.log(xhr.responseURL);
                    if (sucCallBack) sucCallBack(xhr.response);
                } else {
                    if (failCallBack) failCallBack(xhr.response);
                }
            }
        }.bind(this);
        xhr.send();
    }

    /**
     * 下载文件
     */
    public requestDownload(url: string, sucCallBack: Function, failCallBack: Function, fileName: string) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("xhr.response*************");
                    console.log(xhr.response);
                    if (sucCallBack) sucCallBack(xhr.response, url, fileName);
                } else {
                    if (failCallBack) failCallBack();
                }
            } else {
                if (failCallBack) failCallBack();
            }
        }.bind(this);
        xhr.send();
    }

    unzip(response: string): string {
        let strData = window.atob(response);
        // Convert binary string to character-number array
        let charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
        // Turn number array into byte-array
        let binData = new Uint8Array(charData);
        // unzip
        response = this._pako.inflate(binData, { to: 'string' });
        // Convert gunzipped byteArray back to ascii string:
        //respone = String.fromCharCode.apply(null, new Uint16Array(data));
        return response;
    }

    public static getInstance(): HTTP {
        if (!HTTP._g_instence) {
            HTTP._g_instence = new HTTP();
            HTTP._g_instence._pako = pako;
        }
        return HTTP._g_instence;
    }
}
