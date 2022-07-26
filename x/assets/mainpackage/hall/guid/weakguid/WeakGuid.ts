
const {ccclass, property} = cc._decorator;

export const WEAKTYPE = {
    sprite:"sprite",
    anim:"anim"
}

@ccclass
export default class WeakGuid extends cc.Component {

    @property(cc.Node)
    img_weak:cc.Node = null;

    @property(cc.Node)

    @property(cc.Node)
    anim_weak:cc.Node = null;
    
    @property(cc.Node)
    label_txt: cc.Node = null;

    setData(node:cc.Node,type:string,txt?:string){
        node.addChild(this.node);
        if (type == WEAKTYPE.sprite) {
            this._setSprite(node,txt);
        }
        else if(type == WEAKTYPE.anim){
            this._setAnim();
        }
    }

    private _setAnim(){
        this.img_weak.active = false;
        this.anim_weak.active = true;
    }

    private _setSprite(node:cc.Node,txt?:string){
        this.img_weak.active = true;
        this.anim_weak.active = false;
        let pos = cc.director.getScene().getChildByName("Canvas").convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        this._setTxt(txt);
        this._setPos(pos);

        this.img_weak.stopAllActions();
        let big = cc.scaleTo(1.5,1);
        let small = cc.scaleTo(1.5,0.95);
        let sequence = cc.sequence(big,small);
        this.img_weak.runAction(cc.repeatForever(sequence));
    }

    private _setTxt(txt:string){
        this.label_txt.getComponent(cc.Label).string = txt;
    }
    
    private _setPos(pos:cc.Vec3){
        this.node.scaleX = pos.x>0 ? 1:-1;
        this.node.scaleY = pos.y>0 ? 1:-1;
        this.label_txt.scaleX = pos.x>0 ? 1:-1;
        this.label_txt.scaleY = pos.y>0 ? 1:-1;

        // for (let index = 0; index < this.node.childrenCount; index++) {
            // this.node.children[index].scaleX=this.node.scaleX;
            // this.node.children[index].scaleY=pos.y>0 ? 1:-1;
        // }
        this.node.x = pos.x>0?this.node.x-this.node.width/2+40:this.node.x+this.node.width/2-40;
        this.node.y = pos.y>0?this.node.y-this.node.height/2:this.node.y+this.node.height/2;
    }

}
