// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopTip extends cc.Component {

    @property(cc.Label)
    info: cc.Label = null;

    //LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.y=cc.winSize.height+this.node.height/2;
        this.node.x=cc.winSize.width/2;
    }

    show(info:string,delayTime?:number,cb?:Function){
        if(arguments.length==2)cb=(delayTime as any) as Function;
        this.info.string=info;
        cc.director.getScene().addChild(this.node,999);
        this.node.runAction(cc.sequence(
            cc.moveTo(0.2,cc.winSize.width/2,cc.winSize.height-this.node.height/2),
            cc.delayTime(delayTime || 1.5 ),
            cc.moveTo(0.1,cc.winSize.width/2,cc.winSize.height+this.node.height/2),
            cc.callFunc(node=>{
                node.removeFromParent();
                cb&&cb();
            })
        ))
    }

    // update (dt) {}
}
