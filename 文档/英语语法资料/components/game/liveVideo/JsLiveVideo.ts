//JSMpeg:
//{Player, VideoElement, BitBuffer, Source, Demuxer, Decoder, Renderer, AudioOutput}
import {JSMpeg} from "./jsmpeg.min.js";

const {ccclass, property} = cc._decorator;

//JsLiveVideoRender: JSMpeg.Renderer
@ccclass
default class JsLiveVideoRender {
    options: any = null;
    width: number = 0;
    height: number = 0;
    curwidth: number = 0;
    curheight: number = 0;
    buff: any = null;
    curbuff: any = null;
    buffState: number = -1; //-1 0 1(has buffer data)
    buffOpt: number = 0; // 0(none) 1(render) 2(draw)
    bytesPerColor: number = 3;
    renderClk: number = 0;
    enabled = false;

    public init(options): void {
        this.options = options;
        this.bytesPerColor = (this.options && this.options.bytesPerColor == 4) ?  4 : 3; //rgba or rgb color
        this.enabled = true;
        //this.renderClk = JSMpeg.Now();
    }

    public resize(width, height): void {
        this.buffState = 0;
        this.buffOpt = 0;
        this.width = width | 0;
        this.height = height | 0;
        this.buff = null;
    }

    public render(y, cb, cr): void {
        this.renderClk = JSMpeg.Now();
        if (!this.enabled || this.buffState == -1 || this.buffOpt == 2) {
            return;
        }
        this.buffOpt = 1;
        this.buffState = 0;
        if (!this.buff) {
            this.buff = new Uint8Array(this.width * this.height * this.bytesPerColor);
        }
        if (this.bytesPerColor == 4) {
            this.YCbCrToRGBA(y, cb, cr, this.buff);
        } else { //==3
            this.YCbCrToRGB(y, cb, cr, this.buff);
        }
        this.buffState = 1;
        this.buffOpt = 0;
    }

    public renderProgress(progress): void {
    }

    public destroy(): void {
        this.clearBuff();
    }

    private YCbCrToRGBA(y, cb, cr, rgba) {
        var w = ((this.width + 15) >> 4) << 4,
            w2 = w >> 1;
    
        var yIndex1 = 0,
            yIndex2 = w,
            yNext2Lines = w + (w - this.width);
    
        var cIndex = 0,
            cNextLine = w2 - (this.width >> 1);
    
        var rgbaIndex1 = 0,
            rgbaIndex2 = this.width * 4,
            rgbaNext2Lines = this.width * 4;
    
        var cols = this.width >> 1,
            rows = this.height >> 1;
    
        var ccb, ccr, r, g, b;
    
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                ccb = cb[cIndex];
                ccr = cr[cIndex];
                cIndex++;   
                r = (ccb + ((ccb * 103) >> 8)) - 179;
                g = ((ccr * 88) >> 8) - 44 + ((ccb * 183) >> 8) - 91;
                b = (ccr + ((ccr * 198) >> 8)) - 227;
                // Line 1
                var y1 = y[yIndex1++];
                var y2 = y[yIndex1++];
                rgba[rgbaIndex1]   = y1 + r;
                rgba[rgbaIndex1+1] = y1 - g;
                rgba[rgbaIndex1+2] = y1 + b;
                rgba[rgbaIndex1+3] = 255;
                rgba[rgbaIndex1+4] = y2 + r;
                rgba[rgbaIndex1+5] = y2 - g;
                rgba[rgbaIndex1+6] = y2 + b;
                rgba[rgbaIndex1+7] = 255;
                rgbaIndex1 += 8;
                // Line 2
                var y3 = y[yIndex2++];
                var y4 = y[yIndex2++];
                rgba[rgbaIndex2]   = y3 + r;
                rgba[rgbaIndex2+1] = y3 - g;
                rgba[rgbaIndex2+2] = y3 + b;
                rgba[rgbaIndex2+3] = 255;
                rgba[rgbaIndex2+4] = y4 + r;
                rgba[rgbaIndex2+5] = y4 - g;
                rgba[rgbaIndex2+6] = y4 + b;
                rgba[rgbaIndex2+7] = 255;
                rgbaIndex2 += 8;
            }
    
            yIndex1 += yNext2Lines;
            yIndex2 += yNext2Lines;
            rgbaIndex1 += rgbaNext2Lines;
            rgbaIndex2 += rgbaNext2Lines;
            cIndex += cNextLine;
        }
    }
    private YCbCrToRGB(y, cb, cr, rgba) {
        var w = ((this.width + 15) >> 4) << 4,
            w2 = w >> 1;
    
        var yIndex1 = 0,
            yIndex2 = w,
            yNext2Lines = w + (w - this.width);
    
        var cIndex = 0,
            cNextLine = w2 - (this.width >> 1);
    
        var rgbaIndex1 = 0,
            rgbaIndex2 = this.width * 3,
            rgbaNext2Lines = this.width * 3;
    
        var cols = this.width >> 1,
            rows = this.height >> 1;
    
        var ccb, ccr, r, g, b;
    
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                ccb = cb[cIndex];
                ccr = cr[cIndex];
                cIndex++;  
                r = (ccb + ((ccb * 103) >> 8)) - 179;
                g = ((ccr * 88) >> 8) - 44 + ((ccb * 183) >> 8) - 91;
                b = (ccr + ((ccr * 198) >> 8)) - 227;
                // Line 1
                var y1 = y[yIndex1++];
                var y2 = y[yIndex1++];
                rgba[rgbaIndex1]   = y1 + r;
                rgba[rgbaIndex1+1] = y1 - g;
                rgba[rgbaIndex1+2] = y1 + b;
                rgba[rgbaIndex1+3] = y2 + r;
                rgba[rgbaIndex1+4] = y2 - g;
                rgba[rgbaIndex1+5] = y2 + b;
                rgbaIndex1 += 6;
                // Line 2
                var y3 = y[yIndex2++];
                var y4 = y[yIndex2++];
                rgba[rgbaIndex2]   = y3 + r;
                rgba[rgbaIndex2+1] = y3 - g;
                rgba[rgbaIndex2+2] = y3 + b;
                rgba[rgbaIndex2+3] = y4 + r;
                rgba[rgbaIndex2+4] = y4 - g;
                rgba[rgbaIndex2+5] = y4 + b;
                rgbaIndex2 += 6;
            }
    
            yIndex1 += yNext2Lines;
            yIndex2 += yNext2Lines;
            rgbaIndex1 += rgbaNext2Lines;
            rgbaIndex2 += rgbaNext2Lines;
            cIndex += cNextLine;
        }
    }

    public getBuff(): Uint8Array {
        if (this.buffState == -1) {
            return null;
        }
        if (this.buffState == 1 && this.buffOpt != 1) {
            this.buffOpt = 2;
            if (this.curbuff && (this.curwidth != this.width || this.curheight != this.height)) {
                this.curbuff = null;
            }
            var tmp = this.curbuff;
            this.curbuff = this.buff;
            this.buff = tmp;
            this.curwidth = this.width;
            this.curheight = this.height;
            this.buffState = 0;
            this.buffOpt = 0;
        }
        return this.curbuff;
    }
    public clearBuff(): void {
        this.buffState = -1;
        this.buffOpt = 0;
        this.buff = null;
        this.curbuff = null;
    }
}

@ccclass
default class WorkThread {
    running: boolean = false;
    workCb: any = null;
    workParam: any = null;
    handle: number = 0;

    public abort(): void {
        this.running = false;
        clearTimeout(this.handle);
    }
    public isRunning(): boolean {
        return this.running;
    }
    public start(cb, param): void {
        if (this.running || this.workCb || typeof cb != 'function') {
            return;
        }
        this.running = true;
        this.workCb = cb;
        this.workParam = param;
        this.handle = setTimeout(this.doWork.bind(this), 1);
    }
    private doWork(): void {
        if (this.running) {
            this.workCb(this.workParam);
            this.handle = setTimeout(this.doWork.bind(this), 10);
        }
    }
}


//JsLiveVideo: JSMpeg.Player
@ccclass
export default class JsLiveVideo {
    
    url: string = "";
    options: any = null;

    initFinish: boolean = false;
    maxAudioLag: number = 0;
    loop: boolean = false;
    autoplay: boolean = false;
    wantsToPlay: boolean = false;
    isPlaying: boolean = false;
    paused: boolean = true;
    unpauseOnShow: boolean = false;
    workerId: any = null;
    startTime: number = 0;
    playStatus: number = 0;
    renderTimeOutCb: any = null;
    renderTimeOutParm: any = null;

    source: any = null;
    demuxer: any = null;
    wasmModule: any = null;
    video: any = null;
    renderer: any = null;
    audio: any = null;
    audioOut: any = null;
    
    public init(url, options): void {
        this.initFinish = false;
        this.playStatus = 0;
        this.url = url;
        this.options = options || {};
        if (!url.match(/^wss?:\/\//)) {
            console.log("invalid url");
        }
        this.options.onSourceEstablished = this.onSourceEstablished.bind(this);
        this.source = new JSMpeg.Source.WebSocket(url, this.options);
        this.options.streaming = true;
    
        this.maxAudioLag = this.options.maxAudioLag || 0.25; //最大音频滞后
        this.loop = this.options.loop !== false;
        this.autoplay = !!this.options.autoplay;
    
        this.demuxer = new JSMpeg.Demuxer.TS(this.options);
        this.source.connect(this.demuxer);
    
        if (!this.options.disableWebAssembly && JSMpeg.WASMModule.IsSupported()) {
            this.wasmModule = new JSMpeg.WASMModule();
            this.options.wasmModule = this.wasmModule;
        }
    
        if (this.options.video !== false) {
            this.video = this.options.wasmModule
                ? new JSMpeg.Decoder.MPEG1VideoWASM(this.options)
                : new JSMpeg.Decoder.MPEG1Video(this.options);
    
            this.renderer = new JsLiveVideoRender();
            this.renderer.init(this.options);
            
            this.demuxer.connect(JSMpeg.Demuxer.TS.STREAM.VIDEO_1, this.video);
            this.video.connect(this.renderer);
        }
    
        if (this.options.audio !== false && JSMpeg.AudioOutput.WebAudio.IsSupported()) {
            this.audio = this.options.wasmModule
                ? new JSMpeg.Decoder.MP2AudioWASM(this.options)
                : new JSMpeg.Decoder.MP2Audio(this.options);
            this.audioOut = new JSMpeg.AudioOutput.WebAudio(this.options);
            this.demuxer.connect(JSMpeg.Demuxer.TS.STREAM.AUDIO_1, this.audio);
            this.audio.connect(this.audioOut);
        }
    
        this.paused = true;
        this.unpauseOnShow = false;
        if (this.options.pauseWhenHidden !== false) { //do something when hidden
            document.addEventListener('visibilitychange', this.showHide.bind(this));
        }

        if (this.wasmModule) {
            if (JSMpeg.WASM_BINARY_INLINED) {
                var wasm = JSMpeg.Base64ToArrayBuffer(JSMpeg.WASM_BINARY_INLINED);
                this.wasmModule.loadFromBuffer(wasm, this.startLoading.bind(this));
            }
            else {
                this.wasmModule.loadFromFile('jsmpeg.wasm',  this.startLoading.bind(this));
            }
        }
        else {
            this.startLoading();
        }
    }

    private startLoading(): void {
        this.initFinish = true;
        if (this.autoplay) {
            this.playMedia();
        }
    }

    public playMedia(): void {
        this.playStatus = 1;
        this.source.start();
        this.play();
    }
    public showHide(): void {
        if (document.visibilityState === 'hidden') {
            this.unpauseOnShow = this.wantsToPlay;
            this.pause();
        }
        else if (this.unpauseOnShow) {
            this.play();
        }
    }

    //play()里面包含了音视频解码放到线程中处理
    public play(): void {
        if (this.workerId) {
            return;
        }
        if (this.renderer) {
            this.renderer.renderClk = JSMpeg.Now();
        }
        //window.requestAnimationFrame()告诉浏览器在下次重绘之前调用指定的回调函数
        //回调函数执行次数通常与浏览器屏幕刷新次数相匹配或者每秒60次
        this.workerId = requestAnimationFrame(this.updateFrame.bind(this));
        // console.log("start work-thread");
        // this.workerId = new WorkThread();
        // this.workerId.start(this.updateFrame.bind(this), null);

        this.wantsToPlay = true;
        this.paused = false;
    }

    public pause(): void {
        if (this.paused) {
            return;
        }
        cancelAnimationFrame(this.workerId);
        // this.workerId.abort();
        this.workerId = null;
        this.wantsToPlay = false;
        this.isPlaying = false;
        this.paused = true;
    
        if (this.audio && this.audio.canPlay) {
            this.audioOut.stop();
            this.seek(this.getCurrentTime());
        }
    
        if (this.options.onPause) {
            this.options.onPause(this); //暂停回调
        }
    }

    public getVolume(): number {
        return this.audioOut ? this.audioOut.volume : 0;
    }
    public setVolume(volume): void {
        if (this.audioOut) {
            this.audioOut.volume = volume; //[0, 1]
        }
    }

    public stopMedia(): void {
        this.playStatus = 0;
        this.source.destroy();
        this.stop();
    }

    public stop(): void {
        this.pause();
        this.seek(0);
        if (this.video && this.options.decodeFirstFrame !== false) {
            this.video.decode();
        }
    }

    public destroy(): void {
        this.playStatus = 0;
        this.pause();
        this.source.destroy();
        this.video && this.video.destroy();
        this.renderer && this.renderer.destroy();
        this.audio && this.audio.destroy();
        this.audioOut && this.audioOut.destroy();
        this.wasmModule = null; //释放wasm内存
    }

    public seek(time): void {
        var startOffset = this.audio && this.audio.canPlay? this.audio.startTime: this.video.startTime;
        if (this.video) {
            this.video.seek(time + startOffset);
        }
        if (this.audio) {
            this.audio.seek(time + startOffset);
        }
        this.startTime = JSMpeg.Now() - time;
    }

    public getCurrentTime(): number {
        return this.audio && this.audio.canPlay? this.audio.currentTime - this.audio.startTime: this.video.currentTime - this.video.startTime;
    }
    
    public setCurrentTime(time): void {
        this.seek(time);
    }

    private updateFrame(): void {
        this.workerId = requestAnimationFrame(this.updateFrame.bind(this));
        //未建立数据连接
        if (!this.source.established) {
            if (this.renderer) {
                this.renderer.renderProgress(this.source.progress);
            }
            return;
        }
        //未播放
        var timeNow = JSMpeg.Now();
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.startTime = timeNow - this.getCurrentTime(); //注意时间值
    
            if (this.options.onPlay) {
                this.options.onPlay(this); //播放回调
            }
        }
        this.updateForStreaming();
        if (this.renderTimeOutCb && this.renderer && timeNow - this.renderer.renderClk > 5) {
            console.log("do renderTimeOutCb()");
            this.renderer.renderClk = timeNow;
            this.renderTimeOutCb.call(this.renderTimeOutParm);
        }
    }
    private updateForStreaming(): void {
        // When streaming, immediately decode everything we have buffered up until
        // now to minimize playback latency.
        if (this.video) {
            this.video.decode();
        }
        if (this.audio) {
            var decoded = false;
            do {
                // If there's a lot of audio enqueued already, disable output and
                // catch up with the encoding.
                if (this.audioOut.enqueuedTime > this.maxAudioLag) {
                    this.audioOut.resetEnqueuedTime();
                    this.audioOut.enabled = false;
                }
                decoded = this.audio.decode();		
            } while (decoded);
            this.audioOut.enabled = true;
        }
    }

    public nextFrame(): boolean {
        if (this.source.established && this.video) {
            return this.video.decode();
        }
        return false;
    }

    public getPixelData(): Uint8Array {
        if (this.renderer) {
            return this.renderer.getBuff();
        }
        return null;
	}
	public getPixelSize(): number {
        if (this.renderer) {
            return this.renderer.curwidth * this.renderer.curheight * this.renderer.bytesPerColor;
        }
		return 0;
	}
	public getPixelWidth(): number {
        if (this.renderer) {
            return this.renderer.curwidth;
        }
		return 0;
	}
	public getPixelHeight(): number {
        if (this.renderer) {
            return this.renderer.curheight;
        }
		return 0;
    }
    public getPixelFormat(): number {
        if (this.renderer) {
            return this.renderer.bytesPerColor;
        }
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
        if (!this.url.match(/^wss?:\/\//)) {
            console.log("invalid url");
        }
        this.source.url = this.url;
    }
    public setRenderTimeOutCb(cb, param): void {
        this.renderTimeOutCb = cb;
        this.renderTimeOutParm = param;
    }
    public onSourceEstablished(source): void {
        if (this.video) {
            this.video.reset();
        }
        if (this.audio) {
        }
    }
}