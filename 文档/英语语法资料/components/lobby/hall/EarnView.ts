// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../cv";
import { pb } from "../../../../Script/common/pb/ws_protocol";
import ExplainView from "./ExplainView";
import PointItem from "./PointItem";
import SwitchPoint from "./SwitchPoint";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import { MiniGameInfo } from "../miniGame/MiniGameConfigs";
const { ccclass, property } = cc._decorator;

@ccclass
export default class EarnView extends cc.Component {

    @property(cc.Prefab)
    SecondaryPassword: cc.Prefab = null;
    secondPsdView: cc.Node = null;

    @property(cc.Prefab) safePref: cc.Prefab = null;

    @property(cc.Node) RechargeBtn: cc.Node = null;
    @property(cc.Node) EarnBtn: cc.Node = null;
    @property(cc.Node) ExchangeBtn: cc.Node = null;
    @property(cc.Node) QueryBtn: cc.Node = null;

    @property(cc.Sprite) close_jifeng_state_bg: cc.Sprite = null;
    @property(cc.Sprite) open_jifeng_state_bg: cc.Sprite = null;
    @property(cc.Node) jifeng_switch_node: cc.Node = null;
    @property(cc.Button) change_jifengView_btn: cc.Button = null;
    @property(cc.Button) explain_btn_mini: cc.Button = null;
    @property(cc.Button) explain_btn_jifeng: cc.Button = null;
    @property(cc.Label) labArr: cc.Label[] = [];
    @property(cc.Layout) totalNumNode: cc.Layout = null;
    @property(cc.Label) coinNum: cc.Label = null;
    @property(cc.Label) usdtNum: cc.Label = null;
    @property(cc.Label) lab_gold: cc.Label = null;
    @property(cc.Label) lab_minigold: cc.Label = null;
    @property(cc.Label) lab_usdt: cc.Label = null;
    @property(cc.Label) lab_jifeng: cc.Label = null;
    @property(cc.Prefab) explainView_prefab: cc.Prefab = null;
    @property(cc.Prefab) pointItem_prefab: cc.Prefab = null;
    @property(cc.Prefab) InquireView_prefab: cc.Prefab = null;
    @property(cc.Prefab) switchPoint_prefab: cc.Prefab = null;
    @property(cc.Prefab) UsdtView_prefab: cc.Prefab = null;
    @property(cc.Node) scroll_content: cc.Node = null;
    @property(cc.Node) item_node: cc.Node = null;
    @property(cc.Label) lab_tips: cc.Label = null;

    @property(cc.Node) root_scroll_content: cc.Node = null;

    @property(cc.Node) poinNode: cc.Node = null; //积分信息区域
    @property(cc.Label)  welfareTitle: cc.Label = null;   //电子福利标题
    @property(cc.Button) btn_welfareCtrlView: cc.Button = null; //电子福利显示收缩按钮
    @property(cc.Node) welfareInfoNode: cc.Node = null; //电子福利信息区域

    @property(cc.Label)  freeBonusTitle: cc.Label = null;   //免费福利金额
    @property(cc.Button) btn_BonusQues: cc.Button = null; //免费福利金额提示按钮

    @property(cc.RichText) bonusDesc: cc.RichText = null; //免费红利描述

    @property(cc.Label)  freeCountTitle: cc.Label = null;   //免费游戏次数
    @property(cc.Button) btn_FreeQues: cc.Button = null; //免费游戏次数按钮
    @property(cc.RichText) FreeCountDesc: cc.RichText = null; //免费次数描述

    @property(cc.Label)  txtWelfareAmount: cc.Label = null;   //免费红利金额
    @property(cc.Label)  txtFreeCount: cc.Label = null;   //免费次数

    @property(cc.Node)  bonusRedDot: cc.Node = null;   //红利红点
    @property(cc.Node)  freeRedDot: cc.Node = null;   //免费次数红点


    inquire_node: cc.Node = null;
    switchPoint_node: cc.Node = null;
    usdtView_node: cc.Node = null;
    getGoodList: boolean = false;
    bTouch: boolean = false;
    explainIndex: number = -1;
    private isShowWelfare:boolean = false; //是否显示福利区域
    
    private bonusGameIDs: number[] = [];      //存在红利奖励的游戏
    private freeGameIDs: number[] = [];      //存在免费次数的游戏
    

    onLoad() {
    
        cv.resMgr.adaptWidget(this.node, true);
        this.registerMsg();
        // this.jifeng_switch_node.active = false;
        // this.close_jifeng_state_bg.node.active = true;
        // this.open_jifeng_state_bg.node.active = false;
        
 
        this.secondPsdView = cv.action.addChildToScene(this, this.SecondaryPassword, []);

        //福利收缩按钮
        this.btn_welfareCtrlView.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            if(cv.dataHandler.getUserData().checkHaveWelfare()){
                this.showWelfareSwitchView(!this.isShowWelfare);
            }
         
        }, this);
        
        //积分收缩按钮
        this.change_jifengView_btn.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            if (!cv.dataHandler.getUserData().m_bIsLoginServerSucc) return;
            if (!this.getGoodList) {
                this.bTouch = true;
                cv.worldNet.GoodsListRequest();
            }
            else {
                this.showSwitchView();
            }
        }, this);

        this.switchPoint_node = cc.instantiate(this.switchPoint_prefab);
        cv.action.addChildToSceneOnce(this.switchPoint_node);
        this.switchPoint_node.active = false;

        this.root_scroll_content.height = 2600;

        this.explain_btn_jifeng.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            this.showExplainView(this.explain_btn_jifeng.node, "Earnings_point_tips_", 3);
            this.explainIndex = 0;
        }, this);
        this.explain_btn_mini.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            this.showExplainView(this.explain_btn_mini.node, "Earnings_minigold_tips_", 3);
            this.explainIndex = 1;
        }, this);

        //福利提示
        this.btn_BonusQues.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            this.showWelfareTips(1);
            this.explainIndex = 2;
            this.hideWelfareRedDot(0);
        }, this);
        //免费次数提示
        this.btn_FreeQues.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            this.showWelfareTips(2);
            this.explainIndex = 3;
            this.hideWelfareRedDot(1);
        }, this);

        //小游戏福利信息
        if(!cv.dataHandler.getUserData().checkHaveWelfare()){ //没有下游戏福利
            this.showWelfareSwitchView(false);
        }else{
            this.onBonusAndFreeResponse(null);   
        }
    };  

    onEnable(){
 
        let isOpen = !this.open_jifeng_state_bg.node.active;
        if (!isOpen) {
            let scroll = this.scroll_content.parent.getComponent(cc.ScrollView);
            scroll.scrollToTop(0.01);
        }
    }

    start() {
        this.initLanguage();
        cv.MessageCenter.send("sendShowBankBtnRedDot", false);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("earn_open", this.node);
        cv.MessageCenter.unregister("EarnView_ExchangeUserPoints", this.node);
        cv.MessageCenter.unregister("update_info", this.node);
        cv.MessageCenter.unregister("update_gold", this.node);
        cv.MessageCenter.unregister("EarnView_GoodsListResponse", this.node);
        cv.MessageCenter.unregister("sendBonusAndFreeGamesMsg", this.node);

        // cv.MessageCenter.unregister("sendHideNoticeWebView", this.node);
        // cv.MessageCenter.unregister("HideWebview_ShowWindows", this.node);
    }

    onDisable() {
        this.resetScrollPos();
        let mini_explainView = this.node.getChildByName("mini_explainView");
        if (mini_explainView) {
            if (mini_explainView.getComponent(ExplainView).isShow) {
                  mini_explainView.getComponent(ExplainView).hide();
            }
        }
    }

    registerMsg() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("earn_open", this.onSafeTakeOutClick.bind(this), this.node);
        cv.MessageCenter.register("EarnView_ExchangeUserPoints", this.ExchangeUserPointsResponse.bind(this), this.node);
        cv.MessageCenter.register("update_info", this.noticeUpdateData.bind(this), this.node);
        cv.MessageCenter.register("update_gold", this.noticeUpdateData.bind(this), this.node);
        cv.MessageCenter.register("EarnView_GoodsListResponse", this.GoodsListResponse.bind(this), this.node);
        cv.MessageCenter.register("sendBonusAndFreeGamesMsg", this.onBonusAndFreeResponse.bind(this), this.node);
    }

    onRechargeHandDown(evt) {
        console.log("onRechargeHandDown", evt);
        cc.find("Label", evt.currentTarget).getComponent(cc.Label).node.color = cc.Color.WHITE;
    }

    onRechargeHandUp(evt) {
        cc.find("Label", evt.currentTarget).getComponent(cc.Label).node.color = new cc.Color(0, 143, 240);
        console.log("onRechargeHandUp");
    }

    onRechargeHandCancel(evt) {
        cc.find("Label", evt.currentTarget).getComponent(cc.Label).node.color = new cc.Color(0, 143, 240);
        console.log("onRechargeHandCancel");
    }

    initLanguage() {
 
        cc.find("recharge_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Earnings_recharge_button_label");
        cc.find("earnings_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Earnings_earnings_button_label");
        cc.find("exchange_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Earnings_exchange_button_label");
        cc.find("inquiries_button/Label", this.node).getComponent(cc.Label).string = cv.config.getStringData("Earnings_inquiries_button_label");

        let len = this.labArr.length;
        for (let i = 0; i < len; i++) {
            let tempLab = this.labArr[i];
            tempLab.string = cv.config.getStringData("Earnings_lab_" + i);
        }

        this.freeBonusTitle.string = cv.config.getStringData("Earnings_bonus");  //免费红利金额
        this.freeCountTitle.string = cv.config.getStringData("Earnings_freeCount");  //免费次数
        this.btn_BonusQues.node.x =  this.freeBonusTitle.node.x + cv.resMgr.getLabelStringSize(this.freeBonusTitle).width - 5;
        this.btn_FreeQues.node.x =  this.freeCountTitle.node.x + cv.resMgr.getLabelStringSize(this.freeCountTitle).width - 5;

        let jSize = cv.resMgr.getLabelStringSize(this.explain_btn_jifeng.node.parent.getComponent(cc.Label));
        let mSize = cv.resMgr.getLabelStringSize(this.explain_btn_mini.node.parent.getComponent(cc.Label));
        this.explain_btn_jifeng.node.setPosition(jSize.width, this.explain_btn_jifeng.node.y);
        this.explain_btn_mini.node.setPosition(mSize.width, this.explain_btn_mini.node.y);

        let isthai: boolean = cv.config.isThai();
        // this.webview.node.active = isthai;
        this.RechargeBtn.active = !isthai;
        this.EarnBtn.active = !isthai;
        this.ExchangeBtn.active = !isthai;
        this.QueryBtn.active = !isthai;

        let mini_explainView = this.node.getChildByName("mini_explainView");
        if (mini_explainView) {
            if (mini_explainView.getComponent(ExplainView).isShow) {
                if (this.explainIndex == 0) {
                    this.showExplainView(this.explain_btn_jifeng.node, "Earnings_point_tips_", 3);
                }
                else if (this.explainIndex == 1) {
                    this.showExplainView(this.explain_btn_mini.node, "Earnings_minigold_tips_", 3);
                }else if(this.explainIndex == 2 || this.explainIndex == 3){
                    mini_explainView.getComponent(ExplainView).hide();
                }
            }
        }

        this.setLabTips();
       
    }

    onBtnRechargeClick() {
        cv.AudioMgr.playButtonSound('tab');
        cv.SHOP.RechargeClick();
    };

    onBtnEarnClick() {
        cv.AudioMgr.playButtonSound('tab');
        if (cv.dataHandler.getUserData().isTouristUser) {
            cv.TP.showMsg(cv.config.getStringData("roleInfoSet_tips_updateGrade_earntips_text"), cv.Enum.ButtonStyle.TWO_BUTTON, cv.dataHandler.upgradeAccount.bind(cv.dataHandler), cv.dataHandler.cancleUpgradeAccount.bind(cv.dataHandler));
            return;
        }
        if (cv.config.isOverSeas()) {
            cv.StatusView.show(false);
            cv.action.moveToAction(this.secondPsdView, cv.Enum.action_FuncType.to_left, cv.Enum.action_FuncType.enter,
                cv.Enum.action_FuncType.dt_NORMAL,
                cc.v2(cv.config.WIDTH * 1.5, 0), cc.v2(cv.config.WIDTH * 0.5, 0));
            return;
        }

        cv.TP.showMsg(cv.config.getStringData("Safe_tips_content"),cv.Enum.ButtonStyle.TWO_BUTTON, this.safeSureBtn.bind(this), this.safeCancelBtn.bind(this), false, cv.config.getStringData("Safe_tips"));
        cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_OPEN_Security_Box);
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cv.TP.getMessageText().fontSize = 47;
        }
    };

    onSafeTakeOutClick() {
        cv.StatusView.show(false);
        cv.action.moveToAction(this.secondPsdView, cv.Enum.action_FuncType.to_left, cv.Enum.action_FuncType.enter,
            cv.Enum.action_FuncType.dt_NORMAL,
            cc.v2(cv.config.WIDTH * 1.5, 0), cc.v2(cv.config.WIDTH * 0.5, 0));
    }

    onBtnQueryClick() {
        cv.AudioMgr.playButtonSound('tab');
        // cv.SHOP.QueryClick();
        if (!this.inquire_node) {
            this.inquire_node = cc.instantiate(this.InquireView_prefab);
            cv.action.addChildToSceneOnce(this.inquire_node);
        }
        cv.action.showAction(this.inquire_node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);

    };

    ExchangeUserPointsResponse(msg: pb.ExchangeUserPointsResponse) {
        let isSucc = msg.error == 1;
        let tips = "";
        if (isSucc) {
            tips = "SwitchPoint_lab_4";
        }
        else if (msg.error == 236) {
            tips = "ServerErrorCode" + msg.error;
        }
        else {
            cv.ToastError(msg.error);
            return;
        }
        this.switchPoint_node.getComponent(SwitchPoint).showSucc(cv.config.getStringData(tips), isSucc);
        this.noticeUpdateData();
    }

    noticeUpdateData() {
        // this.lab_total.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().total_amount);
        this.coinNum.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().total_amount);
        let usdtStr: string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().usdt);
        this.usdtNum.string = usdtStr;
        this.totalNumNode.node.getChildByName("usdt_layout").active = (cv.dataHandler.getUserData().usdt > 0) ? true : false;
        this.lab_usdt.string = usdtStr;
        this.lab_gold.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().u32Chips);
        this.lab_minigold.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().game_coin);
        this.lab_jifeng.string = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().user_points);
        this.setLabTips();
    }


    private showWelfareTips(type:number){
        let str:string[] = [];
        //如果不支持的游戏数量小于5个（列表中显示的所有游戏中）
        // ——则后半部分提示：适用除xxx、xxx、xxx之外的所有游戏。
        // 如果不支持的游戏数量大于5个
        // ——则后半部分提示：“适用游戏：xxx、xxx、xxx.....。”
        // 如果列表中的游戏都支持
        // ——则后半部分提示：适用所有游戏。

        let totalShowMinis:pb.PgGameData[] = cv.dataHandler.getUserData().welfarePgGames;
        let totalGameLen:number = totalShowMinis.length;
        if(totalGameLen <= 0){
            return;
        }

        let _curSurporGameIDs:number[] = [];
        let GameNames:string = "";

        if(type == 1){   //红利处理
            _curSurporGameIDs = this.bonusGameIDs;
            str.push(cv.config.getStringData("Earnings_welfare_tips1"));
        }else{
            _curSurporGameIDs = this.freeGameIDs;
            str.push(cv.config.getStringData("Earnings_welfare_tips2"));
        }

        //console.log("##########################totalGameLen:"+ totalGameLen);
        //console.log("##########################_curSurporGameIDs:"+ _curSurporGameIDs);
        let GameNameArr:string[] = [];
        let suportLen =   _curSurporGameIDs.length;
        let lineCount = cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN?4:2;
        if(totalGameLen == suportLen){ //所有的游戏都支持
            str.push(cv.config.getStringData("Earnings_welfare_tips6"));

        }else if((totalGameLen - _curSurporGameIDs.length) <= 5){ //如果不支持的游戏小于5个, 找出不支持的游戏来支持
            let _countLine = 0;
            let _curTotal = lineCount - 1;
            for(let i = 0; i < totalShowMinis.length; i++){ 
                let bSuport = false;
                for(let j = 0; j < _curSurporGameIDs.length; j++){
                    if(totalShowMinis[i].gameId === _curSurporGameIDs[j]){
                        bSuport = true;
                        break;
                    }
                }
                if(!bSuport){
                    let name:string = totalShowMinis[i].gameName;
                    if(name.length > 0){
                        _countLine++;
                        if(_countLine ==  _curTotal && i != totalShowMinis.length - 1){
                            GameNameArr.push(name + "\n");
                            _curTotal = lineCount;
                            _countLine = 0;
                        }else{
                            GameNameArr.push(name);
                        }                        
                    }
                }
            }
            
            GameNames = GameNameArr.join("、");
            if(GameNameArr.length > 0){
                str.push(cv.StringTools.formatC(cv.config.getStringData("Earnings_welfare_tips3"), GameNames))
            }

        }else{
            //如果不支持的游戏大于5个，显示支持的游戏
            let _countLine = 0;
            for(let i = 0; i < _curSurporGameIDs.length; i++){
                for(let j = 0; j <totalShowMinis.length; j++){
                    if(_curSurporGameIDs[i] === totalShowMinis[j].gameId){
                        let name:string = totalShowMinis[j].gameName;
                        if(name.length > 0){
                            _countLine++;
                            if(_countLine ==  lineCount && i != _curSurporGameIDs.length - 1){
                                GameNameArr.push(name + "\n");
                                _countLine = 0;
                            }else{
                                GameNameArr.push(name);
                            }    
                        }
                        break;
                    }
                }
                if(i == 19){  //最多显示20个
                    GameNameArr.push("...");
                    break;
                }
            }

            GameNames = GameNameArr.join("、");
            let tips = cv.StringTools.formatC(cv.config.getStringData("Earnings_welfare_tips5"), GameNames);
            if(GameNameArr.length <= 0){  //没有游戏 后面句号去掉
                tips = tips.substring(0, tips.lastIndexOf('。'));  
            }else{
                str.push(tips)
            }
          
        }

        if(type == 1){
            this.showExplainCommonView(this.btn_BonusQues.node, str, 3);
        }else{
            this.showExplainCommonView(this.btn_FreeQues.node, str, 3);
        }
    }



    //存储存在红利的游戏gameID
    private addToBounsArray(gameID:number){

        let curShowPgGames = cv.dataHandler.getUserData().welfarePgGames;
        let bShowNow = false;
        for(let j = 0; j <curShowPgGames.length; j++){
            if(gameID === curShowPgGames[j].gameId){
                bShowNow = true;
                break;
            }
        }

        if(!bShowNow){ //不在当前显示中
            return;
        }

        for(let i = 0; i < this.bonusGameIDs.length; i++){
            if(this.bonusGameIDs[i] == gameID){  //已经在存储中了
                return;
            }
        }
        this.bonusGameIDs.push(gameID);
    }

    private addToFreeArray(gameID:number){

        let curShowPgGames = cv.dataHandler.getUserData().welfarePgGames;
        let bShowNow = false;
        for(let j = 0; j <curShowPgGames.length; j++){
            if(gameID === curShowPgGames[j].gameId){
                bShowNow = true;
                break;
            }
        }

        if(!bShowNow){ //不在当前显示中
            return;
        }

        for(let i = 0; i < this.freeGameIDs.length; i++){
            if(this.freeGameIDs[i] == gameID){  //已经在存储中了
                return;
            }
        }
        this.freeGameIDs.push(gameID);
    }


    //红点显示处理
    private showWelfareRedDot(){
        let _showFreeDot = cv.tools.GetStringByCCFile("welfareFreeNew");
        if(_showFreeDot === "true"){
            this.freeRedDot.active = true;
        }else{
            this.freeRedDot.active = false;
        }

        let _showBounDot = cv.tools.GetStringByCCFile("welfareBounsNew");
        if(_showBounDot === "true"){
            this.bonusRedDot.active = true;
        }else{
            this.bonusRedDot.active = false;
        }
    }

    //红利隐藏处理
    private hideWelfareRedDot(type:number = 0){
        if(type == 0 &&  this.bonusRedDot.active){
            cv.tools.SaveStringByCCFile("welfareBounsNew", "false");
            this.bonusRedDot.active = false;
        }
        else if(type == 1 && this.freeRedDot.active){
            cv.tools.SaveStringByCCFile("welfareFreeNew", "false");
            this.freeRedDot.active = false;
        }
    }

    //电子游戏福利返回
    onBonusAndFreeResponse(data:any){

        this.FreeCountDesc.node.active = false;
        this.bonusDesc.node.active = false;

        this.showWelfareRedDot();
        if(cv.dataHandler.getUserData().checkHaveWelfare()){
            this.showWelfareSwitchView(true);
        }else{
            //没有数据
            this.showWelfareSwitchView(false);
            return;
        }
      
        let  bonus = cv.dataHandler.getUserData().getWelfareBouns();
        let  freeGames =cv.dataHandler.getUserData().getWelfareFrees();

        this.bonusGameIDs = [];
        let balanceAmount = 0; //红利总额度
        let balanceAmount_exp = 0; //最近过期的红利金额
        let bonusExpTimes = 0; //记录最近的过期时间
        let bSameExpTimes = true; //所有过期时间都一样
  
        for(let i = 0; i < bonus.length; i++){
            let gameIds = bonus[i].gameIds;
          
            if(bonusExpTimes==0){
                bonusExpTimes = bonus[i].expiredDate;
                balanceAmount_exp = bonus[i].balanceAmount;
            }

            balanceAmount += bonus[i].balanceAmount;
            if(bonus[i].expiredDate < bonusExpTimes){ //记录最近的过期时间
                bonusExpTimes = bonus[i].expiredDate;
                balanceAmount_exp = bonus[i].balanceAmount;
            }

            //判断是否所有过期时间都一样
            if(i != 0 && bonus[i].expiredDate != bonus[i - 1].expiredDate){
                bSameExpTimes = false;
            }
    
            for(let j = 0; j < gameIds.length; j++){
                this.addToBounsArray(gameIds[j]);
            }
            
        }

        this.txtWelfareAmount.string = balanceAmount.toFixed(2).toString(); //免费红利总金额
        let timeStr = cv.StringTools.formatTime(bonusExpTimes/1000, cv.Enum.eTimeType.Year_Month_Day_Hour_Min);

        if(balanceAmount_exp > 0){
            this.bonusDesc.node.active = true;
            if(bSameExpTimes){
                this.bonusDesc.string = cv.StringTools.formatC(cv.config.getStringData("Earnings_expirationDesc2"), timeStr);    
            }else{
                this.bonusDesc.string = cv.StringTools.formatC(cv.config.getStringData("Earnings_expirationDesc1"), balanceAmount_exp.toFixed(2) , timeStr);    
            }
        }
    
        let freeGameAmount = 0; //免费游戏次数
        let freeGameAmount_exp = 0; //最近过期的免费次数
        let FreeExpTimes = 0; //记录最近的过期时间
        bSameExpTimes = true;
        this.freeGameIDs = [];
    
        for(let i = 0; i < freeGames.length; i++){
            let gameIds = freeGames[i].gameIds;
            freeGameAmount += freeGames[i].gameCount;
            if(FreeExpTimes==0 ) {
                FreeExpTimes = freeGames[i].expiredDate;
                freeGameAmount_exp = freeGames[i].gameCount;
            } 
            if(freeGames[i].expiredDate < FreeExpTimes){ 
                FreeExpTimes = freeGames[i].expiredDate;
                freeGameAmount_exp = freeGames[i].gameCount;
            }
            //判断是否所有过期时间都一样
            if(i != 0 && freeGames[i].expiredDate != freeGames[i-1].expiredDate){
                bSameExpTimes = false;
            }

            for(let j = 0; j < gameIds.length; j++){
                this.addToFreeArray(gameIds[j]);
            }
            
        }

        this.txtFreeCount.string =  cv.StringTools.formatC(cv.config.getStringData("Earnings_freeNum"), freeGameAmount);   //免费次数
        timeStr = cv.StringTools.formatTime(FreeExpTimes/1000, cv.Enum.eTimeType.Year_Month_Day_Hour_Min);

        if(freeGameAmount_exp > 0){
            this.FreeCountDesc.node.active = true;
            if(bSameExpTimes){
                this.FreeCountDesc.string = cv.StringTools.formatC(cv.config.getStringData("Earnings_expirationDesc2"), timeStr);    
            }else{
                let _tempstr = cv.StringTools.formatC(cv.config.getStringData("Earnings_freeNum"), freeGameAmount_exp);   //过期免费次数
                this.FreeCountDesc.string = cv.StringTools.formatC(cv.config.getStringData("Earnings_expirationDesc1"), _tempstr, timeStr);    
            }
        }
    }

    GoodsListResponse(msg: pb.Goods[]) {
        if (this.bTouch) {
            this.bTouch = false;
            this.showSwitchView();
        }

        let msglen = cv.StringTools.getArrayLength(msg);
        if (!this.getGoodList && msglen > 0) {
            this.setLabTips();
            let len = Math.ceil(msglen / 2);
            let isPair: boolean = (len * 2 - msglen == 0);
            let height = this.item_node.height * len + 20 * (len - 1);
            if (height > this.scroll_content.parent.height) {
                this.scroll_content.setContentSize(this.scroll_content.width, height);
            }
            if (isPair) {
                for (let i = 0; i < len; i++) {
                    let node = cc.instantiate(this.item_node);
                    node.active = true;
                    this.scroll_content.addChild(node);
                    let item_0 = node.getChildByName("item_0");
                    let item_1 = node.getChildByName("item_1");
                    let item0 = cc.instantiate(this.pointItem_prefab);
                    item_0.addChild(item0);
                    let item1 = cc.instantiate(this.pointItem_prefab);
                    item_1.addChild(item1);

                    item0.getComponent(PointItem).show(msg[2 * i], 2 * i);
                    item1.getComponent(PointItem).show(msg[2 * i + 1], 2 * i + 1);
                }
            }
            else {
                for (let i = 0; i < len; i++) {
                    let node = cc.instantiate(this.item_node);
                    node.active = true;
                    this.scroll_content.addChild(node);

                    let item_0 = node.getChildByName("item_0");
                    let item_1 = node.getChildByName("item_1");

                    let item0 = cc.instantiate(this.pointItem_prefab);
                    item_0.addChild(item0);
                    item0.getComponent(PointItem).show(msg[2 * i], 2 * i);
                    if (i == len - 1) {
                        item_1.active = false;
                    }
                    else {
                        let item1 = cc.instantiate(this.pointItem_prefab);
                        item_1.addChild(item1);
                        item1.getComponent(PointItem).show(msg[2 * i + 1], 2 * i + 1);
                    }

                }
            }
        }
        this.getGoodList = true;
    }

    showExplainView(node: cc.Node, str: string, len: number) {
        let bg = node.getChildByName("Background");
        let worldPos = node.convertToWorldSpaceAR(cc.v2(bg.x + bg.width * 0.5, bg.y - bg.height));

        let mini_explainView = this.node.getChildByName("mini_explainView");
        if (!mini_explainView) {
            mini_explainView = cc.instantiate(this.explainView_prefab);
            this.node.addChild(mini_explainView);
            mini_explainView.name = "mini_explainView";
        }

        mini_explainView.getComponent(ExplainView).show(str, len, worldPos, 2);
    }


    showExplainCommonView(node: cc.Node, str: string[], len: number) {
        let bg = node.getChildByName("Background");
        let worldPos = node.convertToWorldSpaceAR(cc.v2(bg.x + bg.width * 0.5, bg.y - bg.height));

        let mini_explainView = this.node.getChildByName("mini_explainView");
        if (!mini_explainView) {
            mini_explainView = cc.instantiate(this.explainView_prefab);
            this.node.addChild(mini_explainView);
            mini_explainView.name = "mini_explainView";
        }

        mini_explainView.getComponent(ExplainView).showCommonTips(str, worldPos, 2);

     
    }


    showSwitchView() {

        //积分区域显示控制
        let isOpen = !this.open_jifeng_state_bg.node.active;
        if (!isOpen) {
            this.resetScrollPos();
        }else{
            let scroll = this.scroll_content.parent.getComponent(cc.ScrollView);
            scroll.scrollToTop(0.01);
        }
        this.jifeng_switch_node.active = isOpen;
        // this.close_jifeng_state_bg.node.active = !isOpen;
        this.open_jifeng_state_bg.node.active = isOpen;

        let path = "zh_CN/hall/lobby/" + (isOpen ? "jiantou_1" : "jiantou_0");
        cv.resMgr.setButtonFrame(this.change_jifengView_btn.node, path, path, path, path);
    }

    showWelfareSwitchView(isShowWelfare:boolean = false){

        this.isShowWelfare = isShowWelfare;
        let path = "zh_CN/hall/lobby/" + (this.isShowWelfare ? "jiantou_1" : "jiantou_0");
        cv.resMgr.setButtonFrame(this.btn_welfareCtrlView.node, path, path, path, path);

        this.welfareInfoNode.active = this.isShowWelfare
        let offsetY = 13;
        if(this.isShowWelfare){
            //福利显示
            this.root_scroll_content.height = 2600;
            this.poinNode.y = this.welfareInfoNode.parent.y - this.welfareInfoNode.parent.getContentSize().height - offsetY;
        }else{
            //福利隐藏
            this.poinNode.y = this.welfareInfoNode.parent.y - 120 - offsetY;
        }
    }

    setLabTips() {
        let point = cv.StringTools.serverGoldToShowNumber(cv.dataHandler.getUserData().user_points);
        if (point < 200) {
            this.lab_tips.string = "";
            this.setScrollSize(false);
            return;
        }
        this.setScrollSize(true);
        this.lab_tips.fontSize = cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN ? 26 : 22;
        let num_0 = Math.floor(point / 200);
        let num_1 = Math.floor(point / 1000);
        if (point < 1000) {
            this.lab_tips.string = cv.StringTools.formatC(cv.config.getStringData("Earnings_lab_use1"), num_0);
        }
        else {
            this.lab_tips.string = cv.StringTools.formatC(cv.config.getStringData("Earnings_lab_use0"), num_0, num_1);
        }
    }

    setScrollSize(isViewTips: boolean) {
        let size = this.scroll_content.getContentSize();
        this.scroll_content.parent.getComponent(cc.Widget).top = isViewTips ? 37 : 0;
     //   cv.resMgr.adaptWidget(this.scroll_content.parent, true);
        if (size.height > this.scroll_content.height) {
            this.scroll_content.setContentSize(size);
        }
    }

    resetScrollPos() {
        let scroll = this.scroll_content.parent.getComponent(cc.ScrollView);
        if (scroll.isAutoScrolling()) {
            let offset = scroll.getScrollOffset().y;
            let maxOffset = scroll.getMaxScrollOffset().y;
            if (offset < 0) {
                scroll.setContentPosition(cc.v2(0, scroll.node.height * 0.5));
            }
            else if (offset > maxOffset) {
                scroll.setContentPosition(cc.v2(0, scroll.content.height - scroll.node.height * 0.5));
            }
        }
    }

    //show usdt
    onClickUSDT() {
        //0-获取人民币到Usdt汇率 1-获取usdt到人民币的汇率
        // cv.worldNet.GetScalerQuoteRequest(1);
        //兑换操作类型, 0-人民币到Usdt的兑换 1-usdt到人民币的兑换
        //要兑换货币的金额  以分为单位
        // cv.worldNet.ExchangeCurrencyRequest(1, 680);
        cv.AudioMgr.playButtonSound('button_click');
        if (!this.usdtView_node) {
            this.usdtView_node = cc.instantiate(this.UsdtView_prefab);
            cv.action.addChildToSceneOnce(this.usdtView_node);
        }
        cv.action.showAction(this.usdtView_node, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);

        // 隐藏邮件入口按钮, 且冻结显示
        cv.MessageCenter.send("hide_mail_entrance", true);
    }

    safeSureBtn(): void {
        let node = cc.instantiate(this.safePref);
        cc.director.getScene().addChild(node);
        node.name = "safe_pref";
    }

    safeCancelBtn(): void {
        //跳转到取款页面
        cv.MessageCenter.send("earn_open");
    }
}
