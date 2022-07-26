export class ReqProto{

    public reqCmd:number;

    public protoType:any;

    constructor(respCmd:number,protoType:any){
        this.reqCmd=respCmd;
        this.protoType=protoType;
    }
}