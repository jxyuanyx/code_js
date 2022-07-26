export interface IAudioManager {

    /**
     * 播放背景音乐
     * @param path 
     * @param loop 
     */
    playBGM(bundleName:string,path:string,loop:boolean);

    /**
     * 播放音效
     * @param path 
     * @param time 
     * @param vol 
     * @param cb 
     */
    playSound(bundleName:string,path:string);


    playGameBGM(path:string,loop:boolean);

    playGameSound(path:string);

    init();

    /**
     * 设置背景音乐音量
     * @param vol 
     */
     setBgmVol(vol:number);

    /**
     * 设置音效音量
     * @param vol 
     */
    setSoundVol(vol:number);

    /**
     * 获取背景的音量
     */
    getBgmVol():number;

    /**
     * 获取声音的音量
     */
    getSoundVol():number;

    stopBgm():void;

    
    //开启游戏振动
    openGameVibrator();

    //关闭游戏振动
    closeGameVibrator();

    //游戏游戏背景音乐音量
    setGameMusic(vol:number);

    //游戏声效音量
    setGameSound(vol:number);

    /**
     * 获取配置 
     */
    getGameConfig():{vibrator:number,music:number,sound:number};

    /**
     * 初始化游戏配置 
     */
    addGameConfig(key:string,config:{vibrator:number,music:number,sound:number}):void;

    pauseMusic():void;

    pauseSound():void;

    stopSound(soundName:string):void;

    stopGameSound(path:string);

    resumeMusic():void;

    resumeSound():void;
}