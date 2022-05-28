import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class GuessHandCard extends cc.Component {

    @property(cc.Button) guess_button_1: cc.Button = null;
    @property(cc.Button) guess_button_2: cc.Button = null;
    @property(cc.Button) close_button: cc.Button = null;
    @property(cc.Button) guess_update_button: cc.Button = null;
    @property(cc.Button) continue_button: cc.Button = null;
    public _bet_seqno: number = 0;

    onLoad() {
        cv.MessageCenter.register("guess_set_bet_opt", this.onGuessSetBetOpt.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("guess_set_bet_opt", this.node);
    }

    public setGuessBeginBet(msg: game_pb.NoticeGuessBeginBet) {
        let guess_panel = this.node.getChildByName("guess_panel");
        let continue_panel = this.node.getChildByName("continue_panel");
        guess_panel.active = true;
        continue_panel.active = false;
        this.setGuessRichText();
        let number_label_1 = this.guess_button_1.node.getChildByName("number_label");
        number_label_1.getComponent(cc.Label).string = cv.StringTools.numToFloatString(msg.betamout_opt[0]);
        let number_label_2 = this.guess_button_2.node.getChildByName("number_label");
        number_label_2.getComponent(cc.Label).string = cv.StringTools.numToFloatString(msg.betamout_opt[1]);

        this._bet_seqno = msg.bet_seqno;
    }

    public setGuessBetRsp(msg: game_pb.GuessBetRsp) {
        let guess_panel = this.node.getChildByName("guess_panel");
        let continue_panel = this.node.getChildByName("continue_panel");
        guess_panel.active = false;
        continue_panel.active = true;

        let guessTypeStr = cv.StringTools.formatC(cv.config.getStringData("UIGuessType" + msg.odds.option));
        let oddsStr = cv.StringTools.clientGoldByServer(msg.odds.odds_percent).toString();
        let amount = cv.StringTools.numToFloatString(msg.amount);
        let continue_richText: cc.RichText = continue_panel.getChildByName("continue_richText").getComponent(cc.RichText);
        cv.StringTools.setRichTextString(continue_richText.node, cv.StringTools.formatC(cv.config.getStringData("GameScene_gameMain_panel_guess_hand_card_continue_panel_continue_richText"),
            guessTypeStr, oddsStr, amount));

        let hook = this.continue_button.node.getChildByName("hook");
        hook.active = msg.repeat;

        continue_richText.fontSize = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? 28 : 25;
    }

    public onGuessButton(pSender: any, index: number) {
        let guess_panel = this.node.getChildByName("guess_panel");
        let amount: number = cv.StringTools.showStringToNumber(guess_panel.getChildByName(cv.StringTools.formatC("guess_button_%d", index)).getChildByName("number_label").getComponent(cc.Label).string);
        let option_index: number = cv.Number(cv.tools.GetStringByCCFile("guess_option_index"));

        let curGameID = cv.roomManager.getCurrentGameID()
        if(curGameID == cv.Enum.GameId.Allin)
        {
            if (cv.aofNet.RequestGuessBet(cv.GameDataManager.tRoomData.guess_odds_list[option_index].option, amount, this._bet_seqno)) 
            {
                this.node.active = false;
            }
        }else
        {
            if (cv.gameNet.RequestGuessBet(cv.GameDataManager.tRoomData.guess_odds_list[option_index].option, amount, this._bet_seqno)) 
            {
                this.node.active = false;
            }
        }
    }

    private onGuessCloseButton(pSender: any) {
        cv.MessageCenter.send("guess_close_button");
        let curGameID = cv.roomManager.getCurrentGameID()
        if(curGameID == cv.Enum.GameId.Allin)
        {
            cv.aofNet.RequestUploadGuessState();
        }else
        {
            cv.gameNet.RequestUploadGuessState();
        }
    }

    public onGuessUpdateButton(pSender: any) {
        let index: number = cv.Number(cv.tools.GetStringByCCFile("guess_option_index"));
        index++;
        if (index >= cv.GameDataManager.tRoomData.guess_odds_list.length) {
            index = 0;
        }
        cv.tools.SaveStringByCCFile("guess_option_index", String(index));
        this.setGuessRichText();
    }

    public onGuessContinueButton(pSender: any) {
        let hook = this.continue_button.node.getChildByName("hook");
        let curGameID = cv.roomManager.getCurrentGameID()
        if(curGameID == cv.Enum.GameId.Allin)
        {
            cv.aofNet.RequestGuessSetBetOpt(!hook.active);
        }else
        {
            cv.gameNet.RequestGuessSetBetOpt(!hook.active);
        }
    }

    public setGuessRichText() {
        let guess_panel = this.node.getChildByName("guess_panel");
        let index: number = cv.Number(cv.tools.GetStringByCCFile("guess_option_index"));
        let data = cv.GameDataManager.tRoomData.guess_odds_list[index];
        let guessTypeStr = cv.StringTools.formatC(cv.config.getStringData("UIGuessType" + data.option));
        let oddsStr = cv.StringTools.clientGoldByServer(data.odds_percent).toString();
        let guess_richText: cc.RichText = guess_panel.getChildByName("guess_richText").getComponent(cc.RichText);
        cv.StringTools.setRichTextString(guess_richText.node, cv.StringTools.formatC(cv.config.getStringData("GameScene_gameMain_panel_guess_hand_card_guess_panel_guess_richText"),
            guessTypeStr, oddsStr));
        //guess_richText.fontSize = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? 30 :26;
    }

    public onGuessSetBetOpt(ishook: boolean) {
        let hook = this.continue_button.node.getChildByName("hook");
        hook.active = ishook;
        if (ishook) {
            cv.TP.showMsg(cv.config.getStringData("UIGuessMsg"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
        }
    }
}
