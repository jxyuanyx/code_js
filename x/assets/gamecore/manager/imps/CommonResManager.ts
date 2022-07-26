import App from "../../App";
import { ICommonRes } from "../ICommonRes";


export const enum COMMON_RES{
    DATALOADING="dataloading",
    TOPTIP="toptip",
    MARQUEE="marquee",
    EMPTYDATA="emptyData",
    CURSOR="cursor"

}

export class CommonResManager implements ICommonRes{

    private _ress:Map<string,cc.Asset>=new Map();


    constructor(){

    }

    loadSystemRes(onComplete?: Function, target?: any){
        let sysRes=[
            {key:COMMON_RES.DATALOADING,path:`commonRes/${COMMON_RES.DATALOADING}/main`,type:cc.Prefab},
            {key:COMMON_RES.MARQUEE,path:`commonRes/${COMMON_RES.MARQUEE}/main`,type:cc.Prefab},
            {key:COMMON_RES.EMPTYDATA,path:`commonRes/${COMMON_RES.EMPTYDATA}/main`,type:cc.Prefab},
            {key:COMMON_RES.CURSOR,path:`commonRes/${COMMON_RES.CURSOR}/main`,type:cc.Prefab},
        ];
        this.loadCommonResArray(sysRes,"gamecore",onComplete,target);
    }


    loadCommonResArray(res: { key: string,path: string,type:typeof cc.Asset}[],bundleName:string,onComplete?: Function, target?: any) {
        let count=0;
        for(let i=0;i<res.length;i++){
            this.loadCommonRes(res[i],bundleName,()=>{
                if(++count==res.length){
                    onComplete&&onComplete.call(target);
                }
            })
        }
    }   

    loadCommonRes(res: { key: string, path: string,type:typeof cc.Asset },bundleName:string, onComplete?: Function, target?: any) {
        let bundle=App.BundleManager.getBundle(bundleName);
        //@ts-ignore
        bundle.load(res.path,res.type,(err:Error,asset:cc.Asset)=>{
            if(!err){
                this._ress.set(res.key,asset);
                onComplete&&onComplete.call(target,asset);
            }
        })
    }

    getRes(key: string): cc.Asset {
        return this._ress.get(key);
    }

    releaseRes(key: string): void {
        this._ress.get(key).destroy();
        this._ress.delete(key);
    }

}