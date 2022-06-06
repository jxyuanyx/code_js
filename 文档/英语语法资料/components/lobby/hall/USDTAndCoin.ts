// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../cv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class USDTAndCoin extends cc.Component {

    @property(cc.Node)
    coinNode: cc.Node = null; //tab 0 - 兑换金币节点

    @property(cc.Node)
    usdtNode: cc.Node = null; //tab 1 - 兑换USDT节点

    @property(cc.Node)
    explanText: cc.Node = null;

    protected usdt_2_coin_ex_val: number = 0;
    protected coin_2_usdt_ex_val: number = 0;
    protected usdt_2_coin_ex: string = "";
    protected coin_2_usdt_ex: string = "";
    protected select_index: number = -1;
    protected usdt_ex_min: number = 2000;
    protected usdt_ex_max: number = 100000000;

    protected open_use_point:boolean = false;

    onLoad () {
    }
    start () {
        this.registerMsg();
        this.initLanguage();
        this.updateCoinAndUSDT();
    
    }
    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("onExchangeCurrencyResponse", this.node);
        cv.MessageCenter.unregister("onGetScalerQuoteResponse", this.node);
        cv.MessageCenter.unregister("update_info", this);
        cv.MessageCenter.unregister("update_gold", this);
    }
    registerMsg() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("onExchangeCurrencyResponse", this.onTabExResponse.bind(this), this.node);
        cv.MessageCenter.register("onGetScalerQuoteResponse", this.requestExRateResponse.bind(this), this.node);
       
        cv.MessageCenter.register("update_info", this.updateCoinAndUSDT.bind(this), this);
        cv.MessageCenter.register("update_gold", this.updateCoinAndUSDT.bind(this), this);


    }

    initLanguage() {

        this.initExplanTxtLanguage(null);
        this.initTabLanguage(0);
        this.initTabLanguage(1);
    }
    initTabLanguage(index: number) {
        let tabNode: cc.Node = this.getTabNode(index);
        if (!tabNode) {
            return;
        }
        let inputNode: cc.Node = cc.find("input_node", tabNode);
        cc.find("txt_from", inputNode).getComponent(cc.Label).string = cv.config.getStringData("USDTView_from_label");
        cc.find("txt_to", inputNode).getComponent(cc.Label).string = cv.config.getStringData("USDTView_to_label");
        cc.find("txt_coin", inputNode).getComponent(cc.Label).string = cv.config.getStringData("USDTView_coin_label");
        cc.find("button/Label", inputNode).getComponent(cc.Label).string = cv.config.getStringData("USDTView_all_label");
        let srcEditBox: cc.EditBox = index == 0? cc.find("input_node/editbox_usdt", tabNode).getComponent(cc.EditBox) : cc.find("input_node/editbox_coin", tabNode).getComponent(cc.EditBox);
        let dstEditBox: cc.EditBox = index == 0? cc.find("input_node/editbox_coin", tabNode).getComponent(cc.EditBox) : cc.find("input_node/editbox_usdt", tabNode).getComponent(cc.EditBox);
        srcEditBox.placeholder = cv.config.getStringData("USDTView_input_num_label");
        dstEditBox.placeholder = cv.config.getStringData("USDTView_exchange_num_label");
        cc.find("btn_ex/Background/Label", tabNode).getComponent(cc.Label).string = this.getTabExBtnLanguage();
        this.updateTabExHuilv(index);
    }
    initExplanTxtLanguage(content:string): void {
        this.explanText.getComponent(cc.Label).string = cv.config.getStringData("USDTView_explan_label");
    }
    getTabExBtnLanguage(): string {
        return cv.config.getStringData("USDTView_exchange_label");
    }

    getTabNode(index: number): cc.Node {
        if (index != 0 && index != 1) {
            return null;
        }
        return index == 0? this.coinNode : this.usdtNode;
    }
    getTabExHuilv(index: number): string {

        if (index != 0 && index != 1) {
            return "";
        }
        return index == 0? this.usdt_2_coin_ex : this.coin_2_usdt_ex;
    }
    getUSDT2CoinExRate(): number {
        if (isNaN(this.usdt_2_coin_ex_val) || this.usdt_2_coin_ex_val <= 0) {
            return 0;
        }
        return this.usdt_2_coin_ex_val; 
    }
    getCoin2USDTExRate(): number {
        if (isNaN(this.coin_2_usdt_ex_val) || this.coin_2_usdt_ex_val <= 0) {
            return 0;
        }
        return this.coin_2_usdt_ex_val;
    }

    updateCoinAndUSDT() {
    }
    updateTabExHuilv(index: number) {
        let tabNode: cc.Node = this.getTabNode(index);
        if (tabNode) {
            let str = cv.StringTools.formatC(cv.config.getStringData("USDTView_usdt_coin_ex_label_" + index), this.getTabExHuilv(index));
            let txt_huilv = cc.find("txt_huilv", tabNode);
            if(txt_huilv){
                txt_huilv.getComponent(cc.Label).string = str;
            }
        }
    }
    updateTabTestExNum(srcEditBox: cc.EditBox, dstEditBox: cc.EditBox, hlNum: number, positive: boolean = true) {
        if (!srcEditBox || !dstEditBox) {
            return;
        }
        let inputVal: string = srcEditBox.string;

        if (!this.checkTestExNumber(inputVal) || isNaN(hlNum) || hlNum <= 0 || inputVal == "") {
            dstEditBox.string = "";
            return;
        }
        let exNum: number = parseFloat(inputVal);

        if (isNaN(exNum) || exNum <= 0) {
            dstEditBox.string = "0";

        } else {
            exNum = cv.StringTools.serverGoldByClient(exNum);
            exNum = Math.floor(exNum); //coin/usdt在服务端都是一个整数存储
            let num: number = hlNum * exNum;
            num = positive? Math.floor(num) : Math.ceil(num); //coin/usdt在服务端都是一个整数存储
            dstEditBox.string = cv.StringTools.numToFloatString(num);         
        }
    }
    updateTabTestExNumPositive(index: number) {
        let tabNode: cc.Node = this.getTabNode(index);
        if (!tabNode) {
            return;
        }
        //index=0 => usdt->coin
        //index=1 => coin->usdt
        let srcEditBox: cc.EditBox = index == 0? cc.find("input_node/editbox_usdt", tabNode).getComponent(cc.EditBox) : cc.find("input_node/editbox_coin", tabNode).getComponent(cc.EditBox);
        let dstEditBox: cc.EditBox = index == 0? cc.find("input_node/editbox_coin", tabNode).getComponent(cc.EditBox) : cc.find("input_node/editbox_usdt", tabNode).getComponent(cc.EditBox);
        let hlNum: number = index == 0? this.getUSDT2CoinExRate() : this.getCoin2USDTExRate();
        this.updateTabTestExNum(srcEditBox, dstEditBox, hlNum);
    }
    resetTabTestExNum(index: number) {
        let tabNode: cc.Node = this.getTabNode(index);
        if (tabNode) {
            cc.find("input_node/editbox_usdt", tabNode).getComponent(cc.EditBox).string = "";
            cc.find("input_node/editbox_coin", tabNode).getComponent(cc.EditBox).string = "";
        }
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
        this.resetTabTestExNum(index);
        this.requestTabHuilv(index);
    }

    fixTabTestExNum(editbox: cc.EditBox) {
        if (!editbox) {
            return;
        }
        let inputVal: string = editbox.string;
        if (!this.checkTestExNumber(inputVal)) {
            cv.TT.showMsg(cv.config.getStringData("USDTView_input_invalid_num_label"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        let dotIndex: number = inputVal.indexOf(".");
        if (dotIndex != -1) {
            let lastIndex: number = inputVal.length - 1;
            if (lastIndex - dotIndex >= 3) {
                editbox.string = inputVal.slice(0, (dotIndex + 3));
            }
        }
    }
    onTestUSDT2Coin(text: string, editbox: cc.EditBox, customEventData: string) {
        let tabIndex: number = parseInt(customEventData);
        if (isNaN(tabIndex) || (tabIndex != 0 && tabIndex != 1)) {
            return;
        }
        let srcEditBox: cc.EditBox = editbox;
        let dstEditBox: cc.EditBox = cc.find("input_node/editbox_coin", this.getTabNode(tabIndex)).getComponent(cc.EditBox);
        //2个汇率,同界面使用相同汇率
        let hlNum: number = tabIndex == 0? this.getUSDT2CoinExRate() : (this.getCoin2USDTExRate() == 0? 0 : (1 / this.getCoin2USDTExRate()));
        let positive: boolean = tabIndex == 0;
        this.fixTabTestExNum(srcEditBox);
        this.updateTabTestExNum(srcEditBox, dstEditBox, hlNum, positive);
    }
    onTestCoin2USDT(text: string, editbox: cc.EditBox, customEventData: string) {
        let tabIndex: number = parseInt(customEventData);
        if (isNaN(tabIndex) || (tabIndex != 0 && tabIndex != 1)) {
            return;
        }
        let srcEditBox: cc.EditBox = editbox;
        let dstEditBox: cc.EditBox = cc.find("input_node/editbox_usdt", this.getTabNode(tabIndex)).getComponent(cc.EditBox);
        let hlNum: number = tabIndex == 1? this.getCoin2USDTExRate() : (this.getUSDT2CoinExRate() == 0? 0 : (1 / this.getUSDT2CoinExRate()));
        let positive: boolean = tabIndex == 1;
        this.fixTabTestExNum(srcEditBox);
        this.updateTabTestExNum(srcEditBox, dstEditBox, hlNum, positive);
    }

    onEditBegin(text: string, editbox: cc.EditBox, customEventData: string) {
        
    }

    checkTestExNumber(inputVal: string): boolean {
        let reg = /(^[1-9]\d*(\.\d{0,})?$)|(^0(\.\d{0,})?$)/;
        return reg.test(inputVal);
    }
    checkExNumber(inputVal: string): boolean {
        let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        return reg.test(inputVal);
    }
    onUSDT2CoinEx (evt: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        let inputVal: string = cc.find("input_node/editbox_usdt", this.coinNode).getComponent(cc.EditBox).string;
        let exNum: number = parseFloat(inputVal);
        if (!this.checkExNumber(inputVal) || isNaN(exNum) || exNum <= 0) {
            cv.TT.showMsg(cv.config.getStringData("USDTView_input_invalid_num_label"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        exNum = cv.StringTools.serverGoldByClient(exNum);
        exNum = Math.floor(exNum);
        if (cv.dataHandler.getUserData().usdt < exNum) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode251"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        if (exNum < this.usdt_ex_min || exNum > this.usdt_ex_max) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode253"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        cv.worldNet.ExchangeCurrencyRequest(1, exNum);
        this.resetTabTestExNum(0);
    }
    onCoin2USDTEx (evt: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        let inputVal: string = cc.find("input_node/editbox_coin", this.usdtNode).getComponent(cc.EditBox).string;
        let exNum: number = parseFloat(inputVal);
        if (!this.checkExNumber(inputVal) || isNaN(exNum) || exNum <= 0) {
            cv.TT.showMsg(cv.config.getStringData("USDTView_input_invalid_num_label"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        exNum = cv.StringTools.serverGoldByClient(exNum);
        exNum = Math.floor(exNum);
        if (cv.dataHandler.getUserData().u32Chips < exNum) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode172"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        if (this.getCoin2USDTExRate() > 0) {
            let exNumAfter: number = Math.floor(exNum * this.getCoin2USDTExRate());
            if (exNumAfter < this.usdt_ex_min || exNumAfter > this.usdt_ex_max) {
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode253"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        }
        cv.worldNet.ExchangeCurrencyRequest(0, exNum, this.open_use_point);
        this.resetTabTestExNum(1);
    }
    onTabExResponse(msg: any) {
        // if (msg.error == 1) {
            let strFormat: string = msg.op_type == 1 ? "USDTView_ex_coin_success_label" : "USDTView_ex_usdt_success_label";
            let strTo: string = cv.StringTools.numToFloatString(msg.to_amt);
            cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData(strFormat), strTo), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
            //
            // let opTabIndex: number = msg.op_type == 1 ? 0 : 1;
            // if (opTabIndex == this.select_index) {
            //     this.resetTabTestExNum(opTabIndex);
            // }
            //
        // } else {
        //     cv.TT.showMsg(cv.config.getStringData("USDTView_ex_fail_label"), cv.Enum.ToastType.ToastTypeError);
        // }
    }

    onUSDT2CoinAll (evt: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        let srcEditBox: cc.EditBox = cc.find("input_node/editbox_usdt", this.coinNode).getComponent(cc.EditBox);
        let dstEditBox: cc.EditBox = cc.find("input_node/editbox_coin", this.coinNode).getComponent(cc.EditBox);
        let hlNum: number = this.getUSDT2CoinExRate();
        srcEditBox.string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().usdt);
        this.updateTabTestExNum(srcEditBox, dstEditBox, hlNum);
    }
    onCoin2USDTAll (evt: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        let srcEditBox: cc.EditBox = cc.find("input_node/editbox_coin", this.usdtNode).getComponent(cc.EditBox);
        let dstEditBox: cc.EditBox = cc.find("input_node/editbox_usdt", this.usdtNode).getComponent(cc.EditBox);
        let hlNum: number = this.getCoin2USDTExRate();
        srcEditBox.string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().u32Chips);
        this.updateTabTestExNum(srcEditBox, dstEditBox, hlNum);
    }

    requestTabHuilv(index: number) {
        //0-获取rmb到usdt汇率 1-获取usdt到rmb的汇率
        let hlVal: string = index == 0? this.usdt_2_coin_ex : this.coin_2_usdt_ex;
        if (hlVal == "") {
            let hlType: number = index == 0 ? 1 : 0;
            cv.worldNet.GetScalerQuoteRequest(hlType);
        } else {
            this.updateTabExHuilv(index);
            this.updateTabTestExNumPositive(index);
        }
    }
    onTabHuilvResponse(msg: any) {
        // if (msg.error == 1) {
            if (msg.op_type == 0) {
                // this.coin_2_usdt_ex = msg.rate;
                this.updateTabExHuilv(1);
                this.updateTabTestExNumPositive(1);
            } else if (msg.op_type == 1) {
                // this.usdt_2_coin_ex = msg.rate;
                this.updateTabExHuilv(0);
                this.updateTabTestExNumPositive(0);
            }
        // }
        // else {
        //     let tabIndex: number = msg.op_type == 1? 0 : 1;
        //     console.log("重新获取汇率 tabIndex=" + tabIndex);
        //     this.requestTabHuilv(tabIndex);
        // }
    }
    requestExRateResponse(msg: any): void {
        let rateNum = Number(msg.rate);
        if (isNaN(rateNum) || rateNum <= 0 || (msg.op_type != 1 && msg.op_type != 0)) {
            return;
        }
        if (msg.op_type == 0) {
            this.coin_2_usdt_ex_val = rateNum;
            this.coin_2_usdt_ex = this.formatExRate(rateNum);
        } else {
            this.usdt_2_coin_ex_val = rateNum;
            this.usdt_2_coin_ex = this.formatExRate(rateNum);
        }
        this.onTabHuilvResponse(msg);
    }
    formatExRate(rateNum: number): string {
        if (isNaN(rateNum) || rateNum <= 0) {
            return "";
        }
        return cv.StringTools.handleNumberByFloor(rateNum, 2).toString();
    }
}
