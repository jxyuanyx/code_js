// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatCurrency } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

const normal_color=cc.Color.WHITE.fromHEX("#515151");

@ccclass
export default class NewDeposit extends BaseDlg {

    showMode=DlgEnum.R2L;

    @property(cc.Node)
    listContent:cc.Node;

    UIBindData={
        total:"",
        base:"",
        bonus:"",
        payAmount:""
    }

    private _selectData:any;

    beforeShow(){
        let instance=this.listContent.children[0];
        instance.removeFromParent();
        for(let i=0;i<this._data.list.length;i++){
            let itemData=this._data.list[i];
            let itemView=cc.instantiate(instance);
            this.listContent.addChild(itemView);
            itemView.zIndex=i;
            itemView.getChildByName("cash").getComponent(cc.Label).string="₹"+formatCurrency(itemData.base_value);
            let bonusView=itemView.getChildByName("bonus");
            if(itemData.bonus_value>0){
                bonusView.active=true;
                bonusView.getChildByName("label").getComponent(cc.Label).string="₹"+formatCurrency(itemData.bonus_value);
            }else{
                bonusView.active=false;
            }
        }
        this.onItemSelect(this._data.currentIndex);
    
    }

    onItemClick(event){
        let index=event.currentTarget.zIndex;
        this.onItemSelect(index);
    }

    onItemSelect(index:number){
        let data=this._data.list[index];
        // this.UIBindData.total="₹"+formatCurrency(data.amount);//服务器给的这个不对 弃用
        this.UIBindData.total="₹"+formatCurrency(data.base_value+data.bonus_value);
        this.UIBindData.base="₹"+formatCurrency(data.base_value);
        this.UIBindData.bonus="₹"+formatCurrency(data.bonus_value);
        this.UIBindData.payAmount="₹"+formatCurrency(data.base_value);

        for(let i=0;i<this._data.list.length;i++){
            let view=this.listContent.children[i];
            view.getChildByName("select").active=(i==index);
            view.getChildByName("normal").active=(i!=index);
            view.getChildByName("cash").color=(i==index)?cc.Color.WHITE:normal_color
        }

        this._selectData=data;
    }

    onDepositClick(){
        // App.DlgManager.showDlg("fillPlayerInfo",this._selectData);
        cc.game.emit(GameEvents.GETWAY,this._selectData);

        
    }


}
