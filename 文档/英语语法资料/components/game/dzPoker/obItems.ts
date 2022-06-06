import { ObPlayer } from "./data/RoomData"
import cv from "./../../lobby/cv"
import { PlayerRecord } from "./data/RecordData";
import { RemarkData } from "../../../data/userData";
import { CircleSprite } from "../../../../Script/common/tools/CircleSprite";

const { ccclass, property } = cc._decorator;
@ccclass
export class ObItems extends cc.Component {
    @property((cc.Node)) headList:cc.Node [] = [];
    playerId: Number = null;
    obPlayerData: ObPlayer = null;
    playerData: ObPlayer [] = null;
    index: number = -1;

    onLoad() {
        cv.MessageCenter.register("NotDisturb", this.NotDisturb.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("NotDisturb", this.node);
    }

    onBtnHeadClick(event: cc.Event.EventCustom,params) {
        this.index = cv.Number(params);
        cv.AudioMgr.playButtonSound('button_click');
        event.stopPropagation();
        cv.GameDataManager.tRoomData.obPlayer = this.playerData[cv.Number(params)];
        cv.MessageCenter.send("showObRoleInfo");
    }

    setdata(data: ObPlayer []) {
        this.playerData = data;
        for (let index = 0; index < data.length; index++) {
            this.setheaddata(data[index],index);
        }
        //有设置数据的就显示，没有数据的隐藏
        let len = data.length;
        for (let index = 0; index < this.headList.length; index++) {
            this.headList[index].active = index < len;
            
        }
    }

    setheaddata(data: ObPlayer,index:number){
        //this.playerData = data;
        this.headList[index].getChildByName("head_block").active = false;
        this.headList[index].getChildByName("head_block").zIndex = 100;

        for (let i = 0; i < data.data.NotDisturbUids.length; i++) {
            if (cv.dataHandler.getUserData().u32Uid == data.data.NotDisturbUids[i]) {
                this.headList[index].getChildByName("head_block").active = true;
                break;
            }
        }

        if(!data.playerid){
            console.log("sss");
        }
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.playerid);
        this.headList[index].getChildByName("roleName").getComponent(cc.Label).string = data.name;
        if (rdata.sRemark.length <= 0) {
            cv.StringTools.setShrinkString(this.headList[index].getChildByName("roleName"), data.name, true);
        } else {
            cv.StringTools.setShrinkString(this.headList[index].getChildByName("roleName"), rdata.sRemark, true);
        }
        CircleSprite.cleanHeadNode(this.headList[index].getChildByName("roleImg"));
        if (data.playerid == cv.dataHandler.getUserData().u32Uid) {
            if (data.headPath.length <= 0) {
                CircleSprite.setCircleSprite(this.headList[index].getChildByName("roleImg"), cv.dataHandler.getUserData().HeadPath);
            } else {
                if (cv.dataHandler.getUserData().HeadPath.length <= 0) {
                    CircleSprite.setCircleSprite(this.headList[index].getChildByName("roleImg"), data.headPath, data.plat);
                } else {
                    CircleSprite.setCircleSprite(this.headList[index].getChildByName("roleImg"), cv.dataHandler.getUserData().HeadPath);
                }
            }
        } else {
            CircleSprite.setCircleSprite(this.headList[index].getChildByName("roleImg"), data.headPath, data.plat);
        }

        this.headList[index].getChildByName("check_img").zIndex = 100;

        if (data.isInroom) {
            this.headList[index].getChildByName("roleName").color = cc.Color.WHITE;
            this.headList[index].getChildByName("black_img").active = false;
        }
        else {
            this.headList[index].getChildByName("black_img").active = true;
            this.headList[index].getChildByName("black_img").zIndex = 100;
            this.headList[index].getChildByName("roleName").color = cc.color(80, 80, 80);
        }
    }

    public NotDisturb(msg: any) {
        if (this.index==-1) {
            return;
        }

        let  isExit = false;
        for (let i = 0; i < this.playerData.length; i++) {
            if (this.playerData[i].playerid == msg.whoId)
            {
                isExit = true;
                break;
            }
        }

        if (!isExit) {
            return;
        }

        let isNotDisturb = msg.operate == 1 ? true : false;
        if (isNotDisturb == true) {
            this.headList[this.index].getChildByName("head_block").active = true;
            cv.GameDataManager.tRoomData.obPlayer.data.NotDisturbUids.push(cv.dataHandler.getUserData().u32Uid);
        }
        else
        {
            this.headList[this.index].getChildByName("head_block").active = false;
            for (let i = 0; i <  cv.GameDataManager.tRoomData.obPlayer.data.NotDisturbUids.length; i++) {
                if (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.obPlayer.data.NotDisturbUids[i]) {
                    cv.GameDataManager.tRoomData.obPlayer.data.NotDisturbUids.splice(i, 1);
                    break;
                }
            }
        }
    }
}