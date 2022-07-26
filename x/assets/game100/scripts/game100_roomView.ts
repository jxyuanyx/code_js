// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { GameEvents } from "../../gamecore/events/GameEvents";
import GameHelper from "../../gamecore/tools/GameHelper";
import BaseRoomView from "../../gamecore/ui/baseview/imp/BaseRoomView";
import Card from "../../gamecore/ui/baseview/models/Card";
import RollNumGroup from "../../gamecore/ui/components/common/RollNumGroup";
import GodGuide from "../../gamecore/ui/components/guid/GodGuide";
import { GUIDE_EVENTS, NewGuideHelper } from "../../gamecore/ui/components/newGuide/NewGuideHelper";
import { ComDlgData } from "../../mainpackage/dialogs/comdlg/ComDlg";
import Game100Card from "../prefabs/card/Game100Card";
import { Game100CardZone, Game100Events } from "./game100_enum";
import Game100Helper from "./game100_helper";
import { FristPlayTask, FristPlayTaskStep } from "./guide/FristPlayTask";

const {ccclass, property} = cc._decorator;

const INN_COUNT:number=7;

const SHOW_COUNT:number=3; 

const BOX_COUNT:number=4;

const RED:cc.Color=new cc.Color(234,44,44,255);

const YELLOW:cc.Color=new cc.Color(255,242,30,255);

const enum LAYER_INDEX{
    CARD=10,
    DEALCARD,
    MOVE=100
}

const Guide_Config={"1_1":[1,1,1],"0_0":[0,0,2],"2_2":[2,2,3]};

@ccclass
export default class Game100RoomView extends BaseRoomView {

    UIBindData={
        time:"0",
        leftFreeTime:"",
        guideTip:"",
        version:""
    }


    @property(cc.Node)
    dealCard:cc.Node=null;

    @property(cc.Node)
    resetTip:cc.Node=null;

    @property
    spaceY:number=40;

    @property([cc.Prefab])
    cardDestroyPrefabs:cc.Prefab[]=[];

    @property(cc.Prefab)
    addScoreInstance:cc.Prefab=null;

    @property(RollNumGroup)
    rollNumGroup:RollNumGroup=null;

   // @property(cc.Prefab)
    //guideInstance:cc.Prefab;

    @property(cc.Node)
    guidTip:cc.Node;

    @property(sp.Skeleton)
    lessTimeAnim:sp.Skeleton=null;

    //_guide:GodGuide=null;


    private _addScoreSequence:cc.Node[]=[];


    //手牌池
    private _cards:Game100Card[][];

    //右侧四个池
    private _boxCards:Game100Card[][];

    //发牌局的三张牌
    private _dealCards:Game100Card[];

    //7个堆
    private _cardZone:cc.Node[];
    private _boxZone:cc.Node[];

    private _moveCards:Game100Card[];
    private _moveStartPos:cc.Vec2;
    private _canMove:boolean=false;

    private _time:number=0;

    private _timeCheck:number=0;

    private _timeCheckXorCode=0;


    private _startClickTime:number=0;

    private _scorePool:cc.NodePool;

    private _canTouch:boolean=true;

    private _scoreMovePos:cc.Vec2=null;

    private _autoFinishIng:boolean=false;

    private _moveCardPos:cc.Vec2=null;

    private _scores:number=0;

    private _isGuide:boolean=false;

    private _gameOver:boolean=false;

    onLoad(){
        super.onLoad();

        /**
         * 做时间偏移
         */
        let index=Math.floor(Math.random()*10);
        let key=cc.sys.now().toString();
        this._timeCheckXorCode=parseInt(key.substring(index,(index+6)>key.length?(key.length-(index+6)):(index+6)));
        this._timeCheck^=this._timeCheckXorCode;


        this.dealCard.zIndex=LAYER_INDEX.DEALCARD;

        this._initData();

        this._addEvent();

       this._scorePool=new cc.NodePool();
       this.rollNumGroup.hidePreFix();
       this.setNoCardsTip(false);
       this.guidTip.active=false;

       this.lessTimeAnim.node.active=false;
       this.lessTimeAnim.setCompleteListener(()=>{
           this.lessTimeAnim.node.active=false;
       })
       this.lessTimeAnim.node.zIndex=998;

       GameHelper.closeBtnSound("getCard",this);
       GameHelper.closeBtnSound("undo",this);

       this.UIBindData.leftFreeTime=App.LangManager.getTxtByCurrentGame("freeTimeTip",[3]);

       this.UIBindData.version=cc.sys.localStorage.getItem(App.DataManager.getGameData().packageName+"_version") || "1.0.0";

       this.setUndoEnable(false);

    }



    setNoCardsTip(val:boolean){
        this.LANG_LBS.get("noCards").active=val;
    }

    _addEvent(){
        //cc.game.on("onMoveCard",this._onMoveCard,this);
        this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchEnd,this)

        cc.game.on(Game100Events.ONMOVECARD_START,this._onSelectCard,this)
        cc.game.on(GUIDE_EVENTS.START,this._onGuideStart,this);
        cc.game.on(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
    }

    _onTouchBegan(event:cc.Event.EventTouch){
        if(this._gameOver)return false;
        if(this._moveCards&&this._moveCards.length>0){
            return false;
        }
        return true;
    }

    _onSelectCard(card:Game100Card,touchPos:cc.Vec2){
        if(this._gameOver)return false;

        if(this._moveCards&&this._moveCards.length>0){
            return;
        }
        if(!this._canTouch){
            this._canMove=false;
            return;
        }
        if(card.metaData==0){
            this._canMove=false;
            return;
        }

        this._moveCardPos=touchPos;
        /*
        let tcards=this._cards[card.index];
        if(card.cardZone==Game100CardZone.ZONE){
            if(card!=tcards[tcards.length-1]&&!Game100Helper.canMoveManyCards(this._cards,card)){
                this._canMove=false;
                return;
            }
        }
        */
        //console.log(">>>>>>sssssss",card.cardZone==Game100CardZone.DEAL,this._dealCards,card)
        if(card.cardZone==Game100CardZone.DEAL&&this._dealCards.indexOf(card)!=this._dealCards.length-1){
            this._canMove=false;
            return;
        }

        this._startClickTime=Date.now();
        this._moveCards=this._getMoveCards(card);

        this._moveCards.forEach((item,index)=>{
                item.node.zIndex=(LAYER_INDEX.MOVE+index)
                item.node.scale=1.1;
            }
        );

        this._canMove=true;

        this._canTouch=false;
        this.scheduleOnce(()=>{
            this._canTouch=true;
        },0.3)
    }

    _getMoveCards(card:Game100Card){
        if(card.cardZone==Game100CardZone.ZONE){
            let cards=this._cards[card.index]
            return cards.slice(cards.indexOf(card));
        }else{
            return [card];
        }
    }


    _onTouchMove(event:cc.Event.EventTouch){
        if(this._gameOver)return false;
        if(!this._canMove || !this._moveCards)return;
        let location=event.getLocation();
        let pos=this.node.convertToNodeSpaceAR(location);
        for(let i=0;i<this._moveCards.length;i++){
            let cardView=this._moveCards[i];
            cardView.node.stopAllActions();
            cardView.node.x=pos.x-this._moveCardPos.x;
            cardView.node.y=pos.y-i*this.spaceY-this._moveCardPos.y;
        }
        //this.node.setPosition(pos);
    }

    _onTouchEnd(event:cc.Event.EventTouch){
        if(this._gameOver)return false;
        if(!this._canMove || !this._moveCards || this._moveCards.length==0)return;
        if((Date.now()-this._startClickTime<=200)){//判定为点击事件
            //发送给上层做智能选牌
            let clickCard=this._moveCards[0];
            cc.game.emit(Game100Events.AUTO_MOVE,clickCard.metaData,clickCard.index,clickCard.cardZone,this._moveCards.length,clickCard.cardValue);
            this._canMove=false;
            this.scheduleOnce(()=>{
                this._stopMove();
            },0.2)
            return;
        }
        if(!this._moveCards[0])return
        let card=this._moveCards[0].getComponent(Game100Card);
        this._onMoveCard(card);
    }

    canClick(){
        return !this._moveCards || this._moveCards.length==0
    }

    _flushDealCard(){
        let x=this.dealCard.x-this.dealCard.width/2-115;
        for(let i=0;i<this._dealCards.length;i++){
            let card=this._dealCards[i];
            card.node.stopAllActions();
            card.node.runAction(cc.sequence(
                cc.moveTo(0.2,x+i*38,this.dealCard.y),
                cc.callFunc((node,index)=>{
                    node.zIndex=index;
                },card.node,i)
            ))
        }
    }

    moveCardB2Z(boxIndex:number,toIndex:number){
        let card=this._boxCards[boxIndex].pop();
        let destZone=this._cards[toIndex];
        card.node.zIndex=LAYER_INDEX.MOVE;
        destZone.push(card);
        card.index=toIndex;
        card.cardZone=Game100CardZone.ZONE;
        this._flushZone(toIndex);
    }

    _playMoveSound(){
        this.scheduleOnce(()=>{
            //App.AudioManager.playGameSound("sounds/flip_card");
            this.playFlipCardSound();
        },0.2);
    }

    moveCardD2B(boxIndex:number,playSound?:boolean){
        let card=this._dealCards.pop();
        let destZone=this._boxCards[boxIndex];
        let pos=this._boxZone[boxIndex].position;
        card.node.zIndex=LAYER_INDEX.MOVE;
        card.node.stopAllActions();
        this._canMove=false;
        card.node.runAction(cc.sequence(
            cc.spawn(
                cc.moveTo(0.5,pos.x,pos.y),
                cc.scaleTo(0.5,1),
            ),
            cc.callFunc(node=>{
                node.zIndex=destZone.length;
                card.playFinishAnim();

                this._addScoreHit();
                if(playSound!=false){
                    App.AudioManager.playGameSound("sounds/Score"+this._scoreHitCount);
                }
            })
        ).easing(cc.easeExponentialOut()));
        destZone.push(card);
        card.index=boxIndex;
        card.cardZone=Game100CardZone.BOX;

        this._scoreMovePos=card.node.getPosition();

        this._stopMove();


        //this._playMoveSound();

    }

    moveCardD2Z(toIndex:number){
        if(this._isGuide){
            NewGuideHelper.getInstance().finishTask();
        }
        let card=this._dealCards.pop();
        let destZone=this._cards[toIndex];
        card.node.zIndex=LAYER_INDEX.MOVE;
        destZone.push(card);
        card.index=toIndex;
        card.cardZone=Game100CardZone.ZONE;
        this._flushZone(toIndex);

        this._scoreMovePos=card.node.getPosition();

       // this._playMoveSound();
    }

    moveCardZ2B(fromIndex:number,boxIndex:number,playSound?:boolean){
        if(this._isGuide){
            NewGuideHelper.getInstance().finishTask();
        }
        let card=this._cards[fromIndex].pop();
        let destZone=this._boxCards[boxIndex];
        destZone.push(card);
        let pos=this._boxZone[boxIndex].position;
        card.node.zIndex=LAYER_INDEX.MOVE;
        card.node.stopAllActions();
        this._canMove=false;
        card.node.runAction(cc.sequence(
            cc.spawn(
                cc.moveTo(0.5,pos.x,pos.y),
                cc.scaleTo(0.5,1)
            ),
            cc.callFunc((node,data)=>{
                node.zIndex=data;
                card.playFinishAnim();
                this._addScoreHit();
                if(playSound!=false){
                    App.AudioManager.playGameSound("sounds/Score"+this._scoreHitCount);
                }
                this._stopMove();
            },card.node,destZone.length)
        ).easing(cc.easeExponentialOut()));
        card.index=boxIndex;
        card.cardZone=Game100CardZone.BOX;

        this._scoreMovePos=card.node.getPosition();
        return card;
    }

    moveCardZ2Z(fromIndex:number,toIndex:number,count:number){
        if(this._isGuide){
            NewGuideHelper.getInstance().finishTask();
        }
        let fromCards=this._cards[fromIndex];
        let toCards=this._cards[toIndex];
        let cards=fromCards.splice(fromCards.length-count,count);
        for(let i=0;i<cards.length;i++){
            let card=cards[i];
            card.node.zIndex=LAYER_INDEX.MOVE+i;
            toCards.push(card);
            card.index=toIndex;
            card.cardZone=Game100CardZone.ZONE;
        }
        this._flushZone(toIndex,true,count);

        //this._playMoveSound();

    }
    

    /******************************** */
    moveCardB2D(boxIndex:number){
        let card=this._boxCards[boxIndex].pop();
        card.node.zIndex=LAYER_INDEX.MOVE;
        this._dealCards.push(card);
        card.index=this._dealCards.length;
        card.cardZone=Game100CardZone.DEAL;
        this._flushDealCard();

        this._playMoveSound();

    }

    moveCardZ2D(index:number){
        let card=this._cards[index].pop();
        card.node.zIndex=LAYER_INDEX.MOVE;
        this._dealCards.push(card);
        card.index=this._dealCards.length;
        card.cardZone=Game100CardZone.DEAL;
        this._flushDealCard();

        this._playMoveSound();

    }

    muckCard(index:number){
        let cards=this._cards[index]
        cards[cards.length-1]?.turnBack();
    }

    setUndoEnable(val:boolean){
        if(App.DataManager.getGameData().isRecord)return;
        let btn=this.UI_BTNS.get("undo").getComponent(cc.Button);
        btn.interactable=val;
        btn.node.opacity=val?255:150;
    }

    cantMove(){
         //重置位置
        let card=this._moveCards[0];
        card.node.stopAllActions();
        let tempCards=this._moveCards.concat();
        if(card.cardZone==Game100CardZone.BOX){
            card.node.zIndex=this._boxCards[card.index].length;
            card.node.setPosition(this._boxZone[card.index].getPosition());
        }else if(card.cardZone==Game100CardZone.DEAL){
            card.node.zIndex=this._dealCards.length+LAYER_INDEX.DEALCARD;
            card.node.setPosition(this.dealCard.x-this.dealCard.width/2-115+(this._dealCards.length-1)*38,this.dealCard.y);
        }else{
            this._flushZone(card.index,false);
        }
        
        let pos=card.node.getPosition();

        cc.log("cantmove>>>>>>",tempCards.length)
        for(let i=0;i<tempCards.length;i++){
            let card=tempCards[i];
            let offsetX=10;
            let y=pos.y-i*this.spaceY;
            card.node.stopAllActions();
            card.node.runAction(cc.sequence(
                cc.moveTo(0.02,pos.x-offsetX,y),
                cc.moveTo(0.02,pos.x,y),
                cc.moveTo(0.02,pos.x+offsetX,y),
                cc.moveTo(0.02,pos.x,y),
                cc.scaleTo(0.2,1)
            ))
        }

        this._stopMove();

        //App.AudioManager.playGameSound("sounds/error");
        this.playFlipCardSound();
    }

    _stopMove(){
        this._moveCards&&this._moveCards.splice(0,this._moveCards.length);
        this._canMove=true;
    }

    

    _onMoveCard(card:Game100Card){
        let rect=card.node.getBoundingBox();

        if(card.cardZone!=Game100CardZone.BOX&&this._moveCards&&this._moveCards.length==1){
            //检查box
            for(let i=0;i<this._boxZone.length;i++){
                if(rect.intersects(this._boxZone[i].getBoundingBox())){
                    if(Game100Helper.checkMoveInBox(this._boxCards[i],card)){
                        if(card.cardZone==Game100CardZone.ZONE){
                            cc.game.emit(Game100Events.MVCARD_Z2B,card.index,i,card.cardValue);
                        }else{
                            cc.game.emit(Game100Events.MVCARD_D2B,i,card.cardValue);
                        }
                        return;
                    }
                }
            }
        }
        //检查堆
        for(let i=0;i<this._cardZone.length;i++){
            if(rect.intersects(this._cardZone[i].getBoundingBox())){
                if(!(i==card.index&&card.cardZone==Game100CardZone.ZONE)&&Game100Helper.checkMoveInZone(this._cards[i],card)){
                    if(card.cardZone==Game100CardZone.ZONE){
                        cc.game.emit(Game100Events.MVCARD_Z2Z,card.index,i,this._moveCards.length,card.cardValue);
                    }else if(card.cardZone==Game100CardZone.BOX) {
                        cc.game.emit(Game100Events.MVCARD_B2Z,card.index,i,card.cardValue);
                    }else{
                        cc.game.emit(Game100Events.MVCARD_D2Z,i,card.cardValue);
                    }
                    return;
                }
            }
        }

        //重置位置
        if(this._moveCards.length==1){
            let card=this._moveCards[0];
            card.node.stopAllActions();
            if(card.cardZone==Game100CardZone.BOX){
                card.node.runAction(cc.sequence(
                    cc.spawn(
                        cc.moveTo(0.5,this._boxZone[card.index].getPosition()).easing(cc.easeExponentialOut()),
                        cc.scaleTo(0.5,1)
                    ),
                    cc.callFunc(()=>{
                        card.node.zIndex=this._boxCards[card.index].length;
                        this.playFlipCardSound();
                    })
                ))
            }else if(card.cardZone==Game100CardZone.DEAL){
                card.node.runAction(cc.sequence(
                    cc.spawn(
                        cc.moveTo(0.5,this.dealCard.x-this.dealCard.width/2-115+(this._dealCards.length-1)*38,this.dealCard.y).easing(cc.easeExponentialOut()),
                        cc.scaleTo(0.5,1)
                    ),
                    cc.callFunc(()=>{
                        card.node.zIndex=this._dealCards.length+LAYER_INDEX.DEALCARD;
                        this.playFlipCardSound();
                    })
                ))
            }else{
                this._flushZone(card.index);
            }
        }else{
            this._flushZone(this._moveCards[0].index);
        }
        this._stopMove();
        this._moveCards.splice(0,this._moveCards.length);
    }

    _flushZone(zoneIndex:number,hasAnim?:boolean,moveLen?:number){
        if(hasAnim==undefined)hasAnim=true;
        let cards=this._cards[zoneIndex];
        if(cards.length==0)return;
        let zone=this._cardZone[zoneIndex];
        let offsetY=zone.y-this.dealCard.height/2;
        //let moveLen=this._moveCards.length;
        if(moveLen==undefined)moveLen=(this._moveCards&&this._moveCards.length) || 1;
        let start=cards.length-moveLen;
        this._canMove=false;
        for(let i=0;i<cards.length;i++){
            let card=cards[i];
            if(i>=start){
                if(hasAnim){
                    card.node.stopAllActions();
                    card.node.runAction(cc.sequence(
                        cc.delayTime((i-start)*0.02),
                        cc.spawn(
                            cc.moveTo(0.7,zone.x,offsetY),
                            cc.scaleTo(0.7,1),
                            cc.skewTo(0.7,0,0)
                        ),
                        cc.callFunc((node,index)=>{
                            node.zIndex=index
                            if((index-LAYER_INDEX.CARD+1)==cards.length){
                                
                            }
                        },card.node,i+LAYER_INDEX.CARD)
                    ).easing(cc.easeExponentialOut()))
                }else{
                    card.node.zIndex=i+LAYER_INDEX.CARD;
                    card.node.x=zone.x;
                    card.node.y=offsetY;
                }
            }else{
                card.node.stopAllActions();
                if(card.metaData==0){
                    card.setCardBack(true);
                }
                card.node.skewY=0;
                card.node.skewX=0;
                card.node.zIndex=i+LAYER_INDEX.CARD;
                card.node.x=zone.x;
                card.node.scale=1;
                card.node.y=offsetY;
            }
            if(cards[i].metaData){
                offsetY-=this.spaceY;
            }else{
                offsetY-=this.spaceY/2;
            }
        }
        
        this._stopMove();

        if(hasAnim){
            this.scheduleOnce(()=>{
                this.playFlipCardSound();
            },0.5)
        }

    }

    _initData(){
        this._cards=[];
        this._cardZone=[];
        for(let i=0;i<INN_COUNT;i++){
            this._cards[i]=[];
            this._cardZone.push(this.node.getChildByName("zone"+(i+1)));
        }

        this._boxCards=[];
        this._boxZone=[];
        for(let i=0;i<BOX_COUNT;i++){
            this._boxCards[i]=[];
            this._boxZone.push(this.node.getChildByName("box"+(i+1)));
        }

        this._dealCards=[];
        // this._showTestDlg();
    }
    
    /**
     * 新的一局发牌
     * @param cards 
     */
    dealCards(cards:number[],cb?:Function){
        this._canTouch=false;
        this._canMove=false;

        let index=0;
        let isGuide=!cc.sys.localStorage.getItem("guide_game100");
        this._isGuide=isGuide&&!App.isCheck;
        for(let i=0;i<INN_COUNT;i++){
            for(let j=i;j<INN_COUNT;j++){
                let card=this.getCardNode(1).getComponent(Game100Card);
                card.index=j;
                card.cardZone=Game100CardZone.ZONE;

                if(isGuide&&Guide_Config[j+"_"+i]){
                    card.node.name="guide_"+Guide_Config[j+"_"+i][2]
                }

                this.node.addChild(card.node,LAYER_INDEX.CARD);
                this._cards[j].push(card);
                card.node.setPosition(this.dealCard.position);
                let x=this._cardZone[j].x;
                let y=this._cardZone[j].y-this.spaceY/2*i-this.dealCard.height/2;
                card.node.stopAllActions();
                card.node.runAction(cc.sequence(
                    cc.delayTime(index*0.1),
                    cc.callFunc(()=>{
                        App.AudioManager.playGameSound("sounds/deal_card");
                    }),
                    cc.moveTo(0.4,x,y).easing(cc.easeExponentialOut()),
                    cc.callFunc(async (node,data)=>{
                        if(data.row==data.col&&(data.row==INN_COUNT-1)){
                            cc.error(">>>>>>",App.DataManager.getGameData().isRecord)
                            if(isGuide&&!App.DataManager.getGameData().isRecord){
                                this.guidTip.zIndex=10001;
                                //初始化新手引导
                                await NewGuideHelper.getInstance().init("scripts/guide/GuideConfig","scripts/guide/guide","game100");
                                NewGuideHelper.getInstance().run();
                            }
                            this.dealCard.getComponent(cc.Button).enabled=true;
                            this._canTouch=true;
                            this._canMove=true;
                            cb?.();
                        }
                    },card.node,{row:i,col:j})

                ))
                if(j==i){
                    card.metaData=cards[j];
                    card.setCardBack(false);
                }
                index++;
            }
        }
        
        this.UI_BTNS.get("pause").active=!this._isGuide;
        this.UI_BTNS.get("undo").active=!this._isGuide;
        this.dealCard.getComponent(cc.Button).enabled=false;
    }

    /**
     * 从牌堆取牌
     * @param cards 
     */
    getCards(cards: number[],hasAnim?:boolean) {
        if(this._isGuide){
            NewGuideHelper.getInstance().finishTask();
        }
        if(hasAnim==undefined)hasAnim=true;
        let tempCards=this._dealCards.concat();
        this._dealCards.splice(0,this._dealCards.length);
        let x=this.dealCard.x-this.dealCard.width/2-115;
        let len=cards.length;
        let time=0.05;
        for(let i=0;i<len;i++){
            let card=this.getCardNode(i).getComponent(Game100Card);
            card.cardZone=Game100CardZone.DEAL;
            card.index=i;
            card.setCardBack(true);
            card.node.name="dealCard"+(i+1)
            this.node.addChild(card.node,LAYER_INDEX.DEALCARD+(len-i)+1);
            let pos=this.dealCard.position;
            pos.x-=card.node.width*0.5
            card.node.setPosition(pos);
            let distance=this.dealCard.position.x-x-card.node.width;
            if(hasAnim){
                card.node.anchorX=0;
                card.anchorX=0;
                let toX=x+i*38;
                card.canSelect=false;
                card.node.stopAllActions();
                card.node.runAction(cc.sequence(
                    cc.delayTime(i*time),
                    cc.spawn(
                        cc.moveTo(time,toX+distance*0.75,this.dealCard.y),
                        cc.skewTo(time,1,15),
                    ),
                    cc.spawn(
                        cc.moveTo(time,toX+distance*0.5,this.dealCard.y),
                        cc.scaleTo(time,0,1)
                    ),
                    cc.callFunc(node=>{
                        node.zIndex=LAYER_INDEX.DEALCARD+i+1;
                    }),
                    cc.callFunc((node:cc.Node,data)=>{
                        let com=node.getComponent(Game100Card)
                        com.metaData=data;
                        com.setCardBack(false);
                        card.canSelect=false;
                        node.anchorX=1;
                        card.anchorX=1;
                        node.skewY=-15;
                    },card.node,cards[i]),
                    cc.spawn(
                        cc.moveTo(time,toX+card.node.width*0.5+distance*0.25,this.dealCard.y),
                        cc.scaleTo(time,1),
                    ),
                    cc.spawn(
                        cc.moveTo(time,toX+card.node.width*0.5,this.dealCard.y),
                        cc.skewTo(time,1,0)
                    ),
                    cc.callFunc(node=>{
                        node.anchorX=0.5;
                        card.anchorX=0.5;
                        node.x=toX;
                        node.y=this.dealCard.y;
                        node.getComponent(Game100Card).canSelect=true;
                    })
                ))
            }else{
                card.metaData=cards[i];
                card.node.setPosition(x+i*38,this.dealCard.y)
                card.setCardBack(false);
            }
            this._dealCards.push(card);
        }

        this.scheduleOnce(()=>{
            while(tempCards.length>0){
                this.backCardNode(tempCards.pop().node)
            }
        },hasAnim?time*2:0);
       
        App.AudioManager.playGameSound("sounds/deal_card");
    }

    backCards(cards: number[]){
        let pos=this.dealCard.getPosition();
        for(let i=this._dealCards.length-1;i>=0;i--){
            let card=this._dealCards[i];
            card.cardZone=Game100CardZone.DEAL;
            card.node.zIndex=LAYER_INDEX.MOVE+i;
            card.node.anchorX=1;
            card.anchorX=1;
            card.index=i;
            let time=0.05;
            card.node.x+=card.node.width*0.5;
            let distance=pos.x-card.node.x-card.node.width*0.5;
            card.canSelect=false;
            card.node.stopAllActions();
            card.node.runAction(cc.sequence(
                cc.delayTime((this._dealCards.length-i-1)*time),
                cc.spawn(
                    cc.moveTo(time,card.node.x+distance*0.25,this.dealCard.y),
                    cc.skewTo(time,1,-15)
                ),

                cc.spawn(
                    cc.moveTo(time,card.node.x+distance*0.5,this.dealCard.y),
                    cc.scaleTo(time,0,1),
                ),

                cc.callFunc((node:cc.Node,data)=>{
                    let com=node.getComponent(Game100Card)
                    com.setCardBack(true);
                    node.anchorX=0;
                    card.anchorX=0;
                    node.skewY=15;
                    node.zIndex=LAYER_INDEX.MOVE+data.index;
                },card.node,{index:this._dealCards.length-i}),
                cc.spawn(
                    cc.moveTo(time,pos.x-card.node.width*0.5-distance*0.25,this.dealCard.y),
                    cc.scaleTo(time,1),
                ),
                cc.spawn(
                    cc.moveTo(time,pos.x-card.node.width*0.5,this.dealCard.y),
                    cc.skewTo(time,1,0)
                ),
                cc.callFunc(node=>{
                    node.anchorX=0.5;
                    card.anchorX=0.5;
                    node.x=pos.x;
                    node.y=this.dealCard.y;
                    this.backCardNode(node);
                })
            ))
        }

        this._dealCards.splice(0,this._dealCards.length);

        let x=this.dealCard.x-this.dealCard.width/2-115;
        let len=cards.length;
        for(let i=0;i<len;i++){
            let card=this.getCardNode(i).getComponent(Game100Card);
            card.cardZone=Game100CardZone.DEAL;
            card.index=i;
            card.metaData=cards[i];
            card.node.setPosition(x+i*38,this.dealCard.y)
            card.setCardBack(false);
            this.node.addChild(card.node,LAYER_INDEX.DEALCARD+i);
            this._dealCards.push(card);
        }

        //生成原来的牌
        App.AudioManager.playGameSound("sounds/deal_card");
    }

    showAutoNextCards(cards:number[]){
        this._dealCards.splice(0,this._dealCards.length);
        let x=this.dealCard.x-this.dealCard.width/2-115;
        let len=cards.length;
        for(let i=0;i<len;i++){
            let card=this.getCardNode(i).getComponent(Game100Card);
            card.cardZone=Game100CardZone.DEAL;
            card.index=i;
            card.metaData=cards[i];
            let offsetX=x+i*38;
            card.node.setPosition(x,this.dealCard.y)
            card.setCardBack(false);
            this.node.addChild(card.node,LAYER_INDEX.DEALCARD+i);
            this._dealCards.push(card);
            card.node.opacity=0;
            card.node.stopAllActions();
            cc.tween(card.node).delay(i*0.05).to(0.2,{opacity:255,x:offsetX}).start();
        }

        //生成原来的牌
        App.AudioManager.playGameSound("sounds/deal_card");
    }

    backNextCards(){
        let x=this.dealCard.x-this.dealCard.width/2-115;
        let tempCards=this._dealCards.concat();
        this._dealCards.splice(0,this._dealCards.length);
        let len=tempCards.length;
        for(let i=0;i<len;i++){
            let card=tempCards[i];
            card.node.stopAllActions();
            cc.tween(card.node).delay(i*0.05).to(0.2,{opacity:0,x:x}).call(node=>{
                this.backCardNode(node);
            }).start();
        }
    }



    playFlipCardSound(){
        App.AudioManager.playGameSound("sounds/flip_card");
    }

    showNewCard(card:number,index:number){
        let cards=this._cards[index];
        let gameCard=cards[cards.length-1];
        if(!gameCard.isCardBack())return false;
        gameCard.metaData=card;
        gameCard.turn();
        //gameCard.setCardBack(false);
        this._scoreMovePos=gameCard.node.getPosition();
        return true;
    }

    setLeftTime(time:number){
        if(time<0)return;
        time=Math.min(time,300);
        this._time=time;
        this.UIBindData.time=GameHelper.fromatTimeNew(this._time);

        this._timeCheck=time^this._timeCheckXorCode;
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
        if((this._time%60==0)&&(this._time!=0)){
            this.lessTimeAnim.node.active=true;
            this.lessTimeAnim.setAnimation(0,(this._time/60).toString(),false);
        }
        if(this._time<=10){ 
            this.UI_LBS.get("time").color=RED;
            cc.tween(this.UI_LBS.get("time")).to(0.45,{scale:1.5}).to(0.45,{scale:1}).start();
        }else if(this._time>10&&this._time<180){
            this.UI_LBS.get("time").color=YELLOW;
        }

        this._time--;

        this._timeCheck^=this._timeCheckXorCode;
        this._timeCheck--;
        this._timeCheck^=this._timeCheckXorCode;

        this.UIBindData.time=GameHelper.fromatTimeNew(this._time);
        if(this._time<=0){
            this.unschedule(this._updateTime);
            this._gameOver=true;
            cc.game.emit(Game100Events.GAMEOVER);
        }
    }

    setBoxCards(cards:number[][]){
        for(let i=0;i<cards.length;i++){
            let tcards=cards[i];
            for(let j=0;j<tcards.length;j++){
                let card=this.getCardNode(1).getComponent(Game100Card);
                card.metaData=tcards[j];
                card.setCardBack(false);
                card.index=i;
                card.cardZone=Game100CardZone.BOX;
                this.node.addChild(card.node,j);
                card.node.setPosition(this._boxZone[i].position);
                this._boxCards[i].push(card);
            }
        }
    }

    roundOver(val:boolean){
        this.dealCard.opacity=val?0:255;
        this.resetTip.active=val;
    }

    /**
     * 自动飞牌
     */
    autoSolvePaths(paths:{fromIndex:number,toIndex:number,cardZone:Game100CardZone}[],progressCallBack:Function,callback?:Function){
        this._canTouch=false;
        this._canMove=false;
        this.setUndoEnable(false);
        this.UI_BTNS.get("pause").active=false;
        this.UI_BTNS.get("undo").active=false;
        App.AudioManager.playGameSound("sounds/Gamecomplete");
        let index=0;
        this.schedule(()=>{
            let path=paths[index];
            let card:Game100Card;
            if(path.cardZone==Game100CardZone.ZONE){
                card=this.moveCardZ2B(path.fromIndex,path.toIndex,false);
            }else{
                this.moveCardD2B(path.toIndex,false);
            }
            progressCallBack&&progressCallBack(path,card);
            index++;
            if(index==paths.length){
                callback&&callback();
            }
        },0.2,paths.length-1)
    }

    playGameOverAnim(){
        let index=0;
        this.schedule(()=>{
            for(let i=0;i<4;i++){
                let card=this._boxCards[i].pop();
                card.node.zIndex=LAYER_INDEX.MOVE+index+20;
                card.playDestoryAnim((x,y)=>{
                    let effect:cc.Node=cc.instantiate(this.cardDestroyPrefabs[Math.floor(Math.random()*this.cardDestroyPrefabs.length)]);
                    effect.setPosition(x,y);
                    this.node.addChild(effect);
                });
            }
        },1,12)
    }

    private _scoreHitCount:number=1;

    _resetScoreHit(){
        this._scoreHitCount=1;
    }

    _addScoreHit(){
        this.unschedule(this._resetScoreHit);
        this.scheduleOnce(this._resetScoreHit,3)
        this._scoreHitCount=Math.min(this._scoreHitCount+1,6);
    }


    setScore(score:number,hasAnim?:boolean,hasDumpAnim?:boolean,hasVibrator?:boolean){
        if(this._gameOver)return;
        let moveUp:boolean=this._autoFinishIng;
        let add=score-this._scores;
        if(add==0)return;

        if(add>0){
            if(App.AudioManager.getGameConfig().vibrator){
                if(hasVibrator!=false){
                    App.NativeManager.shockByCustom("0#40");
                }
            }
        }

        this._scores=score;

        

        //上传分数操作
        cc.game.emit(GameEvents.GAME_ADDSCORE,add);

        if(hasAnim==false){
            this.rollNumGroup.setData(score,500,0,false);
            return
        }
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
        view.zIndex=LAYER_INDEX.MOVE;
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

        if(add>0){
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
                ))
                actions.push( cc.callFunc(node=>{
                    this._scorePool.put(node);
                    //this.rollNumGroup.setData(score,500);
                }));
            }
            view.opacity=255;
            if(hasDumpAnim==false){
                actions.unshift(cc.moveTo(jumpTime,targetPos));
            }else{
                actions.unshift(cc.jumpTo(jumpTime,targetPos,100,1));
            }
            view.setPosition(this._scoreMovePos);
           
        }else{
            view.opacity=0;
            actions.unshift(cc.fadeIn(0.2));
            view.setPosition(targetPos);
        }
        view.runAction(cc.sequence(actions));
    }

    _autoScorePosition(){
        let len=this._addScoreSequence.length;
        for(let i=0;i<len;i++){
            let scoreView=this._addScoreSequence[i]
            scoreView.setPosition(cc.winSize.width/2-20,this.UI_LBS.get("score").y+(len-i-1)*scoreView.height);
        }
    }

    /**
     * 设置剩余次数
     * @param time 
     */
    setFreeTime(time:number){
        if(time<=0){
            this.UIBindData.leftFreeTime="20";
        }else{
            this.UIBindData.leftFreeTime=App.LangManager.getTxtByCurrentGame("freeTimeTip",[Math.max(time,0)]);
        }
    }

    onAutoFinish(){
        //cc.game.off("onMoveCard",this._onMoveCard,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)
        this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)
        cc.game.off(Game100Events.ONMOVECARD_START,this._onSelectCard,this)

        this.UI_BTNS.get("pause").getComponent(cc.Button).interactable=false;
        this.UI_BTNS.get("undo").getComponent(cc.Button).interactable=false;
        this.UI_BTNS.get("getCard").getComponent(cc.Button).interactable=false;
        this._autoFinishIng=true;
    }

    canCheckGameOver(){
        if(this._dealCards.length>0)return false;
        let count=0;
        for(let i=0;i<this._cards.length;i++){
            let cards=this._cards[i];
            for(let j=0;j<cards.length;j++){
                if(!cards[j].metaData){
                    return false;
                }
                count++;
            }
        }

        this._boxCards.forEach(item=>{
            count+=item.length;
        })

        return count==52;
    }

    _guideTouchZone(touchNode:cc.Node){
        let rect=touchNode.getBoundingBox();
        let p=touchNode.parent.convertToWorldSpaceAR(rect.origin);
        rect.origin=p;
        NewGuideHelper.getInstance().updateClickRect(rect);
    }

    _onGuideStart(stepId:number,rect_light:cc.Rect,rect_click:cc.Rect,data:any){
        if(stepId<=3){
            this.guidTip.y=rect_light.y-this.guidTip.height/2-50;
            this.guidTip.getChildByName("auto_lb_guideTip").getComponent(cc.RichText).string=data;
            this.guidTip.active=true;
        }else{
            this.guidTip.active=false;
        }
        switch(stepId){
            case 1:
                this._guideTouchZone(this._cards[1][1].node);
                break;
            case 2:
                this._guideTouchZone(this._cards[0][0].node);
                break;
            case 3:
                this._guideTouchZone(this._cards[2][2].node);
                break;
        }
    }

    _onGuideEnd(stepId:number){
        this.guidTip.active=false;
        if(stepId==5){
            this._isGuide=false;
            this.scheduleOnce(()=>{
                //引导完成
                let data:ComDlgData = new ComDlgData();
                data.title = "Congratulations";

                data.group = [{name:"Start Game",isExit:true,cb:()=>{
                    cc.sys.localStorage.setItem("guide_game100","true");
                    App.SceneManager.loadScene("mainOffline","game100");

                }}];
                data.txt = "You have completed the guide and are ready to experience the real game.";
                data.clickSpaceHide=false;
                App.DlgManager.showDlg("comdlg",data,"game100");
            },1)
        }
    }

    getLessTime():number{
        return this._timeCheck^this._timeCheckXorCode;
    }

    onDestroy(){
        cc.game.off("onMoveCard",this._onMoveCard,this);
        this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)
        this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)
        cc.game.off(Game100Events.ONMOVECARD_START,this._onSelectCard,this)
        
        cc.game.off(GUIDE_EVENTS.START,this._onGuideStart,this);
        cc.game.off(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
    }
    // private _showTestDlg(){
    //     if(this.UI_BTNS.get("test")){
    //         this.UI_BTNS.get("test").active = true;
    //     }
    // }
    // onTestClick(){
    //     App.DlgManager.showDlg("test",null,"game100");
    // }
}
