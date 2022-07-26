// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ListItem from "../../../gamecore/ui/components/common/ListItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectServerItem extends ListItem {

    UIBindData={
        title:"",
        url:""
    }

    setData(index:number,data?:any){
        super.setData(index,data);
        this.UIBindData.title=data.desc;
        this.UIBindData.url=data.url;
    }
}
