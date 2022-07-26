import { resolve } from "path";
import App from "../../App";
import { TagEnum } from "../../enums/TagEnum";
import {IBundleManager} from "../IBundleManager";
import Bundle = cc.AssetManager.Bundle;
import SpriteAtlas = cc.SpriteAtlas;

export class BundleManager implements IBundleManager{

    defaultBundle: string;

    private _commonSpriteAtlas:Map<string,cc.SpriteAtlas>;

    private _bundlerVers:any={};
    
    constructor() {
        this._commonSpriteAtlas=new Map<string, cc.SpriteAtlas>();
    }

    setBundleVersions(versions: any) {
        this._bundlerVers=versions;
    }

    getBundle(bundleName: string): Bundle {
        let bundle=cc.assetManager.getBundle(bundleName);
        if(!bundle){
            App.LogManager.e("bundle["+bundleName+"]未加载")
            return null;
        };
        //App.LogManager.i(TagEnum.DEBUG,bundleName,"load from",bundle.base);
        return bundle;
    }


    loadBundle(bundleName: string,cb?:Function,cbTarget?:any): void {
        let bundle=this.getBundle(bundleName);
        if(bundle){
            App.LogManager.i(TagEnum.BUNDLE,bundleName,"已经加载");
            App.LangManager.loadBundleLang(bundleName,()=>{
                cb&&cb.call(cbTarget,bundle);
            })
            return;
        }
        cc.assetManager.loadBundle(bundleName,{version:this._bundlerVers[bundleName] || "" },(error,bundle)=>{
            if(error){
                App.LogManager.e(error);
            }else{
                App.LogManager.i(TagEnum.BUNDLE,bundleName,"加载完成");
                App.LangManager.loadBundleLang(bundleName,()=>{
                    cb&&cb.call(cbTarget,bundle);
                })
            }
        })
    }

    loadSubGame(bundleName: string,cb?:Function,cbTarget?:any){
        if(!cc.sys.isNative){
            this.loadBundle(bundleName,cb,cbTarget);
            return
        }

        //查找本地
        let manifest=jsb.fileUtils.getDefaultResourceRootPath()+"assets/"+bundleName;;//jsb.fileUtils.getWritablePath()+"mn/"+bundlePath;
        if(jsb.fileUtils.isFileExist(manifest+"/project.manifest")){
            manifest=bundleName;
        }else{
            manifest=jsb.fileUtils.getWritablePath()+"gamecaches/assets/"+bundleName;
        }

        App.NativeManager.echo("loadSubGame>>>>:"+manifest)

        cc.assetManager.loadBundle(manifest,(error,bundle)=>{
            App.LangManager.loadBundleLang(bundleName,()=>{
                cb&&cb.call(cbTarget,bundle);
            });
        })
    }

    releaseBundle(bundleName: string): void {
        let bundle=this.getBundle(bundleName);
        if(!bundle)return;
        bundle.releaseAll();
        cc.assetManager.removeBundle(bundle);
        App.LogManager.i("release bundle success",bundleName);
    }

    clearBundleCache(bundleName:string):void{
        let bundle=this.getBundle(bundleName);
        if(bundle){
            cc.assetManager.removeBundle(bundle);
        }
    }

    loadCommonAtlas(paths:string[],onProgress:Function,onComplete:Function,target?:any){
        cc.resources.load(paths,cc.SpriteAtlas,(finish, total, item) => {

        },((error, assets) => {
             App.LogManager.i(assets[0].name);
        }));
    }

    loadBundleCommonAtlas(bundleName:string,paths:string[],onProgress?:Function,onComplete?:Function,target?:any){
        let bundle=this.getBundle(bundleName);
        bundle.load(paths,cc.SpriteAtlas,(finish, total, item) => {
            onProgress&&onProgress.call(target,finish, total)
        },((error, assets) => {
            if(error){
                App.LogManager.e(error.message);
            }else{
                assets.forEach(asset=>{
                    App.LogManager.i(bundleName+"/"+asset.name.split('.')[0])
                    this._commonSpriteAtlas.set(bundleName+"/"+asset.name.split('.')[0],asset as SpriteAtlas);
                })
                onComplete&&onComplete.call(target)
            }
        }));
    }

    loadBundleCommon(bundleName:string,path:string,onProgress?:Function,onComplete?:Function,target?:any){
        let bundle=this.getBundle(bundleName);
        bundle.load(path,cc.SpriteAtlas,(finish, total, item) => {
            onProgress&&onProgress.call(target,finish, total)
        },((error, asset) => {
            if(error){
                App.LogManager.e(error.message);
            }else{
                App.LogManager.i(bundleName+"/"+asset.name.split('.')[0])
                this._commonSpriteAtlas.set(bundleName+"/"+asset.name.split('.')[0],asset as SpriteAtlas);
                onComplete&&onComplete.call(target)
            }
        }));
    }
    

    loadBundleCommonAtlasAsync(bundleName:string,paths:string[]){
        return new Promise((resolve,reject)=>{
            let bundle=this.getBundle(bundleName);
            bundle.load(paths,cc.SpriteAtlas,(finish, total, item) => {
                
            },((error, assets) => {
                if(error){
                    App.LogManager.e(error.message);
                    reject(error.message);
                }else{
                    assets.forEach(asset=>{
                        App.LogManager.i(bundleName+"/"+asset.name.split('.')[0])
                        this._commonSpriteAtlas.set(bundleName+"/"+asset.name.split('.')[0],asset as SpriteAtlas);
                    })
                    resolve(null);
                }
            }));
        })
    }

    loadAssest(assestPath: string,assetType:any,cb: Function, cbTarget?: any,bundleName?:string) {
        if(typeof(arguments[2]) == "string"){
            bundleName=arguments[2];
        }
        if(!bundleName){
            bundleName=this.defaultBundle;
        }
        //App.LogManager.i(bundleName);
        
        let bundle=this.getBundle(bundleName);
        bundle.load(assestPath,assetType,(error:Error,assets:cc.Asset)=>{
            if(!error){
                cb.call(cbTarget,assets);
            }else{
                App.LogManager.e(error.message);
            }
        });
    }

    async loadAssestAsync(assestPath: string,assetType:any,bundleName?:string) {
        return new Promise((resolve,reject)=>{
            if(!bundleName){
                bundleName=this.defaultBundle;
            }
            let bundle=this.getBundle(bundleName);
            bundle.load(assestPath,assetType,(error:Error,assets:cc.Asset)=>{
                if(!error){
                    resolve(assets)
                }else{
                    reject(error.message);
                }
            });
        })
    }


    getCommonAtlas(key:string):cc.SpriteAtlas{
        let atlas=this._commonSpriteAtlas.get(key);
        if(!atlas)throw new Error(key+" 公共资源不存在");
        return atlas;
    }

    setCommonAtlas(key:string,atlas:cc.SpriteAtlas){
        this._commonSpriteAtlas.set(key,atlas);
    }


}