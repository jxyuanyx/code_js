// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from '../../../gamecore/App';
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { formatCurrency, formatDate, fromatChip } from "../../gameHelper/AthHelper";
import { RedTipService, REDTIP_MODULE } from '../../services/RedTipService';
import Barrage from '../barrage/Barrage';

const {ccclass, property} = cc._decorator;

const TURNNUM = 8;
const TURNSTATUS={
    UNSELECT:1,     //不能转
    SELECT:2,       //可以转但是没转
    TURNING:3,      //转动过程中
    TURNOVER:4      //转动播放结果
}

const commonList:string[]=[
    "textures/plist/award"
]

@ccclass
export default class LuckyTurn extends BaseDlg {
    UIBindData={
        turnside:null,
        turnout:null,
        turn:null,
        max:"Up to 0",
        ticknum0:"",
        ticknum1:"",
        ticknum2:"",
        ticknum3:"",
        time:""
    }

    @property([sp.SkeletonData])
    skeletonData:sp.SkeletonData[]=[];

    @property(cc.Node)
    node_turn:cc.Node=null;

    @property(cc.Node)
    node_goods:cc.Node=null;

    @property(cc.Node)
    anim_spin:cc.Node=null;

    // @property(cc.Node)
    // anim_turn:cc.Node=null;

    @property(cc.Node)
    anim_selight:cc.Node=null;

    @property(cc.Node)
    anim_light:cc.Node=null;

    @property(cc.Button)
    btn_level:cc.Button[]=[];

    @property(cc.Prefab)
    barrage:cc.Prefab = null;

    private _lb_goodsnum:cc.Label[] = [];
    private _sp_goods:cc.Sprite[] = [];
    private _lb_levelnum:cc.Label[] = [];

    private _goodList:any;
    private _curIndex:number = -1;

    protected turnStatu:number;
    private _time;

    private _showGoodCb:Function;

    private _tdata:any;

    private _barrageList:any[] = [];

    private _barrageId:number = 0;

    beforeShow(){
    }

    async afterShow(){
        await App.BundleManager.loadBundleCommonAtlasAsync(App.BundleManager.defaultBundle,commonList);
        
        for (let index = 0; index < TURNNUM; index++) {
            this._lb_goodsnum[index] = this.node_goods.getChildByName("label_goodsnum"+index).getComponent(cc.Label);
            this._sp_goods[index] = this.node_goods.getChildByName("img_turngoods"+index).getComponent(cc.Sprite);
        }

        let data=await App.HttpManager.postAsync("season_api/season_wheel");
        this._barrageList = data.barrage_list;
        await this.startBarrage();

        let date = new Date();
        let curTime = date.getTime()
        this._time = Math.floor(data.end_time-curTime/1000);
        this.startTimer();
        this._tdata = data;
        let minlv = -1;
        this.inputLevel();

        let redCount=0;
        for (let index = 1; index <=4; index++) {
            if (data["lv"+index].count) {
                if(minlv==-1)minlv = index;
                redCount+=data["lv"+index].count;
            }    
        }
        RedTipService.getInstance().setRedTipNum(REDTIP_MODULE.SEASON_WHEEL,redCount);

        if (minlv != -1) {
            this.onLevelClick(null,minlv);
        }
        else{
            this.onLevelClick(null,1);
        }
    }

    async startBarrage(){
        cc.log(this._barrageList,"this.barragelist>>>>>>>>>>>>>>")
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

    startTimer(){
        this.unschedule(this._updateTime);
        if(this._time>0){
            this.schedule(this._updateTime,1)
        }
    }

    _updateTime(){
        this._time--;
        this.UIBindData.time=GameHelper.fromatTimeNew(this._time);
        if(this._time<=0){
            this.unschedule(this._updateTime);
        }
    }

    beforeHide(){
        if (this._showGoodCb) {
            this._showGoodCb();
            App.AudioManager.pauseSound();
            this._showGoodCb = null;
        }
        if (this._barrageId) {
            clearTimeout(this._barrageId);
            this._barrageId=null;
        }
        
    }

    inputLevel(){
        for (let index = 0; index <4; index++) {
            let item=this._tdata["lv"+(index+1)];
            this.UIBindData["ticknum"+index] = item.count +"/"+this._tdata.consume;
        }
    }

    inputGoods(index:number){
        this.UIBindData.turn.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/award").getSpriteFrame("turn_"+index);
        this.UIBindData.turnout.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/award").getSpriteFrame("turnout_"+index);
        this.UIBindData.turnside.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/award").getSpriteFrame("turn_side"+index);
        let data=this._tdata["lv"+index]
        let goods=data.wheel_list;
        let max=0;
        for (let l = 0; l < goods.length; l++) {
            this._sp_goods[l].spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_"+goods[l].gear_res);
            this._lb_goodsnum[l].string = formatCurrency(goods[l].gear_value);
            if(goods[l].gear_value>max){
                max=goods[l].gear_value;
            }
        }
        this.UIBindData.max = "Up to "+ App.LangManager.getTxtByKey("currency") + formatCurrency(max);
    }

    async onSpinClick(){
        
        if (this.turnStatu == TURNSTATUS.TURNING||this._curIndex == -1) {
            return;
        }
        let config=this._tdata["lv"+this._curIndex];
        if (config.count<this._tdata.consume) {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("noticket")});
            return;
        }
        this.setTurnStatu(TURNSTATUS.TURNING);
        this.node_turn.angle=0;
        
        await App.HttpManager.postAsync("season_api/get_season_wheel_reward",{wheel_lv:this._curIndex},false).then(
            (data)=>{
                //清红点
                RedTipService.getInstance().updateRedTipStatus(REDTIP_MODULE.SEASON_WHEEL,-1);

                let showGoodCb = ()=>{
                    let tip = "<color=636FFF>%s</color> <color=#FDD756>%s</color>";
                    let num = formatCurrency(data.gear_value);
                    let txt=cc.js.formatStr(tip,App.LangManager.getTxtByKey("bonus")+"x",num);
                    App.DlgManager.showDlg("toast",{title:App.LangManager.getTxtByKey("BonusCash"),content:txt});
                    this.setTurnStatu(TURNSTATUS.TURNOVER);
                }

                this.onTurnRotate(data.wheel_gear-1,showGoodCb);

                this.UIBindData["ticknum"+(this._curIndex-1)] = (data.count || 0) +"/"+this._tdata.consume;
            },
            (data)=>{
                this.setTurnStatu(TURNSTATUS.SELECT);
            }
        );

    }

    /**
     * 要转到的档位
     * @param wheel_gear 
     */
     onTurnRotate(wheel_gear,cb){
        let angle = wheel_gear *45
        cc.error(angle,wheel_gear,"onTurnRotate")
        cc.tween(this.node_turn)
        .call(()=>{
            this.setTurnStatu(TURNSTATUS.TURNING);
        })
        .by(3,{angle:720}, { easing: 'sineIn'})
        .by(3,{angle:1440})
        .by(4,{angle:1080 + angle},{easing:'sineOut'})
        .call(cb)
        .start();

        App.AudioManager.playSound(App.BundleManager.defaultBundle,"sounds/turntable")
    }

    onLevelClick(render:any,index:number){

        if(this.turnStatu==TURNSTATUS.TURNING)return;

        this.inputGoods(index);
 
        for (let n = 0; n < 4; n++) {
            this.btn_level[n].node.getChildByName("img_light").active = ((index-1) == n);
        }

        this.setTurnStatu(TURNSTATUS.SELECT);

        this._curIndex = index;
        
        this.node_turn.angle=0;
        
    }

    setTurnStatu(statu:number = TURNSTATUS.SELECT){
        this.turnStatu = statu;
        switch (statu) {
            case TURNSTATUS.UNSELECT:
                // this._setSpinStatu(false);
                this.anim_spin.active = false;
                this.anim_selight.active = false;
                this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"nihongdeng",true);
                // this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"none",true);
                this.anim_light.getComponent(sp.Skeleton).timeScale = 1;
                this.node.getChildByName("btn_spin").getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                break;
            case TURNSTATUS.SELECT:
                // this._setSpinStatu(true);
                this.anim_spin.active = false;
                this.anim_selight.active = false;
                this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"nihongdeng",true);
                // this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"none",true);
                this.anim_light.getComponent(sp.Skeleton).timeScale = 1;
                this.node.getChildByName("btn_spin").getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                break;
            case TURNSTATUS.TURNING:
                // this._setSpinStatu(false);
                this.node.getChildByName("btn_spin").getComponent(cc.Button).transition = cc.Button.Transition.NONE;
                this.anim_spin.active = true;
                this.anim_selight.active = false;
                // this.anim_light.getComponent(sp.Skeleton).setToSetupPose();
                this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"nihongdeng",true);
                cc.tween(this.anim_light.getComponent(sp.Skeleton))
                .to(3,{timeScale:10}, { easing: 'sineIn'})
                .delay(4)
                .to(4,{timeScale:0},{easing:'sineOut'})
                .start();
                break;
            case TURNSTATUS.TURNOVER:
                // this._setSpinStatu(false);
                this.node.getChildByName("btn_spin").getComponent(cc.Button).transition = cc.Button.Transition.NONE;
                this.anim_spin.active = false;
                this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"nihongdeng",true);
                // this.anim_light.getComponent(sp.Skeleton).setAnimation(0,"none",true);
                this.anim_light.getComponent(sp.Skeleton).timeScale = 0;
                this.anim_selight.active = true;
                this.anim_selight.getComponent(sp.Skeleton).setAnimation(0,"xuanzhong",false);
                this.anim_selight.getComponent(sp.Skeleton).setCompleteListener(()=>{
                    this.setTurnStatu(TURNSTATUS.SELECT);
                })
                break;
        
            default:
                break;
        }
    }

    _setSpinStatu(isClick:boolean = false){
        // this.node.getChildByName("btn_spin").getComponent(cc.Button).interactable = isClick;
        this.anim_spin.active = isClick;
    }
    
}

export function showData(msg: any) {
    throw new Error('Function not implemented.');
}

