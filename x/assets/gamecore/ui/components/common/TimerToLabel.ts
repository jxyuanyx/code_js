import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;

@ccclass
export  default class TimerToLabel extends cc.Component {
    @property
    private noticeTime: number = 3;
    @property
    private time: number = 10;

    @property(cc.Label)
    private lb_info: cc.Label = null;

    private _completeCb: Function;
    private _noticeCb:Function;
    private _cbTarget:any;
    private _formatCb:Function;

    onLoad() {

    }

    init(time:number,noticeCb:Function,completeCb:Function,target?:any,formatCb?:Function){
        this.time=time;
        this._completeCb=completeCb;
        this._noticeCb=noticeCb;
        this._cbTarget=target;
        this._formatCb=formatCb;
    }

    _flushTime(){
        this.lb_info.string=this._formatCb?this._formatCb(this.time):this.time.toString();
    }

    run(){
        this.schedule(()=>{
            this.time--;
            if(this.time<0){
                this.unscheduleAllCallbacks();
                this.node.active=false;
                this._completeCb&&this._completeCb.call(this._cbTarget);
                return;
            }
            if(this.time==this.noticeTime){
                this._noticeCb&&this._noticeCb.call(this._cbTarget);
            }
            this._flushTime();
        },1);
    }

    stop(){
        this.unscheduleAllCallbacks();
    }
}