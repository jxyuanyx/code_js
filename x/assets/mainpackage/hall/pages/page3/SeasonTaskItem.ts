// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { SEASONPAGE } from "../../../dialogs/seasonTask/SeasonTask";
import { CHIP_TYPES, DataConfig } from "../../../GameConfig";
import { formatCurrency, fromatChip } from "../../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;
const COLOR  = [
    new cc.Color(62,54,173,255),
    new cc.Color(204,38,0,255),
    new cc.Color(27,25,68,255)
]

@ccclass
export default class SeasonTaskItem extends BaseComponent{
    UIBindData={
        title:"",
        progress:"0/0",
        receive:"",
        rewardtype:null
    }

    @property(cc.Node)
    label_receive:cc.Node = null;

    @property(cc.Node)
    progress:cc.Node = null;

    @property([cc.Node])
    status:cc.Node[]=[];

    @property(cc.Node)
    rewardItem:cc.Node=null;

    @property(cc.Node)
    img_reward:cc.Node=null;

    @property(cc.Node)
    rewardContent:cc.Node=null;

    private _data:any;

    setData(data:any){
        this._data=data;
        let task=App.DataManager.getExtInfo(DataConfig.SEASON_TASKS)[data.id];
        this.UIBindData.title=task.desc.length > 25?task.desc.substr(0,25)+"...":task.desc;
        this.UIBindData.progress=Math.min(task.param,data.progress)+"/"+task.param;
        this.progress.getComponent(cc.ProgressBar).progress = Math.min(task.param,data.progress)/task.param;
       
        
        let rewards=[task.reward];
        for(let i=0;i<rewards.length;i++){
            let reward=rewards[i];
            let item=cc.instantiate(this.rewardItem);
            this.rewardContent.addChild(item);
            item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+reward.type);
            item.getChildByName("price").getComponent(cc.Label).string=(reward.type==CHIP_TYPES.SEASON_SCORE)?fromatChip(reward.value):formatCurrency(reward.value);
            this.UIBindData.rewardtype=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("big_goods_"+reward.type);
        }
        this.rewardItem.removeFromParent();
        this.rewardItem.destroy();
        let state=0;
        if(data.progress>=task.param){
            state=data.get?2:1;
        }
        this._setState(state);
    }

    _setState(state:number){
        if (state == 2) {
            this.UIBindData.receive = App.LangManager.getTxtByKey("received");
        }
        else{
            this.UIBindData.receive = App.LangManager.getTxtByKey("receive");
        }
        for(let i=0;i<this.status.length;i++){
            this.status[i].active=false;
        }
        this.status[state].active=true;
        this.img_reward.active = false;
        switch (state) {
            case 0:
                this.label_receive.color = COLOR[0];
                break;
            case 1:
                this.img_reward.active = true;
                this.label_receive.color = COLOR[1];
                break;
            case 2:
                this.label_receive.color = COLOR[2];
                break;
            default:
                break;
        }
    }

    onRewardClick(){
        let task=App.DataManager.getExtInfo(DataConfig.SEASON_TASKS)[this._data.id];
        let prize="<color=#D5E3FF>%s</color> X <color=#1CDF18>%s</color>";
        let prizeName=App.LangManager.getTxtByKey("prizeName")[task.reward.type];
        prize=cc.js.formatStr(prize,prizeName,(task.reward.type!=CHIP_TYPES.SEASON_SCORE)?formatCurrency(task.reward.value):task.reward.value);
        App.HttpManager.get("reward/seasonquest",{questid:this._data.id},this.node,(data:any)=>{
            App.DlgManager.showDlg("toast",{title:"Congratulations",content:prize});
            this._setState(2);
            cc.game.emit(SEASONPAGE);
        })
    }
}
