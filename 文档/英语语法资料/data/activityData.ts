// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../components/lobby/cv"
import { HashMap } from "../common/tools/HashMap";
import ActivityView from "../components/lobby/hall/ActivityView";

export class ActivityInfo {
    alreadyShow:boolean = false; //弹窗在此次登录后是否已经显示了
    activity_id: number = 0;
    //activity_url: string[] = [];
    activity_url: string = "";
    activity_pictrue: string = "";
    activity_type: number = 0;
    frequency: number = 0;
    resource: string = "";
    day_times: number = 0;
    action_type: number = 0;
    gameCode:string = ""; //跳转电子小游戏名称
    gameID:number = 0; //小游戏ID
    matchID:string = ""; //一起看球的具体比赛ID
    forcedJump:number = 0; //0：不强制跳转  1：强制跳转   强制跳转的状态下，活动弹框的关闭按钮隐藏
}

export enum ActivityType {
    NONE = -1,
    CustomAvatar = 2,//登陆、游戏退出
    GameAvatar = 3,  //点击急速列表、游戏内坐下
    BANNER = 4,      //有二级全屏网页
    JUNMP_MTT = 5,   //跳转到MTT
    JUNMP_SPORT = 6, //跳转到体育
    JUNMP_ELECT_LIST = 7,  //跳转到电子游戏列表
    JUNMP_ELECT_GAME = 8, //跳转到某个电子游戏
    JUNMP_MINI_GAME = 9, //跳转到百人，牛仔，扑克大师小游戏游戏
    JUNMP_TOP_MATCHES = 10, //一起去看球
    JUNMP_HALL_BANK = 11,  //跳转到大厅银行界面
    JUNMP_BLACKJACK = 12, //跳转到21点界面
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class Activity extends cc.Component {
    isShow: boolean = false;
    showType: number = -1;
    is_alert_avatar: boolean = false;
    activityList: HashMap<number, ActivityInfo> = new HashMap();
    webPngList: HashMap<string, cc.Texture2D> = new HashMap();
    AvatarCallBack: Function = null;
    private static instance: Activity;
    public static getInstance(): Activity {
        if (!Activity.instance) {
            Activity.instance = new Activity();
        }
        return Activity.instance;
    }

    addActivityInfo(index: number, info: ActivityInfo) {
        /*if (!this.getWebPngTexture(info.activity_pictrue)) {
            if (info.activity_pictrue != "") {
                cv.resMgr.loadRemote(info.activity_pictrue, function (error: Error, resource: cc.Texture2D) {
                    console.log('Should load a texture from external url: ' + (resource instanceof cc.Texture2D));
                    if (error) {
                        console.log(error.message || error);
                        return;
                    }
                    this.webPngList.add(info.activity_pictrue, resource);
                }.bind(this));
            }
        }*/
        this.activityList.add(index, info);
    }

    getActivityInfo(index: number): ActivityInfo {
        return this.activityList.get(index);
    }

    //获取此次登录后，是否还有没有显示的活动弹窗。
    //因为有的活动弹窗是直接进入到小游戏等场景，所以退出来后，剩余的弹窗没有显示出来
    getActivityHaveNotShow():boolean{
        if(this.activityList.length <=0){
            return false;
        }

        for(let i = 0; i < this.activityList.length; ++i){
           let activtyInfo:ActivityInfo = this.activityList.get(i);
            //头像弹窗不计算在内
           if(!activtyInfo.alreadyShow && (activtyInfo.activity_type != ActivityType.GameAvatar && activtyInfo.activity_type != ActivityType.CustomAvatar)){  //存在没有展示的活动
              return true;
           }
        }

        return false;
    }

    removeActivityInfo() {
        this.activityList.clear();
    }

    getWebPngTexture(name: string): cc.Texture2D {
        return this.webPngList.get(name);
    }

    haveAvatar(runActivty: boolean, type: number, bJudge50: boolean = true): boolean {
        if (!this.isAvatar(bJudge50)) {
            this.isShow = true;
            if(this.isTotalHandsOver()){ //小于50手此次showType不重置，防止刚注册的用户剩余活动弹窗不弹
                this.showType = type;
            }
            if (runActivty) {
                cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).init();
                cc.director.getScene().getChildByName("activityView").getComponent(ActivityView).showActivity(this.showType);
                this.isShow = false;
                this.showType = ActivityType.NONE;
            }
            return false;
        }
        return true;
    }

    isAvatar(bJudge50: boolean = true): boolean {
        if (cv.config.isSiyuType()) return true;
        if (cv.dataHandler.getUserData().isTouristUser) return true;
        let result = this.isSystemAvatar();
        if (result && bJudge50) {
            return !this.isTotalHandsOver();
        }

        return !result;
    }

    isSystemAvatar(): boolean {
        let url = cv.dataHandler.getUserData().headUrl;
        let temp = url.lastIndexOf("/");
        let tempStr = url.slice(temp + 1);
        let isNum = cv.StringTools.isNumber(tempStr);
        return isNum;
    }

    isTotalHandsOver() {
        return cv.dataHandler.getUserData().totalHands >= 50;
    }
}