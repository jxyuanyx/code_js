// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameHelper from "../../gamecore/tools/GameHelper";
import BaseRoomView from "../../gamecore/ui/baseview/imp/BaseRoomView";
import RollNumGroup from "../../gamecore/ui/components/common/RollNumGroup";
import Game101Card from "../prefabs/card/Game101Card";
import { playEffect } from "../../mainpackage/gameHelper/AthHelper";
import App from "../../gamecore/App";
import { animVo } from "./data/game101_vo";
import { Game101CardZIndex, Game101CardZone, Game101Effect } from "./enum/game101_enum";
import { Game101Count } from "./ctrl/game101_count";

const {ccclass, property} = cc._decorator;

const GROUPNUM:number=4;

@ccclass
export default class Game101RoomView extends BaseRoomView {
    Game101CardsPos={
        CARDS:new cc.Vec3(-259.814,-338.487),
        CURRENTCARD:new cc.Vec3(27.703,-339.759),
        RETENTION:new cc.Vec3(241.812,-349.419),
        CARDGROUP:[new cc.Vec3(-249.41,189.622),new cc.Vec3(-82.41,189.622),new cc.Vec3(85.41,189.622),new cc.Vec3(252.41,189.622)]
    }

    UIBindData={
        time:"0",
        score0:0,
        score1:0,
        score2:0,
        score3:0,
        retimes:0,
        cards:0,
    }

    @property(cc.Prefab)
    cardDestroyPrefabs:cc.Prefab = null;

    @property(cc.Prefab)
    effect:cc.Prefab=null;

    @property(cc.Prefab)
    addScoreInstance:cc.Prefab=null;

    @property(cc.Prefab)
    img_bomb:cc.Prefab=null;

    @property(cc.Node)
    img_ready:cc.Node=null;

    @property(cc.Node)
    img_cardsarea:cc.Node=null;

    @property(cc.Node)
    img_retention:cc.Node=null;

    @property(cc.Node)
    node_card:cc.Node=null;

    @property(RollNumGroup)
    rollNumGroup:RollNumGroup=null;

    @property(cc.Node)
    bombToggle:cc.Node=null;

    private _scorePool:cc.NodePool;

    private _effectPool:cc.NodePool;
    
    private _time:number=0;

    private _currentCard:Game101Card;

    private _cards:Game101Card[];

    private _cardGroups:Game101Card[][];

    private _retentionCard:Game101Card;

    private _effect:cc.Node;

    private _bombPool:cc.NodePool;

    private _animInfo:animVo[];

    private _isAnim:boolean = true;

    private _groupAnim:cc.Node[];

    
    onLoad(){
        super.onLoad();

        this._initData();

    }

    _initData(){
        this._isAnim = true;
        this._animInfo = [];
        this._groupAnim = [];
        this._scorePool = new cc.NodePool();
        this._effectPool = new cc.NodePool();
        this._bombPool = new cc.NodePool();
        this._cards = [];
        this._cardGroups = [];
        for (let index = 0; index < GROUPNUM; index++) {
            this._cardGroups[index] = [];
        }
        this.setBombTimes(0);
        this.exitAllArr();
    }

    update(){
        if (!this._isAnim)return;
        let animInfo = this._animInfo.shift();
        if (animInfo) {
            this.playEffect(1.5,animInfo.isLoop,animInfo.path,animInfo.anim,animInfo.pos,true,()=>{
                if (animInfo.cb) {
                    animInfo.cb();
                }
                this._isAnim = true;

            },animInfo?.target,()=>{
                // if (animInfo.comcb) {
                    animInfo?.comcb?.(animInfo.index);
                // }
            });
            this._isAnim = false;
        }
    }

    playEffect(speed:number,loop:boolean = false,path:string,anim:string,pos:cc.Vec3,ifReturn:boolean = true,cb?:Function,target?:any,comcb?:Function){
        let effect = this._effectPool.get();
        if (effect) {
        }
        else{
            effect = cc.instantiate(this.effect);
        }
        this.node.addChild(effect);
        effect.position = pos;
        effect.active = true;
        playEffect(speed,path,effect.getComponent(sp.Skeleton),anim,loop,"game101",()=>{
            if (ifReturn) {
                this._effectPool.put(effect);
            }
            if(cb)cb();
        },target?target:null,()=>{
            if(comcb)comcb();
        });
        return effect;
    }

    exitAllArr(){
        for (let index = 0; index < 4; index++) {
            this.arrAnim(index,false);
        }
    }

    arrAnim(index:number,isShow:boolean = false){
        let img = this.node.getChildByName("img_group"+index)
        img.getChildByName("img_arr").active = isShow;
    }

    clearGroupTips(){
        while(this._groupAnim.length > 0){
            let effect = this._groupAnim.pop();
            // effect.getComponent(sp.Skeleton).loop = false;
            // effect.active = false;
            this._effectPool.put(effect);
        }
        this._groupAnim = [];
    }

    cardClearAnim(type:string,index:number,bomb:boolean = false){
        if (bomb)return;
        let x = this.node.getChildByName("img_group"+index).position.x;
        let y = this.node.getChildByName("img_group"+index).position.y;
        this.playEffect(1,true,Game101Effect.paixiaoshi,type,new cc.Vec3(x,y));
    }

    groupAnim(type:string,index:number){
        // this.clearGroupTips();
        let x = this.node.getChildByName("img_group"+index).position.x;
        let y = this.node.getChildByName("img_group"+index).position.y;
        // let y = this.node.getChildByName("btn_group"+index).position.y - this.node.getChildByName("btn_group"+index).height/2 + 80;
        if (type == "putong") {
            this._groupAnim.push(this.playEffect(1.5,true,Game101Effect.groupLight,type,new cc.Vec3(x,y),false));
        }
        else{
            this.playEffect(1.5,true,Game101Effect.groupLight,type,new cc.Vec3(x,y));
        }
        
    }

    cardTypeAnim(type:string,index:number,cb?:Function,target?:any,comcb?:Function){
        let pos:cc.Vec3
        if (index == -1) {
            pos = new cc.Vec3(0,0);
        }
        else{
            pos = this.node.getChildByName("btn_group"+index).position;
        }
         
        let animInfo:animVo = new animVo;
        animInfo.isLoop = false;
        animInfo.path = Game101Effect.cardType;
        animInfo.anim = type;
        animInfo.pos = pos;
        animInfo.cb = cb;
        animInfo.target = target;
        animInfo.comcb = comcb;
        animInfo.index = index;
        this._animInfo.push(animInfo);
    }

    finishAnim(cb:Function){
        // let pos = new cc.Vec3(0,0);
        // let animInfo:animVo = new animVo;
        // animInfo.isLoop = false;
        // animInfo.path = Game101Effect.yanhua;
        // animInfo.anim = "yanhua";
        // animInfo.pos = pos;
        // animInfo.cb = cb;
        // this._animInfo.push(animInfo);

        this.playEffect(1.5,false,Game101Effect.yanhua,"yanhua",new cc.Vec3(0,0));
    }

    bombAnim(index:number,cb:Function){
        let bomb = this._bombPool.get();
        if (bomb) {
            
        }
        else{
            bomb = cc.instantiate(this.img_bomb);
        }
        bomb.opacity = 0;
        this.node.addChild(bomb);
        let pos = this.node.getChildByName("img_score"+index).position
        bomb.position = new cc.Vec3(pos.x,pos.y+50);
        cc.tween(bomb)
        .to(0.5,{opacity:255,scale:1.5,y:bomb.y + 100})
        .to(0.5,{opacity:0,scale:1})
        .call(()=>{
            if (cb)cb();
            this._bombPool.put(bomb);
        })
        .start();
    }

    setBombTimes(times:number){
        for (let index = 0; index < 3; index++) {
            this.bombToggle.getChildByName("toggle_bomb"+index).getComponent(cc.Toggle).isChecked = index < times?true:false;
        }
    }


    cardGroupClear(index:number,isBomb:boolean = true){
        while(this._cardGroups[index].length > 0){
            let card=this._cardGroups[index].pop();
            if (isBomb) {
                this.backCardNode(card.node)
            }
            else{
                this.scheduleOnce(()=>{
                    let effect:cc.Node=cc.instantiate(this.cardDestroyPrefabs);
                    effect.setPosition(this.node.getChildByName("btn_group"+index).position);
                    this.node.addChild(effect);
                },0.2);
                
                this.backCardNode(card.node)
            }
            // this.backCardNode(this._cardGroups[index].pop().node);
        }
        this._cardGroups[index] = [];
    }

    setCardGroup(cards:number[],index:number){
        this.cardGroupClear(index);
        for (let i = 0; i < cards.length; i++) {
            let card=this.getCardNode(1).getComponent(Game101Card);
            this.node_card.addChild(card.node,Game101CardZIndex.CARDGROUP + i);
            card.setCardBack(true);
            card.cardZone=Game101CardZone.CARDGROUP;
            card.metaData = cards[i];
            let pos = Game101Count.getCardGroupsPos(this.node.getChildByName("btn_group"+index).position,i);
            card.node.setPosition(pos);
            card.setCardBack(false);
            this._cardGroups[index].push(card);
        }
            
    }

    cardGroupIncrease(index:number){
        if(this._currentCard == undefined)return;
        let card = this._currentCard;
        let len = this._cardGroups[index].length
        this._currentCard = null;
        let pos = Game101Count.getCardGroupsPos(this.node.getChildByName("btn_group"+index).position,len);
        this._cardGroups[index].push(card);
        cc.tween(card.node)
        .to(0.1,{position:pos,zIndex:Game101CardZIndex.CARDGROUP + len})
        .start();
    }

    setUndoEnable(val:boolean){
        let btn=this.UI_BTNS.get("undo").getComponent(cc.Button);
        btn.interactable=val;
        btn.node.opacity=val?255:150;
    }


    h2C(cb:Function){
        if (this._currentCard) {
            let x = this.node.getChildByName("img_cardsarea").x + this._currentCard.node.width / 2 + 8;
            let y = this.node.getChildByName("img_cardsarea").y;
            let card = this._currentCard;
            this._currentCard = null;
            cc.tween(card.node)
            .to(0.1,{position:new cc.Vec3(x+this._cards.length*2.4,y)})
            .call(()=>{
                card.setCardBack(true);
                this._cards.push(card);
            })
            .start();
        }

        let recard:Game101Card = this._retentionCard
        this._retentionCard = null;
        cc.tween(recard.node)
        .to(0.1,{position:this.img_ready.position,rotation:0})
        .call(()=>{
            recard.cardZone = Game101CardZone.CURRENT;
            this._currentCard = recard;
            if (cb) cb();
        })
        .start();
    }

    clearRetention(){
        if (!this._retentionCard)return
        this._retentionCard.node.removeFromParent();
        this._retentionCard.node.destroy();
        // if (this._retentionCard)this.backCardNode(this._retentionCard.node);
        this._retentionCard = null;
    }

    

    //设置滞留牌
    setRetention(hasAnim?:boolean,value?:number){
        cc.error("setRetention",value);
        if(hasAnim == undefined)hasAnim = true;
        if (this._retentionCard) this.backCardNode(this._retentionCard.node);
        this._retentionCard = null;
        let card:Game101Card;
        if(value){
            card = this.getCardNode(1).getComponent(Game101Card);
            card.metaData = value;
            card.node.name = "cardre"
            this.node_card.addChild(card.node,Game101CardZIndex.RETENTION);
        }
        else{
            card = this._currentCard;
            this._currentCard = null;
        }
        card.cardZone == Game101CardZone.RETENTION;
        card.setCardBack(false);
        this._retentionCard = card;
        if(hasAnim){
            cc.tween(this._retentionCard.node)
            .to(0.1,{rotation:10,position:this.img_retention.position})
            .start();
        }
        else{
            this._retentionCard.node.position = this.img_retention.position;
            this._retentionCard.node.rotation = 10;
        }
        
    }

    cardsClear(){
        while(this._cards.length > 0){
            this.backCardNode(this._cards.pop().node);
        }

    }

    //设置牌堆
    setCards(num:number){
        this.cardsClear();
        for (let index = 0; index < num; index++) {
            let card = this.getCardNode(index).getComponent(Game101Card);
            card.index=index;
            card.cardZone = Game101CardZone.CARDS;
            this.node_card.addChild(card.node,Game101CardZIndex.CARDS + index);
            let x = this.node.getChildByName("img_cardsarea").x + card.node.width / 2 + 8;
            let y = this.node.getChildByName("img_cardsarea").y;
            card.node.position = new cc.Vec3(x + 2.4*index,y);
            card.setCardBack(true);
            this._cards.push(card);
        }
    }

    //设置当前牌
    setCurrentCard(cardValue:number,hasAnim?:boolean,cb?:Function){
        App.LogManager.i("setCurrentCard:",cardValue,hasAnim);
        this.img_ready.getChildByName("img_wild").active = cardValue == 43||cardValue == 75?true:false;
        if (this._currentCard)this.backCardNode(this._currentCard.node);
        this._currentCard = null;
        if (!cardValue) {
            if (cb)cb();
            return;
        }
        if(hasAnim==undefined)hasAnim=true;
        
        let card:Game101Card;
        if(hasAnim){
            card = this._cards.pop();
            if (!card) {
                if (cb)cb();
                return ;
            }
        }
        else{
            card=this.getCardNode(1).getComponent(Game101Card);
            this.node_card.addChild(card.node,Game101CardZIndex.CURRENT);
        }
        card.setCardBack(true);
        card.cardZone=Game101CardZone.CURRENT;
        this._currentCard = card;
        if(hasAnim){
            cc.tween(this._currentCard.node)
            .to(0.1,{position:this.img_ready.position})
            .call(()=>{
                let com = this._currentCard;
                com.metaData = cardValue;
                com.turn(0.1)  
            })
            .call(cb)
            .start();
        }else{
            this._currentCard.metaData = cardValue;
            this._currentCard.node.setPosition(this.img_ready.position);
            this._currentCard.setCardBack(false);
            if (cb)cb();
        }
    }

    setCardsNum(num:number){
        this.UIBindData["cards"] = num;
    }

    setHoldTimes(times:number){
        this.UIBindData["retimes"] = times;
    }

    setAllScore(score:number,index:number,hasAnim:boolean = false){

        let add=score-this.rollNumGroup.getData();
        // let score = this.rollNumGroup.getData()+add;
        if(add==0)return;
        this.rollNumGroup.setData(score,500);
        if(hasAnim==false)return
        let view=this._scorePool.get() || cc.instantiate(this.addScoreInstance);
        this.node.addChild(view);
        let lb=view.getComponent(cc.Label);
        if(add<0){
            view.color=cc.Color.WHITE.fromHEX("#EA2C2C");
            lb.string=add.toString();
        }else{
            view.color=cc.Color.WHITE.fromHEX("#53E4AF");
            lb.string=`+${add}`
        }

        view.zIndex=300;
        let actions=[];
        actions.push(cc.delayTime(0.25));
        actions.push(cc.fadeOut(0.1));
        actions.push( cc.callFunc(node=>{
            this._scorePool.put(node);
        }));
        let targetPos:cc.Vec2=this.rollNumGroup.node.getPosition();
        targetPos.y-=this.rollNumGroup.node.height+35;
        if(add>0){
            let jumpTime:number=0.25;
            // if(moveUp){
            jumpTime=0.4;
            actions.splice(0,actions.length);
            actions.push(cc.delayTime(0.5));
            actions.push(cc.spawn(
                cc.moveTo(0.15,targetPos.x,targetPos.y+35),
                cc.fadeOut(0.15)
            ))
            actions.push( cc.callFunc(node=>{
                this._scorePool.put(node);
            }));
            // }
            view.opacity=0;
            actions.unshift(cc.jumpTo(jumpTime,targetPos,100,1));
            actions.unshift(cc.fadeIn(0.3));
            actions.unshift(cc.delayTime(0.8));
            let pos:cc.Vec3 = new cc.Vec3();
            if (index == -1) {
                pos = new cc.Vec3(0,0);
            }
            else{
                pos = this.node.getChildByName("img_score"+index).position
            }
            
            view.setPosition(new cc.Vec3(pos.x,pos.y+50));
        }else{
            view.opacity=0;
            actions.unshift(cc.fadeIn(0.1));
            view.setPosition(targetPos);
        }
        view.runAction(cc.sequence(actions));

    }

    setGroupScore(index:number,score:number,A:boolean = false,isAnim:boolean = false){
        if (score==this.UIBindData["score"+index]) {
            isAnim = false;
        }
        if (A && score+10<=21) {
            this.UIBindData["score"+index] = score+"/"+(score+10);
        }
        else{
            this.UIBindData["score"+index] = score;
        }
        if (isAnim) {
            let score = this.node.getChildByName("auto_lb_score"+index);
            cc.tween(score)
            .to(0.25,{scale:1.5})
            .to(0.25,{scale:1})
            .start();
        }
    }

    clearGroupScore(index:number){
        for (let index = 0; index < 4; index++) {
            this.UIBindData["score"+index] = 0;
        }
    }
    
    setLeftTime(time:number){
        this._time=time;
        this.UIBindData.time=GameHelper.fromatTimeNew(this._time);
    }

    startTimer(){
        this.unschedule(this._updateTime);
        if(this._time>0){
            this.schedule(this._updateTime,1)
        }
    }

    stopTimer(){
        this.unschedule(this._updateTime);
    }

    _updateTime(){
        this._time--;
        this.UIBindData.time=GameHelper.fromatTimeNew(this._time);
        if(this._time<=0){
            this.unschedule(this._updateTime);
        }
    }
}
