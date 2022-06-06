// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../../../lobby/cv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DanmuItem extends cc.Component {

    @property(cc.Label) label: cc.Label = null;
    private _BarrageId;
    onLoad() {
        cv.MessageCenter.register("updateCdStatus",this.updateCdStatus.bind(this),this.node);
    }

    start() {
        let btnNode: cc.Node = cc.find("button", this.node);
        btnNode.on(cc.Node.EventType.TOUCH_START, (event:cc.Event.EventCustom)=>{
            if (this.isGameStarSeat()) {
                this.label.node.color = cc.color(120, 121, 129);
            }
        });
        btnNode.on(cc.Node.EventType.TOUCH_END, (event:cc.Event.EventCustom)=>{
            if (this.isGameStarSeat()) {
                this.label.node.color = cc.Color.WHITE;
            }
            this.danmuItemClick(null);
        });
        btnNode.on(cc.Node.EventType.TOUCH_CANCEL, (event:cc.Event.EventCustom)=>{
            if (this.isGameStarSeat()) {
                this.label.node.color = cc.Color.WHITE;
            }
        });
    }
    onDestroy(){
        cv.MessageCenter.unregister("updateCdStatus",this.node);
    }
    updateSVReuseData(index: number, dataArray: Array<any>): void {
        //console.log("updateSVReuseData - " + index);
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        this._BarrageId = dataArray[index].BarrageId;
        this.label.string = dataArray[index].content;
        if (cv.config.IS_FULLSCREEN) {
            this.label.node.getComponent(cc.Widget).left = 67;
            //立刻刷新widget
            cv.resMgr.adaptWidget(this.node, true);
        }
        this.initLanguage();
    }
    updateItemData(data: any): void {
        if (!data) {
            return;
        }
        this._BarrageId = data.BarrageId;
        this.label.string = data.content;
        this.label.node.getComponent(cc.Widget).left = 46;
        //立刻刷新widget
        cv.resMgr.adaptWidget(this.node, true);
    }

    public initLanguage() {

    }

    public danmuItemClick(event: cc.Component.EventHandler) {
        cv.MessageCenter.send("danmuItemClick", this._BarrageId);
    }

    /**
    * 根据是否处于cd中更新ui 或者弹幕功能是否已关闭
    */
    public updateCdStatus(isIncd) {
        if (isIncd) {
            this.label.node.color = cc.Color.GRAY;
        } else {
            this.label.node.color = cc.Color.WHITE;
        }
    }

    private isGameStarSeat(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat;
    }
}
