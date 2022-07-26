// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { playEffect } from "../../../mainpackage/gameHelper/AthHelper";
import { Game101Prefab } from "../enum/game101_enum";
import game101_animTop from "../view/game101_animTop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class game101_animManager {
    private static _Instance:game101_animManager;
    private _effectPool:cc.NodePool = new cc.NodePool();
    private _effect:cc.Node = null;

    static getInstance(){
        if (!this._Instance) {
            this._Instance = new game101_animManager();
            App.BundleManager.loadAssest(Game101Prefab.effect,cc.Prefab,(asset:any)=>{
                this._Instance._effect = asset;
            },this,"game101");
        }
        return this._Instance;
    }

    enter(){
        this._effectPool = new cc.NodePool(); 
    }

    exit(){
        this._effectPool.clear();
        // this._effect.destroy();
        // this._effect = null;
    }

    

    private _reAnim(effect){
        let num = this._effectPool.size();
        if (num < 5) {
            effect.active = false;
            this._effectPool.put(effect);
        }
        else{
            effect.removeFromParent();
            effect.destroy();
        }
    }

    private _getAnim(){
        let effect = this._effectPool.get();
        if (effect) {
        }
        else{
            effect = cc.instantiate(this._effect);
        }
        return effect;
    }


    playEffect(Node,speed:number,loop:boolean = false,path:string,anim:string,pos:cc.Vec3,ifReturn:boolean = true,cb?:Function,target?:any,comcb?:Function){
        let effect = this._getAnim();
        Node.addChild(effect);
        playEffect(speed,path,effect.getComponent(sp.Skeleton),anim,loop,"game101",()=>{
            if (ifReturn) {
                this._reAnim(effect);
                
            }
            if(cb)cb();
        },target?target:null,()=>{
            if(comcb)comcb();
        });
        effect.position = pos;
        effect.active = true;
        return effect;
    }
}
