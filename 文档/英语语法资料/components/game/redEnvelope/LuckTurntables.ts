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
import {GoldViewNewHall} from "../../game/dzPoker/GoldViewNewHall";
import { SCENE } from "../../../common/tools/Enum";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LuckTurntables extends cc.Component {
    @property(cc.Node) luckTurntables_panel: cc.Node = null;
    @property(cc.Sprite) bg_mage: cc.Sprite = null;
    @property(cc.Sprite) min_bg_mage: cc.Sprite = null;
    @property(cc.Sprite) choose_image: cc.Sprite = null;
    @property(cc.Sprite) min_choose_image: cc.Sprite = null;
    @property(cc.Sprite) deng_0: cc.Sprite = null;
    @property(cc.Sprite) deng_1: cc.Sprite = null;
    @property(cc.Sprite) min_deng_0: cc.Sprite = null;
    @property(cc.Button) start_button: cc.Button = null;
    @property(cc.Button) close_button: cc.Button = null;
    @property(cc.Node) start_panel: cc.Node = null;
    @property(cc.Node) mask_panel: cc.Node = null;
    @property(cc.Label) des_text: cc.Label = null;
    @property(cc.Prefab) result_Prefab: cc.Prefab = null;
    result_panel: cc.Node = null;
    result_gold_icon: cc.Sprite = null;
    result_gold_panel: cc.Node = null;
    result_iphone_panel: cc.Node = null;
    result_ticket_panel: cc.Node = null;
    result_ticket_en_panel: cc.Node = null;
    result_number: cc.Label = null;
    // @property(cc.Node) result_effect_panel: cc.Node = null;
    // @property(cc.Sprite) light_image: cc.Sprite = null;
    // @property(cc.Sprite) stars_image: cc.Sprite = null;

    @property(cc.Node) gold_effect_panel: cc.Node = null;
    @property(cc.Sprite) gold_image_list: cc.Sprite[] = [];
    @property(cc.Node) gold_Panel: cc.Node = null;

    @property(cc.Prefab) light_Prefab: cc.Prefab = null;
    @property(cc.Prefab) LuckEff_Prefab: cc.Prefab = null;
    @property(cc.Prefab) Golb_Prefab: cc.Prefab = null;

    public gold_image_pos: cc.Vec2[] = []
    public num_list: cc.Label[] = [];
    public icon_list: cc.Node[] = [];
    public isRun: boolean = false;
    public isRunGold: boolean = false;
    public info = null;
    public start_id = 0;
    public result_id = 0;
    public isMovePosInit: boolean = false;
    public index: number = 0;
    public show_action: boolean = false;
    public worldMovePos: cc.Vec2 = null;
    public luckSpin: cc.Node = null;
    public luckEff: cc.Node = null;
    public goldView: cc.Node = null;
    public labaAni: cc.Animation = null;
    public luckEffAni: cc.Animation = null;
    public luckSpinAni: cc.Animation = null;

    result_ticket_namepos: cc.Vec2 = cc.v2(0, 0);
    result_ticket_en_namepos: cc.Vec2 = cc.v2(0, 0);

    onLoad() {
        cv.MessageCenter.register("LuckTurntableResult", this.onLuckTurntableResult.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);

        this.labaAni = this.node.getComponent(cc.Animation);
        // this.labaAni.play();
        this.labaAni.on('finished', this.runAnimation, this);

        this.luckSpin = cc.instantiate(this.light_Prefab);
        this.node.addChild(this.luckSpin);
        this.luckSpinAni = this.luckSpin.getComponent(cc.Animation);

        this.luckEff = cc.instantiate(this.LuckEff_Prefab);
        this.node.addChild(this.luckEff);
        this.luckEffAni = this.luckEff.getComponent(cc.Animation);
        this.luckEff.active = false;

        this.result_panel = cc.instantiate(this.result_Prefab);
        this.node.addChild(this.result_panel);
        this.result_panel.active = false;
        this.result_gold_panel = cc.find("gold_panel", this.result_panel);
        this.result_iphone_panel = cc.find("iphone_panel", this.result_panel);
        this.result_ticket_panel = cc.find("ticket_panel", this.result_panel);
        this.result_ticket_en_panel = cc.find("ticket_en_panel", this.result_panel);
        this.result_number = cc.find("number", this.result_gold_panel).getComponent(cc.Label);
        this.result_gold_icon = cc.find("gold_icon", this.result_gold_panel).getComponent(cc.Sprite);
        this.result_iphone_panel.active = false;
        this.result_ticket_panel.active = false;
        this.result_ticket_en_panel.active = false;
        this.result_gold_panel.active = false;

        let goldView = cc.instantiate(this.Golb_Prefab);
        this.gold_Panel.addChild(goldView);
        goldView.name = "goldView";
        this.gold_Panel.active = false;
        for (let i = 0; i < this.gold_image_list.length; i++) {
            this.gold_image_pos[i] = this.gold_image_list[i].node.getPosition();
        }

        this.num_list = [];
        for (let i = 0; i < 12; i++) {
            let cell = this.bg_mage.node.getChildByName(`cell_${i}`);
            let numText: cc.Label = cell.getChildByName("number").getComponent(cc.Label);
            this.num_list.push(numText);
            this.icon_list.push(cell.getChildByName("icon"));
        }
        
        this.result_ticket_namepos = cc.find("name_img",this.result_ticket_panel).getPosition();
        this.result_ticket_en_namepos = cc.find("name_img",this.result_ticket_en_panel).getPosition();

        // cv.resMgr.setSpriteFrame(cc.find("Image_33",this.luckTurntables_panel),cv.config.getLanguagePath("hall/RedPackets/LuckTurntables_1"));
        // cv.resMgr.setSpriteFrame(cc.find("bg_image", this.result_panel), cv.config.getLanguagePath("hall/RedPackets/jieguozhansd"));
        this.des_text.string = cv.config.getStringData("LuckTurntables_des_text");
        cv.resMgr.adaptWidget(this.node);
        cv.resMgr.adaptWidget(this.result_gold_icon.node);
        cv.resMgr.adaptWidget(this.result_number.node);
        this.gold_effect_panel.setPosition(this.luckTurntables_panel.getPosition());
        this.initLanguage();
    }
    onDestroy() {
        cv.MessageCenter.unregister("LuckTurntableResult", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    start() {
        this.luckSpinAni.play();
        // let ani = this.luckSpinAni.play("LuckTurntablesSpin", 0);
        // ani.wrapMode = cc.WrapMode.Loop;
    }

    initLanguage() {
        let text_reward = this.luckTurntables_panel.getChildByName("text_reward");
        cv.resMgr.setSpriteFrame(text_reward, cv.config.getLanguagePath("hall/RedPackets/text_reward"));
        let result_tex = cc.find("effects_panel/result_tex",this.result_panel);
        cv.resMgr.setSpriteFrame(result_tex, cv.config.getLanguagePath("hall/RedPackets/result_tex")); 
        this.result_iphone_panel = cc.find("iphone_panel", this.result_panel);
        this.result_ticket_panel = cc.find("ticket_panel", this.result_panel);
        this.result_ticket_en_panel = cc.find("ticket_en_panel", this.result_panel);

        cv.StringTools.setLabelString(this.result_iphone_panel, "des", "LuckTurntables_result_iphone_panel_des");
        cv.StringTools.setLabelString(this.result_ticket_panel, "des", "LuckTurntables_result_ticket_panel_des");
        cv.StringTools.setLabelString(this.result_ticket_en_panel, "des", "LuckTurntables_result_ticket_panel_des");
        if(cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cc.find("des",this.result_iphone_panel).getComponent(cc.Label).fontSize = 36;
        } else {
            cc.find("des",this.result_iphone_panel).getComponent(cc.Label).fontSize = 26;
        }

        let paths:string[] = [];
        for (let i = 0; i < 3; i++) {
            paths.push(cv.config.getLanguagePath("hall/RedPackets/spinbutton_normal"));
        }
        paths.push(cv.config.getLanguagePath("hall/RedPackets/spinbutton_disable"));
        cv.resMgr.setButtonFrame(this.start_button.node, paths[0], paths[1], paths[2], paths[3]);
    }

    public updateView() {
        this.gold_Panel.active = false;
        this.choose_image.node.active = false;
        this.min_choose_image.node.active = false;
        this.luckTurntables_panel.active = true;
        this.close_button.node.active = true;
        this.result_panel.getComponent(cc.Animation).stop();
        this.result_panel.active = false;
        this.gold_effect_panel.active = false;
        if (cv.dataHandler.getUserData().luckTurntables.length <= 0) {
            this.closeView();
            return;
        }
        this.bg_mage.node.angle = 0;
        this.min_bg_mage.node.angle = 0;
        this.setNumList();
        // this.labaAni.play("animation1");
        this.luckSpin.active = true;
        this.start_button.interactable = true;
        this.luckSpinAni.play();
        this.close_button.node.active = true;
    }


    public animation2() {
        cv.AudioMgr.playEffect("zh_CN/hall/laba/audio/luck_result");
        // this.labaAni.play("animation1");
        let blink = cc.blink(2, 3);
        let callBack = cc.callFunc(this.showResult, this);
        this.choose_image.node.active = true;
        this.choose_image.node.runAction(cc.sequence(blink, callBack));

        let blink2 = cc.blink(2, 3);
        this.min_choose_image.node.active = true;
        this.min_choose_image.node.runAction(blink2);

        this.luckEff.active = true;
        this.luckEffAni.play("LuckTurntableEff", 0);

        this.luckSpin.active = true;
        this.luckSpinAni.play();
    }

    public runAnimation() {
        if (!this.isRun) {
            return;
        }
        this.isRun = false;
        this.isRunGold = false;
        let angle = this.info.amount_index * 30;
        let callBack = cc.callFunc(this.animation2, this);
        let rotat = cc.rotateBy(3, 360 * 2 + angle);
        rotat.easing(cc.easeSineOut());
        this.bg_mage.node.runAction(cc.sequence(rotat, callBack));

        let angles = [180, 90, 0, 270];
        let angle2 = angles[this.info.currency_type];
        let rotat2 = cc.rotateBy(3, 360 * 2 + angle2);
        rotat2.easing(cc.easeSineOut());
        this.min_bg_mage.node.runAction(rotat2);

        this.labaAni.play("lightRun");
        // let callBack1 = cc.callFunc(function () {
        //     this.deng_0.node.active = true;
        //     this.deng_1.node.active = false;
        // }, this)
        // let callBack2 = cc.callFunc(function () {
        //     this.deng_0.node.active = false;
        //     this.deng_1.node.active = true;
        // }, this)
        // let delaytime1 = cc.delayTime(0.15);
        // let delaytime2 = cc.delayTime(0.15);
        // let repeat1 = cc.repeat(cc.sequence(callBack1, delaytime1, callBack2, delaytime2), 5);
        // repeat1.easing(cc.easeSineOut())
        // this.node.runAction(repeat1);
    }
    public resultCall1() {
        // this.index++;
        // if (this.index > 9) {
        //     this.index = 1;
        // }
        // cv.resMgr.setSpriteFrame(this.stars_image.node, "zh_CN/hall/laba_stars/laba_stars_" + this.index);
    }
    public resultCall2() {
        if (this.isRunGold) {
            if (this.info.award_type > 0) {
                this.hideResult();
                this.updataResult();
                let currency_type = this.info.currency_type;
                let strKey = this.info.award_type == 1 ? "LuckTurntables_tips_text_%d": "LuckTurntables_tips_text_help_%d";
                if(currency_type < 3) {
                    let name = cv.StringTools.formatC(strKey, this.info.currency_type);
                    let str = cv.StringTools.formatC(cv.config.getStringData(name), cv.StringTools.serverGoldToShowString(this.info.amount_list[this.info.amount_index].amount));
                    cv.TP.showMsg(str, cv.Enum.ButtonStyle.GOLD_BUTTON, this.showNext.bind(this));
                } else {
                    if(this.info.amount_list[this.info.amount_index].goods_id != 2) {
                        this.showNext();
                    } else {
                        let strArr = this.info.goods_desc.split("#");
                        let indx = this.getLanguageIndx()
                        if (strArr.length < indx + 1){
                            indx = strArr.length >= 2 ? 1 : 0;
                        }
                        let name = cv.StringTools.formatC(strKey, this.info.currency_type);
                        let str = cv.StringTools.formatC(cv.config.getStringData(name), strArr[indx]);
                        cv.TP.showMsg(str, cv.Enum.ButtonStyle.GOLD_BUTTON, this.showNext.bind(this));
                    }
                }
            }
            else {
                let currency_type = this.info.currency_type;
                if(currency_type < 3) {
                    this.showGoldAnimation();
                }else
                {
                    this.updataResult();
                    this.showNext();
                }
            }
        }
        else {
            this.isRunGold = true;
        }
    }
    public showResult() {
        let currency_type = this.info.currency_type;
        if (!this.isMovePosInit && currency_type < 3) {
            this.initMovePos();
        }
        this.luckSpinAni.stop();
        this.luckSpin.active = false;
        this.labaAni.stop();
        this.deng_0.node.opacity = 0;
        this.deng_1.node.opacity = 0;
        this.min_deng_0.node.opacity = 0;
        this.luckTurntables_panel.active = false;
        this.close_button.node.active = false;
        this.result_panel.active = true;
        this.result_panel.getComponent(cc.Animation).play();
        this.gold_effect_panel.active = false;
        this.result_panel.setScale(0);
        this.index = 1;
        // let delaytime = cc.delayTime(2.5 / 15);
        // let pkCall = cc.callFunc(this.resultCall1, this);
        // let repeat = cc.repeatForever(cc.sequence(delaytime, pkCall));
        // this.stars_image.node.runAction(repeat);

        // let rotateby = cc.rotateBy(1.5, 180);
        // let repeatforeverAction = cc.repeatForever(rotateby);
        // this.light_image.node.runAction(repeatforeverAction);

        let scaleTo = cc.scaleTo(1, 1);
        let elasticOut = scaleTo.easing(cc.easeElasticOut(1));
        let delaytime1 = cc.delayTime(1.2);
        let pkCall1 = cc.callFunc(this.resultCall2, this);
        let delaytime2 = cc.delayTime(10);
        let pkCall2 = cc.callFunc(function () {
            this.updataResult();
            this.showNext();
            cv.TT.showMsg("ServerErrorCode210", cv.Enum.ToastType.ToastTypeError);
        });
        this.result_panel.runAction(cc.sequence(elasticOut, delaytime1, pkCall1, delaytime2, pkCall2));
        cv.worldNet.RequestLuckTurntableResult(this.info.record_id);
    }
    public getGoldPos() {
        let offy = 0
        if (cv.config.IS_FULLSCREEN) {
            offy = cv.config.FULLSCREEN_OFFSETY;
        }
        let type = this.info.currency_type;
        let goldView = this.gold_Panel.getChildByName("goldView");
        let icon = null;
        if(type == 2) {
            icon = goldView.getComponent(GoldViewNewHall).getUstdIcon();
        } else  {
            icon = goldView.getComponent(GoldViewNewHall).getGoldIcon();
        }
        let pos = icon.getPosition();
        this.worldMovePos = icon.getParent().convertToWorldSpaceAR(pos);
    }
    public initMovePos() {
        this.gold_Panel.setPosition(0, 0);
        let offy = 0
        if (cv.config.IS_FULLSCREEN) {
            offy = cv.config.FULLSCREEN_OFFSETY;
        }
        let pos = this.gold_Panel.convertToNodeSpaceAR(cc.v2(10, cc.winSize.height - 25 - offy));
        let goldSize = this.gold_Panel.getContentSize();
        let move_pos = cc.v2(pos.x, pos.y - goldSize.height);
        this.gold_Panel.setPosition(cc.v2(pos.x - goldSize.width, move_pos.y));
        this.gold_Panel.active = true;
        let move = cc.moveTo(0.5, move_pos);
        let callback = cc.callFunc(this.getGoldPos, this);
        this.gold_Panel.runAction(cc.sequence(move, callback));
    }

    public updataResult() {
        this.result_panel.stopAllActions();
        for (let i = 0; i < cv.dataHandler.getUserData().luckTurntables.length; i++) {
            if (cv.dataHandler.getUserData().luckTurntables[i].record_id == this.info.record_id) {
                cv.dataHandler.getUserData().luckTurntables.splice(i, 1);
                break;
            }
        }
        if (cv.dataHandler.getUserData().luckTurntables.length == 0) {
            cv.MessageCenter.send("updataLuckTurntablesButton");
        }

        cv.worldNet.requestGetUserData();
    }

    public showNext() {
        if (cv.dataHandler.getUserData().luckTurntables.length > 0) {
            if (this.show_action) {
                this.show_action = false;
                this.updateView();
            }
        }
        else {
            this.closeView();
        }
    }

    public closeView() {
        this.node.stopAllActions();
        this.bg_mage.node.angle = 0;
        this.min_bg_mage.node.angle = 0;
        cv.AudioMgr.stop(this.start_id);
        cv.AudioMgr.stop(this.result_id);
        this.labaAni.stop();
        this.deng_0.node.opacity = 0;
        this.deng_1.node.opacity = 0;
        this.min_deng_0.node.opacity = 0;
        this.luckSpinAni.stop();
        this.luckSpin.active = false;
        this.node.active = false;
        cv.MessageCenter.send("LuckTurntables_isView", false);
    }

    public setGoldMovePos(worldPos: cc.Vec2) {
        this.worldMovePos = worldPos;
        this.isMovePosInit = true;
    }
    public onButtonStart() {
        this.isRun = true;
        this.luckSpinAni.stop();
        this.luckSpin.active = false;
        this.start_button.interactable = false;
        this.labaAni.play("LuckTurntables");

        cv.AudioMgr.playEffect("zh_CN/hall/laba/audio/luck_start");
        this.show_action = true;
        this.close_button.node.active = false;
    }
    public onLuckTurntableResult(pSender: string) {
        let type = pSender;
        if (type == "1") {
            if (this.isRunGold) {
                if (this.info.award_type > 0) {
                    this.hideResult();
                    this.updataResult();
                    let currency_type = this.info.currency_type;
                    let strKey = this.info.award_type == 1 ? "LuckTurntables_tips_text_%d": "LuckTurntables_tips_text_help_%d";
                    if(currency_type < 3) {
                        let str = cv.StringTools.formatC(strKey, currency_type);
                        cv.TP.showMsg(cv.StringTools.formatC(cv.config.getStringData(str), cv.StringTools.serverGoldToShowString(this.info.amount_list[this.info.amount_index()].amount)), cv.Enum.ButtonStyle.GOLD_BUTTON, this.showNext.bind(this));
                    } else {
                        if(this.info.amount_list[this.info.amount_index].goods_id != 2) {
                            this.showNext();
                        } else {
                            let strArr = this.info.goods_desc.split("#");
                            let indx = this.getLanguageIndx()
                            if (strArr.length < indx + 1){
                                indx = strArr.length >= 2 ? 1 : 0;
                            }
                            let name = cv.StringTools.formatC(strKey, this.info.currency_type);
                            let str = cv.StringTools.formatC(cv.config.getStringData(name), strArr[indx]);
                            cv.TP.showMsg(str, cv.Enum.ButtonStyle.GOLD_BUTTON, this.showNext.bind(this));
                        }
                    }
                }
                else {
                    let currency_type = this.info.currency_type;
                    if(currency_type < 3) {
                        this.showGoldAnimation();
                    }else
                    {
                        this.updataResult();
                        this.showNext();
                    }
                }
            }
            else {
                this.isRunGold = true;
            }
        }
        else {
            this.updataResult();
            this.showNext();
        }
    }

    public setNumList() {
        this.info = cv.dataHandler.getUserData().luckTurntables[0];
        for (let i = 0; i < this.num_list.length; i++) {
            if(this.info.amount_list[i].currency_type == 3) {
                this.num_list[i].node.active = false;
                this.icon_list[i].active = true;
                let commodity_id = this.info.amount_list[i].goods_id;
                let nameList = ["icon_iphone02", "icon_ticket02"];
                cv.resMgr.setSpriteFrame(this.icon_list[i], "zh_CN/hall/RedPackets/" + nameList[commodity_id - 1]);
            } else {
                this.icon_list[i].active = false;
                this.num_list[i].node.active = true;
                this.num_list[i].string = cv.StringTools.serverGoldToShowString(this.info.amount_list[i].amount);
            }
        }
        // this.result_gold_icon.node.x = (this.result_number.node.x - this.result_number.node.getContentSize().width / 2 - this.result_gold_icon.node.getContentSize().width / 2 - 5);
        let type = this.info.currency_type;
        if(type == 3) {
            let commodity_id = this.info.amount_list[this.info.amount_index].goods_id;
            this.result_gold_panel.active = false;
            this.result_iphone_panel.active = false;
            this.result_ticket_panel.active = false;
            this.result_ticket_en_panel.active = false;
            switch(commodity_id)
            {
                case 1:
                    this.result_iphone_panel.active = true;
                    break;
                case 2:
                    this.result_ticket_panel.active = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN;
                    this.result_ticket_en_panel.active = cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN;
                    if(this.info.award_type > 0) {
                        cc.find("name_img",this.result_ticket_panel).setPosition(cc.v2(this.result_ticket_namepos.x, cc.find("icon",this.result_ticket_en_panel).getPosition().y));
                        cc.find("name_img",this.result_ticket_en_panel).setPosition(cc.v2(this.result_ticket_en_namepos.x, cc.find("icon",this.result_ticket_en_panel).getPosition().y));
                        cc.find("des",this.result_ticket_panel).active = false;
                        cc.find("des",this.result_ticket_en_panel).active = false;
                    } else {
                        cc.find("name_img",this.result_ticket_panel).setPosition(this.result_ticket_namepos);
                        cc.find("name_img",this.result_ticket_en_panel).setPosition(this.result_ticket_en_namepos);
                        cc.find("des",this.result_ticket_panel).active = true;
                        cc.find("des",this.result_ticket_en_panel).active = true;
                    }
                    break;
            }
        } else {
            this.result_gold_panel.active = true;
            this.result_iphone_panel.active = false;
            this.result_ticket_panel.active = false;
            this.result_ticket_en_panel.active = false;
            let name = "";
            let actionname = "";
            switch (type) {
                case 0:
                    name = "result_coin_0";
                    actionname = "icon_gold";
                break;
                case 1:
                    name = "result_coin_1"
                    actionname = "YellowChip";
                break;
                case 2:
                    name = "result_coin_2"
                    actionname = "icon_ustd";
                break;
            }
            let num = cv.StringTools.serverGoldToShowNumber(this.info.amount_list[this.info.amount_index].amount);
            let str = num.toString();
            if (num >= 1000) {
                let pos = str.lastIndexOf(".");
                if (pos == -1) {
                    pos = str.length;
                }
                let nStr = str.substring(0, pos - 3);
                this.result_number.string = nStr + "," + str.substring(pos - 3, str.length);
            }
            else {
                this.result_number.string = str;
            }
            cv.resMgr.setSpriteFrame(this.result_gold_icon.node, "zh_CN/hall/RedPackets/" + name);
            let numSize = cv.resMgr.getLabelStringSize(this.result_number);
            this.result_gold_icon.node.setPosition(cc.v2((120 - numSize.width)*0.5, this.result_gold_icon.node.y));
            this.result_number.node.setPosition(cc.v2((120 - numSize.width)*0.5, this.result_number.node.y));
            // this.result_gold_icon.node.x = -cv.resMgr.getLabelStringSize(this.result_number).width / 2;
            // this.result_number.node.x = this.result_gold_icon.node.getContentSize().width / 2;
            for (let i = 0; i < this.gold_image_list.length; i++) {
                cv.resMgr.setSpriteFrame(this.gold_image_list[i].node,"zh_CN/hall/RedPackets/"+ actionname);
            }
        }
    }
    public hideResult() {
        this.result_panel.getComponent(cc.Animation).stop();
        this.result_panel.stopAllActions();
        this.luckTurntables_panel.active = false;
        this.close_button.node.active = false;
        this.result_panel.active = false;
    }
    public showGoldAnimation() {
        this.hideResult();
        this.gold_effect_panel.active = true;
        let pos = this.gold_effect_panel.convertToNodeSpaceAR(this.worldMovePos);
        cv.AudioMgr.playEffect("zh_CN/hall/laba/audio/laba_chipfly");

        for (let i = 0; i < this.gold_image_list.length; i++) {
            this.gold_image_list[i].node.opacity = 255;
            this.gold_image_list[i].node.setPosition(this.gold_image_pos[i]);
            let moveto = cc.moveTo(0.5 + i * 0.03, pos);
            let fadeout = cc.fadeOut(0.1);
            if (i < 5) {
                this.gold_image_list[i].node.runAction(cc.sequence(moveto, fadeout));
            } else {
                this.gold_image_list[i].node.runAction(cc.sequence(moveto, fadeout, cc.callFunc(() => {
                    this.updataResult();
                    this.showNext();
                }, this)));
            }
        }
    }
    
    getLanguageIndx(): number{
        let indx = 0;
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN)
        {
            indx = 0;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH)
        {
            indx = 2;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.th_PH)
        {
            indx = 3;
        }
        else
        {
            indx = 1;
        }
        return indx;
    }
}
