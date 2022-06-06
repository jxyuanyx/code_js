// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { PlayerInfo } from "../data/RoomData";
import FaceBarrage from "./FaceBarrage";
import { CircleSprite } from "../../../../common/tools/CircleSprite";
import cv from "../../../lobby/cv";

@ccclass
export default class BarrageHeadItem extends cc.Component {

    @property(cc.Node) selectImg: cc.Node = null;
    @property(cc.Node) roleHead: cc.Node = null;
    @property(cc.Label) roleName: cc.Label = null;
    @property(cc.Node) starBorder: cc.Node = null;
    private _playerData: PlayerInfo = null;
    private _faceView:FaceBarrage = null;
    start() {

    }

    /**
     * setFaceView
     */
    public setFaceView(faceView:FaceBarrage) {
        this._faceView = faceView;
    }
    /**
     * getPlayerId
     */
    public getPlayerId():number {
        if(this._playerData){
            return this._playerData.playerid;
        }
        return 0;
    }

    public onClick() {
        cv.AudioMgr.playButtonSound('button_click');
        if (this._faceView.currentCdStatus() || this._playerData == null) {
            return;
        }
        this.selectImg.active = !this.selectImg.active;
        this._faceView.onclickRoleHead(this._playerData.playerid, this.selectImg.active);
    }

    /**
     * 设置数据
     */
    public setData(data:PlayerInfo) {
        this.clearData();
        this._playerData = data;
        CircleSprite.setCircleSprite(this.roleHead,data.headurl, data.plat, true);
        this.roleName.string = this._playerData.name;
        if (this._playerData.identity == 1) {
            this.roleName.node.color = cc.color(208, 171, 110);
            this.starBorder.active = true;
        } else {
            this.roleName.node.color = cc.color(255, 255, 255);
            this.starBorder.active = false;
        }
    }

    /**
     * clearData
     */
    public clearData() {
        this._playerData = null;
        this.hideSelectImg();
        CircleSprite.cleanHeadNode(this.roleHead);
    }
    /**
     * getRoleName
     */
    public getRoleName():string {
        return this._playerData.name;
    }
    /**
     * 隐藏选择图片
     */
    public hideSelectImg() {
        this.selectImg.active = false;
    }

    /**
     * 显示
     */
    public showSelectImg() {
        this.selectImg.active = true;
    }
}
