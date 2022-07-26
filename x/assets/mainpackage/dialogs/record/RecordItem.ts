// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { formatCurrency, fromatNumber1, getHead } from "../../gameHelper/AthHelper";
import { PLAYRECORD, RANKS } from "./RecordDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordItem extends ListItem {
    UIBindData={
        userName:"",
        rank:"",
        score:"",
        head:null,
        ranksp:null,
        areaIcon:null
    }
    @property(cc.Node)
    img_ranksinbg:cc.Node = null;

    @property(cc.Sprite)
    banner: cc.Sprite = null;

    @property(cc.Node)
    normalBg:cc.Node=null;

    @property(cc.Node)
    rank1Bg:cc.Node=null;

    @property(cc.SpriteFrame)
    default:cc.SpriteFrame = null;

    onLoad(){
        super.onLoad();
        this.node.opacity=0;
    }

    onPlayRecordClick(){
        cc.game.emit(PLAYRECORD,this._data.replay_url);
    }
    
    private _init(){
        this.UIBindData.userName = "";
        this.UIBindData.head.spriteFrame = this.default;
        this.UIBindData.rank="";
        this.UIBindData.ranksp.spriteFrame=null;
        this.UIBindData.score = "";
        this.UI_LBS.get("score").active=true;
    }

    setData(index:number,data?:any){
        this._init();
        super.setData(index,data);

        if (data.own) {
            this.rank1Bg.active= true;
        }
        else{
            this.rank1Bg.active=false;
            if (index%2 == 1) {
                this.img_ranksinbg.active = true;
            }
            else{
                this.img_ranksinbg.active = false;
            }
        }
        
        if(data.uid==0){
            this.UI_SPS.get("areaIcon").active=false;
            this.UI_LBS.get("score").active=false;
        }else{
            this.UIBindData.userName=data.nick.length > 10?data.nick.substr(0,10)+"...":data.nick;
            this.UIBindData.score=data.status==0?App.LangManager.getTxtByKey("playing"):fromatNumber1(data.score);
            this.UIBindData.ranksp.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/common").getSpriteFrame(data.rank);
            this.UIBindData.rank=data.rank?data.rank:"--";
            this.UIBindData.areaIcon=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame((data.area_code as string).toUpperCase());
            getHead(data.avatar,this.UIBindData.head);

            //逃跑特殊处理
            if(data.player_status==2){
                this.UIBindData.score=App.LangManager.getTxtByKey("escape")
            }
        }

        this.UI_BTNS.get("playRecord").active=this._data.replay_url;

        this.LANG_LBS.get("matchTip_record").active=data.uid==0;

        cc.tween(this.node).delay(1+index*0.2).to(0.5,{opacity:255}).start();
    }
}
