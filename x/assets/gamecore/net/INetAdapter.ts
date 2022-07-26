import {Cmd} from "./Cmd";
import Bundle = cc.AssetManager.Bundle;

export interface INetAdapter {
    /**
     * 获取命令码
     */
    getCmds():Cmd[];

    /**
     * 格式化命令码
     * @param bundle
     * @param path  格式化路径
     */
    parseCmds(bundle:Bundle,path?:string):void;
}