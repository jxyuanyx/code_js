import cv from "../../lobby/cv";
import USDTAndCoin from "../../lobby/hall/USDTAndCoin";

/**
 * 退出面板
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class HumanBoyExchange extends USDTAndCoin {

    @property(cc.Layout)
    topLayout: cc.Layout = null;

    @property(cc.Sprite)
    titleSprite: cc.Sprite = null;

    @property(cc.Node)
    questionNode: cc.Node = null;

    @property(cc.Node)
    explainNode: cc.Node = null;

    @property(cc.Label)
    usdtBalanceText: cc.Label = null;

    @property(cc.Label)
    userBalanceNum: cc.Label = null;

    private _atlas_hb_exchange: cc.SpriteAtlas = null;

    onLoad () {
        // cv.resMgr.adaptWidget(this.node, true);
    }
    start () {
        super.start();
        this.switchTab(0);
    }
    initLanguage() {
        this._atlas_hb_exchange = cv.resMgr.getSpriteAtlas(cv.config.getLanguagePath("game/humanboyPlist/exchangetexture"));
        cv.resMgr.loadSpriteTextureByPlist(this._atlas_hb_exchange, this.titleSprite, "title_change_coin");
        this.topLayout.updateLayout();
        let srcPos: cc.Vec2 = cc.Vec2.ZERO;
        let dstPos: cc.Vec2 = cc.Vec2.ZERO;
        this.questionNode.convertToWorldSpaceAR(cc.Vec2.ZERO, srcPos);
        this.explainNode.convertToNodeSpaceAR(srcPos, dstPos);
        cc.find("exchange_explain_top", this.explainNode).x = dstPos.x;
        this.usdtBalanceText.string = cv.config.getStringData("USDTView_usdt_balance_label");
        super.initLanguage();
    }
    initExplanTxtLanguage(): void {
        this.explanText.destroyAllChildren();
        this.explanText.removeAllChildren(true);
        let explanTxt: string = cv.config.getStringData("USDTView_explan_label");
        let explanTxtArr: string[] = explanTxt.split('\n');
        if (explanTxtArr.length == 0) {
            return;
        }
        let tempNode: cc.Node = this.explainNode.getChildByName("txt_item");
        for (let i = 0; i < explanTxtArr.length; ++i) {
            let itemNode: cc.Node = cc.instantiate(tempNode);
            let size: cc.Size = cv.resMgr.getLabelStringSize(itemNode.children[1].getComponent(cc.Label), explanTxtArr[i]);
            itemNode.height = size.height;
            itemNode.active = true;
            this.explanText.addChild(itemNode);
        }
    }
    getTabExBtnLanguage(): string {
        return cv.config.getStringData("USDTView_exchange_btn_label");
    }
    updateCoinAndUSDT() {
        this.userBalanceNum.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().usdt);
    }

    onUSDT2CoinEx (evt: cc.Event) {
        this.onHiddenExplain();
        super.onUSDT2CoinEx(evt);
    }
    onUSDT2CoinAll (evt: cc.Event) {
        this.onHiddenExplain();
        super.onUSDT2CoinAll(evt);
    }
    openView(): void {
        this.node.active = true;
        this.resetTabTestExNum(0);
        this.onHiddenExplain();
        
        this.requestTabHuilv(0);
    }
    onClose(): void {
        this.node.active = false;
    }
    onShowExplain(): void {
        this.explainNode.active = true;
    }
    onHiddenExplain(): void {
        this.explainNode.active = false;
    }
}
