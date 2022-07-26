export class Cmd {
    /**
     * 命令码
     */
    public code:string;

    /**
     * 描述
     */
    public desc:string="";

    private data:any;

    constructor(code:string,desc?:string,data?:any){
        this.code=code;
        if(desc)this.desc=desc;
        if(data){
            this.data=data;
        }else{
            this.data={};
        }
    }

    getData():any{
        return this.data;
    }

    addData(key:string,value:any){
        this.data[key]=value;
    }
}