// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UpdateEvent, NUpdateService } from "./NUpdateService";
import { NativeManager } from "./NNativeManager";


const {ccclass, property} = cc._decorator;

const enum STATUS{
    NONE,       //正常
    SERVING,    //维户中
    UPDATE,     //更新提示
    VERSIONOLD  //版本过旧
}

const enum UPDATETYPE{
    RESOURCES,  //大厅资源
    GAMEENV     //游戏环境
}

const  ENVIRONMENTS={
    ID_TEST:"http://147.139.76.207",
    CHECK:"http://review.skillmasterapp.com:6636",
    DEV:"http://120.78.235.228",
    ONLINE:"https://game.skill-app.com"
}

enum CONSTANTS{
    COUNTRY="country",
    GAMECONFIGVERSION="GameConfigVersion",
    GAMEVERSION_CONFIG="game_version_config",
    GAMECONFIG="GameConfig",
    VOL_MUSIC="vol_music",
    VOL_SOUND="vol_sound",
    SYSTEM_CONFIG="system_config",
    APP_STATUS="app_status",
    PAY_FRIST="pay_frist",
    SHOW_PAYACT="show_payact",
    ACTIVITY_DATA="activity_data",
    REWARD_DATA="reward_data",
    COMMONDATA="common_data"
}

const commonList:string[]=[
    "textures/plist/common",
    "textures/plist/head",
    "textures/plist/country",
]

const HALL_VIEWS:string[]=[
    "hall/pages/page1/GamePageView",
    "hall/pages/page2/MatchPageView",
    "hall/pages/page3/SeasonPageView",
    "hall/pages/page4/invateView",
    "hall/pages/page5/RecordsPageView",
    "hall/pages/page6/DepositPageView"
];

window["Resource"]={

}

if(CC_PREVIEW){
    cc.assetManager.downloader.maxConcurrency = 20;
    cc.assetManager.downloader.maxRequestsPerFrame = 20;
}


@ccclass
export default class WelCome extends cc.Component {

    @property(cc.Asset)
    manifest:cc.Asset;

    @property(cc.ProgressBar)
    progressBar:cc.ProgressBar=null;

    @property(cc.Label)
    progress:cc.Label;

    @property(cc.Node)
    tipDlg:cc.Node;

    @property(cc.Label)
    tip:cc.Label;

    private _updateService:NUpdateService;

    private _updateType:UPDATETYPE=UPDATETYPE.RESOURCES;

    private _data:any;

    private _needRestart:boolean=false;

    private _nativeManager:NativeManager=new NativeManager();

    private _httpUrl:string=ENVIRONMENTS.ONLINE;

    private _progressStr:string="";

    private _clickCb:Function;

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

    onLoad(){

        this.tipDlg.active=false;

        this.progressBar.node.active=false;

        this.setProgressVal("Get the game config")
    }

    private _animIndex=0;
    private _animFrames=[".","..","..."];

    setProgressVal(str:string){
        this._progressStr=str;
        this.progress.string=str;
        this.schedule(()=>{
            if(!this._progressStr)return;
            this.progress.string=this._progressStr+this._animFrames[this._animIndex];
            if(++this._animIndex>=this._animFrames.length){
                this._animIndex=0;
            }
        },0.5)
    }

    start(): void {
        
        this.hideSplash();
        this._getConfig();
    }

    _getConfig(){

        if(this._nativeManager.isTest()){
            let env=cc.sys.localStorage.getItem("env");
            if(env){
                this._httpUrl=ENVIRONMENTS[env];
            }else{
                this._httpUrl=ENVIRONMENTS.DEV;
            }
        }else{
            this._httpUrl=ENVIRONMENTS.ONLINE;
        }

        //从服务器取配置
        let userInfo=cc.sys.localStorage.getItem("userInfo");
        let uid=0;
        if(userInfo){
           uid=JSON.parse(userInfo).uid;
        }

        let uuid=this._nativeManager.getUUID() || 0;
        let resVersion=cc.sys.localStorage.getItem("main_version") || 100;
        let channel=this._nativeManager.getChannel();
        let appVersion=this._nativeManager.getAppVersionCode();
        let unityVersion=parseInt(cc.sys.localStorage.getItem("unityCommon_version") || 0);

        let commonData={
            device_id:uuid,
            uid:uid,
            os:cc.sys.os,
            main_version:parseInt(resVersion),
            channel:channel,
            version:parseInt(appVersion),
            unity_version:unityVersion
       };

       cc.sys.localStorage.setItem(CONSTANTS.COMMONDATA,JSON.stringify(commonData));

       let getConfig=()=>{
           this.post("system_api/get_server_conf",{},commonData,(data)=>{
                cc.sys.localStorage.setItem(CONSTANTS.SYSTEM_CONFIG,JSON.stringify(data));
                this.startGame(data);
           },()=>{
                this.tip.string="Please check the network status";
                this._clickCb=()=>{
                    getConfig();
                }
                this.tipDlg.active=true;
           })
       }

       getConfig();

       /*
       let checkNetWork=()=>{
           //检测网络状态
           if(cc.sys.getNetworkType()==cc.sys.NetworkType.NONE){
               return false;
           }
           return true;
       }

       if(checkNetWork()){
           getConfig();
       }else{
            this.tip.string="Please check the network status";
            this._clickCb=()=>{
                getConfig();
            }
            this.tipDlg.active=true;
       }*/

    }

    _flushSubGame(){
        let restartSubGame=cc.sys.localStorage.getItem("RestartSubGame");
        if(restartSubGame){
            return true;
        }
        return false;
    }

    startGame(data:any){
        if(this._flushSubGame())return;
        this._data=data;

        if(cc.sys.isNative)
        {
            if(data){
                
                if(data?.update_info?.url){ //強更熱更
                    let udpateConfig=data.update_info;
                    this.tip.string=udpateConfig.info;
                    this._clickCb=()=>{
                        let url=udpateConfig.url;
                        cc.sys.openURL(url);
                    }
                    this.tipDlg.active=true;

                }else if(data.url){         //熱更
                    this.setProgressVal("Checking for updates")
                    this._checkUpdate(this.manifest.nativeUrl,data.url);
                }else if(data.unity_url){
                    this._checkUnityCommonUpdate(data.unity_url);
                }else{
                    this._enterGame();
                }
            }
        }else{
            this._enterGame();
        }
              
    }

  


    _checkUnityCommonUpdate(checkUrl:string){
        this.setProgressVal("Update the game running environment");
        this._updateType=UPDATETYPE.GAMEENV;
        //查找缓存
        let packageName=`unityCommon_${this._nativeManager.getarchabi()}`;
        let manifestPath=`${packageName}/project.manifest`;
        //let manifestPath=`unityCommon/project.manifest`;
        let manifest=jsb.fileUtils.getWritablePath()+"unity/AssetBundles/"+manifestPath;
        if(!jsb.fileUtils.isFileExist(manifest)){
            //查找本地的
            manifest=jsb.fileUtils.getDefaultResourceRootPath()+`assets/${packageName}.manifest`;
            if(!jsb.fileUtils.isFileExist(manifest)){
                manifest=jsb.fileUtils.getDefaultResourceRootPath()+"assets/project.manifest";
            }
        }
        this._updateService=new NUpdateService(manifest,packageName,true);
        this._updateService.on(UpdateEvent.CHECK,this._onCheckCb,this);
        this._updateService.on(UpdateEvent.UPDATE,this._onUpdateCb,this);
        this._updateService.on(UpdateEvent.DOWNLOADERROR,this._onDownLoadError,this);
        //cc.error("_checkUnityCommonUpdate",manifest,checkUrl,unityCommonVersion);

        this._updateService.checkUpdate(checkUrl+packageName+"/");

    }
    

    _checkUpdate(manifestUrl:string,checkUrl:string,isUnity?:boolean){
        this._updateService=new NUpdateService(manifestUrl,null,isUnity);
        this._updateService.on(UpdateEvent.CHECK,this._onCheckCb,this);
        this._updateService.on(UpdateEvent.UPDATE,this._onUpdateCb,this);
        this._updateService.on(UpdateEvent.DOWNLOADERROR,this._onDownLoadError,this);
        this._updateType=UPDATETYPE.RESOURCES;
        this._updateService.checkUpdate(checkUrl);
    }
 

    _updateLoadResourceProgress(val:number){
        this.progress.string=`Load game resources... ${Math.floor(val)}%`;
        this.progressBar.progress=val/100;
    }

    _enterGame(){
        this._progressStr="";
        this._updateLoadResourceProgress(0);
        this.progressBar.node.active=true;
        let progress=0;
        //加载各种资源
        cc.assetManager.loadBundle("gamecore",(error,bundle)=>{
            progress=2;
            this._updateLoadResourceProgress(progress);

            let fakePackgeName=this.getFakePackageName();
            cc.assetManager.loadBundle("mainpackage",(error,bundle)=>{
                progress=5;
                this._updateLoadResourceProgress(progress);
                //加载公共资源
                bundle.load(commonList,cc.SpriteAtlas,(finish, total, item) => {
                    progress=5+(finish/total)*70;
                    this._updateLoadResourceProgress(progress);
                },((error, assets) => {
                    if(error){

                    }else{
                        window["Resource"].commonSpriteAtlas=assets;
                
                        bundle.loadScene("login",(finish: number, total: number, item)=>{
                            progress=75+(finish/total)*5;
                            this._updateLoadResourceProgress(progress);
                        },(error,loginScene)=>{
                            bundle.loadScene("hall",(finish: number, total: number, item)=>{
                                progress=80+(finish/total)*5;
                                this._updateLoadResourceProgress(progress);
                            },(error,scene)=>{
                                //加载大厅的6个切页
                                bundle.load(HALL_VIEWS,cc.Prefab,(finish,total,item)=>{
                                    progress=85+(finish/total)*15;
                                    this._updateLoadResourceProgress(progress);
                                },(error,assets)=>{
                                    window["Resource"].HallViews=assets;
                                    //进入登陆页
                                    //cc.director.runScene(loginScene);
                                    if(fakePackgeName){
                                        cc.assetManager.loadBundle(fakePackgeName,(error,bundle)=>{
                                            bundle.loadScene("login",(error,scene)=>{
                                                cc.director.runScene(scene);
                                            })
                                        })
                                    }else{
                                        cc.director.runScene(loginScene);
                                    }
                                })
                            })
                        })
                        
                    }
                }));
            })
            
        })
    }

    releaseBundle(bundleName:string){
        let bundle=cc.assetManager.getBundle(bundleName);
        if(bundle){
            bundle.releaseAll();
            cc.assetManager.removeBundle(bundle);
        }
    }

    _restartGame(){
        //清除原来的bundle缓存
        this.setProgressVal("Restarting the game");//"更新完成，重启游戏中...";
        this.releaseBundle("gamecore");
        this.releaseBundle("mainpackage");
        //重启游戏
        this.scheduleOnce(()=>{
            cc.game.restart();
        },0.2);
    }

    _onUpdateCb(key:string,code:number,progress:number,total:number){
        switch (code) {
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.progressBar.progress=1;
                console.log("_onUpdateCb jsb.EventAssetsManager.UPDATE_FINISHED")
                
                if(this._updateType==UPDATETYPE.RESOURCES){
                    cc.sys.localStorage.setItem("main_version",this._updateService.getTargetVersion() || "1.0.0");
                   
                    this._needRestart=true;
                    if(this._data.unity_url){
                        this._checkUnityCommonUpdate(this._data?.unity_url);
                    }else{
                        this._restartGame();
                    }
                }else if(this._updateType==UPDATETYPE.GAMEENV){
                    //解压so文件
                    let archabi=this._nativeManager.getarchabi();
                    let soPath=`${jsb.fileUtils.getWritablePath()}unity/AssetBundles/unityCommon_${archabi}`;
                    let soZipPath=`${soPath}/lib_${archabi}_libil2cpp.so.zip`;
                    if(jsb.fileUtils.isFileExist(soZipPath)){
                        //解压so文件
                        this._nativeManager.unZipFiles(soZipPath,soPath);
                        //删除压缩包
                        jsb.fileUtils.removeFile(soZipPath);
                    }
                    //删除libcpp缓存
                    jsb.fileUtils.removeDirectory(this._nativeManager.persistentDataPath()+"il2cpp");

                    cc.sys.localStorage.setItem("unityCommon_version",this._updateService.getTargetVersion() || "1.0.0");
                    this._updateService.destroy();
                    
                    this._restartGame();
                }
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let str=(this._updateType==UPDATETYPE.RESOURCES)?"updating":"updating_gameenv";
                this._progressStr="";
                this.progress.string=`updating..${this.formatByte(progress)}/${this.formatByte(total)}`;//App.LangManager.getTxtByKey(str,[GameHelper.formatByte(progress)+"/"+GameHelper.formatByte(total)]) //`更新中,${GameHelper.formatByte(progress)}\/${GameHelper.formatByte(total)}`;
                this.progressBar.node.active=true;
                this.progressBar.progress=progress/total;
                break;
        }
    }

    _onCheckCb(key:string,code:number){
        switch (code){
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.setProgressVal("Find the new version");//App.LangManager.getTxtByKey("findNewVersion"); //"发现新版本,更新中...";
                this._updateService.hotUpdate();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this._progressStr="";
                this.progress.string="The current version is the latest version";//App.LangManager.getTxtByKey("alreadyUpdate"); 
                if(this._updateType==UPDATETYPE.GAMEENV){
                    cc.sys.localStorage.setItem("unityCommon_version",this._updateService.getTargetVersion() || "1.0.0");
                    if(this._needRestart){
                        this._restartGame();
                    }else{
                        this._enterGame();
                    }
                }else{
                    cc.sys.localStorage.setItem("main_version",this._updateService.getTargetVersion() || "1.0.0");
                    if(this._data.unity_url){
                        this._checkUnityCommonUpdate(this._data.unity_url);
                    }else{
                        if(this._needRestart){
                            this._restartGame();
                        }else{
                            this._enterGame();
                        }
                    }
                }
                break;
        }
    }

    onDestroy(){
        if(this._updateService){
            this._updateService.destroy();
            this._updateService.off(UpdateEvent.CHECK);
            this._updateService.off(UpdateEvent.UPDATE);
            this._updateService.off(UpdateEvent.REDOWNLOAD);
        }
    }

    _onDownLoadError(){
        this._clickCb=()=>{
            this._updateService.emit(UpdateEvent.REDOWNLOAD);
        }
        this.tipDlg.active=true;
    }


    post(api: any, reqData: any,commonData:any,cb?:Function,errCb?:Function,target?:Function) {
        let body:any={
            params:{

            }
        }
        if(commonData){
            for(var item in commonData){
                body[item]=commonData[item];
            }
        }

        Object.assign(body.params,reqData || {})

        let keys=Object.keys(body);
        keys.sort();
        let sign=""
        for(let i=0;i<keys.length;i++){
            if (sign != ""){
                sign += "&"
            } 
            let signData=body[keys[i]];
            sign+=keys[i]+"="+((typeof signData == "object")?JSON.stringify(signData):signData); 
        }

        console.log("sign",sign)
        //@ts-ignore
        body["sign"]=hex_md5(sign+"@1%ss(&@1v%mf-z5(#p26slu#&v-do9awafskpytylw#6xp#");

        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 400){
                    var response = xhr.responseText;
                    var responseJson = JSON.parse(response);
                    let ret=responseJson.ret;
                    if(ret==undefined){
                        cb&&cb.call(target,responseJson);
                    }else if(ret==0){
                        cb&&cb.call(target,responseJson.data);
                    }else{
                        //GameHelper.showTopTip(`errorCode:${code},${App.DataManager.getExtInfo("error_code")?.code}`)
                        errCb&&errCb.call(target,ret);
                      
                    }
                }else{
                    errCb&&errCb.call(target,null);
                }
            }
        };

        xhr.timeout = 20000;
        xhr.open("post", this._httpUrl +"/"+ api, true);
        xhr.setRequestHeader('Authorization',"");
        xhr.setRequestHeader("Content-Type" , "application/json");  
        xhr.send(JSON.stringify(body));//reqData为字符串形式： "key=value"
        xhr.ontimeout = function (e) {
            // XMLHttpRequest 超时。在此做某事。
        };

        xhr.onerror=function(e){
            errCb&&errCb.call(target,null);
        }

        return xhr;
    }

    onOkClick(){
        this._clickCb?.();
        this.tipDlg.active=false;
    }


    formatByte(bytes){
        if(bytes<1024*1024){
            let  result=(bytes/(1024))+''
            let infos=result.split('.')
            if(infos.length>1){
                return infos[0]+'.'+infos[1].substr(0,2)+'k'
            }else{
                return result+'k'
            }
        }else{
            let  result=(bytes/(1024*1024))+''
            let infos=result.split('.')
            if(infos.length>1){
                return infos[0]+'.'+infos[1].substr(0,2)+'m'
            }else{
                return result+'m'
            }
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
}