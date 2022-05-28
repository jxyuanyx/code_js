
import cv from "../../../components/lobby/cv"
import { RemarkData } from "./../../../data/userData"
import { ObPlayer, PlayerInfo, CAFInfo, TableStates, playerWinPotInfo } from "./data/RoomData";
import { CircleSprite } from "../../../common/tools/CircleSprite";
import GameDataManager from "./data/GameDataManager";
import { FaceItem } from "./FaceItem";
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import FaceView from "./danmu/FaceView";
import FaceBarrage from "./danmu/FaceBarrage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StarPrivateInfo extends cc.Component {

    @property(cc.Prefab)
    faceItem: cc.Prefab = null;

    _root: cc.Node = null;
    _roleImg_Img: cc.Node = null;//头像
    _headPanel: cc.Node = null;
    _headNode: cc.Node = null;//头像框
    _gender_img: cc.Node = null;
    _roleName_text: cc.Node = null;//人名
    _remark_text: cc.Node = null;//备注
    _local_text: cc.Node = null;//地点
    _voice_img: cc.Node = null;//声音图片
    _recond_button: cc.Node = null;//播音按钮
    _playback_text: cc.Node = null;
    _block_button: cc.Node = null;
    _block_img: cc.Node = null;
    _like_button: cc.Node = null;
    _like_label: cc.Node = null;
    _like_img: cc.Node = null;
    _other_like_text: cc.Node = null;
    _at_button: cc.Node = null;
    _at_img: cc.Node = null;
    _at_text: cc.Node = null;

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
    signInput_text: cc.Node = null; //TextField* 
    _remark_button: cc.Node = null;//
    _remarkbtn_panel: cc.Node = null;
    remark_panel: cc.Node = null;
    all_panel: cc.Node = null;
    _other_info_panel: cc.Node = null;
    menu_button: cc.Node = null;//
    menu_text: cc.Node = null;
    menu_icon: cc.Node = null;
    menu_arrow: cc.Node = null;
    sure_button: cc.Node = null;
    cancle_button: cc.Node = null;

    _total_text: cc.Node = null;//总手数
    _ruchi_text: cc.Node = null;//入池率
    _totalPoker_text: cc.Node = null;//总局数
    _ruchiWin_text: cc.Node = null;//入池胜率
    _shoushu_text: cc.Node = null; // 手数

    _other_total_text: cc.Node = null;//总手数
    _other_ruchi_text: cc.Node = null;//入池率
    _other_totalPoker_text: cc.Node = null;//总局数
    _other_ruchiWin_text: cc.Node = null;//入池胜率
    _other_shoushu_text: cc.Node = null;//手数

    _vip_panel: cc.Node = null;//VIP
    _panelbg: cc.Node = null;//背景

    _signInput_text: cc.Node = null;//备注信息 cocos2d::ui::EditBox*

    _vipDataInfo_Panel: cc.Node = null;//vip信息
    _jiJin_text: cc.Node = null;//激进度
    _fanPaiLv_text: cc.Node = null;//看翻牌率
    //_tanPaiLv_text: cc.Node = null;//摊牌率
    _3bet_text: cc.Node = null;//再加注率/弃再加注率
    _vpip_text: cc.Node = null;//偷茫率
    _pfr_text: cc.Node = null;
    //_fanBei_text: cc.Node = null;//翻倍率
    //_tanPaiWin_text: cc.Node = null;//摊牌胜率
    _cbet_text: cc.Node = null;//持续加注率

    _jiJin_img: cc.Node = null;//激进度 箭头
    _fanPaiLv_img: cc.Node = null;//看翻牌率
    _tanPaiLv_img: cc.Node = null;//摊牌率
    _jiaZhu_img: cc.Node = null;//再加注率/弃再加注率
    _touMangLv_img: cc.Node = null;//偷茫率
    _fanBei_img: cc.Node = null;//翻倍率
    _tanPaiWin_img: cc.Node = null;//摊牌胜率
    _chiXuXiaZhu_img: cc.Node = null;//持续加注率

    _nothing_panel: cc.Node = null;//无数据

    _selfInfo_panel: cc.Node = null;//看自己
    _totalFight_text: cc.Node = null;//总战绩
    _totalBring_text: cc.Node = null;//总带入
    _avarge_text: cc.Node = null;//场均战绩
    _avargebring_text: cc.Node = null;//场均带入
    _big_text: cc.Node = null;//大盲/百手
    _fight_text: cc.Node = null;//战绩百手

    _houseOwer_Panel: cc.Node = null;
    _other_panel: cc.Node = null;//看别人
    _face_bg: cc.Node = null;
    _kickOut_button: cc.Node = null;//踢出玩家
    ng_Button: cc.Node = null;//设置总带入
    _prohibit_sitdown_button: cc.Node = null;//禁止入座
    _authentication_button: cc.Node = null;//身份验证

    _face_panel: cc.Node = null;
    _faceTouch_panel: cc.Node = null;
    _faceMoudle_panel: cc.Node = null;
    face_over_img: cc.Node = null;
    _allin_panel: cc.Node = null;

    buttonList: Array<cc.Node> = [];
    kickX: number = 0;
    prohibitX = 0;
    u32CurrentUid: number = 0;
    opcityNum: number = 0;
    remark_click_type: number = 0;

    m_i32CurrPlayVoiceId: number = 0;
    m_pkTempHead: any = null;

    _shade: cc.Node = null;
    canSendFace: boolean = true;
    speakingVoice: boolean = false;
    name_text_size: cc.Size = cc.size(0, 0);
    BG_H_self: number = 1013;
    BG_H_other: number = 1200;
    BG_H_other_star: number = 1230;
    BG_H_self_star: number = 1260;
    HouseBg_H: number = 130;
    housePanel_pos: cc.Vec2 = null;

    _interaction_panel: cc.Node = null;
    _id_panel: cc.Node = null;
    _id_txt: cc.Node = null;
    _signature_panel: cc.Node = null;
    _signature_button: cc.Node = null;
    _signature_editbox: cc.Node = null;
    _signature_text: cc.Node = null;
    _signature_sure_button: cc.Node = null;
    _countdown_text: cc.Node = null;
    _countdown_sp: cc.Node = null;
    _countdown_bg: cc.Node = null;
    _certification_sp: cc.Node = null;
    _cn_des_sp: cc.Node = null;
    _cn_des_txt: cc.Node = null;
    _live_buttton: cc.Node = null;
    _rootPos: cc.Vec2 = null;
    _otherPos: cc.Vec2 = null;
    _player: PlayerInfo = null;
    _obplayer: PlayerInfo = null;
    _enterType: number = 0;//0 表示从桌面进入 1 表示从观察列表进入
    _disturb: number = 2;
    _liveStatus: number = 0;

    private hasCreateFaceItem: boolean = false;
    _star_node: cc.Node = null;
    @property(cc.Button) btnSwitch: cc.Button = null;
    _mic_panel: cc.Node = null;
    _mic_txt: cc.Node = null;
    _editbox_state = 0;//focus会造成死循环防止死循环
    _isAuthVerify: boolean = false;
    private _BakSignalString:string = null;
    _timeIDs: Array<any> = [];


    onLoad() {
        this.hasCreateFaceItem = false;
        cv.resMgr.adaptWidget(this.node, true);
        this._shade = cv.action.createShieldLayer(this.node.getParent(), "shieldLayer-starPrivateInfo", cv.Enum.ZORDER_TYPE.ZORDER_6, cc.Color.BLACK, 100,
            function (event: cc.Event) { event.stopPropagation(); this.node.active = false; this._shade.active = false; }.bind(this));
        this._root = (this.node.getChildByName("root"));
        this._star_node = this._root.getChildByName("star_node");
        this._mic_panel = this._star_node.getChildByName("mic_panel");
        this._mic_txt = this._mic_panel.getChildByName("mic_txt");
        this._mic_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_open_mic");
        this._mic_panel.active = false;
        this._panelbg = (this._root.getChildByName("panelbg"));
        this._interaction_panel = this._root.getChildByName("interaction_panel");
        this._id_panel = this._panelbg.getChildByName("id_panel");
        this._id_txt = this._id_panel.getChildByName("id_txt");
        this._signature_panel = this._panelbg.getChildByName("signature_panel");
        this._signature_button = this._signature_panel.getChildByName("signature_button");
        this._signature_editbox = this._signature_panel.getChildByName("editbox");
        this._signature_editbox.getComponent(cc.EditBox).placeholder = cv.config.getStringData("Star_input_signature");
        this._signature_text = this._signature_panel.getChildByName("signature_text");
        this._signature_sure_button = this._signature_panel.getChildByName("signature_sure_button");
        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;
        this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
        this._signature_button.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);

        this._panelbg.getChildByName("zhezhao_panel").active = false;

        this._signature_sure_button.on('click', function () {
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
        //this._signature_button.setPosition(this._signature_text.getContentSize().width/2 + 10, this._signature_button.getPosition().y);
        this._shade.active = false;

        this.btnSwitch.node.on("click", this._onMicSwitch, this);

        this.opcityNum = 300;
        this.remark_click_type = 0;

        this.speakingVoice = false;

        this._rootPos = this._root.getPosition();

        this._headPanel = cc.find("head_panel", this._panelbg);
        this._headNode = cc.find("head_panel/headNode", this._panelbg);
        CircleSprite.setCircleSprite(this._headNode, cv.dataHandler.getUserData().headUrl, 0, false, 0);

        this._like_node = this._panelbg.getChildByName("like_node");
        this._self_like_text = this._like_node.getChildByName("like_num");

        this._friend_node = this._panelbg.getChildByName("friend_node");
        this._friend_sp = this._friend_node.getChildByName("friend_sp");
        this._friend_des_btn = this._friend_node.getChildByName("des_btn");
        this._friend_des_sp = this._root.getChildByName("des_sp");
        this._friend_des_txt = this._friend_des_sp.getChildByName("des_txt");

        this._panelbg.getChildByName("zhezhao_panel").on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            this._friend_des_sp.active = false;
            this._cn_des_sp.active = false;
            this._panelbg.getChildByName("zhezhao_panel").active = false;
            event.stopPropagation();
        }, this);

        this._friend_des_btn.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            cv.AudioMgr.playButtonSound('tab');
            this._cn_des_sp.active = false;
            if (this._friend_des_sp.active) {
                this._friend_des_sp.active = false;
                this._panelbg.getChildByName("zhezhao_panel").active = false;
            }
            else {
                this._friend_des_sp.active = true;
                this._friend_des_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_friend_degree");
                this._panelbg.getChildByName("zhezhao_panel").active = true;
            }
        }, this);

        this._friend_num = this._friend_node.getChildByName("friend_num");
        this._friend_text = this._friend_node.getChildByName("friend_text");
        this._avatar_block_node = this._panelbg.getChildByName("avatar_block");
        this._like_node.active = false;
        this._friend_node.active = false;
        this._avatar_block_node.active = false;

        this._gender_img = (this._panelbg.getChildByName("gender_img"));
        this._roleName_text = (this._panelbg.getChildByName("roleName_text"));
        //this._roleName_text.getComponent(cc.Label).enableBold = true;
        this._remark_text = (this._panelbg.getChildByName("remark_text"));
        this._local_text = (this._root.getChildByName("local_text"));
        this._local_text.active = (false);
        this.name_text_size = this._roleName_text.getContentSize();

        this._recond_button = (this._interaction_panel.getChildByName("replay_button"));
        this._block_button = (this._interaction_panel.getChildByName("block_button"));
        this._like_button = this._interaction_panel.getChildByName("like_button");
        this._like_img = this._like_button.getChildByName("Background");
        this._other_like_text = this._like_button.getChildByName("Label");
        this._at_button = this._interaction_panel.getChildByName("at_button");
        this._at_img = this._at_button.getChildByName("Background");
        this._at_text = this._at_button.getChildByName("Label");

        this._block_img = this._panelbg.getChildByName("block_img");
        this._block_img.active = false;
        this._countdown_text = this._panelbg.getChildByName("countdown_text");
        this._countdown_sp = this._panelbg.getChildByName("countdown_sp");
        this._countdown_bg = this._panelbg.getChildByName("countdown_bg");
        this._certification_sp = this._panelbg.getChildByName("certification_sp");
        this._cn_des_sp = this._certification_sp.getChildByName("cn_des_sp");
        this._cn_des_txt = this._cn_des_sp.getChildByName("cn_des_txt");
        this._cn_des_sp.active = false;
        this._certification_sp.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            this._friend_des_sp.active = false;
            if (this._cn_des_sp.active) {
                this._cn_des_sp.active = false;
                this._panelbg.getChildByName("zhezhao_panel").active = false;
            }
            else {
                if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    this._cn_des_txt.setContentSize(390, 64);
                }
                else {
                    this._cn_des_txt.setContentSize(370, 64);
                }
                this._cn_des_sp.active = true;
                if (this._isAuthVerify) {
                    this._cn_des_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_certification_pass");
                    this._cn_des_sp.setContentSize(440, 80);
                    this._cn_des_txt.setPosition(220, this._cn_des_txt.getPosition().y);
                    this._cn_des_txt.color = new cc.Color().fromHEX("#FFFFFF");
                }
                else {
                    this._cn_des_txt.getComponent(cc.Label).string = cv.config.getStringData("Star_certification_not_pass");
                    this._cn_des_sp.setContentSize(400, 80);
                    this._cn_des_txt.setPosition(200, this._cn_des_txt.getPosition().y);
                    this._cn_des_txt.color = new cc.Color().fromHEX("#FF4D4D");
                }
                this._panelbg.getChildByName("zhezhao_panel").active = true;

                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    this._cn_des_txt.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                }
                else {
                    this._cn_des_txt.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                }
            }
            event.stopPropagation();
        });

        this._live_buttton = this._panelbg.getChildByName("live_btn");
        this._countdown_text.active = false;
        this._countdown_sp.active = false;
        this._countdown_bg.active = false;

        this._at_button.on('click', (event: cc.Event) => {
            this.node.active = false;
            this._shade.active = false;
            this._cn_des_sp.active = false;
            this._friend_des_sp.active = false;
            cc.director.getScene().getChildByName("curentTime").active = false;
            if (cv.roomManager.getCurrentGameID()==cv.Enum.GameId.StarSeat) {
                cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceBarrage).showUi();
            }
            else
            {
                cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceView).showUi();
            }
            if (this._enterType == 0) {
                if (cv.roomManager.getCurrentGameID()==cv.Enum.GameId.StarSeat) {
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceBarrage).onclickRoleHead(this._player.playerid, true);
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceBarrage).onselect(this._player.playerid);
                }
                else
                {
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceView).onclickRoleHead(this._player.playerid, true);
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceView).onselect(this._player.playerid);
                }
            }
            else if (this._enterType == 1) {
                if (cv.roomManager.getCurrentGameID()==cv.Enum.GameId.StarSeat) {
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceBarrage).onclickRoleHead(this._obplayer.playerid, true);
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceBarrage).onselect(this._obplayer.playerid);
                }
                else
                {
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceView).onclickRoleHead(this._obplayer.playerid, true);
                    cc.director.getScene().getChildByName("Scene").getChildByName("facepanel").getComponent(FaceView).onselect(this._obplayer.playerid);
                }
            }
        }, this);

        this._block_button.on('click', (event: cc.Event) => {
            this._cn_des_sp.active = false;
            this._friend_des_sp.active = false;

            if (this._enterType == 0) {
                cv.gameNet.requestNotDisturb(this._disturb, this._player.playerid);
            }
            else if (this._enterType == 1) {
                cv.gameNet.requestNotDisturb(this._disturb, this._obplayer.playerid);
            }
        }, this);

        this._live_buttton.on("click", (event: cc.Event): void => {
            cv.gameNet.requestOpenLiveReq(this._liveStatus);
        }, this);

        this._like_button.on("click", (event: cc.Event): void => {
            this._cn_des_sp.active = false;
            this._friend_des_sp.active = false;

            if (this._enterType == 0) {
                cv.gameNet.requestLike(this._player.playerid);
            }
            else if (this._enterType == 1) {
                cv.gameNet.requestLike(this._obplayer.playerid);
            }
        }, this);

        this.remark_panel = (this.node.getChildByName("remark_panel"));
        this.remark_panel.on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
            this.remark_panel.active = false;
            this.setButtonListToShow(false);
        });
        cc.find("Image_2", this.remark_panel).on(cc.Node.EventType.TOUCH_END, (event: cc.Event) => {
            event.stopPropagation();
        });

        this._remark_button = (this._panelbg.getChildByName("remark_button"));
        this._remarkbtn_panel = (this._panelbg.getChildByName("remarkbtn_panel"));
        this._remark_text = this._panelbg.getChildByName("remark_text");

        this.menu_button = (this.remark_panel.getChildByName("menu_button"));
        this.menu_text = (this.menu_button.getChildByName("menu_text"));
        this.menu_icon = (this.menu_button.getChildByName("menu_icon"));
        this.menu_arrow = (this.menu_button.getChildByName("menu_arrow"));

        //this.menu_arrow.runAction(cc.flipY(true));

        this._signInput_text = (this.remark_panel.getChildByName("signInput_text"));
        this._signInput_text.getComponent(cc.EditBox).string = (cv.config.getStringData("roleInfo_root_remark_panel_signInput_text"));
        this._signInput_text.getComponent(cc.EditBox).placeholder = cv.config.getStringData("roleInfo_root_remark_panel_signInput_text");
        for (let i = 0; i < 6; i++) {
            let btn = (this.remark_panel.getChildByName(cv.StringTools.formatC("remark_button_%d", i)));
            btn.setPosition(btn.x, this.menu_button.y - (this.menu_button.getContentSize().height - 5) * (i + 1));
            //btn.tag = (i);
            btn.active = (false);
            btn.on(cc.Node.EventType.TOUCH_END, this.onClickRemarkButton, this);
            // btn.zIndex = (10);
            this.buttonList.push(btn);
        }
        this.remark_panel.active = (false);

        this.sure_button = (this.remark_panel.getChildByName("sure_button"));
        this.cancle_button = (this.remark_panel.getChildByName("cancle_button"));

        this._vip_panel = (this._star_node.getChildByName("vip_panel"));
        this.all_panel = (this._star_node.getChildByName("all_panel"));
        this._other_info_panel = (this._root.getChildByName("other_info_panel"));

        this._total_text = (this.all_panel.getChildByName("total_text"));
        this._ruchi_text = (this.all_panel.getChildByName("ruchi_text"));
        this._totalPoker_text = (this.all_panel.getChildByName("totalPoker_text"));
        this._ruchiWin_text = (this.all_panel.getChildByName("ruchiWin_text"));
        this._shoushu_text = (this.all_panel.getChildByName("shoushu_text"));

        this._other_total_text = (this._other_info_panel.getChildByName("total_text"));
        this._other_ruchi_text = (this._other_info_panel.getChildByName("ruchi_text"));
        this._other_totalPoker_text = (this._other_info_panel.getChildByName("totalPoker_text"));
        this._other_ruchiWin_text = (this._other_info_panel.getChildByName("ruchiWin_text"));
        this._other_shoushu_text = (this._other_info_panel.getChildByName("shoushu_text"));

        this._vipDataInfo_Panel = (this._vip_panel.getChildByName("vipDataInfo_Panel"));
        this._jiJin_text = (this._vipDataInfo_Panel.getChildByName("jiJin_text"));
        this._fanPaiLv_text = (this._vipDataInfo_Panel.getChildByName("fanPaiLv_text"));
        //this._tanPaiLv_text = (this._vipDataInfo_Panel.getChildByName("tanPaiLv_text"));
        this._3bet_text = (this._vipDataInfo_Panel.getChildByName("3bet_text"));
        this._vpip_text = (this._vipDataInfo_Panel.getChildByName("vpip_text"));
        this._pfr_text = (this._vipDataInfo_Panel.getChildByName("pfr_text"));
        //this._fanBei_text = (this._vipDataInfo_Panel.getChildByName("fanBei_text"));
        //this._tanPaiWin_text = (this._vipDataInfo_Panel.getChildByName("tanPaiWin_text"));
        this._cbet_text = (this._vipDataInfo_Panel.getChildByName("cbet_text"));

        this._jiJin_img = (this._vipDataInfo_Panel.getChildByName("jiJin_img"));
        this._fanPaiLv_img = (this._vipDataInfo_Panel.getChildByName("fanPaiLv_img"));
        this._fanPaiLv_img = (this._vipDataInfo_Panel.getChildByName("tanPaiLv_img"));
        this._jiaZhu_img = (this._vipDataInfo_Panel.getChildByName("jiaZhu_img"));
        this._touMangLv_img = (this._vipDataInfo_Panel.getChildByName("touMangLv_img"));
        this._fanBei_img = (this._vipDataInfo_Panel.getChildByName("fanBei_img"));
        this._tanPaiWin_img = (this._vipDataInfo_Panel.getChildByName("tanPaiWin_img"));
        this._chiXuXiaZhu_img = (this._vipDataInfo_Panel.getChildByName("chiXuXiaZhu_img"));

        this._nothing_panel = (this._vip_panel.getChildByName("nothing_panel"));

        this._selfInfo_panel = (this._star_node.getChildByName("selfInfo_panel"));
        this._avarge_text = (this._selfInfo_panel.getChildByName("avarge_text"));
        this._avargebring_text = (this._selfInfo_panel.getChildByName("avargebring_text"));
        this._big_text = (this._selfInfo_panel.getChildByName("big_text"));
        this._fight_text = (this._selfInfo_panel.getChildByName("fight_text"));

        this._houseOwer_Panel = (this._root.getChildByName("houseOwer_Panel"));
        this.housePanel_pos = this._houseOwer_Panel.getPosition();

        this._other_panel = (this.node.getChildByName("other_panel"));
        this._otherPos = this._other_panel.getPosition();
        this._face_bg = (this._other_panel.getChildByName("face_bg"));
        this._face_panel = (this._other_panel.getChildByName("face_panel"));
        this._faceTouch_panel = (this._other_panel.getChildByName("faceTouch_panel"));
        this._faceTouch_panel.pauseSystemEvents(true);//临时处理
        this._faceMoudle_panel = (this._other_panel.getChildByName("faceMoudle_panel"));
        this._faceMoudle_panel.active = (false);
        this._allin_panel = this._other_panel.getChildByName("allin_panel");

        this.face_over_img = (this._faceMoudle_panel.getChildByName("face_over_img"));
        this._kickOut_button = (this._houseOwer_Panel.getChildByName("kickOut_button"));
        //_setBring_Button = (this._houseOwer_Panel.getChildByName("setBring_Button"));
        this._prohibit_sitdown_button = (this._houseOwer_Panel.getChildByName("prohibit_sitdown_button"));
        this._authentication_button = (this._houseOwer_Panel.getChildByName("authentication_button"));
        this._authentication_button.active = false;
        this._prohibit_sitdown_button.x = this._authentication_button.x;
        this.kickX = this._kickOut_button.x;
        this.prohibitX = this._prohibit_sitdown_button.x;
        if (cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum < 8) {
            this._authentication_button.pauseSystemEvents(true);
            this._authentication_button.color = (cc.Color.GRAY);
        }
        else {
            this._authentication_button.pauseSystemEvents(true);
            this._authentication_button.color = (cc.Color.WHITE);
        }

        let text_bg = (this._vip_panel.getChildByName("text_bg"));
        let Image_10 = (this._vip_panel.getChildByName("Image_10"));
        let vip_title_des_text_1 = (text_bg.getChildByName("vip_title_des_text_1"));
        let vip_title_des_text_2 = (text_bg.getChildByName("vip_title_des_text_2"));
        let vip_title_text = (Image_10.getChildByName("vip_title_text"));

        let title_des_text_1 = (this.all_panel.getChildByName("title_des_text_1"));
        let title_des_text_2 = (this.all_panel.getChildByName("title_des_text_2"));
        let title_des_text_3 = (this.all_panel.getChildByName("title_des_text_3"));
        let title_des_text_4 = (this.all_panel.getChildByName("title_des_text_4"));
        let title_des_text_5 = (this.all_panel.getChildByName("title_des_text_5"));

        let allin_label = this._allin_panel.getChildByName("allin_label");

        let other_title_des_text_1 = (this._other_info_panel.getChildByName("title_des_text_1"));
        let other_title_des_text_2 = (this._other_info_panel.getChildByName("title_des_text_2"));
        let other_title_des_text_3 = (this._other_info_panel.getChildByName("title_des_text_3"));
        let other_title_des_text_4 = (this._other_info_panel.getChildByName("title_des_text_4"));
        let other_title_des_text_5 = (this._other_info_panel.getChildByName("title_des_text_5"));


        let info_title_text_3 = (this._selfInfo_panel.getChildByName("info_title_text_3"));
        let info_title_text_4 = (this._selfInfo_panel.getChildByName("info_title_text_4"));
        let info_title_text_5 = (this._selfInfo_panel.getChildByName("info_title_text_5"));
        let info_title_text_6 = (this._selfInfo_panel.getChildByName("info_title_text_6"));

        let label_text = (this.remark_panel.getChildByName("label_text"));
        let set_note_text = (this.remark_panel.getChildByName("set_note_text"));

        let remark_button_0 = (this.remark_panel.getChildByName("remark_button_0"));
        let menu_text_0 = (remark_button_0.getChildByName("menu_text_0"));


        vip_title_des_text_1.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_vip_panel_vip_title_des_text_1"));
        vip_title_des_text_2.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_vip_panel_vip_title_des_text_2"));
        title_des_text_1.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_title_des_text_1"));
        if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.zh_CN) {
            title_des_text_2.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt").replace("VPIP", ""));
            title_des_text_4.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt").replace("PFR", ""));
        }
        else
        {
            title_des_text_2.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt"));
            title_des_text_4.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt"));
        }
        //title_des_text_2.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt"));
        title_des_text_3.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_title_des_text_3"));
        //title_des_text_4.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt"));
        title_des_text_5.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_title_des_text_5"));
        title_des_text_1.getComponent(cc.Label).enableBold = true;
        title_des_text_2.getComponent(cc.Label).enableBold = true;
        title_des_text_3.getComponent(cc.Label).enableBold = true;
        title_des_text_4.getComponent(cc.Label).enableBold = true;
        title_des_text_5.getComponent(cc.Label).enableBold = true;

        other_title_des_text_1.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_title_des_text_1"));
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            other_title_des_text_2.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt").replace("VPIP", ""));
            other_title_des_text_4.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt").replace("PFR", ""));
        }
        else
        {
            other_title_des_text_2.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_vpip_txt"));
            other_title_des_text_4.getComponent(cc.Label).string = (cv.config.getStringData("DataView_data_panel_dataInfo_panel_vip_panel_pfr_txt"));
        }
        other_title_des_text_3.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_title_des_text_3"));
        other_title_des_text_5.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_title_des_text_5"));
        other_title_des_text_1.getComponent(cc.Label).enableBold = true;
        other_title_des_text_2.getComponent(cc.Label).enableBold = true;
        other_title_des_text_3.getComponent(cc.Label).enableBold = true;
        other_title_des_text_4.getComponent(cc.Label).enableBold = true;
        other_title_des_text_5.getComponent(cc.Label).enableBold = true;

        allin_label.getComponent(cc.Label).string = cv.config.getStringData("roleInfo_other_panel_allin_panel_allin_label");
        this._at_text.getComponent(cc.Label).string = (cv.config.getStringData("Faceview_danmu_button_danmu"));

        let playback_text = cc.find("Label", this._recond_button);
        playback_text.getComponent(cc.Label).string = cv.config.getStringData("Star_playback");


        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            info_title_text_3.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_selfInfo_panel_info_title_text_3_shot"));
        }
        else {
            info_title_text_3.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_selfInfo_panel_info_title_text_3"));
        }

        info_title_text_4.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_selfInfo_panel_info_title_text_4"));
        info_title_text_5.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_selfInfo_panel_info_title_text_5"));
        info_title_text_6.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_selfInfo_panel_info_title_text_6"));

        vip_title_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_vip_panel_Image_10_vip_title_text"));
        this._local_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_local_text"));
        this._remark_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_role_remark_text"));
        this._remark_text.getComponent(cc.Label)._forceUpdateRenderData(true);
        this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width + 15, this._remark_button.getPosition().y);
        label_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_label_text"));
        set_note_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_set_note_text"));
        this.menu_text.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_menu_button_menu_text"));
        menu_text_0.getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_menu_button_menu_text"));

        this._kickOut_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_houseOwer_Panel_kickOut_button"));
        this._prohibit_sitdown_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_houseOwer_Panel_prohibit_sitdown_button"));
        this._authentication_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_houseOwer_Panel_authentication_button"));
        this.sure_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_sure_button"));
        this.cancle_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("roleInfo_root_remark_panel_cancle_button"));

        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            this._prohibit_sitdown_button.getChildByName("Label").getComponent(cc.Label).fontSize = (34);
            this._authentication_button.getChildByName("Label").getComponent(cc.Label).fontSize = (34);
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
            this._prohibit_sitdown_button.getChildByName("Label").getComponent(cc.Label).fontSize = (34);
            this._authentication_button.getChildByName("Label").getComponent(cc.Label).fontSize = (30);
        }
        else {
            this._prohibit_sitdown_button.getChildByName("Label").getComponent(cc.Label).fontSize = (32);
            this._authentication_button.getChildByName("Label").getComponent(cc.Label).fontSize = (30);
        }
        this.addEvent();
        this.setForbidChat(false);
        cv.MessageCenter.send("hide_bombInfoTips");
    }

    /**
     *  
     */
    public createFaceItem() {
        if (this.hasCreateFaceItem) return;
        this.hasCreateFaceItem = true;
        for (let i = 0; i < 18; i++) {
            let item = cc.instantiate(this.faceItem);
            item.getComponent(FaceItem).setData(i, cv.GameDataManager.tRoomData.pkPayMoneyItem.emotionFee.needCoin);
            if (i >= 12) {
                item.setPosition(new cc.Vec2((i - 12) * 146.66 - 440, -258));
            }
            else if (i >= 6 && i < 12) {
                item.setPosition(new cc.Vec2((i - 6) * 146.66 - 440, -86));
            }
            else {
                item.setPosition(new cc.Vec2(i * 146.66 - 440, 86));
            }
            this._face_panel.addChild(item);
        }
    }
    onDestroy() {
        cv.MessageCenter.unregister("update_userPokerData", this.node);
        cv.MessageCenter.unregister("on_address_update", this.node);
        //cv.MessageCenter.unregister("effet_call", this.node);
        cv.MessageCenter.unregister("RecetRoleInfoView", this.node);
        cv.MessageCenter.unregister("update_prohibit_button", this.node);
        cv.MessageCenter.unregister("update_remarks", this.node);
        cv.MessageCenter.unregister("isHavePriviledge", this.node);
        cv.MessageCenter.unregister("forbid_chat", this.node);
        cv.MessageCenter.unregister("on_play_voice", this.node);
        cv.MessageCenter.unregister("NotDisturb", this.node);
        cv.MessageCenter.unregister("liveStatus", this.node);
        cv.MessageCenter.unregister("mikeMode", this.node);
        cv.MessageCenter.unregister("like", this.node);
        cv.MessageCenter.unregister("usermarks", this.node);
        cv.MessageCenter.unregister("get_usermarks", this.node);
        cv.MessageCenter.unregister("modify_usermarks", this.node);

        this.unschedule(this.Update);
        while (this._timeIDs.length > 0) {
            clearTimeout(this._timeIDs.shift());
        }
    }

    doOpcity(obj: cc.Node, opacityNum: number) {
        if (!obj) {
            return;
        }
        let a = obj.children;
        if (obj != this._other_panel || obj != this._face_bg) {
            obj.opacity = (opacityNum);
            //obj.setCascadeOpacityEnabled(true);
        }

        let len = obj.childrenCount;
        for (let i = 0; i < len; i++) {
            if (a[i] == this._other_panel) continue;
            a[i].opacity = (opacityNum);
            // a[i].setCascadeOpacityEnabled(true);
            if (a[i].childrenCount > 0) {
                this.doOpcity(a[i], opacityNum);
            }
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
        else {
            this._signature_editbox.getComponent(cc.EditBox).string = this._signature_text.getComponent(cc.Label).string;
            this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
        }

        cv.resMgr.setSpriteFrame(cc.find("Background", this._signature_sure_button), "zh_CN/game/dzpoker/datacard/btn_signature1");
        this._signature_sure_button.active = true;
        this._signature_text.active = false;
        this._signature_button.active = false;

        this.onTextChanged();
        if (this._editbox_state == 0) {
            this._editbox_state = 1;
            this._signature_editbox.getComponent(cc.EditBox).focus();
        }
    }

    addEvent() {
        this._panelbg.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            this._signature_sure_button.active = false;
            this._signature_editbox.active = false;

            this._signature_text.active = true;

            this._friend_des_sp.active = false;
            this._cn_des_sp.active = false;
            this._panelbg.getChildByName("zhezhao_panel").active = false;

            this._editbox_state = 0;

            if (cv.dataHandler.getUserData().u32Uid == this.u32CurrentUid) {
                this._signature_button.active = true;
            }
            else {
                this._signature_button.active = false;
            }

            event.stopPropagation();
        });
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
            this.node.active = false;
            this._shade.active = false;
            this._friend_des_sp.active = false;
            this._cn_des_sp.active = false;
            this._panelbg.getChildByName("zhezhao_panel").active = false;
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

        this._face_bg.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => { event.stopPropagation(); });
        this._kickOut_button.on(cc.Node.EventType.TOUCH_END, this.kickOutCallBack, this);
        this._prohibit_sitdown_button.on(cc.Node.EventType.TOUCH_END, this.noSeatCallBack, this);
        this._authentication_button.on(cc.Node.EventType.TOUCH_END, this.authenticationCallBack, this);

        this._remark_button.on(cc.Node.EventType.TOUCH_END, this.showRemarkPanel, this);
        this._remarkbtn_panel.on(cc.Node.EventType.TOUCH_END, this.showRemarkPanel, this);

        this.sure_button.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event) {
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
            cv.worldNet.RequestAddRemarks(this.u32CurrentUid, this.remark_click_type, str);
            event.stopPropagation();
            this.remark_panel.active = (false);
        }.bind(this));

        this.cancle_button.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event) {
            cv.AudioMgr.playButtonSound('button_click');
            event.stopPropagation();
            this.remark_panel.active = (false);
        }.bind(this));

        this.menu_button.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event) {
            cv.AudioMgr.playButtonSound('button_click');
            event.stopPropagation();
            this.setButtonListToShow(!this.buttonList[0].active);
        }.bind(this));

        cv.MessageCenter.register("update_userPokerData", this.updatePokerData.bind(this), this.node);
        cv.MessageCenter.register("on_address_update", this.OnUpdateAddres.bind(this), this.node);
        //cv.MessageCenter.register("effet_call", this.doOpcityX.bind(this), this.node);
        cv.MessageCenter.register("RecetRoleInfoView", this.recetRoleInfo.bind(this), this.node);
        cv.MessageCenter.register("update_prohibit_button", this.updateProhibitButton.bind(this), this.node);
        cv.MessageCenter.register("update_remarks", this.OnUpdate_remarks.bind(this), this.node);
        cv.MessageCenter.register("isHavePriviledge", this.onIsHavePriviledge.bind(this), this.node);
        cv.MessageCenter.register("forbid_chat", this.forbidChat.bind(this), this.node);
        cv.MessageCenter.register("on_play_voice", this.speakOverFunc.bind(this), this.node);
        cv.MessageCenter.register("NotDisturb", this.NotDisturb.bind(this), this.node);
        cv.MessageCenter.register("liveStatus", this.liveStatus.bind(this), this.node);
        cv.MessageCenter.register("mikeMode", this.onMikeMode.bind(this), this.node);
        cv.MessageCenter.register("like", this.OnLike.bind(this), this.node);
        cv.MessageCenter.register("get_usermarks", this.onGetUserMarks.bind(this), this.node);
        cv.MessageCenter.register("modify_usermarks", this.onModifyUserMarks.bind(this), this.node);
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
    showRemarkPanel() {
        cv.AudioMgr.playButtonSound('button_click');
        this.remark_panel.active = (true);
        this.sure_button.getComponent(cc.Button).interactable = true;
        this.cancle_button.getComponent(cc.Button).interactable = true;
        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(this.u32CurrentUid);
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
    Update(f32Delta: number) {
        this.opcityNum = this.opcityNum - 1;
        if (this.opcityNum <= 150) {
            this.node.active = (false);
            this._shade.active = false;
            this.opcityNum = 300;
            this.unschedule(this.Update);
            return;
        }
        let num = this.opcityNum >= 255 ? 255 : this.opcityNum;
        this.doOpcity(this._other_panel, num);
    }

    onTouchFacePanel(event: cc.Event)//屏蔽的属于未处理
    {
        if (!this.canSendFace) {
            event.stopPropagation();
            event.target.getParent().getComponent(FaceItem).setClick(false);
            return;
        }
        else {
            event.target.getParent().getComponent(FaceItem).setClick(true);
        }

        switch (event.type) {
            case cc.Node.EventType.TOUCH_START:
                this._root.active = (false);
                this._shade.active = false;
                //  this.doOpcity(this.model_panel, 0);
                //  this.doOpcity(m_pkTempHead, 0);
                this._face_bg.active = (true);
                this.doOpcity(this._other_panel, 255);
                this.unschedule(this.Update);
                this.opcityNum = 300;
                break;
            case cc.Node.EventType.TOUCH_END:
                this.doOpcityX(null);
                break;
            case cc.Node.EventType.TOUCH_CANCEL:
                this.doOpcityX(null);
                break;
            default:
                break;
        }
    }

    speak(event: cc.Event) {
        this._cn_des_sp.active = false;
        this._friend_des_sp.active = false;

        if (event.type == cc.Node.EventType.TOUCH_END) {
            for (let i = (0); i < cv.GameDataManager.tRoomData.kTablePlayerList.length; i++) {
                let pkPlayer = cv.GameDataManager.tRoomData.kTablePlayerList[i];
                if (this.u32CurrentUid == pkPlayer.playerid) {
                    if (this.speakingVoice == true) {  //防止连续点击
                        console.log("speaking is now.");
                        return;
                    }
                    if (pkPlayer.last_voice.length > 0) {
                        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                            cv.native.StopPlay();
                            let kInfo: CAFInfo = new CAFInfo();
                            kInfo.kUrl = pkPlayer.last_voice;
                            kInfo.kSender = this._roleName_text.getComponent(cc.Label).string;
                            kInfo.u32SeatId = pkPlayer.seatid;
                            cv.native.PlayRoomVoice(kInfo);
                        } else {
                            cv.AudioMgr.stop(this.m_i32CurrPlayVoiceId);
                            //cv.AudioMgr.preload(pkPlayer.last_voice);
                            //cv.AudioMgr.play(pkPlayer.last_voice);
                            this.downloadVoice(pkPlayer);
                        }
                        this.speakingVoice = true;
                        this.updataRecondButtonTouch();
                    }
                    return;
                }
            }
        }
    }

    //音效开始播完回调
    speakOverFunc(param: CAFInfo = null) {
        //播放完回调，重置状态
        if (param == null) {
            this.speakingVoice = false;
            this.updataRecondButtonTouch();
            return;
        }
        let audioTime = param.f32Time;
        let self = this;
        let id = setTimeout(function () {
            self._timeIDs.shift();
            self.speakingVoice = false;
            self.updataRecondButtonTouch();
        }, 1000 * audioTime);
        this._timeIDs.push(id);
    }

    downloadVoice(pkPlayer: PlayerInfo) {
        let i32Index = cv.AudioMgr.getAudioID(pkPlayer.last_voice);
        let f32Dura = cv.AudioMgr.getDuration(i32Index);
        this.m_i32CurrPlayVoiceId = i32Index;

        let kInfo: CAFInfo = new CAFInfo();
        let _url = pkPlayer.last_voice;
        if (_url.indexOf("@") != -1) {
            let subStr = _url.split("@");
            kInfo.kUrl = subStr[2];
        } else {
            kInfo.kUrl = pkPlayer.last_voice;
        }
        kInfo.kSender = this._roleName_text.getComponent(cc.Label).string;
        kInfo.f32Time = f32Dura > 10 ? 10 : f32Dura;
        kInfo.u32SeatId = pkPlayer.seatid;
        cv.httpHandler.DoDownloadVoice(kInfo, this.speakOverFunc.bind(this));

    }

    lookonSelf(playerinfo: PlayerInfo) {
        this.adaptSelfWidget();
        this.canSendFace = true;
        this.remark_panel.active = (false);
        this.unschedule(this.Update);
        this._root.active = (true);
        this._shade.active = true;
        this._enterType = 1;

        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;

        this._signature_text.active = true;
        this._signature_button.active = true;

        this.doOpcity(this._other_panel, 255);
        cv.MessageCenter.send("FaceItem_canSendFace", this.canSendFace);

        this.setVipView(true);

        let id: string = cv.StringTools.formatC("ID:%d", playerinfo.playerid);
        this.u32CurrentUid = playerinfo.playerid;
        cv.worldNet.GetUserMarksRequest(playerinfo.playerid);

        cc.find("Background", this._recond_button).opacity = 76.5;
        this._recond_button.getComponent(cc.Button).enabled = false;

        cc.find("Background", this._block_button).opacity = 76.5;
        this._block_button.getComponent(cc.Button).enabled = false;

        console.log("---------------------" + cv.dataHandler.getUserData().u32Uid + "<" + cv.GameDataManager.tRoomData.u32OwnerId + "<" + this.u32CurrentUid)
        if (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
            this.setHouseOwer(true);
            this._vip_panel.active = (false);
            this.all_panel.active = (false);
            this._other_info_panel.active = (true);
            this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other + this.HouseBg_H);
            this._panelbg.setPosition(this._panelbg.getPosition().x, -75);
            cv.resMgr.adaptWidget(this._panelbg, true);
        }
        else if (cv.dataHandler.getUserData().u32Uid != cv.GameDataManager.tRoomData.u32OwnerId && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
            this.setHouseOwer(false);
            this._vip_panel.active = (false);
            this.all_panel.active = (false);
            this._other_info_panel.active = (true);
            this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other);
            cv.resMgr.adaptWidget(this._panelbg, true);
            this.resetPos();
        }
        else {
            this.setHouseOwer(false);
            this._vip_panel.active = (true);
            this.all_panel.active = (true);
            this._other_info_panel.active = (false);
            this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_self);
            cv.resMgr.adaptWidget(this._panelbg, true);
            this.resetPos();
        }

        if (cv.dataHandler.getUserData().u32Uid == this.u32CurrentUid) {
            this.showSelfPanel(playerinfo);
            this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
        }
        else {
            this.showOtherPanel(playerinfo);
            this._signature_panel.off(cc.Node.EventType.TOUCH_END, this.closeSign, this);
        }

        CircleSprite.setCircleSprite(this._headNode, playerinfo.headurl, playerinfo.plat, false);

        let bighead = cc.director.getScene().getChildByName("bighead");
        CircleSprite.setBigCircleSprite(bighead.getChildByName("headNode"), playerinfo.headurl, playerinfo.plat, false, 0);

        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(playerinfo.playerid);
        if (!rdata || rdata.sRemark.length <= 0) {
            this._remark_text.getComponent(cc.Label).string = (cv.config.getStringData("UIroleInfoRemark"));
        }
        else {
            this._remark_text.getComponent(cc.Label).string = (rdata.sRemark);
        }
        this._remark_text.getComponent(cc.Label)._forceUpdateRenderData(true);
        this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width + 15, this._remark_button.getPosition().y);

        this.setNameAndID(this._roleName_text, playerinfo.name, id);
        this._local_text.getComponent(cc.Label).string = (cv.config.getStringData("ToastMessage8"));

        // let Pos: any = {};
        // Pos.f32Latitude = playerinfo.position.latitude;
        // Pos.f32Longitude = playerinfo.position.longtitude;
        // this.GetAddress(Pos, this._roleName_text.getComponent(cc.Label).string);

        let mode = GameDataManager.tRoomData.pkRoomParam.game_mode;
        let gameid = GameDataManager.tRoomData.u32GameID;

        let blinds = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
        blinds = blinds.substr(0, blinds.indexOf("/"));
        let blind = cv.StringTools.showStringToNumber(blinds);
        let ante = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
        if (playerinfo.playerid != cv.dataHandler.getUserData().u32Uid) {
            cv.httpHandler.GetPubliceData(playerinfo.playerid, mode, gameid, cv.StringTools.serverGoldByClient(blind), ante, playerinfo.identity, cv.dataHandler.getUserData().u32Uid);
        }
        else {
            cv.httpHandler.requestUserData(mode, gameid, cv.StringTools.serverGoldByClient(blind), ante, playerinfo.identity);
        }

        if (playerinfo.gender != 1) {
            cv.resMgr.setSpriteFrame(this._gender_img, "zh_CN/game/dzpoker/datacard/icon_woman");
        }
        else {
            cv.resMgr.setSpriteFrame(this._gender_img, "zh_CN/game/dzpoker/datacard/icon_man");
        }


        if (cv.dataHandler.getUserData().u32Uid != cv.GameDataManager.tRoomData.u32OwnerId) {
            if (cv.GameDataManager.tGameData.isHavePriviledge(cv.dataHandler.getUserData().u32Uid) && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                if (this._player) {
                    id = cv.StringTools.formatC("ID:%d", this._player.playerid);
                    this.setNameAndID(this._roleName_text, this._player.name, id);
                }
                cv.gameNet.RequestCheckAllianceRoomPriviledge(this.u32CurrentUid, cv.GameDataManager.tRoomData.u32RoomId);
            }
        }
    }

    // //刷新界面
    updateView(seatId: number) {
        this.canSendFace = true;

        this.remark_panel.active = (false);
        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;

        this._signature_text.active = true;
        this._signature_button.active = false;

        this.speakingVoice = false;

        this.unschedule(this.Update);
        this._root.active = (true);
        this._shade.active = true;
        this._enterType = 0;

        this.doOpcity(this._other_panel, 255);
        cv.MessageCenter.send("FaceItem_canSendFace", this.canSendFace);

        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            this.setVipView(true);
        }
        else {
            //setVipView(cv.dataHandler.getUserData().u32CardType >= 2);
            this.setVipView(true);
        }
        let id: string = "";
        for (let i = (0); i < cv.GameDataManager.tRoomData.kTablePlayerList.length; i++) {
            let pkPlayer = cv.GameDataManager.tRoomData.kTablePlayerList[i];
            if (pkPlayer.seatid == seatId) {
                this.u32CurrentUid = pkPlayer.playerid;

                if (this.u32CurrentUid == cv.dataHandler.getUserData().u32Uid) {
                    this._signature_button.active = true;
                }
                //this.updateProhibitButton(null);
                this._player = pkPlayer;
                cv.worldNet.GetUserMarksRequest(pkPlayer.playerid);
                if (cv.GameDataManager.tRoomData.isZoom() || GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.Bet) {
                    cc.find("Background", this._recond_button).opacity = 76.5;
                    this._recond_button.getComponent(cc.Button).enabled = false;

                    cc.find("Background", this._block_button).opacity = 76.5;
                    this._block_button.getComponent(cc.Button).enabled = false;
                } else {
                    if (this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                        cc.find("Background", this._recond_button).opacity = 255;
                        this._recond_button.getComponent(cc.Button).enabled = true;

                        cc.find("Background", this._block_button).opacity = 255;
                        this._block_button.getComponent(cc.Button).enabled = true;
                    }
                    else {
                        cc.find("Background", this._recond_button).opacity = 76.5;
                        this._recond_button.getComponent(cc.Button).enabled = false;

                        cc.find("Background", this._block_button).opacity = 76.5;
                        this._block_button.getComponent(cc.Button).enabled = false;
                    }
                }
                console.log("---------------------" + cv.dataHandler.getUserData().u32Uid + "<" + cv.GameDataManager.tRoomData.u32OwnerId + "<" + this.u32CurrentUid)
                if (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                    this.setHouseOwer(true);
                    this._vip_panel.active = (false);
                    this.all_panel.active = (false);
                    this._other_info_panel.active = (true);
                    this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other + this.HouseBg_H);
                    this._panelbg.setPosition(this._panelbg.getPosition().x, -75);
                    cv.resMgr.adaptWidget(this._panelbg, true);
                }
                else if (cv.dataHandler.getUserData().u32Uid != cv.GameDataManager.tRoomData.u32OwnerId && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                    this.setHouseOwer(false);
                    this._vip_panel.active = (false);
                    this.all_panel.active = (false);
                    this._other_info_panel.active = (true);
                    this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other);
                    cv.resMgr.adaptWidget(this._panelbg, true);
                    this.resetPos();
                }
                else {
                    this.setHouseOwer(false);
                    this._vip_panel.active = (true);
                    this.all_panel.active = (true);
                    this._other_info_panel.active = (false);

                    this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_self);
                    cv.resMgr.adaptWidget(this._panelbg, true);
                    this.resetPos();
                }

                if (cv.dataHandler.getUserData().u32Uid == this.u32CurrentUid) {
                    this.showSelfPanel(pkPlayer);
                    this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
                }
                else {
                    this.showOtherPanel(pkPlayer);
                    this._signature_panel.off(cc.Node.EventType.TOUCH_END, this.closeSign, this);
                }

                CircleSprite.setCircleSprite(this._headNode, pkPlayer.headurl, pkPlayer.plat, false);

                let bighead = cc.director.getScene().getChildByName("bighead");
                CircleSprite.setBigCircleSprite(bighead.getChildByName("headNode"), pkPlayer.headurl, pkPlayer.plat, false, 0);

                id = cv.StringTools.formatC("ID:%d", pkPlayer.playerid);

                let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(pkPlayer.playerid);
                if (!rdata || rdata.sRemark.length <= 0) {
                    this._remark_text.getComponent(cc.Label).string = (cv.config.getStringData("UIroleInfoRemark"));
                }
                else {
                    this._remark_text.getComponent(cc.Label).string = (rdata.sRemark);
                }
                this._remark_text.getComponent(cc.Label)._forceUpdateRenderData(true);
                this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width + 15, this._remark_button.getPosition().y);

                this.setNameAndID(this._roleName_text, pkPlayer.name, id);
                this._local_text.getComponent(cc.Label).string = (cv.config.getStringData("ToastMessage8"));

                // let Pos: any = {};
                // Pos.f32Latitude = pkPlayer.position.latitude;
                // Pos.f32Longitude = pkPlayer.position.longtitude;
                // this.GetAddress(Pos, this._roleName_text.getComponent(cc.Label).string);

                let mode1 = cv.GameDataManager.tRoomData.pkRoomParam.game_mode;
                let mode = GameDataManager.tRoomData.pkRoomParam.game_mode;
                let gameid = GameDataManager.tRoomData.u32GameID;

                let blinds = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
                blinds = blinds.substr(0, blinds.indexOf("/"));
                let blind = cv.StringTools.showStringToNumber(blinds);
                let ante = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
                if (pkPlayer.playerid != cv.dataHandler.getUserData().u32Uid) {
                    cv.httpHandler.GetPubliceData(pkPlayer.playerid, mode, gameid, cv.StringTools.serverGoldByClient(blind), ante, pkPlayer.identity, cv.dataHandler.getUserData().u32Uid);
                }
                else {
                    cv.httpHandler.requestUserData(mode, gameid, cv.StringTools.serverGoldByClient(blind), ante, pkPlayer.identity);
                }

                if (pkPlayer.gender != 1) {
                    cv.resMgr.setSpriteFrame(this._gender_img, "zh_CN/game/dzpoker/datacard/icon_woman");
                }
                else {
                    cv.resMgr.setSpriteFrame(this._gender_img, "zh_CN/game/dzpoker/datacard/icon_man");
                }
                break;
            }
        }
        if (cv.dataHandler.getUserData().u32Uid != cv.GameDataManager.tRoomData.u32OwnerId) {
            if (cv.GameDataManager.tGameData.isHavePriviledge(cv.dataHandler.getUserData().u32Uid) && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                if (this._player) {
                    id = cv.StringTools.formatC("ID:%d", this._player.playerid);
                    this.setNameAndID(this._roleName_text, this._player.name, id);
                }
                cv.gameNet.RequestCheckAllianceRoomPriviledge(this.u32CurrentUid, cv.GameDataManager.tRoomData.u32RoomId);
            }
        }
    }
    doOpcityX(sender: any) {
        this._root.active = (false);
        this._shade.active = false;
        this._block_img.active = false;
        // doOpcity(m_pkTempHead, 0);
        this._face_bg.active = (true);
        this.doOpcity(this._other_panel, 255);
        this.unschedule(this.Update);
        this.opcityNum = 300;

        this.schedule(this.Update, 0);
    }
    OnUpdateAddres(address: string) {
        let isSelf = cv.GameDataManager.tRoomData.u32OwnerId == cv.dataHandler.getUserData().u32Uid;
        if (isSelf) {
            this._local_text.getComponent(cc.Label).string = ("");
        }
    }
    recetRoleInfo(sender: any) {
        this._total_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//总手数
        this._totalPoker_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//总局数
        this._ruchi_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//入池率/翻前加注率
        this._ruchiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//入池胜率：

        this._other_total_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//总手数
        this._other_totalPoker_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//总局数
        this._other_ruchi_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//入池率/翻前加注率
        this._other_ruchiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//入池胜率：

        this._avargebring_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//场均带入:
        this._avarge_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//场均战绩:
        this._big_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//大盲/百手:
        this._fight_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//战绩/百手:

        this._jiJin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0));//激进度:
        this._fanPaiLv_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//看翻牌率:
        //this._tanPaiLv_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//摊牌率:
        this._3bet_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//再加注率/弃再加注率:

        this._vpip_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//偷盲率:
        this._pfr_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");
        //this._fanBei_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//翻后胜率
        //this._tanPaiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//摊牌胜率:
        this._cbet_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", 0) + "%");//持续下注率:
    }

    updatePokerData(sender: any) {
        this._total_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_hand_card_count));//总手数
        this._totalPoker_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_end_room_count));//总局数
        this._ruchi_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Vpip_rate) + "%");//入池率/翻前加注率
        this._ruchiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Pfr_rate) + "%");//入池胜率：
        this._shoushu_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.level_hands));//本级别手数：

        this._other_total_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_hand_card_count));//总手数
        this._other_totalPoker_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_end_room_count));//总局数
        this._other_ruchi_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Vpip_rate) + "%");//入池率/翻前加注率
        this._other_ruchiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Pfr_rate) + "%");//入池胜率：
        this._other_shoushu_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.level_hands));//本级别手数：
        this._self_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.liked_count));
        this._other_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.liked_count));
        if (cv.dataHandler.getUserData().pokerdata.star_duration == undefined) {
            cv.dataHandler.getUserData().pokerdata.star_duration = 0;
        }
        if (cv.dataHandler.getUserData().pokerdata.has_liked) {
            this._like_button.getComponent(cc.Button).enabled = false;
            cv.resMgr.setSpriteFrame(cc.find("Background", this._like_button), "zh_CN/game/dzpoker/datacard/btn_like_disable");
        }
        else {
            this._like_button.getComponent(cc.Button).enabled = true;
            cv.resMgr.setSpriteFrame(cc.find("Background", this._like_button), "zh_CN/game/dzpoker/datacard/btn_like_enable");
        }

        this._friend_num.getComponent(cc.Label).string = cv.dataHandler.getUserData().pokerdata.intimacy.toString();

        //cv.dataHandler.getUserData().pokerdata.intimacy = 50000;
        if (cv.dataHandler.getUserData().pokerdata.intimacy < 100 && cv.dataHandler.getUserData().pokerdata.intimacy >= 0) {
            cv.resMgr.setSpriteFrame(this._friend_sp, "zh_CN/game/dzpoker/datacard/friend_luren_tag");
            this._friend_sp.setPosition(0, 0);
            this._friend_num.setPosition(0, -70);
            this._friend_num.color = new cc.Color().fromHEX("#FFFFFF");
            this._friend_text.setPosition(0, -103);
            this._friend_text.setContentSize(112, 50);
            this._friend_des_sp.setPosition(201, 347);
        }
        else {
            cv.resMgr.setSpriteFrame(this._friend_sp, "zh_CN/game/dzpoker/datacard/friend_tag");
            this._friend_sp.setPosition(0, 10);
            this._friend_num.setPosition(0, -88);
            this._friend_num.color = new cc.Color().fromHEX("#FFF59C");
            this._friend_text.setPosition(0, -131);
            this._friend_text.setContentSize(118, 50);
            this._friend_des_sp.setPosition(201, 310);
        }
        
        if (cv.dataHandler.getUserData().pokerdata.intimacy >= 100 && cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.yn_TH) {
            this._friend_text.setPosition(0, -128);
            this._friend_text.setContentSize(118, 58);
        }

        if (cv.config.getCurrentLanguage() === cv.Enum.LANGUAGE_TYPE.yn_TH) {
            this._friend_text.getComponent(cc.Label).fontSize = 20;
        }

        let str = cv.StringTools.calculateAutoWrapString(this._friend_text.getComponent(cc.Label).node, cv.tools.GetFriendLevelName(cv.dataHandler.getUserData().pokerdata.intimacy));
        this._friend_text.getComponent(cc.Label).string = str;

        this._countdown_text.getComponent(cc.Label).string = cv.tools.secondFormat(cv.dataHandler.getUserData().pokerdata.star_duration);
        /*if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            this._total_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_hand_card_count));//总手数
            this._totalPoker_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_end_room_count));//总局数
            this._ruchi_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Enter_rate) + "%");//入池率/翻前加注率
            this._ruchiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Win_rate) + "%");//入池胜率：

            this._other_total_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_hand_card_count));//总手数
            this._other_totalPoker_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Total_end_room_count));//总局数
            this._other_ruchi_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Enter_rate) + "%");//入池率/翻前加注率
            this._other_ruchiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Win_rate) + "%");//入池胜率：
        }
        else {
            this._total_text.getComponent(cc.Label).string = ("-");//总手数
            this._totalPoker_text.getComponent(cc.Label).string = ("-");//总局数
            this._ruchi_text.getComponent(cc.Label).string = ("-");//入池率/翻前加注率
            this._ruchiWin_text.getComponent(cc.Label).string = ("-");//入池胜率：


            this._other_total_text.getComponent(cc.Label).string = ("-");//总手数
            this._other_totalPoker_text.getComponent(cc.Label).string = ("-");//总局数
            this._other_ruchi_text.getComponent(cc.Label).string = ("-");//入池率/翻前加注率
            this._other_ruchiWin_text.getComponent(cc.Label).string = ("-");//入池胜率：
        }*/

        this._avargebring_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().pokerdata.Buyin_average);//场均带入:
        this._avarge_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().pokerdata.Fight_average);//场均战绩:

        let blinds = "";
        let anteNum = cv.StringTools.clientGoldByServer(cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount);
        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            blinds = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
            let splitArr: string[] = blinds.split("/");
            blinds = splitArr[1];
            let bigBlind = Number(splitArr[1]);
            let gameBlind: string = cv.config.getStringData("UIGameBlind");
            //blinds = gameBlind.replace("%s", blinds);

            // if (cv.GameDataManager.tRoomData.pkRoomParam.rule_switch_force_straddle) {
            //     let cbStraddle = cv.StringTools.times(Number(bigBlind), 2.0);
            //     blinds = cv.StringTools.formatC("%s/%s", blinds, cbStraddle.toString());
            // }

            // if (anteNum) {
            //     blinds = blinds + cv.StringTools.formatC("(%f)", cv.StringTools.numberToShowNumber(anteNum));
            // }
        }
        else if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            blinds = cv.StringTools.numberToShowString(anteNum);
        }

        let bbValue: number = 0;
        for (let i = 0; i < cv.dataHandler.getUserData().pokerdata.Bb100s.length; i++) {
            if (cv.Number(blinds) * 100== cv.dataHandler.getUserData().pokerdata.Bb100s[i].bb_value) {
                bbValue = cv.dataHandler.getUserData().pokerdata.Bb100s[i].bb_100;
            }
        }
        if (bbValue != 0) {
            this._big_text.getComponent(cc.Label).string = bbValue.toString();//大盲/百手:
        }
        this._fight_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().pokerdata.Fight_100);//战绩/百手:

        this._jiJin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%0.1f", cv.dataHandler.getUserData().pokerdata.Af_rate / 100.0));//激 进 度 :
        this._fanPaiLv_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Etf_rate) + "%");//看翻牌率:
        //this._tanPaiLv_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Wtsd_rate) + "%");//摊牌率:
        this._3bet_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Rate_3bet) + "%");//再加注率/弃再加注率:

        let pfr = cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Pfr_rate) + "%";
        this._vpip_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Vpip_rate) + "%");//vpip/prf:
        this._pfr_text.getComponent(cc.Label).string = pfr;
        //this._fanBei_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Wsf_rate) + "%");//翻后胜率
        //this._tanPaiWin_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Wsd_rate) + "%");//摊牌胜率:
        this._cbet_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", cv.dataHandler.getUserData().pokerdata.Cbet_rate) + "%");//持续下注率:
    }
    // //设置VIP界面显示 
    // //param isVip 是否VIP
    setVipView(isVip: boolean) {
        if (isVip) {
            this._nothing_panel.active = (false);
            this._vipDataInfo_Panel.active = (true);
        }
        else {
            this._nothing_panel.active = (true);
            this._vipDataInfo_Panel.active = (false);
        }
    }

    setShadeHide() {
        if (cc.isValid(this._shade)) {
            this._shade.active = false;
        }
    }

    showObView() {
        this.canSendFace = false;
        this._enterType = 1;
        this.speakingVoice = false;

        let obPlayer: ObPlayer = cv.GameDataManager.tRoomData.obPlayer;
        this.u32CurrentUid = obPlayer.playerid;

        cv.worldNet.GetUserMarksRequest(obPlayer.playerid);
        this.remark_panel.active = (false);
        this.recetRoleInfo(null);
        this.unschedule(this.Update);

        this._root.active = (true);
        this._shade.active = true;
        this._interaction_panel.active = true;
        this.doOpcity(this.m_pkTempHead, 255);

        this._signature_editbox.active = false;
        this._signature_sure_button.active = false;

        this._signature_text.active = true;
        this._signature_button.active = false;

        if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            this.setVipView(false);
        }
        else {
            this.setVipView(cv.dataHandler.getUserData().u32CardType >= 2);
        }

        this._selfInfo_panel.active = (false);
        this._other_panel.active = (true);
        this._faceMoudle_panel.active = (true);

        this.updateProhibitButton(null);

        let bighead = cc.director.getScene().getChildByName("bighead");
        CircleSprite.setCircleSprite(this._headNode, obPlayer.headPath, obPlayer.plat, false, 0);
        CircleSprite.setBigCircleSprite(cc.find("headNode", bighead), obPlayer.headPath, obPlayer.plat, false, 0);

        let id: string = cv.StringTools.formatC("ID:%d", obPlayer.playerid);
        let isHouseOwer: boolean = cv.GameDataManager.tRoomData.u32OwnerId == cv.dataHandler.getUserData().u32Uid;
        if (isHouseOwer && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
            this.setHouseOwer(true);
            this._vip_panel.active = (false);
            this.all_panel.active = (false);
            this._other_info_panel.active = (true);
            this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other + this.HouseBg_H);
            this._panelbg.setPosition(this._panelbg.getPosition().x, -75);
            cv.resMgr.adaptWidget(this._panelbg, true);
        }
        else {
            this.setHouseOwer(false);
            this._vip_panel.active = (false);
            this.all_panel.active = (false);
            this._other_info_panel.active = (true);
            if (this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                if (obPlayer.data.identity == 1) {
                    this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other_star);
                    this.adaptOtherWidget();
                }
                else {
                    this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other);
                    cv.resMgr.adaptWidget(this._panelbg, true);
                    this.resetPos();
                }
            }
            else {
                this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_self);
                cv.resMgr.adaptWidget(this._panelbg, true);
                this.resetPos();
            }
        }

        if (cv.GameDataManager.tRoomData.isZoom() || GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.Bet) {
            cc.find("Background", this._recond_button).opacity = 76.5;
            this._recond_button.getComponent(cc.Button).enabled = false;

            cc.find("Background", this._block_button).opacity = 76.5;
            this._block_button.getComponent(cc.Button).enabled = false;

            if (this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                this.showOtherPanel(obPlayer.data);
                this._signature_panel.off(cc.Node.EventType.TOUCH_END, this.closeSign, this);
            }
            else {
                cc.find("Background", this._block_button).opacity = 76.5;
                this._block_button.getComponent(cc.Button).enabled = false;
                this.showSelfPanel(obPlayer.data);
                this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
            }

        } else {
            if (this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                cc.find("Background", this._recond_button).opacity = 255;
                this._recond_button.getComponent(cc.Button).enabled = true;

                cc.find("Background", this._block_button).opacity = 255;
                this._block_button.getComponent(cc.Button).enabled = true;

                this.showOtherPanel(obPlayer.data);
                this._signature_panel.off(cc.Node.EventType.TOUCH_END, this.closeSign, this);
            }
            else {
                cc.find("Background", this._recond_button).opacity = 76.5;
                this._recond_button.getComponent(cc.Button).enabled = false;

                cc.find("Background", this._block_button).opacity = 76.5;
                this._block_button.getComponent(cc.Button).enabled = false;
                this.showSelfPanel(obPlayer.data);
                this._signature_panel.on(cc.Node.EventType.TOUCH_END, this.closeSign, this);
            }
        }

        this.setNameAndID(this._roleName_text, obPlayer.name, id);
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(obPlayer.playerid);
        this._remark_text.getComponent(cc.Label).string = (rdata.sRemark);
        if (rdata.sRemark.length <= 0) {
            this._remark_text.getComponent(cc.Label).string = (cv.config.getStringData("UIroleInfoRemark"));
        }
        this._remark_text.getComponent(cc.Label)._forceUpdateRenderData(true);
        this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width + 15, this._remark_button.getPosition().y);

        let pkPlayer: PlayerInfo = obPlayer.data;
        this._obplayer = obPlayer.data;
        this._local_text.getComponent(cc.Label).string = (cv.config.getStringData("ToastMessage8"));

        // let Pos: any = {};
        // Pos.f32Latitude = pkPlayer.position.latitude;
        // Pos.f32Longitude = pkPlayer.position.longtitude;
        // this.GetAddress(Pos, this._roleName_text.getComponent(cc.Label).string);

        if (pkPlayer.gender != 1) {
            cv.resMgr.setSpriteFrame(this._gender_img, "zh_CN/game/dzpoker/datacard/icon_woman");
        }
        else {
            cv.resMgr.setSpriteFrame(this._gender_img, "zh_CN/game/dzpoker/datacard/icon_man");
        }


        let mode = GameDataManager.tRoomData.pkRoomParam.game_mode;
        let gameid = GameDataManager.tRoomData.u32GameID;

        let blinds = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
        blinds = blinds.substr(0, blinds.indexOf("/"));
        let blind = cv.StringTools.showStringToNumber(blinds);
        let ante = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;

        if (pkPlayer.playerid != cv.dataHandler.getUserData().u32Uid) {
            cv.httpHandler.GetPubliceData(pkPlayer.playerid, mode, gameid, cv.StringTools.serverGoldByClient(blind), ante, pkPlayer.identity, cv.dataHandler.getUserData().u32Uid);
        }
        else {
            cv.httpHandler.requestUserData(mode, gameid, cv.StringTools.serverGoldByClient(blind), ante, pkPlayer.identity);
        }
        if (cv.dataHandler.getUserData().u32Uid != cv.GameDataManager.tRoomData.u32OwnerId) {
            if (cv.GameDataManager.tGameData.isHavePriviledge(cv.dataHandler.getUserData().u32Uid) && this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                cv.gameNet.RequestCheckAllianceRoomPriviledge(this.u32CurrentUid, cv.GameDataManager.tRoomData.u32RoomId);
            }
        }
        this.face_over_img.opacity = (255 * 0.4);
        cv.MessageCenter.send("FaceItem_canSendFace", this.canSendFace);
    }

    // //查看自己的信息
    showSelfPanel(play: PlayerInfo) {
        //查看自己信息（区分是明星还是普通人 普通人就显示个备注 明星点自己要区分是否在直播中 添加房间倒计时显示）
        //直播状态 0. 未开播  1. 正在直播 2. 已下播
        this._certification_sp.setPosition(-128, 478);
        this._signature_panel.setPosition(-176, 398);
        this.adaptSelfWidget();
        this._like_node.active = true;
        this._friend_node.active = false;
        this._signature_button.active = true;
        this._remark_button.active = false;
        this._remarkbtn_panel.active = false;
        this._remark_text.active = false;
        this._interaction_panel.active = false;
        this._mic_panel.active = false;
        this._id_panel.active = true;
        this._signature_editbox.getComponent(cc.EditBox).enabled = true;
        //play.identity = 1;
        if (play.identity == 1) {
            //表示是明星自己点自己
            this.adaptSelfStarWidget();
            this._remark_button.active = false;
            this._remarkbtn_panel.active = false;
            this._remark_text.active = false;
            this._local_text.active = false;
            //明星自己不显示id
            this._id_panel.active = false;

            if (this._enterType == 0) {
                this._mic_panel.active = true;
                this.onMikeMode(null);
                this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_self_star);
                cv.resMgr.adaptWidget(this._panelbg, true);

                this.all_panel.setPosition(this.all_panel.getPosition().x, 88);
                this._vip_panel.setPosition(this._vip_panel.getPosition().x, -270);
                this._selfInfo_panel.setPosition(this._selfInfo_panel.getPosition().x, -430);
                this._mic_panel.setPosition(this._mic_panel.getPosition().x, -585);
            }

            this._roleName_text.color = new cc.Color(255, 216, 155, 255);
            // this.all_panel.getChildByName("title_des_text_1").color = new cc.Color(215, 201, 179,255);
            // this.all_panel.getChildByName("title_des_text_2").color = new cc.Color(215, 201, 179,255);
            // this.all_panel.getChildByName("title_des_text_3").color = new cc.Color(215, 201, 179,255);
            // this.all_panel.getChildByName("title_des_text_4").color = new cc.Color(215, 201, 179,255);
            // this.all_panel.getChildByName("title_des_text_5").color = new cc.Color(215, 201, 179,255);

            if (this._enterType == 0) {
                this._live_buttton.active = true;
            }
            else if (this._enterType == 1) {
                this._live_buttton.active = false;
            }
            this._countdown_sp.active = true;
            this._countdown_text.active = true;
            this._countdown_bg.active = true;

            //明星自己用金框
            cv.resMgr.setSpriteFrame(this._headNode, "zh_CN/game/dzpoker/datacard/Avatar_star_frame");

            if (play.liveStatus == 1) {
                //直播中
                this._liveStatus = 2;
                cv.resMgr.setSpriteFrame(cc.find("Background", this._live_buttton), "zh_CN/game/dzpoker/datacard/btn_golive_off");
            }
            else if (play.liveStatus == 2 || play.liveStatus == 0) {
                this._liveStatus = 1;
                cv.resMgr.setSpriteFrame(cc.find("Background", this._live_buttton), "zh_CN/game/dzpoker/datacard/btn_golive_on");
            }
        }
        else {
            this._countdown_sp.active = false;
            this._countdown_text.active = false;
            this._countdown_bg.active = false;
            this._roleName_text.color = new cc.Color(255, 255, 255, 255);
            cv.resMgr.setSpriteFrame(this._headNode, "zh_CN/game/dzpoker/datacard/Avatar");

            this._star_node.setPosition(cc.v2(0, 0));
        }
        this._faceMoudle_panel.active = (false);
        this._selfInfo_panel.active = (true);
        this._other_panel.active = (false);
        this._block_img.active = (false);

        CircleSprite.cleanHeadNode(this._headNode);
        CircleSprite.setCircleSprite(this._headNode, cv.dataHandler.getUserData().headUrl, 0, false);

        let bighead = cc.director.getScene().getChildByName("bighead");
        CircleSprite.cleanHeadNode(bighead.getChildByName("headNode"));
        CircleSprite.setBigCircleSprite(bighead.getChildByName("headNode"), cv.dataHandler.getUserData().headUrl, 0, false, 0);
        let id: string = cv.StringTools.formatC("ID:%d", cv.dataHandler.getUserData().u32Uid);
        this.setNameAndID(this._roleName_text, cv.dataHandler.getUserData().nick_name, id);
    }

    resetPos() {
        this.all_panel.setPosition(this.all_panel.getPosition().x, 36);
        this._vip_panel.setPosition(this._vip_panel.getPosition().x, -317);
        this._selfInfo_panel.setPosition(this._selfInfo_panel.getPosition().x, -510 + 32);
        this._mic_panel.setPosition(this._mic_panel.getPosition().x, -700);

        this._other_info_panel.setPosition(this._other_info_panel.getPosition().x, 135);
        this._other_panel.setPosition(this._other_panel.getPosition().x, -294);
        this._interaction_panel.setPosition(this._interaction_panel.getPosition().x, -3);

        this._panelbg.setPosition(this._panelbg.getPosition().x, 0);
    }
    //查看别人的信息
    showOtherPanel(play: PlayerInfo) {
        this._certification_sp.setPosition(-128, 478);
        this._signature_panel.setPosition(-176, 398);
        this.adaptOtherWidget();
        this._like_node.active = false;
        this._friend_node.active = true;

        this._signature_button.active = false;
        this._mic_panel.active = false;
        this._signature_editbox.getComponent(cc.EditBox).enabled = false;
        this._id_panel.active = false;

        let isNotDisturb = false;
        for (let i = 0; i < play.NotDisturbUids.length; i++) {
            if (cv.dataHandler.getUserData().u32Uid == play.NotDisturbUids[i]) {
                isNotDisturb = true;
                break;
            }
        }
        if (isNotDisturb == true) {
            //免打扰
            this.DisturbOrNot(1, play.playerid);
        }
        else {
            this.DisturbOrNot(2, play.playerid);
        }

        //play.identity = 1;
        if (play.identity == 1) {
            //表示查看的是明星
            //明星往左偏移8个像素
            this._certification_sp.setPosition(-131 - 5, 478);
            this._signature_panel.setPosition(-176 - 8, 398);
            this.adaptOtherStarWidget();
            this._countdown_sp.active = true;
            this._countdown_text.active = true;
            this._countdown_bg.active = true;

            this._roleName_text.color = new cc.Color(255, 216, 155, 255);
            //明星自己用金框
            cv.resMgr.setSpriteFrame(this._headNode, "zh_CN/game/dzpoker/datacard/Avatar_star_frame");

            cc.find("Background", this._block_button).opacity = 76.5;
            this._block_button.getComponent(cc.Button).enabled = false;

            if (!this._houseOwer_Panel.active) {
                this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other_star);
                this._panelbg.setPosition(this._panelbg.getPosition().x, -15);
                cv.resMgr.adaptWidget(this._panelbg, true);
            }

            this.all_panel.setPosition(this.all_panel.getPosition().x, 105);

            this._other_info_panel.setPosition(this._other_info_panel.getPosition().x, 103);
            this._other_panel.setPosition(this._other_panel.getPosition().x, -328);
            this._interaction_panel.setPosition(this._interaction_panel.getPosition().x, -29);
            //this._vip_panel.setPosition(this._vip_panel.getPosition().x, -317);
            //this._selfInfo_panel.setPosition(this._selfInfo_panel.getPosition().x, -510);
            //this._mic_panel.setPosition(this._mic_panel.getPosition().x, -700);

            this._local_text.active = false;
            this._remark_text.active = false;
            this._remark_button.active = false;
            this._remarkbtn_panel.active = false;

            // this._at_button.getComponent(cc.Button).enabled = false;
            // this._at_button.opacity = 76.5;

            // if (isLive) {
            //     this._live_panel.active = true;
            //     this._root.setPosition(cc.v2(this._root.getPosition()).x, this._rootPos.y-210);
            //     this._other_panel.setPosition(this._otherPos.x, this._otherPos.y-210);
            // }
        }
        else {
            this._roleName_text.color = new cc.Color(255, 255, 255, 255);
            cv.resMgr.setSpriteFrame(this._headNode, "zh_CN/common/icon/game_head_icon");

            this._countdown_sp.active = false;
            this._countdown_text.active = false;
            this._countdown_bg.active = false;
            cc.find("Background", this._block_button).opacity = 255;
            this._block_button.getComponent(cc.Button).enabled = true;

            this._remark_button.active = true;
            this._remarkbtn_panel.active = true;
            this._remark_text.active = true;

            let isSeat = cv.GameDataManager.tRoomData.i32SelfSeat != -1;
            if (this._enterType == 0) {
                cc.find("Background", this._block_button).opacity = 255;
                this._block_button.getComponent(cc.Button).enabled = true;
            }
            else if (this._enterType == 1) {
                if (isSeat) {
                    cc.find("Background", this._block_button).opacity = 255;
                    this._block_button.getComponent(cc.Button).enabled = true;
                }
                else {
                    cc.find("Background", this._block_button).opacity = 76.5;
                    this._block_button.getComponent(cc.Button).enabled = false;
                }
            }
        }

        //旁观玩家不能弹弹幕
        let isSeat = cv.GameDataManager.tRoomData.i32SelfSeat != -1;
        if (isSeat && !this._allin_panel.active) {
            this._at_button.getComponent(cc.Button).enabled = true;
            cc.find("Background", this._at_button).opacity = 255;
        }
        else {
            this._at_button.getComponent(cc.Button).enabled = false;
            cc.find("Background", this._at_button).opacity = 76.5;
        }
        //旁观玩家屏蔽
        //this._faceMoudle_panel.active = cv.GameDataManager.tRoomData.i32SelfSeat == -1;
        this._faceMoudle_panel.active = false;
        this._selfInfo_panel.active = (false);
        this._other_panel.active = (true);
        this._interaction_panel.active = true;
        this._live_buttton.active = false;

        let id: string = cv.StringTools.formatC("ID:%d", cv.dataHandler.getUserData().u32Uid);
        this.setNameAndID(this._roleName_text, cv.dataHandler.getUserData().nick_name, id);
    }
    setHouseOwer(isVisible: boolean) {
        this._houseOwer_Panel.active = (isVisible);
        if (isVisible) {
            this._houseOwer_Panel.setPosition(this.housePanel_pos.x, -710);
        }
        // else {
        //     this._houseOwer_Panel.setPosition(this.housePanel_pos);
        // }
    }
    //踢出玩家
    kickOutCallBack(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        console.log("kickOutCallBack");
        cv.gameNet.RequestForceStandup(cv.GameDataManager.tRoomData.u32RoomId, this.u32CurrentUid);
        this.node.active = (false);
        this._shade.active = false;
    }

    // //禁止入座
    noSeatCallBack(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        console.log("noTalkCallBack");
        cv.gameNet.RequestProhibitSitdown(cv.GameDataManager.tRoomData.u32RoomId, this.u32CurrentUid, !cv.GameDataManager.tRoomData.isProhibit_sitdown(this.u32CurrentUid));
    }
    // //身份验证
    authenticationCallBack(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        if (cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum < 8) return;

        cv.gameNet.RequestPhotoVerify(cv.GameDataManager.tRoomData.u32RoomId, this.u32CurrentUid);
    }
    //点击查看专业数据按钮逻辑
    // profretionCallBack(event: cc.Event) {
    // 	cv.AudioMgr.playButtonSound('button_click');
    //     console.log("profretionCallBack");
    //     if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
    //         return;
    //     }
    //     cv.MessageCenter.send("showgameshop");
    // }
    // //点击问号按钮逻辑
    // qustionCallBack(event: cc.Event) {
    // 	cv.AudioMgr.playButtonSound('button_click');
    //     console.log("qustionCallBack");
    // }

    updateProhibitButton(sender: any) {
        if (cv.GameDataManager.tRoomData.isProhibit_sitdown(this.u32CurrentUid)) {
            this._prohibit_sitdown_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("AllowSeat"));
        }
        else {
            this._prohibit_sitdown_button.getChildByName("Label").getComponent(cc.Label).string = (cv.config.getStringData("ProhibitSeat"));
        }

    }
    onIsHavePriviledge(a: boolean) {
        this._kickOut_button.active = (a);
        this._prohibit_sitdown_button.active = (a);

        this.setHouseOwer(a);
        //_setBring_Button.active = (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId);
        this._authentication_button.active = (cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId);

        if (a) {
            this._kickOut_button.setPosition(this._houseOwer_Panel.getContentSize().width * 0.3, this._kickOut_button.y);
            this._prohibit_sitdown_button.setPosition(this._houseOwer_Panel.getContentSize().width * 0.7, this._prohibit_sitdown_button.y);
            this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other + this.HouseBg_H);
            this._panelbg.setPosition(this._panelbg.getPosition().x, -75);
        }
        else {
            this._kickOut_button.setPosition(this.kickX, this._kickOut_button.y);
            this._prohibit_sitdown_button.setPosition(this.prohibitX, this._prohibit_sitdown_button.y);
            if (this.u32CurrentUid != cv.dataHandler.getUserData().u32Uid) {
                this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_other);
            }
            else {
                this._panelbg.setContentSize(this._panelbg.getContentSize().width, this.BG_H_self);
            }
        }

        cv.resMgr.adaptWidget(this._panelbg, true);
    }

    OnUpdate_remarks(sender: any) {
        let rdata: RemarkData = cv.dataHandler.getUserData().getRemarkData(this.u32CurrentUid);
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
        this._remark_button.setPosition(this._remark_text.getPosition().x + this._remark_text.getContentSize().width + 15, this._remark_button.getPosition().y);
    }

    setButtonListToShow(isShow: boolean) {
        let remark: RemarkData = cv.dataHandler.getUserData().getRemarkData(this.u32CurrentUid);
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

    showRootNode() {
        this.node.active = (true);
        this._shade.active = true;
        this.node.setScale(0.01);
        CircleSprite.cleanHeadNode(this._headNode);
        this.node.runAction(cc.sequence(cc.delayTime(0.05), cc.show(), cc.scaleTo(0.15, 1)));
    }

    GetAddress(kPos: any, kTag: string) {
        if (cv.GameDataManager.tRoomData.u32OwnerId != cv.dataHandler.getUserData().u32Uid) {
            this._local_text.getComponent(cc.Label).string = (cv.config.getStringData("ServerErrorCode87"));
            return;
        }

        if (kPos.f32Latitude == kPos.f32Longitude) {
            if (this._roleName_text.getComponent(cc.Label).string == kTag) {
                this._local_text.getComponent(cc.Label).string = (cv.config.getStringData("UIEmulatorText"));
                return;
            }
        }

        let acBuffer: string = "";
        let URL: string = "http://ditu.google.cn/maps/api/geocode/json?latlng=";
        acBuffer = cv.StringTools.formatC("%s%f,%f&language=zh_CN", URL, kPos.f32Latitude, kPos.f32Longitude);
        // let request = new XMLHttpRequest();
        // request.setUrl(acBuffer);
        // request.setRequestType(HttpRequest:: Type:: GET);
        // request.setResponseCallback(CC_CALLBACK_2(RoleInfo:: OnHttpTaskCompleted, this));
        // request.tag = (kTag.c_str());
        // HttpClient:: getInstance().setTimeoutForConnect(CONN_TIME_OUT);
        // HttpClient:: getInstance().setTimeoutForRead(READ_TIME_OUT);
        // HttpClient:: getInstance().send(request);
        // request.release();
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //responseType一定要在外面设置
                    // xhr.responseType = 'arraybuffer'; 
                    this.OnHttpTaskCompleted(xhr.response);
                }
            }
        }.bind(this);
        //responseType一定要在外面设置
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", acBuffer, true);
        xhr.send();
    }

    OnHttpTaskCompleted(response: any) {
        if (!response) {
            return;
        }

        console.log(response);
        JSON.parse(response);
    }

    private forbidChat(isForbid: boolean) {
        this.setForbidChat(isForbid);

        if (isForbid) {
            this._at_button.getComponent(cc.Button).enabled = false;
            cc.find("Background", this._at_button).opacity = 76.5;
        }
    }

    public setForbidChat(isForbid: boolean) {
        this._allin_panel.active = isForbid;
    }

    public setNameAndID(node: cc.Node, name: string, id: string) {
        let idlabel = (new cc.Node()).addComponent(cc.Label);
        idlabel.fontSize = node.getComponent(cc.Label).fontSize;
        let idwidth = cv.resMgr.getLabelStringSize(idlabel, id);
        node.setContentSize(cc.size(this.name_text_size.width - idwidth.width, this.name_text_size.height));
        node.setContentSize(this.name_text_size);
        let width = cv.StringTools.setShrinkString(node, name, true);

        node.setPosition(this._certification_sp.getPosition().x + 12, this._certification_sp.getPosition().y);
        this._gender_img.setPosition(node.getPosition().x + width + 12, node.getPosition().y);
        this._id_txt.getComponent(cc.Label).string = id;
    }

    public NotDisturb(msg: any) {
        this.DisturbOrNot(msg.operate, msg.whoId);
        if (msg.operate == 1) {
            let strTips = cv.config.getStringData("Star_block_tips");
            cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeInfo);
        }
        else if (msg.operate == 2) {
            let strTips = cv.config.getStringData("Star_block_cancel");
            cv.TT.showMsg(strTips, cv.Enum.ToastType.ToastTypeInfo);
        }

        if (this._enterType == 0) {
            let isNotDisturb = msg.operate == 1 ? true : false;
            if (isNotDisturb == true) {
                this._player.NotDisturbUids.push(cv.dataHandler.getUserData().u32Uid);
            }
            else {
                for (let i = 0; i < this._player.NotDisturbUids.length; i++) {
                    if (cv.dataHandler.getUserData().u32Uid == this._player.NotDisturbUids[i]) {
                        this._player.NotDisturbUids.splice(i, 1);
                        break;
                    }
                }
            }
            cv.GameDataManager.tRoomData.updateTablePlayer(msg.playerId, this._player);
        }
        else if (this._enterType == 1) {
            let isNotDisturb = msg.operate == 1 ? true : false;
            if (isNotDisturb == true) {
                this._obplayer.NotDisturbUids.push(cv.dataHandler.getUserData().u32Uid);
            }
            else {
                for (let i = 0; i < this._obplayer.NotDisturbUids.length; i++) {
                    if (cv.dataHandler.getUserData().u32Uid == this._obplayer.NotDisturbUids[i]) {
                        this._obplayer.NotDisturbUids.splice(i, 1);
                        break;
                    }
                }
            }
            cv.GameDataManager.tRoomData.obPlayer.data = this._obplayer;
        }
    }

    public DisturbOrNot(disturb: number, playerid: number) {
        let sp: cc.Sprite = cc.find("Background", this._block_button).getComponent(cc.Sprite);
        let lb: cc.Label = cc.find("Label", this._block_button).getComponent(cc.Label);

        if (disturb == 1) {
            lb.string = cv.config.getStringData("Star_unblock");
            this._block_img.active = true;
            this._avatar_block_node.active = true;
            cv.resMgr.setSpriteFrame(sp.node, "zh_CN/game/dzpoker/datacard/btn_block_off");
            this._disturb = 2;
        }
        else if (disturb == 2) {
            lb.string = cv.config.getStringData("Star_block");
            this._block_img.active = false;
            this._avatar_block_node.active = false;
            cv.resMgr.setSpriteFrame(sp.node, "zh_CN/game/dzpoker/datacard/btn_block_on");
            this._disturb = 1;
        }
        this.updataRecondButtonTouch();
    }

    public liveStatus(openLiveRsp: game_pb.OpenLiveRsp) {
        if (openLiveRsp.uid != cv.dataHandler.getUserData().u32Uid) {
            return;
        }
        this._player.liveStatus = openLiveRsp.liveStatus;
        cv.GameDataManager.tRoomData.updateTablePlayer(this._player.playerid, this._player);

        if (openLiveRsp.liveStatus == 1) {
            //直播中
            cv.TT.showMsg(cv.config.getStringData("Star_live_tips"), cv.Enum.ToastType.ToastTypeInfo);
            this._liveStatus = 2;
            cv.resMgr.setSpriteFrame(cc.find("Background", this._live_buttton), "zh_CN/game/dzpoker/datacard/btn_golive_off");
        }
        else if (openLiveRsp.liveStatus == 2 || openLiveRsp.liveStatus == 0) {
            cv.TT.showMsg(cv.config.getStringData("Star_live_cancel"), cv.Enum.ToastType.ToastTypeInfo);
            this._liveStatus = 1;
            cv.resMgr.setSpriteFrame(cc.find("Background", this._live_buttton), "zh_CN/game/dzpoker/datacard/btn_golive_on");
        }
    }
    private updataRecondButtonTouch() {
        if (this._disturb == 1 && !this.speakingVoice) {
            cc.find("Background", this._recond_button).opacity = 255;
            this._recond_button.getComponent(cc.Button).enabled = true;
        } else {
            cc.find("Background", this._recond_button).opacity = 76.5;
            this._recond_button.getComponent(cc.Button).enabled = false;
        }
    }

    public OnLike(likeRsp: game_pb.LikeResponse) {
        //刷新点赞数
        cv.resMgr.setSpriteFrame(cc.find("Background", this._like_button), "zh_CN/game/dzpoker/datacard/btn_like_disable");
        this._self_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", likeRsp.likedCount));
        this._other_like_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%d", likeRsp.likedCount));

        this._like_button.getComponent(cc.Button).enabled = false;
        this._like_label = cv.resMgr.createLabel(this._like_button, "+1", 42, cv.resMgr.getLocalFontByName("arial"));
        this._like_label.active = true;
        this._like_label.runAction(cc.sequence(cc.show(), cc.moveTo(0.9, new cc.Vec2(0, 72)), cc.destroySelf()));
    }

    public onGetUserMarks(msg: any) {
        if (msg) {
            if (msg.targetId != this.u32CurrentUid) return;
            if (msg.marks.length > 0) {
                this._signature_text.getComponent(cc.Label).string = msg.marks;
                this._signature_text.color = new cc.Color().fromHEX("#FFFFFF");
                this._signature_text.opacity = 255;
            }
            else {
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
            else {
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
            else {
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

    public onEditReturn() {
        cc.log("return return return");
    }

    public onEditDidEnded() {
        cc.log("ended ended ended");
    }

    private _onMicSwitch(): void {
        cv.AudioMgr.playButtonSound('button_click');
        let player: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);  //只针对明星个人
        if (player) {
            //0.按键 1.开放麦
            let mikMode: number = player.mikeMode == 1 ? 0 : 1;
            cv.gameNet.requestMikeModeReq(mikMode);
        }
    }
    onMikeMode(msg: any): void {
        let player: PlayerInfo = cv.GameDataManager.tRoomData.GetTablePlayer(cv.dataHandler.getUserData().u32Uid);
        if (player) {
            this._setMicBtn(player.mikeMode);
        }
    }
    private _setMicBtn(mode: number) {
        if (mode == 1) {
            cv.resMgr.setSpriteFrame(this.btnSwitch.node, "zh_CN/game/dzpoker/datacard/btn_on");
        } else {
            cv.resMgr.setSpriteFrame(this.btnSwitch.node, "zh_CN/game/dzpoker/datacard/btn_off");
        }
    }

    adaptSelfWidget() {
        this._gender_img.getComponent(cc.Widget).top = 85;
        this._certification_sp.getComponent(cc.Widget).top = 84;
        this._roleName_text.getComponent(cc.Widget).top = 78;
        this._signature_panel.getComponent(cc.Widget).top = 211;
        this._id_panel.getComponent(cc.Widget).top = 152;
        this._headPanel.getComponent(cc.Widget).top = 60;
        this._headPanel.getComponent(cc.Widget).left = 63;
        this._avatar_block_node.getComponent(cc.Widget).top = 60;
        this._avatar_block_node.getComponent(cc.Widget).left = 63;

        this._countdown_bg.getComponent(cc.Widget).top = 268;
        this._countdown_sp.getComponent(cc.Widget).top = 276;
        this._countdown_text.getComponent(cc.Widget).top = 275.6;

        cv.resMgr.adaptWidget(this._gender_img);
        cv.resMgr.adaptWidget(this._certification_sp);
        cv.resMgr.adaptWidget(this._roleName_text);
        cv.resMgr.adaptWidget(this._signature_panel);
        cv.resMgr.adaptWidget(this._headPanel);
        cv.resMgr.adaptWidget(this._avatar_block_node);

        cv.resMgr.adaptWidget(this._countdown_bg);
        cv.resMgr.adaptWidget(this._countdown_sp);
        cv.resMgr.adaptWidget(this._countdown_text);
    }

    adaptOtherStarWidget() {
        this._gender_img.getComponent(cc.Widget).top = 121;
        this._certification_sp.getComponent(cc.Widget).top = 122;
        this._roleName_text.getComponent(cc.Widget).top = 112;
        this._signature_panel.getComponent(cc.Widget).top = 184;

        this._headPanel.getComponent(cc.Widget).top = 64;
        this._headPanel.getComponent(cc.Widget).left = 63;

        this._avatar_block_node.getComponent(cc.Widget).top = 64;
        this._avatar_block_node.getComponent(cc.Widget).left = 63;

        cv.resMgr.adaptWidget(this._gender_img);
        cv.resMgr.adaptWidget(this._certification_sp);
        cv.resMgr.adaptWidget(this._roleName_text);
        cv.resMgr.adaptWidget(this._signature_panel);

        cv.resMgr.adaptWidget(this._headPanel);
        cv.resMgr.adaptWidget(this._avatar_block_node);
    }

    adaptSelfStarWidget() {
        this._gender_img.getComponent(cc.Widget).top = 122;
        this._certification_sp.getComponent(cc.Widget).top = 123;
        this._roleName_text.getComponent(cc.Widget).top = 113;
        this._signature_panel.getComponent(cc.Widget).top = 178;
        this._headPanel.getComponent(cc.Widget).top = 60;
        this._headPanel.getComponent(cc.Widget).left = 76;
        this._avatar_block_node.getComponent(cc.Widget).top = 60;
        this._avatar_block_node.getComponent(cc.Widget).left = 76;

        if (this._enterType == 1) {
            //跳过
        }
        else {
            this._countdown_bg.getComponent(cc.Widget).top = 282 + 15;
            this._countdown_sp.getComponent(cc.Widget).top = 292 + 15;
            this._countdown_text.getComponent(cc.Widget).top = 291 + 15;
        }

        cv.resMgr.adaptWidget(this._gender_img);
        cv.resMgr.adaptWidget(this._certification_sp);
        cv.resMgr.adaptWidget(this._roleName_text);
        cv.resMgr.adaptWidget(this._signature_panel);
        cv.resMgr.adaptWidget(this._headPanel);
        cv.resMgr.adaptWidget(this._avatar_block_node);

        cv.resMgr.adaptWidget(this._countdown_bg);
        cv.resMgr.adaptWidget(this._countdown_sp);
        cv.resMgr.adaptWidget(this._countdown_text);
    }

    adaptOtherWidget() {
        this._gender_img.getComponent(cc.Widget).top = 101;
        this._certification_sp.getComponent(cc.Widget).top = 100;
        this._roleName_text.getComponent(cc.Widget).top = 94;
        this._signature_panel.getComponent(cc.Widget).top = 166;
        this._remark_text.getComponent(cc.Widget).top = 219;
        this._remarkbtn_panel.getComponent(cc.Widget).top = 207.8;
        this._remark_button.getComponent(cc.Widget).top = 213;

        this._countdown_bg.getComponent(cc.Widget).top = 276;
        this._countdown_sp.getComponent(cc.Widget).top = 285;
        this._countdown_text.getComponent(cc.Widget).top = 284;

        cv.resMgr.adaptWidget(this._gender_img);
        cv.resMgr.adaptWidget(this._certification_sp);
        cv.resMgr.adaptWidget(this._roleName_text);
        cv.resMgr.adaptWidget(this._signature_panel);
        cv.resMgr.adaptWidget(this._remark_text);
        cv.resMgr.adaptWidget(this._remarkbtn_panel);
        cv.resMgr.adaptWidget(this._remark_button);

        cv.resMgr.adaptWidget(this._countdown_bg);
        cv.resMgr.adaptWidget(this._countdown_sp);
        cv.resMgr.adaptWidget(this._countdown_text);
    }
}