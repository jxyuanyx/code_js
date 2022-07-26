import App from '../../../gamecore/App';
import { NewRechargeStatus, RewardEnum } from '../../../gamecore/enums/RewardEnum';
import { GameEvents } from "../../../gamecore/events/GameEvents";
import GameItemData from "../../../gamecore/models/GameItemData";
import { DlgSequecene } from "../../../gamecore/tools/DlgSequecene";
import GameHelper from '../../../gamecore/tools/GameHelper';
import { BaseScene } from "../../../gamecore/ui/baseview/imp/BaseScene";
import { FINISHSTEP } from "../../../gamecore/ui/components/guid/GodCommand";
import GodGuide from "../../../gamecore/ui/components/guid/GodGuide";
import { GUIDE_EVENTS, NewGuideHelper } from '../../../gamecore/ui/components/newGuide/NewGuideHelper';
import { BalanceType } from '../../../mainpackage/dialogs/balance/Balance';
import { GameConfig } from '../../../mainpackage/GameConfig';
import { formatCurrency, getHead, saveGuidData } from '../../../mainpackage/gameHelper/AthHelper';
import { GUIDE_STEPS } from '../../../mainpackage/hall/guid/HallGuideConfig';
import { NoticeService } from '../../../mainpackage/hall/scripts/NoticeService';
import PageBase from '../../../mainpackage/hall/scripts/PageBase';
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from '../../../mainpackage/services/RedTipService';
import { GAMEITEMCLICK } from '../pages/page1/GamePageCheck';
const {ccclass, property} = cc._decorator;


const OTHER_VIEWS:string[]=[
    "page1/GamePageView",
    "page2/MatchPageView",
    // "page4/DepositPageView",
    // "page3/SeasonPageView",
    "page5/RecordsPageView",
];

const CHECKINDEX_MAPS=[0,1,4];

export const enum PAGES{
    GAMES,
    MATCH,
    DEPOSIT,
    SEASON,
    RECORDS
}

export const  EVENTS={
    CHANGEPAGE:"change_page"
}

export const RedTipKey="redTip";

export const CLOSEMASK="closeMask";

export const UpdateSeasonPool="update_season_pool"

const enum MOVE_DIRECTION{
    R2L=-1,
    L2R=1
}

@ccclass
export class hallcheck01 extends BaseScene {

    // @property(cc.Prefab)
    // weakguide:cc.Prefab = null;

    @property(cc.Node)
    pageView:cc.Node=null;

    // @property(cc.ToggleContainer)
    // bottomTc:cc.ToggleContainer=null;

    @property(cc.ToggleContainer)
    bottomTc_check:cc.ToggleContainer=null;

    // @property(cc.Node)
    // redTips:cc.Node[]=[];

    @property(cc.Node)
    checkRedTips:cc.Node[]=[];

    // @property(cc.Prefab)
    // guideInstance:cc.Prefab;

    // @property(cc.Node)
    // guid_FristEnter:cc.Node=null;

    // @property(cc.Node)
    // guid_RoomList:cc.Node=null;

    // @property(cc.Prefab)
    // mainInstance:cc.Prefab=null;

   // _guide:GodGuide=null;

    UIBindData={
        uid:0,
        cash:"",
        ticket:"",
        version:"v1.0.0",
        head:null,
        flag:null,
        rank:null,
        seasonPool:""
    }

    private _views:cc.Node[]=[];

    private _loadIndex=0;

    private _logPwdStr="";

    private _selectIndex=0;
    
    onLoad(){
        super.onLoad();
       // let mainView=cc.instantiate(this.mainInstance);
       // this.pageView.addChild(mainView);
       // this._views.push(mainView);
        // for(let i=0;i<this.redTips.length;i++){
        //     this.redTips[i].active=false;
        // }

        // this.guid_FristEnter.zIndex=10000;

        App.AudioManager.init();

        // if(App.isCheck){
           this._setCheck();
        // }

       // this._createGuide();
        // this._setWeakGuid();

        // this.UI_LBS.get("seasonPool").parent.active=false;
    }

    /*
    _createGuide(){
        if(!this._guide){
            this._guide=cc.instantiate(this.guideInstance).getComponent(GodGuide);
            this.node.addChild(this._guide.node,999);
        }
    }*/

    _setCheck(){
        this.UI_BTNS.get("add1").active=false;
        this.UI_BTNS.get("menu").active=false;
        let cashView=this.UI_BTNS.get("bindCash");
        this.node.getChildByName("top").getChildByName("cashIcon").active=false;
        cashView.getChildByName("checkIcon").active=true;
        // cashView.x+=50;
        // this.node.getChildByName("bottom").active=false;
        this.node.getChildByName("bottom_check").active=true;
        // this.UI_BTNS.get("shop").active=false;
        // this.redTips[2]=this.checkRedTips[0];
    }

    _showActiveDlg(){
        //如果存在纪录详情界面，直接显示
        App.DlgManager.setDlgActive("record",true);
        App.DlgManager.setDlgActive("offlineHistory",true);
    }

    async afterEnter(){
        
        this._showActiveDlg();

        NewGuideHelper.getInstance().setCurrentTaskKey(GameConfig.mainBundle);
        this._addEvent();
        //App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/bgm1",true);
        
        this.flushUserInfo(); 

        let fristView=await this.loadView(0);
        this.pageView.addChild(fristView);
        
        //初始化新手引导
        await NewGuideHelper.getInstance().init("hall/guid/NewGuideConfig","hall/guid/guide","mainpackage")
        if(App.DataManager.getSelfData().progress==GUIDE_STEPS.NONE){
            saveGuidData(GUIDE_STEPS.CLICK_ICON);
        }

        if(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_ICON){
            NewGuideHelper.getInstance().run(GUIDE_STEPS.CLICK_ICON);
        }

        await this._loadOtherView();

        this._logPwdStr="";
        this.UIBindData.version=cc.sys.localStorage.getItem('main_version') || "v1.0.0";

        
        let restartSubGame=cc.sys.localStorage.getItem("RestartSubGame");
        if(restartSubGame){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Update completed",error:true});
            cc.sys.localStorage.removeItem("RestartSubGame")
        }

        this._getRedTips();
        
        NoticeService.getInstance().startComNotice();

    }



    // async _getNewRecharge(){
    //     let data=await App.HttpManager.postAsync("activity_api/check_new_player_recharge_status",{activity_id:RewardEnum.NEWRECHARGE});
    //     cc.log("_getNewRecharge>>>>>>>>>>>",data);
    //     switch (data.finish_status) {
    //         case NewRechargeStatus.AVAILABLE:
    //             App.DlgManager.showDlg("reward/newRecharge");
    //             break;
    //         case NewRechargeStatus.ALREADY:
    //             App.DlgManager.showDlg("reward/newRechTask");
    //             break;
    //         default:
    //             break;
    //     }
    // }


    _getRedTips(){
        // RedTipService.getInstance().activeRedTip(this.redTips[0],REDTIP_MODULE.MENU);
        // RedTipService.getInstance().activeRedTip(this.redTips[1],REDTIP_MODULE.SEASON);
        // RedTipService.getInstance().activeRedTip(this.redTips[2],REDTIP_MODULE.RECORD);

        /*
        let lottery = App.DataManager.getExtInfo(DataConfig.LOTTERY);
        if (lottery){
            this.scheduleOnce(()=>{
                let Lv = App.DataManager.getExtInfo(DataConfig.LOTTERY);
                let data:ComDlgData = new ComDlgData();
                data.title = "Congratulations";
                data.group = [{name:"Ok",isExit:true,cb:null},{name:"Go to spin",isExit:true,cb:()=>{
                    App.DlgManager.showDlg("luckyturn");
                }}];
                data.txt = "You get the lottery ticket Lv"+Lv;
                App.DlgManager.showDlg("comdlg",data,"mainpackage");
                App.DataManager.deleteExtInfo(DataConfig.LOTTERY);
            },0.1)
        }  */
    }

    _addEvent(){
        //cc.game.on(EVENT_SELECTGAME,this._onSelectGame,this);
        cc.game.on(EVENTS.CHANGEPAGE,this._onChangePage,this);
        cc.game.on(GameEvents.FLUSH_SELFDATA,this.flushUserInfo,this);
        cc.game.on(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.on(GUIDE_EVENTS.START,this._onGuideStart,this);
        cc.game.on(GUIDE_EVENTS.FINISH,this._onGuideEnd,this);
        cc.game.on(GAMEITEMCLICK,this._onGameItemClick,this);
        cc.game.on(cc.game.EVENT_SHOW,this._onGameShow,this);
        // cc.game.on(SHOWWITHDRAW,this._setWeakGuid,this);
        cc.game.on(UpdateSeasonPool,this._updateSeasonPool,this)

        // this.guid_RoomList.on(cc.Node.EventType.TOUCH_MOVE,this._onGuidRoomListMove,this)

        // this.guid_RoomList.on(cc.Node.EventType.TOUCH_END,this._onGuidRoomListEnd,this)
    }

    _updateSeasonPool(num:number){
        // this.UI_LBS.get("seasonPool").parent.active=num>0;
        // this.UIBindData.seasonPool=formatCurrency(num-num%1000,true);
    }

    // setWeakGuide(isShow:boolean =false){
    //     let node=this.UI_BTNS.get("menu");

    //     let child = node.getChildByName("node_weakguide");
    //     if (child) {
    //         child.removeFromParent();
    //         child.destroy();
    //     }

    //     if (!isShow) {
    //         return;
    //     }
    //     let weak = cc.instantiate(this.weakguide);
    //     weak.getComponent(WeakGuid).setData(node,WEAKTYPE.sprite,App.LangManager.getTxtByKey("weakwithdraw"));
    // }

    // _setWeakGuid(){
    //     let isShow = cc.sys.localStorage.getItem(WITHDRAWDATA.SHOWWITHDRAW)||0;
    //     let minWithdraw = cc.sys.localStorage.getItem(WITHDRAWDATA.MINWITHDRAW||10000);
    //     let cash = App.DataManager.getSelfData().gold_withdraw;
    //     if (cash >= Number(minWithdraw) && Number(isShow) == 0) {
    //         this.setWeakGuide(true);
    //     }
    //     else{
    //         this.setWeakGuide(false);
    //     }
    // }
    _onGuidRoomListMove(event){
        event.currentTarget._touchListener.setSwallowTouches(true);
    }

    _onGuidRoomListEnd(event){
        event.currentTarget._touchListener.setSwallowTouches(false);
    }

    _onGameShow(){
        App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/bgm1",true);
        this._showActiveDlg();
    }

    _onGameItemClick(){
        NewGuideHelper.getInstance().finishTask();
    }

    _udpateRedTip(key:number,num:number){
        // if(key==REDTIP_MODULE.MENU){
        //     RedTipService.getInstance().activeRedTip(this.redTips[0],REDTIP_MODULE.MENU);
        // }else if(key==REDTIP_MODULE.SEASON){
        //     RedTipService.getInstance().activeRedTip(this.redTips[1],REDTIP_MODULE.SEASON);
        // }else if(key==REDTIP_MODULE.RECORD){
        //     RedTipService.getInstance().activeRedTip(this.redTips[2],REDTIP_MODULE.RECORD);
        // }
    }

    _onMarquee(){
        
    }

    _onChangePage(page:PAGES){
        if(page==this._selectIndex){
            this._views[this._selectIndex].getComponent(PageBase).flushData();
        }
        // if(App.isCheck){
            this.bottomTc_check.toggleItems[page].isChecked=true; 
        // }else{
        //     this.bottomTc.toggleItems[page].isChecked=true; 
        // }
    }

    async loadView(viewIndex:number){
        let pf=await App.BundleManager.loadAssestAsync("/hall/pages/"+OTHER_VIEWS[viewIndex],cc.Prefab,App.NativeManager.getFakePackageName())
        let view=cc.instantiate(pf);
        this._views.push(view);
        return view
    }


    async _loadOtherView(){

        for(let i=1;i<OTHER_VIEWS.length;i++){
            await this.loadView(i);
        }
        
    }

    _changePage(index:number){
        let prvView=this.pageView.children[0];
        prvView.active=false;
        prvView.removeFromParent();
        let view=this._views[index];
        view.setPosition(cc.Vec2.ZERO);
        view.active=true;
        this.pageView.addChild(view);
        this._selectIndex=index;

        //清除历史纪录红点
        if(index==PAGES.RECORDS){
            RedTipService.getInstance().clearRedTip(REDTIP_MODULE.RECORD);
        }
    }


    _changeCheckPage(index:number){
        let prvView=this.pageView.children[0];
        prvView.removeFromParent();
        let view=this._views[index];
        view.setPosition(cc.Vec2.ZERO);
        this.pageView.addChild(view);
       
        this._selectIndex=index;
    }

    /**
     * 更新用户信息
     */
    flushUserInfo(){
        let selfData=App.DataManager.getSelfData();
        this.UIBindData.uid=selfData.uid;
        this.UIBindData.cash=formatCurrency(selfData.gold);
        this.UIBindData.ticket=formatCurrency(selfData.ticket);
        getHead(selfData.avatar,this.UIBindData.head);
        this.UIBindData.flag.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(selfData.area_code);
        // this.UIBindData.rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+selfData.seasons.current.rank);
    }


    // onTabClick(){
    //     let toggles=this.bottomTc.toggleItems;
    //     let selectIndex=0;
    //     toggles.forEach((item,index) => {
    //         if(item.isChecked){
    //             selectIndex=index;
    //         }
    //     });

    //     this._changePage(selectIndex);
    // }

    onCheckTabClick(){
        cc.error(">>>>>>>>>>>>ssssssss");
        let toggles=this.bottomTc_check.toggleItems;
        let selectIndex=0;
        toggles.forEach((item,index) => {
            if(item.isChecked){
                selectIndex=index;
            }
        });

        cc.error(">>>>>>>>>>>>ssssssss",selectIndex);

        this._changeCheckPage(selectIndex);

        /*
        if(selectIndex==PAGES.MATCH){
            cc.game.emit(MATCHLIST_FLUSH);
        }*/
    }

    _onSelectGame(){
        //this.pageView.scrollToPage(1,0.5);
        //this.bottomTc.toggleItems[1].isChecked=true;
        //cc.game.emit(MATCHLIST_FLUSH);
    }

    onAddClick(){
        if(App.isCheck)return
        // cc.game.emit(GameEvents.PAY,{ProductID:RewardEnum.LOGINREWARD});
        cc.game.emit(EVENTS.CHANGEPAGE,PAGES.DEPOSIT);
    }

    onAdd1Click(){
        if(App.isCheck)return
        cc.game.emit(EVENTS.CHANGEPAGE,PAGES.DEPOSIT);
    }

    onUserInfoClick(){
        if(App.isCheck)return
        //App.DlgManager.showDlg("editInfo","","mainpackage");
        App.DlgManager.showDlg("userInfo","null","mainpackage");
    }

    onMenuClick(){
        App.DlgManager.showDlg("menu","null","mainpackage");
    }

    onShopClick(){

    }

    onDestroy(){
        this._clearViews();
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.off(EVENTS.CHANGEPAGE,this._onChangePage,this);
        cc.game.off(GameEvents.FLUSH_SELFDATA,this.flushUserInfo,this);
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
        cc.game.off(GameEvents.GUIDE_STEP_START,this._onGuideStart,this);
        cc.game.off(GameEvents.GUIDE_STEP_END,this._onGuideEnd,this);
        cc.game.off(GAMEITEMCLICK,this._onGameItemClick,this);
        //cc.game.off(GUIDE_ROOMLIST,this._onGuideRoomList,this);
        cc.game.off(cc.game.EVENT_SHOW,this._onGameShow,this);
        // cc.game.off(SHOWWITHDRAW,this._setWeakGuid,this);
        cc.game.off(UpdateSeasonPool,this._updateSeasonPool,this)
        // this.guid_RoomList.off(cc.Node.EventType.TOUCH_MOVE,this._onGuidRoomListMove,this)
        // this.guid_RoomList.off(cc.Node.EventType.TOUCH_END,this._onGuidRoomListEnd,this)
    }

    private _clearViews(){
        for (let index = 0; index < this._views.length; index++) {
            this._views[index].removeFromParent();
            this._views[index].destroy();
        }
    }

    _onGuideStart(stepId:number,rect_light:cc.Rect,rect_click:cc.Rect){
        // cc.error("stepId>>>>>",stepId)
        // if(stepId==GUIDE_STEPS.CLICK_ICON){
        //     this.guid_FristEnter.zIndex=10000;
        //     this.guid_FristEnter.active=true;
        //     this.guid_FristEnter.setContentSize(rect_light.width+40,rect_light.height+40);
        //     this.guid_FristEnter.setPosition(rect_light.x-20,rect_light.y-20);
        //     rect_click.y+=50;
        //     rect_click.height-=50;
        //     //NewGuideHelper.getInstance().updateClickRect(rect_click)
        //     cc.error("rect_light",rect_light)
        //     //显示引导动画
        //     let skeleton=this.guid_FristEnter.getChildByName("anim").getComponent(sp.Skeleton);
        //     skeleton.node.y=rect_light.height+200;
        //     skeleton.setCompleteListener(()=>{
        //         skeleton.setAnimation(0,"xunhuan",true);
        //     })

        //     //更新手指的位置，这里要适配下
        //     let x=rect_light.x+150
        //     let y=rect_light.y+rect_light.height-150;
        //     NewGuideHelper.getInstance().updateFingerPos(cc.v2(x,y))

        // }else if(stepId==GUIDE_STEPS.CLICK_ROOMLIST){
        //     this.guid_RoomList.setPosition(rect_light.origin);
        //     this.guid_RoomList.zIndex=10000;
        //     this.guid_RoomList.active=true;
        // }
    }

    _onGuideEnd(stepId:number){
        // if(stepId==FristEnterRoomStep.CLICKICON){
        //     this.guid_FristEnter.active=false;
        //     saveGuidData(GUIDE_STEPS.CLICK_RECORD_MORESTAKES);
        //     //this._guide.close();
        // }else if(stepId==GUIDE_STEPS.CLICK_ROOMLIST){
        //     this.guid_RoomList.active=false;
        //     saveGuidData(GUIDE_STEPS.CLICK_RECORD_WINTIP);
        // }    
    }

    onBindTicketClick(){
        if(App.isCheck)return
        App.DlgManager.showDlg("balance",BalanceType.TICKET);
    }

    onBindCashClick(){
        if(App.isCheck)return
        App.DlgManager.showDlg("balance",BalanceType.CASH);
    }    

    onEnable(){
        cc.error(">>>>>onEnable hall");
        App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/bgm1",true);
        
    }
}

