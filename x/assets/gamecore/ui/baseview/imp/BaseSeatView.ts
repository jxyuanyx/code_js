import {BaseComponent} from "./BaseComponent";

export class BaseSeatView extends BaseComponent{

    protected _clientId:number;
    protected _info:any;
    /**
     * 重置
     */
    reset(){

    }

    setClientId(clientId:number){
        this._clientId=clientId;
    }

    setData(info:any):void{
        this._info=info;

        this._flushInfo();
    }

    _flushInfo(){

    }

}