// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../components/lobby/cv";
const { ccclass, property } = cc._decorator;

@ccclass
export class TipsPanel extends cc.Component {

    private tipsMsg: cc.Prefab = null;
    private sureCallback: Function = null;
    private cancelCallback: Function = null;
    private msgNode: cc.Node = null;
    public cutDownNode: cc.Node = null;
    public cutDownIcon: cc.Node = null;
    public bgPanel: cc.Node = null;
    public down_txt: cc.Node = null;
    public time: number = 0;
    private _panelTag: string = null;
    private message_text_positionY: number = 305;
    private button_common_y: number = -197;
    public NOT_RESET_TAG = "NOT_RESET_TAG";

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/TipsPanel", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/TipsPanel", cc.Prefab);
        this.msgNode = cc.instantiate(prefab);
        cc.game.addPersistRootNode(this.msgNode);
        //this.msgNode.setPosition(cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5));
        this.msgNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_TT;

        cc.find("gold_button", this.msgNode).on("click", this.onBtnSureClick, this);  //只有一个金色按钮
        cc.find("gray_button", this.msgNode).on("click", this.onBtnSureClick, this);  //只有一个灰色按钮

        cc.find("sure_button", this.msgNode).on("click", this.onBtnSureClick, this);  //右边确定按钮
        cc.find("cancel_button", this.msgNode).on("click", this.onBtnCancelClick, this);  //左边取消按钮

        this.down_txt = cc.find("bgPanel/cutDown/content", this.msgNode);
        this.cutDownNode = cc.find("bgPanel/cutDown", this.msgNode);
        this.cutDownIcon = cc.find("bgPanel/cutdownIcon", this.msgNode)
        this.bgPanel = cc.find("bgPanel", this.msgNode);
        this.msgNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { event.stopPropagation(); });
        this.msgNode.active = false;
        this.showMsgMail(false);
        //cc.find("lastMoney_text", this.msgNode).active = false;//功能未完
        this.initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.msgNode);
        let message_text = cc.find("bgPanel/message_text", this.msgNode);
        this.message_text_positionY = message_text.y;
        this.button_common_y = cc.find("sure_button", this.msgNode).y;
    }

    onDestroy(): void {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    public recharge() {
        cc.find("cancel_button/Label", this.msgNode).getComponent(cc.Label).string = cv.config.getStringData("GameDomanShop_recharge_txt");
    }

    public reset() {
        if (!this.msgNode) return;
        cv.resMgr.adaptWidget(this.msgNode, true);
        //this.msgNode.setPosition(cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5));
        if (this._panelTag != this.NOT_RESET_TAG) {
            this.hideTipsPanel();//隐藏跨场景弹框
        }
    }

    initLanguage() {
        cc.find("gold_button/Label", this.msgNode).getComponent(cc.Label).string = cv.config.getStringData("Confirm");
        cc.find("cancel_button/Label", this.msgNode).getComponent(cc.Label).string = cv.config.getStringData("Cancel");
        cc.find("sure_button/Label", this.msgNode).getComponent(cc.Label).string = cv.config.getStringData("Confirm");
    }

    public showImage(isVisible: boolean) {
        isVisible = (typeof isVisible === "undefined") ? false : isVisible;
        cc.find("edit_text", this.msgNode).active = isVisible;
        cc.find("bg", this.msgNode).active = isVisible;
    };

    public showMsgMail(isVisible: boolean) {
        isVisible = (typeof isVisible === "undefined") ? false : isVisible;
        cc.find("Image_duanxin", this.msgNode).active = isVisible;
    };

    public getEditBoxString(): string {
        return cc.find("edit_text", this.msgNode).getComponent(cc.EditBox).string;
    }

    public getEditBox(): cc.EditBox {
        return cc.find("edit_text", this.msgNode).getComponent(cc.EditBox);
    }

    /*公用弹框
      content: 显示的文本内容
      btnStyle: 弹框显示的按钮风格
                cv.Enum.ButtonStyle.TWO_BUTTON: 显示两个按钮，  如："取消" "确定"
                cv.Enum.ButtonStyle.GOLD_BUTTON: 显示一个按钮， 按钮是金色背景
                cv.Enum.ButtonStyle.GRAY_BUTTON: 显示一个按钮， 按钮是灰色背景
     callback:  按钮回调函数, 两个按钮时，右边按钮回调。 以及单个按钮时按钮回调。
     cancelCallback： 两个按钮时候左边的响应按钮

     needEditBox: 是否显示输入框。 
     titleString: 显示标题内容，如果缺省，表示不显示标题，标题背景将被隐藏
    _horizontalAlign: 文本对齐的方式，默认为居中对齐
                cc.Label.HorizontalAlign.LEFT: 左对齐
                cc.Label.HorizontalAlign.CENTER: 居中对齐
                cc.Label.HorizontalAlign.RIGHT:  靠右对齐
    */
    public showMsg(content: string, btnStyle: number,
        callback: Function, cancelCallback?: Function,
        needEditBox: boolean = false, titleString: string = "",
        horizontalAlign: number = cc.Label.HorizontalAlign.CENTER) {
        if (!this.msgNode) return;
        cc.find("gray_button", this.msgNode).active = false;
        this._panelTag = null;
        this.cutDownNode.active = false;
        this.cutDownIcon.active = false;

        cv.MessageCenter.send("HideWebview_ShowWindows");
        cv.MessageCenter.send("hide_bombInfoTips");
        cv.native.SYwebCloseChildWebview();
        this.msgNode.active = true;
        this.sureCallback = callback;
        this.cancelCallback = cancelCallback;
        this.showImage(needEditBox);
        this.showMsgMail(false);
        this.setButtonText(cv.Enum.ButtonType.TWO_BUTTON);
        cc.find("edit_text", this.msgNode).getComponent(cc.EditBox).string = "";
        cc.find("edit_text", this.msgNode).getComponent(cc.EditBox).placeholder = "";
        cc.find("titleBg/title", this.msgNode).getComponent(cc.Label).string = titleString;
        cc.find("titleBg", this.msgNode).active = titleString != "";
        cc.find("image_bg", this.msgNode).active = false;

        //倒计时弹框和消息显示弹框的高度不一样
        this.bgPanel.setContentSize(cc.size(this.bgPanel.getContentSize().width, 520));

        let message_text = cc.find("bgPanel/message_text", this.msgNode);
        message_text.color = cc.color(225, 225, 225);
        message_text.setContentSize(780, 280);

        message_text.y = this.message_text_positionY;
        this.setCurretnButtonPosY(this.button_common_y);

        let temp_text = cc.find("bgPanel/temp_text", this.msgNode);
        temp_text.getComponent(cc.Label).string = content;
        let _labelWidth = cv.resMgr.getLabelStringSize(temp_text.getComponent(cc.Label), content).width
        temp_text.active = false;

        let lineCount = _labelWidth / message_text.getContentSize().width;
        //根据效果图，多行文本，内容显示都是固定长度 780 x 280 。所以message_text采用shrink模式。
        //因为通过\n判断当前文本多少行是不准确的（文本控件自动换行是没有\n），所以通过一个临时temp_text来计算实际长度，来大致计算行数。
        //当临时temp_text渲染文本的width大于780的时候，此时是有多行的。
        //（message_text采用shrink属性，返回的width是固定的780, height固定是280。 不能得到实际宽度）

        //按照需求效果： 文本默认是居中对齐  
        //              小于等于2行的情况下，fontSize是48。 大于2行情况fontSize是40
        let _messageLabel = message_text.getComponent(cc.Label);
        if (lineCount <= 2) {
            //小于等于2行
            _messageLabel.fontSize = 47;
            _messageLabel.lineHeight = 67;
        } else {
            _messageLabel.fontSize = 40;
            _messageLabel.lineHeight = 56;
        }

        _messageLabel.horizontalAlign = horizontalAlign;  //对齐方式
        _messageLabel.string = cv.StringTools.calculateAutoWrapString(message_text, content);


        switch (btnStyle) {
            case cv.Enum.ButtonStyle.TWO_BUTTON:   //显示左右两个按钮
                cc.find("gold_button", this.msgNode).active = false;
                cc.find("gray_button", this.msgNode).active = false;
                cc.find("cancel_button", this.msgNode).active = true;
                cc.find("sure_button", this.msgNode).active = true;
                break;

            case cv.Enum.ButtonStyle.GOLD_BUTTON:   //显示一个金色按钮
                cc.find("gold_button", this.msgNode).active = true;
                cc.find("gray_button", this.msgNode).active = false;
                cc.find("cancel_button", this.msgNode).active = false;
                cc.find("sure_button", this.msgNode).active = false;
                break;

            case cv.Enum.ButtonStyle.GRAY_BUTTON:  //显示一个灰色按钮
                cc.find("gold_button", this.msgNode).active = false;
                cc.find("gray_button", this.msgNode).active = true;
                cc.find("cancel_button", this.msgNode).active = false;
                cc.find("sure_button", this.msgNode).active = false;
                break;
        }
    };



    /*公用弹框
    content: 显示的文本内容
     callback:  按钮回调函数, 两个按钮时，右边按钮回调。 以及单个按钮时按钮回调。
     cancelCallback： 两个按钮时候左边的响应按钮
     needEditBox: 是否显示输入框。
     titleString: 显示标题内容，如果缺省，表示不显示标题，标题背景将被隐藏
    */
    public showTimeMsg(content: string, callback: Function, cancelCallback?: Function, needEditBox: boolean = false,
        titleString: string = "") {
        if (!this.msgNode) return;
        this.cutDownNode.active = true;
        this.cutDownIcon.active = true;
        this.time = 15;
        this.down_txt.getComponent(cc.RichText).string = cv.StringTools.formatC(cv.config.getStringData("dialog_cutdown_sec"), this.time);
        this.schedule(this.scheduleUpdate, 1);
        cc.find("sure_button", this.msgNode).active = false;
        cv.MessageCenter.send("HideWebview_ShowWindows");
        cv.MessageCenter.send("hide_bombInfoTips");
        cv.native.SYwebCloseChildWebview();
        let sure1_button = cc.find("sure_button", this.msgNode);
        this._panelTag = null;

        this.msgNode.active = true;
        this.sureCallback = callback;
        this.cancelCallback = cancelCallback;
        this.showImage(needEditBox);
        this.showMsgMail(false);
        this.setButtonText(cv.Enum.ButtonType.TWO_BUTTON);
        let lb = cc.find("Label", sure1_button)
        lb.getComponent(cc.Label).string = cv.config.getStringData("TipsPanel_sure0_button");
        lb.getComponent(cc.Label).fontSize = 50;
        cc.find("edit_text", this.msgNode).getComponent(cc.EditBox).string = "";
        cc.find("edit_text", this.msgNode).getComponent(cc.EditBox).placeholder = "";
        cc.find("titleBg/title", this.msgNode).getComponent(cc.Label).string = titleString;
        cc.find("titleBg", this.msgNode).active = titleString != "";

        this.bgPanel.setContentSize(cc.size(this.bgPanel.getContentSize().width, 545));

        let message_text = cc.find("bgPanel/message_text", this.msgNode);
        message_text.color = cc.color(222, 97, 97);

        message_text.setContentSize(780, 112);

        let temp_text = cc.find("bgPanel/temp_text", this.msgNode);
        temp_text.getComponent(cc.Label).string = content;
        let _labelWidth = cv.resMgr.getLabelStringSize(temp_text.getComponent(cc.Label), content).width
        temp_text.active = false;

        let lineCount = _labelWidth / message_text.getContentSize().width;

        let _messageLabel = message_text.getComponent(cc.Label);
        if (lineCount < 2) {
            //如果只有1行
            _messageLabel.fontSize = 48;
            _messageLabel.lineHeight = 67;
        } else {
            _messageLabel.fontSize = 40;
            _messageLabel.lineHeight = 56;
        }

        _messageLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        _messageLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        message_text.setPosition(message_text.x, this.message_text_positionY - 25);    //根据效果图，倒计时文本的y坐标要比普通弹框靠下
        this.setCurretnButtonPosY(this.button_common_y - 19);  //根据效果图，倒计弹框操作按钮的y坐标要比普通弹框靠下
        _messageLabel.string = content;

        cc.find("gold_button", this.msgNode).active = false;
        cc.find("cancel_button", this.msgNode).active = true;
        cc.find("sure_button", this.msgNode).active = true;
    };



    //隐藏公用弹框上面的按钮
    //btnStyle: 需要隐藏弹框显示的按钮风格
    //      cv.Enum.ButtonStyle.TWO_BUTTON:  隐藏两个按钮
    //      cv.Enum.ButtonStyle.GOLD_BUTTON:  隐藏金色按钮
    //      cv.Enum.ButtonStyle.GRAY_BUTTON:  隐藏灰色按钮
    public hideDialogButton(btnStyle: number) {
        switch (btnStyle) {
            case cv.Enum.ButtonStyle.TWO_BUTTON:   //显示左右两个按钮
                cc.find("gold_button", this.msgNode).active = false;
                cc.find("gray_button", this.msgNode).active = false;
                break;

            case cv.Enum.ButtonStyle.GOLD_BUTTON:   //显示一个金色按钮
                cc.find("gold_button", this.msgNode).active = false;
                break;

            case cv.Enum.ButtonStyle.GRAY_BUTTON:  //显示一个灰色按钮
                cc.find("gray_button", this.msgNode).active = false;
                break;
        }
    }

    //设置当前弹框的Tag
    public setTag(tag: string) {
        this._panelTag = tag;
    }

    //获取当前弹框的Tag
    public getTag() {
        return this._panelTag;
    }

    //设置按钮提示语
    setButtonText(btnType) {

        let _gold_button = cc.find("gold_button", this.msgNode).getChildByName("Label").getComponent(cc.Label);  //单个金色按钮
        let _gray_button = cc.find("gray_button", this.msgNode).getChildByName("Label").getComponent(cc.Label);  //单个灰色按钮

        let _sureBtnTxt = cc.find("sure_button", this.msgNode).getChildByName("Label").getComponent(cc.Label);  //确定按钮
        let _cancleBtnTxt = cc.find("cancel_button", this.msgNode).getChildByName("Label").getComponent(cc.Label);  //取消按钮

        switch (btnType) {
            case cv.Enum.ButtonType.TWO_BUTTON_FOLD:
                _sureBtnTxt.string = cv.config.getStringData("Zoom_button_text_2");
                _cancleBtnTxt.string = cv.config.getStringData("Zoom_button_text_1");
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_FOLD_LOOK:
                _sureBtnTxt.string = cv.config.getStringData("Zoom_button_text_2");
                _cancleBtnTxt.string = cv.config.getStringData("Zoom_button_text_3");
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_SILIAO_TIPS:
                _sureBtnTxt.string = cv.config.getStringData("siyu_btn_look");
                _cancleBtnTxt.string = cv.config.getStringData("TipsPanel_cancel_button");
                break;
            case cv.Enum.ButtonType.TWO_BUTTON_BUYIN_TIPS:
                _sureBtnTxt.string = cv.config.getStringData("TipsPanel_sure_button");
                _cancleBtnTxt.string = cv.config.getStringData("GameDomanShop_recharge_txt");
                let message_text = cc.find("bgPanel/message_text", this.msgNode);
                message_text.getComponent(cc.Label).lineHeight = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? 50 : 40;
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_LIMIT_TIPS:  //新手带入限制弹框
                _sureBtnTxt.string = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_sure_button");
                _cancleBtnTxt.string = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_cancel_button");
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_PAUSE_GAME_TIPS:  //牌局暂停弹框
                _gold_button.string = cv.config.getStringData("GameScene_pausePoker_panel_start_button");
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_OPEN_Security_Box:
                _sureBtnTxt.string = cv.config.getStringData("Safe_deposit_immediately");
                _cancleBtnTxt.string = cv.config.getStringData("Safe_continue_takeout");
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_MY_RED_PACKETS:
                _cancleBtnTxt.string = cv.config.getStringData("TipsPanel_cancel_button");
                _sureBtnTxt.string = cv.config.getStringData("TipsPanel_sure_button_redepackets");
                break;
            case cv.Enum.ButtonType.TWO_BUTTON_MTT_FRAME:
                _cancleBtnTxt.string = cv.config.getStringData("MTT_frame_know");
                _sureBtnTxt.string = cv.config.getStringData("MTT_frame_enter");
                break;

            case cv.Enum.ButtonType.TWO_BUTTON_NETWORK:
                _gold_button.string = cv.config.getStringData("Hotupdate_retrybtn"); //重试
                break;
            case cv.Enum.ButtonType.TWO_BUTTON_SWITCH_TABLE:
                _cancleBtnTxt.string = cv.config.getStringData("MiniGames_Exit");
                _sureBtnTxt.string = cv.config.getStringData("MiniGames_Switch_table");
                break;
            default:
                //默认值
                _gold_button.string = cv.config.getStringData("TipsPanel_sure_button");
                _cancleBtnTxt.string = cv.config.getStringData("TipsPanel_cancel_button");
                _sureBtnTxt.string = cv.config.getStringData("TipsPanel_sure0_button");
                _gray_button.string = cv.config.getStringData("TipsPanel_sure0_button");
                break;
        }


    }

    //设置按钮坐标
    private setCurretnButtonPosY(posY: number) {
        cc.find("gold_button", this.msgNode).y = posY;
        cc.find("gray_button", this.msgNode).y = posY;
        cc.find("cancel_button", this.msgNode).y = posY;
        cc.find("sure_button", this.msgNode).y = posY;
    }

    getMessageImage() {
        return cc.find("Image_duanxin", this.msgNode).getComponent(cc.Sprite);
    }
    getMessageImageText(): cc.Label {
        return cc.find("Image_duanxin/text_duanxin", this.msgNode).getComponent(cc.Label);
    }
    getMessageText() {
        if (this.msgNode != null) {
            return cc.find("bgPanel/message_text", this.msgNode).getComponent(cc.Label)
        }
    }

    setMessageText(str: string) {
        let message_text = cc.find("bgPanel/message_text", this.msgNode);
        message_text.color = cc.color(225, 225, 225);
        message_text.setContentSize(780, 280);

        let temp_text = cc.find("bgPanel/temp_text", this.msgNode);
        temp_text.getComponent(cc.Label).string = str;
        let _labelWidth = cv.resMgr.getLabelStringSize(temp_text.getComponent(cc.Label), str).width
        temp_text.active = false;

        let lineCount = _labelWidth / message_text.getContentSize().width;
        let _messageLabel = message_text.getComponent(cc.Label);
        if (lineCount <= 2) {
            //小于等于2行
            _messageLabel.fontSize = 48;
            _messageLabel.lineHeight = 67;
        } else {
            _messageLabel.fontSize = 40;
            _messageLabel.lineHeight = 56;
        }

        _messageLabel.string = cv.StringTools.calculateAutoWrapString(message_text, str);
    }

    hideTipsPanel() {
        if (this && this.msgNode && cc.isValid(this.msgNode, true)) {
            this.msgNode.active = false;
        }
    }

    getVisible(): boolean {
        if (this && this.msgNode && cc.isValid(this.msgNode, true)) {
            return this.msgNode.active;
        }
        else
            return false;
    }

    hideTipsByDelay() {
        if (this.msgNode) {
            let panel = this.msgNode;
            this.unschedule(this.scheduleUpdate);
            panel.active = false;
        }
        cv.MessageCenter.send("showSportsScene");
    }

    private onBtnSureClick() {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.sureCallback != null) {
            this.sureCallback(cc.find("edit_text", this.msgNode).getComponent(cc.EditBox));
        }

        this.hideTipsByDelay();
    };

    private onBtnCancelClick() {
        cv.AudioMgr.playButtonSound('button_click');
        if (this.cancelCallback != null) {
            this.cancelCallback(cc.find("edit_text", this.msgNode).getComponent(cc.EditBox));
        }
        this.hideTipsByDelay();
    };

    private static instance: TipsPanel;

    public static getInstance(): TipsPanel {
        if (!this.instance || !this.instance.msgNode || !cc.isValid(this.instance.msgNode, true)) {
            this.instance = new TipsPanel();
        }
        return this.instance;
    }

    public scheduleUpdate(nbr: number) {
        this.time = this.time - 1;
        if (this.time >= 0) {
            this.down_txt.getComponent(cc.RichText).string = cv.StringTools.formatC(cv.config.getStringData("dialog_cutdown_sec"), this.time);
        } else {
            this.onBtnCancelClick();
        }
    }

    public haveMsgNode(): boolean {
        if (!this || !this.msgNode || !cc.isValid(this.msgNode, true)) {
            return false;
        }
        return true;
    }
}
