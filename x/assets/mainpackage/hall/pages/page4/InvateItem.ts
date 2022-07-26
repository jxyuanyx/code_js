// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ListItem from "../../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, formatDateToEN } from "../../../gameHelper/AthHelper";

const SOURCE={
    INVATE:16,
    PAY:17,
    GAME:18
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class InvateItem extends ListItem {

    UIBindData={
        icon:null,
        title:"",
        date:"",
        time:"",
        from:"",
        reward:""
    }

    private info:any

    @property([cc.SpriteFrame])
    icons: cc.SpriteFrame[] = [];

    _autoFillZero(v:number){
        if(v<10){
            return "0"+v;
        }else{
            return v+"";
        }
    }

    setData(index:number,data?:any){
        this.info = data;
        this.UIBindData.icon=this.icons[data.source-16];
        this.UIBindData.title=data.content;
        let date=new Date(data.time*1000);
        this.UIBindData.date=formatDateToEN(data.time*1000,"MM DD"); //`${date.getMonth()}/${date.getDate()}`;
        this.UIBindData.time=`${this._autoFillZero(date.getHours())}:${this._autoFillZero(date.getMinutes())}`;
        this.UIBindData.from=`from:${data.from}`;
        this.UIBindData.reward="+ "+formatCurrency(data.amount,true);
    }
}
