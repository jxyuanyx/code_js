// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tag extends cc.Component {
    @property intTag : number = 0;
    @property mark : string = "";

    //缓存数据
    private data:any;

    /**
     * setData
     */
    public setData(data) {
        this.data = data;
    }


    /**
     * setData
     */
    public getData() {
        return this.data;
    }

    /**
     * 获取标签
     */
    public getTag():number{
        return this.intTag;
    }

    /**
     * 设置标签
     */
    public setTag(tag:number) {
        this.intTag = tag;
    }

    /**
     * 设置字符串标记
     */
    public setMark(mark:string) {
        this.mark = mark
    }

    /**
     * 获取字符串标记
     */
    public getMark():string {
        return this.mark;
    }
}
