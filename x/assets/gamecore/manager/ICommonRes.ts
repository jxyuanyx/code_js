
export interface ICommonRes {

    loadSystemRes(onComplete?:Function,target?:any):void;

    /**
     * 加载公共资源
     * @param res 
     * @param onComplete 
     * @param target 
     */
    loadCommonResArray(res:{key:string,path:string,type:typeof cc.Asset}[],bundleName:string,onComplete?:Function,target?:any)

    loadCommonRes(res:{key:string,path:string,type:typeof cc.Asset},bundleName:string,onComplete?:Function,target?:any);

    /**
     * 获取资源
     * @param key 
     */
    getRes(key:string):cc.Asset;

    /**
     * 释放资源
     * @param key 
     */
    releaseRes(key:string):void;
}