import cv from "../cv";
import criticism from "./CriticismTips"
import { CircleSprite, Head_Mode } from "./../../../common/tools/CircleSprite";
import CriticismTips from "./CriticismTips";
import JackfruitRule from "./../../../components/game/jackfruit/JackfruitRule";
import ws_protocol = require("../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
import { RemarkData } from "../../../data/userData";
const { ccclass, property } = cc._decorator;
@ccclass
export default class FindItem extends cc.Component {

    msg: world_pb.ClubGameSnapshot = null;
    name_text: cc.Label = null;
    needPassword: boolean = false;
    typename: string = "";
    @property(cc.Prefab) criticism_prefab: cc.Prefab = null;
    @property(cc.Prefab) jackfruit_rule_prefab: cc.Prefab = null;

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    start(){
        
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    initLanguage() {

 

        if (!this.msg) return;
        let date: Date = new Date();
        let curTime: number = cv.StringTools.toFixed(date.getTime() / 1000.0, 0);
        let hasPlayTime: number = 0;
        if (this.msg.start_time != 0) {
            hasPlayTime = (curTime - this.msg.start_time) / 3600.0;
        }
        this.name_text = cc.find("name_text", this.node).getComponent(cc.Label);

        if (this.msg.manual_created) {
            this.typename = this.msg.room_name;
        }
        else {
            this.typename = cv.tools.displayChineseName(this.msg.room_name);
        }

        let isZoom: boolean = cv.roomManager.checkGameIsZoom(this.msg.game_id);
        let timeLimit: number = cv.config.timeArr[this.msg.rule_time_limit - 1];
        let yanshiTime: number = cv.StringTools.toFixed(this.msg.extra_time / 3600.0, 1);
        let lastTimes = timeLimit - hasPlayTime + yanshiTime;

        let time_text = cc.find("time_text", this.node).getComponent(cc.Label);
        let time_img = cc.find("time_img", this.node);
        time_text.string = "";
        time_img.active = false;

        if (!isZoom && this.msg.game_id != cv.Enum.GameId.Allin && this.msg.game_id != cv.Enum.GameId.Bet && this.msg.game_id != cv.Enum.GameId.Jackfruit) {//
            //短牌不再显示时间
            let isShort = (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
            if (this.msg.is_mirco == 1
                || this.msg.IscalcIncomePerhand
                || isShort) {
                time_text.string = "";
            }
            else if (lastTimes < 0) {
                time_text.string = cv.config.getStringData("UIfindlistview");
            }
            else if (lastTimes < 1.0 && (timeLimit + yanshiTime) < 1.0) {
                time_text.string =
                    cv.StringTools.formatC(cv.config.getStringData("UITitle128"), lastTimes * 60, (cv.config.timeArr[this.msg.rule_time_limit - 1] + yanshiTime) * 60);
            }
            else if (lastTimes < 1.0 && (timeLimit + yanshiTime) >= 1.0) {
                time_text.string =
                    cv.StringTools.formatC(cv.config.getStringData("UITitle127"), lastTimes * 60, cv.config.timeArr[this.msg.rule_time_limit - 1] + yanshiTime);
            }
            else {
                time_text.string =
                    cv.StringTools.formatC(cv.config.getStringData("UITitle126"), lastTimes, cv.config.timeArr[this.msg.rule_time_limit - 1] + yanshiTime);
            }
        }

        time_text.node.active = time_text.string != "";
        time_img.active = time_text.node.active;
        if (time_img.active) {
            cv.resMgr.getLabelStringSize(time_text, time_text.string);//这里设置一下，以获得当前帧文本的真实宽高
            time_img.x = time_text.node.x - time_text.node.getContentSize().width - 5;
        }
        let status = this.msg.game_status;//此字段已没用(对客户端来说，已不需要显示牌局状态)

        let name: string = "";
        let zoom_table_img = cc.find("zoom_table_img", this.node);
        let zoom_table_people_num_text = cc.find("zoom_table_img/zoom_table_people_num_text", this.node).getComponent(cc.Label);
        zoom_table_people_num_text.node.active = isZoom || this.msg.game_id == world_pb.GameId.PLO;
        zoom_table_img.active = isZoom || this.msg.game_id == world_pb.GameId.PLO;
        let bg_img = cc.find("bg_img", this.node);
        let num_text: cc.Label = cc.find("bg_img/splash_num_text", this.node).getComponent(cc.Label);
        let word_text: cc.Label = cc.find("bg_img/splash_word_text", this.node).getComponent(cc.Label);
        num_text.node.active = false;
        word_text.node.active = false;
        if (isZoom || this.msg.game_id == world_pb.GameId.PLO) {
            if (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
                name = "DataView_data_panel_dataInfo_panel_zoomShortGame_button";
            } else {
                name = "DataView_data_panel_dataInfo_panel_zoomGame_button";
            }

            zoom_table_people_num_text.string = this.msg.player_count_max.toString();
        }
        else if (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
            if (this.msg.game_id == cv.Enum.GameId.Allin) {
                name = "DataView_data_panel_dataInfo_panel_aofGame_button";
            }
            else if (this.msg.game_id == cv.Enum.GameId.Bet) {
                let cbAnte: number = cv.StringTools.serverGoldToShowNumber(this.msg.ante);
                let anteStr: string = cbAnte >= 1000 ? cv.StringTools.formatC("%sK", (cbAnte / 1000.0).toString()) : cbAnte.toString();
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    num_text.string = anteStr.toString();
                    word_text.string = cv.config.getStringData("FindItem_bet_text");
                    cv.resMgr.getLabelStringSize(num_text, anteStr.toString());//这里设置一下，以获得当前帧文本的真实宽高
                    cv.resMgr.getLabelStringSize(word_text, cv.config.getStringData("FindItem_bet_text"));
                    num_text.node.active = true;
                    word_text.node.active = true;
                    let height = num_text.node.getContentSize().width + word_text.node.getContentSize().height;
                    num_text.node.y = bg_img.height / 2 + word_text.node.getContentSize().height / 2;
                    word_text.node.y = bg_img.height / 2 - num_text.node.getContentSize().width / 2;
                } else {
                    num_text.string = cv.StringTools.formatC(cv.config.getStringData("FindItem_bet_text"), anteStr);
                    num_text.node.active = true;
                    num_text.node.y = bg_img.height / 2;
                    word_text.node.active = false;
                }
                this.updateView();
                return;
            }
            else {
                name = "DataView_data_panel_dataInfo_panel_normalGame_button";
                //爆击德州
                // if(this.msg.isCriticismField == true){
                //     name = "DataView_data_panel_dataInfo_panel_BaoJi_button";
                // }
            }
        }
        else if (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
            if (this.msg.game_id == cv.Enum.GameId.Allin) {
                name = "DataView_data_panel_dataInfo_panel_aofGameShort_button";
            }
            else {
                name = "DataView_data_panel_dataInfo_panel_short_button";
            }

            //爆击短牌
            // if(this.msg.isCriticismField == true){
            //     name = "DataView_data_panel_dataInfo_panel_BaoJi_Short";
            // }
        }

        cc.find("bg_img/splash_word_text", this.node).getComponent(cc.Label).string = cv.config.getStringData(name);
        this.updateView();
    }

    updateSVReuseData(index: number, dataArray: Array<any>): void {
        //console.log("updateSVReuseData - " + index);
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;

        //let alpha: number = index % 2 == 0 ? 170 : 255;
        cc.find("bg_image", this.node).opacity = 255;

        this.msg = dataArray[index];

        this.initLanguage();
    }

    updateItemData(data:any): void {
       

        //let alpha: number = index % 2 == 0 ? 170 : 255;
        cc.find("bg_image", this.node).opacity = 255;

        this.msg = data;

        this.initLanguage();
    }

    updatecommunityImg() {
        let name_text = cc.find("name_text", this.node).getComponent(cc.Label);
        cv.resMgr.getLabelStringSize(name_text, name_text.string);
        let image_suo = cc.find("image_suo", this.node);
        let community_img = cc.find("community_img", this.node);
        if (image_suo.active) {
            community_img.setPosition(cc.v2(image_suo.x + 20 + community_img.width / 2, image_suo.y));
        } else {
            console.log("community_img.widht::::" + community_img.width);
            console.log("name_text.node.x" + name_text.node.x + "name_text.node.width" + name_text.node.width);
            community_img.setPosition(cc.v2(name_text.node.x + name_text.node.width + community_img.width * 0.5 + 20, name_text.node.y));
        }
    }
    updateView() {
        let isZoom: boolean = cv.roomManager.checkGameIsZoom(this.msg.game_id);

        this.name_text = cc.find("name_text", this.node).getComponent(cc.Label);
        let mangZhu_text = cc.find("Image_4_1/mangZhu_text", this.node);

        if (this.msg.manual_created) {
            this.typename = this.msg.room_name;
        }
        else {
            this.typename = cv.tools.displayChineseName(this.msg.room_name);
        }

        let memberNum_text = cc.find("member_img/memberNum_text", this.node).getComponent(cc.Label);
        if (isZoom || this.msg.game_id == world_pb.GameId.PLO) {
            memberNum_text.string = this.msg.player_count.toString();
            cv.resMgr.getLabelStringSize(memberNum_text, memberNum_text.string);//这里设置一下，以获得当前帧文本的真实宽高
        }
        else {
            cc.find("member_img/memberNum_text", this.node).getComponent(cc.Label).string = this.msg.player_count + "/" + this.msg.player_count_max;
        }

        let mangZhu: string = "";
        cc.find("bg_img/splash_word_text", this.node).color = cc.Color.WHITE;

        let bombFlag = cc.find("bg_img/bombFlag", this.node);
        bombFlag.active = false;

        cc.find("jackfruit_node", this.node).active = this.msg.game_id == cv.Enum.GameId.Jackfruit;
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

            if (this.msg.game_id == world_pb.GameId.PLO) {
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_omaha"));
            } else if (this.msg.game_id == cv.Enum.GameId.Allin) {
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), "zh_CN/hall/lobby/common_aof");
            } else if (this.msg.game_id == cv.Enum.GameId.Bet) {
                let buyinMin: string = cbBuyinMin >= 1000 ? cv.StringTools.formatC("%sK", (cbBuyinMin / 1000.0).toString()) : cbBuyinMin.toString();
                mangZhu_text.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("FindItem_bet_mangZhu_text"), buyinMin);
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), "zh_CN/hall/lobby/common_Splash");
            } else if (this.msg.game_id == cv.Enum.GameId.Jackfruit) {
                let img = cc.find("jackfruit_node/minimum_img", this.node);
                let label = cc.find("jackfruit_node/minimum_label", this.node)
                label.getComponent(cc.Label).string = cbMininumAmount >= 1000 ? cv.StringTools.formatC("%sK", (cbMininumAmount / 1000.0).toString()) : cbMininumAmount.toString();
                let size = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label));
                let pos = label.getPosition();
                img.setPosition(cc.v2(pos.x - size.width - 24, img.getPosition().y));
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_jackfruit"));
            }
            else {
                //当前是爆击场
                if (this.msg.isCriticismField == true) {
                    cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_baojiDezhou"));
                    //bombFlag.active = true;
                } else {
                    cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_normalju"));
                }
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
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_jackfruit"));
            }
            else {
                //当前是爆击场
                if (this.msg.isCriticismField == true) {
                    cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_baojiDezhouShort"));
                    //bombFlag.active = true;
                } else {
                    cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_shortju"));
                }
            }
        }

        if (isZoom) {
            if (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Normal) {
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_zoom"));
            } else {
                cv.resMgr.setSpriteFrame(cc.find("bg_img", this.node), cv.config.getLanguagePath("hall/lobby/common_zoomShort"));
            }
        }
        /*
                let antiImg = cc.find("antiImg", this.node);
                let stardlleImg = cc.find("stardlleImg", this.node);
                let insuranceImg = cc.find("insuranceImg", this.node);
                let gpsImg = cc.find("gpsImg", this.node);
                let jackpotImg = cc.find("jackpotImg", this.node);
                let aofImg = cc.find("aofImg", this.node);
                let fullHouseImg = cc.find("fullHouseImg", this.node);
                let recallImg = cc.find("recallImg", this.node);
                let showCardImg = cc.find("showCardImg", this.node);*/
        let image_suo = cc.find("image_suo", this.node);

        let name_text_size = cv.resMgr.getLabelStringSize(this.name_text, this.typename);
        let posX = this.name_text.node.x + name_text_size.width;

        if (cv.StringTools.getArrayLength(this.msg.join_password) > 0 || cv.StringTools.getArrayLength(this.msg.buyin_password) > 0) {
            image_suo.active = true;
            image_suo.setPosition(cc.v2(posX + image_suo.width * 0.5 + 20, this.name_text.node.y));
            // cv.resMgr.setSpriteFrame(image_suo, "hall/common_paizhuo");
        }
        else {
            image_suo.active = false;
        }


        cv.resMgr.getLabelStringSize(this.name_text, this.name_text.string);//这里设置一下，以获得当前帧文本的真实宽高

        if (this.msg.ante && this.msg.game_id != cv.Enum.GameId.Bet) {
            /*antiImg.active = true;
            posX += 30;
            antiImg.setPosition(posX, this.name_text.getPosition().y);
*/
            // if (this.msg.ante < 100) {
            //     mangZhu = mangZhu.replace("%d", this.getStringFormat(this.msg.ante * 0.01));
            // }
            if (mangZhu_text.getComponent(cc.Label).string != "") {
                mangZhu_text.getComponent(cc.Label).string += ("(" + cv.StringTools.numberToString(this.msg.ante * 0.01) + ")");
            }
            else {
                mangZhu_text.getComponent(cc.Label).string += cv.StringTools.numberToString(this.msg.ante * 0.01);
            }
            // let x = mangZhu_text.getPositionX() + mangZhu_text.getContentSize().width + 30;
            // if (x > )
        }
        else {
            //antiImg.active = false;
        }
        let member_img = cc.find("member_img", this.node);
        let icon_hot = cc.find("icon_hot", this.node);
        icon_hot.active = isZoom && this.msg.player_count > 40;

        let begin_x = mangZhu_text.parent.getPosition().x;  //mangZhu_text.getPosition().x
        let begin_y = mangZhu_text.parent.getPosition().y;

        //
        member_img.setPosition(cc.v2(begin_x + cv.resMgr.getLabelStringSize(mangZhu_text.getComponent(cc.Label)).width + 40, member_img.getPosition().y));
        if (isZoom || this.msg.game_id == world_pb.GameId.PLO) {
            let memberNum_text = cc.find("member_img/memberNum_text", this.node);
            console.log("this.node.width:" + this.node.width + "member_img.width:" + member_img.width + "memberNum_text.getContentSize().width:" + memberNum_text.getContentSize().width);
            //let memberNum_pos = this.node.convertToNodeSpaceAR(member_img.convertToWorldSpaceAR(cc.find("member_img/memberNum_text", this.node).getPosition()));
            cc.find("zoom_table_img", this.node).setPosition(begin_x + cv.resMgr.getLabelStringSize(mangZhu_text.getComponent(cc.Label)).width + 30.0, begin_y);
            
            let zoom_table_people_num_text = cc.find("zoom_table_img/zoom_table_people_num_text", this.node).getComponent(cc.Label);

            let width = cv.resMgr.getLabelStringSize(zoom_table_people_num_text).width;
            member_img.x = cc.find("zoom_table_img", this.node).x + width + 90;
            icon_hot.x = member_img.x + memberNum_text.width + memberNum_text.x + 10;
        }

        /*let isShortMode = (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
        posX = this.showGamePropty(this.msg.straddle, stardlleImg, posX);
        posX = this.showGamePropty(this.msg.insurance, insuranceImg, posX);
        posX = this.showGamePropty(this.msg.anti_cheating, gpsImg, posX);
        posX = this.showGamePropty(this.msg.jackpot_isopen, jackpotImg, posX);
        posX = this.showGamePropty(this.msg.is_allin_allfold, aofImg, posX);
        posX = this.showGamePropty(this.msg.straddle, stardlleImg, posX);
        posX = this.showGamePropty(this.msg.straddle, stardlleImg, posX);
        posX = this.showGamePropty(isShortMode, fullHouseImg, posX);
        posX = this.showGamePropty(this.msg.is_opened_drawback, recallImg, posX);
        posX = this.showGamePropty(this.msg.is_force_showcard, showCardImg, posX);
        if (isShortMode && this.msg.short_fullhouse_flush_straight_three) {
            cv.resMgr.setSpriteFrame(fullHouseImg, "zh_CN/hall/ui/common_icon_hu");
        }

        antiImg.active = false;
        stardlleImg.active = false;
        insuranceImg.active = false;
        gpsImg.active = false;
        jackpotImg.active = false;
        aofImg.active = false;
        fullHouseImg.active = false;
        recallImg.active = false;
        showCardImg.active = false;*/

        let community_img = cc.find("community_img", this.node);
        console.log("has_buyin" + this.msg.has_buyin);
        community_img.active = (this.msg.has_buyin != 0 && this.msg.has_buyin != undefined);

        let isShort = (this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
        if (this.msg.is_mirco == 1 
            || this.msg.IscalcIncomePerhand
            || isZoom 
            || isShort) {
            community_img.active = false;
        } else {
            community_img.active = this.msg.has_buyin != 0;
        }
        if (community_img.active) {
            if (this.msg.has_buyin == 1) {
                cv.resMgr.setSpriteFrame(community_img, cv.config.getLanguagePath("hall/ui/common_biaoqian1"), this.updatecommunityImg.bind(this));
            }
            else if (this.msg.has_buyin == 2) {
                cv.resMgr.setSpriteFrame(community_img, cv.config.getLanguagePath("hall/ui/common_biaoqian2"), this.updatecommunityImg.bind(this));
            }
        }

        //设置mvp头像  这里需要判断是否有数据，因为mvp有开关，当开关关闭时，没有此字段
        //微局长牌，所有短牌，必下，急速，这就是所有把抽的
        if ((this.msg.is_mirco 
            || this.msg.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short 
            || this.msg.game_id == cv.Enum.GameId.Bet
            || this.msg.IscalcIncomePerhand
            || isZoom) && this.msg.mvp_data) {
            let mvpdata = this.msg.mvp_data;
            let mvpImg = cc.find("mvpbg", this.node);
            mvpImg.active = mvpdata.uid > 0;
            if (mvpImg.active) {
                let mvpName: cc.Label = cc.find("mvpbg/mvpName", this.node).getComponent(cc.Label);
                //设置名称，有备注则显示备注
                let remarkData: RemarkData = cv.dataHandler.getUserData().getRemarkData(mvpdata.uid)
                let mvpStr = "";
                if (remarkData.nUid == 0) {
                    mvpStr = mvpdata.nickname;
                }
                else {
                    if (remarkData.sRemark.length == 0) {
                        mvpStr = mvpdata.nickname;
                    }
                    else {
                        mvpStr = remarkData.sRemark;
                    }

                }
                cv.StringTools.setShrinkString(mvpName.node, mvpStr, true);
                //设置头像
                CircleSprite.setCircleSprite(cc.find("mvpbg/mvpbg", this.node), mvpdata.thumb, this.msg.mvp_data.plat, false);
            }
        } else {
            cc.find("mvpbg", this.node).active = false;
        }
    }


    onEntryRoom() {
        cv.roomManager.RequestJoinRoom(this.msg.game_id, this.msg.room_id, false, this.needPassword);
    }

    showCriticismGuide(msg: any) {
        let _gameNode: cc.Node = criticism.getSinglePrefabInst(this.criticism_prefab);
        let _criticism = _gameNode.getComponent(CriticismTips);
        _criticism.autoShow(cc.director.getScene(), msg, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        _criticism.setSureFunc(this.onEntryRoom.bind(this));

    }

    onBtnItemClick(event: cc.Component.EventHandler) {
        if (cv.dataHandler.getUserData().isban) {
            cv.TT.showMsg(cv.config.getStringData("ServerErrorCode501"), cv.Enum.ToastType.ToastTypeInfo);
            return;
        }
        if (!this.msg.anti_simulator && cv.native.showSimulatorTips(this.msg.anti_simulator_ignore_cond, true)) {
            return;
        }

        cv.reCaptcha.checkRecaptcha(this.joinRoom.bind(this));
    }

    joinRoom(captchaPassed: boolean) {
        // did not pass captcha test
        if (captchaPassed == false) {
            return;
        }

        cc.find("bg_image", this.node).opacity = 170;
        //let bgNode = cc.find("bg_image", this.node);
        //cv.resMgr.setSpriteFrame(bgNode, "zh_CN/common/icon/common_selected_bg");
        //bgNode.setContentSize(this.node.getContentSize());

        let isneedPassword = this.msg.join_password.length > 0;
        let str = cv.tools.GetStringByCCFile("hideJackfruitRule");
        let isOpen = str == "" || str == null;
        if (this.msg.game_id == cv.Enum.GameId.Jackfruit && isOpen) {
            let _jackfruitRule = JackfruitRule.getSinglePrefabInst(this.jackfruit_rule_prefab).getComponent(JackfruitRule);
            _jackfruitRule.setData(this.msg);
            _jackfruitRule.setNeedPassword(isneedPassword);
            _jackfruitRule.show();
        } else {
            cv.GameDataManager.tRoomData.entry_clubid = this.msg.club_id;
            cv.GameDataManager.tRoomData.u32GameID = this.msg.game_id;
            this.needPassword = isneedPassword;
            cv.roomManager.RequestJoinRoom(this.msg.game_id, this.msg.room_id, false, isneedPassword);
        }
    }

    showGamePropty(isShow: boolean, node: cc.Node, posX: number): number {
        if (isShow) {
            node.active = true;
            posX += 50;
            node.setPosition(posX, this.name_text.node.getPosition().y);
        }
        else {
            node.active = false;
        }
        return posX;
    }
}
