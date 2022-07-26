// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { AccountType } from "../../../gamecore/models/AccountData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { CONSTANTS, GameConfig, WITHDRAWDATA } from "../../GameConfig";
import { getHead } from "../../gameHelper/AthHelper";
import WeakGuid, { WEAKTYPE } from "../../hall/guid/weakguid/WeakGuid";
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../services/RedTipService";
import { SAVEACCOUNT_OTHERINFO, SAVEACCOUNT_UPINFO } from "../cashaccount/CashAccount";
import { ComDlgData } from "../comdlg/ComDlg";
import { SHOWWITHDRAW } from "../withDraw/WithDraw";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends BaseDlg {
    showMode=DlgEnum.DOCK_RIGHT;

    @property(cc.Node)
    redTip_ach:cc.Node=null;

    @property(cc.Node)
    redTip_message:cc.Node=null;

    @property(cc.Prefab)
    weakguide:cc.Prefab = null;

    UIBindData={
        nick:"", // 昵称
        head:null, // 头像
        flag:null, //国籍
        country:null,
        version:""
    }

    onLoad(){
        super.onLoad();
        let accountType=App.DataManager.getSelfData().account_type;
        if(accountType==AccountType.FACEBOOK || accountType==AccountType.GOOGLE){
            this.UI_BTNS.get("saveaccount").active=false;
        }else{
            this.UI_BTNS.get("saveaccount").active=true;
        }

        this._addEvent();
        //this._setWeakGuid();
    }

    beforeShow(){
        super.beforeShow();
        this.redTip_ach.active=false;
        this.redTip_message.active=false;
        cc.game.on(EVENT_REDTIP,this._udpateRedTip,this);
        this._setWeakGuid();
    }

    _udpateRedTip(key:number,num:number){
        if(key==REDTIP_MODULE.MENU_ACH){
            RedTipService.getInstance().activeRedTip(this.redTip_ach,REDTIP_MODULE.MENU_ACH);
        }else if(key==REDTIP_MODULE.MENU_MESSAGE){
            RedTipService.getInstance().activeRedTip(this.redTip_message,REDTIP_MODULE.MENU_MESSAGE);
        }else if(key==REDTIP_MODULE.ANNOUNCEMENT){
            RedTipService.getInstance().activeRedTip(this.redTip_message,REDTIP_MODULE.ANNOUNCEMENT);
        }
    }

    afterShow(){
        this.flushInfo();
        RedTipService.getInstance().activeRedTip(this.redTip_ach,REDTIP_MODULE.MENU_ACH);
        RedTipService.getInstance().activeRedTip(this.redTip_message,REDTIP_MODULE.MENU_MESSAGE,REDTIP_MODULE.ANNOUNCEMENT);

        this.UIBindData.version="version:"+App.NativeManager.getAppVersionCode()+"_"+cc.sys.localStorage.getItem("main_version");
    }

    _addEvent(){
        cc.game.on(SHOWWITHDRAW,this._setWeakGuid,this);
        cc.game.on(GameEvents.FLUSH_SELFDATA,this.updateData,this);
    }

    afterHide(){
        cc.game.off(GameEvents.FLUSH_SELFDATA,this.updateData,this);
    }

    setWeakGuide(isShow:boolean =false){
        let node=this.UI_BTNS.get("withdrawal");

        let child = node.getChildByName("node_weakguide");
        if (child) {
            child.removeFromParent();
            child.destroy();
        }

        if (!isShow) {
            return;
        }
        let weak = cc.instantiate(this.weakguide);
        weak.getComponent(WeakGuid).setData(node,WEAKTYPE.anim);
    }

    _setWeakGuid(){
        let isShow = cc.sys.localStorage.getItem(WITHDRAWDATA.SHOWWITHDRAW)||0;
        let minWithdraw = cc.sys.localStorage.getItem(WITHDRAWDATA.MINWITHDRAW||10000);
        let cash = App.DataManager.getSelfData().gold_withdraw;
        if (cash >= Number(minWithdraw) && Number(isShow) == 0) {
            this.setWeakGuide(true);
        }
        else{
            this.setWeakGuide(false);
        }
    }

    private flushInfo(){
        let selfData=App.DataManager.getSelfData();
        this.UIBindData.nick=selfData.nick.length > 8?selfData.nick.substr(0,8)+"..":selfData.nick;
        this.UIBindData.nick=selfData.nick;
        getHead(selfData.avatar,this.UIBindData.head);
        this.UIBindData.country.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(selfData.area_code);
        this.UIBindData.flag.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+selfData.seasons.current.rank);
    }

    updateData(){
        this.flushInfo();
    }

    onBalanceClick(){
        App.DlgManager.showDlg("balance");
    }

    onWithdrawalClick(){
        App.DlgManager.showDlg("withDraw");
        /*
        let info=cc.sys.localStorage.getItem(SAVEACCOUNT_UPINFO) || cc.sys.localStorage.getItem(SAVEACCOUNT_OTHERINFO);
        if(info){
            App.DlgManager.showDlg("withDraw");
        }else{
            App.DlgManager.showDlg("cashaccount",{showMain:true});
        }*/
    }

    onSignoutClick(){
        
        let data:ComDlgData = new ComDlgData();
        data.title = App.LangManager.getTxtByKey("signout");
        data.group = [{name:"Cancel",isExit:true,cb:null},{name:"Confirm",isExit:true,cb:()=>{
            cc.game.emit(GameEvents.LOGOUT,true);
            /*
            this.hide();
            
            App.DlgManager.clearAllDlgs();
            App.DataManager.reset();
            RedTipService.getInstance().reset();
            App.NoticeManager.clearAll();
            App.DataManager.setExtInfo("guideData",null);*/
        }}];
        data.txt = "Do you want to log out of the current account？";
        App.DlgManager.showDlg("comdlg",data,"mainpackage");
    }

    onAchievementClick(){
        App.DlgManager.showDlg("achieves");
    }

    onMessagesClick(){
        App.DlgManager.showDlg("messages");
    }

    beforeHide(){
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
    }

    onPlayersupportClick(){
        App.DlgManager.showDlg("faq");
    }

    onLegalClick(){
        App.DlgManager.showDlg("webWin",{title:"privacy policy",url:GameConfig.PRIVACY_POLICY});
    }

    onSaveaccountClick(){
        App.DlgManager.showDlg("saveAccounts");
    }

    onUserInfoClick(){
        App.DlgManager.showDlg("userInfo",null,"mainpackage");
    }

    onSettingClick(){
        this.hide();
        App.DlgManager.showDlg("setting")
    }
}
