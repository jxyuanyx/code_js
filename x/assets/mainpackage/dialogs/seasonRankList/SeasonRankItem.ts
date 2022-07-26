import App from "../../../gamecore/App";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { DataConfig } from "../../GameConfig";
import { formatCurrency, fromatChip, fromatNumber1, getHead } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SeasonRankItem extends ListItem {
    UIBindData={
        selfNick:"123",
        rankName:"",
        starCount:"",
        selfRank:0,
        icon:null,
        areaIcon:null,
        rank:null
    }

    @property(cc.Node)
    rewardView:cc.Node=null;

    setData(index:number,data?:any){
        if (!data) {
            return;
        }
        this.UIBindData.selfNick=data.Nick.length > 6?data.Nick.substr(0,6)+"..":data.Nick;
        this.UIBindData.rankName=App.DataManager.getExtInfo(DataConfig.SEASON_RANK)[data.Dan].dan_name
        this.UIBindData.starCount=fromatChip(data.Score);
        this.UIBindData.selfRank=data.Rank;
        this.UIBindData.areaIcon=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.area_code.toUpperCase());
        this.UIBindData.rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+data.Dan);
        getHead(data.Avatar,this.UIBindData.icon);

        let item=this.rewardView.children[0];
        item.removeFromParent();

        let rewards=(data.reward instanceof Array)?data.reward:[data.reward];
        for(let i=0;i<rewards.length;i++){
            let rewardInfo=rewards[i];
            let view=cc.instantiate(item);
            // view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("matchType_"+rewardInfo.type);
            view.getChildByName("count").getComponent(cc.Label).string=App.LangManager.getTxtByKey("currency")+formatCurrency(rewardInfo.value);
            view.getChildByName("addicon").active=(i!=rewards.length-1);
            this.rewardView.addChild(view);
        }
    }
}
