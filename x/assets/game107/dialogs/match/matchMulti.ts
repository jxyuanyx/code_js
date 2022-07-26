// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { Package } from "../../../gamecore/net/Package";
import { core } from "../../../gamecore/net/protos/proto";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { AppStatusEnum, CHIP_TYPES, CONSTANTS } from "../../../mainpackage/GameConfig";
import { formatCurrency, fromatChip } from "../../../mainpackage/gameHelper/AthHelper";
import { GUIDE_STEPS } from "../../../mainpackage/hall/guid/HallGuideConfig";
import { CommonProto, COMMON_RESP_CMDS } from "../../../mainpackage/net/CommonProto";
import { Game107Proto, LUDO_COMMON_RESP_CMDS } from "../../net/Game107Proto";
import { ludo } from "../../net/protos/ludo";
import MatchPlayerMulti from "./MatchPlayerMulti";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MatchNulti extends BaseDlg {
    showMode=DlgEnum.FADE;
    hideTime=0.5;

    @property(ListView)
    listView:ListView<any>=null;

  
    @property(sp.Skeleton)
    anim:sp.Skeleton=null;

    @property(cc.Sprite)
    matchTypeIcon:cc.Sprite=null;
    

    @property(cc.Sprite)
    enterTypeIcon:cc.Sprite=null;

    @property(cc.Node)
    infoView:cc.Node=null;

    @property(cc.Node)
    rewardView:cc.Node=null;

    @property(cc.Node)
    maskCancelNode:cc.Node=null;

    @property(MatchPlayerMulti)
    selfPlayer:MatchPlayerMulti=null;

    private _adapter:ListAdapter=null;
    private _time = 0;
    
    private _itemInstance:cc.Node=null;

    UIBindData={
        contentTitle:"",
        chips:"",
        point:"",
        enterPrice:"",
        playerCount:"",
        time:""
    }

    onLoad(){
        super.onLoad();

        this.UI_BTNS.get("close").getComponent(cc.Button).interactable=false;

        this._itemInstance=this.rewardView.children[0];

        this.maskCancelNode.active=false;

         //发送进入桌子命令
         App.Net.addProto(new Game107Proto());

         App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.MATCHING);

    }

    beforeShow(){
        cc.game.on(GameEvents.NET_MESSAGE,this.onMessage,this);
        /*
        this.infoView.active=false;

        this.UIBindData.contentTitle=App.LangManager.getTxtByKey("matchList_title",[this._data.match_name,this._data.max_cmp_num]);
        this.UIBindData.chips=App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.prize_pool);
        this.UIBindData.point=formatCurrency(this._data.season_score);
        this.UIBindData.enterPrice=((this._data.entry_price==0)?App.LangManager.getTxtByKey("matchList_free"):formatCurrency(this._data.entry_price));
        this.UIBindData.playerCount=App.LangManager.getTxtByKey("matchPlayerCount",[this._data.max_cmp_num]);

        this.matchTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("matchType_"+this._data.prize_pool_type);
        this.rewardIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("matchType_"+this._data.prize_pool_type);
        this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("matchType_"+this._data.price_type);
        this.enterTypeIcon.node.active=this._data.entry_price>0;
        
        this.anim.node.active=false;*/

        if(this._data){
            this.UIBindData.contentTitle=App.LangManager.getTxtByKey("matchList_title",[this._data.match_name,this._data.match_limit_num]);
            this.UIBindData.chips=App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.match_pool_type[0][1]);
            this.UIBindData.point=formatCurrency(this._data.match_reward_rank_point);
            this.UIBindData.enterPrice=((this._data.match_entry_value==0)?App.LangManager.getTxtByKey("matchList_free"):formatCurrency(this._data.match_entry_value));
            this.UIBindData.playerCount=App.LangManager.getTxtByKey("matchPlayerCount",[this._data.match_limit_num]);
    
            this.matchTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_"+this._data.match_lv_res);
            this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+this._data.match_entry_type);
            this.enterTypeIcon.node.active=this._data.match_entry_value>0;
        }else{
            this.maskCancelNode.active=false;
        }

      
        
        this.anim.node.active=false;

        this.infoView.active=false;

    }

    onDisable(){
        this.stopTimer();
    }

    onMessage(pkg:Package){
        switch(pkg.cmd){
            case COMMON_RESP_CMDS.CMD_SOLITAIRE_MATCH:
                this.onMatchResp(pkg.body);
                break;
            case LUDO_COMMON_RESP_CMDS.EvtLudoMatchNotify:
                this.onMatchNotify(pkg.body);
                break;
            case LUDO_COMMON_RESP_CMDS.CancelMatch:
                this.onCancelMatch(pkg.body);
                break;
        }
    }

    onCancelMatch(body:core.CancelMatchRsp){
        this._showInfoView(false,()=>{
            if(App.SceneManager.currentSceneName()!="hall"){
                App.SceneManager.backHall();
            }
            this.hide();
        })
    }

    onMatchResp(body:core.JoinMatchRsp){
        this.setLeftTime(1);
        this.startTimer();
        /*
       if(App.DataManager.getSelfData().progress!=GUIDE_STEPS.CLICK_RECORD_MORESTAKES){
            this.maskCancelNode.active=false;
       }*/
       App.NativeManager.echo("onMatchResp success");
    }

    onMatchNotify(body:ludo.EvtLudoMatchNotify){
        this.flushPlayList(body.match_info.list);
        App.Net.updateRoomInfo(body.desk_id,body.room_id);
        if(body.match_status==core.MatchStatus.STATUS_FINISHED){
            this.UI_BTNS.get("close").getComponent(cc.Button).interactable=false;
            App.DataManager.getGameData().tableId=body.uuid;
            App.DataManager.getGameData().newGame=true;
            App.DataManager.setGameInitInfo(body);
            this._showSuccessView();
        }
    }

    _showSuccessView(){
        this.stopTimer();
        App.AudioManager.stopBgm();
        App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/matchsound2");
        this.anim.setAnimation(0,"chenggong",false);
        App.Net.flushingUI=true;
        this.anim.setCompleteListener(()=>{
            let data=App.DataManager.getGameData();
            App.SceneManager.loadScene("welcome",data.packageName,()=>{
                //App.DataManager.getGameData().isInGame=true;
                App.DlgManager.clearAllDlgs();
            },true);
        })

        this.schedule(()=>{
            App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/countdown");
        },1,2,2)
    }


    afterShow(){
        
        this._adapter=new ListAdapter([]);
        this.listView.setAdapter(this._adapter);
        if(this._data){

        }
        Game107Proto.sendMatch(this._data.room_id,this._data.room_type);

        this._showInfoView(true,()=>{
            this.anim.node.active=true;
            this.anim.node.opacity=0;
            this.anim.node.runAction(cc.sequence(
                cc.fadeIn(0.5),
                cc.callFunc(()=>{
                    this.setLeftTime(0);
                    this.startTimer();
                })
            ));
        });


        let data=this._data;
        if (App.isCheck) {
            this.UI_LBS.get("contentSubTitle").active = false;
            this.rewardView.active = false;
        }
        else {
            if (data.match_pool_type) {
                this.rewardView.removeAllChildren();
                for (let i = 0; i < data.match_pool_type.length; i++) {
                    let rewardInfo = data.match_pool_type[i];
                    let view = cc.instantiate(this._itemInstance);
                    let type = rewardInfo[0];
                    view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_" + type);
                    view.getChildByName("count").getComponent(cc.Label).string = (type == CHIP_TYPES.SEASON_SCORE) ? fromatChip(rewardInfo[1] || 0) : formatCurrency(rewardInfo[1]);
                    view.getChildByName("addicon").active = (i != data.match_pool_type.length - 1);
                    this.rewardView.addChild(view);
                    if (type == CHIP_TYPES.SEASON_SCORE) {
                        view.scale = 0.7;
                    }
                }
                this.rewardView.active = true;
            } else {
                this.rewardView.active = false;
            }
        }

        App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/matchsound1",true);

        /*
        if(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_RECORD_MORESTAKES){
           this.maskCancelNode.active=true;
        }*/

        this.selfPlayer.setData(0,App.DataManager.getSelfData())
    }

    _showInfoView(val:boolean,cb?:Function){
        if(val){
            this.infoView.active=true;
            this.infoView.y=-cc.winSize.height/2-this.infoView.height/2;
            this.infoView.runAction(
                cc.sequence(
                    cc.moveTo(0.3,0,-cc.winSize.height/2+this.infoView.height/2-GameHelper.getWinOffsetY()+10),
                    cc.callFunc(()=>{
                        cb&&cb();
                    })
                ))
        }else{
            this.infoView.y=-cc.winSize.height/2+this.infoView.height/2;
            this.infoView.runAction(
            cc.sequence(
                cc.moveTo(0.2,0,-cc.winSize.height/2-this.infoView.height/2),
                cc.callFunc(()=>{
                    cb&&cb();
                })
            ))
        }
    }

    flushPlayList(list:core.IMatchPlayerData[]){
        list=list.concat();
        list.forEach((player,index)=>{
            if(player.uid==App.DataManager.getSelfData().uid){
                list.splice(index,1);
            }
        })
        this._adapter.setDataSet(list);
        this.listView.notifyUpdate();
    }

    onDestroy(){
        cc.game.off(GameEvents.NET_MESSAGE,this.onMessage,this);
    }

    onCloseClick(){
        if(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_RECORD_MORESTAKES){
            return;
        }
        App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/bgm1",true);
        Game107Proto.sendCancel();
    }

    setLeftTime(time:number){
        this._time=time;
        this.UIBindData.time=String(this._time);
    }

    startTimer(){
        this.unschedule(this._updateTime);
        this.schedule(this._updateTime,1)
        this.UI_LBS.get("time").active = true;
    }

    stopTimer(){
        this.unschedule(this._updateTime);
        this.UI_LBS.get("time").active = false;
    }

    _updateTime(){
        this._time++;
        this.UIBindData.time=String(this._time);
    }

}
