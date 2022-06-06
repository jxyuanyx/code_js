
import game_protocol = require("../../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

import cv from "../../../lobby/cv";
import Tag from "../../../../common/tools/Tag";
import { GiftData } from "../gift/GiftData";
import { LANGUAGE_TYPE } from "../../../../common/tools/Enum";
import { ConsoleLog } from "../../../../../mtt/script/common/ConsoleLog";

/**
 * 弹幕层
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class DanmuView extends cc.Component {
    @property(cc.SpriteFrame) frame_bulltScreenBg_normal: cc.SpriteFrame = null;

    //用做飘弹幕的节点
    private danmuNodes: cc.Node[] = [];
    //弹幕运行轨道
    private danmuChanel: any[] = [{ pos: 318, idle: true }, { pos: 178, idle: true }, { pos: -262, idle: true }];
    //弹幕飘过的时间
    private _actionTime: number = 4;
    //
    private _maxActiveNumber: number = 5;

    private _isallin: boolean = false;
    private _danmuCaches: game_pb.NoticeSendBarrage[] = [];

    //管理员封禁弹幕(该功能取消了)
    // private _disBarrageBox: cc.Node = null;
    // private _disBarrageTouch: cc.Node = null;
    // private _disBarragePlayerId: number = 0;
    // private _disBarrageUpdate: boolean = true;
    onLoad() {
        for (let index = 0; index < 10; index++) {
            let node = cc.find(cv.StringTools.formatC("bulltScreenBg%d", index), this.node);
            node.active = false;
            this.danmuNodes.push(node);
        }

        cv.MessageCenter.register("forbid_chat", this.onIsAllin.bind(this), this.node);
        cv.MessageCenter.register("danmu_onOff", this.onDanmu_onOff.bind(this), this.node);
        this.schedule(this.updateDanmuMsg, this._actionTime / this._maxActiveNumber);
        this.node.opacity = cv.tools.isShowBarrage() ? 255 : 0;

        // this._disBarrageBox = cc.find("disBarrageBox", this.node);
        // this._disBarrageTouch = cc.find("disBarrageTouch", this.node);
        // this.hideDisableBarrageBox();
        // if (this.isGameStarSeat()) {
        //     this._disBarrageTouch.on(cc.Node.EventType.TOUCH_END, function(event) {
        //         this.hideDisableBarrageBox();
        //     }.bind(this));
        //     this._disBarrageTouch._touchListener.setSwallowTouches(false); //touch事件穿透
        // }
    }
    start() {
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    onDestroy() {
        this.unschedule(this.updateDanmuMsg);
        cv.MessageCenter.unregister("danmu_onOff", this.node);
        cv.MessageCenter.unregister("forbid_chat", this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
        cv.GameDataManager.clearDanmuMsg();
    }

    /**
     * name
     */
    public onIsAllin(param) {
        this._isallin = param;
        if (!this._isallin && this._danmuCaches.length > 0) {
            for (let index = 0; index < this._danmuCaches.length; index++) {
                let data = this._danmuCaches[index];
                //cv.GameDataManager.addDanmuMsg(data);
                //发送给服务器
                cv.gameNet.requestSendBarrage(data.content, data.at_list, data.at_uid_list, data.thump_up_status, data.ctype);
            }
            this._danmuCaches = [];
        }
    }

    /**
     * 合成需要的内容
     * @param key   json的查找key值
     * @param list  解析出来的字符串数组
     * @param type  0 原样输出 1 添加转牌河牌信息 2 添加牌值信息
     */
    _getContentStrByKey(key: string, list: string[], type: number): string {
        let cardnum = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        if (type == -1) {
            return "";
        } else if (type == 0) {
            return cv.config.getStringData(key);
            // }else if(type == 1)
            // {
            //     return cv.StringTools.formatC(cv.config.getStringData(key), cv.config.getStringData("jackfruit_type_" + list[1]))
        } else {
            let cardstr = "";
            if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                cardstr = cv.config.getStringData("jackfruit_cardSuit_" + list[2]) + cardnum[cv.Number(list[3])];
            } else {
                cardstr = cardnum[cv.Number(list[3])] + cv.config.getStringData("jackfruit_cardSuit_" + list[2]);
            }
            return cv.StringTools.formatC(cv.config.getStringData(key), cardstr);
        }
    }

    private _getContentStr(str: string): string {
        let key = "jackfruit_danmu_label_";
        let type = -1;
        if (str.length > 0) {
            let list = str.split(";");
            if (list.length == 4) {
                key = key + list[0];
                let sublist = list[0].split("_");
                if (cv.Number(sublist[0]) == 0) {
                    if (cv.Number(sublist[1]) == 0) {
                        if (cv.Number(sublist[2]) < 5) {
                            type = 1;
                        } else {
                            type = 0;
                        }
                    } else {
                        if (cv.Number(sublist[2]) < 3) {
                            type = 1;
                        } else if (cv.Number(sublist[2]) < 8) {
                            type = 2;
                        } else {
                            type = 0;
                        }
                    }
                } else {
                    if (cv.Number(sublist[1]) == 0) {
                        if (cv.Number(sublist[2]) < 3) {
                            type = 1;
                        } else {
                            type = 0;
                        }
                    } else {
                        if (cv.Number(sublist[2]) < 2) {
                            type = 1;
                        } else if (cv.Number(sublist[2]) < 9) {
                            type = 2;
                        } else {
                            type = 0;
                        }
                    }
                }
            }
            return this._getContentStrByKey(key, list, type);
        }
        return "";
    }

    public OnAppEnterBackground() {
        //cv.config.logTime("OnAppEnterBackground");
        //console.log("DanmuView  OnAppEnterBackground");
        cv.config.resetSignTime();
        cv.GameDataManager.clearDanmuMsg();
    }

    public OnAppEnterForeground() {
        //cv.config.logTime("OnAppEnterForeground");
        cv.config.signCurtime();
        //console.log("DanmuView  OnAppEnterForeground");
        cv.GameDataManager.clearDanmuMsg();
    }
    /**
     * 弹幕的关闭与开启
     * @param isOn 
     */
    public onDanmu_onOff(isOn: boolean) {
        this.node.opacity = isOn ? 255 : 0;
    }

    //刷新显示弹幕
    public updateDanmuMsg(f32Delta) {
        if (this.currentDanmuActiveNumber() >= this._maxActiveNumber) {
            return;
        }
        let channel: any = this.getIdleChannel();
        if (channel == null) return;
        let barrageData: game_pb.NoticeSendBarrage = cv.GameDataManager.getDanmuMsg();
        if (!barrageData) {
            return;
        }
        let danmuNode = this.getDanmuNode();
        let richtext = cc.find("richtext", danmuNode);
        let msg = "";
        let str = "";
        let content = "";

        // 使用弹幕前复原默认的精灵, 且清空富文本图集(因为礼物弹幕会动态修改弹幕的背景图, 也动态添加了富文本图集)
        let bulltScreenBg_normal: cc.Sprite = danmuNode.getChildByName("bulltScreenBg_normal").getComponent(cc.Sprite);
        bulltScreenBg_normal.spriteFrame = this.frame_bulltScreenBg_normal;
        richtext.getComponent(cc.RichText).imageAtlas = null;

        // 资料卡点赞 菠萝蜜和德州公用3
        if (barrageData.ctype == game_pb.BarrageType.Enum_Liked) {
            content = cv.StringTools.formatC(cv.config.getStringData("Star_danmu_like"), barrageData.liked_nickname, barrageData.nickname);
        }
        // 礼物弹幕
        else if (barrageData.ctype == game_pb.BarrageType.Enum_Tip) {
            let giftID: number = barrageData.userTipInfo.tip.tipId;
            let giftCount: number = barrageData.userTipInfo.tip.tipCount;
            let strGiftName: string = cv.config.getStringData(`Gift_category_${giftID}`) + ` x ${giftCount}`;
            let strGiftImg: string = ` <img src="gift_icon_${giftID}"/>`
            let strSent: string = cv.config.getStringData("Gift_sent");
            let strSender: string = barrageData.userTipInfo.player.nickname;
            let strRecipient: string = `<img src="img_icon_star"/> <color=#FFCD7E>${barrageData.userTipInfo.toPlayer.nickname}</color>`;

            let fileName: string = giftID < 1000 ? "img_danmu_bg_1" : "img_danmu_bg_2";
            let atlasPath: string = GiftData.GIFT_PLIST_PATH;
            richtext.getComponent(cc.RichText).imageAtlas = cv.resMgr.getSpriteAtlas(atlasPath);
            bulltScreenBg_normal.spriteFrame = cv.resMgr.getSpriteAtlasFrame(atlasPath, fileName);
            content = `${strSender} ${strSent} ${strRecipient} ${strGiftName} ${strGiftImg}`;
        }
        else if (barrageData.ctype == game_pb.BarrageType.Enum_PlayerEnters) {
            content = barrageData.playerEntersBarrage != null ? barrageData.playerEntersBarrage.nickname : content;
            content = cv.StringTools.formatC(cv.config.getStringData("Danmuview_PlayerEnters_Tips"), content);
        }
        else if (barrageData.ctype == game_pb.BarrageType.Enum_Custom) {
            content = barrageData.content;
        }
        else {
            if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) {
                str = "jackfruit_danmu_label";
            }
            else {
                str = "Faceview_danmu_text_";
            }
            if (cv.StringTools.isNumber(barrageData.content)) {
                content = cv.config.getStringData(str + barrageData.content);
            }
            else {
                content = this._getContentStr(barrageData.content);
                if (content.length == 0) {
                    return;
                }
            }
        }

        //danmuNode.attr({playerId: barrageData.playerid});

        if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit || cv.GameDataManager.tRoomData.i32SelfSeat == -1 && !this.isGameStarSeat() || barrageData.ctype == game_pb.BarrageType.Enum_PlayerEnters) {
            cc.find("button", danmuNode).active = false;
        }
        else {
            cc.find("button", danmuNode).active = true;
            if ((barrageData.thump_up_status == 1 || barrageData.thump_up_status == 3) && barrageData.playerid != cv.dataHandler.getUserData().u32Uid) {
                cc.find("button", danmuNode).getComponent(Tag).setData(barrageData);
                cc.find("button/thumbUp_normal", danmuNode).active = true;
                cc.find("button/thumbUp_pressed", danmuNode).active = false;
            }
            else if (barrageData.thump_up_status == 2 && barrageData.playerid != cv.dataHandler.getUserData().u32Uid) {
                cc.find("button/thumbUp_normal", danmuNode).active = false;
                cc.find("button/thumbUp_pressed", danmuNode).active = true;
            }
            else {
                cc.find("button", danmuNode).active = false;
            }
        }

        let atName = "";
        if (barrageData.ctype === game_pb.BarrageType.Enum_Liked || barrageData.ctype == game_pb.BarrageType.Enum_Tip) {
            atName = "";
            msg = content;
        } else if (barrageData.ctype == game_pb.BarrageType.Enum_PlayerEnters) {
            atName = "";
            msg = cv.StringTools.formatC("<color=#FFDF5D>%s</color>", content);
        }
        else {
            atName = (barrageData.at_list && barrageData.at_list.length) > 0 ? barrageData.at_list[0] : "";
            msg = cv.StringTools.formatC("<color=#bb7e41>%s：</color><color=#ffab00>%s </color><color=#ffffff>%s</color>", barrageData.nickname, atName, content);
        }

        if (barrageData.ctype == game_pb.BarrageType.Enum_PlayerEnters) {
            cc.find("bulltScreenBg_normal", danmuNode).active = true;
            cc.find("bulltScreenBg_atself", danmuNode).active = false;
            danmuNode.opacity = 255 * 0.85;
        } else {
            if (barrageData.playerid == cv.dataHandler.getUserData().u32Uid) {
                //自己发的
                msg = cv.StringTools.formatC("<color=#ffab00>%s：</color><color=#ffab00>%s </color><color=#ffffff>%s</color>", barrageData.nickname, atName, content);
            }
    
            if (this.isAtSelf(atName) || barrageData.playerid == cv.dataHandler.getUserData().u32Uid) {
                cc.find("bulltScreenBg_atself", danmuNode).active = true;
                cc.find("bulltScreenBg_normal", danmuNode).active = false;
                danmuNode.opacity = 255;
            }
            else {
                cc.find("bulltScreenBg_normal", danmuNode).active = true;
                cc.find("bulltScreenBg_atself", danmuNode).active = false;
                danmuNode.opacity = 255 * 0.85;
            }
        }
        
        richtext.getComponent(cc.RichText).string = msg;
        //使用轨道
        this.useChannel(channel);
        let func = cc.callFunc((target, data) => {
            // 回收轨道
            this.freeChannel(data);
        }, this, channel);
        danmuNode.active = true;
        let txtWidth = richtext.getContentSize().width;
        danmuNode.setContentSize(cc.size(txtWidth + 120, danmuNode.getContentSize().height));
        danmuNode.setPosition(cv.config.WIDTH / 2 + txtWidth / 2 + 10, channel.pos);
        let time = (danmuNode.width + 10) / (cv.config.WIDTH / this._actionTime);
        danmuNode.runAction(cc.spawn(cc.sequence(cc.moveTo(this._actionTime + time, cc.v2(-cv.config.WIDTH / 2 - txtWidth / 2 - 100, channel.pos)), cc.callFunc((target, node) => {
            node.active = false;
        }, this, danmuNode)), cc.sequence(cc.delayTime(time), func)));
        //立刻刷新widget
        cv.resMgr.adaptWidget(danmuNode, true);
    }

    /**
     * 是否是at自己
     */
    public isAtSelf(atName: string): boolean {
        let atIndex = atName.indexOf("@");
        let name = atName.slice(atIndex + 1, atName.length);
        return cv.StringTools.earseSpace(name) == cv.dataHandler.getUserData().nick_name;
    }
    /**
     * 获取可用的弹幕节点(数量不够自动生成)
     */
    public getDanmuNode(): cc.Node {
        for (let i = 0; i < this.danmuNodes.length; i++) {
            if (!this.danmuNodes[i].active) {
                return this.danmuNodes[i];
            }
        }

        let newNodes = cc.instantiate(this.danmuNodes[0]);
        this.danmuNodes[0].getParent().addChild(newNodes);
        newNodes.stopAllActions();
        newNodes.active = false;
        this.danmuNodes.push(newNodes);
        return newNodes;
    }
    /**
     * 重设弹幕的运行轨道
     * 默认值[318, 178, -262]
     */
    public setDanmuChanel(pos: number[] | number): void {
        if (!pos) {
            return;
        }
        let posArr: number[] = typeof pos == 'number' ? [pos] : pos;
        if (posArr.length == 0) {
            return;
        }
        let tmpArr: any[] = this.danmuChanel;
        this.danmuChanel = [];
        for (let i = 0; i < posArr.length; ++i) {
            let obj = null;
            for (let n = 0; n < tmpArr.length; ++n) {
                if (posArr[i] == tmpArr[n].pos) {
                    obj = tmpArr[n];
                    break;
                }
            }
            if (!obj) {
                obj = { pos: posArr[i], idle: true };
            }
            this.danmuChanel.push(obj);
        }
    }
    private getIdleChannel(): any {
        let tmpArr: any[] = [];
        for (let i = 0; i < this.danmuChanel.length; ++i) {
            if (this.danmuChanel[i].idle) {
                tmpArr.push(this.danmuChanel[i]);
            }
        }
        if (tmpArr.length == 0) {
            return null;
        }
        let rand: number = Math.floor(Math.random() * tmpArr.length);
        return tmpArr[rand];
    }
    private freeChannel(channel: any): void {
        if (channel) {
            channel.idle = true;
        }
    }
    private useChannel(channel: any): void {
        if (channel) {
            channel.idle = false;
        }
    }

    /**
     * 设置父节点
     * @param node 
     */
    public setParentNode(node: cc.Node) {
        if (node) {
            node.addChild(this.node);
        }
    }

    /**
     * 调整最大(显示)条数
     */
    public adjustDanmuMaxNumber(max: number): void {
        if (max) {
            this.unschedule(this.updateDanmuMsg);
            this._maxActiveNumber = max;
            this.schedule(this.updateDanmuMsg, this._actionTime / this._maxActiveNumber);
        }
    }
    private currentDanmuActiveNumber(): number {
        let cnt: number = 0;
        for (let i = 0; i < this.danmuNodes.length; i++) {
            if (this.danmuNodes[i].active) {
                cnt++;
            }
        }
        return cnt;
    }

    /**
     * 点赞
     */
    public onClickThumbUp(evt: cc.Event.EventTouch) {
        if (this.isGameStarSeat()) {
            this.clickThumbUpStar(evt);
        } else {
            this.clickThumbUpNormal(evt);
        }
    }
    private clickThumbUpNormal(evt: cc.Event.EventTouch): void { //普通桌,旧逻辑不变
        //旁观不能点击
        if (cv.GameDataManager.tRoomData.i32SelfSeat == -1 || cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Jackfruit) return;
        let target: cc.Node = evt.currentTarget;
        let souredata: game_pb.NoticeSendBarrage = target.getComponent(Tag).getData();
        if (souredata.thump_up_status == 2) {
            return;
        }
        target.getChildByName("thumbUp_normal").active = false;
        target.getChildByName("thumbUp_pressed").active = true;
        souredata.thump_up_status = 2;
        target.getComponent(Tag).setData(souredata);
        //复制
        let data: game_pb.NoticeSendBarrage = new game_pb.NoticeSendBarrage();
        data.content = souredata.content;
        data.nickname = cv.dataHandler.getUserData().nick_name;
        data.playerid = cv.Number(cv.dataHandler.getUserData().user_id);
        data.thump_up_status = 3; //点赞状态: 1，未点赞 2，已点赞 3，点赞后复制的
        data.ctype = souredata.ctype;
        data.at_list = data.at_list;
        cv.MessageCenter.send("resetCdTime");
        if (this._isallin) {
            this._danmuCaches.push(data);
        } else {
            //cv.GameDataManager.addDanmuMsg(data);
            //发送给服务器
            cv.gameNet.requestSendBarrage(data.content, data.at_list, data.at_uid_list, data.thump_up_status, data.ctype);
        }
    }
    private clickThumbUpStar(evt: cc.Event.EventTouch): void { //明星桌
        //被禁言时不能点赞复制
        if (cv.GameDataManager.tRoomData.muteCustomBarrageSeconds == -1 || cv.GameDataManager.tRoomData.muteCustomBarrageSeconds > 0) {
            return;
        }
        let target: cc.Node = evt.currentTarget;
        let souredata: game_pb.NoticeSendBarrage = target.getComponent(Tag).getData();
        if (souredata.thump_up_status == 2) {
            return;
        }
        target.getChildByName("thumbUp_normal").active = false;
        target.getChildByName("thumbUp_pressed").active = true;
        souredata.thump_up_status = 2;
        target.getComponent(Tag).setData(souredata);
        //复制
        let data: game_pb.NoticeSendBarrage = new game_pb.NoticeSendBarrage();
        data.content = souredata.content;
        data.nickname = cv.dataHandler.getUserData().nick_name;
        data.playerid = cv.Number(cv.dataHandler.getUserData().user_id);
        data.thump_up_status = 3;
        data.ctype = souredata.ctype;
        data.at_list = data.at_list; //>>>???
        cv.MessageCenter.send("resetCdTime");
        if (this._isallin) {
            this._danmuCaches.push(data);
        } else {
            //cv.GameDataManager.addDanmuMsg(data);
            //发送给服务器
            cv.gameNet.requestSendBarrage(data.content, data.at_list, data.at_uid_list, data.thump_up_status, data.ctype);
        }
    }

    /**
     * 封禁弹幕玩家
     */
    // public onClickDisableBarrage(evt: cc.Event): void {
    //     if (!this.isGameStarSeat() || cv.GameDataManager.tRoomData.auth != 1 || cv.GameDataManager.tRoomData.forbidden.length == 0) {
    //         return;
    //     }
    //     let playerId = evt.currentTarget['playerId'];
    //     if (typeof playerId == 'number' && playerId != cv.dataHandler.getUserData().u32Uid) {
    //         this.showDisableBarrageBox(playerId);
    //     }
    // }
    // public onDisableBarrage(evt: cc.Event): void {
    //     let target: cc.Node = evt.currentTarget;
    //     if (typeof target['time'] == 'number' && this._disBarragePlayerId != 0) {
    //         cv.gameNet.requestSendBarrageForbidden(this._disBarragePlayerId, target['time'], 0);
    //     }
    //     this._disBarragePlayerId = 0;
    //     this.hideDisableBarrageBox();
    // }
    // private getTimeString(time: number): string {
    //     if (time == -1) {
    //         return cv.config.getStringData("forever");
    //     }
    //     let h = Math.floor(time / 3600);
    //     let m = Math.floor(time % 3600 / 60);
    //     let s = Math.floor(time % 60);
    //     let str: string = "";
    //     if (h > 0) {
    //         str += h + cv.config.getStringData("hour");
    //     }
    //     if (m > 0 || (m == 0 && h > 0 && s > 0)) {
    //         str += m + cv.config.getStringData("minute");
    //     }
    //     if (s > 0) {
    //         str += s + cv.config.getStringData("seconds");
    //     }
    //     return str;
    // }
    // private showDisableBarrageBox(playerId: number): void {
    //     this._disBarragePlayerId = playerId;
    //     this._disBarrageBox.active = true;
    //     this._disBarrageTouch.active = true;
    //     if (this._disBarrageUpdate) {
    //         this._disBarrageUpdate = false;
    //         let tempNode: cc.Node = cc.find("button", this._disBarrageBox);
    //         let forbidden: number[] = cv.GameDataManager.tRoomData.forbidden;
    //         for (let i = 0; i < forbidden.length; ++i) {
    //             let itemNode: cc.Node = cc.instantiate(tempNode);
    //             itemNode.attr({time: forbidden[i]});
    //             cc.find("Background/Label", itemNode).getComponent(cc.Label).string = this.getTimeString(forbidden[i]);
    //             itemNode.active = true;
    //             this._disBarrageBox.addChild(itemNode);
    //         }
    //     }
    // }
    // private hideDisableBarrageBox(): void {
    //     this._disBarrageBox.active = false;
    //     this._disBarrageTouch.active = false;
    // }
    private isGameStarSeat(): boolean {
        return cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat;
    }
}