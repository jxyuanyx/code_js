import {IBaseDlg} from "../IBaseDlg";
import {DlgEnum} from "../../../enums/DlgEnum";
import App from "../../../App";
import {BaseComponent} from "./BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseDlg extends BaseComponent implements IBaseDlg{
    
    showMode: DlgEnum;

    dlgName: string;

    bundleName:string;

    showTime:number=null;

    hideTime:number=null;

    protected _data:any;

    @property({displayName:"是否点击空白自动关闭"})
    hitSpaceHide:boolean=true;

    @property({displayName:"是否自动创建背景"})
    autoMask:boolean=true;

    @property({displayName:"背景透明度"})
    bgOpacity:number=150;

    @property({displayName:"是否全屏"})
    isFull:boolean=false;

    onLoad(){
        super.onLoad();
        this.beforeShow();
    }

    afterHide() {

    }

    afterShow() {

    }

    beforeHide() {
        if(this.dlgName!="loading"&&this.dlgName!="toast"){
            App.AudioManager.playSound("gamecore","sounds/return")
        }
    }

    beforeShow() {

    }

    init(data:any){
        this._data=data;
        if(this.isFull){
            this.node.height=cc.winSize.height;
        }
    }

    hide() {
        App.DlgManager.hideDlg(this.dlgName,this.bundleName);
    }

    show(data: any) {

    }

    updateData(data:any){
        
    }

    onCloseClick(){
        this.hide();
    }

}