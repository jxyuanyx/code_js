import App from "../../gamecore/App";
import { core } from "../../gamecore/net/protos/proto";
import { ReqProto } from "../../gamecore/net/models/ReqProto";
import { BaseProto } from "../../gamecore/net/imps/BaseProto";
import { RespProto } from "../../gamecore/net/models/RespProto";
/**
 * 返回命令
 */

export enum COMMON_RESP_CMDS {
    CMD_HEARTBEAT = 7,
    CMD_LOGIN_GATEWAY = 8,
    CMD_CLIENT_REQ = 10,
    CMD_CLIENT_CREATED = 15,
    CMD_CLIENT_CLOSED = 20,
    CMD_GET_SERVER_TIME = 90,
    CMD_TIME_OUT_CHECK = 100,
    CMD_EVENT_USER_LOGIN_ELSEWHERE = 110,
    CMD_EVENT_USER_PROP_CHANGE = 111,        // 用户财产变化通知
    CMD_RED_POINT_NOTIFY = 112,              // 红点通知
    CMD_SYNC_RED_POINT = 113,                // 客户端拉取红点

    CMD_EVENT_DropLottery = 114,             // 掉落奖券通知 CMD 114

    CMD_MATCH_BROADCAS=115,                  // 比赛播报 

    CMD_MARQUEE=116,                         //跑马灯

    CMD_RECHARGE=117,                        //新手充值

    CMD_DEPOSIT_REWARD=118,                  //充值奖励到账

    CMD_PROMOTION=120,                       //段位提升


    

     



    // =============================竞技项目CMD================================== ,//
    // 竞技的CMD从 10000 开始 不去修改以前的CMD
    // bingo加入匹配
    CMD_BINGO_MATCH = 10001,
    CMD_BINGO_MATCH_CANCEL = 10002,
    CMD_BINGO_SUBMIT_SCORE = 10003,

    CMD_EVT_MATCH_NOTIFY = 11000,
    CMD_EVT_GAME_SETTLE = 11001,

    CMD_SOLITAIRE_MATCH = 10011,
    CMD_SOLITAIRE_MATCH_CANCEL = 10012,
    CMD_SOLITAIRE_SUBMIT_SCORE = 10013,

    // 21点
    CMD_BLITZ_MATCH = 10021
}


const  COMMON_REQ_CMDS={
    LOGIN_GATE:new ReqProto(COMMON_RESP_CMDS.CMD_LOGIN_GATEWAY,core.UserLoginGateWayReq),
    HEART:new ReqProto(COMMON_RESP_CMDS.CMD_HEARTBEAT,core.UserHeartBeatReq),
    MATCH_BINGO:new ReqProto(COMMON_RESP_CMDS.CMD_BINGO_MATCH,core.JoinMatchReq),
    MATCH_SOLITAIRE:new ReqProto(COMMON_RESP_CMDS.CMD_SOLITAIRE_MATCH,core.JoinMatchReq),
    MATCH_BLITZ:new ReqProto(COMMON_RESP_CMDS.CMD_BLITZ_MATCH,core.JoinMatchReq),
    MATCH_CANCEL:new ReqProto(COMMON_RESP_CMDS.CMD_SOLITAIRE_MATCH_CANCEL,core.CancelMatchReq),
    FINISH:new ReqProto(COMMON_RESP_CMDS.CMD_SOLITAIRE_SUBMIT_SCORE,core.FinishGameReq),

    
}

export  class CommonProto extends BaseProto {

    _initRespProtos(){
        
        let protos:RespProto[]=[
            new RespProto(COMMON_RESP_CMDS.CMD_LOGIN_GATEWAY,core.UserLoginGateWayRsp),
            new RespProto(COMMON_RESP_CMDS.CMD_EVT_MATCH_NOTIFY,core.EvtMatchNotify),
            new RespProto(COMMON_RESP_CMDS.CMD_SOLITAIRE_SUBMIT_SCORE,core.FinishGameRsp),
            new RespProto(COMMON_RESP_CMDS.CMD_HEARTBEAT,core.UserHeartBeatRsp),
            new RespProto(COMMON_RESP_CMDS.CMD_MATCH_BROADCAS,core.CompetitionBroadcast),
            new RespProto(COMMON_RESP_CMDS.CMD_EVENT_USER_PROP_CHANGE,core.EvtUserPropChange),
            new RespProto(COMMON_RESP_CMDS.CMD_MARQUEE,core.EvtMarqueeBroadcast),
            new RespProto(COMMON_RESP_CMDS.CMD_RED_POINT_NOTIFY,core.RedPointUpdate),
            new RespProto(COMMON_RESP_CMDS.CMD_EVENT_DropLottery,core.EvtDropLottery),
            new RespProto(COMMON_RESP_CMDS.CMD_DEPOSIT_REWARD,core.RechargeRewardNotify),
            new RespProto(COMMON_RESP_CMDS.CMD_PROMOTION,core.UserRankUP),
            new RespProto(COMMON_RESP_CMDS.CMD_RECHARGE,core.ActivityRechargeReceive),
            new RespProto(COMMON_RESP_CMDS.CMD_SOLITAIRE_MATCH,core.JoinMatchRsp),
            new RespProto(COMMON_RESP_CMDS.CMD_EVENT_USER_LOGIN_ELSEWHERE,core.EvtUserLoginElsewhere),
            new RespProto(COMMON_RESP_CMDS.CMD_BINGO_MATCH_CANCEL,core.CancelMatchRsp),
        ]

        
        this.addRespProtos(protos);
    }


    /**
     * 发送ping
     */
    static sendPing(){

    }

    /**
     * 发送心跳
     */
    static sendHeart(){
        App.Net.send(COMMON_REQ_CMDS.HEART)
    }

    /**
     * 发送登录
     * @param id 
     */
    static sendLogin(){
        App.Net.send(COMMON_REQ_CMDS.LOGIN_GATE);
    }

        /**
     * 发送匹配
     * @param id 
     */
    static sendMatch(roomId:number,roomType:number){
        App.Net.send(COMMON_REQ_CMDS.MATCH_SOLITAIRE,{room_id:roomId,desk_id:0})
      //  let gameData:GameItemData=App.DataManager.getGameData();
      //  let matchProto=Object.assign({},COMMON_REQ_CMDS.MATCH);
      //  matchProto.reqCmd=cc.js.formatStr(matchProto.reqCmd,gameData.serverModuleName);
      /*
      switch(roomType){
        case 100:
            App.Net.send(COMMON_REQ_CMDS.MATCH_SOLITAIRE,{room_id:roomId,desk_id:0})
            break;
        case 200:
            App.Net.send(COMMON_REQ_CMDS.MATCH_SOLITAIRE,{room_id:roomId,desk_id:0})
            break;
        case 300:
            App.Net.send(COMMON_REQ_CMDS.MATCH_BLITZ,{room_id:roomId,desk_id:0})
            
            break;
        case 400:
            App.Net.send(COMMON_REQ_CMDS.MATCH_BINGO,{room_id:roomId,desk_id:0})
            break;
      }*/
    }

    static cancelMatch(){
        App.Net.send(COMMON_REQ_CMDS.MATCH_CANCEL,{});
    }

    static finishGame(Score:number,Steps:string,CheckCode:string="",ScoreSteps:string,Time:number=0){
        
        App.Net.send(COMMON_REQ_CMDS.FINISH,{
            score:Score,
            steps:Steps,
            check_code:CheckCode,
            score_steps:ScoreSteps,
            time:Time,
           // version:App.NativeManager.getAppVersionCode(),
           // res_version:cc.sys.localStorage.getItem("main_version") || "1.0.0"
        });
    }

}