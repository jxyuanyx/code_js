export interface ISceneManager {
    /**
     * 预加载场景
     * @param sceneName
     * @param bundle
     */
    preLoadScene(sceneName:string,bundle?:string):void;

    /**
     * 加载场景
     * @param sceneName
     * @param bundle
     */
    loadScene(sceneName:string,bundle?:string,cb?:Function,openUIFlushing?:boolean):void;

    /**
     * 同步加载
     * @param sceneName 
     * @param bundle 
     */
    loadSceneAsync(sceneName:string,bundle?:string,openUIFlushing?:boolean);

    backHall():void;

    currentSceneName():string;

    curentBundle():string;

    isInGame():boolean;
}