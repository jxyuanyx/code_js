import cv from "../../lobby/cv";
import LiveVideoFactory from "./LiveVideoAdapter";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LiveVideoComp extends cc.Component {

    liveVideo: any = null;
    autoPlayOnLoadFinish: boolean = true;
    url: string = "";
    renderClk: number = 0;
    cameraColor: cc.Color = null;

    onLoad() {
        var platform = cc.sys.isBrowser == true ? "web" : "native";
        this.liveVideo = LiveVideoFactory.getAdapter(platform);
        //LiveVideo导出的方法有:
        // getFilePath() setFilePath(str)
        // mediaStatus()
        // playMedia() pauseMedia() stopMedia() seekToPosition(pos)
        // retain() release()
        // getPixelData() getPixelSize() getPixelWidth() getPixelHeight()
        // enableRealTime() disableRealTime()
        // enableInfiniteBuffer() disableInfiniteBuffer()
        // enableFramedrop() disableFramedrop()
        // setSyncAndMode(int syncType, ShowMode mode)
        // getDebugInfo() getDuration() getTime()
        //
        this.liveVideo.setMediaStopTimeOutCb(this._mediaStopTimeOut, this);
        this.liveVideo.setMediaReadyTimeOutCb(this._mediaReadyTimeOut, this);
        this.liveVideo.setMediaPlayTimeOutCb(this._mediaPlayTimeOut, this);
        this.liveVideo.enableLayout();
        this.registerMsg();
    }
    start(): void {
        if (cc.sys.isBrowser) {
            this.cameraColor = cc.Camera.main.backgroundColor;
            cc.Camera.main.backgroundColor = new cc.Color(0, 0, 0, 0);
            var img = this.getComponent(cc.Sprite);
            img.destroy();
        }
    }

    update(dt: number) {
        if (cc.sys.isBrowser) {
            return;
        }
        var img = this.getComponent(cc.Sprite);
        var texture = img.spriteFrame.getTexture();
        if (texture && this.liveVideo.loadFinish()) {
            var buff = this.liveVideo.getPixelData();
            var width = this.liveVideo.getPixelWidth();
            var height = this.liveVideo.getPixelHeight();
            if (buff) {
                texture.initWithData(buff, this.liveVideo.getPixelFormat(), width, height);
            }
        }
    }

    onDestroy(): void {
        cv.MessageCenter.unregister("LiveVideo_onChangeXianLu", this.node);
        cv.MessageCenter.unregister("onExitCowboyLiveVideo", this.node);
        cv.MessageCenter.unregister("onBackMainScene", this.node);
        cv.MessageCenter.unregister("videoCowBoyToLogout", this.node);
        cv.MessageCenter.unregister("stopVideoCowBoy", this.node);
        cv.MessageCenter.unregister("playVideoCowBoy", this.node);
        cv.MessageCenter.unregister("onLeave_room_succ", this.node);
        this.node.stopAllActions();
        if (this.liveVideo.loadFinish()) {
            if (this.liveVideo.mediaStatus() == 0) {
                this.liveVideo.release();
                console.log("this.liveVideo.mediaStatus() == 0");
            } else {
                this.liveVideo.stopMedia();
                console.log("this.liveVideo.mediaStatus() != 0");
            }
        }
        this.liveVideo.disableLayout();
        if (cc.sys.isBrowser && this.cameraColor) {
            cc.Camera.main.backgroundColor = this.cameraColor; //zan shi wu yong
        }
    }

    registerMsg() {
        cv.MessageCenter.register("LiveVideo_onChangeXianLu", this.onChangeXianLu.bind(this), this.node);
        cv.MessageCenter.register("onExitCowboyLiveVideo", this.onExitCowboyLiveVideo.bind(this), this.node);
        cv.MessageCenter.register("onBackMainScene", this.onBackMainScene.bind(this), this.node);
        cv.MessageCenter.register("videoCowBoyToLogout", this.onLogout.bind(this), this.node);
        cv.MessageCenter.register("stopVideoCowBoy", this.onStopVideo.bind(this), this.node);
        cv.MessageCenter.register("playVideoCowBoy", this.onPlayVideo.bind(this), this.node);
        cv.MessageCenter.register("onLeave_room_succ", this.onLeaveRoomSucc.bind(this), this.node);
    }

    onChangeXianLu(path: string) {
        this.node.stopAllActions();
        if (this.liveVideo.loadFinish()) {
            this.autoPlayOnLoadFinish = false;
            var filePath = this.liveVideo.getFilePath();
            var msVal = this.liveVideo.mediaStatus();
            if (filePath === path && (msVal == 1 || msVal == 2)) {
                return;
            }
            this.liveVideo.stopMedia();
            this.liveVideo.setFilePath(path);
            this._onPlayMedia();
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.onChangeXianLu, this, path)));
        }
        this.url = path;
        // console.log("this.url=" + this.url);
    }
    _onPlayMedia() {
        this.node.stopAllActions();
        if (this.liveVideo.mediaStatus() == 0) {
            this.renderClk = Date.now();
            this.liveVideo.playMedia();
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this._onPlayMedia, this, null)));
        }
    }

    onExitCowboyLiveVideo() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
            this._doExitCowboyLiveVideo();
        }
    }
    _doExitCowboyLiveVideo() {
        this.node.stopAllActions();
        if (this.liveVideo.mediaStatus() == 0) {
            this.destroy();
            cv.MessageCenter.send("toRealBackMainScene");
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this._doExitCowboyLiveVideo, this, null)));
        }
    }

    onLeaveRoomSucc() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
            this._doLeaveRoomSucc();
        }
    }
    _doLeaveRoomSucc() {
        this.node.stopAllActions();
        if (this.liveVideo.mediaStatus() == 0) {
            this.destroy();
            cv.MessageCenter.send("on_cowboy_leave_room_succ");
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this._doLeaveRoomSucc, this, null)));
        }
    }

    onBackMainScene() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
            this._doBackMainScene();
        }
    }
    _doBackMainScene() {
        this.node.stopAllActions();
        if (this.liveVideo.mediaStatus() == 0) {
            this.destroy();
            cv.MessageCenter.send("toRealBackMainScene");
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this._doBackMainScene, this, null)));
        }
    }

    onLogout() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
            this._doLogout();
        }
    }
    _doLogout() {
        this.node.stopAllActions();
        if (this.liveVideo.mediaStatus() == 0) {
            this.destroy();
            cv.netWorkManager.onThredEndTologout();
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this._doLogout, this, null)));
        }
    }


    onPlayVideo() {
        if (this.liveVideo.loadFinish()) {
            var msVal = this.liveVideo.mediaStatus();
            if (msVal == 2) {
                return;
            }
            this._onPlayMedia();
        }
    }
    onPauseVideo() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.pauseMedia();
        }
    }
    onSeekToPosition(pos) {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.seekToPosition(pos);
        }
    }
    onStopVideo() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
        }
    }

    _mediaStopTimeOut() {
        console.log("->mediaStopTimeOut");
        //CustomEvent evtZero;
        if (cc.sys.isBrowser) {
            cv.MessageCenter.send("on_videocowboy_showVideoStatusTips");
        } else if (Date.now() - this.renderClk >= 5000) {
            cv.MessageCenter.send("on_videocowboy_showVideoStatusTips");
            this._onPlayMedia();
        }
    }
    _mediaReadyTimeOut() {
        console.log("->mediaReadyTimeOut");
        //CustomEvent evtOne;
        if (cc.sys.isBrowser) {
            cv.MessageCenter.send("on_videocowboy_showVideoStatusTips");
        } else if (Date.now() - this.renderClk >= 5000) {
            cv.MessageCenter.send("on_videocowboy_showVideoStatusTips");
            this.liveVideo.stopMedia();
            this._onPlayMedia();
        }
    }
    _mediaPlayTimeOut() {
        console.log("->mediaPlayTimeOut");
        //CustomEvent evtTwo;
        if (cc.sys.isBrowser) {
            cv.MessageCenter.send("on_videocowboy_showVideoStatusTips");
        } else if (Date.now() - this.renderClk >= 5000) {
            cv.MessageCenter.send("on_videocowboy_showVideoStatusTips");
            this.liveVideo.stopMedia();
            this._onPlayMedia();
        }
    }
}
