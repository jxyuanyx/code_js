/*******************************************************************************************************************************
class: ScrollViewReuse
brief: ScrollView 复用 item 组件(暂时只支持横/纵单向一维布局)

使用方法:
1.把该脚本挂在到对应的SrollView节点上(其他节点都可以, 若有多个Scrollview的时候自己要注意区分), 然后初始化"属性面板"上的显式属性
2.所绑定的预制键, 其脚本组件必须实现 updateSVReuseData 接口(函数原型: updateSVReuseData(index: number, dataArray: any[]): void { }, 其中dataArray为绑定时所传入的数据数组)

以下为外部接口
--- bindPrefab              绑定你要复用的预制件类型 + 预制件上的逻辑脚本 + 数据数组等(注: 这里只需要传入预制类型而不是预制实例, 内部有对应的实例管理)
--- reloadView              重新刷新视图 + 数据
--- rebindDataRef           重新绑定数据源引用(若中途数据源指向内存有所改变, 需要重新绑定数据源)
--- bindScrollEventTarget   绑定滚动事件接收对象(例如: 滚动到底部, 刷新新数据等), 绑定对象需实现 onSVEventScrollToTop(arg: cc.ScrollView): void { } 等若干接口
--- generateItemPool        生成一个预制实例池(池的数量即为外部设置的spawnCount的数量, 当然内部会在其基础上计算最终的有效值, 外部设置的只作为参考值)
--- isGenerateItemPool      是否生成预制池
--- addItem                 添加一个子项
--- removeItem              移除子项
--- removeAll               移除所有子项
--- scrollToFixedPosition   滚动指定距离
--- getScrollFixedPosition  获取滚动偏移距离
--- resetScrollVewSize      重置滚动视图大小
--- updateCellAtIndex       更新指定UI索引项

注: 
1.若不想第一次添加就创建一个池,那么就无需调用generateItemPool(但若想要更流畅的效果, 建议第一次使用就生成预制池, 内部已处理: 每个对象只会创建一次)
2.在调用removeAll时, 参数cleanup : true时, 会清除所有项, 包括预制池(默认为false, 若无特殊情况, 请慎重传true)
********************************************************************************************************************************/

/**
 * 视图排列方向枚举
 */
enum eScrollViewReuseAlign {
    HORIZONTAL,                 // 横向(目前只支持从左到右)
    VERTICAL                    // 纵向(目前只支持从上到下)
}

const { ccclass, property } = cc._decorator;
@ccclass
export class ScrollViewReuse extends cc.Component {
    @property({
        type: cc.ScrollView,
        tooltip: "绑定的滚动视图(最好绑定在对应的scrollview节点上,每个scrollview互不干扰)"
    })
    scrollView: cc.ScrollView = null;

    @property({
        type: cc.Float,
        tooltip: "每项之间的间距(内部有智能检测, 可选填)"
    })
    spacing: number = 0;

    @property({
        type: cc.Float,
        tooltip: "要实例化的真实数量,这是固定值,一旦设置不会动态改变(内部有智能检测, 可选填)"
    })
    spawnCount: number = 0;

    @property({
        //type: cc.Boolean, (不注释编译时总是弹出警告, 提示要注释此行)
        tooltip: "自动计算最佳间距(若为:true, 则手动设置的\"spacing\"将无效; 默认为:false)"
    })
    autoCalculateSpacing: boolean = false;

    @property({
        //type: cc.Boolean, (不注释编译时总是弹出警告, 提示要注释此行)
        tooltip: "自动计算最佳间距的偏移量是增还是减, \'autoCalculateSpacing\'为true时才生效(默认false:减)"
    })
    autoSpacingOffsetIdcOrDec: boolean = false;

    @property({
        type: cc.Enum(eScrollViewReuseAlign),
        tooltip: "视图排列方向(目前只支持一维单向布局, 默认为纵向)"
    })
    align: eScrollViewReuseAlign = eScrollViewReuseAlign.VERTICAL;

    private _content: cc.Node = null;                       // 滚动视图展示内容的节点
    private _contentSrcSize: cc.Size = cc.Size.ZERO;        // 滚动视图展示内容的节点原始大小
    private _contentSrcPos: cc.Vec2 = cc.Vec2.ZERO;         // 滚动视图展示内容的节点原始位置
    private _items: cc.Node[] = [];                         // 子项预制数组
    private _itemsData: any[] = [];                         // 子项数据数组
    private _prefab: cc.Prefab = null;                      // 预制件
    private _prefabSize: cc.Size = cc.size(0, 0);           // 预制件大小
    private _prefab_com_name: any = null;                   // 预制件绑定的脚本组件
    private _totalCount: number = 0;                        // 子项总数(可见数量)

    private _updateTimer: number = 0;                       // 累计时间
    private _updateInterval: number = 0.2;                  // 时间间隔
    private _lastContentPos: cc.Vec2 = cc.Vec2.ZERO;        // 滚动内容上次位置
    private _bufferZone: number = 0;                        // 显示缓冲区大小(纵向高度)
    private _bufferMaxCount: number = 0;                    // 显示缓冲区所能显示的最大子项数量

    private _scrollEventTarget: any = null;                 // 滚动事件接收对象
    private _bindOnce: boolean = false;                     // 是否已绑定
    private _generateItemPoolOnce: boolean = false;         // 是否生成缓冲子项池

    protected onLoad(): void {
        // 初始化滚动内视图大小
        if (!this.scrollView) return;
        this._content = this.scrollView.content;

        // 监听事件
        this.scrollView.node.on("scrolling", this._onSVEventScrolling, this);                                   // 滚动视图正在滚动时发出的事件
        this.scrollView.node.on("scroll-ended", this._onSVEventScrollEnded, this);                              // 滚动视图滚动结束的时候发出的事件(触发一次)

        if (this.scrollView.vertical) {
            this.scrollView.node.on("scroll-to-top", this._onSVEventScrollToTop, this);                         // 滚动视图滚动到顶部边界事件
            this.scrollView.node.on("scroll-to-bottom", this._onSVEventScrollToBottom, this);                   // 滚动视图滚动到底部边界事件
            this.scrollView.node.on("bounce-top", this._onSVEventBounceTop, this);                              // 滚动视图滚动到顶部边界并且开始回弹时发出的事件
            this.scrollView.node.on("bounce-bottom", this._onSVEventBounceBottom, this);                        // 滚动视图滚动到底部边界并且开始回弹时发出的事件
        }

        if (this.scrollView.horizontal) {
            this.scrollView.node.on("scroll-to-left", this._onSVEventScrollToLeft, this);                       // 滚动视图滚动到左边边界事件
            this.scrollView.node.on("scroll-to-right", this._onSVEventScrollToRight, this);                     // 滚动视图滚动到右边边界事件
            this.scrollView.node.on("bounce-left", this._onSVEventBounceLeft, this);                            // 滚动视图滚动到左边边界并且开始回弹时发出的事件
            this.scrollView.node.on("bounce-right", this._onSVEventBounceRight, this);                          // 滚动视图滚动到右边边界并且开始回弹时发出的事件
        }

        // 其他事件
        // this.scrollView.node.on("scroll-began", (arg:cc.ScrollView): void => { }, this);                         // 滚动视图滚动开始时发出的事件
        // this.scrollView.node.on("scroll-ended-with-threshold", (arg:cc.ScrollView): void => { }, this);          // 滚动视图自动滚动快要结束的时候发出的事件(可能会触发多次)
        // this.scrollView.node.on("touch-up", (arg:cc.ScrollView): void => { }, this);                             // 当用户松手的时候会发出一个事件(拖拽视图弹起时不会触发)
    }

    protected start(): void {
    }

    // 每帧更新
    protected update(dt: number): void {
        // 若不需要每帧都更新,则开启,这里默认关闭
        // 如果不设置为每帧都刷新,则会出现延时显示,因为这里的 buffZone 取的是标准的滚动视图可视范围的区域,所以每帧都要刷新
        if (false) {
            this._updateTimer += dt;
            if (this._updateTimer < this._updateInterval) return;
            this._updateTimer = 0;
        }

        // 遍历数组，更新item的位置和显示
        for (let i = 0; i < this._items.length; ++i) {
            let itemInViewPos: cc.Vec2 = this._getPositionInView(this._items[i]);
            switch (this.align) {
                case eScrollViewReuseAlign.HORIZONTAL: this._updateHorizontal(itemInViewPos, i); break;
                case eScrollViewReuseAlign.VERTICAL: this._updateVertical(itemInViewPos, i); break;
                default: break;
            }
        }

        // 更新lastContentPos
        this._lastContentPos.x = this._content.x;
        this._lastContentPos.y = this._content.y;
    }

    /**
     * 更新计算横向坐标
     */
    private _updateHorizontal(itemInViewPos: cc.Vec2, i: number): void {
        // 新的位置
        let newPosX: number = 0;

        // 滚动方向
        let isLeft: boolean = this._content.x < this._lastContentPos.x;

        // 实际创建项占了多高(即它们的高度累加)
        let offset: number = 0;
        if (this.autoSpacingOffsetIdcOrDec) {
            offset = (this._prefabSize.width * this._items.length) + this.spacing * (this._items.length + 1);
        }
        else {
            offset = (this._prefabSize.width * this._items.length) + this.spacing * (this._items.length - 1);
        }

        // 视图向左滑动
        if (isLeft) {
            // 提前计算出该item新的x坐标
            newPosX = this._items[i].x + offset;

            // 如果 item 已经超出缓冲矩形，且 newPosX 未超出 content 上边界，
            // 则更新 item 的坐标(即上移了一个 offset 的位置), 同时更新 item 的显示内容
            if (itemInViewPos.x < - this._bufferZone && newPosX < this._content.width) {
                this._items[i].setPosition(newPosX + this.spacing, this._items[i].getPosition().y);
                this._updateCellInfoByIndex(i, -1, this._items.length);
            }
        }
        // 视图向右滑动
        else {
            // 提前计算出该item的新的x坐标
            newPosX = this._items[i].x - offset;

            // 如果 item 已经超出缓冲矩形，且 newPosY 未超出 content 下边界,
            // 则更新 item 的坐标(即下移了一个 offset 的位置), 同时更新 item 的显示内容
            if (itemInViewPos.x > this._bufferZone && newPosX > 0) {
                this._items[i].setPosition(newPosX - this.spacing, this._items[i].getPosition().y);
                this._updateCellInfoByIndex(i, -1, -this._items.length);
            }
        }
    }

    /**
     * 更新计算纵向坐标
     */
    private _updateVertical(itemInViewPos: cc.Vec2, i: number): void {
        // 新的位置
        let newPosY: number = 0;

        // 滚动方向
        let isDown: boolean = this._content.y < this._lastContentPos.y;

        // 实际创建项占了多高(即它们的高度累加)
        let offset: number = 0;
        if (this.autoSpacingOffsetIdcOrDec) {
            offset = (this._prefabSize.height * this._items.length) + this.spacing * (this._items.length + 1);
        }
        else {
            offset = (this._prefabSize.height * this._items.length) + this.spacing * (this._items.length - 1);
        }

        // 视图向下滑动
        if (isDown) {
            // 提前计算出该item新的y坐标
            newPosY = this._items[i].y + offset;

            // 如果 item 已经超出缓冲矩形，且 newPosY 未超出 content 上边界，
            // 则更新 item 的坐标(即上移了一个 offset 的位置), 同时更新 item 的显示内容
            if (itemInViewPos.y < - this._bufferZone && newPosY < 0) {
                this._items[i].setPosition(this._items[i].getPosition().x, newPosY + this.spacing);
                this._updateCellInfoByIndex(i, -1, -this._items.length);
            }

        }
        // 视图向上滑动
        else {
            // 提前计算出该item的新的y坐标
            newPosY = this._items[i].y - offset;

            // 如果 item 已经超出缓冲矩形，且 newPosY 未超出 content 下边界,
            // 则更新 item 的坐标(即下移了一个 offset 的位置), 同时更新 item 的显示内容
            if (itemInViewPos.y > this._bufferZone && newPosY > -this._content.height) {
                this._items[i].setPosition(this._items[i].getPosition().x, newPosY - this.spacing);
                this._updateCellInfoByIndex(i, -1, this._items.length);
            }
        }
    }

    /**
     * 滚动视图正在滚动时发出的事件
     */
    private _onSVEventScrolling(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventScrolling === "function") {
            this._scrollEventTarget.onSVEventScrolling(arg);
        }
    }

    /**
     * 滚动视图滚动结束的时候发出的事件(触发一次)
     */
    private _onSVEventScrollEnded(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;

        if (typeof this._scrollEventTarget.onSVEventScrollEnded === "function") {
            this._scrollEventTarget.onSVEventScrollEnded(arg);
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
     * 返回 item 在 ScrollView 空间的坐标值
     */
    private _getPositionInView(item: cc.Node): cc.Vec2 {
        let pos: cc.Vec2 = cc.Vec2.ZERO;
        item.getParent().convertToWorldSpaceAR(item.position, pos);
        this.scrollView.node.convertToNodeSpaceAR(pos, pos);
        return pos;
    }

    /**
     * 更新滚动区域大小
     */
    private _updateContentSize(): void {
        let w: number = this._content.width;
        let h: number = this._content.height;

        switch (this.align) {
            case eScrollViewReuseAlign.HORIZONTAL: {
                if (this.autoSpacingOffsetIdcOrDec) {
                    w = this._totalCount * this._prefabSize.width + (this._totalCount + 1) * this.spacing;
                }
                else {
                    w = this._totalCount * this._prefabSize.width + (this._totalCount - 1) * this.spacing;
                }
            } break;

            case eScrollViewReuseAlign.VERTICAL: {
                if (this.autoSpacingOffsetIdcOrDec) {
                    h = this._totalCount * this._prefabSize.height + (this._totalCount + 1) * this.spacing;
                }
                else {
                    h = this._totalCount * this._prefabSize.height + (this._totalCount - 1) * this.spacing;
                }
            } break;

            default: break;
        }

        w = Math.max(0, w);
        h = Math.max(0, h);

        // 若开启, 则数量 < spawnCount时也会有弹性
        if (true) {
            w = Math.max(w, this._contentSrcSize.width);
            h = Math.max(h, this._contentSrcSize.height);
        }

        this._content.setContentSize(w, h);
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

    /**
     *  通过索引适配指定 item 的 widget
     */
    private _adaptItemWidgetByIndex(i: number, bTransChild?: boolean): void {
        if (i < 0 || i >= this._items.length) return;

        let item: cc.Node = this._items[i];
        this._adaptWidget(item, bTransChild);
    }

    /**
     * 校准 ScrollView 组件的 Content 原始大小和原始位置
     * @param immediately 是否执行生效一次 widget 适配原始大小和位置
     * @description 若该组件所属节点 有添加 Widget 适配组件时, 引擎优化会"下一帧"才更新 Widget 位置, 从而导致该组件在 start 之前无法获取正确的 Content 大小和位置
     * 1.如果只是想当前帧就获取正确的 Content 大小和位置, 就传入 true, 一半初始化才传 true, 内部会在 start 之前校准正确的 Content 大小和位置, 让后续逻辑能够正常运作
     * 2.如果想要动态改变 ScrollView 的大小,且绑定有 Widget 组件, 则调用此函数是就应该传入 false, 否则内部 执行 adaptWidget 会重置 大小和位置, 所设置的 size 就无效
     */
    private _calibrateContent(immediately: boolean): void {
        if (this._content.parent.getComponent(cc.ScrollView)) {
            if (immediately) this._adaptWidget(this._content.parent);

            let pos_x: number = this._content.parent.width * (this._content.anchorX - this._content.parent.anchorX);
            let pos_y: number = this._content.parent.height * (this._content.anchorY - this._content.parent.anchorY);

            this._content.setContentSize(this._content.parent.getContentSize());
            this._content.setPosition(pos_x, pos_y);

            // 深拷贝赋值
            this._contentSrcPos.x = this._content.x;
            this._contentSrcPos.y = this._content.y;
            this._contentSrcSize.width = this._content.width;
            this._contentSrcSize.height = this._content.height;
        }
        else {
            console.error("ScrollViewReuse - Error : this._conten.parent property is not cc.ScrollView Instance!");
        }
    }

    /**
     * 计算核心裁剪缓冲区
     */
    private _calculteKernelBuffer(): void {
        switch (this.align) {
            case eScrollViewReuseAlign.HORIZONTAL: {
                this._bufferZone = this.scrollView.node.width / 2 + this._prefabSize.width / 2;
                this._bufferMaxCount = Math.ceil(this.scrollView.node.width / this._prefabSize.width);

                // 是否自动计算最佳间距
                if (this.autoCalculateSpacing) {
                    let count: number = Math.floor(this.scrollView.node.width / this._prefabSize.width);
                    let offset: number = this.scrollView.node.width - count * this._prefabSize.width;

                    count = this.autoSpacingOffsetIdcOrDec ? count + 1 : count - 1;
                    if (count === 0) count = 1;
                    this.spacing = offset / count;
                }
            } break;

            case eScrollViewReuseAlign.VERTICAL: {
                this._bufferZone = this.scrollView.node.height / 2 + this._prefabSize.height / 2;
                this._bufferMaxCount = Math.ceil(this.scrollView.node.height / this._prefabSize.height);

                // 是否自动计算最佳间距
                if (this.autoCalculateSpacing) {
                    let count: number = Math.floor(this.scrollView.node.height / this._prefabSize.height);
                    let offset: number = this.scrollView.node.height - count * this._prefabSize.height;
                    count = this.autoSpacingOffsetIdcOrDec ? count + 1 : count - 1;
                    if (count === 0) count = 1;
                    this.spacing = offset / count;
                }
            } break;

            default: break;
        }

        // 手动检测, 实例数量不能小于缓冲区显示的最大数量(多预留2个, 让上下无缝连接)
        this.spawnCount = Math.max(this.spawnCount, this._bufferMaxCount + 2);
    }

    /**
     * 重置指定索引的 item 位置
     */
    private _resetItemPos(i: number): void {
        if (i < 0 || i >= this._items.length) return;

        let pos_x: number = 0;
        let pos_y: number = 0;
        let item: cc.Node = this._items[i];

        switch (this.align) {
            case eScrollViewReuseAlign.HORIZONTAL: {
                if (this.autoSpacingOffsetIdcOrDec) {
                    pos_x = (i + 1) * this.spacing + this._prefabSize.width * (0.5 + i);
                }
                else {
                    pos_x = i * this.spacing + this._prefabSize.width * (0.5 + i);
                }
            } break;

            case eScrollViewReuseAlign.VERTICAL: {
                if (this.autoSpacingOffsetIdcOrDec) {
                    pos_y = - (i + 1) * this.spacing - this._prefabSize.height * (0.5 + i);
                }
                else {
                    pos_y = - i * this.spacing - this._prefabSize.height * (0.5 + i);
                }
            } break;

            default: {
                console.error("ScrollViewReuse - Error : unknow align type!");
            } break;
        }

        item.setPosition(pos_x, pos_y);
    }

    /**
     * 重置所有 item 位置
     */
    private _resetAllItemPos(): void {
        for (let i = 0; i < this._items.length; ++i) {
            this._resetItemPos(i);
        }
        this._content.setPosition(this._contentSrcPos);
    }

    /**
     * 添加单项(只实例化规定数量, 多余的数量用索引表示)
     */
    private _addItem(active: boolean): void {
        let bActive = active === false ? false : true;
        if (this._items.length < this.spawnCount) {
            // 实例化预制
            let item = cc.instantiate(this._prefab);
            this._content.addChild(item);
            this._items.push(item);

            // 更新位置
            let i = this._items.length - 1;
            item.active = bActive;
            this._adaptItemWidgetByIndex(i);
            this._resetItemPos(i);

            // 更新数据
            this._updateCellInfoByIndex(i, i);
        }
        else {
            // 若数量大于预制数量: 则先从预制数组中取出隐藏项(若有,则直接更新数据;若无,则跳出循环,添加索引计数)
            for (let i = 0; i < this._items.length; ++i) {
                let item = this._items[i];
                if (!item.active) {
                    item.active = true;
                    this._adaptItemWidgetByIndex(i);
                    this._resetItemPos(i);

                    // 更新数据
                    this._updateCellInfoByIndex(i, i);
                    break;
                }
            }
        }

        // 数量计数
        if (bActive) {
            ++this._totalCount;
        }

        this._updateContentSize();
    }

    /**
     * 更新单项数据
     * @param index     原始数组元素索引
     * @param svIndex   svIndex 值
     * @param disCount  svIndex 显示索引变换差值
     */
    private _updateCellInfoByIndex(index: number, svIndex?: number, disCount?: number): void {
        if (index < 0 || index >= this._items.length) return;
        let item: cc.Node = this._items[index];
        let item_component: any = item.getComponent(this._prefab_com_name);
        if (item_component) {
            if (typeof svIndex === "number" && svIndex >= 0) item_component.svIndex = svIndex;
            if (typeof disCount === "number") item_component.svIndex += disCount;
            if (typeof item_component.updateSVReuseData === "function") item_component.updateSVReuseData(item_component.svIndex, this._itemsData, this, index);
        }
    }

    /**
     * 刷新所有数据(位置关系不重置)
     * @param all 是否刷新所有数据(true:刷新所有, false:只刷新显示的数据; 默认: false)
     */
    private _refreshData(all?: boolean): void {
        for (let i = 0; i < this._items.length; ++i) {
            if (!all && !this._items[i].active) continue;
            this._updateCellInfoByIndex(i);
        }
    }

    // -------------------------------------------------------------------------------------------------------------------------
    // 外部接口

    /**
     * 绑定预制信息(一个对象只会调用一次)
     * @param prefab             预制件类型
     * @param prefab_com_name    预制件所附属的脚本组件名
     * @param dataArray          所有预制件所依赖的数据集合
     */
    bindPrefab<T>(prefab: cc.Prefab, prefab_com_name: T, dataArray?: any[]): void {
        if (this._bindOnce || !(prefab instanceof cc.Prefab)) return;

        // 校准 content 原始大小和原始位置
        this._calibrateContent(true);

        // 绑定预制信息
        this._bindOnce = true;
        this._prefab = prefab;
        this._prefab_com_name = prefab_com_name;
        this._prefabSize.width = prefab.data.getContentSize().width * prefab.data.scaleX;
        this._prefabSize.height = prefab.data.getContentSize().height * prefab.data.scaleY;
        this._itemsData = dataArray instanceof Array ? dataArray : [];

        // 计算核心缓冲区大小
        this._calculteKernelBuffer();
    }

    /**
     * 重新绑定数据源引用
     */
    rebindDataRef(dataArray: any[]): void {
        if (!dataArray || typeof dataArray === "undefined") return;
        this._itemsData = dataArray;
    }

    /**
     * 绑定滚动事件接收对象
     */
    bindScrollEventTarget(target: any): void {
        if (!target) return;
        this._scrollEventTarget = target;
    }

    /**
     * 设置预制件缩放大小(会重置item位置)
     * @param scale 
     */
    setItemScale(scale: number): void {
        if (!this._prefab) return;

        this._prefab.data.setScale(scale);
        this._prefabSize.width = this._prefab.data.getContentSize().width * this._prefab.data.scaleX;
        this._prefabSize.height = this._prefab.data.getContentSize().height * this._prefab.data.scaleY;

        for (let i = 0; i < this._items.length; ++i) {
            this._items[i].setScale(scale);
        }

        // 重新计算核心缓冲区大小
        this._calculteKernelBuffer();

        // 重置 content 大小
        this._updateContentSize();

        // 重置所有 item 位置
        this._resetAllItemPos();
    }

    /**
     * 重新加载视图
     * @param dataArray 新数据源(可选参数; 若缺省,则使用原数据刷新一次视图)
     * @param resetPos  是否重置子项位置(可选参数; 默认为 true: 重置)
     */
    reloadView(dataArray?: any[], resetPos?: boolean): void {
        // 绑定数据源
        this.rebindDataRef(dataArray);

        // 按照数量正确的显影 item
        for (let i = 0; i < this._items.length; ++i) {
            this._items[i].active = i < this._itemsData.length;
        }

        // 重置 content 大小
        this._totalCount = this._itemsData.length;
        this._updateContentSize();

        // 是否重置所有 item 和 content 的位置
        resetPos = resetPos === false ? false : true;
        if (resetPos) {

            // 停止惯性滚动
            if (this.scrollView.isAutoScrolling) this.scrollView.stopAutoScroll();

            this._lastContentPos.x = 0;
            this._lastContentPos.y = 0;
            this._resetAllItemPos();

            for (let i = 0; i < this._items.length; ++i) {
                let item_component: any = this._items[i].getComponent(this._prefab_com_name);
                if (item_component) item_component.svIndex = i;
            }
        }

        // 刷新所有预制数据
        this._refreshData();
    }

    /**
     * 生成默认子项数量池(一个对象只会调用一次)
     */
    generateItemPool(): void {
        if (this._generateItemPoolOnce) return;
        this._generateItemPoolOnce = true;

        // 规定下: 如果是在 _addItem 函数调用之后才调用,则无效
        if (this._items.length > 0) return;

        // 初始化预制池
        for (let i = 0; i < this.spawnCount; ++i) {
            this._addItem(false);
        }
    }

    /**
     * 是否已经生成了预制池
     */
    isGenerateItemPool(): boolean {
        return this._generateItemPoolOnce;
    }

    /**
     * 添加子项
     */
    addItem(): void {
        this._addItem(true);
    }

    /**
     * 移除一个子项
     */
    removeItem(): void {
        let count = this._totalCount - 1;
        if (count < 0) return;

        // 真实的预制池对象会被隐藏,而不是真正的删除(为了更流畅的效果)
        if (count < this.spawnCount) {
            for (let i = 0; i < this._items.length; ++i) {
                this._items[i].active = i < count;
            }

            // 若数量 < 预制数量, 则立即停止滚动(避免弹性干扰隐藏预制的坐标)
            this.scrollView.stopAutoScroll();
        }

        // 更新计数器,刷新显示区域,数据等
        this._totalCount = count;
        this._updateContentSize();
    }

    /**
     * 移除所有子项
     * @param cleanup  默认为false(为true时, 表示清除包括实例化的预制件, 请慎用)
     */
    removeAll(cleanup?: boolean): void {
        let bCleanUp = cleanup === true ? true : false;
        for (let i = 0; i < this._items.length; ++i) {
            this._items[i].active = false;
            let item_component: any = this._items[i].getComponent(this._prefab_com_name);
            if (item_component) item_component.svIndex = i;
            if (bCleanUp){
                this._content.removeChild(this._items[i], true);
                this._items[i].destroy();
            } 
        }
        this._resetAllItemPos();
        if (bCleanUp) this._items = [];

        this._totalCount = 0;
        this._lastContentPos.x = 0;
        this._lastContentPos.y = 0;
        this._updateContentSize();

        // 清除数据
        this.rebindDataRef([]);
    }

    /**
     * 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置
     * @param offset            偏移距离
     * @param timeInSecond      执行时间(缺省时, 则立即偏移)
     */
    scrollToFixedPosition(offset: cc.Vec2, timeInSecond?: number): void {
        if (!(offset instanceof cc.Vec2)) return;
        console.log("=====x:" + offset.x);
        console.log("=====max x:" + this.scrollView.getMaxScrollOffset().x);
        this.scrollView.scrollToOffset(offset, timeInSecond);
    }

    /**
     * 获取滚动视图相对于左上角原点的当前滚动偏移 
     */
    getScrollFixedPosition(): cc.Vec2 {
        return this.scrollView.getScrollOffset();
    }

    /**
     * 重置滚动视图大小
     */
    resetScrollVewSize(size: cc.Size): void {
        if (this.scrollView.node.getContentSize().equals(size)) return;

        this.scrollView.node.setContentSize(size);
        this._calibrateContent(false);
        this._updateContentSize();
        this._calculteKernelBuffer();
        this._resetAllItemPos();

        // 是否扩增预制池(容量有增大且生成过预制池)
        let offset_count: number = Math.abs(this.spawnCount) - Math.abs(this._items.length);
        if (offset_count > 0 && this._generateItemPoolOnce) {
            for (let i = 0; i < offset_count; ++i) {
                this._addItem(false);
            }
        }
    }

    /**
     * 更新指定UI索引项(注: 这里的 index 是指 UI 显示的 svIndex, 而不是内置的数组元素索引, 一般只关心UI显示的索引)
     */
    updateCellAtIndex(index: number): void {
        for (let i = 0; i < this._items.length; ++i) {
            let item: cc.Node = this._items[i];
            let item_component: any = item.getComponent(this._prefab_com_name);
            if (item_component && item_component.svIndex === index) {
                if (typeof item_component.updateSVReuseData === "function") item_component.updateSVReuseData(item_component.svIndex, this._itemsData, this, i);
            }
        }
    }

    // -------------------------------------------------------------------------------------------------------------------------
    // 外部接口 end

    onDisable() {
        if (this.scrollView && this.scrollView.vertical && !this.scrollView.horizontal && this.scrollView.isAutoScrolling()) {
            let offset = this.scrollView.getScrollOffset().y;
            let maxOffset = this.scrollView.getMaxScrollOffset().y;
            if (offset < 0) {
                this.scrollView.setContentPosition(cc.v2(0, this.scrollView.node.height * 0.5));
            }
            else if (offset > maxOffset) {
                this.scrollView.setContentPosition(cc.v2(0, this.scrollView.content.height - this.scrollView.node.height * 0.5));
            }
        }
    }
}
