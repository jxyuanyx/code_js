import cv from "../cv"
import { RemarkData } from "../../../data/userData"
import { CircleSprite } from "../../../common/tools/CircleSprite"

const {ccclass, property} = cc._decorator;

@ccclass
export default class RemarksReviseView extends cc.Component {
    @property(cc.Node) roleimg: cc.Node = null;
    @property(cc.Label) name_label: cc.Label = null;
    @property(cc.EditBox) editbox: cc.EditBox = null;
    @property(cc.Node) menu_arrow: cc.Node = null;
    @property(cc.Node) menu_icon: cc.Node = null;
    @property(cc.Node) menu_label: cc.Node = null;
    @property(cc.Node) remark_btn_panel: cc.Node = null;
    @property(cc.Node) buttonList: cc.Node[] = [];

    private remark_click_type:number = 0;
    private _info:RemarkData = null;

    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!RemarksReviseView._g_prefabInst) RemarksReviseView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(RemarksReviseView._g_prefabInst.uuid)) {
            if (!cc.isValid(RemarksReviseView._g_prefabInst, true)) {
                RemarksReviseView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return RemarksReviseView._g_prefabInst;
    }

    onLoad()
    {
        this.remark_btn_panel.active = false;
        this.initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private initLanguage()
    {
        cc.find("view_panel/tag_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("roleInfo_root_remark_panel_label_text");
        cc.find("view_panel/remarks_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("roleInfo_root_remark_panel_set_note_text");
        this.menu_label.getComponent(cc.Label).string = cv.config.getStringData("roleInfo_root_remark_panel_menu_button_menu_text");
        cc.find("menu_text", this.buttonList[0]).getComponent(cc.Label).string = cv.config.getStringData("roleInfo_root_remark_panel_menu_button_menu_text");
        this.editbox.placeholder = cv.config.getStringData("roleInfo_root_remark_panel_signInput_text");
        cc.find("view_panel/name_panel/name_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("UITitle31") + ":";
        cc.find("view_panel/cancel_btn/label", this.node).getComponent(cc.Label).string = cv.config.getStringData("VoiceChanger_cancel_btn_label");
        cc.find("view_panel/ok_btn/label", this.node).getComponent(cc.Label).string = cv.config.getStringData("VoiceChanger_ok_btn_label");
    }

    public show(info:RemarkData)
    {
        this._info = info;
        this.name_label.string = info.nickname;
        let img = cc.find("default_img", this.roleimg);
        CircleSprite.cleanHeadNode(img);
        CircleSprite.setCircleSprite(img, this._info.avatar, this._info.plat, false);
        this.editbox.string = info.sRemark;
        this.remark_click_type = info.nType;
        this.updateMenuButton();
        this.node.active = true;
    }
    
    setButtonListToShow(isShow: boolean) {
        this.remark_btn_panel.active = isShow;
        for (let i = 0; i < this.buttonList.length; i++) {
            this.buttonList[i].getChildByName("button_bg").active = false;
            this.buttonList[this.remark_click_type].getChildByName("button_bg").active = true;
            this.buttonList[i].active = (isShow);
        }
        if (isShow) {
            this.menu_arrow.runAction(cc.flipY(true));
        }
        else {
            this.menu_arrow.runAction(cc.flipY(false));
        }

    }

    private close()
    {
        this.node.active = false;
    }

    private onBtnCancel()
    {
        this.close();
    }

    private onBtnOk()
    {
        cv.AudioMgr.playButtonSound('button_click');
        let str = this.editbox.string;
        let errorMsg = null;

        if (!cv.StringTools.isClubNameFormat(str)) {
            errorMsg = "tips_no_special_words";
        } 
        else if (cv.StringTools.isSensitiveWords(str)) {
            errorMsg = "tips_no_sensitive_words";
        }
        if (errorMsg != null) {
            cv.TT.showMsg(cv.config.getStringData(errorMsg), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            if (cv.native.stringContainsEmoji(str)) {
                cv.TT.showMsg(cv.config.getStringData("UIRemarkTips"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        }
        if (cv.StringTools.getStrLen(str) > 10) {
            cv.TT.showMsg(cv.config.getStringData("EditBoxNickName"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        str = str.replace(/[\r\n]/g, "");
        cv.worldNet.RequestAddRemarks(this._info.nUid, this.remark_click_type, str);  
        this.close();
    }

    private onBtnMenu()
    {
        this.setButtonListToShow(true);
    }

    private onBtnRemark(event, index:string)
    {
        this.remark_click_type = cv.Number(index);
        this.closeMenu();
        this.updateMenuButton();
    }
    
    private updateMenuButton() {
        this.menu_arrow.runAction(cc.flipY(false));
        if (this.remark_click_type == 0) {
            this.menu_label.active = (true);
            this.menu_icon.active = (false);
        }
        else {
            this.menu_label.active = (false);
            this.menu_icon.active = (true);
            cv.resMgr.setSpriteFrame(this.menu_icon, cv.StringTools.formatC("zh_CN/game/dzpoker/ui/common_remark_icon%d", this.remark_click_type));
        }
    }

    private closeMenu()
    {
        this.setButtonListToShow(false);
    }
}
