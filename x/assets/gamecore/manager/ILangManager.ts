export enum LANG{
    ZH="zh",
    EN="en"
}

export interface ILangManager{
    /**
     * 初始化语言包
     * @param lang                  语言包
     * @param defaultBundleName     默认bundle名
     */
    init(lang:LANG,defaultBundleName:string):void;

    /**
     * 切换语言包
     */
    changeLang(lang:LANG):void;

    /**
     * 加载子包语言包
     * @param bundleName 
     */
    loadBundleLang(bundleName:string,cb?:Function,target?:any);

    /**
     * 获取语言包
     * @param key 
     * @param args 
     * @example Test:"aaaaaa%sbbbbbb" App.LangManager.getTxtByKey("Test",["123"]) //return aaaaaa123bbbbbb
     */
    getTxtByKey(key:string,args?:(string|number)[],bundleName?:string):any;

    getTxtByCurrentGame(key:string,args?:(string|number)[]):any;

    /**
     * 获取图片
     * @param key 
     * @param args 
     * @param bundleName 
     */
    getSpriteFrameByKey(key:string,bundleName?:string):cc.SpriteFrame;

}