// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import GameItemData from "../../../../gamecore/models/GameItemData";
import { GameStatus } from "../../../../gamecore/models/GameStatus";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import ListAdapter from "../../../../gamecore/ui/components/common/ListAdapter";
import ListView, { AbsAdapter } from "../../../../gamecore/ui/components/common/ListView";
import { GUIDE_EVENTS, NewGuideHelper } from "../../../../gamecore/ui/components/newGuide/NewGuideHelper";
import { AppStatusEnum, CHIP_TYPES, CONSTANTS } from "../../../GameConfig";
import { checkGameStatus, formatCurrency, getRemoteGameStatus, playEffect, saveGuidData } from "../../../gameHelper/AthHelper";
import { GUIDE_STEPS } from "../../guid/HallGuideConfig";
import { CLOSEMASK } from "../../scripts/hall";
import PageBase from "../../scripts/PageBase";
import MatchListItem from "./MatchListItem";
import { MatchListTitleItem,EVENT_MORECLICK } from "./MatchListTitleItem";
import MatchMatchItem from "./MatchMatchItem";

const {ccclass, property} = cc._decorator;

export const MATCHLIST_FLUSH:string="matchlist_flush";

export const GUIDE_ROOMLIST:string="guide_roomlist";
const MATCHANIM:string = `textures/anims/matchpage/tanchuang`;

export const SELECT_ITEM_GAME:string="select_item_GAME"

export const SELECT_ITEM_MATCH:string="select_item_MATCH"

const KEY_FOLD:string="fold_";

export const enum MATCHTYPE{
    Ticket,
    Cash,
    Tournament,
    AllTournament,
    LimitTime,
}

@ccclass
export class MatchListPage extends PageBase {
    @property(cc.Node)
    img_gameicon:cc.Node = null;

    @property(cc.Prefab)
    itemInstance: cc.Prefab = null;

    @property(cc.Prefab)
    titleInstance: cc.Prefab = null;

    @property(cc.ScrollView)
    scrollView:cc.ScrollView=null;

    @property(cc.Prefab)
    img_matchs:cc.Prefab=null;
    
    @property(cc.Prefab)
    matchInstance:cc.Prefab = null;

   // private _itemPools:cc.NodePool=new cc.NodePool();

   // private _titlePools:cc.NodePool=new cc.NodePool();

   // private _titlePools:cc.NodePool=new cc.NodePool();// private _titlePools:cc.NodePool=new cc.NodePool();
   // private _titlePools:cc.NodePool=new cc.NodePool();

   

    private _items:cc.Node[]=[];
    private _titleItems:cc.Node[]=[];
    private _matchItems:cc.Node[]=[];
    private _totalNode:cc.Node[]=[];

    private _offsetY:number=0;

    private _loadDataView:cc.Node=null;

    private _canExp:boolean=false;

    private _space:number=10;

    //private _matchActive:number[] = [];

    private _xhr:XMLHttpRequest; 

    private _selectItem:any;//选中的对象

    private _selectMatch:any;//选中的赛事

    private _foldInfo:any;//折叠信息

    private _foldKey:string;

    private _showAnim:boolean=false;

    private _data:any;

    private _titleNode:cc.Node;

    onLoad(){
        super.onLoad();
        cc.game.on(EVENT_MORECLICK,this._onClickItem,this)
        this._loadDataView=GameHelper.addDataLoading(this.node);
        cc.game.on(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
        cc.game.on(SELECT_ITEM_GAME,this._onItemSelect,this);
        cc.game.on(SELECT_ITEM_MATCH,this._onItemMatch,this);
        cc.game.on(cc.game.EVENT_SHOW,this._onGameShow,this);
    }

    _onGuideEnd(stepId:number){
        //解决scrollview事件吞噬的问题
        if(stepId==GUIDE_STEPS.CLICK_ROOMLIST){
            this._onItemSelect(this._selectItem);
        }    
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

    async _onItemMatch(data:any){
        this._selectMatch=data;
        let gameData = App.DataManager.getGameData();
        await getRemoteGameStatus(gameData.gameName);
        if (checkGameStatus(gameData.room_type)!=GameStatus.NORMAL) return;
        if (!this._checkIsEntry(data)) return;

        App.DlgManager.showDlg("matchdetails",data);
    }

    async _onItemSelect(data:any){
        this._selectItem=data;
        let gameData=App.DataManager.getGameData();
        await getRemoteGameStatus(gameData.gameName);
        if(checkGameStatus(gameData.room_type)!=GameStatus.NORMAL)return;
        if (!this._checkIsEntry(data)) return;
        
        if(gameData.isUnity){
            if(data.front_match_type>=2){
                App.DlgManager.showDlg("matchPrize",data);
            }else{
                App.DlgManager.showDlg("match",data);
            }
        }else{
            App.BundleManager.loadSubGame(gameData.packageName,()=>{
                //ludo先特殊处理一下
                if(gameData.onlineGame){
                    App.DlgManager.showDlg("match",data,gameData.packageName);
                }else{
                    if(data.front_match_type>=2){
                        App.DlgManager.showDlg("matchPrize",data);
                    }else{
                        App.DlgManager.showDlg("match",data);
                    }
                }
            })
        }
    }

    private _itemIndex:number=0;
    private _titleItemIndex:number=0;
    private _matchItemIndex:number=0;
    private _needAdd:boolean=false;
    private _showCount:number=0;
    private _guide:boolean=false;
    private _guideRoomId:number;
    private _guideNode:cc.Node;
    private _datas:any;
    private _showFinish:boolean=false;
    private _nodeHeight:number=0;

    _showMatchList(data:any){
        this._guide=(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_ROOMLIST)
        let datas=data.room_conf || [];
        this._guideRoomId=App.DataManager.getGameData().guidRoomListRoomId;
        this._needAdd=false;
        this._showCount=0;
        this._itemIndex=this._titleItemIndex=this._matchItemIndex=0;
        this._showFinish=false;
        this._datas=datas;
        this._oneCreateItems();
    }

    _createItem(datas:any){
        let node:cc.Node=null;
        let isOtherType=false;
        if(this._showCount==0){
            isOtherType=true;
            this._loadDataView.active=false;
        }else{
            isOtherType=datas[this._showCount].front_match_type!=datas[this._showCount-1].front_match_type;
        }
        if(isOtherType){
            if(this._needAdd){
                this._offsetY-=(this._nodeHeight+this._space);
            }
            this._needAdd=false;

            if(datas[this._showCount].front_match_type != MATCHTYPE.LimitTime)
            {
                node=this._titleItems[this._titleItemIndex++] ||  cc.instantiate(this.titleInstance);
                node.getComponent(MatchListTitleItem).setData(datas[this._showCount].front_match_type,"");
                if(!node.parent){
                    this._titleItems.push(node);
                    this.scrollView.content.addChild(node,1);
                    this._totalNode.push(node);
                }
                node.setPosition(0,this._offsetY);
                node.active=true;
                this._offsetY-=(node.height+this._space);
                node.getComponent(MatchListTitleItem).setFold(this._foldInfo[datas[this._showCount].front_match_type]==1)
            }
        }
        if (datas[this._showCount].front_match_type == MATCHTYPE.LimitTime) {
            node=this._matchItems[this._matchItemIndex++] || cc.instantiate(this.matchInstance);
            if(!node.parent){
                this._matchItems.push(node);
                this.scrollView.content.addChild(node);
                //this._totalNode.push(node);
            }
        }
        else{
            node=this._items[this._itemIndex++] || cc.instantiate(this.itemInstance);
            if(!node.parent){
                this._items.push(node);
                this.scrollView.content.addChild(node);
                this._totalNode.push(node);
            }
        }
        
        node.setPosition(0,this._offsetY);
      
        if (datas[this._showCount].front_match_type == MATCHTYPE.LimitTime) {
            node.getComponent(MatchMatchItem).setData(this._showCount,datas[this._showCount]);
        }
        else{
            node.getComponent(MatchListItem).setData(this._showCount,datas[this._showCount]);
        }
        node.active=true;
        node.opacity=255;

        if(this._guide&&datas[this._showCount].match_id==this._guideRoomId){
            this._guideNode=node;
            node.name="guideNode";
            this._selectItem=datas[this._showCount];
        }

        node.zIndex=this._datas.length-this._showCount;

        if(this._foldInfo[datas[this._showCount].front_match_type]==1){            
            //node.opacity=0;
            if(isOtherType){
                //cc.tween(node).delay(this._showCount*0.1).set({active:true}).to(0.2,{opacity:255,y:this._offsetY}).start();
            }else{
                node.setPosition(0,this._offsetY);
            }
            this._nodeHeight=node.height;
            this._needAdd=true;
        }else{
            //node.opacity=0;
            //cc.tween(node).delay(this._showCount*0.1).set({active:true})//.to(0.2,{opacity:255,y:this._offsetY}).start();
          
            node.setPosition(0,this._offsetY);
            this._offsetY-=(node.height+this._space);
            //this._showCount++;
        }


        this._showCount++;

        if(this._showCount==this._datas.length){
            this._showFinish=true;
            if(this._needAdd){
                this._offsetY-=(this._nodeHeight+this._space);
            }
    
            this.scrollView.content.height=Math.abs(this._offsetY);
    
            this.scheduleOnce(()=>{
                this._canExp=true;
                if(this._guide){
                    NewGuideHelper.getInstance().run(GUIDE_STEPS.CLICK_ROOMLIST);
                }
            },this._datas.length*0.1+0.2)
    
            //新手引导
            if(!this._guide){
                this.scrollView.scrollToTop();
            }else{
                //滑动出列表
                this.scrollView.scrollToOffset(cc.v2(0,-this._guideNode.y-this._guideNode.height));
            }
        }
    }

    async _setData() {

        this._showAnim=false;
        this._offsetY=0;
        this._canExp=false;
        this._showCount=0;
        this._data=null;

        let gameData:GameItemData=App.DataManager.getGameData();

        
        if(!this._titleNode){
            let title = cc.instantiate(this.img_matchs)
            title.name="title";
            title.setPosition(0,this._offsetY- 89);
            this._titleNode=title;
            this.scrollView.content.addChild(this._titleNode);
        }

        this.playGameIconAnim(this._titleNode);
        this._titleNode.opacity=0;
        cc.tween(this._titleNode).delay(0.1).to(0.1,{opacity:255}).start();

        this._offsetY -= 179;
        this._loadDataView.active=true;

        this._foldKey=KEY_FOLD+gameData.room_type;
        this._foldInfo=cc.sys.localStorage.getItem(this._foldKey)
        if(this._foldInfo){
            this._foldInfo=JSON.parse(this._foldInfo);
        }else{
            this._foldInfo={};
        }
        
        let guide=(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_ROOMLIST)
        if(guide){
            //@ts-ignore
            cc.Node.canTouch=false;
        }

       App.HttpManager.post("game_api/match_list",{room_type:gameData.room_type},this.node,(data)=>{
           this._data=data;

            if(data.room_conf[0]&&data.room_conf[0].front_match_type == MATCHTYPE.LimitTime){
                this._titleNode.getChildByName("img_titlebg").active = true;
                this._titleNode.getChildByName("img_matchs").active = false;
            }
            else{
                this._titleNode.getChildByName("img_titlebg").active = false;
                this._titleNode.getChildByName("img_matchs").active = true;
            }
            // data.room_conf=[];
            if (!this._data?.room_conf?.length){
                GameHelper.addEmptyDataView(this.scrollView.node.getChildByName("view"));
                this._loadDataView.active=false;
                return
            }
            if(this._showAnim){
                this._showMatchList(this._data);
            }
       })
    }

    /*
    private _getIsActive(n:number){
        let isHave:boolean = false;
        if (this._matchActive) {
            for (let index = 0; index < this._matchActive.length; index++) {
                if (this._matchActive&&this._matchActive[index] == n) {
                    isHave = true;
                }
            }
        }
        if (App.DataManager.getExtInfo("guide_clickMatchList")) {
            return false;
        }
        return isHave;
    }*/

    _onClickItem(type:number){
        if(!this._canExp)return;
        /*
        let gameData=App.DataManager.getGameData();

        if(gameData.gameState==GameStatus.SERVICING){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Under maintenance",error:true});
            return;
        }

        if(gameData.gameState==GameStatus.NOTOPEN){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"The game is not yet open",error:true});
            return
        }*/

        let targetNode=this._titleItems.filter(item=>item.getComponent(MatchListTitleItem).type==type)[0];
        let moveTime=0.3;
        let pos=targetNode.getPosition();
        let moveNode;
        /*
        if (type == MATCHTYPE.LimitTime) {
            moveNode=this._items.filter(item=>item.getComponent(MatchMatchItem));
        }
        else{
            moveNode=this._items.filter(item=>item.getComponent(MatchListItem)&&item.getComponent(MatchListItem).data.front_match_type==type);
        }
        */
        moveNode=this._items.filter(item=>item.getComponent(MatchListItem)&&item.getComponent(MatchListItem).data.front_match_type==type);

        let fristNode=moveNode[0];
        if(!fristNode)return;
        let isShow=this._foldInfo[type]==1;
        if(isShow){
            pos.y=fristNode.y-fristNode.height-this._space;
        }
        this._foldInfo[type]=isShow?0:1;
        targetNode.getComponent(MatchListTitleItem).setFold(this._foldInfo[type],true);
        let moveHeight=0;
        for(let i=1;i<moveNode.length;i++){
            let itemCom;
            if (type == MATCHTYPE.LimitTime) {
                itemCom=moveNode[i].getComponent(MatchMatchItem);
            }
            else{
                itemCom=moveNode[i].getComponent(MatchListItem);
            }
            
            itemCom.node.active=true;
            if(isShow){
                itemCom.node.x=targetNode.x;
                itemCom.node.y=targetNode.y-moveNode[0].height-this._space;
            }
            itemCom.node.opacity=isShow?0:255;
            itemCom.node.stopAllActions();
            itemCom.node.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(moveTime,pos),
                    cc.fadeTo(moveTime,isShow?255:0)
                ),
                cc.callFunc((node,index)=>{
                    if(!isShow)node.active=false;
                },itemCom.node,i)
            ))
            if(isShow){
                pos.y-=itemCom.node.height+this._space;
            }
            moveHeight+=itemCom.node.height+this._space;
        }
        let index=this._totalNode.indexOf(moveNode[moveNode.length-1])
        if(index==-1)return;
        for(let i=index+1;i<this._totalNode.length;i++){
            let node=this._totalNode[i];
            node.runAction(cc.moveTo(moveTime,0,node.y+(isShow?-moveHeight:moveHeight)));
        }
        this.scrollView.content.height+=isShow?moveHeight:-moveHeight;

        GameHelper.removeEmptyDataView(this.scrollView.node.getChildByName("view"));
    }

    _flush(){
        this._clearNode();
        this._setData();
    }

    _clearNode(){
        /*
        this._items.splice(0,this._items.length);
        this._titleItems.splice(0,this._titleItems.length);
        this._totalNode.splice(0,this._totalNode.length);*/
        for(let i=0;i<this._totalNode.length;i++){
            this._totalNode[i].active=false;
        }

        for(let i=0;i<this._matchItems.length;i++){
            this._matchItems[i].active=false;
        }
    }

    onDisable(){
        //clearTimeout(this._requestId);
        if(this._xhr)App.HttpManager.cancel(this._xhr);
        this._clearNode();
        
        this._saveFoldInfo();
    }

    onDestory(){
        this._saveFoldInfo();
        cc.game.off(cc.game.EVENT_SHOW,this._onGameShow,this);
    }

    _saveFoldInfo(){
        cc.sys.localStorage.setItem(this._foldKey,JSON.stringify(this._foldInfo))
    }

    onEnable(){
        this._flush();
    }

    _onGameShow(){
        cc.log("ongameshow>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.scheduleOnce(()=>{
            this._flush();
        },0.1)
    }

    playGameIconAnim(node:cc.Node){
        let name = App.DataManager.getGameData().packageName;
        playEffect(1,MATCHANIM,node.getChildByName("anim_tanchuang").getComponent(sp.Skeleton),name,false,"mainpackage",()=>{
            this._showAnim=true;
            if(this._data){
                this._showMatchList(this._data);
            }
        },this,null);
    }

    onDestroy(){
        cc.game.off(EVENT_MORECLICK,this._onClickItem,this);
    }

    public onStartMove(): void {
        
    }

    public onMoveFinished(): void {
        throw new Error("Method not implemented.");
    }

    _oneCreateItems(){
        while(!this._showFinish&&this._datas&&this._showAnim){
            this._createItem(this._datas);
        }
    }

    update(dt: number): void {
        /*
        if(!this._showFinish&&this._datas&&this._showAnim){
            this._createItem(this._datas);
        }*/
    }

    public flushData():void{
        this.onDisable();
        this.onEnable();
    }
}