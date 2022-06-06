// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../lobby/cv";
const { ccclass, property } = cc._decorator;

@ccclass
export default class FaceSprine extends cc.Component {
    @property(cc.Node) bg_node: cc.Node = null;
    @property(cc.Label) gold_Label: cc.Label = null;

    public _node: cc.Node = null;
    private _tag: number = 0;

    public onClick(evt) {
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            cv.MessageCenter.send("on_showFace", { seatID: cv.GameDataManager.tRoomData.i32SelfSeat, face: this._tag });
            cv.gameNet.RequestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Emoji, cv.String(this._tag));
        }
        console.log(this._tag);
        this._node.active = false;
    }
    public updateView(idx: number, node: cc.Node) {
        this._tag = idx;
        this._node = node;
        let sk = this.bg_node.addComponent(sp.Skeleton);
        cv.resMgr.load(`zh_CN/game/dzpoker/animation/face/baseSpineAni_${idx}`, sp.SkeletonData, (spkeletonData: sp.SkeletonData): void => {
            sk.skeletonData = spkeletonData;
        }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
        //let item = cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee[idx];
        //this.gold_Label.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(item.needCoin));
        this.gold_Label.string = "0.2"
    }
}