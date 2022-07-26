// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { formatCurrency } from "../../../gameHelper/AthHelper";
import { EVENT_DEPOSIT_SELECT } from "./DepositPage";

const {ccclass, property} = cc._decorator;

@ccclass
export class DepositPageItem extends BaseComponent {

    @property(cc.Node)
    img_awardbg:cc.Node = null;

    //private _data:any = null;
    private _index:number = 0;
    //private _payway:any = null;

    UIBindData={
        gold:null,
        add:"",
        num:"",
        bonus:"Bonus",
    }

    flushDepositData(data:any,index:number){
        this.img_awardbg.active = data?.bonus_value;
        this.UIBindData.add = "+"+App.LangManager.getTxtByKey("currency")+formatCurrency(data.bonus_value);
        this.UIBindData.num = App.LangManager.getTxtByKey("currency")+formatCurrency(data.base_value);
        this.UIBindData.gold.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("img_gold"+index);
      //  this._data = data;
        //this._payway = payway;
        this._index=index;
    }

    onDepositClick(){
        cc.game.emit(EVENT_DEPOSIT_SELECT,this._index);
        //App.DlgManager.showDlg("newDeposit",{data:this._data,payway:this._payway});
       // App.DlgManager.showDlg("deposit",{data:this._data,payway:this._payway});
    }
}
