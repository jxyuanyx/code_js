import { CircleSprite } from "../../../common/tools/CircleSprite";
import { RemarkData } from "../../../data/userData";
import cv from "../../lobby/cv";
import { Card } from "./Card";
import GameDataManager from "./data/GameDataManager";
import { PlayerInfo } from "./data/RoomData";
import { GameChipsMove } from "./GameChipsMove";
import { GameScene } from "./GameScene";
import Tag from "../../../common/tools/Tag";
import { GameMain } from "./GameMain";
import { ActivityType } from "../../../data/activityData";
import { HashMap } from "../../../common/tools/HashMap";
import { headInfo } from "../../../common/tools/ResourceManager";

export class SeatCardInfo {
    scale: number = 1;
    angle: number = 0;
    position: cc.Vec2 = cc.Vec2.ZERO;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class Seat extends cc.Component {
    @property(cc.Node) public headBlock: cc.Node = null;
    @property(cc.Label) countDown_text: cc.Label = null; //倒计时读秒
    @property(cc.Node) practicalImg: cc.Node = null;//装粒子的图片
    @property(cc.Sprite) gps_img: cc.Sprite = null;
    @property(cc.Sprite) public role_img: cc.Sprite = null;
    @property(cc.Sprite) public remark_icon: cc.Sprite = null;
    @property(cc.Label) public roleName_text: cc.Label = null;//名字  这个只作为定义宽度，并没有实际作用
    @property(cc.Label) public roleName_text_forRemark: cc.Label = null;//名字
    @property(cc.Node) public number_text: cc.Node = null;
    @property(cc.Node) public number_action_panel: cc.Node = null;
    @property(cc.Node) public name_panel: cc.Node = null;
    @property(cc.Sprite) public chouma: cc.Sprite = null;//筹码数字图片整体
    @property(cc.Sprite) public chouma_img: cc.Sprite = null;
    @property(cc.Label) public chouma_text: cc.Label = null;//跟注数量
    @property(cc.Label) public money_text: cc.Label = null;//自己的乱码数量
    @property(cc.Label) public cardType_text: cc.Label = null;//牌形
    @property(cc.Label) public nobody_text: cc.Label = null;//空位文字
    @property(cc.Sprite) public tips: cc.Sprite = null;//提示
    @property(cc.Label) public tips_text: cc.Label = null;//提示文字
    @property(cc.Sprite) public headGrag_img: cc.Sprite = null;
    @property(cc.Label) public status_text: cc.Label = null;//弃，暂离，等待中  显示lable

    @property(cc.Node) public head_panel: cc.Node = null;
    @property(cc.Node) public roleHeadNode: cc.Node = null;
    @property(cc.Node) public roleHeadFrame: cc.Node = null;

    @property(cc.Node) public head_panel_self: cc.Node = null;  //玩家自己的头像
    @property(cc.Node) public roleHeadNode_self: cc.Node = null;
    @property(cc.Node) public roleHeadFrame_self: cc.Node = null;

    @property(cc.Sprite) public voice_img: cc.Sprite = null;//播放声音图片
    @property(cc.Node) public selfChipsText_img: cc.Node = null;//装有自己的筹码文本的背景图片
    @property(cc.Sprite) public red_img: cc.Sprite = null;
    @property(cc.Layout) public firePanel: cc.Layout = null;
    @property(cc.Sprite) public light_img: cc.Sprite = null;
    @property(cc.Sprite) public face_bg: cc.Sprite = null;
    @property(cc.ProgressBar) public progressBar: cc.ProgressBar = null;
    @property(cc.Prefab) prefab_card: cc.Prefab = null;
    @property(cc.Prefab) ChipsMoveprefab: cc.Prefab = null;

    @property(cc.Sprite) public buyin_sprite: cc.Sprite = null;
    @property(cc.Label) public buyin_text: cc.Label = null;//空位文字
    @property(cc.Prefab) public allinHeadPrefab: cc.Prefab = null;//allin动画
    @property(cc.Prefab) public allinHead2Prefab: cc.Prefab = null;//allin动画
    @property(cc.Prefab) public addtimePrefab: cc.Prefab = null;//延时动画

    @property(cc.Material) public normalSprite: cc.Material = null;//正常色
    @property(cc.Material) public graySprite: cc.Material = null;//灰色 sp.setMaterial(0,this.graySprite);

    // 红包动画
    @property(cc.Prefab) redpacketActionPrefab: cc.Prefab = null;
    private _redpacketActionNode: cc.Node = null;

    @property(cc.Node) public winRateNode: cc.Node = null;//胜率节点

    //筹码ui   没有轮到自己操作的时候
    protected _selfChipsText_normal_Posy = -111;
    //轮到自己操作的时候
    protected _selfChipsText_onSelfTurn_Posy = -111 - 18;
    protected _allin_action0: cc.Node = null;
    protected _allin_action1: cc.Node = null;
    protected _addtime_action: cc.Node = null;

    public m_pkChipsMove: GameChipsMove = null;
    public spine: sp.Skeleton = null;
    public thinkCdTime: number = 0;//服务器传过来的时间
    public time: number = 100;
    public MaxTime: number = 10;
    public htime: number = 0;
    public leaveTime: number = 0;
    public serverId: number = 0;//按照服务端给过的的列表顺序初始化的ID
    public SeatViewId: number = 0;//视图椅子号
    public playerLength: number = 0;    // 当前椅子是几人桌类型的椅子
    public ShowDownCount: number = 0;
    public seatType: number = 0;//椅子类型，游戏中和游戏回放中0：游戏中 1 回放中
    public direction: number = 0;//视图方位
    public ReplayPlayerCount: number = 0;

    public emitfire: any = null;
    public SeatPreViewId: number = 0;//视图上一次旋转的椅子号记录
    public datas: string[] = [];
    public voiceImgList: cc.Node[] = [];
    public m_bIsShake: boolean;
    public m_kInitPos: cc.Vec2 = null;

    public gray: cc.Color = cc.color(150, 150, 150);
    public grayText: cc.Color = cc.color(127, 127, 127);
    public unGray: cc.Color = cc.color(255, 255, 255);

    public CHOUMA0: cc.Vec2 = cc.v2(145, 31);//椅子在左边中下时，筹码的位置
    public CHOUMA1: cc.Vec2 = cc.v2(145, -8);//椅子在左上时，筹码的位置
    public CHOUMA2: cc.Vec2 = cc.v2(4, -180);//椅子在顶部左边时，筹码的位置

    public REPLAY_CHOUMA0: cc.Vec2 = cc.v2(0, 150);//椅子在下面时，筹码的位置
    public REPLAY_CHOUMA1: cc.Vec2 = cc.v2(120, -15);//椅子在左边时，筹码的位置

    public GPS_POSX = 46;//头像在左边的时候GPS的位置

    public DRICTION_TOP_TIPSLEFT = 67;//椅子上面时，提示的位置  seastyple=120
    // public DRICTION_TOP_TIPSLEFT_MENDSTRADDLE = 70;//
    public VOICEIMG_POSX = 103;

    public m_pkTempHead: CircleSprite = null;//头像

    public speakTime: number = 0;
    public blinkTime: number = 2;

    public chipsNum: number = 0;

    public seat_status: number = 0;

    public actionType: number = 0;

    public effect: cc.Node = null;

    public PlayerInfo: PlayerInfo;

    public isShowDown: boolean;

    public game: GameScene;
    public gameMains: GameMain;


    private bOwnerSeat: boolean = false;  //是否是自己的座位

    //汽泡路径
    protected bubbleTips_path: string = "zh_CN/game/dzpoker/ui/bubble/game_Button_Tips_";
    //spine::SkeletonAnimation*  _skeletonNode=nullptr;
    //std::map<int, spine::SkeletonAnimation*> spineList;

    protected headBlockPos: cc.Vec2 = null;
    protected winRatePos: cc.Vec2 = null;
    protected mainPool: cc.Node;
    private getGpsFunc: Function = null;

    protected _cardsInfoMap: HashMap<number, SeatCardInfo[]> = new HashMap();
    protected _showCardsInfoMap: HashMap<number, SeatCardInfo[]> = new HashMap();

    protected m_seatHandsCardType = cv.Enum.SeatHandsCardType.SHCT_NONE;        // 座位手牌类型
    protected m_card_panel: cc.Node = null;                                     // 牌组面板

    protected m_pkCards: Card[] = [];                                           // 角标牌组
    protected m_pkCards_srcPos: cc.Vec2[] = [];                                 // 角标牌组原始位置
    protected m_pkCards_srcAngle: number[] = [];                                // 角标牌组原始角度

    protected m_pkShowCards: Card[] = [];                                       // 显示牌组
    protected m_pkShowCards_srcPos: cc.Vec2[] = [];                             // 显示牌组原始位置
    protected m_pkShowCards_srcAngle: number[] = [];

    protected m_roleNameTxt_srcPos: cc.Vec2 = cc.Vec2.ZERO;                     // 昵称原始位置(Plo因为手牌大小/动画等原因要临时修改昵称位置)
    protected m_countDownTxt_srcFontSize: number = 0;                           // 计时文本原始字体大小

    onLoad() {
        for (let i: number = 0; i < 3; i++) {
            let img: cc.Node = cc.find("voice_img_icon/voice_" + i, this.voice_img.node);
            this.voiceImgList.push(img);
        }

        this.headBlockPos = this.headBlock.getPosition();
        this.winRatePos = this.winRateNode.getPosition();

        this.tips.node.active = false;
        this.chouma.node.active = false;
        this.number_text.active = false;
        this.winRateNode.active = false;
        this.head_panel_self.active = false;
        this.bOwnerSeat = false;
        this.number_action_panel.removeAllChildren();
        this.number_action_panel.destroyAllChildren();

        this.countDown_text.node.color = cc.color(255, 255, 255);
        this.m_countDownTxt_srcFontSize = this.countDown_text.fontSize;
        this.countDown_text.enableBold = true;
        this.initRedPacketAction();
        // 实例化牌组对象
        this.instCardsInfo();

        // 筹码
        this.m_pkChipsMove = cc.instantiate(this.ChipsMoveprefab).getComponent('GameChipsMove');
        this.node.addChild(this.m_pkChipsMove.node);
        this.m_pkChipsMove.setSeat(this);

        // 清空座位状态
        this.actionType = cv.Enum.ActionType.Enum_Action_Null;
        this.setSeatEmpty();

        // 保存"昵称"原始位置
        this.m_roleNameTxt_srcPos = cc.v2(this.roleName_text.node.position);

        // 监听事件
        cv.MessageCenter.register("on_update_self_stake", this.OnUpdateSelfStake.bind(this), this.node);
        cv.MessageCenter.register("update_remarks", this.OnUpdate_remarks.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.OnChangeLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("on_update_self_stake", this.node);
        cv.MessageCenter.unregister("update_remarks", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    start() {
        this.nobody_text.string = cv.config.getStringData("Seat_role_img_nobody_text");
    }

    initRedPacketAction() {
        this._redpacketActionNode = cc.instantiate(this.redpacketActionPrefab);
        this.node.addChild(this._redpacketActionNode);
        this._redpacketActionNode.active = false;
    }

    updataRedPacketActionPos() {
        this._redpacketActionNode.setPosition(this.role_img.node.getPosition());
    }

    /**
     * 实例化牌组对象
     */
    protected instCardsInfo(): void {
        // 实例化牌组
        let card_panel: cc.Node = this.node.getChildByName("card_panel");
        let card_panel_plo: cc.Node = this.node.getChildByName("card_panel_plo");

        // clone
        this.m_card_panel = cc.instantiate(card_panel);
        this.m_card_panel.active = true;
        this.m_card_panel.destroyAllChildren();
        this.m_card_panel.removeAllChildren(true);
        card_panel.parent.addChild(this.m_card_panel);

        let cardPanelMap: HashMap<number, cc.Node> = new HashMap();
        if (card_panel) cardPanelMap.add(cv.Enum.SeatHandsCardType.SHCT_TEXAS, card_panel);
        if (card_panel_plo) cardPanelMap.add(cv.Enum.SeatHandsCardType.SHCT_PLO, card_panel_plo);

        cardPanelMap.forEach((type: number, panel: cc.Node): void => {
            let cardsInfo: SeatCardInfo[] = [];
            let showCardsInfo: SeatCardInfo[] = [];
            let childrenCount: number = panel.childrenCount;
            for (let i = 0; i < childrenCount; ++i) {
                let card: cc.Node = panel.getChildByName(`cardBg${i}`);
                let showCard: cc.Node = panel.getChildByName(`card${i}`);

                if (card) {
                    let t: SeatCardInfo = new SeatCardInfo();
                    t.scale = card.scale;
                    t.angle = card.angle;
                    t.position.set(card.position);
                    cardsInfo.push(t);
                }

                if (showCard) {
                    let t: SeatCardInfo = new SeatCardInfo();
                    t.scale = showCard.scale;
                    t.angle = showCard.angle;
                    t.position.set(showCard.position);
                    showCardsInfo.push(t);
                }
            }

            this._cardsInfoMap.add(type, cardsInfo);
            this._showCardsInfoMap.add(type, showCardsInfo);

            panel.removeFromParent(true);
            panel.destroy();
        });
    }

    /**
     * 初始化手牌数据(可重复调用)
     * @param style  手牌类型(不同类型对应不同手牌数量， 参照"cv.Enum.SeatHandsCardType", 默认德州)
     */
    public initHandCards(type: number = cv.Enum.SeatHandsCardType.SHCT_TEXAS): void {
        if (this.m_seatHandsCardType === type) return;

        let cardsInfos: SeatCardInfo[] = this._cardsInfoMap.get(type);
        let showCardsInfos: SeatCardInfo[] = this._showCardsInfoMap.get(type);
        if (!cardsInfos || !showCardsInfos) return;

        // 设置风格
        this.m_seatHandsCardType = type;

        // 清空数据
        this.m_pkCards = [];
        this.m_pkCards_srcPos = [];
        this.m_pkCards_srcAngle = [];

        this.m_pkShowCards = [];
        this.m_pkShowCards_srcPos = [];
        this.m_pkShowCards_srcAngle = [];

        // 清空子节点
        this.m_card_panel.destroyAllChildren();
        this.m_card_panel.removeAllChildren(true);

        // 填充"m_pkCards"数据
        for (let i = 0; i < cardsInfos.length; ++i) {
            let t: Card = cc.instantiate(this.prefab_card).getComponent(Card);
            t.node.active = false;
            t.node.scale = cardsInfos[i].scale;
            t.rootNode.angle = cardsInfos[i].angle;
            t.node.setPosition(cardsInfos[i].position);
            t.initDefaultValue();

            this.m_pkCards.push(t);
            this.m_pkCards_srcAngle.push(t.rootNode.angle);
            this.m_pkCards_srcPos.push(cc.v2(t.node.position));
            this.m_card_panel.addChild(t.node, cardsInfos.length - i);
        }

        // 填充"m_pkShowCards"数据
        for (let i = 0; i < showCardsInfos.length; ++i) {
            let t: Card = cc.instantiate(this.prefab_card).getComponent(Card);
            t.node.active = false;
            t.node.scale = showCardsInfos[i].scale;
            t.rootNode.angle = showCardsInfos[i].angle;
            t.node.setPosition(showCardsInfos[i].position);
            t.initDefaultValue();

            this.m_pkShowCards.push(t);
            this.m_pkShowCards_srcAngle.push(t.rootNode.angle);
            this.m_pkShowCards_srcPos.push(cc.v2(t.node.position));
            this.m_card_panel.addChild(t.node);
        }
    }

    /**
     * 适配手牌位置等(主要针对于"Plo")
     */
    public adaptHandCards(): void {
        if (this.m_seatHandsCardType !== cv.Enum.SeatHandsCardType.SHCT_PLO) return;

        let offset_x: number = 0;
        let offset_y: number = 0;

        switch (this.direction) {
            case cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN:         // 左边中和中下
            case cv.Enum.SeatDriction.DRICTION_LEFT_UP: {               // 左边中上
                offset_x = 40;
            } break;

            case cv.Enum.SeatDriction.DRICTION_TOP_LEFT: {              // 顶部左边(9人桌是顶部左, 其余是顶部)
                if (this.playerLength === 9) offset_x = 40;
            } break;

            case cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN:        // 右边中和中下
            case cv.Enum.SeatDriction.DRICTION_RIGHT_UP:                // 右边中上
            case cv.Enum.SeatDriction.DRICTION_TOP_RIGHT: {             // 顶部右边
                offset_x = -40;
            } break;

            case cv.Enum.SeatDriction.DRICTION_BOTTOM: break            // 最下面
            default: break;
        }

        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            let pos: cc.Vec2 = this.m_pkShowCards_srcPos[i];
            this.m_pkShowCards[i].node.setPosition(pos.x + offset_x, pos.y + offset_y);
        }
    }

    /**
     * 获取座位手牌类型
     */
    public getSeatHandsCardType(): number {
        return this.m_seatHandsCardType;
    }

    /**
     * name
     */
    public OnChangeLanguage() {
        this.nobody_text.string = cv.config.getStringData("Seat_role_img_nobody_text");
    }

    public setMainPool(pool: cc.Node) {
        this.mainPool = pool;
    }

    public showCardType(cName, f32Delta = 0) {
        let pkDealy = cc.delayTime(f32Delta);
        let pkCall = cc.callFunc(this.RealShowCardType.bind(this), this, cName);
        let pkSeq = cc.sequence(pkDealy, pkCall);
        this.node.runAction(pkSeq);
    }

    public RealShowCardType(target, cName: string) {
        this.cardType_text.node.active = true;
        this.cardType_text.string = cName;
        this.money_text.node.active = false;
        //cc.find("allintag", this.selfChipsText_img.node).active = false;
    }

    /**
     * 设置"牌型"等控件信息(目前针对奥马哈需求)
     * @param txtColor  牌型文本颜色
     * @param imgPath   牌型文本底图路径
     */
    public setCardTypeCtlInfo(txtColor: cc.Color, imgPath: string): void {
        this.cardType_text.node.color = txtColor;
        let common_shuzi_di: cc.Node = this.selfChipsText_img.getChildByName("common_shuzi_di");
        cv.resMgr.setSpriteFrame(common_shuzi_di, imgPath);
    }

    /**
     * 复原"牌型/昵称"等控件信息
     */
    private resetCardTypeCtlInfo(): void {
        let color: cc.Color = cc.Color.WHITE;
        let fileName: string = "game/dzpoker/ui_seaStyle/seat/common_shuzi_di";
        this.setCardTypeCtlInfo(color, cv.config.getLanguagePath(fileName, cv.Enum.LANGUAGE_TYPE.zh_CN));

        if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
            this.roleName_text.node.setPosition(cc.v2(this.m_roleNameTxt_srcPos.x, this.m_roleNameTxt_srcPos.y + 22));
        } else {
            this.roleName_text.node.setPosition(this.m_roleNameTxt_srcPos);
        }
    }

    /**
     *更换ui样式
     */
    updateStyle() {

        // let isSeaStyle = this.gameMains.isSeaStyle();
        // cc.find("common_shuzi_di_seaStyle", this.selfChipsText_img).active = isSeaStyle;
        // cc.find("common_shuzi_di", this.selfChipsText_img).active = !isSeaStyle;
        // let str = isSeaStyle ? "ui_seaStyle/uibg/bg_avatar_player_empty" : "ui/common_Head_02";
        // let path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s", str);
        // cv.resMgr.setSpriteFrame(this.role_img.node, path);
        // str = isSeaStyle ? "ui_seaStyle/uibg/bg_avatar_player" : "ui/common_Head_02";
        // path = cv.StringTools.formatC("zh_CN/game/dzpoker/%s", str);
        // cv.resMgr.setSpriteFrame(this.roleHeadNode, path);
        // if (this.chouma_text.node.active) {
        //     this.chouma_text.node.color = isSeaStyle ? cc.color(255, 232, 107) : cc.Color.WHITE;
        // } else {
        //     this.chouma_text.node.opacity = 0;
        //     this.chouma_text.node.active = true;
        //     this.chouma_text.node.color = isSeaStyle ? cc.color(255, 232, 107) : cc.Color.WHITE;
        //     this.chouma_text.node.opacity = 255;
        //     this.chouma_text.node.active = false;
        // }
    }
    /**
     * 获取金额背景宽度
     */
    public getChipsbgSize(): cc.Size {
        return this.selfChipsText_img.getContentSize();
    }

    public onClickSelf(evt: any) {
        this.sitDown(evt);
    }

    public sitDown(evt: any = null) {
        if (this.game.gameSeatIsTurning) {
            cv.GameDataManager.tRoomData.u32PrePickSeatId = this.getSeverId();
            return;
        }


        if (this.seat_status != cv.Enum.SeatStatus.SeatStatus_empty) {
            cv.MessageCenter.send("showRoleInfoView", this.serverId);
            return;
        }

        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1)
            return;//点击空位 但玩家自己已经坐下

        if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_anti_cheat || !cv.GameDataManager.tRoomData.pkRoomParam.anti_simulator) {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                if (!cv.native.HaveGps(false)) {
                    this.getGpsFunc = () => { this.sitDown(evt); }
                    cv.MessageCenter.register("on_haveGPS_result", this.GpsCallBack.bind(this), this.node);
                    cv.native.HaveGps();
                    return;
                }
            }
            else {
                if (!cv.native.HaveGps()) {
                    cv.TT.showMsg(cv.config.getStringData("ErrorToast30"), cv.Enum.ToastType.ToastTypeWarning);
                    return;
                }
            }
        }
        for (let i: number = 0; i < cv.GameDataManager.tRoomData.kTablePlayerList.length; i++) {
            let pkPlayer = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer.name == cv.dataHandler.getUserData().nick_name)//|| (SEStrcmp(pkPlayer.name().c_str(), "") == 0)
            {
                cv.TT.showMsg(cv.config.getStringData("SitDownErrorToast1"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        }
        if (!cv.GameDataManager.tRoomData.pkRoomParam.anti_simulator && cv.native.showSimulatorTips(cv.GameDataManager.tRoomData.pkRoomParam.anti_simulator_ignore_cond, true)) {
            return;
        }

        if (!cv.dataHandler.getActivityData().haveAvatar(true, ActivityType.GameAvatar)) {
            cv.dataHandler.getActivityData().AvatarCallBack = this.avatarCallBack.bind(this);
            return;
        }

        cv.GameDataManager.tRoomData.u32PrePickSeatId = this.getSeverId();
        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
            if (GameDataManager.tRoomData.pkRoomParam.buyin_password === "") {
                cv.aofNet.RequestSitdown(cv.GameDataManager.tRoomData.u32RoomId, this.getSeverId());
            }
            else {
                cv.aofNet.RequestCheckFirstBuyin(cv.GameDataManager.tRoomData.u32RoomId);
            }
        } else {
            if (GameDataManager.tRoomData.pkRoomParam.buyin_password === "") {

                let _GameID = cv.roomManager.getCurrentGameID();
                if (cv.roomManager.checkGameIsZoom(_GameID)) {
                    if (evt != null && this.getSeatViewId() != 0) {
                        return;
                    }
                }
                cv.gameNet.RequestSitdown(cv.GameDataManager.tRoomData.u32RoomId, this.getSeverId());
            }
            else {
                cv.gameNet.RequestCheckFirstBuyin(cv.GameDataManager.tRoomData.u32RoomId);
            }
        }

    }
    public setThankCdTime(cdTime: number, cbBlinkTime: number) {
        this.thinkCdTime = cdTime;
        this.blinkTime = cbBlinkTime;
    }
    public setStake(u64Stake: number) {
        let stake = cv.StringTools.clientGoldByServer(u64Stake);
        this.money_text.node.active = true;
        this.money_text.string = cv.StringTools.numberToShowString(stake);
        this.cardType_text.node.active = false;
        if (this.money_text.string.length >= 8) {
            this.money_text.fontSize = 38;
            this.selfChipsText_img.setContentSize(cc.size(186, 55));
            //this.money_text.node.setPosition(93);
        }
        else {
            this.money_text.fontSize = 40;
            this.selfChipsText_img.setContentSize(cc.size(176, 55));
            //this.money_text.node.setPosition(88);
        }
    }
    public addStake(u64Stake: number) {
        let stake = cv.StringTools.clientGoldByServer(u64Stake);
        this.money_text.string = cv.StringTools.numberToShowString(cv.StringTools.showStringToNumber(this.money_text.string) + stake);


        if (this.money_text.string.length >= 8) {
            this.money_text.fontSize = 38;
            this.selfChipsText_img.setContentSize(cc.size(186, 55));
            //this.money_text.node.setPosition(93);
        }
        else {
            this.money_text.fontSize = 40;
            this.selfChipsText_img.setContentSize(cc.size(176, 55));
            //this.money_text.node.setPosition(88);
        }
    }
    public Bet(num: number, btype: number = cv.Enum.BType.BType_Bet) {
        let Layer = this.mainPool;
        if (btype == cv.Enum.BType.BType_Call) {
            this.chipsNum += num;
        }
        else {
            this.chipsNum = num;
        }

        if (this.chipsNum != 0) {
            this.m_pkChipsMove.MoveIn();
            if (cv.tools.isSoundEffectOpen()) {
                cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/chips_to_table");
            }
        }
    }

    public showDown(eIndex: number) {
        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.active = false;
        }

        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            this.m_pkShowCards[i].node.active = true;
        }

        if (eIndex === 0) {
            for (let i = 0; i < this.m_pkShowCards.length; ++i) {
                if (!this.m_pkShowCards[i].isFace()) {
                    this.m_pkShowCards[i].turn(0.3, true);
                }
            }

            this.isShowDown = true;
        }
        else if (eIndex > 0) {
            let idx: number = Math.floor(eIndex - 1);
            if (idx < 0 || idx >= this.m_pkShowCards.length) return;

            if (!this.m_pkShowCards[idx].isFace()) {
                this.m_pkShowCards[idx].turn(0.3, true);
            }
        }
    }

    public OnUpdateSelfStake(pkSender: any) {
        let SeatId: number = pkSender.seatid;
        if (pkSender.playerid == cv.dataHandler.getUserData().u32Uid) {
            if (this.getSeverId() == SeatId) {
                this.money_text.string = cv.StringTools.serverGoldToShowString(cv.GameDataManager.tRoomData.u32Stake);

                if (cv.GameDataManager.tRoomData.u32Stake >= 10000000) {
                    this.money_text.fontSize = 38;
                    this.selfChipsText_img.setContentSize(cc.size(186, 55));
                    //this.money_text.node.setPosition(93);
                }
                else {
                    this.money_text.fontSize = 40;
                    this.selfChipsText_img.setContentSize(cc.size(176, 55));
                    //this.money_text.node.setPosition(88);
                }
                this.money_text.node.active = true;
                this.cardType_text.node.active = false;
            }
        } else {
            if (this.getSeverId() == SeatId && this.PlayerInfo != null) {
                let stake = this.PlayerInfo.stake;
                this.money_text.string = cv.StringTools.serverGoldToShowString(stake);
                if (stake >= 10000000) {
                    this.money_text.fontSize = 38;
                    this.selfChipsText_img.setContentSize(cc.size(186, 55));
                    //this.money_text.node.setPosition(93);
                }
                else {
                    this.money_text.fontSize = 40;
                    this.selfChipsText_img.setContentSize(cc.size(176, 55));
                    //this.money_text.node.setPosition(88);
                }
                this.money_text.node.active = true;
                this.cardType_text.node.active = false;
            }
        }

    }

    public setSeverId(id: number) {
        this.serverId = id;
        this.m_pkChipsMove.node.name = id.toString();
    }

    public getSeverId() {
        return this.serverId;
    }

    public showChips() {
        this.chouma_text.node.active = true;
        this.chouma.node.active = (this.chipsNum != 0);
        let offsetX = 0
        if (this.seatType === cv.Enum.SeatType.SeatType_FavorReplaySeat) {
            if (this.PlayerInfo.playerid == cv.dataHandler.getUserData().u32Uid) {
                offsetX = 40;
                this.chouma.node.setPosition(cc.v2(this.CHOUMA0.x + offsetX, this.CHOUMA0.y));
            }
        }

        cv.resMgr.getLabelStringSize(this.chouma_text, cv.StringTools.serverGoldToShowString(this.chipsNum)).width;
        this.updateReplayChisPos();
    }

    public showChipsNow(roundBet: number) {
        this.chipsNum = roundBet;
        this.chouma_text.node.active = true;
        cv.resMgr.getLabelStringSize(this.chouma_text, cv.StringTools.serverGoldToShowString(this.chipsNum)).width;
        this.chouma.node.active = (this.chipsNum != 0);

        if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
            if (this.chipsNum > 100000) {
                this.chouma_text.fontSize = 34;
            } else {
                this.chouma_text.fontSize = 41;
            }
        }
        this.updateReplayChisPos();
    }

    public setLeaveCdTime(time: number) {
        this.leaveTime = time;
    }

    public getSeatViewId() {
        return this.SeatViewId;
    }

    public resetCardPos() {
        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.setPosition(this.m_pkCards_srcPos[i]);
            this.m_pkCards[i].rootNode.angle = this.m_pkCards_srcAngle[i];
        }
    }

    public setGameScene(game: GameScene) {
        this.game = game;
    }

    public setGameMain(gameMain: GameMain) {
        this.gameMains = gameMain;
    }

    public isGameStarSeat(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat;
    }

    public setData(playerInfo: PlayerInfo) {

        this.PlayerInfo = playerInfo;

        if (playerInfo.playerid == cv.dataHandler.getUserData().u32Uid && !this.isGameStarSeat() && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
            //判断该玩家座位是不是自己
            this.bOwnerSeat = true;
            this.headGrag_img.node.setContentSize(cc.size(156, 156));
            this.role_img.node.setContentSize(cc.size(172, 172));
            this.voice_img.node.setContentSize(cc.size(153,153));
        } else {
            if (!this.isGameStarSeat()) {
                this.headGrag_img.node.setContentSize(cc.size(134, 134));
                this.role_img.node.setContentSize(cc.size(146, 146));
                this.voice_img.node.setContentSize(cc.size(132,132));
            }
            this.bOwnerSeat = false;
        }

        this._setHeadPanelView(true);
        // let posy = (playerInfo.playerid == cv.dataHandler.getUserData().u32Uid) ? this._selfChipsText_player_Posy : this._selfChipsText_ob_Posy;
        // this.selfChipsText_img.setPosition(cc.v2(this.selfChipsText_img.x, posy));
    }

    public getData(): PlayerInfo {
        return this.PlayerInfo;
    }

    //根据方位设置坐位视图
    public setSeatViewId(viewId: number, playerLength: number, SeatType: number = 0) {
        this.SeatViewId = viewId;
        this.playerLength = playerLength;
        let isDoubel: boolean = (playerLength % 2 == 0);//人数就单数还是双数
        let midId: number = Math.floor(playerLength / 2);//中间椅子号
        this.seatType = SeatType;
        if (this.SeatViewId == 0) {
            this.direction = cv.Enum.SeatDriction.DRICTION_BOTTOM;
        }
        else if (isDoubel) {
            if (playerLength <= 4) {
                if (this.SeatViewId < midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_LEFT;
                }
                else {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
            }
            else {
                if (this.SeatViewId == midId - 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_LEFT;
                }
                else if (this.SeatViewId == (midId + 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
                else if (this.SeatViewId < midId - 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN;
                }
                else if (this.SeatViewId > (midId + 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN;
                }
            }
        }
        else {
            if (playerLength <= 5) {
                if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == midId + 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
                else if (this.SeatViewId < midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN;
                }
                else if (this.SeatViewId > (midId + 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN;
                }
            }
            else {
                if (this.SeatViewId == midId) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_LEFT;
                }
                else if (this.SeatViewId == midId + 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_TOP_RIGHT;
                }
                else if (this.SeatViewId == midId - 1) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_UP;
                }
                else if (this.SeatViewId == (midId + 2)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_UP;
                }
                else if (this.SeatViewId < (midId - 1)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN;
                }
                else if (this.SeatViewId > (midId + 2)) {
                    this.direction = cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN;
                }
            }

        }
        this.updateView();
    }


    public updateChipPosBySeatStatus(bShowBottom: boolean = false) {

        if (this.direction != cv.Enum.SeatDriction.DRICTION_BOTTOM) {
            return;
        }

        if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {

            let pkSelfCard = this.gameMains.getPkSelfCard();

            if ((pkSelfCard && pkSelfCard[0].node.active && this.seat_status > cv.Enum.SeatStatus.SeatStatus_leave_a_monment) || bShowBottom) {
                //在发牌后，自己的金币筹码要在手牌下面
                if (cv.config.IS_WIDESCREEN) {
                    this.setSelfChipsPos(this._selfChipsText_onSelfTurn_Posy - 335);
                } else {
                    this.setSelfChipsPos(this._selfChipsText_onSelfTurn_Posy - (cv.config.IS_FULLSCREEN? 278:265));
                }
            } else {
                this.setSelfChipsPos(this._selfChipsText_onSelfTurn_Posy - 15);
            }
        } else {
            //其它状态下，自己的金币筹码在头像下面

            this.setSelfChipsPos(this._selfChipsText_normal_Posy);
        }
    }

    public updateView() {

        let isDoubel: boolean = (this.playerLength % 2 == 0);//人数就单数还是双数
        let offsetRate_x = 0;
        if (this.m_seatHandsCardType === cv.Enum.SeatHandsCardType.SHCT_PLO) {  //PLO牌局 胜率x坐标要微调
            offsetRate_x = 80;
        }
        this.setSelfChipsPos(this._selfChipsText_normal_Posy);
        if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(this.CHOUMA0.x + 13, this.CHOUMA0.y + 12);
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));

                if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                    //如果是房间里面的自己头像 因为自己头像比较大
                    this.tips.node.setPosition(cc.v2(-this.DRICTION_TOP_TIPSLEFT - 15, this.tips.node.getPosition().y));
                } else {
                    this.tips.node.setPosition(cc.v2(-this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
                }

                this.updateChipPosBySeatStatus();

                this.tips.node.setScale(-1, 1);
                this.tips_text.node.setScale(-1, 1);

                if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                    this.roleName_text.node.y = this.m_roleNameTxt_srcPos.y + 22;
                }
            }
            else {
                this.setReplayChisPos();

                this.tips.node.setPosition(cc.v2(this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
                this.tips.node.setScale(1, 1);
                this.tips_text.node.setScale(1, 1);
            }


            // this.voice_img.node.setPosition(cc.v2(this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            // this.voice_img.node.scaleX = 0.6;
            this.gps_img.node.setPosition(cc.v2(-this.GPS_POSX, this.gps_img.node.getPosition().y));

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this.headBlock.setPosition(this.headBlockPos.x - 15, this.headBlockPos.y);
            } else {
                this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);
            }


            let _winRateOffsetY = this.roleName_text.node.getContentSize().height / 2;
            if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                //自己的头像
                _winRateOffsetY = this.roleName_text.node.getContentSize().height;
            }
            this.winRateNode.setPosition(this.role_img.node.x, this.red_img.node.y + this.red_img.node.getContentSize().height / 2 + _winRateOffsetY);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(this.CHOUMA1);
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[this.m_pkCards_srcAngle.length - 1 - i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            //this.voice_img.node.setPosition(cc.v2(this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            this.voice_img.node.scaleX = 1;
            this.gps_img.node.setPosition(cc.v2(-this.GPS_POSX, this.gps_img.node.getPosition().y));

            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(this.winRatePos.x + offsetRate_x, this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(this.CHOUMA1);
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[this.m_pkCards_srcAngle.length - 1 - i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            //this.voice_img.node.setPosition(cc.v2(this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            this.voice_img.node.scaleX = 1;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gps_img.node.getPosition().y));
            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(this.winRatePos.x + offsetRate_x, this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(cc.v2(-this.CHOUMA1.x, this.CHOUMA1.y));
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            // 若是桌面或战绩回放, 且是9人桌, 右下角的tip若是朝左边显示会和左侧位置上的tips重叠, 因此过滤下朝右显示
            if (this.seatType == cv.Enum.SeatType.SeatType_ReplaySeat && this.SeatViewId === 8) {
                this.tips.node.setPosition(cc.v2(this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
                this.tips.node.setScale(1, 1);
                this.tips_text.node.setScale(1, 1);
            }
            else {
                this.tips.node.setPosition(cc.v2(-this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
                this.tips.node.setScale(-1, 1);
                this.tips_text.node.setScale(-1, 1);
            }

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            //this.voice_img.node.setPosition(cc.v2(-this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            this.voice_img.node.scaleX = -1;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gps_img.node.getPosition().y));
            this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);
            this.winRateNode.setPosition(-(this.winRatePos.x + offsetRate_x), this.winRatePos.y);
        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(cc.v2(-this.CHOUMA1.x, this.CHOUMA1.y));
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(-this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
            this.tips.node.setScale(-1, 1);
            this.tips_text.node.setScale(-1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            //this.voice_img.node.setPosition(cc.v2(-this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            this.voice_img.node.scaleX = -1;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gps_img.node.getPosition().y));
            this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);

            this.winRateNode.setPosition(-(this.winRatePos.x + offsetRate_x), this.winRatePos.y);

        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(this.CHOUMA2);
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[this.m_pkCards_srcAngle.length - 1 - i];
                this.m_pkCards[i].node.setPosition(-pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            //this.voice_img.node.setPosition(cc.v2(this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            this.voice_img.node.scaleX = 1;
            this.gps_img.node.setPosition(cc.v2(-this.GPS_POSX, this.gps_img.node.getPosition().y));
            this.headBlock.setPosition(-this.headBlockPos.x, this.headBlockPos.y);
            if (isDoubel || (!isDoubel && this.playerLength > 6)) { //偶数桌 或者奇数桌人数>6 胜率放在头像下面
                this.winRateNode.setPosition(this.selfChipsText_img.x, this.selfChipsText_img.y - this.selfChipsText_img.getContentSize().height - 5);
            } else {
                this.winRateNode.setPosition(this.winRatePos.x + offsetRate_x, this.winRatePos.y);
            }

        }
        else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
            if (this.seatType == cv.Enum.SeatType.SeatType_GameSeat || this.seatType == cv.Enum.SeatType.SeatType_FavorReplaySeat) {
                this.chouma.node.setPosition(this.CHOUMA2);
                this.chouma_text.node.setPosition(cc.v2(0, -41));
                this.chouma_img.node.setPosition(cc.v2(0, 0));
            }
            else {
                this.setReplayChisPos();
            }

            this.tips.node.setPosition(cc.v2(-this.DRICTION_TOP_TIPSLEFT, this.tips.node.getPosition().y));
            this.tips.node.setScale(-1, 1);
            this.tips_text.node.setScale(-1, 1);

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                let pos: cc.Vec2 = this.m_pkCards_srcPos[i];
                let angle: number = this.m_pkCards_srcAngle[i];
                this.m_pkCards[i].node.setPosition(pos.x, pos.y);
                this.m_pkCards[i].rootNode.angle = angle;
                this.m_pkCards[i].setDealRotate(angle);
            }

            //this.voice_img.node.setPosition(cc.v2(-this.VOICEIMG_POSX, this.voice_img.node.getPosition().y));
            this.voice_img.node.scaleX = -1;
            this.gps_img.node.setPosition(cc.v2(this.GPS_POSX, this.gps_img.node.getPosition().y));
            this.headBlock.setPosition(this.headBlockPos.x, this.headBlockPos.y);

            if (!isDoubel && this.playerLength > 6) { //奇数桌人数>6 胜率放在头像下面
                this.winRateNode.setPosition(this.selfChipsText_img.x, this.selfChipsText_img.y - this.selfChipsText_img.getContentSize().height - 5);
            } else {
                this.winRateNode.setPosition(-(this.winRatePos.x + offsetRate_x), this.winRatePos.y);
            }
        }

        this.m_kInitPos = this.node.getPosition();

        this.m_pkChipsMove.node.setPosition(cc.v2(this.chouma.node.getPosition().x - this.chouma.node.getContentSize().width / 2 + this.chouma_img.node.getPosition().x, this.chouma.node.getPosition().y));

        let tempPos: cc.Vec2 = cc.Vec2.ZERO;
        this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);
        this.m_pkChipsMove.SetFadeInPos(tempPos);

        let Layer: cc.Node = this.mainPool;
        Layer.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos);

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].setDealPos(tempPos);
        }

        // 调整手牌整体位置
        this.adaptHandCards();
    }

    public ShakeSeat() {
        this.node.stopActionByTag(88);
        this.node.setScale(1);
        let Shake = cc.sequence(cc.scaleTo(0.05, 1.1), cc.scaleTo(0.15, 1));
        Shake.setTag(88);
        this.node.runAction(Shake);
    }
    public setReplayChisPos() {
        this.chouma_text.node.setPosition(cc.v2(0, 0));
        this.chouma_img.node.setPosition(cc.v2(0, 0));
        if (this.ReplayPlayerCount == 2) {

            if (this.SeatViewId == 0) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 1) {
                this.chouma.node.setPosition(cc.v2(this.REPLAY_CHOUMA0.x, -this.REPLAY_CHOUMA0.y - 28));
            }
        }
        else if (this.ReplayPlayerCount == 3) {
            if (this.SeatViewId == 0) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 1) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 2) {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
        else if (this.ReplayPlayerCount == 4) {
            if (this.SeatViewId == 0) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 1) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 2) {
                this.chouma.node.setPosition(cc.v2(this.REPLAY_CHOUMA0.x, -this.REPLAY_CHOUMA0.y - 28));
            }
            else if (this.SeatViewId == 3) {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
        else if (this.ReplayPlayerCount == 5) {
            if (this.SeatViewId == 0) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 1 || this.SeatViewId == 2) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 3 || this.SeatViewId == 4) {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
        else if (this.ReplayPlayerCount == 6) {
            if (this.SeatViewId == 0) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 1 || this.SeatViewId == 2) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 3) {
                this.chouma.node.setPosition(cc.v2(this.REPLAY_CHOUMA0.x, -this.REPLAY_CHOUMA0.y - 28));
            }
            else if (this.SeatViewId == 4 || this.SeatViewId == 5) {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
        else if (this.ReplayPlayerCount == 7) {
            if (this.SeatViewId == 0) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 1 || this.SeatViewId == 2) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 3 || this.SeatViewId == 4) {
                this.chouma.node.setPosition(cc.v2(this.REPLAY_CHOUMA0.x, -this.REPLAY_CHOUMA0.y - 28));
            }
            else if (this.SeatViewId == 5 || this.SeatViewId == 6) {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
        else if (this.ReplayPlayerCount == 8) {
            if (this.SeatViewId == 0 || this.SeatViewId == 1) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 2 || this.SeatViewId == 3) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 4 || this.SeatViewId == 5) {
                this.chouma.node.setPosition(cc.v2(this.REPLAY_CHOUMA0.x, -this.REPLAY_CHOUMA0.y - 28));
            }
            else if (this.SeatViewId == 6 || this.SeatViewId == 7) {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
        else if (this.ReplayPlayerCount == 9) {
            if (this.SeatViewId == 0 || this.SeatViewId == 1 || this.SeatViewId == 8) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA0);
            }
            else if (this.SeatViewId == 2 || this.SeatViewId == 3) {
                this.chouma.node.setPosition(this.REPLAY_CHOUMA1);
            }
            else if (this.SeatViewId == 4 || this.SeatViewId == 5) {
                this.chouma.node.setPosition(cc.v2(this.REPLAY_CHOUMA0.x, -this.REPLAY_CHOUMA0.y - 28));
            }
            else {
                this.chouma.node.setPosition(cc.v2(-this.REPLAY_CHOUMA1.x, this.REPLAY_CHOUMA1.y));
            }
        }
    }
    public getDrection(): number {
        return this.direction;
    }
    public showWin() {
        let rotateTime = 4;
        let rotateTo = cc.rotateTo(rotateTime, 1000);
        this.light_img.node.active = true;
        this.light_img.node.runAction(cc.sequence(cc.delayTime(0.5), cc.show(), rotateTo, cc.hide()));
    }
    public hideWin() {
        this.light_img.node.stopAllActions();
        this.light_img.node.active = false;
    }
    /**
     * 设置金币ui，在自己的视角更偏下面一点
     */
    public setSelfChipsPos(number: number) {
        if (!this.PlayerInfo) return;
        if (this.seatType == cv.Enum.SeatType.SeatType_ReplaySeat) return;
        this.selfChipsText_img.setPosition(cc.v2(this.selfChipsText_img.getPosition().x, number));
    }
    public updateSeatStatus(SeatStatus: number, playerActionType: number = 0, isGameReplay = false) {
        this.seat_status = SeatStatus;
        this.hideStatusText();
        this.actionType = playerActionType;
        switch (SeatStatus) {
            case cv.Enum.SeatStatus.SeatStatus_empty:
                this.setSeatEmpty();
                break;
            case cv.Enum.SeatStatus.SeatStatus_waiting:
                this.setSeatWaiting();
                break;
            case cv.Enum.SeatStatus.SeatStatus_leave_a_monment:
                this.setSeatLeaveAMonent();
                break;
            case cv.Enum.SeatStatus.SeatStatus_inGame_OnAction:
                if (this.PlayerInfo.playerid == cv.dataHandler.getUserData().u32Uid) {
                    this.setSeatSelfOnAction();
                }
                else {
                    this.setSeatOtherOnAction();
                }
                break;
            case cv.Enum.SeatStatus.SeatStatus_inGame_actionType:
                this.updateByActionType(playerActionType, isGameReplay);
                break;
            default:
                break;
        }

        this.updateChipPosBySeatStatus();
    }

    public hideChipsMove() {
        this.m_pkChipsMove.unscheduleAllCallbacks();
        this.m_pkChipsMove.node.destroyAllChildren();
        this.m_pkChipsMove.node.removeAllChildren(true);
    }

    public setSeatEmpty() {
        this.seat_status = cv.Enum.SeatStatus.SeatStatus_empty;
        this.role_img.node.active = true;
        this.role_img.node.setContentSize(cc.size(146, 146));

        this.nobody_text.node.active = true;

        this.selfChipsText_img.active = false;

        this.chouma.node.active = (this.chipsNum != 0);

        this.headGrag_img.node.active = false;
        this.roleName_text.node.active = false;
        this.roleName_text_forRemark.node.active = false;

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].setUnscheduleAllCallbacks();
            this.m_pkCards[i].node.active = false;
        }

        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            this.m_pkShowCards[i].setUnscheduleAllCallbacks();
            this.m_pkShowCards[i].node.active = false;
        }

        this.name_panel.active = true;
        this.number_action_panel.removeAllChildren();
        this.number_action_panel.destroyAllChildren();

        this.voice_img.node.active = false;
        this.practicalImg.active = false;
        this.head_panel.active = false;
        if (this.bOwnerSeat) {
            this.head_panel_self.active = false;
        }

        this.countDown_text.node.active = false;
        this.progressBar.node.active = false;
        this.gps_img.node.active = false;

        this.tips.node.active = false;
        this.remark_icon.node.active = false;
        this.headBlock.active = false;

        this.stopCDtime();
        this.stopLeaveCDtime();
        this.hideStatusText();
        this.hideGps();
        this.hideTips();
        this.hideFire();
        this.hideChips();
        this.resetCardPos();
        if (this.PlayerInfo && this.PlayerInfo.headurl && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
            cv.resMgr.removeRemoteHeadInfo(this.PlayerInfo.headurl, false);
        }
        this.PlayerInfo = null;
        this.hideChipsMove();
        this.hideWin();

        this.updateChipPosBySeatStatus();
    }

    public setSeatWaiting() {
        this.money_text.string = cv.StringTools.serverGoldToShowString(this.PlayerInfo.stake);
        if (this.PlayerInfo.stake >= 10000000) {
            this.money_text.fontSize = 38;
            this.selfChipsText_img.setContentSize(cc.size(186, 55));
        }
        else {
            this.money_text.fontSize = 38;
            this.selfChipsText_img.setContentSize(cc.size(176, 55));
        }
        this.money_text.node.active = true;

        this.cardType_text.node.active = false;
        this.SetName(this.PlayerInfo.name);
        let _pk: string = this.PlayerInfo.headurl;

        let _roleHeadNode = null;
        if (this.bOwnerSeat) {  //自己的头像
            _roleHeadNode = this.roleHeadNode_self;
        } else {
            _roleHeadNode = this.roleHeadNode;
        }

        CircleSprite.cleanHeadNode(_roleHeadNode);
        this.signHeadInfo();
        CircleSprite.setCircleSprite(_roleHeadNode, this.PlayerInfo.headurl, this.PlayerInfo.plat, false);

        this.seat_status = cv.Enum.SeatStatus.SeatStatus_waiting;

        this.stopLeaveCDtime();

        this.unschedule(this.thinkCdUpdate);
        this.unschedule(this.leaveUpdate);

        this.setSitDownView();

        if (!this.PlayerInfo.in_game) {
            this.showStatusText(cv.config.getStringData("GameUiWaiting"));
            //this.showTips(cv.config.getStringData("GameUiWaiting"), cv.Enum.TipsType.Tips_waitOrLeave);
        }
        this.number_action_panel.removeAllChildren();
        this.number_action_panel.destroyAllChildren();
        this.doGray(!this.PlayerInfo.in_game);

        this.updateChipPosBySeatStatus();
    }
    /**
    * 记录头像信息
    */
    public signHeadInfo() {
        let info: headInfo = new headInfo();
        info.url = this.PlayerInfo.headurl;
        info.plat = this.PlayerInfo.plat;
        cv.resMgr.addRemoteHeadInfo(info, false);
    }
    /**
     * showStatusText
     */
    public showStatusText(msg: string, fontSize: number = 34) {
        this.status_text.node.active = true;
        this.status_text.string = msg;
        this.status_text.fontSize = fontSize;
        if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
            this.status_text.node.setPosition(0, 18);
            this.countDown_text.node.setPosition(0, -23);
            this.countDown_text.node.color = this.status_text.node.color;
            this.countDown_text.fontSize = this.m_countDownTxt_srcFontSize;
        }
        else {
            this.status_text.node.setPosition(0, 2);
            this.countDown_text.node.setPosition(0, 2);
            this.countDown_text.node.color = cc.Color.WHITE;
            this.countDown_text.fontSize = 42;
        }
    }

    public doGray(isGray: boolean) {
        if (this.PlayerInfo && this.PlayerInfo.playerid == cv.dataHandler.getUserData().u32Uid) {
            let as = 33;
        }
        let _roleHeadNode = null;
        let _roleHeadFrame = null;
        if (this.bOwnerSeat) {  //自己的头像
            _roleHeadNode = this.roleHeadNode_self;
            _roleHeadFrame = this.roleHeadFrame_self;
        } else {
            _roleHeadNode = this.roleHeadNode;
            _roleHeadFrame = this.roleHeadFrame;
        }

        if (isGray) {
            if (CircleSprite.getHeadNode(_roleHeadNode)) {
                CircleSprite.getHeadNode(_roleHeadNode).getComponent(cc.Sprite).setMaterial(0, this.graySprite);
                _roleHeadNode.getComponent(cc.Sprite).setMaterial(0, this.graySprite);
                if (_roleHeadFrame) {
                    _roleHeadFrame.getComponent(cc.Sprite).setMaterial(0, this.graySprite);
                }
            }

            this.headGrag_img.node.active = true;
            this.roleName_text.node.opacity = 127;
            this.money_text.node.opacity = 127;

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                this.m_pkCards[i].node.getComponent(cc.Sprite).setMaterial(0, this.graySprite);
            }

            // this.grayObj(this.m_pkCard1.node, this.grayText);
            // this.grayObj(this.m_pkCard2.node, this.grayText);
        }
        else {
            this.headGrag_img.node.active = false;
            if (CircleSprite.getHeadNode(_roleHeadNode)) {
                CircleSprite.getHeadNode(_roleHeadNode).getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
                _roleHeadNode.getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
                if (_roleHeadFrame) {
                    _roleHeadFrame.getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
                }
            }

            this.roleName_text.node.opacity = 255;
            this.money_text.node.opacity = 255;
            this.progressBar.node.active = false;

            for (let i = 0; i < this.m_pkCards.length; ++i) {
                this.m_pkCards[i].node.getComponent(cc.Sprite).setMaterial(0, this.normalSprite);
            }

            // this.grayObj(this.m_pkCard1.node, this.unGray);
            // this.grayObj(this.m_pkCard2.node, this.unGray);
        }
    }

    public grayObj(obj: cc.Node, gray: cc.Color) {
        let childs: cc.Node[] = obj.children;
        obj.color = gray;
        let len: number = childs.length;
        for (let i: number = 0; i < len; i++) {
            let child: any = childs[i];
            child.color = gray;
            let cChilds: cc.Node[] = child.children;

            let clen = cChilds.length;
            if (clen > 0) {
                this.grayObj(child, gray);
            }
        }
    }

    public thinkCdUpdate() {
        if (this.time <= 0) {
            this.time = 100;
            this.unschedule(this.thinkCdUpdate);
            this.practicalImg.active = false;
            this.countDown_text.node.active = false;
            this.progressBar.node.active = false;
            this.doBlink(this.blinkTime);
            //倒计时结束逻辑
            return;
        }
        this.time -= cc.director.getDeltaTime() / (1 / 60) * this.htime;
        let progress = this.time / 100;
        this.progressBar.progress = progress;
        this.practicalImg.angle = progress * 360;
        this.countDown_text.string = Math.floor((Math.abs(this.time) / (this.htime * cc.game.getFrameRate()))).toString() + "s";
    }

    public doBlink(count: number) {
        this.red_img.node.active = true;
        // this.red_img.node.zIndex = 100;
        this.red_img.node.runAction(cc.repeatForever(cc.blink(count, count)));
    }

    public leaveUpdate() {
        if (this.leaveTime <= 0) {
            this.unschedule(this.leaveUpdate);
            this.countDown_text.node.active = false;

            //倒计时结束逻辑
            cv.MessageCenter.send("hideBackSeatButton");
            return;
        }
        this.leaveTime -= 1;
        this.countDown_text.node.active = true;
        this.countDown_text.string = Math.floor((Math.abs(this.leaveTime))) + "s";
    }

    public setSitDownView() {
        this.selfChipsText_img.active = true;
        this.roleName_text.node.active = true;
        this.roleName_text_forRemark.node.active = true;


        this._setHeadPanelView(true);
        //this.head_panel.active = true;
        this.role_img.node.active = true;

        this.nobody_text.node.active = false;
        this.progressBar.node.active = false;
        this.headBlock.active = false;

        for (let i = 0; i < this.PlayerInfo.NotDisturbUids.length; i++) {
            if (cv.dataHandler.getUserData().u32Uid == this.PlayerInfo.NotDisturbUids[i]) {
                this.headBlock.active = true;
                break;
            }
        }

        if (this.seat_status != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
            this.countDown_text.node.active = false;
        }

        //_btn . setVisible(true);//带保留逻辑
    }

    public setSeatLeaveAMonent() {
        this.seat_status = cv.Enum.SeatStatus.SeatStatus_leave_a_monment;
        this.countDown_text.string = this.leaveTime.toString() + "s";

        this.role_img.node.active = true;
        this.tips.node.active = true;

        //this.head_panel.active = true;
        this._setHeadPanelView(true);

        this.roleName_text.node.active = true;
        this.roleName_text_forRemark.node.active = true;
        this.selfChipsText_img.active = true;
        this.countDown_text.node.active = true;

        this.chouma.node.active = (this.chipsNum != 0);

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.active = false;
        }

        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            this.m_pkShowCards[i].node.active = false;
        }

        this.voice_img.node.active = false;
        this.practicalImg.active = false;
        this.progressBar.node.active = false;
        this.gps_img.node.active = false;
        this.nobody_text.node.active = false;

        this.doGray(true);
        this.showStatusText(cv.config.getStringData("UISeatLeave"));
        this.showLeaveCd();
        this.hideTips();

        this.updateChipPosBySeatStatus();
        //this.showTips(cv.config.getStringData("UISeatLeave"), cv.Enum.TipsType.Tips_waitOrLeave);
    }

    public showLeaveCd() {
        console.log("showLeaveCd======seatId:" + this.serverId + "   viewid:" + this.getSeatViewId());
        this.unschedule(this.thinkCdUpdate);
        this.countDown_text.node.active = true;
        this.schedule(this.leaveUpdate, 1);
    }

    public setSeatSelfOnAction() {
        this.role_img.node.active = false;
        this.nobody_text.node.active = false;
        this.roleName_text.node.active = false;
        this.roleName_text_forRemark.node.active = false;
        this.selfChipsText_img.active = true;

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.active = false;
        }

        this.voice_img.node.active = false;
        this.practicalImg.active = false;
        this.countDown_text.node.active = false;
        this.progressBar.node.active = false;
        this.tips.node.active = false;
        this.gps_img.node.active = false;

        // this.head_panel.active = false;
        this._setHeadPanelView(false);
        this.chouma.node.active = (this.chipsNum != 0);
    }

    private _setHeadPanelView(bView: boolean) {

        this.head_panel.active = false;
        if (this.head_panel_self)
            this.head_panel_self.active = false;

        if (this.bOwnerSeat) {  //自己的头像
            this.head_panel_self.active = bView;
        } else {
            this.head_panel.active = bView;
        }
    }

    public setSeatOtherOnAction() {
        this.hideTips();
        this.showCd(this.thinkCdTime);

    }

    public showCd(cdTime: number) {
        this.unschedule(this.thinkCdUpdate);
        this.MaxTime = cdTime - this.blinkTime;
        if (this.MaxTime <= 0) {
            this.doBlink(Math.abs(this.MaxTime));
            return;
        }
        this.time = 100;
        this.htime = this.time / (this.MaxTime * cc.game.getFrameRate());
        this.progressBar.node.active = true;
        this.countDown_text.node.active = true;
        this.practicalImg.rotation = 0;
        this.practicalImg.stopAllActions();
        this.practicalImg.active = true;
        // this.practicalImg.runAction(cc.rotateBy(this.MaxTime, 360));
        //思考倒计时强制位置回到中间
        this.countDown_text.node.setPosition(0, 2);
        this.countDown_text.string = this.MaxTime.toString() + "s";
        this.countDown_text.fontSize = 42;
        this.schedule(this.thinkCdUpdate, 0);
    }

    public updateByActionType(actionType: number, isGameReplay: boolean) {
        this.hideStatusText();
        let isallin = false;
        switch (actionType) {
            case cv.Enum.ActionType.Enum_Action_Null:
                this.doGray(false);
                break;
            case cv.Enum.ActionType.Enum_Action_Check:
                this.showTips(cv.config.getStringData("ActionTips6"), cv.Enum.TipsType.Tips_check);
                break;
            case cv.Enum.ActionType.Enum_Action_Fold:
                this.doGray(true);
                this.showStatusText(cv.config.getStringData("ActionTips1"));
                this.hideTips();
                if (this.PlayerInfo.playerid != cv.dataHandler.getUserData().u32Uid) {
                    for (let i = 0; i < this.m_pkCards.length; ++i) {
                        this.m_pkCards[i].node.active = false;
                    }
                }
                break;
            case cv.Enum.ActionType.Enum_Action_Call:
                this.showTips(cv.config.getStringData("ActionTips0"), cv.Enum.TipsType.Tips_call);
                break;
            case cv.Enum.ActionType.Enum_Action_Bet:
                this.showTips(cv.config.getStringData("ActionTips3"), cv.Enum.TipsType.Tips_bet);
                break;
            case cv.Enum.ActionType.Enum_Action_Raise:
                this.showTips(cv.config.getStringData("ActionTips2"), cv.Enum.TipsType.Tips_bet);
                break;
            case cv.Enum.ActionType.Enum_Action_Allin:
                //this.showTips(cv.config.getStringData("ActionTips4"), cv.Enum.TipsType.Tips_bet);
                this.hideTips();
                isallin = true;
                this.showFire(isGameReplay);
                break;
            case cv.Enum.ActionType.Enum_Action_CallMuck:
                break;
            case cv.Enum.ActionType.Enum_Action_AddActionTime:
                break;
            case cv.Enum.ActionType.Enum_Action_SendCard_Common:
                break;
            case cv.Enum.ActionType.Enum_Action_Send_HoleCards:
                break;
            case cv.Enum.ActionType.Enum_Action_Straddle:
                this.showTips(cv.config.getStringData("ActionTips5"), cv.Enum.TipsType.Tips_straddle);
                break;
            case cv.Enum.ActionType.Enum_Action_Post:
                this.showTips(cv.config.getStringData("ActionTips8"), cv.Enum.TipsType.Tips_mendAnte);
                break;
            default:
                break;
        }
        console.log("seatid:: " + this.serverId + "  00000000000000000000ffff::: " + actionType);
    }

    public showFire(isGameReplay = false) {
        if (this._allin_action1 && this._allin_action1.active) return;
        let node = cc.find("allin_node", this.node);
        if (!this._allin_action1) {
            this._allin_action1 = cc.instantiate(this.allinHead2Prefab);
            node.addChild(this._allin_action1);
            if (this.bOwnerSeat && this.seatType == cv.Enum.SeatType.SeatType_GameSeat) {
                this._allin_action1.scale = 1.16;
            }
        }

        this._allin_action1.active = true;
        this._allin_action1.setPosition(cc.v2(0, this._allin_action1.y));
        this._allin_action1.getComponent(cc.Animation).play("allin_action_1");

        if (!this._allin_action0) {
            this._allin_action0 = cc.instantiate(this.allinHeadPrefab);
            node.addChild(this._allin_action0);

        }
        this._allin_action0.active = true;
        this._allin_action0.setPosition(cc.v2(0, this._allin_action0.y));
        this._allin_action0.getComponent(cc.Animation).play("allin_action_0");



        if (isGameReplay) return;
        // let allinTag = cc.find("allintag", this.selfChipsText_img.node);
        // allinTag.getComponent(cc.Animation).play("allinTag");
        // allinTag.active = true;
    }

    public getBetedNum(): number {
        return this.chipsNum;
    }

    public getMoney(): number {
        return cv.StringTools.showStringToNumber(this.money_text.string);
    }

    public ChipsMoveOut(isAnte: boolean = false) {
        let Layer: cc.Node = this.mainPool;
        let tempPos1: cc.Vec2 = cc.Vec2.ZERO;
        let tempPos2: cc.Vec2 = cc.Vec2.ZERO;

        Layer.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos1);
        this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, tempPos2);
        this.m_pkChipsMove.MoveOut(isAnte, tempPos1, tempPos2);
    }

    public stopCDtime() {
        this.unschedule(this.thinkCdUpdate);
        this.practicalImg.stopAllActions();
        this.practicalImg.active = false;

        if (this.seat_status != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
            this.countDown_text.node.active = false;
        }
        this.progressBar.node.active = false;
        this.red_img.node.stopAllActions();
        this.red_img.node.active = false;
    }

    public stopLeaveCDtime() {
        this.unschedule(this.leaveUpdate);
    }

    public stopBlink() {
        if (cc.isValid(this.red_img)) {
            this.red_img.node.stopAllActions();
            this.red_img.node.active = false;
        }
    }

    public showAddTimeAction() {
        if (!this._addtime_action) {
            this._addtime_action = cc.instantiate(this.addtimePrefab);
            this.node.addChild(this._addtime_action);
            this._addtime_action.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                this._addtime_action.active = false;
            }, this);
        }
        this._addtime_action.active = true;
        this._addtime_action.setPosition(cc.v2(0, this._addtime_action.y));
        this._addtime_action.getComponent(cc.Animation).play("place_card_btn_delay");
    }

    /**
     * 显示汽泡
     * @param str 
     * @param tType 
     */
    public showTips(str: string, tType: number) {
        if (tType == cv.Enum.TipsType.Tips_straddle) {
            this.tips_text.fontSize = 26;
        }
        else {
            this.tips_text.fontSize = 36;
        }

        this.tips.node.stopAllActions();
        this.tips_text.string = str;
        this.tips.node.active = true;
        this.tips.node.runAction(cc.show());

        cv.resMgr.setSpriteFrame(this.tips.node, cv.StringTools.formatC(this.bubbleTips_path + "%d", tType));
        this.tips.node.getComponent(Tag).setTag(tType);
        if (str == "Allin") {
            this.tips_text.node.color = cc.color(248, 179, 1);//YELLOW
        }
        else {
            this.tips_text.node.color = cc.color(255, 255, 255);
        }

        // let posx = tType == cv.Enum.TipsType.Tips_mendAnte ? 66 + 9 : 66;//Tips_mendStraddle
        //this.tips_text.node.setPosition(posx, this.tips_text.node.y);
        if (this.tips.node.x > 0) {
            let offsetX = 0;
            if (this.seatType === cv.Enum.SeatType.SeatType_FavorReplaySeat || this.seatType === cv.Enum.SeatType.SeatType_ReplaySeat) {
                if (this.PlayerInfo.playerid == cv.dataHandler.getUserData().u32Uid) {
                    offsetX = 40;
                    if (this.m_seatHandsCardType === cv.Enum.SeatHandsCardType.SHCT_PLO) {
                        offsetX = 70;
                    }
                }
            }
            this.tips.node.setPosition(cc.v2(this.DRICTION_TOP_TIPSLEFT + offsetX, this.tips.node.getPosition().y));
            this.tips.node.setScale(1, 1);
            this.tips_text.node.setScale(1, 1);
        } else {
            let offsetX = 0;
            if (this.seatType === cv.Enum.SeatType.SeatType_FavorReplaySeat || this.seatType === cv.Enum.SeatType.SeatType_ReplaySeat) {
                if (this.PlayerInfo.playerid == cv.dataHandler.getUserData().u32Uid) {
                    offsetX = -40;
                    if (this.m_seatHandsCardType === cv.Enum.SeatHandsCardType.SHCT_PLO) {
                        offsetX = -70;
                    }
                }
            } else {
                if (this.bOwnerSeat) { //牌局里面的自己
                    offsetX = -15;
                }
            }
            this.tips.node.setPosition(cc.v2(-this.DRICTION_TOP_TIPSLEFT + offsetX, this.tips.node.getPosition().y));
            this.tips.node.setScale(-1, 1);
            this.tips_text.node.setScale(-1, 1);
        }

        if (tType == cv.Enum.TipsType.Tips_mendAnte) {
            this.tips.node.runAction(cc.sequence(cc.delayTime(2.5), cc.scaleTo(0.6, 0), cc.hide()));
        } else if (tType == cv.Enum.TipsType.Tips_straddle) {
            this.tips.node.runAction(cc.sequence(cc.delayTime(3), cc.scaleTo(0.6, 0), cc.hide()));
        }
    }

    public hideGps() {
        this.gps_img.node.stopAllActions();
        this.gps_img.node.active = false;
    }

    public hideTips() {
        this.tips.node.stopAllActions();
        this.tips.node.active = false;
    }

    public hideStatusText() {
        this.status_text.node.active = false;
    }

    public hideFire() {
        if (this._allin_action0) {
            this._allin_action0.getComponent(cc.Animation).stop("allin_action_0");
            this._allin_action0.active = false;
        }
        if (this._allin_action1) {
            this._allin_action1.getComponent(cc.Animation).stop("allin_action_1");
            this._allin_action1.active = false;
        }
    }

    public hideChips() {
        this.chipsNum = 0;
        this.chouma_text.string = "0";
        this.chouma.node.active = false;

        //this.updateReplayChisPos();
    }

    public hideCard() {
        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.active = false;
        }

        for (let i = 0; i < this.m_pkShowCards.length; ++i) {
            this.m_pkShowCards[i].node.active = false;
        }
    }

    // public hideAllinTag() {
    //     let allinTag = cc.find("allintag", this.selfChipsText_img.node);
    //     allinTag.active = false;
    // }

    public hideCardType() {
        this.money_text.node.active = true;
        this.cardType_text.node.active = false;
        this.resetCardTypeCtlInfo();
    }

    /**
     * 获取指定索引的"显示牌"
     * @param cardIndex 
     */
    public getShowCard(cardIndex: number): Card {
        let t: Card = null;
        if (cardIndex >= 0 && cardIndex < this.m_pkShowCards.length) {
            t = this.m_pkShowCards[cardIndex];
        }
        return t;
    }

    /**
     * 获取指定索引的"角标牌"
     * @param cardIndex 
     */
    public getCard(cardIndex: number): Card {
        let t: Card = null;
        if (cardIndex >= 0 && cardIndex < this.m_pkCards.length) {
            t = this.m_pkCards[cardIndex];
        }
        return t;
    }

    /**
     * 获取手牌数量("显示牌组"和"角标牌组"数量是一致的)
     */
    public getHandsCardsCount(): number {
        let count: number = 0;

        // count = this.m_pkCards.length;
        count = this.m_pkShowCards.length;

        return count;
    }

    public updateReplayChisPos() {
        if (this.seatType == cv.Enum.SeatType.SeatType_ReplaySeat) {
            if (this.ReplayPlayerCount == 2) {
                let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
            }
            else if (this.ReplayPlayerCount == 3) {
                if (this.SeatViewId == 0) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 1) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.getPosition().x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
            else if (this.ReplayPlayerCount == 4) {
                if (this.SeatViewId == 0 || this.SeatViewId == 2) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 1) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.getPosition().x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
            else if (this.ReplayPlayerCount == 5) {
                if (this.SeatViewId == 0) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 1 || this.SeatViewId == 2) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.getPosition().x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
            else if (this.ReplayPlayerCount == 6) {
                if (this.SeatViewId == 0 || this.SeatViewId == 3) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 1 || this.SeatViewId == 2) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.getPosition().x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
            else if (this.ReplayPlayerCount == 7) {
                if (this.SeatViewId == 0 || this.SeatViewId == 3 || this.SeatViewId == 4) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 1 || this.SeatViewId == 2) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.getPosition().x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
            else if (this.ReplayPlayerCount == 8) {
                if (this.SeatViewId == 0 || this.SeatViewId == 1 || this.SeatViewId == 4 || this.SeatViewId == 5) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 2 || this.SeatViewId == 3) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.getPosition().x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
            else if (this.ReplayPlayerCount == 9) {
                if (this.SeatViewId == 0 || this.SeatViewId == 1 || this.SeatViewId == 8 || this.SeatViewId == 4 || this.SeatViewId == 5) {
                    let chipsimgPosX = -(this.chouma_text.node.getContentSize().width + 4 + this.chouma_img.node.getContentSize().width) / 2 + this.chouma_img.node.getContentSize().width / 2;
                    this.chouma_img.node.setPosition(chipsimgPosX, this.chouma_img.node.y);
                    this.chouma_text.node.setPosition(chipsimgPosX + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else if (this.SeatViewId == 2 || this.SeatViewId == 3) {
                    this.chouma_text.node.setPosition(this.chouma_img.node.x + this.chouma_img.node.getContentSize().width / 2 + 4 + this.chouma_text.node.getContentSize().width / 2, this.chouma_text.node.y);
                }
                else {
                    this.chouma_text.node.setPosition(-this.chouma_text.node.getContentSize().width / 2 - 4, this.chouma_text.node.y);
                    this.chouma_img.node.setPosition(-this.chouma_text.node.getContentSize().width - this.chouma_img.node.getContentSize().width / 2 - 4, this.chouma_img.node.y);
                }
            }
        }
    }

    /**
     * 重置操作状态
     */
    public resetActionType() {
        this.actionType = cv.Enum.ActionType.Enum_Action_Null;
    }

    public SetName(kName: string, kColor: cc.Color = cc.color(255, 255, 255), nType: number = 0) {

        //超过6个中文，或者12个英文
        // if (cv.StringTools.getStrLen(kName) >12)  {
        //     kName =  kName.substr(0,5) + "..."
        // }
        if (nType != cv.Enum.NameTextType.SetNameType_setWinNumber) {
            if (cv.StringTools.getStrLen(kName) > 12) {
                this.roleName_text.fontSize = 24;
            }
            else {
                this.roleName_text.fontSize = 32;
            }
        }

        let nameStr = "";
        let mkColor: cc.Color = this.roleName_text.node.color;
        //等待中和暂离不改变现在的颜色，默认在dogray中改成了灰色，这里就不刷成白色了
        if (this.seat_status != cv.Enum.SeatStatus.SeatStatus_waiting && this.seat_status != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
            if (mkColor != this.grayText) {
                this.roleName_text.node.color = kColor;
            }
        }

        if (nType == cv.Enum.NameTextType.SetNameType_setWinNumber) {
            // this.roleName_text.string = kName;
            // cv.StringTools.setShrinkString(this.roleName_text.node, kName, true);
            this.remark_icon.node.active = false;
            this.showNumber(kName);
            return;
        }
        let remarkData: RemarkData = cv.dataHandler.getUserData().getRemarkData(this.PlayerInfo.playerid)

        if (remarkData.nUid == 0) {
            // this.roleName_text.string = kName;
            nameStr = kName;
            cv.StringTools.setShrinkString(this.roleName_text.node, kName, true);
        }
        else {
            if (remarkData.sRemark.length == 0) {
                // this.roleName_text.string = kName;
                nameStr = kName;
                cv.StringTools.setShrinkString(this.roleName_text.node, kName, true);
            }
            else {
                // this.roleName_text.string = remarkData.sRemark;
                nameStr = remarkData.sRemark;
                cv.StringTools.setShrinkString(this.roleName_text.node, remarkData.sRemark, true);
            }
            if (remarkData.nType == 0) {
                this.remark_icon.node.active = false;
            }
            else {
                this.remark_icon.node.active = true;
                //this.remark_icon.loadTexture(StringUtils:: format("remark_icon%d", remarkData.type), cocos2d:: ui:: TextureResType:: PLIST);
                cv.resMgr.setSpriteFrame(this.remark_icon.node, "zh_CN/game/dzpoker/ui/common_remark_icon" + remarkData.nType);
            }
        }
        if (this.remark_icon.node.active) {
            this.roleName_text.node.setContentSize(cc.size(140, this.roleName_text.node.height));
            cv.StringTools.setShrinkString(this.roleName_text.node, nameStr, true);
        } else {
            this.roleName_text.node.setContentSize(cc.size(200, this.roleName_text.node.height));
            cv.StringTools.setShrinkString(this.roleName_text.node, nameStr, true);
        }
        //this.roleName_text_forRemark.node.setContentSize(cc.size(0,this.roleName_text_forRemark.node.height));
        this.roleName_text_forRemark.fontSize = this.roleName_text.fontSize;
        this.roleName_text_forRemark.string = this.roleName_text.string;
        this.scheduleOnce(function () {
            let iconWidth: number = this.remark_icon.node.getContentSize().width / 2;
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x - this.roleName_text_forRemark.node.getContentSize().width / 2 - iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x - this.roleName_text_forRemark.node.getContentSize().width / 2 - iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x - this.roleName_text_forRemark.node.getContentSize().width / 2 - iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
        }.bind(this), 0);
    }

    public OnUpdate_remarks() {
        let nameStr = "";
        if (this.seat_status == cv.Enum.SeatStatus.SeatStatus_empty) return;
        let remarkData: RemarkData = cv.dataHandler.getUserData().getRemarkData(this.PlayerInfo.playerid)

        if (remarkData.nUid == 0) {
            nameStr = this.PlayerInfo.name;
            cv.StringTools.setShrinkString(this.roleName_text.node, this.PlayerInfo.name, true);
        }
        else {
            if (remarkData.sRemark.length == 0) {
                nameStr = this.PlayerInfo.name;
                cv.StringTools.setShrinkString(this.roleName_text.node, this.PlayerInfo.name, true);
            }
            else {
                nameStr = remarkData.sRemark;
                cv.StringTools.setShrinkString(this.roleName_text.node, remarkData.sRemark, true);
            }
            if (remarkData.nType == 0) {
                this.remark_icon.node.active = false;
            }
            else {
                this.remark_icon.node.active = true;
                //this.remark_icon.loadTexture(StringUtils:: format("remark_icon%d", remarkData.type), cocos2d:: ui:: TextureResType:: PLIST);
                cv.resMgr.setSpriteFrame(this.remark_icon.node, "zh_CN/game/dzpoker/ui/common_remark_icon" + remarkData.nType);
            }
        }
        if (this.remark_icon.node.active) {
            this.roleName_text.node.setContentSize(cc.size(140, this.roleName_text.node.height));
            cv.StringTools.setShrinkString(this.roleName_text.node, nameStr, true);
        } else {
            this.roleName_text.node.setContentSize(cc.size(200, this.roleName_text.node.height));
            cv.StringTools.setShrinkString(this.roleName_text.node, nameStr, true);
        }
        //this.roleName_text_forRemark.node.setContentSize(cc.size(0,this.roleName_text_forRemark.node.height));
        this.roleName_text_forRemark.fontSize = this.roleName_text.fontSize;
        this.roleName_text_forRemark.string = this.roleName_text.string;
        this.scheduleOnce(function () {
            let iconWidth: number = this.remark_icon.node.getContentSize().width / 2;
            if (this.direction == cv.Enum.SeatDriction.DRICTION_BOTTOM) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x - this.roleName_text_forRemark.node.getContentSize().width / 2 - iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_LEFT_UP) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x - this.roleName_text_forRemark.node.getContentSize().width / 2 - iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_RIGHT_UP) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x - this.roleName_text_forRemark.node.getContentSize().width / 2 - iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_LEFT) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
            else if (this.direction == cv.Enum.SeatDriction.DRICTION_TOP_RIGHT) {
                this.remark_icon.node.setPosition(cc.v2(this.roleName_text_forRemark.node.getPosition().x + this.roleName_text_forRemark.node.getContentSize().width / 2 + iconWidth * 0.7, this.roleName_text_forRemark.node.getPosition().y));
            }
        }.bind(this), 0);
    }

    public onlyShowChouma() {
        this.selfChipsText_img.active = true;
        // this.selfChipsText_img.setPosition(cc.v2(this.selfChipsText_img.getPosition().x,this._selfChipsText_onSelfTurn_Posy));
        this.role_img.node.active = false;
        this.nobody_text.node.active = false;
        this.roleName_text.node.active = false;

        for (let i = 0; i < this.m_pkCards.length; ++i) {
            this.m_pkCards[i].node.active = false;
        }

        this.voice_img.node.active = false;
        this.practicalImg.active = false;

        if (this.seat_status != cv.Enum.SeatStatus.SeatStatus_leave_a_monment) {
            this.countDown_text.node.active = false;
        }
        this.progressBar.node.active = false;

        this.tips.node.active = false;
        this.gps_img.node.active = false;
        // this.head_panel.active = false;
        this._setHeadPanelView(false);
        this.hideStatusText();
        this.chouma.node.active = (this.chipsNum != 0);
    }

    public getTips(): string {
        return this.tips_text.string;
    }

    public getStatus(): number {
        return this.seat_status;
    }

    public getActionType() {
        return this.actionType;
    }

    public speak(audioTime: number): void {
        //如果发语音的时候正好轮到自己在操作，且发语音的是我自己不显示
        if (cv.GameDataManager.tRoomData.curActionPlayerId == cv.dataHandler.getUserData().u32Uid && this.getSeatViewId() == 0 && cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            this.voice_img.node.active = false;
        } else {
            this.voice_img.node.active = true;
        }
        this.speakTime = 0;
        this.unschedule(this.speaking);
        this.schedule(this.speaking, 0.2);
        this.scheduleOnce(function () {
            this.unschedule(this.speaking);
            this.voice_img.node.active = false;
            cv.GameDataManager.tRoomData.voicePlaying = false;
            cv.gameNet.playVoice();
        }.bind(this), audioTime);
    }

    protected speaking(): void {
        this.speakTime++;
        let len = this.speakTime % 3;
        console.log("Seat speaking, len:" + len);
        for (let i = 0; i < this.voiceImgList.length; i++) {
            const voiceImg = this.voiceImgList[i];
            if (i <= len) {
                voiceImg.active = true;
            } else {
                voiceImg.active = false;
            }
        }
    }

    showFace(faceId: number) {
        if (this.spine == null) {
            let node = new cc.Node()
            this.spine = node.addComponent(sp.Skeleton);
            node.y = -72
            this.node.addChild(node, 999);
        }
        this.spine.node.active = true;
        cv.resMgr.load(`zh_CN/game/dzpoker/animation/face/baseSpineAni_${faceId}`, sp.SkeletonData, (spkeletonData: sp.SkeletonData): void => {
            this.spine.skeletonData = spkeletonData;
            this.spine.setAnimation(0, "animation", false);
            this.spine.node.scale = 1.8;
            this.spine.setCompleteListener(function () {
                this.spine.node.active = false;
            }.bind(this));
        }, cv.resMgr.CleanResLevel.LEVEL_SCENE);
    }

    getHeadWorldPosForFace(): cc.Vec2 {
        let out: cc.Vec2 = cc.Vec2.ZERO;
        this.role_img.node.parent.convertToWorldSpaceAR(cc.v2(this.role_img.node.x, this.role_img.node.y - this.role_img.node.height * 0.5), out);
        return out;
    }

    getLeftHitPos(): cc.Vec2 {
        let out: cc.Vec2 = cc.Vec2.ZERO;
        this.role_img.node.parent.convertToWorldSpaceAR(cc.v2(this.role_img.node.x - this.role_img.node.width * 0.5 - 80, this.role_img.node.y + 10), out);
        return out;
    }

    getUpperLeftHitPos(): cc.Vec2 {
        let out: cc.Vec2 = cc.Vec2.ZERO;
        this.role_img.node.parent.convertToWorldSpaceAR(cc.v2(this.role_img.node.x - this.role_img.node.width * 0.5 - 10, this.role_img.node.height * 0.5 + 135), out);
        return out;
    }

    getUpperRightHitPos(): cc.Vec2 {
        let out: cc.Vec2 = cc.Vec2.ZERO;
        this.role_img.node.parent.convertToWorldSpaceAR(cc.v2(this.role_img.node.x + this.role_img.node.width * 0.5 + 10, this.role_img.node.height * 0.5 + 135), out);
        return out;
    }

    public autoBuyinEff() {
        if (cv.GameDataManager.tRoomData.buyinAmount <= 0) {
            return;
        }
        this.buyin_sprite.node.active = true;
        this.buyin_sprite.node.runAction(cc.sequence(cc.moveTo(0.9, cc.v2(0, 120)), cc.callFunc(this.callBack.bind(this, this.buyin_sprite))));
        let amount: string = cv.StringTools.serverGoldToShowString(cv.Number(cv.GameDataManager.tRoomData.buyinAmount));
        this.buyin_text.string = cv.StringTools.formatC(cv.config.getStringData("Aof_game_buyin_tips_text"), amount);
    }

    public BuyOutEff(str) {
        this.buyin_sprite.node.active = true;
        this.buyin_sprite.node.runAction(cc.sequence(cc.moveTo(0.9, cc.v2(0, 120)), cc.callFunc(this.callBack.bind(this, this.buyin_sprite))));
        this.buyin_text.string = cv.StringTools.formatC(cv.config.getStringData("Aof_game_buyout_tips_text"), str);
    }

    protected callBack() {
        this.buyin_sprite.node.setPosition(cc.v2(0, 50));
        this.buyin_sprite.node.active = false;
    }
    
    public showNumber(num: string) {
        let text = cc.instantiate(this.number_text);
        this.number_action_panel.addChild(text);
        text.getComponent(cc.Label).string = num;
        text.active = true;
        text.opacity = 0;
        text.setPosition(cc.v2(0, 0));

        let offsetY = 22;

        // 若是奥马哈且是他人"showdown"
        if (this.m_seatHandsCardType === cv.Enum.SeatHandsCardType.SHCT_PLO
            && this.PlayerInfo.playerid !== cv.dataHandler.getUserData().u32Uid
            && this.isShowDown) {

            // 统一上移
            offsetY = 42;

            // 若是JP房间且是顶部的座位, 则飘分的偏移要调小一点, 避免遮挡
            let isTopDir: boolean = this.direction === cv.Enum.SeatDriction.DRICTION_TOP_LEFT || this.direction === cv.Enum.SeatDriction.DRICTION_TOP_RIGHT;
            if (cv.GameDataManager.tRoomData.pkRoomParam.is_associated_jackpot && isTopDir) {
                offsetY = 22;
            }
        }

        let CallFunc1 = cc.callFunc(() => {
            text.opacity = 255;
            this.name_panel.active = false;
        }, this);

        let moveTo = cc.moveTo(0.5, cc.v2(0, this.name_panel.getPosition().y + offsetY));
        let CallFunc2 = cc.callFunc(() => {
            if (this.number_action_panel.childrenCount <= 1) {
                this.name_panel.active = true;
            }
        }, this);

        text.runAction(cc.sequence(cc.delayTime(1.3), CallFunc1, moveTo, cc.delayTime(2.1), CallFunc2, cc.destroySelf()));

    }

    public cleanHead(): void {
        console.log("cleanHead->>>>>");

        let _roleHeadNode = null;
        if (this.bOwnerSeat) {  //自己的头像
            _roleHeadNode = this.roleHeadNode_self;
        } else {
            _roleHeadNode = this.roleHeadNode;
        }

        CircleSprite.cleanHeadNode(_roleHeadNode);
    }

    public resetHead(): void {
        console.log("resetHead->1");
        this.cleanHead();
        if (this.PlayerInfo) {

            let _roleHeadNode = null;
            if (this.bOwnerSeat) {  //自己的头像
                _roleHeadNode = this.roleHeadNode_self;
            } else {
                _roleHeadNode = this.roleHeadNode;
            }

            console.log("resetHead->2");
            this.signHeadInfo();
            CircleSprite.setCircleSprite(_roleHeadNode, this.PlayerInfo.headurl, this.PlayerInfo.plat, false);
        }
    }

    public setHeadTextureWithData(pixelData: DataView, pixelFormat: number, pixelsWidth: number, pixelsHeight: number, rotation: number = 0, scaleX: number = 1, scaleY: number = 1): void {
        let _roleHeadNode = null;
        if (this.bOwnerSeat) {  //自己的头像
            _roleHeadNode = this.roleHeadNode_self;
        } else {
            _roleHeadNode = this.roleHeadNode;
        }

        CircleSprite.setHeadTextureWithData(_roleHeadNode, pixelData, pixelFormat, pixelsWidth, pixelsHeight, rotation, scaleX, scaleY);
    }

    public setViewStyle(style: number): void {
    }

    public getViewStyle(): number {
        return 0;
    }

    public playSitDownAction(): void {
    }

    public showHeadBlock(enable: boolean): void {
        this.headBlock.active = enable;
    }

    public GpsCallBack(result: any) {
        if (result.msg == "false") {
            cv.TT.showMsg(cv.config.getStringData("ErrorToast30"), cv.Enum.ToastType.ToastTypeWarning);
        }
        else {
            if (this.getGpsFunc) {
                this.getGpsFunc();
            }
        }

        cv.MessageCenter.unregister("on_haveGPS_result", this.node);
        this.getGpsFunc = null;
    }

    avatarCallBack() {
        cv.gameNet.RequestNotiGameUpdateThumb();
        this.onClickSelf(null);
    }

    //设置胜率显示
    //bShow: 是否显示胜率 false:隐藏  bshow显示
    //winRate: 胜率值 
    public setWinRateStatus(bShow: boolean, bLead: boolean = false, winRate: number = 0) {
        this.winRateNode.active = bShow;
        if (!bShow) {
            return;
        }

        let bgLead = this.winRateNode.getChildByName("bgLead");  //胜率优先
        let bgBehind = this.winRateNode.getChildByName("bgBehind");  //胜率落后
        let txtRate = this.winRateNode.getChildByName("txtRate").getComponent(cc.Label);  //胜率落后
        let txtPercent = this.winRateNode.getChildByName("txtPercent");
        if (bLead) { //胜率领先
            bgLead.active = true;
            bgBehind.active = false;
        } else {
            //胜率落后
            bgLead.active = false;
            bgBehind.active = true;
        }
        if (winRate >= 100) {
            txtRate.node.x = -13;
            txtPercent.x = 27;
        } else if (winRate >= 10) {
            txtRate.node.x = -9;
            txtPercent.x = 21;
        } else {
            txtRate.node.x = -9;
            txtPercent.x = 13;
        }

        txtRate.string = winRate.toString();
    }

    public getbShowDown() {
        return this.isShowDown;
    }

    public showRedActionByNode(node: cc.Node, type: number, number: number, isStar: boolean, isBig: boolean = false) {
        node.active = true;
        let hongbaoNode = node.getChildByName("hongbaoR");
        let actionNode = hongbaoNode.getChildByName("action_node");
        let goodsActionNode = hongbaoNode.getChildByName("goods_action_node");
        actionNode.active = type != cv.Enum.RedItemType.goods;
        goodsActionNode.active = type == cv.Enum.RedItemType.goods;

        let iconRed = actionNode.getChildByName("icon_red_envelope");
        let goodsIconRed = goodsActionNode.getChildByName("icon_red_envelope");
        let numberLabel = actionNode.getChildByName("number").getComponent(cc.Label);
        let icon = actionNode.getChildByName("icon");
        let path = isStar ? "zh_CN/game/starRedpacket/icon_red_envelope" : "zh_CN/game/redpacket/red_btn_open";
        switch (type) {
            case cv.Enum.RedItemType.gold:
                cv.resMgr.setSpriteFrame(icon, "zh_CN/hall/RedPackets/icon_gold");
                break;
            case cv.Enum.RedItemType.integral:
                cv.resMgr.setSpriteFrame(icon, "zh_CN/hall/RedPackets/YellowChip");
                break;
            case cv.Enum.RedItemType.usdt:
                cv.resMgr.setSpriteFrame(icon, "zh_CN/hall/RedPackets/icon_ustd");
                break;
        }
        cv.resMgr.setSpriteFrame(iconRed, path);
        cv.resMgr.setSpriteFrame(goodsIconRed, path);
        let labelSize = cv.resMgr.getLabelStringSize(numberLabel, "+" + cv.StringTools.serverGoldToShowString(number));
        let width = labelSize.width + iconRed.width + icon.width;
        if (width > this.node.width) {
            let offset = (this.node.width / 2) / width;
            let offsetX = 0.5;
            actionNode.anchorX = offset;
            switch (this.direction) {
                case cv.Enum.SeatDriction.DRICTION_LEFT_MIDDLEDOWN:         // 左边中和中下
                case cv.Enum.SeatDriction.DRICTION_LEFT_UP: {               // 左边中上
                    offsetX = offset;
                } break;

                case cv.Enum.SeatDriction.DRICTION_TOP_LEFT: {              // 顶部左边(9人桌是顶部左, 其余是顶部)
                    if (this.playerLength === 9) offsetX = offset;
                } break;

                case cv.Enum.SeatDriction.DRICTION_RIGHT_MIDDLEDOWN:        // 右边中和中下
                case cv.Enum.SeatDriction.DRICTION_RIGHT_UP:                // 右边中上
                case cv.Enum.SeatDriction.DRICTION_TOP_RIGHT: {             // 顶部右边
                    offsetX = 1 - offset;
                } break;

                case cv.Enum.SeatDriction.DRICTION_BOTTOM: break            // 最下面
                default: break;
            }
            actionNode.anchorX = offsetX;
        } else {
            actionNode.anchorX = 0.5;
        }
        let action = hongbaoNode.getComponent(cc.Animation);
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                this.name_panel.opacity = 255;
            }, this)
        }

        if (isStar) {
            if (isBig) {
                action.play("hongbaoRV");
            } else {
                action.play("hongbaoRStar");
            }
        } else {
            if (this.PlayerInfo != null && this.PlayerInfo.playerid == cv.dataHandler.getUserData().u32Uid) {
                action.play("hongbaoRMY");
            } else {
                action.play("hongbaoR");
            }
        }
    }

    public showRedAction(type: number, number: number, isStar: boolean) {
        this.name_panel.opacity = 0;
        this.showRedActionByNode(this._redpacketActionNode, type, number, isStar);
    }
}
