import App from "../../gamecore/App";
import { BaseComponent } from "../../gamecore/ui/baseview/imp/BaseComponent";

const {ccclass, property} = cc._decorator;

export const CHESS_CLICK="chess_click";

@ccclass
export  class Chess extends BaseComponent {

    UIBindData={
        icon:null,
        light:null,
    }

    private _index:number;

    private _clientId:number;

    private _step:number=0;

    private _canClick:boolean=false;

    private _id:number=0;

    private _offset:cc.Vec2;

    onLoad(): void {
        super.onLoad();
        this.UI_SPS.get("light").active=false;
        this._offset=this.node.getPosition();
    }

    get offset(){
        return this._offset;
    }

    onTouchViewClick(){
        if(this._canClick){
            cc.game.emit(CHESS_CLICK,this._clientId,this._index,this._id);
        }
    }


    init(colorIndex:number,index:number,clientId:number){
        this.UIBindData.icon=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("dot"+(colorIndex+1));
        this.UIBindData.light=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("light"+(colorIndex+1));
        this._index=index;
        this._clientId=clientId;
        this._step=0;
    }

    addStep(step:number){
        this._step+=step;
    }

    get step():number{
        return this._step;
    }


    set id(val:number){
        this._id=val;
    }

    get id(){
        return this._id;
    }

    light(){
        this.UI_SPS.get("light").active=true;
        this._canClick=true;
        let time=1;
        cc.tween(this.node).repeatForever(
            cc.tween(this.node)
            .to(time/3,{scaleX:0.9,scaleY:1.1})
            .to(time/3,{scaleX:1.1,scaleY:0.9})
            .to(time/3,{scaleX:1,scaleY:1})
            .delay(0.1)
        ).start();
    }

    hideLight(){
        this.UI_SPS.get("light").active=false;
        this.node.stopAllActions();
        this._canClick=false;
    }
}