// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../baseview/imp/BaseComponent";
import ListAdapter from "./ListAdapter";
import ListAdapterDynamic from "./ListAdapterDynamic";
export default class ListItemDynamic extends BaseComponent {

    private _data:any;
    private _index:number;
    private _parent:ListAdapterDynamic;

    getData():any{
        return this._data;
    }

    getIndex():number{
        return this._index;
    }

    setParent(adapter:ListAdapterDynamic){
        this._parent=adapter;
    }

    getParent(){
        return this._parent;
    }

    onLoad(){
        super.onLoad();
    }

    setData(index:number,data?:any){
        this._data=data;
        this._index=index;
    }
}
