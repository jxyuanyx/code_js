// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, fromatChip } from "../../gameHelper/AthHelper";
import { RedTipService, REDTIP_MODULE } from "../../services/RedTipService";
import { ACHIEVEEVENT } from "./AchieveDlg";

const {ccclass, property} = cc._decorator;

const COLOR = [
    cc.Color.WHITE.fromHEX("#24215E"),
    cc.Color.WHITE.fromHEX("#3E36AD"),
    cc.Color.WHITE.fromHEX("#CC2600")
];


@ccclass
export default class AchTaskItem extends ListItem {
    UIBindData={
        icon:null,
        title:"",
        subTitle:"",
        rewardContent:"",
        progress:"",
        receive:"",
        receivebg:null
    }

    @property([cc.SpriteFrame])
    status:cc.SpriteFrame[]=[];

    setData(index:number,data?:any){
        //let achInfo=App.DataManager.getExtInfo(DataConfig.ACHIEVEMENT)[data.AchiID];
        super.setData(index,data);

        this.UIBindData.title=data.achievement_name || "";
        this.UIBindData.subTitle=data.achievement_des.length>45?data.achievement_des.substr(0,45)+"...":data.achievement_des;
        if (data.achievement_coversion == 1) {
            this.UIBindData.progress=formatCurrency(Math.min(data.achievement_schedule || 0,data.achievement_value))+"/"+formatCurrency(data.achievement_value);
        }
        else{
            this.UIBindData.progress=fromatChip(Math.min(data.achievement_schedule || 0,data.achievement_value))+"/"+fromatChip(data.achievement_value);
        }

        if(data.achievement_reward_type==GoodsEnum.CASH || data.achievement_reward_type==GoodsEnum.BONUSCASH){
            this.UIBindData.rewardContent=App.LangManager.getTxtByKey("currency")+formatCurrency(data.achievement_reward_value);
        }else{
            this.UIBindData.rewardContent=data.achievement_reward_value;
        }
        
        if (data.achievement_schedule>=data.achievement_value) {
            this.UI_LBS.get("progress").color = new cc.Color(0,166,119,255);
        }
        else{
            this.UI_LBS.get("progress").color = new cc.Color(254,47,13,255);
        }

        this._setState(data.achievement_status || 0);
        this.UIBindData.icon=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(data.achievement_icon);
    }

    _setState(state:number){
        this.UIBindData.receivebg= this.status[state];
        this.UI_LBS.get("receive").color = COLOR[state];
        this.UIBindData.receive = App.LangManager.getTxtByKey((state==0)?"received":"receive");
        this.UI_BTNS.get("receive").getComponent(cc.Button).interactable=(state==2)
    }

    async onReceiveClick(){
        let task=this._data;
        let prize="<color=#D5E3FF>%s</color> X <color=#1CDF18>%s</color>";
        let prizeName=App.LangManager.getTxtByKey("prizeName")[task.achievement_reward_type];
        if (task.achievement_reward_type == GoodsEnum.DIAMOND) {
            prize=cc.js.formatStr(prize,prizeName,task.achievement_reward_value);
        }
        else{
            prize=cc.js.formatStr(prize,prizeName,formatCurrency(task.achievement_reward_value));
        }
        let data=await App.HttpManager.postAsync("achievement_api/accomplish_achievement",{achievement_id:task.achievement_id});
        //清红点
        RedTipService.getInstance().updateRedTipStatus(REDTIP_MODULE.MENU_ACH,-1);

        App.DlgManager.showDlg("toast",{title:"Congratulations",content:prize});
        this._data.achievement_status=0;
        this._setState(0);
        if(data?.post_achievement?.length){
            this.scheduleOnce(()=>{
                let newData=data.post_achievement[0];
                let oldView=cc.instantiate(this.node);
                oldView.x=this.node.x;
                oldView.y=this.node.y;
                this.node.parent.addChild(oldView);
                this.node.x=this.node.parent.width/2+this.node.width/2;
                this.setData(this._index,newData)
                cc.tween(oldView).to(0.2,{x:-this.node.parent.width/2-this.node.width/2}).removeSelf().start();
                cc.tween(this.node).to(0.2,{x:0}).start();
                Object.assign(this._data,newData);
            },0.2)
        }else{
            cc.game.emit(ACHIEVEEVENT,this._data,this._index);
        }
    }
    
}
