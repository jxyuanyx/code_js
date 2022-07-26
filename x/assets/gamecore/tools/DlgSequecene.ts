// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../App";
import BaseDlg from "../ui/baseview/imp/BaseDlg";

const {ccclass} = cc._decorator;

//export const DLG_REMOVE:string="dlg_remove";

@ccclass
export  class DlgSequecene extends cc.EventTarget {

    private _dlgs:{key:string,data:any}[]=[];
    private static _dlgSequecene:DlgSequecene;
    private _currentInfo:any=null;

    constructor(){
        super();
        //this.on(DLG_REMOVE,this._onRemoveDlg,this);
    }

    static getInstance():DlgSequecene{
        if(!this._dlgSequecene){
            this._dlgSequecene=new DlgSequecene();
        }
        return this._dlgSequecene;
    }

    add(dlgKey:string,data?:any){
        this._dlgs.push({key:dlgKey,data:data});
        if(!this._currentInfo){
            this._start();
        }
    }

    _start(){
        this._currentInfo=this._dlgs.shift();
        let data=this._currentInfo.data;
        let keys=this._currentInfo.key.split("_");
        App.DlgManager.showDlg(keys[1],data,keys[0]);
    }

    removeDlg(dlgKey){
        if(!this._currentInfo)return;
        if(dlgKey==this._currentInfo.key){
            if(this._dlgs.length>0){
                this._start();
            }else{
                this._currentInfo=null;
            }
        }
    }



}
