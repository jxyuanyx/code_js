// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { SCREEN_DIRECTION } from "../../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChangeDirection extends BaseDlg {



    @property(cc.Animation)
    changeAnimation:cc.Animation;

    beforeShow(){
        this.changeAnimation.node.opacity=0;
    }

    afterShow(){
        let direction:SCREEN_DIRECTION=this._data;
        if(direction==SCREEN_DIRECTION.TYPE_L){
            this.changeAnimation.play("ChangeScreen_1");
        }else{
            this.changeAnimation.play("ChangeScreen_2");
        }
    }
}
