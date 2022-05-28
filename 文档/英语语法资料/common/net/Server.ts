import { HashMap } from "../tools/HashMap";
/**
 * web服 data服等相关域名接口信息
 */

export class Server {
    private static _g_instence: Server = null;
    //server map
    public serverMap: HashMap<string, string> = new HashMap();
    public DATA_GETDATA: string = "getdata";
    public DATA_GETROOMRECORDLIST: string = "room_records_list";
    public DATA_GETROOMRECORD: string = "room_record";
    public DATA_GETGAMEHAND: string = "game_hand";
    public DATA_DOFAVORITE: string = "do_favorite";
    public DATA_GETFAVORITELIST: string = "favorite_list";
    public DATA_GETFAVORITEHAND: string = "favorite_hand";
    public DATA_GETFAVORITELISTNew: string = "favorite_list_new";
    public DATA_GETPUBLICDATA: string = "get_public_data";
    public DATA_GETNEWHAND: string = "get_newhand_data";
    public DATA_GETONEHAND: string = "get_onehand_data";
    public WEB_API_SHOP: string = "";
    public WEB_API_EXCHANGE: string = "withdraw";
    public WEB_API_TRADE_RECORD: string = "trade-record";
    public WEB_API_GET_RESOURCE_URL: string = "user/login/getResources";
    public WEB_API_HEAD: string = "https://guild.hmh5.cn/";
    public WEB_API_HEAD_SPARE: string = "https://api.mcxbccy.com/";
    public WEB_API_CDN: string = "bp449Jw+Y3mMm//XZ3U5pNoysz8XtSYOwTla9AQ5jY7+qiCKCG350IS7PO/ny1RT";
    public WEB_API_HEAD_DEBUG: string = "http://35.247.148.163:20000/";
    public WEB_API_HEAD_DEBUG_SPARE: string = "http://35.247.148.163:20000/";
    public WEB_API_HEAD_DEBUG_BRANCH: string = "http://34.126.94.45:20000/";
    public WEB_API_DEBUG_CDN: string = "M2IbTbX8CAoO3TViyja/oSO++0JiG8T+n4RzO0y6kdLXuyL5iEJcLISQ5y/aO7U/";
    public WEB_API_HEAD_DEVELOP: string = "http://35.186.149.49:20000/";
    public WEB_API_FORGET_GET_VCODE: string = "index.php/User/Login/getVcodeByForgetPwd";
    public WEB_API_FORGET_VCODE: string = "index.php/User/Login/checkVcodeByForgetPwd";
    public WEB_API_FORGET_SUBMIT: string = "index.php/User/Login/forgetPwd";
    public WEB_API_TRANSFER_GET_VCODE: string = "index.php/User/Club/getVcodeByClubTransfer";
    public WEB_API_TRANSFER_SUBMIT: string = "index.php/User/Club/checkVcodeByClubTransfer";
    public WEB_API_RESET_SAFE_VCODE: string = "index.php/User/Ucenter/getVcodeByResetSafe";
    public WEB_API_RESET_SAFE: string = "index.php/User/Ucenter/resetSafe";
    public WEB_API_SET_DEFAULT_HEAD: string = "index.php/User/Ucenter/uploadLocalAvatar";
    public WEB_API_VCODE: string = "index.php/User/Register/getVcodeByRegister";
    public WEB_API_TOURIST_VCODE: string = "index.php/User/tourists/getVcode";
    public WEB_API_CHECK_VCODE: string = "index.php/User/Register/checkVcodeByRegister";
    public WEB_API_CHECK_TOURIST_VCODE: string = "index.php/User/tourists/checkVcode";
    public WEB_API_REG: string = "index.php/User/Register/userAdd";
    public WEB_API_TOURIST_UPGRADE: string = "index.php/User/tourists/upgrade";
    public WEB_API_CHECK_NICK_NAME: string = "index.php/User/Register/checkNickname";
    public WEB_API_CHECK_USER_NAME: string = "index.php/User/Register/checkUsername";
    public WEB_API_GET_CAPTCHA: string = "index.php/User/Register/getCaptcha";
    public WEB_API_MODIFY_INFO: string = "index.php/User/Ucenter/modifyUserInfo";
    public WEB_API_MODIFY_UPLOADVAR: string = "uploadavar";
    public WEB_API_MODIFY_UPLOADIMG: string = "uploadimg";
    public WEB_API_MODIFY_UPLOADIMGS: string = "uploadimgs";
    public WEB_API_LOGIN: string = "index.php/User/Login/loginByMobile";
    public WEB_API_LOGIN_BY_USER_NAME: string = "index.php/User/Login/loginByUsername";
    public WEB_API_LOGIN_BY_TOURIST_NAME: string = "index.php/User/tourists/login";
    public WEB_API_SET_USER_NAME: string = "index.php/User/Login/setUsername";
    public WEB_API_RESET_PASS_VCODE: string = "index.php/User/Login/getVcodeByResetPwd";
    public WEB_API_RESET_PASS: string = "index.php/User/Login/resetPwd";
    public WEB_API_LOGOUT: string = "index.php/User/Ucenter/logout";
    public WEB_API_UPLOAD_VOICE: string = "index.php/User/Ucenter/uploadFileToQiniu";
    public WEB_API_UPLOAD_CLUB_HEAD: string = "index.php/User/Club/uploadClubAvatar";
    public WEB_API_CHECK_SAFE: string = "index.php/User/Ucenter/checkSafe";
    public WEB_API_QRCODE: string = "index.php/User/Qrcode/getCode";
    public WEB_API_NOTICE_LIST: string = "index.php/user/Article/getList";
    public WEB_API_GET_CUSTOM: string = "index.php/user/register/getCustom";
    public WEB_DEZHOU_RULE: string = "index.php/user/Article/getRule?title=dezhou";
    public WEB_DEZHOU_SHORT_RULE: string = "index.php/user/Article/getRule?title=duanpai";
    public WEB_AOF_RULE: string = "index.php/user/Article/getRule?title=aof";
    public WEB_AOF_RULE_2: string = "index.php/user/Article/getRule?title=aof2";
    public WEB_AOF_SHORT_RULE: string = "index.php/user/Article/getRule?title=shortAof";
    public WEB_AOF_SHORT_RULE_2: string = "index.php/user/Article/getRule?title=shortAof2";
    public WEB_INSURANCE_RULE: string = "index.php/user/Article/getRule?title=baoxian";
    public WEB_PROTOTAL_RULE: string = "user/article/getAgreement?unique=register";
    public WEB_ZOOM_DEZHOU_RULE: string = "index.php/user/Article/getRule?title=zoom";
    public WEB_ZOOM_DEZHOU_SHORT_RULE: string = "index.php/user/Article/getRule?title=shortZoom";
    public WEB_PLO_RULE: string = "index.php/user/Article/getRule?title=plo";
    public WEB_ZOOM_DEZHOU_BET: string = "index.php/user/Article/getRule?title=bet";
    public WEB_REQUEST_CRASH_INFO: string = "user/func/report";
    public WEB_BIND_SAFE_DEVICE: string = "/user/device/bindSafeDevice";
    public WEB_GET_VCODE_BY_DEVICE: string = "/user/device/getVcodeByDevice";
    public WEB_ADD_FEEDBACK: string = "/user/addFeedback";
    public WEB_GET_FEEDBACK_LISTS: string = "/user/getFeedbackLists";
    public WEB_ADD_FEEDBACK_COMMENT: string = "/user/addFeedbackComment";
    public WEB_GET_FEEDBACK_COMMENT_LISTS: string = "/user/getFeedbackCommentLists";
    public WEB_MTT_GET_MATCH_LIST_DATA: string = "http://47.91.151.126:23333/mtt_game_results";  //MTT获取战绩列表链接
    public WEB_MTT_GET_MATCH_DEATAIL_DATA: string = "http://47.91.151.126:23333/mtt_game_result_detail";  //MTT获取战绩详情链接
    public WEB_MTT_GET_USER_INFO_DATA: string = "http://47.91.151.126:23333/mtt_game_sum";  //MTT获取战绩详情链接

    // Google Recaptcha
    public WEB_API_RECAPTCHA: string = "api/v1/config/recaptcha";
    // Google Recaptcha
    public WEB_API_RECAPTCHA_DOMAIN: string = "https://api.spicyonion.net/";

    // Jumio KYC
    public WEB_API_GET_JUMIO_CREDENTIAL: string = "api/v1/config/credentials";
    public WEB_API_POST_JUMIO_SCAN_REFERENCE: string = "api/v1/identity/jumio/check";
    public WEB_API_GET_JUMIO_STATUS: string = "api/v1/identity/jumio/status"

    //注册 或者  升级绑定私聊接口
    public WEB_BIND_SILIAO_GET_VCODE: string = "/user/register/getSlVcodeForAccount"; //获取私聊验证码   
    public WEB_BIND_SILIAO_CHECK_VCODE: string = "/user/register/checkSlVcodeForAccount"; //获取私聊验证码 
    //激活短信 或者 私聊验证接口
    public WEB_BIND_ACTIVE_GET_PHONE_VCODE: string = "/User/Ucenter/getVcodeByChangeTypeForSms"; // 激活私聊验证，获取短信验证码
    public WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_MSG: string = "/User/Ucenter/checkVcodeByChangeTypeForSms"; // 激活检测短信验证
    public WEB_BIND_ACTIVE_GET_SILIAO_VCODE: string = "/User/Ucenter/getVcodeByChangeTypeForSL"; // 激活私聊验证，获取私聊验证码
    public WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_APP: string = "/User/Ucenter/checkVcodeByChangeTypeForSL"; // 激活私聊验证
    //新设备通过私聊绑定接口
    public WEB_BIND_DEVICE_GET_VCODE: string = "/User/Device/getSlVcode"; // 绑定手机设备获取私聊验证码
    public WEB_BIND_DEVICE_CHECK_VCODE: string = "/User/Device/checkSlVcode"; // 通过私聊绑定是手机

    public init() {
        this.serverMap.add("DATA_GETDATA", this.DATA_GETDATA);
        this.serverMap.add("DATA_GETROOMRECORDLIST", this.DATA_GETROOMRECORDLIST);
        this.serverMap.add("DATA_GETROOMRECORD", this.DATA_GETROOMRECORD);
        this.serverMap.add("DATA_GETGAMEHAND", this.DATA_GETGAMEHAND);
        this.serverMap.add("DATA_DOFAVORITE", this.DATA_DOFAVORITE);
        this.serverMap.add("DATA_GETFAVORITELIST", this.DATA_GETFAVORITELIST);
        this.serverMap.add("DATA_GETFAVORITEHAND", this.DATA_GETFAVORITEHAND);
        this.serverMap.add("DATA_GETFAVORITELISTNew", this.DATA_GETFAVORITELISTNew);
        this.serverMap.add("DATA_GETPUBLICDATA", this.DATA_GETPUBLICDATA);
        this.serverMap.add("DATA_GETNEWHAND", this.DATA_GETNEWHAND);
        this.serverMap.add("DATA_GETONEHAND", this.DATA_GETONEHAND);
        this.serverMap.add("WEB_API_SHOP", this.WEB_API_SHOP);
        this.serverMap.add("WEB_API_EXCHANGE", this.WEB_API_EXCHANGE);
        this.serverMap.add("WEB_API_TRADE_RECORD", this.WEB_API_TRADE_RECORD);
        this.serverMap.add("WEB_API_GET_RESOURCE_URL", this.WEB_API_GET_RESOURCE_URL);
        this.serverMap.add("WEB_API_HEAD", this.WEB_API_HEAD);
        this.serverMap.add("WEB_API_HEAD_SPARE", this.WEB_API_HEAD_SPARE);
        this.serverMap.add("WEB_API_CDN", this.WEB_API_CDN);
        this.serverMap.add("WEB_API_HEAD_DEBUG", this.WEB_API_HEAD_DEBUG);
        this.serverMap.add("WEB_API_HEAD_DEBUG_SPARE", this.WEB_API_HEAD_DEBUG_SPARE);
        this.serverMap.add("WEB_API_HEAD_DEBUG_BRANCH", this.WEB_API_HEAD_DEBUG_BRANCH);
        this.serverMap.add("WEB_API_DEBUG_CDN", this.WEB_API_DEBUG_CDN);
        this.serverMap.add("WEB_API_HEAD_DEVELOP", this.WEB_API_HEAD_DEVELOP);
        this.serverMap.add("WEB_API_FORGET_GET_VCODE", this.WEB_API_FORGET_GET_VCODE);
        this.serverMap.add("WEB_API_FORGET_VCODE", this.WEB_API_FORGET_VCODE);
        this.serverMap.add("WEB_API_FORGET_SUBMIT", this.WEB_API_FORGET_SUBMIT);
        this.serverMap.add("WEB_API_TRANSFER_GET_VCODE", this.WEB_API_TRANSFER_GET_VCODE);
        this.serverMap.add("WEB_API_TRANSFER_SUBMIT", this.WEB_API_TRANSFER_SUBMIT);
        this.serverMap.add("WEB_API_RESET_SAFE_VCODE", this.WEB_API_RESET_SAFE_VCODE);
        this.serverMap.add("WEB_API_RESET_SAFE", this.WEB_API_RESET_SAFE);
        this.serverMap.add("WEB_API_SET_DEFAULT_HEAD", this.WEB_API_SET_DEFAULT_HEAD);
        this.serverMap.add("WEB_API_VCODE", this.WEB_API_VCODE);
        this.serverMap.add("WEB_API_TOURIST_VCODE", this.WEB_API_TOURIST_VCODE);
        this.serverMap.add("WEB_API_CHECK_VCODE", this.WEB_API_CHECK_VCODE);
        this.serverMap.add("WEB_API_CHECK_TOURIST_VCODE", this.WEB_API_CHECK_TOURIST_VCODE);
        this.serverMap.add("WEB_API_REG", this.WEB_API_REG);
        this.serverMap.add("WEB_API_TOURIST_UPGRADE", this.WEB_API_TOURIST_UPGRADE);
        this.serverMap.add("WEB_API_CHECK_NICK_NAME", this.WEB_API_CHECK_NICK_NAME);
        this.serverMap.add("WEB_API_CHECK_USER_NAME", this.WEB_API_CHECK_USER_NAME);
        this.serverMap.add("WEB_API_GET_CAPTCHA", this.WEB_API_GET_CAPTCHA);
        this.serverMap.add("WEB_API_LOGIN", this.WEB_API_LOGIN);
        this.serverMap.add("WEB_API_MODIFY_INFO", this.WEB_API_MODIFY_INFO);
        this.serverMap.add("WEB_API_MODIFY_UPLOADVAR", this.WEB_API_MODIFY_UPLOADVAR);
        this.serverMap.add("WEB_API_LOGIN_BY_USER_NAME", this.WEB_API_LOGIN_BY_USER_NAME);
        this.serverMap.add("WEB_API_LOGIN_BY_TOURIST_NAME", this.WEB_API_LOGIN_BY_TOURIST_NAME);
        this.serverMap.add("WEB_API_SET_USER_NAME", this.WEB_API_SET_USER_NAME);
        this.serverMap.add("WEB_API_RESET_PASS_VCODE", this.WEB_API_RESET_PASS_VCODE);
        this.serverMap.add("WEB_API_RESET_PASS", this.WEB_API_RESET_PASS);
        this.serverMap.add("WEB_API_LOGOUT", this.WEB_API_LOGOUT);
        this.serverMap.add("WEB_API_RESET_PASS", this.WEB_API_RESET_PASS);
        this.serverMap.add("WEB_API_UPLOAD_VOICE", this.WEB_API_UPLOAD_VOICE);
        this.serverMap.add("WEB_API_UPLOAD_CLUB_HEAD", this.WEB_API_UPLOAD_CLUB_HEAD);
        this.serverMap.add("WEB_API_CHECK_SAFE", this.WEB_API_CHECK_SAFE);
        this.serverMap.add("WEB_API_QRCODE", this.WEB_API_QRCODE);
        this.serverMap.add("WEB_API_NOTICE_LIST", this.WEB_API_NOTICE_LIST);
        this.serverMap.add("WEB_API_GET_CUSTOM", this.WEB_API_GET_CUSTOM);
        this.serverMap.add("WEB_DEZHOU_RULE", this.WEB_DEZHOU_RULE);
        this.serverMap.add("WEB_PLO_RULE", this.WEB_PLO_RULE);
        this.serverMap.add("WEB_DEZHOU_SHORT_RULE", this.WEB_DEZHOU_SHORT_RULE);
        this.serverMap.add("WEB_AOF_RULE", this.WEB_AOF_RULE);
        this.serverMap.add("WEB_AOF_RULE_2", this.WEB_AOF_RULE_2);
        this.serverMap.add("WEB_AOF_SHORT_RULE", this.WEB_AOF_SHORT_RULE);
        this.serverMap.add("WEB_AOF_SHORT_RULE_2", this.WEB_AOF_SHORT_RULE_2);
        this.serverMap.add("WEB_INSURANCE_RULE", this.WEB_INSURANCE_RULE);
        this.serverMap.add("WEB_PROTOTAL_RULE", this.WEB_PROTOTAL_RULE);
        this.serverMap.add("WEB_ZOOM_DEZHOU_RULE", this.WEB_ZOOM_DEZHOU_RULE);
        this.serverMap.add("WEB_ZOOM_DEZHOU_SHORT_RULE", this.WEB_ZOOM_DEZHOU_SHORT_RULE);
        this.serverMap.add("WEB_ZOOM_DEZHOU_BET", this.WEB_ZOOM_DEZHOU_BET);
        this.serverMap.add("WEB_REQUEST_CRASH_INFO", this.WEB_REQUEST_CRASH_INFO);
        this.serverMap.add("WEB_BIND_SAFE_DEVICE", this.WEB_BIND_SAFE_DEVICE);
        this.serverMap.add("WEB_GET_VCODE_BY_DEVICE", this.WEB_GET_VCODE_BY_DEVICE);
        this.serverMap.add("WEB_MTT_GET_MATCH_LIST_DATA", this.WEB_MTT_GET_MATCH_LIST_DATA);
        this.serverMap.add("WEB_MTT_GET_MATCH_DEATAIL_DATA", this.WEB_MTT_GET_MATCH_DEATAIL_DATA);
        this.serverMap.add("WEB_MTT_GET_USER_INFO_DATA", this.WEB_MTT_GET_USER_INFO_DATA);
        this.serverMap.add("WEB_API_RECAPTCHA", this.WEB_API_RECAPTCHA);
        this.serverMap.add("WEB_API_RECAPTCHA_DOMAIN", this.WEB_API_RECAPTCHA_DOMAIN);

        this.serverMap.add("WEB_API_GET_JUMIO_CREDENTIAL", this.WEB_API_GET_JUMIO_CREDENTIAL);
        this.serverMap.add("WEB_API_POST_JUMIO_SCAN_REFERENCE", this.WEB_API_POST_JUMIO_SCAN_REFERENCE);
        this.serverMap.add("WEB_API_GET_JUMIO_STATUS", this.WEB_API_GET_JUMIO_STATUS);

        this.serverMap.add("WEB_BIND_SILIAO_GET_VCODE", this.WEB_BIND_SILIAO_GET_VCODE);
        this.serverMap.add("WEB_BIND_SILIAO_CHECK_VCODE", this.WEB_BIND_SILIAO_CHECK_VCODE);
        this.serverMap.add("WEB_BIND_ACTIVE_GET_PHONE_VCODE", this.WEB_BIND_ACTIVE_GET_PHONE_VCODE);
        this.serverMap.add("WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_MSG", this.WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_MSG);
        this.serverMap.add("WEB_BIND_ACTIVE_GET_SILIAO_VCODE", this.WEB_BIND_ACTIVE_GET_SILIAO_VCODE);
        this.serverMap.add("WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_APP", this.WEB_BIND_ACTIVE_CHECK_CHANGE_TYPE_APP);
        this.serverMap.add("WEB_BIND_DEVICE_GET_VCODE", this.WEB_BIND_DEVICE_GET_VCODE);
        this.serverMap.add("WEB_BIND_DEVICE_CHECK_VCODE", this.WEB_BIND_DEVICE_CHECK_VCODE);
    }
    /**
     * 是否有此key
     * @param key 
     */
    public ishaveKey(key: string): boolean {
        return this.serverMap.has(key);
    }

    /**
     * 获取web接口
     * @param key 
     */
    public getString(key: string): string {
        return this.serverMap.get(key);
    }
    public static getInstance(): Server {
        if (!Server._g_instence) {
            Server._g_instence = new Server();
            Server._g_instence.init();
        }
        return Server._g_instence;
    }
}
