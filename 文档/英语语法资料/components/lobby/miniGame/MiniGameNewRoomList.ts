import ws_protocol = require("./../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";
import { TableView } from "../../../common/tools/TableView";
import { MiniGameNewRoomListItem } from "./MiniGameNewRoomListItem";
import { MiniGameNewRoomListItemEuropean } from "./MiniGameNewRoomListItemEuropean";
import { MiniGameNewRoomListItemElect, MiniGameNewRoomListItemElectData, MiniGameNewRoomListItemElectsInfo } from "./MiniGameNewRoomListItemElect";
import labaBtn from "../../game/dzPoker/labaBtn";

const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameNewRoomList extends cc.Component {
    @property(cc.Node) img_bg: cc.Node = null;
    @property(cc.Node) img_fade: cc.Node = null;
    @property(cc.Node) img_shield: cc.Node = null;

    static g_class_name: string = "MiniGameNewRoomList";                                    // 类名
    private static g_instance: MiniGameNewRoomList = null;                                  // 伪单例

    private _panel: cc.Node = null;
    private _panel_src_pos: cc.Vec2 = cc.Vec2.ZERO;                                         // 主面板原位置
    private _panel_src_widget_top: number = 0;                                              // 主面板原顶部对齐值

    private _img_title: cc.Node = null;
    private _btn_close: cc.Node = null;
    private _txt_online: cc.Label = null;
    private _tableView: TableView = null;

    private _isFadingIn: boolean = false;
    private _isFadingOut: boolean = false;
    private _isScrollEnd: boolean = false;

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): MiniGameNewRoomList {
        if (!(prefab instanceof cc.Prefab)) return null;

        if (!MiniGameNewRoomList.g_instance || !cc.isValid(MiniGameNewRoomList.g_instance)) {
            parentNode = parentNode ? parentNode : cc.director.getScene();
            zorder = zorder ? zorder : 0;

            let inst: cc.Node = cc.instantiate(prefab);
            MiniGameNewRoomList.g_instance = inst.getComponent(MiniGameNewRoomList);
            if (MiniGameNewRoomList.g_instance) {
                let v2_size: cc.Vec2 = cc.v2(inst.width, inst.height);
                let v2_scale: cc.Vec2 = cc.v2(inst.scaleX, inst.scaleY);
                pos = pos ? pos : (inst.getAnchorPoint().sub(parentNode.getAnchorPoint())).scaleSelf(v2_size).scaleSelf(v2_scale);
                inst.setPosition(pos);
                inst.active = false;
                parentNode.addChild(inst, zorder);
            }
            else {
                inst.destroy();
                inst = null;
            }
        }

        return MiniGameNewRoomList.g_instance;
    }

    /**
     * 自动显示"常规游戏"
     * @param datas 
     * @param isAnim 
     */
    autoShowCom(datas: world_pb.MiniGame[], isAnim: boolean = true): void {
        this._init(world_pb.GameId.GameId_Dummy);
        this.node.active = true;

        // 适配滚动视图大小
        let prefab: cc.Prefab = this._tableView.prefabTypes[0];
        let offset_h: number = this._getViewOffsetHeight(prefab, datas.length, 216);
        let panel_widget: cc.Widget = this._panel.getComponent(cc.Widget);
        panel_widget.top = this._panel_src_widget_top + offset_h;
        cv.resMgr.adaptWidget(this.node, true);

        // 计算视图大小后保存最新的视图原始位置
        this._panel_src_pos = cc.v2(this._panel.position);

        // 设置标题
        let path_title: string = `hall/miniGame/new/itemTitle/maintain_title_${datas[0].sourceType}`;
        cv.resMgr.setSpriteFrame(this._img_title, cv.config.getLanguagePath(path_title));

        // 更新列表
        let objs: any[] = [];
        objs.push({ prefab_type: 0, prefab_component: MiniGameNewRoomListItem, prefab_datas: datas });
        this._tableView.bindData(objs);
        this._tableView.reloadView();

        // 动画
        if (isAnim) this._autoAnimFunc(true, isAnim);
    }

    /**
     * 自动显示"一起看球"
     * @param data 
     * @param isAnim 
     */
    autoShowEuropean(data: world_pb.MiniGame, isAnim: boolean = true): void {
        this._init(data.sourceType);
        this.node.active = true;

        // 解析"json"数据
        let topMatches: any[] = [];
        try {
            topMatches = JSON.parse(data.topMatches);
        }
        catch (error) {
            topMatches = [];
            console.error(`${MiniGameNewRoomList.g_class_name}: error, parse gameid=${data.deskType} json data failed - ${error}!`);
        }
        finally {
        }

        // 适配滚动视图大小
        let prefab: cc.Prefab = this._tableView.prefabTypes[0];
        let offset_h: number = this._getViewOffsetHeight(prefab, topMatches.length, 216);
        let panel_widget: cc.Widget = this._panel.getComponent(cc.Widget);
        panel_widget.top = this._panel_src_widget_top + offset_h;
        cv.resMgr.adaptWidget(this.node, true);

        // 计算视图大小后保存最新的视图原始位置
        this._panel_src_pos = cc.v2(this._panel.position);

        // 设置标题
        let path_title: string = `hall/miniGame/new/itemTitle/maintain_title_${data.sourceType}`;
        cv.resMgr.setSpriteFrame(this._img_title, cv.config.getLanguagePath(path_title));

        // 更新列表
        let objs: any[] = [];
        objs.push({ prefab_type: 0, prefab_component: MiniGameNewRoomListItemEuropean, prefab_datas: topMatches });
        this._tableView.bindData(objs);
        this._tableView.reloadView();

        // 动画
        if (isAnim) this._autoAnimFunc(true, isAnim);
    }

    /**
     * 电子游戏排序
     * @param  按照sortId排序(从小到打排序) 
     *  如果sortId相同时, creatime按照优先排前 
     * @param  
     */
    sortElectGame(a: world_pb.PgGameData, b: world_pb.PgGameData): number {
        //按照sortID来，sortID小，排前面
        if (a.sortId < b.sortId) {
            return -1;
        }
        else if (a.sortId > b.sortId) {
            return 1;
        }else{
            //sortID相等时候，时间小，排前面
            if(a.createTime < b.createTime){
                return -1;
            }else{
                return 1;
            }
        }
    }


    /**
     * 自动显示"电子游戏"
     * @param datas 
     * @param isAnim 
     */
    autoShowElect(data: world_pb.MiniGame, isAnim: boolean = true): void {
        this._init(data.sourceType);
        this.node.active = true;

        // 填充列表数据
        let objs: any[] = [];
        let colMaxLen: number = 3;
        let info: MiniGameNewRoomListItemElectsInfo = null;
        let PgGameData:world_pb.PgGameData[] = data.pgGameData;
     
        //cv.tools.logObject(PgGameData, "PgGameData=");
        //电子小游戏进行排序
        PgGameData.sort(this.sortElectGame);
        
        let codeLen = cv.StringTools.getArrayLength(PgGameData);
        // if (codeLen >= 1) {
        //     //去除不在15个范围内的code
        //     for (let i = 0; i < PgGameData.length; i++) {
        //         let bHave = cv.miniGameConfig.ishaveGame(PgGameData[i].gameCode);
        //         if (!bHave) {
        //             PgGameData.splice(i, 1);
        //             i--;
        //         }
        //     }
        // }

        // codeLen = cv.StringTools.getArrayLength(PgGameData);
        for (let i = 0; i < codeLen; ++i) {
            let gameCode: string = PgGameData[i].gameCode;
            let label: number = PgGameData[i].label;
            let gameIcon: string = PgGameData[i].gameIcon;
            let gameName:string = PgGameData[i].gameName;
            let isChamPoin: number = PgGameData[i].isChamPoin;

            if (i % colMaxLen === 0) {
                info = new MiniGameNewRoomListItemElectsInfo();
                objs.push({ prefab_type: 0, prefab_component: MiniGameNewRoomListItemElect, prefab_datas: info });
            }

            if (info) {
                let t: MiniGameNewRoomListItemElectData = new MiniGameNewRoomListItemElectData();
                t.gameCode = gameCode;
                t.label = label;
                t.iconUrl = gameIcon;
                t.gameName = gameName;
                t.isChamPoin = isChamPoin;
                info.items.push(t);
            }
        }

        // 适配滚动视图大小
        let prefab: cc.Prefab = this._tableView.prefabTypes[0];
        let offset_h: number = this._getViewOffsetHeight(prefab, objs.length);
        let panel_widget: cc.Widget = this._panel.getComponent(cc.Widget);
        panel_widget.top = this._panel_src_widget_top + offset_h;
        cv.resMgr.adaptWidget(this.node, true);

        // 计算视图大小后保存最新的视图原始位置
        this._panel_src_pos = cc.v2(this._panel.position);

        // 设置标题
        let path_title: string = `hall/miniGame/new/itemTitle/maintain_title_${data.sourceType}`;
        cv.resMgr.setSpriteFrame(this._img_title, cv.config.getLanguagePath(path_title));

        // 设置在线人数
        if (this._txt_online) {
            this._txt_online.node.active = true;
            let online_word: string = cv.config.getStringData("minigame_new_online");
            this._txt_online.string = `${online_word}${data.playerNum}`;
        }

        // 更新列表
        this._tableView.bindData(objs);
        this._tableView.reloadView();

        // 动画
        if (isAnim) this._autoAnimFunc(true, isAnim);
    }

    /**
     * 自动隐藏
     * @param isAnim 
     * @param isDestory 
     */
    autoHide(isAnim: boolean = true, isDestory: boolean = true): void {
        this._autoAnimFunc(false, isAnim, () => {
            this.img_fade.stopAllActions();
            this.img_fade.opacity = 0xFF;
            this.img_fade.active = false;

            this._tableView.clearView();
            if (isDestory) this.node.destroy();
        });
    }

    protected onLoad(): void {
        if (!MiniGameNewRoomList.g_instance) MiniGameNewRoomList.g_instance = this;

        cv.resMgr.adaptWidget(this.node, true);
        this._btn_close.on("click", this._onClickBtnClose, this);
        this.img_bg.on(cc.Node.EventType.TOUCH_END, (sender: cc.Node) => { this.autoHide(); });
    }

    protected start(): void {
    }

    protected onEnable(): void {
    }

    protected onDisable(): void {
    }

    protected onDestroy(): void {
        MiniGameNewRoomList.g_instance = null;
        console.log(`${MiniGameNewRoomList.g_class_name}: onDestroy`);
    }

    onSVEventScrollingBegan(scrollView: cc.ScrollView, tableView: TableView): void {
        this._isScrollEnd = false;
    }

    onSVEventScrolling(scrollView: cc.ScrollView, tableView: TableView): void {
        if (this._isScrollEnd) return;
        if (scrollView.content.height > scrollView.node.height) this._showFadingAct(true);
    }

    onSVEventScrollEndedWithThreshold(scrollView: cc.ScrollView, tableView: TableView): void {
        this._isScrollEnd = true;
        this._showFadingAct(false);
    }

    onSVEventScrollEnded(scrollView: cc.ScrollView, tableView: TableView): void {
        this._isScrollEnd = true;
        this._showFadingAct(false);
    }

    /**
     * 初始化房间列表面板
     * @param gameid
     */
    private _init(gameid: number): void {
        let panel_com: cc.Node = this.node.getChildByName("panel_com");
        let panel_elect: cc.Node = this.node.getChildByName("panel_elect");
        let panel_european: cc.Node = this.node.getChildByName("panel_european");

        switch (gameid) {
            // 一起看球
            case world_pb.GameId.TopMatches: {
                panel_com.destroy();
                panel_elect.destroy();
                this._panel = panel_european;
            } break;

            // 电子游戏
            case world_pb.GameId.PocketGames: {
                panel_com.destroy();
                panel_european.destroy();
                this._panel = panel_elect;
                this._txt_online = this._panel.getChildByName("txt_online").getComponent(cc.Label);
            } break;

            // 其他游戏
            default: {
                panel_elect.destroy();
                panel_european.destroy();
                this._panel = panel_com;
            } break;
        }

        this._panel.active = true;
        this._panel_src_widget_top = this._panel.getComponent(cc.Widget).top;
        this._img_title = this._panel.getChildByName("img_title");
        this._btn_close = this._panel.getChildByName("btn_close");
        this._tableView = this._panel.getChildByName("scrollView").getComponent(TableView);
        this._tableView.bindScrollEventTarget(this);

        this.img_fade.active = false;
        this.img_fade.opacity = 0;
    }

    private _showFadingAct(isFadeIn: boolean, duration: number = 0.5): void {
        if (isFadeIn) {
            this.img_fade.active = true;

            if (this._isFadingOut) {
                this._isFadingOut = false;
                this.img_fade.stopAllActions();
            }

            if (!this._isFadingIn) {
                this._isFadingIn = true;
                this.img_fade.runAction(cc.fadeIn(duration));
            }
        }
        else {
            if (!this.img_fade.active) return;

            if (this._isFadingIn) {
                this._isFadingIn = false;
                this.img_fade.stopAllActions();
            }

            if (!this._isFadingOut) {
                this._isFadingOut = true;
                this.img_fade.runAction(cc.sequence(cc.fadeOut(duration), cc.callFunc((): void => {
                    this._isFadingOut = false;
                    this.img_fade.opacity = 0xFF;
                    this.img_fade.active = false;
                })));
            }
        }
    }

    /**
     * 获取视图片高度偏移差值
     * @param prefab 指定预制件引用
     * @param rowLen 数据数组长度(即视图"item"行数)
     * @param rowLimitShow 规定显示的行数(默认0, 如果为0则按计算结果显示真实行数)
     * @returns 
     */
    private _getViewOffsetHeight(prefab: cc.Prefab, rowLen: number, offset_h: number = 0): number {
        let value: number = 0;
        if (rowLen >= 1) {
            let minLimitLen: number = 1;        // 规定的下限行数
            let maxLimitLen: number = 5;        // 规定的上限行数(不能超出屏幕)
            let rowMaxLen: number = 0;          // 不同设备自动适配后的实际最大行数
            let content_h: number = this._tableView.node.height - this._tableView.paddingStart - this._tableView.paddingEnd;

            // 适配后实际最大行数
            rowMaxLen = (content_h + this._tableView.spacing) / (prefab.data.height + this._tableView.spacing);
            rowMaxLen = Math.max(minLimitLen, rowMaxLen);
            rowMaxLen = Math.min(maxLimitLen, rowMaxLen);

            // 小于实际行数, 计算缩减差值(为了达到设计效果, 补上一个底部间距值)
            if (rowLen < rowMaxLen) {
                let left_h: number = rowLen * prefab.data.height + (rowLen - 1) * this._tableView.spacing + offset_h;
                value = content_h - left_h;
            }
            // 大于等于比实际行数, 校准视图大小(若适配设备后视图大小不足以整除"item", 这里做个整除校准)
            else {
                rowMaxLen = cv.StringTools.toFixed(rowMaxLen, 0);
                let view_h: number = rowMaxLen * prefab.data.height + (rowMaxLen - 1) * this._tableView.spacing;
                if (content_h < view_h) {
                    value = content_h - view_h;
                }
            }
        }

        return value;
    }

    private _onClickBtnClose(event: cc.Event): void {
        cv.AudioMgr.playButtonSound("close");
        this.autoHide();
    }

    private _autoAnimFunc(actionIn: boolean, isAnim: boolean, callback: () => void = null): void {
        this.node.active = true;
        this._panel.active = true;
        this._panel.stopAllActions();

        let duration: number = 0.1;
        let seq: cc.Action = null;
        let src_pos: cc.Vec2 = cc.v2(this._panel_src_pos);
        let tmp_pos: cc.Vec2 = cc.v2(this._panel_src_pos);

        if (actionIn) {
            tmp_pos.y -= this._panel.height * this._panel.scaleY * (1 - this._panel.anchorY);
            this._panel.setPosition(tmp_pos);

            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
                this._panel.setPosition(src_pos);
                if (callback) callback();
            });

            if (isAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, src_pos);
                let ebo: cc.ActionInterval = mt.easing(cc.easeOut(3));
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            this._panel.setPosition(src_pos);
            tmp_pos.y -= this._panel.height * this._panel.scaleY * (1 - this._panel.anchorY);

            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this.img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this.img_shield.active = false;
                this._panel.setPosition(src_pos);
                if (callback) callback();
                this.node.active = false;
            });

            if (isAnim) {
                let mt: cc.ActionInterval = cc.moveTo(duration, tmp_pos);
                let ebi: cc.ActionInterval = mt.easing(cc.easeIn(3));
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this._panel.runAction(seq);
            this.img_shield.active = true;
            this.img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }
}
