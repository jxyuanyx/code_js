// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { timeStamp } from "node:console";
import { loadavg } from "node:os";
import App from "../../../gamecore/App";
import Card from "../../../gamecore/ui/baseview/models/Card";
import { Game100CardZone, Game100Events } from "../../scripts/game100_enum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game100Card extends Card {
    
    @property(cc.Animation)
    finishAnim:cc.Animation=null;    

    @property(cc.Node)
    whiteLight:cc.Node=null

    public index:number=0;

    public cardZone:Game100CardZone;


    set metaData(meta: number) {

        if(!this._cardAtlas)this._cardAtlas=App.BundleManager.getCommonAtlas("game100/poker");

        if(!meta){
            this.cardBack.spriteFrame=this._cardAtlas.getSpriteFrame("cardback");
            return;
        }
        this._metaData = meta;

        this._cardValue=meta&0xf;

        this._cardType=(meta>>4)-1;

        this.cardFront.spriteFrame=this._cardAtlas.getSpriteFrame(meta.toString(16));

        this.cardFront.node.active=true;


    }

    get metaData(){
        return this._metaData;
    }

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START,this._onTouch,this)

        this.finishAnim.on(cc.Animation.EventType.FINISHED,()=>{
            this.finishAnim.node.active=false;
        })

        this.whiteLight.active=false;
    }

    _onTouch(event:cc.Event.EventTouch){
        if(!this._canSelect)return;
        super._onTouch(event);
        let location=event.getLocation();
        location=this.node.convertToNodeSpaceAR(location);
        cc.game.emit(Game100Events.ONMOVECARD_START,this,location);
    }


    backCardPos(){
        this.node.setPosition(this._startPos);
    }

    playFinishAnim(){
        this.finishAnim.node.active=true;
        this.finishAnim.node.opacity=0;
        this.finishAnim.play();
    }

    playDestoryAnim(cb?:Function){
        let x=this.node.x+200;
        let y=this.node.y-Math.random()*400-400;
        let angle=720;
        let time=1;
        this.node.runAction(cc.sequence(
            cc.spawn(
                cc.jumpTo(time,x,y,100,1),
                cc.rotateTo(time,angle)
            ),
            cc.callFunc((node)=>{
                node.removeFromParent();
                node.destroy();
                //播放动画
                cb&&cb(x,y);
            })
        ))
        this.whiteLight.active=true;
        this.whiteLight.opacity=0;
        this.whiteLight.runAction(cc.sequence(
            cc.fadeIn(time),
            cc.callFunc(node=>node.active=false)
        ))
    }
}
