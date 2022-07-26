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
import { CHIP_TYPES, CONSTANTS } from "../../../../mainpackage/GameConfig";
import { checkGameStatus, formatCurrency, getRemoteGameStatus, playEffect } from "../../../../mainpackage/gameHelper/AthHelper";
import { GUIDE_STEPS } from "../../../../mainpackage/hall/guid/HallGuideConfig";
import PageBase from "../../../../mainpackage/hall/scripts/PageBase";
import MatchListItemCheck from "./MatchListItemCheck";
import { EVENT_MORECLICK, MatchListTitleItemCheck } from "./MatchListTitleItemCheck";

const {ccclass, property} = cc._decorator;

export const MATCHLIST_FLUSH:string="matchlist_flush";

export const GUIDE_ROOMLIST:string="guide_roomlist";
const MATCHANIM:string = `textures/anims/matchpage/tanchuang`;

export const SELECT_ITEM_MATCH:string="select_item_match"

const KEY_FOLD:string="fold_";

@ccclass
export class MatchListPageCheck extends PageBase {
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


   // private _itemPools:cc.NodePool=new cc.NodePool();

   // private _titlePools:cc.NodePool=new cc.NodePool();

    private _items:cc.Node[]=[];
    private _titleItems:cc.Node[]=[];
    private _totalNode:cc.Node[]=[];

    private _offsetY:number=0;

    private _loadDataView:cc.Node=null;

    private _canExp:boolean=false;

    private _space:number=10;

    //private _matchActive:number[] = [];

    private _xhr:XMLHttpRequest; 

    private _selectItem:any;//选中的对象

    private _foldInfo:any;//折叠信息

    private _foldKey:string;

    onLoad(){
        super.onLoad();
        cc.game.on(EVENT_MORECLICK,this._onClickItem,this)
        this._loadDataView=GameHelper.addDataLoading(this.node);
        cc.game.on(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
        cc.game.on(SELECT_ITEM_MATCH,this._onItemSelect,this);
    }

    _onGuideEnd(stepId:number){
        //解决scrollview事件吞噬的问题
        if(stepId==GUIDE_STEPS.CLICK_ROOMLIST){
            this._onItemSelect(this._selectItem);
        }    
    }

    async _onItemSelect(data:any){
        this._selectItem=data;
        let gameData=App.DataManager.getGameData();
        await getRemoteGameStatus(gameData.gameName);
        if(checkGameStatus(gameData.room_type)!=GameStatus.NORMAL)return;
        

        let priceType=data.match_entry_type;
        let price=data.match_entry_value;
        let selfData=App.DataManager.getSelfData();
        if(priceType==CHIP_TYPES.TICKET&&selfData.ticket<price){
            App.DlgManager.showDlg("toast",{
                title:App.LangManager.getTxtByKey("not_enough_ticket"),
                content:App.LangManager.getTxtByKey("not_enough_ticket_content",[formatCurrency(price)])
            });
            return;
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
            return;
        }
        
        if(gameData.isUnity){
            if(data.front_match_type>=2){
                App.DlgManager.showDlg("matchPrize",data);
            }else{
                if (App.isCheck) {
                    App.DlgManager.showDlg("match",data,App.NativeManager.getFakePackageName());
                }
                else{
                    App.DlgManager.showDlg("match",data);
                }
                
            }
        }else{

            App.BundleManager.loadSubGame(gameData.packageName,()=>{
                //ludo先特殊处理一下
                if(gameData.onlineGame){
                    App.DlgManager.showDlg("match",data,gameData.packageName);
                }else{
                    if(data.front_match_type>=2){
                        App.DlgManager.showDlg("matchPrize",data,App.NativeManager.getFakePackageName());
                    }else{
                        App.DlgManager.showDlg("match",data,App.NativeManager.getFakePackageName());
                    }
                }
            })
            /*
            App.BundleManager.loadSubGame(App.DataManager.getGameData().packageName,()=>{
                if(data.front_match_type>=2){
                    App.DlgManager.showDlg("matchPrize",data);
                }else{
                    // App.DlgManager.showDlg("match",data);
                    if (App.isCheck) {
                        App.DlgManager.showDlg("match",data,App.NativeManager.getFakePackageName());
                    }
                    else{
                        App.DlgManager.showDlg("match",data);
                    }
                }
            })*/
        }
    }

    async _setData() {
        this._offsetY=0;
        this._canExp=false;
        let gameData:GameItemData=App.DataManager.getGameData();
        // let title = cc.instantiate(this.img_matchs)
        // title.name="title";
        // title.setPosition(0,this._offsetY- 69);
        // this.scrollView.content.addChild(title);
        // this.playGameIconAnim(title);
        // this._offsetY -= 119;
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

        let data=await App.HttpManager.postAsync("game_api/match_list",{room_type:gameData.room_type})

            if (!data?.room_conf?.length){
                GameHelper.addEmptyDataView(this.scrollView.node.getChildByName("view"));
                return
            }

            let datas=data.room_conf || [];
            let guideRoomId=App.DataManager.getGameData().guidRoomListRoomId;
            let guideNode:cc.Node;
            let nodeHeight:number=0;
            let needAdd:boolean=false;
            let showCount=0;
            for(let i=0;i<datas.length;i++){
                //let isHave = this._getIsActive(datas[i].cli_type);
                let node:cc.Node=null;
                let isOtherType=false;
                if(i==0){
                    isOtherType=true;
                }else{
                    isOtherType=datas[i].front_match_type!=datas[i-1].front_match_type;
                }
                if(isOtherType){
                    if(needAdd){
                        this._offsetY-=(nodeHeight+this._space);
                    }
                    needAdd=false;
                    node=cc.instantiate(this.titleInstance);
                    node.getComponent(MatchListTitleItemCheck).setData(datas[i].front_match_type,"");
                    this._titleItems.push(node);
                    node.opacity=0;
                    node.setPosition(0,this._offsetY-150);
                    this.scrollView.content.addChild(node,1);
                    cc.tween(node).delay(showCount*0.1).to(0.2,{opacity:255,y:this._offsetY}).start();
                    this._offsetY-=(node.height+this._space);
                    this._totalNode.push(node);
                    node.getComponent(MatchListTitleItemCheck).setFold(this._foldInfo[datas[i].front_match_type]==1)
                }

                node=cc.instantiate(this.itemInstance);
                node.setPosition(0,this._offsetY-150);
                this.scrollView.content.addChild(node);
                node.getComponent(MatchListItemCheck).setData(i,datas[i]);
                this._items.push(node);

                if(guide&&datas[i].match_id==guideRoomId){
                    guideNode=node;
                    node.name="guideNode";
                    this._selectItem=datas[i];
                }
                if(this._foldInfo[datas[i].front_match_type]==1){            
                    node.opacity=0;
                    if(isOtherType){
                        cc.tween(node).delay(showCount*0.1).to(0.2,{opacity:255,y:this._offsetY}).start();
                        showCount++;
                    }else{
                        node.setPosition(0,this._offsetY)
                    }
                    nodeHeight=node.height;
                    needAdd=true;
                }else{
                    node.opacity=0;
                    cc.tween(node).delay(showCount*0.1).to(0.2,{opacity:255,y:this._offsetY}).start();
                    this._offsetY-=(node.height+this._space);
                    showCount++;
                }
                node.zIndex=datas.length-i;
                this._totalNode.push(node);
            }
            if(needAdd){
                this._offsetY-=(nodeHeight+this._space);
            }

            this.scrollView.content.height=Math.abs(this._offsetY);

            this._loadDataView.active=false;
            this.scheduleOnce(()=>{
                this._canExp=true;
                if(guide){
                    NewGuideHelper.getInstance().run(GUIDE_STEPS.CLICK_ROOMLIST);
                }
            },datas.length*0.1+0.2)

            //新手引导
            if(!guide){
                this.scrollView.scrollToTop();
            }else{
                //滑动出列表
                this.scrollView.scrollToOffset(cc.v2(0,-guideNode.y-guideNode.height));
            }
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
            returnMatchListItem
        }*/

        let targetNode=this._titleItems.filter(item=>item.getComponent(MatchListTitleItemCheck).type==type)[0];
        let moveTime=0.3;
        let pos=targetNode.getPosition();
        let moveNode=this._items.filter(item=>item.getComponent(MatchListItemCheck).data.front_match_type==type);
        let fristNode=moveNode[0];
        if(!fristNode)return;
        let isShow=this._foldInfo[type]==1;
        if(isShow){
            pos.y=fristNode.y-fristNode.height-this._space;
        }
        this._foldInfo[type]=isShow?0:1;
        targetNode.getComponent(MatchListTitleItemCheck).setFold(this._foldInfo[type],true);
        let moveHeight=0;
        for(let i=1;i<moveNode.length;i++){
            let itemCom=moveNode[i].getComponent(MatchListItemCheck);
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
        this.scrollView.content.destroyAllChildren();
        this._items.splice(0,this._items.length);
        this._titleItems.splice(0,this._titleItems.length);
        this._totalNode.splice(0,this._totalNode.length);
    }

    onDisable(){
        //clearTimeout(this._requestId);
        if(this._xhr)App.HttpManager.cancel(this._xhr);
        this._clearNode();
        
        this._saveFoldInfo();
    }

    onDestory(){
        this._saveFoldInfo();
    }

    _saveFoldInfo(){
        cc.sys.localStorage.setItem(this._foldKey,JSON.stringify(this._foldInfo))
    }

    onEnable(){
        this._flush();
    }

    playGameIconAnim(node:cc.Node){
        let name = App.DataManager.getGameData().packageName;
        playEffect(1,MATCHANIM,node.getChildByName("anim_tanchuang").getComponent(sp.Skeleton),name,false,"mainpackage",null,this,null);
    }

    onDestroy(){
        cc.game.off(EVENT_MORECLICK,this._onClickItem,this);
    }

    public onStartMove(): void {
        
    }

    public onMoveFinished(): void {
        throw new Error("Method not implemented.");
    }

    public flushData():void{
        this.onDisable();
        this.onEnable();
    }
}