import cv from "../../lobby/cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import ModifyPassword from "./ModifyPassword";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";

enum eSafeListType {
    SAFE_TYPE_NONE = 0,
    SAFE_TYPE_DEPOSIT,
    SAFE_TYPE_TAKEOUT,
    SAFE_TYPE_DETAIL
}

export enum safeType {
    GOLD = 0,
    USDT
}

const { ccclass, property } = cc._decorator;
@ccclass
export class Safe extends cc.Component {
    @property(cc.Button) safe_instruct_btn: cc.Button = null;

    @property(cc.Button) gold_btn: cc.Button = null;
    @property(cc.Button) usdt_btn: cc.Button = null;
    @property(cc.Label) gold_lab: cc.Label = null;
    @property(cc.Label) usdt_lab: cc.Label = null;

    @property(cc.Sprite) deposit_img_gold: cc.Sprite = null;
    @property(cc.Sprite) deposit_img_usdt: cc.Sprite = null;

    @property(cc.Node) bg_normal: cc.Node = null;
    @property(cc.Node) bg_twoPsd: cc.Node = null;

    @property(cc.Button) deposit_btn: cc.Button = null;
    @property(cc.Button) takeout_btn: cc.Button = null;
    @property(cc.Button) detail_btn: cc.Button = null;

    @property(cc.Node) deposit_panel: cc.Node = null;
    @property(cc.Node) detail_panel: cc.Node = null;

    @property(cc.Node) takeout: cc.Node = null;
    @property(cc.Node) instruct: cc.Node = null;

    @property(cc.Node) depositbg: cc.Node = null;
    @property(cc.Node) detailbg: cc.Node = null;
    @property(cc.Node) takeoutbg: cc.Node = null;

    @property(cc.Node) threebg: cc.Node = null;

    @property(cc.Button) threeCloseBtn: cc.Button = null;
    @property(cc.Button) instructCloseBtn: cc.Button = null;

    //page1
    @property(cc.Node) accountgold_txt: cc.Node = null;
    @property(cc.Node) accountgold_text: cc.Node = null;
    @property(cc.Node) safebalance_txt: cc.Node = null;
    @property(cc.Node) safebalance_text: cc.Node = null;
    @property(cc.Label) deposit_txt: cc.Label = null;
    @property(cc.Node) deposit_text: cc.Node = null;
    @property(cc.Button) ok_btn1: cc.Button = null;
    @property(cc.Node) deposit_slider: cc.Node = null;

    @property(cc.Sprite) deposit_progress: cc.Sprite = null;
    @property(cc.EditBox) deposit_editbox: cc.EditBox = null;
    @property(cc.Toggle) deposit_toggle: cc.Toggle = null;

    @property(cc.EditBox) pwd_editbox: cc.EditBox = null;
    @property(cc.Node) des_txt: cc.Node = null;
    @property(cc.Node) hyperlink_text: cc.Node = null;

    //page3

    @property(cc.Node) takeoutgold_txt: cc.Node = null;
    @property(cc.Node) takeoutgold_text: cc.Node = null;
    @property(cc.Button) ok3_btn: cc.Button = null;
    @property(cc.Prefab) item_prefab: cc.Prefab = null;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;

    @property(cc.Label) title1_txt: cc.Label = null;
    @property(cc.Label) title_instruct: cc.Label = null;
    @property(cc.Label) title_1: cc.Label = null;
    @property(cc.Label) title_2: cc.Label = null;
    @property(cc.Label) title_3: cc.Label = null;
    @property(cc.Label) title_time: cc.Label = null;
    @property(cc.Label) title_type: cc.Label = null;
    @property(cc.Label) title_account: cc.Label = null;
    @property(cc.Label) title_balance: cc.Label = null;

    @property(cc.RichText) instruct_rich: cc.RichText[] = [];
    @property(cc.Label) instruct_lab: cc.Label[] = [];

    @property(cc.Button) ExBtn: cc.Button = null;
    @property(cc.Node) explainNode: cc.Node = null;
    @property(cc.Sprite) ExContentBg: cc.Sprite = null;
    @property(cc.Label) ExContent: cc.Label = null;

    @property(cc.Label) box_hold: cc.Label = null;
    @property(cc.Label) box_txt: cc.Label = null;

    _closeCallback: Function = null;

    once: boolean = true;

    @property(cc.Prefab) prefab_modifyPW: cc.Prefab = null;         // 二级密码预制件
    private _inst_modifyPW: cc.Node = null;

    private _viewType: eSafeListType = eSafeListType.SAFE_TYPE_DEPOSIT;

    private _selectType: number = safeType.GOLD;

    private _instructHeight: number = 0;
    private _btWidth: number = 0;

    protected onLoad(): void {
        this._instructHeight = this.instruct.height;
        this._btWidth = this.safe_instruct_btn.node.x - (this.title1_txt.node.x + this.title1_txt.node.width * 0.5);
        if (cv.config.getCurrentLanguage() == LANGUAGE_TYPE.zh_CN) {
            this.deposit_editbox.fontSize = 42;
            this.deposit_editbox.placeholderFontSize = 42;
            this.deposit_txt.fontSize = 42;

            this.des_txt.getComponent(cc.Label).fontSize = 36;
            this.hyperlink_text.getComponent(cc.Label).fontSize = 36;

            this.pwd_editbox.fontSize = 48;
            this.pwd_editbox.placeholderFontSize = 48;
        }
        else {
            this.deposit_editbox.fontSize = 36;
            this.deposit_editbox.placeholderFontSize = 36;
            this.deposit_txt.fontSize = 36;

            this.des_txt.getComponent(cc.Label).fontSize = 30;
            this.hyperlink_text.getComponent(cc.Label).fontSize = 30;

            this.pwd_editbox.fontSize = 30;
            this.pwd_editbox.placeholderFontSize = 30;
        }

        this.gold_btn.node.on('click', () => {
            cv.AudioMgr.playButtonSound('tab');
            if (safeType.GOLD == this._selectType) return;
            this.changeSelectTypeView(safeType.GOLD);
        }, this);
        this.usdt_btn.node.on('click', () => {
            cv.AudioMgr.playButtonSound('tab');
            if (safeType.USDT == this._selectType) return;
            this.changeSelectTypeView(safeType.USDT);
        }, this);

        this.safe_instruct_btn.node.on('click', () => {
            cv.AudioMgr.playButtonSound('button_click');
            this.initInstructView();
            this.threebg.active = false;
            this.instruct.active = true;
        }, this);

        this.deposit_btn.node.on('click', () => {
            this.onClickSelected(1);
        }, this);

        this.takeout_btn.node.on('click', () => {
            this.onClickSelected(2);
        }, this);

        this.detail_btn.node.on('click', () => {
            this.onClickSelected(3);
            cv.worldNet.RequestStrongboxInfo(this._selectType);
            let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
            if (this.once) {
                this.once = false;
                sv.bindPrefab(this.item_prefab, "SafeDetailItem", []);
                sv.generateItemPool();
                sv.bindScrollEventTarget(this);
            }
        }, this);

        this.threeCloseBtn.node.on('click', () => {
            cv.AudioMgr.playButtonSound('close');
            this.closeView();

        }, this);

        this.instructCloseBtn.node.on('click', () => {
            cv.AudioMgr.playButtonSound('close');
            this.threebg.active = true;
            this.instruct.active = false;
        }, this);

        this.ok_btn1.node.on('click', () => {
            cv.AudioMgr.playButtonSound('button_click');
            if (this._viewType == eSafeListType.SAFE_TYPE_TAKEOUT) {
                this.takeoutClick();
                return;
            }
            if (this.deposit_editbox.string == "") {
                cv.TT.showMsg(cv.config.getStringData("Safe_input_account"), cv.Enum.ToastType.ToastTypeError);
                return;
            }

            let depostNum = cv.StringTools.showStringToNumber(this.deposit_editbox.string);
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (!reg.test(this.deposit_editbox.string)) {
                cv.TT.showMsg(cv.config.getStringData("Safe_correct_number"), cv.Enum.ToastType.ToastTypeError);
                return;
            }

            if (depostNum <= cv.StringTools.clientGoldByServer(this.getGoldOrUsdtData())) {
                if (depostNum > 0) {
                    cv.worldNet.RequestDeposit(depostNum, this._selectType);
                }
                else {
                    cv.TT.showMsg(cv.config.getStringData("Safe_input_account"), cv.Enum.ToastType.ToastTypeError);
                }
            }
            else {
                let tempStr = this._selectType == safeType.GOLD ? "" : "_usdt";
                cv.TT.showMsg(cv.config.getStringData("Safe_account_not_enough_money" + tempStr), cv.Enum.ToastType.ToastTypeError);
            }

        }, this);

        this.ok3_btn.node.on('click', () => {
            cv.AudioMgr.playButtonSound('button_click');
            //取出请求
            let pwd = this.pwd_editbox.getComponent(cc.EditBox).string;
            if (pwd.length == 0) {
                cv.TT.showMsg(cv.config.getStringData("ErrorCode2"), cv.Enum.ToastType.ToastTypeWarning);
                return;
            }
            cv.worldNet.RequestTakeOut(cv.StringTools.showStringToNumber(this.deposit_editbox.string), pwd, this._selectType);
        }, this);

        this.ExBtn.node.on("click", () => {
            this.showTwoPsdExplain();
        }, this);
        this.explainNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.explainNode.active = false;
        }, this);

        this.deposit_editbox.node.on("text-changed", () => {
            this.setMid(this.deposit_txt.string, this.deposit_editbox.string);
        }, this);

        //默认勾选
        this.deposit_toggle.uncheck();
        this.safebalance_text.getComponent(cc.Label).string = "********";
        this.safebalance_text.color = cc.color(225, 225, 225);
        cc.find("Background", this.deposit_toggle.node).active = true;
        this.deposit_toggle.node.on('toggle', () => {
            //防止断线 刷新金币数量
            this.accountgold_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(this.getGoldOrUsdtData());

            if (this.deposit_toggle.isChecked) {
                this.safebalance_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(this.getDepositData());
                this.safebalance_text.color = cc.color(208, 171, 110);

                cc.find("Background", this.deposit_toggle.node).active = false;
            }
            else {
                this.safebalance_text.getComponent(cc.Label).string = "********";
                this.safebalance_text.color = cc.color(225, 225, 225);
                cc.find("Background", this.deposit_toggle.node).active = true;
            }
        }, this);

        this.onChangeLanguage();

        this.updateSlider();
        this.addRegister();
        this.reset();
    }


    public chk(num: string) {
        //var patrn = /^\d+(\.\d+)?$/;
        //验证是数字或者两位小数，或者一位小数，整数
        var patrn = /^\d+(\.\d{0,2})?$/;
        //var patrn = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        var result = true;

        if (!patrn.exec(num)) {
            if (num.length == 0) {
                return;
            }
            cv.TT.showMsg(cv.config.getStringData("Safe_correct_number"), cv.Enum.ToastType.ToastTypeError);
            result = false;
        }
        return result;
    }

    public limitDepositXiaoshu(): void {
        if (isNaN(Number(this.deposit_editbox.string))) {
            cv.TT.showMsg(cv.config.getStringData("Safe_correct_number"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        //判断小数位
        let num = Number(this.deposit_editbox.string);
        let digits = num.toString().split(".");
        if (digits.length > 1) {
            if (digits[1].length == 1) {
                this.setMid(this.deposit_txt.string, num.toString());
                // this.deposit_editbox.string = num.toString();
                return;
            }
            this.setMid(this.deposit_txt.string, num.toFixed(3).slice(0, -1));
            // this.deposit_editbox.string = num.toFixed(3).slice(0, -1);
            return
        }
        //this.deposit_editbox.string = digits[0];

        if (!this.chk(num.toString())) return;
    }

    public limitTakeOutXiaoshu(): void {
        if (isNaN(Number(this.deposit_editbox.string))) {
            cv.TT.showMsg(cv.config.getStringData("Safe_correct_number"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        let num = Number(this.deposit_editbox.string);
        let digits = num.toString().split(".");
        if (digits.length > 1) {
            if (digits[1].length == 1) {
                this.setMid(this.deposit_txt.string, num.toString());
                // this.deposit_editbox.string = num.toString();
                return;
            }
            this.setMid(this.deposit_txt.string, num.toFixed(3).slice(0, -1));
            // this.deposit_editbox.string = num.toFixed(3).slice(0, -1);
            return
        }
        //this.deposit2_editbox.getComponent(cc.EditBox).string = digits[0];

        if (!this.chk(num.toString())) return;
    }

    public onChangeLanguage(): void {
        this.gold_lab.string = cv.config.getStringData("Safe_GOLD");
        this.usdt_lab.string = cv.config.getStringData("Safe_USDT");
        this.safebalance_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_deposit_balance");
        let desSize = cv.resMgr.getLabelStringSize(this.des_txt.getComponent(cc.Label), cv.config.getStringData("SecondaryPassword_des_text"));
        let linkSize = cv.resMgr.getLabelStringSize(this.hyperlink_text.getComponent(cc.Label), cv.config.getStringData("SecondaryPassword_hyperlink_text"));

        let tempW = this.ExBtn.node.getChildByName("Background").width;
        let posX = (desSize.width + linkSize.width) * 0.5;
        this.des_txt.setPosition(-posX - tempW, this.des_txt.y);
        this.hyperlink_text.setPosition(posX - tempW, this.hyperlink_text.y);
        this.ExBtn.node.setPosition(posX + this.ExBtn.node.width * 0.5 - tempW, this.ExBtn.node.y);

        this.pwd_editbox.getComponent(cc.EditBox).placeholderLabel.string = cv.config.getStringData("SecondaryPassword_editBox_bg_editBox_text");

        this.ok_btn1.getComponentInChildren(cc.Label).string = cv.config.getStringData("Safe_ok");
        this.ok3_btn.getComponentInChildren(cc.Label).string = cv.config.getStringData("Safe_ok");

        let lab_size = cv.resMgr.getLabelStringSize(this.title1_txt, cv.config.getStringData("Safe_strongbox"));

        this.safe_instruct_btn.node.setPosition(this.title1_txt.node.x + lab_size.width * 0.5 + this._btWidth, this.safe_instruct_btn.node.y);

        this.title_instruct.getComponent(cc.Label).string = cv.config.getStringData("Safe_instruct");

        this.title_1.getComponent(cc.Label).string = cv.config.getStringData("Safe_deposit");
        this.title_2.getComponent(cc.Label).string = cv.config.getStringData("Safe_takeout");
        this.title_3.getComponent(cc.Label).string = cv.config.getStringData("Safe_detail");

        this.title_time.getComponent(cc.Label).string = cv.config.getStringData("Safe_time");
        this.title_type.getComponent(cc.Label).string = cv.config.getStringData("Safe_type");
        this.title_account.getComponent(cc.Label).string = cv.config.getStringData("Safe_account");
        this.title_balance.getComponent(cc.Label).string = cv.config.getStringData("Safe_balance");
    }

    private gotoSecondaryPwd(): void {
        cv.AudioMgr.playButtonSound('button_click');
        //跳到二级密码设置界面
        this._inst_modifyPW = cc.instantiate(this.prefab_modifyPW);

        let modifyPW: ModifyPassword = this._inst_modifyPW.getComponent(ModifyPassword);
        //先将this._inst_modifyPW的size根据当前父节点适配，ModifyPassword类的onload适配是异步执行，下方init()时还未生效
        let scene = cc.director.getScene();
        scene.addChild(this._inst_modifyPW, cv.Enum.ZORDER_TYPE.ZORDER_7);
        cv.resMgr.adaptWidget(this._inst_modifyPW);

        modifyPW.init(false, () => {
            this._inst_modifyPW.removeFromParent(true);
            this._inst_modifyPW.destroy();
        });

        this._inst_modifyPW.runAction(cc.moveTo(0, cc.v2(cv.config.WIDTH * 0.5, 0)));
        this._inst_modifyPW.name = "ModifyPsd";
    }

    private updateSlider(): void {
        let slider = this.deposit_slider.getComponent(cc.Slider);
        if (slider == null || this.deposit_progress == null) {
            return;
        }

        let tempData: number = this.getSliderData();

        slider.progress = 0;
        this.deposit_progress.node.width = 0;

        if (tempData == 0) {
            slider.enabled = false;
        }
        else {
            slider.enabled = true;
        }
        slider.node.targetOff(this);
        slider.node.on('slide', (event) => {
            let tempData1: number = this.getSliderData();
            this.deposit_progress.node.width = slider.progress * 678;

            let xx = tempData1 * slider.progress;
            let bb = Math.floor(cv.StringTools.clientGoldByServer(xx));
            if (slider.progress == 1) {
                bb = cv.StringTools.clientGoldByServer(tempData1);
            }

            if (slider.progress == 0) {
                this.setMid(this.deposit_txt.string, "");
                // this.deposit_editbox.string = "";
            }
            else {
                this.setMid(this.deposit_txt.string, cv.StringTools.numberToShowString(bb));
                // this.deposit_editbox.string = cv.StringTools.numberToShowString(bb);
            }
        }, this)
    }

    private onSafeDetailList(): void {
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.reloadView(cv.dataHandler.getUserData().SafeDetailList);
    }

    private onUpdateDepositAndGold(): void {
        let tempData = this.getSliderData();
        this.accountgold_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(tempData);

        if (this.deposit_toggle.isChecked) {
            this.safebalance_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(this.getDepositData());
            this.safebalance_text.color = cc.color(208, 171, 110);
        }

        this.setMid(this.deposit_txt.string, "");
        // this.deposit_editbox.string = "";

        //判断剩余金币是否可以滑动 重置滑动条
        let slider1 = this.deposit_slider.getComponent(cc.Slider);
        slider1.progress = 0;
        this.deposit_progress.node.width = 0;

        if (tempData == 0) {
            slider1.enabled = false;
        }
        else {
            slider1.enabled = true;
        }

        this.onClickSelected(3);
        cv.worldNet.RequestStrongboxInfo(this._selectType);
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        if (this.once) {
            this.once = false;
            sv.bindPrefab(this.item_prefab, "SafeDetailItem", []);
            sv.generateItemPool();
            sv.bindScrollEventTarget(this);
        }
    }

    private onUpdateTakeOutBalance(): void {
        let tempData = this.getGoldOrUsdtData();
        let DepositData = this.getDepositData();
        this.accountgold_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(tempData);
        if (this.deposit_toggle.isChecked) {
            this.safebalance_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(DepositData);
            this.safebalance_text.color = cc.color(208, 171, 110);
        }

        //成功后调到取出界面
        this.setMid(this.deposit_txt.string, "");
        // this.deposit_editbox.string = "";
        this.pwd_editbox.getComponent(cc.EditBox).string = "";

        this.threebg.active = true;
        this.instruct.active = false;
        this.bg_normal.active = true;
        this.bg_twoPsd.active = false;
        this.threebg.getChildByName("page_img").active = true;

        //判断剩余金币是否可以滑动
        let slider2 = this.deposit_slider.getComponent(cc.Slider);
        slider2.progress = 0;
        this.deposit_progress.node.width = 0;
        if (DepositData == 0) {
            slider2.enabled = false;
        }
        else {
            slider2.enabled = true;
        }

        this.onClickSelected(3);
        cv.worldNet.RequestStrongboxInfo(this._selectType);
        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        if (this.once) {
            this.once = false;
            sv.bindPrefab(this.item_prefab, "SafeDetailItem", []);
            sv.generateItemPool();
            sv.bindScrollEventTarget(this);
        }
    }

    private addRegister(): void {
        cv.MessageCenter.register("SafeDetailList", this.onSafeDetailList.bind(this), this.node);
        cv.MessageCenter.register("update_deposit_and_gold", this.onUpdateDepositAndGold.bind(this), this.node);
        cv.MessageCenter.register("update_takeout_balance", this.onUpdateTakeOutBalance.bind(this), this.node);
        cv.MessageCenter.register("update_slider_state", this.updateSlider.bind(this), this.node);
    }

    private removeRegister(): void {
        cv.MessageCenter.unregister("SafeDetailList", this.node);
        cv.MessageCenter.unregister("update_deposit_and_gold", this.node);
        cv.MessageCenter.unregister("update_takeout_balance", this.node);
        cv.MessageCenter.unregister("update_slider_state", this.node);
    }

    onDestroy(): void {
        this.removeRegister();
    }

    private onClickSelected(selected: number, isplaySound: boolean = true): void {
        if (isplaySound) {
            cv.AudioMgr.playButtonSound('tab');
        }
        if (selected == this._viewType) return;
        this.setViewType(selected);
        this.resetSliderAndBox();
    }

    setViewType(eType: eSafeListType): void {
        this._viewType = eType;
        this.updateView();
    }

    getViewType(): eSafeListType {
        return this._viewType;
    }

    public updateView(): void {

        if (this._selectType == safeType.GOLD) {
            this.accountgold_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_accountgold");
        }
        else if (this._selectType == safeType.USDT) {
            this.accountgold_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_accountUsdt");
        }

        if (this._viewType == eSafeListType.SAFE_TYPE_DEPOSIT) {
            this.deposit_editbox.placeholderLabel.string = cv.config.getStringData("Safe_input_account");
            let inputW = cv.resMgr.getLabelStringSize(this.box_hold, cv.config.getStringData("Safe_input_account")).width;
            if (inputW > 400) {
                this.deposit_editbox.node.setContentSize(cc.size(inputW, this.deposit_editbox.node.height));
            }
            if (this._selectType == safeType.GOLD) {
                this.setMid(cv.config.getStringData("Safe_depositgold"), this.deposit_editbox.string);
            }
            else if (this._selectType == safeType.USDT) {
                this.setMid(cv.config.getStringData("Safe_saveUsdt"), this.deposit_editbox.string);
            }
        }
        else if (this._viewType == eSafeListType.SAFE_TYPE_TAKEOUT) {
            this.deposit_editbox.placeholderLabel.string = cv.config.getStringData("Safe_output_account");
            let outputW = cv.resMgr.getLabelStringSize(this.box_hold, cv.config.getStringData("Safe_output_account")).width;
            if (outputW > 400) {
                this.deposit_editbox.node.setContentSize(cc.size(outputW, this.deposit_editbox.node.height));
            }
            if (this._selectType == safeType.GOLD) {
                this.setMid(cv.config.getStringData("Safe_takeoutgold"), this.deposit_editbox.string);
            }
            else if (this._selectType == safeType.USDT) {
                this.setMid(cv.config.getStringData("Safe_getUsdt"), this.deposit_editbox.string);
            }
        }

        switch (this._viewType) {
            case eSafeListType.SAFE_TYPE_DEPOSIT:
                {
                    this.deposit_panel.active = true;
                    this.detail_panel.active = false;
                    this.depositbg.active = true;
                    this.takeoutbg.active = false;
                    this.detailbg.active = false;
                    this.title_1.node.color = cc.color(208, 171, 110);
                    this.title_2.node.color = cc.color(148, 149, 149);
                    this.title_3.node.color = cc.color(148, 149, 149);
                }
                break;
            case eSafeListType.SAFE_TYPE_TAKEOUT:
                {
                    this.deposit_panel.active = true;
                    this.detail_panel.active = false;
                    this.depositbg.active = false;
                    this.takeoutbg.active = true;
                    this.detailbg.active = false;
                    this.title_1.node.color = cc.color(148, 149, 149);
                    this.title_3.node.color = cc.color(148, 149, 149);
                    this.title_2.node.color = cc.color(208, 171, 110);
                }
                break;
            case eSafeListType.SAFE_TYPE_DETAIL:
                {
                    this.deposit_panel.active = false;
                    this.detail_panel.active = true;
                    this.depositbg.active = false;
                    this.takeoutbg.active = false;
                    this.detailbg.active = true;
                    this.title_1.node.color = cc.color(148, 149, 149);
                    this.title_3.node.color = cc.color(208, 171, 110);
                    this.title_2.node.color = cc.color(148, 149, 149);
                }
                break;

            default:

                break;
        }
    }

    setCloseCallBack(callback: Function) {
        this._closeCallback = callback;
    }

    takeoutClick() {
        //弹出对话框
        let takeoutNum = cv.StringTools.showStringToNumber(this.deposit_editbox.string);
        if (this.deposit_editbox.string == "") {
            cv.TT.showMsg(cv.config.getStringData("Safe_output_account"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        if (takeoutNum > cv.StringTools.clientGoldByServer(this.getDepositData())) {
            let tempStr = this._selectType == safeType.GOLD ? "" : "_usdt";
            cv.TT.showMsg(cv.config.getStringData("Safe_box_not_enough_money" + tempStr), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!reg.test(takeoutNum.toString())) {
            cv.TT.showMsg(cv.config.getStringData("Safe_correct_number"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        if (takeoutNum == 0) {
            cv.TT.showMsg(cv.config.getStringData("Safe_output_account"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        this.bg_normal.active = false;
        this.bg_twoPsd.active = true;
        this.threebg.getChildByName("page_img").active = false;
        this.depositbg.active = false;
        this.deposit_panel.active = false;
        let tWidth = cv.resMgr.getLabelStringSize(this.takeoutgold_txt.getComponent(cc.Label), cv.config.getStringData("Safe_takeoutgold")).width;
        let txW = cv.resMgr.getLabelStringSize(this.takeoutgold_text.getComponent(cc.Label), this.deposit_editbox.string).width;
        let posx = (tWidth + txW + 10)*0.5;
        this.takeoutgold_txt.setPosition(cc.v2(-posx + tWidth, this.takeoutgold_txt.y));
        this.takeoutgold_text.setPosition(cc.v2(posx - txW, this.takeoutgold_txt.y));
    }

    initInstructView() {
        let str = "";
        switch (this._selectType) {
            case safeType.USDT:
                str = "_usdt";
                break;
        }

        let instructData: string[] = [];
        instructData.push(cv.config.getStringData("Safe_content_1" + str) + "，<color=#D0AB6E>" + cv.config.getStringData("Safe_title_1") + "</color>");
        instructData.push(cv.config.getStringData("Safe_content_2" + str) + "，<color=#D0AB6E>" + cv.config.getStringData("Safe_title_2" + str) + "</color>");
        instructData.push(cv.config.getStringData("Safe_content_3" + str) + "，<color=#D0AB6E>" + cv.config.getStringData("Safe_title_3" + str) + "</color>");

        let totalLineNum: number = 0;
        let len = this.instruct_rich.length;
        let sizeArr: number[] = [];
        for (let i = 0; i < len; i++) {
            let currentSize = cv.resMgr.getRichTextStringSize(this.instruct_rich[i], instructData[i]);
            sizeArr.push(currentSize.height);
            if (i > 0) {
                let tempLineNum = Math.floor(sizeArr[i - 1] / 56);
                totalLineNum += tempLineNum;
                this.instruct_rich[i].node.setPosition(this.instruct_rich[i].node.x, this.instruct_rich[i - 1].node.y - tempLineNum * 56 - 40);
            }
            this.instruct_lab[i].node.setPosition(this.instruct_lab[i].node.x, this.instruct_rich[i].node.y);
        }
        totalLineNum += Math.floor(sizeArr[len - 1] / 56);

        this.instruct.setContentSize(cc.size(this.instruct.width, this._instructHeight));
        if (totalLineNum > 6) {
            this.instruct.setContentSize(cc.size(this.instruct.width, this.instruct.height + (totalLineNum - 6) * 56));
            cv.resMgr.adaptWidget(this.instruct);
        }
    }

    changeSelectTypeView(num: number) {
        this._selectType = num;

        if (this.deposit_toggle.isChecked) {
            this.safebalance_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(this.getDepositData());
            this.safebalance_text.color = cc.color(208, 171, 110);
        }

        this.instruct.active = false;
        this.threebg.active = true;
        this.bg_normal.active = true;
        this.bg_twoPsd.active = false;
        this.threebg.getChildByName("page_img").active = true;

        switch (this._selectType) {
            case safeType.GOLD:
                this.gold_lab.node.color = cc.color(208, 171, 110);
                this.usdt_lab.node.color = cc.color(197, 197, 215);

                this.accountgold_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().u32Chips);

                this.deposit_img_gold.node.active = true;
                this.deposit_img_usdt.node.active = false;
                break;
            case safeType.USDT:
                this.gold_lab.node.color = cc.color(197, 197, 215);
                this.usdt_lab.node.color = cc.color(208, 171, 110);

                this.accountgold_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().usdt);

                this.deposit_img_gold.node.active = false;
                this.deposit_img_usdt.node.active = true;
                break;
        }
        if (this._viewType == eSafeListType.SAFE_TYPE_DETAIL) {
            cv.worldNet.RequestStrongboxInfo(this._selectType);
        }
        this.setViewType(this._viewType);
        this.resetSliderAndBox();
    }

    getGoldOrUsdtData(): number {
        let result: number = 0;
        switch (this._selectType) {
            case safeType.GOLD:
                result = cv.dataHandler.getUserData().u32Chips;
                break;
            case safeType.USDT:
                result = cv.dataHandler.getUserData().usdt;
                break;
        }
        return result;
    }

    getDepositData(): number {
        let result: number = 0;
        switch (this._selectType) {
            case safeType.GOLD:
                result = cv.dataHandler.getUserData().u32Deposit_gold;
                break;
            case safeType.USDT:
                result = cv.dataHandler.getUserData().deposit_usdt;
                break;
        }
        return result;
    }

    resetSliderAndBox() {
        let tempData = this.getSliderData();
        this.setMid(this.deposit_txt.string, "");
        // this.deposit_editbox.string = "";

        //判断剩余金币是否可以滑动 重置滑动条
        let slider1 = this.deposit_slider.getComponent(cc.Slider);
        slider1.progress = 0;
        this.deposit_progress.node.width = 0;

        if (tempData == 0) {
            slider1.enabled = false;
        }
        else {
            slider1.enabled = true;
        }
    }

    getSliderData(): number {
        if (this._viewType == eSafeListType.SAFE_TYPE_DEPOSIT) {
            return this.getGoldOrUsdtData();
        }
        else {
            return this.getDepositData();
        }
    }

    reset() {
        this.node.active = true;
        this.instruct.active = false;
        this.threebg.active = true;
        this.bg_normal.active = true;
        this.bg_twoPsd.active = false;
        this.threebg.getChildByName("page_img").active = true;

        this._viewType = eSafeListType.SAFE_TYPE_DEPOSIT;
        this.changeSelectTypeView(safeType.GOLD);
    }

    showTwoPsdExplain() {
        let pos = this.ExBtn.node.getChildByName("Background").getPosition();
        let worldpos = this.ExBtn.node.convertToWorldSpaceAR(pos);
        this.explainNode.convertToNodeSpaceAR(worldpos, pos);
        this.explainNode.getChildByName("node").setPosition(pos.x, this.explainNode.y);
        let size = cv.resMgr.getLabelStringSize(this.ExContent, cv.config.getStringData(this._selectType == safeType.GOLD ? "Safe_explain_gold" : "Safe_explain_usdt"));
        this.ExContentBg.node.setContentSize(cc.size(size.width + 2 * 40, this.ExContentBg.node.height));
        this.explainNode.active = true;
    }

    setMid(txtStr: string, boxStr: string) {
        let txtW = cv.resMgr.getLabelStringSize(this.deposit_txt, txtStr).width;
        let boxW = 0;
        if (boxStr == "") {
            boxW = cv.resMgr.getLabelStringSize(this.box_hold, boxStr).width;
        }
        else {
            boxW = cv.resMgr.getLabelStringSize(this.box_txt, boxStr).width;
        }
        let posW = (txtW + boxW + 4) * 0.5;
        this.deposit_txt.node.setPosition(-posW, this.deposit_txt.node.y);
        this.deposit_editbox.node.setPosition(posW - boxW, this.deposit_editbox.node.y);
        this.deposit_editbox.string = boxStr;
    }

    closeView() {
        if (this._closeCallback) {
            this._closeCallback();
        }
        cv.MessageCenter.send("HideWebview_ShowWindows", true);

        this.removeRegister();
        this.node.removeFromParent(true);
        this.node.destroy();
    }
}