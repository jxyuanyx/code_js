import gs_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import cv from "../../../lobby/cv";
import { CircleSprite } from "../../../../common/tools/CircleSprite";
import { GiftData } from "./GiftData";

const { ccclass, property } = cc._decorator;
@ccclass
export class GiftRankItem extends cc.Component {
    @property(cc.Sprite) img_head_mask: cc.Sprite = null;
    @property(cc.Sprite) img_head_box: cc.Sprite = null;
    @property(cc.Sprite) img_rank_number: cc.Sprite = null;
    @property(cc.Label) txt_rank_number: cc.Label = null;
    @property(cc.Label) txt_name: cc.Label = null;
    @property(cc.Label) txt_gold: cc.Label = null;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
    }

    /**
     * 该节点出池时触发(NodePool.get)
     */
    protected reuse(): void {
    }

    /**
     * 该节点入池时触发(NodePool.put)
     */
    protected unuse(): void {
    }

    updateSVReuseData(index: number, data: game_pb.TipUserContr): void {
        let rankIdx: number = index + 1;
        let atlasPath: string = GiftData.GIFT_PLIST_PATH;

        let topLimit: number = 3;
        let head_box_path: string = `avatar_frame_${Math.min(rankIdx, topLimit + 1)}`;
        this.img_head_box.spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, head_box_path);

        if (rankIdx <= topLimit) {
            this.txt_rank_number.node.active = false;
            this.img_rank_number.node.active = true;
            this.img_rank_number.spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, `img_rank_${rankIdx}`);
        }
        else {
            this.img_rank_number.node.active = false;
            this.txt_rank_number.node.active = true;
            this.txt_rank_number.string = `${rankIdx}`;
        }

        let txt_name_color: cc.Color = cc.color(0xE6, 0xE7, 0xFB);
        if (data.player.playerid === cv.dataHandler.getUserData().u32Uid) {
            txt_name_color.r = 0xFE;
            txt_name_color.g = 0xC7;
            txt_name_color.b = 0x28;
        }

        this.txt_name.node.color = txt_name_color;
        this.txt_name.string = data.player.nickname;
        this.txt_gold.string = cv.StringTools.numToFloatString(data.contr);

        CircleSprite.setCircleSprite(this.img_head_mask.node, data.player.avatar, data.player.plat);
    }
}
