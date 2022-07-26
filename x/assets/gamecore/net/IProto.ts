import { RespProto } from "./models/RespProto";

export interface IProto{

    /**
     * 获取协议
     */
    getRespProtoByKey(key:number):RespProto;

    /**
     * 添加返回协议
     * @param proto 
     */
    addRespProtos(proto:RespProto|RespProto[]):void;


    getsubscribeTopics():number[];
    
}