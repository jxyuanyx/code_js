// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GoodsEnum } from "../../../gamecore/enums/GoodsEnum";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { Goods } from "../../GameConfig";
import { formatCurrency, fromatChip } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InviteCodeDlg extends BaseDlg {

    UIBindData={
        bindCode:""
    }

    async onConfirmClick(){
        let code:string=this.UIBindData.bindCode;
        let reg=/[A-Za-z0-9]{6,6}$/g;
        if(!code || !reg.test(code)){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Please enter the correct invite code."});
            return;
        }
        App.DlgManager.showDlg("loading");
        await App.HttpManager.postAsync("invite_api/bind_invite_code",{invite_code:this.UIBindData.bindCode}).then(async (data)=>{
            await App.DlgManager.showDlg("rewardGoods",{Data:data.reward_list,cb:()=>{
                this.hide();
            }}); 
            App.DlgManager.hideDlg("loading");
        },()=>{
            App.DlgManager.hideDlg("loading");
        });
       
        //this.hide();
    }

    
}
