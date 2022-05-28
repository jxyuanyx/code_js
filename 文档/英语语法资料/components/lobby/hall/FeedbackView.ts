import cv from "../../lobby/cv";
import FeedbackRecord from "./FeedbackRecord";
import { NativeEventCMD, NATIVE_KEY_MAP } from "../../../common/tools/NativeEventCMD";
import { aesHandler } from "../../../common/plugg/aesHandler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackView extends cc.Component {
    @property(cc.Prefab) prefab_FeedbackRecord: cc.Prefab = null;
    @property(cc.Node) select_btns:cc.Node[] = [];
    @property(cc.Node) image_btns:cc.Node[] = [];
    @property(cc.Node) help_panel:cc.Node = null;
    @property(cc.EditBox) editbox: cc.EditBox = null;
    @property(cc.Label) editbox_number: cc.Label = null;
    @property(cc.Node) put_title_node:cc.Node = null;
    @property(cc.Node) record_btn_pos:cc.Node = null;
    @property(cc.Node) btn_refresh:cc.Node = null;
    @property(cc.Node) btn_submit:cc.Node = null;
    @property(cc.Node) Warning_area:cc.Node = null;
    @property(cc.Node) title_num_label:cc.Node = null;
    @property(cc.Node) record_btn:cc.Node = null;
    private static _g_prefabInst: cc.Node = null;

    private _select_index:number = -1;
    private _showBtns:cc.Node[] = [];
    private _imageBtnPos:cc.Vec2[] = [];
    private _pics:string[] = [];
    private _isSaveImg:boolean = false;
    onLoad ()
    {
        this.init();
        this.initLanguage();
        cv.MessageCenter.register("get_feedback_lists", this.onUpdate.bind(this), this.node);
        cv.MessageCenter.register("native_onImageSaved", this.onImageSaved.bind(this), this.node);
        cv.MessageCenter.register("onUploadImgsSucc", this.onUploadImgsSucess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        
        cv.resMgr.adaptWidget(this.node);
    }

    private init()
    {
        this.help_panel.active = false;
        this._imageBtnPos = [];
        for (let i = 0; i < this.image_btns.length; i++) {
            let btn:any = this.image_btns[i];
            let widget: cc.Widget = btn.getComponent(cc.Widget);
            widget.updateAlignment();
            this._imageBtnPos.push(btn.getPosition());
        }
        this.reset();
        this.onUpdate();
    }

    private reset()
    {
        this.Warning_area.active = false;
        this.editbox.string = "";
        this.editbox_number.string =  "0/100"
        this.onSelectBtn(null, "-1");
        for (let i = 0; i < this.image_btns.length; i++) {
            let btn = this.image_btns[i];
            btn.active = i == 0;
            cc.find("cancel", btn).active = false;
            cv.resMgr.setSpriteFrame(cc.find("image", btn), "zh_CN/hall/feedback/put_btn");
        }
        this._showBtns = []
        this._pics = [];
        this._showBtns.push(this.image_btns[0]);
        this.updateImgBtns()
    }

    onDestroy()
    {
        cv.MessageCenter.unregister("get_feedback_lists", this.node);
        cv.MessageCenter.unregister("native_onImageSaved", this.node);
        cv.MessageCenter.unregister("onUploadImgsSucc", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!FeedbackView._g_prefabInst) FeedbackView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(FeedbackView._g_prefabInst.uuid)) {
            if (!cc.isValid(FeedbackView._g_prefabInst, true)) {
                FeedbackView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return FeedbackView._g_prefabInst;
    }

    private onUpdate()
    {
        this.record_btn_pos.active = cv.dataHandler.getUserData().feedback_red_num > 0;
    }

    private initLanguage()
    {
        cc.find("txt_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_txt_title");
        cc.find("title_panel/title_0", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_title_panel_title_0");
        cc.find("title_panel/title_1", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_title_panel_title_1");
        for (let i = 0; i < this.select_btns.length; i++) {
            let btn = this.select_btns[i];
            cc.find("des", btn).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_des_btn_" + i);
        }
        cc.find("title_label", this.put_title_node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_put_title_node_label");
        cc.find("help_btn/help_des", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_help_btn_des");
        cc.find("submit_btn/label", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackView_submit_btn_label");
        let label = cc.find("layout/label", this.record_btn).getComponent(cc.Label);
        label.string = cv.config.getStringData("feedbackView_record_btn_layout_label");
        let width = cv.resMgr.getLabelStringSize(label).width;
        this.record_btn.setContentSize(cc.size(width + 102, this.record_btn.getContentSize().height));
        this.record_btn_pos.getComponent(cc.Widget).updateAlignment();
        cv.resMgr.setSpriteFrame(cc.find("img", this.help_panel), cv.config.getLanguagePath("hall/feedback/help_img"));
    }

    private onSelectBtn(event, index:string)
    {
        this._select_index = cv.Number(index);
        for (let i = 0; i < this.select_btns.length; i++) {
            let name = i == this._select_index ? "radio_selected" : "radio";
            cv.resMgr.setSpriteFrame(cc.find("img", this.select_btns[i]), "zh_CN/hall/feedback/" + name);
        }
        let num = this._select_index < 0 ? 0 : this._select_index;
        this.editbox.placeholder = cv.config.getStringData("feedbackView_editbox_placeholder_" + num);
    }

    private updateImgBtns()
    {
        let showNum = 0;
        for (let i = 0; i < this._showBtns.length; i++) {
            this._showBtns[i].setPosition(this._imageBtnPos[i]);
            if(cc.find("cancel", this._showBtns[i]).active) {
                showNum++;
            }
        }
        
        this.title_num_label.getComponent(cc.Label).string = cv.StringTools.formatC("(%d/%d)", showNum, this.image_btns.length);
    }

    private onImageBtn(event)
    {
        if(!cc.find("cancel", event.target).active)
        {
            this._isSaveImg = true;
            if (cc.sys.os == cc.sys.OS_IOS) {
                cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_OPEN_PHOTO);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "openPhoto", "()V");
            }
        }
    }
    
    private onImageCloseBtn(event)
    {
        let showNum = 0;
        let imgBtn = event.target.getParent();
        for (let i = 0; i < this._showBtns.length; i++) {
            if(cc.find("cancel", this._showBtns[i]).active) {
                showNum++;
            }
        }
        cv.resMgr.setSpriteFrame(cc.find("image", imgBtn), "zh_CN/hall/feedback/put_btn");
        event.target.active = false;
        for (let i = 0; i < this._showBtns.length; i++) {
            if(this._showBtns[i] == imgBtn) {
                this._showBtns.splice(i, 1);
                this._pics.splice(i, 1);
                if(showNum < 4) {
                    imgBtn.active = false;
                } else {
                    this._showBtns.push(imgBtn);
                }
                break;
            }
        }
        this.updateImgBtns();
    }

    private onHelpBtn(event)
    {
        this.help_panel.active = true;
    }

    private onHelpPanel(event)
    {
        this.help_panel.active = false;
    }

    private onSubmitBtn(event)
    {
        cv.AudioMgr.playButtonSound('tab');
        let content = this.editbox.string;
        if(content == "" && this._pics.length == 0) 
        {
            cv.TT.showMsg(cv.config.getStringData("feedbackView_submit_content_error"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }
        if(this._select_index == -1)
        {
            cv.TT.showMsg(cv.config.getStringData("feedbackView_submit_type_error"), cv.Enum.ToastType.ToastTypeInfo);
            this.Warning_area.active = true;
            return;
        }
        if(this._pics.length > 0)
        {
            cv.httpHandler.requestUploadImgs(this._pics);
            cc.find("bg", this.btn_submit).opacity = 76;
            this.btn_submit.getComponent(cc.Button).enabled = false;
        } else {
            cv.httpHandler.requestAddFeedBack(this._select_index + 1, content, []);
            this.reset();
        }
    }

    private onRecordBtn(event)
    {
        let inst: cc.Node = FeedbackRecord.getSinglePrefabInst(this.prefab_FeedbackRecord);
        cv.action.addChildToSceneOnce(inst);
        cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
    }

    private onRefresh(event)
    {
        cv.AudioMgr.playButtonSound('tab');
        cv.httpHandler.requestGetFeedBackLists();
        cc.find("img", this.btn_refresh).opacity = 76.5;
        this.btn_refresh.getComponent(cc.Button).enabled = false;
        this.btn_refresh.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(()=>{
            cc.find("img", this.btn_refresh).opacity = 255;
            this.btn_refresh.getComponent(cc.Button).enabled = true;
        }, this)));
    }

    private onBack(event)
    {
        cv.AudioMgr.playButtonSound('back_button');
        cv.action.showAction(this.node
            , cv.action.eMoveActionDir.EMAD_TO_RIGHT
            , cv.action.eMoveActionType.EMAT_FADE_OUT
            , cv.action.delay_type.NORMAL
            , (target: cc.Node, actIO: number): void => { }
            , (target: cc.Node, actIO: number): void => {
                // 恢复显示"邮件"图标
                cv.MessageCenter.send("show_mail_entrance", true);
            });
    }
    
    private savePicsString(str: string) {
        str = str.replace(/\+/g, "-");
        str = str.replace(/\//g, "_");
        this._pics.push(str);
    }

    private onImageSaved(data: any)
    {
        if(!this._isSaveImg) return;
        this._isSaveImg = false;
        cv.resMgr.loadRemote(data.msg, function (error: Error, resource: cc.Texture2D) {
            if (error) {
                console.log(error.message || error);
                return;
            }
            let btn = this._showBtns[this._showBtns.length - 1];
            cc.find("cancel", btn).active = true;
            let imgData = jsb.fileUtils.getDataFromFile(data.msg);
            let picbase64 = aesHandler.bytesToBase64(imgData);
            this.savePicsString(picbase64);
            cc.find("image", btn).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(resource);
            for (let i = 0; i < this.image_btns.length; i++) {
                if(!this.image_btns[i].active) {
                    this.image_btns[i].active = true;
                    this._showBtns.push(this.image_btns[i]);
                    break;
                }
            }
            this.updateImgBtns();
        }.bind(this));
    }

    private onUploadImgsSucess(pics: string[])
    {
        let content = this.editbox.string;
        cc.find("bg", this.btn_submit).opacity = 255;
        this.btn_submit.getComponent(cc.Button).enabled = true;
        if(content == "" && pics.length == 0) return;
        cv.httpHandler.requestAddFeedBack(this._select_index + 1, content, pics);
        this.reset();
    }

    public show()
    {
        this.init();
        this.node.active = true;
    }
    
    public onTextChanged()
    {
        let str = this.editbox.string;
        let iconRule = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        str = str.replace(iconRule, "");
        this.editbox.string = str;
        this.editbox_number.string =  str.length + "/100"
    }
}
