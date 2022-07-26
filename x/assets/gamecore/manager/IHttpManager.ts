export interface IHttpManager {

    /**
     * 初始化
     */
    init(url:string):void;

    /**
     * 设置token
     * @param token 
     */
    setToken(token:string,id:string):void;
    
    get(api:string,data:any,node?:cc.Node,cb?:Function,errCb?:Function,target?:Function):XMLHttpRequest;

    post(api:string,data:any,node?:cc.Node,cb?:Function,errCb?:Function,target?:Function):XMLHttpRequest;

    upload(api:string,data:any,cb?:Function,target?:Function):any;

    setCommonInfo(data:any):void;

    cancel(xhr:XMLHttpRequest):void;

    //@ts-ignore
    postAsync(api:string,data?:any,showLoading?:boolean):any;

}