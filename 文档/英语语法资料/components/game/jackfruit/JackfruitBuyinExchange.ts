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
export default class JackfruitBuyinExchange extends USDTAndCoin {

    @property(cc.Node)
    explainNode: cc.Node = null;

    @property(cc.Label)
    usdtBalanceText: cc.Label = null;

    @property(cc.Label)
    userBalanceNum: cc.Label = null;

    onLoad () {
    }
    start () {
        super.start();
        this.switchTab(0);
    }
    initLanguage() {
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
    show(): void {
        this.node.active = true;
        this.resetTabTestExNum(0);
        this.onHiddenExplain();
        
        this.requestTabHuilv(0);
    }
    onShowExplain(): void {
        this.explainNode.active = true;
    }
    onHiddenExplain(): void {
        this.explainNode.active = false;
    }
    switchTab(index: number) {
        if ((index != 0 && index != 1) || this.select_index == index) {
            return;
        }
        this.select_index = index;
        if (this.coinNode) {
            this.coinNode.active = index == 0;
        }
        if (this.usdtNode) {
            this.usdtNode.active = index == 1;
        }
    }
    
    getTabExBtnLanguage(): string {
        return cv.config.getStringData("USDTView_exchange_btn_label");
    }
}
