import ws_protocol = require("../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../../Script/components/lobby/cv";
import { ControlSwitch } from "../../lobby/controlSwitch/ControlSwitch";

import { CircleSprite, Head_Mode } from "../../../../Script/common/tools/CircleSprite";
import { RemarkData } from "../../../../Script/data/userData";
import { ClubMember } from "../ClubMember";

/**
 * 俱乐部成员项
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ClubMemberItem extends cc.Component {
    @property(cc.Label) txt_member_name: cc.Label = null;
    @property(cc.Label) txt_member_id: cc.Label = null;
    @property(cc.Label) txt_identity_word: cc.Label = null;
    @property(cc.Label) txt_power_word: cc.Label = null;
    @property(cc.Sprite) img_icon: cc.Sprite = null;
    @property(cc.Sprite) img_flag: cc.Sprite = null;
    @property(cc.Sprite) img_identity: cc.Sprite = null;
    @property(cc.Sprite) img_member_id: cc.Sprite = null;
    @property(cc.Button) cs_power:cc.Button = null;

    private _data: world_pb.ClubMemberSnapshot = world_pb.ClubMemberSnapshot.create();

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.cs_power.node.on("click", this._onSwitchClick, this);
    }

    protected start(): void {
        // this.cs_power.enabledAuto = false;
        // this.cs_power.enabledAction = true;
    }

    private _onSwitchClick(ctl: ControlSwitch): void {
        let strTips: string = cv.StringTools.formatC("UImodiftyMember%d", this._data.member_auth);
        strTips = cv.config.getStringData(strTips);
        cv.TP.showMsg(strTips, cv.Enum.ButtonStyle.TWO_BUTTON, () => {
            cv.clubDataMgr.setClickManger(true);
            // 点击确认
            cv.worldNet.requestModifyClubMember(this._data.member_uid, this._data.member_auth);
        }, () => {
            // 点击取消
        });
    }

    updateSVReuseData(index: number, dataArray: any[]): void {
        if (index < 0 || index >= dataArray.length) return;
        let data: world_pb.ClubMemberSnapshot = dataArray[index];
        this._data = data;

        CircleSprite.setCircleSprite(this.img_icon.node, cv.String(data.member_icon), 0, false, Head_Mode.CLUB);
        let bActive: boolean = data.member_auth === 1 || data.member_auth === 2;
        this.img_flag.node.active = data.member_auth === 2;
        this.img_identity.node.active = bActive;
        switch (data.member_auth) {
            // 管理员
            case 1: {
                // cv.resMgr.setSpriteFrame(this.img_flag.node, "zh_CN/club/club_icon_admin01");
                cv.resMgr.setSpriteFrame(this.img_identity.node, "zh_CN/club/club_icon_admin02");
                this.txt_identity_word.string = cv.config.getStringData("ClubItem_identify_0_text");
            } break;

            // 创始人
            case 2: {
                cv.resMgr.setSpriteFrame(this.img_flag.node, "zh_CN/club/club_icon_creator01");
                cv.resMgr.setSpriteFrame(this.img_identity.node, "zh_CN/club/club_icon_creator02");
                this.txt_identity_word.string = cv.config.getStringData("ClubIntroduce_scrollView_button_0_creater_txt");
            } break;

            default: break;
        }

        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.member_uid);
        let name: string = remark.sRemark.length <= 0 ? data.member_name : remark.sRemark;
        this.txt_member_name.string = name;
        this.txt_member_id.string = "ID:"+cv.String(data.member_uid);
        this.img_member_id.node.setContentSize(cv.resMgr.getLabelStringSize(this.txt_member_id).width + 30, this.img_member_id.node.height);

        // 若开启管理员模式
        let bManageMode: boolean = ClubMember.getManageMode();
        this.txt_power_word.node.active = bManageMode;
        this.cs_power.node.active = bManageMode;
        if (bManageMode) {
            if (data.member_auth === 1) {
                this.txt_power_word.string = cv.config.getStringData("UIClubModifyMemberNormal");
                this._setVOiceBtn(false);
            }
            else if (data.member_auth === 2) {
                this.txt_power_word.node.active = false;
                this.cs_power.node.active = false;
            }
            else {
                this.txt_power_word.string = cv.config.getStringData("UIClubModifyMemberManger");
                // this.cs_power.switchOn = false;
                this._setVOiceBtn(true);
            }
        }

        // 是否在线(头像变灰)
        let csp: cc.Node = CircleSprite.getHeadNode(this.img_icon.node);
        if (csp) {
            let color: cc.Color = cc.Color.WHITE;
            if (!data.is_online) {
                color = cc.color(96, 96, 96);
            }
            csp.color = color;
        }
    }

    private _setVOiceBtn(status: boolean){
        if(status == true){
            cv.resMgr.setSpriteFrame(this.cs_power.node, "zh_CN/hall/selfView/voice_off");
        }else{
            cv.resMgr.setSpriteFrame(this.cs_power.node, "zh_CN/hall/selfView/voice_on");
        }

    }
}
