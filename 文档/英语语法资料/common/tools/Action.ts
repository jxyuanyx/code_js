import cv from "../../components/lobby/cv"
import { HashMap } from "./HashMap";
import { CircleSprite } from "./CircleSprite";
import { ActivityType } from "../../data/activityData";
import TicketView from "../../components/lobby/hall/TicketView";
import { CleanResLevel } from "./ResourceManager";

/**
 * 移动动作方位
 */
enum eMoveActionDiretion {
    /**
     * 无
     */
    EMAD_NONE = 0,

    /**
     * 向左
     */
    EMAD_TO_LEFT,

    /**
     * 向右
     */
    EMAD_TO_RIGHT,
}

/**
 * 移动动作类型
 */
enum eMoveActionTypes {
    /**
     * 无
     */
    EMAT_NONE = 0,

    /**
     * 淡入
     */
    EMAT_FADE_IN,

    /**
     * 淡出
     */
    EMAT_FADE_OUT,
}

export class Action {
    private static g_instance: Action = null;
    private _vActViewDeque: cc.Node[] = [];             // 切入视图队列(暂时只针对"showAction"和"addChildToSceneOnce"有效, 只保留当前场景的视图队列)

    static getInstance(): Action {
        if (!Action.g_instance) {
            Action.g_instance = new Action();
        }
        return Action.g_instance;
    }

    eMoveActionDir = eMoveActionDiretion;
    eMoveActionType = eMoveActionTypes;
    WIDTH: number = 0;
    HEIGHT: number = 0;
    acNodeMap: HashMap<cc.Node, number> = new HashMap();

    moveToArg = {
        "TO_LEFT": {
            "ENTER": {
                isShow: true,
                startPos: cc.v2(this.WIDTH, 0),
                endPos: cc.v2(0, 0),
            },
            "OUT": {
                isShow: false,
                startPos: cc.v2(0, 0),
                endPos: cc.v2(-this.WIDTH, 0),
            }
        },
        "TO_RIGHT": {
            "ENTER": {
                isShow: true,
                startPos: cc.v2(-this.WIDTH, 0),
                endPos: cc.v2(0, 0),
            },
            "OUT": {
                isShow: false,
                startPos: cc.v2(0, 0),
                endPos: cc.v2(this.WIDTH, 0),
            }
        }
    }

    delay_type = {
        "FAST": 0.1,
        "NORMAL": 0.2,
        "SLOW": 0.3,
    }

    getDelay(type: string): number {
        let delay = this.delay_type[type];
        if (typeof delay === "undefined") {
            delay = this.delay_type.SLOW;
        }
        return delay;
    }

    /*
    @param node      动作节点
    @param isToLeft    动作方向，向左:TO_LEFT,向右：TO_RIGHT
    @param isEnter     动作方向，进入界面:ENTER,退出界面：OUT
    
    @param type      动作时间类型，"FAST":快，"NORMAL":正常，"SLOW":慢
    @param startPos    动作起始点
    @param endPos    动作终点 
    @param shadeColor 遮罩颜色，"ENTER"的时候有效，默认透明
    */
    moveToAction(node: cc.Node, isToLeft: string, isEnter: string, type?: string, startPos?: cc.Vec2, endPos?: cc.Vec2, shadeColor?: cc.Color): void {
        if (typeof node === "undefined" ||
            typeof isToLeft === "undefined" ||
            typeof isEnter === "undefined") {
            console.log("==> moveToAction is Error");
            return;
        }

        let arg = this.moveToArg[isToLeft][isEnter];
        arg.node = node;
        type = type == undefined ? arg.type : type;
        startPos = startPos == undefined ? arg.startPos : startPos;
        endPos = endPos == undefined ? arg.endPos : endPos;

        let delay = this.getDelay(type);
        arg.node.setPosition(startPos);
        let hideAction = null;
        this.createShieldLayer(cc.director.getScene(), "shieldLayer-moveToAction");
        let removeShadeAction = cc.callFunc(() => { this.removeShieldLayer(cc.director.getScene(), "shieldLayer-moveToAction"); }, this);
        if (typeof arg.isShow != "undefined") {
            if (arg.isShow) {
                arg.node.active = true;
            }
            else {
                let hide = function () {
                    arg.node.active = false;
                }

                hideAction = cc.callFunc(hide, this);
            }
        }
        this.acNodeMap.add(node, 1);
        let moveTo = cc.moveTo(delay, endPos);
        if (hideAction) {
            arg.node.runAction(cc.sequence(moveTo, hideAction, removeShadeAction));
        }
        else {
            arg.node.runAction(cc.sequence(moveTo, removeShadeAction));
        }
    }

    /**
     * 切换场景
     * @param name              目标场景名
     * @param onLaunched        切换场景完毕回调
     * @param cleanResLevel     切换场景过程中的清理资源级别(默认最高, 详情参见"CleanResLevel"定义)
     */
    switchScene(name: string, onLaunched?: (scene: cc.Scene) => void, cleanResLevel: CleanResLevel = CleanResLevel.LEVEL_MAX): void {
        let curSceneName: string = cv.config.getCurrentScene();

        // 正在过渡或者目标场景一致则直接返回
        if (name === curSceneName || cv.resConfig.transSceneInfo.isTransing) return;

        console.time(`TransitionScene - prepare`);

        // 切场景前发出的消息
        // 因为有些场景是在其他地方"被切换", 他自身不知道被切了, 一般没什么问题;
        // 但是当这个场景正在播放动画时被就会报错, 所以跑出个消息去通知它自己清理正在运行的动画
        // 该消息只能放在此处, 不能放在过渡场景中, 因为过渡场景已经是切过一次的, 这里是起始处
        cv.MessageCenter.send("switchSceneBegan", name);

        // 横屏旋转前强制隐藏loading, 防止动画切屏时发生形变
        if (cv.native.isScreenLandscape()) {
            cv.SwitchLoadingView.hideAnim();
            cv.native.setPortrait();
        }
        // 竖屏直接显示loading
        else {
            cv.SwitchLoadingView.show(cv.config.getStringData("Loading_resource"));
        }

        // 填充切换场景信息
        cv.resConfig.transSceneInfo.isTransing = true;
        cv.resConfig.transSceneInfo.srcSceneName = curSceneName;
        cv.resConfig.transSceneInfo.tarSceneName = name;
        cv.resConfig.transSceneInfo.isPreLoadRes = true;
        cv.resConfig.transSceneInfo.onLaunched = onLaunched;
        cv.resConfig.transSceneInfo.cleaResLevel = cleanResLevel;

        // 一些清理
        cv.StringTools.clearArray(this._vActViewDeque);
        this.acNodeMap.clear();

        // 统一切换至过渡场景(目的是在过渡场景GC)
        let tarSceneName: string = cv.Enum.SCENE.TransitionScene;
        let shieldLayerName: string = `shieldLayer-switchScene-${tarSceneName}`;
        this.createShieldLayer(null, shieldLayerName, cv.Enum.ZORDER_TYPE.ZORDER_LOADING);
        cc.director.loadScene(tarSceneName, (error: any, scene: cc.Scene) => {
            this.removeShieldLayer(null, shieldLayerName);

            if (error) {
                console.error(error.message || error);
                return;
            }

            // 设置当前场景名
            cv.config.setCurrentScene(tarSceneName);

            // 一些重置操作
            cv.LoadingView.reset();
            cv.TP.reset();
            cv.TT.reset();
            cv.StatusView.show(false);
            cv.pushNotice.reset();
            CircleSprite.clean();

            console.timeEnd(`TransitionScene - prepare`);
        });
    }

    /**
     * 直接加载目标场景(目前只能在"TransitionScene"过渡场景中调用)
     */
    loadTransTargetScene(): void {
        let srcSceneName: string = cv.resConfig.transSceneInfo.srcSceneName;
        let tarSceneName: string = cv.resConfig.transSceneInfo.tarSceneName;
        let onLaunched: Function = cv.resConfig.transSceneInfo.onLaunched;

        console.time(`TransitionScene - load scene[${tarSceneName}]`);

        if (tarSceneName === cv.Enum.SCENE.HALL_SCENE &&
            srcSceneName != cv.Enum.SCENE.HOTUPDATE_SCENE &&
            srcSceneName != cv.Enum.SCENE.LOGIN_SCENE &&
            srcSceneName != cv.Enum.SCENE.CLUB_SCENE &&
            srcSceneName != cv.Enum.SCENE.LOADING_SCENE) {
            let isRecharge = cv.viewAdaptive.isselfchange;
            if (!isRecharge) {
                let bDz = srcSceneName == cv.Enum.SCENE.GAME_SCENE || srcSceneName == cv.Enum.SCENE.GAME_SCENE_AOF;
                cv.dataHandler.getActivityData().haveAvatar(false, ActivityType.CustomAvatar, bDz);
            }
        }

        if ((srcSceneName === cv.Enum.SCENE.HOTUPDATE_SCENE
            || srcSceneName == cv.Enum.SCENE.LOADING_SCENE
            || srcSceneName == cv.Enum.SCENE.LOGIN_SCENE)
            && tarSceneName === cv.Enum.SCENE.HALL_SCENE) {
            TicketView.IS_VIEW = true;
        }
        else {
            TicketView.IS_VIEW = false;
        }

        let needLandscape: boolean = false;
        let isLandscape: boolean = cv.native.isScreenLandscape();
        switch (tarSceneName) {
            case cv.Enum.SCENE.COWBOY_SCENE:
            case cv.Enum.SCENE.VIDEOCOWBOY_SCENE:
            case cv.Enum.SCENE.HUMANBOY_SCENE:
            case cv.Enum.SCENE.POKERMASTER_SCENE:
            case cv.Enum.SCENE.TOPMATCHE_SCENE:
            case cv.Enum.SCENE.BLACKJACKPVP_SCENE: needLandscape = true; break;
            default: needLandscape = false; break;
        }

        // 需要转成横屏且当前是竖屏, 则直接转成横屏
        if (needLandscape) {
            if (!isLandscape) {
                cv.SwitchLoadingView.hideAnim();
                cv.native.setLandscape();
                cv.SwitchLoadingView.reset();
            }
        }
        // 需要转成竖屏且当前是横屏, 则直接转成竖屏
        else {
            if (isLandscape) {
                cv.SwitchLoadingView.hideAnim();
                cv.native.setPortrait();
                cv.SwitchLoadingView.reset();
            }
        }

        console.time(`TransitionScene - GC 3`);
        cc.sys.garbageCollect();
        console.timeEnd(`TransitionScene - GC 3`);

        let shieldLayerName: string = `shieldLayer-switchScene-${tarSceneName}`;
        cv.action.createShieldLayer(null, shieldLayerName, cv.Enum.ZORDER_TYPE.ZORDER_LOADING);

        let transFunc: () => void = (): void => {
            cc.director.loadScene(tarSceneName, (error: any, scene: cc.Scene) => {
                cv.action.removeShieldLayer(null, shieldLayerName);

                if (error) {
                    console.error(error.message || error);
                    return;
                }

                // 切换完毕后重置过渡信息
                cv.resConfig.transSceneInfo.reset();

                // 设置当前场景名
                cv.config.setCurrentScene(tarSceneName);

                // 一些重置操作
                cv.LoadingView.reset();
                cv.TP.reset();
                cv.TT.reset();
                cv.StatusView.reset(tarSceneName);
                cv.pushNotice.reset();
                cv.AudioMgr.stopAll();

                // 回调
                if (onLaunched) onLaunched(scene);
                cv.SwitchLoadingView.hide();
                cv.MessageCenter.send("switchSceneFinish", tarSceneName);

                console.timeEnd(`TransitionScene - load scene[${tarSceneName}]`);

                // 切完再GC一波
                console.time(`TransitionScene - GC 4`);
                cc.sys.garbageCollect();
                console.timeEnd(`TransitionScene - GC 4`);

                console.log(`TransitionScene - load scene[${tarSceneName}] finish`);
            });
        }

        // 检测下loading显隐状态(之前可能因为防止旋转形变的逻辑被隐藏)
        if (!cv.SwitchLoadingView.isShowAnim()) {
            cv.SwitchLoadingView.showDelay(0.2, transFunc);
        }
        else {
            transFunc();
        }
    }

    /**
     * 切换界面动画(act过程中禁用触摸事件，act完毕后自动解禁)
     * @param actNode                           目标对象
     * @param actDir                            目标方位(左 || 右)
     * @param actIO                             目标方式(切入 || 切出)
     * @param actDelay                          动作延时(可选, 默认0.2s)
     * @param actFunc                           动作前回调(可选)
     * @param actFuncFinish                     动作后回调(可选)
     * @param actFinishCallbackDelay            动作结束后延时调用"actFuncFinish"的时间(默认0s)
     */
    showAction(actNode: cc.Node
        , actDir: eMoveActionDiretion
        , actIO: eMoveActionTypes
        , actDelay: number = cv.action.delay_type.NORMAL
        , actFunc: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFinishCallbackDelay: number = 0): void {

        if (!actNode && !(actNode instanceof cc.Node)) return;
        this.acNodeMap.add(actNode, 1);
        // push到"切入/切出视图队列"中
        for (let i = 0; i < this._vActViewDeque.length; ++i) {
            if (actNode === this._vActViewDeque[i]) {
                this._vActViewDeque.splice(i, 1);
                continue;
            }
        }
        switch (actIO) {
            case eMoveActionTypes.EMAT_FADE_IN: {
                this._vActViewDeque.unshift(actNode);
            } break;

            case eMoveActionTypes.EMAT_FADE_OUT: {
                if (actDir === eMoveActionDiretion.EMAD_TO_LEFT) this._vActViewDeque.push(actNode);
            } break;
        }

        // 先要激活该"node", 因为要先使该节点的"cc.Widget"生效, 才能正确获取位置进行"cc.Action"
        actNode.active = true;

        let src_pos: cc.Vec2 = actNode.getPosition();
        let start_pos: cc.Vec2 = cc.v2(0, 0);
        let end_pos: cc.Vec2 = cc.v2(0, 0);


        let offset_x: number = cc.winSize.width;
        // let offset_y: number = cc.winSize.height;

        let sign_in: number = actIO === this.eMoveActionType.EMAT_FADE_IN ? 1 : 0;
        let sign_out: number = actIO === this.eMoveActionType.EMAT_FADE_IN ? 0 : -1;
        switch (actDir) {
            case this.eMoveActionDir.EMAD_NONE: {
                start_pos.x = src_pos.x;
                start_pos.y = src_pos.y;

                end_pos.x = src_pos.x;
                end_pos.y = src_pos.y;
            } break;

            case this.eMoveActionDir.EMAD_TO_LEFT: {
                start_pos.x = src_pos.x + sign_in * offset_x;
                start_pos.y = src_pos.y;

                end_pos.x = src_pos.x + sign_out * offset_x;
                end_pos.y = src_pos.y;
            } break;

            case this.eMoveActionDir.EMAD_TO_RIGHT: {
                start_pos.x = src_pos.x - sign_in * offset_x;
                start_pos.y = src_pos.y;

                end_pos.x = src_pos.x - sign_out * offset_x;
                end_pos.y = src_pos.y;
            } break;

            default:
                break;
        }

        actNode.setPosition(start_pos);
        let moveTo = cc.moveTo(actDelay, end_pos);
        let callFunc = cc.callFunc((): void => {
            // 若为"切出"动作,则隐藏
            if (actIO === this.eMoveActionType.EMAT_FADE_OUT) {
                actNode.active = false;
                actNode.setPosition(src_pos);
            }

            // 移出屏蔽层
            this.removeShieldLayer(cc.director.getScene(), `shieldLayer-showAction_${actNode.name}`);

            // 添加 act 后回调
            if (actFuncFinish && actFuncFinish instanceof Function) { actFuncFinish(actNode, actIO); }
        }, this);

        // 添加屏蔽层
        this.createShieldLayer(cc.director.getScene(), `shieldLayer-showAction_${actNode.name}`);

        // 开始 act
        actNode.runAction(cc.sequence(moveTo, cc.delayTime(actFinishCallbackDelay), callFunc));

        // 添加 act 前回调
        if (actFunc && actFunc instanceof Function) { actFunc(actNode, actIO); }
    }

    /**
     * 移除"showAction"产生的遮罩层(主要用于"showAction"过程中, 突然被"stopAllActions"等中断"action"的回调导致无法自动移除遮罩层, 此时就需要手动移除遮罩层)
     * @param actNode 
     */
    removeShowActionShieldLayer(actNode: cc.Node): void {
        if (!cc.isValid(actNode, true)) return;
        this.removeShieldLayer(cc.director.getScene(), `shieldLayer-showAction_${actNode.name}`);
    }

    /**
     * 创建屏蔽层
     * @param parentNode    要add到的父节点(默认: add到当前场景上)
     * @param name          屏蔽层名
     * @param zorder        屏蔽层深度值(默认: 当前父节点所含子节点数 + 1)
     * @param color         屏蔽层颜色(默认:黑色)
     * @param opacity       屏蔽层透明度 0-255 (默认: 0 全透明)
     * @param clickProc     点击回调事件
     */
    createShieldLayer(parentNode: cc.Node, name: string, zorder?: number, color?: cc.Color, opacity?: number, clickProc?: (event: cc.Event) => void): cc.Node {
        parentNode = cc.isValid(parentNode, true) ? parentNode : cc.director.getScene();
        name = cv.String(name).length <= 0 ? "shieldLayer-default" : name;
        zorder = !zorder ? cv.Enum.ZORDER_TYPE.ZORDER_LOADING : zorder;
        color = !color ? cc.Color.BLACK : color;
        opacity = !opacity ? 0 : opacity;

        let callfunction = (sprite: cc.Sprite): void => {
            if (!sprite) return;
            sprite.node.color = color;
            sprite.node.opacity = opacity;
        };

        let shieldLayer = parentNode.getChildByName(name);
        if (!shieldLayer) {
            // init
            shieldLayer = new cc.Node();
            shieldLayer.name = name;
            shieldLayer.setContentSize(cc.size(cc.winSize));
            shieldLayer.setAnchorPoint(cc.v2(0.5, 0.5));
            parentNode.addChild(shieldLayer, zorder);

            // pos
            let parentNode_w: number = parentNode.width;
            let parentNode_h: number = parentNode.height;
            if (parentNode_w <= 0) parentNode_w = cc.winSize.width;
            if (parentNode_h <= 0) parentNode_h = cc.winSize.height;
            let pos: cc.Vec2 = cc.v2((shieldLayer.anchorX - parentNode.anchorX) * parentNode_w, (shieldLayer.anchorY - parentNode.anchorY) * parentNode_h);
            shieldLayer.setPosition(pos);

            // event
            shieldLayer.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
                console.log(`shieldLayer click - name:${name}, parentName:${parentNode.name}, event:${event.getType()}`);
                event.stopPropagation();
                if (typeof clickProc === "function") clickProc(event);
            });

            // color
            if (color instanceof cc.Color) {
                let sp: cc.Sprite = shieldLayer.getComponent(cc.Sprite);
                if (!sp) sp = shieldLayer.addComponent(cc.Sprite);
                sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;

                cv.resMgr.setSpriteFrame(shieldLayer, "zh_CN/internal/image/default_sprite_splash", (): void => {
                    callfunction(sp);
                });
            }
        }
        else {
            shieldLayer.zIndex = zorder;
            let sp = shieldLayer.getComponent(cc.Sprite);
            callfunction(sp);
        }

        return shieldLayer;
    }

    /**
     * 移除屏蔽层(只能移除 createShieldLayer创建的屏蔽层)
     * @param parentNode    该屏蔽层的父节点
     * @param name          该屏蔽层名
     */
    removeShieldLayer(parentNode: cc.Node, name: string): void {
        parentNode = !parentNode ? cc.director.getScene() : parentNode;
        name = cv.String(name).length <= 0 ? "shieldLayer-default" : name;
        let shieldLayer = parentNode.getChildByName(name);
        if (shieldLayer && cc.isValid(shieldLayer, true)) {
            shieldLayer.removeFromParent(true);
            shieldLayer.destroy();
        }
    }

    /**
     * 获取当前显示的视图(该接口指针对 showAction 系列有效)
     */
    getCurShowView(): cc.Node {
        let node: cc.Node = null;
        if (this._vActViewDeque.length > 0) {
            node = this._vActViewDeque[0];
        }
        return node;
    }

    /**
     * 获取上次显示的视图(该接口指针对 showAction 系列有效)
     */
    getLastShowView(): cc.Node {
        let node: cc.Node = null;
        if (this._vActViewDeque.length > 1) {
            node = this._vActViewDeque[this._vActViewDeque.length - 1];
        }
        return node;
    }

    /**
     * 两个节点一起向左移动
     * @param node_in                   切入对象
     * @param node_out                  切出对象
     * @param node_out                  切出节点
     * @param delay                     动作时间
     * @param actFunc                   切入成员回调函数名
     * @param actFuncFinish             切出成员回调函数名
     * @param actFinishCallbackDelay    动作结束延时调用"actFuncFinish"
     */
    showActionBoth(dir: eMoveActionDiretion
        , node_in: cc.Node
        , node_out: cc.Node
        , delay: number = cv.action.delay_type.NORMAL
        , actFunc_in: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish_in: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFunc_out: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish_out: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFinishCallbackDelay: number = 0): void {

        switch (dir) {
            case eMoveActionDiretion.EMAD_NONE: break;
            case eMoveActionDiretion.EMAD_TO_LEFT: this.showActionBothLeft(node_in, node_out, delay, actFunc_in, actFuncFinish_in, actFunc_out, actFuncFinish_out, actFinishCallbackDelay); break;
            case eMoveActionDiretion.EMAD_TO_RIGHT: this.showActionBothRight(node_in, node_out, delay, actFunc_in, actFuncFinish_in, actFunc_out, actFuncFinish_out, actFinishCallbackDelay); break;
            default: break;
        }
    }

    /**
     * 两个节点一起向左移动
     * @param node_in               切入对象
     * @param node_out              切出对象
     * @param delay                 动作时间
     * @param actFunc               切入成员回调函数名
     * @param actFuncFinish         切出成员回调函数名
     * @param actFinishCallbackDelay    动作结束延时调用"actFuncFinish"
     */
    showActionBothLeft(node_in: cc.Node
        , node_out: cc.Node
        , delay: number = cv.action.delay_type.NORMAL
        , actFunc_in: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish_in: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFunc_out: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish_out: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFinishCallbackDelay: number = 0): void {

        this.showAction(node_in, this.eMoveActionDir.EMAD_TO_LEFT, this.eMoveActionType.EMAT_FADE_IN, delay, actFunc_in, actFuncFinish_in, actFinishCallbackDelay);
        this.showAction(node_out, this.eMoveActionDir.EMAD_TO_LEFT, this.eMoveActionType.EMAT_FADE_OUT, delay, actFunc_out, actFuncFinish_out, actFinishCallbackDelay);
    }

    /**
     * 两个节点一起向右移动(一个切入，一个切出)
     * @param node_in               切入对象
     * @param node_out              切出对象
     * @param delay                 动作时间
     * @param actFunc               切入成员回调函数名
     * @param actFuncFinish         切出成员回调函数名
     * @param actFinishCallbackDelay    动作结束延时调用"actFuncFinish"
     */
    showActionBothRight(node_in: cc.Node
        , node_out: cc.Node
        , delay: number = cv.action.delay_type.NORMAL
        , actFunc_in: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish_in: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFunc_out: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFuncFinish_out: (target: cc.Node, actIO: eMoveActionTypes) => void = null
        , actFinishCallbackDelay: number = 0): void {

        this.showAction(node_in, this.eMoveActionDir.EMAD_TO_RIGHT, this.eMoveActionType.EMAT_FADE_IN, delay, actFunc_in, actFuncFinish_in, actFinishCallbackDelay);
        this.showAction(node_out, this.eMoveActionDir.EMAD_TO_RIGHT, this.eMoveActionType.EMAT_FADE_OUT, delay, actFunc_out, actFuncFinish_out, actFinishCallbackDelay);
    }

    /**
     * 把指定节点添加到当前场景(只添加一次, 若已添加, 则直接返回)
     * @param node          实例化后的节点
     * @param parentNode    父节点(缺省时默认为当前场景)
     * @return              是否第一次添加到场景
     */
    addChildToSceneOnce(node: cc.Node, parentNode?: cc.Node): boolean {
        let retValue: boolean = false;
        if (!parentNode) parentNode = cc.director.getScene();
        if (node instanceof cc.Node) {
            if (!parentNode.getChildByUuid(node.uuid) && !cc.isValid(node.parent, true)) {
                parentNode.addChild(node);
                node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                retValue = true;

                // push到"切入/切出视图队列"中
                for (let i = 0; i < this._vActViewDeque.length; ++i) {
                    if (node === this._vActViewDeque[i]) {
                        this._vActViewDeque.splice(i, 1);
                        continue;
                    }
                }
                this._vActViewDeque.unshift(node);
            }
        }
        return retValue;
    }

    /**
     * 添加预制件到运行场景，并修改适配和层级
     * @param targetClass 调用当前接口的组件类
     * @param prefab 要添加到场景的预制件
     * @param arr 要修改适配父节点为场景的name数组
     * @param zorder 预制件的最终层级
     * @param isCurrentFrame 是否当前帧处理完成
     */
    addChildToScene(targetClass: cc.Component, prefab: cc.Prefab, arr: string[], zorder?: number, isCurrentFrame?: boolean): cc.Node {
        zorder = (!zorder) ? cv.Enum.ZORDER_TYPE.ZORDER_2 : zorder;
        isCurrentFrame = isCurrentFrame == true ? true : false;
        let node = cc.instantiate(prefab);
        let scene = cc.director.getScene();
        scene.addChild(node, cv.Enum.ZORDER_TYPE.ZORDER_low);
        for (let i = 0; i < arr.length; i++) {
            cc.find(arr[i], node).getComponent(cc.Widget).target = scene;
        }
        if (isCurrentFrame) {
            cv.resMgr.adaptWidget(node, true);
            node.active = false;
            node.zIndex = zorder;
        }
        else {
            targetClass.scheduleOnce(function (dt) {
                node.active = false;
                node.zIndex = zorder;
            }.bind(targetClass, node, zorder), 0);
        }


        return node;
    }

    showNodeOnLowestZIndex(targetClass: cc.Component, node: cc.Node, zorder?: number) {
        zorder = zorder != undefined ? zorder : cv.Enum.ZORDER_TYPE.ZORDER_0;
        node.active = true;
        node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_low;
        targetClass.scheduleOnce(function (dt) {
            node.active = false;
            node.zIndex = zorder;
        }.bind(targetClass, node, zorder), 0);
    }

    /**
     * 设置节点的占位符，用于中英文切换
     * @param targetClass 要设置节点对应的最终父节点
     * @param name 要设置节点的搜索路径
     * @param text 要设置的结果
     * @param isEditbox 是否是editbox，默认不是
     */
    setText(targetClass: cc.Node, name: string, text: string, isEditbox?: boolean, needChangeToRichText?: boolean) {
        isEditbox = isEditbox == true ? true : false;
        needChangeToRichText = needChangeToRichText == true ? true : false;
        let node = cc.find(name, targetClass);
        let str = cv.config.getStringData(text)
        if (isEditbox) {
            node.getComponent(cc.EditBox).placeholder = str;
        }
        else {
            if (needChangeToRichText) {
                let fontSize = node.getComponent(cc.Label).fontSize;
                node.removeComponent(cc.Label);
                node.addComponent(cc.RichText);
                node.getComponent(cc.RichText).fontSize = fontSize;
                node.getComponent(cc.RichText).lineHeight = 0;
                cv.StringTools.setRichTextString(node, str);
            }
            else {
                node.getComponent(cc.Label).string = str;
            }
        }
    }

    /**
     * 监听限制ios输入框纯数字输入
     * @param editbox EdiBox组件
     */
    listenEditboxLimitNum(editbox: cc.EditBox): void {
        if (cc.sys.os != cc.sys.OS_IOS || cc.sys.isBrowser) return;
        if (!(editbox instanceof cc.EditBox)) return;
        editbox.node.on("text-changed", () => {
            let str = editbox.string;
            let len = str.length;
            if (len <= 0) return;
            let tempStr = "";
            for (let i = 0; i < len; i++) {
                let data: string = str.charAt(i);
                if (data >= "0" && data <= "9") {
                    tempStr += data;
                }
            }
            editbox.string = tempStr;
        }, this);
    }

    /**
     * 处理按钮被按住情况下的按钮隐藏
     * @param btn Button组件
     */
    setButtonActiveFalse(btn: cc.Button): void {
        if (!(btn instanceof cc.Button)) return;

        let tempBtn: any = btn;
        tempBtn._onTouchCancel();
        btn.node.active = false;
    }

    addNodeForAcMap(node: cc.Node) {
        if (!node && !(node instanceof cc.Node)) return;
        this.acNodeMap.add(node, 1);
    }

    setAcMapHide() {
        this.acNodeMap.forEach((key: cc.Node, value: number, i?: number) => {
            if (!key && !(key instanceof cc.Node)) {

            }
            else if (!key.active) {

            }
            else {
                key.active = false;
            }

        });
    }
}