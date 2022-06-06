import cv from "../lobby/cv";

/**
 * 过渡场景类
 * 流程是: 切至过渡场景 -> 激活 -> 下一帧释放标记的资源 && GC -> 预加载场景资源 -> 加载切换至目标场景
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class TransitionScene extends cc.Component {

    protected onLoad(): void {
        cv.config.adaptScreen(this.node);
        cv.SwitchLoadingView.reset();

        console.log(`TransitionScene - onLoad`);
    }

    protected start(): void {
        console.log(`TransitionScene - start`);

        // 延时时间
        let delayTime: number = 0;

        // 检测下loading显隐状态(之前可能因为防止旋转形变的逻辑被隐藏)
        if (!cv.SwitchLoadingView.isShowAnim()) {
            delayTime += 0.2;
            cv.SwitchLoadingView.showDelay(delayTime);
        }

        // 释放全局被标记的资源
        console.time(`TransitionScene - clean res`);
        cv.resMgr.releaseDynamicResByLevel(cv.resConfig.transSceneInfo.cleaResLevel);
        console.timeEnd(`TransitionScene - clean res`);

        // 延时至下一帧GC
        delayTime += 0;
        this.scheduleOnce((): void => {
            console.time(`TransitionScene - GC 1`);
            cc.sys.garbageCollect();
            console.timeEnd(`TransitionScene - GC 1`);
        }, delayTime);

        // 再次延时0.1s GC切换至目标场景
        delayTime += 0.1;
        this.scheduleOnce((): void => {
            console.time(`TransitionScene - GC 2`);
            cc.sys.garbageCollect();
            console.timeEnd(`TransitionScene - GC 2`);
            this._switchToTargetScene();
        }, delayTime);
    }

    protected onDestroy(): void {
        console.log(`TransitionScene - onDestroy`);
    }

    /**
     * 开始切换
     */
    private _switchToTargetScene(): void {
        let tarSceneName: string = cv.resConfig.transSceneInfo.tarSceneName;
        let isPreLoadRes: boolean = cv.resConfig.transSceneInfo.isPreLoadRes;

        if (isPreLoadRes) {
            this._preloadSceneResource(tarSceneName, this._preLoadScene);
        }
        else {
            this._preLoadScene();
        }
    }

    /**
     * 预加载对应场景资源(例如该场景需要动态加载的图集, 动画, 音频, 字体等异步延时较高的资源)
     * @param sceneName 
     * @param callback 
     * @returns 
     */
    private _preloadSceneResource(sceneName: string, callback: () => void): void {
        console.time(`TransitionScene - preload scene[${sceneName}] res`);

        let loadTotalCount: number = 0;
        let loadCompletedCount: number = 0;
        let proFunc: (count: number) => void = (count: number): void => {
            if (count >= loadTotalCount) {
                console.timeEnd(`TransitionScene - preload scene[${sceneName}] res`);
                if (callback) callback();
            }
        };

        if (sceneName === cv.Enum.SCENE.GAME_SCENE) {
            let index = cv.tools.GetTableBack(cv.roomManager.getCurrentGameID() == cv.Enum.GameId.StarSeat);
            let bgName = index.toString();
            let path = "";
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.StarSeat) {
                //如果当前是明星桌，明星桌在最前面插入了一张新的默认背景，为了保持与普通桌索引一致，此图片index为-1
                if (index == -1) {
                    bgName = "star";
                }
                if (cv.config.IS_WIDESCREEN) {
                    path = 'zh_CN/game/dzpoker/starBg/bg_' + bgName + "_ipad";
                } else {
                    path = 'zh_CN/game/dzpoker/starBg/bg_' + bgName;
                }
            }
            else {
                if (cv.config.IS_WIDESCREEN && index < 6) {
                    path = 'zh_CN/game/dzpoker/gameBgIpad/bg_' + bgName;
                } else {
                    path = 'zh_CN/game/dzpoker/gameBg/bg_' + bgName;
                }
            }

            loadTotalCount += 1;
            cv.resMgr.load(path, cc.SpriteFrame, (frame: cc.SpriteFrame): void => {
                proFunc(++loadCompletedCount);
            }, cv.resMgr.CleanResLevel.LEVEL_SCENE);

            // 加入礼物图集
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.StarSeat) {
                loadTotalCount += 1;
                cv.resMgr.getSpriteAtlasAsync("zh_CN/game/dzpoker/gift/gift_plist", (param: cc.SpriteAtlas): void => {
                    proFunc(++loadCompletedCount);
                });
            }
        }

        // 获取场景需要动态加载的资源信息
        let vAschRes: any[] = cv.resConfig.getSceneRes(sceneName);

        // 有资源则加载
        if (vAschRes.length > 0) {
            loadTotalCount += vAschRes.length;
            for (let i = 0; i < vAschRes.length; ++i) {
                switch (vAschRes[i].type) {
                    // 散图/音效(以文件夹为单位加载)
                    case cc.SpriteFrame:
                    case cc.Texture2D:
                    case cc.AudioClip: {
                        cv.resMgr.loadDir(vAschRes[i].path, vAschRes[i].type, (): void => {
                            proFunc(++loadCompletedCount);
                        }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
                    } break;

                    // 图集(单独 case 出来, 因为要做 hash 标记, 一份实例可通用)
                    case cc.SpriteAtlas: {
                        cv.resMgr.getSpriteAtlasAsync(vAschRes[i].path, (param: cc.SpriteAtlas): void => {
                            proFunc(++loadCompletedCount);
                        });
                    } break;

                    // 其他(单个||数组)资源
                    default: {
                        cv.resMgr.load(vAschRes[i].path, vAschRes[i].type, (): void => {
                            proFunc(++loadCompletedCount);
                        }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
                    } break;
                }
            }
        }
        // 无资源则回调
        else {
            proFunc(0);
        }
    }

    private _preLoadScene(): void {
        let tarSceneName: string = cv.resConfig.transSceneInfo.tarSceneName;

        if (cc.sys.isNative) {
            console.log(`TransitionScene - native preload scene[${tarSceneName}]`);
            cc.director.preloadScene(tarSceneName, (completedCount: number, totalCount: number, item: any): void => {
                // console.log(`TransitionScene - preload scene[${tarSceneName}]: ${totalCount} / ${completedCount}`);
            }, (error: Error): void => {
                if (error) {
                    console.error(error.message || error);
                    return;
                }
                else {
                    cv.action.loadTransTargetScene();
                }
            });
        }
        else {
            console.log(`TransitionScene - not native preload scene[${tarSceneName}]`);
            cv.action.loadTransTargetScene();
        }
    }
}
