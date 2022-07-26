// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../gamecore/App";
import { Package } from "../../gamecore/net/Package";
import { BaseScene } from "../../gamecore/ui/baseview/imp/BaseScene";
import { Game101Proto, Game101_RESP_CMDS } from "../net/Game101Proto";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game101Welcome extends BaseScene {
    
    afterEnter(){
        //发送进入桌子命令
        App.Net.addProto(new Game101Proto());        
    }

    _initCommonResource(){
        let paths=[
            "plist/poker"
        ]
        App.BundleManager.loadBundleCommonAtlas("game101",paths,null,()=>{
            // Game101Proto.joinRoomReq();
        })
    }

    onMessage(pkg:Package){
        // switch(pkg.cmd){
        //     case Game101_RESP_CMDS.JOINROOMRESP:
        //         App.DataManager.getGameData().tableData=pkg.body;
        //         App.SceneManager.loadScene("main","game101")
        //         break;
        // }
    }

}
