// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameHelper from "../../../../gamecore/tools/GameHelper";
import ListItem from "../../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, formatDateToEN } from "../../../gameHelper/AthHelper";


const {ccclass, property} = cc._decorator;

@ccclass
export default class InvateDetailItem extends ListItem {

    UIBindData={
        deposit:"",
        nickName:"",
        time:"",
        finishGame:"",
        total:""
    }

    setData(index:number,data?:any){
        super.setData(index,data);
        this.UIBindData.deposit=(!this._data.deposit)?"--":formatCurrency(this._data.deposit,true);
        this.UIBindData.nickName=GameHelper.subStr(this._data.nick,10);
        this.UIBindData.time=formatDateToEN(this._data.bind_time*1000,"MM DD,YY");
        this.UIBindData.finishGame=(!this._data.game_reward)?"--":formatCurrency(this._data.game_reward,true);
        this.UIBindData.total=(!this._data.total)?"--":formatCurrency(this._data.total,true);
    }
}
