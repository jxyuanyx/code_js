// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../lobby/cv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AofDesc extends cc.Component {
    @property(cc.Label) aofTitle_text: cc.Label = null;
    @property(cc.Label) title: cc.Label = null;
    @property(cc.Label) renwu: cc.Label = null;
    @property(cc.Label) choujiangNum: cc.Label = null;
    @property(cc.RichText) curShoushu: cc.RichText = null;
    @property(cc.Label) curChoujiang: cc.Label = null;
    @property(cc.Button) close_btn: cc.Button = null;
    @property(cc.Sprite) desImg: cc.Sprite = null;
    
    onLoad(){
        this.aofTitle_text.string = cv.config.getStringData("Aof_game_lost_title_text");
        this.title.string = cv.config.getStringData("Aof_game_lost_desc_text");
        this.renwu.string = cv.config.getStringData("Aof_game_lost_duiju_text");
        this.choujiangNum.string = cv.config.getStringData("Aof_game_lost_jihui_text");
    }
    start(){
        cv.resMgr.setSpriteFrame(this.desImg.node,cv.config.getLanguagePath("hall/laba/lost_aof_desc"));
    }

    public onCloseBtn()
    {
        cv.AudioMgr.playButtonSound('close');
        this.closePanel();
    }
    
    public closePanel() {
        this.node.active = false;
    }
    public updateView(){
        cv.StringTools.setRichTextString(this.curShoushu.node, cv.StringTools.formatC(cv.config.getStringData("Laba_game_dealer_up_count"),cv.dataHandler.getUserData().hand_num,cv.dataHandler.getUserData().getPlayerHands()));
	    this.curChoujiang.string = cv.dataHandler.getUserData().luckdrawslen.toString();
    }
}
