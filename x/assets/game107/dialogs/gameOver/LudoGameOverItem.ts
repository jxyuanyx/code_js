// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import GameHelper from "../../../gamecore/tools/GameHelper";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, getHead } from "../../../mainpackage/gameHelper/AthHelper";
import { ludo } from "../../net/protos/ludo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LudoGameOverItem extends ListItem {

    UIBindData={
        score:"0",
        attackCount:"0",
        beAttackCount:"0",
        win:"0",
        nick:"",
        headBox:null,
        head:null,
        rank:null,
        reward:null
    }

    @property([cc.SpriteFrame])
    rank_frames:cc.SpriteFrame[]=[];


    setData(index: number, data?: ludo.LudoUserOverInfo): void {
        super.setData(index,data);
        this.UIBindData.nick=GameHelper.subStr(data.nick);
        this.UIBindData.score=data.total_score.toString();
        this.UIBindData.attackCount=data.attack.toString();
        this.UIBindData.beAttackCount=data.be_attacked.toString();
        this.UIBindData.rank=this.rank_frames[data.rank-1];
        getHead(data.avatar,this.UIBindData.head);
        this.UIBindData.headBox=App.BundleManager.getCommonAtlas("game107/common").getSpriteFrame("headbox"+(data.seat_id+1));
        let winStr="";
        if(data.win){
            App.NativeManager.echo("LAM_______>" + JSON.stringify(data));
            if (data.rewards[0]) {
                winStr="+"+formatCurrency(data.rewards[0].amount);
                this.UIBindData.reward=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data.rewards[0].prop_type);
            }else{
                winStr="WIN";
                this.UIBindData.reward=null;
            }
            this.UI_LBS.get("win").color=cc.Color.WHITE.fromHEX("#BA3D0C");
        }else{
            winStr=(data.status==ludo.LudoPlayerStatus.PLAYER_STATUS_LEAVE)?"Escape":"Lose";
            this.UI_SPS.get("reward").active=false;
            this.UI_LBS.get("win").color=cc.Color.WHITE.fromHEX("#3D4EAD");
        }
        this.UIBindData.win=winStr;
    }

    
}
