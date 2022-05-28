import cv from "../../lobby/cv";
import { RemarkData } from "../../../data/userData";
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import { PlayerInfo } from "./data/RoomData";
import GameDataManager from "./data/GameDataManager";
const { ccclass, property } = cc._decorator;
@ccclass
export class CurrentTimeItem extends cc.Component {
    @property({
        type: cc.Label,
        "tooltip": "名字"
    })
    yourname: cc.Label = null;

    @property({
        type: cc.Label,
        "tooltip": "带入"
    })
    dairu: cc.Label = null;

    @property({
        type: cc.Label,
        "tooltip": "分数"
    })
    score: cc.Label = null;
    
    @property({
        type: cc.Label,
        "tooltip": "撤回"
    })
    buyout: cc.Label = null;

    @property({
        type: cc.Label,
        "tooltip": "手数"
    })
    handCount: cc.Label = null;


    @property({
        type: cc.Layout,
        "tooltip": "背景"
    })
    layout: cc.Layout = null;

    @property({
        type: cc.Sprite,
        "tooltip": "颜色"
    })
    sprite_color: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "icon star 1"
    })
    icon_star1: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "icon star 2"
    })
    icon_star2: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        "tooltip": "icon jp"
    })
    icon_jp: cc.Sprite = null;

    public setControlPos(newPosX1: number, newPosX2: number)
    {
        if (cv.roomManager.checkGameIsZoom(cv.roomManager.getCurrentGameID())) {
            this.dairu.node.setPosition(newPosX1, this.dairu.node.getPosition().y);
            this.handCount.node.setPosition(newPosX2, this.handCount.node.getPosition().y);
        }
    }

    setdata(data: game_pb.PlayerBuyinInfo, pos1: number, pos2: number){
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(data.playerid);
        let kName = rdata.sRemark != null && rdata.sRemark.length != 0 ? rdata.sRemark : data.playername;

        this.dairu.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.total_buyin));  //带入
        this.dairu.node.setPosition(pos1, this.dairu.node.getPosition().y);
        this.buyout.node.setPosition(pos2, this.buyout.node.getPosition().y);

        if (cv.roomManager.checkGameIsZoom(cv.roomManager.getCurrentGameID()))  //急速房间
        {
            let _handCount: number = data.HandCount || 0;   //手数
            this.handCount.string = _handCount.toString();
            // if (cv.StringTools.getStrLen(kName) >6)  {
            //     kName =  kName.substr(0,5) + "..";
            // }

        }
        else {
            this.handCount.node.active = false;
        }

        this.yourname.node.width = 200;
        let width = cv.StringTools.setShrinkString(this.yourname.node, kName);
        if (data.jpHit) {
            this.icon_jp.node.active = true;
            this.icon_jp.node.setPosition(this.yourname.node.getPosition().x + width + 5, this.icon_jp.node.getPosition().y);
        }
        else
        {
            this.icon_jp.node.active = false;
        }
        this.buyout.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.total_buyout));  //撤回

        if (data.curr_record > 0) {
            this.score.string = "+" + cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.curr_record));
        }
        else {
            this.score.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.curr_record));
        }
        //用户身份
        let isSuperstar = data.Identity == 1? true : false;
        let player: PlayerInfo = GameDataManager.tRoomData.GetTablePlayer(data.playerid);
        this.icon_star1.node.active = (isSuperstar && player != null)? true : false;
        this.icon_star2.node.active = (isSuperstar && player == null)? true : false;
        if (player == null) {
            if (isSuperstar) {
                this.yourname.node.color = new cc.Color(125, 108, 81);
                this.dairu.node.color = new cc.Color(125, 108, 81);
                this.score.node.color = new cc.Color(125, 108, 81);
                this.buyout.node.color = new cc.Color(125, 108, 81);
            } else {
                this.yourname.node.color = new cc.Color(110, 110, 110);
                this.dairu.node.color = new cc.Color(110, 110, 110);
                this.score.node.color = new cc.Color(110, 110, 110);
                this.buyout.node.color = new cc.Color(110, 110, 110);
            }
        }
        else {
            if (isSuperstar) {
                this.yourname.node.color = new cc.Color(255,216,155);
                this.dairu.node.color = new cc.Color(255,216,155);
                this.score.node.color = new cc.Color(255,216,155);
                this.buyout.node.color = new cc.Color(255,216,155);
            } else {
                this.yourname.node.color = cc.Color.WHITE;
                this.dairu.node.color = cc.Color.WHITE;
                this.score.node.color = cc.Color.WHITE;
                this.buyout.node.color = cc.Color.WHITE;
            }
        }

        if (data.playerid == cv.dataHandler.getUserData().u32Uid) {
            this.showLight();
        }
        else {
            this.hideLight();
        }

        this.setControlPos(pos1, pos2);
    }
    public showLight()
    {
        this.yourname.node.setContentSize(cc.size(164, 45));
        this.yourname.node.color = cc.Color.WHITE;
        this.dairu.node.color = cc.Color.WHITE;
        this.score.node.color = cc.Color.WHITE;
        this.buyout.node.color = cc.Color.WHITE;
        this.handCount.node.color = cc.Color.WHITE;
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin){

            this.buyout.node.active = true;
            this.handCount.node.active = false;
            // this.dairu.node.setPosition(cc.v2(300,this.dairu.node.y))
            // this.buyout.node.setPosition(cc.v2(500,this.dairu.node.y))
        }
        else if(cv.roomManager.checkGameIsZoom(cv.roomManager.getCurrentGameID())){  //急速，显示手数
            this.handCount.node.active = true;
            this.buyout.node.active = false;
        }
        else{
            this.buyout.node.active = false;
            this.dairu.node.setPosition(cc.v2(400,this.dairu.node.y))
        }
        
        //this.layout.getComponent(cc.Layout).type = 1;
        //this.layout.getComponent(cc.Layout).type = cc.Layout.Type.GRID;
        //this.layout.getComponent(cc.Layout).node.color = new cc.Color(49, 143, 236);
        //this.layout.getComponent(cc.Layout).node.opacity = 150;
        this.sprite_color.node.active = true;
        //暂时没有背景接口
        //this.layout.node.opacity = 150;
    }

    public hideLight()
    {
        this.layout.getComponent(cc.Layout).node.color = cc.Color.BLUE;
        this.sprite_color.node.active = false;        
        if(cv.roomManager.checkGameIsZoom(cv.roomManager.getCurrentGameID())){  //急速，显示手数
            this.handCount.node.active = true;
        }else{
            this.handCount.node.active = false;
            this.dairu.node.setPosition(cc.v2(400,this.dairu.node.y));
        }


        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
            this.buyout.node.active = true;
        }
        else {
            this.buyout.node.active = false;
            this.dairu.node.setPosition(cc.v2(400,this.dairu.node.y));
        }
        //this.layout.node.getba;
    }
}