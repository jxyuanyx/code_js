// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatCurrency, getHead } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;
const NUM:number = 3;

@ccclass
export default class SeasonPlaceWinner extends BaseDlg {
    showMode=DlgEnum.T2B;

    UIBindData = {
        head0:null,
        head1:null,
        head2:null,
        reward0:"",
        reward1:"",
        reward2:"",
        name0:"",
        name1:"",
        name2:""
    }
    
    afterShow() {
        for (let index = 0; index < this._data.length; index++) {
            this.UIBindData["reward"+index] = formatCurrency(this._data[index].reward,true);
            this.UIBindData["name"+index] = this._data[index].nick;
            getHead(this._data[index].avatar,this.UIBindData["head"+index]);
        }
    }

    onStartnewClick(){
        this.hide();
    }

}