import { TagEnum } from "../../enums/TagEnum";
import { ILogManager } from "../ILogManager";

const LogPwd:string="000111";

export const LOG_LAYER="LogLayer";

export class LogManager implements ILogManager{

    private _logLayer:cc.Node=null;

    private _infoStr:string="";

    init(node:cc.Node){
        this._logLayer=node;
        cc.game.addPersistRootNode(this._logLayer);

        let closeBtn=this._logLayer.getChildByName("closebtn");
        closeBtn.on(cc.Node.EventType.TOUCH_START,()=>{
            this.hide();
        })

        let exportBtn=this._logLayer.getChildByName("exportbtn");
        exportBtn.on(cc.Node.EventType.TOUCH_START,()=>{
            
        })
    }

    i(...args: any[]): void {
        if(cc.sys.isNative){
            this._insertInfo(`[${new Date().toLocaleTimeString()}]: ${JSON.stringify(args)}`);
        }else{
            cc.log.apply(null,args);
        }
    }

    e(...args: any[]): void {
        if(cc.sys.isNative){
            this._insertInfo(`[${new Date().toLocaleTimeString()}]: ${JSON.stringify(args)}`);
        }else{
            cc.error.apply(null,args);
        }
    }

    show(){
       this._logLayer.active=true;
       this._logLayer.zIndex=999;
    }

    hide(){
        this._logLayer.active=false;
        this._logLayer.zIndex=-1;
    }

    _insertInfo(str:string){
        if(cc.sys.isNative){
            this._infoStr+=str+"\r\n";
            let maxCount=20000;
            if(this._infoStr.length>=maxCount){
                this._infoStr=this._infoStr.substr(this._infoStr.length-maxCount,maxCount);
            }
            let path=jsb.fileUtils.getWritablePath()+"log.out";
            jsb.fileUtils.writeStringToFile(this._infoStr,path);
        }
    }

    check(str:string):boolean{
        if(str.indexOf(LogPwd)!=-1){
            this.show();
            return true;
        }
        return false;
    }
}