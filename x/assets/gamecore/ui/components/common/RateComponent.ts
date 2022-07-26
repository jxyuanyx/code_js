import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import executeInEditMode = cc._decorator.executeInEditMode;
import disallowMultiple = cc._decorator.disallowMultiple;

@ccclass()
//@ts-ignore
@executeInEditMode(true)
//@ts-ignore
@disallowMultiple(true)
export class RateComponent extends cc.Component {
    // 用来缓存评分条中的子节点.
    private static readonly NodePool: cc.NodePool = new cc.NodePool(cc.Sprite);

    @property()
    private _rate: number = 1;

    @property({displayName: "初始评分", tooltip: "评分默认值,整数类型,会被强制四舍五入"})
    // private rate: number = 0;
    // @property()
    set rate(r) {
        this._rate = r;
        cc.log("===========", this._rate);
        this._updateRateUi();
    }

    get rate() {
        return this._rate;
    }

    @property()
    private _span: number = 0;

    @property({displayName: "间隔", tooltip: "范围:-0.9~1,为负数时产生堆叠效果."})
    set span(r){
        this._span = r;
        this._updateRateUi()
    }
    get span(){
        return this._span;
    }

    @property({displayName: "每行最大评分数量", tooltip: "根据评分数量以及材质大小,间隔等自动计算节点宽度"})
    private maxRateInLine: number = 3;

    @property({type: [cc.SpriteFrame], displayName: "评分显示的小星星资源", tooltip: "可设置多个等级的星星,月亮,太阳等"})
    private rateSprite: cc.SpriteFrame[] = [];


    protected onEnable(): void {
        this._updateRateUi();
    }

    private _updateRateUi() {
        if (this.rateSprite.length <= 0) {
            cc.warn("评分条未设置显示资源");
            return;
        }
        let index = Math.floor(this.rate / (this.maxRateInLine + 1));
        if (index >= this.rateSprite.length) {
            console.warn("评分设置超过最大允许数值,需要增加评分贴图进行扩充.");
            index = this.rateSprite.length - 1;
        }
        const rateReal = this.rate - this.maxRateInLine * index;

        if (this.node.childrenCount > rateReal) {
            for (let i = this.node.childrenCount - 1; i >= rateReal; i--) {
                RateComponent.NodePool.put(this.node.children[i]);
            }
        } else if (this.node.childrenCount < rateReal) {
            for (let i = this.node.childrenCount; i < rateReal; i++) {
                let node = RateComponent.NodePool.get();
                if (node == null) {
                    node = new cc.Node();
                    const sprite = node.addComponent(cc.Sprite);
                    sprite.type = cc.Sprite.Type.SLICED;
                    sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED
                }
                this.node.addChild(node);
            }
        }

        const w = (1 + this.span) * this.rateSprite[0].getRect().width / 2;
        for (let i = 0; i < this.node.childrenCount; i++) {
            const node = this.node.children[i];
            node.name = "Node." + i;
            const sprite = node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.rateSprite[index];
            node.x = w * (2 * i - rateReal + 1);
            node.y = 0;
        }
        this.node.width = (rateReal - 1) * w * 2 + this.rateSprite[index].getRect().width;
    }
}