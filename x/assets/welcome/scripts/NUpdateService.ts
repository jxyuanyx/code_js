// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Bundle = cc.AssetManager.Bundle;

export enum UpdateEvent{
    CHECK="revCheckMsg",
    UPDATE="revUpdateMsg",
    DOWNLOADERROR="downloadError",
    REDOWNLOAD="reDownLoad"
}


export class NUpdateService extends cc.EventTarget{
    
    private _updating: boolean=false;
    private _canRetry: boolean=false;
    private _storagePath:string='';

    private _am:jsb.AssetsManager=null;
    private _failCount:number=0;

    private _localUrl:string=null;

    private _bundleName:string=null;

    private _key:string=null;

    private _targetVersion:string=null;

    private _updateMap:Map<string,string>=new Map();

    private _tempPath:string;

    private _updateTempString:string="";

    private _isUnity:boolean=false;

    constructor(manifestUrl?:string,bundleName?:string,isUnity?:boolean) {
        super();
        this.setManifest(manifestUrl,bundleName,isUnity);
        this.on(UpdateEvent.REDOWNLOAD,this._downLoadFile,this);
    }

    setManifest(manifestUrl?:string,bundleName?:string,isUnity?:boolean){
        if(isUnity){
            this._isUnity=isUnity;
            this._storagePath=jsb.fileUtils.getWritablePath()+"unity/AssetBundles/"+bundleName;
        }else{
            if(bundleName){
                this._storagePath=jsb.fileUtils.getWritablePath()+"gamecaches/assets/"+bundleName;
            }else{
                bundleName="mainpackage";
                this._storagePath=jsb.fileUtils.getWritablePath()+"gamecaches";
            }
        }

       

        this._bundleName=bundleName;

        this._tempPath=`${this._storagePath}/${this._bundleName}_temp`;

        if(cc.sys.isNative&&!isUnity){
            if(jsb.fileUtils.isFileExist(this._tempPath)){
                this._updateTempString=jsb.fileUtils.getStringFromFile(this._tempPath);
            }
        }

        this._localUrl=manifestUrl;

        cc.log(this._localUrl);
        /*
        if (cc.loader.md5Pipe) {
            this._localUrl = cc.loader.md5Pipe.transformURL(this._localUrl);
        }*/

        this._key=bundleName;
    }

    checkCb(event) {
        /*
        let code:number=event.getEventCode();
        if(code==jsb.EventAssetsManager.ALREADY_UP_TO_DATE){
            cc.sys.localStorage.setItem(this._bundleName+'_version',this._targetVersion);
        }*/
       this.emit(UpdateEvent.CHECK,this._key,event.getEventCode())
    }

    updateCb(event) {
        let loadedBytes:number=0;
        let totalBytes:number=0;
        let failed = false;
        let code:number=event.getEventCode();
        if(code==jsb.EventAssetsManager.UPDATE_PROGRESSION){
            loadedBytes=event.getDownloadedBytes();
            totalBytes=event.getTotalBytes();
            //console.log("更新中....",loadedBytes,totalBytes);
        }else if(code==jsb.EventAssetsManager.UPDATE_FINISHED){
            /*
            if(this._bundleName=="mainpackage"){
                let searchPaths = jsb.fileUtils.getSearchPaths();
                let newPaths = this._am.getLocalManifest().getSearchPaths();
                Array.prototype.unshift(searchPaths, newPaths);
                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);
            }*/
            
            if(!this._isUnity){
                this._saveCacheFile();
            }

           // console.log("更新完成....",JSON.stringify(jsb.fileUtils.getSearchPaths()))
            //console.log("123123213213123")

            //写入文件

            console.log("更新完成....");


        }else if(code==jsb.EventAssetsManager.ASSET_UPDATED){
            //console.log("资源更新完成>>>>>>>",event.getAssetId());
            //let assetId=event.getAssetId();
            //@ts-ignore
           // let ext=jsb.fileUtils.getFileExtension(assetId);
            //console.log("ext>>>>>>>",ext)
            /*
            cc.assetManager.cacheManager.cacheFile(`file:${this._storagePath}/${assetId}`,assetId,this._bundleName);
            */
           if(!this._isUnity){
                let assetId=event.getAssetId();
                // console.log("更新资源完成>>>>>>",assetId);
                let key="",url="";
                if(this._bundleName!="mainpackage"){
                    key=`assets/${this._bundleName}/${assetId}`;
                    url=key;
                }else{
                    key=assetId;
                    url=assetId;
                }
                //@ts-ignore           
                //cc.assetManager.cacheManager.cacheFile(key,url,this._bundleName);
    
                this._updateTempString+=`#${this._bundleName}_${key}_${url}`;
                jsb.fileUtils.writeStringToFile(this._updateTempString,this._tempPath);
           }

        }else if(code==jsb.EventAssetsManager.ERROR_UPDATING){
            /*
            console.log("下载错误",event.getMessage(),event.getAssetId());
            this._updating = false;
            this._canRetry = true;
            failed = true;*/
        }else if(code==jsb.EventAssetsManager.UPDATE_FAILED){
            console.log("更新失败",event.getMessage(),event.getAssetId());
            this._updating = false;
            this._canRetry = true;
            failed = true;
        }

        if (failed) {
            this.retry()
            return
        }

        this.emit(UpdateEvent.UPDATE,this._key,event.getEventCode(),loadedBytes,totalBytes)
    }

    _saveCacheFile(){
        //"assets/gamecore/index.jsc":{"bundle":"mainpackage","url":"assets/gamecore/index.jsc","lastTime":1629512099460}
        let path=jsb.fileUtils.getWritablePath()+"gamecaches/cacheList.json";
        let cacheData=jsb.fileUtils.getStringFromFile(path);
        cacheData=JSON.parse(cacheData);
        let fileListInfo=this._updateTempString.split("#");
        for(let i=0;i<fileListInfo.length;i++){
            if(fileListInfo[i]=="")continue;
            let info=fileListInfo[i].split("_");
            cacheData["files"][info[1]]={bundle:info[0],url:info[2],lastTime:cc.sys.now()}
        }
        jsb.fileUtils.writeStringToFile(JSON.stringify(cacheData),path);
        //删除temp文件
        jsb.fileUtils.removeFile(this._tempPath);
    }

    checkUpdate(itUrl:string) {
        console.log("itUrl>>>>>>>",itUrl);
        if(!this._am){
            this._failCount=0
            // Init with empty manifest url for testing custom manifest
            this._am = new jsb.AssetsManager(this._localUrl, this._storagePath, this._versionCompareHandle.bind(this));
           
            // Setup the verification callback, but we don't have md5 check function yet, so only print some message
            // Return true if the verification passed, otherwise return false
            this._am.setVerifyCallback(function (path, asset) {
                // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
                let compressed = asset.compressed;
                // Retrieve the correct md5 value.
                let expectedMD5 = asset.md5;
                // asset.path is relative path and path is absolute.
                let relativePath = asset.path;
                // The size of asset file, but this value could be absent.
                let size = asset.size;
                if (compressed) {
                    return true;
                }
                else {
                    return true;
                }
            });
            /*
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this._localUrl);
            }*/

            console.log("am path>>>>>",this._localUrl,itUrl,this._storagePath);
            if(itUrl){
                //@ts-ignore
                this._am.setVersionUrl(itUrl);
            }
        }


        //this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        //cc.eventManager.addListener(this._checkListener, 1);

        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
    }

    _downLoadFile(){
        this._failCount++;
        this._canRetry = false;
        this._am.downloadFailedAssets();
    }

    retry() {
        if (!this._updating && this._canRetry) {
            if(this._failCount<3){
                this._downLoadFile();
            }else{
                this.emit(UpdateEvent.DOWNLOADERROR);
            }
        }
    }

    hotUpdate () {
        if (this._am && !this._updating) {
            // this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            // cc.eventManager.addListener(this._updateListener, 1);

            this._am.setEventCallback(this.updateCb.bind(this));

            /*
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                
                // Resolve md5 url
                this._am.loadLocalManifest(this._localUrl);
            }*/

            this._failCount = 0;
            this._am.update();
            //this.panel.updateBtn.active = false;
            this._updating=true;
        }
    }

    enterGame(){

    }

    _versionCompareHandle(versionA, versionB) {
        console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
        this._targetVersion=versionB;
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        for (let i = 0; i < vA.length; ++i) {
            let a = parseInt(vA[i]);
            let b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    }

    getTargetVersion(){
        return this._targetVersion;
    }

    destroy() {
        if(this._am){
            this._am.setVersionCompareHandle(null);
            this._am.setEventCallback(null);
            this._am=null;
        }
    }
    // update (dt) {}
}

