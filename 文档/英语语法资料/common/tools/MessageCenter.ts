// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
class msgItem {
    callback: Function = null;
    object : cc.Object = null;
}

const { ccclass, property } = cc._decorator;

@ccclass
export class MessageCenter extends cc.Component {

    private _Que: any = null;
    /*
    public register(msg: string, callback: Function, isClean?: boolean, object ?: cc.Node) {
        isClean = (isClean != false) ? true : false;
        if (this._Que === null) {
            this._Que = {};
        }
        if (!this._Que[msg]) {
            this._Que[msg] = [];
        }
        console.log("添加注册 msg = " + msg);
        let item: msgItem = new msgItem();
        item.callback = callback;
        item.isClean = isClean;
        if (object) {
            item.object = object;
        }
        this._Que[msg].push(item);
    };

    public unregister(msg: string) {  //单个清理
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        if (!this._Que[msg]) {
            console.log("未注册该消息" + msg);
            return;
        }
        let len = this._Que[msg].length;
        let found = false;
        for (let i = len - 1; i >= 0; i--) {
            console.log("unregister ===> " + msg + ",个数：" + len);
            console.log(this._Que[msg][i]);
            this._Que[msg].splice(i, 1);
        }
    };

    public unregisterByFunc(msg: string, callback: Function) {
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        if (!this._Que[msg]) {
            console.log("未注册该消息" + msg);
            return;
        }
        let item:msgItem[] = this._Que[msg];
        let len = item.length;

        for (let i = len - 1; i >= 0; i--) {
            if (item[i].callback === callback) {
                item.splice(i, 1);
            }
        }
    }

    public unregisterByObj(msg: string, object: cc.Node) {
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        if (!this._Que[msg]) {
            console.log("未注册该消息" + msg);
            return;
        }
        let item:msgItem[] = this._Que[msg];
        let len = item.length;

        for (let i = len - 1; i >= 0; i--) {
            if (item[i].object === object) {
                item.splice(i, 1);
            }
        }
    }

    public send(msg: string, params: any = null) {
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        if (!this._Que[msg]) {
            console.log("未注册该消息" + msg);
            return;
        }
        let callbacks = this._Que[msg];
        let len = callbacks.length;
        console.log("send ===> " + msg + ",个数：" + len);
        for (let i = len - 1; i >= 0; i--) {
            callbacks[i].callback(params);
        }
    };

    public clean() {//一个场景清理一次
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        for (let key in this._Que) {
            let item = this._Que[key];
            for (let i = 0; i < item.length;) {
                if (item[i].isClean) {
                    item.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
    };
    */
    private static instance: MessageCenter;

    public static getInstance(): MessageCenter {
        if (!this.instance) {
            this.instance = new MessageCenter();
        }
        return this.instance;
    };

    /**
     * 注册消息
     * @param msg 消息名称
     * @param callback 回调函数
     * @param object 注册消息的对象
     */
    public register(msg: string, callback: Function, object: cc.Object) {
        if (!object || !(object instanceof cc.Object)) {
            console.log("请传入正确的注册对象");
            return;
        }
        if (this._Que === null) {
            this._Que = {};
        }
        if (!this._Que[msg]) {
            this._Que[msg] = [];
        }
        
        if(this.isObjectHasRegister(msg,object)){
            console.log("该对象已经注册过该消息： " + msg);
            return;
        }
        console.log("添加注册 msg = " + msg);
        let item: msgItem = new msgItem();
        item.callback = callback;
        item.object = object;
        
        this._Que[msg].push(item);
    };

    /**
     *判断当前对象是否已注册过该消息
     * @param msg 消息名称
     * @param object 消息对象节点
     */
    public isObjectHasRegister(msg: string,  object: cc.Object){
        let item:msgItem[] = this._Que[msg];
        let len = item.length;
        for (let i = len - 1; i >= 0; i--) {
            if (item[i].object === object) {
               return true;
            }
        }
        return false;
    }

    /**
     * 移除对象消息
     * @param msg 移除消息名称
     * @param object 移除消息对象节点
     */
    public unregister(msg: string, object: cc.Object) {
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        if (!this._Que[msg]) {
            console.log("未注册该消息" + msg);
            return;
        }
        let item:msgItem[] = this._Que[msg];
        let len = item.length;

        for (let i = len - 1; i >= 0; i--) {
            if (item[i].object === object) {
                item.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 
     * @param msg 发送消息名称
     * @param params
     */
    public send(msg: string, params: any = null) {
        if (this._Que === null) {
            console.log("_Que未初始化");
            return;
        }
        if (!this._Que[msg]) {
            console.log("未注册该消息" + msg);
            return;
        }
        let callbacks = this._Que[msg];
        let len = callbacks.length;
        console.log("send ===> " + msg + ",个数：" + len);
        for (let i = len - 1; i >= 0; i--) {
            callbacks[i].callback(params);
        }
    };

}
