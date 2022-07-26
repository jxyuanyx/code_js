import {TagEnum} from "../enums/TagEnum";

export interface ILogManager{
    /**
     * info
     * @param args 
     */
    i(...args:any):void;

    /**
     * error
     * @param args 
     */
    e(...args:any):void;

    show():void;

    hide():void;

    init(node:cc.Node);

    check(str:string):boolean;
}