import cv from "../../../../Script/components/lobby/cv";
import { ClubData } from "../../../../Script/data/club/ClubData";

const { ccclass, property } = cc._decorator;
@ccclass
export class InvitationItem extends cc.Component {
    @property(cc.Label) txt_club_name: cc.Label = null;
    @property(cc.Label) txt_invitation_code: cc.Label = null;
    @property(cc.Node) img_arrow: cc.Node = null;
    @property(cc.Node) img_stick: cc.Node = null;

    private _clubData: ClubData = null;

    protected onLoad(): void {
        this.node.on("click", this._onClick, this);
    }

    protected start(): void {

    }

    private _onClick(event: cc.Event.EventCustom): void {
        cv.AudioMgr.playButtonSound('tab');
        cv.MessageCenter.send("on_click_club_invitation_item", this._clubData);
    }

    public setItemShow(state) {
        this.txt_club_name.node.active = state;
        this.txt_invitation_code.node.active = state;
        this.img_arrow.active = state;
        //  this.img_stick.active = state;
    }

    setData(data: ClubData): void {
        this._clubData = data;
        this.setItemShow(true);
        this.txt_club_name.string = cv.String(this._clubData.club.club_name);
        this.txt_club_name.node.setContentSize(this.txt_club_name.node.width, this.txt_club_name.actualFontSize);

        if (data.club.club_owner == cv.dataHandler.getUserData().u32Uid) {
            this.txt_invitation_code.string = cv.String(this._clubData.club.invitation_code);
        }
        else {
            this.txt_invitation_code.string = cv.String(this._clubData.club.InvitationMemberCode);
        }
    }

    updateSVReuseData(index: number, dataArray: any[]): void {
        if (index < 0 || index >= dataArray.length) return;

        this.setData(dataArray[index]);
    }
}
