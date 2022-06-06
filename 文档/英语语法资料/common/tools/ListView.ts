const { ccclass, property } = cc._decorator;

//行信息
class ItemInfo {
    data: any;
    type: number;
    height: number;
    top: number;
    bottom: number;
}

//节点池
class NodePool {
    height: number;
    pool = new cc.NodePool();
}

@ccclass
export default class ListView extends cc.Component {

    sv: cc.ScrollView;

    //类型和节点池按下标对应,下标代表行的类型
    @property([cc.Prefab])
    pfb_types: cc.Prefab[] = [];
    np_types: NodePool[] = [];

    bindItemFunc: Function;
    getItemTypeFunc: Function;

    //内容上下Padding
    contentPaddingTop: number = 0;
    contentPaddingBottom: number = 0;

    //数据和行信息按下标对应
    datas: any[];
    itemInfos: ItemInfo[];
    private _scrollEventTarget: any = null;                 // 滚动事件接收对象

    onDestroy(){
        this.clear();
    }
    onLoad() {
        this.sv = this.node.getComponent(cc.ScrollView);

        for (let type = 0; type < this.pfb_types.length; type++) {
            let np = new NodePool();
            this.np_types[type] = np;

            let node = this.createItemNodeFromPool(type);
            np.height = node.height;
            this.recycleItemNodeToPool(type, node);
        }

        this.node.on("scrolling", (sv: cc.ScrollView) => this.updateDisplay(), this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onSVEventTouchCancel, this);


       
        if (this.sv.vertical) {
            this.sv.node.on("scroll-to-top", this._onSVEventScrollToTop, this);                         // 滚动视图滚动到顶部边界事件
            this.sv.node.on("scroll-to-bottom", this._onSVEventScrollToBottom, this);                   // 滚动视图滚动到底部边界事件
            this.sv.node.on("bounce-top", this._onSVEventBounceTop, this);                              // 滚动视图滚动到顶部边界并且开始回弹时发出的事件
            this.sv.node.on("bounce-bottom", this._onSVEventBounceBottom, this);                        // 滚动视图滚动到底部边界并且开始回弹时发出的事件
        }

        
        if (this.sv.horizontal) {
            this.sv.node.on("scroll-to-left", this._onSVEventScrollToLeft, this);                       // 滚动视图滚动到左边边界事件
            this.sv.node.on("scroll-to-right", this._onSVEventScrollToRight, this);                     // 滚动视图滚动到右边边界事件
            this.sv.node.on("bounce-left", this._onSVEventBounceLeft, this);                            // 滚动视图滚动到左边边界并且开始回弹时发出的事件
            this.sv.node.on("bounce-right", this._onSVEventBounceRight, this);                          // 滚动视图滚动到右边边界并且开始回弹时发出的事件
        }
    }

    
    /**
     * 绑定滚动事件接收对象
     */
    bindScrollEventTarget(target: any): void {
        if (!target) return;
        this._scrollEventTarget = target;
    }
    
   

       /**
     * 滚动视图滚动到顶部边界事件
     */
    private _onSVEventTouchCancel(arg: cc.ScrollView): void {

        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventTouchCancel === "function") {
            this._scrollEventTarget.onSVEventTouchCancel(arg);
        }
    }

    /**
     * 滚动视图滚动到顶部边界事件
     */
    private _onSVEventScrollToTop(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventScrollToTop === "function") {
            this._scrollEventTarget.onSVEventScrollToTop(arg);
        }
    }

    /**
     * 滚动视图滚动到底部边界事件
     */
    private _onSVEventScrollToBottom(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventScrollToBottom === "function") {
            this._scrollEventTarget.onSVEventScrollToBottom(arg);
        }
    }


        /**
     * 滚动视图滚动到顶部边界并且开始回弹时发出的事件
     */
    private _onSVEventBounceTop(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventBounceTop === "function") {
            this._scrollEventTarget.onSVEventBounceTop(arg);
        }
    }

    /**
     * 滚动视图滚动到底部边界并且开始回弹时发出的事件
     */
    private _onSVEventBounceBottom(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventBounceBottom === "function") {
            this._scrollEventTarget.onSVEventBounceBottom(arg);
        }
    }

        /**
     * 滚动视图滚动到左边边界事件
     */
    private _onSVEventScrollToLeft(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventScrollToBottom === "function") {
            this._scrollEventTarget.onSVEventScrollToLeft(arg);
        }
    }

        /**
     * 滚动视图滚动到右边边界事件
     */
    private _onSVEventScrollToRight(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventScrollToBottom === "function") {
            this._scrollEventTarget.onSVEventScrollToRight(arg);
        }
    }

        /**
     * 滚动视图滚动到左边边界并且开始回弹时发出的事件
     */
    private _onSVEventBounceLeft(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventBounceLeft === "function") {
            this._scrollEventTarget.onSVEventBounceLeft(arg);
        }
    }

    /**
     * 滚动视图滚动到右边边界并且开始回弹时发出的事件
     */
    private _onSVEventBounceRight(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventBounceRight === "function") {
            this._scrollEventTarget.onSVEventBounceRight(arg);
        }
    }
    


    /**
     * 适配 widget(当前帧立即生效)
     * @param node          要适配的节点
     * @param bTransChild   是否遍历适配子节点(默认 false)
     */
    private _adaptWidget(node: cc.Node, bTransChild?: boolean): void {
        if (!node) return;

        let widget: cc.Widget = node.getComponent(cc.Widget);
        if (widget) {
            let enabled: boolean = widget.enabled;
            widget.enabled = true;
            widget.updateAlignment();
            widget.enabled = enabled;
        }

        if (bTransChild) {
            for (let i = 0; i < node.children.length; ++i) {
                this._adaptWidget(node.children[i], bTransChild);
            }
        }
    }


    private createItemNodeFromPool(type: number) {
        let pool = this.np_types[type].pool;
        if (pool.size() > 0) {
            return pool.get();
        } else {
            let node = cc.instantiate(this.pfb_types[type]);
            node.setAnchorPoint(0, 1);
            node.x = 0;
            return node;
        }
    }

    private recycleItemNodeToPool(type: number, itemNode: cc.Node) {
        this.np_types[type].pool.put(itemNode);
    }

    public updateDisplay() {
        if (!this.itemInfos || this.itemInfos.length == 0) return;

        const maxScrollY = this.sv.getMaxScrollOffset().y;
        var scrollY = this.sv.getScrollOffset().y;
        if (scrollY < 0) scrollY = 0;
        else if (scrollY > maxScrollY) scrollY = maxScrollY;

        
        if (this._scrollEventTarget &&  this._scrollEventTarget.onSVEventScrolling &&
            typeof this._scrollEventTarget.onSVEventScrolling === "function") {
            this._scrollEventTarget.onSVEventScrolling(this.sv);
        }

        let startIndex = null, endIndex = null;
        for (let i = 0; i < this.itemInfos.length; i++) {
            const info = this.itemInfos[i];
            if (startIndex == null && info.bottom >= scrollY) {
                startIndex = i;
            } else if (endIndex == null && info.bottom >= scrollY + this.node.height) {
                endIndex = i;
            }
            if (startIndex != null && endIndex != null) break; //确定了边界，跳出
        }
        if (startIndex == null) startIndex = 0;
        if (endIndex == null) endIndex = this.itemInfos.length - 1;

        //回收节点
        this.recycleContentItemNodes(false, startIndex, endIndex);

        //添加需要显示的节点
        for (let i = startIndex; i <= endIndex; i++) {
            const iStr = i.toString();
            if (this.sv.content.getChildByName(iStr)) continue; //当前在显示了

            const info = this.itemInfos[i];
            const node = this.createItemNodeFromPool(info.type);
            node.y = -info.top;
            this.sv.content.addChild(node, 1, iStr);
            this.bindItemFunc(node, info.data, i, this.itemInfos);
        }
    }

    /**
     * 回收不需要显示的节点,倒序
     * @param isForce true 全部回收，不管要不要显示
     * 当isForce=false,需要携带下面两个参数
     * @param startIndex 显示的起始坐标
     * @param endIndex 显示的结束坐标
     */
    private recycleContentItemNodes(isForce: boolean, startIndex?: number, endIndex?: number) {
        let children = this.sv.content.children;
        for (let i = children.length - 1; i >= 0; i--) {
            const node = children[i];
            const index = this.getIndexByItemNode(node);

            if(node.name == "listLoding"){  //大厅房间列表，loading提示语不复用
                continue;
            }
            if (isForce || index < startIndex || index > endIndex) { //强制或越界
                this.recycleItemNodeToPool(this.itemInfos[index].type, node);
            }
        }
    }

    public init<T>(bindItemFunc: (item: cc.Node, data: T, index: number, result: any[]) => void,
        getItemTypeFunc?: (data: T, index: number, result: any[]) => void) {
        this.bindItemFunc = bindItemFunc;
        this.getItemTypeFunc = getItemTypeFunc;
    }

    public setContentPadding(top: number, bottom: number) {
        this.contentPaddingTop = top;
        this.contentPaddingBottom = bottom;
    }

    public notifyDataSetChanged(datas: any[]) {
        this.recycleContentItemNodes(true);

        this.datas = datas;
        this.itemInfos = [];
        this.computeContentHeight();
        this.updateDisplay();
    }

    private computeContentHeight() {
        var totalHeight = this.contentPaddingTop;
        for (let i = 0; i < this.datas.length; i++) {
            const info = new ItemInfo();
            info.data = this.datas[i];
            info.type = this.getItemTypeByData(info.data, i, this.datas);
            info.height = this.np_types[info.type].height;
            info.top = totalHeight;
            info.bottom = info.top + info.height;
            this.itemInfos[i] = info;

            totalHeight = info.bottom;
        }
        totalHeight += this.contentPaddingBottom;
        
        if(totalHeight <  this.sv.content.parent.height){
            totalHeight =  this.sv.content.parent.height;
        }
        this.sv.content.height = totalHeight;
    }

    private getItemTypeByData(data: any, index: number, result: any[]) {
        if (this.getItemTypeFunc) return this.getItemTypeFunc(data, index, result);
        return 0;
    }

    public clear() {
        this.itemInfos = null;
        this.datas = null;
        if(cc.isValid(this.sv,true)){
            this.sv.content.destroyAllChildren();
            this.sv.content.removeAllChildren(true);
            this.sv.content.height = 0;
        }
        this.np_types.forEach(np => np.pool.clear());
    }

    public getIndexByItemNode(itemNode: cc.Node) {
        return parseInt(itemNode.name);
    }
}
