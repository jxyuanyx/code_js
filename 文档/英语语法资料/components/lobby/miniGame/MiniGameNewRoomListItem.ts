import ws_protocol = require("../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";
import { TableView } from "../../../common/tools/TableView";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameNewRoomListItem extends cc.Component {
    @property(cc.Sprite) img_hot: cc.Sprite = null;
    @property(cc.Sprite) img_score: cc.Sprite = null;
    @property(cc.Sprite) img_online: cc.Sprite = null;
    @property(cc.Button) btn_enter: cc.Button = null;
    @property(cc.Label) txt_enter_word: cc.Label = null;
    @property(cc.Label) txt_level_word: cc.Label = null;
    @property(cc.Label) txt_score_word: cc.Label = null;
    @property(cc.Label) txt_score: cc.Label = null;
    @property(cc.Label) txt_online: cc.Label = null;

    static g_class_name: string = "MiniGameNewRoomListItem";
    private _dataRef: world_pb.MiniGame = null;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
        this.node.on("click", this._onClickBtnEnter, this);
        this.btn_enter.node.on("click", this._onClickBtnEnter, this);
    }

    protected start(): void {
    }

    protected onEnable(): void {
    }

    protected onDisable(): void {
    }

    protected onDestroy(): void {
    }

    private _onClickBtnEnter(event: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (!this._dataRef) return;
        cv.MessageCenter.send(`${MiniGameNewRoomListItem.g_class_name}_click`, this._dataRef);
    }

    updateSVReuseData(index: number, data: world_pb.MiniGame, view?: TableView): void {
        this._dataRef = data;

        this.img_hot.node.active = false;
        this.txt_level_word.string = cv.config.getStringData(`minigame_new_room_level_${data.deskType}`);
        this.txt_score_word.string = cv.config.getStringData(`minigame_new_room_score`);
        this.txt_score.string = cv.StringTools.serverGoldToShowString(data.AmountLevel[0]);
        this.txt_online.string = `${data.playerNum}`;
        this.txt_enter_word.string = cv.config.getStringData(`minigame_new_room_enter`);

        if (cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN) {
            this.txt_enter_word.fontSize = 40;
        }
        else {
            this.txt_enter_word.fontSize = 28;
        }

        // 横向排版"级别/HOT"
        if (this.img_hot.node.active) {
            let offset: number = 0;
            let x: number = this.txt_level_word.node.x;
            let y: number = this.txt_level_word.node.y;
            let txt_w: number = cv.resMgr.getLabelStringSize(this.txt_level_word).width;
            x += txt_w * this.txt_level_word.node.scaleX * (1 - this.txt_level_word.node.anchorX);
            x += offset;
            x += this.img_hot.node.width * this.img_hot.node.anchorX;
            this.img_hot.node.setPosition(x, y);
        }

        // 横向排版"底分/在线人数"
        do {
            let offset_next: number = 15;
            let offset_middle: number = 35;
            let x: number = this.txt_score_word.node.x;
            let y: number = this.txt_score_word.node.y;
            let txt_w: number = cv.resMgr.getLabelStringSize(this.txt_score_word).width;
            x += txt_w * this.txt_score_word.node.scaleX * (1 - this.txt_score_word.node.anchorX);

            // 底分图标
            x += offset_next;
            x += this.img_score.node.width * this.img_score.node.scaleX * this.img_score.node.anchorX;
            this.img_score.node.setPosition(x, y);
            x += this.img_score.node.width * this.img_score.node.scaleX * (1 - this.img_score.node.anchorX);

            // 底分
            x += offset_next;
            txt_w = cv.resMgr.getLabelStringSize(this.txt_score).width;
            x += txt_w * this.txt_score.node.scaleX * this.txt_score.node.anchorX;
            this.txt_score.node.setPosition(x, y);
            x += txt_w * this.txt_score.node.scaleX * (1 - this.txt_score.node.anchorX);

            // 在线人数图标
            x += offset_middle;
            x += this.img_online.node.width * this.img_online.node.scaleX * this.img_online.node.anchorX;
            this.img_online.node.setPosition(x, y);
            x += this.img_online.node.width * this.img_online.node.scaleX * (1 - this.img_online.node.anchorX);

            // 在线人数
            x += offset_next;
            txt_w = cv.resMgr.getLabelStringSize(this.txt_online).width;
            x += txt_w * this.txt_online.node.scaleX * this.txt_online.node.anchorX;
            this.txt_online.node.setPosition(x, y);
        } while (false);
    }
}
