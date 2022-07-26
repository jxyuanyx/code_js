// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import GameHelper from "../../../gamecore/tools/GameHelper";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapterDynamic from "../../../gamecore/ui/components/common/ListAdapterDynamic";
import ListViewDynamic from "../../../gamecore/ui/components/common/ListViewDynamic";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OffLineHistory extends BaseDlg {
    showMode=DlgEnum.FADE;

    @property(ListViewDynamic)
    listView:ListViewDynamic=null;


    private _pageSize:number=20;

    afterShow(){
        let adapter=new ListAdapterDynamic(this._data);
        this.listView.setAdapter(adapter);
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(pageSize,this._pageSize);
        });
        adapter.setOnItemClickListener(this._onItemClick,this);
    }

    _onItemClick(data:ListAdapterDynamic,index:number){
        let itemData=data.getItem(index);
        itemData.isFinished=true;
        itemData.fromOffline=true;
        itemData.roomType=itemData.room_type;
        itemData.gameOverShow=false;
        App.DlgManager.showDlg("record",itemData);
    }


    async _getPage(pageSize:number,pageNo:number){
        let data=await App.HttpManager.postAsync("record_api/offline_game_record",{page_no:pageNo,page_size:pageSize});
        this.listView.pager.addPageDatas(data.finished);

    }

    beforeHide(){
        
    }

}
