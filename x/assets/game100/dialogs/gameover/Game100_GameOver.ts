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
import { core } from "../../../gamecore/net/protos/proto";

const {ccclass, property} = cc._decorator;

const YELLOWCOLOR=cc.Color.WHITE.fromHEX("#FFF21E");

@ccclass
export default class Game100GameOver extends BaseDlg {
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

    afterShow(){

        if (this._data.Reason == 0) {
            this.UIBindData.gameOverTitle = "Game Complete"
        }
        else if (this._data.Reason == 1){
            this.UIBindData.gameOverTitle = "Time's Up";
        }
        else{
            this.UIBindData.gameOverTitle = "Game Over";
        }

      

        let oldAverageScore=Math.floor(this._data.TotalScore/this._data.TotalRound);

        let all = this._data.reward.Score+this._data.reward.TimeScore;
       // this.UIBindData.totalScore=all;
        this.UIBindData.timeScore=this._data.reward.TimeScore;
        this.UIBindData.gameScore=this._data.reward.Score;
        this.UIBindData.dayBestScore=Math.max(this._data.TodayBestScore,all);
        this.UIBindData.dayHistoryScore=Math.max(this._data.LiftBestScore,all);
        
        let gameScoreNode=this.UI_LBS.get("gameScore");
        gameScoreNode.x=570;

        cc.tween(gameScoreNode)
        .to(0.3,{x:264})
        .call(()=>{
            App.AudioManager.playGameSound("sounds/Score1");
        }).start();

        let delayTime=0.5;


        this.scheduleOnce(()=>{
            let timeScoreNode=this.UI_LBS.get("timeScore");
            timeScoreNode.x=570;
            cc.tween(timeScoreNode)
            .to(0.3,{x:264})
            .call(()=>{
                App.AudioManager.playGameSound("sounds/Score2");
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
            let nodes=[this.node.getChildByName("node1"),this.node.getChildByName("node2"),this.node.getChildByName("node3")];
            for(let i=0;i<nodes.length;i++){
                let node=nodes[i];
                node.scale=1.2;
                cc.tween(node).to(0.2,{opacity:255,scale:1}).start();
            }
        },delayTime);

        delayTime+=0.2;

        this.scheduleOnce(()=>{
            this.UI_BTNS.get("ok").opacity=0;
            this.UI_BTNS.get("ok").active=true;
            cc.tween(this.UI_BTNS.get("ok")).to(0.2,{opacity:255}).start();
        },2.2)

        //算平均分的加减
        let newAverage=Math.floor((this._data.TotalScore+all)/(this._data.TotalRound+1));
        this.UIBindData.averageScore=newAverage;
        let addView=this.node.getChildByName("node1").getChildByName("layout").getChildByName("add");
        let lowView=this.node.getChildByName("node1").getChildByName("layout").getChildByName("low");
        let addAverageScoreView=this.UI_LBS.get("addAverageScore");
        addView.active=false;
        lowView.active=false;
        addAverageScoreView.active=false;
        if(newAverage>oldAverageScore){
            addView.active=true;
            this.UIBindData.addAverageScore="+"+(newAverage-oldAverageScore);
            addAverageScoreView.color=cc.Color.GREEN;
            addAverageScoreView.active=true;

            let node=this.UI_LBS.get("averageScore");
            node.color=YELLOWCOLOR;

        }else if(newAverage<oldAverageScore){
            lowView.active=true;
            this.UIBindData.addAverageScore=(newAverage-oldAverageScore).toString();
            addAverageScoreView.active=true;
            addAverageScoreView.color=cc.Color.RED;
        }

        

        if(this._data.TodayBestScore<all){
            let node=this.UI_LBS.get("dayBestScore");
            node.color=YELLOWCOLOR;
            node.parent.getChildByName("new").active=true;
        }

        if(this._data.LiftBestScore<all){
            let node=this.UI_LBS.get("dayHistoryScore");
            node.color=YELLOWCOLOR;
            node.parent.getChildByName("new").active=true;
        }
    }

    onOkClick(){
        cc.game.emit(GameEvents.UPLOAD_GAME_RESULT,this._data.Steps);
    }
}
