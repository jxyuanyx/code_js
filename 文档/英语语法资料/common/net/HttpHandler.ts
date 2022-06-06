import game_protocol = require("./../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import data_protocol = require("./../../../Script/common/pb/data");
import data_pb = data_protocol.data_proto;

import cv from "../../components/lobby/cv";
import gameDataMgr from "../../components/game/dzPoker/data/GameDataManager";
import JackfruitManager from "../../components/game/jackfruit/JackfruitManager";
import { HandCardType, PlayerRecord, CollectUUID, AllinceResultInfo, ClubInfo, BuyInsData, SimpleGameReviewFavorite } from "../../components/game/dzPoker/data/RecordData";
import { RoomParams, CAFInfo } from "../../components/game/dzPoker/data/RoomData";
import { ActivityInfo } from "../../data/activityData";
import { ClubData } from "../../data/club/ClubData";
import { aesHandler } from "../plugg/aesHandler";
import { SCENE } from "../tools/Enum";
import { HashMap } from "../tools/HashMap";
import { Bb100Info } from "../../data/userData";

export class HttpHandler {
    private static instence: HttpHandler;
    private valueCache: any = null;
    /**
     * 初始化登录信息
     */
    private _initLoginServer(): void {

    }

    /**
     * 获取用户公用 token 字段
     */
    private _getUserTokenField(): object {
        let oRetValue: object = null;
        let sUID: string = cv.dataHandler.getUserData().user_id;
        let sToken: string = cv.dataHandler.getUserData().user_token;

        if (!sToken || sToken === "") {
            sToken = cc.sys.localStorage.getItem('user_token');
            if (!sToken || sToken === "") return oRetValue;
        }

        if (!sUID || sUID === "") {
            sUID = cc.sys.localStorage.getItem('user_id');
            if (!sUID || sUID === "") return oRetValue;
        }

        oRetValue = { "token": sToken, "user_id": sUID };
        return oRetValue;
    }
    /**
     * 游客登录
     * @param mobile
     * @param passwd
     * @param areaCode
     */
    public requestTouristLogin(): string {
        let url: string = cv.config.getStringData("WEB_API_LOGIN_BY_TOURIST_NAME", true);
        let device_uuid = cv.native.GetDeviceUUID();
        let kLocation = cv.native.GetLocation();
        let deviceType: string = "";
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            deviceType = "android";
        }
        else if (cc.sys.OS_IOS == cc.sys.os) {
            deviceType = "ios";
        }
        else {
            deviceType = "win32";
        }

        // save经纬度(提供给php登录使用, 因为该底层API延时过高不能及时取到值)，worldNetWork:550处保存
        let longitude = cv.tools.GetStringByCCFile("longitude");
        let latitude = cv.tools.GetStringByCCFile("latitude");
        if (cv.StringTools.getArrayLength(longitude) <= 0) longitude = '1';
        if (cv.StringTools.getArrayLength(latitude) <= 0) latitude = '1';

        let device_version: string = cv.native.getSystemVersion();
        let is_emulator: boolean = cv.native.IsSimulator();
        let obj = {
            //"version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION(),
            "version": cv.config.GET_CLIENT_VERSION(),
            "device_uuid": device_uuid,
            "latitude": kLocation["latitude"] !== 1 ? kLocation["latitude"] :  latitude,
            "longitude": kLocation["longitude"] !== 1 ? kLocation["longitude"] : longitude,
            "domain_type": cv.dataHandler.getServerId(),
            "deviceType": deviceType,
            "device_version": device_version,
            "is_emulator": is_emulator ? 1 : 0,
            "dmodel": cv.native.GetDeviceUUID(true, true),
        };
        if (cv.config.GET_DEBUG_MODE() == 1) { //测试环境每次登录都清理缓存数据
            cv.domainMgr.initLoginServer();
        }
        return cv.http.sendRequest(url, obj, this.onTouristLoginSuccess.bind(this));
    }
    /**
     * 游客登录成功
     * @param value
     */
    public onTouristLoginSuccess(value: any) {
        if (value && value.data) {
            cv.dataHandler.getUserData().download_url = value.data.download_url;
        }
        console.log("onTouristLoginSuccess****** " + cv.config.getCurrentScene());
        let msgCode = value.msg_code;
        if (msgCode === "0") {
            let data = value.data;
            console.log(data);
            cv.dataHandler.getUserData().user_id = data.user_id;
            cv.dataHandler.getUserData().u32Uid = parseInt(data.user_id);
            cv.tools.SaveStringByCCFile("user_id", cv.dataHandler.getUserData().user_id);
            cv.dataHandler.getUserData().user_token = data.token;
            this.md5token();
            cv.dataHandler.getUserData().user_ip = data.ip;
            cv.dataHandler.getUserData().mobile = cv.String(data.mobile);
            cv.dataHandler.getUserData().user_safe = data.safe;
            cv.dataHandler.getUserData().areaCode = data.areaCode;
            cv.dataHandler.getUserData().pay_type = data.pay_type;
            cv.dataHandler.getUserData().vipTool_url = data.vipTool_url;
            cv.dataHandler.getUserData().button_1 = data.button_1;
            cv.dataHandler.getUserData().button_1_english = data.button_1_english;
            cv.dataHandler.getUserData().button_2 = data.button_2;
            cv.dataHandler.getUserData().button_2_english = data.button_2_english;
            cv.dataHandler.getUserData().button_3 = data.button_3;
            cv.dataHandler.getUserData().button_3_english = data.button_3_english;
            cv.dataHandler.getUserData().shopUrl = data.shop;
            cv.dataHandler.getUserData().isEncrypt = [];
            cv.StringTools.deepCopy(data.encry_switch, cv.dataHandler.getUserData().isEncrypt);
            cv.dataHandler.getUserData().club_head = data.club_head;
            cv.dataHandler.getUserData().bk_img = data.bk_img;
            cv.dataHandler.getUserData().isvpn = Boolean(data.is_vpn);
            cv.dataHandler.getUserData().isban = Boolean(data.is_ban);
            cv.dataHandler.getUserData().is_allow_update_name = Boolean(data.is_allow_update_name);
            cv.dataHandler.getUserData().file_upload_url = data.file_upload_url;
            cv.dataHandler.getUserData().isallowsimulator = data.isallowsimulator;
            cv.dataHandler.getUserData().isTouristUser = true;      //标记为游客登录
            cv.dataHandler.getUserData().default_hall_view = cv.Number(data.default_hall_view);
            cv.dataHandler.getUserData().default_hall_view_enabled = true;

            //私聊验证
            cv.dataHandler.getUserData().verityType = data.send_vcode_type;  //发送验证码发送，1为短信发送，2为私聊发送
            cv.dataHandler.getUserData().is_bind_sl = data.is_bind_sl; //是否绑定了私聊
            cv.dataHandler.getUserData().sl_down_url = data.sl_down_url; //私聊下载地址
            cv.dataHandler.getUserData().sl_account = data.sl_account; //私聊账号
            cv.dataHandler.getUserData().is_alert_sl = data.is_alert_sl; //是否弹首次提示引导
            cv.dataHandler.getUserData().isViewWPT = data.wpt == "1";
            let preNum = cv.config.HAVE_MTT;
            if (data.mtt_status == 2) {//2是维护中 1是开启
                cv.config.HAVE_MTT = false;
            }
            else if (data.mtt_status == 1) {
                cv.config.setMTT();
            }

            if (preNum != cv.config.HAVE_MTT) {
                cv.MessageCenter.send("update_mtt_state");
            }

            let preNumJack = cv.config.HAVE_BLACKJACK;
            if(data.black_jack_status == 2) {  //21点，2是维护，1是开启
                cv.config.setBlackJack(false);
            }else if(data.black_jack_status == 1){
                cv.config.setBlackJack(true);
            } 
            if (preNumJack != cv.config.HAVE_BLACKJACK) {  //如果状态有改变
                cv.MessageCenter.send("update_blackJack_state");
            }

            this.handleActivityData(data.activity);
            cv.domainMgr.initDoMain();
            for (const ite of data.domain) {
                cv.domainMgr.addDomain(ite);
            }
            cv.domainMgr.saveDomain(data);
            cv.domainMgr.initLoginServer();
            cv.tools.SaveStringByCCFile("is_tourist_login", "1");
            cv.MessageCenter.send("onLoginSuccess");
            //跟踪用户行为，用户唯一标识和游戏id绑定

            cv.segmentTool.track(cv.Enum.CurrentScreen.Login, cv.Enum.segmentEvent.UserLoggedIn, cv.Enum.Functionality.login);
            cv.segmentTool.alias();
            cv.segmentTool.identify(cv.Enum.Functionality.registration, cv.Enum.CurrentScreen.profile);
            if (this.valueCache) {
                this.valueCache = null;
            }
        } else {
            if (cv.config.getCurrentScene() == cv.Enum.SCENE.HOTUPDATE_SCENE) {
                this.valueCache = value;
                cv.action.switchScene(cv.Enum.SCENE.LOGIN_SCENE);
                return;
            }
            cv.SwitchLoadingView.hide();
            this.doLoginFaile(value);
        }
    }

    public requestLoginByUserName(kUserName: string, kPassword: string): string {
        let url: string = cv.config.getStringData("WEB_API_LOGIN_BY_USER_NAME", true);
        let password: string = cv.md5.md5(kPassword);
        let clie = cv.config.GET_CLIENT_TYPE();
        let device_uuid = cv.native.GetDeviceUUID();
        console.log("requestLoginByUserName device_uuid::" + device_uuid);

        let kLocation = cv.native.GetLocation();
        let deviceType: string = "";
        let serverInfo = cv.domainMgr.getServerInfo();
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            deviceType = "android";
        }
        else if (cc.sys.OS_IOS == cc.sys.os) {
            deviceType = "ios";
        }
        else {
            deviceType = "win32";
        }

        //检测是否安装私聊
        let packName = "com.wanlihao.safetalk";
        if (cc.sys.os == cc.sys.OS_IOS) {
            packName = "Safetalk";
        }
        let isInstallSiliao = cv.native.checkHaveAppOnDevice(packName)  //是否安装了私语
        let device_version: string = cv.native.getSystemVersion();
        let is_emulator: boolean = cv.native.IsSimulator();

        // save经纬度(提供给php登录使用, 因为该底层API延时过高不能及时取到值)，worldNetWork:550保存
        let longitude = cv.tools.GetStringByCCFile("longitude");
        let latitude = cv.tools.GetStringByCCFile("latitude");
        if (cv.StringTools.getArrayLength(longitude) <= 0) longitude = '1';
        if (cv.StringTools.getArrayLength(latitude) <= 0) latitude = '1';

        let obj = {
            "username": kUserName,
            "passwd": password,
            //"version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION(),
            "version": cv.config.GET_CLIENT_VERSION(),
            "device_uuid": device_uuid,
            "latitude": kLocation["latitude"] !== 1 ? kLocation["latitude"] :  latitude,
            "longitude": kLocation["longitude"] !== 1 ? kLocation["longitude"] : longitude,
            "domain_type": cv.dataHandler.getServerId(),
            "deviceType": deviceType,
            "is_down_sl": isInstallSiliao ? 1 : 0,
            "device_version": device_version,
            "is_emulator": is_emulator ? 1 : 0,
            "dmodel": cv.native.GetDeviceUUID(true, true),
        };

        if (cv.config.GET_DEBUG_MODE() == 1) { //测试环境每次登录都清理缓存数据
            cv.domainMgr.initLoginServer();
        }

        return cv.http.sendRequest(url, obj, this.onUserNameLoginSuccess.bind(this));
    }

    public onUserNameLoginSuccess(value: any) {
        // if (value.is_upgrade && value.is_upgrade == 1) {         临时屏蔽 0910
        //     cv.MessageCenter.send("OnHttplogin");
        //     return;
        // }
        if (value && value.data) {
            cv.dataHandler.getUserData().download_url = value.data.download_url;
        }
        console.log("onUserNameLoginSuccess****** " + cv.config.getCurrentScene());
        let msgCode = value.msg_code;
        if (msgCode === "0") {
            let data = value.data;
            console.log(data);
            console.log("onUserNameLoginSuccess");
            cv.dataHandler.getUserData().user_id = data.user_id;
            cv.tools.SaveStringByCCFile("user_id", cv.dataHandler.getUserData().user_id);
            cv.dataHandler.getUserData().u32Uid = parseInt(data.user_id);
            cv.dataHandler.getUserData().user_token = data.token;
            this.md5token();
            cv.dataHandler.getUserData().pkf_add_url = data.pkf_add_url;
            cv.dataHandler.getUserData().user_ip = data.ip;
            cv.dataHandler.getUserData().mobile = cv.String(data.mobile);
            cv.dataHandler.getUserData().user_safe = data.safe;
            cv.dataHandler.getUserData().areaCode = data.areaCode;
            cv.dataHandler.getUserData().vipTool_url = data.vipTool_url;
            cv.dataHandler.getUserData().pay_type = data.pay_type;
            cv.dataHandler.getUserData().button_1 = data.button_1;
            cv.dataHandler.getUserData().button_1_english = data.button_1_english;
            cv.dataHandler.getUserData().button_2 = data.button_2;
            cv.dataHandler.getUserData().button_2_english = data.button_2_english;
            cv.dataHandler.getUserData().button_3 = data.button_3;
            cv.dataHandler.getUserData().button_3_english = data.button_3_english;
            cv.dataHandler.getUserData().shopUrl = data.shop;
            cv.dataHandler.getUserData().isEncrypt = [];
            cv.StringTools.deepCopy(data.encry_switch, cv.dataHandler.getUserData().isEncrypt);
            cv.dataHandler.getUserData().club_head = data.club_head;
            cv.dataHandler.getUserData().bk_img = data.bk_img;
            cv.dataHandler.getUserData().isvpn = Boolean(data.is_vpn);
            cv.dataHandler.getUserData().isban = Boolean(data.is_ban);
            cv.dataHandler.getUserData().is_allow_update_name = Boolean(data.is_allow_update_name);
            cv.dataHandler.getUserData().file_upload_url = data.file_upload_url;
            cv.dataHandler.getUserData().isallowsimulator = data.isallowsimulator;
            cv.dataHandler.getUserData().isTouristUser = false;     //标记为正常玩家登录
            cv.dataHandler.getUserData().default_hall_view = cv.Number(data.default_hall_view);
            cv.dataHandler.getUserData().default_hall_view_enabled = true;

            //私聊验证
            cv.dataHandler.getUserData().verityType = data.send_vcode_type;  //发送验证码发送，1为短信发送，2为私聊发送
            cv.dataHandler.getUserData().is_bind_sl = data.is_bind_sl; //是否绑定了私聊
            cv.dataHandler.getUserData().sl_down_url = data.sl_down_url; //私聊下载地址
            cv.dataHandler.getUserData().sl_account = data.sl_account; //私聊账号
            cv.dataHandler.getUserData().is_alert_sl = data.is_alert_sl; //是否弹首次提示引导
            cv.dataHandler.getUserData().isViewWPT = data.wpt == "1";
            let preNum = cv.config.HAVE_MTT;
            if (data.mtt_status == 2) {//2是维护中 1是开启
                cv.config.HAVE_MTT = false;
            }
            else if (data.mtt_status == 1) {
                cv.config.setMTT();
            }

            if (preNum != cv.config.HAVE_MTT) {
                cv.MessageCenter.send("update_mtt_state");
            }

            let preNumJack = cv.config.HAVE_BLACKJACK;
            if(data.black_jack_status == 2) {  //21点，2是维护，1是开启
                cv.config.setBlackJack(false);
            }else if(data.black_jack_status == 1){
                cv.config.setBlackJack(true);
            } 
            if (preNumJack != cv.config.HAVE_BLACKJACK) {  //如果状态有改变
                cv.MessageCenter.send("update_blackJack_state");
            }

            this.handleActivityData(data.activity);
            cv.domainMgr.initDoMain();
            /*域名测试代码
            let json_obj = {
                "api": "https://api.mumchen.com/",
                "qiniu": "https://api.mumchen.com/",
                "data": "http://api.mumchen.com:41001/",
                "h5": "api.mumchen.com:18001",
            };
            cv.domainMgr.addDomain(json_obj);
           */
            for (const ite of data.domain) {
                cv.domainMgr.addDomain(ite);
            }
            cv.domainMgr.saveDomain(data);
            cv.domainMgr.initLoginServer();
            cv.tools.SaveStringByCCFile("is_tourist_login", "0");

            cv.MessageCenter.send("onLoginSuccess", msgCode);
            //跟踪用户行为，用户唯一标识和游戏id绑定
            cv.segmentTool.track(cv.Enum.CurrentScreen.Login, cv.Enum.segmentEvent.UserLoggedIn, cv.Enum.Functionality.login);
            cv.segmentTool.alias();
            cv.segmentTool.identify(cv.Enum.Functionality.registration, cv.Enum.CurrentScreen.profile);
            if (this.valueCache) {
                this.valueCache = null;
            }
            //cv.worldNet.connectServer();
            //console.log("onLoginSuccess===》》" + "userId:" + cv.dataHandler.getUserData().user_id + " kToken:" + cv.dataHandler.getUserData().user_token + " kIp:" + cv.dataHandler.getUserData().user_ip);
        }
        else {
            if (cv.config.getCurrentScene() == cv.Enum.SCENE.HOTUPDATE_SCENE) {
                this.valueCache = value;
                cv.action.switchScene(cv.Enum.SCENE.LOGIN_SCENE);
                return;
            }
            cv.SwitchLoadingView.hide();
            this.doLoginFaile(value);
        }
    }


    hasFaileCache(): boolean {
        return this.valueCache != null;
    }
    getFaileCache() {
        return this.valueCache;
    }
    doLoginFaile(values) {
        let value = values;
        let msgCode = value.msg_code;
        //kyc验证
        if (msgCode == "10000019") {
            cv.dataHandler.getUserData().user_id = value.data.user_id;
            cv.dataHandler.getUserData().KYCVerificationStatus = value.data.kyc_verification_status;
            cv.MessageCenter.send("doKycVerification");
            return;
        }
        if (msgCode == "10000020" || msgCode == "110000") {
            cv.netWorkManager.Logout();
            cv.TP.showMsg(cv.config.getStringData("AccountLocked_KYC_Processing"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
            return;
        }
        if (msgCode == "200000") {
            this.tipsMsg(value);
            cv.dataHandler.setServerId(cv.Enum.ServerButtonType.ServerButtonType_special);
            return;
        }
        console.log("onUserNameLoginSuccess===》》fail");
        if (msgCode == "100033") {
            let msg;
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                msg = value["msg"];
            }
            else {
                msg = value["message"];
            }
            cv.MessageCenter.send("login_Lock", msg);
        }
        else if (msgCode == "100070") {
            if (value && value.data) {
                let result = value.data;
                cv.dataHandler.getUserData().user_id = result.user_id;
                cv.dataHandler.getUserData().mobile = cv.String(result.mobile);
                cv.dataHandler.getUserData().areaCode = result.areaCode;
                cv.dataHandler.getUserData().verityType = result.send_vcode_type;  //发送验证码发送，1为短信发送，2为私聊发送
                cv.dataHandler.getUserData().sl_account = result.sl_account; //私聊账号
                cv.MessageCenter.send("goTobindDevice");
            }
        }
        else {
            this.tipsMsg(value);
            if (value.is_upgrade && Math.abs(value.is_upgrade) === 1) {
                if (!cc.sys.isNative) {
                    return;
                }
                cv.netWorkManager.OnHttplogin();
                return;
            }
        }

    }

    requestSetAccount(kUserName: string) {
        let url = cv.config.getStringData("WEB_API_SET_USER_NAME", true);
        let obj = {
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "username": kUserName,
            "token": cv.dataHandler.getUserData().user_token
        };
        cv.http.sendRequest(url, obj, this.onSetAccountSuccess.bind(this));
    }

    onSetAccountSuccess(value: any) {
        let msgCode = value.msg_code;
        if (msgCode === "0") {
            cv.MessageCenter.send("onSetAccountSuccess");
        }
    }

    requestCheckNickName(kNickname: string, kPassword: string) {
        let obj = {
            "nick_name": kNickname,
            "passwd": cv.md5.md5(kPassword)
        };
        cv.http.sendRequest(cv.config.getStringData("WEB_API_CHECK_NICK_NAME", true), obj, this.responseCheckNickName.bind(this));
    }

    responseCheckNickName(msg) {
        if (msg.msg_code == "0") {
            cv.MessageCenter.send("register_to_set_account");
        }
    }

    requestCheckUserName(kUsername: string, kPassword: string) {
        let obj = {
            "username": kUsername,
            "passwd": cv.md5.md5(kPassword)
        };
        cv.http.sendRequest(cv.config.getStringData("WEB_API_CHECK_USER_NAME", true), obj, this.responseCheckUserName.bind(this));
    }

    responseCheckUserName(msg) {
        if (msg.msg_code == "0") {
            cv.MessageCenter.send("register_to_user_account");
            //返回私聊下载地址，注册时候给绑定私聊界面使用
            if (msg.sl_down_url) {
                cv.dataHandler.getUserData().sl_down_url = msg.data.sl_down_url;
            }
        }
        else {
            cv.TT.showMsg(msg.value, cv.Enum.ToastType.ToastTypeError);
        }
    }

    //注册-获取验证码
    public requestRegisterVCode(mobile: string, areaCode: string, captcha: string) {
        let obj = {
            "mobile": mobile,
            "areaCode": areaCode,
            "device_uuid": cv.native.GetDeviceUUID(),
            "captcha": captcha,
            "version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION()
        };
        let url = cv.config.getStringData("WEB_API_VCODE", true);
        cv.http.sendRequest(url, obj, this.onGetRegisterVCodeSuccess.bind(this));
    }

    //账号升级-获取验证码
    public requestUpdateGradeVCode(mobile: string, areaCode: string, captcha: string) {
        let obj = {
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "token": cv.dataHandler.getUserData().user_token,
            "mobile": mobile,
            "areaCode": areaCode,
            "device_uuid": cv.native.GetDeviceUUID(),
            "captcha": captcha,
            "version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION()
        };
        let url = cv.config.getStringData("WEB_API_TOURIST_VCODE", true);
        cv.http.sendRequest(url, obj, this.onGetRegisterVCodeSuccess.bind(this));
    }

    //忘记密码
    public requestVCode(mobile: string, areaCode: string, url: string) {
        let obj = {
            "mobile": mobile,
            "areaCode": areaCode
        };
        cv.http.sendRequest(url, obj, this.onGetForgetVCodeSuccess.bind(this));
    }

    public onGetRegisterVCodeSuccess(value) {
        if (value.msg_code === "0") {
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
            console.log("onGetRegisterVCodeSuccess===》》");
        } else {
            console.log("onGetRegisterVCodeSuccess===》》fail");
        }

        cv.MessageCenter.send("onGetRegisterVCodeSuccess", value);
    }

    public onGetForgetVCodeSuccess(value) {
        if (value.msg_code === "0") {
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
            console.log("onGetForgetVCodeSuccess===》》");
        } else {
            console.log("onGetForgetVCodeSuccess===》》fail");
        }

        cv.MessageCenter.send("onGetForgetVCodeSuccess", value);
    }

    //忘记密码-检测验证码
    public requestCheckForgetPsd(mobile, areaCode, VCode) {
        let url = cv.config.getStringData("WEB_API_FORGET_VCODE", true)
        let obj = {
            "mobile": mobile,
            "v_code": VCode,
            "areaCode": areaCode
        };

        cv.http.sendRequest(url, obj, this.onCheckForgetPsdSuccess.bind(this));
    }

    public onCheckForgetPsdSuccess(value) {
        if (value.msg_code === "0") {
            let data = value.data;
            //cv.dataHandler.getHttpData() = data;
            cv.MessageCenter.send("onCheckForgetPsdSuccess");

            console.log("onCheckForgetPsdSuccess===》》");
        } else {
            console.log("onCheckForgetPsdSuccess===》》fail");
        }

    }

    //忘记密码-验证设置的新密码
    public requestCheckNewPsd(mobile, areaCode, password) {
        let url = cv.config.getStringData("WEB_API_FORGET_SUBMIT", true)
        let passwd = cv.md5.md5(password);
        let obj = {
            "mobile": mobile,
            "passwd": passwd,
            "areaCode": areaCode
        };

        cv.http.sendRequest(url, obj, this.onCheckNewPsdSuccess.bind(this));
    }

    public onCheckNewPsdSuccess(value) {
        if (value.msg_code === "0") {
            let data = value.data;
            //cv.dataHandler.getHttpData() = data;
            cv.MessageCenter.send("onCheckNewPsdSuccess");

            console.log("onCheckNewPsdSuccess===》》");
        } else {
            console.log("onCheckNewPsdSuccess===》》fail");
        }
    }

    //游戏中重置密码
    public requestResetPsd(mobile, password, vcode, areacode) {
        let url = cv.config.getStringData("WEB_API_RESET_PASS", true)
        let pwd = cv.md5.md5(password);
        let obj = {
            "mobile": mobile,
            "v_code": vcode,
            "passwd": pwd,
            "areacode": areacode
        };
        cv.http.sendRequest(url, obj, this.onResetPsdSuccess.bind(this));
    }

    public onResetPsdSuccess(value) {
        //cv.TT.showMsg(value.msg, cv.TT.ToastType.ToastTypeWarning);
        if (value.msg_code === "0") {
            let data = value.data;
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("onResetPsdSuccess");
        }
        else {
            console.log("modify password failed");
            //cv.TT.showMsg(cv.cfg.getStringData("ServerErrorCode"+error), cv.Enum.ToastType.ToastTypeError);
        }
    }

    public requestSubmitTwoLevelPwd(mobile, password, vcode, areacode) {
        let url = cv.config.getStringData("WEB_API_RESET_SAFE", true)
        let pwd = cv.md5.md5(password);
        let token = cv.dataHandler.getUserData().user_token;
        let obj = {
            "mobile": mobile,
            "v_code": vcode,
            "safe": pwd,
            "areacode": areacode,
            "token": token
        };
        cv.http.sendRequest(url, obj, this.onTwoLevelSubmitSucc.bind(this));
    }

    public onTwoLevelSubmitSucc(value) {
        //cv.TT.showMsg(value.msg, cv.TT.ToastType.ToastTypeWarning);
        if (value.msg_code === "0") {
            let data = value.data;
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
            //cv.dataHandler.getHttpData() = data;
            // cv.MessageCenter.send("onTwoLevelSubmitSucc");
        } else {
            console.log("onTwoLevelSubmitSucc===》》fail");
        }
    }

    //注册-检测验证码
    public requestCheckRegisterIdCode(mobile: string, areaCode: string, VCode: string, invateCode: string) {
        let url = cv.config.getStringData("WEB_API_CHECK_VCODE", true)
        let obj = {
            "mobile": mobile,
            "v_code": VCode,
            "areaCode": areaCode,
            "invitation_code": invateCode
        };
        //记录邀请码
        cv.dataHandler.getUserData().invateCode = invateCode;
        cv.http.sendRequest(url, obj, this.onCheckRegisterIdCodeSuccess.bind(this));
    }

    //账号升级-检测验证码
    public requestCheckUpdateGradeIdCode(mobile: string, areaCode: string, VCode: string, invateCode: string) {
        let url = cv.config.getStringData("WEB_API_CHECK_TOURIST_VCODE", true)
        let obj = {
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "token": cv.dataHandler.getUserData().user_token,
            "mobile": mobile,
            "v_code": VCode,
            "areaCode": areaCode,
            "invitation_code": invateCode
        };

        cv.http.sendRequest(url, obj, this.onCheckRegisterIdCodeSuccess.bind(this));
    }

    public onCheckRegisterIdCodeSuccess(value) {

        this.tipsMsg(value);
        if (value.msg_code === "0") {
            // let data = value.data;
            // cv.dataHandler.getUserData().invitation_code = data.invitation_code;
            cv.MessageCenter.send("onCheckRegisterIdCodeSuccess");

            console.log("onCheckRegisterIdCodeSuccess===》》");
        } else {
            console.log("onCheckRegisterIdCodeSuccess===》》fail");
        }

    }

    //注册-完成注册
    public requestFinishRegister(mobile: string, nickname: string, password: string, RegCode: string, VCode: string, areaCode: string, userName: string, kInvateCode: string, avatar: string, gender: Number) {
        let url = cv.config.getStringData("WEB_API_REG", true)
        let passwd = cv.md5.md5(password);
        let device_uuid = cv.native.GetDeviceUUID();
        let kLocation = cv.native.GetLocation();
        let deviceType: string = "";
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            deviceType = "android";
        }
        else if (cc.sys.OS_IOS == cc.sys.os) {
            deviceType = "ios";
        }
        else {
            deviceType = "win32";
        }

        //检测是否安装私聊
        let packName = "com.wanlihao.safetalk";
        if (cc.sys.os == cc.sys.OS_IOS) {
            packName = "Safetalk";
        }
        let isInstallSiliao = cv.native.checkHaveAppOnDevice(packName)  //是否安装了私语
        let device_version = cv.native.getSystemVersion();
        let is_emulator = cv.native.IsSimulator();

        // save经纬度(提供给php登录使用, 因为该底层API延时过高不能及时取到值)，worldNetWork:550保存
        let longitude = cv.tools.GetStringByCCFile("longitude");
        let latitude = cv.tools.GetStringByCCFile("latitude");
        if (cv.StringTools.getArrayLength(longitude) <= 0) longitude = '1';
        if (cv.StringTools.getArrayLength(latitude) <= 0) latitude = '1';

        let obj = {
            "areaCode": areaCode,
            "device_uuid": device_uuid,
            "mobile": mobile,
            "nick_name": nickname,
            "passwd": passwd,
            "reg_code": RegCode,
            "v_code": VCode,
            "username": userName,
            "invitation_code": kInvateCode,
            //"version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION(),
            "version": cv.config.GET_CLIENT_VERSION(),
            "latitude": kLocation["latitude"] !== 1 ? kLocation["latitude"] :  latitude,
            "longitude": kLocation["longitude"] !== 1 ? kLocation["longitude"] : longitude,

            "deviceType": deviceType,
            "avatar": avatar,
            "gender": gender,
            "account": cv.dataHandler.getUserData().bindInputSLAccount,  //注册时候成功绑定私聊的输入的账号，没有成功私聊绑定为空
            "is_down_sl": isInstallSiliao ? 1 : 0, //是否安装私聊
            "device_version": device_version,
            "is_emulator": is_emulator ? 1 : 0,
            "dmodel": cv.native.GetDeviceUUID(true, true),
        };

        cv.http.sendRequest(url, obj, this.onFinishRegisterSuccess.bind(this));
    }

    public onFinishRegisterSuccess(value: any) {
        // if (value.is_upgrade && value.is_upgrade == 1) {         临时屏蔽 0910
        //     cv.MessageCenter.send("OnHttplogin");
        //     return;
        // }

        let msgCode = value.msg_code;
        if (msgCode === "0") {
            let data = value.data;
            console.log("onUserNameLoginSuccess");
            cv.dataHandler.getUserData().user_id = data.user_id;
            cv.tools.SaveStringByCCFile("user_id", cv.dataHandler.getUserData().user_id);
            cv.dataHandler.getUserData().u32Uid = parseInt(data.user_id);
            cv.dataHandler.getUserData().user_token = data.token;
            this.md5token();
            cv.dataHandler.getUserData().user_ip = data.ip;
            cv.dataHandler.getUserData().mobile = cv.String(data.mobile);
            cv.dataHandler.getUserData().user_safe = data.safe;
            cv.dataHandler.getUserData().areaCode = data.areaCode;
            cv.dataHandler.getUserData().nick_name = data.nick_name;
            cv.dataHandler.getUserData().pay_type = data.pay_type;
            cv.dataHandler.getUserData().vipTool_url = data.vipTool_url;
            cv.dataHandler.getUserData().button_1 = data.button_1;
            cv.dataHandler.getUserData().button_1_english = data.button_1_english;
            cv.dataHandler.getUserData().button_2 = data.button_2;
            cv.dataHandler.getUserData().button_2_english = data.button_2_english;
            cv.dataHandler.getUserData().button_3 = data.button_3;
            cv.dataHandler.getUserData().button_3_english = data.button_3_english;
            cv.dataHandler.getUserData().shopUrl = data.shop;
            cv.dataHandler.getUserData().isEncrypt = [];
            cv.StringTools.deepCopy(data.encry_switch, cv.dataHandler.getUserData().isEncrypt);
            cv.dataHandler.getUserData().download_url = data.download_url;
            cv.dataHandler.getUserData().club_head = data.club_head;
            cv.dataHandler.getUserData().bk_img = data.bk_img;
            cv.dataHandler.getUserData().isvpn = Boolean(data.is_vpn);
            cv.dataHandler.getUserData().isban = Boolean(data.is_ban);
            cv.dataHandler.getUserData().is_allow_update_name = Boolean(data.is_allow_update_name);
            cv.dataHandler.getUserData().file_upload_url = data.file_upload_url;
            cv.dataHandler.getUserData().default_hall_view = cv.Number(data.default_hall_view);
            cv.dataHandler.getUserData().default_hall_view_enabled = true;
            
            //私聊验证
            cv.dataHandler.getUserData().verityType = data.send_vcode_type;  //发送验证码发送，1为短信发送，2为私聊发送
            cv.dataHandler.getUserData().is_bind_sl = data.is_bind_sl; //是否绑定了私聊
            cv.dataHandler.getUserData().sl_down_url = data.sl_down_url; //私聊下载地址
            cv.dataHandler.getUserData().sl_account = data.sl_account; //私聊账号
            cv.dataHandler.getUserData().is_alert_sl = data.is_alert_sl; //是否弹首次提示引导
            cv.dataHandler.getUserData().isViewWPT = data.wpt == "1";

            let preNum = cv.config.HAVE_MTT;
            if (data.mtt_status == 2) {//2是维护中 1是开启
                cv.config.HAVE_MTT = false;
            }
            else if (data.mtt_status == 1) {
                cv.config.setMTT();
            }

            if (preNum != cv.config.HAVE_MTT) {
                cv.MessageCenter.send("update_mtt_state");
            }

            let preNumJack = cv.config.HAVE_BLACKJACK;
            if(data.black_jack_status == 2) {  //21点，2是维护，1是开启
                cv.config.setBlackJack(false);
            }else if(data.black_jack_status == 1){
                cv.config.setBlackJack(true);
            } 
            if (preNumJack != cv.config.HAVE_BLACKJACK) {  //如果状态有改变
                cv.MessageCenter.send("update_blackJack_state");
            }

            this.handleActivityData(data.activity);
            cv.domainMgr.initDoMain();

            for (const ite of data.domain) {
                cv.domainMgr.addDomain(ite);
            }
            cv.domainMgr.saveDomain(data);
            cv.domainMgr.initLoginServer();
            //跟踪用户行为，用户唯一标识和游戏id绑定
            cv.segmentTool.track(cv.Enum.CurrentScreen.Login, cv.Enum.segmentEvent.UserLoggedIn, cv.Enum.Functionality.login);
            cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.UserRegistered, cv.Enum.Functionality.registration);
            cv.segmentTool.alias();
            cv.segmentTool.identify(cv.Enum.Functionality.registration, cv.Enum.CurrentScreen.profile);

           // cv.TP.showMsg(cv.config.getStringData("Login_Scene_register_panel_succeed"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.sureToLoginSuccess.bind(this), null, false, "");
            
            cv.MessageCenter.send("onRegisterSucces");
            //cv.worldNet.connectServer();
            //console.log("onLoginSuccess===》》" + "userId:" + cv.dataHandler.getUserData().user_id + " kToken:" + cv.dataHandler.getUserData().user_token + " kIp:" + cv.dataHandler.getUserData().user_ip);
        }
        else {
            console.log("onFinishRegisterSuccess===》》fail");
            this.tipsMsg(value);
        }
    }

    sureToLoginSuccess(): void {
        cv.MessageCenter.send("onLoginSuccess");
    }

    //游客 - 账号升级完成
    public requestFinishUpdateGrade(mobile: string, nickname: string, password: string, RegCode: string, VCode: string, areaCode: string, userName: string, kInvateCode: string, avatar: string, gender: Number) {
        let url = cv.config.getStringData("WEB_API_TOURIST_UPGRADE", true)
        let passwd = cv.md5.md5(password);
        let device_uuid = cv.native.GetDeviceUUID();
        let kLocation = cv.native.GetLocation();
        let deviceType: string = "";
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            deviceType = "android";
        }
        else if (cc.sys.OS_IOS == cc.sys.os) {
            deviceType = "ios";
        }
        else {
            deviceType = "win32";
        }

        //检测是否安装私聊
        let packName = "com.wanlihao.safetalk";
        if (cc.sys.os == cc.sys.OS_IOS) {
            packName = "Safetalk";
        }
        let isInstallSiliao = cv.native.checkHaveAppOnDevice(packName)  //是否安装了私语

        let obj = {
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "token": cv.dataHandler.getUserData().user_token,
            "areaCode": areaCode,
            "device_uuid": device_uuid,
            "mobile": mobile,
            "nick_name": nickname,
            "passwd": passwd,
            "reg_code": RegCode,
            "v_code": VCode,
            "username": userName,
            "invitation_code": kInvateCode,
            "version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION(),
            "latitude": kLocation["latitude"],
            "longitude": kLocation["longitude"],
            "deviceType": deviceType,
            "avatar": avatar,
            "gender": gender,
            "account": cv.dataHandler.getUserData().bindInputSLAccount,  //注册时候成功绑定私聊的输入的账号，没有成功私聊绑定为空
            "is_down_sl": isInstallSiliao ? 1 : 0, //是否安装私聊
        };


        cv.http.sendRequest(url, obj, this.onFinishUpdateGradeSuccess.bind(this));
    }
    /**
     * 账号升级成功
     * @param value
     */
    public onFinishUpdateGradeSuccess(value: any) {
        // if (value.is_upgrade && value.is_upgrade == 1) {         临时屏蔽 0910
        //     cv.MessageCenter.send("OnHttplogin");
        //     return;
        // }

        let msgCode = value.msg_code;
        if (msgCode === "0") {
            let data = value.data;
            console.log("onUserNameLoginSuccess");
            cv.dataHandler.getUserData().is_allow_update_name = data.is_allow_update_name;
            cv.MessageCenter.send("onUpdateGradeAccountSucc");
            //cv.TP.showMsg(cv.config.getStringData("Login_Scene_updateGrade_panel_succeed"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.sureToRelogin.bind(this), null, false, "");
            return;
            cv.dataHandler.getUserData().u32Uid = parseInt(data.user_id);
            cv.dataHandler.getUserData().user_token = data.token;
            this.md5token();
            cv.dataHandler.getUserData().user_ip = data.ip;
            cv.dataHandler.getUserData().mobile = cv.String(data.mobile);
            cv.dataHandler.getUserData().user_safe = data.safe;
            cv.dataHandler.getUserData().areaCode = data.areaCode;

            cv.dataHandler.getUserData().pay_type = data.pay_type;
            cv.dataHandler.getUserData().button_1 = data.button_1;
            cv.dataHandler.getUserData().button_1_english = data.button_1_english;
            cv.dataHandler.getUserData().button_2 = data.button_2;
            cv.dataHandler.getUserData().button_2_english = data.button_2_english;
            cv.dataHandler.getUserData().button_3 = data.button_3;
            cv.dataHandler.getUserData().button_3_english = data.button_3_english;
            cv.dataHandler.getUserData().shopUrl = data.shop;
            cv.dataHandler.getUserData().isEncrypt = [];
            cv.StringTools.deepCopy(data.encry_switch, cv.dataHandler.getUserData().isEncrypt);
            cv.dataHandler.getUserData().download_url = data.download_url;
            cv.dataHandler.getUserData().club_head = data.club_head;
            cv.dataHandler.getUserData().bk_img = data.bk_img;
            cv.dataHandler.getUserData().isvpn = Boolean(data.is_vpn);
            cv.dataHandler.getUserData().isban = Boolean(data.is_ban);
            cv.dataHandler.getUserData().is_allow_update_name = Boolean(data.is_allow_update_name);
            cv.dataHandler.getUserData().file_upload_url = data.file_upload_url;

            let preNum = cv.config.HAVE_MTT;
            if (data.mtt_status == 2) {//2是维护中 1是开启
                cv.config.HAVE_MTT = false;
            }
            else if (data.mtt_status == 1) {
                cv.config.setMTT();
            }

            if (preNum != cv.config.HAVE_MTT) {
                cv.MessageCenter.send("update_mtt_state");
            }

            let preNumJack = cv.config.HAVE_BLACKJACK;
            if(data.black_jack_status == 2) {  //21点，2是维护，1是开启
                cv.config.setBlackJack(false);
            }else if(data.black_jack_status == 1){
                cv.config.setBlackJack(true);
            } 
            if (preNumJack != cv.config.HAVE_BLACKJACK) {  //如果状态有改变
                cv.MessageCenter.send("update_blackJack_state");
            }
            
            let activity = data.activity;
            cv.dataHandler.getActivityData().isShow = true;
            cv.dataHandler.getActivityData().removeActivityInfo();
            cv.dataHandler.getActivityData().is_alert_avatar = activity.is_alert_avatar;
            let kData = activity.act;
            let activitylen = cv.StringTools.getArrayLength(kData);
            for (let i = 0; i < activitylen; ++i) {
                let xdata: ActivityInfo = new ActivityInfo();
                xdata.activity_id = kData[i].id;
                xdata.activity_url = kData[i].link.slice(0);
                xdata.activity_pictrue = kData[i].pictrue;
                xdata.frequency = kData[i].times;
                xdata.activity_type = kData[i].type;
                cv.dataHandler.getActivityData().addActivityInfo(i, xdata);
            }
            let game = activity.game;
            let gamelen = cv.StringTools.getArrayLength(game);
            for (let i = 0; i < gamelen; ++i) {
                let xdata: ActivityInfo = new ActivityInfo();
                xdata.activity_id = game[i].id;
                xdata.activity_url = game[i].link.slice(0);
                xdata.activity_pictrue = game[i].pictrue;
                xdata.frequency = game[i].times;
                xdata.activity_type = game[i].type;
                cv.dataHandler.getActivityData().addActivityInfo(activitylen + i, xdata);
            }
            cv.domainMgr.initDoMain();

            for (const ite of data.domain) {
                cv.domainMgr.addDomain(ite);
            }
            cv.domainMgr.saveDomain(data);
            cv.domainMgr.initLoginServer();

            cv.TP.showMsg(cv.config.getStringData("Login_Scene_updateGrade_panel_succeed"), cv.Enum.ButtonStyle.GOLD_BUTTON, this.sureToRelogin.bind(this), null, false, "");
            //cv.worldNet.connectServer();
            //console.log("onLoginSuccess===》》" + "userId:" + cv.dataHandler.getUserData().user_id + " kToken:" + cv.dataHandler.getUserData().user_token + " kIp:" + cv.dataHandler.getUserData().user_ip);
        }
        else {
            console.log("onFinishUpdateGradeSuccess===》》fail");
            this.tipsMsg(value);
        }
    }
    //确认重新登录
    sureToRelogin(): void {
        //让上一次游客登录失效，因为升级以后不是游客了。
        cv.tools.SaveStringByCCFile("is_tourist_login", "0");
        cv.MessageCenter.send("toRelogin");
    }

    // --------------------------------------------------------------------------------------------------
    // 切换账号
    public requestLogout() {
        let obj = this._getUserTokenField();
        let url = cv.config.getStringData("WEB_API_LOGOUT", true);
        cv.http.sendRequest(url, obj, this._onLogoutSuccess.bind(this));
    }
    private _onLogoutSuccess(value: any): void {
        if (value.msg_code === "0") {
            // 弹出提示
            let sTipsMsg: string = "";
            let language: string = cv.config.getCurrentLanguage();
            switch (language) {
                case cv.Enum.LANGUAGE_TYPE.zh_CN: {
                    sTipsMsg = value["msg"];
                } break;
                case cv.Enum.LANGUAGE_TYPE.en_US: {
                    sTipsMsg = value["message"];
                } break;

                default:
                    break;
            }
            // cv.TT.showMsg(sTipsMsg, cv.Enum.ToastType.ToastTypeInfo);

            // 重新初始化登录信息
            this._initLoginServer();

            // 清理 token 缓存
            cc.sys.localStorage.setItem('user_token', "");
            cc.sys.localStorage.setItem('user_uid', "");

            // 发送登出成功消息
            cv.netWorkManager.Logout();
        }
    }


    //=====================================大厅======================================
    public requsetNoticeJsonData() {
        let url = cv.config.getStringData("WEB_API_NOTICE_LIST", true);
        let obj = {
            "is_english": cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? 0 : 1
        };
        cv.http.sendRequest(url, obj, this.onGetNoticeSuccess.bind(this));
    }

    public onGetNoticeSuccess(value: any) {
        if (value.msg_code === "0") {
            cv.MessageCenter.send("onGetNoticeSuccess", value);

            console.log("onGetNoticeSuccess===》》");
        }
        else {
            this.tipsMsg(value);
            console.log("onGetNoticeSuccess===》》 fail");
        }
    }
    public setDefaultHead(headId: string) {
        let url = cv.config.getStringData("WEB_API_SET_DEFAULT_HEAD", true);
        let user_token = cv.dataHandler.getUserData().user_token;
        let user_id = cv.dataHandler.getUserData().user_id;
        let obj = { "token": user_token, "user_id": user_id, "avatar": headId };
        console.log("====> setDefaultHead:data =" + obj);
        cv.http.sendRequest(url, obj, this._onSetDefaultHead.bind(this));
    }

    public _onSetDefaultHead(value: any) {
        if (value.msg_code != "0") {
            this.tipsMsg(value);
        }
        else {
            let kDataRoot = value.data;
            cv.dataHandler.getUserData().headUrl = kDataRoot.avatar;
            cv.MessageCenter.send("update_info");
        }
    }

    public requestUpdatePlayerInfo() {
        let url = cv.config.getStringData("WEB_API_UPDATE_INFO", true);
        let user_token = cv.dataHandler.getUserData().user_token;
        let user_id = cv.dataHandler.getUserData().user_id;
        let obj = { "token": user_token, "user_id": user_id };
        console.log("====> requestUpdatePlayerInfo:data =" + obj);
        cv.http.sendRequest(url, obj, this.onGetPlayerInfoSuccess.bind(this));
    }

    public onGetPlayerInfoSuccess(value: any) {
        if (value.msg_code === "0") {
            let data = value.data;
            console.log("====> onGetPlayerInfoSuccess:data =" + data);
            cv.dataHandler.getUserData().user_id = data.user_id;
            cv.dataHandler.getUserData().mobile = cv.String(data.mobile);
            cv.dataHandler.getUserData().nick_name = data.nick_name;
            cv.dataHandler.getUserData().gender = cv.Number(data.gender);
            cv.dataHandler.getUserData().user_marks = data.user_marks;
            cv.dataHandler.getUserData().headUrl = data.avatar;
            cv.dataHandler.getUserData().diamond_num = cv.Number(data.diamond_num);
            cv.dataHandler.getUserData().u32Chips = cv.Number(data.user_gold);
            cv.dataHandler.getUserData().games_max = cv.Number(data.games_max);
            cv.dataHandler.getUserData().clubs_max = cv.Number(data.clubs_max);
            cv.dataHandler.getUserData().current_games = cv.Number(data.current_games);
            cv.dataHandler.getUserData().current_clubs = cv.Number(data.current_clubs);
            cv.dataHandler.getUserData().u32CardType = cv.Number(data.card_type);
            cv.dataHandler.getUserData().card_expire = cv.Number(data.card_expire);
            cv.dataHandler.getUserData().user_area = data.user_area;

            cv.MessageCenter.send("onGetPlayerInfoSuccess", data);

            console.log("onGetPlayerInfoSuccess===》》");
        } else {
            console.log("onGetPlayerInfoSuccess===》》fail");
        }
    }

    /**
     * @function 获取用户数据
     */
    public requestUserData(mode: Number, gameid: Number, blind: Number = 0, ante: Number = 0, identity: number = 0) {
        const token = cv.dataHandler.getUserData().user_token;
        const u32Uid = cv.dataHandler.getUserData().u32Uid;
        // const url = cv.config.getStringData("DATA_GETDATA", true);

        if (token == null || token == undefined) {
            // console.log("请求战绩、胜率数据失败，user_token  is null");
            return;
        }

        const obj = {
            'uid': u32Uid,
            token,
            mode,
            gameid,
            blind,
            ante,
            identity: identity
        };

        // cv.http.sendRequest(url, obj, this.responseUserData.bind(this), cv.http.HttpRequestType.POST, cv.http.HttpParseType.BOTH_ZIP);
        cv.dataNet.RequestGetData(data_pb.CMD.GET_DATA_REQ, obj, this.responseUserData.bind(this), true);
    }

    /**
     * @function 处理用户数据
     */
    public responseUserData(Value: any): void {
        const { data, jfdata, star_duration } = Value;

        if (data && data.trim().length > 0) {
            // 普通牌局
            if (data === 'decode error') {
                // 解码失败
                this.tipsMsg(Value);
            } else if (data === 'load data error') {
                // 加载数据失败；没有数据，重置所有
                cv.MessageCenter.send('RecetRoleInfoView');
            } else {
                const result = JSON.parse(data);

                if (Object.keys(result).length > 0) {
                    cv.dataHandler.getUserData().pokerdata = result;
                    cv.dataHandler.getUserData().pokerdata.star_duration = star_duration;

                    if (result.Total_win_money !== 0 && result.Total_hand_card_count !== 0) {
                        cv.dataHandler.getUserData().pokerdata.Fight_100 = result.Total_win_money / result.Total_hand_card_count * 100;
                    } else {
                        cv.dataHandler.getUserData().pokerdata.Fight_100 = 0;
                    }

                    if (result.Total_end_room_count > 0) {
                        cv.dataHandler.getUserData().pokerdata.Fight_average = result.Total_win_money / result.Total_end_room_count;
                        cv.dataHandler.getUserData().pokerdata.Buyin_average = result.Total_buyin / result.Total_end_room_count;
                    } else {
                        cv.dataHandler.getUserData().pokerdata.Fight_average = 0;
                        cv.dataHandler.getUserData().pokerdata.Buyin_average = 0;
                    }

                    cv.dataHandler.getUserData().pokerdata.Bb100s = [];
                    for (let i = 0; i < cv.StringTools.getArrayLength(result.bb_100_s); i++) {
                        let data: Bb100Info = new Bb100Info();
                        data.bb_value = result.bb_100_s[i].bb_value;
                        data.total_win_bb_count = result.bb_100_s[i].total_win_bb_count;
                        data.bb_100 = result.bb_100_s[i].bb_100;
                        cv.dataHandler.getUserData().pokerdata.Bb100s.push(data);
                    }
                }

                const pokerData = cv.dataHandler.getUserData().pokerdata;

                for (var i in pokerData) {
                    if (!pokerData[i] || pokerData[i] == NaN) {
                        pokerData[i] = 0;
                    }
                }

                cv.MessageCenter.send('update_userPokerData');
            }
        } else {
            // 菠萝蜜
            if (jfdata === 'decode error') {
                // 解码失败
                this.tipsMsg(Value);
            } else if (jfdata === 'load data error') {
                // 加载数据失败；没有数据，重置所有
                cv.MessageCenter.send('RecetRoleInfoView');
            } else {
                const result = JSON.parse(jfdata);

                if (Object.keys(result).length > 0) {
                    cv.dataHandler.getUserData().pokerdata = result;
                }

                const pokerData = cv.dataHandler.getUserData().pokerdata;

                for (var i in pokerData) {
                    if (!pokerData[i] || pokerData[i] == NaN) {
                        pokerData[i] = 0;
                    }
                }

                cv.MessageCenter.send('updateUserJackfruitData');
            }
        }
    }

    public static getInstance(): HttpHandler {
        if (!this.instence) {
            this.instence = new HttpHandler();
        }
        return this.instence;
    }

    /**
     * 请求收藏该手牌谱
     * @param uid 
     * @param game_uuid_js 
     * @param gameid 
     */
    public requestDoFavorite(uid: number, game_uuid_js: string, gameid: number): void {
        let obj = {
            "uid": uid,
            "game_uuid_js": game_uuid_js,
            "gameid": gameid
        }
        cv.dataNet.RequestGetData(data_pb.CMD.DO_FAVORITE_REQ, obj, this._onDoFavorite.bind(this));
    }
    private _onDoFavorite(value: any): void {
        let code: number = cv.Number(value["result"]);
        if (code === 0) {
            ++gameDataMgr.tCollectPokerMapData.totalCount;
            cv.TT.showMsg(cv.config.getStringData("UICollectSuccess"), cv.Enum.ToastType.ToastTypeSuccess);
        }
        else if (code === 2) {
            cv.TT.showMsg(cv.config.getStringData("UIHasCollect"), cv.Enum.ToastType.ToastTypeError);
        }
        else {
            cv.TT.showMsg(`data server DO_FAVORITE_RESP Unknown Error ${code}`, cv.Enum.ToastType.ToastTypeError);
        }
    }

    /**
     * 请求已收藏的牌谱的"game_uuid"数组(插入时间升序)
     * @param uid 
     * @param skip_size     跳过索引条数(下标从0开始, 含义和服务器保持一致)
     * @param count         拉取的数量
     */
    public requestGetFavoriteUUIDList(uid: number, skip_size: number, count: number): void {
        let obj = {
            "uid": uid,
            "skip_size": skip_size,
            "count": count
        }
        cv.dataNet.RequestGetData(data_pb.CMD.FAVORITE_LIST_NEW_REQ, obj, this._onGetFavoriteUUIDList.bind(this));
    }
    private _onGetFavoriteUUIDList(value: any): void {
        // 已收藏牌谱的总数量
        gameDataMgr.tCollectPokerMapData.totalCount = cv.Number(value.totalCount);

        // 拉取的"game_uuid"数组
        let skipIdx: number = cv.Number(value.skip_size);
        let count: number = cv.StringTools.getArrayLength(value.games);
        for (let i = 0; i < count; ++i) {
            let t: CollectUUID = new CollectUUID();
            t.index = skipIdx + i;
            t.uuid = value.games[i].game_uuid_js;
            // t.gameid = value.games[i].gameid;    // 服务端强调该处"gameid"来源不可靠, 弃用, 这里说明下
            t.addTime = value.games[i].add_time;
            gameDataMgr.tCollectPokerMapData.mUUIDCache.add(t.uuid, t);
        }

        // 消息通知
        cv.MessageCenter.send("update_favor_uuid_list", { skipIdx: skipIdx, count: count });
    }

    /**
     * 请求收藏牌谱指定"game_uuid"的那一局数据详情
     * @param uid 
     * @param game_uuid_js 
     */
    public requestFavoriteHand(uid: number, game_uuid_js: string): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "uid": uid,
            "game_uuid_js": game_uuid_js,
            "token": token
        }
        cv.dataNet.RequestGetData(data_pb.CMD.FAVORITE_HAND_REQ, obj, this._onFavoriteHand.bind(this), true);
    }
    public _onFavoriteHand(value: any): void {
        let err_code: number = cv.Number(value.err_code);
        let sGameUUID: string = cv.String(value.game_uuid_js);
        gameDataMgr.tCollectPokerMapData.mHandMapCache.add(sGameUUID, value);

        // 有真实数据
        if (err_code === 0) {
            let gameReocrd: game_pb.GameRecord = game_pb.GameRecord.fromObject(value.game_record);

            // 已知共牌
            cv.StringTools.clearArray(gameDataMgr.tCollectPokerMapData.tPokerHandData.vPublicCards);
            for (let i = 0; i < gameReocrd.public_cards.length; ++i) {
                let ct: HandCardType = new HandCardType();
                ct.eCardNum = cv.Number(gameReocrd.public_cards[i].number);
                ct.eCardSuit = cv.Number(gameReocrd.public_cards[i].suit);
                gameDataMgr.tCollectPokerMapData.tPokerHandData.vPublicCards.push(ct);
            }

            // 未发出的共牌
            cv.StringTools.clearArray(gameDataMgr.tCollectPokerMapData.tPokerHandData.vUnsendPublicCards);
            for (let i = 0; i < gameReocrd.unsend_public_cards.length; ++i) {
                let ct: HandCardType = new HandCardType();
                ct.eCardNum = cv.Number(gameReocrd.unsend_public_cards[i].number);
                ct.eCardSuit = cv.Number(gameReocrd.unsend_public_cards[i].suit);
                gameDataMgr.tCollectPokerMapData.tPokerHandData.vUnsendPublicCards.push(ct);
            }

            // 旁观者发齐强制亮牌的uid数组
            cv.StringTools.clearArray(gameDataMgr.tCollectPokerMapData.tPokerHandData.vShowCardByStanderUID);
            for (let i = 0; i < cv.StringTools.getArrayLength(value.show_card_bystander_uid); ++i) {
                gameDataMgr.tCollectPokerMapData.tPokerHandData.vShowCardByStanderUID.push(value.show_card_bystander_uid[i]);
            }

            // 临时解析 d sb bb 位(这里"replay"字段在下发数据中有可能是空, 做个容错处理)
            let playerSeatInfo: HashMap<number, any> = new HashMap();
            if (value.replay !== null && typeof value.replay !== "undefined") {
                let tableInfo: any = value.replay.TableInfo;
                let seatsInfo: any[] = value.replay.SeatsInfo.seats_info;
                for (let i = 0; i < cv.StringTools.getArrayLength(seatsInfo); ++i) {
                    let psi = { seatNo: seatsInfo[i].seat_no, seatInfo: 0, uid: seatsInfo[i].UID };
                    if (psi.seatNo === tableInfo.dealer_seat) {
                        psi.seatInfo |= 1; //D 001
                    }
                    if (psi.seatNo === tableInfo.sb_seat) {
                        psi.seatInfo |= 2; //SB 010
                    }
                    if (psi.seatNo === tableInfo.bb_seat) {
                        psi.seatInfo |= 4; //BB 100
                    }
                    playerSeatInfo.add(psi.uid, psi);
                }
            }

            // 填充玩家数据信息
            cv.StringTools.clearArray(gameDataMgr.tCollectPokerMapData.tPokerHandData.vPlayerRecords);
            for (let i = 0; i < gameReocrd.records.length; ++i) {
                let tRecord: PlayerRecord = new PlayerRecord();
                tRecord.sPlayerName = gameReocrd.records[i].player_name;
                tRecord.sPlayerHead = cv.String(gameReocrd.records[i].player_head);
                tRecord.nPlayerBettingRoundBet = cv.Number(gameReocrd.records[i].player_betting_round_bet);
                tRecord.nWinBet = cv.Number(gameReocrd.records[i].win_bet);
                tRecord.nInsuranceBet = cv.Number(gameReocrd.records[i].insurance_bet_amount);
                tRecord.nInsuranceAmount = cv.Number(gameReocrd.records[i].insurance_winbet);
                tRecord.bFold = Boolean(gameReocrd.records[i].is_fold);
                tRecord.nPlayerID = cv.Number(gameReocrd.records[i].playerid);
                tRecord.bMuck = Boolean(gameReocrd.records[i].is_muck);
                tRecord.bActiveShow = Boolean(gameReocrd.records[i].is_active_show);
                tRecord.bForceShowDown = Boolean(gameReocrd.records[i].is_force_show);
                tRecord.nLastRoundType = cv.Number(gameReocrd.records[i].LastRoundType);
                tRecord.plat = cv.Number(gameReocrd.records[i].plat);
                tRecord.nReviewSendOutLen = cv.Number(gameReocrd.records[i].send_card_len);
                tRecord.nJackWinbet = cv.Number(gameReocrd.records[i].jack_winbet);

                for (let j = 0; j < gameReocrd.records[i].cards.length; ++j) {
                    let ct: HandCardType = new HandCardType();
                    ct.eCardNum = cv.Number(gameReocrd.records[i].cards[j].number);
                    ct.eCardSuit = cv.Number(gameReocrd.records[i].cards[j].suit);
                    tRecord.vCards.push(ct);
                }

                if (playerSeatInfo.length > 0) {
                    let psi: any = playerSeatInfo.get(tRecord.nPlayerID);
                    if (psi) {
                        tRecord.seatNo = psi.seatNo;
                        tRecord.seatInfo = psi.seatInfo;
                    }
                }

                gameDataMgr.tCollectPokerMapData.tPokerHandData.vPlayerRecords.push(tRecord);
            }

            let nGameid: number = cv.Number(value.gameid);
            let nGameMode: number = cv.Number(value.game_mode);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nGameid = nGameid;
            gameDataMgr.tCollectPokerMapData.tPokerHandData.sGameUUID = sGameUUID;
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nJackpotWinbet = cv.Number(value.jackpot_winbet);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.bAssociatedJackpot = Boolean(value.is_associated_jackpot);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nCreateTime = cv.Number(value.start_time);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nTotalPot = cv.Number(gameReocrd.total_pot);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nMaxPot = cv.Number(value.max_port);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nInsuranceWinbet = cv.Number(value.insurace_winbet);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nGameMode = nGameMode === 0 ? 1 : nGameMode;
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nShortFull = cv.Number(value.short_full);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.objReplay = value.replay;
            gameDataMgr.tCollectPokerMapData.tPokerHandData.objReplayInsurance = value.replayinsurance;
            gameDataMgr.tCollectPokerMapData.tPokerHandData.bMirco = Boolean(value.ismirco);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.bForceShowcard = Boolean(value.force_showcard);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nForceShowCoin = cv.Number(value.force_show_coin);
            gameDataMgr.tCollectPokerMapData.tPokerHandData.nSendOutCoin = cv.Number(value.next_show_left_coin);

            // 明星桌这个字段才有意义
            if (nGameid === cv.Enum.GameId.StarSeat) {
                if (value.is_star_closed !== null || typeof value.is_star_closed !== "undefined") {
                    gameDataMgr.tCollectPokerMapData.tPokerHandData.bStarClosed = Boolean(value.is_star_closed);
                }
            }
            // 否则默认为"true"(即为普通桌)
            else {
                gameDataMgr.tCollectPokerMapData.tPokerHandData.bStarClosed = true;
            }
        }
        // 无真实数据
        else {
            gameDataMgr.tCollectPokerMapData.tPokerHandData.reset();
            gameDataMgr.tCollectPokerMapData.tPokerHandData.sGameUUID = sGameUUID;
            console.error(`HttpHandler - FAVORITE_HAND_RESP error: code = ${err_code}`);
        }

        // 通知更新视图
        cv.MessageCenter.send("update_handMap", err_code);
    }

    /**
     * 请求游戏牌局中指定"game_uuid"的那一局数据详情
     * @param uid 
     * @param game_uuid_js 
     * @param gameid 
     */
    public requestGameHand(uid: number, game_uuid_js: string, gameid: number): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "uid": uid,
            "game_uuid_js": game_uuid_js,
            "gameid": gameid,
            "token": token
        }
        cv.dataNet.RequestGetData(data_pb.CMD.GAME_HAND_REQ, obj, this._onGameHand.bind(this), true);
    }
    public _onGameHand(value: any): void {
        let err_code: number = cv.Number(value.err_code);
        let sGameUUID: string = cv.String(value.game_uuid_js);
        gameDataMgr.tGameRecords.mHandMapCache.add(sGameUUID, value);

        // 有真实数据
        if (err_code === 0) {
            let gameReocrd: game_pb.GameRecord = game_pb.GameRecord.fromObject(value.game_record);

            // 已知共牌
            cv.StringTools.clearArray(gameDataMgr.tGameRecords.tPokerHandData.vPublicCards);
            for (let i = 0; i < gameReocrd.public_cards.length; ++i) {
                let ct: HandCardType = new HandCardType();
                ct.eCardNum = cv.Number(gameReocrd.public_cards[i].number);
                ct.eCardSuit = cv.Number(gameReocrd.public_cards[i].suit);
                gameDataMgr.tGameRecords.tPokerHandData.vPublicCards.push(ct);
            }

            // 未发出的共牌
            cv.StringTools.clearArray(gameDataMgr.tGameRecords.tPokerHandData.vUnsendPublicCards);
            for (let i = 0; i < gameReocrd.unsend_public_cards.length; ++i) {
                let ct: HandCardType = new HandCardType();
                ct.eCardNum = cv.Number(gameReocrd.unsend_public_cards[i].number);
                ct.eCardSuit = cv.Number(gameReocrd.unsend_public_cards[i].suit);
                gameDataMgr.tGameRecords.tPokerHandData.vUnsendPublicCards.push(ct);
            }

            // 旁观者发齐强制亮牌的uid数组
            cv.StringTools.clearArray(gameDataMgr.tGameRecords.tPokerHandData.vShowCardByStanderUID);
            for (let i = 0; i < cv.StringTools.getArrayLength(value.show_card_bystander_uid); ++i) {
                gameDataMgr.tGameRecords.tPokerHandData.vShowCardByStanderUID.push(value.show_card_bystander_uid[i]);
            }

            // 临时解析 d sb bb 位(这里"replay"字段在下发数据中有可能是空, 做个容错处理)
            let playerSeatInfo: HashMap<number, any> = new HashMap();
            if (value.replay !== null && typeof value.replay !== "undefined") {
                let tableInfo = value.replay.TableInfo;
                let seatsInfo = value.replay.SeatsInfo.seats_info;
                for (let i = 0; i < cv.StringTools.getArrayLength(seatsInfo); ++i) {
                    let psi = { seatNo: seatsInfo[i].seat_no, seatInfo: 0, uid: seatsInfo[i].UID };
                    if (psi.seatNo === tableInfo.dealer_seat) {
                        psi.seatInfo |= 1; //D 001
                    }
                    if (psi.seatNo === tableInfo.sb_seat) {
                        psi.seatInfo |= 2; //SB 010
                    }
                    if (psi.seatNo === tableInfo.bb_seat) {
                        psi.seatInfo |= 4; //BB 100
                    }
                    playerSeatInfo.add(psi.uid, psi);
                }
            }

            // 填充玩家数据信息
            cv.StringTools.clearArray(gameDataMgr.tGameRecords.tPokerHandData.vPlayerRecords);
            for (let i = 0; i < gameReocrd.records.length; ++i) {
                let tRecord: PlayerRecord = new PlayerRecord();
                tRecord.sPlayerName = cv.String(gameReocrd.records[i].player_name);
                tRecord.sPlayerHead = cv.String(gameReocrd.records[i].player_head);
                tRecord.nPlayerBettingRoundBet = cv.Number(gameReocrd.records[i].player_betting_round_bet);
                tRecord.nWinBet = cv.Number(gameReocrd.records[i].win_bet);
                tRecord.nInsuranceBet = cv.Number(gameReocrd.records[i].insurance_bet_amount);
                tRecord.nInsuranceAmount = cv.Number(gameReocrd.records[i].insurance_winbet);
                tRecord.bFold = Boolean(gameReocrd.records[i].is_fold);
                tRecord.nPlayerID = cv.Number(gameReocrd.records[i].playerid);
                tRecord.bMuck = Boolean(gameReocrd.records[i].is_muck);
                tRecord.bActiveShow = Boolean(gameReocrd.records[i].is_active_show);
                tRecord.bForceShowDown = Boolean(gameReocrd.records[i].is_force_show);
                tRecord.nLastRoundType = cv.Number(gameReocrd.records[i].LastRoundType);
                tRecord.plat = cv.Number(gameReocrd.records[i].plat);
                tRecord.nReviewSendOutLen = cv.Number(gameReocrd.records[i].send_card_len);
                tRecord.nJackWinbet = cv.Number(gameReocrd.records[i].jack_winbet);

                for (let j = 0; j < gameReocrd.records[i].cards.length; ++j) {
                    let ct: HandCardType = new HandCardType();
                    ct.eCardNum = cv.Number(gameReocrd.records[i].cards[j].number);
                    ct.eCardSuit = cv.Number(gameReocrd.records[i].cards[j].suit);
                    tRecord.vCards.push(ct);
                }

                if (playerSeatInfo.length > 0) {
                    let psi: any = playerSeatInfo.get(tRecord.nPlayerID);
                    if (psi) {
                        tRecord.seatNo = psi.seatNo;
                        tRecord.seatInfo = psi.seatInfo;
                    }
                }

                gameDataMgr.tGameRecords.tPokerHandData.vPlayerRecords.push(tRecord);
            }

            let nGameid: number = cv.Number(value.gameid);
            let nGameMode: number = cv.Number(value.game_mode);
            gameDataMgr.tGameRecords.tPokerHandData.nGameid = nGameid;
            gameDataMgr.tGameRecords.tPokerHandData.sGameUUID = sGameUUID;
            gameDataMgr.tGameRecords.tPokerHandData.nClubID = cv.Number(value.clubid);
            gameDataMgr.tGameRecords.tPokerHandData.nRoomID = cv.Number(value.roomid);
            gameDataMgr.tGameRecords.tPokerHandData.sRoomUUID = cv.String(value.room_uuid_js);
            gameDataMgr.tGameRecords.tPokerHandData.nCreateTime = cv.Number(value.start_time);
            gameDataMgr.tGameRecords.tPokerHandData.nTotalPot = cv.Number(gameReocrd.total_pot);
            gameDataMgr.tGameRecords.tPokerHandData.nMaxPot = cv.Number(value.max_port);
            gameDataMgr.tGameRecords.tPokerHandData.nInsuranceWinbet = cv.Number(value.insurace_winbet);
            gameDataMgr.tGameRecords.tPokerHandData.nJackpotWinbet = cv.Number(value.jackpot_winbet);
            gameDataMgr.tGameRecords.tPokerHandData.nGameMode = nGameMode === 0 ? 1 : nGameMode;
            gameDataMgr.tGameRecords.tPokerHandData.nShortFull = cv.Number(value.short_full);
            gameDataMgr.tGameRecords.tPokerHandData.objReplay = value.replay;
            gameDataMgr.tGameRecords.tPokerHandData.objReplayInsurance = value.replayinsurance;
            gameDataMgr.tGameRecords.tPokerHandData.bMirco = Boolean(value.ismirco);
            gameDataMgr.tGameRecords.tPokerHandData.bForceShowcard = Boolean(value.force_showcard);

            // 明星桌这个字段才有意义
            if (nGameid === cv.Enum.GameId.StarSeat) {
                if (value.is_star_closed !== null || typeof value.is_star_closed !== "undefined") {
                    gameDataMgr.tGameRecords.tPokerHandData.bStarClosed = Boolean(value.is_star_closed);
                }
            }
            // 否则默认为"true"(即为普通桌)
            else {
                gameDataMgr.tGameRecords.tPokerHandData.bStarClosed = true;
            }
        }
        // 无真实数据
        else {
            gameDataMgr.tGameRecords.tPokerHandData.reset();
            gameDataMgr.tGameRecords.tPokerHandData.sGameUUID = sGameUUID;
            console.error(`HttpHandler - GAME_HAND_RESP error: code = ${err_code}`);
        }

        // 通知更新视图
        cv.MessageCenter.send("update_handMap", err_code);
    }

    /**
     * 批量请求已收藏牌局中指定"game_uuid"数组的的精简版列表数据
     * @param uid 
     * @param game_uuids 
     */
    public requestGameReviewFavoriteList(uid: number, game_uuids: string[]): void {
        let obj = {
            "uid": uid,
            "game_uuids": game_uuids
        }
        cv.dataNet.RequestGetData(data_pb.CMD.GAME_REVIEW_LIST_REQ, obj, this._onGameReviewFavoriteList.bind(this), true);
    }
    private _onGameReviewFavoriteList(value: any): void {
        let games: any[] = value.games;
        let result: number = cv.Number(value.result);
        if (result !== 0) console.error(`HttpHandler - GAME_REVIEW_LIST_RESP error: code = ${result}, missing data`);

        let len: number = cv.StringTools.getArrayLength(games);
        if (len <= 0) return;

        for (let i = 0; i < len; ++i) {
            let d: any = games[i];
            let t: SimpleGameReviewFavorite = new SimpleGameReviewFavorite();

            t.game_uuid = cv.String(d.game_uuid);
            t.game_id = cv.Number(d.game_id);
            t.game_mode = cv.Number(d.game_mode);
            t.win_bet = cv.Number(d.win_bet);
            t.player_id = cv.Number(d.player_id);
            t.send_card_len = cv.Number(d.send_card_len);
            t.last_round_type = cv.Number(d.last_round_type);

            // 手牌
            for (let j = 0; j < cv.StringTools.getArrayLength(d.HandCards); ++j) {
                let card: HandCardType = new HandCardType();
                card.eCardNum = d.HandCards[j].number;
                card.eCardSuit = d.HandCards[j].suit;
                t.vHandCards.push(card);
            }

            // 已发共牌
            for (let j = 0; j < cv.StringTools.getArrayLength(d.PublicCards); ++j) {
                let card: HandCardType = new HandCardType();
                card.eCardNum = d.PublicCards[j].number;
                card.eCardSuit = d.PublicCards[j].suit;
                t.vPublicCards.push(card);
            }

            // 未发共牌
            for (let j = 0; j < cv.StringTools.getArrayLength(d.UnsendPublicCards); ++j) {
                let card: HandCardType = new HandCardType();
                card.eCardNum = d.UnsendPublicCards[j].number;
                card.eCardSuit = d.UnsendPublicCards[j].suit;
                t.vUnsendPublicCards.push(card);
            }

            let uuid_info: CollectUUID = gameDataMgr.tCollectPokerMapData.mUUIDCache.get(t.game_uuid);
            if (uuid_info) {
                t.addTime = uuid_info.addTime;
                gameDataMgr.tCollectPokerMapData.mSimpleHandMapCache.add(t.game_uuid, t);
            }
            else {
                console.error(`HttpHandler - GAME_REVIEW_LIST_RESP data error: uuid = ${t.game_uuid}`);
            }
        }

        // 通知更新视图
        cv.MessageCenter.send("update_favor_simple_handMap");
    }

    /**
     * 请求"收藏牌局"中强制亮牌
     * @param uid 
     * @param game_id 
     * @param game_uuid_js 
     */
    public requestFavoritForceShowCard(uid: number, game_id: number, game_uuid_js: string): void {
        let obj = {
            "uid": uid,
            "game_id": game_id,
            "game_uuid": game_uuid_js,
            "is_replay": true
        }
        cv.dataNet.RequestGetData(data_pb.CMD.FORCE_SHOW_CARD_REQ, obj, this._onFavoritForceShowCard.bind(this), true);
    }
    private _onFavoritForceShowCard(value: any): void {
        let err_code: number = cv.Number(value.err_code);
        if (err_code === 0) {
            cv.MessageCenter.send("on_favorit_forceshow", value);
        }
        else {
            switch (err_code) {
                // 余额不足, 弹出充值界面(走游戏服金币不足通用提示流程)
                case 6: {
                    let key: string = cv.config.getStringData("ServerErrorCode53");
                    cv.TT.showMsg(key, cv.Enum.ToastType.ToastTypeError);

                    cv.AudioMgr.playButtonSound('button_click');
                    cv.worldNet.requestGetUserData();
                    cv.SHOP.RechargeClick();
                } break;

                default: {
                    let key: string = cv.config.getStringData("ForceShowCardToastError");
                    cv.TT.showMsg(cv.StringTools.formatC(key, err_code), cv.Enum.ToastType.ToastTypeError);
                } break;
            }
        }
    }

    /**
     * 请求"收藏牌局"中发发看
     * @param uid 
     * @param game_id 
     * @param game_uuid_js 
     */
    public requestFavoritSendOutCard(uid: number, game_id: number, game_uuid_js: string): void {
        let obj = {
            "uid": uid,
            "game_id": game_id,
            "game_uuid": game_uuid_js,
            "is_replay": true
        }
        cv.dataNet.RequestGetData(data_pb.CMD.SEND_CARD_FUN_REQ, obj, this._onFavoritSendOutCard.bind(this), true);
    }
    private _onFavoritSendOutCard(value: any): void {
        let err_code: number = cv.Number(value.err_code);
        if (err_code === 0) {
            cv.MessageCenter.send("on_favorit_sendout", value);
        }
        else {
            switch (err_code) {
                // 余额不足, 弹出充值界面(走游戏服金币不足通用提示流程)
                case 7: {
                    let key: string = cv.config.getStringData("ServerErrorCode53");
                    cv.TT.showMsg(key, cv.Enum.ToastType.ToastTypeError);

                    cv.AudioMgr.playButtonSound('button_click');
                    cv.worldNet.requestGetUserData();
                    cv.SHOP.RechargeClick();
                } break;

                default: {
                    let key: string = cv.config.getStringData("GameReplaySendOutToastError");
                    cv.TT.showMsg(cv.StringTools.formatC(key, err_code), cv.Enum.ToastType.ToastTypeError);
                } break;
            }
        }
    }

    /**
     * 从已收藏牌局列表中批量删除指定"game_uuid"数组
     * @param uid 
     * @param game_uuids 
     */
    requestDeleteFavoriteList(uid: number, game_uuids: string[]): void {
        let obj = {
            "uid": uid,
            "game_uuids": game_uuids,
            "token": cv.dataHandler.getUserData().user_token,
        }
        cv.dataNet.RequestGetData(data_pb.CMD.DELETE_FAVORITE_LIST_REQ, obj, this._onDeleteFavoriteList.bind(this));
    }
    private _onDeleteFavoriteList(data: any): void {
        let result: number = cv.Number(data.result);
        cv.MessageCenter.send("delete_favor_handmap", result);
    }

    public requestRoomRecordList(clubId: number, mode: number, gameid: number, haveCount: number, callback: Function) {
        let token = cv.dataHandler.getUserData().user_token;
        let u32Uid = cv.dataHandler.getUserData().u32Uid;
        let url = cv.config.getStringData("DATA_GETROOMRECORDLIST", true);
        let client_type = cv.config.GET_CLIENT_TYPE();
        if (token == null || token == undefined) {
            console.log("请求战绩、胜率数据失败，user_token  is null");
            return;
        }
        let obj = {
            "token": token,
            "uid": u32Uid,
            "clubid": clubId,
            "mode": mode,
            "gameid": gameid,
            "have_count": haveCount
        };
        // cv.http.sendRequest(url, obj, callback, cv.http.HttpRequestType.POST, cv.http.HttpParseType.BOTH_ZIP);
        cv.dataNet.RequestGetData(data_pb.CMD.ROOM_RECORDS_LIST_REQ, obj, callback, true);
    }

    public requestRoomRecord(room_uuid: string) {
        let token = cv.dataHandler.getUserData().user_token;
        let u32Uid = cv.dataHandler.getUserData().u32Uid;
        let url = cv.config.getStringData("DATA_GETROOMRECORD", true);
        if (token == null || token == undefined) {
            console.log("请求结算数据失败，user_token  is null");
            return;
        }
        let obj = {
            "token": token,
            "uid": u32Uid,
            "room_uuid_js": room_uuid
        };
        // cv.http.sendRequest(url, obj, this.responseRoomRecordSuccess.bind(this), cv.http.HttpRequestType.POST, cv.http.HttpParseType.BOTH_ZIP);
        cv.dataNet.RequestGetData(data_pb.CMD.ROOM_RECORD_REQ, obj, this.responseRoomRecordSuccess.bind(this), true);
    }

    public responseRoomRecordSuccess(value: any) {
        let vAllianceInfo: any[] = value["alliance_clubids"];
        let vAllianceclubID: number[] = [];                     // 所有联盟下包函的ID

        // 联盟信息
        gameDataMgr.tGameRecords.tPokerInfoData.vAllinceResultInfos = [];
        for (let i = 0; i < cv.StringTools.getArrayLength(vAllianceInfo); ++i) {
            let tAllianceInfo: AllinceResultInfo = new AllinceResultInfo();
            tAllianceInfo.nAllianceID = vAllianceInfo[i]["AllianceId"];
            tAllianceInfo.sAllianceName = vAllianceInfo[i]["AllianceName"];

            let vClubID: any[] = vAllianceInfo[i]["Clubids"];
            for (let j = 0; j < cv.StringTools.getArrayLength(vClubID); ++j) {
                let nID: number = cv.Number(vClubID[j]);
                tAllianceInfo.vClubID.push(nID);
                vAllianceclubID.push(nID);
            }
            gameDataMgr.tGameRecords.tPokerInfoData.vAllinceResultInfos.push(tAllianceInfo);
        }

        // 俱乐部管理员ID
        let vClubAdminID: any[] = value["club_adminids"];
        gameDataMgr.tGameRecords.tPokerInfoData.vClubAdminids = [];
        for (let i = 0; i < cv.StringTools.getArrayLength(vClubAdminID); ++i) {
            gameDataMgr.tGameRecords.tPokerInfoData.vClubAdminids.push(cv.Number(vClubAdminID[i]));
        }

        let game_id: number = cv.Number(value["gameid"]);
        let room_uuid_js: string = cv.String(value["room_uuid_js"]);

        gameDataMgr.tGameRecords.gameID = game_id;
        gameDataMgr.tGameRecords.tPokerInfoData.sRoomUUID = room_uuid_js;
        gameDataMgr.tGameRecords.tPokerInfoData.nCreateTime = cv.Number(value["create_time"]);
        gameDataMgr.tGameRecords.tPokerInfoData.sOwnerName = cv.String(value["owner_name"]);
        gameDataMgr.tGameRecords.tPokerInfoData.nTotalHand = cv.Number(value["total_hand_count"]);
        gameDataMgr.tGameRecords.tPokerInfoData.nMaxPot = cv.Number(value["max_port"]);
        gameDataMgr.tGameRecords.tPokerInfoData.nInsurance_Winbet = cv.Number(value["insurace_winbet"]);
        gameDataMgr.tGameRecords.tPokerInfoData.nTotalBuyin = cv.Number(value["room_total_buyin"]);
        gameDataMgr.tGameRecords.tPokerInfoData.nJackpotWinbet = cv.Number(value["jackpot_winbet"]);
        gameDataMgr.tGameRecords.tPokerInfoData.sAllianceName = cv.String(value["alliance_name"]);
        gameDataMgr.tGameRecords.tPokerInfoData.nAllianceId = cv.Number(value["alliance_id"]);
        gameDataMgr.tGameRecords.tPokerInfoData.sOwnerClubName = cv.String(value["owner_club_name"]);

        // 俱乐部信息
        let vClubs: any[] = value["clubInfos"];
        gameDataMgr.tGameRecords.tPokerInfoData.vClubs = [];

        // 创建一个空联盟结构，存诸所有没有联盟的社区
        do {
            let tAllianceInfo: AllinceResultInfo = new AllinceResultInfo();
            tAllianceInfo.nAllianceID = 0;
            tAllianceInfo.sAllianceName = cv.config.getStringData("UIAllianceTitle");

            for (let i = 0; i < cv.StringTools.getArrayLength(vClubs); ++i) {
                let tClub: ClubInfo = new ClubInfo();
                tClub.sClubName = cv.String(vClubs[i]["Clubname"]);
                tClub.nCreateClubUid = cv.Number(vClubs[i]["CreateClubUid"]);
                tClub.nOwnerId = cv.Number(vClubs[i]["OwnerId"]);
                tClub.nClubId = cv.Number(vClubs[i]["ClubId"]);

                tClub.vUID = [];
                let vID: any[] = vClubs[i]["UIDs"];
                for (let j = 0; j < cv.StringTools.getArrayLength(vID); ++j) {
                    tClub.vUID.push(cv.Number(vID[j]));
                }
                gameDataMgr.tGameRecords.tPokerInfoData.vClubs.push(tClub);

                let hasIn: boolean = false;
                for (let j = 0; j < cv.StringTools.getArrayLength(vAllianceclubID); ++j) {
                    if (vAllianceclubID[j] === tClub.nClubId) {
                        hasIn = true;
                    }
                }
                if (!hasIn) {
                    tAllianceInfo.vClubID.push(tClub.nClubId);
                }

                if (cv.StringTools.getArrayLength(tAllianceInfo.vClubID) > 0) {
                    gameDataMgr.tGameRecords.tPokerInfoData.vAllinceResultInfos.push(tAllianceInfo);
                }
            }
        } while (false);

        // 房间数据
        do {
            let tRoomParamData: any = value["room_param"];
            let tRoomParam: RoomParams = new RoomParams();
            cv.StringTools.deepCopy(tRoomParamData, tRoomParam);
            gameDataMgr.tGameRecords.tPokerInfoData.tRoomParam = tRoomParam;
        } while (false);

        // 带入列表
        do {
            gameDataMgr.tGameRecords.tPokerInfoData.vBuyinList = [];
            let vBuyins: any[] = value["buyins"];
            for (let i = 0; i < cv.StringTools.getArrayLength(vBuyins); ++i) {
                let tBuyIn: BuyInsData = new BuyInsData();
                tBuyIn.nUID = cv.Number(vBuyins[i]["UID"]);
                tBuyIn.sPlayername = cv.String(vBuyins[i]["Playername"]);
                tBuyIn.sPlayerHead = cv.String(vBuyins[i]["PlayerHead"]);
                tBuyIn.nTotalBuyin = cv.Number(vBuyins[i]["TotalBuyin"]);
                if (tBuyIn.nTotalBuyin === 0) continue;

                tBuyIn.nInsuraceWinbet = cv.Number(vBuyins[i]["InsuraceWinbet"]);
                tBuyIn.nInsuranceBetAmount = cv.Number(vBuyins[i]["InsuranceBetAmount"]);
                tBuyIn.nJackpotWinbet = cv.Number(vBuyins[i]["JackpotWinbet"]);
                tBuyIn.nDrawin = cv.Number(vBuyins[i]["Drawin"]);
                tBuyIn.nAward2CludFund = cv.Number(vBuyins[i]["Award2ClubFund"]);
                tBuyIn.nLastBuyinClubid = cv.Number(vBuyins[i]["LastBuyinClubid"]);
                tBuyIn.nWinBet = cv.Number(vBuyins[i]["WinBet"]);
                tBuyIn.nHand = cv.Number(vBuyins[i]["HandCount"]);

                gameDataMgr.tGameRecords.tPokerInfoData.vBuyinList.push(tBuyIn);
            }
        } while (false);

        // 协议拆成两个, 在"response"后继续单独"request"牌局的"uuid"
        this.requestRoomGameUUIDs(room_uuid_js, game_id, value);
    }

    /**
     * 请求房间中牌局的"game uuid"(之所以添加这个协议, 是为了避免原来的"ROOM_RECORD_REQ"协议包体过大, 拆成两条协议去完成)
     * @param room_uuid_js 
     * @param game_id 
     * @param params 
     */
    requestRoomGameUUIDs(room_uuid_js: string, game_id: number, params: any): void {
        let uid: number = cv.dataHandler.getUserData().u32Uid;
        let token: string = cv.dataHandler.getUserData().user_token;

        let obj = {
            "uid": uid,
            "token": token,
            "room_uuid_js": room_uuid_js,
            "game_id": game_id,
        }
        cv.dataNet.RequestGetData(data_pb.CMD.GAME_UUIDS_REQ, obj, this._onRoomGameUUIDs.bind(this, params), true);
    }
    private _onRoomGameUUIDs(params: any, value: any): void {
        let err_code: number = cv.Number(value.err_code);
        if (err_code === 0) {
            gameDataMgr.tGameRecords.tPokerInfoData.vHandUUIDList = [];
            let vHandUUID: any[] = value["game_uuids_js"];
            for (let i = 0; i < cv.StringTools.getArrayLength(vHandUUID); ++i) {
                gameDataMgr.tGameRecords.tPokerInfoData.vHandUUIDList.push(cv.String(vHandUUID[i]));
            }

            // 升序
            gameDataMgr.tGameRecords.tPokerInfoData.vHandUUIDList.sort((a: string, b: string): number => {
                if (a.length != b.length) return a.length - b.length;
                else {
                    if (a.length === 0) return 0;

                    for (let i = 0; i < a.length; ++i) {
                        let ca: number = cv.Number(a[i]);
                        let cb: number = cv.Number(b[i]);
                        if (ca === cb) continue;
                        return ca - cb;
                    }
                }
            });

            // 数组去重
            gameDataMgr.tGameRecords.tPokerInfoData.vHandUUIDList = cv.tools.unique(gameDataMgr.tGameRecords.tPokerInfoData.vHandUUIDList);

            // 分发消息
            cv.StringTools.deepCopy(value, params);
            cv.MessageCenter.send("responseRoomRecordSuccess", params);
        }
        else {
            cv.ToastError(err_code);
        }
    }

    /**
     * 请求大"Pot"牌局"game uuid"
     * @param room_uuid_js 
     * @param game_id_js 
     * @param callBack 
     */
    requestBigPotGameUUIDs(room_uuid_js: string, game_id_js: number, callBack: (value: any) => void): void {
        let uid: number = cv.dataHandler.getUserData().u32Uid;
        let token: string = cv.dataHandler.getUserData().user_token;

        let obj = {
            "uid": uid,
            "token": token,
            "room_uuid_js": room_uuid_js,
            "game_id": game_id_js,
        }
        cv.dataNet.RequestGetData(data_pb.CMD.GAME_BIG_POT_LIST_REQ, obj, callBack, true);
    }

    /**
     * @function 拉取菠萝蜜战绩列表
     * @param {number} pageNum 页码
     * @param {number} pageSize 一页条数
     * @param {function} callback 回调函数
     */
    public requestJFRoomRecordList(pageNum: number, pageSize: number, callback: Function) {
        const token = cv.dataHandler.getUserData().user_token;
        const jfId = cv.dataHandler.getUserData().u32Uid;
        const params = {
            token,
            jfId,
            pageNum,
            pageSize,
        };

        cv.dataNet.RequestGetData(data_pb.CMD.JF_ROOM_LIST_REQ, params, callback, false);
    }

    GetPubliceData(u32Uid: number, umode: number, uGameid: number, blind: number, ante: number, identity: number, requestuid: number) {
        let Token: string = cv.dataHandler.getUserData().user_token;
        if (Token.length <= 0) {
            Token = cv.tools.GetStringByCCFile("user_token");
            if (Token.length <= 0) return;
        }


        let obj = {
            "uid": u32Uid,
            "mode": umode,
            "gameid": uGameid,
            "blind": blind,
            "ante": ante,
            "identity": identity,
            "req_uid": requestuid
        };
        cv.dataNet.RequestGetData(data_pb.CMD.GET_PUBLIC_DATA_REQ, obj, this.responsePubliceData.bind(this), false);
    }

    responsePubliceData(Value: any) {
        if (Value["data"] == "decode error") {
            this.tipsMsg(Value);
        }
        else if (Value["data"] == "load data error") {
            //have not any data, so reset all
            console.log("have not any data, so reset all");
            //log("uid:::", kValue["UID"]);
            cv.MessageCenter.send("RecetRoleInfoView");
        }
        else {
            let data = Value["data"];
            let kValue = JSON.parse(data);
            let u32Uid: number = 0;

            if (kValue) {
                u32Uid = kValue["UID"];
                cv.dataHandler.getUserData().pokerdata.Total_win_money = kValue["Total_win_money"];
                cv.dataHandler.getUserData().pokerdata.Total_hand_card_count = kValue["Total_hand_card_count"];
                cv.dataHandler.getUserData().pokerdata.Vpip_rate = kValue["Vpip_rate"];
                cv.dataHandler.getUserData().pokerdata.Win_rate = kValue["Win_rate"];
                cv.dataHandler.getUserData().pokerdata.Pfr_rate = kValue["Pfr_rate"];
                cv.dataHandler.getUserData().pokerdata.Af_rate = kValue["Af_rate"];
                cv.dataHandler.getUserData().pokerdata.Sb_rate = kValue["Sb_rate"];
                cv.dataHandler.getUserData().pokerdata.Etf_rate = kValue["Etf_rate"];
                cv.dataHandler.getUserData().pokerdata.Wsf_rate = kValue["Wsf_rate"];
                cv.dataHandler.getUserData().pokerdata.Wsd_rate = kValue["Wsd_rate"];
                cv.dataHandler.getUserData().pokerdata.Rate_3bet = kValue["Rate_3bet"];
                cv.dataHandler.getUserData().pokerdata.Rate_fold_to_3bet = kValue["Rate_fold_to_3bet"];
                cv.dataHandler.getUserData().pokerdata.Cbet_rate = kValue["Cbet_rate"];
                cv.dataHandler.getUserData().pokerdata.Total_enter_game_count = kValue["Total_enter_game_count"];
                cv.dataHandler.getUserData().pokerdata.Enter_rate = kValue["Enter_rate"];
                cv.dataHandler.getUserData().pokerdata.star_duration = Value["star_duration"];
                cv.dataHandler.getUserData().pokerdata.liked_count = kValue["liked_count"];
                cv.dataHandler.getUserData().pokerdata.has_liked = kValue["has_liked"];
                cv.dataHandler.getUserData().pokerdata.intimacy = kValue["intimacy"];
                if (kValue["Total_hand_card_count"] != 0 && kValue["Total_win_money"] != 0) {
                    cv.dataHandler.getUserData().pokerdata.Fight_100 = (kValue["Total_win_money"] * 1.0) / (kValue["Total_hand_card_count"]) * 100.0;
                }
                else {
                    cv.dataHandler.getUserData().pokerdata.Fight_100 = 0;
                }
                cv.dataHandler.getUserData().pokerdata.Total_buyin = kValue["Total_buyin"];
                cv.dataHandler.getUserData().pokerdata.Total_end_room_count = kValue["Total_end_room_count"];
                cv.dataHandler.getUserData().pokerdata.Wtsd_rate = kValue["Wtsd_rate"];
                cv.dataHandler.getUserData().pokerdata.level_hands = kValue["level_hands"];

                if (cv.dataHandler.getUserData().pokerdata.Total_end_room_count > 0) {
                    cv.dataHandler.getUserData().pokerdata.Fight_average = cv.dataHandler.getUserData().pokerdata.Total_win_money * 1.0 / cv.dataHandler.getUserData().pokerdata.Total_end_room_count;
                    cv.dataHandler.getUserData().pokerdata.Buyin_average = cv.dataHandler.getUserData().pokerdata.Total_buyin * 1.0 / cv.dataHandler.getUserData().pokerdata.Total_end_room_count;
                }
                else {
                    cv.dataHandler.getUserData().pokerdata.Fight_average = 0;
                    cv.dataHandler.getUserData().pokerdata.Buyin_average = 0;
                }
                cv.dataHandler.getUserData().pokerdata.UID = kValue["UID"];
            }

            let pokerdata = cv.dataHandler.getUserData().pokerdata;
            for (var i in pokerdata) {
                if (!pokerdata[i] || pokerdata[i] == NaN) {
                    pokerdata[i] = 0;
                }
            }
            cv.MessageCenter.send("update_userPokerData");
        }
    }

    tipsMsg(Value: any, bFilteringCorrectHints: boolean = false) {
        if (bFilteringCorrectHints && Value["msg_code"] == "0") return;

        if (Value["msg_code"] == "100033" || Value["msg_code"] == "100049") return;

        let msg: string = "";
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            msg = Value["msg"];
        }
        else {
            msg = Value["message"];
        }

        if (Value["msg_code"] == "100028") {
            cv.TP.showMsg(msg, cv.Enum.ButtonStyle.GOLD_BUTTON, null);
        }
        else {
            cv.TT.showMsg(msg, cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    requestCaptcha() {
        let device_uuid = cv.native.GetDeviceUUID();
        let obj = { "device_uuid": device_uuid };
        cv.http.sendRequest(cv.config.getStringData("WEB_API_GET_CAPTCHA", true), obj, this.responseCaptchaSucc.bind(this));
    }

    responseCaptchaSucc(Value: any) {
        if (Value["msg_code"] == 0) {
            let kDataRoot = Value["data"];
            if (kDataRoot["type"] == 0) //  0为不要图形验证码模式 1为url模式，2为base64模式
            {
                cv.MessageCenter.send("responseCaptchaUrlSucc", 0);
            }
            else if (kDataRoot["type"] == 1) //  1为url模式，2为base64模式
            {
                if (kDataRoot["captcha_url"].length > 0) {
                    console.log("===>@@@@ " + kDataRoot["captcha_url"]);
                    let resource = kDataRoot["captcha_url"];
                    cv.MessageCenter.send("responseCaptchaUrlSucc", resource);
                }
            } else {
                if (kDataRoot["captcha"].length > 0) {
                    console.log("===>@@@@ " + kDataRoot["captcha"]);
                    let resource = kDataRoot["captcha"];
                    cv.MessageCenter.send("responseCaptchaSucc", resource);
                }
            }
        }
    }

    CheckSafe(password: string) {
        let md5Psd = cv.md5.md5(password);
        let obj = { "safe": md5Psd };
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.config.getStringData("WEB_API_CHECK_SAFE", true), obj, this.responseCheckSafe.bind(this));
    }

    responseCheckSafe(Value: any) {
        if (Value["msg_code"] == "0") {
            cv.MessageCenter.send("SecondaryPassword_checkSafeSuccess");
        }
    }

    addGeneralField(obj: any) {
        let token = cv.dataHandler.getUserData().user_token;
        if (cv.StringTools.getArrayLength(token) <= 0) {
            token = cv.tools.GetStringByCCFile("user_token");
            if (cv.StringTools.getArrayLength(token) <= 0) return;
        }

        let uid = cv.dataHandler.getUserData().user_id;
        if (uid == "") {
            uid = cv.tools.GetStringByCCFile("user_id");
            if (cv.StringTools.getArrayLength(uid) <= 0) return;
        }

        obj.token = token;
        obj.user_id = uid;
    }

    GetTwoLevelVCode(kMobile: string, kAreaCode: string) {

        if (cv.StringTools.getArrayLength(kMobile) <= 0) return;

        let index = kAreaCode.indexOf("+");

        let areaCode = kAreaCode.slice(index + 1, kAreaCode.length);
        let obj = { "mobile": kMobile, "areaCode": areaCode };
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.config.getStringData("WEB_API_RESET_SAFE_VCODE", true), obj, this.responseGetTwoLevelVCode.bind(this));
    }

    responseGetTwoLevelVCode(Value: any) {
        if (Value.msg_code == "0") {
            cv.TT.showMsg(Value.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("ModifyPassword_vcode_succ");
        }
    }

    ResetPassVCode(kMobile: string, kAreaCode: string) {

        if (cv.StringTools.getArrayLength(kMobile) <= 0) return;

        let index = kAreaCode.indexOf("+");

        let areaCode = kAreaCode.slice(index + 1, kAreaCode.length);
        let obj = { "mobile": kMobile, "areaCode": areaCode };
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.config.getStringData("WEB_API_RESET_PASS_VCODE", true), obj, this.responseGetTwoLevelVCode.bind(this));
    }

    responseResetPassVCodeSucc(Value: any) {
        if (Value.msg_code == "0") {
            cv.TT.showMsg(Value.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("ModifyPassword_vcode_succ");
        }
    }

    SubmitTwoLevelPwd(kMobile: string, kPassword: string, kVCode: string, kAreaCode: string) {

        if (cv.StringTools.getArrayLength(kMobile) <= 0) return;
        if (cv.StringTools.getArrayLength(kPassword) <= 0) return;
        let codeLength = cv.StringTools.getArrayLength(kVCode);

        if (codeLength <= 0) return;

        if (codeLength == 6) {
            let index = kAreaCode.indexOf("+");

            let areaCode = kAreaCode.slice(index + 1, kAreaCode.length);
            let obj = {
                "mobile": kMobile,
                "v_code": kVCode,
                "safe": cv.md5.md5(kPassword),
                "areaCode": areaCode,
                "uid": cv.dataHandler.getUserData().u32Uid
            };
            this.addGeneralField(obj);

            cv.http.sendRequest(cv.config.getStringData("WEB_API_RESET_SAFE", true), obj, this.responseTwoLevelSubmitSucc.bind(this));
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("ErrorCode4"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    responseTwoLevelSubmitSucc(Value: any) {
        if (Value.msg_code == "0") {
            cv.TT.showMsg(Value.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("ModifyPassword_OnClear", "TwoLevelSubmitSucc");
        }
    }

    ResetPassword(kMobile: string, kPassword: string, kVCode: string, kAreaCode: string) {

        if (cv.StringTools.getArrayLength(kMobile) <= 0) return;
        if (cv.StringTools.getArrayLength(kPassword) <= 0) return;
        let codeLength = cv.StringTools.getArrayLength(kVCode);

        if (codeLength <= 0) return;

        if (codeLength == 6) {
            let index = kAreaCode.indexOf("+");

            let areaCode = kAreaCode.slice(index + 1, kAreaCode.length);
            let obj = {
                "mobile": kMobile,
                "v_code": kVCode,
                "passwd": cv.md5.md5(kPassword),
                "areaCode": areaCode
            };
            this.addGeneralField(obj);

            cv.http.sendRequest(cv.config.getStringData("WEB_API_RESET_PASS", true), obj, this.responseResetPasswordSucc.bind(this));
        }
        else {
            cv.TT.showMsg(cv.config.getStringData("ErrorCode4"), cv.Enum.ToastType.ToastTypeError);
        }
    }

    responseResetPasswordSucc(Value: any) {
        this.tipsMsg(Value);

        if (Value.msg_code == "0") {
            let empty: string = "";
            cv.tools.SaveStringByCCFile("user_password", empty);
            /*
            cv.tools.SaveStringByCCFile("user_name", empty);
            cv.tools.SaveStringByCCFile("user_account", empty);

            cv.tools.SaveStringByCCFile("user_token", empty);
            cv.tools.SaveStringByCCFile("user_uid", empty);*/
            cv.TT.showMsg(Value.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("ModifyPassword_OnClear", "ResetPasswordSucc");
        }
    }


    // --------------------------------------------------------------------------------------------------
    //请求
    UploadVoiceFile(): void {
        console.log("############################### UploadVoiceFile:");
        let path = "";
        let writePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/'));
        path = writePath + "lvRecord.mp3";

        if (jsb.fileUtils.isFileExist(path)) {
            //IOS
            if (cc.sys.os === cc.sys.OS_IOS) {
                if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE || cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE_AOF) {
                    // if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
                    //     cv.native.playLocalVoice();
                    // }
                } else if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                    if (cv.JackfruitManager.tRoomData.nSelfSeatID != -1) {
                        cv.native.playLocalVoice();
                    }
                }
            }
            //Android
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                let isSitdown = false;
                let i32SelfSeat = 0;

                if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE || cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE_AOF) {
                    // isSitdown = (cv.GameDataManager.tRoomData.i32SelfSeat != -1);
                    // i32SelfSeat = cv.GameDataManager.tRoomData.i32SelfSeat;
                } else if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                    isSitdown = (cv.JackfruitManager.tRoomData.nSelfSeatID != -1);
                    i32SelfSeat = cv.JackfruitManager.tRoomData.nSelfSeatID;
                }
                if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE || cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE_AOF || cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                    if (isSitdown) {
                        cv.native.DoStopRecord();
                        cv.resMgr.loadRemote(path, (error: Error, clip: any): void => {
                            if (error) {
                                console.error(error);
                                return null;
                            }
                            // if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                            //     cv.AudioMgr.stopMusic();
                            // }
                            let audioID: number = cc.audioEngine.playEffect(clip, false);
                            let time = cv.AudioMgr.getDuration(audioID);
                            setTimeout((): void => {
                                cv.resMgr.releaseAsset(clip);
                                // if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                                //     cv.MessageCenter.send("updataBGM");
                                // }
                            }, 1000 * (time + 0.05));

                            let _kInfo: CAFInfo = new CAFInfo();
                            _kInfo.u32SeatId = Number(i32SelfSeat);
                            _kInfo.f32Time = time > 10 ? 10 : time;
                            if (_kInfo.f32Time == -1) {
                                _kInfo.f32Time = 3;
                            }
                            cv.MessageCenter.send("on_play_voice", _kInfo);
                        });
                    }
                }
            }
            //path
            let fileData = cv.tools.GetBase64String(path);
            fileData = fileData.replace(/\+/g, "-");
            fileData = fileData.replace(/\//g, "_");
            let obj = {
                "type": 0,
                "filename": cv.dataHandler.getUserData().user_id + "_" + (new Date()).getTime(),
                "img": fileData,
            }

            this.addGeneralField(obj);
            let len: number = 0;
            // let url: string = cv.config.getStringData("WEB_API_UPLOAD_VOICE", true);
            // let url: string = cv.dataHandler.getUserData().file_upload_url;

            let data: any = [];
            data.url = cv.dataHandler.getUserData().file_upload_url;
            data.jsondata = obj;
            data.handler = this._OnUploadVoiceSucc.bind(this);
            cv.http.sendPostRequest(data);

        } else {
            cv.MessageCenter.send("on_upload_voice_done");
        }
    }

    //私语上传回调
    UploadVoiceFile_Sy(data: string) {

        console.log("############################### UploadVoiceFile_Sy:" + data);
        data = data.replace(/\+/g, "-");
        data = data.replace(/\//g, "_");
        let obj = {
            "type": 0,
            "filename": cv.dataHandler.getUserData().user_id + "_" + (new Date()).getTime(),
            "img": data,
        }

        this.addGeneralField(obj);
        let len: number = 0;
        // let url: string = cv.config.getStringData("WEB_API_UPLOAD_VOICE", true);
        let url: string = cv.dataHandler.getUserData().file_upload_url;
        cv.http.sendRequest(url, obj, this._OnUploadVoiceSucc.bind(this), cv.http.HttpRequestType.POST, cv.http.HttpParseType.NONE);
    }

    _OnUploadVoiceSucc(value: any): void {
        console.log("############## _OnUploadVoiceSucc value==");
        console.log(value);

        if (value.code == "0") {
            let url: string = value["url"];
            console.log("############## _OnUploadVoiceSucc file==" + url);

            if (cv.StringTools.getArrayLength(url) > 0) {
                if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE) {
                    cv.gameNet.RequestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Voice, url);
                    return;
                } else if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE_AOF) {
                    cv.aofNet.RequestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Voice, url);
                    return;
                } else if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                    cv.jackfruitNet.requestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Voice, url);
                }
            }

            //如果是私语平台，直接播放连接
            if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
                cv.resMgr.loadRemote(url, (error: Error, clip: cc.AudioClip) => {
                    if (error) {
                        console.error("error:", error);
                        return null;
                    }
                    let audioID: number = cc.audioEngine.playEffect(clip, false);
                    let time = cv.AudioMgr.getDuration(audioID);
                    setTimeout(function () {
                        cv.resMgr.releaseAsset(clip);
                    }, 1000 * (time + 0.05));

                    let _kInfo: CAFInfo = new CAFInfo();
                    if (cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                        _kInfo.u32SeatId = Number(cv.JackfruitManager.tRoomData.nSelfSeatID);
                    }
                    else {
                        _kInfo.u32SeatId = Number(cv.GameDataManager.tRoomData.i32SelfSeat);
                    }
                    _kInfo.f32Time = time > 10 ? 10 : time;
                    if (_kInfo.f32Time == -1) {
                        _kInfo.f32Time = 3;
                    }
                    cv.MessageCenter.send("on_play_voice", _kInfo);
                });
            }
        } else {
            cv.TT.showMsg(cv.config.getStringData("Upload_voice_error_tips"), cv.Enum.ToastType.ToastTypeError);
        }

        cv.MessageCenter.send("on_upload_voice_done");
    }

    //下载语音
    DoDownloadVoice(kInfo: CAFInfo, calllFunc: any = null) {
        let strUrl = kInfo.kUrl;
        let u64Key = strUrl.lastIndexOf("/") + 1;
        let name = strUrl.substr(u64Key);
        cv.resMgr.loadRemote(strUrl, (error: Error, clip: any) => {
            if (error) {
                if (calllFunc) {
                    calllFunc();
                }
                return null;
            }

            if (cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE && cv.config.getCurrentScene() != cv.Enum.SCENE.GAME_SCENE_AOF && cv.config.getCurrentScene() != cv.Enum.SCENE.JACKFRUIT_SCENE) {
                //防止音频还没load完，退出到大厅了，还在播放
                console.log(" current scene is not in Game_SCENE:");
                return;
            }
            // if (cc.sys.os == cc.sys.OS_ANDROID && cv.config.getCurrentScene() != cv.Enum.SCENE.JACKFRUIT_SCENE) {
            //     cv.AudioMgr.stopMusic();
            // }
            let audioID: number = cc.audioEngine.playEffect(clip, false);
            let time = cv.AudioMgr.getDuration(audioID);
            cv.GameDataManager.tRoomData.last_audioID = audioID;
            cv.GameDataManager.tRoomData.last_voice = clip;
            setTimeout(function () {
                cv.resMgr.releaseAsset(clip);
                cv.GameDataManager.tRoomData.last_voice = null;
                // if (cc.sys.os == cc.sys.OS_ANDROID && cv.config.getCurrentScene() != cv.Enum.SCENE.JACKFRUIT_SCENE) {
                //     cv.MessageCenter.send("updataBGM");
                // }
            }, 1000 * (time + 0.05));

            let _kInfo: CAFInfo = new CAFInfo();
            _kInfo.kUrl = name;
            _kInfo.kSender = kInfo.kSender;
            _kInfo.u32SeatId = kInfo.u32SeatId;
            _kInfo.f32Time = time > 10 ? 10 : time;
            if (_kInfo.f32Time == -1) {
                _kInfo.f32Time = 3;
            }
            cv.MessageCenter.send("on_play_voice", _kInfo);
        });
    }

    // 请求上传俱乐部头像信息
    requestUploadClubHead(clubID: string, headPath: string): void {
        let url: string = cv.config.getStringData("WEB_API_UPLOAD_CLUB_HEAD", true);
        let obj = {
            "club_id": clubID,
            "img_ext": "jpg",
            "club_img": headPath,
            "club_thumb": headPath
        }

        this.addGeneralField(obj);
        cv.http.sendRequest(url, obj, this._responseUploadClubHead.bind(this), cv.http.HttpRequestType.POST, cv.http.HttpParseType.NONE);
    }
    private _responseUploadClubHead(value: any): void {
        // this.tipsMsg(value);

        if (value.msg_code == "0") {
            let data: any = value["data"];
            let clubID: number = data["club_id"];
            let clubIcon: string = data["club_img"];
            let vClubDataList: ClubData[] = cv.clubDataMgr.getClubDataList();
            for (let i = 0; i < vClubDataList.length; ++i) {
                if (vClubDataList[i].club.club_id === clubID) {
                    vClubDataList[i].club.club_icon = clubIcon;
                    break;
                }
            }
            cv.MessageCenter.send("update_clubdata");
        }
    }

    ModifyPlayerInfo(kNickname: string, i32Gender: number, kLocalHeadPath: string, user_area: string) {
        let acBuffer = i32Gender.toString();

        let obj = {
            "nick_name": kNickname,
            "gender": acBuffer,
            //"user_marks": kMarks,
            "img_ext": "jpg",
            "avatar": kLocalHeadPath,
            "avatar_thumb": kLocalHeadPath,
            "user_area": user_area
        };

        this.addGeneralField(obj);
        cv.http.sendRequest(cv.config.getStringData("WEB_API_MODIFY_INFO", true), obj, this.OnModifyInfoSucc.bind(this));
    }

    OnModifyInfoSucc(Value: any) {
        if (Value.msg_code == "0") {
            this.tipsMsg(Value);
            // g_pkTool->ClearPng();
            let kDataRoot = Value["data"];
            if (kDataRoot["user_id"]) {
                cv.dataHandler.getUserData().u32Uid = cv.Number(kDataRoot["user_id"]);
            }
            if (kDataRoot["nick_name"]) {
                cv.dataHandler.getUserData().nick_name = kDataRoot["nick_name"]
            }
            if (kDataRoot["gender"]) {
                cv.dataHandler.getUserData().gender = kDataRoot["gender"];
            }
            // if (kDataRoot["user_marks"]) {
            //     cv.dataHandler.getUserData().user_marks = kDataRoot["user_marks"]
            // }
            // else {
            //     cv.dataHandler.getUserData().user_marks = "";
            // }
            if (kDataRoot["avatar"]) {
                cv.dataHandler.getUserData().headUrl = kDataRoot["avatar"];
                cv.dataHandler.getUserData().HeadPath = kDataRoot["avatar"];
            }
            if (kDataRoot["user_area"]) {
                cv.dataHandler.getUserData().user_area = kDataRoot["user_area"]
            }

            cv.dataHandler.getUserData().is_allow_update_name = Boolean(kDataRoot["is_allow_update_name"]);
            cv.MessageCenter.send("modify_info_succ");
        }
    }

    requestUploadVar(avatar: string) {
        let obj = {
            "language": cv.config.getCurrentLanguage(),
            "user_id": cv.dataHandler.getUserData().user_id ? cv.dataHandler.getUserData().user_id.toString() : "0",
            "avatar": avatar,
            "ext": "jpg",
        };

        let data: any = [];
        data.url = cv.config.getStringData("WEB_API_MODIFY_UPLOADVAR", true);
        data.jsondata = obj;
        data.handler = this.onUploadVarSucc.bind(this);
        cv.http.sendPostRequest(data);
    }

    onUploadVarSucc(value: any) {
        console.log("==============onUploadVarSucc");
        if (value.code == "0") {
            let data: any = value["data"];
            console.log("==============");
            console.log(data.filename);
            cv.MessageCenter.send("UploadVarSuccess", data.filename);
        } else {
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
        }
    }

    requestUploadImg(avatar: string) {
        let obj = {
            "language": cv.config.getCurrentLanguage(),
            "user_id": cv.dataHandler.getUserData().user_id ? cv.dataHandler.getUserData().user_id.toString() : "0",
            "avatar": avatar,
            "ext": "jpg",
        };

        let data: any = [];
        data.url = cv.server.WEB_API_MODIFY_UPLOADIMG;
        data.jsondata = obj;
        data.handler = this.onUploadImgSucc.bind(this);
        cv.http.sendPostRequest(data);
    }

    onUploadImgSucc(value: any) {
        if (value.code == "0") {
            let data: any = value["data"];
            cv.MessageCenter.send("onUploadImgSucc", data.filename);
        } else {
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
        }
    }

    requestUploadImgs(pics: string[]) {
        let obj = {
            "user_id": cv.dataHandler.getUserData().user_id ? cv.dataHandler.getUserData().user_id.toString() : "0",
            "pics": pics,
            "ext": "jpg",
        };

        let data: any = [];
        data.url = cv.server.WEB_API_MODIFY_UPLOADIMGS;
        data.jsondata = obj;
        data.handler = this.onUploadImgsSucc.bind(this);
        cv.http.sendPostRequest(data);
    }

    onUploadImgsSucc(value: any) {
        if (value.code == "0") {
            let data: any = value["data"];
            cv.MessageCenter.send("onUploadImgsSucc", data.pics);
        } else {
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
        }
    }

    // --------------------------------------------------------------------------------------------------
    // 请求获取邀请码信息
    requestQrcodeURL(code: string): void {
        let url: string = cv.config.getStringData("WEB_API_QRCODE", true);
        let obj = { "code": code }
        this.addGeneralField(obj);
        cv.http.sendRequest(url, obj, this._responseQrcodeURL.bind(this), cv.http.HttpRequestType.POST, cv.http.HttpParseType.NONE);
    }
    private _responseQrcodeURL(value: any): void {
        //this.tipsMsg(value);

        if (value.msg_code == "0") {
            let data: any = value["data"];
            let qrcode: string = data["qrcode"];
            let ieh: string = data["ieh"];
            let code: string = data["code"];
            cv.MessageCenter.send("updataQrcodeUrl", qrcode + "[" + ieh + "[" + code);
        }
    }

    getCustom() {
        if (cv.dataHandler.getUserData().CustomUrl.length > 0) {
            let custom_url = cv.dataHandler.getUserData().CustomUrl + cv.config.getCurrentLanguage();
            if (cv.config.getCurrentScene() != SCENE.LOGIN_SCENE) {
                custom_url = custom_url + "&uid=" + cv.dataHandler.getUserData().user_id;
            }
            if (cc.sys.isBrowser && cv.config.isSiyuType()) //私语平台
            {
                let cmdStr = "{\"cmd\": \"1006\", \"url\":\"%s\", \"op\":1, \"width\":%d, \"height\":%d}";
                let _offsetY = 0;
                if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_IPHONEX_SCREEN) { //iphoneX刘海屏
                    _offsetY = 0;//2 * cv.config.FULLSCREEN_OFFSETY;
                }
                let _cmd = cv.StringTools.formatC(cmdStr, custom_url, cv.config.WIDTH, cv.config.HEIGHT - _offsetY);
                cv.native.SYwebjsToClient(_cmd);
            } else {
                cc.sys.openURL(custom_url);
            }

            return;
        }
        let obj = {};
        cv.http.sendRequest(cv.config.getStringData("WEB_API_GET_CUSTOM", true), obj, this.onGetCustom.bind(this));
    }

    onGetCustom(Value) {
        if (Value.msg_code == "0") {
            let kDataRoot = Value["data"];
            // cv.dataHandler.getUserData().download_url = kDataRoot["download_url"].asString();
            // if (!Value["is_upgrade"].isNull() && SEStrcmp(Value["is_upgrade"].asCString(), "1") == 0) {
            //     postNotification("OnHttplogin");
            //     return;
            // }
            cv.dataHandler.getUserData().CustomUrl = kDataRoot["custom_url"];
            let custom_url = cv.dataHandler.getUserData().CustomUrl + cv.config.getCurrentLanguage();
            if (cv.config.getCurrentScene() != SCENE.LOGIN_SCENE) {
                custom_url = custom_url + "&uid=" + cv.dataHandler.getUserData().user_id;
            }
            if (cc.sys.isBrowser && cv.config.isSiyuType()) //私语平台
            {
                let cmdStr = "{\"cmd\": \"1006\", \"url\":\"%s\",\"op\":1,\"width\":%d, \"height\":%d}";
                let _offsetY = 0;
                if (cc.sys.os == cc.sys.OS_IOS && cv.config.IS_IPHONEX_SCREEN) { //iphoneX刘海屏
                    _offsetY = 0;//2 * cv.config.FULLSCREEN_OFFSETY;
                }
                let _cmd = cv.StringTools.formatC(cmdStr, custom_url, cv.config.WIDTH, cv.config.HEIGHT - _offsetY);
                cv.native.SYwebjsToClient(_cmd);

            } else {
                cc.sys.openURL(custom_url);
            }
        }
    }

    md5token() {
        let token = cv.dataHandler.getUserData().user_token;
        // let key: string = cv.StringTools.formatC("%s%s%s","@lnFi8","<eIKYazt:$_;", "MX9T/d(gk[JW3{Upcw");
        let key: string = "@lnFi8" + "<eIKYazt:$_;" + "MX9T/d(gk[JW3{Upcw";
        let len = key.length;
        key = key.substring(0, 32);
        token = aesHandler.DecryptBase64(token, key);
        cv.dataHandler.getUserData().user_token = cv.md5.md5(cv.md5.md5(token));
    }

    getDeviceType(): string {
        let deviceType = "";
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            deviceType = "android";
        }
        else if (cc.sys.OS_IOS == cc.sys.os) {
            deviceType = "ios";
        }
        else if (cc.sys.isBrowser) {
            deviceType = "h5";
        }
        else {
            deviceType = "win32";
        }
        return deviceType;
    }

    public sendJsError(location: string, message: string, stack: string) {

        let deviceType = this.getDeviceType();
        let device_uuid = cv.native.GetDeviceUUID();
        let version = cv.native.getSystemVersion();
        let obj = {
            "user_id": cv.dataHandler.getUserData().user_id || 0, //user_id:用户uid，int类型，不存在传0
            "deviceType": deviceType, //deviceType:设备类型，string类型，目前仅支持【'ios', 'android', 'win32'】选其一
            "deviceVersion": version, //设备系统版本号，string类型，就是安卓版本，IOS版本……
            "deviceUuid": device_uuid, //设备ID，string类型
            "version": (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION(),
            "info": stack, // 堆栈信息，string类型，最大2048字节
            // "location" : location,
            // "message" : message,
        };


        let url = cv.config.getStringData("WEB_REQUEST_CRASH_INFO", true);
        cv.http.sendRequest(url, obj, this.onLoginSuccess.bind(this));
    }

    public onSendNativeErrorSuccess(value: any) {
        console.log("onSendNativeErrorSuccess.");
        let msgCode = value.msg_code;
        if (msgCode == 0) {
        }
        cv.native.clearNativeError();
    }

    public sendNativeError() {
        let result: string = cv.native.getNativeError();
        if (result == null || result.length < 5) {
            console.log("send NativeError is null.");
            return;
        }

        console.log("send NativeError result=" + result);
        let deviceType = this.getDeviceType();
        let device_uuid = cv.native.GetDeviceUUID();
        let version = cv.native.getSystemVersion();
        let gameVersion = (cc.isValid(window.big_version, true)) ? window.big_version : cv.config.GET_CLIENT_WEB_VERSION();
        gameVersion = gameVersion + "|" + cv.config.GET_CLIENT_VERSION();

        let obj = {
            "user_id": cv.dataHandler.getUserData().user_id || 0, //user_id:用户uid，int类型，不存在传0
            "deviceType": deviceType, //deviceType:设备类型，string类型，目前仅支持【'ios', 'android', 'win32'】选其一
            "deviceVersion": version, //设备系统版本号，string类型，就是安卓版本，IOS版本……
            "deviceUuid": device_uuid, //设备ID，string类型
            "version": gameVersion,
            "info": result, // 堆栈信息，string类型，最大2048字节
            //"location" : location,
            //"message" : message,
        };

        let url = cv.config.getStringData("WEB_REQUEST_CRASH_INFO", true);
        cv.http.sendRequest(url, obj, this.onSendNativeErrorSuccess.bind(this));

    }

    /**
     * 获取绑定设备验证码
     * @param mobile
     * @param areaCode
     */
    public requestGetVCodeByDevice(mobile: string, areaCode: string) {
        let userId = cv.dataHandler.getUserData().user_id;
        let obj = {
            "user_id": userId,
            "mobile": mobile,
            "areaCode": areaCode,
            "language": cv.config.getCurrentLanguage(),
            "clientType": cv.config.GET_CLIENT_TYPE()
        };
        cv.http.sendRequest(cv.config.getStringData("WEB_GET_VCODE_BY_DEVICE", true), obj, this.responseGetVCodeByDevice.bind(this));
    }

    public responseGetVCodeByDevice(value) {
        this.tipsMsg(value);
        if (value.msg_code === "0") {
            cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("BindDevice_vcode_succ");
            console.log("responseGetVCodeByDevice===》》");
        } else {
            console.log("responseGetVCodeByDevice===》》fail");
        }
    }

    /**
     * 绑定设备uuid
     * @param mobile
     * @param areaCode
     * @param v_code
     */
    public requestBindSafeDevice(mobile: string, areaCode: string, v_code: string) {
        let userId = cv.dataHandler.getUserData().user_id;
        let obj = {
            "user_id": userId,
            "mobile": mobile,
            "areaCode": areaCode,
            "language": cv.config.getCurrentLanguage(),
            "clientType": cv.config.GET_CLIENT_TYPE(),
            "device_uuid": cv.native.GetDeviceUUID(),
            "deviceType": this.getDeviceType(),
            "v_code": v_code,
        };
        cv.http.sendRequest(cv.config.getStringData("WEB_BIND_SAFE_DEVICE", true), obj, this.responseBindSafeDevice.bind(this));
    }

    public responseBindSafeDevice(value) {
        if (value.msg_code === "0") {
            cv.MessageCenter.send("goToLoginAccount");
            console.log("responseBindSafeDevice===》》");
        } else {

            // cv.TT.showMsg(value.msg, cv.Enum.ToastType.ToastTypeWarning);
            console.log("responseBindSafeDevice===》》fail");
        }

        // cv.MessageCenter.send("responseGetVCodeByDevice", value);
    }

    //MTT请求战绩列表数据
    //offset: 获取记录的偏移量  0： 从0开始
    //limit： //获取记录的数量
    //platform: 平台(暫時1為pkw)，暫時只用作前端UI識別
    //page: 0(PKW列表), 1(戰績), 2(背包)
    //foreign_id: 用户ID
    public requestMTTMatchListData(offset: number, limit: number) {

        let token = cv.dataHandler.getUserData().mtt_token;
        let userId = cv.dataHandler.getUserData().user_id;
        let url = cv.config.getStringData("WEB_MTT_GET_MATCH_LIST_DATA", true) + "?token=" + token
            + "&platform=1&page=1&foreign_id=" + userId + "&offset=" + offset + "&limit=" + limit;

        console.log("requestMTTListData url = " + url);
        cv.http.requestUrl(url, this._onResponseMTTListSucced.bind(this), this._onResponseMTTListFailed.bind(this));
    }

    //战绩列表请求成功
    private _onResponseMTTListSucced(respone: any) {
        //console.log("_onResponseMTTListSucced = " + respone);
        cv.MessageCenter.send("sendMttMatchListData", respone);
    }
    //战绩列表请求失败
    private _onResponseMTTListFailed(respone: any) {
        //console.log("_onResponseMTTListFailed = " + respone);
    }

    //MTT请求战绩详情数据
    //mttId：比赛mttID
    //platform: 平台(暫時1為pkw)，暫時只用作前端UI識別
    //page: 0(PKW列表), 1(戰績), 2(背包)
    //foreign_id: 用户ID
    public requestMTTMatchDetailData(mttId: number) {

        let token = cv.dataHandler.getUserData().mtt_token;
        let userId = cv.dataHandler.getUserData().user_id;

        let url = cv.config.getStringData("WEB_MTT_GET_MATCH_DEATAIL_DATA", true) + "?token="
            + token + "&platform=1&page=1&foreign_id=" + userId + "&mttId=" + mttId;

        console.log("requestMTTListData url = " + url);
        cv.http.requestUrl(url, this._onResponseMTTDetailSucced.bind(this), this._onResponseDetailListFailed.bind(this));
    }

    //战绩详情数据请求成功
    private _onResponseMTTDetailSucced(respone: any) {
        cv.MessageCenter.send("responseMTTDataDetailSuccess", respone);
        console.log("_onResponseMTTDetailSucced = " + respone);
    }
    //战绩详情数据请求失败
    private _onResponseDetailListFailed(respone: any) {
        console.log("_onResponseMTTListFailed = " + respone);
    }

    //MTT请求数据统计
    //foreign_id: 用户ID
    public requestMTTUserData() {

        let token = cv.dataHandler.getUserData().mtt_token;
        let userId = cv.dataHandler.getUserData().user_id;

        let url = cv.config.getStringData("WEB_MTT_GET_USER_INFO_DATA", true) + "?token="
            + token + "&foreign_id=" + userId;

        console.log("requestMTTUserData url = " + url);
        cv.http.requestUrl(url, this._onResponseMTTUserInfoSucced.bind(this), this._onResponseMTTUserInfoFailed.bind(this));
    }

    //战绩详情数据请求成功
    private _onResponseMTTUserInfoSucced(respone: any) {
        cv.MessageCenter.send("ResponseMTTUserInfoData", respone);
        console.log("_onResponseMTTUserInfoSucced = " + respone);
    }
    //战绩详情数据请求失败
    private _onResponseMTTUserInfoFailed(respone: any) {
        console.log("_onResponseMTTUserInfoFailed = " + respone);
    }

    // 请求菠萝蜜牌局数据
    public requestJackfruitGameRecord(uid: number, game_uuid_js: string, gameid: number): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "uid": uid,
            "game_uuid_js": game_uuid_js,
            "gameid": gameid,
            "token": token
        }

        cv.dataNet.RequestGetData(data_pb.CMD.JF_GAME_HAND_REQ, obj, this._onJackfruitGameRecord.bind(this), true);
    }

    // 菠萝蜜游戏记录
    public _onJackfruitGameRecord(value: any) {
        const data = value;
        const sGameUUID: string = data.game_uuid_js;

        JackfruitManager.tGameRecords.recordCaches.add(sGameUUID, data);

        cv.MessageCenter.send("update_jackfruit_record");
    }

    // 请求菠萝蜜牌局uuid
    public requestJackfruitGameUUID(jfId: number, ante: number, recordTime: number, callBack: Function): void {
        const token: string = cv.dataHandler.getUserData().user_token;
        const params = {
            jfId,
            ante,
            recordTime,
            token,
        };

        cv.dataNet.RequestGetData(data_pb.CMD.JF_GAME_UUIDS_REQ, params, callBack, false);
    }

    /**
     * @function 拉取某个玩家菠萝蜜数据
     * @param {number} owner 请求者id
     * @param {number} dataId 请求获取哪个玩家数据的id
     * @param {number} token 请求者token
     * @param {number} anti 房间anti
     * @param {number} mode 1 长牌 3 短牌 （目前都是短牌）
     */
    public requestJFData(dataId: number, ante: number, mode: number = 3) {
        const token = cv.dataHandler.getUserData().user_token;
        const owner = cv.dataHandler.getUserData().u32Uid;

        if (token == null || token == undefined) {
            return;
        }

        const params = {
            "owner": owner,
            "dataId": dataId,
            "token": token,
            "mode": mode,
            "ante": ante
        };
        cv.dataNet.RequestGetData(data_pb.CMD.JF_DATA_REQ, params, this._onResponseJFData.bind(this), true);
    }

    //返回private JFData
    private _onResponseJFData(response: any) {
        cv.MessageCenter.send("JFPrivateInfo", response);
    }

    /**添加反馈
     * type : 类型 1建议 2游戏异常 3充值问题 4作弊举报 5赛事相关 6其他
     * content : 反馈内容
     * pics : 图片数组
     */
    public requestAddFeedBack(type: number, content: string, pics: string[]): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "type": type,
            "content": content,
            "pics": pics,
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "token": token
        }

        cv.http.sendRequest(cv.server.WEB_ADD_FEEDBACK, obj, this._responseAddFeedBack.bind(this));
    }

    private _responseAddFeedBack(response) {
        if (response.msg_code === "0") {
            this.requestGetFeedBackLists();
            cv.TT.showMsg(cv.config.getStringData("feedbackView_submit_success"), cv.Enum.ToastType.ToastTypeInfo);
        } else {
            cv.TT.showMsg(cv.config.getStringData("feedbackView_submit_error"), cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    // 获取反馈列表
    public requestGetFeedBackLists(): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "token": token
        }

        cv.http.sendRequest(cv.server.WEB_GET_FEEDBACK_LISTS, obj, this._responseGetFeedBackLists.bind(this));
    }

    private _responseGetFeedBackLists(response) {
        if (response.msg_code === "0") {
            let data = response.data;
            cv.dataHandler.getUserData().feedback_red_num = data.not_read_num;
            cv.dataHandler.getUserData().feedback_list = [];
            for (let i = 0; i < data.list.length; i++) {
                cv.dataHandler.getUserData().feedback_list.push(data.list[i]);
            }
            cv.MessageCenter.send("get_feedback_lists");
            console.log("_responseGetFeedBackLists===》》");
        } else {
            console.log("_responseGetFeedBackLists===》》fail");
        }
    }

    /**回复反馈
     * feedback_id : 反馈ID(单号)
     * user_id : 用户ID
     * content : 回复内容
     * pics : 图片数组
     */
    public requestAddFeedBackComment(feedback_id: number, content: string, pics: string[]): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "feedback_id": feedback_id,
            "content": content,
            "pics": pics,
            "user_id": cv.dataHandler.getUserData().u32Uid,
            "token": token
        }

        cv.http.sendRequest(cv.server.WEB_ADD_FEEDBACK_COMMENT, obj, this._responseAddFeedBackComment.bind(this));
    }

    private _responseAddFeedBackComment(response) {
        if (response.msg_code === "0") {
            this.requestGetFeedBackCommentLists(response.data.feedback_id);
            // cv.TT.showMsg(cv.config.getStringData("feedbackView_submit_success"), cv.Enum.ToastType.ToastTypeInfo);
        } else {
            cv.TT.showMsg(cv.config.getStringData("feedbackView_submit_error"), cv.Enum.ToastType.ToastTypeInfo);
        }
    }

    // 获取回复内容
    public requestGetFeedBackCommentLists(feedback_id): void {
        let token: string = cv.dataHandler.getUserData().user_token;
        let obj = {
            "feedback_id": feedback_id
        }
        cv.dataHandler.getUserData().feedback_red_num--;
        let length = cv.dataHandler.getUserData().feedback_list.length;
        for (let i = 0; i < length; i++) {
            if (cv.dataHandler.getUserData().feedback_list[i].id == feedback_id) {
                cv.dataHandler.getUserData().feedback_list[i].user_not_read = 0;
                break;
            }
        }
        cv.MessageCenter.send("get_feedback_lists");

        cv.http.sendRequest(cv.server.WEB_GET_FEEDBACK_COMMENT_LISTS, obj, this._responseGetFeedBackCommentLists.bind(this));
    }

    private _responseGetFeedBackCommentLists(response) {
        if (response.msg_code === "0") {
            let data = response.data;
            cv.dataHandler.getUserData().feedback_comment_list = [];
            for (let i = 0; i < data.length; i++) {
                cv.dataHandler.getUserData().feedback_comment_list.push(data[i]);
            }
            cv.MessageCenter.send("updata_feedback_comment_lists");
            console.log("_responseGetFeedBackLists===》》");
        } else {
            console.log("_responseGetFeedBackLists===》》fail");
        }
    }


    //注册流程，绑定私聊获取验证码
    //type 1: 当前是注册
    //       2: 当前是升级
    public requestGet_bindSiliaoVcode(account: string, type: number): void {
        let obj = {
            "account": account,
            "type": type
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_SILIAO_GET_VCODE, obj, this._response_bindSiliaoVcode.bind(this));
    }

    private _response_bindSiliaoVcode(response) {
        if (response.msg_code === "0") {
            console.log("_responseGetFeedBackLists===》》success");
            cv.MessageCenter.send("onBindSiliaoVcodeSuc");
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
        } else {
            console.log("_responseGetFeedBackLists===》》fail");
        }
    }

    //绑定私聊
    //account: 私聊账号
    //v_code:  验证码
    //type 1: 当前是注册
    //       2: 当前是升级
    public requestCheck_bindSiliao(account: string, v_code: string, type: number): void {
        let obj = {
            "account": account,
            "v_code": v_code,
            "type": type
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_SILIAO_CHECK_VCODE, obj, this._response_CheckBindSiliao.bind(this));
    }

    private _response_CheckBindSiliao(response) {
        if (response.msg_code === "0") {
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("onBindSiliaoSucces");
        } else {
            console.log("_response_CheckBindSiliao===》》fail");
        }
    }


    //激活验证方式   获取手机短信验证接口
    //areaCode 区号
    //mobile 手机号
    //type 私聊切到短信为1 短信切到私聊为2
    public requestActive_getMsgVcode(areaCode: string, mobile: string, type: number): void {
        let obj = {
            "areaCode": areaCode,
            "mobile": mobile,
            "type": type
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_ACTIVE_GET_PHONE_VCODE, obj, this._responseActive_getMsgVcode.bind(this));
    }

    private _responseActive_getMsgVcode(response) {
        if (response.msg_code === "0") {
            console.log("_responseActive_getMsgVcode===》》suc");
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("onActiveGetCode");
        } else {
            console.log("_responseActive_getMsgVcode===》》fail");
        }
    }

    //激活验证方式   验证短信验证码
    //areaCode 区号
    //mobile 手机号
    //type 私聊切到短信为1 短信切到私聊为2
    //v_code 验证码，6位纯数字
    //account 私聊账号 type=2时必传
    public requestActive_changeTypeByMsg(areaCode: string, mobile: string, type: number, v_code: string, account: string): void {
        let obj = {
            "areaCode": areaCode,
            "mobile": mobile,
            "type": type,
            "v_code": v_code,
            "account": account
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_MSG, obj, this._responseActive_changeTypeByMsg.bind(this));
    }

    private _responseActive_changeTypeByMsg(response) {
        if (response.msg_code === "0") {
            console.log("_responseActive_changeTypeByMsg===》》suc");
            console.log("_responseActive_changeTypeByMsg===response:" + response.data.send_vcode_type);

            if (response.data.send_vcode_type == 1) {
                //为激活短信验证发送，表示激活成功
                cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
                cv.MessageCenter.send("onChangeTypeToMsgSucces", response);
            } else {
                cv.MessageCenter.send("onActiveChangeTypeByMsg");
            }

        } else {
            console.log("_responseActive_changeTypeByMsg===》》fail");
        }
    }


    //激活验证方式  获取私聊验证码
    //account 私聊帐号
    public requestActive_getSiliaoVcode(account: string): void {
        let obj = {
            "account": account
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_ACTIVE_GET_SILIAO_VCODE, obj, this._responseActive_getSiliaoVcode.bind(this));
    }

    private _responseActive_getSiliaoVcode(response) {
        if (response.msg_code === "0") {
            console.log("_responseActive_getSiliaoVcode===》》suc");
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("getSiliaoVcode");
        } else {
            console.log("_responseActive_getSiliaoVcode===》》fail");
        }
    }


    //激活验证方式  验证私聊验证码
    //account 私聊帐号
    //v_code 验证码，6位纯数字
    public requestActive_changeTypeByApp(account: string, v_code: string): void {
        let obj = {
            "account": account,
            "v_code": v_code
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_APP, obj, this._responseActive_changeTypeByApp.bind(this));
    }

    private _responseActive_changeTypeByApp(response) {
        if (response.msg_code === "0") {
            console.log("_responseActive_changeTypeByApp===》》suc");
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("onChangeTypeToAppSucces", response);
        } else {
            console.log("_responseActive_changeTypeByApp===》》fail");
        }
    }


    //新设备登录，通过私聊绑定
    //account 私聊账号
    public requestBind_getSiliaoVcode(account: string): void {
        let userId = cv.dataHandler.getUserData().user_id;
        let obj = {
            "user_id": userId,
            "account": account
        }
        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_DEVICE_GET_VCODE, obj, this._responsBind_getSiliaoVcode.bind(this));
    }

    private _responsBind_getSiliaoVcode(response) {
        if (response.msg_code === "0") {
            console.log("_responsBind_getSiliaoVcode ===》》suc");
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("onBindGetSiliaoVcodeSuc", response);
        } else {
            console.log("_responsBind_getSiliaoVcode===》》fail");
        }
    }

    //新设备登录，通过私聊绑定
    //account 私聊账号
    //vcode 私聊验证码
    public requestBind_checkSlBind(account: string, vcode: string): void {
        let userId = cv.dataHandler.getUserData().user_id;
        let obj = {
            "user_id": userId,
            "account": account,
            "v_code": vcode,
            "clientType": cv.config.GET_CLIENT_TYPE(),
            "device_uuid": cv.native.GetDeviceUUID(),
            "deviceType": this.getDeviceType(),
        }

        this.addGeneralField(obj);
        cv.http.sendRequest(cv.server.WEB_BIND_DEVICE_CHECK_VCODE, obj, this._responsBind_checkSlBind.bind(this));
    }

    private _responsBind_checkSlBind(response) {
        if (response.msg_code === "0") {
            console.log("_responsBind_checkSlBind ===》》suc");
            cv.TT.showMsg(response.msg, cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("onBindDeviceBySiliaoSuc", response);
            cv.MessageCenter.send("goToLoginAccount");
        } else {
            console.log("_responsBind_checkSlBind===》》fail");
        }
    }

    private handleActivityData(activity: any) {
        cv.dataHandler.getActivityData().isShow = true;
        cv.dataHandler.getActivityData().removeActivityInfo();
        cv.dataHandler.getActivityData().is_alert_avatar = activity.is_alert_avatar;
        let kData = activity.act;
        let activitylen = cv.StringTools.getArrayLength(kData);
        for (let i = 0; i < activitylen; ++i) {
            let xdata: ActivityInfo = new ActivityInfo();
            xdata.activity_id = kData[i].id;
            xdata.activity_url = kData[i].link;
            xdata.activity_pictrue = kData[i].pictrue;
            xdata.frequency = kData[i].times;
            xdata.activity_type = kData[i].type;
            xdata.resource = kData[i].resource;
            xdata.day_times = kData[i].day_times;
            xdata.action_type = kData[i].action_type;
            xdata.gameCode = kData[i].gameCode;
            xdata.gameID = kData[i].gameID;
            xdata.matchID = kData[i].matchID;
            xdata.alreadyShow = false;
            xdata.forcedJump = kData[i].forcedJump;
            cv.dataHandler.getActivityData().addActivityInfo(i, xdata);
        }
        let game = activity.game;
        let gamelen = cv.StringTools.getArrayLength(game);
        for (let i = 0; i < gamelen; ++i) {
            let xdata: ActivityInfo = new ActivityInfo();
            xdata.activity_id = game[i].id;
            xdata.activity_url = game[i].link;
            xdata.activity_pictrue = game[i].pictrue;
            xdata.frequency = game[i].times;
            xdata.activity_type = game[i].type;
            xdata.resource = game[i].resource;
            xdata.day_times = game[i].day_times;
            xdata.action_type = game[i].action_type;
            xdata.gameCode = kData[i].gameCode;
            xdata.gameID = kData[i].gameID;
            xdata.matchID = kData[i].matchID;
            xdata.alreadyShow = false;
            xdata.forcedJump = kData[i].forcedJump;
            cv.dataHandler.getActivityData().addActivityInfo(activitylen + i, xdata);
        }
    }

}