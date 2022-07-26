// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { DataConfig, Games } from "../../../GameConfig";
import { getGameInfoByRoomType } from "../../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameItem extends BaseComponent {

    UIBindData={
        name:"",
        won:"", 
        icon:null
    }

    flushdata(data:any){
        let gameData=getGameInfoByRoomType(data.room_type);
        this.UIBindData.name = gameData.gameName;
        this.UIBindData.won = "won:"+data.win;
        let iconPath =gameData.packageName;
        this.UIBindData.icon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(iconPath);
    }
}
