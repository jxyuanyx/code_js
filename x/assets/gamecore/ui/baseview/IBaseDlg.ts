import {DlgEnum} from "../../enums/DlgEnum";

export declare interface IBaseDlg {

    /**
     * 对话框的名字
     */
    dlgName:string;

    /**
     * 显示方式
     */
    showMode:DlgEnum;


    bundleName:string;

    /**
     * 显示
     * @param data
     */
    show(data:any);

    /**
     * 更新数据
     * @param data 
     */
    updateData(data:any);
    /**
     * 隐藏
     */
    hide();

    /**
     * 显示前调用
     */
    beforeShow();

    /**
     * 显示后调用
     */
    afterShow();

    /**
     * 隐藏前
     */
    beforeHide();

    /**
     * 隐藏后
     */
    afterHide();
}