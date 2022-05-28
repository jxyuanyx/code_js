/**
 * tag标记组件(功能类似于cocos2d-x 的 node.setTag(); node.getTag())
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class TagCom extends cc.Component {
    @property({
        type: cc.Integer,
        tooltip: "自定义数字型索引"
    })
    nIdx: number = 0;

    @property({
        type: cc.Float,
        tooltip: "自定义数字型标签"
    })
    nTag: number = 0;

    @property({
        //type: cc.Boolean, (不注释编译时总是弹出警告, 提示要注释此行)
        tooltip: "自定义布尔型标签"
    })
    bTag: boolean = false;

    @property({
        //type: cc.String, (不注释编译时总是弹出警告, 提示要注释此行)
        tooltip: "自定义字符型标签"
    })
    sTag: string = "";

    protected onLoad(): void {
    }

    protected start(): void {
    }

    /**
     * 重置默认值
     */
    reset(): void {
        this.nIdx = 0;
        this.nTag = 0;
        this.sTag = "";
        this.bTag = false;
    }
}
