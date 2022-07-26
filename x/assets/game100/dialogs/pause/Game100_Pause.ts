// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import CheckBox from "../../../gamecore/ui/components/common/CheckBox";
import { Game100Events } from "../../scripts/game100_enum";
import { ComDlgData } from "../comdlg/Game100_Dlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game100Pause extends BaseDlg {

    isFull=true;

    @property(cc.Node)
    mainView:cc.Node=null;

    @property(cc.Node)
    bottomView:cc.Node=null;

    //振动
    @property(CheckBox)
    vibratorCheckBox:CheckBox=null;

     //音乐
     @property(CheckBox)
     musicCheckBox:CheckBox=null;

    //声音
    @property(CheckBox)
    soundCheckBox:CheckBox=null;
 
    onLoad(){
        super.onLoad();
        this.mainView.active=true;
        this.mainView.y=66;
        this.bottomView.active=false;

        this._setting();
    }

    _setting(){
        let config=App.AudioManager.getGameConfig();
        this.vibratorCheckBox.checked=config.vibrator?true:false;
        this.musicCheckBox.checked=config.music>0?true:false;
        this.soundCheckBox.checked=config.sound>0?true:false;
        
        this.vibratorCheckBox.addSelectCallBack((checked)=>{
            if(checked){
                App.AudioManager.openGameVibrator();
            }else{
                App.AudioManager.closeGameVibrator();
            }
        })

        this.musicCheckBox.addSelectCallBack((checked)=>{
            App.AudioManager.setGameMusic(checked?App.AudioManager.getBgmVol():0)
        })

        this.soundCheckBox.addSelectCallBack((checked)=>{
            App.AudioManager.setGameSound(checked?App.AudioManager.getSoundVol():0)
        })
    }

    afterShow(){
        this.bottomView.active=true;
        this.bottomView.opacity=0;
        cc.tween(this.bottomView).to(0.2,{opacity:255}).start();
    }

    beforeHide(){
        this.bottomView.active=false;
    }

    // onExitClick(){
    //     //Game100Proto.op_finish();
    //     this.hide();
    //     cc.game.emit(Game100Events.GAMEOVER);
    // }

    onExitClick(){
        this.hide();
        let data:ComDlgData = new ComDlgData();
        data.title = App.LangManager.getTxtByCurrentGame("finishGame");
        data.group = [{name:App.LangManager.getTxtByCurrentGame("entry"),isExit:true,cb:()=>{
            cc.game.emit(Game100Events.GAME_CONTINUE);
        }},{name:App.LangManager.getTxtByCurrentGame("exitBtn"),isExit:true,cb:()=>{
            cc.game.emit(Game100Events.GAMEOVER,2); //主动结束弹GameOver
        }}];
        data.txt = App.LangManager.getTxtByCurrentGame("finishTxt");
        data.clickSpaceHide=false;
        App.DlgManager.showDlg("comdlg",data,"game100");
        
    }

    onContinueClick(){
        //Game100Proto.op_recover();
        cc.game.emit(Game100Events.GAME_CONTINUE);
        this.hide();
    }

    onGamehelpClick(){
        App.DlgManager.showDlg("help",null,"game100")
    }

    onScoreClick(){
        App.DlgManager.showDlg("point",null,"game100")
    }
    

}
