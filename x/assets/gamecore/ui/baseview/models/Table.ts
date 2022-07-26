export class Table {
    name:string;                //房间名称
    id:number;                  //房间号
    type:number=0;                //桌子类型
    gameId:number=0;            //游戏ID
    maxSeat:number=4;             //房间坐位数
    playCount:number=0;           //房间人数
    lookCount:number=0;           //旁观玩家
    maxLookCount:number=20;     //最大旁观玩家
    baseChips:number=0;           //底注
    ante:number=0;              //前注
    min:number=0;               //最少
    max:number=0;               //最大
    state:number=0;                //桌子状态
    serverId:string;            //桌子所在的服务器ID
    start_min:number=4;         //游戏开始需要的人数
}