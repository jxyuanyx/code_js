import cv from "../../lobby/cv";
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");//
import game_pb = game_protocol.protocol;
const {ccclass, property} = cc._decorator;

@ccclass
export default class StarRedpacketOpenView extends cc.Component {
    @property(cc.Node) large_bg: cc.Node = null;
    @property(cc.Node) small_bg: cc.Node = null;
    @property(cc.Node) view: cc.Node = null;
    @property(cc.Label) title: cc.Label = null;
    @property(cc.Label) des: cc.Label = null;
    @property(cc.Label) des_en: cc.Label = null;
    @property(cc.Label) number: cc.Label = null;
    @property(cc.Label) ok_btn_label: cc.Label = null;
    @property(cc.Label) help_btn_label: cc.Label = null;
    @property(cc.Node) help_btn: cc.Node = null;

    onLoad ()
    {
        this._initLanguage();
    }
    
    private _initLanguage()
    {
        let isZHCN = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN;
        this.des.node.active = isZHCN;
        this.des_en.node.active = !isZHCN;
        this.title.fontSize = isZHCN ? 42 : 36;
        let desLabel = isZHCN ? this.des : this.des_en;
        desLabel.string = cv.config.getStringData("StarRedpacketOpenView_des");
        this.title.string = cv.config.getStringData("StarRedpacketOpenView_title");
        this.ok_btn_label.string = cv.config.getStringData("Confirm");
        this.help_btn_label.string = cv.config.getStringData("StarRedpacketOpenView_help_btn_label");
    }

    showView(msg:game_pb.LuckStarSeatDrawResultNotice)
    {
        this.number.string = cv.StringTools.serverGoldToShowString(msg.amount);
        this.large_bg.active = msg.is_help_wrap;
        this.small_bg.active = !msg.is_help_wrap;
        let bg = msg.is_help_wrap ? this.large_bg : this.small_bg;
        this.help_btn.active = msg.is_help_wrap;
        this.node.active = true;
        
        let action = this.node.getComponent(cc.Animation);
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                let action1 = cc.find("action_bg_node_02", bg).getComponent(cc.Animation);
                action1.play("hongbao1");
            }, this)
        }
        action.play("hongbao");
    }

    hideView()
    {
        this.node.active = false;
    }

    onOkBtn()
    {
        cv.AudioMgr.playButtonSound('back_button');
        this.hideView();
    }

    onHelpBtn()
    {
        cv.AudioMgr.playButtonSound('button_click');
        cv.TP.showMsg(cv.config.getStringData("Exit_confirmation"), cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.dataHandler.getUserData().is_goto_myredpacket = true;
            cv.MessageCenter.send("Exit_click");
        });
    }
}
