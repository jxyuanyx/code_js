import cv from "../cv"
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
const {ccclass, property} = cc._decorator;

@ccclass
export default class OpenRedPackets extends cc.Component {
    @property(cc.Label)title: cc.Label = null;
    @property(cc.Node)number_panel: cc.Node = null;
    @property(cc.Label)number: cc.Label = null;
    @property(cc.Label)des: cc.Label = null;
    @property(cc.Node)tickets_panel: cc.Node = null;
    @property(cc.Node)tickets_img: cc.Node = null;
    @property(cc.Label)tickets_label: cc.Label = null;
    @property(cc.Label)btn_ok_label: cc.Label = null;
    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!OpenRedPackets._g_prefabInst) OpenRedPackets._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(OpenRedPackets._g_prefabInst.uuid)) {
            if (!cc.isValid(OpenRedPackets._g_prefabInst, true)) {
                OpenRedPackets._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return OpenRedPackets._g_prefabInst;
    }
    
    onLoad () {
        this._initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    private _initLanguage()
    {
        this.title.string = cv.config.getStringData("OpenRedPackets_title");
        this.btn_ok_label.string = cv.config.getStringData("HelpFriendView_btn_ok_label");
    }

    onBtnOK()
    {
        cv.AudioMgr.playButtonSound('tab');
        this.node.active = false;
    }

    show(prizes_data:world_pb.UserPrizes)
    {
        this.node.active = true;
        this.number_panel.active = prizes_data.luck_warp_type == 0;
        this.tickets_panel.active = prizes_data.luck_warp_type == 1;
        let num = prizes_data.luck_warp_type;
        if(prizes_data.red_type == 1){
            num = 2;
        }
        this.des.string = cv.config.getStringData("OpenRedPackets_des_" + num);
        let str = cv.StringTools.serverGoldToShowString(prizes_data.amount);
        this.number.string = str;
        if(str.length < 4) {
            this.number.node.setScale(1);
        } else if (str.length == 4){
            this.number.node.setScale(0.75);
        }else {
            this.number.node.setScale(0.7);
        }
        this.tickets_label.string = cv.StringTools.getServerStrByLanguage(prizes_data.ticket_name) + "*" + prizes_data.ticket_count;
        //门票替换
        let url = cv.StringTools.getServerStrByLanguage(prizes_data.ticket_url);
        cv.resMgr.downloadImg(cv.dataHandler.getUserData().getImageUrlByPlat(url), this.tickets_img);
    }
}
