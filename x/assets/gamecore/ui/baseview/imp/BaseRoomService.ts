import {Table} from "../models/Table";

const {ccclass, property} = cc._decorator;

export class BaseRoomService extends cc.Component{


    @property
    private cbClockwise:boolean=true;

    @property
    private needFromatSeat:boolean=true;

    private _selfSeat:number=null;

    private _tableInfo:Table;

    /**
     * 获取用户的实际坐位号
     * @param {number} seat         座位号
     * @param {number} selfSeat     自已的座位号
     * @param {number} count        桌子总人数
     */

    getClientId(seat:number,count:number){
        if(this._selfSeat==null || this._selfSeat>=count || this._selfSeat==-1 || !this.needFromatSeat)return seat;
        if(seat==this._selfSeat)return 0;
        if(this.cbClockwise){
            let clientid=seat-this._selfSeat
            if(clientid<0){
                clientid=clientid+count
            }
            return clientid
        }else{
            let clientid=this._selfSeat-seat;
            if(clientid>0){
                clientid=count-clientid;
            }
            return Math.abs(clientid);
        }
    }

    get selfSeat(): number {
        return this._selfSeat;
    }

    set selfSeat(value: number) {
        this._selfSeat = value;
    }

    get tableInfo(): Table {
        return this._tableInfo;
    }

    set tableInfo(value: Table) {
        this._tableInfo = value;
    }

}