// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../../gamecore/App";
import ListItem from "../../../../../gamecore/ui/components/common/ListItem";
import { fromatNumber1 } from "../../../../../mainpackage/gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

const COLOR = {
    "game100":new cc.Color(185,252,255,255),
    "game101":new cc.Color(203,190,255,255),
    "game102":new cc.Color(255,255,255,255),
    "game103":new cc.Color(255,255,255,255),
    "game104":new cc.Color(255,178,204,255),
    "game105":new cc.Color(255,255,255,255),
    "game106":new cc.Color(255,255,255,255)
}

const ANIM_CONFIG={
    "game100":"SPIDER",
    "game101":"21BLITZ",
    "game102":"MATCH3D",
    "game103":"GREEDYSNAKE",
    "game104":"BINGO",
    "game105":"FRUITNINJA",
    "game106":"BUBBLESHOOT"
}

@ccclass
export default class gameListItemCheck extends ListItem {
    UIBindData={
        playingCount:"",
        gameicon:null
    }


    onLoad(){
        super.onLoad();
        this.node.scale=1;
        this.node.active=false;
    }

    setData(index:number,data?:any){
        super.setData(index,data);
        this.UIBindData.playingCount=fromatNumber1(data.playingCount);
        this.UIBindData.gameicon = App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame(data.packageName);


        this.node.active=true;
        this.node.opacity=0;
        this.node.scale=1;
        this.node.runAction(
            cc.sequence(
                cc.delayTime(index*0.1),
                cc.fadeIn(0.3)
            )
        );
    }
    
    
}
