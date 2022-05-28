import cv from "../../lobby/cv";

/*************************************************************************************************************************************
 * 百人下注金币预制件
 * 原版计划使用引擎"自动图集"处理(需要发布后的包体才会生效自动图集)以减少drawcall数量, 但实际上"自动图集"对合并"图片字体"支持不时很好(字体有黑边)
 * 因此使用"手动图集"(即把要使用的图片和字体图片合并到一张图集上, 缺点就是图片字体要手动计算排版, 失去了"字体"的意义)
 * 希望以后的引擎版本能完美解决"自动图集"的兼容性
*************************************************************************************************************************************/

/**
* 百人下注金币风格
*/
enum eHumanboyBetCoinShape {
    SHAPE_COIN = 0,                 // 金币状
    SHAPE_BLOCK = 1,                // 方块状
}

/**
* 百人下注金币字体颜色
*/
enum eHumanboyBetCoinTxtColor {
    NONE = 0,
    YELLOW = 1,                     // 黄色
    GRAY = 2,                       // 灰色
}

const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyBetCoin extends cc.Component {

    @property(cc.Button) btn: cc.Button = null;
    @property(cc.Node) txtBetNode: cc.Node = null;
    @property(cc.Sprite) imgMask: cc.Sprite = null;

    @property({
        "type": cc.Float,
        "tooltip": "数字横向间隔"
    }) txtOffset: number = 0;

    static eHumanboyBetCoinShape = eHumanboyBetCoinShape;                                                               // 下注金币外形风格
    static eHumanboyBetCoinTxtColor = eHumanboyBetCoinTxtColor;                                                         // 百人下注金币字体颜色

    private _shape = eHumanboyBetCoinShape.SHAPE_COIN;                                                                  // 金币外形枚举
    private _txtColor = eHumanboyBetCoinTxtColor.NONE;                                                                  // 金币字体颜色枚举
    private _txtNum: number = 0;                                                                                        // 金币数字

    protected onLoad(): void {
    }

    protected start(): void {
    }

    /**
     * 设置金币外形
     */
    setShape(shape: eHumanboyBetCoinShape) {
        if (this._shape === shape) return;
        this._shape = shape;

        let atlas_hb_humanboy: cc.SpriteAtlas = cv.resMgr.getSpriteAtlas("zh_CN/game/humanboyPlist/humanboy");
        switch (this._shape) {
            case eHumanboyBetCoinShape.SHAPE_COIN: {
                this.btn.node.getComponent(cc.Sprite).spriteFrame = atlas_hb_humanboy.getSpriteFrame("bet_coin_clicked");
                this.btn.normalSprite = atlas_hb_humanboy.getSpriteFrame("bet_coin_clicked");
                this.btn.pressedSprite = atlas_hb_humanboy.getSpriteFrame("bet_coin_clicked");
                this.btn.hoverSprite = atlas_hb_humanboy.getSpriteFrame("bet_coin_clicked");
                this.btn.disabledSprite = atlas_hb_humanboy.getSpriteFrame("bet_coin_disabled_big");
                this.imgMask.spriteFrame = atlas_hb_humanboy.getSpriteFrame("bet_coin_disable_mask_big");
            } break;

            case eHumanboyBetCoinShape.SHAPE_BLOCK: {
                this.btn.node.getComponent(cc.Sprite).spriteFrame = atlas_hb_humanboy.getSpriteFrame("bet_block_clicked");
                this.btn.normalSprite = atlas_hb_humanboy.getSpriteFrame("bet_block_clicked");
                this.btn.pressedSprite = atlas_hb_humanboy.getSpriteFrame("bet_block_clicked");
                this.btn.hoverSprite = atlas_hb_humanboy.getSpriteFrame("bet_block_clicked");
                this.btn.disabledSprite = atlas_hb_humanboy.getSpriteFrame("bet_block_disabled_big");
                this.imgMask.spriteFrame = atlas_hb_humanboy.getSpriteFrame("bet_block_disable_mask_big");
            } break;

            default:
                break;
        }
    };

    /**
     * 获取金币外形
     */
    getShape(): eHumanboyBetCoinShape {
        return this._shape;
    }

    /**
     * 设置金币数字
     * @param num 
     * @param txtColor 
     */
    setTxtNum(num: number, txtColor: eHumanboyBetCoinTxtColor = eHumanboyBetCoinTxtColor.YELLOW): void {
        if (num === this._txtNum) return;
        this._txtNum = num;
        this._txtColor = txtColor;

        let strTmp: string = cv.String(this._txtNum);
        let strColor: string = "";
        switch (this._txtColor) {
            case eHumanboyBetCoinTxtColor.NONE:
            case eHumanboyBetCoinTxtColor.YELLOW: strColor = "yellow_fnt_"; break;
            case eHumanboyBetCoinTxtColor.GRAY: strColor = "gray_fnt_"; break;
            default: break;
        }

        // 删除多余节点
        if (this.txtBetNode.childrenCount > strTmp.length) {
            let vRemoveNodes: cc.Node[] = [];
            for (let i = strTmp.length; i < this.txtBetNode.childrenCount; ++i) {
                vRemoveNodes.push(this.txtBetNode.children[i]);
            }
            for (let i = 0; i < vRemoveNodes.length; ++i) {
                vRemoveNodes[i].removeFromParent(true);
                cv.tools.destroyNode(vRemoveNodes[i]);
            }
        }

        // 填充节点图片
        let txt_total_w: number = 0;
        let atlas_hb_humanboy: cc.SpriteAtlas = cv.resMgr.getSpriteAtlas("zh_CN/game/humanboyPlist/humanboy");
        for (let i = 0; i < strTmp.length; ++i) {
            let spr: cc.Sprite = null;
            if (this.txtBetNode.childrenCount > i) {
                spr = this.txtBetNode.children[i].getComponent(cc.Sprite);
            }
            else {
                spr = (new cc.Node()).addComponent(cc.Sprite);
                this.txtBetNode.addChild(spr.node);
            }

            spr.spriteFrame = atlas_hb_humanboy.getSpriteFrame(strColor + strTmp.charAt(i));
            spr.type = cc.Sprite.Type.SIMPLE;
            spr.sizeMode = cc.Sprite.SizeMode.RAW;
            spr.trim = false;
            spr.node.setAnchorPoint(0.5, 0.5);
            spr.node.setPosition(0, 0);

            txt_total_w += spr.node.width;
        }

        // 计算坐标
        let start_x: number = (this.txtBetNode.width - (txt_total_w + this.txtOffset * (strTmp.length - 1))) / 2 - this.txtBetNode.anchorX * this.txtBetNode.width;
        start_x += this.txtBetNode.children[0].width * this.txtBetNode.children[0].anchorX;
        let start_y: number = 0;
        for (let i = 0; i < this.txtBetNode.childrenCount; ++i) {
            let node: cc.Node = this.txtBetNode.children[i];
            node.setPosition(start_x, start_y);
            start_x += this.txtOffset;
            start_x += node.width;
        }
    }

    /**
     * 获取金币数字
     */
    getTxtNum(): number {
        return this._txtNum;
    }

    /**
     * 设置金币颜色
     * @param txtColor 
     */
    setTxtColor(txtColor: eHumanboyBetCoinTxtColor): void {
        if (this._txtColor === txtColor) return;
        this._txtColor = txtColor;

        let strColor: string = "";
        switch (this._txtColor) {
            case eHumanboyBetCoinTxtColor.NONE:
            case eHumanboyBetCoinTxtColor.YELLOW: strColor = "yellow_fnt_"; break;
            case eHumanboyBetCoinTxtColor.GRAY: strColor = "gray_fnt_"; break;
            default: break;
        }

        let strTmp: string = cv.String(this._txtNum);
        let atlas_hb_humanboy: cc.SpriteAtlas = cv.resMgr.getSpriteAtlas("zh_CN/game/humanboyPlist/humanboy");
        for (let i = 0; i < this.txtBetNode.childrenCount; ++i) {
            let spr: cc.Sprite = this.txtBetNode.children[i].getComponent(cc.Sprite);
            spr.spriteFrame = atlas_hb_humanboy.getSpriteFrame(strColor + strTmp.charAt(i));
        }
    }

    /**
     * 获取金币颜色
     */
    getTxtColor(): eHumanboyBetCoinTxtColor {
        return this._txtColor;
    }
}
