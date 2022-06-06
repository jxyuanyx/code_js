import * as pb from "./../../common/protobuf/protobuf";
import cv from "../../components/lobby/cv";
import { HashMap } from "./HashMap";

/** 引擎版本: v2.4.5
 * 资源管理类 (包括资源加载, 替换, 查找, 适配等)
 * API 提供的几种常见资源加载方式
 * 1> cc.assetManager.loadRemote        - 加载远程资源和设备资源            - 已封装
 * 2> cc.resources.load                 - 加载位于"resources"目录下的资源   - 已封装
 * 3> cc.resources.loadDir              - 加载相同路径下的多个资源          - 已封装
 * 4> cc.resources.get                  - 获取"resources"已经加载的资源     - 已封装
 * 5> cc.assetManager.releaseAsset      - 释放资源以及其依赖资源            - 已封装
 * 6> loadBaseResource 加载基础资源(热更场景调用)
 * 7> loadDataFile 加载所有资源((热更场景调用, 不包函"loadBaseResource"中加载的资源，避免重复加载和重复代码)
 * 8> 基础资源和其它资源分开加载是为了当前场景显示正确的语言和LOGO
 * 9> 升级新引擎, 一些流程和API都有改动, 建议多看看官方文档, 思路还是很清晰的
 * 
 * 注意: 新版引擎由于切换场景GC延时, 所以不得不重构动态资源相关的逻辑
 * 具体流程如下:
 * 1.先封装引擎加载相关的API(封装目的是加入引用计数, 目前计数为"CleanResLevel", 也就随场景清理而彻底清理)
 * 2.替换项目中所有旧引擎层的API(比如cc.loader/cc.resources/cc.assetManager), 改为封装后的接口(这样就不用担心什么该释放什么不该释放
 *      , 因为有"CleanResLevel"标记了, 在切场景的时候会根据"清理级别"去清理所有动态资源, 目前是除了"LEVEL_BASE"资源外都清理)
 * 3.特殊处理下"远程头像"相关的接口(其实这些也有清理标记,那就是自己切出场景就清理了, 但是你还没有退出场景的时候明星桌旁观进进出出会一直累加
 *      , 所以就单独分出几个接口处理, 目前已处理好了, 沿用了之前的流程, 但是整合了接口重命名了, 以下有详细注释
 * 4.本类接口模块有用很长一段"*"号作为隔断, 分别为"封装接口层/加载基础资源层/单独处理远程头像层/其他接口层"
 * 5.封装了部分常用的加载相关接口(基本够用了), 封装的接口只负责底层加载, 并没有检测是否已存在缓存(其实就算不检测引擎源码也有检测, 也是通过
 *      回调函数回调回来, 其实效果一样的, 之所有"其他接口层"有类似在封装的接口, 是为了直接获取资源, 写法再简单一些而已, 例如本类中:
 *      "loadRemote"和"downloadImg"的区别在于前者是基础的引用封装, 后者是应用层的封装, 其实最终还是走的引用计数加载, 一样的, 这里保留了后者)
 * 6.关于过渡场景的解释: 因为引擎GC延时且随着项目资源越来越多, 动态释放资源必须要处理, 那么什么时候释放资源呢, 有很多种, 目前最简单最直接的
 *      就是在切场景的过程中释放, 切前释放渲染局部黑屏(因为场景没切完不能释放,有资源引用), 切后释放也不行(因为目的是去峰值, 都切完了爆了峰值
 *      再释放还有毛用), 所以过渡场景诞生, 过渡场景是个空场景, 在封装完切场景接口后, 流程是先切换至过渡场景, 开始GC/释放动态资源/GC等等
 *      , 完毕后在切换至目标场景, 整个过程中一直有常驻节点进行"Loading", 基本没什么问题
 * 7.虽然大幅度去掉峰值和优化加载, 但是无法避免的是"Hall"和"Game"这两个场景自带暴击(场景大关联资源多), 导致场景本身就慢, 跟释放资源与否
 *      没什么关系, 所以切场景实时间这个暂时无法解决, 随着后续开发越来越多, 耦合度太高, 很难解耦, 暂时没空管...
 * 8.以后动态加载任何资源都必须要走本类的封装接口逻辑, 否则那部分资源无法清理, 除非自行维护; 切换场景也是, 也要用封装后的接口
 * 9.剩余隐患: 散图合并, 大场景解耦, 其他清理级别等等
 * 10."Cocos Creator Cannot read property 'load' of null"报错(原因是: 卸载资源的时候, 将预制体引用的资源卸载掉了, 重新加载资源但是未重新加载预制体的话
 *      , 创建预制体会报错, 所以要去掉这个报错, 就得再卸载资源的时候, 连预制体一起卸载掉, 再重新加载, 哎, 真tm巨坑), 具体步骤如下:
 *      a>.加载资源和预制体
 *      b>.卸载资源和预制体
 *      c>.重新加载资源和预制体, 创建预制体
 *      出现上述bug的情况一般是对应场景没有勾选自动释放策略(引擎帮你释放场景和自动加载关联预制件), 或者是手动"load"的预制件在相应资源释"load"没有保持一致
 */

// 开启抗锯齿(感觉没卵用, 仅支持web)
cc.macro.ENABLE_WEBGL_ANTIALIAS = true;

export class headInfo {
    /**
     * 平台字段(0 pwk, 1 wpk) 默认0
     */
    plat: number = null;

    /**
     * 头像地址
     */
    url: string = null;

    /**
     * 是否旁观(默认:false)
     */
    isOB: boolean = false;
}

/**
 * 动态资源释放级别(主要依据还是预加载设定的级别和切场景传入的级别参数, 会清理该级别及其以下的资源)
 */
export enum CleanResLevel {
    LEVEL_VIEW = 0,                                                                     // 最低级别资源(一般随着视图界面关闭而清理)
    LEVEL_SCENE,                                                                        // 暂定为随着普通场景清理而清理的级别
    LEVEL_EXTRA_1,                                                                      // 预留级别1
    LEVEL_EXTRA_2,                                                                      // 预留级别2
    LEVEL_EXTRA_3,                                                                      // 预留级别3
    LEVEL_MAX,                                                                          // 除了基础资源外的所有资源
    LEVEL_BASE,                                                                         // 最高级别(基础资源一般不会释放)
}

class DynamicRes {
    inst: cc.Asset = null;                                                              // 资源实例
    path: string = "";                                                                  // 路径
    uuid: string = "";                                                                  // uuid
    isRemote: boolean = false;                                                          // 是否远程资源
    cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE;                              // 清理级别
}

/**
 * 资源管理类
 */
export class ResourceManager {
    static g_class_name: string = "ResMgr";                                             // 类名
    CleanResLevel = CleanResLevel;

    private static _g_Instance: ResourceManager = null;                                 // 单例
    private _nLoadTotalCount: number = 0;                                               // 预计加载项总计数
    private _nLoadCompletedCount: number = 0;                                           // 实际加载完成项计数
    private _loadCallBack: Function = null;                                             // 加载完毕回调
    private _vSensitivewords: string[] = [];                                            // 敏感词组

    private _nLoadBaseResTotalCount: number = 0;                                        // 预计加载配置文件和基础资源总计数
    private _nLoadBaseResCompletedCount: number = 0;                                    // 实际加载配置文件和基础资源完成项计数

    private _vDynamicResMap: DynamicRes[] = [];                                         // 全局动态加载总资源数组
    private _vRemoteHeadInfo: headInfo[] = [];                                          // 远程头像信息数组
    private _vRemoteHeadResMap: HashMap<string, cc.Texture2D> = new HashMap();          // 远程头像的资源数组

    /**
     * 获取单例
     */
    static getInstance(): ResourceManager {
        if (!ResourceManager._g_Instance) {
            ResourceManager._g_Instance = new ResourceManager();
        }
        return ResourceManager._g_Instance;
    }

    // **********************************************************************************************************************
    // 封装部分加载相关的API(加入了资源管理, 用于内存优化)

    getAssetUUID(asset: cc.Asset): string {
        let t: any = asset;
        return cv.String(t._uuid);
    }

    /**
     * 加载资源(单个或数组)
     * @param paths 
     * @param type 
     * @param callBack 
     * @param cleanLevel 
     */
    load(paths: string | string[], type: typeof cc.Asset, callBack: (assets: cc.Asset | cc.Asset[]) => void, cleanLevel: CleanResLevel): void {
        if (Array.isArray(paths)) {
            if (paths.length <= 0) return;
            cc.resources.load(paths, type, (error: Error, assets: cc.Asset[]): void => {
                if (error) {
                    console.error(`${ResourceManager.g_class_name} - load array error: ${error.message || error}, paths = ${paths}`);
                    return;
                }

                for (let i = 0; i < assets.length; ++i) {
                    this._addDynamicRes(assets[i], paths[i], cleanLevel);
                }

                if (callBack) callBack(assets);
            });
        }
        else {
            if (!paths || typeof paths === "undefined") return;
            cc.resources.load(paths, type, (error: Error, assets: cc.Asset): void => {
                if (error) {
                    console.error(`${ResourceManager.g_class_name} - load error: ${error.message || error}, paths = ${paths}`);
                    return;
                }

                this._addDynamicRes(assets, paths, cleanLevel);
                if (callBack) callBack(assets);
            });
        }
    }

    /**
     * 加载目标文件夹中的所有资源(注意：路径中只能使用斜杠，反斜杠将停止工作)
     * @param dir 
     * @param type 
     * @param callBack 
     * @param cleanLevel 
     */
    loadDir(dir: string, type: typeof cc.Asset, callBack: () => void, cleanLevel: CleanResLevel): void {
        cc.resources.loadDir(dir, type, (error: Error, assets: cc.Asset[]): void => {
            if (error) {
                console.error(`${ResourceManager.g_class_name} - loadDir error: ${error.message || error}, dir = ${dir}`);
                return;
            }

            let infos: any[] = cc.resources.getDirWithPath(dir, type);
            let getPahtByUUID: (uuid: string) => string = (uuid: string): string => {
                let path: string = "";
                for (let i = 0; i < infos.length; ++i) {
                    let t: any = infos[i];
                    if (uuid === t.uuid) {
                        path = t.path;
                        break;
                    }
                }
                return path;
            }

            for (let i = 0; i < assets.length; ++i) {
                let uuid: string = this.getAssetUUID(assets[i]);
                let path: string = getPahtByUUID(uuid);
                this._addDynamicRes(assets[i], path, cleanLevel);
            }

            if (callBack) callBack();
        });
    }

    /**
     * 加载远程资源
     * @param url 
     * @param callBack 
     * @param cleanLevel (清理级别, 默认随着场景清理而清理)
     */
    loadRemote(url: string, callBack: (err: Error, asset: cc.Asset) => void, cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE): void {
        cc.assetManager.loadRemote(url, (err: Error, asset: cc.Asset): void => {
            if (err) {
                console.error(`${ResourceManager.g_class_name} - loadRemote error: ${err.message || err}, url=${url}`);
            }
            else {
                this._addDynamicRes(asset, url, cleanLevel, true);
            }

            if (callBack) callBack(err, asset);
        });
    }

    /**
     * 添加动态资源信息至"资源映射表"(内部使用, 主要用于标记)
     * @param asset 
     * @param path 
     * @param isRemote 
     * @param cleanLevel 
     */
    private _addDynamicRes(asset: cc.Asset, path: string, cleanLevel: CleanResLevel, isRemote: boolean = false): void {
        let t: DynamicRes = null;
        let uuid: string = this.getAssetUUID(asset);

        // 通过"uuid"来判断唯一
        for (let i = 0; i < this._vDynamicResMap.length; ++i) {
            if (this._vDynamicResMap[i].uuid === uuid) {
                t = this._vDynamicResMap[i];
                break;
            }
        }

        let isAdd: boolean = false;
        if (!t) {
            isAdd = true;
            t = new DynamicRes();
            this._vDynamicResMap.push(t);
        }
        else {
            // 如果存在重复的uuid, 则按照清理级别高的替换级别低的, 目的是避免后序续重复添加的高级别被清理
            if (cleanLevel > t.cleanLevel) {
                isAdd = true;
            }
        }

        if (isAdd) {
            t.inst = asset;
            t.path = path;
            t.uuid = uuid;
            t.isRemote = isRemote;
            t.cleanLevel = cleanLevel;
            console.log(`${ResourceManager.g_class_name}-load DynamicRes ===> path = ${path}, level = ${cleanLevel}`);
        }
    }

    /**
     * 移除指定动态资源
     * @param res 
     */
    private _removeDynamicRes(res: DynamicRes): void {
        let isCleared: boolean = false;

        if (cv.tools.isValidNode(res.inst)) {
            if (res.inst instanceof cc.SpriteFrame) {
                cc.assetManager.releaseAsset(res.inst.getTexture());
                cc.assetManager.releaseAsset(res.inst);
            }
            else if (res.inst instanceof cc.SpriteAtlas) {
                cc.assetManager.releaseAsset(res.inst.getTexture());
                cc.assetManager.releaseAsset(res.inst);
            }
            else if (res.inst instanceof cc.AudioClip) {
                cc.assetManager.releaseAsset(res.inst);
                cv.AudioMgr.releaseAudio(res.path);
            }
            // 如果有其他关联类型在这里继续添加
            // else if
            else {
                cc.assetManager.releaseAsset(res.inst);
            }

            isCleared = true;
        }

        // 删除数组索引
        let strSuffix: string = `path = ${res.path}, level = ${res.cleanLevel}`;
        if (isCleared) {
            // 动态资源正常清理
            console.log(`${ResourceManager.g_class_name}-release DynamicRes ok ===> ${strSuffix}`);
        }
        else {
            // 动/静态都引用到的资源, 但是被静态引用的场景关联GC了, 导致实例被提前销毁(属于正常, 但该处资源需要关注下)
            console.warn(`${ResourceManager.g_class_name}-release DynamicRes failed(invalid instance) ===> ${strSuffix}`);
        }
    }

    /**
     * 打印动态资源释放前的资源列表
     * @param isBeginOrEnd 
     */
    private _printReleaseDynamicRes(isBeginOrEnd: boolean): void {
        let leveMap: HashMap<CleanResLevel, number> = new HashMap();
        for (let i = 0; i < this._vDynamicResMap.length; ++i) {
            let res: DynamicRes = this._vDynamicResMap[i];
            let count: number = leveMap.get(res.cleanLevel);
            if (count === null) {
                count = 0;
                leveMap.add(res.cleanLevel, count);
            }
            leveMap.add(res.cleanLevel, ++count);
        }

        let profix: string = isBeginOrEnd ? "begin" : "end";
        console.log(` ********** ${ResourceManager.g_class_name}-release res ${profix} ********** `);
        leveMap.forEach((level: CleanResLevel, count: number): void => {
            console.log(`${ResourceManager.g_class_name}-release res ${profix} ===> level = ${level}, count = ${count}`);
        });
        console.log(` ********** ${ResourceManager.g_class_name}-release res ${profix} ********** `);
    }

    /**
     * 清理指定资源(可在外部其他地方单独调用, 该接口主要是预留给某些需要单独释放的资源)
     * 注意: 若要释放其他资源, 需慎重(是否释放的资源级别较低, 且没什么重要的同步的关联项, 否则统一使用"releaseDynamicResByLevel")
     * @param path 
     * @param type 
     */
    releaseAsset(inst: cc.Asset): void {
        if (!cv.tools.isValidNode(inst)) return;

        let idx: number = 0;
        let res: DynamicRes = null;
        let uuid: string = this.getAssetUUID(inst);
        for (let i = 0; i < this._vDynamicResMap.length; ++i) {
            if (uuid === this._vDynamicResMap[i].uuid) {
                idx = i;
                res = this._vDynamicResMap[i];
                break;
            }
        }

        // 在动态资源里找到实例(按照资源管理流程清理)
        if (res) {
            // 若关联项存在"texture", 则不释放, 直接跳过, 交给"releaseDynamicResByLevel"统一清理
            if (res.inst instanceof cc.SpriteFrame || res.inst instanceof cc.SpriteAtlas) {
                console.warn(`${ResourceManager.g_class_name}-release hosting ==> path = ${res.path}, level = ${res.cleanLevel}`);
            }
            else {
                this._removeDynamicRes(res);
                this._vDynamicResMap.splice(idx, 1);
            }
        }
        // 不在当前资源管理范围内, 则按照引擎API清理
        else {
            if (inst instanceof cc.SpriteFrame || inst instanceof cc.SpriteAtlas) {
                cc.assetManager.releaseAsset(inst.getTexture());
            }
            cc.assetManager.releaseAsset(inst);
        }
    }

    /**
     * 统一按级别清理资源(目前只能在"TransitionScene"过渡场景中调用)
     * @param cleanLevel    指定级别
     * @param isContain     是否包含指定级别以下的资源(默认:true)
     */
    releaseDynamicResByLevel(cleanLevel: CleanResLevel, isContain: boolean = true): void {
        // 测试模式下, 打印释放前的资源列表
        if (cv.config.GET_DEBUG_MODE() === 1) {
            this._printReleaseDynamicRes(true);
        }

        for (let i = 0; i < this._vDynamicResMap.length; ++i) {
            let res: DynamicRes = this._vDynamicResMap[i];

            if (isContain) { if (res.cleanLevel > cleanLevel) continue; }
            else { if (res.cleanLevel !== cleanLevel) continue; }

            this._removeDynamicRes(res);
            this._vDynamicResMap.splice(i--, 1);
        }

        // 测试模式下, 打印释放前的资源列表
        if (cv.config.GET_DEBUG_MODE() === 1) {
            this._printReleaseDynamicRes(false);
        }
    }

    /**
     *  统一获指定路径的动态资源(之所以封装, 是因为"cc.resources.get"只能获取"resources"下资源, 远程资源不属于该接口)
     * @param path 
     * @param type 
     */
    get<T extends cc.Asset>(path: string, type: typeof cc.Asset): T {
        // 先检测"resources"
        let res: any = cc.resources.get(path, type);

        // 在检测"动态资源"表
        if (!res) {
            for (let i = 0; i < this._vDynamicResMap.length; ++i) {
                // 只能取远程资源, 全路径(因为没加类型, 可能存在同名不同型的资源)
                if (this._vDynamicResMap[i].path === path && this._vDynamicResMap[i].isRemote) {
                    res = this._vDynamicResMap[i].inst;
                    break;
                }
            }
        }

        //  确保下有效性
        if (!cv.tools.isValidNode(res)) { res = null; }

        return res;
    }

    // **********************************************************************************************************************
    // 开始加载基础资源

    /**
     * 加载基础配置文件, 基础资源文件(区分不同客户端的LOGO水印等)
     * @param callback 加载完成回调
     */
    loadBaseResource(callback: Function) {
        // 如果是app DEBUG_MODE  CLIENT_TYPE以client_environment为准。网页版则以配置文件为准。
        if (cc.sys.isNative) {
            let window_any: any = window;
            if (cc.isValid(window_any.client_environment, true)) {
                cv.config.SET_DEBUG_MODE(window_any.client_environment);
            }
            if (cc.isValid(window_any.client_type, true)) {
                cv.config.SET_CLIENT_TYPE(window_any.client_type);
            }
            if (cc.isValid(window_any.branch_type, true)) {
                console.log(window_any.branch_type);
                cv.config.SET_BRANCH_TYPE(window_any.branch_type);
            }
            this._loadLanguageRes(callback);
        }
        else {
            // 加载config.json文件
            let configJson = { path: "zh_CN/text/config", type: "json" };
            this._nLoadBaseResTotalCount++;
            this.load(configJson.path, cc.JsonAsset, (resource: any): void => {
                this._nLoadBaseResCompletedCount++;
                let configJsonStr = resource.json["string"];
                // 如果是app DEBUG_MODE以client_environment为准。网页版则以配置文件为准。
                cv.config.SET_DEBUG_MODE(cv.Number(configJsonStr["DEBUG_MODE"]["-value"]));
                cv.config.SET_CLIENT_TYPE(cv.Number(configJsonStr["CLIENT_TYPE"]["-value"]));
                cv.config.SET_BRANCH_TYPE(configJsonStr["BRANCH_TYPE"]["-value"]);
                cv.config.setMTT();
                this._loadLanguageRes(callback);
            }, CleanResLevel.LEVEL_BASE);
        }

        // 加载version.json文件
        let versionJson = { path: "zh_CN/text/version", type: "json" };
        this._nLoadBaseResTotalCount++;
        this.load(versionJson.path, cc.JsonAsset, (resource: any): void => {
            let serverJson = resource.json["string"];
            cv.config.SET_CLIENT_VERSION(serverJson["CLIENT_VERSION"]["-value"]);
            this._nLoadBaseResCompletedCount++;
            if (this._nLoadBaseResCompletedCount >= this._nLoadBaseResTotalCount && callback) callback();
        }, CleanResLevel.LEVEL_BASE);

        // 加载基础预制件
        do {
            let func: () => void = (): void => {
                if (++this._nLoadBaseResCompletedCount >= this._nLoadBaseResTotalCount && callback) callback();
            }

            // TT
            if (cv.TT) {
                ++this._nLoadBaseResTotalCount;
                cv.TT.preloadRes(func);
            }

            // TP
            if (cv.TP) {
                ++this._nLoadBaseResTotalCount;
                cv.TP.preloadRes(func);
            }

            // Shop
            if (cv.SHOP) {
                ++this._nLoadBaseResTotalCount;
                cv.SHOP.preloadRes(func);
            }

            // pushNotice
            if (cv.pushNotice) {
                ++this._nLoadBaseResTotalCount;
                cv.pushNotice.preloadRes(func);
            }

            // StatusView
            if (cv.StatusView) {
                ++this._nLoadBaseResTotalCount;
                cv.StatusView.preloadRes(func);
            }

            // LoadingView
            if (cv.LoadingView) {
                ++this._nLoadBaseResTotalCount;
                cv.LoadingView.preloadRes(func);
            }

            // LoadingCommonView
            if (cv.LoadingCommonView) {
                ++this._nLoadBaseResTotalCount;
                cv.LoadingCommonView.preloadRes(func);
            }

            // SwitchLoadingView
            if (cv.SwitchLoadingView) {
                ++this._nLoadBaseResTotalCount;
                cv.SwitchLoadingView.preloadRes(func);
            }

            // KYCLoadingView
            if (cv.KYCLoadingView) {
                ++this._nLoadBaseResTotalCount;
                cv.KYCLoadingView.preloadRes(func);
            }

            // LogTools
            if (cv.LogTools) {
                ++this._nLoadBaseResTotalCount;
                cv.LogTools.preloadRes(func);
            }
        } while (false);
    }

    /**
     * 加载，语言文件和相关资源文件
     */
    private _loadLanguageRes(callback: Function) {
        if (cv.config.GET_DEBUG_MODE() == 0) {
            cv.dataHandler.setServerId(cv.Enum.ServerButtonType.ServerButtonType_zhenshifu);
        } else if (cv.config.GET_DEBUG_MODE() == 1) {
            cv.dataHandler.setServerId(cv.Enum.ServerButtonType.ServerButtonType_ceshifu);
        }

        //设置语言
        cv.config.setSystemLanguage();

        //加载完config文件再去加载，语言文件和资源文件（下面两个需要用用到config文件字段）
        this._loadString(callback);
        this._loadClientTypeRes(callback, CleanResLevel.LEVEL_BASE);
    }

    /**
     * 根据当前客户端类型，加载相应默认语言
     */
    private _loadString(callback: any) {
        let stirngPath = "";
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            stirngPath = "zh_CN/text/stringCH";
        } else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
            stirngPath = "zh_CN/text/stringYN";
        } else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.th_PH) {
            stirngPath = "zh_CN/text/stringTH";
        } else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.ar_SA) {
            stirngPath = "zh_CN/text/stringAB";
        } else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.hi_IN) {
            stirngPath = "zh_CN/text/stringHD";
        }
        else {
            stirngPath = "zh_CN/text/stringEN";
        }

        // 加载text/stringCH.json文件
        let zhJson = { path: stirngPath, type: "json" };
        this._nLoadBaseResTotalCount++;
        this.load(zhJson.path, cc.JsonAsset, (resource: any): void => {
            cv.languageJsonMap.add(cv.config.getCurrentLanguage(), resource.json["string"]);
            this._nLoadBaseResCompletedCount++;
            if (this._nLoadBaseResCompletedCount >= this._nLoadBaseResTotalCount && callback) callback();
        }, CleanResLevel.LEVEL_BASE);
    }

    /**
     * 根据当前客户端类型，加载相应客户端LOGO资源
     */
    private _loadClientTypeRes(callback: Function, cleanLevel: CleanResLevel) {
        //加载不同客户端logo资源
        let clientTypeRes: any[] = cv.resConfig.getClientTypeRes();
        this._nLoadBaseResTotalCount += clientTypeRes.length;

        for (let i = 0; i < clientTypeRes.length; ++i) {
            this.loadDir(clientTypeRes[i].path, clientTypeRes[i].type, (): void => {
                this._nLoadBaseResCompletedCount++;
                if (this._nLoadBaseResCompletedCount >= this._nLoadBaseResTotalCount && callback) callback();
            }, cleanLevel);
        }
    }

    /**
     * 加载总资源
     */
    loadDataFile(callback: Function): void {
        // 设置加载资源回调函数
        this._loadCallBack = callback;
        // 加载pb
        this._progressloadProtobuf();
        // 加载默认头像
        this._progressloadBaseHeadRes();

        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
            // 加载牛仔所需资源
            this._progressloadDirArray(cv.resConfig.getCowboyRes(), CleanResLevel.LEVEL_BASE);
        }
        else {
            this._progressloadDirArray(cv.resConfig.getCommonRes(), CleanResLevel.LEVEL_BASE);
            this._preloadSceneWidthRes(cv.Enum.SCENE.HALL_SCENE);

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) { //私语在loading界面，先加载牛仔资源
                this._progressloadDirArray(cv.resConfig.getCowboyOnlyRes(), CleanResLevel.LEVEL_BASE);
            }
        }
    }

    /**
     * 加载默认头像
     */
    private _progressloadBaseHeadRes(): void {
        let res: string[] = [
            "zh_CN/common/icon/Head_01",
            "zh_CN/common/icon/club",
            "zh_CN/game/cowboy/head/head_1"];

        for (let i = 0; i < res.length; ++i) {
            ++this._nLoadTotalCount;
            let path: string = res[i];
            this.load(path, cc.SpriteFrame, (frame: cc.SpriteFrame): void => {
                this._updateLoadCompletedCount(path, cc.SpriteFrame.name);
            }, CleanResLevel.LEVEL_BASE);
        }
    }

    /**
     * 预加载场景  此处是把场景当作资源来提前加载
     * @param name 场景名称
     */
    private _preloadSceneWidthRes(name: string) {
        // return;
        ++this._nLoadTotalCount;

        cc.director.preloadScene(name, (completedCount: number, totalCount: number, item: any): void => {
            // console.log(cv.StringTools.formatC("preloadScene - progress -\"%s\, %06d, %06d", sceneName, completedCount, totalCount));
        }, (error: Error): void => {
            console.log(`preloadScene - [${name}] - complete!"`);
            if (error) {
                console.error(`${ResourceManager.g_class_name} - _preloadSceneWidthRes error: ${error.message || error}, name=${name}`);
                return;
            }
            else {
                this._updateLoadCompletedCount(name, "scene");
            }
        })
    }

    /**
     * 加载pb
     */
    private _progressloadProtobuf(): void {
        // 设置 pb 字段保持原样输出
        pb.parse.defaults.keepCase = true;

        // 外部重写 protobuf.util.fetch 加载函数, 采用 creator API
        pb.util.fetch = (path, callback): void => {
            cc.resources.load(path, (err: Error, source: any): void => {
                if (err) {
                    console.log(err.message || err);
                    return;
                }
                if (callback) callback(err, source.text);
            });
        }

        // 加载pb协议文件
        let vPBInfo = cv.resConfig.getPBInfo();
        for (let i = 0; i < vPBInfo.length; ++i) {
            ++this._nLoadTotalCount;
            pb.load(vPBInfo[i].path, (error: Error, source: any): void => {
                if (error) {
                    console.error(`${ResourceManager.g_class_name} - _progressloadProtobuf error: ${error.message || error}, path=${vPBInfo[i].path}`);
                    return;
                }
                switch (vPBInfo[i].type) {
                    case "worldPB": cv.worldPB = source; break;
                    case "gamePB": cv.gamePB = source; break;
                    case "cowboy": cv.cowboyPB = source; break;
                    case "video_cowboy": cv.videoCowboyPB = source; break;
                    case "humanboy": cv.humanboyPB = source; break;
                    case "aof": cv.aofPB = source; break;
                    case "gate": cv.gatePB = source; break;
                    case "data": cv.dataPB = source; break;
                    case "pokermaster": cv.pokerMasterPB = source; break;
                    case "jackfruit": cv.jackfruitPB = source; break;
                    default: break;
                }
                this._updateLoadCompletedCount(vPBInfo[i].path, vPBInfo[i].type);
            })
        }
        this._progressloadJson();
    }

    /**
     * 加载text文件夹内的json文件
     */
    private _progressloadJson() {
        if (cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
            // 加载text/sensitivewords.txt文件
            let sensitivewords = { path: "zh_CN/text/sensitivewords", type: "txt" };
            ++this._nLoadTotalCount;
            this.load(sensitivewords.path, cc.TextAsset, (resource: cc.TextAsset): void => {
                // 过滤 \r\n 换行符 统一转换成 \n(统一换行格式)
                let str: string = resource.text;
                str = str.replace(/(\r\n)/ig, "\n");
                this._vSensitivewords = str.split("\n");

                this._updateLoadCompletedCount(sensitivewords.path, sensitivewords.type);
            }, CleanResLevel.LEVEL_BASE);
        }

        // 加载text/stringCH.json文件
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN) {
            let zhJson = { path: "zh_CN/text/stringCH", type: "json" };
            ++this._nLoadTotalCount;
            this.load(zhJson.path, cc.JsonAsset, (resource: cc.JsonAsset): void => {
                cv.languageJsonMap.add(cv.Enum.LANGUAGE_TYPE.zh_CN, resource.json["string"]);
                this._updateLoadCompletedCount(zhJson.path, zhJson.type);
            }, CleanResLevel.LEVEL_BASE);
        }

        // 加载text/stringEN.json文件
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.en_US) {
            let enJson = { path: "zh_CN/text/stringEN", type: "json" };
            ++this._nLoadTotalCount;
            this.load(enJson.path, cc.JsonAsset, (resource: cc.JsonAsset): void => {
                cv.languageJsonMap.add(cv.Enum.LANGUAGE_TYPE.en_US, resource.json["string"]);
                this._updateLoadCompletedCount(enJson.path, enJson.type);
            }, CleanResLevel.LEVEL_BASE);
        }

        // 加载text/stringYN.json文件
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.yn_TH) {
            let ynJson = { path: "zh_CN/text/stringYN", type: "json" };
            ++this._nLoadTotalCount;
            this.load(ynJson.path, cc.JsonAsset, (resource: cc.JsonAsset): void => {
                cv.languageJsonMap.add(cv.Enum.LANGUAGE_TYPE.yn_TH, resource.json["string"]);
                this._updateLoadCompletedCount(ynJson.path, ynJson.type);
            }, CleanResLevel.LEVEL_BASE);
        }

        // 加载text/stringYN.json文件
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.th_PH) {
            let ynJson = { path: "zh_CN/text/stringTH", type: "json" };
            ++this._nLoadTotalCount;
            this.load(ynJson.path, cc.JsonAsset, (resource: cc.JsonAsset): void => {
                cv.languageJsonMap.add(cv.Enum.LANGUAGE_TYPE.th_PH, resource.json["string"]);
                this._updateLoadCompletedCount(ynJson.path, ynJson.type);
            }, CleanResLevel.LEVEL_BASE);
        }

        // 加载text/stringHD.json文件
        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.hi_IN) {
            let ynJson = { path: "zh_CN/text/stringHD", type: "json" };
            ++this._nLoadTotalCount;
            this.load(ynJson.path, cc.JsonAsset, (resource: cc.JsonAsset): void => {
                cv.languageJsonMap.add(cv.Enum.LANGUAGE_TYPE.hi_IN, resource.json["string"]);
                this._updateLoadCompletedCount(ynJson.path, ynJson.type);
            }, CleanResLevel.LEVEL_BASE);
        }
    }

    /**
     * 加载文件夹数组
     */
    private _progressloadDirArray(arr: any[], cleanLevel: CleanResLevel): void {
        let len = cv.StringTools.getArrayLength(arr);
        for (let i = 0; i < len; ++i) {
            ++this._nLoadTotalCount;
            this.loadDir(arr[i].path, arr[i].type, (): void => {
                this._updateLoadCompletedCount(arr[i].path, arr[i].type.name);
            }, cleanLevel);
        }
    }

    /**
     * 更新加载进度
     */
    private _updateLoadCompletedCount(path: string, type: string): void {
        ++this._nLoadCompletedCount;
        if (this._loadCallBack) {
            this._loadCallBack(this._nLoadCompletedCount, this._nLoadTotalCount, path, type);
        }
        else {
            console.error(`${ResourceManager.g_class_name} - _updateLoadCompletedCount error: No load callback function was set`);
        }
    }

    // **********************************************************************************************************************
    // 释放远程头像资源(等不到切场景自动释放了, 就想及时的处理旁观和座位之外的残余头像资源)

    /**
     * 添加远程加载的头像纹理标记
     */
    addRemoteHeadRes(str: string, res: cc.Texture2D) {
        this._vRemoteHeadResMap.add(str, res);
    }

    /**
     * 添加远程头像信息标记(入座或旁观时添加引用标记)
     * @param infos 支持单个/数组
     * @param isOB  是否是旁观数据
     */
    addRemoteHeadInfo(infos: headInfo | headInfo[], isOB: boolean): void {
        // 如果传入的是旁观数据, 则清理表中之前的旁观数据, 保证表中只保留一份最新的旁观数据
        if (isOB) {
            for (let i = 0; i < this._vRemoteHeadInfo.length; ++i) {
                if (this._vRemoteHeadInfo[i].isOB) {
                    this._vRemoteHeadInfo.splice(i--, 1);
                }
            }
        }

        // 清理后继续添加数据
        let _add: (t: headInfo, ob: boolean) => void = (t: headInfo, ob: boolean): void => {
            let isAdded: boolean = false;
            for (let i = 0; i < this._vRemoteHeadInfo.length; ++i) {
                if (this._vRemoteHeadInfo[i].url === t.url && this._vRemoteHeadInfo[i].isOB === ob) {
                    isAdded = true;
                    break;
                }
            }
            if (!isAdded) {
                this._vRemoteHeadInfo.push(t);
            }
        }

        if (Array.isArray(infos)) {
            for (let i = 0; i < infos.length; ++i) {
                _add(infos[i], isOB);
            }
        }
        else {
            _add(infos, isOB);
        }
    }

    /**
     * 删除远程头像信息标记(玩家站起时去除引用标记)
     * @param infos 支持单个/数组
     * @param isOB  是否是旁观数据
     */
    removeRemoteHeadInfo(urls: string | string[], isOB: boolean): void {
        let _remove: (t: string, ob: boolean) => void = (t: string, ob: boolean): void => {
            for (let i = 0; i < this._vRemoteHeadInfo.length; ++i) {
                if (this._vRemoteHeadInfo[i].url === t && this._vRemoteHeadInfo[i].isOB === ob) {
                    this._vRemoteHeadInfo.splice(i, 1);
                    break;
                }
            }
        }

        if (Array.isArray(urls)) {
            for (let i = 0; i < urls.length; ++i) {
                _remove(urls[i], isOB);
            }
        }
        else {
            _remove(urls, isOB);
        }
    }

    /**
     * 释放远程头像资源
     */
    releaseRemoteHeadsRes(): void {
        // 过滤(移除正在显示的入座或旁观玩家)
        for (let i = 0; i < this._vRemoteHeadInfo.length; ++i) {
            let url: string = this._vRemoteHeadInfo[i].url;
            let plat: number = this._vRemoteHeadInfo[i].plat;
            let key: string = cv.dataHandler.getUserData().getImageUrlByPlat(url, plat);
            this._vRemoteHeadResMap.remove(key);
        }

        // 剩余map中都是可以清除的头像资源
        this._vRemoteHeadResMap.forEach((url: string, inst: cc.Texture2D, i?: number): void => {
            this.releaseAsset(inst);
        });

        // 资源清理完则清理标记数组
        this._vRemoteHeadResMap.clear();
    }

    // **********************************************************************************************************************
    // 其他工具接口

    /**
     * 下载图片资源(与"cv.resMrg.loadRemote"接口的区别是, 该下载接口有检测"get"缓存, 然后再去下载, 因为基础"load"相关接口是不检测的)
     * @param url           图片远程地址
     * @param cleanLevel    资源清理级别(默认最低级别, 随着场景清理而清理)
     * @param imgNode       下载图片的节点(可缺省)
     * @param callback      下载完成回调(可缺省)
     */
    downloadImg(url: string, imgNode?: cc.Node, callback?: Function, cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE) {
        let img: cc.Texture2D = this.get(url, cc.Texture2D);
        if (img) {
            if (imgNode) imgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(img);
            if (callback) callback();
        }
        else {
            this.loadRemote(url, (err: Error, asset: cc.Texture2D): void => {
                if (err) {
                    console.error(`${ResourceManager.g_class_name} - downloadImg error: ${err.message || err}, url=${url}`);
                    return;
                }

                if (imgNode) imgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(asset);
                if (callback) callback();
            }, cleanLevel);
        }
    }

    /**
     * 异步加载预制件
     */
    loadPrefab(fileName: string, callback: (assets: cc.Prefab) => void, cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE): void {
        this.load(fileName, cc.Prefab, callback, cleanLevel);
    }

    /**
     * 获取本地已加载的字体
     */
    getLocalFontByName(fileName: string, printLog: boolean = true): cc.Font {
        let font: cc.Font = this.get(fileName, cc.Font);
        if (!font && printLog) console.error(`${ResourceManager.g_class_name} - getLocalFontByName error: the local font [${fileName}] doesn't found`);
        return font;
    }

    /**
     * 获取异步加载的字体(优先搜索本地资源)
     */
    getAsyncFontByName(fileName: string, callback: (assets: cc.Font) => void, cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE): void {
        let f: cc.Font = this.getLocalFontByName(fileName, false);
        if (f) {
            callback(f);
        }
        else {
            this.load(fileName, cc.Font, callback, cleanLevel);
        }
    }

    /**
     * 同步获取精灵图集(必须预加载该图集, 否则获取为空)
     * @param atlasPath 
     */
    getSpriteAtlas(atlasPath: string): Readonly<cc.SpriteAtlas> {
        let atlas: cc.SpriteAtlas = this.get(atlasPath, cc.SpriteAtlas);
        return atlas;
    }

    /**
     * 异步获取精灵图集(只针对"resources"路径下有效, 且兼容同步加载)
     * @param atlasPath     路径
     * @param callback      回调
     * @param cleanLevel    清理级别(默认随场景释放而释放)
     */
    getSpriteAtlasAsync(atlasPath: string, callback: (assets: cc.SpriteAtlas) => void, cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE): void {
        let atlas: cc.SpriteAtlas = this.getSpriteAtlas(atlasPath);
        if (atlas) {
            if (callback) callback(atlas);
        }
        else {
            this.load(atlasPath, cc.SpriteAtlas, callback, cleanLevel);
        }
    }

    /**
     * 同步获取指定图集中的精灵帧(图集来源与"getSpriteAtlas"方法一样)
     * @param atlasPath 图集相对路径
     * @param frameName 图块名(无需添加文件名后缀)
     */
    getSpriteAtlasFrame(atlasPath: string, frameName: string): cc.SpriteFrame {
        let frame: cc.SpriteFrame = null;
        let atlas: cc.SpriteAtlas = this.getSpriteAtlas(atlasPath);
        if (atlas) frame = atlas.getSpriteFrame(frameName);

        return frame;
    }

    /** 异步获取精灵纹理帧(优先同步获取)
     * @param path 
     * @param callback 
     * @param cleanLevel 
     */
    getSpriteFrameAsync(path: string, callback: (assets: cc.SpriteFrame) => void, cleanLevel: CleanResLevel = CleanResLevel.LEVEL_SCENE): void {
        let frame: cc.SpriteFrame = cc.resources.get(path, cc.SpriteFrame);
        if (frame) {
            callback(frame);
        }
        else {
            this.load(path, cc.SpriteFrame, callback, cleanLevel);
        }
    }

    /**
     * 设置精灵纹理帧(先从资源缓存搜索, 若未找到则动态加载)
     * @brief 因为该函数是基于场景调用的, 所以该接口无需传入场景名参数
     * @param node      对应"Sprite"节点
     * @param path      资源相对路径("resources"下相对路径且不包含后缀名, 如"dir/fileName")
     * @param callback  加载完毕生效时的回调函数(参数可选)
     * @param type      渲染类型(参数可选, 默认为"cc.Sprite")
     */
    setSpriteFrame(node: cc.Node, path: string, callback?: (frame: cc.SpriteFrame) => void, type?: typeof cc.RenderComponent): void {
        if (!(node instanceof cc.Node) || !cc.isValid(node, true)) return;
        if (!type || typeof type === "undefined") type = cc.Sprite;

        let sprite: any = node.getComponent(type);
        if (!sprite) return;

        // 设置纹理
        this.getSpriteFrameAsync(path, (frame: cc.SpriteFrame): void => {
            // 因为是异步, 有些情况下回调回来时, sprite 节点已被销毁, 这里检测下有效性
            if (!cv.tools.isValidNode(sprite)) return;

            // 保留原有若干属性
            if (cv.tools.isValidNode(sprite.spriteFrame)) {
                frame.insetLeft = sprite.spriteFrame.insetLeft;
                frame.insetTop = sprite.spriteFrame.insetTop;
                frame.insetRight = sprite.spriteFrame.insetRight;
                frame.insetBottom = sprite.spriteFrame.insetBottom;
            }

            // 赋值, 回调
            sprite.spriteFrame = frame;
            if (callback) callback(frame);
        });
    }

    /**
     * 设置按钮frame,不需要设置的资源可以置null或不传参
     * @param node 按钮节点
     * @param normalPath    normal状态资源相对路径
     * @param pressedPath   pressed状态资源相对路径
     * @param HoverPath     Hover状态资源相对路径
     * @param disabledPath  disabled状态资源相对路径
     */
    setButtonFrame(node: cc.Node, normalPath: string, pressedPath?: string, hoverPath?: string, disabledPath?: string) {
        let btn = node.getComponent(cc.Button);
        if (!btn) {
            console.error(`${ResourceManager.g_class_name} - setButtonFrame error: 按钮为空!`);
            return;
        }

        if (normalPath && !pressedPath && !hoverPath && !disabledPath) {
            pressedPath = normalPath;
            hoverPath = normalPath;
            disabledPath = normalPath;
        }

        this.getSpriteFrameAsync(normalPath, (frame: cc.SpriteFrame) => {
            if (btn.normalSprite) {
                frame.insetLeft = btn.normalSprite.insetLeft;
                frame.insetTop = btn.normalSprite.insetTop;
                frame.insetRight = btn.normalSprite.insetRight;
                frame.insetBottom = btn.normalSprite.insetBottom;
            }
            btn.normalSprite = frame;
        });

        this.getSpriteFrameAsync(pressedPath, (frame: cc.SpriteFrame) => {
            if (btn.pressedSprite) {
                frame.insetLeft = btn.pressedSprite.insetLeft;
                frame.insetTop = btn.pressedSprite.insetTop;
                frame.insetRight = btn.pressedSprite.insetRight;
                frame.insetBottom = btn.pressedSprite.insetBottom;
            }
            btn.pressedSprite = frame;
        });

        this.getSpriteFrameAsync(hoverPath, (frame: cc.SpriteFrame) => {
            if (btn.hoverSprite) {
                frame.insetLeft = btn.hoverSprite.insetLeft;
                frame.insetTop = btn.hoverSprite.insetTop;
                frame.insetRight = btn.hoverSprite.insetRight;
                frame.insetBottom = btn.hoverSprite.insetBottom;
            }
            btn.hoverSprite = frame;
        });

        this.getSpriteFrameAsync(disabledPath, (frame: cc.SpriteFrame) => {
            if (btn.disabledSprite) {
                frame.insetLeft = btn.disabledSprite.insetLeft;
                frame.insetTop = btn.disabledSprite.insetTop;
                frame.insetRight = btn.disabledSprite.insetRight;
                frame.insetBottom = btn.disabledSprite.insetBottom;
            }
            btn.disabledSprite = frame;
        });
    }

    /**
     * 适配 widget(当前帧立即生效)
     * @param node          要适配的节点
     * @param bTransChild   是否遍历适配子节点(默认 false)
     */
    adaptWidget(node: cc.Node, bTransChild?: boolean): void {
        if (!node) return;

        let widget: cc.Widget = node.getComponent(cc.Widget);
        if (widget && cc.isValid(widget, true)) {
            widget.enabled = true;
            widget.updateAlignment();
            widget.enabled = false;
        }

        if (bTransChild) {
            for (let i = 0; i < node.children.length; ++i) {
                this.adaptWidget(node.children[i], bTransChild);
            }
        }
    }

    /**
     * 立即获取改变 string 后的 label 控件的大小(此方法略微消耗性能)
     * @param lab 要获取大小的 label控件
     * @param txt 改变后的string(可选，若缺省, 则返回原大小)
     */
    getLabelStringSize(lab: cc.Label, txt?: string): cc.Size {
        let size: cc.Size = cc.Size.ZERO;
        if (lab) {
            if (txt) lab.string = txt;
            let _lab: any = lab;
            _lab._forceUpdateRenderData();
            size = lab.node.getContentSize();
        }
        return size;
    }

    /**
     * 立即获取改变 string 后的 RichText 控件的大小(此方法略微消耗性能)
     * @param richText 要获取大小的 RichText控件
     * @param txt 改变后的string(可选，若缺省, 则返回原大小)
     */
    getRichTextStringSize(richText: cc.RichText, txt?: string): cc.Size {
        let size: cc.Size = cc.Size.ZERO;
        if (richText) {
            if (txt) richText.string = txt;
            let _richText: any = richText;
            _richText.node._activeInHierarchy = true;
            _richText._updateRichTextStatus();
            size = _richText.node.getContentSize();
        }
        return size;
    }

    /**
     * 创建指定精灵
     * @param parentNode 
     * @param url 
     */
    createSprite(parentNode: cc.Node, url?: string): cc.Node {
        let node = new cc.Node();
        node.addComponent(cc.Sprite);
        node.setContentSize(10, 10);
        if (parentNode) {
            parentNode.addChild(node);
        }
        if (!url) {
            url = "zh_CN/common/icon/Head_01";
        }
        this.setSpriteFrame(node, url);

        return node;
    }

    loadSpriteTextureByPlist(plist: cc.SpriteAtlas, node: cc.Sprite, name: string) {
        node.spriteFrame = plist.getSpriteFrame(name);
    }

    loadButtonTextureByPlist(plist: cc.SpriteAtlas, node: cc.Node, normalPath: string, pressedPath?: string, HoverPath?: string, disabledPath?: string) {

        if (!node || !node.getComponent(cc.Button)) {
            console.log("按钮为空！");
            return;
        }
        let btn = node.getComponent(cc.Button);
        if (cv.StringTools.getArrayLength(normalPath) > 0) {
            btn.normalSprite = plist.getSpriteFrame(normalPath);
        }
        if (cv.StringTools.getArrayLength(pressedPath) > 0) {
            btn.pressedSprite = plist.getSpriteFrame(pressedPath);
        }
        if (cv.StringTools.getArrayLength(HoverPath) > 0) {
            btn.hoverSprite = plist.getSpriteFrame(HoverPath);
        }
        if (cv.StringTools.getArrayLength(disabledPath) > 0) {
            btn.disabledSprite = plist.getSpriteFrame(disabledPath);
        }
    }

    /**
     * 获取敏感词组引用
     */
    getSensitiveWords(): string[] {
        return this._vSensitivewords;
    }

    /**
     * 创建指定label
     * @param parentNode 
     * @param content 
     * @param fontSize 
     * @param font 
     */
    createLabel(parentNode: cc.Node, content: string, fontSize: number, font?: cc.Font): cc.Node {
        let node = new cc.Node();
        node.addComponent(cc.Label);
        if (parentNode) {
            parentNode.addChild(node);
        }

        node.getComponent(cc.Label).string = content;
        node.getComponent(cc.Label).fontSize = fontSize;

        if (font) {
            node.getComponent(cc.Label).font = font;
        }

        return node;
    }
}
