// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "./../cv";
import Activity, { ActivityInfo, ActivityType } from "../../../data/activityData";
import { LANGUAGE_TYPE, SCENE } from "../../../common/tools/Enum";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ActivityView extends cc.Component {
    webview: cc.WebView = null;
    webPng: cc.Sprite = null;
    _bg: cc.Node = null;
    _show_index: number = 0;
    _isShowAnimation: boolean = false;
    _url: string = "";
    _picture: string = "";
    _isView: boolean = false;
    private callback: Function = null;
    private _isShowVIPTool: boolean = false;
    private showType = 0; // 0 登陆弹框活动 1 客服按钮弹框活动
    private btnClose:cc.Node = null;
    @property(cc.SpriteFrame) frameArr:cc.SpriteFrame[] = [];
    readonly frameName: string = "updatePng";
    onLoad() {
        cv.MessageCenter.register("HideWebview_ShowWindows", this.HandleSwitchServer.bind(this), this.node);
        cv.MessageCenter.register("on_webCcjsCallback", this.on_webCcjsCallback.bind(this), this.node);
        cc.find("bg_panel/background", this.node).on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
        }, this);

        this.btnClose =  cc.find("web_bg_panel/close_button", this.node)
    }
    clearCallBack(){
        this.callback = null;
    }
    onDestroy() {
        cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
        cv.MessageCenter.unregister("on_webCcjsCallback", this.node);
    }

    HandleSwitchServer(isView?: boolean) {
        isView = (isView == true && this._isView == true) ? true : false;
        if (this.node) {
            this.node.active = isView;
        }
    }

    init() {
        this._bg = cc.find("web_bg_panel", this.node);
        this.webview = cc.find("web_bg_panel/web_panel", this.node).getComponent(cc.WebView);
        this.webPng = cc.find("web_bg_panel/web_png", this.node).getComponent(cc.Sprite);
        this.webPng.node.active = false;
        if (this.webview == null) {
            this.webview = cc.find("web_bg_panel/web_panel", this.node).addComponent(cc.WebView);
        }
        this.webview.node.active = false;
        this._show_index = 0;
        this._isShowAnimation = false;
      
    }

    removeWebview() {
        if (this.webview != null) {
            this.webview.destroy();
            this.webview = null;
        }
    }

    onBtnCloseClick() {
        cv.AudioMgr.playButtonSound('close');

        if (!this._isShowVIPTool) {
            this.showActivity(this.showType, this.callback);
        } else {
            this.closeActivity();
        }
    }

    reOpenActivity() {
        if (!this._isShowVIPTool) {
            this.showActivity(this.showType, this.callback);
        } else {
            this.closeActivity();
        }
    }

    closeActivity(isSnap: boolean = false) {
        isSnap = isSnap == true ? true : false;
        this.removeWebview();
        let scal = cc.scaleBy(0.2, 0);
        let pkCall = cc.callFunc(function () {
            this.node.active = false;
            this._isView = false;
            if (this.callback) {
                this.callback();
            }
            if (!isSnap) {
                cv.MessageCenter.send("sortATLView");
            }
        }.bind(this));
        console.log("ssssssssss" + this._bg);
        this._bg.stopAllActions();
        this._bg.runAction(cc.sequence(scal, pkCall));
    }

    showActivity(showType: number = 0, callback: Function = null) {
        if (cv.SwitchLoadingView.isShow()) return;
        //if (this.webview == null) return;
        console.log("showActivity+++++++11111");
        if(!cc.isValid(this._bg,true)) return;
        console.log("showActivity+++++++22222");
        this._isShowVIPTool = false;
        this.callback = callback;
        this.showType = showType;
        let data: Activity = cv.dataHandler.getActivityData();
        let len = data.activityList.length;
        if (len <= 0) {
            this.closeActivity();
        }
        else {
            cv.dataHandler.getActivityData().isShow = false;
            let info: ActivityInfo = null;


            let isOpen = false;
            let tempType = 0;
            let resource: string = "";
            let version: string = "";

            for (let i = this._show_index; i < len; ++i) {
                info = data.getActivityInfo(i);
                if (this.showType != 0 && this.showType != info.activity_type){
                    console.log("This activity showType." + info.activity_type);
                    continue;
                } 

                if(info.alreadyShow){  //在当前登录，这个活动弹窗已经弹过了
                    console.log("This activity already show in this login.");
                    continue;
                }

                // let is_alert_avatar = cv.dataHandler.getActivityData().is_alert_avatar;
                // if (is_alert_avatar == false && info.activity_type == ActivityType.CustomAvatar && this.showType == 0) continue;
                if ((info.activity_type == ActivityType.GameAvatar || info.activity_type == ActivityType.CustomAvatar) && this.showType == 0) {
                    continue;
                }
                  
                //私语不弹自定义头像活动弹框
                if (cv.config.isSiyuType() && (info.activity_type == ActivityType.CustomAvatar || info.activity_type == ActivityType.GameAvatar || info.activity_type == ActivityType.BANNER || info.activity_type == ActivityType.JUNMP_MTT)) {
                    continue;
                }


                this._url = info.activity_url; //this.getActivityUrl(info);
                this._picture = info.activity_pictrue;
                tempType = info.activity_type;

                let forcedJump = info.forcedJump; //是否强制跳转， 强制跳转，活动关闭按钮隐藏。
                this.btnClose.active = (forcedJump == 1?false:true);

                if (info.action_type == 2) {
                    if (this.recordDaytimes(info.day_times, info.activity_id)) {
                        isOpen = true;
                        this._show_index = i + 1;
                        break;
                    }
                }
                else if (info.action_type == 1) {
                    let num = cv.Number(cv.tools.GetStringByCCFile(cv.StringTools.formatC("activity_%d", info.activity_id)));
                    if (this.showType != 0) {
                        num = cv.Number(cv.tools.GetStringByCCFile(cv.StringTools.formatC("activity_%d_%d", showType, info.activity_id)));
                    }
    
                    if (num < info.frequency || info.frequency == -1) {
                        num++;
                        if (this.showType == 0) {
                            cv.tools.SaveStringByCCFile(cv.StringTools.formatC("activity_%d", info.activity_id), num.toString());
                        } else {
                            cv.tools.SaveStringByCCFile(cv.StringTools.formatC("activity_%d_%d", showType, info.activity_id), num.toString());
                        }
                        isOpen = true;
                      
                        this._show_index = i + 1;
    
                        if (info.resource.length > 0) {
                            let res_ver = info.resource.split("_");

                            resource = res_ver[0];
                            version = res_ver[1];
                            if (version != cv.config.GET_CLIENT_VERSION()) {
                                this.showActivity(this.showType, this.callback);
                                if(info.activity_type != ActivityType.GameAvatar && info.activity_type != ActivityType.CustomAvatar){
                                    info.alreadyShow = true;
                                }
                                return;
                            }
                        }
                        break;
                    }
                }
            }

            if(info && info.activity_type != ActivityType.GameAvatar && info.activity_type != ActivityType.CustomAvatar){
                info.alreadyShow = true; //设置为已经显示了
            }
            
            if (!isOpen) {
                this.closeActivity();
                return;
            }

            this._bg.scale = 1;
            this.node.active = true;

            //默认显示图片
            this.webPng.node.active = true;

            if (this.webview != null) {
                this.webview.node.active = false;
            }

            this._isView = true;

            //版本更新内容特殊处理
            if (cv.StringTools.getArrayLength(resource)) {
                if (resource == this.frameName && version == cv.config.GET_CLIENT_VERSION()) {
                    let index = 0;
                    let curLang = cv.config.getCurrentLanguage();
                    switch(curLang) {
                        case LANGUAGE_TYPE.zh_CN:
                            index = 0;
                            break;
                        case LANGUAGE_TYPE.en_US:
                            index = 1;
                            break;
                        case LANGUAGE_TYPE.yn_TH:
                            index = 2;
                            break;
                            default:
                                index = 1;
                    }
                    this.webPng.spriteFrame = this.frameArr[index];   
                }
            }
            else
            {
                cv.CacheUtils.load(this._picture, (spf: cc.SpriteFrame) => {
                    if (cv.tools.isValidNode(this.webPng)) {
                        this.webPng.spriteFrame = spf;
                        this.webPng.node.active = true;
                    }
                }, null);
            }

            if (this._isShowAnimation) {
                let scal = cc.scaleBy(0.2, 0);
                let callFunc1 = cc.callFunc((): void => {
                    //this.webview.url = "about:blank";
                }, this);
                let callFunc2 = cc.callFunc((): void => {
                    //this.webview.url = this._url;
                }, this);
                let delay = cc.delayTime(0.01);
                let scal1 = cc.scaleTo(0.2, 1);
                this._bg.stopAllActions();
                this._bg.runAction(cc.sequence(scal, callFunc1, delay, callFunc2, scal1));
            } else {
                //this.webview.url = this._url;
            }
            this._isShowAnimation = true;
            
            //链接地址区分
            //url为空表示不可以点击
            //默认没有前缀	以前的webview
            //cfull://		这种是app全屏显示 直播
            //cnotice://		这种是app公告打开，底下记得选中公告 这个得加上&uid
            //cbrowser://		这种就调用浏览器打开
            //cfull://http://
            this.webPng.node.targetOff(this);
            this.webPng.node.on("touchend",()=>{
                //图片点击对应处理
                if (tempType == ActivityType.CustomAvatar || tempType == ActivityType.GameAvatar) {
                    this.closeActivity();
                    if (cv.config.getCurrentScene() == SCENE.HALL_SCENE) {
                        cv.MessageCenter.send("switchSceneToSelfView");
                        cv.MessageCenter.send("open_avatar");
                    }
                    else if (cv.config.getCurrentScene() == SCENE.GAME_SCENE) {
                        cv.MessageCenter.send("roleInfoSet_setAvatar");
                    }
                    return;
                }
                else if (tempType == ActivityType.BANNER || this._url.indexOf("cfull://") != -1) {
                    //cfull
                    this.closeActivity(true);
                    let webUrl = this._url.replace("cfull://", "");
                    let web = (new cc.Node("activity_webview")).addComponent(cc.WebView);
                    web.node.setContentSize(cc.size(cv.config.WIDTH, cv.config.HEIGHT));
                    web.node.setPosition(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
                    cc.director.getScene().addChild(web.node);
                    web.url = webUrl;
                    web.setJavascriptInterfaceScheme("ccjs");
                    web.setOnJSCallback((webView: cc.WebView, url: string) => {
                        if (url.search("ccjs://https") != -1 || url.search("ccjs://http") != -1) {
                            console.log("----------> boob close 1");
                            let banner_webview = cc.director.getScene().getChildByName("activity_webview");
                            if (banner_webview) {
                                banner_webview.removeFromParent(true);
                                banner_webview.destroy();
                            }
                            let index = this._show_index;
                            let isAni = this._isShowAnimation;
                            this.init();
                            this._show_index = index;
                            this._isShowAnimation = isAni;
                            this.showActivity(this.showType, this.callback);
                        }
                    });
                    return;
                }
                else if (tempType == ActivityType.JUNMP_MTT) {
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToMtt");
                    return;
                }else if(tempType == ActivityType.JUNMP_BLACKJACK){
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToBlackJack");
                    return;
                }
                else if(tempType == ActivityType.JUNMP_SPORT){ //跳转到体育
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToMiniGamesHall", {junmpType: cv.Enum.JUNMPGAMETYPE.JUNMP_TO_SPORT});
                    return;
                }else if(tempType == ActivityType.JUNMP_ELECT_LIST){  //跳转到电子小游戏列表
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToMiniGamesHall",  {junmpType: cv.Enum.JUNMPGAMETYPE.JUNMP_TO_ELECT_LIST});
                    return;
                }else if(tempType == ActivityType.JUNMP_MINI_GAME){  //跳转到百人，牛仔，扑克大师小游戏游戏
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToMiniGamesHall",  
                                {junmpType: cv.Enum.JUNMPGAMETYPE.JUNMP_TO_MINI_GAME, gameID:info.gameID});
                    return;
                }else if(tempType == ActivityType.JUNMP_ELECT_GAME){  //跳转到某个小游戏
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToMiniGamesHall", 
                             {junmpType: cv.Enum.JUNMPGAMETYPE.JUNMP_TO_ELECT_GAME, gameCode:info.gameCode});
                    return;
                }else if(tempType == ActivityType.JUNMP_TOP_MATCHES){ //一起看球
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToMiniGamesHall", 
                             {junmpType: cv.Enum.JUNMPGAMETYPE.JUNMP_TO_WATCH_MACTCHS, matchID:info.matchID});
                    return;
                }else if(tempType == ActivityType.JUNMP_HALL_BANK){ //跳转到银行
                    this.closeActivity();
                    cv.MessageCenter.send("jumpToHallBank");
                    return;
                }
                else if (this._url.indexOf("cnotice://") != -1) {
                    let url = this._url.replace("cnotice://", "");
                    //这个是跳转到公告界面
                    this.closeActivity();
                    cv.MessageCenter.send("jumpgto_notice", url);
                    return;
                }
                else if (this._url.indexOf("cbrowser://") != -1) {
                    let url = this._url.replace("cbrowser://", "");

                    console.log("===========url::=> %s" + this._url);

                    cc.sys.openURL(url);
                    return;
                }
                else if (this._url.length == 0) {
                    //表示不可点击
                    return;
                }
                else  {
                    //表示没有前缀用以前的webview
                    this.webPng.node.active = false;

                    if (this.webview != null) {
                        this.webview.node.active = true;
                        this.webview.url = this._url;   
                    }
                    return;
                }

                //console.log("===========url::=> %s" + this._url);
                //cc.sys.openURL(this._url);
            },this);
        }
    }

    showActivity_VIPTool(url: string) {
        if (cv.SwitchLoadingView.isShow()) return;
        if (this.webview == null) return;

        this._isShowVIPTool = true;
        this.callback = null;
        this._url = url;

        this._bg.scale = 1;
        this.node.active = true;
        this._isView = true;
        this.webview.node.active = true;
        this.webview.setJavascriptInterfaceScheme("ccjs");
        this.webview.setOnJSCallback(function (webView: cc.WebView, url: string) {
            let http = "http:";
            let index = 0;
            let urls = "";
            if (url.search("ccjs://https") != -1) {
                index = url.search("ccjs://https");
                urls = url.substr(index + 13, url.length);
                http = "https:";
            } else if (url.search("ccjs://http") != -1) {
                index = url.search("ccjs://http");
                urls = url.substr(index + 12, url.length);
            }
            console.log("===========url::=> %s" + urls);

            cc.sys.openURL(http + urls);
        });

        if (this._isShowAnimation) {
            let scal = cc.scaleBy(0.2, 0);
            let callFunc1 = cc.callFunc((): void => {
                this.webview.url = "about:blank";
            }, this);
            let callFunc2 = cc.callFunc((): void => {
                this.webview.url = this._url;
            }, this);
            let delay = cc.delayTime(0.01);
            let scal1 = cc.scaleTo(0.2, 1);
            this._bg.stopAllActions();
            this._bg.runAction(cc.sequence(scal, callFunc1, delay, callFunc2, scal1));
        } else {
            this.webview.url = this._url;
        }
        this._isShowAnimation = true;


    }

    on_webCcjsCallback(url: string) {
        let http = "http:";
        let index = 0;
        let urls = "";
        if (url.search("ccjs://https") != -1) {
            index = url.search("ccjs://https");
            urls = url.substr(index + 13, url.length);
            http = "https:";
        } else if (url.search("ccjs://http") != -1) {
            index = url.search("ccjs://http");
            urls = url.substr(index + 12, url.length);
        }
        else if (url.search("ccjs://avatar") != -1) {
            this.closeActivity();
            cv.MessageCenter.send("switchSceneToSelfView");
            cv.MessageCenter.send("open_avatar");
            return;
        }

        console.log("===========url::=> %s" + urls);

        let cmdStr = "{\"cmd\": \"1012\", \"url\":\"%s\"}";
        let cmd = cv.StringTools.formatC(cmdStr, http + urls);
        cv.native.SYwebjsToClient(cmd);
    }

    setCallBackNull() {
        if (this.callback) {
            this.callback = null;
        }
    }

    // getActivityUrl(info: ActivityInfo): string {
    //     if (info.activity_type == 0) {
    //         return info.activity_url[0];
    //     }
    //     else {
    //         let url = "";
    //         let lang = cv.config.getCurrentLanguage();
    //         switch (lang) {
    //             case LANGUAGE_TYPE.zh_CN:
    //                 url = info.activity_url[0];
    //                 break;
    //             case LANGUAGE_TYPE.en_US:
    //                 url = info.activity_url[1];
    //                 break;
    //             case LANGUAGE_TYPE.yn_TH:
    //                 url = info.activity_url[2];
    //                 break;
    //                 default:
    //                     url = info.activity_url[1];
    //         }
    //         return url;
    //     }
    // }

    //每次进来都弹
    //每天只弹一次
    //day_times
    //每天弹出次数  0为不限制
    //每次都弹是0
    recordDaytimes(daytimes: number, id: number): boolean {
        if (daytimes == undefined || daytimes < 0)  return false;
        if (daytimes == 0)  return true;
        let firstDate = cv.Number(cv.tools.GetStringByCCFile(cv.StringTools.formatC("firstDate_%d", id)));
        let times = cv.Number(cv.tools.GetStringByCCFile(cv.StringTools.formatC("activity_times_%d", id)));

        //转换成时间戳
        let time = new Date().getTime();
        if (firstDate) {
            if (this.isSameday(firstDate)) {
                if (times < daytimes) {
                    cv.tools.SaveStringByCCFile(cv.StringTools.formatC("firstDate_%d", id), JSON.stringify(time));
                    cv.tools.SaveStringByCCFile(cv.StringTools.formatC("activity_times_%d", id),  (++times).toString());
                }
                else
                {
                    //表示到达了次数
                    // this.showActivity(this.showType, this.callback);
                    return false;
                }
            }
            else
            {
                //不在同一天 
                cv.tools.SaveStringByCCFile(cv.StringTools.formatC("firstDate_%d", id), JSON.stringify(time));
                cv.tools.SaveStringByCCFile(cv.StringTools.formatC("activity_times_%d", id),  "1");
            }
        }
        else
        {
            cv.tools.SaveStringByCCFile(cv.StringTools.formatC("firstDate_%d", id), JSON.stringify(time));
            cv.tools.SaveStringByCCFile(cv.StringTools.formatC("activity_times_%d", id),  (++times).toString());
        }

        return true;
    }

    isSameday(oldDate: number): boolean {
        try {
            return (new Date(oldDate)).toDateString() == (new Date(new Date().getTime())).toDateString();
        } catch (error) {
            return false;
        }
    }
}
