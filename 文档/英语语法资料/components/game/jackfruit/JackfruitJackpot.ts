import ListView from "../../../common/tools/ListView";
import cv from "../../lobby/cv";
import JackfruitManager from "./JackfruitManager";
import { JackfruitJackpotRecordItem } from "./JackfruitJackpotRecordItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JackfruitJackpot extends cc.Component {
    @property(cc.Node)jackpot_button: cc.Node = null;
    @property(cc.Node)reward_button: cc.Node = null;
    @property(cc.Node)jackpot_panel: cc.Node = null;
    @property(cc.Node)reward_panel: cc.Node = null;

    @property(cc.Label)jackpot_num_title: cc.Label = null;
    @property(cc.Label)jackpot_num_label: cc.Label = null;
    @property(cc.Label)jackpot_des_title: cc.Label = null;
    @property(cc.Label)jackpot_des_label: cc.Label = null;
    @property(cc.Node)card_panels: cc.Node[] = [];

    @property(cc.Label)jackPotInfo_text: cc.Label = null;
    @property(cc.Label)bigWinnerName_text: cc.Label = null;
    @property(cc.Label)bigWinnerCard_type_text: cc.Label = null;
    @property(cc.Label)bigWinnerNumber_text: cc.Label = null;
    @property(cc.Label)bigWinnerTime_text: cc.Label = null;
    @property(cc.Label)reward_des_title: cc.Label = null;
    @property(cc.ScrollView)scrollView: cc.ScrollView = null;

    public _viewType:number = 0;
    dataList = [];

    onLoad () {
        cv.MessageCenter.register("updata_jackpotdata", this.updateJackpotPanel.bind(this), this.node);
        cv.MessageCenter.register("updata_jackpotReward", this.updateRewardPanel.bind(this), this.node);

        this._initLanguage();
        this.setViewType(0);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister("updata_jackpotdata", this.node);
        cv.MessageCenter.unregister("updata_jackpotReward", this.node);
    }

    private _initLanguage()
    {
        cv.StringTools.setLabelString(this.jackpot_panel, "jackpot_cardtype_label", "GameJackPot_jackPot_panel_awardType_txt");
        cv.StringTools.setLabelString(this.jackpot_panel, "jackpot_proportion_label", "GameJackPot_jackPot_panel_awardPercent_txt");
        cv.StringTools.setLabelString(this.jackpot_panel, "card_panel_0/cardtype_label", "M_UITitle122");
        cv.StringTools.setLabelString(this.jackpot_panel, "card_panel_1/cardtype_label", "M_UITitle121");
        cv.StringTools.setLabelString(this.jackpot_panel, "card_panel_2/cardtype_label", "M_UITitle120");
        cv.StringTools.setLabelString(this.reward_button, "label", "GameJackPot_button_panel_jackpotRecord_button");
		cv.StringTools.setLabelString(this.jackpot_button, "label", "GameJackPot_button_panel_jackpot_button");
        cv.StringTools.setLabelString(this.reward_panel, "big_winner_panel/jackPotInfo_text", "GameJackPot_jackPotSign_panel_Panel_5_jackPotInfo_text");
        
        let ante = cv.StringTools.numToFloatString(JackfruitManager.tRoomData.param.ante);
        this.jackpot_num_title.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotBlindAwardAmount"), ante.toString());
        this.jackpot_des_title.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotRecordAwardSet"), ante.toString());
        this.reward_des_title.string = cv.StringTools.formatC(cv.config.getStringData("jackfruit_Jackpot_reward_des_title"), ante.toString());
    }

    public onBtnSelect(event, type:string)
    {
        if(this._viewType == cv.Number(type))return
        cv.AudioMgr.playButtonSound('tab');
        this.setViewType(cv.Number(type));
    }

    public onBtnClose(event)
    {
        this.node.active = false;
    }

    private _setBtnSelect(isSelect: boolean, btn: cc.Node)
    {
        cc.find("select_img", btn).active = isSelect;
        // cc.find("noselect_img", btn).active = !isSelect;
        cc.find("label", btn).color = isSelect ? new cc.Color().fromHEX("2C2C39") : new cc.Color().fromHEX("898A8A");
        cc.find("label", btn).getComponent(cc.Label).enableBold = isSelect ? true : false;
    }

    private _setCardProportion(index: number, num: number)
    {
        let label =cc.find("proportion_label", this.card_panels[index]).getComponent(cc.Label);
        label.string = num.toString() + "%";

        let gress: cc.Sprite = cc.find("bar", this.card_panels[index]).getComponent(cc.Sprite);
        gress.fillRange = -1 * num * 0.01;
    }

    private _getAmounts(amount:number)
    {
        let amounts = amount.toString();
        let len = Math.abs(7 - amounts.length)
        for (let i = 0; i < len; i++) {
            if(amounts.length < 7)
            {
                amounts = "0" + amounts;
            }else if(amounts.length > 7)
            {
                amounts = amounts.substr(1, amounts.length - i - 1);
            }
        }
        return amounts;
    }

    public setViewType(viewType:number)
    {
        this._viewType = viewType;
        this._setBtnSelect(this._viewType == 0, this.jackpot_button);
        this._setBtnSelect(this._viewType == 1, this.reward_button);
        this.jackpot_panel.active = this._viewType == 0;
        this.reward_panel.active = this._viewType == 1;
        if(this._viewType == 0)
        {
            this.updateJackpotPanel();
        }else
        {
            this.updateRewardPanel();

            this.scrollView.getComponent(ListView).init(this.bindrecordcallfunc.bind(this), this.getItemType.bind(this));
            this.scrollView.getComponent(ListView).notifyDataSetChanged(this.dataList);
        }
    }

    public updateJackpotPanel()
    {
        let data = JackfruitManager.tRoomData.jackpotDataInfo;
        this._setCardProportion(0, cv.StringTools.div(data.huangTongPer, 100));
        this._setCardProportion(1, cv.StringTools.div(data.tongHuaShunPer, 100));
        this._setCardProportion(2, cv.StringTools.div(data.siTiaoPer, 100));

        let num = JackfruitManager.tRoomData.jackpotLeftAmount;
        let amount = Math.round(cv.StringTools.serverGoldToShowNumber(num));
        this.jackpot_num_label.string = this._getAmounts(amount);
        
        let boundaryScore = cv.StringTools.numToFloatString(data.boundaryScore);
        let contrScore = cv.StringTools.numToFloatString(data.contrScore);
        this.jackpot_des_label.string = cv.StringTools.formatC(cv.config.getStringData("jackfruit_JackpotDetail"), boundaryScore, contrScore, contrScore);
    }

    public updateRewardPanel()
    {
		// this.scrollView.content.removeAllChildren()
		let jackpotRecords = JackfruitManager.tRoomData.JackpotRecords;
        // if(jackpotRecords.length <= 0) return;
        
        let luckyOne = JackfruitManager.tRoomData.luckyOne;
        let amount = cv.StringTools.numToFloatString(luckyOne.awardAmount);
        this.jackPotInfo_text.node.active = false;
        //this.jackPotInfo_text.node.color = cc.color(255, 203, 38);
        //this.jackPotInfo_text.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotPlayerAwardAmount"), luckyOne.playerName, amount);
        // this.bigWinnerName_text.string = luckyOne.playerName;
        cv.StringTools.setShrinkString(this.bigWinnerName_text.node, luckyOne.playerName, true);
        this.bigWinnerCard_type_text.string = cv.config.getStringData(`M_UITitle${112 + luckyOne.level}`);
        this.bigWinnerNumber_text.string = amount;
        this.bigWinnerName_text.node.enableBold = true;
        this.bigWinnerCard_type_text.enableBold = true;
        this.bigWinnerNumber_text.enableBold = true;
        this.bigWinnerTime_text.string = luckyOne.awardTime == 0 ? "" : cv.StringTools.formatTime(luckyOne.awardTime, cv.Enum.eTimeType.Month_Day, false);
        
        this.dataList = [];
        for (let idx in jackpotRecords) {
            this.dataList.push({ type: 0, data: jackpotRecords[idx] });
        }
    }

    public bindrecordcallfunc(node: cc.Node, info, i) {
        node.getComponent(JackfruitJackpotRecordItem).setdata(info.data);
    }
    
    public getItemType(data, index) {
        return data.type;
    }
}
