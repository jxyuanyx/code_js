import cv from "./../../../components/lobby/cv"
import { CircleSprite,Head_Mode} from "../../tools/CircleSprite";
import MttDetailInfoItem from "./MttDetailInfoItem";
import ListView from "../../../../Script/common/tools/ListView";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PokerInfo_mtt extends cc.Component {

    @property(cc.Prefab)
    pokerInfoItem: cc.Prefab = null;
    msg: any = null;
    // LIFE-CYCLE CALLBACKS:
    backBtnClickFunc: Function = null;
    itemList: Array<cc.Node> = [];
    scrolllHeigt:number = 958;
    @property(cc.ScrollView) scrollview: cc.ScrollView = null;

    onLoad () {

       
       this.registerMsg();
       this.initLanguage();

    }

    start () {

    }

    onDestroy(): void {

        cv.MessageCenter.unregister("responseMTTDataDetailSuccess", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    registerMsg() {
        cv.MessageCenter.register("responseMTTDataDetailSuccess", this.responseMTTDataSuccess.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    initLanguage() {     
        cv.StringTools.setLabelString(this.node, "matchTime/title", "DataView_data_panel_dataInfo_panel_MTT_matchTime_txt");  //比赛时间
        cv.StringTools.setLabelString(this.node, "matchPerson/title", "DataView_data_panel_dataInfo_panel_MTT_matchTotal_txt"); //总人数
        cv.StringTools.setLabelString(this.node, "matchChip/title", "DataView_data_panel_dataInfo_panel_MTT_matchBeginChip_txt"); //起始筹码
        cv.StringTools.setLabelString(this.node, "matchAddTime/title", "DataView_data_panel_dataInfo_panel_MTT_matchAddBB_txt");  //涨盲时间
   
        cv.StringTools.setLabelString(this.node, "titleRank", "DataView_data_panel_dataInfo_panel_MTT_matchRank_txt");  //名次
        cv.StringTools.setLabelString(this.node, "titleNickname", "DataView_data_panel_dataInfo_panel_MTT_nickName_txt");  //昵称
        cv.StringTools.setLabelString(this.node, "titleReward", "DataView_data_panel_dataInfo_panel_MTT_matchReward_txt");  //奖励

        cv.StringTools.setLabelString(this.node, "title_text", "DataView_data_panel_dataInfo_panel_MTT_matchDetail_txt");  //奖励

        
    }

    responseMTTDataSuccess(value) {
        this.initData(value);
    }

    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('back_button');
        cv.MessageCenter.send("show_mail_entrance");
        if (this.backBtnClickFunc) {
            this.backBtnClickFunc();
            return;
        }
        console.log("====> back: " + this.node.getAnchorPoint() + ", " + this.node.getPosition())
        cv.action.moveToAction(this.node, "TO_RIGHT", "OUT", "FAST",
            new cc.Vec2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5), new cc.Vec2(cv.config.WIDTH * 1.5, cv.config.HEIGHT * 0.5));
    }

    public bindcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) { //输赢列表Item
            node.getComponent(MttDetailInfoItem).setData(info.data.playerInfo, i, info.data.display_currency);
        }
    }

    public getItemType(data, index) {
        return data.type;
    }

    initData(msg: any) {

        if(this.node.activeInHierarchy){
            console.log("current MttDetaiINfo is activeInHierarchy");
            return;
        }

        this.node.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_2;
        cv.action.moveToAction(this.node, "TO_LEFT", "ENTER", cv.Enum.action_FuncType.dt_NORMAL,
            new cc.Vec2(cv.config.WIDTH * 1.5, cv.config.HEIGHT * 0.5), new cc.Vec2(cv.config.WIDTH * 0.5, cv.config.HEIGHT * 0.5));
        
        this.msg = JSON.parse(msg);
        let Panel_1 = cc.find("scorellview/content/Panel_1", this.node);
        let contentNode =  cc.find("scorellview/content", this.node);
        let data = this.msg.gameResultDetail;
        cv.StringTools.cleanNodeArray(this.itemList);
        
        //我的昵称
        cc.find("myName", this.node).getComponent(cc.Label).string = cv.dataHandler.getUserData().nick_name;
        //我的头像
        let headIcon = cc.find("headIcon", this.node);   
        (CircleSprite).setCircleSprite(headIcon, cv.dataHandler.getUserData().headUrl);

        //我的名次
        let rankStr = cv.StringTools.formatC(cv.config.getStringData("DataView_data_panel_dataInfo_panel_MTT_Rank_txt"), data.myRank);
        cc.find("rankbg/rank", this.node).getComponent(cc.Label).string = rankStr;
        //比赛时长
        let hour = data.gameTimeSec/3600;
        let timeStr = "";
        if(hour >= 1){
            timeStr = hour.toFixed(2) + "h";
        }else{
            timeStr =  Math.floor(data.gameTimeSec/60) + "min";
        }
        cc.find("matchTime/content", this.node).getComponent(cc.Label).string = timeStr;
        //比赛人数
        cc.find("matchPerson/content", this.node).getComponent(cc.Label).string = data.numPlayers;
        //起始筹码
        cc.find("matchChip/content", this.node).getComponent(cc.Label).string = data.startingCoins;
        //比赛升盲时间
        cc.find("matchAddTime/content", this.node).getComponent(cc.Label).string = data.levelTime/60 + "min";

        let playerResults = data.playerResults; //比赛列表
        let dataList = [];
        this.itemList = [];
        if(playerResults){
            if(playerResults.length > 1){  //按名次排序
                playerResults.sort((a: any, b: any): number => { return a.rank - b.rank; });
            }    
            for (let i = 0; i < playerResults.length; i++) {
                dataList.push({ type: 0, data: {playerInfo: playerResults[i], display_currency: data.display_currency}});
            }
        }

    
        this.scrollview.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this.scrollview.getComponent(ListView).notifyDataSetChanged(dataList);
    }
}
