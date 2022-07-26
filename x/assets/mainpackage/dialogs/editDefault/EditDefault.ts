// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { SelfData } from "../../../gamecore/models/SelfData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { getHead } from "../../gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export class EditDefault extends BaseDlg {
    showMode=DlgEnum.DOCK_BOTTOM;
    UIBindData={
        head1:null,
        head2:null,
    }
    @property(cc.ToggleContainer)
    toggleContainer: cc.ToggleContainer = null;

    @property(cc.Prefab)
    headInstance: cc.Prefab = null;

    private _toggle:number = 1
    private _userinfo:SelfData;
    private _headList:cc.Node[] = [];

    afterShow(){
        this._headList = [];
        this._toggle = 1;
        for (let index = 1; index < 32; index++) {
            let head = cc.instantiate(this.headInstance);
            this.toggleContainer.node.addChild(head);

            head.getComponent(cc.Sprite).spriteFrame = App.BundleManager.getCommonAtlas("mainpackage/head").getSpriteFrame(String(index));

            var checkEventHandler = new cc.Component.EventHandler();
            checkEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
            checkEventHandler.component = "EditDefault";
            checkEventHandler.handler = "onToggleClick";
            checkEventHandler.customEventData = String(index);

            head.getComponent(cc.Toggle).checkEvents.push(checkEventHandler);

            this._headList[index] = head;
        }







        // for (let index = 1; index < this.toggleContainer.node.childrenCount + 1; index++) {
        //     getHead(String(index),this.UIBindData["head"+index]);
        // }
        this._userinfo = App.DataManager.getSelfData();
        let head = this._userinfo.avatar;
        if (head) {
            let node = this._headList[head];
            if (!node) {
                node = this._headList[1];
            }
            node.getComponent(cc.Toggle).isChecked = true;
            this._toggle = Number(head);
        }
    }

    onToggleClick(render,index:number){
        this._toggle = index;
    }

    onOkClick(){
        this._data(this._toggle);
        this.hide();
        // App.HttpManager.post("profile/changeavatar",{avatar:String(this._toggle)},"PUT",this.node,(data:any)=>{
        //     App.DlgManager.showDlg("toast",{title:"提示",content:"更换头像成功"});
        //     this._userinfo.Avatar = String(this._toggle);
        //     // App.DataManager.setSelfData(this._userinfo);
        //     App.DlgManager.updateData("userInfo",null,"mainpackage");
        //     App.DlgManager.updateData("editInfo",null,"mainpackage");
        //     cc.game.emit(GameEvents.FLUSH_SELFDATA);
        // },()=>{
        //     App.LogManager.i("error:changeavatar")
        // });
    }
}
