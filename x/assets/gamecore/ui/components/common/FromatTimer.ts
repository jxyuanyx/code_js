// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FromatTimer extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    tick:number=1;

    private _leftTime:number=0;
    private _fromatFun:Function=null;
    private _target:any=null;
    private _isRuning:boolean=false;
    private _currentTick:number=0;

    run(leftTime:number,fromatFun?:Function,target?:any){
        this._leftTime=leftTime;
        this._fromatFun=fromatFun;
        this._target=target;
        this._updateTimer();
        this._isRuning=true;
    }

    pause(){
        this._isRuning=false;
    }

    stop(){
        this._isRuning=false;
    }

    _updateTimer(){
        if(this._fromatFun){
            this.label.string=this._fromatFun.call(this._target,this._leftTime)
        }else{
            this.label.string=this._leftTime.toString();
        }
    }

    lateUpdate(dt){
        if(!this._isRuning)return;
        this._currentTick+=dt;
        if(this._leftTime<=0){
            this._isRuning=false;
            this._updateTimer();
            return;
        }
        if(this._currentTick>=this.tick){
            this._currentTick-=this.tick;
            this._leftTime-=this.tick;
            this._updateTimer();
        }
    }
}
