import cv from "../cv"
import { RemarkData } from "../../../data/userData"
import { CircleSprite } from "../../../common/tools/CircleSprite"
import RemarksReviseView from "./RemarksReviseView"

const {ccclass, property} = cc._decorator;

@ccclass
export default class RemarksItem extends cc.Component {
    @property(cc.Prefab)prefab_RemarksReviseView: cc.Prefab = null;
    @property(cc.Node) roleimg: cc.Node = null;
    @property(cc.Label) name_label: cc.Label = null;
    @property(cc.Label) dos: cc.Label = null;
    @property(cc.Node) bg_1: cc.Node = null;
    @property(cc.Node) delete_btn: cc.Node = null;
    @property(cc.Node) tick_btn: cc.Node = null;

    private _info:RemarkData = null;
    onLoad()
    {
        this.initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("show_tick", this.onShowTick.bind(this), this.node);
        this.onShowTick(false);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("show_tick", this.node);
    }

    private initLanguage()
    {
        cc.find("name_panel/name_title", this.node).getComponent(cc.Label).string = cv.config.getStringData("UITitle31") + ":";
    }

    private onShowTick(isShow:boolean)
    {
        this.delete_btn.active = !isShow;
        this.tick_btn.active = isShow;
        if(!isShow){
            cc.find("select_img", this.tick_btn).active = false;
        }
    }

    updateSVReuseData(index: number, dataArray: Array<RemarkData>)
    {
        if (index < 0 || dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data = dataArray[index];
        this._info = data;
        this.dos.string = data.sRemark;
        this.name_label.string = data.nickname;
        cv.resMgr.setSpriteFrame(this.bg_1, "zh_CN/hall/remarks/remark_box_" + data.nType);
        let img = cc.find("default_img", this.roleimg);
        CircleSprite.cleanHeadNode(img);
        CircleSprite.setCircleSprite(img, this._info.avatar, this._info.plat, false);
        
        let isSelect = false;
        for (let i = 0; i < cv.dataHandler.getUserData().selectIDs.length; i++) {
            let id = cv.dataHandler.getUserData().selectIDs[i];
            if(id == data.nUid)
            {
                isSelect = true;
                break
            }
        }
        cc.find("select_img", this.tick_btn).active = isSelect;
    }
    
    onBtnRevise()
    {
        let inst: cc.Node = RemarksReviseView.getSinglePrefabInst(this.prefab_RemarksReviseView);
        cv.action.addChildToSceneOnce(inst);
        inst.getComponent(RemarksReviseView).show(this._info);
    }

    onBtnDelete()
    {
        cv.TP.showMsg(cv.config.getStringData("RemarksView_tips"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onDelete.bind(this), null);
    }

    private onDelete()
    {
        cv.worldNet.RequestAddRemarks(this._info.nUid, 0, "");
    }

    private onBtnTick(event: cc.Event)
    {
        let img = cc.find("select_img", this.tick_btn);
        img.active = !img.active;

        if(img.active) {
            cv.dataHandler.getUserData().selectIDs.push(this._info.nUid);
        } else {
            for (let i = 0; i < cv.dataHandler.getUserData().selectIDs.length; i++) {
                if(cv.dataHandler.getUserData().selectIDs[i] == this._info.nUid){
                    cv.dataHandler.getUserData().selectIDs.splice(i, 1);
                    break;
                }
            }
        }
        cv.MessageCenter.send("update_delete");
        cv.MessageCenter.send("update_alltoggle");
    }
}
