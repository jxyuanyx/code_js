import cv from "./../../../components/lobby/cv"
import { CircleSprite } from "../../tools/CircleSprite";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerInfoItem extends cc.Component {
    msg: any = null;
    posX: number = 0;

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        this.posX = this.node.getChildByName("handNum_title_text").x;
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage() {
        cv.StringTools.setLabelString(this.node, "bring_title_text", "PokerInfoItem_roleImg_bring_title_text");
        cv.StringTools.setLabelString(this.node, "handNum_title_text", "PokerInfoItem_roleImg_handNum_title_text");
        this.updatePos();
    }

    updatePos(): void {
        let handNum_text = cc.find("handNum_text", this.node);
        let handNum_title_text = cc.find("handNum_title_text", this.node);
        let bring_text = cc.find("bring_text", this.node);
        let temp = bring_text.x + cv.resMgr.getLabelStringSize(bring_text.getComponent(cc.Label)).width + 20;
        if (temp > this.posX) {
            handNum_title_text.setPosition(temp, handNum_title_text.y);
        }
        else {
            handNum_title_text.setPosition(this.posX, handNum_title_text.y);
        }
        handNum_text.setPosition(handNum_title_text.x + cv.resMgr.getLabelStringSize(handNum_title_text.getComponent(cc.Label)).width + 30, handNum_text.y);
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

        cc.find("bring_text", this.node).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(data.TotalBuyin);
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

        (CircleSprite).setCircleSprite(cc.find("headIcon/roleImg", this.node), data.PlayerHead, data.plat);

        //m_pRoleHead -> UpdateSpriteFromUrl(data.PlayerHead);

        if (data.Playername == cv.dataHandler.getUserData().nick_name) {
            // if (data.PlayerHead == "") {
            //     m_pRoleHead -> UpdateSpriteFromPath(g_pkDataManager -> getUser() -> HeadPath);
            // }
            // else {
            //     if (SEStrcmp(g_pkDataManager -> getUser() -> HeadPath.c_str(), "res/common/Head_01.png") == 0) {
            //         m_pRoleHead -> UpdateSpriteFromUrl(data.PlayerHead);
            //     }
            //     else {
            //         m_pRoleHead -> UpdateSpriteFromPath(g_pkDataManager -> getUser() -> HeadPath);
            //     }
            // }
        }
        else {
            // m_pRoleHead -> UpdateSpriteFromUrl(data.PlayerHead);
        }
        cc.find("bg", this.node).active = (data.UID == cv.dataHandler.getUserData().u32Uid);
    }


    isCanSeeAllianceResult(uid: number) {
        if (cv.StringTools.getArrayLength(this.msg.clubInfos) <= 0) return false;
        for (let i = 0; i < cv.StringTools.getArrayLength(this.msg.club_adminids); i++) {
            if (uid == this.msg.club_adminids[i]) return true;
        }
        return false;
    }
}
