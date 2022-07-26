import App from "../../App";
import { GameEvents } from "../../events/GameEvents";
import GameItemData from "../../models/GameItemData";
import GameHelper from "../../tools/GameHelper";
import { INativeManager } from "../INativeManager";
import { GameResult } from "./DataManager";

export const EVENT_FACEBOOK_LOGINSUCCESS:string="event_facebook_loginSuccess";
export const EVENT_FACEBOOK_LOGINCANCEL:string="event_facebook_loginCancel";
export const EVENT_FACEBOOK_LOGINERROR:string="event_facebook_loginError";

export const EVENT_GP_LOGINSUCCESS:string="event_gp_loginSuccess";
export const EVENT_GP_LOGINERROR:string="event_gp_loginError";

export class NativeManager implements INativeManager{

    fbLogOut(): void {
         if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","fbLogOut","()V");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController",
                "nativeLoginFB");  
            }
        }
    }
    
    googleLogOut(): void {
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","googleLogOut","()V");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController",
                "nativeLoginFB");  
            }
        }
    }


    decrypGameOpearScore(score: string) {
        //解密
        score=GameHelper.AESDecryptoNew(score);
        if(/[+-]\d+/g.test(score)){
            return score;
        }
        return "";
    }

    loginByFaceBook(): void {
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","fbLogin","()V");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController",
                "nativeLoginFB");  
            }
        }
    }

    onFacebookSuccess(data: string): void {
        cc.game.emit(EVENT_FACEBOOK_LOGINSUCCESS,data);
    }

    onFacebookCancel(): void {
        cc.game.emit(EVENT_FACEBOOK_LOGINCANCEL);
    }

    onFacebookError(): void {
        cc.game.emit(EVENT_FACEBOOK_LOGINERROR);
    }

    loginByGoogle(): void {
        if(cc.sys.os==cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","googleSignIn","()V");     

        }else if(cc.sys.os==cc.sys.OS_IOS){
            // @ts-ignore
            jsb.reflection.callStaticMethod("AppController",
            "nativeLoginGP"
           );  
        }
    }

    onGoogleLoginSuccess(data: string): void {
        cc.game.emit(EVENT_GP_LOGINSUCCESS,data);
    }
    
    onGoogleLoginError(reason: string): void {
        cc.game.emit(EVENT_GP_LOGINERROR);
    }

    enterUnityGame(gameName: string): void {
        if(!cc.sys.isNative)return;
       

        if(cc.sys.os==cc.sys.OS_ANDROID){
            //删除libcpp缓存
            jsb.fileUtils.removeDirectory(App.NativeManager.persistentDataPath()+"il2cpp");
            
            let gameData=App.DataManager.getGameData();
            let gameInitData=App.DataManager.getGameInitInfo();
            let tableData=gameData.tableData as any;

            let data={
                gameId:gameData.packageName,
                gameName:gameData.serverModuleName,
                matchInfo:"",//encodeURI(JSON.stringify(tableData.MatchInfo)),
                gameInitInfo:"",//encodeURI(JSON.stringify(tableData[tableData.GameInitInfo])),
                updateUrl:gameData.updateUrl,
                localUrl:jsb.fileUtils.getWritablePath()+"unity/AssetBundles/"+gameData.packageName+"/",
                ScreensType:gameData.screensType,
                enterGameInfo:gameData.enterGameInfo,
                isRecord:0,
                playbackdata:[],
                desk_id:null,
                room_id:null,
                room_type:null,
                uuid:null,
                secretKey:"",//md5(uuid+roomid+key);
            }

            if(gameData.isRecord){
                data.isRecord=1;
                data.playbackdata=[gameData.tableData];
            }else{
                data.isRecord=0;
                data.matchInfo=encodeURI(JSON.stringify(tableData.match_info.toJSON()));
                data.gameInitInfo=encodeURI(JSON.stringify(tableData.game_init.toJSON()));
                data.desk_id=gameInitData.desk_id;
                data.room_id=gameInitData.room_id;
                data.room_type=gameInitData.room_type;
                data.uuid=gameInitData.uuid;
            }

            this.echo("unityInfo>>>>>   "+JSON.stringify(data));

            let str=JSON.stringify(data)

            //设置游戏数据
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper",
            "setCurrentGame",
            "(Ljava/lang/String;)V",
            GameHelper.AESEncrypResult(str)
           );    
           

           let splashPath=jsb.fileUtils.getWritablePath()+"unity/AssetBundles/unityCommon_"+this.getarchabi()+"/splashs.png";
           if(!jsb.fileUtils.isFileExist(splashPath)){
               splashPath="@assets/splashs/splashs.png";
           }
           
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper",
            "runUnityGame",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
            App.DataManager.getSelfData().uid.toString(),
            gameName,
            splashPath
           );
        }else if(cc.sys.os==cc.sys.OS_IOS){
            jsb.reflection.callStaticMethod("AppController",
            "runUnityGame:",
            gameName
           );                 
        }
    }

    endUnityGame(): void {
        if(cc.sys.os==cc.sys.OS_ANDROID){

        }else if(cc.sys.os==cc.sys.OS_IOS){
            // @ts-ignore
            jsb.reflection.callStaticMethod("AppController","endUnityGame");     
        }     
    }

    getUUID(): string {
        if(this.isTest()){
            let uuid=cc.sys.localStorage.getItem("UUID")
            if(uuid){
                return uuid;
            }
        }
        if(!cc.sys.isBrowser){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getUUID","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","getUUID");     
            }else{
                return "1234567"
            }     
        }else{
            return "1234777";
        }
        
    }

    getPhoneName():string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getPhoneName","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","getPhoneName");     
            } 
        }else{
            return "";
        }
    }

    //震动
    shock():string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","StartShock","(I)V",1);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","StartShock");     
            } 
        }else{
            return "";
        }
    }

    //震动
    shockByCustom(data:string):void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                 jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","shockByCustom","(Ljava/lang/String;)V",data);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                 jsb.reflection.callStaticMethod("AppController","StartShock");     
            } 
        }else{
            
        }
    }

    


    selectPhoto():void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","selectPhoto","()V");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
            } 
        }
    }

    onSelectPhotoSuccess(path:string):void{
        GameHelper.showTopTip(path);
        let base64Str=GameHelper.getBase64Data(path);
        console.log("base64Str",base64Str);
    }

    notifyUploadResultSuccess(data: string) {
        let gameData:GameItemData=App.DataManager.getGameData();
        cc.game.emit(GameEvents.UPLOAD_GAME_RESULT_SUCCESS);
        /*
        if(!gameData.isUnity){
            if(cc.sys.isNative){
                if(cc.sys.os==cc.sys.OS_ANDROID){
                    return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/UnityHelper","finish","()V");     
                }else if(cc.sys.os==cc.sys.OS_IOS){
                    // @ts-ignore
                    return jsb.reflection.callStaticMethod("AppController","getPhoneName");     
                } 
            }
        }*/
    }

    notifyUploadResultError(data: string) {
        
    }

    uploadGameResult(rsKey:string,uid:string,uuid:string,steps:string,gameToken:string,desk_id:number,room_id:number,room_type:number,totalScore:number,scoreToken:string,playTime:number,secretKey:string,isUnity:boolean){
        let result=new GameResult();
        result.totalScore=totalScore;
        result.steps=steps;
        result.checkCode=GameHelper.encryBase64Score(gameToken,scoreToken);
        result.scoreToken=scoreToken;
        result.time=playTime;
        result.rsKey=rsKey;
        result.uuid=uuid;
        result.room_id=room_id;
        result.desk_id=desk_id;
        result.secretKey=secretKey;
        result.roomType=room_type;
        result.uid=uid;
        result.isUnity=isUnity;
        App.DataManager.pushUnityGameResult(result);
        App.NativeManager.echo("uploadGameResult:"+ JSON.stringify(result));
    }

    doUnityAction(data:string){
        
    }

    echo(message:string){
        if(!this.isTest())return
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","echo","(Ljava/lang/String;)V",message);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            cc.log(message);
        }
    }

    logEvent(eventName: string, info: any): void {
       // if(this.isTest())return;
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdjustHelper","logEvent","(Ljava/lang/String;Ljava/lang/String;)V",eventName,info?JSON.stringify(info):"");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","logEvent");     
            } 
        }else{
            
        }
    }

    onGameBack(){
         //没有对话框，就判定场景
         if(!App.DlgManager.closeTopDlg()){
            if(App.SceneManager.currentSceneName()=="hall"){
                cc.game.emit(GameEvents.CONFIRM_GAMEEND);
            }else{
                //正在游戏中,发送后用触发后退按钮，一般弹暂停界面
                cc.game.emit(GameEvents.PASS_BACK);
            }
        }    
    }

    hideSplash(){
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","hideSplash","()V");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            
        }
    }

    getAppVersionCode(): string {
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getAppVersionCode","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            }else if(cc.sys.os==cc.sys.OS_WINDOWS){
                return "12";
            } 
        }else{
            return "12";
        }
    }
    
    getChannel(): string {
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getChannel","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            }else if(cc.sys.os==cc.sys.OS_WINDOWS){
                return "GPID_And_003";
            } 
        }else{
            return "GPID_And_007";
        }
    }

    isTest():boolean{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","isTest","()Z");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            }else if(cc.sys.os==cc.sys.OS_WINDOWS){
                return true;
            }
        }else{
            return true;
        }
    }

    persistentDataPath():string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","persistentDataPath","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return "";
        }
    }

    getAdjustID():string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
               return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdjustHelper","getAdjustUID","()Ljava/lang/String;");  
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return "";
        }
    }

    getGpsAdjustUID(): string {
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
               return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdjustHelper","getGpsAdjustUID","()Ljava/lang/String;");  
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return "";
        }
    }


    getarchabi():string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getarchabi","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            }else if(cc.sys.os==cc.sys.OS_WINDOWS){
                return "arm64-v8a";
            }  
        }else{
            return "";
        }
    }

    usedatadir(path:string):void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","usedatadir","(Ljava/lang/String;)V",path);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            
        }
    }

    unZipFiles(zipFile:string,descDir:string):void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","unZipFiles","(Ljava/lang/String;Ljava/lang/String;)V",zipFile,descDir);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            
        }
    }

    copyAssetsToDst(src:string,dest:string):void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","copyAssetsToDst","(Ljava/lang/String;Ljava/lang/String;)V",src,dest);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            
        }
    }

    copyTextToClipboard(str:string):void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxHelper","copyTextToClipboard","(Ljava/lang/String;)V",str);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            
        }
    }


    isAdb():boolean{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","isEnableAdb","()Z");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return false
        }
    }

    getSharedData(key:string):string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getSharedData","(Ljava/lang/String;)Ljava/lang/String;",key);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return ""
        }
    }

    removeSharedData(key:string):void{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","removeSharedData","(Ljava/lang/String;)V",key);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
           
        }
    }

    shareToApp(packageName:string,shareContent:string){
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","shareToApp","(Ljava/lang/String;Ljava/lang/String;)Z",packageName,shareContent);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
           return false;
        }
    }

    checkApp(packageName: string) {
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","checkApp","(Ljava/lang/String;)Z",packageName);     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return false
        }
    }

    getFakePackageName():string{
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/NativeHelper","getFakePackageName","()Ljava/lang/String;");     
            }else if(cc.sys.os==cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");     
            } 
        }else{
            return this._getQueryVariable("fake");
        }
    }

    _getQueryVariable(variable):string
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return "";
    }

    getAdKey(key):string{
        if (cc.sys.isNative) {
            if (cc.sys.os==cc.sys.OS_ANDROID) {
                return  jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdjustHelper","getAdKey","(Ljava/lang/String;)Ljava/lang/String;",key);
            }
            else if (cc.sys.os == cc.sys.OS_IOS){
                // @ts-ignore
                return jsb.reflection.callStaticMethod("AppController","echo");  
            }
        }
        else{
            return "";
        }
    }
}