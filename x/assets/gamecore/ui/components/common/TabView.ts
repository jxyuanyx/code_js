import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import Common from "../../core/Common";

@ccclass()
export class TabView extends cc.Component {

    @property(cc.ToggleContainer)
    private tabView: cc.ToggleContainer = null;

    @property(cc.Node)
    private tabContainer: cc.Node = null;

    @property([cc.Prefab])
    private tabPages: cc.Prefab[] = [];

    @property()
    private currentSelect: number = 0;

    private tabContents: cc.Node[] = [];

    protected onLoad(): void {

        // this.tabView = this.getComponentInChildren(cc.ToggleContainer);
        if (!this.tabView) {
            cc.warn("TabView未设置 ToggleContainer");
            return
        }

        const tabs = this.tabView.toggleItems;

        this.tabContents = new Array(tabs.length);

        if (this.tabPages.length != tabs.length) {
            cc.warn("TabView 页面数与Tabs不相等。");
            // return;
        }
        for (let i = 0; i < tabs.length; i++) {
            Common.setClickListenerAnim(tabs[i], false, () => {
                this.tabChecked(tabs[i], i);
            }, this);
        }
        if (tabs.length > this.currentSelect) {
            if (tabs[this.currentSelect].isChecked) {
                this.tabChecked(tabs[this.currentSelect], this.currentSelect);
            } else {
                tabs[this.currentSelect].check();
            }
        }
    }

    private tabChecked(toggle: cc.Toggle, param: number) {

        const selected = +param;

        const preShowing = this.currentSelect;

        if (this.currentSelect != selected) {
            this.currentSelect = selected;
            if (toggle) {
                toggle.check();
            }
        }
        if (!this.tabPages[this.currentSelect]) {
            cc.warn(`Page:${this.currentSelect} 不存在.`);
            return;
        }
        if (!this.tabContents[this.currentSelect]) {
            this.tabContents[this.currentSelect] = cc.instantiate(this.tabPages[this.currentSelect]);
            const page = this.tabContents[this.currentSelect].getComponent(TabViewPage);
            if (page) {
                page.setPageIndex(this.currentSelect);
            }
            this.tabContainer.addChild(this.tabContents[this.currentSelect]);
        }
        // 给页签切换增加动画效果.
        try {
            if (preShowing != selected) {
                const prePage = this.tabContents[preShowing].getComponent(TabViewPage);
                if (prePage) {
                    prePage.onPageHiding().then(() => {
                        this.tabContents[preShowing].active = false;
                    })
                }
                const curPage = this.tabContents[this.currentSelect].getComponent(TabViewPage);
                if (curPage) {
                    curPage.node.active = true;
                    curPage.onPageShowing()
                }
            }
        } catch (e) {
        }
    }

    public setCurrent(index: number) {
        this.tabChecked(null, index);
    }

    public get currentIndex() {
        return this.currentSelect;
    }

    public get pageCount(): number {
        return this.tabPages.length;
    }

}

// TabView中page的公共抽象类，用于TabView里面所有的page使用相同类，而显示不同数据
export default abstract class TabViewPage extends cc.Component {

    private curIndex: number = 0;

    private tabView: TabView = null;

    public setPageIndex(index: number) {
        // console.log("===========setCurIndex",index);
        this.curIndex = index;
    }

    public getPageIndex(): number {
        return this.curIndex;
    }

    public setTabView(tabview: TabView) {
        this.tabView = tabview;
    }

    public getTabView(): TabView {
        return this.tabView;
    }

    // 子类重写方法以实现页面切换效果
    public onPageShowing(): Promise<any> {
        this.node.opacity = 0;
        // 隐藏在最左边
        // this.node.x = -this.node.width;
        return new Promise(resolve => {
            cc.tween(this.node).to(0.5,
                {
                    opacity: 255,
                    // x: 0
                })
                .call(() => {
                    resolve()
                }).start();
        })
    }

    // 子类重写方法以实现页面切换效果
    public onPageHiding(): Promise<any> {
        return new Promise(resolve => {
            // 去向最右边
            cc.tween(this.node).to(0.5, {
                opacity: 0,
                // x: this.node.width
            })
                .call(() => {
                    resolve()
                }).start();
        })
    }
};
