import {DlgEnum} from "../enums/DlgEnum";

export interface  IDlgManager{
    /**
     * 初始化
     * @param dlgMode   对话框的展示方式
     * @param showTime  显时所需时间
     * @param hideTime  关闭所需的时间
     */
    init(dlgMode:DlgEnum,showTime?:number,hideTime?:number);

    /**
     * 显示对话框
     * @param dlgName
     * @param data
     * @param gameName
     */
    showDlg(dlgName:string,data?:any,bundleName?:string)

    /**
     * 更新已经打开窗口的数据
     * @param dlgName 
     * @param data 
     */
    updateData(dlgName:string,data?:any,bundleName?:string);

    /**
     * 关闭对话框
     * @param dlgName
     */
    hideDlg(dlgName:string,bundleName?:string);

    /**
     * 预加载
     * @param dlgName
     * @param bundleName
     */
    preDlg(dlgName:string,bundleName?:string);

    /**
     * 对话框置顶，切换场景时用
     */
    frontDlgs():void;

    setDlgBg(bg:cc.SpriteFrame):void;

    getDlgBg():cc.SpriteFrame;

    /**
     * 设置对话框的宿主
     */
    setDlgLayer(layer:cc.Node):void;

    clearAllDlgs():void;

    closeTopDlg():boolean;

    isEmptyDlg():boolean;

    /**
     * 隐藏对话框
     * @param val 
     */
    setDlgActive(dlgName:string,val:boolean,bundle?:string);
}