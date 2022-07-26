// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import GameHelper from "../../../../gamecore/tools/GameHelper";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";
import { ADAPTER_PROFIL, BaseListViewAdapter, ListViewNew, LIST_ITEM_CLICK, REQUEST_EVENTS } from "../../../../gamecore/ui/components/common/ListViewNew";
import PageBase from "../../../../mainpackage/hall/scripts/PageBase";

const {ccclass, property} = cc._decorator;

const enum AdapterNames{
    normal="mormal",
    title="title"
}

const enum REQUEST_TYPE{
    PROGRESS,
    FINISH
}

@ccclass
export default class RecordPageCheck extends PageBase {
    @property(ListViewNew)
    listView:ListViewNew=null;

    @property(cc.Prefab)
    instance1:cc.Prefab=null;

    @property(cc.Prefab)
    instance2:cc.Prefab=null;

    private _initPageInfo:boolean=false;

    private _pageSize:number=0;

    private _requestType:REQUEST_TYPE=null;

    private _loadDataView:cc.Node=null;


    onLoad(){
        // super.onLoad();
        let adapter=new BaseListViewAdapter(AdapterNames.normal,this.instance1);
        let adapter1=new BaseListViewAdapter(AdapterNames.title,this.instance2);
        this.listView.addAdapter(adapter).addAdapter(adapter1);
        this.listView.node.on(REQUEST_EVENTS.FLUSHING,this._onGetNextPage,this);
        //this.listView.node.on(REQUEST_EVENTS.END,this._onEndPage,this);
        adapter.on(LIST_ITEM_CLICK,this._onItemClick,this);
        adapter1.on(LIST_ITEM_CLICK,this._onItemClick,this);

        this._loadDataView=GameHelper.addDataLoading(this.listView.node);
    }
    
    _onItemClick(data:any,index:number){
        cc.log("onItemClick>>>>>>>>>>>>>>>");
        App.DlgManager.showDlg("record",{roomType:data.room_type,uuid:data.uuid,gameOverShow:false});
    }


    _onGetNextPage(pageNo:number,pageSize:number){
        console.log("获取下一页数据",pageNo,this._pageSize);
        this._getPage(pageSize,pageNo);
    }


    async _getPage(pageSize:number,pageNo:number){
        let data=await this._getFinishData(pageNo,this._pageSize);

        //@ts-ignore
        let finishData=data?.finished
        
        if(finishData&&finishData.length==0)return;


        finishData.map((item:any)=>{
            item[ADAPTER_PROFIL]=AdapterNames.normal;
        });
        
        this.listView.addData(finishData);

    }

    onDisable(){
        this.listView.reset();
        this.listView.scrollView.content.height=0;
        this.listView.scrollView.content.removeAllChildren();
        GameHelper.removeEmptyDataView(this.listView.node.getChildByName("view"));
    }

    public onStartMove(): void {
    
    }

    public onMoveFinished(): void {

    }

    public onEnable(): void {
        this._requestType=null;
        this._initPageInfo=false;
        this.listView.reset();
        this._loadDataView.active=true;
        this._pageSize=Math.ceil(this.listView.node.height/this.listView.maxHeight)*2;

        this._initData();
    }

    private async _getFinishData(pageNo,pageSize){
        let node=this.node;
        return new Promise(function(resolve,reject){
            App.HttpManager.post("record_api/game_record_list",{page_no:pageNo,page_size:pageSize},node,(data:any)=>{
                resolve(data);
            },()=>{
                reject([]);
            })
        })
    }

    async _initData(){
        let data=await this._getFinishData(0,this._pageSize);
        //@ts-ignore
        let inProgressData=data?.in_progress
        //@ts-ignore
        let finishData=data?.finished

        //@ts-ignore
        let list=inProgressData.concat(finishData);
        
        list.map((item:any)=>{
            item[ADAPTER_PROFIL]=AdapterNames.normal;
        });

        if(inProgressData&&inProgressData.length>0){
            inProgressData[0].titleType=1;
            inProgressData[0][ADAPTER_PROFIL]=AdapterNames.title;

        }

        if(finishData&&finishData.length>0){
            finishData[0].titleType=2;
            finishData[0][ADAPTER_PROFIL]=AdapterNames.title;
        }
        
        this.listView.addData(list);
        this._loadDataView.active=false;
        if(list.length==0){
            GameHelper.addEmptyDataView(this.listView.node.getChildByName("view"));
        }
    }
    

    flushData(){
        
    }

}
