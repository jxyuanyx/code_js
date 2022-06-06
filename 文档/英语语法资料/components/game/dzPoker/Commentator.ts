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

const {ccclass, property} = cc._decorator;

@ccclass
export default class Commentator extends cc.Component {

    @property(cc.Sprite)
    spOff: cc.Sprite = null;

    @property(cc.Sprite)
    spOn: cc.Sprite = null;

    @property(cc.Sprite)
    spIcon: cc.Sprite = null;

    @property(cc.Label)
    txtChannel: cc.Label = null;

    @property(cc.Node)
    animNode: cc.Node = null;

    @property(cc.Button)
    btnTalk: cc.Button = null;

    @property(cc.Node)
    channelSetting: cc.Node = null;

    private role: number = 0; //0=默认 1=听众 2=播音员
    private openMike: boolean = false; //true=开麦 false=关麦 (控制开关)
    private volume: number = 0; //音量
    private anim: cc.Animation = null;
    //0=静音 1=中文频道 2=英文频道 3=越南文频道 4=泰文频道 5=阿拉伯频道 6=印地文频道
    private audioChannels: number[] = []; //(听众能够接收的播音)频道
    private audioChannelKeys = ["mute", "ch", "en", "yn", "th", "ab", "hd"];
    private audioChannel: number = 0;
    private audioChannelMute: number = 0; //静音
    private channelItems: cc.Node[] = [];
    private itemColor1: cc.Color = cc.color(59, 59, 59, 255);
    private itemColor2: cc.Color = cc.color(160, 160, 160, 255);

    onLoad () {
        this.role = 0;
        this.openMike = false;
        this.volume = 0;
        this.btnTalk.node.on("click", this.onTalk, this);
        this.anim = this.animNode.getComponent(cc.Animation);
        let layerTouch: cc.Node = cc.find("layer_touch", this.node);
        layerTouch.on(cc.Node.EventType.TOUCH_END, function(event) {
            this.channelSetting.active = false;
        }.bind(this));
        layerTouch._touchListener.setSwallowTouches(false); //touch事件穿透
    }

    private onTalk(evt: cc.Event.EventCustom): void {
        this.btnTalk.interactable = false;
        this.btnTalk.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function() {
            this.btnTalk.interactable = true;
        }.bind(this))));
        //
        if (this.role == 2) {
            cv.gameNet.requestOpenMike(this.openMike? 0 : 1);
        } else if (this.role == 1) {
            let len: number = this.audioChannels.length;
            if (len > 1) {
                this.channelSetting.active = !this.channelSetting.active;
            } else if (len == 1) {
                let channel: number = this.audioChannel == this.audioChannelMute? this.audioChannels[0] : this.audioChannelMute;
                this.onAudioChannel(channel);
            }
        }
    }
    setRole(role: number, channels: number[] = null) {
        if (this.role != 0) {
            console.log("setRole::已经设置角色");
            return;
        }
        this.role = (role == 2)? 2 : 1;
        this.audioChannels = (channels != null)? channels : [];
        this.updateChannelSetting();
    }
    getRole(): number {
        return this.role;
    }
    public setViewStyle(style: number): void {
        let view_1 = cc.find("view_1", this.node);
        let view_2 = cc.find("view_2", this.node);
        let view_cur = null;
        if (style == 1) {
            view_1.active = true;
            view_2.active = false;
            view_cur = view_1;
        } else {
            view_1.active = false;
            view_2.active = true;
            view_cur = view_2;
        }
        this.spIcon = cc.find("sprite_Icon", view_cur).getComponent(cc.Sprite);
        this.spOff = cc.find("sprite_off", view_cur).getComponent(cc.Sprite);
        this.spOn = cc.find("sprite_on", view_cur).getComponent(cc.Sprite);
    }
    public isEnableMike(): boolean {
        return this.openMike;
    }
    public enableMike(enable: boolean): void {
        this.openMike = enable;
        this.spOff.node.active = !enable;
        if (this.audioChannels.length > 1) {
            this.spOn.node.active = false;
            this.spIcon.node.active = enable;
            this.txtChannel.node.active = enable;
        } else {
            this.spOn.node.active = enable;
            this.spIcon.node.active = false;
            this.txtChannel.node.active = false;
        }
    }
    public setAudioVolume(volume: number): void {
        volume = volume > 0? 1 : 0;
        if (this.volume == volume) {
            return;
        }
        if (volume > 0) {
            this.animNode.active = true;
            let animState: cc.AnimationState = this.anim.play();
            animState.wrapMode = cc.WrapMode.Loop;
            animState.repeatCount = Infinity;
            this.volume = 1;
        } else {
            this.animNode.active = false;
            this.anim.stop();
            this.volume = 0;
        }
    }
    public getAudioVolume(): number {
        return this.volume;
    }
    private updateChannelSetting(): void {
        let len: number = this.audioChannels.length;
        if (len <= 1) {
            return;
        }
        //
        let channelMute: cc.Node = cc.find("channel_mute", this.channelSetting);
        channelMute.on("click", () => {
            this.onAudioChannel(this.audioChannelMute);
        }, this);
        this.channelItems.push(channelMute);
        //
        // let channelItem: cc.Node = cc.find("channel_item", this.channelSetting);
        let channelList: cc.ScrollView = cc.find("channel_list", this.channelSetting).getComponent(cc.ScrollView);
        let channelHeight: number = cc.find("channel_item_1", channelList.content).height;
        let channelY: number = 0;
        let channelNum: number = 0;
        let channelViewStatus = [false, false, false, false, false, false];
        for (let i = 0; i < len; ++i) {
            let channel: number = this.audioChannels[i];
            let itemNode: cc.Node = cc.find("channel_item_" + channel, channelList.content);
            if (itemNode) {
                ++channelNum;
                channelViewStatus[channel - 1] = true;
                cc.find("num", itemNode).getComponent(cc.Label).string = "" + (i + 1);
                channelY -= channelHeight * 0.5;
                itemNode.setPosition(cc.v2(0, channelY));
                itemNode.active = true;
                channelY -= (channelHeight * 0.5 + 30);
                itemNode.on("click", () => {
                    this.onAudioChannel(channel);
                }, this);
            }
            this.channelItems.push(itemNode);
        }
        for (let i = 0; i < channelViewStatus.length; ++i) {
            if (!channelViewStatus[i]) {
                let itemNode: cc.Node = cc.find("channel_item_" + (i + 1), channelList.content);
                itemNode.active = false;
            }
        }
        let viewHeight: number = (channelHeight + 30) * channelNum - 30;
        channelList.content.height = viewHeight;
        viewHeight = channelNum > 4? ((channelHeight + 30) * 4 - 30) : viewHeight;
        channelList.content.parent.height = viewHeight;
        channelList.content.parent.getComponent(cc.Mask).enabled = (channelNum > 4);
        channelList.node.height = viewHeight;
    }
    private onAudioChannel(channel: number): void {
        this.enableMike(channel != this.audioChannelMute);
        this.setAudioChannel(channel);
        this.channelSetting.active = false;
    }
    private getAudioChannelIndex(channel: number): number {
        for (let i = this.audioChannels.length - 1; i >= 0; --i) {
            if (this.audioChannels[i] == channel) {
                return i;
            }
        }
        return -1;
    }
    private enableAllChannelItems(): void {
        for (let i = this.channelItems.length - 1; i >= 0; --i) {
            this.enableChannelItem(this.channelItems[i], true);
        }
    }
    private enableChannelItem(node: cc.Node, enable: boolean): void {
        if (node == null) {
            return;
        }
        node.getComponent(cc.Button).interactable = enable;
        if (cc.find("num", node)) {
            cc.find("num", node).color = enable? this.itemColor1 : this.itemColor2;
        }
    }
    public setAudioChannel(channel: number): void {
        if (this.role != 0) {
            this.audioChannel = channel;
            this.enableAllChannelItems();
            if (channel == this.audioChannelMute) {
                this.enableChannelItem(this.channelItems[0], false);
                this.txtChannel.getComponent(cc.Label).string = "";
            } else {
                let index: number = this.getAudioChannelIndex(channel);
                this.txtChannel.getComponent(cc.Label).string = "" + (index + 1);
                if (index >= 0) {
                    this.enableChannelItem(this.channelItems[index + 1], false);
                }
            }
            cv.MessageCenter.send("commentatorChannel", channel);
        }
    }
    public getAudioChannel(): number {
        return this.audioChannel;
    }
}
