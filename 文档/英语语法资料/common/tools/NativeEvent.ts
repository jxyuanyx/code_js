import cv from "../../components/lobby/cv";
import { NativeEventCMD, NATIVE_KEY_MAP } from "./NativeEventCMD";
import { CAFInfo } from "../../components/game/dzPoker/data/RoomData";
import SafeTakOutDialog from "../../components/lobby/hall/SafeTakeOutDialog";
import { SystemSetting } from "../../components/lobby/hall/SystemSetting";
import { ConnectServerFailedReason } from "./Enum";

let className;
let nativeFuncName;
let uuid = "";


//私语平台返回值
let SY_isEmulaotr: boolean = false; //是否是安卓模拟器
let SY_deviceId: string = null; //是否是安卓模拟器
let SY_positionInfo: string = null; //经纬度
let SY_batteryInfo: string = null; //私语电量信息
let SY_systemLan: string = null; //系统语言
let SY_clipboardStr: string = null; //剪切板内容
let SY_isIpad: boolean = false; //剪切板内容


if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
    className = "NativeEvent";
    nativeFuncName = "call_native:";
} else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
    className = "org/cocos2dx/javascript/NativeEvent";
    nativeFuncName = "call_native";
}

export class NativeEvent {
    private static instance: NativeEvent;

    private _supportWebPos: boolean = false;  //浏览器是否支持
    private _positionInfo: string = null;
    private _latitude: number = 0;
    private _longitude: number = 0;

    public static getInstance(): NativeEvent {
        if (!this.instance) {
            this.instance = new NativeEvent();
        }
        return this.instance;
    }

    // 处理非原生Android/iOS平台的特殊返回值
    private callSimulatorEvent(nativeKey: any, respMsgKey: any): string {
        if (nativeKey == NATIVE_KEY_MAP.KEY_IS_NETWORK_AVAILABLE) {
            return window.NativeStringReturnTrue;
        } else if (nativeKey == NATIVE_KEY_MAP.KEY_GET_LOCATION) {
            return JSON.stringify({
                latitude: 77.7777,
                longitude: 77.7777,
            });
        } else if (nativeKey == NATIVE_KEY_MAP.KEY_GET_SYS_LANGUAGE) {
            return "zh_CN";
        } else if (nativeKey == NATIVE_KEY_MAP.KEY_GET_DEVICE_INO) {
            return JSON.stringify({
                "disroot": false,
                "dmodel": "",
                "dname": "wefans",
                "duuid": "",
                "dversion": "",
            });
        }
        return "";
    }

    private callNativeEvent(object: any, method: any, respMsgKey: any, param: any, isSync: boolean): string {
        let strParam = JSON.stringify(param);
        let argObj = {
            param: strParam,
            isSync: isSync ? 1 : 0,
            respMsgKey: respMsgKey,
            object: object,
            method: method,
        }
        let jsonParam = JSON.stringify(argObj);

        let ret = "";
        if (cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod(className, nativeFuncName, jsonParam);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let sig = "(Ljava/lang/String;)Ljava/lang/String;";
            ret = jsb.reflection.callStaticMethod(className, nativeFuncName, sig, jsonParam);
        }
        //console.log("callNativeEvent:" + ret);
        return ret;
    }

    private invoke(nativeKey: any, param: any = {}, isSync: boolean): string {
        let event = NativeEventCMD.METHOD_MAP[nativeKey];
        if (!event) {
            console.log("Expection: cannot find nativeKey:" + nativeKey);
            return "";
        }
        if (nativeKey != NATIVE_KEY_MAP.KEY_IS_NETWORK_AVAILABLE) {
            console.log("NativeEvent invoke event:", event.obj, event.method, event.respMsgKey);
        }

        let strObj = event.obj;
        let method = event.method;
        let respMsgKey = event.respMsgKey ? event.respMsgKey : "";

        if (!strObj || !method) {
            console.log("Expection: object or method is nil, nativeKey:" + nativeKey);
            return "";
        }

        if (cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
            return this.callNativeEvent(strObj, method, respMsgKey, param, isSync);
        } else {
            return this.callSimulatorEvent(nativeKey, respMsgKey);
        }
    }

    // Android下: 在gl线程调用原生函数
    public invokeSyncFunc(nativeKey: any, param: any = {}): string {
        return this.invoke(nativeKey, param, true);
    }

    // Android下: 在UI线程调用原生函数，此时返回值没有意义
    public invokeAsynFunc(nativeKey: any, param: any = {}): string {
        return this.invoke(nativeKey, param, false);
    }

    public static OnNativeEventCallback(jsonStr: string): void {
        jsonStr = decodeURIComponent(jsonStr);
        cc.log("OnNativeEventCallback jsonStr:", jsonStr);
        let jsonParam = JSON.parse(jsonStr);
        if (jsonParam.respMsgKey) {
            cv.MessageCenter.send(jsonParam.respMsgKey, jsonParam);
        }
    }

    // 兼容老的native.ts的接口
    public CheckNetWork(): boolean {
        return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_IS_NETWORK_AVAILABLE) == window.NativeStringReturnTrue;
    }

    public GetLocation(): object {
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) {
            return {
                "latitude": 10,
                "longitude": 10,
            }
        }
        if (cc.sys.isNative) {
            let kLocation = JSON.parse(this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_LOCATION));
            if (cv.native.HaveGps(false) && (kLocation["latitude"] == 0 && kLocation["longitude"] == 0)) {
                return {
                    "latitude": 1,
                    "longitude": 1,
                }
            }
            else {
                return kLocation;
            }
        } else {

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage && SY_positionInfo != null) {  //私语平台
                return JSON.parse(SY_positionInfo);
            }

            return JSON.parse(this._positionInfo);
        }
    }

    public localIsZero(): boolean {
        let kLocation = this.GetLocation();
        return kLocation["latitude"] == 0 && kLocation["longitude"] == 0;
    }

    //初始化浏览器版本定位
    public initWebLocation() {
        this._positionInfo = JSON.stringify({
            "latitude": 0,
            "longitude": 0,
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.brower_showPosition.bind(this), this.brower_onError.bind(this));
        }
        else {
            this._supportWebPos = false;
            console.log("Geolocation is not supported by this browser.");
        }
    }

    public brower_showPosition(position) {
        this._supportWebPos = true;
        console.log("#################### showPosition latitue: " + position.coords.latitude);
        console.log("#################### showPosition longitude: " + position.coords.longitude);
        this._positionInfo = JSON.stringify({
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude,
        });

    }

    //网页版获取定位失败
    public brower_onError(error) {
        switch (error.code) {
            case 1:
                console.log("位置服务被拒绝");
                break;

            case 2:
                console.log("暂时获取不到位置信息");
                break;

            case 3:
                console.log("获取信息超时");
                break;

            case 4:
                console.log("未知错误");
                break;
        }

        this._supportWebPos = false;
    }
    /**
     * 获取设备唯一uuid
     * needInfo 需要更多其它设备信息
     */
    public GetDeviceUUID(needInfo: boolean = false, isDeleteDname: boolean = false): string {
        let uuid = "";
        if (cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
            uuid = cv.md5.md5(this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_DEVICE_UUID));
        }
        else {

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage && SY_deviceId != null) {  //如果是私语的平台
                uuid = cv.md5.md5(SY_deviceId);
            } else {
                uuid = this._getWebDeviceUUID();
            }
        }
        if (!needInfo) return uuid;
        let info = null;
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                info = { "dmodel": "android", "duuid": uuid };
            } else {
                info = { "dmodel": "iPhone", "duuid": uuid };
            }
            return JSON.stringify(info);
        } else {
            info = this.GenerateDeviceInfo();
        }
        let DeviceInfo = JSON.parse(info);
        console.log("替换uuid之前 info::" + info);
        DeviceInfo.duuid = uuid;
        console.log("替换uuid之后 DeviceInfo ::" + DeviceInfo);
        
        if(isDeleteDname){
            let lastDname = DeviceInfo.dname;
            console.log("去掉emoj表情之前 lastDname::" + lastDname);
            //将设备名称可能出现的表情emoj符号移除掉,直接赋值为''
            DeviceInfo.dname = '';
            console.log("去掉emoj表情之后 dname::" +  DeviceInfo.dname);
        }

        return JSON.stringify(DeviceInfo);
    }


    public _getWebDeviceUUID(): string {

        return "d41d8cd98f00b204e9800998ecf8427e";
        //浏览器版本，通过ClientJS插件生成device id
        var client = new window.ClientJS();
        let deviceCode = client.getFingerprint();
        if (deviceCode == "") {
            console.log("brower type  device uuid is null");
            uuid = cv.md5.md5("" + Math.random() * 10000000);
        } else {
            uuid = cv.md5.md5(deviceCode);
        }
        //console.log("###################### GetDeviceUUID uuid:" + uuid);
        return uuid;
    }

    public GetCurrentBatteryLevel(): number {
        return parseInt(this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_CURRENT_BATTERY_LEVEL));
    }

    public getSystemVolume(): string {
        return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_SYSTEM_VOLUME);
    }

    public GenerateDeviceInfo(): string {
        return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_DEVICE_INO);
    }

    public JumpToUpdateSite(url: any): void {
        this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_JUMP_TO_UPDATE_SITE, { "url": url });
    }

    public stringContainsEmoji(msg: string): boolean {
        return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_IS_CONTAINS_EMOJI, { content: msg }) == window.NativeStringReturnTrue;
    }

    public AnalysisCountEvent(kEventName: string, kEventValue: string) {

    }

    public IsSimulator(): boolean {
        //如果在白名单中 则模拟器允许使用
        if (cv.dataHandler.getUserData().isallowsimulator) {
            return false;
        }

        return this.judgeSimulator();
    }

    private judgeSimulator(): boolean {
        if (cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "emulatorCheck", "()I");
                console.log("IsSimulator ret=" + ret);
                return (ret == 1 ? true : false);
            }
            else {
                return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_IS_SIMULATOR) == "true";
            }
        }
        else {

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
                return SY_isEmulaotr;
            } else {
                return false;
            }

        }
    }

    showSimulatorTips(num: number, getGps: boolean): boolean {
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) return false;
        let isSimulator: boolean = cv.native.IsSimulator();
        if (isSimulator) {
            if (num > 0) {
                cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIEmulatorErrorText_1"), num), cv.Enum.ToastType.ToastTypeWarning);
            } else {
                cv.TT.showMsg(cv.config.getStringData("UIEmulatorErrorText"), cv.Enum.ToastType.ToastTypeWarning);
            }
            return true;
        }
        return false;
    }

    showGpsZeroError() {
        cv.TT.showMsg(cv.config.getStringData("ErrorToast30"), cv.Enum.ToastType.ToastTypeError);
    }

    public IsPad(): boolean {
        if (cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
            return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_IS_PAD) == "true";
        }
        else {
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage && cc.sys.os == cc.sys.OS_IOS) {
                return SY_isIpad;
            }
            return false;
        }
    }

    /**
     * 是否是全面屏(窄屏)
     */
    public isFullScreen(): boolean {
        return cv.config.IS_FULLSCREEN;
    }

    /**
     * 是否是宽屏
     */
    public isWideScreen(): boolean {
        if (this.IsPad()) {
            return true;
        }
        else {
            return cv.config.IS_WIDESCREEN;
        }
        // if (!cc.sys.isNative && cc.sys.isBrowser) {
        //     //如果是浏览器模拟ipad
        //     return cv.config.IS_WIDESCREEN;
        // }
        // return false;
    }

    calsld() {

    }

    /**
     * 获取剪切板内容
     */
    getClipBoardString(): string {
        let ret = "";
        if (cc.sys.isNative) {
            ret = cv.native.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_PASTEBOARD_STRING);
        }
        else if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            ret = cv.native.SYgetClipboardContent();
        }
        else {
            // 不同的浏览器 api 兼容/权限 不一样
            let func = (e: any): void => {
                ret = e.clipboardData.getData("text/plain");
                e.preventDefault();
            };
            document.addEventListener("paste", func);
            document.execCommand("paste");
            document.removeEventListener("paste", func);
        }
        return ret;
    }

    /**
     * 设置剪切板内容
     * @param txt 
     */
    setClipBoardString(txt: string): void {
        txt = cv.String(txt);
        if (cc.sys.isNative) {
            cv.native.invokeSyncFunc(NATIVE_KEY_MAP.KEY_SET_PASTEBOARDSTRING, { "text": txt });
        }
        else if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            //获取系统剪切版
            let cmd = "{\"cmd\": \"1013\", \"op\": 1, \"content\": \"%s\"}";
            cmd = cv.StringTools.formatC(cmd, txt);
            cv.native.SYwebjsToClient(cmd);
        }
        else if (cc.sys.isBrowser) {
            // 不同的浏览器 api 兼容/权限 不一样
            let func = (e: any): void => {
                e.clipboardData.setData("text/plain", txt);
                e.preventDefault();
            };
            document.addEventListener("copy", func);
            document.execCommand("copy");
            document.removeEventListener("copy", func);
        }
    }


    //播放广告视频
    //path: 广告视频保存的路径
    //width: 视频广告需要播放的宽
    //height: 视频广告播放的高度
    //fadeInMs: 视频广告淡入效果的时间 (毫秒)
    //fadeOutMs: 视频广告淡出效果的时间 (毫秒)
    //showCloseDelayMs: 显示关闭按钮的时间 (毫秒)
    //cutDownMs: 倒计时时间(毫秒)   0表示不显示
    // 视频关闭事件，通过注册 on_video_ad_close监听
    playVideoAD(path: string, width: number, height: number, fadeInMs: number = 0, fadeOutMs: number = 0,
        showCloseDelayMs: number = 1000, cutDownMs: number = 0) {
        let ret: string = "false";
        if (cc.sys.isNative) {
            ret = cv.native.invokeSyncFunc(NATIVE_KEY_MAP.KEY_PLAYVIDEOAD, {
                "path": path,
                "width": width,
                "height": height,
                "fadeInMs": fadeInMs,
                "fadeOutMs": fadeOutMs,
                "showCloseDelayMs": showCloseDelayMs,
                "cutDownMs": cutDownMs,
            });
        } else {
            ret = "false";
        }
        return ret;
    }
    /**
     * 设置竖屏
     */
    setPortrait(noChange?: boolean) {
        if (cv.config.HEIGHT > cv.config.WIDTH && !(cc.sys.isBrowser && cc.sys.isMobile) && cv.config.getCurrentScene() != cv.Enum.SCENE.HOTUPDATE_SCENE) {
            return;
        }

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                "changeOrientation", "(I)V", 1);
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_CALL_CHANGEORIENTATION, { "bool": "0" });
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        }
        else {

            if (this.IsSimulator() && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
                cv.native.SYwebjsToClient("{\"cmd\": \"1005\", op:0}");
            }

            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            if (cc.sys.isMobile && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) {
                return;
            }

        }

        if (noChange) {
            // let width = cc.view.getFrameSize().height > cc.view.getFrameSize().width ?
            //     cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            // let height = cc.view.getFrameSize().height < cc.view.getFrameSize().width ?
            //     cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            // console.log("noChange cc.view.getFrameSize().width:" + cc.view.getFrameSize().width);
            // cc.view.setFrameSize(width, height);
            // console.log("cv.config.DESIGN_WIDTH:" + cv.config.DESIGN_WIDTH + "  cv.config.DESIGN_HEIGHT:" + cv.config.DESIGN_HEIGHT);
            // cc.view.setDesignResolutionSize(cv.config.DESIGN_WIDTH, cv.config.DESIGN_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
            // let str = " D_W:" + cv.config.DESIGN_WIDTH + " D_H:" + cv.config.DESIGN_HEIGHT + " F_W:" + cc.view.getFrameSize().width + " F_H:" + cc.view.getFrameSize().height;
            return;
        }

        if ((cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) || cv.config.IS_WEBVIEW == false) {
            let width = cc.view.getFrameSize().height > cc.view.getFrameSize().width ?
                cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            let height = cc.view.getFrameSize().height < cc.view.getFrameSize().width ?
                cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            cc.view.setFrameSize(width, height);
            cc.view.setDesignResolutionSize(cv.config.DESIGN_WIDTH, cv.config.DESIGN_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
        }


        let temp = cv.config.DESIGN_HEIGHT;
        cv.config.DESIGN_HEIGHT = cv.config.DESIGN_WIDTH;
        cv.config.DESIGN_WIDTH = temp;

        temp = cv.config.HEIGHT;
        cv.config.HEIGHT = cv.config.WIDTH;
        cv.config.WIDTH = temp;
    }

    /**
     * 设置横屏
     */
    setLandscape() {
        if (cv.config.WIDTH > cv.config.HEIGHT && !(cc.sys.isBrowser && cc.sys.isMobile)) {
            return;
        }

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            //0横1竖
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                "changeOrientation", "(I)V", 0);
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_CALL_CHANGEORIENTATION, { "bool": "1" });
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        }
        else {

            if (cv.native.IsSimulator() && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
                cv.native.SYwebjsToClient("{\"cmd\": \"1005\", op: 1}");
            }
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            if (cc.sys.isMobile && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) {
                return;
            }
        }

        if ((cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) || cv.config.IS_WEBVIEW == false) {
            let width = cc.view.getFrameSize().height < cc.view.getFrameSize().width ?
                cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            let height = cc.view.getFrameSize().height > cc.view.getFrameSize().width ?
                cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            cc.view.setFrameSize(width, height);
            cc.view.setDesignResolutionSize(cv.config.DESIGN_HEIGHT, cv.config.DESIGN_WIDTH, cc.ResolutionPolicy.FIXED_WIDTH);
        }

        let temp = cv.config.DESIGN_HEIGHT;
        cv.config.DESIGN_HEIGHT = cv.config.DESIGN_WIDTH;
        cv.config.DESIGN_WIDTH = temp;

        temp = cv.config.HEIGHT;
        cv.config.HEIGHT = cv.config.WIDTH;
        cv.config.WIDTH = temp;
    }

    /**
     * 是否是横屏模式
     */
    isScreenLandscape(): boolean {
        let winSize: cc.Size = cc.winSize;
        return winSize.width > winSize.height;
    }

    /**
     * 开始录音
     */
    DoStartRecord(): boolean {
        let ret = true;
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "DoRecord", "(I)Z", 0);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            let resultStr = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_RECORD_START_RECORD);
            console.log("DoStartRecord  ios================ret:" + resultStr);
        }

        return ret;
    }

    //IOS开启麦克风权限
    AuthMicphone() {
        if (!cc.sys.isNative) {
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_CALL_AUTH_MICPHONE);
        }
    }

    /**
     * 停止录音
     */
    DoStopRecord(): boolean {
        let ret = true;

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "StopRecord", "(I)V", 0);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            let resultStr = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_RECORD_STOP_RECORD);
        }
        return ret;
    }

    /**
     * 播放自己录制好的录音音频 （IOS）
     */
    playLocalVoice() {
        if (!cc.sys.isNative) {
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_RECORD_PLAY_LOCALFILE);
        }
    }

    /**
     * 播放音频url，（接收到别人录制的音频）
     */
    playRecordByUrl(url: string) {
        if (!cc.sys.isNative) {
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_RECORD_PLAY_RECORD, { "fileUrl": url });
        }
    }

    /**
     * 播放房间语音（IOS）
     */
    PlayRoomVoice(kInfo: CAFInfo) {
        if (!cc.sys.isNative) {
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {

            if (!kInfo.kUrl) {
                return;
            }
            this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_RECORD_PLAY_ROOMFILE,
                { "kUrl": kInfo.kUrl, "kSender": kInfo.kSender, "u32SeatId": kInfo.u32SeatId });
        }
    }

    //停止播放音频
    StopPlay() {
        if (!cc.sys.isNative) {
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_RECORD_STOP_PLAY);
        }
    }

    //是否有gps
    HaveGps(showTP: boolean = true): boolean {
        if (cv.dataHandler.getUserData().isallowsimulator) return true;//白名单默认有定位
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_HAVE_GPS, { "showTP": showTP }) == "true";
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            return this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_IS_HAVE_GPS) == "true";
        } else {

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
                if (SY_positionInfo == null) {  //如果定位经纬度为0 返回为没有开启
                    return false;
                }
                return true;
            }
            return true;
        }
    }

    //是否开启定位
    AuthLocation() {
        this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_IS_AUTHLOCATION);
    }

    //获取IOS设备信息
    getDeviceModel(): string {
        let mode: string = "";

        if (cc.sys.os === cc.sys.OS_IOS) {
            mode = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GETDEVICEMODEL);
        }

        return mode;
    }
    /**
     * 设置可写路径
     */
    SetWriteblePath(path: string): boolean {
        let ret = true;
        if (!cc.sys.isNative) {
            return;
        }

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "SetWriteblePath", "(Ljava/lang/String;)V", path);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            //do nothing
        }
        return ret;
    }

    /*
     * 检测是否安装某个应用
    */
    checkHaveAppOnDevice(packName: string): boolean {
        let ret = true;

        if (!cc.sys.isNative || cv.config.isSiyuType()) {
            return ret;
        }

        ret = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_CHECKHAVEAPP, { "packName": packName }) == "true";

        return ret;
    }


    writeToFileForAndroid(filePath: string, content: string): void {
        if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            content = window.btoa(content);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "writeToFile", "(Ljava/lang/String;Ljava/lang/String;)V", filePath, content);
        }
        else {
            console.log("-----------------------> writeToFileForAndroid failed");
        }
    }

    readFileForAndroid(filePath: string): string {
        let result = "";
        if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
            result = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "readFile", "(Ljava/lang/String;)Ljava/lang/String;", filePath);
            result = window.atob(result);
        }
        else {
            console.log("-----------------------> readFileForAndroid failed");
        }
        return result;
    }

    Vibrate() {
        if (cc.sys.isNative) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_VIBRATE);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVibrate", "()V");
            }
        } else {
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {  //如果是私语的平台
                let cmd = "{\"cmd\": \"1003\"}";
                this.SYwebjsToClient(cmd);
            }
        }
    }

    getSystemVersion(): string {
        let ret = "";
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersion", "()Ljava/lang/String;");
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {

            // let iosSystemVersion = {
            //     "iPhone3,1":"iPhone 4","iPhone3,2":"iPhone 4","iPhone3,3":"iPhone 4",
            //     "iPhone4,1":"iPhone 4S",
            //     "iPhone5,1":"iPhone 5","iPhone5,2":"iPhone 5","iPhone5,3":"iPhone 5c","iPhone5,4":"iPhone 5c",
            //     "iPhone6,1":"iPhone 5s","iPhone6,2":"iPhone 5s",
            //     "iPhone7,1":"iPhone 6 Plus","iPhone7,2":"iPhone 6",
            //     "iPhone8,1":"iPhone 6s","iPhone8,2":"iPhone 6s Plus","iPhone8,4":"iPhone SE",
            //     "iPhone9,1":"iPhone 7","iPhone9,2":"iPhone 7 Plus","iPhone9,3":"iPhone 7","iPhone9,4":"iPhone 7 Plus",
            //     "iPhone10,1":"iPhone 8","iPhone10,2":"iPhone 8 Plus","iPhone10,3":"iPhone X","iPhone10,4":"iPhone 8","iPhone10,5":"iPhone 8 Plus","iPhone10.6":"iPhone X",
            //     "iPod1,1":"iPod Touch 1G","iPod2,1":"iPod Touch 2G","iPod3,1":"iPod Touch 3G","iPod4,1":"iPod Touch 4G","iPod5,1":"iPod Touch 5G",
            //     "iPad1,1":"iPad",
            //     "iPad2,1":"iPad 2","iPad2,2":"iPad 2","iPad2,3":"iPad 2","iPad2,4":"iPad 2","iPad2,5":"iPad mini","iPad2,6":"iPad mini","iPad2,7":"iPad mini",
            //     "iPad3,1":"iPad 3","iPad3,2":"iPad 3","iPad3,3":"iPad 3","iPad3,4":"iPad 4","iPad3,5":"iPad 4","iPad3,6":"iPad 4"
            // };
            ret = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_GET_DEVICE_SYSTEM_VERSION);
            console.log("getVersion  ios================ret:" + ret);
        }
        return ret;
    }

    getNativeError(): string {
        let result = "";
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            result = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "readFile", "(Ljava/lang/String;)Ljava/lang/String;", "myCrashLog.txt");
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            result = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_ERROR_DATA);
        }
        console.log("getNativeError:" + result);
        return result;
    }

    clearNativeError(): string {
        let result = "";
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            result = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "writeToFile", "(Ljava/lang/String;Ljava/lang/String;)V", "myCrashLog.txt", "");
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            result = this.invokeSyncFunc(NATIVE_KEY_MAP.KEY_ERROR_DATA);
        }
        console.log("clearNativeError:" + result);
        return result;
    }

    //私语获取电量信息
    SYgetBatteryLevel() {
        return SY_batteryInfo;//
    }

    //私语获取系统语言
    SYgetSysLanguage(): string {
        return SY_systemLan;
    }

    //获取系统剪切板内容
    SYgetClipboardContent(): string {
        return SY_clipboardStr;
    }

    //私语Web版本的接口
    //js层调用js层接口
    /*
        1001 获取设备ID   "{cmd: \'1001\'}"
        1002 获取GPS信息  "{cmd: \'1002\'}"
        1003 震动         "{cmd: \'1003\'}"
        1004 安卓模拟器检查  "{cmd: \'1004\'}"
        1005 开启横屏  "{cmd: \'1005\'}"
        1006 弹出webview对话框  "{cmd: \'1006\'}"  String url:webview对话框要渲染的地址   int width; //webview对话框宽度   int height; //webview对话框高度
              op: 0   关闭子webview   op：1 打开子webview 
        1007 录音操作   "{cmd: \'1007\'}"  op=0，开始录音，1:结束录音，2:取消录音
        1008 保存图片到相册   "{cmd: \'1007\', "url": strUrl}"   strUr：需要下载的图片url
        1010 获取电量信息  "{cmd: \'1010\'}"
        1011 获取系统语言   "{cmd: \'1011\'}"
        1012 打开系统浏览器 "{cmd: \'1012\'}"   url： 打开链接
        1013 操作剪切板   "{cmd: \'1013\'}"   op:0  获取系统剪切板  op:1 设置系统剪切板  content: 剪切板内容
        1014 是否是ipad设备  "{cmd: \'1014\'}"
    */
    SYwebjsToClient(jsonCmd: string) {
        if (cc.sys.isBrowser && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
            console.log("#################### SYwebjsToClient cmd:" + jsonCmd);
            safetalk.jsToClient(jsonCmd);
        }
    }

    //关闭子webview
    SYwebCloseChildWebview() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            this.SYwebjsToClient("{\"cmd\": \"1006\", \"op\":0}");
        }
    }

    //私语调用返回函数
    public static SYwebClientToJs(res: any) {
        console.log("#################### SYwebClientToJs callBack:" + res);
        if (res == null) {
            console.log("SYwebClientToJs return data is null.");
            return;
        }

        res = res.replace(/\n/g, '');
        res = res.replace(/\r/g, '');

        let data = JSON.parse(res);
        let cmd = data["cmd"];
        let op = data["op"];

        switch (cmd) {

            case "1001": //返回设备ID
                {
                    SY_deviceId = data["device_id"];
                }
                break;

            case "1002": //返回GPS信息    
                {
                    let latitude = data["lat"];
                    let longitude = data["lng"];

                    if (latitude == 0.0 || longitude == 0.0) {
                        SY_positionInfo = null;
                    } else {
                        SY_positionInfo = JSON.stringify({
                            "latitude": latitude,
                            "longitude": longitude,
                        });
                    }
                }
                break;

            case "1003": //震动返回
                break;

            case "1004":  //判断是否是安卓模拟器返回
                {
                    let _ret = data["is_android_emulator"];
                    if (_ret == 0) {
                        SY_isEmulaotr = false;
                    } else if (_ret == 1) {
                        SY_isEmulaotr = true;
                    }
                }
                break;

            case "1005":  //开启横竖屏返回
                break;

            case "1006":  //打开webview弹出返回
                break;

            case "1007":  //录音回调返回
                {
                    if (op == 0) {  //开始录音返回
                        cv.MessageCenter.send("SYStartRecord", data);
                    } else if (op == 1) {  //停止录音返回
                        cv.MessageCenter.send("SYStopRecord", data);
                    } else if (op == 2) {  //取消录音返回
                        cv.MessageCenter.send("SYCancelRecord", data);
                    }
                }
                break;

            case "1008":  //保存图片到相册回调
                {
                    let ret = data["ret"];
                    if (ret == 0) {
                        cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips0"), cv.Enum.ToastType.ToastTypeInfo);
                    } else {
                        cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips1"), cv.Enum.ToastType.ToastTypeInfo);
                    }
                }
                break;

            case "1009":  //切换前后台通知
                if (op == 0) {  //转入后台
                    //console.log("####################--------------------> 转入后台:" + op);
                    cv.MessageCenter.send("on_syOnEnterBackground");
                    cv.netWorkManager.OnAppEnterBackground();

                } else if (op == 1) {  //前台
                    //console.log("####################--------------------> 转入前台:" + op);
                    cv.MessageCenter.send("on_syOnEnterForeground");
                    cv.netWorkManager.OnAppEnterForeground();
                }
                break;

            case "1010":
                let battery = data["battery"];  //电量  1-100
                let is_charging = data["is_charging"];  //是否充电  0:否，1：是
                SY_batteryInfo = JSON.stringify({
                    "battery": battery,
                    "is_charging": is_charging,
                });
                break;

            case "1011":
                //  String language_code;//语言编码  中文返回zh，英文返回en
                SY_systemLan = data["language_code"]; //系统语言
                break;

            case "1013":
                //获取剪切板内容
                SY_clipboardStr = data["content"];
                break;

            case "1014":  //当前是否是ipad
                SY_isIpad = data["is_ipad"] == 1 ? true : false;
                break;

            case "1015":  //ccjs监听返回，当前为ios平台才有
                let url = data["url"];
                if (url != null) {
                    cv.MessageCenter.send("on_syCcjsCallback", url);
                }

                break;
        }
    }

    //web端 webview不支持ccjs回调，通过postMessage统一回调,e.data为返回的数据
    public static webCcjsCallback(e: any) {
        if (cc.sys.isBrowser) {
            cv.MessageCenter.send("on_webCcjsCallback", e.data);
        }
    }
}

// export to global called by native
window.addEventListener('message', NativeEvent.webCcjsCallback);
window.webCcjsCallback = NativeEvent.webCcjsCallback;
window.clientToJs = NativeEvent.SYwebClientToJs;
window.OnNativeEventCallback = NativeEvent.OnNativeEventCallback;
window.NativeStringReturnTrue = "true";
window.NativeStringReturnFalse = "false";



