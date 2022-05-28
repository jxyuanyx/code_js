
type renderFrameCallback = (filepath: string, format: number, width: number, height: number, rotation: number, timestamp: number, uid: number)=> void;
type cleanFrameCallback = (uid: number, reason: number)=> void;
type engineStateCallback = (state: number)=> void;
type audioVolumeCallback = (speakers: string, totalVolume: number)=> void;

const {ccclass, property} = cc._decorator;

class VideoDimension {
    public width: number;
    public height: number;
}

@ccclass
export default class AgoraSdk {
    private static channelProfile: number = 0;
    public static CHANNEL_PROFILE_COMMUNICATION: number = 0; //通信场景(默认)
    public static CHANNEL_PROFILE_LIVE_BROADCASTING: number = 1; //直播场景
    public static CHANNEL_PROFILE_GAME: number = 2; //游戏场景
    public static currentChannelProfile(): number {
        return AgoraSdk.channelProfile;
    }
    //视频分辩率
    public static VIDEO_VD_120x120: number = 0;
    public static VIDEO_VD_160x120: number = 1;
    public static VIDEO_VD_180x180: number = 2;
    public static VIDEO_VD_240x180: number = 3;
    public static VIDEO_VD_320x180: number = 4;
    public static VIDEO_VD_240x240: number = 5;
    public static VIDEO_VD_320x240: number = 6;
    public static VIDEO_VD_424x240: number = 7;
    public static VIDEO_VD_360x360: number = 8;
    public static VIDEO_VD_480x360: number = 9;
    public static VIDEO_VD_640x360: number = 10;
    public static VIDEO_VD_480x480: number = 11;
    public static VIDEO_VD_640x480: number = 12;
    public static VIDEO_VD_840x480: number = 13;
    public static VIDEO_VD_960x720: number = 14;
    public static VIDEO_VD_1280x720: number = 15;
    //视频帧率
    public static VIDEO_FRAME_RATE_FPS_1: number = 1;
    public static VIDEO_FRAME_RATE_FPS_7: number = 7;
    public static VIDEO_FRAME_RATE_FPS_10: number = 10;
    public static VIDEO_FRAME_RATE_FPS_15: number = 15;
    public static VIDEO_FRAME_RATE_FPS_24: number = 24;
    public static VIDEO_FRAME_RATE_FPS_30: number = 30;
    //视频方向
    public static VIDEO_ORIENTATION_MODE_ADAPTIVE: number = 0;
    public static VIDEO_ORIENTATION_MODE_FIXED_LANDSCAPE: number = 1;
    public static VIDEO_ORIENTATION_MODE_FIXED_PORTRAIT: number = 2;

    private static engineStatus: number = 0; //0=default 1=create 2=destroy
    public static getVideoDimension(vd: number): VideoDimension {
        return {width: vd, height: 0};
    }
    public static createEngine(profile: number, vd: VideoDimension, fps: number = 15, orientation: number = 0): void {
        AgoraSdk.engineStatus = 0;
        AgoraSdk.channelProfile = profile;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "createEngine", "(Ljava/lang/String;Ljava/lang/String;IIIII)V", "e3e16446c0d44bb6a04597f0668b9b6a", "", profile, vd.width, vd.height, fps, orientation);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AgoraSdk", "createEngine:token:profile:vdWidth:vdHeight:fps:orientation:", "e3e16446c0d44bb6a04597f0668b9b6a", "", profile, vd.width, vd.height, fps, orientation);
        } else {
            console.log('createEngine: invalid platform');
        }
    }
    public static destroyEngine(): void {
        AgoraSdk.isWorking = false;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "destroyEngine", "()V");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AgoraSdk", "destroyEngine");
        } else {
            console.log('destroyEngine: invalid platform');
        }
        AgoraSdk.engineStatus = 2;
    }
    public static getEngineStatus(): number {
        return AgoraSdk.engineStatus;
    }
    private static engineStateListener: engineStateCallback = null;
    public static setEngineStateListener(engineStateCb: engineStateCallback): void {
        AgoraSdk.engineStateListener = engineStateCb;
    }
    public static onEngineStateChanged(state: number): void {
        console.log("Engine state=" + state); //0=default 1=create 2=destroy
        AgoraSdk.engineStatus = state;
        if (AgoraSdk.engineStateListener) {
            AgoraSdk.engineStateListener(state);
        }
    }
    private static channelName: string = "SimpleVideo";
    private static uid: number = 0;
    private static isWorking: boolean = false;
    public static joinChannel(channelName: string, uid: number): void {
        AgoraSdk.channelName = channelName;
        AgoraSdk.uid = uid;
        AgoraSdk.isWorking = true;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "joinChannel", "(Ljava/lang/String;I)V", channelName, uid);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AgoraSdk", "joinChannel:uid:", channelName, uid);
        } else {
            console.log('joinChannel: invalid platform');
        }
    }
    public static leaveChannel(): void {
        AgoraSdk.isWorking = false;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "leaveChannel", "()V");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AgoraSdk", "leaveChannel");
        } else {
            console.log('destroyEngine: invalid platform');
        }
    }
    public static checkPermissions(): boolean {
        let ret = false;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "checkPermissions", "()Z");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = true;
        } else {
            console.log('checkPermissions: invalid platform');
        }
        return ret;
    }
    private static renderFrameListener: renderFrameCallback = null;
    private static cleanFrameListener: cleanFrameCallback = null;
    public static setRenderListener(renderFrameCb: renderFrameCallback, cleanFrameCb: cleanFrameCallback): void {
        AgoraSdk.renderFrameListener = renderFrameCb;
        AgoraSdk.cleanFrameListener = cleanFrameCb;
    }
    public static renderFrame(filepath: string, format: number, width: number, height: number, rotation: number, timestamp: number, uid: number): void {
        if (AgoraSdk.renderFrameListener) {
            AgoraSdk.renderFrameListener(filepath, format, width, height, rotation, timestamp, uid);
        }
    }
    public static cleanFrame(uid: number, reason: number) {
        if (AgoraSdk.cleanFrameListener) {
            AgoraSdk.cleanFrameListener(uid, reason);
        }
    }
    public static CONNECTION_STATE_DISCONNECTED: number = 1; //连接断开
    public static CONNECTION_STATE_CONNECTING: number = 2; //建立网络连接中
    public static CONNECTION_STATE_CONNECTED: number = 3; //网络已连接
    public static CONNECTION_STATE_RECONNECTING: number = 4; //重新建立网络连接中
    public static CONNECTION_STATE_FAILED: number = 5; //网络连接失败
    public static CONNECTION_STATE_DEFAULT: number = 0; //默认值
    public static getConnectionState(): number {
        let ret  = 0;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "getConnectionState", "()I");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "getConnectionState");
        } else {
            console.log('getConnectionState: invalid platform');
        }
        return ret;
    }
    public static connectionStateChanged(state: number, reason: number): void {
        console.log("state=" + state + ", reason=" + reason);
        if (state == AgoraSdk.CONNECTION_STATE_FAILED && AgoraSdk.isWorking == true) {
            //重新连接
            AgoraSdk.leaveChannel();
            AgoraSdk.joinChannel(AgoraSdk.channelName, AgoraSdk.uid);
        }
    }
    public static error(err: number): void {
        console.log("err=" + err);
    }
    private static cameraType: number = 1;
    public static CAMERA_TYPE_FRONT: number = 1;
    public static CAMERA_TYPE_REAR: number = 0;
    public static isFrontCamera(): boolean {
        return AgoraSdk.cameraType == AgoraSdk.CAMERA_TYPE_FRONT;
    }
    public static currentCameraType(): number {
        return AgoraSdk.cameraType;
    }
    public static switchCamera(): number {
        //切换前后置摄像头, 0 成功, <0 失败
        let ret = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "switchCamera", "()I");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "switchCamera");
        } else {
            console.log('checkPermissions: invalid platform');
        }
        if (ret == 0) {
            AgoraSdk.cameraType = AgoraSdk.isFrontCamera() ? AgoraSdk.CAMERA_TYPE_REAR: AgoraSdk.CAMERA_TYPE_FRONT;
        }
        return ret;
    }
    private static clientRole = 2;
    public static CLIENT_ROLE_BROADCASTER: number = 1; //主播
    public static CLIENT_ROLE_AUDIENCE: number = 2; //观众(默认)
    public static setClientRole(role: number): number {
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "setClientRole", "(I)I", role);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "setClientRole:", role);
        } else {
            console.log('setClientRole: invalid platform');
        }
        if (ret == 0) {
            AgoraSdk.clientRole = role;
        }
        return ret;
    }
    public static currentClientRole(): number {
        return AgoraSdk.clientRole;
    }
    public static clientRoleChanged(oldRole: number, newRole: number): void {
        console.log("clientRoleChanged oldRole=" + oldRole + ", newRole=" + newRole);
    }
    public static setEncryptionSecret(secret: string): number { //加密
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "setEncryptionSecret", "(Ljava/lang/String;)I", secret);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "setEncryptionSecret:", secret);
        } else {
            console.log('setEncryptionSecret: invalid platform');
        }
        return ret;
    }
    public static enableLocalVideo(enable: boolean): number { //开启/关闭本地视频采集
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "enableLocalVideo", "(Z)I", enable);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "enableLocalVideo:", enable);
        } else {
            console.log('enableLocalVideo: invalid platform');
        }
        return ret;
    }
    public static muteLocalVideo(muted: boolean): number { //停止/恢复发送本地视频流
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "muteLocalVideo", "(Z)I", muted);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "muteLocalVideo:", muted);
        } else {
            console.log('muteLocalVideo: invalid platform');
        }
        return ret;
    }
    public static muteRemoteVideo(uid: number, muted: boolean): number { //停止/恢复接收指定远端视频流
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "muteRemoteVideo", "(IZ)I", uid, muted);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "muteRemoteVideo:muted:", uid, muted);
        } else {
            console.log('muteRemoteVideo: invalid platform');
        }
        return ret;
    }
    public static muteAllRemoteVideo(muted: boolean): number { //停止/恢复接收所有远端视频流
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "muteAllRemoteVideo", "(Z)I", muted);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "muteAllRemoteVideo:", muted);
        } else {
            console.log('muteAllRemoteVideo: invalid platform');
        }
        return ret;
    }
    public static enableLocalAudio(enable: boolean): number { //开启/关闭本地音频采集
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "enableLocalAudio", "(Z)I", enable);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "enableLocalAudio:", enable);
        } else {
            console.log('enableLocalAudio: invalid platform');
        }
        return ret;
    }
    public static muteLocalAudio(muted: boolean): number { //停止/恢复发送本地音频流
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "muteLocalAudio", "(Z)I", muted);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "muteLocalAudio:", muted);
        } else {
            console.log('muteLocalAudio: invalid platform');
        }
        return ret;
    }
    public static muteRemoteAudio(uid: number, muted: boolean): number { //停止/恢复接收指定远端音频流
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "muteRemoteAudio", "(IZ)I", uid, muted);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "muteRemoteAudio:muted:", uid, muted);
        } else {
            console.log('muteRemoteAudio: invalid platform');
        }
        return ret;
    }
    public static muteAllRemoteAudio(muted: boolean): number { //停止/恢复接收所有远端音频流
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "muteAllRemoteAudio", "(Z)I", muted);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "muteAllRemoteAudio:", muted);
        } else {
            console.log('muteAllRemoteAudio: invalid platform');
        }
        return ret;
    }

    private static audioVolumeListener: audioVolumeCallback = null;
    public static setAudioVolumeListener(audioVolumeCb: audioVolumeCallback): void {
        AgoraSdk.audioVolumeListener = audioVolumeCb;
    }
    public static audioVolumeIndication(speakers: string, totalVolume: number): void {
        // console.log("audioVolumeIndication, totalVolume=" + totalVolume);
        // console.log(speakers);
        if (AgoraSdk.audioVolumeListener) {
            AgoraSdk.audioVolumeListener(speakers, totalVolume);
        }
    }
    public static enableAudioVolumeIndication(interval: number, smooth: number = 3, report_vad: boolean = false): number { //启用说话者音量提示
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "enableAudioVolumeIndication", "(IIZ)I", interval, smooth, report_vad);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "enableAudioVolumeIndication:smooth:report_vad:", interval, smooth, report_vad);
        } else {
            console.log('enableAudioVolumeIndication: invalid platform');
        }
        return ret;
    }

    //美颜参数
    //contrastLevel: 亮度明暗对比度 0-低对比度 1-正常对比度(默认) 2-高对比度
    //lightening: 亮度，取值范围为 [0.0, 1.0]，其中 0.0 表示原始亮度，默认值为 0.7。可用来实现美白等视觉效果
    //smoothness: 平滑度，取值范围为 [0.0, 1.0]，其中 0.0 表示原始平滑等级，默认值为 0.5。可用来实现祛痘、磨皮等视觉效果
    //redness: 红色度，取值范围为 [0.0, 1.0]，其中 0.0 表示原始红色度，默认值为 0.1。可用来实现红润肤色等视觉效果
    public static setBeautyEffectOptions(enabled: boolean, contrastLevel: number = 1, lightening: number = 0.7, smoothness: number = 0.5, redness: number = 0.1): number { //设置美颜及其效果
        let ret  = -1;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            ret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AgoraSdk", "setBeautyEffectOptions", "(ZIFFF)I", enabled, contrastLevel, lightening, smoothness, redness);
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            ret = jsb.reflection.callStaticMethod("AgoraSdk", "setBeautyEffectOptions:contrastLevel:lightening:smoothness:redness:", enabled, contrastLevel, lightening, smoothness, redness);
        } else {
            console.log('setBeautyEffectOptions: invalid platform');
        }
        return ret;
    }
}
cc.AgoraSdk = AgoraSdk;