import ws_protocol = require("./../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";
import { HashMap } from "../../../common/tools/HashMap";
import { TableView } from "../../../common/tools/TableView";

import { MiniGameNewItem, MiniGameNewItemData, MiniGameNewItemsInfo } from "./MiniGameNewItem";
import { MiniGameNewRoomList } from "./MiniGameNewRoomList";
import { MiniGameNewRoomListItem } from "./MiniGameNewRoomListItem";
import { MiniGameNewRoomListItemElect, MiniGameNewRoomListItemElectData } from "./MiniGameNewRoomListItemElect";
import { MiniGameNewRoomListItemEuropean } from "./MiniGameNewRoomListItemEuropean";
import popSilence from "../../game/cowboy/PopSilence";

const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameNew extends cc.Component {
    @property(cc.Prefab) prefab_roomList: cc.Prefab = null;                             // 游戏房间预制件
    @property(TableView) tableview: TableView = null;
    @property(cc.Prefab) popSilencePre: cc.Prefab = null;                               //冷静预制件

    static g_class_name: string = "MiniGameNew";                                        // 类名
    private static g_instance: MiniGameNew = null;                                      // 伪单例

    private _gameIDs: number[];                                                         // 游戏id有序数组
    private _gameRoomMap: HashMap<number, world_pb.MiniGame[]> = new HashMap();         // 游戏id对应的房间列表
    private _itemsMap: HashMap<number, MiniGameNewItemData> = new HashMap();            //小游戏界面数据存储
    private _autoEnterMiniGame: boolean = false;                                         //是否需要自动进入小游戏
    private _autoJunmpGameData: any = null;                                              //自动跳转进入小游戏数据

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): MiniGameNew {
        if (!(prefab instanceof cc.Prefab)) return null;

        if (!MiniGameNew.g_instance || !cc.isValid(MiniGameNew.g_instance)) {
            parentNode = parentNode ? parentNode : cc.director.getScene();
            zorder = zorder ? zorder : 0;

            let inst: cc.Node = cc.instantiate(prefab);
            MiniGameNew.g_instance = inst.getComponent(MiniGameNew);
            if (MiniGameNew.g_instance) {
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

        return MiniGameNew.g_instance;
    }

    protected onLoad(): void {
        if (!MiniGameNew.g_instance) MiniGameNew.g_instance = this;

        // 适配ios全面屏(底部栏)
        if (cc.sys.os === cc.sys.OS_IOS && cv.config.IS_FULLSCREEN) {
            let widget: cc.Widget = this.tableview.getComponent(cc.Widget);
            widget.bottom += cv.config.FULLSCREEN_OFFSETY_B;
        }

        cv.resMgr.adaptWidget(this.node, true);

        // 游戏id有序映射
        this._gameIDs = [];
        this._gameIDs.push(world_pb.GameId.GameId_Dummy);
        this._gameIDs.push(world_pb.GameId.CowBoy);
        this._gameIDs.push(world_pb.GameId.HumanBoy);
        this._gameIDs.push(world_pb.GameId.VideoCowboy);
        this._gameIDs.push(world_pb.GameId.PokerMaster);
        this._gameIDs.push(world_pb.GameId.Sports);
        this._gameIDs.push(world_pb.GameId.TopMatches);
        this._gameIDs.push(world_pb.GameId.PocketGames);

        this._autoEnterMiniGame = false;
        this._autoJunmpGameData = null;
    }

    protected start(): void {
    }

    protected onEnable(): void {
        this._registerEvent();
        cv.worldNet.MiniGamesListRequest();
    }

    protected onDisable(): void {
        this._unregisterEvent();
        if (this.tableview) this.tableview.clearView();
    }

    protected onDestroy(): void {
        MiniGameNew.g_instance = null;
        console.log(`${MiniGameNew.g_class_name}: onDestroy`);
    }

    private _registerEvent(): void {
        cv.MessageCenter.register("MiniGamesListResponse", this._onMsgRespRoomList.bind(this), this.node);
        cv.MessageCenter.register("startSportsScene", this._onMsgRespStartSportsScene.bind(this), this.node);
        cv.MessageCenter.register("enterMiniGameEvent", this._onMsgEnterMiniGameEvent.bind(this), this.node);

        cv.MessageCenter.register(`${MiniGameNewItem.g_class_name}_click`, this._onMsgGameItemClick.bind(this), this.node);
        cv.MessageCenter.register(`${MiniGameNewRoomListItem.g_class_name}_click`, this._onMsgRoomListItemClick.bind(this), this.node);
        cv.MessageCenter.register(`${MiniGameNewRoomListItemElect.g_class_name}_click`, this._onMsgRoomListItemElectClick.bind(this), this.node);
        cv.MessageCenter.register(`${MiniGameNewRoomListItemEuropean.g_class_name}_click`, this._onMsgRoomListItemEuropeanClick.bind(this), this.node);
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("MiniGamesListResponse", this.node);
        cv.MessageCenter.unregister("startSportsScene", this.node);
        cv.MessageCenter.unregister("enterMiniGameEvent", this.node);
        cv.MessageCenter.unregister(`${MiniGameNewItem.g_class_name}_click`, this.node);
        cv.MessageCenter.unregister(`${MiniGameNewRoomListItem.g_class_name}_click`, this.node);
        cv.MessageCenter.unregister(`${MiniGameNewRoomListItemElect.g_class_name}_click`, this.node);
        cv.MessageCenter.unregister(`${MiniGameNewRoomListItemEuropean.g_class_name}_click`, this.node);
    }

    private _sortRoomList(a: world_pb.MiniGame, b: world_pb.MiniGame): number {
        if (a.sourceType != b.sourceType) {
            return a.sourceType - b.sourceType;
        }
        else if (a.deskType != b.deskType) {
            return a.deskType - b.deskType;
        }
        else if (a.AmountLevel[0] != b.AmountLevel[0]) {
            return a.AmountLevel[0] - b.AmountLevel[0];
        }
        else {
            return a.roomid - b.roomid;
        }
    }

    private _parseJsonArray(text: string): any[] {
        let json: any[] = [];

        try {
            json = JSON.parse(text);
        }
        catch (error) {
            json = [];
        }

        return json;
    }

    /**
     * 房间列表消息通知
     * @param msg 
     */
    private _onMsgRespRoomList(msg: world_pb.MiniGame[]): void {
        this._gameRoomMap.clear();
        msg.sort(this._sortRoomList);

        // 添加房间列表
        for (let i = 0; i < msg.length; ++i) {
            let gameid: number = msg[i].sourceType;
            let roomList: world_pb.MiniGame[] = this._gameRoomMap.get(gameid);
            if (!roomList) roomList = [];
            roomList.push(msg[i]);
            this._gameRoomMap.add(gameid, roomList);
        }

        // 解析数据
        this._itemsMap.clear();
        for (let i = 0; i < this._gameIDs.length; ++i) {
            let gameid: number = this._gameIDs[i];
            let t: MiniGameNewItemData = new MiniGameNewItemData();
            t.gameid = gameid;

            let roomList: world_pb.MiniGame[] = this._gameRoomMap.get(gameid);
            if (roomList && roomList.length > 0) {

                let bHot: boolean = roomList[0].isHot; //是否显示hot图标
                let miniLabel: world_pb.MiniLabel = roomList[0].label; //显示标签类型
                t.bHot = bHot;
                t.label = miniLabel;

                switch (gameid) {
                    // 一起看球
                    case world_pb.GameId.TopMatches: {
                        t.status = 1;
                        let topMatches: any[] = this._parseJsonArray(roomList[0].topMatches);
                        if (Array.isArray(topMatches)) {
                            for (let j = 0; j < topMatches.length; ++j) {
                                t.online += cv.Number(topMatches[j].count);
                            }
                        }
                    } break;

                    // 电子游戏
                    case world_pb.GameId.PocketGames: {
                        let pgGameData: world_pb.PgGameData[] = roomList[0].pgGameData;
                        if (pgGameData.length > 0) {
                            t.status = 1;
                            t.online = roomList[0].playerNum;
                        }
                    } break;

                    // 其他游戏
                    default: {
                        t.status = 1;
                        for (let j = 0; j < roomList.length; ++j) {
                            t.online += roomList[j].playerNum;
                        }
                    } break;
                }
            }

            this._itemsMap.add(t.gameid, t);
        }

        // 刷新游戏列表
        let objs: any[] = [];

        // 牛仔
        do {
            let t: MiniGameNewItemsInfo = new MiniGameNewItemsInfo();
            t.items.push(this._itemsMap.get(world_pb.GameId.CowBoy));
            objs.push({ prefab_type: 0, prefab_component: MiniGameNewItem, prefab_datas: t });
        } while (false);

        // 体育/百人
        do {
            let t: MiniGameNewItemsInfo = new MiniGameNewItemsInfo();
            t.items.push(this._itemsMap.get(world_pb.GameId.Sports));
            t.items.push(this._itemsMap.get(world_pb.GameId.HumanBoy));
            objs.push({ prefab_type: 1, prefab_component: MiniGameNewItem, prefab_datas: t });
        } while (false);

        // 扑克大师/视屏牛仔
        do {
            let t: MiniGameNewItemsInfo = new MiniGameNewItemsInfo();
            t.items.push(this._itemsMap.get(world_pb.GameId.PokerMaster));
            t.items.push(this._itemsMap.get(world_pb.GameId.VideoCowboy));
            objs.push({ prefab_type: 1, prefab_component: MiniGameNewItem, prefab_datas: t });
        } while (false);

        // // 一起看球/新游戏
        // do {
        //     let t: MiniGameNewItemsInfo = new MiniGameNewItemsInfo();
        //     t.items.push(this._itemsMap.get(world_pb.GameId.TopMatches));
        //     t.items.push(this._itemsMap.get(world_pb.GameId.GameId_Dummy));
        //     objs.push({ prefab_type: 1, prefab_component: MiniGameNewItem, prefab_datas: t });
        // } while (false);

        // 电子游戏
        do {
            let t: MiniGameNewItemsInfo = new MiniGameNewItemsInfo();
            t.items.push(this._itemsMap.get(world_pb.GameId.PocketGames));
            objs.push({ prefab_type: 0, prefab_component: MiniGameNewItem, prefab_datas: t });
        } while (false);

        this.tableview.clearView(true);
        this.tableview.bindData(objs);
        this.tableview.reloadView();

        // 点击活动弹窗跳转小游戏事件到达后, 小游戏列表数据可能还没返回
        // 所以在返回小游戏列表数据后, 判断下是否要自动进入小游戏
        if (this._autoEnterMiniGame && this._autoJunmpGameData) {
            this._onMsgEnterMiniGameEvent(this._autoJunmpGameData);
        }
    }

    /**
     * 切换"体育竞猜"游戏场景
     */
    private _onMsgRespStartSportsScene(gameid: number): void {
        switch (gameid) {
            // 一起看球, 横屏
            case world_pb.GameId.TopMatches: {
                cv.action.switchScene(cv.Enum.SCENE.TOPMATCHE_SCENE);
            } break;

            // 体育赛事/电子游戏, 竖屏
            case world_pb.GameId.Sports:
            case world_pb.GameId.PocketGames: {
                cv.action.switchScene(cv.Enum.SCENE.SPORTS_SCENE);
            } break;

            default: break;
        }
    }

    /**
     * 游戏图标"item"点击事件
     * @param data 
     */
    private _onMsgGameItemClick(data: MiniGameNewItemData): void {

        console.log(`${MiniGameNew.g_class_name}: click gameid:${data.gameid}`);
        if (data.status === 0) {
            let porfix: string = cv.config.getStringData("ServerErrorCode104");
            cv.TT.showMsg(porfix, cv.Enum.ToastType.ToastTypeWarning);
        }
        else {
            let roomsData: world_pb.MiniGame[] = this._gameRoomMap.get(data.gameid);
            if (!roomsData || roomsData.length <= 0) {
                console.error(`${MiniGameNew.g_class_name}: error, game ${data.gameid} is not exist!`);
                return;
            }

            switch (data.gameid) {
                // 一起看球
                case world_pb.GameId.TopMatches: {
                    let t: world_pb.MiniGame = roomsData[0];
                    let topMatches: any[] = this._parseJsonArray(t.topMatches);

                    // 有房间
                    if (Array.isArray(topMatches) && topMatches.length > 0) {
                        let inst: MiniGameNewRoomList = MiniGameNewRoomList.initSingleInst(this.prefab_roomList);
                        inst.autoShowEuropean(t);
                    }
                    // 没房间
                    else {
                        let porfix: string = cv.config.getStringData("minigame_no_matches");
                        cv.TT.showMsg(porfix, cv.Enum.ToastType.ToastTypeWarning);
                    }

                    // 跟踪用户行为, 发送事件
                    let properties = { gameType: t.sourceType, lowestBet: 0, people: t.playerNum };
                    cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.CasinoGameSelected, cv.Enum.Functionality.casino, properties);
                } break;

                // 电子游戏
                case world_pb.GameId.PocketGames: {
                    let t: world_pb.MiniGame = roomsData[0];
                    let inst: MiniGameNewRoomList = MiniGameNewRoomList.initSingleInst(this.prefab_roomList);
                    inst.autoShowElect(t);

                    // 跟踪用户行为, 发送事件
                    let properties = { gameType: t.sourceType, lowestBet: 0, people: t.playerNum };
                    cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.CasinoGameSelected, cv.Enum.Functionality.casino, properties);
                } break;

                // 其他游戏
                default: {
                    // 多个房间才显示列表(列表逻辑支持只显示1个房间)
                    if (roomsData.length > 1) {
                        let inst: MiniGameNewRoomList = MiniGameNewRoomList.initSingleInst(this.prefab_roomList);
                        inst.autoShowCom(roomsData);

                        // 跟踪用户行为, 发送事件
                        let properties = { gameType: data.gameid };
                        cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.CasinoGameSelected, cv.Enum.Functionality.casino, properties);
                    }
                    else {
                        this._onMsgRoomListItemClick(roomsData[0]);
                    }
                } break;
            }
        }
    }

    /**
     * 常规房间列表"Item"点击事件
     * @param data 
     */
    private _onMsgRoomListItemClick(data: world_pb.MiniGame): void {
        if (!data) return;
        console.log(`${MiniGameNew.g_class_name}: click common-game room:${data.roomid}`);

        let gameid: number = data.sourceType;
        let roomid: number = data.roomid;

        // 禁止"禁止德州人员"
        if (cv.dataHandler.getUserData().isban) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }

        // 禁止"游客"
        if (gameid === world_pb.GameId.Sports && cv.dataHandler.getUserData().isTouristUser) {
            cv.TP.showMsg(cv.config.getStringData("Sports_enter_tip"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler));
            return;
        }

        // 进入游戏
        if (gameid === world_pb.GameId.Sports) {
            cv.roomManager.RequestJoinSportsRoom(gameid);
        }
        else {
            cv.roomManager.RequestJoinRoom(gameid, roomid);
        }

        // 跟踪用户行为, 发送事件
        let properties = { gameType: data.sourceType, lowestBet: data.AmountLevel[0], people: data.playerNum };
        cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.CasinoGameSelected, cv.Enum.Functionality.casino, properties);
    }

    /**
     * 一起看球房间列表"Item"点击事件
     * @param data 
     */
    private _onMsgRoomListItemEuropeanClick(data: any): void {
        console.log(`${MiniGameNew.g_class_name}: click european-game matchId:${cv.String(data.matchId)}, sportId:${cv.String(data.sportId)}`);

        // 禁止"禁止德州人员"
        if (cv.dataHandler.getUserData().isban) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }

        // 禁止"游客"
        if (cv.dataHandler.getUserData().isTouristUser) {
            cv.TP.showMsg(cv.config.getStringData("Sports_enter_tip"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler));
            return;
        }

        // 禁用"Ipad"设备
        if (cv.native.IsPad()) {
            cv.TP.showMsg(cv.config.getStringData("minigame_is_ipad_error"), cv.Enum.ButtonStyle.GOLD_BUTTON, (): void => { });
            return;
        }

        // 进入游戏
        let gameid: number = world_pb.GameId.TopMatches;
        let matchId: string = cv.String(data.matchId);

        cv.roomManager.RequestJoinSportsRoom(gameid, matchId);

        // 跟踪用户行为, 发送事件
        let properties = { gameType: gameid };
        cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.CasinoGameSelected, cv.Enum.Functionality.casino, properties);
    }

    /**
     * 电子房间列表"Item"点击事件
     * @param data 
     */
    private _onMsgRoomListItemElectClick(data: MiniGameNewRoomListItemElectData): void {
        console.log(`${MiniGameNew.g_class_name}: click elect-game:${data.gameCode}`);

        if (cv.dataHandler.getUserData().isban) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }

        if (cv.dataHandler.getUserData().isTouristUser) {
            cv.TP.showMsg(cv.config.getStringData("ElcGames_enter_tip"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler));
            return;
        }

        // 进入游戏
        cv.roomManager.ElcGameCode = data.gameCode;
        cv.worldNet.PgLoginRequest();

        // 跟踪用户行为, 发送事件
        let properties = { gameType: data.gameCode };
        cv.segmentTool.track(cv.Enum.CurrentScreen.casinoGameSelection, cv.Enum.segmentEvent.CasinoGameSelected, cv.Enum.Functionality.casino, properties);
    }

    /**
     *自动进入小游戏事件回调
     * @param data { junmpType: number, gameID: number, gameCode: string, matchID:string }
     */
    private _onMsgEnterMiniGameEvent(data: any) {
        if (data === null || typeof data === "undefined") {
            console.error(`${MiniGameNew.g_class_name} - _onMsgEnterMiniGameEvent: data is null`);
            return;
        }

        // 此时小游列表数据还没有返回
        if (this._itemsMap.length <= 0) {
            this._autoEnterMiniGame = true;
            this._autoJunmpGameData = data;
            console.error(`${MiniGameNew.g_class_name} - _onMsgEnterMiniGameEvent: Current miniGame list data _itemsMap is null`);
            return;
        }
        else {
            this._autoEnterMiniGame = false;
            this._autoJunmpGameData = null;
        }

        // 开始跳转
        let junmpType: number = cv.Number(data.junmpType);
        switch (junmpType) {
            case cv.Enum.JUNMPGAMETYPE.JUNMP_TO_MINI_GAME: {
                let gameID: number = cv.Number(data.gameID);
                let t: MiniGameNewItemData = this._itemsMap.get(gameID);
                if (t) {
                    this._autoEnterGame(t);
                }
            } break;

            case cv.Enum.JUNMPGAMETYPE.JUNMP_TO_SPORT: {
                let gameID: number = world_pb.GameId.Sports;
                let t: MiniGameNewItemData = this._itemsMap.get(gameID);
                if (t) {
                    this._autoEnterGame(t);
                }
            } break;

            case cv.Enum.JUNMPGAMETYPE.JUNMP_TO_ELECT_LIST: {
                let t: MiniGameNewItemData = this._itemsMap.get(world_pb.GameId.PocketGames);
                if (t) {
                    this._onMsgGameItemClick(t);
                }
            } break;

            case cv.Enum.JUNMPGAMETYPE.JUNMP_TO_ELECT_GAME: {
                let t: MiniGameNewItemData = this._itemsMap.get(world_pb.GameId.PocketGames);
                if (t) {
                    let gameCode = data.gameCode;
                    //防止后台配置的电子小游戏名称有错误(管理后台是手动输入, 名称可能存在错误), 此处客户端进行比对判断
                    let bHave = cv.miniGameConfig.ishaveGame(gameCode);
                    if (bHave) {
                        this._autoEnterGame(t, gameCode);
                    } else {
                        console.error(`${MiniGameNew.g_class_name} - _onMsgEnterMiniGameEvent: Server enter mini elect gamecode = [${gameCode}] is error.`);
                    }
                }
            } break;

            case cv.Enum.JUNMPGAMETYPE.JUNMP_TO_WATCH_MACTCHS: {
                let matchID: string = cv.String(data.matchID);
                let roomsData: world_pb.MiniGame[] = this._gameRoomMap.get(world_pb.GameId.TopMatches);
                if (roomsData.length > 0) {
                    let t: world_pb.MiniGame = roomsData[0];
                    let topMatches: any[] = this._parseJsonArray(t.topMatches);

                    // 有比赛
                    if (Array.isArray(topMatches) && topMatches.length > 0) {
                        // 查询现在是否存在对应的matchID比赛
                        let bHave = false;
                        if (Array.isArray(topMatches)) {
                            for (let i = 0; i < topMatches.length; ++i) {
                                if (matchID === topMatches[i]["matchId"]) {
                                    bHave = true;
                                    break;
                                }
                            }
                        }

                        // "matchID"存在, 直接跳转具体比赛
                        if (bHave) {
                            //进入具体某个比赛
                            let _dataMatch: any = { matchId: cv.String(matchID) }
                            this._onMsgRoomListItemEuropeanClick(_dataMatch);
                        }
                        // 不存在, 则跳转到列表
                        else {
                            console.error(`${MiniGameNew.g_class_name} - _onMsgEnterMiniGameEvent: Server enter top matches matchID = [${matchID}] is error.`);
                            let t: MiniGameNewItemData = this._itemsMap.get(world_pb.GameId.TopMatches);
                            if (t) {
                                this._onMsgGameItemClick(t);
                            }
                        }
                    }
                    // 暂无比赛
                    else {
                        let porfix: string = cv.config.getStringData("minigame_no_matches");
                        cv.TT.showMsg(porfix, cv.Enum.ToastType.ToastTypeWarning);
                    }
                }
            } break;

            default: break;
        }
    }

    /**
     * 自动进入游戏
     * @param data 
     */
    private _autoEnterGame(data: MiniGameNewItemData, gameCode: string = null): void {
        console.log(`${MiniGameNew.g_class_name} - _autoEnterGame enter gameid:${data.gameid}`);

        if (data.status === 0) {
            let porfix: string = cv.config.getStringData("ServerErrorCode104");
            cv.TT.showMsg(porfix, cv.Enum.ToastType.ToastTypeWarning);
        }
        else {
            let roomsData: world_pb.MiniGame[] = this._gameRoomMap.get(data.gameid);
            if (!roomsData || roomsData.length <= 0) {
                console.error(`${MiniGameNew.g_class_name} - _autoEnterGame enter, game ${data.gameid} is not exist!`);
                return;
            }
            // 电子游戏
            if (data.gameid === world_pb.GameId.PocketGames) {
                let _t: MiniGameNewRoomListItemElectData = new MiniGameNewRoomListItemElectData();
                _t.gameCode = gameCode;
                this._onMsgRoomListItemElectClick(_t);
            }
            // 其他游戏
            else {
                // 寻找一个初级房间
                let _roomData: world_pb.MiniGame = roomsData[0];
                for (let i = 0; i < roomsData.length; ++i) {
                    // 初级房间
                    if (roomsData[i].deskType === 1) {
                        _roomData = roomsData[i];
                        break;
                    }
                }
                this._onMsgRoomListItemClick(_roomData);
            }
        }
    }
}
