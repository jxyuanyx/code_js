import cv from "../../components/lobby/cv";

class TipData {
    txt: string = "";
    msgType: number = 0;
    isLaba: boolean = false;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class TipsArray extends cc.Component {
    private errorMsg: cc.Prefab = null;
    private errorMsgNew: cc.Prefab = null;
    private arr: Array<cc.Node> = [];
    private arrNew: Array<cc.Node> = [];
    private currentNode: cc.Node = null;
    private rootNode: cc.Node = null;
    private rootNodeNew: cc.Node = null;
    private initPos: cc.Vec2 = cc.v2(0, -45);
    private dataArr: Array<TipData> = [];
    private isRun: boolean = false;

    preloadRes(callback: Function): void {
        let count: number = 0;
        cv.resMgr.load("zh_CN/commonPrefab/errorMsg", cc.Prefab, (prefab: cc.Prefab): void => {
            if (++count >= 2) {
                if (callback) callback();
            }
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);

        cv.resMgr.load("zh_CN/commonPrefab/errorMsgNew", cc.Prefab, (prefab: cc.Prefab): void => {
            if (++count >= 2) {
                if (callback) callback();
            }
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        this.errorMsg = cv.resMgr.get("zh_CN/commonPrefab/errorMsg", cc.Prefab);
        this.errorMsgNew = cv.resMgr.get("zh_CN/commonPrefab/errorMsgNew", cc.Prefab);
    }

    onDestroy() {
    }

    public reset() {
        if (!this.rootNode) return;
        cv.resMgr.adaptWidget(this.rootNode, true);
        let offsetY = cv.config.IS_IPHONEX_SCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //如果是Android系统，类似华为mate30 pro这样的刘海屏手机（分辨率为width x height : 1176x2400  IS_IPHONEX_SCREEN的值为false），
            //也需要下移，防止提示语被刘海屏遮挡。所以通过IS_FULLSCREEN判断。
            offsetY = cv.config.IS_FULLSCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
        }

        console.log("cv.config.WIDTH：" + cv.config.WIDTH + " cc.winsize.width：" + cc.winSize.width);
        console.log("this.rootNode.x" + this.rootNode.x);

        this.rootNode.setPosition(cc.winSize.width * 0.5, cv.config.DESIGN_HEIGHT > cv.config.DESIGN_WIDTH ? cv.config.HEIGHT - offsetY : cv.config.HEIGHT * 0.5);
    }

    public showMsg(txt: string, msgType: number, isLaba: boolean = false) {
        if (cv.StringTools.getArrayLength(txt) <= 0 || this.errorMsg == null) return;
        let msg = new TipData();
        msg.txt = txt;
        msg.msgType = msgType;
        msg.isLaba = isLaba;
        this.dataArr.push(msg);
        this.checkTipsView();
    };

    private checkTipsView() {
        if (this.isRun) return;
        let len = cv.StringTools.getArrayLength(this.dataArr);
        if (len <= 0) return;
        let msg = this.dataArr.shift();
        this.isRun = true;
        this.getErrorNode();
        if (cv.config.DESIGN_WIDTH < cv.config.DESIGN_HEIGHT) {
            cv.resMgr.setSpriteFrame(this.currentNode, "zh_CN/common/icon/common_tips_bg");
            this.currentNode.setContentSize(cv.config.WIDTH, this.currentNode.height);
        }
        else {
            cv.resMgr.setSpriteFrame(this.currentNode, "zh_CN/common/icon/common_tips_bg_1");
            this.currentNode.setContentSize(cv.config.WIDTH * 0.5, this.currentNode.height);
        }
        this.showError(this.currentNode, msg.txt, msg.msgType, msg.isLaba);
    }

    public showMsgNew(txt: string) {
        if (cv.StringTools.getArrayLength(txt) <= 0 || this.errorMsgNew == null) return;
        let node = this.createNodeNew(txt);
        if (node == null) return;
        let label = cc.find("bg/dos", node).getComponent(cc.Label);

        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            label.fontSize = 50;
            label.lineHeight = 70;
        } else {
            label.fontSize = 40;
            label.lineHeight = 56;
        }
        let bg = cc.find("bg", node);
        label.string = txt;
        let height = cv.resMgr.getLabelStringSize(label).height;
        bg.setContentSize(cc.size(bg.width, height + 251));
        this.showNewMsglist();
    };

    private showNewMsglist() {
        if (this.arrNew.length <= 0) return;
        if (!this.arrNew[0].active) {
            let node = this.arrNew[0];
            node.active = true;
            node.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(0.2), cc.callFunc((): void => {
                let node = this.arrNew.shift();
                node.removeFromParent(true);
                node.destroy();
                this.showNewMsglist();
            }, this)));
        }
    }

    private getErrorNode() {
        if (this.arr.length > 0) {
            for (var i = 0; i < this.arr.length; i++) {
                if (!this.arr[i].active) {
                    this.currentNode = this.arr[i];
                    return;
                }
            }
        }
        this.createNode();
    };

    private createNode() {
        if (this.rootNode == null) {
            this.rootNode = new cc.Node();
            this.rootNode.setContentSize(cv.config.WIDTH, 0);
            cc.game.addPersistRootNode(this.rootNode);
            this.rootNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_TT;
            let offsetY = cv.config.IS_IPHONEX_SCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                //如果是Android系统，类似华为mate30 pro这样的刘海屏手机（分辨率为width x height : 1176x2400  IS_IPHONEX_SCREEN的值为false），
                //也需要下移，防止提示语被刘海屏遮挡。所以通过IS_FULLSCREEN判断
                offsetY = cv.config.IS_FULLSCREEN ? cv.config.FULLSCREEN_OFFSETY : 0;
            }
            this.rootNode.setPosition(cc.winSize.width * 0.5, cv.config.DESIGN_HEIGHT > cv.config.DESIGN_WIDTH ? cv.config.HEIGHT - offsetY : cv.config.HEIGHT * 0.5);
        }

        var msgNode = cc.instantiate(this.errorMsg);
        this.rootNode.addChild(msgNode);
        this.arr.push(msgNode);
        this.currentNode = msgNode;
        cv.resMgr.adaptWidget(this.currentNode);
        this.initPos = cc.find("content", this.currentNode).getPosition();
    };


    private createNodeNew(txt: string): cc.Node {
        if (this.rootNodeNew == null) {
            this.rootNodeNew = new cc.Node();
            this.rootNodeNew.setContentSize(cv.config.WIDTH, cv.config.HEIGHT);
            cc.game.addPersistRootNode(this.rootNodeNew);
            this.rootNodeNew.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_TT_new;
            this.rootNodeNew.setPosition(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5);
        }

        if (this.arrNew.length > 0 && this.arrNew[0].active) {
            let label = cc.find("bg/dos", this.arrNew[0]).getComponent(cc.Label);
            if (label.string == txt) {
                return null;
            }
        }

        var msgNode = cc.instantiate(this.errorMsgNew);
        this.rootNodeNew.addChild(msgNode);
        cv.resMgr.adaptWidget(msgNode);
        msgNode.active = false;
        this.arrNew.push(msgNode);
        return msgNode;
    };

    private showError(node: cc.Node, txt: string, msgType: number, isLaba: boolean = false) {
        if (typeof txt === "undefined" || txt === "") {
            console.log("Error: TipsArray txt is empty");
        }
        node.active = true;
        var content = cc.find("content", node);
        content.setPosition(this.initPos);
        content.getComponent(cc.Label).string = cv.String(txt);
        content.opacity = 200;
        content.color = cc.color(208, 202, 157);

        var close_button = cc.find("close_button", node);
        var time_text = cc.find("times", node);

        if (!isLaba) {
            close_button.active = false;
            time_text.active = false;
            content.getComponent(cc.Label).fontSize = 42;
            time_text.getComponent(cc.Label).fontSize = 42;
        } else {
            close_button.active = true;
            time_text.active = true;
            content.getComponent(cc.Label).fontSize = 30;
            time_text.getComponent(cc.Label).fontSize = 30;
        }

        let textSize = cv.resMgr.getLabelStringSize(content.getComponent(cc.Label));
        let moveWidth = cv.config.DESIGN_WIDTH;


        var enterAction = cc.fadeIn(0.3);
        var pauseAction = cc.delayTime(0.7);
        var outAction = cc.fadeOut(1.0);
        var hideAction = cc.callFunc(() => {
            node.active = false;
            this.isRun = false;
            this.checkTipsView();
        }, this);

        if (isLaba) {
            let _time = 5;
            let _timeStr = time_text.getComponent(cc.Label)
            _timeStr.string = cv.StringTools.formatC("(%d)", _time);
            let showTime = cc.delayTime(1);
            let pkCall = cc.callFunc(() => {
                _time--;
                if (_time > 0) {
                    _timeStr.string = cv.StringTools.formatC("(%d)", _time);
                } else {
                    time_text.stopAllActions();
                    node.active = false;
                    this.isRun = false;
                    this.checkTipsView();
                }
            }, this);
            time_text.runAction(cc.repeat(cc.sequence(showTime, pkCall), 6));

            close_button.targetOff(this);
            close_button.on("click", (event: cc.Event): void => {
                time_text.stopAllActions();
                node.stopAllActions();
                content.stopAllActions();
                content.opacity = 255;
                node.active = false;

                this.isRun = false;
                this.checkTipsView();
            }, this);
        }

        content.runAction(cc.fadeIn(0));
        time_text.setPosition(cc.v2(content.getPosition().x + content.getContentSize().width / 2 + time_text.getContentSize().width / 2, time_text.getPosition().y));
        close_button.setPosition(cc.v2(node.getBoundingBox().size.width / 2 - close_button.getContentSize().width / 2 - 50, close_button.getPosition().y));
        if (moveWidth < textSize.width) {

            let text = content;
            let offsetX = textSize.width - moveWidth + 50;
            let _moveTime = isLaba ? 4 : offsetX / 100; //每分钟移动100像素
            let pos = cc.v2(text.getPosition().x + offsetX / 2 + 10, text.getPosition().y);
            text.setPosition(pos);
            let moveAction = cc.moveTo(_moveTime, cc.v2(pos.x - offsetX, pos.y));

            if (!isLaba) {
                let _beginTime = enterAction.getDuration() + pauseAction.getDuration();
                content.runAction(cc.sequence(cc.delayTime(_beginTime), moveAction));
                node.runAction(cc.sequence(enterAction, pauseAction, cc.delayTime(_moveTime), cc.delayTime(0.3), outAction, hideAction));
            }

        } else {

            if (isLaba) {
                node.runAction(cc.sequence(enterAction, pauseAction));
            } else {
                node.runAction(cc.sequence(enterAction, pauseAction, outAction, hideAction));
            }

        }


    };

    private static instance: TipsArray;

    public static getInstance(): TipsArray {
        if (!this.instance || !this.instance.rootNode || !cc.isValid(this.instance.rootNode, true)) {
            this.instance = new TipsArray();
        }
        return this.instance;
    };
}