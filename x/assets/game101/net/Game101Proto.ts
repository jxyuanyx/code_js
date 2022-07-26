import App from "../../gamecore/App";
import { BaseProto } from "../../gamecore/net/imps/BaseProto";
import { ReqProto } from "../../gamecore/net/models/ReqProto";
import { RespProto } from "../../gamecore/net/models/RespProto";
import { blackjack } from "./protos/blackjack";

export enum Game101_RESP_CMDS{
    JOINROOMRESP = "blitz21/competitiondata_resp",
    C2P = "blitz21/c2p_resp",
    C2H = "blitz21/c2h_resp",
    H2C = "blitz21/h2c_resp",
    UNDO = "blitz21/undo_resp",
    FINISH = "blitz21/finish_resp",
    PAUSE = "blitz21/Pause_resp",
    RECOVER = "blitz21/Recover_resp",
}

const GAME101_REQ_CMDS = {
    JOINROOM:new ReqProto("opData",blackjack.Blitz21CompetitionDataReq),
    C2P:new ReqProto("op_C2P",blackjack.Blitz21Op_C2PReq),
    C2H:new ReqProto("op_C2H",blackjack.Blitz21Op_C2HReq),
    H2C:new ReqProto("op_H2C",blackjack.Blitz21Op_H2CReq),
    UNDO:new ReqProto("op_Undo",blackjack.Blitz21Op_UndoReq),
    FINISH:new ReqProto("op_Finish",blackjack.Blitz21Op_FinishReq),
    PAUSE:new ReqProto("op_Pause",blackjack.Blitz21Op_PauseReq),
    RECOVER:new ReqProto("op_Recover",blackjack.Blitz21Op_RecoverReq),

    OPERATE:new ReqProto("blitz21://modulus/operate_req",blackjack.Blitz21OpReq)
}

export class Game101Proto extends BaseProto{
    
    _initRespProtos(){
        let protos:RespProto[]=[
            new RespProto(Game101_RESP_CMDS.JOINROOMRESP,blackjack.Blitz21CompetitionDataResp),
            new RespProto(Game101_RESP_CMDS.C2P,blackjack.Blitz21Op_C2PResp),
            new RespProto(Game101_RESP_CMDS.C2H,blackjack.Blitz21Op_C2HResp),
            new RespProto(Game101_RESP_CMDS.H2C,blackjack.Blitz21Op_H2CResp),
            new RespProto(Game101_RESP_CMDS.UNDO,blackjack.Blitz21Op_UndoResp),
            new RespProto(Game101_RESP_CMDS.FINISH,blackjack.Blitz21Op_FinishResp),
            new RespProto(Game101_RESP_CMDS.PAUSE,blackjack.Blitz21Op_PauseResp),
            new RespProto(Game101_RESP_CMDS.RECOVER,blackjack.Blitz21Op_RecoverResp),
        ]
        this.addRespProtos(protos);
    }

    static _sendReq(proto:ReqProto,data?:any){
        if(data==undefined)data={};
        let req=proto.protoType.create(data);
        let reqData={op:proto.reqCmd,RoomID:App.DataManager.getGameData().tableId};
        reqData[proto.reqCmd]=req;
        App.Net.publish(GAME101_REQ_CMDS.OPERATE,reqData);
    }

    static joinRoomReq(){
        this._sendReq(GAME101_REQ_CMDS.JOINROOM); 
    }

    static c2pReq(index:number){
        this._sendReq(GAME101_REQ_CMDS.C2P,{Index:index});
    }

    static c2hReq(){
        this._sendReq(GAME101_REQ_CMDS.C2H);
    }

    static h2cReq(){
        this._sendReq(GAME101_REQ_CMDS.H2C);
    }

    static undoReq(){
        this._sendReq(GAME101_REQ_CMDS.UNDO);
    }

    static finishReq(){
        this._sendReq(GAME101_REQ_CMDS.FINISH);
    }

    static pauseReq(){
        this._sendReq(GAME101_REQ_CMDS.PAUSE);
    }

    static recoverReq(){
        this._sendReq(GAME101_REQ_CMDS.RECOVER);
    }
    
}