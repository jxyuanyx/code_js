// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { SelfData } from "../../../../gamecore/models/SelfData";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { getHead } from "../../../gameHelper/AthHelper";



const {ccclass, property} = cc._decorator;

@ccclass
export default class InfoItem extends BaseComponent {

    UIBindData={
        uid:"",// uid
        nick:"", // 昵称
        head:null, // 头像
        signature:"", //个性签名
        flag:null //国籍
    }

    flushUserInfo(data:SelfData){
        let selfData=App.DataManager.getSelfData();
        this.UIBindData.uid="UID:"+selfData.uid;
        if (selfData.nick.length > 13) {
            this.UIBindData.nick=selfData.nick.substr(0,13)+"...";
        }
        else{
            this.UIBindData.nick=selfData.nick;
        }
        
        this.UIBindData.signature=selfData.signature;
        getHead(selfData.avatar,this.UIBindData.head);
        this.UIBindData.flag.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(selfData.area_code);
    }

}
