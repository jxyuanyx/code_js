import VideoPlayer from "../../common/tools/VideoPlayer";
import cv from "../lobby/cv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class loadingAd extends cc.Component {

    @property(cc.Sprite) spAdImg: cc.Sprite = null;  //广告图片
    @property(cc.VideoPlayer) vpAdVideo: cc.VideoPlayer = null;  //视频播放器
    @property(cc.Node) ndVideo: cc.Node = null;  //视频播放节点

    @property(cc.Node) DurationClose: cc.Node = null;
    @property(cc.Label) DurationStr: cc.Label = null;
    @property(cc.Label) Unit: cc.Label = null;
    @property(cc.Node) Line: cc.Node = null;
    @property(cc.Node) btnPicClose: cc.Node = null;
    @property(cc.Node) btnVideoClose: cc.Node = null;

    private _audioSource: cc.AudioClip = null; //音频资源
    private _curAudioID: number = -1;
    private _adInfo: any;
    private _finishCb: Function;
    private _liveVideoPlayer = null;
    public silenceMusic: string = "zh_CN/game/dzpoker/audio/silence2";

    private _bViedoFirstPixel: boolean = true;

    onLoad() {
        cv.MessageCenter.register("onVideoFinish", this.onVideoADCloseFunc.bind(this), this.node);
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    onDestroy() {
        cv.MessageCenter.unregister("onVideoFinish", this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    OnAppEnterBackground(): void {
        if (this._liveVideoPlayer) {
            console.log("loadingAd 进入后台");
            this._liveVideoPlayer.pauseMedia();
            if (cc.sys.OS_IOS === cc.sys.os && this._curAudioID != -1) {
                cc.audioEngine.pauseEffect(this._curAudioID);
            }
        }
    }

    OnAppEnterForeground(): void {
        if (this._liveVideoPlayer) {
            console.log("loadingAd 进入前台");
            this._liveVideoPlayer.pauseMedia();  //恢复和暂停播放 都是使用 pauseMedia接口
            if (cc.sys.OS_IOS === cc.sys.os && this._curAudioID != -1) {
                cc.audioEngine.resumeEffect(this._curAudioID);
            }
        }
    }

    start() { }

    showAd(adInfo: any, finishCb: Function) {
        this._adInfo = adInfo;
        this._finishCb = finishCb;

        this.spAdImg.node.active = false;
        this.vpAdVideo.node.active = false;
        this.DurationClose.active = false;
        this.DurationStr.string = this._adInfo.AdDisplayTime;
        this.ndVideo.active = false;
        this.btnVideoClose.active = false;


        if (this._adInfo.AdType == 1) {  //图片
            this._showImgAd();
        } else if (this._adInfo.AdType == 2) {  //视频

            if (cc.sys.isNative) {

                if (cc.sys.OS_IOS === cc.sys.os) {
                    //由于ios播放视频暂时没有声音，所以先加载视频中的音频资源
                    cv.CacheUtils.loadAudioclipByVideo(this._adInfo.AdUrl, (res: any) => this._showVideoAd(res, true), (errCode: number) => this.onClickClose());
                } else {
                    //Android直接播放视频
                    this._showVideoAd(null, true);
                }

            } else {
                //web上面不播放广告视频
                this.onClickClose();
            }
        } else {
            this.onClickClose();
        }
    }


    //资源适配
    setAdPageFitScale(adShowNode: cc.Node) {

        //手机广告资源的分辨率是 宽x高  1440 x 3120   手机是上下留有安全空白区域
        //ipad的广告资源分辨率是 宽x高  2048 x 2732    ipad是左右留有安全空白区域
        if (this._adInfo.AdType == 2) { //视频广告
            if (cv.config.IS_WIDESCREEN) {
                adShowNode.setContentSize(cc.size(2048, 2732));
            } else {
                adShowNode.setContentSize(cc.size(1440, 3120));
            }
        }

        let width = adShowNode.getContentSize().width;
        let height = adShowNode.getContentSize().height;

        if (cv.config.IS_WIDESCREEN) {
            //ipad    高完全显示出来
            let scale = cc.winSize.height / height;
            if (width <= cc.winSize.width) {     //如果图片广告设计的最高宽度，等于小于设备宽度
                //针对ipad pro（2732 x 2048）有电量状态栏处理, 高度被压缩，导致宽度减小，不满屏.
                //此时宽和高单独缩放。
                adShowNode.scaleX = cc.winSize.width / width;
                adShowNode.scaleY = scale;
            } else {
                adShowNode.setScale(scale);
            }

        } else {
            //手机广告 宽完全显示出来
            let scale = cc.winSize.width / width;
            adShowNode.setScale(scale);
        }
    }

    //显示图片广告
    _showImgAd() {

        cv.CacheUtils.load(this._adInfo.AdUrl, (spf: cc.SpriteFrame) => {
            this._hideStatusView();
            this.spAdImg.node.active = true;
            this.spAdImg.spriteFrame = spf;
            this.setAdPageFitScale(this.spAdImg.node);  //进行适配
            this._fadeIn();
        }, (errCode: number) => this.onClickClose());
    }

    //显示视频广告
    _showVideoAd(resource: any, isNative: boolean) {
        this.setAdPageFitScale(this.ndVideo);
        if (!cc.sys.isNative) {
            //网页版用creator videoPlayer播放
            let playFunc = () => {
                !this.vpAdVideo.isPlaying() && this.vpAdVideo.play();
            }

            this.vpAdVideo.node.active = true;
            this.vpAdVideo.node.on("ready-to-play", playFunc, this);
            this.vpAdVideo.node.on("clicked", playFunc, this);
            this.vpAdVideo.node.on("completed", this.onClickClose, this);

            this.vpAdVideo.resourceType = isNative ? cc.VideoPlayer.ResourceType.LOCAL : cc.VideoPlayer.ResourceType.REMOTE;
            if (isNative) this.vpAdVideo.clip = resource; else this.vpAdVideo.remoteURL = resource;
            return;
        } else {
            this._audioSource = null;
            this._curAudioID = -1;
            if (cc.sys.OS_IOS === cc.sys.os && resource instanceof cc.AudioClip) {
                //ios的播放视频
                console.log("get audio source clip from mp4 video.");
                this._audioSource = resource;
            }

            //原生包用livevoide控件
            this.vpAdVideo.node.removeFromParent(true);
            this.vpAdVideo.node.destroy();
            this.vpAdVideo = null;
            this.ndVideo.active = true;

            this.ndVideo.opacity = 0; //为了视频淡入效果，一开始透明度设置为0
            let path = cv.CacheUtils.convertUrlToCachePath(this._adInfo.AdUrl);
            this._liveVideoPlayer = this.ndVideo.getComponent(VideoPlayer);
            this._liveVideoPlayer.setPlayFinishCallback(this.onVideoADCloseFunc.bind(this));  //视频播放结束回调
            this._liveVideoPlayer.setFirstFrameCallback(this.onVideoFirstFrameFunc.bind(this)); //第一帧回调
            this._liveVideoPlayer.playVideo(path);

        }
    }

    //收到livevideo控件结束回调
    onVideoADCloseFunc() {
        console.log("onVideoADClose 视频广告播放结束");
        this.onClickClose();
    }

    //视频播放第一帧回调
    onVideoFirstFrameFunc(buff: any, pixelFormat: any, width: number, height: number) {
        //隐藏顶端电量，时间信息
        this._hideStatusView();
        //先暂停视频
        this._liveVideoPlayer.pauseVideo();
        //视频节点显示淡入效果
        this.ndVideo.runAction(cc.sequence(cc.delayTime(2), cc.fadeIn(1), cc.callFunc(() => {
            this._liveVideoPlayer.pauseVideo();  //恢复视频
            if (cc.sys.OS_IOS === cc.sys.os && this._audioSource) {
                console.log("begin play audio source.");
                //播放mp3音频
                cc.audioEngine.setEffectsVolume(0.5);
                this._curAudioID = cc.audioEngine.playEffect(this._audioSource, false);
            }
            this._showBtnClose(2);
        })));

    }

    //图片广告淡入
    _fadeIn() {
        this.node.stopAllActions();
        this.node.opacity = 0;
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.fadeIn(1), cc.callFunc(() => {
            this._spADcountDown();
        })));
    }

    _fadeOut() {
        this.node.stopAllActions();
        this.node.runAction(cc.fadeOut(0.2));
    }

    //图片广告关闭按钮倒计时
    _spADcountDown() {
        this.DurationClose.active = true;
        this.schedule(() => {
            let cur = Number(this.DurationStr.string) - 1;
            if (cur <= 0) {
                this.onClickClose();
                return;
            }
            this.DurationStr.string = cur.toString();
            if (this._adInfo.AdDisplayTime - cur >= 1 && !this.btnPicClose.active) { //超过1秒, 显示关闭按钮
                this._showBtnClose(1);
            }

        }, 1, this._adInfo.AdDisplayTime - 1, 1);
    }

    //显示关闭按钮
    _showBtnClose(type: number) {
        if (type == 1) {
            //图片广告, 显示倒计时
            this.DurationClose.stopAllActions();
            this.DurationStr.node.stopAllActions();
            cc.tween(this.DurationClose.getChildByName("bg")).to(0.25, { width: 230 }).start();
            this.DurationStr.node.runAction(cc.moveBy(0.25, -91, 0));
            this.Unit.node.runAction(cc.moveBy(0.25, -91, 0));

            this._fadeInNode(this.btnPicClose, 0.5);
            this._fadeInNode(this.Line, 0.5);
        } else {
            //视频广告， 只显示关闭按钮，不显示倒计时。
            this.scheduleOnce(() => {
                this.btnVideoClose.active = true;
            }, 1);
        }

    }

    _fadeInNode(node: cc.Node, duration: number) {
        node.active = true;
        node.stopAllActions();
        node.opacity = 0;
        node.runAction(cc.fadeIn(duration));
    }

    //隐藏电量，时间显示
    _hideStatusView() {
        cv.StatusView.show(false);
    }

    //关闭按钮
    onClickClose() {

        if (this._adInfo.AdType == 2 && this._liveVideoPlayer != null) {
            //当前播放视频
            this._liveVideoPlayer.stopVideo();
            this._liveVideoPlayer = null;
            if (cc.sys.os === cc.sys.OS_IOS && this._curAudioID != -1) {
                cc.audioEngine.stopEffect(this._curAudioID);
                this._curAudioID = - 1;
            }
        }
        //跟踪用户行为，发送事件
        let id = this._adInfo.AdUrl.substr(this._adInfo.AdUrl.lastIndexOf("/") + 1);
        let properties = { promotionName: "", creativeId: id, item: "skipButton" };
        cv.segmentTool.track(cv.Enum.CurrentScreen.promotionScreen, cv.Enum.segmentEvent.Clicked, "", properties);
        this._finishCb();
    }
}
