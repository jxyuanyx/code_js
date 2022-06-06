import ws_protocol = require("../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../../Script/components/lobby/cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import { TagCom } from "../../../common/tools/TagCom";

const { ccclass, property } = cc._decorator;
@ccclass
export class AllianceItem extends cc.Component {
    @property(cc.Label) txt_name: cc.Label = null;
    @property(cc.Label) txt_member: cc.Label = null;
    @property(cc.Label) txt_creater: cc.Label = null;

    @property(cc.Sprite) img_member: cc.Sprite = null
    @property(cc.Sprite) img_creater: cc.Sprite = null;
    @property(cc.Sprite) img_audit: cc.Sprite = null;
    
    @property(cc.Label) wait_label: cc.Label = null;
    @property(cc.Label) wait_time_label: cc.Label = null;
    @property(cc.Button) cancel_button: cc.Button = null;

    private _data: world_pb.AllianceListParams = world_pb.AllianceListParams.create();
    private clubID: number = 0;
    private time:number = 0;

    protected onLoad(): void {
        this.node.on("click", this._onClick, this);
    }

    protected start(): void {

    }

    // 更新滚动视图复用数据
    updateSVReuseData(index: number, dataArray: any[], sv:ScrollViewReuse): void {
        if (index < 0 || index >= dataArray.length) return;
        let data = dataArray[index];
        this._data = data;
        this.clubID = data.myClubID;

        this.txt_name.string = cv.String(data.alliance_name);
        this.txt_member.string = cv.StringTools.formatC("%d/%d", data.club_count, data.club_max);
        this.txt_creater.string = cv.config.getStringData("AllianceItem_name_text");
        this.wait_label.string = cv.config.getStringData("AllianceItem_wait_label");
        this.cancel_button.node.getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("AllianceItem_cancel_button_label");

        this.img_member.node.active = data.is_creater;
        this.txt_member.node.active = data.is_creater;
        this.img_creater.node.active = data.is_creater;
        this.txt_creater.node.active = data.is_creater;
        
        this.img_audit.node.active = data.reviewed === 0 && data.is_creater;
        this.wait_label.node.active = data.reviewed === 0 && !data.is_creater;
        this.wait_time_label.node.active = data.reviewed === 0 && !data.is_creater;
        this.cancel_button.node.active = data.reviewed === 0 && !data.is_creater;
        if(data.reviewed === 0)
        {
            if(!data.is_creater && data.expire_left_time > 0)
            {
                console.log(index + " this.time = " +this.time);
                
                this.time = data.expire_left_time;
                this.showTime(this.time);
                this.unschedule(this.updateTime);
                this.schedule(this.updateTime, 0);
            }
        }
    }

    onDestroy()
    {
        this.unschedule(this.updateTime);
    }

    private _onClick(event: cc.Event.EventCustom): void {
        if (!this._data) return;
        if (this._data.reviewed === 0) {
            if(this._data.is_creater)
            {
                cv.TT.showMsg(cv.config.getStringData("AllianceUI29"), cv.Enum.ToastType.ToastTypeInfo);
            }
        }
        else {
            cv.worldNet.requestSearchAllianceInfo(this._data.alliance_id);
        }
    }

    private updateTime()
    {
        this.time -= cc.director.getDeltaTime();
        this.showTime(this.time);
    }

    private showTime(time: number)
    {
        if(time >= 0)
        {
            time = Math.ceil(time)
            var h = Math.floor(time / 3600);
            var m = Math.floor((time / 60 % 60));
            var s = Math.floor((time % 60));
            this.wait_time_label.string = this.getTime(h) + ":" + this.getTime(m) + ":" + this.getTime(s)
        }else
        {
            this.unschedule(this.updateTime);
        }
    }

    private getTime(num: number) :string
    {
        if (num > 9)
        {
            return num.toString();
        }
        else
        {
            return "0" + num;
        }
    }

    private onBtnCancel(target: cc.Node)
    {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._data.reviewed === 0) {
            if(!this._data.is_creater)
            {
                cv.worldNet.RequestJoinAllianceUserCancel(this._data.alliance_id, this.clubID);
            }
        }
    }
}
