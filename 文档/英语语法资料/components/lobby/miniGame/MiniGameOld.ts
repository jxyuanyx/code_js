import ws_protocol = require("./../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";
import { HashMap } from "../../../common/tools/HashMap";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

class game_icon {
    zi_icon_path: string = "";
    img_icon_path: string = "";
}
const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameOld extends cc.Component {
    @property(cc.Prefab) prefab_item_0: cc.Prefab = null;
    @property(cc.Prefab) prefab_item_1: cc.Prefab = null;
    @property(cc.Prefab) prefab_item_2: cc.Prefab = null;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    isTop: boolean = false;

    static g_class_name: string = "MiniGameOld";                                        // 类名
    private static g_instance: MiniGameOld = null;                                      // 伪单例

    private game_icon_path: string[] = [
        "cowboy", "cowboy_r",
        "sports", "sports_r",
        "br", "br_r",
        "videocowboy", "videocowboy_r",
        "pkds", "pkds_r",
    ];

    private iconMap: HashMap<number, game_icon> = new HashMap();

    private gameIdArray: number[] = [
        world_pb.GameId.CowBoy,
        world_pb.GameId.Sports,
        world_pb.GameId.HumanBoy,
        world_pb.GameId.VideoCowboy,
        world_pb.GameId.PokerMaster,
    ];

    private miniGameData: HashMap<number, world_pb.MiniGame[]> = new HashMap();

    /**
     * 静态初始化实例(会"add"到对应父节点且隐藏, 且只生效一次)
     * @brief 若调用层不采用该实例化方法, 也可自行维护
     * @param prefab        该预制件引用
     * @param parentNode    父节点(缺省时默认当前场景节点)
     * @param zorder        节点内部Z序(缺省时默认枚举)
     * @param pos           该节点实例化后的位置(缺省时默认居中)
     */
    static initSingleInst(prefab: cc.Prefab, parentNode?: cc.Node, zorder?: number, pos?: cc.Vec2): MiniGameOld {
        if (!(prefab instanceof cc.Prefab)) return null;

        if (!MiniGameOld.g_instance || !cc.isValid(MiniGameOld.g_instance)) {
            parentNode = parentNode ? parentNode : cc.director.getScene();
            zorder = zorder ? zorder : 0;

            let inst: cc.Node = cc.instantiate(prefab);
            MiniGameOld.g_instance = inst.getComponent(MiniGameOld);
            if (MiniGameOld.g_instance) {
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

        return MiniGameOld.g_instance;
    }

    protected onLoad(): void {
        if (!MiniGameOld.g_instance) MiniGameOld.g_instance = this;

        // 适配ios全面屏(底部栏)
        if (cc.sys.os === cc.sys.OS_IOS && cv.config.IS_FULLSCREEN) {
            let widget: cc.Widget = this.scrollView.getComponent(cc.Widget);
            widget.bottom += cv.config.FULLSCREEN_OFFSETY_B;
        }

        // 立即生效所有适配绑定
        cv.resMgr.adaptWidget(this.node, true);

        let len = this.gameIdArray.length;
        for (let i = 0; i < len; i++) {
            let icon = new game_icon();
            icon.zi_icon_path = "hall/miniGame/old/" + this.game_icon_path[2 * i];
            icon.img_icon_path = "hall/miniGame/old/" + this.game_icon_path[2 * i + 1];
            this.iconMap.add(this.gameIdArray[i], icon);
        }
        this._addObserver();

        this.scrollView.node.on("scroll-to-top", () => {
            this.isTop = true;
        }, this);

        this.scrollView.node.on("scroll-ended", () => {
            if (this.isTop) {
                this.isTop = false;
                cv.worldNet.MiniGamesListRequest();
                // this.scrollView.content.removeAllChildren(true);
            }
        }, this);

        this.ResponseRoomList(cv.dataHandler.getMiniGameList());
    }

    protected onEnable(): void {
        cv.worldNet.MiniGamesListRequest();
    }

    protected onDisable(): void {
        if (this.scrollView.isAutoScrolling()) {
            let offset = this.scrollView.getScrollOffset().y;
            let maxOffset = this.scrollView.getMaxScrollOffset().y;
            if (offset < 0) {
                this.scrollView.setContentPosition(cc.v2(0, this.scrollView.node.height * 0.5));
            }
            else if (offset > maxOffset) {
                this.scrollView.setContentPosition(cc.v2(0, this.scrollView.content.height - this.scrollView.node.height * 0.5));
            }
        }
    }

    protected onDestroy(): void {
        MiniGameOld.g_instance = null;
        console.log(`${MiniGameOld.g_class_name}: onDestroy`);

        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("MiniGamesListResponse", this.node);
        cv.MessageCenter.unregister("startSportsScene", this.node);
    }

    private _addObserver(): void {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._onMsgChangeLanguage.bind(this), this.node);
        cv.MessageCenter.register("MiniGamesListResponse", this.ResponseRoomList.bind(this), this.node);
        cv.MessageCenter.register("startSportsScene", this.startSportsScene.bind(this), this.node);
    }

    // "切换语言"消息
    private _onMsgChangeLanguage(): void {
        this.ResponseRoomList([], true);
    }

    private ResponseRoomList(msg: world_pb.MiniGame[], isLang: boolean = false) {
        this.scrollView.content.destroyAllChildren();
        this.scrollView.content.removeAllChildren(true);
        if (!isLang) {
            let len = cv.StringTools.getArrayLength(msg);
            this.miniGameData.clear();
            if (len <= 0) return;
            msg.sort(this.sortRoomList);
            for (let i = 0; i < len; i++) {
                let tempItem = msg[i];
                // if (tempItem.sourceType == cv.Enum.GameId.PokerMaster) continue;
                let arr: world_pb.MiniGame[] = this.miniGameData.get(tempItem.sourceType);
                arr = arr == null ? [] : arr;
                arr.push(tempItem);
                this.miniGameData.add(tempItem.sourceType, arr);
            }
        }

        if (this.miniGameData.length <= 0) return;
        let tempHeight = 0;
        let num = 0;
        let idLen = this.gameIdArray.length;
        for (let ij = 0; ij < idLen; ++ij) {
            let key = this.gameIdArray[ij];
            let value: world_pb.MiniGame[] = this.miniGameData.get(key);

            // this.miniGameData.forEach((key: number, value: world_pb.MiniGame[], i?: number) => {
            let arrLen = cv.StringTools.getArrayLength(value);
            if (arrLen < 1) continue;
            let item: cc.Node = null;
            // if (arrLen == 1) {
            //     item = cc.instantiate(this.prefab_item_0);
            //     item.on(cc.Node.EventType.TOUCH_END, () => {
            //         cv.roomManager.RequestJoinRoom(key, value[0].roomid);
            //     }, this);
            //     this.scrollView.content.addChild(item);
            //     this.setContent(item, value[0]);
            //     tempHeight = tempHeight + item.height;
            //     num++;
            // }
            // else if (arrLen > 1) {
            item = cc.instantiate(this.prefab_item_1);
            this.scrollView.content.addChild(item);
            let scroll = item.getChildByName("scrollView");
            let content = scroll.getChildByName("content");
            let scrollBar = scroll.getChildByName("scrollBar");
            let scrollBg = item.getChildByName("scroll_bg");
            let getHeight = (len: number) => {
                return 171 * len + 8 * (len - 1);
            }
            if (arrLen <= 4) {
                item.setContentSize(item.width, item.height + getHeight(arrLen));
                scrollBg.setContentSize(scroll.width, getHeight(arrLen));
                scroll.setContentSize(scroll.width, getHeight(arrLen));
                scroll.removeComponent(cc.ScrollView);
                scrollBar.active = false;
                tempHeight = tempHeight + item.height;
                num++;
            }
            else {
                item.setContentSize(item.width, item.height + getHeight(4));
                scrollBg.setContentSize(scroll.width, getHeight(4));
                scroll.setContentSize(scroll.width, getHeight(4));
                tempHeight = tempHeight + item.height;
                num++;
            }
            content.setContentSize(content.width, getHeight(arrLen));

            for (let i = 0; i < arrLen; i++) {
                let item2 = cc.instantiate(this.prefab_item_2);
                item2.on(cc.Node.EventType.TOUCH_END, () => {
                    if (cv.dataHandler.getUserData().isban) {
                        cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
                        return;
                    }

                    if (key == world_pb.GameId.Sports && cv.dataHandler.getUserData().isTouristUser) {
                        cv.TP.showMsg(cv.config.getStringData("Sports_enter_tip"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler));
                        return;
                    }

                    cv.roomManager.RequestJoinRoom(key, value[i].roomid);
                }, this);
                content.addChild(item2);
                this.setContent(item2, value[i]);
            }
            content.getComponent(cc.Layout).updateLayout();
            // }
            this.setIcon(item, key);
            // });
        }
        this.scrollView.content.getComponent(cc.Layout).updateLayout();
        tempHeight = tempHeight + (num - 1) * 18;
        this.scrollView.content.setContentSize(this.scrollView.content.width, tempHeight > this.scrollView.node.height ? tempHeight : this.scrollView.node.height);
    }

    private sortRoomList(a: world_pb.MiniGame, b: world_pb.MiniGame): number {
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

    private setIcon(node: cc.Node, gameId: number) {
        let game_icon_0 = node.getChildByName("game_icon_0");
        let game_icon_1 = cc.find("bg/game_icon_1", node);
        let iconPath = this.iconMap.get(gameId);
        if (iconPath) {
            cv.resMgr.setSpriteFrame(game_icon_0, cv.config.getLanguagePath(iconPath.zi_icon_path));
            cv.resMgr.setSpriteFrame(game_icon_1, cv.config.getLanguagePath(iconPath.img_icon_path, LANGUAGE_TYPE.zh_CN));
        }
    }

    private setContent(node: cc.Node, data: world_pb.MiniGame) {
        let score_lab = node.getChildByName("score_lab");
        let score = score_lab.getChildByName("score");
        let people_lab = node.getChildByName("people_lab");
        let people = people_lab.getChildByName("people");
        let level = node.getChildByName("level");

        cv.resMgr.setSpriteFrame(score_lab, cv.config.getLanguagePath("hall/miniGame/old/mini_score"), (frame: cc.SpriteFrame) => {

            cv.resMgr.adaptWidget(score_lab, true);
            let score_lab_S = score_lab.getContentSize();
            let AmountLevel = data.AmountLevel[0];
            score.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(AmountLevel);
            //score.setPosition(score_lab.x + score_lab_S.width + 8, score.y);
        });
        cv.resMgr.setSpriteFrame(people_lab, cv.config.getLanguagePath("hall/miniGame/old/mini_peo"), (frame: cc.SpriteFrame) => {
            cv.resMgr.adaptWidget(people_lab, true);
            let people_lab_S = people_lab.getContentSize();
            let peopleSize = people.getComponent(cc.Label).string = (data.playerNum).toString();
            //people.setPosition(people_lab.x + people_lab_S.width + 8, people.y);
        });

        if (level) {
            cv.resMgr.setSpriteFrame(level, cv.config.getLanguagePath(cv.StringTools.formatC("hall/miniGame/old/chang_%d", data.deskType - 1)));
        }
    }

    private startSportsScene() {
        cv.action.switchScene(cv.Enum.SCENE.SPORTS_SCENE);
    }
}