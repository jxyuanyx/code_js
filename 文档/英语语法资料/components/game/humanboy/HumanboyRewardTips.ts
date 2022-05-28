import cv from "../../lobby/cv";

/*
*	通用奖励提示面板
*/
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyRewardTips extends cc.Component {
    @property(cc.Sprite) img_reward: cc.Sprite = null;
    @property(cc.RichText) txt_reward: cc.RichText = null;

    private _img_reward_src_size: cc.Size = cc.Size.ZERO;
    private _txt_reward_src_size: cc.Size = cc.Size.ZERO;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node);

        this._img_reward_src_size = cc.size(this.img_reward.node.getContentSize());
        this._txt_reward_src_size = cc.size(this.txt_reward.node.getContentSize());
    }

    protected start(): void { }

    private _doLayout(strTxt: string): void {
        // 复原文本大小
        let szTxt: cc.Size = cc.size(this._txt_reward_src_size);
        this.txt_reward.maxWidth = szTxt.width
        //this.txt_reward.node.setContentSize(szTxt);

        // 计算自动换行后的大小(这里采用有限for循环, 而不是递归, 避免递归太深栈溢出)
        for (let i: number = 0; i < this.txt_reward.string.length; ++i) {
            this.txt_reward.string = cv.StringTools.calculateAutoWrapString(this.txt_reward.node, strTxt);
            let szTmp: cc.Size = cc.size(cv.resMgr.getRichTextStringSize(this.txt_reward));
            if (szTmp.height <= this._txt_reward_src_size.height) break;

            szTxt.width += this.txt_reward.fontSize;
            this.txt_reward.maxWidth = szTxt.width;
            //this.txt_reward.node.setContentSize(szTxt);
        }

        // 适配背景大小
        let offset_w: number = szTxt.width - this._txt_reward_src_size.width;
        let offset_h: number = szTxt.height - this._txt_reward_src_size.height;
        let szImg: cc.Size = cc.size(this._img_reward_src_size.width + offset_w, this._img_reward_src_size.height + offset_h);
        this.img_reward.node.setContentSize(szImg);

        // 适配文本位置
        let pos_x: number = (this.txt_reward.node.anchorX - this.img_reward.node.anchorX) * this.img_reward.node.width * this.img_reward.node.scaleX;
        let pos_y: number = (this.txt_reward.node.anchorY - this.img_reward.node.anchorY) * this.img_reward.node.height * this.img_reward.node.scaleY;
        this.txt_reward.node.setPosition(pos_x, pos_y);
    }

    show(strTxt: string, fDelayHide: number = 4): void {
        this._doLayout(strTxt);
        
        this.node.active = true;
        this.node.opacity = 0xFF;
        this.node.stopAllActions();

        let halfDelay: number = fDelayHide / 2;
        this.node.runAction(cc.sequence(cc.delayTime(halfDelay), cc.fadeOut(halfDelay), cc.callFunc(this.hide, this)));
    }

    hide(): void {
        this.node.active = true;
        this.node.stopAllActions();

        this.node.active = false;
    }
}
