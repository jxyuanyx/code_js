// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import SeasonItem from "./SeasonItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SeasonsItem extends BaseComponent {

    @property(cc.Node)
    content:cc.Node=null;

    @property(cc.Prefab)
    item_season:cc.Prefab=null;

    private _seasonPool:cc.NodePool = new cc.NodePool();
    private _itemseason:cc.Node[] = [];
    
    flushSeason(data:any){
        while(this._itemseason.length > 0){
            this._seasonPool.put(this._itemseason.pop());
        }
        this._itemseason = [];
        if(!data)return;

        let tdata=[data.current,data.history];
        console.log("tdata",tdata)
        
        for (let index = 0; index < tdata.length; index++) {
            let item = this.getItemForPool();
            this.content.addChild(item);
            let seasonItem = item.getComponent(SeasonItem);
            seasonItem.flushdata({season:tdata[index],index:index});
            this._itemseason.push(item);
        }
    }

    getItemForPool(){
        let item = this._seasonPool.get();
        if (item) {
            
        }
        else{
            item = cc.instantiate(this.item_season);
        }
        return item;
    }

}
