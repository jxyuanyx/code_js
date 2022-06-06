import ws_protocol = require("./../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import gs_protocol = require("./../../../Script/common/pb/gs_protocol");
import game_pb = gs_protocol.protocol;

import data_protocol = require("./../../../Script/common/pb/data");
import data_pb = data_protocol.data_proto;

import pb_cowboy = require("../../../Script/common/pb/cowboy");
import cowboy_proto = pb_cowboy.cowboy_proto;

import pb_videocowboy = require("../../../Script/common/pb/video_cowboy");
import videocowboy_proto = pb_videocowboy.video_cowboy_proto;

import pb_humanboy = require("../../../Script/common/pb/humanboy");
import humanboy_proto = pb_humanboy.humanboy_proto;

import pb_jackfruit = require("../../../Script/common/pb/jackfruit");
import jackfruit_proto = pb_jackfruit.jackfruit_proto;

import cv from "../../components/lobby/cv";

export class WebSocketMsg {
    serverID: number = 0;
    sendID: number = 0;
    recvID: number = 0;
    timeValue: number = 0;
}

export class HttpMsg {
    funcString: string = "";
    timeValue: number = 0;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class LoadingView extends cc.Component {
    loadingNode: cc.Node = null;
    loadingPanel: cc.Node = null;
    _img: cc.Node = null;
    totalMsgMap: WebSocketMsg[] = [];
    socketMsg: WebSocketMsg[] = [];
    httpMsg: HttpMsg[] = [];
    _shadeNode: cc.Node = null;
    CHECK_TIME: number = 2000;//单位为毫秒
    webviewHide: boolean = false;

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/LoadingView", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/LoadingView", cc.Prefab);
        this.loadingNode = cc.instantiate(prefab);
        cc.game.addPersistRootNode(this.loadingNode);
        this.loadingNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_LOADING;
        cc.find("loadingPanel/loading_ex", this.loadingNode).active = false;
        this._img = cc.find("loadingPanel/img", this.loadingNode);
        this.loadingPanel = cc.find("loadingPanel", this.loadingNode);
        this._shadeNode = cc.find("shadeNode", this.loadingNode);
        this._shadeNode.on(cc.Node.EventType.TOUCH_END, (event: cc.Event): void => {
            event.stopPropagation();
        }, this);
        this.loadingPanel.active = false;
        this._shadeNode.active = false;
        this.initTotalMap();

        cc.director.getScheduler().schedule(this.show, this, this.CHECK_TIME / 1000);
    }

    onDestroy() {
    }

    onLoad() {

    }

    /**
     * name
     */
    public onde() {

    }
    public reset() {
        cv.resMgr.adaptWidget(this.loadingNode, true);
    }

    public show() {
        let currentTime = (new Date()).getTime();
        // console.log("间隔检测-时间：" + Math.floor(currentTime/1000.0)%10);
        if (this.checkWebSocket(currentTime) || this.checkHttp(currentTime)) {
            this.webviewHide = true;
            cv.MessageCenter.send("HideWebview_ShowWindows");
            this.loadingPanel.active = true;
            this.loadingPanel.opacity = cv.SwitchLoadingView.isShow() || cv.config.getCurrentScene() == cv.Enum.SCENE.HOTUPDATE_SCENE ? 0 : 255;
            if (cc.director.getActionManager().getNumberOfRunningActionsInTarget(this._img) <= 0) {
                this._img.runAction(cc.sequence(cc.repeat(cc.sequence(cc.scaleTo(0.5, 0, 1), cc.scaleTo(0.5, 1, 1)), 10), cc.callFunc(() => {
                    let currentTime2 = (new Date()).getTime();
                    if (this.checkWebSocket(currentTime2)) {
                        //转场不处理
                        if (cv.SwitchLoadingView.isShow()) {
                            cv.SwitchLoadingView.hide();
                        } else {
                            cv.netWorkManager.reconnect();
                        }

                    }
                    this.clean();
                })));
            }
        }
        else {
            if (this.webviewHide) {
                // 如果loadingPanel active, 取消前先把hide掉的webview show
                this.webviewHide = false;
                cv.MessageCenter.send("HideWebview_ShowWindows", true);
            }
            this._img.stopAllActions();
            this.loadingPanel.active = false;
        }
    }

    private showShade() {
        if (!this._shadeNode || (this._shadeNode.active == undefined)) return;

        if (this.socketMsg.length > 0 || this.httpMsg.length > 0) {
            this._shadeNode.active = true;
        }
        else {
            this._shadeNode.active = false;
        }
    }

    private checkWebSocket(currentTime: number): boolean {
        let len = this.socketMsg.length;
        if (len <= 0) return false;
        if (currentTime - this.socketMsg[0].timeValue < this.CHECK_TIME) return false;
        for (let i = 0; i < len; i++) {
            if (currentTime - this.socketMsg[i].timeValue > this.CHECK_TIME) {
                console.log("websocket超时消息id =>" + this.socketMsg[i].recvID + ", serverID = " + this.socketMsg[i].serverID);
            }
            else {
                break;
            }
        }
        return true;
    }

    private checkHttp(currentTime: number): boolean {
        let len = this.httpMsg.length;
        if (len <= 0) return false;
        if (currentTime - this.httpMsg[0].timeValue < this.CHECK_TIME) return false;
        for (let i = 0; i < len; i++) {
            if (currentTime - this.httpMsg[i].timeValue > this.CHECK_TIME) {
                console.log("http超时: " + this.httpMsg[i].funcString);
            }
            else {
                break;
            }
        }

        return true;
    }

    public addWebSocketMsg(serverID: number, sendID: number) {
        let len = this.totalMsgMap.length;
        // 这里和接受消息的地方同步
        if (cv.roomManager.checkGameIsZoom(serverID)) {
            serverID = world_pb.GameId.Texas;
        }
        else if (serverID === world_pb.GameId.Bet || serverID === world_pb.GameId.PLO) {
            serverID = world_pb.GameId.Texas;
        }
        for (let i = 0; i < len; i++) {
            if (sendID == this.totalMsgMap[i].sendID && serverID == this.totalMsgMap[i].serverID) {
                let info: WebSocketMsg = new WebSocketMsg();
                info.serverID = serverID;
                info.sendID = sendID;
                info.recvID = this.totalMsgMap[i].recvID;
                info.timeValue = (new Date()).getTime();
                this.socketMsg.push(info);
            }
        }
        this.showShade();
    }

    public removeWebSocketMsg(serverID: number, recvID: number) {
        let xsendID = 0;
        let xserverID = 0;
        let isHave = false;
        let len = this.socketMsg.length;
        for (let i = 0; i < len; i++) {
            if (serverID == this.socketMsg[i].serverID && recvID == this.socketMsg[i].recvID) {
                xsendID = this.socketMsg[i].sendID;
                xserverID = this.socketMsg[i].serverID;
                isHave = true;
                this.socketMsg.splice(i, 1);
                break;
            }
        }

        if (isHave) {
            let len = this.socketMsg.length;
            for (let i = 0; i < len; i++) {
                if (xserverID == this.socketMsg[i].serverID && xsendID == this.socketMsg[i].sendID) {
                    this.socketMsg.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }

        this.showShade();
    }

    public addHttpMsg(name: string) {
        let info: HttpMsg = new HttpMsg();
        info.funcString = name;
        info.timeValue = (new Date()).getTime();
        this.httpMsg.push(info);
        this.showShade();
    }

    public removeHttpMsg(name: string) {
        let len = this.httpMsg.length;
        for (let i = 0; i < len; i++) {
            if (this.httpMsg[i].funcString == name) {
                this.httpMsg.splice(i, 1);
                i--;
                len--;
            }
        }
        this.showShade();
    }

    public clean() {
        if (!this.loadingNode || !cc.isValid(this.loadingNode, true)) return;
        this.httpMsg = [];
        this.socketMsg = [];
        this._img.stopAllActions();
        this.loadingPanel.active = false;
        this.showShade();
    }

    _showOverTimeMsg(info: string) {
        if (cv.config.GET_DEBUG_MODE() == 1) {
            cv.TT.showMsg(info, cv.Enum.ToastType.ToastTypeError);
        }
    }

    private initTotalMap() {
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_Logon_Response, world_pb.MSGID.MsgID_Logon_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_CreateClub_Response, world_pb.MSGID.MsgID_CreateClub_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubSnapshotList_Response, world_pb.MSGID.MsgID_ClubSnapshotList_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubSnapshotList_Notice, world_pb.MSGID.MsgID_ClubSnapshotList_Request);
        //this.bindingID(1,world_pb.MSGID.MsgID_JoinClub_Notice_To_Member, world_pb.MSGID.MsgID_JoinClub_Request);
        //this.bindingID(1,world_pb.MSGID.MsgID_JoinClub_Notice, world_pb.MSGID.MsgID_JoinClub_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JoinClub_Response_To_Member, world_pb.MSGID.MsgID_JoinClub_Reply);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JoinClub_Notice_To_Member, world_pb.MSGID.MsgID_JoinClub_Reply);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JoinClub_Response_To_Admin, world_pb.MSGID.MsgID_JoinClub_Reply);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_LeaveClub_Response, world_pb.MSGID.MsgID_LeaveClub_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubCurrentBoard_Response, world_pb.MSGID.MsgID_ClubCurrentBoard_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubCurrentBoard_Notice, world_pb.MSGID.MsgID_ClubCurrentBoard_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubMemberSnapshotList_Response, world_pb.MSGID.MsgID_ClubMemberSnapshotList_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubMemberSnapshotList_Notice, world_pb.MSGID.MsgID_ClubMemberSnapshotList_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ModifyClubMember_Response, world_pb.MSGID.MsgID_ModifyClubMember_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ModifyClubMember_Notice, world_pb.MSGID.MsgID_ModifyClubMember_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ModifyClubInfo_Response, world_pb.MSGID.MsgID_ModifyClubInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GrantClubFund_Response, world_pb.MSGID.MsgID_GrantClubFund_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SearchClubInfo_Response, world_pb.MSGID.MsgID_SearchClubInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SearchClubInfo_Notice, world_pb.MSGID.MsgID_SearchClubInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubCreaterInfo_Response, world_pb.MSGID.MsgID_ClubCreaterInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClubCreaterInfo_Notice, world_pb.MSGID.MsgID_ClubCreaterInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SendMsg_Response, world_pb.MSGID.MsgID_SendMsg_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SendMsg_Notice, world_pb.MSGID.MsgID_SendMsg_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserData_Response, world_pb.MSGID.MsgID_GetUserData_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserData_Notice, world_pb.MSGID.MsgID_GetUserData_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_HeartBeat_Response, world_pb.MSGID.MsgID_HeartBeat_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetJackpotData_Response, world_pb.MSGID.MsgID_GetJackpotData_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetJackpotData_Notice, world_pb.MSGID.MsgID_GetJackpotData_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JackpotSetting_Response, world_pb.MSGID.MsgID_JackpotSetting_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JackpotSetting_Notice, world_pb.MSGID.MsgID_JackpotSetting_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SetJackpot_Response, world_pb.MSGID.MsgID_SetJackpot_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SetJackpot_Notice, world_pb.MSGID.MsgID_SetJackpot_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_RecoverJackpotSetting_Response, world_pb.MSGID.MsgID_RecoverJackpotSetting_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_CurrentRoomJackpot_Response, world_pb.MSGID.MsgID_CurrentRoomJackpot_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_CurrentRoomJackpot_Notice, world_pb.MSGID.MsgID_CurrentRoomJackpot_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JackpotAwardRecord_Response, world_pb.MSGID.MsgID_JackpotAwardRecord_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JackpotAwardRecord_Notice, world_pb.MSGID.MsgID_JackpotAwardRecord_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JackpotInjectAmount_Response, world_pb.MSGID.MsgID_JackpotInjectAmount_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JackpotInjectAmount_Notice, world_pb.MSGID.MsgID_JackpotInjectAmount_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_CreateAlliance_Response, world_pb.MSGID.MsgID_CreateAlliance_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_LeaveAlliance_Response, world_pb.MSGID.MsgID_LeaveAlliance_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_LeaveAlliance_Notice, world_pb.MSGID.MsgID_LeaveAlliance_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SearchAlliance_Response, world_pb.MSGID.MsgID_SearchAlliance_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SearchAlliance_Notice, world_pb.MSGID.MsgID_SearchAlliance_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_KickoffAllianceMember_Response, world_pb.MSGID.MsgID_KickoffAllianceMember_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_KickoffAllianceMember_Notice, world_pb.MSGID.MsgID_KickoffAllianceMember_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AllianceList_Response, world_pb.MSGID.MsgID_AllianceList_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AllianceList_Notice, world_pb.MSGID.MsgID_AllianceList_Request);
        //this.bindingIcv.Enum.GameId.World(1,world_pb.MSGID.MsgID_JoinAlliance_Notice_To_Member, world_pb.MSGID.MsgID_JoinAlliance_Request);
        //this.bindingIcv.Enum.GameId.World(1,world_pb.MSGID.MsgID_JoinAlliance_Notice_To_Admin, world_pb.MSGID.MsgID_JoinAlliance_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JoinAlliance_Response_To_Member, world_pb.MSGID.MsgID_JoinAllianceReply_To_World);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_JoinAlliance_Response_To_Admin, world_pb.MSGID.MsgID_JoinAllianceReply_To_World);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AddRemarks_Response, world_pb.MSGID.MsgID_AddRemarks_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AddRemarks_Notice, world_pb.MSGID.MsgID_AddRemarks_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetAllRemarks_Response, world_pb.MSGID.MsgID_GetAllRemarks_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetAllRemarks_Notice, world_pb.MSGID.MsgID_GetAllRemarks_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ClearAllianceMaxBuyinLimit_Response, world_pb.MSGID.MsgID_ClearAllianceMaxBuyinLimit_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SetAllianceMaxBuyinLimit_Response, world_pb.MSGID.MsgID_SetAllianceMaxBuyinLimit_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SetAllianceControlBuyin_Response, world_pb.MSGID.MsgID_SetAllianceControlBuyin_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_FairPlay_Report_Response, world_pb.MSGID.MsgID_FairPlay_Report_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_DeviceInfo_Report_Response, world_pb.MSGID.MsgID_DeviceInfo_Report_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetIncome_Response, world_pb.MSGID.MsgID_GetIncome_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetIncome_Notice, world_pb.MSGID.MsgID_GetIncome_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserClubGrantInfo_Response, world_pb.MSGID.MsgID_GetUserClubGrantInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserClubGrantInfo_Notice, world_pb.MSGID.MsgID_GetUserClubGrantInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserMailListInfo_Response, world_pb.MSGID.MsgID_GetUserMailListInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserMailListInfo_Notice, world_pb.MSGID.MsgID_GetUserMailListInfo_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ReadAndFetchOneMail_Response, world_pb.MSGID.MsgID_ReadAndFetchOneMail_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ReadAndFetchOneMail_Notice, world_pb.MSGID.MsgID_ReadAndFetchOneMail_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ResponseAnounceList, world_pb.MSGID.MsgID_RequestAnounceList);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AddCoinOrder_Pay_Response, world_pb.MSGID.MsgID_AddCoinOrder_Pay_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_DelCoinOrder_Pay_Response, world_pb.MSGID.MsgID_DelCoinOrder_Pay_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SearchClubMember_Response, world_pb.MSGID.MsgID_SearchClubMember_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SearchClubMember_Notice, world_pb.MSGID.MsgID_SearchClubMember_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Response, world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Notice, world_pb.MSGID.MsgID_ReadAndFetchOneAnounce_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SetClubInvitePercent_Response, world_pb.MSGID.MsgID_SetClubInvitePercent_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_Exchange_UserPoints_Response, world_pb.MSGID.MsgID_Exchange_UserPoints_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_Goods_List_Response, world_pb.MSGID.MsgID_Goods_List_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_Bank_Details_Query_Response, world_pb.MSGID.MsgID_Bank_Details_Query_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AuthVerify_Response, world_pb.MSGID.MsgID_AuthVerify_Request);

        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgId_GetTexasTotalHands_Response, world_pb.MSGID.MsgId_GetTexasTotalHands_Request);

        //体育竞赛
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SportsLogin_Response, world_pb.MSGID.MsgID_SportsLogin_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_SportsLeave_Response, world_pb.MSGID.MsgID_SportsLeave_Request);

        //电子游戏
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_PgLogin_Response, world_pb.MSGID.MsgID_PgLogin_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_PgLeave_Response, world_pb.MSGID.MsgID_PgLeave_Request);

        // 助力红包
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_GetUserHelpWarpList_Response, world_pb.MSGID.MsgID_GetUserHelpWarpList_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_AddHelper_Response, world_pb.MSGID.MsgID_AddHelper_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_UserHelpWarpChange_Notice, world_pb.MSGID.MsgID_AddHelper_Request);
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_UserReceiveHelpWarp_Response, world_pb.MSGID.MsgID_UserReceiveHelpWarp_Request);
        //门票
        this.bindingID(world_pb.GameId.World, world_pb.MSGID.MsgID_ReceiveTools_Response, world_pb.MSGID.MsgID_ReceiveTools_Request);
        //mtt
        // if (cv.config.HAVE_MTT) {
        this.bindingID(cv.Enum.GameId.World, world_pb.MSGID.MsgID_AuthApi_Notice, world_pb.MSGID.MsgID_AuthApi_Request);
        this.bindingID(cv.Enum.GameId.World, world_pb.MSGID.MsgID_AuthApi_Response, world_pb.MSGID.MsgID_AuthApi_Request);
        // }

        // game消息对应
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Logon_Response, game_pb.MSGID.MsgID_Logon_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_CreateRoom_Response, game_pb.MSGID.MsgID_CreateRoom_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_CreateRoom_Notice, game_pb.MSGID.MsgID_CreateRoom_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_DestroyRoom_Response, game_pb.MSGID.MsgID_DestroyRoom_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_DestroyRoom_Notice, game_pb.MSGID.MsgID_DestroyRoom_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_JoinRoom_Response, game_pb.MSGID.MsgID_JoinRoom_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_LeaveRoom_Response, game_pb.MSGID.MsgID_LeaveRoom_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_SitDown_Response, game_pb.MSGID.MsgID_SitDown_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_SitDown_Notice, game_pb.MSGID.MsgID_SitDown_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Standup_Response, game_pb.MSGID.MsgID_Standup_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Standup_Notice, game_pb.MSGID.MsgID_Standup_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Buyin_Response, game_pb.MSGID.MsgID_Buyin_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Buyin_Notice, game_pb.MSGID.MsgID_Buyin_Request);
        // this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Answer_Buyin_Response, game_pb.MSGID.MsgID_Answer_Buyin_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_StartGame_Response, game_pb.MSGID.MsgID_StartGame_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_StartGame_Notice, game_pb.MSGID.MsgID_StartGame_Request);
        //这条消息目前服务器没有回包导至经常loading转圈。修改以后还有延时也会有问题。目前决定暂时注释掉
        // this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Action_Response, game_pb.MSGID.MsgID_Action_Request);
        // this.bindingID(2, game_pb.MSGID.MsgID_Room_Situation_Response, game_pb.MSGID.MsgID_Room_Situation_Request);
        // this.bindingID(2, game_pb.MSGID.MsgID_Room_Situation_Notice, game_pb.MSGID.MsgID_Room_Situation_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_SendChat_Response, game_pb.MSGID.MsgID_SendChat_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_SendChat_Notice, game_pb.MSGID.MsgID_SendChat_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_StayPosition_Response, game_pb.MSGID.MsgID_StayPosition_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_StayPosition_Notice, game_pb.MSGID.MsgID_StayPosition_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_BackPosition_Response, game_pb.MSGID.MsgID_BackPosition_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_BackPosition_Notice, game_pb.MSGID.MsgID_BackPosition_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ShowCard_Response, game_pb.MSGID.MsgID_ShowCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ShowCard_Notice, game_pb.MSGID.MsgID_ShowCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_UpdateMoney_Response, game_pb.MSGID.MsgID_UpdateMoney_Request);
        // this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ModifyBuyinLimit_Response, game_pb.MSGID.MsgID_ModifyBuyinLimit_Request);
        // this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ModifyBuyinLimit_Notice, game_pb.MSGID.MsgID_ModifyBuyinLimit_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Snapshot_Response, game_pb.MSGID.MsgID_Snapshot_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Buyout_Response, game_pb.MSGID.MsgID_Buyout_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_Buyout_Notice, game_pb.MSGID.MsgID_Buyout_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_HeartBeat_Response, game_pb.MSGID.MsgID_HeartBeat_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_InteractiveExpression_Response, game_pb.MSGID.MsgID_InteractiveExpression_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_InteractiveExpression_Notice, game_pb.MSGID.MsgID_InteractiveExpression_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_AddRoomTime_Response, game_pb.MSGID.MsgID_AddRoomTime_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_AddRoomTime_Notice, game_pb.MSGID.MsgID_AddRoomTime_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ProhibitSitdown_Response, game_pb.MSGID.MsgID_ProhibitSitdown_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ProhibitSitdown_Notice, game_pb.MSGID.MsgID_ProhibitSitdown_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ForceStandup_Response, game_pb.MSGID.MsgID_ForceStandup_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ForceStandup_Notice, game_pb.MSGID.MsgID_ForceStandup_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_PauseGame_Response, game_pb.MSGID.MsgID_PauseGame_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_PauseGame_Notice, game_pb.MSGID.MsgID_PauseGame_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_CheckOutAndLeave_Response, game_pb.MSGID.MsgID_CheckOutAndLeave_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_CheckOutAndLeave_Notice, game_pb.MSGID.MsgID_CheckOutAndLeave_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_DefaultFold_Response, game_pb.MSGID.MsgID_DefaultFold_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Response, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Notice, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Response, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Notice, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_GameActionTurn_Response, game_pb.MSGID.MsgID_GameActionTurn_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_PhotoVerify_Response, game_pb.MSGID.MsgID_PhotoVerify_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_PhotoVerify_Notice, game_pb.MSGID.MsgID_PhotoVerify_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Response, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Notice, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_CheckAllianceRoomPriviledge_Response, game_pb.MSGID.MsgID_CheckAllianceRoomPriviledge_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_AddRoomTimeCount_response, game_pb.MSGID.MsgID_AddRoomTimeCount_Request);

        // 保险
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_BuyInsurance_Response, game_pb.MSGID.MsgID_BuyInsurance_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_BuyInsuranceResult_Notice, game_pb.MSGID.MsgID_BuyInsurance_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_AddInsuranceTime_Response, game_pb.MSGID.MsgID_AddInsuranceTime_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_AddInsuranceTime_Notice, game_pb.MSGID.MsgID_AddInsuranceTime_Request);

        // 强制亮牌/发发看
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ForceShowCard_Response, game_pb.MSGID.MsgID_ForceShowCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ForceShowCard_Notice, game_pb.MSGID.MsgID_ForceShowCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_SendCard_Fun_Response, game_pb.MSGID.MsgID_SendCard_Fun_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_SendCard_Fun_Notice, game_pb.MSGID.MsgID_SendCard_Fun_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_FavoriteHand_Response, game_pb.MSGID.MsgID_FavoriteHand_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ReplayForceShowCard_Response, game_pb.MSGID.MsgID_ReplayForceShowCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ReplayForceShowCard_Notice, game_pb.MSGID.MsgID_ReplayForceShowCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ReplaySendCard_Response, game_pb.MSGID.MsgID_ReplaySendCard_Request);
        this.bindingID(world_pb.GameId.Texas, game_pb.MSGID.MsgID_ReplaySendCard_Notice, game_pb.MSGID.MsgID_ReplaySendCard_Request);

        // cowboy消息对应
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.LOGIN_GAME_RESP, cowboy_proto.CMD.LOGIN_GAME_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.HEART_BEAT_RESP, cowboy_proto.CMD.HEART_BEAT_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.JOIN_ROOM_RESP, cowboy_proto.CMD.JOIN_ROOM_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.BET_RESP, cowboy_proto.CMD.BET_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.BET_NOTIFY, cowboy_proto.CMD.BET_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.LEAVE_ROOM_RESP, cowboy_proto.CMD.LEAVE_ROOM_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.ROOM_TREND_RSP, cowboy_proto.CMD.ROOM_TREND_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.ROOM_TREND_NOTICE, cowboy_proto.CMD.ROOM_TREND_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.AUTO_BET_RESP, cowboy_proto.CMD.AUTO_BET_REQ);
        this.bindingID(world_pb.GameId.CowBoy, cowboy_proto.CMD.PLAYER_LIST_RESP, cowboy_proto.CMD.PLAYER_LIST_REQ);

        // videoCowboy消息对应
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.LOGIN_GAME_RESP, cowboy_proto.CMD.LOGIN_GAME_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.HEART_BEAT_RESP, cowboy_proto.CMD.HEART_BEAT_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.JOIN_ROOM_RESP, cowboy_proto.CMD.JOIN_ROOM_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.BET_RESP, cowboy_proto.CMD.BET_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.BET_NOTIFY, cowboy_proto.CMD.BET_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.LEAVE_ROOM_RESP, cowboy_proto.CMD.LEAVE_ROOM_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.ROOM_TREND_RSP, cowboy_proto.CMD.ROOM_TREND_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.ROOM_TREND_NOTICE, cowboy_proto.CMD.ROOM_TREND_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.AUTO_BET_RESP, cowboy_proto.CMD.AUTO_BET_REQ);
        this.bindingID(world_pb.GameId.VideoCowboy, cowboy_proto.CMD.PLAYER_LIST_RESP, cowboy_proto.CMD.PLAYER_LIST_REQ);

        // aof消息对应  aof已没有了
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Logon_Response, game_pb.MSGID.MsgID_Logon_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_CreateRoom_Response, game_pb.MSGID.MsgID_CreateRoom_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_CreateRoom_Notice, game_pb.MSGID.MsgID_CreateRoom_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_DestroyRoom_Response, game_pb.MSGID.MsgID_DestroyRoom_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_DestroyRoom_Notice, game_pb.MSGID.MsgID_DestroyRoom_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_JoinRoom_Response, game_pb.MSGID.MsgID_JoinRoom_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_LeaveRoom_Response, game_pb.MSGID.MsgID_LeaveRoom_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_SitDown_Response, game_pb.MSGID.MsgID_SitDown_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_SitDown_Notice, game_pb.MSGID.MsgID_SitDown_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Standup_Response, game_pb.MSGID.MsgID_Standup_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Standup_Notice, game_pb.MSGID.MsgID_Standup_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Buyin_Response, game_pb.MSGID.MsgID_Buyin_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Buyin_Notice, game_pb.MSGID.MsgID_Buyin_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Answer_Buyin_Response, game_pb.MSGID.MsgID_Answer_Buyin_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_StartGame_Response, game_pb.MSGID.MsgID_StartGame_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_StartGame_Notice, game_pb.MSGID.MsgID_StartGame_Request);
        //this.bindingID(2, game_pb.MSGID.MsgID_Action_Response, game_pb.MSGID.MsgID_Action_Request);
        // this.bindingID(2, game_pb.MSGID.MsgID_Room_Situation_Response, game_pb.MSGID.MsgID_Room_Situation_Request);
        // this.bindingID(2, game_pb.MSGID.MsgID_Room_Situation_Notice, game_pb.MSGID.MsgID_Room_Situation_Request);
        //this.bindingID(2, game_pb.MSGID.MsgID_SendCard_Fun_Response, game_pb.MSGID.MsgID_SendCard_Fun_Request);
        //this.bindingID(2, game_pb.MSGID.MsgID_SendCard_Fun_Notice, game_pb.MSGID.MsgID_SendCard_Fun_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_SendChat_Response, game_pb.MSGID.MsgID_SendChat_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_SendChat_Notice, game_pb.MSGID.MsgID_SendChat_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_StayPosition_Response, game_pb.MSGID.MsgID_StayPosition_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_StayPosition_Notice, game_pb.MSGID.MsgID_StayPosition_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_BackPosition_Response, game_pb.MSGID.MsgID_BackPosition_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_BackPosition_Notice, game_pb.MSGID.MsgID_BackPosition_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ShowCard_Response, game_pb.MSGID.MsgID_ShowCard_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_UpdateMoney_Response, game_pb.MSGID.MsgID_UpdateMoney_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ModifyBuyinLimit_Response, game_pb.MSGID.MsgID_ModifyBuyinLimit_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ModifyBuyinLimit_Notice, game_pb.MSGID.MsgID_ModifyBuyinLimit_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Snapshot_Response, game_pb.MSGID.MsgID_Snapshot_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Buyout_Response, game_pb.MSGID.MsgID_Buyout_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_Buyout_Notice, game_pb.MSGID.MsgID_Buyout_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_HeartBeat_Response, game_pb.MSGID.MsgID_HeartBeat_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_InteractiveExpression_Response, game_pb.MSGID.MsgID_InteractiveExpression_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_InteractiveExpression_Notice, game_pb.MSGID.MsgID_InteractiveExpression_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_AddRoomTime_Response, game_pb.MSGID.MsgID_AddRoomTime_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_AddRoomTime_Notice, game_pb.MSGID.MsgID_AddRoomTime_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ProhibitSitdown_Response, game_pb.MSGID.MsgID_ProhibitSitdown_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ProhibitSitdown_Notice, game_pb.MSGID.MsgID_ProhibitSitdown_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ForceStandup_Response, game_pb.MSGID.MsgID_ForceStandup_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_ForceStandup_Notice, game_pb.MSGID.MsgID_ForceStandup_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_PauseGame_Response, game_pb.MSGID.MsgID_PauseGame_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_PauseGame_Notice, game_pb.MSGID.MsgID_PauseGame_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_CheckOutAndLeave_Response, game_pb.MSGID.MsgID_CheckOutAndLeave_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_CheckOutAndLeave_Notice, game_pb.MSGID.MsgID_CheckOutAndLeave_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_DefaultFold_Response, game_pb.MSGID.MsgID_DefaultFold_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Response, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Notice, game_pb.MSGID.MsgID_OwnerSetBuyinLimit_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Response, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Notice, game_pb.MSGID.MsgID_PlayerBuyinsInfo_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_GameActionTurn_Response, game_pb.MSGID.MsgID_GameActionTurn_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_PhotoVerify_Response, game_pb.MSGID.MsgID_PhotoVerify_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_PhotoVerify_Notice, game_pb.MSGID.MsgID_PhotoVerify_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Response, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Notice, game_pb.MSGID.MsgID_UploadVerifyPhotoSucc_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_CheckAllianceRoomPriviledge_Response, game_pb.MSGID.MsgID_CheckAllianceRoomPriviledge_Request);
        // this.bindingID(world_pb.GameId.Allin, game_pb.MSGID.MsgID_AddRoomTimeCount_response, game_pb.MSGID.MsgID_AddRoomTimeCount_Request);

        //data服        
        // this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.GET_DATA_RESP, data_pb.CMD.GET_DATA_REQ);
        // this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.GET_PUBLIC_DATA_RESP, data_pb.CMD.GET_PUBLIC_DATA_REQ);
        // this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.ROOM_RECORDS_LIST_RESP, data_pb.CMD.ROOM_RECORDS_LIST_REQ);
        // this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.ROOM_RECORD_RESP, data_pb.CMD.ROOM_RECORD_REQ);

        // data服
        // 牌谱相关消息(一定要"loading")
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.DO_FAVORITE_RESP, data_pb.CMD.DO_FAVORITE_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.FAVORITE_LIST_NEW_RESP, data_pb.CMD.FAVORITE_LIST_NEW_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.FAVORITE_HAND_RESP, data_pb.CMD.FAVORITE_HAND_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.GAME_HAND_RESP, data_pb.CMD.GAME_HAND_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.GAME_REVIEW_LIST_RESP, data_pb.CMD.GAME_REVIEW_LIST_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.DELETE_FAVORITE_LIST_RESP, data_pb.CMD.DELETE_FAVORITE_LIST_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.FORCE_SHOW_CARD_RSP, data_pb.CMD.FORCE_SHOW_CARD_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.SEND_CARD_FUN_RSP, data_pb.CMD.SEND_CARD_FUN_REQ);
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.GAME_BIG_POT_LIST_RSP, data_pb.CMD.GAME_BIG_POT_LIST_REQ);

        // 房间中的牌局"game uuid"数组
        this.bindingID(world_pb.GameId.DataServer, data_pb.CMD.GAME_UUIDS_RESP, data_pb.CMD.GAME_UUIDS_REQ);

        // 菠萝蜜
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.LOGIN_GAME_RESP, jackfruit_proto.CMD.LOGIN_GAME_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.JOIN_ROOM_RESP, jackfruit_proto.CMD.JOIN_ROOM_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.GAME_DATA_SYNC_RESP, jackfruit_proto.CMD.GAME_DATA_SYNC_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.SIT_DOWN_NOTIFY, jackfruit_proto.CMD.SIT_DOWN_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.SIT_DOWN_RESP, jackfruit_proto.CMD.SIT_DOWN_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.PLACE_CARD_OVER_RESP, jackfruit_proto.CMD.PLACE_CARD_OVER_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.PLACE_CARD_OVER_NOTIFY, jackfruit_proto.CMD.PLACE_CARD_OVER_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.STAND_UP_RESP, jackfruit_proto.CMD.STAND_UP_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.READY_RESP, jackfruit_proto.CMD.READY_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.READY_NOTIFY, jackfruit_proto.CMD.READY_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.GAME_RECORD_RESP, jackfruit_proto.CMD.GAME_RECORD_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.LEAVE_RESP, jackfruit_proto.CMD.LEAVE_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.SITUATION_RESP, jackfruit_proto.CMD.SITUATION_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.ACTION_DELAY_RESP, jackfruit_proto.CMD.ACTION_DELAY_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.ACTION_DELAY_NOTIFY, jackfruit_proto.CMD.ACTION_DELAY_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.SEND_BARRAGE_RESP, jackfruit_proto.CMD.SEND_BARRAGE_REQ);
        this.bindingID(world_pb.GameId.Jackfruit, jackfruit_proto.CMD.SEND_BARRAGE_NOTIFY, jackfruit_proto.CMD.SEND_BARRAGE_REQ);
    }

    private bindingID(serverId: number, recvId: number, sendId: number) {
        let value = new WebSocketMsg();
        value.serverID = serverId;
        value.sendID = sendId
        value.recvID = recvId;
        this.totalMsgMap.push(value);
    }

    private static instance: LoadingView;

    public static getInstance(): LoadingView {
        if (!this.instance || !this.instance.loadingNode || !cc.isValid(this.instance.loadingNode, true)) {
            this.instance = new LoadingView();
        }
        return this.instance;
    }
}
