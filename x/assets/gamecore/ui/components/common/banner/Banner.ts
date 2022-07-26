// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import App from "../../../../App";
import { RewardEnum } from "../../../../enums/RewardEnum";
import CheckBox from "../CheckBox";

const {ccclass, property} = cc._decorator;

export const BANNER_CLICK="banner_click";

export class BannerData{
    key:string;
    view:cc.Node;
    constructor(key:string,view:cc.Node){
        this.key=key;
        this.view=view;
    }
}

@ccclass
export class Banner extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property
    intervalTime:number=3;

    @property
    moveSpeed:number=0.5;

    @property(cc.Node)
    indInstance:cc.Node;

    private _currentIndex:number=0;

    private _itemWidth:number=0;

    private _total:number=0;

    private _pause:boolean=true;
    
    private _startPos:cc.Vec2;

    private _startTime:number;

    private _inds:CheckBox[]=[];

    private _currentTime:number=0;

    private _banners:BannerData[];

    private _idsContent:cc.Node;

    public eventEmitter:cc.EventTarget=new cc.EventTarget();

    onLoad(){
        let content=new cc.Node();
        let layout=content.addComponent(cc.Layout);
        layout.type=cc.Layout.Type.HORIZONTAL;
        layout.resizeMode=cc.Layout.ResizeMode.CONTAINER;
        layout.spacingX=15;
        this.node.addChild(content,999);
        content.x=this.indInstance.x;
        content.y=this.indInstance.y;
        this._idsContent=content;
    }

    async init(data:BannerData[]){
        this.pause();
        this._banners=data;
        this.content.removeAllChildren();
        this._idsContent.destroyAllChildren();
        this._inds.splice(0,this._inds.length);

        if(this._banners.length==0)return;
        this._itemWidth=this._banners[0].view.width;
        this._total=this._banners.length;
        this._currentIndex=0;
        this._currentTime=0;
        this.content.x=0;
        for(let i=0;i<this._banners.length;i++){
            this._banners[i].view.parent&&this._banners[i].view.removeFromParent();
            this.content.addChild(this._banners[i].view);
        }
        if(data.length>1){
            let node=cc.instantiate(this._banners[0].view);
            this.content.addChild(node);
        }

        this._createInds(data.length);
    }

    get data(){
        return this._banners;
    }

    _createInds(count:number){
        if(!this.indInstance)return;
        for(let i=0;i<count;i++){
            let item=cc.instantiate(this.indInstance);
            item.y=0;
            this._idsContent.addChild(item);
            this._inds.push(item.getComponent(CheckBox));
        }
        this.indInstance.removeFromParent();
        this._setIndIndex();
    }

    _setIndIndex(){
        if(!this.indInstance)return;
        for(let i=0;i<this._inds.length;i++){
            this._inds[i].checked=false;
        }
        let index=(this._currentIndex>=this._total)?0:this._currentIndex;
        this._inds[index].checked=true;
    }

    onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchEnd,this);
        this._currentIndex=0;
        this.content.x=0;
    }

    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchStart,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchEnd,this);
    }

    _onTouchStart(event:cc.Touch){
        this._startPos=event.getLocation();
        this._pause=true;
        this._startTime=cc.sys.now();
        //this.eventEmitter.emit(cc.Node.EventType.TOUCH_START)
    }

    _onTouchMove(event:cc.Touch){
        let pos=event.getLocation();
        if(this._currentIndex<=0 && pos.x>this._startPos.x){
            return;
        }
        if(this._currentIndex>=(this._total-1) && pos.x<this._startPos.x){
            return;
        }

        let distance=pos.x-this._startPos.x;
        this.content.x=-this._currentIndex*this._itemWidth+distance;
    }

    _onTouchEnd(event:cc.Touch){
       // this.eventEmitter.emit(cc.Node.EventType.TOUCH_END)
        let endPos=event.getLocation();
        if(cc.sys.now()-this._startTime<=200&&Math.abs(endPos.x-this._startPos.x)<20){
            cc.game.emit(BANNER_CLICK,this._banners[(this._currentIndex>=this._total)?0:this._currentIndex].key);
            if(this._banners.length>1){
                this._scrollToIndex(0.1);
            }
            return
        }
        if(this._banners.length<2){
            return;
        }
        //向左
        if(endPos.x-this._startPos.x>=this._itemWidth/3){
            if(this._currentIndex<=0){
                this.resume();
                return;
            }
            this._currentIndex--;
            this._scrollToIndex(0.1,()=>{});
           
        }else if(this._startPos.x-endPos.x>=this._itemWidth/3){//向右
            if(this._currentIndex>=(this._total-1)){
                this.resume();
                return;
            }
            this._currentIndex++;
            this._scrollToIndex(0.1);
           
        }else{
            this._scrollToIndex(0.1);
        }
    }

    run(){  
        console.log(">>>>>>>>>>>>>",this._banners.length)
        if(this._banners.length<=1){
            this._pause=true;
            this._inds.forEach((item:CheckBox)=>{
                item.node.active=false;
            })
            return
        }
        this.resume();
    }

    pause(){
        this._pause=true;
    }

    resume(){
        this._currentTime=0;
        this._pause=false;
    }

    _scrollToIndex(time?:number,cb?:Function,resume?:boolean){
        cc.tween(this.content).to((time==undefined)?this.moveSpeed:time,{x:-this._currentIndex*this._itemWidth}).call(()=>{
            if(this._currentIndex>=this._total){
                this._currentIndex=0;
                this.content.x=0;
            }
            this._setIndIndex();
            if(resume==undefined){
                this.resume()
            }
            cb&&cb();
        }).start();
    }

    _do(){
        this._currentIndex++;
        this._scrollToIndex();
    }

    update(dt:number){
        if(this._pause)return;
        this._currentTime+=dt;
        if(this._currentTime>=this.intervalTime){
            this._do();
            this._currentTime=0;
        }
    }

    set index(index:number){
        this._currentIndex=index;
        this._scrollToIndex(); 
    }



    // update (dt) {}
}
