import { ObPlayer } from "./data/RoomData"
import cv from "./../../lobby/cv"
import { PlayerRecord } from "./data/RecordData";
import { RemarkData } from "../../../data/userData";
import { CircleSprite } from "../../../../Script/common/tools/CircleSprite";

const { ccclass, property } = cc._decorator;
@ccclass
export class ObItem extends cc.Component {
    @property({
        type: cc.Label,
        "tooltip": "名字"
    })
    roleName: cc.Label = null;

    @property({
        type: cc.Sprite,
        "tooltip": "角色图片"
    })
    roleImg: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "角色背景"
    })
    black_img: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "勾选"
    })
    check_img: cc.Sprite = null;

    @property({
        type: cc.Button,
        "tooltip": "点击头像"
    })
    head_btn: cc.Button = null;

    playerId: Number = null;
    obPlayerData: ObPlayer = null;
    isInAudit: Boolean = false;
    playerData: PlayerRecord = null;

    onBtnHeadClick(event: cc.Event.EventCustom) {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.isInAudit) {
            this.check_img.node.active = !this.check_img.node.active;
            return;
        }
        event.stopPropagation();
        cv.GameDataManager.tRoomData.obPlayer = this.obPlayerData;
        cv.MessageCenter.send("showObRoleInfo");
    }

    setData(data: PlayerRecord) {

        this.isInAudit = true;
        this.playerData = data;
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.nPlayerID);
        if (rdata.sRemark.length <= 0) {
            cv.StringTools.setShrinkString(this.roleName.node, data.sPlayerName, true);
        } else {
            cv.StringTools.setShrinkString(this.roleName.node, rdata.sRemark, true);
        }

        if (data.nPlayerID == cv.dataHandler.getUserData().u32Uid) {
            if (data.sPlayerHead.length <= 0) {
                CircleSprite.setCircleSprite(this.roleImg.node, cv.dataHandler.getUserData().HeadPath);
            } else {
                if (cv.dataHandler.getUserData().HeadPath.length <= 0) {
                    CircleSprite.setCircleSprite(this.roleImg.node, data.sPlayerHead, data.plat);
                } else {
                    CircleSprite.setCircleSprite(this.roleImg.node, cv.dataHandler.getUserData().HeadPath);
                }
            }
        } else {
            CircleSprite.setCircleSprite(this.roleImg.node, data.sPlayerHead, data.plat);
        }

        this.check_img.node.zIndex = 100;
    }

    headIsSelect(): Boolean {
        return this.check_img.node.active;
    }
}