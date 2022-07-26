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
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { core } from "../../../gamecore/net/protos/proto";
import MatchPlayer from "../../../mainpackage/dialogs/match/MatchPlayer";
import { formatCurrency, fromatChip, getGameInfoByRoomType, getRandomMockUsers } from "../../../mainpackage/gameHelper/AthHelper";
import { CommonProto, COMMON_RESP_CMDS } from "../../../mainpackage/net/CommonProto";
import { GUIDE_STEPS } from "../../../mainpackage/hall/guid/HallGuideConfig";
import { AppStatusEnum, CHIP_TYPES, CONSTANTS, SCREEN_DIRECTION } from "../../../mainpackage/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MatchCheck extends BaseDlg {
    @property([cc.SpriteFrame])
    img_matchtype:cc.SpriteFrame[] = [];

    showMode=DlgEnum.FADE;

    @property(sp.Skeleton)
    vsAnim:sp.Skeleton=null;

    @property(sp.Skeleton)
    anim:sp.Skeleton=null;

    @property(cc.Sprite)
    matchTypeIcon:cc.Sprite=null;
    

    @property(cc.Sprite)
    enterTypeIcon:cc.Sprite=null;

    @property(cc.Node)
    infoView:cc.Node=null;

    @property([MatchPlayer])
    players:MatchPlayer[]=[];

    @property(cc.Node)
    findTipView:cc.Node=null;

    @property(cc.Node)
    rewardView:cc.Node=null;

    @property(cc.Node)
    maskCancelNode:cc.Node=null;

    private _updateHandler:Function=null;

    private _itemInstance:cc.Node=null;
    private _time = 0;

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
        //this.UI_BTNS.get("close").getComponent(cc.Button).interactable=false;
        this.findTipView.active=false;
        this._itemInstance=this.rewardView.children[0];
    }


    beforeShow(){
        cc.game.on(GameEvents.NET_MESSAGE,this.onMessage,this);

        this.UIBindData.contentTitle=App.LangManager.getTxtByKey("matchList_title",[this._data.match_name,this._data.match_limit_num]);
        this.UIBindData.chips=App.LangManager.getTxtByKey("currency")+formatCurrency(this._data.match_pool_type[0][1]);
        this.UIBindData.point=formatCurrency(this._data.match_reward_rank_point);
        this.UIBindData.enterPrice=((this._data.match_entry_value==0)?App.LangManager.getTxtByKey("matchList_free"):formatCurrency(this._data.match_entry_value));
        this.UIBindData.playerCount=App.LangManager.getTxtByKey("matchPlayerCount",[this._data.match_limit_num]);

        // this.matchTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_"+this._data.match_lv_res);
        if (this._data.match_entry_type == 1) {
            this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods1");
        }
        else{
            this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods0");
        }
        
        this.enterTypeIcon.node.active=this._data.match_entry_value>0;
        
        this.anim.node.active=false;

        this.infoView.active=false;

    }


    onMessage(pkg:Package){
        
        switch(pkg.cmd){
            case COMMON_RESP_CMDS.CMD_EVT_MATCH_NOTIFY:
                this.onMatchNotify(pkg.body);
                break;
            case COMMON_RESP_CMDS.CMD_SOLITAIRE_MATCH:
                this.onMatchResp(pkg.body);
                break;
        }
    }

    /*
    onCancelMatch(body:pb.CancelMatchResp){
        this._showInfoView(false,()=>{
            this.hide();
        })
    }*/

    onMatchResp(body:core.JoinMatchRsp){
        this.setLeftTime(1);
        this.startTimer();
       if(App.DataManager.getSelfData().progress!=GUIDE_STEPS.CLICK_RECORD_MORESTAKES){
            this.maskCancelNode.active=false;
       }
       App.NativeManager.echo("onMatchResp success");
    }

    onMatchNotify(body:core.EvtMatchNotify){
        App.NativeManager.echo("onMatchNotify:"+body.match_status+" room_type:"+App.DataManager.getGameData().room_type);
        if(body.match_status==core.MatchStatus.STATUS_FINISHED){
            App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.MATCHED);
            this.stopTimer();
            //this.UI_BTNS.get("close").getComponent(cc.Button).interactable=false;
            this.maskCancelNode.active=true;
            this._stopUpdateMatchInfo();
            let list=body.match_info.list.filter(item=>item.uid!=App.DataManager.getSelfData().uid);
            if(list.length>0){
                this.players[1].setData(list[0]);
            }else{
                this.players[1].node.active=false;
                this.findTipView.active=true;
                this.findTipView.setPosition(this.players[1].node.getPosition());
                cc.tween(this.findTipView).to(0.2,{opacity:255}).start();
            }

            App.DataManager.getGameData().tableId=body.uuid;
            App.DataManager.getGameData().newGame=true;
            App.DataManager.setGameInitInfo(body);
            App.Net.updateRoomInfo(body.desk_id,body.room_id);

            let gameData=App.DataManager.getGameData();
            gameData.tableData=body;
            gameData.gameToken=body.match_info.token;
            App.AudioManager.stopBgm();
            App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/matchsound2");
            this.anim.setAnimation(0,"chenggong",false);
            if(gameData.screensType==SCREEN_DIRECTION.TYPE_L){
                App.DlgManager.showDlg("changedirection",SCREEN_DIRECTION.TYPE_L);
            }
            this.anim.setCompleteListener(()=>{
                App.DlgManager.hideDlg("changedirection");
                let data=App.DataManager.getGameData();
                App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.GAMEING);
                if(data.isUnity){
                    data.isInGame=true;
                    this.hide();
                    App.NativeManager.enterUnityGame(data.gameName);
                    return;
                }else{
                    App.BundleManager.loadSubGame(gameData.packageName,()=>{
                        App.SceneManager.loadScene("welcome",gameData.packageName,()=>{
                            gameData.isInGame=true;
                            App.DlgManager.clearAllDlgs();
                        });
                    })
                }
            })
            
            this.schedule(()=>{
                App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/countdown");
            },1,2,2)
        }
    }

    _updateMatchInfo(){
        let index=0;
        let MatchBoots=getRandomMockUsers();
        this._updateHandler=()=>{
            let player=MatchBoots[index++];
            this.players[1].setData(player);
            if(index>=MatchBoots.length){
                index=0;
            }
        }
        this.schedule(this._updateHandler,0.1)
    }

    _stopUpdateMatchInfo(){
        this.unschedule(this._updateHandler);
    }


    afterShow(){
        let gameData=getGameInfoByRoomType(this._data.room_type);
        App.DataManager.setGameData(gameData);
        App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.MATCHING);
        /**
         * 显示用户信息
         */
        this.players[0].setData(App.DataManager.getSelfData());
        cc.tween(this.players[0].node).to(0.5,{opacity:255}).start();
        cc.tween(this.players[1].node).to(0.5,{opacity:255}).start();
        this._updateMatchInfo();
        
        this._showInfoView(true,()=>{
            this.anim.node.active=true;
            this.anim.node.opacity=0;
            this.anim.node.runAction(cc.sequence(
                cc.fadeIn(0.5),
                cc.callFunc(()=>{
                    CommonProto.sendMatch(this._data.room_id,this._data.room_type);
                })
            ));
        });

        let data=this._data;
        if(data.match_pool_type){
            this.rewardView.removeAllChildren();
            for(let i=0;i<data.match_pool_type.length;i++){
                let rewardInfo=data.match_pool_type[i];
                let view=cc.instantiate(this._itemInstance);
                let type = rewardInfo[0];
                view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+type);
                view.getChildByName("count").getComponent(cc.Label).string=(type==CHIP_TYPES.SEASON_SCORE)?fromatChip(rewardInfo[1] || 0):formatCurrency(rewardInfo[1]);
                view.getChildByName("addicon").active=(i!=data.match_pool_type.length-1);
                this.rewardView.addChild(view);
                if(type==CHIP_TYPES.SEASON_SCORE){
                    view.scale=0.7;
                }
            }
            this.rewardView.active=true;
        }else{
            this.rewardView.active=false;
        }

        App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/matchsound1",true);

        if(App.DataManager.getSelfData().progress==GUIDE_STEPS.CLICK_RECORD_MORESTAKES){
           // this.UI_BTNS.get("close").getComponent(cc.Button).enabled=false;
           this.maskCancelNode.active=true;
        }
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

    onDisable(){
        this.stopTimer();
    }

    onDestroy(){
        cc.game.off(GameEvents.NET_MESSAGE,this.onMessage,this);
    }

    onCloseClick(){
        App.AudioManager.playBGM(App.BundleManager.defaultBundle,"sounds/bgm1",true);
        CommonProto.cancelMatch();
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
