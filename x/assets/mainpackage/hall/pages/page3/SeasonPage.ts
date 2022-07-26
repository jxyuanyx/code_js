// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { GameEvents } from "../../../../gamecore/events/GameEvents";
import { Package } from "../../../../gamecore/net/Package";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import ListAdapterDynamic from "../../../../gamecore/ui/components/common/ListAdapterSeasonDynamic";
import ListViewSeasonDynamic from "../../../../gamecore/ui/components/common/ListViewSeasonDynamic";
import RollNumGroup from "../../../../gamecore/ui/components/common/RollNumGroup";
import { RulesDlgData } from "../../../dialogs/rules/RulesDlg";
import { DataConfig } from "../../../GameConfig";
import { formatCurrency, formatDate, formatDateWithOutTime, fromatChip, fromatRate, fromatTime, fromatTimeNew, getHead } from "../../../gameHelper/AthHelper";
import { COMMON_RESP_CMDS } from "../../../net/CommonProto";
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../../services/RedTipService";
import SeasonPlayer from "./SeasonPlayer";
import { SEASONPAGE } from "../../../dialogs/seasonTask/SeasonTask";
import { REQUEST_EVENTS } from "../../../../gamecore/ui/components/common/ListViewNew";
import { UpdateSeasonPool } from "../../scripts/hall";
import PageBase from "../../scripts/PageBase";

const {ccclass, property} = cc._decorator;
export const CURPROMOTION = "curpromotion";
@ccclass
export default class SeasonPage extends PageBase {
    @property(cc.Prefab)
    item:cc.Prefab = null;

    @property(cc.Node)
    rankContent:cc.Node = null;

    @property(cc.Node)
    redTips:cc.Node[]=[];

    @property(ListViewSeasonDynamic)
    listView:ListViewSeasonDynamic;

    @property(cc.ScrollView)
    scrollView:cc.ScrollView=null;

    @property(cc.Node)
    rankScroll:cc.Node = null;

    @property(cc.Node)
    rankView:cc.Node = null;

    @property(cc.Node)
    content:cc.Node = null;

    @property([SeasonPlayer])
    rankPlayers:SeasonPlayer[]=[];

    @property(cc.Sprite)
    scoreProgress:cc.Sprite=null;

    @property(RollNumGroup)
    rollNumGroup:RollNumGroup=null;

    private _rankList:any[]=[];

    private _time:number=0;

    private _lessTime:number=0;

    private _endTimeCallBack:Function=null;

    private _loadDataView:cc.Node=null;

    private _curListView:number = -1;

    private _pageSize:number=20;

    private _inited:boolean=false;

    UIBindData={
        selfNick:"123",
        sjTime:"",
        sjEndTime:"",
        dw:"",
        starCount:"",
        selfRank:0,
        rankPoint:"0/0",
        selfHead:null,
        star:"none",
        countDown:"",
        flag:null,
        myrank:null,
        rankIcon:null,
        symbol:""
    }

    onLoad(){
        super.onLoad();
        this._loadDataView=GameHelper.addDataLoading(this.scrollView.node);
        this._addEvent();
    }

    onDestroy(){
        this._removeEvent();
    }



    _addEvent(){
        cc.game.on(EVENT_REDTIP,this._udpateRedTip,this);
    }

    _removeEvent(){
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
    }

    _udpateRedTip(key:number,num:number){
        if(key==REDTIP_MODULE.SEASON_WHEEL){
            this.redTips[2].getChildByName("lb_num").getComponent(cc.Label).string=num.toString();
            RedTipService.getInstance().activeRedTip(this.redTips[2],REDTIP_MODULE.SEASON_WHEEL);
        }
        else if(key == REDTIP_MODULE.SEASON_REWARD){
            RedTipService.getInstance().activeRedTip(this.redTips[0],REDTIP_MODULE.SEASON_REWARD);
        }
        else if(key == REDTIP_MODULE.SEASON_TASK){
            RedTipService.getInstance().activeRedTip(this.redTips[1],REDTIP_MODULE.SEASON_TASK);
        }
    }


    onEnable(){
        if(!this._inited){
            this._inited=true;
            this._init();
        }

        this._curListView = -1;
        this._loadDataView.active=true;
        this.scrollView.node.active=true;

        this._flushData();

    }

    _onSetListView(list){
       this.listView.pager.addPageDatas(list);
    }

    async _getPage(pageSize:number,pageNo:number){
        let data=await App.HttpManager.postAsync("season_api/season_rank_list",{page_no:pageNo,page_size:this._pageSize});
        if(data&&data.rank_list&&data.rank_list.length>0){
            this.listView.pager.addPageDatas(data.rank_list);
        }
    }

    private _setScrollEnable(index:number){
        if (index == this._curListView) {
            return;
        }

        if (index == 0 ) {
            this._curListView = 0;
            this.scrollView.getComponent(cc.ScrollView).enabled = true;
            this.rankScroll.getComponent(cc.ScrollView).enabled = false;
        }
        else{
            this._curListView = 1;
            this.scrollView.getComponent(cc.ScrollView).enabled = false;
            this.rankScroll.getComponent(cc.ScrollView).enabled = true;
        }
    }

    _init(){
        this.UIBindData.symbol = App.LangManager.getTxtByKey("currency");

        let adapter=new ListAdapterDynamic();
        this.listView.setAdapter(adapter);
        this.listView.node.getChildByName("view").getComponent(cc.Widget).updateAlignment();
        this.listView.init();
        this._pageSize=Math.ceil(this.listView.node.getChildByName("view").height/this.listView.getColumnWH())*2;
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(this._pageSize,pageNo);
        });

        RedTipService.getInstance().activeRedTip(this.redTips[0],REDTIP_MODULE.SEASON_REWARD);
        RedTipService.getInstance().activeRedTip(this.redTips[1],REDTIP_MODULE.SEASON_TASK);
        RedTipService.getInstance().activeRedTip(this.redTips[2],REDTIP_MODULE.SEASON_WHEEL);
        this.redTips[2].getChildByName("lb_num").getComponent(cc.Label).string=RedTipService.getInstance().getRedTipNumById(REDTIP_MODULE.SEASON_WHEEL)+"";
        for(let i=0;i<this.rankPlayers.length;i++){
            this.rankPlayers[i].init();
        } 

        //新手引导
        let isGuide=cc.sys.localStorage.getItem("guide_season");
        if(!isGuide){
            cc.sys.localStorage.setItem("guide_season","true")
            App.DlgManager.showDlg("seasonTip");
        }
    }

    async _flushData(){

        this.listView.pager.setFlushCount(this._pageSize);
        this.listView.pager.reset();

        let data=await App.HttpManager.postAsync("season_api/season_rank_list",{page_no:0,page_size:this._pageSize});
        if(data){
            
           this._onSetListView(data.rank_list);
            this._loadDataView.active=false;
            this._onSetTime(data.end_time);
            this._onSetTop(data);
            this._onShowSelf(data);
            this._onSetMyRank(data);
            //设置前三名
            this._onSetTop3(data.rank_list.slice(0,3));
            // this._checkIfPromotion(data.rank);

            if (data.last_season_ranking && data.last_season_ranking.length > 0) {
                App.DlgManager.showDlg("seasonplacewinner",data.last_season_ranking);
            }
        }
    }

    // private _checkIfPromotion(rank:number){
        // let cur = cc.sys.localStorage.getItem(CURPROMOTION);
        // if (cur && rank > Number(cur)) App.DlgManager.showDlg("seasonpromotion",{cur:Number(cur),new:rank,percent:"60%"});
        // if (cur != rank) cc.sys.localStorage.setItem(CURPROMOTION,rank); 
    // }


    private _onSetMyRank(data:any){
        //this.UIBindData.dw=App.DataManager.getExtInfo(DataConfig.SEASON_RANK)[data.rank].dan_name;
        this.UIBindData.starCount=fromatChip(data.point);
        if (App.DataManager.getSelfData().nick.length > 4) {
            this.UIBindData.selfNick=App.DataManager.getSelfData().nick.substr(0,3)+"...";
        }
        else{
            this.UIBindData.selfNick=App.DataManager.getSelfData().nick;
        }
        // this.UIBindData.selfNick=App.DataManager.getSelfData().Nick;
        this.UIBindData.flag.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(App.DataManager.getSelfData().area_code);
        this.UIBindData.selfRank=data.num==0?App.LangManager.getTxtByKey("unlisted"):data.num;
        getHead(App.DataManager.getSelfData().avatar,this.UIBindData.selfHead);
        if(data.reward){
            this.UIBindData.star = App.LangManager.getTxtByKey("currency") + formatCurrency(data.reward)
        }else{
            this.UIBindData.star = "none"
        }
    }

    private _onSetTop(data:any){
        this.rollNumGroup.setDataOnly(Math.floor(fromatRate(data.pool)));
        let fromatStr="YYYY.MM.DD";
        this.UIBindData.sjTime=`S${data.season_id || 0}:${formatDateWithOutTime(data.start_time*1000,fromatStr)}-${formatDateWithOutTime(data.end_time*1000,fromatStr)}`;
        let lessTime=data.end_time-Math.floor(Date.now()/1000);
        this._lessTime=lessTime;

        cc.game.emit(UpdateSeasonPool,data.pool);
    }

    private _onSetTime(data){
        if (!data) {
            return;
        }
        let t = data - Math.floor(Date.now()/1000);
        this.setLeftTime(t);
        this.startTimer();
    }

    private _onSetTop3(data:any){
        if (data) {
            for(let i=0;i<data.length;i++){
                let playerData=data[i];
                this.rankPlayers[i].init();
                this.rankPlayers[i].setData(playerData);
            } 
        }
    }

    private _onShowSelf(data:any){
        this.UIBindData.myrank = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("seasonrank_"+data.rank);
        if (data.point<data.next_point) {
            this.UIBindData.rankPoint=fromatChip(data.point)+"/"+fromatChip(data.next_point);
        }
        else{
            this.UIBindData.rankPoint=data.point;
        }
        this.scoreProgress.fillRange=-data.point/data.next_point;
        this.UI_SPS.get("rankIcon").getComponent(cc.Sprite).spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+data.rank);
        if(data.rank!=App.DataManager.getSelfData().seasons.current.rank){
            App.DataManager.getSelfData().seasons.current.rank=data.rank
            //更新赛季
            cc.game.emit(GameEvents.FLUSH_SELFDATA);
        }
    }
    onLuckyturnClick(){
        App.DlgManager.showDlg("luckyturn");
    }

    public onStartMove(): void {
        
    }

    public onMoveFinished(): void {
        
    }

    onSeasonRewardClick(){
        if(true){
            App.HttpManager.get("reward/seasondan",{dan:1},this.node,(data:any)=>{

            })
        }else{
            App.DlgManager.showDlg("rewardGoods")
        }
    }

    setLeftTime(time:number){
        this._time=time;
        this.UIBindData.countDown="Ends in:"+GameHelper.fromatTimeNew(this._time);
    }

    startTimer(){
        this.unschedule(this._updateTime);
        if(this._time>0){
            this.schedule(this._updateTime,1)
        }
    }

    stopTimer(){
        this.unschedule(this._updateTime);
    }

    _updateTime(){
        this._time--;
        this.UIBindData.countDown="Ends in:"+GameHelper.fromatTimeNew(this._time);
        if(this._time<=0){
            this.unschedule(this._updateTime);
        }
    }

    onQueryClick(){
        let data:RulesDlgData = new RulesDlgData();
        data.group = [{txt:App.LangManager.getTxtByKey("tips").season1,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").season2,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").season3,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }

    onScrolltopClick(){
        this.scrollView.scrollToTop();
        this.listView.scrollToPage(0);
    }

    flushData(){

    }

    onTaskClick(){
        App.DlgManager.showDlg("seasonTask",null,"mainpackage");
    }

    onGoalClick(){
        App.DlgManager.showDlg("seasonGoal",null,"mainpackage");
    }
}

