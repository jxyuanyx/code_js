// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { SelfData } from "../../../gamecore/models/SelfData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { FgItem } from "./favoriteGame/FgItem";
import HistorysItem from "./gamehistory/HistorysItem";
import InfoItem from "./info/InfoItem";
import SeasonsItem from "./seasons/SeasonsItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UserInfo extends BaseDlg {

    showMode=DlgEnum.R2L;

    @property(InfoItem)
    item_info:InfoItem=null;

    @property(FgItem)
    item_fg:FgItem=null;

    @property(SeasonsItem)
    item_seasons:SeasonsItem=null;

    @property(HistorysItem)
    item_historys:HistorysItem=null;

    private _userinfo:SelfData;
    private _areaName:string="";
    
    async afterShow(){
        cc.game.on(GameEvents.FLUSH_SELFDATA,this.updateData,this);
        
        this._userinfo = App.DataManager.getSelfData();
        this.item_info.flushUserInfo(this._userinfo);
        let data=await App.HttpManager.postAsync("user_api/get_user_info")
        if (!data)return;
        // this._areaName = data.AreaName;
        App.DataManager.getSelfData().area_code = data.area_code;
        if (data.favorite)this.item_fg.flushFavoriteGame(data.favorite);
        if (data.seasons)this.item_seasons.flushSeason(data.seasons);
        if (data.history)this.item_historys.flushHistory(data.history);
    }

    afterHide(){
        cc.game.off(GameEvents.FLUSH_SELFDATA,this.updateData,this);
        cc.error(cc.game.hasEventListener(GameEvents.FLUSH_SELFDATA));
    }

    updateData(){
        this._userinfo = App.DataManager.getSelfData();
        this.item_info.flushUserInfo(this._userinfo);
    }

    onChangeClick(){
        App.DlgManager.showDlg("editInfo",this._areaName,"mainpackage");
    }
    
}
