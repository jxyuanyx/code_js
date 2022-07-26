export interface INoticemanager{

    /**
     * 添加消息类型 
     * @param type 
     */
    addMsgType(type:string):void;

    /**
     * 添加
     * @param msg 
     */
    pushMsg(type:string,msg:any):void;

    /**
     * 获取
     */
    getMsg(type:string):any;


    /**
     * 清除队列
     */
    clearSequence(type:string):void;

    sortMsg(type:string,sortFun:Function):void;

    clearAll():void;

}