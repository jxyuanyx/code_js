import { IProto } from "../IProto";
import { RespProto } from "../models/RespProto";

export class BaseProto implements IProto{

    private _respProtos:Map<number,RespProto>;

    constructor(){
        this._respProtos=new Map();
        
        this._initRespProtos();
    }
    
    getsubscribeTopics(): number[] {
        return Array.from(this._respProtos.keys());
    }

    _initRespProtos():void{
        
    }

    getRespProtoByKey(key:number): RespProto {
        return this._respProtos.get(key);
    }


    addRespProtos(proto: RespProto | RespProto[]): void {
        if(proto instanceof Array){
            proto.forEach(pt=>{
                this._respProtos.set(pt.respCmd,pt);
            })
        }else{
            this._respProtos.set(proto.respCmd,proto);
        }
    }

}