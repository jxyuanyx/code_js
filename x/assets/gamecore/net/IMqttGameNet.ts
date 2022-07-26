import { Cmd } from "./Cmd";
import { IProto } from "./IProto";
import { ReqProto } from "./models/ReqProto";
import Topic from "./models/Topic";

export interface IMqttGameNet{

    //是否正在刷新UI
    flushingUI:boolean;

    /**
     * 连接网络
     * @param host 
     * @param port 
     */
    connect(host:string,port:number):void;

    /**
     * 关闭网络
     */
    close():void;

    /**
     * 推送数据
     * @param cmd   命令码 
     * @param msg   内容
     * @param cb    回调
     */
     publish(proto:ReqProto,data?: any):void;


     /**
      * 添加协议
      * @param proto 
      */
     addProto(proto:IProto);

     isClosed():boolean;
}