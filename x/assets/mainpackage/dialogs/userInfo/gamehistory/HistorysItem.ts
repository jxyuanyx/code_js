// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import HistoryItem from "./HistoryItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistorysItem extends BaseComponent {

    @property(cc.Node)
    content:cc.Node=null;

    @property(cc.Prefab)
    item_history:cc.Prefab=null;

    private _historyPool:cc.NodePool = new cc.NodePool();
    private _itemhistroy:cc.Node[] = [];
    
    flushHistory(data:any){
        while(this._itemhistroy.length > 0){
            this._historyPool.put(this._itemhistroy.pop());
        }
        this._itemhistroy = [];
        if(!data)return;

        let tdata=[data.win_game,data.win_streak]
        
        for (let index = 0; index < tdata.length; index++) {
            let item = this.getItemForPool();
            this.content.addChild(item);
            let historyItem = item.getComponent(HistoryItem);
            historyItem.flushData({gsnum:tdata[index],index:index});
            this._itemhistroy.push(item);
        }
    }

    getItemForPool(){
        let item = this._historyPool.get();
        if (item) {
            
        }
        else{
            item = cc.instantiate(this.item_history);
        }
        return item;
    }

}
