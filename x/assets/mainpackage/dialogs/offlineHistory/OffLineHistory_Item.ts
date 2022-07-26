// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import App from "../../../gamecore/App";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { CHIP_TYPES, Games } from "../../GameConfig";
import { formatCurrency, fromatChip, fromatTime, getStrForLen } from "../../gameHelper/AthHelper";
import { RANKS } from "../record/RecordDlg";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class OffLineHistory_Item extends  ListItem{

    UIBindData={
        state:"",
        time:"",
        matchName:"",
        playerCount:"",
        enterPrice:"",
        rewardCount:0,
        tickets:"",
        cash:"",
        gameIcon:null,
        areaIcon:null
    }

    @property(cc.Sprite)
    enterIcon:cc.Sprite=null;

    @property(cc.Node)
    vsInfo:cc.Node=null;

    @property(cc.Node)
    playerInfoView:cc.Node=null;

    @property(cc.Node)
    rewardView:cc.Node=null;

    @property(cc.Node)
    label:cc.Node = null;

    private _itemInstance:cc.Node=null;

    onLoad(){
        super.onLoad();
        this._itemInstance=this.rewardView.children[0];
    }

    setData(index:number,data:any){
        super.setData(index,data);

        let gameName=Games.filter(item=>item.room_type==data.room_type)[0].packageName;
        if(gameName!=null){
            this.UIBindData.gameIcon=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(gameName);
        }else{
            this.UIBindData.gameIcon=null;
        }

        this.vsInfo.active=data.opponent_info?.nick;
        this.playerInfoView.active=!this.vsInfo.active;

        if(data.match_type==1){
            if(!(data.opponent_info?.nick)){
                this.vsInfo.active=false;
                this.UIBindData.playerCount=App.LangManager.getTxtByKey("matchTip_record");
            }else{
                let state = "";
                if (data.rank == 1) {
                    state = App.LangManager.getTxtByKey("record_win");
                }
                else{
                    state = App.LangManager.getTxtByKey("record_lose");
                }
                this.UIBindData.state=state;
                this.UIBindData.matchName = getStrForLen(data.opponent_info.nick,4);
                this.UIBindData.areaIcon=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.opponent_info.area_code);
            }
        }else{
            this.UIBindData.playerCount=App.LangManager.getTxtByKey("totalPlayer",[data.match_limit_num]);
            this.UIBindData.state=App.LangManager.getTxtByKey("record_getRank",[data.rank,RANKS[Math.min(data.rank-1,3)]]);
        }

        if(data.status==0){
            this.UIBindData.state=App.LangManager.getTxtByKey("record_progress");
            this.rewardView.active=false;
        }else if(data.status==1){
            if(data.reward_info){
                this.rewardView.removeAllChildren();
                for(let i=0;i<data.reward_info.length;i++){

                    let rewardInfo=data.reward_info[i];
                    let view=cc.instantiate(this._itemInstance);
                    view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+rewardInfo[0]);
                    let count = "";
                    if (rewardInfo[0] == CHIP_TYPES.SEASON_SCORE || rewardInfo[0] == CHIP_TYPES.RED_TICKET||rewardInfo[0] == CHIP_TYPES.PINK_TICKET||rewardInfo[0] == CHIP_TYPES.BLUE_TICKET||rewardInfo[0] == CHIP_TYPES.YELLOW_TICKET) {
                        count = fromatChip(rewardInfo[1] || 0)
                    }
                    else {
                        count = formatCurrency(rewardInfo[1] || 0)
                    }
                    view.getChildByName("count").getComponent(cc.Label).string=count
                    view.getChildByName("addicon").active=(i!=data.reward_info.length-1);
                    this.rewardView.addChild(view);
                }
                this.rewardView.active=true;
            }else{
                this.rewardView.active=false;
            }
        }
        this.enterIcon.node.active=data.match_entry_value>0;
        this.UIBindData.enterPrice=(data.match_entry_type==0)?App.LangManager.getTxtByKey("matchList_free"):formatCurrency(data.match_entry_value);
        if (data.match_entry_type) {
            this.label.active = true;
            this.enterIcon.node.active = true;
            this.enterIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+data.match_entry_type);
        }
        else{
            this.label.active = false;
            this.enterIcon.node.active = false;
        }
        //this.rewardView.active=data.isFinished;

        this.UIBindData.time=App.LangManager.getTxtByKey("record_date",[fromatTime(data.start_time)]) + data.match_name;

        if(data.status==0){
            this.UIBindData.state=App.LangManager.getTxtByKey("record_progress");
        }
    }
}
