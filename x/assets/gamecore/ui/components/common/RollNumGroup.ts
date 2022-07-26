import RollNum from "./RollNum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RollNumGroup extends cc.Component {

    @property
    count:number=0;

    private _items:RollNum[]=[];
    private _data:number=0;

    private _isHidePreFix:boolean=false;

    onLoad(){
        for(var i=0;i<this.count;i++){
            var rollnum=this.node.getChildByName('item'+i)
            let rollnumItem=rollnum.addComponent(RollNum)
            rollnumItem.speed=10
            this._items.push(rollnumItem)
        }

        this._data=0
    }

    //隐藏前缀
    hidePreFix(){
        this._isHidePreFix=true;
    }

    _checkPreFix(){
        let showIndex:number=this._items.length;
        for(let i=this._items.length-1;i>=0;i--){
            if(i==0)return;
            let rollNum=this._items[i];
            if((rollNum.getData()==0)&&(showIndex==this._items.length)){
                rollNum.node.active=false;
                continue;
            }else{
                if(showIndex==this._items.length)showIndex=i;
            }
            if(i<=showIndex){
                rollNum.node.active=true;
            }
        }
    }

    setData(data:number,speed:number=200,round:number = null,anim?:boolean,completeCb?:Function,itemCb?:Function,target?:any){
        if(this._data==data)return
        this._data=data
        let cbIndex=0
        for(var i=0;i<this._items.length;i++){
            var rollnum=this._items[i]
            if(data>=1){
                rollnum.node.active=true;
            }
            else{
                rollnum.node.active = (this._data==0&&(i==0))?true:false;
            }
            rollnum.startRoll(data%10,anim,speed,round,(move)=>{
                cbIndex++
                move&&itemCb&&itemCb.call(target,rollnum);
                if(cbIndex==this._items.length){
                    completeCb&&completeCb.call(target);
                }
            })
            data=Math.floor(data/10)
        }
        if(this._isHidePreFix){
            this._checkPreFix();
        }
    }

    getData(){
        return this._data;
    }

    setDataSequence(data:number,anim:boolean,speed?:number,cb?:Function,itemCb?:Function){
        this._data=data
        let cbIndex=0
        for(var i=0;i<this._items.length;i++){
            var rollnum=this._items[i]
            rollnum.startRoll(data%10,anim,speed || 1500,20+i*2,()=>{
                cbIndex++
                itemCb&&itemCb(rollnum)
                if(cbIndex==this._items.length){
                    cb&&cb()
                }
            })
            data=Math.floor(data/10)
            if (i >= String(this._data).length) {
                this._items[i].node.active = false;
            }
        }
        this.setSymBol(this._data);
    }

    //多余的位数隐藏
    setDataOnly(data:number,speed:number=200,round:number = null,anim?:boolean,completeCb?:Function,itemCb?:Function,target?:any){
        if(this._data==data)return;
        this._data=data;
        let cbIndex=0;
        for(var i=0;i<this._items.length;i++){
            var rollnum=this._items[i];
            if(data>=1)rollnum.node.active=true;
            rollnum.startRoll(data%10,anim,speed,round,(move)=>{
                cbIndex++;
                move&&itemCb&&itemCb.call(target,rollnum);
                if(cbIndex==this._items.length){
                    completeCb&&completeCb.call(target);
                }
            })
            data=Math.floor(data/10)
            if (i >= String(this._data).length) {
                this._items[i].node.active = false;
            }
        }
        if(this._isHidePreFix){
            this._checkPreFix();
        }
        this.setSymBol(this._data);
    }

    private setSymBol(data:number){
        let num = Math.ceil(this.count / 3) - 1;
        let show = Math.ceil(String(data).length / 3) - 1;
        for (let index = 0; index < num; index++) {
            this.node.getChildByName('symbol_'+index).active = index<show;
        }
        
    }


}
