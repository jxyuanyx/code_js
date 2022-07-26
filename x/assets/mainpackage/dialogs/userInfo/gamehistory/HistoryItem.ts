// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryItem extends BaseComponent {

    UIBindData={
        gsnum:0,
        wingames:""
    }

    flushData(data:any){
        this.UIBindData.gsnum = data.gsnum;
        if (data.index == 0) {
            this.UIBindData.wingames = App.LangManager.getTxtByKey("wingames");
        }
        else if (data.index == 1){
            this.UIBindData.wingames = App.LangManager.getTxtByKey("winstreak");
        }
        
    }
}
