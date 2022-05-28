import cv from "../cv"
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import { CircleSprite } from "../../../common/tools/CircleSprite"
import world_pb = ws_protocol.pb;
const {ccclass, property} = cc._decorator;

@ccclass
export default class HelpFriendView extends cc.Component {
    @property(cc.Label)title: cc.Label = null;
    @property(cc.Node)avatar: cc.Node = null;
    @property(cc.Label)name_label: cc.Label = null;
    @property(cc.Label)des_0: cc.Label = null;
    @property(cc.Label)btn_ok_label: cc.Label = null;
    private _data:world_pb.AddHelperResponse = null;
    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!HelpFriendView._g_prefabInst) HelpFriendView._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(HelpFriendView._g_prefabInst.uuid)) {
            if (!cc.isValid(HelpFriendView._g_prefabInst, true)) {
                HelpFriendView._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return HelpFriendView._g_prefabInst;
    }
    onLoad () {
        this._initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private _close()
    {
        this.node.active = false;
    }

    private _initLanguage()
    {
        this.title.string = cv.config.getStringData("HelpFriendView_title");
        this.des_0.string = cv.config.getStringData("HelpFriendView_des_0");
        this.btn_ok_label.string = cv.config.getStringData("HelpFriendView_btn_ok_label");
    }

    private onBtnOK()
    {
        cv.AudioMgr.playButtonSound('tab');
        this._close();
        cv.MessageCenter.send("showOpenRedPackets", this._data.user_prizes_data);
    }

    show(data:world_pb.AddHelperResponse)
    {
        this.node.active = true;
        this._data = data;
        let remarkData = cv.dataHandler.getUserData().getRemarkData(data.user_id)
        let nameStr = remarkData.sRemark == "" ? data.nick_name : remarkData.sRemark;
        nameStr = nameStr.slice(0, 2) + "***";
        this.name_label.string = nameStr;
        
        CircleSprite.cleanHeadNode(this.avatar);
        CircleSprite.setCircleSprite(this.avatar, data.avatar, 0, false);
    }
}
