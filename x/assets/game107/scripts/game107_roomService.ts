// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import GameHelper from "../../gamecore/tools/GameHelper";
import { BaseRoomService } from "../../gamecore/ui/baseview/imp/BaseRoomService";
import { CHESS_PATHS } from "./game107_enum";
import Game100Helper from "./game107_helper";

const {ccclass, property} = cc._decorator;

const PROTECT_SCORE:string="score";

const MAXSEAT=4;
const MAP_SIZE=15;

@ccclass
export  class Game107RoomService extends BaseRoomService {
    private _chessSteps:Map<number,number[]>=new Map();

    private _map:number[][][]=[];

    onLoad(): void {
        this.init();
        this._initMap();
    }

    _initMap(){
        for(let i=0;i<MAP_SIZE;i++){
            let row=[];
            for(let j=0;j<MAP_SIZE;j++){
                row[j]=[];
            }
            this._map[i]=row;
        }
    }

    init(){
        for(let i=0;i<MAXSEAT;i++){
            this._chessSteps.set(i,[0,0,0,0]);
        }
    }

    addStep(clientId:number,chessIndex:number,step:number):{from:number[],to:number[]}{
        let oldStep=this._chessSteps.get(clientId)[chessIndex];
        let oldPos;
        if(oldStep>0){
            oldPos=CHESS_PATHS[clientId][oldStep-1];
            let data=(clientId<<4)+chessIndex+1;
            this._map[oldPos[1]][oldPos[0]].splice(this._map[oldPos[1]][oldPos[0]].indexOf(data),1);
        }
      
        this._chessSteps.get(clientId)[chessIndex]+=step;
        //添加地图数据
        let pos=CHESS_PATHS[clientId][this._chessSteps.get(clientId)[chessIndex]-1];
        this._map[pos[1]][pos[0]].push((clientId<<4)+chessIndex+1);
        return {to:this._map[pos[1]][pos[0]],from:oldPos?this._map[oldPos[1]][oldPos[0]]:null};
    }

    getMapInfo(pos:number[]){
        return this._map[pos[1]][pos[0]];
    }

    clearStep(clientId:number,index:number){
        if(this._chessSteps.get(clientId)[index]==0)return;
        //清除地图数据
        let oldPos=CHESS_PATHS[clientId][this._chessSteps.get(clientId)[index]-1];
        let data=(clientId<<4)+index+1;
        let mapDatas= this._map[oldPos[1]][oldPos[0]];
        let dataIndex=mapDatas.indexOf(data);
        mapDatas.splice(dataIndex,1);

        this._chessSteps.get(clientId)[index]=0;

        return mapDatas;
    }

    getChessStep(clientId:number,index:number){
        return this._chessSteps.get(clientId)[index];
    }

    findCanMoveIndex(point:number,clientId:number){
        let result=[];
        let steps=[];
        if(point==6){
            this._chessSteps.get(clientId).forEach((step,index) => {
                if((step+point)<=57){
                    result.push(index);
                }
            });
        }else{
            //过滤掉步数一样的
            this._chessSteps.get(clientId).forEach((step,index) => {
                if((step+point)<=57&&step>0&&steps.indexOf(step)==-1){
                    result.push(index);
                    steps.push(step);
                }
            });
        }
        return result;
    }
}
