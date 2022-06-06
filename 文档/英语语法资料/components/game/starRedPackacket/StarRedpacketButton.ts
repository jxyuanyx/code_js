import cv from "../../lobby/cv";
import StarRedpacketView from "./StarRedpacketView";
import StarRedpacketOpenView from "./StarRedpacketOpenView";
import StarRedpacketTips from "./StarRedpacketTips";
import RedGoldMove from "./RedGoldMove";
import game_protocol = require("../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

const {ccclass, property} = cc._decorator;

@ccclass
export default class StarRedpacketButton extends cc.Component {
    @property(cc.Label) time_text: cc.Label = null;
    @property(cc.Node) bg_time: cc.Node = null;
    
    @property(cc.Prefab) StarRedpacketView_prefab: cc.Prefab = null;
    @property(cc.Prefab) StarRedpacketOpenView_prefab: cc.Prefab = null;
    @property(cc.Prefab) StarRedpacketTips_prefab: cc.Prefab = null;
    @property(cc.Prefab) RedGoldMove_prefab: cc.Prefab = null;

    private _time: number = 0;
    private _starRedpacket:cc.Node = null;
    private _starRedpacketOpen:cc.Node = null;
    private _starRedpacketTips:cc.Node = null;
    private _redGoldMove:cc.Node = null;

    onLoad()
    {
        this._initRedGoldMove();
        this._initStarRedpacket();
        this._initStarRedpacketOpen();
        this._initStarRedpacketTips();
        cv.MessageCenter.register("star_redpacket_result", this.onStarRedpacketResult.bind(this), this.node);
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    onDestroy()
    {
        cc.director.getScheduler().unschedule(this.updataTime, this);
        cv.MessageCenter.unregister("star_redpacket_result", this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    private _initRedGoldMove()
    {
        let scene = cc.director.getScene();
        this._redGoldMove = scene.getChildByName("redGoldMove");
        if (this._redGoldMove == null) {
            this._redGoldMove = cc.instantiate(this.RedGoldMove_prefab);
            this._redGoldMove.name = "redGoldMove";
            scene.addChild(this._redGoldMove);
        }
    }

    private _initStarRedpacket()
    {
        let scene = cc.director.getScene();
        this._starRedpacket = scene.getChildByName("starRedpacket");
        if (this._starRedpacket == null) {
            this._starRedpacket = cc.instantiate(this.StarRedpacketView_prefab);
            this._starRedpacket.name = "starRedpacket";
            scene.addChild(this._starRedpacket);
        }
        this._starRedpacket.getComponent(StarRedpacketView).hideView();
    }

    private _initStarRedpacketOpen()
    {
        let scene = cc.director.getScene();
        this._starRedpacketOpen = scene.getChildByName("starRedpacketOpen");
        if (this._starRedpacketOpen == null) {
            this._starRedpacketOpen = cc.instantiate(this.StarRedpacketOpenView_prefab);
            this._starRedpacketOpen.name = "starRedpacketOpen";
            scene.addChild(this._starRedpacketOpen);
        }
        this._starRedpacketOpen.getComponent(StarRedpacketOpenView).hideView();
    }

    private _initStarRedpacketTips()
    {
        let scene = cc.director.getScene();
        this._starRedpacketTips = scene.getChildByName("starRedpacketTips");
        if (this._starRedpacketTips == null) {
            this._starRedpacketTips = cc.instantiate(this.StarRedpacketTips_prefab);
            this._starRedpacketTips.name = "starRedpacketTips";
            scene.addChild(this._starRedpacketTips);
        }
        this._starRedpacketTips.active = false;
    }

    public updateView()
    {
        this._starRedpacket.getComponent(StarRedpacketView).updateView();
        let newTime = Math.floor((new Date()).getTime() / 1000);
        this._time = cv.GameDataManager.tRoomData.starRedpacketInfo.left_time - newTime;
        this.bg_time.active = this._time > 0;
        this.updataTime(0);
        if (this._time > 0) {
            cc.director.getScheduler().unschedule(this.updataTime, this);
            cc.director.getScheduler().schedule(this.updataTime, this, 1);
        }
    }

    public runGoldMoveAction(start:cc.Node, end:cc.Node, callback: () => void)
    {
        let startPos = start.getParent().convertToWorldSpace(start.getPosition());
        let endPos = end.getParent().convertToWorldSpace(end.getPosition());
        let offset = cc.v2(40, 40);
        this._redGoldMove.getComponent(RedGoldMove).runGoldMoveAction(startPos, endPos, 0.8, 0.1, offset, callback);
    }
    
    private updataTime(time: number) {
        if (this._time >= 0) {
            let h = Math.floor(this._time / 3600);
            let m = Math.floor(this._time % 3600 / 60);
            let s = Math.floor(this._time % 60);
            let t: string = cv.StringTools.formatC("%02d:%02d:%02d", h, m, s);
            this.time_text.string = t;
            this._time -= 1;
        }
        else {
            cc.director.getScheduler().unschedule(this.updataTime, this);
            this.time_text.string = "";
            this.bg_time.active = false;
        }
    }

    public onBtnEvent()
    {
        cv.AudioMgr.playButtonSound('button_click');
        this._starRedpacket.getComponent(StarRedpacketView).showView();
    }

    private onStarRedpacketResult(msg:game_pb.LuckStarSeatDrawResultNotice)
    {
        if(msg.amount > 0) {
            this._starRedpacketOpen.getComponent(StarRedpacketOpenView).showView(msg);
        } else {
            if(cv.GameDataManager.tRoomData.identity != 1 && cv.GameDataManager.tRoomData.identity != 2) {
                let str = cv.config.getStringData("StarRedpacket_tips_label");
                this._starRedpacketTips.getComponent(StarRedpacketTips).show(str);
            }
        }

        // 面板开启的时候刷新数据
        if(this._starRedpacket.getComponent(StarRedpacketView).isShowView())
        {
            cv.gameNet.requestGetLuckStarSeatDrawList();
            if(msg.amount > 0) {
                cv.gameNet.requestGetSelfLuckStarSeatResultList();
            }
        }
    }

    OnAppEnterBackground(): void {

    }

    OnAppEnterForeground(): void {
        this.updateView();
    }
}
