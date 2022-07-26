// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

const SUM:number = 5;

@ccclass
export default class GetCashAnim extends BaseDlg {

    @property(cc.Prefab)
    node_cash:cc.Prefab = null;

    private _cashList:cc.Node[] = [];

    afterShow(){
        
    }

    private _playGetAnim(){
        
        for (let index = 0; index < SUM; index++) {
            let cash = cc.instantiate(this.node_cash);
            this._cashList.push(cash);
            this.node.addChild(cash);
            let x = Math.random() * 400 - 200;
            let y = Math.random() * 400 - 200;
            cash.setPosition(cc.v3(x,y));
            cash.opacity = 0;
            cc.tween(cash)
            .to(1+0.2*index,{opacity:255})
            .to(1.5,{position:cc.v3(300,650)})
            .removeSelf()
            .start(); 
        }

    }

}
