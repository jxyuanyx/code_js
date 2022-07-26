// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import CSlider from "../../../gamecore/ui/components/common/CSlider";
import { CONSTANTS } from "../../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Setting extends BaseDlg {

    @property(CSlider)
    musicSlider: CSlider = null;

    @property(CSlider)
    soundSlider: CSlider = null;

    UIBindData={
        title:"Setting"
    }

    beforeShow(){
        let musicVol=cc.sys.localStorage.getItem(CONSTANTS.VOL_MUSIC) || 0.5;
        let soundVol=cc.sys.localStorage.getItem(CONSTANTS.VOL_SOUND) || 0.5;

        this.musicSlider.progress=parseFloat(musicVol);
        this.soundSlider.progress=parseFloat(soundVol);

        this.musicSlider.setChangeCallBack((vol)=>{
            App.AudioManager.setBgmVol(vol);
        })

        this.soundSlider.setChangeCallBack((vol)=>{
            App.AudioManager.setSoundVol(vol);
        })
    }

    beforeHide(){
        let musicVol=this.musicSlider.progress;
        let soundVol=this.soundSlider.progress;

        cc.sys.localStorage.setItem(CONSTANTS.VOL_MUSIC,musicVol)
        cc.sys.localStorage.setItem(CONSTANTS.VOL_SOUND,soundVol)
    }


    onConfirmClick(){
      
        this.hide();

        App.DlgManager.showDlg("toast",{title:"Tips",content:"successfully"});
    }

}
