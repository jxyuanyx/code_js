import pb_humanboy = require("../../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import cv from "../../lobby/cv";
import humanboyDataMgr from "./HumanboyDataMgr";
import { TagCom } from "../../../common/tools/TagCom";
import { eHumanboyDealerListViewType } from "./HumanboyDealerList";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import { CircleSprite, Head_Mode } from "../../../common/tools/CircleSprite";

const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyDealerListItem extends cc.Component {

    @property(cc.Sprite) img_selected: cc.Sprite = null;                    // 选中状态图
    @property(cc.Sprite) img_head: cc.Sprite = null;                        // 头像
    @property(cc.Sprite) img_head_box: cc.Sprite = null;                    // 头像框
    @property(cc.Sprite) img_gold: cc.Label = null;                         // 金币图

    @property(cc.Label) txt_index: cc.Label = null;                         // 序号
    @property(cc.Label) txt_name: cc.Label = null;                          // 昵称
    @property(cc.Label) txt_gold: cc.Label = null;                          // 金币
    @property(cc.Label) txt_score: cc.Label = null;                         // 分数

    private _txt_gold_src_pos: cc.Vec2 = cc.Vec2.ZERO;                      // 金币文本 原位置
    private _txt_score_src_pos: cc.Vec2 = cc.Vec2.ZERO;                     // 分数文本 原位置

    updateSVReuseData(index: number, dataArray: any[], sv: ScrollViewReuse): void {
        if (index < 0 || index >= dataArray.length) return;

        let data: humanboy_proto.DealerPlayerInfo = dataArray[index];
        this._setData(index, data, sv);
    }

    protected onLoad(): void {
        this._txt_gold_src_pos = cc.v2(this.txt_gold.node.position);
        this._txt_score_src_pos = cc.v2(this.txt_score.node.position);
    }

    protected start(): void { }

    private _setData(idx: number, data: humanboy_proto.DealerPlayerInfo, sv: ScrollViewReuse): void {
        this.txt_index.string = cv.StringTools.formatC("%d", idx + 1);

        let scaleRate: number = 0.7;
        let strName: string = "";
        let llGold: number = cv.StringTools.times(data.stockNum, humanboyDataMgr.getHumanboyRoom().tCurRoom.moneyPerStock);
        let llScore: number = data.winningCoin;
        this.txt_gold.node.active = false;
        this.txt_score.node.active = false;

        let tag: TagCom = sv.getComponent(TagCom);
        if (!tag) return;

        let viewType: eHumanboyDealerListViewType = tag.nTag;
        this.txt_gold.string = humanboyDataMgr.getHumanboyRoom().transGoldShortString(llGold);

        let offset_x: number = 10;
        let szTxtGold: cc.Size = cv.resMgr.getLabelStringSize(this.txt_gold);

        if (data.uid === 0 || viewType == eHumanboyDealerListViewType.HDLV_TYPE_WATTING) {
            this.txt_gold.node.active = true;
            this.txt_gold.node.setPosition(this.txt_gold.node.x, 0);

            let scale: number = data.uid === 0 ? scaleRate : 1.0;
            this.img_gold.node.setScale(scale);
            this.img_gold.node.setPosition(this.txt_gold.node.x - szTxtGold.width - offset_x, this.txt_gold.node.y);
        }
        else if (viewType === eHumanboyDealerListViewType.HDLV_TYPE_CANDIDATE) {
            this.txt_gold.node.active = true;
            this.txt_score.node.active = true;

            let str_sign: string = "";
            let color: cc.Color = cc.Color.WHITE;
            if (llScore > 0) {
                str_sign = "+";
                color = cc.color(0xFF, 0x00, 0x00, 0xFF);
            }
            else if (llScore < 0) {
                color = cc.color(0x42, 0xFF, 0x41, 0xFF);
            }
            else {
                color = cc.Color.WHITE;
            }

            this.txt_score.string = str_sign + humanboyDataMgr.getHumanboyRoom().transGoldShortString(llScore);
            this.txt_score.node.color = color;

            this.txt_gold.node.setPosition(this._txt_gold_src_pos);
            this.txt_score.node.setPosition(this._txt_score_src_pos);

            this.img_gold.node.setScale(scaleRate);
            this.img_gold.node.setPosition(this.txt_gold.node.x - szTxtGold.width - offset_x, this.txt_gold.node.y);
        }

        // 系统庄
        if (data.uid === 0) {
            strName = cv.config.getStringData("Humanboy_game_dealer_system");

            let csp: cc.Node = CircleSprite.getHeadNode(this.img_head.node);
            if (csp) csp.parent.active = false;

            cv.resMgr.setSpriteFrame(this.img_head.node, "zh_CN/game/humanboy/head/head_system_suqare");
            cv.resMgr.setSpriteFrame(this.img_head_box.node, "zh_CN/game/humanboy/head/head_system_box_square");
        }
        // 玩家庄
        else {
            strName = data.name;
            let headUrl: string = data.head;
            CircleSprite.setCircleSprite(this.img_head.node, headUrl, data.plat, false, Head_Mode.IRREGULAR);

            this.img_head.spriteFrame = null;
            cv.resMgr.setSpriteFrame(this.img_head_box.node, "zh_CN/game/humanboy/head/head_player_box_square");
        }

        this.txt_name.string = strName;
        this.img_selected.node.active = data.uid === cv.dataHandler.getUserData().u32Uid
    }
}
