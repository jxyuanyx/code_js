// 模拟一个TS版的HashMap(由于是泛型实现, 这里的HashMap<K,V>中的K和V可以是任意强类型)

/* 使用示例
let hashmap: HashMap<string, number> = new HashMap();
hashmap.add("test", 123);
console.log(hashmap.get("test"));
hashmap.remove("test");

// 遍历方法1
hashmap.forEachKeyValue((data: KeyValue<string, number>): any => {
    console.log("key = " + data.key + ", " + "value = " + data.value);
    //return "continue";
});

// 遍历方法2
hashmap.forEach((key: string, value: number): any => {
    console.log("key = " + key + ", " + "value = " + value);
    //return "break";
});
*/

/**
 * HashMap 键值接口
 */
export interface KeyValue<K, V> {
    key: K,
    value: V
}

/**
 * HashMap 泛型实现
 */
export class HashMap<K, V>{

    private _list: KeyValue<K, V>[] = [];

    constructor() {
        this.clear();
    }

    //通过key获取索引
    private _getIndexByKey(key: K): number {
        let count: number = this._list.length;
        for (let index: number = 0; index < count; ++index) {
            const element: KeyValue<K, V> = this._list[index];
            if (element.key === key) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 添加键值
     * @param key 键
     * @param value 值
     * @param replace 是否替换值(默认:true)
     */
    public add(key: K, value: V, replace: boolean = true): void {
        let data: KeyValue<K, V> = { key: key, value: value };
        let index: number = this._getIndexByKey(key);
        if (index !== -1 && replace) {
            //已存在：刷新值
            this._list[index] = data;
        }
        else {
            //不存在：添加值
            this._list.push(data);
        }
    }

    /**
     * 删除键值
     * @param key 键
     * @returns 返回键对应的值
     */
    public remove(key: K): V {
        let index: number = this._getIndexByKey(key);
        if (index !== -1) {
            let data: KeyValue<K, V> = this._list[index];
            this._list.splice(index, 1);
            return data.value;
        }
        return null;
    }

    /**
     * 是否存在指定键
     * @param key 键
     */
    public has(key: K): boolean {
        let index: number = this._getIndexByKey(key);
        return index !== -1;
    }

    /**
     * 通过 key 获取键值 value
     * @param key 键
     * @returns 返回键对应的值
     */
    public get(key: K): V {
        let index: number = this._getIndexByKey(key);
        if (index !== -1) {
            let data: KeyValue<K, V> = this._list[index];
            return data.value;
        }
        return null;
    }

    /**
     * 返回数据个数
     * @returns 
     */
    public get length(): number {
        return this._list.length;
    }

    /**
     * 根据索引获取value
     * @param callback:
     */
   public getValueByIndex(index:number): any{
        let count: number = this._list.length;
        if(index < 0 || index >= count){
            return null;
        }
        return  this._list[index];
    }

    /**
     * 遍历列表
     * @param callback 回调函数: callback(data, index)
     */
    public forEachKeyValue(callback: (data: KeyValue<K, V>, i?: number) => any) {
        let count: number = this._list.length;
        for (let index: number = 0; index < count; ++index) {
            const element: KeyValue<K, V> = this._list[index];
            let ret = callback(element, index);
            if (ret === "continue") continue;
            else if (ret === "break") break;
        }
    }

    /**
     * 遍历列表
     * @param callback 回调函数: callback(k, v, index)
     */
    public forEach(callback: (key: K, value: V, i?: number) => any) {
        let count: number = this._list.length;
        for (let index: number = 0; index < count; ++index) {
            const element: KeyValue<K, V> = this._list[index];
            let ret = callback(element.key, element.value, index);
            if (ret === "continue") continue;
            else if (ret === "break") break;
        }
    }

    /**
     * 清空全部
     */
    public clear(): void {
        this._list.splice(0, this._list.length);
        // this._list = [];
    }
}