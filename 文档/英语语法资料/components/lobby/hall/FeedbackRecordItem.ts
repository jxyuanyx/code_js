import cv from "../cv";
import FeedbackDetail from "./FeedbackDetail"
import { FeedbackData } from "../../../../Script/data/userData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackRecordItem extends cc.Component {
    @property(cc.Prefab)prefab_FeedbackDetail: cc.Prefab = null;
    @property(cc.Label)title_label: cc.Label = null;
    @property(cc.Node)pos: cc.Node = null;
    @property(cc.Label)dos: cc.Label = null;
    public _info:FeedbackData = null;
    onLoad()
    {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private initLanguage()
    {
        if(this._info != null)
        {
            this.title_label.string = cv.StringTools.formatC(cv.config.getStringData("feedbackRecord_item_title"), this._info.id);
        }
    }

    updateSVReuseData(index: number, dataArray: Array<FeedbackData>)
    {
        if (index < 0 || dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data = dataArray[index];
        this._info = data;
        this.pos.active = data.user_not_read != 0;
        this.title_label.string = cv.StringTools.formatC(cv.config.getStringData("feedbackRecord_item_title"), data.id);
        let str = data.content.replace(/[\r\n]/g,"");
        cv.StringTools.setShrinkString(this.dos.node, str, true);
    }

    onBtnItemClick()
    {
        cv.dataHandler.getUserData().feedback_comment_list = [];
        cv.httpHandler.requestGetFeedBackCommentLists(this._info.id);
        let inst: cc.Node = FeedbackDetail.getSinglePrefabInst(this.prefab_FeedbackDetail);
        inst.getComponent(FeedbackDetail).setFeedbackID(this._info.id);
        inst.getComponent(FeedbackDetail).onUpdateView();
        cv.action.addChildToSceneOnce(inst);
        cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN);
    }
}
