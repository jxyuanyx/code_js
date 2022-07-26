// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import ListItem from "../../../../gamecore/ui/components/common/ListItem";
import { RANKS } from "../../../../mainpackage/dialogs/record/RecordDlg";
import { CHIP_TYPES, Games } from "../../../../mainpackage/GameConfig";
import { formatCurrency, formatEngDate, fromatChip, fromatTime, getStrForLen } from "../../../../mainpackage/gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;
export enum MatchStatu {
    PROGRESS = 1,
    FINISH = 2
}

@ccclass
export default class RecordPage_ItemCheck extends  ListItem{

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
        areaIcon:null,
        rank:null
    }

    @property([cc.SpriteFrame])
    rankList:cc.SpriteFrame[] = [];

    @property(cc.Node)
    label:cc.Node = null;

    @property(cc.Sprite)
    enterIcon:cc.Sprite=null;

    @property(cc.Sprite)
    rivalAreaIcon:cc.Sprite=null;

    @property(cc.Node)
    vsInfo:cc.Node=null;

    @property(cc.Node)
    playerInfoView:cc.Node=null;

    @property(cc.Node)
    rewardView:cc.Node=null;

    @property(cc.Node)
    progressTitle:cc.Node=null;

    @property(cc.Node)
    finishTitle:cc.Node=null;

    @property(cc.Node)
    layout:cc.Node = null;

    private _itemInstance:cc.Node=null;

    onLoad(){
        super.onLoad();
        this._itemInstance=this.rewardView.children[0];
    }

    setData(index:number,data:any){
        super.setData(index,data);

        if(data.titleType){
            this.progressTitle.active=data.titleType==MatchStatu.PROGRESS;
            this.finishTitle.active=data.titleType==MatchStatu.FINISH;
        }

        let gameName=Games.filter(item=>item.room_type==data.room_type)[0].packageName;
        if(gameName!=null){
            this.UIBindData.gameIcon=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame(gameName);
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
            if (data.titleType == MatchStatu.FINISH &&data.match_limit_num == 2) {//平局的处理 暂时放到这里
                // if () {
                    // this.UIBindData.state = App.LangManager.getTxtByKey("record_draw");
                // }
            }
        }else{
            if (data.rank&&data.rank<=3) {
                this.UIBindData.rank.getComponent(cc.Sprite).spriteFrame = this.rankList[data.rank-1];
            }
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

                    if (rewardInfo[0] == 1) {
                        view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods1");
                    }
                    else{
                        view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods0");
                    }
                    let count = "";
                    if (rewardInfo[0] == CHIP_TYPES.SEASON_SCORE || rewardInfo[0] == CHIP_TYPES.RED_TICKET||rewardInfo[0] == CHIP_TYPES.PINK_TICKET||rewardInfo[0] == CHIP_TYPES.BLUE_TICKET||rewardInfo[0] == CHIP_TYPES.YELLOW_TICKET) {
                        count = fromatChip(rewardInfo[1] || 0)
                    }
                    else {
                        count = formatCurrency(rewardInfo[1] || 0)
                    }
                    view.getChildByName("count").getComponent(cc.Label).string=count;
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

            if (data.match_entry_type == 1) {
                this.enterIcon.spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods1");
            }
            else{
                this.enterIcon.spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods0");
            }
        }
        else{
            this.label.active = false;
            this.enterIcon.node.active = false;
        }
        //this.rewardView.active=data.isFinished;

        // this.UIBindData.time=App.LangManager.getTxtByKey("record_date",[fromatTime(data.start_time)]) + data.match_name;
        this.UIBindData.time = fromatTime(data.start_time) + "*" + formatEngDate(data.start_time*1000);

        if(data.status==0){
            this.UIBindData.state=App.LangManager.getTxtByKey("record_progress");
        }
    }
}
