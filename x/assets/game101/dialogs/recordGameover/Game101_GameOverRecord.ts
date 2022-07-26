// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import NumScroll from "../../../gamecore/ui/components/common/NumScroll";

const {ccclass, property} = cc._decorator;

const YELLOWCOLOR=cc.Color.WHITE.fromHEX("#FFF21E");

@ccclass
export default class Game101_GameOverRecord extends BaseDlg {
    UIBindData={
        gameScore:0,
        timeScore:0,
        totalScore:0,
        dayBestScore:0,
        dayHistoryScore:0,
        averageScore:0,
        addAverageScore:"0",
        gameOverTitle:""
    }
    
    @property(NumScroll)
    numScroll:NumScroll=null;

    onLoad(){
        super.onLoad();
        this.UI_BTNS.get("again").opacity=0;
        this.UI_BTNS.get("ok").opacity=0;
    }

    afterShow(){
        let all = this._data.reward.Score+this._data.reward.TimeScore;
        this.UIBindData.timeScore=this._data.reward.TimeScore;
        this.UIBindData.gameScore=this._data.reward.Score;
        
        let gameScoreNode=this.UI_LBS.get("gameScore");
        gameScoreNode.x=570;

        cc.tween(gameScoreNode)
        .to(0.3,{x:264})
        .call(()=>{
            App.AudioManager.playGameSound("sounds/Score_column1");
        }).start();

        let delayTime=0.5;


        this.scheduleOnce(()=>{
            let timeScoreNode=this.UI_LBS.get("timeScore");
            timeScoreNode.x=570;
            cc.tween(timeScoreNode)
            .to(0.3,{x:264})
            .call(()=>{
                App.AudioManager.playGameSound("sounds/Score_column2");
            }).start();
        },delayTime);

        delayTime+=0.5;
        
        this.scheduleOnce(()=>{
            if(all){
                App.AudioManager.playGameSound("sounds/ScoreIncrease");
             }
             this.numScroll.run(0,all,0.8,null,()=>{
                 App.AudioManager.stopGameSound("sounds/ScoreIncrease");
                 App.AudioManager.playGameSound("sounds/ScoreFinish");
             });
        },delayTime);

        delayTime+=1;

        this.scheduleOnce(()=>{
            this.UI_BTNS.get("ok").opacity=0;
            this.UI_BTNS.get("ok").active=true;
            cc.tween(this.UI_BTNS.get("ok")).to(0.2,{opacity:255}).start();

            this.UI_BTNS.get("again").opacity=0;
            this.UI_BTNS.get("again").active=true;
            cc.tween(this.UI_BTNS.get("again")).to(0.2,{opacity:255}).start();
        },delayTime)
    }

    onOkClick(){
        this.hide();
        App.DataManager.clearTableData();
        App.SceneManager.backHall();
    }

    onAgainClick(){
        this.hide();
        App.SceneManager.loadScene("mainplayback","game101")
    }
}
