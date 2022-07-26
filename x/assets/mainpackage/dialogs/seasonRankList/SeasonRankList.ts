// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListAdapterDynamic from "../../../gamecore/ui/components/common/ListAdapterDynamic";
import ListViewDynamic from "../../../gamecore/ui/components/common/ListViewDynamic";
import { DataConfig } from "../../GameConfig";
import { formatCurrency, fromatChip, getHead } from "../../gameHelper/AthHelper";
import SeasonPlayer from "../../hall/pages/page3/SeasonPlayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SeasonRankList extends BaseDlg {

    showMode=DlgEnum.T2B;

    UIBindData={
        selfNick:"123",
        rankName:"",
        starCount:"",
        selfRank:0,
        selfHead:null,
        selfArea:null,
        rank:null
    }

    @property(ListViewDynamic)
    listView:ListViewDynamic;
    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Prefab)
    rewardItem:cc.Prefab = null

    @property([SeasonPlayer])
    rank3Player:SeasonPlayer[]=[];

    private _rankList:any[]=[];

    @property(cc.Node)
    rewardView:cc.Node=null;


    afterShow(){
        this._onShowSelfInfo(this._data);
        let adapter=new ListAdapterDynamic(this._rankList);
        this.listView.setAdapter(adapter);
        let pageSize=Math.ceil(this.listView.node.getChildByName("view").height/this.listView.getColumnWH())*2;
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(pageSize,pageNo);
        });
        this._getPage(pageSize,0);
    }

    private _flushSelfInfo(){
        App.HttpManager.get("seasoninfo",null,this.node,(data:any)=>{
            this._onShowSelfInfo(data);
        })
    }

    private _onShowSelfInfo(data:any){
        this.rewardView.removeAllChildren();
        this.UIBindData.rank.spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("rank_"+data.self.Dan);
        this.UIBindData.rankName=App.DataManager.getExtInfo(DataConfig.SEASON_RANK)[data.self.Dan].dan_name;
        this.UIBindData.starCount=fromatChip(data.self.Score);
        this.UIBindData.selfNick=App.DataManager.getSelfData().Nick;
        this.UIBindData.selfRank=data.self.Rank;
        this.UIBindData.selfArea=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(App.DataManager.getSelfData().AreaCode);
        getHead(App.DataManager.getSelfData().Avatar,this.UIBindData.selfHead);
        let rewards=(data.self.reward instanceof Array)?data.self.reward:[data.self.reward];
        for(let i=0;i<rewards.length;i++){
            let rewardInfo=rewards[i];
            let view=cc.instantiate(this.rewardItem);
            view.getChildByName("count").getComponent(cc.Label).string= rewardInfo.value?App.LangManager.getTxtByKey("currency")+formatCurrency(rewardInfo.value):"none";
            view.getChildByName("addicon").active=(i!=rewards.length-1);
            this.rewardView.addChild(view);
        }
    }

    _getPage(pageSize:number,pageNo:number){
        App.HttpManager.get("seasonrank",{pageno:pageNo,pagesize:pageSize},this.node,(data)=>{
            this.listView.pager.init(pageSize);
            this.listView.pager.addPageDatas(data.list||[]);
            if (!data.list) {
                GameHelper.addEmptyDataView(this.content.parent);
            }
            this._flushSelfInfo();
        });
    }

    onCloseClick(){
        this._data.closeCb();
    }

    onScrolltopClick(){
        this.listView.scrollToPage(0);
    }


}
