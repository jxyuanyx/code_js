/**
 * 
    1，移动端登录页面打开（图1）：MobileLoginMainScreenOpened
    a,点击登录页面上的注册按钮：MobileRegistrationMainScreenRegisterClicked
    
    2，移动端注册验证页面打开（图2）：MobileRegistrationValidationScreenOpened
    a:移动端注册验证页面“Next”按钮点击：MobileRegistrationNavigationNextClicked
    b:移动端注册验证页面“Log in”按钮点击：MobileRegistrationNavigationBackClicked
    c:移动端注册验证页面完成选择国家代码：MobileRegistrationValidationScreenCountrySelected
    d:移动端注册验证页面完成输入电话号码：MobileRegistrationValidationScreenPhoneEntered
    e:移动端注册验证页面完成SMS Code输入：MobileRegistrationValidationScreenCodeEntered
    f:移动端注册验证页面点击获取SMS Code：MobileRegistrationValidationScreenCodeButtonClicked
    g:移动端SMScode点击发送确认（图3）：MobileRegistrationValidationScreenConfirmed
    h:移动端SMScode点击发送取消（图3）MobileRegistrationValidationScreenCancelled
    i:Invitationcode

    3,移动端注册账户页面打开（图4）：MobileRegistrationGameAccountOpened
    a:移动端注册账户页面完成用户名输入：MobileRegistrationGameAccountUsernameEntered
    b:移动端注册账户页面完成密码输入：MobileRegistrationGameAccountPasswordEntered
    c:移动端注册账户页面完成密码2输入：MobileRegistrationGameAccountPassword2Entered

    4,移动端注册用户信息页面打开（图5）：MobileRegistrationProfileOpened
    a:移动端注册用户信息页面完成性别选择：MobileRegistrationProfileGenderSelected
    b:移动端注册用户信息点击确认按钮：MobileRegistrationProfileConfirmClicked

    所有事件都应该有以下属性：
    Application： chrome/firefox/safari/ios/android
    currentScreen:  “login”,”registration”
    appVersion: 应用版本号， 例如“1.23”
 */

import cv from "../../components/lobby/cv";

/**
 * 事件采集类
 */
export class SegmentTool extends cc.Component {
    static g_class_name: string = "SegmentTool";
    private static _instance: SegmentTool = null;

    private analytics: any = null;
    private writeKey: string = "PxwIQ3GqrdCa5sOWYB7MLohp4G0B1mWd";
    private writeKey_debug: string = "uNut3w5e699iteDFDPdrEqG3OcqgQQbl";
    private applicationName: string = "pkw";

    static getInstance(): SegmentTool {
        if (!this._instance) {
            this._instance = new SegmentTool();
            this._instance.init();
        }
        return this._instance;
    }

    constructor() {
        super();
    }

    /**
     * 初始化
     */
    init() {
        if (cc.sys.isNative) {
            Object.defineProperty(navigator, "product", { value: "NativeScript" });
        }
        //使用analytics-node这个库需要运行这个命令进行安装:npm install --save analytics-node
        let Analytics = require('analytics-node');
        let key = cv.config.GET_DEBUG_MODE() ? this.writeKey_debug : this.writeKey;
        this.analytics = new Analytics(key);
    }

    /**
     * 发送用户行为事件
     * @param currentScreen 当前应用场景
     * @param event         事件
     * @param functionality 功能
     * @param properties    属性
     */
    track(currentScreen: string, event: string, functionality: string = "", properties: Object = null) {
        let data: any = {
            "appVersion": cv.config.GET_CLIENT_VERSION(),
            "application": this.applicationName,
            "functionality": functionality,
            "platform": cv.config.getPlatform(),
            "platformVersion": cv.native.getSystemVersion(),
            "screenName": currentScreen,
        };

        let context: any = {
            "app": {
                "build": "",
                "name": this.applicationName,
                "namespace": "",
                "version": cv.config.GET_CLIENT_VERSION()
            },
            "device": {
                "id": cv.native.GetDeviceUUID(),
                "manufacturer": "",
                "model": cv.native.getDeviceModel(),
                "name": "",
                "type": cv.config.getPlatform()
            },
            "library": { name: cv.config.getPlatform(), version: cv.native.getSystemVersion() },
            "locale": cv.config.getCurrentLanguage(),
            "network": {
                "bluetooth": false,
                "carrier": "",
                "cellular": false,
                "wifi": false
            },
            "os": {
                "name": cv.config.getPlatform(),
                "version": cv.native.getSystemVersion()
            },
            "screen": {
                "density": 0,
                "height": cc.winSize.height,
                "width": cc.winSize.width
            },
            "timezone": "",
            "traits": {
                "anonymousId": cv.native.GetDeviceUUID()
            },
            "userAgent": ""
        }

        //拷贝这个事件的一些特有属性
        cv.tools.copyObjectProperties(data, properties);

        // 捕获下异常(采集数据">32k"会报错, 影响程序逻辑)
        try {
            this.analytics.track({
                anonymousId: cv.native.GetDeviceUUID(),
                userId: cv.dataHandler.getUserData().user_id,
                event: event,
                properties: data,
                context: context,
            });
        }
        catch (error: any) {
            console.error(`${SegmentTool.g_class_name} - track error: ${error}`);
        }
        finally {
            console.log(`${SegmentTool.g_class_name} - track:
            anonymousId: ${cv.native.GetDeviceUUID()};
            Application: ${cv.config.getPlatform()};
            appVersion: ${cv.config.GET_CLIENT_VERSION()};
            userId: ${cv.dataHandler.getUserData().user_id};
            currentScreen: ${currentScreen};
            event: ${event};
            functionality: ${functionality};
            properties: ${JSON.stringify(properties)}`);
        }
    }

    /**
     * 用户完成注册以后先调用 alias 再调用identify完成映射
     * 用户唯一标识和游戏id绑定
     */
    alias() {
        this.analytics.alias({
            previousId: cv.native.GetDeviceUUID(),
            userId: cv.dataHandler.getUserData().user_id
        });
        console.log(`${SegmentTool.g_class_name} - alias:
        previousId: ${cv.native.GetDeviceUUID()};
        userId: ${cv.dataHandler.getUserData().user_id}`);
    }

    /**
     * 用户验证
     * @param functionality 
     * @param currentScreen 
     */
    identify(functionality: string, currentScreen: string) {
        let date: Date = new Date();
        let createdAt: string = cv.StringTools.formatC("%02d-%02d-%02dT%02d:%02d:%02d.%03dZ"
            , date.getUTCFullYear()
            , date.getUTCMonth() + 1
            , date.getUTCDate()
            , date.getUTCHours()
            , date.getUTCMinutes()
            , date.getUTCSeconds()
            , date.getUTCMilliseconds());

        this.analytics.identify({
            anonymousId: cv.native.GetDeviceUUID(),
            userId: cv.dataHandler.getUserData().user_id,
            traits: {
                application: this.applicationName,
                functionality: functionality,
                platform: cv.config.getPlatform(),
                platformVersion: cv.native.getSystemVersion(),
                screenName: currentScreen,
                appVersion: cv.config.GET_CLIENT_VERSION(),
                gender: (cv.dataHandler.getUserData().gender === 1) ? 'man' : 'woman',
                createdAt: createdAt,
                countryCode: cv.dataHandler.getUserData().countryCode,
                countryIsoCode: cv.dataHandler.getUserData().countryIsoCode,
                invitationCode: cv.dataHandler.getUserData().invateCode,
            }
        });

        console.log(`${SegmentTool.g_class_name} - identify:
        anonymousId: ${cv.native.GetDeviceUUID()};
        userId: ${cv.dataHandler.getUserData().user_id};
        name: ${cv.dataHandler.getUserData().nick_name};
        gender: ${cv.dataHandler.getUserData().gender};
        createdAt: ${createdAt};
        functionality: ${functionality};
        currentScreen: ${currentScreen}`);
    }
}
