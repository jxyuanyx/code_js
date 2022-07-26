export class Package {
    public cmd:number;
    public body:any;

    constructor(cmd:number,body:any){
        this.cmd=cmd;
        this.body=body;
    }
}