import App from "../../App";
import { ILangManager, LANG } from "../ILangManager";

export class LangManager implements ILangManager{
   
    private _langs:Map<string,any>=new Map();

    private _langAtlas:Map<string,cc.SpriteAtlas>=new Map();

    private _defaultBundle:string;

    private _lang:LANG;

    init(lang: LANG, defaultBundleName: string): void {
        this._lang=lang;
        this._defaultBundle=defaultBundleName;
    }

    _loadLangConfig(bundleName:string,cb?:Function,target?:any){
        if(this._langs.get(bundleName)){
            cb&&cb.call(target);
            return;
        }
        let count=0;

        let downloadComplete=()=>{
            count++;
            if(count==2){
                cb&&cb.call(target);
            }
        }

        let bundle=App.BundleManager.getBundle(bundleName);
        if(bundle){
            bundle.load(`i18n/${this._lang}`,cc.JsonAsset,(error,data:cc.JsonAsset)=>{
                if(error){
                    console.error("error>>>>",error.message);
                    downloadComplete();
                    return
                }
                this._langs.set(bundleName,data.json);
                downloadComplete();
            })
            bundle.load(`i18n/${this._lang}_atlas`,cc.SpriteAtlas,(error,data:cc.SpriteAtlas)=>{
                if(error){
                    console.error("error>>>>",error.message);
                    downloadComplete();
                    return
                }
                this._langAtlas.set(bundleName,data);
                downloadComplete();
            })
        }
    }

    loadBundleLang(bundleName: string,cb?:Function,target?:any) {
        this._loadLangConfig(bundleName,cb,target);
    }

    changeLang(lang: LANG): void {
        if(lang==this._lang)return;
        this._lang=lang;

        let keys=this._langs.keys();
        //@ts-ignore
        for(let key of keys){
            this._langAtlas.get(key).destroy();
            this._loadLangConfig(key);
        }
    }

    getTxtByKey(key: string, args?:(string|number)[],bundleName?: string): string {
        let defaultStr=`unset lang in ${this._lang}`
        if(arguments.length==2){
            if(args instanceof Array){//有占位符的情况
                bundleName=this._defaultBundle;
                if(!this._langs.get(bundleName)[key])return defaultStr;
                args.unshift(this._langs.get(bundleName)[key]);
                return cc.js.formatStr.apply(null,args);
            }else{
                bundleName=arguments[1];
                return this._langs.get(bundleName)[key] || defaultStr;
            }
        }else if(arguments.length==1){
            bundleName=this._defaultBundle;
            return this._langs.get(bundleName)[key] || defaultStr;
        }else{
            if(!this._langs.get(bundleName)[key])return defaultStr;
            args.unshift(this._langs.get(bundleName)[key]);
            return cc.js.formatStr.apply(null,args);
        }
    }

    getTxtByCurrentGame(key: string, args?:(string|number)[]){
        let subGameData=App.DataManager.getGameData();
        let bundleName:string;
        if(subGameData){
            bundleName=subGameData.packageName;
        }else{
            bundleName=App.BundleManager.defaultBundle;
        }
        if(args){
            return this.getTxtByKey(key,args,bundleName);
        }else{
            //@ts-ignore
            return this.getTxtByKey(key,bundleName);
        }
        
    }

    getSpriteFrameByKey(key: string, bundleName?: string): cc.SpriteFrame {
        if(!bundleName)bundleName=bundleName;
        if(!this._langAtlas.get(bundleName))return;
        return this._langAtlas.get(bundleName).getSpriteFrame(key)
    }
    
}