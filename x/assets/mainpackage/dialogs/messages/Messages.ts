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
import { EVENT_REDTIP, RedTipService, REDTIP_MODULE } from "../../services/RedTipService";
import MessageItem from "./MessageItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Messages extends BaseDlg {
    
    showMode=DlgEnum.R2L;

    @property(cc.Node)
    scrollview:cc.Node = null;
    
    @property(ListViewDynamic)
    listView:ListViewDynamic;

    @property(cc.Label)
    label: cc.Label = null;

    @property([cc.Node])
    redTips:cc.Node[]=[];

    private _messageList:any[]=[];

    private _curIndex:number = 0;

    private _pageSize:number=0;

    beforeShow(){
        RedTipService.getInstance().activeRedTip(this.redTips[0],REDTIP_MODULE.MENU_MESSAGE);
        RedTipService.getInstance().activeRedTip(this.redTips[1],REDTIP_MODULE.ANNOUNCEMENT);
        cc.game.on(EVENT_REDTIP,this._udpateRedTip,this);
    }

    afterHide(){
        cc.game.off(EVENT_REDTIP,this._udpateRedTip,this);
    }


    _udpateRedTip(key:number,num:number){
        if(key==REDTIP_MODULE.MENU_MESSAGE){
            RedTipService.getInstance().activeRedTip(this.redTips[0],REDTIP_MODULE.MENU_MESSAGE);
        }
        else if(key == REDTIP_MODULE.ANNOUNCEMENT){
            RedTipService.getInstance().activeRedTip(this.redTips[1],REDTIP_MODULE.ANNOUNCEMENT);
        }
    }

    async onDeleteClick(){
        await App.HttpManager.postAsync(`message_api/${this._curIndex==0?"read_system_message":"read_announcement"}`,{read_all:1},true);
        this.onToggleClick(null,this._curIndex);
        if (this._curIndex==0) {
            App.DlgManager.showDlg("toast",{title:"Tips",content:"All system information have been read"});
            RedTipService.getInstance().clearRedTip(REDTIP_MODULE.MENU_MESSAGE);
        }
        else if(this._curIndex==1){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"All announcements have been read"});
            RedTipService.getInstance().clearRedTip(REDTIP_MODULE.ANNOUNCEMENT);
        }

    }

    afterShow(){
        let adapter=new ListAdapterDynamic(this._messageList);
        this.listView.setAdapter(adapter);
        this._pageSize=Math.ceil(this.listView.node.getChildByName("view").height/this.listView.getColumnWH())*2;
        this.listView.pager.setNextPageListener((pageSize:number,pageNo:number)=>{
            this._getPage(pageSize,pageNo,this._curIndex);
        });
        adapter.setOnItemClickListener(async (adapter,index)=>{
            let data=adapter.getItem(index);
            App.DlgManager.showDlg("messagecontent",data);
            if(data.status==0){
                data.status=1;
                this.listView.notifyUpdate();
                await App.HttpManager.postAsync(`message_api/${this._curIndex==0?"read_system_message":"read_announcement"}`,{msg_id:data.msg_id});
                //处理红点
                RedTipService.getInstance().updateRedTipStatus((this._curIndex==0)?REDTIP_MODULE.MENU_MESSAGE:REDTIP_MODULE.ANNOUNCEMENT,-1);
            }
        },this)
        this.onToggleClick(null,0);
    }

    _setInfo(index:number = 0){
        this._messageList = [];
        this._getPage(this._pageSize,0,index);
    }

    async _getPage(pageSize:number,pageNo:number,index:number){
        GameHelper.removeEmptyDataView(this.listView.node);
        let data;
        if(index==0){
            data=await App.HttpManager.postAsync("message_api/get_system_message",{page_no:pageNo,page_size:pageSize},true);
        }else{
            data=await App.HttpManager.postAsync("message_api/get_announcement",{page_no:pageNo,page_size:pageSize},true);
        }
        if(!data.msg_list?.length){
            GameHelper.addEmptyDataView(this.listView.node);
        }
        this.listView.pager.addPageDatas(data.msg_list);
    }

    onToggleClick(render,data){
        this._curIndex = data;
        GameHelper.removeEmptyDataView(this.scrollview.getChildByName("view"));
        if (data == 0) {
            
        }
        else if (data == 1){

        }
        this.listView.getAdapter().clear();
        this._setInfo(Number(data));
    }


}
