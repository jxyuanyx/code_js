import game_protocol = require("./../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import { InsuranceOld } from "./InsuranceOld";
import { InsuranceNew } from "./InsuranceNew";
import { InsuranceData } from "./InsuranceData";
import { InsuranceSmallBox } from "./InsuranceSmallBox";
import { InsuranceAllInItemData } from "./InsuranceAllInItem";
import cv from "../../../../components/lobby/cv";

/**
 * "保险"入口类
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class InsuranceEntrance extends cc.Component {
    @property(cc.Prefab) prefab_item_old: cc.Prefab = null;                                             // 保险预制件(旧版)
    @property(cc.Prefab) prefab_item_new: cc.Prefab = null;                                             // 保险预制件(新版)
    @property(cc.Prefab) prefab_small_box: cc.Prefab = null;                                            // 保险缩小窗口预制件
    @property(cc.Node) shieldLayer: cc.Node = null;                                                     // 保险"遮罩层"

    private _shieldLayer_callback: () => void = null;                                                   // "遮罩层"回调函数
    private _inst_insurance_old: InsuranceOld = null;                                                   // 旧版 实例
    private _inst_insurance_new: InsuranceNew = null;                                                   // 新版 实例
    private _inst_insurance_smallBox: InsuranceSmallBox = null;                                         // 保险缩小窗口 实例
    private _inst_insurance_data: InsuranceData.InsuranceData = null;                                   // 数据层对象 实例

    private _msInterval: number = 1;                                                                    // 定时器间隔(单位: 秒)
    private _msNowTime: number = 0;                                                                     // 当前时间
    private _msLastTime: number = 0;                                                                    // 上次时间
    private _nLeftTime: number = 0;                                                                     // 剩余时间

    private _addObserverFlag: boolean = false;                                                         // 注册事件标志

    /**
     * 设置保险视图模式(默认:常规)
     * @param viewMode 
     */
    setViewMode(viewMode: InsuranceData.InsuranceViewMode): void {
        this._inst_insurance_data.setViewMode(viewMode);
    }

    /**
     * 设置保险类型模式(默认:旧版)
     * @param viewMode 
     */
    setTypeMode(typeMode: InsuranceData.InsuranceTypeMode): void {
        this._inst_insurance_data.setTypeMode(typeMode);
    }

    /**
     * 解析"保险"数据
     * @param gameid            游戏id
     * @param data              保险数据
     * @param bMirco            是否是微局
     */
    parseInsuranceData(gameid: number, data: game_pb.NoticeGameInsurance, bMirco: boolean): void {
        this._inst_insurance_data.parseInsuranceData(gameid, data, bMirco);
    }

    /**
     * 解析"保险回放"数据
     * @param gameid            游戏id
     * @param data              保险回放数据
     * @param bMirco            是否是微局
     */
    parseInsuranceReplayData(gameid: number, data: any, bMirco: boolean): Readonly<InsuranceData.InsuranceReplayData> {
        this._inst_insurance_data.parseInsuranceReplayData(gameid, data, bMirco);
        return this._inst_insurance_data.getDataInsuranceReplay();
    }

    /**
     * 添加 allin 玩家牌数据(浅拷贝)
     * @param nUID 
     * @param sPlayerName 
     * @param nOutsNum 
     * @param vCards 
     * @param bPurchaser 
     */
    addPlayerCardsData(nUID: number, sPlayerName: string, nOutsNum: number, vCards: game_pb.CardItem[], bPurchaser: boolean): void {
        this._inst_insurance_data.addPlayerCardsData(nUID, sPlayerName, nOutsNum, vCards, bPurchaser);
    }

    /**
     * 初始化"遮罩层"
     * @param callBack 
     * @param color 
     * @param opacity 
     */
    initShieldLayer(callBack: () => void, color?: cc.Color, opacity?: number): void {
        this._shieldLayer_callback = callBack;
        if (color !== null || typeof (color) !== "undefined") this.shieldLayer.color = cc.Color.BLACK;
        if (opacity !== null || typeof (opacity) !== "undefined") this.shieldLayer.opacity = opacity;
    }

    /**
     * 设置"遮罩层"显隐状态
     * @param visible 
     */
    setShieldLayerVisible(visible: boolean): void {
        this.shieldLayer.active = visible;
    }

    /**
     * 初始化(预加载, 避免动画过程中加载, 提高流畅性)
     * 去掉"只初始化一次"检测, 支持多次初始化, 可动态改变视图, 每种视图只实例化一次
     */
    init(): void {
        // 实例化"老模式"
        do {
            let inst: cc.Node = this._getSinglePrefabInst(this.prefab_item_old, InsuranceOld.gClassName);
            if (inst) {
                this._inst_insurance_old = inst.getComponent(InsuranceOld);
                this._inst_insurance_old.init();
            }
        } while (false);

        // 实例化"新模式"
        do {
            let inst: cc.Node = this._getSinglePrefabInst(this.prefab_item_new, InsuranceNew.gClassName);
            if (inst) {
                this._inst_insurance_new = inst.getComponent(InsuranceNew);
                this._inst_insurance_new.init();
            }
        } while (false);

        // 隐藏保险 ui
        this._hideInsuranceView(false, InsuranceData.InsuranceTypeMode.TYPE_OLD);
        this._hideInsuranceView(false, InsuranceData.InsuranceTypeMode.TYPE_NEW);
        this._hideInsuranceSmallBox(false);
    }

    /**
     * 初始化完成(剔除多余实例)
     * 若"typeMode"类型多, 最好采用 HashMap 去映射(目前只有两种固定模式, 简单 if else 处理)
     * @param typeMode 
     * @param clean 
     */
    initFinish(typeMode: InsuranceData.InsuranceTypeMode, clean: boolean = true): void {
        this._addObserver();
        this.setTypeMode(typeMode);

        if (clean) {
            if (typeMode === InsuranceData.InsuranceTypeMode.TYPE_OLD) {
                if (this._inst_insurance_new) {
                    this._inst_insurance_new.node.removeFromParent(true);
                    this._inst_insurance_new.node.destroy();
                    this._inst_insurance_new = null;
                }
            }
            else if (typeMode === InsuranceData.InsuranceTypeMode.TYPE_NEW) {
                if (this._inst_insurance_old) {
                    this._inst_insurance_old.node.removeFromParent(true);
                    this._inst_insurance_old.node.destroy();
                    this._inst_insurance_old = null;
                }
            }
        }
    }

    /**
     * 自动显示
     * @param typeMode 
     * @param viewMode 
     * @param parentNode 
     * @param zorder 
     * @param bAnim 
     */
    autoShow(bAnim: boolean = true): void {
        // 更新状态剩余时间
        this._nLeftTime = this._inst_insurance_data.getDataInsurance().count_time;

        // 常规模式下非"自己视角"默认显示"缩小窗口"
        if (this._inst_insurance_data.getViewMode() === InsuranceData.InsuranceViewMode.VIEW_NORMAL && !this._inst_insurance_data.getDataIsSelfBuy()) {
            this._showInsuranceSmallBox(bAnim);
        }
        else {
            this._showInsuranceView(bAnim);
        }
    }

    /**
     * 自动隐藏
     * @param bAnim 
     */
    autoHide(bAnim: boolean = true) {
        this._hideInsuranceView(bAnim);
        this._hideInsuranceSmallBox(bAnim);
    }

    /**
     * 获取保险状态剩余时间
     */
    getLeftTime(): number {
        return this._nLeftTime;
    }

    /**
     * 是否可见
     */
    isActive(): boolean {
        let active: boolean = false;
        switch (this._inst_insurance_data.getTypeMode()) {
            case InsuranceData.InsuranceTypeMode.TYPE_OLD: {
                if (this._inst_insurance_old) active = this._inst_insurance_old.node.active;
            } break;

            case InsuranceData.InsuranceTypeMode.TYPE_NEW: {
                if (this._inst_insurance_new) active = this._inst_insurance_new.node.active;
            } break;

            default: break;
        }
        return active;
    }

    /**
     * 获取主面板大小
     */
    getMainPanelSize(): cc.Size {
        let sz: cc.Size = cc.Size.ZERO;
        switch (this._inst_insurance_data.getTypeMode()) {
            case InsuranceData.InsuranceTypeMode.TYPE_OLD: {
                sz = cc.size(this.prefab_item_old.data.getChildByName("panel").getContentSize());
            } break;

            case InsuranceData.InsuranceTypeMode.TYPE_NEW: {
                sz = cc.size(this.prefab_item_new.data.getChildByName("panel").getContentSize());
            } break;

            default: break;
        }
        return sz;
    }

    protected onLoad(): void {
        this._inst_insurance_data = InsuranceData.InsuranceData.getInstance();

        this.setShieldLayerVisible(false);
        this.shieldLayer.on(cc.Node.EventType.TOUCH_START, (event: cc.Event): void => {
            console.log(`shieldLayer click - name:${this.shieldLayer.name}, parentName:${this.shieldLayer.parent.name}, event:${event.getType()}`);
            if (this._shieldLayer_callback) this._shieldLayer_callback();
        }, this);
    }

    protected start(): void {
    }

    protected onDestroy(): void {
        this._removeObserver();
    }

    protected update(dt: number): void {
        // 已流逝的时间
        this._msNowTime += dt;

        // 时间差
        let msDuration: number = this._msNowTime - this._msLastTime;

        // 判断调用定时器后的时间（可能调用了几次定时器）是否与调用定时器前的时间相差1s
        if (msDuration >= this._msInterval) {
            // 弥补帧误差
            this._msLastTime = this._msNowTime - (msDuration - this._msInterval);
            if (--this._nLeftTime < 0) this._nLeftTime = 0;
        }
    }

    private _addObserver(): void {
        if (this._addObserverFlag) return;
        this._addObserverFlag = true;

        cv.MessageCenter.register("add_insurance_time", this._onMsgAddInsuranceTime.bind(this), this.node);
        cv.MessageCenter.register("player_do_buy_insurance", this._onMsgBuyInsurance.bind(this), this.node);
        cv.MessageCenter.register("player_not_buy_insurance", this._onMsgNotBuyInsurance.bind(this), this.node);
    }

    private _removeObserver(): void {
        this._addObserverFlag = false;

        cv.MessageCenter.unregister("add_insurance_time", this.node);
        cv.MessageCenter.unregister("player_do_buy_insurance", this.node);
        cv.MessageCenter.unregister("player_not_buy_insurance", this.node);
    }

    /**
     * 买 回调
     * @param data 
     */
    private _onMsgBuyInsurance(data: game_pb.NoticeBuyInsuranceResult): void {
        this.autoHide();

        let nAmount = cv.StringTools.serverGoldToShowNumber(data.insure_amount);
        let strTips = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips13"), data.player_name, cv.Number(nAmount));
        cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeInfo);
    }

    /**
     * 不买 回调
     * @param data 
     */
    private _onMsgNotBuyInsurance(data: game_pb.NoticeBuyInsuranceResult): void {
        this.autoHide();

        let strTips = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips12"), data.player_name);
        cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeInfo);
    }

    /**
     * 保险延时回调
     * @param data 
     */
    private _onMsgAddInsuranceTime(data: game_pb.NoticeAddInsuranceTime): void {
        // 播放保险延时音效
        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/pturn");
        }

        // 重置保险倒计时
        cv.GameDataManager.tRoomData.pkPayMoneyItem.insuranceCount = data.count;

        // 更新状态剩余时间
        this._nLeftTime = data.rest_insurance_time;

        cv.MessageCenter.send("update_insurance_time", this._nLeftTime);
    }

    /**
     * 获取自身节点指定预制件实例(若不存在, 则自动创建且add)
     * @param prefab 
     * @param name 
     */
    private _getSinglePrefabInst(prefab: cc.Prefab, name: string): cc.Node {
        if (!(prefab instanceof cc.Prefab)) return null;
        let instNode: cc.Node = this.node.getChildByName(name);
        if (!instNode || !cc.isValid(instNode, true)) {
            instNode = cc.instantiate(prefab);
            instNode.name = name;
            this.node.addChild(instNode);
        }
        return instNode;
    }

    /**
     * 显示"保险窗口"
     * @param bAnim 
     */
    private _showInsuranceView(bAnim: boolean): void {
        // 非回放模式才有"shieldLayer"
        if (this._inst_insurance_data.getViewMode() !== InsuranceData.InsuranceViewMode.VIEW_REPLAY) {
            this.initShieldLayer((): void => {
                if (!this._inst_insurance_data.getDataIsSelfBuy()) {
                    this.setShieldLayerVisible(false);
                    this._hideInsuranceView(false);
                    this._showInsuranceSmallBox(false);
                }
            }, cc.Color.BLACK, 0);
            this.setShieldLayerVisible(true);
        }

        // 显示保险面板
        switch (this._inst_insurance_data.getTypeMode()) {
            case InsuranceData.InsuranceTypeMode.TYPE_OLD: {
                if (this._inst_insurance_old) {
                    this._inst_insurance_old.bindDataTarget(this._inst_insurance_data);
                    this._inst_insurance_old.autoShow(bAnim, this._nLeftTime);
                }
            } break;

            case InsuranceData.InsuranceTypeMode.TYPE_NEW: {
                if (this._inst_insurance_new) {
                    this._inst_insurance_new.bindDataTarget(this._inst_insurance_data);
                    this._inst_insurance_new.autoShow(bAnim, this._nLeftTime);
                }
            } break;

            default: break;
        }
    }

    /**
     * 隐藏"保险窗口"
     * @param bAnim 
     */
    private _hideInsuranceView(bAnim: boolean, typeMode?: InsuranceData.InsuranceTypeMode): void {
        this.initShieldLayer(null);
        this.setShieldLayerVisible(false);

        let tm: InsuranceData.InsuranceTypeMode = this._inst_insurance_data.getTypeMode();
        if (typeMode !== null && typeof (typeMode) !== "undefined") {
            tm = typeMode;
        }

        switch (tm) {
            case InsuranceData.InsuranceTypeMode.TYPE_OLD: {
                if (this._inst_insurance_old) {
                    this._inst_insurance_old.autoHide(bAnim);
                }
            } break;

            case InsuranceData.InsuranceTypeMode.TYPE_NEW: {
                if (this._inst_insurance_new) {
                    this._inst_insurance_new.autoHide(bAnim);
                }
            } break;

            default: break;
        }
    }

    /**
     * 显示"保险小窗口"
     * @param bAnim 
     */
    private _showInsuranceSmallBox(bAnim: boolean): void {
        let inst: cc.Node = this._getSinglePrefabInst(this.prefab_small_box, InsuranceSmallBox.gClassName);
        if (inst) {
            let player_id: number = 0;
            let player_name: string = "";
            let vItem: Readonly<InsuranceAllInItemData[]> = this._inst_insurance_data.getDataPlayerCards();
            for (let i = 0; i < vItem.length; ++i) {
                if (vItem[i].bPurchaser) {
                    player_id = vItem[i].nUID;
                    player_name = vItem[i].sPlayerName;
                    break;
                }
            }

            this._inst_insurance_smallBox = inst.getComponent(InsuranceSmallBox);
            this._inst_insurance_smallBox.show(true, player_name, this.getLeftTime(), (): void => {
                this._hideInsuranceSmallBox(false);
                this._showInsuranceView(false);
            });
        }
    }

    /**
     * 隐藏"保险小窗口"
     * @param bAnim 
     */
    private _hideInsuranceSmallBox(bAnim: boolean): void {
        if (this._inst_insurance_smallBox) {
            this._inst_insurance_smallBox.hide(bAnim);
        }
    }
}