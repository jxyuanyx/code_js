// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { BaseScene } from "../../gamecore/ui/baseview/imp/BaseScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game100Welcome extends BaseScene {
    
    afterEnter(){
        //发送进入桌子命令
        //App.Net.addProto(new Game100Proto());
    }

    _initCommonResource(){
        let paths=[
            "plist/poker"
        ]
        App.BundleManager.loadBundleCommonAtlas("game100",paths,null,()=>{
            this.scheduleOnce(()=>{
                if(App.DataManager.getGameData().isRecord){
                    App.SceneManager.loadScene("mainOfflineRecord","game100")
                }else{
                    App.SceneManager.loadScene("mainOffline","game100")
                }
                //Game100Proto.joinRoom();
            },1)
        })
    }
    /*
    onMessage(pkg:Package){
        switch(pkg.cmd){
            case Game100_RESP_CMDS.JOINROOMRESP:
                App.DataManager.getGameData().tableData=pkg.body;
                App.SceneManager.loadScene("mainOffline","game100")
                break;
        }
    }*/

    // update (dt) {}
}
