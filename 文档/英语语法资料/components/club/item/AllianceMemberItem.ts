import ws_protocol = require("../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../../Script/components/lobby/cv";
import { RemarkData } from "../../../../Script/data/userData";
import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";
import { TableView } from "../../../common/tools/TableView";

/**
 * 联盟成员项
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class AllianceMemberItem extends cc.Component {
    @property(cc.Label) txt_flag_word: cc.Label = null;
    @property(cc.Label) txt_club_name: cc.Label = null;
    @property(cc.Label) txt_club_creater: cc.Label = null;
    @property(cc.Label) txt_club_member: cc.Label = null;
    @property(cc.Label) txt_club_identify: cc.Label = null;
    @property(cc.Sprite) img_club_icon: cc.Sprite = null;
    @property(cc.Sprite) img_club_member: cc.Sprite = null;
    @property(cc.Sprite) img_club_identity: cc.Sprite = null;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
    }

    protected start(): void {

    }

    updateSVReuseData(index: number, data: world_pb.ClubItemInfo, view?: TableView): void {
        let url: string = data.club_thumb;
        CircleSprite.setCircleSprite(this.img_club_icon.node, url, 0, false, Head_Mode.CLUB);

        this.txt_flag_word.string = cv.config.getStringData("AllianceMemberItem_club_txt");
        this.txt_club_name.string = data.club_name;
        this.txt_club_member.string = cv.StringTools.formatC("%d/%d", data.club_member_count, data.club_member_max);

        // let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.creater_id);
        // let createrName = cv.String(remark.sRemark);
        // if (createrName.length <= 0) createrName = data.creater_name;
        // this.txt_club_creater.string = createrName;

        // 联盟创始人标志
        let allianceInfo: world_pb.NoticeSearchAlliance = cv.clubDataMgr.getCurSearchClubData().clubExtra.allianceInfo;
        let bAllianceCreater: boolean = data.club_id === allianceInfo.creater_club_id;
        this.img_club_identity.node.active = bAllianceCreater;
        this.txt_club_identify.node.active = bAllianceCreater;
        if (bAllianceCreater) {
            this.txt_club_identify.string = cv.config.getStringData("AllianceItem_name_text");
        }

        // 俱乐部创始人可见
        let bClubCreater: boolean = data.creater_id === cv.dataHandler.getUserData().u32Uid;
        this.txt_club_creater.node.active = bClubCreater;
        this.img_club_member.node.active = bClubCreater;
        this.txt_club_member.node.active = bClubCreater;
        if (bClubCreater) {
            this.txt_club_creater.string = cv.dataHandler.getUserData().nick_name;
        }
    }
}
