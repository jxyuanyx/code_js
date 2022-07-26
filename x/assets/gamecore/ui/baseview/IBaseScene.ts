import { Package } from "../../net/Package";

export interface IBaseScene{
    /**
     * 收到消息处理
     * @param pkg 
     */
    onMessage(pkg:Package):void;

    /**
     * 进入之前调用
     */
    beforeEnter():void;

    /**
     * 显示之后调用
     */
    afterEnter():void;

    /**
     *退出之前调用
     */
    beforeExit():void;

    /**
     * 返回这个场景，一般用于对话框返回时调用
     */
    back():void;

    /**
     * 退出这个场景
     */
    exit():void;

}
