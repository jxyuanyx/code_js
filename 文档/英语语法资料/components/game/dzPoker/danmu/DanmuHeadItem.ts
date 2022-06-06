/**
 * @玩家头像
 */
const { ccclass, property } = cc._decorator;
import { PlayerInfo } from "../data/RoomData";
import FaceView from "./FaceView";
import { CircleSprite } from "../../../../common/tools/CircleSprite";
import cv from "../../../lobby/cv";
@ccclass
export default class DanmuHeadItem extends cc.Component {
    @property(cc.Node) select_img: cc.Node = null;
    @property(cc.Node) roleHead: cc.Node = null;
    private _playerData: PlayerInfo = null;
    private _faceView:FaceView = null;
    start() {

    }

    /**
     * setFaceView
     */
    public setFaceView(faceView:FaceView) {
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
        if (!this._faceView.onOff) {
            cv.TT.showMsg(cv.config.getStringData("Faceview_danmu_button_onOff_Tips"), cv.Enum.ToastType.ToastTypeWarning);
            return;
        }
        this.select_img.active = !this.select_img.active;
        if(this._playerData){
            this._faceView.onclickRoleHead(this._playerData.playerid,this.select_img.active);
        }else{
            console.log("@玩家头像数据为空");
        }
    }

    /**
     * 设置数据
     */
    public setData(data:PlayerInfo) {
        this.clearData();
        this._playerData = data;
        CircleSprite.setCircleSprite(this.roleHead,data.headurl, data.plat,false);
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
        this.select_img.active = false;
    }

    /**
     * 显示
     */
    public showSelectImg() {
        this.select_img.active = true;
    }
}
