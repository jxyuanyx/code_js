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
import USDTAndCoin from "./USDTAndCoin";

const {ccclass, property} = cc._decorator;

@ccclass
export default class USDTView extends USDTAndCoin {

    @property(cc.Node)
    tabButton: cc.Node[] = [];

    @property(cc.Node)
    totalNumNode: cc.Node = null;

    @property(cc.Label)
    titleText: cc.Label = null;

    @property(cc.Label)
    userNumText: cc.Label = null;  //账户总余额

    @property(cc.Label)
    coinNumText: cc.Label = null;  //金币余额

    @property(cc.Label)
    usdtNumText: cc.Label = null;  //账户总余额

    @property(cc.Label)
    txt_freeTimes: cc.Label = null;  //usdt免费兑换次数

    @property(cc.Label)
    txt_feeTips: cc.Label = null;  //usdt费用提示

    @property(cc.Label)
    txt_pointsTips: cc.Label = null;  //usdt兑换积分提示

    
    @property(cc.Node)
    btn_usePoint: cc.Node = null;  //usdt兑换积分提示


    @property(cc.Node)
    bgExplanation: cc.Node = null;  //提示背景弹框

    @property(cc.Node)
    ItemNode: cc.Node = null;  

    protected coin_2_usdt_TotalFreeTime:number = 10; //总共免费兑换次数
    protected coin_2_usdt_freeTime:number = 0; //剩余免费兑换次数
    protected coin_2_usdt_feeRatio:number = 0.005; //coin转usdt费率
    protected coin_2_usdt_pointRatio:number = 0; //积分折扣兑换比
    protected usdt_exchange_interval:number = 0; //兑换时间间隔

    color_lab_select: cc.Color = cc.color(208, 171, 110);
    color_lab_noSelect: cc.Color = cc.color(148, 149, 149);

    onLoad () {
        cv.resMgr.adaptWidget(this.node, true);
    }
    start () {
        super.start();
        this.switchTab(0);
        this.open_use_point = false;
        this.bgExplanation.active = false;
        cv.MessageCenter.register("onExchangeGetConfigResponse", this.onExhangeConfigResponse.bind(this), this.node);
        cv.MessageCenter.register("onExchangeGetConfigNotice", this.onExhangeConfigChangeNotice.bind(this), this.node);
        cv.MessageCenter.register("onExchangeTimeLimitError", this.onExchangeTimeLimitError.bind(this), this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { 
           this.bgExplanation.active = false;
         });
    
    }

    onDestroy(){
        super.onDestroy();
        cv.MessageCenter.unregister("onExchangeGetConfigResponse", this.node);
        cv.MessageCenter.unregister("onExchangeGetConfigNotice", this.node);
        cv.MessageCenter.unregister("onExchangeTimeLimitError", this.node);
        
    }


    initLanguage() {
        this.tabButton[0].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("USDTView_exchange_coin_label");
        this.tabButton[1].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("USDTView_exchange_usdt_label");
        this.titleText.string = cv.config.getStringData("USDTView_title_label");
        this.userNumText.string = cv.config.getStringData("USDTView_usdt_change_title_tips");  //账户余额
        this.coinNumText.string = cv.config.getStringData("USDTView_usdt_change_coin_tips");  //金币余下额
        this.usdtNumText.string = cv.config.getStringData("USDTView_usdt_change_usdt_tips");  //usdt余额

        this.updateExhangeFreeTimesTips();

        //多语言坐标需要适配
        let spCoin = cc.find("coin_layout/sprite", this.totalNumNode);
        let lbCoin = cc.find("coin_layout/Label", this.totalNumNode);
        spCoin.x = lbCoin.x - cv.resMgr.getLabelStringSize(lbCoin.getComponent(cc.Label)).width/2 - spCoin.width/2- 15;

        let spUSDT = cc.find("usdt_layout/sprite", this.totalNumNode);
        let lbUSDT = cc.find("usdt_layout/Label", this.totalNumNode);
        spUSDT.x = lbUSDT.x - cv.resMgr.getLabelStringSize(lbUSDT.getComponent(cc.Label)).width/2 - spUSDT.width/2 - 15;

        super.initLanguage();
    }


    updateTabExHuilv(index: number){
        let tabNode: cc.Node = this.getTabNode(index);
        if (tabNode) {
            let str = cv.StringTools.formatC(cv.config.getStringData("USDTView_usdt_coin_ex_label_" + index), this.getTabExHuilv(index));
            let txt_huiLv = null;
            if(tabNode == this.usdtNode){
                txt_huiLv = cc.find("layoutTips/huilvNode/txt_huilv", tabNode);
            }else if(tabNode == this.coinNode){
                txt_huiLv = cc.find("txt_huilv", tabNode);
            }
            if(txt_huiLv){
                txt_huiLv.getComponent(cc.Label).string = str;
            }
        }
        super.updateTabExHuilv(index);
    }

    
    initExplanTxtLanguage(content:string): void {

        if(content == null){
            return;
        }
        this.bgExplanation.destroyAllChildren()
        this.bgExplanation.removeAllChildren(true);
        let explanTxt: string = content; 
        let explanTxtArr: string[] = explanTxt.split('\n');
        if (explanTxtArr.length == 0) {
            return;
        }
 
        for (let i = 0; i < explanTxtArr.length; ++i) {
            let itemNode: cc.Node = cc.instantiate(this.ItemNode);
            let size: cc.Size = cv.resMgr.getLabelStringSize(itemNode.children[1].getComponent(cc.Label), explanTxtArr[i]);
            itemNode.height = size.height;
            itemNode.active = true;
            //背景图片bgExplanation的anchor y是1  所以子节点itemNode要向左边偏移
            itemNode.x = -(this.bgExplanation.getContentSize().width - (this.bgExplanation.getContentSize().width - itemNode.width)*0.5);
            this.bgExplanation.addChild(itemNode);
        }
    }

    updateCoinAndUSDT() {
        cc.find("coin_layout/coin_num", this.totalNumNode).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().u32Chips);
        cc.find("usdt_layout/usdt_num", this.totalNumNode).getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().usdt);
    }

    onBack (evt: cc.Event) {
        this.resetTabTestExNum(this.select_index);
        cv.AudioMgr.playButtonSound('back_button');
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_RIGHT
                , cv.action.eMoveActionType.EMAT_FADE_OUT
                , cv.action.delay_type.NORMAL
                , (target: cc.Node, actIO: number): void => {}
                , (target: cc.Node, actIO: number): void => {
                    // 恢复显示"邮件"图标
                    cv.MessageCenter.send("show_mail_entrance", true);
                });
    }
    onUSDT2Coin (evt: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.switchTab(0);
    }
    onCoin2USDT (evt: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        this.switchTab(1);
    }

    onTestCoin2USDT(text: string, editbox: cc.EditBox, customEventData: string) {
        super.onTestCoin2USDT(text, editbox, customEventData);
        this.onUpdateUsdtInput();
    }

    onTestUSDT2Coin(text: string, editbox: cc.EditBox, customEventData: string) {
        super.onTestUSDT2Coin(text, editbox, customEventData);
        this.onUpdateUsdtInput();
    }

    //从输入框里面获取usdt值
    onUpdateUsdtInput(){

        if(!this.usdtNode || !this.usdtNode.active){
            return;
        }

        let usdtEditBox: cc.EditBox = cc.find("input_node/editbox_coin", this.usdtNode).getComponent(cc.EditBox);
        let inputVal: string = usdtEditBox.string;
        if (!this.checkTestExNumber(inputVal) || inputVal == "") {
            this.updateExchangeFeeTips(0);
            this.updateExchangePointTips(0);
            return;
        }

        let exNum: number = parseFloat(inputVal);
        if (isNaN(exNum) || exNum <= 0) {
            this.updateExchangeFeeTips(0);
            this.updateExchangePointTips(0);

        } else {
            this.updateExchangeFeeTips(exNum);
            this.updateExchangePointTips(exNum);    
        }
        
    }
 
    switchTab(index: number) {
        if ((index != 0 && index != 1) || this.select_index == index) {
            return;
        }
        this.setBtnState(0, index == 0);
        this.setBtnState(1, index == 1);
        super.switchTab(index);
        this.bgExplanation.active = false;
        if(this.usdtNode && this.usdtNode.active){
            //当前是金币兑换usdt选项
            cv.worldNet.ExchangeGetUsdtConfigRequest(); //
            this.updateExhangeFreeTimesTips();

        }else if(this.coinNode && this.coinNode.active){
            this.hideExchangeTxtTips();
        }
    }
    setBtnState(index: number, enable: boolean) {
        let btn: cc.Node = this.tabButton[index];
        if (enable) {
            btn.getChildByName("Label").color = this.color_lab_select;
            btn.getChildByName("Background").active = true;
        } else {
            btn.getChildByName("Label").color = this.color_lab_noSelect;
            btn.getChildByName("Background").active = false;
        }
    }
    formatExRate(rateNum: number): string {
        if (isNaN(rateNum) || rateNum <= 0) {
            return "";
        }
        return cv.StringTools.handleNumberByFloor(rateNum, 4).toString();
    }

    onTabExResponse(msg: any){
        super.onTabExResponse(msg);
        this.hideExchangeTxtTips();
        this.bgExplanation.active = false;
    }
    
    onCoin2USDTAll(evt: cc.Event){
        super.onCoin2USDTAll(evt);
        this.onUpdateUsdtInput();
        this.bgExplanation.active = false;
    }

    onUSDT2CoinAll(evt: cc.Event){
        super.onUSDT2CoinAll(evt);
        this.bgExplanation.active = false;
    }


    //打开汇率提示
    onBtnHuilvQuestion(event: cc.Event){

        var node = event.target;
        let btnWorldPos = node.convertToWorldSpaceAR(cc.v2(0.5, 0.5));
        let pos = this.bgExplanation.parent.convertToNodeSpaceAR(btnWorldPos);
        this.bgExplanation.setPosition(pos.x + 40, pos.y - node.getContentSize().height/2 + 10);

        cv.AudioMgr.playButtonSound('button_click');
        this.bgExplanation.active = true;
        this.initExplanTxtLanguage(cv.config.getStringData("USDTView_explan_label"));
       
    }

    //积分提示
    onBtnPointQuestion(event: cc.Event){

        var node = event.target;
        let btnWorldPos = node.convertToWorldSpaceAR(cc.v2(0.5, 0.5));
        let pos = this.bgExplanation.parent.convertToNodeSpaceAR(btnWorldPos);
        this.bgExplanation.setPosition(pos.x + 40, pos.y - node.getContentSize().height/2 + 10);

        cv.AudioMgr.playButtonSound('button_click');
        this.bgExplanation.active = true;
        let str = cv.StringTools.formatC(cv.config.getStringData("USDTView_exchange_tips_label"),  this.coin_2_usdt_TotalFreeTime,  this.usdt_exchange_interval)
        this.initExplanTxtLanguage(str);
    }

    onEditBegin(text: string, editbox: cc.EditBox, customEventData: string) {
        super.onEditBegin(text, editbox, customEventData);
        this.bgExplanation.active = false;
    }


    resetTabTestExNum(index: number){
        super.resetTabTestExNum(index);
        this.hideExchangeTxtTips();
        this.txt_freeTimes.node.active = true;
    }
    //隐藏兑换提示
    hideExchangeTxtTips(){

        this.txt_freeTimes.node.active = false;
        this.txt_feeTips.node.active = false;
        this.open_use_point = false;
        this.setShowPointStatus(false);
        this.setBtnSpriteStatus(this.open_use_point);
    }

    //刷新免费剩余次数
    updateExhangeFreeTimesTips(){
        this.txt_freeTimes.node.active = true;

        let _freeCount = this.coin_2_usdt_freeTime >= 0 ? this.coin_2_usdt_freeTime: 0;
        
        this.txt_freeTimes.string = cv.StringTools.formatC(cv.config.getStringData("USDTView_usdt_change_free_tips"), _freeCount);
    }

    //刷新费率提示 
    //dstCoinNum：当前要转换的目标金币值
    //pointFreeCoin ： 积分折扣的金币值
    updateExchangeFeeTips(dstCoinNum:number = 0, pointFreeCoin:number = 0){
        //当前剩余次数大于0，或者目标兑换usdt <=0 隐藏提示
        if(this.coin_2_usdt_freeTime > 0 || dstCoinNum <= 0){
            this.txt_feeTips.node.active = false;
            return;
        }

        this.txt_feeTips.node.active = true;
        let _fee = this.coin_2_usdt_feeRatio;
        let _curCoin:number = dstCoinNum - dstCoinNum*_fee  + pointFreeCoin;

        let hlNum = this.getCoin2USDTExRate(); //当前汇率
        //因为汇率有6位小数，所以先转换成分，再做汇率运算
         _curCoin = cv.StringTools.serverGoldByClient(_curCoin);
         _curCoin = Math.floor(_curCoin); 
         let _realUSDT: number = hlNum * _curCoin;
         _realUSDT = Math.floor(_realUSDT);  
         let _realUSDTStr = cv.StringTools.numToFloatString(_realUSDT);  //再换算成客户端数值

        this.txt_feeTips.string = cv.StringTools.formatC(cv.config.getStringData("USDTView_usdt_change_fee_tips"), _fee*100 + "%", _realUSDTStr);
    }

    //设置是否显示积分栏
    setShowPointStatus(status:boolean = false){

        let changeBg = this.usdtNode.getChildByName("input_node").getChildByName("bg");
        let layoutTips = cc.find("layoutTips", this.usdtNode);

        this.txt_pointsTips.node.active = status;
        this.btn_usePoint.active = status;
        if(status){  //显示
            layoutTips.y = -639;
            changeBg.setContentSize(1000, 514); 
        }else{ //隐藏
            changeBg.setContentSize(1000, 348);
            layoutTips.y = -473;
        }
        cv.resMgr.adaptWidget(changeBg, true);
    }

    //刷新积分提示
    updateExchangePointTips(dstCoinNum:number = 0){

        let _curUserPoint = cv.dataHandler.getUserData().user_points;
        if(this.coin_2_usdt_freeTime > 0 || _curUserPoint <=0 || dstCoinNum <= 0){  
              //剩余免费次数大于0   或者  用户积分为0，不显示积分兑换提示  或者 需要兑换的coin为0   那么，隐藏提示
            this.setShowPointStatus(false);
            return;
        }

        if(this.coin_2_usdt_pointRatio <= 0 ||  _curUserPoint < this.coin_2_usdt_pointRatio){ 
            //积分兑换比为0，表示服务器没有配置  , 如果积分折扣的兑换的_usdt小于1个coin，此时也不显示
            this.setShowPointStatus(false);
            return;
        }

        this.setShowPointStatus(true);
        let _curShowUsePoint =  "";

        //手续费, 相上兼容
        let _fee =  cv.StringTools.toFixed(dstCoinNum*this.coin_2_usdt_feeRatio, 
                                            2, cv.StringTools.RoundingMode.ROUND_UP);
    
        let _feeNeedPoints =  _fee*this.coin_2_usdt_pointRatio;   //手续费对应的积分，保留到分
        let _pointDiscountCoin = 0;      //积分折扣的金币

        if(_curUserPoint > _feeNeedPoints){
            //如果自己的积分，大于手续费所需要的积分
            _curShowUsePoint =  cv.StringTools.numToFloatString(_feeNeedPoints); 
            _pointDiscountCoin = _fee;  
        }else{
            //如果自己的积分，小于等于手续费所需要的积分。 自己全部积分将用上
            _curShowUsePoint =  cv.StringTools.numToFloatString(_curUserPoint); 
            //积分不足向下取
            _pointDiscountCoin =   cv.StringTools.handleNumberByFloor(_curUserPoint/this.coin_2_usdt_pointRatio, 2);
        }

        this.txt_pointsTips.string = cv.StringTools.formatC(cv.config.getStringData("USDTView_usdt_change_point_tips"),
                                                             _curShowUsePoint, _pointDiscountCoin);
        if(this.open_use_point){  //开启了可用开关
            this.updateExchangeFeeTips(dstCoinNum,  _pointDiscountCoin);
        }
    }

    //开启/关闭使用积分
    onBtnUsePoint(){
        cv.AudioMgr.playButtonSound('button_click');
        this.open_use_point = !this.open_use_point;
        this.setBtnSpriteStatus(this.open_use_point);
        let srcEditBox: cc.EditBox = cc.find("input_node/editbox_coin", this.usdtNode).getComponent(cc.EditBox);
        let inputVal = srcEditBox.string;
        let dstNum = parseFloat(inputVal);

        if (isNaN(dstNum) || dstNum <= 0) {
            this.updateExchangeFeeTips(0);
            this.updateExchangePointTips(0);

        } else {
            this.updateExchangeFeeTips(dstNum);
            this.updateExchangePointTips(dstNum);    
        }
    }

    setBtnSpriteStatus(btnStatus:boolean = false){

        if(btnStatus){
            this.btn_usePoint.getChildByName("spOff").active = false;
            this.btn_usePoint.getChildByName("spOn").active = true;
        }else{
            this.btn_usePoint.getChildByName("spOff").active = true;
            this.btn_usePoint.getChildByName("spOn").active = false;
        }
    }

  //获取兑换配置信息
  onExhangeConfigResponse(msg:any):void{
        this.coin_2_usdt_TotalFreeTime = msg.max_usdt_exchange_count;
        this.coin_2_usdt_freeTime =  msg.left_usdt_exchange_count;
        this.coin_2_usdt_feeRatio =  parseFloat(msg.usdt_fee_ratio);
        this.coin_2_usdt_pointRatio = msg.point_to_usd_deduction;
        this.usdt_exchange_interval =  cv.StringTools.handleNumberByFloor(msg.usdt_exchange_interval/60, 2);
        this.updateExhangeFreeTimesTips();
   }

    //兑换配置改变通知
   onExhangeConfigChangeNotice(msg:any):void{
        cv.worldNet.ExchangeGetUsdtConfigRequest();
   }

   onExchangeTimeLimitError(msg:any):void{
        this.bgExplanation.active = false;
       cv.TT.showMsg(cv.StringTools.formatC(cv.config.getStringData("ServerErrorCode257"), this.usdt_exchange_interval), cv.Enum.ToastType.ToastTypeError);
   }




}
