import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../lobby/cv";
import { ObPlayer, PlayerInfo } from "./data/RoomData"
import GameDataManager from "./data/GameDataManager";
import ListView from "../../../common/tools/ListView";
import { CurrentTimeItem } from "./CurrentTimeItem";
import { ObItems } from "./obItems";
import { obManNumber } from "./obManNumber";
import { headInfo } from "../../../common/tools/ResourceManager";

const { ccclass, property } = cc._decorator;
@ccclass
export class CurrentTime extends cc.Component {
    @property(cc.Node) _curentTime_panel: cc.Node = null;
    @property(cc.Label) _title_text: cc.Label = null;
    @property(cc.Label) _blind_text: cc.Label = null;
    @property(cc.Label) _lastTime_txt: cc.Label = null;
    @property(cc.Label) _lastTime_text: cc.Label = null;
    @property(cc.Label) _roleName_txt: cc.Label = null;
    @property(cc.Label) _insuran_text: cc.Label = null;
    @property(cc.Label) _insuranword_text: cc.Label = null;
    @property(cc.Label) _buyinLimit_txt: cc.Label = null;
    @property(cc.Label) _buyout_txt: cc.Label = null;
    @property(cc.Label) _buyin_txt: cc.Label = null;

    @property(cc.ScrollView) _data_scrollview: cc.ScrollView = null;
    @property(cc.ScrollView) _data_win_scrollview: cc.ScrollView = null;

    @property(cc.Label) _jackpotword_text: cc.Label = null;
    @property(cc.Label) _jackpot_text: cc.Label = null;
    @property(cc.Label) _handcount_text: cc.Label = null;
    @property(cc.Sprite) _shakeOn_img: cc.Sprite = null;
    @property(cc.Sprite) _shakeOff_img: cc.Sprite = null;
    @property(cc.Sprite) _voiceOn_img: cc.Sprite = null;
    @property(cc.Sprite) _voiceOff_img: cc.Sprite = null;

    @property(cc.Integer) _lastTime: number = null;
    @property(cc.Button) _voice_button: cc.Button = null;
    @property(cc.Button) _shake_button: cc.Button = null;
    @property(cc.Boolean) _voiceStatus: boolean = true;
    @property(cc.Boolean) _shakeStatus: boolean = true;

    @property(cc.Node) _obMain_panel: cc.Node = null;
    @property(cc.Label) _obWord_text: cc.Label = null;
    @property(cc.Node) _ob_bg: cc.Sprite = null;
    @property(cc.Label) _obNumber_text: cc.Label = null;
    @property(cc.Node) _panel_1: cc.Node = null;

    @property(cc.Label)  _txtShowCtrl: cc.Label = null;  //只显示桌面玩家
    @property(cc.Node)  _spCtrlOn: cc.Node = null;  //选择是
    @property(cc.Node)  _spCtrlOff: cc.Node = null;  //选择否

    pkStituation: any = null;

    private dataListWinAll = []; //输赢列表数据
    private dataListWinDesktop = []; //输赢列表数据 (仅仅桌上玩家)

    onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.registerMsg();

        this._curentTime_panel = cc.find("curentTime_panel", this.node);
        this._title_text = cc.find("curentTime_panel/title_text", this.node).getComponent(cc.Label);
        this._blind_text = cc.find("curentTime_panel/blind_text", this.node).getComponent(cc.Label);
        this._lastTime_txt = cc.find("curentTime_panel/lastTime_txt", this.node).getComponent(cc.Label);
        this._lastTime_text = cc.find("curentTime_panel/lastTime_text", this.node).getComponent(cc.Label);
        //保险jackpot
        this._insuran_text = cc.find("curentTime_panel/Panel_1/insuran_text", this.node).getComponent(cc.Label);
        this._insuranword_text = cc.find("curentTime_panel/Panel_1/insuranword_text", this.node).getComponent(cc.Label);
        this._jackpotword_text = cc.find("curentTime_panel/Panel_1/jackpotWord_text", this.node).getComponent(cc.Label);
        this._jackpot_text = cc.find("curentTime_panel/Panel_1/jackpot_text", this.node).getComponent(cc.Label);
        //代入标题
        this._roleName_txt = cc.find("curentTime_panel/name_buyin_score_bg/roleName_txt", this.node).getComponent(cc.Label);
        this._buyinLimit_txt = cc.find("curentTime_panel/name_buyin_score_bg/buyinLimit_txt", this.node).getComponent(cc.Label);
        this._handcount_text = cc.find("curentTime_panel/name_buyin_score_bg/handcount_text", this.node).getComponent(cc.Label);
        this._buyin_txt = cc.find("curentTime_panel/name_buyin_score_bg/buyin_txt", this.node).getComponent(cc.Label);

        this._buyout_txt = cc.find("curentTime_panel/buyout_txt", this.node).getComponent(cc.Label);
        //输赢列表
        this._data_win_scrollview = cc.find("curentTime_panel/data_win_ScrollView", this.node).getComponent(cc.ScrollView);
        //围观列表
        this._data_scrollview = cc.find("curentTime_panel/data_ScrollView", this.node).getComponent(cc.ScrollView);

        //只显示桌面玩家
        this._txtShowCtrl  = cc.find("curentTime_panel/txtShowCtrl", this.node).getComponent(cc.Label);
        this._spCtrlOn  = cc.find("curentTime_panel/btnShowCtrl/spOn", this.node);
        this._spCtrlOff = cc.find("curentTime_panel/btnShowCtrl/spOff", this.node);

      

        this._voice_button = cc.find("set_panel/voice_button", this.node).getComponent(cc.Button);
        this._shake_button = cc.find("set_panel/shake_button", this.node).getComponent(cc.Button);
        this._voiceOn_img = cc.find("set_panel/voice_img/voiceOn_img", this.node).getComponent(cc.Sprite);
        this._voiceOff_img = cc.find("set_panel/voice_img/voiceOff_img", this.node).getComponent(cc.Sprite);
        this._shakeOn_img = cc.find("set_panel/shake_img/shakeOn_img", this.node).getComponent(cc.Sprite);
        this._shakeOff_img = cc.find("set_panel/shake_img/shakeOff_img", this.node).getComponent(cc.Sprite);

        this._panel_1 = cc.find("curentTime_panel/Panel_1", this.node);
        this._panel_1.active = false;
        let bg = cc.find("curentTime_panel/name_buyin_score_bg", this.node);
        bg.active = false;

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
            this._shakeStatus = false;
        } else {
            this._shakeStatus = true;
        }

        let bShow = (cv.tools.GetStringByCCFile("CURRENTSHOWCTRL") == "TRUE");
        this._spCtrlOn.active = bShow;
        this._spCtrlOff.active = !bShow;

        //this.addEvent();
        //this.setButtonStatus();
        this.initLanguage();

        if (cv.native.isFullScreen()) {
            this._curentTime_panel.getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        }
        cv.resMgr.adaptWidget(this.node, true);
    }

    initLanguage() {
        this._title_text.string = cv.config.getStringData("curentTime_curentTime_panel_title_text");
        this._lastTime_txt.string = cv.config.getStringData("curentTime_curentTime_panel_lastTime_txt");
        this._insuranword_text.string = cv.config.getStringData("curentTime_curentTime_panel_insuranword_text");
        this._jackpotword_text.string = cv.config.getStringData("curentTime_curentTime_panel_jackpotWord_text");
        this._roleName_txt.string = cv.config.getStringData("curentTime_curentTime_panel_roleName_txt");
        this._buyinLimit_txt.string = cv.config.getStringData("curentTime_curentTime_panel_buyinLimit_txt");
        this._buyout_txt.string = cv.config.getStringData("curentTime_curentTime_panel_buyout_title");
        this._buyin_txt.string = cv.config.getStringData("curentTime_curentTime_panel_buyin_txt");
        this._handcount_text.string = cv.config.getStringData("curentTime_curentTime_panel_shouNum_text");
        this._txtShowCtrl.string = cv.config.getStringData("CurrentTime_ctrl_tips");

        cv.StringTools.setLabelString(this.node, "set_panel/shake_img/shake_txt", "curentTime_curentTime_panel_shake_txt");
        cv.StringTools.setLabelString(this.node, "set_panel/voice_img/voice_txt", "curentTime_curentTime_panel_voice_txt");

    }

    public outRegion() {
        this.node.active = false;
    }

    public inRegion() {

    }

    public onRoomSituation(msg: any) {
        this.pkStituation = msg;
        let insurance_winbet = Number(msg.insurance_winbet);
        let jackpot_winbet = Number(msg.jackpot_winbet);

        let isZoom = cv.GameDataManager.tRoomData.isZoom();
        this.checkZoom(isZoom);
        this.showHandCount(isZoom);

        this._blind_text.string = cc.director.getScene().getChildByName("Scene").getChildByName("gameMain_panel").getComponent("GameMain").getBlind();

        for (let i = 0; i < msg.buyin_player_list.length; ++i) {// 买入列表
            let kPlayer: game_pb.PlayerBuyinInfo = msg.buyin_player_list[i];
            if (kPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                cv.GameDataManager.tRoomData.isBuyin = true;
                cv.MessageCenter.send("onSetShowAuditState", true);
                break;
            }
        }

        for (let i = 0; i < msg.check_out_list.length; i++) //结帐离桌的玩家
        {
            if (msg.check_out_list[i] == cv.dataHandler.getUserData().u32Uid) {
                cv.GameDataManager.tRoomData.isBuyin = false;
                cv.MessageCenter.send("onSetShowAuditState", true);
                break;
            }
        }

        if (insurance_winbet > 0) {
            this._insuran_text.string = "+" + cv.StringTools.serverGoldToShowString(insurance_winbet);
            this._insuran_text.node.color = cv.tools.getWinColor();
        }
        else if (insurance_winbet == 0) {
            this._insuran_text.string = cv.StringTools.serverGoldToShowString(insurance_winbet);
        }
        else {
            this._insuran_text.string = cv.StringTools.serverGoldToShowString(insurance_winbet);//"-" + 
            this._insuran_text.node.color = cv.tools.getLoseColor();
        }

        if (jackpot_winbet > 0) {
            this._jackpot_text.string = "+" + cv.StringTools.clientGoldByServer(jackpot_winbet);
            this._jackpot_text.node.color = cv.tools.getWinColor();
        }
        else if (jackpot_winbet == 0) {
            this._jackpot_text.string = cv.StringTools.clientGoldByServer(jackpot_winbet).toString();
            this._jackpot_text.node.color = cc.Color.WHITE;
        }
        else {
            this._jackpot_text.string = cv.StringTools.clientGoldByServer(jackpot_winbet).toString();
            this._jackpot_text.node.color = cv.tools.getLoseColor();
        }

        var kRecords: Array<game_pb.PlayerBuyinInfo> = [];
        for (let i = 0; i < msg.buyin_player_list.length; ++i) {
            let kPlayer: game_pb.PlayerBuyinInfo = msg.buyin_player_list[i];
            kRecords.push(kPlayer);
        }

        //let onlineNum = 0;
        var kObservers: Array<ObPlayer> = [];
        
        let headNames:headInfo [] = [];
        for (let i = 0; i < msg.observer_list.length; ++i) {//
            let kPlayer: PlayerInfo = msg.observer_list[i];
            let obPlayer: ObPlayer = new ObPlayer;
            obPlayer.name = kPlayer.name;
            obPlayer.playerid = kPlayer.playerid;
            obPlayer.marks = kPlayer.marks;
            obPlayer.isInroom = kPlayer.is_online;
            obPlayer.data = kPlayer;
            obPlayer.headPath = kPlayer.headurl;
            obPlayer.plat = kPlayer.plat;
            obPlayer.is_online = kPlayer.is_online;
            obPlayer.user_join_room_time = kPlayer.user_join_room_time;
            kObservers.push(obPlayer);
            let info:headInfo  = new headInfo();
            info.url = kPlayer.headurl;
            info.plat = kPlayer.plat
            info.isOB = true;
            headNames.push(info);
        }
        //记录头像资源,释放资源
        cv.resMgr.addRemoteHeadInfo(headNames, true);
        cv.resMgr.releaseRemoteHeadsRes();


        this.dataListWinAll = []; //输赢列表数据
        this.dataListWinDesktop = []; //输赢列表数据 (仅仅桌上玩家)
        let dataList = [];

        kRecords.sort(this.compareRecords);
        for (let index = 0; index < kRecords.length; index++) {
            this.dataListWinAll.push({ type: 0, data: kRecords[index] });

            let playerid =  kRecords[index].playerid
            let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(playerid);
            if(player != null){ //当前桌上玩家
                this.dataListWinDesktop.push({ type: 0, data: kRecords[index] });
            }

        }
        //急速不需要这个observer_info字段 默认0值
        if (msg.observer_info != null) {
            dataList.push({ type: 1, data: { onlineNum: msg.observer_info.online_count, totalNum: msg.observer_info.total_count } });
        }
        else
        {
            dataList.push({ type: 1, data: { onlineNum: 0, totalNum: 0 } });
        }

        //旁观头像
        let line = 0;//行数
        let lineNum = 4;//每一行4个
        for (let index = 0; index < kObservers.length;) {
            let obdata = [];
            for (let i = 0; i < lineNum; i++) {
                let curindex = i + line*lineNum;
                if(curindex < kObservers.length){
                    obdata.push(kObservers[curindex]);
                    index++
                }else{
                    break;
                }
            }
            dataList.push({ type: 2, data: obdata });
            line++;
        }

        if (msg.observer_info != null && msg.observer_info.total_count > 40) {
            dataList.push({ type: 3, data: {} });
        }

        
        this.onStartGame();
        this._lastTime = msg.left_time;
        this.updateTime();
        this.schedule(this.Update, 1);

        this.updateViewByJackpot();

        //输赢列表
        this._data_win_scrollview.getComponent(ListView).init(this.bindcallfuncWin.bind(this), this.getItemTypeWin.bind(this));
        let bShowDesktop = (cv.tools.GetStringByCCFile("CURRENTSHOWCTRL") == "TRUE"); //是否只显示是桌面玩家
        if(bShowDesktop){
            this._data_win_scrollview.getComponent(ListView).notifyDataSetChanged(this.dataListWinDesktop);
        }else{
            this._data_win_scrollview.getComponent(ListView).notifyDataSetChanged(this.dataListWinAll);
        }
        
        //围观列表
        this._data_scrollview.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this._data_scrollview.getComponent(ListView).notifyDataSetChanged(dataList);
    }

 

    /**
     * name  输赢列表回调
     */
    public bindcallfuncWin(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) { //输赢列表Item
            node.getComponent(CurrentTimeItem).setdata(info.data, this._buyinLimit_txt.node.x, this._handcount_text.node.x);
        } 
    }


    /**
     * name
     */
    public getItemTypeWin(data, index) {
        return data.type;
    }

    /**
     * name 旁观列表回调
     */
    public bindcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 1) {  //旁观人数
            node.getComponent(obManNumber).setdata(info.data);  
        } else if (info.type == 2) {  //旁观头像
            node.getComponent(ObItems).setdata(info.data);
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

    //只显示桌面玩家
    onShowListCtrl(){
        cv.AudioMgr.playButtonSound('button_click');
        if(this._spCtrlOn.active == true){
            //当前切换到关闭
            this._spCtrlOn.active = false;
            this._spCtrlOff.active = true;
            cv.tools.SaveStringByCCFile("CURRENTSHOWCTRL", "FALSE");
            this._data_win_scrollview.getComponent(ListView).notifyDataSetChanged(this.dataListWinAll);
        }else{
            //切换到显示
            this._spCtrlOn.active = true;
            this._spCtrlOff.active = false;
            cv.tools.SaveStringByCCFile("CURRENTSHOWCTRL", "TRUE");
            this._data_win_scrollview.getComponent(ListView).notifyDataSetChanged(this.dataListWinDesktop);
        }       
    }


    public updateTopsLabel() {
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
            this._jackpotword_text.node.active = false;
            this._jackpot_text.node.active = false;

            this._insuran_text.node.active = false;
            this._insuranword_text.node.active = false;

            this._buyout_txt.node.active = true;
        }
        else {
            this._buyout_txt.node.active = false;
            if (!cv.GameDataManager.tRoomData.isZoom()) {
                this._buyinLimit_txt.node.setPosition(cc.v2(400, this._buyinLimit_txt.node.y));
            }

            let isShort = cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short;
            let bMirco: boolean = cv.GameDataManager.tRoomData.pkRoomParam.is_mirco === 1;
            let bg = cc.find("curentTime_panel/name_buyin_score_bg", this.node);
            bg.active = true;
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet
                || cv.GameDataManager.tRoomData.isZoom()
                || isShort
                || bMirco
                || cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand) {
                this._panel_1.active = false;
                      
                let offsetH = (this._panel_1.height - bg.height)/2;
                let offsetY = this._panel_1.y - bg.y + offsetH;

                bg.setPosition(bg.x, this._panel_1.y + offsetH);

                this._data_win_scrollview.node.height += offsetY;
                this._data_win_scrollview.node.setPosition(this._data_win_scrollview.node.x, bg.y - bg.height/2 - this._data_win_scrollview.node.height/2);
                this._data_win_scrollview.node.getChildByName("view").height = this._data_win_scrollview.node.height;
                this._data_win_scrollview.node.getChildByName("view").y = 0;
            }else{
                this._panel_1.active = true;
            }
        }
    }

    public updateViewByJackpot() {
        if (cv.GameDataManager.tRoomData.pkRoomParam.is_associated_jackpot && cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId) {
            this._jackpotword_text.node.active = true;
            this._jackpot_text.node.active = true;

            this._insuran_text.node.setPosition(this._insuran_text.node.getPosition().x, 27);
            this._insuranword_text.node.setPosition(this._insuranword_text.node.getPosition().x, 25);

            this._jackpotword_text.node.setPosition(this._jackpotword_text.node.getPosition().x, -23);
            this._jackpot_text.node.setPosition(this._jackpot_text.node.getPosition().x, -23);
        }
        else {
            this._jackpotword_text.node.active = false;
            this._jackpot_text.node.active = false;

            this._insuran_text.node.setPosition(this._insuran_text.node.getPosition().x, 0);
            this._insuranword_text.node.setPosition(this._insuranword_text.node.getPosition().x, 0);
        }
        this.updateTopsLabel();
    }

    public Update(f32Delta: number) {
        //if (GameDataManager.tRoomData.u32StartTime == 0) return;
        if (this._lastTime <= 0) {
            this._lastTime_text.string = cv.config.getStringData("UITimeHasAlready");

            let isShow = false;
            let isShort = (GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
            if (!cv.GameDataManager.tRoomData.isZoom()
                && GameDataManager.tRoomData.pkRoomParam.is_mirco != 1
                && GameDataManager.tRoomData.u32GameID != cv.Enum.GameId.Bet
                && !isShort
                && !cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand) {
                isShow = true;
            }

            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                this._lastTime_text.node.setPosition(this._lastTime_text.node.getContentSize().width + this._lastTime_txt.node.getPosition().x + 10, this._lastTime_text.node.getPosition().y);
            }
            else {
                this._lastTime_text.node.setPosition(this._lastTime_txt.node.getPosition().x, this._lastTime_text.node.getPosition().y);
            }

            this._lastTime_text.node.active = isShow;

            this.unschedule(this.Update);
            return;
        }

        if (this._lastTime == 600 || this._lastTime == 60) {
            let min = this._lastTime / 60;
            cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIGameWillBeOver"), min), cv.Enum.ToastType.ToastTypeInfo);
        }

        this._lastTime -= 1;
        this.updateTime();
    }

    public updateTime() {
        //if (GameDataManager.tRoomData.u32StartTime == 0) return;
        this._lastTime_text.string = cv.StringTools.countTime(this._lastTime, cv.Enum.eTimeType.Hour_Min_Sec);
        this._lastTime_text.node.setPosition(this._lastTime_txt.node.getContentSize().width + this._lastTime_txt.node.getPosition().x + 10, this._lastTime_text.node.y);

        let isShow = false;
        let isShort = (GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
        if (!cv.GameDataManager.tRoomData.isZoom()
            && GameDataManager.tRoomData.pkRoomParam.is_mirco != 1
            && GameDataManager.tRoomData.u32GameID != cv.Enum.GameId.Bet
            && !isShort
            && !cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand) {
            isShow = true;
        }
        this._lastTime_txt.node.active = isShow;
        this._lastTime_text.node.active = isShow;
    }

    public addEvent() {
        this._voice_button.node.on('click', function () {
            this._voiceStatus = !this._voiceStatus;
            this.setButtonStatus();
        }, this);

        this._shake_button.node.on('click', function () {
            this._shakeStatus = !this._shakeStatus;
            this.setButtonStatus();
        }, this);
    }

    public onStartGame() {
        // if (GameDataManager.tRoomData.u32StartTime != 0) {

        // }
        // else {
        //     this._lastTime_text.string = cv.config.getStringData("UIhasNotStart");
        // }

        let isShow = false;
        let isShort = (GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
        if (!cv.GameDataManager.tRoomData.isZoom()
            && GameDataManager.tRoomData.pkRoomParam.is_mirco != 1
            && GameDataManager.tRoomData.u32GameID != cv.Enum.GameId.Bet
            && !isShort
            && !cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand) {
            isShow = true;
        }

        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this._lastTime_text.node.setPosition(this._lastTime_txt.node.getContentSize().width + this._lastTime_txt.node.getPosition().x + 10, this._lastTime_text.node.getPosition().y);
            this._lastTime_txt.node.active = isShow;
        }
        else {
            this._lastTime_text.node.setPosition(this._lastTime_txt.node.getPosition().x - 20, this._lastTime_text.node.getPosition().y);
            this._lastTime_txt.node.active = false;
        }

        this._lastTime_text.node.active = isShow;

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
            this._lastTime_text.node.active = false;
            this._lastTime_txt.node.active = false;
            this._lastTime_text.node.active = false;
            //GameDataManager.tRoomData.u32StartTime = 0;
        }
    }

    public setButtonStatus() {
        //cv.AudioMgr.playButtonSound('tab');
        if (this._voiceStatus) {
            this._voiceOn_img.node.active = this._voiceStatus;
            this._voiceOff_img.node.active = !this._voiceStatus;
        }
        else {
            this._voiceOn_img.node.active = this._voiceStatus;
            this._voiceOff_img.node.active = !this._voiceStatus;
        }

        if (this._shakeStatus) {
            this._shakeOn_img.node.active = this._shakeStatus;
            this._shakeOff_img.node.active = !this._shakeStatus;
        }
        else {
            this._shakeOn_img.node.active = this._shakeStatus;
            this._shakeOff_img.node.active = !this._shakeStatus;
        }
    }

    public checkZoom(isZoom: boolean) {
        //this._obMain_panel.active = !isZoom;
    }

    public adaptiveExpand(): void {
        cv.viewAdaptive.adaptiveIPhoneX(this._curentTime_panel, true);
    }

    public showHandCount(isShow: boolean) {
        this._handcount_text.node.active = isShow;
        let tempWidth = this._buyin_txt.node.x - this._roleName_txt.node.x - this._buyin_txt.node.getContentSize().width - this._roleName_txt.node.getContentSize().width - this._buyinLimit_txt.node.getContentSize().width - this._handcount_text.node.getContentSize().width;
        this._handcount_text.node.setPosition(cc.v2(tempWidth / 3 + this._buyinLimit_txt.node.x + this._handcount_text.node.getContentSize().width / 2 + this._buyinLimit_txt.node.getContentSize().width / 2, this._buyinLimit_txt.node.y));

        if (isShow) {
            this._buyinLimit_txt.node.setPosition(cc.v2(tempWidth / 3 + this._roleName_txt.node.x + this._roleName_txt.node.getContentSize().width + this._buyinLimit_txt.node.getContentSize().width / 2, this._buyinLimit_txt.node.y));
            this._handcount_text.node.setPosition(cc.v2(tempWidth / 3 + this._buyinLimit_txt.node.x + this._handcount_text.node.getContentSize().width / 2 + this._buyinLimit_txt.node.getContentSize().width / 2, this._buyinLimit_txt.node.y));

        } else {
            tempWidth = this._buyin_txt.node.x - this._roleName_txt.node.x - this._buyin_txt.node.getContentSize().width - this._roleName_txt.node.getContentSize().width - this._buyinLimit_txt.node.getContentSize().width - this._buyout_txt.node.getContentSize().width;
            //this._buyinLimit_txt.node.x = tempWidth/2 + this._roleName_txt.node.x;
            this._buyinLimit_txt.node.setPosition(cc.v2(tempWidth / 3 + this._roleName_txt.node.x + this._roleName_txt.node.getContentSize().width + this._buyinLimit_txt.node.getContentSize().width / 2, this._buyinLimit_txt.node.y));
            this._buyout_txt.node.setPosition(cc.v2(tempWidth / 3 + this._buyinLimit_txt.node.x + this._buyout_txt.node.getContentSize().width / 2 + this._buyinLimit_txt.node.getContentSize().width / 2, this._buyinLimit_txt.node.y));
        }
    }

    public registerMsg() {
        cv.MessageCenter.register("on_room_situation", this.onRoomSituation.bind(this), this.node);
        cv.MessageCenter.register("StartGame", this.onStartGame.bind(this), this.node);
    };

    private unregisterMsg() {
        cv.MessageCenter.unregister("on_room_situation", this.node);
        cv.MessageCenter.unregister("StartGame", this.node);
    };

    onDestroy() {
        this.unregisterMsg();
    };
}