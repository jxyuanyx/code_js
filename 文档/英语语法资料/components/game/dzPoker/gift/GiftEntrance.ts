import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { Seat } from "../Seat";
import { PlayerInfo } from "../data/RoomData";
import { TagCom } from "../../../../common/tools/TagCom";
import { HashMap } from "../../../../common/tools/HashMap";

import { GiftPanel } from "./GiftPanel";
import { GiftAnim } from "./GiftAnim";
import { GiftAnimOrbit } from "./GiftAnimOrbit";
import { GiftData, GiftNewsInfo, GiftSelfSendInfo, GiftStarInfo } from "./GiftData";
import { GiftSmallBox } from "./GiftSmallBox";

/**
 * 礼物动画类型
 */
enum GiftAnimType {
    /**
     * 无
     */
    NONE = 0,

    /**
     * 轨迹
     */
    ORBIT,

    /**
     * 飞机
     */
    AIRPLANE,

    /**
     * 兰博基尼
     */
    LAMBORGHINI,

    /**
     * 火箭
     */
    ROCKET,

    /**
     * 钻石
     */
    DIAMOND,

    /**
     * 礼品卡
     */
    GIFTCARD,

    /**
     * 吻
     */
    LOVEKISS,
}

/**
 * 礼物入口
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class GiftEntrance extends cc.Component {
    @property(cc.Prefab) prefab_smallbox: cc.Prefab = null;
    @property(cc.Prefab) prefab_giftpanel: cc.Prefab = null;
    @property(cc.Prefab) prefab_orbit: cc.Prefab = null;
    @property(cc.Prefab) prefab_airplane: cc.Prefab = null;
    @property(cc.Prefab) prefab_lamborghini: cc.Prefab = null;
    @property(cc.Prefab) prefab_rocket: cc.Prefab = null;
    @property(cc.Prefab) prefab_diamond: cc.Prefab = null;
    @property(cc.Prefab) prefab_giftcard: cc.Prefab = null;
    @property(cc.Prefab) prefab_lovekiss: cc.Prefab = null;
    @property(cc.Node) img_dot: cc.Node = null;

    static g_class_name: string = "GiftEntrance";
    private _panel_anim: cc.Node = null;
    private _panel_gift: GiftPanel = null;
    private _panel_smallbox: GiftSmallBox = null;

    /**
     * 动画队列映射表(key:动画类型, value:节点队列)
     */
    private _animQueueMap: HashMap<GiftAnimType, cc.Node[]> = new HashMap();

    /**
     * 动画池映射表(key:动画类型, value:节点池)
     */
    private _animPoolMap: HashMap<GiftAnimType, cc.NodePool> = new HashMap();

    /**
     * 连击礼物映射表(key:礼物uuid, value:连击数量)
     */
    private _overlapGiftMap: HashMap<string, number> = new HashMap();

    autoShow(): void {
        this.node.active = true;
    }

    autoHide(): void {
        this.node.active = false;
        if (this._panel_gift) this._panel_gift.autoHide(false);
    }

    showSmallBox(wpos: cc.Vec2): void {
        wpos.x += this._panel_smallbox.node.width * this._panel_smallbox.node.anchorX;
        wpos.y += this._panel_smallbox.node.height * this._panel_smallbox.node.anchorY;

        let p: cc.Vec2 = cc.Vec2.ZERO;
        this._panel_smallbox.node.parent.convertToNodeSpaceAR(wpos, p);
        this._panel_smallbox.node.setPosition(p);
        this._panel_smallbox.node.active = true;
    }

    protected onLoad(): void {
        this.node.on("click", this._onClick, this);
        this._registerEvent();

        // 实例化动画面板(以为层级关系, 要写在入口激活处)
        if (!this._panel_anim) {
            let node: cc.Node = new cc.Node();
            node.setContentSize(cc.winSize);
            node.name = `${GiftEntrance.g_class_name}_panel_anim`;
            this._panel_anim = this._createInst(node, 0, this.node.parent);
            this._panel_anim.active = false;
        }

        // 实例化小窗口面板(以为层级关系, 要写在入口激活处)
        if (!this._panel_smallbox) {
            let inst: cc.Node = this._createInst(this.prefab_smallbox, 0, this.node.parent);
            this._panel_smallbox = inst.getComponent(GiftSmallBox);
            this._panel_smallbox.node.active = false;
        }

        // 隐藏未读红点
        this.img_dot.active = false;
    }

    protected start(): void {
    }

    /**
     * 组件被销毁
     * 反注册消息要写在"onDestroy"里, 因为很多情况下入口都没有被激活过就需要显示动画
     * 动画节点和该入口节点并不是父子关系, 只是借助入口统一管理初始化而已
     */
    protected onDestroy(): void {
        this._unregisterEvent();
        this._clearAnimNodePool();
    }

    private _registerEvent(): void {
        cv.MessageCenter.register("click_seat_gift_icon", this._onClick.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_NOTICE_NEWS, this._onMsgGiftNews.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_STARS_RECVREAD_STATUS, this._onMsgStarsRecvReadStatus.bind(this), this.node);
        cv.MessageCenter.register(GiftData.GIFT_MSG_SELF_SENDGIFT, this._onMsgSelfSendGift.bind(this), this.node)
    }

    private _unregisterEvent(): void {
        cv.MessageCenter.unregister("click_seat_gift_icon", this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_NOTICE_NEWS, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_STARS_RECVREAD_STATUS, this.node);
        cv.MessageCenter.unregister(GiftData.GIFT_MSG_SELF_SENDGIFT, this.node);
    }

    private _createInst(node: cc.Prefab | cc.Node, zorder?: number, parentNode?: cc.Node, pos?: cc.Vec2): cc.Node {
        if (!cv.tools.isValidNode(node)) return null;

        let v2_size: cc.Vec2 = cc.Vec2.ZERO;
        let v2_scale: cc.Vec2 = cc.Vec2.ZERO;

        if (!parentNode) {
            parentNode = cc.director.getScene();
            v2_size.x = cc.winSize.width;
            v2_size.y = cc.winSize.height;
        }
        else {
            v2_size.x = parentNode.width;
            v2_size.y = parentNode.height;
        }

        v2_scale.x = parentNode.scaleX;
        v2_scale.y = parentNode.scaleY;

        zorder = zorder ? zorder : 0;

        let inst: cc.Node = null;
        if (node instanceof cc.Prefab) {
            inst = cc.instantiate(node);
        }
        else {
            inst = node;
        }

        pos = pos ? pos : (inst.getAnchorPoint().sub(parentNode.getAnchorPoint())).scaleSelf(v2_size).scaleSelf(v2_scale);
        inst.setPosition(pos);
        parentNode.addChild(inst, zorder);

        return inst;
    }

    private _onClick(): void {
        cv.AudioMgr.playButtonSound("button_click");

        if (!this._panel_gift) {
            let inst: cc.Node = this._createInst(this.prefab_giftpanel, this.node.zIndex, this.node.parent);
            this._panel_gift = inst.getComponent(GiftPanel);
            this._panel_gift.node.active = true;
        }

        let isRead: boolean = !this.img_dot.active;
        this._panel_gift.autoShow(isRead);
    }

    /**
     * 获取指定礼物动画类型((1-1000低端;>1000高端;1-钻石, 2-热吻, 3-饭卡, 1001-火箭, 1002-飞机, 1003-兰博基尼))
     * @param gift_id 
     */
    private _getAnimTypeByGiftID(gift_id: number): GiftAnimType {
        let type: GiftAnimType = GiftAnimType.NONE;

        switch (gift_id) {
            case 1: type = GiftAnimType.DIAMOND; break;
            case 2: type = GiftAnimType.LOVEKISS; break;
            case 3: type = GiftAnimType.GIFTCARD; break;
            case 1001: type = GiftAnimType.ROCKET; break;
            case 1002: type = GiftAnimType.AIRPLANE; break;
            case 1003: type = GiftAnimType.LAMBORGHINI; break;
            default: break;
        }

        return type;
    }

    /**
     * 获取指定类型的动画节点实例(优先从"节点池"中取)
     * @param type 
     */
    private _getAnimNodeFromPool(type: GiftAnimType): cc.Node {
        let node: cc.Node = null;

        // 创建池
        let pool: cc.NodePool = this._animPoolMap.get(type);
        if (!pool) {
            let poolHandlerComp: typeof cc.Component = null;
            switch (type) {
                case GiftAnimType.AIRPLANE:
                case GiftAnimType.LAMBORGHINI:
                case GiftAnimType.ROCKET:
                case GiftAnimType.DIAMOND:
                case GiftAnimType.GIFTCARD:
                case GiftAnimType.LOVEKISS: poolHandlerComp = GiftAnim; break;
                case GiftAnimType.ORBIT: poolHandlerComp = GiftAnimOrbit; break;
                default: break;
            }
            pool = new cc.NodePool(poolHandlerComp);
            this._animPoolMap.add(type, pool);
        }

        // 创建队列
        let queue: cc.Node[] = this._animQueueMap.get(type);
        if (!queue) {
            queue = [];
            this._animQueueMap.add(type, queue);
        }

        // 池中取
        if (pool.size() > 0) {
            node = pool.get();
            queue.push(node);

            console.log(`${GiftEntrance.g_class_name} - animi_inst => from pool: ${type}_${node.uuid}, [${pool.size()}, ${queue.length}]`);
        }
        // 队列中取
        else {
            // 入队
            if (queue.length < GiftData.GIFT_ANIMINS_TMAXCOUNT) {
                let prefab: cc.Prefab = null;
                switch (type) {
                    case GiftAnimType.ORBIT: prefab = this.prefab_orbit; break;
                    case GiftAnimType.AIRPLANE: prefab = this.prefab_airplane; break;
                    case GiftAnimType.LAMBORGHINI: prefab = this.prefab_lamborghini; break;
                    case GiftAnimType.ROCKET: prefab = this.prefab_rocket; break;
                    case GiftAnimType.DIAMOND: prefab = this.prefab_diamond; break;
                    case GiftAnimType.GIFTCARD: prefab = this.prefab_giftcard; break;
                    case GiftAnimType.LOVEKISS: prefab = this.prefab_lovekiss; break;
                    default: break;
                }

                if (prefab) {
                    node = cc.instantiate(prefab);
                    queue.push(node);

                    // 添加"tag"组件, 用于标记实例
                    let tag: TagCom = node.getComponent(TagCom);
                    if (!tag) tag = node.addComponent(TagCom);
                    tag.reset();

                    console.log(`${GiftEntrance.g_class_name} - animi_inst => from create: ${type}_${node.uuid}, [${pool.size()}, ${queue.length}]`);
                }
            }
            // 出队(这里只取引用, 回收接口里正真出队)
            else {
                // pop头部后先入池后出池
                node = queue[0];
                this._recycleAnimNodeToPool(node, type);
                node = pool.get();
                queue.push(node);

                console.log(`${GiftEntrance.g_class_name} - animi_inst => from queue: ${type}_${node.uuid}, [${pool.size()}, ${queue.length}]`);
            }
        }

        return node;
    }

    /**
     * 回收指定节点至指定类型的池中
     * @param node 
     * @param type 
     * @returns 
     */
    private _recycleAnimNodeToPool(node: cc.Node, type: GiftAnimType): void {
        if (!(node instanceof cc.Node) || !cc.isValid(node, true)) return;

        let pool: cc.NodePool = this._animPoolMap.get(type);
        let queue: cc.Node[] = this._animQueueMap.get(type);
        if (!pool || !queue) return;

        // 出队
        for (let i = 0; i < queue.length; ++i) {
            if (node.uuid === queue[i].uuid) {
                queue.splice(i--, 1);
                break;
            }
        }

        // 入池
        pool.put(node);

        // 重置节点属性
        let tag: TagCom = node.getComponent(TagCom);
        tag.reset();

        console.log(`${GiftEntrance.g_class_name} - animi_inst => recycle: ${type}_${node.uuid}, [${pool.size()}, ${queue.length}]`);
    }

    /**
     * 清理动画节点池
     */
    private _clearAnimNodePool(): void {
        this._animPoolMap.forEach((index: number, pool: cc.NodePool, i?: number): any => {
            pool.clear();
        });
        this._animPoolMap.clear();
        this._animQueueMap.clear();
    }

    /**
     * "礼物/弹幕"消息
     * @param t 
     */
    private _onMsgGiftNews(t: GiftNewsInfo): void {
        // 不是礼物消息则返回
        if (!t.gift || t.gift.newsType !== game_pb.NewsType.NewsType_Tip) return;

        // 送礼者是自己则返回(自己送礼的动画以按照需求单独处理)
        if (t.gift.player.playerid === cv.dataHandler.getUserData().u32Uid) return;

        // 处理礼物动画
        this._dealGiftNews(t.gift);
    }

    /**
     * 明星收礼信息已读状态
     * @param isRead 是否已读
     */
    private _onMsgStarsRecvReadStatus(isRead: boolean): void {
        this.img_dot.active = !isRead;
    }

    /**
     * 自己发送礼物消息(模拟数据, 用于容错网络延时时回消息较慢出现的动画不及时的问题)
     * @param param
     */
    private _onMsgSelfSendGift(param: GiftSelfSendInfo): void {
        let t: game_pb.RoomNews = game_pb.RoomNews.create();
        t = game_pb.RoomNews.create();
        t.newsType = game_pb.NewsType.NewsType_Tip;
        t.player = game_pb.PlayerAtomData.create();
        t.player.playerid = cv.dataHandler.getUserData().u32Uid;
        t.toPlayer = game_pb.PlayerAtomData.create();
        t.toPlayer.playerid = param.toUID;
        t.toPlayer.identity = 1;
        t.tip = game_pb.TipInfo.create();
        t.tip.tipId = param.giftID;
        t.tip.tipCount = param.giftCount;

        let uuid: string = this._getGiftAnimUUID(t);
        let counts: number = this._overlapGiftMap.get(uuid);
        if (counts !== null) {
            t.count5Second = counts + 1;
        }
        else {
            t.count5Second = 2;
        }

        this._dealGiftNews(t);
    }

    private _getGiftAnimUUID(t: game_pb.RoomNews): string {
        let uuid: string = "";
        let gift_id: number = t.tip.tipId;
        let src_uid: number = t.player.playerid;
        let tar_uid: number = t.toPlayer.playerid;

        // 单独叠加(动画独立, 数量叠加)
        // uuid = `gift_anim_${gift_id}_${src_uid}_${tar_uid}`;

        // 公用叠加(动画唯一, 数量叠加)
        uuid = `gift_anim_${gift_id}_${tar_uid}`;

        return uuid;
    }

    /**
     * 处理礼物动画数据
     * @param t 
     */
    private _dealGiftNews(t: game_pb.RoomNews): void {
        // 收礼者是自己且是明星, 则显示未读红点(送礼则不需要, 流程机制)
        let self_id: number = cv.dataHandler.getUserData().u32Uid;
        if (self_id === t.toPlayer.playerid && t.toPlayer.identity === 1) {
            cv.MessageCenter.send(GiftData.GIFT_MSG_STARS_RECVREAD_STATUS, false);
        }

        // 若"礼物动画开关"关闭且"送礼者不是自己"则返回
        let isAllowShowGiftAnim: boolean = cv.tools.isShowGiftAnim();
        if (!isAllowShowGiftAnim && self_id !== t.player.playerid) return;

        let info: GiftStarInfo = cv.GameDataManager.tGiftData.getStarInfoByID(t.toPlayer.playerid);
        if (!info) return;

        // 激活动画面板
        this._panel_anim.active = true;

        let srcWPos: cc.Vec2 = cc.Vec2.ZERO;
        let tarWPos: cc.Vec2 = cc.Vec2.ZERO;
        let isFindSendPlayerPos: boolean = false;
        let tarDir: number = cv.Enum.SeatDriction.DRICTION_BOTTOM;
        let seatListRef: readonly Seat[] = cv.GameDataManager.tGiftData.getSeatListRef();

        // 填充发送者和接收者的世界坐标
        for (let i = 0; i < seatListRef.length; ++i) {
            let viewStyle: number = seatListRef[i].getViewStyle();
            let playerInfo: PlayerInfo = seatListRef[i].getData();
            if (!playerInfo) continue;

            // 发送者位置
            if (playerInfo.playerid === t.player.playerid) {
                isFindSendPlayerPos = true;
                seatListRef[i].node.convertToWorldSpaceAR(cc.Vec2.ZERO, srcWPos);

                // 大视图
                if (viewStyle === 2) {
                    let starSeat: any = seatListRef[i];
                    if (starSeat.starVideo instanceof cc.Node) {
                        starSeat.starVideo.convertToWorldSpaceAR(cc.Vec2.ZERO, srcWPos);
                    }
                }
            }

            // 接受者位置
            if (playerInfo.playerid === t.toPlayer.playerid) {
                tarDir = seatListRef[i].direction;
                seatListRef[i].node.convertToWorldSpaceAR(cc.Vec2.ZERO, tarWPos);

                // 大视图
                if (viewStyle === 2) {
                    let starSeat: any = seatListRef[i];
                    if (starSeat.starVideo instanceof cc.Node) {
                        starSeat.starVideo.convertToWorldSpaceAR(cc.Vec2.ZERO, tarWPos);
                    }
                }
            }
        }

        // 若未在座位上找到发送者, 则默认为围观坐标
        if (!isFindSendPlayerPos) {
            srcWPos = cc.v2(cv.GameDataManager.tGiftData.getOnlookersPos());
        }

        let orbit: GiftAnimOrbit = this._getAnimNodeFromPool(GiftAnimType.ORBIT).getComponent(GiftAnimOrbit);
        this._panel_anim.addChild(orbit.node);

        // 礼物动画
        let isOverlap: boolean = this._playGiftAnim(t, tarWPos, tarDir);

        // 轨迹动画
        cv.AudioMgr.playEffect(`${GiftData.GIFT_AUDIO_PATH}orbit_start`);
        orbit.play(srcWPos, tarWPos, this._onOrbitAnimArrived.bind(this, t.tip.tipId, isOverlap)
            , this._onAnimFinished.bind(this, orbit.node, GiftAnimType.ORBIT));
    }

    /**
     * 播放对应礼物动画
     * @param t 
     * @param tarWPos 
     */
    private _playGiftAnim(t: game_pb.RoomNews, tarWPos: cc.Vec2, tarDir: number): boolean {
        let gift_id: number = t.tip.tipId;
        let animType: GiftAnimType = this._getAnimTypeByGiftID(gift_id);
        let isOverlap: boolean = false;

        // 若是高级礼物(先从显示列表取, 因为会叠加显示)
        if (gift_id >= 1000) {
            let node: cc.Node = null;
            let uuid: string = this._getGiftAnimUUID(t);
            let queue: cc.Node[] = this._animQueueMap.get(animType);

            if (Array.isArray(queue)) {
                for (let i = 0; i < queue.length; ++i) {
                    let tag: TagCom = queue[i].getComponent(TagCom);
                    if (tag.sTag === uuid) {
                        node = queue[i];
                        isOverlap = true;
                        break;
                    }
                }
            }

            // 池中取节点
            if (!node) {
                node = this._getAnimNodeFromPool(animType);
                let tag: TagCom = node.getComponent(TagCom);
                tag.sTag = uuid;
                this._panel_anim.addChild(node);
            }

            // 更新"连击礼物映射表"
            if (isOverlap) {
                this._overlapGiftMap.add(uuid, t.count5Second);
            }

            let anim: GiftAnim = node.getComponent(GiftAnim);
            let count: number = isOverlap ? t.count5Second : t.tip.tipCount;
            anim.play(tarWPos, tarDir, count, this._onAnimPlayEndClip.bind(this, anim.node, gift_id), this._onAnimFinished.bind(this, anim.node, animType), isOverlap);
        }
        // 低级礼物
        else {
            let anim: GiftAnim = this._getAnimNodeFromPool(animType).getComponent(GiftAnim);
            this._panel_anim.addChild(anim.node);
            anim.play(tarWPos, tarDir, t.tip.tipCount, this._onAnimPlayEndClip.bind(this, anim.node, gift_id), this._onAnimFinished.bind(this, anim.node, animType));
        }

        return isOverlap;
    }

    /**
     * 轨迹动画运动到目的地-回调
     * @param gift_id 
     * @param isOverlap
     */
    private _onOrbitAnimArrived(gift_id: number, isOverlap: boolean): void {
        cv.AudioMgr.playEffect(`${GiftData.GIFT_AUDIO_PATH}orbit_end`);
        if (!isOverlap) cv.AudioMgr.playEffect(`${GiftData.GIFT_AUDIO_PATH}gift${gift_id}`);
    }

    /**
     * 礼物动画开始播放最后阶段动画-回调
     * @param gift_id 
     */
    private _onAnimPlayEndClip(node: cc.Node, gift_id: number): void {
        cv.AudioMgr.playEffect(`${GiftData.GIFT_AUDIO_PATH}gift${gift_id}_end`);

        // 高级礼物此时回调就应该清除"叠加显示的"标记, 而不是等待彻底播完
        let tag: TagCom = node.getComponent(TagCom);
        this._overlapGiftMap.remove(tag.sTag);
        tag.reset();
    }

    /**
     * 动画播放完毕-回调
     * @param node 
     * @param animType 
     */
    private _onAnimFinished(node: cc.Node, animType: GiftAnimType): void {
        this._recycleAnimNodeToPool(node, animType);
    }
}
