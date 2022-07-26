// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { GameStatus } from "../../../gamecore/models/GameStatus";
import { Package } from "../../../gamecore/net/Package";
import { core } from "../../../gamecore/net/protos/proto";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { C } from "../../../gamecore/ui/core/Clickable";
import { AppStatusEnum, CHIP_TYPES, CONSTANTS } from "../../GameConfig";
import { checkGameStatus, formatCurrency, formatDate, fromatRate, getGameInfoByRoomType, getHead, getRemoteGameStatus } from "../../gameHelper/AthHelper";
import { CommonProto, COMMON_RESP_CMDS } from "../../net/CommonProto";
import { RulesDlgData } from "../rules/RulesDlg";

const {ccclass, property} = cc._decorator;
const httpApi = ["game_api/contest_rank","game_api/contest_prize","game_api/contest_history"];
export const enum FullStatu{
    unFull,
    Full
}
const AllStatus:number = 3;
const enum status{
    counttime,
    endhour,
    full
}

export const enum MATCHTOGGLES{
    ranking,
    prizes,
    history
}
@ccclass
export default class MatchDetails extends BaseDlg {

    @property(cc.Node)
    node_statu0:cc.Node = null;

    @property(cc.Node)
    node_statu1:cc.Node = null;

    @property(cc.Node)
    node_statu2:cc.Node = null;

    @property([cc.Node])
    nodeList:cc.Node[] = [];
    
    @property(cc.Prefab)
    rewardmax:cc.Prefab = null;

    @property(cc.Prefab)
    rewardmin:cc.Prefab = null;

    showMode=DlgEnum.R2L;

    @property(ListView)
    listview_history:ListView<any> = null;

    @property(ListView)
    listview_prizes:ListView<any> = null;

    @property(ListView)
    listview_ranking:ListView<any> = null;

    private _xhr:XMLHttpRequest = null;

    private _statu:number = null;
    
    UIBindData={
        title:"",
        counttime:"",
        ranking:0,
        bestscore:0,
        name:"",
        head:null,
        entry:"",
        endhour:"",
        goods:null
    }
    @property(cc.ToggleContainer)
    toggleContainer:cc.ToggleContainer = null;

    beforeShow(){
        this._init();
        cc.game.on(GameEvents.NET_MESSAGE,this.onMessage,this);
    }

    onDestroy(){
        cc.game.off(GameEvents.NET_MESSAGE,this.onMessage,this);
    }

    onMessage(pkg:Package){
        switch(pkg.cmd){
            case COMMON_RESP_CMDS.CMD_EVT_MATCH_NOTIFY:
                cc.log("matchnotify>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",pkg)
                this.onMatchNotify(pkg.body);
                break;
        }
    }

    onMatchNotify(body:core.EvtMatchNotify){
        
        if(body.match_status==core.MatchStatus.STATUS_FINISHED){
            App.DataManager.getGameData().tableId=body.uuid;
            App.DataManager.getGameData().newGame=true;
            App.DataManager.setGameInitInfo(body);
            App.Net.updateRoomInfo(body.desk_id,body.room_id);

            let gameData=App.DataManager.getGameData();
            gameData.tableData=body;
            gameData.gameToken=body.match_info.token;
            App.AudioManager.stopBgm();
            App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
            if(gameData.isUnity){
                this.hide();
                App.DlgManager.hideDlg("loading");
                gameData.isInGame=true;
                App.NativeManager.enterUnityGame(gameData.gameName);
            }else{
                App.BundleManager.loadSubGame(gameData.packageName,()=>{
                    App.SceneManager.loadScene("welcome",gameData.packageName,()=>{
                        gameData.isInGame=true;
                        App.DlgManager.clearAllDlgs();
                    });
                })
            }
        }
    }

    onToggleClick(render,data){
        App.HttpManager.cancel(this._xhr);
        this._showNodeForIndex(Number(data));
    }

    private _checkIsEntry(data){
        let priceType=data.match_entry_type;
        let price=data.match_entry_value;
        let selfData=App.DataManager.getSelfData();
        if(priceType==CHIP_TYPES.TICKET&&selfData.ticket<price){
            App.DlgManager.showDlg("toast",{
                title:App.LangManager.getTxtByKey("not_enough_ticket"),
                content:App.LangManager.getTxtByKey("not_enough_ticket_content",[formatCurrency(price)])
            });
            return false;
        }
        if(priceType==CHIP_TYPES.CASH&&(selfData.gold)<price){
            
            App.DlgManager.showDlg("toast",{
                title:App.LangManager.getTxtByKey("not_enough_cash"),
                content:App.LangManager.getTxtByKey("not_enough_cash_content",[formatCurrency(price)])
            });
            if(App.DataManager.getSelfData().today_first_login&&App.DataManager.getExtInfo("hasPayActivity")&&!App.DataManager.getExtInfo(CONSTANTS.PAY_FRIST)){
                App.DataManager.setExtInfo(CONSTANTS.PAY_FRIST,true)
                this.scheduleOnce(()=>{
                    App.DlgManager.showDlg("reward/payReward");
                },0.8)
            }
            return false;
        }
        return true;
    }

    async onChallengeClick(){

        let gameData=getGameInfoByRoomType(this._data.room_type);
        App.DataManager.setGameData(gameData);
        //检测游戏更新
        await getRemoteGameStatus(gameData.gameName);
        if(checkGameStatus(this._data.room_type)!=GameStatus.NORMAL)return
        if (!this._checkIsEntry(this._data)) return;
        //锦标赛
        App.DlgManager.showDlg("loading",App.LangManager.getTxtByKey("enterGame"));
        CommonProto.sendMatch(this._data.room_id,this._data.room_type);
    }

    private _showNodeForIndex(code:number){
        for (let index = 0; index < this.nodeList.length; index++) {
            this.nodeList[index].active = index==code;
        }
        this._setScrollview(code);
    }

    private async _setScrollview(index:number){
        let data:any;
        switch (index) {
            case 0:
                await this._setRanking(index);
                break;
            case 1:
                await this._setPrizes(index);
                break;
            case 2:
                await this._setHistory(index);
                break;
            default:
                break;
        }
    }

    private async _setRanking(index:number){
        this._xhr = App.HttpManager.post("game_api/contest_rank",{room_type:this._data.room_type,match_id:this._data.match_id},this.node,(rank)=>{
            if (!rank.rank || rank.rank.length == 0) {
                GameHelper.addEmptyDataView(this.listview_ranking.node.parent);
            }
            let adapter=new ListAdapter(rank.rank);
            this.listview_ranking.setAdapter(adapter);
            this.listview_ranking.getScrollView().scrollToTop();
            this._setSelfInfo(rank.my_ranking,rank.my_best_score);
        });
   
    }

    private async _setPrizes(index:number){
        this._xhr = App.HttpManager.post("game_api/contest_prize",{room_type:this._data.room_type,match_id:this._data.match_id},this.node,(prize)=>{
            let title = this.nodeList[index].getChildByName("title_reward");
            title.getChildByName("img_prizegood").getComponent(cc.Sprite).spriteFrame = 
            App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+prize.prize_type);
            title.getChildByName("layout_ranking").getChildByName("label_maxpeople").getComponent(cc.Label).string = prize.max_players;
            if (prize &&prize.total_prize) {
                switch (prize.prize_type) {
                    case GoodsEnum.TICKET:
                        title.getChildByName("label_prizenum").getComponent(cc.Label).string = String(fromatRate(prize.total_prize));
                        break;
                    case GoodsEnum.CASH:
                    case GoodsEnum.BONUSCASH:
                        title.getChildByName("label_prizenum").getComponent(cc.Label).string = formatCurrency(prize.total_prize);
                        break;
                    default:
                        title.getChildByName("label_prizenum").getComponent(cc.Label).string = prize.total_prize;
                        break;
                }
            }
            else{
                title.getChildByName("label_prizenum").getComponent(cc.Label).string = "";
            }
            if (!prize.rank_prize || prize.rank_prize.length == 0) {
                GameHelper.addEmptyDataView(this.listview_prizes.node.parent);
            }
            let adapter=new ListAdapter(prize.rank_prize);
            this.listview_prizes.setAdapter(adapter);
            this.listview_prizes.getScrollView().scrollToTop();
            this._setSelfInfo(prize.my_ranking,prize.my_best_score);
        });
    }

    private async _setHistory(index:number){
        this._xhr = App.HttpManager.post("game_api/contest_history",{room_type:this._data.room_type,match_id:this._data.match_id},this.node,(history)=>{
            let title = this.nodeList[index].getChildByName("title_best");
            title.active = history.best_record.reward;
            title.getChildByName("layout_time").getChildByName("label_time").getComponent(cc.Label).string =  history.best_record.time?formatDate(history.best_record.time*1000):"";
            title.getChildByName("layout_bestscore").getChildByName("label_score").getComponent(cc.Label).string = history.best_record.score||0;

            if (history.best_record.reward) {
                title.getChildByName("info").destroyAllChildren();
                for (let index = 0; index < history.best_record.reward.length; index++) {
                    let node = null;
                    if (history.best_record.reward[index].reward_type == GoodsEnum.CASH || history.best_record.reward[index].reward_type == GoodsEnum.BONUSCASH || history.best_record.reward[index].reward_type == GoodsEnum.TICKET) {
                        node = cc.instantiate(this.rewardmax);
                    }
                    else{
                        node = cc.instantiate(this.rewardmin);
                    }
                    let icon = node.getChildByName("icon");
                    let count = node.getChildByName("count");
                    let addicon = node.getChildByName("addicon");
                    icon.getComponent(cc.Sprite).spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+history.best_record.reward[index].reward_type);
                    
                    switch (history.best_record.reward[index].reward_type) {
                        case GoodsEnum.TICKET:
                            count.getComponent(cc.Label).string = String(fromatRate(history.best_record.reward[index].reward_value));
                            break;
                        case GoodsEnum.CASH:
                        case GoodsEnum.BONUSCASH:
                            count.getComponent(cc.Label).string = formatCurrency(history.best_record.reward[index].reward_value);
                            break;
                        default:
                            count.getComponent(cc.Label).string = history.best_record.reward[index].reward_value;
                            break;
                    }
                    
                    if (index == history.best_record.reward.length - 1) {
                        addicon.active = false;
                    }
                    title.getChildByName("info").addChild(node);
                    node.getComponent(cc.Layout).updateLayout();
                    title.getChildByName("info").getComponent(cc.Layout).updateLayout();
                }
            }
            if (!history.best_record.reward||history.best_record.reward.length==0) {
                GameHelper.addEmptyDataView(this.listview_history.node.parent);
            }
            
            let adapter=new ListAdapter(history.history);
            this.listview_history.setAdapter(adapter);
            this.listview_history.getScrollView().scrollToTop();
            this._setSelfInfo(history.my_ranking,history.my_best_score);
        });
    }

    setStatu(statu:number){
        for (let index = 0; index < AllStatus; index++) {
            if (this._data.contest_extra.full_enter_refused == FullStatu.Full) {
                this["node_statu"+index].active = index == status.full;
            }
            else{
                this["node_statu"+index].active = index == statu;
            }
        }
    }

    private _init(){
        
        if (this._data.toggle) {
            this._showNodeForIndex(this._data.toggle);
            this.toggleContainer.toggleItems[this._data.toggle].isChecked = true;
        }
        else{
            this._showNodeForIndex(MATCHTOGGLES.prizes);
            this.toggleContainer.toggleItems[MATCHTOGGLES.prizes].isChecked = true;
        }
        
        getHead(App.DataManager.getSelfData().avatar,this.UIBindData.head);
        this.UIBindData.title = this._data.game_name?this._data.game_name:this._data.room_name; //recorddlg进来和 大厅两个入口不一样

        if (this._data.match_entry_value && this._data.match_entry_value > 0) {

            switch (this._data.match_entry_type) {
                case GoodsEnum.TICKET:
                    this.UIBindData.entry = String(fromatRate(this._data.match_entry_value));
                    break;
                case GoodsEnum.CASH:
                case GoodsEnum.BONUSCASH:
                    this.UIBindData.entry = formatCurrency(this._data.match_entry_value);
                    break;
                default:
                    this.UIBindData.entry = this._data.match_entry_value;
                    break;
            }
            this.UIBindData.goods.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+this._data.match_entry_type);
        }
        else{
            this.UIBindData.entry = App.LangManager.getTxtByKey("free");
        }
        

        let lessTime = this._data.contest_extra.end_time - Math.floor(new Date().getTime()/ 1000);
        let time = lessTime;
        let updateTime:Function = ()=>{
            if (time >= 0){
                if (time <= 3600) {
                    if (this._statu!=status.endhour) {
                        this._statu = status.endhour;
                        this.setStatu(this._statu);
                    }
                    this.UIBindData.endhour = GameHelper.fromatTimeNew2(time);
                    this.UIBindData.counttime = GameHelper.fromatTimeNew2(time);
                    if (time <= 0) {
                        this.UIBindData.endhour = "Time Out";
                        this.UIBindData.counttime = "Time Out";
                    }
                }
                else{
                    if (this._statu!=status.counttime) {
                        this._statu = status.counttime;
                        this.setStatu(this._statu);
                    }
                    this.UIBindData.counttime = GameHelper.fromatTimeNew2(time);
                }
            }
            else{
                this.UI_LBS.get("counttime").active = false;
                this.UI_LBS.get("counttime").getComponent(cc.Label).unschedule(updateTime);
            }
            time--;
        }
        if (time <= 0) {
            this.UIBindData.endhour = "Time Out";
            this.UIBindData.counttime = "Time Out";
        }
        else{
            this.UIBindData.counttime = GameHelper.fromatTimeNew2(time);
        }
        updateTime();
        this.UI_LBS.get("counttime").getComponent(cc.Label).unscheduleAllCallbacks();
        this.UI_LBS.get("counttime").getComponent(cc.Label).schedule(updateTime,1);
    }

    private _setSelfInfo(rank:number,bestScore:number){
        this.UIBindData.ranking = rank;
        this.UIBindData.bestscore = bestScore;
        this.UIBindData.name = App.DataManager.getSelfData().nick;
    }

    onQueryClick(){
        let data:RulesDlgData = new RulesDlgData();
        data.group = [
        {txt:App.LangManager.getTxtByKey("matchtips").txt1,isTitle:false},
        {txt:App.LangManager.getTxtByKey("matchtips").txt2,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }
    
}