// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { core } from "../../../gamecore/net/protos/proto";
import { BaseComponent } from "../../../gamecore/ui/baseview/imp/BaseComponent";
import { AppStatusEnum, CHIP_TYPES, CONSTANTS } from "../../GameConfig";
import {formatCurrency, formatDate, formatDateWithDate, fromatChip, fromatTime, getHead } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export  class Notice extends cc.Component {

    @property(cc.Sprite)
    noticeHead:cc.Sprite;

    @property(cc.RichText)
    content:cc.RichText;

    @property(cc.Sprite)
    country:cc.Sprite;

    @property(cc.Label)
    time:cc.Label;

    onLoad(){
        this.node.active=false;
    }

    showNotice(msg:core.CompetitionBroadcast){
        getHead(msg.avatar,this.noticeHead);
        let rewards=msg.rewards;
        let rewardStr="";
        rewards.forEach((reward,index)=>{
            if (reward.prop_type==core.PropType.PROP_TYPE_TICKET) {
                rewardStr+=`<color=#FF9E06>${App.LangManager.getTxtByKey("currency")}${fromatChip(reward.amount)}</color>`;
            }else{
                rewardStr+=`<color=#FF9E06>${App.LangManager.getTxtByKey("currency")}${formatCurrency(reward.amount)}</color>`;
            }  
            if(index!=rewards.length-1){
                rewardStr+=" + ";
            }
        })
        
        this.content.string=App.LangManager.getTxtByKey("notice_match",[msg.nick.substr(0,8),rewardStr,msg.game_name]);
        this.time.string=formatDateWithDate(msg.time*1000);

        this.node.y=-this.node.height/2;
        this.node.opacity=255;
        this.node.active=true;
        let targetY=this.node.height/2;
        
        if(App.DlgManager.isEmptyDlg()&&App.DataManager.getExtInfo(CONSTANTS.APP_STATUS)==AppStatusEnum.HALL){
           targetY+=100; 
        }

        this.country.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(msg.area_code || "US");

        cc.tween(this.node).to(0.2,{y:targetY}).delay(5).to(0.2,{opacity:0}).call(node=>{node.active=false;}).start();

    }
}
