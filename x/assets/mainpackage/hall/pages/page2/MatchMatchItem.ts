// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { GoodsEnum } from "../../../../gamecore/enums/GoodsEnum";
import { GameStatus } from "../../../../gamecore/models/GameStatus";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { FullStatu } from "../../../dialogs/matchdetails/MatchDetails";
import { CHIP_TYPES } from "../../../GameConfig";
import { checkGameStatus, formatCurrency, fromatChip, fromatRate, getRemoteGameStatus } from "../../../gameHelper/AthHelper";
import { SELECT_ITEM_MATCH } from "./MatchListPage";

const {ccclass, property} = cc._decorator;
const AllStatus:number = 3;
const enum status{
    counttime,
    endhour,
    full
}
@ccclass
export default class MatchMatchItem extends BaseComponent {
    @property(cc.Node)
    node_statu0:cc.Node = null;

    @property(cc.Node)
    node_statu1:cc.Node = null;

    @property(cc.Node)
    node_statu2:cc.Node = null;

    @property(cc.Sprite)
    matchTypeIcon:cc.Sprite=null;

    @property(cc.Node)
    rewardView:cc.Node;

    @property(cc.Sprite)
    enterTypeIcon:cc.Sprite=null;

    private _itemInstance:cc.Node=null;

    private _index:number=0;
    
    private _data:any=null;

    private _statu:number = null;

    UIBindData={
        entry:"",
        enterPrice:"",
        contentTime:""
    }

    onLoad(){
        super.onLoad();
        this._itemInstance=this.rewardView.children[0];
    }

    setData(index:number,data:any){
        this._index = index;
        this._data = data;
        this.matchTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_"+this._data.match_lv_res);
        if(data.match_pool_type){
            this.rewardView.removeAllChildren();
            for(let i=0;i<data.match_pool_type.length;i++){
                let rewardInfo=data.match_pool_type[i];
                let view=cc.instantiate(this._itemInstance);
                let type = rewardInfo[0];
                let value=rewardInfo[1];
                if (type == CHIP_TYPES.BIND_CASH || type == CHIP_TYPES.CASH) {
                    view.getChildByName("icon").active = false;
                }
                view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+type);
                view.getChildByName("count").getComponent(cc.Label).string=(type==CHIP_TYPES.SEASON_SCORE)?fromatChip(value || 0):formatCurrency(value);
                view.getChildByName("addicon").active=(i!=data.match_pool_type.length-1);
                this.rewardView.addChild(view);
                if(type==CHIP_TYPES.SEASON_SCORE){
                    view.getChildByName("count").color = new cc.Color(255,255,255,255);
                }
            }
            this.rewardView.active=true;
        }else{
            this.rewardView.active=false;
        }
       // this.enterTypeIcon.node.parent.getComponent(cc.Layout).updateLayout();

        this.enterTypeIcon.node.active=this._data.match_entry_type!=0;
 
        if (this._data.match_entry_type&&this._data.match_entry_value>0) {
            this.UIBindData.entry = App.LangManager.getTxtByKey("entry");
            this.enterTypeIcon.node.active = true;
            this.UI_LBS.get("enterPrice").active = true;

            switch (data.match_pool_type[0][0]) {
                case GoodsEnum.TICKET:
                    this.UIBindData.enterPrice = String(fromatRate(data.match_entry_value));
                    break;
                case GoodsEnum.CASH:
                case GoodsEnum.BONUSCASH:
                    this.UIBindData.enterPrice = formatCurrency(data.match_entry_value);
                    break;
                default:
                    this.UIBindData.enterPrice = data.match_entry_value;
                    break;
            }

            this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+this._data.match_entry_type);
        }
        else{
            this.UIBindData.entry = "";
            this.enterTypeIcon.node.active = false;
            this.UI_LBS.get("enterPrice").active = true;
            this.UIBindData.enterPrice = App.LangManager.getTxtByKey("matchList_free");
        }

        this._setTime(this._data.contest_extra.end_time);
    }

    setStatu(statu:number){
        for (let index = 0; index < AllStatus; index++) {
            if (this._data.contest_extra.full_enter_refused == FullStatu.Full) { //满人
                this["node_statu"+index].active = index == status.full;
            }
            else{
                this["node_statu"+index].active = index == statu;
            }
        }
    }

    private _setTime(time){
        let lessTime = time - Math.floor(cc.sys.now()/ 1000);
        let updateTime:Function = ()=>{
            if (lessTime > 0 ){
                this.UIBindData.contentTime = GameHelper.fromatTimeNew2(lessTime);
                if (lessTime <= 3600) {
                    if (this._statu != status.endhour) {
                        this._statu = status.endhour;
                        this.setStatu(this._statu);
                    }
                }
                else{
                    if (this._statu != status.counttime) {
                        this._statu = status.counttime;
                        this.setStatu(this._statu);
                    }
                }
            }
            else{
                this.UIBindData.contentTime = "Time Out";
            }
            lessTime--;
        }
        updateTime();
        this.unscheduleAllCallbacks();
        this.schedule(updateTime,1);
    }

    get data():any{
        return this._data
    }

    onChallengeClick(){
        cc.game.emit(SELECT_ITEM_MATCH,this._data);
    }

    onEnterClick(){
        cc.game.emit(SELECT_ITEM_MATCH,this._data);
    }

    onFullClick(){
        cc.game.emit(SELECT_ITEM_MATCH,this._data);
    }

}
