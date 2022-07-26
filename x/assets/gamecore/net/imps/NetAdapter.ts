import {INetAdapter} from "../INetAdapter";
import {Cmd} from "../Cmd";
import Bundle = cc.AssetManager.Bundle;

export class NetAdapter implements INetAdapter{
    private _cmds:Cmd[];

    getCmds(): Cmd[] {
        return this._cmds;
    }

    parseCmds(bundle:Bundle,path:string="net_adapter"): void {
        bundle.load(path,cc.JsonAsset,(error, assets) => {
            if(error){
                cc.error("加载网络适配器失败",bundle.name,path)
            }else{
                this._cmds=(assets as any) as Cmd[];
            }
        })
    }

}