// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import GameItem from "./GameItem";





const {ccclass, property} = cc._decorator;

@ccclass
export class FgItem extends BaseComponent {

    @property(cc.Prefab)
    item_game:cc.Prefab=null;

    @property(cc.Node)
    content:cc.Node=null;

    private _gamePool:cc.NodePool = new cc.NodePool();
    private _itemgame:cc.Node[] = [];
    
    flushFavoriteGame(data:any){
        while(this._itemgame.length > 0){
            this._gamePool.put(this._itemgame.pop());
        }
        this._itemgame = [];
        if(!data)return;
        
        for (let index = 0; index < data.length; index++) {
            let item = this.getItemForPool();
            this.content.addChild(item);
            let gameItem = item.getComponent(GameItem);
            gameItem.flushdata(data[index]);
            this._itemgame.push(item);
        }
    }

    getItemForPool(){
        let item = this._gamePool.get();
        if (item) {
            
        }
        else{
            item = cc.instantiate(this.item_game);
        }
        return item;
    }
    
}
