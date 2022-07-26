const {ccclass, property} = cc._decorator;

@ccclass
export default class RollNum extends cc.Component {

    @property
    speed:number=1;

    @property
    turnRound:number=0

    private itemHeight:number=0;

    private items:cc.Node[]=[];

    private _offsetIndex:number=2;

    private _stop:boolean=true;

    private _data:number=0;

    private _cb:Function=null;

    private currentRound:number=0;

    onLoad () {
        var children=this.node.children;
        let instance=children[0];
        this.itemHeight=instance.height
        this.items=[]
        for(let i=0;i<3;i++){
            let item=cc.instantiate(children[0])
            this.items.push(item)
            item.parent=this.node
            item.x=0
            item.y=-i*this.itemHeight
            item.getComponent(cc.Label).string=i.toString();
        }
        instance.removeFromParent(true);
        instance.opacity=0;
        this._offsetIndex=2
        this._stop=true

        this._data=0
    }

    getData(){
        return this._data;
    }
    /**
     * 
     * @param {*} data 
     * @param {*} anim 
     * @param {*} speed     速度
     * @param {*} turnround 转的轮数
     */
    startRoll(data,anim,speed,turnround,cb){
        if(this._data==data&&turnround==undefined){
            cb&&cb(false)
            return
        }
        this._data=data
        this._stop=true
        this._cb=cb
        this.currentRound=0
        if(speed)this.speed=speed
        if(turnround)this.turnRound=turnround
        for(let i=0;i<this.items.length;i++){
            let item=this.items[i]
            item.x=0
            item.y=-i*this.itemHeight
            item.active=true
        }
        if(anim==false&&this.node.active){
            this.items[0].getComponent(cc.Label).string=data
            return
        }
        this._stop=false
    }

    update(dt){
        if(this._stop)return
        for(let i=0;i<this.items.length;i++){
            let item=this.items[i]
            let step=dt*this.speed
            item.y+=step
            if(item.y>=this.itemHeight){
                item.y=-2*this.itemHeight+step
                this._offsetIndex=(++this._offsetIndex)%10
                item.getComponent(cc.Label).string=this._offsetIndex+""
            }
            if(item.y>=0&&this.currentRound!=this.turnRound&&i==this.items.length-1){
                this.currentRound++
            }
            if(item.y>=0&&parseInt(item.getComponent(cc.Label).string)==this._data&&this.currentRound==this.turnRound){
                item.y=0
                this._stop=true
                this._cb&&this._cb(true)
                this._hideOther(i)
                return
            }
        }
    }

    _hideOther(index){
        for(let i=0;i<this.items.length;i++){
            let item=this.items[i]
            if(i!=index){
                item.active=false
            }
        }
    }

}