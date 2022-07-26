// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const COLOR1=new cc.Color(0,255,0);
const COLOR2=new cc.Color(255,153,0);
const COLOR3=new cc.Color(255,105,20);
const COLOR4=new cc.Color(255,0,0);

@ccclass
export  default class Timer extends cc.Component{
    @property
    private less: number = 10;
    @property
    private total: number = 10;
    @property(cc.Node)
    private effect: cc.Node = null;

    @property({displayName:"是否颜色渐变"})
    has_gradual: boolean = true;

    private _timer:cc.Sprite;

    private _isStart:boolean=false;

    private _cb:Function=null;

    private _complete:Function=null;

    private _currentIntTime:number=0;

    onLoad () {
        let sp=this.node.getComponent(cc.Sprite)
        sp.type=cc.Sprite.Type.FILLED;
        sp.fillType=cc.Sprite.FillType.RADIAL;
        sp.fillCenter=cc.v2(0.5,0.5);
        sp.fillStart=0.25;
        sp.fillRange=1;

        this._timer=sp

        this._isStart=false

        this._cb=null

        this._currentIntTime=0

        this.node.active=false

        if(this.effect)this.effect.active=false
    }

    startTimer(total:number,less:number,cb:Function,onComplete:Function){
        if(less==undefined)less=total
        if(this.effect)this.effect.active=true
        this.total=total
        this.less=less
        this._cb=cb
        this._complete=onComplete;
        this._setTimerProcess()
        this.node.active=true
        this._isStart=true
        this._currentIntTime=this.less

        var lessScale=less/total
        if(this.has_gradual){
            if(lessScale>0.5){
                this.node.color=COLOR1;
            }else if(lessScale>0.25){
                this.node.color=COLOR2;
            }else{
                this.node.color=COLOR3;
            }
            this.node.runAction(
                cc.tintTo(this.less,255,0,0)
            )
        }
        this._isStart=true;
    }

    _setTimerProcess(){
        if(!this._timer)return;
        this._timer.fillRange=this.less/this.total
        if(this.effect){
            //计算出位置和角度
            let angle=this._timer.fillRange*360
            this.effect.angle=angle
        }
    }

    stopTimer () {
        this._isStart=false
        this.node.active=false
        if(this.effect)this.effect.active=false
    }

    update (dt) {
        if(this._isStart){
            this.less-=dt

            let isChange=false
            if(this.less<=0){
                this.less=0
                this._currentIntTime=0
            }else{
                let time=Math.floor(this.less)+1
                isChange=(this._currentIntTime!=time)
                this._currentIntTime=time
            }

            this._setTimerProcess()

            if(this._cb){
                this._cb(this.less,this._currentIntTime,isChange)
            }

            if(this.less<=0){
                this._isStart=false
                this._complete&&this._complete();
            }
        }
    }
}