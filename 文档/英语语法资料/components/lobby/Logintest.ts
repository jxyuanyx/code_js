// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { GameRecordsData, CollectPokerMapData ,RecordsData} from "../game/dzPoker/data/RecordData";
import { RoomParams } from "../game/dzPoker/data/RoomData";
import cv from "./cv";
const {ccclass, property} = cc._decorator;

@ccclass
export class Logintest extends cc.Component {
    public rece:RecordsData;
    public se:RoomParams;
    onLoad(){
        cv.init();
        this.rece = new RecordsData();
        
        let data:any = {nRoomUUID :2,
            nCreateTime: 56,
            nSelfWinbet:78,
            tRoomParam:{nOwnerType: 100,
                nGameMode:  200,
                nPlayerCountMax: 600,
                vAllianceID: [85,65,541]
            },
            
        };
        //this.rece = data;
        cv.StringTools.deepCopy(data,this.rece);
        data.nCreateTime = 1000;
        console.log(this.rece);
        console.log(data);
        //console.log(this.rece.tRoomParam.nPlayerCountMax);
        //console.log(this.rece.tRoomParam.vAllianceID[1]);
    }
}
