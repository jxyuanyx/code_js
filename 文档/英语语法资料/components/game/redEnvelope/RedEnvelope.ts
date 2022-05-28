import cv from "../../lobby/cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
const {ccclass, property} = cc._decorator;

@ccclass
export default class RedEnvelope extends cc.Component {
    @property(cc.Sprite) hb_bg: cc.Sprite = null;
    @property(cc.Label) hb_title: cc.Label = null;
    @property(cc.Label) hb_content: cc.Label = null;
    @property(cc.Label) hb_top: cc.Label = null;
    @property(cc.ScrollView) listView: cc.ScrollView = null;
    @property(cc.Node) curListView: cc.Node = null;
    @property(cc.Prefab) listView_item: cc.Prefab = null;
    @property(cc.Button) close_btn: cc.Button = null;
    @property(cc.Label) hb_date: cc.Label = null;

    public cellIdx = 0;
	public timeCount = 0;
    public lumpCount = 5;
    public txts: cc.Node[] = [];
    
    onLoad() {
        this.hb_date.string = "";
        cv.MessageCenter.register("showLuckTurnSnaplist", this.updateView.bind(this),this.node);
        cv.MessageCenter.register("showLuckButton", this.setStr.bind(this),this.node);
        this.hb_top.string = cv.StringTools.formatC(cv.config.getStringData("Small_Game_Hongbao_Top"), 50); 
        this.setStr();
        cc.find("Panel_3", this.node).on(cc.Node.EventType.TOUCH_START, function(){
            //this.closePael();
            this.node.active = false;
        }, this);
    }
    onDestroy(){
        cv.MessageCenter.unregister("showLuckTurnSnaplist", this.node);
        cv.MessageCenter.unregister("showLuckButton", this.node);
    }
    start(){
        cv.resMgr.setSpriteFrame(this.hb_bg.node,cv.config.getLanguagePath("hall/laba/hb_bg"));

        let sv: ScrollViewReuse = this.listView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.listView_item, "RedEnvelopeItem", []);
        sv.generateItemPool();
        sv.bindScrollEventTarget(this);
    }

    getLanguageIndx(): number{
        let indx = 0;
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN)
        {
            indx = 0;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH)
        {
            indx = 2;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.th_PH)
        {
            indx = 3;
        }
        else
        {
            indx = 1;
        }
        return indx;
    }

    public setStr(){
        let indx = this.getLanguageIndx();
        let titleArr = cv.dataHandler.getUserData().luckTurntablesInfo.title.split("(*)");
        let contentArr = cv.dataHandler.getUserData().luckTurntablesInfo.content.split("(*)");
        if (titleArr.length < indx + 1 || contentArr.length < indx + 1){
            indx = titleArr.length >= 2 ? 1 : 0;
        }
        this.hb_title.string = titleArr[indx];
        this.hb_content.string = contentArr[indx];
    }
    public updateView(){
        this.updateListView();
        if (this.txts.length == 0){
            this.scorllView();
        }
    }

    public getLampIdx(){
        if (this.cellIdx + 1 == this.lumpCount){
            this.cellIdx = 0;
        }
        else{
            this.cellIdx = this.cellIdx + 1;
        }
    }
    public scorllView(){
        for (let i = 0; i < this.lumpCount; i++)
        {
            this.cellIdx = i;
            this.setLampData(-1 * this.cellIdx);
        }
    }
    public startUpdate(){
        this.txts = [];
        this.lumpCount = 5;
        this.curListView.destroyAllChildren();
        this.curListView.removeAllChildren(true);
        this.schedule(this.onUpdate, 0);
        cv.worldNet.RequestLuckTurntableSnaplistResult(8, 50);
        this.node.active = true;
    }

    public hideView(){
        this.unschedule(this.onUpdate);
        this.txts = [];
        this.curListView.destroyAllChildren();
        this.curListView.removeAllChildren(true);
        this.node.active = false;
    }

    public onUpdate(dt: number){
        this.timeCount = this.timeCount + dt;
        if (this.txts[0] != this.txts[this.txts.length]){
            if (this.txts[0].y > 450){
                this.txts[0].removeFromParent(true);
                this.txts[0].destroy();
                this.txts.splice(0,1);
                this.getLampIdx();
                if (cv.dataHandler.getUserData().lamp_list.length > 0){
                    this.setLampData(0);
                }
            }
        }
        else{
            this.scorllView();
        }
        for (let i = 0; i < this.txts.length; i++)
        {
            this.txts[i].y = this.txts[i].y + 1;
        }
        if (this.timeCount > 5){
            this.timeCount = 0;
            if (cv.dataHandler.getUserData().luckTurntablesEndTime != 0){
                cv.worldNet.RequestLuckTurntableSnaplistResult(5, 50);
            }
        }
    }

    public setLampData(idx : number){
        let rich = new cc.Node();
        let posY = -20;
        rich.addComponent(cc.RichText);
        rich.setAnchorPoint(0,0.5);
        rich.getComponent(cc.RichText).fontSize = 28;
        rich.getComponent(cc.RichText).maxWidth = 829
        rich.setPosition(5, posY + idx * 80);
        this.txts.push(rich);
        this.curListView.addChild(rich);

        if (cv.dataHandler.getUserData().lamp_list.length > this.cellIdx){
            let lamp = cv.dataHandler.getUserData().lamp_list[this.cellIdx];
            let indx = this.getLanguageIndx()
            let roomArr = lamp.room_name.split("#");
            let desArr = lamp.goods_desc.split("#");
            if (roomArr.length < indx + 1){
                indx = roomArr.length >= 2 ? 1 : 0;
            }

            if (lamp.game_type == 1){
                let str = cv.StringTools.formatC("Small_Game_Hongbao_desc_%d", lamp.currency_type);
                if(lamp.currency_type == 3) {
                    cv.StringTools.setRichTextString(rich,cv.StringTools.formatC(cv.config.getStringData(str), lamp.nick_name, roomArr[indx], desArr[indx]));
                } else {
                    cv.StringTools.setRichTextString(rich,cv.StringTools.formatC(cv.config.getStringData(str), lamp.nick_name, roomArr[indx], cv.StringTools.numToFloatString(lamp.amount)));
                }
            }
            else{
                let str = cv.StringTools.formatC("Game_Hongbao_desc_%d", lamp.currency_type);
                if(lamp.currency_type == 3) {
                    cv.StringTools.setRichTextString(rich,cv.StringTools.formatC(cv.config.getStringData(str), roomArr[indx], lamp.nick_name, desArr[indx]));
                } else {
                    cv.StringTools.setRichTextString(rich,cv.StringTools.formatC(cv.config.getStringData(str), roomArr[indx], lamp.nick_name,cv.StringTools.numToFloatString(lamp.amount)));
                }
            }
        }
        else{
            rich.getComponent(cc.RichText).string = "";
        }
    }
    public updateListView(){
        this.hb_top.string = cv.StringTools.formatC(cv.config.getStringData("Small_Game_Hongbao_Top"), 50); 
        let sv: ScrollViewReuse = this.listView.getComponent(ScrollViewReuse);
        let list = cv.dataHandler.getUserData().record_list;
        sv.reloadView(list);
        
        if(list.length > 0) {
            this.hb_date.string = cv.StringTools.formatTime(list[0].lottery_time,cv.Enum.eTimeType.Month_Day)
        } else {
            this.hb_date.string = "";
        }
    }
    public closePael(){
        cv.AudioMgr.playButtonSound('close');
        this.node.active = false;
    }
}
