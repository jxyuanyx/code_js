import Bundle = cc.AssetManager.Bundle;

export interface IBundleManager {

    defaultBundle:string;

    /**
     * 加载bundle
     * @param bundleName
     */
    loadBundle(bundleName:string,cb?:Function,cbTarget?:any):void;

    loadSubGame(bundleName:string,cb?:Function,cbTarget?:any):void;

    /**
     * 释放bundle
     * @param bundleName
     */
    releaseBundle(bundleName:string):void;

    clearBundleCache(bundleName:string):void;


    /**
     * 获取Bundle
     * @param bundleName
     */
    getBundle(bundleName:string):Bundle;

    /**
     * 加载资源
     * @param assestPath 
     * @param cb 
     * @param cbTarget 
     * @param bundleName 
     */
    loadAssest(assestPath:string,assetType:any,cb:Function,cbTarget?:any,bundleName?: string);

    loadAssestAsync(assestPath:string,assetType:any,bundleName?: string);

    /**
     * 加载公共资源
     * @param paths 
     * @param onProgress 
     * @param onComplete 
     * @param target 
     */
    loadCommonAtlas(paths:string[],onProgress:Function,onComplete:Function,target?:any);

    /**
     * 加载bundle里面的公共资源
     * @param bundleName 
     * @param paths 
     * @param onProgress 
     * @param onComplete 
     * @param target 
     */
    loadBundleCommonAtlas(bundleName:string,paths:string[],onProgress?:Function,onComplete?:Function,target?:any);
    
    loadBundleCommon(bundleName:string,paths:string,onProgress?:Function,onComplete?:Function,target?:any);

    loadBundleCommonAtlasAsync(bundleName:string,paths:string[]);

    /**
     * 获取公共资源
     * @param key 
     */
    getCommonAtlas(key:string):cc.SpriteAtlas;

    setCommonAtlas(key:string,atlas:cc.SpriteAtlas);

    /**
     * 设置bundle版本号
     * @param versions 
     */
    setBundleVersions(versions:any);
    
}