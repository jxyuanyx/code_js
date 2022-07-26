// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { Package } from "../../gamecore/net/Package";
import { BaseScene } from "../../gamecore/ui/baseview/imp/BaseScene";
import { Game107Proto, LUDO_COMMON_RESP_CMDS } from "../net/Game107Proto";
import { core, ludo } from "../net/protos/ludo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game107Welcome extends BaseScene {
    
    afterEnter(){
        App.DlgManager.hideDlg("match","game107");
        if(App.DataManager.getGameData().isReconnect){
            App.Net.addProto(new Game107Proto());
        }
    }

    _initCommonResource(){
        let paths=[
            "plist/common"
        ]
        App.BundleManager.loadBundleCommonAtlas("game107",paths,null,()=>{
            this.scheduleOnce(async ()=>{
                //走重连
                if(App.DataManager.getGameData().isReconnect){
                    App.Net.flushingUI=false;
                    Game107Proto.sendReconnect();
                }else{
                    await App.SceneManager.loadSceneAsync("main","game107",true)
                }
            },App.DataManager.getGameData().isReconnect?0:1)
        })
    }
    
    onMessage(pkg:Package){
        switch(pkg.cmd){
            case LUDO_COMMON_RESP_CMDS.RECONNECT:
                this._reconnectSuccess(pkg.body)
                break;
        }
    }

    _reconnectSuccess(pkg:ludo.LudoReconnectRsp){
        let gameData=App.DataManager.getGameData();
        gameData.tableId=pkg.uuid;
        gameData.newGame=true;
        if(pkg.match_status==core.MatchStatus.STATUS_MATCHING){
            App.DlgManager.showDlg("match","","game107");
            return;
        }
        App.DataManager.setGameInitInfo(pkg);
        App.SceneManager.loadSceneAsync("main","game107",true)
    }

    // update (dt) {}
}
