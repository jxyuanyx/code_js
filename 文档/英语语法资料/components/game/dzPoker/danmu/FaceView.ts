/**
 * 弹幕界面
 */
import cv from "../../../lobby/cv";
import { GameScene } from "./../GameScene";
import { GameMain } from "./../GameMain";
import { JackfruitScene } from "../../jackfruit/JackfruitScene";
import { JackfruitMain } from "../../jackfruit/JackfruitMain";
import JackfruitManager from "../../jackfruit/JackfruitManager";
import { BarrageType, ChatType } from "../../jackfruit/JackfruitData";
import { Seat } from "./../Seat";
import game_protocol = require("../../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import DanmuView from "./DanmuView";
import { ScrollViewReuse } from "../../../../common/tools/ScrollViewReuse";
import { BarrageCountData } from "./../data/GameDataManager";
import DanmuHeadItem from "./DanmuHeadItem";
import { PlayerInfo } from "../data/RoomData";
import Tag from "../../../../common/tools/Tag";
const { ccclass, property } = cc._decorator;

@ccclass
export default class FaceView extends cc.Component {
    @property(cc.Prefab) face_ani_prefab: cc.Prefab = null;
    //ui界面
    @property(cc.Node) danmu_ui: cc.Node = null;
    //弹幕滚动层界面
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    //弹幕item
    @property(cc.Prefab) danmuItem: cc.Prefab = null;
    //@玩家头像显示节点
    @property(cc.Node) roleHeadBg: cc.Node = null;
    //@玩家名称背景
    @property(cc.Node) roleNameBg: cc.Node = null;
    //头像预制体
    @property(cc.Prefab) roleHeadItemPrefab: cc.Prefab = null;
    //@玩家名称
    @property(cc.Node) roleNameText: cc.Node = null;
    //表情面板
    @property(cc.Node) face_panel: cc.Node = null;
    //飘弹幕的界面
    @property(cc.Prefab) danmu_Panel_prefab: cc.Prefab = null;
    //弹幕选择面板
    @property(cc.Node) danmu_panel: cc.Node = null;
    //表情按钮
    @property(cc.Node) face_button: cc.Node = null;
    //弹幕的按钮
    @property(cc.Node) danmu_button: cc.Node = null;
    //弹幕的开关按钮
    @property(cc.Node) danmu_onOffBtn: cc.Node = null;
    faceArr: cc.Node[] = [];
    private _faceLen: number = 12;
    public onOff: boolean = true;
    //发送弹幕的冷却时间
    private _cdTime: number = 5;
    private _isInCd: boolean = false;
    private _danmu_view: cc.Node = null;
    //菠萝蜜弹幕数量
    private JACKFRUIT_DANMU_COUNT = 22
    // private jackfruitData: string[] = [];
    //德州弹幕数量
    private DZPOKER_DANMU_COUNT = 23;
    private roleHeadItemList: DanmuHeadItem[] = [];
    public game: GameScene;
    onLoad() {
        this.danmu_ui.active = false;
        this.danmu_panel.active = true;
        this.face_panel.active = false;
        cc.find("bulltScreenBtn2", this.face_button).active = true;
        cc.find("bulltScreenBtn2", this.danmu_button).active = false;
        cc.find("Label", this.face_button).color = cc.Color.WHITE;
        cc.find("Label", this.face_button).opacity = 120;
        cc.find("Label", this.danmu_button).color = cc.color(255, 171, 0);
        cc.find("Label", this.danmu_button).opacity = 255;

        this.face_button.setContentSize(cc.size(cc.winSize.width / 2, this.face_button.getContentSize().height));
        this.face_button.setPosition(cc.winSize.width / 2, this.face_button.getPosition().y);
        this.danmu_button.setContentSize(cc.size(cc.winSize.width / 2, this.danmu_button.getContentSize().height));
        this.danmu_button.setPosition(-cc.winSize.width / 2, this.danmu_button.getPosition().y);
        this.initLanguage();
        //this.setOnOff();
        this.initScrollviewData();
        this.initRoleHead();

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
            cv.jackfruitNet.requestBarrageCount();
        } else {
            cv.gameNet.requestBarrageCount();
        }
        
    }

    /**
     * name
     */
    public onResetCdtime() {
        //设备cd状态
        this._isInCd = true;
        this._cdTime = 5;
        cv.MessageCenter.send("updateCdStatus", (this._isInCd || !cv.tools.isShowBarrage()));
        this.schedule(this.updateDanmuCd, 1);
    }
    /**
     * setGameScene
     */
    public setGameScene(game: any) {
        this.game = game;
    }
    /**
     * 初始化头像
     */
    public initRoleHead() {
        //最多显示8个，默认初始化8个，够用.
        let len = 8;
        for (let index = 0; index < len; index++) {
            let roleHead = cc.instantiate(this.roleHeadItemPrefab);
            roleHead.getComponent(DanmuHeadItem).setFaceView(this);
            roleHead.setPosition(84 + index * (roleHead.getContentSize().width + 25), 0);
            this.roleHeadBg.addChild(roleHead);
            this.roleHeadItemList.push(roleHead.getComponent(DanmuHeadItem));
        }
    }

    /**
     * 显示头像
     */
    public showRoleHead() {
        let playerData: PlayerInfo[] = [];
        let len = cv.GameDataManager.tRoomData.kTablePlayerList.length;
        for (let i = 0; i < len; i++) {
            if (cv.GameDataManager.tRoomData.kTablePlayerList[i].playerid != cv.dataHandler.getUserData().u32Uid) {
                playerData.push(cv.GameDataManager.tRoomData.kTablePlayerList[i]);
            }

        }
        for (let index = 0; index < this.roleHeadItemList.length; index++) {
            if (index < playerData.length) {
                this.roleHeadItemList[index].setData(playerData[index]);
                this.roleHeadItemList[index].node.active = true;
            } else {
                this.roleHeadItemList[index].clearData();
                this.roleHeadItemList[index].node.active = false;
            }

        }

        this.roleNameBg.active = false;
    }
    /**
     * 点击@玩家头像
     *
     */
    public onclickRoleHead(playerid: number, isSelect: boolean) {
        for (let i = 0; i < this.roleHeadItemList.length; i++) {
            if (this.roleHeadItemList[i].getPlayerId() != playerid) {
                this.roleHeadItemList[i].hideSelectImg();
            } else {
                if (isSelect) {
                    let name = "@ " + this.roleHeadItemList[i].getRoleName();
                    let size = cv.resMgr.getLabelStringSize(this.roleNameText.getComponent(cc.Label), name);
                    this.roleNameText.getComponent(Tag).setTag(playerid);
                    this.roleNameBg.setContentSize(cc.size(size.width + 40, this.roleNameBg.getContentSize().height));
                    //this.scrollView设置setContentSize的时候会改变this.scrollView.content的坐标，这里先记录下原始的坐标
                    if (!this.roleNameBg.active) {
                        let contentY = this.scrollView.content.getPosition().y;
                        this.scrollView.node.setContentSize(cc.size(this.scrollView.node.getContentSize().width, 530 - 100));
                        this.scrollView.node.setPosition(this.scrollView.node.x, this.scrollView.node.getContentSize().height / 2 + this.face_button.getContentSize().height);
                        this.scrollView.content.setPosition(this.scrollView.content.getPosition().x, contentY - 50);
                    }

                } else {
                    let contentY = this.scrollView.content.getPosition().y;
                    this.scrollView.node.setContentSize(cc.size(this.scrollView.node.getContentSize().width, 530));
                    this.scrollView.node.setPosition(this.scrollView.node.x, this.scrollView.node.getContentSize().height / 2 + this.face_button.getContentSize().height);
                    this.scrollView.content.setPosition(this.scrollView.content.getPosition().x, contentY + 50);
                }
                this.roleNameBg.active = isSelect;
            }
        }

    }

    public onselect(playerid: number) {
        for (let i = 0; i < this.roleHeadItemList.length; i++) {
            if (this.roleHeadItemList[i].getPlayerId() != playerid) {
                this.roleHeadItemList[i].hideSelectImg();
            }
            else
            {
                this.roleHeadItemList[i].showSelectImg();
            }
        }
    }

    start() {
        cv.MessageCenter.register("danmuItemClick", this.danmuItemClick.bind(this), this.node);
        cv.MessageCenter.register("getBarrageCountNotice", this.onGetCounts.bind(this), this.node);
        cv.MessageCenter.register("onClickDanmuSwitch", this.clikcOnOff.bind(this), this.node);
        cv.MessageCenter.register("resetCdTime",this.onResetCdtime.bind(this),this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("danmuItemClick", this.node);
        cv.MessageCenter.unregister("getBarrageCountNotice", this.node);
        cv.MessageCenter.unregister("onClickDanmuSwitch", this.node);
        cv.MessageCenter.unregister("resetCdTime",this.node);
        cv.GameDataManager.clearBarrageData();
    }

    /**
     * onGetCounts
     */
    public onGetCounts() {
        cv.GameDataManager.sortBarrageData();
    }
    /**
     * 显示弹幕UI
     */
    public showScrollview() {
        let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
        sv.bindPrefab(this.danmuItem, "DanmuItem", []);
        sv.generateItemPool();

        sv.bindScrollEventTarget(this);
        let isJackfruit = cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit;
        sv.reloadView(cv.GameDataManager.getBarrageData());

        cv.MessageCenter.send("updateCdStatus", (this._isInCd || !cv.tools.isShowBarrage()));
    }

    /**
     * 初始化数据
     */
    public initScrollviewData() {
        let isJackfruit = cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit;
        let len = isJackfruit ? this.JACKFRUIT_DANMU_COUNT : this.DZPOKER_DANMU_COUNT;
        for (let index = 0; index < len; index++) {
            if (isJackfruit) {
                let data: BarrageCountData = new BarrageCountData();
                data.content = cv.config.getStringData(cv.StringTools.formatC("jackfruit_danmu_label%d", index));
                data.BarrageId = index;
                data.count = 0;
                cv.GameDataManager.addBarrageData(data);
            } else {
                let data: BarrageCountData = new BarrageCountData();
                data.content = cv.config.getStringData(cv.StringTools.formatC("Faceview_danmu_text_%d", index));
                data.BarrageId = index;
                data.count = 0;
                cv.GameDataManager.addBarrageData(data);
            }
        }
    }

    initLanguage() {
        // let str = "";
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     str = "jackfruit_danmu_label%d";
        // } else {
        //     str = "Faceview_danmu_text_%d";
        // }
        // for (let index = 0; index < 5; index++) {
        //     cv.StringTools.setLabelString(this.node, cv.StringTools.formatC("danmu_ui/danmu_panel/button%d/txt_0", index), cv.StringTools.formatC(str, index));
        // }
        cv.StringTools.setLabelString(this.danmu_button, "Label", "Faceview_danmu_button_danmu");
        cv.StringTools.setLabelString(this.face_button, "Label", "Faceview_danmu_button_face");
    }

    public faceBgClick(event: cc.Event) {
        event.stopPropagation();
        this.danmu_ui.active = false;
    }

    public faceItemClick(event: cc.Event) {
        let node: cc.Node = event.currentTarget;
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1 && cv.roomManager.getCurrentGameID() != cv.Enum.GameId.Jackfruit) {
            let seat: Seat;
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
                //seat = this.node.parent.getComponent(GameScene).gameMain_panel.getComponent(AofGameMain).getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
            } else {
                seat = this.node.parent.getComponent(GameScene).gameMain_panel.getComponent(GameMain).getSeatBySeverId(cv.GameDataManager.tRoomData.i32SelfSeat);
            }
            //let pos: cc.Vec2 = seat.getHeadWorldPosForFace();
            let index = cv.Number(node.name.slice(5));
            //this.showFaceAni(pos, index);
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
                cv.aofNet.RequestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Emoji, cv.String(index));//(index+ 6)%12);
            } else {
                cv.gameNet.RequestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Emoji, cv.String(index));//(index+ 6)%12);
            }

        }

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit && JackfruitManager.tRoomData.nSelfSeatID != -1) {
            let seat = this.node.parent.getComponent(JackfruitScene).gameMain_panel.getComponent(JackfruitMain).getSeatBySeatID(JackfruitManager.tRoomData.nSelfSeatID);
            //let pos: cc.Vec2 = seat.getHeadWorldPosForFace();
            let index = cv.Number(node.name.slice(5));
            //let face_ani = this.showFaceAni(pos, index);
            cv.jackfruitNet.requestSendChat(cv.roomManager.getCurrentRoomID(), ChatType.Enum_Emoji, cv.String(index));
        }
        this.danmu_ui.active = false;
    }

    public showFaceAni(pos: cc.Vec2, aniIndex: number, scale: number = 1): cc.Node {
        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect(cv.StringTools.formatC("zh_CN/game/dzpoker/audio/voice_%d", aniIndex + 1));
        }
        this.hideAniBySameWorldPos(pos);
        let face_ani = this.getFaceAni();
        pos = face_ani.parent.convertToNodeSpaceAR(pos);
        face_ani.setPosition(pos.x, pos.y);//+ 50
        face_ani.scale = scale;
        let index = (aniIndex + 6) % 12;
        face_ani.getComponent(cc.Animation).play("face_" + index);
        return face_ani;
    }

    public getFaceAni(): cc.Node {
        let face_ani: cc.Node = null;
        let len = this.faceArr.length;
        for (let i = 0; i < len; i++) {
            if (!this.faceArr[i].active) {
                face_ani = this.faceArr[i];
                break;
            }
        }

        if (!face_ani) {
            face_ani = cc.instantiate(this.face_ani_prefab);
            //this.node.parent.addChild(face_ani);
            this.game.gameMain_panel.addChild(face_ani);
            this.faceArr.push(face_ani);
            face_ani.setScale(1.6);
            face_ani.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                face_ani.active = false;
            }, this);
        }
        face_ani.active = true;
        return face_ani;
    }

    public hideAniBySameWorldPos(worldPos: cc.Vec2) {
        let len = this.faceArr.length;
        for (let i = 0; i < len; i++) {
            let tempPos = this.faceArr[i].parent.convertToWorldSpaceAR(this.faceArr[i].getPosition());
            if (Math.abs(tempPos.x - worldPos.x) < 1 && Math.abs(tempPos.y - worldPos.y) < 1) {
                this.faceArr[i].active = false;
            }
        }
    }

    /**
     * 点击弹幕
     * @param event 
     */
    public danmuItemClick(params: any) {
        console.log(params);
        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/danmu");
        if (!cv.tools.isShowBarrage()) {
            cv.TT.showMsg(cv.config.getStringData("Faceview_danmu_button_onOff_Tips"), cv.Enum.ToastType.ToastTypeWarning);
            return;
        }
        if (this._isInCd) {
            let msg = cv.StringTools.formatC(cv.config.getStringData("Faceview_danmu_cd_tips"), this._cdTime);
            cv.TT.showMsg(msg, cv.Enum.ToastType.ToastTypeWarning);
            return;
        }
        //设备cd状态
        this._isInCd = true;
        //this.updateCdStatus();
        cv.MessageCenter.send("updateCdStatus", (this._isInCd || !cv.tools.isShowBarrage()));
        this.schedule(this.updateDanmuCd, 1);

        //let msg = cv.config.getStringData("Faceview_danmu_text_" + params);
        //自已
        let data: game_pb.NoticeSendBarrage = new game_pb.NoticeSendBarrage();
        data.content = cv.String(params);
        data.nickname = cv.dataHandler.getUserData().nick_name;
        data.playerid = cv.Number(cv.dataHandler.getUserData().user_id);
        data.thump_up_status = 1;
        let at_list: string[] = [];
        let at_uid_list: number[] = [];
        if (this.roleNameBg.active) {
            at_list.push(this.roleNameText.getComponent(cc.Label).string);
            at_uid_list.push(this.roleNameText.getComponent(Tag).getTag());
        }
        data.at_list = at_list;
        //cv.GameDataManager.addDanmuMsg(data);
        this.danmu_ui.active = false;
        //发送给服务器
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
            cv.jackfruitNet.requestSendBarrage(cv.String(params));
        } else {
            cv.gameNet.requestSendBarrage(cv.String(params), at_list, at_uid_list);
        }
    }

    /**
     * 刷新cd时间
     */
    public updateDanmuCd() {
        this._cdTime -= 1;
        if (this._cdTime <= 0) {
            this._cdTime = 5;
            this._isInCd = false;
            //this.updateCdStatus();
            cv.MessageCenter.send("updateCdStatus", (this._isInCd || !cv.tools.isShowBarrage()));
            this.unschedule(this.updateDanmuCd);
        }
    }

    /**
     * 点击弹幕按钮
     * @param event 
     */
    public onClickDanmuBtn(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.danmu_panel.active = true;
        this.face_panel.active = false;
        cc.find("bulltScreenBtn2", this.face_button).active = true;
        cc.find("bulltScreenBtn2", this.danmu_button).active = false;
        cc.find("Label", this.face_button).color = cc.Color.WHITE;
        cc.find("Label", this.face_button).opacity = 120;
        cc.find("Label", this.danmu_button).color = cc.color(255, 171, 0);
        cc.find("Label", this.danmu_button).opacity = 255;
    }

    /**
     * 点击表情按钮
     * @param event 
     */
    public onClickFaceBtn(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.danmu_panel.active = false;
        this.face_panel.active = true;
        cc.find("bulltScreenBtn2", this.face_button).active = false;
        cc.find("bulltScreenBtn2", this.danmu_button).active = true;
        cc.find("Label", this.face_button).color = cc.color(255, 171, 0);
        cc.find("Label", this.face_button).opacity = 255;
        cc.find("Label", this.danmu_button).color = cc.Color.WHITE;
        cc.find("Label", this.danmu_button).opacity = 120;
    }

    /**
     * 点击弹幕开关
     */
    public clikcOnOff() {
        // cv.AudioMgr.playButtonSound('button_click');
        // this.onOff = !this.onOff;
        cv.MessageCenter.send("danmu_onOff", cv.tools.isShowBarrage());
        if (cv.tools.isShowBarrage()) {
            cv.TT.showMsg(cv.config.getStringData("Faceview_danmu_button_on"), cv.Enum.ToastType.ToastTypeWarning);
        } else {
            cv.TT.showMsg(cv.config.getStringData("Faceview_danmu_button_off"), cv.Enum.ToastType.ToastTypeWarning);
        }
        //this.updateCdStatus();
        cv.MessageCenter.send("updateCdStatus", (this._isInCd || !cv.tools.isShowBarrage()));
        // cv.tools.SaveStringByCCFile("danmu_onOff", this.onOff ? "1" : "0");
        // cc.find("danmu_ui/danmu_panel/on_off/button_On", this.node).active = this.onOff;
    }

    /**
     * 设置弹幕开关状态
     */
    setOnOff() {
        // let num = cv.tools.GetStringByCCFile("danmu_onOff");
        // this.onOff = !(num == "0");
        cc.find("danmu_ui/danmu_panel/on_off/button_On", this.node).active = cv.tools.isShowBarrage();
        cv.MessageCenter.send("updateCdStatus", (this._isInCd || !cv.tools.isShowBarrage()));
        //this.updateCdStatus();
    }

    /**
     * 根据是否处于cd中更新ui 或者弹幕功能是否已关闭
     */
    public updateCdStatus() {
        // let len = this.danmuUItexts.length;
        // for (let index = 0; index < len; index++) {
        //     if (this._isInCd || !this.onOff) {
        //         this.danmuUItexts[index].node.color = cc.Color.GRAY;
        //     } else {
        //         this.danmuUItexts[index].node.color = cc.color(229, 211, 141);
        //     }
        // }
    }

    /**
     * 显示ui
     */
    public showUi() {
        let isJackfruit = cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit;
        // if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
        //     isShow = JackfruitManager.tRoomData.nSelfSeatID != -1;
        // } else {
        //     isShow = cv.GameDataManager.tRoomData.i32SelfSeat != -1;
        // }
        this.roleHeadBg.active = !isJackfruit;

        if (isJackfruit) {
            this.scrollView.node.setContentSize(this.scrollView.node.getContentSize().width, 530 + 74);
            this.scrollView.node.setPosition(this.scrollView.node.x, this.scrollView.node.getContentSize().height / 2 + this.face_button.getContentSize().height);
        } else {
            this.scrollView.node.setContentSize(this.scrollView.node.getContentSize().width, 530);
            this.scrollView.node.setPosition(this.scrollView.node.x, this.scrollView.node.getContentSize().height / 2 + this.face_button.getContentSize().height);
        }
        this.danmu_ui.active = true;
        // this.face_button.active = isShow;
        // this.danmu_button.active = isShow;
        // if (isShow) {
        //     this.danmu_panel.getComponent(cc.Widget).bottom = 0;
        //     cc.find("uibg", this.danmu_ui).getComponent(cc.Widget).bottom = 0;

        // } else {
        //     this.danmu_panel.getComponent(cc.Widget).bottom = -73;
        //     cc.find("uibg", this.danmu_ui).getComponent(cc.Widget).bottom = -73;

        //     this.danmu_panel.active = true;
        //     this.face_panel.active = false;
        // }
        this.showRoleHead();
        this.updateEmotionNeedCoin();
        this.showScrollview();
        //立刻刷新widget
        cv.resMgr.adaptWidget(this.node, true);
    }

    /**
     * 更新国王表情金额
     */
    public updateEmotionNeedCoin() {
        for (let i = 0; i < this._faceLen; i++) {
            let goldNum = cc.find(cv.StringTools.formatC("face_%d/goldImg/goldText", i), this.face_panel).getComponent(cc.Label);
            let img = cc.find(cv.StringTools.formatC("face_%d/goldImg", i), this.face_panel);
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
                let num = JackfruitManager.tRoomData.fee.emotionFee2;
                if (num <= 0) {
                    img.active = false;
                    goldNum.node.active = false;
                }
                else {
                    img.active = true;
                    goldNum.node.active = true;
                    goldNum.string = cv.StringTools.serverGoldToShowString(num);
                }
            } else {
                let num = cv.GameDataManager.tRoomData.kingBee;
                if (num <= 0) {
                    img.active = false;
                    goldNum.node.active = false;
                }
                else {
                    img.active = true;
                    goldNum.node.active = true;
                    goldNum.string = cv.StringTools.serverGoldToShowString(num);
                }
            }

        }
    }
    /**
     *  hideUi
     */
    public hideUi() {
        this.danmu_ui.active = false;
    }

    /**
     * 显示可以被at的玩家头像
     */
    public showAtRoleHead() {
        for (let index = 0; index < 9; index++) {

        }
    }
    /**
    * 设置弹幕的父节点()
    * @param node 
    */
    public setParentNode(node: cc.Node) {
        if (node) {
            this._danmu_view = cc.instantiate(this.danmu_Panel_prefab);
            this._danmu_view.getComponent(DanmuView).setParentNode(node);
        }
    }

    public setDanmuChanel(pos: any) {
        if (this._danmu_view) {
            this._danmu_view.getComponent(DanmuView).setDanmuChanel(pos);
        }
    }

    public adjustDanmuMaxNumber(max: number) {
        if (this._danmu_view) {
            this._danmu_view.getComponent(DanmuView).adjustDanmuMaxNumber(max);
        }
    }
}