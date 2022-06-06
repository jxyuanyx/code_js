// import ws_protocol = require("../../../common/pb/ws_protocol");
// import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import { TableView } from "../../../common/tools/TableView";

const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameNewRoomListItemEuropean extends cc.Component {
    @property(cc.Sprite) img_logo1: cc.Sprite = null;
    @property(cc.Sprite) img_logo2: cc.Sprite = null;
    @property(cc.Sprite) img_online: cc.Sprite = null;
    @property(cc.Sprite) img_calendar: cc.Sprite = null;
    @property(cc.Sprite) img_livetime: cc.Sprite = null;
    @property(cc.Button) btn_enter: cc.Button = null;
    @property(cc.Label) txt_name: cc.Label = null;
    @property(cc.Label) txt_team_0: cc.Label = null;
    @property(cc.Label) txt_team_1: cc.Label = null;
    @property(cc.Label) txt_score_0: cc.Label = null;
    @property(cc.Label) txt_score_1: cc.Label = null;
    @property(cc.Label) txt_online: cc.Label = null;
    @property(cc.Label) txt_livetime: cc.Label = null;
    @property(cc.Label) txt_calendar: cc.Label = null;
    @property(cc.Label) txt_enter_word: cc.Label = null;

    static g_class_name: string = "MiniGameNewRoomListItemEuropean";
    private _dataRef: any = null;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.node.on("click", this._onClickBtnEnter, this);
        this.btn_enter.node.on("click", this._onClickBtnEnter, this);
    }

    protected start(): void {
    }

    protected onEnable(): void {
    }

    protected onDisable(): void {
    }

    private _onClickBtnEnter(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (!this._dataRef) return;
        cv.MessageCenter.send(`${MiniGameNewRoomListItemEuropean.g_class_name}_click`, this._dataRef);
    }

    updateSVReuseData(index: number, info: any, view?: TableView): void {
        this._dataRef = info;

        // 按语言类型调整若干控件字体大小
        if (cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN) {
            this.txt_name.fontSize = 40;
            this.txt_calendar.fontSize = 40;
            this.txt_online.fontSize = 40;
            this.txt_enter_word.fontSize = 40;

            this.txt_team_0.enableBold = true;
            this.txt_team_1.enableBold = true;
        }
        else {
            this.txt_name.fontSize = 32;
            this.txt_calendar.fontSize = 32;
            this.txt_online.fontSize = 32;
            this.txt_enter_word.fontSize = 32;

            this.txt_team_0.enableBold = false;
            this.txt_team_1.enableBold = false;
        }

        // 确定按钮文本
        this.txt_enter_word.string = cv.config.getStringData(`minigame_new_room_enter`);

        // 队伍"icon"
        this.img_logo1.spriteFrame = null;
        this.img_logo2.spriteFrame = null;
        let path_icon_loading: string = "hall/miniGame/new/icon_soccer";
        cv.resMgr.setSpriteFrame(this.img_logo1.node, cv.config.getLanguagePath(path_icon_loading, LANGUAGE_TYPE.zh_CN));
        cv.resMgr.setSpriteFrame(this.img_logo2.node, cv.config.getLanguagePath(path_icon_loading, LANGUAGE_TYPE.zh_CN));
        let url_profix: string = cv.domainMgr.getTopMatchesLogoUrl();
        let url_logo1: string = cv.String(`${url_profix}${info.logo1}`);
        let url_logo2: string = cv.String(`${url_profix}${info.logo2}`);
        cv.resMgr.loadRemote(url_logo1, (error: Error, texture: cc.Texture2D): void => {
            if (error) {
                console.error(error.message || error);
                return;
            }

            // 防止回调回来实例已销毁
            if (cv.tools.isValidNode(this.img_logo1)) this.img_logo1.spriteFrame = new cc.SpriteFrame(texture);
        });
        cv.resMgr.loadRemote(url_logo2, (error: Error, texture: cc.Texture2D): void => {
            if (error) {
                console.error(error.message || error);
                return;
            }

            // 防止回调回来实例已销毁
            if (cv.tools.isValidNode(this.img_logo2)) this.img_logo2.spriteFrame = new cc.SpriteFrame(texture);
        });

        // 联赛名
        this.txt_name.string = cv.String(info.tournamentName);

        // 队伍名(需要切割)
        this.txt_team_0.string = "";
        this.txt_team_1.string = "";
        let matchNames: string[] = cv.String(info.matchName).split('vs');
        if (matchNames.length > 0) {
            this.txt_team_0.string = matchNames[0] && matchNames[0].length > 0 ? matchNames[0].trim() : "";
            this.txt_team_1.string = matchNames[1] && matchNames[1].length > 0 ? matchNames[1].trim() : "";
        }

        // 比分(需要切割)
        this.txt_score_0.string = "0";
        this.txt_score_1.string = "0";
        if (info.liveScore && typeof info.liveScore !== "undefined") {
            let scores: string[] = cv.String(info.liveScore.score).split(":");
            if (scores.length > 0) {
                this.txt_score_0.string = scores[0] && scores[0].length > 0 ? scores[0].trim() : "0";
                this.txt_score_1.string = scores[1] && scores[1].length > 0 ? scores[1].trim() : "0";
            }
        }

        // 在线人数
        this.txt_online.string = cv.Number(info.count).toString();

        // 比赛状态(1:已开赛)
        let matchState: number = cv.Number(info.matchState);
        if (matchState === 1) {
            // 已开赛
            this.img_calendar.node.active = false;
            this.txt_calendar.node.active = false;
            this.img_livetime.node.active = true;

            // 开赛时长(·•●◉⬤☪)
            this.txt_livetime.string = "";
            if (info.liveTime && typeof info.liveTime !== "undefined") {
                let runTime: string = cv.String(info.liveTime.runTime);
                if (runTime.length <= 0) runTime = "0";
                this.txt_livetime.string = `● Live ${runTime}'`;
            }
        }
        else {
            // 距离开赛的日期
            this.img_calendar.node.active = true;
            this.txt_calendar.node.active = true;
            this.img_livetime.node.active = false;

            let formatTime: string = "";
            let matchDate: number = cv.Number(info.matchDate)
            let difDays: number = cv.StringTools.getDateDifference(matchDate);
            let difTimes: string = cv.StringTools.formatTime(matchDate, cv.Enum.eTimeType.Hour_Minute, true, false, "/");

            // 今天
            if (difDays >= 0 && difDays < 1) {
                let strProfix: string = cv.config.getStringData("minigame_new_date_today");
                formatTime = `${strProfix} ${difTimes}`;
            }
            // 明天
            else if (difDays >= 1 && difDays < 2) {
                let strProfix: string = cv.config.getStringData("minigame_new_date_tomorrow");
                formatTime = `${strProfix} ${difTimes}`;
            }
            // 后天
            else if (difDays >= 2 && difDays < 3) {
                let strProfix: string = cv.config.getStringData("minigame_new_date_acquired");
                formatTime = `${strProfix} ${difTimes}`;
            }
            else {
                // 月/日 时:分
                if (cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN) {
                    formatTime = cv.StringTools.formatTime(matchDate, cv.Enum.eTimeType.Month_Day_Hour_Min, true, false, "/");
                }
                // 日/月 时:分
                else {
                    formatTime = cv.StringTools.formatTime(matchDate, cv.Enum.eTimeType.Day_Month_Hour_Min, true, false, "/");
                }
            }
            this.txt_calendar.string = formatTime;
        }

        // 排版比赛时长/日期/在线人数等右对齐
        do {
            let x: number = this.txt_online.node.x;
            let y: number = this.txt_online.node.y;
            let offset: number = 15;

            // 在线人数
            let txt_online_w: number = cv.resMgr.getLabelStringSize(this.txt_online).width;
            x -= txt_online_w * this.txt_online.node.anchorX * this.txt_online.node.scaleX;
            x -= offset;
            x -= this.img_online.node.width * (1 - this.img_online.node.anchorX) * this.img_online.node.scaleX;
            this.img_online.node.setPosition(x, y);
            x -= this.img_online.node.width * this.img_online.node.anchorX * this.img_online.node.scaleX;

            // 比赛日期
            if (this.txt_calendar.node.active) {
                let txt_calendar_w: number = cv.resMgr.getLabelStringSize(this.txt_calendar).width;
                x -= offset;
                x -= txt_calendar_w * (1 - this.txt_calendar.node.anchorX) * this.txt_calendar.node.scaleX;
                this.txt_calendar.node.setPosition(x, y);
                x -= txt_calendar_w * this.txt_calendar.node.anchorX * this.txt_calendar.node.scaleX;
                x -= offset;

                x -= this.img_calendar.node.width * (1 - this.img_calendar.node.anchorX) * this.img_calendar.node.scaleX;
                this.img_calendar.node.setPosition(x, y);
                x -= this.img_calendar.node.width * this.img_calendar.node.anchorX * this.img_calendar.node.scaleX;
            }

            // 开赛时长
            if (this.img_livetime.node.active) {
                x -= offset;
                x -= this.img_livetime.node.width * (1 - this.img_livetime.node.anchorX) * this.img_livetime.node.scaleX;
                this.img_livetime.node.setPosition(x, y);
            }
        } while (false);
    }
}
