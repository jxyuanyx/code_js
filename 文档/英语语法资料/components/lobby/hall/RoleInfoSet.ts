import cv from "../cv";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import { ImagePicker } from "../../../common/tools/ImagePicker";
import LoginScene from "../login/LoginScene";
import RegisterView from "../login/RegisterView";
import UpgradeView from "../login/UpgradeView";
import { NativeEventCMD, NATIVE_KEY_MAP } from "../../../common/tools/NativeEventCMD";
import { SCENE } from "../../../common/tools/Enum";
import { aesHandler } from "../../../common/plugg/aesHandler";

export class headData {
    head_url: string = "";
    ischoose: boolean = false;
}

export class headRowData {
    itemData: headData[] = [];
}

export enum requestType {
    requestType_modife,
    requestType_register,
    requestType_upgrade
}

/**
 * 完善信息类   此类为共用
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class RoleInfoSet extends cc.Component {
    @property(cc.Node) roleinfo_panel: cc.Node = null;
    @property(cc.Node) gender_panel: cc.Node = null;
    @property(cc.Node) male_toggle: cc.Node = null;
    @property(cc.Node) female_toggle: cc.Node = null;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    @property(cc.Prefab) headItem: cc.Prefab = null;
    itemData: headRowData[] = [];
    isLoad: boolean = false;
    chooseIndex: number = 0;

    @property(cc.EditBox) roleName: cc.EditBox = null;
    @property(cc.Prefab) ImagePicker_prefab: cc.Prefab = null;
    @property(cc.Node) chooseHead_panel: cc.Node = null;
    @property(cc.Node) system_panel: cc.Node = null;

    ImagePickerNode: cc.Node = null;
    headStr: string = "";
    systemHeadTime: number = 0; //修改系统头像的时间
    HEAD_COUNT: number = 200;
    isAllUncheck: boolean = false;
    gender: number = 0;
    private isclickbyprogram = false;

    private _isSelfView = false;

    private _cacheData: any = null;

    private _isSaveImg: boolean = false;
    private _bMotifyInfo: boolean = false;

    //是否已经有头像
    private _ishaveHead: boolean = false;
    onLoad() {
        cv.resMgr.adaptWidget(this.node);
        this.initHeadData();
        cc.find("roleImg/setRoleImg_Button", this.roleinfo_panel).active = false;
        this.roleinfo_panel.active = true;
        this.chooseHead_panel.active = false;
        this.system_panel.active = false;
        if (cv.config.getCurrentScene() == SCENE.GAME_SCENE) {
            this.registerMassage();
            this.initLanguage();
            this.updateView();
        }
    }

    private FixIosFullTitle(){
       if (cc.sys.os == cc.sys.OS_IOS &&  cv.config.IS_FULLSCREEN) { //适配ios刘海屏，标题被遮挡
            let bg_top = cc.find("bg_top", this.node);
            bg_top.y = bg_top.y - 20;
            let rBtn = cc.find("roBack_button", this.node);
            rBtn.y = rBtn.y - 20;
            
            let systemTitle = cc.find("system_title_text", this.system_panel);
            systemTitle.y = systemTitle.y - 22;
        }

  
    }

    start() {
        if (cv.config.getCurrentScene() == SCENE.GAME_SCENE) return;
        this.registerMassage();
        this.initLanguage();
        //老板版调用相册前的面板
        //this.ImagePickerNode = ImagePicker.add(this.ImagePicker_prefab);

        this.updateView();
        this.FixIosFullTitle();//适配ios刘海屏，标题被遮挡

    }

    public registerMassage() {
        cv.MessageCenter.register("modify_info_succ", this.OnModifyInfoCallBack.bind(this), this.node);
        cv.MessageCenter.register("clickHeadItem", this.clickHeadItem.bind(this), this.node);
        cv.MessageCenter.register("native_onImageSaved", this.onImageSaved.bind(this), this.node);
        cv.MessageCenter.register("UploadVarSuccess", this.onUploadSucess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    public onDestroy() {
        cv.MessageCenter.unregister("modify_info_succ", this.node);
        cv.MessageCenter.unregister("clickHeadItem", this.node);
        cv.MessageCenter.unregister("native_onImageSaved", this.node);
        cv.MessageCenter.unregister("UploadVarSuccess", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    /**
     * 鉴黄通过
     */
    public onUploadSucess(filename: string) {
        if (!this._cacheData) return;
        if (this._cacheData.requestType == requestType.requestType_modife) {
            cv.httpHandler.ModifyPlayerInfo(
                this._cacheData.nick_name,
                this._cacheData.gender,
                //this._cacheData.user_marks,
                filename,
                this._cacheData.user_area
            );
        } else if (this._cacheData.requestType == requestType.requestType_register) {
            cv.httpHandler.requestFinishRegister(
                this._cacheData.mobile,
                this._cacheData.nick_name,
                this._cacheData.passwd,
                "",
                "",
                this._cacheData.areaCode,
                this._cacheData.username,
                this._cacheData.invitation_code,
                filename,
                this.gender);
        } else {
            cv.httpHandler.requestFinishUpdateGrade(
                this._cacheData.mobile,
                this._cacheData.nick_name,
                this._cacheData.passwd,
                "",
                "",
                this._cacheData.areaCode,
                this._cacheData.username,
                this._cacheData.invitation_code,
                filename,
                this.gender);
        }
    }

    /**
     * 保存头像
     * @param path 
     */
    public onImageSaved(path: any) {
        if (!this._isSaveImg) return;
        this._isSaveImg = false;
        let button = cc.find("roleImg/setRoleImg_Button", this.roleinfo_panel);
        button.active = true;
        console.log("onImageSaved::" + button);
        cv.resMgr.loadRemote(path.msg, function (err, tex) {
            //ios没有此问题 备注：自定义头像调用了系统相册，此时客户端处于后台，保存头像的回来时，如果涉极到ui渲染，必须切回前台，再进行ui的渲染，此处为label的渲染.
            //当this.setHeadString写在load外面就有可能程序还未切回前台，就开始渲染，导致渲染不成功。或者异常。
            //异常报错（android）：E/libEGL: call to OpenGL ES API with no current context (logged once per thread)
            let data = jsb.fileUtils.getDataFromFile(path.msg);
            let picbase64 = aesHandler.bytesToBase64(data);
            this.setHeadString(picbase64);

            console.log('Result should be a texture: ' + (tex instanceof cc.Texture2D), false, null);
            CircleSprite.setHeadTexture(button, tex, 0.95);
            cc.find("roleImg/default_img", this.roleinfo_panel).active = false;
            this._ishaveHead = true;
            //跟踪用户行为，发送事件
            let properties = { item: "avatarPicture" };
            cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.InputFieldValueEntered, cv.Enum.Functionality.registration, properties);
        }.bind(this));

        this.onClickChooseHeadPanel();
        // let data = jsb.fileUtils.getDataFromFile(path.msg);
        // this.headStr = CryptoJS.enc.Base64.stringify(aesHandler.Int8parse(data));
        // this.headStr = this.headStr.replace(/\+/g, "-");
        // this.headStr = this.headStr.replace(/\//g, "_");
        // console.log(this.headStr);
    }
    /**
     * 解晰保存头像传回来的字符串
     * @param str 
     */
    public setHeadString(str: string) {
        this.headStr = str;
        console.log("onImageSaved:" + str);
        this.headStr = this.headStr.replace(/\+/g, "-");
        this.headStr = this.headStr.replace(/\//g, "_");

        if (this.headStr != "") {
            cv.StringTools.setLabelString(this.roleinfo_panel, "headimg/label", "roleInfoSet_roleinfo_panel_modife_head_text");
        }
    }

    public initHeadData() {
        let common_head_path = "zh_CN/common/head/head_%d";
        for (let i = 0; i < this.HEAD_COUNT;) {
            let rowInfo = new headRowData();
            for (let k = 0; k < 5; k++) {
                let info = new headData();
                info.head_url = cv.StringTools.formatC(common_head_path, i + 1);
                i++
                rowInfo.itemData.push(info);
            }
            this.itemData.push(rowInfo);
        }
    }
    /**
     * 设置语言文本文字
     */
    public initLanguage() {
        cv.StringTools.setLabelString(this.node, "bg_top/title_text", "roleInfoSet_roleinfo_panel_title_text");
        cv.StringTools.setLabelString(this.roleinfo_panel, "gender_panel/gender_text", "roleInfoSet_roleinfo_panel_gender_text");
        cv.StringTools.setLabelString(this.roleinfo_panel, "gender_panel/male_text", "roleInfoSet_male_text");
        cv.StringTools.setLabelString(this.roleinfo_panel, "gender_panel/female_text", "roleInfoSet_female_text");
        cv.StringTools.setLabelString(this.roleinfo_panel, "updateaccount_button/Label", "RegisterTitle_Update_Text");
        cv.StringTools.setLabelString(this.system_panel, "sys_ok_button/Label", "roleInfoSet_roOk_button");
        cv.StringTools.setLabelString(this.chooseHead_panel, "layout/button_phone/Label", "roleInfoSet_chooseHead_button_phone_text");
        cv.StringTools.setLabelString(this.chooseHead_panel, "layout/button_system/Label", "roleInfoSet_chooseHead_button_system_text");
        cv.StringTools.setLabelString(this.chooseHead_panel, "layout/choosehead_title", "roleInfoSet_chooseHead_title_text");
        cv.StringTools.setLabelString(this.roleinfo_panel, "roleImg/headTips_text", "roleInfoSet_chooseHead_tips_text");
        cv.StringTools.setLabelString(this.system_panel, "system_title_text", "roleInfoSet_chooseHead_button_system_text");

        let label = cc.find("headimg/label", this.roleinfo_panel).getComponent(cc.Label);
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
            label.fontSize = 22;
        } else {
            label.fontSize = 28;
        }
        //注册
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            cv.StringTools.setLabelString(this.roleinfo_panel, "ok_button/Label", "LoginUITitle1");
            cv.StringTools.setLabelString(this.roleinfo_panel, "roleName_panel/tips_text", "roleInfoSet_tips_regiest_nicename_text");
            cv.StringTools.setLabelString(this.roleinfo_panel, "headimg/label", "roleInfoSet_roleinfo_panel_set_head_text");
        } else {
            //升级账号
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cv.StringTools.setLabelString(this.roleinfo_panel, "ok_button/Label", "LoginUITitle1");
                cv.StringTools.setLabelString(this.roleinfo_panel, "roleName_panel/tips_text", "roleInfoSet_tips_regiest_nicename_text");
                cv.StringTools.setLabelString(this.roleinfo_panel, "headimg/label", "roleInfoSet_roleinfo_panel_modife_head_text");
            } else {
                //已登陆游戏游客玩家
                if (cv.dataHandler.getUserData().isTouristUser) {
                    cv.StringTools.setLabelString(this.roleinfo_panel, "ok_button/Label", "roleInfoSet_roOk_button");
                    cv.StringTools.setLabelString(this.roleinfo_panel, "roleName_panel/tips_text", "roleInfoSet_tips_updateGrade_nicename_text");
                    cv.StringTools.setLabelString(this.roleinfo_panel, "headimg/label", "roleInfoSet_roleinfo_panel_modife_head_text");
                } else {
                    //已登陆游戏已注册玩家
                    cv.StringTools.setLabelString(this.roleinfo_panel, "ok_button/Label", "roleInfoSet_roOk_button");
                    cv.StringTools.setLabelString(this.roleinfo_panel, "roleName_panel/tips_text", "roleInfoSet_tips_nicename_text");
                    cv.StringTools.setLabelString(this.roleinfo_panel, "headimg/label", "roleInfoSet_roleinfo_panel_modife_head_text");
                }
            }
        }
        let roleName: cc.EditBox = cc.find("roleName_panel/roleName", this.roleinfo_panel).getComponent(cc.EditBox)
        roleName.placeholder = cv.config.getStringData("roleInfoSet_roleinfo_panel_roleName_panel_roleName");

        cc.find("male_icon", this.gender_panel).setPosition(cc.find("male_text", this.gender_panel).getPosition().x - cc.find("male_text", this.gender_panel).getContentSize().width - 23, cc.find("male_icon", this.gender_panel).getPosition().y);
        cc.find("female_icon", this.gender_panel).setPosition(cc.find("female_text", this.gender_panel).getPosition().x - cc.find("female_text", this.gender_panel).getContentSize().width - 23, cc.find("female_icon", this.gender_panel).getPosition().y);
    }
    /**
     * 显示系统头像选择面板
     * @param isbyProgram
     */
    public showSystemHeadPanel() {
        this.roleinfo_panel.active = false;
        this.chooseHead_panel.active = false;
        this.system_panel.active = true;


        cc.find("bg_top/title_text", this.node).active = false;
        cc.find("roBack_button", this.node).active = true;
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        if (!this.isLoad) {
            sv.bindPrefab(this.headItem, "HeadItem", this.itemData);
            sv.generateItemPool();
            sv.bindScrollEventTarget(this);
            this.isLoad = true;
        }

        //如果没有做过选择，没有任何数据，则默认选择第一个头像
        if (cv.StringTools.getArrayLength(this.headStr) <= 0) {
            this.chooseIndex = 1;
            this.updateHeadData(true);
            this.headStr = "1";
            //this.updateHeadImg();
        }
        sv.reloadView(this.itemData, false);


    }

    /**
     * 获取用户头像名称
     */
    public getHeadAvatarName(): string {
        let user = cv.dataHandler.getUserData();
        let temp = user.headUrl.lastIndexOf("/");
        let tempStr = user.headUrl.slice(temp + 1);
        return tempStr
    }
    //正常的完善信息界面和升级账号使用服务器数据
    public chooseHeadBydata() {
        let tempStr = this.getHeadAvatarName();
        //如果是数字则是系统头像
        if (cv.StringTools.isNumber(tempStr)) {
            let tempNum = cv.Number(tempStr);
            if (tempNum <= 0 || tempNum > cv.config.HEAD_LENGTH) {
                tempNum = 1;
            }
            this.clickHeadItem(tempNum);
        } else {
            this.updateView();
        }
    }
    /**
     * 点击头像
     */
    public onBtnSetCustomHeadClick() {
        cv.AudioMgr.playButtonSound('button_click');
        this.system_panel.active = false;
        //cc.find("bg_top", this.node).active = false;
        //cc.find("roBack_button", this.node).active = false;
        if (cv.config.isSiyuType()) {
            cv.MessageCenter.send("AlwaysNode_Active", false);
            this.showChooseHeadPanel();
        } else {
            //老版本点击自定议头像，调用手机相机
            //this.ImagePickerNode.getComponent(ImagePicker).init(cc.find("setRoleImg_Button", this.roleinfo_panel));

            //已上传过头像 打开选择面板，没有测直接打开手机相册
            if (cv.StringTools.getArrayLength(this.headStr) > 0) {
                cv.MessageCenter.send("AlwaysNode_Active", false);
                this.showChooseHeadPanel();
            } else {
                this.openPhoto();
            }

        }
    }
    /**
     * 点击系统头像按钮
     */
    public onBtnSystemClick() {
        cv.AudioMgr.playButtonSound('button_click');
        this.showSystemHeadPanel();
    }

    /**
     * 点击手机相册按钮
     */
    public onBtnPhonePhotoClick() {
        cv.AudioMgr.playButtonSound('button_click');
        this.openPhoto();
    }

    /**
     * 打开手机相册
     */
    public openPhoto() {
        console.log("openPhoto0000");
        this._isSaveImg = true;
        if (cc.sys.os == cc.sys.OS_IOS) {
            cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_OPEN_PHOTO);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "openPhoto", "()V");
        }
    }

    /**
     * 请求注册或者升级账号
     */
    public toRegisterOrUpgrade() {
        this.roleName.node.active = true;
        //let customTime = this.ImagePickerNode.getComponent(ImagePicker).customHeadTime;
        //console.log("customTime:" + customTime + "  this.systemHeadTime:" + this.systemHeadTime);
        // if (customTime > this.systemHeadTime) {
        //     let customHeadStr = this.ImagePickerNode.getComponent(ImagePicker).headStr;
        //     this.headStr = customHeadStr;
        // }

        if (cv.StringTools.getArrayLength(this.headStr) <= 0 || !this._ishaveHead) {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast47"), cv.Enum.ToastType.ToastTypeWarning);
            cv.MessageCenter.send("AlwaysNode_Active", false);
            this.showChooseHeadPanel();
            this.system_panel.active = false;
            cc.find("bg_top", this.node).active = false;
            cc.find("roBack_button", this.node).active = false;
            return;
            // let tempUrl = cv.dataHandler.getUserData().headUrl;
            // let pos = tempUrl.lastIndexOf("/");
            // this.headStr = tempUrl.substring(pos + 1);
        }

        let nickName = "";
        //当前是否可以修改昵称
        if (true) {
            nickName = this.roleName.string;
            //nickName = cv.StringTools.earseSpace(nickName);
            if (nickName.length <= 0) {
                cv.TT.showMsg(cv.config.getStringData("ErrorToast3"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            }
            // 是否包含特殊字符
            else if (!cv.StringTools.isClubNameFormat(nickName)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_special_words"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            }
            // 是否包含敏感字符
            else if (cv.StringTools.isSensitiveWords(nickName, true)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_sensitive_words"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            } else if (cv.StringTools.getStrLen(nickName) < 4 || cv.StringTools.getStrLen(nickName) > 12) {
                cv.TT.showMsg(cv.config.getStringData("EditBoxNickName1"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        } else {
            nickName = cv.dataHandler.getUserData().nick_name;
        }

        let user = cv.dataHandler.getUserData();

        let aa = this.female_toggle.getComponent(cc.Toggle).isChecked;
        let bb = this.male_toggle.getComponent(cc.Toggle).isChecked;

        if (this.male_toggle.getComponent(cc.Toggle).isChecked) {
            this.gender = 1;
        }
        else if (this.female_toggle.getComponent(cc.Toggle).isChecked) {
            this.gender = 2;
        }
        else {
            this.gender = 0;
        }
        var mobile = "";
        var areaCode = "";
        var kInvateCode = "";
        var account_text1 = "";
        var password_text1 = ""
        cv.dataHandler.getUserData().HeadPath = this.headStr;
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            mobile = cc.find("phone_Panel/phoneNumber_text", this.node.getParent().getComponent(LoginScene).registerView).getComponent(cc.EditBox).string;
            areaCode = this.node.getParent().getComponent(LoginScene).registerView.getComponent(RegisterView).getAreacode();
            kInvateCode = this.node.getParent().getComponent(LoginScene).getinvateCode();
            account_text1 = cc.find("account_panel1/account_text", this.node.getParent().getComponent(LoginScene).setAccountAndPassword).getComponent(cc.EditBox).string;
            password_text1 = cc.find("password_Panel/account_text", this.node.getParent().getComponent(LoginScene).setAccountAndPassword).getComponent(cc.EditBox).string;

            this.node.getParent().getComponent(LoginScene).saveAccountAndPsd(account_text1, password_text1);
        } else {
            mobile = cc.find("phone_Panel/phoneNumber_text", this.node.getParent().getComponent(UpgradeView).registerView).getComponent(cc.EditBox).string;
            areaCode = this.node.getParent().getComponent(UpgradeView).registerView.getComponent(RegisterView).getAreacode();
            kInvateCode = this.node.getParent().getComponent(UpgradeView).getinvateCode();
            account_text1 = cc.find("account_panel1/account_text", this.node.getParent().getComponent(UpgradeView).setAccountAndPassword).getComponent(cc.EditBox).string;
            password_text1 = cc.find("password_Panel/account_text", this.node.getParent().getComponent(UpgradeView).setAccountAndPassword).getComponent(cc.EditBox).string;

            this.node.getParent().getComponent(UpgradeView).saveAccountAndPsd(account_text1, password_text1);
        }

        //系统头像直接请求 自定议头像先要去鉴黄
        if (cv.StringTools.isNumber(this.headStr)) {
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cv.httpHandler.requestFinishUpdateGrade(mobile, nickName, password_text1, "", "", areaCode, account_text1, kInvateCode, this.headStr, this.gender);
            } else {
                cv.httpHandler.requestFinishRegister(mobile, nickName, password_text1, "", "", areaCode, account_text1, kInvateCode, this.headStr, this.gender);
            }
        } else {
            this._cacheData = {
                "areaCode": areaCode,
                "mobile": mobile,
                "nick_name": nickName,
                "passwd": password_text1,
                "reg_code": "",
                "v_code": "",
                "username": account_text1,
                "invitation_code": kInvateCode,
                "gender": this.gender,
                "requestType": cv.dataHandler.getUserData().isOpenUpdateUserMode ? requestType.requestType_upgrade : requestType.requestType_register
            };
            cv.httpHandler.requestUploadVar(this.headStr);
        }
    }
    /**
     * 升级账号
     */
    public onBtnUpdateClick() {
        cv.AudioMgr.playButtonSound('button_click');
        //cv.dataHandler.upgradeAccount();
        cv.dataHandler.getUserData().isOpenUpdateUserMode = true;
        cv.MessageCenter.send("showUpgradeView");
    }

    /**
     * 请求修改信息
     */
    public modifeRoleInfo() {
        // let customTime = this.ImagePickerNode.getComponent(ImagePicker).customHeadTime;
        // if (customTime > this.systemHeadTime) {
        //     let customHeadStr = this.ImagePickerNode.getComponent(ImagePicker).headStr;
        //     this.headStr = customHeadStr;
        // }

        if (cv.StringTools.getArrayLength(this.headStr) <= 0) {
            this.headStr = this.getHeadAvatarName();
        }

        let nickName = "";
        //当前是否可以修改昵称
        if (cv.dataHandler.getUserData().is_allow_update_name) {
            nickName = this.roleName.string;

            if (nickName.length <= 0 || cv.StringTools.isHaveEmpty(nickName)) {
                cv.TT.showMsg(cv.config.getStringData("ErrorToast3"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            }
            // 是否包含特殊字符
            else if (!cv.StringTools.isClubNameFormat(nickName)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_special_words"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            }
            // 是否包含敏感字符
            else if (cv.StringTools.isSensitiveWords(nickName, true)) {
                cv.TT.showMsg(cv.config.getStringData("tips_no_sensitive_words"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            } else if (cv.StringTools.getStrLen(nickName) < 4 || cv.StringTools.getStrLen(nickName) > 12) {
                cv.TT.showMsg(cv.config.getStringData("EditBoxNickName1"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        } else {
            nickName = cv.dataHandler.getUserData().nick_name;
        }

        let user = cv.dataHandler.getUserData();

        let aa = this.female_toggle.getComponent(cc.Toggle).isChecked;
        let bb = this.male_toggle.getComponent(cc.Toggle).isChecked;

        if (this.male_toggle.getComponent(cc.Toggle).isChecked) {
            this.gender = 1;
        }
        else if (this.female_toggle.getComponent(cc.Toggle).isChecked) {
            this.gender = 2;
        }
        else {
            this.gender = 0;
        }

        cv.dataHandler.getUserData().HeadPath = this.headStr;
        //如果这个url和服务器的相同，则不再去鉴黄
        let isTheSameImg = (this.headStr == this.getHeadAvatarName());
        console.log("this.headStr: " + this.headStr);
        console.log("this.getHeadAvatarName: " + this.getHeadAvatarName());
        //系统头像直接请求 自定议头像先要去鉴黄
        if (cv.StringTools.isNumber(this.headStr) || isTheSameImg) {
            cv.httpHandler.ModifyPlayerInfo(
                nickName,
                this.gender,
                //cv.String(user.user_marks),
                this.headStr.length > 0 ? this.headStr : "",
                cv.String(user.user_area));
        } else {
            this._cacheData = {
                "nick_name": nickName,
                "gender": this.gender,
                //"user_marks": cv.String(user.user_marks),
                "img_ext": "jpg",
                "avatar": this.headStr.length > 0 ? this.headStr : "",
                "avatar_thumb": this.headStr.length > 0 ? this.headStr : "",
                "user_area": cv.String(user.user_area),
                "requestType": requestType.requestType_modife
            };
            cv.httpHandler.requestUploadVar(this.headStr);
        }
    }

    /**
     * 点击确定
     */
    public onBtnSureClick() {
        cv.AudioMgr.playButtonSound('button_click');
        //注册
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            this.toRegisterOrUpgrade();
            //跟踪用户行为，发送事件
            let properties = { item: "doneButton" };
            cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
        } else {
            //升级账号
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                this.toRegisterOrUpgrade();
            } else {
                //已登陆游戏游客玩家
                if (cv.dataHandler.getUserData().isTouristUser) {

                } else {
                    //已登陆游戏已注册玩家
                    this.modifeRoleInfo();
                }
            }
        }


    }

    public ChooseSexByToggle(event: cc.Event, str: string) {
        if (!this.isclickbyprogram) {
            cv.AudioMgr.playButtonSound('button_click');
            if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
                //跟踪用户行为，发送事件
                let properties = { item: "genderInput" };
                cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.InputFieldValueEntered, cv.Enum.Functionality.registration, properties);
            }
        }
        if (this.isAllUncheck == true) {
            this.isAllUncheck = false;
            return;
        }
        let aa = this.female_toggle.getComponent(cc.Toggle).isChecked;
        let bb = this.male_toggle.getComponent(cc.Toggle).isChecked;
        if (str == "man") {
            this.isclickbyprogram = true;
            this.female_toggle.getComponent(cc.Toggle).isChecked = !this.male_toggle.getComponent(cc.Toggle).isChecked;
            //this.gender = 1;
        }
        else if (str == "woman") {
            this.isclickbyprogram = true;
            this.male_toggle.getComponent(cc.Toggle).isChecked = !this.female_toggle.getComponent(cc.Toggle).isChecked;
            //this.gender = 2;
        }
        this.isclickbyprogram = false;
    }

    //设置类属性仅表示此界面是否为正常的完善信息界面，而不是注册或者升级的界面
    public setPropte(isSelfview?) {
        this._isSelfView = isSelfview;
    }

    public OnModifyInfoCallBack() {
        this._bMotifyInfo = true;
        this.updateView();
    }

    /**
     * 刷新界面，只能以服务器数据为准
     * @param isResponse 
     */
    public updateView() {
        //返回按钮
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            cc.find("roBack_button_register", this.node).active = true;
            cc.find("roBack_button", this.node).active = false;
            //跟踪用户行为，发送事件
            cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.ScreenOpened, cv.Enum.Functionality.registration);
        } else {
            //升级账号
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cc.find("roBack_button_register", this.node).active = true;
                cc.find("roBack_button", this.node).active = false;
            } else {
                cc.find("roBack_button_register", this.node).active = false;
                cc.find("roBack_button", this.node).active = true;
            }
        }

        //玩家数据
        let user = cv.dataHandler.getUserData();
        //还原头像数据，如果没有选择过，也不会执行
        this.updateHeadData(false);
        let tempStr = this.getHeadAvatarName();
        let strLen = cv.StringTools.getArrayLength(tempStr);
        if (strLen == 0) {
            cv.dataHandler.getUserData().headUrl = cv.String(Math.floor(cv.StringTools.randomRange(1, this.HEAD_COUNT)));
            tempStr = this.getHeadAvatarName();
        }
        //是否为系统头像 如果是 以服务器数据刷新头像数据
        if (cv.StringTools.isNumber(tempStr)) {
            let severIndex = cv.Number(tempStr);
            this.chooseIndex = severIndex;
            this.headStr = severIndex.toString();
            this.updateHeadData(true);
        } else {
            this.headStr = tempStr;
            this.chooseIndex = 0;
        }
        //刷新头像
        this.updateHeadImg();

        //性别
        this.gender = user.gender;
        this.isclickbyprogram = true;
        if (user.gender == 0) {
            this.isAllUncheck = true;
            this.male_toggle.getComponent(cc.Toggle).isChecked = false;
            this.isAllUncheck = true;
            this.isclickbyprogram = true;
            this.female_toggle.getComponent(cc.Toggle).isChecked = false;
        }
        else if (user.gender == 1) {
            this.male_toggle.getComponent(cc.Toggle).isChecked = true;
            this.isclickbyprogram = true;
            this.female_toggle.getComponent(cc.Toggle).isChecked = false;
        } else if (user.gender == 2) {
            this.male_toggle.getComponent(cc.Toggle).isChecked = false;
            this.isclickbyprogram = true;
            this.female_toggle.getComponent(cc.Toggle).isChecked = true;
        }

        //当前是否可以修改昵称  以及显示昵称
        let _nicknameText = cc.find("roleName_panel/nickname_text", this.roleinfo_panel);
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE || cv.dataHandler.getUserData().isOpenUpdateUserMode) {
            this.roleName.node.active = true;
            _nicknameText.active = false;
            this.roleName.string = this.roleName.string.length == 0 ? "" : this.roleName.string;
        } else if (!cv.dataHandler.getUserData().isTouristUser) {
            if (cv.dataHandler.getUserData().is_allow_update_name) {
                this.roleName.node.active = true;
                _nicknameText.active = false;
                this.roleName.string = this.roleName.string.length == 0 ? cv.dataHandler.getUserData().nick_name : this.roleName.string;
            }
            else {
                this.roleName.node.active = false;
                _nicknameText.active = true;
                _nicknameText.getComponent(cc.Label).string = cv.dataHandler.getUserData().nick_name;
            }
        }
        else {
            this.roleName.node.active = false;
            _nicknameText.active = true;
            _nicknameText.getComponent(cc.Label).string = cv.dataHandler.getUserData().nick_name;
        }

        //提示文本
        if (cv.dataHandler.getUserData().isTouristUser) {
            cc.find("roleName_panel/tips_text", this.roleinfo_panel).active = true;
        } else {
            cc.find("roleName_panel/tips_text", this.roleinfo_panel).active = cv.dataHandler.getUserData().is_allow_update_name;
        }

        //账号升级按钮
        let isToShow = (cv.config.getCurrentScene() == cv.Enum.SCENE.HALL_SCENE && !cv.dataHandler.getUserData().isOpenUpdateUserMode);
        cc.find("roleinfo_panel/updateaccount_button", this.node).active = cv.dataHandler.getUserData().isTouristUser && isToShow;

        //确定按钮
        if (cv.dataHandler.getUserData().isTouristUser) {
            cc.find("roleinfo_panel/ok_button", this.node).active = cv.dataHandler.getUserData().isOpenUpdateUserMode;
        } else {
            cc.find("roleinfo_panel/ok_button", this.node).active = true;
        }
    }

    /**
     * 刷新头像显示
     */
    public updateHeadImg() {
        //更新头像
        let headRoleImg = cc.find("roleImg/setRoleImg_Button", this.roleinfo_panel);
        headRoleImg.active = true;
        if (this.headStr != "") {
            CircleSprite.setCircleSprite(headRoleImg, this.headStr, 0, true);
            cc.find("roleImg/default_img", this.roleinfo_panel).active = false;
            this._ishaveHead = true;
            cv.StringTools.setLabelString(this.roleinfo_panel, "headimg/label", "roleInfoSet_roleinfo_panel_modife_head_text");
        }

    }

    /**
     * 刷新选择的头像数据
     * @param index 
     * @param isChoose 
     */
    public updateHeadData(isChoose: boolean) {
        console.log("chooseIndex:" + this.chooseIndex);
        if (this.chooseIndex > 0) {
            let index = this.chooseIndex - 1;
            let group = Math.floor(index / 5);
            let group_index = index % 5;
            console.log("group:" + group + "  group_index:" + group_index);
            this.itemData[group].itemData[group_index].ischoose = isChoose;
        }
    }

    public clickHeadItem(headIndex: number) {
        //我里面的完善信息界面不接受账号升级界面的点击头像事件
        if (this._isSelfView && cv.dataHandler.getUserData().isOpenUpdateUserMode) return;
        //点击同一个
        if (this.chooseIndex == headIndex) return;
        //刷新上一次选择的头像的数据
        this.updateHeadData(false);
        //更新选择
        this.chooseIndex = headIndex;
        console.log("clickHeadItem chooseIndex:" + this.chooseIndex);
        this.updateHeadData(true);
        //记录头像的url
        this.headStr = headIndex.toString();
        this.systemHeadTime = (new Date()).getTime();
        //更新头像
        //this.updateHeadImg();
        //更新头像选择面板
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.reloadView(this.itemData, false);
    }

    /*onClickRight() {
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        //校准位置
        let absx = Math.ceil(Math.abs(sv.getScrollFixedPosition().x));
        let offset = absx % 216;
        sv.scrollToFixedPosition(cc.v2(absx - offset + 216 * 4, sv.scrollView.content.getPosition().y), 1);
    }
    onClickLeft() {
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        console.log("=====x:" + sv.getScrollFixedPosition().x);
        let absx = Math.ceil(Math.abs(sv.getScrollFixedPosition().x));
        let offset = absx % 216;
        sv.scrollToFixedPosition(cc.v2(absx - offset - 216 * 4, sv.scrollView.content.getPosition().y), 1);
    }*/

    //系统头像点击完成
    public onBtnSysCompleteClick() {
        this.closeSystemHeadPanel();
        this.updateHeadImg();
    }

    /**
     * 关闭系统头像选择界面
     */
    public closeSystemHeadPanel() {
        this.system_panel.active = false;
        this.chooseHead_panel.active = false;
        this.roleinfo_panel.active = true;
        cc.find("bg_top/title_text", this.node).active = true;
        cv.MessageCenter.send("AlwaysNode_Active", true);
        //返回按钮
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            cc.find("roBack_button_register", this.node).active = true;
            cc.find("roBack_button", this.node).active = false;
        } else {
            //升级账号
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cc.find("roBack_button_register", this.node).active = true;
                cc.find("roBack_button", this.node).active = false;
            } else {
                cc.find("roBack_button_register", this.node).active = false;
                cc.find("roBack_button", this.node).active = true;
            }
        }
        cc.find("bg_top", this.node).active = true;
    }

    //关闭点击选择手机和系统头像界面 
    public onClickChooseHeadPanel() {
        this.roleinfo_panel.active = true;
        this.chooseHead_panel.active = false;
        this.system_panel.active = false;
        //this.hideChooseHead_panel();
        //返回按钮
        if (cv.config.getCurrentScene() == cv.Enum.SCENE.LOGIN_SCENE) {
            cc.find("roBack_button_register", this.node).active = true;
            cc.find("roBack_button", this.node).active = false;
        } else {
            //升级账号
            if (cv.dataHandler.getUserData().isOpenUpdateUserMode) {
                cc.find("roBack_button_register", this.node).active = true;
                cc.find("roBack_button", this.node).active = false;
            } else {
                cc.find("roBack_button_register", this.node).active = false;
                cc.find("roBack_button", this.node).active = true;
            }
        }
        cv.MessageCenter.send("AlwaysNode_Active", true);
    }

    //注册页返回
    public onClickbackButton() {
        cv.MessageCenter.send("exitRoleInfoSet");
        //跟踪用户行为，发送事件
        let properties = { item: "backButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.Clicked, cv.Enum.Functionality.registration, properties);
    }

    //我界面返回
    public onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');
        if (cv.netWork.isConnect() && this._bMotifyInfo && cv.config.getCurrentScene() == SCENE.HALL_SCENE) {
            this._bMotifyInfo = false;
            cv.worldNet.GetTexasHandsRequest();
        }
        if (this.system_panel.active) {
            this.closeSystemHeadPanel();
        } else {
            this.updateHeadData(false);
            this.chooseIndex = 0;
            // 恢复显示"邮件"图标
            cv.MessageCenter.send("show_mail_entrance", true);
            cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);
            if (cv.config.getCurrentScene() == SCENE.GAME_SCENE) {
                if (cv.dataHandler.getUserData().isTouristUser) return;
                let url = cv.dataHandler.getUserData().headUrl;
                let temp = url.lastIndexOf("/");
                let tempStr = url.slice(temp + 1);
                let isNum = cv.StringTools.isNumber(tempStr);
                if (!isNum && cv.dataHandler.getActivityData().AvatarCallBack) {
                    cv.dataHandler.getActivityData().AvatarCallBack();
                }
            }
        }
    }

    /**
     * 显示上传头像的方式（系统头像或者自定议头像）
     */
    public showChooseHeadPanel() {
        this.chooseHead_panel.active = true;
        let bg = cc.find("panel_bg", this.chooseHead_panel);
        bg.opacity = 0;
        bg.runAction(cc.fadeTo(0.2, 100));
        let layout = cc.find("layout", this.chooseHead_panel);
        layout.stopAllActions();
        console.log(cv.config.HEIGHT);
        layout.setPosition(layout.getPosition().x, -cv.config.HEIGHT / 2 - layout.getContentSize().height);
        layout.runAction(cc.moveTo(0.2, cc.v2(layout.getPosition().x, -cv.config.HEIGHT / 2)));

        if (cv.config.isSiyuType()) {  //私语，网页版模式，将相册按钮禁用
            let btn_phone = layout.getChildByName("button_phone");
            let spArrow = btn_phone.getChildByName("Background");
            let label = btn_phone.getChildByName("Label");
            btn_phone.getComponent(cc.Button).interactable = false;
            label.color = cc.color(99, 99, 99);
            spArrow.color = cc.color(99, 99, 99);
        }
    }

    /**
     * 关闭，关闭动画（系统头像或者自定议头像）
     */
    public hideChooseHead_panel() {

    }

    /**
     * 昵称输入完毕
     */
    public profileNicknameEntered() {
        //跟踪用户行为，发送事件
        let properties = { item: "nicknameInput", isValid: this.checkName() };
        cv.segmentTool.track(cv.Enum.CurrentScreen.profile, cv.Enum.segmentEvent.InputFieldValueEntered, cv.Enum.Functionality.registration, properties);
    }

    /**
     * checkName
     */
    public checkName(): boolean {
        let nickName = this.roleName.string;
        if (nickName.length <= 0 || cv.StringTools.isHaveEmpty(nickName)) {
            return false;
        }
        // 是否包含特殊字符
        else if (!cv.StringTools.isClubNameFormat(nickName)) {
            return false;
        }
        // 是否包含敏感字符
        else if (cv.StringTools.isSensitiveWords(nickName, true)) {
            return false;
        } else if (cv.StringTools.getStrLen(nickName) < 4 || cv.StringTools.getStrLen(nickName) > 12) {
            return false;
        }
        return true;
    }
}
