import cv from "../../lobby/cv";
import JackfruitMgr from "./JackfruitManager";
import { CAFInfo, ObPlayer } from "../dzPoker/data/RoomData";
import { PlayerInfo } from "./JackfruitData";
import { FaceItem } from "../dzPoker/FaceItem";
import { RemarkData } from "../../../data/userData";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import FaceView from "../dzPoker/danmu/FaceView";

const { ccclass, property } = cc._decorator;
@ccclass
export class JackfruitPrivateInfo extends cc.Component {
    @property(cc.Node) _replay_btn: cc.Node = null;
    @property(cc.Label) _replay_txt: cc.Label = null;

    @property(cc.Label) _fruit_totalhand_txt: cc.Label = null;
    @property(cc.Label) _totalhand_text: cc.Label = null;
    @property(cc.Label) _level_hand_txt: cc.Label = null;
    @property(cc.Label) _level_text: cc.Label = null;

    @property(cc.Label) _max_win_txt: cc.Label = null;
    @property(cc.Label) _max_win_text: cc.Label = null;
    @property(cc.Label) _all_win_rate_txt: cc.Label = null;
    @property(cc.Label) _all_win_rate_text: cc.Label = null;

    @property(cc.Label) _ofruit_totalhand_txt: cc.Label = null;
    @property(cc.Label) _ototalhand_text: cc.Label = null;
    @property(cc.Label) _olevel_hand_txt: cc.Label = null;
    @property(cc.Label) _olevel_text: cc.Label = null;

    @property(cc.Label) _omax_win_txt: cc.Label = null;
    @property(cc.Label) _omax_win_text: cc.Label = null;
    @property(cc.Label) _oall_win_rate_txt: cc.Label = null;
    @property(cc.Label) _oall_win_rate_text: cc.Label = null;

    @property(cc.Node) _face_panel: cc.Node = null;
    @property(cc.Node) _root: cc.Node = null;
    @property(cc.Node) _fruit_panel: cc.Node = null;
    @property(cc.Node) _other_panel: cc.Node = null;
    @property(cc.Node) _face_bg: cc.Node = null;
    @property(cc.Node) _panel_bg: cc.Node = null;
    @property(cc.Node) _headNode: cc.Node = null;
    @property(cc.Node) _block_button: cc.Node = null;
    @property(cc.Node) _block_img: cc.Node = null;

    @property(cc.Prefab) faceItem: cc.Prefab = null;

    @property(cc.Label) _roleName_text: cc.Label = null;

    _speakingVoice: boolean = false;
    _currPlayVoiceId: number = 0;
    _currentUid: number = 0;
    _opcityNum: number = 0;

    _shade: cc.Node = null;
    canSendFace: boolean = true;

    _player: PlayerInfo = null;
    _obplayer: ObPlayer = null;
    _enterType: number = 0;//0 表示从桌面进入 1 表示从观察列表进入
    _disturb: number = 2;

    _remark_panel: cc.Node = null;
    _signature_panel: cc.Node = null;
    _signature_button: cc.Node = null;
    _signature_text: cc.Node = null;
    _signature_editbox: cc.Node = null;
    _signature_sure_button: cc.Node = null;

    _interaction_panel: cc.Node = null;
    _id_panel: cc.Node = null;
    _id_txt: cc.Node = null;
    _gender_img: cc.Node = null;
    _certification_sp: cc.Node = null;
    _cn_des_sp: cc.Node = null;
    _cn_des_txt: cc.Node = null;
    _remark_text: cc.Node = null;//备注
    _remark_button: cc.Node = null;
    _remarkbtn_panel: cc.Node = null;
    _sure_button: cc.Node = null;
    _cancel_button: cc.Node = null;
    menu_button: cc.Node = null;//
    menu_text: cc.Node = null;
    menu_icon: cc.Node = null;
    menu_arrow: cc.Node = null;
    buttonList: Array<cc.Node> = [];

    _signInput_text: cc.Node = null;//备注信息 cocos2d::ui::EditBox*
    remark_click_type: number = 0;

    _like_node: cc.Node = null;
    _self_like_text: cc.Node = null;
    _friend_des_btn: cc.Node = null;
    _friend_des_sp: cc.Node = null;
    _friend_des_txt: cc.Node = null;
    _friend_node: cc.Node = null;
    _friend_sp: cc.Node = null;
    _friend_num: cc.Node = null;
    _friend_text: cc.Node = null;
    _avatar_block_node: cc.Node = null;

    _recond_button: cc.Node = null;//播音按钮
    _playback_text: cc.Node = null;
    _like_button: cc.Node = null;
    _like_label: cc.Node = null;
    _like_img: cc.Node = null;
    _other_like_text: cc.Node = null;
    _at_button: cc.Node = null;
    _at_img: cc.Node = null;
    _at_txt: cc.Label = null;

    _editbox_state = 0;//focus会造成死循环防止死循环
    _isAuthVerify: boolean = false;
    _timeIDs:Array<any> = [];
    private _BakSignalString:string = null;

    onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);

        this._shade = cv.action.createShieldLayer(this.node.getParent(), "shieldLayer-jackfruitprivateInfo", cv.Enum.ZORDER_TYPE.ZORDER_6, cc.Color.BLACK, 100,
            function (event: cc.Event) { event.stopPropagation(); this.node.active = false; this._shade.active = false; }.bind(this));
        this._shade.active = false;

        this._opcityNum = 300;
        this._speakingVoice = false;

        this._root = cc.find("root", this.node);
        this._panel_bg = cc.find("root/panelbg", this.node);
        this._panel_bg.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            this._signature_sure_button.active = false;
            this._signature_editbox.active = false;
    
            this._signature_text.active = true;

            this._friend_des_sp.active = false;
            this._cn_des_sp.active = false;
            this._panel_bg.getChildByName("zhezhao_panel").active = false;

            this._editbox_state = 0;
            
            if(cv.dataHandler.getUserData().u32Uid == this._currentUid) {
                this._signature_button.active = true;
            }
            else
            {
                this._signature_button.active = false;
            }
            event.stopPropagation();
        });
        this._fruit_panel = cc.find("fruit_panel", this._panel_bg);
        this._other_panel = cc.find("other_panel", this._root);

        this._interaction_panel = cc.find("interaction_panel", this._root);
        this._id_panel = this._panel_bg.getChildByName("id_panel");
        this._id_txt = this._id_panel.getChildByName("id_txt");
        this._recond_button = (this._interaction_panel.getChildByName("replay_button"));
        this._block_button = (this._interaction_panel.getChildByName("block_button"));
        this._like_button = this._interaction_panel.getChildByName("like_button");
        this._like_img = this._like_button.getChildByName("Background");
        this._other_like_text = this._like_button.getChildByName("Label");
        this._at_button = this._interaction_panel.getChildByName("at_button");
        this._at_img = this._at_button.getChildByName("Background");
        this._at_txt = this._at_button.getChildByName("Label").getComponent(cc.Label);

        this._remark_panel = cc.find("remark_panel", this.node);
        this._remark_panel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
            this._remark_panel.active = false;
            this.setButtonListToShow(false);
        });

        this._signature_panel = cc.find("signature_panel", this._panel_bg);
        //this._signature_panel.active = false;
        this._signature_button = this._signature_panel.getChildByName("signature_button");
        this._signature_button.active = false;
        this._signature_editbox = this._signature_panel.getChildByName("editbox");
        this._signature_editbox.getComponent(cc.EditBox).placeholder = cv.config.getStringData("Star_input_signature");
        this._signature_text = this._signature_panel.getChildByName("signature_text");
        this._signature_sure_button = this._signature_panel.getChildByName("signature_sure_button");
        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;
        this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
        this._signature_button.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);

        this._panel_bg.getChildByName("zhezhao_panel").active = false;

        this._signature_sure_button.on('click', function() {
            let str = this._signature_editbox.getComponent(cc.EditBox).string;
            let errorMsg = null;
            let errorType = null;

            let edit_state = cv.dataHandler.getUserData().mark_edit_state;
            if(edit_state == 1){
                //修改次数达到上限
                cv.TT.showMsg(cv.config.getStringData("signature_limit_tip"), cv.Enum.ToastType.ToastTypeError);
                return;
            }else if(edit_state == 2){
                //修入敏感字符达到上限
                cv.TT.showMsg(cv.config.getStringData("signature_sensitive_tip"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
            
            if (str != cv.config.getStringData("Star_signature") && !cv.StringTools.isClubNameFormat(str)) {
                errorMsg = "tips_no_special_words";
                errorType = "ToastTypeWarning";
            } else if (cv.StringTools.isSensitiveWords(str)) {
                errorMsg = "tips_no_sensitive_words";
                errorType = "ToastTypeWarning";
                cv.worldNet.UpdateUserMarksRequest("", 1);    //修改为敏感字符，传状态给服务器
            }
            if (errorMsg != null) {
                cv.TT.showMsg(cv.config.getStringData(errorMsg), errorType);
                return;
            }

            let strsp = this._signature_editbox.getComponent(cc.EditBox).string.trim();
            if (strsp.length == 0) {
                // cv.TT.showMsg(cv.config.getStringData("Star_signature_empty"), cv.Enum.ToastType.ToastTypeError);
                // return;
            }
            cv.worldNet.UpdateUserMarksRequest(this._signature_editbox.getComponent(cc.EditBox).string);
        }, this);

        this._sure_button = cc.find("sure_button", this._remark_panel);
        this._cancel_button = cc.find("cancel_button", this._remark_panel);
        this._sure_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_sure_button"));
        this._cancel_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_cancle_button"));

        let remark_button_0 = (this._remark_panel.getChildByName("remark_button_0"));
        let menu_text_0 = (remark_button_0.getChildByName("menu_text_0"));
        
        let label_text = (this._remark_panel.getChildByName("label_text"));
        let set_note_text = (this._remark_panel.getChildByName("set_note_text"));
        label_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_label_text"));
        set_note_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_set_note_text"));

        this._like_node = this._panel_bg.getChildByName("like_node");
        this._self_like_text = this._like_node.getChildByName("like_num");

        this._friend_node = this._panel_bg.getChildByName("friend_node");
        this._friend_sp = this._friend_node.getChildByName("friend_sp");
        this._friend_des_btn = this._friend_node.getChildByName("des_btn");
        this._friend_des_sp = this._root.getChildByName("des_sp");
        this._friend_des_txt = this._friend_des_sp.getChildByName("des_txt");

        this._panel_bg.getChildByName("zhezhao_panel").on(cc.Node.EventType.TOUCH_END, (event: cc.Event)=>{
            this._friend_des_sp.active = false;
            this._cn_des_sp.active = false;
            this._panel_bg.getChildByName("zhezhao_panel").active = false;
            event.stopPropagation();
        }, this);

        this._friend_des_btn.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('tab');
            this._cn_des_sp.active = false;
            if (this._friend_des_sp.active) {
                this._friend_des_sp.active = false;
                this._panel_bg.getChildByName("zhezhao_panel").active = false;
            }
            else
            {
                this._friend_des_sp.active = true;
                this._friend_des_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_friend_degree");
                this._panel_bg.getChildByName("zhezhao_panel").active = true;
            }
        }, this);

        this._friend_num = this._friend_node.getChildByName("friend_num");
        this._friend_text = this._friend_node.getChildByName("friend_text");
        this._avatar_block_node = this._panel_bg.getChildByName("avatar_block");
        this._like_node.active = false;
        this._friend_node.active = false;
        this._avatar_block_node.active = false;

        this._gender_img = cc.find("gender_img", this._panel_bg);
        this._certification_sp = cc.find("certification_sp", this._panel_bg);
        this._cn_des_sp = this._certification_sp.getChildByName("cn_des_sp");
        this._cn_des_txt = this._cn_des_sp.getChildByName("cn_des_txt");
        this._cn_des_sp.active = false;
        this._certification_sp.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            this._friend_des_sp.active = false;
            if (this._cn_des_sp.active) {
                this._cn_des_sp.active = false;
                this._panel_bg.getChildByName("zhezhao_panel").active = false;   
            }
            else
            {
                if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    this._cn_des_txt.setContentSize(390, 64);
                }
                else
                {
                    this._cn_des_txt.setContentSize(370, 64);
                }
                this._cn_des_sp.active = true;
                if (this._isAuthVerify) {
                    this._cn_des_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_certification_pass");
                    this._cn_des_sp.setContentSize(440, 80);
                    this._cn_des_txt.setPosition(220, this._cn_des_txt.getPosition().y);
                    this._cn_des_txt.color = new cc.Color().fromHEX("#FFFFFF");
                }
                else
                {
                    this._cn_des_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_certification_not_pass");
                    this._cn_des_sp.setContentSize(400, 80);
                    this._cn_des_txt.setPosition(200, this._cn_des_txt.getPosition().y);
                    this._cn_des_txt.color = new cc.Color().fromHEX("#FF4D4D");
                }
                this._panel_bg.getChildByName("zhezhao_panel").active = true;

                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    this._cn_des_txt.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                }
                else
                {
                    this._cn_des_txt.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                }
            }
            event.stopPropagation();
        });

        this._remark_button = (this._panel_bg.getChildByName("remark_button"));
        this._remarkbtn_panel = (this._panel_bg.getChildByName("remarkbtn_panel"));
        this._remark_text = this._panel_bg.getChildByName("remark_text");
        this.menu_button = (this._remark_panel.getChildByName("menu_button"));
        this.menu_text = (this.menu_button.getChildByName("menu_text"));
        this.menu_icon = (this.menu_button.getChildByName("menu_icon"));
        this.menu_arrow = (this.menu_button.getChildByName("menu_arrow"));

        this.menu_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_menu_button_menu_text"));
        menu_text_0.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_menu_button_menu_text"));


        this.menu_button.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event) {
            cv.AudioMgr.playButtonSound('button_click');
            event.stopPropagation();
            this.setButtonListToShow(!this.buttonList[0].active);
        }.bind(this));

        this._remark_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_role_remark_text"));
        this._remark_text.getComponent(cc.Label)._forceUpdateRenderData(true);
        this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width + 15, this._remark_button.getPosition().y);
        this._remark_button.on(cc.Node.EventType.TOUCH_END, this.showRemarkPanel, this);
        this._remarkbtn_panel.on(cc.Node.EventType.TOUCH_END, this.showRemarkPanel, this);
        this._sure_button.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event) {
            cv.AudioMgr.playButtonSound('button_click');
            let str = this._signInput_text.getComponent(cc.EditBox).string;
            let errorMsg = null;
            let errorType = null;

            if (!cv.StringTools.isClubNameFormat(str)) {
                errorMsg = "tips_no_special_words";
                errorType = "ToastTypeWarning";
            } 
            else if (cv.StringTools.isSensitiveWords(str)) {
                errorMsg = "tips_no_sensitive_words";
                errorType = "ToastTypeWarning";
            }
            if (errorMsg != null) {
                cv.TT.showMsg(cv.config.getStringData(errorMsg), errorType);
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
            cv.worldNet.RequestAddRemarks(this._currentUid, this.remark_click_type, str);
            event.stopPropagation();
            this._remark_panel.active = (false);
        }.bind(this));

        this._cancel_button.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event) {
            cv.AudioMgr.playButtonSound('button_click');
            event.stopPropagation();
            this._remark_panel.active = (false);
        }.bind(this));

        this._signInput_text = (this._remark_panel.getChildByName("signInput_text"));
        this._signInput_text.getComponent(cc.EditBox).string = (cv.config.getStringData("roleInfo_root_remark_panel_signInput_text"));
        this._signInput_text.getComponent(cc.EditBox).placeholder = cv.config.getStringData("roleInfo_root_remark_panel_signInput_text");
        for (let i = 0; i < 6; i++) {
            let btn = (this._remark_panel.getChildByName(cv.StringTools.formatC("remark_button_%d", i)));
            btn.setPosition(btn.x, this.menu_button.y - (this.menu_button.getContentSize().height - 5) * (i + 1));
            //btn.tag = (i);
            btn.active = (false);
            btn.on(cc.Node.EventType.TOUCH_END, this.onClickRemarkButton, this);
            // btn.zIndex = (10);
            this.buttonList.push(btn);
        }
        this._remark_panel.active = (false);

        this._face_bg = cc.find("face_panel/face_bg", this.node);
        this._replay_btn = cc.find("replay_button", this._interaction_panel);
        this._block_button = cc.find("block_button", this._interaction_panel);
        this._block_img = cc.find("block_img", this._panel_bg);
        this._block_img.active = false;

        this._roleName_text = cc.find("root/panelbg/roleName_text", this.node).getComponent(cc.Label);
        this._replay_txt = cc.find("root/interaction_panel/replay_button/Label", this.node).getComponent(cc.Label);

        this._fruit_totalhand_txt = cc.find("fruit_panel/fruit_totalhand_txt", this._panel_bg).getComponent(cc.Label);
        this._totalhand_text = cc.find("fruit_panel/totalhand_text", this._panel_bg).getComponent(cc.Label);
        this._level_hand_txt = cc.find("fruit_panel/level_hand_txt", this._panel_bg).getComponent(cc.Label);
        this._level_text = cc.find("fruit_panel/level_text", this._panel_bg).getComponent(cc.Label);
        this._max_win_txt = cc.find("fruit_panel/max_win_txt", this._panel_bg).getComponent(cc.Label);
        this._max_win_text = cc.find("fruit_panel/max_win_text", this._panel_bg).getComponent(cc.Label);
        this._all_win_rate_txt = cc.find("fruit_panel/all_win_rate_txt", this._panel_bg).getComponent(cc.Label);
        this._all_win_rate_text = cc.find("fruit_panel/all_win_rate_text", this._panel_bg).getComponent(cc.Label);
        this._fruit_totalhand_txt.enableBold = true;
        this._totalhand_text.enableBold = true;
        this._level_hand_txt.enableBold = true;
        this._level_text.enableBold = true;
        this._max_win_txt.enableBold = true;
        this._max_win_text.enableBold = true;
        this._all_win_rate_txt.enableBold = true;
        this._all_win_rate_text.enableBold = true;

        if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN) {
            cc.find("fruit_panel/level_hand_txt", this._panel_bg).setPosition(160, cc.find("fruit_panel/level_hand_txt", this._panel_bg).getPosition().y);
            cc.find("fruit_panel/level_text", this._panel_bg).setPosition(160, cc.find("fruit_panel/level_text", this._panel_bg).getPosition().y);
            cc.find("fruit_panel/all_win_rate_txt", this._panel_bg).setPosition(160, cc.find("fruit_panel/all_win_rate_txt", this._panel_bg).getPosition().y);
            cc.find("fruit_panel/all_win_rate_text", this._panel_bg).setPosition(160, cc.find("fruit_panel/all_win_rate_text", this._panel_bg).getPosition().y);
        }
        
        this._ofruit_totalhand_txt = cc.find("fruit_totalhand_txt", this._other_panel).getComponent(cc.Label);
        this._ototalhand_text = cc.find("totalhand_text", this._other_panel).getComponent(cc.Label);
        this._olevel_hand_txt = cc.find("level_hand_txt", this._other_panel).getComponent(cc.Label);
        this._olevel_text = cc.find("level_text", this._other_panel).getComponent(cc.Label);
        this._omax_win_txt = cc.find("max_win_txt", this._other_panel).getComponent(cc.Label);
        this._omax_win_text = cc.find("max_win_text", this._other_panel).getComponent(cc.Label);
        this._oall_win_rate_txt = cc.find("all_win_rate_txt", this._other_panel).getComponent(cc.Label);
        this._oall_win_rate_text = cc.find("all_win_rate_text", this._other_panel).getComponent(cc.Label);

        this._headNode = cc.find("head_panel/headNode", this._panel_bg);

        this._face_panel = cc.find("face_panel/face_panel", this.node);

        this._block_button.on('click', function() {
            this._cn_des_sp.active = false;
            this._friend_des_sp.active = false;

            if (this._enterType==0) {
                cv.jackfruitNet.requestNotDisturb(this._disturb, this._player.playerId);
            }
            else if (this._enterType==1) {
                cv.jackfruitNet.requestNotDisturb(this._disturb, this._obplayer.playerid);
            }
        }, this);

        this._like_button.on("click", function() {
            this._cn_des_sp.active = false;
            this._friend_des_sp.active = false;

            if (this._enterType==0) {
                cv.jackfruitNet.requestLike(this._player.playerId);
            }
            else if (this._enterType==1) {
                cv.jackfruitNet.requestLike(this._obplayer.playerid);
            }
        }, this);

        this._at_button.on('click', function () {
            this.node.active = false;
            this._shade.active = false;
            this._cn_des_sp.active = false;
            this._friend_des_sp.active = false;
            
            let xxx = cc.director.getScene();
            cc.director.getScene().getChildByName("currentTime").active = false;
            cc.director.getScene().getChildByName("Canvas").getChildByName("face_Panel").getComponent(FaceView).showUi();
            if (this._enterType==0) {
                cc.director.getScene().getChildByName("Canvas").getChildByName("face_Panel").getComponent(FaceView).onclickRoleHead(this._player.playerId, true);
                cc.director.getScene().getChildByName("Canvas").getChildByName("face_Panel").getComponent(FaceView).onselect(this._player.playerId);
            }
            else if (this._enterType==1) {
                cc.director.getScene().getChildByName("Canvas").getChildByName("face_Panel").getComponent(FaceView).onclickRoleHead(this._obplayer.playerid, true);
                cc.director.getScene().getChildByName("Canvas").getChildByName("face_Panel").getComponent(FaceView).onselect(this._obplayer.playerid);
            }
        }, this);


        for (let i = 0; i < 18; i++) {
            let item = cc.instantiate(this.faceItem);
            item.getComponent(FaceItem).setData(i, JackfruitMgr.tRoomData.fee.emotionFee);
            if (i >= 12) {
                item.setPosition(new cc.Vec2((i - 12) * 146.66 - 440, -258));
            }
            else if (i >= 6 && i < 12) {
                item.setPosition(new cc.Vec2((i - 6) * 146.66 - 440, -86));
            }
            else {
                item.setPosition(new cc.Vec2(i * 146.66  - 440, 86));
            }
            this._face_panel.addChild(item);
        }

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
            this.node.active = false;
            this._shade.active = false;
            this._signature_editbox.active = false;
            this._signature_sure_button.active = false;

            this._friend_des_sp.active = false;
            this._cn_des_sp.active = false;
            this._panel_bg.getChildByName("zhezhao_panel").active = false;

            this._signature_text.active = true;
            this._signature_button.active = true;
            this._remark_panel.active = false;
            this._editbox_state = 0;
        });
        
        let bighead = cc.director.getScene().getChildByName("bighead");
        this._headNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
            bighead.active = true;
            this.node.active = false;
        }, this);

        bighead.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
            bighead.active = false;
            this.node.active = true;
        }, this);

        this.initLanguage();

        cv.MessageCenter.register("JFPrivateInfo", this._onMsgUpdatePrivateData.bind(this), this.node);
        cv.MessageCenter.register("on_play_voice", this.speakOverFunc.bind(this), this.node);
        //cv.MessageCenter.register("effet_call", this.doOpcityX.bind(this), this.node);
        cv.MessageCenter.register("NotDisturb", this.NotDisturb.bind(this), this.node);

        cv.MessageCenter.register("like", this.OnLike.bind(this), this.node);
        cv.MessageCenter.register("get_usermarks", this.onGetUserMarks.bind(this), this.node);
        cv.MessageCenter.register("modify_usermarks", this.onModifyUserMarks.bind(this), this.node);
        cv.MessageCenter.register("update_remarks", this.OnUpdate_remarks.bind(this), this.node);
    }

    private _onMsgUpdatePrivateData(msg): void {
        //刷新统计数据
        let data = JSON.parse(msg.data)
        this._totalhand_text.string = data.handcount;
        this._level_text.string = data.levelhand;
        this._max_win_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.maxwinscore));
        this._all_win_rate_text.string = data.winallcount;

        this._ototalhand_text.string = data.handcount;
        this._olevel_text.string = data.levelhand;
        this._omax_win_text.string = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(data.maxwinscore));
        this._oall_win_rate_text.string = data.winallcount;


        if (data.has_liked) {
            this._like_button.getComponent(cc.Button).enabled = false;
            cc.find("Background", this._like_button).opacity = 76.5;
            cv.resMgr.setSpriteFrame(cc.find("Background", this._like_button), "zh_CN/game/dzpoker/datacard/btn_like_disable");
        }
        else
        {
            this._like_button.getComponent(cc.Button).enabled = true;
            cc.find("Background", this._like_button).opacity = 255;
            cv.resMgr.setSpriteFrame(cc.find("Background", this._like_button), "zh_CN/game/dzpoker/datacard/btn_like_enable");
        }
        this._self_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", data.liked_count));
        this._other_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", data.liked_count));
        this._friend_num.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", data.intimacy));

        //data.intimacy = 99;
        if (data.intimacy < 100 && data.intimacy >= 0) {
            cv.resMgr.setSpriteFrame(this._friend_sp, "zh_CN/game/dzpoker/datacard/friend_luren_tag");
            this._friend_sp.setPosition(0, 0);
            this._friend_num.setPosition(0, -70);
            this._friend_num.color = new cc.Color().fromHEX("#FFFFFF");
            this._friend_text.setPosition(0, -103);
            this._friend_text.setContentSize(112, 50);
            this._friend_des_sp.setPosition(201, 347);
        }
        else
        {
            cv.resMgr.setSpriteFrame(this._friend_sp, "zh_CN/game/dzpoker/datacard/friend_tag");
            this._friend_sp.setPosition(0, 10);
            this._friend_num.setPosition(0, -88);
            this._friend_num.color = new cc.Color().fromHEX("#FFF59C");
            this._friend_text.setPosition(0, -131);
            this._friend_text.setContentSize(118, 50);
            this._friend_des_sp.setPosition(201, 310);
        }

        if (data.intimacy >= 100 && cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.yn_TH) {
            this._friend_text.setPosition(0, -128);
            this._friend_text.setContentSize(118, 58);
        }

        if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.yn_TH) {
            this._friend_text.getComponent(cc.Label).fontSize = 20;
        }

        let str = cv.StringTools.calculateAutoWrapString(this._friend_text.getComponent(cc.Label).node, cv.tools.GetFriendLevelName(data.intimacy));
        this._friend_text.getComponent(cc.Label).string = str;
    }

    onDestroy() {
        cv.MessageCenter.unregister("JFPrivateInfo", this.node);
        cv.MessageCenter.unregister("on_play_voice", this.node);
        //cv.MessageCenter.unregister("effet_call", this.node);
        cv.MessageCenter.unregister("NotDisturb", this.node);

        cv.MessageCenter.unregister("like", this.node);
        cv.MessageCenter.unregister("get_usermarks", this.node);
        cv.MessageCenter.unregister("modify_usermarks", this.node);
        cv.MessageCenter.unregister("update_remarks", this.node);
        while(this._timeIDs.length > 0) {
            clearTimeout(this._timeIDs.shift());
        }
    };

    initLanguage() {
        this._replay_txt.string = cv.config.getStringData("jackfruit_replay_label");
        this._at_txt.string = cv.config.getStringData("Faceview_danmu_button_danmu");

        let str = cv.StringTools.calculateAutoWrapString(this._ofruit_totalhand_txt.node, cv.config.getStringData("jackfruit_total_hand_label"));
        this._fruit_totalhand_txt.string = str;
        this._ofruit_totalhand_txt.string = str;

        str = cv.StringTools.calculateAutoWrapString(this._olevel_hand_txt.node, cv.config.getStringData("jackfruit_level_hand_label"));
        this._level_hand_txt.string = str;
        this._olevel_hand_txt.string = str;
        str = cv.StringTools.calculateAutoWrapString(this._omax_win_txt.node, cv.config.getStringData("jackfruit_max_win_label"));
        this._max_win_txt.string = str;
        this._omax_win_txt.string = str;
        str = cv.StringTools.calculateAutoWrapString(this._oall_win_rate_txt.node, cv.config.getStringData("jackfruit_all_win_rate_label"));
        this._all_win_rate_txt.string = str;
        this._oall_win_rate_txt.string = str;
    }

    private speak(event: cc.Event) {
        this._cn_des_sp.active = false;
        this._friend_des_sp.active = false;

        if (event.type == cc.Node.EventType.TOUCH_END) {

            for (let i = (0); i < JackfruitMgr.tRoomData.kTablePlayerList.length; i++) {
                let pkPlayer = JackfruitMgr.tRoomData.kTablePlayerList[i];
                if (this._currentUid == pkPlayer.playerId) {
                    if (this._speakingVoice == true) {  //防止连续点击
                        console.log("speaking is now.");
                        return;
                    }
                    if (pkPlayer.lastVoice.length > 0) {
                        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                            cv.native.StopPlay();
                            let kInfo: CAFInfo = new CAFInfo();
                            kInfo.kUrl = pkPlayer.lastVoice;
                            kInfo.kSender = this._roleName_text.getComponent(cc.Label).string;
                            kInfo.u32SeatId = pkPlayer.seatId;
                            cv.native.PlayRoomVoice(kInfo);
                        } else {
                            cv.AudioMgr.stop(this._currPlayVoiceId);
                            //cv.AudioMgr.preload(pkPlayer.last_voice);
                            //cv.AudioMgr.play(pkPlayer.last_voice);
                            this.downloadVoice(pkPlayer);
                        }
                        
                        this._speakingVoice = true;
                        this.updataRecondButtonTouch();
                    }
                    return;
                }
            }
        }
    }

    //音效开始播完回调
    private speakOverFunc(param: CAFInfo = null) {
        //播放完回调，重置状态
        if (param == null) {
            this._speakingVoice = false;
            this.updataRecondButtonTouch();
            return;
        }
        let audioTime = param.f32Time;

        let self = this;
        let id = setTimeout(function () {
            self._timeIDs.shift();
            self._speakingVoice = false;
            self.updataRecondButtonTouch();
        }, 1000 *audioTime);
        this._timeIDs.push(id);
    }

    private downloadVoice(pkPlayer: PlayerInfo) {
        let i32Index = cv.AudioMgr.getAudioID(pkPlayer.lastVoice);
        let f32Dura = cv.AudioMgr.getDuration(i32Index);
        this._currPlayVoiceId = i32Index;

        let kInfo: CAFInfo = new CAFInfo();
        let _url = pkPlayer.lastVoice;
        if (_url.indexOf("@") != -1) {
            let subStr = _url.split("@");
            kInfo.kUrl = subStr[2];
        } else {
            kInfo.kUrl = pkPlayer.lastVoice;
        }
        kInfo.kSender = this._roleName_text.getComponent(cc.Label).string;
        kInfo.f32Time = f32Dura > 10 ? 10 : f32Dura;
        kInfo.u32SeatId = pkPlayer.seatId;
        cv.httpHandler.DoDownloadVoice(kInfo, this.speakOverFunc.bind(this));
    }

    Update(f32Delta: number) {
        this._opcityNum = this._opcityNum - 1;
        if (this._opcityNum <= 150) {
            this.node.active = false;
            this._opcityNum = 300;
            this.unschedule(this.Update);
            return;
        }
        let num = this._opcityNum >= 255 ? 255 : this._opcityNum;
        this.doOpcity(this.node, num);
    }

    doOpcity(obj: cc.Node, opacityNum: number) {
        if (!obj) {
            return;
        }
        obj.opacity = opacityNum;
        let len = obj.childrenCount;
        let list = obj.children;
        for (let i = 0; i < len; i++) {
            list[i].opacity = opacityNum;
            if (list[i].childrenCount > 0) {
                this.doOpcity(list[i], opacityNum);
            }
        }
    }

    doOpcityX(sender: any) {
        this._root.active = (false);
        this._fruit_panel.active = false;
        this._shade.active = false;

        this._face_bg.active = (true);
        this.doOpcity(this.node, 255);
        cc.find("sprite_splash", this._remark_panel).opacity = 100;

        this.unschedule(this.Update);
        this._opcityNum = 300;
        this.schedule(this.Update, 0);
    }

    showself() {
        this.adaptSelfWidget();
        this._like_node.active = true;
        this._friend_node.active = false;
        this._remark_button.active = false;
        this._remarkbtn_panel.active = false;
        this._remark_text.active = false;
        this._interaction_panel.active = false;
        this._fruit_panel.active = true;
        this._other_panel.active = false;
        this._face_panel.active = false;
        this._face_bg.active = false;
        // this._headNode.parent.setContentSize(cc.size(170, 170));
        // this._headNode.setContentSize(cc.size(170, 170));

        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;

        this._signature_text.active = true;
        this._signature_button.active = true;
        this._id_panel.active = true;

        this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);

        this._avatar_block_node.active = false;
        this._block_img.active = false;
        this._panel_bg.setContentSize(cc.size(970, 558));
        cv.resMgr.adaptWidget(this._panel_bg, true);
    }

    showother() {
        this.adaptOtherWidget();
        this._like_node.active = false;
        this._friend_node.active = true;
        this._remark_button.active = true;
        this._remarkbtn_panel.active = true;
        this._remark_text.active = true;
        this._interaction_panel.active = true;
        this._face_panel.active = true;
        this._face_bg.active = true;
        this._fruit_panel.active = false;
        this._other_panel.active = true;
        this._speakingVoice = false;
        this._headNode.parent.setContentSize(cc.size(200, 200));
        this._headNode.setContentSize(cc.size(200, 200));

        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;

        this._signature_text.active = true;
        this._signature_button.active = false;
        this._id_panel.active = false;
        this._signature_panel.off(cc.Node.EventType.TOUCH_END, this.closeSign, this);

        this._panel_bg.setContentSize(cc.size(970, 1200));
        cv.resMgr.adaptWidget(this._panel_bg, true);
        this._block_button.getComponent(cc.Button).enabled = true;
        this._at_button.getComponent(cc.Button).enabled = true;
        cc.find("Background", this._block_button).opacity = 255;
        cc.find("Background", this._at_button).opacity = 255;

        //this._block_button.getComponent(cc.Button).enabled = true;
        //this._block_button.opacity = 255;

        let isSeat = cv.JackfruitManager.tRoomData.nSelfSeatID != -1;
        if (isSeat) {
            let isNotDisturb = false;
            if (this._enterType==1) {
                for (let i = 0; i <  cv.GameDataManager.tRoomData.obPlayer.data.NotDisturbUids.length; i++) {
                    if (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.obPlayer.data.NotDisturbUids[i]) {
                        // this.headBlock.active = true;
                        isNotDisturb = true;
                        break;
                    }
                }
                }

            else if (this._enterType==0) {
                for (let i = 0; i <  this._player.NotDisturbUids.length; i++) {
                    if (cv.dataHandler.getUserData().u32Uid == this._player.NotDisturbUids[i]) {
                        // this.headBlock.active = true;
                        isNotDisturb = true;
                        break;
                    }
                }
            }
            if (isNotDisturb==true)
            {
                //免打扰
                this.DisturbOrNot(1);
            }
            else
            {
                this.DisturbOrNot(2);
            }
        }
        else
        {
            this.DisturbOrNot(2);
            this._block_button.getComponent(cc.Button).enabled = false;
            cc.find("Background", this._block_button).opacity = 76.5;

            //旁观者不能弹幕
            this._at_button.getComponent(cc.Button).enabled = false;
            cc.find("Background", this._at_button).opacity = 76.5;
        }
    }

    showob() {
        this._enterType = 1;
        this._obplayer = cv.GameDataManager.tRoomData.obPlayer;
        cv.worldNet.GetUserMarksRequest(this._obplayer.playerid);
        cv.worldNet.requestGetAllRemarksByUid(this._obplayer.playerid);
        this._remark_panel.active = false;
        this.doOpcity(this.node, 255);
        cc.find("sprite_splash", this._remark_panel).opacity = 100;
        if (this._obplayer.playerid == cv.dataHandler.getUserData().u32Uid) {
            this.showself();
        }
        else {
            this.showother();
        }

        let line_img_1 = this._other_panel.getChildByName("line_img_1");
        let line_img_2 = this._other_panel.getChildByName("line_img_2");
        let line_img_3 = this._other_panel.getChildByName("line_img_3");
        line_img_1.opacity = 51;
        line_img_2.opacity = 51;
        line_img_3.opacity = 51;

        CircleSprite.clean();
        CircleSprite.setCircleSprite(cc.find("root/panelbg/head_panel/headNode", this.node), cv.GameDataManager.tRoomData.obPlayer.headPath, cv.GameDataManager.tRoomData.obPlayer.plat, false);

        this.canSendFace = false;
        this._root.active = true;

        this.unschedule(this.Update);
        this.node.active = true;
        this._shade.active = true;
        this.doOpcity(this._face_panel, 200);

        if (this._currentUid != cv.dataHandler.getUserData().u32Uid) {
            cc.find("Background", this._replay_btn).opacity = 255;
            this._replay_btn.getComponent(cc.Button).enabled = true;
        }
        else
        {
            cc.find("Background", this._replay_btn).opacity = 76.5;
            this._replay_btn.getComponent(cc.Button).enabled = false;
        }
        cv.MessageCenter.send("FaceItem_canSendFace", this.canSendFace);
    }

    setUidAndName(uid: number, name: string, id: string) {
        this._currentUid = uid;
        let node = cc.find("root/panelbg/roleName_text", this.node);
        this._gender_img = cc.find("root/panelbg/gender_img", this.node);
        this._certification_sp = cc.find("root/panelbg/certification_sp", this.node);
        let width = cv.StringTools.setShrinkString(node, name, true);
        node.setPosition(this._certification_sp.getPosition().x + 12, this._certification_sp.getPosition().y);
        this._gender_img.setPosition(node.getPosition().x + width + 12, node.getPosition().y);
        this._id_txt.getComponent(cc.Label).string = "ID:" + id;
    }

    updateView(seatId: number, playerInfo: PlayerInfo) {
        this._enterType = 0;
        this.doOpcity(this.node, 255);
        cc.find("sprite_splash", this._remark_panel).opacity = 100;
        this._player = playerInfo;
        cv.worldNet.GetUserMarksRequest(this._player.playerId);
        cv.worldNet.requestGetAllRemarksByUid(this._player.playerId);
        this._remark_panel.active = false;
        if (JackfruitMgr.tRoomData.nSelfSeatID == seatId) {
            //自己
            this.showself();
        }
        else
        {
            this.showother();
        }

        let line_img_1 = this._other_panel.getChildByName("line_img_1");
        let line_img_2 = this._other_panel.getChildByName("line_img_2");
        let line_img_3 = this._other_panel.getChildByName("line_img_3");
        line_img_1.opacity = 51;
        line_img_2.opacity = 51;
        line_img_3.opacity = 51;

        CircleSprite.setCircleSprite(cc.find("root/panelbg/head_panel/headNode", this.node), playerInfo.headUrl, playerInfo.plat, false);
        
        this.canSendFace = true;
        this._root.active = true;
        this.unschedule(this.Update);
        this.node.active = true;
        this._shade.active = true;


        cv.MessageCenter.send("FaceItem_canSendFace", this.canSendFace);

        for (let i = (0); i < JackfruitMgr.tRoomData.kTablePlayerList.length; i++) {
            let pkPlayer = JackfruitMgr.tRoomData.kTablePlayerList[i];
            if (pkPlayer.seatId == seatId) {
                this._currentUid = pkPlayer.playerId;

                if (this._currentUid != cv.dataHandler.getUserData().u32Uid) {
                    cc.find("Background", this._replay_btn).opacity = 255;
                    this._replay_btn.getComponent(cc.Button).enabled = true;
                }
                else
                {
                    cc.find("Background", this._replay_btn).opacity = 76.5;
                    this._replay_btn.getComponent(cc.Button).enabled = false;
                }
            }
        }
    }

    public NotDisturb(msg: any) {
        this.DisturbOrNot(msg.operate);
        if (msg.operate==1) {
            let strTips = cv.config.getStringData("Star_block_tips");
            cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeInfo);
        }
        else if (msg.operate==2) {
            let strTips = cv.config.getStringData("Star_block_cancel");
            cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeInfo);
        }

        if (this._enterType==0) {
            let isNotDisturb = msg.operate == 1 ? true : false;
            if (isNotDisturb == true) {
                this._player.NotDisturbUids.push(cv.dataHandler.getUserData().u32Uid);
            }
            else
            {
                for (let i = 0; i <  this._player.NotDisturbUids.length; i++) {
                    if (cv.dataHandler.getUserData().u32Uid == this._player.NotDisturbUids[i]) {
                        this._player.NotDisturbUids.splice(i, 1);
                        break;
                    }
                }
            }
            cv.JackfruitManager.tRoomData.updateTablePlayer(msg.playerId, this._player);
        }
        else if (this._enterType==1) {
            let isNotDisturb = msg.operate == 1 ? true : false;
            if (isNotDisturb == true) {
                this._obplayer.data.NotDisturbUids.push(cv.dataHandler.getUserData().u32Uid);
            }
            else
            {
                for (let i = 0; i <  this._obplayer.data.NotDisturbUids.length; i++) {
                    if (cv.dataHandler.getUserData().u32Uid == this._obplayer.data.NotDisturbUids[i]) {
                        this._obplayer.data.NotDisturbUids.splice(i, 1);
                        break;
                    }
                }
            }
            cv.GameDataManager.tRoomData.obPlayer = this._obplayer;
        }
    }

    public DisturbOrNot(disturb: number) {
        let sp: cc.Sprite = this._block_button.getChildByName("Background").getComponent(cc.Sprite);
        let lb: cc.Label = cc.find("Label", this._block_button).getComponent(cc.Label);

        if (disturb==1) {
            lb.string = cv.config.getStringData("Star_unblock");
            this._block_img.active = true;
            this._avatar_block_node.active = true;
            cv.resMgr.setSpriteFrame(sp.node, "zh_CN/game/dzpoker/datacard/btn_block_off");
            this._disturb = 2;
        }
        else if (disturb==2)
        {
            this._block_img.active = false;
            this._avatar_block_node.active = false;
            lb.string = cv.config.getStringData("Star_block");
            cv.resMgr.setSpriteFrame(sp.node, "zh_CN/game/dzpoker/datacard/btn_block_on");
            this._disturb = 1;
        }
        this.updataRecondButtonTouch();
    }
    private updataRecondButtonTouch()
    {
        if(this._disturb == 1 && !this._speakingVoice) {
            cc.find("Background", this._replay_btn).opacity = 255;
            this._replay_btn.getComponent(cc.Button).enabled = true;
        } else {
            cc.find("Background", this._replay_btn).opacity = 76.5;
            this._replay_btn.getComponent(cc.Button).enabled = false;
        }
    }
    showRemarkPanel() {
		cv.AudioMgr.playButtonSound('button_click');
        this._remark_panel.active = (true);
        this._friend_des_sp.active = false;
        this._cn_des_sp.active = false;
        this._sure_button.getComponent(cc.Button).interactable = true;
        this._cancel_button.getComponent(cc.Button).interactable = true;
        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(this._currentUid);
        if (!remark) {
            console.log("===> remark =")
        }

        this.remark_click_type = remark.nType;
        if (cv.StringTools.getArrayLength(remark.sRemark) > 0) {
            this._signInput_text.getComponent(cc.EditBox).string = (remark.sRemark);
        }
        else {
            this._signInput_text.getComponent(cc.EditBox).string = ("");
        }

        if (remark.nUid == 0) {
            this.menu_text.active = (true);
            this.menu_icon.active = (false);
        }
        else {
            if (remark.nType == 0) {
                this.menu_text.active = (true);
                this.menu_icon.active = (false);
            }
            else {
                this.menu_text.active = (false);
                this.menu_icon.active = (true);
                cv.resMgr.setSpriteFrame(this.menu_icon, cv.StringTools.formatC("zh_CN/game/dzpoker/ui/common_remark_icon%d", remark.nType));
            }
        }
    }

    onClickRemarkButton(event: cc.Event) {
		cv.AudioMgr.playButtonSound('button_click');
        event.stopPropagation();
        let btn: cc.Node = event.target;
        this.remark_click_type = cv.Number(btn.name.charAt(btn.name.length - 1));
        this.updateMenuButton();
        this.setButtonListToShow(false);
    }

    updateMenuButton() {
        this.menu_arrow.runAction(cc.flipY(true));
        if (this.remark_click_type == 0) {
            this.menu_text.active = (true);
            this.menu_icon.active = (false);
        }
        else {
            this.menu_text.active = (false);
            this.menu_icon.active = (true);
            cv.resMgr.setSpriteFrame(this.menu_icon, cv.StringTools.formatC("zh_CN/game/dzpoker/ui/common_remark_icon%d", this.remark_click_type));
        }
    }

    setButtonListToShow(isShow: boolean) {
        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(this._currentUid);
        for (let i = 0; i < this.buttonList.length; i++) {
            (this.buttonList[i].getChildByName("button_bg")).active = (false);
            if (remark.nUid == 0) {
                (this.buttonList[0].getChildByName("button_bg")).active = (true);
            }
            else {
                (this.buttonList[remark.nType].getChildByName("button_bg")).active = (true);
            }
            this.buttonList[i].active = (isShow);
        }
        if (isShow) {
            this.menu_arrow.runAction(cc.flipY(true));
        }
        else {
            this.menu_arrow.runAction(cc.flipY(false));
        }
    }

    public OnLike(msg: any) {
        //刷新点赞数
        this._like_button.getComponent(cc.Button).enabled = false;
        cc.find("Background", this._like_button).opacity = 76.5;
        cv.resMgr.setSpriteFrame(cc.find("Background", this._like_button), "zh_CN/game/dzpoker/datacard/btn_like_disable");
        this._self_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", msg.likedCount));
        this._other_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", msg.likedCount));
        this._like_label = cv.resMgr.createLabel(this._like_button, "+1", 42, cv.resMgr.getLocalFontByName("arial"));
        this._like_label.active = true;
        this._like_label.runAction(cc.sequence(cc.show(), cc.moveTo(0.9, new cc.Vec2(0, 72)), cc.destroySelf()));
    }

    public onGetUserMarks(msg: any) {
        if (msg) {
            if (msg.targetId != this._currentUid) return;
            if (msg.marks.length > 0) {
                this._signature_text.getComponent(cc.Label).string = msg.marks;
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 255;
            }
            else
            {
                this._signature_text.getComponent(cc.Label).string = cv.config.getStringData("Star_signature");
                this._signature_text.color = new cc.Color().fromHEX("#4C4C4C");
                this._signature_text.opacity = 255;
            }
            this._BakSignalString = this._signature_text.getComponent(cc.Label).string;
            this._signature_text.getComponent(cc.Label)._forceUpdateRenderData(true);
            let actSize = cv.tools.getActualSize(this._signature_text);
            this._signature_button.setPosition(this._signature_text.getPosition().x + actSize.width + 12, this._signature_button.getPosition().y);

            this._isAuthVerify = msg.isAuthVerify;
            if (msg.isAuthVerify) {
                cv.resMgr.setSpriteFrame(this._certification_sp, "zh_CN/game/dzpoker/datacard/icon_certification2");
            }
            else
            {
                cv.resMgr.setSpriteFrame(this._certification_sp, "zh_CN/game/dzpoker/datacard/icon_certification1");
            }
        }
    }

    public onModifyUserMarks(msg: any) {
        if (msg) {
            this._editbox_state = 0;
            cv.TT.showMsg(cv.config.getStringData("Star_edit_success"), cv.Enum.ToastType.ToastTypeSuccess);
            if (msg.marks.length > 0) {
                this._signature_text.getComponent(cc.Label).string = msg.marks;
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 255;
            }
            else
            {
                this._signature_text.getComponent(cc.Label).string = cv.config.getStringData("Star_signature");
                this._signature_text.color = new cc.Color().fromHEX("#4C4C4C");
                this._signature_text.opacity = 255;
            }

            this._BakSignalString = this._signature_text.getComponent(cc.Label).string;

            this._signature_text.getComponent(cc.Label)._forceUpdateRenderData(true);
            let actSize = cv.tools.getActualSize(this._signature_text);
            this._signature_button.setPosition(this._signature_text.getPosition().x + actSize.width + 12, this._signature_button.getPosition().y);
            this._signature_editbox.active = false;
            this._signature_sure_button.active = false;

            this._signature_text.active = true;
            this._signature_button.active = true;
        }
    }

    closeSign() {

        let edit_state = cv.dataHandler.getUserData().mark_edit_state;
        if(edit_state == 1){
            //修改次数达到上限
            cv.TT.showMsg(cv.config.getStringData("signature_limit_tip"), cv.Enum.ToastType.ToastTypeError);
            return;
        }else if(edit_state == 2){
            //修入敏感字符达到上限
            cv.TT.showMsg(cv.config.getStringData("signature_sensitive_tip"), cv.Enum.ToastType.ToastTypeError);
            return;
        }

        this._signature_editbox.active = true;
        if (this._signature_text.getComponent(cc.Label).string == cv.config.getStringData("Star_signature")) {
            this._signature_editbox.getComponent(cc.EditBox).string = "";
            this._signature_text.color = new cc.Color().fromHEX("#4C4C4C");
        }
        else
        {
            this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
            this._signature_editbox.getComponent(cc.EditBox).string = this._signature_text.getComponent(cc.Label).string;
        }

        cv.resMgr.setSpriteFrame(cc.find("Background", this._signature_sure_button), "zh_CN/game/dzpoker/datacard/btn_signature1");
        this._signature_sure_button.active = true;
        this._signature_text.active = false;
        this._signature_button.active = false;

        this.onTextChanged();
        if (this._editbox_state==0) {
            this._editbox_state = 1;
            this._signature_editbox.getComponent(cc.EditBox).focus();
        }
    }

    OnUpdate_remarks(sender: any) {
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(this._currentUid);
        // this._remark_text.active = true;
        // this._remark_button.active = true;
        // this._remarkbtn_panel.active = true;

        if (rdata.sRemark.length <= 0) {
            this._remark_text.getComponent(cc.Label).string = (cv.config.getStringData("UIroleInfoRemark"));
        }
        else {
            this._remark_text.getComponent(cc.Label).string = (rdata.sRemark);
        }
        this._remark_text.getComponent(cc.Label)._forceUpdateRenderData(true);
        this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width  + 15, this._remark_button.getPosition().y);
    }

    public onTextChanged() {
        let strsp = this._signature_editbox.getComponent(cc.EditBox).string.trim();
        let spIcon = this._signature_sure_button.getChildByName("Background");
        if(this._BakSignalString == strsp || 
            (strsp.length <=0 && this._BakSignalString === cv.config.getStringData("Star_signature"))){
            //签名没有改变，禁用提交按钮
            this._signature_sure_button.getComponent(cc.Button).interactable = false;
            spIcon.color = cc.color(76,76,76);
         
        }else{
            this._signature_sure_button.getComponent(cc.Button).interactable = true;
            spIcon.color = cc.color(255,255,255);
        }
        cv.resMgr.setSpriteFrame(cc.find("Background", this._signature_sure_button), "zh_CN/game/dzpoker/datacard/btn_signature2");
        this._signature_sure_button.getComponent(cc.Button).enabled = true;
    }

    adaptSelfWidget() {
        this._gender_img.getComponent(cc.Widget).top = 83;
        this._certification_sp.getComponent(cc.Widget).top = 79.5;
        this._roleName_text.getComponent(cc.Widget).top = 57.5;
        this._signature_panel.getComponent(cc.Widget).top = 203;
        this._id_panel.getComponent(cc.Widget).top = 145.47;
        // this._remark_text.getComponent(cc.Widget).top = 232.69;
        // this._remarkbtn_panel.getComponent(cc.Widget).top = 230.17;
        // this._remark_button.getComponent(cc.Widget).top = 232.87;
        cv.resMgr.adaptWidget(this._gender_img);
        cv.resMgr.adaptWidget(this._certification_sp);
        cv.resMgr.adaptWidget(this._roleName_text.node);
        cv.resMgr.adaptWidget(this._signature_panel);
        // cv.resMgr.adaptWidget(this._remark_text);
        // cv.resMgr.adaptWidget(this._remarkbtn_panel);
        // cv.resMgr.adaptWidget(this._remark_button);
    }

    adaptOtherWidget() {
        this._roleName_text.getComponent(cc.Widget).top = 79.9;
        this._gender_img.getComponent(cc.Widget).top = 103;
        this._certification_sp.getComponent(cc.Widget).top = 100;
        this._signature_panel.getComponent(cc.Widget).top = 154;
        this._remark_button.getComponent(cc.Widget).top = 214;
        this._remark_text.getComponent(cc.Widget).top = 214;
        cv.resMgr.adaptWidget(this._gender_img);
        cv.resMgr.adaptWidget(this._certification_sp);
        cv.resMgr.adaptWidget(this._roleName_text.node);
        cv.resMgr.adaptWidget(this._signature_panel);
        cv.resMgr.adaptWidget(this._remark_text);
        cv.resMgr.adaptWidget(this._remarkbtn_panel);
        cv.resMgr.adaptWidget(this._remark_button);
    }
}