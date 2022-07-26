import App from "../../../App";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CheckBox extends cc.Component {

    @property(cc.Node)
    sp_off:cc.Node=null;
    @property(cc.Node)
    sp_on:cc.Node=null;

    @property(cc.Node)
    on_linkNode:cc.Node=null;

    @property(cc.Node)
    off_linkNode:cc.Node=null;

    _checked:boolean=false;

    set checked(value:boolean){
        this._checked=value
        this.flushUI();
    }
    get checked(){
        return this._checked;
    }

    private _callBack:Function;
    private _callBackTarget:Function;

    onLoad(){
       //this._checked=false
       //this.flushUI()
        this.node.on(cc.Node.EventType.TOUCH_START,this.onSelect,this)
    }

    onSelect(){        
        this._checked=!this._checked
        this.flushUI()
        if(this._callBack){
            this._callBack.call(this._callBackTarget,this._checked)
        }
        App.AudioManager.playSound("gamecore","sounds/click");
    }

    flushUI(){
        this.sp_on.active=this._checked
        this.sp_off.active=!this._checked

        if(this.on_linkNode)this.on_linkNode.active=false;
        if(this.off_linkNode)this.off_linkNode.active=false;
        if(this.on_linkNode&&this._checked){
            this.on_linkNode.active=true;
        }
        if(this.off_linkNode&&!this._checked){
            this.off_linkNode.active=true;
        }
    }

    addSelectCallBack(cb:Function,target?:any){
        this._callBack=cb;
        this._callBackTarget=target;
    }

    
}
