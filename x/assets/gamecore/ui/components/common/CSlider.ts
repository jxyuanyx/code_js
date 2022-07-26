// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { threadId } from "worker_threads";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CSlider extends cc.Component {

    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.Node)
    nd_progress:cc.Node=null;

    private _callBack:Function=null;
    private _callBackTarget:any=null;

    onLoad(){
        this.slider.node.on("slide",this._onSlider,this);
    }

    _onSlider(){
        //cc.log(e)
        this.nd_progress.width=this.slider.progress*this.node.width;
        this._callBack&&this._callBack.call(this._callBackTarget,this.progress);
    }

    setChangeCallBack(fun:Function,target?:any){
        this._callBack=fun;
        this._callBackTarget=target;
    }

    get progress():number{
        return this.slider.progress;
    }

    set progress(val:number){
        this.slider.progress=val;
        this._onSlider();
    }

    // update (dt) {}
}
