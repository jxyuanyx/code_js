import { GameStatus } from "./GameStatus";

export default class GameItemData {
    serverModuleName:string;
    gameState:GameStatus;
    gameName:string;
    playingCount:number;
    packageName:string;
    tableId:string="";
    newGame:boolean=false;
    tableData:any;
    isUnity:boolean=false;
    sort:number=0;
    room_type:number=0;
    updateUrl:string="";
    //分数的产生步骤
    //scoreSteps:string[];
    //总得分
    //totalScore:number=0;
    //游戏token
    gameToken:string="";
    //游戏计算token
    //scoreToken:string="";
    isInGame:boolean=false;
    guidRoomId:number=0;
    guidRoomListRoomId:number=0;
    screensType:string="";
    enterGameInfo:any={};
    isRecord:boolean=false;//是否是回放
    //rsKey:string="";//上报结果时候的KEY
    onlineGame:boolean=false;
    isReconnect:boolean=false;//是否重连进入
}
