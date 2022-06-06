import cv from "../../components/lobby/cv";
import { LANGUAGE_TYPE } from "./Enum";

/**
 *  client_type = 0; // 无效的值
 *	client_type = 1; // pkw（c++）app
 *	client_type = 2; // pkc（c++）app
 *	client_type = 3; // pkw (typescript) app
 *	client_type = 4; // pkc (typescript) app
 *	client_type = 5; // pkw 网页版
 *	client_type = 6; // pkc 网页版
 *	client_type = 7; // h5越南版app
 *	client_type = 8; // h5越南版网页版
 *	client_type = 9; // 牛仔独立网页版
 *	client_type = 10; // 泰文版
 *	client_type = 11; // 泰文网页版
 *	client_type = 12; // 阿拉伯版
 *	client_type = 13; // 印度语版
 *	client_type = 14; // mempoker
 *	client_type = 15; // PC版
 *  如果是app DEBUG_MODE client_type 以client_environment为准。网页版则以配置文件为准。
 *  DEBUG_MODE = 0; // 正式环境 
 *  DEBUG_MODE = 1; // 予发布环境（测试环境）
 * 
 */

/**
* 基础配置信息类
*/
export class Config extends cc.Component {
    /**
     * DEBUG_MODE       环境
     * CLIENT_TYPE      客户端类型
     * CLIENT_VERSION   热更版本号
     * BRANCH_TYPE      分支类型：true:支线分支 false:主分支 
     */
    private DEBUG_MODE: number = -1;
    private CLIENT_TYPE: number = -1;
    private CLIENT_VERSION: string = "";
    private BRANCH_TYPE: Boolean = false;

    //当前场景
    private CURRENT_SCENE: string = "";
    //当前语言
    private CURRENT_Language: LANGUAGE_TYPE = LANGUAGE_TYPE.zh_CN;
    //网页不涉及大版本更新。此版本号没有意义，写死一个在这里
    private CLIENT_WEB_VERSION: string = "1.0.0";

    public WIDTH: number;
    public HEIGHT: number;
    public DESIGN_WIDTH: number = 1080;
    public DESIGN_HEIGHT: number = 2338;
    public IS_WIDESCREEN: boolean = false;
    public IS_FULLSCREEN: boolean = false;
    /**>=iphone x分辨率 为true */
    public IS_IPHONEX_SCREEN: boolean = false;
    public FULLSCREEN_OFFSETY: number = 100;
    public FULLSCREEN_OFFSETY_B: number = 58;
    public CHANGE_LANGUAGE: string = "change_language";
    public HEAD_LENGTH: number = 200;//头像数量
    //不做资源自动释放的第几代IOS设备  11代为iphone XR
    public IPHONE_DEVICE_LEVEL = 11;
    public IPHONE_CUR_LEVLE = 0;
    private date: any;
    //日志上次的打印时间
    private lastTime: number = 0;
    //特殊标记时间，用于特殊时间记录
    private signTime: number = 0;
    //本地日志文件夹
    private nativeLogFile: string = "logFile";
    public gameScene: cc.SceneAsset;
    /**
     * 游戏界面常用数据
     */
    public timeArr: Array<number> = [0.5, 1, 2, 2.5, 3, 4, 5, 6];
    private blindArr: Array<string> = ["1/2", "2/4", "3/6", "5/10", "10/20", "25/50", "50/100", "100/200", "200/400",
        "250/500", "300/600", "400/800", "500/1000", "1000/2000", "2000/4000", "5000/10000", "10000/20000", "0.1/0.2",
        "0.2/0.5", "0.5/1", "0.02/0.05", "0.05/0.1", "20/40", "2500/5000"];

    public IS_WEBVIEW: boolean = false;
    public HAVE_MTT: boolean = true;
    public HAVE_BLACKJACK: boolean = true;  //是否打开21点
    public MTT_WEB_INDEX: number = 0;       //记录当前使用哪个webview ：mtt游戏 0，背包 1，战绩 2
    public CAN_USE_WEBGL: boolean = true;

    private static instance: Config;

    public static getInstance(): Config {
        if (!this.instance) {
            this.instance = new Config();
            this.instance.init();
        }
        return this.instance;
    }

    init() {
        this.WIDTH = cc.winSize.width;
        this.HEIGHT = cc.winSize.height;
        console.log(" cc.winsize.width：" + cc.winSize.width + " cc.view.getVisibleSize：" + cc.view.getVisibleSize());
        console.log("cc.view.getFrameSize().width:" + cc.view.getFrameSize().width);
        this.IS_WIDESCREEN = this.WIDTH / this.HEIGHT > 1080.0 / 1920;
        this.IS_FULLSCREEN = this.WIDTH > this.HEIGHT ? this.WIDTH / this.HEIGHT > 2 :
            this.HEIGHT / this.WIDTH > 2;
        this.IS_IPHONEX_SCREEN = this.WIDTH > this.HEIGHT ? this.WIDTH / this.HEIGHT > 2436.0 / 1126 :
            this.HEIGHT / this.WIDTH > 2436.0 / 1126;
        // this.HAVE_MTT = this.HAVE_MTT && cc.sys.isNative;
    }

    /**
     * 设置是否显示帧率等调试信息
     * @param bool 
     */
    public SET_DISPLAYSTATS() {
        cc.debug.setDisplayStats(this.GET_DEBUG_MODE() == 1);
    }

    /**
     * 设置是否为调试模式
     * @param mode 
     * 这里有个坑, 参数类型应该为any, 为number的话会误导人
     * 测试服走的是"config.json", 类型是数字; 正式服走的是"main.js", 类型是布尔
     * 导致逻辑判断双等号和三等号结果不一致的bug, 所以这里要把传入的参数强转为数字, 这样才正确
     */
    public SET_DEBUG_MODE(mode: any) {
        this.DEBUG_MODE = cv.Number(mode);
        this.DebugMode_logInfo();
    }

    /**
     * 在非测试包时  去除日志打印
     * 需要调试线上问题，可以在这里打开日志调试信息
     */
    public DebugMode_logInfo() {
        if (this.GET_DEBUG_MODE() != 1) {
            console.log = (): void => { };
            // console.warn = (): void => { };
            // console.time = (): void => { };
            // console.timeEnd = (): void => { };
        }
    }

    /**
     * GET DEBUG_MODE
     */
    public GET_DEBUG_MODE(): number {
        return this.DEBUG_MODE;
    }

    /**
     * SET CLIENT_TYPE
     */
    public SET_CLIENT_TYPE(client_type: number) {
        this.CLIENT_TYPE = client_type;
    }

    /**
     * GET CLIENT_TYPE
     */
    public GET_CLIENT_TYPE(): number {
        return this.CLIENT_TYPE;
    }

    /**
     * SET CLIENT_VERSION
     */
    public SET_CLIENT_VERSION(clientvertion: string) {
        this.CLIENT_VERSION = clientvertion;
    }

    /**
     * 获取默认版本号  此版本号是一个写死的无意议的版本号
     */
    public GET_CLIENT_WEB_VERSION(): string {
        return this.CLIENT_WEB_VERSION;
    }

    /**
     * GET CLIENT_VERSION
     */
    public GET_CLIENT_VERSION(): string {
        return this.CLIENT_VERSION;
    }

    /**
     * 初始获取设备机型，暂时只获取IOS设备
     */
    public initDeviceModel() {
        if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
            let deviceModel: string = cv.native.getDeviceModel();
            let strarr = deviceModel.split(",");
            let levelNum = strarr[0].substr(6, strarr[0].length);
            this.IPHONE_CUR_LEVLE = cv.Number(levelNum);
            console.log("initDeviceModel:" + this.IPHONE_CUR_LEVLE);
        }
    }


    /**
     * 设置是否为支线版本
     */
    public SET_BRANCH_TYPE(branch_type: boolean) {
        this.BRANCH_TYPE = branch_type;
    }

    /**
     * 是否为支线
     */
    public IS_BRANCH() {
        return this.BRANCH_TYPE;
    }
    /**
     * 是当IPHONE是否大于11代
     */
    public isBigThen_IPHONE_DEVICE_LEVEL(): boolean {
        return this.IPHONE_CUR_LEVLE >= this.IPHONE_DEVICE_LEVEL;
    }

    public getStringData(name: string, isServer?: boolean): string {
        let retValue: string = "";
        isServer = isServer == true ? true : false;
        try {
            if (isServer) {
                if (cv.server.ishaveKey(name)) {
                    retValue = cv.String(cv.server.getString(name));
                }
            }
            else {
                if (cv.languageJsonMap.get(this.CURRENT_Language)[name]) {
                    retValue = cv.String(cv.languageJsonMap.get(this.CURRENT_Language)[name]["-value"]);
                }
            }
        }
        catch (e) {
            retValue = "";
            console.error("config::getStringData err:" + e);
        }
        finally {
            return retValue;
        }
    }

    public setCurrentScene(name: string) {
        this.CURRENT_SCENE = name;
    }

    public getCurrentScene(): string {
        return this.CURRENT_SCENE;
    }

    public setCurrentLanguage(name: LANGUAGE_TYPE) {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            this.CURRENT_Language = LANGUAGE_TYPE.zh_CN;
            return;
        }
        this.CURRENT_Language = name;
    }

    public getCurrentLanguage(): LANGUAGE_TYPE {
        return this.CURRENT_Language;
    }

    public copyObject(copyFrom: Object, copyTo: Object): Object {
        const keysTo = Object.keys(copyTo);

        for (const key of keysTo) {
            if (copyFrom[key] !== undefined) {
                copyTo[key] = copyFrom[key];
            }
        }
        return copyTo;
    }

    public adaptScreen(node: cc.Node) {
        console.log("=========> this.IS_WIDESCREEN = " + this.IS_WIDESCREEN + ", " + cv.config.WIDTH + "~" + cv.config.HEIGHT + "->" + node.getContentSize() + ", " + cc.winSize.width + "~" + cc.winSize.height);
        node.getComponent(cc.Canvas).fitHeight = this.IS_WIDESCREEN;
        node.getComponent(cc.Canvas).fitWidth = !this.IS_WIDESCREEN;
        // node.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);
    }

    public adaptScreenHen(node: cc.Node) {
        console.log("=========> this.IS_WIDESCREEN = " + this.IS_WIDESCREEN + ", " + cv.config.WIDTH + "~" + cv.config.HEIGHT + "->" + node.getContentSize() + ", " + cc.winSize.width + "~" + cc.winSize.height);
        node.getComponent(cc.Canvas).fitHeight = !this.IS_WIDESCREEN;
        node.getComponent(cc.Canvas).fitWidth = this.IS_WIDESCREEN;
        // node.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);
    }

    /**
     * 注意节点锚点必须是（0.5,0.5）
     * @param nodeArr 节点数组
     */
    public adaptSize(nodeArr: cc.Node[]) {
        if (!cv.config.IS_WIDESCREEN) {
            let len = nodeArr.length;
            for (let i = 0; i < len; i++) {
                let tempSize = nodeArr[i].getContentSize();
                let tempPos = nodeArr[i].position;
                nodeArr[i].setContentSize(tempSize.width, cv.config.HEIGHT - (cv.config.DESIGN_HEIGHT - tempSize.height));
                nodeArr[i].setPosition(tempPos.x, tempPos.y - (cv.config.HEIGHT - cv.config.DESIGN_HEIGHT) * 0.5);
            }
        }
    }

    /**
     * 合成切换语言资源的路径
     * @param path          资源相对路径(resources下相对路径且不包含后缀名, 如"dir/fileName")
     * @param languageType  多语言类型枚举(参照枚举类型 cv.Enum.LANGUAGE_TYPE)
     */
    public getLanguagePath(path: string, languageType?: LANGUAGE_TYPE): string {
        if (!languageType || typeof languageType === "undefined") {
            languageType = this.CURRENT_Language;
        }

        let prefix: LANGUAGE_TYPE = languageType;
        switch (languageType) {
            case LANGUAGE_TYPE.zh_CN: break;
            case LANGUAGE_TYPE.en_US: break;
            case LANGUAGE_TYPE.yn_TH:
            case LANGUAGE_TYPE.ar_SA:
            case LANGUAGE_TYPE.hi_IN:
            case LANGUAGE_TYPE.th_PH: prefix = LANGUAGE_TYPE.en_US; break;
            default: prefix = LANGUAGE_TYPE.zh_CN; break;
        }

        return prefix + "/" + path;
    }

    // 是否海外版
    public isOverSeas(): boolean {
        if (this.CLIENT_TYPE == cv.Enum.ClientType.OverSeas ||
            this.CLIENT_TYPE == cv.Enum.ClientType.OverSeasWebPage) {
            return true;
        }
        return false;
    }


    //是否是私语版
    public isSiyuType(): boolean {
        //网页版 && 跑在ios或android手机上
        if (this.CLIENT_TYPE == cv.Enum.ClientType.H5WebPage && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
            return true;
        }
        return false;
    }

    // 越南版
    public isVietnam(): boolean {
        if (this.CLIENT_TYPE == cv.Enum.ClientType.Vietnam ||
            this.CLIENT_TYPE == cv.Enum.ClientType.VietnamWebPage) {
            return true;
        }
        return false;
    }

    // 泰语版
    public isThai(): boolean {
        if (this.CLIENT_TYPE == cv.Enum.ClientType.Thai ||
            this.CLIENT_TYPE == cv.Enum.ClientType.ThaiWebPage) {
            return true;
        }
        return false;
    }

    // 阿拉伯版
    public isArab(): boolean {
        if (this.CLIENT_TYPE == cv.Enum.ClientType.Arab) {
            return true;
        }
        return false;
    }

    // 印地语版
    public isIndia(): boolean {
        if (this.CLIENT_TYPE == cv.Enum.ClientType.India) {
            return true;
        }
        return false;
    }

    // 是否显示新年活动内容
    public isShowNewYear(): boolean {
        //关比新年ui
        return false;
        if (this.CLIENT_TYPE == cv.Enum.ClientType.H5 ||
            this.CLIENT_TYPE == cv.Enum.ClientType.H5WebPage) {
            return true;
        }
    }

    //客户端是否开启私聊验功能显示
    public isOpenSiyuVerify() {
        return false;
    }

    // 客户端金币显示比例(服务器和显示的比例)
    public getShowGoldRatio(): number {
        let number = 0;
        if (this.isThai()) {
            number = 10;
        } else {
            number = 100;
        }
        return cv.StringTools.div(100, number);
    }
    /**
     *  languageCode 示例 越南文vi-cn  en-cn  zh-cn zh-tw  hi-hk
     * 当地区选择是香港的时候后面接的就是hk，如果是台湾就是tw,随着英语系的不同也可能不同
     * 印地语 languageCode:hi-hk  language:en
     * 越南语 languageCode:vi-hk  language:en
     * 英语 languageCode:en-hk  language:en
     * 阿拉伯语 languageCode:ar-hk  language:ar
     *  提前设置系统语言（越南语的language也是cc.sys.LANGUAGE_ENGLISH）只能使用languageCode区别  en-tw  vi-tw
     * */
    public setSystemLanguage() {
        console.log("cc.sys.language::" + cc.sys.language);
        console.log("cc.sys.languageCode::" + cc.sys.languageCode);

        //测试代码
        // this.setCurrentLanguage(LANGUAGE_TYPE.ar_SA);
        // this.setCurrentLanguage(LANGUAGE_TYPE.zh_CN);
        // this.setCurrentLanguage(LANGUAGE_TYPE.hi_IN);
        // return;

        //优先级，非中文客户端类型对应的语言>玩家上次设置的语言>系统语言 
        let lang: any = cv.tools.GetStringByCCFile("LANGUAGE_SET");
        if (this.isOverSeas()) {
            lang = LANGUAGE_TYPE.en_US;//海外版
        }
        else if (this.isVietnam()) {
            lang = LANGUAGE_TYPE.yn_TH;//越南版
        }
        else if (this.isThai()) {
            lang = LANGUAGE_TYPE.th_PH;//泰文版
        }
        else if (this.isArab()) {
            lang = LANGUAGE_TYPE.ar_SA;//阿拉伯版
        }
        else if (this.isIndia()) {
            lang = LANGUAGE_TYPE.hi_IN;//印地语版
        }
        if (lang != null) {
            this.setCurrentLanguage(lang);
            return;
        }
        //根据系语言进行设置
        //英语系
        if (cc.sys.language == cc.sys.LANGUAGE_ENGLISH) {
            let code: string = cc.sys.languageCode;
            let codes = code.split("-");
            switch (codes[0]) {
                case "en":
                    this.setCurrentLanguage(LANGUAGE_TYPE.en_US);
                    break;
                case "hi":
                    this.setCurrentLanguage(LANGUAGE_TYPE.hi_IN);
                    break;
                case "vi":
                    this.setCurrentLanguage(LANGUAGE_TYPE.yn_TH);
                    break;
                default:
                    this.setCurrentLanguage(LANGUAGE_TYPE.en_US);
                    break;
            }
            //阿拉伯语系
        } else if (cc.sys.language == cc.sys.LANGUAGE_ARABIC) {
            this.setCurrentLanguage(LANGUAGE_TYPE.ar_SA);
            //中文系
        } else {
            this.setCurrentLanguage(LANGUAGE_TYPE.zh_CN);
        }
    }

    // 根据包体属性获取logo路径
    public getLogoPath(sceneLogo: string): string {
        let logoPath = "client_type/";
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            logoPath = logoPath + "cowboy_web/"
        }
        else if (this.isOverSeas()) {
            logoPath = logoPath + "pkc/"
        }
        else if (cv.config.isThai()) {
            logoPath = logoPath + "pkt/"
        } else {
            logoPath = logoPath + "pkw/"
        }
        if (sceneLogo == cv.Enum.SCENE.HALL_SCENE) {
            logoPath = logoPath + "lobby_logo"
        } else if (sceneLogo == cv.Enum.SCENE.LOGIN_SCENE) {
            logoPath = logoPath + "login_logo"
        } else {
            logoPath = logoPath + "gameView_logo"
        }
        return logoPath;
    }

    /**
     * 打印时间  主要用于测试某一过程花费的时间（例如切场景）
     * 在需要测量的过程前后各调用一次此方法，自动计算此过程消耗时间
     * @param tag 外部可传入打印标记字符（方便查看）
     * 返回消耗时间秒数 0为第一次打印
     */
    public logTime(tag: string): number {
        this.date = new Date();
        let curtime = this.date.getTime();
        let slpitTime = curtime - this.lastTime;
        console.log("logTime*********:" + tag + " 和上一次打印的时间差：" + slpitTime + " 秒数差：" + slpitTime / 1000);
        this.lastTime = curtime;
        return (slpitTime / 1000) > 10000000 ? 0 : (slpitTime / 1000);
    }

    public resetSignTime() {
        this.signTime = 0;
    }

    public signCurtime() {
        this.date = new Date();
        this.signTime = this.date.getTime();
    }

    public compareSignTime() {
        {
            this.date = new Date();
            let curtime = this.date.getTime();
            let slpitTime = curtime - this.signTime;
            return slpitTime / 1000;
        }
    }

    /**
     * 设置MTT状态
     */
    public setMTT() {
        this.HAVE_MTT = true;//!cv.config.isOverSeas() && !cv.config.isThai() && (cc.sys.isNative || (cc.sys.isBrowser && this.isSiyuType())) && !cv.dataHandler.getUserData().isban;
    }

    //设置21点状态
    public setBlackJack(openState: boolean = true) {
        this.HAVE_BLACKJACK = openState;
    }

    public setMTTWebIndex(index: number) {
        this.MTT_WEB_INDEX = index;
    }

    public getMTTWebIndex(): number {
        return this.MTT_WEB_INDEX;
    }

    public getblindString(index: number): string {
        if (index < 0 || index > this.blindArr.length) return "";
        let splitArr: string[] = this.blindArr[index].split("/");
        let bigBlind = cv.StringTools.numberToShowString(Number(splitArr[1]));
        let smallBlind = cv.StringTools.numberToShowString(Number(splitArr[0]));
        return smallBlind + "/" + bigBlind;
    }

    /**
     * 获取当前平台
     */
    public getPlatform(): string {
        let platform_name = "";
        if (cc.sys.isBrowser) {
            platform_name = "web";
        }
        else if (cc.sys.OS_ANDROID == cc.sys.os) {
            platform_name = "android";
        }
        else if (cc.sys.OS_IOS == cc.sys.os) {
            platform_name = "ios";
        }
        return platform_name;
    }

    public writeLog(msg) {
        if (!cc.sys.isNative) return;
        let logPath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this.nativeLogFile);
        console.debug(logPath);
        if (!jsb.fileUtils.isDirectoryExist(logPath)) {
            jsb.fileUtils.createDirectory(logPath);
            console.debug("创建文件夹日志文件夹");
        }
        let num = cv.tools.GetStringByCCFile("startNumber");
        let count = cv.Number(num);
        jsb.fileUtils.writeStringToFile(msg, logPath + cv.StringTools.formatC("/logInfo_%d.txt", count));
    }

    public getLog() {
        if (!cc.sys.isNative) return;
        let logPath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this.nativeLogFile);
        if (jsb.fileUtils.isDirectoryExist(logPath)) {
            console.debug("日志文件夹已存在");
            console.debug("native logInfo start++++++++++++++++++++++++++++++++++++++++++++++++++++");
            let num = cv.tools.GetStringByCCFile("startNumber");
            let count = cv.Number(num);
            if (count <= 0) return;
            let msg = jsb.fileUtils.getStringFromFile(logPath + cv.StringTools.formatC("/logInfo_%d.txt", count - 1));
            console.debug(msg);
            console.debug("native logInfo end++++++++++++++++++++++++++++++++++++++++++++++++++++");
        } else {
            console.debug("日志文件夹不存在");
        }
    }

    public addErrorEvent() {
        return;
        if (cc.sys.isNative) {
            window.__errorHandler = function (errorMessage, file, line, message, error) {
                let exception = {
                    "errorMessage": null,
                    "file": null,
                    "line": null,
                    "message": null,
                    "error": null
                };
                exception.errorMessage = errorMessage;
                exception.file = file;
                exception.line = line;
                exception.message = message;
                exception.error = error;
                console.log("error ++++++++++++++");
                if (window.exception != JSON.stringify(exception)) {
                    window.exception = JSON.stringify(exception);
                    cv.tools.logObject(exception);
                    console.log("error ++++++++++++++   end");
                    console.log(window.exception);
                    //TODO: 发送请求上报异常
                }
            };
        } else if (cc.sys.isBrowser) {
            // window.onerror = function (errorMessage, file, line, message, error) {
            //     let exception = {
            //         "errorMessage": null,
            //         "file": null,
            //         "line": null,
            //         "message": null,
            //         "error": null
            //     };
            //     exception.errorMessage = errorMessage;
            //     exception.file = file;
            //     exception.line = line;
            //     exception.message = message;
            //     exception.error = error;
            //     // console.log("error isBrowser++++++++++++++");
            //     // if (window.exception != JSON.stringify(exception)) {
            //     //     window.exception = JSON.stringify(exception);
            //     //     console.log(exception);
            //     //     console.log("error isBrowser++++++++++++++   end");
            //     //     //TODO: 发送请求上报异常
            //     // }
            // };
        }
    }
}