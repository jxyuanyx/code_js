// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../../gamecore/App";
import { RewardEnum } from "../../../../../gamecore/enums/RewardEnum";
import BaseDlg from "../../../../../gamecore/ui/baseview/imp/BaseDlg";
import { DRAWINIT } from "../drawLayer/DrawReward";
import RewardCard from "./RewardCard";

const {ccclass, property} = cc._decorator;
const commonList:string[]=[
    "textures/plist/rewardcardbg"
]

@ccclass
export default class OpenReward extends BaseDlg {
    
    @property([cc.Node])
    cardList:cc.Node[] = [];

    @property(cc.Node)
    img_botxt:cc.Node = null;

    private _type:number = 0
    private _isClick:boolean = false;

    async afterShow(){
        await App.BundleManager.loadBundleCommonAtlasAsync(App.BundleManager.defaultBundle,commonList);

        // let data=await App.HttpManager.postAsync("activity_api/display_flip_card",{activity_id:RewardEnum.DRAWREWARD});
        this._type = this._data.type;
        for (let index = 0; index < this._data.Data.cards.length; index++) {
            this.cardList[index].getComponent(RewardCard).onShowCard(this._data.Data.cards[index],this._data.type,index);
            this.cardList[index].getChildByName("img_rewardbg").getChildByName("fanpaiguang").active = false;
        }
    }

    onDrawReward(data,index:number){
        cc.tween(this.node)
        .call(()=>{
            this.cardList[index].getComponent(RewardCard).turn(data[index],null,()=>{
                this.cardList[index].getChildByName("img_rewardbg").getChildByName("fanpaiguang").active = true;
            });
            
        })
        .delay(0.5)
        .call(()=>{
            for (let n = 0; n < this.cardList.length; n++) {
                if (index!=n) {
                    this.cardList[n].getComponent(RewardCard).turn(data[n]);
                }
            }
        })
        .delay(0.7)
        .call(()=>{
            App.DlgManager.showDlg("rewardGoods",{Data:[data[index]],cb:()=>{
                // this._data?.cb?.()
                cc.game.emit(DRAWINIT);
                this.hide();
            }})
        })
        .start();
        
    }

    exitAllCb(){
        for (let index = 0; index < this.cardList.length; index++) {
            this.cardList[index].off(cc.Node.EventType.TOUCH_END);
        }
    }

    private _playBoTxtAnim(){
        this.img_botxt.opacity = 0;
        cc.tween(this.img_botxt)
        .to(0.3,{opacity:255})
        .start();
    }

    onGetluckClick(){

        this._isClick = true;
        cc.log(this.UI_BTNS.get("getluck"));
        this.UI_BTNS.get("getluck").active = false;
        this._playBoTxtAnim();
        cc.log(this.UI_BTNS.get("getluck"));

        for (let index = 0; index < this.cardList.length; index++) {
            this.cardList[index].getComponent(RewardCard).turnBack(this._type,async (index)=>{
                if (!this._isClick) {
                    return;
                }
                this._isClick = false;
                let data= await App.HttpManager.postAsync("activity_api/choose_flip_card",{card_type:this._data.type,activity_id:RewardEnum.DRAWREWARD,card_position:index});
                this.exitAllCb();
                this.onDrawReward(data.cards,index);
            });
        }

        this.scheduleOnce(()=>{
            for (let index = 0; index < this.cardList.length; index++) {
                this.cardList[index].getComponent(RewardCard).shuffle(new cc.Vec3(0,1));
            }
        },0.3);

    }

    onCloseClick(){
        cc.game.emit(DRAWINIT);
        this.hide();
    }

}
