import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import FaqQuestion from "./FaqQuestion";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FaqTitleItem extends cc.Component{

     @property(cc.Node)
     expIcon:cc.Node=null;

     @property(cc.Label)
     title:cc.Label=null;

     @property(cc.Node)
     content:cc.Node=null;

     @property(cc.Node)
     questionInstance:cc.Node=null;

     onLoad(){
         this.content.active=false;
         this.questionInstance.removeFromParent();
     }

     setData(title:string,list:{ID:string,Title:string}[]){
        this.title.string=title;
        for(let i=0;i<list.length;i++){
            let question=cc.instantiate(this.questionInstance);
            this.content.addChild(question);
            question.getComponent(FaqQuestion).setData(list[i]);
        }
     }

     onTitleClick(){
         this.content.active=!this.content.active;
         this.expIcon.angle=this.expIcon.angle==0?180:0;
     }
     
}
