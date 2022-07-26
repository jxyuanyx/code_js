import App from "../../App";
import { IAudioManager } from "../IAudioManager";

export const  AUDIO_GAME_KEY:string="gamesound_config";


export class AudioManager implements IAudioManager{

    private _musicVol:number=0.5;

    private _soundVol:number=0.5;

    private MUSIC_KEY:string="music_vol";
    private SOUND_KEY:string="sound_vol";
    
    private _SOUNDMAP:Map<String,number[]>=new Map();

    private _GameConfig:any={};

    constructor(){
        let gameConfig=cc.sys.localStorage.getItem(AUDIO_GAME_KEY);
        if(gameConfig){
            this._GameConfig=JSON.parse(gameConfig);
        }
    }

    init(){
        this._musicVol=parseFloat(cc.sys.localStorage.getItem(this.MUSIC_KEY) || 1);
        this._soundVol=parseFloat(cc.sys.localStorage.getItem(this.SOUND_KEY) || 0.5);
        cc.audioEngine.setMusicVolume(this._musicVol);
        cc.audioEngine.setEffectsVolume(this._soundVol);
    }


    addGameConfig(key: string, config: { vibrator: number; music: number; sound: number; }): void {
        this._GameConfig[key]=config;
    }

    playBGM(bundleName:string,path: string, loop: boolean) {
        let bundle=App.BundleManager.getBundle(bundleName);
        if(bundle){
            bundle.load(path,cc.AudioClip,(error,clip:cc.AudioClip)=>{
                cc.audioEngine.playMusic(clip, loop);
            })
        }
    }

    
    playSound(bundleName:string,path: string) {
        let bundle=App.BundleManager.getBundle(bundleName);
        if(bundle){
            bundle.load(path,cc.AudioClip,(error,clip:cc.AudioClip)=>{
                if (error) {
                    cc.log("playsoundError>>>>>>>>>>>>>>>>>>",error);
                }
                else{
                    let id=cc.audioEngine.playEffect(clip, false);
                    let soundPath=bundleName+"_"+path;
                    if(!this._SOUNDMAP.get(soundPath)){
                        this._SOUNDMAP.set(soundPath,[]);
                    }
                    this._SOUNDMAP.get(soundPath).push(id);
                }
            })
        }
    }

    stopSound(soundName:string){
        let ids=this._SOUNDMAP.get(soundName);
        if(ids){
            ids.forEach(id=>{
                cc.audioEngine.stopEffect(id);
            })
        }
    }

    setBgmVol(vol: number) {
        this._musicVol=vol;
        cc.audioEngine.setMusicVolume(this._musicVol);
        cc.sys.localStorage.setItem(this.MUSIC_KEY,vol);
    }

    setSoundVol(vol: number) {
        this._soundVol=vol;
        cc.audioEngine.setEffectsVolume(this._soundVol);
        cc.sys.localStorage.setItem(this.SOUND_KEY,vol);
    }

    getBgmVol(): number {
        return this._musicVol;
    }
    getSoundVol(): number {
        return this._soundVol;
    }

    stopBgm(){
        cc.audioEngine.stopMusic();
    }

    getGameConfig(){
        return this.gameConfig;
    }

    _saveGameConfig(){
        cc.sys.localStorage.setItem(AUDIO_GAME_KEY,JSON.stringify(this._GameConfig));
    }

    get gameConfig(){
        let gameData=App.DataManager.getGameData();
        return this._GameConfig[gameData.packageName];
    }

    openGameVibrator() {
        this.gameConfig.vibrator=1;
        this._saveGameConfig();
    }
    closeGameVibrator() {
        this.gameConfig.vibrator=0;
        this._saveGameConfig();
    }
    setGameMusic(vol: number) {
        this.gameConfig.music=vol;
        cc.audioEngine.setMusicVolume(this.gameConfig.music);
        this._saveGameConfig();
    }

    setGameSound(vol: number) {
        this.gameConfig.sound=vol;
        cc.audioEngine.setEffectsVolume(this.gameConfig.sound);
        this._saveGameConfig();
    }

    playGameBGM(path: string, loop: boolean) {
        cc.audioEngine.setMusicVolume(this.gameConfig.music);
        this.playBGM(App.DataManager.getGameData().packageName,path,loop);
    }
    
    playGameSound(path: string) {
        cc.audioEngine.setEffectsVolume(this.gameConfig.sound);
        this.playSound(App.DataManager.getGameData().packageName,path);
    }

    stopGameSound(path:string){
        this.stopSound(App.DataManager.getGameData().packageName+"_"+path);
    }

    pauseMusic(){
        cc.audioEngine.pauseMusic();
    }

    pauseSound(){
        cc.audioEngine.pauseAllEffects();
        cc.audioEngine.resumeMusic();
    }

    resumeMusic(){
        cc.audioEngine.resumeMusic();
    }

    resumeSound(){
        cc.audioEngine.resumeAllEffects();
    }

}