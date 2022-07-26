// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ScrollViewExtra from "../../../gamecore/tools/ScrollViewExtra";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import ComItem from "./ComItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComScrollviewItem extends BaseComponent {

    UIBindData={
        title:"",
    }

    @property(cc.Prefab)
    comItem:cc.Prefab = null

    @property(cc.ScrollView) 
    scrollView: cc.ScrollView = null;

    @property(ScrollViewExtra) 
    scrollViewExtra: ScrollViewExtra = null;

    dataList:string[] = [];

    async flushScrollViewData(data:any){
        this.UIBindData.title = data.title;
        this.dataList = data.infoList;
        let datas:string[] = [];
        datas.push("");
        for (let index = 0; index < this.dataList.length; index++) {
            datas.push(this.dataList[index]);
        }
        datas.push("");
        for (let index = 0; index < datas.length; index++) {
            let item = cc.instantiate(this.comItem);
            this.scrollView.content.addChild(item);
            item.getComponent(ComItem).flushItemData(datas[index]);
            // await this.addItem(datas[index]);
        }
        this.scrollView.content.getComponent(cc.Layout).updateLayout();
        let size = this.scrollView.content.children[0].getContentSize();
        this.scrollView.scrollToOffset(new cc.Vec2(0,size.height * Number(data.curIndex)),0.1);
        this.scrollViewExtra.setSelectChildIndex(data.curIndex);
        this.scrollViewExtra.selectChildIndex = data.curIndex;   
    }



    getCurrentData(){
        let select = this.scrollViewExtra.selectChildIndex;
        return this.dataList[select];
    }

    
}
