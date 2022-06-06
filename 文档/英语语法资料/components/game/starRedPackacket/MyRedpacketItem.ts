import cv from "../../lobby/cv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MyRedpacketItem extends cc.Component {
    @property(cc.Node) bg: cc.Node = null;
    @property(cc.Node) openClick: cc.Node = null;
    @property(cc.Label) title: cc.Label = null;
    @property(cc.Label) label: cc.Label = null;
    @property(cc.Node) icon: cc.Node = null;
    @property(cc.Label) number: cc.Label = null;
    @property(cc.Label) number_des: cc.Label = null;
    @property(cc.Label) time_label: cc.Label = null;

    _data:any = null;

    onLoad()
    {
        this.label.string = cv.config.getStringData("StarRedpacketOpenView_help_btn_label");
        this.number_des.string = cv.config.getStringData("unit");
    }

    updateItemData(data:any)
    {
        if(this.title) {
            this.title.string = cv.config.getStringData("MyRedpacketItem_title_" + data.state);
        }

        this.openClick.active = data.state == 0;
        this.label.node.active = data.state == 0;
        this.icon.active = data.state == 0;
        this.bg.active = data.state == 1;
        this.number.string = cv.StringTools.serverGoldToShowString(data.amount);
        this.time_label.string = cv.StringTools.formatTime(data.draw_time, cv.Enum.eTimeType.Year_Month_Day_Hour_Min);

        if(data.state == 0) {
            this.number.node.color = cc.color(80, 66, 38);
            this.number_des.node.color = cc.color(80, 66, 38);
            this.time_label.node.color = cc.color(90, 76, 48);
        } else {
            this.number.node.color = cc.color(255, 189, 101);
            this.number_des.node.color = cc.color(255, 189, 101);
            this.time_label.node.color = cc.color(171, 171, 171);
        }
    }

    onBtnClick()
    {
        cv.AudioMgr.playButtonSound('button_click');
        cv.TP.showMsg(cv.config.getStringData("Exit_confirmation"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.dataHandler.getUserData().is_goto_myredpacket = true;
            cv.MessageCenter.send("Exit_click");
        });
    }
}
