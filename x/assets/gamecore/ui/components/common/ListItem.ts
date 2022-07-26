// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../baseview/imp/BaseComponent";
import { LIST_ITEM_CLICK } from "./ListViewNew";


export default class ListItem extends BaseComponent {

    protected _data:any;
    protected _index:number;
    private _adapter:cc.EventTarget;

    getData():any{
        return this._data;
    }

    getIndex():number{
        return this._index;
    }

    onLoad(){
        super.onLoad();
    }

    setData(index:number,data?:any){
        this._data=data;
        this._index=index;
    }

    setAdapter(adapter:cc.EventTarget){
        this._adapter=adapter;
    }

    onClick(){
        if(this._adapter){
            this._adapter.emit(LIST_ITEM_CLICK,this._data,this._index)
        }
    }
}
