// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProgressFix extends cc.Component {

    get selectData(): any {
        return this._selectData;
    }

    @property(cc.Node)
    bar: cc.Node=null;

    @property(cc.Node)
    background: cc.Node=null;


    private _data: {pos:number,data:any }[];

    private _index:number=0;

    private _selectData:any;

    onLoad() {
        this.bar.on(cc.Node.EventType.TOUCH_END,this._touchEnd,this);
        this.bar.on(cc.Node.EventType.TOUCH_CANCEL,this._touchEnd,this);
    }

    start () {

    }

    _touchEnd(){
        let posX=this.bar.x;
        for(let i=1;i<this._data.length;i++){
            let data1=this._data[i-1];
            let data2=this._data[i]
            if(posX>=data1.pos&&posX<data2.pos){
                //算出最靠近的一方
                if(posX-data1.pos<data2.pos-posX){
                    this.index=i-1
                }else{
                    this.index=i;
                }
                break;
            }
        }
    }

    init(data:{pos:number,data:number }[],defalut?:number){
        if(defalut)this._index=defalut;
        this._data=data;
        this.index=this._index;
    }

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        if(value<0)value=0;
        if(value>=this._data.length)value=this._data.length-1;
        this._index = value;
        let data=this._data[this._index];
        this.bar.stopAllActions();
        this.bar.runAction(cc.moveTo(0.1,data.pos,this.bar.y));
        this._selectData=data.data;
        //if(this.background)this.background.width=data.pos;
    }

    // update (dt) {}
}
