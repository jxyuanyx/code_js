import { ObPlayer } from "./data/RoomData"
import cv from "../../lobby/cv"
import { ObItem } from "./ObItem"
import { CircleSprite } from "../../../../Script/common/tools/CircleSprite";
import { RemarkData } from "../../../data/userData";

const { ccclass, property } = cc._decorator;
@ccclass
export class ObView extends cc.Component {
    obplayers: Array<ObPlayer> = [];
    m_PkObplayers: Array<ObPlayer> = [];

    itemList:cc.Node [] = [];
    @property(cc.Prefab) ObItemPrefab: cc.Prefab = null;


    onLoad(): void {
    }

    createItem(num){
        if(num < this.itemList.length){
            this.itemList[num].active = true;
            return this.itemList[num];
        }
        let item = cc.instantiate(this.ObItemPrefab);
        this.node.addChild(item);
        this.itemList.push(item);
        return item;
    }

    hideInvaliedItem(len){
        for (let index = 0; index < this.itemList.length; index++) {
            if(index >= len){
                this.itemList[index].active = false;
            }
            
        }
    }
    public setData(obplayers) {
        //this.node.removeAllChildren();
        this.m_PkObplayers = obplayers;
        var len = obplayers.length;
        var height = this.node.getContentSize().height;
        var row = Math.ceil(len / 4);

        for (let i = 1; i < len + 1; i++) {
            let item = this.createItem(i-1);
            let ix = ((i - 1) % 4) * item.getContentSize().width;
            let curRow = Math.ceil(i / 4);
            let iy = (row - curRow) * item.getContentSize().height;
            item.setPosition(ix, iy);
            let kPlayer: ObPlayer = obplayers[i - 1];
            item.getComponent(ObItem).playerId = kPlayer.playerid;
            item.getComponent(ObItem).obPlayerData = kPlayer;
            console.log(item.getComponent(ObItem).roleName);

            let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(obplayers[i - 1].playerid);
            let kName = rdata.sRemark != null && rdata.sRemark.length != 0 ? rdata.sRemark : obplayers[i - 1].name;

            cv.StringTools.setShrinkString(item.getComponent(ObItem).roleName.node, kName, true);

            //头像
            if (kPlayer.playerid == cv.dataHandler.getUserData().u32Uid) {
                if (kPlayer.headPath.length == 0) {
                    CircleSprite.setCircleSprite(item.getComponent(ObItem).roleImg.node, cv.dataHandler.getUserData().HeadPath);
                }
                else {
                    CircleSprite.setCircleSprite(item.getComponent(ObItem).roleImg.node, kPlayer.headPath, kPlayer.plat);
                }
            }
            else {
                if (kPlayer.headPath == "") {
                    CircleSprite.setCircleSprite(item.getComponent(ObItem).roleImg.node);
                }
                else {
                    CircleSprite.setCircleSprite(item.getComponent(ObItem).roleImg.node, kPlayer.headPath, kPlayer.plat);
                }
            }

            if (kPlayer.isInroom) {
                item.getComponent(ObItem).roleName.node.color = cc.Color.WHITE;
                item.getComponent(ObItem).black_img.node.active = false;
            }
            else {
                item.getComponent(ObItem).black_img.node.active = true;
                item.getComponent(ObItem).black_img.node.zIndex = 100;
                item.getComponent(ObItem).roleName.node.color = cc.color(80, 80, 80);
            }
            
        }
        this.hideInvaliedItem(len);
    }
}