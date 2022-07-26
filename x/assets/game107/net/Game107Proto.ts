import App from "../../gamecore/App";
import { BaseProto } from "../../gamecore/net/imps/BaseProto";
import { ReqProto } from "../../gamecore/net/models/ReqProto";
import { RespProto } from "../../gamecore/net/models/RespProto";
import { core, ludo } from "./protos/ludo";
/**
 * 返回命令
 */

export enum LUDO_COMMON_RESP_CMDS {
    JOINMATCH=20001,
    CancelMatch = 20002,
    EvtLudoMatchNotify = 20003,
    EvtUserOperateNotify = 20004,
    UserDiceReq = 20005,
    EvtUserDice = 20006,
    UserChessReq = 20007,
    EvtUserChess = 20008,
    UserCancelAutoPlay = 20009,
    EvtLudoGameOver = 20010,
    RECONNECT=20011,
    EXIT=20012
}


const  COMMON_REQ_CMDS={
    JOIN:new ReqProto(LUDO_COMMON_RESP_CMDS.JOINMATCH,core.JoinMatchReq),
    CANCEL:new ReqProto(LUDO_COMMON_RESP_CMDS.CancelMatch,ludo.LudoCancelMatchReq),
    DICE:new ReqProto(LUDO_COMMON_RESP_CMDS.UserDiceReq,ludo.UserDiceReq),
    MOVE:new ReqProto(LUDO_COMMON_RESP_CMDS.UserChessReq,ludo.UserChessReq),
    RECONNECT:new ReqProto(LUDO_COMMON_RESP_CMDS.RECONNECT,ludo.LudoReconnectReq),
    EXIT:new ReqProto(LUDO_COMMON_RESP_CMDS.EXIT,ludo.LudoUserLeaveReq),
    UserCancelAutoPlay:new ReqProto(LUDO_COMMON_RESP_CMDS.UserCancelAutoPlay,ludo.UserCancelAutoPlay),
}

export  class Game107Proto extends BaseProto {

    _initRespProtos(){
        let protos:RespProto[]=[
            new RespProto(LUDO_COMMON_RESP_CMDS.JOINMATCH,core.JoinMatchRsp),
            new RespProto(LUDO_COMMON_RESP_CMDS.CancelMatch,ludo.LudoCancelMatchReq,false),
            new RespProto(LUDO_COMMON_RESP_CMDS.EvtUserDice,ludo.EvtUserDice,true),
            new RespProto(LUDO_COMMON_RESP_CMDS.UserDiceReq,ludo.UserDiceRsp,true),
            new RespProto(LUDO_COMMON_RESP_CMDS.EvtUserChess,ludo.EvtUserChess,true),
            new RespProto(LUDO_COMMON_RESP_CMDS.EvtLudoGameOver,ludo.EvtLudoGameOver,true),
            new RespProto(LUDO_COMMON_RESP_CMDS.EvtLudoMatchNotify,ludo.EvtLudoMatchNotify,true),
            new RespProto(LUDO_COMMON_RESP_CMDS.EvtUserOperateNotify,ludo.EvtUserOperateNotify,true),
            new RespProto(LUDO_COMMON_RESP_CMDS.RECONNECT,ludo.LudoReconnectRsp),
            new RespProto(LUDO_COMMON_RESP_CMDS.EXIT,ludo.LudoUserLeaveReq),
            new RespProto(LUDO_COMMON_RESP_CMDS.UserCancelAutoPlay,ludo.UserCancelAutoPlay)
        ]
        
        this.addRespProtos(protos);
    }

    static sendReconnect(){
        App.Net.send(COMMON_REQ_CMDS.RECONNECT,{});
    }

    static sendMatch(roomId:number,roomType:number=0){
        App.Net.send(COMMON_REQ_CMDS.JOIN,{room_id:roomId,desk_id:roomType})
    }

    static sendDice(reRoll:boolean,point:number=0){
        App.Net.send(COMMON_REQ_CMDS.DICE,{reroll:reRoll,point:point});
    }

    static sendMove(chessIndex:number){
        App.Net.send(COMMON_REQ_CMDS.MOVE,{piece_id:chessIndex});
    }

    static sendCancel(){
        App.Net.send(COMMON_REQ_CMDS.CANCEL,{});
    }

    static sendExit(){
        App.Net.send(COMMON_REQ_CMDS.EXIT,{});
    }

    static sendCancelAuto(){
        App.Net.send(COMMON_REQ_CMDS.UserCancelAutoPlay,{});
    }

}