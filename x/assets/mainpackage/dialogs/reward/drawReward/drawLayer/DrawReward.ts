// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../../gamecore/App";
import { RewardEnum } from "../../../../../gamecore/enums/RewardEnum";
import BaseDlg from "../../../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatCurrency, formatDateWithOutTime } from "../../../../gameHelper/AthHelper";
import Barrage from "../../../barrage/Barrage";
import { ComDlgData } from "../../../comdlg/ComDlg";
import { RulesDlgData } from "../../../rules/RulesDlg";

const {ccclass, property} = cc._decorator;
const drawList:string[]=[
    "textures/plist/rewardcardbg"
]
export const DRAWINIT = "drawinit";

export enum REWARDSTATU{
    ALREADY = 0,
    AVAILABLE = 1,
}

export enum CARDNAME{
    "",
    "BRONZE",
    "SILVER",
    "GOLD"
}

@ccclass
export default class DrawReward extends BaseDlg {

    UIBindData={
        activitytime:"",
        diamond:0
    }

    @property([cc.Label])
    label_name:cc.Label[] = [];

    @property([cc.Label])
    label_num:cc.Label[] = [];

    @property(cc.Prefab)
    barrage:cc.Prefab = null;

    private _info:any;

    private _barrageList:any[] = [];

    private _barrageId:number = 0;

    beforeShow(){
        App.BundleManager.loadBundleCommonAtlas(App.BundleManager.defaultBundle,drawList,null,null);
        this._init();
        this._addEvent();
    }

    afterHide() {
        this._removeEvent();
    }

    beforeHide() {
        if (this._barrageId) {
            clearTimeout(this._barrageId);
            this._barrageId=null;
        }
    }

    _removeEvent(){
        cc.game.off(DRAWINIT,this._init,this);
    }

    _addEvent(){
        cc.game.on(DRAWINIT,this._init,this);
    }

    async _init(){

        let data=await App.HttpManager.postAsync("activity_api/display_flip_card_type",{activity_id:RewardEnum.DRAWREWARD})
        this._barrageList = data.barrage_list;
        await this.startBarrage();
        this._info = data;
        // this._onShowTime(data.start_time,data.end_time);//暂时没有时间Label
        this._onShowDiamond(data.diamond);
        this._onShowNum(data.card_types);
        this._onShowName(data.card_types);
    }

    async startBarrage(){
        if(!this._barrageId){
            let msg=this._barrageList.pop();
            if(msg){
                let time = 2;
                this._barrageId=setTimeout(()=>{
                    clearTimeout(this._barrageId);
                    this._barrageId=null;
                    this.startBarrage();
                },time*1000);
                this._playBarrageAnim(msg);
            }
        }
    }

    private _playBarrageAnim(msg){
        let barrage = cc.instantiate(this.barrage);
        this.node.addChild(barrage);
        barrage.getComponent(Barrage).showData(msg);

        let ran = Math.random();
        let x = 500;
        let y = 300 + 300 * ran;
        barrage.position = new cc.Vec3(x,y);

        cc.tween(barrage)
        .to(5,{x:-500})
        .call(()=>{
            barrage.destroy();
        })
        .start()
    }

    private _onShowTime(start:number,end:number){
        this.UIBindData.activitytime = "Activity time:"+formatDateWithOutTime(start*1000,"MM-DD") +" - "+ formatDateWithOutTime(end*1000,"MM-DD");
    }

    private _onShowDiamond(num:number){
        this.UIBindData.diamond = num;
    }

    private _onShowNum(data){
        for (let index = 0; index < data.length; index++) {
            this.label_num[index].string = data[index].consume_diamond;
        }
    }
    
    private _onShowName(data){
        for (let index = 0; index < data.length; index++) {
            this.label_name[index].string = CARDNAME[data[index].card_type];
        }
    }

    onQueryClick(){
        let data:RulesDlgData = new RulesDlgData();
        data.group = [{txt:App.LangManager.getTxtByKey("tips").drawreward1,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").drawreward2,isTitle:false},
        {txt:App.LangManager.getTxtByKey("tips").drawreward3,isTitle:false}];
        App.DlgManager.showDlg("rules",data,"mainpackage");
    }

    // checkLimit(index:number){
    //     if (this._info.diamond < this._info.card_types[index].consume_diamond) {
    //         return true;
    //     }
    //     return false;
    // }

    async onCardClick(render,index){
        let data=await App.HttpManager.postAsync("activity_api/choose_flip_card_type",{activity_id:RewardEnum.DRAWREWARD,card_type:Number(index)+1});
        App.DlgManager.showDlg("reward/drawReward/openReward",{Data:data,type:Number(index)+1});
        this.hide();
    }

}
