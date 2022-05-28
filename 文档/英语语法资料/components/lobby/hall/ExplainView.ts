// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../cv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExplainView extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    item: cc.Node = null;

    lab_arr: cc.Node[] = [];
    maxWidth: number = 0;
    isShow: boolean = false;

    public show(str: string, len: number, worldPos: cc.Vec3, zIndex: number) {
        if (len <= 0) return;
        let msg: string[] = [];
        for (let i = 0; i < len; i++) {
            msg.push(cv.config.getStringData(str + i));
        }
       
        this._showTips(msg, len, worldPos, zIndex)
    }


    public showCommonTips(msg: string[],  worldPos: cc.Vec3, zIndex: number){
        this._showTips(msg, msg.length, worldPos, zIndex)
    }
    

    public hide(){
        if(cc.isValid(this.node)){
            this.node.active = false;
            this.isShow = false;
        }
    }


    private _showTips(str: string[], len: number, worldPos: cc.Vec3, zIndex: number){
        if (len <= 0) return;
        let msg: string[] = str;

        this.isShow = true;

        cv.action.createShieldLayer(this.node.parent, "explainView_shaield", zIndex - 1, undefined, undefined, (event: cc.Event) => {
            cv.action.removeShieldLayer(this.node.parent, "explainView_shaield");
            this.node.active = false;
            this.isShow = false;
        })
        this.node.active = true;

        let pos = this.node.parent.convertToNodeSpaceAR(worldPos);
        this.node.setPosition(pos);
        this.node.zIndex = zIndex;
        len = this.lab_arr.length;
        let msgLen = msg.length;
        if (msgLen < len) {
            for (let i = len - 1; i >= msgLen; i--) {
                let temp = this.lab_arr[i];
                temp.removeFromParent(true);
                temp.destroy();
                this.lab_arr.pop();
            }
        }
        else {
            for (let i = 0; i < msgLen - len; i++) {
                let temp = cc.instantiate(this.item);
                this.bg.addChild(temp);
                this.lab_arr.push(temp);
            }
        }

        this.maxWidth = 0;
        let totalHeigh = 0;
        for (let i = 0; i < msgLen; i++) {
            let item = this.lab_arr[i];
            let size = cv.resMgr.getLabelStringSize(item.getComponent(cc.Label), msg[i]);
            totalHeigh += size.height;
            if (size.width > this.maxWidth) {
                this.maxWidth = size.width;
            }
            item.active = true;
        }

        this.bg.setContentSize(100 + this.maxWidth, totalHeigh + (msgLen - 1) * 10 + 30);
        cv.resMgr.adaptWidget(this.bg, true);
        let tempW = (100 + this.maxWidth) * 0.5 - worldPos.x + 20;
        if (tempW > 0) {
            this.bg.setPosition(tempW, this.bg.y);
        }
        else {
            this.bg.setPosition(0, this.bg.y);
        }
    }

}
