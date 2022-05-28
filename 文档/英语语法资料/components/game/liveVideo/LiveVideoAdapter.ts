// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import JsLiveVideo from "./JsLiveVideo";
import HtmlLiveVideo from "./HtmlLiveVideo";

const {ccclass, property} = cc._decorator;

//适配器
@ccclass
default class LiveVideoTarget {
    public loadFinish(): boolean { return true; }
    public free(): void {}
    public checkMediaStatus(): void {}
    public getFilePath(): string { return ""; }
    public setFilePath(path: string): void {}
    public mediaStatus(): number { return 0; }
    public playMedia(): void {}
    public pauseMedia(): void {}
    public stopMedia(): void {}
    public seekToPosition(pos: number): void {}
    public retain(): void {}
    public release(): void {}
    public getPixelData(): any { return 0; }
    public getPixelSize(): number { return 0; }
    public getPixelWidth(): number { return 0; }
    public getPixelHeight(): number { return 0; }
    public getPixelFormat(): any { return cc.Texture2D.PixelFormat.RGB888;}
    public enableRealTime(): void {}
    public disableRealTime(): void {}
    public enableInfiniteBuffer(): void {}
    public disableInfiniteBuffer(): void {}
    public enableFramedrop(): void {}
    public disableFramedrop(): void {}
    public setSyncAndMode(syncType: number, mode: number): void {}
    public getDebugInfo(): string { return ""; }
    public getDuration(): number { return 0; }
    public getTime(): number { return 0; }
    public setMediaStopTimeOutCb(cb: number, param: any): void {}
    public setMediaReadyTimeOutCb(cb: number, param: any): void {}
    public setMediaPlayTimeOutCb(cb: number, param: any): void {}
    public enableLayout(): void {}
    public disableLayout(): void {}
}

// @ccclass
// default class WebLiveVideoAdapter extends LiveVideoTarget {
//     private adaptee: any = null;
//     private wasmObj: any = null;
//     public init(): void {
//         console.log("WebLiveVideoAdapter init");
//         this.adaptee = Module;
//         for (var key in this.adaptee) {
//             console.log("adaptee key=" + key);
//         }
//         this.wasmObj = null;
//     }
//     public loadFinish(): boolean { 
//         if (this.adaptee._js_loadWasmFinish && this.wasmObj == null) {
//             this.wasmObj = this.adaptee._js_LiveVideo_constructor();
//         }
//         return this.adaptee._js_loadWasmFinish; 
//     }
//     public free(): void { this.adaptee._js_LiveVideo_finalize(this.wasmObj); }
//     public checkMediaStatus(): void {}
//     public getFilePath(): string {
//         return this.adaptee.UTF8ToString(this.adaptee._js_LiveVideo_getFilePath(this.wasmObj));
//     }
//     public setFilePath(path: string): void {
//         var buffer = this.adaptee._malloc(path.length + 1);
//         this.adaptee.stringToUTF8(path, buffer, path.length + 1);
//         this.adaptee._js_LiveVideo_setFilePath(this.wasmObj, buffer);
//         this.adaptee._free(buffer);
//     }
//     public mediaStatus(): number { return this.adaptee._js_LiveVideo_mediaStatus(this.wasmObj); }
//     public playMedia(): void {
//         console.log("_js_LiveVideo_playMedia");
//         this.adaptee._js_LiveVideo_playMedia(this.wasmObj);
//     }
//     public pauseMedia(): void { this.adaptee._js_LiveVideo_pauseMedia(this.wasmObj); }
//     public stopMedia(): void { this.adaptee._js_LiveVideo_stopMedia(this.wasmObj); }
//     public seekToPosition(pos: number): void { this.adaptee._js_LiveVideo_seekToPosition(this.wasmObj, pos); }
//     public retain(): void { this.adaptee._js_LiveVideo_retain(this.wasmObj); }
//     public release(): void { this.adaptee._js_LiveVideo_release(this.wasmObj); }
//     public getPixelData(): any { return this.adaptee._js_LiveVideo_getPixelData(this.wasmObj); }
//     public getPixelSize(): number { return this.adaptee._js_LiveVideo_getPixelSize(this.wasmObj); }
//     public getPixelWidth(): number { return this.adaptee._js_LiveVideo_getPixelWidth(this.wasmObj); }
//     public getPixelHeight(): number { return this.adaptee._js_LiveVideo_getPixelHeight(this.wasmObj); }
//     public getPixelFormat(): any { return cc.Texture2D.PixelFormat.RGB888; }
//     public enableRealTime(): void { this.adaptee._js_LiveVideo_enableRealTime(this.wasmObj); }
//     public disableRealTime(): void { this.adaptee._js_LiveVideo_disableRealTime(this.wasmObj); }
//     public enableInfiniteBuffer(): void { this.adaptee._js_LiveVideo_enableInfiniteBuffer(this.wasmObj); }
//     public disableInfiniteBuffer(): void { this.adaptee._js_LiveVideo_disableInfiniteBuffer(this.wasmObj); }
//     public enableFramedrop(): void { this.adaptee._js_LiveVideo_enableFramedrop(this.wasmObj); }
//     public disableFramedrop(): void { this.adaptee._js_LiveVideo_disableFramedrop(this.wasmObj); }
//     public setSyncAndMode(syncType: number, mode: number): void { this.adaptee._js_LiveVideo_setSyncAndMode(this.wasmObj, syncType, mode); }
//     public getDebugInfo(): string {
//         return this.adaptee.UTF8ToString(this.adaptee._js_LiveVideo_getDebugInfo(this.wasmObj));
//     }
//     public getDuration(): number { return this.adaptee._js_LiveVideo_getDuration(this.wasmObj); }
//     public getTime(): number { return this.adaptee._js_LiveVideo_getTime(this.wasmObj); }
//     public setMediaStopTimeOutCb(cb: number, param: any): void { this.adaptee._js_LiveVideo_setMediaStopTimeOutCb(this.wasmObj, cb, param); }
//     public setMediaReadyTimeOutCb(cb: number, param: any): void { this.adaptee._js_LiveVideo_setMediaReadyTimeOutCb(this.wasmObj, cb, param); }
//     public setMediaPlayTimeOutCb(cb: number, param: any): void { this.adaptee._js_LiveVideo_setMediaPlayTimeOutCb(this.wasmObj, cb, param); }
// }

@ccclass
default class NativeLiveVideoAdapter extends LiveVideoTarget {
    private adaptee: any = null;
    public init(): void {
        this.adaptee = new LiveVideo();
    }
    public loadFinish(): boolean { return true; }
    public free(): void {}
    public checkMediaStatus(): void {}
    public getFilePath(): string { return this.adaptee.getFilePath(); }
    public setFilePath(path: string): void { this.adaptee.setFilePath(path); }
    public mediaStatus(): number { return this.adaptee.mediaStatus(); }
    public playMedia(): void { this.adaptee.playMedia(); }
    public pauseMedia(): void { this.adaptee.pauseMedia(); }
    public stopMedia(): void { this.adaptee.stopMedia(); }
    public seekToPosition(pos: number): void { this.adaptee.seekToPosition(pos); }
    public retain(): void { this.adaptee.retain(); }
    public release(): void { this.adaptee.release(); }
    public getPixelData(): any { return this.adaptee.getPixelData(); }
    public getPixelSize(): number { return this.adaptee.getPixelSize(); }
    public getPixelWidth(): number { return this.adaptee.getPixelWidth(); }
    public getPixelHeight(): number { return this.adaptee.getPixelHeight(); }
    public getPixelFormat(): any { return cc.Texture2D.PixelFormat.RGB888; }
    public enableRealTime(): void { this.adaptee.enableRealTime(); }
    public disableRealTime(): void { this.adaptee.disableRealTime(); }
    public enableInfiniteBuffer(): void { this.adaptee.enableInfiniteBuffer(); }
    public disableInfiniteBuffer(): void { this.adaptee.disableInfiniteBuffer(); }
    public enableFramedrop(): void { this.adaptee.enableFramedrop(); }
    public disableFramedrop(): void { this.adaptee.disableFramedrop(); }
    public setSyncAndMode(syncType: number, mode: number): void { this.adaptee.setSyncAndMode(syncType, mode); }
    public getDebugInfo(): string { return this.adaptee.getDebugInfo(); }
    public getDuration(): number { return this.adaptee.getDuration(); }
    public getTime(): number { return this.adaptee.getTime(); }
    public setMediaStopTimeOutCb(cb: number, param: any): void { this.adaptee.setMediaStopTimeOutCb(cb, param); }
    public setMediaReadyTimeOutCb(cb: number, param: any): void { this.adaptee.setMediaReadyTimeOutCb(cb, param); }
    public setMediaPlayTimeOutCb(cb: number, param: any): void { this.adaptee.setMediaPlayTimeOutCb(cb, param); }
    public enableLayout(): void {}
    public disableLayout(): void {}
}

@ccclass
default class JsLiveVideoAdapter {
    private adaptee: any = null;
    public init(): void {
        this.adaptee = new JsLiveVideo();
        this.adaptee.init("ws://", {autoplay: false, disableWebAssembly: false, videoBufferSize: null, audio: true});
    }
    public loadFinish(): boolean { return this.adaptee.initFinish; }
    public free(): void {}
    public checkMediaStatus(): void {}
    public getFilePath(): string { return this.adaptee.getUrl(); }
    public setFilePath(path: string): void { this.adaptee.setUrl(path); }
    public mediaStatus(): number { return this.adaptee.mediaStatus(); }
    public playMedia(): void { this.adaptee.playMedia(); }
    public pauseMedia(): void { this.adaptee.pause(); }
    public stopMedia(): void { this.adaptee.stopMedia(); }
    public seekToPosition(pos: number): void {}
    public retain(): void {}
    public release(): void { this.adaptee.destroy(); }
    public getPixelData(): any { return this.adaptee.getPixelData(); }
    public getPixelSize(): number { return this.adaptee.getPixelSize(); }
    public getPixelWidth(): number { return this.adaptee.getPixelWidth(); }
    public getPixelHeight(): number { return this.adaptee.getPixelHeight(); }
    public getPixelFormat(): any {
        if (this.adaptee.getPixelFormat() == 4) {
            return cc.Texture2D.PixelFormat.RGBA8888;
        } else {
            return cc.Texture2D.PixelFormat.RGB888;
        }
    }
    public enableRealTime(): void {}
    public disableRealTime(): void {}
    public enableInfiniteBuffer(): void {}
    public disableInfiniteBuffer(): void {}
    public enableFramedrop(): void {}
    public disableFramedrop(): void {}
    public setSyncAndMode(syncType: number, mode: number): void {}
    public getDebugInfo(): string { return ""; }
    public getDuration(): number { return 0; }
    public getTime(): number { return 0; }
    public setMediaStopTimeOutCb(cb: number, param: any): void {}
    public setMediaReadyTimeOutCb(cb: number, param: any): void {}
    public setMediaPlayTimeOutCb(cb: number, param: any): void { this.adaptee.setRenderTimeOutCb(cb, param); }
    public enableLayout(): void {}
    public disableLayout(): void {}
}

@ccclass
default class HtmlLiveVideoAdapter extends LiveVideoTarget {
    private adaptee: any = null;
    public init(): void {
        this.adaptee = new HtmlLiveVideo();
        this.adaptee.init();
    }
    public loadFinish(): boolean { return true; }
    public free(): void {}
    public checkMediaStatus(): void {}
    public getFilePath(): string { return this.adaptee.getUrl(); }
    public setFilePath(path: string): void { this.adaptee.setUrl(path); }
    public mediaStatus(): number { return this.adaptee.mediaStatus(); }
    public playMedia(): void { this.adaptee.playMedia(); }
    public pauseMedia(): void {}
    public stopMedia(): void { this.adaptee.stopMedia(); }
    public seekToPosition(pos: number): void {}
    public retain(): void {}
    public release(): void {}
    public getPixelData(): any { return null; }
    public getPixelSize(): number { return 0; }
    public getPixelWidth(): number { return 0; }
    public getPixelHeight(): number { return 0; }
    public getPixelFormat(): any { return cc.Texture2D.PixelFormat.RGB888; }
    public enableRealTime(): void {}
    public disableRealTime(): void {}
    public enableInfiniteBuffer(): void {}
    public disableInfiniteBuffer(): void {}
    public enableFramedrop(): void {}
    public disableFramedrop(): void {}
    public setSyncAndMode(syncType: number, mode: number): void {}
    public getDebugInfo(): string { return ""; }
    public getDuration(): number { return 0; }
    public getTime(): number { return 0; }
    public setMediaStopTimeOutCb(cb: number, param: any): void {}
    public setMediaReadyTimeOutCb(cb: number, param: any): void {}
    public setMediaPlayTimeOutCb(cb: number, param: any): void {}
    public enableLayout(): void { this.adaptee.addLayoutListener(); }
    public disableLayout(): void { this.adaptee.removeLayoutListener(); }
}

//工厂方法
@ccclass
export default class LiveVideoFactory {
    public static getAdapter(platform: string): LiveVideoTarget {
        var adapter;
        if (platform == "web") {
            // adapter = new JsLiveVideoAdapter();
            //adapter = new HtmlLiveVideoAdapter();
            //adapter.init();
            adapter = new LiveVideoTarget();
            console.log(typeof WebPlayerNew == 'function' ? 'video yes': 'video no');
        } else if (platform == "native") {
            adapter = new NativeLiveVideoAdapter();
            adapter.init();
        } else {
            adapter = new LiveVideoTarget();
        }
        return adapter;
    }
}