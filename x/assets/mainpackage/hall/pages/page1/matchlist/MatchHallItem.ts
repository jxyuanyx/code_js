// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../../gamecore/App";
import { GoodsEnum } from "../../../../../gamecore/enums/GoodsEnum";
import GameHelper from "../../../../../gamecore/tools/GameHelper";
import { TimeEvent_Flush, TimeManager, TimeTask } from "../../../../../gamecore/tools/TimeManager";
import ListItem from "../../../../../gamecore/ui/components/common/ListItem";
import { FullStatu } from "../../../../dialogs/matchdetails/MatchDetails";
import { Games, Goods } from "../../../../GameConfig";
import { formatCurrency, fromatChip, fromatRate } from "../../../../gameHelper/AthHelper";
import { FLUSH_GAMEPAGE } from "../GamePage";

const {ccclass, property} = cc._decorator;
const AllStatus:number = 3;
const enum TIMESTATUS{
    CountTime,
    EndHour
}

const enum BTNSTATUS{
    CountTime,
    EndHour,
    Full
}

@ccclass
export default class MatchHallItem extends ListItem {
    @property([cc.Node])
    node_statu0:cc.Node[] = [];

    @property([cc.Node])
    node_statu1:cc.Node[] = [];

    @property([cc.Node])
    btn_statu:cc.Node[] = [];

    private _statu:number = null;

    UIBindData={
        gameicon:null,
        good:null,
        entry:"",
        matchname:"",
        peoplenum:0,
        counttime:"",
        reward:"",
        endtime:""
    }

    onDestroy() {
        TimeManager.instance().off(TimeEvent_Flush,this._onMatchFlush,this);
    }


    setData(index:number,data?:any){

        TimeManager.instance().on(TimeEvent_Flush,this._onMatchFlush,this);
        super.setData(index,data);
        if (data.match_entry_value && data.match_entry_value > 0) {
            switch (data.match_entry_type) {
                case GoodsEnum.TICKET:
                    this.UIBindData.entry = String(fromatRate(data.match_entry_value));
                    break;
                case GoodsEnum.CASH:
                case GoodsEnum.BONUSCASH:
                    this.UIBindData.entry = formatCurrency(data.match_entry_value);
                    break;
                default:
                    this.UIBindData.entry = data.match_entry_value;
                    break;
            }
            
            this.UIBindData.good = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+this._data.match_entry_type);
        }
        else{
            this.UIBindData.entry = App.LangManager.getTxtByKey("free");
            this.UIBindData.good = null;
        }

        switch (data.match_pool_type[0][0]) {
            case GoodsEnum.TICKET:
                this.UIBindData.reward = String(fromatRate(data.match_pool_type[0][1]));
                break;
            case GoodsEnum.CASH:
            case GoodsEnum.BONUSCASH:
                this.UIBindData.reward = formatCurrency(data.match_pool_type[0][1])
                break;
            default:
                this.UIBindData.reward = data.match_pool_type[0][1];
                break;
        }

        // this.UIBindData.reward = data.match_pool_type[0][0]==GoodsEnum.CASH||data.match_pool_type[0][0]==GoodsEnum.TICKET||data.match_pool_type[0][0]==GoodsEnum.BONUSCASH?
        // formatCurrency(data.match_pool_type[0][1]):data.match_pool_type[0][1];
        
        this.UIBindData.peoplenum = data.playing_num;
        this.UIBindData.matchname = data.game_name;
        this.UIBindData.gameicon.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(Games.filter(item=>item.room_type==data.room_type)[0].packageName);
        
        let lessTime = data.contest_extra.end_time - Math.floor(cc.sys.now()/ 1000);
        this.UIBindData.counttime = "";
        
        let task=new TimeTask();
        task.key="mat_"+index;
        task.lessTime=lessTime;
        this._onMatchFlush(task.key,task.lessTime);
        TimeManager.instance().addTask(task);
        
    }

    _onMatchFlush(key:string,time:number){

        let mat = key.split("_");
        if (mat[0] != "mat" || Number(mat[1]) != this._index) {
            return;
        }
        if (time > 3600){
            this.UIBindData.counttime = GameHelper.fromatTimeNew2(time);
            if (this._statu!=TIMESTATUS.CountTime) {
                this._statu = TIMESTATUS.CountTime;
                this.setStatus(this._statu);
            } 
        }
        else if(time > 0 && time <= 3600){
            this.UIBindData.endtime = GameHelper.fromatTimeNew2(time);
            if (this._statu!=TIMESTATUS.EndHour) {
                this._statu = TIMESTATUS.EndHour;
                this.setStatus(this._statu);
            }
        }
        else{
            this.UIBindData.counttime = "Time Out";
            this.UIBindData.endtime = "Time Out";
        }
        
    }

    setStatus(statu:number=TIMESTATUS.CountTime){
        // this.node.getChildByName("layout").active = statu == BTNSTATUS.CountTime;
        for (let index = 0; index < AllStatus; index++) {
            if (this._data.contest_extra.full_enter_refused == FullStatu.Full) { //满人
                this.btn_statu[index].active = index == BTNSTATUS.Full;
            }
            else{
                this.btn_statu[index].active = index == statu;
            }
            if (index == BTNSTATUS.Full) return;
            let nodes = this["node_statu"+index];
            for (let n = 0; n < nodes.length; n++) {
                nodes[n].active = index==statu;
            }
        }
    }
    
}
