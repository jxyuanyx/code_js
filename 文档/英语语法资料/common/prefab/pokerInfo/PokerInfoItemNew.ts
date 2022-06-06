import cv from "./../../../components/lobby/cv"
import { CircleSprite } from "../../tools/CircleSprite";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerInfoItem_new extends cc.Component {
    msg: any = null;
    posX: number = 0;

    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        this.posX = this.node.getChildByName("handNum_title_text").x;
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage() {

        let colon = ":";
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            colon = ":"
        }
    
        cc.find("bring_title_text", this.node).getComponent(cc.Label).string = 
                         cv.config.getStringData("PokerInfoItem_roleImg_bring_title_text") + colon;
        cc.find("handNum_title_text", this.node).getComponent(cc.Label).string = 
                         cv.config.getStringData("PokerInfoItem_roleImg_handNum_title_text") + colon;
        this.updatePos();
    }

    updatePos(): void {
        let handNum_text = cc.find("handNum_text", this.node);
        let handNum_title_text = cc.find("handNum_title_text", this.node);
        let bring_title_text = cc.find("bring_title_text", this.node);
        let bring_text = cc.find("bring_title_text/bring_text", this.node);
        this.posX = handNum_title_text.x;

        let offsetX  = 5;
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            offsetX = 20;
        }
    
        bring_text.setPosition(bring_text.x + offsetX, bring_text.y);
        
        let temp = bring_title_text.x + cv.resMgr.getLabelStringSize(bring_title_text.getComponent(cc.Label)).width + 5 + cv.resMgr.getLabelStringSize(bring_text.getComponent(cc.Label)).width + 30;

        if (temp > this.posX) {
            handNum_title_text.setPosition(temp, handNum_title_text.y);
        }
        else {
            handNum_title_text.setPosition(this.posX, handNum_title_text.y);
        }
        handNum_text.setPosition(handNum_title_text.x + cv.resMgr.getLabelStringSize(handNum_title_text.getComponent(cc.Label)).width + 5, handNum_text.y);
    }

    setData(msg: any, index: number) {
        this.initLanguage();
        this.msg = msg;
        let data: any = this.msg.buyins[index];

        let winBet_text = cc.find("winBet_text", this.node);

        let remark: string = cv.dataHandler.getUserData().getUserRemark(data.UID);

        // 优化显示名称格式(名称 + 备注)
        do {
            let bShowIDMarks: boolean = cv.StringTools.getArrayLength(this.msg.room_param.alliance_ids) == 0; // 非联盟
            bShowIDMarks = bShowIDMarks && (this.msg.room_param.CreaterId == cv.dataHandler.getUserData().u32Uid);
            bShowIDMarks = bShowIDMarks || this.isCanSeeAllianceResult(cv.dataHandler.getUserData().u32Uid);

            let str_mark: string = "";
            if (bShowIDMarks) {
                let str_space: string = (remark == "") ? "" : " ";
                str_mark = cv.StringTools.formatC("(%s%sID:%d)", remark, str_space, data.UID);
            }
            else {
                if (remark != "") {
                    str_mark = cv.StringTools.formatC("(%s)", remark);
                }
            }
            cc.find("roleName_text", this.node).getComponent(cc.Label).string = (data.Playername + str_mark);
        } while (0);

        cc.find("bring_title_text/bring_text", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(data.TotalBuyin);
        this.updatePos();
        
        winBet_text.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(data.WinBet);
        if (data.WinBet > 0) {
            winBet_text.getComponent(cc.Label).string = "+" + winBet_text.getComponent(cc.Label).string;
            winBet_text.color = cv.tools.getWinColor();
        }
        else if (data.WinBet == 0) {
            winBet_text.color = cc.Color.WHITE;
        }
        else {
            winBet_text.color = cv.tools.getLoseColor();
        }
        cc.find("handNum_text", this.node).getComponent(cc.Label).string = data.HandCount.toString();

        let headNode = cc.find("headNode/roleImg", this.node);
        (CircleSprite).cleanHeadNode(headNode);
        (CircleSprite).setCircleSprite(headNode, data.PlayerHead, data.plat);
        if (data.Playername == cv.dataHandler.getUserData().nick_name) {
   
        }
    }


    isCanSeeAllianceResult(uid: number) {
        if (cv.StringTools.getArrayLength(this.msg.clubInfos) <= 0) return false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this.msg.club_adminids); i++) {
            if (uid == this.msg.club_adminids[i]) return true;
        }
        return false;
    }
}
