// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import FaqTitleItem from "./FaqTitleItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FaqDlg extends BaseDlg {
    showMode=DlgEnum.R2L;

    @property(cc.Node)
    instance:cc.Node=null;

    @property(cc.Node)
    content:cc.Node=null;

    @property(cc.Node)
    scrollView:cc.Node=null;

    afterShow(){
        GameHelper.addDataLoading(this.scrollView);
        App.HttpManager.get("FAQ/QuestionList",null,this.node,(data:any)=>{
            if(data){
                GameHelper.removeDataLoading(this.scrollView);
                for(let title in data){
                    let item=cc.instantiate(this.instance);
                    this.content.addChild(item);
                    item.getComponent(FaqTitleItem).setData(title,data[title]);
                }

            }else{
                GameHelper.addEmptyDataView(this.scrollView.parent);
            }
        },()=>{
            GameHelper.removeDataLoading(this.scrollView);
            GameHelper.addEmptyDataView(this.scrollView.parent);
        });

        this.instance.removeFromParent();
    }

}
