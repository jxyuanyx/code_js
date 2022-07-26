import { IProto } from "./IProto";
import { ReqProto } from "./models/ReqProto";

export interface IGameNet{
    
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


    isClosed():boolean;

    needReconnect():boolean;

    clearSequence():void;

    /**
     * 发送消息
     * @param cmd 命令码
     * @param pkg 包体  
     */
    send(pkg:ReqProto,data?:any);

    /**
     * 重置
     */
    reset();

    /**
     * 更新房间信息
     * @param deskId 
     * @param roomId 
     */
    updateRoomInfo(deskId:number,roomId:number);

    /**
     * 清除房间信息
     */
    clearRoomInfo();

    /**
     * 设置公用信息
     * @param uid 
     * @param token 
     * @param version 
     * @param channel 
     */
    setCommonInfo(uid:number,token:string,version:number,channel:string)

    /**
      * 添加协议
      * @param proto 
      */
     addProto(proto:IProto);

    getRoomId():number;

    getDeskId():number;
}