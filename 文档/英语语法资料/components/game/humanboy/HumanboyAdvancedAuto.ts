import cv from "../../lobby/cv";
import cowboyDataMgr from "../cowboy/cb";
import humanboyDataMgr from "./HumanboyDataMgr";
import { TagCom } from "../../../common/tools/TagCom";
import VideoCowboyManager from "../videoCowboy/VideoCowboyManager";
import pokerMasterDataMgr from "../pokerMaster/PokerMasterDataMgr";

/**
 * 高级续投选择次数面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyAdvancedAuto extends cc.Component {

    private _panel_select: cc.Node = null;														            // 高级续投选择面板
    private _panel_msgtip: cc.Node = null;															        // 高级续投提示面板

    private _ps_layout_once: boolean = false;													            // 高级续投选择面板 布局标记
    private _ps_img_shield: cc.Node = null;														            // 高级续投选择面板 遮罩面板
    private _ps_block_panel: cc.Node = null;														        // 高级续投选择面板 选择次数面板
    private _ps_btn_cancel: cc.Button = null;													            // 高级续投选择面板 取消按钮
    private _ps_cell_size: cc.Size = cc.Size.ZERO;												            // 高级续投选择面板 块大小
    private _ps_btns: cc.Button[] = [];																        // 高级续投选择面板 按钮数组

    private _pm_auto_count: cc.Label = null;															    // 高级续投提示面板 续投次数
    private _pm_auto_tips: cc.Sprite = null;															    // 高级续投提示面板 续投提示

    protected onLoad(): void {
        this._initUI();
    }

    protected start(): void {
    }

    private _initUI(): void {
        // 选择面板
        this._panel_select = this.node.getChildByName("panel_select");
        this._panel_select.on(cc.Node.EventType.TOUCH_END, (sender: cc.Node): void => { this.hideSelectPanel(true); });
        this._panel_select.active = false;

        this._ps_img_shield = this._panel_select.getChildByName("img_shield");
        this._ps_img_shield.getComponent(cc.BlockInputEvents).enabled = false;

        this._ps_block_panel = this._panel_select.getChildByName("panel_block");
        this._ps_cell_size.width = this._ps_block_panel.width;
        this._ps_cell_size.height = this._ps_block_panel.height;

        this._ps_btn_cancel = this._ps_block_panel.getChildByName("btn_cancel").getComponent(cc.Button);
        this._ps_btn_cancel.node.on("click", (sender: cc.Node): void => { this.hideSelectPanel(true); });

        // 提示面板
        this._panel_msgtip = this.node.getChildByName("panel_msgtip");
        this._pm_auto_count = this._panel_msgtip.getChildByName("txt_count").getComponent(cc.Label);
        this._pm_auto_count.node.active = false;
        this._pm_auto_tips = this._panel_msgtip.getChildByName("img_tips").getComponent(cc.Sprite);
        this._pm_auto_tips.node.active = false;

        // Widget 适配 立即生效
        cv.resMgr.adaptWidget(this.node);
    }

    // 布局高级续投 选择次数面板
    private _layoutSelectPanelOnce(bReset: boolean): void {
        if (bReset) this._ps_layout_once = false;
        if (this._ps_layout_once) return;
        this._ps_layout_once = true;

        let vBtns: cc.Button[] = [];
        vBtns.push(this._ps_btn_cancel);

        let txt: cc.Label = this._ps_btn_cancel.node.getChildByName("txt").getComponent(cc.Label);
        txt.string = cv.config.getStringData("CowBoy_btn_desc_auto_cancel");

        let vAutoBetCountList: number[] = [];
        switch (cv.roomManager.getCurrentGameID()) {
            case cv.Enum.GameId.CowBoy: {
                let vList: number[] = cowboyDataMgr.getCowboyRoom().vAutoBetCountList;
                cv.StringTools.deepCopy(vList, vAutoBetCountList);
            } break;

            case cv.Enum.GameId.HumanBoy: {
                let vList: number[] = humanboyDataMgr.getHumanboyRoom().vAutoBetCountList;
                cv.StringTools.deepCopy(vList, vAutoBetCountList);
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                let vList: number[] = VideoCowboyManager.getVideoCowboyRoom().vAutoBetCountList;
                cv.StringTools.deepCopy(vList, vAutoBetCountList);
            } break;

            case cv.Enum.GameId.PokerMaster: {
                let vList: number[] = pokerMasterDataMgr.getPokerMasterRoom().vAutoBetCountList;
                cv.StringTools.deepCopy(vList, vAutoBetCountList);
            } break;

            default:
                break;
        }

        // 先清除UI
        for (let i = 0; i < this._ps_btns.length; ++i) {
            this._ps_btns[i].node.removeFromParent(true);
            cv.tools.destroyNode(this._ps_btns[i].node);
        }
        cv.StringTools.clearArray(this._ps_btns);

        // 再添加
        for (let i = 0; i < vAutoBetCountList.length; ++i) {
            let strBtnName: string = cv.StringTools.formatC("btn_auto_%d", i);
            let btnNode: cc.Node = this._ps_block_panel.getChildByName(strBtnName);
            if (!btnNode) {
                btnNode = cc.instantiate(this._ps_btn_cancel.node);
                btnNode.name = strBtnName;
                btnNode.on("click", this._onClickAutoSelect, this);
                this._ps_block_panel.addChild(btnNode);
                this._ps_btns.push(btnNode.getComponent(cc.Button));
            }

            let tag: TagCom = btnNode.getComponent(TagCom);
            if (!tag) tag = btnNode.addComponent(TagCom);
            tag.nTag = vAutoBetCountList[i];

            let txt: cc.Label = btnNode.getChildByName("txt").getComponent(cc.Label);
            txt.string = cv.StringTools.formatC(cv.config.getStringData("CowBoy_btn_desc_auto_count"), vAutoBetCountList[i]);
            vBtns.push(btnNode.getComponent(cc.Button));
        }

        // 计算真实大小
        let szPanel: cc.Size = cc.size(this._ps_cell_size.width, this._ps_cell_size.height * vBtns.length);
        this._ps_block_panel.setContentSize(szPanel);

        // 计算位置
        for (let i = 0; i < vBtns.length; ++i) {
            let x: number = szPanel.width / 2;
            let y: number = szPanel.height / vBtns.length / 2 + i * this._ps_cell_size.height;
            vBtns[i].node.setPosition(x, y);
        }
    }

    // 布局高级续投 弹出面板动画
    private _autoSelectAnimFunc(bOpen: boolean, bAnim: boolean): void {
        this._panel_select.active = true;
        let duration: number = 0.5;
        let seq: cc.Action = null;

        if (bOpen) {
            this._ps_block_panel.setScale(0);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this._ps_block_panel.setScale(1);
                this._ps_img_shield.getComponent(cc.BlockInputEvents).enabled = false;
            });

            if (bAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 1.0);
                let ebo: cc.ActionInterval = st.easing(cc.easeBackOut());
                seq = cc.sequence(ebo, cb);
            }
            else {
                seq = cb;
            }
        }
        else {
            this._ps_block_panel.setScale(1);
            let cb: cc.ActionInstant = cc.callFunc((): void => {
                this._ps_block_panel.setScale(0);
                this._ps_img_shield.getComponent(cc.BlockInputEvents).enabled = false;
                this._panel_select.active = false;
            });

            if (bAnim) {
                let st: cc.ActionInterval = cc.scaleTo(duration, 0);
                let ebi: cc.ActionInterval = st.easing(cc.easeBackIn());
                seq = cc.sequence(ebi, cb);
            }
            else {
                seq = cb;
            }
        }

        if (seq) {
            this._ps_block_panel.runAction(seq);
            this._ps_img_shield.getComponent(cc.BlockInputEvents).enabled = true;
        }
    }

    // 布局高级续投 次数点击事件
    private _onClickAutoSelect(sender: cc.Node): void {
        let iCount: number = 0;
        let tag: TagCom = sender.getComponent(TagCom);
        if (tag) iCount = tag.nTag;
        cv.AudioMgr.playButtonSound('tab');
        switch (cv.roomManager.getCurrentGameID()) {
            case cv.Enum.GameId.CowBoy: {
                cv.cowboyNet.reqAdvanceAutoBetSet(iCount);
            } break;

            case cv.Enum.GameId.HumanBoy: {
                cv.humanboyNet.reqAdvanceAutoBetSet(iCount);
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                cv.videoCowboyNet.reqAdvanceAutoBetSet(iCount);
            } break;

            case cv.Enum.GameId.PokerMaster: {
                cv.pokerMasterNet.reqAdvanceAutoBetSet(iCount);
            } break;

            default:
                break;
        }

        this.hideSelectPanel(false);
    }

    /**
     * 显示高级续投 选择次数面板
     * @param bAnim     - 是否显示动画
     * @param bReset    - 是否重新布局(默认:false)
     */
    showSelectPanel(bAnim: boolean, bReset?: boolean): void {
        if (this._panel_select.active) return;
        this._panel_select.active = true;
        this._layoutSelectPanelOnce(bReset);
        this._autoSelectAnimFunc(true, bAnim);
    }

    /**
     * 隐藏高级续投 选择次数面板
     * @param bAnim 是否有动画
     */
    hideSelectPanel(bAnim: boolean): void {
        if (!this._panel_select.active) return;
        this._autoSelectAnimFunc(false, bAnim);
    }

    /**
     * 适配高级续投 选择次数面板布局位置
     * @param benchMarkNode 参照的节点
     */
    adaptSelectPanelPos(benchMarkNode: cc.Node): void {
        let offset_h: number = 40;
        let nodeSize: cc.Size = cc.size(benchMarkNode.getContentSize());
        let worldPos: cc.Vec2 = cc.Vec2.ZERO;
        benchMarkNode.parent.convertToWorldSpaceAR(benchMarkNode.position, worldPos);
        worldPos.y += nodeSize.height / 2 + offset_h;
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this._ps_block_panel.parent.convertToNodeSpaceAR(worldPos, nodePos);
        this._ps_block_panel.setPosition(nodePos);
    }

    /**
     * 显示高级续投 提示
     */
    showAdvanceAutoTips(strTips: string): void {
        let txt: cc.Label = this._pm_auto_tips.node.getChildByName("txt").getComponent(cc.Label);
        txt.string = strTips;

        let offset_w: number = 40;
        let size: cc.Size = cv.resMgr.getLabelStringSize(txt);
        let w: number = size.width + 2 * offset_w;
        let h: number = this._pm_auto_tips.node.height;
        this._pm_auto_tips.node.setContentSize(cc.size(w, h));
        txt.node.setPosition(cc.Vec2.ZERO);

        let img_triangle: cc.Node = this._pm_auto_tips.node.getChildByName("img_triangle");
        img_triangle.setPosition(0, img_triangle.y);

        this._pm_auto_tips.node.active = true;
    }

    /**
     * 隐藏高级续投 提示
     */
    hideAdvanceAutoTips(): void {
        this._pm_auto_tips.node.active = false;
    }

    /**
     * 适配高级续投 提示 位置
     * @param benchMarkNode 参照节点
     */
    adaptAdvanceAutoTipsPos(benchMarkNode: cc.Node): void {
        if (!benchMarkNode) return;

        let worldPos: cc.Vec2 = cc.Vec2.ZERO;
        benchMarkNode.parent.convertToWorldSpaceAR(benchMarkNode.position, worldPos);
        worldPos.x -= benchMarkNode.width * benchMarkNode.anchorX;
        worldPos.y += benchMarkNode.height * benchMarkNode.anchorY + 40;
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this._pm_auto_tips.node.parent.convertToNodeSpaceAR(worldPos, nodePos);
        this._pm_auto_tips.node.setPosition(nodePos);
    }

    /**
     * 显示高级续投 次数
     */
    showAdvanceAutoCount(): void {
        let iUsedAutoBetCount: number = 0;
        let iSelectAutoBetCount: number = 0;

        switch (cv.roomManager.getCurrentGameID()) {
            case cv.Enum.GameId.CowBoy: {
                iUsedAutoBetCount = cowboyDataMgr.getCowboyRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = cowboyDataMgr.getCowboyRoom().iSelectAutoBetCount;
            } break;

            case cv.Enum.GameId.HumanBoy: {
                iUsedAutoBetCount = humanboyDataMgr.getHumanboyRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = humanboyDataMgr.getHumanboyRoom().iSelectAutoBetCount;
            } break;

            case cv.Enum.GameId.VideoCowboy: {
                iUsedAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = VideoCowboyManager.getVideoCowboyRoom().iSelectAutoBetCount;
            } break;

            case cv.Enum.GameId.PokerMaster: {
                iUsedAutoBetCount = pokerMasterDataMgr.getPokerMasterRoom().iUsedAutoBetCount;
                iSelectAutoBetCount = pokerMasterDataMgr.getPokerMasterRoom().iSelectAutoBetCount;
            } break;

            default:
                break;
        }

        this._pm_auto_count.string = cv.StringTools.formatC(cv.config.getStringData("CowBoy_btn_desc_auto_using_count"), iUsedAutoBetCount, iSelectAutoBetCount);
        this._pm_auto_count.node.active = true;
    }

    /**
     * 隐藏高级续投 次数
     */
    hideAdvanceAutoCount(): void {
        this._pm_auto_count.node.active = false;
    }

    /**
     * 适配高级续投 次数 位置
     * @param benchMarkNode 
     */
    adaptAdvanceAutoCountPos(benchMarkNode: cc.Node): void {
        if (!benchMarkNode) return;

        let offset_h: number = 8;
        let worldPos: cc.Vec2 = cc.Vec2.ZERO
        benchMarkNode.parent.convertToWorldSpaceAR(benchMarkNode.position, worldPos);
        worldPos.y += benchMarkNode.height / 2 + offset_h;
        let nodePos: cc.Vec2 = cc.Vec2.ZERO;
        this._pm_auto_count.node.parent.convertToNodeSpaceAR(worldPos, nodePos);
        this._pm_auto_count.node.setPosition(nodePos);
    }
}
