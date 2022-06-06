import cv from "../cv"
import { CircleSprite } from "../../../common/tools/CircleSprite"
import MyRedPacketsRule from "./MyRedPacketsRule"
import MyRedPacketsShare from "./MyRedPacketsShare"
import HelpFriendView from "./HelpFriendView"
import OpenRedPackets from "./OpenRedPackets"
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

const {ccclass, property} = cc._decorator;

export enum MyRedPacketsViewType {
    MY_RED_PACKETS,     // 我的红包
    HELP_FRIEND,        // 助力好友
};

@ccclass
export default class MyRedPackets extends cc.Component {
    @property(cc.Node) img_bg_top: cc.Node = null;
    @property(cc.Label) txt_title: cc.Label = null;
    @property(cc.Node) share_label: cc.Node = null;
    @property(cc.Node) btn_my: cc.Node = null;
    @property(cc.Node) btn_help_friend: cc.Node = null;

    // 我的红包界面
    @property(cc.Node) my_panel: cc.Node = null;
    @property(cc.Node) tips_panel: cc.Node = null;
    @property(cc.Label) tips_label: cc.Label = null;
    @property(cc.ScrollView) title_scrollView: cc.ScrollView = null;
    @property(cc.Node) title_item: cc.Node = null;
    @property(cc.Node) number_panel: cc.Node = null;
    @property(cc.Node) image_panel: cc.Node = null;
    @property(cc.Node) btn_open: cc.Node = null;
    @property(cc.Node) code_panel: cc.Node = null;
    @property(cc.Node) dos_label: cc.Node = null;
    @property(cc.Node) dos_img: cc.Node = null;
    @property(cc.Node) btn_help: cc.Node = null;
    
    @property(cc.Node) title_bg: cc.Node = null;
    @property(cc.Node) full_label: cc.Node = null;
    @property(cc.Node) title_node: cc.Node = null;
    @property(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    @property(cc.Node) item_img: cc.Node = null;
    @property(cc.Node) mask_node: cc.Node = null;
    @property(cc.Label) dos: cc.Label = null;
    @property(cc.ScrollView) finds_scrollView: cc.ScrollView = null;
    @property(cc.Node) item_finds: cc.Node = null;
    
    // 助力好友界面
    @property(cc.Node) friend_panel: cc.Node = null;
    @property(cc.Label) title_0: cc.Label = null;
    @property(cc.Label) title_1: cc.Label = null;
    @property(cc.EditBox) editBox: cc.EditBox = null;
    @property(cc.Label) des_0: cc.Label = null;
    @property(cc.Label) des_1: cc.Label = null;
    @property(cc.Node) btn_add_helper: cc.Node = null;
    
    @property(cc.Prefab) prefab_MyRedPackets_Rule: cc.Prefab = null;
    @property(cc.Prefab) prefab_MyRedPackets_Share: cc.Prefab = null;
    @property(cc.Prefab) prefab_HelpFriendView: cc.Prefab = null;
    @property(cc.Prefab) prefab_OpenRedPackets: cc.Prefab = null;

    private _time_label:cc.Label = null;
    private _title_list:cc.Node[] = [];
    private _viewType:MyRedPacketsViewType = MyRedPacketsViewType.MY_RED_PACKETS;
    private _myList:world_pb.HelpWrapInfo[] = [];
    private _show_code = 0;
    private static _g_prefabInst: cc.Node = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!MyRedPackets._g_prefabInst) MyRedPackets._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(MyRedPackets._g_prefabInst.uuid)) {
            if (!cc.isValid(MyRedPackets._g_prefabInst, true)) {
                MyRedPackets._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return MyRedPackets._g_prefabInst;
    }

    onLoad () {
        this.item_img.active = false;
        this._initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._initLanguage.bind(this), this.node);
        cv.MessageCenter.register("update_help_Warp_list", this._updateHelpWarpList.bind(this), this.node);
        cv.MessageCenter.register("update_left_help_count", this._updateLeftHelpCount.bind(this), this.node);
        cv.MessageCenter.register("updata_total_history_amount", this._updataTotalHistoryAmount.bind(this), this.node);
        cv.MessageCenter.register("showOpenRedPackets", this.onShowOpenRedPackets.bind(this), this.node);
        cv.MessageCenter.register("showHelpFriendView", this.onShowHelpFriendView.bind(this), this.node);

        cv.resMgr.adaptWidget(this.node, true);
        this.progressBar.totalLength = this.progressBar.node.width;
        this.updateView();
    }
    
    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("update_help_Warp_list", this.node);
        cv.MessageCenter.unregister("update_left_help_count", this.node);
        cv.MessageCenter.unregister("updata_total_history_amount", this.node);
        cv.MessageCenter.unregister("showOpenRedPackets", this.node);
        cv.MessageCenter.unregister("showHelpFriendView", this.node);
    }

    update()
    {
        let s = Math.round(new Date().getTime()/1000);
        if(this._myList.length > 0) {
            for (let value of this._myList) {
                let time = value.captcha_data.create_time + value.captcha_data.expire_time - s;
                if(value.captcha_data.help_count == value.helper_data.length || value.captcha_data.is_available) continue;
                if (time <= 0) {
                    let index = this._myList.indexOf(value);
                    this._myList.splice(index, 1);
                    let nodes = this._title_list.splice(index, 1);
                    nodes[0].removeFromParent(true);
                    nodes[0].destroy();
                    this.title_scrollView.content.width -= (nodes[0].width + 11);
                    if(value.captcha_data.code == this._show_code) {
                        if(this._myList.length > 0) {
                            this._show_code = this._myList[0].captcha_data.code;
                        }
                        this.title_scrollView.scrollToLeft();
                        this.updateView();
                    }
                } else if(value.captcha_data.code == this._show_code){
                    if(this._time_label)
                    {
                        let str = cv.tools.getStringByDay(time);
                        this._time_label.string = cv.StringTools.formatC(cv.config.getStringData("MyRedPackets_time_label"), str);
                    }
                }
            }
        }
    }

    show()
    {
        cv.worldNet.GetTotalHistoryAmountRequest();
        this._viewType = MyRedPacketsViewType.MY_RED_PACKETS;
        this._updateHelpWarpList();
    }

    private onBack(event)
    {
        cv.AudioMgr.playButtonSound('back_button');
        this.editBox.string = "";
        cv.action.showAction(this.node
            , cv.action.eMoveActionDir.EMAD_TO_RIGHT
            , cv.action.eMoveActionType.EMAT_FADE_OUT
            , cv.action.delay_type.NORMAL
            , (target: cc.Node, actIO: number): void => { }
            , (target: cc.Node, actIO: number): void => {
                // 恢复显示"邮件"图标
                cv.MessageCenter.send("show_mail_entrance", true);
                cv.MessageCenter.send("updata_my_redpackets_pos");
            });
    }
    
    private _initLanguage()
    {
        cv.resMgr.setSpriteFrame(this.dos_img, cv.config.getLanguagePath("hall/MyRedPackets/word_tips"));
        this.txt_title.string = cv.config.getStringData("MyRedPackets_txt_title");
        this.btn_my.getComponent(cc.Label).string = cv.config.getStringData("MyRedPackets_btn_my");
        this.btn_help_friend.getComponent(cc.Label).string = cv.config.getStringData("MyRedPackets_btn_help_friend");
        cc.find("Label", this.btn_open).getComponent(cc.Label).string = cv.config.getStringData("MyRedPackets_btn_open_label");
        this.title_0.string = cv.config.getStringData("MyRedPackets_friend_panel_title_0");
        this.title_1.string = cv.config.getStringData("MyRedPackets_friend_panel_title_1");
        cc.find("Label", this.btn_add_helper).getComponent(cc.Label).string = cv.config.getStringData("MyRedPackets_friend_panel_btn_add_helper_label");
        this.editBox.placeholder = cv.config.getStringData("MyRedPackets_friend_panel_editbox_holder");
        this.full_label.getComponent(cc.Label).string = cv.config.getStringData("MyRedPackets_full_label");
        this.dos_label.getComponent(cc.Label).string = cv.config.getStringData("MyRedPackets_dos_label");
        this.dos_label.getComponent(cc.Label).enableBold = true;
        this.share_label.getComponent(cc.RichText).string = "<b>" + cv.config.getStringData("MyRedPackets_btn_help_label") + "</b>";
        cv.resMgr.getLabelStringSize(this.full_label.getComponent(cc.Label));
    }

    private _showViewByType(viewType:MyRedPacketsViewType)
    {
        this.my_panel.active = viewType == MyRedPacketsViewType.MY_RED_PACKETS;
        this.friend_panel.active = viewType == MyRedPacketsViewType.HELP_FRIEND;
        if(viewType == MyRedPacketsViewType.MY_RED_PACKETS) {
            this.btn_my.color = cc.color(229, 209, 146);
            this.btn_help_friend.color = cc.Color.WHITE;
            this._updateMyRedPackets();
        }else {
            this.btn_my.color = cc.Color.WHITE;
            this.btn_help_friend.color = cc.color(229, 209, 146);
            this._updateHelpFriend();
        }
    }

    private _updataTotalHistoryAmount()
    {
        if(cv.dataHandler.getUserData().total_history_amount > 0) {
            let num = cv.StringTools.serverGoldToShowString(cv.dataHandler.getUserData().total_history_amount);
            this.tips_label.string = cv.StringTools.formatC(cv.config.getStringData("MyRedPackets_my_panel_tips_panel_tips_label"), num);
            this.tips_panel.active = true;
        } else {
            this.tips_panel.active = false;
        }
    }

    private _updateMyRedPackets()
    {
        // 预制件隐藏的时候刷新RichText会显示  这里禁止在隐藏的时候刷新  每次打开会更新界面
        if(this._myList.length == 0 || !this.node.active) return;
        this._updataTotalHistoryAmount();
        let data = cv.dataHandler.getUserData().getHelpWarpByID(this._show_code);
        if(data == null)
        {
            data = this._myList[0];
            this._show_code = data.captcha_data.code;
        }

        this._setTitleScrollView();
        this._setFindsScrollView(data);
        // 红包区域
        let prizes_data = data.captcha_data.user_prizes_data;
        this.number_panel.active = prizes_data.luck_warp_type == 0;
        this.image_panel.active = prizes_data.luck_warp_type == 1;
        if(prizes_data.luck_warp_type == 0){ // 金额红包
            this._time_label = cc.find("time_label", this.number_panel).getComponent(cc.Label);
            let numberLabel = cc.find("number_node/number", this.number_panel).getComponent(cc.Label);
            numberLabel.string = cv.StringTools.numToFloatString(prizes_data.amount);
        } else { // 门票红包
            this._time_label = cc.find("time_label", this.image_panel).getComponent(cc.Label);
            let nameLabel = cc.find("name", this.image_panel).getComponent(cc.Label);
            nameLabel.string = cv.StringTools.getServerStrByLanguage(prizes_data.ticket_name) + "*" + prizes_data.ticket_count;
            let icon = cc.find("icon", this.image_panel);
            let url = cv.StringTools.getServerStrByLanguage(prizes_data.ticket_url);
            cv.resMgr.downloadImg(cv.dataHandler.getUserData().getImageUrlByPlat(url), icon);
        }
        this._time_label.node.active = data.captcha_data.help_count > data.helper_data.length;
        this.btn_open.active = data.captcha_data.is_available;
        this.code_panel.active = !data.captcha_data.is_available;
        this.dos_label.active = !data.captcha_data.is_available;
        cc.find("code", this.code_panel).getComponent(cc.Label).string = data.captcha_data.code.toString();

        // 进度条区域
        let helpNum = data.captcha_data.help_count - data.helper_data.length;
        this.full_label.active = helpNum <= 0;
        this.title_node.active = helpNum > 0;
        if(helpNum > 0) {
            let label0 = cc.find("label_0", this.title_node).getComponent(cc.RichText);
            let label1 = cc.find("label_1", this.title_node).getComponent(cc.RichText);
            label0.string = cv.StringTools.formatC(cv.config.getStringData("MyRedPackets_title_node_label_0"), helpNum);
            label1.string = cv.config.getStringData("MyRedPackets_title_node_label_1");
            
            let width = cv.resMgr.getRichTextStringSize(label0).width + cv.resMgr.getRichTextStringSize(label1).width + 64;
            this.title_bg.width = width + 100;
        } else {      
            this.title_bg.width = this.full_label.width + 100;
        }
        this.dos.string = cv.StringTools.formatC(cv.config.getStringData("MyRedPackets_dos_panel_dos"), data.helper_data.length);
        this.progressBar.progress = data.helper_data.length / data.captcha_data.help_count;
        this.mask_node.destroyAllChildren();
        this.mask_node.removeAllChildren(true);
        let len = data.captcha_data.help_count;
        let width = this.mask_node.width / len;
        for (let i = 0; i < len - 1; i++) {
            let item = cc.instantiate(this.item_img);
            item.active = true;
            this.mask_node.addChild(item);
            item.x = width + width * i;
            item.y = 0;
        }
    }

    private _initTitleScrollView()
    {
        this._title_list = [];
        let list = this._myList;
        this.title_item.active = false;
        this.title_scrollView.content.width = 45;
        this.title_scrollView.content.destroyAllChildren();
        this.title_scrollView.content.removeAllChildren(true);

        for (let i = 0; i < list.length; i++) {
            let data = list[i];
            let node = cc.instantiate(this.title_item);
            node.name = data.captcha_data.code.toString();
            node.active = true;
            
            let fname = data.captcha_data.is_available ? "img_dlq" : "img_djh";
            cv.resMgr.setSpriteFrame(cc.find("title_img", node), cv.config.getLanguagePath("hall/MyRedPackets/" + fname));

            let isMoney = data.captcha_data.user_prizes_data.luck_warp_type == 0;
            let isShow = this._show_code == data.captcha_data.code;
            let strName =  isMoney? "bg_title_choose": "bg_title_blue";
            strName = isShow ? strName : "bg_title_redline";
            cv.resMgr.setSpriteFrame(node,  "zh_CN/hall/MyRedPackets/" + strName);

            let number_node = cc.find("number_node", node);
            let tickets = cc.find("tickets_label", node);
            let offsetW = 0;
            tickets.active = !isMoney;
            number_node.active = isMoney;
            if(isMoney) {
                let number = cc.find("number", number_node);
                number.getComponent(cc.Label).string = cv.StringTools.numToFloatString(data.captcha_data.user_prizes_data.amount);
                let labelSize = cv.resMgr.getLabelStringSize(number.getComponent(cc.Label));
                offsetW = labelSize.width - 160;
            } else {
                tickets.getComponent(cc.Label).string = cv.StringTools.getServerStrByLanguage(data.captcha_data.user_prizes_data.ticket_title);
                let labelSize = cv.resMgr.getLabelStringSize(tickets.getComponent(cc.Label));
                offsetW = labelSize.width - 190;
            }
            
            if(offsetW > 0)
            {
                node.width = 234 + offsetW;
                cv.resMgr.adaptWidget(node, true);
                tickets.x = node.width / 2 + 13;
            }
            this.title_scrollView.content.width += (11 + node.width);
            this.title_scrollView.content.addChild(node);
            this._title_list.push(node);
        }
    }

    private _setTitleScrollView()
    {
        let list = this._myList;
        for (let i = 0; i < list.length; i++) {
            let node = this._title_list[i];
            let data = list[i];
            let isMoney = data.captcha_data.user_prizes_data.luck_warp_type == 0;
            let isShow = this._show_code == data.captcha_data.code;
            let strName =  isMoney? "bg_title_choose": "bg_title_blue";
            strName = isShow ? strName : "bg_title_redline";
            cv.resMgr.setSpriteFrame(node,  "zh_CN/hall/MyRedPackets/" + strName);
        }
    }
    
    private _setFindsScrollView(info:world_pb.HelpWrapInfo)
    {
        let list = info.helper_data;
        let len = info.captcha_data.help_count;
        let x = 110;
        this.item_finds.active = false;
        this.finds_scrollView.content.width = 0;
        this.finds_scrollView.content.destroyAllChildren();
        this.finds_scrollView.content.removeAllChildren(true);
        for (let i = 0; i < len; i++) {
            let node = cc.instantiate(this.item_finds);
            node.active = true;
            this.finds_scrollView.content.addChild(node);
            node.setPosition(x, 0);
            x = x + node.width;
            this.finds_scrollView.content.width = x;
            
            cc.find("avatar_empty", node).active = i >= list.length;
            let namelabel = cc.find("name", node);
            let avatar_bg = cc.find("avatar_bg", node);
            let avatar = cc.find("avatar", node);
            namelabel.active = i < list.length;
            avatar_bg.active = i < list.length;
            avatar.active = i < list.length;
            if(i < list.length) {
                let data = list[i];
                let remarkData = cv.dataHandler.getUserData().getRemarkData(data.user_id)
                let nameStr = remarkData.sRemark == "" ? data.nick_name : remarkData.sRemark;
                namelabel.getComponent(cc.Label).string = nameStr;
                
                CircleSprite.cleanHeadNode(avatar);
                CircleSprite.setCircleSprite(avatar, data.avatar, 0, false);
            }
        }
    }

    private _updateHelpFriend()
    {
        this._updateLeftHelpCount();
    }

    private _updateHelpWarpList()
    {
        this._myList = cv.dataHandler.getUserData().getHelpWarpList();
        this._initTitleScrollView();
        this.updateView();
    }

    private _updateLeftHelpCount()
    {
        let num = cv.dataHandler.getUserData().left_help_count;
        this.des_0.string = cv.StringTools.formatC(cv.config.getStringData("MyRedPackets_friend_panel_des_0"), num);
    }

    updateView()
    {
        let viewType = this._viewType;
        if(this._myList.length == 0)
        {
            this.btn_my.active = false;
            this.btn_help_friend.active = false;
            this.img_bg_top.height = 180;
            viewType = MyRedPacketsViewType.HELP_FRIEND;
        }else
        {
            this.btn_my.active = true;
            this.btn_help_friend.active = true;
            this.img_bg_top.height = 270;
        }
        this._showViewByType(viewType);
    }

    onBtnMy()
    {
        if(this._viewType == MyRedPacketsViewType.MY_RED_PACKETS) return;
        cv.AudioMgr.playButtonSound('tab');
        this._viewType = MyRedPacketsViewType.MY_RED_PACKETS;
        this.updateView();
    }

    onBtnHelpFriend()
    {
        if(this._viewType == MyRedPacketsViewType.HELP_FRIEND) return;
        cv.AudioMgr.playButtonSound('tab');
        this._viewType = MyRedPacketsViewType.HELP_FRIEND;
        this.updateView();
    }

    onBtnOpen()
    {
        if(this._show_code == 0) return;
        cv.AudioMgr.playButtonSound('tab');
        cv.worldNet.UserReceiveHelpWarpRequest(this._show_code);
    }

    onBtnAddHelper()
    {
        cv.AudioMgr.playButtonSound('tab');
        let code = this.editBox.string;
        let num = cv.dataHandler.getUserData().left_help_count;
        if(num < 1)
        {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode286"), cv.Enum.ToastType.ToastTypeError);
            return;
        }
        if(code.length < 6)
        {
            cv.TP.showMsg(cv.config.getStringData("MyRedPackets_code_error"), cv.Enum.ButtonStyle.GOLD_BUTTON, null);
            return;
        }
        
        cv.worldNet.AddHelperRequest(cv.Number(code));
    }

    onBtnRule()
    {
        let inst: cc.Node = MyRedPacketsRule.getSinglePrefabInst(this.prefab_MyRedPackets_Rule);
        cv.action.addChildToSceneOnce(inst);
        cv.action.showAction(inst, cv.action.eMoveActionDir.EMAD_TO_LEFT, cv.action.eMoveActionType.EMAT_FADE_IN, cv.action.delay_type.NORMAL);
    }

    onBtnShare()
    {
        let inst: cc.Node = MyRedPacketsShare.getSinglePrefabInst(this.prefab_MyRedPackets_Share);
        cv.action.addChildToSceneOnce(inst);
        let data = cv.dataHandler.getUserData().getHelpWarpByID(this._show_code);
        inst.getComponent(MyRedPacketsShare).show(data);
    }

    onShowHelpFriendView(data:world_pb.AddHelperResponse)
    {
        let inst: cc.Node = HelpFriendView.getSinglePrefabInst(this.prefab_HelpFriendView);
        cv.action.addChildToSceneOnce(inst);
        inst.getComponent(HelpFriendView).show(data);
        this.editBox.string = "";
        this._updateHelpFriend();
    }

    onShowOpenRedPackets(data:world_pb.UserPrizes)
    {
        let inst: cc.Node = OpenRedPackets.getSinglePrefabInst(this.prefab_OpenRedPackets);
        cv.action.addChildToSceneOnce(inst);
        inst.getComponent(OpenRedPackets).show(data);
    }

    onBtnTitle(event: cc.Event.EventTouch)
    {
        let code: number = cv.Number(event.currentTarget.name);
        if(this._show_code == code) return;
        this._show_code = code;
        this._updateMyRedPackets();
    }
}
