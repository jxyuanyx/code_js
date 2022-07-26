import { GameResult } from "./imps/DataManager";

export interface INativeManager{
    /**
     * facebook登录
     */
    loginByFaceBook():void;

    /**
     * facebook登陆成功
     * @param data 
     */
    onFacebookSuccess(data:string):void;

    /**
     * facebook 用户取消登陆
     */
    onFacebookCancel():void;

    /**
     * facebook登陆错误
     */
    onFacebookError():void;


     /**
     * google登录
     */
    loginByGoogle():void;

    /**
     * google登陆成功
     * @param data 
     */
    onGoogleLoginSuccess(data:string):void;

    /**
     * google登陆错误
     * @param reason 
     */
    onGoogleLoginError(reason:string):void;


    /**
     * 进入unity游戏
     * @param gameName 
     */
     enterUnityGame(gameName: string): void;

    /**
     * 结束unity游戏
     */
    endUnityGame():void;

    getUUID():string;

    getPhoneName():string;

    selectPhoto():void;

    onSelectPhotoSuccess(path:string):void;

    /**
     * 游戏结果上传成功
     * @param data 
     */
    notifyUploadResultSuccess(data:string);

    /**
     * 游戏结果上传失败
     * @param data 
     */
     notifyUploadResultError(data:string);

     uploadGameResult(rsKey:string,uid:string,uuid:string,steps:string,gameToken:string,desk_id:number,room_id:number,room_type:number,totalScore:number,scoreToken:string,playTime:number,secretKey:string,isUnity);

     /**
      * 上传游戏的加减分
      */
      decrypGameOpearScore(score:string):string;



     /**
      * 打印日志
      * @param message 
      */
     echo(message:string):void;

     //振动
     shock():void;

     shockByCustom(data:string):void;

     logEvent(eventName:string,info:string):void;

     onGameBack():void;

     hideSplash():void;

     getAppVersionCode():string;

     getChannel():string;  

     isTest():boolean;

     doUnityAction(data:string);

     persistentDataPath():string;

     getAdjustID():string;

     getGpsAdjustUID():string;

     getarchabi():string;

     usedatadir(path:string):void;

     unZipFiles(zipFile:string,descDir:string):void;

     copyAssetsToDst(src:string,dest:string):void;

     isAdb():boolean;

     getSharedData(key:string):string;

     removeSharedData(key:string):void;

     fbLogOut():void;

     googleLogOut():void;

     copyTextToClipboard(str:string):void;

     shareToApp(packageName:string,shareContent:string):boolean;

     checkApp(packageName:string);

     getFakePackageName():string;
}