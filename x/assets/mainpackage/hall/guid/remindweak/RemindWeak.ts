// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";

const {ccclass, property} = cc._decorator;

export const REMINDWEAK:string = "remindweak";
export const CLEARREMIND:string = "clearremind";

@ccclass
export default class RemindWeak extends cc.Component {

    @property(cc.RichText)
    label_info:cc.RichText = null;

    @property(cc.Node)
    img_weak:cc.Node = null;

    setData(node:cc.Node,data:any){
        node.addChild(this.node);
        let txt = App.LangManager.getTxtByKey("remindweak"+data.reminder_type,[data.count,data.info]);
        this._playImgAnim(node,txt);
    }

    private _playImgAnim(node:cc.Node,txt?:string){
        let pos = cc.director.getScene().getChildByName("Canvas").convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        this.img_weak.stopAllActions();
        let big = cc.scaleTo(1.5,1);
        let small = cc.scaleTo(1.5,0.95);
        let sequence = cc.sequence(big,small);
        this.img_weak.runAction(cc.repeatForever(sequence));

        this._setTxt(txt);
        this._setPos(pos);
    }

    private _setTxt(txt:string){
        this.label_info.getComponent(cc.RichText).string = txt;
    }
    
    private _setPos(pos:cc.Vec3){
        this.node.x = 0;
        this.node.y = 0+this.node.height;
    }

    onBtnClick(){
        cc.game.emit(CLEARREMIND);
    }
}
