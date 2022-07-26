export class RoomType {
    public type:number=0;     //类型
    public title:string="";    //标题
    public min:number=0; //最小进入
    public max:number=0; //最大进入
    public baseChip:number=0; //底注
    public ante:number=0;     //前注
    public playCount:number=0;//在线人数
    public maxSeat:number=4;//最大座位号
    public start_min:number=4;//游戏开始需要的人数
}