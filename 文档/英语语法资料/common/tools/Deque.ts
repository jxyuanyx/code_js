/**
 * 泛型 T
 */
export interface DequeGenericityType<T> {
    type: T
}

/**
 * Deque 双向队列泛型实现(实现部分主要的接口)
 */
export class Deque<T> {
    private _items: object = null;
    private _count: number = 0;
    private _lowestCount: number = 0;

    constructor() {
        this._items = {}
        this._count = 0;
        this._lowestCount = 0;
    }

    /**
     * 在开头位置插入元素
     * @param element 
     */
    push_front(element: T): void {
        if (this.empty()) {
            this.push_back(element);
        }
        else if (this._lowestCount > 0) {
            --this._lowestCount;
            this._items[this._lowestCount] = element;
        }
        else {
            for (let i: number = this._count; i > 0; --i) {
                this._items[i] = this._items[i - 1];
            }
            ++this._count;
            this._items[0] = element;
        }
    }

    /**
     * 在尾部位置插入元素
     * @param element 
     */
    push_back(element: T): void {
        this._items[this._count] = element;
        ++this._count;
    }

    /**
     * 删除开头位置的元素
     */
    pop_front(): T {
        if (this.empty()) {
            return null;
        }
        let result: Readonly<T> = this._items[this._lowestCount];
        delete this._items[this._lowestCount];
        ++this._lowestCount;
        return result;
    }

    /**
     * 删除末尾位置的元素
     */
    pop_back(): T {
        if (this.empty()) {
            return null;
        }
        --this._count;
        let result: Readonly<T> = this._items[this._count];
        delete this._items[this._count];
        return result;
    }

    /**
     * 返回头部第一个元素
     */
    front(): T {
        if (this.empty()) {
            return null;
        }
        return this._items[this._lowestCount];
    }

    /**
     * 返回尾部第一个元素
     */
    back(): T {
        if (this.empty()) {
            return null;
        }
        return this._items[this._count - 1];
    }

    /**
     * 返回队列特定位置的元素的引用
     * @param idx 
     * @param realIndex 
     */
    at(idx: number, realIndex: boolean = true): T {
        if (realIndex) { idx += this._lowestCount; }
        let element: T = this._items[idx];
        if (typeof (element) != "undefined" && element != null) {
            return element;
        }
        return null;
    }

    /**
     * 判断队列是否为空
     */
    empty(): boolean {
        return this.size() === 0;
    }

    /**
     * 清除队列中所有元素
     */
    clear(): void {
        this._items = {};
        this._count = 0;
        this._lowestCount = 0;
    }

    /**
     * 返回队列实际拥有的元素个数
     */
    size() {
        return this._count - this._lowestCount;
    }

    /**
     * 转换成字符串
     */
    toString(): string {
        if (this.empty()) {
            return '';
        }
        let objString: string = `${this._items[this._lowestCount]}`;
        for (let i = this._lowestCount + 1; i < this._count; ++i) {
            objString = `${objString},${this._items[i]}`;
        }
        return objString;
    }
}