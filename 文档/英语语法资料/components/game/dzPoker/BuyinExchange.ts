// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import cv from "../../lobby/cv";
import USDTAndCoin from "../../lobby/hall/USDTAndCoin";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BuyinExchange extends USDTAndCoin {

    @property(cc.Node)
    exchangeCoinNode: cc.Node = null;

    @property(cc.Node)
    exchangeUsdtNode: cc.Node = null;

    coinBalance: cc.Label = null;
    usdtBalance: cc.Label = null;
    coinExplainNode: cc.Node = null;
    usdtExplainNode: cc.Node = null;

    onLoad () {
        this.coinBalance = cc.find("layout/balance_num", this.exchangeUsdtNode).getComponent(cc.Label);
        this.usdtBalance = cc.find("layout/balance_num", this.exchangeCoinNode).getComponent(cc.Label);
        this.coinExplainNode = cc.find("prompt_node", this.exchangeCoinNode);
        this.usdtExplainNode = cc.find("prompt_node", this.exchangeUsdtNode);
    }
    initLanguage() {
        cc.find("layout/balance_txt", this.exchangeCoinNode).getComponent(cc.Label).string = cv.config.getStringData("USDTView_usdt_balance_label");
        cc.find("layout/balance_txt", this.exchangeUsdtNode).getComponent(cc.Label).string = cv.config.getStringData("GameScene_addSignPoker_panel_rich_word_text");
        super.initLanguage();
    }
    initExplanTxtLanguage(): void {
        this.initExplanTxtLanguageNode(this.coinExplainNode);
        this.initExplanTxtLanguageNode(this.usdtExplainNode);
    }
    initExplanTxtLanguageNode(explainNode: cc.Node) {
        let explanTxt: string = cv.config.getStringData("USDTView_explan_label");
        let explanTxtArr: string[] = explanTxt.split('\n');
        if (explanTxtArr.length == 0) {
            return;
        }
        let tempNode: cc.Node = explainNode.getChildByName("txt_item");
        for (let i = 0; i < explanTxtArr.length; ++i) {
            let itemNode: cc.Node = cc.instantiate(tempNode);
            let size: cc.Size = cv.resMgr.getLabelStringSize(itemNode.children[1].getComponent(cc.Label), explanTxtArr[i]);
            itemNode.height = size.height;
            itemNode.active = true;
            explainNode.addChild(itemNode);
        }
    }
    updateCoinAndUSDT() {
        this.usdtBalance.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().usdt);
        this.coinBalance.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().u32Chips);
    }
    onUSDT2CoinEx (evt: cc.Event) {
        this.onHiddenExplain();
        super.onUSDT2CoinEx(evt);
    }
    onUSDT2CoinAll (evt: cc.Event) {
        this.onHiddenExplain();
        super.onUSDT2CoinAll(evt);
    }
    onCoin2USDTEx (evt: cc.Event) {
        this.onHiddenExplain();
        super.onCoin2USDTEx(evt);
    }
    onCoin2USDTAll (evt: cc.Event) {
        this.onHiddenExplain();
        super.onCoin2USDTAll(evt);
    }
    onShowExplain(): void {
        // 0=exchangeCoinNode
        // 1=exchangeUsdtNode
        this.coinExplainNode.active = (this.select_index == 0);
        this.usdtExplainNode.active = (this.select_index == 1);
    }
    onHiddenExplain(): void {
        this.coinExplainNode.active = false;
        this.usdtExplainNode.active = false;
    }
    switchTab(index: number) {
        if (index != 0 && index != 1) {
            return;
        }
        // 0=exchangeCoinNode
        // 1=exchangeUsdtNode
        this.select_index = index;
        this.resetTabTestExNum(index);
        this.requestTabHuilv(index);
        this.onHiddenExplain();
    }
}
