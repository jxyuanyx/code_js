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
import { Game101Count } from "./ctrl/game101_count";
import { Game101ArrType, Game101CardAnim, Game101CardZIndex, Game101CardZone, Game101Effect, Game101Events } from "./enum/game101_enum";
import game101_animTop from "./view/game101_animTop";
import game101_animManager from "./manager/game101_animManager";
import { GameEvents } from "../../gamecore/events/GameEvents";
import { ComDlgData } from "../../mainpackage/dialogs/comdlg/ComDlg";
import GodGuide from "../../gamecore/ui/components/guid/GodGuide";
import { GUIDE_EVENTS, NewGuideHelper } from "../../gamecore/ui/components/newGuide/NewGuideHelper";
import { FristPlayTaskStep } from "./guide/FirstPlayTask";

const {ccclass, property} = cc._decorator;

const GROUPNUM:number=4;
const DCPOS:cc.Vec3 = new cc.Vec3(0,-300);
const ORIGIN:cc.Vec3 = new cc.Vec3(0,0);
const ORIGINSCORE:cc.Vec3 = new cc.Vec3(0,100);
const ARRSTART:cc.Vec3 = new cc.Vec3(0,-400);
const ARREND:cc.Vec3 = new cc.Vec3(0,-318);

const WRITE:cc.Color = new cc.Color(255,255,255,255);
const RED:cc.Color = new cc.Color(234,44,44,255);
const YELLOW:cc.Color = new cc.Color(255,242,30,255);
const PROTECT_SCORE:string="score";


@ccclass
export default class game101_roomViewAlone extends BaseRoomView {
    UIBindData={
        time:"0",
        score0:0,
        score1:0,
        score2:0,
        score3:0,
        retimes:0,
        cards:0,
        ready0:0,
        ready1:0,
        ready2:0,
        ready3:0,
        guideTip:""
    }

    @property(cc.Prefab)
    guideInstance:cc.Prefab;

    @property(cc.Node)
    guidTip:cc.Node;

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
    node_card:cc.Node=null;

    @property(cc.Node)
    node_show:cc.Node=null;

    @property(cc.Node)
    node_animTop:cc.Node=null;

    @property(cc.Node)
    node_animBo:cc.Node=null;

    @property(cc.Node)
    node_answer:cc.Node=null;

    @property(RollNumGroup)
    rollNumGroup:RollNumGroup=null;

    @property(cc.Node)
    bombToggle:cc.Node=null;

    @property(cc.Node)
    undoAnim:cc.Node = null;

    @property([cc.SpriteFrame])
    img_arr:cc.SpriteFrame[] = [];

    _guide:GodGuide=null;

    private _scorePool:cc.NodePool;

    private _effectPool:cc.NodePool;
    
    private _time:number=0;

    private _timeCheck:number=0;

    private _timeCheckXorCode=0;

    private _currentCard:Game101Card;

    private _cards:Game101Card[];

    private _cardGroups:Game101Card[][];

    private _retentionCard:Game101Card;

    private _bombPool:cc.NodePool;

    private _animInfo:animVo[];

    private _isAnim:boolean = true;

    private _groupAnim:cc.Node[];

    private _scoreList:cc.Node[][] = [];

    public scores:number=0;

    private _autoFinishIng:boolean=false;

    private _scaleTime:number = 0;

    private _isGuide:boolean=false;

    
    onLoad(){
        super.onLoad();

        /**
         * 做时间偏移
         */
         let index=Math.floor(Math.random()*10);
         let key=cc.sys.now().toString();
         this._timeCheckXorCode=parseInt(key.substring(index,(index+6)>key.length?(key.length-(index+6)):(index+6)));
         this._timeCheck^=this._timeCheckXorCode;


        this._initData();

        this._addEvent();

        GameHelper.protectData(this,PROTECT_SCORE,0,GameHelper.getXorCode());
    }

    _addEvent(){
        cc.game.on(GUIDE_EVENTS.START,this._onGuideStart,this);
        cc.game.on(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
    }

    onDestroy(){
        cc.game.off(GUIDE_EVENTS.START,this._onGuideStart,this);
        cc.game.off(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
    }

    _initData(){
        this._scaleTime = 0;
        this._isAnim = true;
        this._animInfo = [];
        this._groupAnim = [];
        this._scoreList = [];
        for (let index = 0; index < 4; index++) {
            this._scoreList[index] = [];
            
        }
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
        this.exitUndoAnim();
        this.guidTip.active = false;
        GameHelper.closeBtnSound("retention",this);
        for (let index = 0; index < GROUPNUM; index++) {
            this.node_answer.getChildByName("btn_group"+index)["sound"] = false;
        }
        // this._showTestDlg();
    }

    // _guideTouchZone(touchNode:cc.Node,step:any,isactive:boolean = true){
    //     // let guidZone=this.node.getChildByName("guideZone");
    //     let guidZone = touchNode;
    //     step.command.offset=touchNode.getPosition().sub(guidZone.getPosition());
    //     this.UIBindData.guideTip=step.command.tip;
    //     this.guidTip.active=isactive;
    //     let rect=new cc.Rect(touchNode.x,touchNode.y,touchNode.width*touchNode.scaleX,touchNode.height*touchNode.scaleY);
    //     let pos=this.node.convertToWorldSpaceAR(cc.v2(rect.x-touchNode.width*touchNode.scaleX*touchNode.anchorX,rect.y-touchNode.height*touchNode.scaleY*touchNode.anchorY));
    //     rect.x=pos.x;
    //     rect.y=pos.y;
    //     step.clickRect=rect;
    // }

    _guideTouchZone(touchNode:cc.Node){
        let rect=touchNode.getBoundingBox();
        let p=touchNode.parent.convertToWorldSpaceAR(rect.origin);
        rect.origin=p;
        NewGuideHelper.getInstance().updateClickRect(rect);
    }

    _onGuideStart(stepId:number,rect_light:cc.Rect,rect_click:cc.Rect,data:any){
        if(stepId==5 || stepId==7 || stepId==8){
            this.guidTip.active=false;
        }else{
            this.guidTip.y=rect_light.y-this.guidTip.height/2-50;
            this.guidTip.getChildByName("auto_lb_guideTip").getComponent(cc.RichText).string=data;
            this.guidTip.active=true;
        }
        switch(stepId){
            case 1:
                this._guideTouchZone(this.node.getChildByName("guigroup3"));
                break;
            case 2:
                this._guideTouchZone(this.node.getChildByName("guigroup1"));
                break;
            case 3:
                this._guideTouchZone(this.UI_BTNS.get("retention"));
                break;
            case 4:
                this._guideTouchZone(this.node.getChildByName("guigroup2"));
                break;
            case 5:
                this._guideTouchZone(this.node.getChildByName("guigroup3"));
                break;
            case 6:
                this._guideTouchZone(this.UI_BTNS.get("retention"));
                break;
            case 7:
                this._guideTouchZone(this.node.getChildByName("guigroup3"));
                break;
            case 8:
                this._guideTouchZone(this.node.getChildByName("guigroup0"));
                break;
            case 9:
                this._guideTouchZone(this.node.getChildByName("guigroup0"));
                break;
        }
    }

    // _onGuideStart(stepId:number,step:any){
    //     switch(stepId){
    //         case FristPlayTaskStep.STEP1:
    //             this._guideTouchZone(this.node.getChildByName("guigroup3"),step);
    //             break;
    //         case FristPlayTaskStep.STEP2:
    //             this._guideTouchZone(this.node.getChildByName("guigroup1"),step);
    //             break;
    //         case FristPlayTaskStep.STEP3:
    //             this._guideTouchZone(this.UI_BTNS.get("retention"),step);
    //             break;
    //         case FristPlayTaskStep.STEP4:
    //             this._guideTouchZone(this.node.getChildByName("guigroup2"),step);
    //             break;
    //         case FristPlayTaskStep.STEP5:
    //             this._guideTouchZone(this.node.getChildByName("guigroup3"),step,false);
    //             break;
    //         case FristPlayTaskStep.STEP6:
    //             this._guideTouchZone(this.UI_BTNS.get("retention"),step);
    //             break;
    //         case FristPlayTaskStep.STEP7:
    //             this._guideTouchZone(this.node.getChildByName("guigroup3"),step,false);
    //             break;
    //         case FristPlayTaskStep.STEP8:
    //             this._guideTouchZone(this.node.getChildByName("guigroup0"),step,false);
    //             break;
    //         case FristPlayTaskStep.STEP9:
    //             this._guideTouchZone(this.node.getChildByName("guigroup0"),step);
    //             break;
    //     }
    // }

    _onGuideEnd(stepId:number){
        this.guidTip.active=false;
        if(stepId==9){
            this._isGuide=false;
            this.scheduleOnce(()=>{
                //引导完成
                this.guidTip.active=false;
                let data:ComDlgData = new ComDlgData();
                data.title = "Congratulations";

                data.group = [{name:"Start Game",isExit:true,cb:()=>{
                    cc.sys.localStorage.setItem("guide_game101","true");
                    App.SceneManager.loadScene("main","game101");
                }}];
                data.txt = "You have completed the guide and are ready to experience the real game.";
                data.clickSpaceHide=false;
                App.DlgManager.showDlg("comdlg",data,"game101");
            },1)
        }
    }

    update(){
        if (!this._isAnim||cc.director.getScheduler().isTargetPaused(this))return;
        let animInfo = this._animInfo.shift();
        if (animInfo) {
            game101_animManager.getInstance().playEffect(this.node_animTop,1.5,animInfo.isLoop,animInfo.path,animInfo.anim,animInfo.pos,true,()=>{
                animInfo?.cb(animInfo.index);
                this._isAnim = true;
            },animInfo?.target,()=>{
                if (animInfo.anim == Game101CardAnim.ALLCLEAR||animInfo.anim == Game101CardAnim.NOBUSTBONUS) {
                    App.AudioManager.playGameSound("sounds/Free_filling");
                }
                else if(animInfo.anim == Game101CardAnim.GAMECOMPLETE){
                    App.AudioManager.playGameSound("sounds/Gamecomplete");
                }
                animInfo?.comcb?.();
            });
            this._isAnim = false;
        }
    }

    // playEffect(speed:number,loop:boolean = false,path:string,anim:string,pos:cc.Vec3,ifReturn:boolean = true,cb?:Function,target?:any,comcb?:Function){
    //     let effect = this._effectPool.get();
    //     if (effect) {
    //     }
    //     else{
    //         effect = cc.instantiate(this.effect);
    //     }
    //     this.node_animTop.addChild(effect);
    //     playEffect(speed,path,effect.getComponent(sp.Skeleton),anim,loop,"game101",()=>{
    //         if (ifReturn) {
    //             let num = this._effectPool.size();
    //             if (num < 5) {
    //                 effect.active = false;
    //                 this._effectPool.put(effect);
    //             }
    //             else{
    //                 effect.removeFromParent();
    //                 effect.destroy();
    //             }
    //         }
    //         if(cb)cb();
    //     },target?target:null,()=>{
    //         if(comcb)comcb();
    //     });
    //     effect.position = pos;
    //     effect.active = true;
    //     return effect;
    // }

    exitAllArr(){
        for (let index = 0; index < 4; index++) {
            this.arrAnim(index,false);
        }
    }

    scoreLightAnim(index:number){
        let pos = this.node_show.getChildByName("img_score"+index).position;
        game101_animManager.getInstance().playEffect(this.node_animBo,1,true,Game101Effect.jifenzengjia,"jifenzengjia",pos);
    }

    arrAnim(index:number,isShow:boolean = false,isHigh:number=Game101ArrType.ARRLOW){
        let img_group = this.node_show.getChildByName("img_group"+index);
        let img = img_group.getChildByName("img_arr");
        cc.Tween.stopAllByTarget(img);
        img.getComponent(cc.Sprite).spriteFrame = this.img_arr[isHigh];
        if (isShow) {
            img.position = ARRSTART;
            img.opacity = 0;
            cc.tween(img)
            .delay(1)
            .parallel(
                cc.tween(img).to(0.5,{position:ARREND}),
                cc.tween(img).to(0.5,{opacity:255})
            )
            .start();
        }
        else{
            img.opacity = 0;
            img.position = ARREND;
        }
        img.active = isShow;
    }

    clearGroupTips(){
        this.clearScoreTips();
        this.clearArrTips();
    }

    clearArrTips(){
        this.exitAllArr();
    }

    clearScoreTips(){
        while(this._groupAnim.length > 0){
            
            let effect = this._groupAnim.pop();
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
        this._groupAnim = [];
    }

    openUndoAnim(){
        let x = this.UI_BTNS.get("undo").position.x;
        let y = this.UI_BTNS.get("undo").position.y;
        this.undoAnim.active = true;
    }

    exitUndoAnim(){
        App.AudioManager.playGameSound("sounds/flip_card");
        this.undoAnim.active = false;
    }

    cardClearAnim(type:string,index:number,bomb:boolean = false){
        if (bomb)return;
        let pos = this.node_show.getChildByName("img_group"+index).position;
        game101_animManager.getInstance().playEffect(this.node_animBo,1,true,Game101Effect.paixiaoshi,type,pos);
    }

    finishAnim(cb:Function){
        game101_animManager.getInstance().playEffect(this.node_animTop,1.5,false,Game101Effect.yanhua,"yanhua",ORIGIN,null,()=>{cb()});
    }

    timeAnim(minute:number){
        game101_animManager.getInstance().playEffect(this.node_animTop,1,false,Game101Effect.fenzhongdaojishi,String(minute),ORIGIN);
    }

    groupAnim(type:string,index:number){
        if (type == "tishiguang") {
            let pos = this.node_show.getChildByName("img_score"+index).position;
            this._groupAnim.push(game101_animManager.getInstance().playEffect(this.node_animBo,1,true,Game101Effect.tishiLight,type,pos,false));
        }
        else{
            let pos = this.node_show.getChildByName("img_group"+index).position;
            game101_animManager.getInstance().playEffect(this.node_animBo,1.5,true,Game101Effect.groupLight,type,pos);
            if (App.AudioManager.getGameConfig().vibrator) {
                App.NativeManager.shockByCustom("0#40");
            }
        }  
    }

    cardTypeAnim(type:string,index:number,cb?:Function,target?:any,comcb?:Function){
        let key=cc.sys.now()+"_"+index;
        this.node_animTop.getComponent(game101_animTop).playCTAnim(index,type,Game101Effect.cardType,cb,target,(index:any)=>{
            comcb&&comcb.call(target,index,key);
            if (type == Game101CardAnim.GREATSTREAK||type == Game101CardAnim.SUPERSTREAK||type == Game101CardAnim.MEGASTREAK) {
                App.AudioManager.playGameSound("sounds/Free_filling");
            }
            else if (type == Game101CardAnim.BUSTED){
                App.AudioManager.playGameSound("sounds/boom");
            }
            else{
                App.AudioManager.playGameSound("sounds/Score_column2");
            }
        });
        return key;
    }

    clearIndexAnim(index:number){
        this.node_animTop.getComponent(game101_animTop).clearAnimCT(index);
        this.node_animTop.getComponent(game101_animTop).clearQueueAnim(index);
    }

    settleTypeAnim(type:string,index:number,cb?:Function,target?:any,comcb?:Function){
        let pos:cc.Vec3
        if (index == -1) {
            pos = ORIGIN;
        }
        else{
            pos = this.node_answer.getChildByName("btn_group"+index).position;
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

    bombAnim(index:number,cb:Function){
        let bomb = this._bombPool.get();
        if (bomb) {
            
        }
        else{
            bomb = cc.instantiate(this.img_bomb);
        }
        bomb.opacity = 0;
        this.node_animTop.addChild(bomb);
        let pos = this.node_show.getChildByName("img_score"+index).position
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

    cardGroupClear(index:number,isBomb:boolean = true,isAnim:boolean=true){
        let delay = 0;
        while(this._cardGroups[index].length > 0){
            let card=this._cardGroups[index].pop();
            if (isBomb) {
                cc.tween(card.node)
                .delay(delay)
                .call(()=>{
                    if (isAnim) {
                        card.playDestoryAnim(index,()=>{
                            this.backCardNode(card.node)
                        }) 
                    }
                    else{
                        this.backCardNode(card.node)
                    }
                    
                })
                .start()
            }
            else{
                this.scheduleOnce(()=>{
                    let effect:cc.Node=cc.instantiate(this.cardDestroyPrefabs);
                    effect.setPosition(this.node_answer.getChildByName("btn_group"+index).position);
                    this.node_animTop.addChild(effect);
                },0.2);
                cc.tween(card.node)
                .delay(delay)
                .call(()=>{
                    if (isAnim) {
                        card.playDestoryAnim(index,()=>{
                            this.backCardNode(card.node)
                        }) 
                    }
                    else{
                        this.backCardNode(card.node)
                    }
                })
                .start()
            }
            delay = delay + 0.1;
        }
        this._cardGroups[index] = [];
    }

    setCardGroup(cards:number[],index:number){
        this.cardGroupClear(index,true,false);
        for (let i = 0; i < cards.length; i++) {
            let card=this.getCardNode(1).getComponent(Game101Card);
            this.node_card.addChild(card.node,Game101CardZIndex.CARDGROUP + i);
            card.setCardBack(true);
            card.cardZone=Game101CardZone.CARDGROUP;
            card.metaData = cards[i];
            let pos = Game101Count.getCardGroupsPos(this.node_answer.getChildByName("btn_group"+index).position,i);
            card.node.setPosition(pos);
            card.setCardBack(false);
            this._cardGroups[index].push(card);
        }
            
    }

    cardGroupIncrease(index:number,cb:Function){
        if(this._currentCard == undefined)return;
        let card = this._currentCard;
        let len = this._cardGroups[index].length;
        let pos = Game101Count.getCardGroupsPos(this.node_answer.getChildByName("btn_group"+index).position,len);
        this._cardGroups[index].push(card);
        card.node.zIndex = 1000
        this._currentCard = null;
        cc.tween(card.node)
        .to(0.1,{position:pos})
        .call(()=>{
            cb&&cb();
            card.node.zIndex = Game101CardZIndex.CARDGROUP + len
            if(this._isGuide){
                NewGuideHelper.getInstance().finishTask();
            }
        })
        .start();
        App.AudioManager.playGameSound("sounds/flip_card");
    }

    setUndoEnable(val:boolean){
        let btn=this.UI_BTNS.get("undo").getComponent(cc.Button);
        btn.interactable=val;
        btn.node.opacity=val?255:150;
    }


    h2C(cb:Function){
        if (this._currentCard) {
            let x = this.node_show.getChildByName("img_cardsarea").x + this._currentCard.node.width / 2 + 8;
            let y = this.node_show.getChildByName("img_cardsarea").y;
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
            this.img_ready.getChildByName("img_wild").active = recard.metaData == 43||recard.metaData == 75?true:false;
            recard.cardZone = Game101CardZone.CURRENT;
            this._currentCard = recard;
            if (cb) cb();
            if(this._isGuide){
                NewGuideHelper.getInstance().finishTask();
            }
        })
        .start();
    }

    clearRetention(){
        if (!this._retentionCard)return
        this._retentionCard.node.removeFromParent();
        this._retentionCard.node.destroy();
        this._retentionCard = null;
    }

    //设置滞留牌
    setRetention(hasAnim?:boolean,value?:number){
        // cc.error("setRetention",value);
        if(this._isGuide){
            NewGuideHelper.getInstance().finishTask();
        }
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
            .to(0.1,{rotation:10,position:this.node_show.getChildByName("img_retention").position})
            .start();
        }
        else{
            this._retentionCard.node.position = this.node_show.getChildByName("img_retention").position;
            this._retentionCard.node.rotation = 10;
        }   
    }

    cardsClear(){
        while(this._cards.length > 0){
            this.backCardNode(this._cards.pop().node);
        }

    }

    设置牌堆
    setCards(num:number){
        this.cardsClear();
        for (let index = 0; index < num; index++) {
            let card = this.getCardNode(index).getComponent(Game101Card);
            card.index=index;
            card.cardZone = Game101CardZone.CARDS;
            this.node_card.addChild(card.node,Game101CardZIndex.CARDS + index);
            let x = this.node_show.getChildByName("img_cardsarea").x + card.node.width / 2 + 8;
            let y = this.node_show.getChildByName("img_cardsarea").y;
            card.node.position = new cc.Vec3(x + 2.4*index,y);
            card.setCardBack(true);
            this._cards.push(card);
        }
    }

    playDealSound(dealy:number,times:number){
        // for (let index = 0; index < times; index++) {
        //     let time = dealy * index;
        //     this.scheduleOnce(()=>{
        //         App.AudioManager.playGameSound("sounds/flip_card");
        //     },time)
        // }
        this.schedule(()=>{
            App.AudioManager.playGameSound("sounds/flip_card");
        },dealy,times);
    }

    startCard(cards:number[],cb:Function){
        let isGuide=!cc.sys.localStorage.getItem("guide_game101");
        this._isGuide=isGuide&&!App.isCheck;
        this.cardsClear();
        let x:number;
        let y:number;
        for (let index = 0; index < cards.length; index++) {
            let card = this.getCardNode(index).getComponent(Game101Card);
            card.index=index;
            card.cardZone = Game101CardZone.CARDS;
            this.node_card.addChild(card.node,Game101CardZIndex.CARDS + index);
            card.node.position = DCPOS;
            card.setCardBack(true);
            this._cards.push(card);
            x = this.node_show.getChildByName("img_cardsarea").x + card.node.width / 2 + 8;
            y = this.node_show.getChildByName("img_cardsarea").y;
        }
        this._onSetCardsAnim(this._cards,new cc.Vec3(x,y),cards[cards.length - 1],cb);
    }


    private _onSetCurAnim(card:Game101Card,value:number,index:number,cb:Function){
        this._currentCard = card;
        this._currentCard.metaData = value;
        
        cc.tween(card.node)
        .delay(0.01*index)
        .to(0.4,{position:this.img_ready.position},{easing:'easeQuarticActionInOut'})
        .delay(0.4)
        .call(()=>{
            this.startGuide(); 
        })
        .delay(0.1)
        .call(()=>{
            cb&&cb();
        })
        .start()
        this.scheduleOnce(()=>{
            this._currentCard.turn();
            this._currentCard.setCardBack(false);
        },index*0.01)
        // this.startPlayback();
    }

    private async startGuide(){
        let isGuide=!cc.sys.localStorage.getItem("guide_game101");
        if(isGuide&&!App.isCheck){
            await NewGuideHelper.getInstance().init("Scripts/guide/GuideConfig","Scripts/guide/guide","game101");
            NewGuideHelper.getInstance().run();
        }
    }

    private _onSetSingleCard(card:Game101Card,pos,index:number,cb:Function){
        
        cc.tween(card.node)
        .delay(0.01*index)
        .call(()=>{
            // App.AudioManager.playGameSound("sounds/flip_card");
        })
        .to(0.4,{position:new cc.Vec3(pos)},{easing:'easeQuarticActionInOut'})
        .call(()=>{
            if (cb) {
                cb();
            }
        })
        .start()
    }

    private _onSetCardsAnim(card:Game101Card[],beginPos:cc.Vec3,curValue:number,cb:Function){
        for (let index = 0; index < card.length; index++) {
            if (index == card.length - 1) {
                this._onSetCurAnim(card.pop(),curValue,index,cb);
            }
            else{                
                this._onSetSingleCard(card[index],new cc.Vec3(beginPos.x + 2.4*index,beginPos.y),index,null);
            }
        }
    }

    setReadyScore(index:number,score:number,A:boolean = false){
        if (score > 21) {
            this.UI_LBS.get("ready"+index).active =false;
            return;
        }
        let ready;
        if (A && score+10<=21) {
            ready = this.UIBindData["ready"+index] = score+"/"+(score+10);
        }
        else{
            ready = score;
        }
        this.UI_LBS.get("ready"+index).active = true;
        this.UI_LBS.get("ready"+index).opacity = 0;
        this.UIBindData["ready"+index] = ready;
        cc.Tween.stopAllByTarget(this.UI_LBS.get("ready"+index));
        if (!score) {
            return;
        }
        cc.tween(this.UI_LBS.get("ready"+index))
        .delay(1)
        .to(0.5,{opacity:255})
        .start();
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
            .delay(0.3)
            .call(
                ()=>{
                    cb&&cb()
                })
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

    clearScore(index:number){
        for (let i = 0; i < this._scoreList[index].length; i++) {
            this._scoreList[index][i].stopAllActions();
            this._scorePool.put(this._scoreList[index][i]);
        }
        this._scoreList[index] = [];
    }

    setAllScore(score:number,index:number,hasAnim?:boolean,hasDumpAnim?:boolean){
        let moveUp:boolean=this._autoFinishIng;
        let add=score-this.scores;

        if(add==0&&this.rollNumGroup.getData()==score)return;
        if(add>0){
            if(App.AudioManager.getGameConfig().vibrator){
                // App.NativeManager.shock();
            }
        }
        this.scores=score;

        //上传分数操作
        cc.game.emit(GameEvents.GAME_ADDSCORE,add);

        if(hasAnim==false){
            this.rollNumGroup.setData(score,500,0,false);
            return;
        }
        let view=this._scorePool.get() || cc.instantiate(this.addScoreInstance);
        this.node.addChild(view);
        if (this._scoreList[index]) {
            this._scoreList[index].push(view);
        }
        let lb=view.getComponent(cc.Label);
        if(add<0){
            view.color=cc.Color.WHITE.fromHEX("#EA2C2C");
            lb.string=add.toString();
        }else{
            view.color=cc.Color.WHITE.fromHEX("#53E4AF");
            lb.string=`+${add}`;
        }
        let actions=[];
        actions.push(cc.callFunc(()=>{
            this.rollNumGroup.setData(score,500);
        }));
        actions.push(cc.delayTime(0.5));
        actions.push(cc.fadeOut(0.2));
        actions.push( cc.callFunc(node=>{
            this._scorePool.put(node);
        }));
        let targetPos:cc.Vec2=this.rollNumGroup.node.getPosition();
        targetPos.y-=this.rollNumGroup.node.height+35;
        // if(add>0){
            let jumpTime:number=0.3;
            if(moveUp){
                jumpTime=0.8;
                actions.splice(0,actions.length);
                actions.push(cc.callFunc(()=>{
                    this.rollNumGroup.setData(score,500);
                }));
                actions.push(cc.delayTime(0.1));
                actions.push(cc.spawn(
                    cc.moveTo(0.3,targetPos.x,targetPos.y+35),
                    cc.fadeOut(0.3)
                ));
                actions.push( cc.callFunc(node=>{
                    this._scorePool.put(node);
                    this.rollNumGroup.setData(score,500);
                }));
            }
            view.opacity=255;
            if(hasDumpAnim==false){
                actions.unshift(cc.moveTo(jumpTime,targetPos));
            }else{
                actions.unshift(cc.jumpTo(jumpTime,targetPos,100,1));
            }
            let pos:cc.Vec3 = new cc.Vec3();
            if (index == -1) {
                pos = ORIGINSCORE;
            }
            else{
                pos = this.node_show.getChildByName("img_score"+index).position;
            }
            view.setPosition(new cc.Vec3(pos.x,pos.y+50));
        // }else{
        //     view.opacity=0;
        //     actions.unshift(cc.fadeIn(0.2));
        //     view.setPosition(targetPos);
        // }
        view.runAction(cc.sequence(actions));
    }

    // setAllScore(score:number,index:number,hasAnim:boolean = false){
    //     let add=score-this.rollNumGroup.getData();
    //     if(add==0)return;
    //     this.rollNumGroup.setData(score,500);
    //     if(hasAnim==false)return
    //     let view=this._scorePool.get() || cc.instantiate(this.addScoreInstance);
    //     this.node_show.addChild(view);
    //     let lb=view.getComponent(cc.Label);
    //     if(add<0){
    //         view.color=cc.Color.WHITE.fromHEX("#EA2C2C");
    //         lb.string=add.toString();
    //     }else{
    //         view.color=cc.Color.WHITE.fromHEX("#53E4AF");
    //         lb.string=`+${add}`
    //     }
    //     view.zIndex=300;
    //     let actions=[];
    //     actions.push(cc.delayTime(0.25));
    //     actions.push(cc.fadeOut(0.1));
    //     actions.push( cc.callFunc(node=>{
    //         this._scorePool.put(node);
    //     }));
    //     let targetPos:cc.Vec2=this.rollNumGroup.node.getPosition();
    //     targetPos.y-=this.rollNumGroup.node.height+35;
    //     if(add>0){
    //         let jumpTime:number=0.25;
    //         jumpTime=0.4;
    //         actions.splice(0,actions.length);
    //         actions.push(cc.delayTime(0.5));
    //         actions.push(cc.spawn(
    //             cc.moveTo(0.15,targetPos.x,targetPos.y+35),
    //             cc.fadeOut(0.15)
    //         ))
    //         actions.push( cc.callFunc(node=>{
    //             this._scorePool.put(node);
    //         }));
    //         view.opacity=0;
    //         actions.unshift(cc.jumpTo(jumpTime,targetPos,100,1));
    //         actions.unshift(cc.fadeIn(0.3));
    //         actions.unshift(cc.delayTime(0.8));
    //         let pos:cc.Vec3 = new cc.Vec3();
    //         if (index == -1) {
    //             pos = ORIGIN;
    //         }
    //         else{
    //             pos = this.node_show.getChildByName("img_score"+index).position
    //         }
    //         view.setPosition(new cc.Vec3(pos.x,pos.y+50));
    //     }else{
    //         view.opacity=0;
    //         actions.unshift(cc.fadeIn(0.1));
    //         view.setPosition(targetPos);
    //     }
    //     view.runAction(cc.sequence(actions));

    // }

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
            let score = this.node_show.getChildByName("node_label").getChildByName("auto_lb_score"+index);
            score.scale = 2;
            cc.tween(score)
            .to(0.25,{scale:1})
            .start();
        }
    }

    clearGroupScore(index:number){
        for (let index = 0; index < 4; index++) {
            this.UIBindData["score"+index] = 0;
        }
    }

    private _onCheckTime(time:number){
        if (time >= 60) {
            this.UI_LBS.get("time").color = WRITE;
        }
        else if (time>10 && time<60){
            this.UI_LBS.get("time").color = YELLOW;
        }
        else if (time <= 10){
            this.UI_LBS.get("time").color = RED;

            if (Math.ceil(time) == this._scaleTime) {
                return;
            }
            this._scaleTime = Math.ceil(time);
            
            // if (Number.isInteger(time)) {
            cc.tween(this.UI_LBS.get("time"))
            .to(0.5,{scale:1.5})
            .to(0.5,{scale:1})
            .start();
            // }
        }
    }

    private _onCheckMinute(time:number){
        switch (time) {
            case 300:
                this.timeAnim(5);
                break;
            case 240:
                this.timeAnim(4);
                break;
            case 180:
                this.timeAnim(3);
                break;
            case 120:
                this.timeAnim(2);
                break;
            case 60:
                this.timeAnim(1);
                break;
            default:
                break;
        }
    }

    // private _onCheckCardType(){
    //     for (let index = 0; index < GROUPNUM; index++) {
    //         let anim = this._cardtypeInfo[index].shift();
    //         if (anim) {
    //             this.playCTEffect(index,1.5,anim.isLoop,anim.path,anim.anim,()=>{
    //                 if (anim.cb) {
    //                     anim.cb();
    //                 }
    //             },anim?.target,()=>{
    //                 anim?.comcb?.(anim.index);
    //             });
    //         }
    //     }
    // }
    
    setLeftTime(time:number){
        this._time=time;
        this.UIBindData.time=GameHelper.fromatTimeNew(this._time);

        this._timeCheck=(time*10)^this._timeCheckXorCode;
    }

    startTimer(){
        this.unschedule(this._updateTime);
        if(this._time>0){
            this.schedule(this._updateTime,0.1)
        }
    }

    stopTimer(){
        this.unschedule(this._updateTime);
    }

    _updateTime(dt){
        // this._time-=0.1
        this._time -= dt;

        this._timeCheck^=this._timeCheckXorCode;
        this._timeCheck-=1;
        this._timeCheck^=this._timeCheckXorCode;

        // this._time = Math.floor(this._time*10)/10;
        cc.game.emit(Game101Events.TIMEUPDATE,this._time);
        this._onCheckMinute(this._time);
        this._onCheckTime(this._time);
        if (Number.isInteger(this._time)) {
            this.UIBindData.time=GameHelper.fromatTimeNew(this._time);
        }
        else{
            this.UIBindData.time = GameHelper.fromatTimeNew(Math.ceil(this._time));
        }
        
        if(this._time<=0){
            this.unschedule(this._updateTime);
            cc.game.emit(Game101Events.CHECKOVER);
        }
    }

    getLessTime():number{
         return Math.floor((this._timeCheck^this._timeCheckXorCode)/10);
    }

    addCheckScore(score:number,add:boolean=true){
        let data
        if(add){
            data=GameHelper.getProtectData(this,PROTECT_SCORE)+score;
        }else{
            data=score;
        }
        GameHelper.updateProtectData(this,PROTECT_SCORE,data);
    }

    getCheckScore():number{
        return GameHelper.getProtectData(this,PROTECT_SCORE);
    }

    // private _showTestDlg(){
    //     if (this.UI_BTNS.get("test")) {
    //         this.UI_BTNS.get("test").active = App.NativeManager.isTest();
    //     }
    // }

    // onTestClick(){
    //     App.DlgManager.showDlg("test",null,"game101");
    // }
}
