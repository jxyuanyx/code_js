// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { WithDrawItem } from "./WithDrawItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EditWithDraw extends BaseDlg {

    @property(cc.ToggleContainer)
    toggleContainer: cc.ToggleContainer = null;

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Prefab)
    item:cc.Prefab = null;

    private _itemList = [];

    afterShow(){
        if (!this._data.info) return;
            for (let index = 0; index < this._data.info.length; index++) {
                let item = cc.instantiate(this.item);
                this.content.addChild(item);
                item.getChildByName("toggle").getComponent(cc.Toggle).toggleGroup = this.toggleContainer;
                item.getChildByName("toggle").getComponent(cc.Toggle).isChecked = this._data.index==index;
                item.getComponent(WithDrawItem).flushWithDrawData(this._data.info[index],index);
                this._itemList.push(item);

                var eventHandler = new cc.Component.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "EditWithDraw";
                eventHandler.handler = "onEditClick";
                eventHandler.customEventData = String(index);
                item.getChildByName("toggle").getComponent(cc.Toggle).checkEvents.push(eventHandler);
            }
    }

    onEditClick(render,data){
        for (let index = 0; index < this._itemList.length; index++) {
            this._itemList[index].getChildByName("toggle").getComponent(cc.Toggle).isChecked = Number(data) == index;
        }
        this._data.cb({info:this._data.info[Number(data)],index:[Number(data)]});
        this.hide();
    }

    
}
