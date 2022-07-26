// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { core } from "../../gamecore/net/protos/proto";
import GameHelper from "../../gamecore/tools/GameHelper";
import { BaseComponent } from "../../gamecore/ui/baseview/imp/BaseComponent";
import Timer from "../../gamecore/ui/components/common/Timer";
import { getHead } from "../../mainpackage/gameHelper/AthHelper";
import { ludo } from "../net/protos/ludo";

const {ccclass, property} = cc._decorator;

export const ROLL_CLICK="roll_click"

const SCORE_COLOR=["#024920","#8A570E","#033F7B","#6A1107"]

@ccclass
export class LudoPlayer extends BaseComponent {

    UIBindData={
        name:"",
        head:null,
        headbox:null,
        sz:null,
        progress:null,
       // lightbox:null,
        scoreIcon:null,
        score:"0"
    }

    @property(cc.Node)
    rollSequence:cc.Node

    @property(cc.Node)
    rollView:cc.Node;

    @property(sp.Skeleton)
    szAnim:sp.Skeleton=null;

    @property(Timer)
    timer:Timer=null;


    private _info:ludo.LudoPlayerInfo=null;

    private _cliendId:number=-1;

    onLoad(){
        super.onLoad();
        this.rollView.active=false;
        this.rollSequence.active=false;
       // this.UI_SPS.get("lightbox").active=false;
    }

    init(userInfo:ludo.LudoPlayerInfo,clientId:number){
        this._cliendId=clientId;
        this._info=userInfo;
        this.UIBindData.name=GameHelper.subStr(userInfo.nick);
        getHead(userInfo.avatar,this.UIBindData.head,userInfo.uid);
    }

    get seat(){
        return this._info?.seat_id;
    }

    setHeadBox(index){
        this.UIBindData.headbox=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("headbox"+(index+1));
        this.UIBindData.progress=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("progress"+(index+1));
       // this.UIBindData.lightbox=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("lightbox"+(index+1));
        this.UIBindData.scoreIcon=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("jy"+(index+1));
        this.UI_LBS.get("score").color=cc.Color.WHITE.fromHEX(SCORE_COLOR[index]);
    }

    showRoll(){
        this.rollView.active=true;
        this.rollView.scale=0;
        this.UIBindData.sz=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame((this._cliendId==0)?"sz_self":"sz_other");
        this.szAnim.node.active=false;
        this.UI_SPS.get("sz").active=true;
        cc.tween(this.rollView).to(0.1,{scale:1}).start();
    }

    hideRoll(){
        if(this.szAnim.node.active==false)return;
        this.szAnim.node.active=false;
        cc.tween(this.rollView).to(0.1,{scale:0}).set({active:false}).start();
    }

    setRollPoint(point:number){
        this.UIBindData.sz=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("sz_p"+point);
        this.UI_SPS.get("sz").active=false;
        this.szAnim.node.active=true;
        this.szAnim.setAnimation(0,"bai_"+point,false);
    }

    onRollClick(){
        //发送Roll点协议
        cc.game.emit(ROLL_CLICK,this._cliendId);
    }

    startTimer(lessTime:number,total:number,progressCb?:Function,cb?:Function){
        this.timer.startTimer(total,lessTime,progressCb,cb)
      
    }

    hideTimer(){
        this.timer.stopTimer();
    }

    setScore(score:number){
        this.UIBindData.score=score.toString();
    }

    addRollPoint(point:number){
        let node=new cc.Node();
        let  sp=node.addComponent(cc.Sprite);
        sp.spriteFrame=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("sz_p"+point);
        node.scale=0.5;
        this.rollSequence.addChild(node);
    }

    showRollPanel(){
        this.rollSequence.active=true;
    }

    hideRollPanel(){
        this.rollSequence.active=false;
        this.rollSequence.destroyAllChildren();
    }

    // update (dt) {}
}
