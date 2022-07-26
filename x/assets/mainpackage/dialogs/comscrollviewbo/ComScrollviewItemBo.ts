// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import ScrollViewExtra from "../../../gamecore/tools/ScrollViewExtra";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import ComItem from "./ComItemBo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComScrollviewItemBo extends BaseComponent {

    @property(cc.Prefab)
    comItem:cc.Prefab = null

    @property(cc.ScrollView) 
    scrollView: cc.ScrollView = null;

    @property(ScrollViewExtra) 
    scrollViewExtra: ScrollViewExtra = null;

    dataList:any[] = [];

    async flushScrollViewData(data:any){

        this.dataList = data.infoList;

        this.dataList.unshift({country_name:""},{country_name:""},{country_name:""})
        this.dataList.push({country_name:""},{country_name:""},{country_name:""})


        for (let index = 0; index <this.dataList.length; index++) {
            let item = cc.instantiate(this.comItem);
            this.scrollView.content.addChild(item);
            let tdata=this.dataList[index];
            item.getComponent(ComItem).flushItemData(tdata);
        }
        this.scrollView.content.getComponent(cc.Layout).updateLayout();
        let size = this.scrollView.content.children[0].getContentSize();
        this.scrollView.scrollToOffset(new cc.Vec2(0,size.height * Number(data.currentIndex)),0.1);
        this.scrollViewExtra.setSelectChildIndex(data.currentIndex);
        this.scrollViewExtra.curIndex = data.currentIndex;
        this.scrollViewExtra.selectChildIndex =data.currentIndex;   
    }



    getCurrentData(){
        let select = this.scrollViewExtra.selectChildIndex;
        return this.dataList[select+3];
    }

    
}
