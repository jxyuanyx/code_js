import { HashMap } from "./HashMap";
import cv from "../../components/lobby/cv";

export class AudioMgr {
    private static _g_instance: AudioMgr = null;
    private _vAudioIDMap: HashMap<string, number> = new HashMap();
    private _buttonSoundUrl: string = 'zh_CN/game/dzpoker/audio/buttonSound/';

    static getInstance(): AudioMgr {
        if (!AudioMgr._g_instance) {
            AudioMgr._g_instance = new AudioMgr();
            cc.audioEngine.setMaxAudioInstance(5);
        }
        return AudioMgr._g_instance;
    }

    /**
     * 播放音频
     * @param url 音频文件路径 (resources下相对路径且不包含后缀名)
     * @param isLoop 是否循环播放 （默认不循环）
     * @param volume 音量大小 （默认0.5）
     */
    play(url: string, isLoop: boolean = false, volume: number = 0.5, bInogre: boolean = false): void {
        if (!cv.tools.isPlayMusic() && !bInogre) return;

        if (cv.tools.getEnterbackState()) {  //游戏进入了后台
            return;
        }

        let playFunc: (clip: cc.AudioClip) => void = (clip: cc.AudioClip): void => {
            let audioID: number = this._vAudioIDMap.get(url);
            if (audioID !== null) {
                // this.stop(audioID);
            }

            audioID = cc.audioEngine.play(clip, isLoop, volume);
            this._vAudioIDMap.add(url, audioID);
        }

        let clip: cc.AudioClip = cv.resMgr.get(url, cc.AudioClip);
        if (!clip) {
            cv.resMgr.load(url, cc.AudioClip, (clip: cc.AudioClip): void => {
                playFunc(clip);
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
        }
        else {
            playFunc(clip);
        }
    }

    /**
     * 播放背景音乐
     * @param url       音频文件路径(resources下相对路径且不包含后缀名)
     * @param isLoop    是否循环播放(默认不循环)
     * @param volume    音量大小(默认:0.5)
     * @param bInogre   是否忽略该音乐(默认:false)
     */
    playMusic(url: string, isLoop: boolean = false, volume: number = 0.5, bInogre: boolean = false): void {
        if (!cv.tools.isPlayMusic() && !bInogre) return;        // 是否开启了音乐
        if (cv.tools.getEnterbackState()) return;               // 游戏进入了后台

        let playFunc: (clip: cc.AudioClip) => void = (clip: cc.AudioClip): void => {
            let audioID: number = this._vAudioIDMap.get(url);
            if (audioID !== null) {
                // this.stop(audioID);
            }

            cc.audioEngine.setMusicVolume(volume);
            audioID = cc.audioEngine.playMusic(clip, isLoop);
            this._vAudioIDMap.add(url, audioID);
        }

        let clip: cc.AudioClip = cv.resMgr.get(url, cc.AudioClip);
        if (!clip) {
            cv.resMgr.load(url, cc.AudioClip, (clip: cc.AudioClip): void => {
                playFunc(clip);
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
        }
        else {
            playFunc(clip);
        }
    }

    /**
     * 播放音效
     * @param url       音频文件路径 (resources下相对路径且不包含后缀名)
     * @param isLoop    是否循环播放 (默认不循环)
     * @param volume    音量大小(默认:0.5)
     */
    playEffect(url: string, isLoop: boolean = false, volume: number = 0.5): void {
        if (!cv.tools.isSoundEffectOpen()) return;              // 是否开启了音效
        if (cv.tools.getEnterbackState()) return;               // 游戏进入了后台

        let playFunc = (clip: cc.AudioClip): void => {
            let audioID: number = this._vAudioIDMap.get(url);
            if (audioID !== null) {
                // this.stop(audioID);
            }

            cc.audioEngine.setEffectsVolume(volume);
            audioID = cc.audioEngine.playEffect(clip, isLoop);
            this._vAudioIDMap.add(url, audioID);
        }

        let clip: cc.AudioClip = cv.resMgr.get(url, cc.AudioClip);
        if (!clip) {
            cv.resMgr.load(url, cc.AudioClip, (clip: cc.AudioClip): void => {
                playFunc(clip);
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
        }
        else {
            playFunc(clip);
        }
    }

    /**
     * 播放按钮音效
     * @param voiceName 音效名称
     * @param isLoop    是否循环
     * @param volume    声音大小
     */
    playButtonSound(voiceName: string, isLoop: boolean = false, volume: number = 0.5) {
        // 视频牛仔按钮声音需要设置为0.09
        if (cv.config.getCurrentScene() === cv.Enum.SCENE.VIDEOCOWBOY_SCENE) {

            volume = 0.09;
        }
        this.playEffect(this._buttonSoundUrl + voiceName, isLoop, volume);
    }

    /**
     * 获取播放时间
     * @param url 
     */
    getDuration(audioID: number): number {
        let time = cc.audioEngine.getDuration(audioID);
        return time;
    }

    /**
     * 获取音频id(只有使用了该类的"play"相关方法才能获取到音频id)
     * @param url 音频文件路径 (resources下相对路径且不包含后缀名)
     */
    getAudioID(url: string): number {
        let audioID: number = -1;
        this._vAudioIDMap.forEach((path: string, id: number): any => {
            if (path === url) {
                audioID = id;
                return "break";
            }
        });
        return audioID;
    }

    /**
     * 停止播放指定音频
     * @param audioID 音频ID
     */
    stop(audioID: number): void {
        cc.audioEngine.stop(audioID);
    }

    /**
     * 停止播放背景音乐
     */
    stopMusic(): void {
        cc.audioEngine.stopMusic();
    }

    /**
     * 停止播放指定音效
     * @param audioID 音频ID
     */
    stopEffect(audioID: number): void {
        cc.audioEngine.stopEffect(audioID);
    }

    /**
     * 停止播放所有音频
     */
    stopAll(): void {
        cc.audioEngine.stopAll();
    }

    /**
     * 停止播放所有音效
     */
    stopAllEffects(): void {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 暂停正在播放音频
     * @param audioID 
     */
    pause(audioID: number): void {
        cc.audioEngine.pause(audioID);
    }

    /**
     * 暂停现在正在播放的背景音乐
     */
    pauseMusic(): void {
        cc.audioEngine.pauseMusic();
    }

    /**
     * 暂停现在正在播放的所有音频
     */
    pauseAll(): void {
        cc.audioEngine.pauseAll();
    }

    /**
     * 恢复播放指定的音频
     * @param audioID 
     */
    resume(audioID: number): void {
        cc.audioEngine.resume(audioID);
    }

    /**
     * 恢复播放所有之前暂停的所有音频
     */
    resumeAll(): void {
        cc.audioEngine.resumeAll();
    }

    /**
     * 恢复播放背景音乐
     */
    resumeMusic(): void {
        cc.audioEngine.resumeMusic();
    }

    /**
     * 场景或者资源管理删除音频资源时候, 记得调用顺便清理该类保存的音频ID
     * @param url 
     */
    releaseAudio(url: string): void {
        this._vAudioIDMap.remove(url);
    }

    // 卸载音频接口暂时注释, 释放资源统一再"ResourceManager"里处理
    // /**
    //  * 卸载预加载的音频
    //  * @param clip 
    //  */
    // uncache(clip: cc.AudioClip): void {
    //     cc.audioEngine.uncache(clip);
    // }

    // /**
    //  * 卸载所有音频
    //  */
    // uncacheAll(): void {
    //     cc.audioEngine.uncacheAll();
    // }
}
