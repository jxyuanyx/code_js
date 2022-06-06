import cv from "./../../../components/lobby/cv"
import { CircleSprite } from "../../tools/CircleSprite";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PokerInfoItem_mtt extends cc.Component {
    data: any = null;
    posX: number = 0;

    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
   
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage() {
        //cv.StringTools.setLabelString(this.node, "bring_title_text", "PokerInfoItem_roleImg_bring_title_text");
    }

    setData(data: any, index: number, display_currency:string  = "GOLD") {
        this.initLanguage();
        this.data = data;

        //昵称
        cc.find("roleName_text", this.node).getComponent(cc.Label).string = data.nickName;
        //头像
        (CircleSprite).setCircleSprite(cc.find("headNode/roleImg", this.node), data.avatar);
        //名次文本
        let txtRank = cc.find("txtRank", this.node);
        txtRank.getComponent(cc.Label).string = data.rank;
        txtRank.active = false;

        //头三名图标
        let imgRank = cc.find("imgRank", this.node);
        let cupUrl = "zh_CN/hall/recordView/cupFirst";
        imgRank.active = true;
        if(data.rank == 1){
            cupUrl = "zh_CN/hall/recordView/cupFirst";
        }else if(data.rank == 2){
            cupUrl = "zh_CN/hall/recordView/cupSecond";
        }else if(data.rank == 3){
            cupUrl = "zh_CN/hall/recordView/cupThird";
        }else{
            imgRank.active = false;
            txtRank.active = true;
        }

        cv.resMgr.setSpriteFrame(cc.find("imgRank", this.node), cupUrl);
        //分数
        let winBet_text =  cc.find("score", this.node);
     
        winBet_text.getComponent(cc.Label).string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.resultMoney));
       
       
        let unit = cc.find("score/unit", this.node);
     

        if(display_currency == "USD"){
            cv.resMgr.setSpriteFrame(unit, 'zh_CN/hall/recordView/dollar');
        }else if(display_currency == "GOLD"){
            cv.resMgr.setSpriteFrame(unit, 'zh_CN/hall/recordView/rmb');
        }

        if (data.resultMoney > 0) {
            winBet_text.getComponent(cc.Label).string = "+" + winBet_text.getComponent(cc.Label).string;
            winBet_text.color = cv.tools.getWinColor();
            unit.color = cv.tools.getWinColor();
        }
        else if (data.resultMoney == 0) {
            winBet_text.color = cc.Color.WHITE;
            unit.color = cc.Color.WHITE;
        }
        else {
            winBet_text.color = cv.tools.getLoseColor();
            unit.color = cv.tools.getLoseColor();
        }

        let width = cv.resMgr.getLabelStringSize(winBet_text.getComponent(cc.Label)).width;
        unit.x = -width - 17; 

    }
}
