// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { GameStatus } from "../../../gamecore/models/GameStatus";
import { Package } from "../../../gamecore/net/Package";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { checkGameStatus, formatCurrency, getGameInfoByRoomType, getRemoteGameStatus } from "../../gameHelper/AthHelper";
import { CommonProto, COMMON_RESP_CMDS } from "../../net/CommonProto";
import { core } from "../../../gamecore/net/protos/proto";
import { ENTER_TYPES } from "../downloadgame/DownloadGame";
import { AppStatusEnum, CONSTANTS } from "../../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MultiPrize extends BaseDlg {
    showMode=DlgEnum.R2L;

    @property(ListView)
    listView:ListView<any>=null;

    @property(cc.Sprite)
    enterIcon:cc.Sprite=null;

    UIBindData={
        enterPrice:""
    }

    onMessage(pkg:Package){
        switch(pkg.cmd){
            case COMMON_RESP_CMDS.CMD_EVT_MATCH_NOTIFY:
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
                App.BundleManager.loadBundle(gameData.packageName,()=>{
                    App.SceneManager.loadScene("welcome",gameData.packageName,()=>{
                        gameData.isInGame=true;
                        App.DlgManager.clearAllDlgs();
                    });
                })
            }
        }
    }

    afterShow(){
        /*
        App.HttpManager.get("matchrewardlist",{matchid:this._data.match_id},this.node,(data:any)=>{
            let adapter=new ListAdapter(data);
            this.listView.setAdapter(adapter);
            this.listView.getScrollView().scrollToTop();
        })*/

        let adapter=new ListAdapter(this._data.reward_list);
        this.listView.setAdapter(adapter);
        this.listView.getScrollView().scrollToTop();
        this.UIBindData.enterPrice=((this._data.match_entry_value==0)?App.LangManager.getTxtByKey("matchList_free"):formatCurrency(this._data.match_entry_value));
        this.enterIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+this._data.match_entry_type);
        this.enterIcon.node.active=this._data.match_entry_value>0;

        this.LANG_LBS.get("multiPrizeTitle").getComponent(cc.Label).string = this._data.match_name;
        // this.LANG_LBS.get("multiPrizeTitle").getComponent(cc.Label).string=App.LangManager.getTxtByKey("multiPrizeTitle",[this._data.match_name,this._data.max_cmp_num]);
        
    }

    async onPlaybtnClick(){
        let gameData=getGameInfoByRoomType(this._data.room_type);
        App.DataManager.setGameData(gameData);
        //检测游戏更新
        //let gameData=App.DataManager.getGameData();
        await getRemoteGameStatus(gameData.gameName);
        if(checkGameStatus(this._data.room_type)!=GameStatus.NORMAL)return

       // this.hide();
        //锦标赛
        if(this._data.server_match_type==2){
            App.DlgManager.showDlg("loading",App.LangManager.getTxtByKey("enterGame"));
            CommonProto.sendMatch(this._data.room_id,this._data.room_type);
        }else{
            
            if (App.isCheck) {
                App.DlgManager.showDlg("match",this._data,App.NativeManager.getFakePackageName()); 
            }
            else{
                App.DlgManager.showDlg("match",this._data);
            }
        }
    }

    beforeShow(){
        cc.game.on(GameEvents.NET_MESSAGE,this.onMessage,this);
    }

    onDestroy(){
        cc.game.off(GameEvents.NET_MESSAGE,this.onMessage,this);
    }
}
