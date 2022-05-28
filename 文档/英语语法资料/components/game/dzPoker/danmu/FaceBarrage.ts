import cv from "../../../lobby/cv";
import { GameScene } from "./../GameScene";
import game_protocol = require("../../../../common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import DanmuView from "./DanmuView";
import ListView from "../../../../common/tools/ListView";
import { BarrageCountData } from "./../data/GameDataManager";
import BarrageHeadItem from "./BarrageHeadItem";
import { PlayerInfo } from "../data/RoomData";
import DanmuItem from "./DanmuItem";

const {ccclass, property} = cc._decorator;


enum TabType {
    txt = 0,
    user = 1,
}

//
//明星桌弹幕
//
@ccclass
export default class FaceBarrage extends cc.Component {
    @property(cc.Node) modalLayer: cc.Node = null;
    @property(cc.Node) controllerUi: cc.Node = null;
    @property(cc.Node) tabUi: cc.Node = null;
    @property(cc.Node) expressionUi: cc.Node = null;
    @property(cc.Node) inputUi: cc.Node = null;
    @property(cc.Node) contentUi: cc.Node = null;
    //input
    @property(cc.Node) stateBtn: cc.Node = null;
    @property(cc.Node) sendBtn: cc.Node = null;
    @property(cc.Node) inputNode: cc.Node = null;
    //content
    @property(cc.Node) barrageList: cc.Node = null;
    @property(cc.Node) userList: cc.Node = null;
    @property(cc.Node) maskBtn: cc.Node = null;
    @property(cc.Node) txtBtn: cc.Node = null;
    @property(cc.Node) atBtn: cc.Node = null;
    @property(cc.Node) descriptionNode: cc.Node = null;
    @property(cc.Node) descriptionTouch: cc.Node = null;
    @property(cc.Node) tipNode: cc.Node = null;
    //弹幕滚动层界面
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    //头像预制体
    @property(cc.Prefab) roleHeadItemPrefab: cc.Prefab = null;
    //国王表情预制体
    @property(cc.Prefab) face_ani_prefab: cc.Prefab = null;
    //飘弹幕的界面
    @property(cc.Prefab) danmu_Panel_prefab: cc.Prefab = null;
    //
    public mute: boolean = false; //禁言
    public muteTime: number = 0; //禁言时长
    //配置
    public canBarrage: boolean = true; //可发自定义弹幕总开关(与预制弹幕无关)
    public canInput: boolean = true; //桌上玩家可发自定义弹幕开关(与预制弹幕无关)
    public price: number = 0; //自定义弹幕价格(与预制弹幕无关)
    //
    faceArr: cc.Node[] = [];
    private _faceLen: number = 12;
    public onOff: boolean = true;
    //发送弹幕的冷却时间
    private _cdTime: number = 5;
    private _isInCd: boolean = false;
    private _danmu_view: cc.Node = null;
    //德州弹幕数量
    private DZPOKER_DANMU_COUNT = 23;
    private roleHeadItemList: BarrageHeadItem[] = [];
    private roleHeadDataList: PlayerInfo[] = [];
    public game: GameScene;
    //
    private _needUpdateUi: boolean = true;
    private _needUpdateUser: boolean = true;
    private _needUpdateTxt: boolean = true;
    private _needUpdateDes: boolean = true;
    private _atPlayer: any = null;
    private _atStr: string = "@";
    private _atStrEnd: string = " "; //at后面的空格
    private _autoHideTip: boolean = true;
    private _inputStringFormat: string = "<color=#ffab00>%s</color><color=#ffffff>%s</color>";
    private _inputStringMaxLen: number = 36;
    private _tabUiIndex: number = 0; //0=弹幕,1=表情

    onLoad() {
        this.hideUi();
        this.initScrollviewData();
        this.setPrice();
        this.initLanguage();

        this.descriptionTouch = cc.find("description_touch", this.contentUi);
        this.descriptionTouch.on(cc.Node.EventType.TOUCH_END, function(event) {
            this.hideDescription();
        }.bind(this));
        this.descriptionTouch._touchListener.setSwallowTouches(false); //touch事件穿透

        cv.gameNet.requestBarrageCount();
    }
    private initLanguage(): void {
        let width: number = cv.resMgr.getLabelStringSize(cc.find("btn_barrage/txt", this.tabUi).getComponent(cc.Label), cv.config.getStringData("Faceview_danmu_button_danmu")).width;
        cc.find("btn_barrage/line", this.tabUi).width = width;
        width = cv.resMgr.getLabelStringSize(cc.find("btn_expression/txt", this.tabUi).getComponent(cc.Label), cv.config.getStringData("Faceview_danmu_button_face")).width;
        cc.find("btn_expression/line", this.tabUi).width = width;
    }
    /**
     * 是否汉字(表意字)
     * @param char
     * @returns 
     */
    private chineseChar(char: string): boolean {
        if (!char) {
            return false;
        }
        //E000—F8FF 私用区
        let cp: number = char.codePointAt(0);
        if ((0x4E00 <= cp && cp <= 0x9FFF) ||
            (0x3400 <= cp && cp <= 0x4DBF) || (0x20000 <= cp && cp <= 0x2A6DF) ||
            (0x2A700 <= cp && cp <= 0x2B73F) || (0x2B740 <= cp && cp <= 0x2B81F) ||
            (0x2B820 <= cp && cp <= 0x2CEAF) || (0x2CEB0 <= cp && cp <= 0x2EBEF) ||
            (0x30000 <= cp && cp <= 0x3134F) || (0x2F00 <= cp && cp <= 0x2FDF) ||
            (0x2E80 <= cp && cp <= 0x2EFF) || (0xF900 <= cp && cp <= 0xFAFF) ||
            (0x2F800 <= cp && cp <= 0x2FA1F) || (0xE815 <= cp && cp <= 0xE86F) ||
            (0xE400 <= cp && cp <= 0xE5E8) || (0xE600 <= cp && cp <= 0xE6CF) ||
            (0x31C0 <= cp && cp <= 0x31EF) || (0x2FF0 <= cp && cp <= 0x2FFF) ||
            (0x3100 <= cp && cp <= 0x312F) || (0x31A0 <= cp && cp <= 0x31BF) ||
            (0x3000 <= cp && cp <= 0x303F) || (0xFF00 <= cp && cp <= 0xFFEF)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 返回字符串所占位置(数量)
     * 2个字节占1位置, 单个汉字强制占2位置
     * utf-16 编码规则:基本平面字符占2字节(\u0000-\uffff),辅助平面字符占4字节(\u010000-\u10ffff)
     * @param str
     * @returns 
     */
    private getStrLen(str: string): number {
        let charData: string = !str ? "" : str;
        let cnt: number = 0;
        if (charData.length == 0) {
            return cnt;
        }
        let charArr: string[] = Array.from(charData);
        let len: number = charArr.length;
        let cp: number = 0;
        let cpFFFF: number = 0xFFFF;
        for (let i = 0; i < len; ++i) {
            if (this.chineseChar(charArr[i])) {
                cnt += 2;
            } else {
                cp = charArr[i].codePointAt(0);
                if (cp > cpFFFF) {
                    cnt += 2; //辅助平面
                } else {
                    cnt += 1; //基本平面
                }
            }
        }
        return cnt;
    }
    // private subStrLen(str: string, len: number): string {
    //     if (typeof str != "string" || str.length == 0 || typeof len != "number" || len <= 0) {
    //         return "";
    //     }
    //     let strLen: number = str.length;
    //     let i: number = 0;
    //     let l: number = 0;
    //     for (; i < strLen && l < len; ++i) {
    //         let nAscii: number = str.charCodeAt(i);
    //         if (nAscii >= 0 && nAscii <= 127) {
    //             ++l;
    //         } else {
    //             l += 2;
    //         }
    //     }
    //     if (l > len) {
    //         i = i - 1 > 0? i -1 : i;
    //     }
    //     return str.substring(0, i);
    // }
    private hideTip(): void {
        this.tipNode.active = false;
    }
    private showTip(txt: string, time: number = -1): void {
        this.tipNode.stopAllActions();
        this.tipNode.active = true;
        let size: cc.Size = cv.resMgr.getLabelStringSize(cc.find("txt", this.tipNode).getComponent(cc.Label), txt);
        this.tipNode.setContentSize(size.width + 82 * 2, size.height + 11.29 * 2);
        // this.tipNode.getComponent(cc.Layout).updateLayout();
        // this.tipNode.getComponent(cc.Widget).updateAlignment();
        if (time > 0) {
            this._autoHideTip = true;
            this.tipNode.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.hideTip, this)));
        } else {
            this._autoHideTip = false;
        }
    }
    private hideDescription(): void {
        this.descriptionNode.active = false;
        this.descriptionTouch.active = false;
    }
    public showDescription(): void {
        this.descriptionNode.active = true;
        this.descriptionTouch.active = true;
        if (this._needUpdateDes) {
            this._needUpdateDes = false;
            let explanTxt: string = cv.config.getStringData("FaceBarrage_explan");
            let explanTxtArr: string[] = explanTxt.split('\n');
            if (explanTxtArr.length == 0) {
                return;
            }
            let tempNode: cc.Node = cc.find("item_node", this.descriptionNode);
            for (let i = 0; i < explanTxtArr.length; ++i) {
                let itemNode: cc.Node = cc.instantiate(tempNode);
                let size: cc.Size = cv.resMgr.getLabelStringSize(itemNode.children[1].getComponent(cc.Label), explanTxtArr[i]);
                itemNode.height = size.height;
                itemNode.active = true;
                this.descriptionNode.addChild(itemNode);
            }
        }
    }
    private selectTabList(tab: TabType): void {
        if (tab == TabType.txt) {
            this.selectTab(this.txtBtn, true);
            this.selectTab(this.atBtn, false);
            this.hideRoleHead();
            this.showScrollView();
        } else if (tab == TabType.user) {
            this.selectTab(this.atBtn, true);
            this.selectTab(this.txtBtn, false);
            this.hideScrollView();
            this.showRoleHead();
        }
        this._needUpdateUi = false;
    }
    private selectTab(tabNode: cc.Node, select: boolean): void {
        cc.find("icon_bg", tabNode).active = select;
        cc.find("icon_light", tabNode).active = select;
        cc.find("icon_dark", tabNode).active = !select;
    }

    private setStateBtn(): void {
        let sp: cc.Node = cc.find("state_on", this.stateBtn);
        let btn: cc.Button = this.stateBtn.getComponent(cc.Button);
        let onOff: boolean = cv.tools.isShowBarrage(); //客户端弹幕开关
        if (this.mute || !this.canCustomBarrage() || this._isInCd) {
            btn.interactable = false;
            btn.enabled = false;
            sp.active = false;
        } else if (!onOff) {
            btn.interactable = true;
            btn.enabled = true;
            sp.active = false;
        } else {
            btn.interactable = true;
            btn.enabled = true;
            sp.active = true;
        }
    }
    private setSendBtn(): void {
        let btn: cc.Button = this.sendBtn.getComponent(cc.Button);
        let onOff: boolean = cv.tools.isShowBarrage();
        if (this.mute || !this.canCustomBarrage() || this._isInCd || !onOff) {
            btn.interactable = false;
            btn.enabled = false;
        } else {
            btn.interactable = true;
            btn.enabled = true;
        }
    }
    private setInputBox(): void {
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let editBox: cc.EditBox = inputBox.getComponent(cc.EditBox);
        let content: cc.Node = cc.find("content_mask/content", this.inputNode);
        let price: cc.Node = cc.find("price", this.inputNode);
        let charNum: cc.Node = cc.find("char_num", this.inputNode);
        let onOff: boolean = cv.tools.isShowBarrage();
        let msg: string = null;
        content.active = true;
        cc.find("TEXT_LABEL", inputBox).opacity = 0;
        if (this.mute || !this.canCustomBarrage()) {
            editBox.string = "";
            this._atPlayer = null;
            inputBox.active = false;
            msg = cv.config.getStringData("FaceBarrage_input_txt_disable");
            cv.StringTools.setRichTextString(content, msg);
            price.active = false;
            charNum.active = false;
        } else if (this._isInCd) {
            editBox.string = "";
            this._atPlayer = null;
            inputBox.active = false;
            msg = cv.config.getStringData("FaceBarrage_input_txt_send_disable");
            cv.StringTools.setRichTextString(content, msg);
            price.active = false;
            charNum.active = false;
        } else if (!onOff) {
            editBox.string = "";
            this._atPlayer = null;
            inputBox.active = false;
            msg = cv.config.getStringData("FaceBarrage_danmu_off");
            cv.StringTools.setRichTextString(content, msg);
            price.active = false;
            charNum.active = false;
        } else { //输入框开启但不处于输入的情况下
            inputBox.active = true;
            msg = editBox.string;
            if (msg.length == 0) {
                msg = cv.config.getStringData("FaceBarrage_input_txt");
                cv.StringTools.setRichTextString(content, msg);
                price.active = true;
                charNum.active = false;
            } else {
                price.active = false;
                charNum.active = true;
                this.setCharNum(msg);
            }
        }
    }
    private setSelectHead(): void {
        let playerid: number = this._atPlayer? this._atPlayer.playerid : 0;
        for (let i = 0; i < this.roleHeadItemList.length; i++) {
            if (this.roleHeadItemList[i].getPlayerId() != 0 && this.roleHeadItemList[i].getPlayerId() == playerid) {
                this.roleHeadItemList[i].showSelectImg();
            } else {
                this.roleHeadItemList[i].hideSelectImg();
            }
        }
    }
    public onselect(playerid: number) {
        for (let i = 0; i < this.roleHeadItemList.length; i++) {
            if (this.roleHeadItemList[i].getPlayerId() != playerid) {
                this.roleHeadItemList[i].hideSelectImg();
            }
            else
            {
                this.roleHeadItemList[i].showSelectImg();
            }
        }
    }
    private setController(): void {
        this.setInputBox();
        this.setStateBtn();
        this.setSendBtn();
        this.setSelectHead();
    }
    private setPrice(): void {
        let temp: string = cv.StringTools.numToFloatString(this.price);
        cc.find("price", this.inputNode).getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("FaceBarrage_input_txt_price"), temp);
    }
    //adjust lock controller
    private lockController(lock: boolean): void {
        this.maskBtn.active = lock || this.currentCdStatus();
    }
    public currentCdStatus(): boolean {
        let onOff: boolean = cv.tools.isShowBarrage();
        return this.mute || !onOff || this._isInCd;
    }
    private addAtPlayer(atPlayer: any): void {
        if (this.currentCdStatus() || (this._atPlayer && this._atPlayer.playerid == atPlayer.playerid)) {
            return;
        }
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let editBox: cc.EditBox = inputBox.getComponent(cc.EditBox);
        let content: cc.Node = cc.find("content_mask/content", this.inputNode);
        let price: cc.Node = cc.find("price", this.inputNode);
        let charNum: cc.Node = cc.find("char_num", this.inputNode);
        let txt: string = editBox.string;
        let contentTxt: string = txt;
        if (this._atPlayer) {
            let atLen: number = this._atPlayer.name.length;
            atLen = txt[atLen] == this._atStrEnd? atLen + 1 : atLen;
            contentTxt = txt.substring(atLen); //去掉at player后真正的内容
        }
        this._atPlayer = atPlayer;
        contentTxt = this._atStrEnd + contentTxt;
        // if (this.getStrLen(atPlayer.name + contentTxt) > this._inputStringMaxLen) {
        //     //atPlayer.name不参与裁减
        //     contentTxt = this.subStrLen(contentTxt, this._inputStringMaxLen - this.getStrLen(atPlayer.name));
        // }
        editBox.string = atPlayer.name + contentTxt;
        let msg: string = cv.StringTools.formatC(this._inputStringFormat, atPlayer.name, contentTxt);
        content.getComponent(cc.RichText).string = msg;
        price.active = false;
        charNum.active = true;
        this.setCharNum(editBox.string);
    }
    private removeAtPlayer(): void {
        if (this.currentCdStatus() || !this._atPlayer) {
            return;
        }
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let editBox: cc.EditBox = inputBox.getComponent(cc.EditBox);
        let content: cc.Node = cc.find("content_mask/content", this.inputNode);
        let price: cc.Node = cc.find("price", this.inputNode);
        let charNum: cc.Node = cc.find("char_num", this.inputNode);
        let txt: string = editBox.string;
        let atLen: number = this._atPlayer.name.length;
        atLen = txt[atLen] == this._atStrEnd? atLen + 1 : atLen;
        let contentTxt: string = txt.substring(atLen);
        this._atPlayer = null;
        editBox.string = contentTxt;
        let msg: string = null;
        if (contentTxt.length == 0) {
            let canCusBarrage: boolean = this.canCustomBarrage();
            msg = !canCusBarrage? cv.config.getStringData("FaceBarrage_input_txt_disable") : cv.config.getStringData("FaceBarrage_input_txt");
            price.active = canCusBarrage;
            cv.StringTools.setRichTextString(content, msg);
            charNum.active = false;
        } else {
            msg = cv.StringTools.formatC(this._inputStringFormat, "", contentTxt);
            price.active = false;
            content.getComponent(cc.RichText).string = msg;
            charNum.active = true;
            this.setCharNum(contentTxt);
        }
    }
    private testEditAtPlayer(txt: string): PlayerInfo {
        if (txt == null || txt.length <= this._atStr.length) {
            return null;
        }
        let atPlayer: PlayerInfo = null;
        for (let i = 0; i < this.roleHeadDataList.length; ++i) {
            let regexp: RegExp = new RegExp("^" + this._atStr + this.roleHeadDataList[i].name);
            if (regexp.test(txt)) {
                atPlayer = this.roleHeadDataList[i];
                break;
            }
        }
        return atPlayer;
    }
    //输入框事件开始-----//
    public onEditBegin(text: string, editbox: cc.EditBox, customEventData: string) {
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let content: cc.Node = cc.find("content_mask/content", this.inputNode);
        let price: cc.Node = cc.find("price", this.inputNode);
        let charNum: cc.Node = cc.find("char_num", this.inputNode);
        cc.find("TEXT_LABEL", inputBox).opacity = 255;
        content.active = false;
        price.active = false;
        charNum.active = false;
    }
    public onTextChange(text: string, editbox: cc.EditBox, customEventData: string) {
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let editBox: cc.EditBox = inputBox.getComponent(cc.EditBox);
        let content: cc.Node = cc.find("content_mask/content", this.inputNode);
        // if (this.getStrLen(editBox.string) > this._inputStringMaxLen) {
        //     editBox.string = this.subStrLen(editBox.string, this._inputStringMaxLen);
        // }
        let txt: string = editBox.string;
        txt = txt.replace(/\r\n|\n/g, "");
        editBox.string = txt;
        let atPlayer: PlayerInfo = this.testEditAtPlayer(txt);
        //刷新 富文本
        let atPlayerTxt: string = "";
        let contentTxt: string = txt;
        if (atPlayer) {
            atPlayerTxt = this._atStr + atPlayer.name;
            contentTxt = txt.substring(atPlayerTxt.length);
            this._atPlayer = {name: atPlayerTxt, playerid: atPlayer.playerid};
        } else {
            this._atPlayer = null;
        }
        let msg: string = cv.StringTools.formatC(this._inputStringFormat, atPlayerTxt, contentTxt);
        content.getComponent(cc.RichText).string = msg;
        this.setCharNum(txt);
        //刷新 头像
        this.setSelectHead();
    }
    public onEditEnd(text: string, editbox: cc.EditBox, customEventData: string) {
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let editBox: cc.EditBox = inputBox.getComponent(cc.EditBox);
        let content: cc.Node = cc.find("content_mask/content", this.inputNode);
        let price: cc.Node = cc.find("price", this.inputNode);
        let charNum: cc.Node = cc.find("char_num", this.inputNode);
        cc.find("TEXT_LABEL", inputBox).opacity = 0;
        content.active = true;
        let msg: string = editBox.string;
        if (msg.length == 0) {
            msg = cv.config.getStringData("FaceBarrage_input_txt");
            cv.StringTools.setRichTextString(content, msg);
            price.active = true;
            charNum.active = false;
        } else {
            // cv.StringTools.setShrinkRichTextString(content, content.getComponent(cc.RichText).string, content.parent.width);
            price.active = false;
            charNum.active = true;
            // this.setCharNum(msg);
        }
    }
    //输入框事件结束-----//
    private setCharNum(str: string): void {
        let charNum: cc.Node = cc.find("char_num", this.inputNode);
        let len: number = this.getStrLen(str);
        let msg: string = cv.StringTools.formatC("%d/%d", len, this._inputStringMaxLen);
        charNum.getComponent(cc.Label).string = msg;
    }
    private setViewStyle(style: number): void {
        if (style == 0) {
            this.tabUi.active = false;
            this.inputUi.color = cc.color(25, 25, 33, 255);
            this.contentUi.height = 867;
            this.barrageList.height = 607 - 20;
            this.userList.height = 607;
            this.adjustRoleHead(0);
        } else if (style == 1) {
            this.tabUi.active = true;
            this.inputUi.color = cc.color(31, 33, 46, 255);
            this.contentUi.height = 747;
            this.barrageList.height = 487 - 20;
            this.userList.height = 487;
            this.adjustRoleHead(1);
        }
    }
    private setTabTxt(node: cc.Node, select: boolean): void {
        cc.find("txt", node).color = select? cc.color(251, 216, 136, 255) : cc.color(138, 139, 144, 255);
        cc.find("line", node).active = select;
    }
    private setUiTab(tab: number): void {
        this._tabUiIndex = tab;
        if (this._tabUiIndex == 0) {
            this.setTabTxt(cc.find("btn_barrage", this.tabUi), true);
            this.setTabTxt(cc.find("btn_expression", this.tabUi), false);
            this.inputUi.active = true;
            this.contentUi.active = true;
            this.expressionUi.active = false;
        } else {
            this.setTabTxt(cc.find("btn_barrage", this.tabUi), false);
            this.setTabTxt(cc.find("btn_expression", this.tabUi), true);
            this.inputUi.active = false;
            this.contentUi.active = false;
            this.expressionUi.active = true;
        }
    }
    public onBarrageTab(evt: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.setUiTab(0);
    }
    public onExpressionTab(evt: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.setUiTab(1);
    }
    public onTxtTab(evt: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.selectTabList(TabType.txt);
        this.hideDescription();
    }
    public onUserTab(evt: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        this.selectTabList(TabType.user);
        this.hideDescription();
    }
    public onHelpBtn(evt: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let vis: boolean = this.descriptionNode.active;
        if (vis) {
            this.hideDescription();
        } else {
            this.showDescription();
        }
    }
    public onSendBtn(evt: cc.Event): void {
        if (cv.dataHandler.getUserData().u32Chips < this.price) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode172"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        let inputBox: cc.Node = cc.find("input_box", this.inputNode);
        let editBox: cc.EditBox = inputBox.getComponent(cc.EditBox);
        //
        // editBox内容(限制字符数为36):
        //1 at列表
        //2 自定义文本(Emoji表情)
        //
        let txt: string = editBox.string;
        let contentTxt: string = txt;
        if (this._atPlayer) {
            contentTxt = txt.substring(this._atPlayer.name.length);
        }
        if (txt.length == 0 || contentTxt.length == 0) {
            cv.TT.showMsg(cv.config.getStringData("FaceBarrage_input_txt_empty"), cv.Enum.ToastType.ToastTypeSuccess);
            return;
        }
        if (this.getStrLen(txt) > this._inputStringMaxLen) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode1276"), cv.Enum.ToastType.ToastTypeSuccess);
            return;
        }
        let contentTxtNew: string = cv.StringTools.isSensitiveWords(contentTxt, true);
        contentTxt = contentTxtNew? contentTxtNew : contentTxt;
        //Specials (Unicode block)
        contentTxt = contentTxt.replace(new RegExp("[\ufff0-\uffff]", 'g'), '*');
        this.sendBarrage(contentTxt, game_pb.BarrageType.Enum_Custom);
    }
    public onStateBtn(evt: cc.Event): void {
        cv.AudioMgr.playButtonSound('button_click');
        let onOff: boolean = cv.tools.isShowBarrage();
        cv.tools.setShowBarrage(!onOff);
        this.clikcOnOff();
    }
    public onHideUi(evt: cc.Event): void {
        this.hideUi();
    }
    
    public onBarrageMute(muteObj: any): void {
        this.mute = muteObj.mute;
        this.muteTime = muteObj.time;
        //清理
        if (this._isInCd) {
            this._cdTime = 5;
            this._isInCd = false;
            this.unschedule(this.updateDanmuCd);
        }
        this.setController();
        this.unschedule(this.updateMuteTime);
        if (this.mute) {
            this.lockController(true);
            if (this.muteTime == -1) { //永久禁言
                this.showTip(cv.config.getStringData("ServerErrorCode1274"), 3);
            } else {
                this.showTip(cv.StringTools.formatC(cv.config.getStringData("FaceBarrage_danmu_disable"), this.secondToMinute(this.muteTime)));
                this.schedule(this.updateMuteTime, 10);
            }
        } else {
            this.lockController(false);
            this.hideTip();
        }
        cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
    }
    public onBarrageConfChange(confObj: any): void {
        this.canBarrage = confObj.canBarrage;
        this.canInput = confObj.canInput;
        this.price = confObj.price;
        this.setPrice();
        this.setController();
    }
    public onBarrageUpdate(confObj: any): void {
        this.canBarrage = confObj.canBarrage;
        this.canInput = confObj.canInput;
        this.price = confObj.price;
        this.setPrice();
        this.onBarrageMute({mute: confObj.mute, time: confObj.time});
    }
    private canCustomBarrage(): boolean {
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) { //桌上玩家
            return this.canBarrage && this.canInput;
        } else {
            return this.canBarrage;
        }
    }
    private secondToMinute(seconds: number): number {
        if (seconds < 0) {
            return 0;
        }
        return Math.ceil(seconds / 60.0);
    }
    /**
     * name
     */
    public onResetCdtime() {
        //设置发送cd状态
        this._isInCd = true;
        this._cdTime = 5;
        this.setController();
        this.lockController(true);
        cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
        this.schedule(this.updateDanmuCd, 1);
    }
    /**
     * setGameScene
     */
     public setGameScene(game: any) {
        this.game = game;
    }
    /**
     * 初始化头像
     */
    public initRoleHead() {
        for (let index = 0; index < 6; index++) { //明星桌最多6人
            let roleHead = cc.instantiate(this.roleHeadItemPrefab);
            roleHead.getComponent(BarrageHeadItem).setFaceView(this);
            roleHead.active = true;
            this.userList.addChild(roleHead);
            this.roleHeadItemList.push(roleHead.getComponent(BarrageHeadItem));
        }
    }
    private adjustRoleHead(viewStyle: number): void {
        let h: number = viewStyle == 1? 239 : 269;
        let y: number = viewStyle == 1? 112 : 128;
        let dh: number = viewStyle == 1? 250 : 279;
        let dw: number = this.userList.getContentSize().width * 0.5 - 202;
        let x: number = -dw;
        for (let i = 0; i < this.roleHeadItemList.length; ++i) {
            this.roleHeadItemList[i].selectImg.height = h;
            let roleHead: cc.Node = this.roleHeadItemList[i].node;
            roleHead.setPosition(x + dw * (i % 3), -(y + dh * Math.floor(i / 3)));
        }
    }

    /**
     * 显示头像
     */
    public showRoleHead() {
        this.userList.active = true;
        if (this._needUpdateUser) {
            this._needUpdateUser = false;
            let playerData: PlayerInfo[] = [];
            let len = cv.GameDataManager.tRoomData.kTablePlayerList.length;
            for (let i = 0; i < len; i++) {
                if (cv.GameDataManager.tRoomData.kTablePlayerList[i].playerid != cv.dataHandler.getUserData().u32Uid) {
                    playerData.push(cv.GameDataManager.tRoomData.kTablePlayerList[i]);
                }
            }
            this.roleHeadDataList = playerData;
            for (let index = 0; index < this.roleHeadItemList.length; index++) {
                if (index < playerData.length) {
                    this.roleHeadItemList[index].setData(playerData[index]);
                    this.roleHeadItemList[index].node.active = true;
                } else {
                    this.roleHeadItemList[index].clearData();
                    this.roleHeadItemList[index].node.active = false;
                }
            }
        }
    }
    private hideRoleHead(): void {
        this.userList.active = false;
    }
    /**
     * 点击@玩家头像
     *
     */
    public onclickRoleHead(playerid: number, isSelect: boolean) {
        let atPlayerItem: BarrageHeadItem = null;
        for (let i = 0; i < this.roleHeadItemList.length; i++) {
            this.roleHeadItemList[i].hideSelectImg();
            if (this.roleHeadItemList[i].getPlayerId() == playerid) {
                atPlayerItem = this.roleHeadItemList[i];
            }
        }
        if (atPlayerItem && isSelect) {
            this.addAtPlayer({name: this._atStr + atPlayerItem.getRoleName(), playerid: playerid});
            atPlayerItem.showSelectImg();
        } else {
            this.removeAtPlayer();
        }
    }

    start() {
        // this.barrageList.getComponent(ListView).bindScrollEventTarget(this);
        this.barrageList.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));

        this.initRoleHead();
        cv.MessageCenter.register("danmuItemClick", this.danmuItemClick.bind(this), this.node);
        cv.MessageCenter.register("getBarrageCountNotice", this.onGetCounts.bind(this), this.node);
        cv.MessageCenter.register("onClickDanmuSwitch", this.clikcOnOff.bind(this), this.node);
        cv.MessageCenter.register("resetCdTime",this.onResetCdtime.bind(this),this.node);
        cv.MessageCenter.register("barrageMute",this.onBarrageMute.bind(this),this.node);
        cv.MessageCenter.register("barrageConfChange",this.onBarrageConfChange.bind(this),this.node);
        cv.MessageCenter.register("barrageUpdate",this.onBarrageUpdate.bind(this),this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("danmuItemClick", this.node);
        cv.MessageCenter.unregister("getBarrageCountNotice", this.node);
        cv.MessageCenter.unregister("onClickDanmuSwitch", this.node);
        cv.MessageCenter.unregister("resetCdTime",this.node);
        cv.MessageCenter.unregister("barrageMute",this.node);
        cv.MessageCenter.unregister("barrageConfChange",this.node);
        cv.MessageCenter.unregister("barrageUpdate",this.node);
        cv.GameDataManager.clearBarrageData();
        this.unschedule(this.updateDanmuCd);
        this.unschedule(this.updateMuteTime);
    }

    public bindcallfunc(node: cc.Node, info, i) {
        node.getComponent(DanmuItem).updateItemData(info);
    }

    public getItemType(data, index) {
        return 0;
    }

    /**
     * onGetCounts
     */
    public onGetCounts() {
        cv.GameDataManager.sortBarrageData();
    }
    /**
     * 显示弹幕UI
     */
    public showScrollView() {
        this.barrageList.active = true;
        if (this._needUpdateTxt) {
            this._needUpdateTxt = false;
            this.barrageList.getComponent(ListView).notifyDataSetChanged(cv.GameDataManager.getBarrageData());
            cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
        } else if (this._needUpdateUi) {
            this.barrageList.getComponent(cc.ScrollView).scrollToTop(0); //控件bug:当t=0时不触发ui刷新
            this.barrageList.getComponent(ListView).notifyDataSetChanged(cv.GameDataManager.getBarrageData());
        }
    }
    public hideScrollView(): void {
        this.barrageList.active = false;
    }

    /**
     * 初始化数据
     */
    public initScrollviewData() {
        let len = this.DZPOKER_DANMU_COUNT;
        for (let index = 0; index < len; index++) {
            let data: BarrageCountData = new BarrageCountData();
            data.content = cv.config.getStringData(cv.StringTools.formatC("Faceview_danmu_text_%d", index));
            data.BarrageId = index;
            data.count = 0;
            cv.GameDataManager.addBarrageData(data);
        }
    }

    /**
     * 点击弹幕
     * @param event 
     */
    public danmuItemClick(params: any) {
        this.sendBarrage(params);
    }
    public sendBarrage(params: any, type: game_pb.BarrageType = game_pb.BarrageType.Enum_System) {
        cv.AudioMgr.playEffect("zh_CN/game/dzpoker/audio/danmu");
        if (this.currentCdStatus()) {
            return;
        }
        //设备cd状态
        this._isInCd = true;
        let atPlayer: any = this._atPlayer;
        this.setController();
        this.lockController(true);
        cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
        this.schedule(this.updateDanmuCd, 1);
        //自已
        let data: game_pb.NoticeSendBarrage = new game_pb.NoticeSendBarrage();
        data.content = cv.String(params);
        data.nickname = cv.dataHandler.getUserData().nick_name;
        data.playerid = cv.Number(cv.dataHandler.getUserData().user_id);
        data.thump_up_status = 1;
        data.ctype = type;
        let at_list: string[] = [];
        let at_uid_list: number[] = [];
        if (atPlayer) {
            at_list.push(atPlayer.name);
            at_uid_list.push(atPlayer.playerid);
        }
        data.at_list = at_list;
        //cv.GameDataManager.addDanmuMsg(data);
        this.controllerUi.active = false;
        //发送给服务器
        cv.gameNet.requestSendBarrage(cv.String(params), at_list, at_uid_list, 1, type);
    }

    public updateMuteTime(dt: number): void {
        this.muteTime -= dt;
        if (this.muteTime <= 0) {
            cv.GameDataManager.tRoomData.muteCustomBarrageSeconds = 0; //在DanmuView中使用到
            this.muteTime = 0;
            this.mute = false;
            this.setController();
            this.lockController(false);
            this.hideTip();
            cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
            this.unschedule(this.updateMuteTime);
        } else {
            this.showTip(cv.StringTools.formatC(cv.config.getStringData("FaceBarrage_danmu_disable"), this.secondToMinute(this.muteTime)));
        }
    }
    /**
     * 刷新cd时间
     */
    public updateDanmuCd() {
        this._cdTime -= 1;
        if (this._cdTime <= 0) {
            this._cdTime = 5;
            this._isInCd = false;
            //this.updateCdStatus();
            this.setController();
            this.lockController(false);
            this.hideTip();
            cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
            this.unschedule(this.updateDanmuCd);
        } else {
            this.showTip(cv.StringTools.formatC(cv.config.getStringData("Faceview_danmu_cd_tips"), this._cdTime));
        }
    }

    /**
     * 点击弹幕开关
     */
    public clikcOnOff() {
        cv.MessageCenter.send("danmu_onOff", cv.tools.isShowBarrage());
        this.setController();
        if (cv.tools.isShowBarrage()) {
            this.lockController(false);
            this.showTip(cv.config.getStringData("Faceview_danmu_button_on"), 3);
        } else {
            this.lockController(true);
            this.showTip(cv.config.getStringData("Faceview_danmu_button_off"), 3);
        }
        cv.MessageCenter.send("updateCdStatus", this.currentCdStatus());
    }
    
    /**
     * 显示ui
     */
    public showUi() {
        this.controllerUi.active = true;
        this.modalLayer.active = true;
        this._needUpdateUser = true;
        this._needUpdateUi = true;
        cc.find("input_box", this.inputNode).getComponent(cc.EditBox).string = "";
        this._atPlayer = null;
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            this.setViewStyle(1);
            this.setTabTxt(cc.find("btn_barrage", this.tabUi), true);
            this.setTabTxt(cc.find("btn_expression", this.tabUi), false);
            this.updateEmotionNeedCoin();
            this.setUiTab(this._tabUiIndex);
        } else {
            this.setViewStyle(0);
            this.inputUi.active = true;
            this.contentUi.active = true;
            this.expressionUi.active = false;
            this._tabUiIndex = 0;
        }
        this.setController();
        this.selectTabList(TabType.txt);
        this.hideDescription();
        if (this._autoHideTip) {
            this.hideTip();
        }
    }
    /**
     *  hideUi
     */
    public hideUi() {
        this.controllerUi.active = false;
        this.modalLayer.active = false;
    }
    //国王表情 start
    public faceItemClick(event: cc.Event, customEventData: string): void {
        if (cv.GameDataManager.tRoomData.i32SelfSeat != -1) {
            let node: cc.Node = event.currentTarget;
            let index = cv.Number(node.name.slice(5));
            cv.gameNet.RequestSendChat(cv.GameDataManager.tRoomData.u32RoomId, cv.Enum.ChatType.Enum_Emoji, cv.String(index));//(index+ 6)%12);
        }
        this.hideUi();
    }
    public showFaceAni(pos: cc.Vec2, aniIndex: number, scale: number = 1): cc.Node {
        if (cv.tools.isSoundEffectOpen()) {
            cv.AudioMgr.playEffect(cv.StringTools.formatC("zh_CN/game/dzpoker/audio/voice_%d", aniIndex + 1));
        }
        this.hideAniBySameWorldPos(pos);
        let face_ani = this.getFaceAni();
        pos = face_ani.parent.convertToNodeSpaceAR(pos);
        face_ani.setPosition(pos.x, pos.y);//+ 50
        face_ani.scale = scale;
        let index = (aniIndex + 6) % 12;
        face_ani.getComponent(cc.Animation).play("face_" + index);
        return face_ani;
    }
    public getFaceAni(): cc.Node {
        let face_ani: cc.Node = null;
        let len = this.faceArr.length;
        for (let i = 0; i < len; i++) {
            if (!this.faceArr[i].active) {
                face_ani = this.faceArr[i];
                break;
            }
        }
        if (!face_ani) {
            face_ani = cc.instantiate(this.face_ani_prefab);
            //this.node.parent.addChild(face_ani);
            this.game.gameMain_panel.addChild(face_ani);
            this.faceArr.push(face_ani);
            face_ani.setScale(1.6);
            face_ani.getComponent(cc.Animation).on("finished", (event: cc.Event): void => {
                face_ani.active = false;
            }, this);
        }
        face_ani.active = true;
        return face_ani;
    }
    public hideAniBySameWorldPos(worldPos: cc.Vec2) {
        let len = this.faceArr.length;
        for (let i = 0; i < len; i++) {
            let tempPos = this.faceArr[i].parent.convertToWorldSpaceAR(this.faceArr[i].getPosition());
            if (Math.abs(tempPos.x - worldPos.x) < 1 && Math.abs(tempPos.y - worldPos.y) < 1) {
                this.faceArr[i].active = false;
            }
        }
    }
    public updateEmotionNeedCoin() {
        for (let i = 0; i < this._faceLen; i++) {
            let goldNum = cc.find(cv.StringTools.formatC("face_%d/goldImg/goldText", i), this.expressionUi).getComponent(cc.Label);
            let img = cc.find(cv.StringTools.formatC("face_%d/goldImg", i), this.expressionUi);
            let num = cv.GameDataManager.tRoomData.kingBee;
            if (num <= 0) {
                img.active = false;
                goldNum.node.active = false;
            }
            else {
                img.active = true;
                goldNum.node.active = true;
                goldNum.string = cv.StringTools.serverGoldToShowString(num);
            }
        }
    }
    //国王表情 end
    /**
    * 设置弹幕的父节点()
    * @param node 
    */
    public setParentNode(node: cc.Node) {
        if (node) {
            this._danmu_view = cc.instantiate(this.danmu_Panel_prefab);
            this._danmu_view.getComponent(DanmuView).setParentNode(node);
        }
    }

    public setDanmuChanel(pos: any) {
        if (this._danmu_view) {
            this._danmu_view.getComponent(DanmuView).setDanmuChanel(pos);
        }
    }

    public adjustDanmuMaxNumber(max: number) {
        if (this._danmu_view) {
            this._danmu_view.getComponent(DanmuView).adjustDanmuMaxNumber(max);
        }
    }
}
