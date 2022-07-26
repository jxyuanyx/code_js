// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { GameStatus } from "../../../../gamecore/models/GameStatus";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { CHIP_TYPES } from "../../../../mainpackage/GameConfig";
import { formatCurrency, fromatChip } from "../../../../mainpackage/gameHelper/AthHelper";
import { SELECT_ITEM_MATCH } from "./MatchListPageCheck";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MatchListItemCheck extends BaseComponent {

    @property([cc.SpriteFrame])
    img_matchtype:cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    img_matchtitle:cc.SpriteFrame[] = [];


    @property(cc.Node)
    label:cc.Node = null;

    @property(cc.Sprite)
    matchTypeIcon:cc.Sprite=null;

    @property(cc.Sprite)
    img_TitleBg:cc.Sprite=null;

    @property(cc.Sprite)
    enterTypeIcon:cc.Sprite=null;

    @property(cc.Node)
    rewardView:cc.Node;

    private _itemInstance:cc.Node=null;


    private _index:number=0;
    private _data:any=null;

    UIBindData={
        contentTitle:"",
        enterPrice:"",
        add:"+",
        entry:"ENTRY",
        playerCount:""
    }

    onLoad(){
        super.onLoad();
        this._itemInstance=this.rewardView.children[0];
    }

    setData(index:number,data:any){
        this._index=index;
        this._data=data;
        this.UIBindData.contentTitle=App.LangManager.getTxtByKey("matchList_title",[this._data.match_name,this._data.max_player]);
       // this.UI_LBS.get("point").parent.active=this._data.season_score;
        this.UIBindData.playerCount=data.match_limit_num+" PLAYER"
        this.UIBindData.enterPrice=((this._data.entry_price==0)?App.LangManager.getTxtByKey("matchList_free"):formatCurrency(this._data.match_entry_value));
        if (data.front_match_type == 0||data.front_match_type == 1) {
            this.matchTypeIcon.spriteFrame=this.img_matchtype[0];
        }
        else{
            this.matchTypeIcon.spriteFrame=this.img_matchtype[1];
        }
        if (this._data.match_lv_res <= 6) {
            this.img_TitleBg.spriteFrame=this.img_matchtitle[0];
        }
        else if (this._data.match_lv_res > 6){
            this.img_TitleBg.spriteFrame=this.img_matchtitle[1];
        }
        // this.matchTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("level_"+this._data.match_lv_res);
        // if (this._data.match_lv_res <= 6) {
        //     this.img_TitleBg.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("img_typebg"+1);
        // }
        // else if (this._data.match_lv_res > 6){
        //     this.img_TitleBg.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("img_typebg"+2);
        // }
        
        if(data.match_pool_type){
            this.rewardView.removeAllChildren();
            for(let i=0;i<data.match_pool_type.length;i++){
                let rewardInfo=data.match_pool_type[i];
                let view=cc.instantiate(this._itemInstance);
                let type = rewardInfo[0];
                let value=rewardInfo[1];
                if (type == CHIP_TYPES.BIND_CASH || type == CHIP_TYPES.CASH) {
                    view.getChildByName("icon").active = false;
                }
                // view.getChildByName("icon").getComponent(cc.Sprite).spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame("goods_"+type);
                view.getChildByName("count").getComponent(cc.Label).string=(type==CHIP_TYPES.SEASON_SCORE)?fromatChip(value || 0):formatCurrency(value);
                view.getChildByName("addicon").active=(i!=data.match_pool_type.length-1);
                this.rewardView.addChild(view);
                if(type==CHIP_TYPES.SEASON_SCORE){
                    view.scale=0.7;
                }
            }
            this.rewardView.active=true;
        }else{
            this.rewardView.active=false;
        }
        
        /*
        if (this._data.prize_pool_type == 1) {
            this.node.getChildByName("lang_lb_contentSubTitle").color = new cc.Color(236,196,255,255);
            this.UI_LBS.get("add").getComponent(cc.LabelShadow).color = new cc.Color(86,3,156,255);
            this.UI_LBS.get("chips").getComponent(cc.LabelShadow).color = new cc.Color(86,3,156,255);
            this.UI_LBS.get("point").getComponent(cc.LabelShadow).color = new cc.Color(86,3,156,255);
        }
        else if (this._data.prize_pool_type == 2){
            this.node.getChildByName("lang_lb_contentSubTitle").color = new cc.Color(166,255,242,255);
            this.UI_LBS.get("add").getComponent(cc.LabelShadow).color = new cc.Color(1,94,76,255);
            this.UI_LBS.get("chips").getComponent(cc.LabelShadow).color = new cc.Color(1,94,76,255);
            this.UI_LBS.get("point").getComponent(cc.LabelShadow).color = new cc.Color(1,94,76,255);
        }
        */
        this.enterTypeIcon.node.parent.getComponent(cc.Layout).updateLayout();

        this.enterTypeIcon.node.active=this._data.match_entry_type!=0;

        if (this._data.match_entry_type) {
            // this.label.active = true;
            this.UIBindData.entry = App.LangManager.getTxtByKey("entry");
            this.enterTypeIcon.node.active = true;
            this.UI_LBS.get("enterPrice").active = true;
            if (data.match_entry_type == 1) {
                this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods1");
            }
            else{
                this.enterTypeIcon.spriteFrame=App.BundleManager.getCommonAtlas(App.NativeManager.getFakePackageName()+"/check").getSpriteFrame("img_goods0");
            }
            
        }
        else{
            // this.label.active = false;
            this.UIBindData.entry = "";
            this.enterTypeIcon.node.active = false;
            this.UI_LBS.get("enterPrice").active = true;
            this.UIBindData.enterPrice = App.LangManager.getTxtByKey("matchList_free");
        }
    }

    private _onSetFree(type,){

    }

 

    get data():any{
        return this._data
    }

    async onClick(){
        cc.game.emit(SELECT_ITEM_MATCH,this._data);
    }
}
