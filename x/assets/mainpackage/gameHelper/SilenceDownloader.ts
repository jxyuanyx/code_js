import { UpdateEvent, UpdateService } from "../../gamecore/tools/updateService";

export class DownLoadTask{
    public localManifest:string;    //本地清单文件
    public remotemanifest:string;   //远程清单文件
    public taskName:string;         //任务名称
    public bundleName:string;       //bundle名称
    public isUnity:boolean=false;   //是否unity游戏
    public roomType:number=0;       //游戏类型
    
    public progress:number;        //下载进度
    public total:number;           //总
    public success:boolean=false;  //是否成功下载

    public progressCallBack:Function;
    public completeCallBack:Function;
    public errorCallBack:Function;
}

export  class SilenceDownloadGame {
    
    private static  _download:SilenceDownloadGame;

    private _tasks:Map<number,DownLoadTask>=new Map();

    private _updateService=null;

    private _currentTask:DownLoadTask;
   

    static getInstance():SilenceDownloadGame{
        if(!this._download){
            this._download=new SilenceDownloadGame();
            this._download.init();
        }
        return this._download;
    }

    init(){
        
    }

    _startDownload(){
        let ret=this._getNextDownTask();
        if(!ret)return;
        if(this._currentTask.bundleName=="game102"){
            cc.error("game102开始下载了》》》》》》》》》》")
        }
        this._updateService=new UpdateService();
        this._updateService.on(UpdateEvent.CHECK,this._onCheckCb,this);
        this._updateService.on(UpdateEvent.UPDATE,this._onUpdateCb,this);
        this._updateService.on(UpdateEvent.DOWNLOADERROR,this._onDownLoadError,this);
        this._updateService.setManifest(this._currentTask.localManifest,this._currentTask.bundleName,this._currentTask.isUnity);
        this._updateService.checkUpdate(this._currentTask.remotemanifest);
    }

    _onDownLoadError(){
        //移除当前正在下载的游戏
        if(this._currentTask.errorCallBack){
            this._currentTask.errorCallBack();
        }else{
            this.removeTask(this._currentTask.roomType);
            this._startDownload();
        }
    }

    _onUpdateCb(key:string,code:number,progress:number,total:number){
        switch (code) {
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.sys.localStorage.setItem(key+"_version",this._updateService.getTargetVersion() || "1.0.0");
                this._currentTask.success=true;
                this._currentTask.completeCallBack?.();
                this.removeTask(this._currentTask.roomType);
                this._startDownload();
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                if(progress>0){
                   this._currentTask.progress=progress;
                   this._currentTask.total=total;
                   this._currentTask.progressCallBack?.(progress,total);
                }
                break;
        }
    }

    _onCheckCb(key:string,code:number){
        switch (code){
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this._updateService.hotUpdate();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.sys.localStorage.setItem(key+"_version",this._updateService.getTargetVersion() || "1.0.0");
                this._currentTask.success=true;
                this.removeTask(this._currentTask.roomType);
                this._startDownload();
                break;
        }
    }

    _getNextDownTask(){
        let entries=this._tasks.entries();
        let next=entries.next();
        while(!next.done){
            let task=next.value[1];
            if(!task.success){
                if(task==this._currentTask){
                    return false;
                }else{
                    this._currentTask=task;
                    return true;
                }
            }
            next=entries.next();       
        }
        return false;
    }

    removeTask(roomType,autoDestory:boolean=true){
        this._tasks.delete(roomType);
        if(autoDestory){
            this._updateService.destroy();
            if(this._tasks.size==0){
                this._currentTask=null;
            }
        }
    }

    addTask(task:DownLoadTask){
        if(this._tasks.get(task.roomType)){
            cc.error("download task already exist!,taskName:"+task.taskName)
            return;
        }
        //添加下载任务
        cc.log("add download task",JSON.stringify(task))
        this._tasks.set(task.roomType,task);
    }

    start(){
        cc.log("start download>>>>>")
        this._startDownload();
    }

    retry(){
        if(this._updateService){
            this._updateService.emit(UpdateEvent.REDOWNLOAD);
        }
    }

    getCurrentTask():DownLoadTask{
        return this._currentTask;
    }

    setTaskCallBack(progressCallBack:Function,completeCallBack:Function,errorCallBack:Function){
        if(this._currentTask){
            this._currentTask.progressCallBack=progressCallBack;
            this._currentTask.completeCallBack=completeCallBack;
            this._currentTask.errorCallBack=errorCallBack;
        }
    }
}