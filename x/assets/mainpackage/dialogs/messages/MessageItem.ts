// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatDate } from "../../gameHelper/AthHelper";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageItem extends ListItem {

    UIBindData={
        title:"",
        message:"",
        time:"",
        statu:null,
    }

    private info:any

    @property(cc.SpriteFrame)
    img_statu0: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    img_statu1: cc.SpriteFrame = null;

    @property(cc.Node)
    img_red:cc.Node = null;

    setData(index:number,data?:any){
        this.info = data;
        this.UIBindData.title = data.title;
        this.UIBindData.time = formatDate(data.time * 1000);
        if (data.content.length > 70) {
            this.UIBindData.message = data.content.substr(0,70) + "...";
        }
        else{
            this.UIBindData.message = data.content;
        }
        this.UIBindData.statu.spriteFrame=this["img_statu"+data.status];
        this.img_red.active = data.status == 0;
    }

    onMessageClick(){
        /*
        if (this.info.Status != 2) {
            App.HttpManager.post("notice/ReadOne",{ID:this.info.ID},"POST",this.node,(data)=>{
                this.flushItemData(2);
            });
        }
        App.DlgManager.showDlg("messagecontent",this.info);*/
        
    }

    flushItemData(statu:number = 1){
        this.info.status = statu;
        this.UIBindData.statu.spriteFrame=this["img_statu"+this.info.status];
        this.img_red.active = this.info.status == 0;
    }
}
