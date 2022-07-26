// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import { playEffect } from "../../../mainpackage/gameHelper/AthHelper";
import { animVo } from "../data/game101_vo";


const {ccclass, property} = cc._decorator;
const GROUPNUM:number=4;
const ANIMMAX:number=6;
const ANIMSPEED:number=1;
const CTANIMHEIGHT:number = 100;
const ANIMBRGINY:number = -200;
@ccclass
export default class game101_animTop extends BaseComponent {

    @property(cc.Prefab)
    pf_ct:cc.Prefab = null

    @property([cc.Node])
    n_ctl:cc.Node[] = [];

    private _ctAnimInfo:animVo[][];

    private _ctPool:cc.NodePool;

    private _animStatu:boolean[][];

    private _endTime:number[] = [];

    onLoad(){
        super.onLoad();
        this._init();
    }

    private _init(){
        this._ctPool = new cc.NodePool();
        this._ctAnimInfo = [];
        this._animStatu = [];
        for (let index = 0; index < GROUPNUM; index++) {
            this._endTime[index] = 0;
            this._ctAnimInfo[index] = [];
            this._animStatu[index] = [];
            for (let i = 0; i < ANIMMAX; i++) {
                this._animStatu[index][i] = true;
            }
        }
    }

    private _checkAnimPlay(index:number){
        let isPlay:boolean = this.n_ctl[index].childrenCount > 0?false:true;
        return isPlay;
    }

    private _createAnimInfo(type:string,path:string,index:number,cb?:Function,target?:any,comcb?:Function){
        let animInfo:animVo = new animVo;
        animInfo.isLoop = false;
        animInfo.path = path;
        animInfo.anim = type;
        animInfo.cb = cb;
        animInfo.target = target;
        animInfo.comcb = comcb;
        animInfo.index = index;
        return animInfo;
    }

    private _getCTAnim(){
        let anim:cc.Node = this._ctPool.get();
        anim = anim||cc.instantiate(this.pf_ct);
        return anim;
    }

    private _reCTAnim(anim:cc.Node){
        let num = this._ctPool.size();
        if (num < 5) {
            this._ctPool.put(anim);
        }
        else{
            anim.removeFromParent();
            anim.destroy();
        }
    }

    private _ctQueueAdd(index:number,type:string,path:string,cb?:Function,target?:any,comcb?:Function){
        let animInfo = this._createAnimInfo(type,path,index,cb,target,comcb);
        this._ctAnimInfo[index].push(animInfo);
    }

    private _getCTAnimIndex(index:number){
        for (let i = 0; i < this._animStatu[index].length; i++) {
            if (this._animStatu[index][i]) {
                this._animStatu[index][i] = false;
                return i;
            }
        }
        return -1;
    }

    private _reCTAnimIndex(index:number,i:number){
        this._animStatu[index][i] = true;
    }

    private _getCTAnimPos(index:number){
        let x:number = 0;
        let y:number = 0;
        y = ANIMBRGINY + CTANIMHEIGHT*index;
        return new cc.Vec3(x,y);
    }

    private _checkQueueAnim(index:number){
        let animInfo:animVo = this._ctAnimInfo[index].shift();
        if (animInfo) {
            this._playAnimCT(animInfo.index,animInfo.anim,animInfo.path,animInfo.cb,animInfo.target,animInfo.comcb);
        }
    }

    private _playAnimCT(index:number,anim:string,path:string,cb?:Function,target?:any,comcb?:Function){
        this._endTime[index] = cc.sys.now();
        let i = this._getCTAnimIndex(index);
        let pos = this._getCTAnimPos(i);
        let effect = this._getCTAnim();
        this.n_ctl[index].addChild(effect);
        effect.position = pos;
        effect.active = true;
        cc.tween(this.n_ctl[index])
        .call(()=>{
            playEffect(ANIMSPEED,path,effect.getChildByName("zixing").getComponent(sp.Skeleton),anim,false,"game101",()=>{
                this._reCTAnimIndex(index,i);
                this._reCTAnim(effect);
                if(cb)cb(index);
            },target?target:null,()=>{
                comcb&&comcb(index);
            });
        })
        .delay(0.5)
        .call(()=>{
            this._checkQueueAnim(index);
        })
        .start();
    }

    playCTAnim(index:number,anim:string,path:string,cb?:Function,target?:any,comcb?:Function){
        let isPlay:boolean = this._checkAnimPlay(index);
        let timeoff:number = cc.sys.now() - this._endTime[index];
        if (isPlay||timeoff>500) {
            this._playAnimCT(index,anim,path,cb,target,comcb);
        }
        else{
            this._ctQueueAdd(index,anim,path,cb,target,comcb);
        }
    }

    clearAnimCT(index:number){
        cc.Tween.stopAllByTarget(this.n_ctl[index]);
        this.n_ctl[index].destroyAllChildren();
    }

    clearQueueAnim(index){
        for (let n = 0; n < this._ctAnimInfo.length; n++) {
            if(n==index){
                this._ctAnimInfo[index].splice(0,this._ctAnimInfo[index].length);
                break;
            }
        }
    }
}
