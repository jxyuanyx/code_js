import cv from "../cv";
import FeedbackDetailItem from "./FeedbackDetailItem";
import { NativeEventCMD, NATIVE_KEY_MAP } from "../../../common/tools/NativeEventCMD";
import { aesHandler } from "../../../common/plugg/aesHandler";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackDetail extends cc.Component {
    @property(cc.EditBox) reply_editbox: cc.EditBox = null;
    @property(cc.ScrollView)scrollview: cc.ScrollView = null;
    @property(cc.Node)btn_refresh: cc.Node = null;
    @property(cc.Prefab)prefab_item: cc.Prefab = null;
    @property(cc.Node)btn_camera: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;

    private feedback_id:number = 0;

    private _isSaveImg:boolean = false;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!FeedbackDetail._g_prefabInst) FeedbackDetail._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(FeedbackDetail._g_prefabInst.uuid)) {
            if (!cc.isValid(FeedbackDetail._g_prefabInst, true)) {
                FeedbackDetail._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return FeedbackDetail._g_prefabInst;
    }

    onLoad ()
    {
        this.initLanguage();
        this.onUpdateView();
        cv.MessageCenter.register("updata_feedback_comment_lists", this.onUpdateView.bind(this), this.node);
        cv.MessageCenter.register("native_onImageSaved", this.onImageSaved.bind(this), this.node);
        cv.MessageCenter.register("onUploadImgSucc", this.onUploadSucess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.resMgr.adaptWidget(this.node);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister("updata_feedback_comment_lists", this.node);
        cv.MessageCenter.unregister("native_onImageSaved", this.node);
        cv.MessageCenter.unregister("onUploadImgSucc", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    
    public onUpdateView()
    {
        let list = cv.dataHandler.getUserData().feedback_comment_list;
        let height = 0;
        this.scrollview.content.destroyAllChildren();
        this.scrollview.content.removeAllChildren(true);
        this.scrollview.stopAutoScroll();
        for (let i = 0; i < list.length; i++) {
            let item = cc.instantiate(this.prefab_item);
            this.scrollview.content.addChild(item);
            item.getComponent(FeedbackDetailItem).updateData(list[i]);
            let size = item.getContentSize();
            item.y = -height;
            height += size.height;
        }
        this.scrollview.content.height = height;
        this.scrollview.scrollToBottom(1);
    }

    private initLanguage()
    {
        cc.find("txt_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackDetail_txt_title");
        cc.find("reply_panel/send_btn/label", this.node).getComponent(cc.Label).string = cv.config.getStringData("feedbackDetail_reply_panel_send_btn_label");
        this.reply_editbox.placeholder = cv.config.getStringData("feedbackDetail_reply_panel_reply_editBox_placeholder");
    }

    private onRefresh(event)
    {
        cv.AudioMgr.playButtonSound('tab');
        cv.httpHandler.requestGetFeedBackCommentLists(this.feedback_id);
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
        cv.action.showAction(this.node, cv.action.eMoveActionDir.EMAD_TO_RIGHT, cv.action.eMoveActionType.EMAT_FADE_OUT);
    }

    private onBtnSend(event)
    {
        let str = this.reply_editbox.string;
        let pics = [];
        if(str.length == 0 && pics.length == 0) return;
        cv.httpHandler.requestAddFeedBackComment(this.feedback_id, str, pics);
        this.reply_editbox.string = "";
    }

    private onBtnCamera(event)
    {
        this._isSaveImg = true;
        if (cc.sys.os == cc.sys.OS_IOS) {
            cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_OPEN_PHOTO);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "openPhoto", "()V");
        }
    }

    private onImageSaved(data: any)
    {
        if(!this._isSaveImg) return;
        this._isSaveImg = false;
        let imgData = jsb.fileUtils.getDataFromFile(data.msg);
        let picbase64 = aesHandler.bytesToBase64(imgData);
        picbase64 = picbase64.replace(/\+/g, "-");
        picbase64 = picbase64.replace(/\//g, "_");
        cv.httpHandler.requestUploadImg(picbase64);
        this.btn_camera.opacity = 76;
        this.btn_camera.getComponent(cc.Button).enabled = false;
    }

    private onUploadSucess(filename: string)
    {
        let pics = [];
        pics.push(filename);
        cv.httpHandler.requestAddFeedBackComment(this.feedback_id, "", pics);
        this.btn_camera.opacity = 255;
        this.btn_camera.getComponent(cc.Button).enabled = true;
    }

    public setFeedbackID(id:number)
    {
        this.feedback_id = id;
    }
    
    public onTextChanged()
    {
        let str = this.reply_editbox.string;
        let iconRule = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        str = str.replace(iconRule, "");
        this.reply_editbox.string = str;
    }
}
