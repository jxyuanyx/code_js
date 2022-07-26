// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { AppStatusEnum, CONSTANTS } from "../../../mainpackage/GameConfig";
import { ludo } from "../../net/protos/ludo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LudoGameover extends BaseDlg {

    @property(ListView)
    listView:ListView<any>=null;

    @property(sp.Skeleton)
    anim:sp.Skeleton=null;

    onLoad(): void {
        super.onLoad();
        this.anim.node.active=false;
    }

    afterShow(): void {
        let list=(this._data.data as ludo.EvtLudoGameOver).game_over_info;
        list.sort((a,b)=>a.rank-b.rank);

        let adapter=new ListAdapter(list);
        this.listView.setAdapter(adapter);

        let isWin=true;
        for(let i=0;i<list.length;i++){
            if(list[i].uid==App.DataManager.getSelfData().uid){
                isWin=list[i].win;
            }
        }
        this.anim.setAnimation(0,isWin?"shengli":"shibai",true);
        this.anim.node.active=true;
        if(isWin){
            App.AudioManager.playGameSound("sounds/win")
        }
    }

    onOkClick(){
        this.hide();
        App.DataManager.clearTableData();
        App.SceneManager.backHall();
        App.DataManager.setExtInfo(CONSTANTS.APP_STATUS,AppStatusEnum.HALL);
        let data=this._data.info;
        setTimeout(()=>{
            App.DlgManager.showDlg("record",{roomType:data.roomType,uuid:data.uuid,gameOverShow:true});
        },200)
    }

    // update (dt) {}
}
