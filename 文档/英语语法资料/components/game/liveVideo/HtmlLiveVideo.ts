const {ccclass, property} = cc._decorator;

@ccclass
export default class HtmlLiveVideo {
    url: string = "";
    volume: number = 1;
    playStatus: number = 0;
    videoCanvas: any = null;
    gameCanvas: any = null;
    video: any = null;
    
    public init(): void {
        this.volume = 1;
        this.gameCanvas = window.document.getElementById("GameCanvas");
        this.videoCanvas = window.document.getElementById("VideoCanvas");
        if (this.videoCanvas == null) {
            this.videoCanvas = document.createElement("canvas");
            this.videoCanvas.id = "VideoCanvas";
            var style = this.videoCanvas.style;
            style.position = "absolute";
            style.zIndex = "-1";
            this.gameCanvas.parentElement.insertBefore(this.videoCanvas, this.gameCanvas);
        }
        this.updateLayout();
    }
    addLayoutListener() {
        // window.addEventListener("orientationchange", this.orientationChange.bind(this));
        // window.addEventListener("resize", this.resize.bind(this));
        cc.view.setResizeCallback(this.resize.bind(this));
    }
    removeLayoutListener() {
        // window.removeEventListener("orientationchange", this.orientationChange.bind(this));
        // window.removeEventListener("resize", this.resize.bind(this));
        cc.view.setResizeCallback(null);
        this.videoCanvas.width = 0;
        this.videoCanvas.height = 0;
        this.videoCanvas.style.visibility = "hidden";
    }
    public getVolume(): number {
        return this.volume;
    }
    public setVolume(volume): void {
        if (this.volume != volume) {
            this.volume = volume;
            if (this.video != null) {
                this.video.setVolume(this.volume);
            }
        }
    }
    public playMedia(): void {
        this.playStatus = 1;
        this.play();
    }
    public play(): void {
        var videoElement = this.videoCanvas;
        var _id = videoElement.id;
        //导出的WebPlayerNew接口:
        //start(url) close(url) stop() reopen(url)
        //enableAudio(enable) setVolume(v)
        //setView(canvas) resizeView(w,h) setBufferTime(t)  setScaleMode(m)
        //skipLoopFilter(n)
        if (this.video == null) {
            this.video = new WebPlayerNew();
            this.video.setView(_id);
            this.video.setBufferTime(300);
            this.video.skipLoopFilter(32);
            this.video.setVolume(this.volume);
			this.video.on('start', () => {
                //console.log('连接成功并收到数据');
            });
            this.video.on('stop', () => {
                //console.log('本地stop或远端断开连接');
            });
            this.video.on('error', () => {
                console.log('连接错误或播放发生错误');
            });
            this.video.on('videoInfo', (w, h) => {
                //console.log('解析出视频信息回调');
            });
            this.video.on('audioInfo', (r, c) => {
                //console.log('解析音频信息回调');
            });
            this.video.on('stats', (stats) => {
                //console.log('每秒回调一次流统计信息');
            });
        }
        this.video.start(this.url);
    }
    public stopMedia(): void {
        this.playStatus = 0;
        this.stop();
    }
    public stop(): void {
        if (this.video != null) {
            this.video.close();
        }
    }
    public getPixelData(): Uint8Array {
        return null;
	}
	public getPixelSize(): number {
		return 0;
	}
	public getPixelWidth(): number {
		return 0;
	}
	public getPixelHeight(): number {
		return 0;
    }
    public getPixelFormat(): number {
        return 0;
    }
    public mediaStatus(): number {
        //0=default,1=ready,2=playing,3=stoping
        return (this.playStatus == 0 ? 0 : 2);
    }
    public getUrl(): string {
        return this.url;
    }
    public setUrl(url: string): void {
        this.url = url;
    }
    updateLayout() {
        //canvas default width=300,height=150
        let videoStyle = this.videoCanvas.style;
        let gameStyle = this.gameCanvas.style;
        let gw = this.getStypeVal(gameStyle.width);
        let gh = this.getStypeVal(gameStyle.height);
        if ((this.videoCanvas.width != gw) || (this.videoCanvas.height != gh)) {
            this.videoCanvas.width = gw;
            this.videoCanvas.height = gh;
            // gameStyle.width = gw + "px";
            // gameStyle.height = gh + "px";
            if (this.video != null) {
                this.video.resizeView(gw, gh);
            }
        }
        videoStyle.transformOrigin = gameStyle.transformOrigin;
        videoStyle.transform = gameStyle.transform;
        videoStyle.visibility = "visible";
    }
    orientationChange() {
        this.updateLayout();
    }
    resize() {
        this.updateLayout();
    }
    getStypeVal(str): number {
        return parseInt(str.substring(0, str.indexOf("px")));
    }
}
