export const EVENT_FACEBOOK_LOGINSUCCESS:string="event_facebook_loginSuccess";
export const EVENT_FACEBOOK_LOGINCANCEL:string="event_facebook_loginCancel";
export const EVENT_FACEBOOK_LOGINERROR:string="event_facebook_loginError";

export const EVENT_GP_LOGINSUCCESS:string="event_gp_loginSuccess";
export const EVENT_GP_LOGINERROR:string="event_gp_loginError";

export class NativeManager{

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
}