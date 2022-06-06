import cv from "../../components/lobby/cv";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export enum PushNoticeType {
    PUSH_ERROR = 0,
    PUSH_LOBBY,			// 大厅
    PUSH_WORLD,			// 全局
    PUSH_TEXAS,			// 德州扑克
    PUSH_COWBOY,		// 德州牛仔
    PUSH_HUMANBOY,		// 百人德州
    PUSH_ALLIN,			// allin or fold
    PUSH_VIDEOCOWBOY,	// 视频牛仔
    PUSH_ZOOM_TEXAS,	// 极速德州
    PUSH_BET,			// 必下
    PUSH_POKERMASTER,   // 扑克大师
    PUSH_JACKFRUIT,     // 菠萝蜜
    PUSH_PLO,           // 奥马哈
    PUSH_STAR_SEAT,     // 明星桌
};

export class PushNoticeData {
    str: string = "";
    msgType: PushNoticeType[] = [];
};
const { ccclass, property } = cc._decorator;

@ccclass
export class PushNotice extends cc.Component {

    private static instance: PushNotice;
    private prefab: cc.Prefab = null;
    private msgNode: cc.Node = null;
    private _pushNotice_panel: cc.Node = null;
    private _bPuchNoticeIsShowIng: boolean = false;
    private _notice_text: cc.RichText = null;
    private _notice_text_1: cc.RichText = null;
    private _notice_bg: cc.Sprite = null;
    private _pushType: number = 0;
    private m_pushNoticeList: PushNoticeData[] = [];
    public static getInstance(): PushNotice {
        if (!this.instance || !this.instance.msgNode || !cc.isValid(this.instance.msgNode, true)) {
            this.instance = new PushNotice();
        }
        return this.instance;
    };

    getPushNotice(): PushNoticeData[] {
        return this.m_pushNoticeList;
    }

    addPushNotice(pushNoticeData: PushNoticeData): void {
        if (cv.StringTools.getArrayLength(pushNoticeData.str) > 0) {
            this.m_pushNoticeList.push(pushNoticeData);
        }
    }

    earseFirstPushNotice(): void {
        this.m_pushNoticeList.splice(0, 1);
    }

    setPushNoticeType(type: number): void {
        if (this._pushNotice_panel) {
            this.setPushType(type);
        }
    }

    hideNoticeLayer(isView?: boolean) {
        isView = isView == true ? true : false;
        if (this._pushNotice_panel) {
            this._pushNotice_panel.active = false;
        }

    }

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/PushNotice", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/PushNotice", cc.Prefab);
        this.prefab = prefab;
        this._bPuchNoticeIsShowIng = false;
        let rootNode: cc.Node = cc.instantiate(this.prefab);
        cc.game.addPersistRootNode(rootNode);
        rootNode.setAnchorPoint(cc.v2(0.5, 0.5));
        rootNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_TT;
        this._pushNotice_panel = (rootNode.getChildByName("PushNotice_panel"));
        this._notice_text = (this._pushNotice_panel.getChildByName("notice_text")).getComponent(cc.RichText);
        this._notice_text_1 = (this._pushNotice_panel.getChildByName("notice_text_1")).getComponent(cc.RichText);
        this._notice_bg = this._pushNotice_panel.getChildByName("notice_bg").getComponent(cc.Sprite);
        this._pushNotice_panel.active = (false);
        let offsetY = cv.config.IS_IPHONEX_SCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //如果是Android系统，类似华为mate30 pro这样的刘海屏手机（分辨率为width x height : 1176x2400  IS_IPHONEX_SCREEN的值为false），
            //也需要下移，防止提示语被刘海屏遮挡。所以通过IS_FULLSCREEN判断。
            offsetY = cv.config.IS_FULLSCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
        }
        cv.resMgr.adaptWidget(rootNode, true);
        rootNode.setPosition(rootNode.x, rootNode.y - offsetY);
        this.msgNode = rootNode;
        this.schedule(this.Update.bind(this), 1.0);
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
    }

    onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
    }

    public reset() {
        if (!this.msgNode) return;
        cv.resMgr.adaptWidget(this.msgNode, true);
        this._notice_text.node.stopAllActions();
        this._notice_text_1.node.stopAllActions();
        this.hidePushNotice();
        let offsetY = cv.config.IS_IPHONEX_SCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //如果是Android系统，类似华为mate30 pro这样的刘海屏手机（分辨率为width x height : 1176x2400  IS_IPHONEX_SCREEN的值为false），
            //也需要下移，防止提示语被刘海屏遮挡。所以通过IS_FULLSCREEN判断。
            offsetY = cv.config.IS_FULLSCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
        }
        this.msgNode.setPosition(this.msgNode.x, this.msgNode.y - offsetY);
        let currentScene: string = cv.config.getCurrentScene();
        if (currentScene === cv.Enum.SCENE.LOADING_SCENE
            || currentScene === cv.Enum.SCENE.LOGIN_SCENE
            || currentScene === cv.Enum.SCENE.COWBOY_SCENE
            || currentScene === cv.Enum.SCENE.VIDEOCOWBOY_SCENE
            || currentScene === cv.Enum.SCENE.HUMANBOY_SCENE
            || currentScene === cv.Enum.SCENE.POKERMASTER_SCENE) {
            this.msgNode.active = false;
        }
        else {
            this.msgNode.active = true;
        }

    }

    Update(num: number): void {
        if (this.getPushNotice().length > 0 && !this._bPuchNoticeIsShowIng) {
            this.showPushNotice();
        }
        else {
            this._pushNotice_panel.active = (this._bPuchNoticeIsShowIng);
        }
    }

    getMessage(): string {
        if (this.getPushNotice().length > 0) {
            let data = this.getPushNotice()[0];
            if (this._pushType == PushNoticeType.PUSH_ERROR)					// 如果是不显示跑马灯的场景  抛弃掉
            {
                this.earseFirstPushNotice();
                return this.getMessage();
            }
            else {
                let len: number = data.msgType.length;
                for (let i = 0; i < len; i++) {
                    // 如果是全局消息 则全场景显示
                    if (data.msgType[i] === PushNoticeType.PUSH_WORLD) {
                        // 百人牛仔特殊处理
                        if (this._pushType === PushNoticeType.PUSH_COWBOY
                            || this._pushType === PushNoticeType.PUSH_HUMANBOY
                            || this._pushType === PushNoticeType.PUSH_VIDEOCOWBOY
                            || this._pushType === PushNoticeType.PUSH_POKERMASTER) {
                            cv.MessageCenter.send("showMedalMsg", data.str);
                            this.earseFirstPushNotice();
                            return "";
                        }
                        else {
                            return data.str;
                        }
                    }
                    // 指定场景匹配显示（包括大厅）
                    else if (data.msgType[i] === this._pushType) {
                        // 百人牛仔特殊处理
                        if (this._pushType === PushNoticeType.PUSH_COWBOY
                            || this._pushType === PushNoticeType.PUSH_HUMANBOY
                            || this._pushType === PushNoticeType.PUSH_VIDEOCOWBOY
                            || this._pushType === PushNoticeType.PUSH_POKERMASTER) {
                            cv.MessageCenter.send("showMedalMsg", data.str);
                            this.earseFirstPushNotice();
                            return "";
                        }
                        else {
                            return data.str;
                        }
                    }
                    // 遍历后不匹配抛弃
                    else if (i === len - 1) {
                        this.earseFirstPushNotice();
                        return this.getMessage();
                    }
                }
            }
        }

        return "";
    }

    showPushNotice(): void {
        let text = this.getMessage();
        if (cv.StringTools.getArrayLength(text) > 0) {
            if (cc.director.getActionManager().getNumberOfRunningActionsInTarget(this._notice_text.node) > 0) return;
            this._bPuchNoticeIsShowIng = true;
            this._pushNotice_panel.active = (true);
            let strData = this.getPushNotice()[0].str;
            let strList = cv.StringTools.getStringListByLength(this._notice_text.node, this.getPushNotice()[0].str);
            this._notice_text.string = strList[0];
            //this._notice_text_1.string = strData.substr(index, strData.length);
            // 如果长度在第一个控件的显示范围内  则给第二个控件赋值为空格（直接赋值""会有显示BUG  导致显示上一次的内容）
            if (strList.length < 2) {
                this._notice_text_1.string = " ";
            } else {
                this._notice_text_1.string = strList[1];
            }
            let labelWidth = cv.resMgr.getRichTextStringSize(this._notice_text).width;
            let labelWidth1 = cv.resMgr.getRichTextStringSize(this._notice_text_1).width;
            this._notice_text.node.setPosition(this._pushNotice_panel.getContentSize().width, this._notice_text.node.y);
            this._notice_text_1.node.setPosition(this._notice_text.node.x + labelWidth, this._notice_text.node.y);
            // 跑马灯经过一个屏幕宽度的单位时间(可用来调整播放速度)
            let time = 4;
            time = time + (labelWidth + labelWidth1) / (this._pushNotice_panel.getContentSize().width / time);
            let moveTo = cc.moveTo(time, cc.v2(-(labelWidth + labelWidth1) - this._pushNotice_panel.getContentSize().width, this._notice_text.node.y));
            let moveTo1 = cc.moveTo(time, cc.v2(-labelWidth1 - this._pushNotice_panel.getContentSize().width, this._notice_text.node.y));
            let callBack = cc.callFunc(this.moveCallBack.bind(this, this._notice_text));
            this._notice_text.node.runAction(moveTo);
            this._notice_text_1.node.runAction(cc.sequence(moveTo1, callBack));
        }
        else {
            this.hidePushNotice();
        }
    }
    hidePushNotice() {
        this._bPuchNoticeIsShowIng = false;
        this._pushNotice_panel.active = (false);
    }

    moveCallBack(): void {
        this.earseFirstPushNotice();
        this._bPuchNoticeIsShowIng = false;
    }

    Adaptation(): void {
        let size = cc.director.getScene().getContentSize();
        if (size.height > size.width)//竖屏
        {
            let offset = 1;
            if (cv.config.IS_FULLSCREEN) {
                offset = (size.height - cv.config.FULLSCREEN_OFFSETY) / size.height;
            }
            cv.resMgr.setSpriteFrame(this._notice_bg.node, "zh_CN/common/icon/common_notice_bg");
            this._notice_bg.node.setContentSize(cc.size(size.width, this._notice_bg.node.getContentSize().height));
            this._pushNotice_panel.setContentSize(this._notice_bg.node.getContentSize());
            this._notice_bg.node.setPosition(cc.v2(this._notice_bg.node.getContentSize().width / 2, 0));
            this._pushNotice_panel.setPosition(cc.v2(size.width / 2, (size.height - this._pushNotice_panel.getContentSize().height / 2 - 5) * offset));
        }
        else//横屏
        {
            cv.resMgr.setSpriteFrame(this._notice_bg.node, "zh_CN/common/icon/common_notice_bg_1");
            this._pushNotice_panel.setContentSize(this._notice_bg.node.getContentSize());
            this._notice_bg.node.setPosition(cc.v2(this._notice_bg.node.getContentSize().width / 2, 0));
            this._pushNotice_panel.setPosition(cc.v2(size.width / 2, size.height / 2));
        }
    }

    setPushType(type: number): void {
        this._pushType = type;
    }

    public OnAppEnterBackground() {
        this.m_pushNoticeList = [];
        this._notice_text.node.stopAllActions();
        this._notice_text_1.node.stopAllActions();
        this.hidePushNotice();
    }

    getPushTypeFromGameId(gameID: number): PushNoticeType {
        switch (gameID) {
            case cv.Enum.GameId.Texas:
                return PushNoticeType.PUSH_TEXAS;
            case cv.Enum.GameId.StarSeat:
                return PushNoticeType.PUSH_STAR_SEAT;
            case cv.Enum.GameId.Allin:
                return PushNoticeType.PUSH_ALLIN;
            case cv.Enum.GameId.Bet:
                return PushNoticeType.PUSH_BET;
            case cv.Enum.GameId.Plo:
                return PushNoticeType.PUSH_PLO;
        }

        if (gameID >= cv.Enum.GameId.ZoomTexas && gameID <= cv.Enum.GameId.ZoomTexasMax) {
            return PushNoticeType.PUSH_ZOOM_TEXAS;
        }
    }
}
