import cv from "../cv";
import criticism from "./CriticismTips"
import { CircleSprite, Head_Mode } from "./../../../common/tools/CircleSprite";
import CriticismTips from "./CriticismTips";
import JackfruitRule from "./../../../components/game/jackfruit/JackfruitRule";
import ws_protocol = require("../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
import { RemarkData } from "../../../data/userData";
import starDetails from "./starDetail";
import { dataItem } from "../../game/dzPoker/GameJackpotItem";
const { ccclass, property } = cc._decorator;
@ccclass
export default class FindItemStar extends cc.Component {

    msg: world_pb.ClubGameSnapshot = null;
    needPassword: boolean = false;
    @property(cc.Prefab) starDetail_prefab: cc.Prefab = null;
    headNodeX:number = 647;

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        let headNode = cc.find("starInfo/starHead2", this.node);
        this.headNodeX = headNode.x;
        cv.MessageCenter.register("onCheckStarRoomResponse", this.onCheckStatus.bind(this), this.node);
        

    }
    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("onCheckStarRoomResponse", this.node);
    }
    
    initLanguage() {
        if (!this.msg) return;
        this.updateView();
    }

    updateItemData(data:any): void {
       
        cc.find("bg_image", this.node).opacity = 255;
        this.msg = data;
        this.initLanguage();
    }

  
    updateView() {
        let isZoom: boolean = cv.roomManager.checkGameIsZoom(this.msg.game_id);

        //room_name就是明星桌提示
        let room_name = cc.find("roomStatus/room_name", this.node).getComponent(cc.Label);

        let _roomName = this.msg.room_name;

        var roomArray = _roomName.split('#');
        if(cv.Enum.LANGUAGE_TYPE.zh_CN ==  cv.config.getCurrentLanguage()){ //中文
            room_name.string = roomArray[0];
        }else if(cv.Enum.LANGUAGE_TYPE.en_US == cv.config.getCurrentLanguage()){ //英文
            room_name.string = roomArray[1];
        }else if(cv.Enum.LANGUAGE_TYPE.yn_TH == cv.config.getCurrentLanguage()){  //越南文
            room_name.string = roomArray[2];
        }else{//其它默认英文
            room_name.string = roomArray[1];
        }
 
        cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_starTable"));

        let mangZhu_text = cc.find("manzhu/mangZhu_text", this.node);

        let memberNum_text = cc.find("member_img/memberNum_text", this.node).getComponent(cc.Label);
        if (isZoom) {
            memberNum_text.string = this.msg.player_count.toString();
            cv.resMgr.getLabelStringSize(memberNum_text, memberNum_text.string);//这里设置一下，以获得当前帧文本的真实宽高
        }
        else {
            cc.find("member_img/memberNum_text", this.node).getComponent(cc.Label).string = this.msg.player_count + "/" + this.msg.player_count_max;
        }

        let mangZhu: string = "";
        let cbMininumAmount: number = parseFloat(cv.StringTools.numToFloatString(this.msg.buyin_min));

        if (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            mangZhu = "(%d)";
            let cbBigBlind: number = parseFloat(cv.StringTools.numToFloatString(this.msg.big_blind));
            let cbSmallBlind: number = parseFloat(cv.StringTools.numToFloatString(this.msg.small_blind));
            let cbBuyinMin: number = parseFloat(cv.StringTools.numToFloatString(this.msg.buyin_min));
            let cbStraddle = cbBigBlind * (2.0);

            let bigBlind: string = cbBigBlind >= 1000 ? cv.StringTools.formatC("%sK", (cbBigBlind / 1000.0).toString()) : cbBigBlind.toString();
            let smallBlind: string = cbSmallBlind >= 1000 ? cv.StringTools.formatC("%sK", (cbSmallBlind / 1000.0).toString()) : cbSmallBlind.toString();
            mangZhu_text.getComponent(cc.Label).string = (cv.StringTools.formatC("%s/%s", smallBlind.toString(), bigBlind.toString()));
            if (this.msg.straddle) {
                mangZhu_text.getComponent(cc.Label).string = mangZhu_text.getComponent(cc.Label).string + "/" + (cbStraddle >= 1000 ? cv.StringTools.formatC("%sK", (cbStraddle / 1000.0).toString()) : cbStraddle.toString());
            }

            if (this.msg.game_id == cv.Enum.GameId.Allin) {
                //cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), "zh_CN/hall/lobby/common_aof");
            }
            else if (this.msg.game_id == cv.Enum.GameId.Bet) {
                let buyinMin: string = cbBuyinMin >= 1000 ? cv.StringTools.formatC("%sK", (cbBuyinMin / 1000.0).toString()) : cbBuyinMin.toString();
                mangZhu_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("FindItem_bet_mangZhu_text"), buyinMin);

            } else if (this.msg.game_id == cv.Enum.GameId.Jackfruit) {
                let img = cc.find("jackfruit_node/minimum_img", this.node);
                let label = cc.find("jackfruit_node/minimum_label", this.node)
                label.getComponent(cc.Label).string = cbMininumAmount >= 1000 ? cv.StringTools.formatC("%sK", (cbMininumAmount / 1000.0).toString()) : cbMininumAmount.toString();
                let size = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label));
                let pos = label.getPosition();
                img.setPosition(cc.v2(pos.x - size.width - 24, img.getPosition().y));
      
            }
       
        }
        else if (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            mangZhu = "%d";
            mangZhu_text.getComponent(cc.Label).string = ("");
            if (this.msg.game_id == cv.Enum.GameId.Allin) {
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_aofshort"));
            } else if (this.msg.game_id == cv.Enum.GameId.Jackfruit) {
                let img = cc.find("jackfruit_node/minimum_img", this.node);
                let label = cc.find("jackfruit_node/minimum_label", this.node)
                label.getComponent(cc.Label).string = cbMininumAmount >= 1000 ? cv.StringTools.formatC("%sK", (cbMininumAmount / 1000.0).toString()) : cbMininumAmount.toString();
                let size = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label));
                let pos = label.getPosition();
                img.setPosition(cc.v2(pos.x - size.width - 24, img.getPosition().y));
            }
        }

        if (this.msg.ante && this.msg.game_id != cv.Enum.GameId.Bet) {

            if (mangZhu_text.getComponent(cc.Label).string != "") {
                mangZhu_text.getComponent(cc.Label).string += ("(" + cv.StringTools.numberToString(this.msg.ante * 0.01) + ")");
            }
            else {
                mangZhu_text.getComponent(cc.Label).string += cv.StringTools.numberToString(this.msg.ante * 0.01);
            }
        }
      
        let member_img = cc.find("member_img", this.node);
        let begin_x = mangZhu_text.parent.getPosition().x;  //mangZhu_text.getPosition().x
        member_img.setPosition(cc.v2(begin_x + cv.resMgr.getLabelStringSize(mangZhu_text.getComponent(cc.Label)).width + 40, member_img.getPosition().y));

      
        //观战人数
        let viewsNumber = cc.find("number", this.node).getComponent(cc.Label);
        viewsNumber.string =  this.msg.bystanderNum.toString();
        let viewsPerson = cc.find("viewsPerson", this.node);
        viewsPerson.setPosition(cc.v2(viewsNumber.node.x - cv.resMgr.getLabelStringSize(viewsNumber.getComponent(cc.Label)).width - 5, viewsPerson.getPosition().y));

        let starInfo = cc.find("starInfo", this.node);
        let starData = this.msg.starData; //明星数据
        let len =  starData.length > 2? 2: starData.length;

        this.resetStarItem();

        let _StarOnline = false; //是否还有明星在线

       
        for(let i = 0; i < len; i++){

            let headNode = cc.find(cv.StringTools.formatC("starHead%d", i+1), starInfo);
            let nameNode = cc.find(cv.StringTools.formatC("starName%d", i+1), starInfo);

            headNode.active = true;

            let starHead = headNode.getChildByName("starHead");  //头像 
            let starName =  nameNode.getChildByName("starName");  //名称

            let CelebrityFX =  headNode.getChildByName("CelebrityFX");  //头像动画
            let avatar = starData[i].thumb;
            if(avatar){
                CircleSprite.setCircleSprite(starHead, avatar, 0, false);
            }

            //判断第二个头像的位置, 最少与第一个明星信息间距40个像素
            if(i == 1){
                headNode.x = this.headNodeX;  //防止item是clone的，使用上个item的x坐标
                let headBeginX = headNode.x - headNode.getContentSize().width/2 //第二个头像初始化位置
                let starName1 = cc.find("starName1", starInfo);
                let name1EndX = starName1.x  + starName1.getContentSize().width;
                if(headBeginX < name1EndX + 40){   //第二个头像，与第一个明星间隔小于40个像素
                    headNode.x = name1EndX + headNode.getContentSize().width/2 + 40;
                }
            }else{
                cv.resMgr.adaptWidget(headNode, true);
            }

            if(starData[i].nickname.length > 0){
                nameNode.active = true;
                let nameLabel = starName.getComponent(cc.Label);
                nameLabel.string =  starData[i].nickname;
                let labelW = cv.resMgr.getLabelStringSize(nameLabel).width;
                nameNode.width = labelW + 40;
                starName.x = nameNode.width/2;
                nameNode.x = headNode.getPosition().x + headNode.getContentSize().width/2  - 10;
                cv.resMgr.adaptWidget(nameNode, true);
            }else{
                nameNode.active = false;
            }
            
            let status = starData[i].status;  //0.未开播  1. 在线 2.已下播
            if(status != 2){  //有明星桌未开播，明星在线，Live icon状态设置为true
                _StarOnline = true;
            }

            let txtStatus =  headNode.getChildByName("txtStatus"); 
            txtStatus.getComponent(cc.Label).string = cv.config.getStringData("Star_live_offline");
            let maskStatus = headNode.getChildByName("maskDark");  

            txtStatus.active = false;
            maskStatus.active = false;
            CelebrityFX.active = true;  

            if(cv.config.getCurrentLanguage() ==  cv.Enum.LANGUAGE_TYPE.zh_CN){
                txtStatus.getComponent(cc.Label).fontSize = 36;
            }else{
                txtStatus.getComponent(cc.Label).fontSize = 26;
            }
        }

        let live_icon = cc.find("roomStatus/live_icon", this.node);
        if(!_StarOnline){  //该桌子明星已经下播，房间名称前面的live标识消失
            live_icon.active = false;
            room_name.node.setPosition(cc.v2(live_icon.x - live_icon.getContentSize().width/2, room_name.node.y));
        }else{
            room_name.node.setPosition(cc.v2(live_icon.x + live_icon.getContentSize().width/2 + 11, room_name.node.y));
            live_icon.active = true;
        }
    }


    onCheckStatus(data:any){

        let _error = data.error; //error等于1得时候表示正常进入明星座
        let _roomId= data.roomId;
        let _notifyTime = data.notifyTime; //开启时间 
        if(_roomId !=  this.msg.room_id){
            //不是当前房间的消息
            console.log("onCheckStatus  star roomID is error _roomId=" + _roomId);
            return;
        }

        if(_error != 1){
            if(_error == 255){  // 255表示提示状态是xx:xx时间准时开启
                let dateTime = new Date(_notifyTime*1000); //服务器返回的时间戳单位是秒，此处要x1000
                let tips = cv.StringTools.formatC("%02d:%02d%s", dateTime.getHours(), dateTime.getMinutes(), cv.config.getStringData("ServerErrorCode255"));
                cv.TT.showMsg(tips, cv.Enum.ToastType.ToastTypeInfo);
            }else if(_error == 256){  //房间已解散
                cv.TT.showMsg(cv.config.getStringData("ServerErrorCode256"), cv.Enum.ToastType.ToastTypeInfo);
            }
            return;
        }

        if (cv.dataHandler.getUserData().isban) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }
        if (!this.msg.anti_simulator && cv.native.showSimulatorTips(this.msg.anti_simulator_ignore_cond, true)) {
            return;
        }
        cc.find("bg_image", this.node).opacity = 170;

        
        let isneedPassword = this.msg.join_password.length > 0;
        let str = cv.tools.GetStringByCCFile("hideJackfruitRule");
        let isOpen = str == "" || str == null;
        if (this.msg.game_id == cv.Enum.GameId.Jackfruit && isOpen) {

        } else {
            cv.GameDataManager.tRoomData.entry_clubid = this.msg.club_id;
            cv.GameDataManager.tRoomData.u32GameID = this.msg.game_id;
            this.needPassword = isneedPassword;
            cv.roomManager.RequestJoinRoom(this.msg.game_id, this.msg.room_id, false, isneedPassword);
        }
    }

    onBtnItemClick(event: cc.Component.EventHandler) {
        cv.reCaptcha.checkRecaptcha(this.joinRoom.bind(this));
    }

    joinRoom(captchaPassed: boolean) {
        // did not pass captcha test
        if (captchaPassed == false) {
            return;
        }

        //进入明星桌之前，先检测当前明星桌是否开放
        cv.worldNet.CheckStarRoomRequest(this.msg.room_id);
    }

    //清空头像线性
    resetStarItem(){
        let starInfo = cc.find("starInfo", this.node);   
        for(let i = 0; i < 2; i++){

            let headNode = cc.find(cv.StringTools.formatC("starHead%d", i+1), starInfo);
            let nameNode = cc.find(cv.StringTools.formatC("starName%d", i+1), starInfo);
            headNode.active = false;
            nameNode.active =false;

            let starHead = headNode.getChildByName("starHead");  //头像 
            CircleSprite.cleanHeadNode(starHead);
            
            let CelebrityFX =  headNode.getChildByName("CelebrityFX");  //头像动画
            CelebrityFX.active = false;
        }
    }

    //点击明星头像
    onBtnClickStarHead1(event: cc.Component.EventHandler){
    
       let starData =  this.msg.starData;
       let star_uids: number[] = [];
       if(starData && starData.length > 0){
           //所有明星的UID都需要发给服务器，点击哪个明星，哪个明星排在前面
            if(starData[0] && starData[0].uid){
                star_uids.push(starData[0].uid);
            }
            if(starData[1] && starData[1].uid){
                star_uids.push(starData[1].uid);
            }

            cv.worldNet.StarDetailInfoRequest(star_uids);
            let _starDetail = starDetails.getSinglePrefabInst(this.starDetail_prefab).getComponent(starDetails);
            _starDetail.setData(this.onBtnItemClick.bind(this), 1);
       }
    }

    //点击明星头像
    onBtnClickStarHead2(event: cc.Component.EventHandler){
        let starData =  this.msg.starData;
        let star_uids: number[] = [];
        if(starData && starData.length > 0){
            //所有明星的UID都需要发给服务器，点击哪个明星，哪个明星排在前面
            if(starData[1] && starData[1].uid){
                star_uids.push(starData[1].uid);
            }else{
                //第二个明星头像为空
                return;
            }
            if(starData[0] && starData[0].uid){
                star_uids.push(starData[0].uid);
            }
            
            let _starDetail = starDetails.getSinglePrefabInst(this.starDetail_prefab).getComponent(starDetails);
            _starDetail.setData(this.onBtnItemClick.bind(this), 2);
            cv.worldNet.StarDetailInfoRequest(star_uids);
        }
    }
}
