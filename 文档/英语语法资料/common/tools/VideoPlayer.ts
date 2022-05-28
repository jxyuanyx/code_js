import LiveVideoFactory from "../../components/game/liveVideo/LiveVideoAdapter";
import cv from "../../components/lobby/cv";
/**
 * LiveVideo导出的方法有:
 * getFilePath() setFilePath(str)
 * mediaStatus()
 * playMedia() pauseMedia() stopMedia() seekToPosition(pos)
 * retain() release()
 * getPixelData() getPixelSize() getPixelWidth() getPixelHeight()
 * enableRealTime() disableRealTime()
 * enableInfiniteBuffer() disableInfiniteBuffer()
 * enableFramedrop() disableFramedrop()
 * setSyncAndMode(int syncType, ShowMode mode)
 * getDebugInfo() getDuration() getTime()
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class VideoPlayer extends cc.Component {
    //播放接口
    liveVideo: any = null;
    //web版专用
    cameraColor: cc.Color = null;

    private _finishPlayFunc = null;
    private _playProgressFunc = null;
    private _firstFrameFunc = null;

    private _bPauseVideo:boolean = false;  //当前是否暂停播放
    private _bEndOfVideo:boolean = false; //当前是否完整播完
    private _bCurIsFirstFrame:boolean = true;  //当前是否是第一帧

    private _delayTime:number = 0.1;   //1s大概渲染15帧，平均每一帧的时间1/15s;  此值减小误差，设置为0.1s


    onLoad() {
        var platform = cc.sys.isBrowser == true ? "web" : "native";
        if (cc.sys.isBrowser) {
            this.cameraColor = cc.Camera.main.backgroundColor;
            cc.Camera.main.backgroundColor = new cc.Color(0, 0, 0, 0);
            var img = this.getComponent(cc.Sprite);
            img.destroy();
        }

        this.liveVideo = LiveVideoFactory.getAdapter(platform);
        this.liveVideo.setSyncAndMode(0,0);
        this.liveVideo.disableFramedrop();
        this.liveVideo.disableRealTime();
        this.liveVideo.enableLayout();
    }

    update(dt: number) {
        if (cc.sys.isBrowser) {
            return;
        }

        var buff = null;
        var width = null;
        var height = null;
        if (this.liveVideo.loadFinish()) {
            buff = this.liveVideo.getPixelData();
            width = this.liveVideo.getPixelWidth();
            height = this.liveVideo.getPixelHeight();
            let img = this.getComponent(cc.Sprite);
            if (!img) {
                img = this.addComponent(cc.Sprite);
                img.spriteFrame = new cc.SpriteFrame(new cc.Texture2D());
                img.type = cc.Sprite.Type.SIMPLE;
                img.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            }
            if (buff) {
                let texture = img.spriteFrame.getTexture();
                texture.initWithData(buff, this.liveVideo.getPixelFormat(), width, height);
            }
        }

        if(!this._bPauseVideo && !this._bEndOfVideo &&  //没有暂停 或者播完后，防止后续update不断执行下面判断逻辑，加这个两个控制条件。
            this.liveVideo.getTime() > 0 && this.liveVideo.getDuration() > 0){
                //设置第一帧回调
                if(this._bCurIsFirstFrame && this._firstFrameFunc){
                    this._firstFrameFunc(buff, this.liveVideo.getPixelFormat(), width, height);
                    this._bCurIsFirstFrame = false;
                }

                //播放进度回调
                if(this._playProgressFunc){
                    this._playProgressFunc(this.liveVideo.getTime(), this.liveVideo.getDuration());
                }

                // 由于最后一帧渲染时间 比 视频总时间要提前一帧。
                // 所以，视频播放结束的时候getTime()可能比getDuration()的时间要小，所以要加this._delayTime的时间。
                if( this._finishPlayFunc && this.liveVideo.getTime() + this._delayTime >= this.liveVideo.getDuration()){
                    //播放时间结束
                    this._finishPlayFunc();
                    this._bEndOfVideo = true;
                }
        }
    
    }

    onDestroy(): void {
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
        if (cc.sys.isBrowser) {
            cc.Camera.main.backgroundColor = this.cameraColor; //zan shi wu yong
        }
    }

    //开始播放视频  
    //videoPath: 视频路径，可以是远程url路径 或者 本地路径
    public playVideo(videoPath: string) {
        console.log("####################videoPath: " + videoPath);
        this.node.stopAllActions();
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
            this.liveVideo.setFilePath(videoPath);
            this.liveVideo.playMedia();
            this._bEndOfVideo = false;
            this._bPauseVideo = false;
            this._bCurIsFirstFrame = true;
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.playVideo, this, videoPath)));
        }
    }
    //暂停/恢复播放是同一个接口
    public pauseVideo() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.pauseMedia();
            this._bPauseVideo = !this._bPauseVideo; //设置暂停/恢复播放标志
        }
    }
    public seekToPosition(pos) {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.seekToPosition(pos);
        }
    }

    //停止视频播放
    public stopVideo() {
        if (this.liveVideo.loadFinish()) {
            this.liveVideo.stopMedia();
        }
    }

    //设置播放结束回调函数
    public  setPlayFinishCallback(finishPlayFunc:Function){
        this._finishPlayFunc = finishPlayFunc;
    }


    //设置播放进度回调函数
    public  setPlayProgressCallback(playProFunc:Function){
        this._playProgressFunc = playProFunc;
    }

    //设置第一帧的回调
    public setFirstFrameCallback(frameFunc:Function){
        this._firstFrameFunc = frameFunc;
    }
}
