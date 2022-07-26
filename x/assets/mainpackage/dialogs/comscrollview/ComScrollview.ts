// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatDate, formatDateWithOutTime } from "../../gameHelper/AthHelper";
import ComScrollviewItem from "./ComScrollviewItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComScrollview extends BaseDlg {

    UIBindData={
        top:"",
    }

    @property(cc.Prefab)
    comScrollviewItem:cc.Prefab = null

    @property(cc.Node)
    content:cc.Node = null

    afterShow(){
        this.UIBindData.top = this._data.top;
        for (let index = 0; index < this._data.group.length; index++) {
            let item = cc.instantiate(this.comScrollviewItem);
            this.content.addChild(item);
            item.getComponent(ComScrollviewItem).flushScrollViewData(this._data.group[index]);
        }
    }

    onConfirmClick(){
        let data:string[] = [];
        // let str:string = "";
        for (let index = 0; index < this.content.childrenCount; index++) {
            let item = this.content.children[index];
            data[index] = item.getComponent(ComScrollviewItem).getCurrentData();
            // if (index == 0) {
            //     str = str += data[index];
            // }
            // else{
            //     str = str += ("-"+data[index]);
            // }
        }
        this._data.cb?.(data);
        // let date=new Date(str);
        // this._data.cb?.(date.getTime());
        this.hide();
    }
}

