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

const {ccclass, property} = cc._decorator;

@ccclass
export default class FaqDetailDlg extends BaseDlg {
    showMode=DlgEnum.R2L;

    UIBindData={
        title:"",
        content:""
    }

    @property(cc.Node)
    scrollView:cc.Node=null;

    afterShow(){
        this.UIBindData.title=this._data.Title;
        GameHelper.addDataLoading(this.scrollView);
        App.HttpManager.get("FAQ/Answer",{id:this._data.ID},this.node,(data:any)=>{
            if(data){
                GameHelper.removeDataLoading(this.scrollView);
                this.UIBindData.content=data;
            }else{
                GameHelper.addEmptyDataView(this.scrollView.parent);
            }
        },()=>{
            GameHelper.removeDataLoading(this.scrollView);
            GameHelper.addEmptyDataView(this.scrollView.parent);
        });
    }

}
