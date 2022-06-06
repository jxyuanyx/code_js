import cv from "../../lobby/cv";
import JackfruitManager from "./JackfruitManager";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import { CardItem, PlayerInfo, PlayerSettle, PlaceResult, GameRecord } from "./JackfruitData";
import { GameReviewDataType, CardNum, CardSuit } from "../../../../Script/common/tools/Enum";
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
import { RemarkData } from "../../../data/userData";
const { ccclass, property } = cc._decorator;

@ccclass
export class JackfruitReview extends cc.Component {
    @property(cc.Sprite) title_img: cc.Sprite = null;
    @property(cc.Label) room_name: cc.Label = null;
    @property(cc.Sprite) self_cards: cc.Sprite[] = [];
    @property(cc.Sprite) other_cards: cc.Sprite[] = [];
    @property(cc.Sprite) public_cards: cc.Sprite[] = [];
    @property(cc.Label) self_card_types: cc.Label[] = [];
    @property(cc.Label) other_card_types: cc.Label[] = [];
    @property(cc.Label) score_list: cc.Label[] = [];
    @property(cc.Label) score_num_list: cc.Label[] = [];
    @property(cc.Sprite) score_img: cc.Sprite[] = [];
    @property(cc.Label) all_win_list: cc.Label[] = [];
    @property(cc.Node) seat: cc.Node[] = [];
    @property(cc.Node) fold_card_panel: cc.Node[] = [];
    @property(cc.Node) btn_screenshot: cc.Node = null;

    @property(cc.Node) view_panle: cc.Node = null;
    @property(cc.Node) view_panle_empty: cc.Node = null;
    @property(cc.Node) button_panel: cc.Node = null;

    @property(cc.Button) btn_first: cc.Button = null;
    @property(cc.Button) btn_last: cc.Button = null;
    @property(cc.Button) btn_before: cc.Button = null;
    @property(cc.Button) btn_next: cc.Button = null;
    @property(cc.Label) txt_page: cc.Label = null;
    public index = 0;
    public _selfSeatID = 0;
    // 数据源类型
    private _dataSourceType: GameReviewDataType = GameReviewDataType.EDST_NONE;
    // 牌谱数据源数组
    private _vGameUUID: string[] = [];
    // 当前显示的牌局uuid
    private _sCurGameUUID: string = "";
    // 传入的页面标题
    private _pageTitle: string = '';
    // 屏蔽层(总体)
    private _shieldLayer: cc.Node = null;
    // 上次保存的牌谱页签(切换场景时自动被清理)
    private _last_save_index: number = -1;

    static gClassName: string = "JackfruitReview";

    onLoad() {
        if (cv.config.IS_IPHONEX_SCREEN) {
            this.view_panle.getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
            cc.find("title_panel", this.node).getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        }
        cv.resMgr.adaptWidget(this.node, true);
        this.initLanguage();
        if (cv.config.isSiyuType()) {
            //私语平台，保存到相册 按钮隐藏
            this.btn_screenshot.active = false;
        }

        for (let i = 0; i < 3; i++) {
            let pos = this.other_card_types[i].node.getPosition();
            let pos1 = this.other_cards[i * 2].node.getPosition();
            this.other_card_types[i].node.setPosition(cc.v2(pos.x, pos1.y - 52));

            pos = this.self_card_types[i].node.getPosition();
            pos1 = this.self_cards[i * 2].node.getPosition();
            this.self_card_types[i].node.setPosition(cc.v2(pos.x, pos1.y - 52));
        }

        cv.MessageCenter.register("updata_record", this.onGameRecord.bind(this), this.node);
        cv.MessageCenter.register("update_jackfruit_record", this.onGameRecord.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("updata_record", this.node);
        cv.MessageCenter.unregister("update_jackfruit_record", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    public initLanguage() {
        cv.resMgr.setSpriteFrame(this.title_img.node, cv.config.getLanguagePath("game/jackfruit/review/review_title"));
        for (let i = 0; i < this.fold_card_panel.length; i++) {
            let node = cc.find("fold", this.fold_card_panel[i]);
            cv.resMgr.setSpriteFrame(node, cv.config.getLanguagePath("game/jackfruit/review/fold"));
        }
        for (let i = 0; i < 2; i++) {
            this.score_list[i].string = cv.config.getStringData("jackfruit_review_score_label");
        }
        cc.find("empty_label", this.view_panle_empty).getComponent(cc.Label).string = cv.config.getStringData("jackfruit_review_empty_label");
        cc.find("label", this.btn_screenshot).getComponent(cc.Label).string = cv.config.getStringData("jackfruit_review_btn_screenshot_label");
    }

    /**
     * 获取预制件单实例(一个场景中只存在一个)
     */
    static getSinglePrefabInst(prefab: cc.Prefab): cc.Node {
        if (!(prefab instanceof cc.Prefab)) return null;

        let instNode: cc.Node = cc.director.getScene().getChildByName(JackfruitReview.gClassName);
        if (!instNode) {
            instNode = cc.instantiate(prefab);
            if (!instNode.getComponent(JackfruitReview)) {
                instNode.destroy();
                return null;
            }
        }
        return instNode;
    }

    private _checkSelfrecord(record: any) {
        for (let i = 0; i < record.playersettle.length; i++) {
            if (cv.dataHandler.getUserData().u32Uid == record.playersettle[i].uid) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取牌局uuid列表
     */
    private _getGameUUIDs(): string[] {
        let vGameUUID: string[] = [];

        // 数据要深拷贝
        switch (this._dataSourceType) {
            case GameReviewDataType.EDST_NONE:
                break;
            case GameReviewDataType.EDST_RECORD: {
                break;
            }
            case GameReviewDataType.EDST_GAMEROOM: {
                let vHandUUIDList: string[] = JackfruitManager.tRoomData.gameUUIDs;
                vGameUUID = vHandUUIDList.slice(0, vHandUUIDList.length);
                break;
            }
            case GameReviewDataType.EDST_COLLECTION: {
                break;
            }
            default:
                break;
        }

        return vGameUUID;
    }

    public onGameRecord() {
        let len = this._vGameUUID.length;
        this.view_panle_empty.active = len <= 0;
        this.button_panel.active = len > 0;
        let roomData = JackfruitManager.tRoomData.param;
        this.room_name.string = this._pageTitle.trim().length > 0
            ? this._pageTitle
            : cv.tools.displayChineseName(roomData.gameName);

        if (len == 0) {
            return;
        }

        this.index = len > this.index ? this.index : len - 1;
        this._last_save_index = this.index;

        this.setBtnEnabled(this.btn_first, this.index > 0, "zh_CN/game/jackfruit/review/next_icon_1");
        this.setBtnEnabled(this.btn_last, this.index < len - 1, "zh_CN/game/jackfruit/review/next_icon_1");
        this.setBtnEnabled(this.btn_before, this.index > 0, "zh_CN/game/jackfruit/review/next_icon");
        this.setBtnEnabled(this.btn_next, this.index < len - 1, "zh_CN/game/jackfruit/review/next_icon");
        this.txt_page.string = (this.index + 1).toString() + "/" + len.toString();

        this._sCurGameUUID = this._vGameUUID[this.index];

        // 请求牌局数据
        let uid: number = cv.dataHandler.getUserData().u32Uid;
        switch (this._dataSourceType) {
            case GameReviewDataType.EDST_NONE:
                break;
            case GameReviewDataType.EDST_RECORD: {
                if (JackfruitManager.tGameRecords.hasJsonValue(this._sCurGameUUID)) {
                    const value: string = JackfruitManager.tGameRecords.recordCaches.get(this._sCurGameUUID);

                    this.onUpdateView(value);
                } else {
                    cv.httpHandler.requestJackfruitGameRecord(uid, this._sCurGameUUID, cv.Enum.GameId.Jackfruit);
                }

                break;
            }
            case GameReviewDataType.EDST_GAMEROOM: {
                if (JackfruitManager.tGameRecords.hasJsonValue(this._sCurGameUUID)) {
                    let value: string = JackfruitManager.tGameRecords.recordCaches.get(this._sCurGameUUID);
                    this.onUpdateView(value);
                }
                else {
                    cv.httpHandler.requestJackfruitGameRecord(uid, this._sCurGameUUID, cv.Enum.GameId.Jackfruit);
                }
                break;
            }
            case GameReviewDataType.EDST_COLLECTION: {
                break;
            }
            default:
                break;
        }
    }

    public onUpdateView(record: any) {
        this.view_panle.active = true;
        let isSelfRecord = this._checkSelfrecord(record);
        for (let i = 0; i < record.playersettle.length; i++) {
            let settle = record.playersettle[i];
            let isSelf = settle.seatid == this._selfSeatID;
            if (isSelfRecord) {
                isSelf = settle.uid == cv.dataHandler.getUserData().u32Uid;
            }
            this.setPlayerCards(isSelf, settle);
            this.setPlayerTypes(isSelf, settle);
            this.setScore(isSelf, settle.winscore);
            this.setSeat(isSelf, settle);
            this.setFoldCard(isSelf, settle);
        }
        for (let i = 0; i < this.public_cards.length; i++) {
            let card = this.public_cards[i];
            let item = record.pubCards[i]
            JackfruitManager.setCardImg(card.node, item);
        }

        if (this.index == 0) {

        }
    }

    public setPlayerCards(isSelf: boolean, player: any) {
        let cards = isSelf ? this.self_cards : this.other_cards;
        for (let i = 0; i < 2; i++) {
            let item = player.headcard[i];
            JackfruitManager.setCardImg(cards[i].node, item);
        }
        for (let i = 0; i < 2; i++) {
            let item = player.middlecard[i];
            JackfruitManager.setCardImg(cards[i + 2].node, item);
        }
        for (let i = 0; i < 2; i++) {
            let item = player.tailcard[i];
            JackfruitManager.setCardImg(cards[i + 4].node, item);
        }
    }

    public setPlayerTypes(isSelf: boolean, settle: any) {
        let types = isSelf ? this.self_card_types : this.other_card_types;
        // let resultList: PlaceResult[] = [];
        // resultList[0] = settle.headResult;
        // resultList[1] = settle.middleResult;
        // resultList[2] = settle.tailResult;

        let levels: number[] = [];
        levels.push(settle.headlevel);
        levels.push(settle.middlelevel);
        levels.push(settle.taillevel);
        let scores: number[] = []
        scores.push(settle.headscore);
        scores.push(settle.midscore);
        scores.push(settle.tailscore);
        for (let i = 0; i < types.length; i++) {
            types[i].string = JackfruitManager.getCardTypeStr(levels[i]) + " " + this.getScoreStr(scores[i]);
            types[i].node.color = scores[i] < 0 ? cc.color(255, 255, 255) : cc.color(255, 255, 0);
            types[i].node.opacity = scores[i] < 0 ? 127 : 255;
        }

        let isAllWin = true;
        let isAllLose = true;
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > 0) {
                isAllLose = false;
            } else if (scores[i] < 0) {
                isAllWin = false;
            } else {
                isAllWin = false;
                isAllLose = false;
            }
        }
        let index = isSelf ? 0 : 1;
        if (isAllWin) {
            this.all_win_list[index].node.active = true;
            this.all_win_list[index].node.color = cc.color(255, 255, 0);
            this.all_win_list[index].string = cv.config.getStringData("jackfruit_review_all_win_list_label");
        } else if (isAllLose) {
            this.all_win_list[index].node.active = true;
            this.all_win_list[index].node.color = cc.color(255, 255, 255);
            this.all_win_list[index].string = cv.config.getStringData("jackfruit_review_all_lose_list_label");
        } else {
            this.all_win_list[index].node.active = false;
        }
    }

    public setScore(isSelf: boolean, score: number) {
        let index = isSelf ? 0 : 1;
        this.score_num_list[index].string = this.getScoreStr(score);
        this.score_num_list[index].node.color = score < 0 ? cc.color(255, 255, 255) : cc.color(255, 255, 0);
    }

    public setSeat(isSelf: boolean, settle: any) {
        let index = isSelf ? 0 : 1;
        let seat: cc.Node = this.seat[index];
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(settle.uid);
        if (rdata.sRemark.length <= 0) {
            cv.StringTools.setShrinkString(cc.find("name_text", seat), settle.nickname, true);
        } else {
            cv.StringTools.setShrinkString(cc.find("name_text", seat), rdata.sRemark, true);
        }

        cc.find("gold_label", seat).getComponent(cc.Label).string = this.getShowScore(settle.score).toString();
        let head_node = cc.find("head_panel/headNode", seat);
        CircleSprite.setCircleSprite(head_node, settle.headurl, settle.plat, false);
    }
    public setFoldCard(isSelf: boolean, settle: any) {
        let index = isSelf ? 0 : 1;
        let panel: cc.Node = this.fold_card_panel[index];
        JackfruitManager.setCardImg(cc.find("fold_card", panel), settle.foldcard[0]);
    }

    public getScoreStr(score: number): string {
        score = this.getShowScore(score)
        return score >= 0 ? "+" + score.toString() : score.toString();
    }

    // 服务器分数转换为显示分数
    public getShowScore(score: number): number {
        return cv.StringTools.toFixed(cv.StringTools.serverGoldToShowNumber(score), 1);
    }

    public show(dataSourceType: GameReviewDataType, selfSeatID: number = 0, vGameUUID?: string[], title?: string) {
        this._dataSourceType = dataSourceType;
        this._vGameUUID = vGameUUID ? vGameUUID : this._getGameUUIDs();
        this._selfSeatID = selfSeatID;
        this._pageTitle = title || '';
        let len = this._vGameUUID.length;
        this.index = len > 0 ? len - 1 : len;

        // 若数据来源是房间, 且页签值有效, 则直接跳转至页签页数
        // 若数据来源是战绩等, 由于UI流程原因, 页签完全无意义, 直接过滤掉
        if (this._dataSourceType === GameReviewDataType.EDST_GAMEROOM && this._last_save_index >= 0) {
            this.index = this._last_save_index;
        }

        this.view_panle.active = false;
        this.onGameRecord();

        let scene = cc.director.getScene();
        let zorder = cv.Enum.ZORDER_TYPE.ZORDER_TOP;
        if (!this._shieldLayer) {
            this._shieldLayer = cv.action.createShieldLayer(scene, "shieldLayer-JackfruitReview", zorder, cc.Color.BLACK, 100);
            this._shieldLayer.zIndex = zorder;
        }
        // add
        let viewNode = scene.getChildByName(JackfruitReview.gClassName);
        if (!viewNode) {
            viewNode = this.node;
            viewNode.zIndex = zorder;
            viewNode.name = JackfruitReview.gClassName;
            scene.addChild(viewNode);
        }

        this._shieldLayer.active = true;
        cv.action.showAction(this.node,
            cv.action.eMoveActionDir.EMAD_TO_LEFT,
            cv.action.eMoveActionType.EMAT_FADE_IN,
            cv.action.delay_type.NORMAL,
            null,
            null, 1 / cc.game.getFrameRate());
    }

    public onBtnClose(event, str: string) {
        if (!this.node.active) return;
        if (str == "btn") {
            cv.AudioMgr.playButtonSound('close');
        }
        this.node.active = false;
        // hallscene场景需要
        cv.MessageCenter.send("show_mail_entrance");
        if (this._shieldLayer) this._shieldLayer.active = false;
        cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT, cv.action.delay_type.NORMAL);
    }

    obBtnFirst() {
        cv.AudioMgr.playButtonSound('button_click');
        this.index = 0;
        this.onGameRecord();
    }
    obBtnLast() {
        cv.AudioMgr.playButtonSound('button_click');
        let len = this._vGameUUID.length;
        this.index = len > 0 ? len - 1 : len;
        this.onGameRecord();
    }
    obBtnBefore() {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.index == 0) return;
        this.index--;
        this.onGameRecord();
    }
    obBtnNext() {
        cv.AudioMgr.playButtonSound('button_click');
        let len = this._vGameUUID.length;
        if (this.index == len - 1) return;
        this.index++;
        this.onGameRecord();
    }

    setBtnEnabled(btn: cc.Button, isEnabled: boolean, path: string) {
        btn.enabled = isEnabled;
        cv.resMgr.setSpriteFrame(cc.find("icon", btn.node), path + (isEnabled ? "" : "_disable"));
    }

    public onBtnScreenshot() {
        let scene = cc.director.getScene();
        let Canvas = scene.getChildByName("Canvas")
        if (Canvas == null) {
            Canvas = scene.getChildByName("HallScene")
        }
        let camera = Canvas.getChildByName("Main Camera").getComponent(cc.Camera);
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        let size = cc.size(Math.floor(Canvas.width), Math.floor(Canvas.height));
        texture.initWithSize(size.width, size.height, gl.STENCIL_INDEX8);
        camera.targetTexture = texture;
        camera.render(scene);
        let data = texture.readPixels();
        let picData = this.filpYImage(data, size.width, size.height);
        camera.targetTexture = null;
        if (cc.sys.isNative) {
            let writePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/'));
            let filePath = writePath + "screenshot.png";
            if (jsb.fileUtils.isFileExist(filePath)) {
                jsb.fileUtils.removeFile(filePath);
            }
            jsb.saveImageData(picData, size.width, size.height, filePath);
            let isok = true;
            if (cc.sys.os == cc.sys.OS_IOS) {
                let _iosRet = cv.native.invokeSyncFunc(cv.nativeCMD.KEY_SAVE_TO_ABLM, { "path": filePath })
                if (_iosRet == "false") {
                    isok = false;
                }
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                isok = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "saveTophoto", "(Ljava/lang/String;)Z", filePath);
            }

            if (isok) {
                cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips0"), cv.Enum.ToastType.ToastTypeInfo);
            } else {
                cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips1"), cv.Enum.ToastType.ToastTypeInfo);
            }
        }
    }

    // This is a temporary solution
    public filpYImage(data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    }
}
