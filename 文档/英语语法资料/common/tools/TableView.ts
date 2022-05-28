/*******************************************************************************************************************************
class: TableView
brief: TableView 复用 cell 组件(暂时只支持横/纵单向一维布局)

使用方法:
1.把该脚本挂在到对应的 SrollView 节点上(其他节点也可以, 若同时存在多个 Scrollview, 则每个 TableView 都是独立个体, 相互之间不影响)
2.所绑定的预制键, 其脚本组件必须实现 updateSVReuseData 接口(函数原型: updateSVReuseData(index: number, data: any, view?:TableView): void { })
3.所绑定的脚本组件可以实现池接口: reuse() - NodePool.get() 时触发; unuse() - NodePool.put() 时触发; 详情请参见"cc.NodePool"构造用法

以下为外部接口(列举出来方便直接查看相应功能, 具体详情请查看对应接口简介)
--- bindData                    绑定数据信息
--- bindScrollEventTarget       绑定滚动事件接收对象
--- reloadView                  重新加载视图
--- refreshView                 强行刷新一次视图和所有显示的数据
--- getCellViewIndex            获取子项在视图中的显示索引
--- getCellViewCount            获取当前可视区子项个数
--- getCellTotalCount           获取当前子项总个数
--- getCellType                 获取指定数据索引的预制类型
--- removeCells                 批量删除子项
--- resetScrollVewSize          重置滚动视图为指定大小
--- getScrollOffset             获取滚动视图相对于左上角原点的当前滚动偏移
--- getMaxScrollOffset          获取滚动视图最大可以滚动的偏移量
--- scrollToOffset              视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置
--- scrollToDir                 视图内容将在规定时间内滚动到视图对应方位
--- generatePoolInst            预生成池实例
--- isGeneratePoolInst          是否已预生成实例对象
注: TableView 提取了 Listview 和 ScrollViewReuse 的核心功能, 且加以优化升级
具体优化为以下几点:
1.写法保留"ScrollViewReuse"的"updateSVReuseData"的形式(主要是注重每个"cell"都是独立的逻辑, 若无特殊需求不必揉在调用层, 感觉太杂乱)
2.移植了"Listview"核心滚动视图算法, 添加"横向"支持, 只需要在"SrollView"的属性面板勾选对应的"横纵选项"即可(此处直接用引擎原生的, 但彼此互斥, 不支持同时勾选)
3.和"Listview"一样, "TableView"也支持"多类型预制件", 这样可以变相实现"动态"高度
4."TableView"内部维护自己的"显示列表", 因此不用担心自动回收会影响该视图节点的其他不相关的子节点, 例如"同名,索引"等等(也就是说只会回收 cell)
5.彻底修复"ScrollViewReuse"回弹或者滑动过程中被隐藏然后恢复显示引起的位置错乱的 bug, 这一点其实"Listview"也存在, 现在统一在这里优化
6.添加"refreshView"强制刷新功能(详情见该接口简介)
7.添加"getCellViewIndex"获取该"cell"在视图中的视图索引(详情见该接口简介)
8.添加"removeCells"批量删除功能, 可支持动画展示(该功能实现逻辑复杂, 费了九牛二虎之力才搞定, 佛祖保佑永无 bug -_-!)
9.随着"TableView"的后续应用, 以后逐渐替换且废弃"ScrollViewReuse"(即"TableView"包含其所有功能且去掉了相应的冗余步骤, 让性能更佳)
10."TableView"的"demo"演示请参照工程中"TestMode"文件夹中的"tabelViewTest"场景
********************************************************************************************************************************/

import { HashMap } from "./HashMap";

/**
 * 视图滚动方位
 */
export enum TableViewScrollToDir {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
}

/**
 * 视图排列方向枚举
 */
enum TableViewAlign {
    HORIZONTAL,                                                                     // 横向(目前只支持从左到右)
    VERTICAL                                                                        // 纵向(目前只支持从上到下)
}

/**
 * 子项信息
 */
class CellInfo {
    uuid: number = 0;                                                               // 内部标记的 id
    type: number = 0;                                                               // 类型(预制件索引)
    component: any = null;                                                          // 组件(预制件组件)
    data: any = null;                                                               // 数据
    boundStart: number = 0;                                                         // 临界起始坐标
    boundEnded: number = 0;                                                         // 临界结束坐标
    boundPosition: cc.Vec2 = cc.Vec2.ZERO;                                          // 原始预设位置
}

/**
 * 单元格节点
 */
class Cell {
    type: number = 0;
    node: cc.Node = null;
    component: string | typeof cc.Component = null;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class TableView extends cc.Component {
    @property({
        type: cc.ScrollView,
        tooltip: "绑定的滚动视图(最好绑定在对应的\"scrollview\"节点上,每个\"scrollview\"互不干扰)"
    })
    scrollView: cc.ScrollView = null;

    @property({
        type: cc.Float,
        tooltip: "每项之间的间距(内部有智能检测, 可选填)"
    })
    spacing: number = 0;

    @property({
        //type: cc.Boolean, (不注释编译时总是弹出警告, 提示要注释此行)
        tooltip: "是否自动计算最佳间距:\
        若滚动视图中只存在一种子项类型建议开启(手动设置的\"spacing\"将无效);\
        若滚动视图中存在多种类型子项建议关闭(采取手动设置\"spacing\"效果更佳)"
    })
    autoSpacing: boolean = false;

    @property({
        "tooltip": "设置子项缩放大小"
    }) _cellScale: number = 1;

    @property get cellScale(): number {
        return this._cellScale;
    }
    set cellScale(value: number) {
        if (value === this._cellScale) {
            return;
        }

        this._cellScale = value;
        this._reseteKernelBuffer();
    }

    @property({
        type: cc.Float,
        tooltip: "起始填充距离"
    })
    paddingStart: number = 0;

    @property({
        type: cc.Float,
        tooltip: "结束填充距离"
    })
    paddingEnd: number = 0;

    // @property({
    //     type: cc.Enum(TableViewAlign),
    //     tooltip: "视图排列方向(目前只支持一维单向布局, 默认为纵向)"
    // })
    align: TableViewAlign = TableViewAlign.VERTICAL;

    @property({
        type: [cc.Prefab],
        tooltip: "子项预制件类型数组(支持多类型子项排列)"
    })
    prefabTypes: cc.Prefab[] = [];

    static g_class_name: string = "TableView";                                      // 类名

    private _shieldLayer: cc.Node = null;                                           // 遮罩层
    private _calibrateOnce: boolean = false;                                        // 是否已校准 content
    private _pregenerateInstOnce: boolean = false;                                  // 是否预生成实例
    private _contentSrcPos: cc.Vec2 = cc.Vec2.ZERO;                                 // 滚动视图展示内容的节点原始位置
    private _contentSrcSize: cc.Size = cc.Size.ZERO;                                // 滚动视图展示内容的节点原始大小
    private _contentBoundStartPos: cc.Vec2 = cc.Vec2.ZERO;                          // 滚动视图展示内容的节点边界位置
    private _scrollEventTarget: any = null;                                         // 滚动事件接收对象

    private _cellsInfo: CellInfo[] = [];                                            // 子项信息数组
    private _showCellsMap: HashMap<number, Cell> = new HashMap();                   // 可视区节点列表
    private _cellsPoolMap: HashMap<number, cc.NodePool> = new HashMap();            // 预制件类型对应的实例化节点池

    protected onLoad(): void {
        // 初始化滚动内视图大小
        if (!this.scrollView) return;

        if (this.scrollView.vertical) {
            this.align = TableViewAlign.VERTICAL;
        }
        else if (this.scrollView.horizontal) {
            this.align = TableViewAlign.HORIZONTAL;
        }
    }

    protected start(): void {
    }

    protected onEnable(): void {
        if (!CC_EDITOR) {
            this._registerTableViewEvent();
        }
    }

    protected onDisable(): void {
        if (!CC_EDITOR) {
            this._unregisterTableViewEvent();
        }

        // 回弹情况下, 重置"content"位置(若不重置, 回弹时隐藏视图再恢复显示时有bug, 这跟引擎节点隐藏时动作失效原理有关)
        let viewOffset: cc.Vec2 = this.getScrollOffset();
        let viewMaxOffset: cc.Vec2 = this.getMaxScrollOffset();

        switch (this.align) {
            case TableViewAlign.HORIZONTAL: {
                if (viewOffset.x > 0) {
                    // way 1
                    this.scrollView.scrollToLeft();

                    // way 2
                    // this.scrollView.scrollToOffset(cc.Vec2.ZERO);
                    // this.scrollView.content.setPosition(this._contentSrcPos.x, this._contentSrcPos.y);
                }
                else if (viewOffset.x < -viewMaxOffset.x) {
                    // way 1
                    this.scrollView.scrollToRight();

                    // way 2
                    // this.scrollView.scrollToOffset(cc.v2(-viewMaxOffset.x, 0));
                    // this.scrollView.content.setPosition(this._contentSrcPos.x - viewMaxOffset.x, this._contentSrcPos.y);
                }
            } break;

            case TableViewAlign.VERTICAL: {
                if (viewOffset.y > viewMaxOffset.y) {
                    // way 1
                    this.scrollView.scrollToBottom();

                    // way 2
                    // this.scrollView.scrollToOffset(cc.v2(0, viewMaxOffset.y));
                    // this.scrollView.content.setPosition(this._contentSrcPos.x, this._contentSrcPos.y + viewMaxOffset.y);
                }
                else if (viewOffset.y < 0) {
                    // way 1
                    this.scrollView.scrollToTop();

                    // way 2
                    // this.scrollView.scrollToOffset(cc.Vec2.ZERO);
                    // this.scrollView.content.setPosition(this._contentSrcPos.x, this._contentSrcPos.y);
                }
            } break;

            default: break;
        }

        // 取消自动滚动(统一放最后执行, 上述"方式1"引擎内部需要"滚动"计算位置)
        this.scrollView.stopAutoScroll();
    }

    protected onDestroy(): void {
        this._clearShowList();
        this._clearNodePool();
        this._cellsInfo.splice(0, this._cellsInfo.length);
    }

    /**
     * 注册滚动视图事件
     */
    private _registerTableViewEvent(): void {
        this.scrollView.node.on("scrolling", this._onSVEventScrolling, this);
        this.scrollView.node.on("scroll-began", this._onSVEventScrollingBegan, this);
        this.scrollView.node.on("scroll-ended", this._onSVEventScrollEnded, this);
        this.scrollView.node.on("touch-up", this._onSVEventScrollTouchUp, this);
        this.scrollView.node.on("scroll-ended-with-threshold", this._onSVEventScrollEndedWithThreshold, this);

        if (this.scrollView.vertical) {
            this.scrollView.node.on("scroll-to-top", this._onSVEventScrollToTop, this);
            this.scrollView.node.on("scroll-to-bottom", this._onSVEventScrollToBottom, this);
            this.scrollView.node.on("bounce-top", this._onSVEventBounceTop, this);
            this.scrollView.node.on("bounce-bottom", this._onSVEventBounceBottom, this);
        }

        if (this.scrollView.horizontal) {
            this.scrollView.node.on("scroll-to-left", this._onSVEventScrollToLeft, this);
            this.scrollView.node.on("scroll-to-right", this._onSVEventScrollToRight, this);
            this.scrollView.node.on("bounce-left", this._onSVEventBounceLeft, this);
            this.scrollView.node.on("bounce-right", this._onSVEventBounceRight, this);
        }
    }

    /**
     * 反注册滚动视图事件
     */
    private _unregisterTableViewEvent(): void {
        // 注释掉该方法, 只针对性移除"TableView"监听的事情, 不影响滚动视图在其他应用层注册的事件
        // this.scrollView.node.targetOff(this);

        this.scrollView.node.off("scrolling", this._onSVEventScrolling, this);
        this.scrollView.node.off("scroll-began", this._onSVEventScrollingBegan, this);
        this.scrollView.node.off("scroll-ended", this._onSVEventScrollEnded, this);
        this.scrollView.node.off("touch-up", this._onSVEventScrollTouchUp, this);
        this.scrollView.node.off("scroll-ended-with-threshold", this._onSVEventScrollEndedWithThreshold, this);

        this.scrollView.node.off("scroll-to-top", this._onSVEventScrollToTop, this);
        this.scrollView.node.off("scroll-to-bottom", this._onSVEventScrollToBottom, this);
        this.scrollView.node.off("scroll-to-left", this._onSVEventScrollToLeft, this);
        this.scrollView.node.off("scroll-to-right", this._onSVEventScrollToRight, this);

        this.scrollView.node.off("bounce-top", this._onSVEventBounceTop, this);
        this.scrollView.node.off("bounce-bottom", this._onSVEventBounceBottom, this);
        this.scrollView.node.off("bounce-left", this._onSVEventBounceLeft, this);
        this.scrollView.node.off("bounce-right", this._onSVEventBounceRight, this);
    }

    /**
     * 滚动视图正在滚动时发出的事件
     * @param arg
     */
    private _onSVEventScrolling(arg: cc.ScrollView): void {
        this._updateView();

        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrolling === "function") {
            this._scrollEventTarget.onSVEventScrolling(arg, this);
        }
    }

    /**
     * 滚动视图滚动开始时发出的事件
     * @param arg
     */
    private _onSVEventScrollingBegan(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollingBegan === "function") {
            this._scrollEventTarget.onSVEventScrollingBegan(arg, this);
        }
    }

    /**
     * 滚动视图滚动结束的时候发出的事件(触发一次)
     * @param arg
     */
    private _onSVEventScrollEnded(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollEnded === "function") {
            this._scrollEventTarget.onSVEventScrollEnded(arg, this);
        }
    }

    /**
     * 滚动视图自动滚动快要结束的时候发出的事件(可能会触发多次)
     * @param arg
     */
    private _onSVEventScrollEndedWithThreshold(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollEndedWithThreshold === "function") {
            this._scrollEventTarget.onSVEventScrollEndedWithThreshold(arg, this);
        }
    }

    /**
     * 当用户松手的时候会发出一个事件(拖拽视图弹起时不会触发)
     * @param arg
     */
    private _onSVEventScrollTouchUp(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollTouchUp === "function") {
            this._scrollEventTarget.onSVEventScrollTouchUp(arg, this);
        }
    }

    /**
     * 滚动视图滚动到顶部边界事件
     * @param arg
     */
    private _onSVEventScrollToTop(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollToTop === "function") {
            this._scrollEventTarget.onSVEventScrollToTop(arg, this);
        }
    }

    /**
     * 滚动视图滚动到底部边界事件
     * @param arg
     */
    private _onSVEventScrollToBottom(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollToBottom === "function") {
            this._scrollEventTarget.onSVEventScrollToBottom(arg, this);
        }
    }

    /**
     * 滚动视图滚动到左边边界事件
     * @param arg
     */
    private _onSVEventScrollToLeft(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollToLeft === "function") {
            this._scrollEventTarget.onSVEventScrollToLeft(arg, this);
        }
    }

    /**
     * 滚动视图滚动到右边边界事件
     * @param arg
     */
    private _onSVEventScrollToRight(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventScrollToRight === "function") {
            this._scrollEventTarget.onSVEventScrollToRight(arg, this);
        }
    }

    /**
     * 滚动视图滚动到顶部边界并且开始回弹时发出的事件
     * @param arg
     */
    private _onSVEventBounceTop(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventBounceTop === "function") {
            this._scrollEventTarget.onSVEventBounceTop(arg, this);
        }
    }

    /**
     * 滚动视图滚动到底部边界并且开始回弹时发出的事件
     * @param arg
     */
    private _onSVEventBounceBottom(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventBounceBottom === "function") {
            this._scrollEventTarget.onSVEventBounceBottom(arg, this);
        }
    }

    /**
     * 滚动视图滚动到左边边界并且开始回弹时发出的事件
     * @param arg
     */
    private _onSVEventBounceLeft(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventBounceLeft === "function") {
            this._scrollEventTarget.onSVEventBounceLeft(arg, this);
        }
    }

    /**
     * 滚动视图滚动到右边边界并且开始回弹时发出的事件
     * @param arg
     */
    private _onSVEventBounceRight(arg: cc.ScrollView): void {
        if (!this._scrollEventTarget) return;
        if (typeof this._scrollEventTarget.onSVEventBounceRight === "function") {
            this._scrollEventTarget.onSVEventBounceRight(arg, this);
        }
    }

    /**
     * 适配 widget(当前帧立即生效)
     * @param node          要适配的节点
     * @param bTransChild   是否遍历适配子节点(默认 false)
     */
    private _adaptWidget(node: cc.Node, bTransChild: boolean = false): void {
        if (!node) return;

        let widget: cc.Widget = node.getComponent(cc.Widget);
        if (widget && cc.isValid(widget, true)) {
            widget.enabled = true;
            widget.updateAlignment();
            widget.enabled = false;
        }

        if (bTransChild) {
            for (let i = 0; i < node.children.length; ++i) {
                this._adaptWidget(node.children[i], bTransChild);
            }
        }
    }

    /**
     * 是否正常接受输入事件(true: 接受)
     * @param enabled 
     */
    private _setTouchEventEnable(enabled: boolean): void {
        if (!this._shieldLayer) {
            this._shieldLayer = new cc.Node();
            let anchor: cc.Vec2 = cc.v2(0.5, 0.5);
            let scene: cc.Scene = cc.director.getScene();
            scene.addChild(this._shieldLayer, scene.childrenCount + 1);
            this._shieldLayer.setAnchorPoint(anchor);
            this._shieldLayer.setContentSize(cc.winSize);
            this._shieldLayer.setPosition(cc.winSize.width * anchor.x, cc.winSize.height * anchor.y);
        }

        let blockInputEvents: cc.BlockInputEvents = this._shieldLayer.getComponent(cc.BlockInputEvents);
        if (!blockInputEvents) {
            blockInputEvents = this._shieldLayer.addComponent(cc.BlockInputEvents);
        }
        this._shieldLayer.active = !enabled;
        blockInputEvents.enabled = !enabled;

        // 测试: 给铺上颜色, 可以更直观的看见"遮罩层"的大小和位置等
        // let sprite: cc.Sprite = this._shieldLayer.getComponent(cc.Sprite);
        // if (!sprite) {
        //     sprite = this._shieldLayer.addComponent(cc.Sprite);
        //     cc.resources.load("zh_CN/internal/image/default_sprite_splash", cc.SpriteFrame, (err: Error, spriteFrame: any): void => {
        //         if (err) {
        //             console.error(`${TableView.g_class_name}: ${err.message || err}`);
        //             return;
        //         }
        //         sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //         sprite.spriteFrame = spriteFrame;
        //         sprite.node.color = cc.Color.BLACK;
        //         sprite.node.opacity = 30;
        //     });
        // }
    }

    /**
     * 校准 ScrollView 组件的 Content 原始大小和原始位置
     */
    private _calibrateContent(): void {
        if (this.scrollView instanceof cc.ScrollView) {
            // 这里注释掉
            // 有必要说明下: 在调用"TableView"之前必须要确保其所依附的"cc.ScrollView"的"cc.Widget"已生效, 否则无法正确校准"content"大小
            // 但是如果不注释, "widget.updateAlignment"当前帧就会递归重置该节点的父节点的"Widget",
            // 特别是应用层父节点正在"cc.Action"动画, 过程中只要某一个子节点"updateAlignment"那父节点的动画就废了
            // 这是引擎"cc.Widget.updateAlignment"的原理, 对"Widget"深入了解的话会发现这是个"bug"巨坑
            // 所以这里要注释, 至于应用层的规则, 这里也不再做多余的容错, 处理不了那么完美, "TableView"只要做好本质工作就行了 
            // this._adaptWidget(this.scrollView.node);

            // 这里检测下"scrollview"视图"content"的"cc.Widget"组件
            // 因为"TableView"会内部修改"content"大小和位置, 所以要根据视图类别去移除对应的适配绑定
            // 该处的 Widget 没任何意义, 这里做个容错检测, 在使用"TableView"等组件时, "content"节点自身是不能存在"cc.Widget"组件的
            // 归根结底, 还是引擎的"Widget"原理太...哎...
            let widget: cc.Widget = this.scrollView.content.getComponent(cc.Widget);
            if (widget) {
                switch (this.align) {
                    case TableViewAlign.HORIZONTAL: {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = false;
                        widget.isAlignHorizontalCenter = false;
                    } break;

                    case TableViewAlign.VERTICAL: {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = false;
                        widget.isAlignVerticalCenter = false;
                    } break;

                    default: break;
                }
                // widget.destroy();
            }

            let pos_x: number = this.scrollView.node.width * (this.scrollView.content.anchorX - this.scrollView.node.anchorX);
            let pos_y: number = this.scrollView.node.height * (this.scrollView.content.anchorY - this.scrollView.node.anchorY);

            this.scrollView.content.setContentSize(this.scrollView.node.getContentSize());
            this.scrollView.content.setPosition(pos_x, pos_y);

            // 深拷贝赋值
            this._contentSrcPos.x = this.scrollView.content.x;
            this._contentSrcPos.y = this.scrollView.content.y;
            this._contentSrcSize.width = this.scrollView.content.width;
            this._contentSrcSize.height = this.scrollView.content.height;
        }
        else {
            console.error(`${TableView.g_class_name} - Error : this._conten.parent property is not cc.ScrollView Instance!`);
        }
    }

    /**
     * 计算自动间距
     */
    private _calculteAutoSpacing(): void {
        let show_w: number = 0;
        let show_h: number = 0;
        let show_count: number = 0;
        let breakLoop: boolean = false;

        let firtValidPrefab: cc.Prefab = null;
        for (let i = 0; i < this._cellsInfo.length; ++i) {
            let prefab: cc.Prefab = this._getPrefabByType(this._cellsInfo[i].type);
            if (!prefab) continue;
            if (!firtValidPrefab) firtValidPrefab = prefab;

            let tmp_w: number = show_w + prefab.data.width * prefab.data.scaleX * this.cellScale;
            let tmp_h: number = show_h + prefab.data.height * prefab.data.scaleY * this.cellScale;

            switch (this.align) {
                case TableViewAlign.HORIZONTAL: {
                    if (tmp_w > this.scrollView.node.width) {
                        breakLoop = true;
                    }
                } break;

                case TableViewAlign.VERTICAL: {
                    if (tmp_h > this.scrollView.node.height) {
                        breakLoop = true;
                    }
                } break;

                default: break;
            }

            if (breakLoop) break;

            show_w = tmp_w;
            show_h = tmp_h;
            ++show_count;
        }

        // 是否自动计算最佳间距 
        let start_x: number = 0;
        let start_y: number = 0;
        let spacing: number = 0;
        let spacing_count: number = Math.max(1, show_count - 1);
        let padding: number = this.paddingStart + this.paddingEnd;
        let total_size: cc.Size = cc.size(this.scrollView.node.width - padding, this.scrollView.node.height - padding);
        switch (this.align) {
            // 横向左方为起点, 纵向居中
            case TableViewAlign.HORIZONTAL: {
                if (firtValidPrefab) {
                    if (breakLoop) {
                        spacing = (this.scrollView.node.width - show_w - padding) / spacing_count;
                    }
                    else {
                        let w: number = firtValidPrefab.data.width * firtValidPrefab.data.scaleX * this.cellScale;
                        if (w !== 0) {
                            spacing_count = Math.floor(total_size.width / w);
                            if (spacing_count > 1) spacing = (total_size.width - spacing_count * w) / (spacing_count - 1);
                        }
                    }
                }

                start_x = this.scrollView.content.width * (0 - this.scrollView.content.anchorX);
                start_y = this.scrollView.content.height * (0.5 - this.scrollView.content.anchorY);
            } break;

            // 纵向上方为起点, 横向居中
            case TableViewAlign.VERTICAL: {
                if (firtValidPrefab) {
                    if (breakLoop) {
                        spacing = (this.scrollView.node.height - show_h - padding) / spacing_count;
                    }
                    else {
                        let h: number = firtValidPrefab.data.height * firtValidPrefab.data.scaleY * this.cellScale;
                        if (h !== 0) {
                            spacing_count = Math.floor(total_size.height / h);
                            if (spacing_count > 1) spacing = (total_size.height - spacing_count * h) / (spacing_count - 1);
                        }
                    }
                }

                start_x = this.scrollView.content.width * (0.5 - this.scrollView.content.anchorX);
                start_y = this.scrollView.content.height * (1 - this.scrollView.content.anchorY);
            } break;

            default: break;
        }

        // 若果只显示的下一个, 则 spacing 读取配置的值
        if (this.autoSpacing && show_count > 1) {
            this.spacing = Math.max(0, spacing);
        }

        this._contentBoundStartPos.x = start_x;
        this._contentBoundStartPos.y = start_y;
    }

    /**
     * 计算"滚动区域"大小
     */
    private _calculteContentSize(): void {
        // 计算子项临界坐标
        let tmp_bound_w: number = this.paddingStart;
        let tmp_bound_h: number = this.paddingStart;
        let tmp_pos_x: number = this._contentBoundStartPos.x + this.paddingStart;
        let tmp_pos_y: number = this._contentBoundStartPos.y - this.paddingStart;

        for (let i = 0; i < this._cellsInfo.length; ++i) {
            let prefab: cc.Prefab = this._getPrefabByType(this._cellsInfo[i].type);
            if (!prefab) continue;

            let node: cc.Node = prefab.data;
            switch (this.align) {
                case TableViewAlign.HORIZONTAL: {
                    this._cellsInfo[i].boundStart = tmp_bound_w;
                    this._cellsInfo[i].boundEnded = tmp_bound_w + node.width * node.scaleX * this.cellScale;
                    tmp_bound_w = this._cellsInfo[i].boundEnded;
                    tmp_bound_w += this.spacing;

                    this._cellsInfo[i].boundPosition.x = tmp_pos_x + node.width * node.anchorX * node.scaleX * this.cellScale;
                    this._cellsInfo[i].boundPosition.y = this._contentBoundStartPos.y;

                    tmp_pos_x = this._cellsInfo[i].boundPosition.x;
                    tmp_pos_x += node.width * (1 - node.anchorX) * node.scaleX * this.cellScale;
                    tmp_pos_x += this.spacing;
                } break;

                case TableViewAlign.VERTICAL: {
                    this._cellsInfo[i].boundStart = tmp_bound_h;
                    this._cellsInfo[i].boundEnded = tmp_bound_h + node.height * node.scaleY * this.cellScale;
                    tmp_bound_h = this._cellsInfo[i].boundEnded;
                    tmp_bound_h += this.spacing;

                    this._cellsInfo[i].boundPosition.x = this._contentBoundStartPos.x;
                    this._cellsInfo[i].boundPosition.y = tmp_pos_y - node.height * (1 - node.anchorY) * node.scaleY * this.cellScale;

                    tmp_pos_y = this._cellsInfo[i].boundPosition.y;
                    tmp_pos_y -= node.height * node.anchorY * node.scaleY * this.cellScale;
                    tmp_pos_y -= this.spacing;
                } break;

                default: break;
            }
        }

        let w: number = 0;
        let h: number = 0;

        switch (this.align) {
            case TableViewAlign.HORIZONTAL: {
                w = tmp_bound_w - this.spacing + this.paddingEnd;
            } break;

            case TableViewAlign.VERTICAL: {
                h = tmp_bound_h - this.spacing + this.paddingEnd;
            } break;

            default: break;
        }

        w = Math.max(w, this._contentSrcSize.width);
        h = Math.max(h, this._contentSrcSize.height);

        this.scrollView.content.setContentSize(w, h);
    }

    /**
     * 重置核心缓冲区
     */
    private _reseteKernelBuffer(): void {
        // 计算间距
        this._calculteAutoSpacing();

        // 计算 content 大小
        this._calculteContentSize();

        // 清理显示列表
        this._clearShowList();
    }

    /**
     * 获取指定类型索引的预制件
     * @param type 
     */
    private _getPrefabByType(type: number): cc.Prefab {
        let prefab: cc.Prefab = null;
        if (type >= 0 && type < this.prefabTypes.length) {
            prefab = this.prefabTypes[type];
        }
        return prefab;
    }

    /**
     * 生成指定类型的节点实例(优先从"节点池"中取)
     * @param type 
     */
    private _generateCellInstance(type: number): cc.Node {
        let node: cc.Node = null;

        let pool: cc.NodePool = this._cellsPoolMap.get(type);
        if (pool && pool.size() > 0) {
            node = pool.get();
        }
        else {
            let prefab: cc.Prefab = this._getPrefabByType(type);
            if (prefab) {
                node = cc.instantiate(prefab);
            }
        }

        // 复原属性
        if (node) {
            node.setScale(this.cellScale);
            node.opacity = 255;
            node.active = true;

            // 禁用"对应方位"的适配绑定
            let widget: cc.Widget = node.getComponent(cc.Widget);
            if (widget) {
                switch (this.align) {
                    case TableViewAlign.HORIZONTAL: {
                        widget.isAlignLeft = false;
                        widget.isAlignRight = false;
                        widget.isAlignHorizontalCenter = false;
                    } break;

                    case TableViewAlign.VERTICAL: {
                        widget.isAlignTop = false;
                        widget.isAlignBottom = false;
                        widget.isAlignVerticalCenter = false;
                    } break;

                    default: break;
                }
            }
        }

        return node;
    }

    /**
     * 清理显示列表
     */
    private _clearShowList(): void {
        this._recycleOutRangeNodes(0, 0, true);
        this._showCellsMap.clear();
    }

    /**
     * 清理实例节点池
     */
    private _clearNodePool(): void {
        this._cellsPoolMap.forEach((index: number, pool: cc.NodePool, i?: number): any => {
            pool.clear();
        });
        this._cellsPoolMap.clear();
    }

    /**
     * 回收指定范围索引之外的节点
     * @param startIdx      起始索引
     * @param endedIdx      结束索引
     * @param recycleAll    是否回收全部可视区节点(默认: false, 若为:true, 则忽略起始索引直接回收全部)
     */
    private _recycleOutRangeNodes(startIdx: number, endedIdx: number, recycleAll: boolean = false): void {
        if (this._showCellsMap.length <= 0) return;

        let delArray: number[] = [];
        this._showCellsMap.forEach((index: number, cell: Cell): any => {
            if (recycleAll || (index < startIdx || index > endedIdx)) {
                delArray.push(index);
            }
        });

        for (let i = 0; i < delArray.length; ++i) {
            let idx: number = delArray[i];
            let cell: Cell = this._showCellsMap.remove(idx);
            this._recycleNodeToPool(cell.node, cell.type, cell.component);
        }
    }

    /**
     * 回收指定节点至指定类型的池中
     * @param node      节点
     * @param poolType  池类型
     */
    private _recycleNodeToPool(node: cc.Node, poolType: number, component: string | typeof cc.Component): void {
        if (!cc.isValid(node, true)) return;
        if (poolType < 0 || poolType >= this.prefabTypes.length) return;

        let pool: cc.NodePool = this._cellsPoolMap.get(poolType);
        if (!pool) {
            pool = new cc.NodePool(component);
            this._cellsPoolMap.add(poolType, pool);
        }
        pool.put(node);
    }

    /**
     * 刷新指定索引数据
     * @param idx 
     */
    private _refreshCellData(idx: number): void {
        let cell: Cell = this._showCellsMap.get(idx);
        if (!cell) return;

        let t: CellInfo = this._cellsInfo[idx];
        let component: any = cell.node.getComponent(t.component);
        if (component && typeof component.updateSVReuseData === "function") {
            component.updateSVReuseData(idx, t.data, this);
        }
    }

    /**
     * 更新视图(Kernel logic)
     */
    private _updateView(): void {
        if (this._cellsInfo.length <= 0) return;

        let viewOffset: cc.Vec2 = this.getScrollOffset();
        let viewMaxOffset: cc.Vec2 = this.getMaxScrollOffset();

        let startIdx: number = -1;
        let endedIdx: number = -1;
        let scroll_x: number = viewOffset.x;
        let scroll_y: number = viewOffset.y;

        switch (this.align) {
            case TableViewAlign.HORIZONTAL: {
                scroll_x = Math.min(scroll_x, 0);
                scroll_x = Math.max(scroll_x, -viewMaxOffset.x);
                scroll_x = Math.abs(scroll_x);

                for (let i = 0; i < this._cellsInfo.length; ++i) {
                    let t: CellInfo = this._cellsInfo[i];
                    if (startIdx < 0 && t.boundEnded > scroll_x) {
                        startIdx = i;
                    }
                    else if (endedIdx < 0 && t.boundEnded >= scroll_x + this._contentSrcSize.width) {
                        endedIdx = i;
                    }

                    // 确定了边界, 跳出
                    if (startIdx >= 0 && endedIdx >= 0) {
                        break;
                    }
                }
            } break;

            case TableViewAlign.VERTICAL: {
                scroll_y = Math.min(scroll_y, viewMaxOffset.y);
                scroll_y = Math.max(scroll_y, 0);

                for (let i = 0; i < this._cellsInfo.length; ++i) {
                    let t: CellInfo = this._cellsInfo[i];
                    if (startIdx < 0 && t.boundEnded > scroll_y) {
                        startIdx = i;
                    }
                    else if (endedIdx < 0 && t.boundEnded >= scroll_y + this._contentSrcSize.height) {
                        endedIdx = i;
                    }

                    // 确定了边界, 跳出
                    if (startIdx >= 0 && endedIdx >= 0) {
                        break;
                    }
                }
            } break;

            default: break;
        }

        if (startIdx < 0) startIdx = 0;
        if (endedIdx < 0) endedIdx = this._cellsInfo.length - 1;

        // 回收节点
        this._recycleOutRangeNodes(startIdx, endedIdx);

        // 检测显示
        for (let i = startIdx; i <= endedIdx; ++i) {
            // 当前正在显示
            let cell: Cell = this._showCellsMap.get(i);
            if (cell) continue;

            // 新增节点
            let t: CellInfo = this._cellsInfo[i];
            cell = new Cell();
            cell.type = t.type;
            cell.component = t.component;
            cell.node = this._generateCellInstance(t.type);
            if (cell.node) {
                // 智能居中位置设定(优先"cc.Widget"预设)
                let widget: cc.Widget = cell.node.getComponent(cc.Widget);
                if (widget) {
                    switch (this.align) {
                        case TableViewAlign.HORIZONTAL: cell.node.x = t.boundPosition.x; break;
                        case TableViewAlign.VERTICAL: cell.node.y = t.boundPosition.y; break;
                    }
                }
                else {
                    cell.node.setPosition(t.boundPosition);
                }

                // 添加至"显示列表"
                this.scrollView.content.addChild(cell.node);
                this._showCellsMap.add(i, cell);
                this._refreshCellData(i);
            }
        }
    }

    // -------------------------------------------------------------------------------------------------------------------------
    // 外部接口

    /**
     * 是否已激活
     */
    isActivated(): boolean {
        let isActive: boolean = true;
        isActive &&= cc.isValid(this.scrollView, true);
        isActive &&= cc.isValid(this.scrollView.content, true);
        return isActive;
    }

    /**
     * @brief 绑定数据信息(每绑定一次新数据源都会重新刷新所有显示的数据一次)
     * @param objs 信息数组(也可以是单个元素)
     * @description prefab_type: 子项预制件的类型索引
     * @description prefab_component: 子项预制件对应的组件名(类型可以是 cc.Component 或者 cc.Component 字符串)
     * @description prefab_datas: 子项制件对应的数据(若是数组则会按序排列显示一组子项, 若是单个元素则只会显示一个子项)
     * @borrows objs 参数的子元素格式: { prefab_type: number, prefab_component: any, dataArray: any[] }
     */
    bindData(objs: { prefab_type: number, prefab_component: any, prefab_datas: any }[]): void {
        /*  深拷贝数组的几种方法
            let array1: any[] = [];
            let array2: any[] = [];
            array2 = JSON.parse(JSON.stringify(array1));      // 多维深拷贝
            array2 = array1.concat();                         // 一维多数组拼接
            array2 = array1.slice();                          // 一维深拷贝
        */

        if (objs !== null && typeof objs !== "undefined") {
            // 绑定数据信息(因为"TableView"不会修改传入的数据信息, 所以数组直接采取引用模式, 无需深拷贝)
            let tmp_objs: any[] = [];
            this._cellsInfo.splice(0, this._cellsInfo.length);

            if (Array.isArray(objs)) {
                tmp_objs = objs;
            }
            else {
                tmp_objs.push(objs);
            }

            for (let i = 0, count = 0; i < tmp_objs.length; ++i) {
                let prefab_type: number = tmp_objs[i].prefab_type;
                let prefab_component: any = tmp_objs[i].prefab_component;
                let prefab_datas: any = tmp_objs[i].prefab_datas;

                if (Array.isArray(prefab_datas)) {
                    for (let j = 0; j < prefab_datas.length; ++j) {
                        let t: CellInfo = new CellInfo();
                        t.uuid = ++count;
                        t.type = prefab_type;
                        t.component = prefab_component;
                        t.data = prefab_datas[j];
                        this._cellsInfo.push(t);
                    }
                }
                else {
                    let t: CellInfo = new CellInfo();
                    t.uuid = ++count;
                    t.type = prefab_type;
                    t.component = prefab_component;
                    t.data = prefab_datas;
                    this._cellsInfo.push(t);
                }
            }
        }
        else {
            this._cellsInfo.splice(0, this._cellsInfo.length);
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(cc.Vec2.ZERO);
        }

        // 校准 content 原始大小和原始位置
        if (!this._calibrateOnce) {
            this._calibrateOnce = true;
            this._calibrateContent();
        }

        // 重置核心缓冲区
        this._reseteKernelBuffer();
    }

    /**
     * 绑定滚动事件接收对象
     */
    bindScrollEventTarget(target: any): void {
        if (target === null || typeof target === "undefined") return;
        if (target instanceof cc.Node && !cc.isValid(target, true)) return;
        this._scrollEventTarget = target;
    }

    /**
     * 重新加载视图
     * @param resetPos 是否重置子项位置(可选参数; 默认为 true: 重置)
     */
    reloadView(resetPos: boolean = true): void {
        // 是否重置所有 cell 和 content 的位置
        if (resetPos) {
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(cc.Vec2.ZERO);
        }

        // 刷新视图
        this._updateView();
    }

    /**
     * 强行刷新一次视图和所有显示的数据(弥补"reloadView"显示哪个刷新哪个的局部缺陷, "tabelView"毕竟要注重性能)
     * 若无特殊刷新需求, 应用层一般不会调用该接口
     */
    refreshView(): void {
        this._updateView();
        this._showCellsMap.forEach((index: number, cell: Cell): any => {
            this._refreshCellData(index);
        });
    }

    /**
     * 清空视图
     * @param cleanup 是否深度清理(默认: false)
     */
    clearView(cleanup: boolean = false): void {
        // 清除数据
        this._cellsInfo.splice(0, this._cellsInfo.length);
        this.scrollView.stopAutoScroll();
        this.scrollView.scrollToOffset(cc.Vec2.ZERO);

        // 清理缓冲区
        this._reseteKernelBuffer();

        // 清理节点池
        if (cleanup) this._clearNodePool();
    }

    /**
     * 获取子项在视图中的显示索引(注意要与数据索引区别开来, 该接口是预留给特殊应用层需求)
     * @brief 若该子项滚动出可视区外被回收则索引失效, 需要再重新获取一次
     * @param dataIdx 数组索引
     */
    getCellViewIndex(dataIdx: number): number {
        let viewIdx: number = 0;

        if (this._showCellsMap.length > 0) {
            let vIndex: number[] = [];
            this._showCellsMap.forEach((index: number, cell: Cell): any => {
                vIndex.push(index);
            });

            // 升序
            vIndex.sort((a: number, b: number): number => { return a - b; });

            for (let i = 0; i < vIndex.length; ++i) {
                if (dataIdx === vIndex[i]) {
                    viewIdx = i;
                    break;
                }
            }
        }

        return viewIdx;
    }

    /**
     * 获取当前可视区子项个数
     */
    getCellViewCount(): number {
        return this._showCellsMap.length;
    }

    /**
     * 获取当前子项总个数
     */
    getCellTotalCount(): number {
        return this._cellsInfo.length;
    }

    /**
     * 获取指定数据索引的预制类型
     * @param dataIdx 
     */
    getCellType(dataIdx: number): number {
        let type: number = 0;
        if (dataIdx >= 0 && dataIdx < this._cellsInfo.length) {
            type = this._cellsInfo[dataIdx].type;
        }
        return type;
    }

    /**
     * 批量删除子项
     * @param dataIndexs 指定的子项数据"索引/索引数组"
     * @param anim 是否有动画(默认: false)
     */
    removeCells(dataIndexs: number | number[], anim: boolean = false): void {
        if (this._cellsInfo.length <= 0) return;
        if (dataIndexs === null || typeof dataIndexs === "undefined") return;

        let vDeleteIndex: number[] = [];
        if (!Array.isArray(dataIndexs)) {
            vDeleteIndex.push(dataIndexs);
        }
        else {
            vDeleteIndex = dataIndexs.slice();
        }

        if (vDeleteIndex.length <= 0 || this._showCellsMap.length <= 0) return;

        this.scrollView.stopAutoScroll();
        this._setTouchEventEnable(false);

        let vShowIdx: number[] = [];
        this._showCellsMap.forEach((index: number, cell: Cell): any => {
            vShowIdx.push(index);
        });

        vShowIdx.sort((a: number, b: number): number => { return a - b; });
        vDeleteIndex.sort((a: number, b: number): number => { return a - b; });

        let vInViewIdx: number[] = [];
        let vOutViewIdx: number[] = [];
        let nShowMinIdx: number = vShowIdx[0];
        let nShowMaxIdx: number = vShowIdx[vShowIdx.length - 1];
        for (let i = 0; i < vDeleteIndex.length; ++i) {
            let delIdx: number = vDeleteIndex[i];
            // 可视区外
            if (delIdx >= 0 && delIdx < nShowMinIdx) {
                vOutViewIdx.push(delIdx);
            }
            // 可视区内
            else if (delIdx >= nShowMinIdx && delIdx <= nShowMaxIdx) {
                vInViewIdx.push(delIdx);
            }
            // 直接舍弃
            else { }
        }

        let viewOffset: cc.Vec2 = this.getScrollOffset();
        let viewOffsetMax: cc.Vec2 = this.getMaxScrollOffset();
        let calibrateViewOffset: cc.Size = cc.size(viewOffset.x, viewOffset.y);

        // 删除项渐隐动画
        let animDelay: number = 0;
        let fadeDuring: number = 0.2;
        let moveDuring: number = 0.2;
        if (anim && vInViewIdx.length > 0) {
            let isFade: boolean = false;
            for (let i = 0; i < vInViewIdx.length; ++i) {
                let index: number = vInViewIdx[i];
                let cell: Cell = this._showCellsMap.get(index);
                if (!cell) continue;

                isFade = true;
                cell.node.runAction(cc.sequence(cc.delayTime(animDelay), cc.fadeOut(fadeDuring), cc.callFunc((): void => {
                    cell.node.active = false;
                    cell.node.opacity = 255;
                })));
            }
            if (isFade) animDelay += fadeDuring;
        }

        // 记录删除前的位置
        let deletePositionMap: HashMap<number, cc.Vec2> = new HashMap();
        for (let i = 0; i < this._cellsInfo.length; ++i) {
            deletePositionMap.add(this._cellsInfo[i].uuid, cc.v2(this._cellsInfo[i].boundPosition));
        }

        // 开始删除
        let bMoveAction: boolean = anim && vInViewIdx.length > 0;
        this.node.runAction(cc.sequence(cc.delayTime(animDelay), cc.callFunc((): void => {
            // 处理视图之外的删除项
            do {
                let isCalibrateView: boolean = false;

                // 校准"可视区内"的视图偏移
                let calibrateOutViewOffset: () => boolean = (): boolean => {
                    let tempSize: cc.Size = cc.Size.ZERO;
                    for (let i = 0; i < vOutViewIdx.length; ++i) {
                        let t: CellInfo = this._cellsInfo[vOutViewIdx[i]];
                        let prefab: cc.Prefab = this._getPrefabByType(t.type);
                        if (prefab) {
                            tempSize.width += prefab.data.width * prefab.data.scaleX * this.cellScale;
                            tempSize.height += prefab.data.height * prefab.data.scaleY * this.cellScale;
                        }
                    }
                    let spacing: number = vOutViewIdx.length * this.spacing;
                    tempSize.width += spacing;
                    tempSize.height += spacing;

                    // 手动偏移
                    viewOffset.x = Math.abs(viewOffset.x) - tempSize.width;
                    viewOffset.y = Math.abs(viewOffset.y) - tempSize.height;
                    viewOffset.x = Math.max(viewOffset.x, 0);
                    viewOffset.x = Math.min(viewOffset.x, viewOffsetMax.x);
                    viewOffset.y = Math.max(viewOffset.y, 0);
                    viewOffset.y = Math.min(viewOffset.y, viewOffsetMax.y);

                    return true;
                };

                // 校准"可视区外"的视图偏移
                let calibrateInViewOffset: () => boolean = (): boolean => {
                    let retValue: boolean = false;
                    for (let i = 0; i < vInViewIdx.length; ++i) {
                        // 若其中一个在小边缘上, 则校准对其
                        if (vInViewIdx[i] === nShowMinIdx) {
                            let tmpSpacingX: number = this._cellsInfo[nShowMinIdx].boundStart - Math.abs(viewOffset.x);
                            let tmpSpacingY: number = this._cellsInfo[nShowMinIdx].boundStart - Math.abs(viewOffset.y);
                            viewOffset.x = Math.abs(viewOffset.x) - Math.abs(tmpSpacingX);
                            viewOffset.y = Math.abs(viewOffset.y) - Math.abs(tmpSpacingY);
                            viewOffset.x = Math.max(viewOffset.x, 0);
                            viewOffset.x = Math.min(viewOffset.x, viewOffsetMax.x);
                            viewOffset.y = Math.max(viewOffset.y, 0);
                            viewOffset.y = Math.min(viewOffset.y, viewOffsetMax.y);

                            retValue = true;
                            break;
                        }
                    }
                    return retValue;
                };

                // 全在小边缘外
                if (vOutViewIdx.length > 0 && vInViewIdx.length <= 0) {
                    isCalibrateView = calibrateOutViewOffset();
                }
                // 部分在小边缘外, 部分在可视区内
                else if (vOutViewIdx.length > 0 && vInViewIdx.length > 0) {
                    isCalibrateView = isCalibrateView || calibrateOutViewOffset();
                    isCalibrateView = isCalibrateView || calibrateInViewOffset();
                }
                // 全在可视区内(或者部分在可视区内, 部分在大边缘外)
                else if (vOutViewIdx.length <= 0 && vInViewIdx.length > 0) {
                    isCalibrateView = calibrateInViewOffset();
                }
                // 全在大边缘外(不做处理)
                else { }

                // 手动校准视图偏移
                if (isCalibrateView) {
                    this.scrollView.scrollToOffset(viewOffset);
                }

                // 保存手动偏移后的差值
                calibrateViewOffset.width = Math.abs(calibrateViewOffset.width - viewOffset.x);
                calibrateViewOffset.height = Math.abs(calibrateViewOffset.height - viewOffset.y);
            } while (false);

            // 计算校准后的可视坐标
            deletePositionMap.forEach((key: number, value: cc.Vec2): void => {
                this.scrollView.content.convertToWorldSpaceAR(value, value);
                this.scrollView.node.convertToNodeSpaceAR(value, value);
                deletePositionMap.add(key, value);
            });

            // 从数组中剔除要删除的数据
            for (let i = 0; i < this._cellsInfo.length; ++i) {
                for (let j = 0; j < vDeleteIndex.length; ++j) {
                    if (i === vDeleteIndex[j]) {
                        this._cellsInfo[i] = null;
                        break;
                    }
                }
            }
            for (let i = 0; i < this._cellsInfo.length; ++i) {
                if (this._cellsInfo[i] === null) {
                    this._cellsInfo.splice(i, 1);
                    --i;
                }
            }

            // 手动更新视图
            this._calculteContentSize();
            this._clearShowList();
            this._updateView();

            // 处理视图内的动画
            if (bMoveAction) {
                this._showCellsMap.forEach((index: number, cell: Cell): any => {
                    let t: CellInfo = this._cellsInfo[index];
                    let sp: cc.Vec2 = deletePositionMap.get(t.uuid);
                    if (sp) {
                        sp.x += calibrateViewOffset.width;
                        sp.y += calibrateViewOffset.height;
                        this.scrollView.node.convertToWorldSpaceAR(sp, sp);
                        this.scrollView.content.convertToNodeSpaceAR(sp, sp);

                        cell.node.setPosition(sp);
                        let mt: cc.ActionInterval = cc.moveTo(moveDuring, cc.v2(t.boundPosition));
                        let es: cc.ActionInterval = mt.easing(cc.easeOut(3.0));
                        cell.node.runAction(es);
                    }
                    else {
                        console.error(`${TableView.g_class_name} - Error : remove uuid = [${t.uuid}] faild`);
                    }
                });
            }
        })));

        // 结束回调
        // let end: () => void = (): void => {
        //     // 解禁
        //     this._setTouchEventEnable(true);

        //     // 清理局部数组等(局部不清理系统也会自动回收)
        //     vDeleteIndex.splice(0, vDeleteIndex.length);
        //     vShowIdx.splice(0, vShowIdx.length);
        //     vInViewIdx.splice(0, vInViewIdx.length);
        //     vOutViewIdx.splice(0, vOutViewIdx.length);
        //     deletePositionMap.clear();
        // }

        // 解除事件遮罩层
        if (bMoveAction) {
            animDelay += moveDuring;
            this.node.runAction(cc.sequence(cc.delayTime(animDelay), cc.callFunc((): void => {
                this._setTouchEventEnable(true);
            })));
        }
        else {
            this._setTouchEventEnable(true);
        }
    }

    /**
     * 重置滚动视图为指定大小
     * @param size      目标大小
     * @param isForce   是否强制刷新(默认:false)
     * @brief 若要动态修改视图总大小, 建议该视图不要绑定"widget"组件, 如果动态"add"的子节点也绑定了"widget",
     * 那么在调用子节点适配逻辑的时候, 引擎内部"cc.Widget.updateAlignment"会递归到跟父节点再刷一次, 有可能导致
     * 刚设置的大小被"widget"复原了, 这TM是个巨坑, 父节点和新增的子节点的动态绑定二者只能取其一
     */
    resetScrollVewSize(size: cc.Size, isForce: boolean = false): boolean {
        if (!isForce && this.scrollView.node.getContentSize().equals(size)) return false;

        this.scrollView.node.setContentSize(size);
        this._calibrateContent();
        this._reseteKernelBuffer();

        return true;
    }

    /**
     * 获取滚动视图相对于左上角原点的当前滚动偏移
     */
    getScrollOffset(): cc.Vec2 {
        return this.scrollView.getScrollOffset();
    }

    /**
     * 获取滚动视图最大可以滚动的偏移量
     */
    getMaxScrollOffset(): cc.Vec2 {
        return this.scrollView.getMaxScrollOffset();
    }

    /**
     * 视图内容在规定时间内将滚动到"ScrollView"相对左上角原点的偏移位置
     * @param offset            偏移距离
     * @param timeInSecond      执行时间(缺省时, 则立即偏移)
     * @breif 之所以封装该方法, 是因为在"creator"引擎内部, 如果是"瞬移模式"则不会出发"scrolling"消息
     */
    scrollToOffsetEx(offset: cc.Vec2, timeInSecond?: number): void {
        this.scrollView.scrollToOffset(offset, timeInSecond);

        // 瞬移模式, 该处主动触发视图数据更新, 应用层就无需额外逻辑了
        if (!timeInSecond || timeInSecond <= 0) {
            this._updateView();
        }
    }

    /**
     * 视图内容将在规定时间内滚动到视图对应方位
     * @param dir               目标方位
     * @param timeInSecond      执行时间(缺省时, 则立即偏移)
     * @param attenuated        滚动加速度是否衰减, 默认为true
     * @breif 之所以封装该方法, 是因为在"creator"引擎内部, 如果是"瞬移模式"则不会触发"scrolling"消息
     */
    scrollToDir(dir: TableViewScrollToDir, timeInSecond?: number, attenuated?: boolean): void {
        // 如果正在滚动则立即停止
        this.scrollView.stopAutoScroll();

        // 开始偏移
        switch (dir) {
            case TableViewScrollToDir.TOP: this.scrollView.scrollToTop(timeInSecond, attenuated); break;
            case TableViewScrollToDir.BOTTOM: this.scrollView.scrollToBottom(timeInSecond, attenuated); break;
            case TableViewScrollToDir.LEFT: this.scrollView.scrollToLeft(timeInSecond, attenuated); break;
            case TableViewScrollToDir.RIGHT: this.scrollView.scrollToRight(timeInSecond, attenuated); break;
            case TableViewScrollToDir.TOP_LEFT: this.scrollView.scrollToTopLeft(timeInSecond, attenuated); break;
            case TableViewScrollToDir.TOP_RIGHT: this.scrollView.scrollToTopRight(timeInSecond, attenuated); break;
            case TableViewScrollToDir.BOTTOM_LEFT: this.scrollView.scrollToBottomLeft(timeInSecond, attenuated); break;
            case TableViewScrollToDir.BOTTOM_RIGHT: this.scrollView.scrollToBottomRight(timeInSecond, attenuated); break;
        }

        // 瞬移模式, 该处主动触发视图数据更新, 应用层就无需额外逻辑了
        if (!timeInSecond || timeInSecond <= 0) {
            this._updateView();
        }
    }

    /**
     * 预生成池实例(该接口预留给需要做流畅动画需求的应用场景)
     * @param count 实例数量(默认:1, 即每个预制件类型实例化1个)
     * @breif 虽说"TableView"是复用"cell", 但是当应用层可视区可以容纳多个"cell"时, 第一次创建多个"cell"也还是会耗时, 那么就需要预生成实例了
     * 可以结合"isGeneratePoolInst"接口去做检测在适应的情况下"reloadView", 这样即使应用层在"cc.Action"时也可以很流畅
     * 当然实现方式并非一种, 也可以在"cc.Action"完毕后再"reloadView", 等等, 这里提供该接口作为预留方案
     */
    generatePoolInst(component: string | typeof cc.Component, count: number): void {
        this._pregenerateInstOnce = true;

        for (let type = 0; type < this.prefabTypes.length; ++type) {
            let prefab: cc.Prefab = this.prefabTypes[type];
            if (!prefab) continue;

            for (let i = 0; i < count; ++i) {
                let node: cc.Node = this._generateCellInstance(type);
                this._recycleNodeToPool(node, type, component);
            }
        }
    }

    /**
     * 是否已预生成实例对象
     */
    isGeneratePoolInst(): boolean {
        return this._pregenerateInstOnce;
    }

    // -------------------------------------------------------------------------------------------------------------------------
    // 外部接口 end
}
