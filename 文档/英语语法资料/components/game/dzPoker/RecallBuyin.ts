import cv from "../dzPoker/../../lobby/cv"
import GameDataManager from "./data/GameDataManager";
import { GameMain } from "./GameMain"
const { ccclass, property } = cc._decorator;

@ccclass
export default class RecallBuyin extends cc.Component {

    @property(cc.Node) _recallBuyin_panel: cc.Node = null;
    @property(cc.Node) _recallBuyin_modal_panel: cc.Node = null;
    @property(cc.Node) _bg: cc.Node = null;

    @property(cc.Label) recallBuyinTitle: cc.Label = null;
    @property(cc.Label) recallBuyinDetail: cc.Label = null;
    @property(cc.Label) totalRecallBuyin: cc.Label = null;
    @property(cc.Label) totalRecallNum: cc.Label = null;

    @property(cc.Button) recall_button: cc.Button = null;

    @property(cc.Label) retainMin1: cc.Label = null;
    @property(cc.Label) retainMin2: cc.Label = null;

    @property(cc.Label) recallMin1: cc.Label = null;
    @property(cc.Label) recallMin2: cc.Label = null;

    @property(cc.Label) canReall: cc.Label = null;

    @property(cc.Sprite) progress: cc.Sprite = null;

    @property(cc.Label) curMoney: cc.Label = null;

    @property(cc.Label) drawback_hold_times_text: cc.Label = null;

    @property(cc.Label) drawback_times_text: cc.Label = null;

    @property(cc.Label) recallMin_text: cc.Label = null;

    @property(cc.Label) recallMax_text: cc.Label = null;

    @property(cc.Sprite) _modelbg: cc.Sprite = null;

    @property(cc.Slider) _slider: cc.Slider = null;


    _recallAmount: number[] = [];
    private gameMain: any;
    _width: number = 716;

    onLoad() {
        cc.find("bg/recall_button", this.node).on('click', this.onRecall, this);

        cc.find("bg/recall_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("GameScene_recallBuyIn_panel_recall_button");

        this._recallBuyin_panel = cc.find("recallBuyIn_panel", this.node);
        this._modelbg = cc.find("recallBuyIn_modal_panel/background", this.node).getComponent(cc.Sprite);

        let myself = this.node;

        this._modelbg.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            myself.active = false;
        }).bind(this);

        this._bg = cc.find("bg", this.node);
        this._bg.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
        }, this);

        this.recallBuyinTitle = cc.find("bg/recallBuyinTitile_txt", this.node).getComponent(cc.Label);
        this.recallBuyinDetail = cc.find("bg/recallBuyinDetail_txt", this.node).getComponent(cc.Label);

        this.totalRecallBuyin = cc.find("bg/totalRecallBuyin_txt", this.node).getComponent(cc.Label);
        this.totalRecallNum = cc.find("bg/totalRecallNum_text", this.node).getComponent(cc.Label);
        this.recall_button = cc.find("bg/recall_button", this.node).getComponent(cc.Button);

        this.retainMin1 = cc.find("bg/retainMin_txt", this.node).getComponent(cc.Label);
        this.retainMin2 = cc.find("bg/retainMin_txt_2", this.node).getComponent(cc.Label);

        this.recallMin1 = cc.find("bg/recallMin_txt", this.node).getComponent(cc.Label);
        this.recallMin2 = cc.find("bg/recallMin_txt_2", this.node).getComponent(cc.Label);

        this.canReall = cc.find("bg/canReall_txt", this.node).getComponent(cc.Label);

        this.curMoney = cc.find("bg/curMoney_text", this.node).getComponent(cc.Label);
        this.recallMin_text = cc.find("bg/recallMin_text", this.node).getComponent(cc.Label);
        this.recallMax_text = cc.find("bg/recallMax_text", this.node).getComponent(cc.Label);

        this.drawback_hold_times_text = cc.find("bg/Image_4_0/drawback_hold_times_text", this.node).getComponent(cc.Label);
        this.drawback_times_text = cc.find("bg/Image_4_0_0/drawback_times_text", this.node).getComponent(cc.Label);


        this.recallMin1.string = cv.config.getStringData("GameScene_recallBuyIn_panel_recallMin_txt");
        this.recallMin2.string = cv.config.getStringData("GameScene_recallBuyIn_panel_recallMin_txt_2");

        this.retainMin1.string = cv.config.getStringData("GameScene_recallBuyIn_panel_retainMin_txt");
        this.retainMin2.string = cv.config.getStringData("GameScene_recallBuyIn_panel_retainMin_txt_2");

        this.totalRecallBuyin.string = cv.config.getStringData("GameScene_recallBuyIn_panel_totalRecallBuyin_txt");
        this.canReall.string = cv.config.getStringData("GameScene_recallBuyIn_panel_canReall_txt");
        this.recallBuyinDetail.string = cv.config.getStringData("GameScene_recallBuyIn_panel_recallBuyinDetail_txt");
        this.recallBuyinTitle.string = cv.config.getStringData("GameScene_recallBuyIn_panel_recallBuyinTitile_txt");

        this._slider = cc.find("bg/reCallchouMa_slider", this.node).getComponent(cc.Slider);
        if (this._slider == null || this.progress == null) {
            return;
        }
    }
    /**
     * 设置比例
     */
    public updateHoldTimes() {
        let holdTimes = cv.StringTools.formatC("%.1f", GameDataManager.tRoomData.pkRoomParam.drawback_hold_times / 10);
        let holdTimes2 = cv.StringTools.formatC("%.1f", GameDataManager.tRoomData.pkRoomParam.drawback_hold_times / 10.0);
        this.drawback_hold_times_text.string = cv.StringTools.cutZero(holdTimes);
        console.log("============holdTimes:" + holdTimes + "    holdTimes2:" + holdTimes2);
        let Times = cv.StringTools.formatC("%.1f", GameDataManager.tRoomData.pkRoomParam.drawback_times / 10);
        this.drawback_times_text.string = cv.StringTools.cutZero(Times);
    }
    public calculate() {
        var blindNum;
        var minSignNum;
        if (GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            blindNum = GameDataManager.tRoomData.pkRoomParam.rule_blind_enum;
            minSignNum = cv.config.getStringData("UIBuyInScore" + (blindNum - 1));
        }
        else if (GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            blindNum = cv.StringTools.clientGoldByServer(GameDataManager.tRoomData.pkRoomParam.rule_ante_amount);
            minSignNum = blindNum * 100;
        }

        var minNum = GameDataManager.tRoomData.pkRoomParam.rule_buyin_min_enum / 100.0;//最小带入倍数
        var isopenRecall: boolean = GameDataManager.tRoomData.pkRoomParam.is_opened_drawback;
        var isrecalTimes = GameDataManager.tRoomData.pkRoomParam.drawback_times / 10.0;
        var recalHoldTimes = GameDataManager.tRoomData.pkRoomParam.drawback_hold_times / 10.0;

        var minAmount = minSignNum * minNum;//最小带入数额
        var holdAmount = minAmount * recalHoldTimes;//撤码必须保留的基数
        var stepNum = minAmount * isrecalTimes;//撤码单元

        let aaaa = this.gameMain.getSeatBySeatViewId(0);
        let aaj = this.gameMain.getSeatBySeatViewId(0).getMoney();
        let bb = GameDataManager.tRoomData.u32Buyin;
        let maxNum = this.gameMain.getSeatBySeatViewId(0).getMoney() - holdAmount;
        maxNum = maxNum >= stepNum ? maxNum : 0;

        let maxPercent = maxNum / stepNum;
        this._recallAmount = [];
        for (let i = 0; i <= maxPercent; i++) {
            this._recallAmount.push(i * stepNum);
        }

        if (maxNum == 0) {
            this.curMoney.string = "0";
            this.recallMin_text.string = "0";
            this.recallMax_text.string = "0";
        }
        else {
            this.recallMin_text.string = cv.StringTools.formatC("%d", 0);
            let acc = this._recallAmount[this._recallAmount.length - 1];
            this.recallMax_text.string = cv.StringTools.formatC("%d", cv.StringTools.numberToShowNumber(this._recallAmount[this._recallAmount.length - 1]));

            let percent = this._slider.progress;
            let max = cv.StringTools.showStringToNumber(this.recallMax_text.string);
            if (max == 0) return;
            if (this._recallAmount.length == 0) return;

            var a;
            if (this._recallAmount.length == 1) {
                percent = percent == 100 ? 95 : percent;
                a = 100;
            }
            else {
                a = 100.0 / (this._recallAmount.length - 1);
            }
            let tempValue = Math.floor(percent * 100 / a);
            this.curMoney.string = cv.StringTools.formatC("%d", cv.StringTools.numberToShowNumber(this._recallAmount[(tempValue)]));
        }
        this.totalRecallNum.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().m_totalBuyOut);

        this.progress.node.width = this._width * this._slider.progress;

        this._slider.node.on('slide', function (event) {
            this.progress.node.width = this._slider.progress * this._width;
            let max = cv.StringTools.showStringToNumber(this.recallMax_text.string);
            let percent = this._slider.progress;
            console.log(this.progress.node.width);
            this.curMoney.node.x = -357 + this.progress.node.width;

            if (max == 0) return;
            var a;
            if (this._recallAmount.length == 1) {
                percent = percent == 100 ? 95 : percent;
                a = 100;
            }
            else {
                a = 100.0 / (this._recallAmount.length - 1);
            }
            let per = parseInt((percent * 100 / a).toString());

            if (percent == 1)
            {
                this.curMoney.string = cv.StringTools.formatC("%d", cv.StringTools.numberToShowNumber(this._recallAmount[this._recallAmount.length-1]));
            }
            else
            {
                this.curMoney.string = cv.StringTools.formatC("%d", cv.StringTools.numberToShowNumber(this._recallAmount[per]));
            }
        }, this);
    }

    public setGameMain(gamemain: any) {
        this.gameMain = gamemain;
    }

    onRecall() {
        cv.AudioMgr.playButtonSound('button_click');
        let curRecallNum = cv.StringTools.showStringToNumber(this.curMoney.string);
        if (curRecallNum == 0) {
            cv.TT.showMsg(cv.config.getStringData("UIToastBuyoutLimit"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }
        cv.gameNet.RequestBuyout(GameDataManager.tRoomData.u32RoomId, curRecallNum);
        this.node.active = false;
    }
}
