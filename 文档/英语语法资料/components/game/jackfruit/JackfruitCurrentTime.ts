import jackfruit_protocol = require("./../../../../Script/common/pb/jackfruit");
import jackfruit_pb = jackfruit_protocol.jackfruit_proto;

import cv from "../../lobby/cv";
import { ObPlayer, PlayerInfo } from "./JackfruitData"
import ListView from "../../../common/tools/ListView";
import { JackfruitCurrentTimeItem } from "./JackfruitCurrentTimeItem";
import { JackfruitObItem } from "./JackfruitObItem";
import { JackfruitObMan } from "./JackfruitObMan";

const { ccclass, property } = cc._decorator;
@ccclass
export class CurrentTime extends cc.Component {
    @property(cc.Node) _curentTime_panel: cc.Node = null;
    @property(cc.Label) _title_text: cc.Label = null;
    @property(cc.Label) _roleName_txt: cc.Label = null;
    @property(cc.Label) _buyinLimit_txt: cc.Label = null;
    @property(cc.Label) _buyin_txt: cc.Label = null;
    @property(cc.ScrollView) _data_scrollview: cc.ScrollView = null;
    @property(cc.Sprite) _shakeOn_img: cc.Sprite = null;
    @property(cc.Sprite) _shakeOff_img: cc.Sprite = null;

    @property(cc.Button) _shake_button: cc.Button = null;
    @property(cc.Boolean) _shakeStatus: boolean = true;

    pkStituation: any = null;

    onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this._curentTime_panel = cc.find("curentTime_panel", this.node);
        this._title_text = cc.find("curentTime_panel/title_text", this.node).getComponent(cc.Label);
        this._roleName_txt = cc.find("curentTime_panel/roleName_txt", this.node).getComponent(cc.Label);
        this._buyinLimit_txt = cc.find("curentTime_panel/buyinLimit_txt", this.node).getComponent(cc.Label);

        this._buyin_txt = cc.find("curentTime_panel/buyin_txt", this.node).getComponent(cc.Label);
        this._data_scrollview = cc.find("curentTime_panel/data_ScrollView", this.node).getComponent(cc.ScrollView);

        this._shake_button = cc.find("set_panel/shake_button", this.node).getComponent(cc.Button);
        this._shakeOn_img = cc.find("set_panel/shake_img/shakeOn_img", this.node).getComponent(cc.Sprite);
        this._shakeOff_img = cc.find("set_panel/shake_img/shakeOff_img", this.node).getComponent(cc.Sprite);

        this._shakeStatus = true;

        this.addEvent();

        this.setButtonStatus();
        this.initLanguage();

        if (cv.native.isFullScreen()) {
            this._curentTime_panel.getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        }
        cv.resMgr.adaptWidget(this.node, true);

        cv.MessageCenter.register("on_jackfruit_situation", this.onRoomSituation.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("on_jackfruit_situation", this.node);
    };

    initLanguage() {
        this._title_text.string = cv.config.getStringData("curentTime_curentTime_panel_title_text");
        this._roleName_txt.string = cv.config.getStringData("curentTime_curentTime_panel_roleName_txt");
        this._buyinLimit_txt.string = cv.config.getStringData("curentTime_curentTime_panel_buyinLimit_txt");
        this._buyin_txt.string = cv.config.getStringData("curentTime_curentTime_panel_buyin_txt");
        cv.StringTools.setLabelString(this.node, "set_panel/shake_img/shake_txt", "curentTime_curentTime_panel_shake_txt");
    }

    public outRegion() {
        this.node.active = false;
    }

    public onRoomSituation(msg: any) {
        this.pkStituation = msg;

        var kRecords: Array<jackfruit_pb.PlayerBuyInInfo> = [];
        for (let i = 0; i < msg.playerBuyInInfo.length; ++i) {
            let kPlayer: jackfruit_pb.PlayerBuyInInfo = msg.playerBuyInInfo[i];
            kRecords.push(kPlayer);
        }

        var kObservers: Array<ObPlayer> = [];
        for (let i = 0; i < msg.observerList.length; ++i) {
            let kPlayer: PlayerInfo = msg.observerList[i];
            let obPlayer: ObPlayer = new ObPlayer;
            obPlayer.name = kPlayer.name;
            obPlayer.playerid = kPlayer.playerId;
            obPlayer.marks = kPlayer.marks;
            obPlayer.isInroom = kPlayer.is_online;
            obPlayer.data = kPlayer;
            obPlayer.headPath = kPlayer.headUrl;
            obPlayer.plat = kPlayer.plat;
            kObservers.push(obPlayer);
        }

        // 买入列表
        let dataList = [];
        kRecords.sort(this.compareRecords);
        for (let index = 0; index < kRecords.length; index++) {
            dataList.push({ type: 0, data: kRecords[index] });

        }

        //人数
        dataList.push({ type: 1, data: { onlineNum: msg.observer_info.online_count, totalNum: msg.observer_info.total_count } });
        //旁观头像
        let line = 0;//行数
        let lineNum = 4;//每一行4个
        for (let index = 0; index < kObservers.length;) {
            let obdata = [];
            for (let i = 0; i < lineNum; i++) {
                let curindex = i + line * lineNum;
                if (curindex < kObservers.length) {
                    obdata.push(kObservers[curindex]);
                    index++
                } else {
                    break;
                }
            }
            dataList.push({ type: 2, data: obdata });
            line++;
        }

        if (msg.observer_info.total_count > 40) {
            dataList.push({ type: 3, data: {} });
        }

        this._data_scrollview.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this._data_scrollview.getComponent(ListView).notifyDataSetChanged(dataList);
    }

    /**
     * name
     */
    public bindcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) {
            node.getComponent(JackfruitCurrentTimeItem).setdata(info.data, this._buyinLimit_txt.node.x);
        } else if (info.type == 1) {
            node.getComponent(JackfruitObMan).setdata(info.data);
        } else if (info.type == 2) {
            node.getComponent(JackfruitObItem).setdata(info.data);
        }
    }


    /**
     * name
     */
    public getItemType(data, index) {
        return data.type;
    }

    public compareRecords(a: any, b: any): number {
        return b.curr_record - a.curr_record;
    }

    public addEvent() {
        this._shake_button.node.on('click', function () {
            cv.AudioMgr.playButtonSound('button_click');
            this._shakeStatus = !this._shakeStatus;
            this.setButtonStatus();
        }, this);
    }


    public isInroom(a: PlayerInfo): boolean {
        let isAInroom: boolean = false;
        for (let k = 0; k < this.pkStituation.byStanderList.length; ++k) {
            if (a.playerId == this.pkStituation.byStanderList[k]) {
                isAInroom = true;
            }
        }
        return isAInroom;
    }

    public setButtonStatus() {
        if (this._shakeStatus) {
            this._shakeOn_img.node.active = this._shakeStatus;
            this._shakeOff_img.node.active = !this._shakeStatus;
        }
        else {
            this._shakeOn_img.node.active = this._shakeStatus;
            this._shakeOff_img.node.active = !this._shakeStatus;
        }
    }

    public adaptiveExpand(): void {
        cv.viewAdaptive.adaptiveIPhoneX(this._curentTime_panel, true);
    }
}