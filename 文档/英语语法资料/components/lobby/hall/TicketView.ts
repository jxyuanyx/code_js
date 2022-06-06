// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { pb } from "../../../../Script/common/pb/ws_protocol";
import { LANGUAGE_TYPE } from "../../../../Script/common/tools/Enum";
import { HashMap } from "../../../../Script/common/tools/HashMap";
import cv from "../../../../Script/components/lobby/cv";

class NODE_SATE {
    position: cc.Vec2;
    rotation: number;
    scale: cc.Vec2;
    opacity: number;
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class TicketView extends cc.Component {

    @property(cc.Animation)
    pk: cc.Animation = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Sprite)
    tik: cc.Sprite = null;

    @property(cc.Sprite)
    wenzi: cc.Sprite[] = [];

    @property(cc.Button)
    sure: cc.Button = null;

    @property(cc.Label)
    txt_desc: cc.Label = null;

    @property(cc.Label)
    txt_count: cc.Label = null;

    @property(cc.SpriteFrame)
    defaultImg: cc.SpriteFrame[] = [];

    aniName: string[] = ["pk_donghua_01", "pk_donghua_02", "pk_donghua_03"];
    canClick: boolean = false;
    isClick: boolean = false;
    canSure: boolean = false;

    msg: pb.ToolsInfo[] = [];
    currentIndex: number = 0;
    downloadIndex: number = 0;
    downloadSpr: HashMap<number, cc.SpriteFrame> = new HashMap();
    stateMap: HashMap<string, NODE_SATE> = null;

    static IS_VIEW: boolean = false;
    static NAME: string = "ticketView";
    getData: boolean = false;
    isClose: boolean = false;

    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("ReceiveToolsNotice", this.ReceiveToolsNotice.bind(this), this.node);
        cv.MessageCenter.register("ReceiveToolsResponse", this.ReceiveToolsResponse.bind(this), this.node);

        this.stateMap = new HashMap();
        this.getNodeStateData(this.pk.node);

        this.bg.on(cc.Node.EventType.TOUCH_END, () => {
            cv.AudioMgr.playButtonSound('button_click');
            if (!this.canClick) return;
            this.isClick = true;
            if (this.downloadIndex <= this.currentIndex) return;
            this.playAni();
        }, this);

        this.sure.node.on("click", () => {
            cv.AudioMgr.playButtonSound('button_click');
            if (!this.canSure) return;

            cv.worldNet.ReceiveToolsRequest(this.msg[this.currentIndex]);
        }, this);

        this.initLanguage();
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("ReceiveToolsNotice", this.node);
        cv.MessageCenter.unregister("ReceiveToolsResponse", this.node);
    }

    show() {
        if (this.msg.length <= this.currentIndex || !TicketView.IS_VIEW) {
            TicketView.IS_VIEW = false;
            this.reset();
            cv.MessageCenter.send("sortATLView");
            return;
        }
        this.setNodeStateData(this.pk.node);
        this.node.active = true;
        this.canClick = false;
        this.canSure = false;
        this.txt_desc.node.active = false;
        this.txt_count.node.active = false;
        this.pk.play(this.aniName[0]);
        this.pk.on("finished", (event: cc.Event): void => {
            this.pk.off("finished");
            this.sure.node.active = false;
            this.pk.play(this.aniName[1]);
            this.canClick = true;
            this.downloadTimeOut();
        }, this);
    }

    playAni() {
        let info: pb.ToolsInfo = null;
        if (this.currentIndex >= 0 && this.currentIndex < this.msg.length) {
            info = this.msg[this.currentIndex];
        }

        // 道具类型不是门票, 则隐藏门票闪光节点
        if (info) {
            let blink: cc.Node = this.tik.node.getChildByName("ticket_blick_00000");
            blink.active = info.currency_type === 0;
        }

        this.isClick = false;
        this.canClick = false;
        this.tik.spriteFrame = this.downloadSpr.get(this.currentIndex);
        this.pk.stop();
        this.sure.node.active = true;
        this.pk.play(this.aniName[2]);
        this.pk.on("finished", (event: cc.Event): void => {
            this.pk.off("finished");
            this.canSure = true;

            // 显示数量
            if (info) {
                let count: number = info.qty;
                switch (info.currency_type) {
                    case 0: break;  // 门票
                    case 1:         // 积分
                    case 2:         // 金币
                    case 3:         // 小游戏币
                    case 4: {       // usdt
                        count = cv.StringTools.clientGoldByServer(count);
                        count = cv.StringTools.toFixed(count);
                    } break;
                    default: break;
                }

                if (count > 0) {
                    // 描述
                    let desc: string = cv.config.getStringData(`ticketview_txt_desc_${info.currency_type}`);
                    if (desc.length > 0) {
                        this.txt_desc.string = desc;
                        this.txt_desc.node.active = true;
                    }

                    // 数量
                    this.txt_count.string = `✕${count}`;
                    this.txt_count.node.active = true;
                }
            }
        }, this);
    }

    initLanguage() {
        let len = cv.StringTools.getArrayLength(this.wenzi);
        for (let i = 0; i < len; i++) {
            cv.resMgr.setSpriteFrame(this.wenzi[i].node, cv.config.getLanguagePath("hall/ticketView/wz_" + i));
        }
    }

    ReceiveToolsNotice(result: pb.ReceiveToolsNotice) {
        if (!TicketView.IS_VIEW || this.getData) return;
        this.getData = true;
        let len = cv.StringTools.getArrayLength(result.toolsInfos);
        if (len <= 0) {
            TicketView.IS_VIEW = false;
            cv.MessageCenter.send("sortATLView");
            return;
        }
        this.reset(false);
        this.msg = result.toolsInfos.slice(0);

        this.download();
        cv.MessageCenter.send("sortATLView");
    }

    ReceiveToolsResponse(result: pb.ReceiveToolsResponse) {
        if (result.error == 1) {
            this.currentIndex = this.currentIndex + 1;
            this.show();
        }
        else {
            TicketView.IS_VIEW = false;
            this.reset();
            cv.MessageCenter.send("sortATLView");
        }
    }

    download() {
        if (this.msg.length <= this.downloadIndex) return;
        let info = this.msg[this.downloadIndex];
        let url = cv.domainMgr.getServerInfo().image_server + (cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN ? info.imgAddr : info.imgAddrEn);
        let index = this.downloadIndex;

        cv.resMgr.loadRemote(url, (error: Error, resource: cc.Texture2D) => {
            console.log("TicketView url = " + url);
            if (index < this.downloadIndex) return;
            if (error) {
                let index = cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN ? 0 : 1;
                this.downloadSpr.add(this.downloadIndex, this.defaultImg[index]);
            }
            else {
                this.downloadSpr.add(this.downloadIndex, new cc.SpriteFrame(resource));
            }

            if (this.currentIndex == this.downloadIndex && this.isClick) {
                this.playAni();
            }
            this.downloadIndex = this.downloadIndex + 1;
            this.download();
        });
    }

    downloadTimeOut() {
        if (this.currentIndex === this.downloadIndex) {
            let index = cv.config.getCurrentLanguage() === LANGUAGE_TYPE.zh_CN ? 0 : 1;
            this.downloadSpr.add(this.downloadIndex, this.defaultImg[index]);
            this.downloadIndex = this.downloadIndex + 1;
            this.download();
        }
    }

    reset(isClose: boolean = true) {
        this.isClose = (isClose != false);
        this.pk.off("finished");
        this.pk.stop();
        this.node.active = false;
        this.canClick = false;
        this.isClick = false;
        this.canSure = false;
        this.downloadIndex = 0;
        this.currentIndex = 0;
        this.downloadSpr.clear();
        this.msg = [];
    }

    getNodeStateData(node: cc.Node) {
        let info = new NODE_SATE();
        info.position = node.position;
        info.rotation = node.angle;
        info.scale = cc.v2(node.scaleX, node.scaleY);
        info.opacity = node.opacity;
        this.stateMap.add(node.name, info);

        let len = node.childrenCount;
        for (let i = 0; i < len; i++) {
            this.getNodeStateData(node.children[i]);
        }
    }

    setNodeStateData(node: cc.Node) {
        let info = this.stateMap.get(node.name);
        if (info) {
            node.setPosition(info.position);
            node.angle = info.rotation;
            node.setScale(info.scale);
            node.opacity = info.opacity;
        }
        let len = node.childrenCount;
        for (let i = 0; i < len; i++) {
            this.setNodeStateData(node.children[i]);
        }
    }
}
