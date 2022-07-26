import App from "../../App";
import { TagEnum } from "../../enums/TagEnum";
import { GameEvents } from "../../events/GameEvents";
import { BaseScene } from "../../ui/baseview/imp/BaseScene";
import { Package } from "../Package";
import { IProto } from "../IProto";
import { RespProto } from "../models/RespProto";
import { ReqProto } from "../models/ReqProto";
import { IGameNet } from "../IGameNet";
import { BoxSerializer } from "./BoxSerializer";
import { core } from "../protos/proto";
import GameHelper from "../../tools/GameHelper";


export default class GameNet implements IGameNet{

    private _host:string;
    private _port:number;
    private _socket:WebSocket;
    private _needRecon:boolean=true;
    private _maxReconCount=3;
    private _currentReconIndex=0;

    private _isClosed:boolean=false;

    private _bosSerializer=new BoxSerializer();

    flushingUI=false;

    /**
     * 消息队列
     */
    private _responseQueue:Package[];

    private _protos:IProto[];

    private _commonData:any={};

    private _sn:number=0;

    private _pkgDelayTime=0;

    private _pkgCurrentDelayTime=0;

    private _tickTime=0.05;

    constructor(){

        this._responseQueue=[];
        this._protos=[];

        setInterval(()=>{
            this._pkgCurrentDelayTime+=this._tickTime;
            if(this._responseQueue.length==0 || this.flushingUI || this._pkgCurrentDelayTime<this._pkgDelayTime)return;
            let pkg=this._responseQueue.shift();
            this._exePkg(pkg);
            this._pkgCurrentDelayTime=0;
        },this._tickTime*1000);
    }

    addProto(proto: IProto) {
        this._protos.push(proto);
    }
    

    setCommonInfo(uid: number, token: string, version: number, channel: string) {
        this._commonData["uid"]=uid;
        this._commonData["token"]=token;
        this._commonData["version"]=version;
         this._commonData["channel"]=channel;
        this._commonData["random"]=Math.floor(Math.random() * 100000000);
        this._commonData["time"]=cc.sys.now();
        this._commonData["time_zone"]=5;
    }

    

    updateRoomInfo(deskId: number, roomId: number) {
        this._commonData["desk_id"]=deskId;
        this._commonData["room_id"]=roomId;
    }

    clearRoomInfo() {
        this._commonData["desk_id"]=0;
        this._commonData["room_id"]=0;
    }

    reset() {
        this._socket.onclose=null;
        this._socket.onerror=null;
        this._socket.onopen=null;
        this._socket.onmessage=null;
        this._socket.close();
    }

    send(proto: ReqProto,data?:any) {
        let req=proto.protoType.create(data || {});
        let buffer=proto.protoType.encode(req).finish()
        let safeShellData=Object.assign({},this._commonData);
        safeShellData["body"]=buffer;

        let safeShell=core.SafeShell.create(safeShellData);

        let sendDataBuffer=core.SafeShell.encode(safeShell).finish();

        let body=this._bosSerializer.packBox(proto.reqCmd,++this._sn,sendDataBuffer);

        this._socket.send(body);

        App.NativeManager.echo("webscoket cmd:"+proto.reqCmd);
    }

    _onNetError(err:MessageEvent){
        App.NativeManager.echo("连接错误:"+err.data);
        /*
        this.close();
        cc.game.emit(GameEvents.NET_ERROR);
        this._isClosed=true;*/
    }

    _onNetClose(){
        App.NativeManager.echo("连接断开:"+(new Date()).toLocaleTimeString() );
        if(this._needRecon){
            this._currentReconIndex++;
            console.log(">>>>>>>>重连",this._currentReconIndex)
            if(this._currentReconIndex>=this._maxReconCount){
                this.close();
                cc.game.emit(GameEvents.NET_RECONNECT_TIMEOUT);
            }else{
                this._closeNet();
                this.connect(this._host,this._port);
            }
        }
        this._isClosed=true;
    }

    _onNetOpen(){
        App.NativeManager.echo(`成功连接到服务器[${this._host}:${this._port}]`);

        this._responseQueue.splice(0,this._responseQueue.length);
        cc.game.emit(GameEvents.NET_OPEN);
        this._currentReconIndex=0;
        this._isClosed=false;
    }

    _onNetMessage(event:MessageEvent){
        let boxData = this._bosSerializer.unpackBox(event.data);
        let topic=boxData.cmd;    
        
        let respProto:RespProto;
        for(let i=0;i<this._protos.length;i++){
            let proto=this._protos[i];
            respProto=proto.getRespProtoByKey(topic);
            if(respProto)break;
        }
        if (respProto) {
             //如果发生错误则直接妆拦截
            if(boxData.ret!=undefined&&boxData.ret!=0){
                App.DlgManager.hideDlg("loading");
                //cc.game.emit(GameEvents.ERROR_TIP,boxData.ret,boxData.cmd,GameHelper.Uint8ArrayToString(boxData.body));
                //GameHelper.showTopTip(`errorCode:${pkg.body.err},${App.DataManager.getExtInfo("error_code")?.[pkg.body.err]}`)
                return;
            }
            try {
                let safeShell=core.SafeShell.decode(new Uint8Array(boxData.body));
                let resp = respProto.protoType.decode(safeShell.body);
                let pkg: Package = new Package(topic, resp);
                cc.log("rev pkg>>>>::",cc.sys.now(),pkg,this._responseQueue.length?this._responseQueue[0].cmd:"null")
                if(this.flushingUI ||  respProto.needSquenece){
                    this._responseQueue.push(pkg);
                }else{
                    this._exePkg(pkg);
                }
            }catch (e) {
                App.LogManager.e("解析出错", topic,boxData.body,e);
            }
        } else {
            App.LogManager.e("解析协议不存在", topic);
        }
    }

    async _exePkg(pkg:Package){
        let currentScene=cc.director.getScene().getChildByName("Canvas");
        let com=currentScene.getComponent(BaseScene);
        if(com){
            this._pkgDelayTime= com.onMessage(pkg) || 0;
        }
        //推送事件
        cc.game.emit(GameEvents.NET_MESSAGE,pkg);
        //App.LogManager.i(TagEnum.NET_MESSAGE,pkg);
    }

    

    close(): void {
        this._responseQueue.splice(0,this._responseQueue.length);
        cc.game.emit(GameEvents.NET_CLOSE);
        this._needRecon=false;
        this._currentReconIndex=0;
        if(this._socket){
            this._socket.onclose=null;
            this._socket.onerror=null;
            this._socket.onopen=null;
            this._socket.onmessage=null;
            this._socket.close();
            this._socket=null;
        }
        this._isClosed=true;
    }

    _closeNet(){
        if(this._socket){
            this._socket.onclose=null;
            this._socket.onerror=null;
            this._socket.onopen=null;
            this._socket.onmessage=null;
            this._socket.close();
            this._socket=null;
        }
        this._isClosed=true;
    }

    connect(host: string, port: number): void {
        this._host=host;
        this._port=port;
        cc.game.emit(GameEvents.NET_CONNECTING);
        if(this._socket==null){
            this._responseQueue.splice(0,this._responseQueue.length);

            this._needRecon=true;
            this._host=host;
            this._port=port;
            this._socket = new WebSocket(`ws://${host}:${port}`);
            this._socket.binaryType = "arraybuffer";
            this._socket.onclose=this._onNetClose.bind(this);
            this._socket.onerror=this._onNetError.bind(this);
            this._socket.onopen=this._onNetOpen.bind(this);
            this._socket.onmessage=this._onNetMessage.bind(this);
        }
      
    }

    isClosed():boolean{
        return this._isClosed;
    }

    getRoomId():number{
        return this._commonData?.room_id || 0;
    }

    getDeskId():number{
        return this._commonData?.desk_id || 0;
    }

    needReconnect(){
        //socket断线或者包队列数据过多
        App.NativeManager.echo("needReconnect>>>>>:"+this._isClosed+"   "+this._responseQueue.length)
        return this._isClosed || (this._responseQueue.length>=30)
    }
    
    clearSequence(){
        this._responseQueue.splice(0,this._responseQueue.length);
    }
}
