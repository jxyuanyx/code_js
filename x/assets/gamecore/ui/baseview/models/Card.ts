import App from "../../../App";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Card extends cc.Component{
    @property(cc.Sprite)
    protected cardBack:cc.Sprite=null;

    @property(cc.Sprite)
    protected cardFront:cc.Sprite=null;

    @property(cc.Node)
    protected selectNode:cc.Node=null;

    @property(cc.Node)
    protected maskNode:cc.Node=null;

    protected _cardType:number=0;
    protected _cardValue:number=0;
    protected _metaData:number=0;
    protected _canSelect:boolean=true;

    get cardType(): number {
        return this._cardType;
    }

    set cardType(value: number) {
        this._cardType = value;
    }

    get cardValue(): number {
        return this._cardValue;
    }

    set cardValue(value: number) {
        this._cardValue = value;
    }

    get metaData(): number {
        return this._metaData;
    }

    set metaData(meta: number) {
        if(!meta){
            this.cardBack.spriteFrame=this._cardAtlas.getSpriteFrame("cardback_1");
            return;
        }
        this._metaData = meta;
        
        this._cardValue=meta&0xf;

        this._cardType=meta>>4;

        this.cardFront.spriteFrame=this._cardAtlas.getSpriteFrame(meta.toString());
        this.cardFront.node.active=true;
    }

    protected _startPos:cc.Vec3;
    //private _offset:cc.Vec2;

    protected _cardAtlas:cc.SpriteAtlas;

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START,this._onTouch,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this)
    }

    setSelect(val:boolean){
        let pos=this.node.position.clone();
        let distance:number=val?-30:30;
        this.node.setPosition(this.node.position.add(pos.normalizeSelf().mulSelf(distance)));
    }

    _onTouch(event:cc.Event.EventTouch){
        if(!this._canSelect)return;
        let location=event.getLocation();
        let pos=this.node.parent.convertToNodeSpaceAR(location);
        this._startPos=this.node.position;
    }

    _onTouchMove(event:cc.Event.EventTouch){
        if(!this._canSelect)return;

        let location=event.getLocation();
        let pos=this.node.parent.convertToNodeSpaceAR(location);
        this.node.setPosition(pos);
    }

    _onTouchEnd(event:cc.Event.EventTouch){
        if(!this._canSelect)return;

        let location=event.getLocation();
        let pos=this.node.parent.convertToNodeSpaceAR(location);
        if(pos.y-this._startPos.y>=100){
            cc.game.emit("outCardEvent",this.metaData);
        }else{
            this.node.setPosition(this._startPos);
        }
    }

    setCardBack(val){
        this.cardBack.node.active=val;
        this._canSelect=!val;
    }

    isCardBack(){
        return this.cardBack.node.active;
    }


    turn(time?:number,cb?:Function,target?:any){
        if(!time)time=0.2;
        let scale=this.node.scaleY;
        this._canSelect=false;
        this.node.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(time/2,0.2,scale),
                cc.skewTo(time/2,0,15),
            ),
            cc.callFunc(()=>{
                this.cardBack.node.active=false;
                this.cardFront.node.active=true;
            }),
            cc.spawn(
                cc.scaleTo(time/2,scale),
                cc.skewTo(time/2,0,0),
            ),
            cc.callFunc(()=>{
                cb&&cb.call(target);
                this._canSelect=true;
            })
        ))
    }

    turnBack(time?:number){
        if(!time)time=0.2;
        let scale=this.node.scaleY;
        this._metaData=0;
        this.node.runAction(cc.sequence(
            cc.scaleTo(time/2,0.2,scale),
            cc.callFunc(()=>{
                this.cardFront.node.active=false;
                this.cardBack.node.active=true;
            }),
            cc.scaleTo(time/2,scale),
            cc.callFunc(()=>{

            })
        ))
    }

    showMask(val:boolean){
        this.maskNode.active=val;
    }

    showLight(val:boolean){
        this.selectNode.stopAllActions();
        if(val){
            this.selectNode.opacity=0;
            this.selectNode.active=true;
            this.selectNode.runAction(cc.fadeIn(0.2))
        }else{
            this.selectNode.opacity=255;
            this.selectNode.runAction(cc.sequence(
                cc.fadeOut(0.1),
                cc.callFunc(node=>node.active=false)
            ))
        }
    }

    set anchorX(anchorX:number){
        this.node.children.forEach(item=>{
            item.anchorX=anchorX;
        })
    }

    set canSelect(val:boolean){
        this._canSelect=val;
    }

    get canSelect(){
        return this._canSelect;
    }

}