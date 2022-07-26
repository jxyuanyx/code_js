// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export  class WithDrawItem extends BaseComponent {

    UIBindData={
        type:"",
    }

    flushWithDrawData(data:any,index:number){
        let info = "";
        if(data.ID == 1){
            if (data.Detail.length > 15) {
                info = (data.Detail).substr(0,15);
            }
            else{
                info = data.Detail;
            }
        }
        else if (data.ID == 2 || data.ID == 3){
            info = (data.Detail).substr(data.Detail.Length-4)
        }
        else{
            info = data.Detail;
        }
        this.UIBindData.type = data.Title + "("+info+")";		

}
