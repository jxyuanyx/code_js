// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../../lobby/cv";
import { ClubDataManager } from "../../../data/club/ClubDataMgr";
import GameDataManager from "./data/GameDataManager";
import BuyinExchange from "./BuyinExchange";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Buyin extends cc.Component {
    @property(cc.Node)
    coinBring: cc.Node = null;

    @property(cc.Node)
    usdtBring: cc.Node = null;

    tackBackPanel: cc.Node = null;
    chouMa_slider: cc.Node = null;
    takebackTips_img: cc.Node = null;
    _chouMa_txt: cc.Label = null;
    _min_txt: cc.Label = null;
    _max_txt: cc.Label = null;
    _rich_word_txt: cc.Label = null;
    _rich_txt: cc.Label = null;
    tackBackAmount_text: cc.Label = null;
    addsign_text: cc.Label = null;
    _buyinHgp: number = 100;
    _width: number;
    //最小带入
    _minSignScore: number = 200;
    //最大带入
    _maxSignScore: number = 800;

    _micro_clubId: number = 0;
    _micro_u32OwnerId: number = 0;
    _micro_clubName: string = "";

    progress: cc.Sprite = null;
    tabButton: cc.Node[] = [];
    tabNode: cc.Node[] = [];

    protected select_index: number = -1;
    color_lab_select: cc.Color = cc.color(208, 171, 110);
    color_lab_noSelect: cc.Color = cc.color(148, 149, 149);
    protected viewStyle: number = 0; //1=金币带入 2=usdt带入

    protected bringConfig: any = null; //带入配置

    private _firstTimeBuyin: boolean = true;

    onLoad() {
        let self = this.node;
        cc.find("background", this.node).on(cc.Node.EventType.TOUCH_START, function (event) {
            self.active = false;
        });
        this._firstTimeBuyin = true;
        this._width = cc.find("bring_node/chouMa_slider/Progress", this.coinBring).width;
        this.setViewStyle(1); //cv.GameDataManager.tRoomData.pkRoomParam.currencyType == 4? 2 : 1
        this.UpdateBuyinInfo();
        cv.resMgr.adaptWidget(this.node, true);

        cv.MessageCenter.register("update_info", this.updateCoinAndUSDT.bind(this), this.node);
        cv.MessageCenter.register("update_gold", this.updateCoinAndUSDT.bind(this), this.node);
    }
    onDestroy() {
        cv.MessageCenter.unregister("update_info", this.node);
        cv.MessageCenter.unregister("update_gold", this.node);
    }
    setViewStyle(style: number) {
        if ((style != 1 && style != 2) || style == this.viewStyle) {
            return;
        }
        this.viewStyle = style;
        //1=coin-style  2=usdt-style
        this.coinBring.active = style == 1? true : false;
        this.usdtBring.active = style == 2? true : false;
        let currentBring: cc.Node = this.currentBringNode();
        let bringNode: cc.Node = cc.find("bring_node", currentBring);
        let exchangeNode: cc.Node = cc.find("exchange_node", currentBring);
        this.tabButton[0] = cc.find("tab_icon/btn_0", currentBring);
        this.tabButton[1] = cc.find("tab_icon/btn_1", currentBring);
        this.tabNode[0] = bringNode;
        this.tabNode[1] = exchangeNode;
        this.tackBackPanel = cc.find("tackBackPanel", bringNode);
        this.takebackTips_img = cc.find("tackBackPanel/takebackTips_img", bringNode);
        this.chouMa_slider = cc.find("chouMa_slider", bringNode);
        this.progress = cc.find("chouMa_slider/Progress", bringNode).getComponent(cc.Sprite);
        this._chouMa_txt = cc.find("layout_gold/chouMa_text", bringNode).getComponent(cc.Label);
        this._min_txt = cc.find("min_text", bringNode).getComponent(cc.Label);
        this._max_txt = cc.find("max_text", bringNode).getComponent(cc.Label);
        this._rich_txt = cc.find("layout/rich_text", bringNode).getComponent(cc.Label);
        this._rich_word_txt = cc.find("layout/rich_word_text", bringNode).getComponent(cc.Label);

        this.tackBackAmount_text = cc.find("layout/tackBackAmount_text", this.tackBackPanel).getComponent(cc.Label);
        let tackBackQuestion_button = cc.find("tackBackQuestion_button", this.tackBackPanel);
        tackBackQuestion_button.on(cc.Node.EventType.TOUCH_START, (event: cc.Event): void => {
            this.takebackTips_img.active = true;
        }, this);
        tackBackQuestion_button.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            this.takebackTips_img.active = false;
        }, this);
        tackBackQuestion_button.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event): void => {
            this.takebackTips_img.active = false;
        }, this);

        this.addsign_text = cc.find("sureBuyInPanel_layout/addSign_text", bringNode).getComponent(cc.Label);
        cc.find("sureBuyInPanel_ok_button", bringNode).on('click', this.onSureBuyIn, this);

        if (style == 2) {
            //usdt language
            this.tabButton[0].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("GameScene_addSignPoker_panel_buyin_usdt_txt");
            this.tabButton[1].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("USDTView_exchange_usdt_label");
            cv.StringTools.setLabelString(bringNode, "layout/rich_word_text", "USDTView_usdt_balance_label");
            cv.StringTools.setLabelString(bringNode, "buyinDetail_txt", "GameScene_addSignPoker_panel_buyinDetail_usdt_txt");
            cv.StringTools.setLabelString(bringNode, "buyin_txt_2", "GameScene_addSignPoker_panel_buyin_usdt_txt");
            cv.StringTools.setLabelString(bringNode, "sureBuyInPanel_layout/totalBuyin_txt", "GameScene_addSignPoker_panel_sureBuyInPanel_totalBuyin_usdt_txt");
            cv.StringTools.setLabelString(bringNode, "sureBuyInPanel_ok_button/Label", "GameScene_addSignPoker_panel_sureBuyInPanel_ok_button");
            cv.StringTools.setLabelString(this.tackBackPanel, "layout/tackbackTitle_txt", "GameScene_addSignPoker_panel_tackbackTitle_usdt_txt");
            cv.StringTools.setLabelString(this.takebackTips_img, "item_0/tackbackTip0_txt", "GameScene_addSignPoker_panel_tackbackTip0_usdt_txt");
            cv.StringTools.setLabelString(this.takebackTips_img, "item_1/tackbackTip1_txt", "GameScene_addSignPoker_panel_tackbackTip1_usdt_txt");
            cv.StringTools.setLabelString(this.takebackTips_img, "item_2/tackbackTip2_txt", "GameScene_addSignPoker_panel_tackbackTip2_usdt_txt");
            cc.find("item_0", this.takebackTips_img).height = cc.find("item_0/tackbackTip0_txt", this.takebackTips_img).height;
            cc.find("item_1", this.takebackTips_img).height = cc.find("item_1/tackbackTip1_txt", this.takebackTips_img).height;
            cc.find("item_2", this.takebackTips_img).height = cc.find("item_2/tackbackTip2_txt", this.takebackTips_img).height;
        } else {
            //coin language
            this.tabButton[0].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("GameScene_addSignPoker_panel_buyin_txt");
            this.tabButton[1].getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("USDTView_exchange_coin_label");
            cv.StringTools.setLabelString(bringNode, "layout/rich_word_text", "GameScene_addSignPoker_panel_rich_word_text");
            cv.StringTools.setLabelString(bringNode, "buyinDetail_txt", "GameScene_addSignPoker_panel_buyinDetail_txt");
            cv.StringTools.setLabelString(bringNode, "buyin_txt_2", "GameScene_addSignPoker_panel_buyin_txt");
            cv.StringTools.setLabelString(bringNode, "sureBuyInPanel_layout/totalBuyin_txt", "GameScene_addSignPoker_panel_sureBuyInPanel_totalBuyin_txt");
            cv.StringTools.setLabelString(bringNode, "sureBuyInPanel_ok_button/Label", "GameScene_addSignPoker_panel_sureBuyInPanel_ok_button");
            cv.StringTools.setLabelString(this.tackBackPanel, "layout/tackbackTitle_txt", "GameScene_addSignPoker_panel_tackbackTitle_txt");
            cv.StringTools.setLabelString(this.takebackTips_img, "item_0/tackbackTip0_txt", "GameScene_addSignPoker_panel_tackbackTip0_txt");
            cv.StringTools.setLabelString(this.takebackTips_img, "item_1/tackbackTip1_txt", "GameScene_addSignPoker_panel_tackbackTip1_txt");
            cv.StringTools.setLabelString(this.takebackTips_img, "item_2/tackbackTip2_txt", "GameScene_addSignPoker_panel_tackbackTip2_txt");
            cc.find("item_0", this.takebackTips_img).height = cc.find("item_0/tackbackTip0_txt", this.takebackTips_img).height;
            cc.find("item_1", this.takebackTips_img).height = cc.find("item_1/tackbackTip1_txt", this.takebackTips_img).height;
            cc.find("item_2", this.takebackTips_img).height = cc.find("item_2/tackbackTip2_txt", this.takebackTips_img).height;
        }
    }
    currentBringNode(): cc.Node {
        return this.viewStyle == 2? this.usdtBring : this.coinBring;
    }
    updateCoinAndUSDT() {
        this._rich_txt.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(this.bringChips()));
    }

    /**
     * 现在的局都已经是把抽局，所有的撤回都是直接撤回到玩家账户。以前的局抽撤回还会保留在牌局里，现在没有局抽局了
     * 所以在带入的时候是否可以把对撤回的金额的一些判断都可以去掉了
     */
    onSureBuyIn() {
        cv.AudioMgr.playButtonSound('button_click');
        let chouMaValue: number = cv.StringTools.showStringToNumber(this._chouMa_txt.string);
        let defaultBringValue: number = this.getDefaultBring(this.defaultBringKey());
        if (this._firstTimeBuyin && typeof chouMaValue == 'number' && defaultBringValue != chouMaValue) {
            //记录当前选择的带入值
            this.setDefaultBring(this.defaultBringKey(), chouMaValue);
            this.saveDefaultBringConfig();
        }
        this._firstTimeBuyin = false;
        //当前拉动条用户拉到想要带入的数额
        let u32WantBuyin = cv.StringTools.serverGoldByClient(chouMaValue);
        //我在本房间的带入上限  初始为0  当前这个字段，已经没有用。服务器并没有赋值的地方，所以一直是0
        // let u32BuyinLimit = cv.GameDataManager.tRoomData.u32BuyinLimit;
        //我在本房间的总共已经带入过的金额 不是stake 初始为0
        let u32AreadyBuyin = cv.GameDataManager.tRoomData.u32Buyin;
        //自己的总共撤回的金额
        let u32AreadyBuyout = cv.dataHandler.getUserData().m_totalBuyOut;

        // console.log(cv.GameDataManager.tRoomData.clubInfos);
        // let len = cv.GameDataManager.tRoomData.clubInfos.length;
        var clubId = cv.GameDataManager.tRoomData.pkRoomParam.club_id;
        //当前身上的金币和usdt转化为以元为单位和美元为单位
        // let u32Chips = cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips);
        // let usdt = cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().usdt);
        //usdt桌带入筹码是usdt,兑换筹码是coin,金币桌相反
        let bringChipsNum: number = this.bringChips();
        let exchangeChipsNum: number = this.exchangeChips();
        let bringChipsClientNum: number = cv.StringTools.clientGoldByServer(bringChipsNum);
        let exchangeChipsClientNum: number = cv.StringTools.clientGoldByServer(exchangeChipsNum);
        let UIBuyTips: string = this.viewStyle == 2? "UIBuyTips_USDT" : "UIBuyTips";
        let UIBuyTipsUSDT: string = this.viewStyle == 2? "UIBuyTipsUSDT_USDT" : "UIBuyTipsUSDT";

        // 发送开始带入的消息, 用于游戏场景的数据采集
        cv.GameDataManager.tRoomData.curBuyInAmount = cv.StringTools.showStringToNumber(this._chouMa_txt.string);
        cv.MessageCenter.send("buyin_start");

        //带入控制功能开关 目前我们项目必定是开着的，所以下面的else是不会走的。
        // if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_buyin_control) {
            //当前想要带入的金额小于已撤回的金额    因为现在都是把抽局，撤回的金额是直接回到账户的。所以这个if是不会走的，应该是直接进入else的逻辑。

            //解释一下这里为什么可以注释掉。当想要带入的小于撤回的。因为现在都是直接撤回到账户，也就是说账户里的钱肯定是比当前带入的要多的。可以直接请求带入不需要考虑钱不够的情况
            // if (u32WantBuyin <= u32AreadyBuyout) {
            //     this.node.active = false;
            //     //如果撤回金币达到想要带入 特殊处理
            //     let curGameId = cv.roomManager.getCurrentGameID();
            //     if (curGameId != cv.Enum.GameId.Bet && (!cv.roomManager.checkGameIsZoom(curGameId)) && curGameId != cv.Enum.GameId.Allin) {
            //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.clientGoldByServer(u32WantBuyin) );
            //         //cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId
            //         return;
            //     }
            //     //按理来说想要带入的比已经撤回的要少，应该直接带入才对，为什么必下和急速还要走下面的逻辑(上面对必下和急速做了过滤)
            //     if (cv.StringTools.serverGoldByClient(u32Chips) >= u32WantBuyin) {
            //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string));
            //         //cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId
            //     }
            //     else if (u32Chips >= this._minSignScore) {
            //         this._micro_clubId = clubId;
            //         if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1) {
            //             let strChips = cv.StringTools.numberToString(u32Chips);
            //             let msg = cv.StringTools.formatC(cv.config.getStringData("UIBuyTips"), strChips);
            //             cv.TP.showMsg(msg, cv.Enum.ButtonStyle.TWO_BUTTON, this.microBuyin.bind(this), this.gotoShop);
            //             // cv.TP.recharge();
            //             cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
            //         }
            //         else {
            //             let intChips = parseInt(cv.StringTools.numberToShowString(u32Chips));
            //             let msg = cv.StringTools.formatC(cv.config.getStringData("UIBuyTips"), intChips);
            //             cv.TP.showMsg(msg, cv.Enum.ButtonStyle.TWO_BUTTON, this.Buyin.bind(this), this.gotoShop);
            //             // cv.TP.recharge();
            //             cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
            //         }
            //     }
            //     else {
            //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string) );
            //         //cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId
            //     }
            // }
            //想要带的金额小于可以带的限制金额   u32BuyinLimit没有用了，一直为0所以这里的逻辑不会走没有用了
            // else if (u32WantBuyin <= u32BuyinLimit - u32AreadyBuyin) {
            //     this.node.active = false;
            //     if (cv.dataHandler.getUserData().u32Chips >= u32WantBuyin) {//本身金币足够直接请求带入
            //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string), cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId);
            //     }
            //     else if (u32Chips >= this._minSignScore) {//金币不够但是大于一个最小买入
            //         this._micro_clubId = clubId;
            //         if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1) {
            //             cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIBuyTips"), cv.StringTools.numberToString(u32Chips)), cv.Enum.ButtonStyle.TWO_BUTTON, this.microBuyin.bind(this), this.gotoShop);
            //             // cv.TP.recharge();
            //             cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
            //         }
            //         else {
            //             cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIBuyTips"), parseInt(cv.StringTools.numberToShowString(u32Chips))), cv.Enum.ButtonStyle.TWO_BUTTON, this.Buyin.bind(this), this.gotoShop);
            //             // cv.TP.recharge();
            //             cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
            //         }
            //     }//一个小最买入都不够
            //     else {
            //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string), cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId);
            //     }
            // }
            //没有已撤回金额，正常带入
            // else {
                /**
                 * clubId在这里的赋值已没有意义，因为都会被clubInfos重新赋值
                 * int32 last_buyin_clubid = 14;
                    uint32 last_buyin_ownerid = 15;
                    last_buyin_allianceid
                    这些字段都没了意义
                 * */
                // if (cv.GameDataManager.tRoomData.last_buyin_allianceId === 0) {
                //     clubId = cv.GameDataManager.tRoomData.entry_clubid;//进入房间的时候记录下的id
                // }
                // else {
                //     clubId = cv.GameDataManager.tRoomData.last_buyin_clubid;
                // }
                // var u32OwnerId;
                // var selectId = -1;
                // var clubName;
                //只会传一个社区就是第一个加入的，如果没有就是传官方的，所以这里的逻辑也不会走,len只会 == 1
                // if (len > 1) {
                //     for (let i = 0; i < len; i++) {
                //         if (cv.GameDataManager.tRoomData.clubInfos[i].club_id === clubId) {
                //             selectId = i;
                //             break;
                //         }
                //     }
                // }//只会走这里的逻辑
                // else {
                    // if (cv.GameDataManager.tRoomData.clubInfos.length > 0) {
                    //     u32OwnerId = cv.GameDataManager.tRoomData.clubInfos[0].creater_id;
                    //     clubId = cv.GameDataManager.tRoomData.clubInfos[0].club_id;
                    //     clubName = cv.GameDataManager.tRoomData.clubInfos[0].club_name;
                    //     if (clubId === cv.GameDataManager.tRoomData.pkRoomParam.club_id) {
                    //         u32OwnerId = cv.GameDataManager.tRoomData.u32OwnerId;
                    //     }
                    // }
                    // else //clubInfos一定有值这里也不会走
                    // {

                    // }

                    this.node.active = false;
                    if (bringChipsNum >= u32WantBuyin) {
                        cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string));//u32OwnerId, clubId, clubName
                    }
                    else if (bringChipsClientNum > this._minSignScore) {
                        this._micro_clubId = clubId;
                        // this._micro_u32OwnerId = u32OwnerId;
                        // this._micro_clubName = clubName;
                        let msg = "";
                        //微局
                        if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1) {
                            //有usdt的提示
                            if(exchangeChipsNum > 0){
                                msg = cv.StringTools.formatC(cv.config.getStringData(UIBuyTipsUSDT), cv.StringTools.numberToShowNumber(bringChipsClientNum),exchangeChipsClientNum);
                            }else{
                                msg = cv.StringTools.formatC(cv.config.getStringData(UIBuyTips), cv.StringTools.numberToShowNumber(bringChipsClientNum));
                            }
                            cv.TP.showMsg(msg, cv.Enum.ButtonStyle.TWO_BUTTON, this.microBuyin.bind(this), this.gotoShop.bind(this));
                            // cv.TP.recharge();
                            cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
                        }
                        //非微局
                        else {
                            if(exchangeChipsNum > 0){
                                msg = cv.StringTools.formatC(cv.config.getStringData(UIBuyTipsUSDT), parseInt(cv.StringTools.numberToShowString(bringChipsClientNum)),exchangeChipsClientNum);
                            }else{
                                msg = cv.StringTools.formatC(cv.config.getStringData(UIBuyTips), parseInt(cv.StringTools.numberToShowString(bringChipsClientNum)));
                            }
                            cv.TP.showMsg(msg, cv.Enum.ButtonStyle.TWO_BUTTON, this.Buyin.bind(this), this.gotoShop.bind(this));
                            // cv.TP.recharge();
                            cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
                        }

                        // 发送本地带入失败的消息, 用于游戏场景的数据采集
                        cv.MessageCenter.send("buyin_failed_by_local", msg);
                    }
                    else {

                        cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string));// u32OwnerId, clubId, clubName
                    }
                // }
            // }
        // }

        //因为我们现在都是自己带入不需要审批的所以这里的逻辑根本不会走
        // else {

        //     if (u32WantBuyin <= u32AreadyBuyout) {
        //         let curGameId = cv.roomManager.getCurrentGameID();
        //         if (curGameId != cv.Enum.GameId.Bet && (!cv.roomManager.checkGameIsZoom(curGameId)) && curGameId != cv.Enum.GameId.Allin) {
        //             cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.clientGoldByServer(u32WantBuyin), cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId);
        //             return;
        //         }
        //     }

        //     this.node.active = false;
        //     if (u32Chips > cv.StringTools.showStringToNumber(this._chouMa_txt.string)) {
        //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string), cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId);
        //     }
        //     else if (u32Chips > this._minSignScore) {
        //         this._micro_clubId = clubId;
        //         if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1) {
        //             cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIBuyTips"), cv.StringTools.numToFloatString(cv.dataHandler.getUserData().u32Chips)), true, this.microBuyin, this.gotoShop);
        //             // cv.TP.recharge();
        //             cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
        //         }
        //         else {
        //             cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData("UIBuyTips"), parseInt(cv.StringTools.numberToShowString(u32Chips))), true, this.Buyin, this.gotoShop);
        //             // cv.TP.recharge();
        //             cv.TP.setButtonText(cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS);
        //         }
        //     }
        //     else {
        //         cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.showStringToNumber(this._chouMa_txt.string), cv.GameDataManager.tRoomData.u32OwnerId, clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId);
        //     }
        // }
    }

    public Buyin() {
        let roomId = cv.GameDataManager.tRoomData.u32RoomId;
        let amount = 0;
        let bringChipsNum: number = this.bringChips();
        let exchangeChipsNum: number = this.exchangeChips();
        if(exchangeChipsNum > 0){
            amount = cv.StringTools.showStringToNumber(this._chouMa_txt.string);
        }else{
            amount = parseInt(cv.StringTools.clientGoldByServer(bringChipsNum).toString());
        }
        // let ownerid = cv.GameDataManager.tRoomData.u32OwnerId;
        // let allianceId = cv.GameDataManager.tRoomData.last_buyin_allianceId;
        cv.gameNet.RequestBuyin(roomId, amount);//ownerid, this._micro_clubId, allianceId
    }

    public microBuyin() {
        let amount = 0;
        let bringChipsNum: number = this.bringChips();
        let exchangeChipsNum: number = this.exchangeChips();
        if(exchangeChipsNum > 0){
            amount = cv.StringTools.showStringToNumber(this._chouMa_txt.string);
        }else{
            amount = cv.StringTools.clientGoldByServer(bringChipsNum);
        }
        cv.gameNet.RequestBuyin(cv.GameDataManager.tRoomData.u32RoomId, amount );
        //cv.GameDataManager.tRoomData.u32OwnerId, this._micro_clubId, cv.GameDataManager.tRoomData.last_buyin_allianceId
    }

    // public microLimitBuyin() {
    //     cv.gameNet.RequestModifyBuyinLimit(cv.GameDataManager.tRoomData.u32RoomId, cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips), this._micro_u32OwnerId, this._micro_clubId, this._micro_clubName);
    // }

    // public LimitBuyin() {
    //     cv.gameNet.RequestModifyBuyinLimit(cv.GameDataManager.tRoomData.u32RoomId, parseInt(cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips).toString()), this._micro_u32OwnerId, this._micro_clubId, this._micro_clubName);
    // }

    public gotoShop() {
        cv.worldNet.requestGetUserData();
        cv.SHOP.RechargeClick();
    }

    UpdateBuyinInfo() {
        this.setViewStyle(1); //cv.GameDataManager.tRoomData.pkRoomParam.currencyType == 4? 2 : 1
        this.updateCoinAndUSDT();
        cv.resMgr.getLabelStringSize(this._rich_txt);
        var blindNum;
        var minSignNum;
        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == 1)//cv.GameDataManager.tRoomData.pkRoomParam.game_mode == 1)
        {
            blindNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum;
            minSignNum = cv.config.getStringData("UIBuyInScore" + (blindNum - 1));
            this._rich_txt.node.active = true;
            this._rich_word_txt.node.active = true;
        }
        else if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == 3) {
            blindNum = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount);
            minSignNum = blindNum * 100;

            this._rich_txt.node.active = true;
            this._rich_word_txt.node.active = true;
        }

        // let width = cc.winSize.width;
        // let x1 = (width - this._rich_txt.node.getContentSize().width - this._rich_word_txt.node.getContentSize().width)/2;
        // this._rich_word_txt.node.setPosition(cc.v2(x1 - width/2, this._rich_word_txt.node.getPosition().y));
        // this._rich_txt.node.setPosition(cc.v2(x1 - width/2 + this._rich_word_txt.node.getContentSize().width + 10, this._rich_txt.node.getPosition().y));

        let minNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_buyin_min_enum;//最小代入倍数
        let foldNum = 0;
        if (cv.GameDataManager.tRoomData.isZoom()) {
            foldNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_buyin_fold == 2000000 ? 1000 : cv.GameDataManager.tRoomData.pkRoomParam.rule_buyin_fold;
        } else {
            foldNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_buyin_fold == 20000 ? 1000 : cv.GameDataManager.tRoomData.pkRoomParam.rule_buyin_fold;
        }


        console.log(minNum);
        console.log(foldNum);

        this._buyinHgp = minSignNum / 2;//小盲注100倍
        this._minSignScore = minSignNum * minNum / 100;
        this._maxSignScore = minSignNum * foldNum / 100;

        this._min_txt.string = cv.StringTools.numberToShowString(this._minSignScore);
        this._max_txt.string = cv.StringTools.numberToShowString(this._maxSignScore);
        this.addsign_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.u32Buyin));

        // let x2 = (this._background.node.getContentSize().width - cv.resMgr.getLabelStringSize(this.addsign_text).width -  cv.resMgr.getLabelStringSize(this.totalbuyin_txt).width - 10)/2;
        // this.totalbuyin_txt.node.setPosition(cc.v2(x2 - width/2, this.totalbuyin_txt.node.getPosition().y));
        // this.addsign_text.node.setPosition(cc.v2(x2 - width/2 + this.totalbuyin_txt.node.getContentSize().width + 10, this.addsign_text.node.getPosition().y));

        // this.alliance_buyin_panel.active = false;
        // this.addbg.setContentSize(this.addbg.getContentSize().width, 690);

        let isopenRecall = GameDataManager.tRoomData.pkRoomParam.is_opened_drawback;
        this.tackBackPanel.active = isopenRecall;
        if (isopenRecall) {
            // this.addbg.setContentSize(this.addbg.getContentSize().width, this.addbg.getContentSize().height + 20 + this.tackBackPanel.getContentSize().height);
            // this.tackBackPanel.position.y = 330; //this.sureBuyInPanel.getPosition().y - this.tackBackPanel.getContentSize().height;
            this.tackBackAmount_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().m_totalBuyOut));
        }
        let tabNodeHeight: number = isopenRecall? 1060 : 940;
        this.tabNode[0].height = tabNodeHeight;
        cc.find("bg_body", this.tabNode[0]).height = tabNodeHeight - 60;
        cc.find("sureBuyInPanel_ok_button", this.tabNode[0]).y = -tabNodeHeight;

        let slider = this.chouMa_slider.getComponent(cc.Slider);
        if (slider == null || this.progress == null) {
            return;
        }

        let self = this;
        // this._width = 768;//this.progress.node.width;
        this.readDefaultBringConfig();
        let defaultBringValue: number = this.getDefaultBring(this.defaultBringKey());
        let signScoreInterval: number = this._maxSignScore - this._minSignScore;
        let wantBringVaule: number = this._minSignScore;
        let wantBringProgress: number = 0;
        if (signScoreInterval > 0 && defaultBringValue > 0) {
            wantBringVaule = defaultBringValue <= this._minSignScore ? this._minSignScore : (defaultBringValue >= this._maxSignScore ? this._maxSignScore : defaultBringValue);
            wantBringProgress = (wantBringVaule - this._minSignScore) / signScoreInterval;
        }
        console.log("wantBringVaule=" + wantBringVaule + ", wantBringProgress=" + wantBringProgress);
        slider.progress = wantBringProgress;
        this.progress.node.width = this._width * slider.progress;
        self._chouMa_txt.string = cv.StringTools.numberToShowString(wantBringVaule);

        slider.node.on('slide', function (event) {
            let nowScore = 0;
            if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                //self._chouMa_txt.string = (slider.progress > 0.5 ? self._maxSignScore : self._minSignScore).toString();
                nowScore = (slider.progress >= 0.5 ? self._maxSignScore : self._minSignScore);

                // if(cv.dataHandler.getUserData().u32Chips < nowScore*100){
                //     if(percent >= 50){
                //         nowScore = cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips);
                //         if(percent != 50){
                //             slider.progress =  0.5;
                //         }
                //     }else{
                //         slider.progress = 0;
                //     }
                // }
            }
            else {
                //let totalNum = (self._maxSignScore - self._minSignScore) / (self._minSignScore * 0.5);
                //nowScore = self._minSignScore + self._minSignScore * 0.5 * Math.floor(slider.progress * totalNum);
                let hgp = (self._maxSignScore - self._minSignScore) / self._buyinHgp + 1;
                let index = parseInt((slider.progress * hgp).toString());

                nowScore = self._minSignScore + index * self._buyinHgp;

                //滑动最右边特殊处理
                if (slider.progress == 1) {
                    nowScore = self._maxSignScore;
                }
                // let totalNum = (self._maxSignScore - self._minSignScore) / (self._minSignScore * 0.5);
                // self._chouMa_txt.string = (self._minSignScore + self._minSignScore * 0.5 * Math.floor(slider.progress * totalNum)).toString();

                // if(cv.dataHandler.getUserData().u32Chips < nowScore*100){
                //     if(cv.dataHandler.getUserData().u32Chips < self._minSignScore*100)
                //     {   
                //         nowScore = self._minSignScore;
                //         slider.progress = 0;
                //     }else{
                //         nowScore = cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips);
                //         let maxIndex = (cv.StringTools.clientGoldByServer(cv.dataHandler.getUserData().u32Chips) - self._maxSignScore)/this._buyinHgp + 1;
                //         let maxPrecent = maxIndex/hgp; 

                //         if(slider.progress != maxPrecent){
                //             slider.progress = maxPrecent;
                //         }

                //     }
                // }
            }

            self._chouMa_txt.string = cv.StringTools.numberToString(nowScore);

            self.progress.node.width = slider.progress * self._width;
        }, this);

        this.switchTab(0);
    }
    // update (dt) {}

    //usdt桌带入筹码是usdt,兑换筹码是coin,金币桌相反
    bringChips(): number {
        return this.viewStyle == 2? cv.dataHandler.getUserData().usdt : cv.dataHandler.getUserData().u32Chips;
    }
    exchangeChips(): number {
        return this.viewStyle == 2? cv.dataHandler.getUserData().u32Chips : cv.dataHandler.getUserData().usdt;
    }
    //分页部分
    onTabOne() {
        cv.AudioMgr.playButtonSound('button_click');
        this.switchTab(0);
    }
    onTabTwo() {
        cv.AudioMgr.playButtonSound('button_click');
        this.switchTab(1);
    }
    switchTab(index: number) {
        if ((index != 0 && index != 1) || this.select_index == index) {
            return;
        }
        this.select_index = index;
        this.setBtnState(0, index == 0);
        this.setBtnState(1, index == 1);
        this.tabNode[0].active = index == 0;
        this.tabNode[1].active = index == 1;
        if (index == 1) {
            this.node.getComponent(BuyinExchange).switchTab(this.viewStyle == 2? 1 : 0);
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

    //读取默认带入配置
    readDefaultBringConfig(): void {
        let str: string = cc.sys.localStorage.getItem(cv.dataHandler.getUserData().u32Uid + "_bring");
        this.bringConfig = null;
        try {
            this.bringConfig = JSON.parse(str);
        } catch (e) {
            console.log(e);
        }
        if (!(this.bringConfig instanceof Object)) {
            this.bringConfig = {};
        }
    }
    //保存默认带入配置
    saveDefaultBringConfig(): void {
        if (this.bringConfig) {
            let str: string = JSON.stringify(this.bringConfig);
            if (str) {
                cc.sys.localStorage.setItem(cv.dataHandler.getUserData().u32Uid + "_bring", str);
            }
        }
    }
    defaultBringKey(): string {
        let blinds: string = "";
        let blindNum: number = 0;
        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            blindNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum ? cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum : blindNum;
            blinds = cv.config.getblindString(blindNum - 1);
        } else if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            blindNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount ? cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount : blindNum;
            blinds = cv.StringTools.numberToShowString(cv.StringTools.clientGoldByServer(blindNum));
        }
        //gameid+级别+带入类别
        console.log(cv.roomManager.getCurrentGameID() + "_" + blinds + "_" + this.viewStyle);
        return cv.roomManager.getCurrentGameID() + "_" + blinds + "_" + this.viewStyle;
    }
    //设置默认带入
    setDefaultBring(key: string, val: number): void {
        if (this.bringConfig) {
            this.bringConfig[key] = val; //client value, not server value
        }
    }
    //获取默认带入
    getDefaultBring(key: string): number {
        if (this.bringConfig && typeof this.bringConfig[key] == 'number') {
            return this.bringConfig[key];
        } else {
            return 0;
        }
    }
}
