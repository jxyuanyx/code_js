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
import GameDataManager from "./data/GameDataManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ZoomCurentTime extends cc.Component {


    @property(cc.Label) win_number: cc.Label = null;
    @property(cc.Label) des_text: cc.Label = null;
    @property(cc.Label) title_text: cc.Label = null;
    @property(cc.Label) btn_text: cc.Label = null;

    @property(cc.Button) ok_button: cc.Button = null;

    @property(cc.Label) titleHand: cc.Label = null;  //总手数
    @property(cc.Label) txtHand: cc.Label = null;  //时间
    @property(cc.Label) titleTime: cc.Label = null;  //总时间
    @property(cc.Label) txtTime: cc.Label = null;  //时间

    onLoad(){
        
       cv.resMgr.adaptWidget(this.node, true);
       this.btn_text.string = cv.config.getStringData("AllianceInfo_buyinLimitpanel_sure_button");
       this.title_text.string = cv.config.getStringData("selfView_ScrollView_Button_3_Text_3_0");
       this.titleHand.string = cv.config.getStringData("DataView_data_panel_dataInfo_panel_MTT_TotalShoushu_txt");  //总手数
       this.titleTime.string = cv.config.getStringData("ZoomCurentTime_TotalTime");  //总计时
       
       this.ok_button.node.on("click", (event: cc.Event): void => { 
		cv.AudioMgr.playButtonSound('button_click');
             cv.MessageCenter.send("on_leave_room_succ");   
       }, this);   
    }

    start () {

    }

    public updateView(pkReset:any){

        let winNum = pkReset.SettleStake;  //输赢金额
        let ingametime = pkReset.InGameTime; //时间
        let handcount = pkReset.HandCount; //手数
        this.txtHand.string = handcount;  //总手数

        let _sec = ingametime%60;  //秒
        let _min = ingametime%3600/60; //分
        let _hour = ingametime/3600;  //小时

        this.txtTime.string = cv.StringTools.formatC("%02d:%02d:%02d", _hour, _min, _sec);

        if(winNum == 0){
            this.win_number.string = cv.StringTools.numToFloatString(winNum);
            this.win_number.node.color = cc.color(255,255,255);
        }else if(winNum > 0){
            this.win_number.string = "+" + cv.StringTools.numToFloatString(winNum);
            this.win_number.node.color = cv.tools.getWinColor();
        }else{
            this.win_number.string = cv.StringTools.numToFloatString(winNum);
            this.win_number.node.color = cv.tools.getLoseColor();
        }
    }

    // update (dt) {}
}
