/**
 * 红包节按钮
 */

import cv from "../../lobby/cv";
import RedEnvelope from "../redEnvelope/RedEnvelope";
import LuckTurntables from "../redEnvelope/LuckTurntables";
import { pb } from "../../../../Script/common/pb/ws_protocol";
import RedGoldMove from "../starRedPackacket/RedGoldMove";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LuckTurntablesButton extends cc.Component {
    @property(cc.Node) bg: cc.Node = null;
    @property(cc.Node) bg_time: cc.Node = null;
    @property(cc.Label) time_text: cc.Label = null;
    @property(cc.Prefab) effRrootPrefab: cc.Prefab = null;
    @property(cc.Prefab) redeff_prefab: cc.Prefab = null;
    @property(cc.Prefab) red_Envelope_prefab: cc.Prefab = null;
    @property(cc.Prefab) red_Envelope_Banner_prefab: cc.Prefab = null;
    @property(cc.Prefab) turntables_prefab: cc.Prefab = null;
    @property(cc.Prefab) turntablesH_prefab: cc.Prefab = null;
    @property(cc.Prefab) goods_eff: cc.Prefab = null;
    @property(cc.Prefab) RedGoldMove_prefab: cc.Prefab = null;

    public redeffAni: cc.Animation = null;
    public s_time: number = 0;
    public s_isReady: boolean = false;
    public s_gold_list = [];
    public effRrootNode = null;
    public prizeActionIndex = 0;
    public s_tips_panel: cc.Node = null;
    public s_tips_text: cc.Label = null;
    public tips_panel_2: cc.Node = null;
    public tips_panel_1: cc.Node = null;
    public tips_text_2: cc.Label = null;
    public tips_text_1: cc.Label = null;
    public redeff_node: cc.Node = null;
    public red_Envelope: cc.Node = null;
    public turntables_node: cc.Node = null;
    public selfCoinPos: cc.Vec2 = null;
    private _redGoldMove: cc.Node = null;

    onLoad() {
        this._initRedGoldMove();
        cv.MessageCenter.register("showReadyTime", this.showReadyTime.bind(this), this.node);
        cv.MessageCenter.register("showCurrentTime", this.showCurrentTime.bind(this), this.node);
        cv.MessageCenter.register("updataLuckTurntablesButton", this.updataButton.bind(this), this.node);
        cv.MessageCenter.register("luckTurntablesOver", this.onLuckTurntablesOver.bind(this), this.node);
        cv.MessageCenter.register("App_On_Will_Enter_Foreground", this.onAppEnterForeground.bind(this), this.node);
        cv.MessageCenter.register("drawRedPackage", this.drawRedPackage.bind(this), this.node);
        cv.MessageCenter.register("showLuckTurntables", this.showLuckTurntables.bind(this), this.node);
        cv.MessageCenter.register("redPacketsButton", this.redPacketsButton.bind(this), this.node);

        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);

        this.initredPackage();

        if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE || cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
            this.bg_time.setScale(1);
        } else {
            this.bg_time.setScale(0.6);
        }
        this.bg_time.active = false;
        // this.des_text.string = cv.config.getStringData("LuckTurntablesButton_des_text");
    }

    private _initRedGoldMove() {
        let scene = cc.director.getScene();
        this._redGoldMove = scene.getChildByName("redGoldMove");
        if (this._redGoldMove == null) {
            this._redGoldMove = cc.instantiate(this.RedGoldMove_prefab);
            this._redGoldMove.name = "redGoldMove";
            scene.addChild(this._redGoldMove);
        }
    }

    public setViewData(pos: cc.Vec2) {
        this.selfCoinPos = pos;
    }
    onDestroy() {
        cv.MessageCenter.unregister("showReadyTime", this.node);
        cv.MessageCenter.unregister("showCurrentTime", this.node);
        cv.MessageCenter.unregister("updataLuckTurntablesButton", this.node);
        cv.MessageCenter.unregister("luckTurntablesOver", this.node);
        cv.MessageCenter.unregister("App_On_Will_Enter_Foreground", this.node);
        cv.MessageCenter.unregister("drawRedPackage", this.node);
        cv.MessageCenter.unregister("showLuckTurntables", this.node);
        cv.MessageCenter.unregister("redPacketsButton", this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);

    }
    public clickEvent() {
        cv.AudioMgr.playButtonSound('button_click');
        cv.MessageCenter.send("redPacketsButton");
    }
    public showReadyTime() {
        let newTime = Math.floor((new Date()).getTime() / 1000);
        let temp = cv.dataHandler.getUserData().luckTurntablesStartTime - newTime;
        if (temp > 0) {
            this.s_time = temp;
            cc.director.getScheduler().unschedule(this.updataTime, this);
            cc.director.getScheduler().schedule(this.updataTime, this, 1);
            this.updataTime(0);
            this.showDes(true);
            this.updateDes(true);
            this.updateBg(true);
            this.s_isReady = true;
        }
    }

    public updataTime(time: number) {
        if (this.s_time >= 0) {
            let s: string = cv.StringTools.formatTime(this.s_time, cv.Enum.eTimeType.Hour_Min_Sec, false, true);
            this.time_text.string = s;
            this.s_time -= 1;
            this.bg_time.active = true;
        }
        else {
            cc.director.getScheduler().unschedule(this.updataTime, this);
            this.time_text.string = "";
            this.bg_time.active = false;
            this.showDes(false);
            if (!this.s_isReady) {
                cv.dataHandler.getUserData().luckTurntables = [];
                this.updataButton();
            }
        }
    }

    public showDes(isShow: boolean) {
        // this.des_text.node.active = isShow;
    }

    public updateDes(isReady: boolean) {
        // let str: string = isReady ? cv.config.getStringData("LuckTurntablesButton_des_text") : cv.config.getStringData("LuckTurntablesButton_des_1_text");
        // this.des_text.string = str;
    }

    public updateBg(isReady: boolean) {
        let framename: string = isReady ? "red_btn" : "red_btn_open";
        cv.resMgr.setSpriteFrame(this.bg, "zh_CN/game/redpacket/" + framename);
    }

    public showCurrentTime() {
        let newTime = Math.floor((new Date()).getTime() / 1000);
        let temp = cv.dataHandler.getUserData().luckTurntablesEndTime - newTime;
        if (temp > 0) {
            this.s_time = temp;
            cc.director.getScheduler().unschedule(this.updataTime, this);
            cc.director.getScheduler().schedule(this.updataTime, this, 1);
            this.updataTime(0);
            this.showDes(true);
            this.updateDes(false);
            this.updateBg(false);
            this.s_isReady = false;
        }
        else {
            cv.dataHandler.getUserData().luckTurntables = [];
            this.updataButton();
            // 非准备状态时
            if (!this.s_isReady) {
                this.onLuckTurntablesOver();
            }
        }
    }

    public updataButton() {
        this.showEff();
    }

    public showEff() {
        let isShow = cv.dataHandler.getUserData().luckTurntables.length > 0;
        let sprite = this.node.getChildByName("a0001_1");
        sprite.active = isShow;
        if (isShow) {
            let ani = this.node.getComponent(cc.Animation).play("animation0")
            ani.wrapMode = cc.WrapMode.Loop;
        }
        else {
            this.node.getComponent(cc.Animation).stop();
        }
    }

    public onLuckTurntablesOver() {
        this.updataButton();
        this.s_time = -1;
        this.updataTime(0);
        this.updateBg(true);
        cc.director.getScheduler().unschedule(this.updataTime, this);
    }

    public onAppEnterForeground() {
        this.s_isReady = false;
        this.showReadyTime();
        this.showCurrentTime();
    }

    public updateView(isHorizontal: boolean, node: cc.Node) {
        this.initView(isHorizontal, node);
        let isShow = false;
        if (this.s_tips_panel != null) {
            isShow = this.s_tips_panel.active && this.s_tips_panel.opacity > 0;
        }
        this.s_tips_panel = isHorizontal ? this.tips_panel_2 : this.tips_panel_1;
        this.s_tips_text = this.s_tips_panel.getChildByName("tips_text").getComponent(cc.Label);
        this.showEff();
        this.updateDes(true);
        this.showDes(false);
        this.updateBg(true);
        this.time_text.string = "";
        this.showReadyTime();
        this.showCurrentTime();
        if (isShow) {
            this.showTips();
        }
    }

    public setLeftShowDes() {
        // this.des_text_1.string = this.des_text_0.string;
        // this.time_text_down.string = this.time_text_up.string;
        // this.bg_time_down.active = true;
        // // this.des_text = this.des_text_1;
        // this.time_text = this.time_text_down;
        // // this.des_text_0.string = "";
        // this.time_text_up.string = "";
        // this.bg_time_up.active = false;
    }

    public initView(isHorizontal: boolean, node: cc.Node) {
        if (this.effRrootNode == null) {
            this.effRrootNode = cc.instantiate(this.effRrootPrefab);
            this.s_gold_list = [];
            for (let i = 0; i < 6; i++) {
                let image: cc.Sprite = this.effRrootNode.getChildByName(`Image_${i}`).getComponent(cc.Sprite);
                this.s_gold_list.push(image);
                image.node.active = false;
            }
            this.tips_panel_1 = this.effRrootNode.getChildByName("tips_panel_1");
            this.tips_panel_2 = this.effRrootNode.getChildByName("tips_panel_2");
            this.tips_panel_1.active = false;
            this.tips_panel_2.active = false;

            if (node != null) {
                node.addChild(this.effRrootNode);
                // let size = node.getContentSize();
                // this.effRrootNode.setPosition(cc.v2(size.width / 2, size.height / 2));
            }
            else {
                this.node.addChild(this.effRrootNode);
            }
        }
    }
    public showTips() {
        this.s_tips_panel.stopAllActions();
        this.s_tips_text.string = cv.config.getStringData("LuckTurntablesButton_tips_text");
        this.s_tips_panel.active = true;
        this.s_tips_panel.opacity = 255;
        let shadeFunc = function () {
        }
        let showAction = cc.callFunc(shadeFunc, this);
        this.s_tips_panel.runAction(cc.sequence(cc.delayTime(3.0), showAction, cc.fadeOut(0.5)));
    }

    public initredPackage() {
        this.redeff_node = cc.instantiate(this.redeff_prefab);
        this.redeff_node.setContentSize(this.node.width, this.node.height);
        let des_text = cc.find("des_text", this.redeff_node).getComponent(cc.Label);
        des_text.string = cv.config.getStringData("RedPackets_des_text");
        this.redeff_node.active = false;
        this.node.getParent().addChild(this.redeff_node);
        let pos = this.node.getParent().convertToNodeSpace(cc.v2(cv.config.WIDTH / 2, cv.config.HEIGHT / 2))
        this.redeff_node.setPosition(pos);
        this.redeffAni = this.redeff_node.getComponent(cc.Animation);
        this.redeffAni.on("finished", this.drawRedAniBack, this);
    }
    public drawRedPackage() {
        if (this.redeff_node.active) {
            return;
        }
        this.redeff_node.active = true;
        this.redeffAni.play("animation0", 0);
        let pos = this.redeff_node.getParent().convertToNodeSpaceAR(cc.v2(cv.config.WIDTH / 2, cv.config.HEIGHT / 2))
        this.redeff_node.setPosition(pos);
    }
    public drawRedAniBack() {
        switch (this.prizeActionIndex) {
            case 0:
                this.prizeActionIndex = 1;
                this.redPackageMove();
                break;
            case 1:
                break;
            case 2:
                this.prizeActionIndex = 0;
                this.showEff();
                this.redeff_node.active = false;
                this.showTips();
                break;
        }
    }
    public drawRedMoveBack() {
        this.prizeActionIndex = 2;
        this.redeffAni.stop();
        this.redeffAni.play("animation2", 0);
    }
    public redPackageMove() {
        let move = cc.moveTo(0.5, this.node.getPosition());
        let pkCall = cc.callFunc(this.drawRedMoveBack, this);
        this.redeffAni.play("animation1", 0);
        this.redeff_node.runAction(cc.sequence(move, pkCall));
    }

    public redPacketsButton() {
        if (cv.dataHandler.getUserData().luckTurntables.length > 0) {
            this.showLuckTurntables();
        }
        else {
            this.showRedEnvelope();
        }

        cv.MessageCenter.send("hide_bombInfoTips");
    }

    private showRedEnvelope() {
        let gameid = cv.roomManager.getCurrentGameID();
        if (this.red_Envelope == null) {
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.CowBoy || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.HumanBoy || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.VideoCowboy || cv.roomManager.getCurrentGameID() == pb.GameId.PokerMaster) {
                this.red_Envelope = cc.instantiate(this.red_Envelope_Banner_prefab);
            } else {
                this.red_Envelope = cc.instantiate(this.red_Envelope_prefab);
            }
            let scene = cc.director.getScene();
            this.red_Envelope.setPosition(0, 0);
            scene.addChild(this.red_Envelope);
        }

        this.red_Envelope.getComponent(RedEnvelope).startUpdate();
    }
    public showLuckTurntables() {
        if (this.turntables_node == null) {
            let scene = cc.director.getScene();
            if (cv.config.getCurrentScene() == cv.Enum.SCENE.GAME_SCENE || cv.config.getCurrentScene() == cv.Enum.SCENE.JACKFRUIT_SCENE) {
                this.turntables_node = cc.instantiate(this.turntables_prefab);
            } else {
                this.turntables_node = cc.instantiate(this.turntablesH_prefab);
            }
            scene.addChild(this.turntables_node);
            if (this.selfCoinPos != null) {
                this.turntables_node.getComponent(LuckTurntables).setGoldMovePos(this.selfCoinPos);
            }
        }

        if (cv.dataHandler.getUserData().luckTurntables.length > 0) {
            cv.MessageCenter.send("LuckTurntables_isView", true);
            this.turntables_node.active = true;
            this.turntables_node.getComponent(LuckTurntables).updateView();
        }
    }

    public showGoldMoveAction(woldpos: cc.Vec2, currency_type: number) {
        let movePos = this.node.convertToNodeSpaceAR(woldpos);
        if (currency_type == 3) {
            let sprNode = cc.instantiate(this.goods_eff);
            this.node.addChild(sprNode);
            sprNode.setPosition(0, 0);
            let anction = sprNode.getComponent(cc.Animation);
            anction.play("goods_eff");
            anction.on("finished", (event: cc.Event): void => {
                let oldPos = cc.v2(0, 0);
                let x = oldPos.x > movePos.x ? oldPos.x - movePos.x : movePos.x - oldPos.x;
                let y = oldPos.y > movePos.y ? oldPos.y - movePos.y : movePos.y - oldPos.y;
                let big = x > y ? x : y;
                let delaytime1 = cc.delayTime(0.05);
                let show = cc.show();
                let moveto = cc.moveTo(big / 150 * 0.1, movePos);
                let destroySelf = cc.destroySelf();
                sprNode.runAction(cc.sequence(delaytime1.easing(show), moveto, destroySelf));
            }, this);
        } else {
            let listPos: cc.Vec2[] = [new cc.Vec2(7, 18),
            new cc.Vec2(-24, 21),
            new cc.Vec2(15, -7),
            new cc.Vec2(-38, 8),
            new cc.Vec2(6, -23),
            new cc.Vec2(-33, -18),]
            let len = listPos.length;
            let name = "";
            if (currency_type == 0) {
                name = "icon_gold";
            } else if (currency_type == 1) {
                name = "YellowChip";
            } else if (currency_type == 2) {
                name = "icon_ustd";
            }
            for (let i = 0; i < len; i++) {
                let sprNode = cv.resMgr.createSprite(this.node, "zh_CN/hall/RedPackets/" + name);
                sprNode.setPosition(listPos[i]);
                let oldPos = listPos[i];
                let x = oldPos.x > movePos.x ? oldPos.x - movePos.x : movePos.x - oldPos.x;
                let y = oldPos.y > movePos.y ? oldPos.y - movePos.y : movePos.y - oldPos.y;
                let big = x > y ? x : y;
                let delaytime1 = cc.delayTime(i * 0.05);
                let show = cc.show();
                let moveto = cc.moveTo(big / 150 * 0.1, movePos);
                let destroySelf = cc.destroySelf();
                sprNode.runAction(cc.sequence(delaytime1.easing(show), moveto, destroySelf));
            }
        }
    }

    public runGoldMoveAction(start: cc.Node, end: cc.Node, callback?: () => void) {
        let startPos = start.getParent().convertToWorldSpaceAR(start.getPosition());
        let endPos = end.getParent().convertToWorldSpaceAR(end.getPosition());
        let offset = cc.v2(40, 40);
        this._redGoldMove.getComponent(RedGoldMove).runGoldMoveAction(startPos, endPos, 0.8, 0.1, offset, callback);
    }

    /**
 * 游戏进入后台时触发的事件
 * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为
 * 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为
 */
    OnAppEnterBackground(): void {

    }

    /**
     * 游戏进入前台运行时触发的事件
     * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为
     * 在原生平台，它对应的是应用被切换到前台事件
     */
    OnAppEnterForeground(): void {
        this.showReadyTime();
        this.showCurrentTime();
    }

    hidePopup(): void {
        if (this.red_Envelope) {
            this.red_Envelope.getComponent(RedEnvelope).hideView();
        }

        // if (this.turntables_node) {
        //     this.turntables_node.getComponent(LuckTurntables).closeView();
        //     this.turntables_node.removeFromParent();
        //     this.turntables_node = null;
        //     cv.MessageCenter.send("updataLuckTurntablesButton");
        // }
    }
}
