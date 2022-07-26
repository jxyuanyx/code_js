// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import App from "../../../gamecore/App";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import { core } from "../../net/protos/proto";

export const NoticeType_MarQuee="marquee";

const {ccclass, property} = cc._decorator;

@ccclass
export  class Marquee extends BaseComponent {
    UIBindData={
        content:""
    }

    private _moveMarquee:boolean=false;

    private _speed:number=1;

    onLoad(){
        super.onLoad();
        this.node.active=false;
    }


    showNotice(){
        if(!this._moveMarquee){
            this.node.stopAllActions();
            this.node.active=true;
            this.node.opacity=0;
            cc.tween(this.node).to(0.2,{opacity:255}).call(()=>{
                this._moveContent();
            }).start();
            return true;
        }
        return false;
    }

    _moveContent(){
        let msg=App.NoticeManager.getMsg(NoticeType_MarQuee) as core.EvtMarqueeBroadcast;
        let  contentView=this.UI_LBS.get("content");
        if(msg){
            this.UIBindData.content =msg.content;

            contentView.x=cc.winSize.width;
            let time=(contentView.width+this.node.width)*this._speed*0.01;
            cc.tween(contentView)
                .to(time,{x:-contentView.width})
                .call((node:cc.Node)=>{
                    this._moveContent();
                }).start();
            this._moveMarquee=true;
        }else{
            cc.tween(this.node).to(0.2,{opacity:0}).call(node=>{
                this.node.active=false;
            }).start();
            this._moveMarquee=false;
        }
    }
}
