import cv from "../../lobby/cv";
import {BuYinData} from "./JackfruitData";
import JackfruitManager from "./JackfruitManager";
import JackfruitBuyinExchange from "./JackfruitBuyinExchange";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JackfruitBuyin extends cc.Component {

    @property(cc.Node)
    tabButton: cc.Node[] = [];
    @property(cc.Node)
    tabNode: cc.Node[] = [];
    protected select_index: number = -1;
    color_lab_select: cc.Color = cc.color(229, 209, 146);
    color_lab_noSelect: cc.Color = cc.color(153, 153, 153);

    @property(cc.Label) gold_label: cc.Label = null;
    @property(cc.Label) score_label: cc.Label = null;
    @property(cc.RichText) des_rich_text: cc.RichText = null;
    @property(cc.RichText) text_0: cc.RichText = null;
    @property(cc.RichText) text_1: cc.RichText = null;
    // @property(cc.Node) title: cc.Node = null;
    @property(cc.Node) ok_button: cc.Node = null;
    @property(cc.Node) mode_panel: cc.Node = null;
    @property(cc.Label) ratio_label: cc.Label = null;

    onLoad () {
        cv.StringTools.setLabelString(this.ok_button, "label", "jackfruit_buyin_ok_button_label");
        // cv.resMgr.setSpriteFrame(this.title, cv.config.getLanguagePath("game/jackfruit/buyin/title"));
        this.mode_panel.on(cc.Node.EventType.TOUCH_END, this.onClose.bind(this));
        this.initTabLanguage();

        cv.MessageCenter.register("update_info", this.updateCoinAndUSDT.bind(this),this.node);
        cv.MessageCenter.register("update_gold", this.updateCoinAndUSDT.bind(this),this.node);
    }
    onDestroy() {
        cv.MessageCenter.unregister("update_info", this.node);
        cv.MessageCenter.unregister("update_gold", this.node);
    }
    updateCoinAndUSDT() {
        let userAmount = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().u32Chips);
        let str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_buyin_des_rich_text"), userAmount);
        cv.StringTools.setRichTextString(this.des_rich_text.node, str);
    }

    show(data:BuYinData)
    {
        this.node.active = true;
        let userAmount = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().u32Chips);
        let str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_buyin_des_rich_text"), userAmount);
        cv.StringTools.setRichTextString(this.des_rich_text.node, str);
        if(data.score > 0)
        {
            str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_buyin_des_rich_node_text_0"), cv.StringTools.numToFloatString(data.score));
            cv.StringTools.setRichTextString(this.text_0.node, str);
            str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_buyin_des_rich_node_text_1"), cv.StringTools.numToFloatString(data.needScore));
            cv.StringTools.setRichTextString(this.text_1.node, str);
        }
        else{
            let ruleCheckScore = JackfruitManager.tRoomData.param.ruleCheckScore;
            let ruleAddToScore = JackfruitManager.tRoomData.param.ruleAddToScore;
            str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_buyin_des_rich_node_text_2"), cv.StringTools.numToFloatString(ruleCheckScore));
            cv.StringTools.setRichTextString(this.text_0.node, str);
            str = cv.StringTools.formatC(cv.config.getStringData("jackfruit_buyin_des_rich_node_text_3"), cv.StringTools.numToFloatString(ruleAddToScore));
            cv.StringTools.setRichTextString(this.text_1.node, str);
        }

        this.score_label.string = cv.StringTools.numToFloatString(data.needScore);
        this.gold_label.string = cv.StringTools.numToFloatString(data.needAmount);

        let roomData = JackfruitManager.tRoomData.param;
        let ante = cv.StringTools.serverGoldToShowNumber(roomData.ante);
        this.ratio_label.string = "=" + ante.toString();

        this.switchTab(0);
    }

    onBtnOK()
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
        cv.jackfruitNet.requestBuyIn(cv.StringTools.showStringToNumber(this.gold_label.string));
    }

    onClose(event:cc.Event.EventTouch)
    {
        this.node.active = false;
    }


    //分页部分
    initTabLanguage() {
        this.tabButton[0].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("USDTView_bring_num_label");
        this.tabButton[1].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("USDTView_exchange_coin_label");
    }
    onTabOne() {
        cv.AudioMgr.playButtonSound('button_click');
        this.switchTab(0);
    }
    onTabTwo() {
        cv.AudioMgr.playButtonSound('button_click');
        this.switchTab(1);
    }
    switchTab(index: number) {
        if ((index != 0 && index != 1) || this.select_index == index) {
            return;
        }
        this.setBtnState(0, index == 0);
        this.setBtnState(1, index == 1);
        this.tabNode[0].active = index == 0;
        this.tabNode[1].active = index == 1;
        if (index == 1) {
            this.tabNode[1].getComponent(JackfruitBuyinExchange).show();
        }
    }
    setBtnState(index: number, enable: boolean) {
        let btn: cc.Node = this.tabButton[index];
        if (enable) {
            btn.getChildByName("Label").color = this.color_lab_select;
            btn.getChildByName("Background").active = true;
        } else {
            btn.getChildByName("Label").color = this.color_lab_noSelect;
            btn.getChildByName("Background").active = false;
        }
    }
}
