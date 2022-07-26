// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode

//拖到控件上直接输入即可
export default class ZIndexUtil extends cc.Component {

    @property(Number)
    ZIndex: number = 0;

    update(){
        if (this.ZIndex != this.node.zIndex) {
            this.node.zIndex = this.ZIndex;
        }
    }

    onLoad(){
        this.node.zIndex = this.ZIndex;
    }
}
