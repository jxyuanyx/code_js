export enum PROTO_LEVEL{
    GOBAL,
    HALL,
    GAME
}

export class RespProto{

    public respCmd:number;

    public protoType:any;

    public needSquenece:boolean;

    public level:PROTO_LEVEL;

    constructor(respCmd:number,protoType:any,needSquenece:boolean=false,level:PROTO_LEVEL=PROTO_LEVEL.GOBAL){
        this.respCmd=respCmd;
        this.protoType=protoType;
        this.needSquenece=needSquenece;
        this.level=level
    }
}